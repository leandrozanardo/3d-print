---

id: printer.eos-eos-p-770
title: EOS P 770
summary: >
 EOS P 770 (EOS P 770) é sistema SLS polímero EOS listado na página oficial de polymer
 printers (acesso 2026-08-16). Build volume 700 × 380 × 580 mm (~150 L claim). Lifecycle
 current; coverage documented. Fonte source.eos-official-products (não metal listing).
doc_type: printer
domain:
- printers
- polymer
- powder-bed-fusion
technology:
- powder-bed-fusion
process:
- sls
applies_to:
- eos
- eos-eos-p-770
not_for:
- metal-printer-evidence
- invented-compatibility
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
lifecycle: current
coverage_level: cataloged
sources:
- source.eos-official-products
related:
- manufacturer.eos
- hub.impressoras
- source.eos-official-metal-printers
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br: []
aliases_en:
- EOS P 770
- EOS P 770
tags:
- printer
- cataloged
- eos
- polymer
- sls
manufacturer_id: eos
model_name: EOS P 770
family_status: polymer-sls
lifecycle_observed_at: '2026-08-16'
regions:
- global
availability_evidence: Listed on official EOS polymer printers page https://www.eos.info/polymer-solutions/polymer-printers (accessed 2026-08-16).
---

# EOS P 770

Hub: [Impressoras](INDEX.md) · Fabricante: [EOS](manufacturer-eos.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | EOS |
| Modelo | EOS P 770 |
| Processo | SLS / polymer laser powder bed fusion |
| Lifecycle | `current` |
| coverage_level | `cataloged` |
| Fonte | [source.eos-official-products](../22-fontes/eos-official-products.md) |
| URL oficial | https://www.eos.info/polymer-solutions/polymer-printers
| Classe | polymer / SLS |
| Tags de processo | `sls`, `polymer`, `powder-bed-fusion` |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| lifecycle_observed_at | 2026-08-16 |
| evidência | ver Evidence locator |
| confiança | medium–high (listagem/product page oficial) |

## Evidence locator

| Campo | Valor |
|---|---|
| source id | `source.eos-official-products` |
| URL exata | https://www.eos.info/polymer-solutions/polymer-printers |
| data de acesso | 2026-08-16 |
| availability signal | listagem / product page oficial |
| lifecycle result | `current` |


## Escopo e exclusões

**Inclui:** identidade, lifecycle, claims publicados na fonte citada, seções DoD com conteúdo operacional honesto da classe.
**Exclui:** inventar temperaturas/process parameters não publicados; tratar early access como GA; misturar evidência metal↔polímero. «printer.eos-eos-p-770»

## Especificações

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume (mm) | 700 × 380 × 580 mm (~150 L claim) ([source](../22-fontes/eos-official-products.md))| EOS polymer printers compare table |
| Lasers | 2× CO₂ ([source](../22-fontes/eos-official-products.md))| EOS polymer printers compare table |
| Machine dimensions (mm) | 2250 × 1550 × 2100 mm ([source](../22-fontes/eos-official-products.md))| EOS polymer printers compare table |
| Weight (kg) | 2300 kg ([source](../22-fontes/eos-official-products.md))| EOS polymer printers compare table |

Claims numéricos além da tabela: **não inventados**. Onde o fabricante não publicou detalhe pinável nesta revisão, ver Lacunas.

## Tecnologia

- Processo: Selective Laser Sintering (SLS) — polímero em pó
- Evidência primária: listagem de polymer printers EOS (não metal listing)
- Large build area SLS; EOSAME homogenization claim.

## Manuais

- Portal / documentação do fabricante: mapear a partir da página de produto/listagem
- Manuais de operação/service completos: frequentemente sob NDA / customer portal — não republicados aqui
- Não publicado pelo fabricante em HTML público completo nesta revisão (quando aplicável): declarado em Lacunas «printer.eos-eos-p-770»

## Hardware

- Série: EOS P 770
- Sem estruturas de suporte (pó não sinterizado como scaffold) — claim institucional SLS

## Software

- EOSPRINT / EOSCONNECT (conforme série)
- Versões pinadas: lacuna

## Firmware

- Versão de firmware/controller pinada: não publicada nesta página sem captura datada do fabricante
- Atualizações: canal oficial do OEM (customer portal / release notes) «printer.eos-eos-p-770»

## Slicer

- Build preparation EOS polymer — não slicer FFF
- Não misturar perfis metálicos DMLS

## Materiais

Materiais poliméricos validados EOS: consultar portfólio oficial — não inventar PA/TPU/etc. como compatíveis sem ficha EOS. INTEGRA P 450: claim de processamento até 300 °C na página. «printer.eos-eos-p-770»

## Manutenção

### Classe polymer SLS
- Sieving/refresh de pó, limpeza de câmara, troca de filtros, calibração térmica: manuais EOS
- Refresh ratios: seguir procedimento do material — não inventar percentuais «printer.eos-eos-p-770»

## Segurança

- Pó polimérico fino: inalação/particulados — EPI + SDS
- Temperatura de processo elevada; risco de queimadura
- Atmosfera/N₂ conforme sistema
- Critérios de parada: alarmes térmicos, odor de queima, falha de recoater «printer.eos-eos-p-770»

## Known issues

Known issues públicos por serial: **não publicados** na listagem.

Classe: warping de peça grande, orange peel, lack of fusion — requer parâmetros EOS + material.

## Fontes

- [source.eos-official-products](../22-fontes/eos-official-products.md) — https://www.eos.info/polymer-solutions/polymer-printers

## Lacunas

- Datasheet por SKU completo
- Manuais públicos
- Materiais certificados pinados
- Firmware
- Troubleshooting-mapped

## Status editorial (remediação corretiva 2026-08-16)

A página **EOS P 770** (`printer.eos-eos-p-770`) foi reclassificada de `documented` para `cataloged` porque, nesta execução, a única evidência pinada era listagem genérica do fabricante (`source.eos-official-products`, tipicamente `manufacturer-product-listing`). Listagem P3 sustenta identidade/presença no catálogo, não especificações, manuais, firmware ou known issues do SKU. Pesquisa de página oficial específica do modelo foi registrada no ledger JSONL; até existir fonte P1/P2 aplicável, `documented` permanece injustificado.

<!-- editorial-fingerprint:printer.eos-eos-p-770:eos-eos-p-770.md -->

### Nota de especificidade — EOS P 770

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **EOS P 770** (`printer.eos-eos-p-770`, fabricante `eos`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
