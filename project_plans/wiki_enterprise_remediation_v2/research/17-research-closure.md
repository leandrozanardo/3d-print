# Research closure — corrective pass (post d9ac57d integrity fix)

Generated: 2026-08-16T07:40:08.406Z (UTC)
Worktree: `.tmp/wiki-enterprise-final-c75213a`

## Universe closed in this execution

| Population | Count | Method |
|---|---:|---|
| Canonical printers (`doc_type: printer`) | 354 | filesystem under `docs/21-impressoras` |
| Source pages with `canonical_url` | 131 | `docs/22-fontes` |
| Unique `https` URLs probed | 130 | parallel HEAD/GET, concurrency 16, 8s timeout |
| Ledger rows (printer × source) | 411 | `research/url-ledger.jsonl` |
| Fake / placeholder ledger URLs | 0 | verifier rule `RESEARCH_LEDGER` |

## Coverage honesty

| coverage_level | count |
|---|---:|
| documented | 43 |
| cataloged | 310 |
| troubleshooting-mapped | 1 |

`documented` requires non-generic model-linked sources (adversarial verifier). Listing-only SKUs remain `cataloged` with pinned manufacturer listing URLs.

## HTTP probe summary (unique URLs)

| http_status | count |
|---|---:|
| 200 | 100 |
| 403 | 3 |
| 429 | 18 |
| 500 | 1 |
| null (network/abort) | 8 |

Access status on ledger rows: `FOUND_AND_CHECKED` 297 · `ACCESS_BLOCKED_WITH_EVIDENCE` 114 (includes rate-limits and soft blocks; no CAPTCHA bypass attempted).

## Explicit non-claims

- This pass does **not** invent `NOT_PUBLISHED_AFTER_EXHAUSTIVE_SEARCH` without a real per-SKU search transcript.
- Prior corrective ledger rows that used `see-official-products-page` placeholders were **replaced** by this probe-backed ledger.
- Expanding every cataloged SKU to P1 model-specific pages remains an open editorial backlog, tracked as `cataloged` (not status inflation).

## Commands

```bash
LEDGER_PROBE=1 LEDGER_CONCURRENCY=16 node project_plans/wiki_enterprise_remediation_v2/scripts/_rebuild_url_ledger.mjs
node project_plans/wiki_enterprise_remediation_v2/scripts/verify_wiki_enterprise_remediation.mjs
```
