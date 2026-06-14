# Editorial retranslation — Siman 331 (part 1/5)

Generated: 2026-06-12T13:50:20.456Z

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

### 1. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 101 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=101#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 101
marker: _
**** HEBREW ****
<b>מזונות. </b> כגון שאינו שוכרן ללקט תאנים אלא לחרישה וכה"ג:
**** ENGLISH ****
Foods. For example, he does not hire a carpenter, but rather a snoring and acquitted:
**** END BLOCK ****
```

### 2. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 102 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=102#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 102
marker: _
**** HEBREW ****
<b>ספק. </b> דמספקינן בש"ס אי הוי בכלל מבשל שאמרו חכמים שקובע למעשר:
**** ENGLISH ****
Doubt. This is because of the words of the Lord’s Prayer, which is the blessing of Hashem
**** END BLOCK ****
```

### 3. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 114 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=114#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 114
marker: _
**** HEBREW ****
<b>גומרו. </b> באכילת עראי ואינו מעשר דכיון שהניחו מידו ופסק מן האכילה כדי שלא לאכלו בשבת היאך יקבענו שבת שהרי גילה דעתו שלא לאכול ממנו בשבת ש"ך:
**** ENGLISH ****
Finished. "In the eating of the sages, and not from the ten minutes of eating from the hands of the food, so that it is not eaten on the Shabbat," he said, "that it is not possible to eat from it on the Shabbat."
**** END BLOCK ****
```

### 4. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 116 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=116#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 116
marker: א
**** HEBREW ****
<b>מדליקין. </b> בחול ואצ"ל בשבת:
**** ENGLISH ****
Lighting. In the sand and the IDF on Saturday:
**** END BLOCK ****
```

### 5. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 116 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=116#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 116
marker: ב
**** HEBREW ****
<b>מותר. </b> שהרי יעשר מהם לכשיגדלו:
**** ENGLISH ****
allowed. They will be rich in their growth:
**** END BLOCK ****
```

### 6. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 116 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=116#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 116
marker: ג
**** HEBREW ****
<b>כזורע. </b> שהרי מפקיעין מידי מעשר מכל וכל:
**** ENGLISH ****
as bad. It is from ten of all:
**** END BLOCK ****
```

### 7. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 117 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=117#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 117
marker: _
**** HEBREW ****
<b>ולחבר. </b> שמא יבא הלוקחו לידי מכשול שלא ידע שטבל הוא:
**** ENGLISH ****
Company. If they were brought to an obstacle that he did not know that the baptism was:
**** END BLOCK ****
```

### 8. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 118 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=118#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 118
marker: _
**** HEBREW ****
<b>המוכר. </b> וישלם ללוקח החולין:
**** ENGLISH ****
The seller. And pay for the oxid:
**** END BLOCK ****
```

### 9. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 12 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=12#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 12
marker: _
**** HEBREW ****
<b>נקבעו. </b> וכתב הכ"מ דפירות ח"ל כשנכנסו לארץ קודם שנקבעו למעשר חייבים בתרומות ומעשרות מן התורה ואם בשעת קביעותם למעשרות היו בח"ל פרח מהן חיוב תרומות ומעשרות ואין חייבים אלא מדבריהם וכ"כ הלבוש:
**** ENGLISH ****
Determined. The Bible wrote that when you entered the land before the Ten mitzvot must be given donations and tens of people from the Torah, and if they were told of the Ten mitzvot, they would have a flower of donations and tens of them, and they do not need only their words and clothing:
**** END BLOCK ****
```

### 10. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 122 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=122#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 122
marker: _
**** HEBREW ****
<b>מוציאין. </b> אבל אם קנו אותם קודם שתגמר מלאכתן אין מוציאין מידם:
**** ENGLISH ****
Exciting. But if you bought them before you finish their work, you don’t get away from them:
**** END BLOCK ****
```

