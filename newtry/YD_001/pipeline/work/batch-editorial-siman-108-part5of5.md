# Editorial retranslation — Siman 108 (part 5/5)

Generated: 2026-06-13T19:16:52.900Z

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

## Blocks in this batch (33 of 173 remaining in scope)

### 1. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 1 — marker `כ`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=1#marker=%D7%9B`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 1
marker: כ
**** HEBREW ****
["<b>אסור לאכלו בחלב. </b>היינו בפת מועט או שיש היכר בפת אבל בפת מרובה ואין היכר אסור אפילו לאכלו לבדו גזירה שמא יבא לאכלו בחלב כדלעיל ר\"ס צ\"ו וכן משמע להדיא בת\"ח שם ד\"ה ע\"ש:"]
**** ENGLISH ****
["forbidden to eat them בחלב. that is בפת מועט or thatיש היכר בפת אבל בפת מרובה ואין היכר forbidden אפילו to eat them לבדו גזירה lest יבא to eat them בחלב כדabove ר\"ס צ\"ו וכן it appears להדיא בת\"ח שם ד\"ה ע\"ש:"]
**** END BLOCK ****
```

### 2. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 1 — marker `ל`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=1#marker=%D7%9C`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 1
marker: ל
**** HEBREW ****
["<b>אבל בזה אחר זה אין לחוש. </b>כי לא נמצא ריחא ופיטום לכלי שיחזור ויפלוט לאוכל ואפילו כלי בן יומו רק שלא יגע ממש עכ\"ל תשובת מיימוני ונראה דאפילו דבר שנעשה להריח ועדיין ריחו בתנור אין לחוש לבזה אחר זה והכי מוכח בש\"ס פרק בתרא דעבודת כוכבים (דף ס\"ו ע\"ב) במאי דקאמר התם גבי ריחא דכמון שאני התם דמקלי קלי איסורא ע\"ש ודו\"ק:"]
**** ENGLISH ****
["אבל בone after the other אין לחוש. כי is not found ריחא ופיטום לכלי שיחזור ויפלוט לאוכל ואפילו כלי ben yomo רק שלא יגע ממש עכ\"ל תשובת מיימוני וit appears דאפילו דבר שנעשה להריח ועדיין ריחו בoven אין לחוש לבone after the other והכי proven בש\"ס פרק בתרא דעבודת כוכבים (daf ס\"ו ע\"ב) במאי דקאמר התם גבי ריחא דכמון this case is different התם דמקלי קלי איסורא ע\"ש ודו\"ק:"]
**** END BLOCK ****
```

### 3. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 1 — marker `מ`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=1#marker=%D7%9E`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 1
marker: מ
**** HEBREW ****
["<b>י\"א דכל מקום דאמרינן כו'. </b>עיין בד\"מ ובת\"ח שם ד\"ז ובאו\"ה כלל ל\"ט די\"ח ובהג\"ה שעל גליון האו\"ה שם ובסוף תשובת הרב ודוק בכל המקומות האלו ותמצא שדעת הרב שדין ריחא שוה לשאר איסורים לענין צירוף ששים וכמו דקי\"ל לקמן ס\"ס קי\"א דבמקום שאין הפסד אין הכל נכנס בספק לצרף ה\"ה בריחא דבמקום שאין הפסד צריך בכל חתיכה וחתיכה בפני עצמה ששים לבטל אפילו כל החתיכות נוגעות זו אצל זו וכדכתב באיסור והיתר הארוך טעמא דלא עדיף מבליעת איסור עצמו דקיימא לן לעיל סימן ק\"ה ס\"ז שאין הולך מחתיכה לחתיכה בלא רוטב אבל במקום הפסד יש לצרף כל החתיכות אפילו אינן נוגעות לבטל בששים דכולן נכנסו בספק זו היא דעת הרב ודוק ומקום הפסד כתב הרב בתשובה ובסימני ת\"ח שם דהיינו הפסד מרובה ולפ\"ז מ\"ש הרב לקמן ס\"ס קי\"א ולצורך הפסד יש להתיר היינו נמי הפסד מרובה וכ\"ש הוא:"]
**** ENGLISH ****
["י\"א דכל מקום דאמרינן etc.. עיין בד\"מ ובת\"ח שם ד\"ז ובאו\"ה כלל ל\"ט די\"ח ובהג\"ה שעל גליון האו\"ה שם וat the end תשובת הרב investigate בכל המקומות האלו ותמצא שדעת הרב שדין ריחא שוה לשאר איסורים regarding brothוף sixty וכמו דקי\"ל below ס\"ס קי\"א דבמקום שאין הפסד אין הכל נכנס בdoubt לצרף ה\"ה בריחא דבמקום שאין הפסד צריך בכל חתיכה וחתיכה בפני עצמה sixty לבטל אפילו כל החתיכות נוגעות זו אצל זו וכדwrote באיסור והיתר הארוך טעמא דלא עדיף absorbsת איסור עצמו דקיימא לן above siman ק\"ה ס\"ז שאין הולך מחתיכה לחתיכה without sauce אבל במקום הפסד יש לצרף כל החתיכות אפילו אינן נוגעות לבטל בsixty דכולן נכנסו בdoubt זו היא דעת הרב investigate ומקום הפסד wrote הרב בתשובה ובסימני ת\"ח שם that is great loss ולפ\"ז מ\"ש הרב below ס\"ס קי\"א ולצורך הפסד there is room to permit that is נמי great loss וכ\"ש הוא:"]
**** END BLOCK ****
```

### 4. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 1 — marker `נ`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=1#marker=%D7%A0`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 1
marker: נ
**** HEBREW ****
["<b>אם התנור קטן כו'. </b>צ\"ע דבתוס' דעבודת כוכבים משמע להדיא דאפילו בתנורים גדולים אסור ע\"ש (ובסמ\"ק אין הכרע) וצ\"ל דס\"ל להרב דהתוספות אזלי לטעמייהו דס\"ל ריחא מילתא בתנורים קטנים הלכך מחמרינן טפי אבל לדידן דקי\"ל ריחא לאו מילתא היא אין לאסור כלל בתנורים גדולים ודוחק וצ\"ע:"]
**** ENGLISH ****
["אם הoven קטן etc.. צ\"ע דבTosafot דעבודת כוכבים it appears להדיא דאפילו בovenים גדולים forbidden ע\"ש (ובסמ\"ק אין הכרע) וצ\"ל דס\"ל להרב דהתוספות אזלי לטעמייהו דס\"ל ריחא מילתא בovenים קטנים הלכך מחמרינן טפי אבל for us דקי\"ל ריחא לאו מילתא היא אין לforbidden כלל בovenים גדולים וforced וצ\"ע:"]
**** END BLOCK ****
```

### 5. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 1 — marker `ס`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=1#marker=%D7%A1`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 1
marker: ס
**** HEBREW ****
["<b>וי\"א שאין לחלק. </b>משמע דלהמרדכי אין חילוק בין איסור האוסר במשהו לשאר איסורים כן משמע בד\"מ ובהג\"ה בא\"ח סי' תמ\"ז ס\"א וצ\"ע דבמרדכי פכ\"ש ליתא אלא דלא שייך ריחא בפת חמץ שנאפה עם מצה מטעם דלא מצינו ריח פת בפת וכדאיתא בתשובת מיי' וש\"ד סי' ל\"ו ורוקח סי' רכ\"ב אבל בהך סברא דמשהו מיהא איכא לא אשכחן דפליג אתוס' וסמ\"ק ואה\"נ דס\"ל אלו היה תבשיל שמן בתנור שנאסר מחמץ שוב מפטם ואוסר במשהו ודוק וצ\"ע ומיהו בתשובת מהרי\"ל סימן רי\"ד מצאתי דלמ\"ד ריחא לאו מילתא היא אין חילוק בין חמץ דאוסר במשהו לשאר איסורים ע\"ש:"]
**** ENGLISH ****
["וי\"א שאין לdisagreed. it appears דלהמרדכי אין חילוק בין איסור האוסר במשהו לשאר איסורים כן it appears בד\"מ ובהג\"ה בא\"ח סי' תמ\"ז ס\"א וצ\"ע דבמרדכי פכ\"ש ליתא אלא דלא שייך ריחא בפת חמץ שנאפה עם מצה for the reason דלא מצינו ריח פת בפת וכדאיתא בתשובת מיי' וש\"ד סי' ל\"ו ורוקח סי' רכ\"ב אבל בהך סברא דמשהו מיהא there is לא אשכחן דפליג אTosafot וסמ\"ק ואה\"נ דס\"ל אלו היה dish שמן בoven שנאסר מחמץ שוב מפטם ואוסר במשהו investigate וצ\"ע ומיהו בתשובת Maharai\"ל siman רי\"ד I found דלמ\"ד ריחא לאו מילתא היא אין חילוק בין חמץ דאוסר במשהו לשאר איסורים ע\"ש:"]
**** END BLOCK ****
```

### 6. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 2 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 2
marker: א
**** HEBREW ****
["<b>אבל אם בא לבשלם כו'. </b>הטור בשם הרשב\"א סיים הטעם שאין ריח המתבשלים כ\"כ אוסר עכ\"ל והב\"י בסימן צ\"ז הקשה ע\"ז והוכיח מש\"ס דאפילו נצלה בקדרה אינו אוסר ע\"ש ואולי לזה השמיט סיום דברי הרשב\"א לומר דלא תליא מידי בריח הבישול או צלי רק בהפסק הקדרה ומ\"ש בד\"א בצלי כו' אבל לבשל כו' אפשר דאורחא דמלתא נקט דכל צלי דרך לצלותו בשפוד וצלי קדר חשיב בישול ובב\"ח שם רצה לסתור הוכחות ב\"י ע\"פ ובאמת דברי ב\"י נכונים וברורים וצריך לדחוק וליישב דברי הטור בשם הרשב\"א דגם הוא לא תלי מידי בבישול אלא ה\"ק שאין ריח המתבשלים כיון שהוא בקדרה המפסקת כ\"כ אוסר ובאו\"ה כלל ל\"ט הבין דברי הטור כפשוטו:"]
**** ENGLISH ****
["אבל אם בא לבשלם etc.. Tur in name of הרשב\"א סיים the taste שאין ריח המתבשלים כ\"כ אוסר עכ\"ל והב\"י בsiman צ\"ז challenged ע\"ז והוכיח מש\"ס דאפילו נצלה בpot אינו אוסר ע\"ש ואולי לזה השמיט סיום דברי הרשב\"א לומר דלא תליא מידי בריח הcooking או צלי רק בהruled הpot ומ\"ש בד\"א בצלי etc. אבל לבשל etc. אפשר דאורחא דמלתא נקט דכל צלי by way of לצלותו בשפוד וצלי קדר חשיב cooking ובב\"ח שם רצה לסתור הוכחות ב\"י ע\"פ ובאמת דברי ב\"י נכונים וברורים וצריך לדחוק ולresolved דברי Tur in name of הרשב\"א דגם הוא לא תלי מידי בcooking אלא ה\"ק שאין ריח המתבשלים כיון שהוא בpot המruledת כ\"כ אוסר ובאו\"ה כלל ל\"ט הבין דברי Tur כplainו:"]
**** END BLOCK ****
```

