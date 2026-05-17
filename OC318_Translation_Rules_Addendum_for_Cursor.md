# OC 318 Translation Rules Addendum for Cursor

**Layer (B) — OC318-specific human/model judgment.** Review and decision guide (Hebrew-first, failure markers, when to rebuild). **Not** the scripted pipe-table file (`OC318_Vocabulary_Corrections.md`) and **not** the generic preprocessing pipeline (`scripts/halachic_text_translation_pipeline.md`).

## Purpose

Use this addendum together with the main OC 318 project prompt and the vocabulary correction guide.

The goal is not to lightly clean Google Translate output. The goal is to produce a reliable halachic translation by comparing every English paragraph back to the Hebrew.

If the English contains machine residue, unresolved abbreviation fragments, wrong gematria, or fluent but incorrect meaning, rebuild the paragraph from the Hebrew.

Do not trust the existing English when it contains signs of corruption.

---

## Core Translation Rule

For every Hebrew and English pair:

1. Read the Hebrew first.
2. Identify the source type: Mechaber, Rama, Tur, Magen Avraham, Taz, Biur Halacha, or Shulchan Aruch K'pshuto.
3. Expand abbreviations mentally or through the project glossary.
4. Resolve gematria and source references.
5. Translate into clean English.
6. Compare the new English against the existing English.
7. If the existing English is wrong, replace it.
8. If the existing English is usable but awkward, clean it.
9. If the Hebrew is unclear because of OCR corruption, mark `[unclear OCR]` only for the unclear phrase, not for the whole paragraph.

Never leave transliterated machine fragments in the final English.

---

## Operating rule: multiple failure markers

When a paragraph contains **more than one failure marker**, **do not attempt local fixes.** **Re-translate the entire paragraph from the Hebrew.**

Failure markers include unresolved transliteration fragments, bad gematria conversions, source-name corruption, nonsensical English, or any phrase listed in the **Absolute Failure Markers** section below.

These are not isolated word choice problems. They indicate that the translation engine failed to parse the Hebrew or rabbinic abbreviations.

---

## Absolute Failure Markers

If any English paragraph contains one of the following, it must be reviewed against the Hebrew and usually rebuilt.

```text
DSL
DMSH
Dahoi
Dela
Dafilo
Daitmar
Dagm
Dastma
Dastama
Dachion
KIL
KII
KMSH
KMSh
Lita
LT
A.A.
A.C.
ACM
BBI
B.D.
C. S.
D.O.T.
PG
PK
PB
RPG
S.D.
Yahu
Shafi
Holkin
Aliyahu
Damhir
Dahmir
Shaduka
Dabila
Dabitahu
Dela Rashi
Dain Shabbos prepare
religious interpretation
palm in his eyes
spurring
mutiny
the sign
the mark
the hand is scalded
disgusted hand
transfusion from a vessel
infusion from a vessel
Sunday
ovary
the holy one
the patient model
the healthy model
Motzei Shabbos 19
prepare LT
section E
section y
```

If one of these appears, do not run find and replace blindly. Go back to the Hebrew and translate the clause properly.

---

## Hebrew Number and Gematria Rules

Do not translate Hebrew number markers as words.

### Common examples

```text
י״ט = Yom Tov, not 19, unless the context is clearly a number
מו״ש = Motzei Shabbos
ס״ק = seif katan
סי׳ = siman
סעיף = seif
ע״א = amud alef
ע״ב = amud beit
דף ט״ו ע״א = daf 15a
דף ט״ו ע״ב = daf 15b
סי׳ ש״ז סעיף כ׳ = siman 307, seif 20
סי׳ רמ״ז סעיף כ׳ = siman 247, seif 20
יו״ד סי׳ ס״ז ס״ב = Yoreh Deah 67:2
```

### Hebrew note markers

When a source note begins with a Hebrew letter, convert it carefully.

```text
א = 1
ב = 2
ג = 3
ד = 4
ה = 5
ו = 6
ז = 7
ח = 8
ט = 9
י = 10
יא = 11
יב = 12
יג = 13
יד = 14
טו = 15
טז = 16
יז = 17
יח = 18
יט = 19
כ = 20
כא = 21
כב = 22
כג = 23
כד = 24
כה = 25
כו = 26

**כו׳ is not the number 26.** When the Hebrew ends with a **geresh** (כו׳), it abbreviates **וכו׳** (*vekholu* / “and so forth”). Translate as **et cetera** (Latin, two words; informally **etc.** is acceptable in lists). Never render כו׳ as a numeral, as “if 20,” or as random digits—machines often confuse it with כ״ו.

כז = 27
כח = 28
כט = 29
ל = 30
לא = 31
לב = 32
לג = 33
לד = 34
לה = 35
לו = 36
לז = 37
לח = 38
לט = 39
מ = 40
נ = 50
ס = 60
סא = 61
סב = 62
```

