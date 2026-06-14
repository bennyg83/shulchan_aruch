# Editorial retranslation — Siman 228 (part 3/5)

Generated: 2026-06-12T13:16:51.901Z

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

### 1. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 29 — marker `_`

- Quality: **info** — divine_name_style
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=29#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 29
marker: _
**** HEBREW ****
<b>יש מי כו' ולכן כו'. </b>ולא דמי למ"ש בפ"ק דחולין <small>(י"ח ב') </small>ה"מ היכא דדעתו לחזור כו' דהתם במנהג שנהגו במקום ואינו אלא להמקום ההוא אבל חרם שקבלו עליהם ועל זרעם הוי כנשבעו שאקרקפתא דגברי רמי וחייבין מדין תורה לעשות כן ולא תליא במקום והוי כה"ג דפ"ג דשבת <small>(מ"ו א' אך הלשון שכ' הוא ביבמות) </small>ור' אבהו היכי כו' וער"ן סי' נ"ג ועש"ך:
**** ENGLISH ****
There are those who are so-called. And it is not for the Lord to return to the Holy Spirit, but rather to this place, but to the seed of the Lord, and to thee shall be blessed, and to thee shall not be fulfilled, and shall not be put in such place, and shall not be borne in such a place, nor shall it be borne in the name of the Lord, nor shall it be seen in the name of the Lord’s name
**** END BLOCK ****
```

### 2. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: א
**** HEBREW ****
<b>ג"פ. </b>טור ומהרמב"ם משמע שפ"א די. ב"י. ובפירושו ספ"י כתב ב"פ אבל דברי הרא"ש בסוף יומא כדברי הטור שכתב ומיהו נראה כו' ולכך כו': <br><b>(ליקוט) ג"פ. </b>כמ"ש בס"פ ד' מיתות הותר הנדר כו' ואע"ג דשם ל"ק רק ב"פ ל"ד דב"פ ודאי לא מעלה ולא מוריד וכמ"ש בספ"ג דפרה עץ ארז. כו' אזוב כו' וכן בפ"ק דנדה <small>(י"א א') </small>קפצה וראתה כו' ואף שתוס' מגיהין שם דצ"ל ג"פ אינו מוכרח <small>(וכ"כ תוס' שם ל"ט ב' בד"ה אלמא) </small>וכמ"ש למעלה וכן בהרבה מקומות (ע"כ): <br><b>(ליקוט) ג"פ. </b>כמ"ש בספ"ד מיתות הותר הנדר כו' [וכן בפרק הספינה <small>(ע"ד א') </small>הגירסא בע"י מופר לך מופר לך] ואף שלא כ' רק ב"פ הוא ג"פ כמו בפ"ג דפרה אזוב זה כו' ובמנחות פ' ר' ישמעאל <small>(ס"ה א') </small>ושאר מקומות אבל ב"פ לא מצינו לעולם (ע"כ):
**** ENGLISH ****
JF. The Bible says that Hashem’s Word is enough. B. In his words, he wrote in the book, "But the words of the Lord are at the end of the day, as it is written, and who is called, and that is what it looks like." As a result of Hashem’s Word, the Holy One was given to Hashem’s Word, and Hashem’s Word was given to Hashem. A. A. A. A. A. A. was advocating and showing a quaint and even though Joseph Magdalene had no need (and so many places would be included)
(b) (Lycott) As a result of Hashem’s presence, the Lord was given to you, and not only in the name of the ship, nor is it possible for you, but not only in Hashem’s name, and the rest of it is in the world
**** END BLOCK ****
```

### 3. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: ב
**** HEBREW ****
<b>או כו'. </b>עמ"ש בסי' רל"ד סל"ז:
**** ENGLISH ****
Or a qua. In the words of the Lord’s Prayer:
**** END BLOCK ****
```

### 4. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: ג
**** HEBREW ****
<b>אפי' כו'. </b>עבה"ג ושם ב' אר"נ הלכתא כו' ור"נ סבר כו' וכנ"ל ס"א:
**** ENGLISH ****
My nose is . He said, “And thou, Capt.”
**** END BLOCK ****
```

### 5. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `ד`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: ד
**** HEBREW ****
<b>ובלבד כו'. </b>מתני' הנ"ל:
**** ENGLISH ****
As long as he is. The Lord:
**** END BLOCK ****
```

### 6. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 3 — marker `ה`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 3
marker: ה
**** HEBREW ****
<b>וחרמי כו'. </b>עבא"ח סי' ש"ו סי"ב:
**** ENGLISH ****
And my brother is a. A.C.:
**** END BLOCK ****
```

### 7. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 30 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=30#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 30
marker: א
**** HEBREW ****
<b>צבור כו'. </b>כתב הריב"ש לפי שלא היו נוהגים בזמניהם להזכיר בחרמיהם לשון שבועה ולכן כשנשבעו החרימו בלשון שבועה הוא דבר חדש לכן צריכין להתרת חכם וע"ל סכ"ה:
**** ENGLISH ****
A broken h. The Bible says that they would not have used their time to remind them of a weekly language, so when they were sworn in the language of the oath, they should be a new thing, so they should be wise, and they should not be wise
**** END BLOCK ****
```

### 8. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 30 — marker `ב`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=30#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 30
marker: ב
**** HEBREW ****
<b>ויתירו להם כו'. </b>שאין א' מבני העיר יכולין להתיר דהוי כמו נדרי עצמו שאין מתיר כמ"ש בפ"ב דנגעים ובירושלמי קונם הנייתי על בני עירי אינו נשאל לזקן שיש שם וכנ"ל ס"ה וס"ו ואמרינן שם נדרה אשה ושמעה בעלה ולא הפר לה פשיטא שאין מפר לה לענין הבעל מהו שיפר לה לענין הזקן מה אנן קיימין אי בנדרים שבינו לבינה נדרי עצמו הן כו':
**** ENGLISH ****
Let them be called. There is no Hashem of the sons of the city to allow him to be cursed like Wendri himself, who does not permit the Lord’s name and his wife, and did not deny her that she had no need for the old man who had no interest in what the old man had done
**** END BLOCK ****
```

### 9. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 30 — marker `ג`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=30#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 30
marker: ג
**** HEBREW ****
<b>ויכולים המתירים כו'. </b>דע"כ לא איבעיא לן בנדרים ע"ג א' בעל מהו כו' אלא משום דכתיב אותה כו' ועריב"ש סי' תס"א:
**** ENGLISH ****
They can be seen as “. I am not afraid of Hashem’s Word, but rather because of Hashem’s Word, I am Hashem’s Word
**** END BLOCK ****
```

### 10. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 30 — marker `ד`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=30#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 30
marker: ד
**** HEBREW ****
<b>וע"ל כתבתי כו'. </b>ונראה להוכיח כמ"ש כאן ממ"ש בגיטין מ"ו א' מ"ט דר"י כו' ורבנן כו' אע"ג שרבים נשבעו כמ"ש כי נשבעו כו':
**** ENGLISH ****
I wrote him as well. It seems to prove that the Lord is here from the High Court and that many people have sworn in as “a Hashem”:
**** END BLOCK ****
```

### 11. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 30 — marker `ה`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=30#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 30
marker: ה
**** HEBREW ****
<b>מיהו כו'. </b>שה"ה כיחידים כנ"ל ועריב"ש סי' קפ"ה ועש"ך ושגה כי ידוע שתשובת המיוחסות להרמב"ן הם תשובת הרשב"א:
**** ENGLISH ****
Who is called? “The Lord is the same as Hashem’s people and the people of Israel and the people of Israel, and it is known that the answer attributed to the Lord is the answer to the Lord.”
**** END BLOCK ****
```

### 12. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 31 — marker `א`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=31#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 31
marker: א
**** HEBREW ****
<b>קהל כו'. </b>כמ"ש בפ"ק דהוריות ג' ב'. רשב"א:
**** ENGLISH ****
The audience is a. As a result of Hashem’s Word:
**** END BLOCK ****
```

### 13. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 31 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=31#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 31
marker: ב
**** HEBREW ****
<b>ומי כו'. </b>ע"ל סי' רכ"ט ס"ב:
**** ENGLISH ****
And who is called. According to C.C.:
**** END BLOCK ****
```

### 14. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 31 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=31#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 31
marker: ג
**** HEBREW ****
<b>ואם נתנו כו'. </b>כמ"ש בירושלמי <small>(פ"ג) </small>דמגילה ז' מבני העיר כו' ואי בשקבלו אפי' יחיד נמי כו':
**** ENGLISH ****
And if they were given a qua. As a result of the city’s “sevent” and a single epic is filled with a single epic:
**** END BLOCK ****
```

### 15. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 33 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 33
marker: א
**** HEBREW ****
<b>הנשבע כו'. </b>דהוי כנשבע לבטל את המצוה כמ"ש בפ"ב דיבמות <small>(כ"א א') </small>ושמרתם את משמרתי עשו משמרת למשמרתי ונתנה תורה רשות לכל דור ודור לעשות תקנות וסייגים:
**** ENGLISH ****
One who swore etc. — it is like swearing to nullify a mitzvah as in chapter 2 of Yevamos (21 side a): "and you shall keep My watch" — make a watch for My watch; Torah gave permission to each generation to make enactments and fences.
**** END BLOCK ****
```

### 16. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 33 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 33
marker: ב
**** HEBREW ****
<b>הוי שבועת שוא. </b>כמ"ש בספ"ג דשבועות ור"ל שא"צ היתר כלל ולוקה כמש"ש וכמ"ש במרדכי ריש שבועות ע"ש וכמש"ל סי' רל"ט ס"ד וצ"ע אטו מי עדיף מכל תקנות חז"ל ומדרש חכמים וע"ש ס"ז בהג"ה ומ"מ נ"ל כו' קריאת התורה כו' ואפשר דכאן מיירי בתקנת שלא לעשות והרשב"א אזיל לשיטתו כמש"ש ס"ו בד"א כו' ועש"ך שם וכאן. ודברי המרדכי דשם צ"ע שכתב דנדר שוא חל וצריך להתירו וע"ל סי' רל"ב ס"ה וכן מ"ש אח"כ אבל במקומות אחרים כו' דאין ראיה משם דאינו מן התורה כמש"ל סי' רמ"ו ס"א בהג"ה ובשעת הדחק כו' וכמ"ש בפ"ק דנדרים <small>(ח' א') </small>ועיקר דשל תורה א"צ התרה אבל ל"ת של דבריהם צריך התרה וכן כאן וכמ"ש בתשובות הרמב"ן והריב"ש:
**** ENGLISH ****
It is a vain oath. As written in chapter 3 of Shevuot and Rashi means no annulment is needed at all and he receives lashes as written; and as Mordechai wrote beginning of Shevuot — see there; and as explained above siman 239 seif 4 — requires study: are not all enactments of the sages and midrash of sages etc. — see there seif 67 in the gloss; nevertheless it appears to me etc. Torah reading etc.; and it is possible here it deals with an enactment not to do, and Rashba follows his view as written above seif 66 in the words "however" etc., and Shach there and here. And Mordechai's words there require study, for he wrote a vain vow takes effect and needs release — see below siman 232 seif 5; and so he wrote afterward "but in other places" etc., that there is no proof from there that it is not from the Torah, as written above siman 246 seif 1 in the gloss; and in a time of pressure etc., as written in chapter 1 of Nedarim (8a); and the main point is that of Torah no annulment is needed, but a rabbinic prohibition of their words needs annulment — and so here — as written in responsa of Ramban and Rivash:
**** END BLOCK ****
```

