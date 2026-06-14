# Editorial retranslation — Siman 108 (part 2/5)

Generated: 2026-06-13T19:16:51.952Z

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

## Blocks in this batch (35 of 173 remaining in scope)

### 1. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ה
**** HEBREW ****
<b>וה"ה כו'. </b>כמ"ש שם תני רב כהנא כו':
**** ENGLISH ****
and the same applies etc.. כwhat he wrote שם תני רב כהנא etc.:
**** END BLOCK ****
```

### 2. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ו`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ו
**** HEBREW ****
<b>ונוהגין כו'. </b>כ"פ או"ה וס"ל דמ"ש תוספות לחלק בין תנור גדול לקטן היינו בדיעבד לרב אבל לדידן דקי"ל כלוי אין נ"מ בזה אבל כל הפוסקים כתבו כמ"ש בש"ע ועב"י סי' צ"ז:
**** ENGLISH ****
ונוהגין etc.. כ"פ Issur VeHeter וס"ל דwhat he wrote תוספות לdisagreed בין oven גדול לקטן that is b'dieved according to Rav אבל for us דwe establish כלוי אין נ"מ בזה אבל כל הposkim כתבו כwhat he wrote בש"ע ועben yomo סי' צ"ז:
**** END BLOCK ****
```

### 3. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ז`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ז
**** HEBREW ****
<b>ואם אפה כו'. </b>כנ"ל מהא דתני רב כהנא ועבד רבא כו':
**** ENGLISH ****
ואם אפה etc.. כit appears to me מהא דתני רב כהנא ועבד רבא etc.:
**** END BLOCK ****
```

### 4. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ח`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%97`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ח
**** HEBREW ****
<b>וכן אם כו'. </b>דמה שהתיר לוי בשל ישראל דהוי דיעבד:
**** ENGLISH ****
וכן אם etc.. דמה שהתיר לוי בשל ישראל דהוי דיעבד:
**** END BLOCK ****
```

