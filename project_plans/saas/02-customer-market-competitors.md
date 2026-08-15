# 02 — Customer, market & competitors

**Snapshot:** 2026-08-15  
**Related:** [03-positioning-business-model.md](03-positioning-business-model.md) · [12-go-to-market.md](12-go-to-market.md) · [sources.md](sources.md)

---

## Segment ranking (8+)

| Rank | Segment | 6-mo fit | Why |
|---|---|---|---|
| 1 | Intermediate hobbyists (A1 Mini / Bambu) | **Primary** | Pain + ability to apply Studio steps; matches repo |
| 2 | Etsy/ML/small commercial sellers | **Secondary** | Recurring value (history/batch); higher WTP hypothesis |
| 3 | Miniature/character makers | Nested in #1 | High support/detail pain; good content hooks |
| 4 | Functional-part makers | Nested | Strength/walls knowledge exists |
| 5 | First-printer beginners | Reject now | Support cost explosion; Studio defaults often “good enough” |
| 6 | Small print farms | Later | Overlaps fleet software (SimplyPrint etc.) |
| 7 | Makerspaces/schools | Reject now | Procurement cycles; education SKUs elsewhere |
| 8 | Professional bureaus | Reject now | Need quoting/MES; different product |

**DECISION:** Primary ICP = intermediate BR Bambu A1 Mini hobbyist; secondary = micro-seller 1–3 printers. Reject schools/enterprise/API for first 6 months.

---

## Segment cards (condensed)

### Intermediate hobbyist (Primary)

- **JTBD:** Stop wasting filament/time on downloaded models; know orientation/supports/profile before print.  
- **Trigger:** New printer, failed print, complex mini/figurine, PETG first try.  
- **Workaround:** YouTube, MakerWorld presets, Discord, ChatGPT, trial-and-error.  
- **Pain:** Frequent (weekly–monthly); severity medium–high when overnight fails.  
- **Spend:** Filament R$80–200/kg class locally varies; UNKNOWN exact; time 2–8h per failure **HYPOTHESIS**.  
- **Desired:** Exact Studio clicks + why + confidence.  
- **Trust objections:** “Will this ruin my print?” / upload IP.  
- **WTP hyp:** R$20–60/mo if 1+ failure avoided/month.  
- **Channel:** YouTube PT, SEO “A1 Mini suporte árvore”, Telegram/Discord BR.  
- **Retention:** History + outcome loop + better second print.  
- **Why not buy:** Free defaults work; privacy.  
- **Repo fit:** **High**.

### Micro-seller (Secondary)

- **JTBD:** Repeatable quality for listings; record what worked.  
- **Trigger:** Return/complaint; scaling from 1→N SKUs.  
- **Workaround:** Personal notes, screenshots.  
- **WTP hyp:** R$80–200/mo.  
- **Repo fit:** Medium (need history/batch — Phase 2–3).

### Beginner — rejected

Support minutes dominate; free Studio + tutorials win; bad for solo premium brand.

---

## Discovery interview script (OPTIONAL — skipped)

**DECISION (2026-08-15):** Founder opted out of formal discovery interviews. Script retained below only if later revived. Validation of **pain** = community internet synthesis; validation of **WTP** = paid concierge pilots.

### Script (15 questions — archived)

1. Tell me about the last three things you printed.  
2. Walk me through your last *failed* print from file open to trash/bin.  
3. What did you change next, if anything?  
4. Which slicer and printer do you use day-to-day?  
5. When you download a model, what do you check before hitting print?  
6. How do you decide orientation and supports today?  
7. How many hours in the last 30 days did you spend fixing prints or settings?  
8. Roughly how much filament did you scrap in the last 30 days?  
9. What tools/sites do you already pay for related to 3D printing?  
10. Have you used ChatGPT/Claude for slicer settings? What happened?  
11. What would make you trust a recommendation enough to print overnight unattended?  
12. Would you upload a proprietary model to a cloud tool? Why/why not?  
13. If a tool gave a model-specific plan with Studio paths, what must it include?  
14. **Van Westendorp:** At what monthly price is this too expensive / expensive but consider / bargain / too cheap to trust?  
15. If this existed tomorrow, what would stop you from trying it?

