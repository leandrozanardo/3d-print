# 12 — Go-to-Market

**Date:** 2026-08-15  
**Market:** Brazil-first · Hobby + Microfarm  
**Wedge:** Bambu Lab A1 Mini (despite any-FDM aspiration)  
**Positioning:** AI premium *on top of* deterministic rules core · not “another cloud slicer”  
**Primary substitutes:** Free slicers (Bambu Studio, OrcaSlicer, PrusaSlicer)  
**Founder capacity:** Solo · Cursor + ChatGPT  
**Revenue ambition:** R$40k MRR — **labeled AGGRESSIVE / HYPOTHESIS**, not a Phase 0 commitment.

---

## 1. Strategic posture

| Label | Statement |
|---|---|
| **DECISION** | VALIDATE FIRST: no paid ads until **concierge pilots** prove willingness-to-pay. Pain assumed from community internet (interviews skipped). |
| **DECISION** | Compete on *successful prints / less waste / less time-to-good-recipe*, not on fleet dashboards (SimplyPrint/3DPrinterOS space). |
| **INFERENCE** | BR communities over-index on A1/A1 Mini pain (1ª camada, PETG, AMS Lite) → content wedge is local language + local filament brands. |
| **ASSUMPTION** | Microfarm (2–10 printers) will pay more and churn less than pure hobby if quoting/consistency pain is real. |
| **HYPOTHESIS** | Users will pay for AI *explanations + guarded recommendations* even while keeping free slicers as execution layer. |
| **UNKNOWN** | ARPU mix Hobby vs Microfarm that makes R$40k MRR reachable. |

### Rough math (illustrative only — **HYPOTHESIS**)

| Mix | ARPU | Users for R$40k MRR |
|---|---|---|
| Hobby-heavy | R$49 | ~816 |
| Mixed | R$79 | ~506 |
| Microfarm-heavy | R$149 | ~268 |

**INFERENCE:** R$40k MRR is multi-year for solo unless Microfarm ARPU and retention are strong; use as north aspiration, not Phase-1 kill gate.

---

## 2. Phase 0 — Concierge validation

**Goal:** Prove that a human+rules+AI workflow can produce *confirmed successful prints* better than “só fatiar no Studio.”

### 2.1 Concierge offer (script)

> “Envie o STL/3MF + impressora (A1 Mini) + material + objetivo. Em 24–48h devolvo receita (orientação, perfil, supports, riscos) e um checklist. Você fatia no Bambu Studio. Depois me confirma se imprimiu OK.”

| Element | Spec |
|---|---|
| Price | R$0–R$97 one-shot (test WTP) — **DECISION:** start paid small, not free forever |
| SLA | Best-effort 48h |
| Delivery | Markdown/PDF recipe + optional Loom |
| Capture | Consent + outcome form |
| Cap | Max 10 concurrent concierge clients |

### 2.2 Success definition (Phase 0 exit)

| Metric | Pass | Fail / kill |
|---|---|---|
| Community pain memo | Founder signs off on 02 themes | Founder rejects themes as wrong |
| Concierge jobs delivered | ≥10 attempted / ≥5 paid | &lt;5 serious offers made |
| Confirmed successful prints | ≥30% among feedback | &lt;30% success among feedback |
| Paid pilots signed | ≥5 | 0 after ≥10 paying attempts |
| Report actionability | Average ≥3/5 | &lt;3/5 |
| Landing intent CTA | Non-zero interest after ≥200 UV (**HYPOTHESIS** floor) | Flat zero |

---

## 3. Interviews — SKIPPED

**DECISION D-20260815-20:** Formal interview protocol archived in `02-customer-market-competitors.md`. Do not block Phase 0 on interview count.

### 3.1 Recruit channels (BR) — use for **pilots**, not interviews

| Channel | Tactic | Label |
|---|---|---|
| Grupos WhatsApp/Telegram makers | Oferta concierge paga | **ASSUMPTION** |
| Discord/Reddit BR 3D | Soft CTA | |
| Instagram makers A1 Mini | DM after value | |
| Marketplace sellers | Microfarm pilots | **HYPOTHESIS** |
| Personal network | Warm intros | Highest conversion |