### 11. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 123 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=123#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 123
marker: _
**** HEBREW ****
<b>שלהם. </b> אבל אם מכרוהו אחר גמר מלאכתן הרשות ביד הישראל ליתנם לכל כהן שירצה:
**** ENGLISH ****
theirs. But if they were sold after the end of their work, the Israeli Authority was given to each of them:
**** END BLOCK ****
```

### 12. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 124 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=124#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 124
marker: א
**** HEBREW ****
<b>בקבלה. </b> שקבל עליו העובדי כוכבי' לעבדה וליתן לישראל ממה שתעשה תבואה חצי או שליש או מה שיתנו ביניהם:
**** ENGLISH ****
In receipt. He was given by the Starworkers to slavery and to give Israel what they would do half or a third, or what they would do:
**** END BLOCK ****
```

### 13. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 124 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=124#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 124
marker: ב
**** HEBREW ****
<b>לעשר. </b> דהא הם ודאי לא עשרו:
**** ENGLISH ****
10. They are certainly not ten:
**** END BLOCK ****
```

### 14. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 126 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=126#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 126
marker: א
**** HEBREW ****
<b>לקיטתו. </b> שהוא גדל על כל מים ויונק לחות בכל עת עד שלוקטין אותו:
**** ENGLISH ****
his quiet. It grows on every water and drains moisture at any time until it is reduced:
**** END BLOCK ****
```

### 15. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 126 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=126#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 126
marker: ב
**** HEBREW ****
<b>האתרוג. </b> שהרי הוא דר באילן משנה לשנה ויונק בכל עת:
**** ENGLISH ****
The site. For he is Dr. Barlan from year to year and will be cleaned at any time:
**** END BLOCK ****
```

### 16. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 127 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=127#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 127
marker: א
**** HEBREW ****
<b>האביונות. </b> הם דומין קצת לאילן וקצת לירק:
**** ENGLISH ****
Fathers. They do a little bit to Ilan and a little torch:
**** END BLOCK ****
```

### 17. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 127 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=127#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 127
marker: ב
**** HEBREW ****
<b>ופודהו. </b> ואוכל פדיונו בתורת מעשר שני ונמצא כמי שהפריש מעשר שני ומעשר עני:
**** ENGLISH ****
and Paedo. The food of pedagono in the turn of twenty-seconds and is found to be one of the ten poor
**** END BLOCK ****
```

### 18. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 13 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=13#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 13
marker: _
**** HEBREW ****
<b>חייב. </b> ומשמע מדברי הרמב"ם שמן התורה חייב אבל רש"י פי' בפ"ק דקידושין דמעשר אילן הוא מדרבנן <small>(דדוקא דגן תירוש ויצהר חייבין מדאורייתא)</small> והכי אמרינן להדיא בפ' כיצד מברכין דמעשר אילן בארץ גופיה הוא מדרבנן וכ"כ הראב"ד עכ"ל הט"ז:
**** ENGLISH ****
must. And the words of the Ramban of the Torah must be heard, but it is written in the Quran, and it is said to him that he is blessed with the Lord, and that he is cursed in the land of his body, and that it is the case of the Lord’s Prayer
**** END BLOCK ****
```

### 19. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 131 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=131#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 131
marker: _
**** HEBREW ****
<b>בסוריא. </b> לפי שמעשר שני טעון הבאת מקום ואין מביאין אותו מח"ל שאינו נוהג שם ואינו קדוש אם הפריש הלכך לא חייבו להפרישו בסוריא:
**** ENGLISH ****
in Soro. It is said that the Ten mitzvot bring a place and do not bring it from a prison that does not practice there and is not sacred if the rash does not have to be interpreted in Soria:
**** END BLOCK ****
```

### 20. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 134 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=134#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 134
marker: _
**** HEBREW ****
<b>רצ"ד. </b> שם נתבאר כמה היא הפרוטה:
**** ENGLISH ****
Churchill. There we will tell how much she is:
**** END BLOCK ****
```

