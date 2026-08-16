---
id: "source.niosh-am-entry"
title: "Fonte — NIOSH Additive Manufacturing"
summary: "Ponto de entrada para orientações do NIOSH (CDC) sobre saúde e segurança em manufatura aditiva: emissões, controles, e práticas gerais. Não substitui SDS/TDS do produto nem legislação local."
doc_type: "source"
domain: ["sources", "safety"]
knowledge_status: "draft"
evidence_status: "limited"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
related: ["hazard.metal-powder", "material.powder-feedstocks", "source.epa-3d-printing-research", "hub.seguranca"]
aliases_en: ["NIOSH additive manufacturing", "CDC NIOSH AM"]
tags: ["source", "safety", "niosh", "emissions"]
---

# Fonte — NIOSH Additive Manufacturing

| Campo | Valor |
|---|---|
| source id | `source.niosh-am-entry` |
| arquivo | `niosh-additive-manufacturing.md` |
| tipo | agency guidance (portal) |
| organização | NIOSH / CDC |
| título | Additive Manufacturing (portal NIOSH) |
| URL | https://www.cdc.gov/niosh/manufacturing/additive/index.html |
| data de acesso | 2026-08-15 |
| restrição | seguir links oficiais; não inventar limites de exposição a partir desta página-resumo |

## Uso permitido nesta base

- Referenciar que AM envolve riscos ocupacionais (particulados ultrafinos, VOCs, pós, resinas, energia)
- Orientar leitores a buscar controles de engenharia, práticas de trabalho e EPIs via material NIOSH e SDS do produto
- Apoiar páginas de [segurança](../15-seguranca-e-meio-ambiente/INDEX.md) e seções de segurança das tecnologias

## Limites

- Portal é **índice**; detalhes estão em documentos/páginas filhas do CDC/NIOSH — verificar a página específica antes de citar número
- Não substitui **SDS** do filamento/resina/pó nem normas locais de ventilação
- Não usar para afirmar que determinado setup doméstico é “seguro”

## Páginas que utilizam (previstas / atuais)

- [hazard.metal-powder](../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md)
- [material.powder-feedstocks](../05-materiais/po/feedstocks-polimeros-e-metais.md)
- Tecnologias PBF/BJ/DED (seções de segurança)
- Hub de segurança e meio ambiente
- Workflow digital (nota de riscos)

## Notas editoriais

Manter `evidence_status: limited` até que trechos específicos (ex.: recomendações de ventilação para FFF vs pó) sejam mapeados a documentos NIOSH individuais com data de acesso.
