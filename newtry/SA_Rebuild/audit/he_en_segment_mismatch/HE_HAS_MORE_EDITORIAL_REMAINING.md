# HE_HAS_MORE_EDITORIAL_REMAINING — editorial HOLD retry

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `resegment_offset_fix` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **39** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 24 |
| cm1 | 15 |

## Files

- Full kit: [`HE_HAS_MORE_EDITORIAL_REMAINING.json`](./HE_HAS_MORE_EDITORIAL_REMAINING.json) (265,328 bytes, SHA `1b924320c882…`)
- Parts: target ≤ 85,000 UTF-8 bytes when batched; single-case parts keep **full** segment text (may exceed cap)
- Zip includes **full parent** `HE_HAS_MORE_EDITORIAL_REMAINING.json` plus all parts
- Created: 2026-08-28T15:24:45.294Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
| 1 | `HE_HAS_MORE_EDITORIAL_REMAINING_part01.json` | 8 | 0 | 83,593 | `6a6cd502e5cd…` |  |
| 2 | `HE_HAS_MORE_EDITORIAL_REMAINING_part02.json` | 8 | 8 | 64,298 | `2487db0ed3a5…` |  |
| 3 | `HE_HAS_MORE_EDITORIAL_REMAINING_part03.json` | 10 | 16 | 82,054 | `2ed3fd5c2011…` |  |
| 4 | `HE_HAS_MORE_EDITORIAL_REMAINING_part04.json` | 13 | 26 | 45,376 | `7f5148fc5420…` |  |



## ChatGPT prompt

```
SA_Rebuild HE_HAS_MORE EDITORIAL REMAINING — RESEGMENT / OFFSET FIX.

INPUTS: HE_HAS_MORE_EDITORIAL_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.

CONTEXT: Prior editorial kit HOLD (91). Offset/structure fix; merge_groups only for true HE continuation.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"merge_groups"|"mixed_resegment_translate"|"needs_human","merge_groups":null|[[0,1]],"segments":null|[{"index":0,"he":"...","en":"...","source":"..."}],"en_segments":null|["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
When segments[] returned, length === heSegs. No corpus edits.
```

## Notes

- Prior HE_HAS_MORE_EDITORIAL eval HOLD only.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
