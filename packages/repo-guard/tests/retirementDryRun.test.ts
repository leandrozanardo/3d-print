import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import {
  dryRunPythonRetirement,
  type DeletionManifest,
} from "../src/retirementDryRun";

describe("python retirement dry-run", () => {
  it("lists files when hashes and replacements match", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "retire-"));
    const py = path.join(root, "core");
    fs.mkdirSync(py);
    const target = path.join(py, "example.py");
    const body = "print('x')\n";
    fs.writeFileSync(target, body);
    const replacement = path.join(root, "packages", "example", "src", "index.ts");
    fs.mkdirSync(path.dirname(replacement), { recursive: true });
    fs.writeFileSync(replacement, "export {};\n");
    const evidence = path.join(root, "tests", "differential", "example.report.json");
    fs.mkdirSync(path.dirname(evidence), { recursive: true });
    fs.writeFileSync(evidence, "{\"ok\":true}\n");

    const digest = crypto.createHash("sha256").update(body).digest("hex");
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [
        {
          path: "core/example.py",
          sha256Before: digest,
          replacement: "packages/example/src/index.ts",
          parityEvidence: "tests/differential/example.report.json",
          reason: "Behavioral parity accepted",
        },
      ],
    };

    const result = dryRunPythonRetirement(root, manifest, "abc123");
    expect(result.errors).toEqual([]);
    expect(result.wouldDelete).toEqual(["core/example.py"]);
    expect(fs.existsSync(target)).toBe(true);
  });

  it("refuses protected docs paths", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "retire-"));
    fs.mkdirSync(path.join(root, "docs"), { recursive: true });
    fs.writeFileSync(path.join(root, "docs", "a.md"), "x");
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [
        {
          path: "docs/a.md",
          sha256Before: "00",
          replacement: "packages/x.ts",
          parityEvidence: "tests/x.json",
          reason: "bad",
        },
      ],
    };
    const result = dryRunPythonRetirement(root, manifest, "abc123");
    expect(result.wouldDelete).toEqual([]);
    expect(result.errors.some((e) => e.includes("protected"))).toBe(true);
  });
});
