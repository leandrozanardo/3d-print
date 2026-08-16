#!/usr/bin/env node
/**
 * Automated allow/deny tests for .cursor/hooks/repo-boundary.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const HOOK = path.join(ROOT, ".cursor", "hooks", "repo-boundary.mjs");
const FIXTURE = path.join(ROOT, ".tmp", "hook-fixture");

function runHook(payload) {
  const input = payload === null ? "" : JSON.stringify(payload);
  const result = spawnSync(process.execPath, [HOOK], {
    cwd: ROOT,
    input,
    encoding: "utf8",
  });
  const line = (result.stdout || "").trim().split(/\r?\n/).filter(Boolean).pop() || "";
  let json;
  try {
    json = JSON.parse(line);
  } catch {
    throw new Error(
      `Invalid hook stdout: ${JSON.stringify(result.stdout)} stderr=${result.stderr}`,
    );
  }
  return { json, status: result.status };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

fs.rmSync(FIXTURE, { recursive: true, force: true });
fs.mkdirSync(FIXTURE, { recursive: true });
const tempFile = path.join(FIXTURE, "a.txt");
fs.writeFileSync(tempFile, "x");

const cases = [];

function expectAllow(name, payload) {
  const { json, status } = runHook(payload);
  assert(status === 0, `${name}: exit ${status}`);
  assert(
    json.permission === "allow",
    `${name}: expected allow got ${JSON.stringify(json)}`,
  );
  cases.push({ name, ok: true, permission: "allow" });
}

function expectDeny(name, payload) {
  const { json, status } = runHook(payload);
  assert(status === 0, `${name}: exit ${status}`);
  assert(
    json.permission === "deny",
    `${name}: expected deny got ${JSON.stringify(json)}`,
  );
  cases.push({ name, ok: true, permission: "deny" });
}

// Allow
expectAllow("health-empty", null);
expectAllow("health-object", {});
expectAllow("read-inside", { cwd: ROOT, path: tempFile, tool: "Read" });
expectAllow("write-inside", { cwd: ROOT, path: path.join(FIXTURE, "b.txt") });
expectAllow("relative-inside", { cwd: ROOT, path: ".tmp/hook-fixture/a.txt" });
expectAllow("delete-file-inside", {
  cwd: ROOT,
  command: `Remove-Item -LiteralPath "${tempFile}"`,
});
expectAllow("delete-dir-inside", {
  cwd: ROOT,
  command: `Remove-Item -Recurse -LiteralPath "${FIXTURE}"`,
});
expectAllow("git-status", { cwd: ROOT, command: "git status --short" });

// Deny
expectDeny("cwd-outside", { cwd: path.parse(ROOT).root });
expectDeny("absolute-outside", {
  cwd: ROOT,
  path: path.join(path.parse(ROOT).root, "Windows"),
});
expectDeny("dotdot-escape", { cwd: ROOT, path: "../outside.txt" });
expectDeny("delete-root", {
  cwd: ROOT,
  command: `Remove-Item -Recurse -LiteralPath "${ROOT}"`,
});
expectDeny("home-tilde", { cwd: ROOT, path: "~/secret" });
expectDeny("home-env", { cwd: ROOT, path: "%USERPROFILE%\\secret" });
expectDeny(
  "invalid-json-via-raw",
  (() => {
    // Simulate invalid JSON by calling hook with bad stdin separately below
    return { path: ROOT };
  })(),
);

// Invalid JSON explicit
{
  const result = spawnSync(process.execPath, [HOOK], {
    cwd: ROOT,
    input: "\uFEFF{not-json",
    encoding: "utf8",
  });
  const line = (result.stdout || "").trim().split(/\r?\n/).filter(Boolean).pop() || "";
  const json = JSON.parse(line);
  assert(json.permission === "deny", "invalid-json should deny");
  cases.push({ name: "invalid-json-bom", ok: true, permission: "deny" });
}

// Broad destructive without target
expectDeny("destructive-no-target", { cwd: ROOT, command: "Remove-Item" });

fs.rmSync(path.join(ROOT, ".tmp", "hook-fixture"), { recursive: true, force: true });

console.log(JSON.stringify({ ok: true, cases }, null, 2));
