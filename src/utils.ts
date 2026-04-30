// src/utils.ts
import { App, TFile, TFolder, Notice } from 'obsidian';
import moment from 'moment';
import { Jot, JotSettings, Language } from './types';
import { t, Translations } from './i18n';

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

/** Strip leading #, trim, drop empties, dedupe (first occurrence wins). */
export function normalizeJotTags(tags: string[]): string[] {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const raw of tags) {
        const s = raw.replace(/^#+/, "").trim();
        if (!s || seen.has(s)) continue;
        seen.add(s);
        out.push(s);
    }
    return out;
}

export function newJotId(): string {
    if (typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.randomUUID === "function") {
        return globalThis.crypto.randomUUID();
    }
    return `jot-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** Deterministic id for entries that have no `#### id:` line (backward compatibility). */
export function stableLegacyJotId(filePath: string, date: string, time: string): string {
    const s = `${filePath}\0${date}\0${time}`;
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return `jot-legacy-${(h >>> 0).toString(16)}`;
}

export function formatJotEntryBlock(fullDateTime: string, id: string, updatedAt: string, body: string): string {
    return `### ${fullDateTime}\n#### id: ${id}\n#### updatedAt: ${updatedAt}\n\n${body}\n\n---\n\n`;
}

export function composeJotMarkdownBody(
    content: string,
    tags: string[],
    source: string,
    attachments: { path: string; type: "image" | "file" }[] | undefined,
    lang: Language,
    useFixedTag: boolean,
    fixedTag: string
): { body: string; allTags: string[] } {
    let allTags = normalizeJotTags(tags);
    if (useFixedTag && fixedTag) {
        const fixedTagClean = fixedTag.replace(/^#+/, "").trim();
        if (!allTags.includes(fixedTagClean)) allTags.push(fixedTagClean);
    }
    allTags = normalizeJotTags(allTags);
    const tagLine = allTags.length > 0 ? allTags.map(x => `#${x}`).join(" ") : "";
    let finalContent = content;
    const attachmentLines =
        attachments && attachments.length > 0
            ? attachments.map(att => (att.type === "image" ? `![[${att.path}]]` : `[[${att.path}]]`)).join("\n")
            : "";
    if (tagLine) finalContent += `\n\n${tagLine}`;
    if (source) {
        const sourcePrefix = lang === "zh" ? "来源:" : "Source:";
        finalContent += `\n\n${sourcePrefix} ${source}`;
    }
    if (attachmentLines) finalContent += `\n\n${attachmentLines}`;
    return { body: finalContent, allTags };
}

/** Replace one `###` jot block by id; preserves prefix (e.g. frontmatter) and other blocks. */
export function replaceJotBlockById(
    content: string,
    filePath: string,
    targetId: string,
    newBlock: string
): { content: string; found: boolean } {
    const lines = content.split("\n");
    let i = 0;
    while (i < lines.length) {
        const lineTrim = lines[i].trim();
        if (lineTrim.startsWith("### ")) {
            const blockStart = i;
            const headerRest = lineTrim.substring(4).trim();
            const [date, time] = headerRest.split(" ");
            let metaId = "";
            let j = i + 1;
            while (j < lines.length) {
                const t = lines[j].trim();
                const idMatch = t.match(/^####\s+id:\s*(.+)$/i);
                if (idMatch) {
                    metaId = idMatch[1].trim();
                    j++;
                    continue;
                }
                if (/^####\s+updatedAt:\s*.+$/i.test(t)) {
                    j++;
                    continue;
                }
                break;
            }
            const id = metaId || stableLegacyJotId(filePath, date || "", time || "");
            let k = j;
            while (k < lines.length && !lines[k].trim().startsWith("### ")) {
                k++;
            }
            if (id === targetId) {
                const prefix = lines.slice(0, blockStart).join("\n");
                const suffix = lines.slice(k).join("\n");
                let next = "";
                if (prefix) next = prefix + "\n";
                next += newBlock;
                if (suffix) next += suffix;
                return { content: next, found: true };
            }
            i = k;
        } else {
            i++;
        }
    }
    return { content, found: false };
}

/** Remove one `###` jot block by id; preserves prefix and following blocks. */
export function removeJotBlockById(
    content: string,
    filePath: string,
    targetId: string
): { content: string; found: boolean } {
    const lines = content.split("\n");
    let i = 0;
    while (i < lines.length) {
        const lineTrim = lines[i].trim();
        if (lineTrim.startsWith("### ")) {
            const blockStart = i;
            const headerRest = lineTrim.substring(4).trim();
            const [date, time] = headerRest.split(" ");
            let metaId = "";
            let j = i + 1;
            while (j < lines.length) {
                const t = lines[j].trim();
                const idMatch = t.match(/^####\s+id:\s*(.+)$/i);
                if (idMatch) {
                    metaId = idMatch[1].trim();
                    j++;
                    continue;
                }
                if (/^####\s+updatedAt:\s*.+$/i.test(t)) {
                    j++;
                    continue;
                }
                break;
            }
            const id = metaId || stableLegacyJotId(filePath, date || "", time || "");
            let k = j;
            while (k < lines.length && !lines[k].trim().startsWith("### ")) {
                k++;
            }
            if (id === targetId) {
                const prefix = lines.slice(0, blockStart).join("\n");
                const suffix = lines.slice(k).join("\n");
                let next = prefix;
                if (suffix) {
                    next = next ? `${next}\n${suffix}` : suffix;
                }
                next = next.replace(/\n{4,}/g, "\n\n\n");
                return { content: next, found: true };
            }
            i = k;
        } else {
            i++;
        }
    }
    return { content, found: false };
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
            const createdAt = [date, time].filter(Boolean).join(" ");

            let j = i + 1;
            let idMeta = "";
            let updatedAtMeta = "";
            while (j < lines.length) {
                const t = lines[j].trim();
                const idMatch = t.match(/^####\s+id:\s*(.*)$/i);
                const updMatch = t.match(/^####\s+updatedAt:\s*(.*)$/i);
                if (idMatch) {
                    idMeta = idMatch[1].trim();
                    j++;
                    continue;
                }
                if (updMatch) {
                    updatedAtMeta = updMatch[1].trim();
                    j++;
                    continue;
                }
                break;
            }
            const id = idMeta || stableLegacyJotId(filePath, date || "", time || "");
            const updatedAt = updatedAtMeta || createdAt;

            let jotContent = "";
            let tags: string[] = [];
            let source = "";
            let attachments: string[] = [];
            let attachmentTypes: ("image" | "file")[] = [];

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
                        tags = normalizeJotTags(tagMatches);
                    }
                }
                // 检查是否是来源行
                else {
                    const matchedPrefix = sourcePrefixes.find(p => trimmedLine.startsWith(p));
                    if (matchedPrefix) {
                        source = trimmedLine.substring(matchedPrefix.length).trim();
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
                    id,
                    createdAt,
                    updatedAt,
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
 * Image detection for clipboard + vault saves: trust `image/*`, and when MIME is missing
 * or generic (`application/octet-stream`) use common image extensions (platform paste quirks).
 */
function isProbablyImageFile(file: File): boolean {
    if (file.type.startsWith("image/")) return true;
    if (file.type && file.type !== "application/octet-stream") return false;
    return /\.(png|jpe?g|gif|webp|bmp|svg|heic|heif|avif)$/i.test(file.name);
}

/** Clipboard image files for paste handling (`files` first, then `items` for some browsers). */
export function getClipboardImageFiles(dataTransfer: DataTransfer | null): File[] {
    if (!dataTransfer) return [];
    const fromFiles = Array.from(dataTransfer.files ?? []).filter(isProbablyImageFile);
    if (fromFiles.length > 0) return fromFiles;
    const out: File[] = [];
    for (const item of Array.from(dataTransfer.items ?? [])) {
        if (item.kind !== "file") continue;
        const t = item.type;
        if (!t.startsWith("image/") && t !== "" && t !== "application/octet-stream") continue;
        const f = item.getAsFile();
        if (f && isProbablyImageFile(f)) out.push(f);
    }
    return out;
}

/**
 * 处理附件保存（修复无限递归和文件名匹配问题）
 */
export async function handleAttachment(
    app: App,
    file: File,
    settings: JotSettings,
    lang: Language,
    callback: (result: { path: string; type: "image" | "file" }) => void,
    options?: { failureNoticeKey?: keyof Translations }
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

        const isImage = isProbablyImageFile(file);
        callback({ path: filePath, type: isImage ? "image" : "file" });
        new Notice(t('attachmentSaved', lang, { filename }));
    } catch (error) {
        console.error("保存附件失败:", error);
        const noticeKey = options?.failureNoticeKey ?? "saveFailed";
        new Notice(t(noticeKey, lang, { error: (error as Error).message }));
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
