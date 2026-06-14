# Editorial retranslation — Siman 84 (part 3/5)

Generated: 2026-06-12T13:02:17.019Z

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

## Blocks in this batch (45 of 270 remaining in scope)

### 1. `siman_084/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 15 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=15#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 15
marker: _
**** HEBREW ****
<b>טו) שם. אבל אם לא פירשו אלא על דופן הכלי מבפנים מותרים וה"ה לדופן הבור מבפנים מותרים.  </b>פרישה שם. ש"ך סק"ז. כנה"ג בהגה"ט או' ו' פר"ח או' ו' בל"י שם. שפ"ד או' ז' חכ"א כלל ל"ח או' ב' זב"צ או' י"א.
**** ENGLISH ****
(c) there. But if it is not broken, but on the exception of the vessel from within, the “dark of the hole inside is permitted. Retirement there. “Spec. It’s called “Wor” and “Fat” and “No” there. Hashem’s word is “Ps 119:105; 119:130].
**** END BLOCK ****
```

### 2. `siman_084/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 16 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=16#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 16
marker: _
**** HEBREW ****
<b>טז) ודע  </b>דהא דאמרינן דכשפירש לדופני הבור או הכלי דשרי משום דהיינו רביתיה לאו למימרא שמותר ליקח התולעת בידו ולאכלו ואף ששוחה עליו ואוכלו אסור וכן תולעים שבמים שבכלים ושבבורות לחודייהו לא משתרו אף ששוחה לאכלם אלא דוקא כשהם במים. פר"ח שם. לה"פ שם. בל"י שם. פר"ת או' ג'. חכ"א שם או' ג'. זב"צ או' ה'.
**** ENGLISH ****
He said, “And the Lord of hosts, and the Lord’s Prayer, and the Lord’s Prayer, and the Lord’s Prayer, is not in his hand, nor is it that he should be eaten and eaten, and that he shall be eaten, nor shall he be eaten in water. A cow there. The P there. Bella there. A. O.J. is there or J. “The Lord.”.
**** END BLOCK ****
```

### 3. `siman_084/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 17 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=17#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 17
marker: _
**** HEBREW ****
<b>טוב) [סעיף ב'] הגדלים במים שבחריצין וכו' יש אוסרים וכו'  </b>וכ"פ רש"ל פא"ט סי' קכ"ג כדעת האוסרים וכ"מ דעת האו"ה. ש"ך סק"ח. וכן הסכים כנה"ג בהגב"י או' א' כדעת האוסרים. מנ"י על התו"ח כלל נ"ד או' ב' פר"ת או' ד' בל"י או' ד' שפ"ד או' ח' מחב"ר או' ב' וכתב דהגם לפי המסורת שבידינו בדברי מרן דהיכא דמייתי ב' סברות בסגנון זה דעתו כס' האחרונה הכא האחרונים פסקו לחומרא וכן ראוי להחמיר דספקא דאו' לחומרא. וכן החק"ל חי"ד סי' ט"ל האריך בזה ומסיק לאסור יעו"ש. זב"צ או' י"ג.
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 25 MINUTES 36 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 22 MINUTES 17 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 4. `siman_084/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 2 — marker `_`

- Quality: **error** — mt_garbage, html_entity_leak
- Checkpoint id: `siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 2
marker: _
**** HEBREW ****
<b>ב) שם. ושבבורות שיחין ומערות וכו'  </b>בור עגול הוא. שיח ארוכה וצרה. מערה מרובעת ומכוסה בקרוי אלא שיש לה פה. חריצין רחבין ומרובעין כמערה ואינם מקורין אלא כל פיו פתוח. נעיצין קצרין מלמטה ורחבין מלמעלה. רש"י קמא ן' ע"ב והר"ן. ב"ח. ש"ך סק"ב. כנה"ג בהגה"ט או' ב' ועין לקמן סעי' ב'.
**** ENGLISH ****
(b) there. And in the broken pits and caves, and so on is a round hole. A long, narrow dialogue. A square cave and covered in my car, but it has it here. The horns of their territory and the square as an cave and are not original, but all its mouth is open. A short stretch from the bottom and wide from above. “And thou, Capernaum.” B.C. &quot;Socch.&quot; A. B. A. B. A. and a eye for a C-shirt.
**** END BLOCK ****
```

### 5. `siman_084/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 3 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 3
marker: _
**** HEBREW ****
<b>ג) שם. ושבבורות שיחין ומערות וכו'.  </b>וה"ה לבריכות גדולות של מים מכונסים דכיון שאין להם מוצא ובא מותרים. פר"ח או' ב' כריתי או' ב'.
**** ENGLISH ****
(c) there. And in the pits he swims and caves and so on. And the “great pools of water are depleted with a dynamism that they do not find and are allowed. A. B. O'K.
**** END BLOCK ****
```

### 6. `siman_084/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 4 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 4
marker: _
**** HEBREW ****
<b>ד) שם. אעפ"י שאין להם סנפיר וכו' דכתיב את זה תאכלו מכל אשר במים וכו'  </b>בימים ובנחלים הוא דכי אית ליה אכול דלית ליה לא תיכול הא בכלים אע"ג דלית ליה אכול. חולין ס"ו ע"ב. ב"י. לבוש. ט"ז סק"א. חכ"א שם.
**** ENGLISH ****
D) there. I will tell you that you should not eat anything in the water and so on in the days and in the streams, and that you will not eat a bucket of lice. I am sick with S. B. Dressed. T.C. I am there.
**** END BLOCK ****
```

### 7. `siman_084/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 5 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage, literal_bow_swim
- Checkpoint id: `siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 5
marker: _
**** HEBREW ****
<b>ה) שם. לפיכך שוחה ושותה מהם ואינו חושש וכו'  </b>וליכא הכא משום בל תשקצו כיון שאינו בולע בעין אלא בתוך המים שהוא שותה. ב"ח בקו"א. ש"ך סק"ג. לה"פ או' א' חכ"א כלל ל"ח או ג' ודוקא שאין מאוסין עליו אבל אם מאוסין עליו אסור משום בל תשקצו. ט"ז סק"ב. והיינו אף דלכ"ע לא מאיס אי מאיס לדידיה אסור כמ"ש באו' שאח"ז.
**** ENGLISH ****
(b) there. Therefore, swimming and drinking from them is not afraid, etc., and the oppressor is not covered in the eye, but in the water it drinks. In the Bible. “Spec. The U.S.A. is not immune to any of the ISA or D.C., but if they are not immune to it, they are not prohibited from being assigned. T.C. And we were not at the end of the day of the day of the Lord’s Prayer, and we were not allowed to be the Lord’s Prayer.
**** END BLOCK ****
```

