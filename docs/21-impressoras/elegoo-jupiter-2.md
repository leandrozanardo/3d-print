---
id: printer.elegoo-jupiter-2
title: Elegoo Jupiter 2
summary: ELEGOO Jupiter 2 é MSLA large-format resin com volume 302×162×300 mm, listada na loja oficial US em 2026-08-16.
doc_type: printer
domain:
- printers
- resin
technology:
- vat-photopolymerization
process:
- msla
applies_to:
- elegoo-jupiter-2
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
- source.elegoo-jupiter-2
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
- Elegoo Jupiter 2
- ELEGOO Jupiter 2
- Jupiter 2
tags:
- printer
- elegoo
- resin
- msla
- documented
- jupiter-series
manufacturer_id: elegoo
model_name: Jupiter 2
family_status: jupiter-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/elegoo-jupiter-2 (accessed 2026-08-16).
---
# Elegoo Jupiter 2

Hub: [Impressoras](INDEX.md) · Fabricante: [Elegoo](manufacturer-elegoo.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Elegoo (`manufacturer.elegoo`) |
| Modelo | Jupiter 2 |
| Família | jupiter-series |
| coverage_level | `documented` |
| Regiões | US |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/elegoo-jupiter-2 (accessed 2026-08-16). |
| URL produto | https://us.elegoo.com/products/elegoo-jupiter-2 |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 302 × 162 × 300 mm | loja US (oficial) |
| Class | Jupiter large resin series | loja + download center |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: vat photopolymerization / msla
- Maior que Mars/Saturn mid — não copiar exposição

## Manuais

- Página produto/FAQ: https://us.elegoo.com/products/elegoo-jupiter-2
- Wiki/support OEM quando linkado na página

## Hardware

- Large vat handling — risco de derrame; PPE obrigatório

## Software

- Slicer resin oficial / Chitubox / Lychee conforme OEM
- Não importar perfis FFF

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar perfil do **modelo/resolução**; exposição/lift específicos

## Materiais

- Resinas ELEGOO Jupiter-compatible; bundles Mercury comuns

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

- Resolução LCD pinada: lacuna se não no HTML estático
- Velocidade mm/h depende de resina/altura de camada; claims de lab ≠ qualquer resina
- Não transferir tempos de exposição entre modelos/resoluções

## Fontes

- [source.elegoo-official-products](../22-fontes/elegoo-official-products.md)
- [source.elegoo-jupiter-2](../22-fontes/elegoo-jupiter-2.md)
- URL oficial: https://us.elegoo.com/products/elegoo-jupiter-2

## Lacunas

- Firmware pinado
- Matriz de exposição oficial por resina (além de claims genéricos)
- Troubleshooting-mapped (falha de adesão, layer lines, film life)
