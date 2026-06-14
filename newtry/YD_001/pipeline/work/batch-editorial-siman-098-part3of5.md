# Editorial retranslation — Siman 98 (part 3/5)

Generated: 2026-06-12T13:35:55.975Z

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

## Blocks in this batch (44 of 218 remaining in scope)

### 1. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 9 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=9#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 9
marker: _
**** HEBREW ****
<b>ט) והחטים  </b>הם כבדים מן הקמח אחד מששה והיין והשמן קלים מהמים אחד מכ"ז. ב"ד שם בשם הרמב"ם. בן א"ח שם.
**** ENGLISH ****
ט) והחטים  הם liverים מן הflour אחד מששה והיין והשמן קלים מthe water אחד מכ"ז. ב"ד שם in name of Rambam. בן א"ח שם.
**** END BLOCK ****
```

### 2. `siman_098/kereti/part-001.txt` — kereti — seif 1 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: א
**** HEBREW ****
חלב שנתערב וכו' מזה דמהני טעימה משמע דחלב בבשר קרוי אינו מינו לענין טעימה ועי' פלתי דהארכתי בזה לפלפל אי קרוי מינו או אינו מינו
**** ENGLISH ****
חלב שנתערב etc. מזה דמהני טעימה it appears דחלב בmeat קרוי אינו מינו regarding טעימה ועי' Peleti דI expanded בזה לפלפל אי קרוי מינו או אינו מינו
**** END BLOCK ****
```

### 3. `siman_098/kereti/part-001.txt` — kereti — seif 1 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ב
**** HEBREW ****
יטעמנו משמע אפי' אינו קפילא רק א"י מסל"ת וגם בקפילא שייך מסל"ת כי אף דצריך להיות בלי יודע דתליא באמירתו איסור והיתר דאי ידע לא הוי מסל"ת מ"מ שייך לא מרע אמונתו דאמרו לו דהמרו זע"ז בהך מה אם יש בזה חתיכה טעם חלב או לא הרי לא מרע אמונתו ומ"מ לא ידע דנ"מ לאיסור והיתר ועי' פלתי
**** ENGLISH ****
יטעמנו it appears even אינו קפילא רק א"י מסל"ת וגם בקפילא שייך מסל"ת כי even דצריך להיות בלי יודע דתליא באמירתו איסור והיתר דאי ידע לא הוי מסל"ת nevertheless שייך לא מרע אמונתו דאמרו לו דהמרו זע"ז בהך מה אם יש בזה חתיכה טעם חלב או לא הרי לא מרע אמונתו וnevertheless לא ידע דנ"מ לאיסור והיתר ועי' Peleti
**** END BLOCK ****
```

### 4. `siman_098/kereti/part-001.txt` — kereti — seif 1 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ג
**** HEBREW ****
אם לומר אף שהוא מילתא דאורייתא ועמש"פ והעלתי אם לאחר שיאמר הא"י דאין בו טעם חלב ויאכלנו ע"פ והוא הישראל ירגיש בו טעם חלב ימנע לאכלו א"כ כל סמיכה שאנו סומכין על הא"י הוא הטעימ' וזהו דרבנן וסמכינן על א"י במסל"ת ע"ש והאחרונים תי' דהוי כמילתא דעבידי לגלוי ודוחק:
**** ENGLISH ****
אם לומר even שהוא מילתא d'oraisa ועמש"פ והעלתי אם לאחר שיאמר הא"י דאין בו טעם חלב ויאכלנו on the surface of והוא הישראל ירגיש בו טעם חלב ימנע to eat them if so כל סמיכה שאנו סומכין על הא"י הוא הטעימ' וזהו d'rabbanan וסמכינן על א"י במסל"ת see there והאחרונים תי' דהוי כמילתא דmade לגלוי וforced:
**** END BLOCK ****
```

### 5. `siman_098/kereti/part-001.txt` — kereti — seif 1 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ד
**** HEBREW ****
ואם אין וכו' המחבר נמשך אחר הרמב"ם דבאיכא קפילא אף דידעינן דאית ביה ששים לא מהני אם הוא אומר שמרגיש טעם ואסור ואם אומר שאין מרגיש טעם אפי' ליכא ס' מותר
**** ENGLISH ****
ואם אין etc. Mechaber נמשך אחר Rambam דבthere is קפילא even דידעינן דאית ביה sixty לא מהני אם הוא אומר שמרגיש טעם וforbidden ואם אומר שאין מרגיש טעם even there is not sixty permitted
**** END BLOCK ****
```

### 6. `siman_098/kereti/part-001.txt` — kereti — seif 1 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 1
marker: ה
**** HEBREW ****
עכשיו לסמוך וכולו אבל על טעימת ישראל כגון נדרים וכדומה סמכינן בזה"ז:
**** ENGLISH ****
now לסמוך etc.לו אבל על טעימת ישראל כגון נדרים וכדומה סמכינן בזה"ז:
**** END BLOCK ****
```

### 7. `siman_098/kereti/part-001.txt` — kereti — seif 2 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 2
marker: א
**** HEBREW ****
אם נודע וכולו ואף על גב במקום דאתחזק איסורא אפילו ספק דרבנן לחומרא כאן לא קרוי אתחזק איסורא דהא עד שנפל לתוכו איסור היה הכל מותר והמאכל בעצם בחזקת היתר ומספק ע"י נפילה אתה בא לאוסרו אין זה בגדר בחזקת איסור:
**** ENGLISH ****
אם נודע etc.לו וeven על גב במקום דאתחזק איסורא אפילו doubt d'rabbanan לstringency כאן לא קרוי אתחזק איסורא דהא עד שfell לתetc. איסור היה הכל permitted וthe food בעצם בpresumption of היתר ומdoubt ע"י נפילה אתה בא לאוסרו אין זה בגדר בpresumption of איסור:
**** END BLOCK ****
```

### 8. `siman_098/kereti/part-001.txt` — kereti — seif 2 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 2
marker: ב
**** HEBREW ****
ולענין וכולי הש"ך השיג דוקא לענין מין במינו דלא בטל אף במשהו בזב יש לילך בתר שמא ובזו פליגי אביי ורבא אבל בזה דתלי' בנ"ט דמין במינו לית ביה בנ"ט ובא"מ אית בי' טעם מורגש מה נ"מ בשם כלל אי מרגישין טעם איסור אסור ואי לא מותר דלא תליא איסור והיתר במין וא"מ רק בהרגשת טעם דטכ"ע דאורייתא ממשרת ועמ"ש פלתי כי רמ"א יש לו לכאורה ראיה מגמרא ולכאורה דברי רמב"ם מורים כן אבל העלתי מ"מ לדינא כש"ך גם בררתי מה נקרא מינו ואינו מינו ע"ש כיון דלענין דשיל"מ ושאר דברים האוסרים במשהו תלוי מין וא"מ בתר שמא
**** ENGLISH ****
וregarding etc.לי Shach challenged specifically regarding species in its species דלא בטל even במשהו בזב יש לילך בתר lest ובזו פליגי אביי ורבא אבל בזה דתלי' בנ"ט דspecies in its species לית ביה בנ"ט ובא"מ אית בי' טעם מורגש מה נ"מ in name of כלל אי מרגישין טעם איסור forbidden ואי לא permitted דלא תליא איסור והיתר במין וא"מ רק בהרגשת טעם דטכ"ע d'oraisa ממשרת ועwhat he wrote Peleti כי רמ"א יש לו it appears proof מגמרא וit appears דברי רמב"ם מורים כן אבל העלתי nevertheless לthe halachah כש"ך גם בררתי מה נקרא מינו ואינו מינו see there כיון דregarding דשיל"מ ושאר דברים האוסרים במשהו תלוי מין וא"מ בתר lest
**** END BLOCK ****
```

### 9. `siman_098/kereti/part-001.txt` — kereti — seif 2 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 2
marker: ג
**** HEBREW ****
באינו מינו ואי קשה יטעום קפילא לדעת רמ"א דשינוי שם אף דשוה בטעמא קרוי אינו מינו לק"מ דא"א למטעם אבל לדעת הש"ך קשה וצ"ל שנפל לתוך ירקו' כזית בשר נבילה וכזית שחוטה ונשפך ולא נודע אם היה הירקות ס' בצירוף זית בשר שחוטה ובטל זית נבילה או לא וזה א"א לברר כי אף שמרגיש טעם בשר מ"מ אפשר דהיה נ"ט זתים ירקות וזית בשר שחוטה ואיכא ס' ומ"מ מרגיש טעם מזית שחוטה. וכ"כ למ"ד אפשר לסוחטו אסור אף בשאר איסורים א"כ י"ל טרם שנשפך נתוסף הרבה היתר עד א"א לטעום ולהרגיש האיסור ואין כאן טעם האיסור מ"מ אם לכתחילה היה פחות מס' מה בכך שנתרבה אפשר לסוחטו אסור.
**** ENGLISH ****
באינו מינו ואי קשה יטעום קפילא לדעת רמ"א דשינוי שם even דשוה בטעמא קרוי אינו מינו לק"מ דא"א לfor the reason אבל לדעת Shach קשה וone must say שfell לתוך ירקו' כזית meat nevelah וכזית שחוטה ונשפך ולא נודע אם היה הvegetables sixty בbrothוף זית meat שחוטה ובטל זית nevelah או לא וזה א"א לברר כי even שמרגיש טעם meat nevertheless אפשר דהיה נ"ט זתים vegetables וזית meat שחוטה וthere is sixty וnevertheless מרגיש טעם מזית שחוטה. and so too למ"ד אפשר לסוחטו forbidden even in other איסורים if so י"ל טרם שנשפך נתוסף הרבה היתר עד א"א לטעום ולהרגיש האיסור ואין כאן טעם האיסור nevertheless אם l'chatchila היה פחות מsixty מה בכך שנתרבה אפשר לסוחטו forbidden.
**** END BLOCK ****
```

### 10. `siman_098/kereti/part-001.txt` — kereti — seif 2 — marker `ד`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 2
marker: ד
**** HEBREW ****
אסור ובשר עוף בחלב דעת האחרונים דהוי כמין במינו וספיקא להקל וכן משמע בחולין דף צ"ט ע"ב בתוס' ד"ה א"מ דכתבו הואיל ובשר שחוטה ספק להקל ע"ש ואיירי באופן דא"א לברר ע"י קפילא כמ"ש בס"ק ח'
**** ENGLISH ****
The flesh of chicken in the last few thoughts has been deviant and is sufficient to make it easier, and it means that in the midst of the P.D. page, in Houthis is written, and the meat that has a doubt to make it easier and forbidden to find out by Hashem’s Word
**** END BLOCK ****
```

