# HE_HAS_MORE_LIKUT_REMAINING — Likut content_drift retry

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `split_en_not_merge_he` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **13** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 13 |

## Files

- Full kit: [`HE_HAS_MORE_LIKUT_REMAINING.json`](./HE_HAS_MORE_LIKUT_REMAINING.json) (55,171 bytes, SHA `d3ce76992fd7…`)
- Parts: each ≤ 85,000 UTF-8 bytes
- Created: 2026-08-28T12:23:32.008Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Trunc |
|------|------|------:|-------:|------:|--------------|-------|
| 1 | `HE_HAS_MORE_LIKUT_REMAINING_part01.json` | 13 | 0 | 55,407 | `b0f2da1e4d8e…` |  |



## ChatGPT prompt

```
SA_Rebuild HE_HAS_MORE LIKUT REMAINING — SPLIT EN (content_drift holds).

INPUTS: HE_HAS_MORE_LIKUT_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.

CONTEXT: 13 prior Likut kit HOLD (content_drift). Split EN at (Likut)|(Collected)|(Supplement); never merge HE.

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
segments.length === heSegs. No merge_groups on HE. No corpus edits.
```

## Notes

- Prior HE_HAS_MORE_LIKUT_SPLIT eval HOLD only.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