### 8. `siman_084/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 6 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 6
marker: _
**** HEBREW ****
<b>ו) וכל  </b>דבר שדרך בני אדם נפשם קצה בהם עובר משום בל תשקצו. כנה"ג בהגה"ט סוף או' ד' פר"ח או' ג' לה"פ שם. בל"י או' א' ואי מאיס לדידיה אף דלכ"ע לא מאיס במכ"ש דאסור לדידיה וקרינן ביה שפיר בל תשקצו. פר"ח שם. לה"פ שם. בל"י שם. ועיין לקמן סי' ק"ד או' ג' וסי' קי"ו סעי' ו'.
**** ENGLISH ****
And everything that the way of human beings is an end in which they go through is not stopped. A lawyer at the Supreme Court at the end of the year, O'D. P.M., or J.L.A. B. O'A. and I'm reluctant to tell her that she is not in prison. A cow there. The P there. Bella there. Look at C. C. O.J. and C. C. and S. C. S. C. and C.
**** END BLOCK ****
```

### 9. `siman_084/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 7 — marker `_`

- Quality: **info** — divine_name_style
- Checkpoint id: `siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 7
marker: _
**** HEBREW ****
<b>ז) ומיהו  </b>כל זה אינו אלא דרבנן דמאי דמסמכינן ליה אקרא דבל תשקצו לאו דקרא מיירי בהכי אלא אסמכתא בעלמא הוי ומאן דעבר עלייהו מכין אותו מכות מרדות כשאר איסורין דרבנן. פר"ח שם. לה"פ שם. מש"ז או' ב'.
**** ENGLISH ****
And all this is not merely a dormant, but rather a cliche to the Lord, I shall call upon him a martyr, but rather an assimilation of the Lord and Man, who has been raised, prepares him for rebellions when he is forbidden. A cow there. The P there. “Ju B.”.
**** END BLOCK ****
```

### 10. `siman_084/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 8 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=8#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 8
marker: _
**** HEBREW ****
<b>ח) וכן  </b>אסור לשתות ממקום שיש חשש סכנה כגון עלוקה וכדומה. הרמב"ם פי"א מה' רוצח. ועיין לקמן רסי' קי"ו.
**** ENGLISH ****
It is forbidden to drink from a place where there is a danger such as alcohol and the like. Hashem’s Word is a murderer. Look at the C.J. C.L.
**** END BLOCK ****
```

### 11. `siman_084/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 9 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=9#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 9
marker: _
**** HEBREW ****
<b>ט) שם הגה. אבל אסור לשאוב בכלי ולשתות מהם.  </b>דילמא פירש בדופני מנא. ב"י בשם הרא"ש. ט"ז סק"ג. ש"ך סק"ד. ומבואר בדברי הרא"ש שם דאם שאב מן הבור אף דלא ידעינן בודאי שפירשו (בדופני מנא) אסורים משום דחיישינן שמא פירשו. ש"ך שם. כנה"ג בהגב"י סוף או' ד' מנ"י על התו"ח כלל נ"ג או' ג' וכתב ודלא כלבוש. פר"ת או' א' בל"י או' ב' שפ"ד או' ד' חכ"א כלל ל"ח או' ג' מק"מ או' ד' זב"צ או' ו'.
**** ENGLISH ****
(c) The name of pronunciation. But it is forbidden to pump and drink from them. Dialma has been interpreted in a fraud. “In the name of the Rashi. TJC. “Spec. In the words of the Lord’s Prayer, there is no doubt that Hashem’s people are not allowed to sin. “Third there. In the afternoon, O'D. Mene was finally named for the report by N.J. and wrote and wrote, without any shame. A. O'A. B. M. O'A. B. O'A. . . . .
**** END BLOCK ****
```

### 12. `siman_084/kereti/part-001.txt` — kereti — seif 1 — marker `א`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: א
**** HEBREW ****
במים וה"ה לכל מיני משקה:
**** ENGLISH ****
in water and the same applies לכל מיני liquid:
**** END BLOCK ****
```

