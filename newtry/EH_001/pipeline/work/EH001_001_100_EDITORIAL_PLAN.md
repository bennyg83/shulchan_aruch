# EH001 Editorial Cleanup — Simanim 001–100

**Branch:** `main` (merged from `eh-development`). MT first pass complete; editorial replaces all MT garbage.

## Per-siman workflow (same as YD)

1. `node pipeline/validate-quality-eh001.mjs --root output/siman_NNN --min-severity error --fail-on error`
2. If **0 errors** → `[SKIP]` + log `siman_NNN editorial CLEAN (quality-gate)`
3. If **errors** → per failing commentary (canonical order in `translation/COMMENTARIES.md`):
   - Read Hebrew; patch via `pipeline/work/_patch-siman-NNN-editorial.mjs` + `_patch-siman-utils.mjs`
   - One commentary slug at a time; mechaber first when it fails
4. Re-run validator until 0 errors
5. Log `progress.log`

## Commentary order

mechaber → beit-shmuel → turei-zahav → baer-heitev → beer-hagolah → beur-hagra → pitchei-teshuva → rabbi-akiva-eiger-eh → ezer-mikodesh → beit-meir → chokhmat-shlomo

## Progress

| Siman | Status | Notes |
|-------|--------|-------|
| **001** | **DONE** | 15 blocks (8 slugs); mechaber/ezer/rabbi-akiva clean |
| **002** | **in progress** | mechaber 11 seifim done; 10 commentaries remain |
| 003–100 | pending | |