### 11. `siman_098/kereti/part-001.txt` — kereti — seif 2 — marker `ה`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 2
marker: ה
**** HEBREW ****
רואין הש"ך השיג דמ"מ יהיב טעמא בא"מ אף ע"פ דהבאתי ראי' לדברי הש"ך מתוס' דעכו"ם מ"מ העיק' כש"ע ורשב"א
**** ENGLISH ****
The Lord’s Prayer was given to him, “The Lord’s Prayer is in heaven.”
**** END BLOCK ****
```

### 12. `siman_098/kereti/part-001.txt` — kereti — seif 3 — marker `_`

- Quality: **info** — divine_name_style
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 3
marker: _
**** HEBREW ****
וא"א לעמוד ה"ל ספק חסרון ידיעה ולא שמי' ספק.
**** ENGLISH ****
And I will stand up to the Lord with no doubt, and not my name.
**** END BLOCK ****
```

### 13. `siman_098/kereti/part-001.txt` — kereti — seif 4 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 4
marker: א
**** HEBREW ****
רתיחת מליחה וכן ע"י עירוי אבל ע"י כבישה כולו אסור:
**** ENGLISH ****
A clearing of a call and a transfusion, but by its entire road it is forbidden:
**** END BLOCK ****
```

### 14. `siman_098/kereti/part-001.txt` — kereti — seif 4 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 4
marker: ב
**** HEBREW ****
כאלו מכירו עמ"ש פלתי דאם עי"כ המאכל מתקלקל יש להתיר בלי מים ע"ש:
**** ENGLISH ****
as if מכירו עwhat he wrote Peleti דאם עי"כ the food מתקלקל there is room to permit בלי מים see there:
**** END BLOCK ****
```

### 15. `siman_098/kereti/part-001.txt` — kereti — seif 4 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=4#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 4
marker: ג
**** HEBREW ****
אבל אם נפל עמ"ש פלתי כי דין זה צ"ע ותלי' א"א חוזר וניעור אסור:
**** ENGLISH ****
But if Hashem’s judgment is broken, then Hashem’s judgment is not revealed
**** END BLOCK ****
```

### 16. `siman_098/kereti/part-001.txt` — kereti — seif 5 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: א
**** HEBREW ****
לבטל כזית הבלוע כי כל מה שבקדירה מתחבר ומצטרף עם מה שבלע קדירה ולא שייך נ"נ:
**** ENGLISH ****
Cancel as the olive grove that everything in the apartment unites and joins with what is in the heart of the apartment and does not belong to the NN:
**** END BLOCK ****
```

### 17. `siman_098/kereti/part-001.txt` — kereti — seif 5 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: ב
**** HEBREW ****
גבי כלי נ"נ היינו גוף הכלי ולא הבלוע:
**** ENGLISH ****
On the other hand, we were the body of the vessel and not the shock:
**** END BLOCK ****
```

### 18. `siman_098/kereti/part-001.txt` — kereti — seif 5 — marker `ג`

- Quality: **warn** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: ג
**** HEBREW ****
שבלע כו' דס"ל בבלוע נ"נ:
**** ENGLISH ****
שabsorbed etc. דס"ל בabsorbed נ"נ:
**** END BLOCK ****
```

### 19. `siman_098/kereti/part-001.txt` — kereti — seif 5 — marker `ד`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: ד
**** HEBREW ****
א"צ אלא ס' דאין אומרים בבלוע נ"נ:
**** ENGLISH ****
Hashem’s Word says, “I am not a sinner.”
**** END BLOCK ****
```

### 20. `siman_098/kereti/part-001.txt` — kereti — seif 5 — marker `ה`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 5
marker: ה
**** HEBREW ****
כלי חרס דעת הט"ז דגוף חרס נ"נ ואין כן דעת שאר אחרונים דתליא אי אמרינן חנ"נ בחצי חתיכה או לא כמ"ש המרדכי ש"מ הכל בבלוע איירי כאחרונים:
**** ENGLISH ****
Hashem’s Word is not in heaven, nor is it known that the Holy Spirit is not in the midst of Hashem’s wrath, nor is it the Lord’s promise that “All things are in the darkness of the earth are different:
**** END BLOCK ****
```

### 21. `siman_098/kereti/part-001.txt` — kereti — seif 7 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 7
marker: _
**** HEBREW ****
ס"א מבואר לעיל הטעם י"א הואיל והוא ברי' הוסיפו במנין וי"א דיש בבצים גדולים וקטנים ועמש"ל סימן פ"ו:
**** ENGLISH ****
ס"א explained above the taste י"א הואיל והוא ברי' הוסיפו במנין וי"א דיש בבצים גדולים וקטנים ועמש"ל siman chapter 6:
**** END BLOCK ****
```

### 22. `siman_098/kereti/part-001.txt` — kereti — seif 8 — marker `א`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 8
marker: א
**** HEBREW ****
והוא וכו' דמרגישין הטעם ביותר מס':
**** ENGLISH ****
והוא etc. דמרגישין the taste ביותר מsixty:
**** END BLOCK ****
```

### 23. `siman_098/kereti/part-001.txt` — kereti — seif 8 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 8
marker: ב
**** HEBREW ****
אפילו באלף וכו' וכתב האו"ה שהוא מדרבנן ועמ"ש פלתי והעלתי אם אינו מתבלין מפורסמים רק שמתבלי' הקדירה וכדומה אזי מדאורייתא בס' ומדרבנן החמירו אבל תבלין גמורים פלפלין וקנמון וכדומה כל כמה דמרגישין טעם מהתורה לא בטיל
**** ENGLISH ****
אפילו באלף etc. וwrote הIssur VeHeter שהוא d'rabbanan ועwhat he wrote Peleti והעלתי אם אינו מspice מפורסמים רק שמתבלי' הקדירה וכדומה אזי מd'oraisa בsixty וd'rabbanan החמירו אבל spice גמורים פלפלין וקנמון וכדומה כל כמה דמרגישין טעם מהתורה לא nullified
**** END BLOCK ****
```

### 24. `siman_098/kereti/part-001.txt` — kereti — seif 8 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 8
marker: ג
**** HEBREW ****
אינן בטילים עמ"ש פלתי והבאתי דעת או"ה לחלק אם נותן טעם באותו קדרה אז לא בטיל אבל אם אינו נ"ט אע"פ שבקדרה אחרת נותן טעם בטילה ועי' מ"ש פלתי אם דרך ליתן היינו מין במינו וגזרו ואם אין דרך לא גזרו ע"ש:
**** ENGLISH ****
אינן nullifiedים עwhat he wrote Peleti והבאתי דעת Issur VeHeter לdisagreed אם noten taam באותו pot אז לא nullified אבל אם אינו נ"ט אon the surface of שבpot אחרת noten taam nullifiedה ועי' what he wrote Peleti אם by way of ליתן that is species in its species וגזרו ואם אין by way of לא גזרו see there:
**** END BLOCK ****
```

### 25. `siman_098/kereti/part-001.txt` — kereti — seif 9 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kereti/part-001.txt#slug=kereti#seif=9#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kereti
seif: 9
marker: _
**** HEBREW ****
לבטל חבירו בזה דאין שוים בטעמן לכ"ע אפילו למ"ד אסורים אין מבטלין מ"מ מותר דהא אם יטעום קפילא לא ירגיש טעם חלב ולכ"ע מותר אבל אם שוים בטעם ואיסורים נפרדים חלב בהמה וחלב חיה טריפה אם שוים בטעם ובשמא ג"כ מצטרפין ע"ש באריכות:
**** ENGLISH ****
לבטל חבירו בזה דאין שוים בטעמן לכ"ע אפילו למ"ד forbiddenים אין מבטלין nevertheless permitted דהא אם יטעום קפילא לא ירגיש טעם חלב ולכ"ע permitted אבל אם שוים בטעם ואיסורים נפרדים חלב animal וחלב חיה tereifah אם שוים בטעם ובlest ג"כ מצטרפין see there באריכות:
**** END BLOCK ****
```

### 26. `siman_098/mateh-yehonatan/part-001.txt` — mateh-yehonatan — seif 1 — marker `_`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_098/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=1#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: mateh-yehonatan
seif: 1
marker: _
**** HEBREW ****
(סימן צ"ח סעיף א' בהג"ה) <b>[ואין נוהגים עכשיו וכו'</b>. כתוב בחידושי רעק"א ז"ל לא ידעתי טעם נכון לזה ואולי י"ל וכו' והיינו דחיישי' דלא קפילא וכו' עכ"ל ונראה דט"ס נפל בדבריו וצ"ל דחיישינן דההיתר דקפילא היינו במסל"ת כצ"ל ועל עיקר תירוצו תמוה דא"כ עדיין יש לסמוך גם עכשיו אטעימת עובד כוכבי' והיינו דיטעמנו לשני עובדי כוכבים לקפילא שלא יהיה מסל"ת וגם לעובד כוכבים קפילא אחר במסל"ת ואז יהיה יוצא כל הדעות וצע"ג. ע"כ הגה"ה מהרב הגדול <b>מהור"ר שלמה הכהן</b> נ"י מ"ץ בפ"ק <b>ווילנא</b>]:
**** ENGLISH ****
(siman צ"ח seif א' בהג"ה) [ואין נוהגים now etc.. כתוב בחידושי רעק"א and these are his words לא ידעתי טעם נכון לזה ואולי י"ל etc. וthat is דחיישי' דלא קפילא etc. end of his words וit appears דט"ס fell בדבריו וone must say for we are concerned דההיתר דקפילא that is במסל"ת כone must say ועל עיקר תירוצו תמוה דif so עדיין one may rely גם now אטעימת עובד כוכבי' וthat is דיטעמנו לשני gentiles לקפילא שלא יהיה מסל"ת וגם לnon-Jew קפילא אחר במסל"ת ואז יהיה יוצא כל הדעות וצע"ג. until here hagahah מהרב הגדול מהור"ר שלמה הכהן נ"י מ"ץ בfirst chapter ווילנא]:
**** END BLOCK ****
```

