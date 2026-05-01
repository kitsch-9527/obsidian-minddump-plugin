// src/rich-markdown-field.ts
import type { WikilinkTextField } from "./utils";

/**
 * Limited WYSIWYG (contenteditable) with Markdown as source:
 * paragraphs, **bold**, `-` / `*` lists, ordered lists (renumbered `1.` `2.` … on export).
 * Caret ↔ markdown offset uses a private-use sentinel only while measuring.
 */
const MD_SENT = "\uE000";

function stripMdSent(s: string): string {
    return s.split(MD_SENT).join("");
}

/** Zero-width space used only as a transient “type here” anchor after line-bold; stripped on save. */
const ZWSP = "\u200B";

/** Leading trim + trailing newlines only. Do not use full `.trim()` on save: it strips the space after `-` / `1.` in empty list lines and breaks Markdown round-trip. */
export function normalizeMarkdownForSave(md: string): string {
    return md
        .replace(/^\s+/, "")
        .replace(/(?:\r?\n)+$/g, "")
        .split(ZWSP)
        .join("");
}

export type RichMarkdownFieldOptions = {
    className?: string;
    placeholder?: string;
};

export type RichMarkdownFieldApi = {
    el: HTMLDivElement;
    getMarkdown(): string;
    setMarkdown(md: string): void;
    insertMarkdownAtCaret(fragment: string): void;
    toggleBoldAroundSelection(): void;
    focus(): void;
    focusEnd(): void;
    syncHeight(minHeightPx: number, maxHeightPx: number): void;
};

function serializeInlineDom(node: Node): string {
    let s = "";
    for (let c = node.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === Node.TEXT_NODE) s += (c as Text).data;
        else if (c.nodeName === "STRONG" || c.nodeName === "B") s += `**${serializeInlineDom(c)}**`;
        else s += serializeInlineDom(c);
    }
    return s;
}

/** Browsers often insert `<div><br></div>` after exiting a list; treat like `<p>`. */
function serializeParagraphLikeBlock(el: HTMLElement): string {
    if (!el.firstChild) return "";
    if (el.childNodes.length === 1 && el.firstChild.nodeName === "BR") return "";
    return serializeInlineDom(el);
}

function serializeRootToMarkdown(root: HTMLElement): string {
    const blocks = Array.from(root.children) as HTMLElement[];
    if (blocks.length === 0) {
        // Some browsers leave typed text as direct child nodes (no <p> wrapper), which
        // `children` omits for TEXT_NODE — without this, getMarkdown() is "" while the UI shows text.
        let s = "";
        for (let c = root.firstChild; c; c = c.nextSibling) {
            if (c.nodeType === Node.TEXT_NODE) s += (c as Text).data;
            else if (c.nodeType === Node.ELEMENT_NODE) s += serializeInlineDom(c as HTMLElement);
        }
        return s;
    }
    const parts: string[] = [];
    for (const el of blocks) {
        if (el.tagName === "P" || el.tagName === "DIV") {
            parts.push(serializeParagraphLikeBlock(el));
        } else if (el.tagName === "UL") {
            const lines: string[] = [];
            for (const li of Array.from(el.querySelectorAll(":scope > li"))) {
                lines.push(`- ${serializeInlineDom(li)}`);
            }
            parts.push(lines.join("\n"));
        } else if (el.tagName === "OL") {
            const lines: string[] = [];
            Array.from(el.querySelectorAll(":scope > li")).forEach((li, idx) => {
                lines.push(`${idx + 1}. ${serializeInlineDom(li)}`);
            });
            parts.push(lines.join("\n"));
        } else {
            parts.push(serializeInlineDom(el));
        }
    }
    return parts.join("\n\n");
}

function stripSentinel(root: HTMLElement) {
    const tw = root.ownerDocument!.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n: Text | null;
    while ((n = tw.nextNode() as Text | null)) {
        if (n.data.includes(MD_SENT)) n.data = n.data.split(MD_SENT).join("");
    }
}

