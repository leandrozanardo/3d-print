# 04 — Domain Model and Schemas

**Date:** 2026-08-15  
**Convention:** `schema_version: "1.0"` on every persisted document. JSON Schema draft 2020-12. Identifiers in English kebab/dot notation.

This document **locks names** used by later tasks. Changing a name here is an ADR.

---

## 1. Entities and value objects

| Type | Kind | Key fields |
|---|---|---|
| `ContentHash` | VO | `sha256`, `size_bytes` |
| `Units` | VO | `declared: micron\|millimeter\|centimeter\|inch\|foot\|meter\|unknown`, `confidence` |
| `Bounds3D` | VO | existing `min_xyz`/`max_xyz`/`size_xyz` — **keep** |
| `Transform` | VO | 4×4 row-major, `inverse`, `determinant_sign` |
| `PrinterId` | VO | `manufacturer`, `model`, `revision` |
| `NozzleId` | VO | `diameter_mm`, `material`, `condition` |
| `PlateId` | VO | `surface`, `texture` |
| `MaterialRef` | VO | `family`, `variant`, `brand`, `product`, `color`, `spool_id?`, `calibration_id?` |
| `Purpose` | VO | enum + `unknown` |
| `OperationClass` | enum | `A_analysis`, `B_prep`, `C_repair`, `D_design` |
| `SupportLevel` | enum | `verified`, `beta`, `inspect_only`, `schema_ready`, `unsupported` |
| `Confidence` | enum | `high`, `medium`, `low`, `experimental` — **not** a probability |
| `RuleId` | VO | `rule.*` dotted |
| `SourceId` | VO | `src.*` dotted |
| `RunId` | VO | hash-derived + short suffix |
| `ChangeRecord` | entity | see §5 |
| `OptimizationRequest` | entity | see §4 |
| `CapabilityProfile` | entity | printer/nozzle/plate/material |
| `ResolvedSetting` | VO | `semantic_id`, `value`, `unit`, `inheritance[]`, `source_ids[]`, `rule_ids[]` |

Existing `MeshReport` / `ThreeMfReport` / `RepairReport` become **adapters’ DTOs** mapped into `RawMeshFacts` / `ContainerFacts` / `RepairTransactionResult`. Do not thread them through the optimizer.

---

## 2. Printer capability schema (sketch)

`knowledge/printers/bambu-a1-mini.yaml` compiled to JSON.

```yaml
schema_version: "1.0"
id: printer.bambu.a1-mini
version: 1
status: verified   # only after source audit of each field
manufacturer: Bambu Lab
model: A1 Mini
revision: "stock"
technology: FFF
kinematics: bed-slinger   # not CoreXY
build_volume:
  shape: box
  size_mm: [180, 180, 180]
  edge_margin_mm: { default: 2.0, brim_extra: 3.0 }
chamber: open
temperatures:
  hotend_max_c: 300
  bed_max_c: 80
  chamber_max_c: null
extruder: { type: direct-drive, filament_diameter_mm: 1.75 }
nozzles_supported: ["0.2-ss", "0.4-ss-stock", "0.4-hs", "0.6-hs", "0.8-hs"]
volumetric_flow:
  source: src.bambu.a1mini.techspecs
  note: "28 mm3/s measured on ABS coupon; not a PLA/PETG guarantee"
  abs_coupon_mm3_s: 28
ams: { lite_max_units: 1, lite_max_colors: 4, classic_ams_requires_hub: true }
slicer_profile_ids: { bambu_studio: ["Bambu Lab A1 mini 0.4 nozzle"] }
sources: [src.bambu.a1mini.techspecs, src.bambu.a1mini.faq]
```

Domain code reads **this object**, never `if model == "A1 Mini"`.

---

## 3. Material / nozzle / plate

Separate records. Compatibility is a **matrix** document, not a field dump:

`knowledge/matrices/printer-nozzle-plate-material.yaml`

Cells: `hard_block` | `warning` | `allowed_with_calibration` | `allowed`.

Example hard blocks (from official sources, 2026-08-15):

- ABS/ASA/PC/PA/PET on A1 Mini → `warning` + `vendor_not_recommended` (not silent allow because hotend can reach temp).
- CF/GF with stainless 0.4 → `hard_block` or `warning`+`nozzle_wear` per policy (recommend **hard_block** for trusted apply).
- Enclosing A1 Mini → `warning` (vendor: do not enclose).

Generic PLA/PETG on stock 0.4 SS + textured PEI → `allowed_with_calibration`.

---

