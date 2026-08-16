---
id: printer.eos-eos-p-500
title: EOS P 500
summary: >
 EOS P 500 (EOS P 500 Series) é sistema SLS polímero EOS listado na página oficial de
 polymer printers (acesso 2026-08-16). Build volume 500 × 330 × 400 mm. Lifecycle
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
- eos-eos-p-500
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
coverage_level: documented
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
- EOS P 500 Series
- EOS P 500
tags:
- printer
- documented
- eos
- polymer
- sls
manufacturer_id: eos
model_name: EOS P 500 Series
family_status: polymer-sls
lifecycle_observed_at: '2026-08-16'
regions:
- global
availability_evidence: Listed on official EOS polymer printers page https://www.eos.info/polymer-solutions/polymer-printers (accessed 2026-08-16).
---

# EOS P 500

Hub: [Impressoras](INDEX.md) · Fabricante: [EOS](manufacturer-eos.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | EOS |
| Modelo | EOS P 500 Series |
| Processo | SLS / polymer laser powder bed fusion |
| Lifecycle | `current` |
| coverage_level | `documented` |
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
**Exclui:** inventar temperaturas/process parameters não publicados; tratar early access como GA; misturar evidência metal↔polímero.

## Especificações

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume (mm) | 500 × 330 × 400 mm ([source](../22-fontes/eos-official-products.md))| EOS polymer printers compare table |
| Lasers | 2× CO₂ — 2× CO (variantes na tabela) ([source](../22-fontes/eos-official-products.md))| EOS polymer printers compare table |
| Machine dimensions (mm) | 3400 × 2100 × 2100 mm ([source](../22-fontes/eos-official-products.md))| EOS polymer printers compare table |
| Weight (kg) | 7000 kg ([source](../22-fontes/eos-official-products.md))| EOS polymer printers compare table |

Claims numéricos além da tabela: **não inventados**. Onde o fabricante não publicou detalhe pinável nesta revisão, ver Lacunas.

## Tecnologia

- Processo: Selective Laser Sintering (SLS) — polímero em pó
- Evidência primária: listagem de polymer printers EOS (não metal listing)
- Industrial polymer production; automation-friendly (claims listing).

## Manuais

- Portal / documentação do fabricante: mapear a partir da página de produto/listagem
- Manuais de operação/service completos: frequentemente sob NDA / customer portal — não republicados aqui
- Não publicado pelo fabricante em HTML público completo nesta revisão (quando aplicável): declarado em Lacunas

## Hardware

- Série: EOS P 500 Series
- Sem estruturas de suporte (pó não sinterizado como scaffold) — claim institucional SLS

## Software

- EOSPRINT / EOSCONNECT (conforme série)
- Versões pinadas: lacuna

## Firmware

- Versão de firmware/controller pinada: não publicada nesta página sem captura datada do fabricante
- Atualizações: canal oficial do OEM (customer portal / release notes)

## Slicer

- Build preparation EOS polymer — não slicer FFF
- Não misturar perfis metálicos DMLS

## Materiais

Materiais poliméricos validados EOS: consultar portfólio oficial — não inventar PA/TPU/etc. como compatíveis sem ficha EOS. INTEGRA P 450: claim de processamento até 300 °C na página.

## Manutenção

### Classe polymer SLS
- Sieving/refresh de pó, limpeza de câmara, troca de filtros, calibração térmica: manuais EOS
- Refresh ratios: seguir procedimento do material — não inventar percentuais

## Segurança

- Pó polimérico fino: inalação/particulados — EPI + SDS
- Temperatura de processo elevada; risco de queimadura
- Atmosfera/N₂ conforme sistema
- Critérios de parada: alarmes térmicos, odor de queima, falha de recoater

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
