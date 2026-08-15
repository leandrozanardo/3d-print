# Sources Register

**Access date for all rows:** 2026-08-15  
**Purpose:** Evidence base for SaaS planning docs under `project_plans/saas/`.  
**Reliability scale:** `high` (primary vendor page fetched) · `medium` (secondary aggregator / partial) · `low` (forum/blog anecdotal) · `blocked` (fetch failed)

| id | title | org | URL | evidence (summary) | reliability | licensing / notes |
|---|---|---|---|---|---|---|
| S-01 | SimplyPrint Plans Overview / Pricing | SimplyPrint | https://simplyprint.io/pricing | **FACT:** Personal Free (2 printers); Basic **$5.99**/mo; Pro **$9.99**/mo; Print Farm **$39.99**/mo; Enterprise $299/mo. Also Cloud Slicer $4.99; Filament Manager $5.99; Education School $40/mo. Yearly ~15% off most ecosystem plans. | high | Public pricing page; USD; may localize. Do not scrape feature matrix beyond fair use citation. |
| S-02 | 3DPrinterOS Pricing Plans | 3DPrinterOS | https://www.3dprinteros.com/pricing-plans | **FACT:** Premium **$19**/month / **2 printers** / 1 user; 14-day trial; Education & Enterprise custom. Claims multi-brand printers incl. Bambu/Prusa/Creality. | high | Public marketing; “300K active users” is vendor claim — treat as **UNKNOWN** independently. |
| S-03 | OctoEverywhere Supporter Perks | OctoEverywhere | https://octoeverywhere.com/supporter | **FACT:** Free tier (3 printers); Standard Supporter **$4.99**/mo (5 printers); Elite **$9.99**/mo (10 printers); yearly ~30% save; AI failure detection / webcam perks. Community-funded positioning. | high | Public pricing; USD/EUR/GBP UI. |
| S-04 | MeshInspector Pricing | MeshInspector | https://meshinspector.com/pricing/ | **FACT:** Community **$0**; Makers **$300**/user/year; Professional **$790**/user/year; 30-day trial of Professional → falls back to Community. Mesh repair/inspection focus. | high | Commercial use allowed on all plans per FAQ on page. |
| S-05 | Supabase Pricing | Supabase | https://supabase.com/pricing | **FACT:** Free $0; **Pro from $25**/mo; Team $599/mo; Enterprise custom. Compute separate; Pro includes $10 compute credits (Micro). MAU/storage overages listed. | high | Org-based billing; verify before contracting. |
| S-06 | Stripe Pricing (Brasil) | Stripe | https://stripe.com/br/pricing | **FACT:** Cartões nacionais **3,99% + R$ 0,39**; Pix **1,19%**; Stripe Billing **0,7%** do volume Billing; boleto R$ 3,45; internacional cartão +2%; contestações R$ 55. | high | Preços BR sujeitos a mudança; IC+/custom for volume. |
| S-07 | Resend Pricing | Resend | https://resend.com/pricing | **FACT:** Transactional Free 3,000 emails/mo ($0); Pro from **$20**/mo (50k); Scale tiers $90+; Marketing contacts-based from $0/$40+; Automations overage $0.0015/run on paid. | high | SOC2 Type II claimed on page. |
| S-08 | AGPL compliance of Bambu Studio | Bambu Lab | https://blog.bambulab.com/agpl-compliance-of-bambu-studio/ | **FACT:** Bambu states Studio is AGPL open-sourced; closed-source networking plugin claimed independent/distributed separately; asserts AGPL compliance after legal review. | high | Legal interpretation is vendor’s; **ASSUMPTION** we avoid reverse-engineering plugin. Cite carefully. |
| S-09 | OpenAI API Pricing (primary) | OpenAI | https://developers.openai.com/api/docs/pricing | **RESEARCH_BLOCKED:** direct fetch **timeout** on 2026-08-15. | blocked | Must re-fetch before budgeting production. |
| S-10 | GPT-4o mini model page | OpenAI | https://developers.openai.com/api/docs/models/gpt-4o-mini | **INFERENCE (secondary fetch/search):** lists ~**$0.15** input / **$0.60** output per 1M tokens (Batch/cached discounts exist). Used as planning proxy while S-09 blocked. | medium | Confirm against S-09 when unblocked; prices change. |
| S-11 | GPT-4o mini announcement pricing | OpenAI | https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/ | **FACT (historical announce):** 15¢/1M input, 60¢/1M output. | medium | May be outdated vs live pricing table. |
| S-12 | GPT-4o-mini aggregator | LLMReference | https://www.llmreference.com/model/gpt-4o-mini/openai-api | Secondary cites **$0.15 / $0.60** per 1M. | medium | Non-authoritative mirror. |
| S-13 | Cloudflare R2 product page | Cloudflare | https://www.cloudflare.com/developer-platform/products/r2/ | **RESEARCH_BLOCKED:** direct fetch **timeout** on 2026-08-15. | blocked | Use S-14. |
| S-14 | Cloudflare R2 Pricing docs | Cloudflare | https://developers.cloudflare.com/r2/pricing/ | **FACT (via search snippet / docs index 2026):** Standard storage **$0.015**/GB-month; Class A **$4.50**/M; Class B **$0.36**/M; **egress free**; free tier 10 GB + 1M A + 10M B; IA class cheaper storage + retrieval fee. Primary HTML fetch timed out — treat as **medium-high**, re-verify. | medium | Prefer live docs before infra lock-in. |
| S-15 | AstroPrint Plans and Pricing | AstroPrint | https://www.astroprint.com/plans-and-pricing | **FACT:** Basic **Free** (2 printers, 1 user, 1GB); Premium **$9.90**/mo (5 printers then $5/ea, 10GB); Business & Education quote. | high | Alternate host `astroprint.net` mirrors plans. |
| S-16 | AstroPrint overview | 3Dnatives | https://www.3dnatives.com/en/astroprint-allows-you-to-control-the-3d-printing-process-220820234/ | Secondary confirmation of Free / $9.90 / custom tiers. | medium | Editorial; may lag vendor. |
| S-17 | Obico Cloud Pricing | Obico | https://app.obico.io/ent_pub/pricing/ | **FACT:** Free $0 (1 printer, 10 AI Detection Hours, basic stream); AI Premium **$6.99**/mo billed annually ($83.88/yr) / monthly higher (**$8.99** per docs); +**$2**/printer; DH packs. Next-gen AI claims on page. | high | USD; self-host option exists (separate). |
| S-18 | Obico AI Premium vs Free docs | Obico | https://www.obico.io/docs/user-guides/upgrade-to-pro/ | **FACT:** Documents $6.99 annual / $8.99 monthly; feature deltas (25 FPS, 50 DH, etc.). | high | URL still says “pro” historically. |
| S-19 | Obico next-gen AI pricing blog | Obico | https://www.obico.io/blog/next-gen-ai-failure-detection-general-release/ | **FACT:** Plan rename to AI Premium; new subscriber rates effective May 1, 2026; loyalty pricing for existing. | high | Shows AI infra cost pressure — relevant to our COGS assumptions. |
| S-20 | Formware 3D Download / Buy | Formware | https://www.formware.co/slicer/download | **FACT:** Commercial license **€299.95** (2 PCs, perpetual, updates); 30-day trial; Windows; resin/DLP focus; no printer controller in slicer. Personal tier referenced in FAQ. | high | EU VAT note +21% without valid VAT. Personal price not fully rendered in fetch (see S-21). |
| S-21 | Formware 3D article | 3Dnatives | https://www.3dnatives.com/en/formware-3d-slicer-support-generation-software-for-3d-printing-211020244/ | **FACT (secondary):** Personal **€129.95**; Commercial **€299.95**. | medium | Use to fill Personal tier gap from S-20 UI. |
| S-22 | Minimal 3DP Quote Core | Minimal 3DP | https://go.minimal3dp.com/quote/core | **FACT:** Deterministic quote UI (machine/material profiles, volume, labor, margin, platform fee %). Login required for profiles. Adjacent to Microfarm quoting JTBD. | high | Product surface; pricing of SaaS itself **UNKNOWN** from this page alone. |
| S-23 | iamRapid Pricing / Cost education | iamRapid | https://iamrapid.com/pricing/ | **FACT:** Instant quote service bureau (India); dynamic FDM/SLA/SLS/MJF; educational formulas for machine/material/post; sample item ~₹820+GST. Not a Hobby slicer SaaS. | high | Useful analog for quote-engine UX; geo ≠ BR. |
| S-24 | iamRapid Instant Quotation | iamRapid | https://iamrapid.com/instant-quotation/ | Describes upload → instant quote flow factors (tech, material, infill, complexity). | high | Same org as S-23. |
| S-25 | OrcaSlicer repository | SoftFever / community | https://github.com/SoftFever/OrcaSlicer | **FACT:** Open-source G-code generator supporting Bambu/Prusa/etc.; major free substitute. Stars ~15k at fetch. | high | Check repo LICENSE before redistribution; using as competitor/substitute reference only. |
| S-26 | A1 Mini first-layer guide (Clube 3D Brasil) | Clube 3D Brasil | https://clube3dbrasil.com/corrigir-problemas-primeira-camada/ | **RESEARCH_PARTIAL:** Search indexed full guide on hotend screw looseness / 1ª camada A1 & A1 Mini; **direct fetch returned 404** on 2026-08-15. Use as **pain/context**, not market size. | low–medium | Re-check URL; copyright — do not copy article body into product. |
| S-27 | A1 series first-layer troubleshooting (PT) | Bambu Lab Wiki | https://wiki.bambulab.com/pt-br/a1-mini/troubleshooting/print-issues-troubleshooting | **FACT:** Official troubleshooting for first layer too low / hotend movement; heater assembly clip checks; recalibrate. Pain/context. | high | Vendor docs — follow their license/ToS for reuse. |
| S-28 | Bad first layer on A1 mini | Bambu Lab Community Forum | https://forum.bambulab.com/t/bad-first-layer-on-a1-mini/68422 | User reports gaps/underextrusion first layer; cleaning & flow tips. **Pain/context only.** | low | Anecdotal; not TAM. |
| S-29 | Having trouble laying down first layer | Bambu Lab Community Forum | https://forum.bambulab.com/t/having-trouble-laying-down-first-layer/51164 | Adhesion issues; bed temp; raft behavior. **Pain/context.** | low | Anecdotal. |
| S-30 | Sudden bed adhesion failures | Bambu Lab Community Forum | https://forum.bambulab.com/t/sudden-bed-adhesion-failures/104072 | Soap wash vs IPA debate for PEI. **Pain/context.** | low | Anecdotal. |
| S-31 | Poor first layer | Bambu Lab Community Forum | https://forum.bambulab.com/t/poor-first-layer/151339 | Pinholes / line width / Arachne discussion. **Pain/context.** | low | Anecdotal. |
| S-32 | Bambu A1 Mini common problems | WhyItFailed | https://whyitfailed.fyi/blog/bambu-lab-a1-mini-common-problems-and-fixes | Secondary compilation: AMS Lite tangles, moisture, first-layer misreads, open-frame traits. **Pain/context**, not market sizing. | low–medium | Independent blog; verify claims. |
| S-33 | AstroPrint FitGap pricing table | FitGap | https://us.fitgap.com/products/004555/astroprint | Secondary matrix matching S-15. | medium | Aggregator. |
| S-34 | Cloudflare R2 pricing explainer 2026 | BudgetForge | https://www.budgetforge.dev/tools/cloudflare-r2-pricing-2026 | Restates S-14 numbers; claims July 2026 rate card. | medium | Non-primary; cross-check S-14. |
| S-35 | Formware Online STL Repair | Formware | https://formware.co/onlinestlrepair | **FACT:** Free online STL repair; files deleted after download or 6h; API beta from **€100**/mo unlimited private queue (contact). Dev note 13 Feb 2026 capacity. | high | Free-tool substitute for repair-only JTBD; API price anchors B2B repair floor. |
| S-36 | OrcaSlicer Expert Assistant launch | Minimal 3DP | https://minimal3dp.com/blog/orcaslicer-expert-assistant-launch/ | **FACT:** Free browser app, no registration; priority sliders; 130+ TDS; app at settings.minimal3dp.com; affiliate support model. | high | Critical free substitute for *settings advice* without mesh-specific geometry. |
| S-37 | Obico Failure Detection marketing | Obico | https://www.obico.io/failure-detection.html | **FACT:** AI watches camera for spaghetti; alerts/pause; Octo/Fluidd/Mainsail. Pricing on separate pages (S-17). | high | Post-failure / during-print category — different stage than pre-print plan. |
| S-38 | Bambu Lab LatAm pricing discussion | Community | https://forum.bambulab.com/t/3d-printing-access-perspectives-from-latin-america/67450 | Users report BR hardware prices ~2–2.5× vs US/EU due to tax cascade. **Pain/context**, not TAM. | low | Anecdotal multi-user thread. |
| S-39 | Repo playbook / core (first-party) | This project | https://github.com/leandrozanardo/3d-print | Local hybrid system evidence for audit. | high | Internal. |