### 27. `siman_098/mechaber/part-001.txt` — mechaber — seif 1 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_098/mechaber/part-001.txt#slug=mechaber#seif=1#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 1
marker: main
**** HEBREW ****
<b>דין איסור שנתערב בהיתר ואופן ביטולו. ובו ט' סעיפים:</b><br> <i data-commentator="Siftei Kohen" data-order="1"></i><i data-commentator="Be'er HaGolah" data-order="1"></i>איסור שנתערב בהיתר מין בשאינו מינו <i data-commentator="Turei Zahav" data-order="1"></i><i data-commentator="Beur HaGra" data-order="1"></i>כגון <i data-commentator="Ba'er Hetev" data-order="1"></i><i data-commentator="Peleti" data-order="1"></i><i data-commentator="Kereti" data-order="1"></i>חלב שנתערב בבשר <i data-commentator="Turei Zahav" data-order="2"></i><i data-commentator="Siftei Kohen" data-order="2"></i><i data-commentator="Beur HaGra" data-order="2"></i><i data-commentator="Pithei Teshuva" data-order="1"></i><i data-commentator="Be'er HaGolah" data-order="2"></i><i data-commentator="Kereti" data-order="2"></i><i data-commentator="Peleti" data-order="2"></i>יטעמנו <i data-commentator="Ba'er Hetev" data-order="2"></i>עובד כוכבים <i data-commentator="Kereti" data-order="3"></i>אם אומר שאין בו טעם חלב <i data-commentator="Beur HaGra" data-order="3"></i>או שאומר שיש בו טעם אלא שהוא פגום מותר <i data-commentator="Siftei Kohen" data-order="3"></i><i data-commentator="Beur HaGra" data-order="4"></i><i data-commentator="Be'er HaGolah" data-order="3"></i>והוא שלא יהא סופו להשביח <i data-commentator="Beur HaGra" data-order="5"></i><i data-commentator="Be'er HaGolah" data-order="4"></i>וצריך שלא ידע <i data-commentator="Ba'er Hetev" data-order="3"></i>שסומכין עליו <i data-commentator="Siftei Kohen" data-order="4"></i><i data-commentator="Kereti" data-order="4"></i>ואם אין שם עובד כוכבים לטועמו <i data-commentator="Ba'er Hetev" data-order="4"></i><i data-commentator="Pithei Teshuva" data-order="2"></i>משערינן בס' <i data-commentator="Beur HaGra" data-order="6"></i>וכן אם הוא מין במינו כיון דליכא למיקם אטעמא משערים בס' <i data-commentator="Siftei Kohen" data-order="5"></i><i data-commentator="Beur HaGra" data-order="7"></i><small>(ואין נוהגים <i data-commentator="Kereti" data-order="5"></i>עכשיו <i data-commentator="Ba'er Hetev" data-order="5"></i><i data-commentator="Pithei Teshuva" data-order="3"></i>לסמוך אעובד כוכבים ומשערינן הכל בס') (באגור ותשובת מהר"מ פדואה סימן ע"ט ושאר אחרונים):</small>
**** ENGLISH ****
The law of a forbidden item that became mixed with permitted food and the manner of its nullification. In it are 9 seifim: A forbidden item that became mixed with permitted food — not its kind in its kind, such as milk that became mixed with meat — we have a non-Jew taste it; if he says there is no milk taste, or if he says there is taste but it is spoiled — permitted, provided it will not end up improving it; and he must not know that we rely on him. And if there is no non-Jew to taste it, we estimate with sixty. And likewise if it is its kind in its kind, since we cannot establish it through taste, we estimate with sixty (and we do not practice now to rely on a non-Jew, and we estimate everything with sixty) (Agur and responsum of Maharam Padua siman 79 and other Acharonim):
**** END BLOCK ****
```

### 28. `siman_098/mechaber/part-001.txt` — mechaber — seif 2 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_098/mechaber/part-001.txt#slug=mechaber#seif=2#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 2
marker: main
**** HEBREW ****
<i data-commentator="Turei Zahav" data-order="3"></i><i data-commentator="Siftei Kohen" data-order="6"></i><i data-commentator="Beur HaGra" data-order="8"></i><i data-commentator="Be'er HaGolah" data-order="5"></i>אם נתערב מין במינו <i data-commentator="Peleti" data-order="3"></i>ונשפך בענין שאין יכולין לעמוד עליו לשערו <i data-commentator="Kereti" data-order="6"></i>אם <i data-commentator="Ba'er Hetev" data-order="6"></i>נודע שהיה רובו היתר מותר ואם לא נודע שהיה רובו היתר אסור: <small>הגה <i data-commentator="Turei Zahav" data-order="4"></i><i data-commentator="Beur HaGra" data-order="9"></i><i data-commentator="Peleti" data-order="4"></i><i data-commentator="Kereti" data-order="7"></i>ולענין מין במינו אזלינן <i data-commentator="Pithei Teshuva" data-order="4"></i>בתר <i data-commentator="Ba'er Hetev" data-order="7"></i>שמא אם הוא שוה הוי מין במינו אבל לא אזלינן בתר טעמא אם הוא שוה או לא (ב"י בשם האגור וכן הוא בהגהת ש"ד סי' ל"ט):</small> <i data-commentator="Siftei Kohen" data-order="7"></i><i data-commentator="Beur HaGra" data-order="10"></i><i data-commentator="Pithei Teshuva" data-order="5"></i><i data-commentator="Be'er HaGolah" data-order="6"></i>אבל אם נתערב <i data-commentator="Kereti" data-order="8"></i>בשאינו מינו ונשפך בענין שאין יכולין לעמוד עליו לשערו אפי' נודע שהיה <i data-commentator="Ba'er Hetev" data-order="8"></i><i data-commentator="Pithei Teshuva" data-order="6"></i>רובו היתר <i data-commentator="Kereti" data-order="9"></i>אסור <i data-commentator="Turei Zahav" data-order="5"></i><i data-commentator="Siftei Kohen" data-order="8"></i><i data-commentator="Beur HaGra" data-order="11"></i><i data-commentator="Be'er HaGolah" data-order="7"></i><i data-commentator="Peleti" data-order="5"></i>ואם נתערב במינו ובשאינו מינו ונשפך בענין שאין יכולין לעמוד עליו לשערו <i data-commentator="Be'er HaGolah" data-order="8"></i>ונודע שהיה רובו היתר ממינו <i data-commentator="Kereti" data-order="10"></i>רואין את שאינו מינו כאילו אינו והשאר מינו <i data-commentator="Pithei Teshuva" data-order="7"></i>רבה עליו <i data-commentator="Ba'er Hetev" data-order="9"></i>ומבטלו:
**** ENGLISH ****
If its kind became mixed with its kind and was spilled in a manner that one cannot determine the amount to estimate — if it is known that the majority was permitted, it is permitted; and if it is not known that the majority was permitted, it is forbidden: {Rama: And regarding its kind in its kind, we follow presumption — if it is equal it is its kind in its kind, but we do not follow taste whether it is equal or not (Beit Yosef in the name of Agur and so in Hagahat Sh"D siman 39).} But if it became mixed with what is not its kind and was spilled in a manner that one cannot determine the amount, even if it is known that the majority was permitted it is forbidden. And if it became mixed both in its kind and not in its kind and was spilled in a manner that one cannot determine the amount, and it is known that the majority was permitted from its kind — we view what is not its kind as if it were not there, and the remainder is its kind and the majority nullifies it:}
**** END BLOCK ****
```

### 29. `siman_098/mechaber/part-001.txt` — mechaber — seif 3 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_098/mechaber/part-001.txt#slug=mechaber#seif=3#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 3
marker: main
**** HEBREW ****
<i data-commentator="Beur HaGra" data-order="12"></i><i data-commentator="Be'er HaGolah" data-order="9"></i>במה דברים אמורים בשנשפך אבל איסור שנתערב בהיתר <i data-commentator="Siftei Kohen" data-order="9"></i>והוא לפנינו <i data-commentator="Turei Zahav" data-order="6"></i><i data-commentator="Kereti" data-order="11"></i>ואי אפשר <i data-commentator="Pithei Teshuva" data-order="8"></i>לעמוד על שיעורו אף על פי שהוא מאיסורים של דבריהם <i data-commentator="Ba'er Hetev" data-order="10"></i>אסור:
**** ENGLISH ****
In what matters is this stated — when it was spilled; but a forbidden item that became mixed with permitted food and is before us, and it is impossible to determine its measure — even though it is from rabbinic prohibitions — it is forbidden:
**** END BLOCK ****
```

### 30. `siman_098/mechaber/part-001.txt` — mechaber — seif 4 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_098/mechaber/part-001.txt#slug=mechaber#seif=4#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 4
marker: main
**** HEBREW ****
<i data-commentator="Siftei Kohen" data-order="10"></i><i data-commentator="Beur HaGra" data-order="13"></i><i data-commentator="Be'er HaGolah" data-order="10"></i>איסור שנתבשל עם היתר אפי' מכירו והוא שלם וזרקו צריך ששים כנגד כל האיסור מפני שאין אנו יודעים כמה יצא ממנו לפיכך המבשל בקדירת איסור שהיא בת יומא או תוחב כף של איסור בהיתר <i data-commentator="Siftei Kohen" data-order="11"></i>צריך ס' <i data-commentator="Beur HaGra" data-order="14"></i>כנגד כל הקדירה וכנגד כל מה שתחב מהכף שאין אנו יודעין כמה בלעו <i data-commentator="Siftei Kohen" data-order="12"></i><i data-commentator="Beur HaGra" data-order="15"></i>בין שהם של חרס או עץ <i data-commentator="Beur HaGra" data-order="16"></i>או מתכת: <small>הגה <i data-commentator="Beur HaGra" data-order="17"></i>ובלבד שבלעו ע"י רתיחת אש שאז הבליעה הולכת בכל הכלי <i data-commentator="Siftei Kohen" data-order="13"></i>אבל על ידי <i data-commentator="Kereti" data-order="12"></i>רתיחת מליחה אינו נבלע <i data-commentator="Siftei Kohen" data-order="14"></i><i data-commentator="Ba'er Hetev" data-order="11"></i>בכלי רק כדי קליפה וא"צ לשער רק כדי קליפה (מרדכי פכ"ה ובארוך כלל כ"ד) וע"ל סימן ס"ט: </small>ויש <i data-commentator="Be'er HaGolah" data-order="11"></i>מי שמחמיר בכף של מתכת להצריך ס' כנגד כולו אפי' לא הכניס אלא מקצת משום דחם מקצתו חם כולו: <small>הגה <i data-commentator="Siftei Kohen" data-order="15"></i>ונוהגין כסברא הראשונה <i data-commentator="Beur HaGra" data-order="18"></i>וכל איסור שמבטלים בששים אם מכירו צריך להסירו משם אף על גב דכבר נתבטל טעמו בששים <i data-commentator="Turei Zahav" data-order="7"></i><i data-commentator="Siftei Kohen" data-order="16"></i>ולכן אם נפל חלב לתוך התבשיל ונתבטל טעמו בששים צריך ליתן שם מים צוננים וטבע החלב להקפיא ולצוף למעלה על המים <i data-commentator="Ba'er Hetev" data-order="12"></i>ויסירנו משם דמאחר דאפשר להסירו הוי <i data-commentator="Peleti" data-order="6"></i><i data-commentator="Kereti" data-order="13"></i>כאילו מכירו וצריך להסירו משם (הגהות מרדכי בחולין ובארוך כלל כ"ג) <i data-commentator="Beur HaGra" data-order="19"></i>איסור שנתבטל בקדירה והסירוהו משם ונפל לקדירה אחרת צריך לחזור ולבטלו בששים נגד כולו וכן לעולם <i data-commentator="Beur HaGra" data-order="20"></i><i data-commentator="Peleti" data-order="7"></i><i data-commentator="Kereti" data-order="14"></i>אבל אם נפל לקדירה הראשונה ב' פעמים אין צריך רק ששים (פעם) אחת כנגדו (בארוך כלל כ"ד דין ב') ועיין לעיל סימן צ"ד:</small>
**** ENGLISH ****
A forbidden item that was cooked with permitted food — even if one recognizes it and it is whole and one removed it — requires sixty against the entire forbidden amount, because we do not know how much emerged from it. Therefore one who cooks in a forbidden pot that is ben yomo, or inserts a spoon of forbidden food into permitted food, requires sixty against the entire pot and against all that one inserted from the spoon, because we do not know how much was absorbed — whether of earthenware, wood, or metal: {Rama: Provided it was absorbed through boiling by fire, for then absorption spreads through the entire vessel; but through boiling of brine it is not absorbed in the vessel more than the measure of a peel, and one need not estimate except the measure of a peel (Mordechai chapter Keitzad and Arukh general rule 24) — see above siman 69. And some are stringent with a metal spoon to require sixty against all of it even if one inserted only part, because part of its heat is all of its heat. Rama: And we practice according to the first view. And every prohibition that we nullify with sixty — if one recognizes it, one must remove it from there even though its taste was already nullified in sixty; therefore if milk fell into the dish and its taste was nullified in sixty, one must put cold water there and the nature of milk is to congeal and float above the water, and one removes it from there, for since it can be removed it is as if recognized and must be removed (Hagahot Mordechai in Chullin and Arukh general rule 23). A forbidden item that was nullified in a pot and was removed and fell into another pot requires again to nullify it with sixty against all of it, and so forever; but if it fell twice into the first pot, one need not nullify again (Hagahot Mordechai there).}
**** END BLOCK ****
```

