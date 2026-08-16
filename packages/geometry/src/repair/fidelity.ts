import type { RawMesh } from "@fix-my-print/formats";

import { computeBounds } from "../bounds";
import { analyzeTopology } from "../topology";
import type { RepairPolicy } from "./repairPolicy";
import type { FidelityMetrics, FidelityReport, TopologySnapshot } from "./repairTypes";

export function snapshotTopology(mesh: RawMesh): TopologySnapshot {
  const topo = analyzeTopology(mesh);
  return {
    vertexCount: topo.vertexCount,
    faceCount: topo.faceCount,
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
  };
}

function samplePoints(mesh: RawMesh, maxSamples: number): Float64Array {
  const verts = mesh.vertices;
  const faceSamples: number[] = [];
  const stride = Math.max(1, Math.ceil(mesh.faces.length / Math.max(1, maxSamples / 2)));
  for (let fi = 0; fi < mesh.faces.length; fi += stride) {
    const f = mesh.faces[fi]!;
    if (f.length < 3) continue;
    const a = f[0]! * 3;
    const b = f[1]! * 3;
    const c = f[2]! * 3;
    faceSamples.push(
      (verts[a]! + verts[b]! + verts[c]!) / 3,
      (verts[a + 1]! + verts[b + 1]! + verts[c + 1]!) / 3,
      (verts[a + 2]! + verts[b + 2]! + verts[c + 2]!) / 3,
    );
  }
  const vStride = Math.max(1, Math.ceil(verts.length / 3 / Math.max(1, maxSamples / 2)));
  for (let i = 0; i < verts.length; i += 3 * vStride) {
    faceSamples.push(verts[i]!, verts[i + 1]!, verts[i + 2]!);
  }
  return Float64Array.from(faceSamples);
}

function distPointTriangle(
  px: number,
  py: number,
  pz: number,
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
  cx: number,
  cy: number,
  cz: number,
): number {
  // Closest-point on triangle (Ericson).
  const abx = bx - ax,
    aby = by - ay,
    abz = bz - az;
  const acx = cx - ax,
    acy = cy - ay,
    acz = cz - az;
  const apx = px - ax,
    apy = py - ay,
    apz = pz - az;
  const d1 = abx * apx + aby * apy + abz * apz;
  const d2 = acx * apx + acy * apy + acz * apz;
  if (d1 <= 0 && d2 <= 0) return Math.hypot(apx, apy, apz);
  const bpx = px - bx,
    bpy = py - by,
    bpz = pz - bz;
  const d3 = abx * bpx + aby * bpy + abz * bpz;
  const d4 = acx * bpx + acy * bpy + acz * bpz;
  if (d3 >= 0 && d4 <= d3) return Math.hypot(bpx, bpy, bpz);
  const vc = d1 * d4 - d3 * d2;
  if (vc <= 0 && d1 >= 0 && d3 <= 0) {
    const v = d1 / (d1 - d3);
    return Math.hypot(apx - abx * v, apy - aby * v, apz - abz * v);
  }
  const cpx = px - cx,
    cpy = py - cy,
    cpz = pz - cz;
  const d5 = abx * cpx + aby * cpy + abz * cpz;
  const d6 = acx * cpx + acy * cpy + acz * cpz;
  if (d6 >= 0 && d5 <= d6) return Math.hypot(cpx, cpy, cpz);
  const vb = d5 * d2 - d1 * d6;
  if (vb <= 0 && d2 >= 0 && d6 <= 0) {
    const w = d2 / (d2 - d6);
    return Math.hypot(apx - acx * w, apy - acy * w, apz - acz * w);
  }
  const va = d3 * d6 - d5 * d4;
  if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
    const w = (d4 - d3) / (d4 - d3 + (d5 - d6));
    return Math.hypot(bpx + (cx - bx) * w, bpy + (cy - by) * w, bpz + (cz - bz) * w);
  }
  const denom = 1 / (va + vb + vc);
  const v = vb * denom;
  const w = vc * denom;
  // Closest point is A + AB*v + AC*w; distance is |P - closest|.
  return Math.hypot(
    apx - abx * v - acx * w,
    apy - aby * v - acy * w,
    apz - abz * v - acz * w,
  );
}

function directedDistances(from: RawMesh, to: RawMesh, samples: Float64Array): number[] {
  const dists: number[] = [];
  for (let i = 0; i + 2 < samples.length; i += 3) {
    const px = samples[i]!;
    const py = samples[i + 1]!;
    const pz = samples[i + 2]!;
    let best = Infinity;
    for (const f of to.faces) {
      if (f.length < 3) continue;
      const a = f[0]! * 3;
      const b = f[1]! * 3;
      const c = f[2]! * 3;
      const d = distPointTriangle(
        px,
        py,
        pz,
        to.vertices[a]!,
        to.vertices[a + 1]!,
        to.vertices[a + 2]!,
        to.vertices[b]!,
        to.vertices[b + 1]!,
        to.vertices[b + 2]!,
        to.vertices[c]!,
        to.vertices[c + 1]!,
        to.vertices[c + 2]!,
      );
      if (d < best) best = d;
    }
    if (Number.isFinite(best)) dists.push(best);
  }
  void from;
  return dists;
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.min(
    sorted.length - 1,
    Math.max(0, Math.floor(p * (sorted.length - 1))),
  );
  return sorted[idx]!;
}

