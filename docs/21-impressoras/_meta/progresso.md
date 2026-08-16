---
id: "meta.printer-progress"
title: "Progresso do catálogo mundial de impressoras"
summary: "Ledger resumível do censo e da documentação de impressoras: snapshot, critérios, fabricantes, modelos, lifecycle, cobertura, fontes, bloqueios, último batch e próximo batch determinístico. Não declara o mercado completo."
doc_type: "continuation"
domain: ["printers", "meta"]
technology: []
process: []
applies_to: ["ai-agents", "maintainers"]
not_for: ["declare-project-complete"]
knowledge_status: "draft"
evidence_status: "limited"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-16"
review_cycle: "per-batch"
sources: []
related: ["meta.continuation", "meta.printer-global-catalog", "meta.printer-manufacturers", "hub.impressoras"]
prerequisites: ["meta.printer-inclusion-criteria"]
supersedes: []
aliases_pt_br: ["ledger impressoras", "progresso catálogo"]
aliases_en: ["printer catalog progress ledger"]
tags: ["progress", "ledger", "catalog"]
---

# Progresso — catálogo de impressoras

## Snapshot de mercado

| Campo | Valor |
|---|---|
| Snapshot ID | `market-snapshot-2026-08-16-seed` |
| Data | 2026-08-16 |
| Denominador fechado? | **Não** |
| Critérios | [criterios-de-inclusao.md](criterios-de-inclusao.md) |

## Critérios de inclusão

Ver página canônica de critérios. Resumo: identidade + fonte auditável + lifecycle + cobertura explícita; sem bundles/SKU duplicados; DIY classificado à parte.

## Fabricantes descobertos

| Fabricante | Status investigação | Fonte oficial verificada |
|---|---|---|
| Bambu Lab | parcial (só A1 Mini já no corpus) | tech specs + wiki (páginas `22-fontes`) |
| Demais seed | não investigados | — |

## Fabricantes ainda não investigados

Todos os nomes em [fabricantes.md](fabricantes.md) exceto a fatia parcial Bambu Lab (A1 Mini only). Inclui Prusa, Formlabs, Creality, industriais, etc.

## Modelos descobertos / lifecycle / cobertura

| Modelo | Lifecycle | coverage_level | Notas |
|---|---|---|---|
| Bambu Lab A1 Mini | `unknown` (campo ainda não pinado no hub) | conteúdo profundo em `draft`; **não** DoD `documented` | Única página canônica |

## Fontes oficiais verificadas (catálogo)

- `source.bambu-a1-mini-tech-specs`
- `source.bambu-wiki-a1-mini`

## Fontes bloqueadas

Nenhuma neste batch (não houve ingestão web ampla de OEMs).

## Contradições

Nenhuma nova de catálogo. Corpus geral: ver [contradicoes.md](../../_meta/contradicoes.md) (C-001…C-004).

## Último batch

**2026-08-16 — Phase 0 + 0.1 + 0.2-estrutural**

- Auditoria empresarial (`project_plans/wiki_enterprise_audit/00–03`)
- Validador semântico `python -m core validate-wiki docs --strict --json`
- Remediação BOM + campos + 2 IDs related
- Criação deste ledger e metas do catálogo
- **Não** iniciada varredura oficial Bambu/Prusa/Formlabs além do já existente

## Próximo batch determinístico

1. **Phase 0.2-conteúdo:** reduzir warnings strict (citações próximas, aliases); pin `lifecycle` + `coverage_level` na A1 Mini sem promover `knowledge_status`.
2. Em seguida **Fase 1 piloto:** censo oficial **Bambu Lab** (portfólio atual completo → `cataloged` mínimo) → **Prusa** → **Formlabs**.
3. Revisar schema com aprendizados do piloto antes de Creality+.

### Prompt curto para o próximo agente

```text
Continue fix-my-print a partir de docs/21-impressoras/_meta/progresso.md
e docs/_meta/continuacao.md. Não recomece do zero.
Próximo: Phase 0.2-conteúdo (warnings) depois piloto Bambu→Prusa→Formlabs.
Rode: python -m core validate-wiki docs --strict --json
Sem commit/push/PR. Não inventar specs.
```

## Quality gates do último batch

- `validate-wiki docs --json` → ok
- `validate-wiki docs --strict --json` → ok (warnings ≠ errors)
- testes wiki → pass
