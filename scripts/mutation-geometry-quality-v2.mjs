#!/usr/bin/env node
/**
 * QA-011 mutation harness — temporary mutants must be killed by V2 tests.
 * Never touches 3ds/original/**. Restores files in finally.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function run(filter, testArg) {
  return spawnSync(
    "npx",
    ["--yes", "pnpm@10.12.1", "--filter", filter, "run", "test", "--", testArg],
    { cwd: ROOT, encoding: "utf8", shell: true },
  );
}

const mutants = [
  {
    id: "force-watertight-true",
    file: "packages/geometry/src/topology.ts",
    apply: (src) => src.replace(/watertight:\s*[a-zA-Z0-9_]+/, "watertight: true"),
    killTest: () => run("@fix-my-print/geometry", "safe-repair"),
  },
  {
    id: "limit-v2-to-24",
    file: "packages/optimizer/src/evaluateOrientationsV2.ts",
    apply: (src) =>
      src.replace(
        /directionSeeds = \[\.\.\.legacy, \.\.\.nonLegacy\];/,
        "directionSeeds = [...legacy]; // mutant: drop non-legacy V2 candidates",
      ),
    killTest: () => run("@fix-my-print/optimizer", "orientation-v2"),
  },
  {
    id: "ignore-goal",
    file: "packages/optimizer/src/evaluateOrientationsV2.ts",
    apply: (src) =>
      src.replace(
        /const goal = options\.goal \?\? "balanced";/,
        'const goal = "balanced"; void options.goal;',
      ),
    killTest: () => run("@fix-my-print/optimizer", "orientation-v2"),
  },
];

const matrix = [];
let killed = 0;

for (const mutant of mutants) {
  const abs = path.join(ROOT, mutant.file);
  const original = fs.readFileSync(abs, "utf8");
  try {
    const mutated = mutant.apply(original);
    if (mutated === original) {
      matrix.push({
        mutant: mutant.id,
        killedBy: null,
        exitCode: 1,
        note: "noop mutation",
      });
      continue;
    }
    fs.writeFileSync(abs, mutated, "utf8");
    const result = mutant.killTest();
    const exitCode = result.status ?? 1;
    const dead = exitCode !== 0;
    if (dead) killed += 1;
    matrix.push({
      mutant: mutant.id,
      killedBy: dead ? "focused-v2-test" : null,
      exitCode,
    });
  } finally {
    fs.writeFileSync(abs, original, "utf8");
  }
}

const outDir = path.join(ROOT, "artifacts/geometry-quality-v2");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "mutation-matrix.json"),
  `${JSON.stringify({ matrix, killed, required: mutants.length }, null, 2)}\n`,
);

console.log(JSON.stringify({ killed, total: mutants.length, matrix }, null, 2));
if (killed < mutants.length) {
  console.error("MUTATION_HARNESS_INCOMPLETE");
  process.exit(1);
}
