# 07 — Test Strategy

**Date:** 2026-08-15  
**Law:** TDD. Bug → regression test first. No “cube-only” definition of done.

---

## 1. Pyramid

| Layer | Examples | Tool |
|---|---|---|
| Unit | VOs, schema, JSON Logic, precedence, path guards, templates | pytest |
| Property | rotate∘inverse, scale volume, determinism vs dict order, no write to original | Hypothesis |
| Geometry fixtures | corpus below | pytest + trimesh/manifold later |
| Golden | 3MF round-trip, CLI JSON, plan.md, manifest, slicer maps | pytest + files |
| Integration | inspect→propose→apply-safe on fixtures | pytest |
| E2E | optimize --dry-run A1 Mini PLA decorative | pytest, optional slicer |
| Manual | real print coupons | calibration log |

Do **not** force Jest on Python. Future TS UI: Vitest/Jest later.

---

## 2. Current baseline

10 tests, 0.30 s, all passing (2026-08-15). Treat as **characterization**, not coverage of the product promise.

Phase 0 adds characterization tests that **lock current CLI JSON keys** so refactors cannot silently change contracts.

---

## 3. Geometry fixture catalog (generate in-test or vendor with license)

Create under `tests/fixtures/geometry/` (generated in `conftest` preferred — no binary blobs in git unless tiny ASCII STL):

| Id | Intent |
|---|---|
| `cube` | happy (already) |
| `sphere` | volume |
| `cylinder_hole` | opening vs hole |
| `thin_wall` | min feature |
| `bridge` | span proxy |
| `overhang_bands` | 15/30/45/60/90 |
| `tall_slender` | bed-slinger risk |
| `multi_component` | identity |
| `floating_island` | disconnected |
| `inverted_normals` | winding |
| `dup_degen_faces` | repair C |
| `nonmanifold` | |
| `intentional_opening` | fill_holes must **not** close |
| `tiny_accidental_hole` | fill may close if classified |
| `self_intersection` | |
| `trapped_cavity` | |
| `organic_proxy` | |
| `vase_spiral` | |
| `fit_pair` | clearance |
| `text_emboss` | |
| `oversized_181mm` | volume fail |
| `nan_inf` | reject |
| `malformed_stl` | reject |
| `malicious_3mf_*` | security |

License: generated geometry = project license (once chosen). Do not commit random Thingiverse files.

Private user models (`one+Piece`, etc.) stay gitignored; optional local corpus path documented, not required for CI.

---

## 4. Property tests (Hypothesis)

- Rotate + inverse → Hausdorff / vertex delta ≤ ε(units, scale).  
- Translation → volume and topology unchanged.  
- Uniform scale → volume × s³ when watertight.  
- Analyzer with `process=False` does not write input path; input sha256 unchanged.  
- Rule evaluation independent of dict key insertion order (use `canonicaljson` or sorted keys).  
- Serialization round-trip request/report.  
- No output path `relative_to(original_tree)`.  
- Archive limits: Hypothesis-generated member counts hit the cap.

---

## 5. Golden tests

- Minimal Core 3MF parse (units, one cube object, one build item).  
- Bambu project: **sanitized** fixture supplied by maintainer (strip personal paths); if unavailable, skip marked `requires_bambu_project`.  
- Semantic settings map snapshot per slicer version.  
- `plan.pt-BR.md` / `plan.en.md` for the sample cube dry-run (normalize timestamps).  
- `manifest.json` semantic hash ignores wall-clock.  
- CLI: stdout JSON / stderr logs / exit codes table.

---

## 6. Physics-proxy validation

Each feature function documents:

```python
def overhang_area_by_band(...):
    """Proxy: triangle area with normal-to-up angle in band.
    Does not measure sag, cooling, or layer time.
    """
```

Unit tests use the overhang fixture. No claim of print success.

---

## 7. Performance

1. Record baseline on **identified hardware** (this PC: Windows 10, Python 3.14.3) for triangle tiers: 1k / 50k / 500k / 2M.  
2. Store in `tests/perf/baseline.json` with CPU model string.  
3. CI fails on >30% regression **after** baseline exists — do not invent a target now.  
4. Memory peak: `tracemalloc` or `/usr/bin/time` — Windows: `psutil` optional extra.

---

## 8. Quality gates (proposed, justify)

| Gate | Target | Why |
|---|---|---|
| pytest | 100% of CI jobs | |
| Coverage `core/domain` + `paths` + `threemf` intake | lines ≥ 90%, branches ≥ 80% | safety-critical |
| Coverage adapters | ≥ 70% | IO |
| Coverage `bootstrap_*` converters | **omit** or exclude | one-shot |
| mypy `--strict` on `core/domain` first, then rest | Phase 1–3 | |
| Ruff | Phase 1 | |
| Mutation (mutmut) on rule engine + path guards | Phase 2 / 6 | |
| `pip-audit` / `uv audit` | Phase 1 | |
| No `except Exception` outside adapter modules | lint allowlist | |
| Wiki: links + (later) ids/sources | existing command | |

---

## 9. Commands (target)

```
python -m pytest tests/ -q
python -m pytest tests/ --cov=core --cov-fail-under=...
ruff check core tests
mypy core
python -m core knowledge validate
python -m core doctor
```

Phase 1 introduces them; do not claim they exist today.

---

## 10. TDD loop per task (binding)

1. Write failing test (shown in `upgrade_v1_plan.md`).  
2. Run — must fail for the right reason.  
3. Minimal implementation.  
4. Run — pass.  
5. Commit **only if user asks**.
