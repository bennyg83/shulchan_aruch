# Editorial retranslation — Siman 110 (part 3/7)

Generated: 2026-06-12T10:06:35.280Z

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

## Blocks in this batch (41 of 285 remaining in scope)

### 1. `siman_110/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 3 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 3
marker: _
**** HEBREW ****
<b>ג) שם. דבר חשוב אוסר במינו בכל שהוא.  </b>כלומר אפי' בכמה אלפים לא בטיל. ש"ך סק"ב. פר"ח או' ב' לה"פ או' ב' בל"י או' ב' שפ"ד או' ב' חכ"א שם. בי"צ שם בעמ"ז או' ג' זב"צ או' ב'.
**** ENGLISH ****
ג) שם. דבר חשוב אוסר במינו בכל שהוא. Meaning: even בכמה אלפים לא nullified. ש"ך סק"ב. Peri Chadash או' ב' Lechem HaPanim או' ב' Binyamin Zeev או' ב' שפ"ד או' ב' חכ"א שם. בי"צ שם בעמ"ז או' ג' Zivchei Tzedek או' ב'.
**** END BLOCK ****
```

### 2. `siman_110/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 4 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 4
marker: _
**** HEBREW ****
<b>ד) וה"ה  </b>ודאי איסור דרבנן שדרכו לימנות אינו בטל אפי' באלף. כנה"ג בהגה"ט או' ה' שפ"ד שם ער"ה או' ה' ואף אם הוא איסור דרבנן ואינו איסור הנאה אלא איסור אכילה לחוד לא בטיל וכן הלכה דלא כפר"ת או' ג' שפ"ד שם. ער"ה שם. וכ"ה לעיל בהגה סי' ק"א סעי' א' גבי חהר"ל יעו"ש.
**** ENGLISH ****
ד) and the same applies certainly prohibition d'rabbanan שדרכו לימנות אינו בטל even באלף. Knesset HaGedolah בהגה"ט או' ה' שפ"ד שם ער"ה או' ה' וeven אם הוא prohibition d'rabbanan ואינו prohibition הנאה אלא prohibition אכילה לחוד לא nullified וכן the halachah that not / which is not כפר"ת או' ג' שפ"ד שם. ער"ה שם. וכ"ה above בהגה סי' ק"א סעי' א' גבי חהר"ל יעו"ש.
**** END BLOCK ****
```

### 3. `siman_110/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 5 — marker `_`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 5
marker: _
**** HEBREW ****
<b>ה) ודברים  </b>החשובים האסורים בהנאה אם נתערבו אפי' באלף כולם אסורים בהנאה. ע"ז דף ע"ד ע"א וכן מוסכם מכל הפו' ש"ך שם. כנה"ג שם או' א' פר"ח שם. לה"פ שם. בל"י שם. חו"ד או' ב' שפ"ד שם.
**** ENGLISH ****
ה) ודברים החשובים הforbiddenים in benefit אם were mixed even באלף כולם forbiddenים in benefit. ע"ז daf ע"ד side 1 וכן מוסכם מכל הפו' ש"ך שם. Knesset HaGedolah שם או' א' Peri Chadash שם. Lechem HaPanim שם. Binyamin Zeev שם. חו"ד או' ב' שפ"ד שם.
**** END BLOCK ****
```

### 4. `siman_110/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 6 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 6
marker: _
**** HEBREW ****
<b>ו) ומיהו  </b>מותר למכרן לעכו"ם חוץ מדמי איסור שבהן אם הוא בענין שאין לחוש שהעכו"ם ימכרנו אח"כ לישראל. ש"ך שם. כנה"ג שם. פר"ח שם. לה"פ שם. בל"י שם. כריתי או' ב' חו"ד שם. שפ"ד שם.
**** ENGLISH ****
ו) ומיהו permitted למכרן לnon-Jew חוץ מדמי prohibition שבהן אם הוא בענין שאין לחוש שהnon-Jew ימכרנו afterward לישראל. ש"ך שם. Knesset HaGedolah שם. Peri Chadash שם. Lechem HaPanim שם. Binyamin Zeev שם. Kereti או' ב' חו"ד שם. שפ"ד שם.
**** END BLOCK ****
```

### 5. `siman_110/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 7 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 7
marker: _
**** HEBREW ****
<b>ז) ומיהו  </b>תקנתא דימכור כולה לעכו"ם חוץ מדמי איסור שבו איתא בכל איסורין שבתורה ואף כשלא נתבטל האיסור מה"ת כל שאין לחוש שיחזור העכו"ם למכרו לישראל וכגון פת שנאפה בעצי אשירה וכיוצא בו יכול לפתתו ולמכרו כך לעכו"ם כיון שאין דרך הישראל לקנותו כך מהנכרי. פר"ח שם. לה"פ שם. שפ"ד שם וכתב דאפי' ליכא כ"א חד בחד דהא ארג בגד או אפה פת בעכו"ם מהני למכרו חוץ מדמי איסור שבו. זב"צ או' ו'.
**** ENGLISH ****
ז) ומיהו תקנתא דימכור כולה לnon-Jew חוץ מדמי prohibition שבו איתא בכל איסורין שבתורה וeven כשלא נתבטל האיסור מה"ת כל שאין לחוש שיחזור הnon-Jew למכרו לישראל וכגון פת שנאפה בעצי אשירה וכיוצא בו יכול לפתתו ולמכרו כך לnon-Jew כיון שאין by way of הישראל לקנותו כך מהנכרי. Peri Chadash שם. Lechem HaPanim שם. שפ"ד שם וwrote דeven there is not כ"א חד בחד דהא ארג בגד או אפה פת בnon-Jew מהני למכרו חוץ מדמי prohibition שבו. Zivchei Tzedek או' ו'.
**** END BLOCK ****
```

### 6. `siman_110/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 8 — marker `_`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=8#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 8
marker: _
**** HEBREW ****
<b>ח) ודע  </b>דאם דבר האסור בהנאה נתן טעם בתבשיל פשיטא דמותר התבשיל בהנאה. שפ"ד שם. ועיין לעיל סי' פ"ז או' ו'.
**** ENGLISH ****
ח) ודע דאם דבר הforbidden in benefit נתן טעם בdish it is obvious דpermitted the dish in benefit. שפ"ד שם. ועיין above siman 87 או' ו'.
**** END BLOCK ****
```

### 7. `siman_110/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 9 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=9#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 9
marker: _
**** HEBREW ****
<b>ט) ודבר  </b>חשוב האוסר בהנאה דמוכר חוץ מדמי איסור שבו ודאי דבעינן למכור הכל ביחד אבל למכור חדא חדא ולהשליך האחרון או ישליך הראשונה אסור דשמא לוקח דמי איסור הנאה משא"כ כשמכרן ביחד ומוזיל לגבי העכו"ם אותו של איסור. שפ"ד שם. זב"צ או' ו'.
**** ENGLISH ****
ט) ודבר חשוב האוסר in benefit דמוכר חוץ מדמי prohibition שבו certainly דבעינן למכור הכל together אבל למכור חדא חדא ולהשליך האחרון או ישליך הראשונה forbidden דlest לוקח דמי prohibition הנאה משif so כשמכרן together ומוזיל לגבי הnon-Jew אותו של prohibition. שפ"ד שם. Zivchei Tzedek או' ו'.
**** END BLOCK ****
```

### 8. `siman_110/kereti/part-001.txt` — kereti — seif 1 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: א
**** HEBREW ****
במינו ורמ"א ואחרונים דעתם אפי' שלא במינם אינו בטלים והא דנקט במינו משום דאינו מינו לא שכיח שלא יהי' ניכר ויתוודע התערובות אבל אי יזדמן אף בא"מ לא בטלי ועמש"ל סימן ק"א ע"ש.
**** ENGLISH ****
במינו ורמ"א ואחרונים דעתם even שלא in their kind אינו are nullified והא דנקט במינו becauseאינו מינו לא common שלא יהי' ניכר ויתוודע התערובות אבל אי יזדמן even בא"מ לא בטלי ועמש"ל siman ק"א see there.
**** END BLOCK ****
```