### 7. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 2 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=2#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 2
marker: ב
**** HEBREW ****
["<b>ודוקא שהתנור פתוח קצת. </b>ואז אפילו לכתחלה מותר וכדכתב בת\"ח שם דין י' ע\"ש הרשב\"א וכ\"כ בסימני ת\"ח שם וזה החילוק בין בישול לצלי והעט\"ז הבין שדעת הרב דלענין ריחא אין איסור בבישול אפילו בתנור קטן וסתום ופי הקדרות מגולים אלא דהמנהג שבישול שוה לצלי בכל מילי בין ענין לכתחלה בין לענין דיעבד ולא כיון יפה עיין בת\"ח שם:"]
**** ENGLISH ****
["investigateא שהoven פתוח קצת. ואז אפילו לat first permitted וכדwrote בת\"ח שם דין י' ע\"ש הרשב\"א וכ\"כ בסימני ת\"ח שם וזה החילוק בין cooking לצלי והעט\"ז הבין שדעת הרב דregarding ריחא אין איסור בcooking אפילו בoven קטן וסתום ופי pots uncovered אלא דהcustom שcooking שוה לצלי בכל מילי בין ענין לat first בין regarding דיעבד ולא כיון יפה עיין בת\"ח שם:"]
**** END BLOCK ****
```

### 8. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 2 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=2#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 2
marker: ג
**** HEBREW ****
["<b>ובמקום הפסד מרובה יש להקל. </b>ומהרש\"ל באו\"ש ובספרו פג\"ה סי' י\"ד לא חילק ואוסר לעולם בתנור סתום אפילו גדול ומשמע דאוסר אף במקום הפסד מרובה ע\"ש טעמו והב\"ח פסק כהרב:"]
**** ENGLISH ****
["ובמקום great loss יש to be lenient. ומהרש\"ל באו\"ש ובספרו פג\"ה סי' י\"ד לא חילק ואוסר לעולם בoven סתום אפילו גדול וit appears דאוסר even במקום great loss ע\"ש טעמו והב\"ח ruled כהרב:"]
**** END BLOCK ****
```

### 9. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: א
**** HEBREW ****
["<b>מיהו כשאינה ב\"י מותר להשתמש בה. </b>ולא גזרו שאינה ב\"י אטו ב\"י (כדלקמן ר\"ס קכ\"ב) אפילו לכתחלה כיון דלא אפשר שהרי העובד כוכבים לא ישמע לו לעשות מרדה חדשה בכל פעם שישפוך עליה של איסור עכ\"ל התוס':"]
**** ENGLISH ****
["מיהו כשאינה ב\"י permitted להשתמש בה. ולא גזרו שאינה ב\"י אטו ב\"י (כדbelow ר\"ס קכ\"ב) אפילו לat first כיון דלא אפשר שהרי הnon-Jew לא ישמע לו לעשות מרדה חדשה בכל פעם שישפוך עליה של איסור עכ\"ל הTosafot:"]
**** END BLOCK ****
```

### 10. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: ב
**** HEBREW ****
["<b>ולא קליפה כו'. </b>ולא הגעלה אחר הקליפה דמרדה דינה ככלי שתשמישו ע\"י האור דנתבאר בא\"ח סימן תנ\"א ס\"ד דצריך ליבון ת\"ה שם וע\"ל סי' קכ\"א:"]
**** ENGLISH ****
["ולא shell etc.. ולא הגcame up אחר הshell דמרדה דינה ככלי שits use ע\"י האור דנתבאר בא\"ח siman תנ\"א ס\"ד דצריך libun ת\"ה שם וע\"ל סי' קכ\"א:"]
**** END BLOCK ****
```

