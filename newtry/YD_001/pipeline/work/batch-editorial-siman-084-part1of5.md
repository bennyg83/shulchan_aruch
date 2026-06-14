# Editorial retranslation — Siman 84 (part 1/5)

Generated: 2026-06-12T13:01:46.690Z

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

### 1. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: א
**** HEBREW ****
<b>שבכלים. </b> וה"ה בשאר משקים שבכלים:
**** ENGLISH ****
In vessels. and the same applies in other liquids in vessels:
**** END BLOCK ****
```

### 2. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ב`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ב
**** HEBREW ****
<b>פיו. </b> כ' הש"ך משמע דאפילו משום בל תשקצו אין בהם ואע"ג דלעיל סי' י"ג כ' הר"ב דאפי' דגים טהורים אסור לאכלם חיים משום בל תשקצו שאני הכא כיון דאין כוונתו אלא לשתות המים וגם אינם בעין והט"ז כתב בשם או"ה דדוקא שאין מאוסין עליו אבל מאוסין עליו או שיש חשש סכנה אסור משום בל תשקצו. [הרמב"ם סוף הלכות רוצח וכ"כ מהרש"ל. כתב פר"ח ודע דכל מה שאין רגילים העולם לאוכלו ובדילין ממנו נקרא מאוס ואין לאכלו ואי לדידיה מאוס אף דלכ"ע לא מאיס כ"ש דאסור לדידיה משום בל תשקצו וכ"ז אינו אלא מדרבנן ואין מכין אותו כו' עיין שם]:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 54 MINUTES 24 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 51 MINUTES 04 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 3. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ג`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ג
**** HEBREW ****
<b>בכלי. </b> כתב הש"ך וה"ה ליקח מים ביד אסור ובכלי הטעם דחיישינן דילמא פריש בדופני הכלי דדוקא על שפת הכלי הוא דלא שכיחי לפרוש אבל בדופני הכלי מבפנים שכיח דפרשי ואסירי דדוקא כשפירש עם המשקה מכלי אל כלי הוא דשרי בס"ג אף כשפרשו אח"כ בדופני הכלי השני דהיינו רביתייהו והלכך כלי שני דין כלי ראשון יש לו משא"כ הכא שהיו מתחלה בבור ולפ"ז מ"ש אבל אסור לשאוב וכו' לא קאי אלא אבורות שיחין ומערות אבל מותר לשאוב בכלי קטן מכלי גדול דאף אם יפרשו אח"כ בכלי השני מותרים אבל מדברי הט"ז משמע דאף לשאוב בכלי קטן מכלי גדול ג"כ אסור ואינו מותר אא"כ כשמערה דוקא מכלי אל כלי אבל כששואב מכלי לכלי חיישינן שמא יפרוש על הכלי קודם שיכנסו המשקים לשם:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 47 MINUTES 46 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 44 MINUTES 27 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 4. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ד`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ד
**** HEBREW ****
<b>לאחורי. </b> כתב הש"ך דהל' אינו מתוקן ובת"ה להרשב"א כתב לאחורי הכלי או על שפת הבור ומ"מ נראה דלפעמים נמצא כלי ששפתו רחב:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 41 MINUTES 08 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 5. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ה`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ה
**** HEBREW ****
<b>מותרים. </b> כתב הש"ך ול"ד למסנן בס"ג דחיישינן שמא פירשו שאני התם דשכיחי דפרשי על הקסמים וקשים. וה"ה אם פרשו לדופן הבור מבפנים ג"כ מותר:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 37 MINUTES 49 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 6. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 10 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 10
marker: _
**** HEBREW ****
<b>ירקות. </b> כ' העט"ז בס"ס ק' דוקא ירקות אבל שאר פירות אפי' כמהין ופטריות אפשר לבודקן אפי' אחר שנתבשלו ומותרים בבדיקה:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 48 MINUTES 27 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 7. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 12 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=12#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 12
marker: _
**** HEBREW ****
<b>להעמיד. </b> כתב הש"ך דוקא דברים שלמים אבל דברים נחתכים הנופלים לתוכו דרכו למהר למחות ולכלות ואע"ג דהכא לא נ"מ מידי דהא נמלה חתוכה לאו בריה מקרי מ"מ לענין שרץ דבכעדשה לא בטיל כבסי' ק"ד ס"א דבדבש בטיל ע"ש:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 45 MINUTES 08 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 8. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 13 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=13#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 13
marker: _
**** HEBREW ****
<b>ויסננו. </b> כ' הש"ך ואין בזה משום מבטל איסור לכתחלה שאסור כדלקמן סימן צ"ט שאין כוונתינו אלא לתקן הדבש:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 41 MINUTES 48 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 9. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 14 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=14#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 14
marker: _
**** HEBREW ****
<b>והשאר. </b> כתב הט"ז דהא יש ס"ס ספק אין שם ואת"ל יש שם ספק נמוח בשעת אפייה ואין כאן מבטל איסור לכתחלה שאין כוונתנו רק לאפות הפת ולא לבטל התולעת וכ' הש"ך דהיתר זה אינו אלא כשהם מתולעים בענין שיוכל לבררם קודם הטחינה אבל לא כשנמצאו מתולעים ברוב בענין דא"א לבררן ובהגהת ש"ד כ' שעשה מעשה בחטים שהתליעו והשליכם לנהר ולא רצה להתיר למכרם לעובד כוכבים פן יאפה פת וימכרנו לישראל ובת"ה כ' טעם שהתירו בטחינה שהתולעים רוחשים ובורחים לחוץ דרך דופני האפרכסת מפני קול ונדנוד הרחיים ולפ"ז ברחיים שאין בה אפרכסת כגון ברחיים דידא היה אסור אלא שאח"כ כתב טעם אחר להתיר שאף אם יטחנו התולעים בטלים בס' תוך הקמח וא"כ בכל רחיים מותר אך נראה דבמקום שאפשר לטחון ברחיים גדול שיש בהן אפרכסת אין לטחנן ברחיים אחרת:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 38 MINUTES 29 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 35 MINUTES 11 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 10. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 15 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=15#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 15
marker: _
**** HEBREW ****
<b>אסורים. </b> ומהרש"ל פסק דמותרין בשחיטה אבל כל הפוסקים חולקין עליו בזה:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 31 MINUTES 52 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 11. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 16 — marker `א`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 16
marker: א
**** HEBREW ****
<b>בבהמה. </b> הטעם איתא בש"ך משום דבהמה בשחיטה תליא מלתא ואלו שגדלו בתוכה עד שלא נשחטה באו מאיסור אמ"ה ושחיטת הבהמה לא מהני להו שהרי יש להן חיות בפני עצמן ואע"ג דשליל מותר בשחיטת אמו התם מכל בבהמה תאכלו נפקא אבל הכא באיסורייהו קיימי:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 28 MINUTES 33 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 12. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 16 — marker `ב`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 16
marker: ב
**** HEBREW ****
<b>במעיהם. </b> דמעלמא אתו לתוכם אבל בין עור לבשר שרי דמהם גדלים ולית בהו משום אמ"ה דהא דגים באסיפה בעלמא סגי להו:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 25 MINUTES 15 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 13. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 16 — marker `ג`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 16
marker: ג
**** HEBREW ****
<b>פירשו. </b> כתב הש"ך והיינו דלא פירשו לגמרי אבל אם פירשו לגמרי אסורים דודאי לא עדיפי מתולעים שבגבינה:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 21 MINUTES 56 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 14. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 16 — marker `ד`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 16
marker: ד
**** HEBREW ****
<b>המתירים. </b> ר"ל לדעת המתירים בבשר לאחר שחיטה ומ"ש אם פירש מת ולעיל ס"ד הביא יש אוסרים אפילו פירש מת היינו משום דסברת המתירים עיקר בעיניו:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 18 MINUTES 37 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 15. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 16 — marker `ה`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 16
marker: ה
**** HEBREW ****
<b>נפלו. </b> כ' הטור וראוי היה לחוש כשנתן הבשר בקדרה במים צוננין אולי פירשו לדופני הקדרה ונהגו להתיר עכ"ל והטעם משום דיש מתירין בכל ענין:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 15 MINUTES 18 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 16. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 16 — marker `ו`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 16
marker: ו
**** HEBREW ****
<b>הגבינה. </b> כ' הש"ך לאו דוקא אלא ה"ה בקערה מותרים אבל אם פירשו על השלחן אסורים משום מראית עין:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 11 MINUTES 59 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 17. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 17 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=17#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 17
marker: _
**** HEBREW ****
<b>רפואה. </b> כתב הט"ז דמהרש"ל העתיק תשובת ר"י על נכפה שהוא כמכה של חלל ומותר להאכילו מאכל שיש בו שרץ אם הרפואה בידוע ואם לאו אסור ואם ביטל העובד כוכבים הרפואה בס' מותר עכ"ל כ' חוות יאיר סי' ק"ב רפואה לבעלי ירוקין לבלוע ח' כינים של ראשו אסור משום דאין רפואה זו בדוקה. השואף דבר איסור דרך נחיריו פטור אפילו שנהנה בכזית מאחר שאין דרך אכילתו בכך <small>(הל"ק סימן ל"ה)</small>:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 08 MINUTES 41 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 18. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 2 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 2
marker: _
**** HEBREW ****
<b>אוסרים. </b> ומהרש"ל פוסק כדעת האוסרים מיהו במים הנובעים כגון ימים ונחלים פשיטא אע"פ שלא פירשו אסורים ואין היתר אלא לאותן שאינן נובעים משום דכתיב בימים ובנחלים ואין היתר בנובעים רק בסנפיר וקשקשת:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 34 MINUTES 30 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 19. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 3 — marker `א`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 3
marker: א
**** HEBREW ****
<b>יחזרו. </b> כתב הש"ך דמדברי המחבר משמע דזה פשיטא אם חזרו בכלי דפירשו אבל בש"ס משמע דליכא אלא ספיקא שמא פירשו ואפשר גם דעת המחבר כן אלא שקיצר במובן:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 31 MINUTES 11 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 20. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 3 — marker `ב`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 3
marker: ב
**** HEBREW ****
<b>לערות. </b> כתב הש"ך נראה דכלי שני דין כלי ראשון יש לו וכשפורשין על דופני הכלי שבפנים שרי ול"ד לפירש מפרי לפרי בס"ד דהתם לאו היינו רביתייהו אבל הכא הואיל והוא תמיד עם המשקה היינו רביתייהו וכתב רבינו ירוחם חומץ שיש בו תולעים אם פירשו לאויר נקרא פירשו אבל מן החומץ לתבשיל לא הוי פירשו ומותרים עכ"ל:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 27 MINUTES 52 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 21. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 4 — marker `א`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 4
marker: א
**** HEBREW ****
<b>אוסרים. </b> ודעת הש"ך נוטה דסברא ראשונה היא עיקר ע"ש:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 24 MINUTES 33 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 22. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 4 — marker `ב`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 4
marker: ב
**** HEBREW ****
<b>לחוץ. </b> <small>(דחיישינן שמא פירשו)</small> כתב הש"ך ול"ד לשרצים שככלי בס"א דלא חיישינן להכי דהכא כיון שחורו נקוב לחוץ הוי קצת הוכחה שפירשו וחזרו א"נ דרך התולעים לפרוש חוץ לפרי ולחזור ולא בכלי:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 21 MINUTES 15 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 23. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `א`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: א
**** HEBREW ****
<b>הארץ. </b> כתב הש"ך דה"ה אם הקמח מונח בכלי דאסור דחיישינן שמא פירשו לדופני הכלי מבפנים דדוקא בדבר של משקה אמרינן בס"א דמותרים כשפירשו בדופני הכלי מבפנים שנתרבו מכל אשר במים משא"כ בדבר שאינו של משקה. [וזהו שכתב הר"ב בהגה"ה או שאר דברים שאינו של משקה ועיין בפר"ח שחולק]. ודוקא בתולעים קטנים שקורין מילווי"ן שא"א לנפות הקמח בנפה וכברה אבל אם נמצא בקמח או בשאר דברים תולעים גדולים שאפשר לבררם בנפה וכיוצא בזה ודאי דהמאכל מותר ובט"ז כתב דיש תימה על המחבר דלעיל בס"ד פסק דלא חיישינן שמא פירשו אפילו חורו נקוב לחוץ דיש ריעותא בפנינו דיש נקב שנעשה ע"י תולעת ואפ"ה לא חיישינן שמא פירשו אפילו מקצתו וכאן פסק לחומרא וכתב עוד דהב"ח מחלק בין גדולים קצת לקטנים ורוצה להתיר המילווי"ן קטנים שבקמח שא"א לנפות הקמח בנפה ובכברה כדי שישארו התולעים למעלה <small>(אבל ודאי אם נמצא בקמח או בשאר דברים תולעים גדולים שאפשר לבררם בנפה ודאי המאכל מותר)</small>. ותימה הוא דלדידן דקי"ל דחיישינן שמא פירשו אין שום חילוק בין גדולים לקטנים עכ"ל:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 17 MINUTES 56 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 14 MINUTES 38 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 24. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `ב`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: ב
**** HEBREW ****
<b>במלח. </b> פי' שבאו בו תולעים מעלמא:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 11 MINUTES 18 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 25. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `ג`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: ג
**** HEBREW ****
<b>לישראל. </b> פי' הש"ך שיש לחוש שימכרנה אח"כ לישראל בענין שלא יהא האיסור ניכר כגון קמח עשה ממנו פת וכן מלח יתננה בפת או בשאר דברים מה שנהגו לקנות מעובדי כוכבים אבל דבר שהאיסור ניכר מותר למכרו לעובד כוכבים כמ"ש הר"ב בהג"ה סי' נ"ז סכ"א ודלא כב"ח שמתיר במלח ואין דבריו נראין מיהו דוקא הכל ביחד אסור למכור לעובד כוכבים אבל מעט מעט מותר למכרו בענין שאין לחוש שמא יחזור וימכרנו לישראל כמ"ש בא"ח סי' תס"ט [ובנו של הש"ך בס' נה"כ נתעורר על ד' הש"ך שהתיר מכירה לעובד כוכבים מעט מעט שאינם מכוונים להלכה כלל אלא עיקר ההיתר בזה לעשותו פת ולפתתו לשנים ואח"כ ימכרנו לעובד כוכבים וכ"כ הפר"ח]. וכ' מהרש"ל וה"ה דמותר להאכילו לעבדו ולשפחתו ואע"פ שמזונותיו עליו מיהו נראה שלא ישהה אותו זמן רב דלא יבא לידי תקלה כדלעיל סימן נ"ז ס"כ והט"ז חולק ע"ז דאין נראה לחלק בין זמן מרובה למועט דגם במועט יש לחוש לתקלה ואע"ג דבסי' פ"ו נתבאר דבזמן מועט לא חיישינן לתקלה שאני התם דהבעלים בדילי מדבר זה ולא חיישינן למכשול משא"כ כאן שיעשה ממנו פת לעבדו ושמא יתערב פת זה עם שאר פת כיון שנאכל בתוך ביתו. וכתב עוד דהב"ח מתיר למכור לעובד כוכבים מלח שהתליע וכן היר"ז וגרויפי"ן או מיני פירות כגון פלוימי"ן וראזי"ני דאין לחוש שימכור לישראל כיון דדרכן להתליע אסור לאכלן עד שיבדוק תחלה והוא משיג עליו שהרי כל הדברים הנ"ל ודאי אנו קונין בכל יום מעובדי כוכבים וא"צ לבדוק כל זמן שאין רואים ריעותא ע"כ ודאי אסור למכור לעובדי כוכבים אלא קבא קבא כנלע"ד ופשוט עכ"ל וכתב הש"ך ואע"ג דכתב הר"ב בס"ס נ"ז בספק טרפות ויש מכשירין אותו טריפות אע"ג דקי"ל לאוסרו מ"מ מותר למכרו לעובד כוכבים דאיכא תרי ספיקי חדא שמא הלכה כמאן דמכשיר ואת"ל כמאן דאסר שמא לא ימכרנו לישראל וא"כ ה"נ איכא תרי ספיקי שמא לא פירש ואת"ל פירש שמא לא ימכרנו לישראל שאני הכא כיון דהוא אסור לכ"ע ועוד דכבר כתבתי בסי' נ"ז דלא אמרינן הכי אלא דוקא בספק דרוסה וכה"ג הואיל ויש בלא"ה כמה צדדים להתיר עכ"ל:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 07 MINUTES 59 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 04 MINUTES 41 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  11 HOURS 01 MINUTES 22 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 58 MINUTES 03 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 26. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 6 — marker `א`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 6
marker: א
**** HEBREW ****
<b>ריחשו. </b> כ' הש"ך מיהו נראה דכל זמן שהפרי לא נתבשל יש ליטול התולע ממנו כיון שהרשב"א והר"ן ור"י אוסרים אפילו במקום צר וא"כ ודאי ראוי להחמיר באיסור דאוריי' אבל ודאי אם נתבשל אפילו פרי קטן מותר כיון דבלא"ה י"א דכל פרי אפילו הוא קטן הוא ס' נגד התולע. וט"ז כ' ולענין הלכה ודאי קי"ל להחמיר אף בנמצאין תוך הקליפה אבל אין אוסרין התבשיל משום טעם היבחושין האלו אבל כל שיש חשש שבתוך התבשיל יאכל היבחושין עצמן ודאי יש להחמיר עכ"ל:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 54 MINUTES 45 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 27. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 6 — marker `ב`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 6
marker: ב
**** HEBREW ****
<b>עצמו. </b> כתב הש"ך דצ"ע דהא כתב המחבר דתולעים הנמצאים בפולין תחת הקליפה מותרין כיון שמונחים במקום צר ולא ריחשו וסתם הרב כוותיה וכאן אוסר ואפשר ליישב דהרב כתב כן לפי מ"ש בת"ח דאף בפולין יש להחמיר ליטלו משם כל זמן שלא נתבשל וזה שסתם כדברי המחבר היינו לענין דינא ונ"מ שאינו אוסר התבשיל <small>(ועיין מ"ש בס"ק י"ד בשם הט"ז דאם יש לחוש שיאכל היבחושין עצמן דיש להחמיר)</small>:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 51 MINUTES 27 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 28. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 7 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 7
marker: _
**** HEBREW ****
<b>ידוע. </b> כ' הש"ך אפילו לא ידעינן שדרכו להתליע במחובר כיון שהוא מותלע לפנינו אסור ולדעת רמ"א ס"ס ד' צ"ל דהיינו באינו נקוב לחוץ דאי בנקוב לחוץ אפילו התליע בתלוש אסור [וכמ"ש הר"ב בס"ד] ופשוט הוא:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 48 MINUTES 08 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 29. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 8 — marker `א`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 8
marker: א
**** HEBREW ****
<b>מחוברים. </b> כתב הש"ך דבאשר"י ורשב"א איתא דפולין ועדשים וקטניות דרכן להתליע במחובר מיהו בשאר פוסקים איתא דקטניות וכיוצא בהן אין דרכן להתליע אלא בתלוש ונראה דע"ז סמכו האידנא שאין נוהגין לברור הקטניות אפילו תוך שנתן רק נותנין אותן בקדרה צוננת ושופכין כל מה שעולה למעלה והנשאר מבשלין ברותחין אף שפסק מהרש"ל שיברור כ"א ואחד בפני עצמו דוקא והעולם מקילין בזה ואפשר נמי שהאידנא אין דרכן להתליע במחובר דדבר זה משתנה לפי המקום והזמן והמחמיר בזה תע"ב ובט"ז כתב מדברי המחבר משמע דבדבר שאין דרכו להתליע אלא בתלוש א"צ בדיקה וע"כ אין חיוב בדיקה בקמח או בפירות יבשים כגון רוזיינ"י וכיוצא בהם אם יש שם מילווי"ן קטנים דאין שם איסור אלא לאחר שפירשו דהוי ס"ס ובס"ס מותר אפילו בשל תורה עכ"ל ובודאי דלכתחלה צריך בדיקה ולא הוי ס"ס מאחר שהוחזק בכך מיהו אם עבר ובישלן דהוי עוד ספק שמא נימוח ונתבשל מותר <small>(ועיין בש"ך ס"ק ל"א)</small>. ומ"מ הכל משתנה לפי המקום ולפי הזמן שיש שנים שמתליעין ויש שאין מתליעין לפיכך בעל נפש יחוש לעצמו שלא יבוא להכשל באיסור דאוריי' וכ"כ בה"י וראיתי אנשי מעשה שלא נהגו לאכול רזיינ"ן ולא מאלינ"ש ואורז ע"ש:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 44 MINUTES 48 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 41 MINUTES 29 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 38 MINUTES 10 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 30. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 8 — marker `ב`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 8
marker: ב
**** HEBREW ****
<b>להשליך. </b> כלומר באותן שדרכן להתליע נהי דא"צ לבדקן בפנים כיון ששהו י"ב חודש ונרקב התולעת שבתוכן והוי כעפרא בעלמא מ"מ צריך לבודקן להשליך התולעים הנמצאים ביניהם בחוץ אבל אותן פירות שאין דרכן להתליע כלל ודאי א"צ בדיקה כלל אפילו מבחוץ:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 34 MINUTES 51 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 31. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 8 — marker `ג`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 8
marker: ג
**** HEBREW ****
<b>חודש. </b> כתבו בט"ז וש"ך דתוך י"ב חדש לא מהני בדיקה זו דהר"ן כ' דאותן שהתליעו במחובר אין טבען שצפין למעלה כמו אותן שמתליעים בתלוש ומהרש"ל כ' דדוקא בקטניות ופולין וכיוצא בהן מהני תיקון זה אבל בפירות שיש להם גרעינים מבפנים לא דאפי' בתלוש חיישינן שמא פירשו ע"ג הגרעינים הלכך לא מהני להו רותחים ולא ברירה ואין כן דעת הש"ך ע"ש:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 31 MINUTES 32 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 32. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 8 — marker `ד`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 8
marker: ד
**** HEBREW ****
<b>דשכיח. </b> וכל שמצוי אין סומכין על בדיקת הרוב ודומה לבדיקת הריאה בר"ס ל"ט:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 28 MINUTES 13 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 33. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 9 — marker `א`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 9
marker: א
**** HEBREW ****
<b>מותר. </b> הטעם איתא ברשב"א שיש כאן שני ספיקות ספק היה שם רחש או לא ואת"ל היה שמא נמוח ונתבטל לכך הולכין בו להקל וכתב האו"ה והיינו שלא הוחזקו פי' בסתם אבל במדינה שהוחזקו בכך הוי ודאי ולא ספק:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 24 MINUTES 54 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 34. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 9 — marker `ב`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 9
marker: ב
**** HEBREW ****
<b>פרי. </b> כתב הש"ך משמע דאפילו בפירות קטנים כגון קירש"ן וכיוצא בהם יש ס' נגד טעם התולע ובת"ה כתב שקיבל דדוקא בתפוחים גסים או שאר פירות הגסים אמרינן דבטל התולעת בס' אבל לא בקטני' וכ' רש"ל שיש להחמיר כן ובפרי קטן נעשה הוא נבלה וצריך ס' נגד כולו אם יש לחוש שהתליע במחובר אפילו לא ניקב לחוץ ובתלוש כשניקב לחוץ ובת"ח כתב דאם יש בתבשיל ג"כ דברים אחרים מלבד הפרי שרי לכ"ע אם יש ס' נגד התולע וגם רוצה להקל מטעם דאין התולע אוסר בטעמו משום דהוי פגום ומדמה אותו לזבובים ויתושים דהוי נטל"פ והט"ז כתב ג"כ סברא זו ואין דעת הש"ך נוטה לזה כלל כי הרשב"א עצמו מתיר בזבוב ואפ"ה אוסר כאן בתולע וע"כ שיש חילוק ביניהם ע"ש:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 21 MINUTES 35 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 18 MINUTES 16 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 35. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 9 — marker `ג`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 9
marker: ג
**** HEBREW ****
<b>שלשה. </b> כתב הש"ך דכיון שנמצא שם כ"כ הוחזק התבשיל זה שיש שם יותר מאי איכא שמא נמוח ובטל משום חד ספיקא לא שרינן ליה והיינו דוקא תוך י"ב חודש דאז אפילו הוא תוך הפרי אסור אבל לאחר י"ב חודש דליכא איסור אלא כשפירשו איכא ס"ס ספק פירש חי או פירש מת דשרי ואת"ל פירש חי שמא נמוח ובפרט שיש פוסקים דס"ל דתולעים מתים מיד בשעת הבישול קודם שפירשו ולכך כתבו דאם נמצאו הרבה תולעים בתבשיל הכל מותר אפי' התולעים עצמן אם אין דרכן להתליע במחובר ע"כ יש להקל כאן כיון דאין כאן איסור ודאי אלא חששא שמא יש עוד תולעים מיהו כל זה בתולעים שבפנים אבל פירות שדרכן להתליע אפי' דרכן להתליע בתלוש ורגיל להיות ביניהם תולעים בחוץ דאז נאסרו מיד פשיטא כשנתבשלו בלא בדיקה ונמצא אח"כ בתבשיל ג' או ד' דהכל אסור דליכא כאן אלא חדא ספיקא דנמוח וכתב הט"ז ותמוה למה לי ד' כיון שבג' אסור ונראה דהר"ן כתב כן לרבותא דאפי' בד' יש היתר ברוטב ע"י סינון והש"ע גריר בתריה בלשון אף שלא סיים כן עכ"ל:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 14 MINUTES 57 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 11 MINUTES 39 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 36. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 9 — marker `ד`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 9
marker: ד
**** HEBREW ****
<b>שהוחזק. </b> כתב רש"ל ומש"ה הנהגתי בעצמי שלא לאכול הכמהין היבשים כי הוחזקו בתולעים כי לאחר הבדיקה והברירה מצאתי בתבשיל בשולי הקדרה כמה תולעים. וכתב בט"ז מעשה בחג השבועות שעשו כמעט בכל העיר לחמים ופלדין עם ראזינק"ש ואשה א' בדקה רוזינ"י שלה ונמצא בהם מילווי"ן וכולן קנו ממקום א' וגם אצל המוכר בדקו אח"כ ומצאו גם שם מילוו"ין נראה בעיני שאותן שלקחו קודם שנודע שיש שם מילווי"ן מותרין דזה דומה למ"ש הרשב"א דאם עבר ובישל תוך י"ב חודש הוי ס"ס ה"נ יש ב' ספיקות הא' שמא באותו הפעם שלקחו הם לא היו עדיין מילווי"ן עד שעה קטנה אח"כ ואת"ל היו שמא נמוחו בתנור מחום האש וא"ל שזהו נגד הסברא לומר שבשעה קטנה יתהוו המילבי"ן ונמצא שאין כאן אלא ספק א' זה אינו דהא גם שם בההיא דהרשב"א כיון שדרכן להתליע הוי כודאי התליע שספק הרגיל לאו שמיה ספק כמ"ש בת"ה סי' קמ"א לענין חטים מתולעים ואפ"ה חשבו הרשב"א לס"ס אבל אותן שלקחו אח"כ יש לאסור כל הלחמים ופלאדין דאין כאן אלא ספק א' שמא נמוח ובודאי פרשו המילווי"ן מן הראזיינ"י בשעת עריכה ולישה ושמא יאכל גוף האיסור וראוי לחוש באיסור תורה עכ"ל ובס' נקודות הכסף השיג עליו ודעתו לאסור אף אותן שלקחו קודם שנודע האיסור ע"ש. [ופר"ח חולק על ט"ז וכ' שכל הפלאדין אסורים ע"ש חלוקי דינים אם קנו הרבה אנשים קמח מחנות ועשו מהם לחמים ונמצא אח"כ תולעים מה דינו. בת' ד"ש סי' רפ"ו מורה להקל בשמן הנעשה מזיתים שהתליעו במחובר ע"ש. בתשו' מהר"מ מלובלין התיר בדוחק בשנה שהתליע בה כל הכישות ובשלו בה המון עם אח"כ השכר בלא סינון דיותר טוב למכור לעובד כוכבים ובאם שא"א למכור הכל לעובד כוכבים כשיבא לסנן השכר דרך הסל שיניח ג"כ בגד על הסל ומה שכבר בישל בלא סינון אם יוכל לסנן בשעת שתיה אז טוב ובדיעבד באשר שהוא מעות שלא יוכל לתקון והפ"מ ושעת הדחק מותר ע"ש. וכ' בצ"צ סי' נ"א היינו דוקא היכא דאיכא חשש איסור ממשות התולעים דגופן נתרסק ונתבשלו בשכר אבל ביין שרף דליכא חשש איסור דאינו אלא מן הטעם וזיעה היוצא מפירות ומהתולעים ודאי דשרי אפי' בלא הפ"מ עכ"ל ומכאן נ"ל ללמוד לאותן האנשים הנוהגים איסור לאכול תבואה חדשה מ"מ נ"ל דמותרים לשתות יי"ש אף להרא"ש דאוסר לשתות שכר יש לחלק דשאני יי"ש דזיעה בעלמא היא לאפוקי שכר דהוי טעם כעיקר <small>(הגהת לה"פ)</small>. וכ' עוד שמותר לפטם עופות בקמח שיש בו תולעים ודוקא שיעשה תיכף מהקמח חתיכות קטנות ויהיה לו היכר שלא יבא לאוכלו ע"ש]:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 08 MINUTES 20 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 05 MINUTES 01 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  10 HOURS 01 MINUTES 42 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 58 MINUTES 23 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 55 MINUTES 04 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 37. `siman_084/baer-heitev/part-001.txt` — baer-heitev — seif 9 — marker `ה`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 9
marker: ה
**** HEBREW ****
<b>מותר. </b> כ' הש"ך אפי' ידוע שהיו שם עוד תולעים הרבה קודם הבישול אפ"ה מותר וכתב ט"ז בשם מהרש"ל דגם תוך יב"ח מהני בדיקה יפה דהיינו לבדוק כל פרי בפני עצמו ומ"ש הטור דתוך יב"ח אין לו תקנה היינו תקנה דמים רותחין ורמ"א בת"ח כתב דהמנהג דבוררין הערבסי"ן תוך יב"ח על השלחן ובוררין הנקובים מהן וכ' רש"ל דכיון דצריך בדיקה יפה ואיכא טירחא אין להאמין לנשים בבדיקה זו ות"ח כתב דהמנהג להקל בזה כי יש הרבה צדדין להקל בזה וע"ל סעיף ה' אם קטניות דרכן להתליע במחובר או לאו:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  09 HOURS 51 MINUTES 46 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 38. `siman_084/beer-hagolah/part-001.txt` — beer-hagolah — seif 1 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 1
marker: _
**** HEBREW ****
ברייתא חולין דף ס"ו וס"ז
**** ENGLISH ****
A baraita there daf 66; Tosafot and Ran derive it from "it has no fin upon it."
**** END BLOCK ****
```

