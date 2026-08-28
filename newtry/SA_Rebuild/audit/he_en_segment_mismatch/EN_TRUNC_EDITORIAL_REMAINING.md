# EN_TRUNC_EDITORIAL_REMAINING — editorial fresh translate retry

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `fresh_multi_segment_translate` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **2** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 1 |
| cm1 | 1 |

## Files

- Full kit: [`EN_TRUNC_EDITORIAL_REMAINING.json`](./EN_TRUNC_EDITORIAL_REMAINING.json) (4,918 bytes, SHA `c3c6ec27377b…`)
- Parts: target ≤ 85,000 UTF-8 bytes when batched; single-case parts keep **full** segment text (may exceed cap)
- Zip includes **full parent** `EN_TRUNC_EDITORIAL_REMAINING.json` plus all parts
- Created: 2026-08-28T15:24:45.294Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
| 1 | `EN_TRUNC_EDITORIAL_REMAINING_part01.json` | 2 | 0 | 5,154 | `b79611e7e114…` |  |



## ChatGPT prompt

```
SA_Rebuild EN_TRUNC EDITORIAL REMAINING — FRESH MULTI-SEGMENT TRANSLATE.

INPUTS: EN_TRUNC_EDITORIAL_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.
TRANSLATION NORMS
- Complete translation; no omissions. No additions beyond source. {Rama: ...} for Rama glosses. Plain English only.

CONTEXT: needs_editorial en_trunc still open after part01 apply + parts 02-06 never run.

OUTPUT — JSON array only:
[{"id":"...","action":"fresh_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No corpus edits.
```

## Notes

- Excludes part01 APPROVE cases no longer flagged.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
