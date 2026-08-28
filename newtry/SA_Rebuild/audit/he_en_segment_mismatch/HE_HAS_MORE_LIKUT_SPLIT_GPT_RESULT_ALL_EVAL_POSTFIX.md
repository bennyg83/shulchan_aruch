# HE_HAS_MORE Likut split GPT — full evaluation (53 cases)

**Created:** 2026-08-28T11:56:29.412Z  
**Kit:** `HE_HAS_MORE_LIKUT_SPLIT_KIT.json` + parts 01–04 (`53` cases)  
**GPT result:** `HE_HAS_MORE_LIKUT_SPLIT_GPT_RESULT_ALL.json` (`53` cases)  
**Source:** `C:\Users\binya\Documents\shulchan-aruch-clean\newtry\SA_Rebuild\audit\he_en_segment_mismatch\HE_HAS_MORE_LIKUT_SPLIT_GPT_RESULT_ALL.json`  
**ID order match:** yes  
**Status:** evaluation only — **no corpus apply**

## Summary counts

| Verdict | Count |
|---------|------:|
| **APPROVE** | 22 |
| **HOLD** | 13 |
| **REJECT** | 0 |
| **REPAIR_CANDIDATE** | 0 |
| **SKIP_APPLIED** | 18 |

| GPT action | Count |
|------------|------:|
| split_en | 13 |
| mixed_resegment_translate | 40 |

## Cross-check

- Kit cases: **53**
- GPT cases: **53**
- Missing from GPT: none
- Extra in GPT: none

## Counts by kit part

| Part | Total | APPROVE | HOLD | REJECT | REPAIR | SKIP |
|------|------:|--------:|-----:|-------:|-------:|-----:|
| part01 | 15 | 3 | 10 | 0 | 0 | 2 |
| part02 | 21 | 10 | 3 | 0 | 0 | 8 |
| part03 | 13 | 6 | 0 | 0 | 0 | 7 |
| part04 | 4 | 3 | 0 | 0 | 0 | 1 |

## Counts by action (eval verdict)

| Action | Total | APPROVE | HOLD | REJECT | REPAIR | SKIP |
|--------|------:|--------:|-----:|-------:|-------:|-----:|
| missing | 18 | 0 | 0 | 0 | 0 | 18 |
| mixed_resegment_translate | 22 | 22 | 0 | 0 | 0 | 0 |
| split_en | 13 | 0 | 13 | 0 | 0 | 0 |

## Top failure patterns

| Pattern / reason | Count |
|------------------|------:|
| CONTENT_DRIFT | 13 |
| HOLD:content_drift_vs_corpus_en | 13 |

## Recommendation

- **22 APPROVE** — ready to apply after parent sign-off (18 already applied in corpus → SKIP_APPLIED)
- **0 REPAIR_CANDIDATE** — copy `segments[].en` → `en_segments`, re-run eval
- **13 HOLD** — quality/marker/confidence review
- **0 REJECT** — structural failure; re-prompt or manual fix
- **18 SKIP_APPLIED** — corpus already has correct he/en segment counts
- **Do not apply yet** — await parent sign-off

## APPROVE (22)

See `HE_HAS_MORE_LIKUT_SPLIT_GPT_RESULT_ALL_APPROVE_IDS.txt` for full list.

