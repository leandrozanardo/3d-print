import { describe, expect, it } from "vitest";
import { featureFlags, isAiEnabled } from "./flags";

describe("feature flag defaults", () => {
  it("enables TypeScript engine path", () => {
    expect(featureFlags.engine.ts.enabled).toBe(true);
  });

  it("keeps geometry WASM off until Manifold is wired in the worker", () => {
    // Documented: PureTs inspect path is active; do not enable without Manifold bundle proof.
    expect(featureFlags.geometry.wasm.enabled).toBe(false);
  });

  it("keeps AI off", () => {
    expect(featureFlags.ai.enabled).toBe(false);
    expect(isAiEnabled()).toBe(false);
  });
});