### 17. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 33 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 33
marker: ג
**** HEBREW ****
<b>ואפי' נשבע כו'. </b>דשבועת סיני קדמה:
**** ENGLISH ****
I swear to Hashem. The Chinese Week:
**** END BLOCK ****
```

### 18. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 33 — marker `ד`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 33
marker: ד
**** HEBREW ****
<b>ולא יוכל כו'. </b>וראיה מיהונתן <small>(שמואל א' י"ד) . </small>שם:
**** ENGLISH ****
And he can't. And he was called the Lord. Name:
**** END BLOCK ****
```

### 19. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 33 — marker `ה`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 33
marker: ה
**** HEBREW ****
<b>ואסור לעבור כו'. </b>כמ"ש בפכ"ה <small>(ק"י א'):</small>
**** ENGLISH ****
It is forbidden to pass as well. As a result of Hashem’s Word:
**** END BLOCK ****
```

### 20. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 34 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=34#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 34
marker: _
**** HEBREW ****
<b>אם כו'. </b>כנ"ל סל"א:
**** ENGLISH ****
If you are a . Same as Sal:
**** END BLOCK ****
```

### 21. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 35 — marker `א`

- Quality: **error** — chunk_seam_duplicate, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=35#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 35
marker: א
**** HEBREW ****
<b>אי אפשר כו'. </b>שאף הנולדים כבר א"א להשביע אא"כ יסכים ויענה אמן כמ"ש בספ"ג דשבועות כ"ט ב' וז"ל הריב"ש בסי' קפ"ה כתב הרמב"ן כו' שמי שלא ענה אמן אחר השבועה אין השבועה חלה עליו כלל וא"צ היתר שלא מצינו מושבע מפי אחרים ולא ענה אמן שיהא חייב אלא בשבועת העדות מגזירת הכתוב והראב"ד ז"ל מחמיר בשבועה שמשביע ש"ץ אפי' לא ענה אמן לפי שהוא משביע לדעתם וברצונם עכ"ל משא"כ בכה"ג וז"ש בפר"א כי השבועה הגדולה היתה וכי שבועה נשבעו כל ישראל אלא להודיעך שהחרם היא השבועה כו' וכן היתה שבועת שאול נידוי וחרם וכן שבועת יהושע ולכן אפי' על הנולדים חל כמ"ש במלכים <small>(א' ט"ז) </small>וז"ש אבל נידוי כו' וכמ"ש <small>(יהושע ז׳:י״ג) </small>חרם בקרבך כו' וז"ש בסכ"ה נדרים כו' שאינו כו' ואפילו הזכירו כו':
**** ENGLISH ****
I can't be called. Hashem’s Word says, “Hashem’s people will be blessed with Hashem’s Word, and that Hashem’s people will not be saved from Hashem’s presence, and that Hashem’s people will not be saved from Hashem’s presence, and that Hashem’s people will not be saved
Hashem’s promise to Abraham and his people, “I am Hashem’s people, and I am Hashem’s covenant with you, and I am Hashem’s people, and I am Hashem’s people, and I am Hashem’s people, and I am Hashem’s people.”
**** END BLOCK ****
```

### 22. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 35 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=35#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 35
marker: ב
**** HEBREW ****
<b>קהל כו'. </b>כמ"ש בספ"ג דשבועות כ"ט א' שבועה שאוכל ככר זה שבועה כו' וערא"ש שם בשם ירושלמי:
**** ENGLISH ****
The audience is a. As a result of this week’s book, “T.A., which eats as a pillow, is called R. and is named Jerusalem:
**** END BLOCK ****
```

