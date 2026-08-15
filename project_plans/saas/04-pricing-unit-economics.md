# 04 — Pricing & unit economics

**Snapshot:** 2026-08-15 · All BRL unless noted · **HYPOTHESIS prices pending WTP interviews**  
**Related:** [sources.md](sources.md) · [00-executive-decision.md](00-executive-decision.md)

---

## Labeling

- Competitor & vendor fees: **FACT** with URL + access date in `sources.md`.  
- Plan prices R$29.90 etc.: **HYPOTHESIS** (master-prompt seed + local packaging).  
- Token costs: OpenAI official page **RESEARCH_BLOCKED** (timeout); secondary aggregators cite gpt-4o-mini **~$0.15 / $0.60 per 1M** in/out (2026-08) — treat as **ASSUMPTION** until re-verified on [OpenAI pricing](https://developers.openai.com/api/docs/pricing).  
- Taxes (ISS/PIS/COFINS etc.): **UNKNOWN** — accountant scenario ranges only.

---

## Pricing hypotheses (challenge, don’t ship)

| Plan | Indicative | Purpose |
|---|---|---|
| Free | R$0 | 3 analyses/mo; sample; acquisition |
| Maker | R$29,90/mo or ~USD 5.99 | Hobby recurring |
| Maker Pro | R$59,90–R$79,90/mo | AI-enriched + history |
| Studio | R$149,90–R$299/mo | Microfarm |
| Credits | R$14,90 | Burst AI / infrequent |
| Annual | 15–25% off | Cash + retention |
| Founding | First 50: 30% off 12 mo | Learning customers |
| Lifetime | **Rejected** | Variable AI/storage liability |

**Primary model:** subscription + AI credits.  
**Fallback:** pay-per-report (R$49–149 concierge).

### Competitive price anchors (FACT)

| Product | Price | Implication |
|---|---|---|
| SimplyPrint Basic/Pro | $5.99 / $9.99 | Ops tools price low — advice SaaS must feel sharper ROI |
| AstroPrint Premium | $9.90 | Same |
| OctoEverywhere supporter | $4.99–$9.99 | AI failure narrative cheap |
| MeshInspector Makers | $300/yr (~$25/mo) | Mesh pros pay more for geometry tools |
| Formware repair API | €100/mo | B2B repair floor |

**INFERENCE:** BR Maker at ~R$30–60 is in the “coffee/filament spool fraction” zone; Studio must clearly beat spreadsheet+notes for sellers.

---

## Packaging limits (draft)

| | Free | Maker | Pro | Studio |
|---|---|---|---|---|
| Analyses/mo | 3 | 30 | 100 | 400 |
| Max upload | 25 MB | 80 MB | 150 MB | 250 MB |
| Retention | 7d | 90d | 365d | 365d+ |
| AI credits/mo | 0 | 20 | 150 | 500 |
| Support | Docs | Email 72h | Email 48h | Priority |
| Overage | Block | Soft warn → credits | Credits | Credits |
| Abuse | Strict rate limit | Same | Same | Same |

---

## Cost building blocks (formulas)

### Payment processing (FACT — Stripe BR 2026-08-15)

- Cards national: **3,99% + R$0,39**  
- Pix: **1,19%**  
- Billing: **0,7%** of Billing volume  
Source: https://stripe.com/br/pricing

`payment_fee ≈ revenue * (pix_share * 0.0119 + card_share * 0.0399) + card_tx * 0.39 + revenue * 0.007`

**ASSUMPTION base:** 60% Pix / 40% card for BR makers.

### Infra fixed (ASSUMPTION lean production)

| Item | Low | Base | High | Source/note |
|---|---|---|---|---|
| Supabase Pro | $0 (free pause risk) | **$25** | $35+ compute | https://supabase.com/pricing |
| Object storage R2 | $0 | $5–15 | $40 | R2 marketing **RESEARCH_BLOCKED**; use docs later |
| Worker compute | $0 (local) | $20–40 | $120 | Fly/Railway/Render class |
| Resend | $0 (≤3k) | $0–20 | $35 | https://resend.com/pricing |
| Domain/misc | R$20 | R$50 | R$100 | — |
| Error/logs | $0 | $10 | $40 | Cap ingestion |
| **USD→BRL** | — | **ASSUMPTION 5.5** | — | Planning FX only |

### Variable per successful AI-enriched analysis

**ASSUMPTION tokens/job:** 4k input + 1.5k output on mini model.

`ai_cost_usd ≈ (4000/1e6)*0.15 + (1500/1e6)*0.60 ≈ $0.0015`  
→ ~**R$0.01** at FX 5.5 — **negligible if capped**; real risk is abuse, photos, long chat, stronger models.

**DECISION:** Model Pro with stronger model only on low-confidence; hard org AI budget alert at R$500/mo early.

### Support cost

`support_brl ≈ tickets * minutes * (founder_hourly / 60)`  
Founder hourly economic: **ASSUMPTION R$150–250/h** for break-even inclusive.

---

## Scenario model — paying users

**ASSUMPTION plan mix (base):** 55% Maker @ R$29.90 · 35% Pro @ R$69.90 · 10% Studio @ R$199  

`ARPA = 0.55*29.9 + 0.35*69.9 + 0.1*199 ≈ 16.45 + 24.47 + 19.9 ≈ R$60.8`  
(Earlier exec used ~R$50 — use **R$45 low / R$55 base / R$70 high** after mix stress.)

Recalibrate base mix for conservatism: 70% Maker / 25% Pro / 5% Studio →  
`ARPA ≈ 0.7*29.9 + 0.25*69.9 + 0.05*199 ≈ 20.93 + 17.48 + 9.95 ≈ R$48.4` → **use R$50 base**.

| Paying N | MRR base (N×50) | Fees ~4% | Infra+AI base | Gross profit rough | Margin rough |
|---|---|---|---|---|---|
| 100 | R$5.000 | R$200 | R$1.200 | R$3.600 | ~72% |
| 500 | R$25.000 | R$1.000 | R$4.000 | R$20.000 | ~80% |
| 1.000 | R$50.000 | R$2.000 | R$8.000 | R$40.000 | ~80% |
| 5.000 | R$250.000 | R$10.000 | R$40.000 | R$200.000 | ~80% |

**INFERENCE:** At N≥500, cash works **if** AI not abused and free tier controlled. At N=100, cash OK but **economic** break-even fails if founder salary R$8–12k desired.

### Free-user subsidy

Assume 10 free : 1 paid early.  
`free_cost ≈ free_users * (storage + cpu_share)` — cap free analyses hard.

### Break-even

- **Cash break-even (infra only):** ~30–60 payers.  
- **Economic break-even (R$10k founder draw):** ~250–350 payers at ARPA R$50 after fees/tax buffer.  
- **R$40k MRR:** ~800 payers at ARPA R$50, or ~570 at ARPA R$70.

### LTV / CAC (HYPOTHESIS)

`LTV ≈ ARPA * gross_margin * (1/churn)`  
If churn 6%/mo, margin 75%, ARPA 50 → LTV ≈ 50*0.75*(1/0.06) ≈ **R$625**.  
CAC payback &lt; 3 months ⇒ CAC ≤ ~R$150 blended — requires organic/content-heavy GTM.

---

## Milestone back-solve

| Milestone | Payers @ R$50 ARPA | Traffic hyp (2% visit→signup, 5% signup→paid) |
|---|---|---|
| First paid | 1 | Concierge |
| R$1k MRR | ~20 | Small community |
| R$10k | ~200 | SEO+YouTube compounding |
| R$30k | ~600 | Retention engine |
| R$100k | ~2.000 or higher ARPA / B2B | Expansion phase |

---

## AI routing (margin protection)

1. Free: **rules only**.  
2. Paid default: mini model structured explanation.  
3. Escalation: stronger model if confidence &lt; threshold.  
4. Cache by `(mesh_hash, printer, material, intent, ruleset_version)`.  
5. Circuit breaker: disable AI features if daily spend &gt; cap.

---

## Accountant / tax

**UNKNOWN.** Model scenarios at 0%, 10%, 16% effective on revenue until professional advice. Do not present net income as FACT.