### 11. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: א
**** HEBREW ****
["<b>פת חמה כו'. </b>אסור מפני ששואב הריח של יין ואע\"ג דלעיל סעיף א' כתב ואם צלאן ה\"ז מותר והפוסקים מדמים ב' דינים אלו להדדי מ\"מ הא התוס' והרא\"ש כתבו להדיא בפרק בתרא דעבודת כוכבים דף ס\"ז דל\"ד להדדי וכן הוא בראב\"ן דף ע\"ד ע\"ד ובשאר פוסקים ואחרונים:"]
**** ENGLISH ****
["פת חמה etc.. forbidden מפני ששואב הריח של יין ואע\"ג דabove seif א' wrote ואם צלאן ה\"ז permitted והposkim מדמים ב' דינים אלו להדדי מ\"מ הא הTosafot והרא\"ש כתבו להדיא בפרק בתרא דעבודת כוכבים daf ס\"ז דל\"ד להדדי וכן הוא בראב\"ן daf ע\"ד ע\"ד וin other poskim ואחרונים:"]
**** END BLOCK ****
```

### 12. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: ב
**** HEBREW ****
["<b>של יין נסך. </b>פירוש אפילו סתם יינם או שאר יין נסך שמותר בהנאה משום דריח כי האי חשיב כאוכל כמ\"ש בפרק בתרא דעבודת כוכבים דריח זה חשיב כאוכל והכי מוכח בש\"ס דאיתא התם דין זה גבי יין של תרומה דמותר בהנאה:"]
**** ENGLISH ****
["של יין נסך. Explanation: אפילו stam יינם or thatאר יין נסך שpermitted in benefit becauseריח כי האי חשיב כאוכל כמ\"ש בפרק בתרא דעבודת כוכבים דריח זה חשיב כאוכל והכי proven בש\"ס דאיתא התם דין זה גבי יין של תרומה דpermitted in benefit:"]
**** END BLOCK ****
```

### 13. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: ג
**** HEBREW ****
["<b>אם הפת חמה כו'. </b>ה\"ה בחבית פתוחה ופת צוננת כדאיתא בש\"ס פכ\"צ דף ע\"ו ופ' בתרא דעבודת כוכבים דף ס\"ו וכן משמע בסימני ת\"ח שם די\"א:"]
**** ENGLISH ****
["אם הפת חמה etc.. ה\"ה בחבית פתוחה ופת צוננת כדאיתא בש\"ס פכ\"צ daf ע\"ו ופ' בתרא דעבודת כוכבים daf ס\"ו וכן it appears בסימני ת\"ח שם די\"א:"]
**** END BLOCK ****
```

### 14. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 5 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 5
marker: א
**** HEBREW ****
["<b>אבל אסור לטועמו. </b>אע\"פ שאינו בולע ע\"ש בריב\"ש שכ' דבכל איסורי אכילה אפי' שאינם אסורים בהנאה נמי אסור לטועמן:"]
**** ENGLISH ****
["אבל forbidden לטועמו. אע\"פ שאינו בולע ע\"ש בריב\"ש שwrote דבכל איסורי אכילה even שאינם forbiddenים in benefit נמי forbidden לטועמן:"]
**** END BLOCK ****
```

### 15. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 5 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 5
marker: ב
**** HEBREW ****
["<b>דמותר בהנאה. </b>צ\"ע דלקמן ר\"ס קכ\"ג כתב דיש לאסור סתם יינם לכתחלה בהנאה ובדברי התוס' פ' בתרא דעבודת כוכבי' דף ס\"ו ד\"ה אביי מבואר דזילוף חשיב הנאה גמורה ואסור לכ\"ע ביין האסור בהנאה (וכ\"פ הרשב\"א בתשו' ומביאו ב\"י לקמן ר\"ס קכ\"ג דזילוף הוא הנאה גמורה ואסור בסתם יינם ע\"ש) ויש ליישב בדוחק וע\"ל ס\"ס קנ\"ה:"]
**** ENGLISH ****
["דpermitted in benefit. צ\"ע דbelow ר\"ס קכ\"ג wrote דיש לforbidden stam יינם לat first in benefit ובדברי הTosafot פ' בתרא דעבודת כוכבי' daf ס\"ו ד\"ה אביי explained דזילוף חשיב הנאה גteacher וforbidden לכ\"ע ביין הforbidden in benefit (וכ\"פ הרשב\"א בתשו' ומביאו ב\"י below ר\"ס קכ\"ג דזילוף הוא הנאה גteacher וforbidden בstam יינם ע\"ש) ויש לresolved בforced וע\"ל ס\"ס קנ\"ה:"]
**** END BLOCK ****
```

### 16. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 6 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 6
marker: _
**** HEBREW ****
<b>מותר להריח בהם לכתחלה. </b>לפי שאין היין נותן בהם כח ואין עושין כן כדי ליתן היין טעם בתבלין אלא אדרבה ליתן התבלין טעם ביין וגם זה שמריח בו אינו מכוון לריח היין אלא לריח התבלין ומ"מ מסתבר דלבשמים דהבדלה אסור משום הקריבהו נא לפחתך עכ"ל רשב"א וכתבו המחבר גם בא"ח סימן רצ"ז ס"ג:
**** ENGLISH ****
permitted להריח בהם לat first. לפי שאין היין נותן בהם כח ואין עושין כן the measure of ליתן היין טעם בspice אלא אדרבה ליתן הspice טעם ביין וגם זה שמריח בו אינו מכוון לריח היין אלא לריח הspice וnevertheless מסתבר דלבשמים דהבדלה forbidden because הקריבהו נא לפחתך end of his words רשב"א וכתבו Mechaber גם Orach Chaim siman רצ"ז seif 3:
**** END BLOCK ****
```

