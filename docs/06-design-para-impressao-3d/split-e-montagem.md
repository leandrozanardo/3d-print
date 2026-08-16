---
id: "design.split-assembly"
title: "Split e montagem (DfAM FFF)"
summary: "Dividir (split) uma peça em partes imprimíveis melhora orientação, reduz suporte, cabe no envelope e alinha carga às paredes — ao custo de juntas, tolerâncias e montagem. Escolha plano de corte, features de alinhamento (pinos, meias-madeiras, parafusos) e folgas experimentais. Não use split para contornar claims regulatórios."
doc_type: "design"
domain: ["dfam", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "printer.bambu-lab-a1-mini"]
not_for: ["regulated-assembly-without-qualification", "zero-tolerance-fits-without-coupons"]
printers: ["printer.bambu-lab-a1-mini"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.bambu-a1-mini-tech-specs", "source.ellis-print-tuning-guide"]
related: ["design.orientation-fff", "design.tolerances-fff", "design.overhangs-self-supporting", "design.holes-threads-inserts", "design.strength-anisotropy", "hub.dfam"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["dividir peça FFF", "split para impressão", "montagem multipart"]
aliases_en: ["part split DfAM", "multi-part print assembly", "print then assemble"]
tags: ["dfam", "split", "assembly", "fff"]
---

# Split e montagem (DfAM FFF)

Hub pai: [Design para impressão 3D](INDEX.md)

## O que é

**Split** — cortar o modelo em dois ou mais corpos para imprimir separado e **montar** depois (encaixe, parafuso, cola, solda plástica, inserts).

Objetivo: tornar cada corpo **bom de imprimir** (orientação, suporte, envelope, anisotropia), não apenas “caber na mesa”.

## Quando split ajuda

| Motivo | Exemplo de ganho |
|---|---|
| Envelope | Peça maior que 180³ mm na [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md) |
| Overhangs | Elimina suporte em face cosmética — [overhangs](overhangs-e-angulos-autofportantes.md) |
| Anisotropia | Cada metade alinha carga a XY — [resistência](resistencia-e-anisotropia.md) |
| Warp | Bases longas viram segmentos |
| Material misto | Corpos com requisitos diferentes (raro; complica processo) |

## Quando não splitar

- Peça regulada / food-contact / safety-critical sem projeto de junta qualificado
- Junta na zona de máxima tensão sem engenharia
- Tolerância impossível sem cupom — ver [tolerâncias](tolerancias-e-encaixes-fff.md)
- Só para “usar mais de uma cor” sem plano de alinhamento

## Padrões de junta (conceituais)

1. **Face plana + cola** — simples; alinhamento pobre sem features
2. **Pinos / furos** — alinhamento; folga via cupom
3. **Meia-madeira / tongue** — área de cola e anti-rotação
4. **Parafuso + insert** — serviço e desmontagem — [furos/roscas](features-furos-roscas-inserts.md)
5. **Encaixe elástico (clip)** — depende de orientação e material (PLA frágil em clip fino)

Não publique folgas “universais”: meça no seu perfil com nozzle 0,4 mm (capability/contexto A1 Mini — fonte: tech specs Bambu; validar no cupom).

## Ordem de decisão

1. Dá para resolver só com [orientação](orientacao-fff.md)?
2. Se split: desenhe o **plano de corte** longe de cantos vivos carregados
3. Adicione features de alinhamento **antes** de fatiar
4. Imprima cupom da junta
5. Defina processo de cola/parafuso e inspeção

## Custos escondidos

- Tempo de montagem e falha de alinhamento
- Cosmético na linha de junta
- Colas/solventes → VOC e SDS
- Perda de estanqueidade (se a peça “deveria” ser monolítica)

## Relação com economia

Às vezes comprar peça pronta vence split complexo — [quando não imprimir](../19-economia-e-sustentabilidade/quando-nao-imprimir-3d.md).

## Lacunas

- Biblioteca de juntas com folgas medidas no projeto: aberta
- Solda por fricção/acetona em ABS: fora do foco A1 Mini Ideal materials
