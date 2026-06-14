# Editorial retranslation — Siman 189 (part 2/4)

Generated: 2026-06-14T11:47:43.247Z

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

## Blocks in this batch (45 of 454 remaining in scope)

### 1. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 23 — marker `ב`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=23#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 23
marker: ב
**** HEBREW ****
<b>וי"א כו'. </b>כנ"ל דעת הרשב"א וש"פ:
**** ENGLISH ****
Oh, yes. This is the same as the Holy Qur'an:
**** END BLOCK ****
```

### 2. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 23 — marker `ג`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=23#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 23
marker: ג
**** HEBREW ****
<b>וי"א כו'. </b>תוס' שם ד"ה אכלה כו':
**** ENGLISH ****
Oh, yes. The name of the Lord was eaten as:
**** END BLOCK ****
```

### 3. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 24 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=24#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 24
marker: א
**** HEBREW ****
<b>וכולם כו'. </b>מתני' שם היתה כו' וע"ל ס"ג:
**** ENGLISH ****
And they are all called. There was a quaint and a lawyer:
**** END BLOCK ****
```

### 4. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 24 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=24#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 24
marker: ב
**** HEBREW ****
<b>בד"א כו'. </b>ע"ל סי' קפ"ד ס"ה וצ"ע (בספר בעל הנפש מחלק בזה והובא באחרונים):
**** ENGLISH ****
In the D.C. According to C. K. C. K. K.C., the author of the soul divides it and is brought to the others:
**** END BLOCK ****
```

### 5. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 27 — marker `א`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=27#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 27
marker: א
**** HEBREW ****
<b>אפילו הביאה כו' וכן כו'. </b>כמש"ש מ"ו א' דקודם לי"ב שנה שומא נינהו ובלא הביאה אפילו אח"כ קטנה היא ואפילו בת עשרים וכמש"ש מ"ז ב' וש"מ ודלא כרש"י שם ה' א' ד"ה אין חוששין דבא' מהן סגי ולשון משהגיעו דחקו וליתא דבהדיא תניא בתוספתא פ"א משהביאה שתי שערות. ת"ה. ורש"י מפרש דשם מיירי קודם לי"ב שנה וז"ש רש"י בא' מהן:
**** ENGLISH ****
He even brought a quaint and so on. Hashem’s Word says, “He who is not the same as Hashem’s people, and he is not the same as Hashem’s people, and he is not afraid of Hashem’s name, and he is not afraid of them, and he is the same as Hashem’s name. . . Hashem’s Word tells us that Hashem’s Word is the same as Hashem’s Word
**** END BLOCK ****
```

### 6. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 27 — marker `ב`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=27#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 27
marker: ב
**** HEBREW ****
<b>אם בדקוה כו'. </b>כמש"ש מ"ו א' הלכתא חוששין כו' וה"מ כו' וה"נ ווסתות דרבנן ודוקא בדקוה אבל בלא"ה חזקה כו' כמש"ש ועבא"ע סי' קנ"ה:
**** ENGLISH ****
If you look at him. As a result of Hashem’s Word, Hashem’s Word and Hashem’s Word, “Hashem’s Word and Hashem’s Word, and Hashem’s Word, and Hashem’s Word, and Hashem’s Word is in His Word:
**** END BLOCK ****
```

### 7. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 27 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=27#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 27
marker: ג
**** HEBREW ****
<b>היא קובעת כו'. </b>שם ט' ב' ת"ר תינוקת כו' שלישית ה"ה כו' ושם י' א' שבין שניה ושלישית כו' אבל לאחד שלישית לד"ה טמאה והיא ככל הנשים:
**** ENGLISH ****
She says yes. There is a third-year-old baby named 'A' between a second and a third-year-old, but one third to the Tenth and all women:
**** END BLOCK ****
```

### 8. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 27 — marker `ד`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=27#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 27
marker: ד
**** HEBREW ****
<b>אלא שיש הפרש כו'. </b>שם ט' ב' עברו עליה כו' משא"כ בשאר כל הנשים דלא קי"ל כר"א במתני' דאמר כל אשה כו' וכמש"ש ט' ב' ת"ר מעשה ועשה רבי כר"א כו' משא"כ בתינוקת כו' דאפילו רבנן מודי דלא פריך שם י' א' אלא מסיפא דהגיע זמנה לראות אימא סיפא וערש"י שם ד"ה אימא סיפא כו':
**** ENGLISH ****
But there is the difference. Hashem’s Word says, “All women are blessed with Hashem’s people, and Hashem’s Word is given to them, and Hashem’s people, and Hashem’s people, and Hashem’s people, and Hashem’s people, and they will be able to see Hashem’s children as their children, and they will be able to see Hashem’s name
**** END BLOCK ****
```

### 9. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 27 — marker `ה`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=27#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 27
marker: ה
**** HEBREW ****
<b>ואפילו חזרה לראות כאותן כו'. </b>שם י' א' חדר קחזיא כו' הדר קחזיא כו' וכ' תוס' שם ד"ה קחזיא כו' ובד"ה ברוב כו' דאתיא לר' אבל לרשב"ג עד רביעית לא חזרה דראיה ראשונה אינה מצטרפת אבל הרשב"א חולק עליהם וכתב דאתי בין לר' בין לרשב"ג דא"א שכל הסוגיא אתי דלא כהלכתא פלוגתא דחזקיה ור"י ור"י בן יהוצדק כו' ועתוס' שם ד"ה ר' יוחנן כו' ושם ב' ד"ה למיהוי כו' אלא סיפא בלבד דהגיע לראות אתיא כר' וכגירסת רוב ספרים שכ' תוס' הנ"ל וכשהגיע כו' מני ר' כו':
**** ENGLISH ****
And even back to seeing them. Hashem’s name is “Arise, O Lord, O Lord, O Lord, O Lord, O Lord, O Lord, and I will not be able to see him, and he will not be able to see him, and he will not be able to speak to him.”
"And when it comes," he said
**** END BLOCK ****
```

### 10. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 27 — marker `ו`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=27#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 27
marker: ו
**** HEBREW ****
<b>ראתה ג' ראיות כו'. </b>שם בברייתא דזקנה:
**** ENGLISH ****
I saw a cheque evidence. There is a name in the library:
**** END BLOCK ****
```

### 11. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 28 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=28#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 28
marker: _
**** HEBREW ****
<b>וכן זקנה כו'. </b>שם וכמש"ל סל"ג וה"ה לקטנה וזקנה כל שלא קבעה ווסת ה"ה כמעוברת ומניקה כמ"ש במתני' ואין חילוק ביניהון אלא בראיה שניה כמ"ש בסל"א וכמש"ש ובמה אמרו כו' כמש"ש י' ב' ל"ש אלא אבתולה וזקנה כו' וא"כ אין נ"מ לענין ווסתות אלא בזקנה כל שהפסיקה פא"פ ג' עונות כמש"ש ט' ב' ובבתולה אין נ"מ כלל אלא בלא הגיע לראות כנ"ל ועתוס' שם ט' ב' ד"ה זקנה כו' אבל בבתולה שהגיע לראות לא כמש"ש בגמ' וכשהגיע זמנה כו' עברו כו' ומוקמינן כר"א דוקא כנ"ל:
**** ENGLISH ****
And yes, old man. He said, “And the Lord’s Prayer, and he has not been given to him, and he will not be able to do so with him, and he will not be able to see him, and he will not be able to do so.”
And then, the Lord, is the same as the Lord’s Prayer
**** END BLOCK ****
```

### 12. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 29 — marker `א`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=29#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 29
marker: א
**** HEBREW ****
<b>שראויה כו'. </b>עתוס' שם ד"ה כל כו':
**** ENGLISH ****
It is worth . . The name of the Lord is all the same:
**** END BLOCK ****
```

### 13. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 29 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=29#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 29
marker: ב
**** HEBREW ****
<b>ואינה חוששת. </b>(משמעות הלשון כמ"ד שאינה מקפדת דלא כהט"ז) כדברי המיקל דווסתות דרבנן. ת"ה:
**** ENGLISH ****
Not afraid. (The meaning of the tongue as a non-revolutionary lawyer) in the words of the stick of derivation.  ת:
**** END BLOCK ****
```

### 14. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: _
**** HEBREW ****
<b>אם קבעה כו'. </b>ממש"ש ס"ג תניא כיצד אר"י ימים ושעות ווסת כו' משמע דוקא ימים ושעות וכמש"ש מיום עשרים ליום עשרים כו'. בהא הוא דפליג ר' יהודה על ר"י דוקא וזש"ש ס"ו א' לכי והבעלי כו' לפי שהוא קודם השעה שהיתה רגילה בביאתה לביתה והטבילה אינה ביום קבוע:
**** ENGLISH ****
If he has set up a. The S.J.A. will give you a few days and hours of circumcision. Hashem’s Word is Hashem’s Word, and Hashem’s people are Hashem’s people, and Hashem’s people are Hashem’s people, because He is the first time He was accustomed to their home and the baptism is not on a regular day:
**** END BLOCK ****
```

### 15. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 30 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=30#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 30
marker: _
**** HEBREW ****
<b>חזרה כו'. </b>ר"ל אחר ג' עונות כנ"ל:
**** ENGLISH ****
Returned to K. R.J.: The same season:
**** END BLOCK ****
```

### 16. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 31 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=31#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 31
marker: _
**** HEBREW ****
<b>חזרה כו'. </b>כמ"ש במתני' שם ובמה אמרו כו' אבל כו' ואזקנה קאי לד"ה וכמ"ש תוס' הנ"ל ד"ה זקנה כו' ולכן לא מיבעיא להו הדר קחזיא בעונות רק אקטנה וז"ש ובזה כו':
**** ENGLISH ****
Returned to K. As a result of Hashem’s word, He said, “But he is a son of the Lord, and he is a son of the Lord, and he is a son of the Lord, and therefore he does not wish to be the Lord’s wife, and he will not be able to do so.”
**** END BLOCK ****
```

### 17. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 32 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=32#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 32
marker: א
**** HEBREW ****
<b>פעמים כו'. </b>ספ"ד ל"ט ב' ועתוס' שם ד"ה אלמא כו'. ונראה לפרש דמיירי כו':
**** ENGLISH ****
“Soon times.” The Lord’s Prayer and Hashem’s Word, and Hashem’s Word. It seems to have been interpreted as “the Lord”:
**** END BLOCK ****
```

### 18. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 32 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=32#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 32
marker: ב
**** HEBREW ****
<b>ורביעית בכ' לחודש כו'. </b>כצ"ל והוא מדברי הראב"ד ועש"ך והראב"ד אזיל לשיטתו דפסק אף האידנא כדינא דגמ' דאין האשה קובעת בימי זיבתה כמש"ש ל"ט א' ב' ולכן אמר בכ' אלא שר"ח הוא בי"א לכ' ולכן אמר שקבעה בתחלה בר"ח וכמ"ש הראב"ד דאע"ג דלכתחלה אינה קובעת מ"מ אינה נעקר אח"כ עד שיעקר ג"פ וז"ש ורביעית בכ' לחודש ור"ח כו'. אבל כבר הכריע הרמב"ן והרשב"א בת"ה והטור שהאידנא לעולם קובעת ווסת שבנות ישראל החמירו ע"ע כו' שלא יצטרכו ללמוד פתחי נדות וזיבות ואם איתא אתה מצריכה עדיין ללמדם ולכן א"צ לט' ראיות ובו' סגי ג"פ בר"ח וכ' לחודש או קודם:
**** ENGLISH ****
4th of the month. And he said, “And he is the Lord’s Prayer, and he is the Lord’s Prayer, and the Lord is the same as the Lord’s Prayer, and he is not the same as the Lord’s Prayer, and he says, ‘I am the Lord’s Prayer. But the Ramban and the Sages of Israel have already declared that the children of Israel have not been destroyed
You’ll have to learn prophecies and meetings if you’re still required to teach them, and therefore I’m going to give evidence to you and I’m going to give you an email and a month or earlier:
**** END BLOCK ****
```

