import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import {
  dryRunPythonRetirement,
  type DeletionManifest,
  type DeletionManifestEntry,
  validateManifestForDryRun,
} from "../src/retirementDryRun";

function sha(body: string): string {
  return crypto.createHash("sha256").update(body).digest("hex");
}

function setupHappyFixture(): {
  root: string;
  body: string;
  digest: string;
  entry: DeletionManifestEntry;
} {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "retire-"));
  const py = path.join(root, "core");
  fs.mkdirSync(py);
  const body = "print('x')\n";
  fs.writeFileSync(path.join(py, "example.py"), body);
  const replacement = path.join(root, "packages", "example", "src", "index.ts");
  fs.mkdirSync(path.dirname(replacement), { recursive: true });
  fs.writeFileSync(replacement, "export {};\n");
  const evidence = path.join(root, "tests", "differential", "example.report.json");
  fs.mkdirSync(path.dirname(evidence), { recursive: true });
  fs.writeFileSync(evidence, '{"ok":true}\n');
  const digest = sha(body);
  return {
    root,
    body,
    digest,
    entry: {
      path: "core/example.py",
      sha256Before: digest,
      replacement: "packages/example/src/index.ts",
      parityEvidence: "tests/differential/example.report.json",
      reason: "Behavioral parity accepted",
    },
  };
}

describe("python retirement dry-run", () => {
  it("lists files when hashes and replacements match (relative inside)", () => {
    const { root, entry } = setupHappyFixture();
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [entry],
    };

    const result = dryRunPythonRetirement(root, manifest, "abc123");
    expect(result.errors).toEqual([]);
    expect(result.wouldDelete).toEqual(["core/example.py"]);
    expect(fs.existsSync(path.join(root, "core", "example.py"))).toBe(true);
    fs.rmSync(root, { recursive: true, force: true });
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
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("rejects absolute target path", () => {
    const { root, entry } = setupHappyFixture();
    const absPath = path.join(root, "core", "example.py");
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [{ ...entry, path: absPath }],
    };
    const result = validateManifestForDryRun(root, manifest, {
      actualHead: "abc123",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("illegal path"))).toBe(true);
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("rejects absolute replacement", () => {
    const { root, entry } = setupHappyFixture();
    const absRepl = path.join(root, "packages", "example", "src", "index.ts");
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [{ ...entry, replacement: absRepl }],
    };
    const result = validateManifestForDryRun(root, manifest, {
      actualHead: "abc123",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("absolute replacement"))).toBe(true);
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("rejects absolute parity-evidence", () => {
    const { root, entry } = setupHappyFixture();
    const absEv = path.join(root, "tests", "differential", "example.report.json");
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [{ ...entry, parityEvidence: absEv }],
    };
    const result = validateManifestForDryRun(root, manifest, {
      actualHead: "abc123",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("absolute parity-evidence"))).toBe(
        true,
      );
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("rejects hash mismatch", () => {
    const { root, entry } = setupHappyFixture();
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [{ ...entry, sha256Before: "deadbeef" }],
    };
    const result = validateManifestForDryRun(root, manifest, {
      actualHead: "abc123",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("hash mismatch"))).toBe(true);
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("rejects HEAD mismatch", () => {
    const { root, entry } = setupHappyFixture();
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [entry],
    };
    const result = validateManifestForDryRun(root, manifest, {
      actualHead: "other-head",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("expectedHead mismatch"))).toBe(true);
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("rejects directory target", () => {
    const { root, entry } = setupHappyFixture();
    fs.mkdirSync(path.join(root, "core", "subdir"), { recursive: true });
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [{ ...entry, path: "core/subdir" }],
    };
    const result = validateManifestForDryRun(root, manifest, {
      actualHead: "abc123",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("directory or glob refused"))).toBe(
        true,
      );
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("rejects glob-like paths", () => {
    const { root, entry } = setupHappyFixture();
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [{ ...entry, path: "core/*.py" }],
    };
    const result = validateManifestForDryRun(root, manifest, {
      actualHead: "abc123",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("glob-like"))).toBe(true);
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("rejects empty manifest", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "retire-"));
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [],
    };
    const result = validateManifestForDryRun(root, manifest, {
      actualHead: "abc123",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("empty manifest"))).toBe(true);
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("rejects empty path", () => {
    const { root, entry } = setupHappyFixture();
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [{ ...entry, path: "   " }],
    };
    const result = validateManifestForDryRun(root, manifest, {
      actualHead: "abc123",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("empty path"))).toBe(true);
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("rejects duplicate entry", () => {
    const { root, entry } = setupHappyFixture();
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [entry, { ...entry }],
    };
    const result = validateManifestForDryRun(root, manifest, {
      actualHead: "abc123",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("duplicate entry"))).toBe(true);
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("rejects parent traversal in path", () => {
    const { root, entry } = setupHappyFixture();
    const manifest: DeletionManifest = {
      schemaVersion: 1,
      expectedHead: "abc123",
      files: [{ ...entry, path: "../outside.py" }],
    };
    const result = validateManifestForDryRun(root, manifest, {
      actualHead: "abc123",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => /illegal path|boundary/.test(e))).toBe(true);
    }
    fs.rmSync(root, { recursive: true, force: true });
  });
});