Never translate Hebrew note letters as English words such as:

```text
No
Lev
Sev
S
Yid
Tu
J
H
```

Use either the correct number or preserve the Hebrew marker.

Preferred format:

```text
(15) ...
```

or:

```text
(טו) ...
```

Do not output:

```text
(Tu) ...
(Yid) ...
(No) ...
(Lev) ...
```

---

## Required Rosh Teivot Expansions

Use these consistently.

```text
מו״ש = Motzei Shabbos
מוצ״ש = Motzei Shabbos
י״ט = Yom Tov
יו״ט = Yom Tov
עכו״ם = non-Jew
א״י = non-Jew, when context means אינו יהודי
ע״י = by means of, through
ע״פ = according to
וה״ה = and the same rule applies
ה״ה = the same rule applies
מ״מ = nevertheless
אע״פ = even though
אע״ג = even though
קי״ל = we rule
קיי״ל = we rule
כמ״ש = as stated
כנ״ל = as stated above
ע״ש = see there
עיי״ש = see there
צ״ל = it must mean, or it should read
ר״ל = meaning
י״ל = one can say
אצ״ל = there is no need to say
דאורייתא = Torah-level
דרבנן = rabbinic
מדאורייתא = by Torah law
מדרבנן = by rabbinic law
בכדי שיעשו = bichdei sheyeasu
מע״ש = before Shabbos
בע״ש = on Friday before Shabbos
מבע״י = from before day, meaning before Shabbos or before Yom Tov, depending on context
```

---

## Source Name Rules

Never translate source names literally.

```text
שו״ע = Shulchan Aruch
מחבר = Mechaber
רמ״א = Rama
טור = Tur
ב״י = Beit Yosef
מ״א = Magen Avraham
ט״ז = Taz
ש״ך = Shach
מ״ב = Mishnah Berurah
בה״ל = Biur Halacha
רשב״א = Rashba
רמב״ן = Ramban
רמב״ם = Rambam
ר״ן = Ran
רא״ש = Rosh
רי״ף = Rif
גר״א = Gra
רע״א = Rabbi Akiva Eiger
פמ״ג = Pri Megadim
בה״ג = Baal Halachot Gedolot
רד״ך = Radbach
כנה״ג = Knesset HaGedolah
מהרי״ו = Mahariv
```

Do not output:

```text
the Rabbi
the Rev.
assistants
the shoemaker
the Gra'a
the late Rabbinical rabbinical rabbi
```

Rebuild the phrase from the Hebrew.

---

## Halachic Vocabulary Rules

Use these translations consistently.

```text
מלאכה = melacha
מלאכות = melachos
מבשל = one who cooks
בישול = cooking
אופה = baking
טיגון = frying
צלייה = roasting
בשבת = on Shabbos
במזיד = intentionally, b'meizid
בשוגג = unintentionally, b'shogeg
אסור = forbidden
מותר = permitted
חייב = liable
פטור = exempt
לכתחילה = lechatchilah
בדיעבד = bedieved
מעשה שבת = benefit from melacha done on Shabbos
בכדי שיעשו = bichdei sheyeasu
אמירה לנכרי = asking a non-Jew to perform melacha
בישולי עכו״ם = bishul akum
פיקוח נפש = pikuach nefesh
חולה שיש בו סכנה = a dangerously ill person
חולה שאין בו סכנה = a sick person whose life is not in danger
בריא = a healthy person
מוקצה = muktzeh
מוקצה מחמת איסור = muktzeh machmas issur
מחובר = attached to the ground
תולש = detaching from the ground
כלי ראשון = kli rishon
כלי שני = kli sheni
כלי שלישי = kli shelishi
עירוי מכלי ראשון = pouring from a kli rishon
עירוי מכלי שני = pouring from a kli sheni
תולדות האור = toldos ha'or, derivatives of fire
תולדות חמה = toldos chamah, derivatives of the sun
חמה עצמה = the sun itself
יד סולדת בו = yad soledet bo, hand-recoiling hot
מאכל בן דרוסאי = maachal ben Drusai, minimally edible
מצטמק ויפה לו = mitzamek v'yafeh lo, further cooking improves it
מצטמק ורע לו = mitzamek v'ra lo, further cooking worsens it
מכת מרדות = makkat mardut, rabbinic lashes
הטמנה = hatmanah, insulating
דבר המוסיף הבל = something that adds heat
דבר שאינו מוסיף הבל = something that does not add heat
```

---

## Phrases That Must Be Rebuilt

When these Hebrew phrases appear, use the corrected meaning below.

### 1. דקל בעיניו ויבא לעשות כן פעם אחרת

Do not translate as:

```text
because it is a palm in his eyes
```

