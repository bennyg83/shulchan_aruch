# SEGMENT_GPT_KITS_INDEX

External AI kits for HE/EN `<br>`-segment mismatches. **Audit only — no corpus apply.**

**Last rebuild:** 2026-08-30T05:59:15.936Z (rescan-driven _REMAINING kits)  
Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/`  
Rescan: [`SEGMENT_RESCAN_2026-08-30.json`](./SEGMENT_RESCAN_2026-08-30.json) · FP: [`SEGMENT_RESCAN_FP_ANALYSIS.json`](./SEGMENT_RESCAN_FP_ANALYSIS.json)

## OPEN CLASS B+C kit (2026-08-30 — GPT first; Class A applied separately)

**Do not include Class A (12 mechanical Likut splits) in GPT sessions.** Those are applied locally.

| Kit | Class | Cases | Parts | Max part bytes | SHA-256 (prefix) | Zip |
|-----|-------|------:|------:|---------------:|------------------|-----|
| `OPEN_CLASS_B_C_GPT_KIT` | B+C | 15 | 3 | 84,068 | `d822ab2a483b…` | [`zips/01_OPEN_CLASS_B_C_GPT_KIT.zip`](./zips/01_OPEN_CLASS_B_C_GPT_KIT.zip) |

- Built: 2026-08-30T06:25:24.132Z
- Mode: `split_or_fresh_translate_hardened`
- Full HE/EN from live corpus (no truncation)
- Class B (3): multi-Extract / garbled-slot editorial
- Class C (12): long Gra / offset / missing EN / quality fresh_translate
- Prompt: hardened FAILURE RULES (verbatim split where EN complete; fresh_translate gaps; ban "the craft"/"Saturday"; `(Likkut)` on ליקוט heads)

## Excluded from all new kits

- **he_missing (59)** — held per user; do not include in ChatGPT kits until reassigned.
- Cells no longer flagged in post-apply rescan (fixed by today's applies).

## Rescan totals (post-apply)

| Kind | Open count |
|------|----------:|
| en_truncated_vs_multi_he | 1 |
| he_has_more_segments | 26 |
| en_has_more_segments | 0 |
| en_missing | 0 |
| he_missing | 59 (EXCLUDED) |
| **Actionable** | **27** |

## Run order (_REMAINING kits — use these)

1. **EN_MISSING_2_REMAINING** — en_missing still open.
2. **EN_HAS_MORE_REMAINING** — glued/oversplit EN cases.
3. **EN_TRUNC_MODERATE_REMAINING** — moderate HOLD+REJECT retry.
4. **EN_TRUNC_EDITORIAL_REMAINING** — editorial en_trunc.
5. **BEER_DEGREE_SPLIT_REMAINING** — Beer HaGolah degree splits.
6. **EN_TRUNC_REMAINING** — other en_truncated catch-all.
7. **HE_HAS_MORE_LIKUT_REMAINING** — Likut content_drift HOLD retry.
8. **HE_HAS_MORE_EDITORIAL_REMAINING** — editorial HOLD retry.
9. **HE_HAS_MORE_LIKUT_MERGED_REMAINING** — true_likut_en_merged pattern.
10. **HE_HAS_MORE_OFFSET_REMAINING** — residual offset editorial he_has_more.

## _REMAINING kits (this rebuild)

| Kit | Kind | Cases | Parts | Max part bytes | SHA-256 (prefix) | Path |
|-----|------|------:|------:|---------------:|------------------|------|
| `EN_TRUNC_MODERATE_REMAINING` | rescan_remaining | 1 | 1 | 5,582 | `8c6b12c28c17…` | [`EN_TRUNC_MODERATE_REMAINING.json`](./EN_TRUNC_MODERATE_REMAINING.json) |
| `HE_HAS_MORE_LIKUT_REMAINING` | rescan_remaining | 10 | 1 | 41,120 | `499ae9722b8a…` | [`HE_HAS_MORE_LIKUT_REMAINING.json`](./HE_HAS_MORE_LIKUT_REMAINING.json) |
| `HE_HAS_MORE_EDITORIAL_REMAINING` | rescan_remaining | 16 | 3 | 79,894 | `ea4ac620ee65…` | [`HE_HAS_MORE_EDITORIAL_REMAINING.json`](./HE_HAS_MORE_EDITORIAL_REMAINING.json) |

**Total cases in rebuilt kits:** 27 (of 27 actionable; 0 unassigned)

### One-line purpose

- **EN_TRUNC_MODERATE_REMAINING**: Moderate kit HOLD+REJECT still en_truncated
- **HE_HAS_MORE_LIKUT_REMAINING**: 13 Likut kit HOLD (content_drift) still open
- **HE_HAS_MORE_EDITORIAL_REMAINING**: 91 editorial HOLD still he_has_more

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
- **2026-08-28 PM:** Post-apply rescan → _REMAINING kit rebuild (27 cases across 3 kits).

## Deduplication

Each open cell assigned to exactly one kit via priority routing; same id never appears in multiple kits. Priority: en_missing → en_has_more → moderate HOLD → editorial kit → likut HOLD → editorial HOLD → beer degree → likut merged → en_trunc catch-all → he_has_more catch-all.

Zips: `zips/*_REMAINING.zip` (prompt + full parent JSON + parts + full_dictionary.md). See [`zips/ZIPS_MANIFEST.md`](./zips/ZIPS_MANIFEST.md).
