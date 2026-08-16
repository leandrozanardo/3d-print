---
id: "defect.resin.nothing-on-plate"
title: "Nada na placa (raft no FEP / falha total de aderência)"
summary: "Falha atômica em vat: ao final do job (ou cedo no Z) a plataforma sobe limpa ou só com restos, enquanto o raft/peça ficou no filme (FEP/nFEP) ou não se formou. Mecanismos dominantes: bottom exposure insuficiente, nivelamento ruim, filme danificado/sujo, lift inadequado, resina fria/homogeneização ruim ou LCD/máscara comprometidos. Diferencie de peça incompleta com raft ainda na plataforma. PPE e SDS antes de qualquer inspeção."
doc_type: "troubleshooting"
domain: ["troubleshooting", "resin"]
technology: ["vat-photopolymerization"]
process: ["sla", "dlp", "msla"]
applies_to: ["vat-photopolymerization"]
not_for: ["fff-first-layer-adhesion", "copy-forum-exposure-times"]
symptoms: ["symptom.empty-build-plate", "symptom.raft-stuck-on-fep"]
causes: ["cause.low-bottom-exposure", "cause.leveling", "cause.film-condition", "cause.lift-profile", "cause.cold-resin"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.niosh-am-entry"]
related: ["defect.resin.index", "defect.resin.over-under-exposure", "defect.resin.suction-delamination", "setting.resin-exposure-supports", "hazard.resin-ppe-disposal", "tech.sla-dlp-msla"]
prerequisites: ["hazard.resin-ppe-disposal", "tech.sla-dlp-msla"]
supersedes: []
aliases_pt_br: ["nada na plataforma", "print no FEP", "falha total MSLA", "raft ficou no filme"]
aliases_en: ["nothing on the plate", "print stuck to FEP", "failed adhesion MSLA", "empty build plate"]
tags: ["troubleshooting", "resin", "adhesion", "FEP"]
---

# Nada na placa (raft no FEP / falha total de aderência)

Hub pai: [Problemas — resina](INDEX.md) · [Índice de falhas](indice-falhas-resina.md)

## Resumo de emergência

1. **PPE** antes de abrir o tanque: [resina PPE e descarte](../../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md)
2. Se houver **resina sob o tanque / LCD molhado**: pare, siga procedimento OEM — não ligue nem force
3. Não arranque peça soldada no filme com ferramentas metálicas sobre o LCD
4. Classifique: plataforma vazia **com** raft no FEP vs **sem** cura aparente vs raft na plataforma mas peça faltando (outro defeito)

## Assinatura

| Sinal | Leitura |
|---|---|
| Plataforma limpa + filme com “pele”/raft | Aderência de base falhou no peel (bottom/level/film/lift) |
| Plataforma e filme sem peça | Subcura extrema, LCD/máscara, resina errada/comprimento de onda, ou job cancelado cedo |
| Só cantos do raft na plataforma | Nivelamento ou bottom no limiar |
| Momento | Frequentemente nas camadas de base / primeiros mm de Z |

## Tecnologias afetadas

SLA/DLP/MSLA com filme de peel (FEP/nFEP e variantes). Máquinas com membrane/PDM mudam o peel, mas a lógica “base fraca vs filme” permanece.

## Diferenciar

| Parece “nada na placa” mas… | Vá para |
|---|---|
| Raft na plataforma; peça incompleta / buracos | [ilha e suporte solto](ilha-e-suporte-solto.md) ou [sucção/delaminação](succao-e-delaminacao.md) |
| Peça gorda / bleeding / soldada demais no FEP | [over/under exposure](over-under-exposure.md) (lado over) |
| Falha no meio do Z após base OK | sucção, volume de resina, temperatura, suporte |
| Irritação / derrame | emergência SDS + [PPE](../../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md) |

## Riscos e parada

- Contato cutâneo/ocular com resina não curada
- Solvente inflamável perto de ignição
- Força excessiva no tanque → ruptura de filme → inundação do LCD
- “Aumentar bottom até grudar” sem limite → peça soldada no FEP (próximo modo de falha)

## Cause matrix (ordenada)

| Plausibilidade | Causa | Por quê |
|---|---|---|
| Alta | Bottom/burn-in exposure baixa ou poucas camadas de base | Força de peel > adesão plataforma |
| Alta | Nivelamento / distância plataforma–filme | Gap grande demais = cura fraca na interface |
| Alta | Filme nublado, frouxo, furado ou contaminado | Peel irregular; falha local vira falha total |
| Média | Lift distance/speed inadequados nas bases | Choque de peel nas primeiras camadas |
| Média | Resina fria, não homogeneizada, fora da janela TDS | Cinética de cura e viscosidade |
| Média | LCD/máscara/LED degradados | Energia real << tempo nominal |
| Baixa-primeira | “Resina ruim” genérico | Só após esgotar processo e consumíveis |

## Árvore de decisão

```text
Plataforma vazia ou quase?
  ├─ Resina no LCD / vazamento? → emergência OEM; pare
  ├─ Há raft/pele no FEP?
  │     ├─ SIM → bottom / level / film / lift (nessa ordem mental)
  │     └─ NÃO → matriz de exposição do fabricante; inspecionar LCD/máscara; lote/resina
  └─ Raft parcial só nas bordas? → re-nivelar; verificar tensão do filme
Não copie tempo de fórum: use calibrador/matriz do fabricante + máquina.
```

## Testes (barato → caro)

1. Inspecionar nível de resina, temperatura ambiente vs TDS, homogeneização (sem whip excessivo de bolhas)
2. Inspecionar filme (nuvens, riscos, frouxidão) sem ferramentas afiadas sobre o LCD
3. Re-nivelar conforme procedimento OEM
4. Reimprimir **matriz/cupom de exposição** do fabricante (uma variável: bottom)
5. Ajustar perfil de lift nas camadas de base (se o slicer permitir)
6. Trocar filme / filtrar resina / avaliar LCD com padrão de teste OEM

## Ações corretivas por causa

| Causa confirmada | Ação | Não faça junto |
|---|---|---|
| Bottom baixo | ↑ bottom exposure e/ou count via cupom | ↑ exposição normal no mesmo passo |
| Desnível | Nivelar | Trocar resina “no escuro” |
| Filme ruim | Substituir filme | Continuar jobs longos |
| Lift agressivo | Suavizar peel nas bases | Compensar só com over-exposure |
| LCD fraco | Diagnóstico OEM / substituição | Inventar tempos extremos |

## Validar correção

Cupom de base estável **na plataforma**, remoção sem solda no FEP, depois peça curta com raft. Uma mudança dominante por tentativa. Registrar marca/lote da resina, layer height, bottom time/count, lift.

## Prevenção

- Rotina de inspeção de filme e nível
- Matriz de exposição ao trocar marca/lote/altura de camada
- Manter resina na janela térmica do TDS
- Não misturar profiles entre impressoras/LCD diferentes

## Relações com outros conceitos

- indicated-by → plataforma vazia + raft no filme
- causes ← bottom fraco, level, film, lift, energia real baixa
- diagnosed-by → árvore + inspeção de filme/nível
- mitigated-by → calibração de base + manutenção de consumíveis
- worsened-by → over-correction de bottom → solda no FEP
- depends-on → [settings exposição/suportes](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md)
- applies-to → [SLA/DLP/MSLA](../../02-tecnologias/vat-photopolymerization/sla-dlp-msla.md)

## Veja também

- [Over/under exposure](over-under-exposure.md)
- [Sucção e delaminação](succao-e-delaminacao.md)
- [Famílias de resina](../../05-materiais/resina/familias-de-resina.md)

## Fontes

- Higiene ocupacional / AM: [NIOSH Additive Manufacturing](../../22-fontes/niosh-additive-manufacturing.md)
- Mecanismo e ordem de ajuste: [resina — exposição e suportes](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md)
- Índice: [indice-falhas-resina.md](indice-falhas-resina.md)
- Tempos numéricos: **somente** TDS/calibrador do fabricante — não inventados aqui

## Lacunas

- Fotos locais de raft-no-FEP vs empty cure
- Procedimentos de nivelamento por OEM (não genéricos)
- Critérios objetivos de “filme vencido” por medição (não só visual)
