# Editorial retranslation — Siman 98 (part 2/5)

Generated: 2026-06-12T13:35:55.031Z

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

### 1. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ד
**** HEBREW ****
<b>והוא כו'. </b>בירושלמי פ"י דתרומות הלכה ב' ופ"ב דערלה הלכה ה' כל נ"ט בין לפגם בין לשבח אסור דר"מ רש"א לשבח אסור לפגם מותר רשב"ל אמר בשהשביח ואח"כ פגם אבל אם פגם ואח"כ השביח אף ר"מ מורה ר' יוחנן אמר לא שניא הוא השביח ופגם הוא פגם והשביח הוא המחלוקת כו' וקי"ל דהלכה כר"י וכיון דאיפסיק בגמ' דידן דהשביח ולבסוף פגם דאסור ה"ה לפגם וסוף השביח דהא שניהם שוין ועוד דמתני' כר"מ כמש"ש אמר עולא מחלוקת כו' אלא דלר"י בגמ' דאמר בפוגם מעיקרא מחלוקת א"א לאוקמי כר"מ אף אם תאמר בין בזו כו' אלא דהרמב"ם מפרש פוגם מעיקרא היינו פגם ולבסוף השביח כמ"ש בפי' שם והחלק הד' שמפסידו לפי שעה וברוב הימים משביחו כו' וזה נקרא פוגם מעיקרו אמנם פוגם מתחלה ועד סוף אצ"ל שהוא מותר כו' ומפרש דעולא ס"ל כרשב"ל בירושלמי ור"י אם אומר בשניהם מחלוקת הוא כשיטתו בירושלמי ומתני' לכ"ע כר"מ דבפוגם לגמרי ליכא למ"ד דאסור וכמ"ש בפי' אמנם פוגם מתחלה כו' כנ"ל ובזה מתורץ קושית תוס' שם ד"ה או כו' וג"כ ניחא דפריך רב חגא יין כו' ולא משני בשנצטנן אח"כ דמן הסתם הוא כן כמ"ש בירושלמי כמ"ש למטה ופסק כר' יוחנן ואף אם אומר דוקא בפוגם מעיקרא מחלוקת י"ל דמתני' ר"מ היא ובפי' הרמב"ם ט"ס שכתב ושני חלקים הנשארים כו' דהא השביח בתחלה נתבאר בגמ' שאסור ועוד שאמר איזה מהן כו' דמשמע דיש סברא ג"כ דפוגם לבסוף קל מהשביח לבסוף וזה ליכא למ"ד דר"י ל"ק אלא בין כו' ובירושלמי הנ"ל לא שניא כו' וצ"ל החלק הרביעי לא נתברר כו' דאם אומר בין בזו כו' ע"כ קי"ל כר"מ ושניהם אסורין ואם אומר דפוגם מעיקרא לבד מחלוקת וכמו שנפשט בגמ' שם אין ידוע אם הלכה כר"מ או כר"ש אבל בירושלמי דע"ז שם א"ר יוחנן הדא אמרה ברותחין אבל בצונן אסור היו רותחין וציננן ר"ל מהו. מעתה אפילו רותחין יהו אסורין מאחר שדרכן ליצנן כו' משמע דמותר אלא שהרמב"ם מפרש שהאיבעיא הוא כשיצטנן אם הוא פוגם עדיין מאחר שנפל לרותחין וכ"מ בפי' הרמב"ם ע"ש. אבל פשטא דירושלמי לא משמע כן וגם סוגיא דגמ' קשה לפירושו דאמר שם א"ר עמרם ניחזי כו' אר"ז שאני עיסה כו' וכן בירושלמי דתרומות וערלה שם ושם אמרו תמן תנינן שעורים שנפלו לתוך הבור כו' רי"א במחלוקת רשב"ל אמר ד"ה ואם איתא אפילו לר"י ד"ה היא אלא דפוגם מעיקרא ומתחלה ועד סוף דין א' להם ובזה ניחא דפריך רב חגא כו' ולא אוקים בשציננן וסוגיא דגמ' פגם מעיקרא משמע מתחלה ועד סוף וז"ש שם א"ר הלכתא כו' לאפוקי מר"ש לדעת ר' יוחנן. וב"י כתב דלמד מק"ו מהשביח ולבסוף פגם וטעה מאד בזה דהא ר"ל אמר מה פליגין וכן עולא בגמ' וכן איבעיא לגמ' לרבי יוחנן בפגם מעיקרא כו' אבל כו' ואף לסברא דבשניהם מחלוקת ר"ל גם בזו מחלוקת:
**** ENGLISH ****
והוא etc.. בירושלמי פ"י דתרומות the halachah ב' וchapter 2 דערלה the halachah ה' כל נ"ט בין for spoilage בין for improvement forbidden דר"מ רש"א for improvement forbidden for spoilage permitted רשב"ל אמר בשהשביח וafterward פגם אבל אם פגם וafterward השביח even ר"מ teacher ר' יוחנן אמר לא שניא הוא השביח ופגם הוא פגם והשביח הוא המחלוקת etc. וwe establish דthe halachah כר"י וכיון דאיפסיק בגמ' דידן דהשביח ולat the end פגם דforbidden ה"ה for spoilage וסוף השביח דהא both of them שוין ועוד דמתני' כר"מ כמש"ש אמר עולא מחלוקת etc. אלא דלר"י בגמ' דאמר בspoils innardsקרא מחלוקת א"א לwe establish כר"מ even אם תאמר בין בזו etc. אלא דRambam מפרש spoils innardsקרא that is פגם ולat the end השביח כwhat he wrote בפי' שם והdisagreed הד' שמפlimeו לפי שעה וin the majority הימים משביחו etc. וזה נקרא spoils innardsקרו אמנם spoils מתחלה ועד סוף אone must say שהוא permitted etc. ומפרש דעולא ס"ל כרשב"ל בירושלמי ור"י אם אומר בboth of them מחלוקת הוא כשיטתו בירושלמי ומתני' לכ"ע כר"מ דבspoils לגמרי there is not למ"ד דforbidden וכwhat he wrote בפי' אמנם spoils מתחלה etc. כit appears to me ובזה מתורץ קושית תוsixty שם s.v. או etc. וג"כ ניחא דfruitך רב חגא יין etc. ולא משני בשנצטנן afterward דמן הstam הוא כן כwhat he wrote בירושלמי כwhat he wrote למטה וruled כר' יוחנן וeven אם אומר specifically בspoils innardsקרא מחלוקת י"ל דמתני' ר"מ היא ובפי' Rambam ט"ס שwrote ושני disagreedים הנשארים etc. דהא השביח בתחלה נתבאר בגמ' שforbidden ועוד שאמר איזה מהן etc. דit appears דיש סברא ג"כ דspoils לat the end קל מהשביח לat the end וזה there is not למ"ד דר"י ל"ק אלא בין etc. ובירושלמי הit appears to me לא שניא etc. וone must say הdisagreed הרביעי לא נתברר etc. דאם אומר בין בזו etc. until here we establish כר"מ וboth of them forbiddenין ואם אומר דspoils innardsקרא לבד מחלוקת וכמו שנפשט בגמ' שם אין ידוע אם the halachah כר"מ או כר"ש אבל בירושלמי דע"ז שם א"ר יוחנן הדא אמרה בboiling אבל בcold forbidden היו boiling וציננן ר"ל מהו. מעתה אפילו boiling יהו forbiddenין מאחר שדרכן ליצנן etc. it appears דpermitted אלא שRambam מפרש שהאיבעיא הוא כשיצטנן אם הוא spoils עדיין מאחר שfell לboiling וכ"מ בפי' Rambam see there. אבל פשטא דירושלמי לא it appears כן וגם סוגיא דגמ' קשה לExplanation:ו דאמר שם א"ר עמרם ניחזי etc. אר"ז this case is different dough etc. וכן בירושלמי דתרומות וערלה שם ושם אמרו תמן תנינן שskinים שfell לתוך הבור etc. רי"א במחלוקת רשב"ל אמר s.v. ואם איתא אפילו לר"י s.v. היא אלא דspoils innardsקרא ומתחלה ועד סוף דין א' להם ובזה ניחא דfruitך רב חגא etc. ולא אוקים בשציננן וסוגיא דגמ' פגם innardsקרא it appears מתחלה ועד סוף וז"ש שם א"ר the halachah etc. to exclude מר"ש לדעת ר' יוחנן. וben yomo wrote דלמד מק"ו מהשביח ולat the end פגם וטעה מאד בזה דהא ר"ל אמר מה פליגין וכן עולא בגמ' וכן איבעיא לגמ' according to Ravי יוחנן בפגם innardsקרא etc. אבל etc. וeven לסברא honeyניהם מחלוקת ר"ל גם בזו מחלוקת:
**** END BLOCK ****
```

### 2. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ה
**** HEBREW ****
<b>וצריך כו'. </b>רשב"א וכנ"ל דמש"ה נקט קפילא. וצ"ע למה השמיט קפילא דנאמן בכ"ע והלך בדרך הרמב"ם שהשמיטו אבל הרמב"ם מפרש קפילא ל"ד אלא שהוא בקי בהכרת הטעם וכמ"ש הריב"ש בסי' רפ"ח דלא כב"י ולכן לא הזכיר מסל"ת דסובר דא"צ משום דעבידא לגלויי ול"ד לביצים דסובר דדוקא בישראל משום דלא עבידא לגלויי כמו כאן [אלא שב"י הכריע מדעתו כי ד' שיטות תוס' כתבו דוקא קפילא ורא"ש כ' קפילא ומסל"ת ורשב"א פסק דבא' מהן ורמב"ם פסק דא"צ לא קפילא ולא מסל"ת והכריע כמ"ש כאן וע' בטור וב"י]:
**** ENGLISH ****
וצריך etc.. רשב"א וכit appears to me דfor this reason נקט קפילא. וrequires study למה השמיט קפילא דנאמן בכ"ע והלך בby way of Rambam שהשמיטו אבל Rambam מפרש קפילא some say אלא שהוא בקי בהכרת the taste וכwhat he wrote הריב"ש בסי' רפ"ח דלא כben yomo ולכן לא הזכיר מסל"ת דסובר דא"צ becauseעבידא לגלויי וsome say לביצים דסובר דspecifically בישראל becauseלא עבידא לגלויי כמו כאן [אלא שben yomo הכריע מדעתו כי ד' שיטות תוsixty כתבו specifically קפילא ורא"ש wrote קפילא ומסל"ת ורשב"א ruled דבא' מהן ורמב"ם ruled דא"צ לא קפילא ולא מסל"ת והכריע כwhat he wrote כאן וע' בטור וben yomo]:
**** END BLOCK ****
```