### 17. `siman_108/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: _
**** HEBREW ****
<b>אסור להריח בהן. </b>דאסורים הם בהנאה דכל שעשויים להריח כורד והדס כו' אסור עכ"ל רשב"א וכ"כ בא"ח וז"ל זה הכלל כל מידי דלא הוי להריח ריחא לאו מילתא היא אבל דבר שעומד להריח כגון ורד והדס אסור ליהנות מהריח עכ"ל ב"י וכ"כ התוס' פ"ק דעבודת כוכבים דף י"ב ד"ה אלא בורד והדס בשם ר"ת ותירץ בזה הא דמותר להריח ביין בסעיף ה' וכ"כ המרדכי פכ"ש וז"ל אבל בדבר שאין עיקרו עומד להריח בהא קאמר רבא ריחא לאו מילתא היא וראיה מהדס ואתרוג במסכת סוכה עכ"ל אבל באמת ראייה זה איני מכיר ואדרבה משמע לכאורה איפכא דהכי איתא התם במסכת סוכה פ' לולב הגזול (סוכה דף ל"ז ע"ב) אמר רבא הדס של מצוה אסור להריח בו אתרוג של מצוה מותר להריח בו מ"ט הדס דלריחא קאי כי אקצייה מריחא אקצייה אתרוג דלאכילה קאי כי אקצייה מאכילה אקציי' עד כאן משמע דוקא אתרוג דמצוה הוא דאסור משום דהוקצה למצותו הילכך כיון שאינו עומד להריח אמרינן דלא הוקצה ריחו למצותו אבל דבר שאסור מן התורה לא משום מוקצה נראה דאין חילוק דס"ס נהנה הוא מהריח ובתוס' בעבודת כוכבים שם מסקי גם כן דבעבודת כוכבים אין חילוק (וכתבו דהא דסעיף ה' ביין שאני דליכא הנאה כי אדרבה חוזק היין נכנס בחוטמו ומזיקו אבל בשאר איסורים מודים לר"ת ע"ש) הלכך בעבודת כוכבים עכ"פ אין להקל:
**** ENGLISH ****
forbidden להריח בהן. דforbiddenים הם in benefit דכל שעשויים להריח כורד והדס etc. forbidden end of his words רשב"א and so too Orach Chaim וand these are his words זה הכלל כל מידי דלא הוי להריח ריחא לאו מילתא היא אבל דבר שעומד להריח כגון ורד והדס forbidden ליהנות Maharaiח end of his words ben yomo and so too הTosafot first chapter דעבודת כוכבים daf י"ב s.v. אלא בורד והדס in name of ר"ת וresolved בזה הא דpermitted להריח ביין בseif ה' and so too המרדכי פkli sheni וand these are his words אבל בדבר שאין עיקרו עומד להריח בהא קאמר רבא ריחא לאו מילתא היא וproof מהדס ואתרוג במסכת סוכה end of his words אבל באמת ראייה זה איני מכיר ואדרבה it appears it appears איפכא דהכי איתא התם במסכת סוכה פ' לולב הגזול (סוכה daf ל"ז side 2) אמר רבא הדס של מצוה forbidden להריח בו אתרוג של מצוה permitted להריח בו מ"ט הדס דלריחא deals with כי אקצייה מריחא אקצייה אתרוג דלאכילה deals with כי אקצייה מאכילה אקציי' עד כאן it appears specifically אתרוג דמצוה הוא דforbidden becauseהוקצה למצותו therefore כיון שאינו עומד להריח אמרינן דלא הוקצה ריחו למצותו אבל דבר שforbidden מן התורה לא because מוקצה it appears דאין חילוק דend of seif נהנה הוא Maharaiח ובTosafot בעבודת כוכבים שם מסקי גם כן דבעבודת כוכבים אין חילוק (וכתבו דהא דseif ה' ביין this case is different דthere is not הנאה כי אדרבה חוזק היין נכנס בחוטמו ומזיקו אבל in other איסורים מודים according to R' Tam see there) הלכך בעבודת כוכבים עכ"פ one should not be lenient:
**** END BLOCK ****
```

### 18. `siman_108/turei-zahav/part-001.txt` — turei-zahav — seif 1 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: turei-zahav
seif: 1
marker: א
**** HEBREW ****
<b>אין צולין בשר כשירה כו'. </b>אפי' אם הכשירה שמינה והאיסור רזה דריח הכשירה מפטם לאיסור וחוזר ואוסר את ההיתר כן פרש"י בפרק כיצד צולין ולעיל סי' ק"ה סעיף ה' כתבתי דברי מהרא"י במה שמחלק בין הא ובין הך דאין הנאסר אוסר אלא במקום שהאיסור עצמו יכול לילך שם וכתב מהרא"י בפסקיו סי' ע"ו דמ"מ שרי לכתחלה לצלות כבד בתנור עם תבשיל למ"ד ריחא מילתא הוא דכל דם הוא כחוש ולא שייך כאן דהתבשיל מפטם להדם וחוזר ואוסר התבשיל דדם הנבלע בכבד הוא דבר קלוש כו'. וכתב רש"ל בא"ו שלו סי' ל"ה על זה דדוקא בכבד שכולו היתר התיר מהרא"י אבל בשר שנאסר מחמת דם כגון שנמלח בכלי שאינו מנוקב אוסר בשר שנצלה או נתבשל עמו בתנור לפי שאמרי' חתיכה עצמה נעשה נבילה אפי' גבי דם ומו"ח ז"ל חולק עליו דכל דם קלוש הוא ואינו אוסר בריחא והכי משמע לישנא דמהרא"י הנ"ל וכ"ז הוא לכתחלה אליבא דהלכתא דבדיעבד הכל שרי ודבר פשוט הוא דאם גם התבשיל הוא דבר כחוש אפילו לכתחלה שרי וכ"כ ב"י בסי' צ"ז בשם ת"ה הארוך ומהרא"י הנ"ל לא איירי אלא בתבשיל שמן וכן העתיק ב"י דבריו בסי' צ"ז ומש"ה כ' עליו דאין טעמו נראה להקל ובת"ח כלל ל"ה דין ג' הביא דברי מהרא"י הנ"ל לענין שניהם כחושים וכתב על זה דיש להחמיר לכתחלה כיון דהב"י כתב דאין טעמו נראה ולא דק בזה כדפרישית ובפת כתבו הפוסקים בשם ר"ת שאין שייך בו ריח כלל משום הכי אין אוסר פת חמץ בפסח שנאפית עם מצה:
**** ENGLISH ****
אין צולין meat כשירה etc.. even אם הכשירה שמינה והאיסור רזה דריח הכשירה מפטם לאיסור וחוזר ואוסר את ההיתר כן פרש"י בפרק כיצד צולין וabove siman 105 seif ה' I wrote דברי מהרא"י במה שמdisagreed בין הא ובין הך דאין הנאסר אוסר אלא במקום שהאיסור עצמו יכול לילך שם וwrote מהרא"י בruledיו סי' ע"ו דnevertheless שרי לat first לצלות liver בoven עם dish למ"ד ריחא מילתא הוא דכל blood הוא כחוש ולא שייך כאן דthe dish מפטם להblood וחוזר ואוסר the dish דblood הנabsorbed בliver הוא דבר קלוש etc.. וwrote Rashal בא"ו שלו סי' ל"ה על זה דspecifically בliver שכולו היתר התיר מהרא"י אבל meat שנאסר מחמת blood כגון שנsalt בכלי שאינו מנוקב אוסר meat שנצלה או was cooked עמו בoven לפי שאמרי' חתיכה עצמה נעשה nevelah even גבי blood וMaharach and these are his words disagrees עליו דכל blood קלוש הוא ואינו אוסר בריחא והכי it appears לישנא דמהרא"י הit appears to me וכ"ז הוא לat first according to דthe halachah דb'dieved הכל שרי ודבר plain הוא דאם גם the dish הוא דבר כחוש אפילו לat first שרי and so too ben yomo בסי' צ"ז in name of ת"ה הארוך ומהרא"י הit appears to me לא איירי אלא בdish שמן וכן העתיק ben yomo דבריו בסי' צ"ז וfor this reason wrote עליו דאין טעמו it appears to be lenient וTurei Chayim כלל ל"ה דין ג' הביא דברי מהרא"י הit appears to me regarding both of them כחושים וwrote על זה דיש להחמיר לat first כיון דBeit Yosef wrote דאין טעמו it appears ולא דק בזה כדfruitשית ובפת כתבו הposkim in name of ר"ת שאין שייך בו ריח כלל because הכי אין אוסר פת חמץ בפסח שנאפית עם מצה:
**** END BLOCK ****
```

