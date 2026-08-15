# 11 — Testing & Observability

**Date:** 2026-08-15  
**Scope:** MVP → early scale (Hobby + Microfarm, Brazil-first, A1 Mini wedge)  
**Constraint:** Solo founder · Cursor + ChatGPT · no SaaS product code in this folder  
**Verdict context:** VALIDATE FIRST — instrumentation and evals exist to prove value before feature sprawl.

---

## 1. Principles

| Label | Statement |
|---|---|
| **DECISION** | Rules core is the source of truth for print recipes; LLM is an assistant layer, never the sole authority for safety-critical settings. |
| **DECISION** | Free slicers (Bambu Studio / OrcaSlicer) are the primary substitutes → tests must prove *incremental* value over “just slice yourself.” |
| **ASSUMPTION** | Confirmed successful prints (user-attested or pilot-verified) are the only north-star proxy that correlates with retention. |
| **INFERENCE** | With 8–30 h/week capacity, test ROI favors: unit/property on rules → contract tests on APIs → Playwright smoke → LLM evals on golden cases → fuzz only on parsers. |
| **UNKNOWN** | Exact false-positive rate users will tolerate from AI suggestions before churn. |

---

## 2. TDD pyramid (target stack)

```
                    /\
                   /  \  LLM evals (golden + adversarial)
                  /----\
                 / Play \  Playwright E2E (critical paths)
                /--------\
               /  integ.  \  API + DB + storage contracts
              /------------\
             / property+fuzz \  mesh/3MF parsers, validators
            /----------------\
           /   unit (Jest TS) \  domain rules, pricing, entitlements
          /--------------------\
         /    unit (pytest)     \  geometry/inspect/repair parity w/ core/
        /________________________\
```

### 2.1 Unit — TypeScript (`Jest`)

| Layer | What to test | Why |
|---|---|---|
| Domain rules | Material×printer capability gates, profile selection, orientation heuristics | **DECISION:** rules core must be deterministic and regression-safe |
| Entitlements | Hobby vs Microfarm limits, AI credit burn | Prevent silent over-serving (cost leak) |
| DTO mappers | Upload metadata, job status machines | Contract stability |
| Pricing helpers | Stripe/Pix fee estimates (display only) | Avoid wrong checkout expectations |

**Acceptance (MVP):** every `rules/*` pure function has ≥1 happy + ≥1 edge case; no `any` in domain tests.

### 2.2 Unit — Python (`pytest`)

| Layer | What to test | Why |
|---|---|---|
| Mesh/3MF inspect | Non-manifold flags, bbox, triangle count | Parity with existing `core/` CLI semantics |
| Light repair | Idempotency, “do no harm” on already-valid meshes | Trust for Hobby users |
| Wiki/validate adapters (if reused) | Schema of emitted JSON | Agent ↔ product consistency |

**Acceptance (MVP):** golden fixtures under `tests/fixtures/` (planning: mirror pattern from repo `tests/` when implementation starts).

### 2.3 Property-based testing

| Target | Property examples | Tooling (planned) |
|---|---|---|
| Validators | ∀ truncated STL headers → fail closed, never crash | `fast-check` (TS) / `hypothesis` (py) |
| Capability gates | ∀ material ∈ enclosure-only ∧ printer=A1 Mini → risk plan required | property table |
| Job state machine | ∀ illegal transitions → rejected | enum exhaustiveness |

**Label:** **HYPOTHESIS** — property tests catch more parser edge cases than hand-written units for binary mesh formats.

### 2.4 Fuzz testing

| Target | Scope | Non-goals |
|---|---|---|
| STL/3MF parsers | Mutated binaries, zip bombs soft-cap | Full AFL-style CI on day 1 |
| Upload endpoints | Oversized Content-Length, weird MIME | Network DoS load tests pre-PMF |

**DECISION:** fuzz runs locally + weekly CI job only after Phase 1 parsers exist; not a Phase 0 gate.

### 2.5 Playwright (E2E)

Critical paths only (smoke, not combinatorial):

1. `auth.signup` → `project.create` → `model.upload` → `analyze.run` → `recipe.view`
2. `checkout.start` (Hobby) → Stripe test mode / Pix sandbox stub
3. `pilot.report.success` — confirm print outcome (north-star event)

**ASSUMPTION:** 3–5 Playwright specs cover 80% of revenue-critical UX for MVP.

### 2.6 LLM evals

| Suite | Purpose | Pass criteria (MVP) |
|---|---|---|
| Golden recipes | Same mesh + intent → same profile family vs rules oracle | ≥90% agreement with rules core |
| Safety | Never recommend ABS/ASA/PA/PC on A1 Mini without risk flag | 100% on curated adversarial set |
| Language | PT-BR UX copy quality for BR users | Rubric ≥4/5 on n=20 samples |
| Hallucination | No invented printer specs | 0 critical hallucinations on gold set |

**DECISION:** LLM evals are blocking for any AI-premium feature merge; rules-only features can ship without LLM suite green.

**Telemetry note:** eval harness stores *scores + prompt hashes*, not full proprietary prompt text in production telemetry (see §4).

---

## 3. Test data & environments