### 13. `siman_084/kereti/part-001.txt` — kereti — seif 1 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ב
**** HEBREW ****
בורות שיחין ומערות וברכות גדולים מכונסין כיון דאין להם מוצא ובא:
**** ENGLISH ****
Arrangements and caves and large barbars from the mountains of the capital of Don't They Find and Comes:
**** END BLOCK ****
```

### 14. `siman_084/kereti/part-001.txt` — kereti — seif 1 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ג
**** HEBREW ****
אבל אסור לשאוב עי' פלתי כי אחרונים פי' לחלק בין שואב מכלי לכלי לשואב מבור לכלי רק הבדל יש בין עירה לשואב ע"ש:
**** ENGLISH ****
But it is forbidden to pump with me that the latter is to divide a vacuum cleaner into a broken resource for only a difference between her city and her father:
**** END BLOCK ****
```

### 15. `siman_084/kereti/part-001.txt` — kereti — seif 11 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=11#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 11
marker: _
**** HEBREW ****
אשה שנמצא ודעת מהרש"ל מבלי לסמוך בבדיקות הללו על נשים והרמ"א כתב דמנהג לסמוך עליהם ובאמת כעת יותר לסמוך על בדיק' נשים מאנשים שהם נמהרים ובעלי עסק אין משגיחי' כ"כ והחוש מעיד. ובאמת לאכל ירקות חי כגון סלא"ט וכדומה והרי כאן ספק תורה כי לא שייך בטול דיכול לבדוק פעמי' ושלש עד שימצא להתולע וא"כ ה"ל ספק תור' וח"ו להקל וקשה לי לומר להאמן לנשים או לאנשים מהירים במלאכתן. אבל במבושלי' יש לסמוך דהא אם בדקוהו עכ"פ מועיל בדיקתם להוציא מידי ודאי דיש שם רחש רק ספק וא"כ ה"ל ס"ס. נשאר לאחר בדיקה או לא נשאר ואת"ל נשאר דלמא נמוח. וגם לאחר בישול א"א להכיר התולע או להתירו ומהתורה בטל רק מדרבנן ברי' לא בטילה וא"כ יש להקל בשל דרבנן. וכך מנהגי מיום עומדי על דעתי מבלי לאכול ירקו' חי מסלאטין וכדומה על סמך בדיקת הנ"ל וכן נכון לכל בעל תורה כי רבת המכשלה:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  07 HOURS 55 MINUTES 46 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  07 HOURS 52 MINUTES 27 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 16. `siman_084/kereti/part-001.txt` — kereti — seif 12 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=12#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 12
marker: _
**** HEBREW ****
להעמיד הדברים היינו שלימים אבל חתוכים לפעמים אינו מעמיד:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  07 HOURS 49 MINUTES 08 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 17. `siman_084/kereti/part-001.txt` — kereti — seif 13 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=13#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 13
marker: _
**** HEBREW ****
ויסננו ואין כאן ביטול איסור כיון דמסננין ומסיר האיסור
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  07 HOURS 45 MINUTES 49 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 18. `siman_084/kereti/part-001.txt` — kereti — seif 14 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=14#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 14
marker: _
**** HEBREW ****
מותר לכתחלה שהקול והנדנוד רחיים מגרש כל תולע ואם יהיה שם תולעים מתים יהיה על הרוב נטחנים וכ"כ אותן שלא נתפרשו מתנועת הרחיים ויש לכתחיל' לטוחנן ברחיי' גדול דמי' משמיע קול גדול ולא רחיים דיד
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  07 HOURS 42 MINUTES 30 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 19. `siman_084/kereti/part-001.txt` — kereti — seif 16 — marker `א`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=16#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 16
marker: א
**** HEBREW ****
אוסרין אותו מפני מראית עיין.
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  07 HOURS 39 MINUTES 11 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 20. `siman_084/kereti/part-001.txt` — kereti — seif 16 — marker `ב`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=16#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 16
marker: ב
**** HEBREW ****
כי יש מתירין הוא הראבי"ה דס"ל דוקא בגדולי קרקע שייך פי' אבל בשר וגבינ' וכיוצא בו לא שיך פירש ופר"ח ערער דטעו בדברי ראבי"ה ולא דק ועי' פלתי דבררתי דברי ראבי"ה והבאתי ראיה מגמ' ולכן כל בעל נפש יחמיר לעצמו אבל אין למחות ביד הנוהגים היתר ויש להם יתד לתלות בו.
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  07 HOURS 35 MINUTES 52 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 21. `siman_084/kereti/part-001.txt` — kereti — seif 2 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 2
marker: _
**** HEBREW ****
ויש מתירין עי' פלתי מ"ש בישוב קושי' פר"ת מן דרשא דכלל ופרט וריבוי מיעוט:
**** ENGLISH ****
And there is a plungry in the midst of the Lord’s Prayer, and a blessing of Hashem’s Word, and a blessing of Hashem’s people
**** END BLOCK ****
```

### 22. `siman_084/kereti/part-001.txt` — kereti — seif 3 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 3
marker: א
**** HEBREW ****
שמא יחזרו פי' תחילה יפרשו ואח"כ יחזרו ואם עשה כן דעת פר"ח לאסור בדיעבר
**** ENGLISH ****
And then they will return, and they will return, and if they do so, they will be prohibited
**** END BLOCK ****
```

