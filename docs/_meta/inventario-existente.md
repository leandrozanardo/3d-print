---
id: meta.inventory
title: Inventário existente de docs/
summary: 'Auditoria factual de 2026-08-15: ~101 Markdown em docs/, corpus operacional
  em docs/projeto/ (EN), ebook CC BY-SA, printers A1 Mini, arquivo AsciiDoc. Sem front
  matter canônico, validador de links OK, cobertura limitada a FFF/A1 Mini.'
doc_type: audit
domain:
- meta
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 1-month
related:
- meta.migration
- meta.coverage
- meta.contradictions
tags:
- inventory
- audit
---
# Inventário existente

**Data da auditoria:** 2026-08-15  
**Comandos:** `git status --short`, `git log -n 20`, listagem de `docs/**/*.md`, `rg` por TODO/placeholder/absolutos, `python -m core validate-wiki docs --json` → `{"ok": true, "errors": []}`.

## Contagem

| Área | Arquivos `.md` (aprox.) | Idioma predominante | Papel |
|---|---|---|---|
| `docs/projeto/` | 71 | Inglês | Wiki operacional A1 Mini / otimização híbrida |
| `docs/ebook/` | 16 | Português | Guia Maker convertido |
| `docs/printers/` | 6 | Misto | Registry + A1 Mini manuais/wiki local |
| ~~`docs/_arquivo/`~~ | — | — | Removido do repositório |
| `docs/superpowers/` | 1 | Inglês | Spec de feature |
| `docs/context.md` | 1 | Português | Resumo de chat F.2 |
| **Total md** | **~101** | — | — |

Não existe ainda a árvore canônica 01–23 (criada nesta wave). Não existe `docs/INDEX.md` / `AGENT_GUIDE.md` canônicos novos antes desta wave.

## Classificação por origem

| Classe | Paths | Licença / nota |
|---|---|---|
| Original do projeto | `docs/projeto/**` | Conteúdo do repositório; EN; focado A1 Mini |
| Convertido | `docs/ebook/**`, partes de `docs/printers/A1mini/**` | Ebook: **CC BY-SA 4.0** (Cláudio Luís Marques Sampaio / MakerLinux); manuais OEM convertidos |
| Arquivado | ~~`docs/_arquivo/**`~~ | Removido do repositório |
| Operacional/meta-chat | `docs/context.md` | Não é KB de AM |
| Spec interna | `docs/superpowers/specs/**` | Design de otimização decorativa |

## Qualidade observada (legado `projeto/`)

**Pontos fortes**

- Páginas atômicas com Summary / When to use / A1 Mini rules / Related / Sources
- Foco operacional coerente: A1 Mini, 0.4 mm, Bambu Studio, PLA/PETG
- Troubleshooting com decision trees
- Cultura de **validate on printer** (anti falsa precisão)
- Hubs por seção com INDEX

**Limitações**

- Idioma EN (prompt mestre exige pt-BR no canônico novo)
- Sem YAML front matter / IDs estáveis
- Fontes frequentemente genéricas (“Prusa KB · FixMyPrint”) sem URL específica por claim
- Valores numéricos duplicados entre materiais, perfis e troubleshooting
- “Multi-printer” não existe de fato — só A1 Mini + `_TEMPLATE`
- Pasta `projeto/profiles/` quase vazia vs `perfis-a1-mini/`
- Não cobre sete categorias AM além de menções superficiais
- Segurança transversal (VOC/UFP, food-contact) pouco estruturada no hub canônico

## Páginas canônicas candidatas (legado → novo)

| Legado | Destino canônico planejado | Ação |
|---|---|---|
| `projeto/hardware/a1-mini-visao-geral.md` | `21-impressoras/bambu-lab-a1-mini.md` | rewrite-with-sources + enrich |
| `projeto/materiais/pla.md` | `05-materiais/fff/pla.md` | rewrite-with-sources |
| `projeto/materiais/petg.md` | `05-materiais/fff/petg.md` | rewrite-with-sources |
| `projeto/qualidade-e-acabamento/elephant-foot-e-primeira-camada.md` | `10-processo-de-impressao/fff/primeira-camada.md` | split + rewrite |
| `projeto/troubleshooting/warping.md` | `12-problemas-e-diagnostico/fff/empenamento.md` | rewrite-with-sources |
| `projeto/hardware/a1-mini-mesa-e-adesao.md` | `04-componentes-e-hardware/` + processo | split later |
| `projeto/fontes-e-atribuicao.md` | `_meta` + `22-fontes` | keep-and-enrich |

## Duplicatas / conflitos potenciais

| Tema | Onde aparece | Risco |
|---|---|---|
| Faixas de temperatura PLA/PETG | `materiais/*`, `tabela-temperaturas`, perfis, troubleshooting | Duplicação numérica |
| Brim 5–10 mm / bed PETG 70–80 °C | warping, petg, brim-raft | Escopos ok se unificados |
| Volume 180³ | hardware overview, printers wiki | Confirmar vs tech specs oficiais |
| Idioma EN vs ebook PT | projeto vs ebook | Canônico novo = PT-BR |

## Entradas órfãs / navegação

- `docs/context.md` e `docs/superpowers/` fora do grafo `projeto/INDEX`
- `docs/ebook/` linkado mas não é grafo operacional
- `projeto/profiles/INDEX.md` fraco vs `perfis-a1-mini`
- Sem portal raiz `docs/INDEX.md` antes desta wave

## Placeholders / flags

- Muitas ocorrências legítimas de **validate on printer** (política, não stub)
- `docs/context.md` seção TODO (chat summary)
- ~~`docs/_arquivo/ebook/TODO.md`~~ (removido)
- Ebook contém “sempre/nunca” em prosa técnica original — não migrar cegamente

## Validador

`python -m core validate-wiki docs --json` → **ok: true**, errors: [].  
Escopo do validador: links relativos. Não valida IDs/front matter (lacuna registrada).

## Bootstrap

`core/bootstrap_wiki.py` **não** foi usado como fonte de verdade nesta auditoria.
