# Optimize model (SOP + CLI)

## Summary

Hybrid **mode B**: light analysis via `core`, decisions from this wiki, recipe in **Bambu Studio**, artifact in `3ds/upgraded/` + `plan/<basename>.md`. No full auto-optimizer; no heavy remesh unless authorized.

This is the main operational page for agents and humans running the playbook.

## When to use

| Trigger | Action |
|---|---|
| Request points at playbook + `3ds/original/` file | Run full pipeline below |
| Only wiki edit | Use `validate-wiki` — not this full SOP |
| User asks “optimize this STL” | This page end-to-end |

## When NOT to use

- Redesign sculpture from scratch (out of mode B).
- Writing into `3ds/original/`.
- Inventing precision without **validate on printer** marks.

## Pipeline (order)

| Step | Action | Wiki / tool |
|---|---|---|
| 1 | Inventory — STL vs 3MF; size; units (mm assumed) | — |
| 2 | Inspect with `core` | CLI below |
| 3 | Classify geometry | [classificar-geometria](../geometria/classificar-geometria.md) |
| 4 | Classify purpose | [proposito/INDEX](../proposito/INDEX.md) |
| 5 | Pick profile | [perfis-a1-mini/INDEX](../perfis-a1-mini/INDEX.md) |
| 6 | Orientation / supports / brim | [fatiamento/INDEX](../fatiamento/INDEX.md) |
| 7 | Light mesh ops only if allowed | [quando-editar-malha](quando-editar-malha.md) |
| 8 | Emit artifact under `3ds/upgraded/` | Studio `.3mf` preferred |
| 9 | Write `plan/<basename>.md` | [plan/_template.md](../../../plan/_template.md) |
| 10 | Self-check | [checklist-qualidade](checklist-qualidade.md) |

## Decision tree

```text
Inspect issues?
  ├─ Non-manifold / holes / normals → repair-mesh to upgraded (if allowed)
  ├─ Oversize vs 180³ → scale/split decision — document
  └─ Clean → classify → profile
Material?
  ├─ Cosmetic / mini / vase → PLA profiles
  └─ Impact / warm → PETG functional (dry)
Supports?
  └─ Tree vs normal matrix + purpose profile
```

## A1 Mini rules

1. Never mutate `3ds/original/`.  
2. Link geometry + purpose + named 0.4 profile in the plan.  
3. Prefer firm removable supports over zero-support if surface dies.  
4. Hardware = A1 Mini; materials PLA/PETG per decision.  
5. Do not invent precision — mark **validate on printer**.  
6. One profile family; don’t mix PLA process with PETG filament.  
7. Bed volume **180×180×180** mm — leave margin for brim.  
8. After Studio preview fails checklist, do not emit “done.”

## CLI — `python -m core`

```bash
# Wiki link health (after doc edits)
python -m core validate-wiki docs
python -m core validate-wiki docs --json

# Inspect mesh (STL/OBJ/PLY)
python -m core inspect-mesh 3ds/original/part.stl
python -m core inspect-mesh 3ds/original/part.stl --json

# Inspect 3MF (read-only container)
python -m core inspect-3mf 3ds/original/part.3mf
python -m core inspect-3mf 3ds/original/part.3mf --json
python -m core inspect-3mf 3ds/original/part.3mf --json --strict

# Light repair — output MUST NOT be under 3ds/original/
python -m core repair-mesh 3ds/original/part.stl 3ds/upgraded/part.stl
python -m core repair-mesh 3ds/original/part.stl 3ds/upgraded/part.stl --json
```

### Interpret inspect before slicing

| Field / idea | Action |
|---|---|
| Watertight | Informational — still print often; repair if authorized |
| BBox vs 180×180×180 | Scale/split/orient if over |
| Normals / issues list | Repair or warn in plan |
| Multi-body | Document; don’t silently delete shells |

Exit codes: `0` ok · `1` domain/validation failure · `2` bad CLI usage · `130` interrupted.

## PLA vs PETG (workflow fork)

| Decision point | PLA | PETG |
|---|---|---|
| Default | Yes | Only if toughness/heat |
| Dry note in plan | Recommended | Mandatory |
| Profile folder | pla-* | petg-funcional-0.4 |
| Support Z | Per PLA profile | Larger gaps |

## Failure modes → first checks

| Symptom | Next |
|---|---|
| Preview support on face | [tree vs normal](../perfis-a1-mini/suportes-arvore-vs-normal.md) |
| Over volume | Scale / split — document |
| Repair writes to original | Abort — path guard |
| Plan missing wiki links | [como-escrever-plan-md](como-escrever-plan-md.md) |
| Print fails later | [troubleshooting](../troubleshooting/INDEX.md) |

## Related

- [Geometry classifier](../geometria/classificar-geometria.md)
- [Purpose](../proposito/INDEX.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Checklist](checklist-qualidade.md)
- [Write plan.md](como-escrever-plan-md.md)
- [Dry-run](dry-run-exemplo.md)
- [When to edit mesh](quando-editar-malha.md)
- [Hub](../INDEX.md)

## Sources

- Playbook · `core/cli.py` · `core/README.md`
- `start_plan.md` mode B/C locks
