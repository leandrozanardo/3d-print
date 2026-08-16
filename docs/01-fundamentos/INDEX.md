---
id: "hub.fundamentos"
title: "Fundamentos"
summary: "Terminologia de manufatura aditiva, categorias ISO/ASTM, workflow digital, camadas/resolução/precisão, anisotropia e tensões residuais. Hub de navegação da Wave 1 de fundamentos."
doc_type: "hub"
domain: ["hub"]
technology: []
process: []
applies_to: []
not_for: ["complete-coverage-claim"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "3-months"
sources: ["source.iso-astm-52900-entry"]
related: ["meta.coverage", "meta.knowledge-map", "hub.tecnologias", "hub.glossario"]
prerequisites: ["meta.architecture"]
supersedes: []
aliases_pt_br: ["Fundamentos"]
aliases_en: ["Fundamentals"]
tags: ["hub"]
---

# Fundamentos

## Escopo

Terminologia de manufatura aditiva, workflow digital CAD→peça, camadas/resolução/precisão, anisotropia e tensões residuais. Transferência de calor, fluxo, adesão detalhada e DoE entram em waves seguintes.

## Status

Wave 1: páginas atômicas abaixo publicadas como `draft`. Matriz geral: [_meta/cobertura.md](../_meta/cobertura.md).

## Entradas recomendadas

- Portal humano: [docs/INDEX.md](../INDEX.md)
- Guia da IA: [docs/AGENT_GUIDE.md](../AGENT_GUIDE.md)
- Roteamento: [_meta/roteamento-de-consultas.md](../_meta/roteamento-de-consultas.md)
- Legado operacional A1 Mini: [projeto/INDEX.md](../projeto/INDEX.md) (até migração)

## Mapa local

| Página | ID | Status |
|---|---|---|
| [Terminologia de manufatura aditiva](terminologia-manufatura-aditiva.md) | `fund.terminology` | draft |
| [Workflow digital: do CAD à peça](workflow-digital-cad-ate-peca.md) | `fund.digital-workflow` | draft |
| [Camadas, resolução e precisão](camadas-resolucao-precisao.md) | `fund.layers-resolution-accuracy` | draft |
| [Anisotropia e tensões residuais](anisotropia-e-tensoes-residuais.md) | `fund.anisotropy` | draft |

## Relações com outros conceitos

- part-of → base canônica `docs/`
- depends-on → políticas em `_meta/`
- related → [Tecnologias](../02-tecnologias/INDEX.md), [Glossário](../23-glossario/INDEX.md)

## Lacunas

- Transferência de calor e fluxo de melt em FFF
- Adesão mesa/peça como página atômica (além de primeira camada)
- Desenho de experimentos (DoE) para calibração