### 5. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ט`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%98`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ט
**** HEBREW ****
<b>מותר בשניהם. </b>ר"ל אפילו בבב"ח שלא כדעת הרי"ף שכתב עוד טעם אחר על הא דרב כהנא משום דכיון דאפשר לאכלו בלא כותח הוי דשיל"מ ואפילו באלף לא בטיל ובכה"ג מודה לוי וכשיטתו שכתב דרב דאוסר אזיל לטעמיה דס"ל מין במינו במשהו ולהכי לא קי"ל כרב דקי"ל בששים אבל בכה"ג מודה לרב. אבל הקשו עליו דכה"ג לא מקרי דשיל"מ כמ"ש ביבמות פ"ב א' ועוד דדשיל"מ בשא"מ בטיל ועוד דא"כ דגים שעלו בקערה למה מותר ועוד דהא אף בפ"ע מתיר דבא בבת תיהא ואף שי"ל כל הקושיות ב' קושיות הראשונות עבר"ן פ"ו דנררים <small>(נ"ב א') </small>ומדגים אין קושיא דשם אף משהו ליכא ומבת תיהא לא קשיא כמ"ש בש"ד כנ"ל מ"מ העיקר כתירוץ הראשון של הרי"ף כנ"ל אבל בעיקר דינא השיג בד"מ ובת"ח דהא שמן ודבש של עובדי כוכבים מותר לכתחלה לקנותם משום נטל"פ כמ"ש בפ"ב דע"ז ולא אמרינן שהוא לכתחלה וגם מה שהתיר הרב גם בבב"ח צ"ע כיון דאפשר לאכלו בלא חלב הוי לכתחלה כמ"ש הרי"ף וכ"פ הרמב"ם בפ"מ דאסור ולא חילק אף שפסק כלוי בפט"ו וכן בגמ' סתמו אסור לאכלו בכותח:
**** ENGLISH ****
permitted בboth of them. ר"ל אפילו בבב"ח שלא כדעת הרי"ף שwrote עוד טעם אחר על הא דרב כהנא becauseכיון דאפשר to eat them without kutach הוי something that has a permitted aspect ואפילו באלף לא nullified ובsuch a case מודה לוי וכשיטתו שwrote דרב דאוסר אזיל לטעמיה דס"ל species in its species במשהו ולהכי לא we establish כרב דwe establish בsixty אבל בsuch a case מודה according to Rav. אבל הקשו עליו דsuch a case לא מקרי something that has a permitted aspect כwhat he wrote ביבמות chapter 2 א' ועוד דsomething that has a permitted aspect not in its kind nullified ועוד דif so fish שcame up בbowl למה permitted ועוד דהא even בפ"ע מתיר דבא בבת תיהא וeven שי"ל כל הקושיות ב' קושיות הראשונות he transgressed"ן chapter 6 דנררים (נ"ב א') ומfish אין קושיא דשם even משהו there is not ומבת תיהא לא קשיא כwhat he wrote בש"ד כit appears to me nevertheless העיקר כתירוץ הראשון של הרי"ף כit appears to me אבל בעיקר the halachah challenged בד"מ וTurei Chayim דהא שמן וhoney של gentiles permitted לat first לקנותם because nat bar lichtmile כwhat he wrote בchapter 2 דע"ז ולא אמרינן שהוא לat first וגם מה שהתיר הרב גם בבב"ח requires study כיון דאפשר to eat them without חלב הוי לat first כwhat he wrote הרי"ף וכ"פ Rambam בפ"מ דforbidden ולא חילק even שruled כלוי בפט"ו וכן בגמ' סתמו forbidden to eat them בkutach:
**** END BLOCK ****
```

### 6. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `י`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%99`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: י
**** HEBREW ****
<b>י"א דאין כו'. </b>דדמי לפת חמה וחבית פתוחה דאסור כמ"ש בס"ד דאף לוי מודה <small>(וע"ל ס"ק ל'):</small>
**** ENGLISH ****
י"א דאין etc.. דדמי לפת חמה וחבית פתוחה דforbidden כwhat he wrote in seif 4 דeven לוי מודה (וע"ל s.k. ל'):
**** END BLOCK ****
```

### 7. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `כ`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%9B`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: כ
**** HEBREW ****
<b>ובמקום כו'. </b>כסברת כל הפוסקים שחולקים עליו:
**** ENGLISH ****
ובמקום etc.. כסברת כל הposkim שdisagreesים עליו:
**** END BLOCK ****
```

### 8. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ל`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%9C`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ל
**** HEBREW ****
<b>ואם האיסור כו'. </b>בזה מתורץ דר"ל ל"פ אלוי ורבא דלא כרי"ף ורמב"ם וכמ"ש תוס' בע"ז שם דבפת חמה וחבית פתוחה אף רבא מודה וכמ"ש הטוש"ע בס"ד:
**** ENGLISH ****
ואם האיסור etc.. בזה מתורץ דר"ל ל"פ אלוי ורבא דלא כרי"ף ורמב"ם וכwhat he wrote Tosafot בע"ז שם דבפת חמה וחבית פתוחה even רבא מודה וכwhat he wrote הטוש"ע in seif 4:
**** END BLOCK ****
```

### 9. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `מ`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%9E`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: מ
**** HEBREW ****
<b>וכ"ש אם כו'. </b>עסי' קכ"ב ס"ג בהג"ה י"א דבדברים כו' אבל כו': <br><b>(ליקוט) וכ"ש אם כו'. </b>כן למד מדברי או"ה כמ"ש בסי' קכ"ב ס"ג בהג"ה אבל אם כו' ודבריו תמוהין מהא דפ"י דתרומות חסית כו' וע"כ צריך לחלק בין בעין ובין איסור הבלוע ועמ"ש שם (ע"כ):
**** ENGLISH ****
וkli sheni אם etc.. עסי' קכ"ב seif 3 בהג"ה י"א דבדברים etc. אבל etc.: (ליקוט) וkli sheni אם etc.. כן למד מדברי Issur VeHeter כwhat he wrote בסי' קכ"ב seif 3 בהג"ה אבל אם etc. ודבריו תמוהין מהא דפ"י דתרומות חסית etc. וuntil here צריך לdisagreed בין visible ובין איסור הabsorbed ועwhat he wrote שם (until here):
**** END BLOCK ****
```

### 10. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `נ`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A0`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: נ
**** HEBREW ****
<b>אבל אם א' כו'. </b>כנ"ל בש"ע וכמו פת חמה וחבית מכוסה: <br><b>(ליקוט) אבל אם א' מהם כו'. </b>מהבית סתומה דמותר אף בפת חמה ואף לר' יוסי אין אסור אלא בשעורים שהם שואבות אבל בלא"ה כמו בחטים מותר וכן קי"ל בס"ד (ע"כ):
**** ENGLISH ****
אבל אם א' etc.. כit appears to me בש"ע וכמו פת חמה וחבית מכוסה: (ליקוט) אבל אם one of them etc.. מהבית סתומה דpermitted even בפת חמה וeven לר' יוסי אין forbidden אלא בשskinים שהם שואבות אבל without"ה כמו בחטים permitted וכן we establish in seif 4 (until here):
**** END BLOCK ****
```

### 11. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ס`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A1`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ס
**** HEBREW ****
<b>אם אפו או כו'. </b>כ"כ באו"ה והוא אזיל לשיטתו דאפילו בתנור סתום אוסר בדיעבד משום דהוי כי הבית פתוחה ופת חמה וכ"כ ש"ד בשם ראב"ן וז"ש מגולין כנ"ל אבל מדברי תוס' בע"ז שם משמע דדוקא לרב שכתבו ולענין ריחא דהתם כו' ה"מ כו' וה"ה כו' וז"ש לעיל ובמקום הפסד כו' ואעפ"כ לא רצה להקל כאן:
**** ENGLISH ****
אם אפו או etc.. כ"כ בIssur VeHeter והוא אזיל לשיטתו דאפילו בoven סתום אוסר b'dieved becauseהוי כי הבית פתוחה ופת חמה and so too ש"ד in name of ראב"ן וז"ש מגולין כit appears to me אבל מדברי Tosafot בע"ז שם it appears דspecifically according to Rav שכתבו וregarding ריחא דהתם etc. ה"מ etc. and the same applies etc. וז"ש above ובמקום הפסד etc. ואעפ"כ לא רצה to be lenient כאן:
**** END BLOCK ****
```

