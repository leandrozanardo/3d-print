---
id: "format.units-scale-manifold"
title: "Unidades, escala e manifold"
summary: "Falhas clássicas de importação: modelo 25× maior/menor (polegada vs mm), envelope fora da mesa, e malha non-manifold que o slicer interpreta como volume inválido. Manifold (fechada, orientável, sem bordas livres problemáticas) é pré-condição de fatiamento confiável — não de food-safe. Sempre validar unidades e bounding box no slicer antes de jobs longos. Esta página não inventa fatores de escala ‘mágicos’; mede no software e compara com a intenção."
doc_type: "guide"
domain: ["models", "formats", "meshes"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "mesh-import", "bambu-studio"]
not_for: ["assume-mm-without-check", "manifold-equals-watertight-product"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.bambu-a1-mini-tech-specs"]
related: ["format.stl-vs-3mf", "format.mesh-repair", "printer.bambu-lab-a1-mini", "fund.digital-workflow"]
prerequisites: ["format.stl-vs-3mf"]
supersedes: []
aliases_pt_br: ["escala errada STL", "unidades mm polegadas", "malha manifold"]
aliases_en: ["mesh units", "scale factor", "manifold mesh"]
tags: ["units", "scale", "manifold", "mesh"]
---

# Unidades, escala e manifold

Hub pai: [Modelos, formatos e malhas](INDEX.md)

## O que é

- **Unidades:** o sistema de medida embutido (ou *assumido*) no arquivo. STL clássico **não carrega unidade confiável**; o CAD e o slicer precisam concordar (quase sempre **mm** em FFF desktop).
- **Escala:** fator aplicado na importação. Erro típico: modelo desenhado em polegadas interpretado como mm (ou o inverso) → peça ~25,4× errada.
- **Manifold (heurística prática):** superfície que o fatiador consegue tratar como sólido coerente — fechada o bastante, normals consistentes, sem não-manifold crítico. Definições matemáticas variam; o critério operacional é “preview e volume fazem sentido”.

## Quando importa

- Import de marketplace / scan
- Mistura de CAD com unidades diferentes
- Peça “cabe na tela” mas o slicer mostra envelope absurdo
- A1 Mini: volume de build oficial **180 × 180 × 180 mm** ([tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)) — sem margem para brim/purge ainda

## Checklist rápido (antes do slice)

1. Abrir no slicer com placa/máquina corretas ([A1 Mini](../21-impressoras/bambu-lab-a1-mini.md))
2. Ler **bounding box** (X/Y/Z) e comparar com a intenção do projeto
3. Se a peça for minúscula ou gigantesca: **parar** — investigar unidades, não “só escalar no feeling”
4. Confirmar que walls/volumes no preview não são cascas invertidas
5. Se erros de malha: [reparo](reparo-de-malha.md)

## Manifold — o que significa na prática

| Estado | Risco |
|---|---|
| Fechada / utilizável | Slice previsível |
| Buracos / bordas livres | Furos no toolpath, volume errado |
| Não-manifold (arestas com >2 faces, etc.) | Comportamento indefinido no slicer |
| Shells internos invertidos | “Ar” sólido / suporte errado |

**Não fato:** “manifold ⇒ estanque a líquido” ou “manifold ⇒ food-safe”.

## Escala — como decidir sem número mágico

- Compare uma feature conhecida (ex.: diâmetro de furo projetado) com a cota no slicer
- Se o arquivo veio de fonte em polegadas e o slicer está em mm, o fator **25,4** é conversão dimensional padrão — aplique só após confirmar a hipótese de unidade
- Não invente “escala 102%” para compensar encolhimento sem medição e escopo

## Envelope A1 Mini

Capability oficial: **180 × 180 × 180 mm**. Operacionalmente reserve margem para:

- brim / skirt
- torre de purge (AMS)
- folga de borda da placa

Se o modelo “quase” enche o cubo: reorientar, dividir ou reduzir — não force colisão.

## Segurança

Modelo fora de escala pode:

- Colidir com estrutura / clip / torre
- Gerar peça alta e instável ([peças altas e finas](../16-cenarios-e-playbooks/pecas-altas-e-finas.md))
- Falhar adesão e virar projétil de mesa

Pare impressão se houver impacto ou desprendimento.

## Aplicabilidade e exclusão

**Aplica-se a:** imports FFF nesta base.  
**Não se aplica a:** metrologia de peça acabada (ver qualidade/metrologia); conversão automática sem inspeção.

## Relações

- depends-on → inspeção visual + bounding box
- related-to → [STL vs 3MF](stl-vs-3mf.md), [reparo](reparo-de-malha.md)
- constrained-by → volume A1 Mini (fonte fabricante)

## Veja também

- [Workflow digital](../01-fundamentos/workflow-digital-cad-ate-peca.md)

## Fontes

- [Bambu A1 mini Technical Specifications](../22-fontes/bambu-a1-mini-tech-specs.md) — volume 180³ mm  
  https://bambulab.com/en/a1-mini/tech-specs
- Prática de importação FFF (unidades mm vs in)

## Lacunas

- Matriz de CAD → unidade embutida em 3MF por software: futura
- Definição formal “strict manifold” vs “slicer-acceptable”: documentar por ferramenta
