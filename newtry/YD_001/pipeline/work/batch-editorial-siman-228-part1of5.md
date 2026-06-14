# Editorial retranslation — Siman 228 (part 1/5)

Generated: 2026-06-12T13:16:35.851Z

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

### 1. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: א
**** HEBREW ****
<b>וסבירי. </b> כתב הלבוש וסברי קצת כדי שידעו מה שיתירו כו' משמע שא"צ שיהיו סברי היטב אלא כל שסברי קצת כדי שידעו מה שיתירו סגי וכן נוהגין ש"ך:
**** ENGLISH ****
and reasonable. The book of clothing and fragments a bit so that they knew what they would be like, means that “there would be good faiths, but all that was a bit sober that they knew what they were going to be sarcastic and that they were doing.”
**** END BLOCK ****
```

### 2. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ב
**** HEBREW ****
<b>פתח. </b> אע"ג דלא בעינן פתח לכל הנדרים מ"מ אינם ראוים להתיר אפי' ע"י חרטה אם לא שיכולין להתיר ג"כ ע"י פתח דשמא יבא לפניהם נדר שצריך פתח ולא ידעו להבדיל בין נדר לנדר פרישה:
**** ENGLISH ****
Opening. A. D. D.C. has opened up all the vows from the M.N. are not seen to be allowed by an apostate if it is not possible to permit such negotiations by opening up a door to them, and they do not know how to distinguish between vows and apostles:
**** END BLOCK ****
```

### 3. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ג
**** HEBREW ****
<b>ביחיד. </b> אפי' ב' חכמים גדולים אין התרתם התרה ואפילו בדיעבד וצריך לחזור ולהתיר בג' כ"כ הב"ח ופשוט הוא ש"ך:
**** ENGLISH ****
individually. Effith B of great wise men have not been given a warning, and even in retrospect, and should be returned to G-d as the Bible and is simply:
**** END BLOCK ****
```

### 4. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 10 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 10
marker: _
**** HEBREW ****
<b>המקום. </b> כתב הט"ז דהב"י הקשה מ"ש מרישא שעובר על לא תקום וכו' וי"ל דיש חילוק בין עבירות שאדם מורגל בהן כגון שלא להשאיל כליו שכמעט רוב העולם נכשל בהם ע"כ אינו בוש לומר האמת אבל בעבירה שאינה מצויה כ"כ אפשר שהוא בוש לומר שאפ"ה היה נודר וכתב עוד ודוקא אם אחרים פותחין לו חיישינן שהוא בוש להשיב האמת אשר בלבבו אבל אם בא אדם א' ואמר מעצמו אני מבקש שתתירו נדרי מפני שנתברר לי עכשיו שיש עבירה בנודר נדר הוי פתח טוב ומועיל דהא אין שייך שהוא חצוף לומר וכו' דמגו דאי בעי הוי שתיק לגמרי:
**** ENGLISH ****
Place. The book of the High School of Revelation, which is circumcised by Hashem’s Word, and so on, Hashem’s promise is that He is not in charge of them, such as not to borrow his brides, that almost the majority of the world has failed to say the truth, but that he does not say that he is willing to say that Aph would have been arranged and written even if others were developed to him
Good and useful, Dea does not belong to him, and so on, he is completely silent:
**** END BLOCK ****
```