### 3. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ו`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ו
**** HEBREW ****
<b>וכן אם הוא כו'. </b>דלא כר' יהודה וכמ"ש רבא שם וכן בפסחים ל' א' א"ר הלכתא כו' משמע דוקא בחמץ <small>(ערא"ש בפ"ה דע"ז ס"ס כ"ט) </small>וכן ס"ל לר"י ור"ל שם ובפ"ה דע"ז והא דאיפליגו אביי ורבא שם <small>(ס"ו א') </small>בתר שמא או בתר טעמא היינו בטבל ויי"נ דלהכי נקט חמרא וחמירא וכן סתמא דפ"ה די"ט <small>(ל"ח ב') </small>שפיר עבידו דאחיכו כו' וכן ס"ל לראב"י דהלכה כמותו <small>(אפי' בברייתא כמ"ש ביבמות ל"ז ס' א') </small>בזבחים ע"ט ב' וכן כל הסוגיא דפ' ג"ה <small>(צ"ח א') </small>ביצה בס"א ובמינה איירי כמש"ל סי' פ"ו ס"ה וכן פליגי אליבא דריב"ל שם בס' או במאה ולמדו מזרוע בשלה שהוא מין במינו וקי"ל כריב"ל בכ"מ ובע"ז ס"ט א' איפסיק הלכתא בששים: <br><b>(ליקוט) וכן כו'. </b>כר"י ור"ל דהלכה כר"י לגבי רב ושמואל כמ"ש בפ"ק די"מ <small>(ד') </small>ופ"ד דעירובין <small>(מ"ז ב') </small>וכן ס"ל לרבא בפ' התערובות <small>(ע"ט א') </small>ופ' ג"ה וכן ס"ל לראב"י בפ' התערובות ומשנת ראב"י קב ונקי וכן בפ"ה דע"ז <small>(ס"ט א') </small>והלכתא כו' וכן כל כו' <small>(לפי' הריטב"א שם אין ראיה וע"ש) </small>והא דפליגי אביי ורבא שם בחלא וחמירא היינו בטבל ויי"נ והא דרבא פ"ב דפסחים שם משום חומרא דחמץ כמו שאינו מינו לרב ה"ה מינו לרבא תוס' וש"פ (ע"כ):
**** ENGLISH ****
וכן אם הוא etc.. דלא כר' יהודה וכwhat he wrote רבא שם וכן בפסחים ל' א' א"ר the halachah etc. it appears specifically בחמץ (ערא"ש בפ"ה דע"ז end of seif כ"ט) }וכן ס"ל לר"י ור"ל שם ובפ"ה דע"ז והא דאיפליגו אביי ורבא שם (ס"ו א') }בתר lest או בתר טעמא that is בטבל ויי"נ דלהכי נקט חמרא וחמירא וכן סתמא דפ"ה די"ט (ל"ח ב') }well עבידו דאחיכו etc. וכן ס"ל לראben yomo דthe halachah כמותו (even בברייתא כwhat he wrote ביבמות ל"ז sixty א') }בזבחים ע"ט ב' וכן כל הסוגיא דפ' ג"ה (צ"ח א') }egg בס"א ובמינה איירי as written above סי' chapter 6 seif 5 וכן פליגי according to דריב"ל שם בsixty או במאה ולמדו מזרוע בשלה שהוא species in its species וwe establish כריב"ל בכ"מ ובע"ז seif 9 א' איפסיק the halachah בsixty: (ליקוט) וכן etc.. כר"י ור"ל דthe halachah כר"י לגבי רב ושמואל כwhat he wrote בfirst chapter די"מ (ד') }ופ"ד דעירובין (מ"ז ב') }וכן ס"ל according to Ravא בפ' התערובות (ע"ט א') }ופ' ג"ה וכן ס"ל לראben yomo בפ' התערובות ומשנת ראben yomo קב וclean וכן בפ"ה דע"ז (seif 9 א') }וthe halachah etc. וכן כל etc. (לפי' הריטב"א שם אין proof וsee there) }והא דפליגי אביי ורבא שם בחלא וחמירא that is בטבל ויי"נ והא דרבא chapter 2 דפסחים שם because stringency דחמץ כמו שאינו מינו according to Rav ה"ה מינו according to Ravא תוsixty וש"פ (until here):
**** END BLOCK ****
```

### 4. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ז`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ז
**** HEBREW ****
<b>ואין נוהגין כו'. </b>מצד החומרא וכפי' הרא"ש ור"ן דלא הוזכר נ"ט אלא בפחות מס' אבל בס' מסתמא אין בו נ"ט וז"ש בכ"מ כל האיסורין שבתורה בס' [וער"ס צ"ט ירושלמי נ"ט א' מס' כו' וכן בע"ז ס"ט א' והלכתא כו'] וז"ש סמכינן אקפילא ואי בס' מאי סמכינן דמשמע דקולא היא הא בלא קפילא מותר לגמרי ודברי ש"ע אין בהן הכרע שהוא כדברי הגמ' דלא כש"ך וע"ל סי' ק' ס"ב:
**** ENGLISH ****
ואין נוהגין etc.. מצד הstringency וכפי' Rosh ור"ן דלא הוזכר נ"ט אלא בפחות מsixty אבל בsixty מסתמא אין בו נ"ט וז"ש בכ"מ כל האיסורין שבתורה בsixty [וער"ס צ"ט ירושלמי נ"ט א' מsixty etc. וכן בע"ז seif 9 א' וthe halachah etc.] וז"ש סמכינן אקפילא ואי בsixty מאי סמכינן דit appears דקולא היא הא without קפילא permitted לגמרי ודברי ש"ע אין בהן הכרע שהוא כדברי הגמ' דלא כש"ך וע"ל סי' ק' ס"ב:
**** END BLOCK ****
```

### 5. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: א
**** HEBREW ****
<b>(ליקוט) אם כו' </b>אבל כו'. כשיטת ר"ת ועבת"ה ק' ק"א שהאריך שם (ע"כ): <br><b>(ליקוט) אם נתערב כו'. </b>הרא"ש בפ' ג"ה אליבא דר"ת שסובר דמין בשא"מ דאורייתא אפילו במשהו וטעמא ומ"ש טעמו ולא ממשו אין לוקין עליו היינו במין במינו ומשמע ברא"ש אבל לפי' ר' חיים דוקא בשיש כבא"פ דלא נקט אלא לפי' ר"ת וכ"ד הרמב"ן הביאו הרא"ש בסוף חלה אבל הראב"ד וטור כ' דאפילו אין כבא"פ מ"מ הוי כמו חצי שיעור שאסור מן התורה וכן כולו נהפך לאיסור וט"ס בטור שכ' ר"ת וצ"ל ר"ת (ע"כ):
**** ENGLISH ****
(ליקוט) אם etc. אבל etc.. כשיטת ר"ת ועבת"ה ק' ק"א שהאריך שם (until here): (ליקוט) אם נתערב etc.. Rosh בפ' ג"ה according to דר"ת שסובר דמין בשא"מ d'oraisa אפילו במשהו וטעמא וwhat he wrote טעמו ולא ממשו אין לוקין עליו that is בspecies in its species וit appears ברא"ש אבל לפי' ר' חיים specifically בשיש כבא"פ דלא נקט אלא לפי' ר"ת וso too הרמב"ן הביאו Rosh at the end חלה אבל הראב"ד וטור wrote דאפילו אין כבא"פ nevertheless הוי כמו חצי שיskin שforbidden מן התורה וכן כולו נהפך לאיסור וט"ס בטור שwrote ר"ת וone must say ר"ת (until here):
**** END BLOCK ****
```

