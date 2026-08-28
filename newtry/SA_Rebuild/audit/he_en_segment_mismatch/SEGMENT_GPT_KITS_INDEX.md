# SEGMENT_GPT_KITS_INDEX

External AI kits for HE/EN `<br>`-segment mismatches. **Audit only — no corpus apply.**

**Last rebuild:** 2026-08-28T15:39:33.542Z (rescan-driven _REMAINING kits)  
Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/`  
Rescan: [`SEGMENT_RESCAN_2026-08-28.json`](./SEGMENT_RESCAN_2026-08-28.json) · FP: [`SEGMENT_RESCAN_FP_ANALYSIS.json`](./SEGMENT_RESCAN_FP_ANALYSIS.json)

## Excluded from all new kits

- **he_missing (59)** — held per user; do not include in ChatGPT kits until reassigned.
- Cells no longer flagged in post-apply rescan (fixed by today's applies).

## Rescan totals (post-apply)

| Kind | Open count |
|------|----------:|
| en_truncated_vs_multi_he | 135 |
| he_has_more_segments | 128 |
| en_has_more_segments | 9 |
| en_missing | 2 |
| he_missing | 59 (EXCLUDED) |
| **Actionable** | **274** |

## Run order (_REMAINING kits — use these)

1. **EN_MISSING_2_REMAINING** — 2 en_missing still open.
2. **EN_HAS_MORE_REMAINING** — 9 glued/oversplit EN cases.
3. **EN_TRUNC_MODERATE_REMAINING** — moderate HOLD+REJECT retry.
4. **EN_TRUNC_EDITORIAL_REMAINING** — editorial en_trunc (parts 02-06 + part01 holds).
5. **BEER_DEGREE_SPLIT_REMAINING** — Beer HaGolah degree splits.
6. **EN_TRUNC_REMAINING** — other en_truncated catch-all.
7. **HE_HAS_MORE_LIKUT_REMAINING** — 13 Likut content_drift HOLD retry.
8. **HE_HAS_MORE_EDITORIAL_REMAINING** — 91 editorial HOLD retry.
9. **HE_HAS_MORE_LIKUT_MERGED_REMAINING** — true_likut_en_merged pattern.
10. **HE_HAS_MORE_OFFSET_REMAINING** — residual offset editorial he_has_more.

## _REMAINING kits (this rebuild)

| Kit | Kind | Cases | Parts | Max part bytes | SHA-256 (prefix) | Path |
|-----|------|------:|------:|---------------:|------------------|------|
| `EN_TRUNC_MODERATE_REMAINING` | rescan_remaining | 11 | 1 | 16,983 | `f956afce095e…` | [`EN_TRUNC_MODERATE_REMAINING.json`](./EN_TRUNC_MODERATE_REMAINING.json) |
| `BEER_DEGREE_SPLIT_REMAINING` | rescan_remaining | 2 | 1 | 4,709 | `cc0204442b41…` | [`BEER_DEGREE_SPLIT_REMAINING.json`](./BEER_DEGREE_SPLIT_REMAINING.json) |
| `HE_HAS_MORE_LIKUT_REMAINING` | rescan_remaining | 9 | 1 | 39,220 | `ccf2bfc38f7a…` | [`HE_HAS_MORE_LIKUT_REMAINING.json`](./HE_HAS_MORE_LIKUT_REMAINING.json) |
| `HE_HAS_MORE_EDITORIAL_REMAINING` | rescan_remaining | 16 | 3 | 79,465 | `fcca387a10a0…` | [`HE_HAS_MORE_EDITORIAL_REMAINING.json`](./HE_HAS_MORE_EDITORIAL_REMAINING.json) |
| `HE_HAS_MORE_LIKUT_MERGED_REMAINING` | rescan_remaining | 1 | 1 | 5,290 | `117eed565f85…` | [`HE_HAS_MORE_LIKUT_MERGED_REMAINING.json`](./HE_HAS_MORE_LIKUT_MERGED_REMAINING.json) |

**Total cases in rebuilt kits:** 39 (of 274 actionable; 0 unassigned)

### One-line purpose

- **EN_TRUNC_MODERATE_REMAINING**: Moderate kit HOLD+REJECT still en_truncated
- **BEER_DEGREE_SPLIT_REMAINING**: beer-hagolah degree/footnote EN under-split
- **HE_HAS_MORE_LIKUT_REMAINING**: 13 Likut kit HOLD (content_drift) still open
- **HE_HAS_MORE_EDITORIAL_REMAINING**: 91 editorial HOLD still he_has_more
- **HE_HAS_MORE_LIKUT_MERGED_REMAINING**: true_likut_en_merged he_has_more not in other kits

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

- **2026-08-28 AM:** EN_MISSING 18/20; EN_TRUNC wave1; HE_HAS_MORE wave1/wave2; Likut 40/53.
- **2026-08-28 PM:** Post-apply rescan → _REMAINING kit rebuild (39 cases across 5 kits).

## Deduplication

Each open cell assigned to exactly one kit via priority routing; same id never appears in multiple kits. Priority: en_missing → en_has_more → moderate HOLD → editorial kit → likut HOLD → editorial HOLD → beer degree → likut merged → en_trunc catch-all → he_has_more catch-all.

Zips: `zips/*_REMAINING.zip` (prompt + full parent JSON + parts + full_dictionary.md). See [`zips/ZIPS_MANIFEST.md`](./zips/ZIPS_MANIFEST.md).
