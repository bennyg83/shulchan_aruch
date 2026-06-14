# Editorial retranslation — Siman 331 (part 4/5)

Generated: 2026-06-12T13:50:21.381Z

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

### 1. `siman_331/mechaber/part-001.txt` — mechaber — seif 45 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=45#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 45
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="89"></i>המתכוין לומר תרומה ואמר מעשר מעשר ואמר תרומה <i data-commentator="Siftei Kohen" data-order="75"></i>לא אמר כלום עד שיהיו פיו ולבו שוים:
**** ENGLISH ****
One who intended to say terumah and said ma'aser, or ma'aser and said terumah—he has said nothing until his mouth and heart are aligned:
**** END BLOCK ****
```

### 2. `siman_331/mechaber/part-001.txt` — mechaber — seif 46 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=46#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 46
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="92"></i><i data-commentator="Be'er HaGolah" data-order="90"></i>הפריש תרומה במחשבתו ולא הוציא בשפתיו כלום <i data-commentator="Siftei Kohen" data-order="76"></i>הרי זה תרומה שנאמר ונחשב לכם תרומתכם:
**** ENGLISH ****
One who separated terumah in his thought and did not express it with his lips—behold this is terumah, as it is said, "And it shall be reckoned to you as your terumah:
**** END BLOCK ****
```

### 3. `siman_331/mechaber/part-001.txt` — mechaber — seif 47 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=47#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 47
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="91"></i>המפריש תרומה על תנאי אם <i data-commentator="Ba'er Hetev" data-order="38"></i>נתקיים התנאי <i data-commentator="Siftei Kohen" data-order="77"></i>הרי זה תרומה:
**** ENGLISH ****
One who separates terumah conditionally—if the condition is fulfilled, behold this is terumah:
**** END BLOCK ****
```

### 4. `siman_331/mechaber/part-001.txt` — mechaber — seif 48 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=48#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 48
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="92"></i>המפריש תרומות ומעשרות וניחם עליהם <i data-commentator="Beur HaGra" data-order="93"></i>הרי זה נשאל לחכם ומתיר לו כדרך שמתירין שאר נדרים <i data-commentator="Siftei Kohen" data-order="78"></i>ותחזור חולין כמו שהיתה:
**** ENGLISH ****
One who separated terumot and ma'asrot and regretted them—behold he asks a sage and he permits him as they permit other vows, and they return to be chullin as they were:
**** END BLOCK ****
```

### 5. `siman_331/mechaber/part-001.txt` — mechaber — seif 49 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=49#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 49
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="94"></i><i data-commentator="Be'er HaGolah" data-order="93"></i>האומר של מעלה תרומה ושל מטה חולין או בהפך <i data-commentator="Siftei Kohen" data-order="79"></i>דבריו <i data-commentator="Ba'er Hetev" data-order="39"></i>קיימים:
**** ENGLISH ****
One who says, "What is above is terumah and what is below is chullin," or the reverse—his words stand:
**** END BLOCK ****
```

### 6. `siman_331/mechaber/part-001.txt` — mechaber — seif 5 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=5#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 5
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="14"></i><i data-commentator="Be'er HaGolah" data-order="12"></i>מכר העובד כוכבים הפירות שלו לישראל כשהן מחוברים לקרקע אם עד שלא באו <i data-commentator="Siftei Kohen" data-order="11"></i>לעונת המעשרות ונגמרו ביד ישראל <i data-commentator="Siftei Kohen" data-order="12"></i>חייב בכל ונותן <i data-commentator="Turei Zahav" data-order="3"></i>כל מעשר ראשון ללוי ואם מכרן אחר שבאו לעונת המעשרות מפריש תרומות ומעשרות <i data-commentator="Beur HaGra" data-order="15"></i>ונותן המעשר ללוי לפי חשבון כיצד לקח תבואה זרועה מעובד כוכבים אחר שהביאה שליש ונגמרה ביד ישראל מפריש תרומות ומעשרות <i data-commentator="Siftei Kohen" data-order="13"></i>ונותן ללוי <i data-commentator="Turei Zahav" data-order="4"></i>שני שלישי המעשר <i data-commentator="Ba'er Hetev" data-order="2"></i>הראשון:
**** ENGLISH ****
A non-Jew sold his fruits to an Israelite while they were attached to the ground—if before they reached the season of ma'asrot and they were completed in the hand of the Israelite, he is obligated in all of them and gives all ma'aser rishon to the Levi. And if he sold them after they reached the season of ma'asrot, he separates terumot and ma'asrot and gives the ma'aser to the Levi according to the calculation. How so? He took grain that was sown from a non-Jew after it brought a third and it was completed in the hand of the Israelite—he separates terumot and ma'asrot and gives to the Levi two-thirds of ma'aser rishon:
**** END BLOCK ****
```

