import type { RawMesh } from "@fix-my-print/formats";
import { applyMatrix4 } from "@fix-my-print/geometry";

import {
  ORIENTATION_COUNT,
  ORIENTATION_SPECS,
  ORIENTATION_V2_VERSION,
  GOAL_WEIGHTS,
  V1_V2_COST_TOLERANCE,
  angularDistance,
  canonicalizeQuat,
  evaluateOrientationsV2,
  identityQuat,
  matrixLinearDeterminant,
  matrixToQuat,
  orientationCandidateId,
  quatFromTo,
  quatToMatrix,
  normalizeQuat,
} from "../src/index";

function boxMesh(sx: number, sy: number, sz: number): RawMesh {
  const hx = sx / 2;
  const hy = sy / 2;
  const hz = sz / 2;
  const corners: Array<[number, number, number]> = [
    [-hx, -hy, -hz],
    [hx, -hy, -hz],
    [hx, hy, -hz],
    [-hx, hy, -hz],
    [-hx, -hy, hz],
    [hx, -hy, hz],
    [hx, hy, hz],
    [-hx, hy, hz],
  ];
  // Outward-facing winding (bottom −Z, top +Z, then sides).
  const facesIdx = [
    [0, 2, 1],
    [0, 3, 2],
    [4, 5, 6],
    [4, 6, 7],
    [0, 1, 5],
    [0, 5, 4],
    [1, 2, 6],
    [1, 6, 5],
    [2, 3, 7],
    [2, 7, 6],
    [3, 0, 4],
    [3, 4, 7],
  ];
  const verts: number[] = [];
  const faces: number[][] = [];
  let vi = 0;
  for (const tri of facesIdx) {
    for (const idx of tri) {
      const p = corners[idx]!;
      verts.push(p[0], p[1], p[2]);
    }
    faces.push([vi, vi + 1, vi + 2]);
    vi += 3;
  }
  return { vertices: Float64Array.from(verts), faces };
}

function transformMesh(mesh: RawMesh, matrix: readonly number[]): RawMesh {
  const out = new Float64Array(mesh.vertices.length);
  for (let i = 0; i + 2 < mesh.vertices.length; i += 3) {
    const [x, y, z] = applyMatrix4(
      matrix,
      mesh.vertices[i]!,
      mesh.vertices[i + 1]!,
      mesh.vertices[i + 2]!,
    );
    out[i] = x;
    out[i + 1] = y;
    out[i + 2] = z;
  }
  return { vertices: out, faces: mesh.faces.map((f) => [...f]) };
}

/** Flat rectangular plate with a large bed face (already optimal at identity). */
function flatPlate(): RawMesh {
  return boxMesh(40, 30, 4);
}

/**
 * Box whose large face is tilted ~30° about X — V1 cannot seat the base;
 * V2 should recover a near-flat bed orientation.
 */
function tiltedPlate(): RawMesh {
  const base = boxMesh(40, 30, 4);
  const tilt = quatToMatrix(
    quatFromTo([0, 0, -1], [0, -Math.sin(Math.PI / 6), -Math.cos(Math.PI / 6)]),
  );
  return transformMesh(base, tilt);
}

/**
 * Trade-off fixture: tall tower with a wide foot so height vs contact compete.
 */
function tradeoffMesh(): RawMesh {
  const tower = boxMesh(8, 8, 60);
  const foot = transformMesh(
    boxMesh(50, 20, 3),
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -28.5, 0, 0, 0, 1],
  );
  const verts = new Float64Array(tower.vertices.length + foot.vertices.length);
  verts.set(tower.vertices, 0);
  verts.set(foot.vertices, tower.vertices.length);
  const vOffset = tower.vertices.length / 3;
  const faces = [
    ...tower.faces.map((f) => [...f]),
    ...foot.faces.map((f) => f.map((i) => i + vOffset)),
  ];
  return { vertices: verts, faces };
}

const VOLUME = { x: 250, y: 250, z: 250 };

describe("orientation V2 quaternions", () => {
  it("round-trips matrix↔quat with det ≈ +1", () => {
    const q = canonicalizeQuat(quatFromTo([0, 0, 1], [1, 0, 0]));
    const m = quatToMatrix(q);
    expect(matrixLinearDeterminant(m)).toBeCloseTo(1, 6);
    const q2 = matrixToQuat(m);
    expect(angularDistance(q, q2)).toBeLessThan(1e-6);
    const id = orientationCandidateId(q);
    expect(id.startsWith("v2-q_")).toBe(true);
    expect(normalizeQuat(q).w).toBeGreaterThanOrEqual(0);
  });

  it("rejects reflections implicitly via det policy on proper rotations", () => {
    const m = quatToMatrix(identityQuat());
    expect(matrixLinearDeterminant(m)).toBeCloseTo(1, 9);
  });
});

