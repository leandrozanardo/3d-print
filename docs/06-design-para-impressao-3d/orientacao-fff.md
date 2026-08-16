---
id: design.orientation-fff
title: Orientação de peça em FFF
summary: 'Orientação em FFF define quais faces tocam a mesa, a direção das camadas
  (anisotropia), a quantidade de overhangs/suportes e a qualidade cosmética. Não existe
  orientação universal: priorize carga mecânica, área de contato estável, minimização
  de suporte em faces críticas e envelope da máquina. Na A1 Mini (180³ mm, bed-slinger
  aberto), bases longas e altas aumentam risco de warp e vibração — valide no preview
  do Bambu Studio.'
doc_type: design
domain:
- dfam
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- printer.bambu-lab-a1-mini
- material.pla
- material.petg
not_for:
- isotropic-strength-assumption
- resin-orientation-rules-as-fff
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
sources: []
related:
- design.supports-fff
- process.fff.first-layer
- defect.fff.warping
- material.pla
- material.petg
- kinematics.bed-slinger
- slicer.bambu-studio
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- orientação FFF
- orientação de impressão
- pose da peça
aliases_en:
- print orientation
- part orientation FFF
tags:
- dfam
- orientation
- fff
---
# Orientação de peça em FFF

Hub pai: [Design para impressão 3D](INDEX.md)

## O que é

**Orientação** é a pose da malha no volume de impressão: qual face fica na mesa (XY) e qual eixo da peça alinha com Z (empilhamento de camadas). Em FFF, orientação decide simultaneamente **resistência**, **suportes**, **acabamento** e **risco de falha** (adesão, warp, layer shift por massa alta).

## Quando importa

- Peça estrutural ou com clipes (carga vs camadas)
- Faces cosméticas visíveis (evitar cicatriz de suporte)
- Overhangs > ~45° típicos (heurística; validar geometria e cooling)
- Envelope apertado na [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md) (180 × 180 × 180 mm oficiais)

## Critérios de decisão (ordem sugerida)

1. **Segurança / falha catastrófica:** a peça pode tombear ou ter base mínima? Prefira área de contato estável — ver [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md).
2. **Carga mecânica:** coloque a tração principal **no plano XY** (fibras/contornos longos), não puxando camadas no Z. PLA e PETG são anisotrópicos — ver [PLA](../05-materiais/fff/pla.md) / [PETG](../05-materiais/fff/petg.md).
3. **Faces críticas:** oriente para que faces A (visíveis) fiquem sem suporte ou com suporte em face sacrificável — ver [suportes](suportes-fff.md).
4. **Overhangs e pontes:** gire para transformar overhangs impossíveis em paredes ou bridges curtos.
5. **Warp / draft:** bases muito longas e contínuas em frame aberto pioram empenamento — ver [empenamento](../12-problemas-e-diagnostico/fff/empenamento.md) e [ambiente aberto](../10-processo-de-impressao/fff/ambiente-frame-aberto.md). Dividir base, chanfrar, ou rotacionar o eixo longo pode ajudar.
6. **Envelope e cinemática:** altura excessiva + mesa móvel (bed-slinger) aumenta inércia e tempo; confirme caber com brim — [cinemática bed-slinger](../03-maquinas-e-arquiteturas/cinematica-bed-slinger.md).

## Trade-offs típicos

| Priorizar | Orientação tende a… | Custo |
|---|---|---|
| Resistência a tração | Camadas paralelas à carga | Pode aumentar suporte |
| Cosmético da face superior | Face A para cima / sem suporte | Base pode precisar brim |
| Mínimo suporte | “Deitar” overhangs | Anisotropia ruim ou face ruim na mesa |
| Adesão fácil | Face plana grande na PEI | Warp em retângulos longos |
| Tempo | Menor altura Z | Mais área XY / risco de colisão multi-peça |

## Checklist no Bambu Studio

1. Arrange / Rotate com objetivo escrito (1 frase).
2. Preview de first layer: ilhas mínimas? Contato suficiente?
3. Preview de supports: cicatrizes em face crítica?
4. Brim necessário? Cabe no volume 180³ com margem?
5. Material: PLA (cooling alto OK em overhangs) vs PETG (mais cuidadoso com cooling/warp).

## O que não fazer

- Assumir resistência isotrópica “como injeção”.
- Orientar só pelo que “fica bonito no slicer” ignorando carga.
- Copiar orientação de SLA/resina (regras diferentes de suporte e anisotropia).

## Validação

- Cupom de tração/flexão na orientação candidata quando a peça for estrutural.
- Um print de seção crítica antes do lote.
- Se falhar na camada 1 → não culpe orientação antes de adesão/PEI ([falha de adesão](../12-problemas-e-diagnostico/fff/falha-adesao-primeira-camada.md)).

## Relações

- trades-off-with → [suportes FFF](suportes-fff.md)
- constrains → [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md)
- influences → warping, first layer, cooling

## Fontes

- Capabilities de envelope/máquina: [source.bambu-a1-mini-tech-specs](../22-fontes/bambu-a1-mini-tech-specs.md)
- Heurísticas de overhang/suporte: prática DfAM FFF + preview; números de ângulo são contextuais

## Lacunas

- Tabela de ângulos por material/cooling medida no projeto
- Átomo de “split for print” / montagem
- Orientação multi-material / AMS