Correct:

```text
because it is treated lightly in his eyes, and he may come to do so another time
```

### 2. ליכא למיחש דאתי לבשולי בהדיא

Do not translate as:

```text
there is no concern that he came to the religious interpretation of Bashuli
```

Correct:

```text
there is no concern that he will come to cook openly
```

### 3. ואם היה מו״ש י״ט אסור דאין שבת מכין לי״ט

Do not translate as:

```text
if there was a Motzei Shabbos 19 it is forbidden to dain Shabbos prepare LT
```

Correct:

```text
If Motzei Shabbos is Yom Tov, it is forbidden, because Shabbos may not prepare for Yom Tov.
```

### 4. מכת מרדות

Do not translate as:

```text
struck with mutiny
```

Correct:

```text
subject to makkat mardut, rabbinic lashes
```

### 5. יד סולדת בו

Do not translate as:

```text
the hand is scalded in it
```

Correct:

```text
yad soledet bo, hand-recoiling hot
```

### 6. אם נצטנן

Do not translate as:

```text
if he caught a cold
```

Correct:

```text
if it cooled down
```

### 7. אין שבת מכין ליום טוב

Correct:

```text
Shabbos may not prepare for Yom Tov
```

### 8. שמא ירבה בשבילו

Correct:

```text
lest he increase for him
```

Expanded when needed:

```text
lest he add more food for the healthy person as well
```

### 9. אי אפשר לכזית בשר בלא שחיטה

Correct:

```text
it is impossible to obtain even an olive-sized piece of meat without slaughtering
```

### 10. דם הבלוע בו ליכא איסור כל זמן שלא פירש

Correct:

```text
blood absorbed within it is not forbidden as long as it has not separated
```

---

## Taz Translation Rules

The Taz often contains long argumentative text. Do not transliterate it. Do not preserve machine fragments.

For Taz paragraphs:

1. Break the Hebrew into clauses.
2. Resolve every abbreviation.
3. Identify cited opinions.
4. Translate argument flow.
5. Keep the English readable but faithful.
6. Preserve source names.
7. Mark only genuinely unclear OCR as `[unclear OCR]`.

### Common Taz terms

```text
פסק כר״י = he ruled like R' Yehuda
ולא כר״מ = and not like R' Meir
משום דסתמא = because the unattributed Mishnah
כוותיה = follows his view
אבל התוס׳ וסייעתם = but Tosafos and those who support their view
וראייתם ברורה מאד = and their proof is very clear
מ״מ = nevertheless
א״כ = if so
ולפ״ז = according to this
וכן עיקר להלכה = and this is the primary ruling in halacha
```

Never output:

```text
Tosafos and their assistants
Karm
Dastma
Kvatia
Dahalka
Dahmir
```

Translate the words.

---

## Biur Halacha Translation Rules

Biur Halacha must be translated more literally than Shulchan Aruch K'pshuto, but still in coherent English.

### Example

Hebrew:

```text
דוקא בדבר שנעשה מעשה בגוף הדבר שנשתנה מכמות שהיה
```

Correct:

```text
specifically where an action was performed on the item itself, changing it from its previous state
```

Do not translate as:

```text
the fact that an act is done in the body of the thing that has changed from the amount it was
```

### Example

Hebrew:

```text
המוציא מרשות לרשות שלא נשתנה הדבר מכמות שהיה
```

Correct:

```text
one who transfers an item from one domain to another, where the item itself has not changed from its previous state
```

Do not translate as:

```text
the one who issues it authorizes the authority
```

---

## Shulchan Aruch K'pshuto Translation Rules

This source is modern Hebrew and should be smoother English.

Do not translate word for word when that creates bad English.

### Examples

```text
הקדמה לסעיף
```

Correct:

```text
Introduction to the seif
```

```text
הסימן
```

Correct depending on context:

```text
the siman
```

or:

```text
this chapter
```

But for citations, use:

```text
siman 318
```

### פוסקים

Do not translate as:

```text
arbitrators
```

Correct:

```text
poskim
```

or:

```text
halachic authorities
```

---

## Reference Formatting Rules

Use stable halachic reference formatting.

```text
Orach Chayim 318:1
Yoreh Deah 67:2
siman 307, seif 20
seif katan 10
Chullin 15a
Beitzah 37b
Gittin 54a
Eruvin 47a
```

Do not output:

```text
chapter (171) [175]
page 15
section E
section y
17, section 20
C. S. 7 Sab.
B.D. C. K. G. S. K. Yod
```

If the Hebrew reference is unclear because of OCR, preserve the Hebrew and mark it:

```text
[unclear OCR reference: ...]
```

---

## Forbidden Translation Habits

Do not do any of the following:

