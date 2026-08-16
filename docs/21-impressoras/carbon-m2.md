---
id: printer.carbon-m2
title: Carbon M2
summary: Carbon M2 (Carbon M2) — coverage documented com seções DoD, technology/process preenchidos (clip-dlp), lifecycle `current`, evidência de listagem oficial acesso 2026-08-16.
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
- carbon-m2
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
- Carbon M2
aliases_en:
- Carbon M2
- Carbon M2
tags:
- printer
- documented
- carbon
- current
manufacturer_id: carbon
model_name: Carbon M2
family_status: unknown
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Listed on official manufacturer product listing https://www.carbon3d.com/products (accessed 2026-08-16); treated as current catalog presence for this remediation pass.
---

# Carbon M2

Hub: [Impressoras](INDEX.md) · Fabricante: [Carbon](manufacturer-carbon.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Carbon (`manufacturer.carbon`) |
| Modelo | Carbon M2 |
| Título canônico | Carbon M2 |
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

**Inclui:** identidade do **Carbon M2**, sincronização FM≡body, seções DoD com conteúdo operacional da classe `resin` específico para o **Carbon M2**, lacunas explícitas.
**Exclui:** inventar temperatures/volumes/materiais não observados; misturar evidência de outro SKU no **Carbon M2**; promover marketing não citado.

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability ≠ certeza de processo no **Carbon M2**.

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume / envelope | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Carbon M2 |
| Temperaturas / energia de processo | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Carbon M2 |
| Materiais homologados (lista pinada) | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Carbon M2 |
| Firmware / revisões de hardware | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Carbon M2 |

## Tecnologia

- Classe: vat photopolymerization (MSLA/DLP/SLA conforme OEM) para **Carbon M2**
- Fluxo: resina → exposição seletiva → lavagem/cura pós-processo no fluxo do **Carbon M2**
- Não tratar resolução de marketing do **Carbon M2** como metrologia garantida sem TDS

## Manuais

- Portal / support do fabricante para **Carbon M2**: partir da listagem `https://www.carbon3d.com/products`
- Manual de operação/service completo do **Carbon M2**: frequentemente portal/NDA — **não republicado** aqui quando não público
- Se HTML público completo não foi capturado em 2026-08-16: declarado em Lacunas do **Carbon M2**

## Hardware

- Identidade de hardware: **Carbon M2** / `Carbon M2` sob `manufacturer.carbon`
- Revisões de hardware pinadas por serial do **Carbon M2**: não publicadas nesta revisão
- Consumíveis típicos da classe `resin` aplicam-se ao **Carbon M2** apenas após confirmação OEM

## Software

- Software de preparação OEM para **Carbon M2**
- Firmware/LCD driver versions: lacuna sem pinagem datada do **Carbon M2**

## Firmware

- Canal oficial de release notes do **Carbon M2**: não pinado com versão datada nesta revisão
- Não inventar versão de firmware do **Carbon M2** sem captura datada

## Slicer

- Preparação de suporte/orientação no software OEM do **Carbon M2** (não slicer FFF)
- Não reutilizar profiles de outro tamanho de tanque no **Carbon M2** sem validação

## Materiais

Resinas homologadas para **Carbon M2**: não inventar lista. Onde o fabricante não publicou na evidência de 2026-08-16, registrar lacuna. SDS da resina é mandatório antes de uso no **Carbon M2**.

## Manutenção

### Operação (classe resina — Carbon M2)
- Nivelamento da plataforma e inspeção do film/FEP/tank do **Carbon M2**
- Troca de film/tanque conforme desgaste; não operar com film danificado no **Carbon M2**
- Wash & cure: seguir tempos/UV do fabricante da resina e do **Carbon M2**

## Segurança

- Resina não curada: pele/olhos — EPI (luvas nitrile, óculos) no **Carbon M2**
- VOC/odores: ventilação; descarte de IPA/resina conforme normas locais
- UV: não expor pele/olhos à fonte do **Carbon M2** aberta

## Known issues

Base pública de known-issues específica do **Carbon M2** não foi sistematizada nesta passagem.

| Tema | Nota |
|---|---|
| Specs incompletas | Ver Lacunas do **Carbon M2** |
| Transferência de presets | Não copiar de outro modelo para o **Carbon M2** sem adaptação |
| Troubleshooting de campo | Promover a `troubleshooting-mapped` só com árvore/support notes |

## Fontes

- [source.carbon-official-products](../22-fontes/carbon-official-products.md) — https://www.carbon3d.com/products

## Lacunas

- Datasheet completo pinado do **Carbon M2** além dos claims da tabela (quando houver)
- Manuais de serviço / error codes do **Carbon M2**
- Firmware/software versions datadas do **Carbon M2**
- Known issues de campo com URLs de support
- Matriz de materiais homologados com TDS para o **Carbon M2**
