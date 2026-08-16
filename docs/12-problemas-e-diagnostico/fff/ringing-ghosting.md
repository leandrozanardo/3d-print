---
id: defect.fff.ringing-ghosting
title: Ringing / ghosting em FFF
summary: Ringing (ghosting) são ecos ondulados nas paredes após cantos ou mudanças
  bruscas de direção, causados por vibração/ressonância do sistema mecânico em aceleração.
  Na A1 Mini, priorize reduzir velocidade de parede externa e verificar mesa/correias
  antes de caçar accel de fórum. Diferencie de Z-banding (faixas horizontais periódicas)
  e de textura de umidade. Sem números mágicos de Hz — use método de teste e presets
  da máquina.
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
- z-banding-misdiagnosis
- copy-accel-from-other-printer
materials:
- material.pla
- material.petg
printers:
- printer.bambu-lab-a1-mini
slicers:
- slicer.bambu-studio
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
related:
- defect.fff.z-banding
- defect.fff.layer-shift
- scenario.tall-thin-parts
- scenario.speed-vs-quality
- maint.a1-mini-preventive
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- ringing
- ghosting
- eco de vibração
- ondulação após canto
aliases_en:
- ringing
- ghosting
- echoing
- vibration artifacts
tags:
- ringing
- ghosting
- troubleshooting
- fff
symptom_tags:
- ringing
- ghosting
cause_tags:
- vibration
- high-accel
- loose-mechanics
- high-outer-speed
setting_tags:
- speed
- acceleration
---
# Ringing / ghosting em FFF

Hub pai: [Problemas FFF](INDEX.md) · [Índice por sintoma](indice-por-sintoma.md)

## Resumo de emergência

Ondas que **ecoam** depois de um canto ou letra? ↓ velocidade da **parede externa**, confirme mesa rígida e correias no procedimento Bambu; só então mexa em accel com método. Não copie accel de outra impressora.

## Assinatura

- Visual: ondulações que **repetem o contorno** de features (cantos, furos, texto) ao longo do eixo de movimento
- Momento: piora com speed/accel altos; peças altas/finas oscilam mais
- Não é: faixa horizontal uniforme em toda a circunferência → suspeite [Z-banding](z-banding.md)

## Diferenciar

| Parece ringing mas… | Vá para |
|---|---|
| Faixas horizontais periódicas em Z | [Z-banding](z-banding.md) |
| Degrau permanente XY | [Layer shift](layer-shift.md) |
| Parede irregular + pops | Umidade / [subextrusão](subextrusao.md) |
| Só na primeira camada | [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) |

## Cause matrix

| Plausibilidade | Causa | Por quê |
|---|---|---|
| Alta | Outer wall rápida demais | Energia de vibração visível na pele |
| Alta | Mesa/impressora balançando | Amplifica ressonância |
| Alta | Mecânica folgada (após checar procedimento oficial) | Folga → oscilação |
| Média | Accel/jerk (ou equivalente) alto demais para a peça | Excitação |
| Média | Peça esbelta | [Peças altas](../../16-cenarios-e-playbooks/pecas-altas-e-finas.md) |
| Baixa-primeira | “Input shaping quebrado” | Só após mecânica + speed |

Capability de speed/accel nas [tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md) é **teto de máquina**, não meta cosmética.

## Árvore

```text
1 Mesa rígida / sem balanço? ─NÃO─► estabilizar superfície
2 Correias/obstáculos OK? ([manutenção](../../13-manutencao/a1-mini-rotina-preventiva.md))
3 ↓ outer wall speed a partir do preset — uma variável
4 Ainda eco? ─► reduzir accel do perfil com método (não chute)
5 Peça alta? ─► brim / split / ↓ speed adicional
6 Ainda? ─► cupom de cantos; registrar before/after
```

## Testes barato → caro

1. Foto obliqua de um canto agudo
2. Mesmo cupom com só outer speed menor
3. Verificar mecánica
4. Só então calibração avançada / resonance tools do ecossistema, se existirem na sua revisão

Método geral de leitura: [Ellis Print Tuning Guide](../../22-fontes/ellis-print-tuning-guide.md).

## Não faça

- Cinco knobs (accel + speed + flow + temp + PA) juntos
- Apertar correia “no feeling”
- Ignorar layer shift real tratando como ringing

## Validação

Mesmo modelo; mesma distância focal da foto; uma mudança principal.

## Prevenção

- Freio de parede externa em cosmético ([speed vs quality](../../16-cenarios-e-playbooks/impressao-rapida-vs-qualidade.md))
- Manutenção preventiva
- Evitar torres livres no limite de velocidade

## Relações

- related-to → [Z-banding](z-banding.md), [layer shift](layer-shift.md)
- settings → hub de [settings](../../08-slicers-e-configuracoes/settings/INDEX.md)

## Fontes

- [Ellis Print Tuning Guide](../../22-fontes/ellis-print-tuning-guide.md) — método
  https://ellis3dp.com/Print-Tuning-Guide/
- [Bambu A1 mini tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md) — capabilities ≠ quality targets
- Legado: [altura-de-camada-e-velocidade](../../projeto/fatiamento/altura-de-camada-e-velocidade.md)

## Lacunas

- Frequências de ressonância medidas nesta unidade: não publicadas
- Guia de UI Bambu para vibration compensation por firmware: futuro