### 9. `siman_110/kereti/part-001.txt` — kereti — seif 1 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ב
**** HEBREW ****
בכל שהוא מ"מ אית להו תקנתא שימכור לעכו"ם חוץ מדמי איסור שבהן אבל להשליך דמי הנאה לים המלח רוב פוסקים אוסרים חוץ בע"ז דתופסת דמיה ש"ך ופר"ח עיין פלתי וממש"ל דנראה שצריך דעכו"ם א"י שער המקח רק מאמין לישראל שאומר לו כך השער ומוזיל גבי' מקח משור הנסקל וכדומה. וא"כ ליכא החזקת טובה
**** ENGLISH ****
בכל שהוא nevertheless אית להו תקנתא שימכור לnon-Jew חוץ מדמי איסור שבהן אבל להשליך דמי הנאה לים הsalt רוב poskim אוסרים חוץ בע"ז דתופסת דמיה ש"ך וPeri Chadash עיין Peleti וממש"ל דit appears שצריך דnon-Jew א"י שער המקח רק מאמין לישראל שאומר לו כך השער ומוזיל גבי' מקח משור הנסקל וכדומה. וif so there is not הpresumption of טובה
**** END BLOCK ****
```

### 10. `siman_110/kereti/part-001.txt` — kereti — seif 1 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ג
**** HEBREW ****
חביות סתומות גדולות הן בערלה והן ביי"נ וכ"כ רמ"א לקמן זה בשלימים אבל לא בנחתכים דאז ליכא חשיבות
**** ENGLISH ****
חביות סתומות גדולות הן בערלה והן ביי"נ and so too רמ"א below זה בשלימים אבל לא בנחתכים דאז there is not חשיבות
**** END BLOCK ****
```

