import { describe, expect, it } from "vitest";
import { detectCapabilities } from "./capabilities";

describe("detectCapabilities", () => {
  it("reports Worker and WASM when present", () => {
    const report = detectCapabilities({
      crossOriginIsolated: true,
      Worker: function Worker() {},
      WebAssembly: {},
    });
    expect(report.crossOriginIsolated).toBe(true);
    expect(report.workerSupport).toBe(true);
    expect(report.wasmSupport).toBe(true);
    expect(report.singleThreadNote).toMatch(/single-threaded/i);
  });

  it("reports missing Worker/WASM as false", () => {
    const report = detectCapabilities({
      crossOriginIsolated: false,
    });
    expect(report.crossOriginIsolated).toBe(false);
    expect(report.workerSupport).toBe(false);
    expect(report.wasmSupport).toBe(false);
  });
});
