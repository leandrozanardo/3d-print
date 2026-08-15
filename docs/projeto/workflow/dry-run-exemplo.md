# Dry-run example

## Summary

Realistic walkthrough: **PLA miniature** on A1 Mini from inspect → plan. Use to train the SOP; file names are **illustrative**. Does not require the file to exist on disk to learn the flow — when it does, run the real CLI.

## When to use

| Trigger | Action |
|---|---|
| Train agent/human on pipeline | Follow steps in order |
| Verify wiki answers playbook questions | Cross-open linked pages |
| Template for a new mini job | Clone structure into real plan |

## When NOT to use

- As a substitute for PETG functional jobs — fork material/profile.
- As permission to skip checklist on a real print.
- As a claim that `hero-mini.stl` exists in every clone of the repo.

## Input (illustrative)

| Item | Value |
|---|---|
| Path | `3ds/original/hero-mini.stl` |
| Declared purpose | miniature |
| Material intent | dry PLA |
| Machine | A1 Mini 0.4 · Bambu Studio |

## Steps

### 1 — Inspect

```bash
python -m core inspect-mesh 3ds/original/hero-mini.stl --json
```

Example read: watertight OK (informational), bbox ~28×32×40 mm → fits 180³ with margin.

### 2 — Classify geometry

[organicos-e-miniaturas](../geometria/organicos-e-miniaturas.md) + overhang assessment; thin walls check if armor ridges look sub-0.8 mm.

### 3 — Classify purpose

[miniaturas](../proposito/miniaturas.md).

### 4 — Material

Dry PLA. If spool unknown/open → dry before retract tuning; note in plan.

### 5 — Profile

[pla-miniatura-0.4](../perfis-a1-mini/pla-miniatura-0.4.md).

### 6 — Orientation

Base on bed; optional ~10° tilt if it cuts support — **validate** in preview (don’t guess time savings).

### 7 — Supports

Tree, threshold ~32°, top Z **0.20 mm**, interface **2–4**, paint off face  
([tree vs normal](../perfis-a1-mini/suportes-arvore-vs-normal.md)).

### 8 — Brim

**5 mm** (small feet risk).

### 9 — Emit

Studio project → `3ds/upgraded/hero-mini.3mf` (and repaired STL only if step 11).

### 10 — Plan

Write `plan/hero-mini.md` with wiki links + CLI summary ([como-escrever-plan-md](como-escrever-plan-md.md)).

### 11 — Optional light repair

```bash
python -m core repair-mesh 3ds/original/hero-mini.stl 3ds/upgraded/hero-mini.stl --json
```

Only if inspect justifies it ([quando-editar-malha](quando-editar-malha.md)).

### 12 — Gate

[checklist-qualidade](checklist-qualidade.md) pre-print; post-print when hardware runs.

## Decision tree (this example)

```text
Purpose miniature + organic?
  ├─ YES → pla-miniatura-0.4 + tree
  └─ NO → stop using this dry-run; pick other profile
Face risk?
  └─ Paint supports off · outer 40–70 mm/s · layer 0.08–0.12
```

## Expected plan contents

| Block | Example content |
|---|---|
| Wiki list | miniaturas, organicos, pla-miniatura, tree vs normal, supports strategy |
| Studio fields | layer 0.10; walls 2–3; infill 12% gyroid; tree 32°; Z 0.20; brim 5 |
| Temps | from PLA table — **validate on printer** for brand |
| Risks | retract/stringing brand-dependent; face support scars if paint missed |
| CLI | inspect-mesh JSON summary |

## PLA vs PETG fork (same mesh)

| If user switches to PETG | Change |
|---|---|
| Profile | [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md) — warn cosmetics |
| Dry | Mandatory note |
| Support Z | 0.25–0.30 |
| Expectation | Detail loss vs PLA mini — document |

Prefer staying PLA for this didactic mini.

## Failure modes in the dry-run

| Mistake | Correction |
|---|---|
| Spiralize on mini | Wrong — vase profile only for single contour vessels |
| Normal supports on face | Use tree + paint |
| No brim on tiny feet | Add 5 mm |
| Skip inspect | Always run core inspect when file exists |
| Claim exact retract | Mark **validate on printer** |

## Related

- [Optimize model](otimizar-modelo.md)
- [Checklist](checklist-qualidade.md)
- [Write plan](como-escrever-plan-md.md)
- [PLA miniature](../perfis-a1-mini/pla-miniatura-0.4.md)
- [Hub](../INDEX.md)

## Sources

- Didactic dry-run (no mandatory real file)
- Playbook SOP alignment
