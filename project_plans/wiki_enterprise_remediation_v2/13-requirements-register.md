# Requirements register — corrective wiki remediation

Date: 2026-08-16
Baseline commit: `c75213a3c20e58ddeab4601fd4918d54845846ab`

| ID | Description | Priority | Status |
|---|---|---|---|
| GOAL-WIKI-001 | Evidence-backed printer wiki, no false greens | P0 | PASS |
| SCOPE-WIKI-001 | Writes only docs/** + wiki_enterprise_remediation_v2/** | P0 | PASS |
| DATA-WIKI-001 | Reproduced baseline metrics from files | P0 | PASS |
| DATA-WIKI-002 | Derived counts match filesystem | P0 | PASS |
| DOC-WIKI-001 | Printer pages evidence-complete or honestly cataloged | P0 | PASS |
| DOC-WIKI-002 | No unit-splitting citations | P0 | PASS |
| DOC-WIKI-003 | No deceptive boilerplate | P0 | PASS |
| SOURCE-WIKI-001 | 100% sources have canonical_url | P0 | PASS |
| SOURCE-WIKI-002 | Claims + limitations non-empty | P0 | PASS |
| FRESH-WIKI-001 | Access dates recorded for corrective pass | P0 | PASS |
| PRINTER-WIKI-001 | Documented requires non-generic source | P0 | PASS |
| PRINTER-WIKI-002 | Inflated documented demoted with ledger | P0 | PASS |
| TROUBLE-WIKI-001 | Troubleshooting pages have sources | P0 | PASS |
| TROUBLE-WIKI-002 | Semantic content materialized where empty | P0 | PASS |
| SAFETY-WIKI-001 | No unsafe interlock bypass recommendations | P0 | PASS |
| TEST-WIKI-001 | Adversarial verifier PASS on corpus | P0 | PASS |
| TEST-WIKI-002 | Negative fixtures + mutation sensitivity PASS | P0 | PASS |
| EVIDENCE-WIKI-001 | Research JSONL + reports under plan dir | P0 | PASS |
| GIT-WIKI-001 | Single commit on expected parent; push target branch | P0 | PASS |
| ROLLBACK-WIKI-001 | Documented git revert procedure | P0 | PASS |
| NON-GOAL-WIKI-001 | No core/apps/packages changes | P0 | PASS |

Each requirement maps to verifier rules and/or git scope audit in `06-acceptance-matrix.md` and `07-final-validation.md`.
