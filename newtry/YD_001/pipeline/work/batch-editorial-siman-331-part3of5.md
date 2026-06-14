# Editorial retranslation — Siman 331 (part 3/5)

Generated: 2026-06-12T13:50:21.073Z

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

## Blocks in this batch (45 of 815 remaining in scope)

### 1. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 35 — marker `ה`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=35#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 35
marker: ה
**** HEBREW ****
<b>אבל לתרומה כו'. </b>דכולם שוין בשיעורה ואין נ"מ עתה בין עין יפה או כו':
**** ENGLISH ****
But to donation as well. Everyone is in her class and there is no right now between a beautiful eye or a spoon:
**** END BLOCK ****
```

### 2. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 36 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=36#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 36
marker: _
**** HEBREW ****
<b>אם שינה כו'. </b>ירושלמי שם והביא הר"ש ודברי הרמב"ם תמוהין דשם בירושלמי לא אמרו אלא אליבא דר"ל ור"י פליג עליה וכמ"ש בגמ' ברפ"ג דקדושין וגם רבא שני שם אליבא דר"ל בע"א וכבר השיגו הראב"ד וז"ש בהג"ה וי"א כו' וכן הקשה הטור עליו אלא דמה שהקשה ל"ל לביטולו כיון ששינה כבר תי' בר"ש שם דכה"ג ליכא קפידא וע"כ צ"ל כן אליבא דר"ל להירושלמי:
**** ENGLISH ****
If you sleep as well. The Lord’s Prayer, and the Holy Spirit, and the Holy One, and the Holy One, said, “It is not the same as the Lord’s Prayer, and it is the same as the Lord’s Prayer, and it is the same as the Holy One.”
**** END BLOCK ****
```

### 3. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 38 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=38#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 38
marker: _
**** HEBREW ****
<b>אפטרופסין כו'. </b>העתיק לשון התוספתא אבל מש"ש בסיפא להאכיל קאי גם ארישא וכמ"ש בגטין שם וכמ"ש בח"מ סי' ר"ץ:
**** ENGLISH ****
Aphetsin is called. The ancient tongue of the appendix, but from the mouth to feed Kai, I will carry and as a result of the G-d in his mouth, and as a result of the S.C.:
**** END BLOCK ****
```

### 4. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 42 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=42#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 42
marker: _
**** HEBREW ****
<b>הפועלים כו'. </b>ואפילו בדיעבד כמ"ש בתוספתא שם:
**** ENGLISH ****
The workers are so. And even in retrospect, as a name:
**** END BLOCK ****
```

### 5. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 43 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=43#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 43
marker: _
**** HEBREW ****
<b>פועל כו'. </b>כ"ה גירסתו שם אבל גירסא שלנו אם א"ל בע"ה כנוס לי גורני תרומתו תרומה שאין הגורן נכנס אא"כ נתרם וכ"כ הראב"ד:
**** ENGLISH ****
He acts as a. "His version is there, but our gypsies, if I am a member of me, have made a contribution that the patriarch does not enter into the UN and as such, the Rebbe:
**** END BLOCK ****
```

### 6. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 44 — marker `א`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=44#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 44
marker: א
**** HEBREW ****
<b>עובד כוכבים כו' משלו. </b>קדושין מ"א ב' וכנ"ל ס"ל:
**** ENGLISH ****
He works his own stars. Hashem's Word and the Holy Spirit:
**** END BLOCK ****
```

### 7. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 44 — marker `ב`

