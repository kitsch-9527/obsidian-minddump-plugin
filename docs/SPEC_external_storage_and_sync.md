# Jot 插件：外部程序存储与同步规格说明

本文档描述 **Obsidian Jot 插件**（`manifest.json` 中 `id`: `obsidian-jot`）在仓库（vault）内的数据布局、Markdown 与附件格式，以及解析与写入时须遵守的约定，供 **非 Obsidian 的外部程序** 做完整同步与双向交互。

版本与源码对应：**插件版本以 `manifest.json` 的 `version` 为准**；下列行为以当前仓库实现为准（`src/main.ts`、`src/utils.ts`、`src/types.ts`）。

---

## 1. 总览

| 概念 | 说明 |
|------|------|
| 数据载体 | 普通 Markdown 文件（`.md`），UTF-8 文本 |
| 记录单位 | 文件中由 `###` 三级标题起始的 **Jot 块**；块与块之间以 `---` 分隔（见下文精确格式） |
| 附件 | Vault 内的二进制文件；块内用 Obsidian **wikilink** 引用 |
| 用户可配置根路径 | `saveFolder`（笔记目录）、`attachmentsFolder`（附件目录）、`logMode`、`multiFileFormat` 等 |

**路径约定**：下文路径均为 **相对于 vault 根目录** 的 POSIX 风格路径（Obsidian 使用 `normalizePath`，通常为正斜杠 `/`）。

---

## 2. 插件配置（外部程序如何得知目录）

插件设置由 Obsidian 持久化，不是 Markdown 的一部分。

- **文件位置**：`<vault>/.obsidian/plugins/obsidian-jot/data.json`
- **内容**：JSON 对象，字段与 `src/types.ts` 中 `JotSettings` 一致（可能与默认值合并后的结果）。

### 2.1 `JotSettings` 字段说明

| 字段 | 类型 | 默认值 | 含义 |
|------|------|--------|------|
| `saveFolder` | string | `Jots` | 存放 `.md` 笔记文件的文件夹（vault 相对路径） |
| `logMode` | `"single"` \| `"multi"` | `"multi"` | 单文件 / 多文件模式 |
| `multiFileFormat` | string | `jot-YYYYMMDD` | 多文件模式下**不含** `.md` 后缀的 basename 模板；其中子串 `YYYYMMDD` 在写入时替换为 **无横线** 的当日日期 `YYYYMMDD` |
| `attachmentsFolder` | string | `Jots/attachments` | 通过插件「粘贴/保存附件」写入二进制文件时使用的目录 |
| `enableTagsInFrontmatter` | boolean | `true` | **仅**在「多文件模式且新建当日文件」时，是否写入 YAML frontmatter 的 `tags` |
| `useFixedTag` / `fixedTag` | boolean / string | `false` / `jot` | 写入每条 Jot **正文**时是否强制追加固定标签（见第 4 节） |
| `language` | `"zh"` \| `"en"` | `zh` | 影响**来源行前缀**及解析时识别的前缀集合（见第 4.4 节） |

**注意**：外部程序应 **读取 `data.json`** 以适配用户改过的目录；不要硬编码默认路径。

---

## 3. 多文件与单文件布局

### 3.1 扫描范围（读取行为）

- 插件加载数据时：枚举 **`saveFolder` 目录的直接子级** 中所有扩展名为 `.md` 的文件（**不递归**子文件夹）。
- **任意**符合第 4 节块语法的 `.md` 都会被解析；不仅限于 `jot-*.md` 或 `jots.md`。

因此外部同步程序应同样：只处理 `saveFolder` 下第一层 `.md`，或明确与用户约定子目录策略（插件本身不读子目录）。

### 3.2 多文件模式（`logMode === "multi"`）

- **文件路径**：`{saveFolder}/{basename}.md`
- **basename 生成**：`multiFileFormat` 中的字面量 `YYYYMMDD` 替换为 `YYYY-MM-DD` 去掉横线后的 8 位数字。  
  - 例：`multiFileFormat = "jot-YYYYMMDD"`，日期 `2026-05-01` → 文件 `Jots/jot-20260501.md`
- 若配置的文件名 **不以 `.md` 结尾**，插件会自动追加 `.md`。

**新建文件**（该日文件尚不存在）时：

- 若 `enableTagsInFrontmatter === true` 且本条笔记写入时合并后的标签列表非空，则在文件**开头**写入 YAML：

```yaml
---
tags:
  - tagA
  - tagB
---
```

- 随后写入**第一条** Jot 块（见第 4 节）。

