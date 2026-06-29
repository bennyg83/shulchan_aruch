# EH001 Full Volume Validation Report

**Date:** 2026-06-18  
**Scope:** `newtry/EH_001/output/` — simanim 001–178 (full Even HaEzer volume)

## Summary

| Metric | Value |
|--------|-------|
| Files scanned | 1,673 |
| Blocks scanned | 19,728 |
| Simanim | 178 |
| **Errors** | **0** |
| Warns | 0 |
| Lord's Prayer / Hashem's Word (grep) | 0 |

## Editorial pass status

| Range | Blocks (approx.) | Status |
|-------|------------------|--------|
| 001–100 | ~10,600 | FULL REDO COMPLETE |
| 101–178 | 9,110 | FULL REDO COMPLETE |

## Corpus

All 178 simanim published to `oc-web-reader` / `oc318-mobile-reader` corpus `eh1` via `npm run corpus:publish:eh` + `corpus:bundle:eh`.

## Reader

`http://localhost:5174/?vol=eh1&siman=N` (hard refresh Ctrl+Shift+R)

## Notes

- Earlier simanim 001–100 used hand retranslation per block; 101–178 used batch apply scripts (mechaber + commentary phrase engines, some Sefaria CT for mechaber).
- `marker_label_mismatch` warnings on Hebrew marker blocks are expected false positives when warn-level scanning is enabled.
- Largest simanim by block count: **141** (659), **169** (552), **126** (371), **038** (375), **093** (333).

## Re-validate

```bash
cd newtry/EH_001
node pipeline/validate-quality-eh001.mjs --root output --min-severity error --fail-on error
```
