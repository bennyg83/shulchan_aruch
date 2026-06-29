# Editorial retranslation — Siman 99

Generated: 2026-06-16T20:05:50.863Z

**Mandatory dictionary:** `C:/Users/binya/Documents/Shulchan aruch/full_dictionary (1).md` — consult for every term.

**Hebrew-verified editorial cleanup.** Batch includes existing English as draft. Hebrew is authoritative. For garbage-tier issues replace EN from Hebrew; for hybrid issues clean existing EN. Edit **only** `**** ENGLISH ****`.

---

# YD001 editorial re-translation (Cursor / agent)

**Authoritative dictionary:** `full_dictionary (1).md` at the **repository root**.  
Consult it for every halachic term, abbreviation, and commentator name.

**Source of truth:** `newtry/YD_001/output/siman_NNN/<commentary>/part-*.txt`.  
**Commentary order:** `translation/COMMENTARIES.md`.

**Core rule:** Hebrew is authoritative. For garbage/API-error blocks (`mt_garbage`, `mt_api_artifact`, `pending_placeholder`, `untranslated_copy`, `literal_bow_swim`), replace English entirely from Hebrew. For salvageable blocks (e.g. `hebrew_in_english`), edit existing English against Hebrew — keep what matches; do not lazy-patch obvious errors while leaving MT poison.

**Sprint worker:** Editorial only — **never** run `_corpus-retranslate-errors.mjs`, LibreTranslate, MyMemory, or Google Translate. See `pipeline/work/AGENT_SPRINT_WORKER.md`.

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

## Blocks in this batch (45 of 118 remaining in scope)

### 1. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `א`

- Quality: **error** — chunk_seam_duplicate, divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: א
**** HEBREW ****
<b>עצמות. </b> כ' הט"ז וז"ל לפי שאינם בני אכילה אינם בכלל האיסור ומ"מ בולעים הם ע"י הבישול ע"כ מצטרפים לבטל האיסור ומו"ח ז"ל הקשה על רמ"א ממ"ש בת"ח דאפי' החרס שבכלי צריך ס' נגדו אם כן גם כאן נימא דהעצמות נ"נ ואני אומר משה אמת ותורתו אמת דעצם זה דומה ממש לכלי מתכות דלא אמרינן ביה חנ"נ משום דיש לו היתר בהגעלה ה"נ בעצם דמבואר בא"ח סי' תנ"א דכלי עצם ניתרים בהגעלה ע"כ לא שייך כאן חנ"נ עכ"ל והר"ן פ' ג"ה כ' דהעצמות הרכות מצטרפים לאיסור מפני מוח שבהן ומחמת רכותן שיצא לחות אבל עצמות יבשים או קליפות של ביצים וכה"ג אף אותן של איסור מצטרפין לבטל האיסור וכן דעת האו"ה וב"ח:
**** ENGLISH ****
bones. The Lord’s Prayer is not the same as the Lord’s Prayer, and the Lord’s Prayer is not the same as the Lord’s Prayer, and the Lord’s Prayer is the same as the Lord’s Prayer It has been moisturized but dry bones or shells of eggs and radars, even the same prohibition prohibits the prohibition and the opinion of the United Nations and the report:
**** END BLOCK ****
```

### 2. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ג
**** HEBREW ****
<b>מחמירים. </b> ומ"מ גם לאיסור אין מצטרפין אבל עצמות ההיתר מצטרפין להיתר. ש"ך:
**** ENGLISH ****
is stringentים.  וnevertheless גם לאיסור אין מצטרפין אבל עצמות ההיתר מצטרפין להיתר. ש"ך:
**** END BLOCK ****
```

### 3. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 3 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 3
marker: _
**** HEBREW ****
<b>הבלועה. </b> פירוש חתיכה הבלוע מאיסור שנפלה להיתר ואין בהיתר ששים לבטל האיסור אלא בצירוף החתיכה מצטרפין גם החתיכה לבטל מיהו החתיכה עצמה אסורה כמ"ש המחבר בר"ס ק"ו אבל אין נוהגין כן לדידן אלא צריך ס' נגד כל החתיכה ואפ"ה החתיכה עצמה אסורה:
**** ENGLISH ****
הabsorbedה.  Explanation: חתיכה הabsorbed מאיסור שfellה להיתר ואין in heter sixty לבטל האיסור אלא בbrothוף החתיכה מצטרפין גם החתיכה לבטל מיהו החתיכה עצמה forbiddenה כwhat he wrote Mechaber בר"ס ק"ו אבל אין נוהגין כן for us אלא צריך sixty נגד כל החתיכה וeven so החתיכה עצמה forbiddenה:
**** END BLOCK ****
```

### 4. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 4 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 4
marker: א
**** HEBREW ****
<b>ונתמעט. </b> כתב מהרש"ל נראה אפילו היכא שראינו שנפל האיסור ולא נתמעט בשיעור א' עם ההיתר אפ"ה אין לשער במה דבלעה הקדרה כי אין לעמוד על שורש הדבר ולא ידע כמה בלעה הקדרה וכמה פעמים יבא קלקול מזה אלא לעולם משערין כמו שבא לפנינו וכתב הט"ז לפי זה אין להורות היתר במ"ש הש"ע בסעיף זה ומשערין באומד יפה וכו':
**** ENGLISH ****
ונתמעט.  wrote Maharshal it appears אפילו היכא שראינו שfell האיסור ולא נתמעט בשיskin א' עם ההיתר even so אין לשער במה דabsorbedה הpot כי אין לעמוד על שורש הדבר ולא ידע כמה absorbedה הpot וכמה פעמים יבא קלקול מזה אלא לעולם משערין כמו שבא לפנינו וwrote Taz לפי זה אין להורות היתר בwhat he wrote הש"ע בseif זה ומשערין באומד יפה etc.:
**** END BLOCK ****
```

### 5. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: א
**** HEBREW ****
<b>לכתחלה. </b> כ' הש"ך דיש אומרים דאסור לבטלו מדאורייתא מיהו בדיעבד לכ"ע דינו כמ"ש המחבר אחר כך עכ"ל וכתב בט"ז דבסימן פ"ד סי"ג מבואר דאם אין כוונתו רק לדבר אחר כגון לתקן הדבש מותר ובסימן קל"ז ס"ב כתבתי דהיינו דוקא באם א"א בענין אחר:
**** ENGLISH ****
לat first.  wrote Shach דיש אומרים דforbidden לבטלו מd'oraisa מיהו b'dieved לכ"ע דינו כwhat he wrote Mechaber אחר כך end of his words וwrote בט"ז דבsiman פ"ד סי"ג explained דאם אין כוונתו רק לדבר אחר כגון לתקן הhoney permitted ובsiman קל"ז ס"ב I wrote that is specifically באם א"א בענין אחר:
**** END BLOCK ****
```

### 6. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: ב
**** HEBREW ****
<b>עבר. </b> פי' שזרק איסור מועט לתוך היתר מרובה שיש ס' נגדו או שנפל מעצמו לאין ס' בהיתר אלא שריבה אח"כ:
**** ENGLISH ****
he transgressed.  פי' שזרק איסור מועט לתוך היתר מרובה שיש sixty נגדו or thatfell מעצמו לאין sixty in heter אלא שריבה afterward:
**** END BLOCK ****
```

### 7. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: ג
**** HEBREW ****
<b>בשבילו. </b> דאי שרית למי שנתבטל בשבילו חיישינן דלמא אתי למימר לעובד כוכבים או לעבד שיבטלנו הלכך קנסינן ליה אבל אם לא היה שלו וגם לא נתכוון לבטל בשביל עצמו שרי לדידיה דלא אהני מעשיו הרעים ב"י וכתב רש"ל ודוקא שידע זה שנתבטל עבורו ניחא ליה אפילו לא צוה אותו לבטלו אבל אם לא ידע ממנו שרי ליה דהרי הוא כשוגג ובמקום דאסור לו אסור גם לבני ביתו וכתב הט"ז דאם טעה בדין וסבר שמותר לבטל האיסור מקרי שוגג וראיה משבת פ' כלל גדול במתני' דאם שכח שיש איסור מלאכה בזה אף על גב שיודע שהיום שבת מקרי שוגג ה"נ דכוותיה וכן איתא מפורש בתוספות בבכורות דף כ"ג ד"ה סבר וכו':
**** ENGLISH ****
בשבילו.  דאי שרית למי שנתבטל בשבילו we are concerned דלמא אתי למימר לnon-Jew או לעבד שיבטלנו הלכך קנסינן ליה אבל אם לא היה שלו וגם לא נתכוון לבטל בשביל עצמו שרי for him דלא אהני מעשיו הרעים ben yomo וwrote Rashal investigateא שידע זה שנתבטל עבורו ניחא ליה אפילו לא צוה אותו לבטלו אבל אם לא ידע ממנו שרי ליה דהרי הוא כשוגג ובמקום דforbidden לו forbidden גם לבני ביתו וwrote Taz דאם טעה בדין וסבר שpermitted לבטל האיסור מקרי שוגג וproof משבת פ' כלל גדול במתני' דאם שכח שיש איסור מלאכה בזה even על גב שיודע שtoday שבת מקרי שוגג ה"נ דכוותיה וכן איתא מפורש בתוספות בבכורות daf כ"ג s.v. סבר etc.:
**** END BLOCK ****
```

### 8. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `ה`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: ה
**** HEBREW ****
<b>נבלה. </b> כ' הש"ך לכאורה קשיא מה ענין זה לחנ"נ דאפי' למ"ד דלא אמרי' חנ"נ בשאר איסורי' מ"מ חתיכה שבלעה איסור ונתוסף עליה היתר אח"כ החתיכה עצמה נשארה באיסור' כמ"ש כל הפוסקים ר"ס ק"י שהאיסור שבה אינו נפלט לגמרי אלא הרב אתי לאשמועינן דחתיכה שבלעה איסור ונתוסף אח"כ היתר אפי' התוספת אסור כי ליכא ס' נגד כל החתיכה אבל אם ריבה עליו בשוגג נגד כל מה שנ"נ אפילו בבב"ח בלח בלח הכל מותר אבל בחתיכה שבלעה איסור אפילו ריבה עליו ס' נגד כל החתיכה נשארה החתיכה עצמה באיסורה וכ' עוד דמדברי הר"ב משמע דאפילו בבב"ח לא אמרינן חנ"נ בלח בלח והוא חולק עליו ע"ש שהניח דברי רמ"א בצ"ע:
**** ENGLISH ****
Damned. The Lord’s Prayer, which is in the presence of the Lord’s Prayer, is in the presence of the Lord’s Prayer, and that it is not in the midst of Hashem’s presence, but that it is not in the presence of Hashem’s judgment He said, “The Lord’s Prayer is not the same as the Lord’s Prayer, and he will be given to him.”
**** END BLOCK ****
```