### 6. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: ב
**** HEBREW ****
<b>ולענין כו'. </b>כרבא ע"ז ס"ו א'. ועש"ך וכ"מ בגמ' הנ"ל מין במינו דליכא למיקם אטעמא משמע שהטעמים שוין ועתוס' דזבחים ע"ח א' ד"ה אלא כו' ומנחות כ"ג ב' ד"ה אלא כו':
**** ENGLISH ****
וregarding etc.. כרבא ע"ז ס"ו א'. ועש"ך וכ"מ בגמ' הit appears to me species in its species דthere is not למיקם אטעמא it appears שהטעמים שוין ועתוsixty דזבחים ע"ח א' s.v. אלא etc. ומנחות כ"ג ב' s.v. אלא etc.:
**** END BLOCK ****
```

### 7. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: ג
**** HEBREW ****
<b>אבל נתערב כו'. </b>דקיי"ל טעם כעיקר דאורייתא כמ"ש בפ"ג דפסחים <small>(מ"ד) </small>ופ"ו דנזיר ליתן טעם כו' וע"כ דרשא גמורה היא מדפריך והאי משרת להכי הוא דאתא ולר"ע לוקין על היתר מצטרף לאיסור ובזבחים ע"ח ב' אלא מין בשאינו מינו כו' ושם ע"ט א' אמור רבנן כו' וע"כ מדאורייתא דומיא דמין במינו שהוא דאורייתא כמש"ש ע"ח א' א"ה אימא סיפא כו' והא דאמרינן בע"ז ס"ז ב' טעמו ולא ממשו כו' פי' בתוס' שם ד"ה אר"י בשם ר' אליהו דכזית בא"פ קרי טעמו וממשו וכתב הרא"ש בפ' ג"ה דלוקין אפילו על כזית ממנו דכולה נתהפך לאיסור דטעם כעיקר דאורייתא וכמ"ש משרת ליתן כו' שאם שרה כו' ואם אינו בא"פ אין לוקין ועבתוס' ורא"ש בפ' ג"ה וכ"כ הראב"ד ורשב"א וכתבו דמ"מ אסור הוא מדאורייתא כמו חצי שיעור ברפ"ח דיומא ועהג"א פ"ה דע"ז סי"א ד"ה וטעם כו' ועמ"ש בא"ח סי' תנ"ג ס"ב:
**** ENGLISH ****
אבל נתערב etc.. דקיי"ל טעם כעיקר d'oraisa כwhat he wrote בפ"ג דפסחים (מ"ד) }וchapter 6 דנזיר ליתן טעם etc. וuntil here דרשא גteacher היא מדfruitך והאי משרת להכי הוא דאתא ולר"ע לוקין על היתר מצטרף לאיסור ובזבחים ע"ח ב' אלא מין בשאינו מינו etc. ושם ע"ט א' אמור רבנן etc. וuntil here מd'oraisa דומיא דspecies in its species שהוא d'oraisa כמש"ש ע"ח א' א"ה אימא סיפא etc. והא דאמרינן בע"ז s.k. 7 ב' טעמו ולא ממשו etc. פי' בתוsixty שם s.v. אר"י in name of ר' אליהו דכזית בא"פ קרי טעמו וממשו וwrote Rosh בפ' ג"ה דלוקין אפילו על כזית ממנו דכולה נתהפך לאיסור דטעם כעיקר d'oraisa וכwhat he wrote משרת ליתן etc. שאם שרה etc. ואם אינו בא"פ אין לוקין ועבתוsixty ורא"ש בפ' ג"ה and so too הראב"ד ורשב"א וכתבו דnevertheless forbidden הוא מd'oraisa כמו חצי שיskin ברפ"ח דיומא ועהג"א פ"ה דע"ז סי"א s.v. וטעם etc. ועwhat he wrote Orach Chaim סי' תנ"ג ס"ב:
**** END BLOCK ****
```

