---

id: printer.creality-sparkx-i7-nano
title: Creality SPARKX i7 NANO
summary: Creality SPARKX i7 NANO é o SKU compacto multi-color da família SPARKX i7
  (CFS nano), listado na loja oficial Creality em 2026-08-16 com ETA de envio 8.28.
  Specs numéricas dedicadas do NANO são limitadas; volume da plataforma i7 só é citado
  com origem explícita.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- creality-sparkx-i7-nano
- creality-print
not_for:
- copy-i7-specs-as-nano-only-without-attribution
- invent-nano-build-volume
knowledge_status: draft
lifecycle: preorder
coverage_level: documented
evidence_status: manufacturer-specific
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
sources:
- source.creality-official-products
- source.creality-sparkx-i7-nano-store
- source.creality-sparkx-i7-product
- source.creality-k2-series-product
related:
- manufacturer.creality
- hub.impressoras
- printer.creality-sparkx-i7
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- SPARKX i7 NANO
- i7 Nano Combo
aliases_en:
- Creality SPARKX i7 NANO
- SPARKX i7 Nano Combo
tags:
- printer
- creality
- sparkx
- preorder
- documented
manufacturer_id: creality
model_name: SPARKX i7 NANO
family_status: sparkx-i7-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed on official Creality store https://store.creality.com/products/sparkx-i7-nano-3d-printer
  with title signal ETA 8.28 (accessed 2026-08-16); family marketing at https://www.creality.com/products/sparkx-i7.
---
# Creality SPARKX i7 NANO

Hub: [Impressoras](INDEX.md) · Fabricante: [Creality](manufacturer-creality.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Creality (`manufacturer.creality`) |
| Modelo | Creality SPARKX i7 NANO |
| Família | sparkx-i7-series |
| coverage_level | `documented` |
| Regiões | Global |
| Posicionamento | SKU/combo compacto multi-color com **CFS nano** (4 slots), distinto do Color Combo (CFS Lite) |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `preorder` |
| observed_at | 2026-08-16 |
| justification | Página de loja lista o SKU com **ETA 8.28** no título — sinal de envio futuro na data de acesso, não “in stock imediato” inequívoco. |
| evidence | Listed on official Creality store https://store.creality.com/products/sparkx-i7-nano-3d-printer with title signal ETA 8.28 (accessed 2026-08-16); family marketing at https://www.creality.com/products/sparkx-i7. |
| URL loja | https://store.creality.com/products/sparkx-i7-nano-3d-printer |

## Especificações

A URL NANO ([source.creality-sparkx-i7-nano-store](../22-fontes/creality-sparkx-i7-nano-store.md)) **não** publica tabela numérica dedicada (volume/temps) no texto extraído em 2026-08-16.

| Capability | Valor | Nota de proveniência |
|---|---|---|
| Build volume (plataforma i7) | 260 × 260 × 255 mm | Publicado para **SPARKX i7** em [source.creality-sparkx-i7-product](../22-fontes/creality-sparkx-i7-product.md) — **não** como célula “NANO-only” na loja NANO |
| CFS nano body | 127 × 85 × 65 mm; 4 slots; 445 g | Specs CFS nano na página família i7 |
| Max nozzle / bed / speed (i7) | ≤300 °C / ≤100 °C / ≤500 mm/s | Página família i7 — atribuir à plataforma, não inventar delta NANO (oficial)|
| Specs exclusivas NANO (massa máquina, dims, accel) | **não publicado pelo fabricante na evidência consultada em 2026-08-16** | loja NANO |
| Package (Nano Combo) | Package dims/gross weight listados na família i7 | 552×530×369 mm / 13,5 kg (família) (oficial)|

## Tecnologia

- material extrusion / FFF (mesma família SPARKX i7)
- Diferencial NANO: foco em **CFS nano** compacto (open filament storage, 1 feeding motor, multicolor Yes, multiple CFS nano units **Not supported**)
- Não assumir CFS Lite humidity box no SKU NANO

## Manuais

- Herda wiki/support SPARKX i7
- Nota família: Nano Combo pode enviar como “i7 Nano Combo” ou “i7+CFS Nano i7 Kit”
- Manual NANO-only: lacuna

## Hardware

- Printer: quick-swap / RGB / AI camera — claims de marketing compartilhados com i7 na loja NANO (texto genérico)
- CFS nano: 4 indicadores, RS485, 24V via cabo, PLA/PETG/PLA-CF (specs CFS nano; TPU **não** listado no CFS nano vs Lite)
- Privacy cover / CubeMe: marketing família

## Software

- Creality Print / Creality Cloud / CubeMe (família)
- Versão mínima pinada só para i7 (6.3+) — confirmar se NANO exige o mesmo quando ETA virar GA

## Firmware

- Suporte CFS nano aparece em changelogs wiki i7 (família) — **build pinado NANO**: não publicado na loja NANO em 2026-08-16

## Slicer

- Creality Print; selecionar perfil correto do combo NANO/CFS nano quando disponível
- Não misturar purging/path do CFS Lite

## Materiais

- CFS nano filament compatibility (oficial): PLA / PETG / PLA-CF
- TPU na plataforma i7: shore 64D+ na máquina; **CFS nano não lista TPU** — não imprimir TPU multicolor via nano sem evidência nova
- ABS/ASA: não listados

## Manutenção

- PTFE routing crítico para mapeamento de slots CFS nano (changelog wiki família)
- Dessecante: CFS nano é “Open” storage — umidade é risco operacional maior que CFS Lite

## Segurança

- Mesmos riscos FFF desktop da i7 + filamentos abertos no nano rack
- Critérios de parada: mis-map de slot, air printing, odor, overheat

## Known issues

- ETA 8.28 pode desatualizar lifecycle para `current` após ship — revalidar
- Risco editorial: clonar specs i7 sem marcar origem
- Slot numbering UI/firmware CFS nano já teve remap (wiki família) — validar versão

## Fontes

- [Fonte — Creality K2 Series página oficial de produto](../22-fontes/creality-k2-series-product.md)


- [source.creality-sparkx-i7-nano-store](../22-fontes/creality-sparkx-i7-nano-store.md)
- [source.creality-sparkx-i7-product](../22-fontes/creality-sparkx-i7-product.md)
- [source.creality-official-products](../22-fontes/creality-official-products.md)

## Lacunas

- Tabela de specs NANO-only no fabricante
- Confirmação pós-ship de lifecycle `current`
- Troubleshooting-mapped específico CFS nano + NANO kit variants

<!-- editorial-fingerprint:printer.creality-sparkx-i7-nano:creality-sparkx-i7-nano.md -->

### Nota de especificidade — Creality SPARKX i7 NANO

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Creality SPARKX i7 NANO** (`printer.creality-sparkx-i7-nano`, fabricante `creality`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