### 11. `siman_110/kereti/part-001.txt` — kereti — seif 1 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ד
**** HEBREW ****
של בעה"ב של תרומה וכלאי הכרם ולענין חמץ בפסח תלי' לדעת רשב"א לשיטת הואיל חמץ במשהו אף פרוסה אינו בטל ומכ"ש של נחתום והרא"ש חולק דלענין יבש ביבש לכ"ע בעינן דבר חשוב ובע"פ אחר חצות מודה רשב"א דבעינן ככרות של בע"ה והיינו לדעת דס"ל חמץ לא מיקרי דשיל"מ ע' פלתי
**** ENGLISH ****
של בעה"ב של תרומה וכלאי הכרם וregarding חמץ בפסח תלי' לדעת רשב"א לשיטת הואיל חמץ במשהו even פרוסה אינו בטל ומkli sheni של נחתום וRosh disagrees דregarding יבש ביבש לכ"ע בעינן דבר חשוב ובon the surface of אחר חצות מודה רשב"א דבעינן ככרות של בע"ה וthat is לדעת דס"ל חמץ לא מיקרי something that has a permitted aspect ע' Peleti
**** END BLOCK ****
```

### 12. `siman_110/kereti/part-001.txt` — kereti — seif 1 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ה
**** HEBREW ****
ובעלי חיים אע"פ דאסור מתחילת ברייתו וא"כ לא מיקרי ברי' מ"מ אסור משום ב"ח ואם נשחט בטל אבל האסור מתחלת ברייתו קרוי ברי' ואפי' במותו כל זמן שהוא שלם
**** ENGLISH ****
ובעלי חיים אon the surface of דforbidden מתחילת ברייתו וif so לא מיקרי ברי' nevertheless forbidden because ב"ח ואם was slaughtered בטל אבל הforbidden מתחלת ברייתו קרוי ברי' וeven במותו כל time שהוא שלם
**** END BLOCK ****
```

### 13. `siman_110/kereti/part-001.txt` — kereti — seif 1 — marker `ו`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ו
**** HEBREW ****
למנותן תמיד משא"כ ביצה דלפעמים מוכרין סל מלא בצים באומד וכ' רש"ל דעכשיו אין מצוי למכור כן ואפילו ביצה לא בטל וכרכשתא כתב מרדכי אף דנמכר במנין בטלה.
**** ENGLISH ****
למנותן תמיד משif so egg דלפעמים מוכרין סל מלא בצים באומד וwrote Rashal דnow אין מצוי למכור כן ואפילו egg לא בטל וכרכשתא wrote מרדכי even דנמכר במנין is nullified.
**** END BLOCK ****
```

### 14. `siman_110/kereti/part-001.txt` — kereti — seif 1 — marker `ז`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ז
**** HEBREW ****
ואזלינן לקולא עיין פלתי דהעלתי דרך משל יי"נ שנתערב בשאר יינות ויש בו חביות סתום ולא נודע אם הוא של יין נסך או יין כשר הרי אלו מחמירין דאולי יין נסך הוא ואוסר ולא בטל היותו דבר חשוב
**** ENGLISH ****
וwe follow the lenient view עיין Peleti דהעלתי by way of משל יי"נ שנתערב in other יינות ויש בו חביות סתום ולא נודע אם הוא של יין נסך או יין כשר הרי אלו are stringent דאולי יין נסך הוא ואוסר ולא בטל היותו דבר חשוב
**** END BLOCK ****
```

### 15. `siman_110/kereti/part-001.txt` — kereti — seif 2 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 2
marker: א
**** HEBREW ****
ונשחטו וכו' אפי' אחר שנודע התערובת
**** ENGLISH ****
וwas slaughteredו etc. even אחר שנודע התערובת
**** END BLOCK ****
```

### 16. `siman_110/kereti/part-001.txt` — kereti — seif 2 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 2
marker: ב
**** HEBREW ****
שאינו ראויה להתכבד הש"ך פי' דהוא לשון מושאל דראוי להתכבד לא שייך דהוי כבש בעורו רק כוונת רמ"א דבר שבמנין ועיין פלתי שבררתי אם לא נודע התערובת עד אחר שהפשיט עור מן בהמה ואז הוי חה"ל וכ"ש דכל זמן שלא הופשט היה יכול לברר הטריפ' א"כ לא שייך ביטול ולא בטל
**** ENGLISH ****
שאינו worthy of honor Shach פי' דהוא language of מושאל דראוי to honor לא שייך דהוי כבש בskinו רק כוונת רמ"א davar sheb'minyan ועיין Peleti שבררתי אם לא נודע התערובת עד אחר שהפשיט skin מן animal ואז הוי piece worthy of honor וkli sheni דכל time שלא הופשט היה יכול לברר הטריפ' if so לא שייך ביטול ולא בטל
**** END BLOCK ****
```

### 17. `siman_110/kereti/part-001.txt` — kereti — seif 3 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 3
marker: א
**** HEBREW ****
ואחד מוכרת נרא' דמיירי דמוכר טריפות בגלוי ויודעים הכל שזה החנות מוכר טריפות דאל"כ איך יתכן שאין יודע ממי לקח הלא המוכר לא מכר לו סתם דאטו ברשיעי עסקינן וכיון דאמר לו שהוא טריפה איך יתכן שאינו יודע ממי לקח ועכצ"ל דמיירי בחנות מפורס' וא"כ אין צ"ל לו שהיא טריפ' דהיא מפורסמ' בכך והוא שכח אח"כ אם לקח מהך חנות כלל ועמ"ש פלתי דאפשר דמיירי דאותו החנות הוא א"י או שבשעה שקנה לא ידע: שיש טריפות בחנות
**** ENGLISH ****
ואחד מוכרת נרא' דdeals with דמוכר טריפות בגלוי ויודעים הכל שזה החנות מוכר טריפות דאל"כ איך יתכן שאין יודע ממי לקח הלא המוכר לא מכר לו stam דאטו ברשיעי עסקינן וכיון דאמר לו שהוא tereifah איך יתכן שאינו יודע ממי לקח ועכone must say דdeals with בחנות מפורsixty וif so אין one must say לו שהיא טריפ' דהיא מפורסמ' בכך והוא שכח afterward אם לקח מהך חנות כלל ועwhat he wrote Peleti דאפשר דdeals with דאותו החנות הוא א"י or thatבשעה שקנה לא ידע: שיש טריפות בחנות
**** END BLOCK ****
```

### 18. `siman_110/kereti/part-001.txt` — kereti — seif 3 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 3
marker: ב
**** HEBREW ****
ביד א"י אבל אם נמצא ביד קטן מומח' שראוי לסמוך עליו בטרפו' ה"ל כנמצא ביד ישראל וטרפה פר"ח
**** ENGLISH ****
ביד א"י אבל אם is found ביד קטן מומח' שראוי לסמוך עליו בטרפו' ה"ל כis found ביד ישראל וטרפה Peri Chadash
**** END BLOCK ****
```

