import { describe, expect, it } from "vitest";

import { formatProcessFailure } from "./processFailure";

describe("formatProcessFailure", () => {
  it("never hides the engine message behind a generic fallback", () => {
    const formatted = formatProcessFailure(
      "MESH_PARSE_FAILED",
      "EMPTY_GEOMETRY: build has no items",
    );
    expect(formatted.message).not.toMatch(/Ocorreu um erro ao processar o modelo/i);
    expect(formatted.technicalLine).toBe(
      "MESH_PARSE_FAILED: EMPTY_GEOMETRY: build has no items",
    );
    expect(formatted.message).toMatch(/EMPTY_GEOMETRY: build has no items/);
  });

  it("keeps unknown engine errors verbatim", () => {
    const formatted = formatProcessFailure(
      "MESH_PARSE_FAILED",
      "INVALID_TRIANGLE at index 12: indices out of range",
    );
    expect(formatted.technicalLine).toContain("INVALID_TRIANGLE at index 12");
    expect(formatted.message).toContain("INVALID_TRIANGLE at index 12");
  });

  it("surfaces missing 3MF model parts explicitly", () => {
    const formatted = formatProcessFailure(
      "MESH_PARSE_FAILED",
      "MISSING_MODEL: no .model part found",
    );
    expect(formatted.technicalLine).toBe(
      "MESH_PARSE_FAILED: MISSING_MODEL: no .model part found",
    );
    expect(formatted.message.toLowerCase()).toMatch(/malha|\.model|3mf/);
  });
});
