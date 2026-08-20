import type { CanonicalMesh } from "@fix-my-print/formats-3mf";

import { assemblyFitsBed, packMeshesOnBed } from "../src/packOnBed";

function boxPart(
  id: string,
  origin: [number, number, number],
  size: [number, number, number],
): CanonicalMesh {
  const [ox, oy, oz] = origin;
  const [sx, sy, sz] = size;
  const corners: Array<[number, number, number]> = [
    [ox, oy, oz],
    [ox + sx, oy, oz],
    [ox + sx, oy + sy, oz],
    [ox, oy + sy, oz],
    [ox, oy, oz + sz],
    [ox + sx, oy, oz + sz],
    [ox + sx, oy + sy, oz + sz],
    [ox, oy + sy, oz + sz],
  ];
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
  const positions = new Float64Array(facesIdx.length * 9);
  const indices = new Uint32Array(facesIdx.length * 3);
  let pi = 0;
  let ii = 0;
  let vi = 0;
  for (const tri of facesIdx) {
    for (const idx of tri) {
      const p = corners[idx]!;
      positions[pi++] = p[0];
      positions[pi++] = p[1];
      positions[pi++] = p[2];
      indices[ii++] = vi++;
    }
  }
  return { id, name: id, positions, indices };
}

describe("packMeshesOnBed", () => {
  const volume = { x: 180, y: 180, z: 180 };

  it("packs CAD-scattered parts onto the printer bed", () => {
    const parts = [
      boxPart("a", [92, 0, 0], [31, 31, 14]),
      boxPart("b", [400, -180, 0], [71.5, 10.2, 8]),
      boxPart("c", [700, 100, 0], [41, 40, 68]),
    ];
    expect(assemblyFitsBed(parts, volume)).toBe(false);
    const packed = packMeshesOnBed(parts, volume);
    expect(assemblyFitsBed(packed, volume)).toBe(true);
    expect(packed.length).toBe(3);
  });
});
