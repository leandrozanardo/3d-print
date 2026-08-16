/**
 * Fireproof compare: original one+Piece.3mf vs upgraded otimizado.
 * Writes JSON report to .tmp/one-piece-fireproof.json
 */
import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const originalPath = path.join(root, "3ds/original/one+Piece.3mf");
const optimizedPath = path.join(root, "3ds/upgraded/one+Piece-otimizado.3mf");
const outPath = path.join(root, ".tmp/one-piece-fireproof.json");

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function dims(bounds) {
  return [
    bounds.max[0] - bounds.min[0],
    bounds.max[1] - bounds.min[1],
    bounds.max[2] - bounds.min[2],
  ];
}

function volumeApprox(d) {
  return d[0] * d[1] * d[2];
}

async function loadEngine() {
  const engineUrl = pathToFileURL(path.join(root, "packages/engine/dist/index.js")).href;
  return import(engineUrl);
}

async function inspectViaCli(file) {
  const { spawnSync } = await import("node:child_process");
  const bin = path.join(root, "apps/cli/dist/bin.js");
  const r = spawnSync(process.execPath, [bin, "inspect-3mf", file, "--json"], {
    encoding: "utf8",
    cwd: root,
    maxBuffer: 20 * 1024 * 1024,
  });
  return {
    exitCode: r.status,
    stdout: r.stdout?.trim() || "",
    stderr: r.stderr?.trim() || "",
  };
}

