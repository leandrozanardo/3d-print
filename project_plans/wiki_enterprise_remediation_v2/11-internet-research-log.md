# Internet research log — wiki enterprise remediation v2

**Date:** 2026-08-16
**Scope:** Missing manufacturer pages + source provenance pages (CEAD, ExOne, RegenHU, VORON, Rat Rig; HP MJF 1200; EOS metal; Bambu P1S / A1 mini wiki).

## Method

- Primary: HTTP fetch of manufacturer/product/wiki URLs
- Secondary: web search when fetch timed out or SPA returned little extractable text
- Docs language: PT-BR canonical pages; English product/brand names preserved

## Access results (2026-08-16)

| URL | Result | Notes |
|---|---|---|
| https://ceadgroup.com/ | ok | LFAM: Flexbot, Flexcube, pellet extruders E25/E40/E50 |
| https://ceadgroup.com/solutions/robot-based-solutions/ | ok | Flexbot product surface |
| https://www.exone.com/en/ | ok | Binder jetting hub; ExOne+voxeljet unification notice |
| https://www.exone.com/en/3d-printing-solutions_overview/3dp-solutions-sand-casting/ | ok | S-Max Pro, S-Print Pro, VX1000, VX4000 observed |
| https://www.regenhu.com/ | **timeout** | Confirmed via search: bioprinting R-GEN 100/200, SHAPER |
| https://www.regenhu.com/3dbioprinting-solutions/r-gen-100-3dbioprinter/ | **timeout** | Indexed in search; not used as numeric-spec evidence |
| https://vorondesign.com/ | ok | Open-source design project hub (not closed OEM SKU store) |
| https://ratrig.com/ | ok | V-Core 4.1 kits; final run note for V-Core 300/400; US storefront observed |
| https://www.hp.com/us-en/printers/3d-printers/products/multi-jet-fusion-1200.html | ok | Announced / early access; GA planned **early 2027** |
| https://www.eos.info/metal-solutions/metal-printers | ok | M 290 / M 300 / M 400 / M4 ONYX series listed |
| https://us.store.bambulab.com/products/p1s | ok | P1S product page; 256³ mm volume claim |
| https://wiki.bambulab.com/en/a1-mini/troubleshooting/nozzle-clog | ok (SPA) | HTTP 200; body JS-heavy |
| https://wiki.bambulab.com/en/a1-mini/maintenance/hotend_blob | ok (SPA) | HTTP 200; body JS-heavy |
| https://wiki.bambulab.com/en/a1-mini/manual/nozzle-warp-detection | **timeout** | Title/URL confirmed via search (Nozzle Clumping Detection) |

## Pages created

### Manufacturers (`docs/21-impressoras/`)

- `manufacturer-cead.md`
- `manufacturer-exone.md`
- `manufacturer-regenhu.md`
- `manufacturer-voron.md`
- `manufacturer-ratrig.md`

### Sources (`docs/22-fontes/`)

- `hp-mjf-1200-product-page.md` (`official-product-page`)
- `eos-official-metal-printers.md` (`manufacturer-product-listing`)
- `bambu-p1s-us-store.md` (`official-product-page`)
- `bambu-a1-mini-wiki-nozzle-clog.md` (`official-knowledge-base`)
- `bambu-a1-mini-wiki-blob.md` (`official-maintenance-guide`)
- `bambu-a1-mini-wiki-clump-detect.md` (`official-user-manual`, access_status=timeout)
- `cead-official-products.md`
- `exone-official-products.md`
- `regenhu-official-products.md` (access_status=timeout)
- `voron-official-products.md`
- `ratrig-official-products.md`

## Other fixes

- Ebook chapters `03-historico.md`, `08-operacao.md`, `10-acabamento.md`: removed `imagens/` markdown image links; preserved alt/caption text; added editorial note that binary assets are not distributed in this repo
- `docs/21-impressoras/_meta/progresso.md`: replaced markdown link escaping docs root to `project_plans/...` with plain path text
- INDEX entries in `docs/21-impressoras/INDEX.md` and `docs/22-fontes/INDEX.md` already pointed at these filenames; creating the targets resolves the broken links

## Risks / follow-ups

