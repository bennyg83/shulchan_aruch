# EH001 simanim 1–100 — revalidation report

**Date:** 2026-06-17  
**Tool:** `node pipeline/validate-quality-eh001.mjs --root output --siman N`

## Summary

| Metric | Value |
|--------|------:|
| Simanim scanned | 100 |
| Total blocks | 10,618 |
| Simanim with **0 errors** | **50** |
| Simanim with ≥1 error | 50 |
| Total **error** flags | **406** |
| Total **warn** flags | 6,186 |

## Siman 001 (post full editorial redo)

| Level | Count | Notes |
|-------|------:|-------|
| error | **0** | Clean |
| warn | 116 | All `marker_label_mismatch` (Hebrew markers א/ב vs `_` — validator false positive for EH blocks) |

No `mt_garbage`, `Lord's Prayer`, or similar in siman 1 after editorial pass.

## Error issue codes (1–100)

| Code | Count |
|------|------:|
| `mt_garbage` | 403 |
| `hebrew_in_english` | 4 |

## Top warn codes (1–100)

| Code | Count |
|------|------:|
| `marker_label_mismatch` | 5,881 |
| `html_entity_leak` | 873 |
| `chunk_seam_duplicate` | 355 |
| `hebrew_in_english` | 34 |

## Simanim with errors (50) — sorted by count

| Siman | Errors | | Siman | Errors |
|------:|-------:|---|------:|-------:|
| 17 | 66 | | 62 | 6 |
| 28 | 20 | | 64 | 6 |
| 90 | 16 | | 66 | 7 |
| 37 | 15 | | 67 | 3 |
| 38 | 14 | | 68 | 7 |
| 100 | 14 | | 69 | 2 |
| 13 | 13 | | 70 | 6 |
| 15 | 12 | | 73 | 2 |
| 85 | 12 | | 74 | 4 |
| 31 | 9 | | 75 | 3 |
| 42 | 9 | | 76 | 3 |
| 61 | 9 | | 77 | 7 |
| 92 | 9 | | 80 | 6 |
| 93 | 9 | | 82 | 2 |
| 29 | 8 | | 85 | 12 |
| 46 | 8 | | 86 | 2 |
| 50 | 8 | | 88 | 6 |
| 27 | 7 | | 91 | 4 |
| 35 | 4 | | 95 | 5 |
| 36 | 3 | | 96 | 7 |
| 39 | 6 | | 97 | 2 |
| 40 | 5 | | 98 | 7 |
| 43 | 5 | | 99 | 2 |
| 44 | 6 | | 55 | 6 |
| 45 | 5 | | 57 | 4 |
| 30 | 6 | | | |

## Simanim with 0 errors (50)

1–12, 14, 16, 18–26, 32–34, 41, 47–49, 51–54, 56, 58–60, 63, 65, 71–72, 78–79, 81, 83–84, 87, 89, 94

## Re-run commands

```bash
cd newtry/EH_001

# Single siman
node pipeline/validate-quality-eh001.mjs --root output/siman_001 --min-severity error --fail-on error

# With report
node pipeline/validate-quality-eh001.mjs --root output --siman 17 --min-severity warn --write-reports --report-dir checklist-output/siman017
```

## Next editorial priority

1. **Siman 002** — finish remaining commentaries (mechaber done; 0 errors on validator but spot-check MT)
2. **High-error simanim:** 17 (66), 28 (20), 90 (16), 37–38, 100
3. Validator **under-catches** clean-looking nonsense; **over-flags** `marker_label_mismatch` on EH `marker: א` blocks