### 21. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 136 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=136#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 136
marker: _
**** HEBREW ****
<b>לפרש. </b> דהא אנו רואין שעוסק בפדיון:
**** ENGLISH ****
to interpret. Dea Weroin, which deals with the discussion:
**** END BLOCK ****
```

### 22. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 14 — marker `_`

- Quality: **info** — divine_name_style
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=14#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 14
marker: _
**** HEBREW ****
<b>מהירק. </b> לפי שגם בא"י אינו אלא מדבריהם שנאמר תבואת זרעך וירק לאו תבואה היא וה"ה שאין חייבין בתרומה שהרי נאמר בה דגנך וגו' והתבואה והקטנית שזרעם לירק בטלה דעתו אצל כל אדם והירק שלהם פטור והזרע חייב בתרומה ומעשרות:
**** ENGLISH ****
from the Mac. For the Lord is not only the words spoken by the coming of your seed, and it is not the same as it is written in it that it is written in it that the grain and the grain that they are seeded in will be voided in every human being and their insect is exempt and the seed must be donated and enriched:
**** END BLOCK ****
```

### 23. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 144 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=144#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 144
marker: _
**** HEBREW ****
<b>לבערן. </b> כיון שלא הגיע זמנם:
**** ENGLISH ****
to the forest. Because they did not come from their time:
**** END BLOCK ****
```

### 24. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 146 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=146#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 146
marker: _
**** HEBREW ****
<b>צדקה. </b> וכתב הט"ז נראה דיש לדמות מעשר שמפרישין מן הריוח ממון לדין מעשר עני של תבואה ופירות והב"ח כתב שהמעשר של ממון שלנו אין בו חיוב לא מן התורה ולא מדרבנן ותמהתי שהרי ר"ס רמ"ט מבואר שחיוב גמור הוא כמ"ש כל הפוסקים. ונעתיק דברי הטור בקיצור לענין מעשר עני וז"ל באו איש ואשה לשאול כו' <small>(כמ"ש בסי' רנ"א ס"ט)</small> וכשהוא מחלקו בשדה אין בו טובת הנאה לבעלים אבל המתחלק בבית יש לו טובת הנאה לבעלים ונותנו לכל עני שירצה. ומזה נ"ל סמך למה שנוהגין לכוף החתן בשעת קבלת הנדוניא שלו ליתן מעשר כדאשכחן כן גבי מעשר עני שמוציאין מידו בע"כ אלא שמחלקין את המעשר לקרובי החתן והכלה דהם קודמין לשאר עניים בזה. וראיתי קצת אומרים דדוקא מהנדן שהכלה נותנת להחתן מפריש מעשר אבל לא ממה שאבי החתן נותן לבנו ותמהתי מהיכא תיתי לחלק דאטו יש חיוב על הממון והלא חובת גברא הוא ומה לי שנותן לו אביו או חותנו ודאי דעת משובש הוא מי שאומר כן. ואם אב ובנו או שני אחים ושותפים שא' מהן עני נותן לו השני מעשר עני שלו ושני עניים שקבלו שדה באריסות זה מפריש מעשר עני על חלקו ונותן לחבירו וכן להיפך. ואין פורעין בו המלוה ולא משלמין בו את תגמולין כגון שחבירו עשה לו טובה של דבר הרשות אסור לשלם גמולו במעשר עני אבל משלמין ממנו דבר של גמילות חסדים כגון סעודת הבראה של אבל וצריך להודיעו שהוא מעשר עני ואין פודין בו את השבויים והיינו שיש בלא"ה חיוב עליו כגון שפסקו עליו לפדותו אבל אם אינו חייב לפדותו בלא"ה ודאי יכול לתת מעשר עני שלו לזה דאין לך צדקה גדולה מזו דשבי כולהו איתנהו ביה ואין נותנין ממנו צדקה שפסקו עליו בני העיר שכבר נתחייב בה דה"ל פורע חובו ונותנין אותו לחבר עיר המתעסק בצרכי הצבור ומפרנסין אותו ושולחים לו המעשר עני דרך כבוד ודורון אע"ג דאין שולחין לו צדקה מן הכיס של צדקה היינו משום דגנאי הוא לבני העיר לפרנס חכם שלהם מן הצדקה אבל מעשר עני ששולחין לו מהגורן לא מינכר דמ"ע הוא אלא מיחזי כמנחה ודורון דרך כבוד. וכל זה נראה ששייך ג"כ במעשר שמפרישין מן הריוח שנתן הש"י לבני האדם: ולעיל סי' רנ"א כתב הב"י בשם המרדכי דמ"ע דומה למפריש צדקה עכ"ל הט"ז והש"ך:
**** ENGLISH ****
Charity. And the book of the Bible appears to be a sign of the Ten mitzvot from the Lord’s Prayer and the Ten mitzvot, and that the Ten mitzvot of our people have no obligation from the Torah, and not from the rabbi, and I am afraid that the Almighty is complete as “all the verses.” In short, the words of the column came to the point of ten poor men and a woman asked him to ask him, but the house has a good pleasure for the owners, and we will give him to all who want. And this is what is used for the blessing of the bride when he is given ten times as he is forgotten
There is no immediate effect, but rather, that the rich are made for the poor, and the bride de Kodamine for the rest of the poor. And I saw a little saying, Doc from the Dand that the bride gives to the wedding of the Ten mitzvot, but not from what my father gives his son, and I am afraid of the oppressor I will be given to the part of Dao, there is a charge for the money, and the duty of the man is and what to me who gives him his father or his brother is certainly a corrupt mind. And if a father and son or two brothers and accomplices whose poor Hashem gives him the other ten of his poor and two poor people who took a field in the Pariss, it makes ten poor for his part and gives him the opposite. There is no fruit in which the word is filled and does not impose a reward in it such as the savior
Roe made him a favor of what the authority should not pay his reward for a poor rich man, but from him a word of mercy such as the feast of the bride, but he should not be told that he is ten poor and that he does not make any of his sons, and that he has no obligation to do so, but if he does not owe him to his fatherlessness, he may give his richness to him
He was given charity from the pocket of charity because he was a dean of the city for their smart living from charity, but from ten poor people who sent him out of the garden, he was not estranged as a guide and doron through honor. All this seems to belong to the Ten mitzvot of the Lord’s Prayer to the people: and to Hashem’s mercy, Hashem’s Word says, “The Lord is the same as the Lord’s Prayer and the Lord.”
**** END BLOCK ****
```