### 31. `siman_098/mechaber/part-001.txt` — mechaber — seif 5 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_098/mechaber/part-001.txt#slug=mechaber#seif=5#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 5
marker: main
**** HEBREW ****
<i data-commentator="Turei Zahav" data-order="8"></i><i data-commentator="Beur HaGra" data-order="21"></i><i data-commentator="Be'er HaGolah" data-order="12"></i>אם ידוע כמה הוא האיסור כגון כף חדשה <i data-commentator="Siftei Kohen" data-order="17"></i>או שאינה בת יומא שניער בה ובלעה כזית חלב ואחר כך ניער בה קדרה של בשר אין צריך אלא ס' <i data-commentator="Kereti" data-order="15"></i>לבטל הכזית שבלעה <small>(ולא אמרינן <i data-commentator="Kereti" data-order="16"></i>גבי כלי חתיכה נעשית נבילה <i data-commentator="Siftei Kohen" data-order="18"></i><i data-commentator="Beur HaGra" data-order="22"></i>אפילו אם ניערו בו איסור) </small>אבל <i data-commentator="Beur HaGra" data-order="23"></i><i data-commentator="Be'er HaGolah" data-order="13"></i>כף ישנה <i data-commentator="Beur HaGra" data-order="24"></i>ובת יומא משערין בכולה <small>(דכל מה <i data-commentator="Kereti" data-order="17"></i>שבלע נעשה <i data-commentator="Ba'er Hetev" data-order="13"></i>איסור ולא ידעינן כמה בלע) (שם) </small>ויש <i data-commentator="Beur HaGra" data-order="25"></i><i data-commentator="Be'er HaGolah" data-order="14"></i>מי שאומר <i data-commentator="Siftei Kohen" data-order="19"></i>שגם בזו <i data-commentator="Kereti" data-order="18"></i>אין צריך אלא ס' לבטל <i data-commentator="Ba'er Hetev" data-order="14"></i>הכזית שבלע: <small>הגה והסברא ראשונה עיקר <i data-commentator="Siftei Kohen" data-order="20"></i>כמו שנתבאר לעיל גבי טיפת חלב שנפלה על הקדרה <i data-commentator="Siftei Kohen" data-order="21"></i><i data-commentator="Beur HaGra" data-order="26"></i>ויש שאינן מחלקין בין כף ישן לחדש רק <i data-commentator="Peleti" data-order="8"></i>בין <i data-commentator="Kereti" data-order="19"></i>כלי חרס לשאר כלים (מרדכי פ' ג"ה) ואומרים <i data-commentator="Siftei Kohen" data-order="22"></i>דבכלי <i data-commentator="Ba'er Hetev" data-order="15"></i>חרס דאי אפשר להפריד האיסור על ידי הגעלה אמרינן הכלי נעשה נבילה אבל לא בשאר כלים וטוב לחוש לחומרא וע"ל סימן צ"ב:</small>
**** ENGLISH ****
If the amount of the forbidden item is known — such as a new spoon, or one that is not ben yomo, that was shaken in it and absorbed an olive-volume of milk, and afterward one shook in it a meat pot — one needs only sixty to nullify the olive-volume that it absorbed (and we do not say regarding a vessel that the piece becomes nevelah even if one shook forbidden food in it). But an old spoon that is ben yomo — one estimates against all of it (for all that was absorbed becomes forbidden and we do not know how much was absorbed) (there). And some say that in this too one needs only sixty to nullify the olive-volume absorbed: {Rama: And the first reasoning is primary, as explained above regarding a drop of milk that fell on the pot; and some do not distinguish between an old and new spoon, only between earthenware and other vessels (Mordechai chapter Gid HaNasheh) — they say that in earthenware, since the forbidden item cannot be separated through hagalah, we say the vessel becomes nevelah; but not in other vessels; and it is good to be concerned for stringency — see above siman 92.}
**** END BLOCK ****
```

### 32. `siman_098/mechaber/part-001.txt` — mechaber — seif 6 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_098/mechaber/part-001.txt#slug=mechaber#seif=6#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 6
marker: main
**** HEBREW ****
<i data-commentator="Turei Zahav" data-order="9"></i><i data-commentator="Siftei Kohen" data-order="23"></i><i data-commentator="Be'er HaGolah" data-order="15"></i>כחצי זית של <i data-commentator="Ba'er Hetev" data-order="16"></i>איסור שנתערב בהיתר צריך ששים חצאי זיתי היתר לבטלו:
**** ENGLISH ****
Like half an olive-volume of forbidden food that became mixed with permitted food — requires sixty half-olive-volumes of permitted food to nullify it:
**** END BLOCK ****
```

### 33. `siman_098/mechaber/part-001.txt` — mechaber — seif 7 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_098/mechaber/part-001.txt#slug=mechaber#seif=7#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 7
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="16"></i>ביצה <i data-commentator="Beur HaGra" data-order="27"></i>שיש בה אפרוח <i data-commentator="Beur HaGra" data-order="28"></i>או טיפת דם שנתבשלה עם אחרות <i data-commentator="Turei Zahav" data-order="10"></i>צריך <i data-commentator="Kereti" data-order="20"></i>ששים ואחת <i data-commentator="Siftei Kohen" data-order="24"></i><i data-commentator="Beur HaGra" data-order="29"></i>לבטל <i data-commentator="Ba'er Hetev" data-order="17"></i>פליטתה:
**** ENGLISH ****
An egg that has an embryo, or a drop of blood, that was cooked with others — requires sixty-one to nullify its emission:
**** END BLOCK ****
```

### 34. `siman_098/mechaber/part-001.txt` — mechaber — seif 8 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_098/mechaber/part-001.txt#slug=mechaber#seif=8#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 8
marker: main
**** HEBREW ****
<i data-commentator="Siftei Kohen" data-order="25"></i><i data-commentator="Be'er HaGolah" data-order="17"></i>כחל מתבטל בתשעה וחמשים: <small>הגה <i data-commentator="Siftei Kohen" data-order="26"></i><i data-commentator="Beur HaGra" data-order="30"></i>כל האיסורים <i data-commentator="Ba'er Hetev" data-order="18"></i>הנוהגין <i data-commentator="Beur HaGra" data-order="31"></i>בזמן הזה כולם מתבטלים בששים <i data-commentator="Siftei Kohen" data-order="27"></i>מלבד חמץ בפסח ויין נסך כאשר נתבאר בהלכותיהם (טור) <i data-commentator="Beur HaGra" data-order="32"></i>ובלבד שהאיסור אינו נותן טעם בקדירה <i data-commentator="Siftei Kohen" data-order="28"></i>אבל אם נותן טעם באותה קדירה <i data-commentator="Turei Zahav" data-order="11"></i><i data-commentator="Beur HaGra" data-order="33"></i><i data-commentator="Kereti" data-order="21"></i>והוא אסור מצד עצמו <i data-commentator="Siftei Kohen" data-order="29"></i><i data-commentator="Peleti" data-order="9"></i><i data-commentator="Kereti" data-order="22"></i>אפילו באלף לא בטיל כל זמן שמרגישין טעמו <i data-commentator="Siftei Kohen" data-order="30"></i><i data-commentator="Beur HaGra" data-order="34"></i>ולכן <i data-commentator="Peleti" data-order="10"></i>מלח ותבלין מדברים <i data-commentator="Siftei Kohen" data-order="31"></i>דעבידי לטעמא <i data-commentator="Siftei Kohen" data-order="32"></i><i data-commentator="Beur HaGra" data-order="35"></i>אם אסורים <i data-commentator="Pithei Teshuva" data-order="9"></i>מחמת <i data-commentator="Ba'er Hetev" data-order="19"></i>עצמן <i data-commentator="Turei Zahav" data-order="12"></i><i data-commentator="Beur HaGra" data-order="36"></i><i data-commentator="Kereti" data-order="23"></i>אינן בטילים בששים (בארוך כלל כ"ה עיין ס"ק כ"ז וע"ל סוף סימן ק"ה):</small>
**** ENGLISH ****
Cheese is nullified in one part in fifty-nine: {Rama: All prohibitions practiced in our time are nullified in sixty except chametz on Pesach and yayin nesekh as explained in their laws (Tur); provided the forbidden item does not impart taste in the pot; but if it imparts taste in that pot and it is forbidden in itself, even in a thousand it is not nullified as long as its taste is sensed; therefore salt and spices, which are made for taste — if they are forbidden in themselves — are not nullified in sixty (Arukh general rule 25 — see s.k. 27 and see above end of siman 105).}
**** END BLOCK ****
```

