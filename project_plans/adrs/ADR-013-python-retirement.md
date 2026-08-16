# ADR-013: Python tool replacement / retirement

- **Status:** Accepted (retired)
- **Date:** 2026-08-16

Wiki validation/compile, mesh/3MF inspect, light repair, and editorial converters cut over to TypeScript/Node. Production geometry uses `@fix-my-print/geometry-manifold` (manifold-3d WASM) with PureTS topology weld-on-inspect parity for binary STL.

Live `.py` deletion completed under composite phase `MIGRATION-AND-RETIREMENT` with filled `project_plans/execution/phase-14/DELETION_MANIFEST.json` and differential evidence under `tests/differential/`.
