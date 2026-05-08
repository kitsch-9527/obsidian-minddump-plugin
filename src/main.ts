// src/main.ts
import { Plugin, Notice, TFile, TFolder, addIcon, normalizePath } from 'obsidian';
import moment from 'moment';
import { MindDumpView, VIEW_TYPE_MINDDUMP } from './view';
import { MindDumpSettings, DEFAULT_SETTINGS, Language, MindDump } from './types';
import { MindDumpSettingTab } from './settings';
import { CaptureModal } from './capture-modal';
import { t, Translations } from './i18n';
import {
    parseFileContent,
    newMindDumpId,
    composeMindDumpMarkdownBody,
    formatMindDumpEntryBlock,
    replaceMindDumpBlockById,
    removeMindDumpBlockById
} from './utils';

/** Soft-deleted mindDumps older than this (by `updatedAt` when moved to trash) are permanently removed. */
const RECYCLE_BIN_RETENTION_DAYS = 30;

export default class MindDumpPlugin extends Plugin {
    settings: MindDumpSettings;
    private isLoaded: boolean = false;
    mindDumps: MindDump[] = [];

    get lang(): Language {
        return this.settings?.language || "zh";
    }

    async onload() {
        await this.loadSettings();
        console.log(t('loadingPlugin', this.lang));

        addIcon("minddump-bolt", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/><path d="M17 3h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/></svg>`);

        await this.ensureAttachmentsFolder();

        this.registerView(VIEW_TYPE_MINDDUMP, (leaf) => {
            return new MindDumpView(leaf, this);
        });

        this.addRibbonIcon("minddump-bolt", t('pluginName', this.lang), () => {
            this.activateView();
        });

        this.addCommand({
            id: "open-minddump-view",
            name: `MindDump${this.lang === 'zh' ? '：' : ': '}${t('openMindDumpView', this.lang)}`,
            callback: () => {
                this.activateView();
            }
        });

        this.addCommand({
            id: "quick-capture",
            name: `MindDump${this.lang === 'zh' ? '：' : ': '}${t('quickCapture', this.lang)}`,
            callback: () => {
                new CaptureModal(this.app, this).open();
            }
        });

        this.addSettingTab(new MindDumpSettingTab(this.app, this));

        this.registerEvent(
            this.app.workspace.on("editor-menu", (menu, editor) => {
                const selection = editor.getSelection();
                if (!selection) return;

                menu.addItem((item) => {
                    item.setTitle(t('saveAsMindDump', this.lang))
                        .setIcon("minddump-bolt")
                        .onClick(async () => {
                            await this.saveMindDump(selection, [], "", undefined);
                            new Notice(t('savedAsMindDump', this.lang));
                        });
                });
            })
        );

        this.isLoaded = true;

        this.registerInterval(
            window.setInterval(() => {
                void this.purgeExpiredRecycleBinMindDumps();
            }, 24 * 60 * 60 * 1000)
        );

        this.app.workspace.onLayoutReady(async () => {
            if (this.settings.autoOpenView) {
                await this.activateView();
            }
            await this.loadMindDumpData();
            await this.purgeExpiredRecycleBinMindDumps({ skipInitialLoad: true });
        });
    }

    async onunload() {
        this.isLoaded = false;
        try {
            this.app.workspace.getLeavesOfType(VIEW_TYPE_MINDDUMP).forEach(leaf => {
                leaf.detach();
            });
        } catch (e) {
            console.error("Cleanup view error:", e);
        }
    }

    async ensureAttachmentsFolder() {
        const folder = normalizePath(this.settings.attachmentsFolder);
        const existing = this.app.vault.getAbstractFileByPath(folder);
        if (!existing || !(existing instanceof TFolder)) {
            try {
                await this.app.vault.createFolder(folder);
            } catch (error) {}
        }
    }

    async activateView() {
        if (!this.isLoaded) return;

        let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_MINDDUMP)[0];

        if (!leaf) {
            leaf = this.app.workspace.getLeaf('tab');
            await leaf.setViewState({
                type: VIEW_TYPE_MINDDUMP,
                active: true,
                state: {}
            });
        }
        this.app.workspace.revealLeaf(leaf);

        await this.loadMindDumpData();
    }

