# Editorial retranslation — Siman 228 (part 2/5)

Generated: 2026-06-12T13:16:51.464Z

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

## Blocks in this batch (45 of 625 remaining in scope)

### 1. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 25 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=25#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 25
marker: ג
**** HEBREW ****
לשון הטור:
**** ENGLISH ****
The tongue of the column:
**** END BLOCK ****
```

### 2. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 25 — marker `ד`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=25#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 25
marker: ד
**** HEBREW ****
הר"ן בתשו' וכ"כ הרשב"א בתשובה:
**** ENGLISH ****
The Lord’s Prayer and the Holy One:
**** END BLOCK ****
```

### 3. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 25 — marker `ה`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=25#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 25
marker: ה
**** HEBREW ****
שם בתשובת הרשב"א בשם הרא"ה:
**** ENGLISH ****
This is the name of the Lord’s Prayer:
**** END BLOCK ****
```

### 4. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 26 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=26#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 26
marker: _
**** HEBREW ****
תשו' הרשב"א וסיים שם דהיתר צבור מיגז גייז לה וכהפרת הבעל כדלקמן סי' רל"ד וכתבה מהרי"ק בשורש נ"א (ולקמן רכ"ט סעיף ב'):
**** ENGLISH ****
The Lord’s Prayer and the Holy Spirit, which is the name of the Lord’s Prayer, is the name of the Lord’s Prayer, and it is written from the Bible in the root of Hashem
**** END BLOCK ****
```

### 5. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 27 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=27#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 27
marker: א
**** HEBREW ****
תשובת הרשב"א וסיים שם שהרי הם כאלו התנו לעשות כך:
**** ENGLISH ****
The answer to the Bible is that they are like this:
**** END BLOCK ****
```

### 6. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 27 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=27#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 27
marker: ב
**** HEBREW ****
שם מפני שכאלו התנו וכענין הפרת הבעל שא"צ להמתין עד שיחול:
**** ENGLISH ****
This is the name of Hashem’s people, and as a result of Hashem’s promise, “I will be able to wait until I die.”
**** END BLOCK ****
```

### 7. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 28 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=28#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 28
marker: _
**** HEBREW ****
ריב"ש בח"ג סי' קע"ח מהירושלמי וציינתיו לעיל סעיף י"ד:
**** ENGLISH ****
Rivash, part 3, siman 178, from Yerushalmi — and I cited this above, seif 14.
**** END BLOCK ****
```

### 8. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 29 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=29#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 29
marker: _
**** HEBREW ****
הר"ר דוד כהן בתשובה:
**** ENGLISH ****
Dr. David Cohen responded:
**** END BLOCK ****
```

### 9. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 3 — marker `א`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 3
marker: א
**** HEBREW ****
טור:
**** ENGLISH ****
column:
**** END BLOCK ****
```

### 10. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 3 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 3
marker: ב
**** HEBREW ****
הרמב"ם בפ"ז מה"ש דין ה':
**** ENGLISH ****
Rambam in chapter 7 of Hilchot Shevuot law 5:
**** END BLOCK ****
```

### 11. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 3 — marker `ג`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 3
marker: ג
**** HEBREW ****
מימרא דאביי שם דף ע"ו ע"א:
**** ENGLISH ****
The name of the Lord’s Prayer is the name of Hashem:
**** END BLOCK ****
```

### 12. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 3 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 3
marker: ד
**** HEBREW ****
משנה שבת דף קנ"ז ע"א ונדרים דף ע"ז ע"ב:
**** ENGLISH ****
Mishnah Shabbat daf 157a and Nedarim daf 77b:
**** END BLOCK ****
```

### 13. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 3 — marker `ה`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 3
marker: ה
**** HEBREW ****
מסקנת הגמ' בנדרים שם:
**** ENGLISH ****
The conclusion of the Gemara in Nedarim there:
**** END BLOCK ****
```

### 14. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 3 — marker `ו`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 3
marker: ו
**** HEBREW ****
רבינו ירוחם כיון דבשבת כולם מקובצים ואם לא יתירו אז לא יוכלו להתירן (וב"י בא"ח סי' שמ"א בשם תשובת רשב"א ואגור):
**** ENGLISH ****
Rabbeinu Yerucham: since on Shabbat everyone is gathered, and if they do not release then they cannot release them (Beit Yosef in Orach Chayyim siman 341 in the name of responsum of Rashba and Agur):
**** END BLOCK ****
```

