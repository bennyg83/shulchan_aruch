# Editorial retranslation — Siman 110 (part 6/7)

Generated: 2026-06-12T11:57:52.235Z

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

### 1. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 1 — marker `י`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=1#marker=%D7%99`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 1
marker: י
**** HEBREW ****
["<b>ואזלינן בספיקו לקולא. </b>כלומר אם יש בו ספק אם הוא דבר חשוב או לא וכ\"כ האו\"ה שם וכ\"כ הרב לעיל ר\"ס ק\"א אבל שאר ספיקות אשכחן דאזלינן לחומרא כמו שיתבאר בסימן זה בכמה דוכתי:"]
**** ENGLISH ****
["ואזלינן בספיקו לקולא. Meaning: אם יש בו doubt אם הוא דבר חשוב או לא וכ\"כ האו\"ה שם וכ\"כ הרב above ר\"ס ק\"א אבל שאר ספיקות אשכחן דאזלינן לstringency כמו שיתבאר בsiman זה בכמה דוכתי:"]
**** END BLOCK ****
```

### 2. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 2 — marker `א`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 2
marker: א
**** HEBREW ****
["<b>והוא שנשחטו כו'. </b>דוקא נשחטו אחר שנתערבו בעינן נשחטו בשוגג אבל נשחטו קודם שנתערבו אפי' במזיד בטלים וק\"ל:"]
**** ENGLISH ****
["והוא שwas slaughteredו etc.. specifically was slaughteredו אחר שwere mixed בעינן was slaughteredו בשוגג אבל was slaughteredו קוblood שwere mixed even במזיד are nullified וק\"ל:"]
**** END BLOCK ****
```

### 3. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 2 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=2#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 2
marker: ב
**** HEBREW ****
["<b>בשוגג. </b>אפילו אחר שנודע התערובות כמו שנתבאר בסימן ק\"א ס\"ו וע\"ש ועיין בסימן צ\"ט ס\"ק ט\"ו:"]
**** ENGLISH ****
["בשוגג. אפילו אחר שנודע התערובות כמו שנתבאר בsiman ק\"א ס\"ו וע\"ש ועיין בsiman צ\"ט ס\"ק ט\"ו:"]
**** END BLOCK ****
```

### 4. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 2 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=2#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 2
marker: ג
**** HEBREW ****
["<b>ודוקא ב\"ח קטנים כו'. </b>כתב הב\"ח יש לתמוה דבסי' ק\"א ס\"ג פסק דאפי' תרנגולת בנוצתה בטילה וכ\"ש כבש בעורו וצמרו וכנראה דדבריו סותרים זא\"ז עכ\"ל ולק\"מ דהא כתב בת\"ח כלל מ\"ב סוף דין ג' דהא דכבש בעורו וצמרו בטל היינו דוקא משום חה\"ל (ר\"ל משום דצריך תיקון גדול ומחוסר מעשה גדול לכשתהיה ראויה להתכבד) אבל מ\"מ אינו בטל מטעם דבר שבמנין (כיון דחשוב הוא דלענין דבר שבמנין לא איכפת במאי דמחוסר מעשה) כדלקמן כלל מ\"ב (ונ\"מ אם הוא במקום שאין מוכרים אותו במנין בטל) עכ\"ל וכ\"כ בסוף כלל מ\"ב דוקא ב\"ח קטנים שלאחר שנשחטו בטל חשיבותן ולא הוי אח\"כ חתיכה הראויה להתכבד או דבר שבמנין כו' לזה כתב כאן ודוקא ב\"ח קטנים שאינן ראוין להתכבד ר\"ל לא חשיבי וא\"כ לא הוה דבר שבמנין ולעיל סי' ק\"א לא כתב דבטל אלא מטעם חה\"ל וזה ברור ומ\"מ לענין דינא ע\"ל סימן ק\"ח ס\"ק ח':"]
**** ENGLISH ****
["investigateא ב\"ח קטנים etc.. wrote הב\"ח יש לתמוה דבסי' ק\"א ס\"ג ruled דeven chicken in its feathers is nullified וכ\"ש כבש בskinו וצמרו וכit appears דדבריו contradictsים זא\"ז עכ\"ל ולק\"מ דהא wrote בת\"ח כלל מ\"ב סוף דין ג' דהא דכבש בskinו וצמרו בטל that is specifically because חה\"ל (ר\"ל becauseצריך תיקון גדול ומחוסר מעשה גדול לכשתהיה worthy of honor) אבל מ\"מ אינו בטל for the reason davar sheb'minyan (כיון דחשוב הוא דregarding davar sheb'minyan לא איכפת במאי דמחוסר מעשה) כדbelow כלל מ\"ב (ונ\"מ אם הוא במקום שאין מוכרים אותו במנין בטל) עכ\"ל וכ\"כ at the end כלל מ\"ב specifically ב\"ח קטנים שלאחר שwas slaughteredו בטל חשיבותן ולא הוי אח\"כ piece worthy of honor או davar sheb'minyan etc. לזה wrote כאן investigateא ב\"ח קטנים שאינן ראוין to honor ר\"ל לא חשיבי וא\"כ לא הוה davar sheb'minyan וabove סי' ק\"א לא wrote דבטל אלא for the reason חה\"ל וזה ברור ומ\"מ regarding the halachah ע\"ל siman ק\"ח ס\"ק ח':"]
**** END BLOCK ****
```

