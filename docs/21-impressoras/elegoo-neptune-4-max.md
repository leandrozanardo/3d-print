---
id: printer.elegoo-neptune-4-max
title: Elegoo Neptune 4 Max
summary: ELEGOO Neptune 4 Max é FFF large-format 420×420×480 mm, listada na loja oficial US em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- elegoo-neptune-4-max
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
- source.elegoo-neptune-4-max
related:
- manufacturer.elegoo
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Elegoo Neptune 4 Max
- ELEGOO Neptune 4 Max
- Neptune 4 Max
tags:
- printer
- elegoo
- fff
- documented
- neptune-4-series
manufacturer_id: elegoo
model_name: Neptune 4 Max
family_status: neptune-4-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/neptune-4-max-fdm-3d-printer (accessed 2026-08-16).
---
# Elegoo Neptune 4 Max

Hub: [Impressoras](INDEX.md) · Fabricante: [Elegoo](manufacturer-elegoo.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Elegoo (`manufacturer.elegoo`) |
| Modelo | Neptune 4 Max |
| Família | neptune-4-series |
| coverage_level | `documented` |
| Regiões | US |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/neptune-4-max-fdm-3d-printer (accessed 2026-08-16). |
| URL produto | https://us.elegoo.com/products/neptune-4-max-fdm-3d-printer |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 420 × 420 × 480 mm | loja US (oficial) |
| Machine size (observed) | 658 × 632 × 740 mm | loja (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF; maior envelope da série Neptune 4

## Manuais

- Página produto/manual links: https://us.elegoo.com/products/neptune-4-max-fdm-3d-printer
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- Large bed leveling/tempo de heat: risco operacional — seguir OEM

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- Materiais: não inventar — usar página Specification / manual

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

- Tabela completa de temps: lacuna se SPA omitir
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.elegoo-official-products](../22-fontes/elegoo-official-products.md)
- [source.elegoo-neptune-4-max](../22-fontes/elegoo-neptune-4-max.md)
- URL oficial: https://us.elegoo.com/products/neptune-4-max-fdm-3d-printer

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