### 19. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 33 — marker `א`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 33
marker: א
**** HEBREW ****
<b>מעוברת כו' ומניקה כו'. </b>ממש"ש י' ב' דיין כל ימי עיבורן דיין כו' ושם שהיו שופעות ובאות דיין כו' משמע אפילו ראתה כמה פעמים וכ"כ תוס' שם ד"ה דיין כו' וכשמואל ור' יוחנן אע"ג דר"י ור"י ור"ש פליגי אר"מ מ"מ כיון דר' יוחנן ושמואל סברי כוותיה דר"מ הכי קי"ל וכמ"ש דאין הולכין אחר פלוגתא דתנאי במקום פלוגתא דאמוראי וכן ר' יוסי דמתני' דאמר מעוברת ומניקה שעברו כו' לא קי"ל ג"כ כוותיה ואע"ג דתני תנא קמי כו' שם י' ב' וא"ל פתחת כו' ההוא לפרושי דתנא קאתי וכן ס"ל לר' יוחנן שם ט' א' וזהו דעת הראב"ד והרמב"ן חולק עליו וכתב דקבעה בימי מניקותה ממש"ש י"א ב' מ"ד תיבדוק דדילמא כו' הניחא כו' והרשב"א דחה ואמד דההיא אליבא דר' יהודה ור"י ור"ש דס"ל אכולהו ואנן קי"ל כר"מ וע"ש קע"א ב' שהאריך:
**** ENGLISH ****
It’s like a hump and a snail.” Hashem’s Word says, “He who is in heaven, who is in heaven, and who is Hashem’s name, and who is the same as Hashem’s people, and that He will be blessed with Hashem’s name, and that He will be the same as Hashem’s people.”
Hashem’s Word tells us that Hashem’s Word is Hashem’s Word and Hashem’s Word is Hashem’s promise to Abraham, and that it is Hashem’s promise to Abraham, and that He is Hashem’s Word
**** END BLOCK ****
```

### 20. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 33 — marker `ב`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 33
marker: ב
**** HEBREW ****
<b>אפי' כו' או גמלתו כו'. </b>שם כר"י ור"י ור"ש וכנ"ל:
**** ENGLISH ****
"Ei" or his retirement as well. It is the name of the Lord and the Holy One:
**** END BLOCK ****
```

### 21. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 33 — marker `ג`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 33
marker: ג
**** HEBREW ****
<b>ומ"מ חוששת כו'. </b>ת"ה בשם הראב"ד וכ' כמו בי"א יום לר"פ שם ל"ט א' ב' דאמר חוששת אע"ג דלא קבעה והראב"ד אזיל לשיטתו שפסק כר"פ וטעמו ממש"ש ס"ח ב' א"ל ר"ה ב"ח כי אמרינן כו' ואי אמרינן דאף לא חיישא לה כמאן דליתיה דמי וכ' הרשב"א אבל ש"פ פסקו כר"ה בריה דר"י ואפי' בווסת קבוע לא חיישא לה כמש"ש כ"ש בווסת שאינה קבוע דווסתות דרבנן ועוד דאמרינן שם כי אתא רבין וכל כו' וההיא דשם אין ראיה כיון דמסולקת דמים תלינן בכל דהו אע"ג שאינה חוששת כלל. ומ"מ כתב אע"ג שכ"נ עיקר יש לחוש לדברי הרב ז"ל:
**** ENGLISH ****
And from here, he is afraid. He said, “The Lord’s Prayer, and the Holy One, which is the same as the Lord’s Prayer, and that it is the same as the Lord’s Prayer, and that it is the same as the Lord’s Prayer
Dao AG, who is not afraid at all. And he said, “The Lord’s Prayer is the same as the Lord.”
**** END BLOCK ****
```

### 22. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 34 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=34#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 34
marker: א
**** HEBREW ****
<b>מעוברת כו'. </b>שם ט' א' בעא מיניה כו' ה"נ דמיה כו' משמע דא"צ כלל בדיקה ואינה חוששת לו כלל והא דאמרינן בפסחים ע"ב ב' סמוך לווסתה השתא לא קאי אמעוברת. הרא"ש ות"ה בשם תוס' ועי"ל דבשלא הוכר עוברה. ת"ה:
**** ENGLISH ****
It's moving as well. Hashem’s Word says, “The Lord’s Prayer is a test, and he is not afraid of it at all, and he has not been told by the Lord, and he is not a transient musician. The Bible and the name of the Lord, which is not known as the Holy One.  ת:
**** END BLOCK ****
```

### 23. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 34 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=34#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 34
marker: ב
**** HEBREW ****
<b>משהוכר כו'. </b>כנ"ל בסל"ג:
**** ENGLISH ****
Something drunk as a. Same in the basket:
**** END BLOCK ****
```

### 24. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 34 — marker `ג`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=34#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 34
marker: ג
**** HEBREW ****
<b>ומניקה. </b>נלמד ממעוברת וכמש"ל סכ"ח וכנ"ל בסל"ג וז"ש אפילו שופעות כו' כמש"ש בברייתא לר"מ וכנ"ל:
**** ENGLISH ****
and Monica. We will learn from the embryo and the IDF in the basket, and even in the midst of Hashem’s presence in the Holy Spirit, and in the midst of Hashem’s Word:
**** END BLOCK ****
```

### 25. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 34 — marker `ד`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=34#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 34
marker: ד
**** HEBREW ****
<b>עברו כו'. </b>ממש"ש כל ימי עיבורן כל כו' וכמש"ש ט' א' מידי טעמא אלא משום דראשה כו' וה"ה אח"כ וכן למניקה ועבה"ג:
**** ENGLISH ****
It's been called. "All the days of the Lord, all the days of the Lord, shall be established, and shall be exalted, but because of the Lord's wife, and the Lord, and the Son of the Lord," he said
**** END BLOCK ****
```

### 26. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: _
**** HEBREW ****
<b>ועונה בינונית. </b>ממש"ש ט"ו והוא שבא כו' אלמא אך לאחד עונתה חיישינן בראתה אבל ווסת שאינה קבוע אינה חוששת ממ"ש והוא שבא ומצאה כו' אבל לא לראייתה כיון דל"ל ווסת קבוע:
**** ENGLISH ****
and moderate season. Indeed, he who came as a widower, but one of her life-changing season has shown, but a constant menstruation is not afraid of Hashem, and he who has come and found a quaint, but has not been shown to be a permanent menstruation:
**** END BLOCK ****
```

### 27. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: _
**** HEBREW ****
<b>פעמים כו'. </b>עתוס' ס"ד א' ד"ה איתמר כו'. ונראה אף שכתבו תוס' לכ"ע מ"מ לשמואל בעינן ה' וכאן הוא אליבא דרב וכסברא האחרונה שבסעיף ז' וכ"כ בש"ך ע"ש:
**** ENGLISH ****
“Soon times.” Dr. Hossss. And it seems that Hashem’s Word is written in Hashem’s Word, and that it is Hashem’s Word, and that it is Hashem’s Word
**** END BLOCK ****
```

### 28. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: א
**** HEBREW ****
<b>כשם כו'. </b>תוס' בד"ה הנ"ל ועבה"ג:
**** ENGLISH ****
Same as . The Bible and the Holy One:
**** END BLOCK ****
```

### 29. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `ב`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: ב
**** HEBREW ****
<b>אע"פ כו'. </b>שם בתוס' וכן הכריח הראב"ד מדקרי דילוג בפלוגתא דרב ושמואל וערא"ש שם ועבה"ג:
**** ENGLISH ****
P.S.A. There is a name in Hoss, and it is also called by the Rebbe of David Dán in the Penalty and the Holy Qur'an:
**** END BLOCK ****
```

### 30. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: א
**** HEBREW ****
<b>כיצד כו'. </b>כשמואל משום דאמר שם דיקא נמי כו':
**** ENGLISH ****
How to turn. When Hashem says, “Damn’s name is written.”
**** END BLOCK ****
```

### 31. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: ב
**** HEBREW ****
<b>ומיהו כו'. </b>גמ' שם כנ"ל:
**** ENGLISH ****
And who is so. The same name:
**** END BLOCK ****
```

### 32. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: ג
**** HEBREW ****
<b>וי"א כו'. </b>דהלכה כרב באיסורי וכ"פ ברא"ש פ"ד דב"ק:
**** ENGLISH ****
Oh, yes. As a rabbi in Syria and as a result of the Bible:
**** END BLOCK ****
```

### 33. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: _
**** HEBREW ****
<b>ראתה כו'. </b>תוס' ד"ה הנ"ל ור"ח כו':
**** ENGLISH ****
I saw him. The Lord’s Prayer and the Holy One:
**** END BLOCK ****
```

### 34. `siman_189/beur-hagra/part-001.txt` — beur-hagra — seif 9 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 9
marker: _
**** HEBREW ****
<b>ראתה כו'. </b>כמ"ש בפ"ד דב"ק (ל"ז א') ראה שור נגח שור לא נגח כו' ושם (ב') מרמה לווסתות כמ"ש בפלוגתא כו' וקבעה כאן בג"פ כמו שם ועסי"ב:
**** ENGLISH ****
I saw him. As a result of Hashem’s Word, the people of Hashem’s people have not seen Hashem’s wrath, and they are not Hashem’s people
**** END BLOCK ****
```

