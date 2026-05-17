# Halachic Translation Pipeline, Living Cursor Guide

Last updated: 2026-05-03

This is the living project guide for translating halachic Hebrew texts into usable English with Cursor, Claude, OpenAI, or another LLM.

The goal is not normal translation. The goal is a repeatable workflow that can:

1. Clean OCR and formatting problems
2. Expand rosh teivot
3. Parse gematria references
4. Preserve halachic terminology
5. Detect broken machine translation
6. Force retranslation from Hebrew when needed
7. Update itself after each validation cycle

---

## 1. Core Rule

The Hebrew source is authoritative.

The generated English is disposable.

If English is broken, do not patch it from English. Return to the Hebrew and retranslate.

```text
Bad English
→ locate original Hebrew
→ normalize Hebrew
→ expand abbreviations
→ resolve references
→ translate from Hebrew
→ validate again
```

---

## 2. Required Pipeline

Every paragraph should move through this flow:

```text
Raw Hebrew
→ OCR cleanup
→ Hebrew normalization
→ rosh teivot expansion
→ source name recognition
→ gematria parsing
→ reference normalization
→ halachic glossary protection
→ LLM translation
→ validation scan
→ keep, review, or force retranslation
→ final Markdown / DOCX output
```

Suggested project structure:

```text
halacha-text-tools/
  data/
    acronyms.json
    sourceNames.json
    halachicGlossary.json
    validationMarkers.json
    tractates.json
    claudeContext.md
  src/
    normalizeHebrew.ts
    expandAcronyms.ts
    parseGematria.ts
    resolveReferences.ts
    applyGlossary.ts
    translateParagraph.ts
    validateTranslation.ts
    forceRetranslation.ts
    postProcessEnglish.ts
```

---

## 3. Validation Statuses

### CLEAN

The paragraph has no known failure markers and reads naturally.

Action:

```text
Keep.
```

### REVIEW_REQUIRED

The paragraph contains a soft warning or terminology issue.

Action:

```text
Review against Hebrew.
If the problem is only terminology, use glossary correction.
If the syntax is broken, force retranslation from Hebrew.
```

### RETRANSLATE_FROM_HEBREW_REQUIRED

The paragraph contains nonsense, OCR corruption, or known machine translation failure markers.

Action:

```text
Discard the English.
Retranslate from the Hebrew.
Do not patch the English.
```

---

## 4. Current OC318 Validation Summary

Current validation run:

```text
Total paragraphs scanned: 443
Clean: 443
Review required: 0
Retranslate from Hebrew required: 0
```

Important lesson:

```text
RETRANSLATE_FROM_HEBREW_REQUIRED means exactly that.
The English should be discarded and regenerated from Hebrew.
```

Latest gate (`validate:oc318:strict`): all paragraphs clean after vocabulary fixes, manual retranslations (V2/V3), and soft-marker cleanup (V4).

**Scanner-clean is not context-clean.** A paragraph can pass strict marker validation and still be wrong, awkward, or misleading relative to the Hebrew above it.

---

## 4a. Mandatory context-audit pass (after marker scan)

For every siman (and for OC318 in `data/oc318.full.json`), after the marker scanner and `validate:oc318:strict` report clean, run a **second gate: context-audit**. This pass is **not** a bulk retranslation pipeline; it is a human-style review comparing **each English paragraph to the Hebrew paragraph immediately above it** in the same source block.

**Preserve:** all Hebrew exactly; source order and structure; Hebrew first, English directly below; no summarizing, no added commentary, no removal of source material. If English is contextually weak or wrong, **replace the full English paragraph** from the Hebrew (do not merely polish wrong meaning).

**Priority sources:** Tur, Taz, Biur Halacha, Shulchan Aruch K'pshuto (and Mechaber/Rama where garbled).

**Context-audit checklist (all should pass before the siman is “done”):**

1. No scanner / machine markers (same as strict scan).
2. No obvious English nonsense or broken fragments.
3. No English that contradicts the halachic context of the Hebrew.
4. No raw acronym transliteration left unexplained in English where it reads as junk (e.g. orphaned “TIA,” “M. B.” chains).
5. Prefer **siman** over “chapter” when citing Orach Chayim (and similar) halachic locations.
6. No **method** where **view**, **opinion**, or **approach** is what the Hebrew **שיטה** means.
7. No **judges** or **arbitrators** where **poskim** or **halachic authorities** is meant (**פוסקים**).
8. Prefer **cooked** / **cooking** over narrow **boiled** when the Hebrew **בישול** intends the general melacha.
9. Watch for leftover machine phrases such as “dish dish,” “the cooked food” used as a calque in the wrong place.
10. No stutter fillers such as “the the the” or repeated garbage words.

