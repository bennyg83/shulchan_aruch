# HE_HAS_MORE editorial GPT — full evaluation (218 cases)

**Created:** 2026-08-28T11:28:06.218Z  
**Kit:** `HE_HAS_MORE_EDITORIAL_KIT.json` + parts 01–46 (`218` cases)  
**GPT result:** `HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL.json` (`218` cases)  
**Source:** `C:/Users/binya/Downloads/HE_HAS_MORE_EDITORIAL_ALL_218_FINAL.json`  
**ID order match:** yes  
**Status:** evaluation only — **no corpus apply**

## Summary counts

| Verdict | Count |
|---------|------:|
| **APPROVE** | 127 |
| **HOLD** | 91 |
| **REJECT** | 0 |
| **REPAIR_CANDIDATE** | 0 |

| GPT action | Count |
|------------|------:|
| split_en | 95 |
| needs_human | 60 |
| mixed_resegment_translate | 63 |

## Cross-check

- Kit cases: **218**
- GPT cases: **218**
- Missing from GPT: none
- Extra in GPT: none

## Counts by kit part

| Part | Total | APPROVE | HOLD | REJECT | REPAIR |
|------|------:|--------:|-----:|-------:|-------:|
| part01 | 2 | 2 | 0 | 0 | 0 |
| part02 | 1 | 0 | 1 | 0 | 0 |
| part03 | 6 | 5 | 1 | 0 | 0 |
| part04 | 3 | 3 | 0 | 0 | 0 |
| part05 | 2 | 0 | 2 | 0 | 0 |
| part06 | 2 | 1 | 1 | 0 | 0 |
| part07 | 2 | 2 | 0 | 0 | 0 |
| part08 | 2 | 0 | 2 | 0 | 0 |
| part09 | 10 | 6 | 4 | 0 | 0 |
| part10 | 11 | 2 | 9 | 0 | 0 |
| part11 | 6 | 4 | 2 | 0 | 0 |
| part12 | 14 | 8 | 6 | 0 | 0 |
| part13 | 10 | 6 | 4 | 0 | 0 |
| part14 | 14 | 11 | 3 | 0 | 0 |
| part15 | 5 | 1 | 4 | 0 | 0 |
| part16 | 15 | 12 | 3 | 0 | 0 |
| part17 | 8 | 5 | 3 | 0 | 0 |
| part18 | 13 | 10 | 3 | 0 | 0 |
| part19 | 17 | 10 | 7 | 0 | 0 |
| part20 | 12 | 6 | 6 | 0 | 0 |
| part21 | 11 | 8 | 3 | 0 | 0 |
| part22 | 1 | 1 | 0 | 0 | 0 |
| part23 | 1 | 0 | 1 | 0 | 0 |
| part24 | 2 | 0 | 2 | 0 | 0 |
| part25 | 2 | 0 | 2 | 0 | 0 |
| part26 | 4 | 1 | 3 | 0 | 0 |
| part27 | 1 | 0 | 1 | 0 | 0 |
| part28 | 3 | 1 | 2 | 0 | 0 |
| part29 | 1 | 0 | 1 | 0 | 0 |
| part30 | 2 | 2 | 0 | 0 | 0 |
| part31 | 2 | 1 | 1 | 0 | 0 |
| part32 | 1 | 0 | 1 | 0 | 0 |
| part33 | 2 | 1 | 1 | 0 | 0 |
| part34 | 1 | 0 | 1 | 0 | 0 |
| part35 | 1 | 1 | 0 | 0 | 0 |
| part36 | 2 | 2 | 0 | 0 | 0 |
| part37 | 3 | 3 | 0 | 0 | 0 |
| part38 | 2 | 1 | 1 | 0 | 0 |
| part39 | 2 | 2 | 0 | 0 | 0 |
| part40 | 2 | 2 | 0 | 0 | 0 |
| part41 | 1 | 1 | 0 | 0 | 0 |
| part42 | 1 | 1 | 0 | 0 | 0 |
| part43 | 3 | 2 | 1 | 0 | 0 |
| part44 | 3 | 2 | 1 | 0 | 0 |
| part45 | 1 | 0 | 1 | 0 | 0 |
| part46 | 8 | 1 | 7 | 0 | 0 |

## Counts by action (eval verdict)

| Action | Total | APPROVE | HOLD | REJECT | REPAIR |
|--------|------:|--------:|-----:|-------:|-------:|
| mixed_resegment_translate | 63 | 60 | 3 | 0 | 0 |
| needs_human | 60 | 0 | 60 | 0 | 0 |
| split_en | 95 | 67 | 28 | 0 | 0 |

