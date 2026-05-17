# Halachic Text Translation Pipeline

This document is **layer (A)** of the OC318 translation stack: **general halachic preprocessing and translation architecture** (not OC318-only judgment rules, and not the scripted vocabulary table).

**Related files:** **`OC318_Translation_Rules_Addendum_for_Cursor.md`** — Hebrew-first review, failure markers, when to rebuild paragraphs. **`OC318_Vocabulary_Corrections.md`** — deterministic find-and-replace for `npm run fix:vocab` only.

---

This document outlines a practical architecture for improving bulk translation of halachic Hebrew texts, especially texts containing rosh teivot, gematria-based references, source abbreviations, and OCR artifacts.

The goal is not simply translation. The goal is:

```text
Raw Hebrew text
→ clean OCR / spacing / punctuation
→ detect source type
→ expand rosh teivot
→ resolve gematria page and siman references
→ normalize Hebrew halachic terms
→ translate with a protected halachic glossary
→ post-process English
→ output clean formatted text
```

---

## 1. Problem Summary

Standard translation APIs usually fail on halachic texts because they do not reliably understand:

- Rosh teivot and rabbinic abbreviations
- Hebrew numeric references using gematria
- Source names and sefer references
- Daf, siman, seif, and seif katan structures
- Halachic technical vocabulary
- Mixed Hebrew, Aramaic, and rabbinic shorthand
- OCR errors from printed sefarim
- Punctuation gaps and broken line flow

A useful system needs a preprocessing layer before the text is sent to an LLM or translation model.

---

## 2. Recommended Architecture

```text
halacha-text-tools/
  acronyms.json
  sourceNames.json
  halachicGlossary.json
  gematria.ts
  normalizeHebrew.ts
  resolveReferences.ts
  translatePrompt.ts
  postProcessEnglish.ts
```

Suggested process:

```ts
const cleaned = normalizeHebrew(rawHebrew);
const expanded = expandAcronyms(cleaned);
const refsResolved = resolveHebrewRefs(expanded);
const protectedTerms = applyGlossary(refsResolved);
const translation = await translateWithLLM(protectedTerms);
const final = postProcessEnglish(translation);
```

---

## 3. Rosh Teivot Map

Use a JSON dictionary for common abbreviations.

```json
{
  "מו״ש": "מוצאי שבת",
  "מוצ״ש": "מוצאי שבת",
  "עכו״ם": "עובד כוכבים ומזלות",
  "נכרי": "non-Jew",
  "אינו יהודי": "non-Jew",
  "י״ט": "יום טוב",
  "יו״ט": "יום טוב",
  "יו״ד": "יורה דעה",
  "או״ח": "אורח חיים",
  "אה״ע": "אבן העזר",
  "חו״מ": "חושן משפט",
  "ס״ק": "סעיף קטן",
  "סק״א": "סעיף קטן א",
  "סי׳": "סימן",
  "סימן": "סימן",
  "סע׳": "סעיף",
  "סעי׳": "סעיף",
  "ס״א": "סעיף א",
  "ס״ב": "סעיף ב",
  "מ״א": "מגן אברהם",
  "בה״ג": "בעל הלכות גדולות",
  "רע״א": "רבי עקיבא איגר",
  "פמ״ג": "פרי מגדים",
  "ב״י": "בית יוסף",
  "באר היטב": "באר היטב",
  "רמ״א": "רבי משה איסרליש",
  "שו״ע": "שולחן ערוך",
  "מ״ב": "משנה ברורה",
  "בה״ל": "ביאור הלכה",
  "ט״ז": "טורי זהב",
  "ש״ך": "שפתי כהן",
  "רשב״א": "רבי שלמה בן אדרת",
  "רמב״ן": "רבי משה בן נחמן",
  "רמב״ם": "רבי משה בן מימון",
  "ר״ן": "רבינו נסים",
  "רא״ש": "רבינו אשר",
  "רי״ף": "רבי יצחק אלפסי",
  "גר״א": "הגאון רבי אליהו מווילנא",
  "מהרי״ו": "מהרי״ו",
  "ע״ש": "עיין שם",
  "עיי״ש": "עיין שם",
  "כנ״ל": "כנזכר לעיל",
  "כמש״כ": "כמו שכתב",
  "כמ״ש": "כמו שכתב",
  "וכו׳": "וכולי",
  "אע״פ": "אף על פי",
  "אע״ג": "אף על גב",
  "מ״מ": "מכל מקום",
  "ע״י": "על ידי",
  "מד״ת": "מדאורייתא",
  "דאו׳": "דאורייתא",
  "דאורייתא": "Torah-level",
  "דרבנן": "rabbinic",
  "מדרבנן": "rabbinic",
  "ז״ל": "זכרונו לברכה",
  "זצ״ל": "זכר צדיק לברכה",
  "שליט״א": "שיחיה לאורך ימים טובים אמן",
  "נ״ל": "נראה לי",
  "צ״ל": "צריך לומר",
  "ר״ל": "רוצה לומר",
  "דהיינו": "that is",
  "ה״ה": "הוא הדין",
  "קיי״ל": "קיימא לן",
  "קי״ל": "קיימא לן"
}
```