Record in the siman’s work notes that **context-audit** completed after **strict** scan. Future simanim should treat this as a **required** step in the living pipeline, not optional polish.

---

## 5. Hard Failure Markers

If any of these appear in English, force retranslation from Hebrew.

```json
[
  "DSL",
  "DMSH",
  "ACM",
  "Dafilo",
  "Dahoi",
  "Dahui",
  "Daviza",
  "Dela",
  "Dahmir",
  "Shaduka",
  "shem delphi",
  "silent prayer",
  "PK",
  "PG",
  "S.D.",
  "KMSH",
  "BBI",
  "20 20",
  "20th century",
  "the opinion of the DSL column",
  "we do not recommend cooking in the 20th century",
  "with salt for the sake of sin",
  "if he cut a cow from the sick man",
  "a daishinin that may not multiply",
  "forbidden to cut it from the toldot of the light",
  "heated by light that you will be saved",
  "hot toldot",
  "from a designated place",
  "adds vanity",
  "the history of heat",
  "the religious interpretation",
  "palm in his eyes",
  "must be struck with a mutiny"
]
```

Action:

```text
RETRANSLATE_FROM_HEBREW_REQUIRED
```

---

## 6. Soft Failure Markers

These may sometimes be corrected by glossary, but often require review.

```json
[
  "the hand is scalded",
  "hand is scalded",
  "disgusted hand",
  "hand is disgusted",
  "if we catch a cold",
  "arbitrators",
  "Sunday",
  "(Yid)",
  "(Kid)",
  "(Lev)",
  "(Tu)",
  "(H)",
  "(J)",
  "section y",
  "chapter y",
  "the sign"
]
```

Default action:

```text
REVIEW_REQUIRED
```

Escalation rule:

```text
If the sentence is broken, force retranslation from Hebrew.
If the Hebrew phrase is clear, correct using the glossary.
```

---

## 7. Preferred Corrections

### יד סולדת בו

Bad:

```text
the hand is scalded
```

Correct:

```text
yad soledet bo, a temperature at which the hand recoils
```

### נצטנן

Bad:

```text
if we catch a cold
```

Correct:

```text
if it cooled
```

### פוסקים

Bad:

```text
arbitrators
```

Correct:

```text
poskim
```

### מוסיף הבל

Bad:

```text
adds vanity
```

Correct:

```text
adds heat
```

In the context of hatmanah:

```text
a substance that adds heat
```

### מכת מרדות

Bad:

```text
must be struck with a mutiny
```

Correct:

```text
he is subject to makkat mardut, rabbinic lashes
```

### דחיישינן שמא ירבה בשבילו

Bad:

```text
a daishinin that may not multiply
```

Correct:

```text
because we are concerned that he may add more for his sake
```

### ואם קצץ פירות מן המחובר לחולה בשבת

Bad:

```text
if he cut a cow from the sick man
```

Correct:

```text
If one cut fruit from something attached to the ground for a sick person on Shabbos
```

---

## 8. Rosh Teivot Map

Use this as the starting `acronyms.json`.

```json
{
  "מו״ש": "מוצאי שבת",
  "מוצ״ש": "מוצאי שבת",
  "עכו״ם": "עובד כוכבים ומזלות",
  "א״י": "אינו יהודי",
  "נכרי": "non-Jew",
  "גוי": "non-Jew",
  "י״ט": "יום טוב",
  "יו״ט": "יום טוב",
  "יו״ד": "יורה דעה",
  "או״ח": "אורח חיים",
  "אה״ע": "אבן העזר",
  "חו״מ": "חושן משפט",
  "ס״ק": "סעיף קטן",
  "סי׳": "סימן",
  "סע׳": "סעיף",
  "סעי׳": "סעיף",
  "ס״א": "סעיף א",
  "ס״ב": "סעיף ב",
  "ס״ג": "סעיף ג",
  "ס״ד": "סעיף ד",
  "מ״א": "מגן אברהם",
  "בה״ג": "בעל הלכות גדולות",
  "בעה״מ": "בעל המאור",
  "רע״א": "רבי עקיבא איגר",
  "פמ״ג": "פרי מגדים",
  "ב״י": "בית יוסף",
  "בה״ט": "באר היטב",
  "עבה״ט": "עיין באר היטב",
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
  "א״ח": "ארחות חיים",
  "ח״א": "חיי אדם",
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
  "דאורייתא": "Torah-level",
  "דרבנן": "rabbinic",
  "מדרבנן": "rabbinic",
  "נ״ל": "נראה לי",
  "צ״ל": "צריך לומר",
  "ר״ל": "רוצה לומר",
  "ה״ה": "הוא הדין",
  "קיי״ל": "קיימא לן",
  "קי״ל": "קיימא לן",
  "ואפ״ה": "ואפילו הכי",
  "אפ״ה": "אפילו הכי",
  "אפי׳": "אפילו",
  "עי׳": "עיין",
  "ועי׳": "ועיין",
  "ועמ״ש": "ועיין מה שכתבתי",
  "משא״כ": "מה שאין כן",
  "דבר שיל״מ": "דבר שיש לו מתירין",
  "מבע״י": "מבעוד יום",
  "מע״ש": "מערב שבת",
  "בע״ש": "בערב שבת"
}
```

