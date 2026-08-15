# Decisions Log

**Date opened:** 2026-08-15  
**Scope:** Brainstorming + planning decisions for SaaS direction (no product code).  
**Labels:** Each entry is a **DECISION** unless noted as superseded.

---

## How to use

| Field | Meaning |
|---|---|
| ID | `D-YYYYMMDD-##` |
| Status | `active` · `superseded` · `revisit` |
| Links | Related assumptions / docs |

---

## Brainstorming decisions

### D-20260815-01 — VALIDATE FIRST verdict

| | |
|---|---|
| **Decision** | Não construir produto self-serve completo antes de validar **WTP** via concierge/pilots. Dor/JTBD podem vir de síntese comunitária. |
| **Rationale** | Solo founder; substitutes grátis fortes; pagamento é o sinal que internet não dá. |
| **Status** | active (amended by D-20260815-20) |
| **Links** | A-30, `13-roadmap-backlog.md` Phase 0 |

### D-20260815-20 — Skip formal interviews; internet pain accepted

| | |
|---|---|
| **Decision** | Pular as 20 discovery interviews. Aceitar evidência qualitativa de fóruns/Reddit/YouTube/MakerWorld/wiki. |
| **Rationale** | Founder já acompanha o domínio online; quer velocidade. |
| **Trade-off** | Maior risco de falso positivo em dor e zero medição Van Westendorp pré-piloto. Mitigação = **5 pilots pagos** + landing CTA. |
| **Status** | active |
| **Links** | A-25 superseded; A-02 → accepted-risk; `02-customer-market-competitors.md` community section |

### D-20260815-21 — Community memo signed + Phase 0 pack + upgrade_v1 plan

| | |
|---|---|
| **Decision** | Fechar planejamento desta sessão: memo assinado, templates concierge, `upgrade_v1_plan.md`. SaaS code continua bloqueado até 5 pilots. |
| **Rationale** | Founder pediu closeout do prompt; pilots são ação humana fora do IDE. |
| **Status** | active |
| **Links** | `phase0/`, `../upgrade_v1_plan.md` |

### D-20260815-02 — Brazil-first

| | |
|---|---|
| **Decision** | Mercado inicial = Brasil (PT-BR UX, Pix, conteúdo local). EN é Phase 4+. |
| **Rationale** | Founder context; menor concorrência de conteúdo local; pagamentos locais. |
| **Status** | active |
| **Links** | A-07, `12-go-to-market.md` |

### D-20260815-03 — Segments: Hobby + Microfarm

| | |
|---|---|
| **Decision** | Dois segmentos desde o planejamento; aquisição inicial via Hobby; ARPU upside via Microfarm. |
| **Rationale** | Hobby volume; Microfarm dor de cotação/consistência; path hipotético a R$40k MRR. |
| **Status** | active |
| **Links** | A-01, A-15 |

### D-20260815-04 — AI premium with rules core

| | |
|---|---|
| **Decision** | Núcleo determinístico de regras (capability gates, perfis, riscos) é autoridade; LLM só explica/sugere sob guardrails. |
| **Rationale** | Segurança (materiais enclosure-only no A1 Mini); testabilidade; custo; confiança. |
| **Status** | active |
| **Links** | A-04, `11-testing-observability.md` |

### D-20260815-05 — A1 Mini wedge (despite any-FDM aspiration)

| | |
|---|---|
| **Decision** | Foco de produto e conteúdo em Bambu Lab A1 Mini até Phase 3; any-FDM fica aspiracional. |
| **Rationale** | Profundidade > largura; dor documentada em comunidades; hardware ativo do projeto local. |
| **Status** | active |
| **Links** | A-02, A-17, repo `playbook.md` / `docs/printers/A1mini/` |

### D-20260815-06 — Solo founder tooling: Cursor + ChatGPT

| | |
|---|---|
| **Decision** | Operar com stack de alavancagem AI para docs, código e suporte; não contratar time até PMF. |
| **Rationale** | Capacidade 8–30h/wk; custo fixo baixo. |
| **Status** | active |
| **Links** | A-05 |

### D-20260815-07 — R$40k MRR is aggressive aspiration

| | |
|---|---|
| **Decision** | Tratar R$40k MRR como meta de longo prazo / stress test de modelo — **não** como kill gate de Phase 0–1. |
| **Rationale** | Matemática de usuários×ARPU exige Microfarm forte ou escala; premature optimization destrói VALIDATE FIRST. |
| **Status** | active |
| **Links** | A-06 |

### D-20260815-08 — Free slicers are primary substitutes

| | |
|---|---|
| **Decision** | Posicionar contra “só usar Bambu Studio/Orca grátis”, não contra SimplyPrint fleet dashboards, no messaging inicial. |
| **Rationale** | Entrevistas-alvo e comportamento maker; preço $0 é o benchmark psicológico. |
| **Status** | active |
| **Links** | A-03, A-18 |

### D-20260815-09 — Embrace slicers as execution layer

| | |
|---|---|
| **Decision** | MVP entrega receita/checklist para execução no Studio/Orca; não tenta substituir o fatiador. |
| **Rationale** | Reduz escopo; evita guerra de features; alinha AGPL/plugin caution. |
| **Status** | active |
| **Links** | A-14, D-20260815-08 |

---

## Planning decisions (docs 11–14)

### D-20260815-10 — North star metric