---

## 4. Source Name Map

This should be separate from the general acronym map because source names often need consistent display formatting.

```json
{
  "טור": "Tur",
  "בית יוסף": "Beit Yosef",
  "ב״י": "Beit Yosef",
  "מחבר": "Mechaber",
  "רמ״א": "Rama",
  "מגן אברהם": "Magen Avraham",
  "מ״א": "Magen Avraham",
  "ט״ז": "Taz",
  "ש״ך": "Shach",
  "משנה ברורה": "Mishnah Berurah",
  "מ״ב": "Mishnah Berurah",
  "ביאור הלכה": "Biur Halacha",
  "בה״ל": "Biur Halacha",
  "שולחן ערוך כפשוטו": "Shulchan Aruch K'pshuto",
  "רשב״א": "Rashba",
  "רמב״ן": "Ramban",
  "רמב״ם": "Rambam",
  "ר״ן": "Ran",
  "רא״ש": "Rosh",
  "רי״ף": "Rif",
  "גר״א": "Gra",
  "רע״א": "Rabbi Akiva Eiger",
  "פרי מגדים": "Pri Megadim",
  "פמ״ג": "Pri Megadim",
  "ערוך השולחן": "Aruch HaShulchan",
  "כף החיים": "Kaf HaChaim",
  "חיי אדם": "Chayei Adam"
}
```

---

## 5. Halachic Glossary

These terms should be protected before translation. The system should either keep the transliterated phrase or translate it consistently.

```json
{
  "מבשל": "one who cooks",
  "בשבת": "on Shabbos",
  "במזיד": "intentionally",
  "בשוגג": "unintentionally",
  "אסור לו לעולם": "it is forbidden to him forever",
  "מותר למוצאי שבת מיד": "it is permitted immediately after Shabbos",
  "בכדי שיעשו": "the amount of time needed for it to be done",
  "מעשה שבת": "benefit from melacha done on Shabbos",
  "מלאכה": "melacha",
  "אבות מלאכה": "primary categories of melacha",
  "תולדות האור": "derivatives of fire",
  "תולדות חמה": "derivatives of the sun",
  "חמה עצמה": "the sun itself",
  "יד סולדת בו": "yad soledet bo, a temperature at which the hand recoils",
  "מאכל בן דרוסאי": "maachal ben Drusai, the level of food that is minimally edible",
  "מצטמק ויפה לו": "further cooking improves it",
  "מצטמק ורע לו": "further cooking worsens it",
  "כלי ראשון": "kli rishon",
  "כלי שני": "kli sheni",
  "כלי שלישי": "kli shelishi",
  "עירוי מכלי ראשון": "pouring from a kli rishon",
  "עירוי מכלי שני": "pouring from a kli sheni",
  "חולה שיש בו סכנה": "a dangerously ill person",
  "חולה שאין בו סכנה": "a sick person whose life is not in danger",
  "פיקוח נפש": "pikuach nefesh",
  "מוקצה": "muktzeh",
  "מוקצה מחמת איסור": "muktzeh because of a prohibition",
  "מחובר": "attached to the ground",
  "תולש": "detaching from the ground",
  "בישולי עכו״ם": "bishul akum",
  "אמירה לנכרי": "asking a non-Jew to perform melacha",
  "הנאה": "benefit",
  "מותר": "permitted",
  "אסור": "forbidden",
  "חייב": "liable",
  "פטור": "exempt",
  "לכתחילה": "lechatchilah",
  "בדיעבד": "bedieved",
  "מן התורה": "Torah-level",
  "מדרבנן": "rabbinic"
}
```