- Quality: **ok**
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=44#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 44
marker: ב
**** HEBREW ****
<b>גזרו כו'. </b>מנחות ס"ז א':
**** ENGLISH ****
Cut up as well. SJ:
**** END BLOCK ****
```

### 8. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 46 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=46#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 46
marker: _
**** HEBREW ****
<b>הפריש כו'. </b>קדושין שם ושבועות כ"ו ב' ועתוס' כגטין ל"א א' ד"ה כך כו' <small>(ונראה דלא פליגי רבנן כו') </small>וד"ה במחשבה כו' <small>(וכן ודאי דבלא דיבור כו') </small>וכ"כ בבכורות נ"ט ובמנחות נ"ד: <br><b>(ליקוט) הפריש כו'. </b>י"ט י"ג וש"מ כשם שתרומה גדולה ניטלת באומד ובמחשבה כו' ורבנן ל"פ עליה דאבא אלעזר ב"ג אלא בת"מ ובפ"א דתרומה חמשה לא כו' האלם כו' ואמר בירושלמי משום ברכה דוקא וברפ"ב דקדושין מה להנך שכן כו' ובפ"ג דשבועות <small>(כ"ו ב') </small>משום דהוי תרומה וקדשים ב' כתובים כו' וכ' תוס' בגטין ל"א וש"מ דאף בתרומת מעשר ל"פ רבנן אלא לענין אומד אבל במחשבה ל"פ דקרא כתיב בגופיה ונחשב כו' וערש"י בגטין שם ד"ה ובמחשבה נותן עיניו בצד זה כו' ותרוייהו נפקי כו' והאי דיליף כו' וכן אמרינן בפ"ק דחולין <small>(ז' א') </small>ודלמא ר"מ נתן עיניו כו' ואע"ג די"ל דדמאי שאני <small>(ועתוס' בחולין שם ו' ב' ד"ה והתיר כו' ואומר ר"ת כו' וכן משמע כו') </small>וכ"מ בתוס' דגטין שם <small>(סד"ה במחשבה) </small>מ"מ אין לחלק וראיה <small>(דבחולין שם מיירי בודאי) </small>מדקאמר שם לא נחשדו כו' ובדמאי מותר כמ"ש בפ"ד דחלה <small>(ער"ש שם במתני' ו' שכתב אע"פ שלא הקלו בדמאי עצמו כדמוכח כו'. וצ"ע) </small>וכ' תוס' שם וש"מ דמ"מ אסור להפריש תרומות ומעשרות בשבת וי"ט כמ"ש בפ"ה די"ט <small>(ל"ו ב' במתני') </small>ואפי' דמאי כמ"ש בפ"ב דשבת <small>(ל"ד א' במתני') </small>ופ"ז דדמאי דע"כ לא שרי ר' יהודה בר"פ כ"א דשבת משום נותן עיניו כו' אלא במדומע אבל לא בטבל ואף במדומע פליג עליה רשב"א בברייתא וכ"ש ת"ק ונראה דת"ק פליג ג"כ ארשב"א ואוסר אף ליתן עינו אף במדומע מדקאמר בגמ' ר"י כרשב"א ס"ל מכלל דת"ק פליג אבל ע"י קריאת שם מע"ש מותר להפריש אף טבל כמ"ש בפ"ז דדמאי וכל זה ה"ה לחלה (ע"כ):
**** ENGLISH ****
The rash is . Hashem’s Word says, “Hashem’s Word is holy, and Hashem’s Word is so holy, and Hashem’s Word is in His Word.” Hashem’s Word tells us that Hashem’s Word is a gift to Hashem’s Word, and that Hashem’s Word is a gift to Hashem’s people, and Hashem’s people, and Hashem’s people, and that they are Hashem’s people
In the words of the Lord’s Prayer, Hashem’s presence is in His presence, and He is in His Word, and He is in His presence. And as a result of Hashem’s promise, “I am not allowed to be saved.”
"And thou, Capernaum," he said, "And thou, Capernaum," and he said, "I am not afraid of him."
**** END BLOCK ****
```

### 9. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 48 — marker `_`

- Quality: **warn** — hebrew_in_english
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=48#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 48
marker: _
**** HEBREW ****
<b>ה"ז נשאל כו'. </b>עירובין ל' ב' נדרים נ"ט א':
**** ENGLISH ****
The "Z" was asked as.  עי  עי  ב  ב
**** END BLOCK ****
```

### 10. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 49 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=49#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 49
marker: _
**** HEBREW ****
<b>האומר כו'. </b>ירושלמי ספ"ד אמר מה שלמעלן תרומה מה שלמטן חולין מה שלמטן תרומה מה שלמעלן חולין לדעתו הדבר תלוי:
**** ENGLISH ****
They say so. Jerusalem Spicer said what the elevator had made a contribution from the melantan from what the nail had made a contribution to what a sick lifter would say:
**** END BLOCK ****
```

