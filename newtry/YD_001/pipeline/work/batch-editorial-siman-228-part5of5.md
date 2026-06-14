# Editorial retranslation — Siman 228 (part 5/5)

Generated: 2026-06-12T13:16:52.780Z

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

### 1. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 20 — marker `ק`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=20#marker=%D7%A7`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 20
marker: ק
**** HEBREW ****
["<b>איש ואשה שקבלו חרם כו'. </b>כתב מהר\"מ פדוא\"ה בתשובה סימן ע' דוקא נשבעו שניהם אבל אם הא' לא נשבע לא מיקרי טובה בריצוי לבד וכתב שכן משמע בתשובת הרשב\"א גבי ראובן ששדך בנו חנוך עם בת שמעון וחנוך בנו נשבע כו' ומביאה מהרי\"ק בשורש נ\"ב ואף על גב שכתב מהר\"מ פדוא\"ה עוד שם ועוד נראה לחלק ולומר שדוקא במה שמתרצה האיש לקחת אשה מקרי טובה לאשה כנדון של מהר\"מ אבל במה שנתרצית האשה כנדון של רשב\"א לא מיקרי טובה כי אשה בכל דהו ניחא לה דטב למיתב טן דו כו' דעת מהרי\"ק שם אינו נראה כן וכן עיקר שאין לחלק בזה וכן דעת הרב:"]
**** ENGLISH ****
"A man and a woman who had a boycott." He said, “I will not swear to Hashem’s people, but if the Lord does not swear to him, and he will not swear to him, and he will give him a blessing to him, and he will give him a blessing to him, and he will not be able to do so.”
For a woman in every deo has a good idea for the devil's sake, and she is not seen as well as the main thing that is not part of it and the great opinion."
**** END BLOCK ****
```

### 2. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 20 — marker `ר`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=20#marker=%D7%A8`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 20
marker: ר
**** HEBREW ****
["<b>דאפילו אם כבר נשאה כו' חייב להוציא. </b>וכמו שנתבאר בא\"ע סימן ע\"ז ואפי' למאן דפליג התם היינו באשה הנשואה מה שאין כן הכא. מהרי\"ו סי' קל\"ז:"]
**** ENGLISH ****
[Even if she has already been married, he must divorce her. And as explained in Even HaEzer siman 77; and even according to those who disagree there, that is regarding a married woman, which is not the case here. Mahariu siman 337:]
**** END BLOCK ****
```

### 3. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 20 — marker `ש`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=20#marker=%D7%A9`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 20
marker: ש
**** HEBREW ****
["<b>וע\"ל סי' רל\"ט מי שנשבע כו'. </b>כצ\"ל כי כן הוא שם בסעיף ח' גם בעט\"ז כתוב בטעות:"]
**** ENGLISH ****
"He who swore to him." It is also written in the Quran, and it is written in Hashem’s Word
**** END BLOCK ****
```

### 4. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `א`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: א
**** HEBREW ****
["<b>בלא דעתם והסכמתם. </b>וכתב הריב\"ש אם נדר ע\"ד הקהל אף אם יסכימו הרוב לבעל נדרו אין משגיחין בהן עד שיסכימו כולם שהרי פירש על דעת הקהל גדולים וקטנים שנראה שלא ע\"ד רוב הקהל הוא סומך ואם הנודר אומר עתה שכוונתו היה על הרוב נאמן בת\"ח כדאמרינן גבי נדר בחרם ואמר בחרמו של ים ע\"כ ומביאו בית יוסף וד\"מ ונראה אף למש\"ל סי' ר\"ח דהאידנא כ\"ע כע\"ה דמיא היינו לענין שצריך התרה אבל הכא דנימא דלא סגי בהתרה לא מחמרינן כולי האי מיהו נראה דאם פרט ונדר ע\"ד פלוני ופלוני ופלוני ודאי ע\"ד שיסכימו כולם קאמר ואף שאומר שכוונתו היה על הרוב לא משגחינן ביה:"]
**** ENGLISH ****
(Not their opinions and consent. And he wrote, “If the majority of the people agree with them, they do not believe in them until all of them are expected to be accepted by the opinion of great and small public opinion that it seems that not by the majority of the public, it is trusted and if the order is said, it is not true that the majority of them are loyal to the Lord, and it is said to them that they will be the choice of the Lord.”
The whole of the island, which is to be seen by Damon detail and vowed by Dr. Flemney and Flanni, and certainly, by agreeing that everyone will agree with him, saying that his intention was on the majority of them not at her:
**** END BLOCK ****
```

### 5. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `ב`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: ב
**** HEBREW ****
["<b>ויש מחמירין כו'. </b>לפי שאין חרטתם שוה דזה מתחרט מטעם זה וזה מתחרט מטעם זה אבל לדבר מצוה כולם מסכימים ומתחרטין בחרטה א' כ\"כ המחמירין ולפי זה אם מתחרטין בחרטה א' יש להתיר (ומי שקיבל עליו בחרם או בנידוי על דעת רבים נמי יכול להתיר עם דעתם לכ\"ע דהא חרם אין צריך פתח וחרטה כדלעיל סעיף ח' וע\"ל סכ\"ה) וכ\"כ הרמב\"ן והמחבר סעיף ל' ועוד נ\"ל דלכ\"ע כל שהרבים באים ומתחרטין אע\"פ שאין חרטתן שוה יכול להתיר לכל א' וא' כפי חרטתו ולא קאמרי המחמירין אלא שאין להתיר מן הסתם בחרטה אחת כן נ\"ל ודוק וזהו דלא כמשמעות בית יוסף עיין שם מיהו בתשובת מיי' שבסוף ס' הפלאה משמע כהב\"י דמסתפק דבכל ענין אין להתיר על דעת רבים אם לא לדבר מצוה ע\"ש ועיין בתשובת ר\"א מזרחי סימן נ' שמחמיר ג\"כ שלא להתיר לדבר הרשות אפי' דעת הרבים מסכמת:"]
**** ENGLISH ****
"And there's a lot of fun." For there is no regret for this reason, and it regrets it, but everyone agrees, and the petitioner of Hashem’s judgment, and that if he repents against Hashem, he must be permitted (whoever he has received by his or her or her will not be given to him)
A. A. and all of Hashem’s judgments, and not in the words of Joseph’s house, but that it is not possible that there is no doubt that at the end of Hashem’s word, it is not possible for many people to speak of them if they do not speak to Him
**** END BLOCK ****
```

### 6. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: ג
**** HEBREW ****
["<b>וכן נכון להחמיר כו'. </b>מיהו הב\"ד שהתירו אין לייסרם על ככה כיון דרוב הגדולין מתירין ודבריהם נראין עיקר. ב\"ח:"]
**** ENGLISH ****
(Yes, it's right to get worse. Who is the B-D who has been shot should not be chastised for this reason, because the Great Dr. Matthewin and their words are negligent. (b)
**** END BLOCK ****
```

