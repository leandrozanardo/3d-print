---
id: "meta.continuation"
title: "Continuação — estado da base"
summary: "Pós-Maintenance A: waves 0–11 + lote de manutenção (resina, pó, settings, formatos, segurança, cenários, fundamentos, mitos) publicados em draft. validate-wiki limpo. Próximo = Maintenance B (migração legado projeto/, pin Bambu Studio version, verified gates)."
doc_type: "continuation"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "per-batch"
related: ["meta.coverage", "meta.work-queue", "meta.gaps"]
tags: ["continuation"]
---

# Continuação

## Wave atual

**Pós-Maintenance A** — ciclo Waves 0–11 + Maintenance A concluídos.

## Batch concluído

**Maintenance A** (aprofundamento transversal sem stubs):

- Defeitos resina atômicos + grades PA12 / AlSi10Mg
- Settings: supports, brim/raft/skirt, flow/PA, seam
- Fontes Marlin + Klipper
- Formatos STL/3MF, reparo, manifold
- Manutenção A1 Mini; elétrico/fogo; IPA; annealing; vapor smoothing
- Cenários vasos/AMS/peças altas; ringing/Z-banding/pillowing
- Fundamentos calor/adesão/causa; input shaping; bed mesh
- Mitos enclosure/temp; quando não imprimir; food-contact limites
- DfAM overhangs/split; PVA/BVOH; resina standard vs tough

## Validações

`python -m core validate-wiki docs --json` → `{"ok": true, "errors": []}` (2026-08-15, pós-Maintenance A).

## Próximo batch (Maintenance B)

1. Migrar/deprecar páginas-chave de `docs/projeto/` com `supersedes` (sem delete)
2. Pin versão Bambu Studio nos paths de UI documentados
3. Glossário expandido + lint de IDs duplicados manual
4. Candidatos a `reviewed` na fatia A1 Mini/PLA/PETG/first-layer/warping
5. Atualizar cobertura

### Ler primeiro

1. Este arquivo
2. [cobertura.md](cobertura.md)
3. [lacunas.md](lacunas.md)
4. [AGENT_GUIDE.md](../AGENT_GUIDE.md)

## Blockers

- Delete de legado: proibido até confirmação
- `core/` validator front matter: fora de escopo até pedido

## Prompt curto

```text
Continue docs/ a partir de docs/_meta/continuacao.md — Maintenance B.
Não apague legado. Rode validate-wiki ao final.
```
