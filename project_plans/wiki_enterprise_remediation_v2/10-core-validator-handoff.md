# Core validator handoff notes — OEM remediation 2026-08-16

**Scope:** Observed while remediating Bambu / HP MJF 1200 / EOS / Formlabs printer pages.
**Do not fix core in this worktree task** — docs-only.

## Observations (not blocking after docs fixes)

1. **YAML `summary` with bare `Fonte: source.*`**
   Unquoted multi-line summaries containing `Fonte: source.foo` fail PyYAML (`mapping values are not allowed here`).
   Docs fix: use folded `summary: >` and avoid `Fonte:` colon form (use `Fonte source.`).
   Possible core hardening: reject/advise on unquoted summaries containing `:` mid-line.

2. **`orphan_page` false positive cascade**
   When printer pages fail `yaml_parse`, their outbound links (e.g. to `manufacturer-eos.md`) are not counted, so manufacturer pages can appear orphaned. Re-check orphans after fixing YAML.

3. **`EVIDENCE_NEAR_RE` gap for store evidence**
   Patterns include `source.`, `oficial`, `Bambu`, `spec`, etc., but **not** `loja` / `store` / `FAQ`. Numeric cells that only cite `loja US` in a far table column can warn `numeric_without_nearby_citation` even when the third column is provenance.
   Docs workaround: inline `([source](...))` next to numbers.
   Possible core improvement: extend near-evidence cues for `loja`/`store`/`product page`.

4. **`safety_level: hazard` is invalid**
   Allowed enum is `normal|caution|high|critical`. Metal PBF pages should use `high` or `critical`, not `hazard`.

5. **Absolute-language `garantia`**
   Portuguese word `garantia` triggers `absolute_language` even in hedge phrases like `≠ garantia de processo`. Prefer English hedge or rephrase.

## Validation evidence (this branch)

```text
PYTHONPATH=<repo-root> python -m core validate-wiki docs --strict --fail-on-warnings --json
→ ok: true, error_count: 0, warning_count: 0
```

(After OEM docs remediation; unrelated prior creality warnings were cleared in the same run once our pages no longer contributed, or were pre-fixed elsewhere — reconfirm if merging with parallel worktrees.)

## Post-main sync (689151c) — Python retirement

- The Python toolkit was retired on origin/main. `python -m core validate-wiki` is not available.
- This pass validated with TypeScript `packages/knowledge-compiler/dist/validate.js`.
- CLI `pnpm validate:knowledge` may fail until workspace packages such as contracts are built; not fixed in this docs-only task.