| | |
|---|---|
| **Decision** | North star = `confirmed_successful_prints_influenced`. |
| **Rationale** | Proxy de valor real; evita vaidade (uploads/tokens). |
| **Status** | active |
| **Links** | `14-metrics-experiments.md` |

### D-20260815-11 — Event naming English

| | |
|---|---|
| **Decision** | Analytics/events/identifiers em inglês; copy de produto em PT-BR. |
| **Rationale** | Consistência engineering; mercado BR na UX. |
| **Status** | active |

### D-20260815-12 — Telemetry must not leak model IP

| | |
|---|---|
| **Decision** | Produção loga `prompt_template_id` + version + hashes; nunca prompts completos nem meshes em analytics. |
| **Rationale** | IP do produto + privacidade do usuário. |
| **Status** | active |
| **Links** | `11-testing-observability.md` §4 |

### D-20260815-13 — MVP SLOs

| | |
|---|---|
| **Decision** | Availability 99.0%; rules analyze P95 ≤8s; AI path P95 ≤25s; upload success ≥98%. |
| **Rationale** | Suficiente Hobby; honestidade solo-ops. |
| **Status** | active |

### D-20260815-14 — Test pyramid order

| | |
|---|---|
| **Decision** | Prioridade: Jest/pytest domain → property on validators → Playwright smoke → LLM evals blocking for AI → fuzz parsers later. |
| **Rationale** | ROI sob capacidade limitada. |
| **Status** | active |

### D-20260815-15 — Phase 0 GTM package

| | |
|---|---|
| **Decision** | ~~20 interviews +~~ concierge + 5 paid pilots; SEO PT + YouTube + communities; sem ads pagos até ≥20 paying. |
| **Rationale** | VALIDATE FIRST; CAC zero inicial. |
| **Status** | active (**amended** by D-20: interviews removed) |
| **Links** | `12-go-to-market.md` |

### D-20260815-16 — Kill criteria explicit

| | |
|---|---|
| **Decision** | Adotar K1–K6 atualizados (ofertas pagas, sucesso, WTP, “Studio basta”, legal, COGS) — **sem** quota de entrevistas. |
| **Rationale** | Evitar sunk cost no build. |
| **Status** | active (**amended** by D-20) |

### D-20260815-17 — Phase gates separate validation vs implementation

| | |
|---|---|
| **Decision** | Roadmap Phase 0–4 com exit/kill; backlog marcado `validation` vs `implementation`; sem I*.P0 antes do exit Phase 0. |
| **Rationale** | Anti-workaround processual. |
| **Status** | active |
| **Links** | `13-roadmap-backlog.md` |

### D-20260815-18 — Capacity scenarios documented

| | |
|---|---|
| **Decision** | Estimar calendário para 8 / 15 / 30 h semanais combinadas (humano+AI tools). |
| **Rationale** | Expectativa realista; 8h/wk não carrega R$40k curto prazo. |
| **Status** | active |

### D-20260815-19 — Billing BR via Stripe + Pix

| | |
|---|---|
| **Decision** | Planejar Stripe Brasil (cartão 3,99%+R$0,39; Pix 1,19%; Billing 0,7%) como path de cobrança. |
| **Rationale** | Fonte oficial Stripe BR; Pix reduz fricção. |
| **Status** | active |
| **Links** | `sources.md` Stripe |

### D-20260815-20 — Infra planning defaults

| | |
|---|---|
| **Decision** | Planejar Supabase (Pro from $25) + Resend + object storage tipo R2; AI via OpenAI-class models com budget. |
| **Rationale** | Time-to-MVP; custos conhecidos; R2 egress $0 atrativo para downloads de modelos. |
| **Status** | active |
| **Links** | A-12, A-13, A-27 |

### D-20260815-21 — Competitive frame

| | |
|---|---|
| **Decision** | Monitorar preços SimplyPrint / 3DPrinterOS / OctoEverywhere / Obico / AstroPrint / MeshInspector como âncoras; não clonar features de fleet. |
| **Rationale** | Pesquisa 2026-08-15; JTBD diferente. |
| **Status** | active |
| **Links** | `sources.md` |

### D-20260815-22 — Non-goals MVP

| | |
|---|---|
| **Decision** | Fora do MVP: resin Formware-like slicer, self-hosted fleet OS, AMS hardware, EN market, unlimited AI. |
| **Rationale** | Foco; A-22 validated. |
| **Status** | active |

### D-20260815-23 — Evidence labeling standard

| | |
|---|---|
| **Decision** | Docs de planejamento usam FACT / INFERENCE / HYPOTHESIS / ASSUMPTION / UNKNOWN / DECISION. |
| **Rationale** | Reduz falsa precisão; auditoria Zero-Trust. |
| **Status** | active |

### D-20260815-24 — Docs location

| | |
|---|---|
| **Decision** | Toda documentação SaaS de planejamento vive sob `project_plans/saas/` apenas. |
| **Rationale** | Isolamento pedido; sem misturar com wiki operacional `docs/`. |
| **Status** | active |

---

## Supersessions

_None yet as of 2026-08-15._

---

## Revisit triggers

| Trigger | Decisions to reopen |
|---|---|
| Phase 0 kill memo | D-01, D-03, D-05, D-08 |
| AI COGS >40% ARPU | D-04, D-20 |
| Legal counsel flags AGPL path | D-09, D-05 |
| Microfarm WTP ≫ Hobby | D-03 pricing emphasis |
| 100 paying users | D-07 timeline realism |
