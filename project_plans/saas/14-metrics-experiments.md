# 14 — Metrics & Experiments

**Date:** 2026-08-15  
**North star:** Confirmed successful prints influenced by the product/service  
**Event names:** English `snake_case`  
**Strategy language:** PT-BR below; identifiers EN.

---

## 1. North star

| | |
|---|---|
| **Metric** | `confirmed_successful_prints_influenced` |
| **Definition** | Contagem de impressões em que o usuário (a) recebeu receita/análise do sistema ou concierge, (b) executou no fatiador, e (c) confirmou sucesso via `print_outcome_reported` com `outcome=success`. |
| **Label** | **DECISION** |
| **Non-goals** | Contar uploads, tokens LLM, ou “receitas vistas” como sucesso. |
| **Proxy early (Phase 0)** | Planilha manual com mesma definição. |

**INFERENCE:** Essa métrica alinha Hobby (menos falhas) e Microfarm (menos retrabalho/custo).

**ASSUMPTION:** Usuários reportarão outcomes se o friction for ≤30s e houver incentivo leve (crédito AI / badge).

---

## 2. Metric tree

```
confirmed_successful_prints_influenced
├── Acquisition
│   ├── visitors
│   ├── signup_completed
│   └── interview_booked / pilot_started   (Phase 0)
├── Activation
│   ├── model_uploaded
│   ├── analyze_completed
│   └── recipe_viewed
├── Value / Habit
│   ├── recipe_accepted
│   ├── recipe_exported
│   ├── print_outcome_reported
│   └── confirmed_successful_prints_influenced   ★
├── Revenue
│   ├── checkout_started
│   ├── subscription_started
│   ├── payment_succeeded
│   ├── mrr_brl
│   └── ai_credits_purchased
├── Retention
│   ├── wau / mau
│   ├── subscription_renewed
│   └── churned
└── Cost / Quality
    ├── llm_cost_usd
    ├── analyze_error_rate
    ├── ai_safety_violation_count
    └── support_tickets
```

### 2.1 Input → output mapping

| Stage | Leading indicators | Lagging |
|---|---|---|
| SEO/Content | `page_view` on guia clusters | Organic signups |
| Concierge | Jobs delivered | Confirmed successes |
| Product | `analyze_completed` | `print_outcome_reported` |
| AI | `ai_suggestion_shown` | Lift vs rules-only cohort |
| Billing | `checkout_started` | `mrr_brl` |

---

## 3. Event dictionary (English names)

Emit with: `event_name`, `user_id` (hash ok), `timestamp`, `properties`.

| event_name | When | Key properties |
|---|---|---|
| `page_view` | Page load | `path`, `locale` |
| `cta_clicked` | Marketing CTA | `cta_id` |
| `signup_started` | Auth begin | `method` |
| `signup_completed` | Auth done | `method` |
| `interview_booked` | Cal booked | `source` |
| `interview_completed` | Done | `segment` |
| `concierge_job_submitted` | Intake | `printer_model`, `material` |
| `concierge_job_delivered` | Recipe sent | `turnaround_hours` |
| `pilot_started` | Pilot kickoff | `pilot_id`, `price_brl` |
| `pilot_completed` | End | `renew_intent` |
| `model_upload_started` | Upload begin | `bytes`, `file_ext` |
| `model_upload_completed` | Stored | `bytes`, `storage_key_hash` |
| `model_upload_failed` | Fail | `error_code` |
| `analyze_started` | Job queued | `mode=rules\|ai` |
| `analyze_completed` | Done | `duration_ms`, `mode` |
| `analyze_failed` | Fail | `error_code` |
| `recipe_viewed` | UI | `recipe_id`, `profile_family` |
| `recipe_accepted` | User accept | `edits_count` |
| `recipe_edited` | User change | `field` |
| `recipe_exported` | Checklist/PDF | `format` |
| `ai_suggestion_shown` | AI panel | `prompt_template_id`, `prompt_version` |
| `ai_suggestion_accepted` | Accept AI | `overrode_rules=bool` |
| `ai_suggestion_rejected` | Reject | `reason_code` |
| `ai_credits_burned` | Meter | `credits`, `tokens_in`, `tokens_out` |
| `print_outcome_reported` | User report | `outcome=success\|fail\|partial`, `fail_category?` |
| `print_confirmed_success` | Derived/alias when success | `recipe_id` |
| `checkout_started` | Billing | `plan_code` |
| `payment_succeeded` | Paid | `plan_code`, `amount_brl`, `method=card\|pix` |
| `payment_failed` | Fail | `error_code` |
| `subscription_started` | New sub | `plan_code` |
| `subscription_canceled` | Cancel | `reason_code` |
| `email_sent` | Resend | `template_id` |
| `email_opened` | If tracked | `template_id` |

**DECISION:** Never put mesh geometry or raw prompts in event properties.

### 3.2 Core KPIs (MVP dashboards)

| KPI | Formula | Target Phase 1 | Label |
|---|---|---|---|
| Activation rate | `recipe_viewed` / `signup_completed` | ≥40% | **HYPOTHESIS** |
| Outcome report rate | `print_outcome_reported` / `recipe_accepted` | ≥35% | **HYPOTHESIS** |
| Success rate | success / reported | ≥70% | **HYPOTHESIS** |
| Pay conversion | `subscription_started` / activated | ≥8% | **HYPOTHESIS** |
| Gross retention M2 | still paying / started | ≥70% | **HYPOTHESIS** |
| AI COGS ratio | llm_cost / revenue | <25% | **DECISION** target |
| Analyze error rate | failed / started | <2% | **DECISION** |

