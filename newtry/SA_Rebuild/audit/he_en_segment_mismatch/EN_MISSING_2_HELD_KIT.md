# EN_MISSING_2_HELD_KIT — 2 residual en_missing holds

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `fresh_translate` · Dictionary: attach **`full_dictionary.md`** (see [`DICTIONARY_REF.md`](./DICTIONARY_REF.md))

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **2** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 2 |

## Files

- Full kit: [`EN_MISSING_2_HELD_KIT.json`](./EN_MISSING_2_HELD_KIT.json)
  - UTF-8 bytes: 10,450
  - SHA-256: `c718864e6ff0bc5e8a98c7c95e0593dc2b86c21eb9179c4c4d9344746da37b27`
  - Cases: 2
- Parts: each ≤ 85,000 UTF-8 bytes (hard cap)
- Created: 2026-08-28T08:18:49.559Z

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) | Truncated segs |
|------|------|------:|------------:|--------------:|------------------|----------------|
| 1 | `EN_MISSING_2_HELD_KIT_part01.json` | 2 | 0 | 10,679 | `027340e456bb…` |  |



## ChatGPT prompt

Paste this prompt together with **both** attachments: (1) one `EN_MISSING_2_HELD_KIT.json` / `EN_MISSING_2_HELD_KIT_partNN.json` file, and (2) **`full_dictionary.md`**. Return a JSON array for **only** the case ids in that chunk.

```
SA_Rebuild EN_MISSING HELD (2) — FRESH TRANSLATE FROM HEBREW.

INPUTS (both required)
1) EN_MISSING_2_HELD_KIT.json
2) full_dictionary.md (attached by the user — follow it without exception)

DICTIONARY (mandatory — full_dictionary.md)
- Part 1 — abbreviations: expand every Hebrew abbreviation per the dictionary; no raw Hebrew abbreviations in EN.
- Part 2 — halachic terms: use the dictionary transliteration/rendering for every listed term.
- Part 3 — commentator names: use names exactly as listed (never anglicize).
- Part 4 — numbers: convert Hebrew letter-numbers to Arabic numerals (siman/seif/daf).
- Part 5 — connectives: render logical connectives per the dictionary.
- Never invent alternate glosses when the dictionary specifies a term.

CONTEXT
- Two residual en_missing cases held from EN_MISSING apply (2026-08-28):
  1) yd1/siman173/seif-001/yad-avraham — Noda B'Yehuda Tinyana: HE cites chelek YD (חי״ד) siman 75; prior EN wrongly referenced Choshen Mishpat — fix volume/citation.
  2) yd1/siman210/seif-001/yad-avraham — HE garbled (?dl"a); translate cautiously or needs_human if HE unusable.

TRANSLATION NORMS
- Complete: translate every clause; no omissions or paraphrasing away content.
- No additions: no introductions, notes, or explanations beyond the source.
- Rama glosses introduced by הגה → {Rama: ...} (curly braces).
- Plain English only — no "Translation:" label.
- Where norms and full_dictionary.md conflict, full_dictionary.md wins.

OUTPUT — JSON array only, same ids/order:
[{
  "id": "...",
  "action": "fresh_translate" | "needs_human",
  "segments": [
    { "index": 0, "he": "...", "en": "...", "source": "fresh_translate" }
  ],
  "en_segments": ["..."],
  "notes": "short",
  "confidence": "high"|"medium"|"low"
}]

CONSTRAINTS
- en_segments.length === heSegs.
- No corpus edits. Return JSON only.
```

## Notes

- siman173: fix Tinyana YD not CM citation.
- siman210: garbled HE — cautious translate or needs_human.
- Single JSON (2 cases); no parts expected.
- No corpus apply from this kit.