---

## 9. Source Name Map

Use this as `sourceNames.json`.

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
  "חיי אדם": "Chayei Adam",
  "ארחות חיים": "Orchot Chaim",
  "בעל המאור": "Baal HaMaor",
  "בעל הלכות גדולות": "Baal Halachot Gedolot"
}
```

---

## 10. Halachic Glossary

Use this as `halachicGlossary.json`.

```json
{
  "מבשל": "one who cooks",
  "בשבת": "on Shabbos",
  "במזיד": "intentionally",
  "בשוגג": "unintentionally",
  "אסור לו לעולם": "it is forbidden to him forever",
  "מותר למוצאי שבת מיד": "it is permitted immediately after Shabbos",
  "בכדי שיעשו": "bichdei sheyeasu, the amount of time needed for it to be done",
  "מעשה שבת": "benefit from melacha done on Shabbos",
  "מלאכה": "melacha",
  "תולדות האור": "toldot ha'or, derivatives of fire",
  "תולדות חמה": "toldot chamah, derivatives of the sun",
  "חמה עצמה": "the sun itself",
  "יד סולדת בו": "yad soledet bo, a temperature at which the hand recoils",
  "אין יד סולדת בו": "not hot enough for yad soledet bo",
  "נצטנן": "cooled",
  "אם נצטנן": "if it cooled",
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
  "בישולי נכרים": "bishul akum",
  "אמירה לנכרי": "asking a non-Jew to perform melacha",
  "אמירה לגוי": "asking a non-Jew to perform melacha",
  "הנאה": "benefit",
  "מותר": "permitted",
  "אסור": "forbidden",
  "חייב": "liable",
  "פטור": "exempt",
  "לכתחילה": "lechatchilah",
  "בדיעבד": "bedieved",
  "מן התורה": "Torah-level",
  "מדרבנן": "rabbinic",
  "מוסיף הבל": "adds heat",
  "דבר המוסיף הבל": "a substance that adds heat",
  "מכת מרדות": "makkat mardut, rabbinic lashes"
}
```

---

## 11. Gematria Parsing

Use context-aware parsing only.

Letter values:

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

Examples:

```text
ט״ו → 15
ט״ז → 16
כ׳ → 20
ס״ז → 67
קי״ג → 113
רמ״ז → 247
ש״ז → 307
שי״ח → 318
רנ״ז → 257
שכ״ו → 326
```

Only parse when context indicates a reference:

```text
סי׳
סימן
סעיף
ס״ק
דף
ע״א
ע״ב
פ״ק
פ״ב
פ״ג
פ״ד
```

---

## 12. Reference Normalization

Examples:

```text
סי׳ ש״ז סעיף כ׳
→ Orach Chaim 307:20
```

```text
יו״ד סי׳ ס״ז ס״ב
→ Yoreh Deah 67:2
```

```text
יו״ד סי׳ קי״ג ס״ק יו״ד
→ Yoreh Deah 113, seif katan 10
```

```text
חולין דף ט״ו ע״א
→ Chullin 15a
```

```text
ביצה דף ל״ז ע״ב
→ Beitzah 37b
```

---

## 13. Anthropic / Claude Context Pack

There does not appear to be a special official Anthropic translation library that solves halachic translation directly.

Use Anthropic resources as context-engineering support, not as a replacement for the halachic pipeline.

Create this file:

```text
data/claudeContext.md
```

Suggested content:

```md
# Claude Context for Halachic Translation

You are translating rabbinic Hebrew and halachic Hebrew.

Use the provided dictionaries and glossary as binding context.

Do not rely on ordinary English translation if a phrase is technical halachic language.

Always prefer:
1. Hebrew source
2. Expanded Hebrew
3. Halachic glossary
4. Source map
5. Reference resolver
6. Fresh translation

Never rely on previous broken English.

When validation marks a paragraph as RETRANSLATE_FROM_HEBREW_REQUIRED, discard previous English entirely.

Use XML-style structure when sending context to Claude:

<context>
  <project>Halachic translation of Orach Chayyim and related sources</project>
  <rules>Use Hebrew source as authoritative</rules>
  <glossary>{{halachicGlossary}}</glossary>
  <acronyms>{{acronyms}}</acronyms>
  <source_names>{{sourceNames}}</source_names>
  <validation_markers>{{validationMarkers}}</validation_markers>
