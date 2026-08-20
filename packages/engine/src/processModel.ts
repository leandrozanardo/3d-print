import { createEngineError, EngineException } from "@fix-my-print/contracts";
import {
  canonicalToRawMesh,
  flattenThreeMf,
  parseThreeMf,
  resolveThreeMfInstances,
  validateThreeMf,
  writeThreeMf,
  type CanonicalMesh,
  type CanonicalScene,
  type PreservationReport,
} from "@fix-my-print/formats-3mf";
import { detectFormat, parseMesh, type RawMesh } from "@fix-my-print/formats";
import {
  PureTsGeometryAdapter,
  analyzeTopology,
  safeRepair,
  topologyToFacts,
  type GeometryFacts,
  type GeometryPort,
  type RepairMode,
  type SafeRepairResult,
} from "@fix-my-print/geometry";
import {
  evaluateOrientationsV2,
  ORIENTATION_COUNT,
  ORIENTATION_SCORE_VERSION,
  ORIENTATION_V2_VERSION,
  qualityIndexFromCost,
  type GoalWeights,
  type OrientationDecisionKind,
} from "@fix-my-print/optimizer";

import { sha256Hex } from "./sha256";
import { assessSpaghettiRisk } from "./spaghettiRisk";

export type OptimizationGoal = "balanced" | "minimize-height" | "maximize-bed-contact";

export interface PrinterProfile {
  readonly id: string;
  readonly name: string;
  readonly bedWidthMm: number;
  readonly bedDepthMm: number;
  readonly maxHeightMm: number;
}

export interface ProcessModelRequest {
  readonly jobId: string;
  readonly fileName: string;
  readonly bytes: Uint8Array;
  readonly printer: PrinterProfile;
  readonly goal: OptimizationGoal;
  /** Conservative repair mode (RPR-001). Defaults to "safe". */
  readonly repairMode?: RepairMode;
}

export interface GeometryAnalysis {
  readonly vertexCount: number;
  readonly triangleCount: number;
  readonly bounds: GeometryFacts["bounds"];
  readonly dimensionsMm: [number, number, number];
  readonly watertight: boolean | "unknown";
  readonly watertightReason?: string;
  readonly area: number | null;
  readonly volume: number | null;
  readonly issues: readonly string[];
}

export interface OptimizationDecision {
  readonly algorithm: typeof ORIENTATION_SCORE_VERSION | typeof ORIENTATION_V2_VERSION;
  readonly orientationId: string;
  readonly scoreBefore: number;
  readonly scoreAfter: number;
  /** Locked V1 field: always 24 (product-recovery acceptance). */
  readonly candidateCount: number;
  readonly alreadyOptimal: boolean;
  readonly decisionKind: OrientationDecisionKind;
  readonly quaternion: readonly [number, number, number, number];
  readonly matrix: readonly number[];
  readonly goal: OptimizationGoal;
  readonly weights: GoalWeights;
  readonly legacyCandidateCount: number;
  readonly quickCandidateCount: number;
  readonly exactCandidateCount: number;
  readonly qualityIndexBefore: number;
  readonly qualityIndexAfter: number;
  readonly costBefore: number;
  readonly costAfter: number;
  readonly relativeImprovement: number;
  readonly meaningfulImprovement: boolean;
  readonly bestLegacyCost: number;
  readonly bestV2Cost: number;
  readonly limitations: readonly string[];
  readonly explanationCodes: readonly string[];
}

export interface ProcessModelResult {
  readonly jobId: string;
  readonly input: {
    readonly fileName: string;
    readonly format: "3mf" | "stl";
    readonly bytes: number;
  };
  readonly output: {
    readonly fileName: string;
    readonly format: "3mf" | "stl";
    readonly mimeType: string;
    readonly bytes: Uint8Array;
    readonly sha256: string;
  };
  readonly before: GeometryAnalysis;
  readonly normalized: GeometryAnalysis;
  readonly after: GeometryAnalysis;
  readonly repair: SafeRepairResult;
  readonly optimization: OptimizationDecision;
  readonly preservation: PreservationReport;
  readonly warnings: readonly { code: string; message: string }[];
  readonly preview: {
    readonly positions: Float32Array;
    readonly indices: Uint32Array;
  };
  readonly engineVersion: string;
  readonly durationMs: number;
  readonly partCount: number;
}