### 25. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 15 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=15#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 15
marker: _
**** HEBREW ****
<b>שליש. </b> שעדיין אינו נקרא תבואה:
**** ENGLISH ****
A third. It is not yet called grain:
**** END BLOCK ****
```

### 26. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 16 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 16
marker: _
**** HEBREW ****
<b>ההפקר פטור. </b> כיון דאין לו בעלים אבל שדה הפקר מ"מ הדגן אינו הפקר דהא יש לו בעלים לכך חייב:
**** ENGLISH ****
The license is exempt. Because he has no husbands, but the field that is expropriated from the Magnificant does not have the expropriation of Dea, he must:
**** END BLOCK ****
```

### 27. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 18 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=18#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 18
marker: א
**** HEBREW ****
<b>מהם. </b> ולא יפריש מיניה וביה מן העירוב שמא יפריש מן הפטור על החיוב:
**** ENGLISH ****
from them. There will not be any exaggeration of her and her daughter from the town that will not be excavated from the exemption on the bill:
**** END BLOCK ****
```

### 28. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 18 — marker `ב`

- Quality: **warn** — chunk_seam_duplicate, marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=18#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 18
marker: ב
**** HEBREW ****
<b>חשבון. </b> פי' שבתחלה מפריש כל המעשרות על הכל כאלו כולן חייבים אבל א"צ ליתן ללוי ולעני אלא לפי חשבון והשאר חוזר ומערב עם פירותיו אבל תרומה ותרומת מעשר דאסור לזרים נותן הכל לכהן או מוכר לו המותר לפי חשבון. ש"ך:
**** ENGLISH ****
Account. P. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . “Third:
**** END BLOCK ****
```

