---
id: defect.fff.z-banding
title: Z-banding em FFF
summary: 'Z-banding são faixas ou ondulações horizontais periódicas ao longo de Z,
  distintas do eco de ringing após cantos. Causas plausíveis: mecânica Z inconsistente,
  temperatura/fluxo oscilante, umidade, speed inconsistente, ou artefactos de layer
  height vs geometria. Diagnóstico: uma variável por vez; inspecionar leadscrew/gantry
  conforme fabricante; secar filamento antes de torres. Sem milímetros mágicos de
  ‘erro de passo’ inventados.'
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
- ringing-misdiagnosis
- vase-mode-banding-as-defect-always
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
- defect.fff.ringing-ghosting
- defect.fff.under-extrusion
- material.drying-storage
- maint.a1-mini-preventive
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- z-banding
- bandas horizontais
- ribbing em Z
aliases_en:
- Z banding
- Z ribbing
- horizontal banding
tags:
- z-banding
- troubleshooting
- fff
symptom_tags:
- z-banding
- horizontal-ribbing
cause_tags:
- z-mechanics
- temperature-swing
- moisture
- extrusion-variation
setting_tags:
- layer-height
- temperatures
- speed
---
# Z-banding em FFF

Hub pai: [Problemas FFF](INDEX.md) · [Índice por sintoma](indice-por-sintoma.md)

## Resumo de emergência

Faixas **horizontais** repetindo em Z? Diferencie de ringing. Seque filamento, estabilize temp/speed, depois mecânica Z/manutenção oficial — não “compensate flow” às cegas.

## Assinatura

- Visual: anéis/faixas ao redor da peça em intervalos ao longo da altura
- Pode ser suave (cosmético) ou irregular (processo instável)
- Em *vase mode*, banding de camada é em parte **estético esperado** — nem frequentemente (exceto causa mecânica isolada) é defeito a “corrigir”

## Diferenciar

| Parece Z-banding mas… | Vá para |
|---|---|
| Eco após cantos/features | [Ringing/ghosting](ringing-ghosting.md) |
| Gaps / subextrusão irregular | [Subextrusão](subextrusao.md) |
| Degrau único deslocado | [Layer shift](layer-shift.md) |
| Brilho irregular + pops | [Secagem](../../05-materiais/fff/secagem-e-armazenamento.md) |

## Cause matrix

| Plausibilidade | Causa | Por quê |
|---|---|---|
| Alta | Umidade / extrusão variável | Diâmetro efetivo e fluxo oscilam |
| Alta | Oscilação térmica do hotend | Viscosidade muda por camada |
| Média | Mecânica Z / montagem (seguir fabricante) | Avanço irregular |
| Média | Speed/cooling mudando por altura | Peças altas |
| Média | Layer height vs geometria | Alias visual — nem frequentemente (exceto causa mecânica isolada) “bug” |
| Baixa-primeira | “PID errado” como chute único | Meça/estabilize processo antes |

## Árvore

```text
1 Foto: eco de canto ou faixa horizontal global?
   ├─ eco → ringing
   └─ faixa Z → continue
2 Pops / stringing / PETG? ─► secar → retestar
3 Temp estável no preset? ─► evitar drafts no sensor/frame
4 Outer speed constante no cupom?
5 Manutenção: sujeira, folgas, procedimento Wiki ([manutenção](../../13-manutencao/a1-mini-rotina-preventiva.md))
6 Ainda? ─► cupom cilíndrico; uma mudança; registrar
```

## Testes barato → caro

1. Cilindro ou torre lisa em PLA seco
2. Só secar se suspeita de umidade
3. Só reduzir variação de speed na pele
4. Inspeção mecânica conforme [Wiki A1 mini](../../22-fontes/bambu-wiki-a1-mini.md)
5. Calibração avançada só com método ([Ellis](../../22-fontes/ellis-print-tuning-guide.md))

## Não faça

- Declarar leadscrew “danificado” sem inspeção
- Inventar mm de erro de passo
- Misturar com cinco mudanças de PA/retract

## Validação

Mesma geometria; iluminação rasante; before/after com uma causa.

## Prevenção

- Filamento seco em jobs cosméticos
- Parede externa estável
- Manutenção preventiva
- Aceitar banding leve em vase como look, se for o caso — [vasos](../../16-cenarios-e-playbooks/vasos-e-recipientes.md)

## Relações

- related-to → ringing, subextrusão, manutenção
- worsened-by → draft + material úmido + speed caótico

## Fontes

- [Ellis Print Tuning Guide](../../22-fontes/ellis-print-tuning-guide.md)
- [Bambu Wiki A1 mini](../../22-fontes/bambu-wiki-a1-mini.md) — procedimentos mecânicos oficiais

## Lacunas

- Periodo medido correlacionado a passo Z nesta máquina: não caracterizado aqui
- Comparativo textured PEI refletindo banding: observação futura
