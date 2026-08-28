# HE_HAS_MORE_WAVE2_HELD_KIT — wave2 held split_en (18 Gra)

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `resegment_split_en` · Dictionary: attach **`full_dictionary.md`** (see [`DICTIONARY_REF.md`](./DICTIONARY_REF.md))

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **18** |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 18 |

## Files

- Full kit: [`HE_HAS_MORE_WAVE2_HELD_KIT.json`](./HE_HAS_MORE_WAVE2_HELD_KIT.json)
  - UTF-8 bytes: 126,174
  - SHA-256: `f70a55b6719d20250c919ceec3c04dfee39f082b896a6339aa49003f683e892e`
  - Cases: 18
- Parts: each ≤ 85,000 UTF-8 bytes (hard cap)
- Created: 2026-08-28T08:18:49.559Z

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) | Truncated segs |
|------|------|------:|------------:|--------------:|------------------|----------------|
| 1 | `HE_HAS_MORE_WAVE2_HELD_KIT_part01.json` | 9 | 0 | 61,910 | `4e4e14215bb2…` |  |
| 2 | `HE_HAS_MORE_WAVE2_HELD_KIT_part02.json` | 9 | 9 | 70,055 | `5497aec81127…` |  |



## ChatGPT prompt

Paste this prompt together with **both** attachments: (1) one `HE_HAS_MORE_WAVE2_HELD_KIT.json` / `HE_HAS_MORE_WAVE2_HELD_KIT_partNN.json` file, and (2) **`full_dictionary.md`**. Return a JSON array for **only** the case ids in that chunk.

```
SA_Rebuild HE_HAS_MORE WAVE2 HELD — RESEGMENT / SPLIT EN TO MATCH HE.

INPUTS (both required)
1) HE_HAS_MORE_WAVE2_HELD_KIT.json (or one part; this chunk only)
2) full_dictionary.md (attached by the user — follow it without exception)

DICTIONARY (mandatory — full_dictionary.md)
- Part 1 — abbreviations: expand every Hebrew abbreviation per the dictionary; no raw Hebrew abbreviations in EN.
- Part 2 — halachic terms: use the dictionary transliteration/rendering for every listed term.
- Part 3 — commentator names: use names exactly as listed (never anglicize).
- Part 4 — numbers: convert Hebrew letter-numbers to Arabic numerals (siman/seif/daf).
- Part 5 — connectives: render logical connectives per the dictionary.
- Never invent alternate glosses when the dictionary specifies a term.

CONTEXT
- Wave2 auto split_en apply held these 18 Gra (beur-hagra) cases: marker-based EN split was insufficient (missing markers, multi-piece deficit, or no internal marker at hinted index).
- heSegs > enSegs; HE must NOT be merged down. Split EN (or resegment with semantic alignment) until counts match.
- Use HE (ליקוט) / lemma positions and en_segments[] from the kit; wave2 held reason is in hold_reason.

TASK
For each case:
1) Map each HE slot to one EN segment (split existing EN where possible; fresh_translate gaps from HE only).
2) Prefer splitting EN at (Likut)|(Collected)|(Supplement) markers matching HE dual-likut patterns.
3) If unsafe: action needs_human; still return best-effort paired segments[].

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
- segments.length MUST equal heSegs.
- Do NOT propose merge_groups on HE.
- No corpus edits. Return JSON only.
```

## Notes

- 18 cases held from wave2 auto split (insufficient markers / no marker at hint).
- Do NOT merge HE. Split EN to match heSegs.
- No corpus apply from this kit.
