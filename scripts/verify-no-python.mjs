#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const result = spawnSync("git", ["ls-files", "*.py"], { cwd: ROOT, encoding: "utf8" });
if (result.status !== 0) {
  console.error(result.stderr);
  process.exit(result.status ?? 1);
}
const files = result.stdout.split(/\r?\n/).filter(Boolean);
if (files.length > 0) {
  console.error("Python files still tracked:\n" + files.join("\n"));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, pythonTracked: 0 }));