### 19. `siman_110/kereti/part-001.txt` — kereti — seif 3 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 3
marker: ג
**** HEBREW ****
מותר עמ"ש פלתי ועיקר דאותו חנות המוכר בשר טרפה הא א"י
**** ENGLISH ****
permitted עwhat he wrote Peleti ועיקר דאותו חנות המוכר meat טרפה הא א"י
**** END BLOCK ****
```

### 20. `siman_110/kereti/part-001.txt` — kereti — seif 3 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 3
marker: ד
**** HEBREW ****
אבל חז"ל אסרוהו. ע"ל סימן ס"ג באריכות גם בררתי שם אפילו נמצא קרוב לחנות טרפה מ"מ אזלינן בתר רוב וע"ש אם רוב דעלמא נמי מועיל או רק רוב אותו עיר ושכינה ע' שם מ"ש בשם הרשב"א.
**** ENGLISH ****
אבל חand these are his words אסרוהו. ע"ל siman seif 3 באריכות גם בררתי שם אפילו is found קרוב לחנות טרפה nevertheless אזלינן בתר רוב וsee there אם רוב דעלמא נמי מועיל או רק רוב אותו עיר ושכינה ע' שם what he wrote in name of Rashba.
**** END BLOCK ****
```

### 21. `siman_110/kereti/part-001.txt` — kereti — seif 3 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 3
marker: ה
**** HEBREW ****
אבל אם פירש דעת הר"ן בראינו פירשה בפנינו מ"מ לא הוי אלא קבוע דרבנן ובעל התרומה ורש"א ס"ל הואיל ונולד ספק במקום קביעת ה"ל קבוע דאורייתא
**** ENGLISH ****
אבל אם separated דעת Ran בראינו separatedה בפנינו nevertheless לא הוי אלא קבוע d'rabbanan ובעל התרומה ורש"א ס"ל הואיל ונולד doubt במקום קביעת ה"ל קבוע d'oraisa
**** END BLOCK ****
```

### 22. `siman_110/kereti/part-001.txt` — kereti — seif 4 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 4
marker: _
**** HEBREW ****
ונתערבה באחרות והקשו הא מחבר גופיה פוסק וכן רשב"א מרא דהך דינא דל"א ספק א' בגופו וא' בתערובות ועיין פלתי דיש לדחוק דמיירי דהך מוכר טריפות לא ניכר איזה בהמה וד"ת חד בתרי בטל וה"ל רק קבוע דרבנן אבל זה דוחק רק הנכון כמ"ש הש"ך קבוע חידוש ואין לך בו אלא חדושו ודי להטריף בחד ספיק' אבל לא בתרי ספיקא ועיין פלתי ולפי זה אם ט' מוכרות בשר נבילה וא' שחוטה והוה קבוע כמחצה על מחצה ונתערב באחרים אף המחבר מודה דלא מהני ס"ס דהא אדרבה זולת החידוש הוי ודאי איסורא דהא רובא איסורא
**** ENGLISH ****
וwas mixed באחרות והקשו הא מחבר גופיה פוסק וכן רשב"א מרא דהך the halachah דל"א doubt א' בגופו וא' בתערובות ועיין Peleti דיש לדחוק דdeals with דהך מוכר טריפות לא ניכר איזה animal וד"ת חד בתרי בטל וה"ל רק קבוע d'rabbanan אבל זה forced רק הנכון כwhat he wrote Shach קבוע חידוש ואין לך בו אלא חדושו ודי להטריף בחד ספיק' אבל לא בתרי ספיקא ועיין Peleti ולפי זה אם ט' מוכרות meat nevelah וא' שחוטה והוה קבוע כמחצה על מחצה ונתערב באחרים even Mechaber מודה דלא מהני end of seif דהא אדרבה זולת החידוש הוי certainly איסורא דהא רובא איסורא
**** END BLOCK ****
```

