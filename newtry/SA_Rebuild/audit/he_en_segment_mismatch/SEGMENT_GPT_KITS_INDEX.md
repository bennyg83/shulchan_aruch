# SEGMENT_GPT_KITS_INDEX

External AI kits for HE/EN `<br>`-segment mismatches. **Audit only — no corpus apply.**

**Last rebuild:** 2026-08-28T12:23:32.008Z (rescan-driven _REMAINING kits)  
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

Numbered zip files in `zips/` (`01_`–`10_`) match this sequence:

1. **EN_MISSING_2_REMAINING** — `01_EN_MISSING_2_REMAINING.zip` — 2 en_missing still open.
2. **EN_HAS_MORE_REMAINING** — `02_EN_HAS_MORE_REMAINING.zip` — 9 glued/oversplit EN cases.
3. **EN_TRUNC_MODERATE_REMAINING** — `03_EN_TRUNC_MODERATE_REMAINING.zip` — moderate HOLD+REJECT retry.
4. **BEER_DEGREE_SPLIT_REMAINING** — `04_BEER_DEGREE_SPLIT_REMAINING.zip` — Beer HaGolah degree splits.
5. **EN_TRUNC_REMAINING** — `05_EN_TRUNC_REMAINING.zip` — other en_truncated catch-all.
6. **HE_HAS_MORE_LIKUT_REMAINING** — `06_HE_HAS_MORE_LIKUT_REMAINING.zip` — 13 Likut content_drift HOLD retry.
7. **HE_HAS_MORE_LIKUT_MERGED_REMAINING** — `07_HE_HAS_MORE_LIKUT_MERGED_REMAINING.zip` — true_likut_en_merged pattern.
8. **HE_HAS_MORE_OFFSET_REMAINING** — `08_HE_HAS_MORE_OFFSET_REMAINING.zip` — residual offset editorial he_has_more.
9. **EN_TRUNC_EDITORIAL_REMAINING** — `09_EN_TRUNC_EDITORIAL_REMAINING.zip` — editorial en_trunc (parts 02-06 + part01 holds).
10. **HE_HAS_MORE_EDITORIAL_REMAINING** — `10_HE_HAS_MORE_EDITORIAL_REMAINING.zip` — 91 editorial HOLD retry.

## _REMAINING kits (this rebuild)

