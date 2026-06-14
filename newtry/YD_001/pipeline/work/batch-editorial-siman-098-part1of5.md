# Editorial retranslation — Siman 98 (part 1/5)

Generated: 2026-06-12T13:35:54.086Z

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

## Blocks in this batch (44 of 218 remaining in scope)

### 1. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: א
**** HEBREW ****
<b>חלב. </b> כ' הש"ך דמדברי הטור משמע דהיינו חלב בציר"י דהוא תרבא אבל הראב"ן כ' בתשובה דחלב ובשר טעמן שוה וצ"ל דמיירי בבשר שמן עכ"ל:
**** ENGLISH ****
חלב.  wrote Shach דמדברי Tur it appears that is חלב בbroth"י דהוא תרבא אבל הראב"ן wrote בתשובה דחלב וmeat טעמן שוה וone must say דdeals with בmeat שמן end of his words:
**** END BLOCK ****
```

### 2. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ב
**** HEBREW ****
<b>עובד כוכבים. </b> כתב בדרישה מדאסר בישראל למטעם בו יש ללמוד שפעמים שקונין בשר ואין ידוע אם מלוח הוא אם לא אסור לטעום בלשונו עכ"ל וכתב הט"ז ע"ז שהוא תמוה מאד דהא בסימן מ"ב גבי מרה כתב בהדיא דטועמו בלשונו וע"כ נראה דבטעימה בלשון אין בו חשש איסור במקום ספק ושאני הכא דהיה צריך לטעום ע"י אכילה ממש כדי להרגיש אם יש שם טעם וע"כ צריך שיטעמנו עובד כוכבים ועיין בא"ח סי' תקס"ז לענין תענית מבואר פשוט דאין איסור בטעימה בלשון לחוד:
**** ENGLISH ****
non-Jew.  wrote בדרישה מדאסר בישראל לfor the reason בו יש ללמוד שפעמים שקונין meat ואין ידוע אם מלוח הוא אם לא forbidden לטעום בלשונו end of his words וwrote Taz ע"ז שהוא תמוה מאד דהא בsiman מ"ב גבי מרה wrote בהדיא דטועמו בלשונו וuntil here it appears דבטעימה בlanguage of אין בו חשש איסור במקום doubt וthis case is different הכא דהיה צריך לטעום ע"י אכילה ממש the measure of להרגיש אם יש שם טעם וuntil here צריך שיטעמנו non-Jew ועיין Orach Chaim סי' תקs.k. 7 regarding תענית explained plain דאין איסור בטעימה בlanguage of לחוד:
**** END BLOCK ****
```

### 3. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ג
**** HEBREW ****
<b>שסומכין. </b> כתב הש"ך דבב"י פסק בכותי דלאו קפילא פירוש נחתום אומן סמכינן עליה במסל"ת דוקא ואקפילא סמכינן אפילו אינו מסל"ת דלא משקר שלא יפסיד אומנתו ונתבאר לך דכאן מיירי בעובד כוכבים שאינו קפילא ולכך צריך שלא ידע שסומכין עליו אלא שהקשו בט"ז ובש"ך כמה קושיות על המחבר דהא קיי"ל דאין עובד כוכבים נאמן במסל"ת רק בעדות אשה לבד ומכ"ש שהמחבר עצמו כ' בס"ב דמין בשאינו מינו אסור מדאורייתא א"כ היאך עובד כוכבים נאמן ותירץ הש"ך דיש לחלק דדוקא היכא דליכא למיקם עלה דמילתא הוא דאין עובד כוכבים מסל"ת נאמן באיסור תורה אבל במין בשא"מ כיון דאיכא למיקם עלה דמילתא להטעימו לקפילא סמכינן עליה והט"ז תירץ דס"ל להני פוסקים דהא דאין עובד כוכבים מסל"ת נאמן במידי דאורייתא היינו במאי דבעי עדות דוקא משא"כ באיסור והיתר דא"צ עדות גמורה אלא בהוכחה סגי מהני שפיר מסל"ת והא ראיה שקפילא מהני אפילו אינו מסל"ת מטעם דלא מרע חזקתיה ובמידי דבעי עדות ודאי לא מהני דבר כזה כנ"ל ליישב דעת הפוסקים אבל לענין הלכה קיי"ל בסימן שי"ו ולענין בכור דלא מהני מסל"ת וא"כ גם בשאר דוכתי לא מהני באיסור דאורייתא עכ"ל ועי' בסימן ט"ז סי"א ובסי' ס"ט ס"י ובסי' קכ"ב סי"א ובס"ס קל"ז:
**** ENGLISH ****
שסומכין.  wrote Shach דבben yomo ruled בכותי דלאו קפילא Explanation: נחתום אומן סמכינן עליה במסל"ת specifically ואקפילא סמכינן אפילו אינו מסל"ת דלא משקר שלא יפlime אומנתו ונתבאר לך דכאן deals with בnon-Jew שאינו קפילא ולכך צריך שלא ידע שסומכין עליו אלא שהקשו בט"ז ובש"ך כמה קושיות על Mechaber דהא קיי"ל דאין non-Jew נאמן במסל"ת רק בעדות אשה לבד ומkli sheni שMechaber עצמו wrote בס"ב דמין בשאינו מינו forbidden מd'oraisa if so היאך non-Jew נאמן וresolved Shach דיש לdisagreed דspecifically היכא דthere is not למיקם came up דמילתא הוא דאין non-Jew מסל"ת נאמן באיסור תורה אבל במין בשא"מ כיון דthere is למיקם came up דמילתא להטעימו לקפילא סמכינן עליה וTaz resolved דס"ל להני poskim דהא דאין non-Jew מסל"ת נאמן במידי d'oraisa that is במאי דבעי עדות specifically משif so באיסור והיתר דא"צ עדות גteacher אלא בהוכחה סגי מהני well מסל"ת והא proof שקפילא מהני אפילו אינו מסל"ת for the reason דלא מרע presumption ofיה ובמידי דבעי עדות certainly לא מהני דבר כזה כit appears to me לresolved דעת הposkim אבל regarding the halachah קיי"ל בsiman שי"ו וregarding בכור דלא מהני מסל"ת וif so גם in other דוכתי לא מהני באיסור d'oraisa end of his words ועי' בsiman ט"ז סי"א ובסי' seif 9 ס"י ובסי' קכ"ב סי"א ובend of seif קל"ז:
**** END BLOCK ****
```

### 4. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ד
**** HEBREW ****
<b>משערינן. </b> כתב הש"ך משמע דעת המחבר דכשיש שם עובד כוכבים לא שרינן אלא ע"י עובד כוכבים ואם אמר דאית ביה טעם איסור אסור אפי' טפי מס' ואי אמר דלית ביה טעם מותר אפילו בפחות מס' ולא אמרינן לשער בס' אלא כשאין שם עובד כוכבים או במין במינו:
**** ENGLISH ****
משערינן.  wrote Shach it appears דעת Mechaber דכשיש שם non-Jew לא שרינן אלא ע"י non-Jew ואם אמר דאית ביה טעם איסור forbidden even טפי מsixty ואי אמר דלית ביה טעם permitted אפילו בפחות מsixty ולא אמרינן לשער בsixty אלא כשאין שם non-Jew או בspecies in its species:
**** END BLOCK ****
```

