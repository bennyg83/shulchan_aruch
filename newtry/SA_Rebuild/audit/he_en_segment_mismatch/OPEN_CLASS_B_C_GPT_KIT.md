# OPEN_CLASS_B_C_GPT_KIT — 15 open B+C cases

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: `split_or_fresh_translate_hardened` · Dictionary: attach **`full_dictionary.md`**

**Class A (12 mechanical Likut splits) are NOT in this kit** — applied locally separately.

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **15** |
| Class B | 3 |
| Class C | 12 |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 15 |

## Files

- Full kit: [`OPEN_CLASS_B_C_GPT_KIT.json`](./OPEN_CLASS_B_C_GPT_KIT.json) (167,224 bytes, SHA `d822ab2a483b…`)
- Parts: target ≤ 85,000 UTF-8 bytes when batched; single-case parts keep **full** segment text (may exceed cap)
- Zip: [`zips/01_OPEN_CLASS_B_C_GPT_KIT.zip`](./zips/01_OPEN_CLASS_B_C_GPT_KIT.zip) includes **full parent** `OPEN_CLASS_B_C_GPT_KIT.json` plus all parts + dictionary
- Created: 2026-08-30T06:25:23.972Z

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
| 1 | `OPEN_CLASS_B_C_GPT_KIT_part01.json` | 8 | 0 | 84,068 | `ad51aa3e8fa5…` |  |
| 2 | `OPEN_CLASS_B_C_GPT_KIT_part02.json` | 5 | 8 | 78,129 | `332c4a88034e…` |  |
| 3 | `OPEN_CLASS_B_C_GPT_KIT_part03.json` | 2 | 13 | 25,921 | `1aaf45974108…` |  |



## ChatGPT prompt

```
SA_Rebuild OPEN CLASS B+C — SPLIT / FRESH TRANSLATE (hardened).

INPUTS: OPEN_CLASS_B_C_GPT_KIT.json (full parent pack — attach even when reviewing one part) + full_dictionary.md

DICTIONARY (mandatory — full_dictionary.md)
- Part 1 — abbreviations: expand every Hebrew abbreviation; no raw Hebrew abbreviations in EN.
- Part 2 — halachic terms: use dictionary transliteration/rendering for every listed term.
- Part 3 — commentator names: exact dictionary forms (never anglicize Shach/Taz/Beit Yosef/etc.).
- Part 4 — numbers: convert Hebrew letter-numbers to Arabic numerals (siman/seif/daf).
- Part 5 — connectives: render logical connectives per dictionary.

CORPUS TEXT: he_segments[] and en_segments[] are COMPLETE from live corpus (NO truncation). Use them as the source of truth for existing EN wording.

STRATEGY
1) If EN already contains the full material for HE slots (often mid markers (Collection)/(Extract)/(Addition)/(Additional note)/(Likkut)): action=split_en or mixed_resegment_translate with source=split_existing_en — VERBATIM cut only.
2) If EN is missing, garbled, offset, or wrong lemma: source=fresh_translate for those slots only (mixed_resegment_translate when some slots are preserved).
3) HE slots starting with (ליקוט): EN segment MUST start with "(Likkut) " (normalize Collection/Extract/Addition/Additional note → (Likkut) on ליקוט heads only).
4) Never merge HE ליקוט blocks. Prefer split EN. merge_groups only for true HE continuation of the SAME note (not distinct lemmas).

FAILURE RULES — DO NOT (causes REJECT/HOLD in eval pipeline)

UNIVERSAL — any EN segment text:
- Do NOT output: "the craft", "Saturday", "Lord's Prayer", "her age", "hand recoils", "first dish", "to the world" (for l'olam), "Hashem's Word", "Holy One" junk loops, "massacre", allocated (for muktzeh), or other known MT failure patterns.
- Do NOT add editorial notes, "Note:", "Meaning:", explanations, or confidence commentary inside EN output.
- Do NOT leave Hebrew characters, raw Hebrew abbreviations, or placeholder text in EN ("TBD", "translation pending", etc.).
- Do NOT wrap the response in markdown fences or add prose outside valid JSON.

JSON OUTPUT (mandatory):
- Return en_segments[] as the primary deliverable; segments[] with he+en is optional for audit alignment.
- Valid JSON only — escape every " as \" inside strings; use straight ASCII quotes only (no smart quotes).
- Prefer returning en_segments[] without embedding he in strings when possible.
- en_segments.length MUST equal heSegs for every case.

SPLIT_EXISTING_EN / RESEGMENT:
- When source is split_existing_en: preserve existing EN wording VERBATIM — cut/join ONLY at boundaries.
- Do NOT normalize citations, synonym-swap, paraphrase, summarize, compress, or "improve" prose on preserved splits.
- Do NOT re-translate from Hebrew when the EN blob already contains the text for that slot.
- Eval HOLDs content_drift / unjustified fresh_translate; REJECTs truncated/broken JSON.

FRESH_TRANSLATE (gap / garbled / offset slots only):
- Complete translation of every Hebrew clause; no omissions; no additions beyond source.
- Use full_dictionary.md; expand abbreviations; Arabic numerals; {Rama: ...} for Rama glosses.
- Apply fresh_translate ONLY where EN blob lacks material or is garbled — never on slots fully covered by good existing EN.
- Prefer plain scholarly English; keep (Likkut) markers on ליקוט HE slots.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"mixed_resegment_translate"|"fresh_translate"|"needs_human","merge_groups":null,"segments":[{"index":0,"he":"...","en":"...","source":"split_existing_en"|"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs (when segments returned). No corpus edits.
```

