# 09 — Phased Backlog

**Date:** 2026-08-15  
**Rule:** implement only the approved phase. Do not batch phases. TDD. Commits only if the user asks.

Complexity: S/M/L/XL — no hours.

**Operational job (not an engine phase):** approved spec `docs/superpowers/specs/2026-08-15-one-piece-decorative-optimization-design.md` is **subproject A** — SOP proof on `one+Piece.3mf` with **zero new `core/` code**. Runs **in parallel** with engine Phase 0 (D-JOB-SEQUENCE). Do not fold A into Phase 0–12.

| Spec follow-on | Engine absorption (proposed) |
|---|---|
| Subproject B — 3MF mesh metrics + plan scaffold | Phase 3 (XML inspect) + Phase 8 (templates). Do not start a parallel “core enrichment” track. |
| Subproject C — post-print → wiki | Phase 10 calibration log + **human** wiki edit. Print outcomes never auto-promote `verified` rules. |

---

## Phase 0 — Truth baseline

### P0-T1 Characterization tests for current CLI

- **Outcome:** Current JSON keys and write-guard behavior cannot regress silently.
- **Files:** Create `tests/test_cli_characterization.py`; Modify none of production unless tests reveal bugs (then stop and ADR).
- **Prerequisites:** none
- **Tests first:** parse `inspect-mesh --json` on generated cube; assert keys `face_count`, `vertex_count`, `watertight`, `units_assumed`; `repair-mesh` to `.../3ds/original/...` raises/exits 1.
- **Commands:** `python -m pytest tests/test_cli_characterization.py -q`
- **Acceptance:** 10 existing + new tests pass; documents actual `units_assumed=mm` behavior (even though it is wrong — characterization).
- **Risks:** Encodes a bad default; must be marked `TODO-remove-in-P3` in test comments (English).
- **Rollback:** delete the new test file.
- **Complexity:** S

### P0-T2 Honest root README

- **Outcome:** Status matrix: implemented / experimental / planned / unsupported. No vapor.
- **Files:** Create `README.md`
- **Prerequisites:** P0-T1
- **Steps:** Write install (`pip install -r core/requirements.txt`), four commands, limitations (no optimizer yet), link to `docs/projeto/INDEX.md` and this plan folder.
- **Tests:** none (doc). Optional: README links included in `validate-wiki` if pointed at repo root later — **not** required this task.
- **Acceptance:** README states inspect/repair exist; optimize does **not**.
- **Risks:** Over-promising copy.
- **Rollback:** delete README.
- **Complexity:** S

### P0-T3 License inventory (no choice)

- **Outcome:** `docs/engineering/LICENSE_INVENTORY.md` lists corpora; root LICENSE still absent.
- **Files:** Create that doc only.
- **Prerequisites:** none
- **Acceptance:** ebook CC BY-SA isolated; AGPL slicers noted; “root license: undecided”.
- **Complexity:** S

### P0-T4 Formalize immutable input

- **Outcome:** Symlink/path traversal cannot write original.
- **Files:** Modify `core/paths.py:40-54`; Test `tests/test_write_guard.py`
- **Prerequisites:** P0-T1
- **Tests first:** symlink dest under original; `..` components; `project_root` respected.
- **Acceptance:** `WriteGuardError` on all cases; existing repair test still passes.
- **Risks:** Windows symlink privilege.
- **Rollback:** revert `paths.py`.
- **Complexity:** M

### P0-T5 Freeze bootstrap

- **Outcome:** `python -m core.bootstrap_wiki` cannot overwrite wiki.
- **Files:** Modify `core/bootstrap_wiki.py` `main()`
- **Tests:** `tests/test_bootstrap_frozen.py` — running main without env exits non-zero and writes nothing.
- **Complexity:** S

### P0-T6 Corpus inventory

- **Outcome:** List of legal fixture strategy (generate in tests) + note that `3ds/` is private.
- **Files:** Create `docs/engineering/FIXTURE_CORPUS.md`
- **Complexity:** S

---

## Phase 1 — Engineering foundation

### P1-T1 Packaging ADR + pyproject

- **Outcome:** `pyproject.toml` with `[project]` name `print-engine-core`, `requires-python = ">=3.11"`, deps from current `core/requirements.txt`.
- **Files:** Create `pyproject.toml`; Create `uv.lock` **or** `requirements.lock` per ADR-P1 (proposed: uv). Keep `core/requirements.txt` as generated/re-export for one phase.
- **Tests first:** `tests/test_packaging.py` — importlib.metadata version or `python -c "import core"`.
- **Commands:** `uv sync` / `pip install -e .` then pytest.
- **Acceptance:** editable install; pytest 10+ still green.
- **Risks:** Python 3.14 vs classifiers.
- **Rollback:** remove pyproject; pip -r requirements.
- **Complexity:** M

### P1-T2 Ruff + mypy config

- **Files:** `pyproject.toml` tool tables; optional `mypy.ini`
- **Tests:** CI command documented; local `ruff check core tests` exit 0 after mechanical fixes **without behavior change**.
- **Complexity:** M

### P1-T3 Structured logger port

- **Files:** Create `core/domain/logging.py` Protocol; Create `core/adapters/stdio_logger.py`; Modify `cli.py` composition
- **Tests first:** logger receives `run_id`; no secrets; JSON logs on stderr when `--json`.
- **Complexity:** M

### P1-T4 Stable error catalog

- **Files:** Modify `core/errors.py`; Create `docs/engineering/ERROR_CODES.md`
- **Tests:** every `CoreError` has `code`; JSON `{ok, code, error, schema_version}`.
- **Complexity:** S

