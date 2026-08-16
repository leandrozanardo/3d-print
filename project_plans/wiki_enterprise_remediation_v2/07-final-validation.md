# Final validation — corrective pass

Date: 2026-08-16
Worktree: `.tmp/wiki-enterprise-final-c75213a`
Expected parent: `c75213a3c20e58ddeab4601fd4918d54845846ab`
Published commit (first): `d9ac57dbeb1562ae229e3f53b48fc77f83068d73`
Integrity follow-up: real URL ledger + probe (this file updated after probe).

## Adversarial verifier

```bash
node project_plans/wiki_enterprise_remediation_v2/scripts/verify_wiki_enterprise_remediation.mjs
node project_plans/wiki_enterprise_remediation_v2/scripts/run_negative_fixtures.mjs
node project_plans/wiki_enterprise_remediation_v2/scripts/run_mutation_sensitivity.mjs
```

| Gate | Result |
|---|---|
| corpus verify | PASS (0 violations) after ledger rebuild |
| negative fixtures | 14/14 failed as expected |
| mutation sensitivity | PASS |
| RESEARCH_LEDGER | rejects non-http / placeholder URLs |

## Derived counts (verifier)

- canonical pages: 742
- printers: 354
- documented: 43 (strict non-generic source)
- cataloged: 310
- sources: 131
- troubleshooting pages: 21
- ledger rows: 411 (0 placeholder URLs)

## Project validators (remote clean checkout of d9ac57d)

Directory: `.tmp/wiki-remote-clean-d9ac57d`

| Command | Exit |
|---|---:|
| `pnpm@10.12.1 install --frozen-lockfile` | 0 |
| `pnpm build:packages` | 0 |
| `node apps/cli/dist/bin.js validate-wiki docs --strict --json` | 0 |
| `pnpm --filter @fix-my-print/knowledge-compiler test` | 0 |
| `pnpm lint` | 0 |
| `pnpm typecheck` | 0 |
| `pnpm test` (local jest junction for geometry-manifold path) | 0 |
| `pnpm build` | 0 |
| adversarial verifier + fixtures + mutation | 0 |
| `git diff --check` | 0 |

Note: root script `pnpm validate:knowledge` uses `../../docs` via filter cwd and can raise `REPO_BOUNDARY_VIOLATION` from nested worktrees; equivalent CLI invocation from worktree root passes.

## Research probe

See `research/17-research-closure.md` and `research/surface-matrix-summary.json`.
