import * as fs from "node:fs";
import * as path from "node:path";

import { EXIT_OK, EXIT_USAGE, EXIT_VALIDATION, runCli } from "../src/index";

const CUBE = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "packages",
  "formats",
  "fixtures",
  "cube.stl",
);

describe("@fix-my-print/cli", () => {
  it("help exits 0", async () => {
    let stdout = "";
    const code = await runCli(["node", "fix-my-print", "help"], {
      stdout: (s) => {
        stdout += s;
      },
      stderr: () => undefined,
    });
    expect(code).toBe(EXIT_OK);
    expect(stdout).toMatch(/validate-wiki/);
  });

  it("unknown command exits 2", async () => {
    const code = await runCli(["node", "fix-my-print", "nope"], {
      stdout: () => undefined,
      stderr: () => undefined,
    });
    expect(code).toBe(EXIT_USAGE);
  });

  it("inspect-mesh cube exits 0", async () => {
    let stdout = "";
    const code = await runCli(
      ["node", "fix-my-print", "inspect-mesh", CUBE],
      {
        stdout: (s) => {
          stdout += s;
        },
        stderr: () => undefined,
      },
    );
    expect(code).toBe(EXIT_OK);
    expect(stdout).toMatch(/"faceCount": 12/);
  });

  it("inspect-mesh missing file exits 1", async () => {
    const missing = path.join(path.dirname(CUBE), "missing-no-such.stl");
    expect(fs.existsSync(missing)).toBe(false);
    const code = await runCli(
      ["node", "fix-my-print", "inspect-mesh", missing],
      {
        stdout: () => undefined,
        stderr: () => undefined,
      },
    );
    expect(code).toBe(EXIT_VALIDATION);
  });
});
