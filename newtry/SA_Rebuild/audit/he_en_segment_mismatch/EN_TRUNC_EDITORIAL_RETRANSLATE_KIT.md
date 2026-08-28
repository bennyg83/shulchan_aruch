# EN_TRUNC_EDITORIAL_RETRANSLATE_KIT — needs_editorial fresh translate

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `fresh_multi_segment_translate` · Dictionary: attach **`full_dictionary.md`** (see [`DICTIONARY_REF.md`](./DICTIONARY_REF.md))

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **99** |

### By volume

| Volume | Count |
|--------|------:|
| oc1 | 4 |
| yd1 | 64 |
| cm1 | 31 |

## Files

- Full kit: [`EN_TRUNC_EDITORIAL_RETRANSLATE_KIT.json`](./EN_TRUNC_EDITORIAL_RETRANSLATE_KIT.json)
  - UTF-8 bytes: 409,293
  - SHA-256: `f5910cf438138ae0d71a83e6a7ed9864cab669c7ac756a19d88c84ebe9b5dfbe`
  - Cases: 99
- Parts: each ≤ 85,000 UTF-8 bytes (hard cap)
- Created: 2026-08-28T08:18:49.559Z

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) | Truncated segs |
|------|------|------:|------------:|--------------:|------------------|----------------|
| 1 | `EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part01.json` | 30 | 0 | 84,368 | `085f7c95d945…` |  |
| 2 | `EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part02.json` | 22 | 30 | 82,775 | `08e60ef7fd61…` |  |
| 3 | `EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part03.json` | 24 | 52 | 79,820 | `a1a6d2eff158…` |  |
| 4 | `EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part04.json` | 9 | 76 | 75,280 | `55acd95de366…` |  |
| 5 | `EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part05.json` | 4 | 85 | 77,172 | `f477a777cef8…` |  |
| 6 | `EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part06.json` | 10 | 89 | 43,754 | `9c56c9eb592e…` |  |



## ChatGPT prompt

Paste this prompt together with **both** attachments: (1) one `EN_TRUNC_EDITORIAL_RETRANSLATE_KIT.json` / `EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_partNN.json` file, and (2) **`full_dictionary.md`**. Return a JSON array for **only** the case ids in that chunk.

```
SA_Rebuild EN_TRUNC EDITORIAL — FRESH MULTI-SEGMENT TRANSLATE FROM HEBREW.

INPUTS (both required)
1) EN_TRUNC_EDITORIAL_RETRANSLATE_KIT.json (or one part; this chunk only)
2) full_dictionary.md (attached by the user — follow it without exception)

DICTIONARY (mandatory — full_dictionary.md)
- Part 1 — abbreviations: expand every Hebrew abbreviation per the dictionary; no raw Hebrew abbreviations in EN.
- Part 2 — halachic terms: use the dictionary transliteration/rendering for every listed term.
- Part 3 — commentator names: use names exactly as listed (never anglicize).
- Part 4 — numbers: convert Hebrew letter-numbers to Arabic numerals (siman/seif/daf).
- Part 5 — connectives: render logical connectives per the dictionary.
- Never invent alternate glosses when the dictionary specifies a term.

CONTEXT
- Each case has heSegs > 1 and enSegs === 1 (one EN blob vs multiple HE segments).
- GPT review action was needs_editorial: EN is truncated, garbled, or structurally unsafe to split mechanically.
- Wave1 strict/moderate tiers excluded (already in other kits or applied).
- Goal: produce heSegs fresh English segments — one accurate translation per HE slot. Treat existing EN blob as unreliable; do NOT preserve garbled MT wording.

TRANSLATION NORMS
- Complete: translate every clause; no omissions or paraphrasing away content.
- No additions: no introductions, notes, or explanations beyond the source.
- Rama glosses introduced by הגה → {Rama: ...} (curly braces).
- Plain English only — no "Translation:" label.
- Where norms and full_dictionary.md conflict, full_dictionary.md wins.

TASK
For each case:
1) Translate each he_segments[i] into segments[i].en (source: fresh_translate).
2) segments.length MUST equal heSegs (1:1 with he_segments).
3) If HE slot is corrupt/unusable: action needs_human for that case; still return best-effort segments[] if possible.

OUTPUT — JSON array only, same ids/order as input cases:
[{
  "id": "...",
  "action": "fresh_translate" | "needs_human",
  "segments": [
    { "index": 0, "he": "...", "en": "...", "source": "fresh_translate" }
  ],
  "en_segments": ["...", "..."],
  "notes": "short",
  "confidence": "high"|"medium"|"low"
}]

CONSTRAINTS
- segments.length === heSegs; each segment includes paired he+en.
- en_segments[] mirrors segments[].en in order.
- source on each segment is fresh_translate (or partial if you must flag a slot).
- No corpus edits. Return JSON only.
```

## Notes

- 99 cases (GPT review needs_editorial; excludes wave1 applied/held + moderate kit).
- Paired segments[] output for evaluation before apply.
- No corpus apply from this kit.
