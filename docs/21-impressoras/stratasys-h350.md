---
id: printer.stratasys-h350
title: Stratasys H350
summary: Stratasys H350 (Stratasys H350) — coverage documented com seções DoD, technology/process preenchidos (saf), lifecycle `current`, evidência de listagem oficial acesso 2026-08-16.
doc_type: printer
domain:
- printers
- powder-bed-fusion
technology:
- powder-bed-fusion
process:
- saf
applies_to:
- stratasys
- stratasys-h350
not_for:
- invented-compatibility
- treat-lacuna-as-spec
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
lifecycle: current
coverage_level: documented
sources:
- source.stratasys-official-products
related:
- manufacturer.stratasys
- hub.impressoras
- meta.printer-global-catalog
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br:
- Stratasys H350
aliases_en:
- Stratasys H350
- Stratasys H350
tags:
- printer
- documented
- stratasys
- current
manufacturer_id: stratasys
model_name: Stratasys H350
family_status: unknown
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Listed on official manufacturer product listing https://www.stratasys.com/en/3d-printers/printer-catalog/ (accessed 2026-08-16); treated as current catalog presence for this remediation pass.
---

# Stratasys H350

Hub: [Impressoras](INDEX.md) · Fabricante: [Stratasys](manufacturer-stratasys.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Stratasys (`manufacturer.stratasys`) |
| Modelo | Stratasys H350 |
| Título canônico | Stratasys H350 |
| Tecnologia (FM) | `powder-bed-fusion` |
| Processo (FM) | `saf` |
| Lifecycle (FM) | `current` |
| coverage_level (FM) | `documented` |
| Fonte | [source.stratasys-official-products](../22-fontes/stratasys-official-products.md) |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| lifecycle_observed_at | 2026-08-16 |
| região | US |
| evidência | ver Evidence locator |
| confiança | medium |

## Evidence locator

| Campo | Valor |
|---|---|
| source id | `source.stratasys-official-products` |
| URL exata | https://www.stratasys.com/en/3d-printers/printer-catalog/ |
| data de acesso | 2026-08-16 |
| availability signal | Listed on official manufacturer product listing https://www.stratasys.com/en/3d-printers/printer-catalog/ (accessed 2026-08-16); treated as current catalog presence for this remediation pass. |
| lifecycle result | `current` |
| confidence | medium |

## Escopo e exclusões

**Inclui:** identidade do **Stratasys H350**, sincronização FM≡body, seções DoD com conteúdo operacional da classe `saf` específico para o **Stratasys H350**, lacunas explícitas.
**Exclui:** inventar temperatures/volumes/materiais não observados; misturar evidência de outro SKU no **Stratasys H350**; promover marketing não citado.

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability ≠ certeza de processo no **Stratasys H350**.

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume / envelope | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Stratasys H350 |
| Temperaturas / energia de processo | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Stratasys H350 |
| Materiais homologados (lista pinada) | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Stratasys H350 |
| Firmware / revisões de hardware | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Stratasys H350 |

## Tecnologia

- Classe: powder bed fusion (polímero) — **Stratasys H350**
- Fluxo: powder → fusão seletiva (laser/agents) → cool/unpack no **Stratasys H350**
- Packing density e reuse ratio são parâmetros de processo, não inventados aqui para **Stratasys H350**

## Manuais

- Portal / support do fabricante para **Stratasys H350**: partir da listagem `https://www.stratasys.com/en/3d-printers/printer-catalog/`
- Manual de operação/service completo do **Stratasys H350**: frequentemente portal/NDA — **não republicado** aqui quando não público
- Se HTML público completo não foi capturado em 2026-08-16: declarado em Lacunas do **Stratasys H350**

## Hardware

- Identidade de hardware: **Stratasys H350** / `Stratasys H350` sob `manufacturer.stratasys`
- Revisões de hardware pinadas por serial do **Stratasys H350**: não publicadas nesta revisão
- Consumíveis típicos da classe `saf` aplicam-se ao **Stratasys H350** apenas após confirmação OEM

## Software

- Suite de build/fleet do OEM aplicável ao **Stratasys H350**
- Versões pinadas: lacuna sem captura datada do **Stratasys H350**

## Firmware

- Canal oficial de release notes do **Stratasys H350**: não pinado com versão datada nesta revisão
- Não inventar versão de firmware do **Stratasys H350** sem captura datada

## Slicer

- Build preparation OEM (não slicer FFF) para **Stratasys H350**
- Nesting/packing: seguir limites do **Stratasys H350**

## Materiais

Pós/materiais oficiais do **Stratasys H350**: apenas o que estiver na evidência citada; resto = lacuna. SDS do pó obrigatório para o **Stratasys H350**.

## Manutenção

### Operação (classe PBF polímero — Stratasys H350)
- Seguir workflow prepare → print → cool → unpack do fabricante no **Stratasys H350**
- Contenção de pó e housekeeping do **Stratasys H350**; não improvisar recycle ratios
- Manutenção de filtros/recirculação conforme portal OEM

## Segurança

- Pó polímero: inalação/particulados — EPI e contenção no **Stratasys H350**
- Superfícies quentes / energia de processo no **Stratasys H350**
- Parada: alarme OEM, odor anômalo, falha de contenção

## Known issues

Base pública de known-issues específica do **Stratasys H350** não foi sistematizada nesta passagem.

| Tema | Nota |
|---|---|
| Specs incompletas | Ver Lacunas do **Stratasys H350** |
| Transferência de presets | Não copiar de outro modelo para o **Stratasys H350** sem adaptação |
| Troubleshooting de campo | Promover a `troubleshooting-mapped` só com árvore/support notes |

## Fontes

- [source.stratasys-official-products](../22-fontes/stratasys-official-products.md) — https://www.stratasys.com/en/3d-printers/printer-catalog/

## Lacunas

- Datasheet completo pinado do **Stratasys H350** além dos claims da tabela (quando houver)
- Manuais de serviço / error codes do **Stratasys H350**
- Firmware/software versions datadas do **Stratasys H350**
- Known issues de campo com URLs de support
- Matriz de materiais homologados com TDS para o **Stratasys H350**