### 29. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 19 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 19
marker: א
**** HEBREW ****
<b>שהוא. </b> לפי שגם מן התורה אין לה שיעור ואפי' חטה א' פוטרת כל הכרי וחכמים נתנו שיעור עין יפה א' ממ' ועין רעה א' מס' ובינונית א' מנ' ודוקא בתרומה הנאכלת לכהנים אבל לא בתרומה טמאה העומדת לשריפה דאוקמוה אדאורייתא ושיעורה בכל שהוא:
**** ENGLISH ****
He is. According to the Torah, it does not have a lesson, and A. A. is exempted from all the volumes and wise men gave a beautiful eye rate A. M. M.M. and a poor eye to the fire of Daokha and Dik in all that it is:
**** END BLOCK ****
```

### 30. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 19 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 19
marker: ב
**** HEBREW ****
<b>להניחה. </b> ואפי' הניחה בכלי שאינו מאוס דאין חשש תקלה עכשיו כיון שאין שום תרומה נאכלת לא חיישינן שמא יסבור שהיא טהורה. ט"ז:
**** ENGLISH ****
assumed. And Affith put in a tool that is not of chaos, there is no concern now that there is no donation to eat, and that it will not be broken. TJ:
**** END BLOCK ****
```

### 31. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 19 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 19
marker: ג
**** HEBREW ****
<b>בנר. </b> שנהנה הוא עם הכהן:
**** ENGLISH ****
Benner. He is with the priest:
**** END BLOCK ****
```

### 32. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 19 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 19
marker: ד
**** HEBREW ****
<b>שהוכשרה. </b> לקבל טומאה שבאו עליה מים שעכשיו ודאי טמאה היא ומותר לשרפה:
**** ENGLISH ****
Talented. To receive unclean water, which is now visible, is and is permitted to burn:
**** END BLOCK ****
```

### 33. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 19 — marker `ה`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 19
marker: ה
**** HEBREW ****
<b>קודם. </b> אבל אחר מירוח שכבר נתחייב בתרומה אסור לגרום טומאה לתרומה טהורה:
**** ENGLISH ****
First. But after a spirit that has already been committed in the donation, it is forbidden to make a unclean contribution:
**** END BLOCK ****
```

### 34. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 19 — marker `ו`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 19
marker: ו
**** HEBREW ****
<b>לכהן. </b> שקנסו הלוים בימי עזרא על שלא עלו:
**** ENGLISH ****
to serve. And they did not come up with them:
**** END BLOCK ****
```

### 35. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 19 — marker `ז`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 19
marker: ז
**** HEBREW ****
<b>וגו'. </b> והגר והיתום והאלמנה דסתמן עניים הם:
**** ENGLISH ****
and body.” And the reward and the widow is poor:
**** END BLOCK ****
```

### 36. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 19 — marker `ח`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%97`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 19
marker: ח
**** HEBREW ****
<b>ומואב. </b> לפי שהם סמוכים לא"י תקנו במקום מע"ש מעשר עני כדי שיבואו עניי א"י ויתפרנסו ממנו <small>(ובארץ שנער שהיא רחוקה מא"י ואין עניי א"י יכולין לבא לשם מפרישין מע"ש כמו ברוב שנים)</small>:
**** ENGLISH ****
and Father. As they are nearing the Lord, they will be fined instead of the Ten mitzvot, so that they may come from Hashem’s people, and they will live from him (and in the land that is far from the land which is far away from the Lord, and there is no Hashem’s poor man who can bring him to the land of Israel as in most years):
**** END BLOCK ****
```

### 37. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 19 — marker `ט`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%98`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 19
marker: ט
**** HEBREW ****
<b>השי"ג. </b> וכן ימנה לעולם ז' שנים אחר ז' דקי"ל שנת חמשים עולה לכאן ולכאן. ש"ך:
**** ENGLISH ****
The DJ. And yes, he will be appointed to the world after the five-year-olds, coming here and here. “Third:
**** END BLOCK ****
```

### 38. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 21 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 21
marker: _
**** HEBREW ****
<b>כלום. </b> דכתיב ראשית דגנך בעינן ראשית ששיריה ניכרים:
**** ENGLISH ****
Nothing. First of all, your fish are marked:
**** END BLOCK ****
```

