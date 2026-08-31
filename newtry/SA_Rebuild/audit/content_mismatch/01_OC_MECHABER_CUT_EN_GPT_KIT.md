# 01_OC_MECHABER_CUT_EN_GPT_KIT

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `fresh_translate_complete_from_he` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **120** |
| Parts | 11 |
| Parent JSON bytes | 766,835 |
| Max part bytes | 84,371 |

## Files

- Full kit: [`01_OC_MECHABER_CUT_EN_GPT_KIT.json`](./01_OC_MECHABER_CUT_EN_GPT_KIT.json) (SHA `6677f2e7e406…`)
- Parts: target ≤ 85,000 UTF-8 bytes; single-case parts keep **full** HE/EN (may exceed cap)
- Zip: [`zips/01_OC_MECHABER_CUT_EN_GPT_KIT.zip`](./zips/01_OC_MECHABER_CUT_EN_GPT_KIT.zip) includes **full parent** `01_OC_MECHABER_CUT_EN_GPT_KIT.json` + all parts + dictionary
- Created: 2026-08-31T07:41:42.160Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
| 1 | `01_OC_MECHABER_CUT_EN_GPT_KIT_part01.json` | 16 | 0 | 83,839 | `260db8ece5a1…` |  |
| 2 | `01_OC_MECHABER_CUT_EN_GPT_KIT_part02.json` | 10 | 16 | 83,782 | `7204a458918a…` |  |
| 3 | `01_OC_MECHABER_CUT_EN_GPT_KIT_part03.json` | 11 | 26 | 78,931 | `fa32d5b0606a…` |  |
| 4 | `01_OC_MECHABER_CUT_EN_GPT_KIT_part04.json` | 10 | 37 | 81,077 | `56dccbef071a…` |  |
| 5 | `01_OC_MECHABER_CUT_EN_GPT_KIT_part05.json` | 11 | 47 | 83,039 | `8f8dfe2f3547…` |  |
| 6 | `01_OC_MECHABER_CUT_EN_GPT_KIT_part06.json` | 13 | 58 | 84,176 | `8a2c6c7dc6a9…` |  |
| 7 | `01_OC_MECHABER_CUT_EN_GPT_KIT_part07.json` | 13 | 71 | 75,224 | `be9c7ae4896d…` |  |
| 8 | `01_OC_MECHABER_CUT_EN_GPT_KIT_part08.json` | 11 | 84 | 84,371 | `34488f15589d…` |  |
| 9 | `01_OC_MECHABER_CUT_EN_GPT_KIT_part09.json` | 13 | 95 | 84,145 | `5b9b2ce9e466…` |  |
| 10 | `01_OC_MECHABER_CUT_EN_GPT_KIT_part10.json` | 11 | 108 | 63,134 | `fa89c3c46cc4…` |  |
| 11 | `01_OC_MECHABER_CUT_EN_GPT_KIT_part11.json` | 1 | 119 | 33,510 | `ead0802da076…` |  |



## ChatGPT prompt

```
SA_Rebuild OC MECHABER CUT-EN — FRESH TRANSLATE / COMPLETE FROM HE (hardened).

INPUTS: 01_OC_MECHABER_CUT_EN_GPT_KIT.json (full parent pack — attach even when reviewing one part) + full_dictionary.md

DICTIONARY (mandatory — full_dictionary.md)
- Part 1 — abbreviations: expand every Hebrew abbreviation; no raw Hebrew abbreviations in EN.
- Part 2 — halachic terms: use dictionary transliteration/rendering for every listed term (melacha, muktzeh, kli rishon, etc.).
- Part 3 — commentator names: exact dictionary forms (never anglicize).
- Part 4 — numbers: convert Hebrew letter-numbers to Arabic numerals (siman/seif/daf).
- Part 5 — connectives: render logical connectives per dictionary.

CORPUS TEXT: he_html / en_html / he_plain / en_plain are COMPLETE from live corpus (NO truncation). Translate from HE; current EN is draft/bad only.

TASK
1) Replace EN entirely from HE (fresh_translate / complete). Every Hebrew clause must appear in English — no omissions, no summarizing.
2) No additions beyond the source. Plain translated text only.
3) Rama: any הגה / <small>הגה ...</small> → {Rama: ...} once. NEVER {Rama: RAMA: ...}. Place the gloss in HE order (do not move Rama after later Mechaber clauses).
4) After Rama, continue with any remaining Mechaber clauses (common cut failure: post-Rama HE omitted).
5) Restore missing cross-refs (e.g. ע"ל סי׳ …) when present in HE.
6) Strip HTML for meaning; output plain EN (no tags). Note markers <i data-label="א"> → (1) only if the HE text flow requires the label; do not invent commentary.

FAILURE RULES — DO NOT (causes REJECT/HOLD)
- Do NOT output: "the craft", "Saturday", "Lord's Prayer", "her age", "hand recoils", "first dish", "to the world" (for l'olam), "Hashem's Word", "Holy One" junk loops, "massacre", allocated (for muktzeh), Danny's dinliness, "circumcised" nonsense, Honeylma/Czechs/captain-style gibberish, or other known MT failure patterns.
- Do NOT add editorial notes, "Note:", "Meaning:", explanations, or confidence commentary inside EN.
- Do NOT leave Hebrew characters, raw Hebrew abbreviations, or placeholders ("TBD", "translation pending") in EN.
- Do NOT wrap the response in markdown fences or add prose outside valid JSON.
- Do NOT write {Rama: RAMA: ...} — single wrapper only: {Rama: ...}.
- Valid JSON only — escape every " as \"; straight ASCII quotes only.

OUTPUT — JSON array only:
[{"id":"...","new_en":"...","notes":"short","confidence":"high"|"medium"|"low"}]
One object per case. new_en is the full replacement English for that cell. No corpus edits.
```

## Notes

- Full HE + current EN per case — **no truncation**.
- Audit only — no corpus apply from this kit until parent approve.
- Purpose: 120 highest-priority cut/incomplete Mechaber EN (+ Rama display) for GPT retranslate
