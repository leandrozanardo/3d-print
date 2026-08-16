# 00 — Estado atual da wiki (auditoria empresarial)

**Produto:** fix-my-print  
**Repositório:** https://github.com/leandrozanardo/3d-print  
**Data da medição:** 2026-08-16  
**Batch:** Phase 0 / 0.1 / 0.2-estrutural  

## Método

Recalculo a partir do corpus em `docs/` (não reutilizar números de prompts anteriores). Escopo canônico = Markdown sob `docs/` excluindo `projeto/`, `ebook/`, `printers/`, `_arquivo/`, `superpowers/` e `context.md` (resumo operacional F.2, não página de conhecimento).

Ferramentas:

- inventário por script de auditoria
- `python -m core validate-wiki docs --json` (links)
- `python -m core validate-wiki docs --strict --json` (semântica empresarial)

## Inventário (2026-08-16)

| Métrica | Valor |
|---|---|
| Markdown total em `docs/` | 292 |
| Canônicos (escopo semântico) | ~191 (+ novos `_meta` de impressoras neste batch) |
| Legado isolado | 100 |
| Páginas canônicas com front matter | todas as canônicas após remediação BOM/campos |
| IDs únicos | 180+ (sem duplicatas) |
| `knowledge_status=draft` | 100% do canônico medido |
| `reviewed` / `verified` | 0 |
| Impressoras canônicas profundas | 1 (`printer.bambu-lab-a1-mini`) |
| Páginas em `22-fontes/` | 11 |
| Links relativos quebrados (modo padrão) | 0 |

## Achados confirmados

1. **UTF-8 BOM** em 11 páginas canônicas (hubs de tecnologias, fontes, glossário) — impedia resolução de IDs (`hub.tecnologias`, `tech.*`) e gerava falsos `unresolved_id`.
2. **Front matter incompleto** em dezenas de páginas (faltavam sobretudo `supersedes`, `process`, `applies_to`, `not_for`, aliases).
3. **Dois IDs related quebrados de verdade** (não causados por BOM): `design.fff-orientation` → correto `design.orientation-fff`; `hw.pei-sheet-fff` → correto `surface.pei`.
4. **Validador legado** (`wiki_links.py`) só cobria links relativos — insuficiente para contrato empresarial.
5. **Cobertura manual** em `_meta/cobertura.md` desatualizada vs. Maintenance A (muitos domínios ainda marcados `hub-only` apesar de páginas atômicas).
6. **Nenhuma página `reviewed`/`verified`** — alinhado à política (autor/agente não auto-promove).
7. **Catálogo mundial de impressoras inexistente** — só A1 Mini + hub.
8. **`context.md`** sem front matter — excluído do corpus semântico (não é página canônica).

## Capacidade atual para LLM/RAG

| Capacidade | Estado |
|---|---|
| Navegação humana por hubs 01–23 | Presente |
| AGENT_GUIDE + roteamento | Presente (draft) |
| Ontologia / políticas | Presente (draft) |
| Proveniência recorrente em `22-fontes/` | Parcial |
| Grafo `related`/`prerequisites` resolvível | Agora validável em `--strict` |
| Catálogo de mercado auditável | Ausente (ledger iniciado neste batch) |
| Confiança proporcional à evidência | Parcial; claims ainda misturam heurística e fato |

## Veredito do estado

A wiki **não** está pronta para uso empresarial como referência mundial de impressoras. Está **pronta como base editorial** com governança inicial, fatia vertical FFF (A1 Mini) e agora **gate semântico CI-capaz**. O próximo trabalho crítico é completar remediação de conteúdo (warnings) e o censo de fabricantes.

## Evidência de validação (pós-batch)

```text
python -m core validate-wiki docs --json
→ ok: true, errors: []

python -m core validate-wiki docs --strict --json
→ ok: true, errors: [], warnings: ~90 (aliases, citations próximas, linguagem suave)
```
