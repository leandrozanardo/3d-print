---
id: setting.brim-raft-skirt
title: Brim, raft e skirt
summary: 'Três saliências de mesa distintas: skirt (purge/prime sem ancorar a peça),
  brim (anel ligado à peça para âncora de borda contra warp), raft (cama sacrificial
  sob a peça). Conceito primeiro; no Bambu Studio: Brim/Raft/Skirt (nomes variam).
  Em A1 Mini aberta, brim é a alavanca usual contra empenamento; raft é último recurso
  (cicatriz + tempo). Não use raft para ‘consertar’ first layer sem diagnosticar Z/mesa.'
doc_type: setting
domain:
- slicing
- fff
- adhesion
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- slicer.bambu-studio
- printer.bambu-lab-a1-mini
not_for:
- resin-raft-as-identical
- raft-before-first-layer-diagnosis
- eternal-ui-path-pinning
slicers:
- slicer.bambu-studio
printers:
- printer.bambu-lab-a1-mini
materials:
- material.pla
- material.petg
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
related:
- process.fff.first-layer
- defect.fff.warping
- setting.supports
- setting.temperatures
- setting.cooling
- hub.slicers.settings
prerequisites:
- process.fff.first-layer
supersedes: []
aliases_pt_br:
- brim
- raft
- skirt
- saia
- aba de adesão
aliases_en:
- brim
- raft
- skirt
- mouse ears
tags:
- setting
- brim
- raft
- skirt
- adhesion
setting_tags:
- brim
- raft
- skirt
---
# Brim, raft e skirt

Hub pai: [Settings](INDEX.md)

## Conceito semântico

| Recurso | Liga à peça? | Função principal |
|---|---|---|
| **Skirt** | Não | Purge/prime, verificar extrusão antes do perímetro |
| **Brim** | Sim (borda) | Âncora de borda / área de contato contra levantamento |
| **Raft** | Via interface | Cama sacrificial; desacopla peça da textura da mesa |

## Nomes no Bambu Studio (notas)

Busque **Brim**, **Raft**, **Skirt** / **Brim width**, **Raft layers**. UI muda — use busca.

## Unidade / tipo

Largura/linhas (brim), camadas (raft), loops/distância (skirt), gaps de interface (mm).

## Mecanismo

- **Skirt:** não resolve warp; diagnostica bico/fluxo antes do job
- **Brim:** aumenta perímetro grudado; reduz alavanca de canto ([empenamento](../../12-problemas-e-diagnostico/fff/empenamento.md))
- **Raft:** cria fundação nova; útil em geometrias mínimas de contato ou mesas difíceis — custo de cicatriz e tempo

## Dependências

- [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) deve estar OK **antes** de escalar raft
- [Temperaturas](temperaturas.md) de bed dentro da capability (A1 Mini bed ≤ 80 °C — [tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md))
- [Cooling](cooling.md) inicial baixo ajuda brim a “pegar”
- Envelope: brim consome margem XY

## Decisão (ordem recomendada)

```text
First layer squish OK?
  ├─ NÃO → process.fff.first-layer (não comece pelo raft)
  └─ SIM → cantos levantam depois?
        ├─ Draft/AC? → bloquear ar
        ├─ Âncora de borda fraca? → brim (ou mouse ears)
        └─ Brim falhou em tentativas controladas + geometria mínima? → raft
Skirt: use para prime/diagnóstico, independente do warp.
```

## Heurísticas (qualitativo)

- PLA em A1 Mini: brim frequentemente suficiente se draft controlado
- PETG: brim + bed na janela + filamento seco — raft só se necessário
- Raft: último recurso após brim + ambiente + bed
- Remoção: espátula com cuidado; não alavancar contra mesa texturizada com força destrutiva

Larguras numéricas: partir do preset / legado operacional validado na máquina — não fixar “com frequência (exceto casos calibrados) X mm” como lei universal nesta página. Legado de referência: [brim-raft-saia](../../projeto/fatiamento/brim-raft-saia.md).

## Efeitos

| Ligar brim | Ligar raft |
|---|---|
| + adesão de borda; + remoção leve | + adesão/isolamento; ++ tempo; cicatriz na base |
| Consome margem | Consome Z e filamento |

## Ordem de ataque (resumo)

1. Validar first layer
2. Skirt para observar extrusão
3. Brim se warp de borda
4. ↓ early fan / bed no range
5. Raft só após falhas controladas

## Relações com outros conceitos

- mitigates → corner lift (brim/raft)
- does-not-fix → under-extrusion raiz (skirt só revela)
- conflicts-with → raft prematuro mascarando Z offset
- related → [suportes](suportes.md) (overhang ≠ mesa)

## Veja também

- [Empenamento](../../12-problemas-e-diagnostico/fff/empenamento.md)
- Playbook: [a1-mini primeira camada/empenamento](../../16-cenarios-e-playbooks/a1-mini-pla-petg-primeira-camada-empenamento.md)

## Fontes

- Capability bed: [source.bambu-a1-mini-tech-specs](../../22-fontes/bambu-a1-mini-tech-specs.md)
- Método: [source.ellis-print-tuning-guide](../../22-fontes/ellis-print-tuning-guide.md)
- Legado EN: [brim-raft-saia.md](../../projeto/fatiamento/brim-raft-saia.md)

## Lacunas

- Comparativo textured PEI vs cool plate com brim (dados locais)
- Mouse ears manuais vs brim automático
