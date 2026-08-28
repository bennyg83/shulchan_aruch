# EN_MISSING_2_REMAINING — fresh translate (rescan)

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `fresh_translate` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **2** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 2 |

## Files

- Full kit: [`EN_MISSING_2_REMAINING.json`](./EN_MISSING_2_REMAINING.json) (8,052 bytes, SHA `9b482c6b6e45…`)
- Parts: each ≤ 85,000 UTF-8 bytes
- Created: 2026-08-28T12:23:32.008Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Trunc |
|------|------|------:|-------:|------:|--------------|-------|
| 1 | `EN_MISSING_2_REMAINING_part01.json` | 2 | 0 | 8,282 | `374dab60a6ee…` |  |



## ChatGPT prompt

```
SA_Rebuild EN_MISSING REMAINING — FRESH TRANSLATE FROM HEBREW.

INPUTS: EN_MISSING_2_REMAINING.json + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.
TRANSLATION NORMS
- Complete translation; no omissions. No additions beyond source. {Rama: ...} for Rama glosses. Plain English only.

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
en_segments.length === heSegs. No corpus edits.
```

## Notes

- Held from EN_MISSING apply; verify still open in rescan.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
