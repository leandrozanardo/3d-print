---
id: fund.heat-transfer-fff
title: Transferência de calor em FFF
summary: 'Em FFF, a peça nasce sob gradientes térmicos: hotend, mesa, cooling de peça
  e ambiente competem. Entender condução, convecção e solidificação ajuda a priorizar
  first layer, bonding Z, overhangs, warping e stringing sem tratar temperatura de
  nozzle como alavanca única. Valores absolutos dependem de SKU, máquina e geometria
  — esta página é conceitual.'
doc_type: concept
domain:
- fundamentals
- fff
- thermal
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- material.pla
- material.petg
- printer.bambu-lab-a1-mini
not_for:
- universal-temperature-tables
- certified-thermal-properties
materials:
- material.pla
- material.petg
printers:
- printer.bambu-lab-a1-mini
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources:
- source.ellis-print-tuning-guide
related:
- fund.anisotropy
- fund.wetting-first-layer
- process.fff.first-layer
- component.part-cooling
- defect.fff.warping
prerequisites:
- fund.terminology
- tech.fff
supersedes: []
aliases_pt_br:
- transferência de calor FFF
- gradientes térmicos impressão
- térmica do cordão
aliases_en:
- FFF heat transfer
- filament thermal gradients
- melt cooling FFF
tags:
- fundamentals
- thermal
- fff
---
# Transferência de calor em FFF

Hub pai: [Fundamentos](INDEX.md)

## O que é

**Transferência de calor** em FFF descreve como energia térmica entra e sai do polímero durante extrusão, deposição e resfriamento. O cordão precisa estar quente o bastante para **fundir e molhar** a superfície anterior, e depois solidificar a tempo para **não escorrer** em overhangs — objetivos em tensão.

Não há um único “mapa térmico universal” válido para todos os filamentos e máquinas. Use esta página para **priorizar causas**, não para copiar setpoints inventados.

## Fontes e sumidouros típicos

| Elemento | Papel térmico (heurística) |
|---|---|
| Hotend / nozzle | Fornece calor para fundir e manter viscosidade de fluxo |
| Cordão depositado | Transporta calor latente/sensível; esfria por convecção e condução |
| Camada / peça abaixo | Condução + restrição mecânica; afeta bonding e tensão residual |
| Mesa aquecida | Mantém base mais quente; favorece adesão e reduz gradiente na first layer |
| Part cooling (fan) | Acelera solidificação de overhangs/bridges; pode enfraquecer união Z |
| Ambiente / drafts | Em frame aberto (ex.: A1 Mini), correntes de ar somam ao fan — ver [ambiente aberto](../10-processo-de-impressao/fff/ambiente-frame-aberto.md) |

## Mecanismos que importam no dia a dia

1. **Viscosidade vs temperatura** — polímero mais quente flui e molha melhor, mas pode stringar, babar ou degradar se fora do range do TDS.
2. **Tempo acima da temperatura de “solda”** — bonding Z depende de contato quente suficiente na interface; cooling agressivo encurta essa janela.
3. **Gradiente na peça** — base quente + topo frio (ou o inverso em peças altas) alimenta [tensões residuais e warp](anisotropia-e-tensoes-residuais.md).
4. **Massa térmica** — seções grossas retêm calor; seções finas solidificam rápido e podem falhar em overhang ou delaminar.
5. **Histórico térmico por camada** — velocidade, largura de linha e tempo de ciclo mudam o resfriamento efetivo sem você “mudar a temperatura”.

## Sintomas ↔ hipóteses térmicas (não causa única)

| Sintoma observado | Hipótese térmica frequente | Primeira checagem (não única) |
|---|---|---|
| First layer não gruda | Base fria demais / nozzle longe / superfície suja | [Primeira camada](../10-processo-de-impressao/fff/primeira-camada.md), [molhabilidade](adesao-molhabilidade-primeira-camada.md) |
| Overhang “baba” | Solidificação lenta demais | [Cooling de peça](../04-componentes-e-hardware/cooling-de-peca-fff.md), velocidade local |
| Delaminação / Z fraco | Interface esfria cedo demais ou flow insuficiente | Temp contextual, fan, umidade, orientação |
| Empenamento | Contração + gradiente + restrição | [Empenamento](../12-problemas-e-diagnostico/fff/empenamento.md) |
| Stringing / blobs | Polímero quente demais / retratação inadequada no contexto | Perfil material + retratação no slicer |

Correlação ≠ causa: ver [correlacao vs causa](correlacao-vs-causa-troubleshooting.md).

## Alavancas (ordem sugerida de raciocínio)

1. **Geometria e orientação** — seções impossíveis não se “consertam” só com °C.
2. **First layer e superfície** — sem base estável, o resto é ruído.
3. **Perfil do material no TDS / preset do fabricante** — ponto de partida; não inventar tetos.
4. **Cooling vs bonding** — trade-off explícito por face (cosmético vs estrutural).
5. **Velocidade e tempo de camada** — mudam o histórico térmico sem mexer no setpoint.
6. **Ambiente** — drafts em bed-slinger aberto alteram o resultado mesmo com “mesmos settings”.

## O que não fazer

- Tratar “mais temperatura = sempre mais adesão” como lei — ver [mito](../20-pesquisa-e-mitos/mito-mais-temp-mais-adesao-sempre.md).
- Copiar tabelas de outro nozzle/máquina/SKU como universais.
- Subir nozzle até o máximo da UI “para ver se gruda” sem olhar degradação, odores e SDS.
- Ignorar umidade: água no filamento muda viscosidade, poros e bonding.

## Relação com A1 Mini

A [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md) é frame aberto com mesa móvel: o ambiente participa do balanço térmico. Preferir presets oficiais do [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md) + materiais Ideal nas [tech specs](../22-fontes/bambu-a1-mini-tech-specs.md); validar na peça real.

## Relações

- constrains → first layer, overhangs, warping, Z strength
- trades-off-with → part cooling vs interlayer bonding
- related → [anisotropia](anisotropia-e-tensoes-residuais.md), [camadas](camadas-resolucao-precisao.md)

## Fontes

- [source.ellis-print-tuning-guide](../22-fontes/ellis-print-tuning-guide.md)

## Lacunas

- Mapas térmicos medidos (IR/termopar) no projeto: não publicados
- Curvas cooling % vs bonding para PLA/PETG na A1 Mini: abertas
