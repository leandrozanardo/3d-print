---
id: quality.accuracy-vs-precision
title: Precisão vs repetibilidade (exatidão e dispersão)
summary: Em metrologia de peças FFF, separe exatidão (quão perto do nominal) de repetibilidade/precisão
  (quão próximas as réplicas ficam entre si). Uma peça ‘no alvo’ uma vez não prova
  processo estável; um processo repetível mas enviesado precisa de compensação sistemática
  (flow, hole compensation, elephant foot), não de ajustes aleatórios. Meça com método
  definido, após cooling, e registre condições (máquina, material, perfil).
doc_type: guide
domain:
- quality
- metrology
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- printer.bambu-lab-a1-mini
not_for:
- cnc-cmm-equivalence-claim
- medical-device-validation
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources:
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
related:
- quality.test-coupons
- design.tolerances-fff
- process.fff.first-layer
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- precisão vs repetibilidade
- exatidão dimensional
- dispersão entre peças
aliases_en:
- accuracy vs precision
- repeatability
- dimensional bias
tags:
- metrology
- quality
- fff
---
# Precisão vs repetibilidade

Hub pai: [Qualidade e metrologia](INDEX.md)

## Definições (uso nesta base)

| Termo nesta base | Significado operacional | Evitar confundir com |
|---|---|---|
| **Exatidão** (*accuracy* / bias baixo) | Média das medidas perto do nominal CAD | “A impressora é precisa” genérico |
| **Repetibilidade** (*precision* / baixa dispersão) | Réplicas próximas entre si nas mesmas condições | Acertar o alvo uma vez |
| **Resolução de camada** | Altura de cordão / detalhe Z | Tolerância de encaixe |
| **Resolução XY** | Limite prático ligado a nozzle/path | Micrômetro de marketing |

Em português técnico, “precisão” é ambíguo; prefira **exatidão** e **repetibilidade** no texto canônico.

## Por que FFF mistura os dois

- **Bias sistemático:** flow alto → peças “gordas”; elephant foot → base larga; hole compensation errada
- **Dispersão:** umidade variável, draft, troca de cor/lote, temperatura ambiente, manutenção
- **Direção:** X/Y/Z e features (furos vs externos) não erram igual — ver [anisotropia](../06-design-para-impressao-3d/resistencia-e-anisotropia.md)

## Matriz de decisão

```text
Medidas de N cupons (N≥3 recomendado para julgamento sério)
  ├─ Média longe do nominal, dispersão baixa
  │     → corrigir bias (flow / hole / L1 / CAD offset)
  ├─ Média OK, dispersão alta
  │     → estabilizar processo (secagem, draft, manutenção, mesma bobina)
  ├─ Média longe e dispersão alta
  │     → estabilizar primeiro; só depois compensar
  └─ N=1 “deu certo”
        → evidência insuficiente para lote
```

## Método mínimo de medição

1. Definir feature crítica (ex.: ID do furo, OD do pino, comprimento externo)
2. Imprimir [cupom](cupons-e-ensaios.md) nas mesmas settings da peça
3. Aguardar cooling completo (plástico ainda “anda” quente)
4. Paquímetro calibrado; mesma posição de medição; anotar
5. Comparar a tolerância funcional ([encaixes](../06-design-para-impressao-3d/tolerancias-e-encaixes-fff.md)), não a um micrometro arbitrário

## O que NÃO é evidência

- Screenshot de slicer “Layer time OK”
- Uma peça montou na mão
- Spec de marketing do fabricante sem condição de ensaio
- Transferir tolerância de SLA/CNC para FFF

## Ligação com calibração

Métodos de leitura de artefato (flow, PA, etc.): [Ellis](../22-fontes/ellis-print-tuning-guide.md), [Teaching Tech](../22-fontes/teaching-tech-calibration.md). Eles melhoram **controle de processo**; ainda assim você precisa medir a feature que importa.

## Segurança / escopo

Não usar esta página para validar dispositivo médico ou food-contact. Ver [claims](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md).

## Lacunas

- Protocolo estatístico formal (Cp/Cpk) não adotado neste projeto hobby
- Correlação nozzle wear ↔ dispersão: não medida aqui
