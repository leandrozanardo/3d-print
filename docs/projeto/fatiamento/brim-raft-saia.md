# Brim, raft & skirt

## Summary

**Skirt**: prime + wipe. **Brim**: anchors small footprints and tall slender parts. **Raft**: rare on A1 Mini with good PEI — last resort for impossible bases or extreme warp. Avoid raft on miniatures (ruins base). Adhesion helpers are not substitutes for a **dirty plate** — see [bed & adhesion](../hardware/a1-mini-mesa-e-adesao.md).

## When to use

| Situation | Use this page |
|---|---|
| Miniature with tiny bed contact | Yes — brim |
| Warping / adhesion failure | Yes + bed/troubleshoot |
| Stubborn PETG | Brim first |
| Almost every job | Skirt |
| Character/mini base cosmetics | Avoid raft |

## Decision tree

```text
adhesion helper?
    │
    ├─ almost always ──► skirt 1–2 loops
    ├─ tiny base / tall_slender / mini ──► brim 5–8 mm
    ├─ PETG warp stubborn ──► brim first; clean plate; dry
    ├─ still failing after brim + plate check ──► raft (last resort)
    └─ cosmetic bottom critical? ──► no raft; fix plate/temp/Z
```

## A1 Mini rules

### Feature matrix

| Feature | When | Avoid |
|---|---|---|
| Skirt | almost always 1–2 loops | — |
| Brim | base ≲10–15 mm or tall slender | if removal damages rim detail |
| Raft | last resort | miniatures / characters (base quality) |

### Non-negotiables

1. Typical brim width **5–8 mm**; brim-object gap ~**0.1 mm** — **validate on printer**.
2. Clean PEI; correct first-layer height before adding raft.
3. PETG: brim more often; raft only if brim fails.
4. Document helper used in `plan.md`.
5. After raft: expect ugly bottom — disclose in plan.

### Purpose defaults

| Purpose | Default helper |
|---|---|
| Miniature / character | skirt + brim if needed; no raft |
| Tool | skirt; brim if small feet |
| Decorative | skirt; brim if tippy |
| Vase | skirt; brim if narrow base |

### Failure modes

| Symptom | Helper lean | Also check |
|---|---|---|
| Tip-over | Brim | Orientation / speed |
| Corner peel | Brim | Drafts, bed temp, [warping](../troubleshooting/warping.md) |
| Won’t stick at all | Not raft first | Dirty plate / Z |
| Ruined mini base | You used raft | Switch to brim |
| Brim welded (PETG) | Larger gap; cold remove | Plate type |

### Do / don’t

| Do | Don’t |
|---|---|
| Skirt every job | Raft every décor “just in case” |
| Brim tiny feet | Ignore dirty PEI |
| Cool before peel | Yank hot PETG brim |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Skirt | 1–2 | Prime |
| Brim | 5–8 mm if needed | Adhesion |
| Brim-object gap | ~0.1 mm | Removable — **validate** |
| Raft | off | Default |
| First layer | slow | Helper quality |

## Suggested presets (PETG)

| Parameter | Value | Why |
|---|---|---|
| Brim | more frequent | Warping |
| Gap | may need slightly larger | Stickier |
| Raft | only if brim fails | Hard removal |
| Plate | textured preferred | Release |
| Cool fully | before remove | Coating safety |

## Related

- [Bed & adhesion](../hardware/a1-mini-mesa-e-adesao.md)
- [Adhesion failure](../troubleshooting/falha-adesao.md)
- [Warping](../troubleshooting/warping.md)
- [Elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md)
- [Miniatures](../proposito/miniaturas.md)
- [Classify geometry](../geometria/classificar-geometria.md) (`tall_slender`)
- [Slicing INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Prusa brim/raft KB adapted
- Bambu plate adhesion tips
- Community A1 Mini PEI + brim practice
- Project no-raft-on-minis rule
