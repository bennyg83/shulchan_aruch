# Editorial retranslation — Siman 84 (part 2/5)

Generated: 2026-06-12T13:02:16.849Z

**Mandatory dictionary:** `/workspace/full_dictionary (1).md` — consult for every term.

**Disregard existing English.** Translate fresh from Hebrew only. Edit **only** `**** ENGLISH ****`.

---

# YD001 editorial re-translation (Cursor / agent)

**Authoritative dictionary:** `full_dictionary (1).md` at the **repository root**.  
Consult it for every halachic term, abbreviation, and commentator name.

**Source of truth:** `newtry/YD_001/output/siman_NNN/<commentary>/part-*.txt`.  
**Commentary order:** `translation/COMMENTARIES.md`.

**Core rule:** Hebrew is authoritative. Translate fresh from Hebrew; do not patch bad English in place.

---

## YD-specific terminology (examples)

Use the dictionary; these recur in Yoreh De'ah:

- **issur** / **heter** — forbidden / permitted (not generic "prohibited" if dictionary says issur)
- **vadai** / **safek** — definite / doubtful
- **ta'am** / **noten ta'am** — taste / imparting taste (basar b'chalav, ta'aruvos)
- **nevelah**, **treifah**, **shechitah**, **melichah**, **nikkur**
- **Shach** → Siftei Kohen; **Taz** → Turei Zahav (slug folders `siftei-kohen`, `turei-zahav`)

---

## Translation rules (every block)

Same as OC: completeness, no additions, dictionary halachic terms, expand abbreviations, `{Rama: …}` for הגה, full Aramaic, logical connectives per dictionary Part 5.

---

## File format

```
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 2
marker: א
**** HEBREW ****
[Hebrew — may contain HTML]
**** ENGLISH ****
[REPLACE THIS ONLY]
**** END BLOCK ****
```

---

## Per-file workflow

1. Read `output/siman_NNN/<slug>/part-*.txt`.
2. Translate each block from Hebrew.
3. `npm run apply:dictionary -- --root output/siman_NNN`
4. `npm run pipeline:validate -- --root output/siman_NNN`

---

## Pilot scope (Phase C)