**追加到已有文件**时：

- 新块插入在 **frontmatter 结束之后、旧正文之前**（即文件顶部紧跟 `---` 闭合之后）。
- 已有文件的 frontmatter **不会**因追加新条而自动更新 `tags`（实现上只插入块，不改旧 frontmatter）。

### 3.3 单文件模式（`logMode === "single"`）

- **固定文件路径**：`{saveFolder}/jots.md`
- 新块同样插入在 frontmatter（若存在）之后、原有内容之前。
- **首次创建** `jots.md` 时：插件只写入第一条 Jot 块正文，**不会**因 `enableTagsInFrontmatter` 而自动生成 YAML（与多文件「新建当日文件」分支不同）；之后若用户或外部程序手动加了 frontmatter，后续追加仍会插在 frontmatter 之后。

---

## 4. Markdown 文件格式（Jot 块规格）

每个 **Jot 块** 为从一行 `### ` 开始，到下一个 `### ` 之前（不含）或文件末尾的连续行集合；块末尾由插件写入 **`---` 水平线 + 空行** 作为与下一块的视觉分隔（解析时见第 4.6 节）。

### 4.1 块头部（固定顺序）

写入时由 `formatJotEntryBlock` 生成，结构如下（`\n` 为换行）：

```text
### {fullDateTime}
#### id: {id}
#### updatedAt: {updatedAt}
[#### deleted: true  ← 仅软删除时为该行]
空行
{body}
空行
---
空行
```

- **`fullDateTime`**：创建时间戳字符串，格式 **`YYYY-MM-DD HH:mm:ss`**（与下方 `date` / `time` 拆分规则一致）。
- **`id`**：新记录为 UUID（`crypto.randomUUID`）；无 `#### id:` 的旧数据由实现推导确定性 legacy id（见第 4.5 节）。
- **`updatedAt`**：最后更新时间，格式同上；新建时通常与创建时间相同。
- **`#### deleted: true`**：软删除标记；解析时值为 `true` / `yes` / `1`（不区分大小写）视为已删除。

### 4.2 `date` 与 `time`（逻辑字段）

解析时：取 `###` 行去掉前缀后的整段为 `fullDateTime`，按 **第一个空格** 拆成：

- `date` = 第一部分（期望 `YYYY-MM-DD`）
- `time` = 剩余部分（期望 `HH:mm:ss`）

若格式不标准，仍按上述拆分；`createdAt` 存为 `date` 与 `time` 用空格拼接的结果（与实现一致）。

### 4.3 正文 `body` 的组成顺序（写入与解析一致）

`body` 由 `composeJotMarkdownBody` 组装，**顺序固定**：

1. **正文内容** `content`：多行 Markdown 纯文本（可含列表、代码块等）。
2. **标签行**（可选）：若标签列表非空，在内容后追加 **两个换行**，再追加一行：  
   `#{tag1} #{tag2} ...`  
   - 标签名允许字符（与解析正则一致）：`[\w\u4e00-\u9fff\/\-_]`（单词字符、中文、`_`、`/`、`-`）。
3. **来源行**（可选）：若 `source` 非空，再追加两个换行 + 一行：  
   - 界面语言为中文：`来源: {source}`  
   - 英文：`Source: {source}`
4. **附件行**（可选）：每个附件 **独占一行**，整行 **必须严格** 为下列之一（行首尾可空白，trim 后匹配）：  
   - 图片：`![[vault相对路径或文件名]]`  
   - 普通文件：`[[vault相对路径或文件名]]`  
   - 多附件：每行一个 wikilink，行与行之间 **一个换行**（写入时用 `\n` 连接）。

**固定标签**：当 `useFixedTag` 为 true 且 `fixedTag` 非空时，写入前会把 `fixedTag`（去掉前缀 `#`）加入标签列表再生成标签行（去重规则与 `normalizeJotTags` 一致）。

### 4.3.1 标签与附件在块内的位置（详细说明）

本节约定：**「正文区」**指块头（`###` 与可选的 `#### id` / `#### updatedAt` / `#### deleted`）之后、下一个 `###` 或文件末尾之前的全部行；插件写入时正文区即 `body` 字符串所占据的范围（末尾再接 `\n\n---\n\n`）。

#### 与文件级 `tags` 的区别

- **YAML frontmatter 中的 `tags`**（第 3.2 节）：作用于**整份 `.md` 文件**，仅在多文件模式「新建当日文件」时由插件写入；与单条 Jot 块无逐字段绑定。
- **块内标签行**（本节）：写在**某一条** Jot 的 `body` 末尾区域，只描述该条记录；解析后进入该条的 `tags` 数组。

