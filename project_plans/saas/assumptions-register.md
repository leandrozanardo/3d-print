# Assumptions Register

**Date:** 2026-08-15  
**Owner default:** Founder (solo)  
**Status values:** `open` · `validating` · `validated` · `invalidated` · `accepted-risk`

| id | assumption | owner | validation method | deadline | impact | status |
|---|---|---|---|---|---|---|
| A-01 | Hobby + Microfarm are both viable early segments; Hobby is cheaper to acquire as wedge | Founder | Pilot mix + signup segment tags (no interviews) | 2026-10-15 | High — positioning & pricing | accepted-risk |
| A-02 | A1 Mini owners in Brazil have frequent, costly failure/setup pain not solved by stock Studio presets | Founder | Community memo SIGNED + pilot outcomes | 2026-10-15 | Critical — wedge validity | **accepted-risk** (memo signed 2026-08-15) |
| A-03 | Users will keep free slicers (Bambu Studio/Orca) as execution layer and still pay for recipes/AI guidance | Founder | Paid pilots conversion | 2026-10-30 | Critical — substitute risk | open |
| A-04 | Deterministic rules core + AI premium (guarded) beats AI-only suggestions for trust and safety | Founder | E02 A/B + safety evals | 2027-02-28 | High — architecture | open |
| A-05 | Solo founder with Cursor+ChatGPT can reach Phase 1 MVP after Phase 0 without cofounder | Founder | Track EU burned vs roadmap; time-to-pilot | 2027-01-15 | High — feasibility | open |
| A-06 | R$40k MRR is a useful stretch goal but not a near-term kill metric | Founder | Revisit unit economics quarterly | 2026-11-15 | Medium — strategy hygiene | accepted-risk |
| A-07 | Brazil-first PT-BR content/SEO outperforms EN-first for early traction | Founder | Organic signup geo mix; content CTR | 2027-03-01 | High — GTM | open |
| A-08 | Pix-first checkout will outperform card-first for BR hobbyists | Founder | E03 experiment | 2027-01-31 | Medium — conversion | open |
| A-09 | Users will self-report print outcomes at ≥35% if nudged | Founder | E04 + funnel metrics | 2027-01-31 | High — north star integrity | open |
| A-10 | Concierge validation generalizes to self-serve product value | Founder | Compare pilot success vs early product cohorts | 2027-03-15 | Critical — VALIDATE FIRST bridge | open |
| A-11 | AI COGS can stay <25% of ARPU with credits/caps on Hobby plan | Founder | Pilot cost ledger; OpenAI usage export | 2027-02-28 | High — margins | open |
| A-12 | Supabase Pro (~$25+) + Stripe + Resend is enough infra until ≥100 paying | Founder | Cost dashboard vs MRR | 2027-04-01 | Medium — burn | open |
| A-13 | Cloudflare R2 (or equivalent zero-egress object storage) is preferable for mesh blobs vs heavy egress stores | Founder | Cost model on 100GB + download patterns | 2026-12-15 | Medium — COGS | open |
| A-14 | Legal risk of AGPL/Bambu Studio plugin ecosystem can be avoided by exporting human-executable Studio settings (no closed plugin reverse engineering) | Founder | Counsel light review; architecture decision record | 2026-11-30 | Critical — legal | open |
| A-15 | Microfarm quote pain is monetizable at higher ARPU than Hobby | Founder | Studio-tier pilots / later outreach | 2027-03-01 | High — mix for R$40k path | open |
| A-16 | Community channels (WhatsApp/Telegram/forums) will allow non-spam **pilot** recruitment | Founder | Outreach → paid offer conversion | 2026-09-30 | Medium — Phase 0 speed | open |
| A-17 | Any-FDM aspiration must wait until A1 Mini wedge shows retention | Founder | Phase 3 exit review | 2027-06-01 | High — focus | accepted-risk |
| A-18 | Fleet-management competitors (SimplyPrint, 3DPrinterOS) are not primary substitutes for our JTBD | Founder | Pilot “tools used” notes | 2026-10-15 | Medium — positioning | accepted-risk |
| A-19 | Failure-detection tools (Obico, OctoEverywhere) are complementary, not direct substitutes | Founder | Product stage map (pre vs during) | 2026-10-15 | Medium — positioning | accepted-risk |
| A-20 | Mesh-repair tools (MeshInspector) address adjacent but different buyer (CAD repair vs print recipe) | Founder | Competitive matrix | 2026-10-15 | Low–Medium | accepted-risk |
| A-21 | Service-bureau quoters (iamRapid, Minimal3DP-style) inform Microfarm features but are not Hobby substitutes | Founder | Positioning review | 2026-11-15 | Medium | accepted-risk |
| A-22 | Resin-focused slicers (Formware) are out of MVP scope | Founder | Explicit non-goal in GTM | 2026-08-15 | Low | validated |
| A-23 | 5 paid pilots are enough signal to start Phase 1 if success rate ≥ thresholds | Founder | Phase 0 kill/go memo | 2026-11-30 | High — process | open |
| A-24 | Privacy-safe telemetry (no raw prompts/meshes) still allows debugging via opt-in bundles | Founder | Support dry-run | 2027-01-15 | Medium | open |
| A-25 | Founder can run 20 interviews in ≤6 weeks | Founder | — | — | — | **invalidated** (D-20260815-20 skip interviews) |
| A-26 | Price anchoring vs SimplyPrint/Obico (~USD 5–10) suggests Hobby BR pricing in tens of BRL, not hundreds | Founder | Pilot price accept/reject | 2026-10-30 | High — pricing | open |
| A-27 | gpt-4o-mini-class pricing (~$0.15/$0.60 per 1M tok) is viable for explanation features if prompts bounded | Founder | Token budgets in pilots | 2027-02-28 | High — AI premium | open |
| A-28 | Landing + SEO can be built without full app in Phase 0 | Founder | Ship 1 landing | 2026-09-15 | Low | open |
| A-29 | Confirmed successful prints correlate with retention better than NPS alone | Founder | Cohort retention vs success count | 2027-04-01 | High — north star | open |
| A-30 | “VALIDATE FIRST” means no Phase 1 P0 engineering until Phase 0 exit | Founder | Roadmap compliance audit | continuous | Critical — process | validated |

### Review cadence

- Weekly: move `validating` rows.  
- At each Phase gate: force status update on Critical impact rows.  
- Invalidated assumptions must spawn a DECISION in `decisions-log.md`.
