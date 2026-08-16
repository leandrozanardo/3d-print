import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import {
  EXIT_OK,
  EXIT_USAGE,
  EXIT_VALIDATION,
  resolveRepoRoot,
  runCli,
} from "../src/index";
import { RepoBoundaryError } from "@fix-my-print/repo-guard";

const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const CUBE = path.join(REPO_ROOT, "packages", "formats", "fixtures", "cube.stl");
const CUBE_REL = path.join("packages", "formats", "fixtures", "cube.stl");

describe("@fix-my-print/cli", () => {
  it("help exits 0", async () => {
    let stdout = "";
    const code = await runCli(["node", "fix-my-print", "help"], {
      stdout: (s) => {
        stdout += s;
      },
      stderr: () => undefined,
      cwd: REPO_ROOT,
    });
    expect(code).toBe(EXIT_OK);
    expect(stdout).toMatch(/validate-wiki/);
  });

  it("unknown command exits 2", async () => {
    const code = await runCli(["node", "fix-my-print", "nope"], {
      stdout: () => undefined,
      stderr: () => undefined,
      cwd: REPO_ROOT,
    });
    expect(code).toBe(EXIT_USAGE);
  });

  it("inspect-mesh cube exits 0", async () => {
    let stdout = "";
    const code = await runCli(
      ["node", "fix-my-print", "inspect-mesh", CUBE_REL, "--json"],
      {
        stdout: (s) => {
          stdout += s;
        },
        stderr: () => undefined,
        cwd: REPO_ROOT,
      },
    );
    expect(code).toBe(EXIT_OK);
    expect(stdout).toMatch(/"face_count": 12/);
    expect(stdout).toMatch(/"watertight": true/);
    expect(stdout).toMatch(/"vertex_count": 8/);
  });

  it("inspect-mesh accepts absolute path inside repository", async () => {
    let stdout = "";
    const code = await runCli(["node", "fix-my-print", "inspect-mesh", CUBE, "--json"], {
      stdout: (s) => {
        stdout += s;
      },
      stderr: () => undefined,
      cwd: REPO_ROOT,
    });
    expect(code).toBe(EXIT_OK);
    expect(stdout).toMatch(/"face_count": 12/);
  });

  it("inspect-mesh rejects absolute path outside repository", async () => {
    const outside = path.join(os.tmpdir(), `cli-outside-${process.pid}.stl`);
    fs.writeFileSync(outside, "solid x\nendsolid x\n");
    const code = await runCli(
      ["node", "fix-my-print", "inspect-mesh", outside, "--json"],
      {
        stdout: () => undefined,
        stderr: () => undefined,
        cwd: REPO_ROOT,
      },
    );
    expect(code).toBe(EXIT_VALIDATION);
    fs.unlinkSync(outside);
  });

  it("inspect-mesh missing file exits 1", async () => {
    const missing = path.join("packages", "formats", "fixtures", "missing-no-such.stl");
    expect(fs.existsSync(path.join(REPO_ROOT, missing))).toBe(false);
    const code = await runCli(
      ["node", "fix-my-print", "inspect-mesh", missing, "--json"],
      {
        stdout: () => undefined,
        stderr: () => undefined,
        cwd: REPO_ROOT,
      },
    );
    expect(code).toBe(EXIT_VALIDATION);
  });

  it("resolveRepoRoot fails closed when fix-my-print package.json is absent", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "cli-no-root-"));
    expect(() => resolveRepoRoot(tmp)).toThrow(RepoBoundaryError);
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it("resolveRepoRoot finds monorepo from nested cwd", () => {
    const nested = path.join(REPO_ROOT, "apps", "cli");
    expect(path.resolve(resolveRepoRoot(nested))).toBe(path.resolve(REPO_ROOT));
  });

  it("repair-mesh rejects outside absolute output", async () => {
    const outside = path.join(os.tmpdir(), `repair-out-${process.pid}.stl`);
    const code = await runCli(
      ["node", "fix-my-print", "repair-mesh", CUBE_REL, outside, "--json"],
      {
        stdout: () => undefined,
        stderr: () => undefined,
        cwd: REPO_ROOT,
      },
    );
    expect(code).toBe(EXIT_VALIDATION);
  });
});