### 5. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 11 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=11#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 11
marker: _
**** HEBREW ****
<b>הדירן. </b> הטעם בש"ס שהרי החציף פניו להדירן וא"כ גם עתה בשעת חרטה יאמר האמת והב"ח חילק בדינים אלו דמצות לא תקום ולא תטור וכן כבוד אב כתוב בפי' בתורה וכיון דכבר חצוף לעבור על ד"ת יחציף גם עכשיו ולא יבוש משא"כ בפתח שעושה עבירה בנדר אינו גלוי לכל והט"ז כתב שדבריו תמוהים דאם ידע כבר האיסור מה פתח שייך בזה להתיר לו מכח אלו ידעת וכו' עכ"ל:
**** ENGLISH ****
They declared them. The reason in the Gemara is that he was brazen to declare them nedarim, and therefore also now at the time of regret he will speak the truth. And the Bach distinguished in these laws of "you shall not take revenge" and likewise honor of father written explicitly in the Torah — since he was already brazen to transgress words of Torah he will be brazen now too and not be ashamed; unlike at opening when doing a transgression through a vow it is not revealed to all. And the Taz wrote his words are astounding, for if he already knew the prohibition what relevance is opening to permit him through "if you had known" etc. — end of his words.
**** END BLOCK ****
```

### 6. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 12 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=12#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 12
marker: א
**** HEBREW ****
<b>ת"ח. </b> ואם הלך אותו פלוני ללמוד לא הוי נולד דדרך הוא בהולך ללמוד שנעשה אדם גדול סמ"ג בשם התוס' והט"ז כ' בשם סמ"ג הא דאין פותחין בנולד פותחין הוא דאין פותחין אבל פותחים בחרטה מחמת נולד ומש"ה התיר ר"ע לחמיו דשם היה חרטה גמורה מחמת הנולד שנעשה ר"ע ת"ח ובפירוש אמר כן שמתחרט על הנדר דמעיקרא מחמת כן שלא אסרו בנולד אלא אם אחרים פותחין לו בזה כדי שיתחרט והוא אינו אומר שמתחרט מעיקרא רק שאומר ע"ד זה לא נדרתי דבזה אמרינן שאין מתחרט אלא מן הנולד ואילך ולא מעיקרא וה"ה אם אחר אמירה של אחרים אומר הוא בפירוש שמתחרט מעצמו שעשה נדר מתחלה מועיל עכ"ל:
**** ENGLISH ****
A Torah scholar. And if so-and-so went to learn — this is not nolad, for it is common when one goes to learn that he becomes a great man. Semag in the name of Tosafos; and the Taz wrote in the name of Semag that we do not open with nolad — we do not open [with nolad alone], but we open with regret on account of nolad; therefore R' Akiva permitted his father-in-law, for there was complete regret on account of the nolad that R' Akiva became a Torah scholar. And explicitly he said he regrets the vow that originally on account of this they did not forbid him with nolad unless others open for him with this so he will regret — and he does not say he regrets from the outset, only that he says "on this intent I did not vow" — in this we say there is no regret except from the nolad onward and not from the outset. And similarly if after others' statement he himself explicitly says he regrets on his own that he made a vow initially — it is effective — end of his words.
**** END BLOCK ****
```

### 7. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 12 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=12#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 12
marker: ב
**** HEBREW ****
<b>שכיחא. </b> אפילו היה חולה ביותר הוי נולד משום דרוב חולים לחיים ב"י בשם תשובת הרמב"ן ונראה דאם היה גוסס לא חשיב נולד דרוב גוססים למיתה כדלקמן סי' של"ט עכ"ל הש"ך:
**** ENGLISH ****
Common. Even if he was very ill it is nolad, because most sick people live — Beit Yosef in the name of responsum of Ramban. And it appears if he was goses it is not considered nolad, for most gosesim go to death, as below siman 339 — end of words of Shach.
**** END BLOCK ****
```

### 8. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 13 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=13#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 13
marker: _
**** HEBREW ****
<b>חרטה. </b> ומה"ט נהגינן עכשיו לפתוח אפילו בנולד ולפ"ז צ"ל אלו ידעת שתתחרט וכו' ש"ך:
**** ENGLISH ****
Regret. And why do we practice now to open even with nolad — therefore it must be said "if you had known you would regret" etc. — Shach.
**** END BLOCK ****
```

### 9. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 14 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=14#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 14
marker: _
**** HEBREW ****
<b>והסיבה. </b> כתב הש"ך ומהתימה שלא ראיתי נוהגין כן אפי' מרבנן דייקי וכו' פרישה ונראה דמאי דאמרינן צריך לפרט הנדר חובת הנודר הוא ולא שהחכם צריך לשאול ע"ז ומי שאינו מפרט הסבה היינו משום שנדר בסתם ומי שנדר מחמת סבה ואינו מפרש באמת עון הוא בידו ואין מביאין ראיה מן השוטים עכ"ל:
**** ENGLISH ****
And the cause. Shach wrote: and it is astounding that I have not seen practiced thus even among rabbis who are precise etc. — the explanation is that what we say one must specify the vow is the obligation of the one who vows and not that the sage must ask about this. And one who does not specify the cause — this is because he vowed in general. And one who vowed on account of a cause and does not explain in truth — the sin is in his hand and we do not bring proof from fools — end of his words.
**** END BLOCK ****
```

### 10. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 15 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=15#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 15
marker: א
**** HEBREW ****
<b>שחוק. </b> כתב הש"ך נראה דנדר של קוביא וכה"ג אין לו התרה אפילו בדיעבד וכ"נ בתשו' ר"א מזרחי:
**** ENGLISH ****
Gambling. Shach wrote: it appears a vow of dice and the like has no release even b'dieved, and so too in responsum of R' Eliyahu Mizrachi.
**** END BLOCK ****
```

