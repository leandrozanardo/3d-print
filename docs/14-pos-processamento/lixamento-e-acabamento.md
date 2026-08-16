---
id: post.sanding-finishing
title: Lixamento e acabamento (FFF e geral seco)
summary: 'Lixamento remove marcas de camada e cicatrizes de suporte, mas gera pó —
  controle respiratório e combustível em pó fino. Progressão típica: grãos grossos
  → finos, a seco ou úmido conforme polímero/tinta. Não lixe resina não curada; para
  resina curada use PPE de pó e evite confusão com solvente de lavagem. Acabamento
  mecânico não torna a peça food-safe.'
doc_type: guide
domain:
- post-processing
technology:
- material-extrusion
- vat-photopolymerization
process:
- fff
applies_to:
- fff
- cosmetic-finishing
not_for:
- food-safe-by-sanding
- wet-sand-uncured-resin
- asbestos-era-habits
knowledge_status: draft
evidence_status: mixed
safety_level: high
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.niosh-am-entry
related:
- post.support-removal-fff
- post.painting
- post.resin-wash-cure
- hazard.voc-ufp-ventilation
- hazard.resin-ppe-disposal
prerequisites:
- post.support-removal-fff
supersedes: []
aliases_pt_br:
- lixar impressão 3D
- acabamento de superfície
- progressão de lixa
aliases_en:
- sanding 3D prints
- surface finishing
- wet sanding
tags:
- post-processing
- sanding
- finishing
---
# Lixamento e acabamento

Hub pai: [Pós-processamento](INDEX.md)

## O que é

Remoção progressiva de material superficial (lixa, limas, scrapers) para melhorar estética ou preparar primer/pintura.

## Quando importa

- Faces cosméticas após [remoção de suporte](remocao-de-suportes-fff.md)
- Preparação para [pintura e primer](pintura-e-primer.md)
- Ajuste fino de encaixe (cuidado: remove dimensão)

## Progressão típica (FFF — heurística)

1. Remover rebarbas grossas (lima / cutter)
2. Lixa grossa (ex.: P120–P240) só onde há degrau
3. Médios (P320–P600)
4. Finos antes de primer (P800+) se pintura exigir
5. Limpar pó **antes** de pintar

Números de grão são **partida**; ajuste ao material e à tinta. Não “pular” demais se o objetivo for pintura uniforme.

## Seco vs úmido

| Método | Prós | Contras / riscos |
|---|---|---|
| Seco | Rápido, simples | Pó no ar — máscara adequada, aspiração |
| Úmido (água) | Menos pó | Eletro/ferrugem de ferramentas; alguns plásticos mancham; não misturar com resina não curada |

## FFF: notas por material

- **PLA:** lixa bem; calor de fricção pode glazear — pressione leve
- **PETG:** mais “goma”; lixas entopem; limpe com frequência
- Evite solventes agressivos sem SDS (acetona em PLA é mito parcial / risco — não receitar aqui)

## Resina (vat)

- **Nunca** lixar peça pegajosa / não lavada / não pós-curada
- Após [lavagem e pós-cura](lavagem-e-pos-cura-resina.md): lixa gera pó de polímero curado — PPE e descarte conforme [resina PPE](../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md)
- Pó + solvente residual: risco composto

## Segurança (prioridade)

1. Proteção ocular
2. Proteção respiratória adequada ao pó (não “pano improvisado” como PPE)
3. Evitar jato de ar comprimido que aerosoliza
4. Não comer/beber na bancada de lixa
5. Referência ocupacional: [NIOSH AM](../22-fontes/niosh-additive-manufacturing.md)
6. Lixar **não** cria food-contact seguro ([claims](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md))

## Trade-offs

- Tempo vs qualidade de superfície
- Remoção de material vs tolerância ([encaixes](../06-design-para-impressao-3d/tolerancias-e-encaixes-fff.md))
- Às vezes reimprimir com melhor orientação/suporte vence horas de lixa

## Lacunas

- Guia de fillers/putty por química: wave futura
- Polimento com composto: não coberto
