# EN_MISSING — APPROVE apply (18)

**Date:** 2026-08-28  
**Corpus (LIVE):** `newtry/OC_Mobile/oc318-mobile-reader/public/corpus`  
**Source:** `EN_MISSING_GPT_TRANSLATIONS.json` (fresh_translate) + `EN_MISSING_PACK.json`  
**HE:** never modified.

## Result

| Result | Count |
|--------|------:|
| **Applied** | **18** |
| **Held** | **2** |
| Failed | 0 |

All 18 verified: non-empty `en.html`, `enSegs === heSegs` (1:1). Format: plain text + trailing newline (sibling single-segment style).

Pack residual `en_missing` (of original 20): **2** (the holds below).  
Live yd1 recount (`heSegs>0`, `enSegs===0`): **2** (same two holds).

## Citation fixes (before write)

1. `yd1/siman122/seif-001/mateh-yehonatan` — Pesachim **daf 30** → **daf 39** (HE: דף ל״ט).
2. `yd1/siman124/seif-001/mateh-yehonatan` — first cite restored to beginning of siman **155** (קנ״ה); later “below in siman **125**” (קכ״ה) kept. Do not collapse both to 125.

Also applied `yd1/siman115/seif-001/rabbi-akiva-eiger-yd` (butter / hamah) as approved.

## Applied (18)

1. `yd1/siman115/seif-001/rabbi-akiva-eiger-yd`
2. `yd1/siman116/seif-001/yad-avraham`
3. `yd1/siman121/seif-001/mateh-yehonatan`
4. `yd1/siman122/seif-001/mateh-yehonatan` — citation fix daf 39
5. `yd1/siman123/seif-001/mateh-yehonatan`
6. `yd1/siman124/seif-001/mateh-yehonatan` — citation fix 155 / 125
7. `yd1/siman128/seif-001/mateh-yehonatan`
8. `yd1/siman128/seif-001/rabbi-akiva-eiger-yd`
9. `yd1/siman129/seif-001/mateh-yehonatan`
10. `yd1/siman132/seif-001/mateh-yehonatan`
11. `yd1/siman133/seif-001/mateh-yehonatan`
12. `yd1/siman159/seif-001/yad-avraham`
13. `yd1/siman166/seif-001/rabbi-akiva-eiger-yd`
14. `yd1/siman166/seif-001/yad-avraham`
15. `yd1/siman177/seif-001/yad-avraham`
16. `yd1/siman235/seif-001/rabbi-akiva-eiger-yd`
17. `yd1/siman258/seif-001/yad-avraham`
18. `yd1/siman268/seif-001/yad-avraham`

## Held (2) — do not apply

1. `yd1/siman173/seif-001/yad-avraham` — Noda B'Yehuda Tinyana: HE chelek YD (חי״ד) siman 75; EN wrongly Choshen Mishpat.
2. `yd1/siman210/seif-001/yad-avraham` — HE garbled `?dl"a`; EN expansion uncertain.

## Notes

- `EN_MISSING_PACK` cells are seif-001 dumps that cite other seifim — expected.
- No MT bootstrap; GPT fresh_translate only.
