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

- Full kit: [`HE_HAS_MORE_LIKUT_REMAINING.json`](./HE_HAS_MORE_LIKUT_REMAINING.json) (55,171 bytes, SHA `31ee7487e5f7…`)
- Parts: target ≤ 85,000 UTF-8 bytes when batched; single-case parts keep **full** segment text (may exceed cap)
- Zip includes **full parent** `HE_HAS_MORE_LIKUT_REMAINING.json` plus all parts
- Created: 2026-08-28T15:24:45.294Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
| 1 | `HE_HAS_MORE_LIKUT_REMAINING_part01.json` | 13 | 0 | 55,407 | `799948981cf1…` |  |



## ChatGPT prompt

```
SA_Rebuild HE_HAS_MORE LIKUT REMAINING — SPLIT EN (content_drift holds).

INPUTS: HE_HAS_MORE_LIKUT_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.

CONTEXT: 13 prior Likut kit HOLD (content_drift). Split EN at (Likut)|(Collected)|(Supplement); never merge HE.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"mixed_resegment_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"split_existing_en"|"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No merge_groups on HE. No corpus edits.
```

## Notes

- Prior HE_HAS_MORE_LIKUT_SPLIT eval HOLD only.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