### 5. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: א
**** HEBREW ****
["<b>תשע חנויות כו'. </b>כתב הרא\"ה בס' בדק הבית דף ק\"ך סוף ע\"א דה\"ה אם היו בעיר עשר חנויות מוחזקות לנו כולן בבשר שחוטה ולקח מאחת מהן ואינו יודע מאיזו היא ואח\"כ נתברר לנו שא' מחנויות אלו בשר נבילה דאסור דלא דמי לפירש שאין תולדות הספק מצד עצמה אלא מצד ברירת החנויות שנתברר עכשיו שא' מהן אסורה ומתוך כך נולד בה ספק על אותה שעה שהיה פירשה בידי הלוקח מהן ואם כן ספק זה אינו מחודש אלא גילוי מילתא בעלמא הוא שתחלתה היה נעלם ממנו שהיה סבור שכולן מותרות וכשנתברר שהיא אסורה איגלאי מילתא למפרע שבשעת מקח חתיכה זו כשפירשה מהן באותה שעה היה ספק שלה וזה ברור עכ\"ל ואף הרשב\"א במשמרת הבית שם מודה לו בזה אלא שמחלק שם וביאר דבריו שבתורת הבית שהעתיקם המחבר בס\"ה דדוקא כשנולד ספק טרפה במקולין כגון שנתערב טרפה בין הכשרות בחה\"ל או אפילו ודאי טרפה ולא נודע אלא עד אחר שלקח ויש ספק אם היתה הודאי טרפה במקולין זו שלקח אבל מ\"מ יודע הוא מאיזה מקולין לקח נמצא אין הספק מצד ברירת החנויות אלא שאינו יודע אם לקח מן הכשרה או מן הטריפה וא\"כ כיון שלקח קודם שנמצאת הטריפה לא אזלינן בתר האי שעתא אלא בתר השתא דהוי פירש ממילא ושרי כן הוא דעת הרשב\"א במשמרת הבית שם ע\"ש ודוק אבל הר\"ן כתב בפג\"ה אקבוע דט' חנויות וז\"ל וכתבו התוס' דלא מיקרי קבוע אלא כשהיה האיסור נודע קודם שלקח אבל אם לא נודע האיסור בשעה שלקח אע\"פ שלאחר שלקח נתגלה האיסור ונעשה קבוע לא אמרינן דלהוי קבוע למפרע ונ\"מ למי שלקח בשר מן המקולין ואח\"כ נודע שהיתה טרפה ביניהם דשרי דכיון דבשעה שלקח לא היה קבוע דדין קבוע שיהא כמחצה על מחצה חידוש הוא ואין לך בו אלא משעת חידושו ואילך כלומר משנעשה קבוע אבל למפרע לא עכ\"ל וכן לפי מה שפירשו הב\"ח והאחרונים דברי הטור דס\"ל אם ידוע שיש טרפה בחנות אחת ולא נודע באיזה מהן ולקח מא' מהן וידוע מאיזה מהן לקח) ה\"ל קבוע כיון דאין תערובות בחתיכות אלא כל חתיכה עומדת בפ\"ע והתערובות הוא בחנות א\"כ מוכח דס\"ל להטור כהר\"ן דהא כתב ע\"ז וכ\"כ א\"א הרא\"ש ז\"ל דכל מה שלקחו קודם ספיקא הכל מותר ולאחר שנולד הספק הכל אסור עכ\"ל אבל באמת לא משמע כן בתשובת הרא\"ש כלל ך' סימן י\"ז דמיירי התם להדיא בנתערבו החתיכות זו בתוך זו דאע\"פ שהן חה\"ל שרי כשלקחו קודם ספיקא מטעמא דלא גזרינן שמא יקח מן הקבוע מאחר שאז היו כולן בחזקת היתר ועדיף טפי מפירש ממילא אבל לא בספיקא דחניות וגם דברי הטור לכאורה לא משמע כן וגם הב\"י הבינם דמיירי בתערובות דחתיכות וכ\"כ בדרישה סי\"ט בשם הב\"י ע\"ש:"]
**** ENGLISH ****
["תשע חנויות etc.. wrote הרא\"ה בsixty בדק הבית daf ק\"ך סוף ע\"א דה\"ה אם היו בעיר עשר חנויות מוחזקות לנו כולן בmeat שחוטה ולקח מאחת מהן ואינו יודע מאיזו היא ואח\"כ נתברר לנו שא' מחנויות אלו meat nevelah דforbidden דלא דמי לseparated שאין תולדות הdoubt מצד עצמה אלא מצד ברירת החנויות שנתברר now שא' מהן forbiddenה ומתוך כך נולד בה doubt על אותה שעה שהיה separatedה בידי הלוקח מהן וif so doubt זה אינו מmonth אלא גילוי מילתא mere הוא שתחלתה היה נעלם ממנו שהיה סבור שכולן permittedות וכשנתברר שהיא forbiddenה איגלאי מילתא למפרע שבשעת מקח חתיכה זו כשseparatedה מהן באותה שעה היה doubt שלה וזה ברור עכ\"ל וeven הרשב\"א במשמרת הבית שם מודה לו בזה אלא שמdisagreed שם וexplained דבריו שבתורת הבית שהעתיקם Mechaber בס\"ה דspecifically כשנולד doubt טרפה במקולין כגון שנתערב טרפה בין הכשרות בחה\"ל או אפילו certainly טרפה ולא נודע אלא עד אחר שלקח ויש doubt אם היתה הcertainly טרפה במקולין זו שלקח אבל מ\"מ יודע הוא מאיזה מקולין לקח is found אין הdoubt מצד ברירת החנויות אלא שאינו יודע אם לקח מן הכשרה או מן הtereifah וא\"כ כיון שלקח קוblood שis found הtereifah לא אזלינן בתר האי שעתא אלא בתר now דהוי separated automatically ושרי כן הוא דעת הרשב\"א במשמרת הבית שם ע\"ש investigate אבל הר\"ן wrote בפג\"ה אקבוע דט' חנויות וז\"ל וכתבו הTosafot דלא מיקרי קבוע אלא כשהיה האיסור נודע קוblood שלקח אבל אם לא נודע האיסור בשעה שלקח אע\"פ שלאחר שלקח נתגלה האיסור ונעשה קבוע לא אמרינן דלהוי קבוע למפרע ונ\"מ למי שלקח meat מן המקולין ואח\"כ נודע שהיתה טרפה ביניהם דשרי דכיון honeyעה שלקח לא היה קבוע דדין קבוע שיהא כמחצה על מחצה חידוש הוא ואין לך בו אלא משעת חידושו ואילך Meaning: משנעשה קבוע אבל למפרע לא עכ\"ל וכן לפי מה שseparatedו הב\"ח והאחרונים דברי Tur דס\"ל אם ידוע שיש טרפה בחנות אחת ולא נודע באיזה מהן ולקח מא' מהן וידוע מאיזה מהן לקח) ה\"ל קבוע כיון דאין תערובות בחתיכות אלא כל חתיכה עומדת בפ\"ע והתערובות הוא בחנות א\"כ proven דס\"ל לTur כהר\"ן דהא wrote ע\"ז וכ\"כ א\"א הרא\"ש ז\"ל דכל מה שלקחו קוblood ספיקא הכל permitted ולאחר שנולד הdoubt הכל forbidden עכ\"ל אבל באמת לא it appears כן בתשובת הרא\"ש כלל ך' siman י\"ז דdeals with התם להדיא בwere mixed החתיכות זו בתוך זו דאע\"פ שהן חה\"ל שרי כשלקחו קוblood ספיקא מטעמא דלא גזרינן lest יקח מן הקבוע מאחר שאז היו כולן בpresumption of היתר ועדיף טפי מseparated automatically אבל לא בספיקא דחניות וגם דברי Tur it appears לא it appears כן וגם הב\"י הבינם דdeals with בתערובות דחתיכות וכ\"כ בדרישה סי\"ט in name of הב\"י ע\"ש:"]
**** END BLOCK ****
```

### 6. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: ב
**** HEBREW ****
["<b>שכל קבוע כמחצה כו'. </b>הכי ילפינן בב\"ק (דף מ\"ד ע\"ב) ובפרק קמא דכתובות (דף ט\"ו ע\"א) מקרא דוארב לו וקם פרט לזורק אבן לחבורת אנשים שעמדו שם ט' ישראלים וחד עובד כוכבים דפטור משום ספק נפשות להקל דאף על גב דרוב ישראלים מ\"מ ה\"ל קבוע וכמחצה על מחצה דמי. ודע דהא דקי\"ל דכל קבוע כמחצה על מחצה הוא בין לקולא ובין לחומרא כגון ט' חנויות מוכרות בשר נבילה וא' בשר שחוטה ולקח ואינו יודע מאיזה מהן לקח הוי כמחצה על מחצה ולא אסור אלא משום ספיקא ולא אמרינן דהוי כרובא הכי אמרינן בהדיא בפרק קמא דכתובות שם:"]
**** ENGLISH ****
["שכל קבוע כמחצה etc.. הכי ילפינן בב\"ק (daf מ\"ד ע\"ב) ובפרק קמא דכתובות (daf ט\"ו ע\"א) מקרא דוארב לו וקם פרט לזורק אבן לחבורת אנשים שעמדו שם ט' ישראלים וחד non-Jew דexempt because doubt נפשות to be lenient דeven על גב דרוב ישראלים מ\"מ ה\"ל קבוע וכמחצה על מחצה דמי. ודע דהא דקי\"ל דכל קבוע כמחצה על מחצה הוא בין לקולא ובין לstringency כגון ט' חנויות מוכרות meat nevelah וא' meat שחוטה ולקח ואינו יודע מאיזה מהן לקח הוי כמחצה על מחצה ולא forbidden אלא because ספיקא ולא אמרינן דהוי כרובא הכי אמרינן בהדיא בפרק קמא דכתובות שם:"]
**** END BLOCK ****
```

### 7. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: ג
**** HEBREW ****
["<b>אבל בשר כו'. </b>אפילו הוא חה\"ל כך פשוט בפוסקים:"]
**** ENGLISH ****
["אבל meat etc.. אפילו הוא חה\"ל כך plain בposkim:"]
**** END BLOCK ****
```

### 8. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: ד
**** HEBREW ****
["<b>הנמצא כו'. </b>דוקא כאן בחנות הא' ניכרת בפני עצמה אבל היכא דידוע שיש טרפה אחת בחנות ולא נודע באיזה חנות אע\"ג דהוי קבוע כמו שכתוב בס\"ק י\"ד מ\"מ אם פירש שלא בפניו נראה דלהרא\"ש וסיעתו דאסרי לקמן ס\"ק ל\"ה גבי קבוע דחה\"ל פירש ממילא אע\"ג דכל דפריש מרובה פריש מגזרה דשמא יקח מן הקבוע ומחלקים דל\"ד לט' חנויות דהאיסור נודע איזה מהן נבילה וכשירה ולכך ליכא למיחש שמא יקח מן הקבוע א\"כ הכא כיון דאין האיסור נודע נמי איכא למיחש שמא יקח מן הקבוע וכן משמע בב\"ח ס\"ו גבי מ\"ש אבל מ\"ש הרא\"ש אח\"ז דרך כלל דלא אשכחן דאסר ש\"ס משום גזירה שמא יקח מן הקבוע קודם שנולד הספק כל זמן שעומדים בחזקת היתר כו' כל זה כתב להיכא שהאיסור עומד בפ\"ע בקבוע אלא שאין נודע מקום קביעות האיסור עכ\"ל עיין שם ועיין בתשובת הרא\"ש שם:"]
**** ENGLISH ****
["הis found etc.. specifically כאן בחנות הא' ניכרת בפני עצמה אבל היכא דידוע שיש טרפה אחת בחנות ולא נודע באיזה חנות אע\"ג דהוי קבוע כמו שכתוב בס\"ק י\"ד מ\"מ אם separated שלא בפניו it appears דלהרא\"ש וסיעתו דאסרי below ס\"ק ל\"ה גבי קבוע דחה\"ל separated automatically אע\"ג דכל דfruitש מרובה fruitש מגזרה דlest יקח מן הקבוע ומdisagreedים דל\"ד לט' חנויות דהאיסור נודע איזה מהן nevelah וכשירה ולכך there is not למיחש lest יקח מן הקבוע א\"כ הכא כיון דאין האיסור נודע נמי there is למיחש lest יקח מן הקבוע וכן it appears בב\"ח ס\"ו גבי מ\"ש אבל מ\"ש הרא\"ש אח\"ז by way of כלל דלא אשכחן דאסר ש\"ס because גזירה lest יקח מן הקבוע קוblood שנולד הdoubt כל time שעומדים בpresumption of היתר etc. כל זה wrote להיכא שהאיסור עומד בפ\"ע בקבוע אלא שאין נודע מקום קביעות האיסור עכ\"ל עיין שם ועיין בתשובת הרא\"ש שם:"]
**** END BLOCK ****
```

### 9. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: ה
**** HEBREW ****
["<b>או ביד עובד כוכבים כו'. </b>כתב הרוקח סי' ת\"פ דלקחו קטן דינו כלקחו עובד כוכבים ע\"ש:"]
**** ENGLISH ****
["או ביד non-Jew etc.. wrote הרוקח סי' ת\"פ דלקחו קטן דינו כלקחו non-Jew ע\"ש:"]
**** END BLOCK ****
```

### 10. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `ו`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: ו
**** HEBREW ****
["<b>דכל דפריש כו'. </b>דכיון דנייד הלך אחר הרוב דהשתא לאו קבוע הוא ולא נולד הספק אלא כשפירש ועיין בתשו' מהרי\"ל סימן קנ\"ט:"]
**** ENGLISH ****
["דכל דfruitש etc.. דכיון דנייד הלך אחר הרוב דnow לאו קבוע הוא ולא נולד הdoubt אלא כשseparated ועיין בתשו' Maharai\"ל siman קנ\"ט:"]
**** END BLOCK ****
```