### 23. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 35 — marker `ג`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=35#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 35
marker: ג
**** HEBREW ****
<b>ויש מחמירין. </b>זה כתב הד"מ ע"פ מ"ש הרא"ש בכלל ז' ס"ד שעשו תקנה נגד חרם הראשון וע"פ התקנה נעשו שטרות ואמר שלא נפסלו השטרו' ולא דמי למ"ש בפ"ק דתמורה (ד' ב' ה"ו) לרבא דאי עביד לא מהני דשם במצות דאורייתא דא"א לבטלן משא"כ כאן ועוד חכם עוקר הנדר מעיקרו וכשיתירו החרם כאלו לא היה מעולם כמ"ש בשבועות כ"ז כ"ח וכן נזיר שנטמא ושתה יין ואח"כ נשאל על נזרו אינו לוקה וכתב בד"מ שזה סותר למש"ש ס"ו שהוא סברא ראשונה הנ"ל אבל מל"מ כתב דמ"ש כאן מיירי לאחר התרת חרם שחל התקנה למפרע וכ"כ ש"ך. ומ"מ צ"ע במה שכתב שחכם עוקר כו' שזה אינו בחרמי ציבור כמש"ל סכ"ו וכן הקשה במל"מ ומה שתירץ בהגהת ש"ך דהכא מיירי שניתר ע"פ חכם לשון התשובה לא משמע כן וכן מ"ש דל"ד לההיא דתמורה כו' עבסי' ר"ל בהג"ה שלא כ' כן ועבח"מ סי' ר"ח מש"ש וע"ש בהנ"ה:
**** ENGLISH ****
There is aggravated. It was written by the Bible, and it was not written in Hashem’s Word, and that it would not be the same as Hashem’s people
But from the Bible, he wrote, “Here is my fault after a boycott that has taken place for the riot and so forth.” And he said, “What is it that the Lord’s Prayer is not in His hands, and that He is not in His Word, and that He is the Lord’s Prayer, and that He is the Lord’s Prayer, and that He is the Lord’s Prayer, which is not the same as the Lord’s
**** END BLOCK ****
```

### 24. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 36 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=36#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 36
marker: _
**** HEBREW ****
<b>מי שנדר כו'. </b>כמו נדרי הקדש די"ל התרה כמ"ש בערכין כ"ג א' וכמ"ש הרמב"ם בפ"ד מה"נ וכן נדרי צדקה כמ"ש בסמ"ב:
**** ENGLISH ****
Who is vowed to be. As a result of Hashem’s Word, Hashem’s promise to Abraham and Hashem’s people in the Holy Spirit: “The Lord’s Prayer and the Word of the Holy One.”
**** END BLOCK ****
```

### 25. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 37 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=37#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 37
marker: א
**** HEBREW ****
<b>הנשבע ע"ד כו'. </b>ז"ל הריב"ש בסי' קפ"ה בקוצר נשאלתי כו' ואני השבתי שהנשבע ע"ד יכול חבירו להתירו לעולם שלא ע"פ חכם כמו הבעל דאמרינן כל הנודרת כו' ולא גרע מפרש בחבירו מסתם בבעל וזו סברא קדומה הביאה הרמב"ן אבל אינה נכונה דא"כ דיו מן הדין להיות כנדון דאם שמע שתק קיים הנדר אע"פ שבבעל ביום שמעו גזירת הכתוב הוא משום שלום בית ואין נוהג באחר תדע דאמרינן שם ע"ב א' גירשה והחזירה כו' אע"פ שע"ד בעלה היתה וזו סברת הרמב"ן ז"ל ומיהו אף בזו יש לדון שאף בשעת שמיעה א"י לבטלו דמ"ש ע"ד בעלה נודרת ה"ק דאין בלבה שיתקיים נדר זה אם יקפיד בעלה אבל האומר ע"ד פלוני אפשר שדעתו להוציא מידי הערמה כמש"ש כ"ה א' כשהן משביעין אותו כו' ועוד דאין ללמוד מהפרת הבעל דא"כ הל"ל בכל לשון שמגלה דעתו הבעל שאינו רוצה להוי בטל ואמרינן שם ע"ז ב' תניא האומר כו' ובעל שאמר כו' אלא ודאי גזירת הכתוב היא שהרי אפי' עומדת וצווחת שנודרת ע"מ שלא יוכל בעלה להפר אין בדבריה כלום כמ"ש התוס' וכן הבעל מיפר אפי' נדרה ע"ד רבים [וער"נ ע"ג ב' ד"ה ואיכא דילפינן כו'] ואין דעת הרא"ש וטור כן כמ"ש סי' רל"א בש"ע והג"ה אבל אם כו' וכתב בתשובה שהטעם מ"ש כל הנודרת כו' הוא טעם עיקרי שהרי סמכו ע"ז בכמה מקומות כמ"ש בפ"ג דיבמות <small>(כ"ט ב') </small>ובפ"ג דשבת ובפ"י דנדרים ובנדה מ"ו ב' ועתוס' שם ד"ה כדרב כו' א"נ משום כו':
**** ENGLISH ****
I swear by Hashem. He said, “The Lord’s promise is that the Lord is not the same as the Lord’s Prayer, nor is it possible for him to make him know that he is not the same as the Lord’s Prayer, but that he is not the same as the Lord’s Prayer, and he is not the same as the Lord’s Prayer.”
He said, “And the Lord’s Prayer is to be given to him, and the Lord’s Prayer will be given to him.”
He said, “No, no matter how much is the Lord’s name, nor is it the Lord’s name, nor is it the same as the Lord’s Prayer, nor is it possible for him to do so.”
**** END BLOCK ****
```

### 26. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 37 — marker `ב`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=37#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 37
marker: ב
**** HEBREW ****
<b>אא"כ כו'. </b>כמ"ש בפ"ב <small>(י"ח ב') </small>סתם נדרים להחמיר ופירושן להקל וע"ל סי' ר"ח ס"א:
**** ENGLISH ****
I am so. As a result of Hashem’s Word, we are just going to make it easier and make it easier
**** END BLOCK ****
```

