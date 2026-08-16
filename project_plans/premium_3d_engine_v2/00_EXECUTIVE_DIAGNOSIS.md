# 00 — Executive Diagnosis

**Date:** 2026-08-15  
**Mode:** DISCOVERY_AND_PLAN_ONLY  
**HEAD verified:** `5eb6949` (`main`, 1 commit ahead of `origin/main` @ `a53158f`)  
**Product name (working):** Premium 3D Print Engineering Engine (local, CLI-first, offline-first)

---

## What exists

A **hybrid personal toolkit** (locked in `project_plans/start_plan.md` as system **C** + optimization **B**):

- Human wiki under `docs/projeto/` (71 Markdown pages, 7,681 lines, English, relative links **green**).
- Operational SOP in `playbook.md` (English; per-model plans in PT-BR).
- Python package `core/` (`python -m core`) with four commands: `validate-wiki`, `inspect-mesh`, `inspect-3mf`, `repair-mesh`.
- Immutable-input convention `3ds/original/` (gitignored) + write guard in `core/paths.py`.
- Archived CC BY-SA 4.0 ebook (`docs/ebook/` active MD + `docs/_arquivo/ebook/` originals) and A1 Mini OCR/quick-starts (`docs/printers/A1mini/`).
- Historical plans that **must be preserved**: `project_plans/start_plan.md`, `docs/projeto/IMPLANTACAO-FASES.md`, `project_plans/saas/` (out of this cycle).
- Approved **operational** spec (not the engine program): `docs/superpowers/specs/2026-08-15-one-piece-decorative-optimization-design.md` — first real job `one+Piece.3mf`, purpose decorative, scenario 2, system C / optimize B, **no new `core/` code**. See `10_DECISION_LOG.md` (D-JOB-ONEPIECE).
- Package already exposes `__version__ = "0.1.0"` in `core/__init__.py` (no packaging metadata file yet).

It is **not** yet an engineering engine. There is no knowledge compiler, no capability matrix as data, no orientation optimizer, no slicer adapter, no run bundle, no deterministic `plan.md` generator.

## What is valuable

| Asset | Why keep |
|---|---|
| `assert_not_original_tree` + repair test | Correct product invariant |
| Domain models in `core/models.py` without trimesh import | Seed of ports/adapters |
| Typed `CoreError` codes | Seed of fail-closed CLI |
| Wiki navigation + `validate-wiki` | Human memory that works offline |
| Purpose/geometry/profile taxonomy in prose | Content to *canonicalize*, not rewrite from scratch |
| A1 Mini facts (180³ mm, bed-slinger, DD, 0.4 mm, 300 °C / 80 °C) | Match official tech-specs / FAQ |
| Honest “validate on printer” culture | Better than fake precision — still not provenance |
| Basename rule in playbook | Windows-safe output identity |

## What is unsafe or incomplete

- **Inspection mutates-then-measures:** `trimesh.load(..., force="mesh", process=True)` (`core/mesh.py:28`). Report is not raw.
- **Units invented:** `MeshReport.units_assumed = "mm"` (`core/models.py:32`) with no STL unit channel.
- **Scenes flattened:** concatenate geometries (`core/mesh.py:32–36`) — identity/transforms/materials lost without warning.
- **Repair is not a transaction:** `fill_holes` default True; export even if still non-watertight; CLI always exit 0 (`core/cli.py:52–55`, `core/repair.py:78–81`).
- **3MF is ZIP theater:** CRC + `.model` presence; no Core Model XML, units, objects, build items, extensions (`core/threemf.py`).
- **Intake is extension+size only:** 500 MiB cap; no magic bytes; no ZIP-bomb/XML/entity limits.
- **No packaging truth:** no root README, no root LICENSE, no `pyproject.toml`, no lockfile, no CI, no lint/type-check config.
- **`core/bootstrap_wiki.py` is stale:** still emits PT-BR and the contradiction “CoreXY-bed-slinger” (`core/bootstrap_wiki.py:122`). Live wiki is English and correctly says bed-slinger. Bootstrap must not be re-run as canonical.
- **Knowledge is duplicated prose:** ranges live in many pages; `docs/projeto/profiles/INDEX.md` is a folder registry, not a capability engine.
- **Tests are a happy cube:** 10 tests, no hostile fixtures, no property tests, no golden 3MF/slicer.
- **SaaS docs exist locally** (`project_plans/saas/`). This cycle **must not implement or expand them**.

## Target product promise

A **local, deterministic, explainable** engine that, given a model and a small intent:

1. Inspects **raw** then **normalized** facts without mutating the original.
2. Resolves printer × nozzle × plate × material **capabilities** from versioned data.
3. Applies versioned rules (fail closed on conflict).
4. Evaluates orientation/process **candidates** with documented proxies, then Pareto — not a magic score.
5. Applies only authorized operation classes (A–D), with transactions and inverses.
6. Emits a **run bundle** (`manifest.json`, analysis, decision, localized `plan.md`) that is reproducible from hashes + versions.
7. Optionally talks to a slicer **executable** for time/material — never by reimplementing a slicer.
8. Treats AI as an **optional explanation/classification port**, default off, never a decision authority.

The promise is **risk reduction with explicit uncertainty**, not “will not fail” and never an uncalibrated “87% success”.

## Why deterministic-first

Print physics, filament lots, plate contamination, humidity, firmware, and drafts are not in the file. An LLM cannot close that gap; it can only hide it. Deterministic artifacts are the only thing that can be hashed, diffed, tested, and rolled back. AI may rewrite language after the decision exists.

## Recommended path

**No big-bang rewrite.** Vertical slice on **Bambu Lab A1 Mini + 0.4 mm + PLA/PETG + Bambu Studio as external CLI**, while the **schemas and ports** already admit a second printer/slicer as data.

Order: truth baseline → packaging/types/CI → knowledge compiler (tiny A1 Mini slice) → raw/normalized analyzer → capability matrix → orientation Pareto → repair transactions → slicer adapter → run bundle → wiki retrieval → calibration → optional AI → second printer proof.

Python remains the geometry core. JSON contracts stay stable for a future TypeScript UI. Do not port mesh math to TypeScript in this program.

## Explicit non-goals (this program)

SaaS, auth, billing, marketplace, remote printer control, full slicer, general CAD, chatbot-as-engine, structural/medical/food certification, choosing a root license for the user, deleting the CC BY-SA ebook, copying vendor profiles into git without license audit, AGPL in-process linking, Bambu networking plugin.

---

**Status:** diagnosis complete. Implementation gated on `APPROVED: IMPLEMENT PHASE <N>`.
