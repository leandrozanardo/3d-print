---
id: printer.eos-eos-m-300
title: EOS M 300
summary: >
 EOS M 300 (EOS M 300 Series) é sistema DMLS metálico EOS listado na página oficial de
 metal printers (acesso 2026-08-16). Build volume 300 × 300 × 435 mm. Lifecycle current;
 coverage documented. Fonte source.eos-official-metal-printers (não polymer listing).
doc_type: printer
domain:
- printers
- metal
- powder-bed-fusion
technology:
- powder-bed-fusion
process:
- dmls
- metal-lpbf
applies_to:
- eos
- eos-eos-m-300
not_for:
- polymer-printer-evidence
- invented-compatibility
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: high
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
lifecycle: current
coverage_level: documented
sources:
- source.eos-official-metal-printers
related:
- manufacturer.eos
- hub.impressoras
- source.eos-official-products
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br: []
aliases_en:
- EOS M 300 Series
- EOS M 300
tags:
- printer
- documented
- eos
- metal
- dmls
manufacturer_id: eos
model_name: EOS M 300 Series
family_status: metal-dmls
lifecycle_observed_at: '2026-08-16'
regions:
- global
availability_evidence: Listed on official EOS metal printers page
  https://www.eos.info/metal-solutions/metal-printers (accessed 2026-08-16).
---

# EOS M 300

Hub: [Impressoras](INDEX.md) · Fabricante: [EOS](manufacturer-eos.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | EOS |
| Modelo | EOS M 300 Series |
| Processo | DMLS / metal laser powder bed fusion |
| Lifecycle | `current` |
| coverage_level | `documented` |
| Fonte | [source.eos-official-metal-printers](../22-fontes/eos-official-metal-printers.md) |
| URL oficial | https://www.eos.info/metal-solutions/metal-printers
| Classe | metal / DMLS |
| Tags de processo | `dmls`, `metal`, `powder-bed-fusion` |

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
| source id | `source.eos-official-metal-printers` |
| URL exata | https://www.eos.info/metal-solutions/metal-printers |
| data de acesso | 2026-08-16 |
| availability signal | listagem / product page oficial |
| lifecycle result | `current` |


## Escopo e exclusões

**Inclui:** identidade, lifecycle, claims publicados na fonte citada, seções DoD com conteúdo operacional honesto da classe.
**Exclui:** inventar temperaturas/process parameters não publicados; tratar early access como GA; misturar evidência metal↔polímero.

## Especificações

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume (mm) | 300 × 300 × 435 mm ([source](../22-fontes/eos-official-metal-printers.md))| EOS metal printers compare table |
| Lasers | 4× Yb-fiber ([source](../22-fontes/eos-official-metal-printers.md))| EOS metal printers compare table |
| Machine dimensions (mm) | 5221 × 2680 × 2340 mm ([source](../22-fontes/eos-official-metal-printers.md))| EOS metal printers compare table |
| Weight (kg) | 5500 kg ([source](../22-fontes/eos-official-metal-printers.md))| EOS metal printers compare table |

Claims numéricos além da tabela: **não inventados**. Onde o fabricante não publicou detalhe pinável nesta revisão, ver Lacunas.

## Tecnologia

- Processo: DMLS (Direct Metal Laser Solidification) — metal PBF
- Evidência primária: listagem metálica EOS (não usar URL de polímeros)
- Industrial multi-laser DMLS platform (claim listing).

## Manuais

- Portal / documentação do fabricante: mapear a partir da página de produto/listagem
- Manuais de operação/service completos: frequentemente sob NDA / customer portal — não republicados aqui
- Não publicado pelo fabricante em HTML público completo nesta revisão (quando aplicável): declarado em Lacunas

## Hardware

- Série: EOS M 300 Series
- Plataforma industrial com integração em chão de fábrica (claim institucional EOS)
- Variantes dual-laser / AMCM podem existir — confirmar SKU com EOS/AMCM

## Software

- EOSPRINT / EOSCONNECT e stack industrial EOS (nomes de módulos conforme contrato cliente)
- Versões pinadas: lacuna sem captura datada

## Firmware

- Versão de firmware/controller pinada: não publicada nesta página sem captura datada do fabricante
- Atualizações: canal oficial do OEM (customer portal / release notes)

## Slicer

- Build preparation EOS (não slicer FFF)
- Não reutilizar perfis de polímero SLS nesta máquina metálica

## Materiais

Portfólio de pós metálicos EOS / parâmetros certificados: **consultar** páginas de materiais EOS — não inventar ligas ou densidades aqui. Listagem afirma amplo portfolio na série M 290.

## Manutenção

### Classe metal PBF
- Troca de filtro, handling de pó metálico, recoater e calibragens ópticas: seguir manuais EOS
- Intervalos e peças: tipicamente customer portal — não republicados aqui
- Contaminação cruzada entre materiais: procedimento OEM obrigatório

## Segurança

- Pó metálico: risco de inalação, explosividade/combustibilidade conforme SDS da liga
- Laser classe industrial: interlocks e EPI
- Atmosfera inerte / O₂ monitoring conforme sistema
- Critérios de parada: alarmes de O₂, filtro, laser, smell anômalo, fire detection

## Known issues

Known issues públicos pinados por serial: **não publicados** nesta listagem.

Operacional: falhas típicas de classe (recoater streaks, lack of fusion, filter loading) exigem playbooks EOS + metalurgia — não inventar root-cause aqui.

## Fontes

- [source.eos-official-metal-printers](../22-fontes/eos-official-metal-printers.md) — https://www.eos.info/metal-solutions/metal-printers

## Lacunas

- Datasheet por SKU (potência laser exata da variante)
- Manuais / error codes públicos
- Lista de materiais certificados pinada
- Firmware versions
- Troubleshooting-mapped