### 27. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 38 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=38#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 38
marker: _
**** HEBREW ****
<b>נשבע שלא כו'. </b>דהוי כתולה נדרו בדבר וקובע זמן לנדרו:
**** ENGLISH ****
I swear it's not so. Devi as a virgin was arranged in the word and set time for Landro:
**** END BLOCK ****
```

### 28. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 39 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=39#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 39
marker: א
**** HEBREW ****
<b>הנשבע כו'. </b>כמ"ש בספ"ה:
**** ENGLISH ****
I swear to Hashem. As a result of the ISA:
**** END BLOCK ****
```

### 29. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 39 — marker `ב`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=39#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 39
marker: ב
**** HEBREW ****
<b>אבל כו'. </b>כיון שרוצה בקיום תנאו ול"ד לרישא דשם כאלו נתקיים התנאי. שם אבל הרא"ש פסק שיוכל להאריך לו זמן ובא"ח כתב שאם האריך לו זמן פטור מכל השבועה דנדר שהותר מקצתו הותר כולו. וכתב בבד"ה ומ"מ ראוי לחוש לדברי הרשב"א:
**** ENGLISH ****
But yes. For those who want to be hated and to “death such a condition.” There, however, the Rashi ruled that he could extend time to him and that if he had given him an exemption from the entire oath he had been given to him. It is written in the Bible and it is appropriate to feel the words of the Lord:
**** END BLOCK ****
```

### 30. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: _
**** HEBREW ****
<b>בד"א כו'. </b>עבה"ג וערא"ש שם וע"ל ס"ז:
**** ENGLISH ****
In D.C. There is a thick and thick darkness, and there is a lot of light
**** END BLOCK ****
```