#### 插件写入时的垂直顺序（自上而下）

`composeJotMarkdownBody` 在**单段连续正文区**内按下列顺序拼接（段与段之间为 **两个换行** `\n\n`，附件多行之间为 **一个换行** `\n`）：

```text
{content}                    ← 用户 Markdown，可多行
[空行空行]
#{tag1} #{tag2} ...          ← 整行仅由空格分隔的 #标签；无标签则整段省略
[空行空行]
来源: …  /  Source: …        ← 可选；与 language 一致的前缀 + 空格 + 文本
[空行空行]
![[path]]                    ← 附件区：每行恰好一条 wikilink
[[path]]
…
```

要点：

- **标签**永远在插件生成的 **用户正文 `content` 之后**；不会在 `content` 第一行之前插入标签行。
- **来源行**在标签行之后（若有标签）；若无标签则在 `content` 之后同样用 `\n\n` 接上来源。
- **附件行**始终在 **来源行之后**（若有来源）；若无来源则在标签或 `content` 之后用 `\n\n` 接上第一条附件行。多条附件自上而下排列，顺序与内存数组顺序一致，解析后 `attachments` / `attachmentTypes` 下标与文件中的行序一致。

#### 解析时的行语义（与写入顺序可不完全一致）

`parseFileContent` 对正文区采用 **自上而下逐行** 扫描（跳过仅空白行及整行仅为 `---` 的行，见第 4.6 节）。对每一行 `trim` 后依次判断：

1. **标签行**：整行匹配  
   `^#[\w\u4e00-\u9fff\/\-_]+(\s+#[\w\u4e00-\u9fff\/\-_]+)*$`  
   则将该行解析为标签列表（去掉 `#`），**写入 `tags` 字段（覆盖，不合并多行）**。若正文中出现**多行**符合该形式的行，**以最后一次匹配的行为准**。
2. **来源行**：以当前 `language` 对应的前缀开头（第 4.4 节），则设置 `source`（**同样覆盖**）。
3. **附件行**：整行严格为 `![[...]]` 或 `[[...]]`（正则 `^(!?\[\[[^\]]+\]\])$`），则把路径推入 `attachments`，类型推入 `attachmentTypes`（**追加**，多行按出现顺序）。
4. **否则**：该行计入 **`content`（与 `fullText`）**，与相邻内容行用换行拼接，**保留行内原始缩进**（使用未 trim 的 `currentLine` 拼接）。

因此：

- **外部程序为与插件 UI 一致**，写入时应采用上一小节的顺序：`content` → 标签行 → 来源 → 附件；避免在「语义行」之间插入会被误判为标签行的纯 `#tag` 行。
- **手工或历史文件**若打乱顺序（例如先写标签行再写正文），解析仍能得到 `tags` 与 `content`，但 **多段标签行只保留最后一段**；夹在两条「标签形」行之间的普通行仍归入 `content`。
- **行内**的 `[[link]]` 或 `![[img]]`（与前后文字同一行）**不会**进入 `attachments`，整行落入 `content`；只有 **独占一行且 trim 后整行仅为一条 wikilink** 时才记为附件。

#### 在整块中的绝对位置小结

| 区域 | 在 `.md` 中的位置 |
|------|-------------------|
| 块头 | `###` 时间 → `#### id` → `#### updatedAt` → 可选 `#### deleted` |
| 正文区首 | 块头后第一个非元数据、非空、非单独 `---` 的行起 |
| 标签行（插件写入） | 正文区中，位于用户正文末段之后 |
| 来源行 | 标签行之后，或（无标签时）正文末段之后 |
| 附件行 | 正文区**最末段语义区**（来源之后，或无前序语义行时紧贴正文/标签之后） |
| 块尾 | 正文区结束后由 `formatJotEntryBlock` 写入 `\n\n---\n\n` |

### 4.4 来源行的解析（与 `language` 相关）

解析函数 `parseFileContent(content, filePath, lang)` 使用的来源前缀：

- `lang === "zh"`：仅识别以 **`来源:`** 开头的行。
- `lang === "en"`：识别以 **`Source:`** 或 **`来源:`** 开头的行。

外部程序若需与插件解析完全一致，应按用户 `data.json` 中的 `language` 选择前缀；若希望两种都兼容，写入时可同时避免歧义——但插件在英文模式下**不会**把其它前缀当来源。

