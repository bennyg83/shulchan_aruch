# BEER_DEGREE_SPLIT_REMAINING — Beer HaGolah degree splits

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `split_en_beer_degree` · Dictionary: attach **`full_dictionary.md`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **5** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 5 |

## Files

- Full kit: [`BEER_DEGREE_SPLIT_REMAINING.json`](./BEER_DEGREE_SPLIT_REMAINING.json) (8,106 bytes, SHA `7394a73374cb…`)
- Parts: target ≤ 85,000 UTF-8 bytes when batched; single-case parts keep **full** segment text (may exceed cap)
- Zip includes **full parent** `BEER_DEGREE_SPLIT_REMAINING.json` plus all parts
- Created: 2026-08-28T15:24:45.294Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
| 1 | `BEER_DEGREE_SPLIT_REMAINING_part01.json` | 5 | 0 | 8,341 | `f611f8650db6…` |  |



## ChatGPT prompt

```
SA_Rebuild BEER-HAGOLAH DEGREE SPLIT REMAINING — SPLIT EN AT DEGREE MARKERS.

INPUTS: BEER_DEGREE_SPLIT_REMAINING.json (or one part) + full_dictionary.md
DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.

CONTEXT: beer-hagolah degree/footnote splits — HE has 2+ segments, EN under-split. Split EN at degree markers matching HE; do not merge HE.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"mixed_resegment_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"split_existing_en"|"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No corpus edits.
```

## Notes

- true_beer_degree_split pattern from FP analysis.
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
