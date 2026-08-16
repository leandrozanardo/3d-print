---
id: slicer.bambu-studio
title: Bambu Studio
summary: Bambu Studio é o slicer oficial do ecossistema Bambu Lab usado nesta base
  com a A1 Mini. Trabalha com famílias de perfil (máquina, filamento, processo) e
  assistências de calibração/firmware acopladas ao produto. Conceitos semânticos (layer
  height, wall loops, brim, supports, cooling) importam mais que dumps de números;
  paths de UI e presets mudam por versão — sempre declarar versão ao diagnosticar.
doc_type: slicer
domain:
- slicers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- bambu-studio
- printer.bambu-lab-a1-mini
not_for:
- universal-setting-dump
- x1c-profile-paste-to-a1-mini
printers:
- printer.bambu-lab-a1-mini
slicers:
- slicer.bambu-studio
materials:
- material.pla
- material.petg
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 3-months
sources:
- source.bambu-wiki-a1-mini
related:
- printer.bambu-lab-a1-mini
- process.fff.first-layer
- design.supports-fff
- cal.fff-order
- material.pla
- material.petg
prerequisites:
- printer.bambu-lab-a1-mini
supersedes: []
aliases_pt_br:
- Bambu Studio
- Studio Bambu
aliases_en:
- Bambu Studio
- BambuSlicer lineage
tags:
- slicer
- bambu
- profiles
---
# Bambu Studio

Hub pai: [Slicers e configurações](INDEX.md)

## O que é

**Bambu Studio** é o software de fatiamento (slicer) do ecossistema Bambu Lab. Converte malha + perfis em G-code/job para impressoras Bambu (aqui: [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md)). Herda ideias da linhagem PrusaSlicer/Orca, mas **presets, nomes de UI e features cloud/firmware são específicos** — não trate tutoriais de outro slicer como mapa 1:1.

## Quando importa

- Qualquer receita operacional A1 Mini nesta base
- Diagnóstico “mudei um número e piorou” (versão + família de perfil)
- Escolha de process profile (perfis nomeados do slicer (Standard/Draft/Fine etc.) — escolha de fluxo de trabalho, não valor pinado)
- Preview de suportes, brim e first layer antes de imprimir

## Conceitos semânticos (não dump de settings)

Use estes conceitos ao raciocinar; o **path exato no menu muda por versão**:

| Conceito | Papel na decisão |
|---|---|
| Printer / plate / nozzle | Envelope, bed max, diâmetro — constraints físicas |
| Filament profile | Temps, cooling defaults, flow/PA se existirem no preset |
| Process / quality profile | Layer height, paredes, infill, velocidades, first layer |
| First layer / initial layer | Adesão e squish — ver [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md) |
| Bed / nozzle temperature | em geral (condicional) dentro do range do filamento **e** bed ≤ 80 °C ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)) na A1 Mini |
| Part cooling / fan | Overhangs vs Z-bond / warp — ver [cooling de peça](../04-componentes-e-hardware/cooling-de-peca-fff.md) |
| Brim / raft / skirt | Âncora de borda; raft = último recurso |
| Supports (normal/tree) | Acesso, cicatrizes — ver [suportes](../06-design-para-impressao-3d/suportes-fff.md) |
| Orientation / arrange | Resistência e suporte — ver [orientação](../06-design-para-impressao-3d/orientacao-fff.md) |
| Strength vs speed | Mais paredes/perímetros frequentemente batem infill denso (heurística) |

**Proibição editorial desta página:** listar dezenas de valores “universais”. Preferir preset oficial **A1 Mini** + material Ideal ([tech specs](../22-fontes/bambu-a1-mini-tech-specs.md): PLA, PETG, TPU, PVA) e validar na impressora.

## Famílias de perfil (como decidir)

1. **Máquina:** selecione o modelo **A1 Mini** (não X1C/P1S/A1 full sem revisão). Volume operacional 180 × 180 × 180 mm ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)); deixe margem para brim/suportes.
2. **Nozzle:** default desta base [0,4 mm](../04-componentes-e-hardware/nozzle-0-4-mm-fff.md); trocar diâmetro = nova família de processo.
3. **Filamento:** preset da marca/tipo quando existir; senão, partida do genérico PLA/PETG do Studio **e** TDS do bobina.
4. **Processo:** comece pelo preset de qualidade “padrão” do pacote; só specialize (0,12 Fine, 0,28 Draft, etc.) com objetivo claro (detalhe vs tempo).
5. **Placa:** declare smooth vs textured no fluxo se o Studio/firmware exigir — impacta expectativa de adesão ([PEI](../04-componentes-e-hardware/placa-pei-fff.md)).

### O que não fazer

- Colar perfil de X1/P1 “porque é Bambu” sem checar bed max, cooling e velocidades.
- Misturar filament profile de PETG com process pensado só para PLA high-speed sem releitura.
- Tratar um print bem-sucedido como calibração completa do extrusor.

## Caveat de versão (obrigatório em diagnóstico)

Presets, nomes de campos, calibration wizards e defaults de PA/flow **mudam entre versões** do Bambu Studio e do firmware.

Ao pedir ou dar ajuda:

1. Registrar **versão do Studio** e, se possível, firmware da A1 Mini.
2. Preferir screenshot do painel Process/Filament a “usei o default”.
3. Não copiar números de guias Ellis/Teaching Tech como se fossem campos Bambu — use-os como **método** ([ordem de calibração](../09-calibracao/ordem-de-calibracao-fff.md)).

## Fluxo de decisão curto (job novo)

```text
Objetivo da peça (cosmético / encaixe / resistência)?
  → Orientar malha (design.orientation-fff)
  → Preset A1 Mini + filamento Ideal
  → Preview: first layer contínua? overhangs sem suporte impossível?
  → PLA vs PETG: textured preferida para PETG; bed ≤ 80 °C ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md))
  → Imprimir cupom/peça; uma variável por ajuste
```

## Segurança e limites

- Jobs desacompanhados: risco residual de falha catastrófica — monitoramento recomendado.
- Não use Studio para “autorizar” ABS/ASA/PC/PA na A1 Mini contra a posição **Not Recommended** do fabricante.
- Cloud/conta: fora do escopo desta página; não confundir com fatiamento local.

## Relações

- configures → [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md)
- depends-on → perfis máquina/filamento/processo alinhados
- related → [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md), [PLA](../05-materiais/fff/pla.md), [PETG](../05-materiais/fff/petg.md)

## Veja também

- Wiki de procedimento: [bambu-wiki-a1-mini](../22-fontes/bambu-wiki-a1-mini.md)
- Legado operacional (EN/migração): [projeto/](../projeto/INDEX.md) até páginas canônicas cobrirem cada setting

## Fontes

- [source.bambu-wiki-a1-mini](../22-fontes/bambu-wiki-a1-mini.md)

## Lacunas

- Átomos `setting.*` com paths por versão major do Studio
- Matriz preset oficial vs overrides seguros do projeto
- AMS lite / multicolor como página própria