Simanim **1–5** first, then stress simanim **87** (melicha) and **115** (basar b'chalav) per `YD_YOREH_DEAH_PLAN.md`.


---

## Blocks in this batch (45 of 270 remaining in scope)

### 1. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: א
**** HEBREW ****
<b>שאינם נובעים. </b>שם מה הפרט כו':
**** ENGLISH ****
They do not come. What the individual is like:
**** END BLOCK ****
```

### 2. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ב`

- Quality: **warn** — hebrew_in_english
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ב
**** HEBREW ****
<b>לפיכך כו'. </b>שם:
**** ENGLISH ****
לפיכך כו'. שם:
**** END BLOCK ****
```

### 3. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ג
**** HEBREW ****
<b>אבל אסור כו'. </b>כמש"ש וליחוש דלמא פריש כו' אלא כו' משא"כ כה"ג דלאו היינו רביתיה וז"ש שם שוחה ושותה דוקא:
**** ENGLISH ****
But not so. As a result of Hashem’s presence, Hashem’s promise to Abraham and his wife, is the same as Hashem’s people
**** END BLOCK ****
```

### 4. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ד
**** HEBREW ****
<b>כגון לאחורי כו'. </b>דדמי לגג תמרה וגרעניתה שתוך החור הוא כתוך הכלי. ת"ה:
**** ENGLISH ****
Like the back of the qua. Imagine the roof of Tamara and the tyrant that in the hole is in the tool.  ת:
**** END BLOCK ****
```

### 5. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ה`

- Quality: **warn** — html_entity_leak, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ה
**** HEBREW ****
<b>ומסתמא כו'. </b>דאל"כ הדק"ל דלמא פריש:
**** ENGLISH ****
And it's called &quot;. Dr. Dalma:
**** END BLOCK ****
```

### 6. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ו`

- Quality: **warn** — hebrew_in_english
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ו
**** HEBREW ****
<b>אבל אם כו'. </b>גמ' הנ"ל:
**** ENGLISH ****
אבל אם כו'. גמ' הit appears to me:
**** END BLOCK ****
```

### 7. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 10 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=10#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 10
marker: _
**** HEBREW ****
<b>(ליקוט) ירקות כו' </b>אבל כו'. עסי' ק' ס"ד מש"ש (ע"כ):
**** ENGLISH ****
(Luke) vegetables, but k. סי . . . . .
**** END BLOCK ****
```

### 8. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 12 — marker `א`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=12#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 12
marker: א
**** HEBREW ****
<b>(ליקוט) מרקחת כו'. </b>דלא כתר"י שכ' בספ"ו דברכות שאיסור שנפל לדבש מותר והרא"ש תמה מנין לו ונראה שלמד מדבש עצמו שרגלי דבורים מעורבים בו אבל תוס' בע"ז ס"ט א' ד"ה ההוא תי' ע"ש וכן כל הפוסקים חולקין עליו וכן השיגו המ"א ממ"ש בבכורות ו' ב' וחלב דבהמה טהורה כו' ובתמורה ל"א א' אבל גבי ביצה אימת כו' אבל בלא"ה לא וע"ש סי' רי"ו ס"ק ג' שהאריך בזה <small>(ועמש"ש בליקוט שאשתמיטתיה דברי הר"ן) </small>(ע"כ):
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 05 MINUTES 22 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 9. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 12 — marker `ב`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=12#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 12
marker: ב
**** HEBREW ****
<b>שהדבש כו'. </b>כמ"ש בפ"א דב"ב <small>(ג' ב'):</small>
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 02 MINUTES 03 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 10. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 13 — marker `_`

- Quality: **warn** — hebrew_in_english
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=13#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 13
marker: _
**** HEBREW ****
<b>דבש כו'. </b>עט"ז וש"ך:
**** ENGLISH ****
honey כו'. עט"ז וש"ך:
**** END BLOCK ****
```

### 11. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 14 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=14#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 14
marker: _
**** HEBREW ****
<b>חטים כו'. </b>ע"ש ושם: <br><b>(ליקוט) חטים כו'. </b>ירושלמי ספ"ה דתרומות על מתני' וטחנן כו' ואם ידוע כו' ובפ"א דערלה על מתני' רי"א כו'. תני אף טוחן בתחלה ומתיר מתני' דר"י דרי"א אף יתכוין וילקוט ויעלה באחד ומאתים אר"ז ד"ה היא שכן דרך כהנים להיות טוחנין מדומע בתוך בתיהן כו' והביא הר"ש בתרומות שם (ע"כ):
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 58 MINUTES 44 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 12. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 15 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=15#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 15
marker: _
**** HEBREW ****
<b>מיני כו'. </b>כמו שבעיקרי זיתים כו': <br><b>(ליקוט) מיני כו'. </b>ומרדכי כתב ר"פ העור והרוטב סי' תתרנ"א עופות הגדלים באילן י"א שא"צ שחיטה לפי שאין פרין ורבין ואור"י ששמע מאביו שר"ת הצריכן שחיטה וכן א"ל ר' יהודה הלכה למעשה שיש לשוחטן וראיה ממש"ש קכ"ז א' או כלך לדרך כו' אלמא בכלל שאר שרצים הוא ה"ג כו' אבל בשחיטה לכ"ע מותר כיון די"ל סימני טהרה וכ"פ ביש"ש שם (ע"כ):
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 55 MINUTES 26 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 13. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 16 — marker `א`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=16#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 16
marker: א
**** HEBREW ****
<b>בדגים. </b>עתוס' ד"ה קוקייאני וכן פי' הגאונים וכ"כ ברוב ספרים להדיא מינם ניים כוורא כו'. ב"י:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 52 MINUTES 07 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 14. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 16 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=16#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 16
marker: ב
**** HEBREW ****
<b>ואפילו כו'. </b>כמ"ש למטה בהג"ה:
**** ENGLISH ****
And even if, etc. — Avodah Zarah; Torat Kohanim parashat Shemini; "I only know one that increases scales and fins" — even one fin and one scale; Rebbe Yishmael: two scales.
**** END BLOCK ****
```

### 15. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 16 — marker `ג`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=16#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 16
marker: ג
**** HEBREW ****
<b>והא כו'. </b>כמ"ש בגמ' הכי השתא כו':
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 48 MINUTES 48 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 16. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 16 — marker `ד`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=16#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 16
marker: ד
**** HEBREW ****
<b>לדעת המתירים כו'. </b>ר"ל לאפוקי י"א דס"ד:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 45 MINUTES 30 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 17. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 16 — marker `ה`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=16#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 16
marker: ה
**** HEBREW ****
<b>נוהגים כו'. </b>כנ"ל דהיינו דביתייהו ול"ד לפי' לגג תמרה דאין דרכה להיות שם ולמד מהגדלים במים שבכלים ובורות:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 42 MINUTES 12 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 18. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 16 — marker `ו`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=16#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 16
marker: ו
**** HEBREW ****
<b>יש מתירין כו'. </b>דדוקא בגידולי קרקע אף בתלוש אית כהו משום שרץ השורץ על הארץ משא"כ באינו ג"ק דלית בהו אלא משום אבר מן החי בנמצאים בבהמה בחייה כנ"ל. מרדכי בשם ראבי"ה:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 38 MINUTES 53 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 19. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 17 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=17#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 17
marker: _
**** HEBREW ****
<b>שרץ שרוף כו'. </b>כמ"ש בסוף תמורה ופ"ב דפסחים כל הנשרפין אפרן מותר ואפי' באכילה. מרדכי רפ"ב דפסחים: <br><b>(ליקוט) שרץ שרוף כו'. </b>כמ"ש בפ"ב דפסחים (כ"ד ב') כל איסורין כו' וכ"ש אוכל חלב חי שפטור ופטור ומותר קאמר דלאו מפטורי שבת הוא דפטור אבל אסור ובפ' מי שאחזו <small>(ס"ט ב') </small>לטחול לייתי שב ביני דמיא כו'. מרדכי רפ"ב דפסחים וכתב שם ומיהו בריא יזהר בדבר וז"ש לרפואה אבל הרא"ש שם לא כ"כ אף שלדינא אינן מחולקין אלא שכתב מדקאמר אין לוקין משמע הא איסורא איכא אבל לרפואה מותר כמ"ש שם <small>(כ"ה ב') </small>ברבינא דשייף לברתיה כו' א"ר הכי קא"ל כו' אלמא אע"פ שאין בו סכנה מותר וע"ל ס"ס קנ"ה וכ"ש כה"ג באכילה כמ"ש שם וכ"ש אוכל חלב חי כו' וכ"כ תוס' בע"ז י"ב ב' בד"ה אלא כו' דאיסורא איכא וכ"כ רמב"ן וריב"ש רש"פ וע"ל ס"ס קנ"ה בהג"ה שכתב חוץ מבעצי ע"א ולפי הטעם שכ' דמותר משום דאפרן מותר וכ"כ במרדכי שם ניחא אבל לפי הנ"ל צ"ל דבע"א אסור אפי' שלא כדרך הנאתן כמו בב"ח דלא כתיב אכילה ובתוס' דע"ז שם נסתפקו אבל ליה פשיטא כשיטתו שכתב שם דאפרן מותר משום שהוא שלא כדרך הנאתן וכ' בכלאים ובב"ח אסור ע"ש <small>(וע"ל סי' קנ"ה ס"ק כ"ב) </small>(ע"כ):
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 35 MINUTES 34 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 32 MINUTES 15 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 28 MINUTES 55 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 20. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: _
**** HEBREW ****
<b>הגדלים כו'. </b>עבה"ג ולכן פריך ואיפוך אנא וז"ש עצורין ככלים. תוס' ד"ה במים:
**** ENGLISH ****
Growing up as well. It is therefore a blessing and a blessing of Hashem’s mercy, and that Hashem’s Word is the same. A.D. in Water:
**** END BLOCK ****
```

### 21. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: א
**** HEBREW ****
<b>או שאר כו'. </b>שם שיכרא:
**** ENGLISH ****
Or the rest of the cell. A name that will be known:
**** END BLOCK ****
```

### 22. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: ב
**** HEBREW ****
<b>שדרך כו' </b>רש"י ד"ה שיכרא:
**** ENGLISH ****
The way of the Lord’s Prayer is:
**** END BLOCK ****
```

### 23. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `ג`

- Quality: **warn** — hebrew_in_english
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: ג
**** HEBREW ****
<b>אין כו'. </b>גמ' שם:
**** ENGLISH ****
אין כו'. גמ' שם:
**** END BLOCK ****
```

### 24. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: ד
**** HEBREW ****
<b>אבל כו'. </b>וז"ש בצבייתא:
**** ENGLISH ****
But yes. And then, in the place:
**** END BLOCK ****
```

### 25. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `ה`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: ה
**** HEBREW ****
<b>וכן מותר כו'. </b>מדלא אסרו אלא לסנן. ור"ל דכלי שני דין כלי ראשון לו דאל"כ ליחוש דלמא פריש. ועד"מ:
**** ENGLISH ****
And yes, they are allowed. Madam was banned but to filter. And the Lord has given him a first sentence to him, and he has a sense of guilt. to the UN:
**** END BLOCK ****
```

### 26. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: _
**** HEBREW ****
<b>ויש אוסרים אם כו'. </b>כמש"ש וליחוש דלמא כו' וסברא ראשונה ס"ל כמו דאין חוששין שם דלמא פריש לאחורי הכלי כמש"ל בס"א. ועש"ך:
**** ENGLISH ****
And some forbid, etc. — since lying together presumably salted together initially. (Lekut) Therefore one may buy, etc. — Avodah Zarah 39 untrodden; not concerned they were salted with impure — salted pure and impure forbidden (Chullin 113a); we do not establish prohibition where common — here we are concerned; except rabbinic doubt — Ran; and some forbid, etc. — Ran: we do not establish prohibition; and even in other fish, etc. (end).
**** END BLOCK ****
```

### 27. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `א`

- Quality: **error** — literal_bow_swim, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: א
**** HEBREW ****
<b>תולעים כו' </b>וה"ה כו'. דבהן פי' לדופני הכלי מבפנים אסור כמו פי' מקצתן לאויר העולם דדוקא במים אתרבאי מכל אשר במים ששוחה כו' וא"כ חיישינן שמא פירשו כמש"ש דלמא כו':
**** ENGLISH ****
The worms are called and the “Soon.” Dovn P. for the inside of the vessel is not like a little of them in the air of the world, which is concentrated in the water that swims in the sea, and that of them, it is not possible that it is interpreted as a radar
**** END BLOCK ****
```

### 28. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ב`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ב
**** HEBREW ****
<b>ואסור למכרו כו'. </b>כמ"ש בפ"ב דפסחים <small>(מ' ב'):</small>
**** ENGLISH ****
They are not allowed to be sold. As a result of Hashem’s Word:
**** END BLOCK ****
```

### 29. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: א
**** HEBREW ****
<b>תולעים כו'. </b>כשמואל דר"פ שם נ"ח ס"ל כוותיה ועתוס' שם ד"ה דיקא כו':
**** ENGLISH ****
The worms are called. When Hashem’s Word is called “The Lord’s Prayer” and Hashem’s Word:
**** END BLOCK ****
```

### 30. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `ב`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: ב
**** HEBREW ****
<b>והוא כו'. </b>דהא בעינן השורץ. שם: <br><b>(ליקוט) והוא שריחש כו'. </b>אבל בת"ה פ' ב' פליג ע"ז וכתב דהא לשמואל הוא כמו הגדל על הארץ וז"ש קישות שהתליע סתם כו' וז"ש בהג"ה ופעמים כו' (ע"כ):
**** ENGLISH ****
And he's called. Dea in the horn. There is a name, and he whispers. But Hashem’s Word is like Hashem’s Word, and Hashem’s Word is like Hashem’s Word and Hashem’s Word
**** END BLOCK ****
```

### 31. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: ג
**** HEBREW ****
<b>אבל הנמצאים כו'. </b>כמו קישות כו'. שם:
**** ENGLISH ****
But they’re just there. Just like a quaint. Name:
**** END BLOCK ****
```

