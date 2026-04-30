# 交付说明：快速记录图片粘贴（对照需求 FR / MVP）

## 1. 范围与已执行阶段

| 阶段 | 内容 | 状态 |
|------|------|------|
| **剪贴板识别** | 从 `DataTransfer` 收集图片文件（优先 `files`，否则遍历 `items`）；`image/*` 与 `application/octet-stream` + 常见图片扩展兜底 | 已实现（`utils.ts`） |
| **粘贴入口** | 快速记录主视图与 `CaptureModal` 输入区 `textarea` 监听 `paste`；仅当存在剪贴板图片时 `preventDefault`，否则不拦截 | 已实现（`view.ts` / `capture-modal.ts`） |
| **上传与正文** | 逐张 `await` 调用既有 `handleAttachment`（命名、目录、重名序列与手动上传同链路）；成功则于光标处插入 `![[vaultPath]]` | 已实现 |
| **失败提示** | 上传异常时使用独立文案键 `pasteImageUploadFailed`（含 `{error}`），不中断循环中后续图片 | 已实现 |
| **i18n** | 中英文 `pasteImageUploadFailed` 文案 | 已实现（`i18n.ts`） |

**需求已列 Out of Scope（本期未做）**：图片压缩/裁剪/格式转换、拖拽体验改造、富文本内嵌预览、云端图床。

**代码仓库未新增**：针对本需求的自动化测试用例；验收以手动操作为主。

---

## 2. 需求 → 实现映射（FR-1～FR-5 + MVP）

| 编号 | 需求要点 | 实现位置（概要） |
|------|-----------|------------------|
| **FR-1** | 输入区监听 `paste`；有图时拦截默认；仅文本时保持原行为 | `view.ts` 与 `capture-modal.ts`：`textarea.addEventListener("paste", …)`；`getClipboardImageFiles` 为空则直接 return；有图时 `e.preventDefault()` |
| **FR-2** | 粘贴图走已有附件上传；路径/命名/重名与手动一致 | 与主视图/模态框「点击选文件 / 拖到附件区」一致调用 `handleAttachment` → `utils.handleAttachment`（`jot-YYYYMMDD-序号.ext`、附件目录配置等） |
| **FR-3** | 成功后插入与手动一致的附件引用；多图按剪贴板顺序；编辑区立即可见 | 成功且 `type === "image"` 时 `insertMarkdownEmbedAtCursor` → `![[path]]`；`for (const file of imageFiles)` 顺序处理 |
| **FR-4** | 单张失败可提示；不阻塞后续图；不破坏已输入文本 | `handleAttachment` 失败分支 `failureNoticeKey: "pasteImageUploadFailed"`；`try/catch` 内 `Notice` 后仍继续循环；不在失败时清空 `textarea` |
| **FR-5** | 单/多文件模式一致；不替代手动附件入口 | 保存仍走 `saveJot` → `composeJotMarkdownBody`；`logMode` 仅影响落盘文件，粘贴逻辑未分支 |
| **MVP-1** | 粘贴后图片写入附件目录 | ✅ `handleAttachment` → `vault.createBinary` |
| **MVP-2** | 插入与手动一致的图片引用且编辑区可见 | ✅ 光标处插入 `![[path]]` |
| **MVP-3** | 连续多图按顺序插入 | ✅ 按 `imageFiles` 数组顺序串行 `await` |
| **MVP-4** | 纯文本粘贴不受影响 | ✅ 无图片文件则提早返回、不 `preventDefault` |
| **MVP-5** | 上传失败有提示且可继续输入与保存 | ✅ 见 FR-4 |
| **MVP-6** | 单文件 / 多文件模式下上述用例均适用 | ✅ 仅用 `saveJot`，无单独分支 |

---

## 3. 关键设计决策

