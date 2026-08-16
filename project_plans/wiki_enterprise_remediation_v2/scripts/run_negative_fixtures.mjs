/**
 * Runs the adversarial verifier against each negative fixture directory.
 * Expects FAILURE (non-zero) for every case — antifalse-green harness.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { verifyDocs } from "./verify_wiki_enterprise_remediation.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES = path.join(__dirname, "fixtures");

const EXPECTED_RULE_HINT = {
  "dup-ids": "UNIQUE_IDS",
  "unresolved-source": "SOURCE_RESOLVE",
  "broken-internal-link": "INTERNAL_MD_LINKS",
  "bad-front-matter": "FRONT_MATTER_PARSE",
  "empty-corpus": "COUNTS_DERIVED",
  "source-no-canonical-url": "SOURCE_CANONICAL_URL",
  "source-empty-claims-limitations": "SOURCE_CLAIMS_LIMITATIONS",
  "printer-generic-only-documented": "DOCUMENTED_NON_GENERIC_SOURCE",
  "unit-splitting-citation": "UNIT_SPLITTING",
  "see-body-phrase": "FORBIDDEN_SEE_BODY",
  "carried-from-prior-phrase": "FORBIDDEN_CARRIED",
  "heuristica-editorial": "FORBIDDEN_HEURISTICA",
  "troubleshooting-empty-sources": "TROUBLESHOOTING_SOURCES",
  "dup-printer-paragraphs": "DUP_PRINTER_PARAGRAPH",
};

function main() {
  const dirs = fs
    .readdirSync(FIXTURES, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  let failedAsExpected = 0;
  let unexpectedPass = 0;
  let missingHint = 0;

  for (const name of dirs) {
    const docsRoot = path.join(FIXTURES, name);
    const result = verifyDocs(docsRoot, { includeExcludedDirs: true });
    const hint = EXPECTED_RULE_HINT[name];
    const hasHint = hint ? Boolean(result.byRule[hint]) : true;

    if (!result.ok && hasHint) {
      failedAsExpected += 1;
      console.log(`OK-FAIL  ${name}  violations=${result.totals.violation_total}  rules=${JSON.stringify(result.byRule)}`);
    } else if (result.ok) {
      unexpectedPass += 1;
      console.error(`UNEXPECTED-PASS  ${name}  (verifier returned green)`);
    } else {
      missingHint += 1;
      console.error(
        `WRONG-RULE  ${name}  expected~${hint}  got=${JSON.stringify(result.byRule)}`
      );
    }
  }

  console.log("");
  console.log(
    JSON.stringify(
      {
        fixture_dirs: dirs.length,
        failed_as_expected: failedAsExpected,
        unexpected_pass: unexpectedPass,
        wrong_or_missing_rule: missingHint,
      },
      null,
      2
    )
  );

  if (unexpectedPass > 0 || missingHint > 0 || failedAsExpected !== dirs.length) {
    process.exitCode = 1;
  } else {
    process.exitCode = 0;
  }
}

main();