### 3.2 Screener

1. Owns A1 Mini / A1 / other FDM?  
2. Prints ≥4h/semana?  
3. Hobby vs vende peças (microfarm)?  
4. Já usa Studio/Orca/Octo/Obico/SimplyPrint?  
5. Maior dor: falha, tempo de setup, cotação, multicolor, material?

### 3.3 Interview guide (30–40 min)

| Block | Questions |
|---|---|
| Context | Printer, materials, weekly volume, income from prints |
| Last failure | Story of last failed print — cost in filament/time |
| Workflow | How they choose profile today |
| Substitutes | What they tried (YouTube, Discord, Studio presets) |
| Jobs-to-be-done | “When I __, I want __, so I can __” |
| WTP | Van Westendorp light: too cheap / bargain / expensive / too expensive |
| AI trust | Would they trust AI settings? What proof needed? |
| Microfarm | Quoting clients? How price today? |

### 3.4 Synthesis artifacts

- JTBD cards (PT-BR)  
- Pain frequency × severity matrix  
- WTP histogram  
- Kill/continue memo (1 page)

**DECISION:** Interview notes stay anonymized in `project_plans/saas/` only (no customer PII in git).

---

## 4. Five paid pilots

| # | Segment | Offer | Duration | Price (suggest) | Success criteria |
|---|---|---|---|---|---|
| P1 | Hobby A1 Mini PLA | Weekly recipe reviews | 4 weeks | R$79–149 | ≥3 confirmed successes |
| P2 | Hobby PETG | Material-specific coaching | 4 weeks | R$99–179 | PETG success without enclosure myth |
| P3 | Microfarm 2–5 printers | Quote+recipe consistency | 4 weeks | R$249–399 | Time-to-quote ↓ ≥30% (self-report) |
| P4 | Miniatures | Support/orient focus | 4 weeks | R$99–199 | Surface quality “shippable” |
| P5 | Mixed filament / AMS Lite | Multicolor waste reduction | 4 weeks | R$149–249 | Waste ↓ self-report |

**Kill criteria for pilots:** if <2 pilots renew or convert to subscription intent after 4 weeks → revisit positioning.

---

## 5. Channels for Brazil

### 5.1 SEO PT-BR (primary long-term)

| Cluster | Example intents | Intent |
|---|---|---|
| A1 Mini troubleshooting | “A1 Mini primeira camada”, “PETG A1 Mini stringing” | Capture → lead magnet |
| Recipe / profile | “perfil PLA miniatura A1 Mini” | Product |
| Microfarm | “como precificar impressão 3D” | Quote tool wedge |
| Comparisons | “OrcaSlicer vs Bambu Studio” | Trust / substitute framing |
| AI angle | “IA para fatiar 3D vale a pena?” | Category education |

**DECISION:** Content in PT-BR first; EN only after BR PMF.

### 5.2 YouTube

| Format | Cadence (8h/wk) | Cadence (15h) | Cadence (30h) |
|---|---|---|---|
| Short fail→fix | 1/2 weeks | 1/week | 2/week |
| Long recipe teardown | monthly | 2/month | weekly |
| Pilot case study | — | monthly | biweekly |

**ASSUMPTION:** face-cam + A1 Mini timelapse outperforms pure slides in BR maker niche.

### 5.3 Communities

| Community | Behavior rule |
|---|---|
| WhatsApp/Telegram | Give free mini-recipes; soft CTA to **paid pilot** |
| Bambu forums | Help first; never spam product |
| Instagram/TikTok | Before/after fail prints |
| Maker fairs (local) | Phase 2+ |

**INFERENCE:** community trust compounds slower than ads but fits solo + VALIDATE FIRST.

### 5.4 Paid ads

**DECISION:** no Meta/Google ads until ≥20 paying users and CAC hypothesis documented. Organic first.

---

## 6. SEO architecture