/** Evaluate geometric fidelity gates (RPR-015 / RPR-016). */
export function evaluateFidelity(
  original: RawMesh,
  candidate: RawMesh,
  before: TopologySnapshot,
  after: TopologySnapshot,
  policy: RepairPolicy,
  filledTriangleCount: number,
): FidelityReport {
  const reasonCodes: string[] = [];
  const ob = computeBounds(original);
  const cb = computeBounds(candidate);
  const boundsDeltaMm: [number, number, number] = [
    Math.max(Math.abs(cb.min[0] - ob.min[0]), Math.abs(cb.max[0] - ob.max[0])),
    Math.max(Math.abs(cb.min[1] - ob.min[1]), Math.abs(cb.max[1] - ob.max[1])),
    Math.max(Math.abs(cb.min[2] - ob.min[2]), Math.abs(cb.max[2] - ob.max[2])),
  ];
  for (const d of boundsDeltaMm) {
    if (d > policy.maxBoundsDeltaMm) reasonCodes.push("FIDELITY_BOUNDS");
  }

  const triangleDelta = after.faceCount - before.faceCount;
  if (triangleDelta > policy.maxTriangleGrowth + filledTriangleCount) {
    reasonCodes.push("FIDELITY_TRIANGLES");
  }
  if (after.nonManifoldEdgeCount > before.nonManifoldEdgeCount) {
    reasonCodes.push("FIDELITY_NON_MANIFOLD");
  }
  if (after.degenerateFaceCount > before.degenerateFaceCount) {
    reasonCodes.push("FIDELITY_DEGENERATE");
  }
  if (
    after.boundaryEdgeCount > before.boundaryEdgeCount &&
    before.boundaryEdgeCount > 0
  ) {
    reasonCodes.push("FIDELITY_BOUNDARY");
  }
  if (Math.abs(after.componentCount - before.componentCount) > 0) {
    reasonCodes.push("FIDELITY_COMPONENTS");
  }

  let volumeRelativeDelta: number | null = null;
  let areaRelativeDelta: number | null = null;
  if (before.watertight && after.watertight && before.volume && after.volume) {
    volumeRelativeDelta =
      Math.abs(after.volume - before.volume) / Math.max(1e-18, Math.abs(before.volume));
    if (volumeRelativeDelta > policy.maxVolumeRelativeDelta) {
      reasonCodes.push("FIDELITY_VOLUME");
    }
  }
  if (before.watertight && after.watertight && before.area && after.area) {
    areaRelativeDelta = Math.abs(after.area - before.area) / Math.max(1e-18, before.area);
    // Allow extra area for filled triangles.
    const fillAllowance = filledTriangleCount > 0 ? policy.maxAreaRelativeDelta * 2 : 0;
    if (areaRelativeDelta > policy.maxAreaRelativeDelta + fillAllowance) {
      reasonCodes.push("FIDELITY_AREA");
    }
  }

  const samplesA = samplePoints(original, 256);
  const samplesB = samplePoints(candidate, 256);
  const d1 = directedDistances(original, candidate, samplesA);
  const d2 = directedDistances(candidate, original, samplesB);
  const all = [...d1, ...d2].filter((x) => Number.isFinite(x)).sort((a, b) => a - b);
  const maxDistanceMm = all.length ? all[all.length - 1]! : 0;
  const p95DistanceMm = percentile(all, 0.95);
  const meanDistanceMm = all.length ? all.reduce((s, x) => s + x, 0) / all.length : 0;
  // Localized hole-fill faces may sit away from the open original; widen budget when fill exists.
  const maxDistLimit =
    filledTriangleCount > 0
      ? Math.max(policy.maxSampleDistanceMm, 0.5)
      : policy.maxSampleDistanceMm;
  const p95Limit =
    filledTriangleCount > 0
      ? Math.max(policy.maxSampleP95Mm, 0.2)
      : policy.maxSampleP95Mm;
  if (maxDistanceMm > maxDistLimit || p95DistanceMm > p95Limit) {
    reasonCodes.push("FIDELITY_DISTANCE");
  }

  const metrics: FidelityMetrics = {
    maxDistanceMm,
    p95DistanceMm,
    meanDistanceMm,
    boundsDeltaMm,
    triangleDelta,
    volumeRelativeDelta,
    areaRelativeDelta,
    newNonManifold: after.nonManifoldEdgeCount > before.nonManifoldEdgeCount,
    boundaryReducedOrClosed: after.boundaryEdgeCount <= before.boundaryEdgeCount,
  };

  const uniqueReasons = [...new Set(reasonCodes)];
  return {
    passed: uniqueReasons.length === 0,
    metrics,
    reasonCodes: uniqueReasons.length ? uniqueReasons : ["COMMITTED"],
  };
}