---

## 6. Gematria and Hebrew Number Parsing

The system should parse Hebrew letter references into numbers.

### Letter Values

```json
{
  "א": 1,
  "ב": 2,
  "ג": 3,
  "ד": 4,
  "ה": 5,
  "ו": 6,
  "ז": 7,
  "ח": 8,
  "ט": 9,
  "י": 10,
  "כ": 20,
  "ך": 20,
  "ל": 30,
  "מ": 40,
  "ם": 40,
  "נ": 50,
  "ן": 50,
  "ס": 60,
  "ע": 70,
  "פ": 80,
  "ף": 80,
  "צ": 90,
  "ץ": 90,
  "ק": 100,
  "ר": 200,
  "ש": 300,
  "ת": 400
}
```

### Examples

```text
ט״ו → 15
ט״ז → 16
כ׳ → 20
ס״ז → 67
ש״ז → 307
שי״ח → 318
רנ״ז → 257
שכ״ו → 326
```

### Special Handling

Avoid naive parsing for sacred names and phrases.

For example:

```text
י״ה
```

Should not necessarily be parsed as 15 unless context indicates that it is a reference number.

Recommended context-aware parsing:

```text
סי׳ ש״ז → siman 307
סימן שי״ח → siman 318
סעיף כ׳ → seif 20
ס״ק יו״ד → seif katan 10
דף ט״ו ע״א → daf 15a
דף ט״ו ע״ב → daf 15b
```

---

## 7. Reference Normalization

Convert Hebrew rabbinic references into stable English references.

### Examples

```text
סי׳ ש״ז סעיף כ׳
→ Orach Chaim 307:20
```

```text
יו״ד סי׳ ס״ז ס״ב
→ Yoreh Deah 67:2
```

```text
חולין דף ט״ו ע״א
→ Chullin 15a
```

```text
ביצה דף ל״ז ע״ב
→ Beitzah 37b
```

```text
סי׳ רנ״ז ס״ג
→ Orach Chaim 257:3
```

### Tractate Map

```json
{
  "ברכות": "Berachot",
  "שבת": "Shabbos",
  "עירובין": "Eruvin",
  "פסחים": "Pesachim",
  "ביצה": "Beitzah",
  "ראש השנה": "Rosh Hashanah",
  "יומא": "Yoma",
  "סוכה": "Sukkah",
  "מגילה": "Megillah",
  "חגיגה": "Chagigah",
  "יבמות": "Yevamot",
  "כתובות": "Ketubot",
  "נדרים": "Nedarim",
  "נזיר": "Nazir",
  "סוטה": "Sotah",
  "גיטין": "Gittin",
  "קידושין": "Kiddushin",
  "בבא קמא": "Bava Kamma",
  "ב״ק": "Bava Kamma",
  "בבא מציעא": "Bava Metzia",
  "ב״מ": "Bava Metzia",
  "בבא בתרא": "Bava Batra",
  "ב״ב": "Bava Batra",
  "סנהדרין": "Sanhedrin",
  "מכות": "Makkot",
  "שבועות": "Shevuot",
  "עבודה זרה": "Avodah Zarah",
  "ע״ז": "Avodah Zarah",
  "הוריות": "Horayot",
  "זבחים": "Zevachim",
  "מנחות": "Menachot",
  "חולין": "Chullin",
  "בכורות": "Bekhorot",
  "ערכין": "Arakhin",
  "תמורה": "Temurah",
  "כריתות": "Keritot",
  "מעילה": "Meilah",
  "תמיד": "Tamid",
  "מידות": "Middot",
  "קינים": "Kinnim",
  "נדה": "Niddah"
}
```