### 11. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `ז`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: ז
**** HEBREW ****
["<b>אבל חכמים אסרוהו כו'. </b>משום בשר שנתעלם מן העין כדלעיל סי' ס\"ג וכבר נתבאר שם על נכון באיזה ענין אנו מתירין משום בשר שנתעלם מן העין וכה\"ג מותר כאן פירש ממילא:"]
**** ENGLISH ****
["אבל חכמים אסרוהו etc.. because meat שנתעלם מן העין כדabove סי' ס\"ג וכבר נתבאר שם על נכון באיזה ענין אנו מתירין because meat שנתעלם מן העין וכה\"ג permitted כאן separated automatically:"]
**** END BLOCK ****
```

### 12. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `ח`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%97`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: ח
**** HEBREW ****
["<b>אבל אם פירש לפנינו כו'. </b>משום דהספק נולד במקום הקביעות. והעט\"ז כתב בסעיף זה דברים מעורבים בדיני מין במינו ומין בשאינו מינו ופשוט הוא שאין ענינם לכאן דבקבוע אפילו מין במינו ה\"ל כמחצה על מחצה ובפירש אפילו שלא במינו מרובא פריש וכבר נתבאר בסימן ק\"ט על נכון דין יבש ביבש במינו ובשאינו מינו ובסימן צ\"ח ס\"ב נתבארו דיני מין במינו ובשאינו מינו בלח בלח ע\"ש:"]
**** ENGLISH ****
["אבל אם separated לפנינו etc.. becauseהdoubt נולד במקום הקביעות. והעט\"ז wrote בseif זה דברים מskinבים בדיני species in its species ומין בשאינו מינו וplain הוא שאין ענינם לכאן דבקבוע אפילו species in its species ה\"ל כמחצה על מחצה ובseparated אפילו שלא במינו מרובא fruitש וכבר נתבאר בsiman ק\"ט על נכון דין יבש ביבש במינו ובשאינו מינו ובsiman צ\"ח ס\"ב נתבארו דיני species in its species ובשאינו מינו בלח בלח ע\"ש:"]
**** END BLOCK ****
```

### 13. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: א
**** HEBREW ****
["<b>ונתערבה באחרות כו'. </b>הב\"ח השיג על המחבר דהרשב\"א לא קאמר אלא בפירש לפנינו דאיסורו אינו אלא מדרבנן אבל לא בלקח דהספק הא' אסור מן התורה והוי כספק טרפה שנתערב דהתערובות אסור כדלקמן ס\"ט עכ\"ד וכן בהגהות שבסוף ספר או\"ה כלל כ\"ה דין י\"ב כתב דהרשב\"א (ומביאו הטור) לא מתיר אלא בפירש לפנינו דחושבו דרבנן ובאמת הכי משמע לכאורה מלשונו בת\"ה הקצר שהביא הטור שכתב ויראה לי שלא אסרו אלא בזמן שהוא בפני עצמו כו' משמע דקאי אדסמיך ליה אפירש לפנינו והיינו לישנא דאסרו משמע שחכמים אסרו מיהו בתה\"א דף ק\"כ סוף ע\"ב כתב וז\"ל מיהו דוקא שלא נתערב חתיכה זו שלקח מן הקבוע בין חתיכות אחרים של היתר כו' מיהו י\"ל דקאי אחה\"ל דמיירי התם מינה דקרי לה התם קבוע וכן בלשון הפוסקים תערובות דחה\"ל נקרא קבוע והכי נמי הספק הראשון מדרבנן וקאמר דאם לקח חה\"ל מן הקבוע ונתערבה באחרות בטלה ברוב משום ס\"ס מיהו הרב המגיד פ\"ח מהמ\"א דין י\"א כתב נמי בשם הרשב\"א שהלוקח מן הקבוע לא אסרו אלא בזמן שהוא בפני עצמו כו' ולא הזכיר שם דבר מחה\"ל רק מקבוע דחניות ודוחק לומר כשהעובד כוכבים לוקח מן הקבוע דהא סתמא קאמר ועוד דאם איתא דאעובד כוכבי' קאי ל\"ל למימר כלל שהלוקח מן הקבוע דהא הזכיר מקודם עובד כוכבי' בפירוש ואם נאמר דאין זה דוחק ואעפ\"כ מיירי בעובד כוכבים אם כן גם על המחבר לק\"מ דנוכל לומר דגם הוא מיירי בעובד כוכבי' (אבל בעט\"ז א\"א לומר כן שכתב אפילו לקח מהן בידים כו' משמע מדבריו להדיא דקאי אישראל ע\"ש) אבל יותר נראה לומר כפשטא דמילתא דרשב\"א והרב המגיד אף בלקחו ישראל מן החנויות מיירי וגם בת\"ה לא הזכיר כלל דהא דלקח עובד כוכבים בפנינו אינו אלא מדרבנן ואדרבה כ' סתמא כמה פעמים דהוי כאילו לקחו ישראל משמע דלגמרי הוי כלקחו ישראל ואסור נמי דאורייתא וכן האו\"ה והרב בת\"ח שכתבו בשם התו' ומרדכי דלקחו עובד כוכבים או פירש לפנינו אסור מדאורייתא ע\"כ נמי הכי דייקי דהא לא כתבו כן התוס' ומרדכי אלא ודאי סבירא להו כיון דכתבו סתמא דהוי כאילו לקחו ישראל משמע דאסור נמי דאורייתא א\"כ גם בדברי הרשב\"א משמע הכי ול\"ק ממאי דס\"ל להרשב\"א והמחבר בספק טרפה שנתערבה ברוב דלא בטלה דהכא דין קבוע חידוש וכדכתבתי בס\"ק י\"ד בשם הר\"ן משום דבכל דוכתי אזלינן בתר רובא ואין לך בו אלא חידושו והיינו כל שהוא בפני עצמו אבל לא כשנתערב אח\"כ זה נ\"ל ברור בדעת הרשב\"א וה\"ה והמחבר:"]
**** ENGLISH ****
["וwas mixed באחרות etc.. הב\"ח challenged על Mechaber דהרשב\"א לא קאמר אלא בseparated לפנינו דאיסורו אינו אלא d'rabbanan אבל לא בלקח דהdoubt הא' forbidden מן התורה והוי כdoubt טרפה שנתערב דהתערובות forbidden כדbelow ס\"ט עכ\"ד וכן בhagahot שat the end ספר או\"ה כלל כ\"ה דין י\"ב wrote דהרשב\"א (ומביאו Tur) לא מתיר אלא בseparated לפנינו דחושבו d'rabbanan ובאמת הכי it appears it appears מלשונו בת\"ה הקצר שהביא Tur שwrote וit appears to me שלא אסרו אלא בtime שהוא בפני עצמו etc. it appears דdeals with אדסמיך ליה אseparated לפנינו וthat is לישנא דאסרו it appears שחכמים אסרו מיהו בתה\"א daf ק\"כ סוף ע\"ב wrote וז\"ל מיהו specifically שלא נתערב חתיכה זו שלקח מן הקבוע בין חתיכות אחרים של היתר etc. מיהו י\"ל דdeals with אחה\"ל דdeals with התם מינה דקרי לה התם קבוע וכן בlanguage of הposkim תערובות דחה\"ל נקרא קבוע והכי נמי הdoubt הראשון d'rabbanan וקאמר דאם לקח חה\"ל מן הקבוע וwas mixed באחרות is nullified in the majority because ס\"ס מיהו הרב המגיד פ\"ח מהמ\"א דין י\"א wrote נמי in name of הרשב\"א שהלוקח מן הקבוע לא אסרו אלא בtime שהוא בפני עצמו etc. ולא הזכיר שם דבר מחה\"ל רק מקבוע דחניות וforced לומר כשהnon-Jew לוקח מן הקבוע דהא סתמא קאמר ועוד דאם איתא דאעובד כוכבי' deals with ל\"ל למימר כלל שהלוקח מן הקבוע דהא הזכיר מקוblood עובד כוכבי' בExplanation: ואם נאמר דאין זה forced ואעפ\"כ deals with בnon-Jew if so גם על Mechaber לק\"מ דנוכל לומר דגם הוא deals with בעובד כוכבי' (אבל בעט\"ז א\"א לומר כן שwrote אפילו לקח מהן בידים etc. it appears מדבריו להדיא דdeals with אישראל ע\"ש) אבל יותר it appears לומר כפשטא דמילתא דרשב\"א והרב המגיד even בלקחו ישראל מן החנויות deals with וגם בת\"ה לא הזכיר כלל דהא דלקח non-Jew בפנינו אינו אלא d'rabbanan ואדרבה wrote סתמא כמה פעמים דהוי כאילו לקחו ישראל it appears דלגמרי הוי כלקחו ישראל וforbidden נמי d'oraisa וכן האו\"ה והרב בת\"ח שכתבו in name of התו' ומרדכי דלקחו non-Jew או separated לפנינו forbidden מd'oraisa ע\"כ נמי הכי דייקי דהא לא כתבו כן הTosafot ומרדכי אלא certainly סבירא להו כיון דכתבו סתמא דהוי כאילו לקחו ישראל it appears דforbidden נמי d'oraisa א\"כ גם בדברי הרשב\"א it appears הכי ול\"ק ממאי דס\"ל להרשב\"א וMechaber בdoubt טרפה שwas mixed in the majority דלא is nullified דהכא דין קבוע חידוש וכדI wrote בס\"ק י\"ד in name of הר\"ן becauseבכל דוכתי אזלינן בתר רובא ואין לך בו אלא חידושו וthat is כל שהוא בפני עצמו אבל לא כשנתערב אח\"כ זה נ\"ל ברור בדעת הרשב\"א וה\"ה וMechaber:"]
**** END BLOCK ****
```