### 8. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `ד`

- Quality: **error** — hebrew_in_english, untranslated_copy, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: ד
**** HEBREW ****
<b>ואם נתערב במינו כו'. </b>כמ"ש בחולין ק' ב' ובע"ז ע"ג א' ב':
**** ENGLISH ****
ואם נתערב במינו כו'. כמ"ש בחולין ק' ב' ובע"ז ע"ג א' ב':
**** END BLOCK ****
```

### 9. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `_`

- Quality: **error** — hebrew_in_english, untranslated_copy
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: _
**** HEBREW ****
<b>בד"א כו'. </b>ממ"ש צ"ז ב' פשיטא דבדידיה כו' אע"ג שאין אסור רק מדבריהם כמ"ש ק"ט א' קי"א א'. ת"ח ור"ן:
**** ENGLISH ****
בד"א כו'. ממ"ש צ"ז ב' פשיטא דבדידיה כו' אע"ג שאין אסור רק מדבריהם כמ"ש ק"ט א' קי"א א'. ת"ח ור"ן:
**** END BLOCK ****
```

### 10. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `א`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: א
**** HEBREW ****
<b>איסור כו'. </b>גיד הנשה שנתבשל כו' וכן חתיכת כו' וערש"י שם ושם צ"ז ב' כחל בששים כו' וכחל עצמו אסור ועבה"ג:
**** ENGLISH ****
איסור כו'. — see there.
**** END BLOCK ****
```

### 11. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ב`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ב
**** HEBREW ****
<b>כנגד כל כו'. </b>שם צ"ז ב':
**** ENGLISH ****
כנגד כל כו'. — see there.
**** END BLOCK ****
```

### 12. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ג
**** HEBREW ****
<b>בין כו'. </b>ר"ל לאפוקי מדעת הראב"ד שכתב דוקא בשל חרס דומיא דכחל שא"א להפרידו דכחל עצמו אסור משא"כ בשאר כלים דאפשר בהגעלה משערינן באומר יפה: <br><b>(ליקוט) בין כו'. </b>לאפוקי מהראב"ד וכתב והיאך אפשר שנשער בכולו וכאלו כולו אסור והרי אתה מכשירו בהגעלה אבל בת"ה הקשה עליו דא"כ כחל נמי דאף שעתה אין לו הכשר מ"מ קודם שנפל הרי אתה ממרקו בקריעה וטיחה והיאך אפשר כו' ועוד כיון שאמרו בגמ' משום דלא ידעינן כמה נפיק מ"ל חוזר להכשירו או לא וכ' וכ"ד רבותינו הצרפתים וכ"ד הרמב"ן ז"ל (ע"כ):
**** ENGLISH ****
בין etc.. ר"ל to exclude מדעת הראב"ד שwrote specifically בשל חרס דומיא דudder שא"א להfruitדו דudder עצמו forbidden משif so in other כלים דאפשר בהגcame up משערינן באומר יפה: (ליקוט) בין etc.. to exclude מהראב"ד וwrote והיאך אפשר שנשער בכולו וas if כולו forbidden והרי אתה מכשירו בהגcame up אבל בת"ה challenged עליו דif so udder נמי דeven שעתה אין לו הכשר nevertheless קוblood שfell הרי אתה מsauceו בקריעה וplastering והיאך אפשר etc. ועוד כיון שאמרו בגמ' becauseלא ידעינן כמה נפיק מ"ל חוזר להכשירו או לא וwrote וso too רבותינו הצרפתים וso too הרמב"ן and these are his words (until here):
**** END BLOCK ****
```

### 13. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ד
**** HEBREW ****
<b>או מתכת. </b>לאפוקי מהי"א וע"ל ר"ס צ"ד:
**** ENGLISH ****
או מתכת. — see there.
**** END BLOCK ****
```

### 14. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ה`