function getMarkdownOffsetForCollapsedRange(root: HTMLDivElement, range: Range, collapseToStart: boolean): number {
    const base = stripMdSent(serializeRootToMarkdown(root));
    const doc = root.ownerDocument!;
    if (!root.contains(range.commonAncestorContainer)) return base.length;
    try {
        const r = range.cloneRange();
        r.collapse(collapseToStart);
        r.insertNode(doc.createTextNode(MD_SENT));
        const marked = serializeRootToMarkdown(root);
        stripSentinel(root);
        const i = marked.indexOf(MD_SENT);
        return i >= 0 ? i : base.length;
    } catch {
        stripSentinel(root);
        return base.length;
    }
}

function getMarkdownCaretIndex(root: HTMLDivElement): number {
    const doc = root.ownerDocument!;
    const sel = doc.getSelection();
    if (!sel?.rangeCount || !root.contains(sel.anchorNode)) {
        return stripMdSent(serializeRootToMarkdown(root)).length;
    }
    return getMarkdownOffsetForCollapsedRange(root, sel.getRangeAt(0), true);
}

/** Body = editable inline slice for the current paragraph or list item (excludes `- ` / `n. `). */
function findBodyRangeForCaret(root: HTMLDivElement, caretIndex: number): { bodyStart: number; bodyEnd: number } | null {
    const md = stripMdSent(serializeRootToMarkdown(root));
    let c = Math.max(0, Math.min(caretIndex, md.length));
    let global = 0;
    const blocks = Array.from(root.children) as HTMLElement[];
    for (let bi = 0; bi < blocks.length; bi++) {
        const el = blocks[bi];
        if (bi > 0) {
            const gapStart = global;
            global += 2;
            if (c >= gapStart && c < global) c = global;
        }
        if (el.tagName === "P" || el.tagName === "DIV") {
            const body = serializeParagraphLikeBlock(el);
            const start = global;
            const end = global + body.length;
            if (c >= start && c <= end) return { bodyStart: start, bodyEnd: end };
            global = end;
            continue;
        }
        if (el.tagName === "UL") {
            const items = Array.from(el.querySelectorAll(":scope > li")) as HTMLElement[];
            for (let i = 0; i < items.length; i++) {
                const li = items[i];
                const prefix = "- ";
                const bodyStart = global + prefix.length;
                const body = serializeInlineDom(li);
                const bodyEnd = bodyStart + body.length;
                const lineStart = global;
                if (c >= lineStart && c <= bodyEnd) return { bodyStart, bodyEnd };
                global = bodyEnd;
                if (i < items.length - 1) global += 1;
            }
            continue;
        }
        if (el.tagName === "OL") {
            const items = Array.from(el.querySelectorAll(":scope > li")) as HTMLElement[];
            for (let i = 0; i < items.length; i++) {
                const li = items[i];
                const prefix = `${i + 1}. `;
                const bodyStart = global + prefix.length;
                const body = serializeInlineDom(li);
                const bodyEnd = bodyStart + body.length;
                const lineStart = global;
                if (c >= lineStart && c <= bodyEnd) return { bodyStart, bodyEnd };
                global = bodyEnd;
                if (i < items.length - 1) global += 1;
            }
        }
    }
    return null;
}

/** After line-level bold (wrap), open a new block for non-bold typing. */
const PLAIN_TAIL_AFTER_LINE_BOLD = `\n\n${ZWSP}`;

function isFullyBoldMarkdownSlice(slice: string): boolean {
    return slice.length >= 4 && slice.startsWith("**") && slice.endsWith("**");
}

function unwrapBoldSlice(slice: string): string {
    return slice.slice(2, -2);
}

function setMarkdownCaretIndex(root: HTMLDivElement, index: number) {
    const md = stripMdSent(serializeRootToMarkdown(root));
    const clamped = Math.max(0, Math.min(index, md.length));
    const marked = md.slice(0, clamped) + MD_SENT + md.slice(clamped);
    setMarkdownIntoRoot(root, marked);
    const tw = root.ownerDocument!.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n: Text | null;
    while ((n = tw.nextNode() as Text | null)) {
        const j = n.data.indexOf(MD_SENT);
        if (j === -1) continue;
        n.data = n.data.slice(0, j) + n.data.slice(j + MD_SENT.length);
        const sel = root.ownerDocument!.getSelection();
        if (sel) {
            const r = root.ownerDocument!.createRange();
            r.setStart(n, j);
            r.collapse(true);
            sel.removeAllRanges();
            sel.addRange(r);
        }
        root.focus();
        return;
    }
    root.focus();
}