### 9. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `ו`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: ו
**** HEBREW ****
<b>נהגו. </b> כתב הט"ז הטעם דאין לנו לחוש שמא נתוסף אחר שנעשה נבלה דאחזוקי איסורא לא מחזקינן אמנם אם ידוע להמורה שנתוסף אלא שאין ידוע אימתי בזה ודאי יש לחקור אחר זה אימתי נתוסף כנ"ל להלכה עכ"ל וכתב בש"ך אפי' למ"ד דלח בלח נ"נ וכן חתיכה שבלעה איסור לכ"ע בכולהו לא נהגו לחקור דלא מחזקינן איסורא אך מ"ש הרב לחלק בין נודע התערובת או לא ואפי' בחנ"נ יש חילוק זה חולק עליו הש"ך שהרי למ"ד חנ"נ א"כ תיכף כשלא היה ס' נתן טעם ומה לי אם נודע או לא והכי מוכח נמי מסימן צ"ב גבי תחב כף חולבת בקדרה של בשר ב' פעמים ולא נודע בנתים דצריך ב"פ ס' מטעם דבפעם הא' נעשה כל הכף נבלה וכן כמה שאר ראיות ע"ש:
**** ENGLISH ****
they practiced.  wrote Taz the taste דאין לנו לחוש lest נתוסף אחר שנעשה נבלה דאחזוקי איסורא לא we establish אמנם אם ידוע להteacher שנתוסף אלא שאין ידוע אימתי בזה certainly יש לחקור אחר זה אימתי נתוסף כit appears to me לthe halachah end of his words וwrote בש"ך even למ"ד דלח בלח נ"נ וכן חתיכה שabsorbedה איסור לכ"ע בכולהו לא they practiced לחקור דלא we establish איסורא אך what he wrote הרב לdisagreed בין נודע התערובת או לא וeven בchein nafsho יש חילוק זה disagrees עליו Shach שהרי למ"ד chein nafsho if so תיspoon כשלא היה sixty נתן טעם ומה לי אם נודע או לא והכי proven נמי מsiman one must examine גבי stuck in spoon חולבת בpot של meat ב' פעמים ולא נודע בנתים דצריך ב"פ sixty for the reason דבפעם הא' נעשה כל הspoon נבלה וכן כמה שאר ראיות see there:
**** END BLOCK ****
```

### 10. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 6 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 6
marker: א
**** HEBREW ****
<b>מרבה. </b> הקשה הש"ך דבא"ח סי' תרע"ז כתב המחבר דמותר השמן שבנר חנוכה שנתערב בשמן אחר ואין בו ס' לבטל יש מי שאומר שאין להוסיף עליו לבטלו עכ"ל והרי נר חנוכה אינו אלא מדרבנן ודוחק לחלק דהתם כיון דהוקצה למצותו חמיר טפי וצ"ע עכ"ל. <small>(והמ"א רוצה לתרץ שם דחנוכה הוי דבר שיש לו מתירין לשנה הבאה ולא אוכל להבין דבריו דא"כ אפילו באלף לא בטיל ולמה כ' המחבר שם ואין בו ס' לבטלו)</small>:
**** ENGLISH ****
מרבה.  challenged Shach דOrach Chaim סי' תרע"ז wrote Mechaber דpermitted השמן שבנר חנוכה שנתערב בשמן אחר ואין בו sixty לבטל יש מי שאומר שאין להוסיף עליו לבטלו end of his words והרי נר חנוכה אינו אלא d'rabbanan וforced לdisagreed דהתם כיון דהוקצה למצותו חמיר טפי וrequires study end of his words. (והמ"א רוצה לתרץ שם דחנוכה הוי דבר שיש לו מתירין לשנה הבאה ולא אוכל להבין דבריו דif so אפילו באלף לא nullified ולמה wrote Mechaber שם ואין בו sixty לבטלו)}:
**** END BLOCK ****
```

### 11. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 6 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 6
marker: ב
**** HEBREW ****
<b>לשנות. </b> כתב הט"ז ול"ד לעצים שנשרו מן הדקל בי"ט לתוך התנור שמרבה עליהם עצים מוכנים ומבטלן דהתם מקלי קלי לאיסורא ואינו נהנה מהם עד שעת ביעורן מן העולם ואז אין ממש באיסור וכ' מהרש"ל דהא דאמרינן התם טעמא דמקלי קלי הוא דוקא משום דהוי דשיל"מ אבל בדשאל"מ בכל איסורי דרבנן מרבה ומבטלן ע"כ פסק דבדיעבד אפילו כוון לבטלם ולא ידע שאסור לעשות כן שרי ע"כ ואני הוכחתי לעיל דאם לא ידע שיש איסור בדבר שרי בכל הביטולים עכ"ל:
**** ENGLISH ****
לשנות.  wrote Taz וsome say לעצים שנשרו מן הדקל בי"ט לתוך הoven שמרבה עליהם עצים מוכנים ומבטלן דהתם מקלי קלי לאיסורא ואינו נהנה מהם עד שעת ביskinן מן העולם ואז אין ממש באיסור וwrote Maharshal דהא דאמרינן התם טעמא דמקלי קלי הוא specifically becauseהוי דשיל"מ אבל בדשאל"מ בכל איסורי d'rabbanan מרבה ומבטלן until here ruled דb'dieved אפילו כוון לבטלם ולא ידע שforbidden לעשות כן שרי until here ואני הוכחתי above דאם לא ידע שיש איסור בדבר שרי בכל הביטולים end of his words:
**** END BLOCK ****
```

### 12. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 6 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 6
marker: ג
**** HEBREW ****
<b>יבש. </b> והש"ך כתב דנ"ל להתיר בהפסד מרובה אם הוא יבש ביבש ומין במינו ונודע בינתים ע"ש שמביא כמה ראיות לדבריו וכל זה אם יש להם טעם א' אבל ב' איסורים שחלוקים בטעמם אז כל א' מבטל את חבירו ע"ל סי' צ"ח וכ' הט"ז ול"ד לתחיבת כף ב' פעמים בסי' צ"ד דהכא איכא איסור חדש:
**** ENGLISH ****
יבש.  וShach wrote דit appears to me להתיר בgreat loss אם הוא יבש ביבש וspecies in its species ונודע בינתים see there שמביא כמה ראיות לדבריו וכל זה אם יש להם טעם א' אבל ב' איסורים שחלוקים בטעמם אז כל א' מבטל את חבירו ע"ל siman 98 וwrote Taz וsome say לתחיבת spoon ב' פעמים בsiman 94 דהכא there is איסור חדש:
**** END BLOCK ****
```

### 13. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 6 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 6
marker: ד
**** HEBREW ****
<b>בבשר. </b> כתב הש"ך וא"ל פשיטא דהא כל איסור בטל בששים יש לפרש משום דבסימן רצ"ט יתבאר דגבי היתר בהיתר לא שייך ביטול קמ"ל דהכא לא אמרינן כן עיין שם ובת"ח כתב דאפילו לכתחלה מותר ליתן המים בקדרה של בשר כיון דכבר נתבטל:
**** ENGLISH ****
בmeat.  wrote Shach וand some say פשיטא דהא כל איסור בטל בsixty יש לפרש becauseבsiman רצ"ט יתבאר דגבי היתר in heter לא שייך ביטול it teaches us דהכא לא אמרינן כן עיין שם וTurei Chayim wrote דאפילו לat first permitted ליתן the water בpot של meat כיון דכבר נתבטל:
**** END BLOCK ****
```

### 14. `siman_099/baer-heitev/part-001.txt` — baer-heitev — seif 7 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 7
marker: _
**** HEBREW ****
<b>להשתמש. </b> והט"ז חולק על דין זה ומביא כמה ראיות דלא אמרינן כן אלא במקום שהוא פוגם גם כן ופסק כן הב"ח והלבוש ע"ש ועיין בסימן קכ"ב ס"ה:
**** ENGLISH ****
להשתמש.  וTaz disagrees על דין זה ומביא כמה ראיות דלא אמרינן כן אלא במקום שהוא spoils גם כן וruled כן Bach והלבוש see there ועיין בsiman קכ"ב seif 5:
**** END BLOCK ****
```

