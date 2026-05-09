// src/i18n.ts
import { Language } from './types';

export interface Translations {
    pluginName: string;
    pluginDescription: string;
    openMindDumpView: string;
    quickCapture: string;
    saveAsMindDump: string;
    savedAsMindDump: string;
    mindDumpView: string;
    quickRecord: string;
    contentPlaceholder: string;
    /** Rich editor toolbar */
    toolbarBold: string;
    toolbarUnorderedList: string;
    toolbarOrderedList: string;
    placeholderWithLink: string;
    tagsPlaceholder: string;
    tagsInputPlaceholder: string;
    /** Tooltip on tag pills when click-to-rename is available */
    tagPillClickToEdit: string;
    sourcePlaceholder: string;
    attachmentPlaceholder: string;
    /** Remove image embed from editor (textarea or attachment strip). */
    removeEditorImage: string;
    attachmentSelected: string;
    save: string;
    cancel: string;
    contentRequired: string;
    saved: string;
    mindDumpUpdateNotFound: string;
    mindDumpUpdateNoFile: string;
    mindDumpUpdateFileMissing: string;
    saveFailed: string;
    attachmentSaved: string;
    calendar: string;
    heatmap: string;
    heatmapSubtitle: string;
    heatmapTooltip: string;
    /** Contribution-style heatmap header */
    heatmapStatNotes: string;
    heatmapStatTags: string;
    heatmapStatActiveDays: string;
    /** Short month labels for heatmap footer (Jan… / 一月…) */
    heatmapMonthShort: string[];
    year: string;
    month: string;
    searchAndTags: string;
    searchPlaceholder: string;
    searchPlaceholderShort: string;
    searchPillPlaceholder: string;
    searchFilterTagsHeading: string;
    searchFilterContentHeading: string;
    timePresetOnThisDay: string;
    timePresetThisMonth: string;
    timePresetLastMonth: string;
    timePresetLast7: string;
    timePresetLast30: string;
    timePresetCustom: string;
    tagModeInclude: string;
    tagModeExclude: string;
    tagModeNoTags: string;
    contentTypeImage: string;
    contentTypeLink: string;
    contentTypeAudio: string;
    moreTags: string;
    noRecords: string;
    settings: string;
    saveFolder: string;
    saveFolderDesc: string;
    attachmentsFolder: string;
    attachmentsFolderDesc: string;
    attachmentsNaming: string;
    logMode: string;
    logModeDesc: string;
    logModeMulti: string;
    logModeSingle: string;
    fileFormat: string;
    fileFormatDesc: string;
    useFixedTag: string;
    useFixedTagDesc: string;
    fixedTag: string;
    fixedTagDesc: string;
    enableTagsInFrontmatter: string;
    enableTagsInFrontmatterDesc: string;
    language: string;
    languageDesc: string;
    languageZh: string;
    languageEn: string;
    multiModeInfo: string;
    singleModeInfo: string;
    recordFormat: string;
    newRecordAtTop: string;
    imageEmbed: string;
    fileLink: string;
    loadingPlugin: string;
    unloadingPlugin: string;
    loadingSettings: string;
    creatingAttachmentsFolder: string;
    attachmentsFolderExists: string;
    creatingMindDumpView: string;
    activatingView: string;
    pluginNotLoaded: string;
    existingViewFound: string;
    creatingNewView: string;
    weekdays: string[];
    selectedFiles: string;
    recordsCount: string;
    autoOpenView: string;
    autoOpenViewDesc: string;
    mindDumpUpdatedAt: string;
    pasteImageUploadFailed: string;
    cardMenuShare: string;
    cardMenuEdit: string;
    cardMenuPinTop: string;
    cardMenuFloatingWindow: string;
    cardMenuRelatedNotes: string;
    cardMenuCopyLink: string;
    cardMenuAnnotate: string;
    cardMenuMore: string;
    cardMenuMoreOpenNote: string;
    cardMenuMoreCopyMarkdown: string;
    cardMenuDelete: string;
    cardMenuWordCount: string;
    cardMenuEditedAtFooter: string;
    cardMenuLinkCopied: string;
    cardMenuShareCopied: string;
    cardMenuDeleted: string;
    cardMenuDeleteConfirm: string;
    cardMenuComingSoon: string;
    cardMenuAiBadge: string;
    cardMenuRestore: string;
    cardMenuPurge: string;
    cardMenuPurgeConfirm: string;
    cardMenuRestored: string;
    cardMenuPurged: string;
    rightRailAllTags: string;
    rightRailRecycleBin: string;
    recycleBinEmpty: string;
    /** Sticky banner when viewing recycle bin (replaces quick input). */
    recycleBinRetentionBanner: string;
    recycleBinEmptyAll: string;
    recycleBinEmptyAllConfirm: string;
    recycleBinAllPurged: string;
    /** Shown after automatic purge of items past retention */
    recycleBinAutoPurged: string;
    /** Right rail tag strip: sort menu label */
    rightRailTagSort: string;
    rightRailTagSortNameAsc: string;
    rightRailTagSortNameDesc: string;
    rightRailTagSortCountDesc: string;
    rightRailTagSortCountAsc: string;
    /** Search row: sort mindDump list (icon button) */
    mindDumpListSortButton: string;
    mindDumpListSortCreatedDesc: string;
    mindDumpListSortCreatedAsc: string;
    mindDumpListSortUpdatedDesc: string;
    mindDumpListSortUpdatedAsc: string;
    rightRailTagFilterPlaceholder: string;
    /** Main layout: collapse the right column (search, calendar, tags) */
    rightPanelCollapse: string;
    rightPanelExpand: string;
}

