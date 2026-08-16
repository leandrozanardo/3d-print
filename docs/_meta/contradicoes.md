---
id: "meta.contradictions"
title: "Registro de contradições"
summary: "Divergências e riscos de falsa universalidade detectados na auditoria e no vertical slice. Escopos preservados; sem média numérica arbitrária."
doc_type: "audit"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-16"
review_cycle: "per-batch"
related: ["meta.evidence-policy", "meta.gaps"]
tags: ["contradictions"]
---

# Contradições e divergências

## C-001 — Faixas de temperatura PLA

| Item | Detalhe |
|---|---|
| Observação | Legado lista nozzle PLA ~190–220 °C e presets Bambu frequentemente ~220 °C |
| Hipótese | Variação por marca/pigmento/perfil Studio, não erro único |
| Resolução editorial | Tratar como **range contextual**; exigir TDS/perfil do filamento; marcar validação na impressora |
| Confidence | medium |

## C-002 — Bed PETG 70–80 °C vs max bed A1 mini 80 °C

| Item | Detalhe |
|---|---|
| Observação | Heurística legado bed PETG 70–80 °C; spec fabricante max build plate **80 °C** |
| Risco | Valores >80 °C seriam incompatíveis com capability oficial |
| Resolução | Limitar recomendações A1 Mini a ≤80 °C bed; citar tech specs |
| Confidence | high (cap fabricante) / medium (ponto ótimo por filamento) |

## C-003 — Idioma da base

| Item | Detalhe |
|---|---|
| Observação | `projeto/` EN vs ebook PT vs prompt mestre exige PT-BR canônico |
| Resolução | Canônico novo em PT-BR; legado EN permanece até migração; não misturar na mesma página |

## C-004 — “PLA seguro”

| Item | Detalhe |
|---|---|
| Observação | Risco de ler facilidade de impressão como food-safe/baixa emissão |
| Resolução | Proibir claim de segurança alimentar/médica sem processo; VOC/UFP existem também em PLA (lacuna de página dedicada) |

## C-005 — IDs related vs páginas reais (2026-08-16)

| Item | Detalhe |
|---|---|
| Observação | `design.fff-orientation` e `hw.pei-sheet-fff` referenciados sem página |
| Resolução | Corrigido para `design.orientation-fff` e `surface.pei` |
| Confidence | high |

## Abertas

Nenhuma média calculada entre fontes divergentes nesta sessão.
