# When to edit mesh

## Summary

Mode **B** allows **light** repair: non-manifold cleanup, normals, uniform scale, embedded orientation, safe loose-shell removal. **Heavy remesh / remodel** only with explicit user request or parametric source. Output never under `3ds/original/`.

CLI: `python -m core repair-mesh …`

## When to use

| Signal | Action |
|---|---|
| `inspect-mesh` reports holes, non-manifold, flipped normals | Repair to upgraded |
| Wrong scale (mm vs cm) | Uniform scale — document factor |
| Critical thin walls on tools | Thicken with external tool **if authorized** |
| Preferred print orientation known | Bake rotation into mesh if it helps Studio |

## When NOT to use

| Situation | Rule |
|---|---|
| Artistic resculpt / new design | Forbidden without request |
| Complex topology rebuild | Out of mode B |
| Mechanical redesign beyond agreed clearance | Ask first |
| Any write under `3ds/original/` | Hard ban |
| “Silent” tolerance changes | Forbidden — log in plan |
| Fixing stringing via mesh | Wrong track — slicer |

## Decision tree

```text
inspect-mesh issues?
  ├─ None blocking → skip repair; recipe only
  ├─ Non-manifold / holes / normals → repair-mesh → upgraded
  ├─ Scale wrong → uniform scale + plan note
  └─ Needs remesh/sculpture → STOP — request authorization
User authorized thicken/clearance?
  ├─ YES → external tool; log before/after
  └─ NO → document risk; print recipe only
```

## A1 Mini rules

**Allowed (light):**

```bash
python -m core repair-mesh 3ds/original/X.stl 3ds/upgraded/X.stl --json
```

- Documented uniform scale
- Base rotation for preferred orientation
- Remove loose shells if safe and noted

**Forbidden without request:**

- New sculpture, heavy remesh
- Silent tolerance / clearance changes
- Deleting structural bodies without note
- Overwriting original

Always log before/after in `plan.md` (size / bbox / command).

## PLA vs PETG relevance

| Mesh edit | PLA jobs | PETG jobs |
|---|---|---|
| Repair manifold | Same | Same |
| Thicken walls for strength | Often enough with slicer walls | Still prefer walls; mesh thicken if authorized |
| Shrinkage compensation mesh | Rare — prefer elephant/fit coupons | Same |

Mesh edits are material-agnostic; recipe still differs after repair.

## Failure modes → first checks

| Symptom | Cause | Fix |
|---|---|---|
| Repair wrote to original | Bad path | Abort; fix command |
| Part hollowed unexpectedly | Shell removal too aggressive | Restore from original; narrower repair |
| Scale 10× wrong | Units confusion | Re-inspect bbox vs expected |
| Still non-manifold after repair | Beyond light repair | Note limit; ask for heavy tools |
| Fit changed mysteriously | Undocumented scale/offset | Diff plan; remake |

## Plan.md must include

| Field | Example |
|---|---|
| Before bbox | `28×32×40 mm` |
| After bbox | `28×32×40 mm` (or scaled) |
| Command | `repair-mesh … --json` |
| Intent | normals / holes / scale 0.1 |
| Risks | thin walls still below 0.8 mm |

## Validate on printer

- Scale assumptions when source units unknown
- Fit clearances after any intentional thicken
- Orientation bake vs Studio-only rotate (prefer one source of truth)

## Related

- [Optimize model](otimizar-modelo.md)
- [Thin walls](../geometria/paredes-finas.md)
- [Write plan.md](como-escrever-plan-md.md)
- [Checklist](checklist-qualidade.md)
- [Hub](../INDEX.md)

## Sources

- Optimization mode B (`start_plan.md`)
- `core/repair.py` path guards
