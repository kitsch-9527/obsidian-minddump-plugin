// src/view.ts
import { ItemView, WorkspaceLeaf, TFile, TFolder, Notice, MarkdownView, MarkdownRenderer, Component, normalizePath, setIcon, Menu } from 'obsidian';
import moment from 'moment';
import MindDumpPlugin from './main';
import { MindDump, HeatDayCell, Language } from './types';
import { translations, t, Translations } from './i18n';
import {
    parseFileContent,
    highlightMarkdownContent,
    debounce,
    stableLegacyMindDumpId,
    normalizeMindDumpTags
} from './utils';
import { mountQuickComposeCard } from './quick-compose-card';
import type { RichMarkdownFieldApi } from './rich-markdown-field';

const CARD_LONG_PRESS_MS = 480;
const CARD_TAP_MOVE_PX = 14;

const VAULT_IMAGE_EXT = /\.(png|jpe?g|gif|webp|bmp|svg|heic|heif|avif)$/i;
const AUDIO_EXT_RE = /\.(mp3|m4a|wav|ogg|aac|flac|webm)(\]|$|\s|\?)/i;

type SearchTimePreset = "none" | "onThisDay" | "thisMonth" | "lastMonth" | "last7" | "last30" | "custom";
type TagMatchMode = "include" | "exclude" | "noTags";
type ContentTypeFilter = "image" | "link" | "audio";
type RightRailTagSort = "nameAsc" | "nameDesc" | "countDesc" | "countAsc";
type MindDumpListSort = "createdDesc" | "createdAsc" | "updatedDesc" | "updatedAsc";

export const VIEW_TYPE_MINDDUMP = "minddump-view";

export class MindDumpView extends ItemView {
    plugin: MindDumpPlugin;
    mindDumps: MindDump[] = [];
    searchQuery: string = "";
    selectedTags: Set<string> = new Set();
    isSidebar: boolean = false;
    private suggestionContainer: HTMLElement | null = null;
    private quickComposeContent: RichMarkdownFieldApi | null = null;
    private inputCard: HTMLElement | null = null;
    private searchInput: HTMLInputElement | null = null;
    private searchContainer: HTMLElement | null = null;
    private renderedComponents: Component[] = [];
    private tagSuggestionContainer: HTMLElement | null = null;
    private debouncedRender: (() => void) | null = null;
    private debouncedSearch: (query: string) => void;
    private wikilinkCleanup: (() => void) | null = null;
    /** Inline mindDump edit */
    private editingMindDumpId: string | null = null;
    private mindDumpListCleanups: (() => void)[] = [];
    /** Tears down floating card ⋮ menu (outside list DOM). */
    private cardMenuUnmount: (() => void) | null = null;
    /** Fullscreen image preview overlay. */
    private imageLightboxUnmount: (() => void) | null = null;
    /** Pull-to-refresh cleanup */
    private ptrCleanup: (() => void) | null = null;

    private searchTimePreset: SearchTimePreset = "none";
    private tagMatchMode: TagMatchMode = "include";
    private contentTypeFilters = new Set<ContentTypeFilter>();
    private searchTagsSectionCollapsed = false;
    private searchContentSectionCollapsed = false;
    private viewingRecycleBin = false;
    private rightRailTagsCollapsed = false;
    /** Main layout: entire right column (search, calendar, tags rail) collapsed to a slim strip */
    private rightFunctionalPanelCollapsed = false;
    /** Right rail tag list: substring filter (sidebar / main layout) */
    private rightRailTagListQuery = "";
    private rightRailTagSort: RightRailTagSort = "nameAsc";
    private mindDumpListSort: MindDumpListSort = "createdDesc";

    get lang(): Language {
        return this.plugin.lang;
    }

    constructor(leaf: WorkspaceLeaf, plugin: MindDumpPlugin) {
        super(leaf);
        this.plugin = plugin;

        // 初始化防抖搜索函数
        this.debouncedSearch = debounce((query: string) => {
            this.searchQuery = query;
            this.viewingRecycleBin = false;
            this.updateSearchAndFilter();
        }, 300);
    }

    getViewType(): string {
        return VIEW_TYPE_MINDDUMP;
    }

    getDisplayText(): string {
        return t('mindDumpView', this.lang);
    }

    getIcon(): string {
        return "minddump-bolt";
    }

    async onOpen() {
        this.contentEl.addClass("minddump-view");

        if (this.leaf.tabHeaderInnerIconEl) {
            this.leaf.tabHeaderInnerIconEl.empty();
        }

        // 初始化防抖渲染
        this.debouncedRender = debounce(() => {
            this.render();
        }, 200);

        await this.refresh();

        this.registerEvent(
            this.app.workspace.on('active-leaf-change', (leaf) => {
                if (leaf === this.leaf && this.quickComposeContent) {
                    this.focusTextarea();
                }
            })
        );
    }