### 15. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 30 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=30#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 30
marker: _
**** HEBREW ****
בתשובות להרמב"ן:
**** ENGLISH ****
Answers to the Bible:
**** END BLOCK ****
```

### 16. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 31 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=31#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 31
marker: _
**** HEBREW ****
הרא"ש בכלל ה' סי' ד' וכלל ז' סי' ה' והריב"ש בח"א סי' ע"ג:
**** ENGLISH ****
The Lord’s Prayer, and the Lord’s Prayer, and Hashem’s Word:
**** END BLOCK ****
```

### 17. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 32 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=32#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 32
marker: _
**** HEBREW ****
הר"ן בתשובה וכ"כ הרשב"א בתשובה:
**** ENGLISH ****
The Lord’s Prayer and the Holy One:
**** END BLOCK ****
```

### 18. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 33 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=33#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 33
marker: _
**** HEBREW ****
סמ"ג בסי' רל"ח בשם שהורה גאון ותשובת הגאונים ושכן ראה בתשובות ר' יוסף ט"ע והמרדכי בשם תשובת רש"י ותשו' להרמב"ן סי' ר"פ וש"פ:
**** ENGLISH ****
In the name of the Lord’s Prayer, the Holy Spirit and the Lord’s Prayer and the Lord’s Prayer, and the Holy One, in the name of the Lord’s Prayer, called the Lord’s Prayer and the Holy One, and the Holy One:
**** END BLOCK ****
```

### 19. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 34 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=34#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 34
marker: _
**** HEBREW ****
שם:
**** ENGLISH ****
Name:
**** END BLOCK ****
```

### 20. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 35 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=35#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 35
marker: _
**** HEBREW ****
הרא"ש בתשובה כלל ה' סי' ד' ממדרש ילמדנו שכן היתה שבועת יהושע ושבועת פילגש בגבעה ושבועת שאול גזירה ונידוי:
**** ENGLISH ****
Hashem’s promise to Abraham is that Hashem’s promise is that He is a prophet of Hashem’s people, and that Hashem’s Word is in heaven
**** END BLOCK ****
```