### 39. `siman_084/beer-hagolah/part-001.txt` — beer-hagolah — seif 10 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=10#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 10
marker: _
**** HEBREW ****
הגהות ש"ד בשם תשובת ה"ר חיים:
**** ENGLISH ****
The Lord’s Prayer:
**** END BLOCK ****
```

### 40. `siman_084/beer-hagolah/part-001.txt` — beer-hagolah — seif 11 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=11#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 11
marker: _
**** HEBREW ****
טור בשם בה"ג כמימרא דשמואל שם דף ס"ז וכן פסק בשאלתות והרי"ף שם והרמב"ם שם וש"פ:
**** ENGLISH ****
A column called the Lord’s Prayer in the name of Hashem’s Word, and also in the name of Hashem’s Word, and in the name of Hashem’s Word, and in the end, Hashem’s name is called, and so on
**** END BLOCK ****
```

### 41. `siman_084/beer-hagolah/part-001.txt` — beer-hagolah — seif 12 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=12#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 12
marker: _
**** HEBREW ****
שם בשם אביו הרא"ש ומהר"ם וכן כתבו התוספות שם:
**** ENGLISH ****
The name of his father, Rashi, and the Bible, and he wrote:
**** END BLOCK ****
```

### 42. `siman_084/beer-hagolah/part-001.txt` — beer-hagolah — seif 13 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=13#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 13
marker: _
**** HEBREW ****
שם. <br>(°) הרב ב"י פסק לעיל כדעת הרא"ש והתוספות דכל זמן בו לא ריחש מותרים ולענ"ד היה להרב רמ"א לכתוב דין זה בשם י"א:
**** ENGLISH ****
There. (a) The psalmist said, “And the Lord’s judgment was given to him, and the Lord’s judgment was to be given to him
**** END BLOCK ****
```

