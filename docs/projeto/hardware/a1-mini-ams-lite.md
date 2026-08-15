# A1 Mini — AMS Lite

## Summary

**AMS Lite** is the external multi-color / multi-material accessory for the A1 Mini. It enables character color changes and filament buffering, at the cost of **purge waste**, **longer print time**, and **higher sensitivity to humidity and tube path quality**. For mono-material structural parts, a **direct spool** is usually simpler and more reliable. AMS Lite **does not dry filament**.

Primary consumers: [characters](../proposito/personagens.md). Path faults often masquerade as [under-extrusion](../troubleshooting/under-extrusion.md).

## When to use

| Use case | AMS Lite? | Notes |
|---|---|---|
| Multicolor characters / logos | Yes | Minimize swaps on tiny faces |
| Single-color PLA decorative | Optional | Direct spool often enough |
| PETG functional mono | Prefer direct | Less path friction/string variables |
| Alternating dry PLA slots | Yes | Keep spools dry |
| “Automatic dryer” | No | Still need [drying](../materiais/secagem-e-umidade.md) |
| PLA+PETG same job | Avoid unless necessary | Temp + purge complexity |
| Load/unload fails repeating | Diagnose here first | Not flow ratio |

## Decision tree — AMS vs direct spool

```text
Need ≥2 colors or auto filament switch?
  ├─ NO → direct spool (simpler)
  └─ YES → filaments dry + tubes unkinked?
        ├─ NO → dry + fix path first
        └─ YES → AMS Lite; start Studio flush defaults
              ├─ Marble/bleed? → raise flush carefully — validate on printer
              ├─ Load fail? → path/grind/humidity — not “flow ratio”
              └─ Huge waste? → reduce color regions / swaps
```

## A1 Mini rules

### Architecture implications

| Factor | Effect on prints |
|---|---|---|
| Longer filament path | More drag; wet/soft filament grinds easier |
| Tip cutting / feed cycles | Load failures look like under-extrusion |
| Flush / purge volumes | Plastic waste + time; marble if too low |
| Open slots ambient | Humidity exposure over days |
| Prime tower | Stabilizes pressure across changes |

### Non-negotiable rules

1. **Dry filaments** — AMS is not a dry box unless you add a real dry strategy.
2. **Don’t mix PLA and PETG** in one job without a strong reason (different temps, nasty purge).
3. **Minimize color changes** on miniatures — purge destroys time and can scar detail.
4. **Unkinked tubes**, fully seated connectors; inspect after every jam.
5. **Flush multiplier:** start at Studio default; adjust only after seeing marble or waste — **validate on printer**.
6. After PETG in a slot, purge thoroughly before PLA cosmetics.
7. Stop retry storms into grind piles — clear debris ([maintenance](a1-mini-manutencao.md)).

### Flush / purge / tower

| Setting | Starting stance | Notes |
|---|---|---|
| Flush volume | Bambu preset | Dark→light needs more |
| Flush multiplier | ~0.8–1.2× after observation | Lower wastes less; risks bleed |
| Prime tower | On for many swaps | Off only if proven stable |
| Tip wiping | Studio default | Don’t disable while chasing strings |
| Purge tower placement | Inside envelope margin | Watch 180³ packing |

### Failure modes

| Symptom | Likely AMS-related cause | Action |
|---|---|---|
| Load/unload fail | Kink, dust, soft wet filament, misseat | Clear path; dry; clean gears |
| Mid-print gaps | Partial feed / grind | Inspect extruder debris; dry |
| Color marble | Flush too low | +flush; order light colors carefully |
| Huge waste | Too many swaps / flush high | Redesign color regions; reduce changes |
| String nests at changes | Wet PETG / temp / retract | Dry; PETG-specific tuning |
| False “under-extrusion” | Path restriction | [Extrusion](a1-mini-extrusao-e-bico.md) after path OK |
| Slot humidity over days | Open ambient | Dry before critical cosmetics |

### PLA vs PETG in AMS Lite

| | PLA | PETG |
|---|---|---|
| AMS suitability | Good when dry | Possible; stricter dry |
| Stringing risk | Medium if wet | High |
| Flush needs | Moderate | Often ≥ preset (stains more) |
| Recommendation | Primary for multicolor characters | Prefer direct for mono functional |
| Mixed job | Avoid | Avoid |

### Workflow SOP (multicolor character)

1. Dry all active spools.
2. Assign slots; plan fewest swaps (group regions).
3. Use [character/detail PLA profile](../perfis-a1-mini/pla-personagem-detalhe-0.4.md) as base.
4. Enable prime tower if ≥ several changes.
5. First print: accept waste; tune flush only after inspecting seams.
6. If load errors: stop and fix path — don’t keep retrying into a grind pile.
7. Cite this page + character purpose in `plan.md`.

### Do / don’t

| Do | Don’t |
|---|---|
| Dry before multicolor faces | Treat AMS as a dryer |
| Minimize face swaps | Perfect color count at any waste cost |
| Fix kinks first | Chase flow ratio on load fails |
| Direct spool for mono PETG tools | Mix PLA/PETG casually |

## Suggested presets (PLA)

| Parameter | Value | Reason |
|---|---|---|
| Hardware | AMS Lite slots | Multicolor characters |
| Filament | Dry PLA Basic/Matte etc. | Cosmetics |
| Flush multiplier | 0.8–1.2× preset | Waste vs purity — **validate** |
| Prime tower | On if many swaps | Pressure stability |
| Process | A1 Mini 0.4 PLA intent profile | [Profiles](../perfis-a1-mini/INDEX.md) |
| Color changes | Minimize on faces | Detail preservation |
| Envelope | Include tower in 180³ check | Fit |

## Suggested presets (PETG)

| Parameter | Value | Reason |
|---|---|---|
| AMS use | Possible | Dry aggressively |
| Flush | ≥ Studio preset | PETG stains/bleeds more |
| Prefer | Direct spool for mono tools | Fewer failure modes |
| If AMS PETG | Slow outer; expect strings | [PETG](../materiais/petg.md) |
| Mixed PLA/PETG job | Avoid | Purge + temp hazards |
| Validation | Short coupon before long job | Path + dry proof |

## Related

- [Characters](../proposito/personagens.md)
- [Drying & humidity](../materiais/secagem-e-umidade.md)
- [Stringing & retract](../qualidade-e-acabamento/stringing-e-retract.md)
- [Under-extrusion](../troubleshooting/under-extrusion.md)
- [Extrusion & nozzle](a1-mini-extrusao-e-bico.md)
- [Maintenance](a1-mini-manutencao.md)
- [Overview](a1-mini-visao-geral.md)
- [PLA](../materiais/pla.md) · [PETG](../materiais/petg.md)
- [Hardware INDEX](INDEX.md)
- [Wiki hub](../INDEX.md)

## Sources

- Bambu Wiki AMS Lite documentation
- Community load-fail / humidity patterns (path-first diagnosis)
- Studio flush/prime tower behavior (conceptual; **validate on printer**)
- Project character multicolor SOP
