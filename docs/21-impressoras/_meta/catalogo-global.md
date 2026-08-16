---
id: "meta.printer-global-catalog"
title: "Catálogo global de impressoras (snapshot)"
summary: "Índice do catálogo mundial versionado. Neste snapshot inicial só a Bambu Lab A1 Mini possui página canônica profunda; o restante está em descoberta via ledger. Não afirma cobertura completa do mercado."
doc_type: "catalog"
domain: ["printers", "meta"]
technology: []
process: []
applies_to: ["catalog-readers"]
not_for: ["claim-full-market-coverage"]
knowledge_status: "draft"
evidence_status: "limited"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-16"
review_cycle: "per-batch"
sources: []
related: ["meta.printer-progress", "meta.printer-manufacturers", "hub.impressoras"]
prerequisites: ["meta.printer-inclusion-criteria"]
supersedes: []
aliases_pt_br: ["catálogo global impressoras"]
aliases_en: ["global printer catalog"]
tags: ["catalog", "printers"]
---

# Catálogo global de impressoras (snapshot)

**Snapshot ID:** `market-snapshot-2026-08-16-seed`  
**Status:** seed / incompleto  
**Denominador:** ainda não fechado (pesquisa de fabricantes em andamento)

## Modelos com página canônica

| Modelo | ID | Lifecycle (declarado) | coverage_level | Página |
|---|---|---|---|---|
| Bambu Lab A1 Mini | `printer.bambu-lab-a1-mini` | unknown (a confirmar) | draft profundo ≠ `documented` DoD | [bambu-lab-a1-mini.md](../bambu-lab-a1-mini.md) |

## Modelos apenas no ledger

Nenhum outro modelo `cataloged` neste snapshot. Ver [progresso.md](progresso.md) e [fabricantes.md](fabricantes.md).

## Como crescer

1. Descobrir fabricante (fonte)
2. Listar famílias/modelos oficiais
3. Atribuir lifecycle por evidência datada
4. Só então criar hub `docs/21-impressoras/<manufacturer-id>-<model-id>.md`
