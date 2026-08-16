/**
 * AI is an explicit opt-in port. Core engine must use NullAiPort by default.
 */
export interface AiExplanationRequest {
  schemaVersion: 1;
  runId: string;
  factsSummary: string;
  ruleIds: string[];
}

export interface AiExplanationResult {
  schemaVersion: 1;
  status: "disabled" | "ok" | "error";
  text?: string;
  errorCode?: string;
}

export interface AiPort {
  explain(request: AiExplanationRequest): Promise<AiExplanationResult>;
}

export class NullAiPort implements AiPort {
  async explain(request: AiExplanationRequest): Promise<AiExplanationResult> {
    void request;
    return { schemaVersion: 1, status: "disabled", errorCode: "AI_DISABLED" };
  }
}