1. Re-fetch RegenHU and Bambu clump-detect when hosts respond
2. Open individual `printer.*` pages for CEAD/ExOne/RegenHU/VORON/RatRig only after SKU reconciliation
3. Do not promote RegenHU search snippets to numeric capability claims without live page extraction

---

## Creality printer deepening (2026-08-16)

**Scope:** Promote all `docs/21-impressoras/creality-*.md` printer pages to `coverage_level: documented` with model-specific evidence.

### Access results (Creality)

| URL | Result | Notes |
|---|---|---|
| https://www.creality.com/products/k2-series-3d-printer | ok | Compare table K2 / K2 Pro / K2 Plus (volumes, temps, filaments) |
| https://store.creality.com/products/k2-combo-3d-printer | ok | K2/K2 Combo purchase listing; 260³ mm |
| https://store.creality.com/products/k2-pro-combo-3d-printer | ok | K2 Pro specs/FAQ; dimension conflict vs series page noted |
| https://www.creality.com/products/creality-k2-plus-cfs-combo | ok | K2 Plus specs; 350³ mm; nozzle ≤350 °C |
| https://store.creality.com/products/creality-k2-plus-combo-3d-printer | ok | Purchase listing (SPA-light body) |
| https://store.creality.com/products/k2-se-combo-3d-printer | ok | K2 SE open-frame specs; filament-diameter field anomaly (0.4 mm) |
| https://www.creality.com/products/k2-se | ok-partial | SPA-heavy nav chrome; store used as primary numeric source |
| https://www.creality.com/products/halot-x1 | ok | HALOT-X1 LCD/MSLA specs + FAQ (405 nm, 16K, 170 mm/h) |
| https://store.creality.com/products/halot-x1-resin-3d-printer | ok-partial | Checkout shell; little extractable spec text |
| https://www.creality.com/products/sparkx-i7 | ok | SPARKX i7 + CFS Lite/Mini/nano tables |
| https://store.creality.com/products/sparkx-i7-3d-printer | ok | Store specs; PLA-Silk list delta vs site |
| https://store.creality.com/products/sparkx-i7-nano-3d-printer | ok-partial | NANO SKU + ETA 8.28; no dedicated numeric spec table |
| https://www.creality.com/support/k2-series | ok (search/index) | Support hub for K2 series |

### Pages updated / created

**Printers (`documented`):**

- `creality-k2.md` — lifecycle `current`
- `creality-k2-pro.md` — lifecycle `current`
- `creality-k2-plus.md` — lifecycle `current`
- `creality-k2-se.md` — lifecycle `current`
- `creality-halot-x1.md` — lifecycle `current` (msla)
- `creality-sparkx-i7.md` — lifecycle `current`
- `creality-sparkx-i7-nano.md` — lifecycle `preorder` (ETA 8.28 on store title)

**Sources:**

- `creality-k2-series-product.md`
- `creality-k2-store.md`
- `creality-k2-pro-store.md`
- `creality-k2-plus-product.md`
- `creality-k2-se-store.md`
- `creality-halot-x1-product.md`
- `creality-sparkx-i7-product.md`
- `creality-sparkx-i7-nano-store.md`


## Follow-up research — Bambu / HP / EOS / Formlabs (2026-08-16 remediação OEM documented)

