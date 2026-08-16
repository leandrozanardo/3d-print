# Acceptance Contract — REAL-3MF-PRODUCT-RECOVERY

Locked black-box criteria for the product recovery mission.
Hashes are recorded in `acceptance-lock.json` and verified by `scripts/verify-acceptance-lock.mjs`.

## Non-negotiable outcome

Browser flow without Python, AI, or Supabase:

open → select real 3MF → validate → extract geometry → view → configure printer → optimize → download valid 3MF → reupload → reprocess.

Private fixture: `3ds/original/one+Piece.3mf` (read-only).

## AC summary

AC-001..AC-032 as defined in the corrective mission prompt.
Status tracking lives in `TRACEABILITY.md` and `STATE.md`.
