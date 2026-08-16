import * as fs from "node:fs";
import * as path from "node:path";

import { parseBinaryStl } from "@fix-my-print/formats";

import { PureTsGeometryAdapter } from "../src/index";

const CUBE = path.join(
  __dirname,
  "..",
  "..",
  "formats",
  "fixtures",
  "cube.stl",
);

describe("@fix-my-print/geometry", () => {
  const adapter = new PureTsGeometryAdapter();

  it("inspects cube mesh", () => {
    const mesh = parseBinaryStl(new Uint8Array(fs.readFileSync(CUBE)));
    const facts = adapter.inspect(mesh);
    expect(facts.faceCount).toBe(12);
    expect(facts.vertexCount).toBe(36);
    expect(facts.bounds.min[0]).toBeCloseTo(0);
    expect(facts.bounds.max[0]).toBeCloseTo(1);
  });

  it("translate preserves face count", () => {
    const mesh = parseBinaryStl(new Uint8Array(fs.readFileSync(CUBE)));
    const moved = adapter.transform(mesh, {
      type: "translate",
      dx: 10,
      dy: 0,
      dz: 0,
    });
    expect(moved.faces.length).toBe(mesh.faces.length);
    const facts = adapter.inspect(moved);
    expect(facts.bounds.min[0]).toBeCloseTo(10);
  });
});
