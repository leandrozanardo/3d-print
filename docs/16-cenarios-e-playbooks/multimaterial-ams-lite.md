---
id: "scenario.multimaterial-ams-lite"
title: "Playbook — multimaterial AMS Lite"
summary: "AMS Lite na A1 Mini habilita trocas de cor/material com custo de purge, tempo e sensibilidade a umidade/caminho. Use quando precisar de ≥2 cores ou troca automática; spool direto é mais simples para monoestrutural. AMS não seca filamento. Minimize swaps em faces detalhadas; comece com flush do Studio e ajuste só após observar marble vs desperdício. Falhas de load parecem subextrusão — diagnostique path primeiro."
doc_type: "scenario"
domain: ["scenarios", "fff", "hardware"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["printer.bambu-lab-a1-mini", "ams-lite", "multicolor"]
not_for: ["ams-as-dryer", "pla-petg-mix-without-reason", "flush-guessing-five-knobs"]
knowledge_status: "draft"
evidence_status: "manufacturer-specific"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "3-months"
sources: ["source.bambu-wiki-a1-mini", "source.bambu-a1-mini-tech-specs"]
related: ["printer.bambu-lab-a1-mini", "maint.a1-mini-preventive", "defect.fff.under-extrusion", "defect.fff.stringing", "material.drying-storage", "hub.cenarios"]
prerequisites: ["printer.bambu-lab-a1-mini", "material.drying-storage"]
supersedes: []
aliases_pt_br: ["AMS Lite playbook", "multicolor A1 Mini"]
aliases_en: ["AMS Lite multimaterial", "A1 mini multicolor"]
tags: ["playbook", "ams-lite", "multicolor"]
---

# Playbook — multimaterial AMS Lite

Hub pai: [Cenários](INDEX.md) · Máquina: [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md)

## Objetivo

Imprimir com **múltiplas cores/materiais** via AMS Lite com desperdício e risco sob controle.

## Perguntas mínimas

- Precisa mesmo de ≥2 filamentos, ou dá para pintar depois?
- Quantas trocas por peça? (cada swap custa purge + tempo)
- Todos os spools secos e compatíveis em temperatura?
- Envelope ainda cabe com torre de purge? (volume oficial 180³ mm)
- Há plano de manutenção de caminho?

## AMS Lite vs spool direto

```text
Precisa ≥2 cores ou troca automática?
  ├─ NÃO → spool direto (mais simples)
  └─ SIM → filamentos secos + tubos sem kink?
        ├─ NÃO → secar + corrigir path ([manutenção](../13-manutencao/a1-mini-rotina-preventiva.md))
        └─ SIM → AMS; flush inicial = default Studio
              ├─ Marble/sangramento? → ↑ flush com cuidado — validar
              ├─ Desperdício absurdo? → ↓ regiões de cor / swaps
              └─ Load fail? → path/grind/umidade — NÃO “flow ratio” primeiro
```

## Regras não negociáveis

1. **AMS não é dry box** — [secagem](../05-materiais/fff/secagem-e-armazenamento.md)
2. Evite PLA+PETG no mesmo job sem motivo forte (temp + purge sujo)
3. Minimize mudanças de cor em miniaturas/faces
4. Tubos assentados; após jam, limpe debris antes de retry storm
5. Flush: parta do preset; uma variável por vez
6. Após PETG no slot, purge longo antes de PLA cosmético

## Arquitetura — implicações

| Fator | Efeito |
|---|---|
| Caminho longo | Mais atrito; úmido/soft grinda fácil |
| Ciclos tip/cut | Falha de load mascara subextrusão |
| Flush/purge | Plástico + tempo; marble se baixo demais |
| Slots abertos | Umidade ao longo dos dias |
| Prime tower | Estabiliza pressão entre trocas |

## Checklist pré

- [ ] Spools secos o bastante para o material
- [ ] Mapa de cores com poucos swaps
- [ ] Torre/purge dentro do envelope
- [ ] Perfil de máquina/nozzle corretos
- [ ] Cupom multicolor curto se job longo

## Sinais de falha

| Sintoma | Hipótese AMS | Próximo passo |
|---|---|---|
| Load/unload fail | Kink, dust, filament soft | Path + secar + limpar engrenagem |
| Gaps mid-print | Feed parcial / grind | Inspecionar extruder; depois [subextrusão](../12-problemas-e-diagnostico/fff/subextrusao.md) |
| Marble de cor | Flush baixo | Aumentar flush; ordem claro→escuro |
| Ninho de strings nas trocas | Umidade / temp / retract | Secar; [stringing](../12-problemas-e-diagnostico/fff/stringing.md) |
| Desperdício enorme | Swaps demais | Redesign de regiões |

## Segurança

- Purge gera desperdício — descarte consciente ([economia](../19-economia-e-sustentabilidade/custo-e-desperdicio-fff.md) quando aplicável)
- Jobs longos multicolor: supervisione início — [desacompanhada](../15-seguranca-e-meio-ambiente/eletrico-fogo-e-impressao-desacompanhada.md)
- Emissões: [NIOSH](../22-fontes/niosh-additive-manufacturing.md) · [EPA](../22-fontes/epa-3d-printing-research.md)

## Fontes

- [Bambu Wiki A1 mini](../22-fontes/bambu-wiki-a1-mini.md) — primeiro print AMS lite / manuais  
  https://wiki.bambulab.com/en/a1-mini/manual
- [Tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)
- Legado: [a1-mini-ams-lite.md](../projeto/hardware/a1-mini-ams-lite.md)

## Lacunas

- Valores numéricos de flush multiplier “ótimos”: só após observação local — não fixados aqui
- Filamento support PVA via AMS: playbook futuro
