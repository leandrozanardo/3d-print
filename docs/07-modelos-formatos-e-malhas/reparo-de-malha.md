---
id: format.mesh-repair
title: Reparo de malha
summary: Malhas de marketplace/scan/CAD frequentemente chegam com buracos, normals
  invertidas, não-manifold, shells soltos ou autointerseções. Reparo restaura fechamento
  e topologia mínima para o slicer gerar toolpath confiável — não melhora automaticamente
  o design nem garante estanqueidade ou food-safe. Preferir inspecionar → reparar
  → revalidar envelope/unidades → só então fatiar. Números de tolerância de software
  variam; use a ferramenta documentada do projeto e valide o preview.
doc_type: guide
domain:
- models
- formats
- meshes
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- mesh-pipeline
- stl-repair
not_for:
- cosmetic-sculpt-as-repair
- claim-watertight-equals-food-safe
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources: []
related:
- format.stl-vs-3mf
- format.units-scale-manifold
- fund.digital-workflow
- hub.modelos
prerequisites:
- format.stl-vs-3mf
supersedes: []
aliases_pt_br:
- reparar STL
- malha quebrada
- fix mesh
aliases_en:
- mesh repair
- fix STL
- non-manifold repair
tags:
- mesh
- repair
- stl
- manifold
---
# Reparo de malha

Hub pai: [Modelos, formatos e malhas](INDEX.md)

## O que é

**Reparo de malha** é o conjunto de operações que tentam tornar uma superfície triangular **fechada o suficiente** e **topologicamente utilizável** para fatiamento: fechar buracos, unificar normals, remover degenerados, tratar não-manifold e shells órfãos.

Não é:

- “Otimização estética” automática
- Garantia de peça estruturalmente correta
- Certificação food/medical ([claims](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md))

## Quando importa

- Download de STL/3MF de terceiros
- Scan / fotogrametria
- Boolean mal feito no CAD
- Slicer reporta erros, vazios absurdos, volume negativo, “non-manifold”
- Jobs longos (falha mid-print desperdiça tempo/material)

## Sinais de malha problemática

| Sintoma no slicer / inspeção | Hipótese comum |
|---|---|
| Preview com furos / faces faltando | Buracos / normals |
| Volume zero ou absurdo | Unidades / escala / sólidos abertos |
| Suporte “dentro” de volume sólido | Shells invertidos / interiors |
| Fatiamento incompleto | Não-manifold / autointerseção |
| Peça “fantasma” duplicada | Shells sobrepostos |

## Procedimento recomendado (ordem)

```text
1 Inspecionar (ferramenta do projeto / slicer) — registrar erros
2 Confirmar unidades e envelope ([unidades](unidades-escala-manifold.md))
3 Reparar com ferramenta documentada do pipeline (ex.: `repair-mesh` no legado operacional)
4 Reinspecionar — erros restantes?
5 Abrir no slicer — preview de paredes/volumes faz sentido?
6 Só então slice e job longo
```

**Uma mudança por vez** quando estiver diagnosticando falha de impressão vs falha de malha.

## O que o reparo pode e não pode

| Pode (heurística) | Não pode afirmar |
|---|---|
| Fechar pequenos buracos | “Modelo agora é perfeito” |
| Corrigir normals inconsistentes | Espessura mínima de design |
| Remover faces degeneradas | Que a peça não vaze líquido |
| Melhorar chance de slice estável | Conformidade dimensional crítica sem metrologia |

## Trade-offs

- Reparo agressivo **altera geometria** (pode arredondar, fechar cavidades intencionais, fundir shells)
- Remesh / remoção de self-intersections pode destruir detalhe fino de miniaturas
- Preferir voltar ao CAD quando a falha for de modelagem, não só de export

## Segurança

- Malha inválida → risco de falha mecânica na impressora (peça solta, blob, colisão). Pare se houver impacto.
- Não confundir “watertight mesh” com utensílio alimentar — ver [vasos](../16-cenarios-e-playbooks/vasos-e-recipientes.md) e claims food-contact.

## Aplicabilidade e exclusão

**Aplica-se a:** malhas FFF no pipeline desta base.
**Não se aplica a:** reparo de arquivos STEP/B-rep; “cura” de G-code; garantia de manifold após qualquer conversão online anônima.

## Relações

- precedes → orientação e slice
- depends-on → [STL vs 3MF](stl-vs-3mf.md), [unidades/manifold](unidades-escala-manifold.md)
- related-to → [workflow digital](../01-fundamentos/workflow-digital-cad-ate-peca.md)

## Veja também

- Legado: [workflow/otimizar-modelo](../projeto/workflow/otimizar-modelo.md), comandos `inspect-mesh` / `repair-mesh` no fluxo do projeto

## Fontes

- Prática operacional do pipeline deste repositório
- Conceitos de malha manifold / non-manifold (literatura CAD/mesh) — sem números de tolerância inventados aqui

## Lacunas

- Tabela de códigos de erro por ferramenta de reparo: futura
- Limites quantitativos de “buraco grande demais para auto-repair”: depende do software — documentar por ferramenta quando estabilizar
