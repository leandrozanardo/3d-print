---
id: setting.supports
title: Suportes (FFF)
summary: 'Suportes FFF são estruturas temporárias que sustentam overhangs, bridges
  difíceis e ilhas até haver material abaixo. Conceito: ângulo de overhang, interface
  (contact Z / top interface), padrão (normal vs tree), densidade e remoção. No Bambu
  Studio: Enable support, type, threshold angle, raft/interface options (UI muda).
  Preferir reorientar/design antes de suporte denso. Diferencie de brim/raft (adesão
  à mesa) e de tipagem de resina.'
doc_type: setting
domain:
- slicing
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- slicer.bambu-studio
- printer.bambu-lab-a1-mini
not_for:
- resin-support-tips-as-identical
- eternal-ui-path-pinning
- universal-overhang-angle
slicers:
- slicer.bambu-studio
printers:
- printer.bambu-lab-a1-mini
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
related:
- setting.brim-raft-skirt
- setting.cooling
- setting.speeds
- setting.layer-height
- defect.fff.warping
- defect.fff.spaghetti
- hub.slicers.settings
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- support overhang
- interface de suporte
aliases_en:
- FFF supports
- tree support
- overhang threshold
- support interface
tags:
- setting
- supports
- fff
- slicer
setting_tags:
- supports
---
# Suportes (FFF)

Hub pai: [Settings](INDEX.md)

## Conceito semântico

**Support** = geometria sacrificial gerada pelo slicer para que extrusões posteriores tenham “chão”. Parâmetros semânticos: **quando** gerar (ângulo/threshold), **estilo** (normal/grid vs tree/organic), **interface** (camadas de contato), **Z/XY gap**, densidade e remoção (soluble vs breakaway).

## Nomes no Bambu Studio (notas)

Busque **Support**, **Enable support**, **Type** (normal/tree), **Threshold angle**, **Top Z distance**, interface/raft options. Paths mudam — conceito > menu eterno.

## Unidade / tipo

Ângulo (°), gaps (mm), densidade (%), booleans (enable, on build plate only, etc.).

## Mecanismo

Overhang além do que cooling + geometria de linha sustentam → sagging, curling, falha. Suporte troca **tempo + cicatriz + filamento** por previsibilidade. Tree reduz contato em muitas geometrias; normal pode ser mais previsível em bases largas — **validar na sua peça**.

## Dependências

- [Cooling](cooling.md) e [velocidades](velocidades.md) em overhangs curtos podem evitar suporte
- [Altura de camada](altura-de-camada.md): camadas mais finas mudam o ângulo efetivo
- [Brim/raft](brim-raft-skirt.md): adesão à mesa ≠ suporte de overhang
- Material: PETG gruda mais em interface — gap/interface importam

## Decisão: suporte vs redesign

| Preferir | Quando |
|---|---|
| Reorientar | Face estética livre + envelope cabe |
| Filete / chanfro / split | Produção repetível |
| Bridge curto + cooling | Vãos curtos sem ilha |
| Tree support | Contato mínimo em organics |
| Normal + interface | Superfície de apoio larga / previsibilidade |
| Soluble (se disponível) | Interface crítica e fluxo multi-material maduro |

## Heurísticas (sem ângulo universal)

- Comece pelo **threshold do preset** da máquina/material; ajuste após ver preview
- **On build plate only** quando a peça se auto-sustenta no ar mas precisa de base
- Interface: melhora superfície de contato; aumenta remoção
- Gap Z pequeno demais → solda; grande demais → undersurface ruim
- Não ligue suporte denso “por padrão” em toda peça cosméticas

## Efeitos

| ↑ suporte (densidade/área) | ↓ suporte |
|---|---|
| Mais estabilidade; mais tempo/cicatriz | Risco de sag se overhang real |
| Remoção mais trabalhosa | Superfície limpa se a peça aguenta |

## Ordem de ataque

1. Preview de overhang (pintura de suporte se disponível)
2. Reorientar / quebrar peça
3. Tipo tree vs normal
4. Interface + Z distance (uma variável)
5. Densidade
6. Pós: remoção sem alavanca que quebre a peça

## Relação com defeitos

- Empenamento de base: [empenamento](../../12-problemas-e-diagnostico/fff/empenamento.md) — brim pode ser necessário **além** de suporte
- Não confundir com tipagem de [resina](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md)

## Relações com outros conceitos

- enables → overhangs/ilhas FFF
- trades-off → tempo, material, scar
- complements → brim/raft (mesa)
- tuned-with → cooling, layer height

## Veja também

- [Brim, raft e skirt](brim-raft-skirt.md)
- [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md)
- Método geral de tuning: [Ellis](../../22-fontes/ellis-print-tuning-guide.md), [Teaching Tech](../../22-fontes/teaching-tech-calibration.md)

## Fontes

- [source.ellis-print-tuning-guide](../../22-fontes/ellis-print-tuning-guide.md) (método; não perfil A1 Mini)
- [source.teaching-tech-calibration](../../22-fontes/teaching-tech-calibration.md)
- Ângulos/gaps numéricos: preset Bambu + teste na peça — não tabelados como lei universal

## Lacunas

- Guia visual tree vs normal com cupons locais
- Fluxo soluble/multi-material Bambu quando aplicável ao lab
