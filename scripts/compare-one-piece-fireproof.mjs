/**
 * Geometry Quality V2 fireproof compare for private one+Piece fixture.
 * ZIP/byte size reduction is recorded but NEVER treated as geometric improvement.
 * Writes:
 *   .tmp/geometry-quality-v2/one-piece-fireproof.json
 *   artifacts/geometry-quality-v2/one-piece-fireproof.json
 */
import * as crypto from "node:crypto";
import * as fs from "node:fs";
import { createRequire } from "node:module";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

const originalPath = path.join(root, "3ds/original/one+Piece.3mf");
const optimizedPath = path.join(root, "3ds/upgraded/one+Piece-otimizado.3mf");
const outTmp = path.join(root, ".tmp/geometry-quality-v2/one-piece-fireproof.json");
const outArtifacts = path.join(
  root,
  "artifacts/geometry-quality-v2/one-piece-fireproof.json",
);

const EXPECTED_ORIGINAL_SHA =
  "5866bbb230db7fe3afe92981195431a52d67ba0a5d33babd26d2d1eb1989ab27";

const PASS_VERDICTS = new Set([
  "PASS_MEANINGFUL_ORIENTATION_IMPROVEMENT",
  "PASS_SAFE_REPAIR",
  "PASS_REPAIR_AND_ORIENTATION",
  "PASS_ALREADY_BEST_SANITIZED",
]);

const COST_EPS = 1e-9;

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function writeReport(report) {
  const body = `${JSON.stringify(report, null, 2)}\n`;
  for (const outPath of [outTmp, outArtifacts]) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, body);
  }
}

function fitsPrinter(dims, printer) {
  return (
    dims[0] <= printer.bedWidthMm + 1e-3 &&
    dims[1] <= printer.bedDepthMm + 1e-3 &&
    dims[2] <= printer.maxHeightMm + 1e-3
  );
}

function snapshotAnalysis(a) {
  return {
    vertexCount: a.vertexCount,
    triangleCount: a.triangleCount,
    bounds: a.bounds,
    dimensionsMm: [...a.dimensionsMm],
    watertight: a.watertight,
    watertightReason: a.watertightReason ?? null,
    area: a.area,
    volume: a.volume,
    issues: [...(a.issues ?? [])],
  };
}

function snapshotTopology(t) {
  if (!t) return null;
  return {
    vertexCount: t.vertexCount,
    faceCount: t.faceCount,
    componentCount: t.componentCount,
    boundaryEdgeCount: t.boundaryEdgeCount,
    nonManifoldEdgeCount: t.nonManifoldEdgeCount,
    degenerateFaceCount: t.degenerateFaceCount,
    windingConsistent: t.windingConsistent,
    watertight: t.watertight,
    area: t.area,
    volume: t.volume,
    bounds: t.bounds,
    issues: [...(t.issues ?? [])],
  };
}

function snapshotRepair(r) {
  return {
    status: r.status,
    mode: r.mode,
    operationsAttempted: [...(r.operationsAttempted ?? [])],
    operationsCommitted: [...(r.operationsCommitted ?? [])],
    reasonCodes: [...(r.reasonCodes ?? [])],
    before: snapshotTopology(r.before),
    candidate: snapshotTopology(r.candidate),
    after: snapshotTopology(r.after),
    fidelity: r.fidelity
      ? {
          passed: r.fidelity.passed,
          metrics: r.fidelity.metrics,
          reasonCodes: [...(r.fidelity.reasonCodes ?? [])],
        }
      : null,
    validator: r.validator
      ? {
          available: r.validator.available,
          accepted: r.validator.accepted,
          warnings: [...(r.validator.warnings ?? [])],
        }
      : null,
    durationMs: r.durationMs,
    counts: { ...r.counts },
  };
}

function instanceToRaw(inst) {
  const faces = [];
  for (let i = 0; i < inst.indices.length; i += 3) {
    faces.push([inst.indices[i], inst.indices[i + 1], inst.indices[i + 2]]);
  }
  return { vertices: inst.positions, faces };
}