## Top failure patterns

| Pattern / reason | Count |
|------------------|------:|
| HOLD:gpt_needs_human | 60 |
| LIKUT_MARKER_MISS | 58 |
| HOLD:LIKUT_MARKER_MISS_1 | 9 |
| HOLD:LIKUT_MARKER_MISS_3 | 5 |
| HOLD:LIKUT_MARKER_MISS_2 | 5 |
| FRESH_TRANSLATE | 5 |
| HOLD:LIKUT_MARKER_MISS_4 | 2 |
| HOLD:FRESH_TRANSLATE_1 | 2 |
| HOLD:LIKUT_MARKER_MISS_7 | 1 |
| HOLD:LIKUT_MARKER_MISS_17 | 1 |
| HOLD:LIKUT_MARKER_MISS_19 | 1 |
| FAILURE_FRESH_2:the craft | 1 |
| MIXED_INFLATED_3.209 | 1 |
| HOLD:FRESH_TRANSLATE_2 | 1 |
| BEER_DEGREE_MARKER_MISS | 1 |
| HOLD:BEER_DEGREE_MARKER_MISS_1 | 1 |
| HOLD:LIKUT_MARKER_MISS_8 | 1 |
| MIXED_INFLATED_1.589 | 1 |
| HOLD:LIKUT_MARKER_MISS_0 | 1 |
| MIXED_INFLATED_3.743 | 1 |

## Recommendation

- **127 APPROVE** — ready to apply after parent sign-off
- **0 REPAIR_CANDIDATE** — copy `segments[].en` → `en_segments`, re-run eval
- **91 HOLD** — includes 60 `needs_human` escalations + quality/confidence review
- **0 REJECT** — structural failure; re-prompt or manual fix
- **Do not apply yet** — await parent sign-off

## APPROVE (127)

See `HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL_APPROVE_IDS.txt` for full list.

