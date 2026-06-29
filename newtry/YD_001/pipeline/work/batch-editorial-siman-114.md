# Editorial retranslation — Siman 114

Generated: 2026-06-17T04:38:43.276Z

**Mandatory dictionary:** `C:/Users/binya/Documents/Shulchan aruch/full_dictionary (1).md` — consult for every term.

**Hebrew-verified editorial cleanup.** Batch includes existing English as draft. Hebrew is authoritative. For garbage-tier issues replace EN from Hebrew; for hybrid issues clean existing EN. Edit **only** `**** ENGLISH ****`.

---

# YD001 editorial re-translation (Cursor / agent)

**Authoritative dictionary:** `full_dictionary (1).md` at the **repository root**.  
Consult it for every halachic term, abbreviation, and commentator name.

**Source of truth:** `newtry/YD_001/output/siman_NNN/<commentary>/part-*.txt`.  
**Commentary order:** `translation/COMMENTARIES.md`.

**Core rule:** Hebrew is authoritative. For garbage/API-error blocks (`mt_garbage`, `mt_api_artifact`, `pending_placeholder`, `untranslated_copy`, `literal_bow_swim`), replace English entirely from Hebrew. For salvageable blocks (e.g. `hebrew_in_english`), edit existing English against Hebrew — keep what matches; do not lazy-patch obvious errors while leaving MT poison.

**Sprint worker:** Editorial only — **never** run `_corpus-retranslate-errors.mjs`, LibreTranslate, MyMemory, or Google Translate. See `pipeline/work/AGENT_SPRINT_WORKER.md`.

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

## Blocks in this batch (45 of 115 remaining in scope)

### 1. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `א`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, overliteral
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: א
**** HEBREW ****
<b>תבואה. </b> כ' הטורי זהב ואין לאסור של תבואה משום בשולי עובדי כוכבי' דכי היכא דהתבואה בטלה לגבי המים לענין ברכה דשהכל ה"נ בטלה לענין איסור בשולי עובדי כוכבים:
**** ENGLISH ****
תבואה. wrote Turי זהב ואין לforbidden של תבואה because בשולי עובדי כוכבי' דכי היכא דהתבואה is nullified לגבי the water regarding ברכה דשהכל ה"נ is nullified regarding prohibition בשולי gentiles:
**** END BLOCK ****
```

### 2. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ב
**** HEBREW ****
<b>לביתו. </b> ובפת החמירו טפי מפני שהוא מעשה נשים אלים חתנות דידיה טפי הר"ן:
**** ENGLISH ****
לביתו. ובפת החמירו טפי מפני שהוא מעשה נשים אלים חתנות דידיה טפי Ran:
**** END BLOCK ****
```

### 3. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ג`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ג
**** HEBREW ****
<b>שלן. </b> ואף אם העובד כוכבים אכסנאי שלו נותן לו שותה משום איבה כ"כ התוס':
**** ENGLISH ****
שלן. וeven אם הnon-Jew אכסנאי שלו נותן לו שותה because איבה כ"כ הTosafot:
**** END BLOCK ****
```

### 4. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ד`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ד
**** HEBREW ****
<b>ותבואה. </b> פי' כל מיני תבואה בין חטים בין שעורים:
**** ENGLISH ****
ותבואה. Explanation: כל מיני תבואה בין חטים בין שskinים:
**** END BLOCK ****
```

### 5. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 10 — marker `א`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, overliteral
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 10
marker: א
**** HEBREW ****
<b>חלתית. </b> הוא מין פרי שקורין בלזר"א וחותכין את קרטיו בסכין ואסור משום שמנונית הסכין. רש"י:
**** ENGLISH ****
חלתית. הוא מין fruit שקורין בלזר"א וחותכין את קרטיו בסכין וforbidden because grease הסכין. רש"י:
**** END BLOCK ****
```

