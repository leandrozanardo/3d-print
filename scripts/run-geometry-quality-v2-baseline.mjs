/**
 * Phase A baseline runner — records exit codes under .tmp/geometry-quality-v2/
 */
import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, ".tmp/geometry-quality-v2");
const manifestPath = path.join(
  root,
  "project_plans/execution/geometry-quality-v2/baseline-manifest.json",
);

const commands = [
  ["npx", ["--yes", "pnpm@10.12.1", "install", "--frozen-lockfile"]],
  ["npx", ["--yes", "pnpm@10.12.1", "verify:boundary"]],
  ["npx", ["--yes", "pnpm@10.12.1", "verify:no-python"]],
  ["npx", ["--yes", "pnpm@10.12.1", "verify:acceptance-lock"]],
  ["npx", ["--yes", "pnpm@10.12.1", "format:check"]],
  ["npx", ["--yes", "pnpm@10.12.1", "lint"]],
  ["npx", ["--yes", "pnpm@10.12.1", "typecheck"]],
  ["npx", ["--yes", "pnpm@10.12.1", "test:unit"]],
  ["npx", ["--yes", "pnpm@10.12.1", "build"]],
  ["npx", ["--yes", "pnpm@10.12.1", "test:e2e:public"]],
  ["npx", ["--yes", "pnpm@10.12.1", "test:network"]],
  ["npx", ["--yes", "pnpm@10.12.1", "test:a11y"]],
  ["npx", ["--yes", "pnpm@10.12.1", "test:repeatability"]],
  ["npx", ["--yes", "pnpm@10.12.1", "test:e2e:private"]],
  ["npx", ["--yes", "pnpm@10.12.1", "verify"]],
];

fs.mkdirSync(outDir, { recursive: true });

const results = [];
let failed = false;

for (const [cmd, args] of commands) {
  if (failed && args.includes("verify") && args[args.length - 1] === "verify") {
    results.push({
      command: `${cmd} ${args.join(" ")}`,
      skipped: true,
      reason: "prior failure",
    });
    continue;
  }
  const label = `${cmd} ${args.join(" ")}`;
  const logFile = path.join(
    outDir,
    `baseline-${args.join("-").replace(/[^a-zA-Z0-9._-]+/g, "_")}.log`,
  );
  console.log(`\n=== RUN ${label} ===`);
  const started = Date.now();
  const r = spawnSync(cmd, args, {
    cwd: root,
    encoding: "utf8",
    shell: true,
    maxBuffer: 50 * 1024 * 1024,
    env: { ...process.env, FORCE_COLOR: "0" },
  });
  const durationMs = Date.now() - started;
  const exitCode = r.status ?? 1;
  const body = `${r.stdout || ""}\n${r.stderr || ""}`;
  fs.writeFileSync(logFile, body);
  console.log(
    `exit=${exitCode} durationMs=${durationMs} log=${path.relative(root, logFile)}`,
  );
  results.push({
    command: label,
    exitCode,
    durationMs,
    log: path.relative(root, logFile).replace(/\\/g, "/"),
  });
  if (exitCode !== 0) {
    failed = true;
    console.error(`BASELINE_FAIL at: ${label}`);
    // Continue collecting remaining non-verify gates for diagnosis except stop after first fail for speed?
    // Mission says fix and re-run — record fail then break to fix.
    break;
  }
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
manifest.commands = results;
manifest.baselinePass = !failed;
manifest.completedAt = new Date().toISOString();
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
fs.writeFileSync(
  path.join(outDir, "baseline-commands.json"),
  JSON.stringify(results, null, 2),
);

process.exit(failed ? 1 : 0);
