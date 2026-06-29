# Codex Task: Fix All Broken English Translations in Shulchan Aruch Corpus
## Version 2 — Supersedes CODEX_PROMPT_RETRANSLATE.md

---

## CORPUS OVERVIEW

All work is within this root:
```
C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\
```

Structure per commentary file:
```
corpus/{vol}/{simanN}/{seif-NNN}/{slug}/he.html   ← Hebrew source (NEVER TOUCH)
corpus/{vol}/{simanN}/{seif-NNN}/{slug}/en.html   ← English translation (YOUR OUTPUT)
```

Two volumes: `oc1` (Orach Chayim, 697 simanim) and `yd1` (Yoreh Deah, 401 simanim).

Segments inside each file are delimited by `<br />` in he.html and must be separated by `<br />\n` in en.html.

---

## TOTAL SCOPE: 292 BROKEN FILES — 225 REMAIN FOR YOU

**Already completed before this session (67 files):**
- 59 garbage files: copied + normalized from `shulchan-yd-temp` parallel corpus — DONE
- 8 placeholder files: copied + normalized from `shulchan-yd-temp`, segment-aligned — DONE

**Your work (225 files, two phases):**

| Phase | Description | Count | Effort |
|-------|-------------|-------|--------|
| Phase 2 | Full retranslation from Hebrew | 112 | Hard — translate each segment |
| Phase 3 | Segment-split — quality text exists, insert `<br />` breaks | 113 | Light — find breaks, don't retranslate |
| **TOTAL** | | **225** | |

---

## PHASE 2 — FULL RETRANSLATION (112 files)

### Category A — Remaining garbage files (93 files)

Take all 152 paths from `garbage-report.json` → `.garbageFiles[]`, subtract the 59 `dst` paths in `tier1_copy_pairs.json`. The remaining 93 paths are Category A.

Includes biur-halacha siman1/seif-001 (yd-temp existed but had he=5, en=3 segment mismatch — retranslate fresh).

Common garbage patterns to recognize and replace:
- `column:` / `a Jerusalemite` / `chief there` / `head of Maha`
- `waker of the dawn` / `3rd prayers of confession` / `Lord's Prayer` / `Saturday`
- `KGB` / `Bible and the Bible` / `Named to "` / `star work` / `Lycott`
- `M.M.M` / `D.D.D` / repeated number strings like `24 24 24 24`

### Category B — Placeholder files with no clean source (19 files)

Take all 140 paths from `oc1_placeholder_files.txt`, subtract the 113 paths in `tier2_segment_split.json` and the 8 already copied. The remaining 19 have no clean source anywhere.

Current content in these files (replace entirely):
```
English translation pending – replace after editing this block (keep Hebrew above intact).
```

---

## PHASE 3 — SEGMENT-SPLIT (113 files)

**File list:** `tier2_segment_split.json`
Path: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\tier2_segment_split.json`

Each entry has:
```json
{
  "corpus_en": "...\\en.html",     ← write your output here
  "ytemp_en":  "...\\en.html",     ← quality source text (read-only)
  "corpus_he": "...\\he.html",     ← Hebrew segments (read-only)
  "he_segs":   2,                  ← how many segments he.html has
  "en_segs":   1,                  ← how many segments ytemp currently has
  "slug": "...", "siman": "...", "seif": "..."
}
```

**The problem:** The `ytemp_en` file contains a complete, high-quality English translation of the entire seif, but it is written as a single unbroken paragraph (or fewer segments than the Hebrew). The `corpus_he` file has `N` segments separated by `<br />`. The app pairs Hebrew and English segments 1:1 — misaligned files show broken display.

**What to do:**
1. Read `corpus_he` to understand the segment boundaries and topic of each Hebrew segment.
2. Read `ytemp_en` to see the full English translation.
3. Find where in the English text the content of each Hebrew segment ends — insert `<br />\n` at those boundaries.
4. Write the result (same English text, now properly split into N segments) to `corpus_en`.
5. Verify: split count matches `he_segs` exactly.

**Do NOT retranslate.** The English content is already correct — you are only adding segment separators.

**Example:**

He.html (2 segments):
```
<b>Seif 2.</b> First topic content here.<br />
<b>(There).</b> Second topic content here.
```

Ytemp_en (1 segment — topics run together):
```
Seif 2. First topic content here, and then Second topic content here.
```

Correct output for corpus_en:
```html
Seif 2. First topic content here, and then<br />
Second topic content here.
```

---

## TRANSLATION RULES (Phase 2 only)

### R1 — Segment count alignment (CRITICAL)
English segment count MUST equal Hebrew segment count. Split on `<br />` in he.html to count. Never merge or split Hebrew segments.

### R2 — Bold opening phrase

When a commentary segment begins by quoting a phrase from the Mechaber (the base Shulchan Aruch text), render that quoted phrase in `<b>...</b>`.

**Applies to:** Baer Heitev, Shach (Siftei Kohen), Taz (Turei Zahav), Magen Avraham, Mishna Berurah, Biur Halacha, Peri Megadim, Eliyah Rabbah, Machatzit HaShekel

**Format:**
```html
<b>She should be careful.</b> This refers to every case where the chafifah is distant from the immersion by a day or two. Shach.<br />
<b>She should inspect.</b> The Shach wrote that according to all views she must inspect…
```

If no clear quoted phrase opens a segment, omit the bold — do not force one.

### R3 — Beer HaGolah citation format

Beer HaGolah segments are almost entirely short Talmudic source citations. Rules:

| Hebrew | English |
|--------|---------|
| `שם` (citation context) | `Ibid.` — **NEVER** "Named", "name", or "shem" |
| Gematria: `ל"א`=31, `י"ג`=13, `כ"ב`=22, `ס"ד`=64 | Render as integer |
| `דף` | `fol.` or `p.` |
| `ע"א` / `ע"ב` | `a` / `b` (folio side) |
| `פ"ג` | `ch. 3` |
| `הל' ב'` | `law 2` |