### P1-T5 `doctor` command

- **Files:** Modify `core/cli.py`; Create `core/application/doctor.py`
- **Tests:** `python -m core doctor --json` reports python version, trimesh yes/no, write-guard path, knowledge compiled hash or `missing`.
- **Complexity:** S

### P1-T6 CI

- **Files:** Create `.github/workflows/ci.yml` — pytest + ruff + mypy on Windows and Ubuntu, Python 3.11 and 3.12 (3.14 optional allow_failure).
- **Complexity:** M

**Phase 1 non-goal:** analyzer rewrite, knowledge YAML, optimizer.

---

## Phase 2 — Knowledge compiler (A1 Mini + PLA slice)

### P2-T1 JSON Schema + source registry

- **Files:** `knowledge/schemas/*.json`, `knowledge/sources/*.yaml`
- **Tests first:** schema rejects rule without `sources`; source requires `source_type` enum.
- **Complexity:** L

### P2-T2 JSON Logic evaluator allowlist

- **Files:** `core/domain/rules.py`
- **Tests:** unknown operator → fail closed; conflict same priority; bed_max rule from `04`.
- **Complexity:** L

### P2-T3 Compiler CLI

- **Files:** `core/application/knowledge_build.py`; CLI `knowledge validate|build`
- **Tests:** deterministic hash independent of file walk order (`os.walk` sorted).
- **Complexity:** M

### P2-T4 Migrate A1 Mini + generic PLA (experimental)

- **Files:** `knowledge/printers/bambu-a1-mini.yaml`, `materials/generic-pla.yaml`, `matrices/...`
- **Acceptance:** official 180/300/80 fields `verified`; wiki 190–220 nozzle `experimental` + legacy source.
- **Anti-pattern check:** no unverified copy of all profile tables.
- **Complexity:** L

---

## Phase 3 — Safe intake + analyzer v2

### P3-T1 Magic + budgets

- **Files:** `core/adapters/intake.py`; tests hostile STL/3MF
- **Complexity:** L

### P3-T2 Raw vs normalized inspect

- **Files:** `core/mesh.py` split; `MeshReport` mapping
- **Tests:** `process=False` vs `True` both reported; input hash unchanged.
- **Complexity:** L

### P3-T3 Scene preservation

- **Files:** stop concatenate-without-warning; `SceneGraph` VO
- **Complexity:** L

### P3-T4 3MF Core XML inspect (no write)

- **Files:** `core/threemf.py` or new adapter; `defusedxml`
- **Tests:** unit millimeter; one object; missing unit → `unknown`
- **Complexity:** XL

### P3-T5 Pass 1 metrics + cache key

- **Complexity:** L

---

## Phase 4 — A1 Mini capability + PLA/PETG matrix

### P4-T1 Verified printer profile

- **Acceptance:** every field has source id; CF+SS nozzle hard_block policy implemented.
- **Complexity:** M

### P4-T2 PETG product vs family conflict documented

- **Files:** two material records; compiler test that 220–250 vs 240–270 do not silently merge.
- **Complexity:** M

---

## Phase 5 — Rules + orientation optimizer (no slicer)

### P5-T1 Candidate generator + dedup

- **Tests:** cube has finite candidates; deterministic order.
- **Complexity:** L

### P5-T2 Feature evaluators + docs of proxy limits

- **Complexity:** L

### P5-T3 Constraint + Pareto + 3-candidate explain

- **CLI:** `optimize path --dry-run --ai off --json`
- **Complexity:** XL

---

## Phase 6 — Conservative repair transactions

### P6-T1 Operation registry + pre/postconditions

- **Files:** replace default `fill_holes=True`
- **Tests:** intentional opening fixture not filled; dirty export exit 1 without `--allow-dirty-export`.
- **Complexity:** XL

---

## Phase 7 — Slicer adapter vertical slice

### P7-T1 Semantic keys + Bambu map fixture

- **Blocked on:** user-installed Studio path + ADR-P7.
- **Complexity:** XL

### P7-T2 Subprocess sandbox

- **Tests:** no shell; timeout; version in manifest.
- **Complexity:** L

---

## Phase 8 — Run bundle + premium report

### P8-T1 `3ds/runs/<id>/` + templates pt-BR/en

- **Tests:** golden plan; reproduce command; aliases Windows-safe.
- **Complexity:** L

---

## Phase 9 — Wiki migration + retrieval

### P9-T1 Front matter + FTS5 + context pack

- **validate-wiki** grows ids/sources/stale/contradiction.
- **Complexity:** XL

---

## Phase 10 — Calibration log

### P10-T1 Registry + coupon recommendation (model + settings, not dangerous gcode)

- **Complexity:** L

---

## Phase 11 — Optional AI port

### P11-T1 Null provider + schema gate; no core deps

- **Blocked on:** deterministic acceptance tests green.
- **Complexity:** M

---

## Phase 12 — Second printer / second slicer proof

### P12-T1 Onboarding kit + conformance tests

- **Acceptance:** new printer = data + fixtures; **zero** new `if printer_id ==` in optimizer.
- **Complexity:** XL

---

## Task dependency graph (summary)

`P0 → P1 → P2 → P3 → P4 → P5 → P6`  
`P5` may start feature stubs after P3 raw facts exist.  
`P7` after P5 (settings) and ADR.  
`P8` after P5 (can emit plan without slicer).  
`P9` after P2 (ids exist).  
`P10` after P8.  
`P11` after P8 acceptance.  
`P12` after P4+P7.
