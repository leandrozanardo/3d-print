# Geometry Quality V2 — ARCHITECTURE

## Data flow

```
bytes → detect/parse → resolveThreeMfInstances
  → per-part analyzeTopology
  → safeRepair (clone → candidate → fidelity → commit|rollback)
  → assembly mesh for orientation only
  → evaluateOrientationsV2 (V1⊂V2, goals, staged search)
  → apply same rigid matrix to each part
  → translate assembly minXYZ → 0
  → writeThreeMf(all meshes) → validate → reopen → report
```

## Packages

| Package | Role |
| --- | --- |
| `@fix-my-print/formats-3mf` | instances, multiobject write, Buffer-free ZIP |
| `@fix-my-print/geometry` | topology + conservative repair |
| `@fix-my-print/geometry-manifold` | optional WASM validator (`./browser` / `./node`) |
| `@fix-my-print/optimizer` | V1 (24) + V2 orientation engine |
| `@fix-my-print/engine` | orchestration `2.0.0-geometry-quality` |
| `@fix-my-print/web` | worker + honest UI |

## Honesty rules

- Never claim slicer support volume / perfect optimization.
- `decisionKind` distinguishes orientation / repair / sanitize-only.
- Watertight is per-part; assembly does not weld objects for topology.
