/**
 * Deterministic knowledge pack compilation from a wiki docs root.
 */

import * as crypto from "node:crypto";
import * as path from "node:path";

import { parseMarkdownDocument } from "./frontmatter";
import { requireDirectory, walkMarkdownFiles } from "./links";
import { LEGACY_PREFIXES, NON_CORPUS_FILES } from "./schema";

export interface KnowledgePackPage {
  id: string;
  path: string;
  frontMatter: Record<string, unknown>;
  body: string;
}

export interface KnowledgePack {
  schemaVersion: 1;
  pages: KnowledgePackPage[];
}

export interface CompileResult {
  pack: KnowledgePack;
  bytes: Buffer;
  hash: string;
}

function relPath(root: string, filePath: string): string {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function isCanonical(rel: string): boolean {
  if (NON_CORPUS_FILES.has(rel)) {
    return false;
  }
  return !LEGACY_PREFIXES.some((p) => rel.startsWith(p));
}

/** Recursively sort object keys for canonical JSON. */
export function canonicalize(value: unknown): unknown {
  if (value === null || typeof value !== "object") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  const obj = value as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(obj).sort()) {
    out[key] = canonicalize(obj[key]);
  }
  return out;
}

/** Stable JSON serialization: sorted keys, no insignificant whitespace. */
export function canonicalJson(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

/**
 * Compile canonical wiki pages into a deterministic knowledge pack.
 * Hash is SHA-256 of the canonical JSON bytes (UTF-8).
 */
export function compileKnowledgePack(rootInput: string): CompileResult {
  const root = requireDirectory(rootInput);
  const pages: KnowledgePackPage[] = [];

  for (const filePath of walkMarkdownFiles(root)) {
    const rel = relPath(root, filePath);
    if (!isCanonical(rel)) {
      continue;
    }
    const doc = parseMarkdownDocument(filePath);
    if (doc.frontMatter === null) {
      continue;
    }
    const idRaw = doc.frontMatter["id"];
    const id = typeof idRaw === "string" ? idRaw.trim() : "";
    if (!id) {
      continue;
    }
    pages.push({
      id,
      path: rel,
      frontMatter: canonicalize(doc.frontMatter) as Record<string, unknown>,
      body: doc.body.replace(/\r\n/g, "\n"),
    });
  }

  pages.sort((a, b) => {
    const byId = a.id.localeCompare(b.id);
    if (byId !== 0) {
      return byId;
    }
    return a.path.localeCompare(b.path);
  });

  const pack: KnowledgePack = {
    schemaVersion: 1,
    pages,
  };

  const json = canonicalJson(pack);
  const bytes = Buffer.from(json, "utf8");
  const hash = crypto.createHash("sha256").update(bytes).digest("hex");

  return { pack, bytes, hash };
}
