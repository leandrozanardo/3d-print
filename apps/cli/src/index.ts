import * as fs from "node:fs";
import * as path from "node:path";

import { Command } from "commander";
import { createEngineError, EngineException } from "@fix-my-print/contracts";
import { convertA1Pdfs, convertEbookAdoc } from "@fix-my-print/editorial";
import { parseMesh } from "@fix-my-print/formats";
import { inspect3mf } from "@fix-my-print/formats-3mf";
import {
  PureTsGeometryAdapter,
  type GeometryFacts,
  type GeometryPort,
} from "@fix-my-print/geometry";
import { createProductionGeometryAdapter } from "@fix-my-print/geometry-manifold";
import { bootstrapWikiPage, validateWiki } from "@fix-my-print/knowledge-compiler";
import {
  RepoBoundaryError,
  resolveInsideRepository,
  resolveRepoRoot,
} from "@fix-my-print/repo-guard";

export const EXIT_OK = 0;
export const EXIT_VALIDATION = 1;
export const EXIT_USAGE = 2;
export const EXIT_SIGINT = 130;

/** Re-export shared fail-closed monorepo root resolver from repo-guard. */
export { resolveRepoRoot };

/** Resolve any CLI path arg through the repository boundary (absolute or relative). */
export function resolveCliPath(candidate: string, startDir?: string): string {
  const root = resolveRepoRoot(startDir);
  return resolveInsideRepository(root, candidate);
}

function helpText(): string {
  return [
    "Usage: fix-my-print <command> [options]",
    "",
    "Commands:",
    "  help                              Show this help",
    "  validate-wiki <docsRoot>          Validate wiki Markdown corpus",
    "  inspect-mesh <file>               Inspect STL/OBJ/PLY mesh",
    "  inspect-3mf <file>                Inspect 3MF/ZIP container (read-only)",
    "  repair-mesh <source> <output>     Light mesh repair (Manifold WASM)",
    "  bootstrap-wiki <relPath>          Create missing wiki page (never overwrite)",
    "  convert-a1-pdfs                   Disabled A1 PDF converter (exit 2)",
    "  convert-ebook-adoc                AsciiDoc→MD ebook converter",
    "",
    "Exit codes: 0 ok, 1 validation/analysis failure, 2 usage error, 130 interrupt",
  ].join("\n");
}

function printWikiHuman(
  result: {
    ok: boolean;
    errors: string[];
    warnings: string[];
    stats: Record<string, unknown>;
  },
  out: (s: string) => void,
  err: (s: string) => void,
): void {
  if (result.ok) {
    out(`OK: ${JSON.stringify(result.stats)}\n`);
  }
  for (const e of result.errors) {
    err(`${e}\n`);
  }
  for (const w of result.warnings) {
    err(`WARNING: ${w}\n`);
  }
}

function isUnderOriginalTree(absPath: string, repoRoot: string): boolean {
  const rel = path.relative(repoRoot, absPath).replace(/\\/g, "/");
  return rel === "3ds/original" || rel.startsWith("3ds/original/");
}

/** Python MeshReport-compatible payload (+ extended topology fields). */
export function toMeshReportPayload(
  absPath: string,
  format: string,
  facts: GeometryFacts,
): Record<string, unknown> {
  const [minX, minY, minZ] = facts.bounds.min;
  const [maxX, maxY, maxZ] = facts.bounds.max;
  return {
    path: absPath,
    format,
    face_count: facts.faceCount,
    vertex_count: facts.vertexCount,
    watertight: facts.watertight,
    volume: facts.volume,
    bounds: {
      min_xyz: [minX, minY, minZ],
      max_xyz: [maxX, maxY, maxZ],
      size_xyz: [maxX - minX, maxY - minY, maxZ - minZ],
    },
    issues: facts.issues,
    units_assumed: facts.unitsAssumed,
    area: facts.area,
    component_count: facts.componentCount,
    limitations: facts.limitations,
  };
}

async function resolveGeometryAdapter(): Promise<GeometryPort> {
  try {
    return await createProductionGeometryAdapter();
  } catch {
    return new PureTsGeometryAdapter();
  }
}

