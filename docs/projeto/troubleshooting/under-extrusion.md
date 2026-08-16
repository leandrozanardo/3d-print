# Under-extrusion

## Summary

Gaps between perimeters, weak infill, translucent walls, missing top fill. Causes on A1 Mini: **partial clog**, **moisture**, **cold nozzle**, **low flow**, **AMS path friction**, **volumetric limit** at high speed. Fix hardware/path and dryness before cranking flow above ~1.05.

Hardware: [a1-mini-extrusao-e-bico](../hardware/a1-mini-extrusao-e-bico.md).

## When to use

| Symptom | Use |
|---|---|
| Random gaps / missing walls | Yes |
| Bubbles + weak extrusion | Yes → dry first |
| Consistent thin walls | Yes → flow/temp |
| Only fails at high speed | Yes → volumetric |
| AMS-only failures | Yes → path |

## When NOT to use

- Intentional vase single wall looking “thin” → vase profile, not underextrusion.
- Soft blobby over-detail → over-extrusion ([lost detail](detalhe-perdido-miniatura.md)).
- Peel with empty first layer from Z high → [adhesion](falha-adesao.md).

## Decision tree

```text
Filament dry / no pops?
  ├─ NO → dry; retest before flow hacks
  └─ YES → purge clean?
        ├─ NO → cold pull / nozzle; purge PLA↔PETG residue
        └─ YES → fails only at high speed?
              ├─ YES → −20% speed / lower max volumetric
              └─ NO → +5 °C then calibrate flow 0.95–1.00
AMS involved?
  └─ Check PTFE/path kink before Studio flow ([ams-lite](../hardware/a1-mini-ams-lite.md))
```

## Symptom → cause → fix

| Symptom | Cause | Fix |
|---|---|---|
| Random gaps / missing walls | Partial clog / debris | Cold pull / nozzle swap; purge |
| Bubbles + weak extrusion | Wet filament | Dry ([secagem](../materiais/secagem-e-umidade.md)) |
| Consistent thin walls | Flow low / cold | +5 °C; calibrate flow 0.95–1.00 |
| Fails only at high speed | Volumetric limit | −20% speed / lower max volumetric |
| AMS path issues | Friction / tangle | Check PTFE/AMS |
| Flow >~1.05 “fixes” it | Masked clog | Don’t; clear path instead |
| Matte foam layers | Moisture | Dry — not more flow |
| Clicking extruder | Grind / jam / wet soft | Unload; clear; dry |

## A1 Mini rules

1. Nozzle / cold pull if material history dirty (PLA after PETG especially).
2. Dry filament before retract/flow drama.
3. Temp +5 °C, retest.
4. Verify PTFE/AMS friction-free.
5. Reduce speed / max volumetric.
6. Calibrate flow with single-wall coupon.
7. Never raise flow >~1.05 without measuring — hides clogs.
8. Direct drive: short retract ≠ under-extrusion cause by itself.
9. Uncertain volumetric numbers → **validate on printer**.

## Suggested presets (PLA)

| Field | Action | Why |
|---|---|---|
| Temp | +5 °C within range | Viscosity |
| Speed | −20% if high-speed fail | Volumetric |
| Flow | Calibrate 0.95–1.00 | Accuracy |
| Max volumetric | Follow filament; lower if gaps | Hardware limit |
| Retract | Leave until extrusion solid | Don’t confuse issues |

## Suggested presets (PETG)

| Field | Action | Why |
|---|---|---|
| Drying | Mandatory | Bubbles ≠ flow |
| Speed | Lower than PLA | Stable extrusion |
| Temp | Tower 230–245 order | **validate** |
| Cooling | Don’t max | Fake “gaps” from weak bond look different — check layers |
| Purge | Long when switching from PLA | Residue cook |

## PLA vs PETG columns

| Check | PLA | PETG |
|---|---|---|
| Moisture first? | Often | Always |
| Speed headroom | Higher | Lower |
| Clog from swaps | Medium | High if PLA residue |
| Flow >1.05 | Still wrong | Still wrong |

## Diagnostic coupon

1. Single-wall cube or Teaching Tech style extrusion test.
2. Measure wall width vs line width.
3. Adjust flow small steps (±0.02).
4. Only then change volumetric/speed for production profile.

## Related

- [Extrusion & nozzle](../hardware/a1-mini-extrusao-e-bico.md)
- [Drying](../materiais/secagem-e-umidade.md)
- [AMS Lite](../hardware/a1-mini-ams-lite.md)
- [Temperature table](../materiais/tabela-temperaturas-a1-mini.md)
- [Matrix](matriz-sintoma-causa.md)
- [Hub](../INDEX.md)

## Sources

- Ellis flow calibration · Bambu clog / extrusion docs
- Teaching Tech volumetric concepts