### 11. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 15 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=15#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 15
marker: ב
**** HEBREW ****
<b>מתירין. </b> כ' הש"ך צ"ל שהרב אזיל לשיטתו שכ' בתשובה שאין חולק בדבר זה אבל בתשובת רא"מ כ' דבמלתא דאיסורא אפילו אינו רק מדרבנן כגון שחוק בקוביא וכה"ג אין מתירין לו ואע"ג דאיהו צווח ואומר לא יכילנא למיקם אשבועתי לא משגחינן ביה וכתב בדרישה דכל זה דוקא במשחק בקוביא שאין לו אומנות אחרות והוא פסול לעדות מחמת כן אבל אדם שאין אומנתו בכך ולפעמים הוא שוחק יכולים להתיר וכ"כ הב"ח:
**** ENGLISH ****
They permit. Shach wrote: it must be that the rabbi goes according to his view that he wrote in responsum that there is no disagreement in this matter; but in responsum of Ra"M he wrote that in a matter of prohibition even if only d'rabbanan such as gambling with dice and the like — they do not permit him, and even though he cries and says he cannot stand by his oath — we pay no attention to him. And he wrote in Derishah that all this is specifically one whose craft is only dice-playing and has no other occupation and is disqualified for testimony on this account; but one whose occupation is not in this and sometimes plays — they can permit. And so too wrote the Bach.
**** END BLOCK ****
```

### 12. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 16 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 16
marker: _
**** HEBREW ****
<b>שליח. </b> כתב הט"ז דאפילו בכתב אסור דאל"כ בבת יפתח היה לו ליפתח ג"כ לשלוח כתב לפנחס. וע"י תורגמן פי' כשהבעלים עומדים שם ג"כ:
**** ENGLISH ****
Agent. Taz wrote: even through writing it is forbidden, for if not so with the daughter of Yiftach he could have sent a letter to Pinchas. And through an interpreter — meaning when the principals stand there too.
**** END BLOCK ****
```

### 13. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 17 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=17#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 17
marker: _
**** HEBREW ****
<b>נשאל. </b> ואפילו בדיעבד אינו מותר וכתב הר"ן מי שנדר ביום ו' בבקר שלא יהא בשבת הסמוך בעיר זו ובעוד יום סמוך לשקיעת החמה נתחרט דיכול להתיר קודם השבת דמכלל שבועתו הוא מחויב שיצא מהעיר קודם שבת ולפיכך ע"ש עם חשכה חל הנדר מיקרי וע"ל סימן של"ד סל"א:
**** ENGLISH ****
He was asked. And even b'dieved it is not permitted. Ran wrote: one who vowed on the sixth day in the morning not to be on the approaching Shabbat in this city, and while the day is near sunset he regretted — they can permit before Shabbat, for implied in his oath is that he is obligated to leave the city before Shabbat; therefore with nightfall the vow takes effect, and see below siman 234 seif 31.
**** END BLOCK ****
```

### 14. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 18 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=18#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 18
marker: _
**** HEBREW ****
<b>הפסח. </b> כתב הט"ז דטפי עדיף להתיר סמוך לעצרת ממש ובעצרת גופיה פעם הב' והש"ך כתב ערב עצרת ואחר עצרת:
**** ENGLISH ****
Passover. Taz wrote it is better to permit close to Shavuot literally, and on Shavuot itself a second time; and Shach wrote eve of Shavuot and after Shavuot.
**** END BLOCK ****
```

### 15. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 19 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 19
marker: _
**** HEBREW ****
<b>מעתה. </b> אבל אינו עובר על השבועה עד שתעבור השנה:
**** ENGLISH ****
From now on. But it does not go through the oath until you go this year:
**** END BLOCK ****
```

### 16. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 2 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 2
marker: _
**** HEBREW ****
<b>רבו. </b> כתב הש"ך אפי' בג' לכתחלה משום כבוד רבו או מי שגדול מהם אבל בדיעבד התרתן התרה:
**** ENGLISH ****
Rover. The Bible wrote in the Bible that it is because of its great honor or those who are greater than them, but in retrospect, it is recommended:
**** END BLOCK ****
```

