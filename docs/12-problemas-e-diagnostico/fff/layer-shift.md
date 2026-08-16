---
id: "defect.fff.layer-shift"
title: "Layer shift (deslocamento de camada) em FFF"
summary: "Layer shift é um degrau XY permanente a partir de certa altura: o sistema de movimento perde passos ou a peça é empurrada. Na A1 Mini, confirme adesão primeiro — peel-then-push imita shift e leva a ajuste errado de belt. Causas: colisão, cabo, suporte solto, speed/accel em peças altas, tensão de correia/folga. Diferencie de gaps (subextrusão) e de warp."
doc_type: "troubleshooting"
domain: ["fff", "quality", "troubleshooting"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "printer.bambu-lab-a1-mini"]
not_for: ["gaps-without-xy-step", "belt-panic-before-adhesion-check"]
symptoms: ["symptom.layer-shift", "symptom.xy-step"]
causes: ["cause.collision", "cause.peel-then-push", "cause.belt", "cause.accel", "cause.cable-snag"]
printers: ["printer.bambu-lab-a1-mini"]
slicers: ["slicer.bambu-studio"]
settings: ["setting.speeds"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: []
related: ["defect.fff.warping", "process.fff.first-layer", "setting.speeds", "defect.fff.under-extrusion"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["layer shift", "deslocamento de camada", "degrau XY"]
aliases_en: ["layer shift", "shifted layers", "skipped steps"]
tags: ["layer-shift", "troubleshooting", "fff"]
---

# Layer shift (deslocamento de camada) em FFF

Hub pai: [Problemas FFF](INDEX.md) · [Índice por sintoma](indice-por-sintoma.md)

## Resumo de emergência

Degrau XY permanente? **Pare** se ainda houver risco de colisão. Verifique se a peça **ainda está no lugar original**. Se descolou e foi empurrada → trate [primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) / [empenamento](empenamento.md), não belt primeiro. Depois: cabo livre, −speed/accel, procedimento oficial de correia.

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

## Riscos e parada

- Head batendo em peça/blob → dano térmico — **interrompa**
- Não force mecânica com hotend quente sem cuidado

## Cause matrix

| Plausibilidade | Causa | Fix |
|---|---|---|
| Alta | Peel-then-push | Adesão/brim/draft — não belt |
| Alta | Colisão / suporte solto | Limpar path; estabilizar suporte |
| Alta | Cabo/snag | Liberar trajeto do flat cable |
| Média | Speed/accel + peça alta | −20–40% — [velocidades](../../08-slicers-e-configuracoes/settings/velocidades.md) |
| Média | Belt/gantry | Procedimento Bambu (não apertar “no feeling”) |

## Árvore

```text
Peça ainda no pose original?
  ├─ NÃO → adesão/warp; brim; limpar debris
  └─ SIM → slam / cabo?
        ├─ SIM → liberar path; remover ilhas de suporte
        └─ NÃO → tall + rápido?
              ├─ SIM → ↓ speed/accel
              └─ NÃO → belt/gantry (procedimento oficial)
```

## Testes

1. Foto da base: ainda centrada?  
2. Reimprimir cubo baixo lento  
3. Só então mecânica de correia  

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

- Legado operacional; procedimentos de manutenção do fabricante (seguir versão atual)

## Lacunas

- Link canônico versionado do procedimento de belt Bambu
- Página de manutenção A1 Mini canônica