### 35. `siman_189/chiddushei-hilkhot-niddah/part-001.txt` — chiddushei-hilkhot-niddah — seif 12 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=12#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: chiddushei-hilkhot-niddah
seif: 12
marker: _
**** HEBREW ****
וסת הסירוג וכו' הש"ך סקכ"ו העלה דאם ראתה בשבט אדר ניסן ואח"כ ראתה בסיון אב חשבינן ניסן לוסת הקבוע ואין כאן רק שני פעמים לסירוג ע"ש ותמהני דהחליט הדבר דהא בגמ' דב"ק הנ"ל מבעי לי' שור שנגח ה' ו' שבת שבת ושבת שבת להך יומא קמא שדינן ואייעד לכולי יומא או לשבת בתרא שדינן ולא אייעד אלא לשבתות ועלתה בתיקו וכן הרמב"ם בהלכות נ"מ פ"ו כתב דהוא ספק וא"כ הדברים דומי' למ"ש כאן בלי הבדל כלל והדבר ספק ואם אמרו בתיקו במילת' דרבנן ספיקא להקל אף כאן יש לילך לקולא בכל צד ולומר דקבעה וסת לסירוג ולא לכל חודש וא"צ לחוש רק מב' לב' חדשים ולא לכל חודש וחודש דהא בגמ' מדמי שור לוסת וכמ"ש כל הפוסקים וברור. עב"קא:
**** ENGLISH ****
“And the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, has not been given to him, nor is it possible for him to return to the earth, and he has not been given to him.”
A line in Milth Darinen Spike makes it easier even here, I will go to the cable on each side and say that it is determined, not for each month, and I will feel only a new heart, not for each month and a month of the month of the month of Dea in the Gram of Los Angeles and as a result of all stripes and clear. UFO:
**** END BLOCK ****
```

### 36. `siman_189/chiddushei-hilkhot-niddah/part-001.txt` — chiddushei-hilkhot-niddah — seif 13 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=13#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: chiddushei-hilkhot-niddah
seif: 13
marker: א
**** HEBREW ****
האשה שראתה הש"ך בסק"ל האריך והעלה דעונ' בינוני' הנזכרת במקומות רבות הוא לפעמי' ביום ל' לראי' ראשונה בכלל ולפעמי' מיום ל"א לראי' ראשונה דהכל תלי' בקביעות החודש כי וסת החודש ועונה בינוני' אחת היא ולכך הראב"ד בבעל נפש הזכיר וסת חודש ולא הזכיר כלל מעונה בינונ' ולעומת זה הרשב"א כתב שצריכה לחוש לעונה בינוני' ולא הזכיר וסת חודש אלא וודאי דא ודא אחת היא ע"ש שהאריך ועיין בתשובת הגאון מהר"צ סי' קי"ד דהאריך לדחו' דברי הש"ך וכל ראי' שלו מדחי לדחי ובאמת בראי' מהר"צ לדחו' דברי הש"ך אינו ראי' חזקה כראוי מוצק ויש פנים לכאן ולכאן אלא במה שהקשה דהרשב"א בת"ה דף קס"ט הוציא קביעות וסת חודש מהך דראת' בט"ו לחודש זה וכו' ואולם עונה בינוני' יליף לה הרשב"א בדף קס"ד מהך דבא ומצאה תוך ימי עונת' ואלו דין א' הוא טורח שתי ראי' משני מקומות מתחלפות ל"ל זו היא קושי' גדולה להש"ך ובאמת אני אומר אלו דעת הש"ך דאין הבדל כלל למצוא בין וסת החודש לעונה בינוני' יקרה בזה בטולי' רבים חדא קושי' מהר"צ הנ"ל ועוד בריש סי' זה ס"ב מפרש המחבר וכן הטור אופני הוסת בוסת היום וסת הפלגות וסת החודש כסדר זאח"ז ואח"כ כתב בסעיף ד' עוד יש חילוק בין קבוע לאינו קבוע שקבוע אם עברה עונתה אעפ"י שלא הרגיש' אסורה לשמש עד שתבדוק ושנא קבעתו הגיע וסת ולא בדקה ולא ראתה ועברה עונתו מותרת ע"כ וזה מבואר דאף על וסת חודש קאי דבה מסיי' בסעיף ב' ואלו לדעת הש"ך הא ליתא דהוא עונה בינוני' ובעונה בינונית אם עברה צריכה בדיקה כמו ביש לה וסת כמבואר שם בש"ע ולכן צ"ל דבאמת אף לדברי הש"ך יש כאן הבדל רב בין עונת בינונית לוסת החודש דאם ראתה בר"ח וחזרה וראתה בכ' בו אם אתה אומר עונה בינונית אין כאו חשש בר"ח שאחריו כי עונה בינונית הוא הבדל ל' או ל"א כפי קביעות החדשים: אבל עכ"פ הוא הבדל בין ראי' לראי' כי דרך הנשים לראות מל' לל' והיינו שיש הבדל בניהם וא"כ זהו שראתה בכ' בו אין לחוש ביו"ד ימים שלאחריו כאותו שאמרו בהפלגות וכמש"ל משא"כ לוסת חודש שצריכה לחוש בהגיע ר"ח אף דהיא ראתה זה עשר ימי' העברו ועוד אם יש לו וסת קבוע להפלגה ד"מ ממ' למ' ושוב ראתה בר"ח אם אתה אומר משום עונה בינונית כי אמרינן עונה בינונית באין לה וסת אבל זו שיש לה אינה חוששת וא"כ א"צ לחוש לר"ח הבא משא"כ וסת חודש עכ"פ צריכ' לחוש בהגיע ר"ח השנת דאולי תקב' וסת חודש וסת בתוך וסתי כנודע ואולם ההיפוך ג"כ בראת' בר"ח בקפיצות והגיע ר"ח ולא קפצה א"צ לחוש לר"ח משום וסת החודש הואיל היותו מורכב עם קפיצות והא לא קפצה משא"כ עונה בינונית מ"מ צריכה לחוש כדין אשה שאין לה וסת כלל וכמבואר לעיל סימן קפ"ד בסופו ע"ש ובב"י וברשב"א ועוד נראה לומר דהא דאמרינן בסעיף זה דאם קבעה וסת ליום אינה חוששת בלילה וכן להיפוך הוא בענין וסת דזה תליא בלמודה לראות ביום או בלילה אבל עונה בינוני' דאמרינן דרך נשים לראות מל' לל' ז"א תלוי ביום או בלילה רק אפילו אם רגילה לראות ביום כשיגיע יומו של ל' כל הלילה ויום אסור דהא לא משום וסת אתינן עלי' וזה לפענ"ד ברור ולא נמצא בפוסקים שאף עונה בינונית צריך להיות יום או לילה בשעה שהיא רגילה לראות: ובפרט החילוק שכתבתי יש דמחמת וסת החודש כל זמן שלא נקבע א"צ בדיקה בעברה עונתה משא"כ בעונה בינונית וא"כ יש כאן הבדל בין שניהם בדברי שונים וא"כ לק"מ ברשב"א דקבע לכל א' ענין בפ"ע וממקום דלמד וסת החודש לא למד עונה בינוני' כי טיבו של זה לא כשל זה אך לפ"ד גם ראי' הש"ך הואיל והראב"ד ויתר פוסקים השמיטו עונה בינונית ש"מ דס"ל דהוא היא וסת חודש נסתר' דאף דנודה לדברו דגם עונה בינונית תלוי ועומד בקביעות חודש ופעמים שהיא יום ל' לראי' ופעמים ל"א מ"מ הא דין והבדל גדול יש בינו לוסת החודש ועדיין ה"ל להודיעו וללמדנו דינו:   והנה זה דפי' עונה בינונית ל' יום היינו ביום למ"ד לראי' ד"מ אם ראתה בר"ח ניסן הראי' שניה בל' לניסן א"צ ראי' כי מבואר בגמ' באמרו אם עברה ג' עונות ולא ראתה די' שעתה ופריך כמה עונה ואמרינן אמר רבא אמר ר"ח כ"ג ימים ימי טהרה וז' ימים ימי טומא' (כן הוא גי' ר"ח ולדינא אין הבדל בין גי' רש"י ע"ש) ולפ"ז בראתה בא' בניסן משלמי כ"ג ימי טהרה בל' בניסן ואם עברה עונה זו ולא ראתה ואתחזיק כן ג' פעמים הרי זה בחזקת אינו רואה וקשה הא כל נשים אינן רואה כי אם ביום ל"א וא"כ תמיד עובר כ"ג ימי טהרה וז' ימי טומאה והאשה אינו רואה בהן ומה חזקת עקירה יש כאן ותחזק לאינו רואה בעברה ג"פ דהא תמיד אינ' רואה כן והל"ל שעברו כ"ד ימי טהרה ולא ראתה בהן ועכצ"ל דדרך לאשה לראות בכ"ג ימי' לטהרתה והוא יום ל' של ניסן וזה לענ"ד פשוט וברור וא"כ יצטרך הש"ך לדחוק ולומר דמיירי בקביעות החודש חסר והדוחק זה מבואר למה בחר ר"ת בלשונו כ"ג ימי טהרה בקביעות חדש חסר ולא כ"ד ימי טהרה בקביעות חודש מלא ובפרט שהוא אמר כן על שעברה עלי' ג' עונות ובג' חדשים כמעט א"א שכולן יהי' רצופים וחסרים ולא ימלט שבתוכן א' מלא וא"כ אין זה מוגבל בזמן לומר כ"ג ימי טהרה דאז צריכה כ"ד ימי טהרה וז' ימי נדה:   ועוד ראי' ברורה לדברי רש"י דפי' בפ"ב דנדה דף ט"ו ל"ש שלא הגיע ימי וסתה דקאי על שבא ומצאה תוך ימי עונתה ומזה מבואר דס"ל לרש"י ואפי' ביש לה וסת צריכה לחוש לעונה בינוני' וכמ"ש הר"ן להדיא בחדושיו לנדה בדברי רש"י אפי' ביש לה וסת צריכה לעונה בינונית וא"כ קשי' מהך דתנן בדף ס"ד הי' למודה וכו' שינתה לי"ח הותרו כולן ואינו אסור אלא משמונה עשרה ואילך ועי' רש"י דאפי' י"ח אינו חוששת הואיל וקבעה לה וסת לדילוג וקשה הא מ"מ חוששת לי"ח משום עונה בינוני' הנ"ל ואיך אמרו הותרו כולם ודוחק לומר דמיירי באופן דראתה בנתיים דאזלא עונה בינוני' וכמש"ל דהך דוחק לפרש דסתמ' אמרינן הותרו כולם (והלא זה כל ראי' הש"ך דכתב הרמב"ן דחושש' לוסת זה ולא לעונה בינוני' ומכ"ש דא"א לפרש כן בבריית') וזה ברור דעונה בינוני' אינו בי"ח:   ועוד קשה א"כ מנ"ל לגמר' דב"ק לדמות הך שור שנגח בט"ו וכו' להך דהכא דראתה בט"ו לחודש דלמא גבי אשה דדרך נשים לראות מעונה לעונה שהיא וסת החודש אמרינן דקבעה וסת אפי' בדילוג אבל מנלן לומר בשור דלא שייך עונה בינוני' לחוש לוסת החודש דלמא וסת חודש לא אמרינן כלל כי לא מצינו כלל במשנה וסת חודש רק מהך דרב ושמואל ומנ"ל וסת החודש בשור באשה שאני שהוא עונ' בינוני' א"ו עונה בינוני' אין ענין כלל להך דוסת החודש:   ועוד ראי' ברורה מדברי הרשב"א וטור וש"ע לקמן בסעיף כ"ז ראתה שלש ראי' מג' עונת מכוונות ולא פיחתה ולא הותירה נתגלה שדילג ראשון אינו סילק דמים אלא שינוי וסת לפיכך ראי' ראשונה וכו' מצטרפות ונמצא ד' ראי' וג' הפלגות בניהם מצ' לצ' וכן הוא בטור ולדברי הש"ך הנך ג' עונת הן ג' חדשים וא"כ לפי קביעות החדשים אי אתה מוצא בט' חדשים נחלקים לג' ג' חדשים שיהי' מכוונים בימים וע"כ אתה תצריך ליתן לכל ג' עונות ב' חסרים וא' מלא או להיפוך וזה אינו בקביעות שיהי' זה רצוף ט' חדשים זא"ז ותמיד בכל ג' חדשים שני מלאים וא' חסר או שנים חסירים וא' מלא ולא תמצא אלא בשנה מעוברת ושלימה דאז ישנו במציאת שדלגה אלול תשרי חשוון הרי שני מלאים ואחד חסר וכן כסליו טבת שבט שאז כסליו טבת מלא ושבט חסר והרי שני מלאים ואחד חסר וכן אדר ראשון אדר שני ניסן שני מלאים ואחד חסר: וזולת זה אינו במציאת כלל וא"כ קשה איך קאמרו הפוסקים בכוונה ראי' בדילוג ג' ג' עונת שיש כאן שלשה הפלגות שוות לא כן הוא לדברי הש"ך אחד מעדיף ואחד ממעיט וביותר קשה על הגמ' דפריך בנדה דדף ט' כוונה הא קבעה לה וסת ומה קביעות וסת יש כאן הא אין הפלגות שוות כלל כמ"ש ונ"ל דקושי' הגמ' לא מכח הפלגה רק מכח וסת הסירוג דמ"ש שסירגה מב' חדשים לב' חדשים או מג' לג' חדשים וא"כ היא שראתה ג"פ בסוף ג' חדשים הרי כאן וסת החודש בסירוג מג' לג' חדשים דא"כ להנך פוסקים דלא ס"ל וסת הסירוג וכמש"ל א"כ קו' הגמ' איך יתכן אליביהו. ואדרבה מכאן קשה על הטור וש"ע דפסקו וסת הסירוג למה פירשו דראתה ג"פ בג' עונות מכוונת דה"ל וסת הפלגה כלשון רשב"א ולא כתבו דקבעה וסת הסירוג ואפשר לפקפק ולומר דלמה צריך להיות ג"פ בהפסק ג' עונות הלא ב"פ בהפסק ג' עונות קבעה לה וסת דראי' ראשונ' מצטרפת לפי דעת הטור והש"ע וא"כ קבע' וסת הסירוג בג' ראי' אלא שזה יש לדחות ולומר דבעי ג' ראי' להחזיקה בחזקת רואה וכו' אבל מ"מ דברי הטור והש"ע דבחרו בוסת הפלגה והניחו וסת הסירוג הדבר מבואר דאינו תלוי' כלל בחדשים רק בימי' וצ"ל ימים ל"ד רק סכום מנין הקרוב לצ' כדרך הגמ' ופוסקים וכמ"ש הרא"ש בכמה דוכת' ועיין במהר"צ הנ"ל שהאריך בזה וא"כ יש כאן הפלגות שות ולא יתכן וסת הסירוג דאינו מכווני' החדשים דהן קצתן מלאי' וקצתן חסירי' ועונת הפסקה הם מכווני' בימים שוים וזה ברור ומוכרח בלי פקפק:   אמת שמדברי תוס' ד"ה פיחתה וכו' משמע קצת כדברי הש"ך דהקשו על רש"י דפי' דהתירה לצ"א צ"ב צ"ג דהא הוי וסת הדילוג לרב ותי' בהפלג' בעינן לכ"ע ד' ראי' וקשה ממנ"פ אם אנו מונין הך ראי' ראשונה טרם שהפסיק' ג' עונת בכלל הרי כאן ד' ראיות וג' הפלגות וב' דלוגין ואם אנו אמרינן הואיל והפסיקה ג' עונת בטלה הראי' ראשונה שהי' רק במקר' וא"כ אין כאן רק שני הפלגות א"כ מה פריך הגמ' כונה הא קבעי' וסת הא אין כאן רק שני הפלגות דהא ראי' ראשונה קודם הפסקה אינו מהמנין. וצ"ל דלעולם ראי' ראשונה אינו מהמנין וקושית הגמ' דקבע לה וסת לא מתורת וסת הפלגה דא"כ רק שני הפלגות רק מכח וסת הסירוג מג' חדשים לג' חדשים וא"כ לכאורה דברי הש"ך מוכרחין אך כבר כתבתי לעיל דדעת התוס' בסירוג מספקא לן ועמש"ל וי"ל דאם ראתה בסוף צ' ימים וד"מ חל בא' בשבת א"כ כשראתה שני' בסוף ל' ראתה ביום ו' בשבת וכשחזרה לראות בסוף צ' ראתה בד' בשבת וא"כ הרי כאן לרב וסת בדילוג למפרע בשבוע מב' ימים לב' ימים וא"כ קושית הגמ' לרב דהא קבע לי' לוסת בדילג בשבוע כשכונ' ורב הך ברייתא איך מתוקמי ליה ואפי' אם נפרש דקו' מסירוג חדשים לשיטת תוס' ורש"י ג"כ רק לרב כמש"ל. ובהכי ניחא דנקט הש"ע ד' הפלגות ולא נקט וסת הדילוג וכמש"ל דכל דנוכל לתלות בוסת שוה לא אמרינן בדילוג קבעה וכמש"ל ודברי התוס' וש"ע מכוונים. ועוד אפשר לומר דס"ל לתוס' דודאי שספק אי ראי' ראשונה מהמנין או לא ולכך בוסת השוה דהוא שכיח בנשים אמרינן דראי' ראשונה לא הי' מקרה רק וסת דשינתה והיא מהמנין וקושית הגמ' שפיר הא קבעה לה וסת משא"כ שוסת הדילוג דלא שכיח כלל כמש"ל לא אמרינן דראי' ראשונה מהמנין לשווי' ליה וסת דהוא לא שכיח ואם באנו לומר מילתא דלא שכיח אף אנו אומרין מקרה היא ראי' ראשונה ואינו בכלל ואי דלא שכיח הא אף זה לא שכיח ומ"ש זה מזה משא"כ בוסת השוה דשכיח והך דראי' ראשונה מקרה הי' לא שכיח ודחינן מילתא דלא שכיח מקמי' מילתא דשכיח ודברי התוס' פשוטין והמעיין יבחר. עכ"פ תבנא לדינא דהך מילתא דש"ך ליתא וכמ"ש הגאון מהר"ץ והנכון כמ"ש כל המחברין וכן השל"ה דעונה בינונית הוא יום ל' בצירוף ראי' ראשונה ולכך כתב הרמב"ם בלשונו ג' עונת ג' חדשים כי חודש הוא מורה על חסר כדאמרינן בר"ה מ"ש שלשי' ידעו חדש נמי ידעו הרי מבואר דסתם חודש כונתו חסר כאשר האריך הרב מהר"צ בראי' ולזאת כתב הרמב"ם ג' חדשים הרצון ג' חסירין. אבל מה שלא הזכיר הרמב"ם והראב"ד עונה בינונית היא דלא ס"ל כלל עונה בינונית כמ"ש הר"ן דהרי"ף והרמב"ם מפרשי על שבא בתוך ימי עונתה היינו בתוך ימי וסתה ולא ס"ל כלל הך דעונה בינונית וברור דגם הראב"ד ס"ל כן ולכך לא הביאו כלל בבעל הנפש ואין כאן דקדוק כי אם בדברי הרמב"ן דהוא ס"ל באמת כן וכמ"ש במטבע הקצר שלו ובזו כבר דיבר הרב מהר"צ דסמך עצמו אמ"ש בפעם אחר דאטו כרוכלין לחשוב אף גם נ"ל דמיירי באשה שיש לה וסת ורואה עכשיו מחדש בר"ח ניסן דיש לחוש לכל החששות שכתב הרמב"ן דאשה קובע וסת בתוך וסת וא"כ אין כאן עונה בינונית הואיל וכבר יש לה וסת כנודע וכמש"ל ואין דקדוק זו כדאי להרס פינות ויסודי וסת המסורה ביד חכמים ועל ראשונים אנו מצטערין לומר בוסת החודש שפורא קגרים כאשר כתב הרמב"ן ורא"ה ור"ן ועמש"ל ודי שנאמר שבפרקים יזדמן כן שהטבע ישונה עפ"י קביעות ב"ד שלמטה ומשמי' הסכימו על ידם לתת משטרים במהלכי נבוכה אשר עפ"י דרכי ב"ד יהלו אורן וחיצי השפעתן אלא שהוא מגלגל עלינו לומר כן ברוב נשים דהא עונה בינונית היא דבר תמידי הנוהג ברוב נשים כמ"ש המחברים שישנו תפקידם ואורח נשים לפי קביעות ב"ד ויהי' זה שכיח בכל הנשים כצדיק וכרשע עובד אלקים ואינו עובד וכמעט לדעתי מהנמנע וגם הרא"ה בב"ה בדף קס"ט מ"ב כתב בוסת הדילוג לרב אליבי' דרבי בשתי ראי' בט"ו ובי"ו הוי וסת הדילוג כיון דליכא עונה בינונית ולא השוה לימי חודש לאלתר אמרינן דוסתה לדילוג וזה מבואר דשוי' ימי חודש ועונה בינונית תרי מילי נינהו ואין עונה בינונית תלוי כלל בשוי' ימי החודש והרא"ה כתב כן לשיטת הרשב"א דאיהו גופ' לא ס"ל כלל עונה בינונית כמ"ש בדף קס"ז ע"ב והרי הדבר מבואר דלא כש"ך וכן נכון:
**** ENGLISH ****
The woman who saw the Lord in the Old Testament and raised a medium-sized book in many places is twice a day for the first of all, and twice, from the day of the first verse, and from the beginning of the month, he said, “This is not a single one-year-old, nor does he mention a month of age.”
“The Lord’s words and all His eyes are strong, and there is nothing to do with me, but in what is hard to do with the Lord’s words, Hashem forbids you from having a strong look at your hands, and this is what is the case for you, and this is the case of the Lord’s Prayer
And it is between the end of the month for a medium season that will happen in many of us that we will have difficulty in this day and the end of the month as the order of this year, and that the author will be interpreted and the bicycle is held at the top of the day, and the end of the month, which is not permitted to be seen in the section of the month, and that it is not permitted to be seen in the case of the season
Hashem’s Word is a medium and medium season, if it has undergone an examination like a buffer named after the Bible, and therefore, the Bible has a profound difference between the mid-season and the end of the month, if it has seen a word and a difference in it if you say a moderate season, there is no fear that after a season, it is a difference between the New Testaments
It is not possible to feel that after his death, he was told by the fact that he had been in the past, and that he had a permanent end to the fact that he had to be able to see him, and again he had seen him, if he had to do so, that he would not be able to see him
He said, “I am not afraid of Hashem’s people, and I will not be able to see Hashem’s presence in the end of the day, and I will not be able to do so, and I will not be able to see it in the end of the day.”
On a day or night only if it is normal to see on a day when L's day is reached, and it is not a day or night when it is normal to see: and in particular, the burden I have written is clear and the end of the month, and it is not determined in the past that there is a difference between the two of them, and the difference between the two of them is in the period
He did not learn from a medium season that this was not the case of this, but also to the end of the Lord’s Prayer, and to the end of the day, he said, “This is the day of the Lord’s Prayer, and that it is the day of the Lord’s Prayer.”
Hashem’s Word tells us that Hashem’s people will not be able to see Hashem’s Word, and they will not see Hashem’s Word, and they will not see Hashem’s promise of Hashem’s mercy, and that Hashem’s people will not see Hashem’s promise
And one hundred and a woman does not see them, and what is strong about displacement is here, and will not see them in the past, and Hashem has always seen it, and He is the day of Nissan, and this is a simple and clear day, and will not be seen as a result of Hashem’s promise, and he will always say, “This is not a new day.”
A new season, almost no matter how long it is to say that all of them will be a continuous and inexperienced, and that it is not limited in time to say that “the day of the day of the day of the day of the day of the day, and that it will not come to the end of the day.”
The Lord’s Prayer is not made up of Hashem’s Word, but rather from Hashem’s Word, and Hashem’s Word is not revealed to Him, and He is not Hashem’s Word, and He is not Hashem’s Word
It is clear that a medium-sized season is not in the Bible: and it is still difficult for a woman to see a season of the season she and the end of the month that she is determined, and so on, that she is not allowed to say that she is a month of age, and that she is not a single one of the same
In the middle season, there is nothing to do with this month’s silence: and another clear look at the words of the psalmist, and to the point of view of the Lord’s prayer, and not to be revealed that the first round is not a change, but rather a change, and so that the first verse is joined by the New Testament
And so you will need to give every G-d full of or reverse, and it is not regularly that this is a new G-d and always in every new two-year-old full and missing and full-year-old, and you will not find only a passing year, and then you will find that this skipping is full of two, and one is inexpensive
And it is so hard how the occupiers deliberately say, in the D.J. season here that some equal peaks are not so, in the words of a single Bible prefers and one of the highlights and more difficult on the Duffricho in Uganda, the intention of the Lord, and what is wrong here, is no equal cruises at all as a new one
And then, you are going to stop at the end of Hashem’s covenant with Hashem’s Word and Hashem’s Word, how is it possible for Him. And I will tell you from here it is hard on the column and that it will not be written in the end of the verse and that it is possible to doubt and say to Dalama that the non-revolutionary spring should be “inhabited” in the G-d and that it should be rejected and said that it should be rejected in the case of G-d, and that it is not the case of Hashem’s judgment
I will hold on to the holding of a seer and so on, but from the words of the column and the IDF, they will be chosen as a sailor and put it in the direction of the Redeemer, and it is only a few days when it comes to the Lord, and it is not clear that it is a bit of the time that the Lord is speaking, and that it is not possible that it is a bit of Hashem’s name
The Lord’s Prayer is a bit like the Lord’s Prayer, and so on, Hashem’s Word, and Hashem’s Word, and Hashem’s Word is not the same as Hashem’s Word
First of all, a break is not a man. The first verse is not from the man and the difficulty of the Lord’s promise to him, and to the end of the Lord’s Prayer, and to the end of the day, the two of them have been given to him, and he has seen him in the end of the day, and he has seen him in the end of the day
In the morning of the day of the day of the day of the Lord’s Prayer, Hashem’s promise to me is that the Lord of the Holy Spirit is in the midst of Hashem’s Word, and that Hashem’s people will be blessed with Hashem’s promise to do so. And with Hashem’s promise, Hashem’s promise is not to be done, and Hashem’s Word is not in charge, and Hashem’s Word is not in charge. It is also possible to say that the High Court of Laus is the first non-seeker of the Mannon or not, and so is the Boss of the Shoah
It is common in women who say that the first is not a case of just a degradation and that it is not the first time of Hashem’s word, and that it is not common, and if we have come to say that the word is not common, it is not common, and it is not common
Hashem’s Word and the Word of the Holy Spirit and the Word of the Lord will choose. The Lord’s Prayer, and the Lord’s Prayer, is Hashem’s Word and His Word, and He is Hashem’s Word, and His Word is Hashem’s Word, and He is the Lord’s Prayer. But what didn't mention
The Ramban and the Sages answered in the middle of the day, as it was written, “The Lord’s Prayer, and the Holy One, who came in the midst of his life, was not in the midst of his life, nor did he mention that he was in the midst of his life, and that he would not be able to believe in the Lord’s words, and that he would not be able to believe in his own words
The psalmist says, “There is no reason for Hashem’s people, and there is no reason for Hashem’s mercy and mercy, and it is not for them to be seen in Hashem’s presence, and that it is not the same as the Lord’s Prayer, and that it is the same as the Lord’s Prayer.”
Ran and his influence, but he rolls on us to say so in most women a moderate dea is a constant thing that is used in most women as “the authors who have their role and the guest of women according to Dr. and that it is common in all women as a righteous and evil servant and does not work and almost in my opinion, from the avoidance and also demonstrated in the name of the X-Qatt on the basis of the logic of the law.”
From the beginning of the day of the month and the medium season of Millie Nina and there is no moderate season depending on the days of the month, and the petitioner wrote: "This is true," and also true:
**** END BLOCK ****
```