### 15. `siman_099/beer-hagolah/part-001.txt` — beer-hagolah — seif 1 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 1
marker: א
**** HEBREW ****
טור בשם רבי' שמשון ושכן הסכים הרא"ש וכ"כ הרשב"א מהירושלמי פ"ק דערלה:
**** ENGLISH ****
The Lord’s Prayer, and the Holy Spirit, and the Lord’s Prayer, and the Lord’s Prayer:
**** END BLOCK ****
```

### 16. `siman_099/beer-hagolah/part-001.txt` — beer-hagolah — seif 1 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 1
marker: ב
**** HEBREW ****
שם וכן כתב הרשב"א וכ"כ הר"ן דהיינו טעמא דלא מצטרפי עצמות שבזרוע להתיר חולין דף צ"ח:
**** ENGLISH ****
There, and so on, the Bible says, “The Lord’s Prayer is not in the hands of the Lord.”
**** END BLOCK ****
```

### 17. `siman_099/beer-hagolah/part-001.txt` — beer-hagolah — seif 3 — marker `_`

- Quality: **error** — mt_garbage, html_entity_leak
- Checkpoint id: `siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 3
marker: _
**** HEBREW ****
הרשב"א בתשובה שאל' סי' תצ"ד וכר' אפרים:
**** ENGLISH ****
Hashem's Word says, &quot;Arise, shine
**** END BLOCK ****
```

### 18. `siman_099/beer-hagolah/part-001.txt` — beer-hagolah — seif 4 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 4
marker: א
**** HEBREW ****
מימרא דרבי חנינא שם דף צ"ז וכלישנא קמא לחומרא כפירש"י וכ"כ הרא"ש שם וש"פ:
**** ENGLISH ****
It is the name of the Lord’s Prayer, and the Lord’s Prayer, and the Word of Hashem’s Word, and Hashem’s Word, and Hashem’s Word
**** END BLOCK ****
```

### 19. `siman_099/beer-hagolah/part-001.txt` — beer-hagolah — seif 4 — marker `ב`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 4
marker: ב
**** HEBREW ****
רשב"א בת"ה וכתב משום דמין בשאינו מינו קי"ל דכזית בכדי אכילת פרס דאורייתא ואפשר דאפילו עד ששים למ"ד טעם כעיקר דאורייתא כר"ח והעומדים בשיטתו:
**** ENGLISH ****
Hashem’s Word tells us that Hashem’s Word is not the same as Hashem’s Word, and it is not the same as Hashem’s Word, and that it is not possible to do it, and that it is not possible to do it
**** END BLOCK ****
```

### 20. `siman_099/beer-hagolah/part-001.txt` — beer-hagolah — seif 4 — marker `ג`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 4
marker: ג
**** HEBREW ****
שם וכהרמב"ם בפט"ו מהמ"א:
**** ENGLISH ****
It is the name of Hashem’s Word:
**** END BLOCK ****
```

### 21. `siman_099/beer-hagolah/part-001.txt` — beer-hagolah — seif 5 — marker `ג`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 5
marker: ג
**** HEBREW ****
טור בשם הרמב"ם בפט"ו מהמ"א מדין המבשל בשבת כמו שציינתי בטור א"ח סי' שי"ח (והרשב"א בשם רמב"ם וראב"ד):
**** ENGLISH ****
The psalmist said, “The Lord’s Prayer is the same as the Lord’s Prayer.”
**** END BLOCK ****
```

### 22. `siman_099/beer-hagolah/part-001.txt` — beer-hagolah — seif 6 — marker `א`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=6#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 6
marker: א
**** HEBREW ****
טור בשם הרשב"א (וע"פ הובא בב"י):
**** ENGLISH ****
A column in the name of the Holy Qur’an:
**** END BLOCK ****
```

### 23. `siman_099/beer-hagolah/part-001.txt` — beer-hagolah — seif 7 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 7
marker: _
**** HEBREW ****
ריב"ש סי' שמ"ט בשם הראב"ד וכדברים האלו כתב הטור בסי' קכ"ב בשם הרשב"א וכתבם המחבר גם כן שם:
**** ENGLISH ****
Hashem’s Word tells us that Hashem’s Word is the same as Hashem’s Word and His Word is written:
**** END BLOCK ****
```

### 24. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: א
**** HEBREW ****
<b>חתיכת כו' </b>ירושלמי פ"ה דתרומות אין תנופת תרומה מצטרפות עם התרומה לאסור על החולין אבל תנופת חולין מצטרפות עם החולין להעלות התרומה ובפ"א דערלה ופ"ו דנזיר ר' אבהו בשם ר' יוחנן כל האיסורין משערין אותן כאלו הן בצל וקפליט מאי כדון ההן אמר נ"ט א' במאה וההן אמר נ"ט א' בששים מ"ד בששים אין את עושה את הזרוע א' מק' לאיל מ"ד בק' את עושה את הזרוע א' מק' לאיל מ"ר בק' את מוציא את העצמות מן הזרוע ומ"ד בס' אין את מוציא את העצמות מן הזרוע. וכשם שאת מוציא את העצמות מן הזרוע כך את מוציא מן האיל לית את יכול דתני אין תנופת תרומה מצטרפת עם התרומה לאסור על החולין אבל תנופת חולין מצטרפות עם החולין להעלות את התרומה רב ביבי בעי תנופת תרומה מהו שמצטרף עם החולין להעלות את התרומה מן מה דא"ר הונא קליפי איסור מצטרפין להיתר הדא אמרה תנופת תרומה מצטרפות עם החולין להעלות את התרומה ובפ"י דתרומות ביצה בס' א"ר חנינא הירק והקליפה מצטרפין א"ר זעירא ואיסורו מתוכו ר"ל דאין משערין אלא באוכל שבביצה רב הונא אמר קליפי איסור מעלין את ההיתר וירושלמי דלעיל פליגא אהך דשם אמר למ"ד בס' עצמות הזרוע מצטרפין לאיסור וכ"ש שאין מצטרפין להיתר וסוגיא דפ' ג"ה צ"ח ב' פליגא יותר דלמ"ד במאה אף קליפי היתר אין מצטרפין להיתר דאמר בשר בהדי כו' וכס"ד דירושלמי הנ"ל וכשם שאת מוצא כו' אלא די"ל דלאו דוקא ואיידי דנקט בשר בזרוע נקט נמי בשר באיל מיהא שמעינן דלכל הסוגיות עצמות ההיתר מצטרפין להיתר וכ"ש למ"ד בס' כמ"ש בגמ' בשר ועצמות בהדי כו' אלא דלמ"ד בס' בין לסוגיא דגמ' בין לסוגיא דירושלמי הנ"ל עצמות האיסור מצטרפין לאיסור וכ"ש שאין מצטרפין להיתר ולכאורה פליגא אההיא דפ"י דתרומות כנ"ל וכתב הר"ן דשאני עצמות שבזרוע דמצטרפות לאיסור מפני המוח שבתוכן ומחמת רכותן שיוצא מהן ליחה אבל עצמות יבשין הוי כמו קליפין דפ"י דתרומות דלא עדיף מג"ה למ"ד אין בגידין בנ"ט דאין אוסר וכמ"ש בפי"א דתרומות עצמות הקדשים בזמן כו' ר' אבהו בשם ר"י בראשי הכנפים והסחוסין היא מתני' וכן בגמ' דפסחים פ"ג א' ה"ד אילימא דלית בהו מוח כו' ובהא פליגי דלמ"ד בק' אפי' אותן שיש בהן מוח אין מצטרפין לאיסור וקי"ל כמ"ד בס' וז"ש בירושלמי הנ"ל וכשם שאת כו' לית את יכול דתני אין ולכאורה ההיא ברייתא תיובתא אמ"ד בס' ולא היא דאף מ"ד בס' מודה בתנופת וקליפין אלא דלמ"ד בק' אף אותן שיש בהן מוח הוי כתנופת וז"ש לית כו' וז"ש בש"ע אבל המוח כו' ועש"ך דה"ה עצמות דכין וכנ"ל מירושלמי הנ"ל בראשי הכנפים כו':
**** ENGLISH ****
חתיכת etc. ירושלמי פ"ה דתרומות אין תנופת תרומה מצטרפות עם התרומה לforbidden על החולין אבל תנופת חולין מצטרפות עם החולין להcame upת התרומה ובone time דערלה וchapter 6 דנזיר ר' אבהו in name of ר' יוחנן כל האיסורין משערין אותן as if הן בצל וקפליט מאי כדון ההן אמר נ"ט א' במאה וההן אמר נ"ט א' בsixty מ"ד בsixty אין את עושה את הזרוע א' מק' לאיל מ"ד בק' את עושה את הזרוע א' מק' לאיל מ"ר בק' את מוציא את העצמות מן הזרוע ומ"ד בsixty אין את מוציא את העצמות מן הזרוע. וכשם שאת מוציא את העצמות מן הזרוע כך את מוציא מן האיל לית את יכול דתני אין תנופת תרומה מצטרפת עם התרומה לforbidden על החולין אבל תנופת חולין מצטרפות עם החולין להcame upת את התרומה רב ביבי בעי תנופת תרומה מהו שמצטרף עם החולין להcame upת את התרומה מן מה דא"ר הונא קליפי איסור מצטרפין להיתר הדא אמרה תנופת תרומה מצטרפות עם החולין להcame upת את התרומה ובפ"י דתרומות egg בsixty א"ר חנינא הירק והshell מצטרפין א"ר זעירא ואיסורו מתetc. ר"ל דאין משערין אלא באוכל שבegg רב הונא אמר קליפי איסור מעלין את ההיתר וירושלמי דabove פליגא אהך דשם אמר למ"ד בsixty עצמות הזרוע מצטרפין לאיסור וkli sheni שאין מצטרפין להיתר וסוגיא דפ' ג"ה צ"ח ב' פליגא יותר דלמ"ד במאה even קליפי היתר אין מצטרפין להיתר דאמר meat בהדי etc. וכס"ד דירושלמי הit appears to me וכשם שאת מוצא etc. אלא די"ל דלאו specifically ואיידי דנקט meat בזרוע נקט נמי meat באיל מיהא שinnardsנן דלכל הסוגיות עצמות ההיתר מצטרפין להיתר וkli sheni למ"ד בsixty כwhat he wrote בגמ' meat ועצמות בהדי etc. אלא דלמ"ד בsixty בין לסוגיא דגמ' בין לסוגיא דירושלמי הit appears to me עצמות האיסור מצטרפין לאיסור וkli sheni שאין מצטרפין להיתר וit appears פליגא אההיא דפ"י דתרומות כit appears to me וwrote Ran דthis case is different עצמות שבזרוע דמצטרפות לאיסור מפני המוח שבתוכן ומחמת רכותן שיוצא מהן ליחה אבל עצמות יבשין הוי כמו קליפין דפ"י דתרומות דלא עדיף מג"ה למ"ד אין בגידין בנ"ט דאין אוסר וכwhat he wrote בפי"א דתרומות עצמות הקדשים בtime etc. ר' אבהו in name of ר"י בראשי הכנפים והסחוסין היא מתני' וכן בגמ' דפסחים פ"ג א' ה"ד אילימא דלית בהו מוח etc. ובהא פליגי דלמ"ד בק' even אותן שיש בהן מוח אין מצטרפין לאיסור וwe establish כמ"ד בsixty וז"ש בירושלמי הit appears to me וכשם שאת etc. לית את יכול דתני אין וit appears ההיא ברייתא תיובתא אמ"ד בsixty ולא היא דeven מ"ד בsixty מודה בתנופת וקליפין אלא דלמ"ד בק' even אותן שיש בהן מוח הוי כתנופת וז"ש לית etc. וז"ש בש"ע אבל המוח etc. ועש"ך דה"ה עצמות דכין וכit appears to me מירושלמי הit appears to me בראשי הכנפים etc.:
**** END BLOCK ****
```

### 25. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ב
**** HEBREW ****
<b>וגוף הקדירה כו'. </b>פ' ג"ה צ"ז ב' אר"ח כשהן משערין כו' וקי"ל דלא כלישנא קמא כמ"ש רש"י וכ"ש לפי' הרשב"א כמ"ש בס"ד ע"ש:
**** ENGLISH ****
And the body of the quarry is. Hashem’s Word says, “The Lord’s Prayer is the same as the Lord’s Prayer, and the Lord’s Prayer is the same as the Lord’s Prayer.”
**** END BLOCK ****
```