| Run | Kit | Zip file | Kind | Cases | Parts | Max part bytes | SHA-256 (prefix) | Path |
|-----|-----|----------|------|------:|------:|---------------:|------------------|------|
| 1 | `EN_MISSING_2_REMAINING` | `01_EN_MISSING_2_REMAINING.zip` | rescan_remaining | 2 | 1 | 8,282 | `9b482c6b6e45…` | [`EN_MISSING_2_REMAINING.json`](./EN_MISSING_2_REMAINING.json) |
| 2 | `EN_HAS_MORE_REMAINING` | `02_EN_HAS_MORE_REMAINING.zip` | rescan_remaining | 9 | 1 | 64,414 | `a55e960fc216…` | [`EN_HAS_MORE_REMAINING.json`](./EN_HAS_MORE_REMAINING.json) |
| 3 | `EN_TRUNC_MODERATE_REMAINING` | `03_EN_TRUNC_MODERATE_REMAINING.zip` | rescan_remaining | 37 | 1 | 49,401 | `becbc57c9ccd…` | [`EN_TRUNC_MODERATE_REMAINING.json`](./EN_TRUNC_MODERATE_REMAINING.json) |
| 4 | `BEER_DEGREE_SPLIT_REMAINING` | `04_BEER_DEGREE_SPLIT_REMAINING.zip` | rescan_remaining | 7 | 1 | 10,782 | `3494dc15766f…` | [`BEER_DEGREE_SPLIT_REMAINING.json`](./BEER_DEGREE_SPLIT_REMAINING.json) |
| 5 | `EN_TRUNC_REMAINING` | `05_EN_TRUNC_REMAINING.zip` | rescan_remaining | 10 | 3 | 69,115 | `1594ec5636a0…` | [`EN_TRUNC_REMAINING.json`](./EN_TRUNC_REMAINING.json) |
| 6 | `HE_HAS_MORE_LIKUT_REMAINING` | `06_HE_HAS_MORE_LIKUT_REMAINING.zip` | rescan_remaining | 13 | 1 | 55,407 | `d3ce76992fd7…` | [`HE_HAS_MORE_LIKUT_REMAINING.json`](./HE_HAS_MORE_LIKUT_REMAINING.json) |
| 7 | `HE_HAS_MORE_LIKUT_MERGED_REMAINING` | `07_HE_HAS_MORE_LIKUT_MERGED_REMAINING.zip` | rescan_remaining | 18 | 2 | 82,850 | `1f62a603ae6d…` | [`HE_HAS_MORE_LIKUT_MERGED_REMAINING.json`](./HE_HAS_MORE_LIKUT_MERGED_REMAINING.json) |
| 8 | `HE_HAS_MORE_OFFSET_REMAINING` | `08_HE_HAS_MORE_OFFSET_REMAINING.zip` | rescan_remaining | 6 | 6 | 82,241 | `bc72dbb7df72…` | [`HE_HAS_MORE_OFFSET_REMAINING.json`](./HE_HAS_MORE_OFFSET_REMAINING.json) |
| 9 | `EN_TRUNC_EDITORIAL_REMAINING` | `09_EN_TRUNC_EDITORIAL_REMAINING.zip` | rescan_remaining | 81 | 5 | 82,207 | `001557c92c1d…` | [`EN_TRUNC_EDITORIAL_REMAINING.json`](./EN_TRUNC_EDITORIAL_REMAINING.json) |
| 10 | `HE_HAS_MORE_EDITORIAL_REMAINING` | `10_HE_HAS_MORE_EDITORIAL_REMAINING.zip` | rescan_remaining | 91 | 17 | 84,354 | `58a918920b38…` | [`HE_HAS_MORE_EDITORIAL_REMAINING.json`](./HE_HAS_MORE_EDITORIAL_REMAINING.json) |

**Total cases in rebuilt kits:** 274 (of 274 actionable; 0 unassigned)

### One-line purpose

- **EN_MISSING_2_REMAINING**: 2 en_missing still open in rescan
- **EN_HAS_MORE_REMAINING**: 9 en_has_more / glued oversplit still open
- **EN_TRUNC_MODERATE_REMAINING**: Moderate kit HOLD+REJECT still en_truncated
- **EN_TRUNC_EDITORIAL_REMAINING**: Editorial en_trunc still open (parts 02-06 + part01 holds)
- **BEER_DEGREE_SPLIT_REMAINING**: beer-hagolah degree/footnote EN under-split
- **EN_TRUNC_REMAINING**: Other en_truncated not in moderate/editorial/beer kits
- **HE_HAS_MORE_LIKUT_REMAINING**: 13 Likut kit HOLD (content_drift) still open
- **HE_HAS_MORE_EDITORIAL_REMAINING**: 91 editorial HOLD still he_has_more
- **HE_HAS_MORE_LIKUT_MERGED_REMAINING**: true_likut_en_merged he_has_more not in other kits
- **HE_HAS_MORE_OFFSET_REMAINING**: Residual he_has_more (offset editorial)

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
- **2026-08-28 PM:** Post-apply rescan → _REMAINING kit rebuild (274 cases across 10 kits).

## Deduplication

Each open cell assigned to exactly one kit via priority routing; same id never appears in multiple kits. Priority: en_missing → en_has_more → moderate HOLD → editorial kit → likut HOLD → editorial HOLD → beer degree → likut merged → en_trunc catch-all → he_has_more catch-all.

Zips: `zips/01_*` … `10_*_REMAINING.zip` (numbered by run order; prompt + parts + full_dictionary.md). See [`zips/ZIPS_MANIFEST.md`](./zips/ZIPS_MANIFEST.md).