### 12. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ע`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A2`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ע
**** HEBREW ****
<b>וה"ה אם כו'. </b>שדין א' להם כנ"ל:
**** ENGLISH ****
and the same applies אם etc.. שדין א' להם כit appears to me:
**** END BLOCK ****
```

### 13. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `פ`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A4`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: פ
**** HEBREW ****
<b>אבל בזא"ז כו'. </b>כמ"ש בע"ז שם שאני התם דמקליא כו' ואע"ג שנשאר הריח בתנור ואף אביי מודה:
**** ENGLISH ****
אבל בזOr Zarua etc.. כwhat he wrote בע"ז שם this case is different התם דמקליא etc. וeven though שנשאר הריח בoven וeven אביי מודה:
**** END BLOCK ****
```

### 14. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `צ`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A6`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: צ
**** HEBREW ****
<b>אא"כ כו'. </b>כנ"ל מהא דמכשירין:
**** ENGLISH ****
אif so etc.. כit appears to me מהא דמכשירין:
**** END BLOCK ****
```

### 15. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ק`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A7`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ק
**** HEBREW ****
<b>ולצורך הפסד כו'. </b>אבל בלא"ה צריך בכל חתיכה ס' דלא ידעינן לאיזה צד הלך הריח אלא כיון דהכל בספק כולם מצטרפין כמ"ש בסי' קי"א ס"ז והרב הולך לשטתו שכתב שם ג"כ ולצורך הפסד ואע"ג שכ' שם ומיהו אין לאכלו כו' בריחא יש להקל כמ"ש באו"ה:
**** ENGLISH ****
ולצורך הפסד etc.. אבל without"ה צריך בכל חתיכה sixty דלא ידעינן לאיזה צד הלך הריח אלא כיון דהכל בdoubt כולם מצטרפין כwhat he wrote בסי' קי"א s.k. 7 והרב הולך לשטתו שwrote שם ג"כ ולצורך הפסד וeven though שwrote שם ומיהו אין to eat them etc. בריחא יש to be lenient כwhat he wrote בIssur VeHeter:
**** END BLOCK ****
```

