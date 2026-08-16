---
id: printer.carbon-m3
title: Carbon M3
summary: Carbon M3 (Carbon M3) — coverage documented com seções DoD, technology/process preenchidos (clip-dlp), lifecycle `current`, evidência de listagem oficial acesso 2026-08-16.
doc_type: printer
domain:
- printers
- resin
technology:
- vat-photopolymerization
process:
- clip-dlp
applies_to:
- carbon
- carbon-m3
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
- source.carbon-official-products
related:
- manufacturer.carbon
- hub.impressoras
- meta.printer-global-catalog
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br:
- Carbon M3
aliases_en:
- Carbon M3
- Carbon M3
tags:
- printer
- documented
- carbon
- current
manufacturer_id: carbon
model_name: Carbon M3
family_status: unknown
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Listed on official manufacturer product listing https://www.carbon3d.com/products (accessed 2026-08-16); treated as current catalog presence for this remediation pass.
---

# Carbon M3

Hub: [Impressoras](INDEX.md) · Fabricante: [Carbon](manufacturer-carbon.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Carbon (`manufacturer.carbon`) |
| Modelo | Carbon M3 |
| Título canônico | Carbon M3 |
| Tecnologia (FM) | `vat-photopolymerization` |
| Processo (FM) | `clip-dlp` |
| Lifecycle (FM) | `current` |
| coverage_level (FM) | `documented` |
| Fonte | [source.carbon-official-products](../22-fontes/carbon-official-products.md) |

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
| source id | `source.carbon-official-products` |
| URL exata | https://www.carbon3d.com/products |
| data de acesso | 2026-08-16 |
| availability signal | Listed on official manufacturer product listing https://www.carbon3d.com/products (accessed 2026-08-16); treated as current catalog presence for this remediation pass. |
| lifecycle result | `current` |
| confidence | medium |

## Escopo e exclusões

**Inclui:** identidade do **Carbon M3**, sincronização FM≡body, seções DoD com conteúdo operacional da classe `resin` específico para o **Carbon M3**, lacunas explícitas.
**Exclui:** inventar temperatures/volumes/materiais não observados; misturar evidência de outro SKU no **Carbon M3**; promover marketing não citado.

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability ≠ certeza de processo no **Carbon M3**.

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume / envelope | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Carbon M3 |
| Temperaturas / energia de processo | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Carbon M3 |
| Materiais homologados (lista pinada) | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Carbon M3 |
| Firmware / revisões de hardware | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Carbon M3 |

## Tecnologia

- Classe: vat photopolymerization (MSLA/DLP/SLA conforme OEM) para **Carbon M3**
- Fluxo: resina → exposição seletiva → lavagem/cura pós-processo no fluxo do **Carbon M3**
- Não tratar resolução de marketing do **Carbon M3** como metrologia garantida sem TDS

## Manuais

- Portal / support do fabricante para **Carbon M3**: partir da listagem `https://www.carbon3d.com/products`
- Manual de operação/service completo do **Carbon M3**: frequentemente portal/NDA — **não republicado** aqui quando não público
- Se HTML público completo não foi capturado em 2026-08-16: declarado em Lacunas do **Carbon M3**

## Hardware

- Identidade de hardware: **Carbon M3** / `Carbon M3` sob `manufacturer.carbon`
- Revisões de hardware pinadas por serial do **Carbon M3**: não publicadas nesta revisão
- Consumíveis típicos da classe `resin` aplicam-se ao **Carbon M3** apenas após confirmação OEM

## Software

- Software de preparação OEM para **Carbon M3**
- Firmware/LCD driver versions: lacuna sem pinagem datada do **Carbon M3**

## Firmware

- Canal oficial de release notes do **Carbon M3**: não pinado com versão datada nesta revisão
- Não inventar versão de firmware do **Carbon M3** sem captura datada

## Slicer

- Preparação de suporte/orientação no software OEM do **Carbon M3** (não slicer FFF)
- Não reutilizar profiles de outro tamanho de tanque no **Carbon M3** sem validação

## Materiais

Resinas homologadas para **Carbon M3**: não inventar lista. Onde o fabricante não publicou na evidência de 2026-08-16, registrar lacuna. SDS da resina é mandatório antes de uso no **Carbon M3**.

## Manutenção

### Operação (classe resina — Carbon M3)
- Nivelamento da plataforma e inspeção do film/FEP/tank do **Carbon M3**
- Troca de film/tanque conforme desgaste; não operar com film danificado no **Carbon M3**
- Wash & cure: seguir tempos/UV do fabricante da resina e do **Carbon M3**

## Segurança

- Resina não curada: pele/olhos — EPI (luvas nitrile, óculos) no **Carbon M3**
- VOC/odores: ventilação; descarte de IPA/resina conforme normas locais
- UV: não expor pele/olhos à fonte do **Carbon M3** aberta

## Known issues

Base pública de known-issues específica do **Carbon M3** não foi sistematizada nesta passagem.

| Tema | Nota |
|---|---|
| Specs incompletas | Ver Lacunas do **Carbon M3** |
| Transferência de presets | Não copiar de outro modelo para o **Carbon M3** sem adaptação |
| Troubleshooting de campo | Promover a `troubleshooting-mapped` só com árvore/support notes |

## Fontes

- [source.carbon-official-products](../22-fontes/carbon-official-products.md) — https://www.carbon3d.com/products

## Lacunas

- Datasheet completo pinado do **Carbon M3** além dos claims da tabela (quando houver)
- Manuais de serviço / error codes do **Carbon M3**
- Firmware/software versions datadas do **Carbon M3**
- Known issues de campo com URLs de support
- Matriz de materiais homologados com TDS para o **Carbon M3**