- Quality: **error** — hebrew_in_english, untranslated_copy, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ה
**** HEBREW ****
<b>ובלבד כו'. </b>כמ"ש שם צ"ז ב' מכלל כו':
**** ENGLISH ****
ובלבד כו'. כמ"ש שם צ"ז ב' מכלל כו':
**** END BLOCK ****
```

### 15. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ו`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ו
**** HEBREW ****
<b>וכל איסור כו'. </b>כמ"ש במתני' הנ"ל אם מכירו כו' ובירושלמי פ"ב דערלה שאור של תרומה שנפל לתוך העיסה והגביהו ואח"כ נתחמצה העיסה ה"ז מותרת. ודכוותה תאנה של תרומה שנפלה לתוך מאה הוגבהה א' מהן ואח"כ הוגרה התרומה תהא מותרת תמן לא הוכר האיסור ברם הכא הוכר האיסור:
**** ENGLISH ****
וכל איסור etc.. כwhat he wrote במתני' הit appears to me אם מכירו etc. ובירושלמי chapter 2 דערלה שאור של תרומה שfell לתוך הdough והגביהו וafterward נתחמצה הdough ה"ז permittedת. ודכוותה תאנה של תרומה שfellה לתוך מאה הוגבהה א' מהן וafterward הוגרה התרומה תהא permittedת תמן לא הוכר האיסור ברם הכא הוכר האיסור:
**** END BLOCK ****
```

### 16. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ז`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ז
**** HEBREW ****
<b>איסור שנתבטל כו'. </b>שם אלא מעתה נפל לקדירה אחרת כו' וערש"י שם ד"ה כיון כו':
**** ENGLISH ****
A ban that was abolished. This is where it is from now, but from now on, it has fallen into a different apartment, and it is written by the Lord:
**** END BLOCK ****
```

### 17. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ח`

- Quality: **warn** — divine_name_style, html_entity_leak, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%97`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ח
**** HEBREW ****
<b>אבל אם כו' </b>כ"מ שם דקאמר לקדירה אחרת ול"ק לאותה קדירה ב"פ דהא קאי אנתבטלה בס' ואע"ג דבלוע שבו נ"נ והוי כאיסור אחר שנפל דאוסר כמ"ש בסי' צ"ט ס"ו בהג"ה והטעם דהא אותו הבלוע הוי בקדירה מין במינו ובכה"ג אוקמוה אדאורייתא ברובא וכמ"ש הרא"ש בפ' ג"ה דמין במינו בס' גזירה אטו שא"מ משא"כ בכה"ג דליכא למיגזר דא"א באותו קדירה אלא במינו ועש"ך סי' צ"ד ס"ק ה':
**** ENGLISH ****
But if he is called &quot;the Lord,&quot; he said, &quot;and he shall be cursed, and he shall be given to him.&quot;
**** END BLOCK ****
```

### 18. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `א`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: א
**** HEBREW ****
<b>אם ידוע כו' </b>דלא כו'. ע"ל סי' צ"ב סס"ד בהג"ה:
**** ENGLISH ****
אם ידוע כו' דלא כו'. — see there.
**** END BLOCK ****
```

### 19. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ב
**** HEBREW ****
<b>אפילו אם ניערו כו'. </b>ר"ל לא מיבעיא בבב"ח דל"ל נ"נ אפילו במאכל כמש"ל סי' צ"ד ס"ו וז"ש <small>(צ"ז א' וש"מ) </small>קדירה שבשל בה בשר כו' ואפי' בישנה <small>(וסיפא תרומה כו' בחדשה דוקא ואיידי דלא מפליג ברישא לא מפליג בסיפא):</small>
**** ENGLISH ****
אפילו אם ניערו etc.. ר"ל לא מיבעיא בבב"ח דל"ל נ"נ אפילו במאכל as written above siman 94 ס"ו וז"ש (צ"ז א' וש"מ) }קדירה שבשל בה meat etc. וeven בישנה (וסיפא תרומה etc. בחדשה specifically ואיידי דלא מפליג ברישא לא מפליג בסיפא):}
**** END BLOCK ****
```

### 20. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ג
**** HEBREW ****
<b>אבל כף כו'. </b>ובבלע איסור דאמרינן נ"נ כנ"ל:
**** ENGLISH ****
But a spoon. And in the same way, we are not allowed to do so:
**** END BLOCK ****
```

### 21. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ד`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ד
**** HEBREW ****
<b>ובת יומא. </b>ע"ל סי' צ"ד:
**** ENGLISH ****
ובת יומא. — see there.
**** END BLOCK ****
```

### 22. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ה
**** HEBREW ****
<b>(ליקוט) ויש מי כו'. </b>וכ"ד תוס' בחולין צ"ז ב' ד"ה איכא כו'. וס' ראשונה ס"ל כי"מ שכ' הרשב"א דמ"ש בקדירה עצמה לחומרא דלא משערינן בבלוע ועסי' צ"ט ס"ד (ע"כ):
**** ENGLISH ****
(ליקוט) ויש מי etc.. וso too תוsixty בחולין צ"ז ב' s.v. there is etc.. וsixty ראשונה ס"ל כי"מ שwrote Rashba דwhat he wrote בקדירה עצמה לstringency דלא משערינן בabsorbed ועסי' צ"ט ס"ד (until here):
**** END BLOCK ****
```

### 23. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ו`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ו
**** HEBREW ****
<b>ויש שאינן כו'. </b>כ"כ המרדכי בפ' ג"ה בשם רא"מ דומיא דכחל שא"א להפרידו וראיה ממ"ש בפסחים ע"ד א' ב' כבולעו כך פולטו ואם איתא מיד שבלעו הבשר נ"נ ומה מהני הפליטה ובפ' כ"ה ק"ה א' אי קסבר אפשר לסוחטו מותר חתיכה כו' וכן כאן כיון דאפשר לסוחטו שיכול להכשירו אינו נ"נ. וסובר הרב דאפילו בחדש אסור בכ"ח. ואינו כן ועש"ך:
**** ENGLISH ****
ויש שאינן etc.. כ"כ המרדכי בפ' ג"ה in name of רא"מ דומיא דudder שא"א להfruitדו וproof מwhat he wrote בפסחים ע"ד א' ב' כבולעו כך פולטו ואם איתא מיד שabsorbedו הmeat נ"נ ומה מהני הemission ובפ' כ"ה ק"ה א' אי קסבר אפשר לסוחטו permitted חתיכה etc. וכן כאן כיון דאפשר לסוחטו שיכול להכשירו אינו נ"נ. וסובר הרב דאפילו בחדש forbidden בכ"ח. ואינו כן ועש"ך:
**** END BLOCK ****
```

### 24. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: א
**** HEBREW ****
<b>שיש בה אפרוח. </b>כן אוקמוה בגמ' שם:
**** ENGLISH ****
She has a sigh. Yes, I'm going to get up there:
**** END BLOCK ****
```

### 25. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `ב`

- Quality: **warn** — hebrew_in_english
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: ב
**** HEBREW ****
<b>או. </b>תוס' שם:
**** ENGLISH ****
או. תוס' שם:
**** END BLOCK ****
```

### 26. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: ג
**** HEBREW ****
<b>לבטל פליטתה. </b>לאפוקי עצמה שאינה בטילה כמ"ש בר"ס ק':
**** ENGLISH ****
Canceling its refugee. To my own folly, which is not in the box as a “C.”:
**** END BLOCK ****
```

