---
id: printer.elegoo-centauri-carbon
title: Elegoo Centauri Carbon
summary: ELEGOO Centauri Carbon é FFF CoreXY enclosed 256³ mm (até 500 mm/s), hotend 320 °C / bed 110 °C, listada na loja oficial US em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- elegoo-centauri-carbon
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
- source.elegoo-centauri-carbon
related:
- manufacturer.elegoo
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Elegoo Centauri Carbon
- ELEGOO Centauri Carbon
- Centauri Carbon
tags:
- printer
- elegoo
- fff
- documented
- centauri-series
manufacturer_id: elegoo
model_name: Centauri Carbon
family_status: centauri-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/centauri-carbon and product hub https://www.elegoo.com/pages/elegoo-centauri-carbon (accessed 2026-08-16).
---
# Elegoo Centauri Carbon

Hub: [Impressoras](INDEX.md) · Fabricante: [Elegoo](manufacturer-elegoo.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Elegoo (`manufacturer.elegoo`) |
| Modelo | Centauri Carbon |
| Família | centauri-series |
| coverage_level | `documented` |
| Regiões | US |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/centauri-carbon and product hub https://www.elegoo.com/pages/elegoo-centauri-carbon (accessed 2026-08-16). |
| URL produto | https://us.elegoo.com/products/centauri-carbon |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 256 × 256 × 256 mm | loja US + hub |
| Max speed / accel | 500 mm/s; 20 000 mm/s² | hub (oficial) |
| Flow claim | 32 mm³/s | hub (oficial) |
| Max nozzle | 320 °C brass-hardened steel | hub (oficial) |
| Max heatbed | 110 °C | hub (oficial) |
| Kinematics | CoreXY enclosed + chamber camera | hub (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF
- CoreXY enclosed voltado a CF / engineering (marketing)
- Não é impressora de resina Mars/Saturn

## Manuais

- Página produto/manual links: https://us.elegoo.com/products/centauri-carbon
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- Full-auto calibration (level/Z/vibration/PA); built-in air filter; 4.3" touch

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- PLA/PETG base + carbon-fiber ready claims; lista completa pinada: lacuna tabular

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

- Waste bin model precisa ser impresso pelo usuário (NOTICE)
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.elegoo-official-products](../22-fontes/elegoo-official-products.md)
- [source.elegoo-centauri-carbon](../22-fontes/elegoo-centauri-carbon.md)
- URL oficial: https://us.elegoo.com/products/centauri-carbon

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
