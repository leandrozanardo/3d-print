# 10 — Security, Privacy & Legal

**Access date:** 2026-08-15  
**Stance:** hostile uploads by default; Brazil LGPD; license hygiene before GO  
**Related:** [`05-product-requirements.md`](05-product-requirements.md) · [`06-ux-information-architecture.md`](06-ux-information-architecture.md) · [`07-technical-architecture.md`](07-technical-architecture.md) · [`08-data-api-jobs.md`](08-data-api-jobs.md) · [`09-geometry-rules-ai.md`](09-geometry-rules-ai.md)

---

## 1. Security objectives

| Objective | MVP bar | Label |
|---|---|---|
| Confidentiality of user models | private buckets; signed URLs | **DECISION** |
| Integrity of reports | server-side only writes | **DECISION** |
| Availability | best-effort; abuse throttling | **ASSUMPTION** |
| Safety | malware/zip bombs don’t own worker | **DECISION** |
| Legal operability | no AGPL slicer host; attribution paths | **DECISION** |

---

## 2. Hostile upload threat model

Assume uploaders may send: malware, zip bombs, polyglots, path-traversal filenames, huge sparse claims, random bytes named `.stl`, encrypted archives, nested 3MF bombs.

### 2.1 STRIDE-style map

| Threat | Example | Mitigation |
|---|---|---|
| Spoofing | steal session to burn quota | Auth + refresh; rate limit |
| Tampering | rewrite report client-side | Reports unsigned from client ignored |
| Repudiation | “I didn’t upload malware” | audit `job_events` + sha256 |
| Info disclosure | list other users’ objects | RLS / path prefix per user_id |
| DoS | 500 MiB × N parallel | soft cap, concurrency 1–2, auth required for large |
| Elevation | worker shell via filename | never interpolate paths; scratch UUID names |

### 2.2 Controls checklist (MVP)

| Control | Status intent |
|---|---|---|
| Auth before upload sign | required |
| Size soft-cap < `MAX_FILE_BYTES` (500 MiB **FACT**) | **DECISION** set product cap |
| Extension allowlist | `.stl .obj .ply .3mf` |
| Magic-byte validation | **must add** — **FACT** absent in `core/paths.py` today |
| AV scan (`scan_status`) before parse | strongly recommended |
| Zip bomb limits for 3MF | max members, max uncompressed, max depth |
| CPU/time budget per job | worker timeout |
| Scratch on ephemeral disk | wipe always |
| No content disposition trust | sanitize filename for display |
| Quarantine infected | never pass to trimesh |

### 2.3 What we explicitly do not do (MVP)

- Execute macros / scripts inside files
- Open files in desktop slicer automatically on server
- Host user models publicly
- Cross-user dedup that could leak existence of a hash (**ASSUMPTION** avoid)

---

## 3. Application threat model (broader)

| Asset | Attacker goal | Control |
|---|---|---|
| Stripe webhooks | forge entitlements | signature verify + idempotency |
| AI gateway | prompt injection → bad advice / data exfil | bound context to job; no tools with storage |
| Knowledge pack | supply-chain poison | signed build from repo CI |
| Support mailbox | social engineer delete | verify email ownership |
| Contractor access | overbroad prod | least privilege; no prod dump of models |

**DECISION:** AI has no tool that returns raw file bytes to the model context beyond summary metrics.

---

## 4. LGPD (Brazil)

> **COUNSEL REQUIRED** for final policy texts, DPA, and lawful bases — this section is engineering checklist, not legal advice. (**DECISION** flag)

### 4.1 Data categories

| Category | Examples | Notes |
|---|---|---|
| Identity | email, user id | Auth |
| Billing | Stripe customer ids, last4 not stored if possible | minimize |
| Content | 3D models, chat text | high sensitivity for some users (unreleased designs) |
| Technical | IP, user-agent, job logs | retention limits |

### 4.2 Principles → product behaviors

| Principle | Product behavior |
|---|---|---|
| Purpose limitation | analyze printability; not sell models |
| Minimization | wizard fields only what’s needed |
| Transparency | Privacy Policy PT-BR link at signup |
| Access / export | `POST /account/export` (`08`) |
| Deletion | `DELETE /account` + storage purge SLA |
| Security | controls §2–3 |
| International transfer | if Supabase/OpenAI regions outside BR → disclose | **UNKNOWN** final region — **COUNSEL** |

### 4.3 AI / training

| Topic | Stance | Label |
|---|---|---|
| Default train on user models | **No** | **DECISION** pending counsel confirm |
| OpenAI data use | use API settings/contract that disable training where available | **ASSUMPTION** verify |
| Opt-in improve product | separate explicit consent Later | |

### 4.4 Cookies / tracking

VALIDATE landing: prefer privacy-friendly analytics or none. Marketing pixels: **COUNSEL** if added.

### 4.5 Children

Not directed to children under 13/18 as applicable — age gate copy **COUNSEL**.

---

## 5. Licensing audit (repo-informed)

### 5.1 Inventory

| Asset | License / note | SaaS implication | Label |
|---|---|---|---|
| Repo root `LICENSE` | **Missing** | Clarify ownership of original wiki/code before commercial | **FACT** |
| Ebook Guia Maker | **CC BY-SA 4.0** | ShareAlike + attribution if derivative published; SaaS *output* vs hosting text needs counsel | **FACT** |
| `docs/projeto` wiki | Project-authored EN; synthesizes public knowledge + cites | Still may include adapted concepts; keep attribution page | **INFERENCE** |
| A1 Mini manuals converted | Bambu materials converted to MD | Do not redistribute manuals as product corpus without rights review | **FACT** + **COUNSEL** |
| Bambu proprietary 3MF process settings | opaque / proprietary | MVP = inspect only; no cloud Bambu | **FACT** + **DECISION** |
| trimesh / deps | check OSI licenses in `requirements.txt` | usually ok; pin & audit | **ASSUMPTION** |
| Bambu Studio / OrcaSlicer | Studio proprietary components; Orca often **AGPL** family risk if hosted | **Never** server-side slice host | **DECISION** |
| OpenAI / Stripe / Supabase | ToS | review data processing | **COUNSEL** |