export const translations: Record<Language, Translations> = {
    zh: {
        pluginName: "随手记",
        pluginDescription: "随手记录想法和笔记",
        openMindDumpView: "打开随手记视图",
        quickCapture: "快速记录",
        saveAsMindDump: "保存为随手记",
        savedAsMindDump: "已保存为随手记！",
        mindDumpView: "随手记",
        quickRecord: "快速记录",
        contentPlaceholder: "现在的想法是...",
        toolbarBold: "加粗",
        toolbarUnorderedList: "无序列表",
        toolbarOrderedList: "有序列表（自动编号）",
        placeholderWithLink: "现在的想法是...\n输入 [[ 可快速插入笔记链接",
        tagsPlaceholder: "标签",
        tagsInputPlaceholder: "按回车添加标签，使用 / 进行嵌套",
        tagPillClickToEdit: "点击编辑标签；× 删除",
        sourcePlaceholder: "来源",
        attachmentPlaceholder: "📎 点击或拖拽文件到这里",
        removeEditorImage: "移除图片",
        attachmentSelected: "✅ 已选择: {filename}",
        save: "保存",
        cancel: "取消",
        contentRequired: "内容不能为空",
        saved: "已保存！",
        mindDumpUpdateNotFound: "在文件中找不到该条随手记。",
        mindDumpUpdateNoFile: "该记录没有关联的文件。",
        mindDumpUpdateFileMissing: "源文件不存在。",
        saveFailed: "保存失败: {error}",
        attachmentSaved: "附件已保存: {filename}",
        calendar: "日历",
        heatmap: "活动热力图",
        heatmapSubtitle: "按创建与更新时间",
        heatmapTooltip: "{date} · {notes} 条 · {events} 次活动（创建/更新）",
        heatmapStatNotes: "笔记",
        heatmapStatTags: "标签",
        heatmapStatActiveDays: "天",
        heatmapMonthShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        year: "年",
        month: "月",
        searchAndTags: "🔍 搜索与标签",
        searchPlaceholder: "关键词；可选 date: / updated: / activity: 筛选",
        searchPlaceholderShort: "搜索；date: / updated: / activity:",
        searchPillPlaceholder: "⌘K",
        searchFilterTagsHeading: "标签",
        searchFilterContentHeading: "包含内容",
        timePresetOnThisDay: "那年今日",
        timePresetThisMonth: "本月",
        timePresetLastMonth: "上月",
        timePresetLast7: "近7天",
        timePresetLast30: "近30天",
        timePresetCustom: "自定义",
        tagModeInclude: "包含",
        tagModeExclude: "不包含",
        tagModeNoTags: "无标签",
        contentTypeImage: "图片",
        contentTypeLink: "链接",
        contentTypeAudio: "语音",
        moreTags: "还有 {count} 个标签...",
        noRecords: "暂无记录，开始记录你的想法吧！",
        settings: "设置",
        saveFolder: "保存文件夹",
        saveFolderDesc: "位于 vault 根目录，例如：MindDump",
        attachmentsFolder: "附件存放目录",
        attachmentsFolderDesc: "附件存放位置，例如：MindDump/attachments。附件命名格式：minddump-YYYYMMDD-序数",
        attachmentsNaming: "附件命名格式：minddump-YYYYMMDD-序数",
        logMode: "记录模式",
        logModeDesc: "选择记录保存方式",
        logModeMulti: "每天一个文件",
        logModeSingle: "单个文件",
        fileFormat: "文件名格式",
        fileFormatDesc: "文件名命名格式，例如：minddump-YYYYMMDD 会生成 minddump-20260326.md",
        useFixedTag: "使用固定标签",
        useFixedTagDesc: "为每条记录自动添加固定标签",
        fixedTag: "固定标签值",
        fixedTagDesc: "自动添加的标签（不需要 # 号）",
        enableTagsInFrontmatter: "启用 frontmatter 标签",
        enableTagsInFrontmatterDesc: "在每天文件的 YAML 区域添加 tags 字段（方便 Dataview 等插件使用）",
        language: "语言",
        languageDesc: "选择插件显示语言",
        languageZh: "中文",
        languageEn: "English",
        multiModeInfo: "📁 每天一个文件模式说明：",
        singleModeInfo: "📄 单个文件模式说明：",
        recordFormat: "每条记录格式：",
        newRecordAtTop: "• 新记录会自动添加到文件最上方",
        imageEmbed: "• 图片使用 ![[路径]] 嵌入",
        fileLink: "• 其他文件使用 [[路径]] 链接",
        loadingPlugin: "加载随手记插件",
        unloadingPlugin: "卸载随手记插件",
        loadingSettings: "加载设置:",
        creatingAttachmentsFolder: "创建附件目录:",
        attachmentsFolderExists: "附件目录已存在或创建失败:",
        creatingMindDumpView: "创建 MindDumpView 实例",
        activatingView: "激活视图",
        pluginNotLoaded: "插件未完全加载，延迟激活",
        existingViewFound: "找到现有视图",
        creatingNewView: "创建新视图",
        weekdays: ["日", "一", "二", "三", "四", "五", "六"],
        selectedFiles: "✅ 已选择 {count} 个文件",
        recordsCount: "{count}条记录",
        autoOpenView: "打开 vault 时自动打开随手记视图",
        autoOpenViewDesc: "启动 Obsidian 时自动打开随手记视图",
        mindDumpUpdatedAt: "更新",
        pasteImageUploadFailed: "图片上传失败：{error}",
        cardMenuShare: "分享",
        cardMenuEdit: "编辑",
        cardMenuPinTop: "置顶",
        cardMenuFloatingWindow: "加入浮窗",
        cardMenuRelatedNotes: "相关笔记",
        cardMenuCopyLink: "复制链接",
        cardMenuAnnotate: "批注",
        cardMenuMore: "更多",
        cardMenuMoreOpenNote: "在笔记中打开",
        cardMenuMoreCopyMarkdown: "复制 Markdown",
        cardMenuDelete: "删除",
        cardMenuWordCount: "字数统计: {count}",
        cardMenuEditedAtFooter: "编辑于 {time}",
        cardMenuLinkCopied: "已复制链接",
        cardMenuShareCopied: "已复制到剪贴板",
        cardMenuDeleted: "已移至回收站",
        cardMenuDeleteConfirm: "确定删除这条随手记？删除后将进入回收站，可在回收站彻底删除。",
        cardMenuComingSoon: "敬请期待",
        cardMenuAiBadge: "AI",
        cardMenuRestore: "恢复",
        cardMenuPurge: "彻底删除",
        cardMenuPurgeConfirm: "确定从回收站永久删除？无法恢复。",
        cardMenuRestored: "已恢复",
        cardMenuPurged: "已永久删除",
        rightRailAllTags: "全部标签",
        rightRailRecycleBin: "回收站",
        recycleBinEmpty: "回收站为空",
        recycleBinRetentionBanner: "在回收站中超过 30 天的笔记将会自动删除",
        recycleBinEmptyAll: "清空回收站",
        recycleBinEmptyAllConfirm: "确定清空回收站？其中的所有随手记将被永久删除，无法恢复。",
        recycleBinAllPurged: "已永久删除 {count} 条",
        recycleBinAutoPurged: "已自动永久删除回收站中超过 30 天的 {count} 条随手记",
        rightRailTagSort: "排序",
        rightRailTagSortNameAsc: "名称 A → Z",
        rightRailTagSortNameDesc: "名称 Z → A",
        rightRailTagSortCountDesc: "使用次数（多 → 少）",
        rightRailTagSortCountAsc: "使用次数（少 → 多）",
        mindDumpListSortButton: "列表排序",
        mindDumpListSortCreatedDesc: "创建时间（新 → 旧）",
        mindDumpListSortCreatedAsc: "创建时间（旧 → 新）",
        mindDumpListSortUpdatedDesc: "更新时间（新 → 旧）",
        mindDumpListSortUpdatedAsc: "更新时间（旧 → 新）",
        rightRailTagFilterPlaceholder: "筛选标签…",
        rightPanelCollapse: "收起侧栏",
        rightPanelExpand: "展开侧栏",
    },
    en: {
        pluginName: "MindDump",
        pluginDescription: "Quick note-taking plugin",
        openMindDumpView: "Open MindDump View",
        quickCapture: "Quick Capture",
        saveAsMindDump: "Save as MindDump",
        savedAsMindDump: "Saved as MindDump!",
        mindDumpView: "MindDump",
        quickRecord: "Quick Record",
        contentPlaceholder: "What's on your mind...",
        toolbarBold: "Bold",
        toolbarUnorderedList: "Bullet list",
        toolbarOrderedList: "Numbered list (auto-renumber)",
        placeholderWithLink: "What's on your mind...\nType [[ to quickly insert note links",
        tagsPlaceholder: "Tags",
        tagsInputPlaceholder: "Press Enter to add tag, use / for nesting",
        tagPillClickToEdit: "Click to rename tag; × to remove",
        sourcePlaceholder: "Source",
        attachmentPlaceholder: "📎 Click or drag file here",
        removeEditorImage: "Remove image",
        attachmentSelected: "✅ Selected: {filename}",
        save: "Save",
        cancel: "Cancel",
        contentRequired: "Content cannot be empty",
        saved: "Saved!",
        mindDumpUpdateNotFound: "Could not find that mind dump in the file.",
        mindDumpUpdateNoFile: "This mind dump has no source file.",
        mindDumpUpdateFileMissing: "Source file not found.",
        saveFailed: "Save failed: {error}",
        attachmentSaved: "Attachment saved: {filename}",
        calendar: "Calendar",
        heatmap: "Activity heatmap",
        heatmapSubtitle: "By created & updated time",
        heatmapTooltip: "{date} · {notes} notes · {events} events (create/update)",
        heatmapStatNotes: "Notes",
        heatmapStatTags: "Tags",
        heatmapStatActiveDays: "Active days",
        heatmapMonthShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        year: "",
        month: "/",
        searchAndTags: "🔍 Search & Tags",
        searchPlaceholder: "Keywords; optional date: / updated: / activity: filters",
        searchPlaceholderShort: "Search; date: / updated: / activity:",
        searchPillPlaceholder: "⌘K",
        searchFilterTagsHeading: "Tags",
        searchFilterContentHeading: "Contains",
        timePresetOnThisDay: "On this day",
        timePresetThisMonth: "This month",
        timePresetLastMonth: "Last month",
        timePresetLast7: "Last 7 days",
        timePresetLast30: "Last 30 days",
        timePresetCustom: "Custom",
        tagModeInclude: "Include",
        tagModeExclude: "Exclude",
        tagModeNoTags: "No tags",
        contentTypeImage: "Image",
        contentTypeLink: "Link",
        contentTypeAudio: "Audio",
        moreTags: "{count} more tags...",
        noRecords: "No records yet. Start capturing your thoughts!",
        settings: "Settings",
        saveFolder: "Save Folder",
        saveFolderDesc: "Located in vault root, e.g., MindDump",
        attachmentsFolder: "Attachments Folder",
        attachmentsFolderDesc: "Attachment storage location, e.g., MindDump/attachments. Naming format: minddump-YYYYMMDD-number",
        attachmentsNaming: "Naming format: minddump-YYYYMMDD-number",
        logMode: "Log Mode",
        logModeDesc: "Choose how to save records",
        logModeMulti: "One file per day",
        logModeSingle: "Single file",
        fileFormat: "File Format",
        fileFormatDesc: "File naming format, e.g., minddump-YYYYMMDD generates minddump-20260326.md",
        useFixedTag: "Use Fixed Tag",
        useFixedTagDesc: "Automatically add a fixed tag to each record",
        fixedTag: "Fixed Tag Value",
        fixedTagDesc: "Tag to add automatically (no # needed)",
        enableTagsInFrontmatter: "Enable Frontmatter Tags",
        enableTagsInFrontmatterDesc: "Add tags field in YAML frontmatter (for Dataview and other plugins)",
        language: "Language",
        languageDesc: "Choose plugin display language",
        languageZh: "中文",
        languageEn: "English",
        multiModeInfo: "📁 One File Per Day Mode:",
        singleModeInfo: "📄 Single File Mode:",
        recordFormat: "Record format:",
        newRecordAtTop: "• New records are automatically added to the top",
        imageEmbed: "• Images embedded with ![[path]]",
        fileLink: "• Other files linked with [[path]]",
        loadingPlugin: "Loading MindDump plugin",
        unloadingPlugin: "Unloading MindDump plugin",
        loadingSettings: "Loading settings:",
        creatingAttachmentsFolder: "Creating attachments folder:",
        attachmentsFolderExists: "Attachments folder exists or creation failed:",
        creatingMindDumpView: "Creating MindDumpView instance",
        activatingView: "Activating view",
        pluginNotLoaded: "Plugin not fully loaded, delaying activation",
        existingViewFound: "Found existing view",
        creatingNewView: "Creating new view",
        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        selectedFiles: "✅ Selected {count} file(s)",
        recordsCount: "{count} record(s)",
        autoOpenView: "Auto-open MindDump View on vault open",
        autoOpenViewDesc: "Automatically open MindDump View when Obsidian starts",
        mindDumpUpdatedAt: "Updated",
        pasteImageUploadFailed: "Image upload failed: {error}",
        cardMenuShare: "Share",
        cardMenuEdit: "Edit",
        cardMenuPinTop: "Pin to top",
        cardMenuFloatingWindow: "Add to floating window",
        cardMenuRelatedNotes: "Related notes",
        cardMenuCopyLink: "Copy link",
        cardMenuAnnotate: "Annotate",
        cardMenuMore: "More",
        cardMenuMoreOpenNote: "Open in editor",
        cardMenuMoreCopyMarkdown: "Copy Markdown",
        cardMenuDelete: "Delete",
        cardMenuWordCount: "Characters: {count}",
        cardMenuEditedAtFooter: "Edited at {time}",
        cardMenuLinkCopied: "Link copied",
        cardMenuShareCopied: "Copied to clipboard",
        cardMenuDeleted: "Moved to recycle bin",
        cardMenuDeleteConfirm: "Delete this mind dump? It will go to the recycle bin; you can remove it permanently there.",
        cardMenuComingSoon: "Coming soon",
        cardMenuAiBadge: "AI",
        cardMenuRestore: "Restore",
        cardMenuPurge: "Delete permanently",
        cardMenuPurgeConfirm: "Permanently delete this mind dump? This cannot be undone.",
        cardMenuRestored: "Restored",
        cardMenuPurged: "Permanently deleted",
        rightRailAllTags: "All tags",
        rightRailRecycleBin: "Recycle bin",
        recycleBinEmpty: "Recycle bin is empty",
        recycleBinRetentionBanner: "Notes in the recycle bin for more than 30 days will be automatically deleted.",
        recycleBinEmptyAll: "Empty recycle bin",
        recycleBinEmptyAllConfirm: "Empty the recycle bin? All mind dumps in it will be permanently deleted. This cannot be undone.",
        recycleBinAllPurged: "Permanently deleted {count} mind dump(s).",
        recycleBinAutoPurged: "Permanently removed {count} recycle bin mind dump(s) older than 30 days.",
        rightRailTagSort: "Sort",
        rightRailTagSortNameAsc: "Name A → Z",
        rightRailTagSortNameDesc: "Name Z → A",
        rightRailTagSortCountDesc: "Usage count (high → low)",
        rightRailTagSortCountAsc: "Usage count (low → high)",
        mindDumpListSortButton: "Sort list",
        mindDumpListSortCreatedDesc: "Created (newest first)",
        mindDumpListSortCreatedAsc: "Created (oldest first)",
        mindDumpListSortUpdatedDesc: "Updated (newest first)",
        mindDumpListSortUpdatedAsc: "Updated (oldest first)",
        rightRailTagFilterPlaceholder: "Filter tags…",
        rightPanelCollapse: "Collapse side panel",
        rightPanelExpand: "Expand side panel",
    }
};

/** Keys whose values are localized strings (not string[] like weekdays). */
export type TranslationStringKey = {
    [K in keyof Translations]: Translations[K] extends string ? K : never;
}[keyof Translations];

export function t(key: TranslationStringKey, lang: Language, params?: Record<string, string>): string {
    const text = translations[lang][key] as string;
    if (!params) return text;
    return Object.entries(params).reduce((result, [param, value]) => {
        return result.replace(`{${param}}`, value);
    }, text);
}
