# EN_HAS_MORE_GLUED_REVIEW_PACK — chunked for AI review

Original file: `EN_HAS_MORE_GLUED_REVIEW_PACK.json`
- Total characters: 554,403
- Total bytes (UTF-8): 690,050
- Total cases: 58
- Parts: 10 (each file ≤ 90,000 bytes UTF-8 preferred; hard cap 100,000; target headroom ≤ 85,000)

## How to use

Paste **one part file** + the review prompt per session. Do not paste the full original pack. No gzip/zip — plain pretty JSON only.

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | Characters |
|------|------|------:|------------:|--------------:|-----------:|
| 1 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part01.json` | 7 | 0 | 81,784 | 66,060 |
| 2 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part02.json` | 8 | 7 | 83,757 | 68,089 |
| 3 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part03.json` | 7 | 15 | 62,946 | 52,344 |
| 4 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part04.json` | 12 | 22 | 84,799 | 69,064 |
| 5 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part05.json` | 5 | 34 | 36,710 | 29,643 |
| 6 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part06.json` | 3 | 39 | 80,160 | 64,382 |
| 7 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part07.json` | 7 | 42 | 77,881 | 63,032 |
| 8 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part08.json` | 5 | 49 | 72,892 | 58,187 |
| 9 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part09.json` | 2 | 54 | 79,736 | 62,018 |
| 10 | `EN_HAS_MORE_GLUED_REVIEW_PACK_part10.json` | 2 | 56 | 39,330 | 31,529 |

## Review prompt (use with each part)

Paste this prompt together with **one** `EN_HAS_MORE_GLUED_REVIEW_PACK_partNN.json` file. Return a JSON array for **only** the case ids in that part.

```
SA_Rebuild glued EN review. INPUT: one EN_HAS_MORE_GLUED_REVIEW_PACK_partNN.json (this chunk only).

For each case: propose contiguous EN merge_groups so len(groups)===heSegs, partitioning EN indices 0..enSegs-1 in order. Only merge true continuations; never glue distinct HE notes. If impossible, verdict needs_editorial and merge_groups null.

OUTPUT JSON array only, same ids/order:
[{"id":"...","merge_groups":[[0],[1,2]]|null,"verdict":"ok_rejoin"|"needs_editorial"|"skip","notes":"short"}]

Conservative when unsure. No text edits, no new cases.
```
