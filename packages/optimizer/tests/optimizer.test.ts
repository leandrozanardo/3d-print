import { createCandidate } from "@fix-my-print/domain";
import type { RawMesh } from "@fix-my-print/formats";

import {
  frontierHash,
  generateOrientationCandidates,
  paretoFrontierFromCandidates,
} from "../src/index";

/** Elongated box 10 x 1 x 1 (12 tris, duplicated verts). */
function elongatedBox(): RawMesh {
  const facesCoords: [number, number, number][][] = [
    [[0, 0, 0], [10, 0, 0], [10, 1, 0]],
    [[0, 0, 0], [10, 1, 0], [0, 1, 0]],
    [[0, 0, 1], [10, 1, 1], [10, 0, 1]],
    [[0, 0, 1], [0, 1, 1], [10, 1, 1]],
    [[0, 0, 0], [10, 0, 1], [10, 0, 0]],
    [[0, 0, 0], [0, 0, 1], [10, 0, 1]],
    [[0, 1, 0], [10, 1, 0], [10, 1, 1]],
    [[0, 1, 0], [10, 1, 1], [0, 1, 1]],
    [[0, 0, 0], [0, 1, 0], [0, 1, 1]],
    [[0, 0, 0], [0, 1, 1], [0, 0, 1]],
    [[10, 0, 0], [10, 0, 1], [10, 1, 1]],
    [[10, 0, 0], [10, 1, 1], [10, 1, 0]],
  ];
  const verts: number[] = [];
  const faces: number[][] = [];
  let vi = 0;
  for (const tri of facesCoords) {
    for (const p of tri) {
      verts.push(p[0], p[1], p[2]);
    }
    faces.push([vi, vi + 1, vi + 2]);
    vi += 3;
  }
  return { vertices: Float64Array.from(verts), faces };
}

describe("@fix-my-print/optimizer", () => {
  it("is deterministic: same frontier hash twice", () => {
    const mesh = elongatedBox();
    const volume = { x: 100, y: 100, z: 100 };
    const a = paretoFrontierFromCandidates(
      generateOrientationCandidates(mesh, volume),
    );
    const b = paretoFrontierFromCandidates(
      generateOrientationCandidates(mesh, volume),
    );
    expect(frontierHash(a)).toBe(frontierHash(b));
    expect(a.frontier.length).toBeGreaterThan(0);
  });

  it("excludes dominated candidates from frontier", () => {
    const weak = createCandidate("weak", "weak", {
      printability: 0.1,
      strength: 0.1,
      quality: 0.1,
      timeProxy: 0.1,
      materialProxy: 0.1,
      risk: 0.1,
    });
    const strong = createCandidate("strong", "strong", {
      printability: 1,
      strength: 1,
      quality: 1,
      timeProxy: 1,
      materialProxy: 1,
      risk: 1,
    });
    const set = paretoFrontierFromCandidates([weak, strong]);
    expect(set.frontier.map((c) => c.id)).toEqual(["strong"]);
    expect(set.dominatedIds).toContain("weak");
  });

  it("rejects orientations that do not fit build volume", () => {
    const mesh = elongatedBox();
    const candidates = generateOrientationCandidates(mesh, {
      x: 2,
      y: 2,
      z: 2,
    });
    const failing = candidates.filter((c) => !c.hardConstraintOk);
    expect(failing.length).toBeGreaterThan(0);
    const set = paretoFrontierFromCandidates(candidates);
    expect(set.frontier.every((c) => c.hardConstraintOk)).toBe(true);
  });
});
