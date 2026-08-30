# EN_TRUNC_MODERATE_REMAINING — moderate resegment retry

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `resegment_split_en` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **1** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 1 |

## Files

- Full kit: [`EN_TRUNC_MODERATE_REMAINING.json`](./EN_TRUNC_MODERATE_REMAINING.json) (5,347 bytes, SHA `8c6b12c28c17…`)
- Parts: target ≤ 85,000 UTF-8 bytes when batched; single-case parts keep **full** segment text (may exceed cap)
- Zip includes **full parent** `EN_TRUNC_MODERATE_REMAINING.json` plus all parts
- Created: 2026-08-30T05:59:15.936Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
| 1 | `EN_TRUNC_MODERATE_REMAINING_part01.json` | 1 | 0 | 5,582 | `cf4a98dc4029…` |  |



## ChatGPT prompt

```
SA_Rebuild EN_TRUNC MODERATE REMAINING — RE-SEGMENT WITH ALIGNED HE+EN PAIRS.

INPUTS: EN_TRUNC_MODERATE_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.

CONTEXT: Prior moderate kit HOLD/REJECT; still en_truncated in rescan. Split EN blob to heSegs slots; fresh_translate gaps only.

OUTPUT — JSON array only:
[{"id":"...","action":"resegment"|"mixed_resegment_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"split_existing_en"|"fresh_translate"|"partial"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No corpus edits.
```

## Notes

- 37 prior HOLD+REJECT minus fixed by today's applies.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
