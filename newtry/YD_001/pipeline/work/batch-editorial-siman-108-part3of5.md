# Editorial retranslation — Siman 108 (part 3/5)

Generated: 2026-06-13T19:16:52.267Z

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

### 1. `siman_108/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 3 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 3
marker: _
**** HEBREW ****
<b>ג) ריח  </b>פת בפת מותר. תו"ח כלל ל"ה דין ג' ואפי' אם הפת בלול בשמן. מנ"י על התו"ח שם או' י"א. ודוקא שמן מיקרי כתוש ולא מפטם. אבל שומן מפטם. מש"ז או' א' ועיין לקמן או' ל'.
**** ENGLISH ****
ג) ריח פת בפת permitted. תו"ח כלל ל"ה דין ג' וeven אם הפת בלול בשמן. מנ"י על התו"ח שם או' י"א. investigateא שמן מיקרי כתוש ולא מפטם. אבל שומן מפטם. מש"ז או' א' ועיין below או' ל'.
**** END BLOCK ****
```

### 2. `siman_108/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 4 — marker `_`

- Quality: **error** — hebrew_in_english, untranslated_copy
- Checkpoint id: `siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 4
marker: _
**** HEBREW ****
<b>ד) ואם  </b>אפו חמץ עם מצה עיין באו"ח סי' תס"א סעי' ה' ובדברינו לשם כמה חלוקים יעו"ש.
**** ENGLISH ****
ד) ואם אפו חמץ עם מצה עיין באו"ח סי' תס"א סעי' ה' ובדברינו לשם כמה חלוקים יעו"ש.
**** END BLOCK ****
```

### 3. `siman_108/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 5 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 5
marker: _
**** HEBREW ****
<b>ה) מקום  </b>שנוהגין שלא לאכול פת של גוים אין לחוש אם נאפה בתנור א' מכמה טעמים אי משום דאין ריח מפת לפת אי משום דכיון דאין איסורו אלא מדרבנן לא גזרינן. כנה"ג בהגה"ט או' ך' זב"צ או' ב'.
**** ENGLISH ****
ה) מקום שנוהגין שלא לאכול פת של גוים אין לחוש אם נאפה בoven א' מכמה טעמים אי becauseאין ריח מפת לפת אי becauseכיון דאין איסורו אלא d'rabbanan לא גזרינן. Knesset HaGedolah בהגה"ט או' ך' Zivchei Tzedek או' ב'.
**** END BLOCK ****
```

### 4. `siman_108/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 6 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 6
marker: _
**** HEBREW ****
<b>ו) וחלה  </b>שלנו שהיא רק מדרבנן מותר לכתחלה לאפותה עם הפת ואפי' אם נגעה החלה בחולין אם יש בככר החולין פי שנים כמוהו. או"ה כלל ט"ל דין כ"ד. כנה"ג שם או' כ"א. לה"פ או' א' בל"י סוף או' א' ומשמע דכ"ש דמותר לשרוף החלה בתנור שאופין בו פת. ועיין לקמן בהגה ססי' שכ"ב ובדברינו לאו"ח סי' תנ"ז או' מ' יעו"ש.
**** ENGLISH ****
ו) וחלה שלנו שהיא רק d'rabbanan permitted לat first לאפותה עם הפת וeven אם נגעה החלה בחולין אם יש בככר החולין פי שנים כמוהו. Issur VeHeter כלל ט"ל דין so too. Knesset HaGedolah שם או' כ"א. Lechem HaPanim או' א' Binyamin Zeev סוף או' א' וit appears דkli sheni דpermitted לשרוף החלה בoven שאופין בו פת. ועיין below בהגה ססי' שכ"ב ובדברינו לאו"ח סי' תנ"ז או' מ' יעו"ש.
**** END BLOCK ****
```

### 5. `siman_108/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 7 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 7
marker: _
**** HEBREW ****
<b>ז) ומותר  </b>לצלות כבד בתנור עם תבשיל לכתחלה למ"ד ריחא מילתא דכל דם כחוש הוא. תה"ד בפסקים וכתבים סי' ע"ו והב"ד ב"י סי' צ"ז וכתב ואין טעמו נראה בעיניו. מיהו מהר"י מינץ בתשו' סי' ט"ו פסק כהתה"ד והב"ד ד"מ בסי' זה. וכתב הש"ך סק"א הא דכתב ב"י דאין טעמו נראה בעיניו ה"ד בתבשיל שמן אבל כששניהם כחושים ודאי דהב"י לא פליג יעו"ש. וכ"כ לעיל או' א'.
**** ENGLISH ****
ז) וpermitted לצלות liver בoven עם dish לat first למ"ד ריחא מילתא דכל blood כחוש הוא. תה"ד בruledים וכתבים סי' ע"ו והב"ד ben yomo סי' צ"ז וwrote ואין טעמו it appears בעיניו. מיהו מהר"י מינץ בתשו' סי' ט"ו ruled כהתה"ד והב"ד ד"מ בסי' זה. וwrote Shach סק"א הא דwrote ben yomo דאין טעמו it appears בעיניו ה"ד בdish שמן אבל כשboth of them כחושים certainly דBeit Yosef לא פליג יעו"ש. and so too above או' א'.
**** END BLOCK ****
```

### 6. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `א`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: א
**** HEBREW ****
אין צולין וכו' אעפ"י דקיימ"ל ריחא לאו מילתא מ"מ לכתחילה אסור ועמ"ש פלתי
**** ENGLISH ****
אין צולין etc. אעפ"י דקיימ"ל ריחא לאו מילתא nevertheless l'chatchila forbidden ועwhat he wrote Peleti
**** END BLOCK ****
```

### 7. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ב
**** HEBREW ****
בשר העלו האחרונים דוקא כשאחד מהן או איסור או היתר שמן דאזל היתר ומפטם לאיסור אע"ג דאין הנאסר יכול וכו' גבי ריח אמרינן דמפטם היתר לאיסור אבל בשניהם כחושים אף לכתחילה מותר דלא כרמ"א בת"ח דאוסר אף לכתחילה ועמ"ש פלתי דיש להחמיר לכתחילה
**** ENGLISH ****
meat הcame up האחרונים specifically כשאחד מהן או איסור או היתר שמן דאזל היתר ומפטם לאיסור even though דאין הנאסר יכול etc. גבי ריח אמרינן דמפטם היתר לאיסור אבל בboth of them כחושים even l'chatchila permitted דלא כרמ"א Turei Chayim דאוסר even l'chatchila ועwhat he wrote Peleti דיש להחמיר l'chatchila
**** END BLOCK ****
```

### 8. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ג
**** HEBREW ****
הרי זה מותר והא דלעיל סימן צ"ו פת שאפה עם צלי אסור לאכול בכותח התם הוי כלכתחילה דהפת יכול לאכול לכל דבר לצלי וכדומה ולכך אסור
**** ENGLISH ****
הרי זה permitted והא דabove siman צ"ו פת שאפה עם צלי forbidden לאכול בkutach התם הוי כl'chatchila דהפת יכול לאכול לכל דבר לצלי וכדומה ולכך forbidden
**** END BLOCK ****
```