### 37. `siman_189/chiddushei-hilkhot-niddah/part-001.txt` — chiddushei-hilkhot-niddah — seif 13 — marker `ב`

- Quality: **error** — chunk_seam_duplicate, divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=13#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: chiddushei-hilkhot-niddah
seif: 13
marker: ב
**** HEBREW ****
או לא ראתה בו הש"ך בס"ק ל"א מסכים עם הב"י והב"ח דצ"ל לא ראתה אבל ראתה א"כ בטלה הפלגה דעשרים דהרי ראתה רצוף י"ב ימים מן ראי' דעשרים וא"כ איך אפשר לחוש לט' באייר והט"ז בסקי"ח מסכים לרמ"א דאין הראי' שראתה בתוך ימי הפלגה מבטל להפלגה קמייתא דהואיל דחזינן דשינתה לקרב אמרינן תוספת דמים בעלמא ומ"מ אורח בזמנו יבא בהפלגה הקבוע בלי ביטול כלל מהך ראי' שבנתיי' ע"ש והמ"י הסכים עם הט"ז להיות מבואר כן בראב"ד בספר בעל נפש ואני אומר כי לכאור' יש ראי' לדברי הט"ז מגמ' דף י"א דפרכינן על הא דתנן דבתוך ימי נידתה א"צ בדיקה למ"ד דקבעה ליה וסת בימי נידתה תבדוק דלמא קבעה ליה וסת ע"ש וקשה ולר"ל דס"ל לא קבעה לי' וסת מי ניחא עדיין תבדוק דאם וסתה בר"ח בששה לחודש תבדוק דאם תראה א"כ הפלגה שלה מתחיל מו' ולא מר"ח ויהי' ר"ח הבא בתוך ימי וסתה וששה לאחריו בימי וסתה ומשנה סתמ' קתני אין צריכה לבדוק אפי' יש לה וסת הפלגה מל' לל'. אך לעומת זה יש ראי' לדברי הש"ך מסוף בנות כותים דהקשה הגמ' אר"פ לר"ה בר"י מהא דר"י דאין אשה קובעת וסת בימי נידותה ואמרינן מה לאו בכה"ג דחזאי ר"ח וה' בו ר"ח וה' בו והשתא חזאי בה' בירחא ולא בירחא וקרי' לי' ימי נידותה אלמא מריש ירחא מנינא והקשה הר"ן בחדושי' עדיין היכי מוכח כדמעיקרא נקטי' דאפי' תימא כדלקמי' נקטי' הרי ראוי' לראות בריש ירחא שכך דרכה לראות מחודש לחודש הלכך אפי' תימא כדלקמי' נקטי' ראי' דה' בירחא בתוך ימי נידתה קיימא ותירץ הר"ן דהב"ע שהוחזקה לראות ג"פ מר"ח לר"ח ובפעמים ראתה ג"כ בה' בירחא ואלו הוה אמרינן כדלקמי' נקטי' ה"ל למימר שכיון שהוחזק' לראות בהפלגה של ל' כשהיא חוזרת לראות בה' בירחא שתפלוג ג"כ שלשים ולא תראה עד ה' בירח' וא"כ אין ה' בו בימי נידתה דאז מתחיל הוסת ומדקאמר דהוא בימי נידת' ש"מ כדמעיקר' נקטי' וכו' וע"ז תי' הגמ' דמיירי באופן אחר ע"ש הרי לפי דקיי"ל כר"ה בר"י אם הי' הפלגה מל' לל' וראתה ביום ל' וה' ימים לאחריו אזי הפלגה ההוא מונין מיום ה' שלאחריו יום שלשים ולא מיום ל' כדמעיקרא וזה ברור דלא כט"ז דס"ל דמונין הפלגה מיום הקדם כי מה ששינתה לקרב אין מזיק וזהו מבואר בדברי הר"ן:   והנה הראב"ד בבעל נפש יצא לדון בדבר אחר והוא דדעתו ראתה בא' בניסן וכ' בו וראתה בר"ח אייר הואיל ור"ח אייר בתוך ימי זיבה דראי' כ' וקי"ל אין אשה קובעת וסת בימי זיבה הך ראי' אינו סותרת ואינו עולה. ולכך חוששת לט' באייר מהפלגת כ' בניסן ומ"מ הואיל ור"ח אייר הי' בהפלגה י"ב ימים מכ' ניסן חוששת גם לכ' באייר מפני הפלגה י"ב ימים מט' באייר ושניהן בימי זיבה (ואף כי בלא"ה חוששת לכ' באייר מוסת החודש דהא ראתה בכ' בניסן צ"ל דנתכוין דאם ראתה בכ' באייר דחוששת לב' בסיון שהוא ג"כ הפלגה י"ב ימים דאייר חסר) וכן לעולם עד שתעקר פ"א ע"ש הרי ברור דלא בשביל טעמו של ט"ז דשינתה לקרב וכמו שחשב בעל מ"י והביא לעזר לט"ז רק טעמו הואיל וראתה בתוך ימי זיבה אין ראי' זו עולה וסותר כלל וכן דעתו להדי' בראתה ששה פעמים בהפלגת ט"ו יום דקבע' וסת לכ"ט כ"ט דרואין אמצעית שהי' בתוך ימי זיבה כאלו אינן והרי היא רואה מכ"ט הא אלו הי' רואה מחמשים לחמשים יום וביום עשרים לראי' ראתה מודה הראב"ד לדעת הש"ך ואינו מתחיל הפלגה רק מיום עשרים אע"פ ששינתה לקרב הואיל והך ראי' לאו בימי זיבה חזאי דכל טעמא של הראב"ד מבואר מחמת ימי זיבה ובהך דינא מלבד דהרז"ה השיג עליו בהשגותיו דלא אמרינן בראי' רואין אמצעי' כאלו אינן אף גם כפי מ"ש הר"ן בס"פ בנות כותים הרמב"ן חולק עליו דאיך אפשר לומר ברואה מט"ו לט"ו דנימא סלק ט"ו אמצעי' מבניהן והרי היא רואה מכ"ט לכ"ט הא מט"ו לט"ו חזי' והוסיף הרמב"ן כמ"ש הר"ן והטור ורשב"א דעכשיו קבעה וסת לימי זיבה כמש"ל וא"כ הך דינא ליתא ואין כחן סיוע לדברי הט"ז רק סתירה ולכן הרמב"ן דס"ל דקבעה וסת בימי זיבה כתב במתכוין לא ראתה בר"ח דאל"כ בטלה הפלגה ומעתה ל"ק לרמב"ן כמש"ל מהך דא"צ לבדוק בתוך ימי נידתה דלדינא דגמ' מודה אפשר הרמב"ן להראב"ד דהואיל דחזי' בימי נדה טפילים לראיה קמייתא ואינו מבטלת הפלגה והרמב"ן דכתב לא ראתה הוא לדידן דאין משגיחין בימי זיבה כלל אך לר"ן דפירש בגמ' דחזי' בר"ח ובחמשה דאמרינן דהפלגה מתחיל מה' ואילך ועד ה' בחודש שלאחריו אין חוששת לוסתה קשי' הך דלעיל דלמה לא תבדוק בתוך ימי נידתה למען דעת מנין תחול למנות ימי הפלגתה והי' נראה לומר דודאי סברת הט"ז נכונה דבשביל ששינת' לקרב לא אמרינן דהפסיד הפלגתה והוא ביש לה וסת קבוע להפלגה ולכך בשינתה לקרב אמרינן תוספת דמי' בעלמא קחזי' וממקום שט"ז מביא ראי' שם מיירי בלמודה לראות דהי' לה וסת קבוע אבל וסת הפלגה הקבוע לא זז ממקומו אבל קודם שקבעה וסת הפלגת' וחזי' דמים סמוכים לראי' ראשונה לא אמרינן תוספת דמים דמהיכי תית' רק אמרינן דשינת' וסתה דהא אין כאן קביעות וסת מקדם ומה חזית דאזלת בתר מעיקרא דלמא בתר ראי' זו ועוד כיון דכל עצמותו של וסת הוא דאורח בזמנו בא איך נחוש דתראה ותסתור הפלגה שלה א"כ האורח מקדים לבא ואנן אמרינן בזמנו בא ולכך ביש לה וסת א"צ לחוש דלמא תקדים לראות ודי' שעתה ואיך נחוש שתסתור הפלגתה משא"כ דלמא קבעה לי' וסת שפיר פרכינן דאשה קובעת וסת בתוך ימי וסת ואין כאן סתירה לוסת הראשונה ולכך לעיל דקאי על אשה שיש לה וסת כמבואר אע"פ שאמרה די' שעתה ופי' רש"י ביש לה וסת צריכה להיות בודקת וכו' חוץ מהנדה ולכך אמרינן דאף דתראה לא סותרה הפלגה הראשונה הקבוע אבל לקמן בפ' ב"כ דעדיין לא קבעה שפיר מונין ההפלגה מראי' שניה ולא אמרינן תוספת דמים הן. אך אף כי סברא זו נכונה מ"מ לא נחה דעתי לומר דלעיל במשנה דקתני דנדה א"צ לבדוק איירי רק ביש לה וסת ולא באין לה וסת וצ"ע לישב בדוחק אבל מ"מ האמת מכון בדברי ש"ע וטור ורמב"ן דוקא לא ראתה אבל ראתה סותרת הפלגה וברור ותמהני על כל אחרונים שלא נחתו לעיין כל צורך בבעל הנפש וכמש"ל:   אלא שיש לדקדק לרמ"א דגריס ראתה בר"ח אך הרי כאן מכ' ניסן עד ר"ח אייר הפלגה י"ב ימים וא"כ בי"ב באייר יש לה לחוש ג"כ משום בי"ב ימים בהפלגה דהא ראתה בר"ח אייר והך ראי' בט' באייר אינו מבטל הפלגה ובפרט דהא כתב או לא ראתה בט' באייר א"כ הרי כאן הפלגה י"ב ימים ובראב"ד הנ"ל מבואר כן דיש כאן חשש וסת בהפלגת י"ב ימים וע"ש שדעתו שמתחילות מט' באייר שראתה בו אבל זה א"א לישב לרמ"א וכן יש להקשות כשראתה בט' בו א"כ הרי הפלגה מט' לט' וא"כ בח"י בו חל לחוש מט' לט' ולכן צ"ל ברמ"א מטעם אחר ממ"ש הט"ז רק ס"ל לרמ"א הואיל וראתה בר"ח וראתה בכ' בו אמרינן דתרי מיני וסת הן מה שראתה בר"ח אח"כ לא משום וסת הפלגה נדה רק משום וסת החודש ולכך היא רואה מחודש לחודש מה שראתה בכ' בו הוא מוסת הפלגה ותראה בהפלגה כ' לכ' או גם זה וסת החודש בכ' בחודש ולכך אין ראי' ר"ח אייר ענין כלל להפלגה עד שנאמר שיש כאן הפלגה י"ב אך ט' כי זה ראי' ר"ח בכלל ראי' הפלגת לא יחשב כלל וזהו כוונתו בבירור וכל המעיין יראה כמה רב מהדוחק יש בזה ודבריו סותרים דברי ראב"ד ולכן דברי הב"ח והש"ך נכונה:
**** ENGLISH ****
And he did not see it, but he saw it as a sailor of twenty-four-year-olds, and he had no idea how it would be possible to see it in the air, and that it would not be possible for them to see it as a result of the Lord’s Prayer
And I say that the Lord is in the midst of Hashem’s presence, and that Hashem’s Word is in the midst of Hashem’s presence, and that Hashem’s Word is not in the midst of Hashem’s presence, and that it is hard for him to see him, and he will not be able to see him.
But on the other hand, there is an eye on Hashem’s promise to Abraham and his wife, and he will not be able to see Hashem’s promise
In the midst of Hashem’s presence, Hashem’s promise is to be seen in Hashem’s Word, and to be seen in Hashem’s Word, and to be seen in Hashem’s Word, and to Hashem’s glory, and to Hashem’s mercy, and to Hashem’s glory, and to Hashem
Hashem’s Word tells us that it is a day after the Lord’s day, and it is not clear that it is the day of the Lord’s day, and that it is not the day of the Lord’s Prayer, and it is clear that it is not the case of the Lord’s Prayer, and that it is not the same as the Lord’s Prayer, and that it is not the Lord’s name of the Lord. and so
He said, “I am afraid of the Lord’s promise to Abraham, and I am the Lord of Hashem’s people, and I am not afraid of Hashem’s people, and I am not afraid of Hashem’s presence in the land of the earth.”
The Lord’s command is not in the midst of Hashem’s glory, and He has not seen it in the days of Hashem’s glory, nor does He see that Hashem’s presence in the midst of Hashem’s presence, and that Hashem’s Word is in the presence of Hashem’s glory, and that He is not the same as He is not known as the Lord’s Prayer
The Lord’s Prayer, which is not the same as that of Hashem’s people, is not the same as that of Hashem’s people, nor is it possible for them to speak of Hashem’s people, and that it is not possible for them to do so with them
Hashem’s promise to Abraham, “The Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, is not in the midst of Hashem’s glory, nor is it possible for him to take care of Hashem’s glory, and that he will not be able to do so.”
He said, “He who has come to the battle, and he has a constant stop to the fact that he is in the midst of the battle, and that he has a permanent and permanent end to the fact that he is in the midst of the Lord’s name, and that he has not given him a steady and unrelenting, but that he has not been given to him.”
What is the sophistical front of the Lord in his time is how it is determined to see and hide its sail before the Lord and Aaron said to him at the time that he had made a call to her and that she had no intention of seeing and hiding her time, and how she had been stolen from her first place
She has a straw to be checked and so on, apart from the swing and said that Dacht does not contradict the permanent first cruise, but to the P. B.C., he has not yet determined that the ship's benign from a second mirror and did not say any extra fees. But even though this verse is true of the USSR, I am not afraid to say that it is not in vain in the words of Dewey, that I will only look at it and not in it, and that it does not have an end to it, but that the “reality” has been instituted in the words that “Arror and Ramban” did not see but saw a contradiction and clear view of the land
The last one who has not come to see all the need for the soul owner and as a result, is that the Lord of Israel has seen a blessing, but it is here that the Lord of Israel has seen him, and he is not afraid that he will be able to see him, and that he will not be able to see him, and he will not be able to see him
This is the case of Hashem’s promise to Abraham, and it is the same as Hashem’s Word, and it is the same as Hashem’s Word, and it is the same as Hashem’s Word, and it is the same as Hashem’s Word
It is said that there is a lot of glory here, but that it is a great deal of glory that will not be considered at all, and that this is clearly what it means, and that all the spring will see how much of it is in it and its words contradict the words of Rabid and therefore it is true:
**** END BLOCK ****
```

### 38. `siman_189/chiddushei-hilkhot-niddah/part-001.txt` — chiddushei-hilkhot-niddah — seif 2 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: chiddushei-hilkhot-niddah
seif: 2
marker: _
**** HEBREW ****
צריכה ד' ראי' וכו' יש להקשות דהא וסת החודש וגם וסת השבוע כחדא הן בדינא ואדרבה מן וסת השבוע ילפינן וסת החודש דזה מבואר בגמ' להדיא וא"כ פשיטא דשייך בהו וסת הדילוג כמו בוסת החודש דמ"ש ועי' בתוס' ב"ק דף ל"ד דמבואר להדיא כן גבי שור שנגח וכו' וא"כ למ"ד דקי"ל כרב דסגי בב' דלוגים והם בוסת החודש ג' ראי' וה"ה לוסת השבוע וא"כ אשה שראתה ראי' ראשונה והי' ד"מ בא' בשבת ובסוף יום כ' חזרה וראתה הוא ביום ו' בשבת וחזר' וראתה לבסוף עשרים הוא בד' בשבת וא"כ הרי כאן ג' ראי' וב' דלוגין בב' ימים והן דלוגין שווי' והרי כאן וסת השבו' לדילוג כמו וסת החודש לדילוג ותמהני שלא הרגישו בו האחרונים ומה שנ"ל בישובו הוא דהיכי די"ל דקבעו וסת לדילונ וסת השווי' אמרינן יותר נח דקבעו השוה מדקבעה לדילוג דלא שכיח דאשה קבעת וסת לדילוג ולכך אמרינן דאינן חוששת לדילוג עד שתקבענו ג"פ וא"כ באמת בראתה ג"פ בהפלגת ב"פ ב' יום קבעה וסת השבוע בדילוג רק כשתוסף לראות בפעם ד' בסוף כ' וא"כ יש כאן שני מיני וסת או וסת הפלגה והוא וסת השוה או וסת השבוע בדילוג אמרינן דהוא וסת הפלג' וכוונת הש"ע דאינו נקבע להפלגה עד בד' פעמים ואז הוא וסת הפלגה ולא וסת הדילוג לשבוע ואי קשי' מה נ"מ הלא בין לזה ובין לזה צריכה לעולם לחוש ליום כ' ז"א דאם ראתה בנתי' או שעבר פ"א ולא ראתה אם אתה דן אותו וסת השבוע לדילוג מ"מ בזמנו חוששת דהוא שוה בדיני' כמו וסת החודש ואין נ"מ אם היא רואה בנתיי' או שעבר פ"א ולא ראתה משא"כ אם אנו דנין אותו לוסת הפלגה אם פ"א לא תראה בזמן א"ת בנתי' א"כ בטל' הפלג' ואין חוש' עוד כמש"ל וא"ש:
**** ENGLISH ****
This week, he said, “This is the same as the Lord’s Prayer and the Holy One, which is the same as the Lord’s Prayer, which is the same as the Lord’s Prayer, which is the same as the Lord’s Prayer, which is the first time of the Lord’s Prayer, which is the same as the Lord’s Prayer, which is the Lord’s name of the Lord’s Prayer, which is the Lord’s
He finally saw twenty-fourths on the Shabbat, and so on, Hashem’s Word and Hashem’s Word, and he said, “This is the same as Hashem’s promise, and that He will not be the same as Hashem’s Word, and that He will be the same.”
It will be made only when a supplement to see for a time at the end of the year, and there are two types of snow or a boat, and it is the end of the week in the logo that is said to be it, and that it is the end of the day, and that it is not the same as the day of the day, and that it is not as if it were not to be seen in the last day
What if she sees in me or has passed through P.A. and has not seen any negotiations if we detonate it to a cruise ship if P.A. does not look at me at the time of the ‘N.’
**** END BLOCK ****
```

