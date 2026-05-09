// src/capture-modal.ts
import { App, Modal, Notice } from "obsidian";
import MindDumpPlugin from "./main";
import { t, Translations } from "./i18n";
import {
    handleAttachment,
    getClipboardImageFiles,
    setupWikilinkAutocomplete,
    setupTagAutocomplete,
    renderTagList,
} from "./utils";
import { createPaperPlaneSendIcon } from "./quick-compose-card";
import {
    mountRichMarkdownField,
    normalizeMarkdownForSave,
    richFieldToWikilinkField,
    type RichMarkdownFieldApi,
} from "./rich-markdown-field";

export class CaptureModal extends Modal {
    plugin: MindDumpPlugin;
    contentField!: RichMarkdownFieldApi;
    tagsInput: HTMLInputElement;
    sourceInput: HTMLInputElement;
    tags: string[] = [];
    selectedAttachments: { path: string; type: "image" | "file" }[] = [];
    private tagListContainer: HTMLElement | null = null;
    private currentTags: string[] = [];
    private wikilinkCleanup: (() => void) | null = null;
    private captureSaveBtn: HTMLButtonElement | null = null;

    get lang() {
        return this.plugin.lang;
    }

    constructor(app: App, plugin: MindDumpPlugin) {
        super(app);
        this.plugin = plugin;
    }

    async onOpen() {
        this.modalEl.addClass("minddump-capture-modal");
        const { contentEl } = this;
        contentEl.empty();

        if (!this.plugin.mindDumps || this.plugin.mindDumps.length === 0) {
            await this.plugin.refreshMindDumps();
        }

        const container = contentEl.createDiv();
        container.style.padding = "20px";
        container.style.minWidth = "400px";

        const title = container.createEl("h3");
        title.textContent = t("quickRecord", this.lang);
        title.style.marginBottom = "20px";

        const textareaContainer = container.createDiv();
        textareaContainer.style.position = "relative";
        textareaContainer.style.marginBottom = "16px";

        this.contentField = mountRichMarkdownField(textareaContainer, "", {
            className: "minddump-capture-rich-md",
            placeholder: t("contentPlaceholder", this.lang),
        });
        const cf = this.contentField;
        cf.el.style.width = "100%";
        cf.el.style.minHeight = "150px";
        cf.el.style.padding = "10px";
        cf.el.style.border = "1px solid var(--background-modifier-border)";
        cf.el.style.borderRadius = "8px";
        cf.el.style.backgroundColor = "var(--background-primary-alt)";
        cf.el.style.fontFamily = "inherit";
        cf.el.style.fontSize = "14px";
        cf.el.style.lineHeight = "1.6";
        cf.el.style.boxSizing = "border-box";

        cf.el.addEventListener("input", () => this.syncCaptureSaveReady());

        cf.el.addEventListener("paste", async (e: ClipboardEvent) => {
            const imageFiles = getClipboardImageFiles(e.clipboardData);
            if (imageFiles.length > 0) {
                e.preventDefault();
                const plain = e.clipboardData?.getData("text/plain") ?? "";
                for (const file of imageFiles) {
                    await this.handleAttachment(
                        file,
                        attachmentArea,
                        (result) => {
                            this.selectedAttachments.push(result);
                            const count = this.selectedAttachments.length;
                            attachmentArea.textContent = t("selectedFiles", this.lang, { count: String(count) });
                            attachmentArea.style.borderColor = "var(--interactive-accent)";
                            attachmentArea.style.backgroundColor = "var(--background-primary-alt)";
                        },
                        { failureNoticeKey: "pasteImageUploadFailed" }
                    );
                }
                if (plain) cf.insertMarkdownAtCaret(plain);
                cf.focus();
                this.syncCaptureSaveReady();
                return;
            }
            const plain = e.clipboardData?.getData("text/plain") ?? "";
            if (plain) {
                e.preventDefault();
                cf.insertMarkdownAtCaret(plain);
                this.syncCaptureSaveReady();
            }
        });

        this.wikilinkCleanup = setupWikilinkAutocomplete(
            this.app,
            richFieldToWikilinkField(cf),
            cf.el,
            textareaContainer,
            () => {}
        );

        const tagSection = container.createDiv();
        tagSection.style.marginBottom = "16px";

        const tagInputContainer = tagSection.createDiv();
        tagInputContainer.style.position = "relative";
        tagInputContainer.style.marginBottom = "8px";

        const tagsInput = tagInputContainer.createEl("input");
        tagsInput.placeholder = t("tagsInputPlaceholder", this.lang);
        tagsInput.style.width = "100%";
        tagsInput.style.padding = "8px";
        tagsInput.style.border = "1px solid var(--background-modifier-border)";
        tagsInput.style.borderRadius = "6px";
        tagsInput.style.backgroundColor = "var(--background-primary)";
        tagsInput.style.color = "var(--text-normal)";
        this.tagsInput = tagsInput;

        this.tagListContainer = tagSection.createDiv();
        this.tagListContainer.style.display = "flex";
        this.tagListContainer.style.flexWrap = "wrap";
        this.tagListContainer.style.gap = "6px";
        this.tagListContainer.style.marginBottom = "8px";
        this.currentTags = [];

        this.setupTagAutocomplete(tagsInput, tagInputContainer, this.tagListContainer);

        const sourceInput = container.createEl("input");
        sourceInput.placeholder = t("sourcePlaceholder", this.lang);
        sourceInput.style.width = "100%";
        sourceInput.style.padding = "8px";
        sourceInput.style.border = "1px solid var(--background-modifier-border)";
        sourceInput.style.borderRadius = "6px";
        sourceInput.style.marginBottom = "16px";
        sourceInput.style.backgroundColor = "var(--background-primary)";
        sourceInput.style.color = "var(--text-normal)";
        this.sourceInput = sourceInput;

        const attachmentArea = container.createDiv();
        attachmentArea.style.border = "1px dashed var(--background-modifier-border)";
        attachmentArea.style.borderRadius = "6px";
        attachmentArea.style.padding = "12px";
        attachmentArea.style.textAlign = "center";
        attachmentArea.style.cursor = "pointer";
        attachmentArea.style.marginBottom = "20px";
        attachmentArea.textContent = t("attachmentPlaceholder", this.lang);
        attachmentArea.style.fontSize = "12px";
        attachmentArea.style.color = "var(--text-faint)";

        attachmentArea.addEventListener("click", () => {
            const input = document.createElement("input");
            input.type = "file";
            input.multiple = true;
            input.addEventListener("change", async () => {
                const files = Array.from(input.files || []);
                for (const file of files) {
                    await this.handleAttachment(file, attachmentArea);
                }
            });
            input.click();
        });

        attachmentArea.addEventListener("dragover", (e) => {
            e.preventDefault();
            attachmentArea.style.borderColor = "var(--interactive-accent)";
        });

        attachmentArea.addEventListener("dragleave", () => {
            attachmentArea.style.borderColor = "var(--background-modifier-border)";
        });

        attachmentArea.addEventListener("drop", async (e) => {
            e.preventDefault();
            attachmentArea.style.borderColor = "var(--background-modifier-border)";
            const files = Array.from(e.dataTransfer?.files || []);
            for (const file of files) {
                await this.handleAttachment(file, attachmentArea);
            }
        });

        const buttonContainer = container.createDiv({ cls: "minddump-quick-toolbar-send-group" });

        const cancelBtn = buttonContainer.createEl("button", {
            cls: "minddump-quick-edit-cancel-btn",
            type: "button",
        });
        cancelBtn.textContent = t("cancel", this.lang);
        cancelBtn.addEventListener("click", () => this.close());

        const saveBtn = buttonContainer.createEl("button", {
            cls: "minddump-quick-send-btn mod-cta",
            type: "button",
        });
        saveBtn.appendChild(createPaperPlaneSendIcon());
        saveBtn.title = t("save", this.lang);
        this.captureSaveBtn = saveBtn;
        saveBtn.addEventListener("click", async () => {
            await this.handleSave();
        });
        this.syncCaptureSaveReady();

        cf.focus();
    }