### 4.5 记录 `id`（新建与兼容）

- **新写入**：`#### id:` 使用 UUID 字符串。
- **无 `#### id:` 的旧块**：逻辑 id 为  
  `stableLegacyJotId(filePath, date, time)`  
  即对字符串 `` `${filePath}\0${date}\0${time}` `` 做 FNV-1a 风格 32 位哈希，前缀 `jot-legacy-` + 十六进制。  
  外部程序在 **替换/删除** 块时必须使用与插件相同的 id 规则，否则无法与 `replaceJotBlockById` / `removeJotBlockById` 行为对齐。

### 4.6 正文区域内的空行与 `---`

从头部元数据（`#### id` / `updatedAt` / `deleted`）之后第一个非元数据行起，到下一个 `###` 之前：

- **空行**、**仅含 `---` 的行**：解析时 **跳过**（不进入 content / 标签 / 来源 / 附件逻辑）。
- **整行匹配**标签行、来源行、严格 wikilink 行时按语义处理；否则并入 **content**（保留原始换行与缩进）。

因此：正文里不要随意单独放一行 `---`，会被忽略；块与块之间的分隔依赖插件写入的块尾 `---` 及下一个 `###`。

### 4.7 是否构成一条有效 Jot

以下任一成立即会解析出一条记录（含软删除仅标记、内容全空的情况）：

- `content` trim 后非空，或  
- `tags` 非空，或  
- `source` 非空，或  
- `attachments` 非空，或  
- `deletedMeta === true`

### 4.8 逻辑对象与文件字段对应（便于同步映射）

解析结果对应 `Jot`（概念上）：

| 字段 | 说明 |
|------|------|
| `id` | 见 4.5 |
| `createdAt` | `date` + `time` 拼接 |
| `updatedAt` | `#### updatedAt:` 值；若无则用 `createdAt` |
| `date`, `time` | 自 `###` 行解析 |
| `content` / `fullText` | 正文（trim 后） |
| `tags` | 无 `#` 前缀的字符串数组 |
| `source` | 来源行去掉前缀后的文本 |
| `attachments` | wikilink 内路径字符串数组，与 `attachmentTypes` 一一对应 |
| `attachmentTypes` | `"image"`（`![[`）或 `"file"`（`[[`） |
| `filePath` | 当前解析所在 `.md` 的 vault 路径 |
| `deleted` | 由 `#### deleted:` 解析 |

**列表排序**：插件在合并所有文件中的 Jot 后，按块头 `###` 解析出的 **`date` + `time`（创建时刻）** 解析为 `YYYY-MM-DD HH:mm:ss` **降序**（新在前）；**不是**按 `updatedAt` 排序。

---

## 5. 附件：目录、命名、与 Markdown 的关系

### 5.1 附件目录

- 配置项：`attachmentsFolder`（默认 `Jots/attachments`）。
- 插件启动或保存设置时会尝试创建该文件夹（不存在则创建）。

### 5.2 通过插件保存的新附件文件命名

由 `handleAttachment` 写入 **二进制文件** 时：

- 仅考虑 **当天**（按运行时的本地日历日）已有文件：basename 前缀为 `jot-{YYYYMMDD}-` 的文件。
- 新文件名：  
  `jot-{YYYYMMDD}-{序号3位}.{ext}`  
  - `YYYYMMDD`：当天日期，无横线。  
  - `序号`：十进制，**至少 3 位左侧补零**（001, 002, …），在同日前缀文件中取最大序号 +1；若冲突则递增直至可用（最多尝试 100 次）。  
  - `ext`：来自上传 `File.name` 的扩展名；若无则 `bin`。
- **完整 vault 路径**：`{attachmentsFolder}/{filename}`，例如 `Jots/attachments/jot-20260501-001.png`。

### 5.3 图片与「附件类型」

保存时类型判定（与粘贴剪贴板逻辑共用启发式）：

- MIME 以 `image/` 开头 → 图片；或  
- MIME 为空 / `application/octet-stream` 且扩展名匹配  
  `png|jpe?g|gif|webp|bmp|svg|heic|heif|avif`（忽略大小写）→ 图片。

写入 Markdown 时：**图片** 用 `![[path]]`，否则用 `[[path]]`。

**重要**：`path` 在插件保存附件回调中为 **完整 vault 相对路径**（含 `attachmentsFolder`）。用户通过 wikilink 自动完成插入的 vault 内笔记链接可能仅为 **`[[basename]]`**（无路径），解析后同样出现在 `attachments` 数组中——外部程序解析 wikilink 时应按 Obsidian 规则解析为实际文件（可能需结合 vault 搜索唯一 basename）。

