# 03 — Positioning & business model

**Snapshot:** 2026-08-15  
**Related:** [00-executive-decision.md](00-executive-decision.md) · [05-product-requirements.md](05-product-requirements.md) · [04-pricing-unit-economics.md](04-pricing-unit-economics.md)

---

## Category

**DECISION:** *Printability Copilot / Pre-print Print Plan* — not fleet management, not failure webcam AI, not generic “AI slicer”.

**Positioning (one sentence):**  
For Bambu A1 Mini makers who hate wasting filament, *PrintPlan* (working name) turns your STL + intent into an explainable, model-specific print plan with exact Studio actions — before you print.

**Elevator:**  
Slicers give you a thousand knobs. Communities give you generic tips. We inspect *your* mesh, apply versioned rules for *your* printer and purpose, and output a ranked plan you can trust enough to run overnight — with confidence scores, not fake guarantees.

**Landing hero (draft):**  
**Upload your model. Know what will fail, what to change, and why — before you print.**  
Sub: Model-specific plans for A1 Mini (PLA/PETG). Exact Bambu Studio paths. No “perfect print” promises — clear confidence and next checks.

**Working name:** TBD (founder decision). Docs use “PrintPlan” as placeholder.

---

## Strategic options scored (1–5)

| Criterion | A Pre-print plan | B Photo failure diagnosis | C Full workspace (cost+ops) |
|---|---|---|---|
| Pain fit | 5 | 4 | 3 |
| Differentiation vs free | 4 | 3 | 2 |
| Feasibility solo | 4 | 3 | 2 |
| Trust | 4 | 3 | 3 |
| Recurring value | 3→4 w/ history | 3 | 5 |
| Margin (AI controlled) | 4 | 2 | 3 |
| Data moat path | 4 | 4 | 3 |
| Founder fit | 5 | 3 | 3 |
| **Total** | **33** | **26** | **24** |

**DECISION:** Wedge = **Option A**. Option B = Phase 3 add-on. Option C features (cost, inventory, fleet) = Later / Never-for-now vs SimplyPrint.

---

## Business model

**Primary:** Freemium subscription + metered **AI credits** (explanations, auto-tag, chat, rich compare).  
**Fallback:** Pay-per-concierge-report while software incomplete.  
**Deferred:** Affiliate filament (OK as side), white-label API, lifetime deals (**reject lifetime** while variable AI/storage costs exist).

### Value metric

Analyses completed with recommendation adoption + confirmed successful prints (north star in [14-metrics-experiments.md](14-metrics-experiments.md)).

### Packaging logic (aligned to founder “all deliverables by plan”)

| Capability | Free | Maker | Maker Pro | Studio |
|---|---|---|---|---|
| Rules-based report | Yes (quota) | Yes | Yes | Yes |
| Sample / demo | Yes | Yes | Yes | Yes |
| Scenario compare (2) | Limited | Yes | Yes | Yes |
| AI explanation / auto-classify | No / teaser | Credits | Included soft cap | Higher cap |
| History / projects | 7 days | 90 days | Unlimited* | Unlimited* |
| Repair offer | No | Optional credit | Yes | Yes |
| `.3mf` assist export | No | No | Best-effort | Yes |
| Failure chat | No | No | Credits | Included soft |
| Batch / seats | No | No | No | Yes (limits) |

\*Retention still subject to storage quotas and deletion policy.

---

## Moat thesis

**Not** the Markdown wiki alone (copyable). Moat candidates:

1. Versioned rules + citations tied to geometry features.  
2. Outcome dataset (opt-in) with human promotion gate.  
3. Brand trust: explainability + privacy + BR content.  
4. Switching cost via history/experiments.

**INFERENCE:** Without outcome loop, moat decays to content SEO — still valuable but weaker.

---

## Contradictions resolved

| Tension | Resolution |
|---|---|
| Founder chose AI-as-premium (D) vs cost control | AI only on paid paths; rules free; credits + hard spend caps |
| Any FDM aspiration vs A1 Mini depth | Wizard allowed; gold confidence only for A1 Mini until data |
| R$40k MRR solo vs bootstrap | Stretch goal; plan baseline = validate to R$1k then R$10k |
| Approach 2 (rules+AI) vs “D magic” | Market with premium AI; engineer with Approach 2 |

---

## Revenue path (milestones)

See [04-pricing-unit-economics.md](04-pricing-unit-economics.md) and [00-executive-decision.md](00-executive-decision.md). Concierge precedes software MRR.