### 19. `siman_108/turei-zahav/part-001.txt` — turei-zahav — seif 1 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: turei-zahav
seif: 1
marker: ב
**** HEBREW ****
<b>ואם התנור גדול כו'. </b>משמע דתרתי בעינן גדול וגם פיו פתוח וכן כתב הטור כאן ואע"ג דבסי' צ"ז כתב וז"ל דוקא בתנור קטן כמו בשלהם אבל בתנורים שלנו הגדולים שרי ולא הזכיר פתוח נראה פשוט דרמזו במ"ש בתנורים שלנו דידוע שכל התנורים שלנו הם פתוחים ובד"מ דחק בזה לחלק דלעיל מיירי לענין בשר בחלב וכאן בשאר איסורים ומו"ח ז"ל תירץ דלעיל מיירי בדיעבד וכאן לכתחלה וכל זה ללא צורך דפשוט הוא כמ"ש. וכתב מהרא"י בשערים ורש"ל פרק גיד הנשה סי' י"ד מביאו דלפי דעת האשר"י דתלי טעמא משום דתנורים שלהם מכוסים הוו לא היה לנו להקפיד כשהתנור גדול קצת שיכול ההבל להתפשט אע"פ שאינו מחזיק י"ב עשרונים:
**** ENGLISH ****
ואם הoven גדול etc.. it appears דתרתי בעינן גדול וגם פיו פתוח וכן wrote Tur כאן וeven though דבסי' צ"ז wrote וand these are his words specifically בoven קטן כמו בשלהם אבל בovenים שלנו הגדולים שרי ולא הזכיר פתוח it appears plain דרמזו בwhat he wrote בovenים שלנו דידוע שכל הovenים שלנו הם פתוחים ובד"מ דחק בזה לdisagreed דabove deals with regarding meat בחלב וכאן in other איסורים וMaharach and these are his words resolved דabove deals with b'dieved וכאן לat first וכל זה ללא צורך דplain הוא כwhat he wrote. וwrote מהרא"י בשערים וRashal פרק גיד הנשה סי' י"ד מביאו דלפי דעת האשר"י דתלי טעמא becauseovenים שלהם מכוסים הוו לא היה לנו להקפיד כשהoven גדול קצת שיכול ההבל להתפשט אon the surface of שאינו מחזיק י"ב עשרונים:
**** END BLOCK ****
```

### 20. `siman_108/turei-zahav/part-001.txt` — turei-zahav — seif 1 — marker `ג`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: turei-zahav
seif: 1
marker: ג
**** HEBREW ****
<b>ובדיעבד להקל אפי' בתנור קטן. </b>פי' אפי' סתום:
**** ENGLISH ****
וb'dieved to be lenient even בoven קטן. Explanation: even סתום:
**** END BLOCK ****
```

### 21. `siman_108/turei-zahav/part-001.txt` — turei-zahav — seif 1 — marker `ד`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: turei-zahav
seif: 1
marker: ד
**** HEBREW ****
<b>דזה מקרי לענין זה דיעבד. </b>כתב בת"ח כלל ל"ה ומ"מ המנהג להקל לקנות מן העובדי כוכבים דברים המבושלים בכליהם שאין בהם משום בישול עובדי כוכבים דסתם כליהם אינן בני יומן ואע"פ דנ"ט לפגם אסור לכתחלה מ"מ לא חשבינן הקנייה לכתחלה לכן נוהגים היתר פה קראקא לקנות האגוזים שלמים () שמבשלים העובדי כוכבים או שאר דברים:
**** ENGLISH ****
דזה מקרי regarding זה דיעבד. wrote Turei Chayim כלל ל"ה וnevertheless הcustom to be lenient לקנות מן הgentiles דברים הcookedים בכליהם שאין בהם because cooking gentiles דstam כליהם אינן ben yomo ואon the surface of דנ"ט for spoilage forbidden לat first nevertheless לא חשבינן הקנייה לat first לכן נוהגים היתר פה קראקא לקנות האגוזים peace offerings () שcooksים הgentiles or thatאר דברים:
**** END BLOCK ****
```

### 22. `siman_108/turei-zahav/part-001.txt` — turei-zahav — seif 1 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=1#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: turei-zahav
seif: 1
marker: ה
**** HEBREW ****
<b>ואפי' בדיעבד אסור אם שניהם מגולים. </b>זה דעת א"ו הארוך לפרש כן דברי המרדכי פג"ה כמ"ש בת"ח משמו דאפילו בתנור נדול ופתוח אסור אבל רש"ל פג"ה סי' ט"ו כתב על דברי המרדכי שהיינו דוקא בתנור קטן או מכוסה אבל בתנור גדול ופתוח לכ"ע שרי ולזה הסכים מו"ח ז"ל. ולי נראה כפסק רמ"א דהא במרדכי שמה מדמי לה לפת חמה וחבית פתוחה דהוא אסור אפי' דיעבד כמ"ש הש"ע בסעיף ד':
**** ENGLISH ****
וeven b'dieved forbidden אם both of them uncovered. זה דעת א"ו הארוך לפרש כן דברי המרדכי פג"ה כwhat he wrote Turei Chayim משמו דאפילו בoven נדול ופתוח forbidden אבל Rashal פג"ה סי' ט"ו wrote על דברי המרדכי שthat is specifically בoven קטן או מכוסה אבל בoven גדול ופתוח לכ"ע שרי ולזה agreed Maharach and these are his words. ולי it appears כruled רמ"א דהא במרדכי שמה מדמי לה לפת חמה וחבית פתוחה דהוא forbidden even דיעבד כwhat he wrote הש"ע בseif ד':
**** END BLOCK ****
```

### 23. `siman_108/turei-zahav/part-001.txt` — turei-zahav — seif 1 — marker `ו`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=1#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: turei-zahav
seif: 1
marker: ו
**** HEBREW ****
<b>אפי' בכל מה שבתנור כו'. </b>דיש לנו לומר שאין להצטרף אותם דהא אפי' בצלייה אמרינן אין איסור בלוע יוצא מחתיכה לחתיכה בלא רוטב מכל מקום בריחא יש להקל מטעם דכל הנכנס בספק מסייע לבטל:
**** ENGLISH ****
even בכל מה שבoven etc.. דיש לנו לומר שאין להצטרף אותם דהא even בroasting אמרינן אין איסור absorbed יוצא מחתיכה לחתיכה without sauce מכל מקום בריחא יש to be lenient for the reason דכל הנכנס בdoubt מסייע לבטל:
**** END BLOCK ****
```

### 24. `siman_108/turei-zahav/part-001.txt` — turei-zahav — seif 3 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: turei-zahav
seif: 3
marker: א
**** HEBREW ****
<b>אסור ליתן עליה היתר כל היום. </b>באו"ה כלל ל"ט סי' ז' שאסרו אפי' בדיעבד אם הוציאו העובד כוכבים מן התנור על כלי אחד עוגות עם פשטיד"א של איסור וסיים אחר כך מיהו לא אסר אלא הפת הראשון שידוע בבירור שהוציאוהו מיד אחר הפשטיד"א משום שמנונית של איסור שעל המרדה ואם אין מכירו חד בתרי בטל אע"ג דהוה ראוי להתכבד דאין איסורו מגופו ואם היא אינה בת יומא פשיטא דאינה אוסרת וכתב רש"ל פ' גיד הנשה סי' ל"ח דצריך ששים בהיתר נגד האיסור שברחת והוא אזיל לטעמיה דכתבתי משמו בסי' ק"ה סעיף ט' דאף באפייה בעינן ס' כבישול ולא כרמ"א:
**** ENGLISH ****
forbidden ליתן עליה היתר כל today. בIssur VeHeter כלל ל"ט סי' ז' שאסרו even b'dieved אם they removed הnon-Jew מן הoven על כלי אחד עוגות עם פשטיד"א של איסור וסיים אחר כך מיהו לא אסר אלא הפת הראשון that it is known clearly שthey removedהו מיד אחר הפשטיד"א because grease של איסור שעל המרדה ואם אין מכירו חד בתרי בטל even though דהוה ראוי to honor דאין איסורו מגופו ואם היא אינה ben yomo פשיטא דאינה אוסרת וwrote Rashal פ' גיד הנשה סי' ל"ח דצריך sixty in heter נגד האיסור שברחת והוא אזיל לטעמיה דI wrote משמו בsiman 105 seif ט' דeven באפייה בעינן sixty כcooking ולא כרמ"א:
**** END BLOCK ****
```