### 5.4 同步建议

- 同步 Jot 时同时扫描每条 `attachments` 中的路径；对 `![[...]]` / `[[...]]` 解析出目标文件并同步二进制内容。
- 删除或移动附件文件时，须同步更新对应 `.md` 中的 wikilink，否则插件 UI 会断链。
- 软删除（`deleted: true`）的块仍保留 wikilink 文本；插件不会自动删除磁盘上的附件文件。

---

## 6. 更新、软删除与永久删除（交互语义）

以下行为与插件菜单/API 一致，外部程序若模拟编辑器需遵循相同文本替换规则。

| 操作 | 行为概要 |
|------|----------|
| **更新** | 在 **原 `filePath` 文件** 内，按 `id` 定位块，替换为新的 `formatJotEntryBlock` 输出；**保留原 `###` 行的 `fullDateTime`**（即创建时间展示不变），更新 `#### updatedAt:` 为当前时间，重写 `body`。 |
| **软删除** | 同上替换块，并增加 `#### deleted: true`；内容/tags/source/附件行仍保留。 |
| **永久删除** | 从文件中 **移除**该 `id` 对应整块（从 `###` 到下一 `###` 前的全部行）。 |
| **回收站过期清理** | 插件侧：软删除且 `updatedAt` 早于当前 30 天的条目会被自动 `purge`（仅当插件运行且定时器触发）；外部同步可忽略或实现自己的保留策略。 |

定位算法要点：与 `replaceJotBlockById` / `removeJotBlockById` 一致——按顺序扫描 `###` 块，读取可选的 `#### id` / `#### updatedAt` / `#### deleted`，直到遇到其它行作为 body 起始；块边界为下一 `###`。

---

## 7. 外部程序最小实现清单

1. 读取 `.obsidian/plugins/obsidian-jot/data.json` 获取 `saveFolder`、`attachmentsFolder`、`logMode`、`multiFileFormat`、`language`、`useFixedTag`、`fixedTag`、`enableTagsInFrontmatter`。
2. 枚举 `saveFolder` 下 **直接**子级 `.md`，按第 4 节解析所有 Jot 块。
3. 展示或合并时使用 `updatedAt` / `date+time` 排序策略与业务约定对齐（插件为按创建时间降序）。
4. 写入新 Jot：遵守第 3、4 节插入位置与 frontmatter 规则；生成新 `id`（建议 UUID）与 `updatedAt`。
5. 修改/删除：必须带正确 `filePath` + `id`；legacy 块无 `#### id:` 时用与插件相同的 `stableLegacyJotId`。
6. 附件：新文件命名遵守第 5.2 节；Markdown 中使用 `![[` 或 `[[` 独占一行。

---

## 8. 参考源码索引

| 主题 | 文件与符号 |
|------|------------|
| 默认设置 | `src/types.ts` → `DEFAULT_SETTINGS` |
| 读目录与排序 | `src/main.ts` → `loadJotsData` |
| 多/单文件写入 | `src/main.ts` → `saveToMultiFile`, `saveToSingleFile` |
| 块格式化 | `src/utils.ts` → `formatJotEntryBlock`, `composeJotMarkdownBody` |
| 解析 | `src/utils.ts` → `parseFileContent` |
| 块替换/删除 | `src/utils.ts` → `replaceJotBlockById`, `removeJotBlockById` |
| Legacy id | `src/utils.ts` → `stableLegacyJotId` |
| 附件落盘 | `src/utils.ts` → `handleAttachment` |

---

## 附录 A：`stableLegacyJotId` 算法（与插件逐位一致）

输入：`filePath`（当前 `.md` 的 vault 路径）、`date`、`time`（来自 `###` 行解析，可为空字符串）。

1. 构造字符串 `s = filePath + "\0" + date + "\0" + time`（UTF-16 代码单元与 JavaScript 一致；通常路径与日期均为 BMP 内 ASCII/中文）。
2. FNV-1a 32 位哈希：  
   - `h = 2166136261`（无符号 32 位，在实现中按 32 位溢出）  
   - 对 `s` 中每个字符代码单元 `c`：  
     - `h = (h ^ c) * 16777619`，结果截断为 32 位（与 JS `Math.imul` + 隐式 `>>> 0` 一致）。
3. 返回 `` `jot-legacy-${(h >>> 0).toString(16)}` ``（十六进制无前置 `0x`，无补零）。

---

*文档结束。*
