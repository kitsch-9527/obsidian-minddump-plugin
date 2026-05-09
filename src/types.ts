// src/types.ts
export type Language = "zh" | "en";

export interface MindDumpSettings {
    saveFolder: string;
    logMode: "single" | "multi";
    useFixedTag: boolean;
    fixedTag: string;
    enableTagsInFrontmatter: boolean;
    multiFileFormat: string;
    attachmentsFolder: string;
    language: Language;
    autoOpenView: boolean;
}

export interface MindDump {
    /** Stable id; persisted for new records, derived for legacy entries without metadata */
    id: string;
    /** Created timestamp YYYY-MM-DD HH:mm:ss (same as date + time) */
    createdAt: string;
    /** Last update timestamp YYYY-MM-DD HH:mm:ss */
    updatedAt: string;
    date: string;
    time: string;
    content: string;
    tags: string[];
    source: string;
    fullText: string;
    attachments?: string[];
    attachmentTypes?: ("image" | "file")[];
    filePath?: string;
    /** Soft-deleted; block kept in vault with `#### deleted: true` */
    deleted?: boolean;
}

export interface DayRecord {
    date: string;
    count: number;
    mindDumps: MindDump[];
}

/** Calendar heatmap: activity counts create + update events per day; entries lists unique notes touching that day */
export interface HeatDayCell {
    activityScore: number;
    mindDumps: MindDump[];
}

export const DEFAULT_SETTINGS: MindDumpSettings = {
    saveFolder: "MindDump",
    logMode: "multi",
    useFixedTag: false,
    fixedTag: "minddump",
    enableTagsInFrontmatter: true,
    multiFileFormat: "minddump-YYYYMMDD",
    attachmentsFolder: "MindDump/attachments",
    language: "zh",
    autoOpenView: true
};

export const VIEW_TYPE_MINDDUMP = "minddump-view";