### 31. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 40 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=40#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 40
marker: _
**** HEBREW ****
<b>אב כו'. </b>דקי"ל כר' יונתן דרבא ס"ל כוותיה בר"פ השואל. וערא"ש בפ"ה דחולין ס"ב ולעיל סי' ט"ז ס"ב:
**** ENGLISH ****
Father B. Rav Yonatan Darba, as well as his sons, shall be blessed. The Bible says, “The Lord’s Prayer and the Holy Spirit:
**** END BLOCK ****
```

### 32. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 41 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=41#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 41
marker: _
**** HEBREW ****
<b>הנשבע כו'. </b>ז"ל בתשובת רמב"ן ורשב"א הנשבע כו' בכל יום כו' לפי שאלו ב' דברים הם א' שקבל לעשות דבר פלוני ולא תלה בזמן ב' שקבל לעשות בזמן פלוני ואין זה תלוי בזה אבל אם נשבע כו' הוי כנשבע על הככר לאכלה היום ולא אכלה שלא מהני לאכול אח"כ וא"צ לאכול אח"כ כמ"ש בריש שבועות ג' ב' וש"מ והחילוק זה הוא דומה למ"ש בירושלמי והביאו הרא"ש בפ"ק דשבת ופ"ק דתענית בין נדר להתענות יום סתם ליום זה עכ"ל וכתב מהרמ"פ סי' ע"ב שהחילוק בין רישא לסיפא שסיפא אמר נדרו וקציבת זמנו בפ"א וכתב שם ואף שהרא"ש בכלל ח' ס"ו כתב אע"פ שלא תבעו בתוך הזמן השבועה במקומה עומדת כי הזמן נעשה לזרז ועיקר השבועה על הפרעון וכ"מ לשון השטר ול"ד לנשבע שיאכל ככר זה היום כו' דהתם אינו מחויב לאכול אותו ככר ועיקר השבועה על הזמן אבל הכא מחויב לפרוע ועיקר דעתם על הפרעון והזמן לזרז כו' ע"ש וכתב מהרמ"פ שהרא"ש אינו חולק כי דוקא שם שלשון השטר היה ככה. והריב"ש כתב כיון שעבר הזמן פטור כמו נשבע על הככר כו' וכ"כ הרשב"א ואע"פ שהרא"ש כתב בהיפך אין דבריו נראין ואפי' לדבריו יש להקל כאן דשאני פריעת חוב כו' ובתשובה אחרת כתב לחלק כמ"ש בהג"ה כאן הואיל כו' משא"כ בנדון דידיה ולכן כתב הרב ג"כ לחלק בין רישא לסיפא ודבריו תמוהין כאן ודאי א"א לחלק אלא כמ"ש מהרמ"פ או כמ"ש מ"ז לחלק בין אמר בלמ"ד או בבי"ת וכ"מ הלשון ועוד שהרי כתב וי"א כו' שהוא דעת הרא"ש וכן הקשה ט"ז:
**** ENGLISH ****
I swear to Hashem. He said, “It is a day that I will be able to do this, and I will not be able to do it in the day of the day, and I will not eat it in the same way that I will be able to eat.”
He said, “The Lord’s promise is that the Lord’s people will not be cursed and cursed, and that Hashem’s people will not be able to do so, and that Hashem’s Word is not the same as Hashem’s Word, and that Hashem’s Word is not the same as Hashem’s Word. And then, and
He said, “This is what Hashem’s word is like, and that Hashem’s Word is in His Word, and that He will be given to Him, and that He will be given to him, and that He will be given to him.”
**** END BLOCK ****
```

