/**
 * Differential parity helpers — compare Node wiki validation to frozen golden JSON.
 */
import * as fs from "node:fs";
import * as path from "node:path";

import { validateWiki } from "./validate";

export type DiffEntry = {
  fixture: string;
  ok: boolean;
  missingCodes: string[];
  unexpectedFail: boolean;
};

export function runWikiFixtureParity(
  repoRoot: string,
  today = new Date(Date.UTC(2026, 7, 16)),
): DiffEntry[] {
  const fixturesRoot = path.join(repoRoot, "tests", "fixtures");
  const cases = [
    { name: "wiki_strict_ok", expectOk: true, requiredCodes: [] as string[] },
    {
      name: "wiki_strict_broken",
      expectOk: false,
      requiredCodes: [
        "duplicate_id",
        "unresolved_id",
        "prereq_cycle",
        "missing_front_matter",
        "invalid_promotion",
        "absolute_claim",
      ],
    },
  ];
  const out: DiffEntry[] = [];
  for (const c of cases) {
    const result = validateWiki(path.join(fixturesRoot, c.name), {
      strict: true,
      today,
    });
    const blob = [...result.errors, ...result.warnings].join("\n");
    const missingCodes = c.requiredCodes.filter((code) => !blob.includes(code));
    const unexpectedFail = c.expectOk ? !result.ok : result.ok;
    out.push({
      fixture: c.name,
      ok: missingCodes.length === 0 && !unexpectedFail,
      missingCodes,
      unexpectedFail,
    });
  }
  return out;
}

export function writeParityReport(
  repoRoot: string,
  reportPath: string,
): { ok: boolean; entries: DiffEntry[] } {
  const entries = runWikiFixtureParity(repoRoot);
  const ok = entries.every((e) => e.ok);
  const abs = path.isAbsolute(reportPath) ? reportPath : path.join(repoRoot, reportPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(
    abs,
    JSON.stringify(
      {
        schemaVersion: 1,
        ok,
        generatedAt: new Date().toISOString(),
        entries,
      },
      null,
      2,
    ),
  );
  return { ok, entries };
}
