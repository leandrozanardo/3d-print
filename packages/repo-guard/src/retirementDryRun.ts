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

function normalizeRel(raw: string): string {
  return raw.replace(/\\/g, "/").trim();
}

/** Manifest entries must be relative-only (no absolute / drive / UNC). */
function isAbsoluteLike(raw: string): boolean {
  const n = normalizeRel(raw);
  return (
    path.isAbsolute(raw) ||
    path.isAbsolute(n) ||
    /^[a-zA-Z]:/.test(n) ||
    n.startsWith("//") ||
    n.startsWith("\\\\")
  );
}

function hasGlobChars(normalized: string): boolean {
  return normalized.includes("*") || normalized.includes("?");
}

function hasTraversal(normalized: string): boolean {
  return (
    normalized === ".." ||
    normalized.startsWith("../") ||
    normalized.includes("/../") ||
    normalized.endsWith("/..") ||
    normalized.split("/").includes("..")
  );
}

/**
 * Require a relative path that resolves strictly inside the repository.
 * Returns proven absolute path or an error message.
 */
function requireRelativeInside(
  repoRoot: string,
  raw: string,
  label: string,
): { ok: true; abs: string; rel: string } | { ok: false; error: string } {
  if (raw.trim() === "") {
    return { ok: false, error: `empty ${label}` };
  }
  if (isAbsoluteLike(raw)) {
    return { ok: false, error: `absolute ${label}: ${raw}` };
  }
  const rel = normalizeRel(raw);
  if (rel === "" || hasTraversal(rel) || hasGlobChars(rel)) {
    return {
      ok: false,
      error: hasGlobChars(rel)
        ? `glob-like ${label}: ${raw}`
        : `illegal ${label}: ${raw}`,
    };
  }
  try {
    const abs = assertInsideRepository(repoRoot, rel);
    return { ok: true, abs, rel };
  } catch (e) {
    if (e instanceof RepoBoundaryError) {
      return { ok: false, error: `boundary: ${label} ${raw}` };
    }
    throw e;
  }
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
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
    errors.push("empty manifest");
    return { ok: false, errors };
  }

  const seen = new Set<string>();

  for (const entry of manifest.files) {
    const pathCheck = requireRelativeInside(repoRoot, entry.path, "path");
    if (!pathCheck.ok) {
      if (pathCheck.error.startsWith("absolute ")) {
        errors.push(`illegal path: ${entry.path}`);
      } else if (pathCheck.error.startsWith("empty ")) {
        errors.push("empty path");
      } else if (pathCheck.error.startsWith("glob-like ")) {
        errors.push(`glob-like: ${entry.path}`);
      } else {
        errors.push(
          pathCheck.error.startsWith("boundary:")
            ? `boundary: ${entry.path}`
            : pathCheck.error.includes("illegal")
              ? `illegal path: ${entry.path}`
              : pathCheck.error,
        );
      }
      continue;
    }

    const { abs, rel: normalized } = pathCheck;

    if (seen.has(normalized)) {
      errors.push(`duplicate entry: ${entry.path}`);
      continue;
    }
    seen.add(normalized);

    if (PROTECTED_PREFIXES.some((p) => normalized.startsWith(p))) {
      errors.push(`protected path: ${entry.path}`);
      continue;
    }

    if (!fs.existsSync(abs)) {
      errors.push(`missing file: ${entry.path}`);
      continue;
    }
    const st = fs.statSync(abs);
    if (st.isDirectory()) {
      errors.push(`directory or glob refused: ${entry.path}`);
      continue;
    }
    if (!st.isFile()) {
      errors.push(`missing file: ${entry.path}`);
      continue;
    }

    const digest = sha256File(abs);
    if (digest !== entry.sha256Before) {
      errors.push(`hash mismatch: ${entry.path}`);
    }

    const replacementCheck = requireRelativeInside(
      repoRoot,
      entry.replacement,
      "replacement",
    );
    if (!replacementCheck.ok) {
      errors.push(replacementCheck.error);
    } else if (
      !fs.existsSync(replacementCheck.abs) ||
      !fs.statSync(replacementCheck.abs).isFile()
    ) {
      errors.push(`missing replacement: ${entry.replacement}`);
    }

    const evidenceCheck = requireRelativeInside(
      repoRoot,
      entry.parityEvidence,
      "parity-evidence",
    );
    if (!evidenceCheck.ok) {
      errors.push(evidenceCheck.error);
    } else if (
      !fs.existsSync(evidenceCheck.abs) ||
      !fs.statSync(evidenceCheck.abs).isFile()
    ) {
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
    wouldDelete: manifest.files.map((f) => normalizeRel(f.path)),
    errors: [],
  };
}
