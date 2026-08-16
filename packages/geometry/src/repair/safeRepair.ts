import type { RawMesh } from "@fix-my-print/formats";

import { analyzeTopology } from "../topology";
import { extractBoundaryLoops } from "./boundaryLoops";
import { cleanFaces, removeUnreferencedVertices } from "./faces";
import { evaluateFidelity, snapshotTopology } from "./fidelity";
import { createRepairPolicy, type RepairPolicy } from "./repairPolicy";
import type { RepairMode, SafeRepairResult } from "./repairTypes";
import { earClipLoop } from "./triangulate";
import { weldVertices } from "./weld";
import { fixWinding } from "./winding";

export interface SafeRepairOptions {
  mode?: RepairMode;
  policy?: Partial<RepairPolicy>;
}

function cloneMesh(mesh: RawMesh): RawMesh {
  return {
    vertices: new Float64Array(mesh.vertices),
    faces: mesh.faces.map((f) => [...f]),
  };
}

function validateFinite(mesh: RawMesh): boolean {
  for (let i = 0; i < mesh.vertices.length; i++) {
    if (!Number.isFinite(mesh.vertices[i]!)) return false;
  }
  return true;
}

function validateIndices(mesh: RawMesh): boolean {
  const n = Math.floor(mesh.vertices.length / 3);
  for (const f of mesh.faces) {
    if (f.length < 3) return false;
    for (let i = 0; i < 3; i++) {
      const idx = f[i]!;
      if (!Number.isInteger(idx) || idx < 0 || idx >= n) return false;
    }
  }
  return true;
}

/**
 * Conservative transactional repair (RPR-004 / RPR-014).
 */
export async function safeRepair(
  mesh: RawMesh,
  options: SafeRepairOptions = {},
): Promise<SafeRepairResult> {
  return safeRepairMeshSync(mesh, options);
}

