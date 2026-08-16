---
id: meta.printer-rebrands
title: Rebrands e variantes
summary: Registro de rebrands, white-labels e variantes regionais/SKU que não devem
  gerar modelos duplicados sem diferença real de hardware, processo ou capability.
doc_type: catalog
domain:
- printers
- meta
technology: []
process: []
applies_to:
- catalog-maintainers
not_for:
- unverified-equivalence-claims
knowledge_status: draft
evidence_status: unknown
safety_level: normal
confidence: low
last_reviewed: '2026-08-16'
review_cycle: per-batch
sources: []
related:
- meta.printer-inclusion-criteria
- meta.printer-exclusions
prerequisites:
- meta.printer-inclusion-criteria
supersedes: []
aliases_pt_br:
- rebrands impressoras
aliases_en:
- printer rebrands and variants
tags:
- rebrand
- sku
- catalog
---
# Rebrands e variantes

Nenhuma equivalência rebrand↔OEM foi **confirmada** neste batch.

## Regras

1. Registrar suspeita como `hypothesis` até fonte oficial.
2. Preferir um hub canônico + aliases a duas páginas espelhadas.
3. Variantes de tensão/região: mesmo modelo, campo `regions` / `sku_notes`, salvo capability distinta.
4. Bundles (ex.: Combo/AMS): documentar no hub do hardware base, não como novo `printer.*` sem diferença estrutural.

## Tabela (vazia — a preencher com evidência)

| Identidade A | Identidade B | Relação | Evidência | Status |
|---|---|---|---|---|
| — | — | — | — | none yet |
