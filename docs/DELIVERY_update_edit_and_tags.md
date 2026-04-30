# 交付说明：随手记更新、编辑与标签（对照需求 MVP）

## 1. 范围与已执行阶段

| 阶段 | 内容 | 状态 |
|------|------|------|
| **Phase 1 — 数据层** | `#### id:` / `#### updatedAt:` 解析；无元数据时用 `stableLegacyJotId`；`replaceJotBlockById` 按 id 替换整块；`formatJotEntryBlock` / `composeJotMarkdownBody` 统一落盘格式 | 已实现 |
| **Phase 2 — 插件 API** | `JotPlugin.updateJot()`：`vault.process` 原子替换；失败 `Notice` 且不改文件；成功刷新视图与内存列表 | 已实现 |
| **Phase 3 — 视图与查询** | 卡片短按编辑态、长按打开源文件并滚到条目；`updated:YYYY-MM-DD` 与 `date:`、关键词、标签过滤组合；搜索框提示语法 | 已实现 + 小幅文案 |

**本期未做（需求已列 Out of Scope）**：批量编辑、冲突 UI、复杂时间区间查询、自动化测试套件。

---

## 2. 需求 → 实现映射（FR / MVP）

| 编号 | 需求要点 | 实现位置（概要） |
|------|-----------|------------------|
| **FR-1** | 点击卡片进编辑；长按打开源文件；可改正文、标签、来源；保存/取消 | `view.ts`：`attachCardTapAndLongPress`、`enterEditMode`、`openJot`；编辑区 textarea / 标签 / 来源 / 按钮 |
| **FR-2** | 原地更新、刷新列表、失败不破坏原文 | `main.ts`：`updateJot` + `utils.replaceJotBlockById`；错误时抛错并 `view` 恢复编辑态 |
| **FR-3** | 标签标准化：去 `#`、去重、去空 | `utils.normalizeJotTags`；保存前对 `editSessionTags` 再归一化 |
| **FR-4** | 新建：`createdAt`/`updatedAt` 均为当前；编辑：`createdAt` 不变（`###` 行保持）、`updatedAt` 刷新 | 新建：`formatJotEntryBlock` + `saveJot`；更新：`updateJot` 用原 `date`+`time` 拼 `###`，新 `updatedAt` |
| **FR-5** | `updated:YYYY-MM-DD`，可与标签等联动 | `view.parseSearchFilters` / `filterJots`：`updatedAt.startsWith(updated)` |
| **MVP-1** | 点击进编辑并保存到原记录 | ✅ |
| **MVP-2** | 长按打开对应源文件 | ✅ |
| **MVP-3** | 已有记录增删标签并生效 | ✅ |
| **MVP-4** | 每次编辑后 `updatedAt` 变化 | ✅ |
| **MVP-5** | `updated:YYYY-MM-DD` 可用 | ✅ |
| **MVP-6** | 历史无元数据不报错、可编辑 | 解析用 legacy id；首次保存写入 `id`/`updatedAt` |

---

## 3. 设计决策（偏简单）

1. **按 `id` 定位块**：避免仅靠 `###` 时间戳误替换；磁盘无 `id` 时与解析共用同一套 `stableLegacyJotId(filePath, date, time)`，保证读写一致。
2. **元数据仅限固定两行**：`#### id:`、`#### updatedAt:`，与正文 `####` 标题区分方式 = 固定键名，解析器只认这两类。
3. **不做一次性格式迁移**：旧条目首次编辑时再补齐元数据；列表展示仍依赖解析期内存字段（`updatedAt` 缺省为创建时间）。
4. **交互**：Pointer 事件统一短按/长按，小范围移动取消长按，避免与滚动严重冲突（阈值常量 `CARD_LONG_PRESS_MS` / `CARD_TAP_MOVE_PX`）。

---

## 4. 兼容与迁移行为

| 场景 | 行为 |
|------|------|
| 旧条目仅有 `###` + 正文 + 标签/来源 | 正常解析；`id` 为确定性 legacy 字符串；`updatedAt` 视为 `createdAt` |
| 首次保存编辑 | 该块被替换为带 `#### id:`（保持同一 id）与 `#### updatedAt:` 的新块 |
| Frontmatter | `replaceJotBlockById` 只替换 `###` 块区间，不动文件前缀 YAML |
| 新建记录 | 自写入完整三行元数据（与需求 6.1 一致） |

---

## 5. 手动验收清单（建议逐步操作）

1. **新建**：在视图写一条带标签、来源的随手记并保存；用文件管理器打开对应 `.md`，确认含 `#### id:`、`#### updatedAt:`，且时间与 `###` 一致。
2. **短按编辑**：点击该卡片 → 改正文、增/删标签、改来源 → 保存；确认文件内仍为**一条**记录（非追加），`###` 时间未变，`#### updatedAt:` 为保存时刻。
3. **再编辑一次**：再次保存，确认 `updatedAt` 再次更新，`id` 不变。
4. **长按**：长按另一条卡片约 0.5s → 源文件打开且光标落到该块附近。
5. **历史兼容**：在库中手工建一条**无** `#### id/updatedAt` 的旧格式块 → 重载视图 → 应出现在列表；点进编辑保存 → 文件中应出现元数据行。
6. **查询**：搜索框输入 `updated:YYYY-MM-DD`（用步骤 2 的日期），应只筛到 `updatedAt` 为该日期的条目；再点选标签，确认与标签过滤**同时**生效。
7. **失败路径**：可选：临时只读/占用文件使写入失败 → 应提示错误，原文未被截断或整文件破坏（Obsidian 下以实际环境为准）。

---

## 6. 已知限制与后续可做

- **附件**：编辑态未提供与「新建区」相同的附件增删 UI；已有附件链接随正文 Markdown 仍存在，一般不因编辑标签/来源而丢，但复杂场景需在源码中手改。
- **`updated:` 语义**：实现为 `updatedAt` 字符串前缀匹配到日期段；未做严格日历校验或时区换算。
- **长按**：不同设备/触控板长按时长体感可能不同；未做系统级「长按」无障碍专项。
- **文档**：`docs/UPDATE_FLOW.md` 仍为「更新前」行为分析，若需单一事实来源可后续改为指向本交付说明或更新该文。
- **测试**：需求建议的最小回归测试尚未落地代码仓库，可另起迭代（Vitest 等用例：`parse` / `replace` / 集成的最小片段）。

---

## 7. 本轮代码侧小改动（若有）

- **`src/i18n.ts`**：搜索框 `searchPlaceholder` / `searchPlaceholderShort` 增加 `date:` / `updated:` 提示，降低 MVP-5 使用门槛。

（实现审查结论：除上述文案外，MVP 条目均可在当前 `main.ts` / `view.ts` / `utils.ts` / `types.ts` 中对齐；未引入额外架构层。）
