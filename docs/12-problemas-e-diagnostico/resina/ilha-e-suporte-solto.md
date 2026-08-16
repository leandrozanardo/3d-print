---
id: "defect.resin.island-loose-support"
title: "Ilha e suporte solto"
summary: "Falha atômica em vat: volumes desconectados (ilhas), overhangs sem caminho de carga até a plataforma, ou tips de suporte que arrancam da peça/raft. Sintomas: pedaços no fundo do tanque, features faltando, cicatriz de tip sem corpo, peça ‘pendurada’ incompleta. Mecanismos: tipagem insuficiente, ângulo ruim, contact depth baixo, peel alto, subexposição local. Diferencie de falha total de base (nada na placa) e de cupping/sucção. PPE obrigatório ao filtrar resina."
doc_type: "troubleshooting"
domain: ["troubleshooting", "resin"]
technology: ["vat-photopolymerization"]
process: ["sla", "dlp", "msla"]
applies_to: ["vat-photopolymerization"]
not_for: ["fff-tree-supports-as-identical", "copy-support-density-universals"]
symptoms: ["symptom.island-failure", "symptom.support-tear", "symptom.missing-feature-mid-print"]
causes: ["cause.weak-tips", "cause.bad-orientation", "cause.unsupported-island", "cause.high-peel", "cause.local-underexposure"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.niosh-am-entry"]
related: ["defect.resin.index", "defect.resin.nothing-on-plate", "defect.resin.suction-delamination", "defect.resin.over-under-exposure", "setting.resin-exposure-supports", "hazard.resin-ppe-disposal"]
prerequisites: ["hazard.resin-ppe-disposal", "setting.resin-exposure-supports"]
supersedes: []
aliases_pt_br: ["ilha impressão resina", "suporte arrancado", "tip falhou", "feature caiu no tanque"]
aliases_en: ["resin island failure", "loose support", "torn support tip", "unsupported island"]
tags: ["troubleshooting", "resin", "supports", "islands"]
---

# Ilha e suporte solto

Hub pai: [Problemas — resina](INDEX.md) · [Índice de falhas](indice-falhas-resina.md)

## Resumo de emergência

1. PPE antes de filtrar pedaços do tanque: [PPE](../../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md)
2. Filtrar resina se houver fragmentos (evita riscos no filme/LCD)
3. Não “só aumentar densidade de suporte” às cegas se a orientação cria ilhas inevitáveis
4. Se a base também falhou → trate [nada na placa](nada-na-placa.md) primeiro

## Assinatura

- Visual: feature incompleta; pedaço curado no fundo; tip arrancado deixando craterinha; raft OK mas “torre” de suporte quebrada
- Momento: frequentemente após início de overhang / ilha desconectada no slice
- Áudio: geralmente silencioso; falha aparece no unload

## Tecnologias afetadas

Vat photopolymerization com peel cíclico. Ilhas são problema de **grafo de suporte no slice**, não de “extrusão”.

## Diferenciar

| Parece suporte solto mas… | Vá para |
|---|---|
| Nada grudou na plataforma | [nada na placa](nada-na-placa.md) |
| Camadas “vazias” em cavidades fechadas | [sucção e delaminação](succao-e-delaminacao.md) |
| Detalhe derretido / tips soldando demais | [over/under exposure](over-under-exposure.md) |
| Só cicatriz estética com peça íntegra | tipagem excessiva / contact — pós, não falha estrutural |

## Riscos e parada

- Fragmentos no tanque → dano ao filme
- Forçar remoção de tip em peça verde sem PPE
- Reimprimir o mesmo STL sem reorientar após falha de ilha óbvia

## Cause matrix (ordenada)

| Plausibilidade | Causa | Por quê |
|---|---|---|
| Alta | Ilha sem suporte no preview do slicer | Volume sem caminho até raft/plataforma |
| Alta | Tips finos / contact depth baixo sob carga de peel | Arranca na interface tip–peça |
| Alta | Orientação com overhang abrupto em face crítica | Pico de força de peel + alavanca |
| Média | Densidade/raft de suporte insuficiente sob massa | Colapso progressivo |
| Média | Subexposição → tip “cura” frágil | Quebra mesmo tipado |
| Baixa-primeira | “Slicer bug” genérico | Só após validar preview de suporte e exposição |

## Árvore de decisão

```text
Raft/base na plataforma?
  ├─ NÃO → defect.resin.nothing-on-plate
  └─ SIM → feature faltando / pedaço no tanque?
        ├─ Preview mostra ilha vermelha/sem suporte? → tipar ou bridge/orientar
        ├─ Tips presentes mas cicatriz de arrancamento? → ↑ contact / tip count local; ↓ peel se possível
        ├─ Quebra no meio da haste do suporte? → reforçar medium/heavy; reduzir alavanca (ângulo)
        └─ Falha em “copo”/cavidade? → avaliar sucção (página dedicada) além de suporte
```

## Testes (barato → caro)

1. Revisar **preview de suporte** camada a camada (ilhas destacadas)
2. Reorientar para reduzir overhang em faces importantes
3. Adicionar tips manuais nos pontos de falha (não só slider global)
4. Aumentar contact depth / tip diameter **localmente** em bases pesadas
5. Validar exposição com cupom (tips fracos por subcura)
6. Ajustar lift se peel for agressivo demais para a geometria

## Ações corretivas por causa

| Causa confirmada | Ação | Não faça junto |
|---|---|---|
| Ilha no slice | Suporte manual / reorientar / dividir peça | Só ↑ exposição |
| Tip fraco | ↑ contact / mais tips no ponto | Tips enormes em face hero |
| Ângulo ruim | Rotacionar; esconder cicatrizes | Densidade máxima global |
| Subcura | Matriz de exposição | Compensar só com suporte |
| Peel alto | Lift mais suave / menos área de peel brusca | Ignorar orientação |

## Heurísticas de tipagem (qualitativo — sem números universais)

- Preferir muitos tips pequenos em pele visível a poucos tips grossos (trade-off cicatriz vs estabilidade)
- Reforçar onde a massa “pendura” longe do raft
- Evitar tip dentro de furo dimensional se a tolerância importa
- Faces cosméticas: orientar para cima/longe do suporte quando o envelope permitir

Detalhe de settings: [exposição e suportes](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md).

## Validar correção

Reimprimir a **mesma** geometria com uma mudança dominante (orientação **ou** tipagem local). Confirmar ausência de fragmentos e integridade da feature. Registrar slicer/perfil de suporte.

## Prevenção

- Checklist de preview de ilhas antes de todo job longo
- Biblioteca mental de ângulos para famílias de peça (miniatura vs mecânico)
- Não reutilizar perfil de suporte de peça leve em peça maciça

## Relações com outros conceitos

- indicated-by → feature faltante + raft OK
- causes ← ilha, tip fraco, orientação, peel, subcura local
- mitigated-by → tipagem local + reorientação
- worsened-by → densidade global cega + over-exposure
- related-to → [sucção](succao-e-delaminacao.md) quando cavidade agrava peel

## Veja também

- [Índice de falhas — resina](indice-falhas-resina.md)
- [Lavagem e pós-cura](../../14-pos-processamento/lavagem-e-pos-cura-resina.md) (remoção de tip em peça verde)

## Fontes

- [NIOSH Additive Manufacturing](../../22-fontes/niosh-additive-manufacturing.md) (contexto de manuseio seguro)
- [setting.resin-exposure-supports](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md)
- Densidades/diámetros: **TDS + perfil da máquina** — não tabelados como universais aqui

## Lacunas

- Galeria de tip scars vs tear-out
- Regras por família de resina (tough vs standard) ainda qualitativas