### 14. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: ב
**** HEBREW ****
["<b>בטלה ברוב כו'. </b>צ\"ע דלא יהא אלא תערובות הא המחבר ס\"ל בס\"ח דלא שרי אלא בג' תערובות והרשב\"א לטעמיה אזיל דס\"ל דשרי בב' תערובות וכדלקמן ס\"ק מ\"ט וצ\"ל דס\"ל להמחבר דכיון דקבוע חידוש הוא גרע מתערובות וכל שנתערב אח\"כ אזלינן בתר רוב ושרי ועוד ס\"ל כיון דבלא\"ה הרבה פוסקים מתירים בב' תערובות וכמו שיתבאר בס\"ק מ\"ט א\"כ בקבוע דחידוש הוא אין לך בו אלא חידושו ושרי בנתערב אח\"כ ודוחק:"]
**** ENGLISH ****
["is nullified in the majority etc.. צ\"ע דלא יהא אלא תערובות הא Mechaber ס\"ל בס\"ח דלא שרי אלא בג' תערובות והרשב\"א לטעמיה אזיל דס\"ל דשרי בב' תערובות וכדbelow ס\"ק מ\"ט וצ\"ל דס\"ל לMechaber דכיון דקבוע חידוש הוא גרע מתערובות וכל שנתערב אח\"כ אזלינן בתר רוב ושרי ועוד ס\"ל כיון דwithout\"ה הרבה poskim מתירים בב' תערובות וכמו שיתבאר בס\"ק מ\"ט א\"כ בקבוע דחידוש הוא אין לך בו אלא חידושו ושרי בנתערב אח\"כ וforced:"]
**** END BLOCK ****
```

### 15. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: ג
**** HEBREW ****
["משום ספק ספיקא. ספק בשעה שאוכל החתיכה שמא לא זו היא שבאה מהקבוע ואת\"ל זו היא שמא של היתר היא ולפי זה אסור לאכול כולך בבת אחת דליכא אלא חדא ספיקא ופשוט הוא:"]
**** ENGLISH ****
["because double doubt. doubt בשעה שאוכל החתיכה lest לא זו היא שבאה מהקבוע ואת\"ל זו היא lest של היתר היא ולפי זה forbidden לאכול כולך בבת אחת דthere is not אלא חדא ספיקא וplain הוא:"]
**** END BLOCK ****
```

### 16. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: ד
**** HEBREW ****
["<b>ויש אוסרים בכה\"ג. </b>וכן דעת הב\"ח ודלא כהעט\"ז שלא העתיק אלא דברי המחבר ותו לא לא חלי ולא הרגיש בכל מה שכתבתי לעיל:"]
**** ENGLISH ****
["ויש אוסרים בכה\"ג. וכן דעת הב\"ח ודלא כהעט\"ז שלא העתיק אלא דברי Mechaber ותו לא לא חלי ולא הרגיש בכל מה שI wrote above:"]
**** END BLOCK ****
```

### 17. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `ה`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: ה
**** HEBREW ****
["<b>בכה\"ג. </b>בדין זה דקבוע ואפי' פירש לפנינו אסור מן התורה כמחצה על מחצה ואסור אח\"כ כשנתערב כ\"כ בת\"ח כלל מ\"ג סוף דין ח' בשם או\"ה ופסק כך בסימנים והיינו דהאריך כאן בהג\"ה וכתב משום דכל מקום דאיסור במקומו כו' ולא כ' בקיצור משום דהואיל וספק הראשון מן התורה כו' אלא בא לומר דאע\"פ דפירש לפנינו או לקחו עובד כוכבים לפנינו מ\"מ כיון דהאיסור במקומו הוי כמחצה על מחצה והואיל כו' מיהו בהא אפשר להתיר אם נתערב במקום הפסד מרובה וכה\"ג כיון דמהרש\"ל פג\"ה סי' צ\"ד פסק נמי כהרשב\"א וגם דעת הר\"ן ויש פוסקים דפירש לפנינו אינו אלא מדרבנן מיהו היינו דוקא בשאינו אוכלן כאחד דאל\"ה ליכא ס\"ס כדלקמן ס\"ק נ\"ב:"]
**** ENGLISH ****
["בכה\"ג. בדין זה דקבוע וeven separated לפנינו forbidden מן התורה כמחצה על מחצה וforbidden אח\"כ כשנתערב כ\"כ בת\"ח כלל מ\"ג סוף דין ח' in name of או\"ה וruled כך בסימנים וthat is דהאריך כאן בהג\"ה וwrote becauseכל מקום דאיסור במקומו etc. ולא wrote בקיצור becauseהואיל וdoubt הראשון מן התורה etc. אלא בא לומר דאע\"פ דseparated לפנינו או לקחו non-Jew לפנינו מ\"מ כיון דהאיסור במקומו הוי כמחצה על מחצה והואיל etc. מיהו בהא אפשר להתיר אם נתערב במקום great loss וכה\"ג כיון דמהרש\"ל פג\"ה סי' צ\"ד ruled נמי כהרשב\"א וגם דעת הר\"ן ויש poskim דseparated לפנינו אינו אלא d'rabbanan מיהו that is specifically בשאינו אוכלן כאחד דאל\"ה there is not ס\"ס כדbelow ס\"ק נ\"ב:"]
**** END BLOCK ****
```

### 18. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `ו`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: ו
**** HEBREW ****
["<b>והואיל וספק ראשון מן התורה כו'. </b>אה\"נ אילו היה אסור משום תערובות לא הוי שרי בנתערב אח\"כ בתערובות כדלקמן ס\"ח אלא אתי לאפוקי אילו הוי ספק איסור דאסור מדרבנן הוי שרי בתערובות כדלקמן ס\"ק נ\"ג א\"נ קמ\"ל דל\"ת דגרע טפי מתערובות כיון דקבוע חידוש הוא קמ\"ל כיון דספק הראשון אסור מן התורה לא אמרינן הכי וכל זה הוצרכתי להרב בהג\"ה דסבירא ליה לקמן ס\"ח דהתערובות הב' אסור לאכלו אע\"פ שאינו אוכלו כולו כאחד אבל באו\"ה גופיה אתי שפיר דכתבתי לקמן ס\"ק נ\"ד בשמו דבב' תערובות מותר התערובות הב' כשאינו אוכלו כולן כאחד א\"כ אשמועינן כאן דגרע מתערובות והוי כספק טרפה שנתערב דלקמן סעיף ט' ואסור התערובות אע\"פ שאינו אוכלו כולו כאחד והוא ברור:"]
**** ENGLISH ****
["והואיל וdoubt ראשון מן התורה etc.. אה\"נ אילו היה forbidden because תערובות לא הוי שרי בנתערב אח\"כ בתערובות כדbelow ס\"ח אלא אתי to exclude אילו הוי doubt איסור דforbidden d'rabbanan הוי שרי בתערובות כדbelow ס\"ק נ\"ג א\"נ קמ\"ל דל\"ת דגרע טפי מתערובות כיון דקבוע חידוש הוא קמ\"ל כיון דdoubt הראשון forbidden מן התורה לא אמרינן הכי וכל זה הוצרכתי להרב בהג\"ה דסבירא ליה below ס\"ח דהתערובות הב' forbidden to eat them אע\"פ שאינו אוכלו כולו כאחד אבל באו\"ה גופיה אתי well דI wrote below ס\"ק נ\"ד בשמו דבב' תערובות permitted התערובות הב' כשאינו אוכלו כולן כאחד א\"כ אשמועינן כאן דגרע מתערובות והוי כdoubt טרפה שנתערב דbelow seif ט' וforbidden התערובות אע\"פ שאינו אוכלו כולו כאחד והוא ברור:"]
**** END BLOCK ****
```

### 19. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 5 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 5
marker: א
**** HEBREW ****
["<b>ולא נודעו חתיכות הטרפה כו'. </b>היינו שנתערבו חתיכות הטרפה בין הכשרות במקולין א' ואינו יודע מאיזה חתיכה לקח אבל אם החתיכות עומדות בפני עצמם ואיכא ספיקא בחנות כבר נתבאר דינו בס\"ק י\"ד:"]
**** ENGLISH ****
["ולא נודעו חתיכות הטרפה etc.. that is שwere mixed חתיכות הטרפה בין הכשרות במקולין א' ואינו יודע מאיזה חתיכה לקח אבל אם החתיכות עומדות בפני עצמם וthere is ספיקא בחנות כבר נתבאר דינו בס\"ק י\"ד:"]
**** END BLOCK ****
```