### 5. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ה
**** HEBREW ****
<b>לסמוך. </b> כ' הש"ך משמע דוקא אעובד כוכבים לא סמכינן אבל אטעימת ישראל סמכינן כגון גבי צנון שחתכו בסכין של בשר כמ"ש בסימן צ"ו <small>(וכגון תרומה שנפל לחולין דטעים ליה כהן)</small> וכן האומר קונם בשר ויין שאני טועם ונפל לתבשיל שאסור לו בנ"ט סמכינן אטעימת ישראל אפי' אינו אומן ואפי' נתערב גוף הדבר דודאי ישראל לא משקר דלא כעט"ז שמחמיר בזה עכ"ל:
**** ENGLISH ****
לסמוך.  wrote Shach it appears specifically אnon-Jew לא סמכינן אבל אטעימת ישראל סמכינן כגון גבי radish שחתכו בסכין של meat כwhat he wrote בsiman צ"ו (וכגון תרומה שfell לחולין דטעים ליה כהן)} וכן האומר קונם meat ויין this case is different טועם וfell לdish שforbidden לו בנ"ט סמכינן אטעימת ישראל even אינו אומן וeven נתערב גוף הדבר דcertainly ישראל לא משקר דלא כעט"ז שis stringent בזה end of his words:
**** END BLOCK ****
```

### 6. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 2 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 2
marker: א
**** HEBREW ****
<b>נודע. </b> הטעם כ' ר"ת וכל הפוסקים דמין במינו מדאורייתא בטל ברוב כיון שאינו נ"ט אלא דחכמים הצריכו ס' הלכך כיון שנודע שהיה רובו היתר רק הספק אם היה ס' ה"ל ספיקא דרבנן ולקולא משא"כ כשלא נודע דהיה רובו היתר ה"ל ספיקא דאורייתא ולחומרא <small>(אבל מין בשא"מ צריך מדאורייתא ס' והטעם משום דאיסור נותן טעם בהיתר נהפך ההיתר להיות כולו איסור ע"כ בספק החמירו)</small>:
**** ENGLISH ****
נודע.  the taste wrote ר"ת וכל הposkim דspecies in its species מd'oraisa בטל in the majority כיון שאינו נ"ט אלא דחכמים הצריכו sixty הלכך כיון שנודע שהיה רובו היתר רק הdoubt אם היה sixty ה"ל ספיקא d'rabbanan ולקולא משif so כשלא נודע דהיה רובו היתר ה"ל ספיקא d'oraisa ולstringency (אבל מין בשא"מ צריך מd'oraisa sixty וthe taste becauseאיסור noten taam in heter נהפך ההיתר להיות כולו איסור until here בdoubt החמירו)}:
**** END BLOCK ****
```

