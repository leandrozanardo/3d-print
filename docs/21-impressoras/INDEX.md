---
id: "hub.impressoras"
title: "Impressoras"
summary: "Hub do catálogo de impressoras fix-my-print: páginas por modelo com lifecycle e coverage_level. Snapshot 2026-08-16 inclui censo multi-OEM em nível cataloged (identidade + listagem oficial). Não declara cobertura mundial completa nem specs inventadas."
doc_type: "hub"
domain: ["hub"]
technology: []
process: []
applies_to: []
not_for: ["complete-coverage-claim"]
knowledge_status: "draft"
evidence_status: "limited"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-16"
review_cycle: "per-batch"
sources: []
related: ["meta.coverage", "meta.knowledge-map", "meta.printer-progress", "meta.printer-inclusion-criteria", "meta.printer-global-catalog"]
prerequisites: ["meta.architecture"]
supersedes: []
aliases_pt_br: ["Impressoras"]
aliases_en: ["printers hub"]
tags: ["hub"]
---

# Impressoras

## Escopo

Páginas por modelo com capabilities reais quando documentadas; entradas `cataloged` quando só a identidade/listagem oficial foi confirmada.

## Status (snapshot 2026-08-16)

- Ledger: [_meta/progresso.md](_meta/progresso.md)
- Catálogo global: [_meta/catalogo-global.md](_meta/catalogo-global.md)
- Critérios: [_meta/criterios-de-inclusao.md](_meta/criterios-de-inclusao.md)
- Fabricantes (seed + investigados): [_meta/fabricantes.md](_meta/fabricantes.md)

**Denominador de mercado:** aberto (censo expandido, não fechado).  
**Nível predominante:** `cataloged` — não confundir com `documented` / DoD completo.

## Governança do catálogo

- [Progresso (ledger)](_meta/progresso.md)
- [Critérios de inclusão](_meta/criterios-de-inclusao.md)
- [Catálogo global](_meta/catalogo-global.md)
- [Fabricantes](_meta/fabricantes.md)
- [Rebrands e variantes](_meta/rebrands-e-variantes.md)
- [Exclusões](_meta/exclusoes.md)

## Piloto profundo / referência operacional

| Página | ID | coverage | Notas |
|---|---|---|---|
| [Bambu Lab A1 Mini](bambu-lab-a1-mini.md) | `printer.bambu-lab-a1-mini` | cataloged + conteúdo profundo draft | Única com specs citadas em profundidade |

## Fabricantes (páginas)

Use o padrão `manufacturer-<id>.md`. Entrada do piloto:

- [Bambu Lab](manufacturer-bambu-lab.md)
- [Prusa Research](manufacturer-prusa-research.md)
- [Formlabs](manufacturer-formlabs.md)

Demais OEMs do snapshot: ver [catálogo global](_meta/catalogo-global.md) e [progresso](_meta/progresso.md).

## Entradas recomendadas

- Portal: [docs/INDEX.md](../INDEX.md)
- Guia da IA: [docs/AGENT_GUIDE.md](../AGENT_GUIDE.md)
- Fontes: [22-fontes/INDEX.md](../22-fontes/INDEX.md)

## Lacunas

Quase todos os modelos estão em `cataloged` sem extração de specs/manuais/known-issues. Não promover a `documented` sem DoD.