### 39. `siman_189/chiddushei-hilkhot-niddah/part-001.txt` — chiddushei-hilkhot-niddah — seif 3 — marker `א`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: chiddushei-hilkhot-niddah
seif: 3
marker: א
**** HEBREW ****
שעתה בלבד פי' כגון ראתה תמיד בשעה י"ב ביום אבל לא כוונה הימים כי פעם ראתה בכ' פעם תראה בכ"ב א"כ הרי כאן רק וסת לשעות וא"צ לפרוש רק השעה ויליף לי' מהך דחזית תמיד כד סלק' מטבילה ואמר הבעלי ע"ג הנהר והיינו כי היתה תמיד רואה באישון לילה בכניס' לעיר והתיר להקדים להתבעל טרם הכניס' לעיר כי קודם זמן ההוא מותרת וצ"ל הא דפסק הש"ע לעיל קפ"ז ס"י דאשה שראתה תמיד בליל ב' אחר טבילת' דצריכ' לפרוש ליל ב' אחר טבילת' הג' ולא אמרינן דקודם ראי' או אח"כ מותרת דשם לא כוונה השעה בלילה רק פ"א ראתה בחצי הלילה ופעם לפניו וא"כ כל הלילה בספק ועמש"ל עבק"א:
**** ENGLISH ****
It was only a time when he had always seen at the time of the day, but it was not the intention of the days that he had ever seen in the Bible, and said to my husband, “This is only the time of the day, and I will not leave until the time of the Lord’s departure from the city, and that he has always been given to the city.”
The Lord did not say to them, ‘Look,’ or later, ‘It is not the intention of the hour of the night that only he saw in the middle of the night and before him, and that night he is doubtful, and the rest of the world is in vain.’
**** END BLOCK ****
```

### 40. `siman_189/chiddushei-hilkhot-niddah/part-001.txt` — chiddushei-hilkhot-niddah — seif 3 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: chiddushei-hilkhot-niddah
seif: 3
marker: ב
**** HEBREW ****
ואפילו בלא בדיק' וכ' הב"י שהוא בבעל הנפש חפשתי והוא בסוף שער הוסת והדבר אינו מובן דנעקר לשעה א' י"ל דאם הגיע כן ג' פעמים דטבלה ולא ראתה באישון לילה וכדומה דמותרת דעקרה לוסת הואיל ובא תמיד מכוון ואח"כ עברה ג"פ ולא ראתה אבל דא"צ בדיקה לא ידעתי למה ומנין לי' להראב"ד זה כיון דמשווי' לי' וסת וכל ראיתו מהא דהתירה לבעול טרם זמן הכניס' וצוה לבעול ע"ג הנהר וזהו הכל קודם זמן אבל אם עבר הזמן דלא יהי' צריך בדיק' כמו וסת שאין לו קבוע מנלן זה לראב"ד ועוד א"כ אף בפעם א' נעקר כיון דמשווי' לי' וסת אינו קבוע דס"ל לראב"ד דוסת' השעות אינו כוסת קבוע וסת גוף וסת ימים תנינ' אבל לא וסת השעות וצ"ל דהך רואה מחמת טביל' ה"ל כמחמת קפיצ' דאין נקבע אלא בצירוף ימים ולא שעות וא"כ קשה דלעיל בסי' קפ"ז פוסק דאם ראתה ג"פ בליל טביל' דצריך ג"פ לעוקרו והדבר כ"ש מה התם שלא כוונה הימים ולא השעות צריך ג"פ ואלו בכונה השעה יהי' סגי בפעם א' והדברים צריך תלמוד ועמש"ל עבק"א:
**** ENGLISH ****
And even in the end of the gate of the Lord, and in the end of the Lord’s Prayer, it is not clear that it is not understood by the Lord’s hour, and that it is not possible that he has come to pass, and he has not seen any test of what I know, and that this is not what I have seen before
It is like a time when he does not have a constant gift from the Lord, and so on, he is not a constant cup of body and a period of time, but he does not see the time of the Lord, and he does not need to see him as a result of the time
Once upon a time, it is necessary for the Talmud and the Word of Hashem:
**** END BLOCK ****
```