### 17. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `א`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: א
**** HEBREW ****
<b>חבירו. </b> כ' מהרי"ק דה"ה אם נשבע לפני שלוחו אין מתירין לו אלא מדעת משלחו או מדעת השליח עצמו ששלוחו של אדם כמותו וממה שצריך להודיעו משמע אפי' היכא דליכא משום חשד בושה אסור וכ"מ בהרא"ש שכתב ולטעמו דהירושלמי אף לכתחלה מתירין הנדר שלא בפניו רק שמודיע לו ההיתר וטעמא דש"ס דידן עיקר ואין להתיר אלא בפניו פי' בידיעתו עכ"ל הש"ך והט"ז פי' ע"ד חבירו היינו שחבירו קיים הנדר והוא רוצה להתירו והש"ך פי' בשביל רצון חבירו:
**** ENGLISH ****
Buried. Hashem’s Word is not a blessing to Hashem’s people, but rather a revelation of Hashem’s people, and a blessing that Hashem’s people should be given to him, and that they should not be given to him
Shot:
**** END BLOCK ****
```

### 18. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `ב`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: ב
**** HEBREW ****
<b>ורצונו. </b> כ' הש"ך נראה שגם דעת המחבר כן דבעי' שיודיעו ויסכים ברצונו וכ"כ הט"ז:
**** ENGLISH ****
and his will. It is also known that the author of Hashem’s Word will be revealed to him, and that he will be given to him
**** END BLOCK ****
```

### 19. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: ג
**** HEBREW ****
<b>טובה. </b> ודעת רוב הפוסקים דטובה דוקא בעינן אבל אם הכריחו ונדר לדעתו בין מחמת אהבה בין מחמת יראה יכולים להתיר בלא דעתו וכ' הרשב"ץ דפועל יכול לחזור תוך זמנו אע"פ שקבל בחרם ונידוי לעשות המלאכה כל זמן ההוא יכול לישאל על קבלתו שלא ברצון בעה"ב והב"י כתב עליו שאין דבריו נכונים דהא בעה"ב עושה לו טובה שנותן לו מלאכה שירויח פרנסתו והש"ך מסכים עם הרשב"ץ ודחה דברי הב"י משום דהטובה שעושה לו בעה"ב היינו שיעשה לו את המלאכה ואנן טובה מחמת השבועה דוקא בעינן וכמ"ש הריב"ש מיהו בתשו' ר"מ אלשקר משמע דבכה"ג מקרי טובה וצ"ע עכ"ל:
**** ENGLISH ****
Benefit. The view of most poskim is that benefit specifically is required; but if they coerced him and he vowed with his consent — whether from love or fear — they can release without his consent. Rashbatz wrote a worker can retract within his time even though he accepted cherem and nidui to do the work all that time — he can be asked about his acceptance without the employer's consent. And Beit Yosef wrote on him his words are not correct, for the employer does him good by giving him work that he will earn his livelihood. And Shach agrees with Rashbatz and rejected Beit Yosef's words because the good the employer does him is that he will do the work for him, whereas we require benefit specifically on account of the oath, as Rivash wrote. However in responsum of Maharam Alashkar it implies in such a case it is called benefit — requires study — end of his words.
**** END BLOCK ****
```

### 20. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: ד
**** HEBREW ****
<b>לתועלת. </b> כתב הש"ך לא ידע מאי קאמר אי לאפוקי היכא דאין השבועה תועלת חבירו דיכולים להתיר הא ליתא דכל הפוסקים ס"ל דבהטבה אע"ג שאין השבועה לתועלת חבירו אין להתיר ואפשר דמשום י"א דסיפא נקטיה דדוקא ביש תועלת לחבירו שייך חשדא דאל"כ לא שייך חשדא דיאמר מפני שאין לי בה תועלת לא הודיע לי וכתב הריב"ש דכל שאין חבירו מדירו אע"פ שנשבע לתועלת חבירו לכ"ע א"צ דעת חבירו ובד"מ כ' ע"ז שאין כן דעת הפוסקים ול"נ דכ"ע מודי בזה דהפוסקים לא מיירי אלא בקבל טובה והריב"ש מיירי להדיא באינו מקבל טובה עכ"ל:
**** ENGLISH ****
For benefit. Shach wrote: he did not know what is being said — if to exclude where the oath is not for another's benefit they can release — that is not so, for all poskim hold that with benefit, even though the oath is not for another's benefit, there is no release. And it is possible he mentioned the view of some in the latter section that specifically where there is benefit for another, suspicion applies — for otherwise suspicion does not apply that he will say "because I have no benefit in it he did not inform me." And Rivash wrote: whoever is not forbidden by another — even though he swore for another's benefit — all agree his consent is not needed. And in Darkei Moshe he wrote on this that this is not the poskim's view; and it appears to me all agree on this, for poskim deal only with receiving benefit, and Rivash deals explicitly with one who does not receive benefit — end of his words.
**** END BLOCK ****
```