### 33. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 42 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=42#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 42
marker: _
**** HEBREW ****
<b>נדר כו' והוא כו'. </b>כמ"ש בספ"ז דנדרים נ"ט א'. שם בתשובה:
**** ENGLISH ****
“And he’s called.” As a result of the Spokes, N.A. In reply:
**** END BLOCK ****
```

### 34. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 43 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=43#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 43
marker: _
**** HEBREW ****
<b>וי"א דוקא כו'. </b>בהגמ"ר דשבועות ושם אמר מחמת חרם הקהלות ואמר אם בא בעודו כו' בודאי דאין זה דעת הקהלות וכיון שהותר שעה א' הותרה עולמית ולא תצא מהתירה הראשון ונדר שהותר מקצתו הותר כולו אבל אם בא אח"כ הוי כמ"ש ברפ"ט קונם לבית זה כו' דהוי נולד ושם ס"ה א' הנודר מחבירו כו' וכנ"ל ס"כ איש ואשה כו' וכתב בד"מ ואפשר דאף הרשב"א בעל סברא הראשונה ל"ק אלא לפטור מהקנס אבל על השבועה צריך חרטה והתרה דאין פותחין בנולד וז"ש בהג"ה אבל אם כו' ול"נ דאף אם בא בעודו בהמרותו צריך חרטה והתרה מטעם הנ"ל דאין פותחין בנולד ודוקא בחרם הקהלות אמר כן כנ"ל:
**** ENGLISH ****
Oh, and I'm like that. In the Bible, he said, “It is not the opinion of the people, nor is it possible for them to come out of the world’s first place, and not to leave the first shot, but to the extent of the Lord’s name, and to the end of the earth, and to the end of the Lord’s Prayer, and to the end of the Lord’s Prayer, and to the name of the Lord’s name of the Lord, is the Lord’s Prayer of the Lord’s Prayer of the Lord’s Prayer
But if Hashem’s Word and Hashem’s people are in the world, Hashem’s Word is in the world, and Hashem’s Word is in the world, and Hashem’s Word is in the world
**** END BLOCK ****
```