### 32. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `ד`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: ד
**** HEBREW ****
<b>תולעים הגדלים כו'. </b>כמ"ש בברכות מ' ב' נדרים נ"ה ב' מירבא רבו כו':
**** ENGLISH ****
The worms that grow up. As a result of Hashem’s Word, Hashem’s promise to Abraham:
**** END BLOCK ****
```

### 33. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `ה`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: ה
**** HEBREW ****
<b>ופעמים כו'. </b>כ"כ הרשב"א וס"ל דלא בעינן ריחש כמ"ש בסי' ער"ה דלא כדעת תוס' ורא"ש וש"ע:
**** ENGLISH ****
And sometimes so.” And the Lord’s Prayer and the Holy One, which is the same as Hashem’s Word and His Word
**** END BLOCK ****
```

### 34. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `ו`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: ו
**** HEBREW ****
<b>שמתחיל כו'. </b>כמו ביצה שנמצא דם בחלמון שאסור כאלו כבר נתרקמה וכן עכבר שחציו בשר הנונע בבשר טמא וכ"ש לענין איסור כמ"ש בפ"א די"ט <small>(ז' א') </small>אפושי כו'. שם:
**** ENGLISH ****
Starting as a. As an egg that is found in blood in the ovum that is no longer circumcised and a mouse whose flesh is pumped in unclean flesh and as “for the purpose of prohibiting the prohibition as a “absolute” in the P.A. (J.A.). Name:
**** END BLOCK ****
```

### 35. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `_`

- Quality: **error** — mt_garbage, html_entity_leak
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: _
**** HEBREW ****
<b>(ליקוט) פרי כו'. </b>ערש"י נ"ח ב' ד"ה הני כו' ומשמע דוקא שהתליעו אבל מסתמא אין חוששין ול"ג דא"כ הל"ל הני פירי כו' ומ"ש תמרי דנקט ועוד הא סתמא קאמר הני תמרי דכדא אלא משום דהתלעה מצויה בהן ואע"פ שהוא מיעוט דלמיעוט המצוי חוששין כמו בבדיקת הריאה וז"ש בס"ח כל כו'. ת"ה פ' ב' ועבס"ח בהג"ה דהוי כו' (ע"כ):
**** ENGLISH ****
(Luke) Perry. Hashem’s Word says, “I am not afraid of Hashem’s people, and I am not afraid of Hashem’s people, and I am not afraid of them, but because of Hashem’s mercy, and that Hashem’s Word is the same as Hashem’s people.” &quot;And thou, Capernaum.&quot;
**** END BLOCK ****
```

