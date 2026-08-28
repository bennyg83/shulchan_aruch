# HE_HAS_MORE_EDITORIAL_REMAINING — editorial HOLD retry

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `resegment_offset_fix` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **91** |

### By volume

| Volume | Count |
|--------|------:|
| oc1 | 2 |
| yd1 | 61 |
| cm1 | 28 |

## Files

- Full kit: [`HE_HAS_MORE_EDITORIAL_REMAINING.json`](./HE_HAS_MORE_EDITORIAL_REMAINING.json) (1,158,543 bytes, SHA `58a918920b38…`)
- Parts: each ≤ 85,000 UTF-8 bytes
- Created: 2026-08-28T12:23:32.008Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Trunc |
|------|------|------:|-------:|------:|--------------|-------|
| 1 | `HE_HAS_MORE_EDITORIAL_REMAINING_part01.json` | 2 | 0 | 81,647 | `342a6e96b23b…` |  |
| 2 | `HE_HAS_MORE_EDITORIAL_REMAINING_part02.json` | 4 | 2 | 60,590 | `5c29e1e393af…` |  |
| 3 | `HE_HAS_MORE_EDITORIAL_REMAINING_part03.json` | 4 | 6 | 75,769 | `dfe9e13ef5dd…` |  |
| 4 | `HE_HAS_MORE_EDITORIAL_REMAINING_part04.json` | 11 | 10 | 80,094 | `015e13994ecf…` |  |
| 5 | `HE_HAS_MORE_EDITORIAL_REMAINING_part05.json` | 12 | 21 | 83,912 | `c5d393d8ea36…` |  |
| 6 | `HE_HAS_MORE_EDITORIAL_REMAINING_part06.json` | 6 | 33 | 81,028 | `5cfb2d25a849…` |  |
| 7 | `HE_HAS_MORE_EDITORIAL_REMAINING_part07.json` | 13 | 39 | 84,306 | `c2476fbfbb49…` |  |
| 8 | `HE_HAS_MORE_EDITORIAL_REMAINING_part08.json` | 12 | 52 | 73,385 | `6368b5b8438c…` |  |
| 9 | `HE_HAS_MORE_EDITORIAL_REMAINING_part09.json` | 3 | 64 | 82,925 | `b79656a2a341…` |  |
| 10 | `HE_HAS_MORE_EDITORIAL_REMAINING_part10.json` | 5 | 67 | 82,132 | `2c878487b14f…` |  |
| 11 | `HE_HAS_MORE_EDITORIAL_REMAINING_part11.json` | 2 | 72 | 79,456 | `26271e28578a…` |  |
| 12 | `HE_HAS_MORE_EDITORIAL_REMAINING_part12.json` | 3 | 74 | 62,249 | `121c3773e5d3…` |  |
| 13 | `HE_HAS_MORE_EDITORIAL_REMAINING_part13.json` | 2 | 77 | 82,085 | `33b3cb8e2d2d…` |  |
| 14 | `HE_HAS_MORE_EDITORIAL_REMAINING_part14.json` | 2 | 79 | 78,235 | `7efc5805e12e…` |  |
| 15 | `HE_HAS_MORE_EDITORIAL_REMAINING_part15.json` | 2 | 81 | 16,412 | `a2c18f42f21c…` |  |
| 16 | `HE_HAS_MORE_EDITORIAL_REMAINING_part16.json` | 2 | 83 | 84,354 | `7ce2fa32ede4…` |  |
| 17 | `HE_HAS_MORE_EDITORIAL_REMAINING_part17.json` | 6 | 85 | 22,550 | `0c9d28bb5e7c…` |  |



## ChatGPT prompt

```
SA_Rebuild HE_HAS_MORE EDITORIAL REMAINING — RESEGMENT / OFFSET FIX.

INPUTS: HE_HAS_MORE_EDITORIAL_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.

CONTEXT: Prior editorial kit HOLD (91). Offset/structure fix; merge_groups only for true HE continuation.

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
[{"id":"...","action":"split_en"|"merge_groups"|"mixed_resegment_translate"|"needs_human","merge_groups":null|[[0,1]],"segments":null|[{"index":0,"he":"...","en":"...","source":"..."}],"en_segments":null|["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
When segments[] returned, length === heSegs. No corpus edits.
```

## Notes

- Prior HE_HAS_MORE_EDITORIAL eval HOLD only.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