### 35. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 44 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=44#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 44
marker: _
**** HEBREW ****
<b>שנים כו'. </b>עש"ך:
**** ENGLISH ****
years old. by:
**** END BLOCK ****
```

### 36. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: _
**** HEBREW ****
<b>ואם נשאל כו'. </b>הרמב"ם דבשביל שנהנה לא בטלה התרה כ"מ וז"ש בפ"ה דב"ב <small>(ע"ד א') </small>הל"ל מופר לך ועלח"מ שם:
**** ENGLISH ****
If asked as a. Hashem’s Word tells us that Hashem’s Word is not Hashem’s Word, and Hashem’s Word is Hashem’s Word
**** END BLOCK ****
```

### 37. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: _
**** HEBREW ****
<b>נשבע כו'. </b>כנ"ל בסעיף שקדם ועבה"ג ועב"י בפי' הירושלמי הנ"ל:
**** ENGLISH ****
I swear to him. This is the same as the Lord’s Prayer:
**** END BLOCK ****
```

### 38. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: א
**** HEBREW ****
<b>מי כו'. </b>כנ"ל ריש הסי':
**** ENGLISH ****
Who is called. The same is the case:
**** END BLOCK ****
```

### 39. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `ב`

- Quality: **error** — chunk_seam_duplicate, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: ב
**** HEBREW ****
<b>ומיהו כו'. </b>דבעינן שיעקור הנדר מעיקרו כמ"ש בפ' המדיר <small>(ע"ד ב') </small>מה בין חכם כו' וזש"ש שר"ג עצמו הטריח למצא פתח לרב סחורה וכן ממש"ש לבך עלך כדו תהית הרא"ש שם:
**** ENGLISH ****
And who is so. Hashem’s Word tells us that Hashem’s Word is Hashem’s Word, and that He is Hashem’s people, and that He is Hashem’s people, and that He is Hashem’s people, and that He is Hashem’s people, and that He is Hashem’s people
**** END BLOCK ****
```

### 40. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 7 — marker `ג`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 7
marker: ג
**** HEBREW ****
<b>וי"א דחוזרין כו' ויש מי כו'. </b>ע' מרדכי ספ"ג דשבועות שהאריך וז"ל בקיצור כתב ר"מ וז"ל פ"ג דנדרים מסקינן הלכתא פותחין בחרטה ומשמע כולה שמעתא שם בחרטה בעלמא כדו תהית כו' ולא כמ"ש רש"י פ' הדר שצריך למצוא פתח כו' וכ"מ שם כ' א' דפותחין קולא הוא דקאמר בשלמא כו' ועתוס' דעירובין ס"ד ב' ד"ה פותחין כו' וכתב שם ור"י בכור שור כתב וז"ל ג' חרטות הן א' בנולד ואין פותחין בו ב' שהיה בעולם אבל לא ידע בו ולכ"ע פותחין בו והג' דבר שלא בא לעולם אבל רגיל לבא בעולם ובהא פליגי אם פותחין בחרטה זו ומש"ש לבך עלך אחר שמצא פתח א"ל עדיין אתה עומד כמו בשעת נדר כלומד הזהר שלא תשקר ודייק בגמ' ממ"ש לבך עלך דמשמע שאירע הדבר לאחר הנדר כו' ע"ש:
**** ENGLISH ****
“And there are those who are called.” In the words of the Lord’s Prayer, Hashem’s promise is that Hashem’s Word is in heaven, and that Hashem’s Word is in heaven, and that He is in the world, and He will not be able to find Hashem’s name
And the Lord has never come to the world, but it is normal to come in the world, and if you are developed by this sword, and you have found another Hashem who has found that you are still standing like a vow that is not false and false in Hashem’s Word that has happened to you
**** END BLOCK ****
```

### 41. `siman_228/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: _
**** HEBREW ****
<b>החרם כו'. </b>עבה"ג וקושית הב"י שהקשה מה ענין המנדה לאחר כו' איני מכיר אם החרם הוא נדר אטו המדיר לאחר מנכסיו א"צ התרה ואף שבסי"ז מחלק בכך שכתב וה"ה למנדה כו' וכן כו' אינו ענין לכאן וגם ראיה ממש"ש ז' ב' ת"ח מנדה לעצמו ומיפר לעצמו אלמא א"צ התרת חכם וגם שאמרו מיפר ולא קאמר ומתיר אלמא כעין הפרת בעל בלא פתח וחרטה וכן ממש"ש כי הא דמ"ז כו' ושם ודאי לא היה פתח וחרטה [ועמ"ש בסכ"ה]:
**** ENGLISH ****
The boycott is . And I don’t know if it’s the case of Hashem’s people, and I don’t know if Hashem’s Word is not the same as Hashem’s people, and it’s not the same as Hashem’s people
**** END BLOCK ****
```

### 42. `siman_228/beur-hagra/part-002.txt` — beur-hagra — seif 45 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-002.txt#slug=beur-hagra#seif=45#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 45
marker: א
**** HEBREW ****
<b>המנדה כו'. </b>עבה"ג והטעם דמ"ד דא"ל הפרה דהוי כע"ד המקום דא"ל הפרה ממ"ש בספ"ג דשבועות כי היכי דלא ליהוי הפרה כו' וסברא ראשונה חולק גם בזה וכנ"ל סכ"ב בהג"ה:
**** ENGLISH ****
"The one who imposed," etc. — Abudraham; and the reason according to the one who says that telling a minor "annul" is like telling the Place "annul," as written at the end of chapter 3 of Shevuot — that there not be annulment, etc.; and the first reasoning also disagrees on this, as in the Rama gloss above.
**** END BLOCK ****
```

### 43. `siman_228/beur-hagra/part-002.txt` — beur-hagra — seif 45 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-002.txt#slug=beur-hagra#seif=45#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 45
marker: ב
**** HEBREW ****
<b>(ליקוט) ויש מי כו'. </b>דנידוי העה"ז הוא לבריות ונידוי העה"ב הוא למקום לכן העה"ז תלוי היתירו לבריות ועה"ב תלוי היתירו למקום ולכן עצמותיו של יהודה מגולגלים היו עד דשרייה רחמנא. מרדכי פ"ו דב"מ סי' תצ"ג (ע"כ):
**** ENGLISH ****
(Likkut) And there is one who. Nidui of this world is for creatures and nidui of the World to Come is for the Place; therefore this world's depends on release for creatures, and the World's to Come depends on release for the Place; therefore Yehuda's bones rolled until the Merciful One released him. Mordechai chapter 6 of Bava Metzia siman 993 — end of his words.
**** END BLOCK ****
```

### 44. `siman_228/beur-hagra/part-002.txt` — beur-hagra — seif 45 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-002.txt#slug=beur-hagra#seif=45#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 45
marker: ג
**** HEBREW ****
<b>ואם כבר כו'. </b>דודאי דעת הג"ה מסכים לזה:
**** ENGLISH ****
And if they are already . The lawyer agrees to this:
**** END BLOCK ****
```

