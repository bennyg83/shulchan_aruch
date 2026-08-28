# EN_TRUNC_EDITORIAL_REMAINING — editorial fresh translate retry

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `fresh_multi_segment_translate` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **81** |

### By volume

| Volume | Count |
|--------|------:|
| oc1 | 3 |
| yd1 | 47 |
| cm1 | 31 |

## Files

- Full kit: [`EN_TRUNC_EDITORIAL_REMAINING.json`](./EN_TRUNC_EDITORIAL_REMAINING.json) (357,842 bytes, SHA `001557c92c1d…`)
- Parts: each ≤ 85,000 UTF-8 bytes
- Created: 2026-08-28T12:23:32.008Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Trunc |
|------|------|------:|-------:|------:|--------------|-------|
| 1 | `EN_TRUNC_EDITORIAL_REMAINING_part01.json` | 16 | 0 | 77,885 | `8addd8291923…` |  |
| 2 | `EN_TRUNC_EDITORIAL_REMAINING_part02.json` | 38 | 16 | 81,865 | `20731569a752…` |  |
| 3 | `EN_TRUNC_EDITORIAL_REMAINING_part03.json` | 12 | 54 | 81,949 | `6c5c7597e793…` |  |
| 4 | `EN_TRUNC_EDITORIAL_REMAINING_part04.json` | 2 | 66 | 47,704 | `9200b2685768…` |  |
| 5 | `EN_TRUNC_EDITORIAL_REMAINING_part05.json` | 13 | 68 | 82,207 | `b85278ee3576…` |  |



## ChatGPT prompt

```
SA_Rebuild EN_TRUNC EDITORIAL REMAINING — FRESH MULTI-SEGMENT TRANSLATE.

INPUTS: EN_TRUNC_EDITORIAL_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.
TRANSLATION NORMS
- Complete translation; no omissions. No additions beyond source. {Rama: ...} for Rama glosses. Plain English only.

CONTEXT: needs_editorial en_trunc still open after part01 apply + parts 02-06 never run.

FAILURE RULES — DO NOT (causes REJECT/HOLD in eval pipeline)

UNIVERSAL — any EN segment text:
- Do NOT add editorial notes, "Note:", "Meaning:", explanations, or confidence commentary inside EN output.
- Do NOT leave Hebrew characters, raw Hebrew abbreviations, or placeholder text in EN ("TBD", "translation pending", etc.).
- Do NOT wrap the response in markdown fences or add prose outside valid JSON.

JSON OUTPUT (mandatory):
- Return en_segments[] as the primary deliverable; segments[] with he+en is optional for audit alignment.
- Valid JSON only — escape every " as \" inside strings; use straight ASCII quotes only (no smart quotes).
- Prefer returning en_segments[] without embedding he in strings when possible.
- en_segments.length MUST equal heSegs for every case.

FRESH_TRANSLATE (this kit):
- Complete translation of every Hebrew clause; no omissions or paraphrasing away content.
- Use full_dictionary.md for halachic terms and commentator names; expand all abbreviations; Arabic numerals for numbers.
- {Rama: ...} format for Rama glosses; no additions beyond source.
- Do NOT preserve garbled MT from unreliable EN blob when fresh translate is required.
- Eval REJECTs empty/truncated EN slots and HOLDs short_en / kit_he_truncated flags.

OUTPUT — JSON array only:
[{"id":"...","action":"fresh_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No corpus edits.
```

## Notes

- Excludes part01 APPROVE cases no longer flagged.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
