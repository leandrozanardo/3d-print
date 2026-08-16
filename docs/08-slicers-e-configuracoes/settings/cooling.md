---
id: "setting.cooling"
title: "Cooling (part cooling / ventilação da peça)"
summary: "Part cooling é o fluxo de ar do part-cooling fan sobre o cordão fresco. Ajuda overhangs, bridges e detalhe; em excesso esfria a interface e enfraquece a solda Z — crítico em PETG e polímeros de engenharia. No Bambu Studio: Fan speed / cooling por camada (nomes variam). Em A1 Mini (frame aberto), draft ambiente soma ao fan — controle corrente de ar. Ajuste por material e geometria; não use max fan para ‘matar stringing’ em PETG."
doc_type: "setting"
domain: ["slicing", "fff", "quality"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "slicer.bambu-studio", "printer.bambu-lab-a1-mini"]
not_for: ["max-fan-to-fix-petg-stringing", "eternal-ui-path-pinning"]
settings: ["setting.cooling", "setting.part-cooling"]
slicers: ["slicer.bambu-studio"]
printers: ["printer.bambu-lab-a1-mini"]
materials: ["material.pla", "material.petg", "material.tpu"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.bambu-a1-mini-tech-specs"]
related: ["setting.temperatures", "defect.fff.warping", "defect.fff.delamination", "defect.fff.stringing", "material.petg", "material.pla"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["cooling", "ventilação da peça", "fan da peça", "part cooling"]
aliases_en: ["part cooling", "cooling fan", "fan speed"]
tags: ["setting", "cooling", "fan"]
---

# Cooling (part cooling)

Hub pai: [Settings](INDEX.md)

## Conceito semântico

**Part cooling** = ar forçado sobre a geometria impressa para solidificar rápido o suficiente para overhangs/bridges, sem destruir a solda entre camadas. Diferente de cooling do hotend (heat break), que é hardware.

## Nomes no Bambu Studio (notas)

Busque **Fan speed**, min/max fan, “Don’t cool first N layers”, overhang cooling. Rótulos mudam — use busca.

## Unidade / tipo

% de PWM do fan (0–100) e regras por camada/feature.

## Mecanismo

↑ fan → cordão congela antes de escorrer; overhang melhora; interface Z mais fria → bonding pior.  
↓ fan → melhor solda; sag em pontes; risco de deformar detalhe fino em PLA.

Frame aberto da A1 Mini ([tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md) / página da impressora): **corrente de ar ambiente** age como cooling assimétrico → [empenamento](../../12-problemas-e-diagnostico/fff/empenamento.md).

## Dependências

- Material ([PLA](../../05-materiais/fff/pla.md) tolera alto; [PETG](../../05-materiais/fff/petg.md) prefere moderado)
- [Temperaturas](temperaturas.md) e velocidade de parede
- Altura/largura do cordão
- Early layers vs resto

## Efeitos e sintomas

| Fan alto demais | Fan baixo demais |
|---|---|
| Delaminação, split layers — [delaminação](../../12-problemas-e-diagnostico/fff/delaminacao.md) | Sag, bridges ruins, cantos derretidos |
| Warp por choque térmico precoce | Overhangs caídos |
| PETG frágil em Z | PLA “melado” em detalhe |

## Heurísticas (partida — validar)

1. First layers: fan baixo / off por N camadas (preset)
2. PLA cosmético: fan alto após base estável
3. PETG: moderado; **não** max fan para esconder strings — secar + temp/retract
4. Bloquear AC direto na mesa antes de culpar o % do fan
5. Uma mudança por teste

## Relações com outros conceitos

- trades-off-with → overhang quality vs Z-strength
- worsened-by → draft em aberto
- couples-with → temperatures, speeds

## Veja também

- [Temperaturas](temperaturas.md)
- [Empenamento](../../12-problemas-e-diagnostico/fff/empenamento.md)
- [Delaminação](../../12-problemas-e-diagnostico/fff/delaminacao.md)

## Fontes

- Princípio térmico de interlayer bonding
- Contexto A1 Mini aberto: tech specs + página da impressora
- Presets Studio por material

## Lacunas

- Curvas de fan por overhang % medidas localmente
- Aux fan / chamber fan em outras máquinas Bambu
