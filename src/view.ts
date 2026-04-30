// src/view.ts
import { ItemView, WorkspaceLeaf, TFile, TFolder, Notice, MarkdownView, MarkdownRenderer, Component, normalizePath } from 'obsidian';
import moment from 'moment';
import JotPlugin from './main';
import { Jot, DayRecord, Language } from './types';
import { translations, t } from './i18n';
import {
    parseFileContent,
    handleAttachment,
    setupWikilinkAutocomplete,
    setupTagAutocomplete,
    renderTagList as renderTagPills,
    highlightMarkdownContent,
    debounce,
    stableLegacyJotId,
    normalizeJotTags
} from './utils';

const CARD_LONG_PRESS_MS = 480;
const CARD_TAP_MOVE_PX = 14;

export const VIEW_TYPE_JOTS = "jot-view";

export class JotView extends ItemView {
    plugin: JotPlugin;
    jots: Jot[] = [];
    searchQuery: string = "";
    selectedTags: Set<string> = new Set();
    currentYear: number;
    currentMonth: number;
    isSidebar: boolean = false;
    private suggestionContainer: HTMLElement | null = null;
    private currentTextarea: HTMLTextAreaElement | null = null;
    private inputCard: HTMLElement | null = null;
    private searchInput: HTMLInputElement | null = null;
    private searchContainer: HTMLElement | null = null;
    private renderedComponents: Component[] = [];
    private tagSuggestionContainer: HTMLElement | null = null;
    private tagListContainer: HTMLElement | null = null;
    private currentTags: string[] = [];
    private debouncedRender: (() => void) | null = null;
    private debouncedSearch: (query: string) => void;
    private wikilinkCleanup: (() => void) | null = null;
    /** Inline jot edit */
    private editingJotId: string | null = null;
    private editSessionTags: string[] = [];
    private jotListCleanups: (() => void)[] = [];

    get lang(): Language {
        return this.plugin.lang;
    }

    constructor(leaf: WorkspaceLeaf, plugin: JotPlugin) {
        super(leaf);
        this.plugin = plugin;
        const now = new Date();
        this.currentYear = now.getFullYear();
        this.currentMonth = now.getMonth();

        // 初始化防抖搜索函数
        this.debouncedSearch = debounce((query: string) => {
            this.searchQuery = query;
            this.updateSearchAndFilter();
        }, 300);
    }

    getViewType(): string {
        return VIEW_TYPE_JOTS;
    }

    getDisplayText(): string {
        return t('jotView', this.lang);
    }

    getIcon(): string {
        return "jot-bolt"; 
    }

    async onOpen() {
        this.contentEl.addClass("jots-view");

        if (this.leaf.tabHeaderInnerIconEl) {
            this.leaf.tabHeaderInnerIconEl.empty();
        }

        // 初始化防抖渲染
        this.debouncedRender = debounce(() => {
            this.render();
        }, 200);

        await this.refresh();
        this.checkIfSidebar();

        this.registerEvent(
            this.app.workspace.on('active-leaf-change', (leaf) => {
                if (leaf === this.leaf && this.currentTextarea) {
                    this.focusTextarea();
                }
            })
        );
    }

    onResize() {
        const wasSidebar = this.isSidebar;
        this.checkIfSidebar();

        // 只有在布局模式改变时才重新渲染
        if (wasSidebar !== this.isSidebar && this.debouncedRender) {
            this.debouncedRender();
        }
    }

    async onClose() {
        // 清理 wikilink 建议容器
        if (this.wikilinkCleanup) {
            this.wikilinkCleanup();
            this.wikilinkCleanup = null;
        }

        // 清理建议容器
        if (this.tagSuggestionContainer) {
            this.tagSuggestionContainer.remove();
            this.tagSuggestionContainer = null;
        }

        // 清理所有渲染的组件
        this.renderedComponents.forEach(comp => {
            try {
                comp.unload();
            } catch (e) {
                console.error("Error unloading component:", e);
            }
        });
        this.renderedComponents = [];
    }
    
    private focusTextarea() {
        if (this.currentTextarea) {
            setTimeout(() => {
                this.currentTextarea?.focus();
                const length = this.currentTextarea.value.length;
                this.currentTextarea.setSelectionRange(length, length);
            }, 50);
        }
    }
    
    private updateSearchAndFilter() {
        if (this.searchInput) {
            this.searchInput.value = this.searchQuery;
        }
        this.updateClearButton();
        const listSection = this.contentEl.querySelector(".jots-list-section");
        if (listSection) {
            this.renderJotList(listSection as HTMLElement);
        }
    }
    
    private updateClearButton() {
        if (this.searchContainer) {
            let clearBtnContainer = this.searchContainer.querySelector(".search-clear-container");
            if (!clearBtnContainer) {
                clearBtnContainer = this.searchContainer.createDiv({ cls: "search-clear-container" });
            }
            
            if (this.searchQuery && this.searchQuery.length > 0) {
                clearBtnContainer.empty();
                const clearIcon = clearBtnContainer.createSpan();
                clearIcon.textContent = "×";
                
                clearBtnContainer.style.display = "flex";
                clearBtnContainer.style.position = "absolute";
                clearBtnContainer.style.right = "8px";
                clearBtnContainer.style.top = "50%";
                clearBtnContainer.style.transform = "translateY(-50%)";
                clearBtnContainer.style.alignItems = "center";
                clearBtnContainer.style.justifyContent = "center";
                clearBtnContainer.style.width = "24px";
                clearBtnContainer.style.height = "24px";
                clearBtnContainer.style.borderRadius = "50%";
                clearBtnContainer.style.backgroundColor = "var(--background-modifier-border)";
                clearBtnContainer.style.cursor = "pointer";
                clearBtnContainer.style.zIndex = "10";
                
                if (this.searchInput) {
                    this.searchInput.style.paddingRight = "32px";
                }
                
                clearBtnContainer.addEventListener("click", (e) => {
                    e.stopPropagation();
                    this.searchQuery = "";
                    this.updateSearchAndFilter();
                    if (this.searchInput) {
                        this.searchInput.value = "";
                        this.searchInput.focus();
                    }
                });
            } else {
                clearBtnContainer.style.display = "none";
                if (this.searchInput) {
                    this.searchInput.style.paddingRight = "";
                }
            }
        }
    }

    private parseSearchFilters(query: string): { date?: string; updated?: string; keywords: string[] } {
        const keywords: string[] = [];
        let date: string | undefined;
        let updated: string | undefined;
        for (const part of query.trim().split(/\s+/).filter(Boolean)) {
            const lower = part.toLowerCase();
            if (lower.startsWith("date:")) {
                date = part.slice(5);
            } else if (lower.startsWith("updated:")) {
                updated = part.slice(8);
            } else {
                keywords.push(part.toLowerCase());
            }
        }
        return { date, updated, keywords };
    }

    private attachCardTapAndLongPress(card: HTMLElement, jot: Jot) {
        let timer: ReturnType<typeof setTimeout> | null = null;
        let longPressFired = false;
        let startX = 0;
        let startY = 0;
        let movedTooFar = false;

        const clearTimer = () => {
            if (timer !== null) {
                clearTimeout(timer);
                timer = null;
            }
        };

        const onPointerDown = (e: PointerEvent) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            longPressFired = false;
            movedTooFar = false;
            startX = e.clientX;
            startY = e.clientY;
            clearTimer();
            try {
                card.setPointerCapture(e.pointerId);
            } catch {
                /* ignore */
            }
            timer = setTimeout(() => {
                timer = null;
                longPressFired = true;
                void this.openJot(jot);
            }, CARD_LONG_PRESS_MS);
        };