### 21. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 36 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=36#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 36
marker: _
**** HEBREW ****
תשובת הרא"ש כלל י"ב (מהגהת מיי'):
**** ENGLISH ****
The answer to the Bible is:
**** END BLOCK ****
```

### 22. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 37 — marker `_`

- Quality: **info** — divine_name_style
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=37#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 37
marker: _
**** HEBREW ****
תשובת הרשב"א ודוקא שלא היתה לתועלת חבירו אבל אם היתה לתועלת חבירו כגון שנשבע ליתן לו מנה די כשיאמר הרי אני כאלו התקבלתי ב"י והוכיח בראיות כדלקמן סי' רל"ב:
**** ENGLISH ****
The answer to the PA and Durk was not for the benefit of his inheritance, but if he were for the benefit of his credit, he swore to give him a sufficient dose when he said, “I was accepted by the Lord and proved the evidence as follows.”
**** END BLOCK ****
```

### 23. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 38 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=38#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 38
marker: _
**** HEBREW ****
תשובת הרשב"א וכתב שם שא"צ רשות פה אל פה אלא אפילו בכתב ידו כל שהוא מכיר חותם ידו (ורמב"ן סי' רנ"ד):
**** ENGLISH ****
Responsum of Rashba; he wrote there oral permission is not required but even in his handwriting suffices if one recognizes his signature (and Ramban siman 254).
**** END BLOCK ****
```

### 24. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 39 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=39#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 39
marker: _
**** HEBREW ****
הרשב"א בתשו':
**** ENGLISH ****
The Bible:
**** END BLOCK ****
```

### 25. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 4 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 4
marker: _
**** HEBREW ****
לשון טור מדברי הרא"ש שם בפסקיו מברייתא דר"ג ירד מן החמור ונתעטף וישב והתיר לו נדרו ומפרש בגמ' דר"ג סבר אין פותחין בחרטה דמעקר נדרא בעינן ובעי עיונא אהכי ישב:
**** ENGLISH ****
Tur's wording from Rosh there in his rulings from the baraita of R' Gamliel — he descended from the donkey and wrapped himself and sat and released his vow for him; and the Gemara explains R' Gamliel holds we do not open with regret, for uprooting the vow itself we require, and he needs examination — therefore he sat:
**** END BLOCK ****
```

### 26. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 40 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=40#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 40
marker: _
**** HEBREW ****
תשובת הרשב"א וכר' יונתן דאמר משמע שניהם כאחד ומשמע כל אחד בפני עצמו סנהדרין דף פ"ה ע"ב ובכמה דוכתי:
**** ENGLISH ****
The answer to the Bible and Rabbi Yonatan Dhammer means both of them as one and hears each one before himself, Sanhedrin, the P.D. and how much I have done:
**** END BLOCK ****
```

### 27. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 41 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=41#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 41
marker: א
**** HEBREW ****
תשובת הרשב"א (וריב"ש לדעת הרא"ש ורמב"ן סי' רנ"ט וסוף ספר כל בו):
**** ENGLISH ****
The answer to Hashem’s Word is to say, “The Lord’s Prayer and the Holy One.”
**** END BLOCK ****
```

### 28. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 41 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=41#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 41
marker: ב
**** HEBREW ****
כדעת הריב"ש בח"א בסי' צ"ט ובח"ב סימן קנ"ח והביאם הרב ב"י בסי' זה:
**** ENGLISH ****
In the words of the Lord’s Prayer, he said, “I am the Lord’s Word, and I am the Lord’s Prayer.”
**** END BLOCK ****
```

### 29. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 41 — marker `ג`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=41#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 41
marker: ג
**** HEBREW ****
שם:
**** ENGLISH ****
Name:
**** END BLOCK ****
```

### 30. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 41 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=41#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 41
marker: ד
**** HEBREW ****
שם לדעת הרא"ש ולדעת הריב"ש וכתב שם עוד שאפילו לדעת הרא"ש אם אין בשבועה תביעת ממון כיון שאין כאן חיוב ממון אין השבועה אלא עד הזמן ולא יותר:
**** ENGLISH ****
It is written there, and it is written there, even if there is no claim in this week, that there is no charge of money, but not more:
**** END BLOCK ****
```

### 31. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 42 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=42#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 42
marker: א
**** HEBREW ****
הרשב"א בתשובה וכן כתוב בתשובות להרמב"ן סי' רע"ה:
**** ENGLISH ****
It is written in the words of the Lord’s Prayer, and it is written in the Quran
**** END BLOCK ****
```

### 32. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 42 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=42#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 42
marker: ב
**** HEBREW ****
שם בתשובות להרמב"ן וע"ש:
**** ENGLISH ****
There are answers to the Bible and the Bible:
**** END BLOCK ****
```

### 33. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 43 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=43#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 43
marker: _
**** HEBREW ****
תשובת הרשב"א מהא דאמרינן בב"ק לא נתכוונה זו אלא להגון לה וציינתיו לעיל ריש סי' רי"ט:
**** ENGLISH ****
The answer from the Bible is not made to this extent, but to protect it, and to be given to it
**** END BLOCK ****
```

### 34. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 44 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=44#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 44
marker: _
**** HEBREW ****
הרא"ש בתשובה כלל ח':
**** ENGLISH ****
Rosh in responsum general 8:
**** END BLOCK ****
```

### 35. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 45 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=45#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 45
marker: א
**** HEBREW ****
בתשו' להרמב"ן והיא בתשו' הרשב"א וסיים שם וענין יהודה דאיתא (בב"ק דף צ"ב ע"א) מפני שהיה סובר דנדוי על תנאי אם נתקיים התנאי א"צ הפרה וע"כ לא שאל על נדויו וכו' ואמרי' במכות י"א ע"ב נידוי על תנאי צריך הפרה מנ"ל מיהודה כו':
**** ENGLISH ****
In responsum to Ramban, which is in responsum of Rashba; and he concluded there regarding Yehuda as stated (Bava Kamma 92a) because he thought nidui on condition — if the condition was fulfilled, annulment is not needed, and therefore he did not ask about his nidui etc.; and they say in Makkot 11b nidui on condition requires annulment — from where do we learn? From Yehuda etc.:
**** END BLOCK ****
```

### 36. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 45 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=45#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 45
marker: ב
**** HEBREW ****
מרדכי פ"ז דמציעא בשם ה"ר פרץ ורבינו ירותם בנתיב י"ד שקבל מרבותיו ולפיכך לא התירו ליהודה לא יעקב ולא מרע"ה עד שהתפלל עליו משה רע"ה:
**** ENGLISH ****
Mordechai chapter 7 of Bava Metzia in the name of R' Peretz and Rabbeinu Yerucham in Netiv 14 that he received from his teachers; and therefore they did not release Yehuda — not Yaakov and not Moshe Rabeinu — until Moshe Rabeinu prayed for him:
**** END BLOCK ****
```