### 6. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 10 — marker `ב`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 10
marker: ב
**** HEBREW ****
<b>דגים. </b> שאין להם קשקשת ועתידין לגדל לאחר זמן וקי"ל דמותר ומשמע דשאר דגים קטנים שיש בהן קשקשת מותרים שהרי יכול להבחין ביניהם ובין הטמאים. ש"ך:
**** ENGLISH ****
fish. שאין להם scales ועתידין לגדל לאחר time וwe establish דpermitted וit appears דשאר fish קטנים שיש בהן scales permittedים שהרי יכול להבחין ביניהם ובין הטמאים. ש"ך:
**** END BLOCK ****
```

### 7. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 10 — marker `ג`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 10
marker: ג
**** HEBREW ****
<b>חוץ. </b> פי' אומדין כמה היא דרכן לערב בכיוצא באלו וימכרו חוץ מדמי אותו יין ט"ז וכתב הש"ך דהיינו מדינא אבל לפי מה דקי"ל ר"ס קכ"ג דסתם יינם בזמן הזה מותר בהנאה במקום הפסד ה"ה הכא וק"ל:
**** ENGLISH ****
חוץ. Explanation: אומדין כמה היא דרכן לערב בכיוצא באלו וימכרו חוץ מדמי אותו יין ט"ז וwrote Shach that is מthe halachah אבל לפי מה דwe establish ר"ס קכ"ג דstam יינם בtime הזה permitted in benefit במקום הפסד ה"ה הכא וinvestigate:
**** END BLOCK ****
```

