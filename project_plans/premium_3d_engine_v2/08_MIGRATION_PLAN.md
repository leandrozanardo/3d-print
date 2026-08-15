# 08 — Migration Plan

**Date:** 2026-08-15  
**Law:** no big-bang rewrite. Preserve CLI, docs, `3ds/` convention. Do not delete historical or licensed trees.

---

## 1. What stays stable (compatibility)

| Surface | Policy |
|---|---|
| `python -m core validate-wiki \| inspect-mesh \| inspect-3mf \| repair-mesh` | Keep until Phase 8; then aliases |
| `--json` stdout / errors stderr | Keep; version via `schema_version` field **added** (backward compatible) |
| `3ds/original` immutable | Strengthen, never relax |
| Basename = original stem | Keep (playbook) |
| `3ds/plan/*.md` PT-BR for operator | Keep; engine also writes `plan.en.md` in run bundle |
| `docs/projeto` human wiki | Stay until Phase 9 dual-write |
| `docs/ebook`, `docs/_arquivo` | Forever archive |
| `project_plans/start_plan.md` | Historical; do not replace |
| `docs/projeto/IMPLANTACAO-FASES.md` | Historical implant 0–4 |
| `project_plans/saas/` | Out of cycle; do not implement; do not delete |
| Previous `upgrade_v1_plan.md` (SaaS bridge) | Copied to `project_plans/saas/upgrade_v1_local_bridge.md` |

---

## 2. CLI migration

| Phase | Action |
|---|---|
| 0–1 | Characterization tests freeze current keys (`face_count`, `watertight`, …) |
| 1 | Add `doctor`; add `schema_version` to JSON reports |
| 3 | `model inspect` = new; `inspect-mesh` / `inspect-3mf` call it with warnings if raw≠normalized |
| 5 | `optimize --dry-run` |
| 6 | `repair-mesh` becomes transaction wrapper; **exit 1** if postconditions fail (breaking — document in CHANGELOG; opt-in `--allow-dirty-export` deprecated) |
| 8 | `run validate`, aliases `3ds/upgraded` from run bundle |
| 10 | `calibration record` |

Breaking changes require a `core/cli_compat.py` warning on stderr (not stdout) for one phase.

---

## 3. Deprecate `bootstrap_wiki.py`

- Phase 0: module docstring + `main()` prints **FATAL: obsolete; refuses to write** unless `PRINT_ENGINE_ALLOW_BOOTSTRAP=I_UNDERSTAND`.  
- Do not delete until Phase 9 (history).  
- Live wiki is already English and denser; re-running bootstrap would **destroy** it.

---

## 4. Knowledge migration

1. Author schemas empty of folklore.  
2. Import wiki ranges as `status: experimental`, `sources: [src.legacy.wiki.<page>]`, `confidence: low`.  
3. Re-verify A1 Mini hardware fields against official URLs (already started in `02`).  
4. Only promote to `verified` with source ids.  
5. Wiki tables replaced by links to rule ids (Phase 9). Redirects: keep old headings.

**Anti-pattern:** dump `tabela-temperaturas-a1-mini.md` → YAML and call it verified.

---

## 5. Analyzer migration (raw vs normalized)

1. Add `inspect_mesh_raw` (`process=False`) **beside** current path.  
2. Characterization: cube counts may change — snapshot both.  
3. Default `model inspect` emits `{raw, normalized, warnings}`.  
4. Old `inspect-mesh` JSON: keep top-level keys as **normalized** + `"deprecation": "raw nested under .raw from v2"` after one phase of dual fields.

---

## 6. Output convention

```
3ds/runs/<run-id>/     # canonical
3ds/upgraded/<stem>.*  # copy of selected model artifact (optional)
3ds/plan/<stem>.md     # copy of plan.pt-BR.md (operator habit)
```

Windows: no trailing dots/spaces; `one+Piece` already used — keep `+` (valid). Avoid `CON`/`NUL` stems.

---

## 7. Rollback per phase

Each phase: single concern; `git revert` of the phase commit(s). Knowledge compiler: keep previous `compiled/` hash in manifest so an old engine can be checked out.

If a phase breaks CLI characterization tests → stop, revert, do not “fix forward” by changing tests unless the change was an explicit accepted break.

---

## 8. Docs language policy (migration)

| Surface | Language |
|---|---|
| Code, schemas, IDs, commits, `project_plans/premium_3d_engine_v2/` | English |
| `docs/projeto` (current) | English (already) |
| Operator `3ds/plan` | PT-BR |
| Engine templates | `pt-BR` default locale + `en` |
| Ebook bodies | Portuguese source (CC BY-SA) |

`core/bootstrap_wiki.py` PT-BR strings are **not** a language policy — they are stale.

---

## 9. What not to migrate in this program

- SaaS / concierge / pilots (`project_plans/saas/`).  
- Root LICENSE (user decision).  
- Moving wiki out of `docs/projeto` before Phase 9.  
- TypeScript app.