### 7. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 2 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 2
marker: ב
**** HEBREW ****
<b>שמא. </b> והש"ך חולק על רמ"א והביא כמה ראיות שנהפוך הוא דהכל הולך בתר טעמא ולא בתר שמא רק ביין נסך או תקרובת עבודת כוכבים דאסור במשהו במינן וכן בדבר שיש לו מתירין דלא בטל כלל במינן בזה אזלינן בתר שמא ולא בתר טעמא אבל בדבר שמתבטל בס' אזלינן בתר טעמא ואפילו יבש ביבש ג"כ אזלינן בתר טעמא וכתב שהגיעו דבריו אלה לפני כמה גדולי הדור והסכימו עמו גם הגאון מהר"ר יושיע אמר שדבריו ברורים הם:
**** ENGLISH ****
lest.  וShach disagrees על רמ"א והביא כמה ראיות שנהפוך הוא דהכל הולך בתר טעמא ולא בתר lest רק ביין נסך או תקרובת עבודת כוכבים דforbidden במשהו במינן וכן בדבר שיש לו מתירין דלא בטל כלל במינן בזה אזלינן בתר lest ולא בתר טעמא אבל בדבר שמתבטל בsixty אזלינן בתר טעמא ואפילו יבש ביבש ג"כ אזלינן בתר טעמא וwrote שהגיעו דבריו אלה לפני כמה גדולי הדור והסכימו עמו גם הגאון מהר"ר יושיע אמר שדבריו ברורים הם:
**** END BLOCK ****
```

### 8. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 2 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 2
marker: ג
**** HEBREW ****
<b>רובו. </b> הטעם דס"ל מין בשאינו מינו מה"ת בנ"ט א"כ ה"ל ספיקא דאורייתא לחומרא וכ' הת"ח בשם או"ה דאפי' אם נפל חלב לבשר עוף שהוא דרבנן אפ"ה אם נשפך אסור הואיל וטעם כעיקר דאורייתא וכתבו הט"ז וש"ך דתמוהין מאד דבריו דמה בכך דטעם כעיקר הלא העיקר גופא אינו אלא מדרבנן וזה שכ' האו"ה אינו אלא למ"ד דבשר עוף בחלב דאורייתא אבל לדידן דקי"ל שהוא רק מדרבנן פשיטא אם נשפך דמותר <small>(וט"ז כ' וראוי להחמיר בעוף גזירה אטו נשפך בבשר בהמה משא"כ מין במינו ונשפך דאין שם גזירה אטו איסור דאורייתא)</small>:
**** ENGLISH ****
רובו.  the taste דס"ל מין בשאינו מינו מה"ת בנ"ט if so ה"ל ספיקא d'oraisa לstringency וwrote הת"ח in name of Issur VeHeter דeven אם fell חלב לmeat fowl שהוא d'rabbanan even so אם נשפך forbidden הואיל וטעם כעיקר d'oraisa וכתבו Taz וש"ך דתמוהין מאד דבריו דמה בכך דטעם כעיקר הלא העיקר גופא אינו אלא d'rabbanan וזה שwrote הIssur VeHeter אינו אלא למ"ד דmeat fowl בחלב d'oraisa אבל for us דwe establish שהוא רק d'rabbanan פשיטא אם נשפך דpermitted (וט"ז wrote וראוי להחמיר בfowl גזירה אטו נשפך בmeat animal משif so species in its species ונשפך דאין שם גזירה אטו איסור d'oraisa)}:
**** END BLOCK ****
```

