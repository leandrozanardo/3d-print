---
id: printer.elegoo-centauri-2
title: Elegoo Centauri 2
summary: ELEGOO Centauri 2 é FFF CoreXY da família Centauri (256³ mm observado), listada como New Release na loja oficial US em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- elegoo-centauri-2
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
- source.elegoo-centauri-2
related:
- manufacturer.elegoo
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Elegoo Centauri 2
- ELEGOO Centauri 2
- Centauri 2
tags:
- printer
- elegoo
- fff
- documented
- centauri-series
manufacturer_id: elegoo
model_name: Centauri 2
family_status: centauri-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/centauri-2 (New Release banners; accessed 2026-08-16).
---
# Elegoo Centauri 2

Hub: [Impressoras](INDEX.md) · Fabricante: [Elegoo](manufacturer-elegoo.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Elegoo (`manufacturer.elegoo`) |
| Modelo | Centauri 2 |
| Família | centauri-series |
| coverage_level | `documented` |
| Regiões | US |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/centauri-2 (New Release banners; accessed 2026-08-16). |
| URL produto | https://us.elegoo.com/products/centauri-2 |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 256 × 256 × 256 mm | loja US (oficial) |
| Storefront status | New Release / Combo variants listed | loja (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF
- Diferente de Centauri Carbon (CF-oriented) — não misturar presets

## Manuais

- Página produto/manual links: https://us.elegoo.com/products/centauri-2
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- CoreXY high-speed family messaging on store

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- Não inventar lista de filamentos sem tabela SKU

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

- Specs tabulares adicionais: lacuna se não renderizados no fetch
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.elegoo-official-products](../22-fontes/elegoo-official-products.md)
- [source.elegoo-centauri-2](../22-fontes/elegoo-centauri-2.md)
- URL oficial: https://us.elegoo.com/products/centauri-2

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
