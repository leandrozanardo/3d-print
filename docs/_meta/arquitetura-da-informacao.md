---
id: "meta.architecture"
title: "Arquitetura da informação"
summary: "Estrutura-alvo de docs/: portal humano, AGENT_GUIDE, _meta de governança e 23 domínios numerados. Define hubs, páginas atômicas, isolamento de legado e status de cobertura explícito."
doc_type: "policy"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: []
related: ["meta.ontology", "meta.coverage", "meta.migration"]
prerequisites: ["meta.inventory"]
aliases_pt_br: ["arquitetura editorial", "taxonomia docs"]
aliases_en: ["information architecture"]
tags: ["meta", "ia", "taxonomy"]
---

# Arquitetura da informação

## Princípios

1. **Portal humano:** [docs/INDEX.md](../INDEX.md)
2. **Portal de IA:** [docs/AGENT_GUIDE.md](../AGENT_GUIDE.md) — leitura obrigatória antes de recomendar
3. **Governança:** [docs/_meta/](INDEX.md)
4. **Domínios 01–23:** um hub `INDEX.md` por domínio; páginas atômicas por conceito
5. **Legado isolado:** `projeto/`, `ebook/`, `_arquivo/`, `printers/`, `superpowers/` não poluem a navegação canônica, mas permanecem linkáveis e inventariados
6. **Status ≠ ausência:** arquitetura preparada não implica cobertura verificada

## Árvore-alvo

```text
docs/
  INDEX.md
  AGENT_GUIDE.md
  _meta/                    # governança
  01-fundamentos/
  02-tecnologias/           # sete categorias ISO/ASTM + processos
  03-maquinas-e-arquiteturas/
  04-componentes-e-hardware/
  05-materiais/
  06-design-para-impressao-3d/
  07-modelos-formatos-e-malhas/
  08-slicers-e-configuracoes/
  09-calibracao/
  10-processo-de-impressao/
  11-qualidade-e-metrologia/
  12-problemas-e-diagnostico/
  13-manutencao/
  14-pos-processamento/
  15-seguranca-e-meio-ambiente/
  16-cenarios-e-playbooks/
  17-software-firmware-e-automacao/
  18-aplicacoes-e-regulacao/
  19-economia-e-sustentabilidade/
  20-pesquisa-e-mitos/
  21-impressoras/
  22-fontes/
  23-glossario/
  projeto/                  # LEGADO — migração faseada
  ebook/                    # LEGADO CC BY-SA
  printers/                 # LEGADO manuais
  _arquivo/                 # LEGADO originais
```

## Tipos de página

| Tipo | Local típico | Papel |
|---|---|---|
| hub | `*/INDEX.md` | Escopo, mapa, entradas, relações |
| atomic | arquivo temático | Um conceito principal |
| source | `22-fontes/` | Proveniência |
| glossary | `23-glossario/` | Termo pt-BR ↔ EN |
| scenario | `16-cenarios-e-playbooks/` | Playbook end-to-end |
| meta | `_meta/` | Governança |

## Regras estruturais

- Cada diretório canônico possui `INDEX.md`.
- Página especializada linka de volta ao hub pai.
- Nenhuma página canônica órfã (alcançável por hub ou roteamento).
- IDs estáveis no front matter; paths estáveis após publicação.
- Valores numéricos canônicos vivem em **uma** página; demais citam.

## Fatia vertical inicial (validação da arquitetura)

Escopo operacional profundo:

- Impressora: Bambu Lab A1 Mini
- Nozzle: 0,4 mm
- Slicer: Bambu Studio
- Materiais: PLA e PETG
- Temas: primeira camada + empenamento (warping)

Páginas canônicas dessa fatia vivem sob `05/`, `10/`, `12/`, `21/` e `16/`; páginas legadas em `projeto/` são `supersedes`-candidatas, não apagadas nesta wave.

## Domínios que não podem ser removidos sem justificativa

Todos os 01–23 listados no prompt mestre. Remoção exige registro em [decisoes-editoriais.md](decisoes-editoriais.md) e atualização de cobertura.
