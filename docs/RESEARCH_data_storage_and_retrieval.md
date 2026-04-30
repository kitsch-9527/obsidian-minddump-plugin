# 调研报告：Jot 插件数据存储与读取机制

## 概述

本文档详细调研 Jot Obsidian 插件如何将随手记数据存储到 Markdown 文件，以及后续如何从文件中读取并解析数据。

---

## 一、数据模型

### Jot 数据结构

```typescript
interface Jot {
    date: string;           // "YYYY-MM-DD" 格式的日期
    time: string;           // "HH:mm:ss" 格式的时间
    content: string;        // Markdown 格式的笔记内容
    tags: string[];         // 标签数组（不含 # 前缀）
    source: string;         // 来源信息
    fullText: string;       // 与 content 相同
    attachments?: string[]; // 附件路径数组
    attachmentTypes?: ("image" | "file")[];  // 附件类型
    filePath?: string;      // 源 .md 文件路径
}
```

**关键设计点**：
- `date` 和 `time` 来自写入时的**当前系统时间**，非文件修改时间
- `filePath` 用于追踪该 Jot 所属的源文件（多文件模式下有用）

---

## 二、存储机制

### 2.1 两种存储模式

插件通过 `settings.logMode` 控制存储模式：

| 模式 | 配置值 | 存储方式 |
|------|--------|----------|
| 多文件模式 | `"multi"` | 每天一个 `.md` 文件 |
| 单文件模式 | `"single"` | 所有笔记存储在 `Jots/jots.md` |

### 2.2 多文件模式 (logMode: "multi")

**文件命名规则**：
```
settings.saveFolder/jot-YYYYMMDD.md
```
- 默认格式：`jot-YYYYMMDD`（可配置 `multiFileFormat`）
- 示例：`Jots/jot-20260430.md`

**写入流程** (`main.ts:196-239 saveToMultiFile()`)：

```
1. 构建文件名
   dateStr = "2026-04-30" → 替换 multiFileFormat 中的 YYYYMMDD
   filePath = "Jots/jot-20260430.md"

2. 检查文件夹是否存在，不存在则创建

3. 检查目标文件是否存在
   ┌─ 存在 ──────────────────────────────────────────────────┐
   │ 使用 vault.process() 原子性写入：                      │
   │   - 匹配 frontmatter 正则: /^---\n([\s\S]*?)\n---\n/     │
   │   - 若有 frontmatter：在其之后插入新条目                 │
   │   - 若无 frontmatter：在文件头部插入新条目               │
   └─────────────────────────────────────────────────────────┘
   ┌─ 不存在 ────────────────────────────────────────────────┐
   │ 创建新文件：                                            │
   │   - 若 enableTagsInFrontmatter=true：写入 YAML frontmatter │
   │   - 写入新条目                                          │
   └─────────────────────────────────────────────────────────┘

4. 新条目格式：
   ### YYYY-MM-DD HH:mm:ss

   {content}

   {可选: #tag1 #tag2}

   {可选: 来源: source}

   {可选: ![[image.png]] 或 [[file.pdf]]}

   ---
```

### 2.3 单文件模式 (logMode: "single")

**文件路径**：`Jots/jots.md`

**写入流程** (`main.ts:241-272 saveToSingleFile()`)：
- 与多文件模式类似，但文件名固定为 `jots.md`
- 不支持 frontmatter tags（简化处理）

### 2.4 条目模板详解

每个 Jot 条目的完整格式：

```markdown
### 2026-04-30 15:30:00

这是笔记内容，可以是多行 Markdown 格式。

#tag1 #tag2 #work

来源: 会议记录

![[attachment.png]]

---
```

**组成说明**：
| 部分 | 格式 | 说明 |
|------|------|------|
| 标题 | `### YYYY-MM-DD HH:mm:ss` | Jot 的时间戳，作为条目分隔符 |
| 内容 | 任意 Markdown | 主要文本内容 |
| 标签行 | `#tag1 #tag2` | 可选，空白符分隔的标签 |
| 来源行 | `来源:` 或 `Source:` | 可选，带语言前缀 |
| 附件行 | `![[path]]` 或 `[[path]]` | 可选图片或其他文件 |
| 分隔符 | `---` | 条目结束标记 |

