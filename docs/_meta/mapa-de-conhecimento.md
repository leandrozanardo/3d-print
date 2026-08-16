---
id: "meta.knowledge-map"
title: "Mapa de conhecimento"
summary: "Mapa dos hubs 01–23, fatia vertical A1 Mini/PLA/PETG e posicionamento do corpus legado (projeto, ebook, printers, arquivo)."
doc_type: "map"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "3-months"
related: ["meta.architecture", "meta.coverage", "meta.query-routing"]
tags: ["map"]
technology: []
process: []
applies_to: []
not_for: []
sources: []
prerequisites: []
supersedes: []
aliases_pt_br: []
aliases_en: []
---

# Mapa de conhecimento

## Entradas por intenção

| Intenção | Hub inicial |
|---|---|
| Sintoma / falha | [12-problemas](../12-problemas-e-diagnostico/INDEX.md) |
| Tecnologia | [02-tecnologias](../02-tecnologias/INDEX.md) |
| Impressora | [21-impressoras](../21-impressoras/INDEX.md) |
| Material | [05-materiais](../05-materiais/INDEX.md) |
| Setting / slicer | [08-slicers](../08-slicers-e-configuracoes/INDEX.md) |
| Objetivo / cenário | [16-cenarios](../16-cenarios-e-playbooks/INDEX.md) |
| Segurança | [15-seguranca](../15-seguranca-e-meio-ambiente/INDEX.md) |
| Fonte | [22-fontes](../22-fontes/INDEX.md) |
| Termo | [23-glossario](../23-glossario/INDEX.md) |

## Fatia vertical Wave 0/1 (canônica)

```mermaid
flowchart LR
  A[printer A1 Mini] --> B[nozzle 0.4]
  A --> C[PLA]
  A --> D[PETG]
  C --> E[primeira camada]
  D --> E
  E --> F[empenamento]
  E --> G[playbook vertical]
  F --> G
```

## Corpus legado (não canônico novo)

| Path | Papel |
|---|---|
| `docs/projeto/` | Wiki operacional EN A1 Mini — keep-and-enrich / migrate |
| `docs/ebook/` | Guia Maker pt-BR CC BY-SA — archive navigation, reuse sob licença |
| `docs/printers/` | Manuais convertidos |
| `docs/_arquivo/` | Originais — não editar |
| `docs/context.md` | Resumo de chat F.2 — não é KB AM |
| `docs/superpowers/` | Specs de design de feature — fora da taxonomia AM |

Detalhe: [inventario-existente.md](inventario-existente.md).