### 36. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `א`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: א
**** HEBREW ****
<b>כל כו' </b>מתוכו. דא"צ פירש:
**** ENGLISH ****
כל כו' מתetc.. דא"צ separated:
**** END BLOCK ****
```

### 37. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ב
**** HEBREW ****
<b>(ליקוט) ואם שהה כו' </b>ואף כו'. אבל לאכלן בלא בישול מותר ולא חיישינן שמא פירשו וחזרו לחורן שזה אינו מצוי וכמש"ש ס"ז א' א"ה במנא כו' ואי איתא ליחוש שמא פירש אדופנא מאבראי וחזר אלא דאין חוששין שיפרוש ממקום רביתיה ויחזור. ת"ה (ע"כ):
**** ENGLISH ****
And if he was a quaint and even a quaint. But without cooking, it is not possible to make sure that it is not broken and returned to the garden that it is not found and that it is not served as a chair, but is not afraid that it will be removed from its place of reproduction and return. (a)
**** END BLOCK ****
```

### 38. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ג
**** HEBREW ****
<b>ומ"מ צריך כו'. </b>כ"ז לשון הרא"ש וטור:
**** ENGLISH ****
And from above, we need to be. It is called the Qur’an:
**** END BLOCK ****
```

### 39. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ד`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ד
**** HEBREW ****
<b>בחוץ. </b>כיון שפירש:
**** ENGLISH ****
בחוץ. כיון שseparated:
**** END BLOCK ****
```

### 40. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ה`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ה
**** HEBREW ****
<b>או כו'. </b>בעיא שם כנ"ל:
**** ENGLISH ****
או כו'. בעיא שם כit appears to me:
**** END BLOCK ****
```

### 41. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ו`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ו
**** HEBREW ****
<b>וירחשו. </b>אזיל לשיטתו כנ"ל ס"ו:
**** ENGLISH ****
and run away. The same is the case:
**** END BLOCK ****
```

### 42. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ז`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ז
**** HEBREW ****
<b>או בדופני. </b>כנ"ל ס"ה:
**** ENGLISH ****
או בדופני. כit appears to me seif 5:
**** END BLOCK ****
```

### 43. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ח`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%97`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ח
**** HEBREW ****
<b>המתולעים כו'. </b>אבל בתוך יב"ח לא מהני דב' רחשים הן אחד קטן הגדל במחובר וא' גדול הגדל בתלוש ונוקב ויורד והמנוקבים עולין למעלה משא"כ אותו שגדל במחובר שאינו נוקב. ת"ה. ועוד דאין כולם עולין למעלה וז"ש ואח"כ יתנם בקדירה כו' וזה לא מהני בתוך יב"ח דא"צ פירש וכמ"ש הרשב"א בחידושיו דאין עולין למעלה אלא המוכנים לפרוש. ורותחים לבד לא מהני דשמא יצאו מיד מחיים אבל עכשיו אותן שלא עלו למעלה לא יפרשו מיד כנ"ל:
**** ENGLISH ****
The worms are so. But in the midst of Hashem’s Word, not from the wicked, they are one of the little ones growing up in a large hole and a great Hashem growing up in a rod and snail and down and the snails above the burden that grew up in a non-sterious hole. . . And yet, all of them have been cursed above and above, and this is not what I am in the High Court of Justice and the High Court of Israel, but is ready to step down. But now those who have not been raised above will not be interpreted as immediately:
**** END BLOCK ****
```