### 23. `siman_084/kereti/part-001.txt` — kereti — seif 3 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 3
marker: ב
**** HEBREW ****
וכן מותר לערות מן חומץ לתוך קדרה אבל אם אוכל בקדירה יש ליזהר בחומץ שיש בו תולעים כי אולי יפרשו מאוכל חוץ לאוכל פר"ח:
**** ENGLISH ****
It is also possible to get rid of vines into a cadre, but if food in the apartment is to be careful with a handful of worms that may be spread out of food except for pre-food:
**** END BLOCK ****
```

### 24. `siman_084/kereti/part-001.txt` — kereti — seif 4 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 4
marker: א
**** HEBREW ****
אפי' לא הגיע לארץ עיין פלתי דכתבתי פי' באויר דיצא מן פרי לגמרי וקלטה בפיו מן אויר אבל בפי' חוץ לנקב קצת לאויר והנשאר עדיין בתוך הנקב היינו בית' מותר ע"ש:
**** ENGLISH ****
Epith did not come to the land of the Philaly Bible in the air of a completely fruitful and lighted in his mouth from air, but in the mouth a little bit to the air, and the rest was still in the blink of a house
**** END BLOCK ****
```

### 25. `siman_084/kereti/part-001.txt` — kereti — seif 4 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 4
marker: ב
**** HEBREW ****
ואפילו חורו נקב ודעת אחרונים להתיר וכן כתבתי בפלתי ע"ש: 

אפי' נקב לחוץ והפ"ח תמה למה חשש לפי' מקצתה באויר ועיין פלתי דק"מ:
**** ENGLISH ****
And even his snoring and his last mind was to be allowed, and I wrote in my letter, “Ei” was drawn to the outside and the IDF wondered why she was afraid that she was a little bit in the air and saw a thin wonder:
**** END BLOCK ****
```

### 26. `siman_084/kereti/part-001.txt` — kereti — seif 5 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: א
**** HEBREW ****
בקמח ודעת הפר"ח אם הקמח מונח בכלי ולא ע"ג קרקע ממש מותר אף כי תולע פירש ועי' פלתי דכתבתי ח"ו להקל ואין בכל דברי פר"ת ממש וברור דאסור:
**** ENGLISH ****
In flour and bread, if the flour is placed in the vessel, and not by the ground, it is permitted that it be swallowed up, and it is not clear:
**** END BLOCK ****
```

### 27. `siman_084/kereti/part-001.txt` — kereti — seif 5 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: ב
**** HEBREW ****
שמא יחזור וכו' עיין פלתי דכתבתי לעת הצורך להתיר למוכרו לא"י ע"ש וכ' הט"ז מאן דמכשי' בנקב בפרי ולא חייש דהתולע יפרוש דרך נקב ויחזור ה"ה בקמח לא חיישינן דיפרוש הרחש ויחזור למקומו עי' פלתי דאין דמיונו יפה וכאן יש לאסור. ודעת הט"ז לאסור אם נעשה מהקמח הנ"ל וכדומה יין שרף שמא יבא לאכלן בעינו וכבר השיגו הפר"ח דאין לנו לבדות מלבינו גזירות חדשות ונכון הוא:
**** ENGLISH ****
He said, “I shall return to thee, and I shall see that the Lord of hosts shall not be permitted by thee, nor shall he be destroyed by thee, and that the Lord shall return to the flesh, and shall not be brought back to his place, nor shall he be cursed, nor shall he be cursed. And Hashem’s word is to ban whether we are made of the earth’s bread and the like of wine, which is to be brought to eat in our eyes, and we have already received the bread from our hearts and new ones
**** END BLOCK ****
```

### 28. `siman_084/kereti/part-001.txt` — kereti — seif 6 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 6
marker: א
**** HEBREW ****
והוא שריחש ודעת הפר"ח לאסור אפי' רחוש ועיין פלתי מה שכתבתי בזה באריכות ובהבנת כוונת רש"י דנראה להדיא מדבריו דבעי ריחש מ"מ יש להחמיר ע"ש:
**** ENGLISH ****
And he felt that he was afraid and the opinion of the Bible to ban a sense of what I wrote about it in the pools and understanding the meaning of Rashi’s words, “It seems to him that he is afraid of Hashem’s words:
**** END BLOCK ****
```

