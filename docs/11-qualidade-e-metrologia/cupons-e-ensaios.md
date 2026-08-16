---
id: "quality.test-coupons"
title: "Cupons e ensaios (validação FFF)"
summary: "Cupons são geometrias pequenas para isolar uma variável (primeira camada, folga pin/hole, flow, overhang, adesão Z) antes de gastar tempo e filamento na peça final. Ensaios funcionais validam a peça sob carga/uso real. Use uma mudança por vez, registre condições e interprete com exatidão vs repetibilidade. Cupom não substitui SDS, ventilação nem certificação food/medical."
doc_type: "guide"
domain: ["quality", "metrology", "calibration", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "printer.bambu-lab-a1-mini", "material.pla", "material.petg"]
not_for: ["single-coupon-as-certification", "destructive-test-lab-accreditation"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.ellis-print-tuning-guide", "source.teaching-tech-calibration"]
related: ["quality.accuracy-vs-precision", "design.tolerances-fff", "process.fff.first-layer", "design.strength-anisotropy"]
prerequisites: ["quality.accuracy-vs-precision"]
supersedes: []
aliases_pt_br: ["cupons de teste", "geometrias de calibração", "ensaios FFF"]
aliases_en: ["test coupons", "calibration prints", "bench tests"]
tags: ["coupons", "calibration", "quality", "fff"]
---

# Cupons e ensaios

Hub pai: [Qualidade e metrologia](INDEX.md)

## O que é

**Cupom:** peça-teste barata que responde a **uma pergunta**.  
**Ensaio funcional:** a peça (ou proxy) sob uso/carga representativa.

## Quando usar

| Situação | Cupom / ensaio |
|---|---|
| Nova bobina / cor | First-layer + stringing leve |
| Encaixe crítico | Pin/hole clearance ladder |
| Bracket estrutural | Flexão/tração na orientação real |
| Após mover a impressora | First-layer + square/diagonal se disponível |
| Troca de nozzle | Extrusão + dimensional externo |

## Famílias de cupom (FFF)

### 1) Primeira camada / adesão

- Patch ou monólito fino cobrindo área relevante
- Critério: squish uniforme, sem buracos, sem amassar excessivo
- Nó: [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md)

### 2) Dimensional / encaixe

- Escada de pinos e furos com folgas candidatas
- Medir após cooling; ver [tolerâncias](../06-design-para-impressao-3d/tolerancias-e-encaixes-fff.md) e [precisão vs repetibilidade](precisao-vs-repetibilidade.md)

### 3) Extrusão / superfície

- Cubos ou paredes finas para flow; torre de temp (se método adotado)
- Fontes de método: [Ellis](../22-fontes/ellis-print-tuning-guide.md), [Teaching Tech](../22-fontes/teaching-tech-calibration.md)

### 4) Overhang / bridging

- Degraus 30–70°; pontes curtas
- Isola cooling e velocidade de parede externa

### 5) Adesão Z / anisotropia

- Barra impressa em duas orientações; flexionar até falha (PPE: estilhaço)
- Interpretação: [resistência e anisotropia](../06-design-para-impressao-3d/resistencia-e-anisotropia.md)

## Protocolo anti-confusão

1. Escrever a pergunta (“ID do furo M3 passa sem folga?”)
2. Fixar constantes: máquina, nozzle, placa, perfil base, ambientação
3. Mudar **uma** variável
4. Registrar: data, material/lote, settings-chave, resultado (foto + medida)
5. Parar quando critério objetivo for atingido — não “mais um tweak”

## Ensaios funcionais (brackets e clips)

- Aplicar carga na direção do uso ([brackets](../16-cenarios-e-playbooks/pecas-funcionais-brackets.md))
- Incluir ciclos de montagem se for o caso (rosca/insert)
- Critério de aceite definido **antes** do teste

## O que cupom não prova

- Segurança alimentar/médica
- Vida útil em UV/exterior sem ensaio específico
- Que “o perfil oficial” é ótimo para sua geometria
- Que N=1 generaliza

## Segurança

- Flexão até romper: óculos; cuidado com farpas
- PETG/PLA quentes: queimadura
- Ventilação: [VOC/UFP](../15-seguranca-e-meio-ambiente/voc-ufp-e-ventilacao.md)
- Resina: cupons resinosos seguem PPE de resina — não misturar regras FFF

## Relações

- Calibração de processo → hub [09-calibracao](../09-calibracao/INDEX.md) (cobertura em evolução)
- Economia: cupom gasta filamento de propósito — ainda assim barato vs peça falha ([custo](../19-economia-e-sustentabilidade/custo-e-desperdicio-fff.md))

## Lacunas

- Biblioteca de STL de cupons versionada neste repo: ainda não canônica
- Ensaios instrumentados (célula de carga): fora do escopo atual