### 20. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 5 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 5
marker: ב
**** HEBREW ****
["<b>אבל ליקח מכאן ואילך. </b>כתב הב\"ח בסוף ס\"ו דהיינו דוקא בחתיכות שנתערבו זו בתוך זו אבל אם לא נודע החנות שיש בה האיסור קבוע כגון שנמצאת ריאה טרפה ולא נודע מאיזו חנות נקטינן כהרא\"ש ורבינו (היינו על פי שפירש הוא דברי הרא\"ש וטור ע\"ש אבל אינו מוכרח כמ\"ש בס\"ק י\"ד) דמדינא אסורים כל החתיכות שבמקולין אפילו אינן חה\"ל ואפשר דגם הרשב\"א אינו חולק ע\"ז דלא קאמר בהא מידי ולא איירי ביה עכ\"ל (וכן בד\"מ ובת\"ח ובדרישה פירשו דהטור ס\"ל דזה קבוע הוא ע\"ש):"]
**** ENGLISH ****
["אבל ליקח מכאן ואילך. wrote הב\"ח at the end ס\"ו that is specifically בחתיכות שwere mixed זו בתוך זו אבל אם לא נודע החנות שיש בה האיסור קבוע כגון שis found ריאה טרפה ולא נודע מאיזו חנות נקטינן כהרא\"ש ורבינו (that is על פי שseparated הוא דברי הרא\"ש וטור ע\"ש אבל אינו מוכרח כמ\"ש בס\"ק י\"ד) דמthe halachah forbiddenים כל החתיכות שבמקולין אפילו אינן חה\"ל ואפשר דגם הרשב\"א אינו disagrees ע\"ז דלא קאמר בהא מידי ולא איירי ביה עכ\"ל (וכן בד\"מ ובת\"ח ובדרישה separatedו דTur ס\"ל דזה קבוע הוא ע\"ש):"]
**** END BLOCK ****
```

### 21. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 5 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 5
marker: ג
**** HEBREW ****
["<b>אסור. </b>משמע אפילו אם לקחו אסור (ובס\"א איתא אבל ליקח מכאן ואילך אסור וא\"כ לא משמע מידי) וכן משמע יותר בסימני ת\"ח סוף כלל מ\"ג ע\"ש ובפנים בתורת חטאת שם:"]
**** ENGLISH ****
["forbidden. it appears אפילו אם לקחו forbidden (ובס\"א איתא אבל ליקח מכאן ואילך forbidden וא\"כ לא it appears מידי) וכן it appears יותר בסימני ת\"ח סוף כלל מ\"ג ע\"ש ובפנים בתורת sin offering שם:"]
**** END BLOCK ****
```

### 22. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 5 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 5
marker: ד
**** HEBREW ****
["<b>שאין הכל בקיאין כו'. </b>כתב הב\"ח ריש ס\"ו דהיינו טעמא כיון שהתערובות במקולין הוא שרבים קונים משם קרוב הדבר לטעות מה שאין כן בנתערב כך ליחיד בביתו דאין להחמיר (ר\"ל אע\"פ שיש שם ג\"כ חתיכות הראויות להתכבד () שלא נתערבו) אלא להורות בדין חתיכה שאינה ראויה להתכבד דבטלה ברוב עד כאן לשונו וכ\"כ מהרש\"ל פג\"ה סוף סימן כ\"ד:"]
**** ENGLISH ****
["שאין הכל בקיאין etc.. wrote הב\"ח ריש ס\"ו that is טעמא כיון שהתערובות במקולין הוא שרבים קונים משם קרוב הדבר לטעות מה שאין כן בנתערב כך ליחיד in the houseו דאין להחמיר (ר\"ל אע\"פ שיש שם ג\"כ חתיכות הראויות to honor () שלא were mixed) אלא להורות בדין חתיכה שאינה worthy of honor דis nullified in the majority until here is his language וכ\"כ מהרש\"ל פג\"ה סוף siman כ\"ד:"]
**** END BLOCK ****
```

### 23. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 6 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 6
marker: א
**** HEBREW ****
["<b>ושאר דברים החשובים. </b>כגון חה\"ל וכן דבר שבמנין ובריה וכה\"ג:"]
**** ENGLISH ****
["ושאר דברים החשובים. כגון חה\"ל וכן davar sheb'minyan וberiah וכה\"ג:"]
**** END BLOCK ****
```

### 24. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 6 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 6
marker: ב
**** HEBREW ****
["<b>אחר שנודעה התערובות אסור. </b>אבל קודם שנודע התערובות מותר אפי' למ\"ד פירש ממילא אפשר כ\"כ הרא\"ש והטור וכן הסכים מהרש\"ל פרק ג\"ה סימן כ\"א וד\"מ והאחרונים ודלא כהרשב\"א וב\"י והטעם כתב הרא\"ש בתשובה דהא דאסור פירש ממילא הוא משום שמא יקח בידים מן הקבוע והך גזרה לא אשכחן אלא היכא שכבר עומדים בחזקת איסור אבל קודם שנולד הספק לא שייך למגזר מידי שכולן בחזקת היתר הן עומדים מאי אמרת שמא יקח אחר שנולד הספק הך גזירה לא אשכחן בש\"ס ועוד בהא ליכא למטעי דאם לקח בעוד שהיה בחזקת היתר בשביל זה לא אתי ליקח לאחר שנאסרו ע\"כ:"]
**** ENGLISH ****
["אחר שנודעה התערובות forbidden. אבל קוblood שנודע התערובות permitted even למ\"ד separated automatically אפשר כ\"כ הרא\"ש וTur וכן agreed מהרש\"ל פרק ג\"ה siman כ\"א וד\"מ והאחרונים ודלא כהרשב\"א וב\"י וthe taste wrote הרא\"ש בתשובה דהא דforbidden separated automatically הוא because lest יקח בידים מן הקבוע והך גזרה לא אשכחן אלא היכא שכבר עומדים בpresumption of איסור אבל קוblood שנולד הdoubt לא שייך למגזר מידי שכולן בpresumption of היתר הן עומדים מאי אמרת lest יקח אחר שנולד הdoubt הך גזירה לא אשכחן בש\"ס ועוד בהא there is not למטעי דאם לקח בעוד שהיה בpresumption of היתר בשביל זה לא אתי ליקח לאחר שנאסרו ע\"כ:"]
**** END BLOCK ****
```

### 25. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 6 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 6
marker: ג
**** HEBREW ****
["<b>אבל אם פירש כו'. </b>דכל המיעוטים שפירשו לצד אחד אנו אמרינן בהן דכל דפריש מרובא קא פריש ואיסורא בתוך רובא אישתאר עכ\"ל הרשב\"א במשמרת הבית דף ק\"ג ע\"א וכן כ' בתה\"ק בית ד' שער א' דף ל\"ט ע\"ב ולפי זה פירשו מחציתן בבת אחת אסורים וכן משמע להדיא בתה\"ק בית ד' שער ב' דף מ\"ב ע\"ב ודלא כהפרישה סעיף כ\"ח:"]
**** ENGLISH ****
["אבל אם separated etc.. דכל המיעוטים שseparatedו לצד אחד אנו אמרינן בהן דכל דfruitש מרובא קא fruitש ואיסורא בתוך רובא אישתאר עכ\"ל הרשב\"א במשמרת הבית daf ק\"ג ע\"א וכן wrote בתה\"ק בית ד' שער א' daf ל\"ט ע\"ב ולפי זה separatedו מחציתן בבת אחת forbiddenים וכן it appears להדיא בתה\"ק בית ד' שער ב' daf מ\"ב ע\"ב ודלא כהfruitשה seif כ\"ח:"]
**** END BLOCK ****
```

### 26. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 6 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 6
marker: ד
**** HEBREW ****
["<b>אם פירש ממילא. </b>שלא בפנינו או שנתפזרו כולן אפי' בפנינו מותר שכבר נתבטל הקביעות כן כ' הרשב\"א בתה\"א דף ק\"ד ע\"ב ומביאו ב\"י וכ\"כ במשמרת הבית דף ק\"ג ע\"א דנתפזרו כולן בפנינו חשוב כפירשו שלא בפנינו ע\"ש:"]
**** ENGLISH ****
["אם separated automatically. שלא בפנינו or thatנתפזרו כולן even בפנינו permitted שכבר נתבטל הקביעות כן wrote הרשב\"א בתה\"א daf ק\"ד ע\"ב ומביאו ב\"י וכ\"כ במשמרת הבית daf ק\"ג ע\"א דנתפזרו כולן בפנינו חשוב כseparatedו שלא בפנינו ע\"ש:"]
**** END BLOCK ****
```

### 27. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 6 — marker `ה`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 6
marker: ה
**** HEBREW ****
["<b>שרי. </b>והרא\"ש והרבה פוסקים פסקו דפירש ממילא אסור דל\"ד לט' חנויות דהתם האיסור ניכר בפני עצמו ולא חיישינן שיקח מן הקבוע דברשיעי לא עסקינן משא\"כ הכא דהכל מעורב ביחד וכ\"כ מהרא\"י בהגהת ש\"ד סימן מ\"ד דהכי נהוג ומביאו רנ\"ש במ\"ש וכ\"כ מהרש\"ל פג\"ה סימן כ\"ג וכ\"פ באו\"ה כלל כ\"ו דין י\"א וגם הרב בת\"ח גופיה ריש כלל מ\"ג כתב דטוב להחמיר ובסימנים שם כתב בסתם דאסור וכ\"כ בס' אפי רברבי ריש דף נ\"א דנראה להחמיר. והב\"ח סעי' י\"א השיג על המחבר ודעתו לחלק בין בעלי חיים ושאר דברים החשובים דבבעלי חיים כיון דאפשר על ידי ניכבשינהו דניידי שרי בפירש ממילא אבל בשאר דברים החשובים אסור ורצה להוציא כן מדברי הרשב\"א והאריך ולא ירדתי לסוף דעתו בכל דבריו אלא אין חילוק כדמשמע מדברי כל הפוסקים:"]
**** ENGLISH ****
["שרי. והרא\"ש והרבה poskim ruledו דseparated automatically forbidden דל\"ד לט' חנויות דהתם האיסור ניכר בפני עצמו ולא we are concerned שיקח מן הקבוע דברשיעי לא עסקינן משא\"כ הכא דהכל מskinב together וכ\"כ מהרא\"י בהגהת ש\"ד siman מ\"ד דso is practiced ומביאו רנ\"ש במ\"ש וכ\"כ מהרש\"ל פג\"ה siman כ\"ג וכ\"פ באו\"ה כלל כ\"ו דין י\"א וגם הרב בת\"ח גופיה ריש כלל מ\"ג wrote דטוב להחמיר ובסימנים שם wrote בstam דforbidden וכ\"כ בsixty אפי רברבי ריש daf נ\"א דit appears להחמיר. והב\"ח סעי' י\"א challenged על Mechaber ודעתו לdisagreed בין בעלי חיים ושאר דברים החשובים דבבעלי חיים כיון דאפשר על ידי ניכבשינהו דניידי שרי בseparated automatically אבל in other דברים החשובים forbidden ורצה להוציא כן מדברי הרשב\"א והאריך ולא ירדתי לסוף דעתו בכל דבריו אלא אין חילוק כדit appears מדברי כל הposkim:"]
**** END BLOCK ****
```