### 41. `siman_189/chiddushei-hilkhot-niddah/part-001.txt` — chiddushei-hilkhot-niddah — seif 4 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: chiddushei-hilkhot-niddah
seif: 4
marker: _
**** HEBREW ****
כיון שעברה עונתה מותרת עיין ט"ז סק"ה ועמש"ל סי' קפ"ז בזה:
**** ENGLISH ****
For last season, you are allowed to see the T-shirt and the C.C. in this:
**** END BLOCK ****
```

### 42. `siman_189/chiddushei-hilkhot-niddah/part-001.txt` — chiddushei-hilkhot-niddah — seif 5 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: chiddushei-hilkhot-niddah
seif: 5
marker: א
**** HEBREW ****
כגון שראתה וכו' עיין ש"ך סק"ח דפי' דהוא דווקא לרב אבל לא לשמואל דבוסת הפלג' אף רב מודה דבעי ד' ראי' ומני' לשמואל ה' ראי' ובאמת דברי הרא"ש ותוס' מבוארי' כן אלא שדברי הרא"ש צריכין ביאור בהבנת דברים דכ' דרב לא קאמר דראי' ראשונה מהמנין אלא היכי שראי' ראשונה הי' בט"ו לחודש כיון דזמן ראייתה למנין ימי החודש אבל אם ראי' ראשונה הי' בר"ח ושני בחמשה עשרה לראי' זו ושלישית בט"ז לראי' זו מודה רב דלא קבעה וסת דראי' א' אינו מהמני' וכן מוכח בפ' שור שנגח ד' וה' דמדמי נגח בט"ו בחודש זה וט"ז בחודש זה וי"ז בחודש זה לפלוגת' דהכי וכו' עכ"ל ודברים אלו לכאורה בלתי מובנים דמה ראי' יש מהך דשור שנגח יותר מהך דכאן גבי וסת הלא הדברים הנאמרים כאן בגמ' הן הדברים הנאמרים שם בלי הבדל ואדרבה התוס' הקשו דמהך ראה שור נגח שור ולא נגח משמע אפי' בהפלגה סגי בג' ראי' ע"ש והי' מקום לומר אם נאמר כדעת הש"ך לקמן בסק"ל דעונ' בינוני' שדרך הנשים לראות בו הוא וסת החודש מבלי הבדל ע"ש א"כ י"ל דוודאי היא גופי' ראי' דאלו אף בוסת הפלגה בדילוג ס"ל לרב דסגי בב' ראי' בכלל ולשמואל בד' א"כ למה נקט בלישנא ראתה בט"ו בחודש זה וכו' דהוא וסת החודש ולא נקט פלוגתא בהך גוונא ראתה בר"ח וט"ו לראי' זו וט"ז לראי' זו דיש רבות' טפי וגם היא בכה"ג דתנן במשנה הי' למודה לראות יום ט"ו וכו' דמיירי מוסת הפלגה ולא מחודש וצ"ל בע"כ דהפלגה צריך ראי' יותר לרב ד' ולשמואל ה' וכל מה דיוכל הגמ' לקצר בלישנא מקצר ולכך נקט וסת חודש וא"כ דינא של הרא"ש מוכרח אך י"ל דלכך נקט בוסת החודש כיון דהוא עונ' בינוי' השכיח בנשים ומילתא דשכיח נקט כיון דאורח' בנשים בכך ולזה מביא הרא"ש ראי' דגבי שור נקט נמי בהך גוונא ואלו בשור לא שייך כן וה"ל לומר בשור כן א"ו דוקא קתני הך זהו דוחק דהא הך פלוגתא לא נשנית גבי שור רק הגמ' מדמי הך דשור להך דוסת וא"כ הוצרך הגמ' לנקוט הלשון דאתמר גבי וסת ואורח' דתלמודא כך הוא לכך צריך לומר פי' אחר והוא דתו' הקשה איך אמרינן הפלגות בעינן ד' ראי' הא אמרינן ראה שור ונגח שור ולא נגח וכו' דהוי מועד וכ' דיש ליישב והישוב הוא כמ"ש מדברי הר"י דבשלמא באשה אין אנו רוצים בזה לשווי' רואה דהיא בלא"ה בחזקת רואה רק כל ענין היא לידע זמן מוגבל יום ראי' א"כ בראי' א' אין אתה יודע זמן מוגבל עד שתרא' ראי' שני' והרי הוגבל הזמן לומר כך וכך הפלגה היא רוא' משא"כ בשור נגח עיקר עסקנו לשווי' בחזקת נגחן וכשנגח בפ"א הרי הנגח זו נמנה לומר שנגח ובנגחו ג' נגיחות הוחזק לג' נגיחות ואלו נגיחות ואלו נגח בג' ימים רצופים הי' מוחזק למועד לכל ימים רק הואיל ונגח בסירוגין הרי מועד לסירוגין וא"כ הסירוג שעשה אינו עיקר שעושה אותו מועד אדרבה לולי הסירוג הי' יותר מועד לכל הימים רק הסירוג מגרע לי' דאינו מועד רק לימים שסירג משא"כ באשה אלו ראתה רצופים יום ביומו אין כאן וסת כלל וא"כ כל עצמות וסת שאנו דנין עליו ועסקנו בו הוא ע"י הפלגות ואף אתה תצריך ג' הפלגות וזה פשוט וברור. ולפ"ז דברי הרא"ש שפיר דוודאי הא דהוצרך הרא"ש להביא ראי' דלא מיירי בוסת הפלגה היינו אם אמרינן דאין יום חודש גורם כלל ראי' לאשה דמה איכפ' לטבע אשה אם החודש מלא או חסר או היום ט"ו או ט"ז עד שנא' שאפי' הרבה ימים מקדם שפעת דם אי יגיע ימי ט"ו הרי בחזקת אורח בזמנו בא וזהו כמעט מהנמנע אצל חכמי טבע ומחקר ויצחקו לזה רק אמרו כי טבע. האשה להפסיק בין ראי' לראי' זמן מוגבל והוא וסת הפלג' וא"כ הא דאמרינן ראתה בט"ו לחודש זה וי"ז לחודש זה ע"כ מיירי בדרך משל בחדשים השווי' במלא וחסר או חודש לבנה כטי"ב וא"כ הרי כאן הפלגה מן ט"ו ני"ו וכן מן י"ו לי"ז הפלגה ג"כ בדילוג יום א' יותר וא"ל כי ראי' ראשונ' נמנה לבד בלי הפלג' כי איזה שם אשר תקרא לו אין החודש גור' הדם ואין כאן זמן שנא' עליו אורח בזמנו בא וא"כ בזו מוכח לכאור' דוסת הפלגת ג"כ כרב בכה"ג הוי וסת ולשמואל בראתה ראי' ד' אבל אם אמרינן דוסת החודש גורם ראי' ומסורת הי' זה ביד חכז"ל כי שיפורא או מהלך לבנה גורם ראי' לאשה אין הבדל אם ראתה מקודם סמוך או מופלג מ"מ בהגיע תור ההוא היא רואה וזהו וסת החודש שאמרו חז"ל א"כ פשיטא דכי נחלקו רב ושמואל היינו בוסת חודש דראי' ראשונה מהמנין שתיכף היא נותנת גבול וקובעת זמן לוסת משא"כ וסת הפלגה אין בראי' ראשונ' דבר עד שתוסיף עוד ראי' וא"כ הכריח הרא"ש שפיר דע"כ וסת החודש דוקא משום דיום חודש גורם וסת ולא תלי' כלל בהפלג' ולכך סגי לרב בג' דל"ל היא היא היינו וסת החודש היינו הפלגה דאין יום חודש גורם כלל הראי' וא"כ מוכח דגם בהפלג' סגי בג' ראי' כמ"ש הרא"ה בב"ה באמת ע"ש שהאריך דא"כ י"ל עד כאן ס"ל לשמואל עד שתשלש בדילוג היינו בוסת החודש שהוא לפ"ז דין א' עם הפלגה דס"ל לשמואל הא אין כאן רק דילוג א' דמט"ו לי"ו הוא הפלגה א' ומיום י"ו לי"ז דילוג א' וס"ל לשמואל דעכ"פ בעינן ב' דלוגי' לפחות דלהוי עכ"פ חזקה בדילוגי' לרבי' ואף רשב"ג מודה הואיל ועכ"פ יש כאן ראי' המחזיקי' כמו שאמרו לרב ועיין ברא"ה הנ"ל אבל בשור דנגיחה בט"ו לחודש יש לו שם כמש"ל בשור הנגיחה תיכף יש לו שם והוי כמו וסת השבוע או חודש לדידן אליב' דכ"ע וא"כ בנגח אח"כ בי"ו לחודש הרי כאן סירוג ואח"כ בי"ז הרי כאן סירוג שני והרי כאן שני סירוגי' ואף שמואל מודה דהא הוחזק לנגיחות ובסירוגין לחדשים בתוס' יום יום ואיך מדמה הגמ' נגיחות שור בדילוג בחדשים להך דרב ושמואל גבי וסת ש"מ דאף כאן הדין כן דיום חודש גורם הוסת והראי' א"צ להפלגה כלל דאפי' אם שופעת ימים הרבה מקודם או חדל לה אורח כנשים זמן רב בהגיע תור החודש עלולה לראות והוא הזמן שיבא אורח נשים וא"כ שוה דינא לשור נגח דיש לנגיחה ג"כ שם מוגבל וא"כ דדין זה מוכח אמרינן דווקא בוסת החודש הואיל ונקט למילתא בחודש אבל בהפלג' צריך ראי' עוד תוספ' הן לרב והן לשמואל ודו"ק:
**** ENGLISH ****
For example, Hashem’s Word says, “Hashem’s Word is not the same as the Lord’s Prayer, but the Lord’s Word is not the same as the Lord’s Prayer, but the Word of Hashem’s Word is given to him.”
Hashem’s Word is not the same as Hashem’s people, and Hashem’s Word is not the same as Hashem’s Word, and Hashem’s Word is the same as Hashem’s Word, and it is the same as Hashem’s Word, and it is not the same
“The women are soft to see him and the end of the month, without any difference in the fact that he is a member of the Lord’s Prayer, and that he has not seen him in this month, and that he has not been given to him.”
The Lord’s Prayer, and all the things of the Lord’s Prayer, are shortened, and the Lord’s Prayer is given to him, and the Lord’s Prayer is given to him
This is what Hashem says, “He who has not seen Hashem’s mercy and mercy, and he will not be saved, and he will be like the Lord of Hashem’s Word, and he will not be able to do so.”
The main thing we have dealt with is to say that the Lord's Prayer and the Lord's Prayers were given to him, and that the Lord's Prayer was given to him, and that he had been given to him, and that he had not given him any time
“And we’re going to fuck him and we’ve been working on him by the cruises and even you’ll need the snow and it’s simple and clear. “And the Lord’s Prayer, which is not the case of the Lord’s Prayer, is to say that the Lord is not a day of the Lord’s Prayer to bring a woman’s death if the month is full or missing, or today, he said, ‘Oh, it’s a long time when he comes out of his blood
Because nature. The woman stopped between Rashi and Rashi for a limited period of time, and he saw that he had been on the ground for this month, and that of this month, he would have seen his son, and that he would not be able to do so, and that he would not be called the Lord’s Prayer
“As a result of the Lord’s Prayer, Hashem’s Word, and Hashem’s promise is that Hashem’s promise is not to be seen before, and that Hashem’s promise is to be seen, and that it is the first time that He is given, and that it is the same as the Lord’s
This is why Hashem’s promise is that He will be the same as Hashem’s Word, and that He will be the Lord’s Prayer, and that He will be the same as the Lord’s Prayer
He said, “The Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, is the same as the Lord’s Prayer, and the Lord’s Prayer is given to him.”
In the day of the day, and how the Lord’s blood is plucked in a new tyrant and called on the back of the day, “This is the case of Hashem’s judgment, so that a month of judgment is given, and it may be seen as a result of this month, and it may be a result of the time that the Lord has been proven to him
Both of them are called and said:
**** END BLOCK ****
```