### 29. `siman_084/kereti/part-001.txt` — kereti — seif 6 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 6
marker: ב
**** HEBREW ****
כמין נקודה שחורה אע"פ דאין כאן ריחוש מזה הוכיח הש"ך דתולע עצמו אסר רמ"א אע"פ שלא פירש הואיל ולא נתבשל עדיין ואפשר ליטול הנקודה מחמירין אבל אם כבר נתבשל עם נקודה בדיעבד אין לאסור:
**** ENGLISH ****
As a result of a black spot here, the Bible itself has proven to have not yet been poisoned, but if we already cook with a point in retrospect, we should not prohibit:
**** END BLOCK ****
```

### 30. `siman_084/kereti/part-001.txt` — kereti — seif 7 — marker `_`

- Quality: **error** — mt_api_artifact
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 7
marker: _
**** HEBREW ****
פרי שהתליע וכו' אם אין דרך להתליע מ"מ החמירו האחרונים לאסור ועיין פלתי כי לדעת רמ"א דמכשיר לגבינו' הנעשית מבהמ' טריפה דמכשירין קודם ג' ימים דאמרינן השתא הא דאתרע אף בזה אמרינן השתא בתלוש אתרע ומותר מיהו על תולע עצמו יש לפקפק דלית ליה חזקת היתר ע"ש:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 18 MINUTES 58 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 31. `siman_084/kereti/part-001.txt` — kereti — seif 8 — marker `א`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 8
marker: א
**** HEBREW ****
ומ"מ צריך לבדקן היינו חוצה לפירות וכדומה שמא ימצא לחוץ ורוחשים והפירי וכדומה אסורים אם פי' הש"ך והט"ז מיקל בקמח וכדומה דא"צ בדיקה כלל ואין נראה דטבע ריחוש המילוואן לרחוש ממקום למקום וא"כ קרוב לודאי שירחשו עי' פלתי:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 15 MINUTES 39 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 32. `siman_084/kereti/part-001.txt` — kereti — seif 8 — marker `ב`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 8
marker: ב
**** HEBREW ****
לאחר יב"ח דתוך י"ב חודש אין מועיל צונני' וגם אין מועיל מים חמין דהתולע במותו ג"כ אסור כנ"ל פי' מת. וגם לפעמים טבע תולעת מבלי לזוז מהפרי והוא אדוק בו בתכלית האידוק ולא ירחוש בשביל מים צוננים והוא בעצמו אסור אפי לא יצא לחוץ דהוא מחובר אבל לאחר יב"ח אם אין טבע התולע לזוז מפרי פשיטא דמותר דאין כאן פירש ואי טבע לזוז וחיישינן דיפרו' לתבשיל א"כ אף על מי צוננים יפרשו ובשפיכת מי חמין לא סמכינין ביש הרבה תולעים רק אם ע"י מי צונן נתמעטו וא"כ הוי ס"ס ספק לא נשאר לאחר צוננין כלום ואת"ל דנשאר דלמא מת בחמין אבל זה אינו נכנס לספק דלמא לא הי' כלל דודאי יש במינים הללו:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 12 MINUTES 20 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 09 MINUTES 01 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 33. `siman_084/kereti/part-001.txt` — kereti — seif 9 — marker `א`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=9#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 9
marker: א
**** HEBREW ****
אם לאו מותר הש"ך ואחרונים ס"ל בדבר דרחש מצוי אינו נכנס בגדר ספק דלמא לא הי' וא"כ הוי רק חד ספק דלמא נמוח ואסור ומילווין השכיחי' עיין לקמן סי' ק' דיש לצדד התירא:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 05 MINUTES 43 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 34. `siman_084/kereti/part-001.txt` — kereti — seif 9 — marker `ב`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=9#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 9
marker: ב
**** HEBREW ****
ויש מי שאומר ותולעים שהם בפירות שעברו יב"ח א"כ חשש מחמת דלמא פירשו ורחשו דעת הש"ך להקל והנכון אתו.
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  08 HOURS 02 MINUTES 24 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 35. `siman_084/kereti/part-001.txt` — kereti — seif 9 — marker `ג`

- Quality: **error** — mt_api_artifact, marker_label_mismatch
- Checkpoint id: `siman_084/kereti/part-001.txt#slug=kereti#seif=9#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 9
marker: ג
**** HEBREW ****
מאכל דא"א להסר עובדא הי' במוכר שמכר רוזאני לאשה א' והיא עשתה ממנו מאכל ואח"כ מכר לאחרי' ג"כ ובדקוהו מה שביד המוכר ולוקחי' ושכולם הרחיש מילוואן ולא נודע אם גם רוזאני מה שהי' ביד האשה ג"כ מילווחן והתיר הרב ט"ז מס"ס ספק לא הי' ואת"ל היה שמא נימוחו עכ"ל. ובנה"כ ופר"ת השיגו ובאמת אם קרה מקרה כמו בזמנים שחם ביותר וא"כ הרחש מאוד מצוי אסור ואם לא הסכמתי בפלתי עם הט"ז דמותר בלי פקפוק:
**** ENGLISH ****
MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY. NEXT AVAILABLE IN  07 HOURS 59 MINUTES 05 SECONDS VISIT HTTPS://MYMEMORY.TRANSLATED.NET/DOC/USAGELIMITS.PHP TO TRANSLATE MORE
**** END BLOCK ****
```

### 36. `siman_084/mechaber/part-001.txt` — mechaber — seif 1 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_084/mechaber/part-001.txt#slug=mechaber#seif=1#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 1
marker: main
**** HEBREW ****
<b>דין שרצים הנמצאים במים בפירות בקמח ובגבינה. ובו י"ז סעיפים:</b><br> <i data-commentator="Be'er HaGolah" data-order="1"></i>שרצים הגדלים <i data-commentator="Siftei Kohen" data-order="1"></i><i data-commentator="Kereti" data-order="1"></i>במים <i data-commentator="Ba'er Hetev" data-order="1"></i>שבכלים <i data-commentator="Siftei Kohen" data-order="2"></i><i data-commentator="Kereti" data-order="2"></i>ושבבורות שיחין ומערות <i data-commentator="Beur HaGra" data-order="1"></i>שאינם נובעים מותרים <i data-commentator="Turei Zahav" data-order="1"></i>אע"פ שאין להם סנפיר וקשקשת <i data-commentator="Siftei Kohen" data-order="3"></i><i data-commentator="Beur HaGra" data-order="2"></i>לפיכך שוח' ושותה מהם <i data-commentator="Turei Zahav" data-order="2"></i>ואינו חושש לשרצי' שבהם אם יזדמנו לתוך <i data-commentator="Ba'er Hetev" data-order="2"></i>פיו <i data-commentator="Turei Zahav" data-order="3"></i><i data-commentator="Siftei Kohen" data-order="4"></i><i data-commentator="Beur HaGra" data-order="3"></i><i data-commentator="Peleti" data-order="1"></i><i data-commentator="Kereti" data-order="3"></i><small>(אבל אסור <i data-commentator="Siftei Kohen" data-order="5"></i>לשאוב <i data-commentator="Ba'er Hetev" data-order="3"></i>בכלי ולשתות מהם) (אשיר"י פא"ט וארוך כלל מ"ח וכל בו) <i data-commentator="Be'er HaGolah" data-order="2"></i></small>ואם פירשו ממקום רביתן <i data-commentator="Siftei Kohen" data-order="6"></i><i data-commentator="Beur HaGra" data-order="4"></i>כגון <i data-commentator="Ba'er Hetev" data-order="4"></i>לאחורי הבור או על שפת הכלי מבחוץ אע"פ שחזרו אסורים <i data-commentator="Beur HaGra" data-order="5"></i>ומסתמא אין לחוש שמא פירשו <i data-commentator="Beur HaGra" data-order="6"></i>אבל אם לא פירשו <i data-commentator="Siftei Kohen" data-order="7"></i>אלא <i data-commentator="Turei Zahav" data-order="4"></i>על דופן הכלי מבפנים <i data-commentator="Ba'er Hetev" data-order="5"></i>מותרים:
**** ENGLISH ****
The law of sheratzim found in water, in fruit, in flour, and in cheese. In it are 17 seifim: Sheratzim that grow in water in vessels and in cisterns, pits, and caves that are not flowing — are permitted, even though they have no fin and scales; therefore one draws and drinks from them and need not be concerned for the sheratzim in them if they happen into one's mouth (but it is forbidden to draw with a vessel and drink from them) (Issur VeHeter part 9; Arukh general rule 48; Kol Bo). And if they separated from their place of growth, such as behind the cistern or on the lip of the vessel outside — even if they returned, they are forbidden; and presumably one need not be concerned that they separated; but if they did not separate except on the inner wall of the vessel — they are permitted.
**** END BLOCK ****
```

