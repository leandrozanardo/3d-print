# Stringing & retraction

## Summary

Hairs between towers: **wet filament**, **hot nozzle**, bad **retract**, or travel without combing. A1 Mini is **direct drive** → short retract; **never copy Bowden lengths**. Dry first — especially PETG. Change **one** variable per test.

## When to use

| Trigger | Use |
|---|---|
| Hair on miniatures / characters | Yes |
| PETG “spider web” | Yes — moisture first |
| After color/material changes | Yes (residue + moisture) |
| Retract tower planned | Yes after dry |

## When NOT to use

- Gaps / missing extrusion → [under-extrusion](../troubleshooting/under-extrusion.md).
- Soft melted detail without hairs → [lost detail](../troubleshooting/detalhe-perdido-miniatura.md).
- Wet pops/foam → dry page, not more retract.

## Decision tree / attack order

```text
1 Dry filament? ──NO──► dry → retest
2 Still hairs? ──YES──► nozzle −5 °C
3 Still? ──► retract length ±0.2 mm / speed (tower) from Bambu preset
4 Still? ──► travel avoidance / combing On
5 Still? ──► Z-hop on/off (can WORSE stringing) — validate
6 Wipe/coast ──► leave Bambu defaults until retract/temp settled
```

## A1 Mini rules

1. Dry before retract towers ([secagem](../materiais/secagem-e-umidade.md)).
2. Direct drive lengths are short — Bowden 5–8 mm will grind/jam.
3. One variable per test.
4. Prefer filament-profile retract over process hacks.
5. Z-hop is optional and may increase strings — **validate**.
6. PETG: expect more hairs even when “tuned”; cosmetics secondary on functional parts.
7. AMS: wet slot or low wipe looks like bad retract.
8. Uncertain retract → tower coupon — **validate on printer**.

## Retract starting ranges (order of magnitude)

| Material | Retract length | Retract speed | Notes |
|---|---|---|---|
| PLA | 0.4–1.2 mm | 30–60 mm/s | Start Bambu PLA DD |
| PETG | 0.6–1.4 mm | 30–50 mm/s | Only after dry |

Brand + humidity dominate — treat as **validate on printer**.

## Suggested presets (PLA)

| Field | Action | Why |
|---|---|---|
| Dry | Confirm | Moisture mask |
| Temp | −5 °C if hairs | Less ooze |
| Retract | ±0.2 mm from preset | Tower |
| Travel | Avoid crossing / combing | Less draw |
| Z-hop | Test off first | Often cleaner |
| Wipe | Studio default | Stability |

## Suggested presets (PETG)

| Field | Action | Why |
|---|---|---|
| Dry | Mandatory 65–70 °C order | #1 cause |
| Temp | Tower; don’t run crazy hot | Ooze |
| Retract | Bambu PETG then ±0.2 | After dry |
| Cooling | Mid — don’t max to “kill strings” | Weak layers |
| Z-hop | Often worse | **validate** |
| Speed | Lower outer/travel chaos | Less ooze time |

## PLA vs PETG columns

| Lever | PLA | PETG |
|---|---|---|
| Moisture priority | High | Critical |
| Retract length | Shorter OK | Slightly longer order |
| Acceptable residual hair | Low for minis | Higher for tools |
| Cooling to fight string | Often helps | Trade vs layer bond |

## Failure modes → first checks

| Symptom | Likely cause | Fix |
|---|---|---|
| Fog of fine hairs | Wet / hot | Dry; −5 °C |
| Thick strings | Retract short / travel | +retract small; combing |
| Strings only after AMS swap | Wipe/flush / wet color | AMS path + dry |
| No string but blobs on travel start | Wipe/coast/temp | Small wipe; temp |
| Grind on long retract | Copied Bowden length | Reset to DD short |

## Related

- [Drying & humidity](../materiais/secagem-e-umidade.md)
- [PETG](../materiais/petg.md)
- [Extrusion & nozzle](../hardware/a1-mini-extrusao-e-bico.md)
- [PETG functional profile](../perfis-a1-mini/petg-funcional-0.4.md)
- [AMS Lite](../hardware/a1-mini-ams-lite.md)
- [Quality index](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Teaching Tech retraction · Ellis stringing
- Bambu forum PETG patterns · direct-drive practice
