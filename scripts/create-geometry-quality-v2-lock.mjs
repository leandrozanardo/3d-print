#!/usr/bin/env node
/**
 * Create geometry-quality-v2 acceptance lock (SHA-256 of protected files).
 * Run after RED tests exist; do not edit locked files to make implementation pass.
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(
  ROOT,
  "project_plans/execution/geometry-quality-v2/geometry-quality-v2-acceptance-lock.json",
);

const entries = [
  "project_plans/execution/geometry-quality-v2/ACCEPTANCE_CONTRACT.md",
  "packages/formats-3mf/tests/instances-two-cubes.test.ts",
  "packages/formats-3mf/tests/multiobject-roundtrip.test.ts",
  "packages/geometry/tests/safe-repair.test.ts",
  "packages/optimizer/tests/orientation-v2.test.ts",
  "packages/engine/tests/process-model-v2.test.ts",
  "apps/web/e2e/geometry-quality-v2/public-repair.spec.ts",
  "apps/web/e2e/geometry-quality-v2/public-non-orthogonal.spec.ts",
  "apps/web/e2e/geometry-quality-v2/public-multiobject.spec.ts",
  "apps/web/e2e/geometry-quality-v2/public-goal.spec.ts",
  "apps/web/e2e/geometry-quality-v2/private-one-piece-v2.spec.ts",
  "scripts/mutation-geometry-quality-v2.mjs",
  "scripts/create-geometry-quality-v2-lock.mjs",
  "scripts/verify-geometry-quality-v2-lock.mjs",
];

function sha256File(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    throw new Error(`LOCK_ENTRY_MISSING: ${rel}`);
  }
  const bytes = fs.readFileSync(abs);
  return createHash("sha256").update(bytes).digest("hex");
}

const lock = {
  createdAt: new Date().toISOString(),
  algorithm: "sha256",
  version: "geometry-quality-v2.0.0",
  files: Object.fromEntries(entries.map((rel) => [rel, sha256File(rel)])),
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, `${JSON.stringify(lock, null, 2)}\n`, "utf8");
console.log(`Wrote ${OUT}`);
