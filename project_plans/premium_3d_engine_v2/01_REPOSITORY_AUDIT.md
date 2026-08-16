# 01 — Repository Audit

**Date:** 2026-08-15  
**HEAD:** `5eb6949cdd8ad0dee1ec8476f47357f17fc2b327`  
**Tracked files:** 657 (`git ls-files`)  
**Workspace (incl. untracked/gitignored working files, excl. `.git`/venv):** 745 files, ~537 MiB  
**External audit baseline `a53158f`:** confirmed as `origin/main`; local main is **one commit ahead**.

Commands and results: see `12_ACCEPTANCE_MATRIX.md` appendix and the session command log in the chat response.

---

## 1. Tree and responsibilities (top level)

| Path | Current responsibility | Desired | Status | Change risk | Tests |
|---|---|---|---|---|---|
| `core/` | CLI toolkit: wiki links, mesh inspect, 3MF zip inspect, light repair | Hexagonal core + adapters | **refactor** (keep package name) | High if rewritten; Medium if ports added beside CLI | `tests/test_*.py` (10) |
| `tests/` | 10 unit tests + tiny wiki fixtures | Pyramid + geometry corpus | **keep** + expand | Low | self |
| `playbook.md` | Agent SOP | Keep as human SOP; engine becomes executable subset | **keep** | Low | none |
| `context.md` (root) | Empty | Delete-candidate or redirect to `docs/context.md` | **migrate** | Low | none |
| `docs/context.md` | Chat F.2 summary | Keep out of product wiki retrieval | **keep** (ops) | Low | none |
| `docs/projeto/` | Active English wiki | Human wiki over canonical `knowledge/` | **migrate** content → knowledge; keep prose | Medium | `validate-wiki` |
| `docs/ebook/` | Converted CC BY-SA guide (PT bodies) | Stay isolated licensed corpus | **keep** / license boundary | High if mixed into rules | none |
| `docs/_arquivo/` | Originals (ebook git, PDFs) | Archive forever | **archive** | Do not delete | none |
| `docs/printers/` | Registry + A1 Mini OCR/QS | Capability pages cite `knowledge/printers` | **refactor** | Low | none |
| `3ds/` | original/upgraded/plan convention | Plus `3ds/runs/<run-id>/` | **keep** + extend | Medium (Windows aliases) | write-guard test |
| `project_plans/start_plan.md` | Implant plan (historical) | Preserve | **keep** | n/a | n/a |
| `project_plans/saas/` | SaaS product plan (2026-08-15) | Out of this cycle | **keep** (do not execute) | n/a | n/a |
| `project_plans/upgrade_v1_plan.md` | Was SaaS local-bridge; now this engine plan | Engine TDD plan | **migrate** | n/a | n/a |
| `core/bootstrap_wiki.py` | One-shot PT-BR generator, stale | Non-canonical; guard against re-run | **archive** / delete-candidate after ADR | High if executed | none |
| `core/convert_ebook_adoc.py` | Ebook conversion | Keep as historical tool | **keep** (ops) | Low | none |
| `core/convert_a1_pdfs.py` | **DEPRECATED stub** — prints warning, exit 2; OCR corpus already in `docs/printers/A1mini/` | Freeze like bootstrap; do not re-enable pypdf path | **archive** / keep stub | Low | none |
| `core/__init__.py` | Reexports + `__version__ = "0.1.0"` (already set) | Same; sync with `pyproject.toml` | **keep** | Low | packaging test Phase 1 |
| `knowledge/` | Missing | Canonical schemas/rules | **create** (Phase 2) | — | — |
| Root `README.md` | Missing | Honest status matrix | **create** (Phase 0) | Low | none |
| Root `LICENSE` | Missing | User decision | **blocked** | Legal | — |
| `pyproject.toml` | Missing | Packaging source of truth | **create** (Phase 1) | Medium | CI |
| `.github/workflows` | Missing | CI | **create** (Phase 1) | Low | CI |
| `AGENTS.md` / `CLAUDE.md` / `.cursorrules` | Absent | Optional later | skip | — | — |

### Tracked file types (approx., `git ls-files`)

| Ext | Count | Notes |
|---|---|---|
| `.png` | 367 | Mostly ebook |
| `.md` | 111 | Wiki + plans + ebook meta |
| `.svg` / `.jpeg` | 66 / 65 | Ebook |
| `.py` | 16 | Entire executable product |
| `.adoc` | 14 | Archived/source ebook |
| other | blend/xcf/pdf/xlsx | Archive / sources |

**Correction vs prompt (~685 files / 363 MiB):** tracked count is **657**. Working tree is larger because `3ds/` outputs and `project_plans/saas/` are local. Do not treat 363 MiB as current.

**Line-count note:** `docs/projeto` is **71** pages. Line totals differ by method (~7.6k `splitlines` vs ~5.9k PowerShell `Measure-Object -Line`). Prefer page count + “dense English leaves”; do not treat either line total as a gate.

**Post-audit corrections (subagent reconcilation 2026-08-15):** `__version__` already exists; `convert_a1_pdfs.py` is a disabled stub (exit 2), not an active converter; repair rejects `Scene` (single `Trimesh` only); CLI exposes no `--fill-holes` / `--merge-vertices` flags (Python API only).

---

## 2. Current commands

Entry: `core/__main__.py` → `core.cli.main`. Parser: `core/cli.py:58–90`.

