/**
 * Geometry Quality V2 — engine contract (RED until pipeline V2 lands).
 * Note: product-recovery lock requires optimization.candidateCount === 24 (legacy field).
 * V2 volume is reported via exactCandidateCount / quickCandidateCount.
 */
import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

import { exportBinaryStl } from "@fix-my-print/geometry";

import { BAMBU_A1_MINI, processModel } from "../src/index";

const ROOT = path.resolve(__dirname, "../../..");
const CUBE = path.join(ROOT, "packages/formats/fixtures/cube.stl");
const PROCESS_MODEL_SRC = path.join(__dirname, "../src/processModel.ts");

function sha256Hex(bytes: Uint8Array): string {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

/** Axis-aligned box STL (mm) with outward winding. */
function boxStl(sx: number, sy: number, sz: number): Uint8Array {
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
  return exportBinaryStl({ vertices: Float64Array.from(verts), faces });
}

/** Tall tower — V2 should lay it down so Z height drops sharply. */
function tallTowerStl(): Uint8Array {
  return boxStl(10, 10, 80);
}

describe("processModel V2 contract", () => {
  const cubeExists = fs.existsSync(CUBE);

  (cubeExists ? it : it.skip)(
    "returns decisionKind, normalized analysis, V2 candidate counts, and goal weights",
    async () => {
      const bytes = new Uint8Array(fs.readFileSync(CUBE));
      const inputSha = sha256Hex(bytes);
      const result = await processModel({
        jobId: "v2-contract",
        fileName: "cube.stl",
        bytes,
        printer: BAMBU_A1_MINI,
        goal: "balanced",
        repairMode: "safe",
      } as Parameters<typeof processModel>[0]);

      expect(result.engineVersion).toMatch(/2\.0\.0/);
      expect(result.normalized).toBeDefined();
      expect(result.repair).toBeDefined();
      // Real safeRepair always records attempts; skip-repair mutant forces empty abstained.
      expect(result.repair.operationsAttempted.length).toBeGreaterThan(0);
      expect(result.repair.status).not.toBe("abstained");
      expect(["not-needed", "committed", "rejected", "unavailable"]).toContain(
        result.repair.status,
      );
      expect([
        "orientation-improved",
        "repair-and-orientation-improved",
        "repair-only",
        "already-best-or-sanitized",
      ]).toContain(result.optimization.decisionKind);
      // Locked V1 field remains 24; V2 explores more via exactCandidateCount.
      expect(result.optimization.candidateCount).toBe(24);
      expect(result.optimization.legacyCandidateCount).toBe(24);
      expect(result.optimization.exactCandidateCount).toBeGreaterThan(24);
      expect(result.optimization.goal).toBe("balanced");
      expect(result.optimization.weights).toBeDefined();
      expect(result.optimization.qualityIndexBefore).toBeGreaterThanOrEqual(0);
      expect(result.optimization.qualityIndexAfter).toBeLessThanOrEqual(100);
      expect(result.optimization.bestV2Cost).toBeLessThanOrEqual(
        result.optimization.bestLegacyCost + 1e-9,
      );
      // Optimized bytes must differ from raw input (kills swap-output mutant).
      expect(result.output.sha256).not.toBe(inputSha);
      expect(result.output.bytes.byteLength).toBeGreaterThan(84);
    },
  );

  it("does not reject a 170mm plate that already fits A1 Mini", async () => {
    const bytes = boxStl(170, 170, 4);
    const result = await processModel({
      jobId: "v2-fits-plate",
      fileName: "plate.stl",
      bytes,
      printer: BAMBU_A1_MINI,
      goal: "balanced",
      repairMode: "none",
    } as Parameters<typeof processModel>[0]);
    expect(result.after.dimensionsMm[0]).toBeLessThanOrEqual(180);
    expect(result.after.dimensionsMm[1]).toBeLessThanOrEqual(180);
    expect(result.after.dimensionsMm[2]).toBeLessThanOrEqual(180);
  }, 60_000);

  it("applies chosen orientation matrix for a tall tower", async () => {
    const bytes = tallTowerStl();
    const result = await processModel({
      jobId: "v2-orient",
      fileName: "tall-tower.stl",
      bytes,
      printer: BAMBU_A1_MINI,
      goal: "minimize-height",
      repairMode: "safe",
    } as Parameters<typeof processModel>[0]);

    expect(result.before.dimensionsMm[2]).toBeGreaterThan(70);
    // Laying the tower down must shrink Z; identity-skip mutant keeps ~80mm height.
    expect(result.after.dimensionsMm[2]).toBeLessThan(25);
    expect(result.after.bounds.min[2]).toBeCloseTo(0, 5);
  }, 60_000);

  it("does not flag spaghetti on a stable face-down block", async () => {
    const bytes = boxStl(20, 20, 20);
    const result = await processModel({
      jobId: "v2-stable-block",
      fileName: "block.stl",
      bytes,
      printer: BAMBU_A1_MINI,
      goal: "balanced",
      repairMode: "safe",
    } as Parameters<typeof processModel>[0]);

    expect(result.warnings.filter((w) => w.code.startsWith("SPAGHETTI_"))).toEqual([]);
  }, 60_000);

  it("packs MakerWorld Bambu 3MF that is scattered in CAD space onto A1 Mini", async () => {
    const file = path.join(ROOT, "3ds/temp/ToothSqeez_ExterGear_SeigaihaPattern.3mf");
    expect(fs.existsSync(file)).toBe(true);
    const bytes = new Uint8Array(fs.readFileSync(file));
    const result = await processModel({
      jobId: "tooth-squeezer",
      fileName: "ToothSqeez_ExterGear_SeigaihaPattern.3mf",
      bytes,
      printer: BAMBU_A1_MINI,
      goal: "balanced",
      repairMode: "none",
    } as Parameters<typeof processModel>[0]);
    expect(result.partCount).toBe(6);
    expect(result.warnings.some((w) => w.code === "PACKED_ON_BED")).toBe(true);
    expect(result.after.dimensionsMm[0]).toBeLessThanOrEqual(180);
    expect(result.after.dimensionsMm[1]).toBeLessThanOrEqual(180);
    expect(result.after.dimensionsMm[2]).toBeLessThanOrEqual(180);
    expect(result.output.bytes.byteLength).toBeGreaterThan(1000);
  }, 180_000);

  it("keeps output reopen validation in processModel source", () => {
    const src = fs.readFileSync(PROCESS_MODEL_SRC, "utf8");
    expect(src).toContain("OUTPUT_REOPEN_FAILED");
    expect(src).toContain('parseThreeMf(outputBytes, { fileName: "output.3mf" })');
  });

  it("assesses spaghetti risk on the selected orientation", () => {
    const src = fs.readFileSync(PROCESS_MODEL_SRC, "utf8");
    expect(src).toContain("assessSpaghettiRisk(selected.metrics)");
  });
});
