/**
 * Safe YAML front-matter parsing for wiki Markdown pages.
 * Ported from core/wiki_frontmatter.py.
 */

import * as fs from "node:fs";

import { parseDocument, isMap, isScalar, isSeq, type ParsedNode } from "yaml";

export class FrontMatterError extends Error {
  readonly code = "FRONT_MATTER_INVALID" as const;
  readonly path?: string;

  constructor(message: string, path?: string) {
    super(path === undefined ? message : `${path}: ${message}`);
    this.name = "FrontMatterError";
    if (path !== undefined) {
      this.path = path;
    }
  }
}

const FM_START = "---";

export interface ParsedDocument {
  path: string;
  frontMatter: Record<string, unknown> | null;
  body: string;
  rawText: string;
  hasBom: boolean;
}

function stripBom(text: string): { text: string; hasBom: boolean } {
  if (text.startsWith("\ufeff")) {
    return { text: text.replace(/^\ufeff+/, ""), hasBom: true };
  }
  return { text, hasBom: false };
}

/**
 * Return [yamlText | null, body]. Accepts optional UTF-8 BOM already stripped.
 */
export function splitFrontMatter(text: string): { yamlText: string | null; body: string } {
  if (!text.startsWith(FM_START)) {
    return { yamlText: null, body: text };
  }
  if (text.length === 3 || !"\r\n".includes(text[3] ?? "")) {
    return { yamlText: null, body: text };
  }
  let rest = text.slice(3);
  if (rest.startsWith("\r\n")) {
    rest = rest.slice(2);
  } else if (rest.startsWith("\n")) {
    rest = rest.slice(1);
  } else {
    return { yamlText: null, body: text };
  }

  let idx = 0;
  while (true) {
    const nl = rest.indexOf("\n", idx);
    const line = nl < 0 ? rest.slice(idx) : rest.slice(idx, nl);
    if (line.replace(/\r$/, "") === FM_START) {
      const yamlText = rest.slice(0, idx);
      const body = nl < 0 ? "" : rest.slice(nl + 1);
      return { yamlText, body };
    }
    if (nl < 0) {
      return { yamlText: null, body: text };
    }
    idx = nl + 1;
  }
}

function yamlNodeToJs(node: ParsedNode | null | undefined): unknown {
  if (node === null || node === undefined) {
    return null;
  }
  if (isScalar(node)) {
    return node.toJSON();
  }
  if (isSeq(node)) {
    return node.items.map((item) => yamlNodeToJs(item as ParsedNode));
  }
  if (isMap(node)) {
    const out: Record<string, unknown> = {};
    for (const item of node.items) {
      const keyNode = item.key as ParsedNode;
      const key = isScalar(keyNode) ? String(keyNode.toJSON()) : String(keyNode);
      out[key] = yamlNodeToJs(item.value as ParsedNode);
    }
    return out;
  }
  return node.toJSON();
}

const CORE_TAGS = new Set([
  "!",
  "?",
  "tag:yaml.org,2002:str",
  "tag:yaml.org,2002:int",
  "tag:yaml.org,2002:float",
  "tag:yaml.org,2002:bool",
  "tag:yaml.org,2002:null",
  "tag:yaml.org,2002:map",
  "tag:yaml.org,2002:seq",
  "!!str",
  "!!int",
  "!!float",
  "!!bool",
  "!!null",
  "!!map",
  "!!seq",
]);

function collectUnsafeTags(node: ParsedNode | null | undefined, issues: string[]): void {
  if (!node) {
    return;
  }
  const tag = (node as { tag?: string }).tag;
  if (typeof tag === "string" && tag !== "" && !CORE_TAGS.has(tag)) {
    // Allow unresolved default tags from the core schema resolver
    if (!(tag === "!" || tag === "?")) {
      issues.push(tag);
      return;
    }
  }
  if (isSeq(node)) {
    for (const item of node.items) {
      collectUnsafeTags(item as ParsedNode, issues);
      if (issues.length > 0) {
        return;
      }
    }
  } else if (isMap(node)) {
    for (const item of node.items) {
      collectUnsafeTags(item.key as ParsedNode, issues);
      collectUnsafeTags(item.value as ParsedNode, issues);
      if (issues.length > 0) {
        return;
      }
    }
  }
}

/**
 * Parse front matter with YAML core schema only; reject custom tags.
 */
export function parseFrontMatterYaml(
  yamlText: string,
  opts?: { path?: string },
): Record<string, unknown> {
  const pathLabel = opts?.path;

  // Fast reject for Python/JS object injection tags (parity with yaml.safe_load)
  if (/!!(?:python|js|ruby|perl)\b/i.test(yamlText) || /!\s*!python\b/i.test(yamlText)) {
    throw new FrontMatterError("unsafe YAML tag rejected", pathLabel);
  }

  try {
    const doc = parseDocument(yamlText, {
      schema: "core",
      strict: true,
      uniqueKeys: true,
    });

    if (doc.errors.length > 0) {
      throw new FrontMatterError(`YAML parse error: ${doc.errors[0]?.message}`, pathLabel);
    }

    const tagIssues: string[] = [];
    collectUnsafeTags(doc.contents, tagIssues);
    if (tagIssues.length > 0) {
      throw new FrontMatterError(`unsafe YAML tag: ${tagIssues[0]}`, pathLabel);
    }

    if (doc.contents === null || doc.contents === undefined) {
      return {};
    }
    if (!isMap(doc.contents)) {
      throw new FrontMatterError("front matter must be a YAML mapping", pathLabel);
    }

    const data = yamlNodeToJs(doc.contents);
    if (data === null || typeof data !== "object" || Array.isArray(data)) {
      throw new FrontMatterError("front matter must be a YAML mapping", pathLabel);
    }
    return data as Record<string, unknown>;
  } catch (err) {
    if (err instanceof FrontMatterError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : String(err);
    throw new FrontMatterError(`YAML parse error: ${message}`, pathLabel);
  }
}

/** Load a Markdown file and parse front matter when present. */
export function parseMarkdownDocument(filePath: string, text?: string): ParsedDocument {
  const raw = text ?? fs.readFileSync(filePath, "utf8");
  const { text: cleaned, hasBom } = stripBom(raw);
  const { yamlText, body } = splitFrontMatter(cleaned);
  if (yamlText === null) {
    return {
      path: filePath,
      frontMatter: null,
      body: cleaned,
      rawText: raw,
      hasBom,
    };
  }
  const fm = parseFrontMatterYaml(yamlText, { path: filePath });
  return {
    path: filePath,
    frontMatter: fm,
    body,
    rawText: raw,
    hasBom,
  };
}