1. Do not translate source names literally.
2. Do not convert every Hebrew abbreviation into English letters.
3. Do not leave Aramaic as random English syllables.
4. Do not guess when OCR is corrupted.
5. Do not insert explanation that is not in the Hebrew.
6. Do not summarize long notes.
7. Do not skip difficult Taz or Biur Halacha passages.
8. Do not rely on find and replace alone.
9. Do not use “section” for סעיף in final halachic references unless the project specifically wants “section.” Prefer “seif.”
10. Do not use “chapter” for every סימן in citations. Prefer “siman” when citing.

---

## Review Pass Checklist

For each seif, run this checklist before considering it complete.

```text
1. Does every Hebrew paragraph have English immediately below it?
2. Was every source included only if present?
3. Were excluded sources omitted?
4. Are there any unresolved fragments like DSL, DMSH, KIL, LT, A.A., or C. S.?
5. Are all Hebrew note markers converted correctly?
6. Are י״ט and מו״ש handled correctly?
7. Are all siman, seif, seif katan, daf, and amud references readable?
8. Are source names preserved properly?
9. Are halachic terms consistent with the glossary?
10. Does the English actually match the Hebrew?
11. Are any unclear OCR phrases marked narrowly?
12. Is there any added commentary not found in the Hebrew?
13. Are long Taz passages fully translated rather than transliterated?
14. Are Biur Halacha passages precise and complete?
15. Are modern Hebrew explanation sections smooth and readable?
```

---

## Automated Flagging Regex Ideas

Use these as search patterns to find paragraphs requiring review.

```regex
\b(DSL|DMSH|Dahoi|Dela|Dafilo|Daitmar|Dagm|Dastma|Dastama|Dachion|KIL|KII|KMSH|KMSh|Lita|LT|ACM|BBI|D\.O\.T\.|PG|PK|PB|RPG|Yahu|Shafi|Holkin|Aliyahu)\b
```

```regex
\b(spurring|mutiny|ovary|disgusted hand|hand is scalded|transfusion|religious interpretation|palm in his eyes|the holy one|healthy model|patient model)\b
```

```regex
\((Yid|Tu|No|Lev|Sev|J|H|S)\)
```

```regex
\b(Motzei Shabbos 19|prepare LT|section E|section y|C\. S\. 7|B\.D\.)\b
```

Any match means the paragraph must be checked against the Hebrew.

---

## Required Output Quality

A final English paragraph should meet all of these conditions:

```text
Readable English
Faithful to the Hebrew
No untranslated machine fragments
No invented explanations
Consistent halachic terminology
Correct source references
Correct note numbering
Clear handling of uncertainty
```

If the paragraph fails any one of these, it is not final.

---

## Instruction to Cursor

When editing the translation document, do not merely apply global replacements.

For every flagged paragraph:

1. Locate the Hebrew immediately above the English.
2. Translate the Hebrew fresh.
3. Use the glossary and abbreviation rules.
4. Replace the entire English paragraph if necessary.
5. Preserve the document structure.
6. Do not alter the Hebrew unless fixing obvious OCR spacing or quote artifacts.
7. Do not add commentary.
8. Do not shorten.
9. Do not proceed if unresolved OCR affects the meaning. Mark the unclear words narrowly.

The final result must be a bilingual halachic reference document, not a cleaned machine translation.

---

## Cursor Operating Rule

When a paragraph contains more than two failure markers, do not attempt local fixes. Re-translate the entire paragraph from the Hebrew.

Failure markers include:

```text
DSL
DMSH
KIL
LT
A.A.
C. S.
S.D.
Dafi'
PG
religious interpretation
palm in his eyes
spurring
mutiny
ovary
section y
section E
prepare LT
the holy one
healthy model
patient model
Dastma
Dela
Dahoi
the hand is scalded
disgusted hand
if we catch a cold
(Yid) (Tu) (Kid) (J) (Lev)
20 20
adds vanity
silent prayer
shem delphi
the history of heat
```

Reason:

These are not isolated word choice problems. They indicate that the translation engine failed to parse the Hebrew or rabbinic abbreviations.

**Operational rule:** Run `scripts/scan-oc318-failures.js` on `data/oc318.full.json` (or on exported DOCX text). Retranslate **every** paragraph flagged `RETRANSLATE_FROM_HEBREW_REQUIRED` via `scripts/retranslate-oc318-flagged.js` across **all seifim**, not only early examples. Use `--include-review` only when aiming for zero remaining markers. Do not label output “final” until `npm run validate:oc318:strict` passes.

---

## Practical Recommendation

Run a flagged paragraph review pass before any final document export.

For the current OC 318 file, the most urgent fixes are paragraph-level retranslation of corrupted Tur, Magen Avraham, Taz, and Biur Halacha sections.

The priority is not formatting. The priority is making sure the English actually matches the Hebrew.
