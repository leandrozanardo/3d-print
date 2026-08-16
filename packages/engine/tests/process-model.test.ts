import * as fs from "node:fs";
import * as path from "node:path";

import { BAMBU_A1_MINI, processModel } from "../src/index";

const ROOT = path.resolve(__dirname, "../../..");
const CUBE = path.join(ROOT, "packages/formats/fixtures/cube.stl");
const PRIVATE = path.join(ROOT, "3ds/original/one+Piece.3mf");

function findCube(): string | null {
  if (fs.existsSync(CUBE)) return CUBE;
  return null;
}

describe("processModel", () => {
  const cube = findCube();

  (cube ? it : it.skip)("processes STL end-to-end", async () => {
    const bytes = new Uint8Array(fs.readFileSync(cube!));
    const result = await processModel({
      jobId: "stl-1",
      fileName: "cube.stl",
      bytes,
      printer: BAMBU_A1_MINI,
      goal: "balanced",
    });
    expect(result.output.bytes.byteLength).toBeGreaterThan(84);
    expect(result.optimization.candidateCount).toBe(24);
    expect(result.after.bounds.min[2]).toBeCloseTo(0, 5);
  });

  (fs.existsSync(PRIVATE) ? it : it.skip)(
    "processes private one+Piece.3mf and validates output",
    async () => {
      const bytes = new Uint8Array(fs.readFileSync(PRIVATE));
      const result = await processModel({
        jobId: "3mf-1",
        fileName: "one+Piece.3mf",
        bytes,
        printer: BAMBU_A1_MINI,
        goal: "balanced",
      });
      expect(result.output.format).toBe("3mf");
      expect(result.output.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(result.before.triangleCount).toBe(379222);
      expect(result.after.bounds.min[2]).toBeCloseTo(0, 5);
      expect(result.output.bytes.byteLength).toBeGreaterThan(1000);
    },
    120_000,
  );
});