### 37. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 46 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=46#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 46
marker: א
**** HEBREW ****
בתשובת הרמב"ן סי' רע"ד:
**** ENGLISH ****
In responsum of Ramban siman 274:
**** END BLOCK ****
```

### 38. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 46 — marker `ב`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=46#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 46
marker: ב
**** HEBREW ****
כן משמע מתשובה הנזכרת וכ"נ מתשובת הר"ן סי' י"ז מטעם דכל שלא התיר הראשונה לא חלה השניה ואין מתירין הנדר עד שיחול וכמ"ש בסי' רכ"ט סעיף ג':
**** ENGLISH ****
Yes, it means that the answer you mentioned, and that the Lord’s response is not the first one that does not apply to the other, and there is no trace of the vow until it is passed and as a result of the G-d:
**** END BLOCK ****
```

### 39. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 47 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=47#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 47
marker: _
**** HEBREW ****
תשובת הרשב"א:
**** ENGLISH ****
The answer is:
**** END BLOCK ****
```

### 40. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 48 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=48#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 48
marker: _
**** HEBREW ****
תשובת הרשב"א: (וכפול בח"מ סי' ע"ג סעיף ט') משום דבנדרים הולכים אחר לשון בני אדם והוי ספיקא דאורייתא ואזלינן לחומרא:
**** ENGLISH ****
Hashem’s Word says, “And Hashem’s Word is in charge of Hashem’s Word, and Hashem’s Word is revealed to them.”
**** END BLOCK ****
```

### 41. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 49 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=49#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 49
marker: _
**** HEBREW ****
תשובת הרשב"א מההיא דמחצה לאהרן ומחצה לבניו ב"ב דף קמ"ג ע"א:
**** ENGLISH ****
Responsum of Rashba from that of half to Aharon and half to his sons — Bava Batra 143 side a.
**** END BLOCK ****
```

### 42. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 5 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 5
marker: _
**** HEBREW ****
לשון הרמב"ם בפ"ז מהלכות נדרים מהירושלמי פרק ה' דנדרים והתוספתא:
**** ENGLISH ****
Rambam's wording in chapter 7 of Hilchot Nedarim from the Yerushalmi chapter 5 of Nedarim and the Tosefta:
**** END BLOCK ****
```

### 43. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 50 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=50#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 50
marker: _
**** HEBREW ****
הריב"ש בח"ב בסי' קמ"ה:
**** ENGLISH ****
In the morning of the Lord’s Prayer:
**** END BLOCK ****
```

### 44. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 51 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=51#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 51
marker: _
**** HEBREW ****
שם בח"ג סי' צ"ו:
**** ENGLISH ****
Named in C.C.:
**** END BLOCK ****
```

### 45. `siman_228/beer-hagolah/part-001.txt` — beer-hagolah — seif 6 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 6
marker: _
**** HEBREW ****
תשו' הרשב"א וסיים שם כיון שהוא נהנה שהוא מן הדברים שאין מתמני' עליהם עובדי כוכבים והגרים וגם הצבור נהנין ממנו ממלאכתן שנעשית ע"י וכיון שהוא נהנה אינו נשאל לחכם שבעיר:
**** ENGLISH ****
Hashem’s promise is that he is a gift from the things that do not belong to them by the stars and the sages, and that he does not enjoy, and that he is not asked for in the city:
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_228
npm run pipeline:editorial:advance -- --siman 228
```

## Checkpoint ids

siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=25#marker=%D7%92
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=25#marker=%D7%93
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=25#marker=%D7%94
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=26#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=27#marker=%D7%90
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=27#marker=%D7%91
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=28#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=29#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=%D7%90
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=%D7%91
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=%D7%92
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=%D7%93
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=%D7%94
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=3#marker=%D7%95
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=30#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=31#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=32#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=33#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=34#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=35#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=36#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=37#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=38#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=39#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=40#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=41#marker=%D7%90
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=41#marker=%D7%91
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=41#marker=%D7%92
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=41#marker=%D7%93
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=42#marker=%D7%90
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=42#marker=%D7%91
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=43#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=44#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=45#marker=%D7%90
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=45#marker=%D7%91
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=46#marker=%D7%90
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=46#marker=%D7%91
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=47#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=48#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=49#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=50#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=51#marker=_
siman_228/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=6#marker=_