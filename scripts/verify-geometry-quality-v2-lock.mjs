#!/usr/bin/env node
/**
 * Verify geometry-quality-v2 acceptance lock hashes.
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOCK = path.join(
  ROOT,
  "project_plans/execution/geometry-quality-v2/geometry-quality-v2-acceptance-lock.json",
);

if (!fs.existsSync(LOCK)) {
  console.error("GEOMETRY_QUALITY_V2_LOCK_MISSING");
  process.exit(1);
}

const lock = JSON.parse(fs.readFileSync(LOCK, "utf8"));
const files = lock.files ?? {};
let failed = 0;

for (const [rel, expected] of Object.entries(files)) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.error(`MISSING ${rel}`);
    failed += 1;
    continue;
  }
  const actual = createHash("sha256").update(fs.readFileSync(abs)).digest("hex");
  if (actual !== expected) {
    console.error(`HASH_MISMATCH ${rel}\n  expected ${expected}\n  actual   ${actual}`);
    failed += 1;
  }
}

if (failed > 0) {
  console.error(`verify:geometry-quality-v2-lock FAILED (${failed})`);
  process.exit(1);
}

console.log(`verify:geometry-quality-v2-lock OK (${Object.keys(files).length} files)`);