### 25. `siman_108/turei-zahav/part-001.txt` — turei-zahav — seif 3 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: turei-zahav
seif: 3
marker: ב
**** HEBREW ****
<b>משום דא"א בענין אחר. </b>בתוס' פ' בתרא דעבודת כוכבים הביאם ב"י סימן צ"ז כתוב הטעם בזה שהרי לא ישמע לו העובד כוכבים לעשות מרדה חדשה בכל פעם שישפוך עליה איסור עכ"ל. נראה פירושו שהרי אנו קונין פת עובדי כוכבים ואין להם אלא מרדה אחת שמוציא עליה איסור גם כן ואי אפשר להזהר מזה שהרי העובד כוכבים לא ישמע לנו אם נאמר לו שיעשה מרדה חדשה תמיד ע"כ הותר גם לישראל להשתמש בה לכתחלה. <i data-commentator="Nekudot HaKesef" data-label="♯" data-order="1"></i>ובלבוש כתב הטעם בהיתר זה לכתחלה שלא גזרו בה משום בת יומא כמו בשאר כלים משום דלא שכיחא והוא פירוש בדוי מלב אין לו מקור:
**** ENGLISH ****
becauseא"א בענין אחר. בTosafot פ' בתרא דעבודת כוכבים הביאם ben yomo siman צ"ז כתוב the taste בזה שהרי לא ישמע לו הnon-Jew לעשות מרדה חדשה בכל פעם שישפוך עליה איסור end of his words. it appears Explanation:ו שהרי אנו קונין פת gentiles ואין להם אלא מרדה אחת שמוציא עליה איסור גם כן ואי אפשר להזהר מזה שהרי הnon-Jew לא ישמע לנו אם נאמר לו שיעשה מרדה חדשה תמיד until here הותר גם לישראל להשתמש בה לat first. ובלבוש wrote the taste in heter זה לat first שלא גזרו בה because ben yomo כמו in other כלים becauseלא commonא והוא Explanation: בדוי מלב אין לו מקור:
**** END BLOCK ****
```

### 26. `siman_108/turei-zahav/part-001.txt` — turei-zahav — seif 5 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: turei-zahav
seif: 5
marker: _
**** HEBREW ****
<b>אבל אסור לטועמו. </b>פי' לשום איסור והטעם דלא גרע מריחא ונכון להעמיד הג"ה זאת אחר סעיף ה' ור"ל אע"פ שמותר לשאוף מ"מ אסור לטעום כו' שוב ראיתי כן בספרים אחרים.
**** ENGLISH ****
אבל forbidden לטועמו. Explanation: לשום איסור וthe taste דלא גרע מריחא ונכון להעמיד הג"ה זאת אחר seif ה' ור"ל אon the surface of שpermitted לשאוף nevertheless forbidden לטעום etc. שוב ראיתי כן בסfruitם אחרים.
**** END BLOCK ****
```

### 27. `siman_108/turei-zahav/part-001.txt` — turei-zahav — seif 6 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: turei-zahav
seif: 6
marker: _
**** HEBREW ****
<b>מותר להריח בהם. </b>שאין היין נותן בהם כח אדרבה הם מבשמים היין וגם המריח אין כוונתו להריח היין אלא להתבלין ומיהו להבדלה אסור משום דאימאיס <i data-commentator="Nekudot HaKesef" data-label="♯" data-order="2"></i>משמע כאן דשאר פלפל מותר להבדלה ולא כמו שמצאתי כתוב דאין לעשות במוצאי שבת הבדלה על פלפלין ומביא ראייה מדאיתא במשנה סוף פרק ר' עקיבא פלפלת כל שהוא ואח"כ תנא מיני בשמים כל שהוא שמע מיניה דפלפלין אינן בכלל בשמים אלא בכלל תבלין. ולא עיין שם ברש"י שכ' דאותו פלפלת אינה פלפל שלנו ונראה דזהו דחקו לכך מדאיתא שם בגמרא פלפלת כל שהוא למאי חזיא לריח הפה ועל שאר בשמים לא מפרש בגמרא משום דסתמייהו לריח טוב אם כן גם פלפלין בכלל ע"כ פירש דמין אחר הוא כנלע"ד ברור. ועוד ראייה מפורשת ממה שכתב ב"י ביורה דעה סי' רי"ז ודע שכל דבר הבא ליתן טעם בקדירה כגון שום ובצלים וכיוצא בהם נקראים תבלין וכ"כ הרמב"ם פרק ב' דערלה ובהני שייך לפלוגי בין חיין למבושלים אבל פלפלין וכיוצא בהם אין לחלק עכ"ל הרי דפלפלין אינן בכלל תבלין אלא דינם כשאר בשמים:
**** ENGLISH ****
permitted להריח בהם. שאין היין נותן בהם כח אדרבה הם מבשמים היין וגם המריח אין כוונתו להריח היין אלא להspice ומיהו להבדלה forbidden becauseאימאיס it appears כאן דשאר פלפל permitted להבדלה ולא כמו שI found כתוב דאין לעשות במוצאי שבת הבדלה על פלפלין ומביא ראייה מדאיתא במשנה סוף פרק ר' עקיבא פלפלת כל שהוא וafterward תנא מיני בשמים כל שהוא שמע מיניה דפלפלין אינן בכלל בשמים אלא בכלל spice. ולא עיין שם ברש"י שwrote דאותו פלפלת אינה פלפל שלנו וit appears דזהו דחקו לכך מדאיתא שם in the Gemara פלפלת כל שהוא למאי חזיא לריח הפה ועל שאר בשמים לא מפרש in the Gemara becauseסתמייהו לריח טוב if so גם פלפלין בכלל until here separated דמין אחר הוא כit appears to me for practical halachah ברור. ועוד ראייה מפורשת ממה שwrote ben yomo בcauldron דעה סי' רי"ז ודע שכל דבר הבא ליתן טעם בקדירה כגון שום ובצלים וכיוצא בהם נקראים spice and so too Rambam פרק ב' דערלה ובהני שייך לפלוגי בין חיין לcookedים אבל פלפלין וכיוצא בהם אין לdisagreed end of his words הרי דפלפלין אינן בכלל spice אלא דינם כשאר בשמים:
**** END BLOCK ****
```

### 28. `siman_108/yad-avraham/part-001.txt` — yad-avraham — seif 1 — marker `_`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_108/yad-avraham/part-001.txt#slug=yad-avraham#seif=1#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: yad-avraham
seif: 1
marker: _
**** HEBREW ****
(סימן ק"ח סעיף א' בהג"ה) <b>אם אפו או צלו או"ה תחת מחבת א' מגולין אסור אפי' בדיעבד.</b> וה"ה אם אפו בכה"ג פת עם בשר אסור לאכלו בחלב אבל בזה אחר זה אין לחוש. ואפי' לכתחילה שרי לאוכלו בחלב בזא"ז. ואפי' בדבר שיש לו מתירין. שהרי לדעת הרי"ף והר"ן פג"ה ה"ל פת יש לו מתירין שאפשר לאכלו בפ"ע ואפ"ה שרי בזה אחר זה לאכלו בחלב. והכי מוכח להדיא בש"ס רפ"ק דביצה (דף ד') דהיכא דמקלי קלי איסורא שרי אפי' בדבר שיל"מ. ועיין תוס' פסחים (כ"ז ב') ובביאורי הגאון. ובזא"ז ה"ל מקלי קלי איסורא כדמוכח בש"ך ס"ק י"א שכתב שכן משמע בש"ס דע"ז גבי הא דמשני גבי ריח כמון דמקלי קלי איסורא ע"ש ודו"ק ועיין סי' ק"ב:
**** ENGLISH ****
(siman 108) אם אפו או צלו Issur VeHeter תחת pan א' מגולין forbidden even b'dieved. and the same applies אם אפו בsuch a case פת עם meat forbidden to eat them בחלב אבל בone after the other אין לחוש. וeven l'chatchila שרי לאוכלו בחלב בזOr Zarua. וeven בsomething that has a permitted aspect. שהרי לדעת הרי"ף וRan פג"ה ה"ל פת יש לו מתירין שאפשר to eat them בפ"ע וeven so שרי בone after the other to eat them בחלב. והכי proven להדיא בGemara רfirst chapter דegg (daf ד') דהיכא דמקלי קלי איסורא שרי even בדבר something that has a permitted aspect. ועיין Tosafot פסחים (כ"ז ב') ובexplanationי הגאון. ובזOr Zarua ה"ל מקלי קלי איסורא כדproven בש"ך s.k. י"א שwrote שכן it appears בGemara דע"ז גבי הא דמשני גבי ריח כמון דמקלי קלי איסורא see there investigate ועיין סי' ק"ב:
**** END BLOCK ****
```

