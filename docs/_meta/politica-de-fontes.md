---
id: "meta.source-policy"
title: "Política de fontes"
summary: "Hierarquia de proveniência: normas e segurança, fabricante, código oficial, TDS/SDS, literatura primária, experimento controlado, guia metodológico; comunidade só para hipóteses. Registro canônico em docs/22-fontes/."
doc_type: "policy"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
related: ["meta.evidence-policy", "meta.contradictions"]
tags: ["sources"]
---

# Política de fontes

## Proibição

Conhecimento interno da LLM **não** é fonte final. Não inventar URL, DOI, temperatura ou tolerância e “citar depois”.

## Prioridade padrão (não automática)

1. Norma / especificação / órgão regulador ou de segurança
2. Documentação oficial do fabricante
3. Source code / repositório oficial do software
4. Datasheet / SDS do produto exato
5. Artigo científico primário ou revisão sistemática
6. Experimento controlado e reproduzível
7. Guia técnico reconhecido com método claro (Ellis, Teaching Tech)
8. Comunidade (fórum/Reddit) — só hipóteses, sintomas raros, descoberta

Use cada fonte apenas para claims que ela sustenta. Norma ≠ datasheet ≠ paper ≠ marketing.

## Registro

Cada fonte citada de forma recorrente deve ter página em [docs/22-fontes/](../22-fontes/INDEX.md) com: id, tipo, título, autor/org, URL/DOI/path, versão, datas, licença, tópicos, limites, confiabilidade, páginas que a usam.

## Citações no corpo

- Perto do claim
- Link específico, não homepage genérica
- Sem resultados de busca
- Sem copiar grandes trechos
- Paywall: registrar só o acessível
- Vídeo: autor, título, data, timestamp
- Fórum: não sustenta hard safety rules

## Legado CC BY-SA

O ebook Guia Maker (`docs/ebook/`, originais em `docs/_arquivo/ebook/`) é **CC BY-SA 4.0**. Derivação exige atribuição e ShareAlike. Não copiar trechos para páginas canônicas sem cumprir a licença e registrar derivação em [decisoes-editoriais.md](decisoes-editoriais.md).

## Fontes iniciais de pesquisa

Listadas no prompt mestre §36 (ISO/ASTM, NIST, NIOSH, EPA, FDA, 3MF, slicers, Bambu Wiki, Prusa KB, Ellis, Teaching Tech). Expandir por tópico.
