# 调研报告：Obsidian 插件粘贴图片功能

## 概述

本文档调研在 Obsidian 插件中实现图片粘贴功能的最佳实践，涵盖事件捕获、剪贴板处理、文件存储等核心环节。

---

## 一、在 Capture Modal 中捕获 Paste 事件

### 1.1 Obsidian 推荐方式：editor-paste 事件

Obsidian 提供 `editor-paste` 事件，是官方推荐的剪贴板处理方式：

```typescript
// 注册 paste 事件监听器
this.registerEvent(
    this.app.workspace.on(
        "editor-paste",
        (evt: ClipboardEvent, editor: Editor, markdownView: MarkdownView) => {
            // 检查剪贴板是否包含图片
            const clipboardData = evt.clipboardData?.files[0];
            const imageType = /image.*/;

            if (clipboardData && clipboardData.type.match(imageType)) {
                evt.preventDefault();  // 阻止默认粘贴行为
                // 处理图片...
            }
        }
    )
);
```

**来源**：[obsidian-image-uploader 插件](https://github.com/Creling/obsidian-image-uploader)

**关键点**：
- `editor` 参数可直接操作编辑器内容
- `evt.clipboardData.files[0]` 包含图片数据
- `preventDefault()` 阻止默认粘贴行为

### 1.2 Capture Modal 中的实现模式

由于 CaptureModal 继承自 `Modal`，不是 Editor，需要在 textarea 上直接监听：

```typescript
export class CaptureModal extends Modal {
    contentInput: HTMLTextAreaElement;

    async onOpen() {
        const textarea = container.createEl("textarea");
        this.contentInput = textarea;

        // 在 textarea 上监听 paste 事件
        textarea.addEventListener("paste", async (evt: ClipboardEvent) => {
            const clipboardData = evt.clipboardData;
            if (!clipboardData) return;

            // 检查是否有图片
            const imageFile = Array.from(clipboardData.files).find(
                f => f.type.startsWith("image/")
            );

            if (imageFile) {
                evt.preventDefault();
                await this.handlePastedImage(imageFile);
            }
        });
    }

    private async handlePastedImage(file: File) {
        // 处理图片保存...
    }
}
```

---

## 二、将剪贴板图片转换为 Vault 文件

### 2.1 从 File 对象保存到 Vault

当用户粘贴图片时，`clipboardData.files[0]` 是一个 `File` 对象：

```typescript
async handlePastedImage(file: File, plugin: JotPlugin) {
    // 1. 获取附件文件夹路径
    const attachmentsFolder = plugin.settings.attachmentsFolder;

    // 2. 确保文件夹存在
    if (!app.vault.getAbstractFileByPath(attachmentsFolder)) {
        await app.vault.createFolder(attachmentsFolder);
    }

    // 3. 生成唯一文件名（详见第四章）
    const filename = generateUniqueFilename(file.name);

    // 4. 转换为 ArrayBuffer 并保存
    const arrayBuffer = await file.arrayBuffer();
    await app.vault.createBinary(`${attachmentsFolder}/${filename}`, arrayBuffer);

    // 5. 返回附件引用
    return {
        path: `${attachmentsFolder}/${filename}`,
        type: "image" as const
    };
}
```

**来源**：[Jot 插件 utils.ts handleAttachment()](file:///Users/kitsch/code/github/obsidian-jot-plugin/src/utils.ts)

### 2.2 从 Electron 剪贴板读取图片（备用方案）

如果需要更底层的控制，可以使用 Electron 的 clipboard API：

```typescript
// 注意：仅在 Electron 环境下可用
import { clipboard, nativeImage } from 'electron';

// 读取剪贴板图片
const image = clipboard.readImage();

if (!image.isEmpty()) {
    // 获取图片尺寸
    const size = image.getSize();
    console.log(`图片尺寸: ${size.width}x${size.height}`);

    // 转换为 PNG Buffer
    const pngBuffer = image.toPNG();

    // 或转换为 JPEG（可压缩）
    const jpegBuffer = image.toJPEG(85);

    // 或获取 Data URL
    const dataUrl = image.toDataURL();

    // 保存到 Vault
    await app.vault.createBinary(
        `${attachmentsFolder}/clipboard-image.png`,
        pngBuffer
    );
}
```

**来源**：[Electron NativeImage API](https://www.electronjs.org/docs/api/native-image)

**NativeImage 支持的格式**：
| 方法 | 返回 | 特点 |
|------|------|------|
| `toPNG()` | Buffer | 无损压缩，支持透明 |
| `toJPEG(quality)` | Buffer | 质量 0-100，可压缩 |
| `toDataURL()` | string | Base64 Data URL |
| `isEmpty()` | boolean | 检查是否有数据 |
| `getSize()` | {width, height} | 获取尺寸 |

---

## 三、存储路径最佳实践

### 3.1 目录结构推荐

```
vault/
├── Jots/                      # 笔记存储目录
│   ├── jot-20260430.md        # 每日笔记
│   ├── jot-20260429.md
│   └── attachments/           # 附件目录
│       ├── jot-20260430-001.png
│       └── jot-20260430-002.jpg
```

**优势**：
- 附件与对应日期的笔记保持关联
- 便于管理和备份
- 避免根目录混乱

### 3.2 Jot 插件现有实现

```typescript
// utils.ts:127-196
const attachmentsFolder = settings.attachmentsFolder;
// 默认值: "Jots/attachments"

// 生成文件名
const dateStrNoDash = moment().format("YYYYMMDD");  // "20260430"
const filename = `jot-${dateStrNoDash}-${serialNumber}.${ext}`;
// 例如: jot-20260430-001.png
```

---

## 四、文件命名冲突处理

### 4.1 Jot 插件的命名策略

```typescript
// utils.ts:156-184
async function handleAttachment(file: File): Promise<string> {
    // 1. 查找同日期现有文件
    const folder = app.vault.getAbstractFileByPath(attachmentsFolder);
    const existingFiles = folder.children.filter(
        f => f instanceof TFile && f.name.startsWith(`jot-${dateStrNoDash}`)
    ) as TFile[];

    // 2. 提取最大序列号
    let maxNumber = 0;
    for (const f of existingFiles) {
        const match = f.name.match(/jot-(\d{8})-(\d+)\./);
        if (match) {
            maxNumber = Math.max(maxNumber, parseInt(match[2], 10));
        }
    }

    // 3. 循环查找可用文件名
    let attempts = 0;
    const maxAttempts = 100;

    do {
        maxNumber++;
        serialNumber = String(maxNumber).padStart(3, "0");
        filename = `jot-${dateStrNoDash}-${serialNumber}.${ext}`;
        filePath = `${attachmentsFolder}/${filename}`;
        attempts++;
    } while (
        app.vault.getAbstractFileByPath(filePath) &&
        attempts < maxAttempts
    );

    if (attempts >= maxAttempts) {
        throw new Error("无法生成唯一文件名");
    }
}
```

### 4.2 其他命名策略

| 策略 | 示例 | 优点 | 缺点 |
|------|------|------|------|
| 时间戳序列 | `img-1714567890123-001.png` | 全局唯一 | 时间戳较长 |
| UUID | `img-a1b2c3d4.png` | 绝对唯一 | 不可读 |
| 日期+随机数 | `img-20260430-r7x9k.png` | 可读+唯一 | 需验证存在 |

---

## 五、性能考虑

### 5.1 图片压缩

粘贴的图片可能很大，建议压缩后再保存：

```typescript
// 使用 Compressor.js（可选）
import Compressor from 'compressorjs';

async function compressAndSave(file: File) {
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            maxWidth: 1920,      // 最大宽度
            maxHeight: 1920,     // 最大高度
            quality: 0.85,       // JPEG 质量
            success: async (result) => {
                const arrayBuffer = await result.arrayBuffer();
                await app.vault.createBinary(path, arrayBuffer);
                resolve();
            },
            error: reject
        });
    });
}
```

**来源**：[obsidian-image-auto-upload-plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin)

### 5.2 异步处理与用户体验

粘贴大图片时应显示进度：

```typescript
async handlePastedImage(file: File) {
    // 1. 插入占位符
    const placeholder = `![Uploading image...](${Date.now()})`;
    this.contentInput.value += placeholder;

    // 2. 异步保存
    try {
        const result = await saveImageToVault(file);
        // 3. 替换占位符
        this.contentInput.value = this.contentInput.value.replace(
            placeholder,
            `![[${result.path}]]`
        );
    } catch (error) {
        // 4. 处理失败
        this.contentInput.value = this.contentInput.value.replace(
            placeholder,
            "⚠️ 图片上传失败"
        );
    }
}
```

### 5.3 Electron 剪贴板性能

使用 `clipboard.readImage()` 时注意：
- 返回的 `NativeImage` 引用在某些平台是弱指针
- 需立即转换为 Buffer 或 Data URL 保存
- 避免在短时间内多次调用

---

## 六、完整实现示例

### 6.1 CaptureModal 粘贴处理集成

```typescript
// capture-modal.ts 新增部分
export class CaptureModal extends Modal {
    contentInput: HTMLTextAreaElement;
    selectedAttachments: { path: string; type: "image" | "file" }[] = [];

    async onOpen() {
        const textarea = container.createEl("textarea");

        // 监听 paste 事件
        textarea.addEventListener("paste", async (evt: ClipboardEvent) => {
            const clipboardData = evt.clipboardData;
            if (!clipboardData) return;

            // 查找图片文件
            const imageFile = Array.from(clipboardData.files).find(
                f => f.type.startsWith("image/")
            );

            if (imageFile) {
                evt.preventDefault();
                await this.handlePastedImage(imageFile);
            }
        });
    }

    private async handlePastedImage(file: File) {
        try {
            // 压缩图片（可选）
            const processedFile = await this.compressIfNeeded(file);

            // 保存到 Vault
            const arrayBuffer = await processedFile.arrayBuffer();
            const filename = await this.generateUniqueFilename(file.name);
            const filePath = `${this.plugin.settings.attachmentsFolder}/${filename}`;
            await this.app.vault.createBinary(filePath, arrayBuffer);

            // 添加到附件列表
            this.selectedAttachments.push({
                path: filePath,
                type: "image"
            });

            // 显示通知
            new Notice(`图片已保存: ${filename}`);
        } catch (error) {
            console.error("保存图片失败:", error);
            new Notice("保存图片失败，请重试");
        }
    }

    private async compressIfNeeded(file: File): Promise<File> {
        // 图片小于 500KB 不压缩
        if (file.size < 500 * 1024) return file;

        return new Promise((resolve, reject) => {
            new Compressor(file, {
                maxWidth: 1920,
                maxHeight: 1920,
                quality: 0.85,
                success: resolve,
                error: reject
            });
        });
    }

    private async generateUniqueFilename(originalName: string): Promise<string> {
        const dateStr = moment().format("YYYYMMDD");
        const ext = originalName.split(".").pop() || "png";
        let serialNumber = 1;

        while (true) {
            const filename = `jot-${dateStr}-${String(serialNumber).padStart(3, "0")}.${ext}`;
            const filePath = `${this.plugin.settings.attachmentsFolder}/${filename}`;

            if (!this.app.vault.getAbstractFileByPath(filePath)) {
                return filename;
            }
            serialNumber++;
        }
    }
}
```

### 6.2 Electron 备用方案

如果需要捕获系统剪贴板截图（使用系统快捷键而非编辑器粘贴）：

```typescript
// 在 main.ts 的 onload 中注册全局快捷键
this.addCommand({
    id: "capture-clipboard-image",
    name: "Capture clipboard image",
    callback: async () => {
        const { clipboard, nativeImage } = require('electron');

        const image = clipboard.readImage();
        if (image.isEmpty()) {
            new Notice("剪贴板中没有图片");
            return;
        }

        // 转换为 PNG 并保存
        const pngBuffer = image.toPNG();
        const filename = await generateUniqueFilename("clipboard.png");
        await this.app.vault.createBinary(
            `${this.settings.attachmentsFolder}/${filename}`,
            pngBuffer
        );

        new Notice(`图片已保存: ${filename}`);
    }
});
```

---

## 七、相关资源

### 文档
- [Electron Clipboard API](https://www.electronjs.org/docs/api/clipboard) - 剪贴板读写
- [Electron NativeImage API](https://www.electronjs.org/docs/api/native-image) - 图片处理
- [Obsidian Plugin API](https://docs.obsidian.md/Plugins/API+reference) - Vault API

### 参考插件
| 插件 | 用途 | 关键代码 |
|------|------|----------|
| [obsidian-image-uploader](https://github.com/Creling/obsidian-image-uploader) | 粘贴上传 | `editor-paste` 事件处理 |
| [obsidian-image-auto-upload](https://github.com/renmu123/obsidian-image-auto-upload-plugin) | 粘贴压缩上传 | `Compressor.js` 集成 |
| [oz-image-in-editor](https://github.com/ozntel/oz-image-in-editor-obsidian) | 编辑器内图片预览 | 渲染优化 |

### NPM 包
| 包 | 用途 |
|----|------|
| `compressorjs` | 图片压缩 |
| `browser-image-compression` | 浏览器端压缩（轻量） |
| `image-blob-reduce` | 客户端图片压缩 |

---

## 八、总结

| 环节 | 推荐方案 | 注意事项 |
|------|----------|----------|
| 事件捕获 | `textarea.addEventListener("paste")` | 在 Modal 中直接监听 |
| 文件转换 | `File.arrayBuffer()` → `vault.createBinary()` | 支持大文件 |
| 存储路径 | `{attachmentsFolder}/jot-YYYYMMDD-NNN.ext` | 与当天笔记关联 |
| 冲突处理 | 日期+序列号循环检测 | 最多 100 次 |
| 性能优化 | 图片压缩（>500KB） | 异步+占位符 |
| 备用方案 | `clipboard.readImage()` | 仅 Electron 环境 |