```
/ (home PT) 
├── /guias/                 # informational clusters
│   ├── a1-mini/
│   ├── materiais/
│   └── falhas/
├── /comparativos/          # substitutes framing
├── /ferramentas/           # free calculators (quote, waste)
├── /blog/                  # chronologic
├── /precos/                # pricing
└── /app/                   # product (auth)
```

| Rule | Detail |
|---|---|
| Canonical | Single PT locale `pt-BR` |
| Internal links | Every guide → related recipe CTA |
| Lead magnet | Checklist PDF “10 falhas A1 Mini” → email (Resend) |
| Technical SEO | Astro/Next static guides; Core Web Vitals green |
| Avoid | Doorway pages, scraped wiki mirrors (licensing) |

**DECISION:** public wiki-style guides are original PT content informed by research; do not republish Bambu Wiki verbatim.

---

## 7. First 100 paying users plan

### Funnel targets (**HYPOTHESIS**)

| Stage | Count | Notes |
|---|---|---|
| Awareness (monthly site+YT) | 5.000 | Content compound |
| Email list | 800 | Lead magnets |
| Activated free/trial | 300 | Recipe once |
| Paying | 100 | Mix Hobby/Microfarm |
| Retained M2 | ≥60 | Gross retention |

### Sequence

1. **Weeks 1–4:** Landing + concierge outreach  
2. **Weeks 3–8:** 5 paid pilots + case notes  
3. **Weeks 6–16:** SEO pillars (10 cornerstone pages)  
4. **Weeks 10–24:** waitlist → self-serve Hobby MVP (if Phase 0 pass)  
5. **Weeks 20–40:** Microfarm features + referrals

### Referral / loops

| Loop | Mechanism |
|---|---|
| Content → SEO | Each confirmed fail story → guide |
| Pilot → case | Anonymized before/after  
| Referral | 1 month free for referrer+referee (post-MVP) |
| Community | Weekly “receita da semana” |

---

## 8. Messaging (PT-BR)

| Audience | Message |
|---|---|
| Hobby A1 Mini | “Menos filamento no lixo. Receitas com regras + IA que respeitam sua A1 Mini.” |
| Microfarm | “Cotação e receita consistentes para não perder dinheiro em retrabalho.” |
| Against fleet SaaS | “Não somos dashboard de fazenda. Somos sucesso de impressão.” |
| Against free slicer only | “O fatiador é grátis. O custo é a 3ª falha. Nós atacamos a falha.” |

---

## 9. Kill criteria (GTM)

Stop or pivot if **any** hard kill hits:

| ID | Kill condition | Window |
|---|---|---|
| K1 | &lt;5 serious paid offers made despite outreach | 4 weeks |
| K2 | &lt;30% confirmed success on concierge with feedback | 10 jobs |
| K3 | 0 of ≥10 will pay anything ≥R$29 one-shot/mo equivalent | after paid offers |
| K4 | Dominant feedback: “Bambu Studio presets are enough” | qualitative majority of pilots |
| K5 | Legal/ToS conflict with Bambu cloud plugin path blocks wedge | ongoing |
| K6 | AI COGS &gt;40% of ARPU at target usage | pilot cost tracking |

**Soft pivot (not kill):** keep rules core, drop generative AI; or shift Microfarm-only quoting.

---

## 10. Competitive framing (for sales, not copy-paste)

| Player | Price signal (see `sources.md`) | Our difference |
|---|---|---|
| SimplyPrint | Free → $5.99 → $9.99 → Farm $39.99 | Fleet mgmt ≠ recipe intelligence |
| 3DPrinterOS | $19/mo / 2 printers | Enterprise fleet |
| OctoEverywhere | $4.99 / $9.99 | Remote/AI failure cam |
| Obico | Free + AI Premium ~$6.99–$8.99 | Failure detection hours |
| AstroPrint | Free / $9.90 | Cloud slice + remote |
| MeshInspector | $0 / $300/yr / $790/yr | Mesh tools, not print recipes |
| Free slicers | $0 | Execution layer we embrace |

**DECISION:** partner *with* free slicers in messaging; do not claim to replace them in MVP.
