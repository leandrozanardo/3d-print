---
id: scenario.a1-mini-pla-petg-first-layer-warp
title: 'Playbook — A1 Mini + PLA/PETG: primeira camada e empenamento'
summary: 'Cenário ponta a ponta para validar a arquitetura da base: selecionar PLA
  ou PETG na A1 Mini com nozzle 0,4 mm, obter primeira camada correta, prevenir/diagnosticar
  empenamento e saber quando parar. Não substitui TDS do filamento nem perfis oficiais
  do Bambu Studio.'
doc_type: scenario
domain:
- scenarios
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- printer.bambu-lab-a1-mini
- material.pla
- material.petg
not_for:
- abs-asa-default
- food-medical-certification
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 3-months
sources:
- source.bambu-a1-mini-tech-specs
related:
- printer.bambu-lab-a1-mini
- process.fff.first-layer
- defect.fff.warping
prerequisites:
- printer.bambu-lab-a1-mini
- process.fff.first-layer
aliases_pt_br:
- playbook vertical A1 Mini
aliases_en:
- A1 mini first layer warping playbook
tags:
- playbook
- scenario
supersedes: []
---
# Playbook — A1 Mini + PLA/PETG: primeira camada e empenamento

Hub pai: [Cenários](INDEX.md)

## Objetivo

Imprimir com confiabilidade básica na [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md): adesão correta na [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md) e controle de [empenamento](../12-problemas-e-diagnostico/fff/empenamento.md).

## Requisitos funcionais / estéticos (perguntar só o necessário)

- Peça cabe em 180³ mm com margem?
- Cosmético fino (favor [PLA](../05-materiais/fff/pla.md)) ou impacto/tenacidade (considerar [PETG](../05-materiais/fff/petg.md))?
- Base larga / cantos críticos?

## Hard constraints

- Nozzle de referência: [0,4 mm (fonte oficial / fabricante / heuristic; ver `sources`) ](../04-componentes-e-hardware/nozzle-0-4-mm-fff.md)
- Bed ≤ 80 °C
- Não certificar food/medical
- Materiais Not Recommended do fabricante: fora deste playbook como default

## Seleção

| Se… | Então |
|---|---|
| Detalhe, overhang, facilidade | PLA |
| Impacto leve / PLA falhou em Z após tuning | PETG seco + processo PETG |
| ABS “porque internet” | Recusar default; explicar fabricante + enclosure |

## Avaliação rápida de geometria

- Flat contínuo grande → risco de warp ↑ → brim + orientação
- Torre alta fina → adesão + velocidade de parede externa
- Encaixes na base → cuidado com elephant foot após squish OK

## Prioridades de slicing (conceitos)

1. Perfil oficial A1 Mini do material no Bambu Studio
2. First layer lenta + altura controlada
3. Brim se base pequena/alta ou flat propenso a warp
4. Early cooling baixo; depois conforme overhang
5. Não max speed em peça crítica de adesão

## Calibração mínima

- Calibração/assistências após mover a máquina
- Cupom de first layer antes da peça cara
- Métodos: [Ellis](../22-fontes/ellis-print-tuning-guide.md) / [Teaching Tech](../22-fontes/teaching-tech-calibration.md) adaptados

## Checklist pré-impressão

- [ ] Envelope + brim/suportes cabem
- [ ] Material correto e (PETG) seco
- [ ] Placa limpa; PETG preferir textured
- [ ] Draft controlado
- [ ] Preview: first layer contínua, sem buracos óbvios
- [ ] Bed/nozzle dentro do range; bed ≤ 80 °C (fonte oficial/fabricante/heuristic; ver sources) 

## Checklist pós

- [ ] First layer: kiss OK?
- [ ] Cantos no lugar ao longo do print?
- [ ] Se falhou: uma variável registrada para o próximo teste

## Sinais de falha → caminho

| Sinal | Página |
|---|---|
| Peel camada 1 | [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md) |
| Cantos tarde | [empenamento](../12-problemas-e-diagnostico/fff/empenamento.md) |
| Head batendo em peça solta | **STOP** |

## Trade-offs

Qualidade de overhang (↑ fan) vs risco de warp/delaminação (↓ fan cedo). Tempo (sem brim) vs âncora.

## Fontes

- [tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)
- Páginas canônicas linkadas acima
- Legado EN ainda útil: [projeto/INDEX](../projeto/INDEX.md)

## Lacunas

- Integração com perfis nomeados pt-BR (ainda em `projeto/perfis-a1-mini/`)
- Cenários de miniatura/ferramenta separados (Wave 8)