| Command | Behavior | Exit |
|---|---|---|
| `validate-wiki <root>` | Relative MD links (`core/wiki_links.py`) | 0 if no errors, 1 if any |
| `inspect-mesh <path>` | Trimesh inspect | **always 0** on success, even non-watertight (`cli.py:42–43`) |
| `inspect-3mf <path> [--strict]` | Zip inspect | 0; 1 only with `--strict` and issues |
| `repair-mesh <src> <out>` | Light repair + export | **always 0** if export succeeds (`cli.py:52–55`) |

JSON: `--json` on stdout. `CoreError` JSON goes to **stderr** (`cli.py:100–105`) — good seed; not yet a stable error catalog.

No: `doctor`, `optimize`, `knowledge`, `run validate`, `calibration`.

---

## 3. Actual baseline results (this machine, 2026-08-15)

| Check | Result |
|---|---|
| `python --version` | **3.14.3** (prompt assumed 3.11+; floor still valid, ceiling unstated) |
| `python -m compileall core tests` | OK |
| `python -m core validate-wiki docs --json` | `{"ok": true, "errors": []}` |
| `python -m pytest tests/ -q` | **10 passed in 0.30s** |
| Installed (user env, not locked) | pytest 9.1.1, trimesh 5.0.0, numpy 2.4.4 |
| `pyproject.toml` / lock / CI / ruff / mypy | **absent** |
| Root README / LICENSE | **absent** |
| `python -m core --help` | works (argparse) |

**Correction vs external audit:** that environment lacked test deps so the suite was not run. **This environment has deps and the suite is green.** Green ≠ adequate.

---

## 4. Code hotspots (file:line)

| Issue | Evidence | Impact |
|---|---|---|
| `process=True` on inspect | `core/mesh.py:28` | Report ≠ original bytes/topology |
| Scene concatenate | `core/mesh.py:32–36` | Lost objects/instances |
| Bare `except Exception` on load | `core/mesh.py:29–30` | Adapter boundary OK-ish; still swallows types |
| Assumed millimetres | `core/models.py:32` | Silent scale risk |
| `fill_holes` default | `core/repair.py:16, 65–70` | May close intentional openings |
| Export despite remaining issues | `core/repair.py:72–81` | Dirty success |
| Repair CLI exit 0 | `core/cli.py:52–55` | Fail-open |
| No 3MF XML parse | `core/threemf.py:19–63` | Units/objects unknown |
| Path = suffix + 500 MiB | `core/paths.py:9–27` | No magic / zip bomb |
| Write guard by path parts | `core/paths.py:40–54` | Good; unused `project_root`; no symlink/hardlink tests |
| Stale bootstrap kinematics | `core/bootstrap_wiki.py:122` | “CoreXY-bed-slinger” |
| Wiki validator = links only | `core/wiki_links.py:14–51` | No ids, sources, contradictions |

Live wiki correctly states bed-slinger (`docs/projeto/hardware/a1-mini-visao-geral.md:5, 43`). Bootstrap is **not** the live source.

---

## 5. Test inventory (what is actually asserted)

| File | Tests | Protects |
|---|---|---|
| `tests/test_inspect_mesh.py` | cube faces>0; missing file; write guard on `.../3ds/original/...`; repair writes upgraded | Happy STL + guard |
| `tests/test_inspect_3mf.py` | minimal zip with `3D/3dmodel.model`; non-zip fails; missing file | ZIP smoke |
| `tests/test_validate_wiki_links.py` | fixture ok / broken / missing root | Relative links |

**Missing:** geometry corpus, magic bytes, zip bomb, XML XXE, process=False raw vs processed, scene identity, repair invariants, fill_holes classification, 3MF units, CLI stdout contract, golden reports, Hypothesis, slicer, optimize e2e.

Fixtures: `tests/fixtures/wiki_ok`, `wiki_broken` only. No licensed mesh corpus in-repo (correct: `3ds/` gitignored).

---

## 6. Missing foundations

- Reproducible environment (lockfile + documented Python range).
- Honest root README status matrix.
- Root license decision (user).
- Structured logger / run-id.
- Schema-first knowledge.
- Raw vs normalized analysis split.
- Artifact store / run bundle.
- Security budgets beyond 500 MiB.

---

## 7. Git history relevant

```
5eb6949 Add design spec for first decorative one+Piece optimization (scenario 2).
a53158f Separate 3D model plans from project plans and stop tracking local 3D assets.
a2db53a Add archived sources under docs/_arquivo (ebook fontes and A1 Mini PDFs).
f4ad74b Initial commit: hybrid 3D print optimization system (wiki, playbook, core).
```

`.gitignore` correctly ignores `3ds/original/`, `3ds/upgraded/`, `3ds/plan/*` except `_template.md` and `_exemplo-dry-run.md`. **Keep.**

---

## 8. Executable path proof (feature vs folder)

| Claim | Executable path | Test |
|---|---|---|
| Wiki links valid | `python -m core validate-wiki docs` | `test_validate_wiki_links.py` + live run OK |
| Mesh inspect | `python -m core inspect-mesh` | cube test; **not** raw |
| 3MF inspect | `python -m core inspect-3mf` | zip test; **not** Core XML |
| Repair + write guard | `repair_mesh` | `test_repair_refuses_original_tree` |
| Multi-printer engine | folders `docs/printers/`, `docs/projeto/profiles/` | **no code path** |
| Optimize | playbook human steps | **no command** |
| Knowledge compiler | — | **does not exist** |
