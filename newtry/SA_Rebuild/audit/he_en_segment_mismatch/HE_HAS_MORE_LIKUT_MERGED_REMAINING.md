# HE_HAS_MORE_LIKUT_MERGED_REMAINING — Likut EN merged pattern

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `split_en_likut_merged` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **18** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 18 |

## Files

- Full kit: [`HE_HAS_MORE_LIKUT_MERGED_REMAINING.json`](./HE_HAS_MORE_LIKUT_MERGED_REMAINING.json) (113,831 bytes, SHA `1f62a603ae6d…`)
- Parts: each ≤ 85,000 UTF-8 bytes
- Created: 2026-08-28T12:23:32.008Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Trunc |
|------|------|------:|-------:|------:|--------------|-------|
| 1 | `HE_HAS_MORE_LIKUT_MERGED_REMAINING_part01.json` | 11 | 0 | 82,850 | `2e5e9d4097b6…` |  |
| 2 | `HE_HAS_MORE_LIKUT_MERGED_REMAINING_part02.json` | 7 | 11 | 34,461 | `c9547d73bc5d…` |  |



## ChatGPT prompt

```
SA_Rebuild HE_HAS_MORE LIKUT MERGED REMAINING — SPLIT EN TO MATCH HE LIKUT SLOTS.

INPUTS: HE_HAS_MORE_LIKUT_MERGED_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.

CONTEXT: true_likut_en_merged pattern — HE has (ליקוט) segments, EN under-split. Split EN; never merge distinct HE Likut notes.

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

- ~99 pattern; excludes likut HOLD + editorial HOLD tiers.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
