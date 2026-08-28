# EN_TRUNC editorial GPT fresh_translate — part01 evaluation

**Created:** 2026-08-28T08:43:41.300Z  
**Kit:** `EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part01.json` (30 cases)  
**GPT result:** `EN_TRUNC_EDITORIAL_GPT_RESULT_part01.json` (30 cases)  
**Kit part matched:** part01 (30 ids)  
**ID order match:** yes  
**Status:** evaluation only — **no corpus apply**

## Counts

| Verdict | Count |
|---------|------:|
| APPROVE | 18 |
| HOLD | 11 |
| REJECT | 1 |

## Corpus spot-check (APPROVE sample)

| ID | kit heSegs | GPT enSegs | corpus he | corpus en | would fix trunc |
|----|----------:|-----------:|----------:|----------:|:---------------:|
| `oc1/siman289/seif-001/peri-megadim` | 4 | 4 | 4 | 1 | yes |
| `yd1/siman129/seif-020/siftei-kohen` | 3 | 3 | 3 | 1 | yes |
| `yd1/siman135/seif-005/siftei-kohen` | 2 | 2 | 2 | 1 | yes |
| `yd1/siman138/seif-008/siftei-kohen` | 2 | 2 | 2 | 1 | yes |
| `yd1/siman145/seif-007/beer-hagolah` | 2 | 2 | 2 | 1 | yes |
| `yd1/siman154/seif-001/baer-heitev` | 2 | 2 | 2 | 1 | yes |

## Flag: kit HE truncated

- `yd1/siman129/seif-009/siftei-kohen` — kit Hebrew slot 2 truncated; GPT noted in notes. **HOLD**.

## APPROVE (18)

- `oc1/siman289/seif-001/peri-megadim` — segment count OK; fresh translate complete
- `yd1/siman129/seif-020/siftei-kohen` — segment count OK; fresh translate complete
- `yd1/siman135/seif-005/siftei-kohen` — segment count OK; fresh translate complete
- `yd1/siman138/seif-008/siftei-kohen` — segment count OK; fresh translate complete
- `yd1/siman145/seif-007/beer-hagolah` — segment count OK; fresh translate complete
- `yd1/siman154/seif-001/baer-heitev` — segment count OK; fresh translate complete
- `yd1/siman159/seif-003/beur-hagra` — segment count OK; fresh translate complete
- `yd1/siman162/seif-002/beer-hagolah` — segment count OK; fresh translate complete
- `yd1/siman162/seif-003/beur-hagra` — segment count OK; fresh translate complete
- `yd1/siman166/seif-001/turei-zahav` — segment count OK; fresh translate complete
- `yd1/siman168/seif-007/siftei-kohen` — segment count OK; fresh translate complete
- `yd1/siman168/seif-020/siftei-kohen` — segment count OK; fresh translate complete
- `yd1/siman170/seif-001/siftei-kohen` — segment count OK; fresh translate complete
- `yd1/siman175/seif-003/turei-zahav` — segment count OK; fresh translate complete
- `yd1/siman175/seif-008/beur-hagra` — segment count OK; fresh translate complete
- `yd1/siman177/seif-039/siftei-kohen` — segment count OK; fresh translate complete
- `yd1/siman181/seif-011/turei-zahav` — segment count OK; fresh translate complete
- `yd1/siman185/seif-004/beer-hagolah` — segment count OK; fresh translate complete

## HOLD / REJECT (12)

- `oc1/siman162/seif-007/peri-megadim` — **HOLD**: en_segments_mirror_incomplete [EN_SEGMENTS_MIRROR_LEN]
- `oc1/siman252/seif-001/peri-megadim` — **HOLD**: TRUNC_SV_0 [EN_SEGMENTS_MIRROR_LEN, TRUNC_SV_0, SHORT_EN_1, LOW_COVERAGE_1, TRUNC_END_4]
- `oc1/siman292/seif-002/machatzit-hashekel` — **HOLD**: en_segments_mirror_incomplete [EN_SEGMENTS_MIRROR_LEN]
- `yd1/siman129/seif-009/siftei-kohen` — **HOLD**: kit_he_truncated [KIT_HE_TRUNCATED]
- `yd1/siman145/seif-002/turei-zahav` — **HOLD**: TRUNC_END_0 [EN_SEGMENTS_MIRROR_LEN, TRUNC_END_0, TRUNC_END_1]
- `yd1/siman147/seif-005/beur-hagra` — **REJECT**: EMPTY_EN_1 [EMPTY_EN_1, LOW_COVERAGE_1]
- `yd1/siman150/seif-002/beur-hagra` — **HOLD**: TRUNC_SV_1 [TRUNC_SV_1]
- `yd1/siman153/seif-003/beur-hagra` — **HOLD**: TRUNC_SV_1 [EN_SEGMENTS_MIRROR_LEN, TRUNC_SV_1, TRUNC_SV_2]
- `yd1/siman153/seif-004/beur-hagra` — **HOLD**: TRUNC_SV_1 [TRUNC_SV_1]
- `yd1/siman156/seif-001/siftei-kohen` — **HOLD**: TRUNC_END_1 [EN_SEGMENTS_MIRROR_LEN, TRUNC_END_1]
- `yd1/siman167/seif-001/beur-hagra` — **HOLD**: en_segments_mirror_incomplete [EN_SEGMENTS_MIRROR_LEN]
- `yd1/siman183/seif-001/turei-zahav` — **HOLD**: TRUNC_END_1 [EN_SEGMENTS_MIRROR_LEN, TRUNC_END_1, SHORT_EN_1, LOW_COVERAGE_1]

---
Machine eval: `EN_TRUNC_EDITORIAL_GPT_RESULT_part01_EVAL.json`