function loadHelpers() {
  const formats3mf = require(path.join(root, "packages/formats-3mf/dist/index.js"));
  const geometry = require(path.join(root, "packages/geometry/dist/index.js"));
  const optimizer = require(path.join(root, "packages/optimizer/dist/index.js"));
  return { formats3mf, geometry, optimizer };
}

async function loadEngine() {
  const engineUrl = pathToFileURL(path.join(root, "packages/engine/dist/index.js")).href;
  return import(engineUrl);
}

function topologyPerPart(bytes, fileName, formats3mf, geometryApi) {
  const document = formats3mf.parseThreeMf(bytes, { fileName });
  let instances;
  try {
    instances = formats3mf.resolveThreeMfInstances(document, { fileName }).instances;
  } catch {
    const scene = formats3mf.flattenThreeMf(document, { fileName });
    instances = scene.meshes.map((m, i) => ({
      id: m.id ?? `mesh-${i}`,
      name: m.name ?? null,
      positions: m.positions,
      indices: m.indices,
    }));
  }
  return instances.map((inst) => {
    const topo = geometryApi.analyzeTopology(instanceToRaw(inst));
    return {
      id: inst.id,
      name: inst.name ?? null,
      topology: snapshotTopology(topo),
    };
  });
}

function costVectorForBytes(bytes, fileName, printer, formats3mf, optimizer) {
  const document = formats3mf.parseThreeMf(bytes, { fileName });
  const scene = formats3mf.flattenThreeMf(document, { fileName });
  const raw = formats3mf.canonicalToRawMesh(scene);
  const volume = {
    x: printer.bedWidthMm,
    y: printer.bedDepthMm,
    z: printer.maxHeightMm,
  };
  const metrics = optimizer.computeOrientationMetricsV2(raw, volume);
  return {
    costs: { ...metrics.costs },
    totalCost: optimizer.totalCost(metrics.costs, optimizer.weightsForGoal("balanced")),
    heightMm: metrics.heightMm,
    fitsBuildVolume: metrics.fitsBuildVolume,
    footprintAreaMm2: metrics.footprintAreaMm2,
  };
}

function reopenOutput(bytes, formats3mf) {
  const validation = formats3mf.validateThreeMf(bytes);
  let partCount = 0;
  let reopenOk = false;
  let reopenError = null;
  try {
    const document = formats3mf.parseThreeMf(bytes, { fileName: "reopen.3mf" });
    const resolved = formats3mf.resolveThreeMfInstances(document, {
      fileName: "reopen.3mf",
    });
    partCount = resolved.instances.length;
    reopenOk = partCount >= 1;
  } catch (err) {
    reopenError = err instanceof Error ? err.message : String(err);
    try {
      const document = formats3mf.parseThreeMf(bytes, { fileName: "reopen.3mf" });
      const scene = formats3mf.flattenThreeMf(document, { fileName: "reopen.3mf" });
      partCount = scene.meshes.length;
      reopenOk = partCount >= 1;
      reopenError = null;
    } catch (err2) {
      reopenError = err2 instanceof Error ? err2.message : String(err2);
    }
  }
  return {
    validationOk: validation.ok,
    validationIssues: [...(validation.issues ?? [])],
    reopenOk,
    partCount,
    reopenError,
  };
}

function mapPassVerdict(decisionKind) {
  switch (decisionKind) {
    case "orientation-improved":
      return "PASS_MEANINGFUL_ORIENTATION_IMPROVEMENT";
    case "repair-only":
      return "PASS_SAFE_REPAIR";
    case "repair-and-orientation-improved":
      return "PASS_REPAIR_AND_ORIENTATION";
    case "already-best-or-sanitized":
      return "PASS_ALREADY_BEST_SANITIZED";
    default:
      return "PASS_ALREADY_BEST_SANITIZED";
  }
}