### 2.5 原子性写入

**核心机制**：`vault.process()`

```typescript
await this.app.vault.process(existingFile, (data) => {
    // data = 文件现有内容
    // 返回新的文件内容
    // Obsidian 保证此操作的原子性
});
```

**为什么重要**：
- 防止多设备同步时的写冲突
- 避免数据丢失（若写入中途崩溃，原始文件不变）

### 2.6 Frontmatter 处理

**正则**：`/^---\n([\s\S]*?)\n---\n/`

**行为**：
- 若文件有 frontmatter，新条目插入到 frontmatter 之后
- 若文件无 frontmatter，新条目插入到文件头部
- frontmatter 仅在多文件模式且 `enableTagsInFrontmatter=true` 时生成

---

## 三、读取机制

### 3.1 完整读取流程

```
loadJotsData()  (main.ts:124-149)
    │
    ├─ 获取 settings.saveFolder 下的所有 .md 文件
    │
    ├─ 遍历每个文件：
    │   ├─ 读取文件内容 vault.read(file)
    │   └─ 调用 parseFileContent() 解析
    │
    └─ 按时间降序排序所有 Jot
        返回 this.jots[]
```

### 3.2 内容解析算法

**函数**：`parseFileContent(content, filePath, lang)` (`utils.ts:28-122`)

```
输入：文件完整内容、文件路径、语言设置
输出：Jot[] 数组

解析步骤：
1. 按行分割内容

2. 逐行扫描，寻找 "### YYYY-MM-DD HH:mm:ss" 模式
   - 行首为 "### " 即为新条目开始

3. 每个条目的解析（直到遇到下一个 "### " 或文件结束）：
   ┌─ 跳过空行 ─────────────────────────────────────────────┐
   │                                                        │
   │  标签行检测：                                           │
   │    正则: /^#[\w一-鿿\/\-_]+(\s+#[\w一-鿿\/\-_]+)*$/ │
   │    匹配则提取所有 #tag                                  │
   │                                                        │
   │  来源行检测：                                           │
   │    前缀: "来源:" (zh) 或 "Source:" (en)                 │
   │    匹配则提取来源文本                                   │
   │                                                        │
   │  附件行检测：                                           │
   │    正则: /!?\[\[(.*?)\]\]/                             │
   │    ![[ ]] 为图片，[[ ]] 为普通文件                      │
   │                                                        │
   │  内容行：以上都不匹配时，作为内容累积                   │
   │                                                        │
   └────────────────────────────────────────────────────────┘

4. 构建 Jot 对象：
   {
     date: "YYYY-MM-DD",      // 从 ### 行提取
     time: "HH:mm:ss",        // 从 ### 行提取
     content: "...",          // 累积的内容行
     tags: ["tag1", "tag2"],  // 提取的标签（去 #）
     source: "...",           // 来源文本
     fullText: "...",        // 同 content
     attachments: [...],      // 附件路径
     attachmentTypes: [...],  // ["image", "file"]
     filePath: "Jots/jot-..." // 源文件路径
   }

5. 返回所有 Jot 数组
```

### 3.3 排序逻辑

```typescript
allJots.sort((a, b) => {
    const dateA = moment(a.date + " " + a.time, "YYYY-MM-DD HH:mm:ss");
    const dateB = moment(b.date + " " + b.time, "YYYY-MM-DD HH:mm:ss");
    return dateB.valueOf() - dateA.valueOf();  // 降序，最新的在前
});
```

---

## 四、关键设计决策

### 4.1 以内容时间戳为主，非文件 mtime

**决策**：插件以 Jot 内容中的 `### YYYY-MM-DD HH:mm:ss` 作为唯一日期依据。

**理由**：
- 保持笔记时间与实际记录时间一致
- 不依赖文件系统行为（跨设备同步时 mtime 可能不可靠）

**影响**：
- 昨日创建今日修改的 Jot 仍显示在昨日日期下
- 不支持按"最后修改时间"过滤

