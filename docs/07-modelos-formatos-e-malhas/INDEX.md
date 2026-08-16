---
id: "hub.modelos"
title: "Modelos, formatos e malhas"
summary: "CAD versus mesh, reparo, STL, 3MF, STEP, G-code e riscos de formato. Hub de navegação; a cobertura profunda depende da matriz em _meta/cobertura.md."
doc_type: "hub"
domain: ["hub"]
technology: []
process: []
applies_to: []
not_for: ["complete-coverage-claim"]
knowledge_status: "draft"
evidence_status: "unknown"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "3-months"
sources: []
related: ["meta.coverage", "meta.knowledge-map", "format.stl-vs-3mf", "format.mesh-repair", "format.units-scale-manifold"]
prerequisites: ["meta.architecture"]
supersedes: []
aliases_pt_br: ["Modelos, formatos e malhas"]
aliases_en: []
tags: ["hub"]
---

# Modelos, formatos e malhas

## Escopo

CAD versus mesh, reparo, STL, 3MF, STEP, G-code e riscos de formato.

## Status

Ver matriz em [_meta/cobertura.md](../_meta/cobertura.md). Este hub existe para navegação estável; páginas atômicas profundas entram por wave.

## Entradas recomendadas

- Portal humano: [docs/INDEX.md](../INDEX.md)
- Guia da IA: [docs/AGENT_GUIDE.md](../AGENT_GUIDE.md)
- Roteamento: [_meta/roteamento-de-consultas.md](../_meta/roteamento-de-consultas.md)
- Legado operacional A1 Mini: [projeto/INDEX.md](../projeto/INDEX.md) (até migração)
- Workflow: [do CAD à peça](../01-fundamentos/workflow-digital-cad-ate-peca.md)

## Mapa local

| Página | ID | Status |
|---|---|---|
| [STL vs 3MF](stl-vs-3mf.md) | `format.stl-vs-3mf` | draft |
| [Reparo de malha](reparo-de-malha.md) | `format.mesh-repair` | draft |
| [Unidades, escala e manifold](unidades-escala-manifold.md) | `format.units-scale-manifold` | draft |

## Relações com outros conceitos

- part-of → base canônica `docs/`
- depends-on → políticas em `_meta/`

## Lacunas

STEP/B-rep profundo, riscos de G-code malicioso e inventário de ferramentas de reparo por SO: waves futuras.