</context>

<task>
Translate the Hebrew paragraph into clear English for halachic study.
</task>

<input_hebrew>
{{hebrew}}
</input_hebrew>

<output_format>
{
  "translation": "...",
  "resolvedReferences": [],
  "unclearPhrases": [],
  "confidence": "high | medium | low",
  "needsHumanReview": true | false
}
</output_format>
```

Recommended Claude usage pattern:

```text
1. Keep the global guide small enough to include in every run.
2. Put large dictionaries in separate files.
3. Send only the relevant paragraph plus relevant matched glossary entries.
4. Use XML tags for structure.
5. Require JSON output.
6. Validate output afterward with code.
7. Never trust Claude alone to decide if the translation is clean.
```

---

## 14. Translation Prompt Template

```text
You are translating halachic Hebrew and rabbinic Hebrew into clear English.

Rules:
1. Translate only from the Hebrew.
2. Do not use previous broken English.
3. Preserve the sequence and structure.
4. Preserve source names using the source-name map.
5. Expand abbreviations using the acronym map.
6. Convert Hebrew gematria references into numeric references.
7. Use the halachic glossary for protected terms.
8. If the Hebrew is unclear because of OCR corruption, mark [unclear] and include the original Hebrew.
9. Never invent citations or sources.
10. Avoid known bad phrases such as "the hand is scalded," "if we catch a cold," "adds vanity," "arbitrators," "hot toldot," and "the history of heat."
11. Output clear English suitable for serious halachic study.

Input Hebrew:
{{expandedHebrew}}

Relevant glossary entries:
{{matchedGlossary}}

Output JSON:
{
  "translation": "...",
  "resolvedReferences": [],
  "unclearPhrases": [],
  "confidence": "high | medium | low",
  "needsHumanReview": true | false
}
```

---

## 15. Forced Retranslation Prompt

```text
The previous English translation was corrupted.

Do not use it.

Translate only from the Hebrew below.

First:
1. Normalize obvious OCR spacing issues.
2. Expand rabbinic abbreviations.
3. Resolve Hebrew numeric references.
4. Preserve source names.
5. Use the halachic glossary.
6. If something remains unclear, mark it as [unclear] and quote the Hebrew.

Reason for retranslation:
{{validationMarkers}}

Hebrew original:
{{originalHebrew}}

Expanded Hebrew:
{{expandedHebrew}}

Output JSON:
{
  "freshTranslation": "...",
  "resolvedReferences": [],
  "unclearPhrases": [],
  "confidence": "high | medium | low",
  "needsHumanReview": true | false
}
```

---

## 16. Validation Scanner Logic

```ts
type ValidationStatus =
  | "CLEAN"
  | "REVIEW_REQUIRED"
  | "RETRANSLATE_FROM_HEBREW_REQUIRED";

function validateTranslation(english: string): {
  status: ValidationStatus;
  markers: string[];
} {
  const hardMarkers = loadHardMarkers();
  const softMarkers = loadSoftMarkers();

  const foundHard = hardMarkers.filter(marker =>
    english.toLowerCase().includes(marker.toLowerCase())
  );

  if (foundHard.length > 0) {
    return {
      status: "RETRANSLATE_FROM_HEBREW_REQUIRED",
      markers: foundHard
    };
  }

  const foundSoft = softMarkers.filter(marker =>
    english.toLowerCase().includes(marker.toLowerCase())
  );

  if (foundSoft.length > 0) {
    return {
      status: "REVIEW_REQUIRED",
      markers: foundSoft
    };
  }

  return {
    status: "CLEAN",
    markers: []
  };
}
```

---

## 17. Continuous Update Policy

This guide must be updated after each validation run.

For every project or batch:

```text
1. Run translation.
2. Run validation.
3. Generate validation report.
4. Add new hard markers.
5. Add new soft markers.
6. Add new acronyms.
7. Add new source names.
8. Add new glossary terms.
9. Add example corrections.
10. Force retranslate failed paragraphs.
11. Validate again.
```

Do not wait until the full siman is complete. Update after each meaningful validation cycle.

---

## 18. Cursor Workflow

Recommended command flow:

```text
npm run translate -- input.json --out translated.md
npm run validate -- translated.md --out validation_report.md
npm run retranslate-failed -- validation_report.md --out translated_v2.md
npm run validate -- translated_v2.md --out validation_report_v2.md
```

Cursor should load this guide at the start of every run.

Cursor should treat this file as living project context.

---

## 19. Final Operating Rule

```text
When English looks wrong, return to the Hebrew.
When validation says retranslate, discard the English.
When a new failure appears, update this guide.
```
