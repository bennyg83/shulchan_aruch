# Segment rescan — 2026-08-28

**Scanned at:** 2026-08-28T12:03:33.953Z
**Corpus:** newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/
**After commits:** 8c2f076f17 (40 Likut + marker fix), 861e11374d (18 Likut)

## Counts vs baseline

| Kind | Baseline (start of day) | Now | Δ |
|------|------------------------:|----:|--:|
| `en_truncated_vs_multi_he` | 194 | **135** | -59 |
| `he_has_more_segments` | 295 | **128** | -167 |
| `en_has_more_segments` | 9 | **9** | +0 |
| `en_missing` | 2 | **2** | +0 |
| `he_missing` | 59 | **59** | +0 |
| **Total (sum of kinds)** | **559** | **333** | **-226** |

### By volume (now)

| Volume | Pairs | Issues | byKind |
|--------|------:|-------:|--------|
| oc1 | 89,911 | 65 | he_missing(59), he_has_more_segments(2), en_truncated_vs_multi_he(4) |
| yd1 | 25,946 | 187 | he_has_more_segments(92), en_has_more_segments(8), en_truncated_vs_multi_he(85), en_missing(2) |
| eh1 | 11,939 | 0 | — |
| cm1 | 70,186 | 81 | en_truncated_vs_multi_he(46), he_has_more_segments(34), en_has_more_segments(1) |

## Delta fixed today (approximate)

- **en_truncated_vs_multi_he**: ~59 fewer
- **he_has_more_segments**: ~167 fewer
- **Net issue drop (vs baseline sum):** ~226

## Likut kit status

| Metric | Count |
|--------|------:|
| Kit cases | 53 |
| Applied / aligned | **40** |
| HOLD remaining | **13** |
| HOLD reason | CONTENT_DRIFT (split_en rows) |

Eval: HE_HAS_MORE_LIKUT_SPLIT_GPT_RESULT_ALL_EVAL_POSTFIX.json (APPROVE 22, SKIP_APPLIED 18, HOLD 13).

## False-positive patterns still triggering

Full walk: SEGMENT_RESCAN_FP_ANALYSIS.json (2026-08-28T12:08:37.730Z)

| Pattern | Count | Role |
|---------|------:|------|
| `fp_zero_he_by_design` | 59 | Scanner flag; likely benign (EN-only / empty HE) |

## Top true-mismatch patterns (real open work)

1. **true_likut_en_merged (99)** — yd1/siman108/seif-001/beur-hagra, yd1/siman109/seif-001/beur-hagra
2. **true_en_truncated (69)** — oc1/siman162/seif-007/peri-megadim, oc1/siman252/seif-001/peri-megadim
3. **true_offset_editorial (61)** — oc1/siman294/seif-001/machatzit-hashekel, oc1/siman35/seif-001/kol-yaakov
4. **true_beer_degree_split (34)** — yd1/siman114/seif-010/beer-hagolah, yd1/siman116/seif-004/beer-hagolah
5. **true_en_oversplit (9)** — yd1/siman106/seif-002/baer-heitev, yd1/siman245/seif-006/beur-hagra

Re-run: node newtry/SA_Rebuild/scripts/scan_corpus_he_en_segment_mismatch.mjs
