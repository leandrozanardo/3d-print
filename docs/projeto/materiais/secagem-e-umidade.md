# Drying & humidity — A1 Mini

## Summary

**Wet filament is not a slicer problem.** Moisture causes stringing, bubbles, steam pops, apparent under-extrusion, weak/porous layers, and dull inconsistent surfaces. PLA is moderately hygroscopic; **PETG is stricter**. The A1 Mini (open frame, AMS Lite or direct spool) does **not** dry filament during a print. Dry and store correctly **before** chasing retract, temperature, or “flow bugs.”

## When to use

| Trigger | Action |
|---|---|
| Spool open > a few days in humid climate | Dry PLA; **always consider dry for PETG** |
| Hotend pops / crackles / steam | Dry immediately |
| Sudden stringing on a previously good spool | Dry before retract tower |
| PETG any doubt | Dry first |
| Soft, flexible, or swollen filament path feed issues | Dry + check grind |
| Before blaming under-extrusion or AMS Lite | Dry + inspect path ([AMS](../hardware/a1-mini-ams-lite.md)) |
| Long multi-day print series | Store sealed between jobs |

**Decision tree**

```text
Symptoms: pops, bubbles, hair stringing, foam layers, weak Z?
  └─ YES → Dry filament (table below) → reprint short retract/temp test
Filament storage unknown / PETG?
  └─ YES → Dry prophylactically
Only cosmetics slightly dull, spool sealed with desiccant?
  └─ Maybe skip; still prefer dry if PETG
After drying still bad?
  └─ Then temp/retract/clog ([troubleshooting](../troubleshooting/INDEX.md))
```

## A1 Mini rules

### Why the printer cannot “fix” wet filament

- Hotend temperature vaporizes water into steam → voids, pops, diameter noise.
- Steam breaks melt consistency → volumetric extrusion looks low even when gears feed.
- PETG oozes more when wet → stringing that no retract length will fully hide.
- AMS Lite adds tube volume — soft/wet filament increases grind and load failures (false under-extrusion).

### Hygroscopy & signs

| Sign | PLA | PETG | Confounding |
|---|---|---|---|
| Audible pops in hotend | Common when wet | Very common | Partial clog can click too |
| Micro-bubbles / foam in extrusion | Possible | Classic | Temp too high alone less foamy |
| Sudden whisker stringing | Possible | Severe | Retract too short (dry first) |
| Matte, brittle, porous walls | Possible | Common | Underextrusion / cold |
| Weak layer adhesion | Possible | Common | Cooling too high |
| Soft filament / grinding | Less common | Common when wet | Wrong gear tension |

### Drying ranges (order-of-magnitude)

> Spool material (cardboard vs plastic) and dryer accuracy vary. **Validate on dryer / do not exceed spool Tg.** If the spool softens or ovalizes, lower temperature.

| Material | Typical dry temp | Typical time | Notes |
|---|---|---|---|
| PLA | 45–55 °C | 4–6 h | Avoid melting cardboard/plastic spool |
| PETG | 65–70 °C | 4–8 h | More critical; re-dry after open storage |
| Storage after dry | Sealed bag + desiccant | Continuous | AMS Lite is not a dry box unless designed as such |

Optional: filament dryer with active humidity control beats oven improvisation. Kitchen ovens often overshoot — prefer dedicated dryer.

### Storage rules (project SOP)

1. After open: bag + desiccant; vacuum bag if available.
2. Label open date on spool.
3. PETG: treat as “dry before important job” by default.
4. Do not leave PETG on AMS Lite for weeks in humid rooms without a dry strategy.
5. Desiccant: replace/regenerate when indicator shows spent — **validate** brand guidance.

### Interaction with A1 Mini workflows

| Workflow | Humidity impact | Mitigation |
|---|---|---|
| Direct spool on printer | Ambient exposure during print | Dry first; enclose spool loosely if needed |
| AMS Lite multi-day | Continuous ambient in slots | Dry filaments; rotate sealed spools |
| Multicolor purge-heavy | Wet + purge = worse marble/strings | Dry + adequate flush |
| Vase mode PLA | Single wall shows bubbles | Dry for show pieces |
| PETG functional | Strength depends on solid melt | Dry non-negotiable |

### Failure modes mapped to moisture vs other

| Observation | Moisture likely? | If dry, check instead |
|---|---|---|
| Pops + stringing together | High | — |
| Stringing only, silent hotend | Medium | Temp high / retract / Z-hop |
| Gaps mid-print, grinding | Medium–high | Path kink, clog, volumetric |
| First layer fails only | Low | Plate / Z / bed temp |
| Layer shift | Very low | Mechanical ([layer shift](../troubleshooting/layer-shift.md)) |

## Suggested presets (PLA)

There is **no slicer setting that replaces drying**. After drying PLA:

| Step | Action | Pass criteria |
|---|---|---|
| 1 | Dry 45–55 °C, 4–6 h order | Spool not deformed |
| 2 | Load A1 Mini; short purge | No steam pops |
| 3 | Retract tower @ usual PLA temp | Whiskers reduced vs wet baseline |
| 4 | Resume decorative/mini profile | Surface consistent |

If still stringing: lower nozzle 5 °C, then retract +0.1 mm — **validate on printer**.

## Suggested presets (PETG)

| Step | Action | Pass criteria |
|---|---|---|
| 1 | Dry 65–70 °C, 4–8 h order | **validate dryer** |
| 2 | Print immediately or store sealed | — |
| 3 | Use [PETG profile](../perfis-a1-mini/petg-funcional-0.4.md) | Not PLA preset |
| 4 | Temp tower then retract tower | Clean bridges, limited hairs |
| 5 | If still foamy | Re-dry longer; check dryer accuracy |

Never “fix” wet PETG by raising temperature alone — that often increases stringing and degradation.

## Related

- [PLA](pla.md)
- [PETG](petg.md)
- [Temperature table](tabela-temperaturas-a1-mini.md)
- [Stringing & retract](../qualidade-e-acabamento/stringing-e-retract.md)
- [Under-extrusion](../troubleshooting/under-extrusion.md)
- [AMS Lite](../hardware/a1-mini-ams-lite.md)
- [Extrusion & nozzle](../hardware/a1-mini-extrusao-e-bico.md)
- [Materials index](INDEX.md)
- [Wiki hub](../INDEX.md)
- [Ebook](../../ebook/INDEX.md)

## Sources

- Hygroscopy concepts (CNC Kitchen / community dryer practice)
- Bambu storage / filament handling recommendations (conceptual)
- Local ebook humidity notes when converted
- Manufacturer spool dryer labels — always **validate** against your dryer