---

## 4. Guardrail metrics

| Guardrail | Tripwire | Action |
|---|---|---|
| `ai_safety_violation_count` | >0 critical / week | Freeze AI ship |
| `analyze_failed` rate | >5% / 24h | Incident |
| Support load | >5 tickets/paying user/mo | Cap acquisition |
| Refund rate | >5% | Pricing/UX review |
| Privacy complaints | ≥1 substantiated | Pause growth features |

---

## 5. Experiment backlog

Each experiment: hypothesis · design · primary metric · pass/fail · sample · owner · phase.

### E01 — Paid vs free concierge

| Field | Value |
|---|---|
| Hypothesis | Cobrar R$49–97 aumenta seriedade e taxa de feedback vs grátis |
| Design | Alternar ofertas por coorte semanal |
| Primary | `print_outcome_reported` rate |
| Pass | Paid cohort report rate ≥1.5× free |
| Fail | Paid kills volume without better learning |
| Phase | 0 |

### E02 — Rules-only vs rules+AI (print success)

| Field | Value |
|---|---|
| Hypothesis | AI explanations lift `outcome=success` without raising fail from bad settings |
| Design | A/B 50/50 após `analyze_started`; AI cannot bypass safety gates |
| Primary | success rate among reported |
| Pass | AI ≥ rules + 5pp absolute **and** safety 100% |
| Fail | No lift **or** any critical safety miss |
| Phase | 2 |

### E03 — Pix-first checkout

| Field | Value |
|---|---|
| Hypothesis | Pix default aumenta `payment_succeeded` vs card-first |
| Design | A/B checkout order |
| Primary | checkout conversion |
| Pass | Pix-first ≥ card-first + 10% relative |
| Fail | No difference after n≥100 checkouts |
| Phase | 1 |

### E04 — Outcome nudge timing

| Field | Value |
|---|---|
| Hypothesis | Lembrete em T+print_estimate_hours aumenta reports |
| Design | Email/push vs none |
| Primary | `print_outcome_reported` |
| Pass | ≥1.4× control |
| Fail | Unsub spike >2% |
| Phase | 1 |

### E05 — Lead magnet checklist

| Field | Value |
|---|---|
| Hypothesis | “10 falhas A1 Mini” PDF aumenta `signup_completed` from SEO |
| Design | Gate vs ungated content CTA |
| Primary | email capture → signup |
| Pass | ≥15% email→signup in 14d |
| Fail | <5% |
| Phase | 0–1 |

### E06 — Price point Hobby

| Field | Value |
|---|---|
| Hypothesis | R$49/mo maximiza receita vs R$29 e R$79 |
| Design | Three-way price test (geo/cohort) |
| Primary | `mrr_brl` / visitor |
| Pass | Clear winner ≥20% revenue/visitor |
| Fail | Ambiguous after n≥50 subs — keep mid |
| Phase | 1 |

### E07 — Microfarm quote tool wedge

| Field | Value |
|---|---|
| Hypothesis | Free quote calculator → higher Microfarm trial starts |
| Design | Tool page CTA vs blog-only |
| Primary | `subscription_started` plan=microfarm |
| Pass | ≥2× trials from tool path |
| Fail | High usage zero pay |
| Phase | 3 |

### E08 — Content: failure teardown vs profile dump

| Field | Value |
|---|---|
| Hypothesis | Fail→fix YouTube converte melhor |
| Design | Alternate video types |
| Primary | CTR to signup |
| Pass | Fail→fix ≥1.3× |
| Fail | No difference — keep cheaper format |
| Phase | 0–2 |

### E09 — AI credit packs vs flat unlimited

| Field | Value |
|---|---|
| Hypothesis | Credits protegem margem sem matar ativação |
| Design | Pack vs soft-unlimited with fair use |
| Primary | AI COGS ratio + retention |
| Pass | COGS <25% **and** retention ≥ control |
| Fail | Churn +15% relative |
| Phase | 2 |

### E10 — Concierge upsell to subscription

| Field | Value |
|---|---|
| Hypothesis | ≥40% paid concierge convert to monthly within 30d |
| Design | Offer at delivery + day 7 |
| Primary | `subscription_started` |
| Pass | ≥40% |
| Fail | <15% — rethink packaging |
| Phase | 0–1 |

---

## 6. Experiment operating rules

| Rule | Label |
|---|---|
| One primary metric per experiment | **DECISION** |
| Pre-register pass/fail before start | **DECISION** |
| No peeking to ship early unless safety kill | **DECISION** |
| Phase 0 experiments can be qualitative+small-n | **DECISION** |
| Phase 2+ AI experiments need eval suite green | **DECISION** |
| R$40k MRR is aspiration, not experiment KPI | **DECISION** |

---

## 7. Reporting cadence

| Cadence | Content |
|---|---|
| Weekly | North star, funnel, COGS, errors |
| Biweekly | Experiment status |
| Monthly | Kill/go review vs Phase gates |
| Quarterly | Metric tree prune |

---

## 8. Open unknowns

| ID | Unknown |
|---|---|
| M-U1 | Fração de usuários que mentem/erram no self-report de sucesso |
| M-U2 | Tempo mediano entre `recipe_exported` e `print_outcome_reported` |
| M-U3 | Elasticidade de preço Hobby em BRL fora de SP/capital |
| M-U4 | Se webcam/failure-AI (Obico-like) contamina expectativa do nosso valor |