    onResize() {
        const wasSidebar = this.isSidebar;
        this.checkIfSidebar();

        /* Re-render immediately when crossing the breakpoint; debouncedRender would leave wrong layout visible ~200ms. */
        if (wasSidebar !== this.isSidebar) {
            this.render();
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
        this.closeCardMenu();
        this.closeImageLightbox();
        this.destroyPtr();
    }

    private focusTextarea() {
        if (this.quickComposeContent) {
            setTimeout(() => {
                this.quickComposeContent?.focusEnd();
            }, 50);
        }
    }

    /** Tear down capture quick-input listeners before DOM is cleared (see `render`). */
    private disposeQuickCaptureInput() {
        if (this.wikilinkCleanup) {
            try {
                this.wikilinkCleanup();
            } catch {
                /* ignore */
            }
            this.wikilinkCleanup = null;
        }
        this.inputCard = null;
        this.quickComposeContent = null;
    }

    private updateSearchAndFilter() {
        if (this.searchInput) {
            this.searchInput.value = this.searchQuery;
        }
        this.updateClearButton();
        const listSection = this.contentEl.querySelector(".minddump-list-section");
        if (listSection) {
            this.renderMindDumpList(listSection as HTMLElement);
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

                clearBtnContainer.addEventListener("mousedown", (e) => e.preventDefault());

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

    private parseSearchFilters(query: string): { date?: string; updated?: string; activity?: string; keywords: string[] } {
        const keywords: string[] = [];
        let date: string | undefined;
        let updated: string | undefined;
        let activity: string | undefined;
        for (const part of query.trim().split(/\s+/).filter(Boolean)) {
            const lower = part.toLowerCase();
            if (lower.startsWith("date:")) {
                date = part.slice(5);
            } else if (lower.startsWith("updated:")) {
                updated = part.slice(8);
            } else if (lower.startsWith("activity:")) {
                activity = part.slice(9);
            } else {
                keywords.push(part.toLowerCase());
            }
        }
        return { date, updated, activity, keywords };
    }

    private attachCardTapAndLongPress(card: HTMLElement, mindDump: MindDump) {
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
                void this.openMindDump(mindDump);
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

        this.mindDumpListCleanups.push(() => {
            clearTimer();
            card.removeEventListener("pointerdown", onPointerDown);
            card.removeEventListener("pointermove", onPointerMove);
            card.removeEventListener("pointerup", onPointerUp);
            card.removeEventListener("pointercancel", onPointerCancel);
        });
    }

    private closeImageLightbox() {
        if (this.imageLightboxUnmount) {
            try {
                this.imageLightboxUnmount();
            } catch {
                /* ignore */
            }
            this.imageLightboxUnmount = null;
        }
    }

    private openImageLightbox(src: string) {
        if (!src) return;
        this.closeImageLightbox();
        const doc = this.containerEl.ownerDocument;
        const win = doc.defaultView ?? window;
        const ws = this.app.workspace.containerEl;
        const mount = ws && ws.ownerDocument === doc ? ws : doc.body;
        const root = mount.createDiv({ cls: "minddump-image-lightbox" });
        root.tabIndex = -1;
        root.setAttribute("role", "dialog");
        root.setAttribute("aria-modal", "true");
        const imgEl = root.createEl("img", { cls: "minddump-image-lightbox-img", attr: { src, alt: "" } });
        imgEl.draggable = false;
        imgEl.style.setProperty("max-width", "96vw", "important");
        imgEl.style.setProperty("max-height", "96vh", "important");
        imgEl.style.setProperty("width", "auto", "important");
        imgEl.style.setProperty("height", "auto", "important");
        imgEl.style.setProperty("object-fit", "contain", "important");

        const close = () => this.closeImageLightbox();

        root.addEventListener("click", (e) => {
            if (e.target !== imgEl) close();
        });

        const onKey = (ev: KeyboardEvent) => {
            if (ev.key === "Escape") {
                ev.preventDefault();
                close();
            }
        };
        win.addEventListener("keydown", onKey);

        this.imageLightboxUnmount = () => {
            win.removeEventListener("keydown", onKey);
            root.remove();
        };

        requestAnimationFrame(() => root.focus());
    }

    private wireCardImageZoom(img: HTMLImageElement) {
        const blockToCard = (e: Event) => e.stopPropagation();
        img.addEventListener("pointerdown", blockToCard);
        img.addEventListener("pointermove", blockToCard);
        img.addEventListener("pointerup", blockToCard);
        img.addEventListener("pointercancel", blockToCard);
        img.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.openImageLightbox(img.currentSrc || img.src);
        });
    }

    private closeCardMenu() {
        if (this.cardMenuUnmount) {
            try {
                this.cardMenuUnmount();
            } catch {
                /* ignore */
            }
            this.cardMenuUnmount = null;
        }
    }

    private mindDumpWordCount(mindDump: MindDump): number {
        const stripped = mindDump.content
            .replace(/!\[\[[^\]]+\]\]/g, "")
            .replace(/\[\[[^\]]+\]\]/g, "x")
            .replace(/```[\s\S]*?```/g, "")
            .replace(/`[^`]+`/g, "")
            .replace(/[#>*_\-\[\]()]/g, "")
            .trim();
        return stripped.length > 0 ? [...stripped].length : 0;
    }

    private buildObsidianFileUri(mindDump: MindDump): string | null {
        if (!mindDump.filePath) return null;
        const vault = this.app.vault.getName();
        return `obsidian://open?vault=${encodeURIComponent(vault)}&file=${encodeURIComponent(normalizePath(mindDump.filePath))}`;
    }

    private mindDumpMarkdownClipboardText(mindDump: MindDump): string {
        let md = mindDump.content;
        const tagLine = normalizeMindDumpTags(mindDump.tags)
            .map((x) => `#${x}`)
            .join(" ");
        if (tagLine) md += `\n\n${tagLine}`;
        if (mindDump.source?.trim()) {
            const prefix = this.lang === "zh" ? "来源:" : "Source:";
            md += `\n\n${prefix} ${mindDump.source.trim()}`;
        }
        return md;
    }

    /** Same window/document as the mindDump view (pop-out safe). */
    private getCardMenuMount(): { mountEl: HTMLElement; doc: Document; win: Window } {
        const doc = this.contentEl.doc;
        const win = this.contentEl.win;
        return { mountEl: doc.body, doc, win };
    }

    private applyCardMenuShellStyles(menu: HTMLElement, win: Window) {
        menu.style.position = "fixed";
        menu.style.zIndex = "55000";
        menu.style.boxSizing = "border-box";
        menu.style.backgroundColor = "var(--background-primary)";
        menu.style.border = "1px solid var(--background-modifier-border)";
        menu.style.borderRadius = "10px";
        menu.style.boxShadow = "0 8px 28px rgba(0, 0, 0, 0.18)";
        menu.style.padding = "6px 0";
        menu.style.color = "var(--text-normal)";
        menu.style.fontSize = "13px";
        menu.style.maxWidth = `${Math.max(160, win.innerWidth - 16)}px`;
    }

    private positionCardMenu(menu: HTMLElement, anchor: HTMLElement) {
        const win = anchor.win;
        const r = anchor.getBoundingClientRect();
        const pad = 8;
        const vw = win.innerWidth;
        const vh = win.innerHeight;
        const mw = Math.min(240, vw - pad * 2);
        menu.style.width = `${mw}px`;
        this.applyCardMenuShellStyles(menu, win);
        let left = r.right - mw;
        let top = r.bottom + 4;
        if (left < pad) left = pad;
        if (left + mw > vw - pad) left = vw - mw - pad;
        const mh = menu.offsetHeight || 320;
        if (top + mh > vh - pad) {
            top = Math.max(pad, r.top - mh - 4);
        }
        menu.style.left = `${left}px`;
        menu.style.top = `${top}px`;
    }

    private openDeletedCardMenu(anchor: HTMLElement, mindDump: MindDump) {
        this.closeCardMenu();
        const lang = this.lang;
        const { mountEl, doc, win } = this.getCardMenuMount();

        const menu = mountEl.createDiv({ cls: "minddump-card-menu-popover" });
        menu.dataset.anchorId = mindDump.id;
        this.applyCardMenuShellStyles(menu, win);

        const addDivider = () => menu.createDiv({ cls: "minddump-card-menu-divider" });

        const addIconRow = (iconId: string, label: string, onActivate: () => void) => {
            const row = menu.createDiv({ cls: "minddump-card-menu-row minddump-card-menu-row--action" });
            const iconWrap = row.createSpan({ cls: "minddump-card-menu-row-icon" });
            setIcon(iconWrap, iconId);
            row.createSpan({ cls: "minddump-card-menu-row-label", text: label });
            row.addEventListener("pointerdown", (e) => e.stopPropagation());
            row.addEventListener("click", (e) => {
                e.stopPropagation();
                onActivate();
            });
        };

        addIconRow("share", t("cardMenuShare", lang), async () => {
            this.closeCardMenu();
            try {
                if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
                    await navigator.share({ text: mindDump.content });
                } else {
                    await navigator.clipboard.writeText(mindDump.content);
                    new Notice(t("cardMenuShareCopied", lang));
                }
            } catch (err) {
                if ((err as { name?: string })?.name === "AbortError") return;
                try {
                    await navigator.clipboard.writeText(mindDump.content);
                    new Notice(t("cardMenuShareCopied", lang));
                } catch {
                    /* ignore */
                }
            }
        });

        addIconRow("undo-2", t("cardMenuRestore", lang), async () => {
            this.closeCardMenu();
            try {
                await this.plugin.updateMindDump({ ...mindDump, deleted: false });
                new Notice(t("cardMenuRestored", lang));
            } catch {
                /* updateMindDump already showed Notice */
            }
        });

        addDivider();

        const purRow = menu.createDiv({ cls: "minddump-card-menu-row minddump-card-menu-row--danger" });
        purRow.textContent = t("cardMenuPurge", lang);
        purRow.addEventListener("pointerdown", (e) => e.stopPropagation());
        purRow.addEventListener("click", async (e) => {
            e.stopPropagation();
            this.closeCardMenu();
            if (!confirm(t("cardMenuPurgeConfirm", lang))) return;
            try {
                await this.plugin.purgeMindDump(mindDump);
                new Notice(t("cardMenuPurged", lang));
            } catch {
                /* purgeMindDump already showed Notice */
            }
        });

        addDivider();

        const footer = menu.createDiv({ cls: "minddump-card-menu-footer" });
        const wc = this.mindDumpWordCount(mindDump);
        footer.createDiv({
            cls: "minddump-card-menu-footer-line",
            text: t("cardMenuWordCount", lang, { count: String(wc) })
        });
        const timeDisplay = moment(mindDump.updatedAt, "YYYY-MM-DD HH:mm:ss", true).isValid()
            ? moment(mindDump.updatedAt, "YYYY-MM-DD HH:mm:ss").format("HH:mm")
            : (mindDump.updatedAt.includes(" ") ? mindDump.updatedAt.split(/\s+/).pop() ?? mindDump.updatedAt : mindDump.updatedAt);
        footer.createDiv({
            cls: "minddump-card-menu-footer-line",
            text: t("cardMenuEditedAtFooter", lang, { time: timeDisplay })
        });

        const onDocPointer = (ev: PointerEvent) => {
            const tEl = ev.target as Node;
            if (!menu.contains(tEl) && !anchor.contains(tEl)) {
                this.closeCardMenu();
            }
        };
        const onKey = (ev: KeyboardEvent) => {
            if (ev.key === "Escape") this.closeCardMenu();
        };
        const onScrollClose = () => this.closeCardMenu();
        const onReposition = () => this.positionCardMenu(menu, anchor);

        win.addEventListener("resize", onReposition);
        win.addEventListener("scroll", onScrollClose, true);
        this.contentEl.addEventListener("scroll", onScrollClose, true);

        this.cardMenuUnmount = () => {
            win.removeEventListener("resize", onReposition);
            win.removeEventListener("scroll", onScrollClose, true);
            this.contentEl.removeEventListener("scroll", onScrollClose, true);
            doc.removeEventListener("pointerdown", onDocPointer, true);
            win.removeEventListener("keydown", onKey);
            menu.remove();
        };

        requestAnimationFrame(() => {
            this.positionCardMenu(menu, anchor);
            setTimeout(() => {
                doc.addEventListener("pointerdown", onDocPointer, true);
                win.addEventListener("keydown", onKey);
            }, 0);
        });
    }

    private openCardMenu(anchor: HTMLElement, mindDump: MindDump) {
        if (mindDump.deleted) {
            this.openDeletedCardMenu(anchor, mindDump);
            return;
        }
        this.closeCardMenu();
        const lang = this.lang;
        const { mountEl, doc, win } = this.getCardMenuMount();

        const menu = mountEl.createDiv({ cls: "minddump-card-menu-popover" });
        menu.dataset.anchorId = mindDump.id;
        this.applyCardMenuShellStyles(menu, win);

        const addDivider = () => menu.createDiv({ cls: "minddump-card-menu-divider" });

        const addIconRow = (iconId: string, label: string, onActivate: () => void) => {
            const row = menu.createDiv({ cls: "minddump-card-menu-row minddump-card-menu-row--action" });
            const iconWrap = row.createSpan({ cls: "minddump-card-menu-row-icon" });
            setIcon(iconWrap, iconId);
            row.createSpan({ cls: "minddump-card-menu-row-label", text: label });
            row.addEventListener("pointerdown", (e) => e.stopPropagation());
            row.addEventListener("click", (e) => {
                e.stopPropagation();
                onActivate();
            });
        };

        const addStubRow = (label: string) => {
            const row = menu.createDiv({ cls: "minddump-card-menu-row minddump-card-menu-row--stub" });
            row.createSpan({ cls: "minddump-card-menu-row-label", text: label });
            row.addEventListener("pointerdown", (e) => e.stopPropagation());
            row.addEventListener("click", (e) => {
                e.stopPropagation();
                new Notice(t("cardMenuComingSoon", lang));
            });
        };

        addIconRow("share", t("cardMenuShare", lang), async () => {
            this.closeCardMenu();
            try {
                if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
                    await navigator.share({ text: mindDump.content });
                } else {
                    await navigator.clipboard.writeText(mindDump.content);
                    new Notice(t("cardMenuShareCopied", lang));
                }
            } catch (err) {
                if ((err as { name?: string })?.name === "AbortError") return;
                try {
                    await navigator.clipboard.writeText(mindDump.content);
                    new Notice(t("cardMenuShareCopied", lang));
                } catch {
                    /* ignore */
                }
            }
        });

        addIconRow("pencil", t("cardMenuEdit", lang), () => {
            this.closeCardMenu();
            this.enterEditMode(mindDump);
        });

        addDivider();
        addStubRow(t("cardMenuPinTop", lang));
        addStubRow(t("cardMenuFloatingWindow", lang));

        const relatedRow = menu.createDiv({ cls: "minddump-card-menu-row minddump-card-menu-row--stub minddump-card-menu-row--spread" });
        relatedRow.createSpan({ cls: "minddump-card-menu-row-label", text: t("cardMenuRelatedNotes", lang) });
        relatedRow.createSpan({ cls: "minddump-card-menu-ai-badge", text: t("cardMenuAiBadge", lang) });
        relatedRow.addEventListener("pointerdown", (e) => e.stopPropagation());
        relatedRow.addEventListener("click", (e) => {
            e.stopPropagation();
            new Notice(t("cardMenuComingSoon", lang));
        });

        const copyLinkRow = menu.createDiv({ cls: "minddump-card-menu-row" });
        copyLinkRow.createSpan({ cls: "minddump-card-menu-row-label", text: t("cardMenuCopyLink", lang) });
        copyLinkRow.addEventListener("pointerdown", (e) => e.stopPropagation());
        copyLinkRow.addEventListener("click", async (e) => {
            e.stopPropagation();
            this.closeCardMenu();
            const uri = this.buildObsidianFileUri(mindDump);
            if (!uri) {
                new Notice(t("mindDumpUpdateNoFile", lang));
                return;
            }
            try {
                await navigator.clipboard.writeText(uri);
                new Notice(t("cardMenuLinkCopied", lang));
            } catch {
                /* ignore */
            }
        });

        addStubRow(t("cardMenuAnnotate", lang));

        const moreRow = menu.createDiv({ cls: "minddump-card-menu-row minddump-card-menu-row--spread minddump-card-menu-row--more" });
        moreRow.createSpan({ cls: "minddump-card-menu-row-label", text: t("cardMenuMore", lang) });
        const chev = moreRow.createSpan({ cls: "minddump-card-menu-row-chevron" });
        setIcon(chev, "chevron-right");
        const sub = menu.createDiv({ cls: "minddump-card-menu-sub" });
        const subOpenNote = sub.createDiv({ cls: "minddump-card-menu-row minddump-card-menu-row--sub" });
        subOpenNote.textContent = t("cardMenuMoreOpenNote", lang);
        subOpenNote.addEventListener("pointerdown", (e) => e.stopPropagation());
        subOpenNote.addEventListener("click", (e) => {
            e.stopPropagation();
            this.closeCardMenu();
            void this.openMindDump(mindDump);
        });
        const subCopyMd = sub.createDiv({ cls: "minddump-card-menu-row minddump-card-menu-row--sub" });
        subCopyMd.textContent = t("cardMenuMoreCopyMarkdown", lang);
        subCopyMd.addEventListener("pointerdown", (e) => e.stopPropagation());
        subCopyMd.addEventListener("click", async (e) => {
            e.stopPropagation();
            this.closeCardMenu();
            try {
                await navigator.clipboard.writeText(this.mindDumpMarkdownClipboardText(mindDump));
                new Notice(t("cardMenuShareCopied", lang));
            } catch {
                /* ignore */
            }
        });
        moreRow.addEventListener("pointerdown", (e) => e.stopPropagation());
        moreRow.addEventListener("click", (e) => {
            e.stopPropagation();
            const open = sub.classList.toggle("is-open");
            moreRow.classList.toggle("is-open", open);
            this.positionCardMenu(menu, anchor);
        });

        addDivider();

        const delRow = menu.createDiv({ cls: "minddump-card-menu-row minddump-card-menu-row--danger" });
        delRow.textContent = t("cardMenuDelete", lang);
        delRow.addEventListener("pointerdown", (e) => e.stopPropagation());
        delRow.addEventListener("click", async (e) => {
            e.stopPropagation();
            this.closeCardMenu();
            if (!confirm(t("cardMenuDeleteConfirm", lang))) return;
            try {
                await this.plugin.deleteMindDump(mindDump);
                new Notice(t("cardMenuDeleted", lang));
            } catch {
                /* deleteMindDump already showed Notice */
            }
        });

        addDivider();

        const footer = menu.createDiv({ cls: "minddump-card-menu-footer" });
        const wc = this.mindDumpWordCount(mindDump);
        footer.createDiv({
            cls: "minddump-card-menu-footer-line",
            text: t("cardMenuWordCount", lang, { count: String(wc) })
        });
        const timeDisplay = moment(mindDump.updatedAt, "YYYY-MM-DD HH:mm:ss", true).isValid()
            ? moment(mindDump.updatedAt, "YYYY-MM-DD HH:mm:ss").format("HH:mm")
            : (mindDump.updatedAt.includes(" ") ? mindDump.updatedAt.split(/\s+/).pop() ?? mindDump.updatedAt : mindDump.updatedAt);
        footer.createDiv({
            cls: "minddump-card-menu-footer-line",
            text: t("cardMenuEditedAtFooter", lang, { time: timeDisplay })
        });

        const onDocPointer = (ev: PointerEvent) => {
            const tEl = ev.target as Node;
            if (!menu.contains(tEl) && !anchor.contains(tEl)) {
                this.closeCardMenu();
            }
        };
        const onKey = (ev: KeyboardEvent) => {
            if (ev.key === "Escape") this.closeCardMenu();
        };
        const onScrollClose = () => this.closeCardMenu();
        const onReposition = () => this.positionCardMenu(menu, anchor);

        win.addEventListener("resize", onReposition);
        win.addEventListener("scroll", onScrollClose, true);
        this.contentEl.addEventListener("scroll", onScrollClose, true);

        this.cardMenuUnmount = () => {
            win.removeEventListener("resize", onReposition);
            win.removeEventListener("scroll", onScrollClose, true);
            this.contentEl.removeEventListener("scroll", onScrollClose, true);
            doc.removeEventListener("pointerdown", onDocPointer, true);
            win.removeEventListener("keydown", onKey);
            menu.remove();
        };

        requestAnimationFrame(() => {
            this.positionCardMenu(menu, anchor);
            setTimeout(() => {
                doc.addEventListener("pointerdown", onDocPointer, true);
                win.addEventListener("keydown", onKey);
            }, 0);
        });
    }

    private enterEditMode(mindDump: MindDump) {
        this.editingMindDumpId = mindDump.id;
        const listSection = this.contentEl.querySelector(".minddump-list-section");
        if (listSection) {
            this.renderMindDumpList(listSection as HTMLElement);
        }
    }

    private exitEditMode() {
        this.editingMindDumpId = null;
        const listSection = this.contentEl.querySelector(".minddump-list-section");
        if (listSection) {
            this.renderMindDumpList(listSection as HTMLElement);
        }
    }

    private getExistingTags(): string[] {
        const tags = new Set<string>();
        for (const mindDump of this.mindDumps) {
            if (mindDump.deleted) continue;
            mindDump.tags.forEach(tag => tags.add(tag));
        }
        return Array.from(tags);
    }

    checkIfSidebar() {
        const width = this.contentEl.clientWidth;
        /* Avoid treating unlaid-out panes (width 0) as sidebar; prevents a flash of compact heatmap then main layout. */
        if (width <= 0) return;
        this.isSidebar = width < 450;
    }

    async refresh() {
        await this.loadMindDumps();
        this.render();
    }

    async loadMindDumps() {
        const folder = this.plugin.settings.saveFolder;
        const folderObj = this.app.vault.getAbstractFileByPath(folder);

        if (!folderObj || !(folderObj instanceof TFolder)) {
            this.mindDumps = [];
            return;
        }

        const files = folderObj.children.filter(f => f instanceof TFile && f.name.endsWith(".md"));
        const allMindDumps: MindDump[] = [];

        for (const file of files) {
            const content = await this.app.vault.read(file as TFile);
            const entries = parseFileContent(content, file.path, this.lang);
            allMindDumps.push(...entries);
        }

        allMindDumps.sort((a, b) => {
            const dateA = moment(a.date + " " + a.time, "YYYY-MM-DD HH:mm:ss");
            const dateB = moment(b.date + " " + b.time, "YYYY-MM-DD HH:mm:ss");
            return dateB.valueOf() - dateA.valueOf();
        });

        this.mindDumps = allMindDumps;
    }

    render() {
        this.destroyPtr();
        this.checkIfSidebar();
        this.disposeQuickCaptureInput();
        this.contentEl.empty();
        this.contentEl.toggleClass("minddump-view--main-layout", !this.isSidebar);

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
        leftPanel.style.flex = "4";
        leftPanel.style.display = "flex";
        leftPanel.style.flexDirection = "column";
        leftPanel.style.overflow = "hidden";
        leftPanel.style.position = "relative";
        leftPanel.style.padding = "0 10px 10px";

        // Pull-to-refresh indicator (slides in via GPU-composited transform)
        const ptrIndicator = leftPanel.createDiv({ cls: "minddump-ptr-indicator" });
        ptrIndicator.style.position = "absolute";
        ptrIndicator.style.top = "0";
        ptrIndicator.style.left = "0";
        ptrIndicator.style.right = "0";
        ptrIndicator.style.zIndex = "2";
        ptrIndicator.style.display = "flex";
        ptrIndicator.style.alignItems = "center";
        ptrIndicator.style.justifyContent = "center";
        ptrIndicator.style.pointerEvents = "none";
        ptrIndicator.style.transform = "translateY(-100%)";
        const ptrIcon = ptrIndicator.createSpan({ cls: "minddump-ptr-icon" });
        ptrIcon.style.transition = "transform 0.2s ease";
        setIcon(ptrIcon, "arrow-down");

        // Scrollable content wrapper (GPU-composited via will-change)
        const ptrScroll = leftPanel.createDiv({ cls: "minddump-ptr-content" });
        ptrScroll.style.flex = "1";
        ptrScroll.style.overflow = "auto";
        ptrScroll.style.willChange = "transform";

        const rightShell = container.createDiv({ cls: "minddump-right-shell" });
        if (this.rightFunctionalPanelCollapsed) {
            rightShell.addClass("is-collapsed");
        }
        rightShell.style.flex = this.rightFunctionalPanelCollapsed ? "0" : "1";
        rightShell.style.minWidth = "0";

        const rightPanelInner = rightShell.createDiv({ cls: "minddump-right-panel-inner" });

        /** Search + quick input (or recycle banner) stick together while the list scrolls. */
        const leftStickyStack = ptrScroll.createDiv({ cls: "minddump-left-sticky-stack" });

        const searchRow = leftStickyStack.createDiv({ cls: "minddump-main-search-row" });
        const searchRowMain = searchRow.createDiv({ cls: "minddump-main-search-row__main" });
        this.renderSearch(searchRowMain);
        const rightPanelToggleBtn = searchRow.createEl("button", {
            type: "button",
            cls: "minddump-right-shell-toggle-btn minddump-main-search-row__toggle",
            attr: this.rightFunctionalPanelCollapsed
                ? {
                      "aria-label": t("rightPanelExpand", this.lang),
                      title: t("rightPanelExpand", this.lang),
                  }
                : {
                      "aria-label": t("rightPanelCollapse", this.lang),
                      title: t("rightPanelCollapse", this.lang),
                  },
        });
        setIcon(rightPanelToggleBtn, this.rightFunctionalPanelCollapsed ? "chevrons-left" : "chevrons-right");
        rightPanelToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.rightFunctionalPanelCollapsed = !this.rightFunctionalPanelCollapsed;
            this.render();
        });
        if (this.viewingRecycleBin) {
            this.renderRecycleBinBanner(leftStickyStack);
        } else {
            this.renderFullInput(leftStickyStack);
        }

        const listContainer = ptrScroll.createDiv();
        listContainer.style.marginTop = "20px";
        this.renderMindDumpList(listContainer);

        const calendarRoot = rightPanelInner.createDiv({ cls: "minddump-calendar" });
        this.renderCalendar(calendarRoot);
        this.renderRightRail(rightPanelInner);

        this.setupPtr(ptrScroll, ptrIndicator);
    }

    renderSidebarLayout() {
        const container = this.contentEl.createDiv();
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.height = "100%";
        container.style.overflow = "hidden";
        container.style.position = "relative";
        container.style.padding = "8px";

        // Pull-to-refresh indicator (slides in via GPU-composited transform)
        const ptrIndicator = container.createDiv({ cls: "minddump-ptr-indicator" });
        ptrIndicator.style.position = "absolute";
        ptrIndicator.style.top = "0";
        ptrIndicator.style.left = "0";
        ptrIndicator.style.right = "0";
        ptrIndicator.style.zIndex = "2";
        ptrIndicator.style.display = "flex";
        ptrIndicator.style.alignItems = "center";
        ptrIndicator.style.justifyContent = "center";
        ptrIndicator.style.pointerEvents = "none";
        ptrIndicator.style.transform = "translateY(-100%)";
        const ptrIcon = ptrIndicator.createSpan({ cls: "minddump-ptr-icon" });
        ptrIcon.style.transition = "transform 0.2s ease";
        setIcon(ptrIcon, "arrow-down");

        // Scrollable content wrapper (GPU-composited via will-change)
        const ptrScroll = container.createDiv({ cls: "minddump-ptr-content" });
        ptrScroll.style.flex = "1";
        ptrScroll.style.overflow = "auto";
        ptrScroll.style.display = "flex";
        ptrScroll.style.flexDirection = "column";
        ptrScroll.style.gap = "12px";

        const addBtn = ptrScroll.createEl("button", {
            cls: "minddump-quick-capture-entry-btn",
            type: "button",
        });
        addBtn.textContent = "+ " + t("quickCapture", this.lang);
        addBtn.addEventListener("click", () => {
            const { CaptureModal } = require('./capture-modal');
            new CaptureModal(this.app, this.plugin).open();
        });

        this.renderSearchCompact(ptrScroll);
        const calendarRoot = ptrScroll.createDiv({ cls: "minddump-calendar" });
        this.renderCalendarCompact(calendarRoot);

        const listContainer = ptrScroll.createDiv();
        listContainer.style.marginTop = "8px";
        this.renderMindDumpList(listContainer);

        this.setupPtr(ptrScroll, ptrIndicator);
    }

    /**
     * Set up pull-to-refresh using GPU-composited transforms.
     * ptrScroll translates down to reveal ptrIndicator above it.
     * No layout-triggering properties (height/margin) are touched during the gesture.
     */
    private setupPtr(ptrScroll: HTMLElement, ptrIndicator: HTMLElement): void {
        let startY = 0;
        let pulling = false;
        let pullDist = 0;
        let refreshing = false;
        const THRESHOLD = 60;
        const DAMPING = 0.5;
        const MAX_PULL = 100;
        const INDICATOR_H = 44;

        // Wheel-based pull state (trackpad / scroll wheel)
        let wheelPull = 0;
        let wheelReleaseTimer: ReturnType<typeof setTimeout> | null = null;

        const iconEl = ptrIndicator.querySelector(".minddump-ptr-icon") as HTMLElement | null;

        const SNAP_TRANSITION = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

        /** Update both transforms at once — the only per-frame DOM writes. */
        const applyPull = (dist: number) => {
            ptrScroll.style.transform = `translateY(${dist}px)`;
            const off = dist < INDICATOR_H ? -INDICATOR_H + dist : 0;
            ptrIndicator.style.transform = `translateY(${off}px)`;
        };

        const snapBack = (instant = false) => {
            pulling = false;
            pullDist = 0;
            wheelPull = 0;
            if (instant) {
                ptrScroll.style.transition = "none";
                ptrIndicator.style.transition = "none";
                ptrScroll.style.transform = "";
                ptrIndicator.style.transform = "translateY(-100%)";
            } else {
                ptrScroll.style.transition = SNAP_TRANSITION;
                ptrIndicator.style.transition = SNAP_TRANSITION;
                ptrScroll.style.transform = "";
                ptrIndicator.style.transform = "translateY(-100%)";
            }
            if (iconEl) iconEl.style.transform = "";
        };

        const rebuildIndicatorIcon = () => {
            ptrIndicator.empty();
            const ni = ptrIndicator.createSpan({ cls: "minddump-ptr-icon" });
            ni.style.transition = "transform 0.2s ease";
            setIcon(ni, "arrow-down");
        };

        const triggerRefresh = async () => {
            refreshing = true;
            ptrScroll.style.transition = "none";
            ptrIndicator.style.transition = "none";
            applyPull(INDICATOR_H);

            ptrIndicator.empty();
            const spinner = ptrIndicator.createSpan({ cls: "minddump-ptr-spinner" });
            setIcon(spinner, "loader-2");

            try {
                await this.loadMindDumps();
                const listSection = this.contentEl.querySelector(".minddump-list-section");
                if (listSection) {
                    this.renderMindDumpList(listSection as HTMLElement);
                }
            } finally {
                refreshing = false;
                snapBack(false);
                setTimeout(rebuildIndicatorIcon, 350);
            }
        };

        const cancelPull = () => {
            if (wheelReleaseTimer) {
                clearTimeout(wheelReleaseTimer);
                wheelReleaseTimer = null;
            }
            snapBack(true);
        };

        // --- Pointer event handlers (touch / mouse) ---

        const onPointerDown = (e: PointerEvent) => {
            if (refreshing) return;
            if (ptrScroll.scrollTop > 0) return;
            if (e.pointerType === "mouse" && e.button !== 0) return;
            ptrScroll.style.transition = "none";
            ptrIndicator.style.transition = "none";
            startY = e.clientY;
            pulling = true;
            pullDist = 0;
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!pulling || refreshing) return;
            const dy = e.clientY - startY;
            if (dy <= 0 || ptrScroll.scrollTop > 0) {
                snapBack(true);
                return;
            }
            pullDist = dy * DAMPING;
            if (pullDist > MAX_PULL) pullDist = MAX_PULL;
            applyPull(pullDist);
            if (iconEl) {
                iconEl.style.transform = pullDist >= THRESHOLD ? "rotate(180deg)" : "";
            }
        };

        const onPointerUp = () => {
            if (!pulling) return;
            const dist = pullDist;
            pulling = false;

            if (dist >= THRESHOLD && !refreshing) {
                void triggerRefresh();
            } else {
                snapBack(false);
            }
            pullDist = 0;
        };

        const onPointerCancel = () => {
            if (refreshing) {
                refreshing = false;
                snapBack(false);
                setTimeout(rebuildIndicatorIcon, 350);
            } else {
                snapBack(true);
            }
        };

        // --- Wheel event handler (trackpad / scroll wheel) ---

        const scheduleWheelRelease = () => {
            if (wheelReleaseTimer) clearTimeout(wheelReleaseTimer);
            wheelReleaseTimer = setTimeout(() => {
                wheelReleaseTimer = null;
                const dist = wheelPull;
                wheelPull = 0;
                if (dist >= THRESHOLD && !refreshing) {
                    void triggerRefresh();
                } else {
                    snapBack(false);
                }
            }, 180);
        };

        const onWheel = (e: WheelEvent) => {
            if (refreshing) return;

            if (ptrScroll.scrollTop > 0) {
                if (wheelPull > 0) {
                    wheelPull = 0;
                    if (wheelReleaseTimer) {
                        clearTimeout(wheelReleaseTimer);
                        wheelReleaseTimer = null;
                    }
                    snapBack(true);
                }
                return;
            }

            if (e.deltaY < 0) {
                // Scrolling up (pulling down) — intercept
                e.preventDefault();
                ptrScroll.style.transition = "none";
                ptrIndicator.style.transition = "none";
                wheelPull += Math.abs(e.deltaY) * 0.3;
                if (wheelPull > MAX_PULL) wheelPull = MAX_PULL;
                applyPull(wheelPull);
                if (iconEl) {
                    iconEl.style.transform = wheelPull >= THRESHOLD ? "rotate(180deg)" : "";
                }
                scheduleWheelRelease();
            } else if (e.deltaY > 0 && wheelPull > 0) {
                // Scrolling down mid-pull — reduce
                wheelPull = Math.max(0, wheelPull - Math.abs(e.deltaY) * 0.3);
                if (wheelPull <= 0) {
                    if (wheelReleaseTimer) {
                        clearTimeout(wheelReleaseTimer);
                        wheelReleaseTimer = null;
                    }
                    snapBack(true);
                } else {
                    ptrScroll.style.transition = "none";
                    ptrIndicator.style.transition = "none";
                    applyPull(wheelPull);
                    scheduleWheelRelease();
                }
            }
        };

        // --- Scroll handler ---

        const onScroll = () => {
            if (ptrScroll.scrollTop > 0 && !refreshing) {
                if (wheelPull > 0) {
                    wheelPull = 0;
                    if (wheelReleaseTimer) {
                        clearTimeout(wheelReleaseTimer);
                        wheelReleaseTimer = null;
                    }
                }
                snapBack(true);
            }
        };

        // --- Attach events ---

        ptrScroll.addEventListener("pointerdown", onPointerDown, { passive: true });
        ptrScroll.addEventListener("pointermove", onPointerMove, { passive: true });
        ptrScroll.addEventListener("pointerup", onPointerUp, { passive: true });
        ptrScroll.addEventListener("pointercancel", onPointerCancel, { passive: true });
        ptrScroll.addEventListener("wheel", onWheel, { passive: false });
        ptrScroll.addEventListener("scroll", onScroll, { passive: true });

        this.ptrCleanup = () => {
            ptrScroll.removeEventListener("pointerdown", onPointerDown);
            ptrScroll.removeEventListener("pointermove", onPointerMove);
            ptrScroll.removeEventListener("pointerup", onPointerUp);
            ptrScroll.removeEventListener("pointercancel", onPointerCancel);
            ptrScroll.removeEventListener("wheel", onWheel);
            ptrScroll.removeEventListener("scroll", onScroll);
            if (wheelReleaseTimer) clearTimeout(wheelReleaseTimer);
        };
    }
    private destroyPtr() {
        if (this.ptrCleanup) {
            this.ptrCleanup();
            this.ptrCleanup = null;
        }
    }

    renderFullInput(container: HTMLElement) {
        if (this.wikilinkCleanup) {
            try {
                this.wikilinkCleanup();
            } catch {
                /* ignore */
            }
            this.wikilinkCleanup = null;
        }

        const deps = {
            app: this.app,
            lang: this.lang,
            pluginSettings: this.plugin.settings,
            getExistingTags: () => this.getExistingTags(),
        };

        const api = mountQuickComposeCard({
            mode: "capture",
            parent: container,
            deps,
            onSave: async (payload) => {
                await this.plugin.saveMindDump(
                    payload.content,
                    payload.tags,
                    payload.source,
                    payload.attachments
                );
            },
            onAfterSave: () => this.focusTextarea(),
        });

        this.inputCard = api.root;
        this.quickComposeContent = api.contentField;
        this.wikilinkCleanup = api.wikilinkCleanup;
    }

    /** Replaces the main quick-input card while viewing the recycle bin. */
    private renderRecycleBinBanner(container: HTMLElement) {
        const banner = container.createDiv({ cls: "minddump-recycle-bin-banner" });
        const main = banner.createDiv({ cls: "minddump-recycle-bin-banner__main" });
        const iconEl = main.createSpan({ cls: "minddump-recycle-bin-banner__icon" });
        setIcon(iconEl, "info");
        main.createSpan({
            cls: "minddump-recycle-bin-banner__text",
            text: t("recycleBinRetentionBanner", this.lang),
        });
        const emptyBtn = banner.createEl("button", {
            type: "button",
            cls: "minddump-recycle-bin-banner__empty",
            attr: {
                "aria-label": t("recycleBinEmptyAll", this.lang),
                title: t("recycleBinEmptyAll", this.lang),
            },
        });
        setIcon(emptyBtn, "trash");
        emptyBtn.addEventListener("click", async () => {
            const deleted = this.mindDumps.filter((j) => j.deleted);
            if (deleted.length === 0) {
                new Notice(t("recycleBinEmpty", this.lang));
                return;
            }
            if (!confirm(t("recycleBinEmptyAllConfirm", this.lang))) return;
            try {
                const n = await this.plugin.purgeAllDeletedMindDumps();
                new Notice(t("recycleBinAllPurged", this.lang, { count: String(n) }));
            } catch {
                /* purgeMindDump / purgeAll already surfaced Notice */
            }
        });
    }

    /** Right panel: all tags (collapsible) + recycle bin — main layout only */
    private renderRightRail(container: HTMLElement) {
        const rail = container.createDiv({ cls: "minddump-right-rail" });
        const tagsBlock = rail.createDiv({ cls: "minddump-right-rail-tags" });
        const tagsHead = tagsBlock.createDiv({ cls: "minddump-right-rail-tags-head" });

        const tagsHeadLeft = tagsHead.createDiv({ cls: "minddump-right-rail-tags-head-left" });
        const tagsChevron = tagsHeadLeft.createSpan({ cls: "minddump-right-rail-tags-chevron" });
        setIcon(tagsChevron, "chevron-down");
        tagsHeadLeft.createSpan({ cls: "minddump-right-rail-tags-title", text: t("rightRailAllTags", this.lang) });
        if (this.rightRailTagsCollapsed) {
            tagsChevron.addClass("is-collapsed");
            tagsBlock.addClass("is-collapsed");
        }
        tagsHeadLeft.addEventListener("mousedown", (e) => e.preventDefault());
        tagsHeadLeft.addEventListener("click", () => {
            this.rightRailTagsCollapsed = !this.rightRailTagsCollapsed;
            tagsBlock.toggleClass("is-collapsed", this.rightRailTagsCollapsed);
            tagsChevron.toggleClass("is-collapsed", this.rightRailTagsCollapsed);
        });

        const tagsHeadActions = tagsHead.createDiv({ cls: "minddump-right-rail-tags-head-actions" });
        const sortLabel = tagsHeadActions.createSpan({ cls: "minddump-right-rail-tags-sort", text: t("rightRailTagSort", this.lang) });
        const searchBtn = tagsHeadActions.createSpan({ cls: "minddump-right-rail-tags-search-btn" });
        setIcon(searchBtn, "search");
        sortLabel.addEventListener("mousedown", (e) => e.preventDefault());
        sortLabel.addEventListener("click", (e) => {
            e.stopPropagation();
            const menu = new Menu();
            const sortOptions: { id: RightRailTagSort; labelKey: keyof Translations }[] = [
                { id: "nameAsc", labelKey: "rightRailTagSortNameAsc" },
                { id: "nameDesc", labelKey: "rightRailTagSortNameDesc" },
                { id: "countDesc", labelKey: "rightRailTagSortCountDesc" },
                { id: "countAsc", labelKey: "rightRailTagSortCountAsc" },
            ];
            for (const { id, labelKey } of sortOptions) {
                menu.addItem((item) => {
                    item.setTitle(t(labelKey, this.lang));
                    item.setChecked(this.rightRailTagSort === id);
                    item.onClick(() => {
                        this.rightRailTagSort = id;
                        this.render();
                    });
                });
            }
            const ev = e as unknown as MouseEvent;
            menu.showAtMouseEvent(ev);
        });
        searchBtn.addEventListener("mousedown", (e) => e.preventDefault());
        searchBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const body = tagsBlock.querySelector(".minddump-right-rail-tags-body") as HTMLElement | null;
            const input = body?.querySelector(".minddump-right-rail-tags-filter-input") as HTMLInputElement | null;
            input?.focus();
            input?.select();
        });

        const tagsBody = tagsBlock.createDiv({ cls: "minddump-right-rail-tags-body" });
        const filterWrap = tagsBody.createDiv({ cls: "minddump-right-rail-tags-filter" });
        const filterInput = filterWrap.createEl("input", {
            type: "search",
            cls: "minddump-right-rail-tags-filter-input",
            attr: { placeholder: t("rightRailTagFilterPlaceholder", this.lang) },
        });
        filterInput.value = this.rightRailTagListQuery;
        filterInput.addEventListener("pointerdown", (e) => e.stopPropagation());
        filterInput.addEventListener("input", () => {
            this.rightRailTagListQuery = filterInput.value;
            if (this.debouncedRender) this.debouncedRender();
        });

        const tagsList = tagsBody.createDiv({ cls: "minddump-right-rail-tag-list" });
        for (const { tag } of this.getRightRailTagEntries()) {
            const row = tagsList.createDiv({ cls: "minddump-right-rail-row minddump-right-rail-row--tag" });
            row.createSpan({ cls: "minddump-right-rail-row-hash", text: "#" });
            row.createSpan({ cls: "minddump-right-rail-row-label", text: tag });
            if (this.selectedTags.has(tag)) row.addClass("is-selected");
            row.addEventListener("click", () => {
                this.viewingRecycleBin = false;
                if (this.selectedTags.has(tag)) this.selectedTags.delete(tag);
                else this.selectedTags.add(tag);
                this.render();
            });
        }

        const binRow = rail.createDiv({ cls: "minddump-right-rail-row minddump-right-rail-row--bin" });
        if (this.viewingRecycleBin) binRow.addClass("is-active");
        const binIcon = binRow.createSpan({ cls: "minddump-right-rail-row-icon" });
        setIcon(binIcon, "trash-2");
        binRow.createSpan({ cls: "minddump-right-rail-row-label", text: t("rightRailRecycleBin", this.lang) });
        binRow.addEventListener("click", () => {
            this.viewingRecycleBin = !this.viewingRecycleBin;
            if (this.viewingRecycleBin) this.selectedTags.clear();
            this.render();
        });
    }

    /** YYYY-MM-DD from mindDump timestamp fields */
    private mindDumpDateKey(ts: string): string | null {
        if (!ts?.trim()) return null;
        const full = moment(ts, "YYYY-MM-DD HH:mm:ss", true);
        if (full.isValid()) return full.format("YYYY-MM-DD");
        const day = moment(ts, "YYYY-MM-DD", true);
        if (day.isValid()) return day.format("YYYY-MM-DD");
        const loose = moment(ts);
        if (loose.isValid()) return loose.format("YYYY-MM-DD");
        const prefix = ts.match(/^(\d{4}-\d{2}-\d{2})/);
        return prefix ? prefix[1] : null;
    }

    /** Columns in the activity heatmap (one column = one week). Kept modest so cells stay readable in the sidebar. */
    private static readonly CONTRIB_WEEKS = 8;

    private heatLevel(score: number, maxScore: number): number {
        if (score <= 0 || maxScore <= 0) return 0;
        const t = score / maxScore;
        if (t <= 0.25) return 1;
        if (t <= 0.5) return 2;
        if (t <= 0.75) return 3;
        return 4;
    }

    /** Sunday (local) start-of-week; use English locale so week starts on Sunday regardless of global moment locale */
    private startOfWeekSunday(m: moment.Moment): moment.Moment {
        const d = m.clone().locale("en").startOf("day");
        return d.subtract(d.day(), "days");
    }

    /** Per-day create+update event counts and unique mindDumps (all time, non-deleted) */
    private buildHeatCellMap(): Map<string, HeatDayCell> {
        const raw = new Map<string, { activityScore: number; byId: Map<string, MindDump> }>();
        const bump = (dateKey: string, mindDump: MindDump) => {
            let e = raw.get(dateKey);
            if (!e) {
                e = { activityScore: 0, byId: new Map<string, MindDump>() };
                raw.set(dateKey, e);
            }
            e.activityScore++;
            e.byId.set(mindDump.id, mindDump);
        };
        for (const mindDump of this.mindDumps) {
            if (mindDump.deleted) continue;
            const c =
                this.mindDumpDateKey(mindDump.createdAt) ??
                (/^\d{4}-\d{2}-\d{2}$/.test(mindDump.date) ? mindDump.date : null);
            const u = this.mindDumpDateKey(mindDump.updatedAt);
            if (c) bump(c, mindDump);
            if (u) bump(u, mindDump);
        }
        const out = new Map<string, HeatDayCell>();
        for (const [k, v] of raw) {
            out.set(k, { activityScore: v.activityScore, mindDumps: Array.from(v.byId.values()) });
        }
        return out;
    }

    private heatmapHeaderCounts(heat: Map<string, HeatDayCell>): { notes: number; tags: number; activeDays: number } {
        const active = this.mindDumps.filter((j) => !j.deleted);
        const tagSet = new Set<string>();
        for (const mindDump of active) {
            for (const tag of mindDump.tags) {
                const s = tag?.trim();
                if (s) tagSet.add(s);
            }
        }
        let activeDays = 0;
        for (const [, cell] of heat) {
            if (cell.activityScore > 0) activeDays++;
        }
        return { notes: active.length, tags: tagSet.size, activeDays };
    }

    renderCalendar(container: HTMLElement) {
        container.empty();
        const section = container.createDiv({ cls: "minddump-contrib-section" });
        this.renderContributionHeatmap(section, false);
    }

    renderCalendarCompact(container: HTMLElement) {
        container.empty();
        const section = container.createDiv({ cls: "minddump-contrib-section" });
        this.renderContributionHeatmap(section, true);
    }

    private renderContributionHeatmap(section: HTMLElement, compact: boolean) {
        if (compact) section.addClass("minddump-contrib-section--compact");
        section.style.setProperty("--contrib-weeks", String(MindDumpView.CONTRIB_WEEKS));
        const heatCells = this.buildHeatCellMap();
        const { notes, tags, activeDays } = this.heatmapHeaderCounts(heatCells);
        const tr = translations[this.lang];

        const header = section.createDiv({ cls: "minddump-contrib-stats" });
        const mkStat = (value: number, label: string) => {
            const col = header.createDiv({ cls: "minddump-contrib-stat" });
            col.createDiv({ cls: "minddump-contrib-stat-value", text: String(value) });
            col.createDiv({ cls: "minddump-contrib-stat-label", text: label });
        };
        mkStat(notes, t("heatmapStatNotes", this.lang));
        mkStat(tags, t("heatmapStatTags", this.lang));
        mkStat(activeDays, t("heatmapStatActiveDays", this.lang));

        const today = moment().locale("en").startOf("day");
        const gridEndSunday = this.startOfWeekSunday(today);
        const gridStartSunday = gridEndSunday.clone().subtract(MindDumpView.CONTRIB_WEEKS - 1, "weeks");

        let maxScore = 0;
        for (let w = 0; w < MindDumpView.CONTRIB_WEEKS; w++) {
            for (let r = 0; r < 7; r++) {
                const dayMoment = gridStartSunday.clone().add(w * 7 + r, "days");
                if (dayMoment.isAfter(today, "day")) continue;
                const key = dayMoment.format("YYYY-MM-DD");
                maxScore = Math.max(maxScore, heatCells.get(key)?.activityScore ?? 0);
            }
        }
        if (maxScore < 1) maxScore = 1;

        const gridWrap = section.createDiv({ cls: "minddump-contrib-grid-wrap" });
        const grid = gridWrap.createDiv({
            cls: "minddump-contrib-grid" + (compact ? " minddump-contrib-grid--compact" : ""),
        });

        for (let w = 0; w < MindDumpView.CONTRIB_WEEKS; w++) {
            for (let r = 0; r < 7; r++) {
                const dayMoment = gridStartSunday.clone().add(w * 7 + r, "days");
                const dateStr = dayMoment.format("YYYY-MM-DD");
                const isFuture = dayMoment.isAfter(today, "day");
                const isToday = dayMoment.isSame(today, "day");
                const cell = heatCells.get(dateStr);
                const score = isFuture ? 0 : cell?.activityScore ?? 0;
                const level = isFuture ? 0 : this.heatLevel(score, maxScore);
                const hasActivity = !isFuture && score > 0;
                const noteCount = cell?.mindDumps.length ?? 0;

                const dayDiv = grid.createDiv({ cls: "minddump-contrib-cell" });
                dayDiv.addClass(`minddump-contrib-l${level}`);
                if (isFuture) dayDiv.addClass("minddump-contrib-cell--future");
                if (isToday) dayDiv.addClass("minddump-contrib-cell--today");

                const loc = this.lang === "zh" ? "zh-cn" : "en";
                const dateTitle = dayMoment.clone().locale(loc).format("LL");
                if (compact) {
                    if (!isFuture) dayDiv.setAttr("aria-label", dateTitle);
                    else dayDiv.setAttr("aria-hidden", "true");
                }
                /* Compact sidebar: color-only cells (no day digits) to avoid truncation; full width uses tooltip + month row. */
                if (!compact) {
                    dayDiv.createSpan({
                        cls: "minddump-contrib-cell-date",
                        text: String(dayMoment.date()),
                        attr: { "aria-hidden": "true" },
                    });
                }

                if (hasActivity) {
                    dayDiv.title = t("heatmapTooltip", this.lang, {
                        date: dateTitle,
                        notes: String(noteCount),
                        events: String(score),
                    });
                    dayDiv.style.cursor = "pointer";
                    dayDiv.addEventListener("click", () => {
                        this.filterByActivityDate(dateStr);
                    });
                } else {
                    dayDiv.title = isFuture ? "" : dateTitle;
                    dayDiv.style.cursor = "default";
                }
            }
        }

        const monthNames = tr.heatmapMonthShort;
        const monthsRow = section.createDiv({
            cls: "minddump-contrib-months" + (compact ? " minddump-contrib-months--compact" : ""),
        });
        let lastMonth = -1;
        for (let w = 0; w < MindDumpView.CONTRIB_WEEKS; w++) {
            const weekStart = gridStartSunday.clone().add(w * 7, "days");
            /* Week straddling two months: weekStart is Sunday, so label by Thursday's month
             * so the trailing month (e.g. April when Sun–Mon are still March) still shows. */
            const m = weekStart.clone().add(4, "days").month();
            const cell = monthsRow.createDiv({ cls: "minddump-contrib-month-cell" });
            if (m !== lastMonth) {
                const label =
                    compact && this.lang === "zh"
                        ? `${m + 1}月`
                        : monthNames[m] ?? String(m + 1);
                cell.setText(label);
                lastMonth = m;
            }
        }
    }

    filterByActivityDate(date: string) {
        this.searchTimePreset = "none";
        this.searchQuery = `activity:${date}`;
        this.updateSearchAndFilter();
    }

    private stripDateActivityFromSearchQuery() {
        const parts = this.searchQuery.trim().split(/\s+/).filter(Boolean);
        const kept = parts.filter((p) => {
            const low = p.toLowerCase();
            return !low.startsWith("date:") && !low.startsWith("activity:");
        });
        this.searchQuery = kept.join(" ");
    }

    private mindDumpMatchesTimePreset(mindDump: MindDump): boolean {
        if (this.searchTimePreset === "none" || this.searchTimePreset === "custom") return true;
        const d = moment(mindDump.date, "YYYY-MM-DD", true);
        if (!d.isValid()) return false;
        const today = moment().startOf("day");
        switch (this.searchTimePreset) {
            case "onThisDay":
                return d.date() === today.date() && d.month() === today.month();
            case "thisMonth":
                return d.year() === today.year() && d.month() === today.month();
            case "lastMonth": {
                const lm = today.clone().subtract(1, "month");
                return d.year() === lm.year() && d.month() === lm.month();
            }
            case "last7": {
                const start7 = today.clone().subtract(6, "days");
                return d.isSameOrAfter(start7, "day") && d.isSameOrBefore(today, "day");
            }
            case "last30": {
                const start30 = today.clone().subtract(29, "days");
                return d.isSameOrAfter(start30, "day") && d.isSameOrBefore(today, "day");
            }
            default:
                return true;
        }
    }

    private mindDumpHasImageContent(mindDump: MindDump): boolean {
        if (mindDump.attachmentTypes?.includes("image")) return true;
        const re = /!\[\[([^\]]+)\]\]/g;
        let m: RegExpExecArray | null;
        while ((m = re.exec(mindDump.content)) != null) {
            if (VAULT_IMAGE_EXT.test(m[1].trim())) return true;
        }
        for (const p of mindDump.attachments ?? []) {
            if (VAULT_IMAGE_EXT.test(p)) return true;
        }
        return false;
    }

    private mindDumpHasLinkContent(mindDump: MindDump): boolean {
        if (/https?:\/\//i.test(mindDump.content)) return true;
        if (/\[\[[^\]]+\]\]/.test(mindDump.content)) return true;
        return false;
    }

    private mindDumpHasAudioContent(mindDump: MindDump): boolean {
        if (AUDIO_EXT_RE.test(mindDump.content) || AUDIO_EXT_RE.test(mindDump.fullText)) return true;
        for (const p of mindDump.attachments ?? []) {
            if (AUDIO_EXT_RE.test(p)) return true;
        }
        const re = /!\[\[([^\]]+)\]\]/g;
        let m: RegExpExecArray | null;
        while ((m = re.exec(mindDump.content)) != null) {
            if (AUDIO_EXT_RE.test(m[1])) return true;
        }
        return false;
    }

    private mindDumpMatchesContentFilters(mindDump: MindDump): boolean {
        if (this.contentTypeFilters.size === 0) return true;
        for (const f of this.contentTypeFilters) {
            if (f === "image" && this.mindDumpHasImageContent(mindDump)) return true;
            if (f === "link" && this.mindDumpHasLinkContent(mindDump)) return true;
            if (f === "audio" && this.mindDumpHasAudioContent(mindDump)) return true;
        }
        return false;
    }

    private mindDumpListSortCompare(a: MindDump, b: MindDump): number {
        const parseTs = (s: string) => moment(s, "YYYY-MM-DD HH:mm:ss").valueOf();
        switch (this.mindDumpListSort) {
            case "createdDesc":
                return parseTs(b.createdAt) - parseTs(a.createdAt);
            case "createdAsc":
                return parseTs(a.createdAt) - parseTs(b.createdAt);
            case "updatedDesc":
                return parseTs(b.updatedAt) - parseTs(a.updatedAt);
            case "updatedAsc":
                return parseTs(a.updatedAt) - parseTs(b.updatedAt);
        }
    }

    renderSearch(container: HTMLElement) {
        this.renderSearchFilterBar(container, false);
    }

    renderSearchCompact(container: HTMLElement) {
        this.renderSearchFilterBar(container, true);
    }

    private renderSearchFilterBar(container: HTMLElement, compact: boolean) {
        const stack = container.createDiv({ cls: `minddump-search-stack${compact ? " minddump-search-stack--compact" : ""}` });

        const pillWrap = stack.createDiv({ cls: "minddump-search-pill-wrap" });

        const sortBtn = pillWrap.createEl("button", {
            type: "button",
            cls: "minddump-search-sort-btn",
            attr: {
                "aria-label": t("mindDumpListSortButton", this.lang),
                title: t("mindDumpListSortButton", this.lang),
            },
        });
        setIcon(sortBtn, "arrow-up-down");
        sortBtn.addEventListener("mousedown", (e) => e.preventDefault());
        sortBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const menu = new Menu();
            const sortOptions: { id: MindDumpListSort; labelKey: keyof Translations }[] = [
                { id: "createdDesc", labelKey: "mindDumpListSortCreatedDesc" },
                { id: "createdAsc", labelKey: "mindDumpListSortCreatedAsc" },
                { id: "updatedDesc", labelKey: "mindDumpListSortUpdatedDesc" },
                { id: "updatedAsc", labelKey: "mindDumpListSortUpdatedAsc" },
            ];
            for (const { id, labelKey } of sortOptions) {
                menu.addItem((item) => {
                    item.setTitle(t(labelKey, this.lang));
                    item.setChecked(this.mindDumpListSort === id);
                    item.onClick(() => {
                        this.mindDumpListSort = id;
                        this.updateSearchAndFilter();
                    });
                });
            }
            menu.showAtMouseEvent(e as unknown as MouseEvent);
        });

        this.searchContainer = pillWrap.createDiv({ cls: "minddump-search-pill" });
        this.searchContainer.style.position = "relative";

        const iconEl = this.searchContainer.createSpan({ cls: "minddump-search-pill-icon" });
        setIcon(iconEl, "search");

        const searchInput = this.searchContainer.createEl("input", { cls: "minddump-search-pill-input" });
        searchInput.type = "text";
        searchInput.placeholder = compact ? t("searchPillPlaceholder", this.lang) : t("searchPillPlaceholder", this.lang);
        searchInput.setAttribute("aria-label", t("searchPlaceholder", this.lang));
        searchInput.setAttribute("title", t("searchPlaceholder", this.lang));
        searchInput.value = this.searchQuery;
        this.searchInput = searchInput;

        this.searchContainer.addEventListener("mousedown", (e) => {
            const t = e.target as Node;
            if (t === searchInput) return;
            const clearEl = this.searchContainer?.querySelector(".search-clear-container");
            if (clearEl && (t === clearEl || clearEl.contains(t))) {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            searchInput.focus({ preventScroll: true });
        });

        searchInput.addEventListener("input", (e) => {
            const query = (e.target as HTMLInputElement).value;
            const parsed = this.parseSearchFilters(query);
            if (parsed.date || parsed.activity) {
                this.searchTimePreset = "none";
            }
            this.debouncedSearch(query);
        });

        this.updateClearButton();

        const panel = stack.createDiv({ cls: "minddump-search-panel" });

        const timeGrid = panel.createDiv({ cls: "minddump-search-time-grid" });
        const timePresets: { key: SearchTimePreset; labelKey: keyof Translations }[] = [
            { key: "onThisDay", labelKey: "timePresetOnThisDay" },
            { key: "thisMonth", labelKey: "timePresetThisMonth" },
            { key: "lastMonth", labelKey: "timePresetLastMonth" },
            { key: "last7", labelKey: "timePresetLast7" },
            { key: "last30", labelKey: "timePresetLast30" },
            { key: "custom", labelKey: "timePresetCustom" },
        ];
        const timeButtons: { el: HTMLButtonElement; key: SearchTimePreset }[] = [];
        for (const { key, labelKey } of timePresets) {
            const btn = timeGrid.createEl("button", { type: "button", cls: "minddump-filter-chip" });
            btn.textContent = t(labelKey, this.lang);
            if (this.searchTimePreset === key) btn.addClass("is-active");
            btn.addEventListener("click", () => {
                this.viewingRecycleBin = false;
                this.searchTimePreset = key;
                if (key !== "custom" && key !== "none") {
                    this.stripDateActivityFromSearchQuery();
                }
                if (this.searchInput) this.searchInput.value = this.searchQuery;
                timeButtons.forEach(({ el, key: k }) => el.toggleClass("is-active", this.searchTimePreset === k));
                this.updateSearchAndFilter();
            });
            timeButtons.push({ el: btn, key });
        }

        const tagsSection = panel.createDiv({ cls: "minddump-search-section" });
        const tagsHead = tagsSection.createDiv({ cls: "minddump-search-section-head" });
        tagsHead.createSpan({ cls: "minddump-search-section-title", text: t("searchFilterTagsHeading", this.lang) });
        const tagsChevron = tagsHead.createSpan({ cls: "minddump-search-section-chevron" });
        setIcon(tagsChevron, "chevron-down");
        if (this.searchTagsSectionCollapsed) {
            tagsChevron.addClass("is-collapsed");
            tagsSection.addClass("is-collapsed");
        }
        tagsHead.addEventListener("mousedown", (e) => e.preventDefault());
        tagsHead.addEventListener("click", () => {
            this.searchTagsSectionCollapsed = !this.searchTagsSectionCollapsed;
            tagsSection.toggleClass("is-collapsed", this.searchTagsSectionCollapsed);
            tagsChevron.toggleClass("is-collapsed", this.searchTagsSectionCollapsed);
        });

        const tagsBody = tagsSection.createDiv({ cls: "minddump-search-section-body" });
        const tagModeRow = tagsBody.createDiv({ cls: "minddump-search-chip-row" });
        const tagFilter = tagsBody.createDiv({ cls: "minddump-search-tag-chips" });
        tagFilter.addEventListener("mousedown", (e) => e.preventDefault());
        tagFilter.toggleClass("is-hidden", this.tagMatchMode === "noTags");
        const tagModes: { mode: TagMatchMode; labelKey: keyof Translations }[] = [
            { mode: "include", labelKey: "tagModeInclude" },
            { mode: "exclude", labelKey: "tagModeExclude" },
            { mode: "noTags", labelKey: "tagModeNoTags" },
        ];
        const tagModeButtons: { el: HTMLButtonElement; mode: TagMatchMode }[] = [];
        for (const { mode, labelKey } of tagModes) {
            const btn = tagModeRow.createEl("button", { type: "button", cls: "minddump-filter-chip" });
            btn.textContent = t(labelKey, this.lang);
            if (this.tagMatchMode === mode) btn.addClass("is-active");
            btn.addEventListener("click", () => {
                this.viewingRecycleBin = false;
                this.tagMatchMode = mode;
                tagModeButtons.forEach(({ el, mode: m }) => el.toggleClass("is-active", this.tagMatchMode === m));
                tagFilter.toggleClass("is-hidden", this.tagMatchMode === "noTags");
                const listSection = this.contentEl.querySelector(".minddump-list-section");
                if (listSection) this.renderMindDumpList(listSection as HTMLElement);
            });
            tagModeButtons.push({ el: btn, mode });
        }

        const allTagsList = compact ? this.getAllTags().slice(0, 8) : this.getAllTags();
        allTagsList.forEach((tag) => {
            const tagBtn = tagFilter.createSpan({ cls: "minddump-search-tag-chip" });
            tagBtn.textContent = `#${tag}`;
            if (this.selectedTags.has(tag)) tagBtn.addClass("is-selected");
            tagBtn.addEventListener("click", () => {
                this.viewingRecycleBin = false;
                if (this.selectedTags.has(tag)) this.selectedTags.delete(tag);
                else this.selectedTags.add(tag);
                tagBtn.toggleClass("is-selected", this.selectedTags.has(tag));
                const listSection = this.contentEl.querySelector(".minddump-list-section");
                if (listSection) this.renderMindDumpList(listSection as HTMLElement);
            });
        });

        if (compact) {
            const allTagsCount = this.getAllTags().length;
            if (allTagsCount > 8) {
                const moreHint = tagsBody.createDiv({ cls: "minddump-search-more-tags" });
                moreHint.textContent = t("moreTags", this.lang, { count: String(allTagsCount - 8) });
            }
        }

        const contentSection = panel.createDiv({ cls: "minddump-search-section" });
        const contentHead = contentSection.createDiv({ cls: "minddump-search-section-head" });
        contentHead.createSpan({ cls: "minddump-search-section-title", text: t("searchFilterContentHeading", this.lang) });
        const contentChevron = contentHead.createSpan({ cls: "minddump-search-section-chevron" });
        setIcon(contentChevron, "chevron-down");
        if (this.searchContentSectionCollapsed) {
            contentChevron.addClass("is-collapsed");
            contentSection.addClass("is-collapsed");
        }
        contentHead.addEventListener("mousedown", (e) => e.preventDefault());
        contentHead.addEventListener("click", () => {
            this.searchContentSectionCollapsed = !this.searchContentSectionCollapsed;
            contentSection.toggleClass("is-collapsed", this.searchContentSectionCollapsed);
            contentChevron.toggleClass("is-collapsed", this.searchContentSectionCollapsed);
        });

        const contentBody = contentSection.createDiv({ cls: "minddump-search-section-body" });
        const contentRow = contentBody.createDiv({ cls: "minddump-search-chip-row" });
        const contentDefs: { key: ContentTypeFilter; labelKey: keyof Translations }[] = [
            { key: "image", labelKey: "contentTypeImage" },
            { key: "link", labelKey: "contentTypeLink" },
            { key: "audio", labelKey: "contentTypeAudio" },
        ];
        for (const { key, labelKey } of contentDefs) {
            const btn = contentRow.createEl("button", { type: "button", cls: "minddump-filter-chip" });
            btn.textContent = t(labelKey, this.lang);
            if (this.contentTypeFilters.has(key)) btn.addClass("is-active");
            btn.addEventListener("click", () => {
                this.viewingRecycleBin = false;
                if (this.contentTypeFilters.has(key)) this.contentTypeFilters.delete(key);
                else this.contentTypeFilters.add(key);
                btn.toggleClass("is-active", this.contentTypeFilters.has(key));
                const listSection = this.contentEl.querySelector(".minddump-list-section");
                if (listSection) this.renderMindDumpList(listSection as HTMLElement);
            });
        }
    }

    /** Tags for right rail: usage counts, optional text filter, user-chosen sort */
    private getRightRailTagEntries(): { tag: string; count: number }[] {
        const counts = new Map<string, number>();
        for (const mindDump of this.mindDumps) {
            if (mindDump.deleted) continue;
            for (const tag of mindDump.tags) {
                counts.set(tag, (counts.get(tag) ?? 0) + 1);
            }
        }
        let entries = Array.from(counts.entries()).map(([tag, count]) => ({ tag, count }));
        const q = this.rightRailTagListQuery.trim().toLowerCase();
        if (q) {
            entries = entries.filter((e) => e.tag.toLowerCase().includes(q));
        }
        const loc = this.lang === "zh" ? "zh" : "en";
        const byName = (a: { tag: string }, b: { tag: string }) => a.tag.localeCompare(b.tag, loc);
        switch (this.rightRailTagSort) {
            case "nameDesc":
                entries.sort((a, b) => b.tag.localeCompare(a.tag, loc));
                break;
            case "countDesc":
                entries.sort((a, b) => b.count - a.count || byName(a, b));
                break;
            case "countAsc":
                entries.sort((a, b) => a.count - b.count || byName(a, b));
                break;
            case "nameAsc":
            default:
                entries.sort(byName);
                break;
        }
        return entries;
    }

    getAllTags(): string[] {
        const tags = new Set<string>();
        for (const mindDump of this.mindDumps) {
            if (mindDump.deleted) continue;
            mindDump.tags.forEach((tag) => tags.add(tag));
        }
        return Array.from(tags).sort((a, b) => a.localeCompare(b, this.lang === "zh" ? "zh" : "en"));
    }

    renderMindDumpList(container: HTMLElement) {
        container.empty();
        container.addClass("minddump-list-section");

        // 清理所有渲染的组件
        this.renderedComponents.forEach(comp => {
            try {
                comp.unload();
            } catch (e) {
                console.error("Error unloading component:", e);
            }
        });
        this.renderedComponents = [];

        this.mindDumpListCleanups.forEach((fn) => {
            try {
                fn();
            } catch {
                /* ignore */
            }
        });
        this.mindDumpListCleanups = [];
        this.closeCardMenu();

        let filteredMindDumps = [...this.filterMindDumps()].sort((a, b) => this.mindDumpListSortCompare(a, b));

        if (filteredMindDumps.length === 0) {
            const empty = container.createDiv();
            empty.textContent = this.viewingRecycleBin ? t("recycleBinEmpty", this.lang) : t("noRecords", this.lang);
            empty.style.textAlign = "center";
            empty.style.padding = "40px";
            empty.style.color = "var(--text-muted)";
            empty.style.fontSize = "13px";
            return;
        }

        const searchKeywords =
            this.searchQuery.trim().length > 0 ? this.parseSearchFilters(this.searchQuery).keywords : [];

        const groupedByDate = new Map<string, MindDump[]>();
        filteredMindDumps.forEach(mindDump => {
            if (!groupedByDate.has(mindDump.date)) {
                groupedByDate.set(mindDump.date, []);
            }
            groupedByDate.get(mindDump.date)!.push(mindDump);
        });

        for (const [date, mindDumps] of groupedByDate) {
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

            mindDumps.forEach(mindDump => {
                const card = dateGroup.createDiv();
                card.style.backgroundColor = "var(--background-secondary)";
                card.style.borderRadius = "8px";
                card.style.padding = "10px 12px";
                card.style.marginBottom = "8px";
                card.style.transition = "all 0.2s";
                card.style.border = "1px solid var(--background-modifier-border)";
                if (mindDump.deleted) card.addClass("minddump-card--in-trash");

                if (this.editingMindDumpId === mindDump.id) {
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
                    metaRow.createSpan({ text: mindDump.time });
                    const updSpan = metaRow.createSpan();
                    updSpan.textContent = `${t("mindDumpUpdatedAt", this.lang)}: ${mindDump.updatedAt}`;
                    updSpan.style.color = "var(--text-normal)";
                    updSpan.style.fontWeight = "600";

                    const initialAttachments = (mindDump.attachments ?? []).map((path, i) => ({
                        path,
                        type: (mindDump.attachmentTypes?.[i] ?? "file") as "image" | "file",
                    }));

                    const editApi = mountQuickComposeCard({
                        mode: "edit",
                        parent: card,
                        deps: {
                            app: this.app,
                            lang: this.lang,
                            pluginSettings: this.plugin.settings,
                            getExistingTags: () => this.getExistingTags(),
                        },
                        initial: {
                            content: mindDump.content,
                            tags: [...mindDump.tags],
                            source: mindDump.source,
                            attachments: initialAttachments,
                        },
                        onSave: async (payload) => {
                            const prevId = this.editingMindDumpId;
                            this.editingMindDumpId = null;
                            try {
                                await this.plugin.updateMindDump({
                                    ...mindDump,
                                    content: payload.content.trim(),
                                    tags: normalizeMindDumpTags(payload.tags),
                                    source: payload.source.trim(),
                                    attachments: payload.attachments.map((a) => a.path),
                                    attachmentTypes: payload.attachments.map((a) => a.type),
                                });
                                new Notice(t("saved", this.lang));
                            } catch {
                                this.editingMindDumpId = prevId;
                                const listSection = this.contentEl.querySelector(".minddump-list-section");
                                if (listSection) {
                                    this.renderMindDumpList(listSection as HTMLElement);
                                }
                            }
                        },
                        onCancel: () => this.exitEditMode(),
                    });
                    if (editApi.wikilinkCleanup) {
                        this.mindDumpListCleanups.push(editApi.wikilinkCleanup);
                    }
                    editApi.focusTextarea();
                    return;
                }

                this.attachCardTapAndLongPress(card, mindDump);
                card.addEventListener("mouseenter", () => {
                    card.style.borderColor = "var(--interactive-accent)";
                    card.style.transform = "translateY(-1px)";
                });
                card.addEventListener("mouseleave", () => {
                    card.style.borderColor = "var(--background-modifier-border)";
                    card.style.transform = "translateY(0)";
                });

                const metaRow = card.createDiv({ cls: "minddump-card-meta-row" });
                const metaLeft = metaRow.createDiv({ cls: "minddump-card-meta-left" });
                metaLeft.createSpan({ cls: "minddump-card-meta-time", text: mindDump.time });
                const updLabel = metaLeft.createSpan({ cls: "minddump-card-meta-upd" });
                updLabel.textContent = `${t("mindDumpUpdatedAt", this.lang)}: ${mindDump.updatedAt}`;

                const menuTrigger = metaRow.createEl("button", {
                    cls: "minddump-card-menu-trigger",
                    type: "button",
                    attr: { "aria-label": t("cardMenuMore", this.lang) }
                });
                setIcon(menuTrigger, "more-horizontal");
                const stopCard = (ev: Event) => ev.stopPropagation();
                menuTrigger.addEventListener("pointerdown", stopCard);
                menuTrigger.addEventListener("pointerup", stopCard);
                menuTrigger.addEventListener("click", (ev) => {
                    stopCard(ev);
                    const openMenu = this.contentEl.doc.body.querySelector<HTMLElement>(".minddump-card-menu-popover");
                    if (openMenu?.dataset.anchorId === mindDump.id) {
                        this.closeCardMenu();
                        return;
                    }
                    this.openCardMenu(menuTrigger, mindDump);
                });

                const contentContainer = card.createDiv();
                contentContainer.style.marginBottom = "6px";
                contentContainer.style.whiteSpace = "normal";
                contentContainer.style.wordBreak = "break-word";
                contentContainer.style.overflowWrap = "break-word";
                contentContainer.addClass("minddump-card-content");

                const component = new Component();
                this.renderedComponents.push(component);

                // 修复：传入实际的源文件路径
                const sourcePath = mindDump.filePath || "";
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

                    contentContainer.querySelectorAll("img").forEach((el) => {
                        if (!(el instanceof HTMLImageElement)) return;
                        this.wireCardImageZoom(el);
                    });

                    if (searchKeywords.length > 0) {
                        highlightMarkdownContent(contentContainer, searchKeywords);
                    }
                };
                void Promise.resolve(MarkdownRenderer.renderMarkdown(
                    mindDump.content,
                    contentContainer,
                    sourcePath,
                    component
                )).then(wireRenderedContent);

                // Standalone `![[path]]` lines are parsed into `attachments`, not `content`; show images here.
                const attachmentImageRow = card.createDiv({ cls: "minddump-card-attachment-images" });
                mindDump.attachments?.forEach((attachment, idx) => {
                    const attType = mindDump.attachmentTypes?.[idx];
                    const pathLooksImage = VAULT_IMAGE_EXT.test(attachment);
                    if (attType === "file" || (attType !== "image" && !pathLooksImage)) return;
                    const vaultPath = normalizePath(attachment);
                    const af = this.app.vault.getAbstractFileByPath(vaultPath);
                    if (af instanceof TFile && VAULT_IMAGE_EXT.test(af.path)) {
                        const thumb = attachmentImageRow.createDiv({ cls: "minddump-card-attachment-thumb" });
                        const img = thumb.createEl("img", { cls: "minddump-card-attachment-img" });
                        img.src = this.app.vault.getResourcePath(af);
                        img.alt = af.name;
                        img.loading = "lazy";
                        this.wireCardImageZoom(img);
                    } else {
                        const miss = attachmentImageRow.createDiv({ cls: "minddump-card-attachment-missing" });
                        miss.textContent = `🖼️ ${attachment}`;
                    }
                });
                if (attachmentImageRow.childElementCount === 0) {
                    attachmentImageRow.remove();
                }

                const tagsDiv = card.createDiv();
                tagsDiv.style.display = "flex";
                tagsDiv.style.flexWrap = "wrap";
                tagsDiv.style.gap = "4px";
                tagsDiv.style.marginBottom = "4px";

                mindDump.tags.forEach(tag => {
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

                if (mindDump.source && mindDump.source.trim()) {
                    const sourceDiv = card.createDiv();
                    sourceDiv.textContent = mindDump.source;
                    sourceDiv.style.fontSize = "10px";
                    sourceDiv.style.color = "var(--text-muted)";
                    sourceDiv.style.fontStyle = "italic";
                    sourceDiv.style.marginTop = "4px";
                }

                if (mindDump.attachments && mindDump.attachments.length > 0) {
                    let firstFileLine = true;
                    mindDump.attachments.forEach((attachment, idx) => {
                        const attType = mindDump.attachmentTypes?.[idx];
                        const pathLooksImage = VAULT_IMAGE_EXT.test(attachment);
                        if (attType === "image" || (attType !== "file" && pathLooksImage)) return;
                        const attachmentDiv = card.createDiv();
                        attachmentDiv.textContent = `📎 ${attachment}`;
                        attachmentDiv.style.fontSize = "10px";
                        attachmentDiv.style.color = "var(--text-muted)";
                        attachmentDiv.style.marginTop = firstFileLine ? "4px" : "2px";
                        firstFileLine = false;
                    });
                }
            });
        }
    }

    filterMindDumps(): MindDump[] {
        if (this.viewingRecycleBin) {
            return this.mindDumps.filter((j) => j.deleted);
        }
        let filtered = this.mindDumps.filter((j) => !j.deleted);
        const { date, updated, activity, keywords } = this.parseSearchFilters(this.searchQuery);

        if (date) {
            filtered = filtered.filter((mindDump) => mindDump.date === date);
        }
        if (updated) {
            filtered = filtered.filter((mindDump) => mindDump.updatedAt.startsWith(updated));
        }
        if (activity) {
            filtered = filtered.filter((mindDump) => {
                const c =
                    this.mindDumpDateKey(mindDump.createdAt) ??
                    (/^\d{4}-\d{2}-\d{2}$/.test(mindDump.date) ? mindDump.date : null);
                const u = this.mindDumpDateKey(mindDump.updatedAt);
                return c === activity || u === activity;
            });
        }
        if (!date && !activity && this.searchTimePreset !== "none" && this.searchTimePreset !== "custom") {
            filtered = filtered.filter((mindDump) => this.mindDumpMatchesTimePreset(mindDump));
        }
        if (keywords.length > 0) {
            filtered = filtered.filter((mindDump) => {
                const contentLower = mindDump.content.toLowerCase();
                return keywords.every((kw) => contentLower.includes(kw));
            });
        }

        if (this.tagMatchMode === "noTags") {
            filtered = filtered.filter((mindDump) => mindDump.tags.length === 0);
        } else if (this.selectedTags.size > 0) {
            if (this.tagMatchMode === "include") {
                filtered = filtered.filter((mindDump) => mindDump.tags.some((tag) => this.selectedTags.has(tag)));
            } else {
                filtered = filtered.filter((mindDump) => !mindDump.tags.some((tag) => this.selectedTags.has(tag)));
            }
        }

        if (this.contentTypeFilters.size > 0) {
            filtered = filtered.filter((mindDump) => this.mindDumpMatchesContentFilters(mindDump));
        }

        return filtered;
    }

    filterByTag(tag: string) {
        this.viewingRecycleBin = false;
        if (this.selectedTags.has(tag)) {
            this.selectedTags.delete(tag);
        } else {
            this.selectedTags.clear();
            this.selectedTags.add(tag);
        }
        this.render();
    }

    async openMindDump(mindDump: MindDump) {
        const folder = normalizePath(this.plugin.settings.saveFolder);
        let filePath: string;

        if (mindDump.filePath) {
            filePath = normalizePath(mindDump.filePath);
        } else if (this.plugin.settings.logMode === "multi") {
            const dateStr = mindDump.date;
            let filename = this.plugin.settings.multiFileFormat.replace("YYYYMMDD", dateStr.replace(/-/g, ""));
            if (!filename.endsWith(".md")) {
                filename += ".md";
            }
            filePath = `${folder}/${filename}`;
        } else {
            filePath = `${folder}/minddumps.md`;
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
                        const resolvedId = metaId || stableLegacyMindDumpId(file.path, datePart || "", timePart || "");
                        if (resolvedId === mindDump.id) {
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
                    const targetHeader = "### " + mindDump.date + " " + mindDump.time;
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