### 37. `siman_084/mechaber/part-001.txt` — mechaber — seif 10 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_084/mechaber/part-001.txt#slug=mechaber#seif=10#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 10
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="36"></i><i data-commentator="Be'er HaGolah" data-order="20"></i>ירקות מבושלים שנמצאו בהם תולעים הרוטב מותר על ידי סינון <small>(פירוש שמעבירין במסננת) <i data-commentator="Siftei Kohen" data-order="34"></i>אבל <i data-commentator="Ba'er Hetev" data-order="26"></i>ירקות עצמם אם מצא בהם ג' פעמים יש לחוש שמא יש ואינם ניכרות:</small>
**** ENGLISH ****
Cooked vegetables in which worms were found — the sauce is permitted by straining (meaning passing through a strainer); but the vegetables themselves — if found three times, one should be concerned there are more not visible.
**** END BLOCK ****
```

### 38. `siman_084/mechaber/part-001.txt` — mechaber — seif 11 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_084/mechaber/part-001.txt#slug=mechaber#seif=11#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 11
marker: main
**** HEBREW ****
<i data-commentator="Siftei Kohen" data-order="35"></i><i data-commentator="Be'er HaGolah" data-order="21"></i><i data-commentator="Kereti" data-order="19"></i>אשה שנמצא אחר בדיקתה שרץ הנראה לעינים כגון חומט <i data-commentator="Siftei Kohen" data-order="36"></i>אסור לאכול מבדיקתה אבל אם לא נמצאו אלא תולעים המתליעים בתוך העלים שאינם נראים אלא לאחר שליקתן מותר לאכול מבדיקתה:
**** ENGLISH ****
A woman after whose inspection a visible sheretz such as an ant was found — forbidden to eat from her inspection; but if only worms swarming inside leaves not visible until after cooking — permitted to eat from her inspection.
**** END BLOCK ****
```

### 39. `siman_084/mechaber/part-001.txt` — mechaber — seif 12 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_084/mechaber/part-001.txt#slug=mechaber#seif=12#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 12
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="37"></i><i data-commentator="Be'er HaGolah" data-order="22"></i>מרקחת <i data-commentator="Pithei Teshuva" data-order="8"></i>שנפלו לתוכו נמלים ועברו עליהם י"ב חדש <i data-commentator="Pithei Teshuva" data-order="9"></i>יש להסתפק בהם מפני <i data-commentator="Beur HaGra" data-order="38"></i>שהדבש <i data-commentator="Siftei Kohen" data-order="37"></i>דרכו <i data-commentator="Ba'er Hetev" data-order="27"></i><i data-commentator="Kereti" data-order="20"></i>להעמיד הדברים הנטמנים בתוכו:
**** ENGLISH ****
A medicinal compound into which ants fell and twelve months passed — there is room to be lenient because honey's nature preserves what is immersed in it.
**** END BLOCK ****
```

### 40. `siman_084/mechaber/part-001.txt` — mechaber — seif 13 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_084/mechaber/part-001.txt#slug=mechaber#seif=13#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 13
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="39"></i><i data-commentator="Be'er HaGolah" data-order="23"></i>דבש שנפלו בו נמלים <i data-commentator="Turei Zahav" data-order="18"></i><i data-commentator="Pithei Teshuva" data-order="10"></i>יחממנו עד שיהא ניתך <i data-commentator="Siftei Kohen" data-order="38"></i><i data-commentator="Ba'er Hetev" data-order="28"></i><i data-commentator="Kereti" data-order="21"></i>ויסננו:
**** ENGLISH ****
Honey into which ants fell — heat until it melts and strain.
**** END BLOCK ****
```

