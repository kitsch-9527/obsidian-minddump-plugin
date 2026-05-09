# 调研报告：昨日创建今日修改的随手记能否在今日随手记中显示

## 背景与目标

**调研问题**：昨天创建的笔记今天更改了，查看今天的随手记能查看到今天更改的随手记吗？通过插件更改的随手记。要是不支持的话如何最小化的改造，以支持此功能。

**范围**：不修改代码，生成调研文档供决策参考。

---

## 关键结论

### 结论 1：当前不支持按文件修改日期过滤

**信息点 ID**：C1  
**结论**：插件读取数据时以 Jot 内容中的 `### YYYY-MM-DD HH:mm:ss` 时间戳为唯一日期依据，不使用文件修改时间（mtime）。

**证据**：
- `main.ts:124-149` - `loadJotsData()` 读取所有 `.md` 文件，调用 `parseFileContent()` 解析内容中的时间戳
- `view.ts:298-323` - `JotView.loadJots()` 同样读取文件并解析，**不涉及文件 mtime**
- `view.ts:664-671` - `getStats()` 统计今日数量时用 `jot.date === today`（today 格式为 `YYYY-MM-DD`），**jot.date 来自解析出的时间戳，非文件修改时间**
- `view.ts:900-912` - `getDayRecords()` 用 `jot.date` 构建日历日期映射，**不涉及文件 mtime**

**来源级别**：L5（代码实现层面的一手证据）

**置信度**：C3（两条独立代码路径确认同一事实）

---

### 结论 2：昨日创建今日修改的 Jot 不会出现在今日随手记列表中

**信息点 ID**：C2  
**结论**：假设某 Jot 创建于 2026-04-29，文件在 2026-04-30 被修改。该 Jot 的 `jot.date = "2026-04-29"`（来自 `### 2026-04-29 10:30:00` 头部），今日随手记过滤条件为 `jot.date === "2026-04-30"`。该 Jot 不匹配，不会显示。

**证据**：
- `saveJot()` (`main.ts:151-194`) 创建新 Jot 时使用 `moment(now).format("YYYY-MM-DD")` 作为日期字符串，该字符串写入 `### YYYY-MM-DD HH:mm:ss` 头部，并作为 `jot.date` 存储
- `filterJots()` (`view.ts:1309-1333`) 中 date 过滤逻辑：`jot.date === targetDate`
- `getStats()` (`view.ts:667`) 中今日统计：`jot.date === today`

**来源级别**：L5

**置信度**：C3

---

### 结论 3：最小改造方案只需修改过滤逻辑，不涉及数据模型变更

**信息点 ID**：C3  
**结论**：若需支持"按文件修改时间显示今日更改的随手记"，最小改动为：

1. 在 `loadJotsData()` / `JotView.loadJots()` 读取文件时，同步获取 `TFile.stat.mtime`
2. 在 `Jot` 类型中添加可选字段 `fileMtime?: number`
3. 在 `filterJots()` 的 date 过滤中，同时接受"jot.date 等于目标日期"或"jot.fileMtime 在目标日期范围内"
4. 在 `getStats()` 今日统计中同步支持

**关键改造点**：
- `main.ts:136-140` - 读取文件时捕获 mtime
- `view.ts:310-314` - 同样读取文件时捕获 mtime
- `types.ts` - `Jot` 接口添加 `fileMtime?: number`
- `view.ts:1312-1314` - filterJots 中增加 fileMtime 过滤条件

**来源级别**：L5（基于代码实现的合理推断）

**置信度**：C2（改造方案为推测，需要最终实现时验证）

---

## 冲突信息与处理结果

无冲突。当前代码行为清晰一致。

---

## 风险与边界

1. **边界条件**：若用户在外部（非插件）修改了文件 mtime，但 Jot 内容未变，是否应该出现在今日列表？建议：否，应以 Jot 内容为主，mtime 仅作为辅助过滤。

2. **多文件 vs 单文件**：`loadJotsData()` 和 `JotView.loadJots()` 都有相同的文件读取逻辑，需要同步改造这两处。

3. **性能考虑**：每次加载获取 mtime 成本极低（已持有 TFile 对象），无需额外优化。

---

## 未确认项

无。当前代码分析结论一致。

---

## 可执行建议

### 方案 A：仅支持"修改时间"过滤（推荐最小改动）

1. 在 `types.ts` 的 `Jot` 接口中添加 `fileMtime?: number`
2. 在 `main.ts:loadJotsData()` 的循环中（`main.ts:137` 后），添加：
   ```typescript
   const mtime = (file as TFile).stat.mtime;
   entries.forEach(e => e.fileMtime = mtime);
   ```
3. 在 `view.ts:JotView.loadJots()` 的循环中做同样处理
4. 在 `view.ts:filterJots()` 的 date 过滤逻辑处（约 `view.ts:1312-1314`），增加对 `fileMtime` 的判断：
   - 若 `searchQuery` 以 `date:` 开头，保持现有逻辑
   - 新增一个过滤模式如 `modified:today`，返回 fileMtime 在今日的 jots
5. 在 `view.ts:getStats()` 中同样处理

### 方案 B：混合过滤（更复杂）

同时支持按"创建日期"和"修改日期"过滤，需要 UI 改动（新增筛选选项），不在最小改动范围内。

---

## 数据流追踪

```
saveJot() 创建新 Jot
  └─ 使用当前时间生成 ### YYYY-MM-DD HH:mm:ss 头部
  └─ dateStr = moment(now).format("YYYY-MM-DD")  →  写入文件

loadJotsData() / loadJots() 读取文件
  └─ parseFileContent() 解析出 ### YYYY-MM-DD HH:mm:ss
  └─ jot.date = "YYYY-MM-DD"（来自内容，非 mtime）

filterJots() / getStats() / getDayRecords()
  └─ 所有过滤基于 jot.date（非文件 mtime）
```