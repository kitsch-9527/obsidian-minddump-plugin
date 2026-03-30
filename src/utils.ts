// src/utils.ts
import { App, TFile, TFolder, Notice } from 'obsidian';
import moment from 'moment';
import { Jot, JotSettings, Language } from './types';
import { t } from './i18n';

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 解析文件内容为 Jot 数组
 */
export function parseFileContent(
    content: string,
    filePath: string,
    lang: Language
): Jot[] {
    const entries: Jot[] = [];
    const lines = content.split("\n");
    let i = 0;

    const sourcePrefixes = lang === 'zh' ? ["来源:"] : ["Source:", "来源:"];

    while (i < lines.length) {
        const line = lines[i].trim();
        if (line.startsWith("### ")) {
            const fullDateTime = line.substring(4).trim();
            const [date, time] = fullDateTime.split(" ");

            let j = i + 1;
            let jotContent = "";
            let tags: string[] = [];
            let source = "";
            let attachments: string[] = [];
            let attachmentTypes: ("image" | "file")[] = [];
            let hasTags = false;
            let hasSource = false;

            while (j < lines.length && !lines[j].trim().startsWith("### ")) {
                const currentLine = lines[j];
                const trimmedLine = currentLine.trim();

                if (!trimmedLine || trimmedLine === "---") {
                    j++;
                    continue;
                }

                // 检查是否是标签行
                if (trimmedLine.match(/^#[\w\u4e00-\u9fff\/\-_]+(\s+#[\w\u4e00-\u9fff\/\-_]+)*$/)) {
                    const tagMatches = trimmedLine.match(/#[\w\u4e00-\u9fff\/\-_]+/g);
                    if (tagMatches) {
                        tags = tagMatches.map(t => t.substring(1));
                        hasTags = true;
                    }
                }
                // 检查是否是来源行
                else {
                    const matchedPrefix = sourcePrefixes.find(p => trimmedLine.startsWith(p));
                    if (matchedPrefix) {
                        source = trimmedLine.substring(matchedPrefix.length).trim();
                        hasSource = true;
                    }
                    // 检查是否是附件行
                    else {
                        const strictLinkMatch = trimmedLine.match(/^(!?\[\[[^\]]+\]\])$/);
                        if (strictLinkMatch) {
                            const match = trimmedLine.match(/!?\[\[(.*?)\]\]/);
                            if (match) {
                                attachments.push(match[1]);
                                attachmentTypes.push(trimmedLine.startsWith("![[") ? "image" : "file");
                            }
                        } else {
                            // 内容行
                            if (jotContent) {
                                jotContent += "\n" + currentLine;
                            } else {
                                jotContent = currentLine;
                            }
                        }
                    }
                }

                j++;
            }

            if (jotContent.trim() || tags.length > 0) {
                entries.push({
                    date: date || "",
                    time: time || "",
                    content: jotContent.trim(),
                    tags: tags,
                    source: source,
                    fullText: jotContent.trim(),
                    attachments: attachments,
                    attachmentTypes: attachmentTypes,
                    filePath: filePath
                });
            }

            i = j;
        } else {
            i++;
        }
    }

    return entries;
}

/**
 * 处理附件保存（修复无限递归和文件名匹配问题）
 */
export async function handleAttachment(
    app: App,
    file: File,
    settings: JotSettings,
    lang: Language,
    callback: (result: { path: string; type: "image" | "file" }) => void
): Promise<void> {
    const dateStr = moment().format("YYYY-MM-DD");
    const dateStrNoDash = dateStr.replace(/-/g, "");
    const attachmentsFolder = settings.attachmentsFolder;

    if (!app.vault.getAbstractFileByPath(attachmentsFolder)) {
        try {
            await app.vault.createFolder(attachmentsFolder);
        } catch (error) {
            new Notice(t('attachmentsFolderExists', lang) + ` ${error}`);
            return;
        }
    }

    const folder = app.vault.getAbstractFileByPath(attachmentsFolder);
    let existingFiles: TFile[] = [];
    if (folder && folder instanceof TFolder) {
        // 修复：使用不带横线的格式进行匹配
        existingFiles = folder.children.filter(
            f => f instanceof TFile && f.name.startsWith(`jot-${dateStrNoDash}`)
        ) as TFile[];
    }

    let maxNumber = 0;
    for (const f of existingFiles) {
        const match = f.name.match(/jot-(\d{8})-(\d+)\./);
        if (match) {
            const num = parseInt(match[2], 10);
            if (num > maxNumber) maxNumber = num;
        }
    }

    // 修复：使用循环替代递归，避免无限递归
    let attempts = 0;
    const maxAttempts = 100;
    let serialNumber: string;
    let filename: string;
    let filePath: string;

    do {
        maxNumber++;
        serialNumber = String(maxNumber).padStart(3, "0");
        const ext = file.name.split(".").pop() || "bin";
        filename = `jot-${dateStrNoDash}-${serialNumber}.${ext}`;
        filePath = `${attachmentsFolder}/${filename}`;
        attempts++;
    } while (app.vault.getAbstractFileByPath(filePath) && attempts < maxAttempts);

    if (attempts >= maxAttempts) {
        new Notice("无法生成唯一文件名");
        return;
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        await app.vault.createBinary(filePath, arrayBuffer);

        const isImage = file.type.startsWith("image/");
        callback({ path: filePath, type: isImage ? "image" : "file" });
        new Notice(t('attachmentSaved', lang, { filename }));
    } catch (error) {
        console.error("保存附件失败:", error);
        new Notice(t('saveFailed', lang, { error: (error as Error).message }));
    }
}

/**
 * 设置 wikilink 自动完成
 */
export function setupWikilinkAutocomplete(
    app: App,
    textarea: HTMLTextAreaElement,
    container: HTMLElement,
    onSuggestionSelect: (file: TFile, textarea: HTMLTextAreaElement, bracketStart: number) => void
): () => void {
    let suggestionContainer: HTMLElement | null = null;
    let suggestionTimeout: NodeJS.Timeout;

    const hideSuggestions = () => {
        if (suggestionContainer) {
            suggestionContainer.remove();
            suggestionContainer = null;
        }
    };

    const cleanup = () => {
        hideSuggestions();
        clearTimeout(suggestionTimeout);
    };

    const setActiveSuggestion = (items: NodeListOf<Element> | any[], index: number) => {
        items.forEach((item: Element, i: number) => {
            if (item && item.classList) {
                if (i === index) {
                    item.classList.add("jots-suggestion-item-active");
                    (item as HTMLElement).style.backgroundColor = "var(--background-modifier-hover)";
                } else {
                    item.classList.remove("jots-suggestion-item-active");
                    (item as HTMLElement).style.backgroundColor = "";
                }
            }
        });
    };

    textarea.addEventListener("input", () => {
        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = textarea.value.substring(0, cursorPos);

        const lastDoubleBracket = textBeforeCursor.lastIndexOf("[[");
        if (lastDoubleBracket !== -1) {
            const afterLastBracket = textBeforeCursor.substring(lastDoubleBracket + 2);
            if (!afterLastBracket.includes("]]")) {
                const searchTerm = afterLastBracket;

                clearTimeout(suggestionTimeout);
                suggestionTimeout = setTimeout(() => {
                    const files = app.vault.getMarkdownFiles();
                    const searchLower = searchTerm.toLowerCase();
                    const matches = files
                        .filter(file => file.basename.toLowerCase().includes(searchLower))
                        .slice(0, 10);

                    if (matches.length === 0) {
                        hideSuggestions();
                        return;
                    }

                    if (!suggestionContainer) {
                        suggestionContainer = document.createElement('div');
                        suggestionContainer.classList.add("jots-suggestions");
                        suggestionContainer.style.position = "fixed";
                        suggestionContainer.style.backgroundColor = "var(--background-primary)";
                        suggestionContainer.style.border = "1px solid var(--background-modifier-border)";
                        suggestionContainer.style.borderRadius = "6px";
                        suggestionContainer.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                        suggestionContainer.style.zIndex = "99999";
                        suggestionContainer.style.maxHeight = "200px";
                        suggestionContainer.style.minHeight = "120px";
                        suggestionContainer.style.overflowY = "auto";
                        suggestionContainer.style.display = "block";
                        suggestionContainer.style.minWidth = "200px";
                        suggestionContainer.style.padding = "0";
                        document.body.appendChild(suggestionContainer);
                    }

                    // 计算建议列表位置
                    const textareaRect = textarea.getBoundingClientRect();
                    suggestionContainer.style.left = `${textareaRect.left}px`;
                    suggestionContainer.style.top = `${textareaRect.bottom + 4}px`;
                    suggestionContainer.style.width = `${textareaRect.width}px`;

                    suggestionContainer.empty();

                    matches.forEach((file, index) => {
                        const item = suggestionContainer!.createDiv();
                        item.classList.add("jots-suggestion-item");
                        item.textContent = file.basename;
                        item.style.padding = "6px 12px";
                        item.style.cursor = "pointer";
                        item.style.fontSize = "12px";
                        item.style.borderBottom = "1px solid var(--background-modifier-border)";
                        item.style.color = "var(--text-normal)";

                        if (index === 0) {
                            item.classList.add("jots-suggestion-item-active");
                            item.style.backgroundColor = "var(--background-modifier-hover)";
                        }

                        item.addEventListener("click", () => {
                            onSuggestionSelect(file, textarea, lastDoubleBracket);
                            hideSuggestions();
                            textarea.focus();
                        });

                        item.addEventListener("mouseenter", () => {
                            setActiveSuggestion(matches, index);
                        });
                    });
                }, 100);
                return;
            }
        }

        hideSuggestions();
    });

    textarea.addEventListener("keydown", (e) => {
        if (!suggestionContainer) return;

        const items = suggestionContainer.querySelectorAll(".jots-suggestion-item");
        const activeItem = suggestionContainer.querySelector(".jots-suggestion-item-active");
        let activeIndex = -1;

        items.forEach((item, index) => {
            if (item === activeItem) activeIndex = index;
        });

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextIndex = (activeIndex + 1) % items.length;
            setActiveSuggestion(items, nextIndex);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prevIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
            setActiveSuggestion(items, prevIndex);
        } else if (e.key === "Enter" || e.key === "Tab") {
            if (activeItem) {
                e.preventDefault();
                (activeItem as HTMLElement).click();
            }
        } else if (e.key === "Escape") {
            hideSuggestions();
        }
    });

    textarea.addEventListener("blur", () => {
        setTimeout(() => hideSuggestions(), 200);
    });

    return cleanup;
}