### 35. `siman_098/mechaber/part-001.txt` — mechaber — seif 9 — marker `main`

- Quality: **ok**
- Checkpoint id: `siman_098/mechaber/part-001.txt#slug=mechaber#seif=9#marker=main`

```text
**** YD001 SOURCE BLOCK ****
slug: mechaber
seif: 9
marker: main
**** HEBREW ****
<i data-commentator="Be'er HaGolah" data-order="18"></i><i data-commentator="Peleti" data-order="11"></i>קדירה שיש בה נ"ט זיתים היתר ונפלו בה ב' זיתים א' של דם וא' של חלב <i data-commentator="Siftei Kohen" data-order="33"></i><i data-commentator="Pithei Teshuva" data-order="10"></i>כל א' <i data-commentator="Pithei Teshuva" data-order="11"></i><i data-commentator="Ba'er Hetev" data-order="20"></i>מצטרף עם הנ"ט של היתר <i data-commentator="Kereti" data-order="24"></i>לבטל חבירו <i data-commentator="Turei Zahav" data-order="13"></i><i data-commentator="Siftei Kohen" data-order="34"></i><i data-commentator="Beur HaGra" data-order="37"></i><i data-commentator="Be'er HaGolah" data-order="19"></i>וכן כ"ט זיתים של היתר שנפל בהם כזית חלב ובקדרה אחרת היו שלשים של היתר ונפל לתוכו כזית של דם <i data-commentator="Turei Zahav" data-order="14"></i><i data-commentator="Siftei Kohen" data-order="35"></i>ונתערבו <i data-commentator="Ba'er Hetev" data-order="21"></i><i data-commentator="Beur HaGra" data-order="38"></i>בשוגג מותר. <i data-commentator="Beur HaGra" data-order="39"></i>(וכ"ש בב' זיתים <i data-commentator="Pithei Teshuva" data-order="12"></i>אחד <i data-commentator="Turei Zahav" data-order="15"></i>של גבינה ואחד של בשר דכל אחד <i data-commentator="Ba'er Hetev" data-order="22"></i>מבטל חבירו) (בארוך כלל ארבעה ועשרים):
**** ENGLISH ****
A pot that has fifty-nine olive-volumes of permitted food and two olive-volumes fell into it — one of blood and one of milk — each one combines with the fifty-nine of permitted food to nullify the other. And likewise fifty-nine olive-volumes of permitted food into which an olive-volume of milk fell, and in another pot there were thirty of permitted food and an olive-volume of blood fell into it and became mixed with the milk — each forbidden item combines with the permitted food in its pot to nullify the other.
**** END BLOCK ****
```

