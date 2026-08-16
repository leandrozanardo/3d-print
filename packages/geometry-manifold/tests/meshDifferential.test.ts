import * as fs from "node:fs";
import * as path from "node:path";

import { parseMesh } from "@fix-my-print/formats";
import { PureTsGeometryAdapter } from "@fix-my-print/geometry";
import { createProductionGeometryAdapter } from "../src/index";

const FIXTURE = path.resolve(__dirname, "../../formats/fixtures/cube.stl");

/**
 * Differential parity: Node inspect vs frozen Python baseline for cube.stl.
 * Python (trimesh) at HEAD e992565: face_count=12, vertex_count=8, watertight=true,
 * volume signed -1.0 (winding). Node reports abs(volume)≈1.
 */
describe("mesh inspect differential (cube.stl)", () => {
  const pythonBaseline = JSON.parse(
    fs
      .readFileSync(
        path.resolve(__dirname, "../../../tests/differential/python-cube-inspect.json"),
      )
      .toString("utf8")
      .replace(/^\uFEFF/, ""),
  ) as {
    face_count: number;
    vertex_count: number;
    watertight: boolean;
    volume: number;
  };

  it("PureTs matches Python structural fields", () => {
    const buf = new Uint8Array(fs.readFileSync(FIXTURE));
    const { mesh } = parseMesh(buf);
    const facts = new PureTsGeometryAdapter().inspect(mesh);
    expect(facts.faceCount).toBe(pythonBaseline.face_count);
    expect(facts.vertexCount).toBe(pythonBaseline.vertex_count);
    expect(facts.watertight).toBe(pythonBaseline.watertight);
    expect(Math.abs(facts.volume!)).toBeCloseTo(Math.abs(pythonBaseline.volume), 5);
  });

  it("Manifold adapter matches same structural fields", async () => {
    const buf = new Uint8Array(fs.readFileSync(FIXTURE));
    const { mesh } = parseMesh(buf);
    const adapter = await createProductionGeometryAdapter();
    try {
      const facts = adapter.inspect(mesh);
      expect(facts.faceCount).toBe(pythonBaseline.face_count);
      expect(facts.vertexCount).toBe(pythonBaseline.vertex_count);
      expect(facts.watertight).toBe(pythonBaseline.watertight);
      expect(Math.abs(facts.volume!)).toBeCloseTo(Math.abs(pythonBaseline.volume), 5);
    } finally {
      await adapter.dispose();
    }
  });
});
