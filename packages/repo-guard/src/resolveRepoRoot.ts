import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

import { RepoBoundaryError } from "./assertInsideRepository";

export const REPO_PACKAGE_NAME = "fix-my-print" as const;

/**
 * Fail-closed: locate monorepo root by package.json name "fix-my-print".
 * Never falls back to process.cwd() or .git alone.
 */
export function resolveRepoRoot(startDir: string = process.cwd()): string {
  let dir = resolve(startDir);
  for (let i = 0; i < 64; i++) {
    const pkg = join(dir, "package.json");
    if (existsSync(pkg)) {
      try {
        const json = JSON.parse(readFileSync(pkg, "utf8")) as {
          name?: string;
        };
        if (json.name === REPO_PACKAGE_NAME) {
          return dir;
        }
      } catch {
        // continue walking
      }
    }
    const parent = dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  throw new RepoBoundaryError(
    `REPO_BOUNDARY_VIOLATION: package.json name "${REPO_PACKAGE_NAME}" not found from cwd`,
  );
}