### 41. `siman_084/mechaber/part-001.txt` — mechaber — seif 14 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_084/mechaber/part-001.txt#slug=mechaber#seif=14#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 14
marker: main
**** HEBREW ****
<i data-commentator="Siftei Kohen" data-order="39"></i><i data-commentator="Beur HaGra" data-order="40"></i><i data-commentator="Be'er HaGolah" data-order="24"></i>חטים מתולעים <i data-commentator="Turei Zahav" data-order="19"></i><i data-commentator="Siftei Kohen" data-order="40"></i><i data-commentator="Pithei Teshuva" data-order="11"></i><i data-commentator="Kereti" data-order="22"></i>מותר לטחנן והוא שירקד הקמח לאור היום <i data-commentator="Turei Zahav" data-order="20"></i><small>(וכל תולעת שיראה שם יזרקנו <i data-commentator="Ba'er Hetev" data-order="29"></i>והשאר מותר) (ת"ה סימן קנ"ה):</small>
**** ENGLISH ****
Wormy wheat — permitted to grind provided the flour dances in daylight (and any visible worm is discarded and the rest permitted) (Terumat HaDeshen siman 255).
**** END BLOCK ****
```

### 42. `siman_084/mechaber/part-001.txt` — mechaber — seif 15 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_084/mechaber/part-001.txt#slug=mechaber#seif=15#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 15
marker: main
**** HEBREW ****
<i data-commentator="Siftei Kohen" data-order="41"></i><i data-commentator="Beur HaGra" data-order="41"></i><i data-commentator="Be'er HaGolah" data-order="25"></i>מיני עופות הגדילים באילן ותלוים באילן בחרטומיהן <i data-commentator="Ba'er Hetev" data-order="30"></i>אסורים משום שרץ השורץ על הארץ:
**** ENGLISH ****
Species of birds that grow on a tree and hang by their beaks — forbidden as sheretz haShoretz al haAretz.
**** END BLOCK ****
```

### 43. `siman_084/mechaber/part-001.txt` — mechaber — seif 16 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_084/mechaber/part-001.txt#slug=mechaber#seif=16#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 16
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="26"></i>כל תולעים הנמצאים <i data-commentator="Ba'er Hetev" data-order="31"></i>בבהמה <i data-commentator="Siftei Kohen" data-order="42"></i>בין שהם בין עור לבשר בין שהם במעיה אסורים <i data-commentator="Siftei Kohen" data-order="43"></i><i data-commentator="Be'er HaGolah" data-order="27"></i>והנמצאים <i data-commentator="Beur HaGra" data-order="42"></i>בדגים <i data-commentator="Turei Zahav" data-order="21"></i><i data-commentator="Ba'er Hetev" data-order="32"></i>במעיהם אסורים בין עור לבשר או בתוך הבשר מותרים <i data-commentator="Siftei Kohen" data-order="44"></i><i data-commentator="Beur HaGra" data-order="43"></i>(ואפילו <i data-commentator="Ba'er Hetev" data-order="33"></i>פירשו קצת וחזרו מותרין כי כן רביתייהו לפרוש קצת ולחזור) (הגה' שערי דורא) <i data-commentator="Beur HaGra" data-order="44"></i><i data-commentator="Be'er HaGolah" data-order="28"></i>והא דאסרינן דוקא דמחיים אבל <i data-commentator="Turei Zahav" data-order="22"></i>הגדלים בבשר אחר שחיטה או בדגים וגבינה מותרים כל זמן שלא פירשו הלכך תולעים הנמצאים בקערה שנפלו מן הבשר מותרים <i data-commentator="Siftei Kohen" data-order="45"></i><i data-commentator="Beur HaGra" data-order="45"></i><i data-commentator="Be'er HaGolah" data-order="29"></i>לדעת <i data-commentator="Ba'er Hetev" data-order="34"></i>המתירים והוא שפירש מת ולא חיישינן <i data-commentator="Turei Zahav" data-order="23"></i>שמא פירשו מחיים חוץ לחתיכה <i data-commentator="Be'er HaGolah" data-order="30"></i>דמסתמא אותם שפירשו מחיים <i data-commentator="Ba'er Hetev" data-order="35"></i>נפלו כשהדיחו הבשר <i data-commentator="Be'er HaGolah" data-order="31"></i>ויש מי שאוסר התולעים המתהוים לאחר שחיטה מכל דבר הטעון שחיטה: <small>הגה ונהגו להקל כסברא הראשונה (ע"פ מרדכי דפרק אלו טרפות) עוד <i data-commentator="Beur HaGra" data-order="46"></i>נוהגים בתולעים של גבינה לאכלן <i data-commentator="Siftei Kohen" data-order="46"></i>אע"פ שקופצין הנה והנה <i data-commentator="Pithei Teshuva" data-order="12"></i>על <i data-commentator="Ba'er Hetev" data-order="36"></i>הגבינה אבל אם פירשו לגמרי <i data-commentator="Kereti" data-order="23"></i>אוסרין אותן (מהרא"י ובארוך כמ"א דין י') מיהו אם נתערבו בשאר מאכל ולא יכולין להסירן משם <i data-commentator="Siftei Kohen" data-order="47"></i>אין אוסרין המאכל <i data-commentator="Peleti" data-order="8"></i><i data-commentator="Kereti" data-order="24"></i>כי <i data-commentator="Beur HaGra" data-order="47"></i>יש מתירין אותם בכל ענין (או"ה שם) <i data-commentator="Siftei Kohen" data-order="48"></i>וטוב להחמיר במקום שאין הפ"מ (עד"מ):</small>
**** ENGLISH ****
All worms found in an animal — whether between skin and flesh or in the innards — forbidden; those found in fish in the innards forbidden; between skin and flesh or inside the flesh — permitted (and even if they separated somewhat and returned — permitted, for such is their nature to separate partially and return) (Hagahot Shaarei Dura). We forbid only while alive; those growing in flesh after shechitah or in fish and cheese are permitted as long as they did not separate; therefore worms in a bowl that fell from meat are permitted according to those who permit — provided they separated dead and we are not concerned they separated alive from the piece, for presumably those that separated alive fell when the meat was rinsed. And some forbid worms formed after shechitah from anything requiring shechitah. {Rama: Practice is lenient like the first view (according to Mordechai chapter These Are Tereifot). Further, practice with cheese worms is to eat them even though they jump on the cheese; but if they fully separated, they forbid them (Maharai and Arukh as Maggid Mishneh law 10); however if mixed in other food and cannot be removed, they do not forbid the food, for some permit in every case (Or Zarua there); and it is good to be stringent where it is not the accepted practice (Darkei Moshe).}
**** END BLOCK ****
```

### 44. `siman_084/mechaber/part-001.txt` — mechaber — seif 17 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_084/mechaber/part-001.txt#slug=mechaber#seif=17#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 17
marker: main
**** HEBREW ****
<i data-commentator="Turei Zahav" data-order="24"></i><i data-commentator="Siftei Kohen" data-order="49"></i><i data-commentator="Beur HaGra" data-order="48"></i><i data-commentator="Be'er HaGolah" data-order="32"></i>שרץ שרוף מותר לאכלו <i data-commentator="Pithei Teshuva" data-order="13"></i>משום <i data-commentator="Ba'er Hetev" data-order="37"></i>רפואה דעפרא בעלמא הוא:
**** ENGLISH ****
A burnt sheretz is permitted to eat for medicinal purposes, for it is mere dust.
**** END BLOCK ****
```

