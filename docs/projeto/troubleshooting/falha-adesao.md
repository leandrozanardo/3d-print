# Adhesion failure

## Summary

Part lifts on layer 1–few or never wets the plate. On A1 Mini ~90% of cases: **dirty PEI**, **high Z / weak squish**, **cold bed**, or **small footprint without brim**. Fix plate and first layer before inventing exotic glue recipes.

Hardware detail: [a1-mini-mesa-e-adesao](../hardware/a1-mini-mesa-e-adesao.md).

## When to use

| Symptom | Use this page |
|---|---|
| Skirt OK, object walks | Yes |
| Corner lifts in first cm of height | Yes (+ [warping](warping.md)) |
| Whole pad peels mid-print | Yes → brim/warp track |
| PETG sticks then rips coating | Yes — over-bond track |

## When NOT to use

- Permanent XY step with part still glued → [layer-shift](layer-shift.md).
- Late corner curl after many solid layers only → lean [warping](warping.md).
- Gaps in walls with perfect first layer → [under-extrusion](under-extrusion.md).

## Decision tree

```text
First layer visual?
  ├─ Ridges / gaps / not kissing → re-cal bed; more squish carefully; wash PEI
  ├─ Over-squished transparent pancake → reduce squish; see elephant foot
  └─ Looks good but peels later → brim + bed temp + draft + warping page
Material?
  ├─ PLA → bed mid-high range; no AC blast
  └─ PETG → bed 70–80; textured PEI; cool before release
```

## Symptom → cause → fix

| Symptom | Cause | Fix |
|---|---|---|
| Skirt OK, object walks | Weak first-layer squish / dirty PEI | Wash plate; lower first layer carefully; re-cal bed |
| Corner lifts early | Cold bed / draft / tiny contact | Bed +5–10 °C; brim 5–8 mm; block AC |
| Whole pad peels mid-print | Undersized brim / warp start | Brim; [warping](warping.md) |
| PETG sticks then rips plate | Smooth PEI over-bond | Textured plate; careful cool release; don’t over-temp bed |
| Only tiny feet peel | Contact area | Brim / raft last resort / thicker feet if mesh OK |
| First layer matte + peel | Contaminated PEI (oils) | Dish soap wash; IPA as secondary |

## A1 Mini checklist (order)

1. Wash plate (soap + water; dry fully).  
2. Re-run bed calibration / first-layer cal in Bambu flow.  
3. More first-layer squish (careful — avoid nozzle crash).  
4. Bed +5–10 °C within material range.  
5. Brim 5–8 mm (or mouse-ears on corners).  
6. First layer speed 20–30 mm/s.  
7. PLA: no AC blast on bed; PETG: same + textured preference.  
8. Glue stick only if PEI process failed twice — clean residue after.  

## Suggested presets (PLA)

| Field | Adjust | Why |
|---|---|---|
| Bed | 55–65 °C order | Stick — **validate** brand |
| Brim | 5–8 mm | Anchor |
| First layer speed | 20–30 mm/s | Squish |
| First layer height | 0.20–0.28 mm | Controlled wet-out |
| First layer nozzle | +0–10 °C vs rest | Wet-out |
| Raft | Off until brim fails | Cleanup |

## Suggested presets (PETG)

| Field | Adjust | Why |
|---|---|---|
| Bed | 70–80 °C | Stick |
| Plate | Textured PEI preferred | Balance weld |
| Brim | On | Residual warp |
| First layer speed | 20–30 mm/s | Viscous |
| Release | After cool-down | Anti-tear |
| Smooth PEI | Avoid or extreme care | Weld risk |

## Failure modes → next node

| After adhesion “fixed”… | Go to |
|---|---|
| Corners still lift high up | [Warping](warping.md) |
| Base fat, holes tight | [Elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md) |
| Part knocked mid-print | [Layer shift](layer-shift.md) |
| Supports now the pain | [Hard supports](suporte-dificil-remover.md) |

## Validate on printer

- Exact bed °C for your PEI + brand  
- Brim width vs cleanup time  
- Whether glue is ever needed on *your* plate  

## Related

- [Bed & adhesion](../hardware/a1-mini-mesa-e-adesao.md)
- [Brim / raft / skirt](../fatiamento/brim-raft-saia.md)
- [Warping](warping.md)
- [Elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md)
- [Matrix](matriz-sintoma-causa.md)
- [Hub](../INDEX.md)

## Sources

- Bambu adhesion tips · Prusa first-layer KB
- A1 Mini open-frame draft patterns
