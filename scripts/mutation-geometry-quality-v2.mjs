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

const ABSTAINED_STUB = `const repairResult = {
      status: "abstained",
      mode: repairMode,
      mesh: raw,
      operationsAttempted: [],
      operationsCommitted: [],
      reasonCodes: ["MUTANT_REPAIR_DISABLED"],
      before: {
        vertexCount: 0,
        faceCount: 0,
        componentCount: 0,
        boundaryEdgeCount: 0,
        nonManifoldEdgeCount: 0,
        degenerateFaceCount: 0,
        windingConsistent: null,
        watertight: false,
        area: null,
        volume: null,
        bounds: { min: [0, 0, 0], max: [0, 0, 0] },
        issues: [],
      },
      candidate: null,
      after: {
        vertexCount: 0,
        faceCount: 0,
        componentCount: 0,
        boundaryEdgeCount: 0,
        nonManifoldEdgeCount: 0,
        degenerateFaceCount: 0,
        windingConsistent: null,
        watertight: false,
        area: null,
        volume: null,
        bounds: { min: [0, 0, 0], max: [0, 0, 0] },
        issues: [],
      },
      fidelity: null,
      validator: null,
      durationMs: 0,
      counts: {
        weldedVertices: 0,
        removedDegenerateFaces: 0,
        removedDuplicateFaces: 0,
        removedUnreferencedVertices: 0,
        flippedFaces: 0,
        filledLoops: 0,
        filledTriangles: 0,
      },
    }; // mutant: skip safeRepair / force abstained`;

const mutants = [
  {
    id: "disable-repair-call",
    file: "packages/engine/src/processModel.ts",
    apply: (src) =>
      src.replace(
        /const repairResult = await safeRepair\(raw, \{ mode: repairMode \}\);/,
        ABSTAINED_STUB,
      ),
    killTest: () => run("@fix-my-print/engine", "process-model-v2"),
  },
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
  {
    id: "swap-output-for-input",
    file: "packages/engine/src/processModel.ts",
    apply: (src) =>
      src.replace(
        /progress\("validating-output", 0\.9, "Reabrindo e validando"\);/,
        'outputBytes = request.bytes; // mutant: swap output for input\n  progress("validating-output", 0.9, "Reabrindo e validando");',
      ),
    killTest: () => run("@fix-my-print/engine", "process-model-v2"),
  },
  {
    id: "skip-orientation-matrix",
    file: "packages/engine/src/processModel.ts",
    apply: (src) =>
      src.replace(
        /const rotated = geometry\.transform\(raw, \{ type: "matrix", m: selectedMatrix \}\);/,
        "const rotated = raw; // mutant: skip orientation matrix (identity)",
      ),
    killTest: () => run("@fix-my-print/engine", "process-model-v2"),
  },
  {
    id: "weld-merge-cross-object",
    file: "packages/formats-3mf/src/instances.ts",
    apply: (src) =>
      src.replace(
        /return \{\s*unit: "millimeter",\s*instances,\s*globalBounds,\s*\};/,
        `return {
    unit: "millimeter",
    // mutant: weld/merge meshes of different objects into one instance
    instances:
      instances.length <= 1
        ? instances
        : [
            {
              ...instances[0]!,
              id: "merged-cross-object",
              sourceObjectId: "merged",
              name: "merged",
              positions: Float64Array.from(allPos),
              indices: Uint32Array.from(allIdx),
              bounds: globalBounds,
            },
          ],
    globalBounds,
  };`,
      ),
    killTest: () => run("@fix-my-print/formats-3mf", "instances-two-cubes"),
  },
  {
    id: "ignore-fidelity-gate",
    file: "packages/geometry/src/repair/safeRepair.ts",
    apply: (src) =>
      src.replace(
        /if \(!fidelity\.passed\) \{/,
        "if (false && !fidelity.passed) { // mutant: ignore fidelity gate",
      ),
    killTest: () => run("@fix-my-print/geometry", "safe-repair"),
  },
  {
    id: "writer-first-mesh-only",
    file: "packages/formats-3mf/src/write.ts",
    apply: (src) =>
      src.replace(
        /const meshes = scene\.meshes\.filter\(\(m\) => m\.indices\.length >= 3\);/,
        "const meshes = scene.meshes.filter((m) => m.indices.length >= 3).slice(0, 1); // mutant: first mesh only",
      ),
    killTest: () => run("@fix-my-print/formats-3mf", "multiobject-roundtrip"),
  },
  {
    id: "remove-output-reopen",
    file: "packages/engine/src/processModel.ts",
    apply: (src) =>
      src.replace(
        /\s*\/\/ Reopen output for structural confirmation\.\s*const reopened = parseThreeMf\(outputBytes, \{ fileName: "output\.3mf" \}\);\s*const reResolved = resolveThreeMfInstances\(reopened\);\s*if \(reResolved\.instances\.length < 1\) \{\s*throw new EngineException\(\s*createEngineError\("MESH_PARSE_FAILED", "OUTPUT_REOPEN_FAILED", \{\s*retryable: false,\s*\}\),\s*\);\s*\}/,
        "\n    // mutant: removed output reopen validation\n",
      ),
    killTest: () => run("@fix-my-print/engine", "process-model-v2"),
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
      ...(dead
        ? {}
        : {
            stderrTail: (result.stderr || result.stdout || "").slice(-800),
          }),
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
