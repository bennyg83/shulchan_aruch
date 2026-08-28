# HE_HAS_MORE_LIKUT_MERGED_REMAINING — Likut EN merged pattern

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `split_en_likut_merged` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **1** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 1 |

## Files

- Full kit: [`HE_HAS_MORE_LIKUT_MERGED_REMAINING.json`](./HE_HAS_MORE_LIKUT_MERGED_REMAINING.json) (5,048 bytes, SHA `117eed565f85…`)
- Parts: target ≤ 85,000 UTF-8 bytes when batched; single-case parts keep **full** segment text (may exceed cap)
- Zip includes **full parent** `HE_HAS_MORE_LIKUT_MERGED_REMAINING.json` plus all parts
- Created: 2026-08-28T15:39:33.542Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
| 1 | `HE_HAS_MORE_LIKUT_MERGED_REMAINING_part01.json` | 1 | 0 | 5,290 | `14f1ed9768c5…` |  |



## ChatGPT prompt

```
SA_Rebuild HE_HAS_MORE LIKUT MERGED REMAINING — SPLIT EN TO MATCH HE LIKUT SLOTS.

INPUTS: HE_HAS_MORE_LIKUT_MERGED_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.

CONTEXT: true_likut_en_merged pattern — HE has (ליקוט) segments, EN under-split. Split EN; never merge distinct HE Likut notes.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"mixed_resegment_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"split_existing_en"|"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No merge_groups on HE. No corpus edits.
```

## Notes

- ~99 pattern; excludes likut HOLD + editorial HOLD tiers.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
