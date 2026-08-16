---
id: "meta.printer-progress"
title: "Progresso do catálogo mundial de impressoras"
summary: "Ledger do censo 2026-08-16-census: 66 fabricantes e 353 modelos em coverage cataloged a partir de listagens oficiais. Piloto Bambu/Prusa/Formlabs incluído. Nenhum modelo em DoD documented completo. Próximo foco = aprofundar specs/manuais/known-issues sem inventar."
doc_type: "continuation"
domain: ["printers", "meta"]
technology: []
process: []
applies_to: ["ai-agents", "maintainers"]
not_for: ["declare-project-complete", "declare-full-market-coverage"]
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
| Snapshot ID | `market-snapshot-2026-08-16-census` |
| Data | 2026-08-16 |
| Denominador fechado? | **Não** |
| Critérios | [criterios-de-inclusao.md](criterios-de-inclusao.md) |
| Índice | [catalogo-global.md](catalogo-global.md) |

## Critérios de inclusão

Ver [criterios-de-inclusao.md](criterios-de-inclusao.md).

## Fabricantes descobertos / investigados

**66** páginas `manufacturer.*` geradas neste batch (seed consumer + industrial/specialty + bloqueados parciais). Detalhe: [fabricantes.md](fabricantes.md) e [catalogo-global.md](catalogo-global.md).

Piloto prioritário:

| Fabricante | Status | Fonte |
|---|---|---|
| Bambu Lab | investigado (store US) | `source.bambu-lab-official-products` |
| Prusa Research | investigado (homepage oficial) | `source.prusa-research-official-products` |
| Formlabs | investigado (products page) | `source.formlabs-official-products` |

## Fabricantes ainda não investigados / bloqueados

Ainda há OEMs fora do seed e SKUs truncados por JS. Registrados como acesso parcial/blocked no censo: Nexa3D (redirect), ExOne listing 404, CEAD/RegenHU timeout, alguns endpoints flaky (Creality/Elegoo/Shining/TRUMPF/Colibrium).

## Modelos descobertos / lifecycle / cobertura

| Métrica | Valor |
|---|---|
| Modelos com página | **353** |
| Lifecycle típico | `current` (quando listado buyable) ou `unknown` |
| coverage_level | **`cataloged`** para o lote |
| `documented` DoD completo | **0** |
| Referência profunda | A1 Mini (`draft` + `cataloged`) |

## Fontes oficiais verificadas (catálogo)

- `source.bambu-lab-official-products` (+ tech specs / wiki A1 Mini já existentes)
- `source.prusa-research-official-products`
- `source.formlabs-official-products`
- `source.<manufacturer-id>-official-products` para cada OEM do snapshot

## Fontes bloqueadas / parciais

- Listagens JS truncadas (Creality/Elegoo/etc.) → modelos parciais
- Nexa3D home → marketplace redirect
- ExOne systems 404; CEAD/RegenHU timeout

## Contradições

Nenhuma nova de specs inventadas (não extraídas). Reconciliar XL vs XL+ / CORE One L vs L+ se páginas legadas divergirem — preferir homepage Prusa 2026-08-16.

## Último batch

**2026-08-16 — Census + cataloged mass generation**

1. Phase 0.2: lifecycle/coverage na A1 Mini
2. Piloto Bambu / Prusa / Formlabs cataloged
3. Escala seed consumer + industrial/specialty → 66 OEMs / 353 modelos
4. Fontes `22-fontes/*-official-products.md`
5. Catálogo global regenerado

## Próximo batch determinístico

1. Aprofundar **Bambu Lab** modelo a modelo → `documented` DoD (specs/manuais/known-issues) começando por A1, P1S, A1 Mini
2. Idem **Prusa** (MK4S, CORE One+, MINI+) e **Formlabs** (Form 4, Fuse 1+ 30W)
3. Reconciliar SKUs parciais Creality/Elegoo com fetch dedicado
4. Não escalar profundidade industrial metal até piloto consumer/prosumer `documented` estável

### Prompt curto

```text
Continue docs/21-impressoras/_meta/progresso.md — aprofundar documented DoD
Bambu→Prusa→Formlabs. Sem inventar specs. validate-wiki --strict.
```

## Quality gates

- `validate-wiki docs --json`
- `validate-wiki docs --strict --json`
- pytest wiki
