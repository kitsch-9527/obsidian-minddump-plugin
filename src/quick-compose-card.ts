// src/quick-compose-card.ts
import { App, Notice, TFile, normalizePath } from "obsidian";
import type { Language, JotSettings } from "./types";
import { t, Translations } from "./i18n";
import {
    getClipboardImageFiles,
    handleAttachment,
    renderTagList as renderTagPills,
    setupTagAutocomplete,
    setupWikilinkAutocomplete,
} from "./utils";

export type QuickComposeAttachment = { path: string; type: "image" | "file" };

export interface QuickComposeCardDeps {
    app: App;
    lang: Language;
    pluginSettings: JotSettings;
    getExistingTags: () => string[];
}

export interface QuickComposeCardApi {
    root: HTMLElement;
    textarea: HTMLTextAreaElement;
    focusTextarea: () => void;
    wikilinkCleanup: (() => void) | null;
}

function insertTextAtCursor(textarea: HTMLTextAreaElement, text: string) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = textarea.value;
    textarea.value = val.slice(0, start) + text + val.slice(end);
    const cursor = start + text.length;
    textarea.selectionStart = cursor;
    textarea.selectionEnd = cursor;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

export function createPaperPlaneSendIcon(): SVGSVGElement {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "jots-quick-send-icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");
    const outline = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    outline.setAttribute("points", "22 2 15 22 11 13 2 9 22 2");
    outline.setAttribute("stroke", "currentColor");
    outline.setAttribute("stroke-width", "2");
    outline.setAttribute("stroke-linecap", "round");
    outline.setAttribute("stroke-linejoin", "round");
    const fold = document.createElementNS("http://www.w3.org/2000/svg", "line");
    fold.setAttribute("x1", "22");
    fold.setAttribute("y1", "2");
    fold.setAttribute("x2", "11");
    fold.setAttribute("y2", "13");
    fold.setAttribute("stroke", "currentColor");
    fold.setAttribute("stroke-width", "2");
    fold.setAttribute("stroke-linecap", "round");
    svg.appendChild(outline);
    svg.appendChild(fold);
    return svg;
}

/** Remove the first `![[...]]` whose path normalizes to `vaultPath`. */
function stripFirstImageEmbedByVaultPath(text: string, vaultPath: string): string {
    const re = /!\[\[([^\]]+)\]\]/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
        if (normalizePath(m[1].trim()) !== vaultPath) continue;
        const start = m.index;
        const end = start + m[0].length;
        return (text.slice(0, start) + text.slice(end)).replace(/\n{3,}/g, "\n\n");
    }
    return text;
}

type CaptureOptions = {
    mode: "capture";
    parent: HTMLElement;
    deps: QuickComposeCardDeps;
    onSave: (payload: {
        content: string;
        tags: string[];
        source: string;
        attachments: QuickComposeAttachment[];
    }) => Promise<void>;
    onAfterSave?: () => void;
};

type EditOptions = {
    mode: "edit";
    parent: HTMLElement;
    deps: QuickComposeCardDeps;
    initial: {
        content: string;
        tags: string[];
        source: string;
        attachments?: QuickComposeAttachment[];
    };
    onSave: (payload: {
        content: string;
        tags: string[];
        source: string;
        attachments: QuickComposeAttachment[];
    }) => Promise<void>;
    onCancel: () => void;
};

export type MountQuickComposeCardOptions = CaptureOptions | EditOptions;

