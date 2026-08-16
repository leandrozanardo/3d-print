# 10 — Decision Log

**Date:** 2026-08-15  
**Legend:** `decided` (this repo already locked) · `proposed` (engine program, needs user ack) · `blocked` (needs user)

---

## Decided (pre-existing — preserve)

| ID | Decision | Evidence | Do not |
|---|---|---|---|
| D-SYS | System C hybrid (wiki+playbook; light core) | `start_plan.md` locked table | Delete SOP until engine replaces it |
| D-OPT-B | Optimization mode B (recipe + light mesh) | same | Silent class D |
| D-SLICER-A | Bambu Studio as operator slicer | playbook | Pretend Orca is primary |
| D-HW | Active printer A1 Mini 0.4 mm | playbook, wiki | Fake multi-printer support |
| D-MAT | PLA primary, PETG documented | start_plan, profiles | Treat ABS as day-1 apply |
| D-IO | `3ds/original` immutable; upgraded + plan | playbook, `paths.py` | Write original |
| D-LANG-CODE | Code/comments English | start_plan | PT identifiers |
| D-LANG-PLAN | Operator plans PT-BR | playbook.md:16 | Force English-only plans |
| D-EBOOK | CC BY-SA isolated | `docs/ebook/LICENSE` | Mix into trusted rules blindly |
| D-NO-SAAS-IMPL | This cycle must not implement SaaS | user prompt §2 | Execute `project_plans/saas/` |
| D-JOB-ONEPIECE | First real job: `one+Piece.3mf`, purpose decorative, PLA mono, profile `pla-decorativo-superficie-0.4`, scenario 2, artifact = 3MF **binary copy** + `3ds/plan/one+Piece.md`, no proprietary config rewrite, no new `core/` in subproject A | `docs/superpowers/specs/2026-08-15-one-piece-decorative-optimization-design.md` (approved) | Treat A as an engine phase; commit the model; rewrite `Metadata/*.config` |
| D-JOB-SEQUENCE | Subproject A (SOP job) and engine Phase 0 run **in parallel**; neither blocks the other | user 2026-08-15 | Stall A on Phase 12 or stall Phase 0 on A |
| D-SCENARIO2 | Scenario 2 is not a hidden scalar. Decorative constraints + **always show gain/loss**; tie-break `balanced`; scenario 3 = optional quality candidate | user 2026-08-15 | Map 2 → `economy` only |
| D-SUBPROJECT-B | Absorb spec follow-on B into engine Phase 3+8 | user 2026-08-15 | Parallel mini-track on `threemf.py` |

---

## Proposed (engine program — recommend accept)

| ID | Proposal | Alternatives | Evidence | Consequences |
|---|---|---|---|---|
| P-ARCH | Hexagonal Python core, JSON contracts, no TS geometry port | A1 patch scripts; A2 monolith optimize.py | audit hotspots; user prompt | Slower; extensible |
| P-PKG | `pyproject.toml` + **uv lock** | pip-tools; poetry | no lock today; Win+3.14 | Need uv installed |
| P-DSL | JSON Logic allowlist | CEL; custom AST | security; testability | Less expressive |
| P-3MF | Inspect with hardened XML first; lib3mf for write after golden | lib3mf now; forever custom | lib3mf BSD; Bambu unknowns | Two-step |
| P-SLICER | External Bambu Studio CLI subprocess; no networking plugin; no vendored profiles | Orca CLI; settings-file only forever | CLI wiki 2026-03-31; AGPL/SFC 2026-05 | User must install Studio |
| P-AI | Port + Null; default off | no port until Phase 11 | prompt §22 | Small interface now |
| P-RUN | Canonical `3ds/runs/<id>` + aliases | replace 3ds/plan immediately | Windows habits | Dual write |
| P-PY | `requires-python >=3.11`; CI 3.11/3.12; 3.14 tested locally | pin 3.11 only | local 3.14.3 green tests | 3.14 not in first CI matrix |
| P-NOZZLE-CF | Hard-block CF/GF on stainless stock nozzle | warning-only | Bambu FAQ + filament guide | Safer apply |
| P-ABS | Apply blocked on A1 Mini for ABS/ASA/PC/PA; inspect warns | allow with “risk plan” | tech-specs Not Recommended | Matches vendor |

---

## Blocked (user must answer)

| ID | Question | Options | Recommendation | Impact |
|---|---|---|---|---|
| B-LIC | Root license | Keep none; MIT; Apache-2.0 | **Keep none** until distribution intent is clear | Publishing + dependency mixing |
| B-DIST | Personal-only vs redistribute | Personal; public GitHub already | Treat GitHub as **public source**; still don’t pick license for user | AGPL subprocess vs bundling |
| B-STUDIO | Install Bambu Studio CLI locally for Phase 7 | Yes path; delay Phase 7; settings-only forever | **Yes**, record absolute path in local config (gitignored) | Unlocks time/mass |
| B-LIB3MF | Native wheel OK? | Yes; delay | Delay write-path until Phase 7 eval | Windows 3.14 wheel risk |
| B-DESTRUCTIVE | Default allowed classes | A+B only; A+B+C | **A+B**; C via `--apply-safe` | Matches prompt |
| B-PRIVATE-FX | Include sanitized `one+Piece` in golden tests | No (gitignored); yes private CI | **No** in public repo | Golden 3MF uses generated cube |

---

## Explicitly not decided here

- SaaS pricing, CNPJ, brand, WTP (`project_plans/saas/`).  
- Second printer model.  
- LLM vendor.

---

## Assumptions register (defaults if user silent)

| A | Assumption |
|---|---|
| A1 | Locale default `pt-BR` |
| A2 | Tie-break default `balanced`; reports must still show gain/loss vs alternatives (B-SCENARIO2-PRESET) |
| A3 | Material default generic PLA experimental |
| A4 | No network in tests |
| A5 | Do not commit lockfile binaries of Studio |
| A6 | `upgrade_v1_plan.md` now means **this engine**, not SaaS concierge |
| A7 | Subproject C may edit troubleshooting **prose** after a print; it must not auto-set `status: verified` on rules (Phase 10) |
| A8 | Job A uses current wiki as recipe source; engine later tags those numbers `experimental` + `src.legacy.wiki.*` — dual regime, not a silent overwrite |