function decideVerdict({
  outputReopen,
  repeatability,
  repair,
  optimization,
  before,
  after,
  printer,
}) {
  if (!outputReopen.validationOk || !outputReopen.reopenOk) {
    return {
      code: "FAIL_OUTPUT_INVALID",
      reason: "Output 3MF failed validation or reopen",
    };
  }
  if (!repeatability.deterministic) {
    return {
      code: "FAIL_NON_DETERMINISTIC",
      reason: "Two processModel runs diverged on orientation/cost/sha",
    };
  }
  if (
    repair.status === "committed" &&
    repair.fidelity &&
    repair.fidelity.passed === false
  ) {
    return {
      code: "FAIL_REPAIR_FIDELITY",
      reason: "Repair committed with failed fidelity gate",
    };
  }
  const repairClaims =
    optimization.decisionKind === "repair-only" ||
    optimization.decisionKind === "repair-and-orientation-improved";
  if (
    repairClaims &&
    repair.status !== "committed" &&
    (repair.reasonCodes ?? []).some((c) => String(c).startsWith("FIDELITY_"))
  ) {
    return {
      code: "FAIL_REPAIR_FIDELITY",
      reason: "Decision claims repair but fidelity rejected commit",
    };
  }

  const costRegressed = optimization.costAfter > optimization.costBefore + COST_EPS;
  const fitsBefore = fitsPrinter(before.dimensionsMm, printer);
  const fitsAfter = fitsPrinter(after.dimensionsMm, printer);
  if (costRegressed && repair.status !== "committed") {
    return {
      code: "FAIL_REGRESSION",
      reason: `costAfter ${optimization.costAfter} > costBefore ${optimization.costBefore}`,
    };
  }
  if (fitsBefore && !fitsAfter) {
    return {
      code: "FAIL_REGRESSION",
      reason: "Model fit A1 Mini before but not after",
    };
  }

  return {
    code: mapPassVerdict(optimization.decisionKind),
    reason: `decisionKind=${optimization.decisionKind}`,
  };
}

async function runProcessModel(processModel, BAMBU_A1_MINI, bytes, fileName, jobId) {
  return processModel(
    {
      jobId,
      fileName,
      bytes: new Uint8Array(bytes),
      printer: BAMBU_A1_MINI,
      goal: "balanced",
      repairMode: "safe",
    },
    {
      onProgress: (stage, ratio) => {
        if (ratio === 0 || ratio === 1 || Math.round(ratio * 20) % 5 === 0) {
          process.stdout.write(`\r  [${jobId}] ${stage} ${(ratio * 100).toFixed(0)}%   `);
        }
      },
    },
  );
}

