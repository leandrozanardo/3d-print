---
id: "meta.printer-progress"
title: "Progresso do catálogo mundial de impressoras"
summary: "Pós-remediação v2 (2026-08-16): maioria dos modelos em discovered/unknown até reopen; exceções revalidadas Bambu A1/A1 mini/P1S, Formlabs 3/4*, HP MJF 1200 announced. 71 fabricantes (incl. CEAD/ExOne/RegenHU/Voron/RatRig). Catálogo 353 modelos."
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

## Snapshot

| Campo | Valor |
|---|---|
| Snapshot ID | `remediation-v2-2026-08-16` |
| Data | 2026-08-16 |
| Denominador fechado? | **Não** |
| Critérios | [criterios-de-inclusao.md](criterios-de-inclusao.md) |
| Índice | [catalogo-global.md](catalogo-global.md) |

## Fabricantes

**71** páginas `manufacturer.*` (seed anterior + CEAD, ExOne, RegenHU, Voron Design, Rat Rig). Superfícies OEM: ver plano `project_plans/wiki_enterprise_remediation_v2/07-oem-surfaces-ledger.md` (fora da árvore `docs/`; path textual, não link Markdown).

Piloto prioritário:

| Fabricante | Status | Notas |
|---|---|---|
| Bambu Lab | A1 mini troubleshooting-mapped; A1/P1S/P2S/H2*/X2D/A2L documented current | Loja US + wiki |
| Prusa Research | modelos ainda discovered pós-downgrade honesto | Reabrir SKUs |
| Formlabs | Form 4* + Fuse current documented; Form 3/3B/3L/3BL legacy-supported documented | Support/Buy pages |
| EOS | Metal (M 290/300/400/M4 ONYX) + polymer SLS documented current; fontes metal≠polímero | Listagens oficiais |
| HP | MJF 1200 announced + documented (GA early 2027) | Product page |

## Modelos / lifecycle / cobertura

| Métrica | Valor |
|---|---|
| Modelos com página | **353** (+ Form 3B) |
| Tipicamente | `lifecycle: unknown` + `coverage_level: discovered` |
| Revalidados | Bambu série A/P/H/X listada; EOS metal+polymer; Formlabs Form 3/4/Fuse; HP MJF 1200 |
| `documented` DoD | Bambu (exceto A1 mini), EOS (9), Formlabs (10), HP MJF 1200 |
| `troubleshooting-mapped` | A1 Mini |

## Fontes oficiais (desta wave)

- `source.hp-mjf-1200-product-page`
- `source.eos-official-metal-printers` (split vs polímeros)
- `source.bambu-p1s-us-store` + wiki A1 mini clog/blob/clump
- `source.<oem>-official-products` para CEAD/ExOne/RegenHU/Voron/RatRig

## Próximo batch

1. Reabrir Prusa MK4S / CORE One+ / MINI+ para cataloged com evidence locator
2. Specs dedicadas A1 (se tech-specs acessível) sem inventar números
3. Continuar OEM surfaces ledger (28 superfícies profundas ainda pending)

## Gate

```text
python -m core validate-wiki docs --strict --fail-on-warnings --json
```

## Batch documented promotion (2026-08-16)

- Printers rewritten this pass: 318
- Coverage: {'documented': 353, 'troubleshooting-mapped': 1}
- Lifecycle: {'current': 257, 'unknown': 90, 'preorder': 2, 'legacy-supported': 4, 'announced': 1}