### 43. `siman_084/beer-hagolah/part-001.txt` — beer-hagolah — seif 14 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=14#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 14
marker: _
**** HEBREW ****
טור מהא דאמר רב פפא ש"מ מדרב הונא וכו' שם:
**** ENGLISH ****
Hashem’s Word says, “The Lord’s Word is called, and so on.”
**** END BLOCK ****
```

### 44. `siman_084/beer-hagolah/part-001.txt` — beer-hagolah — seif 15 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=15#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 15
marker: _
**** HEBREW ****
לשון הרמב"ם שם דין ט"ו ג"כ מהא דרב פפא:
**** ENGLISH ****
Hashem’s Word is called “Hashem’s Word” (Ps 119:105; 119:130]
**** END BLOCK ****
```

### 45. `siman_084/beer-hagolah/part-001.txt` — beer-hagolah — seif 16 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=16#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 16
marker: _
**** HEBREW ****
טור בשם אביו הרא"ש: <br>(°) פי' כיון שפירשו אע"פ שלא נבראו אלא בתלוש אסורין:
**** ENGLISH ****
A column called his father Rashi: (a) is not created, but is not made
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

siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%90
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%91
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%92
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%93
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%94
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=_
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=12#marker=_
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=13#marker=_
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=14#marker=_
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=15#marker=_
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=%D7%90
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=%D7%91
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=%D7%92
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=%D7%93
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=%D7%94
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=%D7%95
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=17#marker=_
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=_
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=3#marker=%D7%90
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=3#marker=%D7%91
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%90
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%91
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%90
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%91
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%92
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=%D7%90
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=%D7%91
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=7#marker=_
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%90
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%91
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%92
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%93
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%90
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%91
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%92
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%93
siman_084/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%94
siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=_
siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=10#marker=_
siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=11#marker=_
siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=12#marker=_
siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=13#marker=_
siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=14#marker=_
siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=15#marker=_
siman_084/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=16#marker=_