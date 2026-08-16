---
id: meta.evidence-policy
title: Política de evidências
summary: Classificação de afirmações técnicas, tratamento de divergências entre fontes,
  regras para valores numéricos e registro de contradições sem média sem sentido.
doc_type: policy
domain:
- meta
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 12-months
related:
- meta.source-policy
- meta.contradictions
tags:
- evidence
---
# Política de evidências

## Classes internas de claim

| Classe | Exemplo |
|---|---|
| established definition | Categorias ISO/ASTM 52900 |
| physical principle | Contração térmica → tensões |
| standard requirement | Requisitos de norma citada |
| regulatory/safety guidance | NIOSH/EPA/FDA/SDS |
| manufacturer-specific fact | Volume 180³ mm A1 mini |
| product-specific property | TDS de um SKU |
| measured experimental result | Ensaio com condições |
| supported heuristic | Ordem de calibração com método |
| community hypothesis | Relato de fórum |
| local observation | Cupom neste projeto |
| unknown | Sem evidência suficiente |

## Quando fontes divergem

1. Verificar se escopos diferem (tecnologia, máquina, material, cor, versão, ambiente)
2. Preservar ambos com escopo se válidos
3. Não calcular média sem sentido
4. Registrar em [contradicoes.md](contradicoes.md)
5. Reduzir `confidence`
6. Não escolher o número que “parece melhor”

## Números

Todo valor relevante deve incluir:

- unidade
- condição de medição/processo
- equipamento/material (quando aplicável)
- source id ou link
- range/incerteza quando relevante
- papel: ponto inicial | limite | nominal | medido

Marcar incerteza operacional herdada do corpus legado com linguagem equivalente a **validate on printer** (validar na impressora), sem fingir metrologia.
