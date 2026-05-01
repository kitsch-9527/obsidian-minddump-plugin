// src/main.ts
import { Plugin, Notice, TFile, TFolder, addIcon, normalizePath } from 'obsidian';
import moment from 'moment';
import { JotView, VIEW_TYPE_JOTS } from './view';
import { JotSettings, DEFAULT_SETTINGS, Language, Jot } from './types';
import { JotSettingTab } from './settings';
import { CaptureModal } from './capture-modal';
import { t, Translations } from './i18n';
import {
    parseFileContent,
    newJotId,
    composeJotMarkdownBody,
    formatJotEntryBlock,
    replaceJotBlockById,
    removeJotBlockById
} from './utils';

/** Soft-deleted jots older than this (by `updatedAt` when moved to trash) are permanently removed. */
const RECYCLE_BIN_RETENTION_DAYS = 30;

export default class JotPlugin extends Plugin {
    settings: JotSettings;
    private isLoaded: boolean = false;
    jots: Jot[] = [];

    get lang(): Language {
        return this.settings?.language || "zh";
    }

    async onload() {
        await this.loadSettings();
        console.log(t('loadingPlugin', this.lang));

        addIcon("jot-bolt", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/><path d="M17 3h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/></svg>`);

        await this.ensureAttachmentsFolder();

        this.registerView(VIEW_TYPE_JOTS, (leaf) => {
            return new JotView(leaf, this);
        });

        this.addRibbonIcon("jot-bolt", t('pluginName', this.lang), () => {
            this.activateView();
        });

        this.addCommand({
            id: "open-jot-view",
            name: `jot${this.lang === 'zh' ? '：' : ': '}${t('openJotView', this.lang)}`,
            callback: () => {
                this.activateView();
            }
        });

        this.addCommand({
            id: "quick-capture",
            name: `jot${this.lang === 'zh' ? '：' : ': '}${t('quickCapture', this.lang)}`,
            callback: () => {
                new CaptureModal(this.app, this).open();
            }
        });

        this.addSettingTab(new JotSettingTab(this.app, this));

        this.registerEvent(
            this.app.workspace.on("editor-menu", (menu, editor) => {
                const selection = editor.getSelection();
                if (!selection) return;

                menu.addItem((item) => {
                    item.setTitle(t('saveAsJot', this.lang))
                        .setIcon("jot-bolt")
                        .onClick(async () => {
                            await this.saveJot(selection, [], "", undefined);
                            new Notice(t('savedAsJot', this.lang));
                        });
                });
            })
        );

        this.isLoaded = true;

        this.registerInterval(
            window.setInterval(() => {
                void this.purgeExpiredRecycleBinJots();
            }, 24 * 60 * 60 * 1000)
        );

        this.app.workspace.onLayoutReady(async () => {
            if (this.settings.autoOpenView) {
                await this.activateView();
            }
            await this.loadJotsData();
            await this.purgeExpiredRecycleBinJots({ skipInitialLoad: true });
        });
    }

    async onunload() {
        this.isLoaded = false;
        try {
            this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS).forEach(leaf => {
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

        let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS)[0];
        
        if (!leaf) {
            leaf = this.app.workspace.getLeaf('tab');
            await leaf.setViewState({
                type: VIEW_TYPE_JOTS,
                active: true,
                state: {}
            });
        }
        this.app.workspace.revealLeaf(leaf);
        
        await this.loadJotsData();
    }

    async refreshJots() {
        await this.loadJotsData();
        console.log("刷新 jots 数据完成，共", this.jots.length, "条记录");
    }

    private async loadJotsData() {
        const folder = normalizePath(this.settings.saveFolder);
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

    async saveJot(content: string, tags: string[], source: string, attachments?: { path: string; type: "image" | "file" }[]) {
        const now = new Date();
        const dateStr = moment(now).format("YYYY-MM-DD");
        const fullDateTime = moment(now).format("YYYY-MM-DD HH:mm:ss");

        const id = newJotId();
        const { body, allTags } = composeJotMarkdownBody(
            content,
            tags,
            source,
            attachments,
            this.lang,
            this.settings.useFixedTag,
            this.settings.fixedTag
        );
        const newEntry = formatJotEntryBlock(fullDateTime, id, fullDateTime, body);

        if (this.settings.logMode === "multi") {
            await this.saveToMultiFile(dateStr, newEntry, allTags);
        } else {
            await this.saveToSingleFile(newEntry);
        }

        this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS).forEach(leaf => {
            if (leaf.view instanceof JotView) leaf.view.refresh();
        });

        await this.loadJotsData();

        new Notice(t('saved', this.lang));
    }

    /**
     * Replace one jot in its source file by `id`. Keeps `###` created time; sets `updatedAt` to now.
     */
    async updateJot(updated: Jot): Promise<void> {
        if (!updated.filePath) {
            const msg = t('jotUpdateNoFile', this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        const pathNorm = normalizePath(updated.filePath);
        const file = this.app.vault.getAbstractFileByPath(pathNorm);
        if (!(file instanceof TFile)) {
            const msg = t('jotUpdateFileMissing', this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        const attachmentsPayload =
            updated.attachments?.map((p, i) => ({
                path: p,
                type: updated.attachmentTypes?.[i] ?? ("file" as const)
            })) ?? undefined;
        const { body } = composeJotMarkdownBody(
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
        const newBlock = formatJotEntryBlock(fullDateTime, updated.id, updatedAtNow, body, {
            deleted: updated.deleted === true,
        });

        let found = false;
        await this.app.vault.process(file, (text) => {
            const result = replaceJotBlockById(text, file.path, updated.id, newBlock);
            found = result.found;
            return result.content;
        });
        if (!found) {
            const msg = t('jotUpdateNotFound', this.lang);
            new Notice(msg);
            throw new Error(msg);
        }

        this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS).forEach(leaf => {
            if (leaf.view instanceof JotView) leaf.view.refresh();
        });
        await this.loadJotsData();
    }

    /** Move jot to in-vault trash (`#### deleted: true` on the block). */
    async deleteJot(jot: Jot): Promise<void> {
        if (jot.deleted) return;
        if (!jot.filePath) {
            const msg = t("jotUpdateNoFile", this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        const pathNorm = normalizePath(jot.filePath);
        const file = this.app.vault.getAbstractFileByPath(pathNorm);
        if (!(file instanceof TFile)) {
            const msg = t("jotUpdateFileMissing", this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        const attachmentsPayload =
            jot.attachments?.map((p, i) => ({
                path: p,
                type: jot.attachmentTypes?.[i] ?? ("file" as const),
            })) ?? undefined;
        const { body } = composeJotMarkdownBody(
            jot.content,
            jot.tags,
            jot.source,
            attachmentsPayload,
            this.lang,
            this.settings.useFixedTag,
            this.settings.fixedTag
        );
        const fullDateTime = `${jot.date} ${jot.time}`.trim();
        const updatedAtNow = moment().format("YYYY-MM-DD HH:mm:ss");
        const newBlock = formatJotEntryBlock(fullDateTime, jot.id, updatedAtNow, body, { deleted: true });

        let found = false;
        await this.app.vault.process(file, (text) => {
            const result = replaceJotBlockById(text, file.path, jot.id, newBlock);
            found = result.found;
            return result.content;
        });
        if (!found) {
            const msg = t("jotUpdateNotFound", this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS).forEach((leaf) => {
            if (leaf.view instanceof JotView) leaf.view.refresh();
        });
        await this.loadJotsData();
    }

    /** Permanently remove a jot block (e.g. from recycle bin). */
    async purgeJot(jot: Jot, options?: { skipReload?: boolean }): Promise<void> {
        if (!jot.filePath) {
            const msg = t("jotUpdateNoFile", this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        const pathNorm = normalizePath(jot.filePath);
        const file = this.app.vault.getAbstractFileByPath(pathNorm);
        if (!(file instanceof TFile)) {
            const msg = t("jotUpdateFileMissing", this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        let found = false;
        await this.app.vault.process(file, (text) => {
            const result = removeJotBlockById(text, file.path, jot.id);
            found = result.found;
            return result.content;
        });
        if (!found) {
            const msg = t("jotUpdateNotFound", this.lang);
            new Notice(msg);
            throw new Error(msg);
        }
        if (!options?.skipReload) {
            this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS).forEach((leaf) => {
                if (leaf.view instanceof JotView) leaf.view.refresh();
            });
            await this.loadJotsData();
        }
    }

    /**
     * Permanently removes recycle-bin jots whose last update time is older than
     * {@link RECYCLE_BIN_RETENTION_DAYS} days (`updatedAt` is set when an item is moved to trash).
     */
    async purgeExpiredRecycleBinJots(options?: { skipInitialLoad?: boolean }): Promise<number> {
        if (!options?.skipInitialLoad) {
            await this.loadJotsData();
        }
        const threshold = moment().subtract(RECYCLE_BIN_RETENTION_DAYS, "days");
        const expired = this.jots.filter((j) => {
            if (!j.deleted) return false;
            const m = moment(j.updatedAt || j.createdAt, "YYYY-MM-DD HH:mm:ss", true);
            if (!m.isValid()) return false;
            return m.isBefore(threshold);
        });
        if (expired.length === 0) return 0;
        let purged = 0;
        for (const jot of expired) {
            try {
                await this.purgeJot(jot, { skipReload: true });
                purged++;
            } catch (e) {
                console.error("purgeExpiredRecycleBinJots:", e);
            }
        }
        if (purged > 0) {
            this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS).forEach((leaf) => {
                if (leaf.view instanceof JotView) leaf.view.refresh();
            });
            await this.loadJotsData();
            new Notice(t("recycleBinAutoPurged", this.lang, { count: String(purged) }));
        }
        return purged;
    }

    /** Permanently remove every jot currently in the recycle bin. */
    async purgeAllDeletedJots(): Promise<number> {
        const victims = this.jots.filter((j) => j.deleted);
        for (const jot of victims) {
            await this.purgeJot(jot);
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
        const filePath = `${folder}/jots.md`;
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
        this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS).forEach(leaf => {
            if (leaf.view instanceof JotView) leaf.view.refresh();
        });
        await this.loadJotsData();
        this.updateCommandNames();
    }

    private updateCommandNames() {
        const commands = [
            { id: "open-jot-view", key: "openJotView" as keyof Translations },
            { id: "quick-capture", key: "quickCapture" as keyof Translations }
        ];

        const separator = this.lang === 'zh' ? '：' : ': ';

        commands.forEach(({ id, key }) => {
            const command = this.app.commands.findCommand(`${this.manifest.id}:${id}`);
            if (command) {
                command.name = `jot${separator}${t(key, this.lang)}`;
            }
        });
    }
}