### 16. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ר`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A8`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ר
**** HEBREW ****
<b>י"א דאיסור כו'. </b>כ"כ תוס' בע"ז שם וכ"ד הרי"ף שכתב דלכך לא קי"ל כרב לפי דאזיל לטעמיה כנ"ל וכן הא דאסרו למיכל בכותחא משום דהוי דשיל"מ: <br><b>(ליקוט) י"א דאיסור האוסר כו' </b>פלוגתא זו תליא בפלוגתא דרי"ף ותוס' דרי"ף מביא ראיה דהלכה כלוי מהא דע"ז בבת תיהא ושם איתא לאיסורא בעינא ואפ"ה מותר כ"ש בתערובת כיון דבעיניה לא אסור כלל וכמו שהקשה הר"ן על הרי"ף בפ' ג"ה על מ"ש דרב אזיל לטעמיה כו' וכן כותחא דאסור משום דדשיל"מ הוא ע"ש אבל לתוס' דס"ל דלא תליא בהא דע"ז דאף למ"ד לאו מילתא היא שם אסור דבעיניה הוא ורבא דמתיר משום דמזיק וכמ"ש תוס' שם ד"ה אביי וד"ה רבא ע"ש ולהכי אסרי תוס' בזילוף שם ולדברי רי"ף היה מותר אבל לפי' אסור משום דנהנה וכן בתערובת ובזה תליא פלוגתא אם הלכה כרב או כלוי וכן ההיא דס"ד אתיא כתוס' אבל לרי"ף ליתא דר"ל כלל ואפילו בחבית פתוחה ופת חמה מותר דלאו מילתא היא ואפילו בעיניה מותר וכמ"ש הרי"ף שם וכ"פ הרמב"ם וגם מ"ש בס"ה בהג"ה ואסור לזלוף כו' כנ"ל ומ"ש בס"ו שק כו' ועבה"ג שם ולכאורה תמוה דא"כ גם באכילה יהא מותר ועוד מה בכך שאינו מכוין פסיק רישא הוא ועתוס' בפ' כ"ש כ"ה ב' ד"ה לא אפשר כו' ומיירי כו' אלא דרשב"א אזיל לשיטתו שכתב בהא דס"ז בשמים כו' דאסור ומחלק בין וורד והדם דעיקרו לריח דאסור משא"כ ביין דאין עיקרו לריח להכי לאו מילתא וכשיטת הרי"ף דמדמי להא דפ' כ"צ דשם ג"כ הבשר עיקרו לאו לריח אבל תוס' לא ס"ל האי חילוק אלא בבת תיהא משום דמזיקו וכמ"ש תוס' שם ושם י"ב ב' ד"ה אלא כו' וכמ"ש בס"ז ולפ"ז אסור כאן (ע"כ):
**** ENGLISH ****
י"א דאיסור etc.. כ"כ Tosafot בע"ז שם וso too הרי"ף שwrote דלכך לא we establish כרב לפי דאזיל לטעמיה כit appears to me וכן הא דאסרו למיכל בkutachא becauseהוי something that has a permitted aspect: (ליקוט) י"א דאיסור האוסר etc. פלוגתא זו תליא בפלוגתא דרי"ף וTosafot דרי"ף brings proof דthe halachah כלוי מהא דע"ז בבת תיהא ושם איתא לאיסורא בעינא וeven so permitted kli sheni בתערובת כיון דבעיניה לא forbidden כלל וכמו שchallenged Ran על הרי"ף בפ' ג"ה על what he wrote דרב אזיל לטעמיה etc. וכן kutachא דforbidden becausesomething that has a permitted aspect הוא see there אבל לTosafot דס"ל דלא תליא בהא דע"ז דeven למ"ד לאו מילתא היא שם forbidden דבעיניה הוא ורבא דמתיר becauseמזיק וכwhat he wrote Tosafot שם s.v. אביי וs.v. רבא see there ולהכי אסרי Tosafot בזילוף שם ולדברי רי"ף היה permitted אבל לפי' forbidden becauseנהנה וכן בתערובת ובזה תליא פלוגתא אם the halachah כרב או כלוי וכן ההיא דס"ד אתיא כTosafot אבל לרי"ף ליתא דר"ל כלל ואפילו בחבית פתוחה ופת חמה permitted דלאו מילתא היא ואפילו בעיניה permitted וכwhat he wrote הרי"ף שם וכ"פ Rambam וגם what he wrote בseif 5 בהג"ה וforbidden לזלוף etc. כit appears to me וwhat he wrote בס"ו שק etc. ועבה"ג שם וit appears תמוה דif so גם באכילה יהא permitted ועוד מה בכך שאינו מכוין פסיק רישא הוא ועTosafot בפ' kli sheni כ"ה ב' s.v. לא אפשר etc. וdeals with etc. אלא דרשב"א אזיל לשיטתו שwrote בהא דs.k. 7 בשמים etc. דforbidden ומdisagreed בין וורד והblood דעיקרו לריח דforbidden משif so ביין דאין עיקרו לריח להכי לאו מילתא וכשיטת הרי"ף דמדמי להא דפ' כ"צ דשם ג"כ הmeat עיקרו לאו לריח אבל Tosafot לא ס"ל האי חילוק אלא בבת תיהא becauseמזיקו וכwhat he wrote Tosafot שם ושם י"ב ב' s.v. אלא etc. וכwhat he wrote בs.k. 7 וaccordingly forbidden כאן (until here):
**** END BLOCK ****
```

### 17. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ש`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A9`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ש
**** HEBREW ****
<b>אם כו'. </b>דלא כתוס' שם ועש"ך:
**** ENGLISH ****
אם etc.. דלא כTosafot שם ועש"ך:
**** END BLOCK ****
```

### 18. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ת`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%AA`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ת
**** HEBREW ****
<b>וי"א כו'. </b>וראייתו מלחמי תודה שהיו כולן נאפות בתנור אחד דלא מצינו נאפות בפ"ע אלא שתי הלחם ולחם הפנים כמ"ש ברפי"א דמנחות וס"ל דאין לחלק בין תנור גדול לקמן דאל"כ הא מחזיק עשרים עשרונים היה וגם לפי מ"ש הרשב"א דפלוגתייהו דוקא בא' מהן שמן כמ"ש בגמ' וכ"כ תוס' שם ד"ה נימא אין ראיה משם. ונ"ל ראיה מדפריך שם לרב מאין צולין כו' דלמא רב לא אסר אלא מין במינו וגדי וטלה מץ בשא"מ הוא כמ"ש ב"י סי' צ"ח בשם האגור אלאע"כ דאין חילוק וז"ש שם מ"ל גדי וגדי ומ"ל כו' ודלא כרי"ף וכן דקאמר שם לרב נימא כו' הא בכה"ג אף רב מורה וכן בע"ז פריך מכמון של תרומה ומדפריך בפשיטות ש"מ דאין לחלק:
**** ENGLISH ****
וי"א etc.. וראייתו saltמי תודה שהיו כולן נאפות בoven אחד דלא מצינו נאפות בפ"ע אלא שתי הלחם ולחם הפנים כwhat he wrote ברפי"א דמנחות וס"ל דאין לdisagreed בין oven גדול below דאל"כ הא מחזיק עשרים עשרונים היה וגם לפי what he wrote Rashba דפלוגתייהו specifically בא' מהן שמן כwhat he wrote בגמ' and so too Tosafot שם s.v. נימא אין proof משם. וit appears to me proof מדfruitך שם according to Rav מאין צולין etc. דלמא רב לא אסר אלא species in its species וגדי וטלה מץ not in its kind הוא כwhat he wrote ben yomo siman 98 in name of האגור אלאuntil here דאין חילוק וז"ש שם מ"ל גדי וגדי ומ"ל etc. ודלא כרי"ף וכן דקאמר שם according to Rav נימא etc. הא בsuch a case even רב teacher וכן בע"ז fruitך מכמון של תרומה ומדfruitך בפשיטות ש"מ דאין לdisagreed:
**** END BLOCK ****
```

### 19. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: א
**** HEBREW ****
<b>בד"א כו'. </b>כמ"ש בפסחים שם הב"ע כגון כו' ולא פריך אלא דהא אסור לצלות פסח בקדירה. ועבה"ג:
**** ENGLISH ****
בד"א etc.. כwhat he wrote בפסחים שם הב"ע כגון etc. ולא fruitך אלא דהא forbidden לצלות פסח בקדירה. ועבה"ג:
**** END BLOCK ****
```

### 20. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: ב
**** HEBREW ****
<b>ודוקא כו'. </b>דבכה"ג בצלי מותר בדיעבד דבכה"ג פליגי רב ולוי ובכה"ג הוא דקאמר דבקדרות מותר וע"ל ס"א י"א דאין מתירין כו' ונ"מ דכאן מותר לכתחלה:
**** ENGLISH ****
investigateא etc.. דבsuch a case בצלי permitted b'dieved דבsuch a case פליגי רב ולוי ובsuch a case הוא דקאמר דבקדרות permitted וע"ל ס"א י"א דאין מתירין etc. ונ"מ דכאן permitted לat first:
**** END BLOCK ****
```

### 21. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: ג
**** HEBREW ****
<b>ובמקום כו'. </b>כמ"ש בס"א בצלי ג"כ ובמקום כו':
**** ENGLISH ****
ובמקום etc.. כwhat he wrote בס"א בצלי ג"כ ובמקום etc.:
**** END BLOCK ****
```

### 22. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `א`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: א
**** HEBREW ****
<b>משום דא"א כו'. </b>ר"ל אע"ג דבסוף ע"ז אוסרין לכתחלה כאן הוי בדיעבד משום כו'. תוס' בע"ז שם:
**** ENGLISH ****
becauseא"א etc.. ר"ל even though דat the end ע"ז אוסרין לat first כאן הוי b'dieved because etc.. Tosafot בע"ז שם:
**** END BLOCK ****
```

### 23. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: ב
**** HEBREW ****
<b>כ"ז כו' </b>כמ"ש בסוף ע"ז דברים שנשתמש כו' ועבא"ח סי' תנ"א סי"ט:
**** ENGLISH ****
כ"ז etc. כwhat he wrote at the end ע"ז דברים שused etc. ועOrach Chaim סי' תנ"א סי"ט:
**** END BLOCK ****
```

### 24. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: ג
**** HEBREW ****
<b>ולא כו'. </b>דלא מהני אלא לדבר שתשמישו בעירוי דאינו בלוע אלא כ"ק ועבא"ח שם סי"ז בהג"ה ולקמן סי' קכ"א ס"ב בהג"ה:
**** ENGLISH ****
ולא etc.. דלא מהני אלא לדבר שits use בpouring דאינו absorbed אלא כ"ק ועOrach Chaim שם סי"ז בהג"ה וbelow סי' קכ"א ס"ב בהג"ה:
**** END BLOCK ****
```

### 25. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: א
**** HEBREW ****
<b>פת כו'. </b>דלוי ורבא ל"פ עליה דר"ל ועתוס' בע"ז שם והשתא הוי טובא גווני כו' ול"ק ללוי ודאי תנאי אלא בפת צוננת או חבית סתומה. אבל בת"ה ק"ה ב' כ' דרבא פליג עליה ע"ש:
**** ENGLISH ****
פת etc.. דלוי ורבא ל"פ עליה דר"ל ועTosafot בע"ז שם וnow הוי טובא גווני etc. ול"ק ללוי certainly תנאי אלא בפת צוננת או חבית סתומה. אבל בת"ה ק"ה ב' wrote דרבא פליג עליה see there:
**** END BLOCK ****
```

### 26. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ב
**** HEBREW ****
<b>ודוקא אם כו'. </b>ר"ל שאין מקום לריח היין לצאת אלא נגד הפת ולכן אוסר בתנור סתום מכל צד ומדמי לכאן ע"ש:
**** ENGLISH ****
investigateא אם etc.. ר"ל שאין מקום לריח היין לצאת אלא נגד הפת ולכן אוסר בoven סתום מכל צד ומדמי לכאן see there:
**** END BLOCK ****
```

### 27. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: א
**** HEBREW ****
<b>מותר כו'. </b>כפי' הערוך וש"פ דמיירי בפיו: <br><b>(ליקוט) מותר לשאוף בפיו. </b>ר"ח וערוך ובזה מתורץ קושית תוס' י"ב ב' ד"ה אלא הקשה כו' דבפיו ודאי לאו מילתא היא. ר"נ (ע"כ):
**** ENGLISH ****
permitted etc.. כפי' הערוך וש"פ דdeals with בפיו: (ליקוט) permitted לשאוף בפיו. ר"ח וערוך ובזה מתורץ קושית Tosafot י"ב ב' s.v. אלא challenged etc. דבפיו certainly לאו מילתא היא. ר"נ (until here):
**** END BLOCK ****
```

### 28. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ב
**** HEBREW ****
<b>אבל אסור כו'. </b>דע"כ לא שרי רבא אלא משום דריחא לאו מילתא משא"כ בטעימה וכמ"ש בפ' ג"ה <small>(צ"ז א') </small>בשלמא תרומה טעים כו' מאן טעים ליה ולא אמרו ברפ"ב דברכות <small>(י"ד א') </small>אלא משום דאכילה ושתיה קביל עליה דבקבלתו תליא ולכן כי' תוס' שם דדוקא בתענית יחיד:
**** ENGLISH ****
אבל forbidden etc.. דuntil here לא שרי רבא אלא becauseריחא לאו מילתא משif so בטעימה וכwhat he wrote בפ' ג"ה (צ"ז א') בשלמא תרומה טעים etc. מאן טעים ליה ולא אמרו ברchapter 2 דברכות (י"ד א') אלא becauseאכילה ושתיה קביל עליה דבקבלתו תליא ולכן כי' Tosafot שם דspecifically בתענית יחיד:
**** END BLOCK ****
```

### 29. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ג
**** HEBREW ****
<b>ואסור כו'. </b>דהנאה הוא כמ"ש בספ"ק דפסחים שותין מלוג בסלע ומזלפין כו'. ול"ד לבת תיהא דשם לא נהנה שחוזק היין נכנס בחוזק ומזיק משא"כ כאן דמתפזר:
**** ENGLISH ****
וforbidden etc.. דהנאה הוא כwhat he wrote בסfirst chapter דפסחים שותין מלוג בסלע ומזלפין etc.. וsome say לבת תיהא דשם לא נהנה שחוזק היין נכנס בחוזק ומזיק משif so כאן דמתפזר:
**** END BLOCK ****
```

### 30. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ד
**** HEBREW ****
<b>אבל מותר כו'. </b>ולא חשיב כשותה כמ"ש אביי בבת תיהא דא"א לומר משום הנאה דא"כ מאי פריך מתרומה הא מותר בהנאה שאינה של כילוי שאינה אלא ריחא כמ"ש בפ"ב דפסחים <small>(כ"ג א') </small>והרי תרומה כו' אבל בזילוף לא מדמתירין בספ"א דפסחים לזלף תרומה ממאה. תוס' בע"ז שם ד"ה אביי כו' והג"א שם ד"ה ומיהו כו':
**** ENGLISH ****
אבל permitted etc.. ולא חשיב כשותה כwhat he wrote אביי בבת תיהא דא"א לומר because הנאה דif so מאי fruitך מתרומה הא permitted in benefit שאינה של כילוי שאינה אלא ריחא כwhat he wrote בchapter 2 דפסחים (כ"ג א') והרי תרומה etc. אבל בזילוף לא מדמתירין בסone time דפסחים לזלף תרומה ממאה. Tosafot בע"ז שם s.v. אביי etc. והג"א שם s.v. ומיהו etc.:
**** END BLOCK ****
```

### 31. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ה
**** HEBREW ****
<b>דמותר בהנאה. </b>ע"ל ר"ס קכ"ג <small>(ע"ל סי' קנ"ה ס"ק כ'):</small>
**** ENGLISH ****
דpermitted in benefit. ע"ל ר"ס קכ"ג (ע"ל סי' קנ"ה s.k. כ'):
**** END BLOCK ****
```

