#!/usr/bin/env node
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOCK = path.join(
  ROOT,
  "project_plans/execution/product-recovery/acceptance-lock.json",
);

if (!fs.existsSync(LOCK)) {
  console.error("acceptance-lock.json missing — run scripts/create-acceptance-lock.mjs");
  process.exit(1);
}

const lock = JSON.parse(fs.readFileSync(LOCK, "utf8"));
let failed = 0;
for (const [rel, expected] of Object.entries(lock.files)) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.error(`MISSING ${rel}`);
    failed += 1;
    continue;
  }
  const actual = createHash("sha256").update(fs.readFileSync(abs)).digest("hex");
  if (actual !== expected) {
    console.error(`HASH_MISMATCH ${rel}\n expected ${expected}\n actual   ${actual}`);
    failed += 1;
  } else {
    console.log(`OK ${rel}`);
  }
}
if (failed > 0) {
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, checked: Object.keys(lock.files).length }));
