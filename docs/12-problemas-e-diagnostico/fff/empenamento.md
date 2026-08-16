---
id: defect.fff.warping
title: Empenamento (warping) em FFF
summary: Empenamento (warping) é o levantamento de cantos ou bordas por contração
  térmica e tensões residuais depois que a peça já aderiu. Diferente de falha de adesão
  na camada 1. Em A1 Mini (frame aberto), PLA empen menos que PETG e geometrias de
  base larga; as alavancas principais são contato (brim), temperatura de mesa no range,
  cooling inicial baixo, bloqueio de corrente de ar e reorientação — raft é último
  recurso.
doc_type: troubleshooting
domain:
- fff
- quality
- troubleshooting
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
- first-layer-never-stuck
- layer-shift
materials:
- material.pla
- material.petg
printers:
- printer.bambu-lab-a1-mini
slicers:
- slicer.bambu-studio
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
related:
- process.fff.first-layer
- material.pla
- material.petg
- printer.bambu-lab-a1-mini
- defect.fff.layer-shift
- defect.fff.under-extrusion
- defect.fff.delamination
- defect.fff.elephant-foot
- troubleshoot.fff-symptom-index
prerequisites:
- process.fff.first-layer
aliases_pt_br:
- empenamento
- levantamento de canto
- warp
aliases_en:
- warping
- corner lift
- curl
tags:
- warping
- troubleshooting
- fff
supersedes: []
symptom_tags:
- corner-lift
- edge-peel-late
cause_tags:
- thermal-shrinkage
- draft
- insufficient-edge-anchor
setting_tags:
- brim
- bed-temperature
- part-cooling
---
# Empenamento (warping) em FFF

Hub pai: [Problemas e diagnóstico](../INDEX.md)

## Resumo de emergência

Cantos sobem **depois** de boa adesão inicial? Bloqueie corrente de ar, confirme bed no range (A1 Mini ≤ 80 °C ([tech specs A1 mini](../../22-fontes/bambu-a1-mini-tech-specs.md))), ative brim, reduza cooling nas primeiras camadas. Se **nunca** grudou na camada 1 → [primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) primeiro.

## Assinatura

- Visual: cantos/bordas curvando para cima; base parcialmente livre
- Momento: tipicamente após várias camadas
- Áudio: geralmente silencioso (diferente de skip de motor)

## Tecnologias afetadas

Principalmente FFF com polímeros que contraem ao resfriar. Intensidade depende de material, geometria, bed, cooling e enclosure.

## Diferenciar

| Parece warp mas… | Vá para |
|---|---|
| Falhou na camada 1 | [primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) |
| Deslocamento em degrau XY | [layer shift](layer-shift.md) |
| Gaps nas paredes | [subextrusão](subextrusao.md) |
| Camadas abrindo (solda Z) | [delaminação](delaminacao.md) |
| Base só gorda | [elephant foot](elephant-foot.md) |
| Índice rápido | [índice por sintoma](indice-por-sintoma.md) |

## Riscos e parada

- Peça solta pode ser atingida pelo nozzle → **blob of death** / danos
- Se a peça descolou e o head está batendo: **interrompa**

## Cause matrix (ordenada por contexto A1 Mini aberto)

| Plausibilidade | Causa | Por quê |
|---|---|---|
| Alta | Corrente de ar / resfriamento assimétrico | Sem enclosure nativo |
| Alta | Base larga contínua + contração | Caminho longo de shrink |
| Alta (PETG) | Bed frio demais / filamento úmido | Adesão de borda insuficiente |
| Média | Cooling alto cedo demais | Choque térmico |
| Média | Contato de borda insuficiente | Falta brim / mouse ears |
| Baixa-primeira | “Material ruim” genérico | Só após esgotar processo |

## Árvore de decisão

```text
Camada 1 grudou com squish OK?
  ├─ NÃO → process.fff.first-layer
  └─ SIM → cantos sobem depois?
        ├─ Há draft/AC na mesa? → bloquear fluxo de ar
        ├─ Base longa contínua? → brim + reorientar eixo longo + ↓ fan inicial
        └─ PETG? → seco? bed 70–80 °C (≤80 — heurística editorial (sem fonte pinada) para faixa PETG) + brim + fan moderado
Raft somente se brim falhou em duas tentativas controladas.
```

## Testes (barato → caro)

1. Foto da first layer (já estava OK?)
2. Bloquear draft (sem mudar slicer)
3. Brim 5–10 mm (partida operacional do legado) — validar gap
4. Ajustar bed dentro do range (uma variável)
5. Reduzir early-layer fan
6. Reorientar / dividir geometria
7. Raft (último recurso)

## Ações corretivas por causa

| Causa confirmada | Ação | Não faça junto |
|---|---|---|
| Draft | Defletor / mudar posição | Subir temp sem medir |
| Âncora fraca | Brim | Raft imediato |
| PETG bed baixo | ↑ bed até ≤80 °C ([tech specs A1 mini](../../22-fontes/bambu-a1-mini-tech-specs.md)) | Ultrapassar capability |
| Cooling cedo | ↓ fan inicial | Max fan + max speed |
| Geometria | Reorientar | Mudar material na mesma hora |

## PLA vs PETG

| Alavanca | PLA | PETG |
|---|---|---|
| Sensibilidade | menor | maior |
| Bed | ~55–65 ordem | 70–80 (cap 80) |
| Early fan | pode subir antes | manter baixo por mais tempo |
| Enclosure | raro | útil, não obrigatório se draft controlado |

## Validar correção

Reimprimir o mesmo cupom/peça com **uma** mudança principal. Registrar bed/fan/brim/ambiente.

## Prevenção

- Evitar flat enorme sem quebras de seção quando possível
- Checklist de draft na A1 Mini
- Secar PETG
- Margem de brim no envelope 180³

## Relações com outros conceitos

- indicated-by → corner lift tardio
- causes ← contração térmica + âncora insuficiente + draft
- diagnosed-by → árvore acima + first-layer check
- mitigated-by → brim, bed, ↓ early cooling
- fixed-by → remoção da causa dominante
- worsened-by → AC direto, bed frio, early fan alto
- depends-on → [primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) OK
- applies-to → [A1 Mini](../../21-impressoras/bambu-lab-a1-mini.md), [PLA](../../05-materiais/fff/pla.md), [PETG](../../05-materiais/fff/petg.md)

## Veja também

- [Índice por sintoma](indice-por-sintoma.md)
- [Cooling](../../08-slicers-e-configuracoes/settings/cooling.md) · [Temperaturas](../../08-slicers-e-configuracoes/settings/temperaturas.md)
- Legado: [warping.md](../../projeto/troubleshooting/warping.md)
- [brim-raft-saia](../../projeto/fatiamento/brim-raft-saia.md)
- [Playbook vertical](../../16-cenarios-e-playbooks/a1-mini-pla-petg-primeira-camada-empenamento.md)

## Fontes

- Mecanismo físico: contração térmica / tensões (princípio; não número inventado)
- Capability bed: [tech specs A1 mini](../../22-fontes/bambu-a1-mini-tech-specs.md)
- Heurísticas operacionais: legado [warping.md](../../projeto/troubleshooting/warping.md) (EN; a migrar)
- Taxonomias comunitárias (Prusa KB / fóruns) → apenas hipótese; não hard safety

## Lacunas

- Página de enclosure improvisado e riscos de temperatura de componentes
- Dados experimentais locais com cupom padronizado
- Separar warp de “mesa empenada / mesh ruim” com testes discriminantes dedicados
