---

id: printer.creality-k2-plus
title: Creality K2 Plus
summary: Creality K2 Plus é o flagship FFF 350³ mm da série K2 com nozzle até 350 °C,
  câmara aquecida 60 °C e step-servo em XYZ+extrusor, listado no site/loja Creality
  em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- creality-k2-plus
- creality-print
not_for:
- downscale-presets-from-k2-without-review
- invent-missing-plus-only-cells
knowledge_status: draft
lifecycle: current
coverage_level: documented
evidence_status: manufacturer-specific
safety_level: caution
confidence: high
last_reviewed: '2026-08-16'
review_cycle: 3-months
sources:
- source.creality-official-products
- source.creality-k2-series-product
- source.creality-k2-plus-product
related:
- manufacturer.creality
- hub.impressoras
- printer.creality-k2
- printer.creality-k2-pro
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- K2 Plus
- Creality K2 Plus Combo
aliases_en:
- Creality K2 Plus
- K2 Plus Combo
tags:
- printer
- creality
- k2-series
- large-format
- heated-chamber
- documented
manufacturer_id: creality
model_name: K2 Plus
family_status: k2-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed on official Creality product page
  https://www.creality.com/products/creality-k2-plus-cfs-combo and store
  https://store.creality.com/products/creality-k2-plus-combo-3d-printer (accessed
  2026-08-16).
---
# Creality K2 Plus

Hub: [Impressoras](INDEX.md) · Fabricante: [Creality](manufacturer-creality.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Creality (`manufacturer.creality`) |
| Modelo | Creality K2 Plus |
| Família | k2-series |
| coverage_level | `documented` |
| Regiões | Global |
| Variantes | K2 Plus; K2 Plus Combo (CFS) |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed on official Creality product page https://www.creality.com/products/creality-k2-plus-cfs-combo and store https://store.creality.com/products/creality-k2-plus-combo-3d-printer (accessed 2026-08-16). |
| URL produto | https://www.creality.com/products/creality-k2-plus-cfs-combo |
| URL loja | https://store.creality.com/products/creality-k2-plus-combo-3d-printer |

## Especificações

Fonte primária: [source.creality-k2-plus-product](../22-fontes/creality-k2-plus-product.md) + Compare [source.creality-k2-series-product](../22-fontes/creality-k2-series-product.md) (2026-08-16):

| Capability | Valor oficial observado | Nota |
|---|---|---|
| Build volume | 350 × 350 × 350 mm | produto + série (oficial)|
| Dimensões | 495 × 515 × 640 mm (máquina); Combo 495 × 515 × 916 mm | produto (oficial)|
| Peso líquido | 35 kg | série + produto |
| Max speed / accel | ≤600 mm/s, ≤30000 mm/s² | série (accel maior que Pro/K2) (oficial)|
| Max nozzle | ≤350 °C | série + produto (hardened tip marketing) (oficial)|
| Max heatbed | 120 °C | série (oficial)|
| Max chamber | ≤60 °C + active heater | série + produto (oficial)|
| Filamentos | PLA/ABS/PETG/PA-CF/PLA-CF/PET/ASA/PPA-CF | produto |
| Touchscreen | 4,3-inch | série |
| Storage | 32 GB eMMC | série |
| Connectivity | Wi-Fi 2.4G & 5G / RJ45 / USB / 485 | série |
| Air filter / aux fans | 2 / 2 | série |
| Rated power | 1200 W | produto |
| Hotend power | 100 W | série |

## Tecnologia

- material extrusion / FFF
- Large-format enclosed CoreXY; **5× FOC step-servo** (XYZ + extrusor) — distinto de K2/K2 Pro
- Active chamber heating; CFS multicolor até 16 cores
- Auto belt tensioning (Compare: Auto Adjusted — só Plus)

## Manuais

- Página produto + support K2 series
- Manual dedicado pinado nesta revisão: lacuna (download center a mapear)

## Hardware

- Hardened high-temp nozzle claim até 350 °C (oficial, série/produto)
- Dual air filters; dual auxiliary part-cooling fans
- Chamber AI 1080p @30fps + nozzle AI camera
- Built-in RFID; dual-gear direct drive; quick-swap nozzle marketing
- Sensor set marketing (hotend/chamber/bed temp, run-out, cutter)

## Software

- Creality OS (root access / expert mode marketing)
- Creality Cloud; RFID filament presets (Hyper PLA RFID / Hyper PAHT-CF mencionados)

## Firmware

- “Smart Auto Leveling Available via Firmware Update” (Compare Plus) — indica dependência de update; **versão pinada**: não publicada na evidência consultada em 2026-08-16

## Slicer

- Creality Print (presets 40+ filament mencionados no marketing Plus)
- Sempre perfil **K2 Plus**; volume e temps diferem de Pro

## Materiais

- Lista oficial produto/série acima (inclui ASA e filled nylons)
- Footnotes oficiais da série: ABS/ASA/PPS ~60 °C chamber; PAHT-CF ~50 °C (oficial)
- TPU aparece em galeria marketing série, mas lista Compare Plus não lista TPU — **não inventar** compatibilidade TPU para Plus

## Manutenção

- Out-of-box: instalar tela + auto calibrations
- Auto filament relay com CFS; tangle detection Yes (produto)
- Troca de filtro duplo e lubrificação rails: lacuna procedural

## Segurança

- Volume grande + câmara 60 °C + nozzle 350 °C (specs oficiais) → risco térmico/VOC elevado
- Dual air filter não elimina ventilação adequada para filled/ASA
- Critérios de parada: smoke, chamber overshoot, AI spaghetti sem ação, colisão

## Known issues

- Auto-leveling “via firmware update” pode confundir unboxing se update atrasar
- Peso/envelope: logística e bancada — validar espaço (35 kg)
- Troubleshooting-mapped: ainda não

## Fontes

- [source.creality-k2-plus-product](../22-fontes/creality-k2-plus-product.md)
- [source.creality-k2-series-product](../22-fontes/creality-k2-series-product.md)
- [source.creality-official-products](../22-fontes/creality-official-products.md)

## Lacunas

- Manual PDF revisionado
- Firmware build pinado + changelog
- Clarificação oficial TPU no Plus
- Troubleshooting-mapped

<!-- editorial-fingerprint:printer.creality-k2-plus:creality-k2-plus.md -->

### Nota de especificidade — Creality K2 Plus

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Creality K2 Plus** (`printer.creality-k2-plus`, fabricante `creality`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
