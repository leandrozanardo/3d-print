---
id: scenario.tall-thin-parts
title: Playbook — peças altas e finas
summary: 'Torres, hastes e peças esbeltas em FFF sofrem com momento na base, vibração
  (ringing), risco de tombamento e falha de adesão amplificada pela altura. Mitigações:
  brim/âncora, baixar velocidade de parede externa, verificar mecânica, fatiar em
  partes com encaixe, evitar TPU mole em torre livre. Envelope A1 Mini 180 mm de Z
  ainda exige margem. Sem números mágicos de accel — parta do preset e valide. Relaciona
  warping, layer shift e ringing.'
doc_type: scenario
domain:
- scenarios
- fff
- design
technology:
- material-extrusion
process:
- fff
applies_to:
- printer.bambu-lab-a1-mini
- tall-geometry
- material.pla
- material.petg
not_for:
- ignore-first-layer-on-towers
- max-speed-on-skinny-posts
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 3-months
sources:
- source.ellis-print-tuning-guide
related:
- defect.fff.warping
- defect.fff.layer-shift
- defect.fff.ringing-ghosting
- design.orientation-fff
- hub.cenarios
prerequisites:
- process.fff.first-layer
supersedes: []
aliases_pt_br:
- torre fina
- peça esbelta
- haste alta FFF
aliases_en:
- tall thin parts
- skinny towers
- slender prints
tags:
- playbook
- tall-parts
- stability
---
# Playbook — peças altas e finas

Hub pai: [Cenários](INDEX.md)

## Objetivo

Imprimir geometria com **alta relação altura/base** (postes, torres, pernas, antenas) sem tombamento, oscilação destrutiva ou shift.

## Perguntas mínimas

- Qual a menor dimensão da base vs altura?
- Pode dividir e encaixar? ([tolerâncias](../06-design-para-impressao-3d/tolerancias-e-encaixes-fff.md))
- Material rígido (PLA) vs flexível (TPU — pior em torre livre)?
- Há draft no frame aberto?
- Job longo desacompanhado? (risco ↑ se cair)

## Árvore

```text
Peça esbelta?
  ├─ Base insuficiente? → brim / flange / mouse ears / redesenhar pé
  ├─ Pode split + pino? → preferir (menos momento)
  ├─ Primeira camada duvidosa? → NÃO subir — [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md)
  ├─ Vibração / eco nas paredes? → [ringing](../12-problemas-e-diagnostico/fff/ringing-ghosting.md); ↓ outer speed
  ├─ Degrau XY? → [layer shift](../12-problemas-e-diagnostico/fff/layer-shift.md); pare se colisão
  └─ Cantos sobem no topo? → [empenamento](../12-problemas-e-diagnostico/fff/empenamento.md)
```

## Hard constraints

- Volume Z máximo oficial A1 Mini: **180 mm** ([tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)) — peça “quase 180” + brim ainda precisa caber
- Não maximize toolhead speed/accel só porque a máquina lista capability alta
- TPU em torre livre: alto risco de oscilação — reavaliar geometria

## Design / orientação

- Alargar pé ou adicionar filete na raiz
- Orientar para maximizar contato de base sem destruir faces críticas
- Evitar overhangs em “bandeira” no topo sem suporte
- Preferir seções que quebrem ressonância (não sempre possível)

## Slicer (ordem de mitigação)

1. Âncora de mesa (brim) se a base for pequena  
2. Outer wall mais lenta que o restante — **validate on printer**  
3. Presets de accel da máquina como teto; não caçar número de fórum  
4. Cooling: equilíbrio — fan alto cedo pode piorar warp em alguns materiais  
5. Se ainda oscila: split da peça  

Método de leitura de artefatos: [Ellis Print Tuning Guide](../22-fontes/ellis-print-tuning-guide.md) (método, não perfil A1).

## Mecânica

Antes de culpar o slicer:

- Mesa balançando?
- Correias/procedimento Bambu — [manutenção](../13-manutencao/a1-mini-rotina-preventiva.md)
- Obstáculo no volume (clip, purge, skirt)?

## Checklist pré

- [ ] First-layer cupom OK no mesmo plate/material
- [ ] Brim/flange decidido
- [ ] Outer speed consciente
- [ ] Envelope Z com margem
- [ ] Plano se a peça cair (parar job)

## Sinais de falha

| Sintoma | Ação |
|---|---|
| Tombou / descolou | Parar; âncora; first layer |
| Eco de cantos em paredes | Ringing — ↓ speed |
| Bandas horizontais | Ver [Z-banding](../12-problemas-e-diagnostico/fff/z-banding.md) vs velocidade |
| Topo empena | Warp + draft |

## Segurança

Peça alta que descola vira obstáculo móvel — risco de colisão e blob.  
Não deixe unattended se já houve quase-queda — [elétrico/fogo](../15-seguranca-e-meio-ambiente/eletrico-fogo-e-impressao-desacompanhada.md).

## Fontes

- [Bambu tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)
- [Ellis](../22-fontes/ellis-print-tuning-guide.md)
- Legado: notas em warping / layer & speed do projeto

## Lacunas

- Critério geométrico quantitativo (razão altura/base) medido neste lab: não fixado
- Input shaping específico por firmware revision: documentar quando estabilizar