### 11. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 52 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=52#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 52
marker: א
**** HEBREW ****
<b>ונ"ל דבזה"ז כו'. </b>דכל מה שתורם הוי מהרע ועתוס' דיבמות פ"ט א' ד"ה אין. ועוד אר"י כו':
**** ENGLISH ****
And then we will be able to do so. All that Hashem’s promise is to do is not to do with evil. And then, I will be like:
**** END BLOCK ****
```

### 12. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 52 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=52#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 52
marker: ב
**** HEBREW ****
<b>ומיהו כו'. </b>דהם מותרין אפילו בטומאה כמ"ש בסעיף ס"ז וכ"ש במעשר עני:
**** ENGLISH ****
And who is so. Dem is permitted even in the same way as in the Qur'an and in the midst of a poor tenant:
**** END BLOCK ****
```

### 13. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 53 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=53#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 53
marker: _
**** HEBREW ****
<b>הקישות כו'. </b>מתני' ספ"ב וכת"ק:
**** ENGLISH ****
You've been called '. The Bible and the Bible:
**** END BLOCK ****
```

### 14. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 57 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=57#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 57
marker: א
**** HEBREW ****
<b>שנאמר שנה שנה. </b>גמרא ר"פ בתרא דבכורות:
**** ENGLISH ****
It was said a year. R. A.D. in the Old Testament:
**** END BLOCK ****
```

### 15. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 57 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=57#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 57
marker: ב
**** HEBREW ****
<b>וכן אם ליקט אתרוג כו'. </b>ברייתא וגמרא שם <small>(בר"ה י"ד ט"ו):</small>
**** ENGLISH ****
And if I take a arrow. And then there is an end to it
**** END BLOCK ****
```

### 16. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 57 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=57#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 57
marker: ג
**** HEBREW ****
<b>מפני כו'. </b>מתני' שם <small>(בריש ר"ה) </small>וגמ' <small>(י"ב א') </small>תנא לירקות ולמעשרות כו':
**** ENGLISH ****
Because of P. And then, Hashem’s people will give thanks to Hashem’s mercy and mercy
**** END BLOCK ****
```

### 17. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 61 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=61#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 61
marker: _
**** HEBREW ****
<b>אין תורמין כו'. </b>דלקוח הוא מדרבנן כמ"ש בפ"ז דב"מ (פ"ח) ואין תורמין מד"ת על ד"ס ומד"ס על ד"ת כמ"ש בתוספתא אין תורמין מפירות א"י על פירות סוריא ולא כו' כנ"ל <small>(בס"ק כ"א) </small>ובמנחות ל"א א' קסבר אין קנין כו':
**** ENGLISH ****
There is no right-handed. A client is a dormant and does not believe in Hashem’s Word, nor is it possible for Hashem’s people to dwell on Hashem’s Word and Hashem’s Word, and in the same way as Hashem’s Word, and in Hashem’s Word, there is no sin in Hashem’s Word
**** END BLOCK ****
```

### 18. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 62 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=62#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 62
marker: _
**** HEBREW ****
<b>אין תורמין שבלים כו'. </b>ירושלמי ספ"ק ר"א בשם רשב"ל ונחשב לכם תרומתכם כדגן מן הגורן ממה שהוא מצוה את הלוי לתרום מן הגמור הדא אמר שאסור ליתן לו שבלין אבל משמע דאף על עצמו אסור לתרום וכמ"ש במתני' ספ"ק דחלה ואינן ניטלין כו' וע' סעיף נ"ד <small>(ונשמט בטוש"ע שם עוד בבא ולא מדבר שלא נגמרה מלאכתו על דבר שלא נגמרה מלאכתו וכמ"ש במתני' ספ"א דתרומות והעתיקה הרמב"ם): </small><br><b>(ליקוט) אין תורמין שבלים כו'. </b>ספרי פ' קרח כדגן מן הגרן וכמלאה מן היקב למה נאמר לפי שהוא אומר והרמותם ממנו שומע אני יתרום שבולין על חטין וענבים על יין וזיתים על שמן ת"ל כדגן מן הגרן מן הגמור מכאן אמרו התבואה משימרח והיין משיקפה והשמן משירד לבור (ע"כ):
**** ENGLISH ****
There is no way to get married.” Hashem’s promise is that Hashem’s promise is not to be given to Hashem’s people, and that Hashem’s promise is not to be given to them. The Book of Ice as a Garden from the Grain and fills from the winery to what it says, and the levels from it hears, I will donate spice on the horn and grapes on wine and grapes
Olives on the oil of a grain from the groan, from which the grains and wine from coffee and oil from scratches to the pit (h
**** END BLOCK ****
```