/** Shared “快速记录” UI: textarea, embed previews, tags, source, attachments, toolbar, send (and edit: cancel). */
export function mountQuickComposeCard(options: MountQuickComposeCardOptions): QuickComposeCardApi {
    const { parent, deps } = options;
    const { app, lang, pluginSettings, getExistingTags } = deps;
    const isEdit = options.mode === "edit";

    const inputCard = parent.createDiv({ cls: "jots-quick-compose-card" });
    if (isEdit) inputCard.addClass("jots-quick-compose-card--inline-edit");

    const textareaContainer = inputCard.createDiv({ cls: "jots-quick-textarea-container" });
    const textarea = textareaContainer.createEl("textarea", { cls: "jots-quick-textarea" });
    textarea.placeholder = isEdit ? t("placeholderWithLink", lang) : t("contentPlaceholder", lang);

    /** Autosize height with content; cap from CSS `max-height` (half viewport). Assigned after compact-mode setup. */
    let syncQuickTextareaHeight: () => void = () => {};

    /** Capture-only: compact until click/type; scroll-down collapses when empty; draft + sticky until cleared or send. */
    let expandCompactTextarea: () => void = () => {};
    let markCompactDrafted: () => void = () => {};
    let resetCompactCaptureState: () => void = () => {};
    let syncCompactDraftLockFromContent: () => void = () => {};
    if (!isEdit) {
        inputCard.addClass("jots-quick-compose-card--textarea-compact");
        let compactUserHasDrafted = false;
        let compactScrollCleanup: (() => void) | null = null;
        let compactLastScrollTop = 0;

        const findScrollParent = (start: HTMLElement): HTMLElement | null => {
            let p: HTMLElement | null = start.parentElement;
            while (p) {
                const st = getComputedStyle(p);
                if (st.overflowY === "auto" || st.overflowY === "scroll") return p;
                if (st.overflow === "auto" || st.overflow === "scroll") return p;
                p = p.parentElement;
            }
            return null;
        };

        const bindCompactScrollCollapse = () => {
            compactScrollCleanup?.();
            compactScrollCleanup = null;
            const sp = findScrollParent(inputCard);
            if (!sp) return;
            compactLastScrollTop = sp.scrollTop;
            const onScroll = () => {
                if (compactUserHasDrafted) {
                    compactLastScrollTop = sp.scrollTop;
                    return;
                }
                if (!inputCard.classList.contains("jots-quick-compose-card--textarea-expanded")) return;
                const st = sp.scrollTop;
                if (st > compactLastScrollTop + 6) {
                    inputCard.addClass("jots-quick-compose-card--textarea-compact");
                    inputCard.removeClass("jots-quick-compose-card--textarea-expanded");
                    compactScrollCleanup?.();
                    compactScrollCleanup = null;
                }
                compactLastScrollTop = st;
            };
            sp.addEventListener("scroll", onScroll, { passive: true });
            compactScrollCleanup = () => {
                sp.removeEventListener("scroll", onScroll);
                compactScrollCleanup = null;
            };
        };

        expandCompactTextarea = () => {
            if (inputCard.classList.contains("jots-quick-compose-card--textarea-expanded")) return;
            inputCard.removeClass("jots-quick-compose-card--textarea-compact");
            inputCard.addClass("jots-quick-compose-card--textarea-expanded");
            bindCompactScrollCollapse();
            syncQuickTextareaHeight();
        };

        resetCompactCaptureState = () => {
            compactUserHasDrafted = false;
            compactScrollCleanup?.();
            compactScrollCleanup = null;
            inputCard.addClass("jots-quick-compose-card--textarea-compact");
            inputCard.removeClass("jots-quick-compose-card--textarea-expanded");
            syncQuickTextareaHeight();
        };

        markCompactDrafted = () => {
            compactUserHasDrafted = true;
            expandCompactTextarea();
        };

        syncCompactDraftLockFromContent = () => {
            const hasDraft = textarea.value.trim().length > 0 || selectedAttachments.length > 0;
            if (hasDraft) return;
            compactUserHasDrafted = false;
        };

        textareaContainer.addEventListener("pointerdown", (e: PointerEvent) => {
            if (!e.isTrusted) return;
            expandCompactTextarea();
        });
    }

    syncQuickTextareaHeight = () => {
        if (!isEdit && inputCard.classList.contains("jots-quick-compose-card--textarea-compact")) {
            textarea.style.removeProperty("height");
            textarea.style.removeProperty("overflow-y");
            return;
        }
        const cs = getComputedStyle(textarea);
        const minH = parseFloat(cs.minHeight) || 140;
        const maxParsed = parseFloat(cs.maxHeight);
        const cap =
            Number.isFinite(maxParsed) && maxParsed > 0 ? maxParsed : Math.floor(window.innerHeight * 0.5);
        textarea.style.height = "auto";
        const sh = textarea.scrollHeight;
        const next = Math.max(minH, Math.min(sh, cap));
        textarea.style.height = `${next}px`;
        textarea.style.overflowY = sh > cap ? "auto" : "hidden";
    };

    const runWikilink = () =>
        setupWikilinkAutocomplete(app, textarea, textareaContainer, (file, ta, bracketStart) => {
            const cursorPos = ta.selectionStart;
            const textBefore = ta.value.substring(0, bracketStart);
            const textAfter = ta.value.substring(cursorPos);
            const newText = textBefore + `[[${file.basename}]]` + textAfter;
            ta.value = newText;
            const newCursorPos = bracketStart + file.basename.length + 4;
            ta.selectionStart = newCursorPos;
            ta.selectionEnd = newCursorPos;
            expandCompactTextarea();
            ta.focus();
            ta.dispatchEvent(new Event("input", { bubbles: true }));
            markCompactDrafted();
        });
    const wikilinkCleanup = runWikilink();

    const embedPreviewRow = inputCard.createDiv({ cls: "jots-quick-embed-preview" });

    const isVaultImagePath = (p: string) => /\.(png|jpe?g|gif|webp|bmp|svg|heic|heif|avif)$/i.test(p);

    let removeImageEverywhere!: (vaultPath: string) => void;

    const refreshEmbedPreviews = () => {
        embedPreviewRow.empty();
        const text = textarea.value;
        const re = /!\[\[([^\]]+)\]\]/g;
        const seen = new Set<string>();
        let m: RegExpExecArray | null;
        while ((m = re.exec(text)) != null) {
            const raw = m[1].trim();
            const vaultPath = normalizePath(raw);
            if (seen.has(vaultPath)) continue;
            seen.add(vaultPath);
            const af = app.vault.getAbstractFileByPath(vaultPath);
            if (!(af instanceof TFile) || !isVaultImagePath(af.path)) continue;
            const thumb = embedPreviewRow.createDiv({ cls: "jots-quick-embed-thumb jots-quick-embed-thumb--removable" });
            const img = thumb.createEl("img", { cls: "jots-quick-embed-img" });
            img.src = app.vault.getResourcePath(af);
            img.alt = af.name;
            const rm = thumb.createEl("button", {
                cls: "jots-quick-embed-remove",
                type: "button",
                attr: { "aria-label": t("removeEditorImage", lang) },
            });
            rm.textContent = "×";
            rm.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                removeImageEverywhere(vaultPath);
            });
        }
    };

    const tagSection = inputCard.createDiv({ cls: "jots-quick-meta-section" });
    const tagInputContainer = tagSection.createDiv({ cls: "jots-quick-meta-input-container" });
    const tagInput = tagInputContainer.createEl("input", { cls: "jots-tag-input jots-quick-meta-input" });
    tagInput.placeholder = t("tagsInputPlaceholder", lang);

    const tagListContainer = tagSection.createDiv({ cls: "jots-quick-tag-list" });
    /** Same array reference for `setupTagAutocomplete` (it reads `includes` / filters against this). */
    const sessionTags: string[] = isEdit ? [...options.initial.tags] : [];
    /** When set, the next commit from the tag input replaces this tag (click pill to edit). */
    let replacingTag: string | null = null;
    /** Bumped on `beginEditTag` so blur follow-ups from “click another pill” do not clear the new edit. */
    let tagBlurFinalizeGen = 0;

    const applyTagFromInputString = (raw: string) => {
        const cleaned = raw.replace(/^#+/, "").trim();
        if (replacingTag) {
            const idx = sessionTags.indexOf(replacingTag);
            if (idx >= 0) sessionTags.splice(idx, 1);
            replacingTag = null;
            if (cleaned && !sessionTags.includes(cleaned)) {
                sessionTags.push(cleaned);
            }
            paintTagPills();
            tagInput.value = "";
            return;
        }
        if (cleaned && !sessionTags.includes(cleaned)) {
            sessionTags.push(cleaned);
            paintTagPills();
            tagInput.value = "";
        }
    };

    const beginEditTag = (tag: string) => {
        tagBlurFinalizeGen++;
        replacingTag = tag;
        tagSection.style.display = "block";
        tagInput.value = tag;
        tagInput.focus();
        tagInput.select();
    };

    const paintTagPills = () => {
        renderTagPills(
            tagListContainer,
            sessionTags,
            (tag) => {
                const i = sessionTags.indexOf(tag);
                if (i >= 0) sessionTags.splice(i, 1);
                if (replacingTag === tag) {
                    replacingTag = null;
                    tagInput.value = "";
                }
                paintTagPills();
            },
            beginEditTag,
            t("tagPillClickToEdit", lang)
        );
    };
    paintTagPills();

    setupTagAutocomplete(
        getExistingTags,
        tagInput,
        tagInputContainer,
        tagListContainer,
        sessionTags,
        (tag) => {
            applyTagFromInputString(tag);
        },
        () => paintTagPills()
    );

    tagInput.addEventListener(
        "keydown",
        (e) => {
            if (e.key !== "Escape" || !replacingTag) return;
            e.preventDefault();
            e.stopPropagation();
            replacingTag = null;
            tagInput.value = "";
        },
        true
    );

    tagInput.addEventListener("blur", () => {
        const gen = tagBlurFinalizeGen;
        queueMicrotask(() => {
            if (gen !== tagBlurFinalizeGen) return;
            if (tagInput.ownerDocument.activeElement === tagInput) return;
            if (!replacingTag) return;
            const v = tagInput.value.replace(/^#+/, "").trim();
            if (v === replacingTag) {
                replacingTag = null;
                tagInput.value = "";
            } else if (v === "") {
                const idx = sessionTags.indexOf(replacingTag);
                if (idx >= 0) sessionTags.splice(idx, 1);
                replacingTag = null;
                tagInput.value = "";
                paintTagPills();
            }
        });
        // Match `setupTagAutocomplete` blur delay so clicks on suggestions/pills run first.
        window.setTimeout(() => {
            if (gen !== tagBlurFinalizeGen) return;
            if (tagInput.ownerDocument.activeElement === tagInput) return;
            const ae = tagInput.ownerDocument.activeElement as Node | null;
            if (ae && tagSection.contains(ae)) return;
            if (replacingTag) return;
            const v = tagInput.value.replace(/^#+/, "").trim();
            if (v !== "") return;
            tagSection.style.display = "none";
        }, 200);
    });

    const sourceSection = inputCard.createDiv({ cls: "jots-quick-source-section" });
    const sourceInput = sourceSection.createEl("input", { cls: "jots-quick-meta-input" });
    sourceInput.placeholder = t("sourcePlaceholder", lang);

    tagSection.style.display = isEdit ? "block" : "none";
    sourceSection.style.display = "none";

    if (isEdit) {
        textarea.value = options.initial.content;
        sourceInput.value = options.initial.source;
    }
    syncQuickTextareaHeight();

    const attachmentTray = inputCard.createDiv({ cls: "jots-quick-attachment-tray" });
    let selectedAttachments: QuickComposeAttachment[] = isEdit
        ? [...(options.initial.attachments ?? [])]
        : [];
    let syncQuickSendReady: () => void = () => {};

    const attachFile = async (
        file: File,
        opts?: { failureNoticeKey?: keyof Translations }
    ) => {
        await handleAttachment(app, file, pluginSettings, lang, (result) => {
            selectedAttachments.push(result);
            renderAttachmentTray();
        }, opts);
    };

    const openAttachmentPicker = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;
        input.addEventListener("change", async () => {
            const files = Array.from(input.files || []);
            for (const file of files) {
                await attachFile(file);
            }
        });
        input.click();
    };

    const renderAttachmentTray = () => {
        attachmentTray.empty();

        selectedAttachments.forEach((attachment, index) => {
            const pathNorm = normalizePath(attachment.path);
            const imgFile =
                attachment.type === "image"
                    ? app.vault.getAbstractFileByPath(pathNorm)
                    : null;
            const isImageTile =
                attachment.type === "image" && imgFile instanceof TFile && isVaultImagePath(imgFile.path);

            const item = attachmentTray.createDiv({
                cls: isImageTile
                    ? "jots-quick-attachment-item jots-quick-attachment-item--image-tile"
                    : "jots-quick-attachment-item",
            });

            if (isImageTile) {
                const thumb = item.createDiv({ cls: "jots-quick-embed-thumb jots-quick-embed-thumb--removable" });
                const img = thumb.createEl("img", { cls: "jots-quick-embed-img" });
                img.src = app.vault.getResourcePath(imgFile);
                img.alt = imgFile.name;
                const overlayRm = thumb.createEl("button", {
                    cls: "jots-quick-embed-remove",
                    type: "button",
                    attr: { "aria-label": t("removeEditorImage", lang) },
                });
                overlayRm.textContent = "×";
                overlayRm.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeImageEverywhere(pathNorm);
                });
                const cap = item.createDiv({ cls: "jots-quick-attachment-item-caption" });
                cap.textContent = attachment.path.split("/").pop() || attachment.path;
                cap.title = attachment.path;
            } else if (attachment.type === "image") {
                const icon = item.createSpan({ cls: "jots-quick-attachment-icon" });
                icon.textContent = "🖼️";
                const label = item.createSpan({ cls: "jots-quick-attachment-label" });
                label.textContent = attachment.path.split("/").pop() || attachment.path;
                label.title = attachment.path;
                const removeBtn = item.createEl("button", { cls: "jots-quick-attachment-remove" });
                removeBtn.type = "button";
                removeBtn.textContent = "×";
                removeBtn.setAttribute("aria-label", t("removeEditorImage", lang));
                removeBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectedAttachments.splice(index, 1);
                    textarea.value = stripFirstImageEmbedByVaultPath(textarea.value, pathNorm);
                    renderAttachmentTray();
                    refreshEmbedPreviews();
                    syncQuickSendReady();
                    syncQuickTextareaHeight();
                });
            } else {
                const icon = item.createSpan({ cls: "jots-quick-attachment-icon" });
                icon.textContent = "📎";
                const label = item.createSpan({ cls: "jots-quick-attachment-label" });
                label.textContent = attachment.path.split("/").pop() || attachment.path;
                label.title = attachment.path;
                const removeBtn = item.createEl("button", { cls: "jots-quick-attachment-remove" });
                removeBtn.type = "button";
                removeBtn.textContent = "×";
                removeBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectedAttachments.splice(index, 1);
                    renderAttachmentTray();
                    syncQuickSendReady();
                });
            }
        });
        syncQuickSendReady();
        if (!isEdit && selectedAttachments.length > 0) markCompactDrafted();
        if (!isEdit) syncCompactDraftLockFromContent();
    };

    removeImageEverywhere = (vaultPath: string) => {
        textarea.value = stripFirstImageEmbedByVaultPath(textarea.value, vaultPath);
        selectedAttachments = selectedAttachments.filter((a) => normalizePath(a.path) !== vaultPath);
        renderAttachmentTray();
        refreshEmbedPreviews();
        syncQuickSendReady();
        syncQuickTextareaHeight();
    };

    renderAttachmentTray();
    refreshEmbedPreviews();

    textarea.addEventListener("input", (e: Event) => {
        if (!isEdit) {
            if ((e as InputEvent).isTrusted) {
                expandCompactTextarea();
                if (textarea.value.trim().length > 0) markCompactDrafted();
            }
            syncCompactDraftLockFromContent();
        }
        refreshEmbedPreviews();
        syncQuickSendReady();
        syncQuickTextareaHeight();
    });

    const setDropActive = (active: boolean) => {
        textareaContainer.classList.toggle("is-drop-active", active);
    };

    textareaContainer.addEventListener("dragover", (e) => {
        e.preventDefault();
        setDropActive(true);
    });

    textareaContainer.addEventListener("dragleave", () => {
        setDropActive(false);
    });

    textareaContainer.addEventListener("drop", async (e) => {
        e.preventDefault();
        setDropActive(false);
        const files = Array.from(e.dataTransfer?.files || []);
        for (const file of files) {
            await attachFile(file);
        }
    });

    textarea.addEventListener("paste", async (e: ClipboardEvent) => {
        const imageFiles = getClipboardImageFiles(e.clipboardData);
        if (imageFiles.length === 0) return;
        e.preventDefault();
        const plain = e.clipboardData?.getData("text/plain") ?? "";
        for (const file of imageFiles) {
            await attachFile(file, { failureNoticeKey: "pasteImageUploadFailed" });
        }
        if (plain) {
            insertTextAtCursor(textarea, plain);
            markCompactDrafted();
        }
        refreshEmbedPreviews();
        expandCompactTextarea();
        textarea.focus();
        syncQuickTextareaHeight();
    });

    const toolbarRow = inputCard.createDiv({ cls: "jots-quick-toolbar-row" });

    const toolGroup = toolbarRow.createDiv({ cls: "jots-quick-tools jots-tool-menu" });

    const createToolBtn = (label: string | SVGSVGElement, tooltip: string, onClick: () => void) => {
        const btn = toolGroup.createEl("button", { cls: "jots-quick-tool-btn jots-tool-btn--text" });
        btn.type = "button";
        const inner = btn.createSpan({ cls: "jots-tool-btn-inner" });
        if (typeof label === "string") {
            inner.textContent = label;
        } else {
            inner.appendChild(label);
        }
        btn.title = tooltip;
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            onClick();
        });
    };

    const createToolbarImageIcon = (): SVGSVGElement => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "jots-toolbar-image-icon");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("aria-hidden", "true");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill", "currentColor");
        path.setAttribute("fill-rule", "evenodd");
        path.setAttribute(
            "d",
            "M7.5 5L16.5 5A2.5 2.5 0 0 1 19 7.5L19 16.5A2.5 2.5 0 0 1 16.5 19L7.5 19A2.5 2.5 0 0 1 5 16.5L5 7.5A2.5 2.5 0 0 1 7.5 5Z" +
                "M10 8.5A1.25 1.25 0 1 0 7.5 8.5A1.25 1.25 0 1 0 10 8.5Z" +
                "M6.5 17.5L10 12.5L12.3 15L17 10.2L17.5 17.5Z"
        );
        svg.appendChild(path);
        return svg;
    };

    const addToolDivider = () => {
        toolGroup.createSpan({ cls: "jots-vertical-line" });
    };

    const toggleSection = (section: HTMLElement, focusInput: HTMLInputElement) => {
        const isHidden = section.style.display === "none" || window.getComputedStyle(section).display === "none";
        const willShow = isHidden;
        section.style.display = willShow ? "block" : "none";
        if (willShow) focusInput.focus();
    };

    createToolBtn("#", t("tagsInputPlaceholder", lang), () => toggleSection(tagSection, tagInput));
    createToolBtn(createToolbarImageIcon(), t("attachmentPlaceholder", lang), () => openAttachmentPicker());
    addToolDivider();
    createToolBtn("Aa", t("quickRecord", lang), () => {
        expandCompactTextarea();
        textarea.focus();
    });
    createToolBtn("☰", t("quickRecord", lang), () => {
        expandCompactTextarea();
        insertTextAtCursor(textarea, textarea.value.endsWith("\n") || textarea.value.length === 0 ? "- " : "\n- ");
        markCompactDrafted();
        textarea.focus();
    });
    createToolBtn("1.", t("quickRecord", lang), () => {
        expandCompactTextarea();
        insertTextAtCursor(textarea, textarea.value.endsWith("\n") || textarea.value.length === 0 ? "1. " : "\n1. ");
        markCompactDrafted();
        textarea.focus();
    });
    addToolDivider();
    createToolBtn("@", t("sourcePlaceholder", lang), () => toggleSection(sourceSection, sourceInput));

    const sendGroup = toolbarRow.createDiv({ cls: "jots-quick-toolbar-send-group" });
    if (isEdit) {
        const cancelBtn = sendGroup.createEl("button", {
            cls: "jots-quick-edit-cancel-btn",
            type: "button",
        });
        cancelBtn.textContent = t("cancel", lang);
        cancelBtn.title = t("cancel", lang);
        cancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            options.onCancel();
        });
    }
    const saveBtn = sendGroup.createEl("button", { cls: "jots-quick-send-btn mod-cta" });
    saveBtn.type = "button";
    saveBtn.appendChild(createPaperPlaneSendIcon());
    saveBtn.title = t("save", lang);

    syncQuickSendReady = () => {
        const ready = textarea.value.trim().length > 0 || selectedAttachments.length > 0;
        saveBtn.classList.toggle("is-ready", ready);
    };
    syncQuickSendReady();

    const resetCaptureForm = () => {
        textarea.value = "";
        sessionTags.length = 0;
        replacingTag = null;
        paintTagPills();
        tagInput.value = "";
        sourceInput.value = "";
        selectedAttachments = [];
        tagSection.style.display = "none";
        sourceSection.style.display = "none";
        renderAttachmentTray();
        refreshEmbedPreviews();
        resetCompactCaptureState();
    };

    saveBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const content = textarea.value.trim();
        if (!content) {
            new Notice(t("contentRequired", lang));
            return;
        }

        const tags = [...sessionTags];
        const source = sourceInput.value.trim();
        const attachments = [...selectedAttachments];

        if (options.mode === "capture") {
            await options.onSave({ content, tags, source, attachments });
            resetCaptureForm();
            options.onAfterSave?.();
        } else {
            await options.onSave({ content, tags, source, attachments });
        }
    });

    const focusTextarea = () => {
        setTimeout(() => {
            textarea.focus();
            const length = textarea.value.length;
            textarea.setSelectionRange(length, length);
        }, isEdit ? 0 : 50);
    };

    return {
        root: inputCard,
        textarea,
        focusTextarea,
        wikilinkCleanup,
    };
}
