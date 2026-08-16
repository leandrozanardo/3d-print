---
id: setting.resin-exposure-supports
title: Resina — exposição e suportes (settings)
summary: 'Em MSLA/SLA/DLP, tempo de exposição, camadas de base, altura de camada e
  estratégia de suporte (tips, densidade, ângulo) controlam aderência à plataforma,
  falha de peel e cicatrizes. Valores numéricos vêm do fabricante da resina + calibrador
  da impressora — esta página explica mecanismos e ordem de ajuste, sem tabela universal.
  Segurança: resina não curada e FEP danificado são riscos; não transfira settings
  FFF.'
doc_type: setting
domain:
- slicers
- resin
technology:
- vat-photopolymerization
process:
- sla
- dlp
- msla
applies_to:
- vat-photopolymerization
not_for:
- fff-support-settings
- copy-exposure-between-brands
knowledge_status: draft
evidence_status: mixed
safety_level: high
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.niosh-am-entry
related:
- tech.sla-dlp-msla
- material.resin-families
- post.resin-wash-cure
- defect.resin.index
- hazard.resin-ppe-disposal
prerequisites:
- tech.sla-dlp-msla
- hazard.resin-ppe-disposal
supersedes: []
aliases_pt_br:
- tempo de exposição resina
- suportes MSLA
- camadas de base
aliases_en:
- resin exposure time
- MSLA supports
- burn-in layers
tags:
- settings
- resin
- exposure
- supports
---
# Resina — exposição e suportes

Hub pai: [Slicers e configurações](INDEX.md)

## Conceito

**Exposição:** energia entregue por camada (tempo × irradiância efetiva × espectro).
**Suportes:** âncoras que resistem ao peel do filme e sustentam overhangs em vat.

## Nomes típicos em slicers resin

| Conceito semântico | Nomes comuns (UI) |
|---|---|
| Exposição de camada | Exposure time, layer exposure |
| Exposição de base | Bottom/burn-in exposure |
| Contagem de base | Bottom layer count |
| Altura de camada | Layer height / thickness |
| Lift | Lift distance, lift speed |
| Suporte | Support density, tip diameter, contact depth |

Paths exatos variam por Chitubox, Lychee, UVTools, etc. — verificar versão.

## Mecanismo

1. Subexposição → falha de adesão entre camadas / features fracas / falha ao desprender malformada
2. Superexposição → sangramento de detalhe, aderência excessiva ao FEP, peça “gorducha”
3. Base fraca → print descola da plataforma
4. Tips grossos → cicatriz; tips finos demais → falha de suporte

## Ordem de calibração (método)

1. Confirmar SDS/PPE e resina homogeneizada (sem bolhas excessivas)
2. Usar **matriz de exposição** do fabricante / calibrador da máquina (não número de fórum aleatório)
3. Fixar layer height; achar exposição de camada
4. Ajustar bottom exposure/count até raft estável **sem** soldar no FEP
5. Tipar suportes: ângulo da peça → menos suporte em faces hero
6. Validar com cupom de detalhe + cupom de buracos

Uma variável por vez. Índice de falhas: [resina](../12-problemas-e-diagnostico/resina/indice-falhas-resina.md).

## Suportes — heurísticas (não números universais)

- Preferir ângulos que reduzam área de peel brusca
- Tips menores em rostos; reforçar em bases pesadas
- Evitar suporte dentro de furos dimensionais quando possível
- Remoção: após lavagem parcial ou conforme fluxo — ver [lavagem/cura](../14-pos-processamento/lavagem-e-pos-cura-resina.md)

## ↑ / ↓ efeitos (qualitativo)

| Se ↑ exposição | Efeito típico |
|---|---|
| Tempo camada | Mais cura; risco de perder microdetalhe |
| Bottom | Mais grip na plataforma; risco FEP/print soldado |
| Densidade suporte | Mais estabilidade; mais pós e cicatriz |

## Segurança

- Não abrir tanque com luvas inadequadas
- FEP furado: risco de vazamento no LCD — parar
- [PPE](../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md); [NIOSH](../22-fontes/niosh-additive-manufacturing.md)

## Lacunas

- Presets por modelo de impressora resin: fora do inventário atual do repo
- Auto-calibration proprietária: seguir OEM
