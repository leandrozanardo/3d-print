---
id: "setting.infill"
title: "Preenchimento (infill)"
summary: "Infill é o padrão interno que preenche o volume entre as cascas. Densidade e padrão (grid, gyroid, cubic, lightning…) trocam peso, tempo, suporte a tops e rigidez. Conceito: núcleo estrutural/auxiliar, não substituto universal de walls. No Bambu Studio: Sparse infill density / pattern (nomes variam). Para peças cosméticas, densidades baixas bastam; para carga, combine com paredes — valide mecanicamente."
doc_type: "setting"
domain: ["slicing", "fff", "strength"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "slicer.bambu-studio"]
not_for: ["replacing-walls-for-strength", "eternal-ui-path-pinning"]
settings: ["setting.infill"]
slicers: ["slicer.bambu-studio"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: []
related: ["setting.walls-shells", "setting.speeds", "setting.cooling", "material.tpu"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["preenchimento", "infill", "densidade interna"]
aliases_en: ["infill", "sparse infill", "infill density", "infill pattern"]
tags: ["setting", "infill", "slicer"]
---

# Preenchimento (infill)

Hub pai: [Settings](INDEX.md)

## Conceito semântico

**Infill** = estrutura interna gerada pelo slicer dentro da casca. **Densidade** (%) e **padrão** definem quanto material e como ele se conecta. Infill também serve de **andaime** para solid tops.

## Nomes no Bambu Studio (notas)

Busque **Sparse infill density**, **Sparse infill pattern**, às vezes densidades distintas para internal solid. UI muda — conceito > path.

## Unidade / tipo

Percentual + enum de padrão. Velocidade de infill é setting correlato em [velocidades](velocidades.md).

## Mecanismo

Padrões 3D (gyroid, cubic…) distribuem material no volume; 2D (grid, lines) são mais simples e podem ser mais ruidosos/anisotropicos no plano. Densidade alta → mais tempo/peso; retornos decrescentes vs adicionar [walls](paredes-e-cascas.md).

## Dependências

- Espessura de top shell (infill baixo demais → teto furado)
- Overhang internos / bridging do padrão
- Material flexível: padrões que “respiram” (ex.: gyroid) muitas vezes preferidos — validar em [TPU](../../05-materiais/fff/tpu.md)
- Cooling em infill rápido pode afetar bonding

## Efeitos

| ↑ densidade | ↓ densidade / lightning |
|---|---|
| Mais rigidez/peso/tempo | Mais rápido; menos suporte a tops longos |
| Melhor para compressão local | Display / protótipo |

## Sintomas

- Pillowing / buracos no teto → dens↑ ou mais top layers
- Tempo absurdo sem ganho → dens↓ e walls↑ se for força
- Vibração/ruído em grid rápido → padrão ou speed

## Heurísticas de partida (validar)

| Uso | Ordem |
|---|---|
| Miniatura oca visual | 0–15% ou lightning |
| Geral | ~15% |
| Funcional leve | 15–30% + walls adequadas |
| Quase sólido | solid/near-100% só com motivo (peso/custo) |

## Relações com outros conceitos

- complements → walls/shells
- trades-off-with → tempo e filamento
- supports → top surfaces

## Veja também

- [Paredes e cascas](paredes-e-cascas.md)
- [Velocidades](velocidades.md)

## Fontes

- Prática FFF desktop (heurística)
- Presets Studio por propósito

## Lacunas

- Comparativo de padrões com cupom padronizado
- Infill para parafusos (expanding inserts) — playbook
