---
id: "meta.continuation"
title: "Continuação — estado da base"
summary: "Estado pós-Wave 11: fatia FFF + fatia pó/metal/consolidação publicadas em draft. Próximo batch = manutenção (vat deep, VOC FFF, settings, glossário, revalidar peers W1–9)."
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

**Pós-Wave 11** — consolidação concluída neste batch; entrar em **maintenance batch A**.

## Batch concluído

**Wave 10 / Powder-metal + Wave 11 / Consolidation**

### Wave 10 — arquivos principais

- `docs/02-tecnologias/powder-bed-fusion/` — INDEX, `sls-mjf-polimeros.md`, `lpbf-ebm-metais.md`
- `docs/02-tecnologias/binder-jetting/` — INDEX, `binder-jetting-metal-areia.md`
- `docs/02-tecnologias/directed-energy-deposition/` — INDEX, `ded-e-waam.md`
- `docs/02-tecnologias/material-jetting/INDEX.md` (hub enriched)
- `docs/02-tecnologias/sheet-lamination/INDEX.md` (hub enriched)
- `docs/05-materiais/po/` — INDEX + `feedstocks-polimeros-e-metais.md`
- `docs/12-problemas-e-diagnostico/po-metal/` — INDEX + `defeitos-pbf.md`
- `docs/14-pos-processamento/depowdering-e-pos-metal.md`
- `docs/15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md`

### Wave 11 — arquivos principais

- `docs/02-tecnologias/comparacao-entre-categorias.md`
- `docs/20-pesquisa-e-mitos/mito-pla-food-safe.md`
- `docs/20-pesquisa-e-mitos/mito-100-infill-mais-forte.md`
- `docs/18-aplicacoes-e-regulacao/limites-de-qualificacao.md`
- `docs/17-software-firmware-e-automacao/gcode-fundamentos.md`
- `docs/17-software-firmware-e-automacao/klipper-vs-marlin-conceitos.md`
- `docs/22-fontes/fda-am-medical-devices-guidance-entry.md`
- Fontes peer reutilizadas: `niosh-additive-manufacturing.md`, `epa-3d-printing-research.md` (duplicatas locais removidas)
- Meta: `cobertura.md`, `lacunas.md`, `fila-de-trabalho.md`, este arquivo
- Hubs INDEX atualizados (02, 05, 12, 14, 15, 17, 18, 20, 22) + `docs/INDEX.md` leve

## Arquivos modificados / movidos

- **Nenhum** delete de legado
- **Nada** fora de `docs/`

## Decisões / pressupostos

- Profundidade industrial AM = **parcial e honesta**; sem parâmetros de energia/shrink inventados
- Segurança de pó metálico = `critical`; garage DIY desencorajado explicitamente
- Sem internals proprietários Bambu em firmware

## Validações

`python -m core validate-wiki docs --json` → `{"ok": true, "errors": []}` (2026-08-15, pós-Waves 1–11).

## Próximo batch exato (Maintenance A)

1. Reconciliar matriz com entregas peer restantes (fundamentos, glossário, settings, economia)
2. Taxonomia defeitos resina + materiais fotopolímero atômicos
3. Grades de pó PA12 / uma liga metal como páginas atômicas
4. Settings catalog início (semântica, não dump de UI)
5. Pin `source.marlin-docs` / `source.klipper-docs`
6. Elétrico/fogo e annealing/vapor smoothing
7. Atualizar cobertura/continuação de novo

### Ler primeiro ao retomar

1. Este arquivo
2. [cobertura.md](cobertura.md)
3. [lacunas.md](lacunas.md)
4. [AGENT_GUIDE.md](../AGENT_GUIDE.md)
5. [hazard.metal-powder](../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md) se tocar pó

## Blockers

- Delete de legado: proibido até lista + confirmação
- Alterar `core/` validator: fora de escopo até pedido

## Prompt curto para retomar

```text
Continue a base docs/ a partir de docs/_meta/continuacao.md.
Execute Maintenance batch A (reconcile peers + resin defects + powder grades).
Não apague legado. Não commit. Rode validate-wiki ao final.
```