1. **复用 `handleAttachment`**：粘贴不复制上传实现；仅增加可选 `failureNoticeKey`，使粘贴失败提示与通用 `saveFailed` 区分，满足「明确图片上传失败」的文案诉求。
2. **剪贴板图片判定**：`isProbablyImageFile` 信任 `image/*`；对空 MIME 或 `application/octet-stream` 用扩展名白名单（`png/jpe?g/gif/webp/bmp/svg/heic/heif/avif`），覆盖部分平台粘贴怪癖。
3. **多源取文件**：优先 `dataTransfer.files`（多图场景避免只依赖单项）；若无再扫 `items` 中 `kind === "file"` 且类型为图片或 octet-stream 的项。
4. **图文混合剪贴板**：拦截后若存在 `text/plain`，在全部图片处理完毕后调用 `insertTextAtCursor` 写入纯文本，并 `textarea.focus()`，降低「只贴了图丢了说明文字」的风险。
5. **光标处插入**：`insertMarkdownEmbedAtCursor` / `insertTextAtCursor` 基于 `selectionStart`/`selectionEnd` 拼接，避免整段替换正文。

---

## 4. 手动验收清单（建议逐步操作）

1. **单图**：在系统截图或复制图片 → 主视图快速记录 `textarea` 聚焦后粘贴 → 确认附件目录新增 `jot-…` 文件，正文中出现 `![[...]]`，光标附近可见该片段。
2. **多图**：同一剪贴板含多张图片（若环境支持）→ 依次粘贴或一次多图 → 确认多张均写入且嵌入顺序与剪贴板文件顺序一致。
3. **纯文本**：仅复制文字粘贴 → 行为与改动前一致（未拦截、正常插入文本）。
4. **图文并存**：同时含图片与纯文本的剪贴板（若可构造）→ 确认图片先按序插入、随后补充纯文本（以当前实现顺序为准），焦点仍在输入区。
5. **失败路径**：人为制造写入失败（例如附件目录权限、磁盘满等，视环境而定）→ 应出现含「图片上传失败」语义的 Notice（中文为「图片上传失败：{error}」），输入框内容未被清空，仍可继续打字并保存。
6. **存储模式**：在设置中分别使用单文件 / 多文件日志模式各执行一次「粘贴图 → 保存」→ 记录正文中均应保留图片嵌入，附件文件均在配置的附件目录中。

---

## 5. 已知限制与后续建议

- **入口范围**：当前已覆盖主视图「快速记录」卡片与 `CaptureModal` 两个主要录入入口；其他潜在自定义输入入口（若后续新增）需按相同模式接入。
- **附件区计数**：粘贴成功会 `insertMarkdownEmbedAtCursor`，但不会向 `selectedAttachments` 数组 `push`；附件区域「已选文件」数量仅反映点选/拖入的文件。保存时正文中的 `![[path]]` 仍会写入 `composeJotMarkdownBody` 的 `content`，与解析器中「独立成行的链出」规则并存时，列表展示行为以解析逻辑为准（内联于段落的嵌入归在正文行）。
- **成功提示**：每张成功上传仍会触发既有 `attachmentSaved` Notice；多图粘贴可能连续多条提示，若需「更轻量」可后续合并为一条或改为静默。
- **`text/plain` 与多图顺序**：实现为所有图片插入完成后再插入纯文本；若与某些应用剪贴板的「文先图后」默认顺序不一致，属可权衡项。
- **测试**：建议在后续迭代为 `getClipboardImageFiles` / `isProbablyImageFile` 补充单元测试（构造 `DataTransfer` 或替身），并为粘贴回调做单测或集成片段。

---

## 6. 本轮涉及文件（摘要）

- **`src/utils.ts`**：`getClipboardImageFiles`、`isProbablyImageFile`；`handleAttachment` 支持 `options.failureNoticeKey`。
- **`src/view.ts`**：`paste` 监听；`insertTextAtCursor`、`insertMarkdownEmbedAtCursor`；`handleAttachment` 薄封装透传选项。
- **`src/capture-modal.ts`**：`paste` 监听；`insertTextAtCursor`、`insertMarkdownEmbedAtCursor`；`handleAttachment` 支持粘贴专用失败提示透传。
- **`src/i18n.ts`**：`Translations.pasteImageUploadFailed` 及中英语料。

（审查结论：核心 FR 与 MVP 可在上述文件中对齐；未引入与附件无关的新架构层。）
