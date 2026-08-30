# Segment rescan — post reupload apply (2026-08-30)

**Scanned:** 2026-08-30T05:55:32.016Z  
**Baseline:** ~39 actionable + 59 he_missing (after marker fixes, commit 17357dda2d)  
**Apply:** 12 cells from reupload kits 03+04 ([REMAINING_GPT_ALL_APPLY.json](./REMAINING_GPT_ALL_APPLY.json))

## Totals

| Metric | Prior (post-marker) | Post-reupload | Δ |
|--------|--------------------:|--------------:|--:|
| **All issues** | 98 | 86 | **-12** |
| **Actionable** (excl. he_missing) | 39 | 27 | **-12** |
| he_missing | 59 | 59 | 0 |
| he_has_more_segments | — | 26 | |
| en_truncated_vs_multi_he | — | 1 | |
| en_has_more_segments | — | 0 | |
| en_missing | — | 0 | |

## By volume

| Volume | Pairs | Issues | Top kinds |
|--------|------:|-------:|-----------|
| oc1 | 89911 | 59 | he_missing (59) |
| yd1 | 25946 | 27 | he_has_more_segments (26), en_truncated_vs_multi_he (1) |
| eh1 | 11939 | 0 | — |
| cm1 | 70186 | 0 | — |

## Eval this round

| Kit | APPROVE | HOLD | Applied |
|-----|--------:|-----:|--------:|
| 03 EN_TRUNC_MODERATE_REMAINING | 10 | 1 | 10 |
| 04 BEER_DEGREE_SPLIT_REMAINING | 2 | 0 | 2 |
| 06 HE_HAS_MORE_LIKUT_REMAINING | 0 | 9 | 0 |
| 07 HE_HAS_MORE_LIKUT_MERGED_REMAINING | 0 | 1 | 0 |
| 10 HE_HAS_MORE_EDITORIAL_REMAINING | 0 | 16 | 0 |
| **Total** | **12** | **27** | **12** |

HOLD reasons: content_drift (18), content_drift_vs_corpus_en (1), fresh_translate_quality (8).

Machine JSON: `SEGMENT_RESCAN_2026-08-30.json`
