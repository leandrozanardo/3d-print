import {
  createEngineError,
  EngineException,
} from "@fix-my-print/contracts";
import {
  canonicalToRawMesh,
  flattenThreeMf,
  parseThreeMf,
  validateThreeMf,
  writeThreeMf,
  type CanonicalScene,
  type PreservationReport,
} from "@fix-my-print/formats-3mf";
import { detectFormat, parseMesh, type RawMesh } from "@fix-my-print/formats";
import {
  PureTsGeometryAdapter,
  type GeometryFacts,
  type GeometryPort,
} from "@fix-my-print/geometry";
import {
  evaluateOrientations,
  ORIENTATION_SCORE_VERSION,
  selectBestCandidate,
  type BuildVolume,
} from "@fix-my-print/optimizer";

import { sha256Hex } from "./sha256";

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
  readonly algorithm: typeof ORIENTATION_SCORE_VERSION;
  readonly orientationId: string;
  readonly scoreBefore: number;
  readonly scoreAfter: number;
  readonly candidateCount: number;
  readonly alreadyOptimal: boolean;
}

export interface ProcessModelResult {
  readonly jobId: string;
  readonly input: { readonly fileName: string; readonly format: "3mf" | "stl"; readonly bytes: number };
  readonly output: {
    readonly fileName: string;
    readonly format: "3mf" | "stl";
    readonly mimeType: string;
    readonly bytes: Uint8Array;
    readonly sha256: string;
  };
  readonly before: GeometryAnalysis;
  readonly after: GeometryAnalysis;
  readonly optimization: OptimizationDecision;
  readonly preservation: PreservationReport;
  readonly warnings: readonly { code: string; message: string }[];
  readonly preview: {
    readonly positions: Float32Array;
    readonly indices: Uint32Array;
  };
  readonly engineVersion: string;
  readonly durationMs: number;
}

export const BAMBU_A1_MINI: PrinterProfile = {
  id: "bambu-a1-mini",
  name: "Bambu Lab A1 Mini",
  bedWidthMm: 180,
  bedDepthMm: 180,
  maxHeightMm: 180,
};

const ENGINE_VERSION = "1.0.0-product-recovery";

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