export async function runCli(
  argv: string[],
  io: {
    stdout?: (s: string) => void;
    stderr?: (s: string) => void;
    cwd?: string;
  } = {},
): Promise<number> {
  const out = io.stdout ?? ((s: string) => process.stdout.write(s));
  const err = io.stderr ?? ((s: string) => process.stderr.write(s));
  const cwd = io.cwd ?? process.cwd();

  let exitCode: number = EXIT_OK;
  const program = new Command();
  program.name("fix-my-print").exitOverride();
  program.configureOutput({
    writeOut: (s) => out(s),
    writeErr: (s) => err(s),
  });

  program
    .command("help")
    .description("Show help")
    .action(() => {
      out(`${helpText()}\n`);
    });

  program
    .command("validate-wiki")
    .argument("<docsRoot>", "Documentation root directory")
    .option("--json", "Emit machine-readable JSON", false)
    .option("--strict", "Enable enterprise semantic validation", false)
    .option("--fail-on-warnings", "With --strict, treat warnings as failures", false)
    .description("Validate wiki Markdown corpus")
    .action(
      (
        docsRoot: string,
        opts: { json?: boolean; strict?: boolean; failOnWarnings?: boolean },
      ) => {
        try {
          const abs = resolveCliPath(docsRoot, cwd);
          const result = validateWiki(abs, {
            strict: Boolean(opts.strict),
            failOnWarnings: Boolean(opts.failOnWarnings),
          });
          if (opts.json) {
            out(`${JSON.stringify(result, null, 2)}\n`);
          } else {
            printWikiHuman(result, out, err);
          }
          exitCode = result.ok ? EXIT_OK : EXIT_VALIDATION;
        } catch (e) {
          if (e instanceof RepoBoundaryError) {
            err(`${e.message}\n`);
            exitCode = EXIT_VALIDATION;
            return;
          }
          throw e;
        }
      },
    );

  program
    .command("inspect-mesh")
    .argument("<file>", "Mesh file path")
    .option("--json", "Emit machine-readable JSON", false)
    .description("Parse and inspect a mesh file")
    .action(async (file: string, opts: { json?: boolean }) => {
      try {
        const abs = resolveCliPath(file, cwd);
        if (!fs.existsSync(abs)) {
          err(`file not found: ${abs}\n`);
          exitCode = EXIT_VALIDATION;
          return;
        }
        const buf = new Uint8Array(fs.readFileSync(abs));
        const { format, mesh } = parseMesh(buf);
        const adapter = await resolveGeometryAdapter();
        try {
          const facts = adapter.inspect(mesh);
          const payload = toMeshReportPayload(abs, format, facts);
          if (opts.json) {
            out(`${JSON.stringify(payload, null, 2)}\n`);
          } else {
            for (const [key, value] of Object.entries(payload)) {
              out(`${key}: ${JSON.stringify(value)}\n`);
            }
          }
        } finally {
          await adapter.dispose();
        }
      } catch (e) {
        if (e instanceof RepoBoundaryError) {
          err(`${e.message}\n`);
          exitCode = EXIT_VALIDATION;
          return;
        }
        const message = e instanceof Error ? e.message : String(e);
        err(`${message}\n`);
        exitCode = EXIT_VALIDATION;
      }
    });

  program
    .command("inspect-3mf")
    .argument("<file>", "3MF file path")
    .option("--json", "Emit machine-readable JSON", false)
    .option("--strict", "Exit 1 when issues are present", false)
    .description("Inspect 3MF container (read-only ZIP policy)")
    .action((file: string, opts: { json?: boolean; strict?: boolean }) => {
      try {
        const abs = resolveCliPath(file, cwd);
        if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
          err(`file not found: ${abs}\n`);
          exitCode = EXIT_VALIDATION;
          return;
        }
        if (!abs.toLowerCase().endsWith(".3mf")) {
          throw new EngineException(
            createEngineError(
              "FORMAT_UNSUPPORTED",
              `Unsupported extension (allowed: ['.3mf'])`,
              { retryable: false },
            ),
          );
        }
        const buf = new Uint8Array(fs.readFileSync(abs));
        const report = inspect3mf(buf);
        const payload = {
          path: abs,
          is_zip: report.isZip,
          member_count: report.memberCount,
          members: report.members,
          has_model: report.hasModel,
          metadata_notes: report.metadataNotes ?? [],
          issues: report.issues,
          units: report.units ?? null,
          object_count: report.objectCount ?? null,
        };
        if (opts.json) {
          out(`${JSON.stringify(payload, null, 2)}\n`);
        } else {
          for (const [key, value] of Object.entries(payload)) {
            out(`${key}: ${JSON.stringify(value)}\n`);
          }
        }
        if (opts.strict && report.issues.length > 0) {
          exitCode = EXIT_VALIDATION;
        }
      } catch (e) {
        if (e instanceof RepoBoundaryError) {
          err(`${e.message}\n`);
          exitCode = EXIT_VALIDATION;
          return;
        }
        if (e instanceof EngineException) {
          const payload = { ok: false, code: e.code, error: e.message };
          if (opts.json) {
            err(`${JSON.stringify(payload, null, 2)}\n`);
          } else {
            err(`ERROR [${e.code}]: ${e.message}\n`);
          }
          exitCode = EXIT_VALIDATION;
          return;
        }
        const message = e instanceof Error ? e.message : String(e);
        err(`${message}\n`);
        exitCode = EXIT_VALIDATION;
      }
    });

  program
    .command("repair-mesh")
    .argument("<source>", "Input mesh path")
    .argument("<output>", "Output mesh path (not under 3ds/original)")
    .option("--json", "Emit machine-readable JSON", false)
    .description("Light repair; refuses writes under 3ds/original")
    .action(async (source: string, output: string, opts: { json?: boolean }) => {
      try {
        const root = resolveRepoRoot(cwd);
        const absSource = resolveInsideRepository(root, source);
        const absOutput = resolveInsideRepository(root, output);
        if (isUnderOriginalTree(absOutput, root)) {
          throw new EngineException(
            createEngineError(
              "ORIGINAL_IMMUTABLE",
              `Refusing write under 3ds/original: ${absOutput}`,
              { retryable: false },
            ),
          );
        }
        if (!fs.existsSync(absSource)) {
          err(`file not found: ${absSource}\n`);
          exitCode = EXIT_VALIDATION;
          return;
        }
        const buf = new Uint8Array(fs.readFileSync(absSource));
        const { mesh } = parseMesh(buf);
        const adapter = await resolveGeometryAdapter();
        try {
          const repaired = await adapter.repair(mesh, {
            mergeVertices: true,
            removeDegenerate: true,
            fillHoles: true,
          });
          const exported = adapter.exportModel(repaired.mesh, "stl-binary");
          fs.mkdirSync(path.dirname(absOutput), { recursive: true });
          fs.writeFileSync(absOutput, exported);
          const payload = {
            source_path: absSource,
            output_path: absOutput,
            operations: repaired.operations,
            issues_before: repaired.issuesBefore,
            issues_after: repaired.issuesAfter,
          };
          if (opts.json) {
            out(`${JSON.stringify(payload, null, 2)}\n`);
          } else {
            for (const [key, value] of Object.entries(payload)) {
              out(`${key}: ${JSON.stringify(value)}\n`);
            }
          }
        } finally {
          await adapter.dispose();
        }
      } catch (e) {
        if (e instanceof RepoBoundaryError) {
          err(`${e.message}\n`);
          exitCode = EXIT_VALIDATION;
          return;
        }
        if (e instanceof EngineException) {
          const payload = {
            ok: false,
            code: e.code,
            error: e.message,
          };
          if (opts.json) {
            err(`${JSON.stringify(payload, null, 2)}\n`);
          } else {
            err(`ERROR [${e.code}]: ${e.message}\n`);
          }
          exitCode = EXIT_VALIDATION;
          return;
        }
        const message = e instanceof Error ? e.message : String(e);
        err(`${message}\n`);
        exitCode = EXIT_VALIDATION;
      }
    });

  program
    .command("bootstrap-wiki")
    .argument("<relPath>", "Relative path under docs/ (created only if missing)")
    .argument("[body]", "Markdown body", "# Stub\n")
    .description("Create a missing wiki page; never overwrites")
    .action((relPath: string, body: string) => {
      try {
        const result = bootstrapWikiPage(relPath, body, cwd);
        out(
          `${JSON.stringify({ ok: true, created: result.created, path: result.path }, null, 2)}\n`,
        );
      } catch (e) {
        if (e instanceof RepoBoundaryError) {
          err(`${e.message}\n`);
          exitCode = EXIT_VALIDATION;
          return;
        }
        const message = e instanceof Error ? e.message : String(e);
        err(`${message}\n`);
        exitCode = EXIT_VALIDATION;
      }
    });

  program
    .command("convert-a1-pdfs")
    .description("Disabled A1 PDF→MD converter (canonical OCR corpus exists)")
    .action(() => {
      const result = convertA1Pdfs();
      err(`${result.message}\n`);
      exitCode = result.exitCode;
    });

  program
    .command("convert-ebook-adoc")
    .description("Convert Guia Maker AsciiDoc chapters to Markdown")
    .action(() => {
      const result = convertEbookAdoc({ startDir: cwd });
      for (const w of result.warnings) {
        err(`WARNING: ${w}\n`);
      }
      for (const w of result.written) {
        out(`Wrote ${w}\n`);
      }
      exitCode = result.exitCode;
    });

  const args = argv.slice(2);
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    out(`${helpText()}\n`);
    return EXIT_OK;
  }

  try {
    await program.parseAsync(argv);
  } catch (e) {
    if (e instanceof RepoBoundaryError) {
      err(`${e.message}\n`);
      return EXIT_VALIDATION;
    }
    const message = e instanceof Error ? e.message : String(e);
    if (/unknown command|too many arguments|required option/i.test(message)) {
      err(`${message}\n`);
      return EXIT_USAGE;
    }
    err(`${message}\n`);
    return EXIT_USAGE;
  }

  return exitCode;
}