export const BAMBU_A1_MINI: PrinterProfile = {
  id: "bambu-a1-mini",
  name: "Bambu Lab A1 Mini",
  bedWidthMm: 180,
  bedDepthMm: 180,
  maxHeightMm: 180,
};

const ENGINE_VERSION = "2.0.0-geometry-quality";

function optimizedFileName(fileName: string, format: "3mf" | "stl"): string {
  const base = fileName.replace(/\.(3mf|stl)$/i, "");
  return `${base}-otimizado.${format}`;
}

function toAnalysis(facts: GeometryFacts): GeometryAnalysis {
  const dx = facts.bounds.max[0] - facts.bounds.min[0];
  const dy = facts.bounds.max[1] - facts.bounds.min[1];
  const dz = facts.bounds.max[2] - facts.bounds.min[2];
  return {
    vertexCount: facts.vertexCount,
    triangleCount: facts.faceCount,
    bounds: facts.bounds,
    dimensionsMm: [dx, dy, dz],
    watertight: facts.watertight,
    area: facts.area,
    volume: facts.volume,
    issues: facts.issues,
  };
}

/** Avoid expensive vertex-weld inspect on very large meshes. */
function inspectMesh(mesh: RawMesh, geometry: GeometryPort): GeometryFacts {
  if (mesh.faces.length >= 50_000) {
    return topologyToFacts(analyzeTopology(mesh));
  }
  return geometry.inspect(mesh);
}

function rawToPreview(mesh: RawMesh): { positions: Float32Array; indices: Uint32Array } {
  const positions = new Float32Array(mesh.vertices.length);
  for (let i = 0; i < mesh.vertices.length; i++) {
    positions[i] = mesh.vertices[i]!;
  }
  const indices = new Uint32Array(mesh.faces.length * 3);
  let o = 0;
  for (const face of mesh.faces) {
    indices[o++] = face[0]!;
    indices[o++] = face[1]!;
    indices[o++] = face[2]!;
  }
  return { positions, indices };
}

function rawToCanonicalMesh(
  id: string,
  name: string | null,
  mesh: RawMesh,
): CanonicalMesh {
  const indices = new Uint32Array(mesh.faces.length * 3);
  let o = 0;
  for (const face of mesh.faces) {
    indices[o++] = face[0]!;
    indices[o++] = face[1]!;
    indices[o++] = face[2]!;
  }
  return { id, name, positions: mesh.vertices, indices };
}

function sceneFromMeshes(
  meshes: CanonicalMesh[],
  sourceFormat: "3mf" | "stl",
  fileName: string,
  warnings: { code: string; message: string }[],
  geometry: GeometryPort,
): CanonicalScene {
  const combined = meshesToAssemblyRaw(meshes);
  const facts = inspectMesh(combined, geometry);
  return {
    unit: "millimeter",
    meshes,
    bounds: facts.bounds,
    sourceFormat,
    sourceMetadata: {
      fileName,
      originalUnit: "millimeter",
      memberCount: sourceFormat === "3mf" ? 0 : 1,
      objectCount: meshes.length,
      buildItemCount: meshes.length,
      modelPath: sourceFormat === "3mf" ? "3D/3dmodel.model" : fileName,
    },
    warnings,
  };
}

function meshesToAssemblyRaw(meshes: CanonicalMesh[]): RawMesh {
  const positions: number[] = [];
  const faces: number[][] = [];
  for (const mesh of meshes) {
    const base = positions.length / 3;
    for (let i = 0; i < mesh.positions.length; i++) positions.push(mesh.positions[i]!);
    for (let i = 0; i < mesh.indices.length; i += 3) {
      faces.push([
        mesh.indices[i]! + base,
        mesh.indices[i + 1]! + base,
        mesh.indices[i + 2]! + base,
      ]);
    }
  }
  return { vertices: Float64Array.from(positions), faces };
}