| Env | Data | Secrets |
|---|---|---|
| `local` | Synthetic cubes + anonymized pilot meshes (opt-in) | `.env.local` never committed |
| `ci` | Fixtures only | GitHub/Cursor secrets |
| `staging` | Stripe test + fake Pix | Separate Supabase project |
| `prod` | Real users | Observability scrubbers on |

**ASSUMPTION:** users will not upload proprietary CAD IP if we clearly state retention + delete controls — still design for delete-by-default after N days on free tier.

---

## 4. Telemetry without leaking model IP

### 4.1 Allowed production signals

| Signal | Example event | Safe? |
|---|---|---|
| Funnel | `analyze_started`, `recipe_shown`, `print_confirmed_success` | Yes |
| Latency | `analyze_duration_ms`, `llm_roundtrip_ms` | Yes |
| Cost | `llm_tokens_in`, `llm_tokens_out`, `ai_credits_burned` | Yes |
| Outcome | `recipe_accepted`, `recipe_edited`, `print_failed_reported` | Yes |
| Errors | `error_code`, `error_class` (no stack with user mesh) | Yes if scrubbed |

### 4.2 Forbidden / redacted

| Never log in plain telemetry | Why |
|---|---|
| Full system prompts / chain-of-thought | Model IP + prompt injection leakage |
| Raw mesh geometry / STL bytes | User IP |
| Filenames that encode client secrets | Privacy |
| Full LLM completions in analytics | May contain user design details |
| API keys, Stripe customer PII beyond id | Compliance |

**DECISION:** production LLM calls log `prompt_template_id` + `prompt_version` + hash(`user_payload`), not raw prompts. Full traces only in encrypted offline eval store (founder-access).

**DECISION:** object storage (R2/Supabase) uses signed URLs; analytics never embeds file contents.

### 4.3 Privacy-preserving debug

- Support mode: user-triggered “share diagnostic bundle” (opt-in ZIP: settings JSON + logs, no mesh unless explicit).
- Redaction pipeline before any export to ChatGPT/Cursor sessions used for debugging.

---

## 5. SLOs for MVP

Targets are **internal** until paid SLA exists. Labels: **DECISION** unless noted.

| SLO | Target | Window | Measurement |
|---|---|---|---|
| Availability (app HTTPS) | 99.0% | 30d | Uptime checks (Cloudflare/Uptime) |
| Analyze P95 latency (rules-only) | ≤ 8s for ≤50MB mesh | 7d | `analyze_duration_ms` |
| Analyze P95 latency (AI-assist) | ≤ 25s | 7d | includes LLM |
| Upload success rate | ≥ 98% | 7d | `upload_completed` / `upload_started` |
| Error budget (5xx) | ≤ 1% of requests | 7d | API gateway |
| AI safety violations | 0 critical / week | rolling | eval + spot audit |
| Data deletion request | ≤ 7 calendar days | per request | manual runbook MVP |

**ASSUMPTION:** 99.0% is acceptable for Hobby; Microfarm later needs 99.5%+.

**UNKNOWN:** real P95 on BR network paths to chosen region (sa-east-1 vs us).

### 5.1 Error budget policy

| If burn rate… | Action |
|---|---|
| <50% of monthly budget | Ship features normally |
| 50–100% | Freeze non-critical AI experiments |
| >100% | Feature freeze; reliability only |

---

## 6. Observability stack (planned)

| Concern | MVP choice | Alt |
|---|---|---|
| Product analytics | PostHog or Plausible + custom events | Mixpanel |
| Logs | Structured JSON → Supabase logs / Axiom | Loki |
| Traces | OpenTelemetry lite on API | Skip until Phase 2 |
| Uptime | Free external ping | Cloudflare |
| Cost | Weekly spreadsheet + Stripe + OpenAI usage export | FinOps tool later |

**INFERENCE:** solo founder should prefer managed + few vendors over self-hosted Grafana until MRR > R$10k.

---

## 7. Definition of Done (testing gate)

A feature is Done only if:

1. Unit tests cover domain rules touched.
2. Contract test for any new API field.
3. If AI-touched: golden eval case added.
4. Telemetry events named in English snake_case (see `14-metrics-experiments.md`).
5. No new PII fields without privacy note in this folder’s assumptions register.
6. Playwright path updated if user-visible funnel changes.

---

## 8. Phase mapping

| Phase | Testing focus | Kill if… |
|---|---|---|
| 0 Concierge | Manual checklists + spreadsheet outcomes | Cannot get confirmed print success manually |
| 1 Skeleton product | Jest+pytest + 1 Playwright smoke | Upload/analyze flaky >20% |
| 2 AI premium | LLM evals blocking | Safety eval <100% or cost/print > willingness |
| 3 Hardening | Property+fuzz + SLOs | Error budget repeatedly exhausted |
| 4 Scale | Load smoke + multi-tenant isolation tests | Isolation failures |

---

## 9. Open questions

| ID | Question | Label |
|---|---|---|
| T-Q1 | Self-host eval runner vs GitHub Actions GPU? | **UNKNOWN** |
| T-Q2 | Retain failed meshes for model improvement? | **ASSUMPTION:** opt-in only |
| T-Q3 | Ship Playwright in CI day-1 or post-5 pilots? | **DECISION:** after first paid pilot path exists |
