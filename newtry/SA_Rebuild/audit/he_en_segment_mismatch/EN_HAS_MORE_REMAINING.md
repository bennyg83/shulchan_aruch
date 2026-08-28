# EN_HAS_MORE_REMAINING — glued/oversplit rewrite (rescan)

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `rewrite_en_by_he_slot` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **9** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 8 |
| cm1 | 1 |

## Files

- Full kit: [`EN_HAS_MORE_REMAINING.json`](./EN_HAS_MORE_REMAINING.json) (64,185 bytes, SHA `a55e960fc216…`)
- Parts: each ≤ 85,000 UTF-8 bytes
- Created: 2026-08-28T12:23:32.008Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Trunc |
|------|------|------:|-------:|------:|--------------|-------|
| 1 | `EN_HAS_MORE_REMAINING_part01.json` | 9 | 0 | 64,414 | `35cc4cb4e593…` |  |



## ChatGPT prompt

```
SA_Rebuild EN_HAS_MORE / GLUED REMAINING — REWRITE EN BY HE SLOT.

INPUTS: EN_HAS_MORE_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.

CONTEXT: enSegs > heSegs (oversplit/glued EN). Pair_map hints may be present. Rewrite one EN segment per HE slot.

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

REWRITE_EN_BY_HE_SLOT (this kit):
- corrected_en[i] must be a complete fresh translation of he_segments[i]; one segment per HE slot.
- Use full_dictionary.md for halachic terms; expand abbreviations; Arabic numerals; {Rama: ...} for Rama glosses.
- You may use paired EN stubs as draft material but output clean halachic English — no MT garbage, no Hebrew in EN.
- Do NOT invent HE content; do NOT drop a HE slot; do NOT fabricate EN on needs_human cases.

OUTPUT — JSON array only:
[{"id":"...","action":"rewrite_en_by_he_slot"|"needs_human","pair_map":null|[[0,3]],"corrected_en":null|["..."],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
en_segments.length === heSegs. No corpus edits.
```

## Notes

- Replaces GLUED_STILL_OPEN_9 for cells still flagged.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
