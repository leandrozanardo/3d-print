---
id: "fund.correlation-vs-cause"
title: "Correlação vs causa no troubleshooting FFF"
summary: "Troubleshooting eficaz separa sintoma, correlação e causa raiz. Mudar dois parâmetros e ‘melhorar’ não prova mecanismo; a mesma falha (ex.: peça solta) pode vir de first layer, warp, layer shift ou umidade. Esta página define disciplina de diagnóstico: uma mudança por vez, hipóteses falsificáveis, cupons e registro — sem checklists mágicos universais."
doc_type: "concept"
domain: ["fundamentals", "troubleshooting", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "calibration", "defect-diagnosis"]
not_for: ["blind-parameter-spray", "guaranteed-root-cause-from-photo-alone"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.ellis-print-tuning-guide", "source.teaching-tech-calibration"]
related: ["troubleshoot.fff-symptom-index", "quality.test-coupons", "process.fff.first-layer", "fund.heat-transfer-fff"]
prerequisites: ["fund.terminology"]
supersedes: []
aliases_pt_br: ["correlação vs causa", "diagnóstico FFF", "falácia de troubleshooting"]
aliases_en: ["correlation vs causation printing", "FFF troubleshooting discipline"]
tags: ["fundamentals", "troubleshooting", "methodology"]
---

# Correlação vs causa no troubleshooting FFF

Hub pai: [Fundamentos](INDEX.md)

## O que é

**Correlação** — dois eventos aparecem juntos (ex.: “aumentei fan e o overhang melhorou”).

**Causa** — mecanismo que, se removido ou alterado, muda o resultado de forma previsível e repetível no contexto (máquina, material, geometria).

Em FFF, fóruns premiarem “eu mudei X e funcionou” cria **overfitting anedótico**: X pode ser coincidente com limpeza da placa, troca de spool, temperatura ambiente ou mesh.

## Por que o erro é caro

- Mascarar first-layer ruim com brim eterno
- Subir temperatura até degradar o polímero “porque adesão”
- Tratar [layer shift](../12-problemas-e-diagnostico/fff/layer-shift.md) como under-extrusion
- Gastar filamento em peça longa sem [cupom](../11-qualidade-e-metrologia/cupons-e-ensaios.md)

## Modelo mental: sintoma → hipóteses → teste

```text
Sintoma observável
    → lista curta de hipóteses mecanicamente plausíveis
        → um teste (cupom / 1 mudança) que possa falsear a hipótese
            → registrar condição e resultado
```

Se o teste não falseia nem confirma, a hipótese permanece **aberta** — não vira dogma.

## Exemplos de ambiguidade comum

| Sintoma | Correlação popular | Causas alternativas a checar |
|---|---|---|
| Cantos levantam | “Mesa fria” | Dirty PEI, Z alto, draft, geometria longa, material errado — [empenamento](../12-problemas-e-diagnostico/fff/empenamento.md) |
| Buracos / falta de material | “Flow baixo” | Entupimento parcial, umidade, path errado, temp baixa, bobina travada — [subextrusão](../12-problemas-e-diagnostico/fff/subextrusao.md) |
| Face áspera em overhang | “Precisa de suporte” | Cooling, velocidade, ângulo, orientação — [overhangs](../06-design-para-impressao-3d/overhangs-e-angulos-autofportantes.md) |
| Vibração / ghosting | “Speed alta” | Ressonância/mecânica, belting, input shaping mal aplicado — [input shaping](../17-software-firmware-e-automacao/input-shaping-e-ressonancia.md) |
| Peça “fraca” | “Infill 100%” | Orientação/anisotropia, paredes, bonding — [mito infill](../20-pesquisa-e-mitos/mito-100-infill-mais-forte.md) |

## Regras de disciplina

1. **Uma variável por teste** quando o objetivo é aprendizado causal.
2. **Escreva a hipótese** antes de mudar o slicer (“se Z está alto, squish visual melhora sem mudar temp”).
3. **Prefira cupom** à peça de 6 h.
4. **Não empilhe compensações** (Z + temp + glue + brim + flow) sem rollback.
5. **Separe categorias**: adesão mesa, bonding Z, extrusão, cinemática, design.
6. **Aceite “não sei ainda”** — melhor que falso positivo documentado como verdade.

## Evidência fraca vs útil

| Fraca | Mais útil |
|---|---|
| Print único sem registro | N≥2 com mesmas condições + 1 mudança |
| Foto sem escala/orientação | Foto + preview do slicer + material/lote |
| “Na internet funciona com 250 °C” | TDS do SKU + preset da máquina + cupom local |
| Mudança após limpar a placa sem notar | Checklist de confusão (placa, spool, draft) |

## Relação com esta base

Índice de sintomas FFF: [problemas e diagnóstico](../12-problemas-e-diagnostico/fff/INDEX.md). Playbook operacional A1 Mini: [fatia vertical](../16-cenarios-e-playbooks/a1-mini-pla-petg-primeira-camada-empenamento.md).

## O que não fazer

- Declarar causa raiz só por semelhança visual com post de fórum
- Usar esta página como desculpa para não seguir SDS / ventilação
- Inventar números “ótimos universais” a partir de uma correlação

## Fontes

- [source.ellis-print-tuning-guide](../22-fontes/ellis-print-tuning-guide.md)
- [source.teaching-tech-calibration](../22-fontes/teaching-tech-calibration.md)

## Lacunas

- Matriz formal sintoma→teste com IDs de cupom do projeto: em evolução no legado `projeto/troubleshooting`
- DoE estatístico completo: fora do escopo desta página