function parseInlineToFragment(text: string, doc: Document): DocumentFragment {
    const frag = doc.createDocumentFragment();
    if (!text) return frag;
    const re = /\*\*([\s\S]*?)\*\*/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
        if (m.index > last) frag.appendChild(doc.createTextNode(text.slice(last, m.index)));
        const strong = doc.createElement("strong");
        strong.appendChild(doc.createTextNode(m[1]));
        frag.appendChild(strong);
        last = m.index + m[0].length;
    }
    if (last < text.length) frag.appendChild(doc.createTextNode(text.slice(last)));
    return frag;
}

function markdownToBlocks(md: string, doc: Document): HTMLElement[] {
    const lines = md.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
    const blocks: HTMLElement[] = [];
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        const ul = line.match(/^\s*[-*]\s+(.*)$/);
        const ol = line.match(/^\s*\d+\.\s+(.*)$/);
        if (ul) {
            const ulEl = doc.createElement("ul");
            while (i < lines.length) {
                const m = lines[i].match(/^\s*[-*]\s+(.*)$/);
                if (!m) break;
                const li = doc.createElement("li");
                li.appendChild(parseInlineToFragment(m[1], doc));
                if (!li.firstChild) li.appendChild(doc.createElement("br"));
                ulEl.appendChild(li);
                i++;
            }
            blocks.push(ulEl);
            continue;
        }
        if (ol) {
            const olEl = doc.createElement("ol");
            while (i < lines.length) {
                const m = lines[i].match(/^\s*\d+\.\s+(.*)$/);
                if (!m) break;
                const li = doc.createElement("li");
                li.appendChild(parseInlineToFragment(m[1], doc));
                if (!li.firstChild) li.appendChild(doc.createElement("br"));
                olEl.appendChild(li);
                i++;
            }
            blocks.push(olEl);
            continue;
        }
        if (line === "") {
            i++;
            continue;
        }
        const paraLines: string[] = [];
        while (i < lines.length) {
            const L = lines[i];
            if (L === "") break;
            if (/^\s*[-*]\s+/.test(L) || /^\s*\d+\.\s+/.test(L)) break;
            paraLines.push(L);
            i++;
        }
        const p = doc.createElement("p");
        const body = paraLines.join("\n");
        if (body) p.appendChild(parseInlineToFragment(body, doc));
        else p.appendChild(doc.createElement("br"));
        blocks.push(p);
    }
    if (blocks.length === 0) {
        const p = doc.createElement("p");
        p.appendChild(doc.createElement("br"));
        blocks.push(p);
    }
    return blocks;
}

function clearEditor(root: HTMLDivElement) {
    while (root.firstChild) root.removeChild(root.firstChild);
}

function setMarkdownIntoRoot(root: HTMLDivElement, md: string) {
    clearEditor(root);
    for (const b of markdownToBlocks(md, root.ownerDocument!)) root.appendChild(b);
}

function replaceMarkdownRange(root: HTMLDivElement, start: number, end: number, insertion: string) {
    const md = stripMdSent(serializeRootToMarkdown(root));
    const next = md.slice(0, start) + insertion + md.slice(end);
    setMarkdownIntoRoot(root, next);
    setMarkdownCaretIndex(root, start + insertion.length);
    root.dispatchEvent(new Event("input", { bubbles: true }));
}

