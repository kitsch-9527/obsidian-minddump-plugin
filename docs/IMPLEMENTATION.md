# Obsidian Jot Plugin - 数据存储与读取实现详解

## 1. 项目概述

**Jot** 是一个 Obsidian 笔记插件，用于快速捕获和整理零散的想法（Quickly capture and organize fleeting thoughts）。

### 基本信息
- 版本：1.1.0
- 最低 Obsidian 版本：0.15.0
- 依赖：`moment` 时间处理库

## 2. 项目结构

```
obsidian-jot-plugin/
├── src/
│   ├── main.ts          # 插件主入口（JotPlugin 类）
│   ├── view.ts          # JotView 视图组件（主 UI）
│   ├── capture-modal.ts # 快速记录模态框
│   ├── settings.ts       # 设置页面
│   ├── i18n.ts          # 国际化（中文/英文）
│   ├── types.ts         # 类型定义
│   └── utils.ts         # 工具函数（文件解析、附件处理、自动完成）
├── styles.css           # 样式文件
├── manifest.json        # 插件清单
├── package.json         # 项目配置
└── esbuild.config.js    # 构建配置
```

## 3. 核心模块详解

### 3.1 main.ts - 插件主类

**JotPlugin** 是插件的主类，继承自 Obsidian 的 `Plugin`。

#### 主要功能

1. **插件初始化 (`onload`)**
   - 加载设置
   - 注册视图类型 `VIEW_TYPE_JOTS`
   - 添加侧边栏图标（自定义 bolt 图标）
   - 注册命令：`open-jot-view`（打开视图）、`quick-capture`（快速记录）
   - 注册编辑器菜单项：选中文字后可"保存为 Jot"
   - 可选自动打开 Jot 视图

2. **视图激活 (`activateView`)**
   - 获取或创建 `VIEW_TYPE_JOTS` 类型的 leaf
   - 加载 jots 数据

3. **数据保存 (`saveJot`)**
   - 处理固定标签（`useFixedTag`）
   - 合并标签并去重
   - 处理附件链接（图片用 `![[path]]`，文件用 `[[path]]`）
   - 根据模式保存到多文件或单文件

4. **文件保存模式**

   **多文件模式 (`saveToMultiFile`)** - lines 196-238
   - 每天一个文件，文件名为 `multiFileFormat`（默认 `jot-YYYYMMDD`）
   - 新记录插入到 frontmatter 之后、原有内容之前
   - 支持 YAML frontmatter 标签（`enableTagsInFrontmatter`）

   **单文件模式 (`saveToSingleFile`)** - lines 241-272
   - 所有记录保存在 `Jots/jots.md`
   - 新记录同样插入到顶部

5. **数据加载 (`loadJotsData`)** - lines 124-149
   - 读取保存文件夹下所有 `.md` 文件
   - 调用 `parseFileContent` 解析内容
   - 按时间倒序排列

## 4. 数据存储格式

### 4.1 单条记录格式

```markdown
### 2026-04-30 11:22:33

记录内容，支持 Markdown 格式。

#tag1 #tag2 #tag3

来源: 来源信息
或者 Source: 来源信息（英文模式）

![[附件图片.png]]
[[附件文件.pdf]]

---
```

### 4.2 多文件模式完整文件示例

**文件**: `Jots/jot-20260430.md`

```yaml
---
tags:
  - work
  - projectA
---

### 2026-04-30 11:22:33

这是我的一条随手记内容，支持 **Markdown** 格式。

#work #projectA

来源: https://example.com

![[jot-20260430-001.png]]

---

### 2026-04-30 09:15:00

另一条记录

#idea

---
```

### 4.3 单文件模式完整文件示例

**文件**: `Jots/jots.md`

```markdown
### 2026-04-30 11:22:33

随手记内容

#tag1 #tag2

来源: 来源信息

![[附件.png]]

---

### 2026-04-29 18:30:00

昨天的随手记

#tag3

---
```

## 5. 数据存储算法详解

### 5.1 写入算法 (saveToMultiFile / saveToSingleFile)

**核心流程**:

