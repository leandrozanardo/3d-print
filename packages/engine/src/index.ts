import {
  createEngineError,
  EngineException,
  type AnalysisResult,
  type EngineError,
  type RunManifest,
} from "@fix-my-print/contracts";
import { parseMesh } from "@fix-my-print/formats";
import { PureTsGeometryAdapter, type GeometryPort } from "@fix-my-print/geometry";

export type PipelineState =
  | "Draft"
  | "Validating"
  | "Ready"
  | "Analyzing"
  | "Proposing"
  | "Completed"
  | "Failed"
  | "Cancelled";

const ALLOWED: Record<PipelineState, readonly PipelineState[]> = {
  Draft: ["Validating", "Failed", "Cancelled"],
  Validating: ["Ready", "Failed", "Cancelled"],
  Ready: ["Analyzing", "Failed", "Cancelled"],
  Analyzing: ["Proposing", "Failed", "Cancelled"],
  Proposing: ["Completed", "Failed", "Cancelled"],
  Completed: [],
  Failed: [],
  Cancelled: [],
};

export class AnalysisEngine {
  private state: PipelineState = "Draft";
  private cancelled = false;
  private readonly runId: string;
  private readonly geometry: GeometryPort;
  private readonly transitions: RunManifest["transitions"] = [];
  private readonly createdAt: string;

  constructor(
    runId: string,
    geometry: GeometryPort = new PureTsGeometryAdapter(),
    createdAt = "1970-01-01T00:00:00.000Z",
  ) {
    this.runId = runId;
    this.geometry = geometry;
    this.createdAt = createdAt;
  }

  getState(): PipelineState {
    return this.state;
  }

  cancel(): void {
    if (this.state === "Completed" || this.state === "Failed") {
      return;
    }
    this.cancelled = true;
    this.transition("Cancelled");
  }

  private transition(to: PipelineState): void {
    const from = this.state;
    if (from === to) return;
    const allowed = ALLOWED[from];
    if (!allowed.includes(to)) {
      throw new EngineException(
        createEngineError("INTERNAL_ERROR", `illegal transition ${from} -> ${to}`),
      );
    }
    this.transitions.push({
      at: this.createdAt,
      from,
      to,
    });
    this.state = to;
  }

  private ensureNotCancelled(): void {
    if (this.cancelled || this.state === "Cancelled") {
      throw new EngineException(createEngineError("RUN_CANCELLED", "run cancelled"));
    }
  }

  analyzeFile(buffer: Uint8Array): AnalysisResult {
    try {
      this.ensureNotCancelled();
      this.transition("Validating");
      this.ensureNotCancelled();
      if (buffer.byteLength === 0) {
        throw new EngineException(createEngineError("MESH_PARSE_FAILED", "empty buffer"));
      }
      this.transition("Ready");
      this.ensureNotCancelled();
      this.transition("Analyzing");
      this.ensureNotCancelled();
      const { format, mesh } = parseMesh(buffer);
      const facts = this.geometry.inspect(mesh);
      this.transition("Proposing");
      this.ensureNotCancelled();
      const result: AnalysisResult = {
        schemaVersion: 1,
        runId: this.runId,
        format,
        vertexCount: facts.vertexCount,
        faceCount: facts.faceCount,
        bounds: facts.bounds,
      };
      this.transition("Completed");
      return result;
    } catch (err) {
      if (this.state !== "Cancelled") {
        try {
          this.transition("Failed");
        } catch {
          this.state = "Failed";
        }
      }
      throw err;
    }
  }

  toManifest(): RunManifest {
    return {
      schemaVersion: 1,
      runId: this.runId,
      createdAt: this.createdAt,
      state: this.state,
      inputSha256: null,
      knowledgePackHash: null,
      engineVersion: "0.0.0",
      transitions: [...this.transitions],
    };
  }
}

export function isEngineError(err: unknown): err is EngineException {
  return err instanceof EngineException;
}

export type { EngineError };
export {
  NullAiPort,
  type AiPort,
  type AiExplanationRequest,
  type AiExplanationResult,
} from "./aiPort";

export {
  processModel,
  BAMBU_A1_MINI,
  type ProcessModelRequest,
  type ProcessModelResult,
  type PrinterProfile,
  type OptimizationGoal,
  type GeometryAnalysis,
  type OptimizationDecision,
  type ProcessStageCallback,
} from "./processModel";
