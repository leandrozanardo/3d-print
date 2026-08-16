---
id: "meta.continuation"
title: "Continuação — estado da base"
summary: "Protocolo de retomada: wave atual, batch concluído, arquivos tocados, próximo batch exato, arquivos a ler primeiro e blockers."
doc_type: "continuation"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "per-batch"
related: ["meta.coverage", "meta.work-queue"]
tags: ["continuation"]
---

# Continuação

## Wave atual

**Wave 0** — governance + audit + vertical slice (fechando)

## Batch concluído

**Wave 0 / Batch A** — inventário, `_meta` completo, portais `INDEX.md` + `AGENT_GUIDE.md`, hubs 01–23, fatia A1 Mini + nozzle 0,4 + PLA/PETG + primeira camada + empenamento + playbook + fontes da fatia.

## Arquivos criados (principais)

- `docs/INDEX.md`, `docs/AGENT_GUIDE.md`
- `docs/_meta/*` (governança)
- `docs/01`…`23/*/INDEX.md` (hubs)
- `docs/21-impressoras/bambu-lab-a1-mini.md`
- `docs/04-componentes-e-hardware/nozzle-0-4-mm-fff.md`
- `docs/05-materiais/fff/pla.md`, `petg.md`
- `docs/02-tecnologias/material-extrusion/fff.md`
- `docs/10-processo-de-impressao/fff/primeira-camada.md`
- `docs/12-problemas-e-diagnostico/fff/empenamento.md`
- `docs/16-cenarios-e-playbooks/a1-mini-pla-petg-primeira-camada-empenamento.md`
- `docs/22-fontes/*.md` (5 fontes)

## Arquivos modificados / movidos

- Hubs com mapa local atualizado: 02, 04, 05, 10, 12, 16, 21, 22
- **Nenhum** `git mv` / delete de legado
- **Nada** fora de `docs/`

## Conteúdo migrado

Espelhamento canônico pt-BR (rewrite) a partir de `docs/projeto/` sem apagar origem. Ebook não copiado.

## Sources adicionadas

Ver [22-fontes/INDEX.md](../22-fontes/INDEX.md).

## Decisões

Ver [decisoes-editoriais.md](decisoes-editoriais.md) D-001…D-007.

## Lacunas / contradições

[lacunas.md](lacunas.md) · [contradicoes.md](contradicoes.md) (C-001…C-004)

## Validações

Reexecutar ao fechar: `python -m core validate-wiki docs --json` e greps de placeholder/absolutos.

## Próximo batch exato (Wave 1 / Batch A)

1. Fundamentos: terminologia AM + workflow digital CAD→peça (páginas profundas, não stubs)
2. Hubs das sete categorias com página-resumo por categoria (mecanismo + limites + segurança entrada)
3. Glossário inicial (30–50 termos da fatia + categorias)
4. Atualizar cobertura/continuação

### Ler primeiro ao retomar

1. Este arquivo
2. [cobertura.md](cobertura.md)
3. [inventario-existente.md](inventario-existente.md)
4. [AGENT_GUIDE.md](../AGENT_GUIDE.md)
5. Páginas da fatia vertical já publicadas

## Blockers que exigem decisão do usuário

- Nenhum blocker de licença bloqueante (ebook isolado; sem cópia textual)
- Delete de legado: **proibido** até lista + confirmação (nenhum delete-candidate ativo)
- Alterar `core/` para validar front matter: fora de escopo até pedido separado

## Prompt curto para retomar

```text
Continue a base docs/ LLM 3D print a partir de docs/_meta/continuacao.md.
Execute Wave 1 Batch A (fundamentos + 7 categorias resumo + glossário inicial).
Não apague legado. Não commit. Rode validate-wiki ao final.
```