    private syncCaptureSaveReady() {
        if (!this.captureSaveBtn || !this.contentField) return;
        const ready =
            this.contentField.getMarkdown().trim().length > 0 || this.selectedAttachments.length > 0;
        this.captureSaveBtn.classList.toggle("is-ready", ready);
    }

    private setupTagAutocomplete(tagInput: HTMLInputElement, container: HTMLElement, tagListContainer: HTMLElement) {
        setupTagAutocomplete(
            () => this.getExistingTags(),
            tagInput,
            container,
            tagListContainer,
            this.currentTags,
            (tag) => this.addTagToInput(tag, tagInput, tagListContainer),
            (tags) => this.renderTagList(tagListContainer, tags)
        );
    }

    private getExistingTags(): string[] {
        const tags = new Set<string>();
        for (const mindDump of this.plugin.mindDumps) {
            if (mindDump.deleted) continue;
            mindDump.tags.forEach((tag) => tags.add(tag));
        }
        return Array.from(tags);
    }

    private renderTagList(container: HTMLElement, tags: string[]) {
        this.currentTags = tags;
        renderTagList(container, tags, (tag) => {
            this.currentTags = this.currentTags.filter((t) => t !== tag);
            this.renderTagList(container, this.currentTags);
            if (this.tagsInput) {
                this.tagsInput.value = "";
            }
        });
    }

    private addTagToInput(tag: string, tagInput: HTMLInputElement, tagListContainer: HTMLElement) {
        if (tag && !this.currentTags.includes(tag)) {
            this.currentTags.push(tag);
            this.renderTagList(tagListContainer, this.currentTags);
            tagInput.value = "";
        }
    }

    async handleAttachment(
        file: File,
        area: HTMLElement,
        callback?: (result: { path: string; type: "image" | "file" }) => void,
        options?: { failureNoticeKey?: keyof Translations }
    ) {
        await handleAttachment(
            this.app,
            file,
            this.plugin.settings,
            this.lang,
            (result) => {
                if (callback) {
                    callback(result);
                    this.syncCaptureSaveReady();
                    return;
                }
                this.selectedAttachments.push(result);
                const count = this.selectedAttachments.length;
                area.textContent = t("selectedFiles", this.lang, { count: String(count) });
                area.style.borderColor = "var(--interactive-accent)";
                area.style.backgroundColor = "var(--background-primary-alt)";
                this.syncCaptureSaveReady();
            },
            options
        );
    }

    async handleSave() {
        const content = normalizeMarkdownForSave(this.contentField.getMarkdown());
        if (!content.trim()) {
            new Notice(t("contentRequired", this.lang));
            return;
        }

        const tags = [...this.currentTags];
        const source = this.sourceInput.value.trim();

        try {
            await this.plugin.saveMindDump(content, tags, source, this.selectedAttachments);
            this.close();
        } catch (error) {
            console.error("Save failed:", error);
            new Notice(t("saveFailed", this.lang, { error: (error as Error).message || "Unknown error" }));
        }
    }

    onClose() {
        this.modalEl.removeClass("minddump-capture-modal");
        this.captureSaveBtn = null;
        if (this.wikilinkCleanup) {
            try {
                this.wikilinkCleanup();
            } catch {
                /* ignore */
            }
            this.wikilinkCleanup = null;
        }
        super.onClose();
    }
}
