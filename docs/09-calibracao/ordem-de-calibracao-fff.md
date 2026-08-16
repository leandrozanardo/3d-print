---
id: cal.fff-order
title: Ordem de calibração FFF
summary: 'Calibração FFF só é útil se a ordem respeitar dependências: mecânica/base
  estável → primeira camada → fluxo/extrusão → temperatura → retract/stringing → avanços
  de pressão/dinâmica → velocidade. Guias Ellis e Teaching Tech fornecem método e
  cupons; números não transferem automaticamente para A1 Mini + Bambu Studio. Prefira
  assistências oficiais do ecossistema quando existirem e mude uma variável por vez.'
doc_type: calibration
domain:
- calibration
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- printer.bambu-lab-a1-mini
- slicer.bambu-studio
not_for:
- random-knob-turning
- copy-numbers-across-firmwares
printers:
- printer.bambu-lab-a1-mini
slicers:
- slicer.bambu-studio
materials:
- material.pla
- material.petg
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
- source.bambu-a1-mini-tech-specs
related:
- process.fff.first-layer
- slicer.bambu-studio
- defect.fff.adhesion-failure
- printer.bambu-lab-a1-mini
- component.hotend
- component.extruder-path
prerequisites:
- printer.bambu-lab-a1-mini
- process.fff.first-layer
supersedes: []
aliases_pt_br:
- ordem de calibração
- sequência de tuning FFF
aliases_en:
- calibration order
- print tuning order
tags:
- calibration
- fff
- method
---
# Ordem de calibração FFF

Hub pai: [Calibração](INDEX.md)

## Objetivo

Estabelecer uma **sequência** de testes em que cada etapa só começa com a anterior estável. Objetivo não é “todos os cupons do YouTube”, e sim repetibilidade na [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md) com [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md).

## Quando calibrar

- Nova máquina / pós-transporte / troca de hotend, nozzle ou extrusor
- Novo diâmetro de nozzle ou família de filamento
- Defeitos sistemáticos após esgotar limpeza de [PEI](../04-componentes-e-hardware/placa-pei-fff.md) e first layer básica
- Mudança major de versão Studio/firmware que altere presets

## Quando não calibrar (ainda)

- Falha óbvia de adesão por placa suja ou draft — corrija processo primeiro ([falha de adesão](../12-problemas-e-diagnostico/fff/falha-adesao-primeira-camada.md))
- Perfil colado de outra impressora
- Várias variáveis alteradas no mesmo job

## Prerequisites

1. Hardware montado conforme fabricante; sem folgas gritantes.
2. Preset **A1 Mini** + material Ideal (PLA/PETG/TPU/PVA) — [tech specs](../22-fontes/bambu-a1-mini-tech-specs.md).
3. Bed ≤ **80 °C**; nozzle ≤ capability (300 °C) mas **dentro do range do filamento**.
4. Filamento seco o suficiente para o teste (PETG especialmente).
5. Versão do Studio anotada.

## Ordem canônica (método)

Inspirada na lógica de [Ellis Print Tuning Guide](../22-fontes/ellis-print-tuning-guide.md) e [Teaching Tech Calibration](../22-fontes/teaching-tech-calibration.md): **fundação antes de cosmético fino; extrusão antes de retract; dinâmica depois que o cordão está correto.**

| # | Etapa | Por quê nesta ordem | Notas A1 Mini / Studio |
|---|---|---|---|
| 0 | Segurança e baseline | Evita tuning em máquina insegura | Superfícies quentes; pare se blob |
| 1 | Mecânica / belt / folgas óbvias | Extrusão “certa” não corrige skip mecânico | Inspeção; procedimentos oficiais se houver |
| 2 | Assistências oficiais (auto-cal / bed / offset) | Estabelece Z e sensores do ecossistema | Preferir ao live-Z cego de outro firmware |
| 3 | [Primeira camada](../10-processo-de-impressao/fff/primeira-camada.md) | Sem adesão, o resto é ruído | Limpeza PEI; squish visual; velocidade baixa |
| 4 | Flow / extrusão (paredes únicas, cupons) | Dimensão e preenchimento dependem disto | Métodos Ellis/TT; **não** copiar número final de Klipper alheio |
| 5 | Temperatura (torre) no range do material | Muito cedo gera “temp corrige flow” | Teaching Tech: torre; validar marca/cor |
| 6 | Cooling vs overhang (após temp estável) | Fan alto mascara Z-bond | Ver [cooling](../04-componentes-e-hardware/cooling-de-peca-fff.md) |
| 7 | Retract / stringing | Só com cordão e temp OK | Direct drive: distâncias curtas — validar |
| 8 | Pressure advance / dinâmica / aceleração | Artefatos de canto e ringing | Nomes e UI dependem da versão Studio/firmware |
| 9 | Velocidade / max volumetric | Por último: qualidade sob taxa | Capability ≠ qualidade |

### Constantes durante um teste

- Mesmo filamento, cor e lote se possível
- Mesmo nozzle (0,4 mm ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)) nesta base)
- Uma variável por cupom
- Registrar foto + valor + versão Studio

### Critério de sucesso por etapa

- **First layer:** linhas se beijam; sem peel nas primeiras passadas.
- **Flow:** paredes com espessura esperada; sem gaps sistemáticos nem overfill grosseiro.
- **Temp:** melhor compromisso bridging/stringing/strength no range — não o máximo da máquina.
- **Retract:** stringing aceitável sem under-extrusion pós-viagem.
- **Dinâmica:** cantos sem bulges extremos nem ghosting inaceitável para o uso.

## Erros comuns

| Erro | Por quê falha |
|---|---|
| Começar por PA/speed | Amplifica erro de Z/flow |
| Copiar valores Ellis/TT literalmente | Firmwares e hotends diferentes |
| Calibrar PETG úmido | Stringing e estalo confundem leitura |
| Bed > 80 °C ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)) “porque o guia diz” | Viola capability A1 Mini |
| Mudar 5 settings no mesmo print | Perde causalidade |

## Frequência

- Pós-manutenção invasiva: etapas 2–4 no mínimo.
- Troca de marca de filamento: 4–7 conforme sintoma.
- Rotina: não recalibrar o universo sem sintoma.

## Fontes (método)

- [source.ellis-print-tuning-guide](../22-fontes/ellis-print-tuning-guide.md) — ordem e leitura de artefatos
- [source.teaching-tech-calibration](../22-fontes/teaching-tech-calibration.md) — cupons e primeiros princípios
- [source.bambu-a1-mini-tech-specs](../22-fontes/bambu-a1-mini-tech-specs.md) — caps de máquina

## Veja também

- [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md)
- [Hotend e zona de fusão](../04-componentes-e-hardware/hotend-e-zona-de-fusao.md)
- [Direct drive vs Bowden](../04-componentes-e-hardware/extrusao-direct-drive-vs-bowden.md)

## Lacunas

- Procedimento numérico oficial Bambu por assistente (versão a versão)
- Cupons STL versionados no repo ligados a cada etapa
- Registro de calibração do projeto (template de log)
