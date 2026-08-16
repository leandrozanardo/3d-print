import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

import { assertInsideRepository, RepoBoundaryError } from "./assertInsideRepository";

export interface DeletionManifestEntry {
  path: string;
  sha256Before: string;
  replacement: string;
  parityEvidence: string;
  reason: string;
}

export interface DeletionManifest {
  schemaVersion: 1;
  expectedHead: string;
  files: DeletionManifestEntry[];
}

const PROTECTED_PREFIXES = [
  ".git/",
  ".cursor/",
  "docs/",
  "project_plans/",
  "3ds/original/",
];

export function sha256File(absPath: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(absPath));
  return hash.digest("hex");
}

export function validateManifestForDryRun(
  repoRoot: string,
  manifest: DeletionManifest,
  options: { actualHead: string },
): { ok: true } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  if (manifest.schemaVersion !== 1) {
    errors.push("unsupported schemaVersion");
  }
  if (manifest.expectedHead !== options.actualHead) {
    errors.push(
      `expectedHead mismatch: manifest=${manifest.expectedHead} actual=${options.actualHead}`,
    );
  }
  for (const entry of manifest.files) {
    const normalized = entry.path.replace(/\\/g, "/");
    if (normalized.includes("..") || path.isAbsolute(normalized)) {
      errors.push(`illegal path: ${entry.path}`);
      continue;
    }
    if (PROTECTED_PREFIXES.some((p) => normalized.startsWith(p))) {
      errors.push(`protected path: ${entry.path}`);
      continue;
    }
    if (normalized.endsWith("/") || normalized === "" || !normalized.includes(".")) {
      // Heuristic: refuse directory-looking targets
      if (!normalized.includes(".") || normalized.endsWith("/")) {
        errors.push(`directory or glob refused: ${entry.path}`);
        continue;
      }
    }
    try {
      assertInsideRepository(repoRoot, normalized);
    } catch (e) {
      if (e instanceof RepoBoundaryError) {
        errors.push(`boundary: ${entry.path}`);
        continue;
      }
      throw e;
    }
    const abs = path.join(repoRoot, normalized);
    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
      errors.push(`missing file: ${entry.path}`);
      continue;
    }
    const digest = sha256File(abs);
    if (digest !== entry.sha256Before) {
      errors.push(`hash mismatch: ${entry.path}`);
    }
    const replacementAbs = path.isAbsolute(entry.replacement)
      ? entry.replacement
      : path.join(repoRoot, entry.replacement);
    if (!fs.existsSync(replacementAbs)) {
      errors.push(`missing replacement: ${entry.replacement}`);
    }
    const evidenceAbs = path.isAbsolute(entry.parityEvidence)
      ? entry.parityEvidence
      : path.join(repoRoot, entry.parityEvidence);
    if (!fs.existsSync(evidenceAbs)) {
      errors.push(`missing evidence: ${entry.parityEvidence}`);
    }
  }
  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}

/**
 * Dry-run only. Never deletes. Live retirement requires separate authorization.
 */
export function dryRunPythonRetirement(
  repoRoot: string,
  manifest: DeletionManifest,
  actualHead: string,
): { wouldDelete: string[]; errors: string[] } {
  const result = validateManifestForDryRun(repoRoot, manifest, { actualHead });
  if (!result.ok) {
    return { wouldDelete: [], errors: result.errors };
  }
  return {
    wouldDelete: manifest.files.map((f) => f.path.replace(/\\/g, "/")),
    errors: [],
  };
}