Examples: `שם ל"א` → `Ibid., 31.` · `ברכות דף י"ג ע"א` → `Berakhot 13a.` · `שם פ"ג הל' ב'` → `Ibid., ch. 3, law 2.`

If unsure of an abbreviation, transliterate rather than guess.

### R4 — Terminology

| Use | Never use |
|-----|-----------|
| Shabbat | Saturday |
| Mechaber | "the author" |
| Taz, Shach, Magen Avraham, Bach, GRA, Peri Megadim, Mishna Berurah, Biur Halacha | Anglicized expansions |
| Yom Tov | "holiday" |
| Gemara, Rambam, Rashi, Tur, Beit Yosef, Yerushalmi, Bavli | as given |
| seif, siman, teshuva, halacha, issur, heter | as given |

### R5 — What NOT to do
- Never change he.html
- No markdown (no `**`, no `#`, no `-` bullets)
- Only HTML tags permitted: `<b>` and `<br />`
- No footnotes or editorial additions
- No remaining "translation pending" text in output

---

## PRIORITY ORDER

### Phase 2 (retranslation) — process in this order:
1. `chokhmat-shlomo` placeholders (~35 files)
2. `biur-halacha` placeholders (~20 files)
3. `shaarei-teshuvah` placeholders (~20 files)
4. Remaining OC1 placeholders
5. Garbage: `beer-hagolah` (OC1+YD1, citation-only format)
6. Garbage: `beur-hagra`, `siftei-kohen`, `baer-heitev`, `turei-zahav`

### Phase 3 (segment-split) — by slug count:
1. `chokhmat-shlomo` (29 files)
2. `biur-halacha` (24 files)
3. `shaarei-teshuvah` (22 files)
4. `turei-zahav` (13 files)
5. Remaining

---

## OUTPUT FORMAT

- Write UTF-8, no BOM
- Segments joined by `<br />\n`
- Bold opening phrase: `<b>phrase.</b> rest of segment`
- No trailing blank lines

---

## QUALITY CHECK (after each batch of 15–20)

1. He/En segment counts match for each written file
2. No "translation pending" text remains
3. No garbage patterns (column:, Jerusalemite, Lord's Prayer, Saturday, KGB)
4. Bold opening phrase present for commentators requiring it (R2)
5. Phase 3: segment count matches `he_segs` in the JSON entry

---

## AFTER ALL FILES — REBUILD BUNDLES

Run from `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\`:
```
node scripts/bundle-corpus.mjs --volume oc1
node scripts/bundle-corpus-yd1.mjs
```

Then verify with SA_Sandbox scan:
```
cd C:\Users\binya\Documents\Shulchan aruch\newtry\SA_Sandbox
node scripts/scan.mjs
```
Target: `TOTAL BROKEN: 0`

---

## FILE LOCATION QUICK REFERENCE

All paths relative to `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\`

| File | Purpose |
|------|---------|
| `scan-results/garbage-report.json` → `.garbageFiles[]` | All 152 garbage en.html paths |
| `tier1_copy_pairs.json` → `[*].dst` | 59 already-fixed garbage paths (exclude from Phase 2) |
| `oc1_placeholder_files.txt` | All 140 placeholder en.html paths |
| `tier2_segment_split.json` | 113 placeholder paths with ytemp source for Phase 3 |

---

## REFERENCE EXAMPLES

### Baer Heitev (bold markers, 2 segments)

**he.html:**
```
<b>שתהא זהירה.</b> - בכל ענין שתהא החפיפה רחוקה מהטבילה ביום או יומים. שך:<br />
<b>ותבדוק.</b> - כתב הש"ך דלכ"ד צריכה לבדוק ולחפש בשעת חפיפה ובשעת טבילה...
```

**en.html (correct):**
```html
<b>She should be careful.</b> This refers to every case where the chafifah is distant from the immersion by a day or two. Shach.<br />
<b>She should inspect.</b> The Shach wrote that according to all views she must inspect and check at the time of chafifah and at the time of immersion…
```

### Beer HaGolah (citation-only, 3 segments)

**he.html:**
```
שם ל"א:<br />
ברכות דף י"ג ע"א:<br />
ר"ן פ"ג:
```

**en.html (correct):**
```html
Ibid., 31.<br />
Berakhot 13a.<br />
Ran, ch. 3.
```
