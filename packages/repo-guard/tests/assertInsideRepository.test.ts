import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import {
  assertInsideRepository,
  RepoBoundaryError,
  resolveInsideRepository,
} from "../src/assertInsideRepository";

describe("assertInsideRepository / resolveInsideRepository", () => {
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

  it("accepts an absolute path strictly inside the repository", () => {
    const target = path.join(root, "safe", "abs-inside.txt");
    fs.writeFileSync(target, "ok");

    const proven = resolveInsideRepository(root, target);
    expect(path.resolve(proven)).toBe(path.resolve(target));
  });

  it("rejects parent traversal", () => {
    expect(() => assertInsideRepository(root, path.join("..", "outside"))).toThrow(
      RepoBoundaryError,
    );
  });

  it("rejects the repository root itself", () => {
    expect(() => assertInsideRepository(root, ".")).toThrow(RepoBoundaryError);
    expect(() => resolveInsideRepository(root, root)).toThrow(RepoBoundaryError);
  });

  it("rejects absolute paths outside the repository", () => {
    const outside = path.join(os.tmpdir(), `outside-repo-file-${process.pid}.txt`);
    fs.writeFileSync(outside, "x");
    expect(() => assertInsideRepository(root, outside)).toThrow(RepoBoundaryError);
    expect(() => resolveInsideRepository(root, outside)).toThrow(RepoBoundaryError);
    fs.unlinkSync(outside);
  });

  it("rejects missing parent directories", () => {
    expect(() =>
      assertInsideRepository(root, path.join("no-such-dir", "child.txt")),
    ).toThrow(RepoBoundaryError);
  });

  it("rejects symlink directory escape when OS allows symlink creation", () => {
    const outsideDir = fs.mkdtempSync(path.join(os.tmpdir(), "repo-guard-out-"));
    const linkPath = path.join(root, "escape-dir");
    let created = false;
    try {
      fs.symlinkSync(outsideDir, linkPath, "dir");
      created = true;
    } catch {
      try {
        fs.symlinkSync(outsideDir, linkPath, "junction");
        created = true;
      } catch {
        // OS may block symlink creation without elevation
      }
    }
    if (!created) {
      fs.rmSync(outsideDir, { recursive: true, force: true });
      return;
    }
    expect(() =>
      assertInsideRepository(root, path.join("escape-dir", "secret.txt")),
    ).toThrow(RepoBoundaryError);
    fs.rmSync(linkPath, { recursive: true, force: true });
    fs.rmSync(outsideDir, { recursive: true, force: true });
  });

  it("rejects symlink file escape when OS allows symlink creation", () => {
    const outside = path.join(os.tmpdir(), `outside-symlink-target-${process.pid}.txt`);
    fs.writeFileSync(outside, "secret");
    const linkPath = path.join(root, "safe", "escape-file.txt");
    let created = false;
    try {
      fs.symlinkSync(outside, linkPath, "file");
      created = true;
    } catch {
      // skip when OS blocks
    }
    if (!created) {
      fs.unlinkSync(outside);
      return;
    }
    expect(() =>
      assertInsideRepository(root, path.join("safe", "escape-file.txt")),
    ).toThrow(RepoBoundaryError);
    fs.unlinkSync(linkPath);
    fs.unlinkSync(outside);
  });

  it("rejects broken symlinks when OS allows symlink creation", () => {
    const missingTarget = path.join(root, "safe", "missing-target.txt");
    const linkPath = path.join(root, "safe", "broken-link.txt");
    let created = false;
    try {
      fs.symlinkSync(missingTarget, linkPath, "file");
      created = true;
    } catch {
      // skip when OS blocks
    }
    if (!created) {
      return;
    }
    expect(() =>
      assertInsideRepository(root, path.join("safe", "broken-link.txt")),
    ).toThrow(RepoBoundaryError);
    fs.unlinkSync(linkPath);
  });

  it("resolveInsideRepository never bypasses absolute outside paths", () => {
    const outside = path.join(os.tmpdir(), `bypass-check-${process.pid}.txt`);
    fs.writeFileSync(outside, "x");
    expect(() => resolveInsideRepository(root, outside)).toThrow(RepoBoundaryError);
    fs.unlinkSync(outside);
  });
});