- `oc1/siman5/seif-001/ateret-zekenim` (part01) — split_existing_en sig match
- `oc1/siman27/seif-004/machatzit-hashekel` (part01) — split_existing_en sig match
- `oc1/siman42/seif-003/biur-halacha` (part03) — split_existing_en sig match
- `oc1/siman162/seif-001/machatzit-hashekel` (part03) — mixed resegment + fresh_translate OK
- `oc1/siman280/seif-001/machatzit-hashekel` (part03) — mixed resegment + fresh_translate OK
- `oc1/siman451/seif-027/chok-yaakov` (part03) — mixed resegment + fresh_translate OK
- `oc1/siman464/seif-001/chok-yaakov` (part03) — mixed resegment + fresh_translate OK
- `oc1/siman475/seif-001/chok-yaakov` (part04) — mixed resegment + fresh_translate OK
- `oc1/siman494/seif-003/chok-yaakov` (part04) — mixed resegment + fresh_translate OK
- `yd1/siman107/seif-001/turei-zahav` (part04) — split_existing_en sig match
- `yd1/siman110/seif-008/yad-avraham` (part06) — split_existing_en sig match
- `yd1/siman124/seif-012/turei-zahav` (part07) — split_existing_en sig match
- `yd1/siman124/seif-024/turei-zahav` (part07) — split_existing_en sig match
- `yd1/siman128/seif-002/siftei-kohen` (part09) — mixed resegment + fresh_translate OK
- `yd1/siman129/seif-011/siftei-kohen` (part09) — mixed resegment + fresh_translate OK
- `yd1/siman130/seif-001/siftei-kohen` (part09) — split_existing_en sig match
- `yd1/siman131/seif-001/beer-hagolah` (part09) — mixed resegment + fresh_translate OK
- `yd1/siman131/seif-002/siftei-kohen` (part09) — mixed resegment + fresh_translate OK
- `yd1/siman133/seif-001/siftei-kohen` (part09) — split_existing_en sig match
- `yd1/siman134/seif-001/siftei-kohen` (part10) — mixed resegment + fresh_translate OK
- `yd1/siman134/seif-005/turei-zahav` (part10) — mixed resegment + fresh_translate OK
- `yd1/siman138/seif-001/beur-hagra` (part11) — split_existing_en sig match
- `yd1/siman139/seif-001/beur-hagra` (part11) — split_existing_en sig match
- `yd1/siman141/seif-001/siftei-kohen` (part11) — mixed resegment + fresh_translate OK
- `yd1/siman143/seif-001/siftei-kohen` (part11) — mixed resegment + fresh_translate OK
- `yd1/siman145/seif-003/turei-zahav` (part12) — mixed resegment + fresh_translate OK
- `yd1/siman145/seif-009/beer-hagolah` (part12) — mixed resegment + fresh_translate OK
- `yd1/siman148/seif-001/siftei-kohen` (part12) — mixed resegment + fresh_translate OK
- `yd1/siman149/seif-003/siftei-kohen` (part12) — split_existing_en sig match
- `yd1/siman151/seif-004/siftei-kohen` (part12) — mixed resegment + fresh_translate OK
- `yd1/siman152/seif-001/beer-hagolah` (part12) — mixed resegment + fresh_translate OK
- `yd1/siman154/seif-001/siftei-kohen` (part12) — split_existing_en sig match
- `yd1/siman155/seif-003/siftei-kohen` (part12) — split_existing_en sig match
- `yd1/siman157/seif-001/turei-zahav` (part13) — mixed resegment + fresh_translate OK
- `yd1/siman159/seif-003/siftei-kohen` (part13) — split_existing_en sig match
- `yd1/siman160/seif-006/siftei-kohen` (part13) — mixed resegment + fresh_translate OK
- `yd1/siman160/seif-018/siftei-kohen` (part13) — mixed resegment + fresh_translate OK
- `yd1/siman161/seif-011/siftei-kohen` (part13) — split_existing_en sig match
- `yd1/siman162/seif-002/siftei-kohen` (part13) — split_existing_en sig match
- `yd1/siman162/seif-003/siftei-kohen` (part14) — mixed resegment + fresh_translate OK
- `yd1/siman162/seif-005/beur-hagra` (part14) — split_existing_en sig match
- `yd1/siman162/seif-005/siftei-kohen` (part14) — mixed resegment + fresh_translate OK
- `yd1/siman162/seif-005/turei-zahav` (part14) — split_existing_en sig match
- `yd1/siman163/seif-003/beur-hagra` (part14) — mixed resegment + fresh_translate OK
- `yd1/siman165/seif-001/turei-zahav` (part14) — mixed resegment + fresh_translate OK
- `yd1/siman166/seif-002/siftei-kohen` (part14) — mixed resegment + fresh_translate OK
- `yd1/siman168/seif-003/siftei-kohen` (part14) — mixed resegment + fresh_translate OK
- `yd1/siman168/seif-005/siftei-kohen` (part14) — split_existing_en sig match
- `yd1/siman168/seif-009/siftei-kohen` (part14) — mixed resegment + fresh_translate OK
- `yd1/siman168/seif-011/siftei-kohen` (part14) — split_existing_en sig match
- `yd1/siman170/seif-002/beur-hagra` (part15) — mixed resegment + fresh_translate OK
- `yd1/siman171/seif-001/siftei-kohen` (part16) — split_existing_en sig match
- `yd1/siman173/seif-001/siftei-kohen` (part16) — split_existing_en sig match
- `yd1/siman173/seif-004/beur-hagra` (part16) — mixed resegment + fresh_translate OK
- `yd1/siman173/seif-013/siftei-kohen` (part16) — mixed resegment + fresh_translate OK
- `yd1/siman174/seif-001/siftei-kohen` (part16) — split_existing_en sig match
- `yd1/siman177/seif-001/siftei-kohen` (part16) — split_existing_en sig match
- `yd1/siman177/seif-005/siftei-kohen` (part16) — mixed resegment + fresh_translate OK
- `yd1/siman177/seif-018/siftei-kohen` (part16) — split_existing_en sig match
- `yd1/siman178/seif-001/siftei-kohen` (part16) — mixed resegment + fresh_translate OK
- `yd1/siman184/seif-001/siftei-kohen` (part16) — mixed resegment + fresh_translate OK
- `yd1/siman184/seif-007/siftei-kohen` (part16) — split_existing_en sig match
- `yd1/siman184/seif-010/siftei-kohen` (part16) — split_existing_en sig match
- `yd1/siman185/seif-003/siftei-kohen` (part17) — split_existing_en sig match
- `yd1/siman192/seif-003/siftei-kohen` (part17) — split_existing_en sig match
- `yd1/siman192/seif-004/siftei-kohen` (part17) — split_existing_en sig match
- `yd1/siman194/seif-001/turei-zahav` (part17) — split_existing_en sig match
- `yd1/siman195/seif-003/siftei-kohen` (part17) — split_existing_en sig match
- `yd1/siman200/seif-001/beer-hagolah` (part18) — mixed resegment + fresh_translate OK
- `yd1/siman202/seif-006/siftei-kohen` (part18) — mixed resegment + fresh_translate OK
- `yd1/siman206/seif-001/siftei-kohen` (part18) — split_existing_en sig match
- `yd1/siman208/seif-001/siftei-kohen` (part18) — mixed resegment + fresh_translate OK
- `yd1/siman210/seif-001/turei-zahav` (part18) — mixed resegment + fresh_translate OK
- `yd1/siman212/seif-001/siftei-kohen` (part18) — mixed resegment + fresh_translate OK
- `yd1/siman216/seif-001/siftei-kohen` (part18) — mixed resegment + fresh_translate OK
- `yd1/siman220/seif-015/beur-hagra` (part18) — split_existing_en sig match
- `yd1/siman222/seif-001/turei-zahav` (part18) — mixed resegment + fresh_translate OK
- `yd1/siman226/seif-001/baer-heitev` (part18) — split_existing_en sig match
- `yd1/siman226/seif-002/baer-heitev` (part19) — mixed resegment + fresh_translate OK
- `yd1/siman226/seif-002/beur-hagra` (part19) — mixed resegment + fresh_translate OK
- `yd1/siman230/seif-001/beur-hagra` (part19) — mixed resegment + fresh_translate OK
- `yd1/siman231/seif-001/turei-zahav` (part19) — mixed resegment + fresh_translate OK
- `yd1/siman234/seif-021/beur-hagra` (part19) — mixed resegment + fresh_translate OK
- `yd1/siman240/seif-002/beur-hagra` (part19) — mixed resegment + fresh_translate OK
- `yd1/siman240/seif-008/beur-hagra` (part19) — mixed resegment + fresh_translate OK
- `yd1/siman241/seif-001/beur-hagra` (part19) — split_existing_en sig match
- `yd1/siman243/seif-002/beur-hagra` (part19) — mixed resegment + fresh_translate OK
- `yd1/siman254/seif-002/turei-zahav` (part19) — split_existing_en sig match
- `yd1/siman257/seif-002/beur-hagra` (part20) — mixed resegment + fresh_translate OK
- `yd1/siman258/seif-005/beur-hagra` (part20) — mixed resegment + fresh_translate OK
- `yd1/siman258/seif-008/beur-hagra` (part20) — mixed resegment + fresh_translate OK
- `yd1/siman259/seif-002/beur-hagra` (part20) — mixed resegment + fresh_translate OK
- `yd1/siman259/seif-006/beur-hagra` (part20) — mixed resegment + fresh_translate OK
- `yd1/siman275/seif-002/siftei-kohen` (part20) — split_existing_en sig match
- `yd1/siman282/seif-002/siftei-kohen` (part21) — split_existing_en sig match
- `yd1/siman282/seif-007/baer-heitev` (part21) — split_existing_en sig match
- `yd1/siman288/seif-015/beur-hagra` (part21) — mixed resegment + fresh_translate OK
- `yd1/siman289/seif-002/beur-hagra` (part21) — split_existing_en sig match
- `yd1/siman289/seif-006/beur-hagra` (part21) — mixed resegment + fresh_translate OK
- `yd1/siman299/seif-001/beur-hagra` (part21) — mixed resegment + fresh_translate OK
- `yd1/siman391/seif-003/siftei-kohen` (part21) — split_existing_en sig match
- `cm1/siman12/seif-002/urim-vetumim-tumim` (part21) — split_existing_en sig match
- `cm1/siman24/seif-001/urim-vetumim-tumim` (part22) — split_existing_en sig match
- `cm1/siman82/seif-012/urim-vetumim-tumim` (part26) — split_existing_en sig match
- `cm1/siman87/seif-011/urim-vetumim-tumim` (part28) — split_existing_en sig match
- `cm1/siman88/seif-032/urim-vetumim-tumim` (part30) — split_existing_en sig match
- `cm1/siman89/seif-001/urim-vetumim-tumim` (part30) — split_existing_en sig match
- `cm1/siman89/seif-003/meirat-einayim` (part31) — mixed resegment + fresh_translate OK
- `cm1/siman91/seif-003/meirat-einayim` (part33) — mixed resegment + fresh_translate OK
- `cm1/siman92/seif-002/urim-vetumim-tumim` (part35) — split_existing_en sig match
- `cm1/siman95/seif-001/urim-vetumim-tumim` (part36) — split_existing_en sig match
- `cm1/siman97/seif-006/urim-vetumim-tumim` (part36) — split_existing_en sig match
- `cm1/siman97/seif-012/urim-vetumim-tumim` (part37) — split_existing_en sig match
- `cm1/siman97/seif-023/meirat-einayim` (part37) — split_existing_en sig match
- `cm1/siman99/seif-001/urim-vetumim-tumim` (part37) — split_existing_en sig match
- `cm1/siman99/seif-006/urim-vetumim-tumim` (part38) — split_existing_en sig match
- `cm1/siman102/seif-002/urim-vetumim-tumim` (part39) — split_existing_en sig match
- `cm1/siman103/seif-009/urim-vetumim-tumim` (part39) — split_existing_en sig match
- `cm1/siman105/seif-006/urim-vetumim-tumim` (part40) — split_existing_en sig match
- `cm1/siman107/seif-001/meirat-einayim` (part40) — split_existing_en sig match
- `cm1/siman107/seif-001/urim-vetumim-tumim` (part41) — split_existing_en sig match
- `cm1/siman112/seif-001/urim-vetumim-tumim` (part42) — split_existing_en sig match
- `cm1/siman115/seif-003/urim-vetumim-tumim` (part43) — split_existing_en sig match
- `cm1/siman115/seif-004/urim-vetumim-tumim` (part43) — split_existing_en sig match
- `cm1/siman122/seif-004/urim-vetumim-urim` (part44) — split_existing_en sig match
- `cm1/siman128/seif-001/urim-vetumim-tumim` (part44) — split_existing_en sig match
- `cm1/siman268/seif-001/chokhmat-shlomo` (part46) — split_existing_en sig match

