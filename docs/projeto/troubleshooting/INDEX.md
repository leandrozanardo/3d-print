# Troubleshooting

## Summary

Symptom → cause → fix for **Bambu Lab A1 Mini** (0.4 mm, Bambu Studio). Always start at the [symptom → cause matrix](matriz-sintoma-causa.md). Change **one variable per test**. PLA is primary; PETG is fully in scope when the job uses it.

Do not spray-edit five profile knobs after one ugly print.

## When to use

| Trigger | Action |
|---|---|
| Failed or ugly print | Matrix → child page |
| Preview looked fine, part failed | Same — reality wins |
| Before inventing a new profile | Confirm root cause |
| After material/brand change | Re-validate temps/retract |

## Decision tree (entry)

```text
What failed?
  ├─ Never stuck / peeled early → falha-adesao
  ├─ Corners lifted later → warping (also check adhesion)
  ├─ Gaps / weak walls → under-extrusion
  ├─ Permanent XY step → layer-shift (confirm not peel-push)
  ├─ Support won’t release → suporte-dificil-remover
  ├─ Mini detail gone → detalhe-perdido-miniatura
  ├─ Hairs / webs → qualidade-e-acabamento/stringing-e-retract
  ├─ Fat base → elephant-foot-e-primeira-camada
  └─ Ugly vertical line → costura-e-superficie
```

## A1 Mini rules

| # | Rule |
|---|---|
| 1 | Scope: A1 Mini, 0.4 mm, Bambu Studio; PLA primary + PETG documented |
| 2 | Confirm root cause before spray-changing settings |
| 3 | Uncertain values → **validate on printer** |
| 4 | Dry filament before retract/stringing chases |
| 5 | Mechanical knock vs slicer: check belts/cables/adhesion first for shifts |
| 6 | Child pages below; quality track for cosmetic-only issues |

## Pages

| Page | Use when |
|---|---|
| [Symptom → cause matrix](matriz-sintoma-causa.md) | First stop always |
| [Adhesion failure](falha-adesao.md) | Peel / no stick |
| [Warping](warping.md) | Corners lift mid/late |
| [Under-extrusion](under-extrusion.md) | Gaps / translucent walls |
| [Layer shift](layer-shift.md) | Permanent XY offset |
| [Hard-to-remove supports](suporte-dificil-remover.md) | Welded supports |
| [Lost miniature detail](detalhe-perdido-miniatura.md) | Eyes/texture gone |

## PLA vs PETG (troubleshooting bias)

| Symptom class | PLA first guess | PETG first guess |
|---|---|---|
| Stringing | Retract/temp after dry | **Moisture** first |
| Weak layers | Speed/temp | Cooling too high + wet |
| Plate issues | Dirty / cold | Over-bond on smooth PEI |
| Support weld | Low Z / no interface | Same + larger Z needed |
| Warp | Large flat / draft | Bed temp + dry + brim |

## Related

- [Hub](../INDEX.md)
- [Quality & finish](../qualidade-e-acabamento/INDEX.md)
- [Quality checklist](../workflow/checklist-qualidade.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Hardware](../hardware/INDEX.md)

## Sources

- Prusa KB · FixMyPrint taxonomy · Bambu forum patterns
- Project matrix synthesis