async function main() {
  if (!fs.existsSync(originalPath) || !fs.existsSync(optimizedPath)) {
    throw new Error("Missing original or optimized 3MF");
  }

  const origBuf = fs.readFileSync(originalPath);
  const optBuf = fs.readFileSync(optimizedPath);

  const { processModel, BAMBU_A1_MINI } = await loadEngine();

  console.log("Running processModel on ORIGINAL (authoritative before/after)…");
  const fromOriginal = await processModel(
    {
      jobId: "fireproof-orig",
      fileName: "one+Piece.3mf",
      bytes: new Uint8Array(origBuf),
      printer: BAMBU_A1_MINI,
      goal: "balanced",
    },
    {
      onProgress: (stage, ratio) => {
        if (ratio === 0 || ratio === 1 || Math.round(ratio * 20) % 5 === 0) {
          process.stdout.write(`\r  ${stage} ${(ratio * 100).toFixed(0)}%   `);
        }
      },
    },
  );
  process.stdout.write("\n");

  console.log("Running processModel on OPTIMIZED (re-optimize / stability)…");
  const fromOptimized = await processModel(
    {
      jobId: "fireproof-opt",
      fileName: "one+Piece-otimizado.3mf",
      bytes: new Uint8Array(optBuf),
      printer: BAMBU_A1_MINI,
      goal: "balanced",
    },
    {
      onProgress: (stage, ratio) => {
        if (ratio === 0 || ratio === 1 || Math.round(ratio * 20) % 5 === 0) {
          process.stdout.write(`\r  ${stage} ${(ratio * 100).toFixed(0)}%   `);
        }
      },
    },
  );
  process.stdout.write("\n");

  console.log("CLI inspect-3mf both…");
  const inspectOrig = await inspectViaCli(originalPath);
  const inspectOpt = await inspectViaCli(optimizedPath);

  let inspectOrigJson = null;
  let inspectOptJson = null;
  try {
    inspectOrigJson = JSON.parse(inspectOrig.stdout);
  } catch {
    /* keep raw */
  }
  try {
    inspectOptJson = JSON.parse(inspectOpt.stdout);
  } catch {
    /* keep raw */
  }

  const before = fromOriginal.before;
  const after = fromOriginal.after;
  const beforeD = dims(before.bounds);
  const afterD = dims(after.bounds);
  const reBefore = fromOptimized.before;
  const reAfter = fromOptimized.after;

  const heightDropPct =
    beforeD[2] > 0 ? ((beforeD[2] - afterD[2]) / beforeD[2]) * 100 : 0;
  const scoreGain =
    fromOriginal.optimization.scoreAfter - fromOriginal.optimization.scoreBefore;
  const bedContactProxy = afterD[0] * afterD[1] - beforeD[0] * beforeD[1];

  const fitsPrinter = (d, printer) =>
    d[0] <= printer.bedWidthMm + 1e-3 &&
    d[1] <= printer.bedDepthMm + 1e-3 &&
    d[2] <= printer.maxHeightMm + 1e-3;

  const zOnBed = Math.abs(after.bounds.min[2]) < 1e-3;
  const byteDiffPct = ((optBuf.length - origBuf.length) / origBuf.length) * 100;

  const regeneratedSha = fromOriginal.output.sha256;
  const fileSha = sha256(optBuf);
  const bytesMatchEngine = fromOriginal.output.bytes.byteLength === optBuf.length;
  // Soft match: exact SHA may differ across runs if non-deterministic serialization;
  // also compare triangle counts and orientation id stability.
  const reAlreadyOptimal = fromOptimized.optimization.alreadyOptimal;
  const sameOrientationPreferred =
    fromOptimized.optimization.orientationId ===
      fromOriginal.optimization.orientationId || reAlreadyOptimal;

  const report = {
    generatedAt: new Date().toISOString(),
    printer: BAMBU_A1_MINI,
    files: {
      original: {
        path: "3ds/original/one+Piece.3mf",
        bytes: origBuf.length,
        sha256: sha256(origBuf),
      },
      optimized: {
        path: "3ds/upgraded/one+Piece-otimizado.3mf",
        bytes: optBuf.length,
        sha256: fileSha,
      },
      byteDiffPct,
    },
    fromOriginalRun: {
      durationMs: fromOriginal.durationMs,
      orientationId: fromOriginal.optimization.orientationId,
      algorithm: fromOriginal.optimization.algorithm,
      alreadyOptimal: fromOriginal.optimization.alreadyOptimal,
      scoreBefore: fromOriginal.optimization.scoreBefore,
      scoreAfter: fromOriginal.optimization.scoreAfter,
      scoreGain,
      candidateCount: fromOriginal.optimization.candidateCount,
      before: {
        triangles: before.triangleCount,
        vertices: before.vertexCount,
        watertight: before.watertight,
        bounds: before.bounds,
        dimensionsMm: beforeD,
        bboxVolumeMm3: volumeApprox(beforeD),
        fitsA1Mini: fitsPrinter(beforeD, BAMBU_A1_MINI),
      },
      after: {
        triangles: after.triangleCount,
        vertices: after.vertexCount,
        watertight: after.watertight,
        bounds: after.bounds,
        dimensionsMm: afterD,
        bboxVolumeMm3: volumeApprox(afterD),
        fitsA1Mini: fitsPrinter(afterD, BAMBU_A1_MINI),
        zMinOnBed: zOnBed,
      },
      heightDropMm: beforeD[2] - afterD[2],
      heightDropPct,
      bedFootprintDeltaMm2: bedContactProxy,
      preservation: fromOriginal.preservation,
      warnings: fromOriginal.warnings,
      regeneratedOutputSha256: regeneratedSha,
      regeneratedBytes: fromOriginal.output.bytes.byteLength,
    },
    reoptimizeOptimizedFile: {
      durationMs: fromOptimized.durationMs,
      orientationId: fromOptimized.optimization.orientationId,
      alreadyOptimal: reAlreadyOptimal,
      scoreBefore: fromOptimized.optimization.scoreBefore,
      scoreAfter: fromOptimized.optimization.scoreAfter,
      beforeTriangles: reBefore.triangleCount,
      afterTriangles: reAfter.triangleCount,
      beforeDims: dims(reBefore.bounds),
      afterDims: dims(reAfter.bounds),
      zMin: reBefore.bounds.min[2],
      sameOrientationPreferred,
    },
    consistency: {
      fileShaEqualsRegeneratedSha: fileSha === regeneratedSha,
      bytesMatchEngineLength: bytesMatchEngine,
      triangleCountUnchanged: before.triangleCount === after.triangleCount,
      meshTopologyPreserved:
        before.triangleCount === after.triangleCount &&
        before.vertexCount === after.vertexCount,
    },
    cliInspect: {
      original: {
        exitCode: inspectOrig.exitCode,
        json: inspectOrigJson,
        stderr: inspectOrig.stderr || null,
      },
      optimized: {
        exitCode: inspectOpt.exitCode,
        json: inspectOptJson,
        stderr: inspectOpt.stderr || null,
      },
    },
  };

  // Verdict scoring
  const checks = [
    {
      id: "valid-3mf-container",
      pass: inspectOpt.exitCode === 0,
      detail: `inspect-3mf exit=${inspectOpt.exitCode}`,
    },
    {
      id: "z-on-bed",
      pass: zOnBed,
      detail: `after.zMin=${after.bounds.min[2]}`,
    },
    {
      id: "fits-a1-mini",
      pass: fitsPrinter(afterD, BAMBU_A1_MINI),
      detail: `dims=${afterD.map((n) => n.toFixed(2)).join("×")} mm`,
    },
    {
      id: "orientation-changed-or-already-best",
      pass:
        !fromOriginal.optimization.alreadyOptimal ||
        fromOriginal.optimization.orientationId !== "identity",
      detail: `id=${fromOriginal.optimization.orientationId} alreadyOptimal=${fromOriginal.optimization.alreadyOptimal}`,
    },
    {
      id: "score-improved-or-equal",
      pass: scoreGain >= -1e-9,
      detail: `Δscore=${scoreGain}`,
    },
    {
      id: "topology-preserved",
      pass: before.triangleCount === after.triangleCount,
      detail: `tri ${before.triangleCount}→${after.triangleCount}`,
    },
    {
      id: "reoptimize-stable",
      pass: reAlreadyOptimal || sameOrientationPreferred,
      detail: `reAlreadyOptimal=${reAlreadyOptimal} orient=${fromOptimized.optimization.orientationId}`,
    },
    {
      id: "smaller-or-comparable-file",
      pass: byteDiffPct < 5,
      detail: `Δbytes=${byteDiffPct.toFixed(2)}%`,
    },
  ];

  const failed = checks.filter((c) => !c.pass);
  const meaningfulGain =
    heightDropPct >= 5 ||
    scoreGain > 0.01 ||
    (!fromOriginal.optimization.alreadyOptimal &&
      fromOriginal.optimization.orientationId !== "identity");

  report.verdict = {
    pass: failed.length === 0,
    meaningfulImprovement: meaningfulGain,
    failedChecks: failed.map((c) => c.id),
    checks,
    summaryPt: null,
  };

  if (!report.verdict.pass) {
    report.verdict.summaryPt =
      "Arquivo gerado tem problemas objetivos — ver checks falhos.";
  } else if (fromOriginal.optimization.alreadyOptimal && heightDropPct < 1) {
    report.verdict.summaryPt =
      "Arquivo válido e estável; o original já estava próximo do ótimo para o objetivo balanced — ganho geométrico pequeno.";
  } else if (meaningfulGain) {
    report.verdict.summaryPt =
      "Arquivo válido, imprimível no A1 Mini, orientação melhor que o original com ganho mensurável.";
  } else {
    report.verdict.summaryPt =
      "Arquivo válido e coerente; melhoria modesta no score/altura.";
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(`Wrote ${outPath}`);
  console.log(JSON.stringify(report.verdict, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