/**
 * 设置标签自动完成
 */
export function setupTagAutocomplete(
    getExistingTags: () => string[],
    tagInput: HTMLInputElement,
    container: HTMLElement,
    tagListContainer: HTMLElement,
    currentTags: string[],
    onAddTag: (tag: string) => void,
    onRenderTagList: (tags: string[]) => void
): void {
    let tagSuggestionContainer: HTMLElement | null = null;
    let suggestionTimeout: NodeJS.Timeout;

    const hideTagSuggestions = () => {
        if (tagSuggestionContainer) {
            tagSuggestionContainer.remove();
            tagSuggestionContainer = null;
        }
    };

    const setActiveTagSuggestion = (items: NodeListOf<Element> | any[], index: number) => {
        items.forEach((item: Element, i: number) => {
            if (i === index) {
                item.classList.add("jots-tag-suggestion-item-active");
                (item as HTMLElement).style.backgroundColor = "var(--background-modifier-hover)";
            } else {
                item.classList.remove("jots-tag-suggestion-item-active");
                (item as HTMLElement).style.backgroundColor = "";
            }
        });
    };

    const showTagSuggestions = (searchTerm: string) => {
        const allTags = getExistingTags();
        const searchLower = searchTerm.toLowerCase();
        const matches = allTags
            .filter(tag => tag.toLowerCase().includes(searchLower))
            .filter(tag => !currentTags.includes(tag))
            .slice(0, 8);

        if (matches.length === 0) {
            hideTagSuggestions();
            return;
        }

        if (!tagSuggestionContainer) {
            tagSuggestionContainer = container.createDiv();
            tagSuggestionContainer.classList.add("jots-tag-suggestions");
            tagSuggestionContainer.style.position = "absolute";
            tagSuggestionContainer.style.top = "100%";
            tagSuggestionContainer.style.left = "0";
            tagSuggestionContainer.style.right = "0";
            tagSuggestionContainer.style.backgroundColor = "var(--background-primary)";
            tagSuggestionContainer.style.border = "1px solid var(--background-modifier-border)";
            tagSuggestionContainer.style.borderRadius = "6px";
            tagSuggestionContainer.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            tagSuggestionContainer.style.zIndex = "1000";
            tagSuggestionContainer.style.maxHeight = "200px";
            tagSuggestionContainer.style.overflowY = "auto";
        }

        tagSuggestionContainer.empty();

        matches.forEach((tag, index) => {
            const item = tagSuggestionContainer!.createDiv();
            item.classList.add("jots-tag-suggestion-item");
            item.textContent = `#${tag}`;
            item.style.padding = "6px 12px";
            item.style.cursor = "pointer";
            item.style.fontSize = "12px";
            item.style.borderBottom = "1px solid var(--background-modifier-border)";
            item.style.color = "var(--text-normal)";

            if (index === 0) {
                item.classList.add("jots-tag-suggestion-item-active");
                item.style.backgroundColor = "var(--background-modifier-hover)";
            }

            item.addEventListener("click", () => {
                onAddTag(tag);
                tagInput.value = "";
                hideTagSuggestions();
                tagInput.focus();
            });

            item.addEventListener("mouseenter", () => {
                setActiveTagSuggestion(matches, index);
            });
        });

        const rect = tagInput.getBoundingClientRect();
        tagSuggestionContainer.style.top = `${rect.height}px`;
    };

    tagInput.addEventListener("input", () => {
        const value = tagInput.value;
        const currentWord = value.trim();

        if (currentWord.length > 0) {
            clearTimeout(suggestionTimeout);
            suggestionTimeout = setTimeout(() => {
                showTagSuggestions(currentWord);
            }, 100);
        } else {
            hideTagSuggestions();
        }
    });

    tagInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = tagInput.value.trim();

            if (tagSuggestionContainer) {
                const activeItem = tagSuggestionContainer.querySelector(".jots-tag-suggestion-item-active");
                if (activeItem) {
                    const tag = activeItem.textContent?.replace("#", "") || "";
                    onAddTag(tag);
                    hideTagSuggestions();
                    return;
                }
            }

            if (value && !value.includes(" ")) {
                onAddTag(value);
            }
            return;
        }

        if (e.key === "Tab" && tagSuggestionContainer) {
            e.preventDefault();
            const activeItem = tagSuggestionContainer.querySelector(".jots-tag-suggestion-item-active");
            if (activeItem) {
                const tag = activeItem.textContent?.replace("#", "") || "";
                onAddTag(tag);
                hideTagSuggestions();
            }
            return;
        }

        if (e.key === " ") {
            e.preventDefault();
            return;
        }

        if (!tagSuggestionContainer) return;

        const items = tagSuggestionContainer.querySelectorAll(".jots-tag-suggestion-item");
        const activeItem = tagSuggestionContainer.querySelector(".jots-tag-suggestion-item-active");
        let activeIndex = -1;

        items.forEach((item, index) => {
            if (item === activeItem) activeIndex = index;
        });

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextIndex = (activeIndex + 1) % items.length;
            setActiveTagSuggestion(items, nextIndex);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prevIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
            setActiveTagSuggestion(items, prevIndex);
        } else if (e.key === "Escape") {
            hideTagSuggestions();
        }
    });

    tagInput.addEventListener("blur", () => {
        setTimeout(() => {
            const value = tagInput.value.trim();
            if (value && !value.includes(" ") && !currentTags.includes(value)) {
                onAddTag(value);
            }
            hideTagSuggestions();
        }, 200);
    });
}