### 44. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ט`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%98`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ט
**** HEBREW ****
<b>ולא מהני כו'. </b>כמש"ל ר"ס ל"ט:
**** ENGLISH ****
Not from me as a. As the R&amp;D:
**** END BLOCK ****
```

### 45. `siman_084/beur-hagra/part-001.txt` — beur-hagra — seif 9 — marker `א`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 9
marker: א
**** HEBREW ****
<b>עבר ובישל כו'. </b>כמו <small>(חולין ט' ה') </small>בא זאב ונטל בני מעיה ועוד דס"ס הוא שמא לא היה ושמא נימוח ובטילה וע"ל סי' ק"א ס"ו:
**** ENGLISH ****
It's past and in turn. As the Lord came to the wolf and the burden of the sons of her intestine, and he was not, and that he was not, nor was he, and that he was a snail and a snail and a snail and a snail and a snail and a snail
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_084
npm run pipeline:editorial:advance -- --siman 84
```

## Checkpoint ids

siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%90
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%91
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%92
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%93
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%94
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%95
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=10#marker=_
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=12#marker=%D7%90
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=12#marker=%D7%91
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=13#marker=_
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=14#marker=_
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=15#marker=_
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=16#marker=%D7%90
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=16#marker=%D7%91
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=16#marker=%D7%92
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=16#marker=%D7%93
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=16#marker=%D7%94
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=16#marker=%D7%95
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=17#marker=_
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=_
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%90
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%91
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%92
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%93
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%94
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=_
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%90
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%91
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%90
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%91
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%92
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%93
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%94
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%95
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=_
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%90
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%91
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%92
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%93
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%94
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%95
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%96
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%97
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%98
siman_084/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=%D7%90