### 27. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `א`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: א
**** HEBREW ****
<b>כל האיסורין כו'. </b>ע"ז ס"ט א' ע"ג ב' וכר"י ור"ל כנ"ל ואמר כל ר"ל אפילו איסורין דרבנן דלא כהרמב"ם שכ' דבטלה בנ"ט ולמד מכחל ועתוס' צ"ז ב' ד"ה וכחל כו' וי"ל כו': <br><b>(ליקוט) כל האיסורין. </b>ר"ל אפי' של דבריהם ועש"ך וראיה ממ"ש בס"ז ביצה כו' והיא אינה אלא מד"ס כמש"ש ס"ד ב' וכן ממ"ש <small>(צ"ז ב') </small>גיד בס' ומשמע אפי' בשלימה וע"כ משום שומנו <small>(וע"ל סי' ס"ה ס"ק כ"ה) . ת"ה ועברמב"ם פט"ו מהמ"א הלכה י"ז ואע"פ ששומן כו' ובהלכה י"ט שם ועלח"מ שם בהלכה י"ז. והרשב"א לשיטתו דלא ס"ל טעם הרמב"ם גבי ביצה כנ"ל סי' פ"ו ס"ק ו') . </small>ודעת הרמב"ן שכל איסור דבריהם שאין לו עיקר בדאורייתא ברובא בטיל וכמ"ש בחלת ח"ל <small>(בירושלמי סוף חלה ובתרומת ח"ל בגמ' בכורות כ"ז א') </small>ובשאובין בפ' הערל <small>(פ"ב ב') </small>וכתב וה"ה לבישולי נכרים וגבינה של נכרים אבל בת"ה חולק עליו ע"ש ק"ח א' (ע"כ):
**** ENGLISH ****
כל האיסורין etc.. ע"ז seif 9 א' ע"ג ב' וכר"י ור"ל כit appears to me ואמר כל ר"ל אפילו איסורין d'rabbanan דלא כRambam שwrote דבטלה בנ"ט ולמד מudder ועתוsixty צ"ז ב' s.v. וudder etc. and one may say etc.: (ליקוט) כל האיסורין. ר"ל even של דבריהם ועש"ך וproof מwhat he wrote בs.k. 7 egg etc. והיא אינה אלא מד"ס כמש"ש ס"ד ב' וכן מwhat he wrote (צ"ז ב') }גיד בsixty וit appears even בשלימה וuntil here because שומנו (וע"ל סי' seif 5 s.k. כ"ה) . ת"ה וhe transgressedמב"ם פט"ו מהמ"א the halachah י"ז ואon the surface of ששומן etc. ובthe halachah י"ט שם ועלח"מ שם בthe halachah י"ז. וRashba לשיטתו דלא ס"ל טעם Rambam גבי egg כit appears to me סי' chapter 6 s.k. ו') . }ודעת הרמב"ן שכל איסור דבריהם שאין לו עיקר בd'oraisa in the majority nullified וכwhat he wrote בחלת ח"ל (בירושלמי סוף חלה ובתרומת ח"ל בגמ' בכורות כ"ז א') }ובשאובין בפ' הערל (chapter 2 ב') }וwrote and the same applies לcookingי נכרים וcheese של נכרים אבל בת"ה disagrees עליו see there ק"ח א' (until here):
**** END BLOCK ****
```

### 28. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ב
**** HEBREW ****
<b>בזה"ז. </b>ר"ל לאפוקי טבל כמ"ש בע"ז שם וכן תרומה וכיוצא דבמאה וערלה וכיוצא במאתים וכ"ז במינן אבל שלא במינן הכל בס' כמ"ש בפ"ב דערלה גריסין כו' וכן טבל הוא דשיל"מ וכמ"ש בירושלמי פ"ו דנדרים וכל שיש לו כו' חוץ חמץ בפסח:
**** ENGLISH ****
בזה"ז. ר"ל to exclude טבל כwhat he wrote בע"ז שם וכן תרומה וכיוצא דבמאה וערלה וכיוצא במאתים וכ"ז במינן אבל שלא במינן הכל בsixty כwhat he wrote בchapter 2 דערלה גריסין etc. וכן טבל הוא דשיל"מ וכwhat he wrote בירושלמי chapter 6 דנדרים וכל שיש לו etc. חוץ חמץ בפסח:
**** END BLOCK ****
```

### 29. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ג`

- Quality: **error** — hebrew_in_english, untranslated_copy, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ג
**** HEBREW ****
<b>ובלבד כו'. </b>כמ"ש בפ"ב דערלה וחולין צ"מ א' גריסין כו' אם יש בנ"ט בין שיש כו' ושם ב' א"ל אדכרתן כו' שהרי כו':
**** ENGLISH ****
ובלבד כו'. כמ"ש בפ"ב דערלה וחולין צ"מ א' גריסין כו' אם יש בנ"ט בין שיש כו' ושם ב' א"ל אדכרתן כו' שהרי כו':
**** END BLOCK ****
```

### 30. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ד`

- Quality: **error** — hebrew_in_english, untranslated_copy, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ד
**** HEBREW ****
<b>והוא אסור כו'. </b>עתוס' שם ק"ח ב' ד"ה אמאי כו' ומכאן כו':
**** ENGLISH ****
והוא אסור כו'. עתוס' שם ק"ח ב' ד"ה אמאי כו' ומכאן כו':
**** END BLOCK ****
```

### 31. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ה`