---

## Fetch status matrix (2026-08-15)

| URL class | Status |
|---|---|
| SimplyPrint, 3DPrinterOS, OctoEverywhere, MeshInspector, Supabase, Stripe BR, Resend, Bambu AGPL blog | **Fetched OK** |
| AstroPrint pricing, Obico pricing, Formware download, Minimal3DP quote, iamRapid pricing, OrcaSlicer GitHub | **Fetched OK** |
| OpenAI `/api/docs/pricing` | **RESEARCH_BLOCKED** (timeout) — use S-10/S-11/S-12 proxies |
| Cloudflare R2 marketing URL | **RESEARCH_BLOCKED** (timeout) — use S-14 docs evidence |
| Cloudflare R2 docs HTML | Search evidence OK; full page fetch timeout — **re-verify** |
| Clube3DBrasil first-layer article | **404 on fetch**; search snippet exists — **RESEARCH_PARTIAL** |
| Bambu Forum threads | Search/synthesis used for pain context |

---

## How evidence maps to planning

| Planning use | Source IDs |
|---|---|
| Price anchoring Hobby (~USD 5–10) | S-01, S-03, S-15, S-17 |
| Fleet SaaS is different JTBD | S-01, S-02 |
| Mesh tool adjacent | S-04 |
| Infra COGS | S-05, S-06, S-07, S-14 |
| AI token proxy | S-09–S-12 |
| AGPL caution | S-08 |
| Free slicer substitute | S-25 (+ Bambu Studio known AGPL ecosystem) |
| Quote-engine inspiration (Microfarm) | S-22, S-23, S-24 |
| Resin non-goal | S-20, S-21 |
| BR A1 Mini pain (not TAM) | S-26–S-32 |

---

## Licensing / citation rules for this folder

1. **FACT** prices may be quoted in planning docs with link + access date.  
2. Do **not** republish Bambu Wiki / Clube articles verbatim into product UI.  
3. OrcaSlicer / AGPL code: no copying into SaaS codebase from this planning step (no SaaS code here anyway).  
4. Forum posts = qualitative pain only; never invent market size from thread counts.  
5. Any **RESEARCH_BLOCKED** item must be refreshed before financial commitments.

---

## Refresh checklist

- [ ] Re-fetch OpenAI pricing (S-09)  
- [ ] Re-fetch Cloudflare R2 primary + docs (S-13/S-14)  
- [ ] Resolve Clube3DBrasil URL (S-26)  
- [ ] Capture Formware Personal price from live UI (S-20)  
- [ ] Minimal3DP commercial plan page if published beyond Quote Core  
