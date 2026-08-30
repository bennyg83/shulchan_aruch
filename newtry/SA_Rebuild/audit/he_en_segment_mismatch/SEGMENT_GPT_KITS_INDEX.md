# SEGMENT_GPT_KITS_INDEX

External AI kits for HE/EN `<br>`-segment mismatches. **Audit only — no corpus apply.**

**Last rebuild:** 2026-08-30T07:00:06.653Z (post OPEN_CLASS_B_C apply — 1 remaining)
Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/`  
Rescan: [`SEGMENT_RESCAN_2026-08-30.json`](./SEGMENT_RESCAN_2026-08-30.json) · FP: [`SEGMENT_RESCAN_FP_ANALYSIS.json`](./SEGMENT_RESCAN_FP_ANALYSIS.json)

## OPEN CLASS B+C kit (remaining after GPT apply)

| Kit | Class | Cases | Parts | Max part bytes | SHA-256 (prefix) | Zip |
|-----|-------|------:|------:|---------------:|------------------|-----|
| `OPEN_CLASS_B_C_GPT_KIT` | C (retry) | 1 | 1 | 21,822 | `6fd4c96874ec…` | [`zips/01_OPEN_CLASS_B_C_GPT_KIT.zip`](./zips/01_OPEN_CLASS_B_C_GPT_KIT.zip) |

- Rebuilt: 2026-08-30T07:00:06.638Z — **1 remaining** after 14 applied
- ID: `yd1/siman109/seif-001/beur-hagra` (content_drift HOLD — retry `split_en` **verbatim**)
- Mode: `split_or_fresh_translate_hardened`
- Class A (12) + B+C APPROVE (14) applied; Hebrew untouched


## Excluded from all new kits

- **he_missing (59)** — held per user; do not include in ChatGPT kits until reassigned.
- Cells no longer flagged in post-apply rescan (fixed by today's applies).

## Rescan totals (post-apply)

| Kind | Open count |
|------|----------:|
| en_truncated_vs_multi_he | 0 |
| he_has_more_segments | 1 |
| en_has_more_segments | 0 |
| en_missing | 0 |
| he_missing | 59 (EXCLUDED) |
| **Actionable** | **1** |


## Active kit for open work

1. **OPEN_CLASS_B_C_GPT_KIT** — 1 remaining (`yd1/siman109/seif-001/beur-hagra`) content_drift HOLD retry.

Prior `_REMAINING` kits (27 cases) were the Class A + B+C pool; those cells are closed except the HOLD above. Stale `_REMAINING` JSON files may still exist on disk for history — **do not re-upload**.

## Prior kits (superseded for open work — reference only)

Older kits without _REMAINING suffix reflect pre-rescan state. Use _REMAINING kits above for new ChatGPT sessions.

| Prior kit | Original cases | Status |
|-----------|---------------:|--------|
| EN_TRUNC_MODERATE_RESEGMENT_KIT | 78 | 41 applied; 37 → MODERATE_REMAINING |
| EN_TRUNC_EDITORIAL_RETRANSLATE_KIT | 99 | 18 part01 applied; rest → EDITORIAL_REMAINING |
| HE_HAS_MORE_EDITORIAL_KIT | 218 | 127 applied; 91 HOLD → EDITORIAL_REMAINING |
| HE_HAS_MORE_LIKUT_SPLIT_KIT | 53 | 40 applied; 13 HOLD → LIKUT_REMAINING |
| GLUED_STILL_OPEN_9_KIT | 9 | → EN_HAS_MORE_REMAINING |
| EN_MISSING_2_HELD_KIT | 2 | → EN_MISSING_2_REMAINING |

## Apply log

- **2026-08-30:** OPEN_CLASS_B_C GPT — 14 applied (`30298d6f8b`); 1 HOLD content_drift (`yd1/siman109/seif-001/beur-hagra`); actionable → 1.

- **2026-08-28 AM:** EN_MISSING 18/20; EN_TRUNC wave1; HE_HAS_MORE wave1/wave2; Likut 40/53.
- **2026-08-28 PM:** Post-apply rescan → _REMAINING kit rebuild (27 cases across 3 kits).

## Deduplication

Each open cell assigned to exactly one kit via priority routing; same id never appears in multiple kits. Priority: en_missing → en_has_more → moderate HOLD → editorial kit → likut HOLD → editorial HOLD → beer degree → likut merged → en_trunc catch-all → he_has_more catch-all.

Zips: `zips/*_REMAINING.zip` (prompt + full parent JSON + parts + full_dictionary.md). See [`zips/ZIPS_MANIFEST.md`](./zips/ZIPS_MANIFEST.md).