### 19. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 63 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=63#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 63
marker: א
**** HEBREW ****
<b>מתאנים כו' עד במדה. </b>איתא ג"כ במנחות נ"ד ב':
**** ENGLISH ****
They are called to death. I'm going to give you a blessing from Hashem:
**** END BLOCK ****
```

### 20. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 63 — marker `ב`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=63#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 63
marker: ב
**** HEBREW ****
<b>על החטים אלא לפי חשבון. </b>כצ"ל וכ"ה בתוספתא שם וכ"כ כ"מ ע"ש:
**** ENGLISH ****
The needles, but by account. As a result of Hashem’s Word, Hashem’s Word and His Word:
**** END BLOCK ****
```

### 21. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 63 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=63#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 63
marker: ג
**** HEBREW ****
<b>ובכל אלו כו'. </b>כנ"ל סנ"ג:
**** ENGLISH ****
And all of them are so. Same as Sang:
**** END BLOCK ****
```

### 22. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 63 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=63#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 63
marker: ד
**** HEBREW ****
<b>ונ"ל כו'. </b>כנ"ל סנ"ב:
**** ENGLISH ****
And we're going to be called. Same as San:
**** END BLOCK ****
```

### 23. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 64 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=64#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 64
marker: _
**** HEBREW ****
<b>אין כו' אבל כו'. </b>כר' ישמעאל בר"י בתוספתא פ"ד דמילתיה כרבנן כמש"ש ובב"ב פ"ד ואע"ג דבתוספתא שם מתיר חומץ על יין לפי חשבון ט"ס הוא וכן משמע בגמרא דב"ב שם דקאמר שהוא מהרע על היפה:
**** ENGLISH ****
There’s no quay, but k. As a result of the Lord’s Prayer, Hashem’s Word and Hashem’s Word, Hashem’s Word tells us that He is Hashem’s Word, and that He is Hashem’s Word: “He is the Lord’s Prayer, and He is the Lord’s Prayer.”
**** END BLOCK ****
```

### 24. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 65 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=65#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 65
marker: _
**** HEBREW ****
<b>התורם כו'. </b>צ"ע דהא מתני' זו אתיא כרבי וכ"ה בתוספתא שם התורם חבית כו' דברי רבי שרבי אומר יין כו' ומ"מ הלכה כרבנן ואע"ג דסתם כאן במתני' כוותיה סתמא דספ"ב אתיא כריב"י כמ"ש בירושלמי ספ"ב מתני' דריב"י דא"ר ישמעאל בר"י משום אביו תורמין מן היין על החומץ אבל לא מן החומץ על היין עבר ותרם תרומתו תרומה ר' אומר יין וחומץ שני מינין אין תורמין ולא מעשרין מזה על זה כו' ואע"ג דתניא הבודק כו' ופליגי ר"י וריב"ל בב"ב צ"ו א' ההיא אתי אפילו לרבנן משום דלא נתכוין להפריש אלא יין וכמ"ש בתוספתא שם וחכ"א מין א' היה בלבו לתרום יין על יין מה שבידו חומץ אין תרומה כו' היה בודק כו' וכ"כ תוס' בב"ב פ"ד ב' ד"ה יין כו' וי"ל דמתני' נמי הכי מיירי וא"צ לומר דסתמא דמתני' סתרי אהדדי וההיא דתוספתא מיירי שהיה בלבו לתרום אף מהחומץ והרמב"ם כתב לשון מתני' וער"ש שם ותוס' ביבמות פ"ט א' ד"ה קישות כו':
**** ENGLISH ****
The donor is a. He said, “The Lord’s Prayer is a blessing, and it is a blessing for the Lord’s glory, and that the Lord’s Prayer is a blessing for him, and that he will be given to him.”
To donate wine to what is in his hand, he would not have made a donation to his or her, and he would say, “I am the one who is the one who is the one who is the one who is the one who has been in the heart of Hashem.”
**** END BLOCK ****
```

