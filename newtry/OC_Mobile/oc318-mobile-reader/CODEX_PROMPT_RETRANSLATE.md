# Codex Task: Retranslate 292 Broken English Files in Shulchan Aruch Corpus

## Context

The OC1 + YD1 corpus is at:
```
C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\
```

Each commentary file has a `he.html` (source Hebrew, never touch) and an `en.html` (English translation, replace when broken).

There are two categories of broken en.html files to fix:

---

## CATEGORY A — Garbage Machine Translation (152 files)

These files contain real English text but it is garbled machine translation from a bad MT engine. Patterns include:
- "column:", "a Jerusalemite", "the column:", "chief there"
- "waker of the dawn", "3rd prayers of confession", "Lord's Prayer", "Saturday"
- Repeated number strings like "24 24 24 24 24"
- "KGB", "Bible and the Bible", "Hashem's Word" (as garbled usage), "terrorist"

The full list of garbage files is in:
```
C:\Users\binya\Documents\Shulchan aruch\newtry\SA_Sandbox\scan-results\garbage-report.json
```
Field: `.garbageFiles[]` — array of 152 absolute paths to en.html files.

---

## CATEGORY B — Untranslated Placeholders (140 files, OC1 only)

These en.html files contain only the literal placeholder text:
```
English translation pending – replace after editing this block (keep Hebrew above intact).
```
(one or more segments, all with this same placeholder)

The full list is:
```
C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\oc1_placeholder_files.txt
```
One absolute path per line, 140 total.

---

## Translation Rules

### Segment structure
- The Hebrew (`he.html`) is divided into segments separated by `<br />` or `<br>`.
- Your English output MUST match the Hebrew segment count exactly.
- Separate English segments with `<br />\n` (line break + newline between segments).
- Do NOT add extra segments or merge Hebrew segments.

### Bold markers
When a commentary segment begins by quoting a key word or phrase from the Mechaber (the main text), render that opening quoted term in bold:

**CORRECT format:**
```html
<b>She should be careful.</b> This refers to every case where the chafifah is distant from the immersion by a day or two. Shach.<br />
<b>She should inspect.</b> The Shach wrote that according to all views she must inspect…
```

This applies to: Baer Heitev, Shach (Siftei Kohen), Taz (Turei Zahav), Magen Avraham, and other commentaries that key each paragraph to a specific phrase in the Mechaber. If no clear quoted phrase opens the segment, omit bold.

### Beer HaGolah citation format (critical)

Beer HaGolah segments are almost entirely short source citations. The MT engine completely mistranslates these. Rules:

- `שם` in a citation context = **"Ibid."** or **"There"** — NEVER "Named", "name", or "shem"
- Gematria numbers (`ל"א` = 31, `י"ג` = 13, `כ"ב` = 22, etc.) = render as the number
- `דף` = "p." or "fol." (folio page)
- `פ"` + letter = chapter abbreviation, e.g. `פ"ג` = "ch. 3"
- Common pattern: `שם דף ל"א` → `Ibid., fol. 31.`
- Common pattern: `שם פ"ג` → `Ibid., ch. 3.`
- When citing a tractate by name: `ברכות דף י"ג` → `Berakhot 13.`
- Do not expand abbreviations you are unsure of — transliterate them (e.g. `ר"ן` → "Ran", `מ"מ` → "Maggid Mishneh")

**Example of correct Beer HaGolah output:**
- Hebrew: `שם ל"א` → English: `Ibid., 31.`
- Hebrew: `ברכות דף י"ג ע"א` → English: `Berakhot 13a.`
- Hebrew: `שם פ"ג הל' ב'` → English: `Ibid., ch. 3, law 2.`

### Terminology (use these exactly, do not anglicize)
- Mechaber (not "the author")
- Rama, Taz, Shach, Magen Avraham, Bach, GRA, Peri Megadim, Mishna Berurah, Biur Halacha
- Shabbat (not "Saturday"), Yom Tov, issur, heter, mutar, assur, seif, siman, teshuva
- Gemara, Talmud, Rambam, Rashi, Tur, Beit Yosef, Rishon/Acharonim
- Poskim, posek, halacha, halachic
- Do not translate untranslatable Hebrew names: keep "Yerushalmi", "Bavli", "Ketubbot", etc.

### What NOT to do
- Do NOT change he.html under any circumstances.
- Do NOT add commentary, footnotes, or editorial notes not in the Hebrew.
- Do NOT translate the full Mechaber text — only the commentary text in the file you are working on.
- Do NOT output markdown — plain HTML only (`<b>`, `<br />` only).
- Do NOT leave any instance of "translation pending" or similar placeholders in your output.

---

## Workflow

Process in batches of 10–20 files. For each file:

1. Read the `he.html` at the same directory as the `en.html` (same folder, `he.html` instead of `en.html`).
2. Read the current `en.html` to understand the segment count (placeholder or garbage).
3. Count Hebrew segments (`<br />` splits).
4. Translate the Hebrew into English following the rules above, matching segment count.
5. Write the result to `en.html` (UTF-8, no BOM).

After completing all files, run:
```
node scripts/bundle-corpus.mjs --volume oc1
node scripts/bundle-corpus-yd1.mjs
```
from `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\`
to rebuild the bundles.

---

## Priority Order

Process in this order:
1. **Category B placeholders** — these show nothing at all to the user, highest priority
   - Start with `chokhmat-shlomo` (40+ files), then `biur-halacha` (20+ files), then `shaarei-teshuvah` (20+ files)
2. **Category A garbage** — these show actively wrong content
   - Start with `beer-hagolah` (29 files), `beur-hagra` (27 files), `baer-heitev` (22 files)

---

## Quality Check

After each batch, verify:
- He and En segment counts match for each written file
- No "translation pending" text remains
- No garbage patterns remain (column:, Jerusalemite, Lord's Prayer, Saturday, KGB, etc.)
- Opening bold phrase is present where appropriate

---

## Reference Example

**File:** `yd1/siman199/seif-006/baer-heitev/en.html`

**Correct output:**
```html
<b>She should be careful.</b> This refers to every case where the chafifah is distant from the immersion by a day or two. Shach.<br />
<b>She should inspect.</b> The Shach wrote that according to all views she must inspect and check at the time of chafifah and at the time of immersion, and if possible she should be careful between the chafifah and immersion not to touch items that interpose and are likely to adhere, as the Rav wrote; so is the custom.<br />
<b>And she should rinse.</b> But not the whole body. The same applies on Shabbat: she may wash with water heated before Shabbat her face, hands, and feet…
```

This is the target quality standard for all files.