        const onPointerMove = (e: PointerEvent) => {
            if (timer === null && !longPressFired) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (dx * dx + dy * dy > CARD_TAP_MOVE_PX * CARD_TAP_MOVE_PX) {
                movedTooFar = true;
                clearTimer();
            }
        };

        const onPointerUp = (e: PointerEvent) => {
            clearTimer();
            try {
                card.releasePointerCapture(e.pointerId);
            } catch {
                /* ignore */
            }
            if (longPressFired) return;
            if (movedTooFar) return;
            if (e.pointerType === "mouse" && e.button !== 0) return;
            this.enterEditMode(jot);
        };

        const onPointerCancel = (e: PointerEvent) => {
            clearTimer();
            try {
                card.releasePointerCapture(e.pointerId);
            } catch {
                /* ignore */
            }
        };

        card.addEventListener("pointerdown", onPointerDown);
        card.addEventListener("pointermove", onPointerMove);
        card.addEventListener("pointerup", onPointerUp);
        card.addEventListener("pointercancel", onPointerCancel);

        this.jotListCleanups.push(() => {
            clearTimer();
            card.removeEventListener("pointerdown", onPointerDown);
            card.removeEventListener("pointermove", onPointerMove);
            card.removeEventListener("pointerup", onPointerUp);
            card.removeEventListener("pointercancel", onPointerCancel);
        });
    }

    private enterEditMode(jot: Jot) {
        this.editingJotId = jot.id;
        this.editSessionTags = [...jot.tags];
        const listSection = this.contentEl.querySelector(".jots-list-section");
        if (listSection) {
            this.renderJotList(listSection as HTMLElement);
        }
    }

    private exitEditMode() {
        this.editingJotId = null;
        this.editSessionTags = [];
        const listSection = this.contentEl.querySelector(".jots-list-section");
        if (listSection) {
            this.renderJotList(listSection as HTMLElement);
        }
    }
    
    private renderTagList(container: HTMLElement, tags: string[]) {
        this.currentTags = tags;
        renderTagPills(container, tags, (tag) => {
            this.currentTags = this.currentTags.filter(t => t !== tag);
            this.renderTagList(container, this.currentTags);
            const tagInput = this.inputCard?.querySelector(".jots-tag-input") as HTMLInputElement;
            if (tagInput) {
                tagInput.value = "";
            }
        });
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
        for (const jot of this.jots) {
            jot.tags.forEach(tag => tags.add(tag));
        }
        return Array.from(tags);
    }

    private addTagToInput(tag: string, tagInput: HTMLInputElement, tagListContainer: HTMLElement) {
        if (tag && !this.currentTags.includes(tag)) {
            this.currentTags.push(tag);
            this.renderTagList(tagListContainer, this.currentTags);
            tagInput.value = "";
        }
    }

    checkIfSidebar() {
        const width = this.contentEl.clientWidth;
        this.isSidebar = width < 450;
    }

    async refresh() {
        await this.loadJots();
        this.render();
    }

    async loadJots() {
        const folder = this.plugin.settings.saveFolder;
        const folderObj = this.app.vault.getAbstractFileByPath(folder);

        if (!folderObj || !(folderObj instanceof TFolder)) {
            this.jots = [];
            return;
        }

        const files = folderObj.children.filter(f => f instanceof TFile && f.name.endsWith(".md"));
        const allJots: Jot[] = [];

        for (const file of files) {
            const content = await this.app.vault.read(file as TFile);
            const entries = parseFileContent(content, file.path, this.lang);
            allJots.push(...entries);
        }

        allJots.sort((a, b) => {
            const dateA = moment(a.date + " " + a.time, "YYYY-MM-DD HH:mm:ss");
            const dateB = moment(b.date + " " + b.time, "YYYY-MM-DD HH:mm:ss");
            return dateB.valueOf() - dateA.valueOf();
        });

        this.jots = allJots;
    }
    
    render() {
        this.contentEl.empty();
        
        if (this.isSidebar) {
            this.renderSidebarLayout();
        } else {
            this.renderMainLayout();
        }
        
        this.focusTextarea();
    }
    
    renderMainLayout() {
        const container = this.contentEl.createDiv();
        container.style.display = "flex";
        container.style.gap = "20px";
        container.style.height = "100%";
        container.style.overflow = "hidden";
        
        const leftPanel = container.createDiv();
        leftPanel.style.flex = "2";
        leftPanel.style.overflow = "auto";
        leftPanel.style.padding = "10px";
        
        const rightPanel = container.createDiv();
        rightPanel.style.flex = "1";
        rightPanel.style.overflow = "auto";
        rightPanel.style.padding = "10px";
        
        this.renderFullInput(leftPanel);
        
        const listContainer = leftPanel.createDiv();
        listContainer.style.marginTop = "20px";
        this.renderJotList(listContainer);
        
        this.renderStats(rightPanel);
        this.renderCalendar(rightPanel);
        this.renderSearch(rightPanel);
    }
    
    renderSidebarLayout() {
        const container = this.contentEl.createDiv();
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "12px";
        container.style.height = "100%";
        container.style.overflow = "auto";
        container.style.padding = "8px";
        
        const addBtn = container.createDiv();
        addBtn.textContent = "+ " + t('quickCapture', this.lang);
        addBtn.style.background = "var(--interactive-accent)";
        addBtn.style.color = "var(--text-on-accent)";
        addBtn.style.padding = "8px 12px";
        addBtn.style.borderRadius = "6px";
        addBtn.style.cursor = "pointer";
        addBtn.style.textAlign = "center";
        addBtn.style.fontSize = "13px";
        addBtn.style.marginBottom = "4px";
        addBtn.addEventListener("click", () => {
            const { CaptureModal } = require('./capture-modal');
            new CaptureModal(this.app, this.plugin).open();
        });
        
        this.renderStatsCompact(container);
        this.renderCalendarCompact(container);
        this.renderSearchCompact(container);
        
        const listContainer = container.createDiv();
        listContainer.style.marginTop = "8px";
        this.renderJotList(listContainer);
    }
    
    renderFullInput(container: HTMLElement) {
        this.inputCard = container.createDiv();
        this.inputCard.style.backgroundColor = "var(--background-secondary)";
        this.inputCard.style.borderRadius = "12px";
        this.inputCard.style.padding = "16px";
        this.inputCard.style.border = "1px solid var(--background-modifier-border)";

        const title = this.inputCard.createDiv();
        title.textContent = t('quickRecord', this.lang);
        title.style.fontSize = "16px";
        title.style.fontWeight = "600";
        title.style.marginBottom = "12px";
        title.style.color = "var(--text-normal)";

        const textareaContainer = this.inputCard.createDiv();
        textareaContainer.style.position = "relative";

        const textarea = textareaContainer.createEl("textarea");
        textarea.placeholder = t('placeholderWithLink', this.lang);
        textarea.style.width = "100%";
        textarea.style.minHeight = "100px";
        textarea.style.padding = "8px";
        textarea.style.borderRadius = "6px";
        textarea.style.border = "1px solid var(--background-modifier-border)";
        textarea.style.backgroundColor = "var(--background-primary)";
        textarea.style.color = "var(--text-normal)";
        textarea.style.resize = "vertical";
        textarea.style.fontFamily = "var(--font-text)";

        this.currentTextarea = textarea;
        this.setupWikilinkAutocomplete(textarea, textareaContainer);

        const tagSection = this.inputCard.createDiv();
        tagSection.style.marginTop = "8px";
        
        const tagInputContainer = tagSection.createDiv();
        tagInputContainer.style.position = "relative";
        tagInputContainer.style.marginBottom = "8px";
        
        const tagInput = tagInputContainer.createEl("input");
        tagInput.addClass("jots-tag-input");
        tagInput.placeholder = t('tagsInputPlaceholder', this.lang);
        tagInput.style.width = "100%";
        tagInput.style.padding = "8px";
        tagInput.style.borderRadius = "6px";
        tagInput.style.border = "1px solid var(--background-modifier-border)";
        tagInput.style.backgroundColor = "var(--background-primary)";
        tagInput.style.color = "var(--text-normal)";
        
        this.tagListContainer = tagSection.createDiv();
        this.tagListContainer.style.display = "flex";
        this.tagListContainer.style.flexWrap = "wrap";
        this.tagListContainer.style.gap = "6px";
        this.tagListContainer.style.marginBottom = "8px";
        this.currentTags = [];
        
        this.setupTagAutocomplete(tagInput, tagInputContainer, this.tagListContainer);

        const sourceInput = this.inputCard.createEl("input");
        sourceInput.placeholder = t('sourcePlaceholder', this.lang);
        sourceInput.style.width = "100%";
        sourceInput.style.padding = "8px";
        sourceInput.style.borderRadius = "6px";
        sourceInput.style.border = "1px solid var(--background-modifier-border)";
        sourceInput.style.backgroundColor = "var(--background-primary)";
        sourceInput.style.color = "var(--text-normal)";
        sourceInput.style.marginTop = "8px";
        
        const attachmentArea = this.inputCard.createDiv();
        attachmentArea.style.marginTop = "8px";
        attachmentArea.style.border = "1px dashed var(--background-modifier-border)";
        attachmentArea.style.borderRadius = "6px";
        attachmentArea.style.padding = "8px";
        attachmentArea.style.textAlign = "center";
        attachmentArea.style.cursor = "pointer";
        attachmentArea.textContent = t('attachmentPlaceholder', this.lang);
        attachmentArea.style.fontSize = "12px";
        attachmentArea.style.color = "var(--text-muted)";
        attachmentArea.style.backgroundColor = "var(--background-primary)";
        
        let selectedAttachments: { path: string; type: "image" | "file" }[] = [];
        
        attachmentArea.addEventListener("click", () => {
            const input = document.createElement("input");
            input.type = "file";
            input.multiple = true;
            input.addEventListener("change", async () => {
                const files = Array.from(input.files || []);
                for (const file of files) {
                    await this.handleAttachment(file, attachmentArea, (result) => {
                        selectedAttachments.push(result);
                        const count = selectedAttachments.length;
                        attachmentArea.textContent = t('selectedFiles', this.lang, { count: String(count) });
                    });
                }
            });
            input.click();
        });
        
        attachmentArea.addEventListener("dragover", (e) => {
            e.preventDefault();
            attachmentArea.style.borderColor = "var(--interactive-accent)";
            attachmentArea.style.backgroundColor = "var(--background-modifier-hover)";
        });
        
        attachmentArea.addEventListener("dragleave", () => {
            attachmentArea.style.borderColor = "var(--background-modifier-border)";
            attachmentArea.style.backgroundColor = "var(--background-primary)";
        });
        
        attachmentArea.addEventListener("drop", async (e) => {
            e.preventDefault();
            attachmentArea.style.borderColor = "var(--background-modifier-border)";
            attachmentArea.style.backgroundColor = "var(--background-primary)";
            const files = Array.from(e.dataTransfer?.files || []);
            for (const file of files) {
                await this.handleAttachment(file, attachmentArea, (result) => {
                    selectedAttachments.push(result);
                    const count = selectedAttachments.length;
                    attachmentArea.textContent = t('selectedFiles', this.lang, { count: String(count) });
                });
            }
        });
        
        const buttonRow = this.inputCard.createDiv();
        buttonRow.style.display = "flex";
        buttonRow.style.justifyContent = "flex-end";
        buttonRow.style.marginTop = "12px";
        
        const saveBtn = buttonRow.createEl("button");
        saveBtn.textContent = t('save', this.lang);
        saveBtn.style.padding = "6px 16px";
        saveBtn.style.borderRadius = "6px";
        saveBtn.style.backgroundColor = "var(--interactive-accent)";
        saveBtn.style.color = "var(--text-on-accent)";
        saveBtn.style.border = "none";
        saveBtn.style.cursor = "pointer";
        saveBtn.style.fontWeight = "500";

        saveBtn.addEventListener("click", async () => {
            const content = textarea.value.trim();
            if (!content) {
                new Notice(t('contentRequired', this.lang));
                return;
            }

            const tags = [...this.currentTags];
            const source = sourceInput.value.trim();

            console.log("保存时附件数量:", selectedAttachments.length);
            
            await this.plugin.saveJot(content, tags, source, selectedAttachments);

            textarea.value = "";
            this.currentTags = [];
            this.renderTagList(this.tagListContainer!, []);
            tagInput.value = "";
            sourceInput.value = "";
            selectedAttachments = [];
            attachmentArea.textContent = t('attachmentPlaceholder', this.lang);
            attachmentArea.style.borderColor = "var(--background-modifier-border)";
            attachmentArea.style.backgroundColor = "var(--background-primary)";
            
            this.focusTextarea();
        });
    }
    
    setupWikilinkAutocomplete(textarea: HTMLTextAreaElement, container: HTMLElement): () => void {
        this.wikilinkCleanup = setupWikilinkAutocomplete(
            this.app,
            textarea,
            container,
            (file, textarea, bracketStart) => {
                const cursorPos = textarea.selectionStart;
                const textBefore = textarea.value.substring(0, bracketStart);
                const textAfter = textarea.value.substring(cursorPos);
                const newText = textBefore + `[[${file.basename}]]` + textAfter;
                textarea.value = newText;

                const newCursorPos = bracketStart + file.basename.length + 4;
                textarea.selectionStart = newCursorPos;
                textarea.selectionEnd = newCursorPos;

                textarea.focus();
            }
        );
        return this.wikilinkCleanup;
    }
    

    async handleAttachment(file: File, area: HTMLElement, callback: (result: { path: string; type: "image" | "file" }) => void) {
        await handleAttachment(
            this.app,
            file,
            this.plugin.settings,
            this.lang,
            callback
        );
    }
    
    renderStats(container: HTMLElement) {
        const stats = this.getStats();

        const section = container.createDiv();
        section.style.marginBottom = "12px";
        section.style.backgroundColor = "var(--background-secondary)";
        section.style.borderRadius = "8px";
        section.style.padding = "12px";
        section.style.border = "1px solid var(--background-modifier-border)";

        const contentDiv = section.createDiv();
        contentDiv.style.display = "flex";
        contentDiv.style.justifyContent = "space-around";

        const totalDiv = contentDiv.createDiv();
        totalDiv.style.textAlign = "center";
        totalDiv.style.flex = "1";
        totalDiv.createDiv({ text: stats.total.toString(), style: "font-size: 24px; font-weight: bold; color: var(--text-normal);" });
        totalDiv.createDiv({ text: t('total', this.lang), style: "font-size: 11px; color: var(--text-muted);" });

        const todayDiv = contentDiv.createDiv();
        todayDiv.style.textAlign = "center";
        todayDiv.style.flex = "1";
        todayDiv.createDiv({ text: stats.today.toString(), style: "font-size: 24px; font-weight: bold; color: var(--text-normal);" });
        todayDiv.createDiv({ text: t('today', this.lang), style: "font-size: 11px; color: var(--text-muted);" });

        const monthDiv = contentDiv.createDiv();
        monthDiv.style.textAlign = "center";
        monthDiv.style.flex = "1";
        monthDiv.createDiv({ text: stats.thisMonth.toString(), style: "font-size: 24px; font-weight: bold; color: var(--text-normal);" });
        monthDiv.createDiv({ text: t('thisMonth', this.lang), style: "font-size: 11px; color: var(--text-muted);" });
    }
    
    renderStatsCompact(container: HTMLElement) {
        const stats = this.getStats();

        const section = container.createDiv();
        section.style.marginBottom = "8px";
        section.style.backgroundColor = "var(--background-secondary)";
        section.style.borderRadius = "6px";
        section.style.padding = "10px";
        section.style.border = "1px solid var(--background-modifier-border)";

        const contentDiv = section.createDiv();
        contentDiv.style.display = "flex";
        contentDiv.style.justifyContent = "space-around";
        contentDiv.style.gap = "8px";

        const totalDiv = contentDiv.createDiv();
        totalDiv.style.textAlign = "center";
        totalDiv.style.flex = "1";
        totalDiv.createDiv({ text: stats.total.toString(), style: "font-size: 18px; font-weight: bold; color: var(--text-normal);" });
        totalDiv.createDiv({ text: t('total', this.lang), style: "font-size: 10px; color: var(--text-muted); margin-top: 2px;" });

        const todayDiv = contentDiv.createDiv();
        todayDiv.style.textAlign = "center";
        todayDiv.style.flex = "1";
        todayDiv.createDiv({ text: stats.today.toString(), style: "font-size: 18px; font-weight: bold; color: var(--text-normal);" });
        todayDiv.createDiv({ text: t('today', this.lang), style: "font-size: 10px; color: var(--text-muted); margin-top: 2px;" });

        const monthDiv = contentDiv.createDiv();
        monthDiv.style.textAlign = "center";
        monthDiv.style.flex = "1";
        monthDiv.createDiv({ text: stats.thisMonth.toString(), style: "font-size: 18px; font-weight: bold; color: var(--text-normal);" });
        monthDiv.createDiv({ text: t('thisMonth', this.lang), style: "font-size: 10px; color: var(--text-muted); margin-top: 2px;" });
    }
    
    getStats() {
        const total = this.jots.length;
        const today = moment().format("YYYY-MM-DD");
        const todayCount = this.jots.filter(m => m.date === today).length;
        const thisMonth = moment().format("YYYY-MM");
        const thisMonthCount = this.jots.filter(m => m.date.startsWith(thisMonth)).length;
        return { total, today: todayCount, thisMonth: thisMonthCount };
    }
    
    renderCalendar(container: HTMLElement) {
        const section = container.createDiv();
        section.style.marginBottom = "12px";
        section.style.backgroundColor = "var(--background-secondary)";
        section.style.borderRadius = "8px";
        section.style.padding = "12px";
        section.style.border = "1px solid var(--background-modifier-border)";
        
        const title = section.createDiv();
        title.textContent = "📅 " + t('calendar', this.lang);
        title.style.fontSize = "13px";
        title.style.fontWeight = "500";
        title.style.marginBottom = "8px";
        title.style.color = "var(--text-normal)";
        
        const contentDiv = section.createDiv();
        this.renderCalendarGrid(contentDiv);
    }
    
    renderCalendarCompact(container: HTMLElement) {
        const section = container.createDiv();
        section.style.marginBottom = "8px";
        section.style.backgroundColor = "var(--background-secondary)";
        section.style.borderRadius = "6px";
        section.style.padding = "10px";
        section.style.border = "1px solid var(--background-modifier-border)";
        
        const title = section.createDiv();
        title.textContent = "📅 " + t('calendar', this.lang);
        title.style.fontSize = "12px";
        title.style.fontWeight = "500";
        title.style.marginBottom = "6px";
        title.style.color = "var(--text-normal)";
        
        const contentDiv = section.createDiv();
        this.renderCalendarGridCompact(contentDiv);
    }
    
    renderCalendarGrid(container: HTMLElement) {
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startWeekday = firstDay.getDay();
        
        const header = container.createDiv();
        header.style.display = "flex";
        header.style.justifyContent = "space-between";
        header.style.alignItems = "center";
        header.style.marginBottom = "10px";
        
        const prevBtn = header.createDiv();
        prevBtn.textContent = "←";
        prevBtn.style.cursor = "pointer";
        prevBtn.style.padding = "4px 8px";
        prevBtn.style.borderRadius = "4px";
        prevBtn.style.color = "var(--text-muted)";
        prevBtn.addEventListener("mouseenter", () => { prevBtn.style.backgroundColor = "var(--background-modifier-hover)"; });
        prevBtn.addEventListener("mouseleave", () => { prevBtn.style.backgroundColor = "transparent"; });
        prevBtn.addEventListener("click", () => this.changeMonth(-1));
        
        const title = header.createDiv();
        title.textContent = `${this.currentYear}${t('year', this.lang)} ${this.currentMonth + 1}${t('month', this.lang)}`;
        title.style.fontSize = "13px";
        title.style.fontWeight = "500";
        title.style.color = "var(--text-normal)";
        title.classList.add("jots-calendar-title");
        
        const nextBtn = header.createDiv();
        nextBtn.textContent = "→";
        nextBtn.style.cursor = "pointer";
        nextBtn.style.padding = "4px 8px";
        nextBtn.style.borderRadius = "4px";
        nextBtn.style.color = "var(--text-muted)";
        nextBtn.addEventListener("mouseenter", () => { nextBtn.style.backgroundColor = "var(--background-modifier-hover)"; });
        nextBtn.addEventListener("mouseleave", () => { nextBtn.style.backgroundColor = "transparent"; });
        nextBtn.addEventListener("click", () => this.changeMonth(1));
        
        const weekdays = translations[this.lang].weekdays;
        const weekdayRow = container.createDiv();
        weekdayRow.style.display = "grid";
        weekdayRow.style.gridTemplateColumns = "repeat(7, 1fr)";
        weekdayRow.style.gap = "2px";
        weekdayRow.style.marginBottom = "4px";
        
        weekdays.forEach(day => {
            const dayEl = weekdayRow.createDiv();
            dayEl.textContent = day;
            dayEl.style.textAlign = "center";
            dayEl.style.fontSize = "10px";
            dayEl.style.color = "var(--text-muted)";
        });
        
        const daysGrid = container.createDiv();
        daysGrid.style.display = "grid";
        daysGrid.style.gridTemplateColumns = "repeat(7, 1fr)";
        daysGrid.style.gap = "2px";
        
        for (let i = 0; i < startWeekday; i++) {
            const emptyDay = daysGrid.createDiv();
            emptyDay.style.padding = "4px 2px";
        }
        
        const dayRecords = this.getDayRecords();
        
        for (let d = 1; d <= lastDay.getDate(); d++) {
            const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const record = dayRecords.get(dateStr);
            const hasRecord = record && record.count > 0;
            
            const dayDiv = daysGrid.createDiv();
            dayDiv.textContent = String(d);
            dayDiv.style.textAlign = "center";
            dayDiv.style.padding = "4px 2px";
            dayDiv.style.borderRadius = "4px";
            dayDiv.style.fontSize = "11px";
            dayDiv.style.cursor = hasRecord ? "pointer" : "default";
            
            if (hasRecord) {
                dayDiv.style.backgroundColor = "var(--interactive-accent)";
                dayDiv.style.color = "var(--text-on-accent)";
                dayDiv.title = `${dateStr}: ${t('recordsCount', this.lang, { count: String(record.count) })}`;
                dayDiv.addEventListener("click", () => {
                    this.filterByDate(dateStr);
                });
            } else {
                dayDiv.style.backgroundColor = "var(--background-modifier-border)";
                dayDiv.style.color = "var(--text-muted)";
            }
        }
    }

    renderCalendarGridCompact(container: HTMLElement) {
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startWeekday = firstDay.getDay();
        
        const navRow = container.createDiv();
        navRow.style.display = "flex";
        navRow.style.justifyContent = "space-between";
        navRow.style.alignItems = "center";
        navRow.style.marginBottom = "8px";
        navRow.style.padding = "0 4px";
        
        const prevBtn = navRow.createDiv();
        prevBtn.textContent = "←";
        prevBtn.style.cursor = "pointer";
        prevBtn.style.padding = "2px 6px";
        prevBtn.style.fontSize = "11px";
        prevBtn.style.borderRadius = "4px";
        prevBtn.style.color = "var(--text-muted)";
        prevBtn.addEventListener("mouseenter", () => { prevBtn.style.backgroundColor = "var(--background-modifier-hover)"; });
        prevBtn.addEventListener("mouseleave", () => { prevBtn.style.backgroundColor = "transparent"; });
        prevBtn.addEventListener("click", () => this.changeMonth(-1));
        
        const title = navRow.createDiv();
        title.textContent = `${this.currentYear}/${this.currentMonth + 1}`;
        title.style.fontSize = "11px";
        title.style.fontWeight = "500";
        title.style.color = "var(--text-normal)";
        title.classList.add("jots-calendar-title");
        
        const nextBtn = navRow.createDiv();
        nextBtn.textContent = "→";
        nextBtn.style.cursor = "pointer";
        nextBtn.style.padding = "2px 6px";
        nextBtn.style.fontSize = "11px";
        nextBtn.style.borderRadius = "4px";
        nextBtn.style.color = "var(--text-muted)";
        nextBtn.addEventListener("mouseenter", () => { nextBtn.style.backgroundColor = "var(--background-modifier-hover)"; });
        nextBtn.addEventListener("mouseleave", () => { nextBtn.style.backgroundColor = "transparent"; });
        nextBtn.addEventListener("click", () => this.changeMonth(1));
        
        const weekdaysShort = translations[this.lang].weekdays;
        const weekdayRow = container.createDiv();
        weekdayRow.style.display = "grid";
        weekdayRow.style.gridTemplateColumns = "repeat(7, 1fr)";
        weekdayRow.style.gap = "1px";
        weekdayRow.style.marginBottom = "4px";
        
        weekdaysShort.forEach(day => {
            const dayEl = weekdayRow.createDiv();
            dayEl.textContent = day;
            dayEl.style.textAlign = "center";
            dayEl.style.fontSize = "8px";
            dayEl.style.color = "var(--text-muted)";
            dayEl.style.padding = "2px 0";
        });
        
        const daysGrid = container.createDiv();
        daysGrid.style.display = "grid";
        daysGrid.style.gridTemplateColumns = "repeat(7, 1fr)";
        daysGrid.style.gap = "1px";
        
        for (let i = 0; i < startWeekday; i++) {
            const emptyDay = daysGrid.createDiv();
            emptyDay.style.padding = "3px 1px";
            emptyDay.style.textAlign = "center";
        }
        
        const dayRecords = this.getDayRecords();
        
        for (let d = 1; d <= lastDay.getDate(); d++) {
            const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const record = dayRecords.get(dateStr);
            const hasRecord = record && record.count > 0;
            
            const dayDiv = daysGrid.createDiv();
            dayDiv.textContent = String(d);
            dayDiv.style.textAlign = "center";
            dayDiv.style.padding = "3px 1px";
            dayDiv.style.borderRadius = "3px";
            dayDiv.style.fontSize = "9px";
            dayDiv.style.cursor = hasRecord ? "pointer" : "default";
            
            if (hasRecord) {
                dayDiv.style.backgroundColor = "var(--interactive-accent)";
                dayDiv.style.color = "var(--text-on-accent)";
                dayDiv.title = `${dateStr}: ${t('recordsCount', this.lang, { count: String(record.count) })}`;
                dayDiv.addEventListener("click", () => {
                    this.filterByDate(dateStr);
                });
            } else {
                dayDiv.style.backgroundColor = "var(--background-modifier-border)";
                dayDiv.style.color = "var(--text-muted)";
            }
        }
    }

    getDayRecords(): Map<string, DayRecord> {
        const records = new Map<string, DayRecord>();
        for (const jot of this.jots) {
            const date = jot.date;
            if (!records.has(date)) {
                records.set(date, { date, count: 0, jots: [] });
            }
            const record = records.get(date)!;
            record.count++;
            record.jots.push(jot);
        }
        return records;
    }
    
    changeMonth(delta: number) {
        this.currentMonth += delta;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }

        // 重新渲染整个日历部分
        const calendarContainer = this.contentEl.querySelector(".jots-calendar");
        if (calendarContainer) {
            calendarContainer.empty();
            if (this.isSidebar) {
                this.renderCalendarCompact(calendarContainer);
            } else {
                this.renderCalendar(calendarContainer);
            }
        }
    }
    
    filterByDate(date: string) {
        this.searchQuery = `date:${date}`;
        this.updateSearchAndFilter();
    }
    
    renderSearch(container: HTMLElement) {
        const section = container.createDiv();
        section.style.marginBottom = "12px";
        section.style.backgroundColor = "var(--background-secondary)";
        section.style.borderRadius = "8px";
        section.style.padding = "12px";
        section.style.border = "1px solid var(--background-modifier-border)";
        
        const title = section.createDiv();
        title.textContent = t('searchAndTags', this.lang);
        title.style.fontSize = "13px";
        title.style.fontWeight = "500";
        title.style.marginBottom = "8px";
        title.style.color = "var(--text-normal)";
        
        this.searchContainer = section.createDiv();
        this.searchContainer.style.position = "relative";
        this.searchContainer.style.width = "100%";
        
        const searchInput = this.searchContainer.createEl("input");
        searchInput.type = "text";
        searchInput.placeholder = t('searchPlaceholder', this.lang);
        searchInput.style.width = "100%";
        searchInput.style.padding = "6px 8px";
        searchInput.style.paddingRight = "32px";
        searchInput.style.borderRadius = "4px";
        searchInput.style.border = "1px solid var(--background-modifier-border)";
        searchInput.style.backgroundColor = "var(--background-primary)";
        searchInput.style.color = "var(--text-normal)";
        searchInput.style.marginBottom = "12px";
        searchInput.value = this.searchQuery;
        this.searchInput = searchInput;

        searchInput.addEventListener("input", (e) => {
            const query = (e.target as HTMLInputElement).value;
            this.debouncedSearch(query);
        });

        this.updateClearButton();

        const tagFilter = section.createDiv();
        tagFilter.style.display = "flex";
        tagFilter.style.flexWrap = "wrap";
        tagFilter.style.gap = "6px";
        
        const allTags = this.getAllTags();
        allTags.forEach(tag => {
            const tagBtn = tagFilter.createSpan();
            tagBtn.textContent = `#${tag}`;
            tagBtn.style.padding = "2px 8px";
            tagBtn.style.borderRadius = "12px";
            tagBtn.style.fontSize = "11px";
            tagBtn.style.backgroundColor = this.selectedTags.has(tag) ? "var(--interactive-accent)" : "var(--background-primary)";
            tagBtn.style.color = this.selectedTags.has(tag) ? "var(--text-on-accent)" : "var(--text-muted)";
            tagBtn.style.border = "1px solid var(--background-modifier-border)";
            tagBtn.style.cursor = "pointer";
            tagBtn.addEventListener("click", () => {
                if (this.selectedTags.has(tag)) {
                    this.selectedTags.delete(tag);
                } else {
                    this.selectedTags.add(tag);
                }
                // 更新标签按钮样式
                tagBtn.style.backgroundColor = this.selectedTags.has(tag) ? "var(--interactive-accent)" : "var(--background-primary)";
                tagBtn.style.color = this.selectedTags.has(tag) ? "var(--text-on-accent)" : "var(--text-muted)";
                // 更新列表
                const listSection = this.contentEl.querySelector(".jots-list-section");
                if (listSection) {
                    this.renderJotList(listSection as HTMLElement);
                }
            });
        });
    }

    renderSearchCompact(container: HTMLElement) {
        const section = container.createDiv();
        section.style.marginBottom = "8px";
        section.style.backgroundColor = "var(--background-secondary)";
        section.style.borderRadius = "6px";
        section.style.padding = "10px";
        section.style.border = "1px solid var(--background-modifier-border)";
        
        const title = section.createDiv();
        title.textContent = t('searchAndTags', this.lang);
        title.style.fontSize = "12px";
        title.style.fontWeight = "500";
        title.style.marginBottom = "6px";
        title.style.color = "var(--text-normal)";
        
        this.searchContainer = section.createDiv();
        this.searchContainer.style.position = "relative";
        this.searchContainer.style.width = "100%";
        
        const searchInput = this.searchContainer.createEl("input");
        searchInput.type = "text";
        searchInput.placeholder = t('searchPlaceholderShort', this.lang);
        searchInput.style.width = "100%";
        searchInput.style.padding = "5px 8px";
        searchInput.style.paddingRight = "28px";
        searchInput.style.borderRadius = "4px";
        searchInput.style.border = "1px solid var(--background-modifier-border)";
        searchInput.style.backgroundColor = "var(--background-primary)";
        searchInput.style.color = "var(--text-normal)";
        searchInput.style.fontSize = "11px";
        searchInput.style.marginBottom = "10px";
        searchInput.value = this.searchQuery;
        this.searchInput = searchInput;

        searchInput.addEventListener("input", (e) => {
            const query = (e.target as HTMLInputElement).value;
            this.debouncedSearch(query);
        });

        this.updateClearButton();

        const tagFilter = section.createDiv();
        tagFilter.style.display = "flex";
        tagFilter.style.flexWrap = "wrap";
        tagFilter.style.gap = "4px";
        
        const allTags = this.getAllTags().slice(0, 8);
        allTags.forEach(tag => {
            const tagBtn = tagFilter.createSpan();
            tagBtn.textContent = `#${tag}`;
            tagBtn.style.padding = "2px 6px";
            tagBtn.style.borderRadius = "10px";
            tagBtn.style.fontSize = "10px";
            tagBtn.style.backgroundColor = this.selectedTags.has(tag) ? "var(--interactive-accent)" : "var(--background-primary)";
            tagBtn.style.color = this.selectedTags.has(tag) ? "var(--text-on-accent)" : "var(--text-muted)";
            tagBtn.style.border = "1px solid var(--background-modifier-border)";
            tagBtn.style.cursor = "pointer";
            tagBtn.addEventListener("click", () => {
                if (this.selectedTags.has(tag)) {
                    this.selectedTags.delete(tag);
                } else {
                    this.selectedTags.add(tag);
                }
                // 更新标签按钮样式
                tagBtn.style.backgroundColor = this.selectedTags.has(tag) ? "var(--interactive-accent)" : "var(--background-primary)";
                tagBtn.style.color = this.selectedTags.has(tag) ? "var(--text-on-accent)" : "var(--text-muted)";
                // 更新列表
                const listSection = this.contentEl.querySelector(".jots-list-section");
                if (listSection) {
                    this.renderJotList(listSection as HTMLElement);
                }
            });
        });

        const allTagsCount = this.getAllTags().length;
        if (allTagsCount > 8) {
            const moreHint = section.createDiv();
            moreHint.textContent = t('moreTags', this.lang, { count: String(allTagsCount - 8) });
            moreHint.style.fontSize = "9px";
            moreHint.style.color = "var(--text-muted)";
            moreHint.style.marginTop = "6px";
            moreHint.style.textAlign = "center";
        }
    }
    
    getAllTags(): string[] {
        const tags = new Set<string>();
        for (const jot of this.jots) {
            jot.tags.forEach(tag => tags.add(tag));
        }
        return Array.from(tags);
    }
    
    renderJotList(container: HTMLElement) {
        container.empty();
        container.addClass("jots-list-section");

        // 清理所有渲染的组件
        this.renderedComponents.forEach(comp => {
            try {
                comp.unload();
            } catch (e) {
                console.error("Error unloading component:", e);
            }
        });
        this.renderedComponents = [];

        this.jotListCleanups.forEach((fn) => {
            try {
                fn();
            } catch {
                /* ignore */
            }
        });
        this.jotListCleanups = [];

        let filteredJots = this.filterJots();

        if (filteredJots.length === 0) {
            const empty = container.createDiv();
            empty.textContent = t('noRecords', this.lang);
            empty.style.textAlign = "center";
            empty.style.padding = "40px";
            empty.style.color = "var(--text-muted)";
            empty.style.fontSize = "13px";
            return;
        }

        const searchKeywords =
            this.searchQuery.trim().length > 0 ? this.parseSearchFilters(this.searchQuery).keywords : [];

        const groupedByDate = new Map<string, Jot[]>();
        filteredJots.forEach(jot => {
            if (!groupedByDate.has(jot.date)) {
                groupedByDate.set(jot.date, []);
            }
            groupedByDate.get(jot.date)!.push(jot);
        });

        for (const [date, jots] of groupedByDate) {
            const dateGroup = container.createDiv();
            dateGroup.style.marginBottom = "16px";

            const dateHeader = dateGroup.createDiv();
            dateHeader.textContent = date;
            dateHeader.style.fontSize = "11px";
            dateHeader.style.fontWeight = "600";
            dateHeader.style.color = "var(--text-muted)";
            dateHeader.style.padding = "4px 0";
            dateHeader.style.borderBottom = "1px solid var(--background-modifier-border)";
            dateHeader.style.marginBottom = "8px";

            jots.forEach(jot => {
                const card = dateGroup.createDiv();
                card.style.backgroundColor = "var(--background-secondary)";
                card.style.borderRadius = "8px";
                card.style.padding = "10px 12px";
                card.style.marginBottom = "8px";
                card.style.transition = "all 0.2s";
                card.style.border = "1px solid var(--background-modifier-border)";

                if (this.editingJotId === jot.id) {
                    card.style.cursor = "default";
                    card.style.borderColor = "var(--interactive-accent)";

                    const metaRow = card.createDiv();
                    metaRow.style.display = "flex";
                    metaRow.style.flexWrap = "wrap";
                    metaRow.style.alignItems = "baseline";
                    metaRow.style.gap = "12px";
                    metaRow.style.marginBottom = "8px";
                    metaRow.style.fontSize = "10px";
                    metaRow.style.color = "var(--text-muted)";
                    metaRow.createSpan({ text: jot.time });
                    const updSpan = metaRow.createSpan();
                    updSpan.textContent = `${t("jotUpdatedAt", this.lang)}: ${jot.updatedAt}`;
                    updSpan.style.color = "var(--text-normal)";
                    updSpan.style.fontWeight = "600";

                    const textareaContainer = card.createDiv();
                    textareaContainer.style.position = "relative";
                    const textarea = textareaContainer.createEl("textarea");
                    textarea.classList.add("jots-edit-textarea");
                    textarea.value = jot.content;
                    textarea.style.width = "100%";
                    textarea.style.minHeight = "100px";
                    textarea.style.padding = "8px";
                    textarea.style.borderRadius = "6px";
                    textarea.style.border = "1px solid var(--background-modifier-border)";
                    textarea.style.backgroundColor = "var(--background-primary)";
                    textarea.style.color = "var(--text-normal)";
                    textarea.style.resize = "vertical";
                    textarea.style.fontFamily = "var(--font-text)";
                    textarea.placeholder = t("placeholderWithLink", this.lang);

                    const wlCleanup = this.setupWikilinkAutocomplete(textarea, textareaContainer);
                    if (wlCleanup) this.jotListCleanups.push(wlCleanup);

                    const tagSection = card.createDiv();
                    tagSection.style.marginTop = "8px";
                    const tagInputContainer = tagSection.createDiv();
                    tagInputContainer.style.position = "relative";
                    tagInputContainer.style.marginBottom = "8px";
                    const tagInput = tagInputContainer.createEl("input");
                    tagInput.classList.add("jots-tag-input");
                    tagInput.placeholder = t("tagsInputPlaceholder", this.lang);
                    tagInput.style.width = "100%";
                    tagInput.style.padding = "8px";
                    tagInput.style.borderRadius = "6px";
                    tagInput.style.border = "1px solid var(--background-modifier-border)";
                    tagInput.style.backgroundColor = "var(--background-primary)";
                    tagInput.style.color = "var(--text-normal)";

                    const tagListContainer = tagSection.createDiv();
                    tagListContainer.style.display = "flex";
                    tagListContainer.style.flexWrap = "wrap";
                    tagListContainer.style.gap = "6px";

                    const refreshEditTags = () => {
                        renderTagPills(tagListContainer, this.editSessionTags, (tag) => {
                            this.editSessionTags = this.editSessionTags.filter((x) => x !== tag);
                            refreshEditTags();
                        });
                    };
                    refreshEditTags();

                    setupTagAutocomplete(
                        () => this.getExistingTags(),
                        tagInput,
                        tagInputContainer,
                        tagListContainer,
                        this.editSessionTags,
                        (tag) => {
                            const cleaned = tag.replace(/^#+/, "").trim();
                            if (cleaned && !this.editSessionTags.includes(cleaned)) {
                                this.editSessionTags.push(cleaned);
                                refreshEditTags();
                                tagInput.value = "";
                            }
                        },
                        () => {}
                    );

                    const sourceInput = card.createEl("input");
                    sourceInput.classList.add("jots-edit-source");
                    sourceInput.value = jot.source;
                    sourceInput.placeholder = t("sourcePlaceholder", this.lang);
                    sourceInput.style.width = "100%";
                    sourceInput.style.padding = "8px";
                    sourceInput.style.borderRadius = "6px";
                    sourceInput.style.border = "1px solid var(--background-modifier-border)";
                    sourceInput.style.backgroundColor = "var(--background-primary)";
                    sourceInput.style.color = "var(--text-normal)";
                    sourceInput.style.marginTop = "8px";

                    const buttonRow = card.createDiv();
                    buttonRow.style.display = "flex";
                    buttonRow.style.justifyContent = "flex-end";
                    buttonRow.style.gap = "8px";
                    buttonRow.style.marginTop = "12px";

                    const cancelBtn = buttonRow.createEl("button");
                    cancelBtn.textContent = t("cancel", this.lang);
                    cancelBtn.style.padding = "6px 14px";
                    cancelBtn.style.borderRadius = "6px";
                    cancelBtn.style.border = "1px solid var(--background-modifier-border)";
                    cancelBtn.style.backgroundColor = "var(--background-primary)";
                    cancelBtn.style.color = "var(--text-normal)";
                    cancelBtn.style.cursor = "pointer";
                    cancelBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        this.exitEditMode();
                    });

                    const saveBtn = buttonRow.createEl("button");
                    saveBtn.textContent = t("save", this.lang);
                    saveBtn.style.padding = "6px 16px";
                    saveBtn.style.borderRadius = "6px";
                    saveBtn.style.backgroundColor = "var(--interactive-accent)";
                    saveBtn.style.color = "var(--text-on-accent)";
                    saveBtn.style.border = "none";
                    saveBtn.style.cursor = "pointer";
                    saveBtn.style.fontWeight = "500";
                    saveBtn.addEventListener("click", async (e) => {
                        e.stopPropagation();
                        const body = textarea.value.trim();
                        if (!body) {
                            new Notice(t("contentRequired", this.lang));
                            return;
                        }
                        const tags = normalizeJotTags(this.editSessionTags);
                        const source = sourceInput.value.trim();
                        const prevId = this.editingJotId;
                        const prevTags = [...this.editSessionTags];
                        this.editingJotId = null;
                        this.editSessionTags = [];
                        try {
                            await this.plugin.updateJot({
                                ...jot,
                                content: body,
                                tags,
                                source
                            });
                            new Notice(t("saved", this.lang));
                        } catch {
                            this.editingJotId = prevId;
                            this.editSessionTags = prevTags;
                            const listSection = this.contentEl.querySelector(".jots-list-section");
                            if (listSection) {
                                this.renderJotList(listSection as HTMLElement);
                            }
                        }
                    });

                    setTimeout(() => textarea.focus(), 0);
                    return;
                }

                card.style.cursor = "pointer";
                this.attachCardTapAndLongPress(card, jot);
                card.addEventListener("mouseenter", () => {
                    card.style.borderColor = "var(--interactive-accent)";
                    card.style.transform = "translateY(-1px)";
                });
                card.addEventListener("mouseleave", () => {
                    card.style.borderColor = "var(--background-modifier-border)";
                    card.style.transform = "translateY(0)";
                });

                const metaRow = card.createDiv();
                metaRow.style.display = "flex";
                metaRow.style.flexWrap = "wrap";
                metaRow.style.alignItems = "baseline";
                metaRow.style.gap = "12px";
                metaRow.style.marginBottom = "6px";
                metaRow.style.fontSize = "10px";
                metaRow.style.color = "var(--text-muted)";
                metaRow.createSpan({ text: jot.time });
                const updLabel = metaRow.createSpan();
                updLabel.textContent = `${t("jotUpdatedAt", this.lang)}: ${jot.updatedAt}`;
                updLabel.style.color = "var(--text-normal)";
                updLabel.style.fontWeight = "600";

                const contentContainer = card.createDiv();
                contentContainer.style.fontSize = "12px";
                contentContainer.style.lineHeight = "1.5";
                contentContainer.style.marginBottom = "6px";
                contentContainer.style.whiteSpace = "normal";
                contentContainer.style.wordBreak = "break-word";
                contentContainer.style.overflowWrap = "break-word";
                contentContainer.addClass("jots-card-content");

                const component = new Component();
                this.renderedComponents.push(component);

                // 修复：传入实际的源文件路径
                const sourcePath = jot.filePath || "";
                const wireRenderedContent = () => {
                    contentContainer.querySelectorAll('a.internal-link').forEach(link => {
                        const href = link.getAttribute('href');
                        if (href) {
                            link.addEventListener('mouseenter', (e) => {
                                const file = this.app.metadataCache.getFirstLinkpathDest(href, sourcePath);
                                if (file) {
                                    this.app.workspace.trigger("hover-link", {
                                        event: e,
                                        source: this.getViewType(),
                                        hoverParent: this,
                                        targetEl: link,
                                        linktext: href,
                                        sourcePath: sourcePath
                                    });
                                }
                            });

                            link.addEventListener('pointerdown', (e) => {
                                e.stopPropagation();
                            });

                            link.addEventListener('pointerup', (e) => {
                                e.stopPropagation();
                            });

                            link.addEventListener('click', (e) => {
                                e.stopPropagation();
                                this.app.workspace.openLinkText(href, sourcePath, false);
                            });
                        }
                    });

                    contentContainer.querySelectorAll('.internal-embed').forEach(embed => {
                        const src = embed.getAttribute('src');
                        if (src) {
                            embed.addEventListener('mouseenter', (e) => {
                                this.app.workspace.trigger("hover-link", {
                                    event: e,
                                    source: this.getViewType(),
                                    hoverParent: this,
                                    targetEl: embed,
                                    linktext: src,
                                    sourcePath: sourcePath
                                });
                            });

                            embed.addEventListener('pointerdown', (e) => {
                                e.stopPropagation();
                            });

                            embed.addEventListener('pointerup', (e) => {
                                e.stopPropagation();
                            });

                            embed.addEventListener('click', (e) => {
                                e.stopPropagation();
                                this.app.workspace.openLinkText(src, sourcePath, false);
                            });
                        }
                    });

                    contentContainer.querySelectorAll('input.task-list-item-checkbox').forEach(checkbox => {
                        checkbox.addEventListener('pointerdown', (e) => {
                            e.stopPropagation();
                        });
                        checkbox.addEventListener('pointerup', (e) => {
                            e.stopPropagation();
                        });
                        checkbox.addEventListener('click', (e) => {
                            e.stopPropagation();
                        });
                    });

                    if (searchKeywords.length > 0) {
                        highlightMarkdownContent(contentContainer, searchKeywords);
                    }
                };
                void Promise.resolve(MarkdownRenderer.renderMarkdown(
                    jot.content,
                    contentContainer,
                    sourcePath,
                    component
                )).then(wireRenderedContent);

                const tagsDiv = card.createDiv();
                tagsDiv.style.display = "flex";
                tagsDiv.style.flexWrap = "wrap";
                tagsDiv.style.gap = "4px";
                tagsDiv.style.marginBottom = "4px";

                jot.tags.forEach(tag => {
                    const tagSpan = tagsDiv.createSpan();
                    tagSpan.textContent = `#${tag}`;
                    tagSpan.style.fontSize = "9px";
                    tagSpan.style.padding = "2px 8px";
                    tagSpan.style.borderRadius = "12px";
                    tagSpan.style.backgroundColor = "var(--background-primary)";
                    tagSpan.style.border = "1px solid var(--background-modifier-border)";
                    tagSpan.style.color = "var(--text-muted)";
                    tagSpan.style.cursor = "pointer";
                    tagSpan.style.display = "inline-flex";
                    tagSpan.style.alignItems = "center";
                    tagSpan.style.whiteSpace = "nowrap";
                    tagSpan.addEventListener("pointerdown", (e) => {
                        e.stopPropagation();
                    });
                    tagSpan.addEventListener("pointerup", (e) => {
                        e.stopPropagation();
                    });
                    tagSpan.addEventListener("click", (e) => {
                        e.stopPropagation();
                        this.filterByTag(tag);
                    });
                });

                if (jot.source && jot.source.trim()) {
                    const sourceDiv = card.createDiv();
                    sourceDiv.textContent = jot.source;
                    sourceDiv.style.fontSize = "10px";
                    sourceDiv.style.color = "var(--text-muted)";
                    sourceDiv.style.fontStyle = "italic";
                    sourceDiv.style.marginTop = "4px";
                }

                if (jot.attachments && jot.attachments.length > 0) {
                    jot.attachments.forEach((attachment, idx) => {
                        const attachmentDiv = card.createDiv();
                        const icon = jot.attachmentTypes?.[idx] === "image" ? "🖼️" : "📎";
                        attachmentDiv.textContent = `${icon} ${attachment}`;
                        attachmentDiv.style.fontSize = "10px";
                        attachmentDiv.style.color = "var(--text-muted)";
                        attachmentDiv.style.marginTop = idx === 0 ? "4px" : "2px";
                    });
                }
            });
        }
    }
    
    filterJots(): Jot[] {
        let filtered = [...this.jots];
        const { date, updated, keywords } = this.parseSearchFilters(this.searchQuery);

        if (date) {
            filtered = filtered.filter((jot) => jot.date === date);
        }
        if (updated) {
            filtered = filtered.filter((jot) => jot.updatedAt.startsWith(updated));
        }
        if (keywords.length > 0) {
            filtered = filtered.filter((jot) => {
                const contentLower = jot.content.toLowerCase();
                return keywords.every((kw) => contentLower.includes(kw));
            });
        }

        if (this.selectedTags.size > 0) {
            filtered = filtered.filter((jot) => jot.tags.some((tag) => this.selectedTags.has(tag)));
        }

        return filtered;
    }
    
    filterByTag(tag: string) {
        if (this.selectedTags.has(tag)) {
            this.selectedTags.delete(tag);
        } else {
            this.selectedTags.clear();
            this.selectedTags.add(tag);
        }
        this.render();
    }
    
    async openJot(jot: Jot) {
        const folder = normalizePath(this.plugin.settings.saveFolder);
        let filePath: string;

        if (jot.filePath) {
            filePath = normalizePath(jot.filePath);
        } else if (this.plugin.settings.logMode === "multi") {
            const dateStr = jot.date;
            let filename = this.plugin.settings.multiFileFormat.replace("YYYYMMDD", dateStr.replace(/-/g, ""));
            if (!filename.endsWith(".md")) {
                filename += ".md";
            }
            filePath = `${folder}/${filename}`;
        } else {
            filePath = `${folder}/jots.md`;
        }

        const file = this.app.vault.getAbstractFileByPath(filePath);
        if (file && file instanceof TFile) {
            let targetLeaf: WorkspaceLeaf | null = null;
            const leaves = this.app.workspace.getLeavesOfType("markdown");
            
            for (const leaf of leaves) {
                if (leaf.view instanceof MarkdownView) {
                    const activeFile = leaf.view.file;
                    if (activeFile && activeFile.path === file.path) {
                        targetLeaf = leaf;
                        break;
                    }
                }
            }
            
            let leaf: WorkspaceLeaf;
            if (targetLeaf) {
                leaf = targetLeaf;
                this.app.workspace.revealLeaf(leaf);
            } else {
                leaf = this.app.workspace.getLeaf("tab");
                await leaf.openFile(file);
            }
            
            if (leaf.view instanceof MarkdownView) {
                const editor = leaf.view.editor;
                const content = await this.app.vault.read(file);
                const lines = content.split("\n");
                let foundLine = -1;

                let idx = 0;
                while (idx < lines.length) {
                    const lineTrim = lines[idx].trim();
                    if (lineTrim.startsWith("### ")) {
                        const blockStart = idx;
                        const headerRest = lineTrim.substring(4).trim();
                        const [datePart, timePart] = headerRest.split(" ");
                        let metaId = "";
                        let j = idx + 1;
                        while (j < lines.length) {
                            const tl = lines[j].trim();
                            const idMatch = tl.match(/^####\s+id:\s*(.+)$/i);
                            if (idMatch) {
                                metaId = idMatch[1].trim();
                                j++;
                                continue;
                            }
                            if (/^####\s+updatedAt:\s*.+$/i.test(tl)) {
                                j++;
                                continue;
                            }
                            break;
                        }
                        const resolvedId = metaId || stableLegacyJotId(file.path, datePart || "", timePart || "");
                        if (resolvedId === jot.id) {
                            foundLine = blockStart;
                            break;
                        }
                        let k = j;
                        while (k < lines.length && !lines[k].trim().startsWith("### ")) {
                            k++;
                        }
                        idx = k;
                    } else {
                        idx++;
                    }
                }

                if (foundLine === -1) {
                    const targetHeader = "### " + jot.date + " " + jot.time;
                    for (let line = 0; line < lines.length; line++) {
                        if (lines[line].trim() === targetHeader) {
                            foundLine = line;
                            break;
                        }
                    }
                }

                if (foundLine !== -1) {
                    editor.setCursor({ line: foundLine, ch: 0 });
                    editor.scrollIntoView({
                        from: { line: foundLine, ch: 0 },
                        to: { line: foundLine + 1, ch: 0 }
                    }, true);
                }
            }
        }
    }
}