### 45. `siman_228/beur-hagra/part-002.txt` — beur-hagra — seif 45 — marker `ד`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/beur-hagra/part-002.txt#slug=beur-hagra#seif=45#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 45
marker: ד
**** HEBREW ****
<b>כדין כו'. </b>כנ"ל להטעם דדעת רבים מסכים לדבר מצוה כ"ש בהקב"ה:
**** ENGLISH ****
To them as well. The same goes for many people to believe in Hashem’s Word:
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

siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=29#marker=_
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%90
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%91
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%92
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%93
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=3#marker=%D7%94
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=30#marker=%D7%90
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=30#marker=%D7%91
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=30#marker=%D7%92
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=30#marker=%D7%93
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=30#marker=%D7%94
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=31#marker=%D7%90
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=31#marker=%D7%91
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=31#marker=%D7%92
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%90
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%91
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%92
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%93
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=33#marker=%D7%94
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=34#marker=_
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=35#marker=%D7%90
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=35#marker=%D7%91
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=35#marker=%D7%92
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=36#marker=_
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=37#marker=%D7%90
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=37#marker=%D7%91
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=38#marker=_
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=39#marker=%D7%90
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=39#marker=%D7%91
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=_
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=40#marker=_
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=41#marker=_
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=42#marker=_
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=43#marker=_
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=44#marker=_
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=_
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=_
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%90
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%91
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=7#marker=%D7%92
siman_228/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=_
siman_228/beur-hagra/part-002.txt#slug=beur-hagra#seif=45#marker=%D7%90
siman_228/beur-hagra/part-002.txt#slug=beur-hagra#seif=45#marker=%D7%91
siman_228/beur-hagra/part-002.txt#slug=beur-hagra#seif=45#marker=%D7%92
siman_228/beur-hagra/part-002.txt#slug=beur-hagra#seif=45#marker=%D7%93