### 21. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `ה`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: ה
**** HEBREW ****
<b>חבירו. </b> כ' הלבוש כלומר שתלה נדרו ע"ד חבירו וחבירו לא הדירו אע"פ שעשה לו טובה יכולים להתיר בלא דעתו ול"נ דמעצמו היינו בלי הטבה אע"פ שחבירו מדירו ולענין דינא נראה מדברי הד"מ דלעיל דבכה"ג יכולים להתיר בלא דעתו עכ"ל הש"ך:
**** ENGLISH ****
Buried. In other words, Hashem’s promise is that Hashem’s promise is not to be given to His people, and that He will not be given to him, and that He will not be able to do so without His mind, and that He will not be given to His eyes
**** END BLOCK ****
```

### 22. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `ו`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: ו
**** HEBREW ****
<b>שהתיר. </b> משמע דבנדר ע"ד חבירו אף כשחבירו מסכים בהתרתו צריך התרה ש"ך. ומבואר בב"י בשם הריב"ש שאם נשבע א' לרבים ונתגלה עתה שאין להם תועלת רק לאיזה יחידים והוא לא כוון עליהם לא מקרי קבלת טובה:
**** ENGLISH ****
Hurry. This means that Dovander is buried even when his parents agree with his conversion. A.B.B.B.A. is called the Bible that if I swear to many people, it is now revealed that they have no benefit only to those individuals, and it is not intended for them to receive good:
**** END BLOCK ****
```

### 23. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `ז`