### 26. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ג
**** HEBREW ****
<b>ויש מחמירין כו'. </b>כ"כ הרא"ש בפ' ג"ה דמתוך הברייתא אין תנופת כו' משמע לא לאיסור ולא להיתר ועוד דקאמר אבל תנופת של חולין כו' משמע אבל דתרומה לא וכן משמע לכאורה מירושלמי הנ"ל דקאמר מ"ד בק' את מוציא כו' משמע דאין מצטרף לא לאיסור ולא להיתר ועדיין לא ידענו מפשיטותא דבעיא דרב ביבי ולא פריך שם אלא על עצמות האיל וכשם כו' ונמצא ששיער ק' בלא עצם הזרוע וא"כ אף למסקנא ע"כ אין מצטרף. אבל י"ל דקס"ד כן אבל למסקנא ק' הוא עם העצם וז"ש כי כן עיקר:
**** ENGLISH ****
ויש are stringent etc.. כ"כ Rosh בפ' ג"ה דמתוך הברייתא אין תנופת etc. it appears לא לאיסור ולא להיתר ועוד דקאמר אבל תנופת של חולין etc. it appears אבל דתרומה לא וכן it appears it appears מירושלמי הit appears to me דקאמר מ"ד בק' את מוציא etc. it appears דאין מצטרף לא לאיסור ולא להיתר ועדיין לא ידענו מפשיטותא דבעיא דרב ביבי ולא fruitך שם אלא על עצמות האיל וכשם etc. וis found ששיער ק' without עצם הזרוע וif so even למסקנא until here אין מצטרף. אבל י"ל דקס"ד כן אבל למסקנא ק' הוא עם העצם וז"ש כי כן עיקר:
**** END BLOCK ****
```

### 27. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: _
**** HEBREW ****
<b>בד"א כו' </b>דלא גרע מקדירה דאמרינן בפ' ד"ח (צ"ו ב') ובפ' ג"ה ובפ' כ"ה קדירה שבשל כו' בנ"ט:
**** ENGLISH ****
בד"א כו' דלא גרע מקדירה דאמרינן בפ' ד"ח (צ"ו ב') ובפ' ג"ה ובפ' כ"ה קדירה שבשל כו' בנ"ט:. — see there.
**** END BLOCK ****
```

### 28. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: _
**** HEBREW ****
<b>ומשערין ההיתר כו'. </b>וה"מ כו'. ערש"י שם ד"ה במאי כו' ועיקר הדבר כו' ור"ל אם לא ראינו האיסור בשעת נפילתו ור' חנינא מיירי שראינו האיסור בשעת נפילתו והוא עכשיו כמו שהיה ולא נצטמק וההיתר נצטמק. וכתב הרשב"א ומשמע מדבריו דבכה"ג אף מה שכלה ואבד מחמת האור ג"כ מצטרף ול"נ דמה לנו מה שהיה בתחילה עכשיו נתמעט וחוזר האיסור ואוסר וכמ"ש <small>(שם) </small>וכחל עצמו אסור דאי נפל כו' וכ"מ מדברי הרמב"ם שכתב במה שבלעה הקדירה ועומד בדופני כו' ומשערין כו' כמ"ש בש"ע. וראיה ממ"ש בספ"ה דתרומות כשם שפחתו החולין כך כו' משמע הא לא פיחתה התרומה אסור וכתב עוד די"מ דלישנא קמא בקדירה עצמה ר"ל במה שהוא עכשיו בקדירה ולא במה שבלע הקדירה ולישנא בתרא אף במה שבלעה ופסקו כלישנא בתרא דמר בר רב אשי צ"ח א' ס"ל כוותיה ולא הקשו עליו אלא אטו כו' ובלא ידעינן שיעור האיסור כנ"ל וכ' ומסתברא דוקא מין במינו אבל מין בשא"מ הלכה כלישנא קמא לחומרא דספיקא דאורייתא היא וצ"ל דס"ל חלב ובשר הוי מין במינו לכך היקל מר בר רב אשי וע"ל סי' צ"ח ס"א מש"ש [והנה דעת הרמב"ם ורש"י כלישנא בתרא דבלע קדירה אלא דלרש"י אם לא ראינוהו בנפילה משערינן כמות שהוא בלא קדירה וכן ס"ל לרשב"א במין במינו וכמ"ש אטו דאיסורא כו' וכמש"ש דהלכה כלישנא בתרא דמר בר רב אשי כו' ולא הקשו כו' אלא דבמין בשא"מ פ' כלישנא קמא וכי"מ ור"ל אפילו ראינוהו בעת נפילה ולא נצטמק וזהו החילוק בין לישנא קמא ללישנא בתרא וכ"ה בטור ומשערין ההיתר כו' שגם באיסור כו' והרשב"א כו'. ודברי ש"ע אינן מדוקדקין שהתחיל בלשון הטור וסיים וה"מ מין בשא"מ כו']:
**** ENGLISH ****
ומשערין ההיתר etc.. וה"מ etc.. ערש"י שם s.v. במאי etc. ועיקר הדבר etc. ור"ל אם לא ראינו האיסור בשעת נפילתו ור' חנינא deals with שראינו האיסור בשעת נפילתו והוא now כמו שהיה ולא נצטמק וההיתר נצטמק. וwrote Rashba וit appears מדבריו דבsuch a case even מה שכלה ואבד מחמת האור ג"כ מצטרף ול"נ דמה לנו מה שהיה בfirst now נתמעט וחוזר האיסור ואוסר וכwhat he wrote (שם) }וudder עצמו forbidden דאי fell etc. וכ"מ מדברי Rambam שwrote במה שabsorbedה הקדירה ועומד בדופני etc. ומשערין etc. כwhat he wrote בש"ע. וproof מwhat he wrote בספ"ה דתרומות כשם שפחתו החולין כך etc. it appears הא לא פיחתה התרומה forbidden וwrote עוד די"מ דלישנא קמא בקדירה עצמה ר"ל במה שהוא now בקדירה ולא במה שabsorbed הקדירה ולישנא בתרא even במה שabsorbedה וruledו כלישנא בתרא דמר בר רב אשי צ"ח א' ס"ל כוותיה ולא הקשו עליו אלא אטו etc. וwithout ידעינן שיskin האיסור כit appears to me וwrote ומסתברא specifically species in its species אבל מין בשא"מ the halachah כלישנא קמא לstringency דספיקא d'oraisa היא וone must say דס"ל חלב וmeat הוי species in its species לכך היקל מר בר רב אשי וע"ל siman 98 ס"א מש"ש [והנה דעת Rambam ורש"י כלישנא בתרא דabsorbed קדירה אלא דלרש"י אם לא ראינוהו בנפילה משערינן כמות שהוא without קדירה וכן ס"ל according to Rashba בspecies in its species וכwhat he wrote אטו דאיסורא etc. וכמש"ש דthe halachah כלישנא בתרא דמר בר רב אשי etc. ולא הקשו etc. אלא דבמין בשא"מ פ' כלישנא קמא וכי"מ ור"ל אפילו ראינוהו בעת נפילה ולא נצטמק וזהו החילוק בין לישנא קמא ללישנא בתרא וכ"ה בטור ומשערין ההיתר etc. שגם באיסור etc. וRashba etc.. ודברי ש"ע אינן מדוקדקין שהתחיל בlanguage of Tur וסיים וה"מ מין בשא"מ etc.]:
**** END BLOCK ****
```

### 29. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: א
**** HEBREW ****
<b>ואפילו נפל כו'. </b>מתני' ספ"ה דתרומות ואח"כ נפל שם חולין כו' וירושלמי שם ר' אבהו בשם ר' יוחנן כל האיסורין שריבה עליהן שוגג מותרין מזיד אסורין ולא מתני' היא שוגג מותר מזיד אסור מתני' בתרומה אתא מימר לך אפילו שאר כל הדברים:
**** ENGLISH ****
ואפילו fell etc.. מתני' ספ"ה דתרומות וafterward fell שם חולין etc. וירושלמי שם ר' אבהו in name of ר' יוחנן כל האיסורין שריבה עליהן שוגג permittedין מזיד forbiddenין ולא מתני' היא שוגג permitted מזיד forbidden מתני' בתרומה אתא מימר לך אפילו שאר כל הדברים:
**** END BLOCK ****
```

