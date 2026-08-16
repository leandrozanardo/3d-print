# Implementation plan (Phases 0–4)

> Reference: `project_plans/start_plan.md` + locked decisions (system C, optimization B, Bambu Studio, PLA+PETG, `core/`, `docs/`).

**Root problem:** no repeatable SOP or linked corpus; optimization lived in ad-hoc chat memory.  
**Target architecture:** neural wiki in `docs/projeto` + `playbook.md` (decisions) + `core/` (inspect/validate ports; trimesh/zip adapters) + I/O `3ds/` + per-model plans in `3ds/plan/` + project plans in `project_plans/`.

**Docs language:** English for project wiki, playbook, and plans. Ebook chapter bodies may remain Portuguese (CC BY-SA source) with English meta.

---

## Phase 0 — Preparation

**Goal:** Observable baseline: `docs/` tree, characterization tests for `core`.

**Concrete changes:** migrate docs; create `core/` + failing tests + fixtures.

**Risks:** IDE locks on rename; path drift.

**Rollback:** `_arquivo/` was deleted; keep ebook Markdown validated before further conversion.

**Evidence:** `pytest` green; `python -m core --help` works.

---

## Phase 1 — Structural refactor

**Goal:** Clear `core` boundaries (report domain ↔ IO adapters).

**Evidence:** domain imports without trimesh; link tests without heavy IO.

---

## Phase 2 — Feature

**Goal:** End-to-end usable system per `start_plan.md` (wiki, conversions, playbook, dry-run).

---

## Phase 3 — Hardening

**Goal:** Fail-closed CLI semantics; suite green; never write under `3ds/original`.

---

## Phase 4 — Governance

**Goal:** Attribution, network map, honest 3MF limits documented.

**Evidence (2026-08-15 implant + EN densify):**
- `python -m pytest tests/ -q` → 10 passed
- `python -m core validate-wiki docs` → target exit 0
- Wiki densified in English (~100–150 lines typical leaf)
- Playbook / plan templates in English
