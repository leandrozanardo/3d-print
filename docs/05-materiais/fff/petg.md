---
id: material.petg
title: PETG em FFF
summary: PETG é copoliéster comum em FFF quando se precisa de mais tenacidade e resistência
  térmica leve que o PLA típico. É mais higroscópico, mais propenso a stringing e
  pode soldar agressivamente em PEI liso. Na A1 Mini é suportado pelo fabricante como
  Ideal, com bed limitado a 80 °C e frame aberto exigindo controle de corrente de
  ar.
doc_type: material
domain:
- materials
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- printer.bambu-lab-a1-mini
- nozzle-0.4mm
not_for:
- food-contact-without-certification
- clone-of-pla-profile
- smooth-pei-yank-hot
materials:
- material.petg
printers:
- printer.bambu-lab-a1-mini
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 6-months
sources: []
related:
- material.pla
- defect.fff.warping
- process.fff.first-layer
prerequisites:
- tech.fff
aliases_pt_br:
- PETG
aliases_en:
- PETG
- glycol-modified PET
tags:
- material
- petg
- fff
supersedes: []
---
# PETG em FFF

Hub pai: [Materiais](../INDEX.md)

## O que é

**PETG** (*glycol-modified polyethylene terephthalate*) é família de filamento FFF. Variantes (PETG-HF, PETG-CF, PCTG, blends) mudam fluxo, abrasividade e janela térmica. Não é “PLA mais forte” drop-in.

## Quando importa

- Clipes, brackets e ferramentas leves sujeitas a impacto
- Falha de PLA em interface de camada sob flexão (após esgotar paredes/orientação em PLA)
- Contato térmico leve — **validar** carga real; não certificar alta temperatura

## Quando não usar

- Miniaturas/faces onde cooling agressivo de PLA vence
- Perfil PLA só com temperatura aumentada
- Remoção a quente de PEI liso (risco de dano à coating)
- Food-contact / medical sem evidência de processo

## Compatibilidade A1 Mini

Fabricante: PETG = **Ideal** ([tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md)). Bed máximo da máquina: **80 °C** — ver [C-002](../../_meta/contradicoes.md).

## Process window (contextual)

| Parâmetro | Faixa de partida (projeto) | Notas |
|---|---|---|
| Nozzle | 220–250 °C — heurística editorial (sem fonte pinada) (ordem Studio ~230–245 °C) | Torre após secar |
| Bed | 70–80 °C — heurística editorial (sem fonte pinada) | Não exceder 80 °C na A1 Mini ([tech specs A1 mini](../../22-fontes/bambu-a1-mini-tech-specs.md)) |
| Part cooling | moderado (ordem 30–70%) | Alto demais → Z fraco; baixo → sag/string |
| Placa | texturizada preferida | Smooth: risco de solda |
| Secagem | obrigatória se bobina aberta/suspeita | Umidade mascara retract |

Detalhe EN legado: [projeto/materiais/petg.md](../../projeto/materiais/petg.md).

## Regras não negociáveis (heurística operacional)

1. Secar antes de culpar retract
2. Partir de processo PETG A1 Mini 0,4 — não clonar PLA
3. Purgar bem em trocas PLA ↔ PETG
4. Soltar peça após esfriar
5. Em warp: draft + bed + brim antes de “subir fan”

## Assinatura de falhas

| Sintoma | Hipóteses | Próximo |
|---|---|---|
| Cabelo/stringing extremo | úmido, temp, retract, Z-hop | [stringing](../../12-problemas-e-diagnostico/fff/stringing.md); secar |
| Warp apesar de boa camada 1 | draft, bed frio, flat longo | [empenamento](../../12-problemas-e-diagnostico/fff/empenamento.md) |
| Placa rasgada | over-adhesion smooth | textured; esfriar |
| Delaminação | cooling alto / frio / úmido | [delaminação](../../12-problemas-e-diagnostico/fff/delaminacao.md) |

## Segurança

- Temperatura de nozzle mais alta que PLA típico → queimadura
- Não yank na placa quente
- Emissões/ventilação: não declarar inocuidade

## Relações com outros conceitos

- is-a → família FFF
- compatible-with → A1 Mini (Ideal)
- worsened-by → umidade, corrente de ar
- trades-off-with → PLA (cosmético/facilidade)
- fixed-by (warp) → brim, bed no topo seguro, reduzir draft

## Veja também

- [PLA](pla.md)
- [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md)
- Perfil legado: [petg-funcional-0.4](../../projeto/perfis-a1-mini/petg-funcional-0.4.md)

## Fontes

- TDS/SDS do produto
- Legado: [petg.md](../../projeto/materiais/petg.md)

## Lacunas

- PETG-CF e desgaste de nozzle
- Tempos/temperaturas de secagem por marca (só com TDS)
