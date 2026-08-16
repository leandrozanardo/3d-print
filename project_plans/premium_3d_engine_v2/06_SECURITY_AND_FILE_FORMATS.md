# 06 — Security and File Formats

**Date:** 2026-08-15  
**Threat model:** every 3D file is hostile. Operator previews and starts prints; this software **does not** send jobs to the printer.

---

## 1. Threat model

| Threat | Attack surface | Mitigation |
|---|---|---|
| Path traversal / write to original | repair output, unzip | resolved path + project boundary + `3ds/original` guard; tests for `..`, symlink, hardlink |
| Zip bomb / ratio abuse | 3MF/AMF | member count, uncompressed size, compression ratio, nested zip depth=0 |
| XML XXE / DTD / entity expansion | 3MF `.model`, OPC | `defusedxml` or equivalent; DTD disabled |
| Oversized mesh | STL/OBJ | triangle/vertex/time/memory budgets (configurable) |
| NaN/Inf / index overflow | mesh | reject |
| Shell injection | slicer argv, filenames | list argv; sanitize display names; no `shell=True` |
| Embedded G-code / post scripts | 3MF extras | never execute; record as opaque |
| Prompt injection | filenames, metadata, wiki | retrieval = data; AI policy |
| License contamination | ebook, vendor profiles | isolation; no silent copy |
| Secrets | env, logs | redact absolute paths in shareable reports; no tokens in repo |
| Network exfil | deps, LLM, slicer | default offline; no hidden HTTP |

---

## 2. Format matrix (first program)

| Format | Target support | Phase |
|---|---|---|
| STL ASCII/binary | `verified` inspect + repair path | 3 |
| 3MF Core | `beta` → `verified` | 3–7 |
| Bambu project 3MF | `inspect_only` until golden round-trip | 3, 7 |
| OBJ/MTL, PLY | `beta` scene-preserving | 3 |
| G-code | `inspect_only` future | later |
| STEP/BREP | `schema_ready` | after CAD ADR |
| AMF, glTF | `schema_ready` | later |
| Vendor CAD | plugins only | later |

Intake: **magic/content**, not suffix alone. Suffix mismatch → fail closed.

---

## 3. 3MF plan

**Now:** ZIP + CRC + `.model` name sniff (`core/threemf.py`) — insufficient.

**Phase 3 (custom, inspect-first):**

1. OPC `[Content_Types].xml` + `_rels` (safe XML).  
2. Core Model: `unit`, `resources`, mesh vertices/triangles, `object`, `component`, `build/item` transforms.  
3. Base materials/colors if present.  
4. Unknown namespaces/members: **opaque preserve** (do not drop, do not interpret).  
5. Thumbnails: size-capped, not executed.  
6. Do not rewrite vendor settings. **Do not edit** Bambu `Metadata/*.config` (or equivalent) blobs. Approved job spec: light hygiene = **binary copy** of the project file + human Studio steps in `3ds/plan/*.md`.
7. Multi-plate / noisy project: preserve all members; plan **names** the printable plate; unused plates are noted, not deleted. Missing/broken `.model` → fail closed (`inspect-3mf --strict` until Phase 3 XML). Do not emit upgraded success.

**lib3mf ADR (before write/round-trip):**

| | Custom parser | lib3mf (BSD) |
|---|---|---|
| Inspect Core | We can own budgets | Official validation |
| Write / round-trip | Easy to corrupt | Preferred |
| Native wheels | n/a | PyPI `lib3mf` 2.5.x — verify Windows 3.11–3.14 |
| Bambu extensions | Opaque zip members | May strip unknowns — **must test** |

**Proposed:** Phase 3 inspect with hardened stdlib+defusedxml; Phase 7 write path evaluates lib3mf behind `ThreeMfAdapter`. If lib3mf drops vendor members, stay on “export semantic settings + original as reference”, do not claim project round-trip.

Normalize ZIP timestamps/order **only** if golden tests prove Studio still opens the file.

---

## 4. Budgets (initial, configurable, not sacred)

| Limit | v1 default | Rationale |
|---|---|---|
| File bytes | 500 MiB (keep) | already in `core/paths.py:11` |
| Zip members | 4,096 | abuse |
| Uncompressed total | 1 GiB | bombs |
| Compression ratio | 100:1 alert / 1000:1 fail | bombs |
| Nested archives | 0 | zip-in-zip |
| Triangles | 20e6 | workstation sanity |
| Vertices | 20e6 | |
| XML element depth | 64 | |
| Analyzer wall time | 60 s Pass 0–1; Pass 3 explicit | |
| Slicer wall time | 10 min configurable | |

Measure real corpus before tightening CI performance gates (`07_TEST_STRATEGY.md`).

---

## 5. Round-trip / loss policy

- Record `LossReport`: dropped objects, degenerated triangles, unit changes, ignored extensions.  
- If loss > `loss_budget` (default: any object identity loss on 3MF Core) → **forbid export**.  
- STL has no units/scene: converting 3MF→STL is lossy by definition; allowed only as explicit output format with warnings.

---

## 6. Subprocess policy (slicer)

- Executable from config `slicer.bambu_studio.executable` (absolute).  
- Version `--help` / documented flag parsed into manifest.  
- Allowlist of flags; no passthrough of raw user strings into shell.  
- Temp working directory under system temp + run-id; cleanup in `finally`.  
- Prefer disabling network (Windows: Job Object / firewall is OS-specific — document limitation).  
- `PYTHONUTF8=1`, `LC_ALL=C` where applicable for determinism.  
- No post-processing scripts.  
- Do not invoke printer send APIs.

---

## 7. Write / FS policy

- Atomic write: temp + `os.replace`.  
- `assert_not_original_tree` strengthened with `project_root` (today unused, `core/paths.py:54`).  
- Refuse writes outside project or configured output root.  
- Symlink: resolve and compare **canonical** original directory.  
- Display name ≠ physical path in reports.

---

## 8. Privacy

- Default no telemetry, no network.  
- Shareable report redacts `C:\Users\...` → `<redacted>\file.stl`.  
- AI logs store context **ids**, not full mesh, not full wiki dump.

---

## 9. Hostile fixtures (must exist before claiming “safe intake”)

Minimal 3MF with: path `../`, overlapping members, huge stored size, XXE payload, missing CRC, duplicate names, `.model` without mesh, NaN vertices, 0-triangle object. STL with wrong magic, ASCII claiming binary, embedded NULs. These tests are Phase 3 **acceptance**.
