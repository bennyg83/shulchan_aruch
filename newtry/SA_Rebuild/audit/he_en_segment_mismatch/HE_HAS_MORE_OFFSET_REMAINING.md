# HE_HAS_MORE_OFFSET_REMAINING — offset editorial catch-all

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `resegment_offset_fix` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **6** |

### By volume

| Volume | Count |
|--------|------:|
| cm1 | 6 |

## Files

- Full kit: [`HE_HAS_MORE_OFFSET_REMAINING.json`](./HE_HAS_MORE_OFFSET_REMAINING.json) (755,509 bytes, SHA `90a3e615d9d0…`)
- Parts: one case per part; **full** segment text (no truncation; may exceed 85k target)
- Zip includes **full parent** `HE_HAS_MORE_OFFSET_REMAINING.json` plus all parts
- Created: 2026-08-28T12:23:32.008Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
| 1 | `HE_HAS_MORE_OFFSET_REMAINING_part01.json` | 1 | 0 | 218,186 | `e133f5eb8d76…` | over cap |
| 2 | `HE_HAS_MORE_OFFSET_REMAINING_part02.json` | 1 | 1 | 100,986 | `39a11c7546ac…` | over cap |
| 3 | `HE_HAS_MORE_OFFSET_REMAINING_part03.json` | 1 | 2 | 91,184 | `4b31bd8b7925…` | over cap |
| 4 | `HE_HAS_MORE_OFFSET_REMAINING_part04.json` | 1 | 3 | 115,449 | `9c74e60fcb71…` | over cap |
| 5 | `HE_HAS_MORE_OFFSET_REMAINING_part05.json` | 1 | 4 | 173,295 | `d84d102a1b46…` | over cap |
| 6 | `HE_HAS_MORE_OFFSET_REMAINING_part06.json` | 1 | 5 | 96,178 | `8832e5bb5479…` | over cap |

\* 6 part(s) exceed 85k target — full segment text preserved (no truncation).

## ChatGPT prompt

```
SA_Rebuild HE_HAS_MORE OFFSET REMAINING — RESEGMENT / OFFSET FIX.

INPUTS: HE_HAS_MORE_OFFSET_REMAINING.json (full parent pack — attach even when reviewing one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.

CONTEXT: Residual he_has_more (true_offset_editorial) not in likut/editorial kits.
CORPUS TEXT: he_segments[] and en_segments[] are COMPLETE from live corpus (no truncation). If alignment remains ambiguous after review, mark needs_human with a short reason.


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

MERGE_GROUPS (only when explicitly allowed):
- merge_groups ONLY for true HE continuation (same lemma body split across <br>); never glue distinct notes or Likut blocks.
- Do NOT output merge_groups that reduce heSegs on Likut cases — split EN instead.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"merge_groups"|"mixed_resegment_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"..."}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs after fix. No corpus edits.
```

## Notes

- true_offset_editorial and other he_has_more not routed above.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
