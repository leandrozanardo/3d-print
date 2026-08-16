import { convertEbookAdoc } from "../src/convertEbookAdoc";

describe("convertEbookAdoc", () => {
  it("returns exitCode 2 when AsciiDoc sources are missing", () => {
    const result = convertEbookAdoc();
    expect(result.exitCode).toBe(2);
    expect(result.written).toEqual([]);
    expect(result.warnings.some((w) => /canonical/i.test(w))).toBe(true);
  });
});