export function mountRichMarkdownField(
    parent: HTMLElement,
    initialMarkdown: string,
    options?: RichMarkdownFieldOptions
): RichMarkdownFieldApi {
    const doc = parent.ownerDocument!;
    const el = parent.createEl("div", {
        cls: `jots-rich-md ${options?.className ?? ""}`.trim(),
        attr: {
            contenteditable: "true",
            role: "textbox",
            "aria-multiline": "true",
            spellcheck: "true",
        },
    }) as HTMLDivElement;
    if (options?.placeholder) el.setAttribute("data-placeholder", options.placeholder);
    setMarkdownIntoRoot(el, stripMdSent(initialMarkdown));

    const getMarkdown = () => {
        let md = stripMdSent(serializeRootToMarkdown(el));
        if (!md.trim()) {
            const raw = (el.innerText ?? el.textContent ?? "").replace(/\u00a0/g, " ");
            const fallback = stripMdSent(raw)
                .split(ZWSP)
                .join("")
                .replace(/^\s+/, "")
                .replace(/(?:\r?\n)+$/g, "");
            if (fallback.trim()) return fallback;
        }
        return md;
    };

    const setMarkdown = (md: string) => {
        setMarkdownIntoRoot(el, stripMdSent(md));
    };

    const insertMarkdownAtCaret = (fragment: string) => {
        const start = getMarkdownCaretIndex(el);
        replaceMarkdownRange(el, start, start, stripMdSent(fragment));
    };

    const toggleBoldAroundSelection = () => {
        const md = getMarkdown();
        const sel = doc.getSelection();
        const inEditor =
            sel &&
            sel.rangeCount > 0 &&
            el.contains(sel.anchorNode) &&
            el.contains(sel.focusNode);

        if (inEditor && !sel.isCollapsed) {
            const range = sel.getRangeAt(0);
            let i0 = getMarkdownOffsetForCollapsedRange(el, range, true);
            let i1 = getMarkdownOffsetForCollapsedRange(el, range, false);
            if (i0 > i1) [i0, i1] = [i1, i0];
            if (i1 > i0) {
                const slice = md.slice(i0, i1);
                const replacement = isFullyBoldMarkdownSlice(slice) ? unwrapBoldSlice(slice) : `**${slice}**`;
                const next = md.slice(0, i0) + replacement + md.slice(i1);
                setMarkdownIntoRoot(el, next);
                setMarkdownCaretIndex(el, i0 + replacement.length);
                el.dispatchEvent(new Event("input", { bubbles: true }));
                return;
            }
        }

        const caret = getMarkdownCaretIndex(el);
        let loc = findBodyRangeForCaret(el, caret);
        if (!loc && md.length > 0) loc = findBodyRangeForCaret(el, Math.min(caret, md.length));
        if (!loc) {
            const next = `****${PLAIN_TAIL_AFTER_LINE_BOLD}`;
            setMarkdownIntoRoot(el, next);
            setMarkdownCaretIndex(el, "****".length + 2);
            el.dispatchEvent(new Event("input", { bubbles: true }));
            return;
        }

        const { bodyStart, bodyEnd } = loc;
        const inner = md.slice(bodyStart, bodyEnd);
        const unwrapping = isFullyBoldMarkdownSlice(inner);
        const newInner = unwrapping ? unwrapBoldSlice(inner) : `**${inner}**`;
        const tail = unwrapping ? "" : PLAIN_TAIL_AFTER_LINE_BOLD;
        const next = md.slice(0, bodyStart) + newInner + tail + md.slice(bodyEnd);
        setMarkdownIntoRoot(el, next);
        if (unwrapping) setMarkdownCaretIndex(el, bodyStart + newInner.length);
        else setMarkdownCaretIndex(el, bodyStart + newInner.length + 2);
        el.dispatchEvent(new Event("input", { bubbles: true }));
    };

    const focus = () => el.focus();

    const focusEnd = () => {
        setMarkdownCaretIndex(el, getMarkdown().length);
    };

    const syncHeight = (minH: number, maxH: number) => {
        el.style.height = "auto";
        const sh = el.scrollHeight;
        const next = Math.max(minH, Math.min(sh, maxH));
        el.style.height = `${next}px`;
        el.style.overflowY = sh > maxH ? "auto" : "hidden";
    };

    el.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            insertMarkdownAtCaret("    ");
        }
    });

    return {
        el,
        getMarkdown,
        setMarkdown,
        insertMarkdownAtCaret,
        toggleBoldAroundSelection,
        focus,
        focusEnd,
        syncHeight,
    };
}

export function richFieldToWikilinkField(field: RichMarkdownFieldApi): WikilinkTextField {
    return {
        getValue: () => field.getMarkdown(),
        getCaret: () => getMarkdownCaretIndex(field.el),
        replaceRange(start, end, text) {
            const cur = field.getMarkdown();
            const next = cur.slice(0, start) + text + cur.slice(end);
            field.setMarkdown(next);
            setMarkdownCaretIndex(field.el, start + text.length);
            field.el.dispatchEvent(new Event("input", { bubbles: true }));
        },
        focus: () => field.focus(),
        getBoundingRect: () => field.el.getBoundingClientRect(),
    };
}