    async refreshMindDumps() {
        await this.loadMindDumpData();
        console.log("刷新 mind dump 数据完成，共", this.mindDumps.length, "条记录");
    }

    private async loadMindDumpData() {
        const folder = normalizePath(this.settings.saveFolder);
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

    async saveMindDump(content: string, tags: string[], source: string, attachments?: { path: string; type: "image" | "file" }[]) {
        const now = new Date();
        const dateStr = moment(now).format("YYYY-MM-DD");
        const fullDateTime = moment(now).format("YYYY-MM-DD HH:mm:ss");

        const id = newMindDumpId();
        const { body, allTags } = composeMindDumpMarkdownBody(
            content,
            tags,
            source,
            attachments,
            this.lang,
            this.settings.useFixedTag,
            this.settings.fixedTag
        );
        const newEntry = formatMindDumpEntryBlock(fullDateTime, id, fullDateTime, body);

        if (this.settings.logMode === "multi") {
            await this.saveToMultiFile(dateStr, newEntry, allTags);
        } else {
            await this.saveToSingleFile(newEntry);
        }

        this.app.workspace.getLeavesOfType(VIEW_TYPE_MINDDUMP).forEach(leaf => {
            if (leaf.view instanceof MindDumpView) leaf.view.refresh();
        });

        await this.loadMindDumpData();

        new Notice(t('saved', this.lang));
    }

    /**
     * Replace one mindDump in its source file by `id`. Keeps `###` created time; sets `updatedAt` to now.
     */
    async updateMindDump(updated: MindDump): Promise<void> {
        if (!updated.filePath) {
            const msg = t('mindDumpUpdateNoFile', this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        const pathNorm = normalizePath(updated.filePath);
        const file = this.app.vault.getAbstractFileByPath(pathNorm);
        if (!(file instanceof TFile)) {
            const msg = t('mindDumpUpdateFileMissing', this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        const attachmentsPayload =
            updated.attachments?.map((p, i) => ({
                path: p,
                type: updated.attachmentTypes?.[i] ?? ("file" as const)
            })) ?? undefined;
        const { body } = composeMindDumpMarkdownBody(
            updated.content,
            updated.tags,
            updated.source,
            attachmentsPayload,
            this.lang,
            this.settings.useFixedTag,
            this.settings.fixedTag
        );
        const fullDateTime = `${updated.date} ${updated.time}`.trim();
        const updatedAtNow = moment().format("YYYY-MM-DD HH:mm:ss");
        const newBlock = formatMindDumpEntryBlock(fullDateTime, updated.id, updatedAtNow, body, {
            deleted: updated.deleted === true,
        });

        let found = false;
        await this.app.vault.process(file, (text) => {
            const result = replaceMindDumpBlockById(text, file.path, updated.id, newBlock);
            found = result.found;
            return result.content;
        });
        if (!found) {
            const msg = t('mindDumpUpdateNotFound', this.lang);
            new Notice(msg);
            throw new Error(msg);
        }

        this.app.workspace.getLeavesOfType(VIEW_TYPE_MINDDUMP).forEach(leaf => {
            if (leaf.view instanceof MindDumpView) leaf.view.refresh();
        });
        await this.loadMindDumpData();
    }

    /** Move mindDump to in-vault trash (`#### deleted: true` on the block). */
    async deleteMindDump(mindDump: MindDump): Promise<void> {
        if (mindDump.deleted) return;
        if (!mindDump.filePath) {
            const msg = t("mindDumpUpdateNoFile", this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        const pathNorm = normalizePath(mindDump.filePath);
        const file = this.app.vault.getAbstractFileByPath(pathNorm);
        if (!(file instanceof TFile)) {
            const msg = t("mindDumpUpdateFileMissing", this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        const attachmentsPayload =
            mindDump.attachments?.map((p, i) => ({
                path: p,
                type: mindDump.attachmentTypes?.[i] ?? ("file" as const),
            })) ?? undefined;
        const { body } = composeMindDumpMarkdownBody(
            mindDump.content,
            mindDump.tags,
            mindDump.source,
            attachmentsPayload,
            this.lang,
            this.settings.useFixedTag,
            this.settings.fixedTag
        );
        const fullDateTime = `${mindDump.date} ${mindDump.time}`.trim();
        const updatedAtNow = moment().format("YYYY-MM-DD HH:mm:ss");
        const newBlock = formatMindDumpEntryBlock(fullDateTime, mindDump.id, updatedAtNow, body, { deleted: true });

        let found = false;
        await this.app.vault.process(file, (text) => {
            const result = replaceMindDumpBlockById(text, file.path, mindDump.id, newBlock);
            found = result.found;
            return result.content;
        });
        if (!found) {
            const msg = t("mindDumpUpdateNotFound", this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        this.app.workspace.getLeavesOfType(VIEW_TYPE_MINDDUMP).forEach((leaf) => {
            if (leaf.view instanceof MindDumpView) leaf.view.refresh();
        });
        await this.loadMindDumpData();
    }

    /** Permanently remove a mindDump block (e.g. from recycle bin). */
    async purgeMindDump(mindDump: MindDump, options?: { skipReload?: boolean }): Promise<void> {
        if (!mindDump.filePath) {
            const msg = t("mindDumpUpdateNoFile", this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        const pathNorm = normalizePath(mindDump.filePath);
        const file = this.app.vault.getAbstractFileByPath(pathNorm);
        if (!(file instanceof TFile)) {
            const msg = t("mindDumpUpdateFileMissing", this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        let found = false;
        await this.app.vault.process(file, (text) => {
            const result = removeMindDumpBlockById(text, file.path, mindDump.id);
            found = result.found;
            return result.content;
        });
        if (!found) {
            const msg = t("mindDumpUpdateNotFound", this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        if (!options?.skipReload) {
            this.app.workspace.getLeavesOfType(VIEW_TYPE_MINDDUMP).forEach((leaf) => {
                if (leaf.view instanceof MindDumpView) leaf.view.refresh();
            });
            await this.loadMindDumpData();
        }
    }

    /**
     * Permanently removes recycle-bin mindDumps whose last update time is older than
     * {@link RECYCLE_BIN_RETENTION_DAYS} days (`updatedAt` is set when an item is moved to trash).
     */
    async purgeExpiredRecycleBinMindDumps(options?: { skipInitialLoad?: boolean }): Promise<number> {
        if (!options?.skipInitialLoad) {
            await this.loadMindDumpData();
        }
        const threshold = moment().subtract(RECYCLE_BIN_RETENTION_DAYS, "days");
        const expired = this.mindDumps.filter((j) => {
            if (!j.deleted) return false;
            const m = moment(j.updatedAt || j.createdAt, "YYYY-MM-DD HH:mm:ss", true);
            if (!m.isValid()) return false;
            return m.isBefore(threshold);
        });
        if (expired.length === 0) return 0;
        let purged = 0;
        for (const mindDump of expired) {
            try {
                await this.purgeMindDump(mindDump, { skipReload: true });
                purged++;
            } catch (e) {
                console.error("purgeExpiredRecycleBinMindDumps:", e);
            }
        }
        if (purged > 0) {
            this.app.workspace.getLeavesOfType(VIEW_TYPE_MINDDUMP).forEach((leaf) => {
                if (leaf.view instanceof MindDumpView) leaf.view.refresh();
            });
            await this.loadMindDumpData();
            new Notice(t("recycleBinAutoPurged", this.lang, { count: String(purged) }));
        }
        return purged;
    }

    /** Permanently remove every mindDump currently in the recycle bin. */
    async purgeAllDeletedMindDumps(): Promise<number> {
        const victims = this.mindDumps.filter((j) => j.deleted);
        for (const mindDump of victims) {
            await this.purgeMindDump(mindDump);
        }
        return victims.length;
    }

    async saveToMultiFile(dateStr: string, newEntry: string, tags: string[]) {
        const folder = normalizePath(this.settings.saveFolder);
        let filename = this.settings.multiFileFormat.replace("YYYYMMDD", dateStr.replace(/-/g, ""));
        if (!filename.endsWith(".md")) filename += ".md";
        const filePath = `${folder}/${filename}`;

        if (!this.app.vault.getAbstractFileByPath(folder)) {
            await this.app.vault.createFolder(folder);
        }

        // 检查文件是否存在
        const existingFile = this.app.vault.getAbstractFileByPath(filePath);

        if (existingFile && existingFile instanceof TFile) {
            // 文件存在，使用 vault.process 实现原子性文件写入
            await this.app.vault.process(existingFile, (data) => {
                let fileContent = data || "";

                const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
                const frontmatterMatch = fileContent.match(frontmatterRegex);

                if (frontmatterMatch) {
                    const frontmatterEnd = frontmatterMatch[0].length;
                    const beforeFrontmatter = fileContent.substring(0, frontmatterEnd);
                    const afterFrontmatter = fileContent.substring(frontmatterEnd);
                    return beforeFrontmatter + newEntry + afterFrontmatter;
                } else {
                    return newEntry + fileContent;
                }
            });
        } else {
            // 文件不存在，创建带有 frontmatter 的文件
            let frontmatter = "";
            if (this.settings.enableTagsInFrontmatter && tags.length > 0) {
                frontmatter = "---\n";
                frontmatter += `tags:\n${tags.map(tg => `  - ${tg}`).join("\n")}\n`;
                frontmatter += "---\n\n";
            }
            const fileContent = frontmatter + newEntry;
            await this.app.vault.create(filePath, fileContent);
        }
    }

    async saveToSingleFile(newEntry: string) {
        const folder = normalizePath(this.settings.saveFolder);
        const filePath = `${folder}/minddumps.md`;
        if (!this.app.vault.getAbstractFileByPath(folder)) await this.app.vault.createFolder(folder);

        // 检查文件是否存在
        const existingFile = this.app.vault.getAbstractFileByPath(filePath);

        if (existingFile && existingFile instanceof TFile) {
            // 文件存在，使用 vault.process 实现原子性文件写入
            await this.app.vault.process(existingFile, (data) => {
                let fileContent = data || "";

                const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
                const frontmatterMatch = fileContent.match(frontmatterRegex);

                if (frontmatterMatch) {
                    const frontmatterEnd = frontmatterMatch[0].length;
                    const beforeFrontmatter = fileContent.substring(0, frontmatterEnd);
                    const afterFrontmatter = fileContent.substring(frontmatterEnd);
                    return beforeFrontmatter + newEntry + afterFrontmatter;
                } else {
                    return newEntry + fileContent;
                }
            });
        } else {
            // 文件不存在，创建新文件
            await this.app.vault.create(filePath, newEntry);
        }
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        await this.ensureAttachmentsFolder();
        this.app.workspace.getLeavesOfType(VIEW_TYPE_MINDDUMP).forEach(leaf => {
            if (leaf.view instanceof MindDumpView) leaf.view.refresh();
        });
        await this.loadMindDumpData();
        this.updateCommandNames();
    }

    private updateCommandNames() {
        const commands = [
            { id: "open-minddump-view", key: "openMindDumpView" as keyof Translations },
            { id: "quick-capture", key: "quickCapture" as keyof Translations }
        ];

        const separator = this.lang === 'zh' ? '：' : ': ';

        commands.forEach(({ id, key }) => {
            const command = this.app.commands.findCommand(`${this.manifest.id}:${id}`);
            if (command) {
                command.name = `MindDump${separator}${t(key, this.lang)}`;
            }
        });
    }
}