### 45. `siman_084/mechaber/part-001.txt` — mechaber — seif 2 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_084/mechaber/part-001.txt#slug=mechaber#seif=2#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 2
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="7"></i>הגדלים במים שבחריצין ונעיצים <small>(פי' חריצים ארוכים וקצרים. נעיצים רחבים כגון אותם שעושים לביברי דגים. רש"י) </small>שהם מושכים <i data-commentator="Peleti" data-order="2"></i>ואינם נובעים <i data-commentator="Siftei Kohen" data-order="8"></i><i data-commentator="Pithei Teshuva" data-order="1"></i><i data-commentator="Be'er HaGolah" data-order="3"></i>יש <i data-commentator="Ba'er Hetev" data-order="6"></i>אוסרים <i data-commentator="Be'er HaGolah" data-order="4"></i><i data-commentator="Kereti" data-order="4"></i>ויש מתירים:
**** ENGLISH ****
Those growing in water in channels and grooves (meaning long and short channels; wide grooves such as those made for fish ponds — Rashi) that draw water but do not flow — some forbid and some permit.
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_084
npm run pipeline:editorial:advance -- --siman 84
```

## Checkpoint ids

siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=15#marker=_
siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=16#marker=_
siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=17#marker=_
siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=2#marker=_
siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=3#marker=_
siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=4#marker=_
siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=5#marker=_
siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=6#marker=_
siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=7#marker=_
siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=8#marker=_
siman_084/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=9#marker=_
siman_084/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%90
siman_084/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%91
siman_084/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%92
siman_084/kereti/part-001.txt#slug=kereti#seif=11#marker=_
siman_084/kereti/part-001.txt#slug=kereti#seif=12#marker=_
siman_084/kereti/part-001.txt#slug=kereti#seif=13#marker=_
siman_084/kereti/part-001.txt#slug=kereti#seif=14#marker=_
siman_084/kereti/part-001.txt#slug=kereti#seif=16#marker=%D7%90
siman_084/kereti/part-001.txt#slug=kereti#seif=16#marker=%D7%91
siman_084/kereti/part-001.txt#slug=kereti#seif=2#marker=_
siman_084/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%90
siman_084/kereti/part-001.txt#slug=kereti#seif=3#marker=%D7%91
siman_084/kereti/part-001.txt#slug=kereti#seif=4#marker=%D7%90
siman_084/kereti/part-001.txt#slug=kereti#seif=4#marker=%D7%91
siman_084/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%90
siman_084/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%91
siman_084/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%90
siman_084/kereti/part-001.txt#slug=kereti#seif=6#marker=%D7%91
siman_084/kereti/part-001.txt#slug=kereti#seif=7#marker=_
siman_084/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%90
siman_084/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%91
siman_084/kereti/part-001.txt#slug=kereti#seif=9#marker=%D7%90
siman_084/kereti/part-001.txt#slug=kereti#seif=9#marker=%D7%91
siman_084/kereti/part-001.txt#slug=kereti#seif=9#marker=%D7%92
siman_084/mechaber/part-001.txt#slug=mechaber#seif=1#marker=main
siman_084/mechaber/part-001.txt#slug=mechaber#seif=10#marker=main
siman_084/mechaber/part-001.txt#slug=mechaber#seif=11#marker=main
siman_084/mechaber/part-001.txt#slug=mechaber#seif=12#marker=main
siman_084/mechaber/part-001.txt#slug=mechaber#seif=13#marker=main
siman_084/mechaber/part-001.txt#slug=mechaber#seif=14#marker=main
siman_084/mechaber/part-001.txt#slug=mechaber#seif=15#marker=main
siman_084/mechaber/part-001.txt#slug=mechaber#seif=16#marker=main
siman_084/mechaber/part-001.txt#slug=mechaber#seif=17#marker=main
siman_084/mechaber/part-001.txt#slug=mechaber#seif=2#marker=main