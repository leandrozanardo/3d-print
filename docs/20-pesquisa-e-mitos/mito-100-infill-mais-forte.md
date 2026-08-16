---
id: "myth.100-infill-mais-forte"
title: "Mito — 100% infill é sempre mais forte"
summary: "O claim ‘100% de preenchimento (infill) deixa a peça mais forte’ ignora que, em FFF, resistência sob carga é dominada por paredes perimetrais, orientação das fibras/cordões, adesão entre camadas e modo de falha. Acima de certo ponto, mais infill aumenta massa e tempo com ganho mecânico marginal, e pode piorar warping ou tensões internas. Status: enganoso como regra universal; às vezes útil, frequentemente subótimo."
doc_type: "research"
domain: ["research", "fff", "slicing"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff"]
not_for: ["isotropic-metal-pbf-density"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: []
related: ["tech.fff", "hub.pesquisa", "scenario.a1-mini-pla-petg-first-layer-warp"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["100% preenchimento", "infill sólido sempre melhor"]
aliases_en: ["100% infill stronger myth", "solid infill fallacy"]
tags: ["myth", "infill", "fff", "strength"]
---

# Mito — 100% infill é sempre mais forte

Hub pai: [Pesquisa e mitos](./INDEX.md)

## Claim exato

> “Para máxima resistência, use sempre 100% infill.”

## Origem

Intuição de ‘mais material = mais forte’ + defaults de slicer mal compreendidos + peças maciças de usinagem como analogia falsa.

## Quando parece verdadeiro

- Compressão quase hidroestática em geometria curta
- Necessidade de massa/inércia, não de resistência específica
- Pós-usinagem que exige núcleo denso em região local

## Evidência / mecanismos contra a regra universal

| Mecanismo | Efeito |
|---|---|
| Falha frequentemente inicia em parede fina / interlayer | Perímetros e orientação > % infill cego |
| Anisotropia Z | Núcleo sólido não corrige má orientação |
| Tempo e material | 50–100% pode dobrar custo com ganho pequeno |
| Tensão térmica | Núcleo maciço pode piorar warp em bases largas |
| Padrões de infill | Gyroid/cubic em % moderado + paredes extras costuma vencer |

**Heurística suportada (FFF, escopo geral):** aumente **wall loops / perimeters** e escolha orientação antes de empurrar infill para 100%. Valide com teste de carga no eixo real de uso.

## O que se pode concluir

- 100% não é automaticamente o ótimo de resistência/peso/tempo
- Densidade local (modificadores) > sólido global em muitos casos
- Metal PBF “densidade 99%+” é outro problema físico — não use este mito lá

## Status

**Mito parcial** — falso como absoluto; verdadeiro só em casos estreitos documentados por teste.

## Fontes

Sem paper único canônico pinado nesta página; claim rejeitado por mecânica de falha FFF bem estabelecida na prática de engenharia. Cupons locais: lacuna.

## Lacunas

- Curvas experimentais A1 Mini PLA/PETG paredes vs infill: ainda não publicadas como `experiment.*`
- Settings catalog com paths Bambu Studio: wave futura
