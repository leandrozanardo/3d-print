---
id: component.part-cooling
title: Cooling de peça (part cooling) em FFF
summary: Part cooling é o fluxo de ar dirigido à peça (não o fan do heatsink do hotend)
  para solidificar overhangs, pontes e detalhes. PLA tolera/exige cooling alto após
  a base; PETG e peças estruturais pedem fan mais moderado para preservar união entre
  camadas e reduzir warp. Em A1 Mini (frame aberto) o cooling do ambiente (draft)
  soma ao fan — controle os dois. Ajuste no Bambu Studio por perfil e valide; não
  use um % universal.
doc_type: component
domain:
- hardware
- fff
- process
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- printer.bambu-lab-a1-mini
- material.pla
- material.petg
not_for:
- confuse-with-hotend-heatsink-fan
- max-fan-as-default-for-petg
printers:
- printer.bambu-lab-a1-mini
slicers:
- slicer.bambu-studio
materials:
- material.pla
- material.petg
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources: []
related:
- material.pla
- material.petg
- defect.fff.warping
- process.fff.first-layer
- process.open-frame-env
- component.hotend
- slicer.bambu-studio
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- cooling de peça
- ventilador de peça
aliases_en:
- part cooling fan
- layer fan
tags:
- cooling
- fan
- fff
---
# Cooling de peça (part cooling) em FFF

Hub pai: [Componentes e hardware](INDEX.md)

## O que é

**Part cooling** (*layer fan* / ventilador de peça) sopram ar na extrusão já depositada para acelerar solidificação. É distinto do **fan do heatsink** do [hotend](hotend-e-zona-de-fusao.md), que protege o cold side.

## Quando importa

- Overhangs e bridges
- Detalhe fino / lettering
- Empenamento e união Z fracas
- Troca PLA ↔ PETG no mesmo hardware

## Mecanismo e trade-offs

| ↑ Part cooling | ↓ Part cooling |
|---|---|
| Melhor overhang/bridge/cosmético | Melhor união entre camadas (heurística) |
| Pode aumentar warp se base ainda quente demais | Overhangs caem / “babam” |
| PLA costuma gostar após first layers | PETG e peças de resistência: fan moderado |

**First layers:** cooling baixo ou zero por algumas camadas é prática comum para adesão — ver [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md). Valores exatos: preset do [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md) + validação; não inventar %.

## PLA vs PETG (decisão)

| | [PLA](../05-materiais/fff/pla.md) | [PETG](../05-materiais/fff/petg.md) |
|---|---|---|
| Após base estável | Fan alto frequentemente OK | Moderado; alto demais → layer adhesion / warp |
| Miniaturas | Cooling é aliado | Menos ideal que PLA para detalhe frio |
| Frame aberto | Draft + fan alto = choque térmico | Bloquear draft primeiro |

Materiais Ideal na A1 Mini incluem PLA e PETG ([tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)).

## Ambiente (não ignore)

Em [frame aberto](../10-processo-de-impressao/fff/ambiente-frame-aberto.md), ar-condicionado é um “segundo fan” não controlado pelo slicer. Sintoma: adesão assimétrica, warp de um lado só — ver [empenamento](../12-problemas-e-diagnostico/fff/empenamento.md).

## O que fazer

1. Separar sintomas: overhang ruim → ↑ cooling (após temp/flow OK); Z-split / delaminação → ↓ cooling e revisar temp/orientação.
2. Não usar max fan em PETG estrutural como default.
3. Calibrar cooling **depois** de first layer e temperatura estáveis — [ordem de calibração](../09-calibracao/ordem-de-calibracao-fff.md).
4. Conferir se o duct não está obstruído / desalinhado (manutenção).

## Segurança

- Dedos longe de rotores em teste.
- Não desligar heatsink fan do hotend confundindo com part cooling.

## Relações

- trades-off-with → layer adhesion, warping, overhang quality
- couples-with → ambiente aberto, material, velocidade

## Fontes


## Lacunas

- Curvas fan % vs overhang angle medidas no projeto
- Aux fan / chamber fan (se aplicável a outros modelos) como átomos
- Duct geometry A1 Mini