### 7. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: ד
**** HEBREW ****
["<b>אא\"כ יש מצוה כו'. </b>שאז מתירין אפילו בלא דעתם דמסתמא ניחא להו בהתרה:"]
**** ENGLISH ****
[There's a quaint. And then, when he comes to his mind, he’s not a fool
**** END BLOCK ****
```

### 8. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `ה`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: ה
**** HEBREW ****
["<b>שיבא חבירו להתפלל. </b>ואפילו אין שם מנין. שם:"]
**** ENGLISH ****
He was praying. And even there is no name. Name:"
**** END BLOCK ****
```

### 9. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `ו`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: ו
**** HEBREW ****
["<b>וכן לעשות שלום כו'. </b>וה\"ה לבטל שאר המחלוקת דגדול השלום ואין ללמוד מזה למקום אחר שאין מצוה כ\"כ ב\"י בשם תשובת רשב\"א:"]
**** ENGLISH ****
(And yes, make peace.) "And the rest of the dispute is to be abolished, and we must not learn from it to another place that is not so limited in the name of the Rashi answer."
**** END BLOCK ****
```

### 10. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `ז`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: ז
**** HEBREW ****
["<b>מיקרי דבר מצוה. </b>וכתב ב\"י בשם הריב\"ש דלהסיר מכשול שבועות ונזקין מדרך הרבים אין לך דבר מצוה גדול מזה וכתוב בתשובת מנחם עזריה סי' מ\"ח במי שנשבע שלא להיות ממונה אם אין במדינה ראוי להיות ממונה יותר ממנו הוי דבר מצוה וכב\"י דשלא ליפרד מאשתו אלא יהיה באותו עיר שאשתו שם מיקרי נמי דבר מצוה ופשוט הוא וע\"ל ס\"ק צ\"ה וס\"ק ק\"ד:"]
**** ENGLISH ****
[Reading something. And he wrote in the name of the Lord, “You have nothing greater than that, and you will not be appointed by the many, if there is nothing in the country that is greater than it, and that it is written, ‘I will not be separated from it unless it is in the same city of his wife and his wife,’ he said
**** END BLOCK ****
```

### 11. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `ח`

- Quality: **error** — chunk_seam_duplicate, divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%97`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: ח
**** HEBREW ****
["<b>מי שנשבע שלא ליהנות מאביו כו'. </b>כתב בד\"מ דמכאן משמע דאפילו נשבע על המצוה עצמו מתירין לו דלא כתשו' רמב\"ן סי' אלף ר\"ן עכ\"ל וכן משמעות הפוסקים וכ\"מ בש\"ס פ' השולח ריש (גיטין דף ל\"ו) גבי ההוא מקרי דרדקי דאדרי' רב אחא ע\"ש ול\"ד לנשבע ע\"ד חבירו די\"א דאין מתירין לו לדבר מצוה שנשבע עליה בלא דעתו וכמ\"ש לעיל ס\"ק נ\"ב דמסתמא דעת רבים ניחא להתיר בכל דבר מצוה:"]
**** ENGLISH ****
He swore not to enjoy his father. It is written by Hashem’s Word, “He who is in heaven, who is in the Lord’s name, and who is the same as Hashem’s Word, and who is the same as Hashem’s Word, and who is the Lord’s Word, and who is the same as Hashem’s Word, and who is the same
**** END BLOCK ****
```

### 12. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `ט`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%98`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: ט
**** HEBREW ****
["<b>אבל אם אמר סתם כו'. </b>ודעת הר\"ן והרשב\"א וריב\"ש שאפילו אמר סתם על דעת רבים אין לו התרה ונראה להחמיר לכתחלה:"]
**** ENGLISH ****
[But if he said unspecifiedly. The view of Ran and Rashba and Rivash is that even if he said unspecifiedly "in the opinion of the public" he has no release, and it appears one should be stringent l'chatchila:]
**** END BLOCK ****
```

### 13. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `י`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%99`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: י
**** HEBREW ****
["<b>וי\"א שאם נדר כו'. </b>וכתב מהרי\"ק בשורש נ\"ב אם אותן הג' שייכי באותו הנדר לכ\"ע הוי על דעת רבים דמסתמא הנך דשייכי בגוי' שעומדים לפניו קאמר ומביאו ב\"י וד\"מ ואם אמר להם על דעתכם אני נודר פשיטא דלכ\"ע הוי על דעת רבי' ועדיף מאומר ע\"ד פלוני ופלוני ופלוני:"]
**** ENGLISH ****
(And if he has been called. And he said to him, “If you do this, you will be blessed with Hashem’s Word, and you will be blessed with Hashem’s Word, and if you say to them, I will be blessed with you.”
**** END BLOCK ****
```

### 14. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `כ`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%9B`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: כ
**** HEBREW ****
["<b>ארבעה שנשבעו יחד כו'. </b>כ' בתשובת מבי\"ט ח\"א סימן ס\"ט דף ל\"ה ע\"א שאם נשבעו ע\"ד כ\"א מהם לא מיקרי ע\"ד רבים שאם היו נשבעים כ\"א ע\"ד כולם היה נראה ע\"ד רבים אבל לא אמרו שלא נשבעו כולם אלא ע\"ד כל אחד כו' ואין זה מוכרח:"]
**** ENGLISH ****
[The four who were sworn together. “If you swear to me, you will not read many of them if you swear by them, but they will not be sworn by them, but they will not be sworn by them, but they do not swear by everyone, but they do not swear by anyone, but they do not want to swear by it.”
**** END BLOCK ****
```

### 15. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `ל`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%9C`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: ל
**** HEBREW ****
["<b>כ\"א בשעת הדחק כו'. </b>זה כתב הרב ע\"פ מ\"ש בבית יוסף וז\"ל כתב מהרי\"ק שורש נ\"ב מ\"כ בשם הר\"ר אביגדור דהא דעל דעת רבים אין לו הפרה היינו לכתחלה אבל בדיעבד שבאו ג' בני אדם והתירוהו לו ה\"ז מותר ע\"כ ואף שזה שלא כשטת רוב הפוסקים מ\"מ ראוי לעשות סניף לדעות הנזכרות כו' עכ\"ל וכ\"כ הרשב\"א בתשובה דנדר שהודר ע\"ד רבים אם התירוהו מותר בדיעבד ואף שיש מגדולי המורים חולקים כדאי ר\"ת לסמוך עליו בשעת הדחק ע\"כ עכ\"ל ב\"י ומביאו ד\"מ ולפעד\"נ דא\"א לומר דתשובת רשב\"א מיירי בכה\"ג דהא לא מצינו לר\"ת בשום מקום שבדיעבד מותר ואדרבה ממ\"ש כל הפוסקים וכן הרשב\"א גופיה בפ' השולח בשמו דמתרץ הא דפריך ש\"ס סתם דלמא אזיל לגבי חכם ושרי ליה דהיינו לענין דיעבד אבל לכתחלה אין מתירין לו אלא מדעתו א\"כ מוכח דעל דעת רבים אפילו בדיעבד לא מהני התרה לר\"ת דהא משני התם דמדרינן ליה על דעת רבים וכן דעת כל הפוסקים שאפילו בדיעבד אין לו התרה ובתשובת מהר\"מ פדוא' סימן ס\"ח חלק ג\"כ על הר' אביגדור וכתב דלישנא דאין לו הפרה משמע אפילו בדיעבד וטוב טעמו אבל לפעד\"נ להוכיח כן מסוגית הש\"ס דפרק השולח וסוף פרק מומין אלו דאם איתא דמותר בדיעבד הדרא קושית הש\"ס לדוכתה דלמא אזיל לגבי חכם או לג' הדיוטות ושרי ליה כו' ומפני זה נראה דאין להקל כלל אפילו בשעת הדחק וצורך בדבר ותשובות הרשב\"א מיירי כפשטיה דנדר שהודר על דעת רבים כלומר שאמר סתם על דעת רבים ולא פרטם דבכה\"ג מותר בדיעבד כדעת ר\"ת וכן הביא הב\"י לעיל מיניה בסמוך תשובות הרשב\"א וז\"ל אע\"פ שכתבנו בשם ר\"ת שאין נקרא על דעת רבים אלא בפורטם אין אנו עושים מעשה ע\"ז כדבריו עכ\"ל וקאמר הכא נהי דאין עושים מעשה כדבריו לכתחלה מ\"מ בדיעבד כדאי הוא ר\"ת לסמוך עליו בשעת הדחק וזה ברור:"]
**** ENGLISH ****
[Only in a time of pressure. This is what the rabbi wrote according to what Beit Yosef wrote, namely that Mahariq wrote (root 52) in the name of R' Avigdor that regarding a vow in the opinion of the public there is no annulment l'chatchila, but b'dieved if three men came and released it for him it is permitted; and even though this is not the approach of most poskim, nevertheless it is fit to make a branch for the views mentioned etc.; and Rashba too in responsum regarding a vow taken in the opinion of the public — if they released it, it is permitted b'dieved; and even though some great teachers disagree, nevertheless R' Yerucham is fit to rely on in a time of pressure etc. Beit Yosef, and Darkei Moshe brings it. And it appears to me that one cannot say Rashba's responsum deals with such a case, for we do not find R' Yerucham anywhere that b'dieved it is permitted; on the contrary, from what all poskim wrote and Rashba himself in chapter HaSholeach in his name — that the Gemara resolves the one who asked that perhaps he will go to a sage and release him, i.e. for b'dieved; but l'chatchila they do not release him except with his consent — if so it is proven that regarding the opinion of the public even b'dieved release does not help for R' Yerucham, for they answer there that we coerce him regarding the opinion of the public, and so is the view of all poskim that even b'dieved he has no release. And in responsum of Maharam Padua siman 68 he too disagrees with R' Avigdor and wrote the language "there is no annulment" implies even b'dieved, and his reasoning is good; but it appears to me to prove thus from the sugya in chapter HaSholeach and end of chapter These Defects, that if etc. — end of his words.]
**** END BLOCK ****
```

### 16. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 21 — marker `מ`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%9E`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 21
marker: מ
**** HEBREW ****
["<b>לא מקרי על דעת רבים. </b>דדוקא כשנודר עד\"ר שאומר על דעתכם או ע\"ד פלוני ופלוני ופלוני ששיתף דעת הרבים בעיקר הנדר הוי על דעת רבים משא\"כ הכא. וכה\"ג לקמן סעיף ל\"ח: "," ב\"י בשם הריב\"ש דשטר שכתוב בו עד\"ר דינו כעד\"ר המוזכר בש\"ס ואינו מוכרח ומביאו ד\"מ ונ\"ל דלכתחלה יש להחמיר שלא להתירו כיון שי\"א שאפילו אמר סתם עד\"ר אין לו התרה וכמש\"ל ס\"ק ד':"]
**** ENGLISH ****
(I don't think many things. Dr. Dodddha, who says about your opinion or my opinion, is a flawed and flawed that has attracted many opinions, especially vowed to have many opinions. And then he says, “And he shall not be given to him.”
**** END BLOCK ****
```

### 17. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 22 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=22#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 22
marker: א
**** HEBREW ****
["<b>שנדר מעצמו כו'. </b>כלומר לאפוקי אם הדיר לחבירו בשביל טובה שעשה לו דאפילו ע\"ד יחיד אין יכול להתיר בלא דעתו כדלעיל ר\"ס כ'."]
**** ENGLISH ****
[Heared by himself. That is to say, if he has set up for a good man who has made him even a single D. can't allow his mind to be a fool."
**** END BLOCK ****
```

### 18. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 22 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=22#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 22
marker: ב
**** HEBREW ****
["<b>דינו כנדר כו'. </b>ואין לו התרה:"]
**** ENGLISH ****
[We have been called Rabbi Hou. And he has no help."
**** END BLOCK ****
```

### 19. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 22 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=22#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 22
marker: ג
**** HEBREW ****
["<b>אם נשבע לדבר הרשות. </b>אבל אם נשבע על דעת המקום לעשות דבר מצוה אין לו התרה:"]
**** ENGLISH ****
If I swear to the authority. But if I swear to it, he has no help
**** END BLOCK ****
```

### 20. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 23 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=23#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 23
marker: א
**** HEBREW ****
["<b>נדר שהודר ברבים. </b>כלומר שהודר במעמד רבים ולא אמר עד\"ר:"]
**** ENGLISH ****
[And vowed in many. That is to say that it has been arranged in many positions and has not been said to him."
**** END BLOCK ****
```

### 21. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 23 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=23#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 23
marker: ב
**** HEBREW ****
["<b>יש לו התרה בלא דעתם. </b>וכתב ב\"י בשם תשובות הרשב\"א שא\"צ להתיר בפניהם ושכן מוכח בכמה מקומות בפ' השולח ומשמע מדבריו שם דאפילו בלא ידיעת אותן רבים התירו לו דדוקא בנודר ע\"ד יחיד הוא שאמרו כן עכ\"ל ב\"י וכן מוכח בהשולח ריש דף ל\"ו ובבכורות ס\"פ מומין אלו במאי דפריך התם אלא למ\"ד נדר שהודר ברבים יש לו הפרה מאי איכא למימר דא\"צ להתיר בפניהם ולא להודיע. מיהו נראה דהיינו דוקא כשאין להרבים תועלת בנדר ההוא הא לאו הכי לא גרעי מיחיד שאסור משום חשד וכדלעיל ס\"ק מ\"א:"]
**** ENGLISH ****
[He has a warning without his mind. It is written in the name of the Lord’s Prayers, and it is written in the name of the Lord’s Prayer, and it is written in the name of His words that many of them have been given to him, and that they are not allowed to give him a single petition to him, and that he will not be able to do so. What does it seem like when there is no benefit to the Honder
I am not one of the most grievances that is not due to suspicion and mischief
**** END BLOCK ****
```

### 22. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 24 — marker `_`

- Quality: **error** — chunk_seam_duplicate, divine_name_style, mt_garbage
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=24#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 24
marker: _
**** HEBREW ****
<b>בעל מפר כו'. </b>דכיון דאינו תלוי בדעתה שהרי הבעל מפר אפילו בלא חרטה דידה כשם שאין דעתה מעכבתה להפר כך דעת הרבים אינו מעכבתה כ"כ הפוסקים. וכתב הרא"ש בפ' השולח דאפשר שאפילו אם יבטל הבעל דעתו ויתן לה רשות לידור ע"ד אחרים אינו כלום כיון דסתם אשה ע"ד בעלה נודרת ותלה הכתוב הפרתה בבעל יכול הבעל לחזור ממה שנתן לה רשות (וכ"כ ר' ירוחם נכ"ז ח"ב בשם י"מ) ונ"ל אעפ"י דכתב הרא"ש כך בל' אפשר מ"מ סובר שהדין כך ולכן כתב שם ברמזים כן בפשיטות דאל"כ תקשי לרב הונא אמאי הפסידה כתובתה יתן לה הבעל רשות דמה"ט הוצרך הרא"ש והתוספות והר"ן התם לפרש דהפרה דבבעל מהני אפי' בעד"ר א"כ מוכח מהתוס' והרא"ש והר"ן דאפילו נתן לה בעל רשות לא מהני וכן מוכח מכל הפוסקים שפסקו כרב הונא דלא כהב"ח לקמן ר"ס רל"ד שכתב משמע דמספקא להרא"ש ולפיכך לא כתבו הטור כו' גם אשתמיטתיה דברי הטור בא"ע ס"ס צ"ו בפשיטות שאפילו נתן לה הבעל רשות מפר ע"ש:
**** ENGLISH ****
My husband is a cowboy. Duchron Dao depends on her opinion that the husband is violating even without regret as her opinion does not inhibit her from violating so many opinions does not inhibit her as “consequent.” And he said, “The Lord’s Prayer is not a man’s wife, and he is not a man who has been given to him, and that the man who has been sent to him, and that his wife is not allowed to return to his wife, and that the man who is given to him.”
He said, “The Lord’s Prayer and the Lord’s Prayer and the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayers Prayer, and the Lord’s Prayer, and the Lord’s Prayer, is not even given him
**** END BLOCK ****
```

### 23. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 25 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 25
marker: א
**** HEBREW ****
["<b>הלכך נודרים ומתירים כו'. </b>שמה שהזכירו ע\"ד המקום ושבועה לא הזכירו אלא כדי שינהגו חומרא יותר ולאיים עליהם שלא ינהגו בהן קלות ראש אבל תלוי הכל בדעת הקהל כמו שיסכימו:"]
**** ENGLISH ****
[This is how we are going to be, and they will be saved. What they mentioned by the place and that the bubble did not mention, but rather so that they would not behave lightly, but it depends on everything in the public opinion as they agreed
**** END BLOCK ****
```

### 24. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 25 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 25
marker: ב
**** HEBREW ****
["<b>ואם הוחרם או הודר. </b>אותו חרם שהוסיפו על מנהגם:"]
**** ENGLISH ****
(And if they were late or removed. The same boycott that was added to the lake:
**** END BLOCK ****
```

### 25. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 25 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 25
marker: ג
**** HEBREW ****
["<b>או הודר עד\"ר. </b>כלומר שאמרו ע\"ד קהלות הרחוקות דזה הוי עד\"ר וכן הוא בתשו' הרשב\"א שבב\"י:"]
**** ENGLISH ****
(or broadcast to Dr. That is to say that the remote crowds have spoken to him, and he is also in the womb
**** END BLOCK ****
```

### 26. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 25 — marker `ד`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 25
marker: ד
**** HEBREW ****
["<b>וי\"א דאפילו התנו כו'. </b>דכל מעשה צבור הוי כאלו התנו כך מתחלה מיהו אפשר גם להרא\"ש אם אמרו עד\"ר או ע\"ד קהלות הרחוקות אין להם התרה ודעת המחבר שגם הרא\"ש אינו חולק אסברא הראשונה ומ\"ש שאפילו התנו יכולים לחזור ולהתירו ר\"ל דהיינו ע\"י שאלה ולזה כתב דברי הרא\"ש לקמן סי' רכ\"ט ס\"ד:"]
**** ENGLISH ****
[And] we even got married. This is what Hashem’s Word says, “If they do not believe in Hashem’s Word, they do not believe in Hashem’s Word, and they will not be given to them.”
**** END BLOCK ****
```

### 27. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 26 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=26#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 26
marker: _
**** HEBREW ****
<b>אין נדרי כו'. </b>כלומר לא כשאר נדרים שניתרים בהתרת חכם שנעקריה למפרע ונ"מ לענין הותר מקצתו הותר כולו כדלקמן סי' רכ"ט ס"ב:
**** ENGLISH ****
There's no pigeons. In other words, it is not when Arnners who seek a wise concession that is being studied for the rioter, and that he is completely permitted as follows C.C
**** END BLOCK ****
```

### 28. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 27 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=27#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 27
marker: _
**** HEBREW ****
<b>מתירין כו'. </b>משום שחרמים אלו כאלו יש בהן תנאי שיוכלו להתיר כל זמן שירצו:
**** ENGLISH ****
Matthew R. Because these currents have a condition that they can permit any time they want:
**** END BLOCK ****
```

### 29. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 28 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=28#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 28
marker: _
**** HEBREW ****
<b>וכן בנדר של שחוק. </b>כב"י לקמן ריש דף רע"ב בשם תשובת הרשב"א דאם כללו בחרם שכל מי שיעבור יהא מנודה כל מי שכבר עבר יכולין להתיר כדרך שמתירין שאר המנודים וכן נראה שמתירין הנידויים אפי' מכאן ולהבא שאין היתר זה בגוף האיסור ממש כגון השחוק אלא הקנס הוא שמתירים ואיסור השחוק במקומו עומד ע"כ:
**** ENGLISH ****
And yes, a bar of law. As L. Macman puts a bad page in the name of the PA’s response, everyone who is going to turn away will be evaporated by anyone who has already been able to permit as much as the way that the rest of the peoples and seems to have an epitome from here and that this is not the actual prohibition in the body such as the law, but the fine, which is prohibited in its place
**** END BLOCK ****
```

### 30. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 29 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=29#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 29
marker: א
**** HEBREW ****
["<b>ואין דעתם לחזור. </b>כלומר אף ע\"פ שאין דעתם לחזור אם הפרצה ההיא כו' אבל אם דעתם לחזור אף על פי שאין הפרצה מצויה שם חייבים להתנהג בגדר ההוא כמ\"ש בא\"ח סי' תקע\"ד דחייב לנהוג חומרי מקום שיצא משם כשדעתו לחזור:"]
**** ENGLISH ****
[And they do not think of returning. That is to say, even though they do not have the mind to return if this outbreak has been broken, but if they do not return even though the outbreak is there, they must act in that fence as the “C” in the U.S.A. will be compelled to drive the materials of the place that came out when they know how to return
**** END BLOCK ****
```

### 31. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 29 — marker `ב`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=29#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 29
marker: ב
**** HEBREW ****
["<b>ולכן כו'. </b>הלשון אינו מדוקדק דהכא גרע טפי וכ\"מ בב\"י וטעמא דהכא הוי ב\"ד הגדול שהחרם ההוא אין המקום גורם אותו אלא אקרקפתא דגברא וע\"ל סעיף ל\"ה ס\"ק צ\"ב ובתשובת מבי\"ט ח\"ב סי' ק\"ד דף נ' במי שנשא אשה במקום תקנת ר\"ג והתנה שלא ישא אשה עליה ואחר כך הלך למקום אחר ונאבדה כתובתה וכתב לה אחרת אינו יכול לישא אשה אחרת כיון שנשאה על תנאי תקנת ר\"ג וכ\"ש כשהיה כתוב בפירוש התנאי בכתובה כו' ומשמע הא לאו הכי יכול לישא אשה ולא אמרינן שחרם ר\"ג חל עליו גם במקום אחר וצ\"ל דמיירי שלא היה דר במקום תקנת ר\"ג רק שנשא אשה לשם והלכך לא חל עליו תקנת ר\"ג ודו\"ק:"]
**** ENGLISH ****
[And so, yes. The tongue does not circumvent the sages of this verse, but rather does it cause it, and it does not mean that it does not mean that it does not occur in the name of the Lord, nor does it mean that he or she is given to him, and that he does not have any other name
For a woman can be married and he did not say that they had married him in another place, and that he did not have a way in the place of a rupture, and that he had only given a woman there and that he did not apply to him
**** END BLOCK ****
```

### 32. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: א
**** HEBREW ****
["<b>ג' פעמים. </b>לאו דוקא דבחד זימנא נמי סגי אלא עושין כן כדי לחזק הענין עט\"ז ומשמע דבדיעבד סגי בפעם אחת וכ\"כ הב\"י והב\"ח בשם הרמב\"ם דא\"צ שיאמר רק פעם אחת:"]
**** ENGLISH ****
[J] times. Hashem’s Word is a blessing to Hashem’s people, but rather a blessing for Hashem’s mercy, and a blessing for the Lord’s Word, which is only one time
**** END BLOCK ****
```

### 33. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `ב`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: ב
**** HEBREW ****
["<b>ואפי' מעומד כו'. </b>ובשבת דאע\"ג דבכה\"ג בדין אסור נדרים לאו דין הוא:"]
**** ENGLISH ****
[and] is standing up. “And in the morning of the Lord, we shall not be given to the Lord.”
**** END BLOCK ****
```

### 34. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 3 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 3
marker: ג
**** HEBREW ****
["<b>וחרמי צבור נהגו להתיר כו'. </b>מפני שבשבת כולם מקובצים ואם לא יתירו אז לא יוכלו להתיר שם וכן הוא בעט\"ז וכב\"ח בא\"ח סימן שמ\"א מי שנשבע לעשות דבר פלוני עד זמן פלוני ולא נזדמן לו לעשות עד יום האחרון של אותו הזמן ואותו יום בא בשבת וא\"א לעשותו בשבת נשאל אפילו בשבת וכ\"פ בש\"ע שם וע\"ל סימן רל\"ד ס\"ק ע':"]
**** ENGLISH ****
[And Jeremy Chor used to allow him. Because in the Shabbat everyone is discarded, and if he is not allowed to permit a name, and he will not be allowed to do so until the last day of the same time and the same day, and he will not be asked on the Shabbat, and he will not be asked on the Shabbat
**** END BLOCK ****
```

### 35. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 30 — marker `א`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=30#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 30
marker: א
**** HEBREW ****
["<b>וע\"ל כתבתי כו'. </b>כלומר לעיל סכ\"א כתב די\"א ארבעה שנשבעו יחד לעשות איזה דבר מיקרי נשבע עד\"ר וס\"ל להרב דבעד\"ר אפילו מתחרטים כולם אין יכול להתיר להם כיון שאין חרטתן שוה וע\"ל ס\"ק נ\"ז ודע דהרמב\"ן לטעמיה אזיל וכמ\"ש הריב\"ש בשמו דמחלק בין חרם לשבועה אבל בריב\"ש כתב עליו ואני אומר שהטעם שסמכו עליו להתיר חרמי הקהל בלא שאלה דהואיל וכך נהגו ע\"ד מנהגם הם מחרימים אותו הטעם מספיק לשבועת הקהל שאף אם יאמרו מחרימים ומשביעים אנו יכולים הם עצמם להתיר בלא שאלה וחרטה משום דע\"ד כן השביעו עכ\"ל וכ\"כ הרב לעיל סכ\"ה אפי' הזכירו שבועה עם החרם וכאן סתם כדברי המחבר דאפי' יתחרטו כולם צריכים למצוא פתח לשבועתם ויתירו להם ג' אנשים דעלמא ונראה דס\"ל להרב דדוקא כשהשביעו הקהל בסתם כל הקהל כמו שהש\"ץ אומר בשליחות הקהל אנו משביעין ומחרימין כו' ואפילו ענו כל הקהל אמן בכה\"ג אמרינן דעל דעת מנהגם משביעין וכדאי' בריב\"ש אבל כשכל אחד מהקהל בפרוטרוט אמר אני נשבע על ענין זה הוי עד\"ר וצריך התרה וכך צריך ליישב דברי העט\"ז:"]
**** ENGLISH ****
I wrote him as well. That is to say, “The Lord of Israel has written four times that they should not be allowed to do any of the things that they do, and that they do not believe in Hashem’s mercy, and that they will not be given to them.”
They will say tomorrows and prosecutors that they themselves may not be permitted without question and regret because of the fact that the author of Daphin will regret everyone to find an opening for their weeks and send them a dwindled man and see him as if he is told by the public, and that all the people will be blessed with him
“But when each of the crowds in the suburban, I swear to this matter, O.S., and we need to give up, and so we have to settle the pens.”
**** END BLOCK ****
```

### 36. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 4 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 4
marker: _
**** HEBREW ****
<b>וכיון שצריך כו'. </b>צריך שיהיה מיושב אבל המודר אין צריך שיהיה מיושב כלל מיהו ודאי א"צ שיהא עומד כיון דלאו דין הוא ועכשיו נהגו שהמתירין יושבים והמודר עומד ונראה ראיה לדבריהם מהירושלמי דס"פ נערה המאורסה דאיתא התם אין נשאלין נדרים אלא עטופים ויושבים והנשאל יושב והשואל צריך להיות עומד כו' ע"ש ואע"ג דבש"ס דילן ופוסקים אמרינן דמתירים מעומד היינו בחרטה אבל בפתח צריך מיושב וי"ל דהירושלמי מיירי בפתח ועכשיו נהגו להתיר הכל ע"י פתח כדלקמן ס"ז בהג"ה ובש"ס דעירובין פ' הדר (עירובין דף ס"ד ע"ב) בעובדא דר"ג איתא דכי היכי דאסור לשכור להורות כדלקמן סי' רמ"ב סי"ג ה"נ אסור להתיר נדרים וכן הוא בכריתות (דף י"ג ע"ב) גבי רב אחא ה"ל נדרא כו' מיהו י"ל דהיינו דוקא כשמתיר ע"י פתח שצריך עיון וישוב הדעת וכדמסיק בש"ס התם דעובדא דר"ג הכי הוה:
**** ENGLISH ****
And because it needs to be.” It should be settled, but the transmitter does not need to be inhabited at all who is certain that the High Court of Justice is and is now used that the transmitter is sitting and is seen as evidence of their words from the Mitzvah of a girl who is destroyed by Daesh, who is not asked, but is wrapped and asked, and that Hashem should be standing up in the beginning of his death
He said, “The Lord’s Prayer is to be given to him, and the Lord’s Prayer is to be done, and he will not be given to him.”
**** END BLOCK ****
```

### 37. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 5 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 5
marker: א
**** HEBREW ****
["<b>אסר על עצמו כו'. </b>ואם אסר הנאתו על בני העיר כתבו הרמב\"ן והטור והריב\"ש סי' ת\"ו דאסור להשאיל על נדרו לחכם מבני אותה העיר מפני שנוגע בדבר מיהו אם יצטרפו עוד שנים מעיר אחרת מותר דבכה\"ג ליכא למיחש משום נגיעה ועיין בתשובת מהר\"ל ן' חביב ביאר דעתם על נכון וכן בפרישה ובב\"ח השיגו על הב\"י ע\"ש וכן עיקר להחמיר דלא כד\"מ ועט\"ז שנמשכו לדברי הב\"י ע\"ש:"]
**** ENGLISH ****
[And I will forgive myself as a. And if the people of the city were not allowed to borrow from the people of the city, they were told that they would not be allowed to marry the people of the same city because they would be able to join them for years from another city, and that they would be entitled to the darkness, and that they would not be able to make it possible for them
**** END BLOCK ****
```

### 38. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 5 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 5
marker: ב
**** HEBREW ****
["<b>הניית בני העיר כו'. </b>אבל אסר על עצמו הניית כל ישראל מותר להשאיל דהוי כדיעבד כ\"כ בתשו' מהר\"ל ן' חביב שם להרמב\"ם וכן נראה:"]
**** ENGLISH ****
[The people of the city were called. But it is forbidden that all of Israel can be borrowed from the Almighty to serve as a servant of Hashem’s people, and it seems:
**** END BLOCK ****
```

### 39. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 5 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 5
marker: ג
**** HEBREW ****
["לחכם כו'. אפי' בצירוף עוד שנים מעיר אחרת אליו אסור דמ\"מ הרי הוא מהנהו. ב\"י. וכתב בתשובת מ\"ע ס\"ס מ\"ח ובשום אופן לא יהיו המתירים מבני המדינה שכולם נוגעים בדבר ולא מהני סילוק נפשייהו אלא בעדות ממון או לדון בו אבל בכה\"ג הוי הנאה דמתא ואין סילוק מועיל דומיא דס\"ת (בח\"מ סי' ל\"ז) הואיל ולשמיעה עביד ע\"כ:"]
**** ENGLISH ****
[You have a fight. Epic, in addition to years from another city to which D.M. is forbidden. B. And he wrote in a reply from the IDF, and in no way shall the permits of the members of the state that all relate to the matter and not the removal of their souls, but rather the testimony of the masses or to discuss it, but in the midst of the ISA, and there is no guarantee of the benefit of the Dhimidas
**** END BLOCK ****
```

### 40. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 6 — marker `_`

- Quality: **error** — chunk_seam_duplicate, divine_name_style, mt_garbage
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 6
marker: _
**** HEBREW ****
<b>נשבע שלא יהיה גבאי או נאמן מהעיר. </b>נ"ל שהוא נהנה בשררותא דמתא שהוא מן הדברים שאין מתמנים עליהם העובדי כוכבי' והגרים וגם הציבור נהנים ממנו שמלאכתן נעשית על ידו וכיון שהוא נהנה אין נשאל לחכם שבעיר עד כאן לשון תשובת רשב"א שבבית יוסף. וכתוב בד"מ דאע"ג שלא נדר אלא נדר זה שלא יהא גבאי או נאמן לחוד ולא אסר עליו הניית העיר אפ"ה לא ישאל לחכם שבעיר שהרי אסר עליו הגבאות והנאמנות הבאה לו הנאה מן העיר וכוונתו על הנאות הגבאות והנאת הנאמנות והואיל ועל ידי התרת חכם בא לו הנאה זו הרי עבר על נדרו וכן נראה לו עיקר עכ"ל. ולפי זה הרשב"א קאי בשיטת הרמב"ם וכמו שכתב בב"י וכן כתב בעט"ז עיין שם בביאורו דלא כדכתב דרישה ודוק ומ"מ להנך פוסקים דאסרי משום נגיעה וכמו שכתבתי בס"ק ט' הכא בלא"ה אינו נשאל וק"ל:
**** ENGLISH ****
I swear that there will be no culprit or trust in the city. He is enjoying the enlightenment of Hashem’s creation that he is of the things that do not belong to the workers of the planets and the people enjoy that their crafts are made by him and that he is enjoying it, he is not asked for the people in the city until this is the language of the Lord’s Prayer. And it is written in the Bible that neither vow nor be nor faithful to the people of the city, nor shall the people of the city be spared to the people of the city, nor shall the people of the city be spared, for the city has been forbidden to receive pleasure from the city and its intention by it
For the pleasures of the eyebrows and the loyalty of the Lord, and by the cleverness he has given him this pleasure, he has passed on to Naro and he seems to be the most important. This is what the Bible has written in the Bible, and as it is written in the Bible, it is written in the Bible that it is written in its name in the Bible that it is not asked and accepted:
**** END BLOCK ****
```

### 41. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: א
**** HEBREW ****
["<b>אילו ידעת שיפצירו בך כו'. </b>ואין זה נולד דלקמן סי\"ב שזה שכיח הוא:"]
**** ENGLISH ****
“If you knew you would be shot in you.” And it is not born in the U.S. that it is common:
**** END BLOCK ****
```

### 42. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 7 — marker `ב`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 7
marker: ב
**** HEBREW ****
["<b>ואז מתירים לו. </b>ר\"ל אפילו בלא פתח אחר אלא בחרטה גרידא מתירין לו כשעושין מן החרטה פתח והטעם דהשתא אין לחוש שמא אינו בקי בחרטה זו ושמא היה חפץ בנדרו עד עתה ואע\"פ שאומר שמתחרט אינו אמת דהלא אמרו לו אילו ידעת שתתחרט כלום נדרת והוא אומר לא השתא ודאי אפי' את\"ל שהיה חפץ בנדר זה עד עתה מ\"מ כיון שאומר אילו ידע שיתחרט אחר כך לא היה נודר אם כן נעקר הנדר מעיקרו ואין צריך פתח אחר דבהכי סגי. ש\"ס:"]
**** ENGLISH ****
[And then he is allowed. R. Even without any other opening, but with a pure darkness, he is swayed to him, and the taste of the Lord has not been told that he is not in this darkness, and that he would not have done so, and that he would not say that he would not have done so much to him. "C:"
**** END BLOCK ****
```

### 43. `siman_228/siftei-kohen/part-001.txt` — siftei-kohen — seif 8 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=8#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 8
marker: _
**** HEBREW ****
<b>החרם כו'. </b>כלומר מי שקבל עליו חרם או נדוי לעשות דבר פלוני מתירין אותו בלא פתח ובלא חרטה וכך מבואר ברשב"ץ שבבית יוסף אבל חרמי צבור פשיטא דאין צריך לא פתח ולא חרטה כדלקמן סכ"ה מיהו היתר צריך וע"ל סימן רכ"ט ס"ח:
**** ENGLISH ****
Cherem etc. — meaning one who accepted cherem or niduy to do a certain thing — they release him without opening and without regret; so explained Rashbatz in Beit Yosef; but public cherem obviously needs neither opening nor regret as below seif 225; nevertheless release is required; see siman 229 seif 8.
**** END BLOCK ****
```

### 44. `siman_228/siftei-kohen/part-002.txt` — siftei-kohen — seif 30 — marker `ב`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-002.txt#slug=siftei-kohen#seif=30#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 30
marker: ב
**** HEBREW ****
["<b>דיש מי שאומר כו'. </b>והעט\"ז כ' דהכא גם היש מי שאומר מודה דבצבור שאני דכל מעשה הצבור כאלו התנו כו':"]
**** ENGLISH ****
"He who says so." It is also Hashem’s people who say, “I am grateful that I am the Lord of Hashem.”
**** END BLOCK ****
```

### 45. `siman_228/siftei-kohen/part-002.txt` — siftei-kohen — seif 30 — marker `ג`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/siftei-kohen/part-002.txt#slug=siftei-kohen#seif=30#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 30
marker: ג
**** HEBREW ****
["<b>מיהו יש חולקים כו'. </b>צ\"ע לפי הבנת הרב יהיו דברי הרמב\"ן סותרים זא\"ז שהרי הי\"א אלו הוא תשובת הריב\"ש סי' תס\"א (וקפ\"ה) וכתב שם שכ\"כ הרמב\"ן במשפט החרם שלו ודברי המחבר הם תשובת הרמב\"ן לכך נראה לחלק דהריב\"ש לא קאמר אלא בנשבעו כל הקהל כאחד בסתם דבכה\"ג לא הוי עד\"ר כיון שכן דרכם לעשות כן ע\"פ מנהגם אבל בתשובת הרמב\"ן דמיירי שנשבע כל אחד ואחד בפרוטרוט הוי עד\"ר ולכך אין יכולין להתיר עד שיסכימו כולם וצ\"ע:"]
**** ENGLISH ****
"Whosoever they share." He said, “The Lord’s Prayer will be the same as the Lord’s Prayer, and he will be called the Lord’s Prayer, and he will be given to him, and he will not be able to do so.”
All of them and all
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

siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=20#marker=%D7%A7
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=20#marker=%D7%A8
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=20#marker=%D7%A9
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%90
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%91
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%92
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%93
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%94
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%95
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%96
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%97
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%98
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%99
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%9B
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%9C
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=21#marker=%D7%9E
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=22#marker=%D7%90
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=22#marker=%D7%91
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=22#marker=%D7%92
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=23#marker=%D7%90
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=23#marker=%D7%91
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=24#marker=_
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%90
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%91
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%92
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=25#marker=%D7%93
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=26#marker=_
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=27#marker=_
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=28#marker=_
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=29#marker=%D7%90
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=29#marker=%D7%91
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%90
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%91
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=3#marker=%D7%92
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=30#marker=%D7%90
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=4#marker=_
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%90
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%91
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=5#marker=%D7%92
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=6#marker=_
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%90
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=7#marker=%D7%91
siman_228/siftei-kohen/part-001.txt#slug=siftei-kohen#seif=8#marker=_
siman_228/siftei-kohen/part-002.txt#slug=siftei-kohen#seif=30#marker=%D7%91
siman_228/siftei-kohen/part-002.txt#slug=siftei-kohen#seif=30#marker=%D7%92