### 8. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 10 — marker `ד`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 10
marker: ד
**** HEBREW ****
<b>שעירבו. </b> כתב הט"ז ומיירי שאינו יודע איזה עובדי כוכבים אינו מערב דאז על כ"א וא' אני אומר זהו שלא עירב ואפילו הרוב דרכן לערב הא' שלא מערב מציל על כולן אבל אם ידוע איזה עובד כוכבים שאינו מערב אינו מציל על השאר שדרכן של רוב להתערב [גם אם יש בית א' שודאי מערבין בו יין אף אם יש בית דודאי אין מערבין לא מהני ליה דומיא דב' שבילין וכו' אלא אזלינן בתר רובא ע"ש]:
**** ENGLISH ****
שעירבו. wrote Taz וdeals with שאינו יודע איזה gentiles אינו מערב דאז על כ"א וא' אני אומר זהו שלא עירב ואפילו הרוב דרכן לערב הא' שלא מערב מציל על כולן אבל אם ידוע איזה non-Jew שאינו מערב אינו מציל על השאר שדרכן של רוב להתערב [גם אם יש בית א' שcertainly מערבין בו יין even אם יש בית דcertainly אין מערבין לא מהני ליה דומיא דב' שבילין etc. אלא אזלינן בתר רובא see there]:
**** END BLOCK ****
```

### 9. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 10 — marker `ה`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 10
marker: ה
**** HEBREW ****
<b>בודאי. </b> כתב הט"ז ע"כ מיירי כאן שיש ג' מינים א' ודאי מערב ב' ודאי אינו מערב ג' הם סתם ועל מי שקנה מהסתם קא מיירי אי ניזול בתר רובא ואין להקשות נגזור שמא יקח מן הקבוע כדאי' סי' ק"י ס"ו ואפשר דבסתם יינם הקילו חכמים ולא גזרינן שמא יקח מן הקבוע עכ"ל <small>(ובנה"כ כתב דבפירש ממילא או לקחו עובד כוכבים שלא בפנינו לא גזרינן אפי' באיסורי תורה ע"ש)</small>:
**** ENGLISH ****
certainly. wrote Taz until here deals with כאן שיש ג' מינים א' certainly מערב ב' certainly אינו מערב ג' הם stam ועל מי שקנה מהstam קא deals with אי ניזול בתר רובא ואין לchallenges נגזור lest יקח מן הקבוע כדאי' סי' ק"י ס"ו ואפשר דבstam יינם הקילו חכמים ולא גזרינן lest יקח מן הקבוע end of his words (וNachalat Binyamin wrote דבseparated automatically או לקחו non-Jew שלא בפנינו לא גזרינן even באיסורי תורה see there):
**** END BLOCK ****
```

### 10. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 12 — marker `_`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, overliteral
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=12#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 12
marker: _
**** HEBREW ****
<b>הרשב"א. </b> כתב הש"ך דוקא הרשב"א שהיה יודע בודאי שבכל הארץ ההיא היו מזלפין עליו יין אבל אנן דלא ידעינן בודאי א"כ אמרינן דא"א שלא יהא א' שאינו מזלף ומציל על כולן ועיין עוד שם שמביא כמה ראיות להתיר אך מה שכתב אף אם היה בו חוטי בשר בטלין ברוב השיג הוא בעצמו ע"ז בספרו נה"כ דהא מין בשאינו מינו הוא ע"ש:
**** ENGLISH ****
Rashba. wrote Shach specifically Rashba שהיה יודע certainly שבכל הארץ ההיא היו מזלפין עליו יין אבל אנן that not / which is not ידעינן certainly if so אמרינן דא"א שלא יהא א' שאינו מזלף ומציל על כולן ועיין עוד שם שמביא כמה ראיות להתיר אך מה שwrote even אם היה בו חוטי meat בטלין in the majority challenged הוא בעצמו ע"ז בספרו נה"כ דהא מין בשאינו מינו הוא see there:
**** END BLOCK ****
```

### 11. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 2 — marker `_`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 2
marker: _
**** HEBREW ****
<b>קולא. </b> כ' רש"ל נ"ל דוקא במקום שמקילין קאמר אבל האידנא שנעשה בקצת מקומות בעו"ה היתר גמור מותר לשתות שם שכר מעובד כוכבים רק שלא ישתה בביתו עכ"ל וביאר הט"ז דבריו דדוקא במקום שיודעים שיש איסור ביין של עובדי כוכבים רק שנוהגין קולא בו שם עשו חכמים היכרא שלא ישתה שם שכר אטו חמרא שירגישו שלא יקילו עוד אבל במקומות שנוהגים היתר גמור והם סבורים שאין כאן איסור כלל נמצא שלא ידעו ממה להפריש כי היתר גמור הוא בעיניהם ע"כ אין שייך בזה גזירה ומותר לשתות שם שכר בין מישראל בין מעובד כוכבים עכ"ל:
**** ENGLISH ****
leniency. wrote Rashal it appears to me specifically במקום שמקילין קאמר אבל now שנעשה בקצת מקומות בעו"ה permission / halachic grounds for permitting גמור permitted to drink שם שכר מnon-Jew רק שלא ישתה in the houseו end of his words וexplained Taz דבריו דspecifically במקום שיודעים שיש prohibition ביין של gentiles רק שנוהגין leniency בו שם עשו חכמים היכרא שלא ישתה שם שכר אטו חמרא שירגישו שלא יקילו עוד אבל במקומות שנוהגים permission / halachic grounds for permitting גמור והם סבורים שאין כאן prohibition כלל is found שלא ידעו ממה להfruitש כי permission / halachic grounds for permitting גמור הוא בעיניהם until here אין שייך בזה rabbinic decree וpermitted to drink שם שכר בין מישראל בין מnon-Jew end of his words:
**** END BLOCK ****
```

### 12. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 4 — marker `א`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 4
marker: א
**** HEBREW ****
<b>המשקים. </b> הנזכרים אפי' יין תפוחים ורמונים:
**** ENGLISH ****
הliquids. הנזכרים even יין תפוחים ורמונים:
**** END BLOCK ****
```

### 13. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 4 — marker `ב`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 4
marker: ב
**** HEBREW ****
<b>ס'. </b> והט"ז חולק על דין זה ופסק דסגי בששה חלקים כמ"ש בסי' קל"ד ס"ה במים וה"ה בשאר משקים דינא הכי <small>(ובנה"כ כתב דיש לחלק בין מים לשאר משקים ע"ש)</small> וכתב הש"ך וה"ה אפי' היין ביוקר אלא שהוא משביח בהם ביותר משום היין שנתערב בו אסור כ"מ בש"ס וב"י ע"ש:
**** ENGLISH ****
sixty. וTaz disagrees על דין זה וruled דסגי בששה disagreedים כwhat he wrote בסי' קsome say seif 5 in water and the same applies in other liquids the halachah הכי (וNachalat Binyamin wrote דיש לdisagreed בין מים לשאר liquids see there) וwrote Shach and the same applies even היין ביוקר אלא שהוא משביח בהם ביותר because היין שנתערב בו forbidden כ"מ בGemara וben yomo see there:
**** END BLOCK ****
```

### 14. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 4 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 4
marker: ג
**** HEBREW ****
<b>מתקלקל. </b> אבל בחנות לא מתקלקל כיון שהוא זמן מועט. ט"ז:
**** ENGLISH ****
spoils. אבל בחנות לא spoils כיון שהוא time מועט. ט"ז:
**** END BLOCK ****
```

### 15. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `_`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: _
**** HEBREW ****
<b>קפידא. </b> אם נתערב בו חומץ וכה"ג. ש"ך:
**** ENGLISH ****
קפידא. אם נתערב בו חומץ וsuch a case. ש"ך:
**** END BLOCK ****
```

### 16. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 6 — marker `_`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 6
marker: _
**** HEBREW ****
<b>ששים. </b> וכבר כתבתי בס"ד דלדידן בששה סגי. ט"ז:
**** ENGLISH ****
sixty. וכבר I wrote in seif 4 דfor us בששה סגי. ט"ז:
**** END BLOCK ****
```

### 17. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 7 — marker `_`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 7
marker: _
**** HEBREW ****
<b>בישולי או גיעולי. </b> פי' פליטת הכלים והטעם דנאכלין כמות שהן חיין ובשר ושומן פוגם בשמן ודבש כדלעיל סי' ק"ג ס"ד א"נ סתם כליהם אינן ב"י וע"ל סי' קכ"ב וה"ה למים חמין שג"כ נאכלין חיין ועוד שאין משתנין מברייתן ע"י האור רש"י:
**** ENGLISH ****
cookingי או purgingי. Explanation: emission of the vesselם וthe taste דנאכלין כמות שהן חיין וmeat ושומן spoils בשמן וhoney כדabove siman 103 ס"ד א"נ stam כליהם אינן ben yomo וע"ל סי' קכ"ב and the same applies למים hot שג"כ נאכלין חיין ועוד שאין משתנין מברייתן ע"י האור רש"י:
**** END BLOCK ****
```

### 18. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 8 — marker `א`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 8
marker: א
**** HEBREW ****
<b>יין. </b> ואפי' במקום שהיין ביוקר מ"מ חיישינן שעשה כדי לעשות להם ריח טוב ביין מועט שמזלף עליהם. ט"ז:
**** ENGLISH ****
יין. וeven במקום שהיין ביוקר nevertheless we are concerned שעשה the measure of לעשות להם ריח טוב ביין מועט שמזלף עליהם. ט"ז:
**** END BLOCK ****
```

### 19. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 8 — marker `ב`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 8
marker: ב
**** HEBREW ****
<b>חריפים. </b> כתב האו"ה ודוקא שנחתכו לאחר שנכבשו שאז הם חריפים ע"ש והא דלא אמרי' דהטעם נתבטל בב' וג' הראשונים ובטלים ברוב נתבאר לעיל סי' צ"ו ס"ד:
**** ENGLISH ****
חריפים. wrote הIssur VeHeter investigateא שwere cut לאחר שנכבשו שאז הם חריפים see there והא that not / which is not אמרי' דthe taste נתבטל בב' וג' הראשונים וare nullified in the majority נתבאר above siman 96 ס"ד:
**** END BLOCK ****
```

### 20. `siman_114/baer-heitev/part-001.txt` — baer-heitev — seif 8 — marker `ג`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 8
marker: ג
**** HEBREW ****
<b>מים. </b> דוקא שהרוב מים אבל אם הזיתים רוב הרי הן בחריפתן ואסורים אפי' הכלים אינן ב"י דמשוי ליה לשבח. ש"ך:
**** ENGLISH ****
מים. specifically שהרוב מים אבל אם הזיתים רוב הרי הן בחריפתן וforbiddenים even the vesselם אינן ben yomo דmakes it as ליה for improvement. ש"ך:
**** END BLOCK ****
```

### 21. `siman_114/beer-hagolah/part-001.txt` — beer-hagolah — seif 10 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_114/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=10#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 10
marker: _
**** HEBREW ****
תוס' שם דף ל"ב כדי להעמיד מהר וכ"כ המרדכי ואגודה פרק א"מ <br>(°) הב"י כתב בשם המרדכי בשם אבי העזרי אם עירבו בו יין וכו' אבל לא כתב שמרי' ולא זכיתי פה לספרו ד"מ:
**** ENGLISH ****
Tosafot שם daf ל"ב the measure of להעמיד מהר and so too המרדכי ואגודה פרק א"מ (°) Beit Yosef wrote in name of המרדכי in name of אבי העזרי אם עירבו בו יין etc. אבל לא wrote שמרי' ולא זכיתי פה לספרו ד"מ:
**** END BLOCK ****
```

### 22. `siman_114/beer-hagolah/part-001.txt` — beer-hagolah — seif 11 — marker `_`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, overliteral
- Checkpoint id: `siman_114/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=11#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 11
marker: _
**** HEBREW ****
שם במשנה דף ל"ה ובגמרא רבי יהוד' נשיאה וב"ד נמנו עליה והתירוהו דף ל"ז:
**** ENGLISH ****
שם במשנה daf ל"ה וin the Gemara רבי יהוד' נשיאה וב"ד נמנו עליה והתירוהו daf ל"ז:
**** END BLOCK ****
```

### 23. `siman_114/beer-hagolah/part-001.txt` — beer-hagolah — seif 4 — marker `_`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english
- Checkpoint id: `siman_114/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 4
marker: _
**** HEBREW ****
שם וכ"כ התוס' שם ואף אם העובד כוכבים אכסנאי שלו נותן לו שמותר משום איבה:
**** ENGLISH ****
שם and so too הTosafot שם וeven אם הnon-Jew אכסנאי שלו נותן לו שpermitted because איבה:
**** END BLOCK ****
```

### 24. `siman_114/beer-hagolah/part-001.txt` — beer-hagolah — seif 7 — marker `_`

- Quality: **error** — hebrew_in_english, untranslated_copy
- Checkpoint id: `siman_114/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 7
marker: _
**** HEBREW ****
רמב"ם פי"ז וש"פ מדין יין תפוחים:
**** ENGLISH ****
רמב"ם פי"ז וש"פ מדין יין תפוחים:
**** END BLOCK ****
```

### 25. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `א`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: א
**** HEBREW ****
<b>אחד כו' או כו'. </b>דכולהו חדא טעמא כמו שמסיק שם משום חתנות:
**** ENGLISH ****
אחד etc. או etc.. דכולהו חדא טעמא כמו שdoes not occur to him שם because חתנות:
**** END BLOCK ****
```

### 26. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ב`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ב
**** HEBREW ****
<b>(ליקוט) תמרים או של תאנים. </b>כ"כ הרמב"ם וכ' וכיוצא בהן ולשון הטור א' שכר תמרים או של שעורים ולשון התוס' שם בין של תמרים בין של תבואה (ע"כ):
**** ENGLISH ****
(ליקוט) תמרים or thatל תאנים. כ"כ Rambam וwrote וכיוצא בהן וlanguage of Tur א' שכר תמרים or thatל שskinים וlanguage of הTosafot שם בין של תמרים בין של תבואה (until here):
**** END BLOCK ****
```

### 27. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ג`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ג
**** HEBREW ****
<b>או של תבואה. </b>וליכא משום בש"ג כמו שבטיל לענין ברכה שמברכין שהכל:
**** ENGLISH ****
or thatל תבואה. וthere is not because בש"ג כמו שnullified regarding ברכה שמברכין שהכל:
**** END BLOCK ****
```

### 28. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ד`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ד
**** HEBREW ****
<b>(ליקוט) או של דבש. </b>טור וכ"ד הרא"ש שם שכתב ודבש דמתני' כו' והא דשרו כו' וכ"כ בהג"א שם ד"ה ובסה"ת כו' בשם א"ז:
**** ENGLISH ****
(ליקוט) or thatל honey. טור וso too Rosh שם שwrote וhoney דמתני' etc. והא דשרו etc. and so too בהג"א שם s.v. ובSemak etc. in name of Or Zarua:
**** END BLOCK ****
```

### 29. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ה
**** HEBREW ****
<b>ואינו אסור כו' אבל כו'. </b>לשון הרמב"ם מדברי גמ' שם וכרב אהאי:
**** ENGLISH ****
ואינו forbidden etc. אבל etc.. language of Rambam מדברי גמ' שם וכרב אהאי:
**** END BLOCK ****
```

### 30. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ו`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ו
**** HEBREW ****
<b>ולא אסרו כו' וכן כו'. </b>הרא"ש שם ותוס' שם (ע"כ):
**** ENGLISH ****
ולא אסרו etc. וכן etc.. Rosh שם וTosafot שם (until here):
**** END BLOCK ****
```

### 31. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ז`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ז
**** HEBREW ****
<b>ויש מתירין בשכר של דבש. </b>דלא אמרו אלא שכר ועוד דתנן והדבש והיינו דבש מבושל כמ"ש בגמ' שם דבש למאי ניחוש כו' אי משום גיעולי כו' והטעם דליכא קירוב דעת כמו בשכר ועהג"א שם. וסברא ראשונה ס"ל שלא אמרו שכר אלא שמצוי להם ומתני' דתני דבש מפני שעדיין לא נגזר על השכר כמ"ש תוס' שם וערא"ש שם: <br><b>(ליקוט) ויש מתירין בשכר של דבש. </b>הג"א שם בשם סה"ת. וסמ"ג והג"מ:
**** ENGLISH ****
ויש מתירין בשכר של honey. that not / which is not אמרו אלא שכר ועוד דתנן והhoney וthat is honey cooked כwhat he wrote בגמ' שם honey למאי ניחוש etc. אי because purgingי etc. וthe taste דthere is not קירוב דעת כמו בשכר ועהג"א שם. וסברא ראשונה ס"ל שלא אמרו שכר אלא שמצוי להם ומתני' דתני honey מפני שעדיין לא נגזר על השכר כwhat he wrote Tosafot שם וערא"ש שם: (ליקוט) ויש מתירין בשכר של honey. הג"א שם in name of Semak. וSemag וMaggid Mishneh:
**** END BLOCK ****
```

### 32. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ח`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%97`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ח
**** HEBREW ****
<b>ותבואה. </b>כ"כ מרדכי בשם ראבי"ה בשם ספר הישר וכ' ב"י שדעתו דאין אסור אלא כעין שכר שלהם שהיה של תמרים אבל כל הפוסקים חולקין ע"ז. וכן בדברי הרמב"ם והרא"ש הנ"ל וכ' הרמב"ם שהתירו יין תפוחים מפני שאינו מצוי כו' וכמ"ש בש"ע בס"ג (ע"כ):
**** ENGLISH ****
ותבואה. כ"כ מרדכי in name of ראבי"ה in name of ספר הישר וwrote ben yomo שדעתו דאין forbidden אלא כעין שכר שלהם שהיה של תמרים אבל כל הposkim disagreesין ע"ז. וכן בדברי Rambam וRosh הit appears to me וwrote Rambam שהתירו יין תפוחים מפני שאינו מצוי etc. וכwhat he wrote בש"ע בseif 3 (until here):
**** END BLOCK ****
```