async function main() {
  const generatedAt = new Date().toISOString();

  if (!fs.existsSync(originalPath)) {
    const report = {
      schemaVersion: "geometry-quality-v2.fireproof.1",
      generatedAt,
      verdict: {
        code: "FAIL_PRIVATE_FIXTURE_MISSING",
        reason: "3ds/original/one+Piece.3mf not found",
      },
      originalUnchanged: null,
      warnings: [{ code: "PRIVATE_FIXTURE_MISSING", message: "Original fixture absent" }],
      limitations: [
        "Cannot evaluate Geometry Quality V2 without private one+Piece fixture",
      ],
      note: "ZIP/byte size is never used as geometric improvement evidence",
    };
    writeReport(report);
    console.error(JSON.stringify(report.verdict, null, 2));
    process.exit(1);
  }

  const { formats3mf, geometry: geometryApi, optimizer } = loadHelpers();
  const { processModel, BAMBU_A1_MINI } = await loadEngine();

  const origBuf = fs.readFileSync(originalPath);
  const originalShaBefore = sha256(origBuf);
  const originalShaMatchesExpected = originalShaBefore === EXPECTED_ORIGINAL_SHA;

  let optimizedExisted = fs.existsSync(optimizedPath);
  let regeneratedOptimized = false;

  console.log("Topology per part (original)…");
  const partsOriginal = topologyPerPart(
    origBuf,
    "one+Piece.3mf",
    formats3mf,
    geometryApi,
  );

  console.log("Cost vector (original / identity)…");
  const costBeforeVector = costVectorForBytes(
    origBuf,
    "one+Piece.3mf",
    BAMBU_A1_MINI,
    formats3mf,
    optimizer,
  );

  console.log("processModel run A (authoritative)…");
  const runA = await runProcessModel(
    processModel,
    BAMBU_A1_MINI,
    origBuf,
    "one+Piece.3mf",
    "fireproof-v2-a",
  );
  process.stdout.write("\n");

  if (!optimizedExisted) {
    fs.mkdirSync(path.dirname(optimizedPath), { recursive: true });
    fs.writeFileSync(optimizedPath, Buffer.from(runA.output.bytes));
    regeneratedOptimized = true;
    optimizedExisted = true;
    console.log(`Regenerated ${path.relative(root, optimizedPath)}`);
  }

  const optBuf = fs.readFileSync(optimizedPath);
  const optimizedSha = sha256(optBuf);

  console.log("Output reopen / validate (engine output)…");
  const outputReopen = reopenOutput(runA.output.bytes, formats3mf);
  const partsAfter = topologyPerPart(
    runA.output.bytes,
    "one+Piece-otimizado.3mf",
    formats3mf,
    geometryApi,
  );

  console.log("Cost vector (after / identity on oriented mesh)…");
  const costAfterVector = costVectorForBytes(
    runA.output.bytes,
    "one+Piece-otimizado.3mf",
    BAMBU_A1_MINI,
    formats3mf,
    optimizer,
  );

  console.log("processModel run B (repeatability)…");
  const runB = await runProcessModel(
    processModel,
    BAMBU_A1_MINI,
    origBuf,
    "one+Piece.3mf",
    "fireproof-v2-b",
  );
  process.stdout.write("\n");

  const originalShaAfter = sha256(fs.readFileSync(originalPath));
  const originalUnchanged =
    originalShaBefore === originalShaAfter && originalShaMatchesExpected;

  const repeatability = {
    orientationIdMatch:
      runA.optimization.orientationId === runB.optimization.orientationId,
    costAfterMatch:
      Math.abs(runA.optimization.costAfter - runB.optimization.costAfter) < COST_EPS,
    qualityIndexMatch:
      runA.optimization.qualityIndexAfter === runB.optimization.qualityIndexAfter,
    outputShaMatch: runA.output.sha256 === runB.output.sha256,
    decisionKindMatch: runA.optimization.decisionKind === runB.optimization.decisionKind,
    runA: {
      orientationId: runA.optimization.orientationId,
      costAfter: runA.optimization.costAfter,
      qualityIndexAfter: runA.optimization.qualityIndexAfter,
      outputSha256: runA.output.sha256,
      decisionKind: runA.optimization.decisionKind,
      durationMs: runA.durationMs,
    },
    runB: {
      orientationId: runB.optimization.orientationId,
      costAfter: runB.optimization.costAfter,
      qualityIndexAfter: runB.optimization.qualityIndexAfter,
      outputSha256: runB.output.sha256,
      decisionKind: runB.optimization.decisionKind,
      durationMs: runB.durationMs,
    },
  };
  repeatability.deterministic =
    repeatability.orientationIdMatch &&
    repeatability.costAfterMatch &&
    repeatability.qualityIndexMatch &&
    repeatability.outputShaMatch &&
    repeatability.decisionKindMatch;

  const byteDiffPct = ((optBuf.length - origBuf.length) / origBuf.length) * 100;
  const dimsAfter = [...runA.after.dimensionsMm];
  const minZ = runA.after.bounds.min[2];

  const verdict = decideVerdict({
    outputReopen,
    repeatability,
    repair: runA.repair,
    optimization: runA.optimization,
    before: runA.before,
    after: runA.after,
    printer: BAMBU_A1_MINI,
  });

  const report = {
    schemaVersion: "geometry-quality-v2.fireproof.1",
    generatedAt,
    engineVersion: runA.engineVersion,
    printer: BAMBU_A1_MINI,
    goal: "balanced",
    repairMode: "safe",
    note: "ZIP/byte size reduction is NOT geometric improvement evidence",
    hashes: {
      original: originalShaBefore,
      originalExpected: EXPECTED_ORIGINAL_SHA,
      originalMatchesExpected: originalShaMatchesExpected,
      optimizedFile: optimizedSha,
      engineOutput: runA.output.sha256,
      engineOutputMatchesOptimizedFile: runA.output.sha256 === optimizedSha,
    },
    bytes: {
      original: origBuf.length,
      optimizedFile: optBuf.length,
      engineOutput: runA.output.bytes.byteLength,
      byteDiffPctInformationalOnly: byteDiffPct,
    },
    partCount: runA.partCount,
    topologyPerPart: {
      original: partsOriginal,
      after: partsAfter,
    },
    before: snapshotAnalysis(runA.before),
    normalized: snapshotAnalysis(runA.normalized),
    after: snapshotAnalysis(runA.after),
    repair: snapshotRepair(runA.repair),
    bestV1: {
      cost: runA.optimization.bestLegacyCost,
    },
    bestV2: {
      cost: runA.optimization.bestV2Cost,
      selectedOrientationId: runA.optimization.orientationId,
    },
    candidateCounts: {
      lockedV1: runA.optimization.candidateCount,
      legacy: runA.optimization.legacyCandidateCount,
      quick: runA.optimization.quickCandidateCount,
      exact: runA.optimization.exactCandidateCount,
    },
    weights: { ...runA.optimization.weights },
    costVector: {
      before: costBeforeVector.costs,
      after: costAfterVector.costs,
      totals: {
        beforeIdentity: costBeforeVector.totalCost,
        afterIdentity: costAfterVector.totalCost,
        processModelBefore: runA.optimization.costBefore,
        processModelAfter: runA.optimization.costAfter,
      },
    },
    qualityIndex: {
      before: runA.optimization.qualityIndexBefore,
      after: runA.optimization.qualityIndexAfter,
    },
    orientation: {
      id: runA.optimization.orientationId,
      algorithm: runA.optimization.algorithm,
      decisionKind: runA.optimization.decisionKind,
      alreadyOptimal: runA.optimization.alreadyOptimal,
      meaningfulImprovement: runA.optimization.meaningfulImprovement,
      relativeImprovement: runA.optimization.relativeImprovement,
      matrix: [...runA.optimization.matrix],
      quaternion: [...runA.optimization.quaternion],
    },
    dimensions: {
      beforeMm: [...runA.before.dimensionsMm],
      normalizedMm: [...runA.normalized.dimensionsMm],
      afterMm: dimsAfter,
    },
    minZ,
    fitA1Mini: {
      before: fitsPrinter(runA.before.dimensionsMm, BAMBU_A1_MINI),
      normalized: fitsPrinter(runA.normalized.dimensionsMm, BAMBU_A1_MINI),
      after: fitsPrinter(dimsAfter, BAMBU_A1_MINI),
    },
    outputReopen,
    repeatability,
    originalUnchanged: {
      shaBefore: originalShaBefore,
      shaAfter: originalShaAfter,
      matchesExpected: originalShaMatchesExpected,
      unchanged: originalUnchanged,
    },
    optimizedFile: {
      path: "3ds/upgraded/one+Piece-otimizado.3mf",
      existedBeforeRun: !regeneratedOptimized,
      regeneratedFromProcessModel: regeneratedOptimized,
    },
    preservation: runA.preservation,
    warnings: [...(runA.warnings ?? [])],
    limitations: [
      ...(runA.optimization.limitations ?? []),
      "ZIP/byte size is informational only and must not drive PASS/FAIL",
      "Geometric proxies only — not slicer time/material guarantees",
    ],
    durationMs: {
      runA: runA.durationMs,
      runB: runB.durationMs,
    },
    verdict,
  };

  writeReport(report);
  console.log(`Wrote ${path.relative(root, outTmp)}`);
  console.log(`Wrote ${path.relative(root, outArtifacts)}`);
  console.log(JSON.stringify(verdict, null, 2));

  if (!PASS_VERDICTS.has(verdict.code)) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