### 23. `siman_110/kereti/part-001.txt` — kereti — seif 5 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: א
**** HEBREW ****
אלא לאחר שפירש ואם מכר כל בהמה קודם שנתוודע הטריפ' דעת הרב בעל דרכי נועם דאותן אנשים שקנו באחרונה הבשר טריפה ועיין פלתי שכתבתי דהכל מותר וכן עמא דבר
**** ENGLISH ****
אלא לאחר שseparated ואם מכר כל animal קוblood שנתוודע הטריפ' דעת הרב בעל דרכי נועם דאותן אנשים שקנו באחרונה הmeat tereifah ועיין Peleti שI wrote דהכל permitted וכן עמא דבר
**** END BLOCK ****
```

### 24. `siman_110/kereti/part-001.txt` — kereti — seif 5 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: ב
**** HEBREW ****
שאין הכל בקיאין משמע הא מדינא מותר דלא שייך קבוע אעפ"י שהוחזק איסור במקולין הואיל ואין איסור ניכר לא שייך קבוע והב"ח דעתו כטור דמ"מ שייך קבוע וא"כ מדינא אסור ועיין פלתי ובבהמה נראה ודאי דלא מקרי קבוע אבל אדם באדם דלא שייך ביטול נראה דהוי קבוע אפילו אינו ניכר ומ"מ דעת רמ"א נראה בא' מבהמות לכאורה כב"ח ועיין פלתי שיש לדחוק דגם רמ"א ס"ל כן שיהי' ניכר האיסור
**** ENGLISH ****
שאין הכל בקיאין it appears הא מthe halachah permitted דלא שייך קבוע אעפ"י שהוחזק איסור במקולין הואיל ואין איסור ניכר לא שייך קבוע וBach דעתו כטור דnevertheless שייך קבוע וif so מthe halachah forbidden ועיין Peleti ובanimal it appears certainly דלא מקרי קבוע אבל אblood באblood דלא שייך ביטול it appears דהוי קבוע אפילו אינו ניכר וnevertheless דעת רמ"א it appears בא' מבהמות it appears כב"ח ועיין Peleti שיש לדחוק דגם רמ"א ס"ל כן שיהי' ניכר האיסור
**** END BLOCK ****
```

### 25. `siman_110/kereti/part-001.txt` — kereti — seif 5 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: ג
**** HEBREW ****
הכל דעת הט"ז צלע א' שנחתכה לשני חלקים אחד גדול וחה"ל ואחד קטן ואין ר"ל ששניהם אינו בטלים ופר"ח חולק דקטנה ב טל ועמ"ש פלתי ראי' לט"ז ומכל מקום לדינא הנכון כפר"ח גם עובדא בצלע שנחלקה לשנים וחצי נלקח קודם שנולד הספק וחצי לאחר לידת ספק והסכמתי כפר"ח דראשונה כשרה ושניה טרפה
**** ENGLISH ****
הכל דעת Taz צלע א' שנחתכה לשני disagreedים אחד גדול וpiece worthy of honor ואחד קטן ואין ר"ל שboth of them אינו are nullified וPeri Chadash disagrees דקטנה ב טל ועwhat he wrote Peleti ראי' לט"ז ומכל מקום לthe halachah הנכון כPeri Chadash גם עובדא בצלע שנdisagreedה לשנים וחצי נלקח קוblood שנולד הdoubt וחצי לאחר לידת doubt והסכמתי כPeri Chadash דראשונה כשרה ושניה טרפה
**** END BLOCK ****
```

### 26. `siman_110/kereti/part-001.txt` — kereti — seif 5 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: ד
**** HEBREW ****
בקיאין היינו במקולין אבל בביתו אין לאסור חתיכה שאין ר"ל ב"ח ופר"ח
**** ENGLISH ****
בקיאין that is במקולין אבל in the houseו אין לforbidden חתיכה שאין ר"ל ב"ח וPeri Chadash
**** END BLOCK ****
```

### 27. `siman_110/kereti/part-001.txt` — kereti — seif 6 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 6
marker: א
**** HEBREW ****
אחר שנודע אבל קודם ה"ל קודם שנולד הספק ולא גזרינן דיקח מקבוע
**** ENGLISH ****
אחר שנודע אבל קוblood ה"ל קוblood שנולד הdoubt ולא גזרינן דיקח מקבוע
**** END BLOCK ****
```

### 28. `siman_110/kereti/part-001.txt` — kereti — seif 6 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 6
marker: ב
**** HEBREW ****
פירשו ממיל' היינו שלא בפנינו אבל בפנינו יש אומרים דהוה קבוע דרבנן ויש אומרים דהוי דאורייתא ועיין פלתי
**** ENGLISH ****
separatedו ממיל' that is שלא בפנינו אבל בפנינו יש אומרים דהוה קבוע d'rabbanan ויש אומרים דהוי d'oraisa ועיין Peleti
**** END BLOCK ****
```

### 29. `siman_110/kereti/part-001.txt` — kereti — seif 6 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 6
marker: ג
**** HEBREW ****
והא דאסור וכו' ופר"ח ומהרש"ל ביקשו לתרץ דלכך פסק המחבר לעיל סי' ע"ז באו"ב שנתערב דלכבשינהו הואיל והוא דבר שיש לו מתירין דלמחר מותר לא חיישינן דיקח מקבוע ועיין פלתי.
**** ENGLISH ****
והא דforbidden etc. וPeri Chadash וMaharshal ביקשו לתרץ דלכך ruled Mechaber above סי' ע"ז באו"ב שנתערב דלכבשינהו הואיל והוא something that has a permitted aspect דלtomorrow permitted לא we are concerned דיקח מקבוע ועיין Peleti.
**** END BLOCK ****
```

### 30. `siman_110/kereti/part-001.txt` — kereti — seif 6 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 6
marker: ד
**** HEBREW ****
הביצה מותרת דהוי פריש ומרובא פריש ולא גזרינן דיקח מקבוע דמביצה לתרנגולת לא גזרינן ש"ך. ולדידן דקיימ"ל בפי' ממילא לא גזרינן שמא יקח וכו' בלא"ה לא קשה דהא כאן הוא פי' ממילא
**** ENGLISH ****
הegg permittedת דהוי fruitש ומרובא fruitש ולא גזרינן דיקח מקבוע דמegg לpoultry לא גזרינן ש"ך. וfor us דקיימ"ל בפי' automatically לא גזרינן lest יקח etc. without"ה לא קשה דהא כאן הוא פי' automatically
**** END BLOCK ****
```

