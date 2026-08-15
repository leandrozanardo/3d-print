# Quality checklist

## Summary

Gate before declaring an optimization **done**. Fail any item → return to troubleshooting/profile pages. Covers **pre-print preview** and **post-print** reality. Uncertain items stay marked **validate on printer** until measured.

## When to use

| Trigger | Action |
|---|---|
| After Bambu Studio preview | Pre-print list |
| After first test print | Post-print list |
| Before closing `plan/<name>.md` | Both |

## When NOT to use

- As a substitute for reading the profile page.
- To rubber-stamp a plan with empty wiki citations.
- To skip drying notes on PETG.

## Pre-print (preview)

### Geometry & machine

- [ ] BBox fits **180×180×180** mm with brim/margin  
- [ ] Orientation documented (why this way)  
- [ ] Units treated as mm (scale sanity)  

### Recipe

- [ ] Named profile chosen and linked (`perfis-a1-mini/…`)  
- [ ] Material PLA or PETG explicit (+ dry state for PETG)  
- [ ] Supports: type + top Z + interface reviewed  
- [ ] Walls/infill match purpose  
- [ ] Brim/skirt/raft decided  
- [ ] Seam placed if cosmetic  
- [ ] Temps/cooling/speeds match material page  
- [ ] Spiral vase: single contour confirmed (if applicable)  

### Artifacts

- [ ] `plan.md` drafted with wiki links  
- [ ] `python -m core inspect-*` notes pasted or summarized  
- [ ] Output path under `3ds/upgraded/` only  
- [ ] Open **validate on printer** items listed  

## Post-print

- [ ] First layer OK (kiss, no peel)  
- [ ] No layer shift  
- [ ] Supports removable without ripping noble faces  
- [ ] Critical dimensions (± clearance) OK  
- [ ] Stringing acceptable for purpose  
- [ ] Detail acceptable for purpose (minis)  
- [ ] Update `plan.md` with real deviations (**validate** → final values)  

## Decision tree on fail

```text
Which gate failed?
  ├─ Stick / first layer → falha-adesao / elephant-foot
  ├─ Corners lift → warping
  ├─ Gaps → under-extrusion
  ├─ XY step → layer-shift
  ├─ Support weld → suporte-dificil-remover
  ├─ Lost detail → detalhe-perdido-miniatura
  ├─ Hairs → stringing-e-retract
  └─ Seam/walls → costura-e-superficie
```

## Fail → where to go

| Fail | Page |
|---|---|
| Peel / no stick | [falha-adesao](../troubleshooting/falha-adesao.md) |
| Corners lift | [warping](../troubleshooting/warping.md) |
| Gaps / thin walls | [under-extrusion](../troubleshooting/under-extrusion.md) |
| XY step | [layer-shift](../troubleshooting/layer-shift.md) |
| Welded support | [suporte-dificil](../troubleshooting/suporte-dificil-remover.md) |
| Lost detail | [detalhe-perdido](../troubleshooting/detalhe-perdido-miniatura.md) |
| Hair / webs | [stringing](../qualidade-e-acabamento/stringing-e-retract.md) |
| Fat base / fits | [elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md) |
| Ugly seam | [seam](../qualidade-e-acabamento/costura-e-superficie.md) |

## PLA vs PETG checklist extras

| Extra item | PLA | PETG |
|---|---|---|
| Dry documented | Nice | **Required** |
| Plate type noted | Optional | Textured preferred noted |
| Support Z ≥ PETG table | N/A | Check |
| Stringing acceptance | Tight for minis | Looser for tools |

## A1 Mini rules

1. Preview pass ≠ print pass — always run post-print when hardware available.  
2. One failed critical item blocks “done.”  
3. Don’t clear **validate on printer** without evidence.  
4. Log which checklist revision was used in the plan if iterating.

## Related

- [Optimize model](otimizar-modelo.md)
- [Symptom matrix](../troubleshooting/matriz-sintoma-causa.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Write plan](como-escrever-plan-md.md)
- [Hub](../INDEX.md)

## Sources

- Project SOP (`start_plan.md` / `playbook.md`)
