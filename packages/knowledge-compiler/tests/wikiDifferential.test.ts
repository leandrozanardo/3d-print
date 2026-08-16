import * as path from "node:path";

import { validateWiki } from "../src/index";

const ROOT = path.resolve(__dirname, "../../..");
const TODAY = new Date(Date.UTC(2026, 7, 16));

describe("wiki differential fixtures (Phase 13)", () => {
  it("strict ok fixture remains green", () => {
    const result = validateWiki(path.join(ROOT, "tests/fixtures/wiki_strict_ok"), {
      strict: true,
      today: TODAY,
    });
    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("strict broken fixture reports expected issue families", () => {
    const result = validateWiki(path.join(ROOT, "tests/fixtures/wiki_strict_broken"), {
      strict: true,
      today: TODAY,
    });
    expect(result.ok).toBe(false);
    const blob = [...result.errors, ...result.warnings].join("\n");
    for (const code of [
      "duplicate_id",
      "unresolved_id",
      "prereq_cycle",
      "missing_front_matter",
      "invalid_promotion",
      "absolute_claim",
    ]) {
      expect(blob).toContain(code);
    }
  });
});
