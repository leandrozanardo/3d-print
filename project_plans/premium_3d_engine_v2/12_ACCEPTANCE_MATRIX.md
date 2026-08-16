# 12 — Acceptance Matrix

**Date:** 2026-08-15  
Status: `planned` unless noted. Product-premium claims stay **false** until every row in §2 is `evidence`.

---

## 1. Planning-phase acceptance (this execution)

| Req | Artifact | Evidence | Status |
|---|---|---|---|
| PL-01 | 00–12 docs in `project_plans/premium_3d_engine_v2/` | files exist | **this session** |
| PL-02 | Executable TDD plan | `project_plans/upgrade_v1_plan.md` | **this session** |
| PL-03 | No production code changed | git: only planning paths | **this session** |
| PL-04 | HEAD verified ≠ assumed `a53158f` | `5eb6949` | **done** |
| PL-05 | Tests actually run | 10 passed | **done** |

---

## 2. Product-premium criteria (from user prompt §32)

| ID | Requirement | Phase | Implementation artifact | Test / evidence | Status |
|---|---|---|---|---|---|
| DET-1 | Same input+versions → same decision/manifest semantic hash | 5, 8 | optimizer + manifest | golden hash | planned |
| DET-2 | `--ai off` completes supported flow | 5, 8, 11 | CLI | e2e | planned |
| DET-3 | LLM failure cannot change/block deterministic result | 11 | Null/fail provider | unit | planned |
| SAF-1 | Input bytes unchanged | 0, 3 | paths + analyzer | sha256 before/after | planned |
| SAF-2 | Symlink/traversal cannot write original | 0 | `paths.py` | `test_write_guard` | planned |
| SAF-3 | Malicious archive/XML/mesh fail in budgets | 3 | intake | hostile fixtures | planned |
| SAF-4 | Destructive ops recorded approval | 6 | apply gates | unit | planned |
| GEO-1 | Raw ≠ normalized facts | 3 | reports | dual inspect test | planned |
| GEO-2 | Applied op has pre/postconditions | 6 | transactions | unit | planned |
| GEO-3 | Output reopens/validates | 6, 7 | writers | reopen test | planned |
| GEO-4 | Inverse + before/after metrics | 5, 6 | change records | unit | planned |
| GEO-5 | No unsupported CAD precision claim | 6 | docs + no STEP silent | review | planned |
| KNW-1 | Resolved param → rule/source/calibration | 2, 4, 8 | ResolvedSetting | schema | planned |
| KNW-2 | Conflicts fail closed | 2 | rule engine | conflict test | planned |
| KNW-3 | No duplicated canonical numbers in prose | 9 | wiki QA | contradiction lint | planned |
| KNW-4 | A1 Mini + PLA/PETG source-audited slice | 4 | knowledge YAML | source ids | planned |
| OPT-1 | Hard constraints before scores | 5 | pipeline | unit | planned |
| OPT-2 | Orientation candidates deterministic + deduped | 5 | generator | property | planned |
| OPT-3 | Trade-offs shown | 5, 8 | plan.md | golden | planned |
| OPT-4 | Cost/time proxy vs slicer distinguished | 7, 8 | schema | unit | planned |
| OPT-5 | No uncalibrated probability | 8 | templates | grep CI | planned |
| SLC-1 | Adapter records exact slicer version | 7 | subprocess | golden | planned |
| SLC-2 | Semantic map versioned goldens | 7 | maps | golden | planned |
| SLC-3 | No shell injection / post-scripts | 7 | argv tests | unit | planned |
| SLC-4 | Vendor-neutral fallback bundle | 7, 8 | semantic-settings.json | e2e | planned |
| OUT-1 | Artifacts validate versioned schemas | 8 | jsonschema | unit | planned |
| OUT-2 | `plan.pt-BR.md` complete without LLM | 8 | templates | golden | planned |
| OUT-3 | Every change has why/evidence/trade-off/risk/rollback | 8 | ChangeRecord | schema | planned |
| OUT-4 | Reproduction command present and tested | 8 | manifest | e2e | planned |
| EXT-1 | Normal printer = data + conformance | 12 | registry | conformance | planned |
| EXT-2 | Second printer proves abstraction | 12 | fixture printer | no core ifs | planned |
| EXT-3 | Second slicer proves adapter | 12 | fake adapter | unit | planned |
| EXT-4 | Support levels prevent universal-support theater | 4, 12 | SupportLevel enum | schema | planned |

---

## 3. Current-system acceptance (honest)

| ID | Claim | Phase | Status |
|---|---|---|---|
| CUR-1 | Wiki relative links OK | now | **pass** (`validate-wiki` ok) |
| CUR-2 | Write guard happy path | now | **pass** (tmp `3ds/original`) |
| CUR-3 | 3MF Core interpreted | now | **fail** |
| CUR-4 | Raw inspection | now | **fail** (`process=True`) |
| CUR-5 | Optimizer exists | now | **fail** |
| CUR-6 | Packaging/CI | now | **fail** |
| CUR-7 | Root README | now | **fail** |

---

## 4. Operational job A (separate from engine premium)

Source: `docs/superpowers/specs/2026-08-15-one-piece-decorative-optimization-design.md`. Not an engine phase. No new tests required **for A**.

| ID | Requirement | Status |
|---|---|---|
| JOB-A-1 | `3ds/original/one+Piece.3mf` unchanged | planned (local job) |
| JOB-A-2 | `3ds/upgraded/one+Piece.3mf` exists (gitignored) | planned |
| JOB-A-3 | `3ds/plan/one+Piece.md` from template; cites decorative purpose + `pla-decorativo-superficie-0.4` | planned |
| JOB-A-4 | Scenario 2 recipe (no raft; ironing off; low infill; minimal supports) | planned |
| JOB-A-5 | Uncertain values **validate on printer**; checklist referenced; Studio path documented | planned |
| JOB-A-6 | `inspect-3mf --strict` fail-closed if no model | planned |

## 5. Command log (planning machine)

See chat “Exact commands run”. Summary:

- `git rev-parse HEAD` → `5eb6949cdd8ad0dee1ec8476f47357f17fc2b327`
- `git ls-files` count → 657
- `python --version` → 3.14.3
- `python -m compileall core tests` → OK
- `python -m core validate-wiki docs --json` → ok true
- `python -m pytest tests/ -q` → 10 passed
- Official fetches: A1 Mini tech-specs, FAQ, filament guide, Bambu Studio CLI wiki, 3MF Core 1.3, lib3mf license
