# MASTER PLAN — Premium Printability SaaS

**Repository:** https://github.com/leandrozanardo/3d-print  
**Planning snapshot:** 2026-08-15  
**Working name:** PrintPlan (TBD)  
**Index of detail docs:** see folder `project_plans/saas/`

This file is the **synthesis**, not a dump. Details live in numbered docs.

---

## 1. Verdict

| | |
|---|---|
| **Verdict** | **VALIDATE FIRST** |
| **Confidence** | Medium-high that validation is correct; low that product is already investable as full SaaS build |
| **Not NO-GO because** | Founder-market fit + dense A1 Mini workflow asset + plausible category gap vs free generic advice |
| **Not GO because** | No WTP evidence, free substitutes are strong, legal/content isolation unfinished, SaaS shell absent |

Full rationale: [00-executive-decision.md](00-executive-decision.md)

---

## 2. Recommended wedge & ICP

- **Primary ICP:** Intermediate Brazilian hobbyist with **Bambu Lab A1 Mini** (Studio, 0.4 mm, PLA/PETG) who downloads models and fails on orientation/supports/profile.  
- **Secondary ICP:** Micro-seller (1–3 printers) needing repeatable recipes + history.  
- **Rejected (6 mo):** beginners-as-primary, schools, enterprise fleet, white-label API.  
- **Printer strategy:** Gold-path A1 Mini; any-FDM wizard = low-confidence best-effort until demand data.

---

## 3. Customer problem & evidence status

**Problem:** Pre-print uncertainty wastes filament, hours, and overnight runs; slicers are powerful but not *model-intent-specific coaches*.

**Evidence today:** Community internet synthesis + repo workflow (see [02](02-customer-market-competitors.md)). **Missing for WTP:** 5 paid pilots. Interviews **skipped by founder decision** (D-20260815-20).

---

## 4. Differentiated promise

> Upload your model. Know what will fail, what to change, and why — before you print.

**Engineering truth:** Deterministic geometry + versioned rules + citations; LLM only explains/structures on paid tiers; **never invents settings**; **never guarantees success**.

Positioning: [03-positioning-business-model.md](03-positioning-business-model.md)

---

## 5. MVP / non-goals

**MVP (after Phase 0 pass):** Auth → secure upload → geometry facts → A1 Mini context → printability report with sub-scores → ranked recommendations with Studio paths → download report → usage limits → Stripe/Pix subscription + AI credits → privacy/delete.

**Non-goals MVP:** Headless AGPL slicer, Bambu cloud, fleet monitoring, photo diagnosis, multi-printer gold quality, team SSO, lifetime deals.

Product detail: [05-product-requirements.md](05-product-requirements.md)

---

## 6. Pricing & unit economics (summary)

| Plan | Hyp. price |
|---|---|
| Free | R$0 · 3 analyses |
| Maker | R$29,90 |
| Maker Pro | R$59,90–79,90 |
| Studio | R$149,90–299 |
| Credits | R$14,90 |

**Model:** subscription + AI credits; Free = rules-only.  
**R$40k MRR:** ~800 payers @ ~R$50 ARPA (stretch). Baseline aim: prove R$1k then R$10k.  
Formulas: [04-pricing-unit-economics.md](04-pricing-unit-economics.md)

---

## 7. Architecture decision

Modular monolith: **Next.js web + Nest/Fastify API + sandboxed Python worker** reusing `core/` domain adapters; Supabase Auth/Postgres; object storage; queue; no microservices; no Bambu cloud. AI behind schema validation and spend circuit breakers.

Details: [07-technical-architecture.md](07-technical-architecture.md) · [08-data-api-jobs.md](08-data-api-jobs.md) · [09-geometry-rules-ai.md](09-geometry-rules-ai.md) · [10-security-privacy-legal.md](10-security-privacy-legal.md)

---

## 8. Validation plan (Phase 0)

| Step | Status |
|---|---|
| Community pain memo | **SIGNED** → [`phase0/community-memo-SIGNED.md`](phase0/community-memo-SIGNED.md) |
| Ops pack (offer/intake/delivery/log/sample) | **DONE** → [`phase0/README.md`](phase0/README.md) |
| Landing HTML live | Pending founder |
| 5 paid concierge pilots | **Founder-only** |
| Kill/pass | [`00-executive-decision.md`](00-executive-decision.md) |

Local upgrade path (ruleset, not SaaS): [`../upgrade_v1_plan.md`](../upgrade_v1_plan.md)

---

## SESSION CLOSEOUT (2026-08-15)

**Planning prompt: COMPLETE.**  
Next human action: enviar [`phase0/concierge-offer.md`](phase0/concierge-offer.md) e fechar 5 pilots.  
Next coding prompt (optional, local only): Task 1 ruleset in `upgrade_v1_plan.md`.  
Do not implement SaaS apps until P0c pass.