### 9. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ד
**** HEBREW ****
מחזיק י"ב עשרונים היינו כמו בזמן התלמוד שהיה מדביקים הלחם בדופן התנור וא"כ בכל ארבע הדפנות היה מדביקין וא"כ אם בכל ד' דפנות היה יכול לדבק ביחד י"ב עשרונים הרי זו תנור גדול וכך היה קבלה מקדמונים שתנור גדול שיעורו י"ב עשרונים ולכך לא נתנו שיעור בגובה דזה ממעט הריח דכיון דכל הדפנות. מצטרפים וא"כ אם התנור גבוה דפנות התנור גדול ונבדק בהן לחם רב ואם התנור נמוך יקטנו הדפנות ודבקיות הלחם וא"כ כשיעור י"ב עשרונים הכל בכלל ואין שיעור כלל וכלל לרוחב וגובה התנורים
**** ENGLISH ****
מחזיק י"ב עשרונים that is כמו בtime התלמוד שהיה מדביקים הלחם בwall הoven וif so בכל ארבע הדפנות היה מדביקין וif so אם בכל ד' דפנות היה יכול לדבק together י"ב עשרונים הרי זו oven גדול וכך היה קבלה מקדמונים שoven גדול שיskinו י"ב עשרונים ולכך לא they placed שיskin בגובה דזה ממעט הריח דכיון דכל הדפנות. מצטרפים וif so אם הoven גבוה דפנות הoven גדול ונבדק בהן לחם רב ואם הoven נמוך יקטנו הדפנות ודבקיות הלחם וif so כשיskin י"ב עשרונים הכל בכלל ואין שיskin כלל וכלל לרוחב וגובה הovenים
**** END BLOCK ****
```

### 10. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ה
**** HEBREW ****
ופיו פתוח דעת הפר"ח להקל אפילו פתוח במקום שעשן יוצא ונכון הוא דהא הריח יוצא דרך החור ההוא לחוץ ונתמעט
**** ENGLISH ****
ופיו פתוח דעת הPeri Chadash to be lenient אפילו פתוח במקום שעשן יוצא ונכון הוא דהא הריח יוצא by way of החור ההוא לחוץ ונתמעט
**** END BLOCK ****
```

### 11. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `ו`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ו
**** HEBREW ****
ואינה נוגעי' עיין פלתי דאם נוגעים לא שאוסר כדי נטילה כדין איסור חם רק אסור כולו משום ריחא מילתא ועיין פלתי:
**** ENGLISH ****
ואינה נוגעי' עיין Peleti דאם נוגעים לא שאוסר the measure of נטילה the measure ofן איסור חם רק forbidden כולו because ריחא מילתא ועיין Peleti:
**** END BLOCK ****
```

### 12. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `ז`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ז
**** HEBREW ****
אין לו פת אחר והוא גברא דלא יכול לאכול פת לבדו או יש לו דבר בחלב שא"א לאוכלו בלא פת אם כן אם לא יאכל יפסיד מאכל החלב ה"ל דיעבד ושרי כן דעת רמ"א ודלא כפר"ח והא דשיעור תנור מחזיק י"ב עשרונים היינו מצה דאופן מי"ב עשרונים קמח מצות ולא חמץ ועמ"ש פלתי.
**** ENGLISH ****
אין לו פת אחר והוא גברא דלא יכול לאכול פת לבדו או יש לו דבר בחלב שא"א לאוכלו without פת if so אם לא יאכל יפlime מאכל the milk ה"ל דיעבד ושרי כן דעת רמ"א ודלא כPeri Chadash והא דשיskin oven מחזיק י"ב עשרונים that is מצה דאופן מי"ב עשרונים flour מצות ולא חמץ ועwhat he wrote Peleti.
**** END BLOCK ****
```

### 13. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `ח`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%97`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ח
**** HEBREW ****
דבר חריף או שנעשה לריח אוסר אפילו בתנור גדול ופי התנור פתוח או"ה:
**** ENGLISH ****
דבר sharp or thatנעשה לריח אוסר אפילו בoven גדול ופי הoven פתוח Issur VeHeter:
**** END BLOCK ****
```

### 14. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `ט`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%98`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ט
**** HEBREW ****
אפילו בדיעבד ופר"ח מסכים למהרש"ל להכשיר בדיעבד וכן הסכמתי בפלתי:
**** ENGLISH ****
אפילו b'dieved וPeri Chadash agrees לMaharshal להכשיר b'dieved וכן הסכמתי בPeleti:
**** END BLOCK ****
```

### 15. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `י`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%99`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: י
**** HEBREW ****
בדיעבד ומתוך דברי המ"א בסי' תמ"ז דטרח למצוא דבר חריף בפסח שהוא בארש"ט ש"מ דס"ל דחומץ שכר לא מיקרי דבר חריף ועמש"ל סי' ק"ג:
**** ENGLISH ****
b'dieved ומתוך דברי המ"א בסי' תמ"ז דטרח למצוא דבר sharp בפסח שהוא בארש"ט ש"מ דס"ל דחומץ שכר לא מיקרי דבר sharp ועמש"ל siman 103:
**** END BLOCK ****
```

### 16. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `כ`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%9B`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: כ
**** HEBREW ****
אפילו בבצק היינו שלא נילוש הבצק בשומן הא נילוש אסור אחרונים:
**** ENGLISH ****
אפילו בבצק that is שלא נילוש הבצק בשומן הא נילוש forbidden אחרונים:
**** END BLOCK ****
```

### 17. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `ל`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%9C`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ל
**** HEBREW ****
פת עם הבשר דעת הש"ך אם אינו כעין תורא דשרי לעיל סי' צ"ז אסור לאוכלו לגמרי ודעת פר"ח להקל בריחא ובהגהת ש"ד משמע כש"ך.
**** ENGLISH ****
פת עם הmeat דעת Shach אם אינו כעין תורא דשרי above סי' צ"ז forbidden לאוכלו לגמרי ודעת Peri Chadash to be lenient בריחא ובHagahot ShaDa it appears כש"ך.
**** END BLOCK ****
```

### 18. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `מ`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%9E`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: מ
**** HEBREW ****
אפילו כל מה שבתנור דהא הריח הוא מתפשט לכל אפילו לא נגע והוא הדין צירוף לבטל:
**** ENGLISH ****
אפילו כל מה שבoven דהא הריח הוא מתפשט לכל אפילו לא נגע והוא הדין brothוף לבטל:
**** END BLOCK ****
```

### 19. `siman_108/kereti/part-001.txt` — kereti — seif 1 — marker `נ`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%A0`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: נ
**** HEBREW ****
ויש אומרים שאין לחלק ודעת המ"א בסי' תמ"ז להחמיר בחמץ של פסח ואני הארכתי לדחות ראיה שלו:
**** ENGLISH ****
ויש אומרים שאין לdisagreed ודעת המ"א בסי' תמ"ז להחמיר בחמץ של פסח ואני I expanded לדחות proof שלו:
**** END BLOCK ****
```

### 20. `siman_108/kereti/part-001.txt` — kereti — seif 2 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 2
marker: _
**** HEBREW ****
לבשלם וצלי קדר או כלי שמטמינים בשבת דעת הפר"ח להקל ועיין מה שכתבתי פלתי להחמיר:
**** ENGLISH ****
לבשלם וצלי קדר או כלי שמטמינים בשבת דעת הPeri Chadash to be lenient ועיין מה שI wrote Peleti להחמיר:
**** END BLOCK ****
```

### 21. `siman_108/kereti/part-001.txt` — kereti — seif 3 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 3
marker: א
**** HEBREW ****
כשאינו ב"י ולא גזרו אטו ב"י דלא אפשר וכי כל פעם ששופך עליו יעשה הכשר תוס' וכתב הפר"ח זה הכל אם המרדה של א"י אבל של ישראל גזרינן:
**** ENGLISH ****
כשאינו ben yomo ולא גזרו אטו ben yomo דלא אפשר וכי כל פעם ששופך עליו יעשה הכשר Tosafot וwrote הPeri Chadash זה הכל אם המרדה של א"י אבל של ישראל גזרינן:
**** END BLOCK ****
```

### 22. `siman_108/kereti/part-001.txt` — kereti — seif 3 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 3
marker: ב
**** HEBREW ****
ולא קליפה דהוי תשמישו ע"י אור וצריך ליבון אחרונים:
**** ENGLISH ****
ולא shell דהוי its use ע"י אור וצריך libun אחרונים:
**** END BLOCK ****
```

