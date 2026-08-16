/**
 * Validate relative Markdown links under a documentation root.
 * Ported from core/wiki_links.py.
 */

import * as fs from "node:fs";
import * as path from "node:path";

export const LINK_RE = /\[([^\]]*)\]\(([^)]+)\)/g;
export const SKIP_SCHEMES = ["http://", "https://", "mailto:", "tel:"] as const;

function requireDirectory(root: string): string {
  const resolved = path.resolve(root);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) {
    throw new Error(`Not a directory: ${resolved}`);
  }
  return resolved;
}

function walkMarkdownFiles(root: string): string[] {
  const out: string[] = [];
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop()!;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        out.push(full);
      }
    }
  }
  return out.sort((a, b) => a.replace(/\\/g, "/").localeCompare(b.replace(/\\/g, "/")));
}

function isInsideRoot(root: string, candidate: string): boolean {
  const rel = path.relative(root, candidate);
  return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
}

/** Return human-readable errors; empty list means the tree is consistent. */
export function validateWikiLinks(rootInput: string): string[] {
  const root = requireDirectory(rootInput);
  const errors: string[] = [];
  const mdFiles = walkMarkdownFiles(root);

  for (const md of mdFiles) {
    let text: string;
    try {
      text = fs.readFileSync(md, "utf8");
    } catch (err) {
      if (
        err instanceof Error &&
        "code" in err &&
        (err as NodeJS.ErrnoException).code === undefined
      ) {
        errors.push(`${md}: not valid UTF-8`);
        continue;
      }
      try {
        text = fs.readFileSync(md, "utf8");
      } catch (inner) {
        errors.push(
          `${md}: read failed (${inner instanceof Error ? inner.message : String(inner)})`,
        );
        continue;
      }
    }

    LINK_RE.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = LINK_RE.exec(text)) !== null) {
      const rawTarget = match[2] ?? "";
      const target = rawTarget.trim().replace(/^<|>$/g, "").trim();
      if (
        !target ||
        SKIP_SCHEMES.some((s) => target.startsWith(s)) ||
        target.startsWith("#") ||
        target.startsWith("data:")
      ) {
        continue;
      }
      const pathPart = target.split("#", 1)[0]?.split("?", 1)[0] ?? "";
      if (!pathPart) {
        continue;
      }
      const resolved = path.resolve(path.dirname(md), pathPart);
      if (!isInsideRoot(root, resolved)) {
        if (fs.existsSync(resolved)) {
          continue;
        }
        errors.push(`${md}: link escapes root and target missing -> ${target}`);
        continue;
      }
      if (!fs.existsSync(resolved)) {
        errors.push(`${md}: broken link -> ${target}`);
      }
    }
  }
  return errors;
}

export { walkMarkdownFiles, requireDirectory };
