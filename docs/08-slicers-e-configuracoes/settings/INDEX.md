---
id: hub.slicers.settings
title: Settings semânticos (slicer)
summary: 'Hub dos conceitos de configuração de fatiamento: altura de camada, largura
  de linha, paredes, preenchimento, temperaturas, cooling, velocidades, retração,
  suportes, brim/raft/skirt, flow/PA e costura. Cada página prioriza o significado
  físico/processual e anota nomes típicos no Bambu Studio sem fixar caminhos de UI
  obsoletos. Use com presets A1 Mini e TDS do filamento.'
doc_type: hub
domain:
- slicing
- fff
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 3-months
related:
- hub.slicers
- printer.bambu-lab-a1-mini
tags:
- hub
- settings
- slicer
technology: []
process: []
applies_to: []
not_for: []
sources: []
prerequisites: []
supersedes: []
aliases_pt_br: []
aliases_en: []
---
# Settings semânticos (slicer)

Voltar: [Slicers e configurações](../INDEX.md)

Páginas atômicas (conceito primeiro; notas de nome Bambu Studio sem path eterno):

| Página | ID |
|---|---|
| [Altura de camada](altura-de-camada.md) | `setting.layer-height` |
| [Largura de linha](largura-de-linha.md) | `setting.line-width` |
| [Paredes e cascas](paredes-e-cascas.md) | `setting.walls-shells` |
| [Preenchimento](preenchimento.md) | `setting.infill` |
| [Temperaturas](temperaturas.md) | `setting.temperatures` |
| [Cooling](cooling.md) | `setting.cooling` |
| [Velocidades](velocidades.md) | `setting.speeds` |
| [Retração](retracao.md) | `setting.retraction` |
| [Suportes](suportes.md) | `setting.supports` |
| [Brim, raft e skirt](brim-raft-skirt.md) | `setting.brim-raft-skirt` |
| [Flow e pressure advance](flow-e-pressure-advance.md) | `setting.flow-pressure-advance` |
| [Costura (seam)](costura-seam.md) | `setting.seam` |

## Como usar

1. Partir do preset **A1 Mini** + material no Studio
2. Ler o conceito semântico antes de caçar o campo na UI
3. Uma variável por teste; secar filamento antes de temp/retract/flow
4. Respeitar bed ≤ 80 °C na A1 Mini ([tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md))

## Relacionados

- [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md)
- [Índice por sintoma FFF](../../12-problemas-e-diagnostico/fff/indice-por-sintoma.md)
