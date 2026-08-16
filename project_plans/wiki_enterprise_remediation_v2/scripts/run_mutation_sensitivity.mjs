/**
 * Mutation sensitivity: copy a tiny docs snippet, inject a forbidden phrase,
 * expect verifier FAILURE, then restore (delete temp tree).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { verifyDocs } from "./verify_wiki_enterprise_remediation.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function writeFile(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
}

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function main() {
  // Stay inside the worktree scripts folder (repo boundary).
  const tmpRoot = path.join(__dirname, ".mutation-tmp");
  rmrf(tmpRoot);
  const docsRoot = path.join(tmpRoot, "docs");

  try {
    writeFile(
      path.join(docsRoot, "note.md"),
      `---
id: mutation.clean-page
title: Clean mutation seed
doc_type: note
sources: []
---
# Clean

A short clean page used as mutation seed.
`
    );

    const clean = verifyDocs(docsRoot);
    if (!clean.ok) {
      console.error("Seed page unexpectedly failed before mutation:");
      console.error(JSON.stringify(clean.byRule, null, 2));
      process.exitCode = 1;
      return;
    }

    const target = path.join(docsRoot, "note.md");
    const original = fs.readFileSync(target, "utf8");
    const mutated = `${original.trimEnd()}\n\nInjected: see body placeholder.\n`;
    fs.writeFileSync(target, mutated, "utf8");

    const after = verifyDocs(docsRoot);
    if (after.ok) {
      console.error("MUTATION-MISS: verifier stayed green after injecting 'see body'");
      process.exitCode = 1;
      return;
    }
    if (!after.byRule.FORBIDDEN_SEE_BODY) {
      console.error("MUTATION-WRONG-RULE:", after.byRule);
      process.exitCode = 1;
      return;
    }

    // Restore
    fs.writeFileSync(target, original, "utf8");
    const restored = verifyDocs(docsRoot);
    if (!restored.ok) {
      console.error("RESTORE-FAIL: cleaned file still failing", restored.byRule);
      process.exitCode = 1;
      return;
    }

    console.log(
      JSON.stringify(
        {
          ok: true,
          mutation: "injected see body",
          failed_as_expected: true,
          rule: "FORBIDDEN_SEE_BODY",
          violations_on_mutation: after.totals.violation_total,
          restored_pass: true,
        },
        null,
        2
      )
    );
    process.exitCode = 0;
  } finally {
    rmrf(tmpRoot);
  }
}

main();
