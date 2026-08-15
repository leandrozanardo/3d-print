# 00 — Executive decision

**Snapshot:** 2026-08-15 · Repo: [leandrozanardo/3d-print](https://github.com/leandrozanardo/3d-print)  
**Audience:** founder deciding whether to invest the next 90 days  
**Related:** [MASTER_PLAN.md](MASTER_PLAN.md) · [assumptions-register.md](assumptions-register.md) · [decisions-log.md](decisions-log.md)

---

## Verdict

**DECISION: VALIDATE FIRST** (confidence: medium-high that validation is the correct next move; confidence: low that the SaaS is already a GO).

| Option | When it would apply | Status |
|---|---|---|
| **NO-GO** | Pain is rare, users refuse to pay, free tools close the gap | Not selected — pain is plausible but unproven commercially |
| **VALIDATE FIRST** | Founder-market fit + repo asset exist; willingness-to-pay and wedge size unknown | **Selected** |
| **GO** | ≥5 paid pilots + unit economics hold under AI caps + community pain memo accepted | Blocked until Phase 0 (pilots) exits |

**INFERENCE:** Building full SaaS before paid pilots is the highest-probability way to burn 3–6 months of solo capacity for zero revenue evidence.

**DECISION (2026-08-15, founder):** Pular entrevistas formais. Dor/JTBD baseados em síntese de comunidades online (fóruns, Reddit, YouTube, MakerWorld, wiki do repo). **Risco aceito:** selection bias e WTP não medidos por discovery — compensar com **5 pilots pagos** + landing smoke test.

---

## One-sentence thesis (to stress-test)

> Upload STL/3MF + printer/material/intent → get an explainable, model-specific print plan (orientation, supports, profile, exact Studio paths) before wasting filament and hours — starting on Bambu A1 Mini in Brazil, with premium AI as paid layer on a deterministic rules engine.

---

## Why this could work (reasons to believe)

1. **FACT — Founder-market fit:** senior full-stack + A1 Mini hands-on + design sensibility (founder context in master prompt).
2. **FACT — Differentiating workflow already exists locally:** inspect → classify geometry/purpose → material/profile → orientation/supports → light repair → traceable plan (`playbook.md`, `docs/projeto/`, `core/`).
3. **FACT — Knowledge depth on A1 Mini / 0.4 / PLA–PETG** is unusually dense for a solo repo (71 project wiki pages + named profiles).
4. **INFERENCE — Category gap:** fleet monitors (SimplyPrint, Obico, OctoEverywhere) sell *during* print; slicers are free but generic; Minimal3DP assistant is free but not model-geometry-specific. Pre-print *model-specific* explainability is under-served.
5. **INFERENCE — BR cost of failure is high:** filament + time + machine price premium in Brazil (community reports of 2–2.5× pricing vs US/EU — [Bambu forum LatAm thread](https://forum.bambulab.com/t/3d-printing-access-perspectives-from-latin-america/67450), accessed 2026-08-15). Avoiding one failed overnight print can justify a month of Maker pricing *if* trust is earned.

---

## Why this might fail (investor skepticism)

1. **Free competitor problem:** Bambu Studio defaults + MakerWorld + YouTube + ChatGPT + Reddit/FixMyPrint already “solve” advice for free.
2. **UNKNOWN — willingness to pay** for *advice* vs needing a ready-to-print `.3mf`/G-code.
3. **FACT — Repo is not a product:** no auth, billing, multi-tenant storage, job queue, or security boundary.
4. **FACT — Rules are Markdown, not a versioned ruleset;** AI-without-rules burns margin and hallucinates settings.
5. **ASSUMPTION clash:** founder wants “any FDM” + R$40k MRR in 12 months solo; knowledge moat today is A1 Mini-only. Expanding printers early dilutes quality and support.
6. **Legal/licensing:** no root LICENSE; CC BY-SA ebook; OEM manuals; AGPL if Studio/Orca run server-side ([Bambu AGPL statement](https://blog.bambulab.com/agpl-compliance-of-bambu-studio/), 2026-08-15).
7. **AI-as-premium (founder choice D)** raises COGS; without credits/caps, Pix-priced BR ARPA may not cover LLM + compute + Stripe.

---

## Primary wedge (6 months)

| | |
|---|---|
| **Primary ICP** | Intermediate BR hobbyist with Bambu A1 Mini (or A1) who downloads models and loses prints to orientation/supports/profile mistakes |
| **Secondary ICP** | Micro-seller (Mercado Livre / local) with 1–3 printers needing repeatable recipes + history |
| **Explicitly deferred** | Enterprise fleets, schools, white-label API, full multi-brand “any printer excellence”, Bambu cloud integration |

**DECISION:** Market *message* may say “FDM-ready”; *delivery quality* for MVP is A1 Mini gold-path. Wizard for other printers = best-effort + low confidence until demand data exists.

---

## Smallest credible path to revenue

1. **Community pain memo** (internet synthesis) — treat as accepted input; see [02](02-customer-market-competitors.md) § Community evidence.
2. **Landing + sample report** — waitlist + “pagaria” CTA.
3. **Concierge (manual)** via playbook/`core` — **5 paid reports** (R$49–149) = unique WTP gate.
4. If pilots pass → spike upload → geometry facts → report API.

**First revenue target:** R$1k MRR equivalent (pilots + early subs) within 90 days — or stop SaaS build.

---

## Pricing hypothesis (to validate, not ship blindly)

| Plan | Indicative | Role |
|---|---|---|
| Free | R$0 · 3 analyses/mo | Acquisition; rules-only |
| Maker | R$29,90/mo | Hobby recurring |
| Maker Pro | R$59,90–R$79,90/mo | AI-enriched explanations, comparisons, history |
| Studio | R$149,90–R$299/mo | Microfarm batch/history |
| Credits | R$14,90 packs | Infrequent users |

Model: **subscription + AI credits** (primary). Fallback: pay-per-report concierge.

Gross margin target paid: **≥70%** after payment fees with AI capped; Free subsidized deliberately.

---

## Unit economics snapshot (base case — ASSUMPTIONS)

See formulas in [04-pricing-unit-economics.md](04-pricing-unit-economics.md).

| Paying users | Mix ARPA (hyp.) | Gross MRR | Infra+AI+fees (order) | Cash note |
|---|---|---|---|---|
| 100 | ~R$45 | ~R$4,5k | ~R$0,8–1,5k | Below founder salary |
| 500 | ~R$50 | ~R$25k | ~R$3–6k | Approaching sustainable solo |
| ~700–900 | ~R$50–60 | **~R$40k** | scales with AI abuse risk | Matches founder goal **if** conversion/retention hold |

**INFERENCE:** R$40k MRR in 12 months solo is possible only with strong content acquisition + Pro mix + ruthless AI caps. Treat as stretch, not plan baseline.

---

## Architecture decision (one paragraph)

**DECISION:** Modular monolith — Next.js (web) + NestJS or Fastify API in-process/modules + isolated Python geometry worker reusing `core/` — Supabase (Postgres/Auth) + R2/S3 object storage + queue (Redis/BullMQ or Supabase-friendly worker). Prefer TypeScript founder speed; isolate untrusted mesh parse in rootless containers with CPU/RAM/time limits. No microservices, no Bambu cloud, no headless AGPL slicer in MVP.

---

## Top 5 existential risks

1. Users stay with free Studio + community (no WTP).
2. Recommendations cause failed prints → trust death + liability.
3. Support burden from beginners exceeds solo capacity.
4. Licensing/content (CC BY-SA / OEM / AGPL) blocks commercial packaging.
5. Founder overbuilds SaaS before Phase 0 evidence (time risk).

---

## What must be true for MRR milestones

| Milestone | Must be true |
|---|---|
| First paid | Someone pays for a manual/semiauto report |
| R$1k | ~20–35 Makers or fewer Pros; churn <10%/mo early |
| R$10k | ~200 Makers or ~150 mix; SEO/content engine live |
| R$30k | ~500–600 paying; outcome loop working |
| R$100k | Multi-printer depth OR B2B/API OR EN expansion — not MVP scope |

---

## Next 10 actions (exact order)

1. Fechar **memo de dor comunitária** (já esboçado em 02) — founder confirma “sim, é o que vejo online”.
2. Nota legal leve: CC BY-SA comercial + ToS/LGPD outline (counsel).
3. Landing + relatório amostra HTML (static) a partir do dry-run do cube.
4. Abrir oferta concierge em 1–2 canais BR (Telegram/grupo/stories).
5. Fechar **5 pilots pagos** (playbook + `core` manual).
6. Logar outcomes (sucesso/parcial/falha, tempo, actionability 1–5).
7. Kill criteria (abaixo). Se passar → Phase 1 spike.
8. Ruleset JSON v0 dos perfis A1 Mini (local).
9. Threat model de upload (doc) antes de código público.
10. Reabrir GO/NO-GO com pack de evidências (pilots + custos).

---

## Kill criteria (Phase 0) — sem entrevistas

Stop SaaS build if any:

- **0/5** conversões em pilot pago após ≥10 ofertas sérias; OR
- Actionability média dos pilots **&lt;3/5**; OR
- Sucesso confirmado **&lt;30%** entre quem deu feedback; OR
- Concierge **&gt;45 min/report** sem caminho claro de automação; OR
- Landing: CTR “pagaria/quero” ≈0 após tráfego mínimo (≥200 visitas únicas **HYPOTHESIS** de piso).

**Pain de falha** deixa de ser kill-gate de entrevista — fica **accepted-risk** via evidência de internet (ver 02).

---

## Capacity scenarios (30/60/90)

| Horizon | 8 h/week | 15 h/week | 30 h combined |
|---|---|---|---|
| 30d | Landing + 2 pilots | Landing + 5 pilots | Same + ruleset v0 |
| 60d | 5 pilots + kill/go | Spike upload se pass | Private alpha |
| 90d | GO/NO-GO | Auth+job skeleton | MVP private beta |

---

## Unresolved founder decisions (block next phase if unanswered)

1. ~~Entrevistas~~ → **resolvido: skip** (risco aceito).  
2. Aceitar **A1 Mini gold-path** 6 meses apesar de “qualquer FDM”?  
3. CNPJ antes de cobrar?  
4. Nome da marca?  
5. Teto mensal de spend de IA (sugerido R$300–800)?  
6. Confirmar que o memo de dor comunitária (02) bate com o que você acompanha? → **Resolvido: SIGNED** (`phase0/community-memo-SIGNED.md`).

