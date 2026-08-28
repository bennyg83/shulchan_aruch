# HE_HAS_MORE_LIKUT_SPLIT_KIT — split EN not merge HE (53 Gra Likut)

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `split_en_not_merge_he` · Dictionary: attach **`full_dictionary.md`** (see [`DICTIONARY_REF.md`](./DICTIONARY_REF.md))

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **53** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 18 |
| cm1 | 35 |

## Files

- Full kit: [`HE_HAS_MORE_LIKUT_SPLIT_KIT.json`](./HE_HAS_MORE_LIKUT_SPLIT_KIT.json)
  - UTF-8 bytes: 243,032
  - SHA-256: `ea5ccb0dbb2780fcd944c987de25268391708c75fccaee3728d345621b17f018`
  - Cases: 53
- Parts: each ≤ 85,000 UTF-8 bytes (hard cap)
- Created: 2026-08-28T08:18:49.559Z

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) | Truncated segs |
|------|------|------:|------------:|--------------:|------------------|----------------|
| 1 | `HE_HAS_MORE_LIKUT_SPLIT_KIT_part01.json` | 15 | 0 | 84,868 | `4ee9c85ba4e5…` |  |
| 2 | `HE_HAS_MORE_LIKUT_SPLIT_KIT_part02.json` | 21 | 15 | 68,173 | `8bcb25596a14…` |  |
| 3 | `HE_HAS_MORE_LIKUT_SPLIT_KIT_part03.json` | 13 | 36 | 84,466 | `6518aa787770…` |  |
| 4 | `HE_HAS_MORE_LIKUT_SPLIT_KIT_part04.json` | 4 | 49 | 22,917 | `06d6e4574799…` |  |



## ChatGPT prompt

Paste this prompt together with **both** attachments: (1) one `HE_HAS_MORE_LIKUT_SPLIT_KIT.json` / `HE_HAS_MORE_LIKUT_SPLIT_KIT_partNN.json` file, and (2) **`full_dictionary.md`**. Return a JSON array for **only** the case ids in that chunk.

```
SA_Rebuild HE_HAS_MORE LIKUT — SPLIT EN (DO NOT MERGE HE).

INPUTS (both required)
1) HE_HAS_MORE_LIKUT_SPLIT_KIT.json (or one part; this chunk only)
2) full_dictionary.md (attached by the user — follow it without exception)

DICTIONARY (mandatory — full_dictionary.md)
- Part 1 — abbreviations: expand every Hebrew abbreviation per the dictionary; no raw Hebrew abbreviations in EN.
- Part 2 — halachic terms: use the dictionary transliteration/rendering for every listed term.
- Part 3 — commentator names: use names exactly as listed (never anglicize).
- Part 4 — numbers: convert Hebrew letter-numbers to Arabic numerals (siman/seif/daf).
- Part 5 — connectives: render logical connectives per the dictionary.
- Never invent alternate glosses when the dictionary specifies a term.

CONTEXT
- GPT wrongly proposed merge_groups on Gra Likut cases where HE has separate (ליקוט) segments but EN is under-split.
- Eval classified 53 beur-hagra Likut-glued merge_groups as hold_semantic_likut_merge — need EN split, NOT HE merge.
- heSegs > enSegs. Never merge distinct HE notes. Split EN at (Likut)|(Collected note)|(Supplement) matching HE structure.

CRITICAL
- Do NOT output merge_groups that reduce heSegs.
- Do NOT glue distinct HE Likut segments together.
- Default action: split_en or mixed_resegment_translate.

TASK
For each case:
1) Split en_segments[] (or the under-split EN piece) so final count === heSegs.
2) Align each HE slot to one EN segment; translate from HE only where EN lacks material.
3) Use review merge_groups as anti-pattern (what NOT to do).

OUTPUT — JSON array only, same ids/order:
[{
  "id": "...",
  "action": "split_en" | "mixed_resegment_translate" | "needs_human",
  "segments": [
    { "index": 0, "he": "...", "en": "...", "source": "split_existing_en"|"fresh_translate"|"partial" }
  ],
  "en_segments": ["...", "..."],
  "notes": "short",
  "confidence": "high"|"medium"|"low"
}]

CONSTRAINTS
- segments.length === heSegs.
- No merge_groups on HE. No corpus edits. Return JSON only.
```

## Notes

- 53 beur-hagra Likut cases where GPT wrongly proposed merge_groups.
- Prompt explicitly forbids HE merge; split EN at Likut/Collected markers.
- No corpus apply from this kit.