- Quality: **warn** — chunk_seam_duplicate, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: ז
**** HEBREW ****
<b>שפרט. </b> פי' שאם נדר לתועלת חבירו צריך לפרוט בשעת התרה כמ"ש בסי"ד שצריך לפרט הסיבה שבשבילה נדר:
**** ENGLISH ****
Except. P. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
**** END BLOCK ****
```

### 24. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `ח`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%97`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: ח
**** HEBREW ****
<b>ליסרו. </b> מיהו אם לא עשה לו טובה אע"ג דאין להתיר לכתחלה מ"מ אם עברו והתירו אין ליסרם כ"כ הב"ח וכ' הב"י מיהו כ"ז לענין דינא אבל היכא דאפשר למיתי לידי חילול השם ויש לאסור שאין דבר חמור ממנו וכדאשכחן בצדקיה שנענש הוא והסנהדרין שהתירו לו אף על פי שהיה מצוה באותה התרה:
**** ENGLISH ****
Lisser. Who if he had not done so much for him is not to allow him to be cursed by Hashem’s Word, and he should not be cursed, and he should be denied that there is nothing more serious than him, and that he should be punished, and that he has been condemned to him
**** END BLOCK ****
```

### 25. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `ט`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%98`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: ט
**** HEBREW ****
<b>דבר. </b> כגון שנדר או נשבע ליתן לו מתנה או לפרוע לזמן פלוני מהרי"ק:
**** ENGLISH ****
Word. Such as vowing to give him a gift or a break for a period of time from the R&amp;D:
**** END BLOCK ****
```

### 26. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `י`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%99`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: י
**** HEBREW ****
<b>לכתחלה. </b> כתב הש"ך <small>(דהיינו טעמא הואיל וחבירו נהנה בנדרו והסכים בו ומשביע)</small> אבל היכא שאין לחבירו שום הנאה במה שנדר זה ואין לו עסק בו בזה אפילו לכתחלה נשאל עליו לכ"ע רק שיודיע שנשאל על שבועתו מפני החשד:
**** ENGLISH ****
Replaced. The Bible says, “We were not afraid of what this vowel and that he had no interest in it, and that he had no pleasure in it, and that he had no business with it even if he had been asked for it to “only let him know that he had been asked about his oath against the suspicion:
**** END BLOCK ****
```

### 27. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `כ`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%9B`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: כ
**** HEBREW ****
<b>לעולם. </b> כל שהנדר הוא לתועלת חבירו אין מתירין לכתחלה בלא דעתו והסכמתו ואם אינו לתועלתו אלא שנדר בפניו צריך להודיעו משום חשדא כ"מ בריב"ש עכ"ל הש"ך: <small>(אם נשבע א' לרבים ונתגלה עתה שאין להם תועלת רק לאיזה יחידים והוא לא כיון עליהם לא מקרי קבלת טובה ט"ו. כתוב בספר מקור ברוך סי' כ' הא דנודר לדעת חבירו אין מתירין לו אלא מדעתו ומרצונו דוקא דבשעת התרה עדיין הוא תועלת חבירו אבל אם בשעת ההתרה אין שום תועלת לחבירו אע"פ כשנשבע היה לתועלת חבירו מתירין שלא מדעתו ע"ש)</small>:
**** ENGLISH ****
Never. All that Hendr is for the benefit of his creditors is not a trace of his opinion and consent, and if not for his benefit, he must be informed by his suspicion that he should not be "experienced" in his opinion: (if I swear to many and now that they have no benefit only to those individuals, and he is not because they do not receive good cases. It is written in the book of blessed S. S. As Dr. David, that he should not be accustomed to him, but his science and his desire for revenge is still useful, but if he has no benefit to his heart
When he swore to him, he would not be able to do so
**** END BLOCK ****
```

### 28. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `ל`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%9C`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: ל
**** HEBREW ****
<b>להתיר. </b> כ' הש"ך משמע אפי' עשה לו טובה יכולים להתיר כך וצ"ע מנ"ל הא שהרי בתשובת הרמב"ן ליתא אלא דליכא משום חשדא כיון שמת והיינו בלא עשה לו טובה אבל אם עשה לו טובה מסתבר שאם מת אין יכולים להתיר לו וכן מוכח וכו' וצ"ע ע"ש:
**** ENGLISH ****
to allow. Hashem’s Word says, “Hashem’s Word is good, and Hashem’s promise is to be done to him, and we will not do him good, but if he has done good for him, it turns out that if he is dead, he can’t allow him, and so forth.”
**** END BLOCK ****
```

### 29. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `מ`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%9E`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: מ
**** HEBREW ****
<b>מצוה. </b> והט"ז חולק ע"ז וכ' שאין להשגיח להקל בהיתר זה ואפשר שגם רמ"א לא נתכוין אלא שיש לעשות דבר זה סניף כשיש היתר בלא"ה אע"פ שיש בו גמגום קצת עכ"ל <small>(ע"ש בש"ך ובכנ"ג ובמהריב"ל ח"א כלל ה')</small>:
**** ENGLISH ****
A.D. And then, he said, “It is not possible that Hashem should not be able to take care of this burden, but that it should be done in such a place when there is no permit for the rest of it.”
**** END BLOCK ****
```

### 30. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `נ`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%A0`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: נ
**** HEBREW ****
<b>ונשבעו. </b> כתב בתשובת מהר"מ מפדואה דוקא נשבעו שניהם אבל אם הא' לא נשבע לא מקרי טובה בריצוי לבד וכ' עוד שנראה לחלק שדוקא במה שמתרצה האיש לקחת אשה מקרי טובה לאשה אבל במה שנתרצית האשה לא מקרי טובה כי אשה בכל דהו ניחא לה דטב למיתב וכו' ודעת מהרי"ק אינו נראה כן וכן עיקר שאין לחלק בזה וכן דעת הרב עכ"ל עש"ך:
**** ENGLISH ****
I swear. He wrote in a quick response from Padua both of them, but if Hashem did not swear to Hashem, it is not a good coincidence that a woman in every deo had a good idea of what the man wanted to take a good chance to a woman, but in what the woman wanted, it was not a good coincidence that a woman in every deo had a good idea for him, and so that he would not seem to be part of it
**** END BLOCK ****
```

### 31. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 20 — marker `ס`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%A1`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 20
marker: ס
**** HEBREW ****
<b>להוציא. </b> כמ"ש בא"ע סימן ע"ז ואפי' למאן דפליג התם היינו באשה הנשואה משא"כ הכא. מהרי"ו:
**** ENGLISH ****
Getting out. As a result of Hashem’s Word, Hashem’s promise to Abraham and Isaac, “I am the Lord.” From the mountain:
**** END BLOCK ****
```

### 32. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 21 — marker `א`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 21
marker: א
**** HEBREW ****
<b>התרה. </b> פי' דצריך התרת חכם וגם דעתם והסכמתם <small>(אבל דעתם לחוד לא מהני כמ"ש סעיף ל"ז)</small> כתב הריב"ש אם נדר ע"ד הקהל אף אם יסכימו הרוב לבטל נדרו אין משגיחין בהם עד שיסכימו כולם ואם הנודר אומר עתה שכוונתו היה על הרוב נאמן בת"ח ונראה אף למ"ש סי' ר"א דהאידנא כ"ע כע"ה דמיא היינו לענין שצריך התרה אבל לא מחמירינן כולי האי לומר דלא סגי בהתרה מיהו נראה דאם פרט ואמר ע"ד פלוני ופלוני ופלוני וכו' ודאי ע"ד שיסכימו כולם קאמר ואפילו אומר שכוונתו היה על הרוב לא משגחינן ביה עכ"ל הש"ך:
**** ENGLISH ****
Beware. Hashem’s Word says, “If you do not believe in Hashem’s mercy, you will be able to do it, and if you do not believe it, you will be able to do it, and you will be able to do it with Hashem’s Word
He said, “And even says that his intention was on the majority of them not to be educated in the Old Testament:
**** END BLOCK ****
```

### 33. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 21 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 21
marker: ב
**** HEBREW ****
<b>להחמיר. </b> מיהו הב"ד שהתירו אין לייסרם על ככה כיון דרוב הגדולים מתירין ודבריהם נראה עיקר ב"ח:
**** ENGLISH ****
worse. Who is the Bible that has not been chastised for this is the case of the great Druze of Matthew and their words, the main thing is:
**** END BLOCK ****
```

### 34. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 21 — marker `ג`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 21
marker: ג
**** HEBREW ****
<b>מצוה. </b> שאז מתירין אפילו בלא דעתם דמסתמא ניחא להו בהתרה ש"ך <small>(ליקח ש"ץ שקולו ערב הוי דבר מצוה הרשד"ם חי"ד סי' קי"ד כדי שלא ישתלשלו קטטות ומריבות דבר מצוה מקרי כה"ג בשם הרבה פוסקים להתיר לקהל שנשבעו שלא יקחו להם מרביץ חורה דבר מצוה מקרי מהריב"ל ח"ג סי' פ"ח להתיר לחכם שנשבע שלא יהא חכם בקהל מצוה איכא הראנ"ח ח"ב סי' כ"ג להתיר מי שנשבע שלא ישמע ד"ת מפי חכם א' דבר מצוה איכא מקור ברוך סי' כ' לישא אשה שלבו חפץ דבר מצוה איכא הר"מ הלוי חי"ד סי' א' ללמוד תורה עם מי שלבו חפץ דבר מצוה מקרי ש"י דף ר"ז. להיות לפני שרים ללמד זכות על ישראל ד"מ מיקרי הרא"ם ח"א סי' ט"ו)</small>:
**** ENGLISH ****
A.D. “And then, when he comes to his mind, he will not be able to see him, and he will not be able to do so with him.”
This is what Hashem’s Word is like, and Hashem’s Word is the same as Hashem’s Word. "To be before the ministers to teach the right to Israel," he said
**** END BLOCK ****
```

### 35. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 21 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 21
marker: ד
**** HEBREW ****
<b>ברבים. </b> ואפילו אין שם מנין ש"ך:
**** ENGLISH ****
Many. There is no name for you:
**** END BLOCK ****
```

### 36. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 21 — marker `ה`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 21
marker: ה
**** HEBREW ****
<b>צרכי. </b> וה"ה לבטל המחלוקת דגדול השלום ואין ללמוד מזה למקום אחר שאין מצוה כ"כ הב"י וכ' עוד בשם הריב"ש דלהסיר מכשול שבועות ונזקין מדרך הרבים אין לך דבר מצוה גדולה מזו וכן מי שנשבע שלא להיות ממונה אם אין במדינה ראוי להיות ממונה אחר יותר ממנו הוי דבר מצוה וכב"י דשלא ליפרד מאשתו אלא יהיה באותו עיר שאשתו שם הוי נמי דבר מצוה:
**** ENGLISH ****
needs. “For the end of the dispute, the greatness of peace, and it must not be learned elsewhere that there is no such thing as the Bible, and that whoever swears not to be appointed if there is no other reason for it, and that you will not have anything greater than it, and that it will not be separated from the city of his wife, unless there is anything else in the country
**** END BLOCK ****
```

### 37. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 21 — marker `ו`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 21
marker: ו
**** HEBREW ****
<b>סתם. </b> ודעת הר"ן ושאר פוסקים שאפי' אמר סתם עד"ר אין לו התרה ונראה להחמיר לכתחלה ש"ך:
**** ENGLISH ****
Just. And he said, “The Lord has no help, and it seems to be worse.”
**** END BLOCK ****
```

### 38. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 21 — marker `ז`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 21
marker: ז
**** HEBREW ****
<b>דמסתמא. </b> וכ' מהרי"ק אם אותן הג' שייכי באותו נדר לכ"ע הוי עד"ר ומכ"ש אם אמר על דעתכם אני נודר ש"ך:
**** ENGLISH ****
Dema. And then, if you have the same name, you will be blessed with Hashem’s Word, and if you say, “I will be blessed.”
**** END BLOCK ****
```

### 39. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 21 — marker `ח`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%97`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 21
marker: ח
**** HEBREW ****
<b>מקרי. </b> וכתב בתשובת המבי"ט שאם נשבעו ע"ד כ"א מהם לא מקרי עד"ר ואין זה מוכרח ש"ך:
**** ENGLISH ****
Casey. And he wrote in the statement that if I swear by Hashem, it is not the case of Hashem’s people, and it does not mean that “the Lord is.”
**** END BLOCK ****
```

### 40. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 21 — marker `ט`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%98`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 21
marker: ט
**** HEBREW ****
<b>הדחק. </b> כ' הש"ך דהיינו אם אמר סתם עד"ר אבל אם פרטם אין להקל כלל אפי' בשעת הדחק וצורך בדבר וכ' הריב"ש דשטר שכתוב בו עד"ר דינו כמו עד"ר המוזכר בש"ס ואינו מוכרח וצ"ל דלכתחלה יש להחמיר שלא להתירו כיון שי"א שאפי' אמר סתם עד"ר אין לו התרה:
**** ENGLISH ****
The pressure. Hashem’s Word says, “If you do not care for Hashem’s Word, and if you do not make it possible for Him to speak to Him, and that Hashem’s Word will not be cursed because He will not allow Him to do so.”
**** END BLOCK ****
```

### 41. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 22 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=22#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 22
marker: א
**** HEBREW ****
<b>מעצמו. </b> פי' בלא קבלת טובה <small>(דאם הדיר לחבירו בשביל טובה שעשה לו אפי' ע"ד יחיד אין יוכל להתיר בלא דעתו)</small>:
**** ENGLISH ****
by itself. D. B. Without a good receipt (d.g., he has set his heart for a good man who has made him a single epidem can’t be allowed without his opinion):
**** END BLOCK ****
```

### 42. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 22 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=22#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 22
marker: ב
**** HEBREW ****
<b>דינו</b> ואין לו הפרה ויש מקילין בדבר הרשות דלא צוה הקב"ה ע"ז להשביע כן אבל אם נשבע ע"ד המקום לעשות דבר מצוה אין לו התרה:
**** ENGLISH ****
He has no violation and there is no exception to Hashem’s mercy, but if he is sworn to do anything, he has no help
**** END BLOCK ****
```

### 43. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 23 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=23#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 23
marker: _
**** HEBREW ****
<b>ברבים. </b> כלומר שהודר במעמד רבים ומשמע דאפילו בלא ידיעת אותן רבים יתירו לו מיהו נראה דהיינו כשאין להרבים תועלת בנדר ההוא הא לא"ה לא גרעו מיחיד שאסור משום חשד ש"ך:
**** ENGLISH ****
Many. That is to say that the order in many respects and sounds even without knowing that many will be permitted to him who seems to say, when he does not benefit that vow, he does not commit to a single person who is not afraid of suspicion:
**** END BLOCK ****
```

### 44. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 24 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=24#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 24
marker: _
**** HEBREW ****
<b>מפר. </b> וכ' הרא"ש דאפשר שאפי' אם יבטל הבעל דעתו ויתן לה רשות לידור ע"ד אחרים אינו כלום כיון דסתם אשה ע"ד בעלה נודרת ותלה הכתוב הפרתה בבעל יכול הבעל לחזור ממה שנתן לה רשות וכ' הש"ך אע"פ שכ' הרב בלשון אפשר מ"מ סובר שהדין כך וכ"כ ברמזים בפשיטות וכ"כ הטור בא"ע סי' צ"ו בפשיטות שאפי' נתן לה הבעל רשות וכו' ודלא כהב"ח שכ' דהרא"ש מספקא ליה:
**** ENGLISH ****
Framing. And the Lord’s Prayer is not a man who has been rejected by his wife and his wife, and that the husband may return from what he has given to him, and that he may be given to him
**** END BLOCK ****
```

### 45. `siman_228/baer-heitev/part-001.txt` — baer-heitev — seif 25 — marker `א`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=25#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 25
marker: א
**** HEBREW ****
<b>הוחרם. </b> אותו חרם שהוסיפו על מנהגם ע"ד קהלות הרחוקות דזה הוי עד"ר ש"ך:
**** ENGLISH ****
confiscated. The same boycotts that have been added to the lake by the distant crowds, the petitioner of the Lord:
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

siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%90
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%91
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%92
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=_
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=11#marker=_
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=12#marker=%D7%90
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=12#marker=%D7%91
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=13#marker=_
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=14#marker=_
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=15#marker=%D7%90
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=15#marker=%D7%91
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=16#marker=_
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=17#marker=_
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=18#marker=_
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=19#marker=_
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=_
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%90
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%91
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%92
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%93
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%94
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%95
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%96
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%97
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%98
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%99
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%9B
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%9C
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%9E
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%A0
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=20#marker=%D7%A1
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%90
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%91
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%92
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%93
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%94
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%95
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%96
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%97
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=21#marker=%D7%98
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=22#marker=%D7%90
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=22#marker=%D7%91
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=23#marker=_
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=24#marker=_
siman_228/baer-heitev/part-001.txt#slug=baer-heitev#seif=25#marker=%D7%90