import type { RawMesh } from "@fix-my-print/formats";

import { computeBounds, type Bounds } from "../bounds";
import { analyzeTopology } from "../topology";
import { createRepairPolicy } from "./repairPolicy";
import { weldVertices } from "./weld";

export interface PartGeometryAnalysis {
  id: string;
  name?: string;
  sourceObjectId?: string;
  vertexCount: number;
  triangleCount: number;
  componentCount: number;
  boundaryEdgeCount: number;
  nonManifoldEdgeCount: number;
  degenerateFaceCount: number;
  windingConsistent: boolean | null;
  watertight: boolean;
  area: number | null;
  volume: number | null;
  bounds: Bounds;
  issues: string[];
  limitations: string[];
}

export interface AssemblyGeometryAnalysis {
  partCount: number;
  totalVertexCount: number;
  totalTriangleCount: number;
  globalBounds: Bounds;
  dimensions: [number, number, number];
  allPartsWatertight: boolean;
  watertightPartCount: number;
  openPartCount: number;
  nonManifoldPartCount: number;
  parts: PartGeometryAnalysis[];
  issues: Array<{ partId: string; issue: string }>;
}

export interface PartMeshInput {
  id: string;
  mesh: RawMesh;
  name?: string;
  sourceObjectId?: string;
  /** When true (default), weld coincident vertices within this part only. */
  weldWithinPart?: boolean;
}

/** Alias used by FMT/assembly callers. */
export type AssemblyPartInput = PartMeshInput;

function emptyBounds(): Bounds {
  return { min: [0, 0, 0], max: [0, 0, 0] };
}

function mergeBounds(a: Bounds, b: Bounds): Bounds {
  return {
    min: [
      Math.min(a.min[0], b.min[0]),
      Math.min(a.min[1], b.min[1]),
      Math.min(a.min[2], b.min[2]),
    ],
    max: [
      Math.max(a.max[0], b.max[0]),
      Math.max(a.max[1], b.max[1]),
      Math.max(a.max[2], b.max[2]),
    ],
  };
}

/**
 * Analyze a single part mesh. Welding stays inside the part (FMT-002 / RPR-003).
 */
export function analyzePartGeometry(input: PartMeshInput): PartGeometryAnalysis {
  const weld = input.weldWithinPart !== false;
  let mesh = input.mesh;
  if (weld) {
    const policy = createRepairPolicy(mesh);
    mesh = weldVertices(mesh, policy).mesh;
  }
  const topo = analyzeTopology(mesh);
  const part: PartGeometryAnalysis = {
    id: input.id,
    vertexCount: topo.vertexCount,
    triangleCount: topo.faceCount,
    componentCount: topo.componentCount,
    boundaryEdgeCount: topo.boundaryEdgeCount,
    nonManifoldEdgeCount: topo.nonManifoldEdgeCount,
    degenerateFaceCount: topo.degenerateFaceCount,
    windingConsistent: topo.windingConsistent,
    watertight: topo.watertight,
    area: topo.area,
    volume: topo.volume,
    bounds: topo.bounds,
    issues: [...topo.issues],
    limitations: [...topo.limitations],
  };
  if (input.name !== undefined) part.name = input.name;
  if (input.sourceObjectId !== undefined) part.sourceObjectId = input.sourceObjectId;
  return part;
}

/**
 * Aggregate per-instance analyses without cross-part welding (FMT-002).
 */
export function analyzeAssemblyGeometry(
  parts: PartMeshInput[],
): AssemblyGeometryAnalysis {
  const analyzed = parts.map((p) => analyzePartGeometry(p));
  let globalBounds = emptyBounds();
  let totalVertexCount = 0;
  let totalTriangleCount = 0;
  let watertightPartCount = 0;
  let openPartCount = 0;
  let nonManifoldPartCount = 0;
  const issues: Array<{ partId: string; issue: string }> = [];

  if (analyzed.length > 0) {
    globalBounds = analyzed[0]!.bounds;
  }

  for (const part of analyzed) {
    totalVertexCount += part.vertexCount;
    totalTriangleCount += part.triangleCount;
    globalBounds = mergeBounds(globalBounds, part.bounds);
    if (part.watertight) watertightPartCount++;
    else openPartCount++;
    if (part.nonManifoldEdgeCount > 0) nonManifoldPartCount++;
    for (const issue of part.issues) {
      issues.push({ partId: part.id, issue });
    }
  }

  const dimensions: [number, number, number] = [
    globalBounds.max[0] - globalBounds.min[0],
    globalBounds.max[1] - globalBounds.min[1],
    globalBounds.max[2] - globalBounds.min[2],
  ];

  return {
    partCount: analyzed.length,
    totalVertexCount,
    totalTriangleCount,
    globalBounds,
    dimensions,
    allPartsWatertight: analyzed.length > 0 && openPartCount === 0,
    watertightPartCount,
    openPartCount,
    nonManifoldPartCount,
    parts: analyzed,
    issues,
  };
}

/** Convenience: global bounds of an arbitrary mesh list without welding across them. */
export function computeAssemblyBounds(meshes: RawMesh[]): Bounds {
  if (meshes.length === 0) return emptyBounds();
  let b = computeBounds(meshes[0]!);
  for (let i = 1; i < meshes.length; i++) {
    b = mergeBounds(b, computeBounds(meshes[i]!));
  }
  return b;
}
