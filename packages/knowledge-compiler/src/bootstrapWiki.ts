/**
 * Node editorial tool: bootstrap wiki stubs (replacement for core/bootstrap_wiki.py).
 * Creates minimal Markdown pages only when missing — never overwrites.
 */
import * as fs from "node:fs";
import * as path from "node:path";

import { resolveInsideRepository, resolveRepoRoot } from "@fix-my-print/repo-guard";

export function bootstrapWikiPage(
  relativePath: string,
  body: string,
  startDir = process.cwd(),
): { created: boolean; path: string } {
  const root = resolveRepoRoot(startDir);
  const abs = resolveInsideRepository(root, relativePath);
  if (fs.existsSync(abs)) {
    return { created: false, path: abs };
  }
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, body, "utf8");
  return { created: true, path: abs };
}
