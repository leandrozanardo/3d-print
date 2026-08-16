---
id: troubleshoot.fff-symptom-index
title: Índice por sintoma (FFF)
summary: Mapa rápido sintoma → página canônica FFF. Escolha uma linha, abra a página,
  corrija uma causa por vez. Priorize segurança e adesão antes de cosmética. Cobre
  empenamento, primeira camada, stringing, subextrusão, layer shift, elephant foot,
  delaminação, ringing, Z-banding e pillowing; aponta legado quando ainda não migrado.
doc_type: troubleshooting
domain:
- troubleshooting
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- printer.bambu-lab-a1-mini
not_for:
- change-five-knobs-at-once
- skip-drying-when-wet-signs
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
sources:
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
related:
- defect.fff.warping
- process.fff.first-layer
- defect.fff.stringing
- defect.fff.under-extrusion
- defect.fff.layer-shift
- defect.fff.elephant-foot
- defect.fff.delamination
- defect.fff.ringing-ghosting
- defect.fff.z-banding
- defect.fff.pillowing
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- índice por sintoma
- matriz sintoma causa
- troubleshooting FFF
aliases_en:
- symptom index
- symptom cause matrix
- FFF troubleshooting
tags:
- troubleshooting
- index
- fff
symptom_tags:
- adhesion-fail
- warping
- stringing
- under-extrusion
- layer-shift
- elephant-foot
- delamination
- ringing
- z-banding
- pillowing
cause_tags:
- moisture
- first-layer
- draft
- collision
- speed-accel
- cooling
setting_tags:
- temperatures
- retraction
- speeds
- layer-height
---
# Índice por sintoma (FFF)

Hub pai: [Problemas FFF](INDEX.md) · [Problemas](../INDEX.md)

## Regra de ouro

**Uma variável por teste.** Seque filamento suspeito antes de torres de retract/temp. Se a peça soltou e o head bate — **pare**.

## Sintomas

Sinais visuais/auditivos que esta matriz cobre (abrir a página canônica da linha):

- Não grudou / soltou nas camadas 1–3
- Cantos sobem depois de base OK (empenamento)
- Cabelos / teia entre torres (stringing)
- Gaps, paredes translúcidas, infill fraco (subextrusão)
- Degrau XY permanente (layer shift)
- Base “pé de elefante”
- Camadas separando / split mid-body (delaminação)
- Eco/ondulação após cantos (ringing/ghosting)
- Faixas horizontais periódicas em Z (Z-banding)
- Topo almofadado sobre o infill (pillowing)
- Pops / bolhas / espuma (umidade → secagem)

## Causas

Causas plausíveis por sintoma (ordem típica de investigação — detalhe nas páginas filhas):

| Sintoma | Causas plausíveis (ordem) |
|---|---|
| Não grudou / soltou 1–3 | placa suja, Z alto, bed frio, speed first layer |
| Cantos sobem após base OK | draft, shrink, brim, fan cedo, PETG bed |
| Cabelos / teia | úmido, temp alta, retract, travel |
| Gaps / infill fraco | clog parcial, úmido, frio, volumetric, path |
| Degrau XY | impacto, peel-then-push, cinto, accel |
| Pé de elefante | over-squish, bed quente, first layer |
| Split mid-body | fan alto, frio, úmido (PETG) |
| Eco após cantos | vibração, outer speed, mesa, accel |
| Faixas em Z | Z mecânico, temp/fluxo, umidade, speed |
| Topo almofadado | tops insuficientes, infill aberto, cooling, extrusão |
| Pops / bolhas | umidade |

## Ordem diagnóstica

Prioridade quando sintomas empilham:

1. Segurança / colisão (shift, peça solta)
2. Adesão / warp (peça precisa sobreviver)
3. Saúde de extrusão (gaps, clogs, umidade)
4. Cosmética (stringing, seam, ringing, pillowing, detalhe)

