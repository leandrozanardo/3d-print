import { describe, expect, it } from "vitest";
import { featureFlags, isAiEnabled } from "./flags";

describe("feature flag defaults", () => {
  it("enables TypeScript engine path", () => {
    expect(featureFlags.engine.ts.enabled).toBe(true);
  });

  it("keeps geometry WASM off", () => {
    expect(featureFlags.geometry.wasm.enabled).toBe(false);
  });

  it("keeps AI off", () => {
    expect(featureFlags.ai.enabled).toBe(false);
    expect(isAiEnabled()).toBe(false);
  });
});