**Recruitment / spreadsheet:** deferred (N/A while interviews skipped).

---

## Community evidence (internet synthesis) — replaces interview pain gate

**Label:** **INFERENCE** from public communities + repo wiki absorption — **not** population statistics. Bias: English-heavy forums, survivors who post, BR under-captured online.

**Sources used (access 2026-08-15):** Bambu forum threads (first layer / adhesion), LatAm pricing thread, Obico/OctoEverywhere product existence (during-print AI demand), Minimal3DP free assistant (settings confusion), FixMyPrint patterns absorbed in `docs/projeto/fontes-e-atribuicao.md`, BR retail/content discourse around A1 Mini plug-and-play.

### Theme clusters (relative, qualitative)

| Theme | Relative signal | Product implication |
|---|---|---|
| Orientation / supports uncertainty | **Very high** | Core of print plan + tree vs normal |
| First layer / adhesion / PEI wash | **Very high** (A1/A1 Mini threads) | Checklist + plate/temp gates; not “AI magic” |
| Profile / hundreds of settings confusion | **High** | Exact Studio paths; Minimal3DP proves demand for *settings help* |
| Material / moisture / PETG stringing | **High** | Material pages + dry gates |
| Lost detail on minis / characters | **High** in hobby niches | Mini/character profiles already in repo |
| Mesh defects / non-manifold | **Medium** | `inspect-mesh` + optional repair |
| Cost/time uncertainty (sellers) | **Medium** | Studio plan later; don’t lead with cost calc |
| Post-failure spaghetti anxiety | **High** but **different stage** | Obico/OctoEverywhere — complementary, not our MVP |
| Privacy / proprietary models | **Medium** (sellers) | Delete-now + no-train default |
| BR hardware price pain | **High** anecdotally | Waste avoidance = stronger ROI narrative |

### What internet evidence does **not** prove

- Willingness to pay for *advice SaaS* (people complain for free).  
- That A1 Mini TAM in Brazil is large enough for R$40k MRR.  
- That users prefer plan over ready `.3mf`.

**DECISION:** Treat table above as **accepted pain input**. Keep **paid pilots** as the commercial truth serum.

---

## Competitor / substitute matrix (≥15)

Prices accessed **2026-08-15** unless noted. Currency as published.

