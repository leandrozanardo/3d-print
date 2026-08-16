import { convertA1Pdfs } from "../src/convertA1Pdfs";

describe("convertA1Pdfs", () => {
  it("returns exitCode 2 when disabled", () => {
    const result = convertA1Pdfs();
    expect(result.ok).toBe(false);
    expect(result.exitCode).toBe(2);
    expect(result.message).toMatch(/docs\/printers\/A1mini/);
  });
});