### 33. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 10 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=10#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 10
marker: א
**** HEBREW ****
<b>ואם ידוע כו'. </b>כחזקיה שם דאין הלכה כתלמיד במקום רב. רי"ף ורא"ש:
**** ENGLISH ****
ואם ידוע etc.. כחזקיה שם דאין the halachah כתלמיד במקום Rosh (alternative). רי"ף ורא"ש:
**** END BLOCK ****
```

### 34. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 10 — marker `ב`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=10#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 10
marker: ב
**** HEBREW ****
<b>ומכרו כולו חוץ כו'. </b>כמש"ש ע"ד א' הלכה למעשה כו': <br><b>(ליקוט) ומוכרו כולו כו'. </b>דמ"ש כולו אסור בהנאה היינו לסתם מתני' אבל לרשב"ג מוכרו כו'. ת"ה פ"ז ב' בשם ה"ר יונה ופליג על הראב"ד ועמ"ש סי' קל"ד ס"ה בהג"ה וס"ל להר"י והרשב"א כיון שבגמ' לא הוזכר לחלק לא קי"ל כירושלמי וכ"כ שם כמה פעמים (ע"כ):
**** ENGLISH ****
ומכרו כולו חוץ etc.. כמש"ש ע"ד א' the halachah for practical halachah etc.: (ליקוט) ומוכרו כולו etc.. דwhat he wrote כולו forbidden in benefit that is לstam מתני' אבל לרשב"ג מוכרו etc.. ת"ה פ"ז ב' in name of ה"ר יונה ופליג על הראב"ד ועwhat he wrote סי' קsome say seif 5 בהג"ה וס"ל להר"י וRashba כיון שבגמ' לא הוזכר לdisagreed לא we establish כירושלמי and so too שם כמה פעמים (until here):
**** END BLOCK ****
```

