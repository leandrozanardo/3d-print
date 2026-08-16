---
id: post.depowdering-metal
title: Depowdering e pós-processamento metálico
summary: Depowdering remove pó não fundido/aglutinado após builds em leito (PBF, BJ)
  e é etapa crítica de qualidade e segurança. Em metal, a cadeia típica inclui unpack
  controlado, remoção de pó, corte de suportes, alívio de tensões, HIP (quando especificado),
  usinagem e NDE. Em polímeros SLS/MJF, o foco é unpack, jateamento e acabamento sem
  HIP. Esta página descreve a sequência conceitual — não é SOP de forno nem substitui
  controles de pó combustível.
doc_type: guide
domain:
- post-processing
- metals
technology:
- powder-bed-fusion
- binder-jetting
process: []
applies_to:
- powder-bed-fusion
- binder-jetting
- metal-am
not_for:
- fff-sanding-only
- uncontrolled-home-depowder
knowledge_status: draft
evidence_status: mixed
safety_level: critical
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources:
- source.niosh-am-entry
- source.epa-3d-printing-research
related:
- hazard.metal-powder
- tech.lpbf-ebm
- tech.sls-mjf
- tech.binder-jetting-variants
- defect.pbf
- material.powder-feedstocks
prerequisites:
- hazard.metal-powder
supersedes: []
aliases_pt_br:
- depowdering
- remoção de pó
- pós-processamento metálico
- HIP
aliases_en:
- depowdering
- powder removal
- stress relief
- HIP
- support removal
tags:
- post-processing
- depowdering
- metal
- safety-critical
---
# Depowdering e pós-processamento metálico

Hub pai: [Pós-processamento](../INDEX.md)

## Precedência de segurança

Unpack e depowdering liberam nuvens de pó. Siga [hazard.metal-powder](../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md): inertização quando exigida, aterramento, sem fontes de ignição, PPE, proibição de aspirador doméstico.

## O que é / quando importa

**Depowdering** = remoção do pó de suporte (não fundido / não aglutinado) de canais, lattice e superfícies. Sem isso: massa errada, contaminação de forno, risco de ignição e falha funcional.

## Sequência típica — metal PBF

1. Cool-down sob procedimento OEM
2. Unpack em estação controlada
3. Depowdering (manual assistido, vibratório, ultrassom, mídia — conforme geometria e política)
4. Recuperação/peneira de pó reutilizável
5. Stress relief (frequentemente **antes** de remover todos os suportes — seguir OEM/liga)
6. Remoção de suportes
7. HIP / tratamento térmico adicional (se especificado)
8. Usinagem de datums e superfícies críticas
9. Acabamento superficial / revestimento
10. NDE e liberação

## Sequência típica — polímero SLS/MJF

1. Cool-down da cake
2. Unpack / breakout
3. Depowdering + recuperação de pó
4. Jateamento / tingimento / seal (opcional)
5. Usinagem pontual se necessário

## Sequência típica — binder jet metal

Depois do depowder da peça verde: cura → debind/sinter → (infiltração/HIP) → usinagem. O encolhimento ocorre no forno — metrologia só faz sentido com compensação documentada.

## Trade-offs

| Escolha | Ganho | Custo/risco |
|---|---|---|
| HIP | densificação / fadiga | custo, lead time |
| Remover suporte cedo | acesso | distorção se tensão alta |
| Jateamento agressivo | estética | perda dimensional |
| Reciclar 100% do pó | economia aparente | drift de qualidade |

## Design for depowdering

- Orifícios de escape em cavidades
- Evitar powder traps
- Orientação que favoreça drenagem de pó

## Relação com defeitos

Pó retido mascara poros e adiciona massa; HT inadequado deixa tensão → [defeitos PBF](../12-problemas-e-diagnostico/po-metal/defeitos-pbf.md).

## Fontes

- [source.niosh-am-entry](../22-fontes/niosh-additive-manufacturing.md)
- [source.epa-3d-printing-research](../22-fontes/epa-3d-printing-research.md)

## Lacunas

- Receitas de temperatura/tempo de stress relief por liga: não listadas
- Equipamentos de depowdering automatizado: sem review de marca