### 29. `siman_108/yad-avraham/part-001.txt` — yad-avraham — seif 2 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/yad-avraham/part-001.txt#slug=yad-avraham#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: yad-avraham
seif: 2
marker: _
**** HEBREW ****
(שם) <b>י"א דכל מקום דאמרי' ריחא מילתא ה"מ בדליכא ס' אבל בדאיכא ס' אפי' בכל מה שבתנור מבטל האיסור ולצורך הפסד יש לנהוג כן.</b> וצ"ל דמ"ש ולצורך הפסד כו' קאי אמ"ש להקל לומר שכל מה שבתנור מבטל האיסור. דזה לא מקילינן אם לא לצורך הפסד. אבל לא בדאיכא ס' בחדא חתיכה זה אפי' באין הפסד שרי כדמוכח בכמה דוכתי גבי גדי שצלאו בחלבו. או חתיכת איסור שמינה שניצלית עם חתיכות היתר דמשערין ס' כמבואר בתוס' והרא"ש פג"ה בשם ר"ת ובכל הפוסקים. והרי ר"ת ס"ל ריחא מילתא היא ואפ"ה לכ"ע מהני ס' וזה ברור וכ"מ בת"ח כלל ל"ו דין ז':
**** ENGLISH ****
(שם) י"א דכל מקום דאמרי' ריחא מילתא ה"מ בדthere is not sixty אבל בדthere is sixty even בכל מה שבoven מבטל האיסור ולצורך הפסד יש לנהוג כן. וone must say דwhat he wrote ולצורך הפסד etc. deals with אwhat he wrote to be lenient לומר שכל מה שבoven מבטל האיסור. דזה לא מקילינן אם לא לצורך הפסד. אבל לא בדthere is sixty בחדא חתיכה זה even באין הפסד שרי כדproven בכמה דוכתי גבי גדי שצלאו בחלבו. או חתיכת איסור שמינה שניצלית עם חתיכות היתר דמשערין sixty כexplained בTosafot וRosh פג"ה in name of ר"ת ובכל הposkim. והרי ר"ת ס"ל ריחא מילתא היא וeven so לכ"ע מהני sixty וזה ברור וכ"מ Turei Chayim כלל ל"ו דין ז':
**** END BLOCK ****
```

### 30. `siman_108/yad-avraham/part-001.txt` — yad-avraham — seif 3 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/yad-avraham/part-001.txt#slug=yad-avraham#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: yad-avraham
seif: 3
marker: _
**** HEBREW ****
(שם) <b>י"א דאיסור האוסר במשהו כגון חמץ בפסח ריחא מילתא היא ואוסר אפי' בדיעבד אם התנור קטן והוא סתים והאו"ה מגולין כו'.</b> וצ"ע דאלו במקום שאין הפסד הרי כתב הג"ה לעיל בסמוך דיש להחמיר אפי' בשאר איסורים בתנור קטן וסתום לגמרי ומאי איריא איסור האוסר במשהו. ונ"ל דדעת הג"ה כדעת המג"א בא"ח הל' פסח סי' תמ"ז דבחמץ בפסח בתנור קטן וסתום לגמרי אפי' במקום הפסד אין להקל. אא"כ שפתוח קצת במקום שהעשן יוצא ובשאר איסורים שרי בכה"ג אפי' באין הפסד כמ"ש הג"ה לעיל וזה נ"ל ברור ודו"ק:
**** ENGLISH ****
(שם) י"א דאיסור האוסר במשהו כגון חמץ בפסח ריחא מילתא היא ואוסר even b'dieved אם הoven קטן והוא סתים והIssur VeHeter מגולין etc.. וrequires study דאלו במקום שאין הפסד הרי wrote הג"ה above בסמוך דיש להחמיר even in other איסורים בoven קטן וסתום לגמרי ומאי איריא איסור האוסר במשהו. וit appears to me דדעת הג"ה כדעת המג"א Orach Chaim הל' פסח סי' תמ"ז דבחמץ בפסח בoven קטן וסתום לגמרי even במקום הפסד one should not be lenient. אif so lip ofוח קצת במקום שהעשן יוצא וin other איסורים שרי בsuch a case even באין הפסד כwhat he wrote הג"ה above וזה it appears to me ברור investigate:
**** END BLOCK ****
```

