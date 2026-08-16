import type { AnalysisResult } from "@fix-my-print/contracts";

export interface OptimizationReport {
  schemaVersion: 1;
  runId: string;
  format: string;
  summary: string;
  metrics: {
    vertexCount: number;
    faceCount: number;
    bounds: AnalysisResult["bounds"];
  };
  findings: string[];
  limitations: string[];
}

/** Project an AnalysisResult into a plain OptimizationReport object. */
export function toOptimizationReport(result: AnalysisResult): OptimizationReport {
  return {
    schemaVersion: 1,
    runId: result.runId,
    format: result.format,
    summary: `Analyzed ${result.format}: ${result.faceCount} faces, ${result.vertexCount} vertices`,
    metrics: {
      vertexCount: result.vertexCount,
      faceCount: result.faceCount,
      bounds: result.bounds,
    },
    findings: [],
    limitations: ["Scores are geometry proxies only; no slicer simulation in MVP"],
  };
}