| Competitor | Category | ICP | Stage | Promise | Price (verified) | Free? | Strength | Weakness | Threat |
|---|---|---|---|---|---|---|---|---|---|
| Bambu Studio | Slicer | Bambu owners | Pre-print | Official profiles | Free | Yes | Defaults + ecosystem | Generic to *this* mesh intent | **Critical substitute** |
| OrcaSlicer | Slicer | Power users | Pre-print | Advanced control | Free (OSS) | Yes | Calibration depth | Complexity | High |
| PrusaSlicer | Slicer | Prusa/cross | Pre-print | Reliable OSS | Free | Yes | Trust | Not Bambu-native | Med |
| UltiMaker Cura | Slicer | Broad FDM | Pre-print | Profiles marketplace | Free | Yes | Ubiquity | Weaker Bambu path | Med |
| Minimal3DP Orca Assistant | Settings advisor | Orca users | Pre-print | Research-based priorities | Free, no reg ([launch post](https://minimal3dp.com/blog/orcaslicer-expert-assistant-launch/)) | Yes | Clear UX | Not mesh-specific geometry | **High** (free advice) |
| iamRapid orientation tool | Utility | General | Pre-print | Orientation/support calc | Freemium tool page | Partial | Focused | Narrow; not full recipe | Med |
| SimplyPrint | Fleet/cloud | Hobby→farm | During/ops | Manage printers | Free; Basic **$5.99**; Pro **$9.99**; Farm **$39.99**/mo USD ([pricing](https://simplyprint.io/pricing)) | Yes | Ops suite | Not printability coach | Low overlap |
| 3DPrinterOS | Fleet | Edu/biz | Ops | Fleet + cloud slice | **$19**/mo /2 printers ([pricing](https://www.3dprinteros.com/pricing-plans)) | Trial | Org features | Wrong ICP | Low |
| AstroPrint | Fleet | Home/fleet | Ops | Remote + slice | Free; Premium **$9.90**/mo ([pricing](https://www.astroprint.com/plans-and-pricing)) | Yes | Remote | Ops not recipe | Low |
| OctoEverywhere | Remote/AI fail | Octo/Klipper | During | Remote + AI detect | Free; Supporter **$4.99**; Elite **$9.99**/mo ([supporter](https://octoeverywhere.com/supporter)) | Yes | Failure AI | Post-start, not pre-plan | Med (AI narrative) |
| Obico | Failure AI | Camera users | During | Watch for spaghetti | Cloud/self-host ([page](https://www.obico.io/failure-detection.html)) | Freemium | Detection | Not pre-print plan | Med |
| MeshInspector | Mesh CAD | Pros/makers | Mesh | Inspect/repair | $0; **$300**/yr; **$790**/yr ([pricing](https://meshinspector.com/pricing/)) | Yes | Mesh power | No print recipe | Med (repair) |
| Formware STL Repair | Repair util | Anyone | Mesh | Fix STL | Free tool; API **€100**/mo start ([page](https://formware.co/onlinestlrepair)) | Yes | Simple repair | No orientation/profile | Med |
| Meshy STL Repair | Repair | Creators | Mesh | AI mesh tools | Varies (verify at purchase) | Partial | Brand | Not FDM coach | Low–Med |
| 3DPCC / cost calcs | Calculator | Sellers | Quote | Cost estimate | Often free | Yes | Clear ROI | No geometry printability | Low |
| ChatGPT/Gemini/Claude | LLM | All | Advice | Answer anything | Sub / free tiers | Yes | Ubiquitous | Hallucinated settings; no mesh facts | **Critical substitute** |
| YouTube + Reddit + forums | Community | All | Advice | Social proof | Free | Yes | Trust/stories | Not model-specific automated | **Critical** |

**3DOptimizer:** activity status **UNKNOWN** this pass — treat as low threat until re-checked.

### Positioning map (axes)

- Generic advice ←→ **Model-specific analysis** (target right)  
- Post-failure monitoring ←→ **Pre-print prevention** (target right)  
- Expert complexity ←→ Beginner clarity (target center-right clarity)  
- Free utility ←→ Outcome premium workflow (target paid middle)  
- Local/private ←→ Cloud learning (default private; opt-in learning)

### Free competitor answer

Users already get free slicing and free generic advice. They would pay this product for:

1. **Model-specific geometry facts** tied to **their** printer/material/intent;  
2. **Exact Studio menu paths** with confidence + citations;  
3. **Comparable scenarios** (quality vs speed) without thrashing;  
4. **Traceable history** of what worked (sellers);  
5. **Privacy-controlled** uploads with delete-now — if trust copy is credible.

If Phase 0 shows they only want G-code and refuse advice SaaS → **pivot** to export/concierge or NO-GO.

---

## Market notes (BR)

- A1 Mini actively discussed as beginner/prosumer option in BR content (e.g. comparison articles 2026) — **FACT that discourse exists**, not a TAM number.  
- LatAm users report high local hardware prices vs US/EU ([forum](https://forum.bambulab.com/t/3d-printing-access-perspectives-from-latin-america/67450)) — **INFERENCE:** avoided waste has higher perceived value.  
- **UNKNOWN:** number of A1 Mini owners in Brazil — do not invent.
