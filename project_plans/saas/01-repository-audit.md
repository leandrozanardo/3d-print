# 01 — Repository audit

**Access / snapshot:** 2026-08-15  
**Repo:** https://github.com/leandrozanardo/3d-print  
**Related:** [07-technical-architecture.md](07-technical-architecture.md) · [10-security-privacy-legal.md](10-security-privacy-legal.md)

---

## Ground-truth confirmation

| Preliminary claim | Verdict | Evidence |
|---|---|---|
| Local documentation-first hybrid optimizer, not a web app | **FACT — confirmed** | `playbook.md`, `docs/projeto/`, no `apps/`, no package.json app root |
| Differentiator = decision workflow + plan | **FACT — confirmed** | Pipeline steps 1–10 in `playbook.md`; `3ds/plan/_template.md` |
| `core/` CLI: wiki validate, mesh inspect, 3MF inspect, light repair | **FACT — confirmed** | `core/cli.py`, `core/README.md` |
| Knowledge focused A1 Mini / 0.4 / Studio / PLA first / PETG | **FACT — confirmed** | `playbook.md`, `docs/printers/INDEX.md`, `docs/projeto/perfis-a1-mini/` |
| No auth, tenants, billing, DB, object storage, queue, web UI, metering, SaaS security | **FACT — confirmed** | Tree: `core/`, `docs/`, `3ds/`, `tests/`, `project_plans/` only |
| Markdown profiles ≠ machine-readable ruleset | **FACT — confirmed** | Profiles are `.md` under `perfis-a1-mini/` |
| 3MF = container inspect, not settings mutation | **FACT — confirmed** | `core/threemf.py` docstring + zipfile CRC/list only |
| CC BY-SA + OEM docs → commercial audit needed | **FACT — confirmed** | `docs/ebook/README.md` CC BY-SA 4.0; `docs/projeto/fontes-e-atribuicao.md`; **no root LICENSE** (`LICENSE` absent) |

---

## Tree & counts (local inspection 2026-08-15)

| Area | Count / note |
|---|---|
| `docs/projeto/**/*.md` | **71** |
| `core/*.py` | **13** modules |
| `tests/*.py` | **3** files (inspect mesh/3mf, wiki links) |
| Root LICENSE | **Absent** |
| Tracked sample mesh | `_sample_cube.stl` pattern; `3ds/original/` gitignored |
| Archived sources | `docs/_arquivo/` (ebook + printer PDFs) |
| Nested git risk | `.gitignore` excludes `docs/_arquivo/ebook/.git_ebook_backup/` |

---

## `core/` capability map

| Module | Role | SaaS reuse | Risk |
|---|---|---|---|
| `models.py` | Domain reports (no trimesh) | **High** — keep pure | Low |
| `errors.py` | Typed errors | High | Low |
| `paths.py` | Suffix allowlist, 500 MiB cap, no-write `3ds/original` | Medium — rewrite for object keys + plan quotas | Extension-only validation (no magic bytes) |
| `mesh.py` | Trimesh ACL inspect | High as worker adapter | Scene concat; CPU bombs; scipy optional paths |
| `repair.py` | Light repair | Medium — need before/after invariants | Topology change without geometric diff |
| `threemf.py` | ZIP list/CRC | Medium — add ZIP bomb limits | Member extract not done (good); no geometry parse |
| `wiki_links.py` | Link checker | Low for SaaS product; keep for docs CI | — |
| `cli.py` | Composition root | Keep as debug CLI | — |
| `convert_*` | One-shot converters | Archive; not runtime | Stub PDF converter exit 2 |

---

## Reuse matrix

