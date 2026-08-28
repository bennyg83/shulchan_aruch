# EN_TRUNC_MODERATE_RESEGMENT_KIT — EN_TRUNC wave1 moderate re-segment (aligned HE+EN eval)

**For external AI review only. Do not apply to corpus until after human/parent check.**

Side-by-side `segments[].he` + `segments[].en` pairs make slot alignment auditable before any corpus apply.

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **78** |
| Moderate tier (eval) | 78 |
| Excluded (strict overlap) | 0 |
| Wave1 strict applied (excluded) | 21 |
| Wave1 strict held (excluded) | 3 |
| Editorial tier (not in kit) | 99 |

### By volume

| Volume | Count |
|--------|------:|
| oc1 | 5 |
| yd1 | 43 |
| cm1 | 30 |

## Files

- Full kit: [`EN_TRUNC_MODERATE_RESEGMENT_KIT.json`](./EN_TRUNC_MODERATE_RESEGMENT_KIT.json)
  - UTF-8 bytes: 233,197
  - SHA-256: `e01791eb34abb90504dcd0bfab85489e1c05c5e426d6e0ece15d840bc1a97b33`
  - Cases: 78
- Parts: each ≤ 85,000 UTF-8 bytes (hard cap)
- Dictionary (user attaches): **`full_dictionary.md`** — see [`DICTIONARY_REF.md`](./DICTIONARY_REF.md)
- Source eval: [`EN_TRUNC_PACK_ALL_REVIEW_EVAL.json`](./EN_TRUNC_PACK_ALL_REVIEW_EVAL.json)
- Apply log (strict excluded): [`en_trunc_wave1_apply_log.json`](./en_trunc_wave1_apply_log.json)
- Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/`
- Created: 2026-08-28T08:05:13.691Z

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) | Truncated segs |
|------|------|------:|------------:|--------------:|------------------|----------------|
| 1 | `EN_TRUNC_MODERATE_RESEGMENT_KIT_part01.json` | 29 | 0 | 84,359 | `fdf5d19125c6…` |  |
| 2 | `EN_TRUNC_MODERATE_RESEGMENT_KIT_part02.json` | 29 | 29 | 74,617 | `a6e7447dafc1…` |  |
| 3 | `EN_TRUNC_MODERATE_RESEGMENT_KIT_part03.json` | 17 | 58 | 84,286 | `d41a2b6be359…` |  |
| 4 | `EN_TRUNC_MODERATE_RESEGMENT_KIT_part04.json` | 3 | 75 | 12,834 | `95668522f108…` |  |

## ChatGPT prompt (re-segment with aligned HE+EN pairs)

Paste this prompt together with **both** attachments: (1) one `EN_TRUNC_MODERATE_RESEGMENT_KIT.json` / `EN_TRUNC_MODERATE_RESEGMENT_KIT_partNN.json` file, and (2) **`full_dictionary.md`**. Return a JSON array for **only** the case ids in that chunk.

```
SA_Rebuild EN_TRUNC MODERATE — RE-SEGMENT WITH ALIGNED HE+EN PAIRS.

INPUTS (both required)
1) EN_TRUNC_MODERATE_RESEGMENT_KIT.json (or one part; this chunk only)
2) full_dictionary.md (attached by the user — follow it without exception)

DICTIONARY (mandatory — full_dictionary.md)
- Part 1 — abbreviations: expand every Hebrew abbreviation per the dictionary; no raw Hebrew abbreviations in EN.
- Part 2 — halachic terms: use the dictionary transliteration/rendering for every listed term (e.g. muktzeh, melacha, kli rishon, yad soledes bo, psik reisha, d'oraisa, d'rabbanan, l'chatchila, b'dieved).
- Part 3 — commentator names: use names exactly as listed (never anglicize).
- Part 4 — numbers: convert Hebrew letter-numbers to Arabic numerals (siman/seif/daf).
- Part 5 — connectives: render logical connectives per the dictionary.
- Never invent alternate glosses when the dictionary specifies a term.

CONTEXT
- Each case has heSegs > 1 and enSegs === 1 (one EN blob vs multiple HE segments).
- Tier: wave1_moderate — structural split is plausible (high EN/HE ratio) but lacks reliable auto-delimiters; sentence-boundary or semantic alignment required.
- Wave1 strict (24 ids) was already auto-applied or held separately; this kit excludes those.
- Goal: produce heSegs aligned EN segments mapped to each HE slot. Prefer splitting the existing EN blob; translate from HE only where the EN blob clearly lacks material for that HE slot.

TRANSLATION NORMS (when fresh_translate needed)
- Complete: translate every clause; no omissions, summarizing, or paraphrasing away content.
- No additions: no introductions, notes, "Note:", or explanations beyond the source.
- Rama glosses introduced by הגה → {Rama: ...} (curly braces).
- Plain English only — no "Translation:" label, no markdown wrappers around segment text.
- Where norms and full_dictionary.md conflict, full_dictionary.md wins.

TASK
For each case:
1) Align EN to HE slots (index 0 .. heSegs-1).
2) When the existing EN blob clearly contains the translation for a HE slot: split it out (source: split_existing_en). Preserve exact wording where possible.
3) When EN is missing for a HE slot (truncated blob, partial coverage): translate that slot from HE only (source: fresh_translate).
4) When a slot mixes preserved EN cut + gap-fill translation: source: partial.
5) If alignment is unsafe: action needs_human; still return segments[] with best-effort he+en if possible, or empty en for unclear slots.

ACTIONS
- resegment — EN blob splits cleanly into heSegs pieces; no new translation needed.
- mixed_resegment_translate — some slots from EN split, some fresh from HE.
- needs_human — unsafe / ambiguous; flag for manual review.

OUTPUT — JSON array only, same ids/order as input cases:
[{
  "id": "...",
  "action": "resegment" | "mixed_resegment_translate" | "needs_human",
  "segments": [
    {
      "index": 0,
      "he": "...",
      "en": "...",
      "source": "split_existing_en" | "fresh_translate" | "partial"
    }
  ],
  "en_segments": ["...", "..."],
  "notes": "short",
  "confidence": "high"|"medium"|"low"
}]

CONSTRAINTS
- segments.length MUST equal that case's heSegs (and match he_segments 1:1).
- Each segment object MUST include both he and en side-by-side for evaluation.
- en_segments[] (legacy mirror) should match segments[].en in order when present.
- source on each segment documents whether EN came from blob split vs fresh translation.
- No corpus edits. Return JSON only.
```

## Notes

- Moderate tier only; 99 `needs_editorial` cases excluded (separate fresh-translate kit later).
- Wave1 strict (21 applied + 3 held) excluded from this kit.
- Live corpus rescan for current `he_segments[]` / `en_segments[]`.
- Paired `segments[].he` + `segments[].en` output enables per-slot evaluation before apply.
- No corpus apply from this kit.

