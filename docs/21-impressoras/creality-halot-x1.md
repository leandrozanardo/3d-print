---
id: printer.creality-halot-x1
title: Creality HALOT-X1
summary: Creality HALOT-X1 é impressora de resina MSLA/LCD 16K (10,1") com volume
  211,68×118,37×200 mm e velocidade máx. 170 mm/h, listada no site oficial Creality
  em 2026-08-16. Não é FFF.
doc_type: printer
domain:
- printers
- resin
technology:
- vat-photopolymerization
process:
- msla
applies_to:
- creality-halot-x1
- halot-box
not_for:
- fff-settings-transfer
- disable-door-security-casually
- third-party-resin-without-tuning
knowledge_status: draft
lifecycle: current
coverage_level: documented
evidence_status: manufacturer-specific
safety_level: high
confidence: high
last_reviewed: '2026-08-16'
review_cycle: 3-months
sources:
- source.creality-official-products
- source.creality-halot-x1-product
related:
- manufacturer.creality
- hub.impressoras
- tech.vat-photopolymerization
- tech.sla-dlp-msla
prerequisites:
- tech.sla-dlp-msla
supersedes: []
aliases_pt_br:
- HALOT-X1
- Creality Halot X1
aliases_en:
- Creality HALOT-X1
- HALOT-X1 Combo
tags:
- printer
- creality
- resin
- msla
- documented
manufacturer_id: creality
model_name: HALOT-X1
family_status: halot-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed on official Creality product page
  https://www.creality.com/products/halot-x1 and store listing
  https://store.creality.com/products/halot-x1-resin-3d-printer (accessed 2026-08-16).
---
# Creality HALOT-X1

Hub: [Impressoras](INDEX.md) · Fabricante: [Creality](manufacturer-creality.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Creality (`manufacturer.creality`) |
| Modelo | Creality HALOT-X1 |
| Família | halot-series |
| coverage_level | `documented` |
| Regiões | Global |
| Variantes | HALOT-X1; HALOT-X1 Combo (AFU) |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed on official Creality product page https://www.creality.com/products/halot-x1 and store listing https://store.creality.com/products/halot-x1-resin-3d-printer (accessed 2026-08-16). |
| URL produto | https://www.creality.com/products/halot-x1 |
| URL loja | https://store.creality.com/products/halot-x1-resin-3d-printer |

## Especificações

Fonte: [source.creality-halot-x1-product](../22-fontes/creality-halot-x1-product.md) — bloco “X1 Specifications” (2026-08-16):

| Capability | Valor oficial observado | Nota |
|---|---|---|
| Printing technology | LCD (MSLA) | fabricante |
| Machine size | 344 × 331 × 434 mm | specs |
| Printing size | 211,68 × 118,37 × 200 mm | specs |
| Resolution | 16K (15120 × 6230 px) | specs + marketing |
| Pixel size | 14 × 19 μm | specs |
| Z-axis accuracy | 0,01 mm | specs |
| Layer thickness | 0,01–0,2 mm | specs |
| Max print speed | 170 mm/h | specs |
| Exposure intensity | 6500+10% μW/cm² (não ajustável pelo usuário — FAQ) | specs + FAQ |
| Light source | Honeycomb Matrix | specs |
| Touch screen | 3,98-inch capacitive | specs |
| Power | 350 W | specs |
| N.W. / G.W. | 12,93 kg / 16,19 kg | specs |
| UV wavelength | 405 nm | FAQ oficial |
| Data transfer | USB / WIFI | specs |

## Tecnologia

- Categoria: vat photopolymerization
- Processo: **msla** (LCD masking); fabricante rotula “LCD”
- Motion: top-down — vat/fonte se movem, build plate fixa (marketing leveling-free)
- 92-zone intelligent exposure (marketing)

## Manuais

- Download Manual + PioCreat Studio Tutorial links na página produto
- FAQ embutido (door security, parameter packs via Creality Cloud)
- Service manual profundo: lacuna

## Hardware

- 10,1" 16K mono LCD; quick-release vat / twist build plate
- Dual linear rails + dual lead screws (marketing)
- AFU (Combo): feed/recycle, RFID resin params, heating 30–35 °C (marketing; faixa 30–45 °C aparece em canais retail — preferir página oficial)
- Sensors: proximity (lid), Z limit (FAQ)

## Software

- HALOT BOX / Chitu Box (specs); CHITUBOX Pro trial 3 meses (marketing)
- PioCreat Studio tutorial referenciado no FAQ
- Creality Cloud para parameter packs

## Firmware

- Versão pinada: **não publicado pelo fabricante na evidência consultada em 2026-08-16**

## Slicer

- HALOT BOX / Chitu Box / PioCreat Studio conforme fluxo oficial
- Não importar perfis FFF; exposição/lift são específicos HALOT-X1

## Materiais

- 405 nm UV resin
- Resinas oficiais com RFID (AFU) carregam parâmetros automaticamente
- Terceiros / jewelry resin: possível, mas exige fine-tune (FAQ); light intensity não ajustável aumenta risco de incompatibilidade

## Manutenção

- True leveling-free claim (placa pré-nivelada)
- Troca de filme NACF / LCD: lacuna procedural local
- Não deletar histórico de prints no device (FAQ: overwrite only)

## Segurança

- Resina: PPE (luvas, óculos), ventilação, descarte químico
- Door security reminder — fabricante **não recomenda** desabilitar
- Respirator incluso no unboxing marketing — usar conforme SDS da resina
- Critérios de parada: vazamento de vat, odor intenso, falha de lid sensor, overcure em massa

## Known issues

- Light intensity não ajustável (FAQ) vs expectativa de outras 16K
- USB lento: fabricante recomenda USB 3.2
- Confusão PioCreat vs Creality branding em tutoriais

## Fontes

- [source.creality-halot-x1-product](../22-fontes/creality-halot-x1-product.md)
- [source.creality-official-products](../22-fontes/creality-official-products.md)
- Loja: https://store.creality.com/products/halot-x1-resin-3d-printer

## Lacunas

- Datasheet PDF revisionado + AFU-only vs base BOM
- Firmware pinado
- Troubleshooting-mapped (layer lines, failed plate adhesion, RFID miss)
