# How to use this wiki

## Summary

English knowledge network for hybrid optimization (**mode B**): print recipe + light mesh ops. Humans and agents navigate indexes and backlinks; every `3ds/plan/*.md` must cite pages used.

## When to use

- Before slicing any new part on A1 Mini.
- When the playbook asks for geometry/purpose classification.
- On failure — start at the [symptom → cause matrix](troubleshooting/matriz-sintoma-causa.md).

## A1 Mini rules

1. Hardware scope: **A1 Mini only** (don’t paste X1/P1 presets unadapted).
2. Reference slicer: **Bambu Studio**.
3. Primary material: **PLA**; **PETG** always has its own tables/profile.
4. Page shape: Summary → When to use → A1 Mini rules → PLA/PETG tables (if applicable) → Related → Sources. Profiles also list **when NOT to use** + concrete Studio fields.
5. No orphans: inbound link via section INDEX + hub; outbound Related links.
6. Uncertain values: mark **validate on printer**.
7. In `3ds/plan/<model>.md`, list relative paths of pages consulted.
8. After wiki edits: `python -m core validate-wiki docs`.

## How to navigate

1. Enter via [hub](INDEX.md) or [network map](mapa-da-rede.md).
2. Geometry → purpose → profile → slicing tweaks.
3. On failure: troubleshooting → return to profile.
4. Full SOP: [optimize model](workflow/otimizar-modelo.md) + [playbook](../../playbook.md).

## Related

- [Hub](INDEX.md)
- [Network map](mapa-da-rede.md)
- [Optimize model](workflow/otimizar-modelo.md)
- [Write plan.md](workflow/como-escrever-plan-md.md)
- [Deployment phases](IMPLANTACAO-FASES.md)

## Sources

- Project decisions: `start_plan.md`
- [Sources & attribution](fontes-e-atribuicao.md)