### 36. `siman_098/nekudot-hakesef/part-001.txt` — nekudot-hakesef — seif 1 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/nekudot-hakesef/part-001.txt#slug=nekudot-hakesef#seif=1#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: nekudot-hakesef
seif: 1
marker: _
**** HEBREW ****
<b>(סימן צ"ח בט"ז ס"ק ה') ולע"ד נרא' דברי הרשב"א נכונים כו'. </b>כבר כ"כ הב"ח אבל כבר הקשיתי עליו בש"ך סק"ח דעדיין קשה מנין לנו להמציא היתר כיון דל"ד כלל ויש טעם נכון לחלק ביניהם דהכא נרגש הטעם ודו"ק:
**** ENGLISH ****
(siman 98 in Taz ס"ק ה') ולע"ד נרא' דברי הרשב"א נכונים כו'. כבר כ"כ הב"ח אבל כבר הקשיתי עליו in Shach סק"ח דעדיין קשה מנין לנו להמציא היתר כיון דל"ד כלל ויש טעם נכון לחלק ביניהם דהכא נרגש הטעם ודו"ק:
**** END BLOCK ****
```

### 37. `siman_098/nekudot-hakesef/part-001.txt` — nekudot-hakesef — seif 2 — marker `_`

- Quality: **error** — hebrew_in_english, untranslated_copy
- Checkpoint id: `siman_098/nekudot-hakesef/part-001.txt#slug=nekudot-hakesef#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: nekudot-hakesef
seif: 2
marker: _
**** HEBREW ****
(שם ס"ק ו') הקשה מסי' פ"א והאריך בזה וכל דבריו דחוקים ומעיקרא לק"מ דהכא הוי שפיר חסרון חכמה כיון דלא אפשר לעמוד על שעורו אבל התם מדינא כשר דהא אפשר למיבדק בפושרין ובנפיחה אלא דמחמרינן ואמרינן דלא בקיאי אנן בבדיקה הילכך ודאי ספק מעליא הוא ודו"ק:
**** ENGLISH ****
(שם ס"ק ו') הקשה מסי' פ"א והאריך בזה וכל דבריו דחוקים ומעיקרא לק"מ דהכא הוי שפיר חסרון חכמה כיון דלא אפשר לעמוד על שעורו אבל התם מדינא כשר דהא אפשר למיבדק בפושרין ובנפיחה אלא דמחמרינן ואמרינן דלא בקיאי אנן בבדיקה הילכך ודאי ספק מעליא הוא ודו"ק:
**** END BLOCK ****
```

### 38. `siman_098/nekudot-hakesef/part-001.txt` — nekudot-hakesef — seif 3 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/nekudot-hakesef/part-001.txt#slug=nekudot-hakesef#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: nekudot-hakesef
seif: 3
marker: _
**** HEBREW ****
<b>(שם ס"ק ח') ומה שנרשם במ"מ על ההג"ה ולא אמרינן גבי כלים וכו' אותו המעתיק טעה וכו'. </b>כבר כתבתי כן בש"ך במראה מקום שלי על הגליון:
**** ENGLISH ****
(שם ס"ק ח') ומה שנרשם במ"מ על ההג"ה ולא אמרינן גבי כלים וכו' אותו המעתיק טעה וכו'. כבר כתבתי כן in Shach במראה מקום שלי על הגליון:
**** END BLOCK ****
```

### 39. `siman_098/nekudot-hakesef/part-001.txt` — nekudot-hakesef — seif 4 — marker `_`

- Quality: **error** — hebrew_in_english, untranslated_copy
- Checkpoint id: `siman_098/nekudot-hakesef/part-001.txt#slug=nekudot-hakesef#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: nekudot-hakesef
seif: 4
marker: _
**** HEBREW ****
(שם) ושם <b>ובאמת אין זה ראיה דגם שמיש היתר וכמ"ש סימן צ"ב כ"ד וכ"כ האו"ה כלל כ"ד וכו'. </b>לא ידענא מאי קאמר ומאי היתר יש שם הלא טפת חלב שנפלה על מקום הריקן שבקדרה טעמא דאסור משום דהבלוע בה נעשה נבלה ואם כן שפיר מייתי רמ"א ראיה:
**** ENGLISH ****
(שם) ושם ובאמת אין זה ראיה דגם שמיש היתר וכמ"ש סימן צ"ב כ"ד וכ"כ האו"ה כלל כ"ד וכו'. לא ידענא מאי קאמר ומאי היתר יש שם הלא טפת חלב שנפלה על מקום הריקן שבקדרה טעמא דאסור משום דהבלוע בה נעשה נבלה ואם כן שפיר מייתי רמ"א ראיה:
**** END BLOCK ****
```

### 40. `siman_098/nekudot-hakesef/part-001.txt` — nekudot-hakesef — seif 5 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/nekudot-hakesef/part-001.txt#slug=nekudot-hakesef#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: nekudot-hakesef
seif: 5
marker: _
**** HEBREW ****
(שם) ושם <b>ונ"ל ברור דהמרדכי לא מיירי אלא לענין כו'. </b>וזה אינו דמודה המרדכי דגוף החרס לא נעשה נבלה וכמ"ש המהרש"ל והב"ח וכמ"ש בש"ך סק"כ:
**** ENGLISH ****
(שם) ושם ונ"ל ברור דהמרדכי לא מיירי אלא לענין כו'. וזה אינו דמודה המרדכי דגוף החרס לא נעשה נבלה וכמ"ש המהרש"ל והב"ח וכמ"ש in Shach סק"כ:
**** END BLOCK ****
```

### 41. `siman_098/nekudot-hakesef/part-001.txt` — nekudot-hakesef — seif 6 — marker `_`

- Quality: **info** — divine_name_style
- Checkpoint id: `siman_098/nekudot-hakesef/part-001.txt#slug=nekudot-hakesef#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: nekudot-hakesef
seif: 6
marker: _
**** HEBREW ****
<b>(שם ס"ק י"ד) אבל לדידן. </b>ובש"ך סקל"ד כתבתי נמי לדידן ע"ש:
**** ENGLISH ****
(It's the name of C.J.), but to Dan. I have written my name to the Lord:
**** END BLOCK ****
```

### 42. `siman_098/peleti/part-001.txt` — peleti — seif 1 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/peleti/part-001.txt#slug=peleti#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: peleti
seif: 1
marker: א
**** HEBREW ****
חלב בבשר עי' ש"ך דחלב ובשר אינו שוים בטעמא וכ"כ הפר"ח דאף לענין מין במינו קרוי בשר ושוין בשמא מ"מ לענין ס' טעמא מחולקים. והנה בשמעתין ג"ה דף צ"ו משמע בגמ' ותוס' הפוך חלב ובשר בלתי שוים בשמא אבל טעמא בשר שומן וחלב שוים דהתוס' בפרק ג"ה דף צ"ו ד"ה שאני דהקשו בהא דאר"ה גדי שצלאו בחלבו אסור לאכול אפילו מראש אזנו ומוקי דשאני חלב דמפעפע והקשו הא שומן הגיד נמי מפעפע ומוכח דע"כ ס"ל דאף בטעמא שוים דאל"כ מה קושי' וכי ודאי דמפעפע י"ל דמפעפע ולכך לדעת הש"ע לקמן ק"ה אף דיש ס' מ"מ נטילה בעי דאולי לא מפעפע בכולו ועי' חולין דף ק' דכתבו התוס' קצת ספק בפעפע החלב ע"ש ורק מספיקא אסרינן דלא גרע מנשפך וה"מ באיסור תורה לחומרא אבל בשומנו של גיד דהוא דרבנן ורק ישראל קדושים נהגו בו איסור א"כ לו יהי' דנשפך מ"מ מותר ואיסור קל ספיקא לקולא וע"כ צ"ל דס"ל חלב בבשר מין במינו הוא וא"כ אלו מספקא לן הא מין במינו אפילו באיסור תורה לקולא כדלקמן בנשפך וע"כ דוודאי מפעפע ושפיר פריך אך לכאורה יש סתירה דא"כ מה פריך הגמ' מרב הונא דאוסר גדי שצלאו בחלב אר"י דקאמר קולף ואוכל דילמא הך חלב דמפעפע אינו ודאי כמ"ש ור"י לטעמי' דס"ל דמין במינו בטל ה"ל ספיקא דרבנן דחלב בבשר מין במינו ושרי אבל רב הונא תלמיד דרב וכרב ס"ל כסוגי' דגמ' דשבת וכיון דמין במינו לא בטל וא"כ ה"ל ספיקא תורה ואסור בשלמא הא לא קשי' דילמא היה ס' ור"ה אוסר דס"ל מין במינו לא בטל דזה ידע גמ' סתם גדי שאינו כחוש אינו ס' נגד חלבו אבל הנ"ל קשה וצריך להיות דחלב ובשר בלתי שוים בשמא דזהו מיקרי חלב וזהו בשר אבל טעמם בבשר שוה כמ"ש הש"ך בשר שמן ואם כן דברי התוס' נכונים וקושי' הגמ' שפיר דל"ל ר"ה ס"ל לאיסור תורה דלענין מין במינו ל"ב אזנינן בתר שמא וא"כ ל"ל דלכך אוסר ר"ה דמין במינו ל"ב דהא קרוי אין מינו אבל לעיל ס"ל לתוס' דע"כ לענין טעמא הוי במינו וא"כ אי מספקא אי מפעפע הוי שרי דזה תלי' בטעמא וטעמא הוי מין במינו ודו"ק: ובהא יש ליישב דמתחל' פריך הגמ' על מילתא דשמואל מהך דר"ה דאסור לגדי שצלאו ולבתר דשני חלב מפעפע פריך דר"י התיר בכה"ג ודקארי לי' מה קארי להקשות אשמואל כיון דר"י כוותי' ואין לו כמעט המשך בגמ' ולפמ"ש ניחא דהגמ' לא רצה להקשות מר"י דאולי חלב ובשר מין א' אף בשמא כדעת הראב"ד ורשב"א ור"ן באמת ולק"מ כמ"ש דר"י דס"ל מין במינו מותר היקל ור"ה ע"ל מין במינו ל"ב החמיר אבל השתא דמשני חלב מפעפע ושומן גיד כחוש כמ"ש תוס' ס"ל לגמ' כיון דעל כל פנים חלב הוא רק שאינו מפעפע כ"כ להתפשט בכל נ"ט לגמרי משהו מיהא איכא שמתפשט וזהו לא ימלט וע"כ קשי' לשמואל דס"ל מין במינו במשהו וע"כ צ"ל דחלב ושומן לענין שם קרוי' אינו מינו וא"כ קשי' ר"ה אר"י ודו"ק. מיהו לפי סברה זו קשה הא דהקשו התוס' הא שומן הגיד מפעפע ותי' דשומן הגיד דרבנן א"צ לכל זה ולדידן צ"ל באמת הא דאמרינן מפעפע לא מפעפע בנ"ט רק במשהו רק קושי' התוס' דדבר הנאסר בכדי נטילה חוזר ואוסר וכן כולם במקומו ול"ל תי' התוס' דאין הנאסר וכו' כיון דמשהו מן איסור הולך עמו וחלב מפעפע דמשהו הולך עמו ולכך אסור אבל גיד לשמואל ל"ק דשמואל לא ס"ל חתיכה נ"נ ולא שייך דקליפר יחזור ויאסור וא"כ ל"ק וצ"ע ועמש"ל סי' צ"ב וצריך לומר דבדף צ"ז ע"ב מסייע רבינא מהך מימרא לא שנו אלא נתבשל וכו' ואם כן קשי' לרבינא ורבינא וודאי ס"ל חנ"נ וע"כ צ"ל דליתא ודברי התוס' מוכרחים דלכ"ע אמרינן דשומן של גיד אינו מפעפע ודו"ק:
**** ENGLISH ****
חלב בmeat עי' ש"ך דחלב וmeat אינו שוים בטעמא and so too הPeri Chadash דeven regarding species in its species קרוי meat ושוין בlest nevertheless regarding sixty טעמא מdisagreesים. והנה בשמעתין ג"ה daf צ"ו it appears בגמ' ותוsixty הפוך חלב וmeat בלתי שוים בlest אבל טעמא meat שומן וחלב שוים דהתוsixty בchapter 3 daf צ"ו s.v. this case is different דהקשו בהא דאר"ה גדי שצלאו בחלבו forbidden לאכול אפילו מראש אזנו ומוקי דthis case is different חלב דמפעפע והקשו הא שומן הגיד נמי מפעפע וproven דuntil here ס"ל דeven בטעמא שוים דאל"כ מה קושי' וכי certainly דמפעפע י"ל דמפעפע ולכך לדעת הש"ע below ק"ה even דיש sixty nevertheless נטילה בעי דאולי לא מפעפע בכולו ועי' חולין daf ק' דכתבו התוsixty קצת doubt בפעפע the milk see there ורק מספיקא אסרינן דלא גרע מנשפך וה"מ באיסור תורה לstringency אבל בשומנו של גיד דהוא d'rabbanan ורק ישראל קדושים they practiced בו איסור if so לו יהי' דנשפך nevertheless permitted ואיסור קל ספיקא לקולא וuntil here one must say דס"ל חלב בmeat species in its species הוא וif so אלו מdoubtא לן הא species in its species אפילו באיסור תורה לקולא כדbelow בנשפך וuntil here דוcertainly מפעפע וwell fruitך אך it appears יש סתירה דif so מה fruitך הגמ' מרב הונא דאוסר גדי שצלאו בחלב אר"י דקאמר קולף ואוכל lest הך חלב דמפעפע אינו certainly כwhat he wrote ור"י לטעמי' דס"ל דspecies in its species בטל ה"ל ספיקא d'rabbanan דחלב בmeat species in its species ושרי אבל רב הונא תלמיד דרב וכרב ס"ל כסוגי' דגמ' דשבת וכיון דspecies in its species לא בטל וif so ה"ל ספיקא תורה וforbidden בשלמא הא לא קשי' lest היה sixty ור"ה אוסר דס"ל species in its species לא בטל דזה ידע גמ' stam גדי שאינו כחוש אינו sixty נגד חלבו אבל הit appears to me קשה וצריך להיות דחלב וmeat בלתי שוים בlest דזהו מיקרי חלב וזהו meat אבל טעמם בmeat שוה כwhat he wrote Shach meat שמן וif so דברי התוsixty נכונים וקושי' הגמ' well דל"ל ר"ה ס"ל לאיסור תורה דregarding species in its species ל"ב אזנינן בתר lest וif so ל"ל דלכך אוסר ר"ה דspecies in its species ל"ב דהא קרוי אין מינו אבל above ס"ל לתוsixty דuntil here regarding טעמא הוי במינו וif so אי מdoubtא אי מפעפע הוי שרי דזה תלי' בטעמא וטעמא הוי species in its species investigate: ובהא יש לresolved דמתחל' fruitך הגמ' על מילתא דשמואל מהך דר"ה דforbidden לגדי שצלאו ולבתר דשני חלב מפעפע fruitך דר"י התיר בsuch a case ודקארי לי' מה קארי לchallenges אשמואל כיון דר"י כוותי' ואין לו כמעט המשך בגמ' ולפwhat he wrote ניחא דהגמ' לא רצה לchallenges מר"י דאולי חלב וmeat מין א' even בlest כדעת הראב"ד ורשב"א ור"ן באמת ולק"מ כwhat he wrote דר"י דס"ל species in its species permitted היקל ור"ה ע"ל species in its species ל"ב החמיר אבל now דמשני חלב מפעפע ושומן גיד כחוש כwhat he wrote תוsixty ס"ל לגמ' כיון דעל כל פנים חלב הוא רק שאינו מפעפע כ"כ להתפשט בכל נ"ט לגמרי משהו מיהא there is שמתפשט וזהו לא ימלט וuntil here קשי' לשמואל דס"ל species in its species במשהו וuntil here one must say דחלב ושומן regarding שם קרוי' אינו מינו וif so קשי' ר"ה אר"י investigate. מיהו לפי סברה זו קשה הא דהקשו התוsixty הא שומן הגיד מפעפע ותי' דשומן הגיד d'rabbanan א"צ לכל זה וfor us one must say באמת הא דאמרינן מפעפע לא מפעפע בנ"ט רק במשהו רק קושי' התוsixty דדבר הנאסר בthe measure of נטילה חוזר ואוסר וכן כולם במקומו ול"ל תי' התוsixty דאין הנאסר etc. כיון דמשהו מן איסור הולך עמו וחלב מפעפע דמשהו הולך עמו ולכך forbidden אבל גיד לשמואל ל"ק דשמואל לא ס"ל חתיכה נ"נ ולא שייך דקליפר יחזור ויforbidden וif so ל"ק וrequires study ועמש"ל סי' one must examine וצריך לומר דבdaf צ"ז side 2 מסייע רבינא מהך מימרא לא שנו אלא was cooked etc. וif so קשי' according to Ravינא ורבינא וcertainly ס"ל chein nafsho וuntil here one must say דליתא ודברי התוsixty מוכרחים דלכ"ע אמרינן דשומן של גיד אינו מפעפע investigate:
**** END BLOCK ****
```

### 43. `siman_098/peleti/part-001.txt` — peleti — seif 1 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/peleti/part-001.txt#slug=peleti#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: peleti
seif: 1
marker: ב
**** HEBREW ****
יטמענו וכו' עיין ש"ך שהאריך למה יהיה מל"ת נאמן באיסור תורה וכתב דאפשר דעת המקילי' משום דס"ל טעם כעיקר ל"ד וכן משמע מדברי ת"ה ואני לא הבנתי הא בגמ' קאמרי' קפילא ולפי המכשירין במל"ת לבד היינו משום דס"ל קפילא ל"ד וקשה הא בגמ' אמרינן תרומה טעי' לי' כהן אלא קדירה של חלב שבישל בה בשר מאן טעים לי' ומשני קפילא ולפי פירושם קפילא ל"ד דאם בגמ' דוקא אין לנו לחדש מה דלא היתר הגמ' וא"כ בב"ח לכ"ע טעם כעיקר דאורייתא כמבואר בחולין ובפסחים רק דלא ילפינן מיני' מכח חדושו וא"כ עדיין קשה איך נאמן במסל"ת ועוד קשה הא דקאמר הגמ' מריש ה"א מאן טעים לי' כיון דשמענא להא דר"י דאמר יטעום קפילא ה"נ וקשה להנך רבותא דס"ל טעם כעיקר ל"ד מתחילה מה קסבר לבסוף מה קסבר וכי לא ידע מתחלה דיש מציאות לטעום זה רק צריך להיות דס"ל דלא מהימן וקשה עדיין איך פשטו מר"י דהורה כן בכילכית באלפס דהוא דרבנן למ"ד טכ"ע ל"ד לקדירה שבישל בו בשר דהוי דאורייתא ודוחק לומר דלמ"ד כילכית דג טהור קשה מה שאלו לר"י על כילכית שבאלפס ודוחק לומר משום כנת' שאלו רק צ"ל כילכית היה נתבשל תחלה בחלב ונפל לאלפס בשר וא"כ אף ר"י ס"ל בב"ח טעימת קפילא וזה דוחק: והנה העיקר אגיד שדברי הרשב"א בחידושיו חולין בשמעת' דטעם כעיקר אחר שבירר דעת רש"י וסייעו כאומרים עכ"ע ל"ד כתב וז"ל נמצא פסקן של דברים לרש"י ז"ל אם נתחבה כף של איסור בתוך תבשיל או כף חולבת בתוך יורה של בשר וכן להיפוך וכו' וקודם שהספיק לשער אם יש בו ס' נשפך וכו' הולכין להקל ומתירין מספק דהוי לי' ספיקא דרבנן עכ"ל. וקשה ליג"כ כנ"ל מה ענין בב"ח למחלוקת רש"י ור"ת הא בב"ח ודאי דאורייתא כמ"ש הרשב"א גופי' שם. ולכן היה נראה כיון דלכך ס"ל לרש"י טכ"ע ל"ד משום דגעולי עכו"ם חידוש הוא אפילו דנימא דלא אסרה התורה אלא קדירה בת יומא א"א דלא פגמה פורתא ולכך לא ילפינן מיני' א"כ כל קדירות הבלועים אפי' בת יומא הם פגומים ולא אוסרין כלל דהא זה חידושו של גיעולי עכו"ם ולא ילפינן מיני' וא"כ לשיט' רש"י אף בב"ח הכלי אף ב"י הא פגום קצת ואינו אוסר או י"ל דלכאורה דכלי בלוע איסור ילפינן מגעולי עכו"ם דמ"ש רק כי ילפינן בלע איסור דזה ממש גיעולי עכו"ם בלע איסור ומ"ש כלי ישראל בלע איסור אבל בבלע בשר דהיתר' בלע אינו בכלל גיעולי מדין דחידוש הוא ולא ילפינן כלל מן גיעולי א"י ועכ"ע ל"ד אבל באמת דהרשב"א כ' להדיא אף בתוחב כף איסור לתבשיל ג"כ לדעת רש"י מדרבנן וצ"ל דוקא געולי עכו"ם ולא כלי של ישראל אף דבלע איסור. וכן במשמרת הבית דף קכ"ג דתי' לרמב"ן על קושית התוס' האיך הגעילו במדין יורות גדולה דהא חנ"נ ותירץ דלמ"ד טעם כעיקר לאו תורה לק"מ. ולכאורה תמי' אף דלאו דאורייתא בגעולי מדין ודאי תורה רק דלא ילפינן מיני' ואנן בהך גופי' קא קשיא לן. וצ"ל דס"ל ודאי אף לרבינו אפרים צריך להיות דהגעילו שני פעמים רק הקושיא הוא למ"ד דאמרינן חנ"נ בכל איסורין לא יועיל הגעלה שני פעמים דמי הגעלה חוזרים ונעשים נ"נ. ולפ"ז לק"מ כי אסרה תורה בכלי בלוע איסור בשל א"י ולא אם אנן מבשלין חלב בקדירה. ולפ"ז כשהגעילו היורת פלט האיסור הבלוע משל א"י לתוך מי הגעלה ואי דמים נ"נ וחוזרים ונבלע ביורה הך בלוע שנייה הוא בליעה דידן טכ"ע ל"ד. ואם כן אתא שפיר דסמכינן אקפילא אפילו בב"ח דגם בזה טעם כעיקר בבלוע בכלי לאו דאורייתא ודו"ק: אמנם לדעת הסוברים טכ"ע דאורייתא צריך להיות דס"ל להלכה כר' יוחנן דס"ל כר"ע דמשרת להיתר מצטרף לאיסור וטכ"ע ילפינן מגעולי א"י דלא הוי חידוש כלל דנ"ל כרבנן דמשרת לטכ"ע כמ"ש הרמב"ם וגעולי א"י חידוש וא"כ אף לשיטה ההוא בתוחב כף איסור ליכא איסור תורה דהוה פגום אלא דס"ל כר"ע ואין חידוש בגעל א"י. אלא דקשי' לי' לשיטת האומרי' טכ"ע ל"ד הא דפרכינן בזבחים פרק דם חטאת ר"י דרש אותה פרט לתרומה דאין צריך מריקה ופריך הגמ' תרומה לא והתנן קדירה שבישל בה תרומה לא יבשל חולין ואם בישל בנ"ט וקשה הא בתרומה טכ"ע לאו דאורייתא וא"כ דבר תורה מותר לבשל בקדירה של תרומה רק מדרבנן אסור א"כ מאי פריך ליה מקרא אותה פרט לתרומה הא מהתורה א"צ כלום וי"ל דאף דטכ"ע ל"ד כלי הבלוע מאיסור ודאי ד"ת להגעלה דמ"ש בלוע איסור מא"י או בכלים דידן והיינו חדושו לאסור בלוע בכלי ל"ד רק הכוונה כלים הבלועים ומעשה שהיה בא"י אבל לדינא הכל חד וא"כ שפיר קפריך דזהו הגעלתו ד"ת אלא לפי הנ"ל דאפי' בב"ח ושאר איסורין לא אמרינן וגעולי א"י דוקא א"כ קשה ודאי אם אמרינן כחד טעמא של רש"י דלכך טכ"ע לאו דאורייתא משום דהוה געולי נכרים ומשרת ב' כתובים א"כ ר' יהודא דשמעינן לי' בעלמא דס"ל ב' כתובים מלמדין הוי דאורייתא והקו' שם לר"י דדריש אותה פרט לתרומה אבל לפי הנראה ממש"ל עיקר הטעם דגעולי א"י חידוש הוא קו' הנ"ל במקומו וצ"ע ובגוף הקו' נ"ל פשוט כי ודאי אף שאנו מתירין ודאי אם אח"כ יטעמנו ישראל וימצא בו טעם איסור פשיטא דאסור דכותי שיקר בדבריו וכמ"ש כל פוסקים ואם לא הרגיש טעם הרי הוא כדאי להתיר דעל טעימת ישראל סמכינן על הכל אפילו אינו אומן ואם כן החרדה שאנו מצריכן קפילא כדי להתיר להטעימו ישראל דאולי אסור הוא קטעם ישראל מתחילה טעם דאיסורה וזהו כמו שכתוב ריב"ש רק מדרבנן אסור כיון דהוא רק טעימא בעלמא כנודע ואם כן הוי מילתא דרבנן שפיר יש לסמוך אעכו"ם ולק"מ ואין צריך לכל דבריהם באריכות אבל דין הנ"ל אם למ"ד טכ"ע ל"ד למאן דאמר בליעת כלי הוי דאורייתא ובפרט בב"ח צ"ע רבתי והוא מבוא גדול בדין או"ה ולק"מ:
**** ENGLISH ****
יטמענו etc. עיין ש"ך שהאריך למה יהיה מל"ת נאמן באיסור תורה וwrote דאפשר דעת one who is lenientי' becauseס"ל טעם כעיקר some say וכן it appears מדברי ת"ה ואני לא הבנתי הא בגמ' קאמרי' קפילא ולפי המכשירין במל"ת לבד that is becauseס"ל קפילא some say וקשה הא בגמ' אמרינן תרומה טעי' לי' כהן אלא קדירה של חלב שcooked בה meat מאן טעים לי' ומשני קפילא ולפי Explanation:ם קפילא some say דאם בגמ' specifically אין לנו לחדש מה דלא היתר הגמ' וif so בב"ח לכ"ע טעם כעיקר d'oraisa כexplained בחולין ובפסחים רק דלא ילפינן מיני' מכח חדושו וif so עדיין קשה איך נאמן במסל"ת ועוד קשה הא דקאמר הגמ' מריש ה"א מאן טעים לי' כיון דשמענא להא דר"י דאמר יטעום קפילא ה"נ וקשה להנך רבותא דס"ל טעם כעיקר some say מfirst מה קסבר לat the end מה קסבר וכי לא ידע מתחלה דיש מציאות לטעום זה רק צריך להיות דס"ל דלא מהימן וקשה עדיין איך פשטו מר"י דהורה כן בכילכית באלפס דהוא d'rabbanan למ"ד טכ"ע some say לקדירה שcooked בו meat דהוי d'oraisa וforced לומר דלמ"ד כילכית pure fish קשה מה שאלו לר"י על כילכית שבאלפס וforced לומר because כנת' שאלו רק one must say כילכית היה was cooked תחלה בחלב וfell לאלפס meat וif so even ר"י ס"ל בב"ח טעימת קפילא וזה forced: והנה העיקר אגיד שדברי Rashba בחידושיו חולין בשמעת' דטעם כעיקר אחר שבירר דעת רש"י וסייעו כאומרים עכ"ע some say wrote וand these are his words is found ruledן של דברים לרש"י and these are his words אם נstuck inה spoon של איסור בתוך dish או spoon חולבת בתוך cauldron של meat וכן להיפוך etc. וקוblood שהספיק לשער אם יש בו sixty נשפך etc. הולכין to be lenient ומתירין מdoubt דהוי לי' ספיקא d'rabbanan end of his words. וקשה ליג"כ כit appears to me מה ענין בב"ח למחלוקת רש"י ור"ת הא בב"ח certainly d'oraisa כwhat he wrote Rashba גופי' שם. ולכן היה it appears כיון דלכך ס"ל לרש"י טכ"ע some say becauseגעולי non-Jew חידוש הוא אפילו דנימא דלא אסרה התורה אלא קדירה ben yomo א"א דלא פגמה פורתא ולכך לא ילפינן מיני' if so כל pots הabsorbedים even ben yomo הם פגומים ולא אוסרין כלל דהא זה חידושו של purgingי non-Jew ולא ילפינן מיני' וif so לשיט' רש"י even בב"ח the vessel even ben yomo הא spoiled קצת ואינו אוסר או י"ל דit appears דכלי absorbed איסור ילפינן מגעולי non-Jew דwhat he wrote רק כי ילפינן absorbed איסור דזה ממש purgingי non-Jew absorbed איסור וwhat he wrote כלי ישראל absorbed איסור אבל בabsorbed meat דהיתר' absorbed אינו בכלל purgingי מדין דחידוש הוא ולא ילפינן כלל מן purgingי א"י ועכ"ע some say אבל באמת דRashba wrote להדיא even בתוחב spoon איסור לdish ג"כ לדעת רש"י d'rabbanan וone must say specifically געולי non-Jew ולא כלי של ישראל even דabsorbed איסור. וכן במשמרת הבית daf קכ"ג דתי' לרמב"ן על קושית התוsixty האיך purgedו במדין יורות גדולה דהא chein nafsho וresolved דלמ"ד טעם כעיקר לאו תורה לק"מ. וit appears תמי' even דלאו d'oraisa בגעולי מדין certainly תורה רק דלא ילפינן מיני' ואנן בהך גופי' קא קשיא לן. וone must say דס"ל certainly even according to Ravינו אfruitם צריך להיות דpurgedו שני פעמים רק הקושיא הוא למ"ד דאמרינן chein nafsho בכל איסורין לא יועיל הגcame up שני פעמים דמי הגcame up חוnon-priests ונעשים נ"נ. וaccordingly לק"מ כי אסרה תורה בכלי absorbed איסור בשל א"י ולא אם אנן cooksין חלב בקדירה. וaccordingly כשpurgedו היורת פלט האיסור הabsorbed משל א"י לתוך מי הגcame up ואי דמים נ"נ וחוnon-priests ונabsorbed בcauldron הך absorbed שנייה הוא בליעה דידן טכ"ע some say. וif so אתא well דסמכינן אקפילא אפילו בב"ח דגם בזה טעם כעיקר בabsorbed בכלי לאו d'oraisa investigate: אמנם לדעת הסוברים טכ"ע d'oraisa צריך להיות דס"ל לthe halachah כר' יוחנן דס"ל כר"ע דמשרת להיתר מצטרף לאיסור וטכ"ע ילפינן מגעולי א"י דלא הוי חידוש כלל דit appears to me כרבנן דמשרת לטכ"ע כwhat he wrote Rambam וגעולי א"י חידוש וif so even לשיטה ההוא בתוחב spoon איסור there is not איסור תורה דהוה spoiled אלא דס"ל כר"ע ואין חידוש בגעל א"י. אלא דקשי' לי' לשיטת האומרי' טכ"ע some say הא דפרכינן בזבחים פרק blood sin offering ר"י דרש אותה פרט לתרומה דאין צריך מריקה וfruitך הגמ' תרומה לא והתנן קדירה שcooked בה תרומה לא יבשל חולין ואם cooked בנ"ט וקשה הא בתרומה טכ"ע לאו d'oraisa וif so דבר תורה permitted לבשל in a pot of תרומה רק d'rabbanan forbidden if so מאי fruitך ליה מקרא אותה פרט לתרומה הא מהתורה א"צ כלום and one may say דeven דטכ"ע some say כלי הabsorbed מאיסור certainly ד"ת להגcame up דwhat he wrote absorbed איסור מא"י או vessels דידן וthat is חדושו לforbidden absorbed בכלי some say רק הכוונה כלים הabsorbedים ומעשה שהיה בא"י אבל לthe halachah הכל חד וif so well קfruitך דזהו הגעלתו ד"ת אלא לפי הit appears to me דeven בב"ח ושאר איסורין לא אמרינן וגעולי א"י specifically if so קשה certainly אם אמרינן כחד טעמא של רש"י דלכך טכ"ע לאו d'oraisa becauseהוה געולי נכרים ומשרת ב' כתובים if so ר' יהודא דשinnardsנן לי' mere דס"ל ב' כתובים מלמדין הוי d'oraisa והקו' שם לר"י דדריש אותה פרט לתרומה אבל לפי הit appears ממש"ל עיקר the taste דגעולי א"י חידוש הוא קו' הit appears to me במקומו וrequires study וin the substance הקו' it appears to me plain כי certainly even שאנו מתירין certainly אם afterward יטעמנו ישראל וימצא בו טעם איסור פשיטא דforbidden דכותי שיקר בדבריו וכwhat he wrote כל poskim ואם לא הרגיש טעם הרי הוא כדאי להתיר דעל טעימת ישראל סמכינן על הכל אפילו אינו אומן וif so החרדה שאנו מצריכן קפילא the measure of להתיר להטעימו ישראל דאולי forbidden הוא קטעם ישראל מfirst טעם דאיסורה וזהו כמו שכתוב ריב"ש רק d'rabbanan forbidden כיון דהוא רק טעימא mere כנודע וif so הוי מילתא d'rabbanan well one may rely אnon-Jew ולק"מ ואין צריך לכל דבריהם באריכות אבל דין הit appears to me אם למ"ד טכ"ע some say למאן דאמר absorption of כלי הוי d'oraisa וin particular בב"ח requires study רבתי והוא מבוא גדול בדין Issur VeHeter ולק"מ:
**** END BLOCK ****
```

### 44. `siman_098/peleti/part-001.txt` — peleti — seif 2 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/peleti/part-001.txt#slug=peleti#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: peleti
seif: 2
marker: א
**** HEBREW ****
ונשפך וכו' ואין לפקפק הא ה"ל אתחזיק איסורא דוודאי דאיסור נפל וא"כ דעת הרבה פוסקים דבאתחזיק איסורא אף בדרבנן ספק להחמיר ועיין לקמן בכלל ס"ס וצ"ל דכי אמרינן כן בדליכא חזקת היתר מנגדו אבל כאן הא הקדירה טרם שנפל הי' לו חזקת היתר אמרינן אוקמי הקדירה אחזקת היתר ולא מהני ליה חזקת איסור ואדרבה אפילו מין בשאינו מינו יש לפקפק דלמה נחמיר ולא נימא העמיד הקדירה על חזקת היתר וצריך להיות דאתרע הואיל וראינו דנפל אבל על כל פנים אתחזק איסורא לא שייך כאן דאיכא חזקה הנ"ל ואין זה סיוע למה שכתב הט"ז לעיל בסי' ס"ט בחתיכה שמסופק אם הוציא דמועל ידי מליחה דהוה ליה ספיקא דרבנן דשם אתחזק איסורא וגם חזקה דהחתיכה היא כמו שהיה מתחילה ומתחילה לא יצא דם ואף עכשיו כן והיה חזקה גוף אלים מחזקת היתר ועיין מה שכתבתי לעיל:
**** ENGLISH ****
ונשפך etc. ואין לפקפק הא ה"ל אתחזיק איסורא דוcertainly דאיסור fell וif so דעת הרבה poskim דבאתחזיק איסורא even בd'rabbanan doubt להחמיר ועיין below בכלל end of seif וone must say דכי אמרינן כן בדthere is not presumption of היתר מנגדו אבל כאן הא הקדירה טרם שfell הי' לו presumption of היתר אמרינן we establish הקדירה אpresumption of היתר ולא מהני ליה presumption of איסור ואדרבה אפילו מין בשאינו מינו יש לפקפק דלמה נחמיר ולא נימא העמיד הקדירה על presumption of היתר וצריך להיות דאתרע הואיל וראינו דfell אבל על כל פנים אתחזק איסורא לא שייך כאן דthere is חזקה הit appears to me ואין זה סיוע למה שwrote Taz above בסי' seif 9 בחתיכה שמסופק אם הוציא דמועל ידי saltedה דהוה ליה ספיקא d'rabbanan דשם אתחזק איסורא וגם חזקה דהחתיכה היא כמו שהיה מfirst ומfirst לא יצא blood וeven now כן והיה חזקה גוף אלים מpresumption of היתר ועיין מה שI wrote above:
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_098
npm run pipeline:editorial:advance -- --siman 98
```

## Checkpoint ids

siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=9#marker=_
siman_098/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%90
siman_098/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%91
siman_098/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%92
siman_098/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%93
siman_098/kereti/part-001.txt#slug=kereti#seif=1#marker=%D7%94
siman_098/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%90
siman_098/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%91
siman_098/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%92
siman_098/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%93
siman_098/kereti/part-001.txt#slug=kereti#seif=2#marker=%D7%94
siman_098/kereti/part-001.txt#slug=kereti#seif=3#marker=_
siman_098/kereti/part-001.txt#slug=kereti#seif=4#marker=%D7%90
siman_098/kereti/part-001.txt#slug=kereti#seif=4#marker=%D7%91
siman_098/kereti/part-001.txt#slug=kereti#seif=4#marker=%D7%92
siman_098/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%90
siman_098/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%91
siman_098/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%92
siman_098/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%93
siman_098/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%94
siman_098/kereti/part-001.txt#slug=kereti#seif=7#marker=_
siman_098/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%90
siman_098/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%91
siman_098/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%92
siman_098/kereti/part-001.txt#slug=kereti#seif=9#marker=_
siman_098/mateh-yehonatan/part-001.txt#slug=mateh-yehonatan#seif=1#marker=_
siman_098/mechaber/part-001.txt#slug=mechaber#seif=1#marker=main
siman_098/mechaber/part-001.txt#slug=mechaber#seif=2#marker=main
siman_098/mechaber/part-001.txt#slug=mechaber#seif=3#marker=main
siman_098/mechaber/part-001.txt#slug=mechaber#seif=4#marker=main
siman_098/mechaber/part-001.txt#slug=mechaber#seif=5#marker=main
siman_098/mechaber/part-001.txt#slug=mechaber#seif=6#marker=main
siman_098/mechaber/part-001.txt#slug=mechaber#seif=7#marker=main
siman_098/mechaber/part-001.txt#slug=mechaber#seif=8#marker=main
siman_098/mechaber/part-001.txt#slug=mechaber#seif=9#marker=main
siman_098/nekudot-hakesef/part-001.txt#slug=nekudot-hakesef#seif=1#marker=_
siman_098/nekudot-hakesef/part-001.txt#slug=nekudot-hakesef#seif=2#marker=_
siman_098/nekudot-hakesef/part-001.txt#slug=nekudot-hakesef#seif=3#marker=_
siman_098/nekudot-hakesef/part-001.txt#slug=nekudot-hakesef#seif=4#marker=_
siman_098/nekudot-hakesef/part-001.txt#slug=nekudot-hakesef#seif=5#marker=_
siman_098/nekudot-hakesef/part-001.txt#slug=nekudot-hakesef#seif=6#marker=_
siman_098/peleti/part-001.txt#slug=peleti#seif=1#marker=%D7%90
siman_098/peleti/part-001.txt#slug=peleti#seif=1#marker=%D7%91
siman_098/peleti/part-001.txt#slug=peleti#seif=2#marker=%D7%90