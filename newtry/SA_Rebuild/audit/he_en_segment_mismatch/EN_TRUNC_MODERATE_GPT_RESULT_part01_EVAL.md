# EN_TRUNC moderate GPT resegment — part01 evaluation

**Created:** 2026-08-28T08:33:16.033Z  
**Kit:** `EN_TRUNC_MODERATE_RESEGMENT_KIT_part01.json` (29 cases)  
**GPT result:** `EN_TRUNC_MODERATE_GPT_RESULT_part01.json` (29 cases)  
**Matches part01 exactly:** yes — 29 ids, same order (`oc1/siman1/seif-009/yad-ephraim` … `yd1/siman206/seif-005/beer-hagolah`)  
**Status:** evaluation only — **no corpus apply**

## Counts

| Verdict | Count |
|---------|------:|
| **APPROVE** | 3 |
| **HOLD** | 13 |
| **REJECT** | 13 |

## Recommendation

**Apply 3 APPROVE rows only** (`oc1/siman51`, `oc1/siman55`, `yd1/siman198/seif-015`). Do **not** blanket-apply part01.

13 HOLD rows have structurally plausible splits but editorial rewording or minor semantic drift — fix wording then re-evaluate.  
13 REJECT rows are truncated/over-merged (mostly JSON quote-break in pasted output).

**Re-prompt note:** GPT returned `he` fields with unescaped geresh quotes, corrupting many `en` extractions. For parts 02–04, ask for `en_segments` + `source` only, or valid JSON with escaped strings.

## APPROVE (3)

- `oc1/siman51/seif-009/ateret-zekenim` — Exact EN preserved; clean split after Zohar/Beit Yosef siman 50 vs Erev Yom Kippur block
- `oc1/siman55/seif-003/ateret-zekenim` — Exact EN preserved; split Kedushah/U'va LeTzion vs Maariv paragraph
- `yd1/siman198/seif-015/beer-hagolah` — Exact EN preserved; Tosefta vs (°) marelakin/kaltines gloss

## Non-APPROVE (26)

- `oc1/siman1/seif-009/yad-ephraim` — **REJECT**: Truncated parse — seg0 only 44 chars; ~88% EN lost (quote-break in pasted JSON)
- `oc1/siman128/seif-043/ateret-zekenim` — **REJECT**: Truncated — seg1 only 'The prayer beginning'; quote-break destroyed EN
- `oc1/siman440/seif-001/ateret-zekenim` — **REJECT**: Truncated — seg0 ends mid-quote; ~64% EN missing
- `yd1/siman114/seif-010/beer-hagolah` — **HOLD**: Good (°) split boundary but editorial rewording (32a→daf 32, etc.) — not split_existing_en
- `yd1/siman116/seif-004/beer-hagolah` — **HOLD**: Correct Tur/(°) Taz split but minor editorial (Orach Chaim spelling)
- `yd1/siman134/seif-003/beer-hagolah` — **REJECT**: Truncated — seg0='From the passage,' seg1 gloss only; ~72% lost
- `yd1/siman134/seif-013/beer-hagolah` — **HOLD**: Correct split but editorial ('poskim' for 'halachic authorities')
- `yd1/siman139/seif-004/beur-hagra` — **REJECT**: Truncated + rewritten seg0; seg1 Likut block incomplete
- `yd1/siman139/seif-012/beur-hagra` — **REJECT**: Rewrote seg0 (Be'er HaGadol, new wording); seg1 Likut truncated mid-s.v.
- `yd1/siman168/seif-017/beer-hagolah` — **HOLD**: Good (°) split; minor editorial ('money upon it' vs 'upon the collateral')
- `yd1/siman168/seif-022/beer-hagolah` — **HOLD**: Split OK but editorial ('Ri'→'R' Yitzchak') — violates preserve wording
- `yd1/siman173/seif-019/beer-hagolah` — **HOLD**: (°) gloss over-compressed to 'This is stated there in the Gemara' — semantic loss
- `yd1/siman175/seif-002/beur-hagra` — **REJECT**: Both Likut blocks truncated/paraphrased (~30% missing; Mishneh LaMelech→Maggid Mishneh)
- `yd1/siman177/seif-004/beer-hagolah` — **REJECT**: Truncated — Rashi gloss seg1 cut mid-sentence (~49% lost)
- `yd1/siman177/seif-012/beer-hagolah` — **HOLD**: Correct (°) split; added 'Meaning:' prefix (minor editorial)
- `yd1/siman177/seif-016/beur-hagra` — **REJECT**: Truncated Likut block — seg1 ends abruptly (~47% lost)
- `yd1/siman177/seif-018/beer-hagolah` — **REJECT**: Seg1 truncated before Rama/Darkei Moshe ending
- `yd1/siman177/seif-020/beer-hagolah` — **HOLD**: Correct (°) split; editorial ('householder' for 'borrower')
- `yd1/siman177/seif-021/beur-hagra` — **REJECT**: Truncated — seg0/seg1 fragments only (~92% lost)
- `yd1/siman177/seif-027/beur-hagra` — **REJECT**: Truncated — seg0 tiny; bulk in seg1 but ~62% missing overall
- `yd1/siman177/seif-036/beer-hagolah` — **HOLD**: Good (°) split; minor spelling (halachah→halacha)
- `yd1/siman177/seif-040/beer-hagolah` — **HOLD**: Good (°) split; minor editorial ('the Ramban', hyphenation)
- `yd1/siman178/seif-003/beer-hagolah` — **HOLD**: Good (°) split; minor article insertions ('the Rambam')
- `yd1/siman198/seif-043/beer-hagolah` — **HOLD**: Good (°) split; minor typo-level drift (Raavyah)
- `yd1/siman198/seif-045/baer-heitev` — **HOLD**: Correct Shach vs (מה*) immersion-note split; editorial (chatzitzah, b'dieved)
- `yd1/siman206/seif-005/beer-hagolah` — **REJECT**: Seg1 truncated at 'The Ran explains that' — quote-break

---
Machine eval: `EN_TRUNC_MODERATE_GPT_RESULT_part01_EVAL.json`
