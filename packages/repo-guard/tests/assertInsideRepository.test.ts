import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import {
  assertInsideRepository,
  RepoBoundaryError,
} from "../src/assertInsideRepository";

describe("assertInsideRepository", () => {
  let root: string;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "repo-guard-"));
    fs.mkdirSync(path.join(root, "safe"), { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("accepts a relative path strictly inside the repository", () => {
    const target = path.join(root, "safe", "file.txt");
    fs.writeFileSync(target, "ok");

    const proven = assertInsideRepository(root, path.join("safe", "file.txt"));
    expect(path.resolve(proven)).toBe(path.resolve(target));
  });

  it("rejects parent traversal", () => {
    expect(() => assertInsideRepository(root, path.join("..", "outside"))).toThrow(
      RepoBoundaryError,
    );
  });

  it("rejects the repository root itself", () => {
    expect(() => assertInsideRepository(root, ".")).toThrow(RepoBoundaryError);
  });

  it("rejects absolute paths outside the repository", () => {
    const outside = path.join(os.tmpdir(), "outside-repo-file.txt");
    fs.writeFileSync(outside, "x");
    expect(() => assertInsideRepository(root, outside)).toThrow(RepoBoundaryError);
    fs.unlinkSync(outside);
  });
});