| URL | Result | Notes |
|---|---|---|
| https://us.store.bambulab.com/products/a1-mini | ok | Add to Cart; SPECS 180³; Ideal PLA/PETG/TPU/PVA; bed 80 °C |
| https://us.store.bambulab.com/products/a1 | ok | Add to Cart; SPECS 256³; bed 100 °C; Ideal same as mini; FAQ heatbed recall mitigation |
| https://us.store.bambulab.com/products/p1s | ok | Add to Cart; 256³ enclosed; Ideal includes ABS/ASA; carbon filter |
| https://us.store.bambulab.com/products/p2s | ok | Add to Cart; successor messaging; FAQ: P1S not discontinued |
| https://us.store.bambulab.com/products/h2d | ok | Add to Cart; dual nozzle volumes; 350 °C / 65 °C chamber claims |
| https://us.store.bambulab.com/collections/3d-printer | ok | A2L, X2D, H2C, P2S, H2S, H2D, A1, A1 mini, P1S listed with prices |
| https://www.hp.com/us-en/printers/3d-printers/products/multi-jet-fusion-1200.html | ok | Early access; 12 L 320×165×230; GA early 2027; PA12 Evonik 80% reuse claim |
| https://www.eos.info/metal-solutions/metal-printers | ok | M 290 / M 300 / M 400 / M4 ONYX compare table extracted |
| https://www.eos.info/polymer-solutions/polymer-printers | ok | FORMIGA P 110, P3, INTEGRA P 450, P 500, P 770 compare table |
| https://formlabs.com/products/3d-printers/ | ok | Form 4/4B/4L/4BL, Fuse 1+ 30W, Fuse X1 New, Form 3/3L/3BL still listed |
| https://formlabs.com/3d-printers/form-3/ | ok | Form 3+ succeeded by Form 4 |
| https://formlabs.com/3d-printers/form-3b/ | ok (search+page) | Form 3B+ succeeded by Form 4B |
| https://formlabs.com/support/Ongoing-support-for-the-Form-3-and-Form-3B/ | ok | Support ≥ Jan 2028; spare parts ≥ Jan 2027; stock through 2026 |

### Lifecycle decisions applied

- Bambu A1 mini / A1 / P1S / P2S / H2* / X2D / A2L → `current` (US store purchase)
- HP MJF 1200 → keep `announced` (GA early 2027; early access ≠ current)
- EOS metal + polymer listed series → `current` (official listings)
- Formlabs Form 3 / 3B / 3L / 3BL → `legacy-supported`; Form 4* + Fuse 1+ 30W + Fuse X1 → `current`


## Batch documented promotion — remaining OEMs (2026-08-16)

**Method:** WebFetch of official listing hubs (Anycubic store, ELEGOO global, Prusa, UltiMaker, Stratasys catalog, HP MJF portfolio) + provenance from existing `docs/22-fontes/*-official-products.md`. Numeric claims only when extracted; otherwise honest lacuna phrase dated 2026-08-16 with full operational DoD sections per technology class.

### Access results (this pass)

| URL | Result | Notes |
|---|---|---|
| https://store.anycubic.com/collections/3d-printers | ok | Specs extracted for Kobra + Photon lineup in catalog |
| https://global.elegoo.com/collections/3d-printers | ok | Centauri / Saturn listings present; SPA truncates some titles |
| https://www.prusa3d.com/ | ok | CORE One L+/+, XL+, MK4S, MINI+, HT90, SL1S SPEED priced |
| https://ultimaker.com/3d-printers/ | ok | Factor 4 Plus, S6/S8/S5/S3, Method series listed |
| https://www.stratasys.com/en/3d-printers/printer-catalog/ | ok | F/J/Neo/H350/Origin catalog grid |
| https://www.hp.com/us-en/printers/3d-printers/products.html | ok | JF 5600/5400/5200/5000 volumes + Metal Jet S100 |

### Manufacturers promoted this pass

`3d-systems`, `3dceram`, `ackuretta`, `additive-industries`, `anycubic`, `artillery`, `asiga`, `bcn3d`, `carbon`, `cellink`, `cobod`, `colibrium`, `craftbot`, `desktop-metal`, `dmg-mori`, `elegoo`, `farsoon`, `flashforge`, `flsun`, `heygears`, `hp`, `icon`, `impossible-objects`, `intamsys`, `kingroon`, `lithoz`, `lulzbot`, `makerbot`, `markforged`, `mazak`, `meltio`, `mimaki`, `mingda`, `nano-dimension`, `nexa3d`, `nikon-slm`, `one-click-metal`, `optomec`, `phrozen`, `prusa-research`, `qidi`, `raise3d`, `rapidshape`, `renishaw`, `roboze`, `sciaky`, `shining3d`, `sinterit`, `snapmaker`, `sovol`, `sprintray`, `stratasys`, `tronxy`, `trumpf`, `ultimaker`, `uniformation`, `velo3d`, `voxelab`, `voxeljet`, `wasp`, `xact-metal`, `zortrax`

### Policy

- FM≡body for lifecycle + coverage_level
- No `pending-revalidation`
- DoD markers from `DOCUMENTED_DOD_MARKERS`
- Bodies unique per model (model name repeated across sections)
