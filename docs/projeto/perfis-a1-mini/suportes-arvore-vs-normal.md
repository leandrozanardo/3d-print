# Supports — tree vs normal

## Summary

Quick pick for A1 Mini in Bambu Studio: **tree** for organics/minis/characters; **normal / snug** for flat faces, slots, and mechanical parts. Always set **interface + top Z gap**; paint tips off noble surfaces; document choice in `plan/*.md`.

Supports are part of the print recipe (mode B), not an afterthought.

## When to use

| Situation | Action |
|---|---|
| Support ≠ none | Open this matrix + purpose profile |
| Switching purpose profiles | Re-evaluate tree vs normal |
| PETG after PLA success | Increase Z gap / interface — don’t copy PLA gaps |
| Preview shows tips on faces | Paint-off or reorient |

## When NOT to use

| Situation | Rule |
|---|---|
| Spiral vase profiles | Supports **off** |
| “Zero support” that destroys overhangs | Prefer firm removable supports |
| PETG with PLA Z gaps | Will weld — see [hard supports](../troubleshooting/suporte-dificil-remover.md) |
| Raft as support substitute | Wrong tool; fix orientation/brim first |

## Decision tree

```text
Geometry class?
  ├─ Organic / mini / character → TREE (default)
  ├─ Box / slot / flat mating face → NORMAL / SNUG
  └─ Mixed → tree on organic; normal on mechanical regions (paint + blockers)
Material?
  ├─ PLA → top Z ~0.20–0.25 mm; interface 2–4
  └─ PETG → top Z ~0.25–0.30 mm; interface 4–5
Noble face contact?
  ├─ YES → paint-off / reorient / threshold tweak
  └─ NO → proceed; still keep interface on
```

## Decision matrix

| Criterion | Tree | Normal / Snug |
|---|---|---|
| Miniature / character | Prefer | Rare |
| Blocks / boxes / slots | Light overhangs only | Prefer |
| Filament use | Variable (often less) | Predictable |
| Scar on organic | Usually less | Larger area |
| Removal in cavities | Good branches | Can jam |
| Flat supported ceiling | OK with interface | Excellent with snug |
| Predictable XY walls under support | Weaker | Stronger |

## A1 Mini rules

1. Overhang threshold start **30–40°** (finer minis often ~30–35°).
2. **Interface always** on cosmetic or mating faces that must survive removal.
3. Paint-on / paint-off to keep tips off noble surfaces.
4. Log type + top Z + interface + threshold in plan.
5. PETG gaps larger than PLA — non-negotiable.
6. Remove cold; cut trapped supports in sections.
7. If welded: +0.05 mm top Z before sanding forever.
8. Uncertain Z → print a 20 mm coupon — **validate on printer**.

## Bambu Studio fields (PLA)

| Case | Type | Top Z | Interface | Notes |
|---|---|---|---|---|
| Miniature | Tree | 0.20 mm | 2–4 | Paint off face |
| Character / bust | Tree | 0.20–0.25 | 2–4 | Face first |
| Decorative organic | Tree | 0.20 | 3–4 | Hide scars |
| Tool with hole/slot | Normal + paint | 0.20–0.25 | 2–3 | Flat faces |
| Large flat ceiling | Normal/snug | 0.20–0.25 | 3–4 | Density not max |
| Tiny footprint + supports | Tree or normal | as above | as above | Add brim |

## Bambu Studio fields (PETG)

| Case | Type | Top Z | Interface | Notes |
|---|---|---|---|---|
| Functional organic | Tree | 0.25–0.30 | 4–5 | Dry first |
| Mechanical flats | Normal/snug | 0.25–0.30 | 4–5 | Anti-weld |
| Mixed | Per region | 0.25–0.30 | 4–5 | Don’t mix Z blindly |

XY distance order: **0.35–0.50 mm** (raise if pliers can’t enter). Pattern density: lower if removal scars; raise if sagging.

## PLA vs PETG support columns

| Parameter | PLA | PETG |
|---|---|---|
| Top Z (start) | 0.20 mm | 0.25–0.30 mm |
| Interface layers | 2–4 | 4–5 |
| Weld risk | Medium | High |
| Cooling while supporting | High OK | Moderate |
| First fix if welded | +0.05 Z | +0.05 Z + more interface |

## Failure modes → first checks

| Symptom | Likely cause | Fix |
|---|---|---|
| Pliers won’t enter | Z too small / no interface | +0.05 Z; add interface |
| Face ripped | Dense contact / wrong type | Lower density; tree↔normal |
| PETG fused | Material weld | Z 0.25–0.35; interface 4–5 |
| Support trapped in cavity | Topology | Section cut; prefer tree |
| Overhang sagged / melted | Threshold too high / no support | Lower angle; add support |
| Base still scars after +Z | Interface missing | Interface on; style change |

## Profile cross-links

| Profile | Typical support |
|---|---|
| [pla-miniatura-0.4](pla-miniatura-0.4.md) | Tree |
| [pla-personagem-detalhe-0.4](pla-personagem-detalhe-0.4.md) | Tree + paint |
| [pla-ferramenta-resistente-0.4](pla-ferramenta-resistente-0.4.md) | Normal/snug |
| [pla-decorativo-superficie-0.4](pla-decorativo-superficie-0.4.md) | Minimal; tree if organic |
| [pla-vaso-vase-mode-0.4](pla-vaso-vase-mode-0.4.md) | Off |
| [petg-funcional-0.4](petg-funcional-0.4.md) | Normal or tree; PETG Z |

## Plan.md must cite

- Tree vs normal (or mixed)  
- Threshold °  
- Top Z + interface count  
- Paint-off regions  
- Material (PLA/PETG) justifying Z  

## Related

- [Support strategy](../fatiamento/suportes-estrategia.md)
- [Face & interface](../fatiamento/suportes-face-e-interface.md)
- [Hard-to-remove supports](../troubleshooting/suporte-dificil-remover.md)
- [Post-processing](../qualidade-e-acabamento/pos-processamento.md)
- [Profiles index](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Bambu Studio support modes (tree / normal / snug)
- Forum tree vs normal patterns · Ellis support notes
