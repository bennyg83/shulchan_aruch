# EN_HAS_MORE_GLUED_REVIEW_PACK — chunked for AI review

Original file: `EN_HAS_MORE_GLUED_REVIEW_PACK.json`
- Total characters: 554,403
- Total bytes (UTF-8): 690,050
- Total cases: 58
- Parts: 7 (each body ≤ 95,000 characters, pretty JSON)

## How to use

Paste **one part file** + the shortened review prompt per session (100k context limit). Do not paste the full original pack.

## Parts

| Part | File | Cases | Case offset | Characters |
|------|------|------:|------------:|-----------:|
| 1 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part01.json` | 11 | 0 | 91,802 |
| 2 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part02.json` | 11 | 11 | 93,254 |
| 3 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part03.json` | 16 | 22 | 92,029 |
| 4 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part04.json` | 6 | 38 | 87,546 |
| 5 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part05.json` | 8 | 44 | 85,184 |
| 6 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part06.json` | 4 | 52 | 78,687 |
| 7 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part07.json` | 2 | 56 | 31,526 |

## Shortened prompt (use with each part)

Paste this prompt together with **one** `EN_HAS_MORE_GLUED_REVIEW_PACK_partNN.json` file. Return a JSON array for **only** the case ids in that part.

```
You are reviewing EN-has-more / glued segment mismatches for Shulchan Aruch (SA_Rebuild).

INPUT: one chunk of EN_HAS_MORE_GLUED_REVIEW_PACK (meta.chunk_index / chunk_total / case_offset + cases[]).

For EACH case in this chunk only:
1. Compare he_segments vs en_segments (and any glued/extra EN text).
2. Decide if EN is wrongly glued/extra, correctly longer (legitimate gloss/expansion), or uncertain.
3. Propose a fix when EN is wrong: which EN segment(s) to split/trim/drop, and the corrected en_segments list if clear.

OUTPUT: a single JSON array (no markdown fence unless needed). One object per case id in this part, same order as cases[]. Schema:
[
  {
    "id": "<exact case id from input>",
    "verdict": "glued_error" | "legitimate_en_longer" | "uncertain" | "other",
    "note": "<one short sentence>",
    "fix_en_segments": null | ["..."],
    "confidence": "high" | "medium" | "low"
  }
]

Rules: only ids present in this part; no new cases; no corpus edits; plain JSON array only.
```