- Quality: **error** — hebrew_in_english, untranslated_copy, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ה
**** HEBREW ****
<b>ולכן כו'. </b>שם צ"ז ב' וע"ז ס"ט א' ועתוס' שם ד"ה בתבלין כו':
**** ENGLISH ****
ולכן כו'. שם צ"ז ב' וע"ז ס"ט א' ועתוס' שם ד"ה בתבלין כו':
**** END BLOCK ****
```

### 32. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ו`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ו
**** HEBREW ****
<b>(ליקוט) אם אסורין מחמת עצמן. </b>כ"פ תוס' <small>(כנ"ל בס"ק ל"ג) </small>וסה"ת אבל סמ"ג ומרדכי סי' תתרפ"ט כתבו שריב"א וד"ש חלקו ע"ז וראייתן ממש"ש צ"ט ב' דאריב"ח לא כו' שהרי ציר כו' וציר אינו אסור אלא מחמת שמנונית ואפ"ה משערינן בחומץ ומלח שבתוכו וצ"ע ואפשר לומר דס"ל דר' יוסי במתני' שם בהא פליג עלייהו דמשערינן בשמנונית לחוד ולכן אינו אוסר אלא בט"ז בו ופ' כר' יוסי אע"ג דת"ק פליג עליו משום דסוגיא דשם ק"ח ב' כוותיה כמש"ש וכמ"ש בתוס' שם וע' במרדכי שם בשם מהר"מ שפ' ג"כ כר' יוסי ע"ש ומ"ש בגמ' לא כל השיעורין כו' שהרי כו' משום דבזה לא פליג ר' יוסי אם היה המלח ומים אסורים מחמת עצמם (ע"כ)
**** ENGLISH ****
(ליקוט) אם forbiddenין because of themselves. כ"פ תוsixty (כit appears to me בs.k. ל"ג) }וSemak אבל Semag ומרדכי סי' תתרchapter 9 כתבו שריב"א וד"ש disagreedו ע"ז וראייתן ממש"ש צ"ט ב' דאריב"ח לא etc. שהרי broth etc. וbroth אינו forbidden אלא מחמת grease וeven so משערינן בחומץ וsalt שבתetc. וrequires study ואפשר לומר דס"ל דר' יוסי במתני' שם בהא פליג עלייהו דמשערינן בgrease לחוד ולכן אינו אוסר אלא בט"ז בו ופ' כר' יוסי even though דת"ק פליג עליו becauseסוגיא דשם ק"ח ב' כוותיה כמש"ש וכwhat he wrote בתוsixty שם וע' במרדכי שם in name of מהר"מ שפ' ג"כ כר' יוסי see there וwhat he wrote בגמ' לא כל השיskinין etc. שהרי etc. becauseבזה לא פליג ר' יוסי אם היה הsalt ומים forbiddenים מחמת עצמם (until here)
**** END BLOCK ****
```

### 33. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ז`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ז
**** HEBREW ****
<b>(ליקוט) אינן בטלין בששים. </b>תוס' דע"ז שם ד"ה בתבלין כו' והג"א שם ד"ה תבלין כו' (ע"כ):
**** ENGLISH ****
(Lekut) אינן בטלין בששים. תוס' דע"ז שם ד"ה בתבלין כו' והג"א שם ד"ה תבלין כו' (end of his words):
**** END BLOCK ****
```

### 34. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 9 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 9
marker: א
**** HEBREW ****
<b>וכן כ"ט כו'. </b>לשיטתו דבשאר איסורים לא אמרינן חנ"נ:
**** ENGLISH ****
וכן כ"ט כו'. — see there.
**** END BLOCK ****
```

### 35. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 9 — marker `ב`

- Quality: **warn** — hebrew_in_english
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 9
marker: ב
**** HEBREW ****
<b>בשוגג. </b>ע"ל סי' צ"ט ס"ה:
**** ENGLISH ****
בשוגג. — see there.
**** END BLOCK ****
```

### 36. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 9 — marker `ג`

- Quality: **error** — hebrew_in_english, untranslated_copy, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 9
marker: ג
**** HEBREW ****
<b>וכ"ש בב' כו'. </b>דטעמא דהתירא ולשיטתו דוקא בכה"ג דל"ל נ"נ כמ"ש בסי' צ"ד ס"ו:
**** ENGLISH ****
וכ"ש בב' כו'. דטעמא דהתירא ולשיטתו דוקא בכה"ג דל"ל נ"נ כמ"ש בסי' צ"ד ס"ו:
**** END BLOCK ****
```

### 37. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 1 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=1#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 1
marker: _
**** HEBREW ****
<b>א) [סעיף א'] איסור שנתערב בהיתר מין בשאינו מינו כגון חלב שנתערב בבשר וכו'  </b>והיינו חלב בציר"י דהיינו תרבא דתרבא בבשרא הוי מין באינו מינו. ט"ז סק"א. ש"ך סק"א. פר"ח או' א' לה"פ או' א' בל"י או' א' כריתי או' א' חו"ד או' א' שפ"ד או' א' קהלת יהודה סעי' א' זב"צ או' א'.
**** ENGLISH ****
א) [seif א'] איסור שנתערב in heter מין בשאינו מינו כגון חלב שנתערב בmeat etc.  וthat is חלב בbroth"י that is תרבא דתרבא בmeatא הוי מין באינו מינו. ט"ז סק"א. ש"ך סק"א. Peri Chadash או' א' Lechem HaPanim או' א' Binyamin Zeev או' א' Kereti או' א' חו"ד או' א' שפ"ד או' א' Kehillat Yehudah סעי' א' Zivchei Tzedek או' א'.
**** END BLOCK ****
```

### 38. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 2 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 2
marker: _
**** HEBREW ****
<b>ב) שם. יטעמנו עכו"ם וכו'  </b>כבר כתבנו כמה פעמים דעכשיו המנהג כדברי מור"ם ז"ל בהגה דאין סומכים על טעימת עכו"ם אלא משערין הכל בס' בין האשכנזים בין הספרדים. וכ"כ לעיל סי' צ"ב או' ב' יעו"ש. וכ"כ זב"צ בסי' זה או' ב' וע"כ לא נאריך בטעימת נכרי כיון דלדידן לא נ"מ מידי. ועיין עוד לקמן או' י"א.
**** ENGLISH ****
ב) שם. יטעמנו non-Jew etc.  כבר כתבנו כמה פעמים דnow הcustom כדברי מור"ם and these are his words בהגה דאין סומכים על טעימת non-Jew אלא משערין הכל בsixty בין הAshkenazים בין הספרדים. and so too above סי' one must examine או' ב' יעו"ש. and so too Zivchei Tzedek בסי' זה או' ב' וuntil here לא נאריך בטעימת נכרי כיון דfor us לא נ"מ מידי. ועיין עוד below או' י"א.
**** END BLOCK ****
```

### 39. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 3 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 3
marker: _
**** HEBREW ****
<b>ג) שם. יטעמנו נכרי וכו'  </b>ואי אית ביה טעמא אע"ג דאית ביה טפי מס' אסור. ב"י פר"ח סוף או' ד' פר"ת או' ד' מזמור לדוד רסי' זה. זב"צ או' ג' ונ"מ גם לדידן שמשערין בס' אי אית ביה טעמא אסור.
**** ENGLISH ****
ג) שם. יטעמנו נכרי etc.  ואי אית ביה טעמא even though דאית ביה טפי מsixty forbidden. ben yomo Peri Chadash סוף או' ד' פר"ת או' ד' מזמור לדוד רסי' זה. Zivchei Tzedek או' ג' ונ"מ גם for us שמשערין בsixty אי אית ביה טעמא forbidden.
**** END BLOCK ****
```

### 40. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 4 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 4
marker: _
**** HEBREW ****
<b>ד) שם יטעמנו נכרי וכו'  </b>ומיהו מותר ללחוך בלשון באיסור במקום ספק כגון באינו יודע אם מלוח או במרה. ט"ז סק"ב. חו"ד או' ב' ובתנאי שיקנח הדם מעליו. ולשונו צריך תיקון. וה"ד במקום ספק שרי הא ודאי איסור אף בלשון אסור. מש"ז או' ב' וכבר כתבנו מזה לעיל סי' ס"ט או' ק"ט ובסי' מ"ב או' י"ד וית' עוד לקמן סי' ק"ח סעי' ה' בהגה יעו"ש.
**** ENGLISH ****
ד) שם יטעמנו נכרי etc.  ומיהו permitted ללחוך בlanguage of באיסור במקום doubt כגון באינו יודע אם מלוח או במרה. ט"ז סק"ב. חו"ד או' ב' ובתנאי שיקנח הblood מעליו. ולשונו צריך תיקון. וה"ד במקום doubt שרי הא certainly איסור even בlanguage of forbidden. מש"ז או' ב' וכבר כתבנו מזה above סי' seif 9 או' ק"ט ובסי' מ"ב או' י"ד וית' עוד below סי' ק"ח סעי' ה' בהגה יעו"ש.
**** END BLOCK ****
```