| Existing asset | Maturity | SaaS reuse | Required refactor | Risk | Decision |
|---|---|---|---|---|---|
| Playbook pipeline | High (process) | Product SOP / onboarding | Encode as job stages | Low | **Reuse as product spine** |
| Wiki `docs/projeto` | High density, EN | Retrieval corpus + human help | Isolate CC BY-SA; extract proprietary rules | License | **Split trusted rules vs attributed corpus** |
| Named A1 Mini profiles | Medium (MD) | Seed for ruleset v1 | JSON/YAML schema + version | Drift | **Convert top 6–7 profiles first** |
| `inspect-mesh` | Medium | Worker v0 facts | Magic bytes, timeouts, multi-body policy | DoS | **Reuse behind sandbox** |
| `repair-mesh` | Low–medium | Optional paid feature | Invariants, eligibility gate | Bad mesh | **Later than report MVP** |
| `inspect-3mf` | Low | Upload gate only | Geometry extract separate epic | Complexity | **STL-first MVP; 3MF geometry Next** |
| Plan template | High | Report UX skeleton | JSON report contract | Low | **Reuse structure** |
| Ebook CC BY-SA | High content | Help center with attribution OR exclude from commercial closed rules | ShareAlike derivatives | Legal | **Do not mix into proprietary rules without counsel** |
| OEM A1 Mini MD/OCR | Medium | Link-out / paraphrased | Permission audit | Copyright | **Counsel before republishing commercially** |
| Pytest suite (10 tests historically) | Low coverage for SaaS | Seed | Fuzz, property, security tests | Gaps | **Expand before public upload** |

---

## Gap matrix

| Capability | Exists | Prod-ready | Missing work | MVP relevance | Effort |
|---|---|---|---|---|---|
| Mesh facts (faces, watertight, bounds) | Yes | No | Sandbox, metrics, magic bytes | **Now** | S–M |
| Overhang / orientation search | Docs only | No | Algorithms in worker | **Now** (proxy OK) | M–L |
| Rules engine | No (MD) | No | Schema, conflict resolution | **Now** | M |
| LLM explanation layer | No | No | Structured I/O, reject unknown settings | Pro tier | M |
| Auth / tenants | No | No | Supabase Auth + RLS | Before paid | M |
| Object storage uploads | No | No | Presigned R2/S3 | Before paid | M |
| Job queue | No | No | Worker + state machine | Before paid | M |
| Billing BR (Pix/card) | No | No | Stripe Billing + Pix | Before scale | M |
| 3D viewer heatmaps | No | No | three.js / react-three-fiber | Strong MVP | M–L |
| Headless slice | No | No | Licensing (AGPL) | **Never-for-now** | — |
| Bambu cloud | No | No | Legal/partner | **Never-for-now** | — |
| Outcome learning | Template mention | No | Opt-in schema | Phase 3 | M |
| Multi-printer gold | Registry only | No | Content + validation | After demand | L |

---

## Technical weaknesses (must address before public upload)

1. **Extension-based validation** (`paths.py`) vs content/magic validation.  
2. **500 MiB local cap** too high for free SaaS abuse — plan-tier limits required.  
3. **3MF ZIP bomb** — need member count, uncompressed size, ratio limits (`threemf.py` lists members but no bomb policy).  
4. **Pathological meshes** — no triangle budget / wall-clock in inspect.  
5. **trimesh Scene** concatenation may hide multi-body issues.  
6. **Repair** may change topology without geometric comparison.  
7. **No 3MF geometry parse.**  
8. **No deterministic rule schema.**  
9. **Insufficient security/fuzz tests.**  
10. **Local path assumptions** ≠ tenant object keys.

---

## Maintenance burden

| Burden | Note |
|---|---|
| Wiki link graph | Mitigated by `validate-wiki` |
| Dual language (ebook PT / wiki EN) | Operational OK; SaaS UI should be PT-BR first |
| Archived binaries | Keep out of product runtime |
| Profile drift vs Bambu Studio versions | Version pins + “validate on printer” |

---

## Audit conclusion

**DECISION:** Treat the repository as a **strong Phase 0/1 asset** (workflow + domain knowledge + starter geometry CLI), not a SaaS codebase. Commercialization requires: content isolation, ruleset extraction, sandboxed workers, and product shell — in that order of risk.