### 30. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ב`

- Quality: **error** — hebrew_in_english, untranslated_copy
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ב
**** HEBREW ****
<b>עבר כו'. </b>מתני' וירושלמי הנ"ל וגמ' דגטין נ"ד ב' וכר' יוסי דהלכה כמותו מחבריו כמ"ש בפ"ד דעירובין <small>(מ"ו ב'):</small>
**** ENGLISH ****
עבר כו'. מתני' וירושלמי הנ"ל וגמ' דגטין נ"ד ב' וכר' יוסי דהלכה כמותו מחבריו כמ"ש בפ"ד דעירובין (מ"ו ב'):
**** END BLOCK ****
```

### 31. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ג`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ג
**** HEBREW ****
<b>למבטל כו'. </b>כמו מבשל בשבת לר"י דקי"ל כוותיהו שניהם משום קנסא כמ"ש בגטין שם נ"ג ורמי דר"י אדר"י דתניא המבשל כו' כי לא קניס כו' ושם ורמי דר"י אדר"י בדרבנן כו':
**** ENGLISH ****
To the unemployed as well. As a result of the day of the Lord’s Prayer, both of them were called “Abraham” in the Quran, “And Mary Dr.”
**** END BLOCK ****
```

### 32. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ד`

- Quality: **error** — hebrew_in_english, untranslated_copy, marker_label_mismatch
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ד
**** HEBREW ****
<b>וכן למי כו'. </b>כמ"ש בפ"ג די"מ <small>(כ"ה א') </small>הבא בשביל ישראל זה כו' ובב"מ צ' ב' שלח להו הערמה כו' פשיטא בנו גדול כו':
**** ENGLISH ****
וכן למי כו'. כמ"ש בפ"ג די"מ (כ"ה א') הבא בשביל ישראל זה כו' ובב"מ צ' ב' שלח להו הערמה כו' פשיטא בנו גדול כו':
**** END BLOCK ****
```

### 33. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ה
**** HEBREW ****
<b>ואסורים למכרו כו'. </b>כמו דס"ד שם ימכרו לשחיטה ואף למסקנא שם משום דבלא"ה היה יכול ליהנות ממנו וערש"י שם ד"ה דיין כו' משא"כ כאן וכמ"ש בספ"מ דשביעית ימכרו לאוכליהן ודמיהן כו':
**** ENGLISH ****
וforbiddenים למכרו etc.. כמו דס"ד שם ימכרו לshechitah וeven למסקנא שם becausewithout"ה היה יכול ליהנות ממנו וערש"י שם s.v. דיין etc. משif so כאן וכwhat he wrote בספ"מ דשביעית ימכרו לאוכליהן ודמיהן etc.:
**** END BLOCK ****
```

### 34. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ו`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ו
**** HEBREW ****
<b>ודוקא כו'. </b>כמש"ל בסי' צ"ב שמכאן מוכח דביבש ביבש לא אמרינן חנ"נ וכן לח בלח בשאר איסורים וכמ"ש בפ"ה דע"ז <small>(ע"ג ב') </small>שני כוסות כו':
**** ENGLISH ****
And Duke is a. As a result of the Lord’s Prayer, which is in the land that is shown in the land is not mentioned in the Qur’an, and also in the midst of the sins of the earth, and in the midst of Hashem’s judgment, the two cups of the same as Hashem:
**** END BLOCK ****
```

### 35. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ז`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ז
**** HEBREW ****
<b>וי"א דאפילו כו'. </b>למד ממ"ש בפ"ה דתרומות ולא הספיק להגביה כו' ואמרו בירושלמי שם רש"א ידיעתה מקדשתה ורבנן אמרי הרמתה מקדשתה ואף רבנן ל"פ אלא בתרומה דצריך הרמה וה"ה לחומרא וכמ"ש בזבחים ק"ד א' והאיכא נמצאת טריפה כו' וערש"י שם ד"ה מרצה וכמ"ש הרא"ש בפ' ג"ה. אבל באמת לא דמי לשם ותרי אמרו במזיד אסור וא"א אלא בשנודע וערש"י בגטין נ"ד ב' ד"ה יעלו כו' וכ"ש בשלא נודע:
**** ENGLISH ****
וי"א דאפילו etc.. למד מwhat he wrote בפ"ה דתרומות ולא הספיק להגביה etc. ואמרו בירושלמי שם רש"א ידיעתה מקדשתה ורבנן אמרי הרמתה מקדשתה וeven רבנן ל"פ אלא בתרומה דצריך הרמה and the same applies לstringency וכwhat he wrote בזבחים ק"ד א' והthere is is found tereifah etc. וערש"י שם s.v. מרצה וכwhat he wrote Rosh בפ' ג"ה. אבל באמת לא דמי לשם ותרי אמרו במזיד forbidden וא"א אלא בשנודע וערש"י בגטין נ"ד ב' s.v. יcame up etc. וkli sheni בשלא נודע:
**** END BLOCK ****
```

### 36. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: א
**** HEBREW ****
<b>איסור של דבריהם כו'. </b>דלא אמרו בפ"ק די"ט <small>(ד' ב') </small>עצים שנשרו כו' אלא שנשרו לתוך עצים וכגי' ספרים מוסיף ומרבה כו' ואף שאמרו ברפ"ד דבכורות תרומת ח"ל רבה כו' לא אמרו אלא בתרומת ח"ל דקילא ובטלה ברוב משא"כ בשאר איסורין דרבנן כמש"ל סי' צ"ח (בס"ק ל') ועתוס' דפסחים ל' א' ד"ה לישהינהו כו': <br><b>(ליקוט) איסור כו'. </b>עסי' שכ"ג ומותר לבטלה כו' וי"ל דחלת ח"ל שאני שהקילו בה כמה דברים שם אבל הרמב"ן כתב <small>(בפ"ג דפסחים במלחמות ובחידושיו על יבמות בק"א) </small>דגם שם דיעבד דוקא וז"ש בפ"ג דפסחים <small>(מ"ו א' במתני') </small>כיצד מפרישין חלה כו' ואף בח"ל כמ"ש הרי"ף וש"פ ואם איתא הרי ראוי אף לכהן טמא בביטול ברוב וער"נ (ע"כ): <br><b>(ליקוט) איסור של כו' אבל כו'. </b>ממ"ש בבכורות כ"ז א' הלכך נדה כו' ואי ליכא כו' ואם איתא אפילו לגדול שלא טבל ראוי ע"י ביטול כמש"ש אלא דאין ביטול אלא אם נתערבה כבר וכה"ג אמר שם רבה מבטל כו'. ר"נ בפ"ג דפסחים <small>(הראיה מבכורות ליתא שם) </small>ותוס' שם ד"ה הלכך כו' תי' <small>(מחמת ד"א) </small>משום דדבר מועט כו' ותוס' ס"ל בפסחים שם במתני' דאפילו לא נתערבה יכול לערב ברוב ולאכלה (ע"כ): <br><b>(ליקוט) איסור כו' אבל כו'. </b>כמ"ש בירושלמי רפ"ב דכלאים והביאו הר"ש שם כיצד ימעט או יוסיף על סאה כו' תמן כו' <br><b>[וודאי לא גרע מן שאר דרבנן] </b>ואמר שם אי לערב אפילו כ"ש אסור אלמא לערב אפילו בדרבנן אסור אע"פ שאין מתכוין לזרוע ועסי' רצ"ו ס"ה וס"ז (ע"כ):
**** ENGLISH ****
איסור של דבריהם etc.. דלא אמרו בfirst chapter די"ט (ד' ב') }עצים שנשרו etc. אלא שנשרו לתוך עצים וכגי' סfruitם מוסיף ומרבה etc. וeven שאמרו ברפ"ד דבכורות תרומת ח"ל רבה etc. לא אמרו אלא בתרומת ח"ל דקילא ובטלה in the majority משif so in other איסורין d'rabbanan as written above siman 98 (בs.k. ל') ועתוsixty דפסחים ל' א' s.v. לישהינהו etc.: (ליקוט) איסור etc.. עסי' שכ"ג וpermitted לבטלה etc. and one may say דחלת ח"ל this case is different שהקילו בה כמה דברים שם אבל הרמב"ן wrote (בפ"ג דפסחים בsaltמות ובחידושיו על יבמות בק"א) }דגם שם דיעבד specifically וז"ש בפ"ג דפסחים (מ"ו א' במתני') }כיצד מfruitשין חלה etc. וeven בח"ל כwhat he wrote הרי"ף וש"פ ואם איתא הרי ראוי even לכהן טמא בביטול in the majority וער"נ (until here): (ליקוט) איסור של etc. אבל etc.. מwhat he wrote בבכורות כ"ז א' הלכך נדה etc. וif there is not etc. ואם איתא אפילו לגדול שלא טבל ראוי ע"י ביטול כמש"ש אלא דאין ביטול אלא אם נתערבה כבר וsuch a case אמר שם רבה מבטל etc.. ר"נ בפ"ג דפסחים (הproof מבכורות ליתא שם) }ותוsixty שם s.v. הלכך etc. תי' (מחמת ד"א) }becauseדבר מועט etc. ותוsixty ס"ל בפסחים שם במתני' דאפילו לא נתערבה יכול לערב in the majority וto eat it (until here): (ליקוט) איסור etc. אבל etc.. כwhat he wrote בירושלמי רchapter 2 דכלאים והביאו הר"ש שם כיצד ימעט או יוסיף על סאה etc. תמן etc. [וcertainly לא גרע מן שאר d'rabbanan] ואמר שם אי לערב אפילו kli sheni forbidden אלמא לערב אפילו בd'rabbanan forbidden אon the surface of שאין מתכוין לזרוע ועסי' רצ"ו seif 5 וs.k. 7 (until here):
**** END BLOCK ****
```