## Class B IDs

- `yd1/siman128/seif-003/beur-hagra` — Class B: Likut split at (Collection) is mechanical; EN[1–3] garbled — fresh_translate those slots.
- `yd1/siman160/seif-005/beur-hagra` — Class B: multi Extract alignment — 3 consecutive ליקוט lemmas; split carefully then fresh_translate gaps.
- `yd1/siman161/seif-002/beur-hagra` — Class B: EN[0] packs 4×(Extract) for 5 HE ליקוט chain; multi-split + fresh_translate as needed.

## Class C IDs

- `yd1/siman109/seif-001/beur-hagra` — Class C: HE11/EN4; EN[0] covers ~7 non-Likut Gra notes with no mid markers — semantic resegment / fresh_translate.
- `yd1/siman127/seif-001/beur-hagra` — Class C: HE19/EN17; deficit≠Likut-only; garbled EN — fresh_translate bad slots.
- `yd1/siman127/seif-003/beur-hagra` — Class C: HE20/EN13; 6 ליקוט + heavy garbled EN; ambiguous multi-offset.
- `yd1/siman157/seif-001/beur-hagra` — Class C: HE21/EN18; long Gra + garbled segs + non-marker deficit.
- `yd1/siman165/seif-001/beer-hagolah` — Class C: EN garbage loop; beer-degree fresh_translate; avoid failure patterns.
- `yd1/siman165/seif-001/siftei-kohen` — Class C: EN/HE ratio low; missing long Shach; fresh_translate.
- `yd1/siman166/seif-001/siftei-kohen` — Class C: offset editorial; substantial missing EN; fresh_translate.
- `yd1/siman168/seif-018/siftei-kohen` — Class C: HE9/EN4; ~70% EN missing; multi-slot fresh_translate.
- `yd1/siman170/seif-001/turei-zahav` — Class C: long Taz; EN truncated/offset; fresh_translate.
- `yd1/siman197/seif-002/siftei-kohen` — Class C: EN covers wrong lemmas; fresh_translate from HE.
- `yd1/siman199/seif-003/siftei-kohen` — Class C: huge missing HE[0] chafifah sugya; fresh_translate.
- `yd1/siman242/seif-004/beur-hagra` — Class C: HE8/EN4; long missing Gra block; offset fresh_translate.

## Notes

- Full HE/EN from live corpus — **no truncation**.
- Hardened FAILURE RULES: verbatim split where EN complete; fresh_translate for gaps/garbled; ban "the craft"/"Saturday"; `(Likkut)` on ליקוט heads.
- No corpus apply from this kit until parent approve.
