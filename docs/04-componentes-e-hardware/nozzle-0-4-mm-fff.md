---
id: nozzle.0.4mm-fff
title: Nozzle 0,4 mm em FFF
summary: 'O nozzle de 0,4 mm é o diâmetro de referência desta base para a A1 Mini:
  equilíbrio entre detalhe, vazão e robustez a entupimentos. Altura de camada útil
  tipicamente fica numa fração do diâmetro; largura de linha e flow devem ser co-projetados.
  Trocar para 0,2/0,6/0,8 mm exige novos perfis — não basta mudar um número.'
doc_type: component
domain:
- hardware
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- nozzle-0.4mm
- printer.bambu-lab-a1-mini
not_for:
- abrasive-fillers-without-wear-assessment
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 12-months
sources:
- source.bambu-a1-mini-tech-specs
related:
- printer.bambu-lab-a1-mini
- material.pla
- setting.layer-height
prerequisites:
- printer.bambu-lab-a1-mini
aliases_pt_br:
- bico 0,4 mm
- nozzle 0.4
aliases_en:
- 0.4 mm nozzle
tags:
- nozzle
- fff
supersedes: []
---
# Nozzle 0,4 mm ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)) em FFF

Hub pai: [Componentes](INDEX.md)

## O que é

O **nozzle** (bico) define o diâmetro de saída do polímero fundido. Em FFF desktop, **0,4 mm** é o padrão de mercado e o incluso na A1 Mini segundo o fabricante ([tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)).

## Quando importa

- Escolher altura de camada e largura de extrusão
- Avaliar detalhe fino versus tempo
- Diagnosticar subextrusão / clog / desgaste
- Decidir se miniatura exige 0,2 mm (decisão de projeto; fora do escopo profundo atual — sem pinagem de datasheet aqui)

## Mecanismo e dependências

O cordão depositado (bead) depende de: diâmetro do nozzle, layer height, line width, multiplicador de flow, temperatura, velocidade e max volumetric flow do hotend/filamento. **Layer height não se discute isolada do nozzle.**

Heurística comum de partida (não é lei física universal): altura de camada frequentemente entre ~25% e ~75% do diâmetro do nozzle. Para 0,4 mm isso sugere banda ampla ~0,08–0,28 mm — **ponto de partida**, validar no preview e na peça ([legado projeto](../projeto/fatiamento/altura-de-camada-e-velocidade.md) usa a mesma banda operacional).

## O que fazer

1. Manter perfis nomeados para 0,4 mm ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)); criar família nova ao trocar diâmetro.
2. Filamentos abrasivos (CF/GF, filled): avaliar desgaste — latão/aço inox/hardened diferem; fabricante A1 Mini lista vários reforçados como Not Recommended.
3. Em falhas de vazão, distinguir: clog parcial, limite volumétrico, umidade, grind do extrusor.
4. Não “compensar” nozzle errado só com flow ratio.

## Trade-offs

| ↑ detalhe (↓ diâmetro) | ↑ vazão/robustez (↑ diâmetro) |
|---|---|
| Mais tempo | Menos detalhe fino |
| Mais sensível a clog de partículas | Cordões mais grossos |

## Segurança

Nozzle e heat block atingem temperaturas altas — risco de queimadura. Troca a quente só com procedimento do fabricante.

## Relações com outros conceitos

- part-of → sistema de extrusão FFF
- applies-to → [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md)
- trades-off-with → velocidade, detalhe, risco de clog
- depends-on → temperatura/material compatíveis

## Veja também

- [PLA](../05-materiais/fff/pla.md) · [PETG](../05-materiais/fff/petg.md)
- [Primeira camada](../10-processo-de-impressao/fff/primeira-camada.md)

## Fontes


## Lacunas

- Página de geometria interna (orifício, wear land)
- Materiais de nozzle (brass/hardened/ruby) como átomos
- Calibração de max volumetric flow medida