---

## 8. OCR Cleanup Rules

Before translation, normalize common OCR problems.

### Replace broken quote styles

```text
״  → standard Hebrew gershayim
׳  → standard Hebrew geresh
'' → ״ when inside Hebrew abbreviation
'  → ׳ when inside Hebrew abbreviation
```

### Remove isolated OCR fragments

Examples to flag:

```text
20
12
77
LT
ACM
DSL
DMSH
A.A.
C. S.
```

These often represent corrupted gematria, source references, or OCR artifacts.

Do not delete automatically unless confidence is high. Prefer flagging them for review.

### Normalize spacing

```text
ְּבַׁשָּבת
```

Should remain Hebrew text, but spacing around it should be cleaned when OCR inserted broken spaces.

### Preserve original Hebrew

For serious halachic work, store both:

```json
{
  "originalHebrew": "...",
  "normalizedHebrew": "...",
  "expandedHebrew": "...",
  "englishTranslation": "...",
  "reviewFlags": []
}
```

---

## 9. Translation Prompt Template

Use a strict prompt rather than a generic translation request.

```text
You are translating halachic Hebrew and rabbinic Hebrew into clear English.

Rules:
1. Do not paraphrase unless needed for clarity.
2. Preserve halachic terms where appropriate, such as kli rishon, kli sheni, yad soledet bo, muktzeh, maachal ben Drusai.
3. Expand rabbinic abbreviations according to the provided dictionary.
4. Convert Hebrew gematria references into normal numeric references.
5. Do not translate source names literally.
6. Do not invent citations.
7. If a phrase is unclear because of OCR corruption, mark it as [unclear] rather than guessing.
8. Keep the structure of the original text.
9. Translate technical halachic language precisely.
10. Avoid machine-like phrases such as "the hand is scalded in it," "the sign," or "must be struck with mutiny."

Input:
{{expandedHebrew}}

Glossary:
{{halachicGlossary}}

Output format:
{
  "translation": "...",
  "unclearPhrases": [],
  "resolvedReferences": [],
  "notes": []
}
```

---

## 10. Post-Processing Rules

After translation, scan for known failure phrases.

### Replace or flag

```json
{
  "sign": "siman",
  "chapter": "siman, when referring to Shulchan Aruch",
  "the hand is scalded in it": "yad soledet bo, a temperature at which the hand recoils",
  "the amount it was": "its previous state",
  "spurring": "rabbinic",
  "must be struck with a mutiny": "is subject to rabbinic lashes",
  "religious interpretation": "[review OCR]",
  "assistants": "[review source phrase]",
  "palm in his eyes": "[review OCR]",
  "The sick person on the Sabbath": "[review syntax]"
}
```

---

## 11. Example Corrections

### Example 1

Bad machine output:

```text
sign 77 section 20
```

Corrected:

```text
siman 307, seif 20
```

Reason:

```text
ש״ז = 307
כ׳ = 20
```

### Example 2

Bad machine output:

```text
if there was a Motzei Shabbos 19 it is forbidden to dain Shabbos prepare LT
```

Likely correction:

```text
If Motzei Shabbos is Yom Tov, it is forbidden, because Shabbos may not prepare for Yom Tov.
```

Reason:

```text
מו״ש = מוצאי שבת
י״ט = יום טוב
אין שבת מכין ליום טוב = Shabbos may not prepare for Yom Tov
```

### Example 3

Bad machine output:

```text
the hand is scalded in it
```

Corrected:

```text
yad soledet bo, a temperature at which the hand recoils from it
```

Reason:

```text
יד סולדת בו is a halachic temperature category, not a regular phrase.
```

### Example 4

Bad machine output:

```text
must be struck with a mutiny
```

Corrected:

```text
he is subject to makkat mardut, rabbinic lashes
```