---

## 9. Phase gates

| Phase | Objective | Kill if |
|---|---|---|
| 0 Evidence | WTP via pilots | Pilots fail gates |
| 1 Spike | Safe geometry+report latency/cost | Cannot sandbox or costs explode |
| 2 Revenue MVP | Paid self-serve | Conversion &lt; threshold / margin break |
| 3 Retention | Outcomes loop | No feedback / churn high |
| 4 Expansion | 2nd printer / EN / API | Only after evidence |

Backlog: [13-roadmap-backlog.md](13-roadmap-backlog.md)

---

## 10. Top risks

1. Free Studio + ChatGPT + YouTube win forever (no WTP).  
2. Bad recommendation → failed print → trust/liability.  
3. Solo support meltdown.  
4. CC BY-SA / OEM / AGPL / no root LICENSE blocks packaging.  
5. Overbuild before Phase 0.

Register expanded in security/GTM docs; assumptions in [assumptions-register.md](assumptions-register.md).

---

## 11. Next 10 founder actions (ordered)

1. Confirmar memo de dor comunitária (02) contra o que você acompanha.  
2. Counsel note: CC BY-SA + ToS/LGPD.  
3. Landing + sample report.  
4. Oferta concierge em canais BR.  
5. Fechar 5 pilots pagos.  
6. Logar outcomes.  
7. Kill criteria (00).  
8. Se pass: ruleset JSON A1 Mini.  
9. Se pass: upload sandbox spike.  
10. Re-issue GO/NO-GO.

---

## 12. 30 / 60 / 90 by capacity

### Solo 8 h/week

- **30:** Landing + ≥2 pilots  
- **60:** 5 pilots + kill/go  
- **90:** GO/NO-GO; se pass, spike fino  

### Solo 15 h/week

- **30:** Landing + 5 pilots em curso  
- **60:** Phase 1 spike se pass  
- **90:** Private alpha  

### Founder + contractor 30 h combined

- **30:** Phase 0 pilots done  
- **60:** Phase 1 + private alpha  
- **90:** Phase 2 private beta billing  

---

## 13. Document map

| File | Purpose |
|---|---|
| [00-executive-decision.md](00-executive-decision.md) | Decide in 3–5 pages |
| [01-repository-audit.md](01-repository-audit.md) | Reuse/gap matrices |
| [02-customer-market-competitors.md](02-customer-market-competitors.md) | ICP, interviews, competitors |
| [03-positioning-business-model.md](03-positioning-business-model.md) | Category & packaging |
| [04-pricing-unit-economics.md](04-pricing-unit-economics.md) | Formulas & scenarios |
| [05-product-requirements.md](05-product-requirements.md) | MVP journey & scopes |
| [06-ux-information-architecture.md](06-ux-information-architecture.md) | UX/IA |
| [07-technical-architecture.md](07-technical-architecture.md) | ADR & infra |
| [08-data-api-jobs.md](08-data-api-jobs.md) | ERD & jobs |
| [09-geometry-rules-ai.md](09-geometry-rules-ai.md) | Geometry/rules/LLM |
| [10-security-privacy-legal.md](10-security-privacy-legal.md) | Security & licensing |
| [11-testing-observability.md](11-testing-observability.md) | Quality |
| [12-go-to-market.md](12-go-to-market.md) | GTM |
| [13-roadmap-backlog.md](13-roadmap-backlog.md) | Phases & backlog |
| [14-metrics-experiments.md](14-metrics-experiments.md) | Metrics |
| [assumptions-register.md](assumptions-register.md) | Assumptions |
| [decisions-log.md](decisions-log.md) | Decisions |
| [sources.md](sources.md) | Citations |

---

## 14. Quality gate checklist

- [x] Repo inspected; hybrid local system described  
- [x] Reuse + gap matrices  
- [x] Primary ICP selected; others rejected  
- [x] ≥15 competitors/substitutes compared with dated sources  
- [x] Free-alternative problem answered  
- [x] Price = hypothesis + validation path (not cost-plus only)  
- [x] Unit economics with fees/AI/infra/support scenarios  
- [x] MVP journey + non-goals (detail in 05)  
- [x] Deterministic facts → rules → LLM explain  
- [x] Hostile uploads planned (10)  
- [x] Licensing risks flagged; Bambu cloud not assumed  
- [x] Solo-founder architecture  
- [x] Phase entry/exit/kill  
- [x] Invalidating evidence defined  
- [x] Next 10 actions concrete  
- [x] No SaaS implementation code changed  

**Partial / follow-up:** Interviews skipped (D-20); WTP ainda depende de pilots. OpenAI official pricing & R2 marketing timeouts → RESEARCH_BLOCKED in sources.
