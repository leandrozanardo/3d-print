import { readFileSync } from "node:fs";
import path from "node:path";

import { parseMesh } from "@fix-my-print/formats";

import { createProductionGeometryAdapter, ManifoldGeometryAdapter } from "../src/index";

describe("ManifoldGeometryAdapter", () => {
  it("inspects cube with topology facts", async () => {
    const buf = new Uint8Array(
      readFileSync(path.resolve(__dirname, "../../formats/fixtures/cube.stl")),
    );
    const { mesh } = parseMesh(buf);
    const adapter = await createProductionGeometryAdapter();
    const facts = adapter.inspect(mesh);
    expect(facts.faceCount).toBe(12);
    expect(facts.vertexCount).toBeGreaterThan(0);
    expect(facts.bounds.max[0]).toBeGreaterThan(facts.bounds.min[0]);
    await adapter.dispose();
  });

  it("createProductionGeometryAdapter returns ready adapter", async () => {
    const adapter = await createProductionGeometryAdapter();
    expect(adapter).toBeInstanceOf(ManifoldGeometryAdapter);
    await adapter.dispose();
  });
});