describe("orientation V2 engine", () => {
  it("exports orientation-v2.0.0 and OPT-018 weights sum to 1", () => {
    expect(ORIENTATION_V2_VERSION).toBe("orientation-v2.0.0");
    for (const goal of Object.keys(GOAL_WEIGHTS) as Array<keyof typeof GOAL_WEIGHTS>) {
      const w = GOAL_WEIGHTS[goal];
      const sum =
        w.supportSeverityCost +
        w.supportHeightCost +
        w.instabilityCost +
        w.heightCost +
        w.contactDeficitCost +
        w.cosmeticDownwardCost;
      expect(sum).toBeCloseTo(1, 12);
    }
  });

  it("includes all 24 V1 orientations", async () => {
    expect(ORIENTATION_COUNT).toBe(24);
    const result = await evaluateOrientationsV2(flatPlate(), VOLUME, {
      goal: "balanced",
    });
    const ids = new Set(result.candidates.map((c) => c.id));
    for (const spec of ORIENTATION_SPECS) {
      expect(ids.has(spec.id)).toBe(true);
    }
    expect(result.legacyCandidateCount).toBeGreaterThanOrEqual(24);
    expect(result.candidateCount).toBeGreaterThan(24);
  });

  it("improves tilted non-orthogonal fixture by ≥10% vs best V1", async () => {
    const mesh = tiltedPlate();
    const result = await evaluateOrientationsV2(mesh, VOLUME, { goal: "balanced" });
    expect(result.candidateCount).toBeGreaterThan(24);
    expect(result.v2BestCost).toBeLessThanOrEqual(
      result.v1BestCost + V1_V2_COST_TOLERANCE,
    );
    const rel =
      (result.v1BestCost - result.v2BestCost) / Math.max(result.v1BestCost, 1e-12);
    expect(rel).toBeGreaterThanOrEqual(0.1);
    const legacyIds = new Set(ORIENTATION_SPECS.map((s) => s.id));
    expect(legacyIds.has(result.bestV2.id)).toBe(false);
    expect(result.meaningfulImprovement).toBe(true);
    expect(result.alreadyOptimal).toBe(false);
  });

  it("keeps identity for already-optimal plate", async () => {
    const result = await evaluateOrientationsV2(flatPlate(), VOLUME, {
      goal: "balanced",
    });
    expect(result.alreadyOptimal).toBe(true);
    expect(result.selected.id).toBe("up+z-yaw0");
    expect(result.decisionKind).toBe("already-best-or-sanitized");
    expect(result.meaningfulImprovement).toBe(false);
  });

  it("changes selection or costs across goals on tradeoff fixture", async () => {
    const mesh = tradeoffMesh();
    const balanced = await evaluateOrientationsV2(mesh, VOLUME, { goal: "balanced" });
    const height = await evaluateOrientationsV2(mesh, VOLUME, {
      goal: "minimize-height",
    });
    const contact = await evaluateOrientationsV2(mesh, VOLUME, {
      goal: "maximize-bed-contact",
    });

    expect(GOAL_WEIGHTS.balanced.heightCost).not.toBe(
      GOAL_WEIGHTS["minimize-height"].heightCost,
    );
    expect(GOAL_WEIGHTS.balanced.contactDeficitCost).not.toBe(
      GOAL_WEIGHTS["maximize-bed-contact"].contactDeficitCost,
    );

    const costChanged =
      Math.abs(balanced.v2BestCost - height.v2BestCost) > 1e-6 ||
      Math.abs(balanced.v2BestCost - contact.v2BestCost) > 1e-6 ||
      Math.abs(height.v2BestCost - contact.v2BestCost) > 1e-6;
    const idChanged =
      balanced.bestV2.id !== height.bestV2.id ||
      balanced.bestV2.id !== contact.bestV2.id ||
      height.bestV2.id !== contact.bestV2.id;
    expect(costChanged || idChanged).toBe(true);
  });

  it("satisfies differential invariant v2Cost <= v1Cost + eps", async () => {
    const result = await evaluateOrientationsV2(tiltedPlate(), VOLUME);
    expect(result.v2BestCost).toBeLessThanOrEqual(
      result.v1BestCost + V1_V2_COST_TOLERANCE,
    );
  });

  it("is deterministic across two runs", async () => {
    const mesh = tiltedPlate();
    const a = await evaluateOrientationsV2(mesh, VOLUME, { goal: "balanced" });
    const b = await evaluateOrientationsV2(mesh, VOLUME, { goal: "balanced" });
    expect(a.selected.id).toBe(b.selected.id);
    expect(a.bestV2.id).toBe(b.bestV2.id);
    expect(a.v2BestCost).toBe(b.v2BestCost);
    expect(a.v1BestCost).toBe(b.v1BestCost);
  });

  it("respects AbortSignal mid-evaluation", async () => {
    const controller = new AbortController();
    let sawQuick = false;
    const promise = evaluateOrientationsV2(tiltedPlate(), VOLUME, {
      signal: controller.signal,
      yieldBatchSize: 1,
      onProgress: (p) => {
        if (p.stage === "quick" && p.completed >= 1) {
          sawQuick = true;
          controller.abort();
        }
      },
    });
    const result = await promise;
    expect(sawQuick).toBe(true);
    expect(result.cancelled).toBe(true);
  });

  it("never selects a rotation that exceeds volume when identity already fits", async () => {
    const mesh = boxMesh(170, 170, 4);
    const volume = { x: 180, y: 180, z: 180 };
    const result = await evaluateOrientationsV2(mesh, volume, { goal: "balanced" });
    const applied = transformMesh(mesh, result.selected.matrix);
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    const v = applied.vertices;
    for (let i = 0; i + 2 < v.length; i += 3) {
      minX = Math.min(minX, v[i]!);
      minY = Math.min(minY, v[i + 1]!);
      minZ = Math.min(minZ, v[i + 2]!);
      maxX = Math.max(maxX, v[i]!);
      maxY = Math.max(maxY, v[i + 1]!);
      maxZ = Math.max(maxZ, v[i + 2]!);
    }
    expect(maxX - minX).toBeLessThanOrEqual(180 + 1e-6);
    expect(maxY - minY).toBeLessThanOrEqual(180 + 1e-6);
    expect(maxZ - minZ).toBeLessThanOrEqual(180 + 1e-6);
    expect(result.selected.metrics.fitsBuildVolume).toBe(true);
  });
});