- `yd1/siman146/seif-011/beur-hagra` (part01) — mixed resegment + fresh_translate OK
- `yd1/siman190/seif-005/beur-hagra` (part01) — mixed resegment + fresh_translate OK
- `yd1/siman201/seif-040/beur-hagra` (part01) — mixed resegment + fresh_translate OK
- `cm1/siman20/seif-001/beur-hagra` (part02) — mixed resegment + fresh_translate OK
- `cm1/siman28/seif-006/beur-hagra` (part02) — mixed resegment + fresh_translate OK
- `cm1/siman33/seif-006/beur-hagra` (part02) — mixed resegment + fresh_translate OK
- `cm1/siman34/seif-005/beur-hagra` (part02) — mixed resegment + fresh_translate OK
- `cm1/siman43/seif-007/beur-hagra` (part02) — mixed resegment + fresh_translate OK
- `cm1/siman43/seif-018/beur-hagra` (part02) — mixed resegment + fresh_translate OK
- `cm1/siman46/seif-006/beur-hagra` (part02) — mixed resegment + fresh_translate OK
- `cm1/siman65/seif-010/beur-hagra` (part02) — mixed resegment + fresh_translate OK
- `cm1/siman67/seif-033/beur-hagra` (part02) — mixed resegment + fresh_translate OK
- `cm1/siman71/seif-014/beur-hagra` (part02) — mixed resegment + fresh_translate OK
- `cm1/siman115/seif-001/beur-hagra` (part03) — mixed resegment + fresh_translate OK
- `cm1/siman117/seif-001/beur-hagra` (part03) — mixed resegment + fresh_translate OK
- `cm1/siman167/seif-001/beur-hagra` (part03) — mixed resegment + fresh_translate OK
- `cm1/siman186/seif-002/beur-hagra` (part03) — mixed resegment + fresh_translate OK
- `cm1/siman202/seif-013/beur-hagra` (part03) — mixed resegment + fresh_translate OK
- `cm1/siman207/seif-018/beur-hagra` (part03) — mixed resegment + fresh_translate OK
- `cm1/siman346/seif-001/beur-hagra` (part04) — mixed resegment + fresh_translate OK
- `cm1/siman354/seif-005/beur-hagra` (part04) — mixed resegment + fresh_translate OK
- `cm1/siman389/seif-008/beur-hagra` (part04) — mixed resegment + fresh_translate OK

## SKIP_APPLIED (18)

- `yd1/siman96/seif-001/beur-hagra` — corpus_he=11_en=11_match_heSegs=11
- `yd1/siman98/seif-001/beur-hagra` — corpus_he=9_en=9_match_heSegs=9
- `cm1/siman28/seif-005/beur-hagra` — corpus_he=7_en=7_match_heSegs=7
- `cm1/siman34/seif-023/beur-hagra` — corpus_he=3_en=3_match_heSegs=3
- `cm1/siman72/seif-005/beur-hagra` — corpus_he=4_en=4_match_heSegs=4
- `cm1/siman77/seif-010/beur-hagra` — corpus_he=5_en=5_match_heSegs=5
- `cm1/siman79/seif-003/beur-hagra` — corpus_he=3_en=3_match_heSegs=3
- `cm1/siman92/seif-007/beur-hagra` — corpus_he=6_en=6_match_heSegs=6
- `cm1/siman96/seif-003/beur-hagra` — corpus_he=9_en=9_match_heSegs=9
- `cm1/siman105/seif-004/beur-hagra` — corpus_he=6_en=6_match_heSegs=6
- `cm1/siman129/seif-010/beur-hagra` — corpus_he=7_en=7_match_heSegs=7
- `cm1/siman264/seif-004/beur-hagra` — corpus_he=8_en=8_match_heSegs=8
- `cm1/siman267/seif-018/beur-hagra` — corpus_he=5_en=5_match_heSegs=5
- `cm1/siman270/seif-001/beur-hagra` — corpus_he=4_en=4_match_heSegs=4
- `cm1/siman304/seif-001/beur-hagra` — corpus_he=4_en=4_match_heSegs=4
- `cm1/siman334/seif-001/beur-hagra` — corpus_he=6_en=6_match_heSegs=6
- `cm1/siman339/seif-010/beur-hagra` — corpus_he=4_en=4_match_heSegs=4
- `cm1/siman353/seif-002/beur-hagra` — corpus_he=4_en=4_match_heSegs=4

## REPAIR_CANDIDATE (0)

(none)

## HOLD / REJECT (13)

- `yd1/siman84/seif-006/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]
- `yd1/siman115/seif-003/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]
- `yd1/siman128/seif-003/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]
- `yd1/siman128/seif-004/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]
- `yd1/siman135/seif-001/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]
- `yd1/siman160/seif-016/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]
- `yd1/siman160/seif-017/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]
- `yd1/siman160/seif-020/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]
- `yd1/siman160/seif-023/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]
- `yd1/siman240/seif-007/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]
- `yd1/siman246/seif-026/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]
- `yd1/siman296/seif-003/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]
- `yd1/siman296/seif-032/beur-hagra` — **HOLD** (split_en) — content_drift_vs_corpus_en [CONTENT_DRIFT]

---
Machine eval: `HE_HAS_MORE_LIKUT_SPLIT_GPT_RESULT_ALL_EVAL.json`  
Re-run: `node _eval_he_has_more_likut_split_gpt_all.mjs`