### 31. `siman_108/yad-avraham/part-001.txt` — yad-avraham — seif 4 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/yad-avraham/part-001.txt#slug=yad-avraham#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: yad-avraham
seif: 4
marker: _
**** HEBREW ****
(סעיף ה' בהגה"ה) <b>אבל אסור לטועמו אע"פ שאינו בולעו.</b> והיינו דוקא באיסור ודאי אבל באיסור ספק מותר לטעום ולפלוט כדי לברר אם יש איסור כלל כמו גבי טעימת המרה לעיל סי' מ"ב ועיין בט"ז ר"ס צ"ח. ובזה שכתבתי לא תקשי אמ"ש הג"ה כאן. ועי"ל דש"ה שאינו נוטל כלום בתוך פיו רק מלחך בלשונו. משא"כ הכא דנוטל היין בפיו יש לחוש שיבלענו דהוי איסורא דאורייתא דח"ש אסור מן התורה. וכה"ג כתב הב"י בא"ח סי' תרי"ג בשם סמ"ק גבי יה"כ וכמ"ש בא"ח סי' תקס"ז לענין תענית צבור דאסור לטעום ולהפליט ע"ש. ומיהו משמע שם דאין הטעם שמא יבלע דאפי' אם יודע להעמיד עצמו שלא יבלע אסור לטעום. וכ"מ בא"ח ס"ס ר"י דמותר לטעום ולהפליט בלא ברכה ולא חיישי' שיבלע. וצ"ל דבאיסורין החמירו אפי' כשיודע להעמיד עצמו שלא יבלע הטעימה בעצמה היא אסורה. וכ"מ לשון הג"ה כאן [ולשון הת"ח סוף כלל ל"ו דאסור לטעום דבר אי' אף אם אינו אוכל דלא גרע מריחא מילתא ע"כ משמע בהדיא כמ"ש והמ"י שם הק' דבריב"ש אי' שמא יביא לאכלו. ולפמ"ש א"ש] ובא"ח סי' תקס"ז וגבי ברכת הנהנין שאין נהנה בזה מש"ה מותר. ועייו בס' באר יעקב. אבל מהרש"ל אוסר לטעום וללחך בלשונו וכ"כ האחרונים הביאן המ"י כלל פ"ח ס"ק ג' ובכבד ה"ט דע"פ רוב ימצא טעם מר. וגם רה"פ מכשירים בלא"ה ומשום דם אה"נ דצריך להדיחו מן דם בעין שעליו ולא התיר רק באיסור פגום ע"ש. וכן הוא בתשו' צ"צ סי' מ"ז דהתיר לטעום הבורית מפני שהוא פגום ולא אסרו רבנן בפגום רק אכילה ולא טעימה. וכ"מ בתוס' דיבמות:
**** ENGLISH ****
(seif ה' בhagahah) אבל forbidden לטועמו אon the surface of שאינו בולעו. וthat is specifically באיסור certainly אבל באיסור doubt permitted לטעום ולפלוט the measure of לברר אם יש איסור כלל כמו גבי טעימת המרה above סי' מ"ב ועיין בט"ז ר"ס צ"ח. ובזה שI wrote לא תקשי אwhat he wrote הג"ה כאן. ועי"ל דש"ה שאינו נוטל כלום בתוך פיו רק saltך בלשונו. משif so הכא דנוטל היין בפיו יש לחוש שיabsorbedנו דהוי איסורא d'oraisa דח"ש forbidden מן התורה. וsuch a case wrote Beit Yosef Orach Chaim סי' תרי"ג in name of סמ"ק גבי יה"כ וכwhat he wrote Orach Chaim סי' תקs.k. 7 regarding תענית צבור דforbidden לטעום ולהפליט see there. ומיהו it appears שם דאין the taste lest יabsorbed דeven אם יודע להעמיד עצמו שלא יabsorbed forbidden לטעום. וכ"מ Orach Chaim end of seif ר"י דpermitted לטעום ולהפליט without ברכה ולא חיישי' שיabsorbed. וone must say דבאיסורין החמירו even כשיודע להעמיד עצמו שלא יabsorbed הטעימה בעצמה היא forbiddenה. וכ"מ language of הג"ה כאן [וlanguage of הת"ח סוף כלל ל"ו דforbidden לטעום דבר אי' even אם אינו אוכל דלא גרע מריחא מילתא until here it appears בהדיא כwhat he wrote והמ"י שם הק' דבריב"ש אי' lest יביא to eat them. ולפwhat he wrote א"ש] וOrach Chaim סי' תקs.k. 7 וגבי ברכת הנהנין שאין נהנה בזה for this reason permitted. ועייו בsixty באר יעקב. אבל Maharshal אוסר לטעום וללחך בלשונו and so too האחרונים הביאן המ"י כלל פ"ח s.k. ג' ובliver ה"ט דon the surface of רוב ימצא טעם מר. וגם רה"פ one permits without"ה וbecauseם אה"נ דצריך לrinsedו מן blood visible שעליו ולא התיר רק באיסור spoiled see there. וכן הוא בתשו' Tzemach Tzedek סי' מ"ז דהתיר לטעום הlye מפני שהוא spoiled ולא אסרו רבנן בspoiled רק אכילה ולא טעימה. וכ"מ בTosafot דיבמות:
**** END BLOCK ****
```

### 32. `siman_108/yad-avraham/part-001.txt` — yad-avraham — seif 5 — marker `_`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_108/yad-avraham/part-001.txt#slug=yad-avraham#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: yad-avraham
seif: 5
marker: _
**** HEBREW ****
(סעיף ז') <b>בשמים של עבודת כוכבים וכלאי הכרם וערלה אסור להריח בהם.</b> במ"י שם הביא פוסקים דאפי' אי' אכילה אסור להריח אם עומד או מכוון לכך. ודלא כשו"ת אמונת שמואל שהביא באה"ט בא"ח ר"ס רט"ז [אך באו"ה כלל ל"ט איתא כא"ש וראייתו מהמוסק ומתוס' דע"ז] וא"כ כ"ש באיסור הנאה דאסור להריחו אם מכוון אע"פ שאינו עומד לכך וכ"מ ממ"ש הפר"ח בא"ח סי' תמ"ח לאסור להריח לחם של עובדי כוכבים כפסח וכ"כ בהגהת או"ה. ונראה לה"ר לזה ממ"ש הרא"ש גבי ברכת הנהנין דחייב כשמכוון אף שאינו עומד לכך וה"ה לענין איסור דאסור כשמכוון דאי לא היה אסור לא היה חייב לברך וכמ"ש כה"ג הט"ז בא"ח ס"ס רי"ז:
**** ENGLISH ****
(seif ז') בשמים של עבודת כוכבים וכלאי הכרם וערלה forbidden להריח בהם. במ"י שם הביא poskim דeven אי' אכילה forbidden להריח אם עומד או מכוון לכך. ודלא כשו"ת אמונת שמואל שהביא באה"ט Orach Chaim ר"ס רט"ז [אך בIssur VeHeter כלל ל"ט איתא כא"ש וראייתו מהמוסק ומTosafot דע"ז] וif so kli sheni באיסור הנאה דforbidden להריחו אם מכוון אon the surface of שאינו עומד לכך וכ"מ מwhat he wrote הPeri Chadash Orach Chaim סי' תמ"ח לforbidden להריח לחם של gentiles כפסח and so too בהגהת Issur VeHeter. וit appears לה"ר לזה מwhat he wrote Rosh גבי ברכת הנהנין דliable כשמכוון even שאינו עומד לכך and the same applies regarding איסור דforbidden כשמכוון דאי לא היה forbidden לא היה liable לברך וכwhat he wrote such a case Taz Orach Chaim end of seif רי"ז:
**** END BLOCK ****
```

### 33. `siman_108/yad-avraham/part-001.txt` — yad-avraham — seif 6 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_108/yad-avraham/part-001.txt#slug=yad-avraham#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: yad-avraham
seif: 6
marker: _
**** HEBREW ****
(שם בש"ך ס"ק כ"ז) <b>ואדרבה משמע לכאורה איפכא כו'.</b> עיין בשו"ת אמונת שמואל סי' ס"ה שמיישב קושיית הש"ך מעל המרדכי:
**** ENGLISH ****
(שם בש"ך s.k. כ"ז) ואדרבה it appears it appears איפכא etc.. עיין בשו"ת אמונת שמואל סי' seif 5 שמresolved קושיית Shach מעל המרדכי:
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

siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=1#marker=%D7%9B
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=1#marker=%D7%9C
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=1#marker=%D7%9E
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=1#marker=%D7%A0
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=1#marker=%D7%A1
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=2#marker=%D7%90
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=2#marker=%D7%91
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=2#marker=%D7%92
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%90
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%91
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%90
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%91
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%92
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%90
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%91
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=_
siman_108/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=_
siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=1#marker=%D7%90
siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=1#marker=%D7%91
siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=1#marker=%D7%92
siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=1#marker=%D7%93
siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=1#marker=%D7%94
siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=1#marker=%D7%95
siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=3#marker=%D7%90
siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=3#marker=%D7%91
siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=5#marker=_
siman_108/turei-zahav/part-001.txt#slug=turei-zahav#seif=6#marker=_
siman_108/yad-avraham/part-001.txt#slug=yad-avraham#seif=1#marker=_
siman_108/yad-avraham/part-001.txt#slug=yad-avraham#seif=2#marker=_
siman_108/yad-avraham/part-001.txt#slug=yad-avraham#seif=3#marker=_
siman_108/yad-avraham/part-001.txt#slug=yad-avraham#seif=4#marker=_
siman_108/yad-avraham/part-001.txt#slug=yad-avraham#seif=5#marker=_
siman_108/yad-avraham/part-001.txt#slug=yad-avraham#seif=6#marker=_