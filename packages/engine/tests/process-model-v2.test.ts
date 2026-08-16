/**
 * Geometry Quality V2 — engine contract (RED until pipeline V2 lands).
 * Note: product-recovery lock requires optimization.candidateCount === 24 (legacy field).
 * V2 volume is reported via exactCandidateCount / quickCandidateCount.
 */
import * as fs from "node:fs";
import * as path from "node:path";

import { BAMBU_A1_MINI, processModel } from "../src/index";

const ROOT = path.resolve(__dirname, "../../..");
const CUBE = path.join(ROOT, "packages/formats/fixtures/cube.stl");

describe("processModel V2 contract", () => {
  const cubeExists = fs.existsSync(CUBE);

  (cubeExists ? it : it.skip)(
    "returns decisionKind, normalized analysis, V2 candidate counts, and goal weights",
    async () => {
      const bytes = new Uint8Array(fs.readFileSync(CUBE));
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
      expect([
        "not-needed",
        "committed",
        "abstained",
        "rejected",
        "unavailable",
      ]).toContain(result.repair.status);
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
    },
  );
});
