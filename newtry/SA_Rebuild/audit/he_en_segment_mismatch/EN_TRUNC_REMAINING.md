# EN_TRUNC_REMAINING — catch-all en_truncated

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `resegment_or_fresh` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **10** |

### By volume

| Volume | Count |
|--------|------:|
| oc1 | 1 |
| yd1 | 6 |
| cm1 | 3 |

## Files

- Full kit: [`EN_TRUNC_REMAINING.json`](./EN_TRUNC_REMAINING.json) (171,246 bytes, SHA `1594ec5636a0…`)
- Parts: each ≤ 85,000 UTF-8 bytes
- Created: 2026-08-28T12:23:32.008Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Trunc |
|------|------|------:|-------:|------:|--------------|-------|
| 1 | `EN_TRUNC_REMAINING_part01.json` | 3 | 0 | 55,206 | `293803816ee8…` |  |
| 2 | `EN_TRUNC_REMAINING_part02.json` | 2 | 3 | 53,921 | `e8b4499c47de…` |  |
| 3 | `EN_TRUNC_REMAINING_part03.json` | 5 | 5 | 69,115 | `43a76cc22780…` |  |



## ChatGPT prompt

```
SA_Rebuild EN_TRUNC REMAINING — RESEGMENT OR FRESH TRANSLATE.

INPUTS: EN_TRUNC_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.
TRANSLATION NORMS
- Complete translation; no omissions. No additions beyond source. {Rama: ...} for Rama glosses. Plain English only.

CONTEXT: Residual en_truncated not in moderate/editorial/beer kits. Prefer split EN blob; fresh_translate if garbled.

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

FRESH_TRANSLATE (this kit):
- Complete translation of every Hebrew clause; no omissions or paraphrasing away content.
- Use full_dictionary.md for halachic terms and commentator names; expand all abbreviations; Arabic numerals for numbers.
- {Rama: ...} format for Rama glosses; no additions beyond source.
- Do NOT preserve garbled MT from unreliable EN blob when fresh translate is required.
- Eval REJECTs empty/truncated EN slots and HOLDs short_en / kit_he_truncated flags.

OUTPUT — JSON array only:
[{"id":"...","action":"resegment"|"mixed_resegment_translate"|"fresh_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"..."}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No corpus edits.
```

## Notes

- New en_trunc or not in prior kit tiers.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