### 41. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 5 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 5
marker: _
**** HEBREW ****
<b>ה) שם. משערינן בס' וכו'  </b>והשיעור לבטל בס' הוא באומד ומדידה ולא במשקל. שער אפרים סי' נ"א. עבודת הגרשוני סי' ל' פר"ח סי' צ"ט או' ו' פר"ת שם סוף או' ד' בל"י שם סוף או' ו' מנ"י על התו"ח כלל פ"ה או' נ"ח וכתב דהמשער ע"י משקל טועה. מט"י בשו"ת שבסוף הספר דף ל"ה ע"ג. בית דוד חי"ד סי' מ"ג. שו"ג סי' צ"ט מחו' או' א' ברכ"י סי' צ"ט בשיו"ב או' ב' בשם כמה פו' חכ"א כלל נ"ב או' ג' וכתב דהמתיר ע"י משקל מאכיל טריפות. פ"ת בסי' זה או' ב' וה"ד באיסור קל צריך לשער במדידה אבל באיסור כבד צריך לשער במשקל. ב"ד שם. זב"צ או' ד'.
**** ENGLISH ****
ה) שם. משערינן בsixty etc.  והשיskin לבטל בsixty הוא באומד ומדידה ולא במשקל. שער אfruitם סי' נ"א. עבודת הגרשוני סי' ל' Peri Chadash סי' צ"ט או' ו' פר"ת שם סוף או' ד' Binyamin Zeev שם סוף או' ו' מנ"י על התו"ח כלל פ"ה או' נ"ח וwrote דהמשער ע"י משקל טועה. מט"י בשו"ת שat the end הספר daf ל"ה ע"ג. בית דוד חי"ד סי' מ"ג. שו"ג סי' צ"ט מחו' או' א' ברKnesset Yechezkel סי' צ"ט בשיו"ב או' ב' in name of כמה פו' חכ"א כלל נ"ב או' ג' וwrote דהמתיר ע"י משקל מאכיל טריפות. פ"ת בסי' זה או' ב' וה"ד באיסור קל צריך לשער במדידה אבל באיסור liver צריך לשער במשקל. ב"ד שם. Zivchei Tzedek או' ד'.
**** END BLOCK ****
```

### 42. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 6 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 6
marker: _
**** HEBREW ****
<b>ו) מיהו  </b>אם היה האיסור וההיתר במשקל שוים כגון שהיה האיסור בשר בלא עצמות וההיתר ג"כ בשר בלא עצמות יותר טוב הוא לשער ע"י המשקל שאז יצא השיעור מכוון ביותר. פר"ת שם. וכ"כ בתשו' חנוך בית יהודה סי' ל"ג דאם האיסור וההיתר שוים במשקל דהיינו ממין א' שאין א' כבד בטבעו יותר מחבירו וגם אין בו נפוח או חלל יותר מחבירו פשיטא דנוכל לשער בשניהם או במדידה או במשקל אמנם אם יש בחלק א' חלל יותר מחבירו דאז אם נשער במדידה צריך למעך החלל אז אמרינן השוקל משובח ממנו דשמא לא מיעך החלל יפה ובשני מינים א"א לשער במשקל ואפילו אם יש חלל ע"כ צריך למעך החלל יעו"ש. פ"ת שם. זב"צ או' ד' בן א"ח פ' קרח או' ב'.
**** ENGLISH ****
ו) מיהו  אם היה האיסור וההיתר במשקל שוים כגון שהיה האיסור meat without עצמות וההיתר ג"כ meat without עצמות יותר טוב הוא לשער ע"י המשקל שאז יצא השיskin מכוון ביותר. פר"ת שם. and so too בתשו' חנוך בית יהודה סי' ל"ג דאם האיסור וההיתר שוים במשקל that is ממין א' שאין א' liver בטבעו יותר מחבירו וגם אין בו נפוח או חלל יותר מחבירו פשיטא דנוכל לשער בboth of them או במדידה או במשקל אמנם אם יש בdisagreed א' חלל יותר מחבירו דאז אם נשער במדידה צריך למעך החלל אז אמרינן השוקל משובח ממנו דlest לא מיעך החלל יפה ובשני מינים א"א לשער במשקל ואפילו אם יש חלל until here צריך למעך החלל יעו"ש. פ"ת שם. Zivchei Tzedek או' ד' בן א"ח פ' קרח או' ב'.
**** END BLOCK ****
```

### 43. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 7 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 7
marker: _
**** HEBREW ****
<b>ז) ואם  </b>נפל חלב לתוך בשר או להיפך וכן אם נפל כבד לתוך התבשיל הרי אלו שוים בטבעם ומשערים במשקל. בן א"ח שם.
**** ENGLISH ****
ז) ואם  fell חלב לתוך meat או להיפך וכן אם fell liver לתוך the dish הרי אלו שוים בטבעם ומשערים במשקל. בן א"ח שם.
**** END BLOCK ****
```

### 44. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 8 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=8#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 8
marker: _
**** HEBREW ****
<b>ח) והעצמות  </b>הם כבדים מן הבשר אבל החלב אשר בבשר הוא שוה עם הבשר. שו"ג שם. בן א"ח שם.
**** ENGLISH ****
ח) והעצמות  הם liverים מן הmeat אבל the milk אשר בmeat הוא שוה עם הmeat. שו"ג שם. בן א"ח שם.
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

siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%93
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%94
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%95
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%96
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%90
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%92
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%93
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=_
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%90
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%92
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%93
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%94
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%95
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%96
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%97
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%90
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%92
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%93
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%94
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%95
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%90
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%92
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%90
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%92
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%93
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%94
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%95
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%96
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=%D7%90
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=%D7%92
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=1#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=2#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=3#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=4#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=5#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=6#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=7#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=8#marker=_