### 43. `siman_189/chiddushei-hilkhot-niddah/part-001.txt` — chiddushei-hilkhot-niddah — seif 5 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: chiddushei-hilkhot-niddah
seif: 5
marker: ב
**** HEBREW ****
וראתה ב' וכו' וה"ה דלגה למפרע כגון ראתה שני' לסוף כ"ט וג' לבסוף כ"ח וזה פשוט וכן משמע בתוס' פ"ק דנדה ד"ט ד"ה פחתה וכו' כ"כ הש"ך בסק"ט ובאמת יש לפקפק בזה בשלמא בדלגה שרחק' יום יום י"ל טבע אשה כך למעט בדמים וכן הולך וחסר עד לבסוף שרואה פ"א לשנה וא' לשבוע וא' ליובל אבל אם מקרב' ראי' א"כ איך אפשר לומר לבסוף שתרא' היום ומחר יהי' לה עוד וסת וא"כ מחר נמי וכן אין לדבר סוף וא"כ אשה זו כל ימים בחזקת רואה ולבסוף יהי' וסת' נעקר וצריכה לחזור ולהוסיף לראו' מיום א' לב' ולג' א"כ הרי הוסת משונה הולך וחסר והולך ומתגבר וזהו לא שמענו בטבעי' כלל ומתוס' אין ראי' כי התוס' באמת לא הקשו על לא מבעי' שפחתה רק קו' התו' על לא מבעי' שהותירה דפי' רש"י לצ"א צ"ב צ"ג יום איברא דבספר בעל נפש לראב"ד מבואר כמ"ש התוס' ומ"מ צ"ע כי מנגד לטבע בכל אופן ומנלן זה כי לא מצינו לו ראי' בש"ס:
**** ENGLISH ****
And he said, “And so on, and that’s just like this, and it means that in the midst of Hashem’s Word, it’s just as simple as it is, and that it means that in the midst of Hashem’s Word, it’s just as if it is not possible for the day of the day, and it’s not possible for the day of the day that it will be taken to the day of the day of the day of the day
At the end of the day of the Lord, we must return and add to the Lord’s Word, and to Hashem’s Word, we do not listen to Hashem’s Word, and we do not hear Hashem’s Word, and we do not know that Hashem’s Word is not the same
**** END BLOCK ****
```

### 44. `siman_189/chiddushei-hilkhot-niddah/part-001.txt` — chiddushei-hilkhot-niddah — seif 6 — marker `א`

- Quality: **error** — chunk_seam_duplicate, divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=6#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: chiddushei-hilkhot-niddah
seif: 6
marker: א
**** HEBREW ****
בימי החודש עיין ש"ך ס"ק י"ג דעיקר כפי רוב פוסקים דשפורא גרים ולא כהרא"ה דדעתו דמנין למולד הלבנה שנרא' שראוי לקבוע חודש עפ"י הראי' ובאמת הוא דבר תמי' דטבע כל נשים בכל זמניהם יהי' כרוכי' אחרי הב"ד כיצד יקראו שם לחודש ואז ביום ההוא יזובו דמים מנידתה ומקורה ולכן הרמב"ן שהי' שלם בטבעיות ולימודי' ובסוד ה' בא כנודע מגודל חכמתו ומ"מ כפי מ"ש הרא"ה דחה זה הסברא שיהי' שפורא גרם בוסת אשה להקדים ולהאחיר וכן הר"ן בחידושיו הביא ולא ענה עליו דבר כי כל מה שהאריך הרשב"א במשמרת הבית ועיקר ראי' שלו מאקרא וכו' גומר עלי הוא אמת וזהו הכל באיש ישראלי אשר חלק ה' עמו והם מושפעים מפאת ה' ולא כפי טבעי והלוכי כוכבים ולכך כל ענינים נדון כפי חוקי הב"ד וכאשר יאמרו כן גזרה חכמתו עליונ' להסכים ולהשפיע עליהן אבל שיהי' ב"ח חומרי מתנהגים עפ"י הסכמת ב"ד מול הטבע ומהלך הכוכבים במסילתם זה מהנמנע וא"כ כל פועל הטבע לשוא ח"ו וזהו בוסת החודש בדילוג לא נאמר' באשה לבד כי אם גם בשור הנגח ג"כ ט"ו בחודש זה וכו' ושם הקו' גדולה וחזק' כי שם לא יתכן שהטבע יסכי' לקביעות ב"ד ולכך הרמב"ן הקשה קו' זו ולא הי' נעלם מעין חכמתו כנ"ל ובאמת דברי הרא"ה ג"כ אינו מובנים דכתב דיש למנו' למולד הלבנ' שנרא' שראוי לקבוע ר"ח עפ"י הראי' שמשע' זו שהיא נרא' על הארץ הוא פועל בעולם זהו דבריו והר"ן בחדושי' הסכי' עמו ולא ידעתי כי קשת הראי' בלבנ' מתחלפת לפי אורך ורוחב המדינ' בעולם כאותו שאמר' כ"ד שעות לדידהו שית ולבני בבל ח"י שעה וכן בכל המדינ' ומדינ' משתנה הראי' והזמן נרא' בארץ וכל חשבון קבועות חדשים ומולדות שלנו הוא עפ"י ארץ ישראל כי משם תצא תורה וקביעות החדשים וא"כ הנשים היושבים וגרים בארצות הרחוקת מא"י כיצד ימנו קביעות וסתן אי למולדו' א"י הרי אינו כי אם נאמר שטבע זריחת הלבנ' בחידוש' גורם ואין זריחת לבנה בא"י גורם ליושבו בקוטבי צפוני ודרומי וכן להיפך ועוד דיש הבדל בין מולד אמיתי למולד אמצעי ועיקר הראי' האמיתות הוא הכל לפי מולד האמיתי שהוא הלבנ' בגלגל שלה כנודע וכל חשבון שלנו במולדות הוא אמצע ואם כן אף כל אשה בכל מדינ' צריכ' ללמוד חכמת מהלך הכוכבי' ומפת הארץ לדעת איך ומה תקבע וסתה באיזה זמן וזה מהנמנע למאוד ועוד א"כ אם הראי' באמצע הלילה תהי' וסתה מאמצע הלילה לאמצע הליל' וא"כ וסתה משתני' משעות ורגעים ואין כאן קביעות יום ולילה שלנו שהוא זריחת ושקיעת השמש כי אם מעת ראי' לבנה יהי' ביום ולילה וכמה בטולי' הרבה יש בדין זה אמנם נרא' כי חודש א' מלא וחודש א' חסר כסדרן בשנת פשוטה שתמיד חדש א' מלא וחודש א' חסר ודאי דהרי זו חוששת ליום החודש ההוא כדינו כי זה כנוי על מהלך לבנה כי מהלך לבנה בשני חדשים הוא נ"ט יום וחלקו חז"ל אחד מלא וא' חסר וא"כ אשה זו יש לה לחוש לפי מהלך לבנ' ואר כי אינו כ"כ בדקדוק כי לפעמים יקדים המולד וראי' באיזה שעות או יאוחר ולפעמים אפשר בחצי יום כולי האי לא אמרינן לדקדק דמי יהי' איצטיגני לדקדק בדקות ההילוך לבנה ובפרט כי וסת דרבנן ולא סגי בלא"ה רק כל הפלפול ההוא אם עשו ז' חסרון או ז' מלאים וכאן שני חסרי' או שני מלאין זאח"ז אם גם בזה יש לשמור סדר החדשים או לא כי למ"ד שפורא גרם אף בזה נא זז הסדר ולהרא"ה והרמב"ן לא כן הוא כי זהו יוצא מכלל מהלך ירח והתור' מסרה קביעות החדשים לחז"ל ומה ענין זה לאשה בדמי וסתה ולכן אפשר דלא דמי שאין בתולי' חוזרין בנתעבר' השנה לבסוף ג"ש ויום א' דהתם ג"כ הקביעות שיהי' שנת לבנה עם תקופה כאחד וגדולי האדם תלוי במהלכי מאורת החמה ובזה הונח לי כי הרמב"ן כתב דאין לומר לענין וסת שפורא וקביעות ב"ד גורם ואולם במטבע קצר שלו להלכות נדה וכמש"ל הטור פוסק ג"כ וסת חודש וכתב להדיא דאין להשגיח אפי' חודש א' מלא וחודש אחד חסר ולכאורה הדברים סותרין ולפמ"ש לק"מ דבחודש חסר וחודש מלא לא נחלק רק כונת בשני חסרין או שני מלאים וזה לא הזכיר בהנ"ל ובאמת בכה"ג יש ליישב לדינא כי הוא נגד החוש והסבר' (ובחבורי במחקרי טבעי ולומדי ותורני עשיתי לדברי רשב"א סמוכין מטעם אחר טבעי ואין כאן מקומו):
**** ENGLISH ****
In the days of the month, the psalmist said, “It is not like the Lord’s Prayer to the Holy One who is Hashem’s Word, and that it is the same as the Lord’s Prayer, that it is Hashem’s Word, and that Hashem’s Word is the same as the Lord’s Prayer, and that it is the Lord’s Prayer, and that Hashem’s Word is in His Word, and that He is the Word is Hashem’s Word is Hashem’s Word is in His Word is Hashem’s presence of His Word is in His Word is in His Word is in His Word, and His Word, and His Word is in His Word is in His Word, and His Word is in His Word, and His Word, in His Word, and His Word, and His Word, and His Word, in His Word, and His Word, in His Word, in His Word, in His Word, in His Word, in His Word, in His Word, in His Word, in His Word, in His Word, in His Word, and His Word, in His Word, in His Word, in His Word, and His Word, in His Word, in His Word, in His Word
“And he did not respond to it, because all that Hashem’s people were blessed with the Temple Guard, and that is what Hashem is doing, and that is what Hashem is doing, and that is what Hashem’s laws are, and that is what Hashem’s Word is, and that Hashem’s will be done to them, and that it is not what Hashem’s judgment is, and that Hashem’s people will be done
This is not the case of Hashem’s Word, and the Holy Spirit is not Hashem’s Word, but Hashem’s Word is not Hashem’s Word, and Hashem’s Word is not the same as Hashem’s Word, nor is it possible that Hashem’s Word is in the world
Hashem’s promise to Abraham and Jacob, “Hashem’s people, and the Lord’s people, and the Lord’s people, and the Lord’s people, and the Lord’s people who are in the land of Israel, and that they will be blessed with Hashem’s promise, and that they will not be able to do so, and that they will not be able to do so in their hearts
And yet another difference between true birth and real birth is all by the true innate that it is white in its wheel as an informant and our entire account of births is middle and if so every woman in every school should learn the wisdom of the Star Trek and the map of the land to know how and what will be determined and ending at what time and that is what is inevitable and so forth if the mid-morning of the night is not present
The sun's sunset that if from time to time, a white mirror will be on a day and night and a lot in a lot of blasphemy is concerned that this month is full and a month A is lacking in order in a simple year that is always new A full and this month is uncertain about the day of this month, so that it is a white move that is white in a new one day, and part of a single vision is missing
It is possible in half a day that the whole island does not say that it is not enough for the quaint to crack in white gear and in particular, that it is not inclination, and that it is not until the end of the new order, or that it is not the case of the new, nor is it possible that it is not the same as it is not possible, nor does it, nor is it that it is possible, nor does it that it is the whole, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it, nor does it
In July, he returns to the New Year’s Eve, and at the end of the year, he wrote that the Ramban had written a white year with a period of one and the great man depended on the depths of the warm light, and it was laid for me that the Ramban had not been divided into a single month, and that he was not divided into a single month
This is complete and this is not mentioned in the Bible, and in fact, in the High Court, it must be reconciled to Dana that he is against the sense and explanation (and that he is buried in natural and dimensional research and I have done according to Rashi, which is based on a natural source and has no place):
**** END BLOCK ****
```