/**
 * 渲染标签列表
 */
export function renderTagList(
    container: HTMLElement,
    tags: string[],
    onRemoveTag: (tag: string) => void
): void {
    container.empty();

    tags.forEach(tag => {
        const tagPill = container.createSpan();
        tagPill.textContent = `#${tag}`;
        tagPill.style.padding = "4px 10px";
        tagPill.style.backgroundColor = "var(--background-primary-alt)";
        tagPill.style.borderRadius = "12px";
        tagPill.style.fontSize = "11px";
        tagPill.style.display = "inline-flex";
        tagPill.style.alignItems = "center";
        tagPill.style.gap = "6px";
        tagPill.style.border = "1px solid var(--background-modifier-border)";
        tagPill.style.cursor = "pointer";

        const removeBtn = tagPill.createSpan();
        removeBtn.textContent = "×";
        removeBtn.style.cursor = "pointer";
        removeBtn.style.fontWeight = "bold";
        removeBtn.style.marginLeft = "4px";
        removeBtn.style.fontSize = "12px";
        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            onRemoveTag(tag);
        });
    });
}

/**
 * 高亮 Markdown 内容
 */
export function highlightMarkdownContent(
    container: HTMLElement,
    keywords: string[]
): void {
    if (!keywords.length) return;

    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => {
                if (node.parentElement?.classList?.contains('search-highlight')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const textNodes: Text[] = [];
    let node: Text | null;
    while (node = walker.nextNode() as Text | null) {
        textNodes.push(node);
    }

    const pattern = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${pattern})`, 'gi');

    textNodes.forEach(textNode => {
        const text = textNode.textContent || '';
        if (regex.test(text)) {
            regex.lastIndex = 0;
            const fragment = document.createDocumentFragment();
            let lastIndex = 0;
            let match;

            while ((match = regex.exec(text)) !== null) {
                if (match.index > lastIndex) {
                    fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
                }
                const mark = document.createElement('mark');
                mark.className = 'search-highlight';
                mark.textContent = match[0];
                fragment.appendChild(mark);
                lastIndex = match.index + match[0].length;
            }
            if (lastIndex < text.length) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
            }
            textNode.parentNode?.replaceChild(fragment, textNode);
        }
    });
}
