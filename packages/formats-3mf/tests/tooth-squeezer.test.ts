import * as fs from "node:fs";
import * as path from "node:path";

import { parseThreeMf, resolveThreeMfInstances } from "../src/index";

const ROOT = path.resolve(__dirname, "../../..");
const FILE = path.join(
  ROOT,
  "3ds/temp/ToothSqeez_ExterGear_SeigaihaPattern.3mf",
);

describe("ToothSqeez Seigaiha 3MF", () => {
  it("has small parts scattered in CAD space beyond the A1 Mini bed", () => {
    expect(fs.existsSync(FILE)).toBe(true);
    const bytes = new Uint8Array(fs.readFileSync(FILE));
    const document = parseThreeMf(bytes, { fileName: "ToothSqeez.3mf" });
    const resolved = resolveThreeMfInstances(document, { fileName: "ToothSqeez.3mf" });
    const b = resolved.globalBounds;
    const width = b.max[0] - b.min[0];
    expect(resolved.instances.length).toBe(6);
    expect(width).toBeGreaterThan(180);
    for (const inst of resolved.instances) {
      const sx = inst.bounds.max[0] - inst.bounds.min[0];
      const sy = inst.bounds.max[1] - inst.bounds.min[1];
      const sz = inst.bounds.max[2] - inst.bounds.min[2];
      expect(sx).toBeLessThan(180);
      expect(sy).toBeLessThan(180);
      expect(sz).toBeLessThan(180);
    }
  });
});