### 37. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: ב
**** HEBREW ****
<b>וי"א דאין כו'. </b>דמ"ש שם אבל בדרבנן מבטלין היינו כמסקנא דשם היכא דמקלי קלי איסורא דאל"כ עיגולי דבילה דשם יוסיף עליו וכן בחצי זיתא תרבא דפ' ג"ה ועתוס' שם ד"ה ותנן כו':
**** ENGLISH ****
וי"א דאין etc.. דwhat he wrote שם אבל בd'rabbanan מבטלין that is כמסקנא דשם היכא דמקלי קלי איסורא דאל"כ עיגולי דבילה דשם יוסיף עליו וכן בחצי זיתא תרבא דפ' ג"ה ועתוsixty שם s.v. ותנן etc.:
**** END BLOCK ****
```

### 38. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: ג
**** HEBREW ****
<b>איסור שנתבטל כו'. </b>כמ"ש בזבחים ל"א א' ויקץ כישן הפיגול ואף מאן דמתיר שם משום עירוב מחשבות ובבכורות כ"ב א' אר"י ל"ש אלא כו' ואף אביי דפליג מודה דמומאה מעוררת טומאה כמ"ש שם ממתני' דפ"ה דתרומות ואמרינן <small>(ס"ז דכלאים וש"מ) </small>המעביר עציץ נקוב כו' ואמרינן <small>(ב"ק ק' וש"מ) </small>נפרצה א"ל גדוד כו' ולא אמרינן ראשון ראשון בטיל ובפ"ו דשבת (ס"ה ב') שמא ירבו הנוטפים כו' ואפילו לקולא אמרינן דחוזר וניעור כמ"ש בספ"ז דנדרים גידולי היתר מעלין את האיסור וכל הסוגיא דשם וכ"ש לחומרא כמ"ש שם ודלמא לחומרא שאני ובספ"ה דתרומות ואם ידוע שהחטין של חולין כו' ושם סאה כו' ואח"כ נפלו שם כו' ובירושלמי שם כל האיסורין שריבה עליהן כו' ובפ"ה דע"ז <small>(ע"ג ב') </small>שני כוסות כו' ובירושלמי פ"ב דערלה גריסין של תרומה שנתבשלו עם עדשים של חולין ואין בהן בנ"ט ריבה עליהן גריסין מין מעורר מינו לאסור לא תהא גדולה מיי"נ כמה דתימר ביי"נ אתה רואה את ההיתר כמו שאינו ואותו האיסור אם יש בו בנ"ט אסור ואם לאו מותר הדא דאמר ריבה עליהן גריסין של תרומה אסור והא דאמרינן בפ"ה רע"ז <small>(ע"ג א') </small>דראשון ראשון בטיל פי' תוס' שם ובבכורות שם ובפ' הערל <small>(פ"ב ב') </small>ושאר מקומות דהיינו באיסור משהו אבל בנ"ט חוזר וניעור דהא הטעם ניכר בהן ובכה"נ דאמרינן בפ"ב דערלה התרומה מעלה כו' ושם הערלה מעלה כו' והערלה מעלה את הערלה בשאינו נ"ט וכמ"ש שם רא"א מצטרפין בנ"ט אבל לא לאסור ובפ"ה דתרומות ולא הספיק להגביה כו' ובירושלמי שם רש"א ידיעתה מקדשתה ורבנן אמרי הרמתה מקדשתה וז"ש ל"ש כו' דוק ותשכח בכל הנ"ל אבל הרמב"ם בפי"ג דתרומה פסק דידיעתה מקדשתה וכמ"ש בתוספתא פ"ו דתרומות אמתני' הנ"ל אמר ראב"ש בד"א בזמן שלא ידע בה ואח"כ נפלה אבל אם ידע בה ואח"כ נפלה אחרת ה"ז מותרת שכבר היה לו להעלות ומפרש הרמב"ם דראב"ש מפרש דברי ת"ק. ואף שהעיקר כדעת הראב"ד וראב"ש כאבוה סבירא ליה כמ"ש בירושלמי הנ"ל וז"ש שכבר ה"ל להעלות וכמ"ש בפסחים י"ג ב' וראב"ש כאבוה כו' מ"מ אף רבנן ל"פ אלא בתרומה שצריך להרים ולאו כמורם דמי אבל בשאר איסורין מודי כמ"ש בתוספתא שם סאה ערלה שנפלה למאתים ידע בה ואח"כ נפלה. אחרת ה"ז מותרת כו' עד שתרבה אסור על המותר וכמ"ש בתרומה שהוגבהה כמ"ש במתני' שם הגביה ונפלה אחרת כו' אלמא דוקא בתרומה צריך הגבהה ובשאר איסורין בידיעה וכה"ג אמרינן בתוספתא פ"ח שאור של תרומה שנפל לתוך העיסה והגביהו ואח"כ נתחמץ מותר שאור של שביעית שנפל לתוך העיסה ידע בו ואח"כ נתחמץ מותר ובירושלמי פ"ב דערלה הלכה ב' פשיטא שידיעתו מתירתו ידיעת חבירו מה שתתיר כו' ידיעת ספק כו' ובזבחים ק"ד א' והאיכא נמצאת טריפה כו' כנ"ל וכ"כ המרדכי בפ"ט דב"ק אהא דאמרינן שם נפרצה א"ל גדור כו' והמעביר עציץ כו' דמיירי בלא נודע דאל"כ קשה מהא דפ"ח דע"ז דאמרינן ראשון ראשון בטל וא"א לומר כמ"ש תוס' שם דביותר מס' דהא הנך נמי במאתים. ומ"מ ברובו לא מהני ידיעה כמ"ש בתוספתא הנ"ל עד שתרבה כו' וכן הרמה בתרומה כמ"ש במתני' הנ"ל עד שתרבה תרומה כו' וכן אמרו בפ' הערל <small>(פ"ב ב') </small>נתן סאה כו' עד רובו ועתוס' שם ד"ה א"ר יוחנן כו'. וכלל הענין כי בדאורייתא אסרינן חוזר וניער אפילו בידיעה בשאר איסורין והרמה בתרומה כנ"ל וכמ"ש בירושלמי פ"ה דתרומות אמתני' הנ"ל עד שירבה כו' א"ר יוסי זאת אומרת דבר שהוא בטל דבר תורה מעורר את מינו לאסור וכן יבש ביבש וכן לח בלח מין בשאינו מינו עד פ' דטעם כעיקר דאורייתא ומין במינו ברובא אבל בס' שהוא דרבנן אינו חוזר וניעור אם ידע וכן כל העולין במאה או מאתים או במשהו כולן אין חוזרין וניעור כיון שהוא מדרבנן וכמ"ש בגטין נ"ד ב' <small>(וע"ל סי' ק"א ס"ק ו') </small>וכן בתרומה וערלה אע"ג דילפינן מקראי אסמכתא בעלמא הוא כמ"ש תוס' ב"מ ג"ג א' ד"ה ועולה כו' וראיה דבפ' כ"ש יליף בב"ח מק"ו מערלה ולא פריך שכן צריכה א' ומאתים וכן בפ' הערל דחשיב מחפ"ז ולא חשיב שעולה במאה <small>(ועבתוס' שם עוד ב' ראיות ואינן מוכרחין) </small>וז"ש התרומה מעלה כו' הערלה מעלה כו' ובפ"ה דע"ז ראשון ראשון בטל ואפילו בפחות מס' כיון שהוא מין במינו וכמ"ש בתוספתא הנ"ל עד שתרבה כו' והכל בשידע מיירי דבלא ידע אוסר הכל כדינו במאה ומאתים ומשהו וס' ובזה יבא הכל על נכון והנך דגידולי היתר כו' ונפרצה א"ל גדור כו' והמעביר כו' לא כתי' המרדכי בלא ידע דכל המתני' סתמן בידע אלא דגידולים שאני כיון דממילא קא רבי כבבת אחת דמי ולכן לא אשכחן לאיסור רק בגידולין. ותוס' תי' כיון שהוא בלא הפסק כבב"א דמי:
**** ENGLISH ****
איסור שנתבטל etc.. כwhat he wrote בזבחים ל"א א' ויקץ כישן הפיגול וeven מאן דמתיר שם because עירוב מחשבות ובבכורות כ"ב א' אר"י ל"ש אלא etc. וeven אביי דפליג מודה דמומאה מskinרת טומאה כwhat he wrote שם ממתני' דפ"ה דתרומות ואמרינן (s.k. 7 דכלאים וש"מ) }המעביר עציץ נקוב etc. ואמרינן (ב"ק ק' וש"מ) }נפרצה and some say גדוד etc. ולא אמרינן ראשון ראשון nullified ובchapter 6 דשבת (seif 5 ב') lest ירבו הנוטפים etc. ואפילו לקולא אמרינן דחוזר וניskin כwhat he wrote בספ"ז דנדרים גידולי היתר מעלין את האיסור וכל הסוגיא דשם וkli sheni לstringency כwhat he wrote שם ודלמא לstringency this case is different ובספ"ה דתרומות ואם ידוע שהחטין של חולין etc. ושם סאה etc. וafterward fell שם etc. ובירושלמי שם כל האיסורין שריבה עליהן etc. ובפ"ה דע"ז (ע"ג ב') }שני כוסות etc. ובירושלמי chapter 2 דערלה גריסין של תרומה שwas cookedו עם עדשים של חולין ואין בהן בנ"ט ריבה עליהן גריסין מין מskinר מינו לforbidden לא תהא גדולה מיי"נ כמה דתימר ביי"נ אתה רואה את ההיתר כמו שאינו ואותו האיסור אם יש בו בנ"ט forbidden ואם לאו permitted הדא דאמר ריבה עליהן גריסין של תרומה forbidden והא דאמרינן בפ"ה רע"ז (ע"ג א') }דראשון ראשון nullified פי' תוsixty שם ובבכורות שם ובפ' הערל (chapter 2 ב') }ושאר מקומות that is באיסור משהו אבל בנ"ט חוזר וניskin דהא the taste ניכר בהן ובכה"נ דאמרינן בchapter 2 דערלה התרומה מcame up etc. ושם הערלה מcame up etc. והערלה מcame up את הערלה בשאינו נ"ט וכwhat he wrote שם רא"א מצטרפין בנ"ט אבל לא לforbidden ובפ"ה דתרומות ולא הספיק להגביה etc. ובירושלמי שם רש"א ידיעתה מקדשתה ורבנן אמרי הרמתה מקדשתה וז"ש ל"ש etc. דוק ותשכח בכל הit appears to me אבל Rambam בפי"ג דתרומה ruled דידיעתה מקדשתה וכwhat he wrote בתוספתא chapter 6 דתרומות אמתני' הit appears to me אמר ראב"ש בד"א בtime שלא ידע בה וafterward fellה אבל אם ידע בה וafterward fellה אחרת ה"ז permittedת שכבר היה לו להcame upת ומפרש Rambam דראב"ש מפרש דברי ת"ק. וeven שהעיקר כדעת הראב"ד וראב"ש כאבוה סבירא ליה כwhat he wrote בירושלמי הit appears to me וז"ש שכבר ה"ל להcame upת וכwhat he wrote בפסחים י"ג ב' וראב"ש כאבוה etc. nevertheless even רבנן ל"פ אלא בתרומה שצריך להרים ולאו כמורם דמי אבל in other איסורין מודי כwhat he wrote בתוספתא שם סאה ערלה שfellה למאתים ידע בה וafterward fellה. אחרת ה"ז permittedת etc. עד שתרבה forbidden על הpermitted וכwhat he wrote בתרומה שהוגבהה כwhat he wrote במתני' שם הגביה וfellה אחרת etc. אלמא specifically בתרומה צריך הגבהה וin other איסורין בידיעה וsuch a case אמרינן בתוספתא פ"ח שאור של תרומה שfell לתוך הdough והגביהו וafterward נתחמץ permitted שאור של שביעית שfell לתוך הdough ידע בו וafterward נתחמץ permitted ובירושלמי chapter 2 דערלה the halachah ב' פשיטא שידיעתו מתירתו ידיעת חבירו מה שתתיר etc. ידיעת doubt etc. ובזבחים ק"ד א' והthere is is found tereifah etc. כit appears to me and so too המרדכי בchapter 9 דב"ק אהא דאמרינן שם נפרצה and some say גדור etc. והמעביר עציץ etc. דdeals with without נודע דאל"כ קשה מהא דפ"ח דע"ז דאמרינן ראשון ראשון בטל וא"א לומר כwhat he wrote תוsixty שם דביותר מsixty דהא הנך נמי במאתים. וnevertheless in the majorityו לא מהני ידיעה כwhat he wrote בתוספתא הit appears to me עד שתרבה etc. וכן הרמה בתרומה כwhat he wrote במתני' הit appears to me עד שתרבה תרומה etc. וכן אמרו בפ' הערל (chapter 2 ב') }נתן סאה etc. עד רובו ועתוsixty שם s.v. א"ר יוחנן etc.. וכלל הענין כי בd'oraisa אסרינן חוזר וניער אפילו בידיעה in other איסורין והרמה בתרומה כit appears to me וכwhat he wrote בירושלמי פ"ה דתרומות אמתני' הit appears to me עד שירבה etc. א"ר יוסי זאת אומרת דבר שהוא בטל דבר תורה מskinר את מינו לforbidden וכן יבש ביבש וכן לח בלח מין בשאינו מינו עד פ' דטעם כעיקר d'oraisa וspecies in its species in the majority אבל בsixty שהוא d'rabbanan אינו חוזר וניskin אם ידע וכן כל העולין במאה או מאתים או במשהו כולן אין חוזרין וניskin כיון שהוא d'rabbanan וכwhat he wrote בגטין נ"ד ב' (וע"ל סי' ק"א s.k. ו') }וכן בתרומה וערלה even though דילפינן מקראי אסמכתא mere הוא כwhat he wrote תוsixty ב"מ ג"ג א' s.v. ועולה etc. וproof דבפ' kli sheni יליף בב"ח מק"ו מערלה ולא fruitך שכן צריכה א' ומאתים וכן בפ' הערל דחשיב מחפ"ז ולא חשיב שעולה במאה (ועבתוsixty שם עוד ב' ראיות ואינן מוכרחין) }וז"ש התרומה מcame up etc. הערלה מcame up etc. ובפ"ה דע"ז ראשון ראשון בטל ואפילו בפחות מsixty כיון שהוא species in its species וכwhat he wrote בתוספתא הit appears to me עד שתרבה etc. והכל בשידע deals with דwithout ידע אוסר הכל the measure ofנו במאה ומאתים ומשהו וsixty ובזה יבא הכל על נכון והנך דגידולי היתר etc. ונפרצה and some say גדור etc. והמעביר etc. לא כתי' המרדכי without ידע דכל המתני' סתמן בידע אלא דגידולים this case is different כיון דautomatically קא רבי כבבת אחת דמי ולכן לא אשכחן לאיסור רק בגידולין. ותוsixty תי' כיון שהוא without הruled כבב"א דמי:
**** END BLOCK ****
```