### 28. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 6 — marker `ו`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 6
marker: ו
**** HEBREW ****
["<b>והא דאסור כו'. </b>הב\"ח תמה על פסק זה וכתב שאיננו אמת בכאן בש\"ע ולא עמדתי על סוף דעתו דודאי כאן דברי הרב אמתיים דהרי הרשב\"א כ' להדיא דפירשו כולן בפנינו הוי כשלא בפנינו ואע\"ג דהרשב\"א לא קאמר אלא דאם נתפזרו דיעבד אבל אסור לפזרן לכתחלה כמו שאסור ליקח משם מ\"מ הרי גם הרב לא הזכיר כאן שמותר לפזרן לכתחלה ולא קאמר אלא דאם הפרישן דיעבד אפילו הפרישן במתכוין דלא ידע דאיכא איסורא בדבר אע\"ג דפירשו לפנינו שהרי הפרישן במתכוין מותר כיון דנתפזרו כולן חשוב כפירשו שלא בפנינו. אכן בת\"ח כלל מ\"ג דין ב' כתב ליישב דברי הטור דסבירא ליה פירש שלא בפנינו אסור ולעיל סי' ט\"ז גבי אותו ואת בנו ובס\"ס נ\"ז גבי דרוסה שנתערבו פסק דניכבשינהו דניידי וכל דפריש מרובה קא פריש ושנים האחרונים אסורים דבסימן ט\"ז ונ\"ז מיירי שנתפרד כל התערובות ממקומן עד שלא נשאר שום קביעות במקומו וחילוק זה אינו מוכרח דמנא לן דפירשו כולן עדיף טפי מפירש ממילא שלא בפנינו והראייה שהביא מטא\"ח צ\"ע דנלפע\"ד דאינה ראיה כלל עיין שם ועוד הקשה הב\"ח דאם כן למה כתב הטור שנים האחרונים אסורים הלא נעקרו כולן ונתפזרו כולן כו' עכ\"ל ולפי עניות דעתי דעת הרב דאע\"פ שחזרו ובאו יחד במקום אחד כל שנתפזרו תחלה כולן ונעקרו מקביעות הראשון) שוב לא חשיב קבוע דדין קבוע חידוש הוא וכמו שכתבתי בסעיף קטן י\"ד בשם הר\"ן ואין לך בו אלא חידושו דהיינו שנשאר במקומו הראשון וכן משמע להדיא מלשונו בדרכי משה וזה לשונו האמת הוא מה שתירץ לי הגאון מורי חמי מהר\"ר שכנא ש\"ן דמה שכתב הטור כאן היינו בעוד שהדברים החשובים נשארו במקומן רק שפירש אחד מהן או שנים ולכן לא אמרינן דפריש מרובה פריש דהואיל ועדיין מונחים במקומן הוה ליה עדיין קבוע אבל אם פירשו וניידי כולן ממקומן שלא נשאר שם קבוע פירשו כולן שרי ע\"כ:"]
**** ENGLISH ****
["והא דforbidden etc.. הב\"ח תמה על ruled זה וwrote שאיננו אמת בכאן בש\"ע ולא עמדתי על סוף דעתו דcertainly כאן דברי הרב אמתיים דהרי הרשב\"א wrote להדיא דseparatedו כולן בפנינו הוי כשלא בפנינו ואע\"ג דהרשב\"א לא קאמר אלא דאם נתפזרו דיעבד אבל forbidden לפזרן לat first כמו שforbidden ליקח משם מ\"מ הרי גם הרב לא הזכיר כאן שpermitted לפזרן לat first ולא קאמר אלא דאם הfruitשן דיעבד אפילו הfruitשן במתכוין דלא ידע דthere is איסורא בדבר אע\"ג דseparatedו לפנינו שהרי הfruitשן במתכוין permitted כיון דנתפזרו כולן חשוב כseparatedו שלא בפנינו. however בת\"ח כלל מ\"ג דין ב' wrote לresolved דברי Tur דסבירא ליה separated שלא בפנינו forbidden וabove סי' ט\"ז גבי אותו ואת בנו ובס\"ס נ\"ז גבי דרוסה שwere mixed ruled דניכבשינהו דניידי וכל דfruitש מרובה קא fruitש ושנים האחרונים forbiddenים דבsiman ט\"ז ונ\"ז deals with שנתפרד כל התערובות ממקומן עד שלא נשאר שום קביעות במקומו וחילוק זה אינו מוכרח דמנא לן דseparatedו כולן עדיף טפי מseparated automatically שלא בפנינו והראייה שהביא מטא\"ח צ\"ע דנלפע\"ד דאינה proof כלל עיין שם ועוד challenged הב\"ח דif so למה wrote Tur שנים האחרונים forbiddenים הלא נעקרו כולן ונתפזרו כולן etc. עכ\"ל ולפי עניות דעתי דעת הרב דאע\"פ שreturned ובאו יחד במקום אחד כל שנתפזרו תחלה כולן ונעקרו מקביעות הראשון) שוב לא חשיב קבוע דדין קבוע חידוש הוא וכמו שI wrote בseif קטן י\"ד in name of הר\"ן ואין לך בו אלא חידושו that is שנשאר במקומו הראשון וכן it appears להדיא מלשונו בדרכי משה וזה לשונו האמת הוא מה שresolved לי הגאון מורי חמי מהר\"ר שכנא ש\"ן דמה שwrote Tur כאן that is בעוד שהדברים החשובים נשארו במקומן רק שseparated אחד מהן or thatנים ולכן לא אמרינן דfruitש מרובה fruitש דהואיל ועדיין מונחים במקומן הוה ליה עדיין קבוע אבל אם separatedו וניידי כולן ממקומן שלא נשאר שם קבוע separatedו כולן שרי ע\"כ:"]
**** END BLOCK ****
```

### 29. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 6 — marker `ז`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 6
marker: ז
**** HEBREW ****
["<b>הביצה מותרת. </b>דאמרינן כל דפריש מרובא פריש ולא גזרינן לגבי ביצה שיקח התרנגולים מן הקבוע ת\"ח שם בשם או\"ה ולפי זה אפילו למ\"ד דביצה חשיב דבר שבמנין שרי דהא בתשע חנויות שרי בפירש ממילא אפילו חה\"ל ופשוט הוא וכן מוכח באו\"ה דהא ס\"ל דביצה הוי דבר שבמנין:"]
**** ENGLISH ****
["הegg permittedת. דאמרינן כל דfruitש מרובא fruitש ולא גזרינן לגבי egg שיקח התרנגולים מן הקבוע ת\"ח שם in name of או\"ה ולפי זה אפילו למ\"ד דegg חשיב davar sheb'minyan שרי דהא בתשע חנויות שרי בseparated automatically אפילו חה\"ל וplain הוא וכן proven באו\"ה דהא ס\"ל דegg הוי davar sheb'minyan:"]
**** END BLOCK ****
```

