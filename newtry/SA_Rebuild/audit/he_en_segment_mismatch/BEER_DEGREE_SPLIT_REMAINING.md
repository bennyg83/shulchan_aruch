# BEER_DEGREE_SPLIT_REMAINING — Beer HaGolah degree splits

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `split_en_beer_degree` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **7** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 7 |

## Files

- Full kit: [`BEER_DEGREE_SPLIT_REMAINING.json`](./BEER_DEGREE_SPLIT_REMAINING.json) (10,547 bytes, SHA `3494dc15766f…`)
- Parts: each ≤ 85,000 UTF-8 bytes
- Created: 2026-08-28T12:23:32.008Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Trunc |
|------|------|------:|-------:|------:|--------------|-------|
| 1 | `BEER_DEGREE_SPLIT_REMAINING_part01.json` | 7 | 0 | 10,782 | `a6c85d418c89…` |  |



## ChatGPT prompt

```
SA_Rebuild BEER-HAGOLAH DEGREE SPLIT REMAINING — SPLIT EN AT DEGREE MARKERS.

INPUTS: BEER_DEGREE_SPLIT_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.

CONTEXT: beer-hagolah degree/footnote splits — HE has 2+ segments, EN under-split. Split EN at degree markers matching HE; do not merge HE.

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

SPLIT_EXISTING_EN / RESEGMENT (this kit):
- When source is split_existing_en: preserve existing EN wording VERBATIM — cut/join ONLY at boundaries.
- Do NOT normalize citations (e.g. "32a"→"daf 32"), synonym-swap ("halachic authorities"→"poskim"), or reword "where possible".
- Do NOT re-translate from Hebrew when the EN blob already contains the text for that slot.
- Do NOT paraphrase, summarize, compress, or "improve" prose on preserved splits — change ONLY by splitting/joining.
- Eval REJECTs truncated segments (broken JSON quotes) and HOLDs content_drift / unjustified fresh_translate.

FRESH_TRANSLATE (gap slots only):
- Complete translation of every Hebrew clause in gap slots; use full_dictionary.md; expand abbreviations; Arabic numerals.
- {Rama: ...} format for Rama glosses; no additions beyond source.
- Apply fresh_translate ONLY where EN blob lacks material — never on slots covered by existing EN text.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"mixed_resegment_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"split_existing_en"|"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No corpus edits.
```

## Notes

- true_beer_degree_split pattern from FP analysis.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