### 32. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `_`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: _
**** HEBREW ****
<b>אבל לבשמים כו'. </b>משום הקריבהו נא כמ"ש בפ"ו דב"ב <small>(צ"ז ב'): </small><br><b>(ליקוט) אבל לבשמים כו'. </b>דבעיא שם <small>(בע"ז) </small>א' המשתחוה לדקל כו' אליבא דרבנן כו' אע"ג דמותר מעולם להדיוט (ע"כ):
**** ENGLISH ****
אבל לבשמים etc.. because הקריבהו נא כwhat he wrote בchapter 6 דב"ב (צ"ז ב'): (ליקוט) אבל לבשמים etc.. דבעיא שם (בע"ז) א' המשתחוה לדקל etc. according to d'rabbanan etc. even though דpermitted מעולם להדיוט (until here):
**** END BLOCK ****
```

### 33. `siman_108/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: _
**** HEBREW ****
<b>בשמים כו'. </b>כמ"ש בע"ז י"ב ב' ארשב"ל ל"ש כו' ול"ד לבת תיהא דשם מזיקו ואין נהנה ואף אביי ל"פ אלא משום דהוי כשותה וכמ"ש בקטורת בפ"ב דפסחים <small>(כ"ו א') </small>והרשב"א חילק דבת תיהא אינו עומד לריח וכ"כ המרדכי וראייתו מסוכה ל"ז ב' דאתרוג של מצוה מותר להריח אע"ג דאסור בהנאה וליתא דמשם מוכח להיפך כמ"ש מאכילה אקצייה כו' הלא"ה אין הילוק וכ"כ הש"ך וכ"כ תוס' שם ד"ה אלא ולא מבעיא בכלאי הכרם דלוקין עליהם שלא כדרך הנאתן כמ"ש בפ"ב דפסחים <small>(כ"ד ב') </small>אלא אפילו ערלה דאין לוקין מ"מ איסורא מיהא איכא ועתוס' דע"ז י"ב ב' ד"ה אלא כו':
**** ENGLISH ****
בשמים etc.. כwhat he wrote בע"ז י"ב ב' ארשב"ל ל"ש etc. וsome say לבת תיהא דשם מזיקו ואין נהנה וeven אביי ל"פ אלא becauseהוי כשותה וכwhat he wrote בקטורת בchapter 2 דפסחים (כ"ו א') וRashba חילק דבת תיהא אינו עומד לריח and so too המרדכי וראייתו מסוכה ל"ז ב' דאתרוג של מצוה permitted להריח even though דforbidden in benefit וליתא דמשם proven להיפך כwhat he wrote מאכילה אקצייה etc. הלא"ה אין הילוק and so too Shach and so too Tosafot שם s.v. אלא ולא מבעיא בכלאי הכרם דלוקין עליהם שלא כby way of הנאתן כwhat he wrote בchapter 2 דפסחים (so too ב') אלא אפילו ערלה דאין לוקין nevertheless איסורא מיהא there is ועTosafot דע"ז י"ב ב' s.v. אלא etc.:
**** END BLOCK ****
```

### 34. `siman_108/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 1 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=1#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 1
marker: _
**** HEBREW ****
<b>א) [סעיף א'] אין צולין בשר כשרה עם בשר נבילה וכו' בתנור אחד וכו'  </b>והיינו כשאחד מהם שמן אפי' הכשרה דאזיל ההיתר ומפטם לאיסור בריחיה והדר אזיל האיסור ואוסר להיתר אבל בשניהם כחושים מותר אפי' לכתחלה. ב"י סי' צ"ז בשם הרשב"א. ט"ז סק"א וכתב ודלא כתו"ח כלל ל"ה דין ג' שכתב דגם בשניהם כחושים טוב להחמיר לכתחלה יעו"ש. ש"ך סק"א. כנה"ג בהגה"ט או' ג' פר"ח או' א' בל"י או' א' חו"ד או' א' חכ"א כלל ס"ב או' א' זב"צ או' א' ומיהו המחמיר תע"ב. שפ"ד או' א' שבאו' י"ח.
**** ENGLISH ****
א) [seif א'] אין צולין meat כשרה עם meat nevelah etc. בoven אחד etc. וthat is כשone of them שמן even הכשרה דאזיל ההיתר ומפטם לאיסור בריחיה והדר אזיל האיסור ואוסר להיתר אבל בboth of them כחושים permitted even לat first. ben yomo סי' צ"ז in name of Rashba. ט"ז סק"א וwrote ודלא כתו"ח כלל ל"ה דין ג' שwrote דגם בboth of them כחושים טוב להחמיר לat first יעו"ש. ש"ך סק"א. Knesset HaGedolah בהגה"ט או' ג' Peri Chadash או' א' Binyamin Zeev או' א' חו"ד או' א' חכ"א כלל ס"ב או' א' Zivchei Tzedek או' א' ומיהו one who is stringent תside 2. שפ"ד או' א' שבאו' י"ח.
**** END BLOCK ****
```

### 35. `siman_108/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 2 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 2
marker: _
**** HEBREW ****
<b>ב) ומיהו  </b>ה"ד פת בפת וכדומה אבל בלא"ה אין אנו בקיאין. שפ"ד שם. ור"ל אבל בבשר וכדומה אפי' שניהם כחושים אן אנו בקיאין ויש ליזהר לכתחלה. מיהו הקה"י לעיל סי' צ"ז סעי' ג' כתב דגם האידנא בענין ריחא אנו בקיאין בכחוש משום דאין איסורו אלא לכתחלה ואם ברור לו ששניהם כחושים לגמרי מותר לכתחלה יעו"ש והב"ד זב"צ או' א' וכתב וכן יש להקל כהקה"י.
**** ENGLISH ****
ב) ומיהו ה"ד פת בפת וכדומה אבל without"ה אין אנו בקיאין. שפ"ד שם. ור"ל אבל בmeat וכדומה even both of them כחושים אן אנו בקיאין ויש ליזהר לat first. מיהו הקה"י above סי' צ"ז סעי' ג' wrote דגם now בענין ריחא אנו בקיאין בכחוש becauseאין איסורו אלא לat first ואם ברור לו שboth of them כחושים לגמרי permitted לat first יעו"ש והב"ד Zivchei Tzedek או' א' וwrote וכן יש to be lenient כהקה"י.
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_108
npm run pipeline:editorial:advance -- --siman 108
```

## Checkpoint ids

siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%94
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%95
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%96
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%97
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%98
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%99
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%9B
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%9C
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%9E
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A0
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A1
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A2
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A4
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A6
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A7
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A8
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%A9
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%AA
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%90
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%91
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%92
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%90
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%91
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%92
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%90
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%91
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%90
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%91
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%92
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%93
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%94
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=_
siman_108/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=_
siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=1#marker=_
siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=2#marker=_