function isThreeMfName(fileName: string): boolean {
  return /\.3mf$/i.test(fileName);
}

function isStlName(fileName: string): boolean {
  return /\.stl$/i.test(fileName);
}

function mergeDecisionKind(
  repairCommitted: boolean,
  orientKind: OrientationDecisionKind,
): OrientationDecisionKind {
  if (repairCommitted && orientKind === "orientation-improved") {
    return "repair-and-orientation-improved";
  }
  if (repairCommitted && orientKind === "already-best-or-sanitized") {
    return "repair-only";
  }
  return orientKind;
}

export type ProcessStageCallback = (
  stage: string,
  ratio: number,
  message: string,
) => void;

/**
 * End-to-end deterministic processing V2:
 * parse → per-part analyze → safe repair → orientation V2 → serialize → validate.
 */
export async function processModel(
  request: ProcessModelRequest,
  options: {
    geometry?: GeometryPort;
    onProgress?: ProcessStageCallback;
    isCancelled?: () => boolean;
  } = {},
): Promise<ProcessModelResult> {
  const started = Date.now();
  const geometry = options.geometry ?? new PureTsGeometryAdapter();
  const progress = options.onProgress ?? (() => undefined);
  const ensure = () => {
    if (options.isCancelled?.()) {
      throw new EngineException(createEngineError("RUN_CANCELLED", "CANCELLED"));
    }
  };
  const repairMode: RepairMode = request.repairMode ?? "safe";

  progress("validating", 0.02, "Validando arquivo");
  ensure();
  if (request.bytes.byteLength === 0) {
    throw new EngineException(createEngineError("MESH_PARSE_FAILED", "EMPTY_FILE"));
  }

  const volume = {
    x: request.printer.bedWidthMm,
    y: request.printer.bedDepthMm,
    z: request.printer.maxHeightMm,
  };

  let sourceFormat: "3mf" | "stl";
  let partMeshes: CanonicalMesh[] = [];
  let warnings: { code: string; message: string }[] = [];

  if (isThreeMfName(request.fileName) || request.bytes[0] === 0x50) {
    progress("opening-container", 0.08, "Lendo objetos e componentes");
    ensure();
    const document = parseThreeMf(request.bytes, { fileName: request.fileName });
    warnings = document.warnings.map((w) => ({ code: w.code, message: w.message }));
    progress("resolving-components", 0.18, "Resolvendo instâncias");
    ensure();
    try {
      const resolved = resolveThreeMfInstances(document, { fileName: request.fileName });
      partMeshes = resolved.instances.map((inst) => {
        const faces: number[][] = [];
        for (let j = 0; j < inst.indices.length; j += 3) {
          faces.push([inst.indices[j]!, inst.indices[j + 1]!, inst.indices[j + 2]!]);
        }
        return rawToCanonicalMesh(inst.id, inst.name, {
          vertices: inst.positions,
          faces,
        });
      });
      if (partMeshes.length === 0) {
        throw new Error("empty");
      }
    } catch {
      const scene = flattenThreeMf(document, { fileName: request.fileName });
      const raw = canonicalToRawMesh(scene);
      partMeshes = [rawToCanonicalMesh("flattened-0", request.fileName, raw)];
    }
    sourceFormat = "3mf";
  } else if (
    isStlName(request.fileName) ||
    detectFormat(request.bytes).startsWith("stl")
  ) {
    progress("parsing-model", 0.15, "Lendo malha STL");
    ensure();
    const parsed = parseMesh(request.bytes);
    partMeshes = [rawToCanonicalMesh("0", request.fileName, parsed.mesh)];
    sourceFormat = "stl";
  } else {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "UNSUPPORTED_FORMAT", { retryable: false }),
    );
  }

  const assemblyBefore = meshesToAssemblyRaw(partMeshes);
  if (assemblyBefore.faces.length === 0) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "EMPTY_GEOMETRY", { retryable: false }),
    );
  }

  progress("analyzing-topology", 0.32, "Analisando peças");
  ensure();
  const before = toAnalysis(inspectMesh(assemblyBefore, geometry));

  progress("repairing", 0.4, "Tentando reparo conservador");
  ensure();
  const repairedParts: CanonicalMesh[] = [];
  let primaryRepair: SafeRepairResult | null = null;
  for (const part of partMeshes) {
    const raw: RawMesh = {
      vertices: part.positions,
      faces: (() => {
        const faces: number[][] = [];
        for (let i = 0; i < part.indices.length; i += 3) {
          faces.push([part.indices[i]!, part.indices[i + 1]!, part.indices[i + 2]!]);
        }
        return faces;
      })(),
    };
    const repairResult = await safeRepair(raw, { mode: repairMode });
    if (!primaryRepair) primaryRepair = repairResult;
    repairedParts.push(rawToCanonicalMesh(part.id, part.name, repairResult.mesh));
  }
  const repair = primaryRepair!;
  const normalizedMesh = meshesToAssemblyRaw(repairedParts);
  const normalized = toAnalysis(inspectMesh(normalizedMesh, geometry));

  progress("generating-orientations", 0.5, "Gerando orientações");
  ensure();
  progress("evaluating-candidates", 0.55, "Avaliando candidatos");
  const orient = await evaluateOrientationsV2(normalizedMesh, volume, {
    goal: request.goal,
    geometry,
    onProgress: (p) => {
      const ratio = 0.55 + 0.15 * (p.total > 0 ? p.completed / p.total : 0);
      progress(p.stage, Math.min(0.7, ratio), "Avaliando candidatos");
      ensure();
    },
  });

  if (orient.cancelled) {
    throw new EngineException(createEngineError("RUN_CANCELLED", "CANCELLED"));
  }

  progress("applying-optimization", 0.72, "Aplicando orientação");
  ensure();
  const selectedMatrix = orient.selected.matrix;
  const orientedParts = repairedParts.map((part) => {
    const raw: RawMesh = {
      vertices: part.positions,
      faces: (() => {
        const faces: number[][] = [];
        for (let i = 0; i < part.indices.length; i += 3) {
          faces.push([part.indices[i]!, part.indices[i + 1]!, part.indices[i + 2]!]);
        }
        return faces;
      })(),
    };
    const rotated = geometry.transform(raw, { type: "matrix", m: selectedMatrix });
    return rawToCanonicalMesh(part.id, part.name, rotated);
  });

  // Single assembly translation to bed (preserve relative poses).
  const orientedAssembly = meshesToAssemblyRaw(orientedParts);
  const bedFacts = inspectMesh(orientedAssembly, geometry);
  const min = bedFacts.bounds.min;
  const translatedParts = orientedParts.map((part) => {
    const raw: RawMesh = {
      vertices: part.positions,
      faces: (() => {
        const faces: number[][] = [];
        for (let i = 0; i < part.indices.length; i += 3) {
          faces.push([part.indices[i]!, part.indices[i + 1]!, part.indices[i + 2]!]);
        }
        return faces;
      })(),
    };
    const moved = geometry.transform(raw, {
      type: "translate",
      dx: -min[0],
      dy: -min[1],
      dz: -min[2],
    });
    return rawToCanonicalMesh(part.id, part.name, moved);
  });

  const finalAssembly = meshesToAssemblyRaw(translatedParts);
  const after = toAnalysis(inspectMesh(finalAssembly, geometry));

  const size = after.dimensionsMm;
  if (size[0] > volume.x || size[1] > volume.y || size[2] > volume.z) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "MODEL_EXCEEDS_BUILD_VOLUME", {
        retryable: true,
      }),
    );
  }

  progress("serializing", 0.82, "Gerando 3MF");
  ensure();
  let outputBytes: Uint8Array;
  let preservation: PreservationReport;
  const outputFormat: "3mf" | "stl" = sourceFormat === "stl" ? "stl" : "3mf";

  if (outputFormat === "3mf") {
    const scene = sceneFromMeshes(
      translatedParts,
      "3mf",
      request.fileName,
      warnings,
      geometry,
    );
    const written = writeThreeMf(scene, {
      objectName: request.fileName.replace(/\.[^.]+$/, ""),
      mtimeSeconds: Date.UTC(2020, 0, 1) / 1000,
    });
    outputBytes = written.bytes;
    preservation = written.preservation;
  } else {
    outputBytes = geometry.exportModel(finalAssembly, "stl-binary");
    preservation = {
      preserved: ["STL binary mesh"],
      removed: [],
      policy: "stl-binary",
      notes: ["STL has no vendor project metadata."],
    };
  }

  progress("validating-output", 0.9, "Reabrindo e validando");
  ensure();
  if (outputFormat === "3mf") {
    const validation = validateThreeMf(outputBytes);
    if (!validation.ok) {
      throw new EngineException(
        createEngineError(
          "MESH_PARSE_FAILED",
          `OUTPUT_VALIDATION_FAILED: ${validation.issues.join("; ")}`,
          { retryable: false },
        ),
      );
    }
    // Reopen output for structural confirmation.
    const reopened = parseThreeMf(outputBytes, { fileName: "output.3mf" });
    const reResolved = resolveThreeMfInstances(reopened);
    if (reResolved.instances.length < 1) {
      throw new EngineException(
        createEngineError("MESH_PARSE_FAILED", "OUTPUT_REOPEN_FAILED", {
          retryable: false,
        }),
      );
    }
  } else if (outputBytes.byteLength < 84) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "OUTPUT_VALIDATION_FAILED: empty STL", {
        retryable: false,
      }),
    );
  }

  const repairCommitted = repair.status === "committed";
  const decisionKind = mergeDecisionKind(repairCommitted, orient.decisionKind);
  const costBefore = orient.original.totalCost;
  const costAfter = orient.selected.totalCost;
  const relativeImprovement =
    costBefore > 1e-12 ? Math.max(0, (costBefore - costAfter) / costBefore) : 0;
  const spaghettiWarnings = assessSpaghettiRisk(orient.selected.metrics); // Bambu spaghetti modes from selected-orientation metrics
  warnings = [...warnings, ...spaghettiWarnings];

  progress("preparing-preview", 0.97, "Preparando comparação");
  const preview = rawToPreview(finalAssembly);
  progress("completed", 1, "Concluído");

  return {
    jobId: request.jobId,
    input: {
      fileName: request.fileName,
      format: sourceFormat,
      bytes: request.bytes.byteLength,
    },
    output: {
      fileName: optimizedFileName(request.fileName, outputFormat),
      format: outputFormat,
      mimeType: outputFormat === "3mf" ? "model/3mf" : "model/stl",
      bytes: outputBytes,
      sha256: await sha256Hex(outputBytes),
    },
    before,
    normalized,
    after,
    repair,
    optimization: {
      algorithm: ORIENTATION_V2_VERSION,
      orientationId: orient.selected.id,
      scoreBefore: 1 - costBefore,
      scoreAfter: 1 - costAfter,
      candidateCount: ORIENTATION_COUNT,
      alreadyOptimal: orient.alreadyOptimal && !repairCommitted,
      decisionKind,
      quaternion: [
        orient.selected.quat.w,
        orient.selected.quat.x,
        orient.selected.quat.y,
        orient.selected.quat.z,
      ],
      matrix: orient.selected.matrix,
      goal: request.goal,
      weights: orient.weights,
      legacyCandidateCount: orient.legacyCandidateCount,
      quickCandidateCount: orient.quickCandidateCount,
      exactCandidateCount: orient.exactCandidateCount,
      qualityIndexBefore: qualityIndexFromCost(costBefore),
      qualityIndexAfter: qualityIndexFromCost(costAfter),
      costBefore,
      costAfter,
      relativeImprovement,
      meaningfulImprovement: orient.meaningfulImprovement,
      bestLegacyCost: orient.v1BestCost,
      bestV2Cost: orient.v2BestCost,
      limitations: [
        "Geometric proxies only — not slicer support/time/material",
        "Requires re-slicing before print",
      ],
      explanationCodes: [
        decisionKind,
        repair.status,
        ...spaghettiWarnings.map((w) => w.code),
      ],
    },
    preservation,
    warnings,
    preview,
    engineVersion: ENGINE_VERSION,
    durationMs: Date.now() - started,
    partCount: translatedParts.length,
  };
}