/** Sync implementation (also used by async wrapper). */
export function safeRepairMeshSync(
  mesh: RawMesh,
  options: SafeRepairOptions = {},
): SafeRepairResult {
  const started = Date.now();
  const mode: RepairMode = options.mode ?? "safe";
  const before = snapshotTopology(mesh);
  const emptyCounts = {
    weldedVertices: 0,
    removedDegenerateFaces: 0,
    removedDuplicateFaces: 0,
    removedUnreferencedVertices: 0,
    flippedFaces: 0,
    filledLoops: 0,
    filledTriangles: 0,
  };

  if (mode === "none") {
    return {
      status: "abstained",
      mode,
      mesh: cloneMesh(mesh),
      operationsAttempted: [],
      operationsCommitted: [],
      reasonCodes: ["REPAIR_MODE_NONE"],
      before,
      candidate: null,
      after: before,
      fidelity: null,
      validator: null,
      durationMs: Date.now() - started,
      counts: emptyCounts,
    };
  }

  if (!validateFinite(mesh)) {
    return {
      status: "rejected",
      mode,
      mesh: cloneMesh(mesh),
      operationsAttempted: ["validate_finite"],
      operationsCommitted: [],
      reasonCodes: ["INVALID_COORDINATES"],
      before,
      candidate: null,
      after: before,
      fidelity: null,
      validator: null,
      durationMs: Date.now() - started,
      counts: emptyCounts,
    };
  }

  const policy = createRepairPolicy(mesh, options.policy);
  if (!validateIndices(mesh) && !policy.allowRemoveInvalidFaces) {
    return {
      status: "rejected",
      mode,
      mesh: cloneMesh(mesh),
      operationsAttempted: ["validate_indices"],
      operationsCommitted: [],
      reasonCodes: ["INVALID_INDICES"],
      before,
      candidate: null,
      after: before,
      fidelity: null,
      validator: null,
      durationMs: Date.now() - started,
      counts: emptyCounts,
    };
  }

  // Fast path: already clean closed mesh.
  if (
    before.watertight &&
    before.degenerateFaceCount === 0 &&
    before.nonManifoldEdgeCount === 0 &&
    before.boundaryEdgeCount === 0
  ) {
    return {
      status: "not-needed",
      mode,
      mesh: cloneMesh(mesh),
      operationsAttempted: ["inspect"],
      operationsCommitted: [],
      reasonCodes: ["ALREADY_CLEAN"],
      before,
      candidate: null,
      after: before,
      fidelity: null,
      validator: null,
      durationMs: Date.now() - started,
      counts: emptyCounts,
    };
  }

  // Large open meshes: abstain from hole search (topology walk is too expensive).
  if (mesh.faces.length >= 50_000 && before.boundaryEdgeCount > 0) {
    return {
      status: "abstained",
      mode,
      mesh: cloneMesh(mesh),
      operationsAttempted: ["inspect"],
      operationsCommitted: [],
      reasonCodes: ["ABSTAINED_NO_SAFE_FILL", "BOUNDARY_TOO_LARGE"],
      before,
      candidate: null,
      after: before,
      fidelity: null,
      validator: null,
      durationMs: Date.now() - started,
      counts: emptyCounts,
    };
  }

  const operationsAttempted: string[] = [];
  const counts = { ...emptyCounts };
  let candidate = cloneMesh(mesh);

  operationsAttempted.push("weld");
  {
    const welded = weldVertices(candidate, policy);
    candidate = welded.mesh;
    counts.weldedVertices = welded.weldedCount;
  }

  operationsAttempted.push("clean_faces");
  {
    const cleaned = cleanFaces(candidate, policy);
    candidate = cleaned.mesh;
    counts.removedDegenerateFaces = cleaned.removedDegenerate;
    counts.removedDuplicateFaces =
      cleaned.removedDuplicate + cleaned.removedOppositeDuplicate;
  }

  operationsAttempted.push("compact_unreferenced");
  {
    const compacted = removeUnreferencedVertices(candidate);
    candidate = compacted.mesh;
    counts.removedUnreferencedVertices = compacted.removed;
  }

  operationsAttempted.push("fix_winding");
  {
    const winding = fixWinding(candidate);
    candidate = winding.mesh;
    counts.flippedFaces = winding.flippedForConsistency + winding.flippedForVolume;
  }

  const midTopo = analyzeTopology(candidate);
  operationsAttempted.push("boundary_loops");
  const { loops } = extractBoundaryLoops(candidate, policy, midTopo.area ?? 0);
  const fillable = loops.filter((l) => l.fillable).slice(0, policy.maxFillableLoops);
  const abstainReasons = [
    ...new Set(loops.filter((l) => !l.fillable).flatMap((l) => l.reasonCodes)),
  ];

  let filledTriangles = 0;
  if (fillable.length > 0) {
    operationsAttempted.push("hole_fill");
    const faces = candidate.faces.map((f) => [...f]);
    for (const loop of fillable) {
      const tri = earClipLoop(candidate.vertices, loop.vertices);
      if (!tri.ok) {
        abstainReasons.push("TRIANGULATION_FAILED");
        continue;
      }
      if (filledTriangles + tri.triangles.length > policy.maxTriangleGrowth) {
        abstainReasons.push("HOLE_FILL_BUDGET");
        break;
      }
      for (const t of tri.triangles) {
        faces.push([...t]);
        filledTriangles++;
      }
      counts.filledLoops++;
    }
    counts.filledTriangles = filledTriangles;
    candidate = { vertices: candidate.vertices, faces };
  }

  const candidateSnap = snapshotTopology(candidate);
  const fidelity = evaluateFidelity(
    mesh,
    candidate,
    before,
    candidateSnap,
    policy,
    filledTriangles,
  );

  const changed =
    counts.weldedVertices > 0 ||
    counts.removedDegenerateFaces > 0 ||
    counts.removedDuplicateFaces > 0 ||
    counts.removedUnreferencedVertices > 0 ||
    counts.flippedFaces > 0 ||
    counts.filledTriangles > 0;

  if (!changed) {
    return {
      status:
        fillable.length === 0 && before.boundaryEdgeCount > 0
          ? "abstained"
          : "not-needed",
      mode,
      mesh: cloneMesh(mesh),
      operationsAttempted,
      operationsCommitted: [],
      reasonCodes:
        fillable.length === 0 && before.boundaryEdgeCount > 0
          ? abstainReasons.length
            ? abstainReasons
            : ["ABSTAINED_NO_SAFE_FILL"]
          : ["ALREADY_CLEAN"],
      before,
      candidate: candidateSnap,
      after: before,
      fidelity,
      validator: { available: false, accepted: null, warnings: [] },
      durationMs: Date.now() - started,
      counts,
    };
  }

  if (!fidelity.passed) {
    return {
      status: "rejected",
      mode,
      mesh: cloneMesh(mesh),
      operationsAttempted,
      operationsCommitted: [],
      reasonCodes: fidelity.reasonCodes.filter((c) => c !== "COMMITTED").length
        ? fidelity.reasonCodes.filter((c) => c !== "COMMITTED")
        : ["FIDELITY_NOT_PROVABLE"],
      before,
      candidate: candidateSnap,
      after: before,
      fidelity,
      validator: { available: false, accepted: null, warnings: [] },
      durationMs: Date.now() - started,
      counts,
    };
  }

  return {
    status: "committed",
    mode,
    mesh: candidate,
    operationsAttempted,
    operationsCommitted: operationsAttempted.filter((op) => {
      if (op === "weld") return counts.weldedVertices > 0;
      if (op === "clean_faces")
        return counts.removedDegenerateFaces + counts.removedDuplicateFaces > 0;
      if (op === "compact_unreferenced") return counts.removedUnreferencedVertices > 0;
      if (op === "fix_winding") return counts.flippedFaces > 0;
      if (op === "hole_fill") return counts.filledTriangles > 0;
      return false;
    }),
    reasonCodes: ["COMMITTED", ...abstainReasons.filter((r) => r !== "COMMITTED")],
    before,
    candidate: candidateSnap,
    after: candidateSnap,
    fidelity,
    validator: { available: false, accepted: null, warnings: [] },
    durationMs: Date.now() - started,
    counts,
  };
}

export const safeRepairMesh = safeRepair;
