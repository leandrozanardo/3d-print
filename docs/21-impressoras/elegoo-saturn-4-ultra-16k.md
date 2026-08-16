---
id: printer.elegoo-saturn-4-ultra-16k
title: Elegoo Saturn 4 Ultra 16K
summary: ELEGOO Saturn 4 Ultra 16K é MSLA 10" 16K (15120×6230) volume 211.68×118.37×220 mm, até 150 mm/h, listada na loja oficial US em 2026-08-16.
doc_type: printer
domain:
- printers
- resin
technology:
- vat-photopolymerization
process:
- msla
applies_to:
- elegoo-saturn-4-ultra-16k
not_for:
- fff-settings-transfer
- invent-exposure-times
knowledge_status: draft
lifecycle: current
coverage_level: documented
evidence_status: manufacturer-specific
safety_level: high
confidence: high
last_reviewed: '2026-08-16'
review_cycle: 3-months
sources:
- source.elegoo-official-products
- source.elegoo-saturn-4-ultra-16k
related:
- manufacturer.elegoo
- hub.impressoras
- tech.vat-photopolymerization
- tech.sla-dlp-msla
prerequisites:
- tech.sla-dlp-msla
supersedes: []
aliases_pt_br: []
aliases_en:
- Elegoo Saturn 4 Ultra 16K
- ELEGOO Saturn 4 Ultra 16K
- Saturn 4 Ultra 16K
tags:
- printer
- elegoo
- resin
- msla
- documented
- saturn-4-series
manufacturer_id: elegoo
model_name: Saturn 4 Ultra 16K
family_status: saturn-4-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/saturn-4-ultra-16k-10inch-monochrome-lcd-resin-3d-printer (accessed 2026-08-16).
---
# Elegoo Saturn 4 Ultra 16K

Hub: [Impressoras](INDEX.md) · Fabricante: [Elegoo](manufacturer-elegoo.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Elegoo (`manufacturer.elegoo`) |
| Modelo | Saturn 4 Ultra 16K |
| Família | saturn-4-series |
| coverage_level | `documented` |
| Regiões | US |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/saturn-4-ultra-16k-10inch-monochrome-lcd-resin-3d-printer (accessed 2026-08-16). |
| URL produto | https://us.elegoo.com/products/saturn-4-ultra-16k-10inch-monochrome-lcd-resin-3d-printer |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 211.68 × 118.37 × 220 mm | loja US (oficial) |
| Resolution | 15120 × 6230 (16K); XY 14 × 19 μm | loja (oficial) |
| Max speed claim | 150 mm/h; 5.5 s/layer under stated fast-mode parameters | loja (oficial) |
| Tank heating | Smart tank heating at 30 °C | loja (oficial) |
| Leveling | Auto-leveling / plug-and-play claim | loja (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: vat photopolymerization / msla
- Tilt release technology; AI camera with chamber light
- Não é FFF Centauri/Neptune

## Manuais

- Página produto/FAQ: https://us.elegoo.com/products/saturn-4-ultra-16k-10inch-monochrome-lcd-resin-3d-printer
- Wiki/support OEM quando linkado na página

## Hardware

- Residue / resin shortage / leveling failure alarms
- Power-loss recovery; overheating protection pause >80 °C LED
- PFA film; tempered glass LCD protector

## Software

- Slicer resin oficial / Chitubox / Lychee conforme OEM
- Não importar perfis FFF

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar perfil do **modelo/resolução**; exposição/lift específicos

## Materiais

- Resinas 405 nm ELEGOO; third-party com fine-tune

TDS/SDS do filamento/resina não são substituídos por esta página.

## Manutenção

- Leveling / film / LCD protector: seguir procedimento oficial do modelo
- Troca de filme de liberação: resetar contadores se o firmware exigir
- Resina residual: filtrar e armazenar conforme SDS; não misturar lotes sem validação

## Segurança

- Resina não curada: PPE (luvas nitrílicas, óculos), ventilação, descarte químico
- UV/LCD: não olhar fonte UV; manter tampa fechada durante exposição
- IPA/solventes: inflamáveis; longe de ignição
- Critérios de parada: vazamento de vat, LCD danificado, odor intenso, overheat alarm

## Known issues

- AI detection results vary by environment/resin (nota oficial)
- Velocidade mm/h depende de resina/altura de camada; claims de lab ≠ qualquer resina
- Não transferir tempos de exposição entre modelos/resoluções

## Fontes

- [source.elegoo-official-products](../22-fontes/elegoo-official-products.md)
- [source.elegoo-saturn-4-ultra-16k](../22-fontes/elegoo-saturn-4-ultra-16k.md)
- URL oficial: https://us.elegoo.com/products/saturn-4-ultra-16k-10inch-monochrome-lcd-resin-3d-printer

## Lacunas

- Firmware pinado
- Matriz de exposição oficial por resina (além de claims genéricos)
- Troubleshooting-mapped (falha de adesão, layer lines, film life)