### 4.2 原子性写入防止数据丢失

使用 `vault.process()` 而非直接 `vault.modify()`，确保并发写入安全。

### 4.3 标签行使用正则识别

**标签行正则**：`/^#[\w一-鿿\/\-_]+(\s+#[\w一-鿿\/\-_]+)*$/`

**支持**：
- 中文字符标签（一-鿿）
- 斜杠分隔的层级标签（project/work）
- 横线分隔（foo-bar）
- 多标签空格分隔

---

## 五、附件存储机制

### 5.1 附件命名

```
jot-YYYYMMDD-NNN.ext
```
- `YYYYMMDD`：日期（无横线）
- `NNN`：三位序列号（001, 002, ...）
- `ext`：原始文件扩展名

### 5.2 序列号冲突处理

```typescript
// 查找同日期现有文件的最大序列号
// 循环生成直到文件名不冲突（最多 100 次）
do {
    maxNumber++;
    serialNumber = String(maxNumber).padStart(3, "0");
    filename = `jot-${dateStrNoDash}-${serialNumber}.${ext}`;
} while (app.vault.getAbstractFileByPath(filePath) && attempts < maxAttempts);
```

### 5.3 附件类型判断

```typescript
const isImage = file.type.startsWith("image/");
callback({ path: filePath, type: isImage ? "image" : "file" });
```

---

## 六、数据流图

### 写入流程

```
用户输入 → saveJot()
    │
    ├─ 收集 tags, content, source, attachments
    │
    ├─ 生成时间戳: moment(now).format("YYYY-MM-DD HH:mm:ss")
    │
    ├─ 构建 tagLine: "#tag1 #tag2 #tag3"
    │
    ├─ 构建完整条目内容:
    │   "### YYYY-MM-DD HH:mm:ss\n\n{content}\n\n{tags}\n\n{source}\n\n{attachments}\n\n---\n\n"
    │
    └─ 根据 logMode 分发:
           │
           ├─ "multi" → saveToMultiFile()
           │       ├─ 构建文件名: jot-YYYYMMDD.md
           │       ├─ vault.process() 原子插入
           │       └─ (可选) 创建 frontmatter
           │
           └─ "single" → saveToSingleFile()
                   └─ vault.process() 插入到 jots.md
```

### 读取流程

```
loadJotsData()
    │
    ├─ 获取 saveFolder 下所有 .md 文件
    │
    ├─ 遍历文件:
    │   ├─ vault.read(file) → content
    │   └─ parseFileContent(content, path, lang) → Jot[]
    │
    ├─ 合并所有 Jot[]
    │
    └─ 按时间降序排序
            ↓
        this.jots[]
```

---

## 七、相关代码索引

| 功能 | 文件位置 | 函数/代码 |
|------|----------|-----------|
| 入口 | main.ts:151 | `saveJot()` |
| 多文件写入 | main.ts:196 | `saveToMultiFile()` |
| 单文件写入 | main.ts:241 | `saveToSingleFile()` |
| 读取入口 | main.ts:124 | `loadJotsData()` |
| 内容解析 | utils.ts:28 | `parseFileContent()` |
| 标签行识别 | utils.ts:64 | 正则匹配 |
| 来源行识别 | utils.ts:73 | 前缀匹配 |
| 附件处理 | utils.ts:127 | `handleAttachment()` |
| Jot 类型定义 | types.ts:16 | `interface Jot` |

---

## 八、配置项汇总

| 配置项 | 默认值 | 作用 |
|--------|--------|------|
| `saveFolder` | `"Jots"` | 存储文件夹 |
| `logMode` | `"multi"` | 存储模式 |
| `multiFileFormat` | `"jot-YYYYMMDD"` | 多文件模式文件名格式 |
| `enableTagsInFrontmatter` | `true` | 是否在 frontmatter 写入标签 |
| `attachmentsFolder` | `"Jots/attachments"` | 附件存储目录 |
| `useFixedTag` | `false` | 是否强制添加固定标签 |
| `fixedTag` | `"jot"` | 强制添加的固定标签 |
