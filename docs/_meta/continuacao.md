---
id: "meta.continuation"
title: "Continuação — estado da base"
summary: "Remediação wiki enterprise v2 restaurada (2026-08-16): stubs honestos discovered/unknown; piloto Bambu A1/A1 mini/P1S e Formlabs 3/4* revalidados; HP MJF 1200 announced; OEMs CEAD/ExOne/RegenHU/Voron/RatRig; gate strict+fail-on-warnings verde."
doc_type: "continuation"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-16"
review_cycle: "per-batch"
related: ["meta.coverage", "meta.work-queue", "meta.gaps", "meta.printer-progress"]
tags: ["continuation"]
---

# Continuação

## Wave atual

**Wiki enterprise remediation v2** (restauração local sem commit).

## Batch concluído

- Contrato v2 (`wiki_contract` + gates cataloged/documented/DoD + `--fail-on-warnings`)
- Stubs de impressora rebaixados para `discovered` / `lifecycle: unknown` (exceto revalidados)
- Bambu A1 Mini `troubleshooting-mapped`; A1 e P1S `documented`
- Formlabs Form 4* `current`/`cataloged`; Form 3* `legacy-supported`/`cataloged`
- HP MJF 1200 `announced`; split de fonte EOS metal; OEMs faltantes adicionados
- CI `wiki-ci.yml`, README, LICENSE, ledgers em `project_plans/wiki_enterprise_remediation_v2/`

## Validações

```text
python -m core validate-wiki docs --strict --fail-on-warnings --json
python -m pytest -q
```

Esperado: `ok` com 0 errors / 0 warnings; pytest all green.

## Próximo batch

Aprofundar SKUs industriais ainda `discovered` (specs/manuais/known-issues) sem inventar evidência. Reopen superfícies OEM do ledger `07-oem-surfaces-ledger.md`.

Ler: [progresso.md](../21-impressoras/_meta/progresso.md) · [catalogo-global.md](../21-impressoras/_meta/catalogo-global.md)

## Blockers

- Auto-`reviewed`/`verified` proibido
- Mercado sem denominador fechado
- Maioria do catálogo ainda aguarda revalidação por produto
