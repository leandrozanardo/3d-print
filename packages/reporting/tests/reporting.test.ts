import { toOptimizationReport } from "../src/index";

describe("@fix-my-print/reporting", () => {
  it("projects AnalysisResult to OptimizationReport", () => {
    const report = toOptimizationReport({
      schemaVersion: 1,
      runId: "r1",
      format: "stl-binary",
      vertexCount: 36,
      faceCount: 12,
      bounds: { min: [0, 0, 0], max: [1, 1, 1] },
    });
    expect(report.runId).toBe("r1");
    expect(report.metrics.faceCount).toBe(12);
    expect(report.limitations.length).toBeGreaterThan(0);
  });
});