### 30. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `א`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: א
**** HEBREW ****
["<b>ודבר שיש לו מתירין. </b>ע\"ל ס\"ק נ\"ו ונ\"ז:"]
**** ENGLISH ****
["וsomething that has a permitted aspect. ע\"ל ס\"ק נ\"ו ונ\"ז:"]
**** END BLOCK ****
```

### 31. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: ב
**** HEBREW ****
["<b>ונאכל כו'. </b>לשון הטור ופירש ר\"י דוקא שנפל מעצמו אבל אם הפילה אפילו שוגג אסור אטו מזיד (ודברי ר\"י הם בתוס' דזבחים ריש דף ע\"ד וע\"ל סי' צ\"ט ס\"ק ט\"ו) וכתב א\"א הרא\"ש ז\"ל שאם הפילו קודם שנודע התערובות שרי דלא שייך למיגזר כיון שעדיין לא נודע התערובות וכתב ב\"י בשם מהרא\"י בהגהת ש\"ד ובתרומות הדשן (סי' קע\"ה) דאפילו לדברי ר\"י אם אכלו או האכילו בשוגג לבן ברית שרו האחרונים ולא קנסינן בכה\"ג אטו מזיד כלומר שיאכיל א' מהן במזיד כדי להתיר האחרות ולתלות דהאיסור יהא נאכל א\"כ לפי דעתו זאת יאכיל הוא האיסור בודאי אבל האכיל בשוגג לכלב או לעובד כוכבים קנסינן וע\"פ זה כתב המחבר ונאכל בשוגג וגבי הפילו דקדק לכתוב ונפל מעצמו אבל לפע\"ד דברי מהרא\"י אינם מוכרחים דנראה דנהי דליכא למיגזר שיאכיל במזיד מ\"מ הא ודאי אם נאכל מותר כ\"ש נפל לים א\"כ ניחוש כי שרינן ליה נאכל בשוגג יפילו במזיד לים ועוד דכיון דשריא לדידיה לאכול ניחוש שמא יאכיל לעובד כוכבים או לכלב להתיר האחרות וגם בתשו' הרא\"ש כלל כ' סימן י\"ז משמע להדיא דאפילו נאכל קנסינן שוגג אטו מזיד דכתב שם אמעשה שלקחו הקהל כבשים ואחר כך נודע שכבש אחד טרפה היה שם דאם נאכל אחד מן הכבשים הותרו כולן ואע\"פ דפי' ר\"י דדוקא נפלה אבל הפילה שוגג גזרינן אטו מזיד כיון שנאכל קודם שנודע הספק לא שייך למקנסיה עכ\"ל אלא אם תאמר דמיירי שנאכל ע\"י עובד כוכבים וזה אינו במשמע בתשובה שם ע\"ש:"]
**** ENGLISH ****
["ונאכל etc.. language of Tur וseparated ר\"י specifically שfell מעצמו אבל אם הפילה אפילו שוגג forbidden אטו מזיד (ודברי ר\"י הם בTosafot דזבחים ריש daf ע\"ד וע\"ל סי' צ\"ט ס\"ק ט\"ו) וwrote א\"א הרא\"ש ז\"ל שאם הפילו קוblood שנודע התערובות שרי דלא שייך למיגזר כיון שעדיין לא נודע התערובות וwrote ב\"י in name of מהרא\"י בהגהת ש\"ד ובתרומות הדשן (סי' קע\"ה) דאפילו לדברי ר\"י אם אכלו או האכילו בשוגג לבן ברית שרו האחרונים ולא קנסינן בכה\"ג אטו מזיד Meaning: שיאכיל א' מהן במזיד the measure of להתיר האחרות ולתלות דהאיסור יהא נאכל א\"כ לפי דעתו זאת יאכיל הוא האיסור certainly אבל האכיל בשוגג לכלב או לnon-Jew קנסינן וע\"פ זה wrote Mechaber ונאכל בשוגג וגבי הפילו דקדק לכתוב וfell מעצמו אבל לפע\"ד דברי מהרא\"י אינם מוכרחים דit appears דנהי דthere is not למיגזר שיאכיל במזיד מ\"מ הא certainly אם נאכל permitted כ\"ש fell לים א\"כ ניחוש כי שרינן ליה נאכל בשוגג יפילו במזיד לים ועוד דכיון דשריא for him לאכול ניחוש lest יאכיל לnon-Jew או לכלב להתיר האחרות וגם בתשו' הרא\"ש כלל wrote siman י\"ז it appears להדיא דאפילו נאכל קנסינן שוגג אטו מזיד דwrote שם אמעשה שלקחו הקהל כבשים ואחר כך נודע שכבש אחד טרפה היה שם דאם נאכל אחד מן הכבשים הותרו כולן ואע\"פ דפי' ר\"י דspecifically fellה אבל הפילה שוגג גזרינן אטו מזיד כיון שנאכל קוblood שנודע הdoubt לא שייך למקנסיה עכ\"ל אלא אם תאמר דdeals with שנאכל ע\"י non-Jew וזה אינו בit appears בתשובה שם ע\"ש:"]
**** END BLOCK ****
```

### 32. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: ג
**** HEBREW ****
["<b>אחד מהם כו'. </b>והרמב\"ם פ\"ז מהל' עבודת כוכבים דין י' הצריך שיפלו שנים בדבר דלא מינכרא נפילתם כגון תאנה וטבעת אבל חבית וכה\"ג דמינכר נפילתה מודה דסגי בנפילת אחת מהם כמ\"ש ר\"פ ט\"ו מה' תרומות וכן פי' הכ\"מ פ\"ז מה' עבודת כוכבים וכ\"כ הרא\"ה בספר בדק הבית דף קי\"ז ע\"ב דהא דאמרינן בש\"ס אנא נמי תרתי קאמינא ר\"ל שיפלו שנים וכ\"כ הב\"י בסי' ק\"מ שהרמב\"ם פי' כן והביא דבריו בש\"ע שם:"]
**** ENGLISH ****
["one of them etc.. והרמב\"ם פ\"ז מהל' עבודת כוכבים דין י' הצריך שיפלו שנים בדבר דלא מינכרא נפילתם כגון תאנה וטבעת אבל חבית וכה\"ג דמינכר נפילתה מודה דסגי בנפילת אחת מהם כמ\"ש ר\"פ ט\"ו מה' תרומות וכן פי' הכ\"מ פ\"ז מה' עבודת כוכבים וכ\"כ הרא\"ה בספר בדק הבית daf קי\"ז ע\"ב דהא דאמרינן בש\"ס אנא נמי תרתי קאמינא ר\"ל שיפלו שנים וכ\"כ הב\"י בסי' ק\"מ שהרמב\"ם פי' כן והביא דבריו בש\"ע שם:"]
**** END BLOCK ****
```

### 33. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: ד
**** HEBREW ****
["<b>או נפל מעצמו לים. </b>אפילו אחר שנודע התערובות או הפילה שוגג קודם שנודע התערובות וכמו שנתבאר בס\"ק ל\"ט ונראה דהיינו דוקא נאכל או נפל אחד מהם קודם שפירש מהן אבל אם פירש מהן לפנינו או פירש ממילא למאן דאוסר פירש ממילא (כיון) [אף] דנאסר הוא וגם התערובות כיון שהנפרש הוא בעין א\"כ כשנפל אח\"כ לים לא מן התערובות הוא נפרש שנאמר הך דנפל דאיסור נפל אלא עמד בפני עצמו והלכך התערובות נשאר באיסורו:"]
**** ENGLISH ****
["או fell מעצמו לים. אפילו אחר שנודע התערובות או הפילה שוגג קוblood שנודע התערובות וכמו שנתבאר בס\"ק ל\"ט וit appears that is specifically נאכל או fell one of them קוblood שseparated מהן אבל אם separated מהן לפנינו או separated automatically למאן דאוסר separated automatically (כיון) [even] דנאסר הוא וגם התערובות כיון שהנפרש הוא visible א\"כ כשfell אח\"כ לים לא מן התערובות הוא נפרש שנאמר הך דfell דאיסור fell אלא עמד בפני עצמו והלכך התערובות נשאר באיסורו:"]
**** END BLOCK ****
```

### 34. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: ה
**** HEBREW ****
["<b>לים. </b>דסתמו אבוד וה\"ה לכל מקום שהוא אבוד כגון נהר עמוק וכה\"ג אבל אם נפל למקום שאפשר להמצא לא הותרו השאר כ\"כ בכ\"מ פ\"ז מה' עבודת כוכבים דין י':"]
**** ENGLISH ****
["לים. דסתמו אבוד וה\"ה לכל מקום שהוא אבוד כגון נהר עמוק וכה\"ג אבל אם fell למקום שאפשר להמצא לא הותרו השאר כ\"כ בכ\"מ פ\"ז מה' עבודת כוכבים דין י':"]
**** END BLOCK ****
```

### 35. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `ו`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: ו
**** HEBREW ****
["<b>בענין שנאבד מן העולם. </b>אבל כל שישנו בעולם ואתה צריך לדון עליה ועל השאר מפני מה נאמר שזו האחת היא האסורה אדרבה י\"ל איסורא ברוב איתא הרשב\"א:"]
**** ENGLISH ****
["בענין שנאבד מן העולם. אבל כל שישנו בעולם ואתה צריך לדון עליה ועל השאר מפני מה נאמר שזו האחת היא הforbiddenה אדרבה י\"ל איסורא in the majority איתא הרשב\"א:"]
**** END BLOCK ****
```

