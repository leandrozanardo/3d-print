---
id: scenario.speed-vs-quality
title: Playbook — impressão rápida vs qualidade
summary: 'Velocidade e qualidade competem: reduzir tempo via altura de camada, velocidade
  de parede, infill e quantidade de peças por plate — cada alavanca tem custo em detalhe,
  adesão ou resistência. Na A1 Mini, profiles ‘rápidos’ não anulam física de first
  layer, cooling e anisotropia. Defina o critério de aceite antes; use cupom; não
  troque todas as variáveis juntas. Segurança e claims food/medical não entram no
  trade-off.'
doc_type: scenario
domain:
- scenarios
- fff
- quality
technology:
- material-extrusion
process:
- fff
applies_to:
- printer.bambu-lab-a1-mini
- material.pla
- material.petg
not_for:
- quality-critical-medical
- ignore-first-layer-for-speed
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 3-months
sources:
- source.ellis-print-tuning-guide
related:
- scenario.miniatures
- scenario.functional-brackets
- process.fff.first-layer
- quality.test-coupons
- econ.fff-cost-waste
prerequisites:
- process.fff.first-layer
supersedes: []
aliases_pt_br:
- rápido vs qualidade
- trade-off velocidade
- perfil draft
aliases_en:
- speed vs quality
- draft vs fine
- fast printing tradeoffs
tags:
- playbook
- speed
- quality
---
# Playbook — impressão rápida vs qualidade

Hub pai: [Cenários](INDEX.md)

## Objetivo

Escolher conscientemente o ponto no espectro **tempo ↔ qualidade/resistência** para um job FFF.

## Perguntas mínimas

- O que é “bom o bastante”? (cosmético / encaixe / carga)
- Deadline real?
- Quantas iterações ainda cabem?
- Material e se já está seco/calibrado?

## Hard constraints

- Não sacrificar [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md) “para ir mais rápido”
- Não ignorar [VOC/ventilação](../15-seguranca-e-meio-ambiente/voc-ufp-e-ventilacao.md) por pressa
- Sem food/medical shortcuts

## Matriz de alavancas (conceitos)

| Alavanca | ↑ velocidade típica | Custo típico |
|---|---|---|
| Altura de camada ↑ | Menos tempo | Mais degrau visível |
| Velocidade parede/infill ↑ | Menos tempo | Ringing, underextrusion, falha overhang |
| Infill ↓ | Menos tempo/plástico | Rigidez local ↓ |
| Menos paredes | Mais rápido | Resistência ↓ — ruim em [brackets](pecas-funcionais-brackets.md) |
| Draft profile | Rápido | Detalhe ruim para [miniaturas](miniaturas-detalhe-fino.md) |
| Mais peças/plate | Throughput | Risco: uma falha perde lote |

Ordem segura de aceleração:

1. Aceitar camada mais alta **se** cosmético permitir
2. Reduzir infill onde estruturalmente irrelevante
3. Subir speed **depois** de L1 e cooling OK
4. Só então profiles agressivos de máquina

## Decisão rápida

```text
Peça é cosmético fino?
  SIM → não use draft; ver miniaturas
Peça é carga?
  SIM → walls/orientação primeiro; speed por último
É protótipo de forma só?
  SIM → camada alta + infill baixo OK
```

## Validação

- Cupom 20–40 min no perfil candidato ([cupons](../11-qualidade-e-metrologia/cupons-e-ensaios.md))
- Comparar ao critério escrito (foto + medida se encaixe)

## Economia

Tempo de máquina vs filamento desperdiçado em falha rápida: ver [custo e desperdício](../19-economia-e-sustentabilidade/custo-e-desperdicio-fff.md). “Rápido” que falha na camada 80 é lento.

## Checklist

- [ ] Aceite definido
- [ ] L1 não acelerada além do estável
- [ ] Uma variável de speed por teste
- [ ] Preview sem gaps óbvios

## Lacunas

- Benchmarks de tempo reais A1 Mini por perfil: não tabulados aqui