Árvore rápida:

```text
Falhou na mesa (camadas 1–3)?
  ├─ SIM → primeira camada (+ empenamento se só cantos depois)
  └─ NÃO → cosmético vs estrutural?
        ├─ Gaps / fraco → subextrusão (secar antes)
        ├─ Degrau XY → layer shift (descarte peel-push)
        ├─ Cabelo → stringing (secar antes)
        ├─ Split layers → delaminação
        ├─ Base gorda → elephant foot
        ├─ Eco após cantos → ringing
        ├─ Faixas horizontais Z → z-banding
        └─ Topo colchão → pillowing
```

## Correções

Este índice **não** aplica o fix: ele roteia. Em cada página filha:

1. Escolher **uma** causa da ordem sugerida
2. Aplicar um único ajuste (ou secar, se houver pops)
3. Reimprimir cupom mínimo e comparar before/after
4. Só então avançar para a próxima causa

Hub de alavancas: [Settings semânticos](../../08-slicers-e-configuracoes/settings/INDEX.md)

## Condições de parada

- Peça solta + head batendo / blob → **interrompa**; limpe path antes de retomar
- Sinais de umidade (pops) → seque **antes** de torres de retract/temp
- Não mude cinco knobs de uma vez
- Não trate peel-then-push como belt failure
- Pare cosmética se adesão/estrutural ainda falha

## Matriz sintoma → página

| Sintoma | Causas plausíveis (ordem) | Página |
|---|---|---|
| Não grudou / soltou nas camadas 1–3 | placa suja, Z alto, bed frio, speed first layer | [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) · [Falha de adesão](falha-adesao-primeira-camada.md) |
| Cantos sobem **depois** de base OK | draft, shrink, brim, fan cedo, PETG bed | [Empenamento](empenamento.md) |
| Cabelos / teia entre torres | úmido, temp alta, retract, travel | [Stringing](stringing.md) |
| Gaps, paredes translúcidas, infill fraco | clog parcial, úmido, frio, volumetric, path | [Subextrusão](subextrusao.md) |
| Degrau XY permanente nas paredes | impacto, peel-then-push, cinto, accel | [Layer shift](layer-shift.md) |
| Base “pé de elefante” / furo apertado só na base | over-squish, bed quente, first layer | [Elephant foot](elephant-foot.md) |
| Camadas separando / split mid-body | fan alto, frio, úmido (PETG) | [Delaminação](delaminacao.md) |
| Eco/ondulação após cantos ou texto | vibração, outer speed, mesa, accel | [Ringing / ghosting](ringing-ghosting.md) |
| Faixas horizontais periódicas em Z | Z mecânico, temp/fluxo, umidade, speed | [Z-banding](z-banding.md) |
| Topo almofadado sobre o infill | tops insuficientes, infill aberto, cooling, extrusão | [Pillowing](pillowing.md) |
| Pops / bolhas / espuma | umidade | [Secagem](../../05-materiais/fff/secagem-e-armazenamento.md) |

## Legado ainda útil

- Matriz EN: [matriz-sintoma-causa.md](../../projeto/troubleshooting/matriz-sintoma-causa.md)
- Outros sintomas (suportes, detalhe mini): [projeto/troubleshooting](../../projeto/troubleshooting/INDEX.md)

## Relações com outros conceitos

- routes-to → páginas `defect.fff.*` e `process.fff.first-layer`
- depends-on → disciplina de uma variável + secagem

## Fontes

- [source.ellis-print-tuning-guide](../../22-fontes/ellis-print-tuning-guide.md) — método e ordem de leitura de falhas FFF
- [source.teaching-tech-calibration](../../22-fontes/teaching-tech-calibration.md) — primeiros princípios / cupons de calibração
- Taxonomia operacional do projeto (legado + páginas filhas linkadas acima)

## Lacunas

- Seam, supports welded — migração pendente
- Fluxograma ilustrado
