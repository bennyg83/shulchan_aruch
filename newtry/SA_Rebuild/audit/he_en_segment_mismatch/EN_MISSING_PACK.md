# EN_MISSING_PACK — HE present, EN absent/empty (fresh translate)

**For external AI review only. Do not apply to corpus until after human/parent check.**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **20** |
| Prior expected (en_missing) | 20 |
| Delta vs prior | 0 |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 20 |

### By volume / slug

| Volume | Slug | Count |
|--------|------|------:|
| yd1 | mateh-yehonatan | 8 |
| yd1 | yad-avraham | 8 |
| yd1 | rabbi-akiva-eiger-yd | 4 |

## Files

- Full pack: [`EN_MISSING_PACK.json`](./EN_MISSING_PACK.json)
  - UTF-8 bytes: 40,867
  - SHA-256: `b3c99c12f3861fdb77eac6022abb10400986376f56d9fff9ca92827eaa29352e`
  - Cases: 20
- Parts: each ≤ 85,000 UTF-8 bytes (hard cap)
- Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/`
- Split: normalize consecutive `<br>` then split on `<br>`; strip tags for segment text
- Mode: **fresh_translate** (EN missing; translate from HE — not needs_en_source / not old MT)
- Created: 2026-08-27T20:51:09.706Z

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) | Truncated segs |
|------|------|------:|------------:|--------------:|------------------|----------------|
| 1 | `EN_MISSING_PACK_part01.json` | 20 | 0 | 41,091 | 4caf67d692bd… |  |

## ChatGPT prompt (fresh translate)

Paste this prompt together with **one** `EN_MISSING_PACK.json` / `EN_MISSING_PACK_partNN.json` file. Return a JSON array for **only** the case ids in that pack.

```
SA_Rebuild EN_MISSING — FRESH TRANSLATE FROM HEBREW. INPUT: EN_MISSING_PACK.json (or one part; this chunk only).

CONTEXT
- Each case has Hebrew present in he_segments and English absent/empty (enSegs === 0, en_segments is []).
- Your job is to produce a fresh, accurate English translation for each Hebrew segment (1:1).
- Do NOT copy from editorial .txt dumps, old machine-translation pipelines, or any prior EN MT output.
- Do NOT use action needs_en_source. This kit is authorized for fresh translation from the HE text in the pack.

TRANSLATION NORMS (brief)
- Complete: translate every clause; no omissions, summarizing, or paraphrasing away content.
- No additions: no introductions, notes, "Note:", or explanations beyond the source.
- Halachic terms: use standard transliteration where customary (e.g. muktzeh, melacha, kli rishon, yad soledes bo, psik reisha, d'oraisa, d'rabbanan, l'chatchila, b'dieved).
- Expand Hebrew abbreviations in English (Taz, Magen Avraham, Beit Yosef, Shulchan Aruch, etc.); no raw Hebrew abbreviations in EN.
- Convert Hebrew letter-numbers to Arabic numerals (siman/seif/daf citations).
- Rama glosses introduced by הגה → {Rama: ...} (curly braces).
- Plain English only — no "Translation:" label, no markdown wrappers around the segment text itself.

ACTIONS
1) fresh_translate — default. HE is usable; return en_segments with length === heSegs (same order as he_segments).
2) needs_human — ONLY if HE is empty, corrupt, or clearly unusable. Do not use this merely because the passage is hard.

OUTPUT — JSON array only, same ids/order as input cases:
[{
  "id": "...",
  "action": "fresh_translate",
  "en_segments": ["...", "..."],
  "notes": "short",
  "confidence": "high"|"medium"|"low"
}]

CONSTRAINTS
- en_segments.length MUST equal that case's heSegs (and match he_segments 1:1).
- For needs_human, still include id/action/notes/confidence; en_segments may be [].
- No corpus edits. Return JSON only.
```

## Notes

- Mode is fresh_translate from HE in-pack. Not needs_en_source; not old MT .txt.
- No corpus apply from this pack.