### 35. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 10 — marker `ג`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=10#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 10
marker: ג
**** HEBREW ****
<b>ואם ידוע כו'. </b>כמ"ש בפ"ב דכתובות (כ"ז א') אם יש מחבואה כו' והקילו בשבויה וה"ה כאן דאינו אלא מדרבנן תלינן להקל כמ"ש בע"ז ע' ב' אימר מגבה כו':
**** ENGLISH ****
ואם ידוע etc.. כwhat he wrote בchapter 2 דכתובות (כ"ז א') אם יש מחבואה etc. והקילו בשבויה and the same applies כאן דאינו אלא d'rabbanan תלינן to be lenient כwhat he wrote בע"ז ע' ב' אימר מגבה etc.:
**** END BLOCK ****
```

### 36. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 10 — marker `ד`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, overliteral
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=10#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 10
marker: ד
**** HEBREW ****
<b>ואם ידוע כו' אבל כו'. </b>כמ"ש (פסחים ט' ב' וש"מ) בעשר חנויות ובספ"ק דכתובות ט"ו אי דקא אזלי כו' ל"צ כו' ובתוספתא פ"ד דדמאי כל העיר מוכרין ודאי ואחד דמאי לקח ואינו יודע מאיזה מהן לקח ה"ז אסור מפריש תרומה ומעשר כו' כל העיר מוכרין מתוקן ואחד מוכר שאינו מתוקן ולקח כו' ה"ז אסור כל העיר מוכרין בשר שחוטה ואחד כו' ה"ז אסור כל העיר מוכרין יין טהור ואחד כו' ה"ז אסור בד"א בזמן שלקה ואינו יודע מאיזה מהן לקח אבל הלוקח מן השוק הולכין אחר הרוב וכאן לא שייך שאחד יציל כיון דידוע ודאי שמערבין:
**** ENGLISH ****
ואם ידוע etc. אבל etc.. כwhat he wrote (Pesachim ט' ב' וש"מ) בעשר חנויות ובסfirst chapter דכתובות ט"ו אי דקא אזלי etc. ל"צ etc. ובתוספתא פ"ד דדמאי כל העיר מוכרין certainly ואחד דמאי לקח ואינו יודע מאיזה מהן לקח ה"ז forbidden מfruitש terumah — priestly portion of produce ומעשר etc. כל העיר מוכרין מתוקן ואחד מוכר שאינו מתוקן ולקח etc. ה"ז forbidden כל העיר מוכרין meat שחוטה ואחד etc. ה"ז forbidden כל העיר מוכרין יין טהור ואחד etc. ה"ז forbidden בד"א בtime שלקה ואינו יודע מאיזה מהן לקח אבל הלוקח מן השוק הולכין אחר הרוב וכאן לא שייך שאחד יציל כיון דידוע certainly שמערבין:
**** END BLOCK ****
```

### 37. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 11 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=11#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 11
marker: א
**** HEBREW ****
<b>ובמקום כו'. </b>דמורייס לא נאסר לגמרי בכ"מ כמו גבינה ושאר שנאסר במנין מדאמרינן קיסטא דמורייס בלומא כו' וה"ה במקום שאין דרכן כמו כבשים. ר"ן:
**** ENGLISH ****
ובמקום etc.. דמורייס לא נאסר לגמרי בכ"מ כמו cheese ושאר שנאסר במנין מדאמרינן קיסטא דמורייס בלומא etc. and the same applies במקום שאין דרכן כמו כבשים. ר"ן:
**** END BLOCK ****
```

### 38. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 11 — marker `ב`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, overliteral
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=11#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 11
marker: ב
**** HEBREW ****
<b>וכן כו'. </b>עבסי' קי"ח ס"ב ומיהו דוקא כו': <br><b>(ליקוט) וכן להפקידו כו'. </b>שאין העובד כוכבים נותן אל דעתו לסלק המורייס וליתן יין שהרי לא נודע שהיין יפה למורייס ולא יהא חמור מפקיד מלוקח שם (ע"כ):
**** ENGLISH ****
וכן etc.. עבסי' קי"ח ס"ב ומיהו specifically etc.: (ליקוט) וכן להפקידו etc.. שאין הnon-Jew נותן אל דעתו לסלק המורייס וליתן יין שהרי לא נודע שהיין יפה למורייס ולא יהא חמור מפקיד מלוקח שם (until here):
**** END BLOCK ****
```

### 39. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `א`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: א
**** HEBREW ****
<b>כל אלו כו'. </b>מ' ב' וכן יין כו':
**** ENGLISH ****
כל אלו etc.. מ' ב' וכן יין etc.:
**** END BLOCK ****
```

### 40. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ג
**** HEBREW ****
<b>אם דמיהם כו'. </b>כמש"ש ל"ד ב':
**** ENGLISH ****
אם דמיהם etc.. כמש"ש some say ב':
**** END BLOCK ****
```

### 41. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ו`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ו
**** HEBREW ****
<b>גם אין כו'. </b>ל"ג ב' וע' כ"ז בתוס' ל"ב א' ד"ה ומאוצר כו':
**** ENGLISH ****
גם אין etc.. ל"ג ב' וע' כ"ז בTosafot ל"ב א' s.v. ומאוצר etc.:
**** END BLOCK ****
```

### 42. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `_`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, overliteral
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: _
**** HEBREW ****
<b>דכיון דאית כו' וכן כו'. </b>כמ"ש במנחות מ"ג א' וכ"כ במרדכי דפ"ו דברכות על מש"ש האי הימלתא כו' ולתערובת יין ושאר דברים האסורין לא חיישינן דאומן לא מרעי נפשיה:
**** ENGLISH ****
since / because דאית etc. וכן etc.. כwhat he wrote במנחות מ"ג א' and so too במרדכי דchapter 6 דברכות על מש"ש האי הימלתא etc. ולתערובת יין ושאר דברים הforbiddenין לא we are concerned דאומן לא מרעי נפשיה:
**** END BLOCK ****
```

### 43. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `א`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: א
**** HEBREW ****
<b>צריך כו' ואם כו'. </b>תוס' שם ד"ה האי מהא דחלא שם:
**** ENGLISH ****
צריך etc. ואם etc.. Tosafot שם s.v. האי מהא דחלא שם:
**** END BLOCK ****
```

### 44. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `ב`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: ב
**** HEBREW ****
<b>אם אין כו'. </b>כנ"ל ס"ד:
**** ENGLISH ****
אם אין etc.. כit appears to me ס"ד:
**** END BLOCK ****
```

### 45. `siman_114/beur-hagra/part-001.txt` — beur-hagra — seif 6 — marker `ג`

- Quality: **error** — hybrid_mt_garbage, hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 6
marker: ג
**** HEBREW ****
<b>(ליקוט) והוא דלא כו'. </b>כמ"ש בחולין ו' א' שאני שאור כו' ובי"ט ל"ח ב' וע"ז ס"ט א' וחולין צ"ז ב' ועתוס' דע"ז ל"ד א' סד"ה דורדיא כו' וכנ"ל סי' קכ"ג סט"ו (ע"כ):
**** ENGLISH ****
(ליקוט) והוא that not / which is not etc.. כwhat he wrote בחולין ו' א' this case is different שאור etc. ובי"ט ל"ח ב' וע"ז seif 9 א' וחולין צ"ז ב' ועTosafot דע"ז some say א' סs.v. דורדיא etc. וכit appears to me סי' קכ"ג סט"ו (until here):
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_114
npm run pipeline:editorial:advance -- --siman 114
```

## Checkpoint ids

siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%90
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%91
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%92
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%93
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=%D7%90
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=%D7%91
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=%D7%92
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=%D7%93
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=10#marker=%D7%94
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=12#marker=_
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=_
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%90
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%91
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%92
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=_
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=6#marker=_
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=7#marker=_
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%90
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%91
siman_114/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%92
siman_114/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=10#marker=_
siman_114/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=11#marker=_
siman_114/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=_
siman_114/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=7#marker=_
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%90
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%91
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%92
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%93
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%94
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%95
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%96
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%97
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=10#marker=%D7%90
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=10#marker=%D7%91
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=10#marker=%D7%92
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=10#marker=%D7%93
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=11#marker=%D7%90
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=11#marker=%D7%91
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%90
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%92
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%95
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=_
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%90
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%91
siman_114/beur-hagra/part-001.txt#slug=beur-hagra#seif=6#marker=%D7%92