### 39. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: ד
**** HEBREW ****
<b>כזית חלב כו'. </b>כמ"ש בפ"ה דתרומות הגביהה ונפלה למקום אחר כו' וחכ"א אין מדמע אלא כו'. ר"ל ומותר לגמרי דלא כפי' הרמב"ם שם שהוא תמוה וכבר הקשו עליו ואף לכתחלה מותר כמ"ש בפ"ט דכלאים צמר גמלים וצמר רחלים שטרפן כו':
**** ENGLISH ****
כזית חלב etc.. כwhat he wrote בפ"ה דתרומות הגביהה וfellה למקום אחר etc. וחכ"א אין מדמע אלא etc.. ר"ל וpermitted לגמרי דלא כפי' Rambam שם שהוא תמוה וכבר הקשו עליו וeven לat first permitted כwhat he wrote בchapter 9 דכלאים צמר גמלים וצמר רחלים שטרפן etc.:
**** END BLOCK ****
```

### 40. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `א`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: א
**** HEBREW ****
<b>אם נבלע כו'. </b>כמ"ש בע"ז ל"ג ב' איבעיא להו כו' ועתוס' ד"ה שרא כו' וכתב הרשב"א משום דהכלי תשמישו בצונן ואין בלוע כו' אלא דבר מועט ומשתמשין בכלי בשפע וא"א לבא לידי נ"ט אבל יין אסור דבמשהו וע"ש ע"ג א' במתני'. ובזה מתורץ קושית תוס' דפסחים ל' א' ד"ה ולישהינהו תימא כו' דאע"ג דשימוש החמץ הוא כ"ש מ"מ השימוש בו בשפע אלא שהחמץ בתוכו מעט וא"א שהכל נ"נ כיון דהתירא כמ"ש תוס' סוף ע"ז וכמש"ל סי' צ"ד ס"ו. וז"ש בקדירה כי ההיא דפסחים או קנקנים כנ"ל ודלא כתי' תוס' בפסחים שם ומפ' הר' יוסף כו' דהא בפ"ה דע"ז <small>(ס"ח ב') </small>מספקא לרבא אי ס"ל לרב נטל"פ אסור או מותר וע"ש בתוס' שדחקו וז"ש ואפילו בבן יומו וכן שלא כתי' השני שם בשם ר"י משום דחשיב דיעבד כיון שא"א בהגעלה דהא קנקנים אפשר בהגעלה ועירוי וז"ש בקדירה או בתוך קנקנים אלא שתוס' ס"ל דהא דקנקנים משום דפוגם וכתי' הר' יוסף אלא שהוצרכו לתי' הר"י משום קושיא הנ"ל דלרב ספוקי מספקא כנ"ל. אבל הרשב"א סובר דנ"ט לשבח וכמ"ש <small>(בע"ז) </small>ע"ג א' יין במים בנ"ט: <br><b>(ליקוט) אם נבלע כו'. </b>וראיה מפי"א דתרומות דאף איסור בעין במועט מותר המערה מכד לכד כו' חבית שנשפכה אין מחייבין להיות יושב ומטפח כו' וכן מנורה כו' ודלא כהרמב"ם שסובר דמקולי תרומה היא ועסי' קכ"ב <small>(בס"ק ט"ו) </small>(ע"כ):
**** ENGLISH ****
אם נabsorbed etc.. כwhat he wrote בע"ז ל"ג ב' איבעיא להו etc. ועתוsixty s.v. שרא etc. וwrote Rashba becausethe vessel its use בcold ואין absorbed etc. אלא דבר מועט ומשתמשין בכלי בשפע וא"א לבא לידי נ"ט אבל יין forbidden דבמשהו וsee there ע"ג א' במתני'. ובזה מתורץ קושית תוsixty דפסחים ל' א' s.v. ולישהינהו תימא etc. דeven though דשימוש החמץ הוא kli sheni nevertheless השימוש בו בשפע אלא שהחמץ בתetc. מעט וא"א שהכל נ"נ כיון דof heter כwhat he wrote תוsixty סוף ע"ז וas written above siman 94 ס"ו. וז"ש בקדירה כי ההיא דפסחים או קנקנים כit appears to me ודלא כתי' תוsixty בפסחים שם ומפ' הר' יוסף etc. דהא בפ"ה דע"ז (ס"ח ב') }מdoubtא according to Ravא אי ס"ל according to Rav nat bar lichtmile forbidden או permitted וsee there בתוsixty שדחקו וז"ש ואפילו בben yomo וכן שלא כתי' the second שם in name of ר"י becauseחשיב דיעבד כיון שא"א בהגcame up דהא קנקנים אפשר בהגcame up וpouring וז"ש בקדירה או בתוך קנקנים אלא they dranksixty ס"ל דהא דקנקנים becausespoils וכתי' הר' יוסף אלא שהוצרכו לתי' הר"י because קושיא הit appears to me דaccording to Rav ספוקי מdoubtא כit appears to me. אבל Rashba סובר דנ"ט for improvement וכwhat he wrote (בע"ז) }ע"ג א' יין in water בנ"ט: (ליקוט) אם נabsorbed etc.. וproof מפי"א דתרומות דeven איסור visible במועט permitted הpours מכד לכד etc. חבית שנשפכה אין מliableין להיות יושב ומטפח etc. וכן מנורה etc. ודלא כRambam שסובר דמקולי תרומה היא ועסי' קכ"ב (בs.k. ט"ו) }(until here):
**** END BLOCK ****
```

