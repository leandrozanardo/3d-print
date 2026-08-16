#!/usr/bin/env node
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(
  ROOT,
  "project_plans/execution/product-recovery/acceptance-lock.json",
);

const entries = [
  "project_plans/execution/product-recovery/ACCEPTANCE_CONTRACT.md",
  "apps/web/e2e/acceptance/one-piece-3mf.spec.ts",
  "apps/web/e2e/acceptance/public-3mf.spec.ts",
  "apps/web/e2e/acceptance/stl.spec.ts",
  "apps/web/e2e/acceptance/network-idle.spec.ts",
  "apps/web/e2e/acceptance/error-recovery.spec.ts",
  "apps/web/e2e/acceptance/cancel.spec.ts",
  "apps/web/e2e/acceptance/offline.spec.ts",
  "apps/web/e2e/acceptance/responsive.spec.ts",
  "apps/web/e2e/acceptance/accessibility.spec.ts",
  "apps/web/e2e/acceptance/repeatability.spec.ts",
  "packages/formats-3mf/tests/acceptance/real-parse.test.ts",
  "packages/formats-3mf/tests/acceptance/security.test.ts",
  "packages/optimizer/tests/orientation-24.test.ts",
  "packages/engine/tests/process-model.test.ts",
  "scripts/create-acceptance-lock.mjs",
  "scripts/verify-acceptance-lock.mjs",
];

function sha256File(rel) {
  const abs = path.join(ROOT, rel);
  const bytes = fs.readFileSync(abs);
  return createHash("sha256").update(bytes).digest("hex");
}

const lock = {
  createdAt: new Date().toISOString(),
  algorithm: "sha256",
  files: Object.fromEntries(entries.map((rel) => [rel, sha256File(rel)])),
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, `${JSON.stringify(lock, null, 2)}\n`, "utf8");
console.log(`Wrote ${OUT}`);
