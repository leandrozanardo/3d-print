---
id: defect.fff.pillowing
title: Pillowing em FFF
summary: 'Pillowing é a superfície superior ondulada/almofadada sobre infill, quando
  solid tops não fecham o vão entre nervuras. Causas comuns: poucos top layers, infill
  baixo/esparso, bridging/cooling insuficiente no topo, subextrusão ou velocidade
  alta na cobertura. Corrija geometria de tops/infill antes de ‘mais temperatura’.
  Diferencie de warping de canto e de gaps de subextrusão nas paredes. Sem porcentagens
  mágicas universais — parta do preset e valide no cupom.'
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
- side-wall-gaps-as-pillowing
- spiral-vase-top-expectations
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
- defect.fff.under-extrusion
- setting.infill
- scenario.speed-vs-quality
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- pillowing
- topo almofadado
- coberturas onduladas
aliases_en:
- pillowing
- bumpy top surface
- pillow topping
tags:
- pillowing
- troubleshooting
- fff
- tops
symptom_tags:
- pillowing
- bumpy-top
cause_tags:
- insufficient-top-layers
- sparse-infill
- cooling
- under-extrusion
setting_tags:
- top-layers
- infill
- cooling
---
# Pillowing em FFF

Hub pai: [Problemas FFF](INDEX.md) · [Índice por sintoma](indice-por-sintoma.md)

## Resumo de emergência

Topo parece **colchão** sobre o infill? Aumente robustez de **top solid layers** e/ou densidade de infill sob o topo a partir do preset; confira extrusão; ironing só depois. Spiral vase **não** tem topo sólido — expectativa errada.

## Assinatura

- Visual: ondulações/bolhas na **face superior** horizontais, alinhadas ao padrão de infill por baixo
- Momento: nas últimas coberturas; piora com vão grande entre nervuras
- Tato: alto-relevo macio vs plano desejado

## Diferenciar

| Parece pillowing mas… | Vá para |
|---|---|
| Gaps nas paredes laterais | [Subextrusão](subextrusao.md) |
| Cantos levantando | [Empenamento](empenamento.md) |
| Eco após features laterais | [Ringing](ringing-ghosting.md) |
| Topo inexistente (vase) | [Vasos](../../16-cenarios-e-playbooks/vasos-e-recipientes.md) — modo, não defeito |

## Cause matrix

| Plausibilidade | Causa | Por quê |
|---|---|---|
| Alta | Poucas camadas sólidas de top | Não fecha o vão |
| Alta | Infill muito aberto sob o topo | Bridge longo demais |
| Alta | Cooling/bridging insuficiente no fechamento | Fios sagam |
| Média | Subextrusão / umidade | Cobertura magra |
| Média | Speed alta só no top | Menos tempo para solidificar |
| Baixa-primeira | “Ironing resolve tudo” | Ironing mascara; não substitui tops |

## Árvore

```text
1 É spiral/vase sem top? ─SIM─► expectativa de modo, não pillowing
2 Preview: top layers suficientes sobre infill?
3 Infill sob a pele: padrão/densidade razoáveis para o vão?
4 Extrusão OK? (paredes laterais sólidas?) ─NÃO─► subextrusão / secar
5 ↑ top solid / ajustar infill — uma mudança a partir do preset
6 Ainda? ─► ↓ speed top / ↑ fan no fechamento (PLA); PETG = trade bonding
7 Opcional: ironing só após base sólida
```

## Testes barato → caro

1. Cubo com topo visível; foto rasante
2. Só aumentar top solids **ou** só adensar infill superior
3. Verificar secagem se PETG/PLA suspeito
4. Ironing como cosmético final

Settings relacionados: [preenchimento](../../08-slicers-e-configuracoes/settings/preenchimento.md) (hub settings).

## PLA vs PETG

| Alavanca | PLA | PETG |
|---|---|---|
| Fan no topo | Geralmente ajuda fechar | Mais fan pode enfraquecer bonding — equilíbrio |
| Secagem | Útil | Crítica se gaps |
| Ironing | Comum cosmético | Pode arrastar — validar |

## Não faça

- Subir flow global 10% “no feeling” sem cupom
- Esperar topo perfeito com infill ornamental extremo
- Confundir com falha de first layer

## Validação

Mesmo cubo; mesma iluminação; uma alavanca principal.

## Prevenção

- Preset do material com tops coerentes ao tamanho do vão
- Evitar “oco demais” em faces cosméticas superiores
- Secar antes de culpar infill

## Relações

- caused-by → tops insuficientes, infill esparso, cooling, extrusão
- related-to → legado [preenchimento-e-paredes](../../projeto/fatiamento/preenchimento-e-paredes.md)
- settings → [settings hub](../../08-slicers-e-configuracoes/settings/INDEX.md)

## Fontes

- [Ellis Print Tuning Guide](../../22-fontes/ellis-print-tuning-guide.md) — método de leitura de superfície
  https://ellis3dp.com/Print-Tuning-Guide/
- Prática de tops/infill do pipeline desta base

## Lacunas

- Matriz top-layers × densidades por nozzle 0,4 medida local: futura
- Ironing profiles A1 Mini: documentar após testes