### 23. `siman_108/kereti/part-001.txt` — kereti — seif 4 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 4
marker: _
**** HEBREW ****
של יי"נ אסור הפ"ת דעתו להתיר ועיין פלתי שיש לאסור ובפרט ביי"נ דאסור במשהו אבל בסתם יין דנהגו להתיר בששים ובמקום הפסד יש לסמוך אפר"ת כיון דרי"ף ורמב"ם מתירין:
**** ENGLISH ****
של יי"נ forbidden הפ"ת דעתו להתיר ועיין Peleti שיש לforbidden וin particular ביי"נ דforbidden במשהו אבל בstam יין דthey practiced להתיר בsixty ובמקום הפסד one may rely אפר"ת כיון דרי"ף ורמב"ם מתירין:
**** END BLOCK ****
```

### 24. `siman_108/kereti/part-001.txt` — kereti — seif 5 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: א
**** HEBREW ****
מותר לשאוב ואף דקיימ"ל לעיל דלכתחילה אסור שאני הכא דאזוקי מזיק ועיין פלתי:
**** ENGLISH ****
permitted to draw וeven דקיימ"ל above דl'chatchila forbidden this case is different הכא דאזוקי מזיק ועיין Peleti:
**** END BLOCK ****
```

### 25. `siman_108/kereti/part-001.txt` — kereti — seif 5 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: ב
**** HEBREW ****
בפיו לפי משמעות רוב פוסקים אפילו בחוטם מותר להריח ופיו לרבותא נקט אף דנהנה בפיו מאיסור:
**** ENGLISH ****
בפיו לפי it appearsות רוב poskim אפילו בחוטם permitted להריח ופיו according to Ravותא נקט even דנהנה בפיו מאיסור:
**** END BLOCK ****
```

### 26. `siman_108/kereti/part-001.txt` — kereti — seif 5 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: ג
**** HEBREW ****
לטועמו אפי' באיסורי אכילה גרידא אסור:
**** ENGLISH ****
לטועמו even באיסורי אכילה גרידא forbidden:
**** END BLOCK ****
```

### 27. `siman_108/mateh-yehonatan/part-001.txt` — mateh-yehonatan — seif 1 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=1#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: mateh-yehonatan
seif: 1
marker: _
**** HEBREW ****
(סימן ק"ח בש"ע סעיף א') <b>ואפי' היתה האסור' שמינה הרבה כו'</b>. עש"ך סק"א דוקא כשאחד מהן שומן כו' אבל בשניהם כחושין כו' והנה ר"ת ר"ל דבשניהם כחושין ריחא לאו מלתא וראיה מלחמי תודה דאפייתן בתנור א' אע"ג דהוי חמץ ומצה וה"ל למיסר משום ריחא מלתא א"ו דבשניהם כחושין ריחא ל"מ היא ומקשה ר"י הא איכא בלחמי תודה שמן דאיכא פיטום ולק"מ דאיתא בפסחים דף ל"ח ע"ב אין יוצאין בחלות תודה דכתיב ושמרתם את המצות ובעינן מצה המשתמרת לשם מצה יצא זו שאינה משתמרת לשם מצה אלא לשם זבח ופריך ות"ל דהוי מצה עשירה אמר שמואל בר רב יצחק רביעית היא ומתחלקות לכמה חלות אם כן כיון דהוי לענין מצה עשירה דבר מועט ה"ה לענין פיטום אמרי' דהוי דכר מועט והוי שניהם כחושים וק"ל. [ועי' בפלתי סק"ז שדחה סברא זו עי"ש היטיב]:
**** ENGLISH ****
(siman 108) וeven היתה הforbidden' שמינה הרבה etc.. עש"ך סק"א specifically כשאחד מהן שומן etc. אבל בboth of them כחושין etc. והנה ר"ת ר"ל honeyניהם כחושין ריחא לאו מלתא וproof saltמי תודה דאפייתן בoven א' even though דהוי חמץ ומצה וה"ל למיסר because ריחא מלתא א"ו honeyניהם כחושין ריחא ל"מ היא ומקשה ר"י הא there is בלחמי תודה שמן דthere is פיטום ולק"מ דאיתא בפסחים daf ל"ח side 2 אין יוצאין בחלות תודה דכתיב ושמרתם את המצות ובעינן מצה המשתמרת לשם מצה יצא זו שאינה משתמרת לשם מצה אלא לשם זבח וfruitך ות"ל דהוי מצה עשירה אמר שמואל בר רב יצחק רביעית היא ומתdisagreedות לכמה חלות if so כיון דהוי regarding מצה עשירה דבר מועט ה"ה regarding פיטום אמרי' דהוי דכר מועט והוי both of them כחושים וinvestigate. [ועי' בPeleti סק"ז שדחה סברא זו עי"ש היטיב]:
**** END BLOCK ****
```

### 28. `siman_108/mateh-yehonatan/part-001.txt` — mateh-yehonatan — seif 2 — marker `_`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_108/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: mateh-yehonatan
seif: 2
marker: _
**** HEBREW ****
(בש"ך סעיף ב') <b>דריחא לאו מלתא היא בדיעבד אבל פת שאפאה עם הצלי כו' וכיון דאפשר לאכלו בלי כותח הוי כלכתחלה </b>ולכאורה י"ל דזה דוקא לשיטת רי"ף דס"ל כל כה"ג הוי דשיל"מ משא"כ לדידן דקי"ל דלא הוי דשיל"מ כמבואר בכמה דוכתי בש"ע דקי"ל חלב שנתבשל במים ע"י ס' מותר לבשל ביה בשר א"כ ודאי דלא הוי כדשיל"מ א"כ הקושיא במ"ע וצ"ל כמ"ש המרדכי בשלמא גבי פת לעיל אמרינן שפיר דאסור כיון שהוא התירא דקיל גבי' גזרינן טפי משא"כ הכא גבי נבילה שהוא אסורא דחמיר גביה לא גזרינן כולי האי:
**** ENGLISH ****
(בש"ך seif ב') דריחא לאו מלתא היא b'dieved אבל פת שאפאה עם הצלי etc. וכיון דאפשר to eat them בלי kutach הוי כלat first וit appears י"ל דזה specifically לשיטת רי"ף דס"ל כל such a case הוי something that has a permitted aspect משif so for us דwe establish דלא הוי something that has a permitted aspect כexplained בכמה דוכתי בש"ע דwe establish חלב שwas cooked in water ע"י sixty permitted לבשל ביה meat if so certainly דלא הוי כsomething that has a permitted aspect if so הקושיא במ"ע וone must say כwhat he wrote המרדכי בשלמא גבי פת above אמרינן well דforbidden כיון שהוא of heter דקיל גבי' גזרינן טפי משif so הכא גבי nevelah שהוא forbiddenא דחמיר גביה לא גזרינן כולי האי:
**** END BLOCK ****
```