```typescript
async saveToMultiFile(dateStr, fullDateTime, content, tags) {
  // 1. 构建文件名
  const filename = multiFileFormat.replace("YYYYMMDD", dateStr.replace(/-/g, ""));
  const filePath = `${folder}/${filename}.md`;

  // 2. 构建新记录模板
  const newEntry = `### ${fullDateTime}\n\n${content}\n\n---\n\n`;

  // 3. 检查文件是否存在
  if (existingFile instanceof TFile) {
    // 4a. 文件存在 - 使用 vault.process() 原子性写入
    await this.app.vault.process(existingFile, (data) => {
      // 查找 frontmatter
      const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
      if (frontmatterMatch) {
        // 插入到 frontmatter 之后
        return beforeFrontmatter + newEntry + afterFrontmatter;
      } else {
        // 无 frontmatter，插入到文件开头
        return newEntry + fileContent;
      }
    });
  } else {
    // 4b. 文件不存在 - 创建新文件
    // 如果启用 frontmatter 标签，添加 YAML frontmatter
    let frontmatter = "";
    if (enableTagsInFrontmatter && tags.length > 0) {
      frontmatter = "---\ntags:\n" + tags.map(t => `  - ${t}`).join("\n") + "\n---\n\n";
    }
    await this.app.vault.create(filePath, frontmatter + newEntry);
  }
}
```

**关键设计**:
- **原子性写入**: 使用 `vault.process()` API，确保并发写入不会丢失数据
- **Frontmatter 处理**: 新记录插入在 frontmatter 之后，保证 frontmatter 在文件顶部
- **新记录置顶**: 总是将新记录插入到文件/现有内容的最前面（最新记录最显眼）

### 5.2 读取算法 (loadJotsData + parseFileContent)

**loadJotsData** (main.ts lines 124-149):
```typescript
private async loadJotsData() {
  // 1. 获取保存文件夹
  const folder = normalizePath(this.settings.saveFolder);
  const folderObj = this.app.vault.getAbstractFileByPath(folder);

  // 2. 筛选所有 .md 文件
  const files = folderObj.children.filter(
    f => f instanceof TFile && f.name.endsWith(".md")
  );

  // 3. 遍历解析每个文件
  for (const file of files) {
    const content = await this.app.vault.read(file as TFile);
    const entries = parseFileContent(content, file.path, this.lang);
    allJots.push(...entries);
  }

  // 4. 按时间倒序排序
  allJots.sort((a, b) => {
    const dateA = moment(a.date + " " + a.time, "YYYY-MM-DD HH:mm:ss");
    const dateB = moment(b.date + " " + b.time, "YYYY-MM-DD HH:mm:ss");
    return dateB.valueOf() - dateA.valueOf();
  });

  this.jots = allJots;
}
```

**parseFileContent** (utils.ts lines 28-122) - 核心解析逻辑:
```typescript
function parseFileContent(content, filePath, lang) {
  const entries = [];
  const lines = content.split("\n");
  let i = 0;

  // 支持的来源前缀（中英文）
  const sourcePrefixes = lang === 'zh' ? ["来源:"] : ["Source:", "来源:"];

  while (i < lines.length) {
    const line = lines[i].trim();

    // 1. 匹配时间戳标题 "### YYYY-MM-DD HH:mm:ss"
    if (line.startsWith("### ")) {
      const fullDateTime = line.substring(4).trim();
      const [date, time] = fullDateTime.split(" ");

      // 2. 解析该条记录的内容
      let jotContent = "";
      let tags = [];
      let source = "";
      let attachments = [];
      let attachmentTypes = [];

      // 3. 读取直到下一条记录或文件结束
      while (j < lines.length && !lines[j].trim().startsWith("### ")) {
        const trimmedLine = lines[j].trim();

        // 跳过空行和分隔线
        if (!trimmedLine || trimmedLine === "---") { j++; continue; }

        // 3a. 匹配标签行: #tag1 #tag2 #tag3
        if (trimmedLine.match(/^#[\w一-鿿\/\-_]+(\s+#[\w一-鿿\/\-_]+)*$/)) {
          const tagMatches = trimmedLine.match(/#[\w一-鿿\/\-_]+/g);
          tags = tagMatches.map(t => t.substring(1));
        }
        // 3b. 匹配来源行: 来源: xxx 或 Source: xxx
        else if (sourcePrefixes.some(p => trimmedLine.startsWith(p))) {
          source = trimmedLine.substring(matchedPrefix.length).trim();
        }
        // 3c. 匹配附件行: ![[image.png]] 或 [[file.pdf]]
        else if (trimmedLine.match(/^(!?\[\[[^\]]+\]\])$/)) {
          attachments.push(match[1]);
          attachmentTypes.push(trimmedLine.startsWith("![[") ? "image" : "file");
        }
        // 3d. 其他都是内容行
        else {
          jotContent += (jotContent ? "\n" : "") + lines[j];
        }

        j++;
      }

      // 4. 构建 Jot 对象
      if (jotContent.trim() || tags.length > 0) {
        entries.push({
          date, time,
          content: jotContent.trim(),
          tags,
          source,
          fullText: jotContent.trim(),
          attachments,
          attachmentTypes,
          filePath
        });
      }

      i = j;
    } else {
      i++;
    }
  }

  return entries;
}
```

**解析算法特点**:
- **状态机式解析**: 按行遍历，根据内容类型进入不同处理分支
- **时间戳驱动**: 以 `### YYYY-MM-DD HH:mm:ss` 模式作为记录边界
- **智能类型识别**:
  - 标签: `#` 开头，支持中文、斜杠嵌套
  - 来源: `来源:` 或 `Source:` 前缀
  - 附件: `![[` 为图片，`[[` 为文件
- **多语言支持**: 根据语言设置选择来源前缀

## 6. 附件存储机制

### 6.1 附件处理流程 (handleAttachment - utils.ts lines 127-197)

```typescript
async function handleAttachment(app, file, settings, lang, callback) {
  // 1. 确保附件目录存在
  const attachmentsFolder = settings.attachmentsFolder;
  if (!app.vault.getAbstractFileByPath(attachmentsFolder)) {
    await app.vault.createFolder(attachmentsFolder);
  }

  // 2. 查找当天已有的附件，获取最大序号
  const dateStrNoDash = moment().format("YYYYMMDD");
  const existingFiles = folder.children.filter(
    f => f instanceof TFile && f.name.startsWith(`jot-${dateStrNoDash}`)
  );
  // 从文件名 jot-YYYYMMDD-NNN.ext 提取 NNN

  // 3. 生成唯一文件名（防冲突）
  let serialNumber = String(maxNumber + 1).padStart(3, "0");
  const filename = `jot-${dateStrNoDash}-${serialNumber}.${ext}`;
  // 循环直到找到不存在的文件名（最多100次）

  // 4. 保存文件
  await app.vault.createBinary(filePath, arrayBuffer);

  // 5. 回调返回路径和类型
  callback({ path: filePath, type: isImage ? "image" : "file" });
}
```

### 6.2 附件命名格式

```
jot-YYYYMMDD-NNN.ext
```

示例:
- `jot-20260430-001.png`
- `jot-20260430-002.pdf`
- `jot-20260430-003.jpg`

## 7. 关键数据结构

### 7.1 JotSettings 配置

```typescript
interface JotSettings {
  saveFolder: string;              // 保存文件夹，默认 "Jots"
  logMode: "single" | "multi";     // 单文件/多文件模式
  useFixedTag: boolean;             // 是否使用固定标签
  fixedTag: string;                // 固定标签值
  enableTagsInFrontmatter: boolean; // 多文件模式下写入 frontmatter
  multiFileFormat: string;          // 多文件模式文件名格式
  attachmentsFolder: string;        // 附件存放目录
  language: Language;               // 语言
  autoOpenView: boolean;            // 启动时自动打开视图
}
```

### 7.2 Jot 单条记录

```typescript
interface Jot {
  date: string;                    // "YYYY-MM-DD"
  time: string;                    // "HH:mm:ss"
  content: string;                 // Markdown 内容
  tags: string[];                  // 标签数组（无 # 前缀）
  source: string;                  // 来源
  fullText: string;                // 同 content
  attachments?: string[];          // 附件路径数组
  attachmentTypes?: ("image" | "file")[];  // 附件类型
  filePath?: string;               // 来源文件路径
}
```

## 8. UI 视图 (view.ts)

**JotView** 继承自 `ItemView`，是插件的主 UI 界面。

### 布局模式

1. **主布局（宽度 >= 450px）**
   - 左侧：输入区域 + 记录列表
   - 右侧：统计、日历、搜索

2. **侧边栏布局（宽度 < 450px）**
   - 垂直堆叠：新增按钮 + 统计 + 日历 + 搜索 + 列表

### 核心功能

1. **记录输入**
   - Markdown 文本域
   - Wiki 链接自动完成（输入 `[[` 触发）
   - 标签输入（带自动完成）
   - 来源字段
   - 附件拖放上传

2. **日历组件**
   - 月份导航
   - 有记录的天数高亮显示
   - 点击日期过滤记录（`date:YYYY-MM-DD`）

3. **搜索与标签过滤**
   - 关键词搜索（300ms 防抖）
   - 标签按钮点击切换过滤
   - 搜索结果关键词高亮

4. **记录列表**
   - 按日期分组显示
   - Markdown 内容渲染（使用 `MarkdownRenderer`）
   - 点击记录跳转源文件并定位

## 9. 入口点

- **Ribbon 图标**: 点击打开 JotView
- **命令面板**: `jot: 打开随手记视图`、`jot: 快速记录`
- **编辑器菜单**: 选中文字后"Save as Jot"

## 10. 数据流图

```
用户输入
    ↓
[saveJot()]
    ↓
构建 Jot 文本格式
    ↓
logMode === "multi" ? [saveToMultiFile()] : [saveToSingleFile()]
    ↓
vault.process() / vault.create()
    ↓
写入 .md 文件

读取时:
vault.read() → [parseFileContent()] → Jot[] → 排序 → JotView 渲染
```
