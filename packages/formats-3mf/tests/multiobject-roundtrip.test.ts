/**
 * FMT-005 — multi-object write/read/resolve round-trip.
 */
import { analyzeTopology } from "@fix-my-print/geometry";

import { parseThreeMf } from "../src/parse";
import { resolveThreeMfInstances } from "../src/instances";
import { writeThreeMf } from "../src/write";
import type { CanonicalScene } from "../src/types";
import { validateThreeMf } from "../src/validate";

function cubeMesh(
  id: string,
  name: string,
  ox: number,
): { id: string; name: string; positions: Float64Array; indices: Uint32Array } {
  const positions = Float64Array.from([
    ox + 0,
    0,
    0,
    ox + 1,
    0,
    0,
    ox + 1,
    1,
    0,
    ox + 0,
    1,
    0,
    ox + 0,
    0,
    1,
    ox + 1,
    0,
    1,
    ox + 1,
    1,
    1,
    ox + 0,
    1,
    1,
  ]);
  const indices = Uint32Array.from([
    0, 1, 2, 0, 2, 3, 4, 6, 5, 4, 7, 6, 0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7,
    3, 3, 7, 4, 3, 4, 0,
  ]);
  return { id, name, positions, indices };
}

describe("FMT-005 multi-object write/reopen", () => {
  it("serializes two meshes and resolves two watertight instances", () => {
    const meshes = [cubeMesh("a", "Alpha", 0), cubeMesh("b", "Beta", 2)];
    const scene: CanonicalScene = {
      unit: "millimeter",
      meshes,
      bounds: {
        min: [0, 0, 0],
        max: [3, 1, 1],
      },
      sourceFormat: "3mf",
      sourceMetadata: {
        fileName: "two.3mf",
        originalUnit: "millimeter",
        memberCount: 3,
        objectCount: 2,
        buildItemCount: 2,
        modelPath: "3D/3dmodel.model",
      },
      warnings: [],
    };

    const { bytes } = writeThreeMf(scene);
    const validation = validateThreeMf(bytes);
    expect(validation.ok).toBe(true);

    const document = parseThreeMf(bytes, { fileName: "two.3mf" });
    expect(document.buildItems.length).toBe(2);
    expect(document.objects.size).toBe(2);

    const resolved = resolveThreeMfInstances(document);
    expect(resolved.instances.length).toBe(2);
    expect(resolved.instances.map((i) => i.name).sort()).toEqual(["Alpha", "Beta"]);

    for (const inst of resolved.instances) {
      const faces: number[][] = [];
      for (let i = 0; i < inst.indices.length; i += 3) {
        faces.push([inst.indices[i]!, inst.indices[i + 1]!, inst.indices[i + 2]!]);
      }
      const topo = analyzeTopology({ vertices: inst.positions, faces });
      expect(topo.watertight).toBe(true);
    }
  });
});