### 45. `siman_189/chiddushei-hilkhot-niddah/part-001.txt` — chiddushei-hilkhot-niddah — seif 6 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=6#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: chiddushei-hilkhot-niddah
seif: 6
marker: ב
**** HEBREW ****
באחד בשבת וכו' כתב המ"י אע"ג דבל"ה איכא הפלגה שווין מ"מ בהפלג' בעינן ד' ראי' ובזה סגי בג' ונכון הוא אלא יש עוד הבדל דבשבוע אף אם תראה ב' ימים מקדם כשיגיע וסת ההוא חוששת אבל אם אתה עושה אותו וסת הפלגה הא בטלה הפלגת' וכן אם יעבור וסת א' ולא תראה דבהפלג' בטלה הפלגת' עד שתשוב ותראה משא"כ בוסת שבוע ופשוט ולכך אני מסופק אם תראה ד' ה' פעמים בכל יום א' בשבוע ג' שיש כאן לומר שקבע' וסת שבוע וכן י"ל שקבע' וסת הפלג' מכ"ב לכ"ב במה נימ' שקבע' כי יש ביניהן נ"מ לדינא כמ"ש ואפשר דיותר שכיח הפלג' מוסת השבוע ולכן אם נוכל לומר שהיא הפלגה למה נימא שהוא וסת שבוע דהוא לא שכיח דיהי' יום ושבוע בזמן מוגבל גורם הראי' וצ"ע:
**** ENGLISH ****
On the Shabbat, the psalmist wrote, “This is what is Caesar’s, and it is true that there is a difference in the Lord’s glory, even if you see Hashem’s promise, but if you do it, and then you will be able to do it, and you will not see it, and you will be able to do it, and you will not see if you do it.”
“This is what we will say that there is a lot of us in the Qur’an, and it is possible that it is more common this week and therefore if we can say that it is a cruise for what is predicted that it is and a week of a week is not quite common enough and a week at a limited time, the biblical factor and the IDF:
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_189
npm run pipeline:editorial:advance -- --siman 189
```

## Checkpoint ids

siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=23#marker=%D7%91
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=23#marker=%D7%92
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=24#marker=%D7%90
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=24#marker=%D7%91
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=27#marker=%D7%90
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=27#marker=%D7%91
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=27#marker=%D7%92
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=27#marker=%D7%93
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=27#marker=%D7%94
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=27#marker=%D7%95
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=28#marker=_
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=29#marker=%D7%90
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=29#marker=%D7%91
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=_
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=30#marker=_
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=31#marker=_
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=32#marker=%D7%90
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=32#marker=%D7%91
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%90
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%91
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%92
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=34#marker=%D7%90
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=34#marker=%D7%91
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=34#marker=%D7%92
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=34#marker=%D7%93
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=_
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=_
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%90
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%91
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%90
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%91
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%92
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=_
siman_189/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=_
siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=12#marker=_
siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=13#marker=%D7%90
siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=13#marker=%D7%91
siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=2#marker=_
siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=3#marker=%D7%90
siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=3#marker=%D7%91
siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=4#marker=_
siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=5#marker=%D7%90
siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=5#marker=%D7%91
siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=6#marker=%D7%90
siman_189/chiddushei-hilkhot-niddah/part-001.txt#slug=chiddushei-hilkhot-niddah#seif=6#marker=%D7%91