### 7. `siman_331/mechaber/part-001.txt` — mechaber — seif 50 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=50#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 50
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="94"></i>התורם את הגורן צריך שיכוין את לבו שתהיה תרומה על הכרי ועל מה שבקוטעין <small>(פי' שבלים קטועים שלא נידושו) </small>ועל מה שבצדדים ועל מה שבתוך התבן התורם את היקב צריך שיכוין את לבו לתרום על מה שבחרצנים ועל מה שבזגים התורם את הבור של שמן צריך שיכוין את לבו על מה שבגפת <small>(פירוש פסולת של זיתים) </small>ואם לא נתכוין אלא תרם סתם נפטר הכל שתנאי ב"ד הוא שתרומה על הכל:
**** ENGLISH ****
One who separates terumah from the threshing floor must intend in his heart that the terumah be for the stack and for what is in the cut stalks (meaning: small stalks that were not threshed) and for what is at the sides and for what is inside the straw. One who separates terumah from the winepress must intend in his heart to separate terumah for what is in the husks and for what is in the lees. One who separates terumah from the pit of oil must intend in his heart for what is in the refuse (meaning: waste of olives). And if he did not intend but separated unconditionally, everything is discharged, for it is a condition of the court that terumah is on everything:
**** END BLOCK ****
```

### 8. `siman_331/mechaber/part-001.txt` — mechaber — seif 51 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=51#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 51
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="95"></i>התורם כלכלה של תאנים ונמצאו תאנים בצד הכלכלה הרי אלו פטורים מפני שבלבו לתרום על הכל:
**** ENGLISH ****
One who separates terumah from a basket of figs and figs are found at the side of the basket—behold these are exempt, because in his heart he intended to separate terumah on everything:
**** END BLOCK ****
```

### 9. `siman_331/mechaber/part-001.txt` — mechaber — seif 52 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=52#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 52
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-label="(°)" data-order="95"></i>אין תורמין <i data-commentator="Be'er HaGolah" data-order="96"></i>אלא מן היפה <i data-commentator="Beur HaGra" data-order="95"></i>ונראה לי דהשתא דלאיבוד אזלא מפני הטומאה אין להקפיד בכך <i data-commentator="Beur HaGra" data-order="96"></i>ומיהו במעשר הניתן ללוי ולעני יש להקפיד בכך:
**** ENGLISH ****
One separates terumah only from the best. And it appears to me that nowadays, when it goes to destruction because of tumah, one need not be strict about this; however, in ma'aser that is given to the Levi and to the poor, one should be strict about this:
**** END BLOCK ****
```

### 10. `siman_331/mechaber/part-001.txt` — mechaber — seif 53 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=53#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 53
marker: main
**** HEBREW ****
<i data-commentator="Pithei Teshuva" data-order="9"></i><i data-commentator="Be'er HaGolah" data-order="97"></i>אין תורמין ממין על שאינו מינו ואם תרם אין תרומתו תרומה <i data-commentator="Beur HaGra" data-order="97"></i><i data-commentator="Be'er HaGolah" data-order="98"></i>הקישות והמלפפות מין אחד <i data-commentator="Be'er HaGolah" data-order="99"></i>כל מין חטים מין אחד <i data-commentator="Pithei Teshuva" data-order="10"></i><i data-commentator="Be'er HaGolah" data-order="100"></i>כל מין תאנים וגרוגרות ודבילה מין א' ותורם מזה על זה <i data-commentator="Be'er HaGolah" data-order="101"></i>וכל שהוא כלאים בחבירו לא יתרום מזה על זה אפילו מן היפה על הרעה ואם תרם אין תרומתו תרומה וכל שאינו כלאים בחבירו תורם מן היפה על הרע אבל לא מן הרע על היפה ואם תרם תרומתו תרומה חוץ מן הזונין <small>(פי' זרעונים שחורים הנמצא בין החטים) </small>על החטים מפני שאינם אוכל אדם:
**** ENGLISH ****
One does not separate terumah from one species for what is not its species; and if he separated, his terumah is not terumah. Gourds and cucumbers are one species; every species of wheat is one species; every species of figs, dried figs, and fig cakes is one species, and he separates from one for the other. And everything that is kilayim with its fellow—he may not separate terumah from this for that, even from the good for the bad; and if he separated, his terumah is not terumah. And everything that is not kilayim with its fellow—he separates from the good for the bad, but not from the bad for the good; and if he separated, his terumah is terumah—except for zunin (meaning: black seeds found among wheat) for wheat, because people do not eat them:
**** END BLOCK ****
```

### 11. `siman_331/mechaber/part-001.txt` — mechaber — seif 54 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=54#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 54
marker: main
**** HEBREW ****
<i data-commentator="Siftei Kohen" data-order="80"></i><i data-commentator="Be'er HaGolah" data-order="102"></i>אין תורמין מדבר שנגמרה מלאכתו על דבר שלא נגמרה מלאכתו ולא מדבר שלא נגמרה מלאכתו על דבר שנגמרה מלאכתו ואם תרם תרומתו תרומה:
**** ENGLISH ****
One does not separate terumah from a thing whose work was completed for a thing whose work was not completed, nor from a thing whose work was not completed for a thing whose work was completed; and if he separated, his terumah is terumah:
**** END BLOCK ****
```

### 12. `siman_331/mechaber/part-001.txt` — mechaber — seif 55 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=55#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 55
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="103"></i>אין תורמין מהמחובר על התלוש ולא מן התלוש על המחובר ואם תרם <i data-commentator="Siftei Kohen" data-order="81"></i>אין תרומתו תרומה <i data-commentator="Be'er HaGolah" data-order="104"></i>אבל אם אמר פירות ערוגה זה תלושים יהיו תרומה על פירות ערוגה זו לכשיתלשו <i data-commentator="Siftei Kohen" data-order="82"></i><i data-commentator="Ba'er Hetev" data-order="40"></i>ונתלשו דבריו קיימין <i data-commentator="Be'er HaGolah" data-order="105"></i>והוא שהביאו שניהם שליש בעת שאמר:
**** ENGLISH ****
One does not separate terumah from what is attached for what is detached, nor from what is detached for what is attached; and if he separated, his terumah is not terumah. But if he said, "The fruits of this garden bed—when they are detached they shall be terumah for the fruits of this garden bed when they are detached," and they were detached—his words stand; and this is when both brought a third at the time he spoke:
**** END BLOCK ****
```

### 13. `siman_331/mechaber/part-001.txt` — mechaber — seif 56 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=56#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 56
marker: main
**** HEBREW ****
<i data-commentator="Siftei Kohen" data-order="83"></i><i data-commentator="Be'er HaGolah" data-order="106"></i>אין תורמין מן הלח על היבש ולא מן היבש על הלח ואם תרם תרומתו תרומה:
**** ENGLISH ****
One does not separate terumah from the moist for the dry, nor from the dry for the moist; and if he separated, his terumah is terumah:
**** END BLOCK ****
```

### 14. `siman_331/mechaber/part-001.txt` — mechaber — seif 57 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=57#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 57
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="107"></i>אין תורמין מפירות שנה זו על פירות שנה שעברה ולא מפירות שנה שעברה על פירות שנה זו ואם תרם אינה תרומה <i data-commentator="Beur HaGra" data-order="98"></i>שנאמר שנה שנה <i data-commentator="Be'er HaGolah" data-order="108"></i>ליקט ירק ערב ר"ה עד שלא בא השמש וחזר וליקט אחר שבא השמש אין תורמין מזה על זה שזה חדש וזה ישן <i data-commentator="Beur HaGra" data-order="99"></i>וכן אם ליקט אתרוג בערב ט"ו בשבט עד שלא בא השמש וחזר וליקט אתרוג אחר משבא השמש אין תורמין מזה על זה <i data-commentator="Beur HaGra" data-order="100"></i>מפני שאחד בתשרי ראש השנה למעשרות תבואה וקטניות וירקות וט"ו בשבט ר"ה למעשרות האילן:
**** ENGLISH ****
One does not separate terumah from the fruits of this year for the fruits of last year, nor from the fruits of last year for the fruits of this year; and if he separated, it is not terumah, as it is said, "year by year." One who gathered vegetables on the eve of Rosh Hashanah before the sun set and returned and gathered after the sun set—he does not separate terumah from this for that, for this is new and that is old. And likewise if he took an etrog on the eve of the 15th of Shevat before the sun set and returned and took an etrog after the sun set—he does not separate terumah from this for that, because the 1st of Tishrei is Rosh Hashanah for ma'asrot of grain, legumes, and vegetables, and the 15th of Shevat is Rosh Hashanah for ma'asrot of trees:
**** END BLOCK ****
```

### 15. `siman_331/mechaber/part-001.txt` — mechaber — seif 58 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=58#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 58
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="109"></i>אין תורמין מפירות הארץ על פירות חוצה לארץ ולא מפירות ח"ל על פירות הארץ ולא מפירות הפטורים על החייבים ולא מהחייבים על הפטורים ואם תרמו אין תרומתן תרומה:
**** ENGLISH ****
One does not separate terumah from fruits of the land for fruits outside the land, nor from fruits outside the land for fruits of the land, nor from exempt fruits for obligated fruits, nor from obligated fruits for exempt fruits; and if they separated, their terumah is not terumah:
**** END BLOCK ****
```

### 16. `siman_331/mechaber/part-001.txt` — mechaber — seif 6 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=6#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 6
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="16"></i><i data-commentator="Be'er HaGolah" data-order="13"></i>ישראל שמכר פירותיו לעובד כוכבים קודם שיבואו לעונת המעשרות וגמרן העובד כוכבים <i data-commentator="Siftei Kohen" data-order="14"></i>פטורין מן התרומה ומן המעשרות ואם אחר שבאו לעונת המעשרות <i data-commentator="Siftei Kohen" data-order="15"></i>אע"פ שגמרן העובד כוכבים חייב <i data-commentator="Ba'er Hetev" data-order="3"></i>בכל:
**** ENGLISH ****
An Israelite who sold his fruits to a non-Jew before they reached the season of ma'asrot and the non-Jew completed them—they are exempt from terumah and from ma'asrot. And if after they reached the season of ma'asrot—even though the non-Jew completed them, he is obligated in all of them:
**** END BLOCK ****
```

### 17. `siman_331/mechaber/part-001.txt` — mechaber — seif 7 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=7#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 7
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="17"></i><i data-commentator="Be'er HaGolah" data-order="14"></i>מכר עובד כוכבים לישראל פירות מחוברים אחר שבאו לעונת המעשרות ומרחן העובד כוכבים ברשות ישראל אינם חייבים בתרומה ומעשרות <i data-commentator="Beur HaGra" data-order="18"></i>הואיל ובאו לעונת המעשרות ברשות עובד כוכבים ומרחן העובד כוכבים אע"פ שהם ברשות ישראל <i data-commentator="Siftei Kohen" data-order="16"></i><i data-commentator="Beur HaGra" data-order="19"></i><i data-commentator="Be'er HaGolah" data-order="15"></i>הקונה פירות מעובד כוכבים בסוריא בין תלושים בין מחוברים אפילו קודם שבאו לעונת המעשרות אע"פ שמרחן ישראל פטורים <i data-commentator="Siftei Kohen" data-order="17"></i>ואם עדיין לא <i data-commentator="Ba'er Hetev" data-order="4"></i>הגיעו לעונת המעשרות הואיל וקנה אותם עם הקרקע חייב לעשר:
**** ENGLISH ****
A non-Jew sold to an Israelite fruits attached after they reached the season of ma'asrot and the non-Jew trod them in the domain of the Israelite—they are not obligated in terumah and ma'asrot, since they reached the season of ma'asrot in the domain of the non-Jew and he trod them, even though they are in the domain of the Israelite. One who buys fruits from a non-Jew in Syria, whether detached or attached, even before they reached the season of ma'asrot—even though an Israelite trod them, they are exempt. And if they have not yet reached the season of ma'asrot, since he acquired them with the land, he is obligated to tithe:
**** END BLOCK ****
```

### 18. `siman_331/mechaber/part-001.txt` — mechaber — seif 8 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=8#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 8
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="20"></i><i data-commentator="Be'er HaGolah" data-order="16"></i>ישראל שהיה אריס לעובד כוכבים בסוריא פירותיו פטורים <i data-commentator="Siftei Kohen" data-order="18"></i>לפי שאין לו <i data-commentator="Ba'er Hetev" data-order="5"></i>בגוף הקרקע כלום <i data-commentator="Beur HaGra" data-order="21"></i><i data-commentator="Be'er HaGolah" data-order="17"></i>וכן החוכר והמקבל והשוכר שדה מהעובד כוכבים בסוריא פירותיו פטורין:
**** ENGLISH ****
An Israelite who was a sharecropper for a non-Jew in Syria—his fruits are exempt, because he has nothing in the body of the land itself. And likewise the contractor, the recipient, and the renter of a field from a non-Jew in Syria—their fruits are exempt:
**** END BLOCK ****
```

### 19. `siman_331/mechaber/part-001.txt` — mechaber — seif 9 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-001.txt#slug=mechaber#seif=9#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 9
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="22"></i><i data-commentator="Be'er HaGolah" data-order="18"></i>ישראל שלקח בסוריא שדה מהעובד כוכבים עד שלא הביאה שליש וחזר ומכרה לעובד כוכבים אחר שהביאה שליש <i data-commentator="Be'er HaGolah" data-order="19"></i>אם חזר ישראל ולקחה פעם שניה חייב שהרי נתחייב ביד ישראל:
**** ENGLISH ****
An Israelite who took a field in Syria from a non-Jew before it brought a third and returned and sold it to another non-Jew after it brought a third—if Israel returned and took it a second time, he is obligated, for behold he became obligated in the hand of the Israelite:
**** END BLOCK ****
```

### 20. `siman_331/mechaber/part-002.txt` — mechaber — seif 100 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=100#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 100
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="182"></i>השוכר את הפועלים לעשות עמו בפירות <i data-commentator="Beur HaGra" data-order="163"></i>בין בתלושין בין במחוברין הואיל ויש להם לאכול מן התורה במה שהם עושים הרי אלו אוכלים <i data-commentator="Siftei Kohen" data-order="123"></i>ופטורין מן המעשר ואם התנה עמהם שיאכלו מה שלא זיכתה להם תורה כגון שהתנה הפועל שיאכלו בניו עמו או שיאכל בנו בשכרו או שיאכל אחר גמר מלאכתו בתלוש הרי זה אסור לאכול עד שיעשר הואיל ואוכל מפני התנאי הרי זה כלוקח:
**** ENGLISH ****
One who hires workers to work with him in fruits—whether detached or attached—since they have permission d'oraisa to eat from what they do, behold these eat and are exempt from ma'aser. And if he stipulated with them that they eat what the Torah did not grant them—such as that the worker stipulated that they eat with his children, or that his son eat in his wages, or that he eat after completing his work from detached fruits—behold this is forbidden to eat until he tithes, since he eats because of the stipulation; behold this is like a buyer:
**** END BLOCK ****
```

### 21. `siman_331/mechaber/part-002.txt` — mechaber — seif 101 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=101#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 101
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="183"></i>המוציא פועלים לעשות לו מלאכה בשדה <i data-commentator="Siftei Kohen" data-order="124"></i>בזמן שאין להם עליו <i data-commentator="Ba'er Hetev" data-order="60"></i>מזונות אוכלים מפירות שבשדה <i data-commentator="Siftei Kohen" data-order="125"></i>ופטורים מן המעשר <i data-commentator="Beur HaGra" data-order="164"></i><i data-commentator="Be'er HaGolah" data-order="184"></i>והוא שלא נגמרה מלאכתן אבל אם יש להם עליו מזונות לא יאכלו ואע"פ שלא נגמרה מלאכתן שאין פורעין חוב מן הטבל <small>[אבל] </small>אוכלים אחת אחת מהתאנה אבל לא מן הסל ולא מן הקופה ולא מן המוקצה:
**** ENGLISH ****
One who sends out workers to do work for him in the field—while they have no sustenance from him, they eat from fruits in the field and are exempt from ma'aser, provided their work is not completed. But if they have sustenance from him, they may not eat, even though their work is not completed, for one does not pay a debt from tevel; [but] they eat one by one from the fig tree, but not from the basket, nor from the box, nor from what was set aside:
**** END BLOCK ****
```

### 22. `siman_331/mechaber/part-002.txt` — mechaber — seif 102 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=102#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 102
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="185"></i>אחד המבשל ואחד השולק ואחד הכובש קובע למעשר <i data-commentator="Beur HaGra" data-order="165"></i><i data-commentator="Be'er HaGolah" data-order="186"></i>אבל המעשן את הפירות עד שהכשירן <i data-commentator="Siftei Kohen" data-order="126"></i>הרי זה <i data-commentator="Ba'er Hetev" data-order="61"></i>ספק:
**** ENGLISH ****
Whether one cooks, or boils, or pickles—he fixes for ma'aser. But one who smokes fruits until he makes them fit—behold this is a safek:
**** END BLOCK ****
```

### 23. `siman_331/mechaber/part-002.txt` — mechaber — seif 103 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=103#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 103
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="187"></i>הטומן פירות באדמה או בזבל או בתבן עד שהכשירם לאכילה לא נקבעו למעשר:
**** ENGLISH ****
One who buries fruits in earth, or in manure, or in straw until he makes them fit to eat—they are not fixed for ma'aser:
**** END BLOCK ****
```

### 24. `siman_331/mechaber/part-002.txt` — mechaber — seif 104 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=104#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 104
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="166"></i><i data-commentator="Be'er HaGolah" data-order="188"></i>הנותן יין לתבשיל חם <i data-commentator="Beur HaGra" data-order="167"></i>או שנתן שמן לקדרה באלפס כשהן מרותחין נקבעו למעשר:
**** ENGLISH ****
One who puts wine into a hot dish, or puts oil into a pot in a cauldron when they are boiling—they are fixed for ma'aser:
**** END BLOCK ****
```

### 25. `siman_331/mechaber/part-002.txt` — mechaber — seif 105 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=105#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 105
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="168"></i><i data-commentator="Be'er HaGolah" data-order="189"></i>מזג יין במים חמים נקבע <i data-commentator="Beur HaGra" data-order="169"></i>וא"צ לומר אם בישל היין ואפי' בגת אסור לשתות ממנו עד שיעשר:
**** ENGLISH ****
One who mixes wine in hot water—it is fixed; and needless to say if he cooked the wine; and even in the winepress it is forbidden to drink from it until he tithes:
**** END BLOCK ****
```

### 26. `siman_331/mechaber/part-002.txt` — mechaber — seif 106 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=106#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 106
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="170"></i><i data-commentator="Be'er HaGolah" data-order="190"></i>הסוחט אשכול לתוך הכוס נקבע <i data-commentator="Be'er HaGolah" data-order="191"></i>לתוך התמחוי אינו נקבע:
**** ENGLISH ****
One who squeezes a cluster into a cup—it is fixed; into a bowl—it is not fixed:
**** END BLOCK ****
```

### 27. `siman_331/mechaber/part-002.txt` — mechaber — seif 107 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=107#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 107
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="192"></i>המולח פירות בשדה נקבעו <i data-commentator="Be'er HaGolah" data-order="193"></i>טבל הזיתים אחת אחת במלח ואכל פטור:
**** ENGLISH ****
One who salts fruits in the field—they are fixed. Tevel olives—one by one in salt and he eats—he is exempt:
**** END BLOCK ****
```

### 28. `siman_331/mechaber/part-002.txt` — mechaber — seif 108 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=108#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 108
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="194"></i>הפוצע זיתים כדי שיצא השרף מהם פטור:
**** ENGLISH ****
One who splits olives so that the oil comes out of them—is exempt:
**** END BLOCK ****
```

### 29. `siman_331/mechaber/part-002.txt` — mechaber — seif 109 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=109#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 109
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="195"></i>הנוטל זיתים מהמעטן טובל אחת אחת במלח ואוכל ואם מלח ונתן לפניו חייב וכן כל כיוצא בזה:
**** ENGLISH ****
One who takes olives from the press—he dips one by one in salt and eats; and if he salted and placed before him, he is obligated. And likewise everything similar:
**** END BLOCK ****
```

### 30. `siman_331/mechaber/part-002.txt` — mechaber — seif 110 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=110#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 110
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="171"></i><i data-commentator="Be'er HaGolah" data-order="196"></i>התורם פירותיו תרומה <i data-commentator="Be'er HaGolah" data-label="(°)" data-order="196"></i>שצריך לתרום אחריה שניה נקבע למעשר ולא יאכל מהם עראי עד שיוציא התרומה שניה ויעשר:
**** ENGLISH ****
One who separates terumah from his fruits—terumah that requires separating a second terumah after it—is fixed for ma'aser, and he may not eat from them casually until he takes out the second terumah and tithes:
**** END BLOCK ****
```

### 31. `siman_331/mechaber/part-002.txt` — mechaber — seif 111 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=111#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 111
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="172"></i><i data-commentator="Be'er HaGolah" data-order="197"></i>פירות שנגמרה מלאכתן וחשכה עליהם ליל שבת <i data-commentator="Siftei Kohen" data-order="127"></i>נקבעו ולא יאכל מהם אפי' לאחר השבת עד שיעשר:
**** ENGLISH ****
Fruits whose work was completed and night of Shabbat fell upon them—they are fixed, and he may not eat from them even after Shabbat until he tithes:
**** END BLOCK ****
```

### 32. `siman_331/mechaber/part-002.txt` — mechaber — seif 112 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=112#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 112
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="173"></i><i data-commentator="Be'er HaGolah" data-order="198"></i>תינוקות שטמנו תאנים לשבת ושכחו לעשרן <i data-commentator="Siftei Kohen" data-order="128"></i>לא יאכלו למוצאי שבת עד שיעשרו:
**** ENGLISH ****
Children who buried figs for Shabbat and forgot to tithe them—they may not eat after Shabbat until they tithe:
**** END BLOCK ****
```

### 33. `siman_331/mechaber/part-002.txt` — mechaber — seif 113 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=113#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 113
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="174"></i><i data-commentator="Be'er HaGolah" data-order="199"></i>תאנה שהיתה מיוחדת לו לאכול פירותיה בשבת וליקט ממנה כלכלה <i data-commentator="Siftei Kohen" data-order="129"></i>לא יאכל עד שיעשר הואיל ופירות אלו מיוחדים לשבת והשבת קובעת:
**** ENGLISH ****
A fig tree that was designated for him to eat its fruits on Shabbat and he gathered a basket from it—he may not eat until he tithes, since these fruits are designated for Shabbat and Shabbat fixes:
**** END BLOCK ****
```

### 34. `siman_331/mechaber/part-002.txt` — mechaber — seif 114 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=114#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 114
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="175"></i><i data-commentator="Be'er HaGolah" data-order="200"></i>היה אוכל באשכול וחשכה עליו לילי שבת לא יגמור אכילתו בשבת עד שיעשר <i data-commentator="Be'er HaGolah" data-order="201"></i>ואם הניחן לאחר השבת <i data-commentator="Siftei Kohen" data-order="130"></i>הרי זה <i data-commentator="Ba'er Hetev" data-order="62"></i>גומרו:
**** ENGLISH ****
He was eating from a cluster and night of Shabbat fell upon him—he may not complete his eating on Shabbat until he tithes. And if he left them after Shabbat—behold he completes them:
**** END BLOCK ****
```

### 35. `siman_331/mechaber/part-002.txt` — mechaber — seif 115 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=115#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 115
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-label="(°)" data-order="201"></i>כל שאסור לזרים לאכול בתרומה כגון הגרעינין וכיוצא בהן כך אסור לאכלו מהטבל והמעשר שלא ניטלה תרומתו ומעשר שני והקדש שלא נפדו וכל שמותר לזרים לאכלו בתרומה מדברים אלו כך מותר בטבל ומעשר שלא ניטלה תרומתו ומעשר שני והקדש שלא נפדו:
**** ENGLISH ****
Everything forbidden to zarim to eat in terumah—such as pits and the like—so too it is forbidden to eat it from tevel and ma'aser from which terumah was not taken, and ma'aser sheni, and hekdesh that was not redeemed. And everything permitted to zarim to eat of these things in terumah—so too it is permitted in tevel and ma'aser from which terumah was not taken, and ma'aser sheni, and hekdesh that was not redeemed:
**** END BLOCK ****
```

### 36. `siman_331/mechaber/part-002.txt` — mechaber — seif 116 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=116#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 116
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="202"></i>אין <i data-commentator="Ba'er Hetev" data-order="63"></i>מדליקין <i data-commentator="Siftei Kohen" data-order="131"></i>בטבל טמא <i data-commentator="Be'er HaGolah" data-order="203"></i>אין מחפין בטבל ואין זורעין את הטבל <i data-commentator="Beur HaGra" data-order="176"></i><i data-commentator="Be'er HaGolah" data-order="204"></i>ואפי' פירות שלא נגמרה מלאכתן אסור לזרוע מהם עד שיעשר <i data-commentator="Siftei Kohen" data-order="132"></i>בד"א בתבואה וקטניות וכיוצא בהן <i data-commentator="Be'er HaGolah" data-order="205"></i>אבל העוקר שתלים שיש בהם פירות ממקום למקום בתוך שדהו הרי זה מותר ואינו כזורע טבל שהרי לא אסף הפירות <i data-commentator="Be'er HaGolah" data-order="206"></i>וכן העוקר לפת וצנונות ושתלם במקום אחר <i data-commentator="Siftei Kohen" data-order="133"></i><i data-commentator="Beur HaGra" data-order="177"></i>אם נתכוון להוסיף בגופם <i data-commentator="Ba'er Hetev" data-order="64"></i>מותר ואם שתלם כדי שיקשו ויקח הזרע שלהם <i data-commentator="Siftei Kohen" data-order="134"></i>אסור מפני שהוא <i data-commentator="Ba'er Hetev" data-order="65"></i>כזורע חטים או שעורים של טבל:
**** ENGLISH ****
One does not kindle with tevel that is tamei; one does not cover with tevel; one does not sow tevel. And even fruits whose work was not completed—it is forbidden to sow from them until he tithes. In what case? In grain and legumes and the like; but one who uproots saplings that have fruits from place to place within his field—behold this is permitted and it is not like sowing tevel, for behold he did not gather the fruits. And likewise one who uproots turnips and radishes and plants them elsewhere—if he intended to add to their body, it is permitted; and if he planted them so they harden and he takes their seed, it is forbidden, because it is like sowing wheat or barley of tevel:
**** END BLOCK ****
```

### 37. `siman_331/mechaber/part-002.txt` — mechaber — seif 117 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=117#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 117
marker: main
**** HEBREW ****
<i data-commentator="Siftei Kohen" data-order="135"></i><i data-commentator="Be'er HaGolah" data-order="207"></i>אין מוכרין טבל אלא לצורך <i data-commentator="Beur HaGra" data-order="178"></i><i data-commentator="Ba'er Hetev" data-order="66"></i><i data-commentator="Be'er HaGolah" data-order="208"></i>ולחבר <i data-commentator="Beur HaGra" data-order="179"></i>ואסור <i data-commentator="Be'er HaGolah" data-order="209"></i>לשלוח טבל <i data-commentator="Be'er HaGolah" data-order="210"></i>ואפי' חבר לחבר שמא יסמכו זה על זה ויאכל טבל:
**** ENGLISH ****
One does not sell tevel except for need, and to a chaver; and it is forbidden to send tevel, and even chaver to chaver, lest they rely on each other and eat tevel:
**** END BLOCK ****
```

### 38. `siman_331/mechaber/part-002.txt` — mechaber — seif 118 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=118#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 118
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="211"></i>המוכר פירות לחבירו מוכר אומר על מנת שהם טבל מכרתי ולוקח אומר לא לקחתי ממך אלא מעושרות <i data-commentator="Siftei Kohen" data-order="136"></i>כופין את <i data-commentator="Ba'er Hetev" data-order="67"></i>המוכר לתקן קנס הוא לו מפני שמכר טבל:
**** ENGLISH ****
One who sells fruits to his fellow—the seller says, "On condition that they are tevel I sold them," and the buyer says, "I did not buy from you except tithed"—they compel the seller to fix them; it is a fine for him because he sold tevel:
**** END BLOCK ****
```

### 39. `siman_331/mechaber/part-002.txt` — mechaber — seif 119 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=119#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 119
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="180"></i><i data-commentator="Be'er HaGolah" data-order="212"></i>אין פורעין חוב מהטבל מפני שהוא כמוכרו:
**** ENGLISH ****
One does not pay a debt from tevel, because it is like his sale:
**** END BLOCK ****
```

### 40. `siman_331/mechaber/part-002.txt` — mechaber — seif 120 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=120#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 120
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="213"></i>הלוקח טבל משני מקומות מעשר <i data-commentator="Siftei Kohen" data-order="137"></i>מזה על זה:
**** ENGLISH ****
One who buys tevel from two places—he tithes from this for that:
**** END BLOCK ****
```

### 41. `siman_331/mechaber/part-002.txt` — mechaber — seif 121 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=121#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 121
marker: main
**** HEBREW ****
<i data-commentator="Siftei Kohen" data-order="138"></i><i data-commentator="Be'er HaGolah" data-order="214"></i>החוכר שדה מהעובד כוכבים מעשר ונותן לו <i data-commentator="Beur HaGra" data-order="181"></i><i data-commentator="Be'er HaGolah" data-order="215"></i>המקבל שדה אבותיו מהעובד כוכבים מעשר ונותן לו:
**** ENGLISH ****
One who leases a field from a non-Jew—he tithes and gives to him. One who receives his ancestral field from a non-Jew—he tithes and gives to him:
**** END BLOCK ****
```

### 42. `siman_331/mechaber/part-002.txt` — mechaber — seif 122 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=122#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 122
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="182"></i><i data-commentator="Be'er HaGolah" data-order="216"></i>כהן או לוי שלקחו פירות מישראל אחר שנגמרה מלאכתן <i data-commentator="Siftei Kohen" data-order="139"></i><i data-commentator="Ba'er Hetev" data-order="68"></i>מוציאין התרומה והמעשרות מידיהם ונותנים אותם לכהנים וללוים אחרים:
**** ENGLISH ****
A kohen or Levi who bought fruits from an Israelite after their work was completed—they take out terumah and ma'asrot from their hands and give them to other kohanim and Levites:
**** END BLOCK ****
```

### 43. `siman_331/mechaber/part-002.txt` — mechaber — seif 123 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=123#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 123
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="217"></i>כהן או לוי שמכרו פירות תלושים קודם שתגמר מלאכתן ואין צריך לומר אם מכר במחובר <i data-commentator="Siftei Kohen" data-order="140"></i>הרי התרומה והמעשר <i data-commentator="Ba'er Hetev" data-order="69"></i>שלהם:
**** ENGLISH ****
A kohen or Levi who sold detached fruits before their work was completed—and needless to say if he sold while attached—behold the terumah and ma'aser are theirs:
**** END BLOCK ****
```

### 44. `siman_331/mechaber/part-002.txt` — mechaber — seif 124 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=124#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 124
marker: main
**** HEBREW ****
<i data-commentator="Siftei Kohen" data-order="141"></i><i data-commentator="Be'er HaGolah" data-order="218"></i>הנותן שדהו <i data-commentator="Ba'er Hetev" data-order="70"></i>בקבלה לעובד כוכבים או למי שאינו נאמן על המעשרות אע"פ שלא באו לעונת המעשרות <i data-commentator="Siftei Kohen" data-order="142"></i>צריך <i data-commentator="Ba'er Hetev" data-order="71"></i>לעשר על ידם נתנה לעם הארץ עד שלא באו לעונת המעשרות אינו צריך לעשר על ידם ומשבאו לעונת המעשרות צריך לעשר על ידם כיצד הוא עושה עומד על הגורן ונוטל ואינו חושש למה שאכלו שאין אנו אחראים להם:
**** ENGLISH ****
One who gives his field in tenancy to a non-Jew or to one who is not trusted regarding ma'asrot—even though they did not reach the season of ma'asrot, he must tithe on their account. He gave it to an am ha'aretz before they reached the season of ma'asrot—he need not tithe on their account; and once they reach the season of ma'asrot, he must tithe on their account. How does he do it? He stands on the threshing floor and takes, and he is not concerned for what they ate, for we are not responsible for them:
**** END BLOCK ****
```

### 45. `siman_331/mechaber/part-002.txt` — mechaber — seif 125 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_331/mechaber/part-002.txt#slug=mechaber#seif=125#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 125
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="183"></i><i data-commentator="Be'er HaGolah" data-label="(°)" data-order="218"></i>באחד בתשרי <i data-commentator="Be'er HaGolah" data-order="219"></i>הוא ראש השנה למעשר <i data-commentator="Beur HaGra" data-order="184"></i>תבואה וקטניות וירקות <i data-commentator="Be'er HaGolah" data-order="220"></i>ובט"ו בשבט הוא ראש השנה למעשר האילנות <i data-commentator="Beur HaGra" data-order="185"></i>כיצד תבואה וקטניות שהגיעו לעונת המעשרות לפני ראש השנה של שלישית אע"פ שנגמרו ונאספו בשלישית מפרישין מהן מעשר שני <i data-commentator="Beur HaGra" data-order="186"></i>וכן פירות האילן שבאו לעונת המעשרות קודם ט"ו בשבט של שלישית אע"פ שנגמרו ונאספו אח"כ בסוף שנה שלישית מתעשרין לשעבר ומפרישין מהם מעשר שני וכן אם באו לעונת המעשרות קודם ט"ו בשבט של רביעית אע"פ שנגמרו ונאספו ברביעית מפרישין מהם מעשר עני ואם באו לעונת המעשרות אחר ט"ו בשבט מתעשרין להבא:
**** ENGLISH ****
On the 1st of Tishrei is Rosh Hashanah for ma'aser of grain, legumes, and vegetables; and on the 15th of Shevat is Rosh Hashanah for ma'aser of trees. How so? Grain and legumes that reached the season of ma'asrot before Rosh Hashanah of the third year—even though they were completed and gathered in the third year, one separates from them ma'aser sheni. And likewise fruits of the tree that reached the season of ma'asrot before the 15th of Shevat of the third year—even though they were completed and gathered afterward at the end of the third year, they are tithed retroactively and one separates from them ma'aser sheni. And likewise if they reached the season of ma'asrot before the 15th of Shevat of the fourth year—even though they were completed and gathered in the fourth year, one separates from them ma'aser ani. And if they reached the season of ma'asrot after the 15th of Shevat, they are tithed prospectively:
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

siman_331/mechaber/part-001.txt#slug=mechaber#seif=45#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=46#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=47#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=48#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=49#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=5#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=50#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=51#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=52#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=53#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=54#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=55#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=56#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=57#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=58#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=6#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=7#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=8#marker=main
siman_331/mechaber/part-001.txt#slug=mechaber#seif=9#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=100#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=101#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=102#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=103#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=104#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=105#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=106#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=107#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=108#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=109#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=110#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=111#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=112#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=113#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=114#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=115#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=116#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=117#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=118#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=119#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=120#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=121#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=122#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=123#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=124#marker=main
siman_331/mechaber/part-002.txt#slug=mechaber#seif=125#marker=main