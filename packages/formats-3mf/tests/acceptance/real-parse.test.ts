import * as fs from "node:fs";
import * as path from "node:path";

import {
  flattenThreeMf,
  parseThreeMf,
  validateThreeMf,
  writeThreeMf,
} from "../../src/index";

const ROOT = path.resolve(__dirname, "../../../..");
const PRIVATE = path.join(ROOT, "3ds/original/one+Piece.3mf");

describe("acceptance: real 3MF parse", () => {
  const available = fs.existsSync(PRIVATE);

  (available ? it : it.skip)("parses one+Piece into real geometry arrays", () => {
    const bytes = new Uint8Array(fs.readFileSync(PRIVATE));
    const document = parseThreeMf(bytes, { fileName: "one+Piece.3mf" });
    const scene = flattenThreeMf(document, { fileName: "one+Piece.3mf" });
    const mesh = scene.meshes[0]!;
    expect(document.unit).toBe("millimeter");
    expect(mesh.positions.length / 3).toBe(189611);
    expect(mesh.indices.length / 3).toBe(379222);
    expect(scene.bounds.max[0] - scene.bounds.min[0]).toBeGreaterThan(1);
    expect(scene.bounds.max[2] - scene.bounds.min[2]).toBeGreaterThan(1);
  });
});

describe("acceptance: core roundtrip", () => {
  it("writes and reopens a tiny synthetic scene", () => {
    const positions = Float64Array.from([0, 0, 0, 1, 0, 0, 0, 1, 0]);
    const indices = Uint32Array.from([0, 1, 2]);
    const scene = {
      unit: "millimeter" as const,
      meshes: [{ id: "1", name: "tri", positions, indices }],
      bounds: { min: [0, 0, 0] as [number, number, number], max: [1, 1, 0] as [number, number, number] },
      sourceFormat: "3mf" as const,
      sourceMetadata: {
        fileName: "tri.3mf",
        originalUnit: "millimeter" as const,
        memberCount: 3,
        objectCount: 1,
        buildItemCount: 1,
        modelPath: "3D/3dmodel.model",
      },
      warnings: [],
    };
    const { bytes } = writeThreeMf(scene, {
      mtimeSeconds: Date.UTC(2020, 0, 1) / 1000,
    });
    const validation = validateThreeMf(bytes);
    expect(validation.ok).toBe(true);
    expect(validation.triangleCount).toBe(1);
    const reopened = flattenThreeMf(parseThreeMf(bytes, { fileName: "out.3mf" }));
    expect(reopened.meshes[0]!.indices.length / 3).toBe(1);
  });
});