function translateToBed(mesh: RawMesh, geometry: GeometryPort): RawMesh {
  const facts = geometry.inspect(mesh);
  const min = facts.bounds.min;
  return geometry.transform(mesh, {
    type: "translate",
    dx: -min[0],
    dy: -min[1],
    dz: -min[2],
  });
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

function sceneFromRaw(
  mesh: RawMesh,
  sourceFormat: "3mf" | "stl",
  fileName: string,
  warnings: { code: string; message: string }[],
): CanonicalScene {
  const positions = mesh.vertices;
  const indices = new Uint32Array(mesh.faces.length * 3);
  let o = 0;
  for (const face of mesh.faces) {
    indices[o++] = face[0]!;
    indices[o++] = face[1]!;
    indices[o++] = face[2]!;
  }
  const geometry = new PureTsGeometryAdapter();
  const facts = geometry.inspect(mesh);
  return {
    unit: "millimeter",
    meshes: [{ id: "0", name: fileName, positions, indices }],
    bounds: facts.bounds,
    sourceFormat,
    sourceMetadata: {
      fileName,
      originalUnit: "millimeter",
      memberCount: sourceFormat === "3mf" ? 0 : 1,
      objectCount: 1,
      buildItemCount: 1,
      modelPath: sourceFormat === "3mf" ? "3D/3dmodel.model" : fileName,
    },
    warnings,
  };
}

function isThreeMfName(fileName: string): boolean {
  return /\.3mf$/i.test(fileName);
}

function isStlName(fileName: string): boolean {
  return /\.stl$/i.test(fileName);
}

export type ProcessStageCallback = (stage: string, ratio: number, message: string) => void;

/**
 * End-to-end deterministic processing: parse → orient (24) → serialize → validate.
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

  progress("validating", 0.02, "Validating the file…");
  ensure();
  if (request.bytes.byteLength === 0) {
    throw new EngineException(createEngineError("MESH_PARSE_FAILED", "EMPTY_FILE"));
  }

  const volume: BuildVolume = {
    x: request.printer.bedWidthMm,
    y: request.printer.bedDepthMm,
    z: request.printer.maxHeightMm,
  };

  let sourceFormat: "3mf" | "stl";
  let mesh: RawMesh;
  let warnings: { code: string; message: string }[] = [];

  if (isThreeMfName(request.fileName) || request.bytes[0] === 0x50) {
    progress("opening-container", 0.08, "Abrindo o pacote 3MF…");
    ensure();
    progress("parsing-model", 0.15, "Lendo objetos e componentes…");
    const document = parseThreeMf(request.bytes, { fileName: request.fileName });
    progress("resolving-components", 0.28, "Montando a geometria…");
    ensure();
    const scene = flattenThreeMf(document, { fileName: request.fileName });
    mesh = canonicalToRawMesh(scene);
    sourceFormat = "3mf";
    warnings = scene.warnings.map((w) => ({ code: w.code, message: w.message }));
  } else if (isStlName(request.fileName) || detectFormat(request.bytes).startsWith("stl")) {
    progress("parsing-model", 0.15, "Lendo malha STL…");
    ensure();
    const parsed = parseMesh(request.bytes);
    mesh = parsed.mesh;
    sourceFormat = "stl";
  } else {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "UNSUPPORTED_FORMAT", { retryable: false }),
    );
  }

  if (mesh.faces.length === 0) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "EMPTY_GEOMETRY", { retryable: false }),
    );
  }

  progress("analyzing-topology", 0.4, "Analisando a malha…");
  ensure();
  const beforeFacts = geometry.inspect(mesh);
  const before = toAnalysis(beforeFacts);

  progress("evaluating-orientations", 0.5, "Comparando 24 orientações…");
  ensure();
  const details = evaluateOrientations(mesh, volume, geometry);
  const candidates = details.map((d) => d.candidate);
  const best = selectBestCandidate(candidates);
  if (!best) {
    throw new EngineException(
      createEngineError(
        "MESH_PARSE_FAILED",
        "MODEL_EXCEEDS_BUILD_VOLUME: no orientation fits the printer volume",
        { retryable: true },
      ),
    );
  }

  const identity = details.find((d) => d.spec.id.includes("yaw0") && d.spec.up === "+z");
  const identityScore = identity
    ? identity.candidate.scores.printability +
      identity.candidate.scores.strength +
      identity.candidate.scores.quality
    : 0;
  const bestDetail = details.find((d) => d.candidate.id === best.id)!;
  const bestScore =
    best.scores.printability + best.scores.strength + best.scores.quality;
  const alreadyOptimal = identity?.candidate.id === best.id;

  progress("applying-optimization", 0.7, "Aplicando a melhor orientação…");
  ensure();
  let oriented = bestDetail.mesh;
  oriented = translateToBed(oriented, geometry);
  const afterFacts = geometry.inspect(oriented);
  const after = toAnalysis(afterFacts);

  // Fit check after bed translation (size unchanged).
  const size = after.dimensionsMm;
  if (size[0] > volume.x || size[1] > volume.y || size[2] > volume.z) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "MODEL_EXCEEDS_BUILD_VOLUME", {
        retryable: true,
      }),
    );
  }

  progress("serializing", 0.82, "Gerando o novo arquivo…");
  ensure();
  let outputBytes: Uint8Array;
  let preservation: PreservationReport;
  let outputFormat: "3mf" | "stl" = sourceFormat === "stl" ? "stl" : "3mf";

  if (outputFormat === "3mf") {
    const scene = sceneFromRaw(oriented, "3mf", request.fileName, warnings);
    const written = writeThreeMf(scene, {
      objectName: request.fileName.replace(/\.[^.]+$/, ""),
      mtimeSeconds: Date.UTC(2020, 0, 1) / 1000,
    });
    outputBytes = written.bytes;
    preservation = written.preservation;
  } else {
    outputBytes = geometry.exportModel(oriented, "stl-binary");
    preservation = {
      preserved: ["STL binary mesh"],
      removed: [],
      policy: "stl-binary",
      notes: ["STL has no vendor project metadata."],
    };
  }

  progress("validating-output", 0.92, "Validando o resultado…");
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
  } else if (outputBytes.byteLength < 84) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "OUTPUT_VALIDATION_FAILED: empty STL", {
        retryable: false,
      }),
    );
  }

  progress("preparing-preview", 0.97, "Preparando o download…");
  const preview = rawToPreview(oriented);
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
    after,
    optimization: {
      algorithm: ORIENTATION_SCORE_VERSION,
      orientationId: best.id,
      scoreBefore: identityScore,
      scoreAfter: bestScore,
      candidateCount: candidates.length,
      alreadyOptimal,
    },
    preservation,
    warnings,
    preview,
    engineVersion: ENGINE_VERSION,
    durationMs: Date.now() - started,
  };
}