## 4. OptimizationRequest

Versioned; extra fields forbidden (`additionalProperties: false`) at compile time; unknown keys in **older** clients fail closed.

Minimum fields (all optional except `input` unless noted):

```json
{
  "schema_version": "1.0",
  "input": { "path": "logical://part.3mf", "sha256": "..." },
  "locale": "pt-BR",
  "printer": { "id": "printer.bambu.a1-mini" },
  "nozzle": { "id": "nozzle.0.4-ss" },
  "plate": { "id": "plate.bambu.textured-pei" },
  "slicer": { "id": "slicer.bambu-studio", "version": null },
  "material": { "family": "PLA", "variant": "generic", "brand": null, "product": null },
  "purpose": "decorative",
  "objective": { "preset": "balanced", "weights": null },
  "quantity": 1,
  "surfaces": { "visible": [], "mating": [], "do_not_modify": [] },
  "tolerances": [],
  "loads": null,
  "environment": { "setting": "indoor", "uv": false, "moisture": "unknown" },
  "constraints": { "max_time_s": null, "max_material_cost": null },
  "allowed_operation_classes": ["A_analysis", "B_prep"],
  "outputs": ["plan", "semantic-settings"],
  "ai": { "mode": "off" },
  "calibration": { "state": "unknown", "coupon_allowed": true },
  "overrides": []
}
```

**Defaults (documented, not silent physics):**

| Absence | Behavior |
|---|---|
| purpose | `unknown` — no structural assumption |
| loads | no load-bearing inference from appearance |
| STL units | `unknown` — **never** auto-scale |
| material | `generic-pla` only if printer allows; still `calibration_required` |
| ai | `off` |
| classes | A + B; C requires `--apply-safe`; D requires `--apply-approved` |

Filename and file metadata are **untrusted**.

---

## 5. Report / change / manifest

`ChangeRecord`:

- `id`, `class` (A–D), `target`, `before`, `after`, `units`
- `rule_ids`, `source_ids`, `rationale`, `expected_benefit`, `tradeoffs`, `residual_risks`
- `confidence`, `reversible`, `inverse`, `approval`, `validation`

`manifest.json`: schema version, run id, hashes, engine commit, knowledge build hash, dependency versions, slicer version, weights, seed, timestamps as metadata only, artifact inventory, warnings, AI summary, reproduce command.

`plan.pt-BR.md` / `plan.en.md`: Jinja or `string.Template` — **no LLM**. Order per prompt §23.

---

## 6. Rule DSL

**Decision (proposed, needs user ack):** JSON Logic subset, allowlisted operators, no `eval`, no Python expressions.

Allowed ops (v1): `== != < <= > >= and or not in var missing min max`.

Rule document:

```yaml
schema_version: "1.0"
id: rule.a1mini.bed.temp.must_not_exceed_max
version: 1
status: verified
title: Bed temperature cannot exceed printer bed_max_c
kind: hard_constraint
priority: 100
applies_when: { "==": [ { "var": "printer.kinematics" }, "bed-slinger" ] }
excludes_when: {}
assertions:
  - { "<=": [ { "var": "resolved.material.bed_temperature_c" }, { "var": "printer.temperatures.bed_max_c" } ] }
actions: []
rationale: "Official A1 Mini max heatbed is 80 C."
tradeoffs: []
risks: ["Vendor firmware may still accept out-of-range UI values"]
confidence: high
calibration_required: false
sources: [src.bambu.a1mini.techspecs, src.bambu.a1mini.faq]
tests: [tests/knowledge/test_rule_bed_max.py]
supersedes: []
reviewed_at: "2026-08-15"
```

**Conflict:** same priority + overlapping specificity → `KNOWLEDGE_CONFLICT`, block apply for that field.

**Precedence (high to low):** safety → hardware compatibility → file validity → material process → dimensional/functional → purpose/visible → failure-risk heuristics → quality/cost/time prefs → non-safety overrides.

**Lifecycle:** `proposed → experimental → verified → deprecated → superseded`. No LLM promotion.

---

## 7. Alternatives for DSL

| ID | Approach | Verdict |
|---|---|---|
| A1 | YAML with embedded Python | Rejected (RCE, non-deterministic) |
| A2 | CEL | Viable later; extra runtime |
| A3 | JSON Logic allowlist | **Proposed default** — small, testable, JSON-native |

---

## 8. Versioning

- Schema bump = major if breaking.
- Knowledge build hash in every manifest.
- `valid_from` / `valid_until` / `compatible_slicer_versions` on version-specific facts.
