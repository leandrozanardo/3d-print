---
id: printer.elegoo-orangestorm-giga
title: Elegoo OrangeStorm Giga
summary: ELEGOO OrangeStorm Giga é FFF very-large-format 800×800×1000 mm, listada na loja oficial US em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- elegoo-orangestorm-giga
not_for:
- invent-missing-specs
- blind-profile-transfer
knowledge_status: draft
lifecycle: current
coverage_level: documented
evidence_status: manufacturer-specific
safety_level: caution
confidence: high
last_reviewed: '2026-08-16'
review_cycle: 3-months
sources:
- source.elegoo-official-products
- source.elegoo-orangestorm-giga
related:
- manufacturer.elegoo
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Elegoo OrangeStorm Giga
- ELEGOO OrangeStorm Giga
- OrangeStorm Giga
tags:
- printer
- elegoo
- fff
- documented
- orangestorm-series
manufacturer_id: elegoo
model_name: OrangeStorm Giga
family_status: orangestorm-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/orangestorm-giga (accessed 2026-08-16).
---
# Elegoo OrangeStorm Giga

Hub: [Impressoras](INDEX.md) · Fabricante: [Elegoo](manufacturer-elegoo.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Elegoo (`manufacturer.elegoo`) |
| Modelo | OrangeStorm Giga |
| Família | orangestorm-series |
| coverage_level | `documented` |
| Regiões | US |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/orangestorm-giga (accessed 2026-08-16). |
| URL produto | https://us.elegoo.com/products/orangestorm-giga |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 800 × 800 × 1000 mm | loja US (oficial) |
| Class | Large-format FDM / Giga series | loja + download center |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF
- Envelope industrial-hobby large; não usar perfis Neptune desktop sem adaptação

## Manuais

- Página produto/manual links: https://us.elegoo.com/products/orangestorm-giga
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- Dual/quad printhead upgrade bundles existem na loja — variantes separadas

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- Filamentos: seguir página/bundles oficiais; não inventar

TDS/SDS do filamento/resina não são substituídos por esta página.

## Manutenção

- Calibração: seguir fluxo oficial (auto-level / first-layer checks) antes de produção
- Limpeza de bico/mesa: conforme manual; não inventar intervalos sem evidência
- Lubrificação e tensionamento: lacuna procedural local se não pinado pelo OEM

## Segurança

- Superfícies quentes (hotend/bed): risco de queimadura
- Peças móveis: manter mãos fora da área de movimento durante print
- ABS/ASA/engenharia: ventilação / filtragem conforme SDS e enclosure
- Critérios de parada: odor forte anômalo, smoke, layer-shift grave, spaghetti não contido

## Known issues

- Consumo elétrico / temps pinados: lacuna nesta revisão
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.elegoo-official-products](../22-fontes/elegoo-official-products.md)
- [source.elegoo-orangestorm-giga](../22-fontes/elegoo-orangestorm-giga.md)
- URL oficial: https://us.elegoo.com/products/orangestorm-giga

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