Reason:

```text
מכת מרדות means rabbinic lashes, not rebellion or mutiny.
```

---

## 12. Suggested TypeScript Gematria Function

```ts
const gematriaMap: Record<string, number> = {
  "א": 1,
  "ב": 2,
  "ג": 3,
  "ד": 4,
  "ה": 5,
  "ו": 6,
  "ז": 7,
  "ח": 8,
  "ט": 9,
  "י": 10,
  "כ": 20,
  "ך": 20,
  "ל": 30,
  "מ": 40,
  "ם": 40,
  "נ": 50,
  "ן": 50,
  "ס": 60,
  "ע": 70,
  "פ": 80,
  "ף": 80,
  "צ": 90,
  "ץ": 90,
  "ק": 100,
  "ר": 200,
  "ש": 300,
  "ת": 400
};

export function parseHebrewNumber(input: string): number {
  const cleaned = input
    .replace(/[״"׳']/g, "")
    .replace(/\s/g, "");

  let total = 0;

  for (const char of cleaned) {
    const value = gematriaMap[char];
    if (!value) {
      throw new Error(`Invalid Hebrew numeral character: ${char}`);
    }
    total += value;
  }

  return total;
}
```

---

## 13. Suggested Reference Resolver Pseudocode

```ts
function resolveReferences(text: string): string {
  return text
    .replace(/סי[׳']?\s+([א-ת״׳"]+)/g, (_, siman) => {
      return `siman ${parseHebrewNumber(siman)}`;
    })
    .replace(/סעיף\s+([א-ת״׳"]+)/g, (_, seif) => {
      return `seif ${parseHebrewNumber(seif)}`;
    })
    .replace(/ס״ק\s+([א-ת״׳"]+)/g, (_, sk) => {
      return `seif katan ${parseHebrewNumber(sk)}`;
    })
    .replace(/דף\s+([א-ת״׳"]+)\s+ע״א/g, (_, daf) => {
      return `daf ${parseHebrewNumber(daf)}a`;
    })
    .replace(/דף\s+([א-ת״׳"]+)\s+ע״ב/g, (_, daf) => {
      return `daf ${parseHebrewNumber(daf)}b`;
    });
}
```

---

## 14. Validation Strategy

Each processed section should output review metadata.

```json
{
  "source": "Magen Avraham",
  "originalHebrew": "...",
  "expandedHebrew": "...",
  "resolvedReferences": [
    {
      "original": "סי׳ ש״ז סעיף כ׳",
      "resolved": "Orach Chaim 307:20"
    }
  ],
  "translation": "...",
  "reviewFlags": [
    "Unresolved abbreviation: דמ״ש",
    "Possible OCR artifact: 20",
    "Ambiguous source reference: פ״ק"
  ]
}
```

---

## 15. MVP Build Plan

### Phase 1

- Build gematria parser
- Build acronym expander
- Build source name normalizer
- Build halachic glossary matcher
- Process one siman manually

### Phase 2

- Add reference resolver
- Add review flags
- Add structured JSON output
- Add batch processing for docx or text files

### Phase 3

- Add LLM translation step
- Add Sefaria reference validation where possible
- Add side-by-side Hebrew and English output
- Add confidence scoring

---

## 16. Recommended Output Format

For each source paragraph:

```json
{
  "section": "Orach Chaim 318:1",
  "source": "Magen Avraham",
  "hebrewOriginal": "...",
  "hebrewExpanded": "...",
  "englishClean": "...",
  "references": [],
  "flags": []
}
```

For human review, also generate Markdown:

```md
## Orach Chaim 318:1

### Magen Avraham

#### Hebrew Original

...

#### Expanded Hebrew

...

#### English Translation

...

#### Review Flags

...
```

---

## 17. Core Principle

Do not treat this as translation alone.

Treat it as:

```text
Halachic text normalization
+ rabbinic abbreviation expansion
+ gematria reference parsing
+ source recognition
+ glossary-protected translation
+ review flagging
```

This is the difference between a broken machine translation and a usable bulk translation system.