### 31. `siman_110/kereti/part-001.txt` — kereti — seif 6 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 6
marker: ה
**** HEBREW ****
מותרת נראה אם הביצה ג"כ דבר חשוב מ"מ מותר דהא מרובא פריש ורוב כשרים ולפ"ז צריך שלא יהיה רואה מטלת ביצים דאז ה"ל ראה ופי' אסור דה"ל לוקח מן קבוע אבל במקום שאין ביצה חשוב א"כ ממילא בטל אפילו פירש לפנינו דאין כאן תערובת
**** ENGLISH ****
permittedת it appears אם הegg ג"כ דבר חשוב nevertheless permitted דהא מרובא fruitש ורוב כשרים וaccordingly צריך שלא יהיה רואה מטלת ביצים דאז ה"ל ראה ופי' forbidden דה"ל לוקח מן קבוע אבל במקום שאין egg חשוב if so automatically בטל אפילו separated לפנינו דאין כאן תערובת
**** END BLOCK ****
```

### 32. `siman_110/kereti/part-001.txt` — kereti — seif 7 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=7#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 7
marker: א
**** HEBREW ****
א' מהן דעת תה"ד להכשיר בנאכל דלא שייך אטו מזיד והש"ך חולק ויש להחמיר
**** ENGLISH ****
א' מהן דעת תה"ד להכשיר בנאכל דלא שייך אטו מזיד וShach disagrees ויש להחמיר
**** END BLOCK ****
```

### 33. `siman_110/kereti/part-001.txt` — kereti — seif 7 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=7#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 7
marker: ב
**** HEBREW ****
או נפל וזהו אם לא פירש אבל אם פירש שאתה קורא עלי' שם היתר דמרובא קפריש א"כ אם נפל אח"כ לים האחריני באיסורי קיימי ש"ך והמנחת כהן פי' דוקא שפירש לאחר שנודע אבל אם פי' קודם שנודע תערובת ונפל לים הכל מותר וכ"כ פרי חדש
**** ENGLISH ****
או fell וזהו אם לא separated אבל אם separated שאתה קורא עלי' שם היתר דמרובא קfruitש if so אם fell afterward לים האחריני באיסורי קיימי ש"ך והמנחת כהן פי' specifically שseparated לאחר שנודע אבל אם פי' קוblood שנודע תערובת וfell לים הכל permitted and so too fruit חדש
**** END BLOCK ****
```

### 34. `siman_110/kereti/part-001.txt` — kereti — seif 7 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=7#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 7
marker: ג
**** HEBREW ****
שנאבד וכו' דוקא דאינו כלל בעולם אבל בישנו בעולם אף על פי שאין לפנינו ואין מצוי כעת רק יש לחוש שיבא לעולם ונצטרך לדון עליו תו לא תלינן בי'
**** ENGLISH ****
שנאבד etc. specifically דאינו כלל בעולם אבל בישנו בעולם even על פי שאין לפנינו ואין מצוי כעת רק יש לחוש שיבא לעולם ונצטרך לדון עליו תו לא תלינן בי'
**** END BLOCK ****
```

### 35. `siman_110/kereti/part-001.txt` — kereti — seif 7 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=7#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 7
marker: ד
**** HEBREW ****
שתים ואם נתערב ב' בג' מותר לאכול ג' דאיכא ודאי היתר תוך אכילתו דהא אין באיסור יותר מב':
**** ENGLISH ****
שתים ואם נתערב ב' בג' permitted לאכול ג' דthere is certainly היתר תוך אכילתו דהא אין באיסור יותר מב':
**** END BLOCK ****
```

### 36. `siman_110/kereti/part-001.txt` — kereti — seif 8 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=8#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 8
marker: _
**** HEBREW ****
להתיר ס"ס והש"ך כתב דרוב פוסקים מתירים אפי' בשם ה"ס והקשה ש"ך דלקמן סי' ק"מ מתיר אפי' בב' ספיקות ותירץ הש"ך לחלק בין דבר שלא שייך בי' אכילה רק הנאה ועיין פלתי:
**** ENGLISH ****
להתיר end of seif וShach wrote דרוב poskim מתירים even in name of ה"ס וchallenged ש"ך דbelow סי' ק"מ מתיר even בב' ספיקות וresolved Shach לdisagreed בין דבר שלא שייך בי' אכילה רק הנאה ועיין Peleti:
**** END BLOCK ****
```

### 37. `siman_110/kereti/part-001.txt` — kereti — seif 9 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=9#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 9
marker: א
**** HEBREW ****
ונודעו היינו דב' ספיקות בגופו אבל אם היה רק חד בגופו רק לא נודע עד שנתוודע ספק בתערובות מכל מקום לא מהני כיון דחד בגופו ואחד בתערובות:
**** ENGLISH ****
ונודעו that is דב' ספיקות בגופו אבל אם היה רק חד בגופו רק לא נודע עד שנתוודע doubt בתערובות מכל מקום לא מהני כיון דחד בגופו ואחד בתערובות:
**** END BLOCK ****
```

### 38. `siman_110/kereti/part-001.txt` — kereti — seif 9 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_110/kereti/part-001.txt#slug=kereti#seif=9#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 9
marker: ב
**** HEBREW ****
כגון עוף דין זה צ"ע כי אין קרוי חזקת איסור כי עוף בחזקת איסור לענין אמ"ה אבל לא לענין טריפות:
**** ENGLISH ****
כגון fowl דין זה requires study כי אין קרוי presumption of איסור כי fowl בpresumption of איסור regarding אמ"ה אבל לא regarding טריפות:
**** END BLOCK ****
```

