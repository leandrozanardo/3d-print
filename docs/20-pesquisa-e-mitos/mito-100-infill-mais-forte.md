---
id: myth.100-infill-mais-forte
title: Mito — 100% infill é sempre mais forte
summary: 'O claim ‘100% de preenchimento (infill) deixa a peça mais forte’ ignora
  que, em FFF, resistência sob carga é dominada por paredes perimetrais, orientação
  das fibras/cordões, adesão entre camadas e modo de falha. Acima de certo ponto,
  mais infill aumenta massa e tempo com ganho mecânico marginal, e pode piorar warping
  ou tensões internas. Status: enganoso como regra universal; às vezes útil, frequentemente
  subótimo.'
doc_type: research
domain:
- research
- fff
- slicing
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
not_for:
- isotropic-metal-pbf-density
knowledge_status: draft
evidence_status: limited
safety_level: normal
confidence: low
last_reviewed: '2026-08-16'
review_cycle: 12-months
sources:
- source.bcn3d-fff-mechanical-parameters-study
- source.markforged-settings-impacting-part-strength
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
related:
- tech.fff
- hub.pesquisa
- scenario.a1-mini-pla-petg-first-layer-warp
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- 100% preenchimento
- infill sólido sempre melhor
aliases_en:
- 100% infill stronger myth
- solid infill fallacy
tags:
- myth
- infill
- fff
- strength
---
# Mito — 100% infill é sempre mais forte

Hub pai: [Pesquisa e mitos](./INDEX.md)

## Claim exato

> “Para máxima resistência, use sempre 100% infill.”

## Origem

Intuição de “mais material = mais forte”, defaults de slicer mal interpretados e analogia incorreta com peças maciças usinadas.

## Quando parece verdadeiro

- Compressão quase hidroestática em geometria curta e compacta
- Necessidade de massa/inércia, não de resistência específica
- Núcleo localmente denso exigido por pós-usinagem em região restrita

## Evidência / mecanismos contra a regra universal

Não há, nesta base, um único paper canônico que “prove” o mito falso para todos os casos. A rejeição do absoluto apoia-se em mecânica de falha FFF (anisotropia, interlayer) e em guias metodológicos de calibração/processo:

| Mecanismo | Efeito | Apoio metodológico |
|---|---|---|
| Falha em parede/interlayer | Perímetros e orientação tendem a dominar % infill cego | prática FFF + método de leitura de falhas em [Ellis Print Tuning Guide](../22-fontes/ellis-print-tuning-guide.md) |
| Anisotropia Z | Núcleo sólido não corrige má orientação de camadas | mecânica de processo FFF |
| Tempo/material | Empurrar a 100% pode dobrar custo com ganho marginal | observação de processo; validar com cupom |
| Padrões de infill | Gyroid/cubic em % moderado + paredes extras frequentemente preferível | heurística de slicing; confirmar no eixo de carga real |

**Limite editorial:** isto é **heurística de engenharia FFF**, não consenso científico pinado por estudo controlado nesta wiki.

## O que se pode concluir (escopo limitado)

- “Sempre 100% infill” é **falso como regra universal**
- Pode ser útil em casos estreitos — somente com teste de carga no eixo real de uso
- Não transferir este mito para metal PBF / densidade de pó

## Status

**Mito parcial** — falso como absoluto; possivelmente útil em nichos, com evidência local insuficiente para promoção de confiança.

## Fontes

- [BCN3D FFF mechanical parameters study](../22-fontes/bcn3d-fff-mechanical-parameters-study.md) — densidade/paredes; retornos decrescentes (ex. ABS 60→80%); padrão de infill não dominante
- [Markforged: settings impacting part strength](../22-fontes/markforged-settings-impacting-part-strength.md) — shells/orientação vs infill (guia educacional OEM)


- [Ellis Print Tuning Guide](../22-fontes/ellis-print-tuning-guide.md) (source.ellis-print-tuning-guide) — método de calibração/leitura de falhas FFF; **não** é paper de resistência de infill
- [Teaching Tech Calibration](../22-fontes/teaching-tech-calibration.md) (source.teaching-tech-calibration) — método de calibração; **não** sustenta curva universal paredes vs infill

## Lacunas

- Experimento controlado local (experiment.*) paredes vs infill em A1 Mini PLA/PETG: não publicado
- Paper primário dedicado pinado: ausente nesta página

## Status editorial (remediação v2)

- confidence: low porque não há estudo primário canônico citado
- Conclusões limitadas explicitamente a heurística FFF
