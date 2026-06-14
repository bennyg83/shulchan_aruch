# Editorial retranslation — Siman 331 (part 5/5)

Generated: 2026-06-12T13:50:21.680Z

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

## Blocks in this batch (45 of 815 remaining in scope)

### 1. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 25 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 25
marker: א
**** HEBREW ****
["<b>אלא מן המוקף. </b>דכיון שאין צריכין שיעור מן התורה אין מפרישין אותה במדה אלא באומד לכוון השיעור שנתנו בו חכמים) ואין יכולים לאמד אלא במוקף יחד:"]
**** ENGLISH ****
(But from the surrounded. There is no need for a lesson from the Torah that does not instill it in death, but rather in the teaching of the lesson we have given in it, and cannot be taught, but in the reflection together
**** END BLOCK ****
```

### 2. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 25 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 25
marker: ב
**** HEBREW ****
["תרומתו תרומה דהא מן התורה אפילו בחטה אחת סגי:"]
**** ENGLISH ****
"The contribution of Hashem's people is even one of them."
**** END BLOCK ****
```

### 3. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 25 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 25
marker: ג
**** HEBREW ****
["<b>לא אמר כלום. </b>שהרי אינו יכול לקיים מתנות כהונה:"]
**** ENGLISH ****
“I didn’t say anything. For he can't have gifts."
**** END BLOCK ****
```

### 4. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 26 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=26#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 26
marker: _
**** HEBREW ****
<b>תורם מאחד כו'. </b>דחשיב כמוקף וכן חביות שלא סתם את פיהם חשבי כמוקפים אבל משיסתם את פיהם אינן כמוקפין ואפי' הן בבית א' תורם מכל אחד ואחד:
**** ENGLISH ****
A donor from one. An assimi as well as barrels that do not just think of them as attackers, but that their mouths are not like a penis and a character are at home A contributes from each and every one:
**** END BLOCK ****
```

### 5. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 27 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=27#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 27
marker: _
**** HEBREW ****
<b>המקדים כו'. </b>לפי שצריך להפריש בכורים תחלה לכל ואח"כ תרומה גדולה שקראה התורה ראשית ואח"כ מעשר ראשון שיש בו תרומת מעשר וסתם תרומה נקראת ראשית בפסוק ואח"כ מעשר שני או מעשר עני ואם הקדים אחד לחבירו עובר בלא תעשה דמלאתך ודמעך לא תאחר ומה שעשה עשוי:
**** ENGLISH ****
The precedent is . It is said that the Torah must be expropriated to all and then a great contribution that the Torah has read first and then from the top ten that it has a donation from ten and only a donation is called first in the verse and then from ten or ten poor, and if one is preceded by a person, it will not be done by your work, and what is made of it:
**** END BLOCK ****
```

### 6. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 28 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=28#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 28
marker: א
**** HEBREW ****
["<b>א' ממאה ומעט יותר. </b>שהא' ממאה הוא מעשר מן המעשר והמעט יותר הוא תרומה גדולה ששיעורה בזמן הזה בכל שהוא:"]
**** ENGLISH ****
(a) from a hundred and a little more. The A of 100 is ten of the rich and the smaller one is a great contribution to this time in all that is:
**** END BLOCK ****
```

### 7. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 28 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=28#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 28
marker: ב
**** HEBREW ****
["<b>והרי הוא עכשיו חולין. </b>עד שיפריש התרומה:"]
**** ENGLISH ****
[And he is a sicker now. Until the donation is improved."
**** END BLOCK ****
```

### 8. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 28 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=28#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 28
marker: ג
**** HEBREW ****
["<b>והמעשר. </b>שראוי להיות למאה חולין אלו הרי הוא בכרי הגדול בצד זה שהפרשתי:"]
**** ENGLISH ****
[and the rich. It should be for this century, it is in the big bar on the side that I have interpreted.”
**** END BLOCK ****
```

### 9. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 29 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=29#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 29
marker: _
**** HEBREW ****
<b>עושה אדם כו'. </b>שנאמר כן תרימו גם אתם לרבות שלוחכם:
**** ENGLISH ****
Making a man like him. It is also said that you will also be saved from your conscience:
**** END BLOCK ****
```

### 10. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: א
**** HEBREW ****
["<b>מפריש כו'. </b>דקנין העובד כוכבים אינו מפקיע קדושת הקרקע בארץ ישראל אלא היא בקדושתה ומה שלקחה הישראל לא הוי ככבוש יחיד:"]
**** ENGLISH ****
[Crypt as V.] The work of the stars is not the holy land in the Land of Israel, but it is in holiness and what it takes for Israel not as a single occupied
**** END BLOCK ****
```

### 11. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: ב
**** HEBREW ****
["<b>מה שאין כן בסוריא. </b>דיש קנין לעובד כוכבים בסוריא להפקיע מן המעשרות ומן השביעית:"]
**** ENGLISH ****
"What's not so in Sofia. Deshi Kennee for a Star worker in Soria to rescue the Tens and 7th:
**** END BLOCK ****
```

### 12. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 31 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=31#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 31
marker: א
**** HEBREW ****
["<b>תרומתו תרומה. </b>דכיון שיש שם יפות והוא אומר לו כלך אצל יפות משמעות לשונו הוא גלוי דעתא דניחא ליה במה שזה עושה ואינו מקפיד וה\"ז כשלוחו:"]
**** ENGLISH ****
[His contribution is a contribution. "There is a beautiful name, and he tells him that you are in a beautiful manner that means to our tongue," he says, "I will give thanks to what it does and do not make sure, and that it is not so good."
**** END BLOCK ****
```

### 13. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 31 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=31#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 31
marker: ב
**** HEBREW ****
["<b>אין תרומתו תרומה. </b>דכיון שאין שם יפות והוא אומר לו כלך אצל יפות משמעות לשונו הוא לשון הקפדה כאילו מוחה בו ולא ניחא ליה ואינו שלוחו:"]
**** ENGLISH ****
[There is no contribution. "There is no beautiful name, and he says to him that he is with a beautiful tongue that means his tongue as if his brain is in it, and he does not possess it."
**** END BLOCK ****
```

### 14. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 31 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=31#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 31
marker: ג
**** HEBREW ****
["<b>ואם לקט כו'. </b>גילה דעתו בזה דניחא ליה:"]
**** ENGLISH ****
(And if you are a kn. He thought of it as a sign
**** END BLOCK ****
```

### 15. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 32 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=32#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 32
marker: א
**** HEBREW ****
["<b>לא יתרומו. </b>מפני שצריך לברך כדלקמן סעיף ע\"ח ואלו אין יכולין לברך כהוגן דהמדבר ואינו שומע צריך לשמוע הברכה והשומע ואינו מדבר הרי אינו יכול לברך וערום אסור לברך והשכור והסומא אינן יכולין לכוין להפריש את היפה:"]
**** ENGLISH ****
(I will not survive. Because it is necessary to bless you, and it is not possible to bless you, and it is not possible to hear the blessing and the hearer, and it is not possible to bless you, and the Torah cannot be blessed, and the sorcerererant cannot be blessed, and the sorcerant cannot be circulated
**** END BLOCK ****
```

### 16. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 32 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=32#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 32
marker: ב
**** HEBREW ****
["<b>אפילו לכתחלה. </b>תרומה שאינה צריכה שיעור אבל לא מעשר לוי שצריכה שיעור ומדידה ואלו אינם יכולים לכוין המדידה:"]
**** ENGLISH ****
[even to go. A contribution that does not need a lesson, but not from ten Levi that requires a class and a friend, and these cannot be done by the measurement
**** END BLOCK ****
```

### 17. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 33 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=33#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 33
marker: _
**** HEBREW ****
<b>תרומתו תרומה. </b>אפי' בתרומה. של תורה הואיל ונדריהן והקדישן קיימין מן התורה כדלעיל סי' רל"ג:
**** ENGLISH ****
Make a contribution. Epic in contribution. Hashem's Word and His Word is the same as Hashem's Word
**** END BLOCK ****
```

### 18. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 34 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=34#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 34
marker: _
**** HEBREW ****
<b>אבל אם אינו יודע. </b>אם כרי זה תרום או לא כו':
**** ENGLISH ****
But if he does not know. If this pillow is broken or not called:
**** END BLOCK ****
```

### 19. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 35 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=35#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 35
marker: _
**** HEBREW ****
<b>פירות השותפים כו'. </b>ז"ל העט"ז פירות השותפים חייבים בתרומות ומעשרות דגבי תרומה כתיב תרומותיכם וגבי מעשר כתיב מעשרותיכם לשון רבים של שנים משמע ואין צריכים ליטול רשות זה מזה אלא כל התורם מהם תרומתו תרומה דמסתמא כל אחד שליחות חבירו עושה בשותפות ואם תרם א' מהן בלא דעת חבירו ובא חבירו ותרם תרומה שנייה מפני שלא ידע שחבירו תרם אם ידוע בענינם שדרכם לסמוך זה ע"ז ואחד מחזיק מה שחבירו עושה ואם ידע זה שחבירו תרם לא היה הוא תורם והיה סומך על חבירו אפי' היה יודע שחבירו לא תרם כשיעור עין שלו או רעה או יפה או בינונית לא היה משנהו אין תרומת השני תרומה שהרי חברו שדרכו לסמוך עליו תרם והוי כשלוחו ואפי' לא תרם הראשון אותו השיעור שהיה הוא תורם כגון שתרם הראשון כשיעור עין רעה והוא עין יפה אפ"ה תרומת הראשון תרומה ותרומת השני אינה תרומה ואם לאו שאינו ידוע אם דרכן לסמוך זה על זה אם לא אלמא הם שותפין סתמא אע"ג דאמרינן שותפין סתמא אין צריכין ליטול רשות זה מזה וכל התורם מהם תרומתו תרומה ה"מ כשאין השני מגלה דעתו אם הוא עין רעה או יפה או בינונית אז אמרינן אם תרם הראשון כשיעור שתרם חבירו אין תרומת השני תרומה שהרי הראשון עשה שליחותו וכוון דעתו אבל אם לא תרם הראשון כשיעור שתרם חבירו אלא פחות ממנו הא חזינן שלא היה שלוחו של השני שהרי לא כוון דעתו ותרומת שניהם תרומה כל אחד בעד חלקו כן נ"ל לפרש דעת הרמב"ם בפ"ד דתרומו' לפי מה שהבין שם הכל בכ"מ ומעתה תמיהני על מה שסיים דבריו בש"ע כאן ונראה שבזמן הזה במעשר כו' בשלמא בתרומה טהורה איכא למימר עין רעה ועין יפה ושייך לומר אם תרם הראשון כשיעור שתרם חבירו כו' אבל במעשר מאי כשיעור שתרם חבירו כו' הלא לעולם צריך להפריש המעשר במדה שלא יגרע ולא יוסיף מדינו לכך כ"ל דבזמן הזה בין במעשר בין בתרומה תרומת השני אינה תרומה דבמעשר כיון שהפריש הא' מעשר כראוי הרי הפירות מתוקנים ואין בתרומת השני כלום ובתרומה נמי בזמן הזה כיון דשיעורה בכל שהוא וזה שהפריש הראשון הרי הפירות מתוקנים ואין בתרומת השני כלום. נ"ל:
**** ENGLISH ****
The fruit of the partners is . The pen of the fruit of the partners must be given to donations and dozens of contributions to the dictates of your contributions, and in the course of the Ten mitzvot, it means that you do not have to take this permission from each other, but all the contributors have made a contribution to the trampling of each of them, and if you have contributed to them, and if they do not know what they have done to them
And he did not change the second donation because his friend, through which to rely on him, was not his first contribution to the same lesson that he was a contributor, such as the first one as a bad eye rate, and he was a beautiful eye for the first contribution and the second donation is not a contribution, and if he is not known if he is not to rely on it if he is not a widower of his own
Hashem’s promise is that he does not believe in Hashem’s Word, but that he does not believe in Hashem’s Word, and that he does not believe in Hashem’s Word, and that he does not believe in Hashem’s Word, and he does not believe in Hashem’s Word
Tens between the contribution of the second donation does not make a beesciable contribution because the Ten mitzvot are corrected, and there is nothing in the second donation in this time as a model in all that is and that the first fruit is corrected and there is nothing in the second donation. NL:
**** END BLOCK ****
```

### 20. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 36 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=36#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 36
marker: _
**** HEBREW ****
<b>וביטל המשלח שליחותו קודם שידע. </b>וזה לא ידע ותרם:
**** ENGLISH ****
And he sent his mission before he knew. This is not known and understood:
**** END BLOCK ****
```

### 21. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 37 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=37#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 37
marker: _
**** HEBREW ****
<b>תרומתו תרומה. </b>דמסתמא שליח שוייה:
**** ENGLISH ****
Make a contribution. Dema is a messenger:
**** END BLOCK ****
```

### 22. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 38 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=38#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 38
marker: _
**** HEBREW ****
<b>תורמין כו'. </b>ודוקא להאכיל אבל לא להניח שלא נעשו אפוטרופסים לעשות שליחות היתומים אלא לפרנסה הכי אמרינן בגיטין דף נ"ב וכ"כ העט"ז:
**** ENGLISH ****
"Dear as a." And Dokka feeds, but not assume that the apostles were not made to make a mission of the orphans, but rather for the most stated support of the G-d and the pen:
**** END BLOCK ****
```

### 23. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 39 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=39#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 39
marker: א
**** HEBREW ****
["<b>תרומתן תרומה. </b>דקנאן ביאוש והוי הם הבעלים:"]
**** ENGLISH ****
[The contribution. Dickin in despair and he is the owner
**** END BLOCK ****
```

### 24. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 39 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=39#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 39
marker: ב
**** HEBREW ****
["<b>אין תרומתן תרומה. </b>דכיון דרודפין אחריהם הא חזינן דלא מייאשו:"]
**** ENGLISH ****
“There is no contribution. "The Lord's Prayer," he said
**** END BLOCK ****
```

### 25. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: א
**** HEBREW ****
["<b>פטורים מכולם. </b>דכיון שנעשה המירוח ומדגן ביד העובד כוכבים שהוא הזמן שחלה עליו חיובם נפטרו שנאמר דגנך ולא דגון עובד כוכבים:"]
**** ENGLISH ****
(They are all judged. The demon that was made of the wind and was arranged in the hand of the star worker who was the time when the debiter had passed away was said to be your fish and not a fisherman working in the stars:
**** END BLOCK ****
```

### 26. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: ב
**** HEBREW ****
["<b>ומפריש תרומה. </b>היינו תרומה גדולה:"]
**** ENGLISH ****
[and a donation. We were a great contribution:"
**** END BLOCK ****
```

### 27. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: ג
**** HEBREW ****
["<b>ותרומת מעשר. </b>מוכר לכהן ולוקח דמיה כדאיתא ברמב\"ם:"]
**** ENGLISH ****
[And you are from ten. It is known to serve and take a fee that is worthwhile in the United States
**** END BLOCK ****
```

### 28. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `ד`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: ד
**** HEBREW ****
["<b>מפני שהוא אומר ללוי. </b>במעשר ולכהן בתרומת מעשר אני באתי מכח איש שאין אתם יכולים ליטול ממנו כלום ומפני מה אמרו לא יתן תרומת מעשר לכהן כתרומה גדולה לפי שנאמר בתרומת מעשר כי תקחו מאת בני ישראל את המעשר טבל שאתה לוקח מישראל אתה מפריש ממנו תרומת מעשר ונותן לכהן אבל טבל שאתה לוקח מן העובד כוכבים אין אתה נותן לכהן תרומת מעשר שהפריש ממנה אלא מוכר לכהן ולוקח דמיו. רמב\"ם. והא דמוכרה לכהן היינו משום דבתרומת מעשר יש בה קדושה ואסורה לזרים ומוכרה לכהן:"]
**** ENGLISH ****
"Because he says to Loy. In the Ten mitzvot and in the Ten mitzvot, I come from the power of no one you cannot take away anything from, and because of what they say, you will not give a donation from the Ten mitzvot to serve as a great contribution that is said in the contribution of the Ten mitzvot that you will take from Israel the Ten mitzvot from which you take from the work of the stars, you do not give to serve from the Ten mitzvot that are sold from it. Rambam. “And the Lord of Israel was not Hashem’s presence, and it was not Hashem’s word, and it was not Hashem’s promise.”
**** END BLOCK ****
```

### 29. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 40 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=40#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 40
marker: _
**** HEBREW ****
<b>על מה שהם אוכלין. </b>שהרי אוכלין ברשות בעה"ב אבל לא על השאר שאין אדם תורם דבר שאינו שלו:
**** ENGLISH ****
What they eat about. For he is in possession of the United States, but not for the rest that no man contributes to his own:
**** END BLOCK ****
```

### 30. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 43 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=43#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 43
marker: _
**** HEBREW ****
<b>תרומתו תרומה. </b>ואין זה שינוי שליחות דכנוס שאמר בעה"ב ע"כ לאו דוקא שיכנוס ואח"כ יתרום שהרי אין דרך להכניס אא"כ נתרם:
**** ENGLISH ****
Make a contribution. This is not a change in the mission that he said to him that he would not, and that he had no way to bring him in
**** END BLOCK ****
```

### 31. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 44 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=44#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 44
marker: א
**** HEBREW ****
["<b>גזרו חכמים כו'. </b>משום בעלי כיסים שיתלו ממונם בעובד כוכבים כדי לפטרם:"]
**** ENGLISH ****
"They're wise." For those who have pockets who have their money in a star worker to be fired
**** END BLOCK ****
```

### 32. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 44 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=44#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 44
marker: ב
**** HEBREW ****
["<b>טעונה גניזה. </b>שמא בלבול שמים בד\"א בא\"י אבל עובד כוכבים שהפריש תרומה בח\"ל לא גזרו עליהן ומודיעין אותו שא\"צ לתרום ואינה תרומה כלל. הרמב\"ם וכ\"כ העט\"ז:"]
**** ENGLISH ****
[The genus season. There is confusion in the Bible, but a star worker who has made a donation in the Bible has not been condemned and informed that I will not contribute at all. The Holy Spirit and the Holy Spirit:
**** END BLOCK ****
```

### 33. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 45 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=45#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 45
marker: _
**** HEBREW ****
<b>לא אמר כלום. </b>שהרי מקדיש הוא כמו נדר ובנדר בעינן פיו ולבו שוין כדלעיל סי' ר"י:
**** ENGLISH ****
He said nothing. For he is like a vow and a vow in his mouth, and his heart is twisted as a model
**** END BLOCK ****
```

### 34. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 46 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=46#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 46
marker: _
**** HEBREW ****
<b>ה"ז תרומה כו'. </b>דדוקא בסעיף מ"ה שכוון לומר תרומה ואמר מעשר שבטל בדבור פיו מה שהיה במחשבתו אין תרומתו תרומה משא"כ הכא:
**** ENGLISH ****
This is a ‘producer’. Detailed in the section of the M.C., who intended to say a contribution and said that the Ten mitzvot had been abolished in his mind had no contribution to the law:
**** END BLOCK ****
```

### 35. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 47 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=47#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 47
marker: _
**** HEBREW ****
<b>ה"ז תרומה. </b>ואם לאו אינה תרומה:
**** ENGLISH ****
The “producer.” If Lao is not a contribution:
**** END BLOCK ****
```

### 36. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 48 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=48#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 48
marker: _
**** HEBREW ****
<b>ותחזור חולין כמו שהיתה. </b>והפירות טבלים עד שיפריש פעם שניה אותם שהפריש תחלה או פירות אחרות:
**** ENGLISH ****
You will return as sick as it was. And the fruits are planted until the second time, which the fertilization will begin or other fruits:
**** END BLOCK ****
```

### 37. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 49 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=49#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 49
marker: _
**** HEBREW ****
<b>דבריו קיימים. </b>שהדבר תלוי בדעת התורם:
**** ENGLISH ****
His words exist. This depends on the donor's opinion:
**** END BLOCK ****
```

### 38. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 5 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 5
marker: א
**** HEBREW ****
["<b>לעונת המעשרות כו'. </b>ע\"ל סעיף ע\"ט ופ' עונת המעשרות:"]
**** ENGLISH ****
[For the dozens of seasons. In accordance with the section of the season of the Tens:
**** END BLOCK ****
```

### 39. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 5 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 5
marker: ב
**** HEBREW ****
["<b>חייב בכל. </b>כדינו דהיינו שנותן תרומות ומעשרות לבעלים:"]
**** ENGLISH ****
(He needs everything. This means that they give donations and dozens to the owners
**** END BLOCK ****
```

### 40. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 5 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 5
marker: ג
**** HEBREW ****
["<b>ונותן ללוי ב' שלישי המעשר הראשון. </b>וב' שלישים מתרומת המעשר נותן לכהן ומותר השליש של מעשר ראשון הוא שלו ותרומת המעשר מאותו השליש מוכר לכהן וכתבתי הטעם בסעיף הקודם:"]
**** ENGLISH ****
[The first rich third. And in the third of the enriched donation gives the servant and the third of the first ten is his and the rich donation from the same third is known to serve and write the taste in the previous section:
**** END BLOCK ****
```

### 41. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 54 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=54#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 54
marker: _
**** HEBREW ****
<b>אין תורמין כו' ולא מדבר שלא נגמרה מלאכתו על דבר שנגמרה מלאכתו. </b>שנאמר כדגן מן הגורן וכמלאה מן היקב מן הגמור על הגמור מיהו היינו מדרבנן וקרא אסמכתא בעלמא הוא ועיקרו למין על שאינו מינו הוא דאתא הלכך בדיעבד תרומתו תרומה:
**** ENGLISH ****
There is no right-wing genitalism, nor is it that does not end its work on what it has done. It is said to be a shield from the pupil and filled with the polarization of what we were from a dormant and called as an embodied aspiration to the kind that is not of who is not who is not of us is to do so in retrospect:
**** END BLOCK ****
```

### 42. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 55 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=55#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 55
marker: א
**** HEBREW ****
["<b>אין תרומתו כו'. </b>דק\"ו הוא ממין על שאינו מינו שזה וזה חייב בתרומה לא ק\"ו לזה שאינו חייב בתרומה עדיין:"]
**** ENGLISH ****
[There is no such contribution. He is a sex man who does not believe that it is and it owes an incalculable contribution to the one who does not yet have to contribute:
**** END BLOCK ****
```

### 43. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 55 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=55#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 55
marker: ב
**** HEBREW ****
["<b>ונתלשו דבריו קיימין. </b>דהואיל ובידו לתלוש אינו מחוסר מעשה:"]
**** ENGLISH ****
[And he said, Kaimin. He is not an act of sin
**** END BLOCK ****
```

### 44. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 56 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=56#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 56
marker: _
**** HEBREW ****
<b>אין תורמין כו'. </b>משום דדומה לב' מינים מש"ה גזרו ביה הלכך בדיעבד הוי תרומה:
**** ENGLISH ****
There is no right-handed. For Hashem’s Word, Hashem’s promise is that He is in His Word
**** END BLOCK ****
```

### 45. `siman_331/siftei-kohen/part-001.txt` — siftei-kohen — seif 59 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=59#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 59
marker: א
**** HEBREW ****
["<b>תרם כו'. </b>דוקא תרם אבל לכתחלה לא יתרום מן הדמאי על הדמאי דשניהם ספק ושמא א' תרם והב' אינו תרם וה\"ל מן הפטור על החיוב או מן החיוב על הפטור וכל שכן שאין תורמין מן הדמאי על הודאי:"]
**** ENGLISH ****
[They were called. It has contributed, but it will not be spared from the shampoo on the Dasman both of them a doubt and that M. A. has not contributed and the U.S. from the exemption on the bill or from the charge of the exemption, and all that there is no ceremonial from the suspect:
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_331
npm run pipeline:editorial:advance -- --siman 331
```

## Checkpoint ids

siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%90
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%91
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%92
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=26#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=27#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=28#marker=%D7%90
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=28#marker=%D7%91
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=28#marker=%D7%92
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=29#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%90
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%91
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=31#marker=%D7%90
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=31#marker=%D7%91
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=31#marker=%D7%92
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=32#marker=%D7%90
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=32#marker=%D7%91
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=33#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=34#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=35#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=36#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=37#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=38#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=39#marker=%D7%90
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=39#marker=%D7%91
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%90
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%91
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%92
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=%D7%93
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=40#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=43#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=44#marker=%D7%90
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=44#marker=%D7%91
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=45#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=46#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=47#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=48#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=49#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%90
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%91
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%92
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=54#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=55#marker=%D7%90
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=55#marker=%D7%91
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=56#marker=_
siman_331/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=59#marker=%D7%90