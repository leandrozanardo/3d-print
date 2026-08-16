import * as fs from "node:fs";
import * as path from "node:path";

import { Command } from "commander";
import { parseMesh } from "@fix-my-print/formats";
import { PureTsGeometryAdapter } from "@fix-my-print/geometry";
import { validateWiki } from "@fix-my-print/knowledge-compiler";
import { assertInsideRepository } from "@fix-my-print/repo-guard";

export const EXIT_OK = 0;
export const EXIT_VALIDATION = 1;
export const EXIT_USAGE = 2;

function resolveRepoRoot(): string {
  // Walk up from cwd looking for package.json name fix-my-print or .git
  let dir = process.cwd();
  for (let i = 0; i < 12; i++) {
    const pkg = path.join(dir, "package.json");
    if (fs.existsSync(pkg)) {
      try {
        const json = JSON.parse(fs.readFileSync(pkg, "utf8")) as {
          name?: string;
        };
        if (json.name === "fix-my-print") {
          return dir;
        }
      } catch {
        // continue
      }
    }
    if (fs.existsSync(path.join(dir, ".git"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

function helpText(): string {
  return [
    "Usage: fix-my-print <command> [options]",
    "",
    "Commands:",
    "  help                         Show this help",
    "  validate-wiki <docsRoot>     Validate wiki Markdown corpus",
    "  inspect-mesh <file>         Inspect STL mesh (formats + geometry)",
    "",
    "Exit codes: 0 ok, 1 validation/analysis failure, 2 usage error",
  ].join("\n");
}

export async function runCli(
  argv: string[],
  io: {
    stdout?: (s: string) => void;
    stderr?: (s: string) => void;
  } = {},
): Promise<number> {
  const out = io.stdout ?? ((s: string) => process.stdout.write(s));
  const err = io.stderr ?? ((s: string) => process.stderr.write(s));

  const program = new Command();
  program.name("fix-my-print").exitOverride();
  program.configureOutput({
    writeOut: (str) => out(str),
    writeErr: (str) => err(str),
  });

  let exitCode = EXIT_OK;

  program
    .command("help")
    .description("Show help")
    .action(() => {
      out(`${helpText()}\n`);
    });

  program
    .command("validate-wiki")
    .argument("<docsRoot>", "Path to docs root")
    .description("Validate wiki using knowledge-compiler")
    .action((docsRoot: string) => {
      const root = resolveRepoRoot();
      const abs = path.isAbsolute(docsRoot)
        ? docsRoot
        : assertInsideRepository(root, docsRoot);
      const result = validateWiki(abs);
      out(`${JSON.stringify({ ok: result.ok, stats: result.stats }, null, 2)}\n`);
      if (!result.ok) {
        for (const e of result.errors.slice(0, 20)) {
          err(`${e}\n`);
        }
        exitCode = EXIT_VALIDATION;
      }
    });

  program
    .command("inspect-mesh")
    .argument("<file>", "Mesh file path")
    .description("Parse and inspect a mesh file")
    .action((file: string) => {
      const root = resolveRepoRoot();
      const abs = path.isAbsolute(file)
        ? file
        : assertInsideRepository(root, file);
      if (!fs.existsSync(abs)) {
        err(`file not found: ${abs}\n`);
        exitCode = EXIT_VALIDATION;
        return;
      }
      const buf = new Uint8Array(fs.readFileSync(abs));
      try {
        const { format, mesh } = parseMesh(buf);
        const facts = new PureTsGeometryAdapter().inspect(mesh);
        out(
          `${JSON.stringify({ ok: true, format, ...facts }, null, 2)}\n`,
        );
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        err(`${message}\n`);
        exitCode = EXIT_VALIDATION;
      }
    });

  // Default help when no args
  const args = argv.slice(2);
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    out(`${helpText()}\n`);
    return EXIT_OK;
  }

  try {
    await program.parseAsync(argv);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    if (/unknown command|missing required argument|error:/i.test(message)) {
      err(`${message}\n`);
      err(`${helpText()}\n`);
      return EXIT_USAGE;
    }
    err(`${message}\n`);
    return EXIT_USAGE;
  }

  return exitCode;
}
