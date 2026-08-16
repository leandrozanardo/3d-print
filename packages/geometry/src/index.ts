import type { RawMesh } from "@fix-my-print/formats";

import { type Bounds } from "./bounds";
import {
  applyMatrix4,
  linearDeterminant,
  rotation90Matrix,
  toMatrix4,
  type Matrix4,
} from "./matrix";
import { analyzeTopology, type TopologyMetrics } from "./topology";

/** Re-export RawMesh for GeometryFacts consumers. */
export type { RawMesh } from "@fix-my-print/formats";
export type { Bounds } from "./bounds";
export { computeBounds } from "./bounds";
export type { TopologyMetrics } from "./topology";
export { analyzeTopology } from "./topology";
export type { Matrix4 } from "./matrix";
export {
  IDENTITY_MATRIX4,
  applyMatrix4,
  isOrthogonalLinear,
  linearDeterminant,
  multiplyMatrix4,
  rotation90Matrix,
  snapMatrix4,
  toMatrix4,
  translationMatrix,
} from "./matrix";

/** Full geometry inspection facts (P1/P2). */
export interface GeometryFacts {
  vertexCount: number;
  faceCount: number;
  bounds: Bounds;
  componentCount: number;
  degenerateFaceCount: number;
  boundaryEdgeCount: number;
  nonManifoldEdgeCount: number;
  windingConsistent: boolean | null;
  watertight: boolean;
  area: number | null;
  volume: number | null;
  validityFlags: string[];
  limitations: string[];
  issues: string[];
  unitsAssumed: "mm";
}

export type TransformPlan =
  | { type: "translate"; dx: number; dy: number; dz: number }
  | { type: "rotate90"; axis: "x" | "y" | "z"; turns: number }
  /** Row-major affine matrix with 12 (3x4) or 16 (4x4) values. */
  | { type: "matrix"; m: readonly number[] };

export type RepairPlan = {
  mergeVertices?: boolean;
  removeDegenerate?: boolean;
  fillHoles?: boolean;
};

export type RepairResult = {
  mesh: RawMesh;
  operations: string[];
  issuesBefore: string[];
  issuesAfter: string[];
};

export type OutputFormat = "stl-binary";

export interface GeometryPort {
  inspect(mesh: RawMesh): GeometryFacts;
  repair(mesh: RawMesh, plan: RepairPlan): Promise<RepairResult>;
  transform(mesh: RawMesh, plan: TransformPlan): RawMesh;
  exportModel(mesh: RawMesh, format: OutputFormat): Uint8Array;
  dispose(): void | Promise<void>;
}

export function topologyToFacts(metrics: TopologyMetrics): GeometryFacts {
  return {
    ...metrics,
    unitsAssumed: "mm",
  };
}

/** Resolve any transform plan into a single row-major 4x4 affine matrix. */
export function transformPlanToMatrix(plan: TransformPlan): number[] {
  if (plan.type === "translate") {
    return [1, 0, 0, plan.dx, 0, 1, 0, plan.dy, 0, 0, 1, plan.dz, 0, 0, 0, 1];
  }
  if (plan.type === "rotate90") {
    return rotation90Matrix(plan.axis, plan.turns);
  }
  return toMatrix4(plan.m);
}

export function transformMesh(mesh: RawMesh, plan: TransformPlan): RawMesh {
  const matrix: Matrix4 = transformPlanToMatrix(plan);
  const vertices = new Float64Array(mesh.vertices);
  for (let i = 0; i < vertices.length; i += 3) {
    const [x, y, z] = applyMatrix4(matrix, vertices[i]!, vertices[i + 1]!, vertices[i + 2]!);
    vertices[i] = x;
    vertices[i + 1] = y;
    vertices[i + 2] = z;
  }
  // A negative determinant mirrors the solid; flipping winding keeps normals outward.
  const flipWinding = linearDeterminant(matrix) < 0;
  const faces = mesh.faces.map((f) => (flipWinding ? [...f].reverse() : [...f]));
  return { vertices, faces };
}

export function exportBinaryStl(mesh: RawMesh): Uint8Array {
  const triCount = mesh.faces.length;
  const buf = new ArrayBuffer(84 + triCount * 50);
  const u8 = new Uint8Array(buf);
  const view = new DataView(buf);
  // Avoid Node Buffer in browser workers — write ASCII header via TextEncoder.
  const header = new TextEncoder().encode("fix-my-print export");
  u8.set(header.subarray(0, Math.min(80, header.length)), 0);
  view.setUint32(80, triCount, true);

  for (let t = 0; t < triCount; t++) {
    const face = mesh.faces[t]!;
    const base = 84 + t * 50;
    const idxs = [face[0]!, face[1]!, face[2]!];
    const pts: [number, number, number][] = idxs.map((vi) => {
      const o = vi * 3;
      return [mesh.vertices[o]!, mesh.vertices[o + 1]!, mesh.vertices[o + 2]!];
    });
    const [a, b, c] = pts;
    const ux = b![0] - a![0],
      uy = b![1] - a![1],
      uz = b![2] - a![2];
    const vx = c![0] - a![0],
      vy = c![1] - a![1],
      vz = c![2] - a![2];
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len;
    ny /= len;
    nz /= len;
    const floats = [nx, ny, nz, ...a!, ...b!, ...c!];
    for (let f = 0; f < 12; f++) {
      view.setFloat32(base + f * 4, floats[f]!, true);
    }
    view.setUint16(base + 48, 0, true);
  }
  return u8;
}