### 25. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 66 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=66#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 66
marker: א
**** HEBREW ****
<b>אחר כו'. </b>ע"ל סעיף י"ט:
**** ENGLISH ****
another qua. In accordance with paragraph:
**** END BLOCK ****
```

### 26. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 66 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=66#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 66
marker: ב
**** HEBREW ****
<b>מהנשאר. </b>ער"ש בפ"ז דדמאי מתני' ד' ד"ה עשרה כו' וכ"כ תוס' על מתני' זו בכמה מקומות ע"ש ושם:
**** ENGLISH ****
From the river. In this book, Dr. D. R. D.C., and so on, it is in a few places
**** END BLOCK ****
```

### 27. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 67 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=67#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 67
marker: א
**** HEBREW ****
<b>ומותר כו'. </b>ספרי פ' קרח ואכלתם אותו בכל מקום אפי' בקבר שהיה בדין הואיל ותרומה קרויה תרומה ומ"ר קרוי תרומה כו' וכ"ה ביבמות פ"ו ב' ובספרי ובספרי זוטא שאכילתו הוא כאכילת חולין לכ"ד ע"ש:
**** ENGLISH ****
It is permitted as. The Book of Ice and Eat Him everywhere in the tomb that was in Heil and a donation is called a donation and a donation is called a donation and a “producer” in the tomb and in the book and in the book that his eating is an eating of their patients to the D.C.:
**** END BLOCK ****
```

### 28. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 67 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=67#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 67
marker: ב
**** HEBREW ****
<b>אבל כו' או כו'. </b>דבריו מגומגמין דהא קי"ל בגמרא שם אפילו בשני עדים וכמ"ש בא"ה סי' י"ז סנ"ו:
**** ENGLISH ****
Oh, yes or so. His words from Gummemin de Janeiro in the final name even in two witnesses and in the U.S.-C
**** END BLOCK ****
```