### 41. `siman_099/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: ב
**** HEBREW ****
<b>אבל אם כו'. </b>כמ"ש בפסחים שם גזירה דלמא אתי כו' אלמא אם דרך להשתמש במה שאוסר אסור בכ"ע וגדולה מזו אמרו בסוף ע"ז דאסור קדירה שאינה בת יומא כו' וכ"ש באותו כלי עצמו ול"ד לקנקנין כמ"ש שם אקראי בעלמא הוא ודמי לבבא ראשונה שדרכו להשתמש בשפע דל"ג שמא ישתמש במועט:
**** ENGLISH ****
אבל אם etc.. כwhat he wrote בפסחים שם גזירה דלמא אתי etc. אלמא אם by way of להשתמש במה שאוסר forbidden בכ"ע וגדולה מזו אמרו at the end ע"ז דforbidden קדירה שאינה ben yomo etc. וkli sheni באותו כלי עצמו וsome say לקנקנין כwhat he wrote שם אקראי mere הוא ודמי לבבא ראשונה שדרכו להשתמש בשפע דל"ג lest ישתמש במועט:
**** END BLOCK ****
```

### 42. `siman_099/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 1 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_099/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=1#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 1
marker: _
**** HEBREW ****
<b>א) [סעיף א'] חתיכת נבילה שיש בה בשר ועצמות וכו' עצמות האיסור מצטרפין עם ההיתר לבטל האיסור וכו'  </b>לפי שאינן בני אכילה אינם בכלל האיסור ומ"מ בולעים הם ע"י הבישול ע"כ מצטרפין לבטל האיסור כי האיסור מתפשט גם לתוכן ויש בהם גם לחלוחית לבלבל האיסור שבולעים מן הבשר האסור. ט"ז סק"א. חו"ד או' א'.
**** ENGLISH ****
א) [seif א'] חתיכת nevelah שיש בה meat ועצמות etc. עצמות האיסור מצטרפין עם ההיתר לבטל האיסור etc.  לפי שאינן בני אכילה אינם בכלל האיסור וnevertheless בולעים הם ע"י הcooking until here מצטרפין לבטל האיסור כי האיסור מתפשט גם לתוכן ויש בהם גם לחלוחית לבלבל האיסור שבולעים מן הmeat הforbidden. ט"ז סק"א. חו"ד או' א'.
**** END BLOCK ****
```

### 43. `siman_099/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 2 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_099/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 2
marker: _
**** HEBREW ****
<b>ב) ומיהו  </b>עצמות הרכות מצטרפים לאיסור מפני מוח שבהן ומחמת רכותן שיצא לחות. הר"ן פג"ה. והב"ד ב"י. ש"ך סק"א. פר"ח סוף או' א' לה"פ או' א' בל"י או' א' כריתי או' ה' מנ"י על התו"ח כלל פ"ה או' ן' חו"ד שם. ער"ה או' א' אכן דעת הטור דאין לחלק דלעולם מצטרפין העצמות להיתר רק המוח שבתוכו לבד מצטרף לאיסור. מנ"י שם. וכן צ"ל לדעת הש"ע דנקט לשון הטור. ובהפ"מ המיקל לא הפסיד באינו מינו ובמינו המיקל אף בהפסד קצת אין גוערין בו. שפ"ד או' א' זב"צ או' ב' ועצמות הרכות שיש בהם מוח היינו כל שאחר שיתייבש נראה בהם נקבים חלולים שידוע שמאחר שנתייבש המוח נעשה כך.
**** ENGLISH ****
ב) ומיהו  עצמות הרכות מצטרפים לאיסור מפני מוח שבהן ומחמת רכותן שיצא לחות. Ran פג"ה. והב"ד ben yomo. ש"ך סק"א. Peri Chadash סוף או' א' Lechem HaPanim או' א' Binyamin Zeev או' א' Kereti או' ה' מנ"י על התו"ח כלל פ"ה או' ן' חו"ד שם. ער"ה או' א' however דעת Tur דאין לdisagreed דלעולם מצטרפין העצמות להיתר רק המוח שבתetc. לבד מצטרף לאיסור. מנ"י שם. וכן one must say לדעת הש"ע דנקט language of Tur. ובהפ"מ המיקל he has not lost באינו מינו ובמינו המיקל even בהפסד קצת אין גוערין בו. שפ"ד או' א' Zivchei Tzedek או' ב' ועצמות הרכות שיש בהם מוח that is כל שאחר שיתייבש it appears בהם holeים חלולים that it is known lestחר שנתייבש המוח נעשה כך.
**** END BLOCK ****
```

### 44. `siman_099/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 4 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_099/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 4
marker: _
**** HEBREW ****
<b>ד) שם. אבל המוח שבעצמות וכו'  </b>פי' אפי' יהיה העצם סתום מפני שהעצם הוא ספוגיי (מלשון ספוג) ומוציא טעם המוח שבתוכו וכמ"ש הטור והמפה לעיל ססי' ט"א בשם הרשב"א לענין מליחה יעו"ש. שו"ג חו' ג' ועיון לקמן או' ט'.
**** ENGLISH ****
ד) שם. אבל המוח שבעצמות etc.  פי' even יהיה העצם סתום מפני שהעצם הוא ספוגיי (מlanguage of ספוג) ומוציא טעם המוח שבתetc. וכwhat he wrote Tur והמפה above ססי' ט"א in name of Rashba regarding saltedה יעו"ש. שו"ג חו' ג' ועיון below או' ט'.
**** END BLOCK ****
```

### 45. `siman_099/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 6 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_099/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 6
marker: _
**** HEBREW ****
<b>ו) שם הגה. ויש מחמירין שלא לצרף עצמות האיסור עם ההיתר לבטל.  </b>וגם לא לאיסור אבל עצמות ההיתר מצטרפין להיתר. ש"ך סק"ב. פר"ח או' ב' לה"פ או' ב' כריתי או' ד' חו"ד או' ג' שפ"ד או' ב'.
**** ENGLISH ****
ו) שם הגה. ויש are stringent שלא לצרף עצמות האיסור עם ההיתר לבטל.  וגם לא לאיסור אבל עצמות ההיתר מצטרפין להיתר. ש"ך סק"ב. Peri Chadash או' ב' Lechem HaPanim או' ב' Kereti או' ד' חו"ד או' ג' שפ"ד או' ב'.
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_099
npm run pipeline:editorial:advance -- --siman 99
```

## Checkpoint ids

siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%90
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%92
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=3#marker=_
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%90
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%90
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%91
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%92
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%94
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%95
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=%D7%90
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=%D7%91
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=%D7%92
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=%D7%93
siman_099/baer-heitev/part-001.txt#slug=baer-heitev#seif=7#marker=_
siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%90
siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%91
siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=_
siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%90
siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%91
siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%92
siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%92
siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=6#marker=%D7%90
siman_099/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=7#marker=_
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%90
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%91
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%92
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=_
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=_
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%90
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%91
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%92
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%93
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%94
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%95
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%96
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%90
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%91
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%92
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%93
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%90
siman_099/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%91
siman_099/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=1#marker=_
siman_099/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=2#marker=_
siman_099/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=4#marker=_
siman_099/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=6#marker=_