/** Light repair matching Python repair_mesh intent (merge / drop degenerates). */
export function repairMeshLight(mesh: RawMesh, plan: RepairPlan): RepairResult {
  const before = analyzeTopology(mesh);
  const operations: string[] = [];
  let vertices = new Float64Array(mesh.vertices);
  let faces = mesh.faces.map((f) => [...f] as number[]);

  if (plan.mergeVertices !== false) {
    const eps = 1e-7;
    const map = new Map<string, number>();
    const remap = new Int32Array(vertices.length / 3);
    const compacted: number[] = [];
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]!;
      const y = vertices[i + 1]!;
      const z = vertices[i + 2]!;
      const key = `${Math.round(x / eps)}|${Math.round(y / eps)}|${Math.round(z / eps)}`;
      const existing = map.get(key);
      const vi = i / 3;
      if (existing === undefined) {
        const ni = compacted.length / 3;
        map.set(key, ni);
        remap[vi] = ni;
        compacted.push(x, y, z);
      } else {
        remap[vi] = existing;
      }
    }
    vertices = Float64Array.from(compacted);
    faces = faces.map((f) => f.map((i) => remap[i]!));
    operations.push("merge_vertices");
  }

  if (plan.removeDegenerate !== false) {
    const kept: number[][] = [];
    for (const f of faces) {
      const a = f[0]!,
        b = f[1]!,
        c = f[2]!;
      if (a === b || b === c || a === c) continue;
      const ax = vertices[a * 3]!,
        ay = vertices[a * 3 + 1]!,
        az = vertices[a * 3 + 2]!;
      const bx = vertices[b * 3]!,
        by = vertices[b * 3 + 1]!,
        bz = vertices[b * 3 + 2]!;
      const cx = vertices[c * 3]!,
        cy = vertices[c * 3 + 1]!,
        cz = vertices[c * 3 + 2]!;
      const ux = bx - ax,
        uy = by - ay,
        uz = bz - az;
      const vx = cx - ax,
        vy = cy - ay,
        vz = cz - az;
      const nx = uy * vz - uz * vy;
      const ny = uz * vx - ux * vz;
      const nz = ux * vy - uy * vx;
      if (Math.hypot(nx, ny, nz) < 1e-18) continue;
      kept.push([a, b, c]);
    }
    faces = kept;
    operations.push("remove_degenerate");
  }

  if (plan.fillHoles) {
    // Explicit limitation: hole filling requires manifold WASM path.
    operations.push("fill_holes_skipped");
  }

  const resultMesh: RawMesh = { vertices, faces };
  const after = analyzeTopology(resultMesh);
  return {
    mesh: resultMesh,
    operations,
    issuesBefore: before.issues,
    issuesAfter: after.issues,
  };
}

/**
 * Weld coincident vertices before topology facts (parity with trimesh load process=True).
 */
export function prepareMeshForInspect(mesh: RawMesh): RawMesh {
  return repairMeshLight(mesh, {
    mergeVertices: true,
    removeDegenerate: false,
    fillHoles: false,
  }).mesh;
}

/**
 * Pure TypeScript GeometryPort. Prefer ManifoldGeometryAdapter in Node production paths.
 */
export class PureTsGeometryAdapter implements GeometryPort {
  inspect(mesh: RawMesh): GeometryFacts {
    // Weld first so binary STL cubes report shared topology (Python trimesh parity).
    return topologyToFacts(analyzeTopology(prepareMeshForInspect(mesh)));
  }

  async repair(mesh: RawMesh, plan: RepairPlan): Promise<RepairResult> {
    return repairMeshLight(mesh, plan);
  }

  transform(mesh: RawMesh, plan: TransformPlan): RawMesh {
    return transformMesh(mesh, plan);
  }

  exportModel(mesh: RawMesh, format: OutputFormat): Uint8Array {
    if (format !== "stl-binary") {
      throw new Error("FORMAT_UNSUPPORTED");
    }
    return exportBinaryStl(mesh);
  }

  dispose(): void {
    // no-op
  }
}
