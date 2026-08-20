/**
 * Runs the repo-pinned pnpm (10.12.1) without requiring a global `pnpm` on PATH.
 * Uses PATH pnpm when present; otherwise npx. Does not enable Corepack (writes outside the repo).
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNPM_VERSION = "10.12.1";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const isWin = process.platform === "win32";

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    env: process.env,
    shell: isWin,
    stdio: "inherit",
    encoding: "utf8",
  });
  return result.status ?? (result.error ? 1 : 0);
}

function pnpmOnPath() {
  const cmd = isWin ? "pnpm.cmd" : "pnpm";
  const result = spawnSync(cmd, ["--version"], {
    cwd: root,
    env: process.env,
    shell: isWin,
    stdio: "pipe",
    encoding: "utf8",
  });
  return (result.status ?? 1) === 0;
}

function runPnpm(args) {
  if (pnpmOnPath()) {
    return run(isWin ? "pnpm.cmd" : "pnpm", args);
  }
  return run("npx", ["--yes", `pnpm@${PNPM_VERSION}`, ...args]);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("usage: node scripts/run-pnpm.mjs <pnpm args...>");
  process.exit(1);
}

if (!existsSync(join(root, "node_modules"))) {
  console.log("Installing dependencies (first run)...");
  const installStatus = runPnpm(["install"]);
  if (installStatus !== 0) {
    process.exit(installStatus);
  }
}

process.exit(runPnpm(args));