### 39. `siman_110/mateh-yehonatan/part-001.txt` — mateh-yehonatan — seif 1 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=1#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: mateh-yehonatan
seif: 1
marker: _
**** HEBREW ****
(סימן ק"י בש"ע סעיף א') <b>דבר חשוב אוסר במינו בכ"ש כו'</b>. והנה הרב בעל פרי תואר ר"ל הא דד"ח ל"ב היינו בדבר שאסור בהנאה אבל במידי דאסור רק באכילה אפילו ד"ח בטיל ודבריו אין להבין כלל דהא מצינו בעלי חיים ל"ב אפילו דבר שאינו אסור רק באכילה דבדרוסה שנתערב פסק ר"ת דמותר ע"י שיכבשינהו דניידי ואמרי' כל דפריש כו' משמע בלא"ה בעלי חיים ל"ב אע"פ שאין אסור בהנאה:
**** ENGLISH ****
(siman 110) דבר חשוב אוסר במינו בkli sheni etc.. והנה הרב בעל fruit תואר ר"ל הא דד"ח ל"ב that is בדבר שforbidden in benefit אבל במידי דforbidden רק באכילה אפילו ד"ח nullified ודבריו אין להבין כלל דהא מצינו בעלי חיים ל"ב אפילו דבר שאינו forbidden רק באכילה דבדרוסה שנתערב ruled ר"ת דpermitted ע"י שיכבשינהו דניידי ואמרי' כל דfruitש etc. it appears without"ה בעלי חיים ל"ב אon the surface of שאין forbidden in benefit:
**** END BLOCK ****
```

### 40. `siman_110/mateh-yehonatan/part-001.txt` — mateh-yehonatan — seif 2 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: mateh-yehonatan
seif: 2
marker: _
**** HEBREW ****
(שם סעיף א') <b>אבל שאר דברים אע"פ שדרכן לימנות כו'</b>. ז"ל הרמב"ם ומקשה עליו מהא דפרק הערל דף פ"ב מי שה"ל חבילי תלתן של כלאי כרם ידלקו נתערבו באחרות ואחרות באחרות כולן ידלקו דר"מ וחכ"א יעלו בא' ומאתים שהיה ר"מ אומר כל שדרכו למנות שנינו א"כ כיון דר"י ור"ל פליגי בדבר שבמנין אי את שדרכו למנות או כל שדרכו למנות שנינו ש"מ ד"ד שבמנין ל"ב א"כ איך פירש הרמב"ם והמחבר נגד ר"י ור"ל וי"ל (הא דפליג) דהנה הא דכתב הרמב"ם כל דבר שהוא חשוב אצל בני אדם במקום מהמקומות כאגוזי פרך ורמוני בדן בא"י כו' א"כ י"ל דפליגי ר"ל ור"י אליביה דרבנן דס"ל ד"ח ל"ב א"כ ס"ל לרבנן דדבר שבמנין הוא בטיל והיינו כיון שאין המנין תלוי בחשיבותיהן כלל רק מחמת הקנין שהמנין מודיע מקח אבל אם הוא דבר שנמכר באומד ובתוך אותו מין יש מין א' שנמכר במנין ד"מ אגוזי פרך דשאר אגוזים נמכרים באומד ואגוזי פרך במנין א"כ ודאי מחמת שהם חשובין יותר משאר אגוזים נמכרים במנין וגם לרבנן ל"ב ולא מחמת דבר שבמנין אלא מחמת שהוא דבר חשוב לפ"ז י"ל דר"י ור"ל פליגי אליבא דרבנן דר"י ס"ל דוקא אם הוא את שדרכו למנות הוי ד"ח אבל אם אותו מין דהיינו אגוזי פרך נמכרים לפעמים באומד לא הוי דבר חשוב ור"ל ס"ל אפילו כה"ג נמי הוי דבר חשוב ולק"מ על המחבר והרמב"ם וק"ל:
**** ENGLISH ****
(שם seif א') אבל שאר דברים אon the surface of שדרכן לימנות etc.. and these are his words Rambam ומקשה עליו מהא דפרק הערל daf chapter 2 מי שה"ל חבילי תלתן של כלאי כרם ידלקו were mixed באחרות ואחרות באחרות כולן ידלקו דר"מ וחכ"א יcame up בא' ומאתים שהיה ר"מ אומר כל שדרכו למנות שנינו if so כיון דר"י ור"ל פליגי בdavar sheb'minyan אי את שדרכו למנות או כל שדרכו למנות שנינו ש"מ ד"ד שבמנין ל"ב if so איך separated Rambam וMechaber נגד ר"י ור"ל and one may say (הא דפליג) דהנה הא דwrote Rambam כל דבר שהוא חשוב אצל בני אblood במקום מהמקומות כאגוזי פרך ורמוני בדן בא"י etc. if so י"ל דפליגי ר"ל ור"י אליביה d'rabbanan דס"ל ד"ח ל"ב if so ס"ל according to Ravנן דdavar sheb'minyan הוא nullified וthat is כיון שאין המנין תלוי בחשיבותיהן כלל רק מחמת הקנין שהמנין מודיע מקח אבל אם הוא דבר שנמכר באומד ובתוך אותו מין יש מין א' שנמכר במנין ד"מ אגוזי פרך דשאר אגוזים נמכרים באומד ואגוזי פרך במנין if so certainly מחמת שהם חשובין יותר משאר אגוזים נמכרים במנין וגם according to Ravנן ל"ב ולא מחמת davar sheb'minyan אלא מחמת שהוא דבר חשוב accordingly י"ל דר"י ור"ל פליגי according to d'rabbanan דר"י ס"ל specifically אם הוא את שדרכו למנות הוי ד"ח אבל אם אותו מין that is אגוזי פרך נמכרים לפעמים באומד לא הוי דבר חשוב ור"ל ס"ל אפילו such a case נמי הוי דבר חשוב ולק"מ על Mechaber וRambam וinvestigate:
**** END BLOCK ****
```

### 41. `siman_110/mateh-yehonatan/part-001.txt` — mateh-yehonatan — seif 3 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: mateh-yehonatan
seif: 3
marker: _
**** HEBREW ****
(שם סעיף ב') <b>ודוקא בעלי חיים קטנים כו'</b>. עש"ך ס"ק י"ג וי"ל בהי' ק"א ס"ק כ"ו והיה נראה לאדמ"ו דש"ה כיון דמעיקרא הוי ב"ח ול"ב א"כ יהיה אח"כ ראוי להתכבד אף שאין ראוי עכשיו להתכבד דמחוסר מעשה אפ"ה ל"ב. וי"ל ראיה לסברא זו מהא דפ' התערובת דף ע"ג דפריך ונכבשינהו דניידי ושמא כל דפריש מרובא פריש ומשני גזירה שמא יבואו עשרה כהנים בב"א ויקרבו א"ל האי מדרבנן אלא מעתה מגופא אסור' אלא שמא יבואו עשרה כהנים בב"א ויקחו כו'. והנה לכאורה מאי קאמר בתחלה שמא יבואו וכו' הא דעודו בחיים ליכא חשש כלל לפי מה דס"ד השתא וליכא חשש אלא אחר מיתה ואחר מיתה אמאי לא יהיה בטיל אע"כ צ"ל כיון שכבר היה ב"ח ואחר הפשט וניתוח יהי' חה"ל ל"ב וכמ"ש:
**** ENGLISH ****
(שם seif ב') investigateא בעלי חיים קטנים etc.. עש"ך s.k. י"ג and one may say בהי' ק"א s.k. כ"ו והיה it appears לאדמ"ו דש"ה כיון דinnardsקרא הוי ב"ח ול"ב if so יהיה afterward ראוי to honor even שאין ראוי now to honor דמחוסר מעשה even so ל"ב. and one may say proof לסברא זו מהא דפ' התערובת daf ע"ג דfruitך ונכבשינהו דניידי וlest כל דfruitש מרובא fruitש ומשני גזירה lest יבואו עשרה כהנים בב"א ויקרבו and some say האי d'rabbanan אלא מעתה מגופא forbidden' אלא lest יבואו עשרה כהנים בב"א ויקחו etc.. והנה it appears מאי קאמר בתחלה lest יבואו etc. הא דעודו בחיים there is not חשש כלל לפי מה דס"ד now וthere is not חשש אלא אחר מיתה ואחר מיתה אמאי לא יהיה nullified אuntil here one must say כיון שכבר היה ב"ח ואחר הפשט וניתוח יהי' piece worthy of honor ל"ב וכwhat he wrote:
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_110
npm run pipeline:editorial:advance -- --siman 110
```

## Checkpoint ids

siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=3#marker=_
siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=4#marker=_
siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=5#marker=_
siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=6#marker=_
siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=7#marker=_
siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=8#marker=_
siman_110/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=9#marker=_
siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%90
siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%91
siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%92
siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%93
siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%94
siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%95
siman_110/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%96
siman_110/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%90
siman_110/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%91
siman_110/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%90
siman_110/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%91
siman_110/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%92
siman_110/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%93
siman_110/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%94
siman_110/kereti/part-001.txt#slug=kereti#seif=4#marker=_
siman_110/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%90
siman_110/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%91
siman_110/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%92
siman_110/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%93
siman_110/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%90
siman_110/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%91
siman_110/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%92
siman_110/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%93
siman_110/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%94
siman_110/kereti/part-001.txt#slug=kereti#seif=7#marker=%D7%90
siman_110/kereti/part-001.txt#slug=kereti#seif=7#marker=%D7%91
siman_110/kereti/part-001.txt#slug=kereti#seif=7#marker=%D7%92
siman_110/kereti/part-001.txt#slug=kereti#seif=7#marker=%D7%93
siman_110/kereti/part-001.txt#slug=kereti#seif=8#marker=_
siman_110/kereti/part-001.txt#slug=kereti#seif=9#marker=%D7%90
siman_110/kereti/part-001.txt#slug=kereti#seif=9#marker=%D7%91
siman_110/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=1#marker=_
siman_110/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=2#marker=_
siman_110/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=3#marker=_