### 36. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `ז`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: ז
**** HEBREW ****
["<b>שנאבד. </b>אבל נחתך או נתרסק נתבאר דינו בסימן ק\"א ס\"ז וע\"ש:"]
**** ENGLISH ****
["שנאבד. אבל נחתך או נתרסק נתבאר דינו בsiman ק\"א ס\"ז וע\"ש:"]
**** END BLOCK ****
```

### 37. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `ח`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%97`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: ח
**** HEBREW ****
["<b>שאנו תולין כו'. </b>הטעם לכל אלו מפני שכבר נתבטל מן התורה ברוב הרשב\"א:"]
**** ENGLISH ****
["שאנו we rely etc.. the taste לכל אלו מפני שכבר נתבטל מן התורה in the majority הרשב\"א:"]
**** END BLOCK ****
```

### 38. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `ט`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%98`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: ט
**** HEBREW ****
["<b>דממה נפשך איכא חדא דהיתרא. </b>ואמרינן מדחבריה לאו דאיסורא איהו נמי לאו דאיסורא כ\"כ רש\"י בזבחים ומזה משמע דאם נתערבו שתים צריך לאכול ארבע ארבע וכן ג' צריך לאכול שש שש דאל\"כ ליכא למימר מדחבריה לאו דאיסורא כו' דלמא בחד דהוה המיעוט אמרינן לאו דאיסורא אלא איסורא ברובא דהיינו בשנים איתא ודוק וכן מוכח מתוך דברי מהרש\"ל פג\"ה סי' נ\"ה ע\"ש:"]
**** ENGLISH ****
["דממה נפשך there is חדא דהיתרא. ואמרינן מדחberiah לאו דאיסורא איהו נמי לאו דאיסורא כ\"כ רש\"י בזבחים ומזה it appears דאם were mixed שתים צריך לאכול ארבע ארבע וכן ג' צריך לאכול שש שש דאל\"כ there is not למימר מדחberiah לאו דאיסורא etc. דלמא בחד דהוה המיעוט אמרינן לאו דאיסורא אלא איסורא in the majority that is בשנים איתא investigate וכן proven מתוך דברי מהרש\"ל פג\"ה סי' נ\"ה ע\"ש:"]
**** END BLOCK ****
```

### 39. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `י`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%99`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: י
**** HEBREW ****
["<b>אסור לאדם א'. </b>ואע\"ג דבחתיכה שאינה ראויה להתכבד יש מתירים לאכלה לאדם אחד לעיל ר\"ס ק\"ט שאני התם כיון דנתבטל מן התורה וגם מדרבנן ברוב בלא ס\"ס משא\"כ הכא דלא שרי אלא מטעם ס\"ס דאמרינן דלמא דאיסורא נפל ואת\"ל דלא נפל דאיסורא דלמא לא אכיל השתא האיסור כ\"כ הרא\"ש פג\"ה ומביאו ב\"י סי' ק\"ט:"]
**** ENGLISH ****
["forbidden לאblood א'. ואע\"ג דבחתיכה שאינה worthy of honor יש מתירים to eat it לאblood אחד above ר\"ס ק\"ט this case is different התם כיון דנתבטל מן התורה וגם d'rabbanan in the majority without ס\"ס משא\"כ הכא דלא שרי אלא for the reason ס\"ס דאמרינן דלמא דאיסורא fell ואת\"ל דלא fell דאיסורא דלמא לא אכיל now האיסור כ\"כ הרא\"ש פג\"ה ומביאו ב\"י סי' ק\"ט:"]
**** END BLOCK ****
```

### 40. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `כ`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%9B`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: כ
**** HEBREW ****
["<b>לאדם א' כו' ואפילו שני בני אדם כו'. </b>נמשך למ\"ש ב\"י לדעת הטור אבל אינו מוכרח כמ\"ש בפרישה סעיף כ\"ה וע\"ש וגם פשטא דמילתא דהתו' והרא\"ש משמע דבשנים שנים מותר לאכלן לאדם אחד רק שלא יאכל כולן כאחד ומשני בני אדם לא הזכירו דבר אכן לקמן סימן ק\"מ כתב הט\"ו דאסור לאדם אחד ליהנות מכולן וכתב הפרישה דאפשר שאני עבודת כוכבי' דחמירא ויותר נראה דהתם מיירי שלא יהנה מהן מכולן כאחד:"]
**** ENGLISH ****
["לאblood א' etc. ואפילו שני בני אblood etc.. נמשך למ\"ש ב\"י לדעת Tur אבל אינו מוכרח כמ\"ש בfruitשה seif כ\"ה וע\"ש וגם פשטא דמילתא דהתו' והרא\"ש it appears honeyנים שנים permitted to eat them לאblood אחד רק שלא יאכל כולן כאחד ומשני בני אblood לא הזכירו דבר however below siman ק\"מ wrote הט\"ו דforbidden לאblood אחד ליהנות מכולן וwrote הfruitשה דאפשר this case is different עבודת כוכבי' דחמירא ויותר it appears דהתם deals with שלא יהנה מהן מכולן כאחד:"]
**** END BLOCK ****
```

### 41. `siman_110/siftei-kohen/part-001.txt` — siftei-kohen — seif 8 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=8#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 8
marker: א
**** HEBREW ****
["<b>ונפל אחד כולן אסורים כו'. </b>לטעמיה אזיל שכתב בספרו ב\"י שכן הוא גירסת רש\"י ותוס' והרמב\"ם אבל לא שת לבו לעיין היטב בתוס' ופוסקים שאף ע\"פ שהם גורסים כגי' הרמב\"ם מרבוא ומשלש למקום אחר מותרים הא כתבו התוספות שם (בזבחים דף ע\"ד ע\"א) אמאי דאמרינן בש\"ס כוס של עובד כוכבים שנפל לאוצר מלא כוסות ופירש אחד מהן לרבוא ומרבוא לרבוא מותרין וז\"ל לא אצטריך מרבוא לרבוא אלא למימר דמאן דאסר אסר בכולהו וכדפי' לעיל א\"נ משום דיש חילוק בין רבוא ראשון לרבוא שני דרבוא ראשון אי מתהני מכולן בבת א' אסור דקמתהני בחד ספיקא כיון דבבת אחת מתהני אבל רבוא שני אפילו נהנה מכולן בבת אחת ספק ספיקא הוא ושרי וכן מרבוא לג' ומג' למקום אחר אסור ליהנות מג' הראשון בבת אחת ומן השנים שרו מה\"ט דפריש עכ\"ל וכ\"כ הרא\"ש פרק ג\"ה (סי' ל\"ז) ומביאו ב\"י בסי' קצ\"ט בשם ר\"י וכן הוא בתשובת הרשב\"א בסי' תש\"ל בשם מהר\"ם מרוטנבורק ממש כדברי התוספות הנ\"ל וכן פסקו כל הפוסקים דתערובות השני מותר הלא המה התוס' בדוכתי טובי והרא\"ש ומהר\"מ הנ\"ל והרשב\"א והטור והר\"ן בפרק כל הצלמים במתני' דנטל הימנה עצים והנ\"י פרק הערל וכ\"כ הסה\"ת וסמ\"ג לאוין קמ\"א דף כ\"ב ע\"ד והאגודה רפ\"ק דביצה סי' ו' והמרדכי ס\"פ כל הצלמים והגהת ש\"ד סי' מ\"ה וכ\"פ האו\"ה כלל כ\"ז דין י\"א (דלא כהרב בד\"מ ובת\"ח עיין מ\"ש בזה בשם או\"ה) וכ\"פ מהרש\"ל פג\"ה סימן נ\"ה וכ\"פ העט\"ז וכתבו האו\"ה ומהרש\"ל והעט\"ז דאסור לאכלן כולן בבת אחת ופשוט הוא דאם אוכל כולן כאחד ליכא ס\"ס וכן נתבאר בדברי התוס' ומהר\"מ והרא\"ש דלעיל) ונראה דגם רש\"י מודה דהתערובות הב' מותר כשאינו אוכלו כולו כאחד ועיין לקמן ס\"ק נ\"ב הלכך נראה דבהפסד מרובה וכהאי גוונא ודאי שרי התערובות הב' כשאינו אוכלו כולו כאחד:"]
**** ENGLISH ****
["וfell אחד כולן forbiddenים etc.. לטעמיה אזיל שwrote בספרו ב\"י שכן הוא גירסת רש\"י וTosafot והרמב\"ם אבל לא שת לבו לעיין היטב בTosafot וposkim שeven ע\"פ שהם גורסים כגי' הרמב\"ם מרבוא ומשלש למקום אחר permittedים הא כתבו התוספות שם (בזבחים daf ע\"ד ע\"א) אמאי דאמרינן בש\"ס כוס של non-Jew שfell לאוצר מלא כוסות וseparated אחד מהן according to Ravוא ומרבוא according to Ravוא permittedין וז\"ל לא אצטריך מרבוא according to Ravוא אלא למימר דמאן דאסר אסר בכולהו וכדפי' above א\"נ becauseיש חילוק בין רבוא ראשון according to Ravוא שני דרבוא ראשון אי מתהני מכולן בבת א' forbidden דקמתהני בחד ספיקא כיון דבבת אחת מתהני אבל רבוא שני אפילו נהנה מכולן בבת אחת double doubt הוא ושרי וכן מרבוא לג' ומג' למקום אחר forbidden ליהנות מג' הראשון בבת אחת ומן the secondם שרו מה\"ט דfruitש עכ\"ל וכ\"כ הרא\"ש פרק ג\"ה (סי' ל\"ז) ומביאו ב\"י בסי' קצ\"ט in name of ר\"י וכן הוא בתשובת הרשב\"א בסי' תש\"ל in name of מהר\"ם מרוטנבורק ממש כדברי התוספות הנ\"ל וכן ruledו כל הposkim דתערובות the second permitted הלא המה הTosafot בדוכתי טובי והרא\"ש ומהר\"מ הנ\"ל והרשב\"א וTur והר\"ן בפרק כל הצלמים במתני' דנטל הימנה עצים והנ\"י פרק הערל וכ\"כ הסה\"ת וסמ\"ג לאוין קמ\"א daf כ\"ב ע\"ד והאגודה רפ\"ק דegg סי' ו' והמרדכי ס\"פ כל הצלמים והגהת ש\"ד סי' מ\"ה וכ\"פ האו\"ה כלל כ\"ז דין י\"א (דלא כהרב בד\"מ ובת\"ח עיין מ\"ש בזה in name of או\"ה) וכ\"פ מהרש\"ל פג\"ה siman נ\"ה וכ\"פ העט\"ז וכתבו האו\"ה ומהרש\"ל והעט\"ז דforbidden to eat them כולן בבת אחת וplain הוא דאם אוכל כולן כאחד there is not ס\"ס וכן נתבאר בדברי הTosafot ומהר\"מ והרא\"ש דabove) וit appears דגם רש\"י מודה דהתערובות הב' permitted כשאינו אוכלו כולו כאחד ועיין below ס\"ק נ\"ב הלכך it appears דבgreat loss וכהאי גוונא certainly שרי התערובות הב' כשאינו אוכלו כולו כאחד:"]
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

siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=1#marker=%D7%99
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=2#marker=%D7%90
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=2#marker=%D7%91
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=2#marker=%D7%92
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%90
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%91
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%92
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%93
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%94
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%95
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%96
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%97
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%90
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%91
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%92
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%93
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%94
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%95
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%90
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%91
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%92
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%93
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%90
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%91
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%92
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%93
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%94
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%95
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=%D7%96
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%90
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%91
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%92
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%93
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%94
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%95
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%96
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%97
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%98
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%99
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%9B
siman_110/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=8#marker=%D7%90