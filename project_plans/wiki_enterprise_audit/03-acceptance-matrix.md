# 03 — Matriz de aceite

**Data:** 2026-08-16  

## Aceite do batch atual (Phase 0 / 0.1 / 0.2-estrutural)

| ID | Critério | Pass/Fail | Evidência |
|---|---|---|---|
| A-01 | Auditoria recalculada em artefatos 00–03 | Pass | `project_plans/wiki_enterprise_audit/` |
| A-02 | `validate-wiki` modo padrão não quebrado | Pass | `ok: true` links |
| A-03 | `validate-wiki --strict --json` determinístico | Pass | `ok: true`, errors `[]` |
| A-04 | Parser YAML SafeLoader | Pass | rejeita tags inseguras (teste) |
| A-05 | Schema/enums/campos obrigatórios | Pass | `wiki_schema.py` + testes |
| A-06 | IDs únicos + resolução sources/related/prereq/supersedes | Pass | validator + corpus |
| A-07 | Links, anchors, órfãos, ciclos | Pass | regras + fixtures |
| A-08 | Bloqueio de promoção reviewed/verified sem reviewer | Pass | fixture `verified_bad` |
| A-09 | Lifecycle/coverage enums disponíveis | Pass | schema |
| A-10 | Ledger `progresso.md` com próximo batch | Pass | `docs/21-impressoras/_meta/progresso.md` |
| A-11 | Testes automatizados verdes | Pass | pytest wiki (15+) |
| A-12 | Sem commit/push/PR | Pass | operação local apenas |

## Aceite ainda NÃO atingido (projeto)

| ID | Critério | Status |
|---|---|---|
| P-01 | Denominador de mercado datado com fontes | Fail (ledger seed only) |
| P-02 | Piloto Bambu+Prusa+Formlabs cataloged | Fail |
| P-03 | Qualquer impressora `documented` DoD completo | Fail (A1 Mini = draft profundo, não DoD catalog documented) |
| P-04 | Zero warnings relevantes de citação | Fail |
| P-05 | Página `reviewed` por humano independente | Fail (intencional) |
| P-06 | Cobertura 100% derivada do corpus | Fail |

## Definition of Done por modelo (referência futura)

Uma impressora só entra em `coverage_level: documented` quando todos os itens da missão (identidade, lifecycle, specs citadas, manuais mapeados, materiais classificados, known issues pesquisados, fontes datadas, strict ok) estiverem verdadeiros — sem inventar evidência.
