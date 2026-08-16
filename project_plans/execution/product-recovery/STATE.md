# Product recovery state

Updated: 2026-08-16

## Baseline

- Root: fix-my-print (`D:/Projetos/3d-print`)
- Branch: `main`
- HEAD: `b6d8a6b04a8313789ead1650cf3945f255cb8e40`
- Original SHA-256: `5866bbb230db7fe3afe92981195431a52d67ba0a5d33babd26d2d1eb1989ab27` (unchanged)
- Size: 6844854 bytes

## Outcome

Private browser flow PASS on Chromium Playwright production build:

upload `one+Piece.3mf` → optimize → download → reupload → reprocess.

Output: `3ds/upgraded/one+Piece-otimizado.3mf`  
SHA-256: `4c3f6029a14de3f3368075ea1978f7a00b53f3a603134b422f68f51ce753254e`

## Git policy

- commit: not performed
- push: not performed