### 9. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 2 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 2
marker: ד
**** HEBREW ****
<b>ומבטלו. </b> והש"ך אוסר עכ"פ את שאינו מינו <small>(וכן דעת הפר"ח)</small> והט"ז מתיר אפילו שאינו מינו ג"כ וכתב דכל זה לא מיירי אלא כשנתערב בפעם א' במינו ושאינו מינו אבל אם נתערב תחלה עם אינו מינו ואח"כ נתוסף שם מינו ודאי כבר נ"נ קודם שבא לשם מינו והוא פשוט עכ"ל:
**** ENGLISH ****
ומבטלו.  וShach אוסר עכ"פ את שאינו מינו (וכן דעת הPeri Chadash)} וTaz מתיר אפילו שאינו מינו ג"כ וwrote דכל זה לא deals with אלא כשנתערב בפעם א' במינו ושאינו מינו אבל אם נתערב תחלה עם אינו מינו וafterward נתוסף שם מינו certainly כבר נ"נ קוblood שבא לשם מינו והוא plain end of his words:
**** END BLOCK ****
```

### 10. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 3 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 3
marker: _
**** HEBREW ****
<b>אסור. </b> כ' הש"ך פי' שעכ"פ בקיאין אנו שיש בו רוב אלא דאין אנו בקיאין אם יש בו ס' או שלא ידעינן כמה נפיק מיניה דאז הוי מאיסורים של דבריהם אפ"ה אין תולין להקל והטעם כתבו הפוסקים דספק התלוי בחסרון ידיעה לא מקרי ספק דדעת שוטים הוא זה משא"כ אם בא הספק מכח שנשפך והר"ן כ' משום דבדבר שא"א לעמוד עליו אי אזלינן לקולא יהיו כל האיסורים בספק וכל א' ישער במה שנראה בעיניו לפיכך באו חכמים להשוות מדותיהן אבל במה שאינו בא אלא באקראי בעלמא כגון שנשפך וכה"ג אזלינן לקולא והט"ז הקשה איך אמרינן כאן דחסרון ידיעה לא הוי ספק ובסי' פ"א מתירין גבינות הטריפות ע"י סירכא וכן בכחל משום שאם היינו בקיאין היה אפשר להתיר ע"י בדיקה וה"ל ס"ס אלמא דחסרון בקיאות הוי ספיקא ותירץ דגבי גבינות איכא ספק לכל העולם ובכחל איכא תקנה אחרת לשער בכולו משא"כ כאן דעכ"פ איכא איסורא בודאי אלא לא ידעינן אם יש שם ס' לכך אסור וע"ש באריכות <small>(ובנה"כ תירץ דהכא הוי שפיר חסרון חכמה כיון דא"א לעמוד על שיעורו אבל התם מדינא אפשר למבדק בפושרין ובנפיחה רק דמחמרינן לומר דאין אנו בקיאין לכן הוי ספק מעליא ע"ש)</small>:
**** ENGLISH ****
forbidden.  wrote Shach פי' שעכ"פ בקיאין אנו שיש בו רוב אלא דאין אנו בקיאין אם יש בו sixty or thatלא ידעינן כמה נפיק מיניה דאז הוי מאיסורים של דבריהם even so אין תולין to be lenient וthe taste כתבו הposkim דdoubt התלוי בחסרון ידיעה לא מקרי doubt דדעת שוטים הוא זה משif so אם בא הdoubt מכח שנשפך וRan wrote becauseבדבר שא"א לעמוד עליו אי אזלינן לקולא יהיו כל האיסורים בdoubt וכל א' ישער במה שit appears בעיניו and therefore באו חכמים להשוות מדותיהן אבל במה שאינו בא אלא באקראי mere כגון שנשפך וsuch a case אזלינן לקולא וTaz challenged איך אמרינן כאן דחסרון ידיעה לא הוי doubt ובסי' one time מתירין גבינות הטריפות ע"י סירכא וכן בudder because שאם that is בקיאין היה אפשר להתיר ע"י בדיקה וה"ל end of seif אלמא דחסרון בקיאות הוי ספיקא וresolved דגבי גבינות there is doubt לכל העולם ובudder there is תקנה אחרת לשער בכולו משif so כאן דעכ"פ there is איסורא certainly אלא לא ידעינן אם יש שם sixty לכך forbidden וsee there באריכות (וNachalat Binyamin resolved דהכא הוי well חסרון חכמה כיון דא"א לעמוד על שיskinו אבל התם מthe halachah אפשר למבדק בפושרין ובנפיחה רק דמחמרינן לומר דאין אנו בקיאין לכן הוי doubt מעליא see there)}:
**** END BLOCK ****
```

### 11. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 4 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 4
marker: א
**** HEBREW ****
<b>בכלי. </b> כ' הש"ך דוקא בכלי אבל בדבר מאכל קי"ל דנאסר כולו ואפילו בכלי דוקא אם נאסר ע"י מליחה או ע"י עירוי אבל אם נאסר ע"י כבישה צריך כולו ג"כ לשער נגד כולו וע"ל סי' צ"א ס"ה:
**** ENGLISH ****
בכלי.  wrote Shach specifically בכלי אבל בדבר מאכל we establish דנאסר כולו ואפילו בכלי specifically אם נאסר ע"י saltedה או ע"י pouring אבל אם נאסר ע"י כבישה צריך כולו ג"כ לשער נגד כולו וע"ל סי' צ"א seif 5:
**** END BLOCK ****
```

### 12. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 4 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 4
marker: ב
**** HEBREW ****
<b>ויסירנו. </b> כתבו הט"ז וש"ך אבל בפחות מס' לא מהני תקנה זו דהא אם תחב כף בשר בקדרה של חלב ואנו רואין הכף כמו שהיה בתחלה אפ"ה אמרינן שהטעם יצא ממנו ה"נ בחלב לתוך היתר אע"פ שאח"כ צף למעלה מ"מ הטעם שלו נפלט ולא אמרינן תקנה זו אלא לחומרא בדאיכא ס' אבל בדליכא ס' ודאי חתיכה עצמה נ"נ ולא מהני אח"כ שיצוף למעלה ודלא כב"ח שמתיר בדיעבד:
**** ENGLISH ****
ויסירנו.  כתבו Taz וש"ך אבל בפחות מsixty לא מהני תקנה זו דהא אם stuck in spoon meat בpot של חלב ואנו רואין הspoon כמו שהיה בתחלה even so אמרינן שthe taste יצא ממנו ה"נ בחלב לתוך היתר אon the surface of שafterward צף למcame up nevertheless the taste שלו fellט ולא אמרינן תקנה זו אלא לstringency בדthere is sixty אבל בדthere is not sixty certainly חתיכה עצמה נ"נ ולא מהני afterward שיצוף למcame up ודלא כב"ח שמתיר b'dieved:
**** END BLOCK ****
```

### 13. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: א
**** HEBREW ****
<b>איסור. </b> כתב הש"ך דמשמע מדברי הרב דס"ל דאף בשאר איסורים חנ"נ בכלי ישן מיהו היינו דוקא במקום שאין הפסד אבל בהפסד שרי בשאר איסורים בכלי ישן וכ"כ בת"ח ואף אם היא כף ישנה רק דידעינן כמה בלע א"צ לשער אלא כנגד הבשר והחלב כגון אם ניער בה כזית של בשר ואח"כ ביומו כזית חלב אין צריך אלא ס' נגד ב' זיתים עכ"ל:
**** ENGLISH ****
איסור.  wrote Shach דit appears מדברי הרב דס"ל דeven in other איסורים chein nafsho בכלי ישן מיהו that is specifically במקום שאין הפסד אבל בהפסד שרי in other איסורים בכלי ישן and so too Turei Chayim וeven אם היא spoon ישנה רק דידעינן כמה absorbed א"צ לשער אלא כנגד הmeat וthe milk כגון אם ניער בה כזית של meat וafterward ביומו כזית חלב אין צריך אלא sixty נגד ב' זיתים end of his words:
**** END BLOCK ****
```

### 14. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: ב
**** HEBREW ****
<b>הכזית. </b> דסבירא ליה דלגבי דבר הבלוע לא אמרי' חנ"נ:
**** ENGLISH ****
הכזית.  דסבירא ליה דלגבי דבר הabsorbed לא אמרי' chein nafsho:
**** END BLOCK ****
```

### 15. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: ג
**** HEBREW ****
<b>חרס. </b> כ' הש"ך דמהרש"ל וב"ח חולקים על הר"ב בזה וכתבו דבכלי חרס ודאי אינו עולה על הדעת שגוף החרס יעשה נבלה וט"ז כתב דיש להחמיר בכ"ח אפילו חדש לשער נגד כולו ול"ד למ"ש רמ"א בסי' צ"ב ס"ה גבי טיפת חלב דלא אמרינן חנ"נ אם הוא כלי חדש דהתם שאני שעדיין כולו היתר לא שייך ביה חנ"נ משא"כ אם הוא בלוע מאיסור מיהו כ' הש"ך דבהפסד מרובה וכה"ג יש להקל כהפוסקים דבשל עץ ומתכת לא אמרינן נ"נ אבל בלא הפסד יש להחמיר בשאר כלים ישנים ב"י לומר דנ"נ אפי' בשל עץ ושל מתכת:
**** ENGLISH ****
חרס.  wrote Shach דMaharshal וב"ח disagreesים על Rama בזה וכתבו דבכלי חרס certainly אינו עולה על הדעת שגוף החרס יעשה נבלה וט"ז wrote דיש להחמיר בכ"ח אפילו חדש לשער נגד כולו וsome say לwhat he wrote רמ"א בסי' one must examine seif 5 גבי טיפת חלב דלא אמרינן chein nafsho אם הוא כלי חדש דהתם this case is different שעדיין כולו היתר לא שייך ביה chein nafsho משif so אם הוא absorbed מאיסור מיהו wrote Shach דבgreat loss וsuch a case יש to be lenient כהposkim honeyל tree ומתכת לא אמרינן נ"נ אבל without הפסד יש להחמיר in other כלים ישנים ben yomo לומר דנ"נ even בשל tree ושל מתכת:
**** END BLOCK ****
```

### 16. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 6 — marker `_`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 6
marker: _
**** HEBREW ****
<b>איסור. </b> פי' הט"ז אפי' איסור דרבנן דרבנן והכי אמרינן בש"ס פ' ג"ה לא תזלזל בשיעורא דרבנן:
**** ENGLISH ****
איסור.  פי' Taz even איסור d'rabbanan d'rabbanan והכי אמרינן בGemara פ' ג"ה לא תזלזל בשיskinא d'rabbanan:
**** END BLOCK ****
```

### 17. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 7 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 7
marker: _
**** HEBREW ****
<b>פליטתה. </b> כ' הש"ך לאפוקי לבטל היא עצמה אם אינו מכירה דאז חשיבה בריה כשיש בה אפרוח כדלקמן ר"ס ק' וע"ל סי' פ"ו מדינים אלו:
**** ENGLISH ****
Her refugee. As Hashem’s word for the undoing is itself if you don’t know what is wrong when there is an embracing as follows R.C. and C.P. and these states:
**** END BLOCK ****
```

### 18. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 8 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 8
marker: א
**** HEBREW ****
<b>הנוהגין. </b> פי' בין של תורה בין של דבריהם:
**** ENGLISH ****
Driving. A. between their words:
**** END BLOCK ****
```

### 19. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 8 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 8
marker: ב
**** HEBREW ****
<b>עצמן. </b> כגון תבלין של עבודת כוכבים ושל ערלה וכיוצא בו ואפילו אין אסורים אלא מדרבנן לאפוקי אם הם רק בלועים מאיסור והטעם שהחמירו בתבלין לפי שמן הסתם נ"ט באלף ולפ"ז היכא דידוע בבירור שאינו נ"ט כגון שנפל קורט א' של מלח או תבלין ליורה גדולה מותר ופסק בת"ח דאפילו נפל מלח ותבלין לדבר ששוה בשמו אפ"ה כיון דחלוק בטעמא לא בטיל אבל אם נפל לדבר ששוה בטעמו בטל בס' וכ' באו"ה דהא דאינו בטל אפי' באלף היינו מדרבנן ואם אינו ידוע אם מרגישין טעמו או לא מתיר בכה"ג בא"ז גם עתה להאכילו לעובד כוכבים מסל"ת וכתב הט"ז וצ"ע לענין שומן של איסור שנפל למאכל אמאי יהיה בטל בס' הא לטעמא עביד ותירץ בשם או"ה דלא מקרי טעם בזה אלא דבר חריף ולא שומן דאף שגם הוא מטעים המאכל וממתיקו מ"מ אין נרגש כ"כ כמו דבר חריף משום הכי כתב כאן רמ"א כגון מלח ותבלין ועיין בא"ח סי' תקי"ג דשם לא מהני ס' אע"ג דאינו דבר חריף צ"ל דשאני התם שיש שם טעמא וחזותא גבי ביצה שלבנו בו מאכל משא"כ כאן וכתב עוד דשומן בשר שנפל לתוך מאכל חלב בטל בס' כיון שאין האיסור מצד עצמו רק מצד התערובות:
**** ENGLISH ****
עצמן.  כגון spice של עבודת כוכבים ושל ערלה וכיוצא בו ואפילו אין forbiddenים אלא d'rabbanan to exclude אם הם רק absorbedים מאיסור וthe taste שהחמירו בspice לפי שמן הstam נ"ט באלף וaccordingly היכא דידוע clearly שאינו נ"ט כגון שfell קורט א' של salt או spice לcauldron גדולה permitted וruled Turei Chayim דאפילו fell salt וspice לדבר ששוה בשמו even so כיון דחלוק בטעמא לא nullified אבל אם fell לדבר ששוה בטעמו בטל בsixty וwrote בIssur VeHeter דהא דאינו בטל even באלף that is d'rabbanan ואם אינו ידוע אם מרגישין טעמו או לא מתיר בsuch a case בOr Zarua גם עתה להאכילו לnon-Jew מסל"ת וwrote Taz וrequires study regarding שומן של איסור שfell למאכל אמאי יהיה בטל בsixty הא for taste עביד וresolved in name of Issur VeHeter דלא מקרי טעם בזה אלא דבר sharp ולא שומן דeven שגם הוא מטעים the food וממתיקו nevertheless אין נרגש כ"כ כמו דבר sharp because הכי wrote כאן רמ"א כגון salt וspice ועיין Orach Chaim סי' תקי"ג דשם לא מהני sixty even though דאינו דבר sharp one must say דthis case is different התם שיש שם טעמא וחזותא גבי egg שלבנו בו מאכל משif so כאן וwrote עוד דשומן meat שfell לתוך מאכל חלב בטל בsixty כיון שאין האיסור מצד עצמו רק מצד התערובות:
**** END BLOCK ****
```

### 20. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 9 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 9
marker: א
**** HEBREW ****
<b>מצטרף. </b> שטעם דם וחלב אינו שוה הרי נתבטל טעם החלב בס' וטעם הדם בס' דמה לי איסור המבטל איסור ומה לי היתר המבטל איסור רק שיתבטל טעם האיסור ולא יהא לו עוד כח ליתן טעם בהיתר:
**** ENGLISH ****
Joined. The taste of blood and milk is not extinguished, we will eliminate the taste of milk in the S. and the blood taste in the B.D. has given me the prohibition prohibition prohibition and what permits me to avoid the taste of the prohibition, and it will no longer have the power to give flavor in the permit:
**** END BLOCK ****
```

### 21. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 9 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 9
marker: ב
**** HEBREW ****
<b>בשוגג. </b> אבל במזיד יתבאר דינו בסי' צ"ט ס"ה וכ' בט"ז זה למאן דלית ליה חנ"נ בשאר איסורים אבל לפי מה דקי"ל דאמרינן חנ"נ בכל האיסורים גם זה התערובת אסור דכבר נעשה נבלה קודם התערובת והש"ך כתב דגם לדעת רמ"א מצינו דין זה לענין לח בלח דלא אמרינן חנ"נ בהפסד מרובה כדלעיל סי' צ"ב ס"ד א"נ דרמ"א אזיל לטעמיה דס"ל דאם נתוסף על האיסור בשוגג קודם שנודע התערובות לא אמרינן חנ"נ א"נ הכא מיירי שנתערבו שתי הקדרות יחד קודם שנודע התערובות אלא לפי מה שהוכחתי שם דאפילו לא נודע התערובות אמרי' חנ"נ א"כ לא שייך האי דינא רק בלח בלח בהפסד מרובה א"נ אם נפל כזית גבינה לכ"ט זיתים היתר ובקדירה אחרת נפל כזית בשר לשלשים זיתים של היתר ונתערבו ב' התערובות הללו בשוגג דמותר דלא שייך לומר חנ"נ כיון דעדיין כולו היתר א"נ נ"מ אם נפל כזית דם לתוך ס' זיתים של היתר ואח"כ נפל כזית ועוד של חלב לאותן ס"א זיתים דא"צ ס' נגד ב' זיתים אלו של איסור אלא גם הכזית דם שנפל בראשונה מצטרף לבטל החלב מיהו כ"ז דוקא בשני מיני אסורים שאין טעמן שוה אבל במין א' לעולם חוזר וניער כדלקמן סי' צ"ט ס"ו:
**** ENGLISH ****
בשוגג.  אבל במזיד יתבאר דינו בסי' צ"ט seif 5 וwrote בט"ז זה למאן דלית ליה chein nafsho in other איסורים אבל לפי מה דwe establish דאמרינן chein nafsho בכל האיסורים גם זה התערובת forbidden דכבר נעשה נבלה קוblood התערובת וShach wrote דגם לדעת רמ"א מצינו דין זה regarding לח בלח דלא אמרינן chein nafsho בgreat loss כדabove סי' one must examine ס"ד א"נ דרמ"א אזיל לטעמיה דס"ל דאם נתוסף על האיסור בשוגג קוblood שנודע התערובות לא אמרינן chein nafsho א"נ הכא deals with שנתערבו שתי pots יחד קוblood שנודע התערובות אלא לפי מה שהוכחתי שם דאפילו לא נודע התערובות אמרי' chein nafsho if so לא שייך האי the halachah רק בלח בלח בgreat loss א"נ אם fell כזית cheese לכ"ט זיתים היתר ובקדירה אחרת fell כזית meat לשלשים זיתים של היתר ונתערבו ב' התערובות הללו בשוגג דpermitted דלא שייך לומר chein nafsho כיון דעדיין כולו היתר א"נ נ"מ אם fell כזית blood לתוך sixty זיתים של היתר וafterward fell כזית ועוד של חלב לאותן ס"א זיתים דא"צ sixty נגד ב' זיתים אלו של איסור אלא גם הכזית blood שfell בראשונה מצטרף לבטל the milk מיהו כ"ז specifically בשני מיני forbiddenים שאין טעמן שוה אבל במין א' לעולם חוזר וניער כדbelow סי' צ"ט ס"ו:
**** END BLOCK ****
```

### 22. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 9 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 9
marker: ג
**** HEBREW ****
<b>מבטל. </b> פי' שנפלו לירקות בקדרה דמהני כל אחד לשיעור ששים:
**** ENGLISH ****
מבטל.  פי' שfell לvegetables בpot דמהני כל אחד לשיskin sixty:
**** END BLOCK ****
```

### 23. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 1 — marker `א`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 1
marker: א
**** HEBREW ****
מימר' דרבא חולין דף צ"ו:
**** ENGLISH ****
מימר' דרבא חולין daf צ"ו:
**** END BLOCK ****
```

### 24. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 1 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 1
marker: ב
**** HEBREW ****
רמב"ם בפרק ט"ו מהמ"א ואפילו אינו אומן בכך וכמ"ש הטור בשם הרשב"א:
**** ENGLISH ****
רמב"ם בפרק ט"ו מהמ"א ואפילו אינו אומן בכך וכמ"ש הTur in the name of הרשב"א:
**** END BLOCK ****
```

### 25. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 1 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 1
marker: ג
**** HEBREW ****
מבואר בסימן ק"ג:
**** ENGLISH ****
explained בsiman ק"ג:
**** END BLOCK ****
```

### 26. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 1 — marker `ד`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 1
marker: ד
**** HEBREW ****
טור בשם הרשב"א:
**** ENGLISH ****
Tur in the name of הרשב"א:
**** END BLOCK ****
```

### 27. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 2 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 2
marker: א
**** HEBREW ****
טור בשם ר"ת וכרבא דאמר מין במינו מדאורייתא ברובו בטל זבחים דף ע"ט:
**** ENGLISH ****
Tur in the name of ר"ת וכרבא דאמר מין במינו מדאורייתא ברובו בטל זבחים daf ע"ט:
**** END BLOCK ****
```

### 28. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 2 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 2
marker: ב
**** HEBREW ****
כדעת ר"ת דכיון שנתן האיסור טעם בהיתר נהפך כולו להיות איסור:
**** ENGLISH ****
כדעת ר"ת דכיון שנתן האיסור טעם in heter נהפך כולו להיות איסור:
**** END BLOCK ****
```

### 29. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 2 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 2
marker: ג
**** HEBREW ****
שם בשם הרשב"א:
**** ENGLISH ****
שם in name of Rashba:
**** END BLOCK ****
```

### 30. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 2 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 2
marker: ד
**** HEBREW ****
ב"י בשם הרשב"א:
**** ENGLISH ****
ben yomo in name of Rashba:
**** END BLOCK ****
```

### 31. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 3 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 3
marker: _
**** HEBREW ****
טור בשם הרשב"א ופירש הר"ן הטעם דבנשפך שאינו בא אלא באקראי בעלמא אזלינן לקולא ולא בספק ידיעה:
**** ENGLISH ****
Tur in the name of הרשב"א ופירש הר"ן הטעם דבנשפך שאינו בא אלא באקראי בעלמא אזלינן לקולא ולא בספק ידיעה:
**** END BLOCK ****
```

### 32. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 4 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 4
marker: א
**** HEBREW ****
טור וכ"כ הרשב"א מהא דאמרינן גבי כחל מי ידעינן כמה נפק מיניה חולין דף צ"ז:
**** ENGLISH ****
Tur; and likewise in Semag in the name of Rabbeinu Yaakov, and Semak, and Hagahot Maimoniyot chapter 9 of Forbidden Foods.
**** END BLOCK ****
```

### 33. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 4 — marker `ב`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 4
marker: ב
**** HEBREW ****
שם בשם ר' פרץ:
**** ENGLISH ****
שם in name of ר' פרץ:
**** END BLOCK ****
```

### 34. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 5 — marker `א`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 5
marker: א
**** HEBREW ****
שם וכ"כ הרשב"א בת"ה:
**** ENGLISH ****
שם and so too Rashba בת"ה:
**** END BLOCK ****
```

### 35. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 5 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 5
marker: ב
**** HEBREW ****
שם ושם ופי' ישנה שניער בה באותו יום בהיתר קודם שניער בה החלב:
**** ENGLISH ****
שם ושם ופי' ישנה שניער בה באותו יום in heter קוblood שניער בה the milk:
**** END BLOCK ****
```

### 36. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 5 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 5
marker: ג
**** HEBREW ****
הרשב"א שם בשם הרמב"ן דס"ל דלא אמרינן בבלוע חתיכה נעשית נבילה:
**** ENGLISH ****
Rashba שם in name of הרמב"ן דס"ל דלא אמרינן בabsorbed חתיכה נעשית nevelah:
**** END BLOCK ****
```

### 37. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 6 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 6
marker: _
**** HEBREW ****
מעובדא דמר בר רב אשי וכו' וכרבי יוחנן דחצי שיעור אסור מן התורה חולין דף ק"ח:
**** ENGLISH ****
מעובדא דמר בר רב אשי etc. וכרבי יוחנן דחצי שיskin forbidden מן התורה חולין daf ק"ח:
**** END BLOCK ****
```

### 38. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 7 — marker `_`

- Quality: **warn** — hebrew_in_english
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 7
marker: _
**** HEBREW ****
ציינתיו לעיל סי' פ"ו:
**** ENGLISH ****
ציינתיו above סי' chapter 6:
**** END BLOCK ****
```

### 39. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 8 — marker `_`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=8#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 8
marker: _
**** HEBREW ****
ציינתיו לעיל בסי' צ' בהל' כחל:
**** ENGLISH ****
ציינתיו above בסי' צ' בהל' udder:
**** END BLOCK ****
```

### 40. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 9 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=9#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 9
marker: א
**** HEBREW ****
טור ממשנה ב' פ"ב דערלה ומימר' דר' יוחנן הפיגול והנותר וכו' זבחים דף ע"ה:
**** ENGLISH ****
טור ממשנה ב' chapter 2 דערלה ומימר' דר' יוחנן הפיגול והleftover etc. זבחים daf ע"ה:
**** END BLOCK ****
```

### 41. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 9 — marker `ב`

- Quality: **warn** — hebrew_in_english
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=9#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 9
marker: ב
**** HEBREW ****
הרא"ש בתשובה מהא דלעיל:
**** ENGLISH ****
Rosh בתשובה מהא דabove:
**** END BLOCK ****
```

### 42. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: א
**** HEBREW ****
<b>כגון חלב כו'. </b>אבל הר"ן כתב שהוא מין במינו ממ"ש ק"ג א' אכל חלב מן החי כו' דחייב משום בשר מן החי אלמא מין בשר הוא <small>(עפר"ח ס"ק ז' מש"ש ומיהו כ"ז אליבא דר"י כו' פשיטא דחלב כו'. וע"ל ס"ק ט') </small>וז"ש <small>(צ"ח א') </small>ההוא כזיתא תרבא כו' ואי בטעמא מה שייך במה דבלע כו' וכן מש"ש ההוא פלגא דזיתא כו' ואי בטעמא לא שייך לפלוגי בדרבנן כיון שניכר טעמו וכ"כ ראב"ן ע"ש וע"ל סי' צ"ט ס"ד מ"ש שם: <br><b>(ליקוט) כגון חלב כו'. </b>ליתא שכבר כ' בת"ה שגירסת הגאונים והרי"ף בפג"ה <small>(צ"ז ב') </small>מין במינו כגון שומנא דגיד כו' ע"ש (ע"כ).
**** ENGLISH ****
כגון חלב etc.. אבל Ran wrote שהוא species in its species מwhat he wrote ק"ג א' אכל חלב מן החי etc. דliable because meat מן החי אלמא מין meat הוא (עPeri Chadash s.k. ז' מש"ש ומיהו כ"ז according to דר"י etc. פשיטא דחלב etc.. וע"ל s.k. ט') }וז"ש (צ"ח א') }ההוא כזיתא תרבא etc. ואי בטעמא מה שייך במה דabsorbed etc. וכן מש"ש ההוא פלגא דזיתא etc. ואי בטעמא לא שייך לפלוגי בd'rabbanan כיון שניכר טעמו and so too ראב"ן see there וע"ל סי' צ"ט ס"ד what he wrote שם: (ליקוט) כגון חלב etc.. ליתא שכבר wrote בת"ה שגירסת הגאונים והרי"ף בפג"ה (צ"ז ב') }species in its species כגון שומנא דגיד etc. see there (until here).
**** END BLOCK ****
```

### 43. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ב
**** HEBREW ****
<b>יטעמנו עובד כוכבים. </b>אע"ג דבגמ' אמרו קפילא דוקא היינו שאינו מסל"ת ונאמן משום דאומן לא מרעי נפשיה כמ"ש תוס' שם ד"ה סמכינן כו' אבל מסל"ת נאמן כל עובדי כוכבים ואע"ג דאין נאמן אלא בדרבנן כמ"ש בפ' בתרא דב"ק <small>(קי"ד ב') </small>כאן כיון שהוא מילתא דעבידא לגלויי נאמן כמ"ש הריב"ש בסי' תל"ג ובמ"ש ברפ"ב דר"ה ואף גוי כמ"ש בפ"ג דחולין (ס"ג ב') לוקחין ביצים כו'. וא"ל דוקא קפילא שהוא בקי דהא אמרו שם דהתירא בטעמא ולא אמרו קפילא וכן שם וקי"א ב' תרומה טעים לה כהן. ת"ה:
**** ENGLISH ****
יטעמנו non-Jew. even though דבגמ' אמרו קפילא specifically that is שאינו מסל"ת ונאמן becauseאומן לא מרעי נפשיה כwhat he wrote תוsixty שם s.v. סמכינן etc. אבל מסל"ת נאמן כל gentiles וeven though דאין נאמן אלא בd'rabbanan כwhat he wrote בפ' בתרא דב"ק (קי"ד ב') }כאן כיון שהוא מילתא דעבידא לגלויי נאמן כwhat he wrote הריב"ש בסי' תל"ג ובwhat he wrote ברchapter 2 דר"ה וeven גוי כwhat he wrote בפ"ג דחולין (seif 3 ב') לוקחין ביצים etc.. וand some say specifically קפילא שהוא בקי דהא אמרו שם דof heter בטעמא ולא אמרו קפילא וכן שם וקי"א ב' תרומה טעים לה כהן. ת"ה:
**** END BLOCK ****
```

### 44. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ג
**** HEBREW ****
<b>או שאומר כו'. </b>כמ"ש בפ"י דתרומות ופ"ב <small>(נ"ו א' ל"ה ב' ל"ט א"ב) </small>ופ"ה דע"ז במתני' <small>(ס"ה ב') </small>וגמ' שם הכי הלכתא <small>(ס"ז א') </small>א"ר הלכתא כו' <small>(ס"ח ב'):</small>
**** ENGLISH ****
או שאומר כו'. כמ"ש בפ"י דתרומות ופ"ב (נ"ו א' ל"ה ב' ל"ט א"ב) ופ"ה דע"ז במתני' (ס"ה ב') וGemara there. הכי הלכתא (ס"ז א') א"ר הלכתא כו' (ס"ח ב'):
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_098
npm run pipeline:editorial:advance -- --siman 98
```

## Checkpoint ids

siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%90
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%91
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%92
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%93
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%94
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%90
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%91
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%92
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%93
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=3#marker=_
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%90
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%91
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%90
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%91
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%92
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=_
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=7#marker=_
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%90
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%91
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%90
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%91
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%92
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%90
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%91
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%92
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%93
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%90
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%91
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%92
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%93
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=_
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%90
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%91
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%90
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%91
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%92
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=6#marker=_
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=7#marker=_
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=8#marker=_
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=9#marker=%D7%90
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=9#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%90
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%92