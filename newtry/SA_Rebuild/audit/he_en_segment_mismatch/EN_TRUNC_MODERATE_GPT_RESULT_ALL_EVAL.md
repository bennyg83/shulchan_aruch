# EN_TRUNC moderate GPT resegment — full evaluation (78 cases)

**Created:** 2026-08-28T09:16:20.940Z  
**Kit:** parts 01–04 (`78` cases)  
**GPT result:** `EN_TRUNC_MODERATE_GPT_RESULT_ALL.json` (`78` cases)  
**Source:** `EN_TRUNC_MODERATE_RESEGMENT_ALL_COMPLETED.json`  
**ID order match:** yes  
**Status:** evaluation only — **no corpus apply**

## Summary counts

| Verdict | Count |
|---------|------:|
| **APPROVE** | 29 |
| **HOLD** | 36 |
| **REJECT** | 1 |
| **SKIP_APPLIED** | 12 |

| Metric | Count |
|--------|------:|
| REPAIR_CANDIDATE (quote_break, segments[].en OK) | 0 |
| New APPROVE ready to apply | 29 |
| Need re-prompt (REJECT, not repairable) | 1 |

## Counts by kit part

| Part | Total | APPROVE | HOLD | REJECT | SKIP_APPLIED | REPAIR_CAND |
|------|------:|--------:|-----:|-------:|-------------:|------------:|
| part01 | 29 | 7 | 10 | 0 | 12 | 0 |
| part02 | 29 | 7 | 22 | 0 | 0 | 0 |
| part03 | 17 | 12 | 4 | 1 | 0 | 0 |
| part04 | 3 | 3 | 0 | 0 | 0 | 0 |

## Recommendation

**29 new APPROVE** rows ready to apply (excluding 12 already applied).  
**0 REPAIR_CANDIDATE** — copy `segments[].en` → `en_segments` then re-eval (same fix as part01 quote_break repair).  
**1 need re-prompt** — truncated, invented text, or structural failure.  
**10 HOLD (fresh_translate)** — GPT re-translated from HE instead of splitting existing EN; needs manual review or re-prompt.  
**26 HOLD (pattern/marker)** — structurally plausible split but missing (°)/Likkut markers or minor editorial drift; fix wording then re-eval.  
**Do not apply yet** — await parent sign-off.

### vs part01-only eval

| Metric | part01 prior | All 78 (non-SKIP part01) |
|--------|-------------:|-------------------------:|
| APPROVE | 3 | 7 |
| HOLD | 13 | 10 |
| REJECT | 13 | 0 |

Part01 prior eval suffered JSON quote-break truncation (13 REJECT). Complete GPT JSON fixes 7 of those to APPROVE/HOLD with full `segments[].en`. Zero `en_segments` vs `segments[].en` mirror mismatches across all 78 cases.

## APPROVE (29)

