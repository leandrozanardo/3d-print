---
id: printer.sinterit-suzy
title: Sinterit Suzy
summary: Sinterit Suzy (Sinterit Suzy) — coverage documented com seções DoD, technology/process preenchidos (sls), lifecycle `current`, evidência de listagem oficial acesso 2026-08-16.
doc_type: printer
domain:
- printers
- powder-bed-fusion
technology:
- powder-bed-fusion
process:
- sls
applies_to:
- sinterit
- sinterit-suzy
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
- source.sinterit-official-products
related:
- manufacturer.sinterit
- hub.impressoras
- meta.printer-global-catalog
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br:
- Sinterit Suzy
aliases_en:
- Sinterit Suzy
- Sinterit Suzy
tags:
- printer
- documented
- sinterit
- current
manufacturer_id: sinterit
model_name: Sinterit Suzy
family_status: unknown
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Listed on official manufacturer product listing https://sinterit.com/3dprinters/ (accessed 2026-08-16); treated as current catalog presence for this remediation pass.
---

# Sinterit Suzy

Hub: [Impressoras](INDEX.md) · Fabricante: [Sinterit](manufacturer-sinterit.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Sinterit (`manufacturer.sinterit`) |
| Modelo | Sinterit Suzy |
| Título canônico | Sinterit Suzy |
| Tecnologia (FM) | `powder-bed-fusion` |
| Processo (FM) | `sls` |
| Lifecycle (FM) | `current` |
| coverage_level (FM) | `documented` |
| Fonte | [source.sinterit-official-products](../22-fontes/sinterit-official-products.md) |

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
| source id | `source.sinterit-official-products` |
| URL exata | https://sinterit.com/3dprinters/ |
| data de acesso | 2026-08-16 |
| availability signal | Listed on official manufacturer product listing https://sinterit.com/3dprinters/ (accessed 2026-08-16); treated as current catalog presence for this remediation pass. |
| lifecycle result | `current` |
| confidence | medium |

## Escopo e exclusões

**Inclui:** identidade do **Sinterit Suzy**, sincronização FM≡body, seções DoD com conteúdo operacional da classe `sls` específico para o **Sinterit Suzy**, lacunas explícitas.
**Exclui:** inventar temperatures/volumes/materiais não observados; misturar evidência de outro SKU no **Sinterit Suzy**; promover marketing não citado.

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability ≠ certeza de processo no **Sinterit Suzy**.

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume / envelope | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Sinterit Suzy |
| Temperaturas / energia de processo | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Sinterit Suzy |
| Materiais homologados (lista pinada) | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Sinterit Suzy |
| Firmware / revisões de hardware | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Sinterit Suzy |

## Tecnologia

- Classe: powder bed fusion (polímero) — **Sinterit Suzy**
- Fluxo: powder → fusão seletiva (laser/agents) → cool/unpack no **Sinterit Suzy**
- Packing density e reuse ratio são parâmetros de processo, não inventados aqui para **Sinterit Suzy**

## Manuais

- Portal / support do fabricante para **Sinterit Suzy**: partir da listagem `https://sinterit.com/3dprinters/`
- Manual de operação/service completo do **Sinterit Suzy**: frequentemente portal/NDA — **não republicado** aqui quando não público
- Se HTML público completo não foi capturado em 2026-08-16: declarado em Lacunas do **Sinterit Suzy**

## Hardware

- Identidade de hardware: **Sinterit Suzy** / `Sinterit Suzy` sob `manufacturer.sinterit`
- Revisões de hardware pinadas por serial do **Sinterit Suzy**: não publicadas nesta revisão
- Consumíveis típicos da classe `sls` aplicam-se ao **Sinterit Suzy** apenas após confirmação OEM

## Software

- Suite de build/fleet do OEM aplicável ao **Sinterit Suzy**
- Versões pinadas: lacuna sem captura datada do **Sinterit Suzy**

## Firmware

- Canal oficial de release notes do **Sinterit Suzy**: não pinado com versão datada nesta revisão
- Não inventar versão de firmware do **Sinterit Suzy** sem captura datada

## Slicer

- Build preparation OEM (não slicer FFF) para **Sinterit Suzy**
- Nesting/packing: seguir limites do **Sinterit Suzy**

## Materiais

Pós/materiais oficiais do **Sinterit Suzy**: apenas o que estiver na evidência citada; resto = lacuna. SDS do pó obrigatório para o **Sinterit Suzy**.

## Manutenção

### Operação (classe PBF polímero — Sinterit Suzy)
- Seguir workflow prepare → print → cool → unpack do fabricante no **Sinterit Suzy**
- Contenção de pó e housekeeping do **Sinterit Suzy**; não improvisar recycle ratios
- Manutenção de filtros/recirculação conforme portal OEM

## Segurança

- Pó polímero: inalação/particulados — EPI e contenção no **Sinterit Suzy**
- Superfícies quentes / energia de processo no **Sinterit Suzy**
- Parada: alarme OEM, odor anômalo, falha de contenção

## Known issues

Base pública de known-issues específica do **Sinterit Suzy** não foi sistematizada nesta passagem.

| Tema | Nota |
|---|---|
| Specs incompletas | Ver Lacunas do **Sinterit Suzy** |
| Transferência de presets | Não copiar de outro modelo para o **Sinterit Suzy** sem adaptação |
| Troubleshooting de campo | Promover a `troubleshooting-mapped` só com árvore/support notes |

## Fontes

- [source.sinterit-official-products](../22-fontes/sinterit-official-products.md) — https://sinterit.com/3dprinters/

## Lacunas

- Datasheet completo pinado do **Sinterit Suzy** além dos claims da tabela (quando houver)
- Manuais de serviço / error codes do **Sinterit Suzy**
- Firmware/software versions datadas do **Sinterit Suzy**
- Known issues de campo com URLs de support
- Matriz de materiais homologados com TDS para o **Sinterit Suzy**