## REPAIR_CANDIDATE (0)

(none)

## HOLD / REJECT (91)

- `oc1/siman35/seif-001/kol-yaakov` — **HOLD** (needs_human) — gpt_needs_human
- `oc1/siman294/seif-001/machatzit-hashekel` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman108/seif-001/beur-hagra` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman109/seif-001/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_7 [LIKUT_MARKER_MISS_7]
- `yd1/siman115/seif-002/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_3 [LIKUT_MARKER_MISS_3]
- `yd1/siman127/seif-001/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_17 [LIKUT_MARKER_MISS_17]
- `yd1/siman127/seif-001/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman127/seif-003/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_2 [LIKUT_MARKER_MISS_2, LIKUT_MARKER_MISS_7, LIKUT_MARKER_MISS_11, LIKUT_MARKER_MISS_12, LIKUT_MARKER_MISS_13, …]
- `yd1/siman127/seif-003/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman128/seif-001/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman131/seif-001/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman134/seif-003/turei-zahav` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman135/seif-004/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman135/seif-006/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_1 [LIKUT_MARKER_MISS_1, LIKUT_MARKER_MISS_3]
- `yd1/siman135/seif-008/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_1 [LIKUT_MARKER_MISS_1, LIKUT_MARKER_MISS_5]
- `yd1/siman135/seif-012/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman135/seif-015/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_2 [LIKUT_MARKER_MISS_2, LIKUT_MARKER_MISS_5, LIKUT_MARKER_MISS_7]
- `yd1/siman137/seif-001/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman137/seif-001/turei-zahav` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman137/seif-004/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman141/seif-003/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman141/seif-004/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman145/seif-001/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman145/seif-001/turei-zahav` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman148/seif-001/turei-zahav` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman151/seif-001/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman155/seif-001/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman157/seif-001/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_19 [LIKUT_MARKER_MISS_19]
- `yd1/siman157/seif-001/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman160/seif-005/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_3 [LIKUT_MARKER_MISS_3]
- `yd1/siman161/seif-002/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_1 [LIKUT_MARKER_MISS_1, LIKUT_MARKER_MISS_2, LIKUT_MARKER_MISS_4]
- `yd1/siman162/seif-002/beur-hagra` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman165/seif-001/beer-hagolah` — **HOLD** (mixed_resegment_translate) — FRESH_TRANSLATE_2 [FRESH_TRANSLATE_2, FRESH_TRANSLATE_3, FAILURE_FRESH_2:the craft, MIXED_INFLATED_3.209]
- `yd1/siman165/seif-001/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman166/seif-001/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman168/seif-013/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman168/seif-018/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman170/seif-001/turei-zahav` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman170/seif-002/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman170/seif-002/turei-zahav` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman173/seif-006/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman184/seif-002/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman184/seif-012/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman189/seif-022/beer-hagolah` — **HOLD** (split_en) — BEER_DEGREE_MARKER_MISS_1 [BEER_DEGREE_MARKER_MISS_1]
- `yd1/siman191/seif-001/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman197/seif-002/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman199/seif-003/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman204/seif-002/turei-zahav` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman226/seif-001/beur-hagra` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman236/seif-002/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman240/seif-024/beur-hagra` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman242/seif-004/beur-hagra` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman242/seif-016/beur-hagra` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman246/seif-004/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_4 [LIKUT_MARKER_MISS_4]
- `yd1/siman246/seif-021/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_8 [LIKUT_MARKER_MISS_8]
- `yd1/siman258/seif-007/beur-hagra` — **HOLD** (mixed_resegment_translate) — FRESH_TRANSLATE_1 [FRESH_TRANSLATE_1, MIXED_INFLATED_1.589, LIKUT_MARKER_MISS_5]
- `yd1/siman258/seif-013/beur-hagra` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman275/seif-002/turei-zahav` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman276/seif-009/turei-zahav` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman280/seif-001/beur-hagra` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman280/seif-001/turei-zahav` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman287/seif-002/turei-zahav` — **HOLD** (needs_human) — gpt_needs_human
- `yd1/siman297/seif-051/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_3 [LIKUT_MARKER_MISS_3, LIKUT_MARKER_MISS_4]
- `cm1/siman12/seif-012/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_2 [LIKUT_MARKER_MISS_2]
- `cm1/siman25/seif-001/urim-vetumim-tumim` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman28/seif-017/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_1 [LIKUT_MARKER_MISS_1, LIKUT_MARKER_MISS_3, LIKUT_MARKER_MISS_5, LIKUT_MARKER_MISS_6]
- `cm1/siman34/seif-018/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_1 [LIKUT_MARKER_MISS_1, LIKUT_MARKER_MISS_5]
- `cm1/siman56/seif-001/netivot-hamishpat-beurim` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman65/seif-023/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_1 [LIKUT_MARKER_MISS_1, LIKUT_MARKER_MISS_3]
- `cm1/siman66/seif-015/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_0 [LIKUT_MARKER_MISS_0, LIKUT_MARKER_MISS_4, LIKUT_MARKER_MISS_6, LIKUT_MARKER_MISS_7, LIKUT_MARKER_MISS_11, …]
- `cm1/siman75/seif-009/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_4 [LIKUT_MARKER_MISS_4]
- `cm1/siman81/seif-014/meirat-einayim` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman85/seif-003/urim-vetumim-tumim` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman87/seif-001/meirat-einayim` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman87/seif-020/meirat-einayim` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman88/seif-012/ketzot-hachoshen` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman89/seif-005/meirat-einayim` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman90/seif-001/urim-vetumim-tumim` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman90/seif-011/meirat-einayim` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman91/seif-009/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman102/seif-002/beur-hagra` — **HOLD** (mixed_resegment_translate) — FRESH_TRANSLATE_1 [FRESH_TRANSLATE_1, FRESH_TRANSLATE_3, MIXED_INFLATED_3.743, LIKUT_MARKER_MISS_4]
- `cm1/siman120/seif-002/beur-hagra` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman175/seif-058/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_3 [LIKUT_MARKER_MISS_3]
- `cm1/siman255/seif-003/siftei-kohen` — **HOLD** (needs_human) — gpt_needs_human
- `cm1/siman267/seif-005/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_1 [LIKUT_MARKER_MISS_1]
- `cm1/siman269/seif-006/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_1 [LIKUT_MARKER_MISS_1, LIKUT_MARKER_MISS_4]
- `cm1/siman285/seif-007/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_3 [LIKUT_MARKER_MISS_3, LIKUT_MARKER_MISS_5]
- `cm1/siman359/seif-001/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_2 [LIKUT_MARKER_MISS_2]
- `cm1/siman360/seif-001/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_1 [LIKUT_MARKER_MISS_1, LIKUT_MARKER_MISS_3, LIKUT_MARKER_MISS_4, LIKUT_MARKER_MISS_6]
- `cm1/siman378/seif-006/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_5 [LIKUT_MARKER_MISS_5]
- `cm1/siman390/seif-003/beur-hagra` — **HOLD** (split_en) — LIKUT_MARKER_MISS_2 [LIKUT_MARKER_MISS_2]

---
Machine eval: `HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL_EVAL.json`  
Re-run: `node _eval_he_has_more_editorial_gpt_all.mjs`
