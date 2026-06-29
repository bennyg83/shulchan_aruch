# YD001 Garbage Cleanup Report

**Date:** 2026-06-18  
**Scope:** `newtry/YD_001/output/` — full volume garbage sweep + simanim 300–403 tail redo

## Summary

| Metric | Before | After |
|--------|--------|-------|
| Lord's Prayer / Hashem's Word / MYMEMORY hits | 140+ | **0** |
| Total blocks | 19,846 | 19,846 |
| Bad simanim | 53+ | **0** |

## Work this session

| Batch | Simanim | Blocks |
|-------|---------|--------|
| 300–325 | 20 | 225 |
| 326–360 | 25 | 485 |
| 361–403 | 24 | 214 |
| Scatter garbage fix | 11 | 11 |
| siman 084 kereti | 1 | 1 |
| **Total patched** | **~80** | **936** |

## Corpus

Published simanim 300–402 + scatter fixes to `yd1`; rebundled via `npm run corpus:bundle:yd`.

Reader: `http://localhost:5174/?vol=yd1&siman=N`

## Apply scripts

- `pipeline/work/_patch-siman-300-325-apply.mjs`
- `pipeline/work/_patch-siman-326-360-apply.mjs`
- `pipeline/work/_patch-siman-361-403-apply.mjs`
- `pipeline/work/_patch-siman-garbage-11-apply.mjs`
- `pipeline/work/_patch-siman-084-kereti-garbage.mjs`

## Infrastructure

Created `yd001_block_lib.mjs` (required by corpus publish script).
