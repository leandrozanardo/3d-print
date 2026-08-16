---
id: defect.fff.layer-shift
title: Layer shift (deslocamento de camada) em FFF
summary: 'Layer shift é um degrau XY permanente a partir de certa altura: o sistema
  de movimento perde passos ou a peça é empurrada. Na A1 Mini, confirme adesão primeiro
  — peel-then-push imita shift e leva a ajuste errado de belt. Causas: colisão, cabo,
  suporte solto, speed/accel em peças altas, tensão de correia/folga. Diferencie de
  gaps (subextrusão) e de warp.'
doc_type: troubleshooting
domain:
- fff
- quality
- troubleshooting
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- printer.bambu-lab-a1-mini
not_for:
- gaps-without-xy-step
- belt-panic-before-adhesion-check
printers:
- printer.bambu-lab-a1-mini
slicers:
- slicer.bambu-studio
knowledge_status: draft
evidence_status: mixed
safety_level: high
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
- source.bambu-wiki-a1-mini
related:
- defect.fff.warping
- process.fff.first-layer
- setting.speeds
- defect.fff.under-extrusion
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- layer shift
- deslocamento de camada
- degrau XY
aliases_en:
- layer shift
- shifted layers
- skipped steps
tags:
- layer-shift
- troubleshooting
- fff
symptom_tags:
- layer-shift
- xy-step
cause_tags:
- collision
- peel-then-push
- belt
- accel
- cable-snag
setting_tags:
- speeds
---
# Layer shift (deslocamento de camada) em FFF

Hub pai: [Problemas FFF](INDEX.md) · [Índice por sintoma](indice-por-sintoma.md)

## Resumo de emergência

Degrau XY permanente? **Pare** se ainda houver risco de colisão. Verifique se a peça **ainda está no lugar original**. Se descolou e foi empurrada → trate [primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) / [empenamento](empenamento.md), não belt primeiro. Depois: cabo livre, −speed/accel, procedimento oficial de correia.

## Sintomas

- Offset lateral permanente a partir de uma altura (paredes “cortadas” em degrau)
- Às vezes slam / batida audível no momento do evento
- Peça ainda aderida na pose original **ou** deslocada na mesa (este último sugere peel-then-push, não skip de motor puro)

## Causas

| Plausibilidade | Causa | Fix típico |
|---|---|---|
| Alta | Peel-then-push (adesão/warp) | Adesão/brim/draft — não belt primeiro |
| Alta | Colisão / suporte solto / debris | Limpar path; estabilizar suporte |
| Alta | Cabo/snag no flat cable | Liberar trajeto do cabo |
| Média | Speed/accel alto em peça alta | −20–40% — [velocidades](../../08-slicers-e-configuracoes/settings/velocidades.md) |
| Média | Belt/gantry fora do procedimento OEM | Procedimento Bambu (não apertar “no feeling”) |

## Ordem diagnóstica

1. Confirmar se a peça ainda está centrada na pose original (foto da base).
2. Se deslocou por descolamento → ir para adesão/empenamento; **não** tensionar correia ainda.
3. Procurar slam, cabo preso, suporte/ilha no caminho do head.
4. Reimprimir cubo baixo lento; se ok, subir altura com −speed/accel.
5. Só então mecânica de correia/gantry pelo procedimento oficial do fabricante.

```text
Peça ainda no pose original?
  ├─ NÃO → adesão/warp; brim; limpar debris
  └─ SIM → slam / cabo?
        ├─ SIM → liberar path; remover ilhas de suporte
        └─ NÃO → tall + rápido?
              ├─ SIM → ↓ speed/accel
              └─ NÃO → belt/gantry (procedimento oficial)
```

## Correções

- Restaurar adesão (limpeza de placa, Z offset, brim, controle de draft) quando houver peel-then-push
- Remover obstáculos e liberar flat cable
- Reduzir speed/accel em peças altas; evitar maximizar accel de marketing
- Seguir procedimento oficial de tensão/inspeção de correia (wiki/manuais do fabricante)
- Validar com cubo de calibração na altura alvo após o fix

## Condições de parada

- Head batendo em peça/blob ou risco térmico → **interrompa imediatamente**
- Não force mecânica com hotend quente sem cuidado
- Não “apertar belt no feeling” antes de descartar adesão e snag
- Pare o diagnóstico cosmético se houver risco de colisão recorrente

## Assinatura

- Visual: offset lateral a partir de uma altura; paredes “cortadas”
- Áudio: slam / batida frequente
- Mecânico: peça ainda aderida vs deslocada na mesa

## Diferenciar

| Observação | Página |
|---|---|
| Cantos curvando sem offset global | [Empenamento](empenamento.md) |
| Gaps sem degrau | [Subextrusão](subextrusao.md) |
| Base gorda | [Elephant foot](elephant-foot.md) |
| Nunca grudou | [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) |

## PLA vs PETG

Causas mecânicas iguais; PETG pode peel/warp mais → mais falsos shifts por push.

## Validação

Cubo de calibração após fix; sem degrau em altura alvo.

## Prevenção

- Brim em modelos tippy
- Draft control (warp → push)
- Não maximizar accel de marketing
- Manutenção de path de cabo

## Relações com outros conceitos

- mimicked-by → peel-then-push
- worsened-by → warp + high speed
- not-for → underextrusion gaps
- related-to → [empenamento](empenamento.md), [primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md)

## Veja também

- Legado: [layer-shift.md](../../projeto/troubleshooting/layer-shift.md)

## Fontes

- [source.ellis-print-tuning-guide](../../22-fontes/ellis-print-tuning-guide.md) — método de leitura de falhas / ordem de testes
- [source.teaching-tech-calibration](../../22-fontes/teaching-tech-calibration.md) — primeiros princípios e cupons
- [source.bambu-wiki-a1-mini](../../22-fontes/bambu-wiki-a1-mini.md) — procedimentos/FAQ oficiais A1 mini (manutenção)

## Lacunas

- Link canônico versionado do procedimento de belt Bambu
- Página de manutenção A1 Mini canônica
