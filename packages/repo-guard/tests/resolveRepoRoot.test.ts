import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { RepoBoundaryError } from "../src/assertInsideRepository";
import { REPO_PACKAGE_NAME, resolveRepoRoot } from "../src/resolveRepoRoot";

describe("resolveRepoRoot", () => {
  let tmp: string;

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "repo-root-"));
  });

  afterEach(() => {
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it("finds the monorepo root by package.json name", () => {
    fs.writeFileSync(
      path.join(tmp, "package.json"),
      JSON.stringify({ name: REPO_PACKAGE_NAME }),
    );
    const nested = path.join(tmp, "packages", "child");
    fs.mkdirSync(nested, { recursive: true });

    expect(path.resolve(resolveRepoRoot(nested))).toBe(path.resolve(tmp));
  });

  it("fails closed when the package name is absent", () => {
    fs.writeFileSync(
      path.join(tmp, "package.json"),
      JSON.stringify({ name: "other-project" }),
    );
    expect(() => resolveRepoRoot(tmp)).toThrow(RepoBoundaryError);
  });
});
