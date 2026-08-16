import { NullAiPort } from "../src/aiPort";

describe("NullAiPort", () => {
  it("returns disabled without inventing explanations", async () => {
    const port = new NullAiPort();
    const result = await port.explain({
      schemaVersion: 1,
      runId: "run-1",
      factsSummary: "cube",
      ruleIds: ["rule.a"],
    });
    expect(result.status).toBe("disabled");
    expect(result.errorCode).toBe("AI_DISABLED");
    expect(result.text).toBeUndefined();
  });
});