### 39. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 22 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=22#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 22
marker: _
**** HEBREW ****
<b>ציין. </b> שלא פירש הראשית:
**** ENGLISH ****
noted. Not the main shaft:
**** END BLOCK ****
```

### 40. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 25 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=25#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 25
marker: א
**** HEBREW ****
<b>המוקף. </b> דכיון שמפרישין אותה לא יוכל לכוין השיעור ולמוד אלא במוקף יחד. ש"ך:
**** ENGLISH ****
surrounded. A demon who attacks her will not be able to educate the class and measure, but in the mirror together. “Third:
**** END BLOCK ****
```

### 41. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 25 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=25#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 25
marker: ב
**** HEBREW ****
<b>שמשתברין. </b> שהרי אינו יכול לקיים מתנות כהונה:
**** ENGLISH ****
She sat down. It is not possible to have such gifts:
**** END BLOCK ****
```

### 42. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 26 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=26#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 26
marker: _
**** HEBREW ****
<b>הכל. </b> חשוב כמוקף וכן חביות שלא סתם פיהם חשיבי כמוקפים אבל משסתמן אינן כמוקפין ואפי' הן בבית א' תורם מכל א' וא'. ש"ך:
**** ENGLISH ****
Everything. It’s important as a mirror and barrels that aren’t just passive mouths as attackers, but they’re not like a penis and they’re at home A. contributes from each A and A. “Third:
**** END BLOCK ****
```

### 43. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 28 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=28#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 28
marker: א
**** HEBREW ****
<b>חולין. </b> כלומר עכשיו עד שיפריש התרומה:
**** ENGLISH ****
A patient. This is until the donation is improved:
**** END BLOCK ****
```

### 44. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 28 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=28#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 28
marker: ב
**** HEBREW ****
<b>בצד. </b> פי' בכרי הגדול שהנחתי:
**** ENGLISH ****
On the side. The Big Bang:
**** END BLOCK ****
```

### 45. `siman_331/baer-heitev/part-001.txt` — baer-heitev — seif 29 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=29#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 29
marker: _
**** HEBREW ****
<b>שליח. </b> שנאמר כן תרימו גם אתם לרבות שלוחכם:
**** ENGLISH ****
A messenger. It is also said that you will also be saved from your conscience:
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

siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=101#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=102#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=114#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=116#marker=%D7%90
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=116#marker=%D7%91
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=116#marker=%D7%92
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=117#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=118#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=12#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=122#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=123#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=124#marker=%D7%90
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=124#marker=%D7%91
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=126#marker=%D7%90
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=126#marker=%D7%91
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=127#marker=%D7%90
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=127#marker=%D7%91
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=13#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=131#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=134#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=136#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=14#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=144#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=146#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=15#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=18#marker=%D7%90
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=18#marker=%D7%91
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%90
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%91
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%92
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%93
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%94
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%95
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%96
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%97
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=%D7%98
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=22#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=25#marker=%D7%90
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=25#marker=%D7%91
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=26#marker=_
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=28#marker=%D7%90
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=28#marker=%D7%91
siman_331/baer-heitev/part-001.txt#slug=baer-heitev#seif=29#marker=_