### 29. `siman_108/mateh-yehonatan/part-001.txt` — mateh-yehonatan — seif 3 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: mateh-yehonatan
seif: 3
marker: _
**** HEBREW ****
(שם סעיף א' בהגה"ה) <b>ואם האיסור דבר חריף כו' ואפי' בדיעבד אסור</b>. דין זה מאו"ה שכתב וז"ל ואם האיסור דבר חריף ריחא מלת' היא מדהוצרך הש"ס לאוקמי הא דכמון של תרומה דמותר היינו משום דקלי מקלי איסורא משמע בלא"ה אסור והיינו משום שהוא דבר חריף ומקשה עליו דכ"ז הוא לאביי דס"ל ריחא מלתא אבל אנן קי"ל כרבא לא אצטריך לשנוי כלל דטעמא דמקלי קלי אסורא ואם כן אדרבה משמע דאפילו דבר חריף קי"ל ריחא ל"מ היא וי"ל דתוס' כתבו שם בסוגיא דבת תיהא דרבא נמי ס"ל כרכ דריחא מלתא היא אלא גבי בת תיהא שרי רבא משום אזוקי מזיק ליה כו' ומקשו תוס' אמאי לא פריך נמי לרב דאמר בפסחים ריחא מלתא היא מההיא דכמון של תרומה ולישני כמו דמשני הכא וי"ל ע"ש והנה לכאורה י"ל קושית תוס' דודאי לרב לא מצי למפרך די"ל ש"ה דמקלי אבל לאביי דס"ל אפילו היכא דאזוקי לי' נמי אמרי' ריחא מלתא היא וס"ל למקשה דגם מקלי קלי לא מהני ואמרינן דריחא מלתא היא לפ"ז אף בלא אביי מוכרח לטעמיה דמקלי קלי וא"ש דברי האו"ה אך כ"ז לשיטת תוס' דס"ל דגם רבא ס"ל כרב ומוכרחים לחלק בין בשר נבילה שצלאו כו' להאי בת תיהא לכ"ע מותר משום דמזיק לי' משא"כ לדידן דקי"ל כשיטת הרי"ף וראייתו כיון דרבא ס"ל כלוי ש"מ דהלכתא כוותיה וע"כ דלא מחלק בין בשר נבילה שצלאו לבת תיהא ול"ל האי סברא דאזוקי מזיק וא"כ ל"ל כמ"ש וצ"ל דראייתו כך הוא מדנקט בברייתא פת שאפה וכמון של תרומה דל"ל פיטום כלל הל"ל רבותא דאפי' דבר שיש פיטום דהיינו שומן נמי מותר לרבא דלשיטת הרי"ף ל"ל ריחא מלתא כלל אפילו דבר שיש לו פיטום א"ו כיון דכמון הוא דבר חריף אם הוא דבר שיש לו פיטום לכ"ע אמרינן ריחא מלתא היא ע"ש בתוס':
**** ENGLISH ****
(שם seif א' בhagahah) ואם האיסור דבר sharp etc. וeven b'dieved forbidden. דין זה מIssur VeHeter שwrote וand these are his words ואם האיסור דבר sharp ריחא מלת' היא מדהוצרך הGemara לwe establish הא דכמון של תרומה דpermitted that is becauseקלי מקלי איסורא it appears without"ה forbidden וthat is because שהוא דבר sharp ומקשה עליו דכ"ז הוא לאביי דס"ל ריחא מלתא אבל אנן we establish כרבא לא אצטריך לשנוי כלל דטעמא דמקלי קלי forbiddenא וif so אדרבה it appears דאפילו דבר sharp we establish ריחא ל"מ היא and one may say דTosafot כתבו שם בסוגיא דבת תיהא דרבא נמי ס"ל כרכ דריחא מלתא היא אלא גבי בת תיהא שרי רבא because אזוקי מזיק ליה etc. ומקשו Tosafot אמאי לא fruitך נמי according to Rav דאמר בפסחים ריחא מלתא היא מההיא דכמון של תרומה ולישני כמו דמשני הכא and one may say see there והנה it appears י"ל קושית Tosafot דcertainly according to Rav לא מצי למפרך די"ל ש"ה דמקלי אבל לאביי דס"ל אפילו היכא דאזוקי לי' נמי אמרי' ריחא מלתא היא וס"ל למקשה דגם מקלי קלי לא מהני ואמרינן דריחא מלתא היא accordingly even without אביי מוכרח לטעמיה דמקלי קלי וא"ש דברי הIssur VeHeter אך כ"ז לשיטת Tosafot דס"ל דגם רבא ס"ל כרב ומוכרחים לdisagreed בין meat nevelah שצלאו etc. להאי בת תיהא לכ"ע permitted becauseמזיק לי' משif so for us דwe establish כשיטת הרי"ף וראייתו כיון דרבא ס"ל כלוי ש"מ דthe halachah כוותיה וuntil here דלא מdisagreed בין meat nevelah שצלאו לבת תיהא ול"ל האי סברא דאזוקי מזיק וif so ל"ל כwhat he wrote וone must say דראייתו כך הוא מדנקט בברייתא פת שאפה וכמון של תרומה דל"ל פיטום כלל הל"ל רבותא דeven דבר שיש פיטום that is שומן נמי permitted according to Ravא דלשיטת הרי"ף ל"ל ריחא מלתא כלל אפילו דבר שיש לו פיטום א"ו כיון דכמון הוא דבר sharp אם הוא דבר שיש לו פיטום לכ"ע אמרינן ריחא מלתא היא see there בTosafot:
**** END BLOCK ****
```

### 30. `siman_108/mateh-yehonatan/part-001.txt` — mateh-yehonatan — seif 4 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: mateh-yehonatan
seif: 4
marker: _
**** HEBREW ****
(שם בהגה"ה) <b>וי"א שהאיסור אוסר במשהו כו' י"א כו'</b>. ז"ל מ"א בא"ח סי' תמ"ז סק"ד וכתב רמ"א בי"ד דבמקום הפסד יש להקל ע"ש וי"ל דוקא בפתוח קצת כו' וגם דעת הרי"ף פ"ו דחולין לאסור שכ' דרב דאמר ריחא מלת' לטעמי' משום דס"ל מב"מ במשהו ואנן קי"ל בס' נמשמע דבפסח דקי"ל במשהו לכ"ע ריחא מלתא היא כו' ע"ש דבריו והיינו ע"כ דרב ולוי ל"פ אי אית ביה בריח טעם משהו או לא דאל"כ מה צריך הרי"ף למימר דרב לטעמי' אזיל כו' דקי"ל כלוי אפילו אי הוי קי"ל דמב"מ במשהו בשאר אסורים אפ"ה בריח מותר כיון דליכא ביה ריחא אפילו טעם משהו א"ו דלא בהא פליגי דלכ"ע איכא טעם משהו בריחא אלא לרב דאוסר משהו לטעמיה אזיל ומקשה על הרי"ף דהא הוא לא ס"ל חילוק של תוס' דאזוקי מזקי ליה א"כ כיון דעכ"פ איכא טעם משהו אמאי מתיר רבא בת תיהא לכתחלה הא רבא ס"ל ג"כ דמב"מ במשהו וע"ק הא דפריך הגמרא שם על לוי מהא דא"צ שני פסחים כא' ומאי קושיא הא טעם משהו איכא עכ"פ שהוא אסור לכתחלה. ונ"ל דהנה ע"ק מ"ק אלא לימא תהוי תיובתא דרב דל"ל למימר גדי וטלה דמשמע דנאמר משום תערובת גופן ת"ל משום תערובת טעמן דהא ס"ל ריחא מלתא היא ולמה שכתב הרי"ף שם לא פריך מידי דאצטריך למימר גדי וטלה דאוסר משום תערובת גופן דאי הוי גדי וגדי הוי מב"מ דאזלינן בתר שמא דקי"ל כרבא הוי אסור משום ריחא ואצטריך לאשמעינן רבותא דהוי גדי וטלה דהוי מין בשא"מ דל"ל משו' תערובת טעמן מ"מ משו' תערובת גופן וצ"ל דקושית הגמ' קאי אליבא דאביי דס"ל דל"א דאזלינן בתר שמא רק בתר טעמא לפ"ז הפי' בדברי הרי"ף כך הן דהרי"ף רוצה לפסוק כלוי והיינו משום דלרב מוכרח לשנוי דחיקא דמיירי כעין שתי קדירות וקא קשיא ליה דהא לרבא דס"ל דאזלינן בתר שמא אין מן המוכרח לשנוי דחיקא די"ל כמ"ש ולכך קאמר הרי"ף דאם אנו נאמר דאזלינן בתר שמא מ"מ אין לאסור ריחא אלא אם נאמר דמב"מ אוסר במשהו ואנו קי"ל בס' ליכא למיסר משום ריחא כלל אבל אליבא דאמת ס"ל הלכה כלוי דריחא לאו מילתא הוא דהיינו דלית ביה אפילו משהו דלא כמ"א. אמנם לשיטת המ"א יש לתרץ באופן אחר דודאי ריחא ליכא טעם משהו כלל ללוי ולרב י"ל דאיכא בריחא יותר ממשהו דמשהו מה בעי הכא אלא דהפירוש ברי"ף כך הוא דר"ל דלמ"ד מב"מ בטיל והיינו משום דצריך דווקא שיתן טעם בדבר אחר משא"כ מב"מ שאין נותן טעם בדבר אחר שאין ניכר ונרגש טעמו של איסור הוא בטיל גם ריח לא חשיב כלל ובטיל אפילו במין בשאינו מינו דהא בריח ליכא טעם ולא עוד דלפ"ז אפילו ריח גרידא בלא ביטול כגון בת תיהא מותר אבל למ"ד מב"מ ל"ב היינו משום דס"ל אין הטעם בטיל עד שיהיה טעם אחר המבטל טעם של איסור אבל מב"מ דליכא טעם אחר משונה ליבטיל טעם של איסור ל"ב הלכך לענין ריחא נמי אף דליכא טעם ואין נרגש הטעם רק דאיכא ריחא לא בטיל דהא במב"מ נמי אינו נרגש טעם של האיסור מ"מ כיון דאין ההיתר יכול לבטלו דהא כולו חד טעם הוא לא בטיל וא"כ בריח נמי דכוותיה ולפי פירוש זה אפי' בשא"מ ס"ל להרי"ף דלרב ריחא מלתא היא ובזה יסתלקו כל הקושיות על הרי"ף ולפ"ז בחמץ בפסח דהעיקר הטעם דקי"ל במשהו היינו משום דבחמץ מחמירין כר"י דמב"מ ל"ב ודאי גם ריחא איכא למיסר וברור שזה היה שיטת מ"א ודו"ק:
**** ENGLISH ****
(שם בhagahah) וי"א שהאיסור אוסר במשהו etc. י"א etc.. and these are his words מ"א Orach Chaim סי' תמ"ז סק"ד וwrote רמ"א בי"ד דבמקום הפסד יש to be lenient see there and one may say specifically בפתוח קצת etc. וגם דעת הרי"ף chapter 6 דחולין לforbidden שwrote דרב דאמר ריחא מלת' לטעמי' becauseס"ל מב"מ במשהו ואנן we establish בsixty נit appears דבפסח דwe establish במשהו לכ"ע ריחא מלתא היא etc. see there דבריו וthat is until here דרב ולוי ל"פ אי אית ביה בריח טעם משהו או לא דאל"כ מה צריך הרי"ף למימר דרב לטעמי' אזיל etc. דwe establish כלוי אפילו אי הוי we establish דמב"מ במשהו in other forbiddenים even so בריח permitted כיון דthere is not ביה ריחא אפילו טעם משהו א"ו דלא בהא פליגי דלכ"ע there is טעם משהו בריחא אלא according to Rav דאוסר משהו לטעמיה אזיל ומקשה על הרי"ף דהא הוא לא ס"ל חילוק של Tosafot דאזוקי מזקי ליה if so כיון דעכ"פ there is טעם משהו אמאי מתיר רבא בת תיהא לat first הא רבא ס"ל ג"כ דמב"מ במשהו וע"ק הא דfruitך הגמרא שם על לוי מהא דא"צ שני פסחים כא' ומאי קושיא הא טעם משהו there is עכ"פ שהוא forbidden לat first. וit appears to me דהנה ע"ק מ"ק אלא לימא תהוי תיובתא דרב דל"ל למימר גדי וטלה דit appears דנאמר because תערובת גופן ת"ל because תערובת טעמן דהא ס"ל ריחא מלתא היא ולמה שwrote הרי"ף שם לא fruitך מידי דאצטריך למימר גדי וטלה דאוסר because תערובת גופן דאי הוי גדי וגדי הוי מב"מ דאזלינן בתר lest דwe establish כרבא הוי forbidden because ריחא ואצטריך לאשinnardsנן רבותא דהוי גדי וטלה דהוי מין not in its kind דל"ל משו' תערובת טעמן nevertheless משו' תערובת גופן וone must say דקושית הגמ' deals with according to דאביי דס"ל דל"א דאזלינן בתר lest רק בתר טעמא accordingly הפי' בדברי הרי"ף כך הן דהרי"ף רוצה לפסוק כלוי וthat is becauseaccording to Rav מוכרח לשנוי דחיקא דdeals with כעין שתי pots וקא קשיא ליה דהא according to Ravא דס"ל דאזלינן בתר lest אין מן המוכרח לשנוי דחיקא די"ל כwhat he wrote ולכך קאמר הרי"ף דאם אנו נאמר דאזלינן בתר lest nevertheless אין לforbidden ריחא אלא אם נאמר דמב"מ אוסר במשהו ואנו we establish בsixty there is not למיסר because ריחא כלל אבל according to דאמת ס"ל the halachah כלוי דריחא לאו מילתא הוא that is דלית ביה אפילו משהו דלא כמ"א. אמנם לשיטת המ"א יש לתרץ באופן אחר דcertainly ריחא there is not טעם משהו כלל ללוי וaccording to Rav י"ל דthere is בריחא יותר ממשהו דמשהו מה בעי הכא אלא דהExplanation: ברי"ף כך הוא דר"ל דלמ"ד מב"מ nullified וthat is becauseצריך דווקא שיתן טעם בדבר אחר משif so מב"מ שאין noten taam בדבר אחר שאין ניכר ונרגש טעמו של איסור הוא nullified גם ריח לא חשיב כלל וnullified אפילו במין בשאינו מינו דהא בריח there is not טעם ולא עוד דaccordingly אפילו ריח גרידא without ביטול כגון בת תיהא permitted אבל למ"ד מב"מ ל"ב that is becauseס"ל אין the taste nullified עד שיהיה טעם אחר המבטל טעם של איסור אבל מב"מ דthere is not טעם אחר משונה ליnullified טעם של איסור ל"ב הלכך regarding ריחא נמי even דthere is not טעם ואין נרגש the taste רק דthere is ריחא לא nullified דהא במב"מ נמי אינו נרגש טעם של האיסור nevertheless כיון דאין ההיתר יכול לבטלו דהא כולו חד טעם הוא לא nullified וif so בריח נמי דכוותיה ולפי Explanation: זה even not in its kind ס"ל להרי"ף דaccording to Rav ריחא מלתא היא ובזה יסתלקו כל הקושיות על הרי"ף וaccordingly בחמץ בפסח דהעיקר the taste דwe establish במשהו that is becauseבחמץ are stringent כר"י דמב"מ ל"ב certainly גם ריחא there is למיסר וברור שזה היה שיטת מ"א investigate:
**** END BLOCK ****
```

### 31. `siman_108/mateh-yehonatan/part-001.txt` — mateh-yehonatan — seif 5 — marker `_`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_108/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: mateh-yehonatan
seif: 5
marker: _
**** HEBREW ****
(שם סעיף ה' בהג"ה) 
<b>אבל אסור לטועמו.</b> והנה הרב בעל צמח צדק כתב להתיר להעושין בורית שקורין (זייף) בל"א שצריכה להטעימה בשעת מלאכה אי חסירה מלח או יותר מלח שמותר לטעום כיון דטעימה דרבנן ונטל"פ דרבנן והכא כיון דהוא נטל"פ מחמת עפר שהוא האפר והוא תרתי דרבנן ושרי לכתחלה והקשו עליו מהא דקאמר בחולין דף קי"א קערה שמלח בה בשר אסור לאכול בה רותח וצנון שחתכו בסכין מותר לאכול בכותח כו'. ומסיק משום דהאי אפשר למטעמיה והאי לא אפשר למטעמי' וא"א כמ"ש הצ"צ גבי קערה נמי אפשר למטעמי' דהיינו לאחר מעל"ע והוי נטל"פ דאז איכא ב' דרבנן ומותר למטעמי' ואפשר דודאי אין כל הטעם של היתר לגבי בורית משום דרבנן אלא כיון דהא דאסרו חז"ל טעימה היינו משום שמא יבא לאכלו כ"ז הוא לגבי איסור שאינו לפגם דאיכא למיגזר בכה"ג שמא יבוא לאכלו ממש משא"כ באיסור פגום כמו בורית וכה"ג דודאי ליכא למיגזר בכה"ג ולכן שרי משא"כ התם גבי קערה שפיר איכא למיגזר טעימה אטו אכילה דהא משום האי טעם פגום שיש בתוך הקערה לא ימנע מלאכול ושפיר איכא למיגזר טעימה אטו אכילה:
**** ENGLISH ****
(שם seif ה' בהג"ה) אבל forbidden לטועמו. והנה הרב בעל צמח צדק wrote להתיר להעושין lye שקורין (זייף) בל"א שצריכה להטעימה בשעת מלאכה אי חסירה salt או יותר salt שpermitted לטעום כיון דטעימה d'rabbanan וnat bar lichtmile d'rabbanan והכא כיון דהוא nat bar lichtmile מחמת dust שהוא the ash והוא תרתי d'rabbanan ושרי לat first והקשו עליו מהא דקאמר בחולין daf קי"א bowl שsalt בה meat forbidden לאכול בה רותח וradish שחתכו בסכין permitted לאכול בkutach etc.. וdoes not occur to him becauseהאי אפשר למטעמיה והאי לא אפשר למטעמי' וא"א כwhat he wrote הTzemach Tzedek גבי bowl נמי אפשר למטעמי' that is לאחר within twenty-four hours והוי nat bar lichtmile דאז there is ב' d'rabbanan וpermitted למטעמי' ואפשר דcertainly אין כל the taste של היתר לגבי lye because d'rabbanan אלא כיון דהא דאסרו חand these are his words טעימה that is because lest יבא to eat them כ"ז הוא לגבי איסור שאינו for spoilage דthere is למיגזר בsuch a case lest יבוא to eat them ממש משif so באיסור spoiled כמו lye וsuch a case דודif there is not למיגזר בsuch a case ולכן שרי משif so התם גבי bowl well there is למיגזר טעימה אטו אכילה דהא because האי טעם spoiled שיש בתוך הbowl לא ימנע מלאכול וwell there is למיגזר טעימה אטו אכילה:
**** END BLOCK ****
```

### 32. `siman_108/mechaber/part-001.txt` — mechaber — seif 1 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_108/mechaber/part-001.txt#slug=mechaber#seif=1#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 1
marker: main
**** HEBREW ****
<b>שלא לאפות היתר ואיסור בתנור א'. ובו ז' סעיפים:</b><br> <i data-commentator="Turei Zahav" data-order="1"></i><i data-commentator="Siftei Kohen" data-order="1"></i><i data-commentator="Beur HaGra" data-order="1"></i><i data-commentator="Be'er HaGolah" data-order="1"></i><i data-commentator="Peleti" data-order="1"></i><i data-commentator="Kereti" data-order="1"></i>אין צולין <i data-commentator="Peleti" data-order="2"></i><i data-commentator="Kereti" data-order="2"></i>בשר כשרה עם בשר נבילה או של בהמה טמאה <i data-commentator="Ba'er Hetev" data-order="1"></i>בתנור א' ואף על פי שאין נוגעים זה בזה <i data-commentator="Siftei Kohen" data-order="2"></i>ואם צלאן <i data-commentator="Kereti" data-order="3"></i>הרי זה <i data-commentator="Ba'er Hetev" data-order="2"></i>מותר ואפילו היתה האסורה שמינה הרבה והמותרת רזה <i data-commentator="Turei Zahav" data-order="2"></i><i data-commentator="Siftei Kohen" data-order="3"></i><i data-commentator="Beur HaGra" data-order="2"></i><i data-commentator="Be'er HaGolah" data-order="2"></i>ואם התנור גדול <i data-commentator="Pithei Teshuva" data-order="1"></i><i data-commentator="Be'er HaGolah" data-order="3"></i><i data-commentator="Kereti" data-order="4"></i>שמחזיק <i data-commentator="Peleti" data-order="3"></i>י"ב עשרונים <i data-commentator="Ba'er Hetev" data-order="3"></i><i data-commentator="Be'er HaGolah" data-order="4"></i><i data-commentator="Kereti" data-order="5"></i>ופיו פתוח <i data-commentator="Peleti" data-order="4"></i>מותר לצלותם בו <i data-commentator="Beur HaGra" data-order="3"></i><i data-commentator="Peleti" data-order="5"></i>ובלבד <i data-commentator="Kereti" data-order="6"></i>שלא יגעו זה בזה <i data-commentator="Beur HaGra" data-order="4"></i><i data-commentator="Be'er HaGolah" data-order="5"></i>ואם אחד מהם מכוסה בקערה או בבצק וכיוצא בו מותר לצלותם אפילו בתנור קטן ופיו סתום: <small>הגה <i data-commentator="Siftei Kohen" data-order="4"></i><i data-commentator="Beur HaGra" data-order="5"></i>וה"ה <i data-commentator="Ba'er Hetev" data-order="4"></i>לבשר עם חלב נמי דינא הכי (טור סימן צ"ז) <i data-commentator="Beur HaGra" data-order="6"></i>ונוהגין להחמיר לכתחלה אפילו בתנור גדול <i data-commentator="Turei Zahav" data-order="3"></i>ובדיעבד להקל אפילו בתנור <i data-commentator="Ba'er Hetev" data-order="5"></i>קטן (ארוך כלל ל"ט דלא כב"י ובתשובת ר"י מינץ ובהגהת ש"ד ואגור בשם מהרי"ל וטור בשם רשב"א שכן הסכמת רוב המורים והוא שיטת רש"י וה"ג ורי"ף ורמב"ם) <i data-commentator="Siftei Kohen" data-order="5"></i><i data-commentator="Beur HaGra" data-order="7"></i>ואם אפה פת עם בשר אסור <i data-commentator="Ba'er Hetev" data-order="6"></i>לאכלו עם חלב אם יש לו פת אחר (שם) <i data-commentator="Beur HaGra" data-order="8"></i>וכן אם עובד כוכבים אפה פת עם איסור <i data-commentator="Siftei Kohen" data-order="6"></i>אסור <i data-commentator="Ba'er Hetev" data-order="7"></i>לקנות אותו פת אם יש פת אחר דכל זה מקרי לכתחלה אבל אם <i data-commentator="Kereti" data-order="7"></i>אין לו פת אחר בריוח <i data-commentator="Beur HaGra" data-order="9"></i>מותר בשניהם <i data-commentator="Turei Zahav" data-order="4"></i>דזה מקרי לענין זה דיעבד (אגור בשם ר"י מולין) <i data-commentator="Beur HaGra" data-order="10"></i>י"א דאין מתירין ריחא אפילו בדיעבד אלא אם כן התנור פתוח קצת מן הצד <i data-commentator="Siftei Kohen" data-order="7"></i>או למעלה במקום שהעשן יוצא (שם בארוך) <i data-commentator="Siftei Kohen" data-order="8"></i><i data-commentator="Beur HaGra" data-order="11"></i>ובמקום הפסד אין להחמיר בדיעבד (כי כן נראה מהפוסקים וכ"פ ב"י) אפילו סתום לגמרי <i data-commentator="Siftei Kohen" data-order="9"></i><i data-commentator="Beur HaGra" data-order="12"></i><i data-commentator="Peleti" data-order="6"></i>ואם האיסור <i data-commentator="Kereti" data-order="8"></i>דבר <i data-commentator="Ba'er Hetev" data-order="8"></i>חריף <i data-commentator="Beur HaGra" data-order="13"></i>וכל שכן אם ההיתר דבר חריף ריחא מילתא היא <i data-commentator="Turei Zahav" data-order="5"></i><i data-commentator="Kereti" data-order="9"></i>ואפילו <i data-commentator="Kereti" data-order="10"></i>בדיעבד אסור אם שניהם מגולים <i data-commentator="Beur HaGra" data-order="14"></i>אבל אם אחד מהם מכוסה <i data-commentator="Siftei Kohen" data-order="10"></i><i data-commentator="Kereti" data-order="11"></i>אפילו בבצק בעלמא <i data-commentator="Ba'er Hetev" data-order="9"></i>מותר (מרדכי פ' ג"ה ואו"ה) <i data-commentator="Beur HaGra" data-order="15"></i>אם אפו או צלו איסור והיתר תחת מחבת אחת מגולין אסור (תוספות) אפילו בדיעבד (שם בארוך) <i data-commentator="Beur HaGra" data-order="16"></i>וה"ה אם אפו בכה"ג <i data-commentator="Kereti" data-order="12"></i>פת עם בשר <i data-commentator="Siftei Kohen" data-order="11"></i>אסור לאכלו <i data-commentator="Ba'er Hetev" data-order="10"></i>בחלב (ש"ד סימן ס' ומהרא"י) <i data-commentator="Siftei Kohen" data-order="12"></i><i data-commentator="Beur HaGra" data-order="17"></i>אבל <i data-commentator="Pithei Teshuva" data-order="2"></i>בזה אחר זה אין לחוש (תשובת מיי' סוף הל' מ"א ותשובת ר"י ואו"ה) <i data-commentator="Beur HaGra" data-order="18"></i>אלא אם כן <i data-commentator="Ba'er Hetev" data-order="11"></i>הזיע המחבת משניהם דאז אסור אפילו בזה אחר זה אם היו שניהם מגולין דהוי ככיסוי של קדרה (ד"ע ממשמעות הרא"ש סימן צ"ג) כדלעיל סימן צ"ג <i data-commentator="Siftei Kohen" data-order="13"></i>י"א דכל מקום דאמרינן ריחא מלתא ואוסר בדיעבד היינו דוקא דליכא ששים מן ההיתר נגד האיסור אבל בדאיכא ששים מן ההיתר <i data-commentator="Turei Zahav" data-order="6"></i><i data-commentator="Kereti" data-order="13"></i>אפי' בכל מה שבתנור מבטל האיסו' (שם בארוך כלל ל"ט די"ח) <i data-commentator="Beur HaGra" data-order="19"></i>ולצורך <i data-commentator="Ba'er Hetev" data-order="12"></i>הפסד יש לנהוג כן. <i data-commentator="Beur HaGra" data-order="20"></i>י"א דאיסור האוסר במשהו כגון חמץ בפסח ריחא מלתא ואוסר אפילו בדיעבד <i data-commentator="Siftei Kohen" data-order="14"></i><i data-commentator="Beur HaGra" data-order="21"></i>אם התנור <i data-commentator="Ba'er Hetev" data-order="13"></i>קטן והוא סתום והאיסור וההיתר מגולין תוך התנור (ד"מ בשם הגהת סמ"ק ובשם תוספות עבודת כוכבים דף ס"ו ע"ב) <i data-commentator="Siftei Kohen" data-order="15"></i><i data-commentator="Beur HaGra" data-order="22"></i><i data-commentator="Peleti" data-order="7"></i><i data-commentator="Kereti" data-order="14"></i>ויש אומרים שאין <i data-commentator="Ba'er Hetev" data-order="14"></i>לחלק (ד"מ בשם מרדכי) ובמקום הפסד יש לסמוך אדברי המקילין ועיין לקמן סוף סימן קי"ח אם יש להחמיר לכתחלה לשפות ב' קדירות וא' מהן של איסור על הכירה או לצלות איסור אצל היתר:</small>
**** ENGLISH ****
Not to bake heter and issur in one oven. In it are 7 seifim: One may not roast kosher meat with nevelah meat or meat of an impure animal in one oven, and even though they do not touch one another; and if he roasted them — behold it is permitted, and even if the forbidden was of a large species and the permitted thin; and if the oven is large — that holds twelve se'ahs and its mouth is open — permitted to roast them in it, provided they do not touch one another; and if one of them is covered in a bowl or in dough or the like — permitted to roast them even in a small oven with a closed mouth: {Rama: And the same law applies to meat with milk (Tur siman 97); and the custom is to be stringent l'chatchila even in a large oven, and b'dieved to be lenient even in a small oven (Arukh general rule 39 unlike Beit Yosef and in responsum of R' Yosef Mintz and Hagahot ShaDa and Agur in name of Maharil and Tur in name of Rashba that so agreed most poskim and it is the view of Rashi and Hagahot and Rif and Rambam); and if he baked bread with meat — forbidden to eat it with milk if he has other bread (there); and likewise if a gentile baked bread with issur — forbidden to buy that bread if there is other bread, for all this is called l'chatchila; but if he has no other bread in abundance — permitted in both, for this is called b'dieved for this matter (Agur in name of R' Yosef Molin); some say one does not permit reicha even b'dieved unless the oven is open a little on the side or above where the smoke exits (there in Arukh); and in a place of loss one need not be stringent b'dieved (as it appears from the poskim and so Beit Yosef) even if completely closed; and if the issur is a sharp thing — and all the more if the heter is a sharp thing — reicha is significant (Taz, Kereti) and even b'dieved forbidden if both are uncovered; but if one of them is covered — even merely in dough — permitted (Mordechai chapter 3 and Or Zarua); if they baked or roasted issur and heter under one uncovered pan — forbidden (Tosafot) even b'dieved (there in Arukh); and the same if they baked in such a case bread with meat — forbidden to eat it with milk (ShaDa siman 60 and Maharai); but one after the other there is no concern (responsum of Maharam end Laws of Forbidden Foods and responsum of R' Yosef and Or Zarua) unless the pan sweated from both — then forbidden even one after the other if both were uncovered, for it is like covering of a pot (logical opinion from implication of Rosh siman 93) as above siman 93; some say wherever we say reicha is significant and forbids b'dieved — that is specifically when there is not sixty of heter against the issur; but when there is sixty of heter — even everything in the oven nullifies the issur (there in Arukh general rule 39 seif 18); and for need of loss one may practice thus. Some say an issur that forbids in any amount such as chametz on Pesach — reicha is significant and forbids even b'dieved if the oven is small and closed and issur and heter are uncovered in the oven (logical opinion in name of Hagahot Semak and in name of Tosafot Avodah Zarah daf 66b); and some say there is no distinction (logical opinion in name of Mordechai); and in a place of loss one may rely on the lenient; and see below end siman 118 whether to be stringent l'chatchila to place two pots, one of them of issur, on the stove, or to roast issur next to heter.}
**** END BLOCK ****
```

### 33. `siman_108/mechaber/part-001.txt` — mechaber — seif 2 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_108/mechaber/part-001.txt#slug=mechaber#seif=2#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 2
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="23"></i><i data-commentator="Be'er HaGolah" data-order="6"></i>בד"א בצלי <i data-commentator="Siftei Kohen" data-order="16"></i><i data-commentator="Be'er HaGolah" data-order="7"></i>אבל אם בא <i data-commentator="Peleti" data-order="8"></i><i data-commentator="Kereti" data-order="15"></i>לבשלם בקדרה זה לעצמו וזה לעצמו אפילו בתנור קטן ופיו סתום מותר ואף על פי שפי הקדרות <i data-commentator="Ba'er Hetev" data-order="15"></i>מגולה: <small>הגה <i data-commentator="Siftei Kohen" data-order="17"></i><i data-commentator="Beur HaGra" data-order="24"></i>ודוקא שהתנור פתוח קצת אבל אם הוא סתום מכל הצדדים כדרך שמטמינים החמין לצורך שבת אסור (מהרי"ו סימן מ"ד ואו"ה והגהת ש"ד בשם מהר"מ) ואפילו בדיעבד יש מחמירין ואוסרין אם האיסור וההיתר מגולה (כך משמע בהגהת ש"ד) <i data-commentator="Siftei Kohen" data-order="18"></i><i data-commentator="Beur HaGra" data-order="25"></i>ובמקום הפסד <i data-commentator="Ba'er Hetev" data-order="16"></i>מרובה יש להקל:</small>
**** ENGLISH ****
In what case is this said — in roasting; but if he comes to cook them in a pot — each for itself — even in a small oven with a closed mouth it is permitted, and even though the mouths of the pots are uncovered: {Rama: And specifically when the oven is open a little; but if it is closed on all sides as is customary to insulate hot food for Shabbat need — forbidden (Mahariu siman 44 and Or Zarua and Hagahot ShaDa in name of Maharam); and even b'dieved some are stringent and forbid if issur and heter are uncovered (as appears in Hagahot ShaDa); and in a place of great loss one may be lenient.}
**** END BLOCK ****
```

### 34. `siman_108/mechaber/part-001.txt` — mechaber — seif 3 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_108/mechaber/part-001.txt#slug=mechaber#seif=3#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 3
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="8"></i>אם יש שמנונית של איסור על המרדה שקורין פאל"א <i data-commentator="Turei Zahav" data-order="7"></i>אסור ליתן עליה היתר כל היום <i data-commentator="Siftei Kohen" data-order="19"></i><i data-commentator="Kereti" data-order="16"></i>מיהו כשאינה בת <i data-commentator="Be'er HaGolah" data-order="9"></i>יומא מותר להשתמש בה <i data-commentator="Turei Zahav" data-order="8"></i><i data-commentator="Beur HaGra" data-order="26"></i>משום דאי <i data-commentator="Ba'er Hetev" data-order="17"></i>אפשר בענין אחר: <small>הגה <i data-commentator="Beur HaGra" data-order="27"></i>כל זמן שהיא בת יומא לא מהני בה הגעלה <i data-commentator="Siftei Kohen" data-order="20"></i><i data-commentator="Beur HaGra" data-order="28"></i><i data-commentator="Kereti" data-order="17"></i>ולא <i data-commentator="Ba'er Hetev" data-order="18"></i>קליפה בכלי אומנות (ת"ה סימן ק"ל והגהת ש"ד ומרדכי):</small>
**** ENGLISH ****
If there is grease of issur on the spit called paleh — forbidden to place heter on it all day; however when it is not within its day — permitted to use it, because it is possible in another manner: {Rama: As long as it is within its day hagalah does not help on it, nor peeling in a craftsman's vessel (Terumat HaDeshen siman 130 and Hagahot ShaDa and Mordechai).}
**** END BLOCK ****
```

### 35. `siman_108/mechaber/part-001.txt` — mechaber — seif 4 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_108/mechaber/part-001.txt#slug=mechaber#seif=4#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 4
marker: main
**** HEBREW ****
<i data-commentator="Siftei Kohen" data-order="21"></i><i data-commentator="Beur HaGra" data-order="29"></i><i data-commentator="Be'er HaGolah" data-order="10"></i><i data-commentator="Peleti" data-order="9"></i>פת חמה שמונח על גבי חבית פתוחה <i data-commentator="Siftei Kohen" data-order="22"></i><i data-commentator="Kereti" data-order="18"></i>של <i data-commentator="Ba'er Hetev" data-order="19"></i>יין נסך אסורה <i data-commentator="Beur HaGra" data-order="30"></i><small>(ודווקא אם מונחת נגד המגופה) (ארוך כלל ל"ט) </small>אבל אם הפת צוננת אפילו אם החבית פתוחה או פת חמה וחבית מגופה <small>(פי' סתומה) </small>מותר <i data-commentator="Be'er HaGolah" data-label="(°)" data-order="10"></i>ואם היה <i data-commentator="Peleti" data-order="10"></i>פת שעורים אסור <i data-commentator="Siftei Kohen" data-order="23"></i>אם הפת <i data-commentator="Ba'er Hetev" data-order="20"></i>חמה אפילו חבית מגופה:
**** ENGLISH ****
Hot bread placed on top of an open barrel of libation wine — forbidden (and specifically if placed against the bung) (Arukh general rule 39); but if the bread is cold — permitted, even if the barrel is open; or hot bread and the barrel is bunged (meaning sealed) — permitted; and if it was barley bread — forbidden if the bread is hot, even if the barrel is bunged.
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

siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=3#marker=_
siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=4#marker=_
siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=5#marker=_
siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=6#marker=_
siman_108/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=7#marker=_
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%90
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%91
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%92
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%93
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%94
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%95
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%96
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%97
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%98
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%99
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%9B
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%9C
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%9E
siman_108/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%A0
siman_108/kereti/part-001.txt#slug=kereti#seif=2#marker=_
siman_108/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%90
siman_108/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%91
siman_108/kereti/part-001.txt#slug=kereti#seif=4#marker=_
siman_108/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%90
siman_108/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%91
siman_108/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%92
siman_108/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=1#marker=_
siman_108/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=2#marker=_
siman_108/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=3#marker=_
siman_108/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=4#marker=_
siman_108/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=5#marker=_
siman_108/mechaber/part-001.txt#slug=mechaber#seif=1#marker=main
siman_108/mechaber/part-001.txt#slug=mechaber#seif=2#marker=main
siman_108/mechaber/part-001.txt#slug=mechaber#seif=3#marker=main
siman_108/mechaber/part-001.txt#slug=mechaber#seif=4#marker=main