### 29. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 68 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=68#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 68
marker: א
**** HEBREW ****
<b>לוים כו'. </b>ספרי זוטא שם אין לי אלא מעשר לוים שנוטלין מאחרים מישראל מנין אתה מרבה מעשר לוים שלהן ר"ל שחייבים להפריש מעשר וליתן ת"מ לכהן כמ"ש ברישא שם יכול שאין לחייב תרומה אלא מעשר ישראל מעשר גוים וגרים כו' ת"ל כו' אין לי כו' ת"ל מעשר מן המעשר. ובספרי שם כן תרימו גם אתם למה נאמר לפי שהוא אומר ואל הלוים תדבר כי תקחו מאת בני ישראל ישראל נותנין מעשר ללוים ואין לוים נותנין מעשר ללוים הואיל ואין נותנין מעשר ללוים שומע אני יהא אוכלין אותו בטבלו ת"ל כן תרימו גם אתם תרומת ה' רש"א א"צ ומה חלה שאינה נוהגת בכל הפירות נוהגת בפירות כהנים מ"ר שנוהג בכל הפירות אינו דין שינהוג בפירות כהנים ומה ת"ל כן תרימו גם אתם א"ל אלא מעשר של ישראל מעשר של עצמן מנין ת"ל כן תרימו גם אתם ר"ל דת"ק יליף מכן תרימו שעכ"פ צריכין להפריש מעשר משדותיהם ולהרים ממנו תרומת מעשר ורש"א שצריכין להפריש מעשר א"צ אלא להרים ת"מ ממנו: <br><b>(ליקוט) לוים וכהנים כו'. </b>תוס' דחולין ל"ז ב' ד"ה שלא כו' (ע"כ): <br><b>(ליקוט) לוים וכהנים כו'. </b>מכות י"ט ב' רי"א כהן שעלתה כו' (ע"כ):
**** ENGLISH ****
“Low as a.” I have nothing but twenty loaves from Israel, from which you make a donation from many of them, but from the Ten mitzvot that must be dismantled from the Ten mitzvot, and that I will not be able to serve as a “mant” from the Ten mitzvot. And in the book of Hashem, you shall also be given to Hashem’s people, and you shall not be given to Hashem’s people, nor shall they be saved from Hashem’s covenant with Hashem’s people, nor shall they be saved from Hashem’s people, nor do they do not care for them
All fruits are fruited in the fruit of the vineyards, which is used in all fruits, is not a judgment of the fruits of the priests, and what will be done, you will also be given to them, but rather than the ten of Israel from the Tens of themselves, from which you will be given a donation from the Ten mitzvot. "The Lord's Prayer, which is not the same as the Lord." "The Lord's Prayer," he said
**** END BLOCK ****
```

### 30. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 68 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=68#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 68
marker: ב
**** HEBREW ****
<b>וכן הכהנים כו'. </b>כמש"ש בחלה ול"ק חלה אלא משום שר"ל ק"ו ועד"ר שם: <br><b>(ליקוט) וכן הכהנים כו'. </b>וכן בחלה כמ"ש בקדושין מ"ו ב' שאני התם כו' וקסבר כו' (ע"כ): <br><b>(ליקוט) וכן הכהנים כו'. </b>ב"ב פ"א ב' ודלמא כו' (ע"כ): <br><b>(ליקוט) וכן הכהנים כו' </b>ערש"י בבכורות י"א ב' ד"ה ואותו אבי כו' וה"ה כו' ועמש"ש ובמ"א (ע"כ): <br>(ליקוט) ערש"י בקדושין נ"ח א' ד"ה כמי שהורמו כו' וש"מ (ע"כ):
**** ENGLISH ****
And yes, the priests are. As a result of Hashem’s Word, Hashem’s promise to Abraham and Hashem’s people. “And thou, Capernaum, that I am the Lord, and that I am the Son of Hashem.” “And thou, Capernaum, and thy father, shalt be thrust down to hell.”
**** END BLOCK ****
```

### 31. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 68 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=68#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 68
marker: ג
**** HEBREW ****
<b>והם לעצמן. </b>כמ"ש בסעיף ס"ט ועבה"ג:
**** ENGLISH ****
They themselves. As a result of the book, and in accordance with the Qur’an:
**** END BLOCK ****
```

### 32. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 69 — marker `_`

- Quality: **info** — divine_name_style
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=69#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 69
marker: _
**** HEBREW ****
<b>אין כו' וכן כו'. </b>חולין קל"א א' ושאר מתנות כהונה כו' ושם ב' כגון הזרוע כו' מ"ר דלוי הוא כו' אלא כגון כו' ולא פריך אלא למה מוציאין מלוי לכהן אבל מכהן לכהן ניחא:
**** ENGLISH ****
“There is no name and so on.” A. A. and other gifts such as the Qur'an and the name of the Lord, such as the Lord's arm, is a quaint, but rather than a blessing, but rather what makes it easier for him to serve, but he serves as a gift
**** END BLOCK ****
```

### 33. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 70 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=70#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 70
marker: _
**** HEBREW ****
<b>אע"פ כו'. </b>לשון התוספתא דתרומות:
**** ENGLISH ****
P.S.A. The language of Addiction:
**** END BLOCK ****
```

### 34. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 71 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=71#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 71
marker: א
**** HEBREW ****
<b>מעשרין כו'. </b>כ"מ בירושלמי פ"ב דתרומות תמן תנינן התורם את הבור ואמר ה"ז תרומה ע"מ שתעלה שלום מן השבר כו' תני אר"י בר"א בתרומה גדולה שהיא צריכה לתרום מן המוקף אבל בתרומת מעשר אפילו שאר כל הדברים שלום הן היה תורם תרומה ות"מ כא' אינה שלום יהודה בר' אומר לא עלתה ע"ד של זה לעבור על ד"ת להקדים ת"מ לתרומה גדולה ופריך שם על סברא זו לא עלתה כו' ואם איתא הא אין יכול להפריש תרומת מעשר עד שיקרא מעשר כמ"ש בפ"ה דדמאי. וער"ש בסוף טבול יום: <br><b>(ליקוט) מעשרין כו' וא"צ כו'. </b>יבמות צ"ג א' דר' ינאי כו' ותרומה לא היה צריך להפריש כמ"ש <small>(בירושלמי פ"ג דמעשרות) </small>א"א לגורן שתעקר עד שיתרם וז"ש שקל עשר כו' וז"ש כאן מעשרין בסתמא אפילו ת"ח אף שבת"מ אסור ועתוס' שם ב' ד"ה אלא שרחקו עצמן בזה ותוס' אזלי לשיטתן שגם בת"מ חילקו בין חול לשבת אבל הרמב"ם לא ס"ל כן ועסכ"ד בהג"ה (ע"כ): <br><b>(ליקוט) מעשרין כו'. </b>מתני' בספ"ג דגטין ל"א א' המניח כו' ועתוס' שם ד"ה המניח כו' ואזלי לשיטתייהו בתוס' שם ל' ב' בד"ה וכי נחשדו כו' וי"ל מדרבנן כו' והא דקאמר רשאי כו' אבל הרמב"ם לשיטתו שפי' כי"מ בתוס' שם <small>(לאו דוקא כנ"ל בס"ק ס"ח) </small>ולא חילק בין שבת לי"ט ותרומות דמתני' היינו תרומת מעשר (ע"כ):
**** ENGLISH ****
from ten. As a result of Hashem’s promise, Hashem’s promise is to be given to Hashem’s people, and that Hashem’s people will be saved from Hashem’s Word, and that Hashem’s promise is not to be given to them. At the end of the day, the Sages and the E. K.A. (S.A.). A.D. Dr. Yeaven as a quaint and a donation was not needed
He said, “And he shall be blessed with him, and that he shall be exalted to him, and that he shall be exalted to him, and that he shall be thrust down to him, and that he shall not be taken away from him.” He said, “The Lord’s Prayer is the same as the Lord, and the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, and He will be called, and He will be called, and He will be given to him.”
And I was a gift from ten
**** END BLOCK ****
```

### 35. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 71 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=71#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 71
marker: ב
**** HEBREW ****
<b>אבל כו'. </b>בכורות נ"ד א' ובירושלמי פ"ב כמה פעמים אין תורמין ולא מעשרין מזה כו' ע"ש:
**** ENGLISH ****
But yes. N.A. and R.R. How many times there is no ceremoniality, not a tenth of it
**** END BLOCK ****
```

### 36. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 71 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=71#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 71
marker: ג
**** HEBREW ****
<b>ולא מן כו'. </b>מנחות ל"א א'. ובהרבה מקומות דלמא אתי לעשורי מן החיוב כו' וז"ש ואם עישר כו' דאל"כ לא הוי גזרינן:
**** ENGLISH ****
And not from K. Guides to “A.” And in many places, I will be blessed with him, and if he is not, he will not be given to him
**** END BLOCK ****
```

### 37. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 72 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=72#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 72
marker: _
**** HEBREW ****
<b>כל שאמרנו כו' כל שאמרנו כו'. </b>בספרי יליף זה מזה וכן למד מקרא דמעשר על תרומה וכן להיפך ע"ש בכמה מקומות נלאתי לכותבן וכן בירושלמי ובגמ' בכמה מקומות:
**** ENGLISH ****
Everything we say is all that we say is. In the book of Yilf it is from one another and he learns from the Bible about contribution and vice versa in several places that I will not give to the priest and the impressions and the gem in several places:
**** END BLOCK ****
```

### 38. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 74 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=74#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 74
marker: _
**** HEBREW ****
<b>השקדים כו'. </b>וכן פי' תוס' בחולין שם ע"ש ובעירובין כ"ח ב' וש"מ:
**** ENGLISH ****
The precedent is . Hashem’s word is in heaven, and in his heart, he is in heaven
**** END BLOCK ****
```

### 39. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 75 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=75#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 75
marker: _
**** HEBREW ****
<b>אין מעשרין כו'. </b>ספרי שם ואמרת אלהם בהרימכם ה"ז אזהרה לב"ד של לוים שלא יהו תורמין אותו אלא מן המובחר. וה"ה למעשר עצמו כמ"ש בסע"ב:
**** ENGLISH ****
There are no ten. There is a book of Hashem’s word in your holy name, “A warning to the Lord of the Levites who will not be condemned but from the best.” “And the Lord himself, as he is in the midst of the Lord’s Prayer:
**** END BLOCK ****
```

### 40. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 76 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=76#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 76
marker: _
**** HEBREW ****
<b>אלא כו' וכל המדקדק כו'. </b>ע"ל סכ"ד וה"ה במעשר דחד טעמא להו ששיעורם מפורש בתורה והמרבה כו':
**** ENGLISH ****
It is only a quaint, and all the horns are gone.” In the midst of Hashem’s Word, Hashem’s promise is that it is in heaven, and that it is in heaven
**** END BLOCK ****
```

### 41. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 77 — marker `_`

- Quality: **info** — divine_name_style
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=77#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 77
marker: _
**** HEBREW ****
<b>המפריש כו'. </b>כמ"ש בפירושו שם וכגירסתו שם אבל לא ממקום אחר ופירושו דחוק אבל גירסא שלנו למקום אחר ועפי' ר"ש שם וכן כל הסוגיא של הירושלמי שם כגי' זו ע"ש:
**** ENGLISH ****
The Empire as well. As the Lord’s Word says, “But not from another place, but it means that it is our way to another place, and that it is the same as the Lord of Jerusalem, and that it is the same as the Lord.”
**** END BLOCK ****
```

### 42. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 78 — marker `א`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=78#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 78
marker: א
**** HEBREW ****
<b>המפריש כו'. </b>מתני' י"א פ"ה דמ"ש וער"ש שם ד"ה מלברכך כו' ותוספתא פ"ג היה הולך להפריש תרומה ומ"ר ומ"ש מאמתי מברך כו' כנ"ל <small>(בס"ק כ"א):</small>
**** ENGLISH ****
The Empire as well. Hashem’s Word and His Word, “Hashem’s Word and Hashem’s Word, and I will be blessed with Him.”
**** END BLOCK ****
```

### 43. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 78 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=78#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 78
marker: ב
**** HEBREW ****
<b>ואם הפריש כו'. </b>תוספתא פ"ו דברכות היה מהלך להפריש תרומה ומעשרות כו' כנ"ל:
**** ENGLISH ****
And if the fire is so. In addition, the P. was a move to make a donation and dozens of such a donation:
**** END BLOCK ****
```

### 44. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 78 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=78#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 78
marker: ג
**** HEBREW ****
<b>ולא סח. </b>שם ועמ"ש בא"ח סי' ח' סי"ב וסי"ג:
**** ENGLISH ****
Not a scream. There is a name and a lot of people in the U.S. and S.C.:
**** END BLOCK ****
```

### 45. `siman_331/beur-hagra/part-002.txt` — beur-hagra — seif 80 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=80#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 80
marker: _
**** HEBREW ****
<b>אשכול כו'. </b>ירושלמי שם מיישא תני רמון שנקרח בו אפילו פרידה א' כולה חיבור למעשר אשכול שבישל בו אפילו גרגר יחידי כולו חיבור למעשרות א"ר חנינא פושטו הוא לן כל אותו הגפן כל אותו המין חזרו ופושטו כל אותו הרוח ר"י ב"ר בון בון אומר כל אותו הכרם היה כרם קטן ועשאו גדול גדול ועשאו קטן אחד ועשאו שנים שנים ועשאן אחד. בעיא היא. ופסק כר"ח ואיני יודע למה כי אין שיטתו כן <small>(אלא כמ"ד הנאמר באחרונה כמ"ש בפירשו בפרק ב' דסוטה) </small>ואפשר שמפרש שמ"ש היה כרם קטן כו' קושיא היא:
**** ENGLISH ****
A quake. Jerusalem, where Maisha will give Ramon that was even iced in him a whole farewell to a cluster in which even a single grain was filled with a connection to the tens of A. Hanna Pushto, is to give them all the same gem that the same species had returned and stolen all the same spirit R. B. B. Boone says that all the same volume was small and large and thick for one year. In her, she. And I don't know why it's not his way, but rather, as he has recently been described as "in his mouth" in chapter 2, and it's possible that "there was a small vineyard" and that it is:
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_331
npm run pipeline:editorial:advance -- --siman 331
```

## Checkpoint ids

siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=35#marker=%D7%94
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=36#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=38#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=42#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=43#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=44#marker=%D7%90
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=44#marker=%D7%91
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=46#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=48#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=49#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=52#marker=%D7%90
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=52#marker=%D7%91
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=53#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=57#marker=%D7%90
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=57#marker=%D7%91
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=57#marker=%D7%92
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=61#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=62#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=63#marker=%D7%90
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=63#marker=%D7%91
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=63#marker=%D7%92
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=63#marker=%D7%93
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=64#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=65#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=66#marker=%D7%90
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=66#marker=%D7%91
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=67#marker=%D7%90
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=67#marker=%D7%91
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=68#marker=%D7%90
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=68#marker=%D7%91
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=68#marker=%D7%92
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=69#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=70#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=71#marker=%D7%90
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=71#marker=%D7%91
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=71#marker=%D7%92
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=72#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=74#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=75#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=76#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=77#marker=_
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=78#marker=%D7%90
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=78#marker=%D7%91
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=78#marker=%D7%92
siman_331/beur-hagra/part-002.txt#slug=beur-hagra#seif=80#marker=_