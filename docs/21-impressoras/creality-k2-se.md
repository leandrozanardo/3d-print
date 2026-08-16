---
id: printer.creality-k2-se
title: Creality K2 SE
summary: Creality K2 SE é impressora FFF open-frame da linha K2 com volume 220×215×245
  mm e CFS até 16 cores, listada na loja oficial Creality em 2026-08-16. Não possui
  enclosure/câmara aquecida como K2 Pro/Plus.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- creality-k2-se
- creality-print
not_for:
- assume-enclosed-chamber-like-k2-pro
- treat-store-0.4mm-as-filament-diameter
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
- source.creality-k2-se-store
- source.creality-k2-series-product
related:
- manufacturer.creality
- hub.impressoras
- printer.creality-k2
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- K2 SE
- Creality K2 SE Combo
aliases_en:
- Creality K2 SE
- K2 SE Combo
- K2 SE(F)
tags:
- printer
- creality
- k2-series
- open-frame
- documented
manufacturer_id: creality
model_name: K2 SE
family_status: k2-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed for purchase on official Creality store https://store.creality.com/products/k2-se-combo-3d-printer
  (accessed 2026-08-16); marketing page https://www.creality.com/products/k2-se.
---
# Creality K2 SE

Hub: [Impressoras](INDEX.md) · Fabricante: [Creality](manufacturer-creality.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Creality (`manufacturer.creality`) |
| Modelo | Creality K2 SE |
| Família | k2-series (entrada open-frame) |
| coverage_level | `documented` |
| Regiões | Global |
| Variantes | K2 SE; K2 SE Combo; menções K2 SE(F) em lojas regionais |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase on official Creality store https://store.creality.com/products/k2-se-combo-3d-printer (accessed 2026-08-16); marketing page https://www.creality.com/products/k2-se. |
| URL loja | https://store.creality.com/products/k2-se-combo-3d-printer |

## Especificações

Fonte: [source.creality-k2-se-store](../22-fontes/creality-k2-se-store.md) (2026-08-16):

| Capability | Valor oficial observado | Nota |
|---|---|---|
| Printing technology | Fused Deposition Modeling | loja |
| Build volume | 220 × 215 × 245 mm | loja (oficial)|
| Printer dimensions | 834 × 355 × 482 mm | loja (footprint marketing/combo) (oficial)|
| Net weight | 10,58 kg | loja |
| Max speed / accel | ≤500 mm/s / ≤20000 mm/s² | loja (oficial)|
| Layer height | 0,1–0,35 mm | loja (oficial)|
| Extruder | Dual-gear direct drive | loja |
| Nozzle temp | ≤300 °C | loja (oficial)|
| Heatbed temp | ≤100 °C | loja (oficial)|
| Build plate | Epoxy resin | loja |
| Display | 3,97-inch color touchscreen | loja |
| Storage | 8 GB eMMC | loja |
| Rated power | 350 W | loja |
| Filament diameter | **não publicado de forma inequívoca** — tabela loja lista 0,4 mm no campo Filament Diameter (inconsistente; não validar como Ø filamento) | loja (oficial)|
| AI camera | “-” (opcional acessório K1-series cam, cabo separado) | loja |

## Tecnologia

- material extrusion / FFF
- **Open-frame** (não enclosed) — adequado a PLA/PETG; ABS/ASA sem enclosure é risco de warp/VOC
- CFS-ready até 4 unidades / 16 cores
- Step motors XYE (loja: “Step motors”, não step-servo FOC da K2 enclosed)

## Manuais

- Marketing: https://www.creality.com/products/k2-se
- Quick-start via touchscreen (claim loja)
- Manual PDF pinado: lacuna

## Hardware

- Frame die-cast aluminum + gussets/crossbeams (marketing)
- Quick-swap nozzle; run-out sensor; magnetic cutter (marketing)
- Air purifier Yes / lighting kit Yes / input shaping Yes (tabela loja)
- AI camera **não** inclusa de fábrica

## Software

- Creality Cloud + Ethernet/USB transfer (loja)
- UI multilíngue listada na loja

## Firmware

- Versão pinada: **não publicado pelo fabricante na evidência consultada em 2026-08-16**

## Slicer

- Creality Print 6.0 or newer
- Perfil **K2 SE** apenas; volume menor que K2/K2 Pro

## Materiais

- Compatíveis loja: PLA / PETG / TPU 95A / PLA-CF
- Sem lista ASA/PA-CF (diferente do K2 Pro) — não transferir
- Open-frame: priorizar PLA/PETG; TPU 95A conforme claim fabricante

## Manutenção

- Full-auto leveling (área do modelo)
- Power loss recovery Yes
- “Partial Failure? Just Skip It” em batch (marketing) — validar comportamento no firmware real

## Segurança

- Open-frame: proteção mecânica/térmica menor; manter afastamento de crianças/pets
- Air purifier claim não substitui ventilação
- Critérios de parada: blob, run-out ignorado, odor, colisão

## Known issues

- Confusão de naming K2 SE vs K2 enclosed series
- Campo Filament Diameter 0,4 mm na loja oficial é evidência **má** — tratar como erro de página
- Câmera AI opcional sem cabo incluso — armadilha de unboxing

## Fontes

- [Fonte — Creality K2 Series página oficial de produto](../22-fontes/creality-k2-series-product.md)


- [source.creality-k2-se-store](../22-fontes/creality-k2-se-store.md)
- [source.creality-official-products](../22-fontes/creality-official-products.md)
- Marketing: https://www.creality.com/products/k2-se

## Lacunas

- Clarificação oficial do Ø de filamento
- Manual/firmware pinados
- Troubleshooting-mapped (first-layer open-frame, CFS path on SE)