- `yd1/siman139/seif-004/beur-hagra` (part01) — EN preserved (sig match); minor punctuation/spacing only
- `yd1/siman139/seif-012/beur-hagra` (part01) — EN preserved (sig match); minor punctuation/spacing only
- `yd1/siman175/seif-002/beur-hagra` (part01) — EN preserved (sig match); minor punctuation/spacing only
- `yd1/siman177/seif-016/beur-hagra` (part01) — EN preserved (sig match); minor punctuation/spacing only
- `yd1/siman177/seif-020/beer-hagolah` (part01) — EN preserved (sig match); minor punctuation/spacing only
- `yd1/siman177/seif-040/beer-hagolah` (part01) — EN preserved (sig match); minor punctuation/spacing only
- `yd1/siman198/seif-045/baer-heitev` (part01) — EN preserved (sig match); minor punctuation/spacing only
- `yd1/siman216/seif-007/beer-hagolah` (part02) — EN preserved (sig match); minor punctuation/spacing only
- `yd1/siman289/seif-003/turei-zahav` (part02) — EN preserved (sig match); minor punctuation/spacing only
- `yd1/siman296/seif-001/beer-hagolah` (part02) — EN preserved (sig match); minor punctuation/spacing only
- `yd1/siman296/seif-042/beer-hagolah` (part02) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman7/seif-008/chelkat-mechokek` (part02) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman66/seif-007/chokhmat-shlomo` (part02) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman71/seif-012/turei-zahav` (part02) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman78/seif-001/chokhmat-shlomo` (part03) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman88/seif-029/siftei-kohen` (part03) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman128/seif-001/chelkat-mechokek` (part03) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman141/seif-001/ketzot-hachoshen` (part03) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman147/seif-003/urim-vetumim-tumim` (part03) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman147/seif-004/urim-vetumim-urim` (part03) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman182/seif-011/netivot-hamishpat-beurim` (part03) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman294/seif-001/haggahot-imrei-barukh` (part03) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman329/seif-001/beer-hagolah` (part03) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman346/seif-010/beer-hagolah` (part03) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman359/seif-002/rabbi-akiva-eiger` (part03) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman361/seif-002/rabbi-akiva-eiger` (part03) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman380/seif-003/beer-hagolah` (part04) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman389/seif-008/beer-hagolah` (part04) — EN preserved (sig match); minor punctuation/spacing only
- `cm1/siman427/seif-001/rabbi-akiva-eiger` (part04) — EN preserved (sig match); minor punctuation/spacing only

## REPAIR_CANDIDATE (0)

(none)

## HOLD — fresh_translate (10)

- `yd1/siman263/seif-004/turei-zahav` (part02) — FRESH_TRANSLATE_0; ratio 1.469
- `cm1/siman33/seif-009/rabbi-akiva-eiger` (part02) — FRESH_TRANSLATE_0; ratio 1.578
- `cm1/siman43/seif-011/beur-hagra` (part02) — FRESH_TRANSLATE_0; ratio 1.179
- `cm1/siman46/seif-004/beur-hagra` (part02) — FRESH_TRANSLATE_0; ratio 1.562
- `cm1/siman46/seif-009/beur-hagra` (part02) — FRESH_TRANSLATE_0; ratio 1.258
- `cm1/siman49/seif-008/beur-hagra` (part02) — FRESH_TRANSLATE_0; ratio 2.015
- `cm1/siman72/seif-029/beur-hagra` (part02) — FRESH_TRANSLATE_0; ratio 1.794
- `cm1/siman72/seif-037/beur-hagra` (part02) — FRESH_TRANSLATE_0; ratio 1.361
- `cm1/siman155/seif-008/beur-hagra` (part03) — FRESH_TRANSLATE_0; ratio 1.345
- `cm1/siman304/seif-004/beur-hagra` (part03) — FRESH_TRANSLATE_0; ratio 1.757

## HOLD — pattern/marker drift (26)

- `yd1/siman114/seif-010/beer-hagolah` (part01) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman116/seif-004/beer-hagolah` (part01) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman134/seif-013/beer-hagolah` (part01) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman168/seif-017/beer-hagolah` (part01) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman168/seif-022/beer-hagolah` (part01) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman173/seif-019/beer-hagolah` (part01) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman177/seif-012/beer-hagolah` (part01) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman177/seif-036/beer-hagolah` (part01) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman178/seif-003/beer-hagolah` (part01) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman198/seif-043/beer-hagolah` (part01) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman234/seif-051/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman238/seif-012/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman239/seif-010/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman251/seif-001/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman267/seif-030/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman267/seif-034/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman286/seif-022/beur-hagra` (part02) — LIKUT_MARKER_MISS_1 [LIKUT_MARKER_MISS_1]
- `yd1/siman294/seif-024/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman296/seif-005/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman296/seif-039/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman296/seif-053/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman296/seif-059/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman296/seif-069/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `yd1/siman297/seif-010/beer-hagolah` (part02) — BEER_DEGREE_SPLIT_MISS [BEER_DEGREE_SPLIT_MISS]
- `cm1/siman78/seif-008/beur-hagra` (part03) — LIKUT_MARKER_MISS_1 [LIKUT_MARKER_MISS_1]
- `cm1/siman358/seif-001/beur-hagra` (part03) — LIKUT_MARKER_MISS_1 [LIKUT_MARKER_MISS_1]



## REJECT (1)

- `cm1/siman89/seif-004/urim-vetumim-urim` (part03) — TRUNCATED_0.896 [FRESH_TRANSLATE_0, HAS_FRESH_TRANSLATE, CONTENT_DRIFT, TRUNCATED_0.896]

## SKIP_APPLIED (12)

- `oc1/siman1/seif-009/yad-ephraim` (part01)
- `oc1/siman51/seif-009/ateret-zekenim` (part01)
- `oc1/siman55/seif-003/ateret-zekenim` (part01)
- `oc1/siman128/seif-043/ateret-zekenim` (part01)
- `oc1/siman440/seif-001/ateret-zekenim` (part01)
- `yd1/siman134/seif-003/beer-hagolah` (part01)
- `yd1/siman177/seif-004/beer-hagolah` (part01)
- `yd1/siman177/seif-018/beer-hagolah` (part01)
- `yd1/siman177/seif-021/beur-hagra` (part01)
- `yd1/siman177/seif-027/beur-hagra` (part01)
- `yd1/siman198/seif-015/beer-hagolah` (part01)
- `yd1/siman206/seif-005/beer-hagolah` (part01)

---
Machine eval: `EN_TRUNC_MODERATE_GPT_RESULT_ALL_EVAL.json`
