---
id: printer.asiga-ultra
title: Asiga Ultra
summary: Asiga Ultra (Asiga Ultra) — coverage documented com seções DoD, technology/process preenchidos (dlp), lifecycle `current`, evidência de listagem oficial acesso 2026-08-16.
doc_type: printer
domain:
- printers
- resin
technology:
- vat-photopolymerization
process:
- dlp
applies_to:
- asiga
- asiga-ultra
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
- source.asiga-official-products
related:
- manufacturer.asiga
- hub.impressoras
- meta.printer-global-catalog
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br:
- Asiga Ultra
aliases_en:
- Asiga Ultra
- Asiga Ultra
tags:
- printer
- documented
- asiga
- current
manufacturer_id: asiga
model_name: Asiga Ultra
family_status: unknown
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Listed on official manufacturer product listing https://www.asiga.com/3d-printers/ (accessed 2026-08-16); treated as current catalog presence for this remediation pass.
---

# Asiga Ultra

Hub: [Impressoras](INDEX.md) · Fabricante: [Asiga](manufacturer-asiga.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Asiga (`manufacturer.asiga`) |
| Modelo | Asiga Ultra |
| Título canônico | Asiga Ultra |
| Tecnologia (FM) | `vat-photopolymerization` |
| Processo (FM) | `dlp` |
| Lifecycle (FM) | `current` |
| coverage_level (FM) | `documented` |
| Fonte | [source.asiga-official-products](../22-fontes/asiga-official-products.md) |

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
| source id | `source.asiga-official-products` |
| URL exata | https://www.asiga.com/3d-printers/ |
| data de acesso | 2026-08-16 |
| availability signal | Listed on official manufacturer product listing https://www.asiga.com/3d-printers/ (accessed 2026-08-16); treated as current catalog presence for this remediation pass. |
| lifecycle result | `current` |
| confidence | medium |

## Escopo e exclusões

**Inclui:** identidade do **Asiga Ultra**, sincronização FM≡body, seções DoD com conteúdo operacional da classe `resin` específico para o **Asiga Ultra**, lacunas explícitas.
**Exclui:** inventar temperatures/volumes/materiais não observados; misturar evidência de outro SKU no **Asiga Ultra**; promover marketing não citado.

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability ≠ certeza de processo no **Asiga Ultra**.

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume / envelope | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Asiga Ultra |
| Temperaturas / energia de processo | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Asiga Ultra |
| Materiais homologados (lista pinada) | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Asiga Ultra |
| Firmware / revisões de hardware | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Asiga Ultra |

## Tecnologia

- Classe: vat photopolymerization (MSLA/DLP/SLA conforme OEM) para **Asiga Ultra**
- Fluxo: resina → exposição seletiva → lavagem/cura pós-processo no fluxo do **Asiga Ultra**
- Não tratar resolução de marketing do **Asiga Ultra** como metrologia garantida sem TDS

## Manuais

- Portal / support do fabricante para **Asiga Ultra**: partir da listagem `https://www.asiga.com/3d-printers/`
- Manual de operação/service completo do **Asiga Ultra**: frequentemente portal/NDA — **não republicado** aqui quando não público
- Se HTML público completo não foi capturado em 2026-08-16: declarado em Lacunas do **Asiga Ultra**

## Hardware

- Identidade de hardware: **Asiga Ultra** / `Asiga Ultra` sob `manufacturer.asiga`
- Revisões de hardware pinadas por serial do **Asiga Ultra**: não publicadas nesta revisão
- Consumíveis típicos da classe `resin` aplicam-se ao **Asiga Ultra** apenas após confirmação OEM

## Software

- Software de preparação OEM para **Asiga Ultra**
- Firmware/LCD driver versions: lacuna sem pinagem datada do **Asiga Ultra**

## Firmware

- Canal oficial de release notes do **Asiga Ultra**: não pinado com versão datada nesta revisão
- Não inventar versão de firmware do **Asiga Ultra** sem captura datada

## Slicer

- Preparação de suporte/orientação no software OEM do **Asiga Ultra** (não slicer FFF)
- Não reutilizar profiles de outro tamanho de tanque no **Asiga Ultra** sem validação

## Materiais

Resinas homologadas para **Asiga Ultra**: não inventar lista. Onde o fabricante não publicou na evidência de 2026-08-16, registrar lacuna. SDS da resina é mandatório antes de uso no **Asiga Ultra**.

## Manutenção

### Operação (classe resina — Asiga Ultra)
- Nivelamento da plataforma e inspeção do film/FEP/tank do **Asiga Ultra**
- Troca de film/tanque conforme desgaste; não operar com film danificado no **Asiga Ultra**
- Wash & cure: seguir tempos/UV do fabricante da resina e do **Asiga Ultra**

## Segurança

- Resina não curada: pele/olhos — EPI (luvas nitrile, óculos) no **Asiga Ultra**
- VOC/odores: ventilação; descarte de IPA/resina conforme normas locais
- UV: não expor pele/olhos à fonte do **Asiga Ultra** aberta

## Known issues

Base pública de known-issues específica do **Asiga Ultra** não foi sistematizada nesta passagem.

| Tema | Nota |
|---|---|
| Specs incompletas | Ver Lacunas do **Asiga Ultra** |
| Transferência de presets | Não copiar de outro modelo para o **Asiga Ultra** sem adaptação |
| Troubleshooting de campo | Promover a `troubleshooting-mapped` só com árvore/support notes |

## Fontes

- [source.asiga-official-products](../22-fontes/asiga-official-products.md) — https://www.asiga.com/3d-printers/

## Lacunas

- Datasheet completo pinado do **Asiga Ultra** além dos claims da tabela (quando houver)
- Manuais de serviço / error codes do **Asiga Ultra**
- Firmware/software versions datadas do **Asiga Ultra**
- Known issues de campo com URLs de support
- Matriz de materiais homologados com TDS para o **Asiga Ultra**