### 5.2 AGPL risk note

Hosting or network-providing AGPL slicer code can trigger source disclosure obligations.  
**DECISION:** Product Option A avoids hosting Studio/Orca.  
**Never** “we’ll just wrap Orca in Docker for MVP”.

### 5.3 CC BY-SA operational mitigations

| Practice | Why |
|---|---|
| Prefer generating plans in project voice with citations | reduce verbatim ebook dumps |
| If quoting ebook, attribute + ShareAlike assessment | **COUNSEL** |
| Keep `fontes-e-atribuicao` equivalent in product footer/docs | transparency |
| Separate “knowledge pack” licensing file | ship with version |

### 5.4 No Bambu cloud MVP

| Integration | MVP | Label |
|---|---|---|
| Bambu account OAuth | No | **DECISION** |
| Push to printer cloud | No | **DECISION** |
| Scrape MakerWorld | No | **DECISION** |

Users export plan and apply settings themselves in Studio on their PC.

---

## 6. Counsel-required flags (do not self-clear)

Mark **COUNSEL REQUIRED** before GO / paid public launch:

1. Privacy Policy + Terms of Service (PT-BR)  
2. LGPD DPA with processors (Supabase, Stripe, OpenAI, Resend, host)  
3. International transfer disclosures  
4. CC BY-SA impact on commercial SaaS using adapted ebook/wiki text  
5. Rights to use converted Bambu manual content in paid product  
6. Consumer law (CDC) refund/cancellation for subscriptions digitally delivered  
7. Tax/NF-e obligations for BRL SaaS founder  
8. Root LICENSE / IP assignment for contractor code  
9. Marketing claims (“reduz falhas”) — avoid guarantees  
10. Minor/age policies  

Engineering may prepare drafts; **counsel signs off**.

---

## 7. Secure SDLC (lean for solo)

| Practice | MVP |
|---|---|---|
| Dependency pin + audit | yes |
| Secret scanning | yes |
| PR review for contractor | yes |
| Pen-test | Later / after $$ |
| Bug bounty | Never early |
| Backup / restore drill | before GA |

---

## 8. Incident response (minimal)

1. Disable uploads / AI kill-switch  
2. Rotate keys  
3. Identify affected `user_id`s  
4. Notify as LGPD timelines require — **COUNSEL**  
5. Postmortem in `project_plans/` (not public blame)

---

## 9. Abuse & acceptable use

Publish AUP bullets:

- No malware distribution  
- No attempting to disrupt service  
- No uploading unlawful content  
- Rate limits enforced  
- We may delete accounts for abuse

---

## 10. Mapping to product/tech docs

| Topic | Doc |
|---|---|
| Delete account UX | `06`, `08` |
| Worker isolation | `07` |
| scan_status field | `08` |
| AI no tools on files | `09` |
| Never slicer host | `05` Never + this file |

---

## 11. Validation-phase legal hygiene (NOW)

Even before code SaaS:

- [ ] Do not paste entire Bambu PDFs into customer emails  
- [ ] Concierge reports: attribute if quoting CC BY-SA ebook  
- [ ] Use private Drive links, not public  
- [ ] Manual Pix: keep payment proof; no card data in chat  
- [ ] Start LICENSE decision for repo (**FOUNDER + COUNSEL**)

---

## 12. Residual risks

| Risk | Severity | Mitigation | Residual |
|---|---|---|---|
| Malware via mesh parsers | high | AV + caps + sandbox | medium |
| AGPL accidental dependency | high | license allowlist CI | low if enforced |
| CC BY-SA surprise | medium | counsel + minimize verbatim | until counsel |
| Model IP leak via support | medium | process + DPA | medium |
| Prompt injection | medium | bound context | medium |
| Missing root LICENSE | medium | add before contractors | until fixed |

---

## 13. Acceptance (security/privacy/legal gate)

- [ ] Magic-byte + size + AV path designed  
- [ ] RLS/path isolation design reviewed  
- [ ] No Studio/Orca in architecture diagrams  
- [ ] No Bambu cloud in MVP scope  
- [ ] LGPD export/delete in API outline  
- [ ] Counsel flag list acknowledged by founder  
- [ ] Pricing/ToS not claiming guaranteed print success  
- [ ] Official third-party ToS/pricing re-read at GO (note: some official pages timed out **2026-08-15**)

---

## 14. Open questions

| ID | Question | Status |
|---|---|---|
| L1 | Soft upload cap value | **UNKNOWN** |
| L2 | Exact purge SLA hours | **ASSUMPTION** 72h pending counsel |
| L3 | Host region | **UNKNOWN** |
| L4 | Repo LICENSE choice (MIT/Apache/proprietary) | **UNKNOWN** founder |
| L5 | Whether plan MD is “derivative” of CC BY-SA | **COUNSEL** |

---

## 15. Final legal posture for VALIDATE FIRST

Proceed with **concierge validation** under private processing and honest A1 Mini scope.  
**Do not** GO paid self-serve until counsel items 1–2–4–5 have a written path and root LICENSE is decided.  
Architecture Option A + modular monolith + no hosted slicer remains the **lowest legal-surface** product shape among scored options (`05`, `07`).
