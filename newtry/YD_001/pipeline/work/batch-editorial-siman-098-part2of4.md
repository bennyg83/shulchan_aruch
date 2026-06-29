# Editorial retranslation — Siman 98 (part 2/4)

Generated: 2026-06-16T20:05:37.315Z

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

## Blocks in this batch (43 of 171 remaining in scope)

### 1. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ג`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ג
**** HEBREW ****
<b>בין כו'. </b>ר"ל לאפוקי מדעת הראב"ד שכתב דוקא בשל חרס דומיא דכחל שא"א להפרידו דכחל עצמו אסור משא"כ בשאר כלים דאפשר בהגעלה משערינן באומר יפה: <br><b>(ליקוט) בין כו'. </b>לאפוקי מהראב"ד וכתב והיאך אפשר שנשער בכולו וכאלו כולו אסור והרי אתה מכשירו בהגעלה אבל בת"ה הקשה עליו דא"כ כחל נמי דאף שעתה אין לו הכשר מ"מ קודם שנפל הרי אתה ממרקו בקריעה וטיחה והיאך אפשר כו' ועוד כיון שאמרו בגמ' משום דלא ידעינן כמה נפיק מ"ל חוזר להכשירו או לא וכ' וכ"ד רבותינו הצרפתים וכ"ד הרמב"ן ז"ל (ע"כ):
**** ENGLISH ****
בין etc.. ר"ל to exclude מדעת הראב"ד שwrote specifically בשל חרס דומיא דudder שא"א להfruitדו דudder עצמו forbidden משif so in other כלים דאפשר בהגcame up משערינן באומר יפה: (ליקוט) בין etc.. to exclude מהראב"ד וwrote והיאך אפשר שנשער בכולו וas if כולו forbidden והרי אתה מכשירו בהגcame up אבל בת"ה challenged עליו דif so udder נמי דeven שעתה אין לו הכשר nevertheless קוblood שfell הרי אתה מsauceו בקריעה וplastering והיאך אפשר etc. ועוד כיון שאמרו בגמ' becauseלא ידעינן כמה נפיק מ"ל חוזר להכשירו או לא וwrote וso too רבותינו הצרפתים וso too הרמב"ן and these are his words (until here):
**** END BLOCK ****
```

### 2. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ד`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ד
**** HEBREW ****
<b>או מתכת. </b>לאפוקי מהי"א וע"ל ר"ס צ"ד:
**** ENGLISH ****
או מתכת. — see there.
**** END BLOCK ****
```

### 3. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ה`

- Quality: **error** — hebrew_in_english, untranslated_copy, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ה
**** HEBREW ****
<b>ובלבד כו'. </b>כמ"ש שם צ"ז ב' מכלל כו':
**** ENGLISH ****
ובלבד כו'. כמ"ש שם צ"ז ב' מכלל כו':
**** END BLOCK ****
```

### 4. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 4 — marker `ו`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 4
marker: ו
**** HEBREW ****
<b>וכל איסור כו'. </b>כמ"ש במתני' הנ"ל אם מכירו כו' ובירושלמי פ"ב דערלה שאור של תרומה שנפל לתוך העיסה והגביהו ואח"כ נתחמצה העיסה ה"ז מותרת. ודכוותה תאנה של תרומה שנפלה לתוך מאה הוגבהה א' מהן ואח"כ הוגרה התרומה תהא מותרת תמן לא הוכר האיסור ברם הכא הוכר האיסור:
**** ENGLISH ****
וכל איסור etc.. כwhat he wrote במתני' הit appears to me אם מכירו etc. ובירושלמי chapter 2 דערלה שאור של תרומה שfell לתוך הdough והגביהו וafterward נתחמצה הdough ה"ז permittedת. ודכוותה תאנה של תרומה שfellה לתוך מאה הוגבהה א' מהן וafterward הוגרה התרומה תהא permittedת תמן לא הוכר האיסור ברם הכא הוכר האיסור:
**** END BLOCK ****
```

### 5. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `א`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: א
**** HEBREW ****
<b>אם ידוע כו' </b>דלא כו'. ע"ל סי' צ"ב סס"ד בהג"ה:
**** ENGLISH ****
אם ידוע כו' דלא כו'. — see there.
**** END BLOCK ****
```

### 6. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ב`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ב
**** HEBREW ****
<b>אפילו אם ניערו כו'. </b>ר"ל לא מיבעיא בבב"ח דל"ל נ"נ אפילו במאכל כמש"ל סי' צ"ד ס"ו וז"ש <small>(צ"ז א' וש"מ) </small>קדירה שבשל בה בשר כו' ואפי' בישנה <small>(וסיפא תרומה כו' בחדשה דוקא ואיידי דלא מפליג ברישא לא מפליג בסיפא):</small>
**** ENGLISH ****
אפילו אם ניערו etc.. ר"ל לא מיבעיא בבב"ח דל"ל נ"נ אפילו במאכל as written above siman 94 ס"ו וז"ש (צ"ז א' וש"מ) }קדירה שבשל בה meat etc. וeven בישנה (וסיפא תרומה etc. בחדשה specifically ואיידי דלא מפליג ברישא לא מפליג בסיפא):}
**** END BLOCK ****
```

### 7. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ה`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ה
**** HEBREW ****
<b>(ליקוט) ויש מי כו'. </b>וכ"ד תוס' בחולין צ"ז ב' ד"ה איכא כו'. וס' ראשונה ס"ל כי"מ שכ' הרשב"א דמ"ש בקדירה עצמה לחומרא דלא משערינן בבלוע ועסי' צ"ט ס"ד (ע"כ):
**** ENGLISH ****
(ליקוט) ויש מי etc.. וso too תוsixty בחולין צ"ז ב' s.v. there is etc.. וsixty ראשונה ס"ל כי"מ שwrote Rashba דwhat he wrote בקדירה עצמה לstringency דלא משערינן בabsorbed ועסי' צ"ט ס"ד (until here):
**** END BLOCK ****
```

### 8. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 5 — marker `ו`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 5
marker: ו
**** HEBREW ****
<b>ויש שאינן כו'. </b>כ"כ המרדכי בפ' ג"ה בשם רא"מ דומיא דכחל שא"א להפרידו וראיה ממ"ש בפסחים ע"ד א' ב' כבולעו כך פולטו ואם איתא מיד שבלעו הבשר נ"נ ומה מהני הפליטה ובפ' כ"ה ק"ה א' אי קסבר אפשר לסוחטו מותר חתיכה כו' וכן כאן כיון דאפשר לסוחטו שיכול להכשירו אינו נ"נ. וסובר הרב דאפילו בחדש אסור בכ"ח. ואינו כן ועש"ך:
**** ENGLISH ****
ויש שאינן etc.. כ"כ המרדכי בפ' ג"ה in name of רא"מ דומיא דudder שא"א להfruitדו וproof מwhat he wrote בפסחים ע"ד א' ב' כבולעו כך פולטו ואם איתא מיד שabsorbedו הmeat נ"נ ומה מהני הemission ובפ' כ"ה ק"ה א' אי קסבר אפשר לסוחטו permitted חתיכה etc. וכן כאן כיון דאפשר לסוחטו שיכול להכשירו אינו נ"נ. וסובר הרב דאפילו בחדש forbidden בכ"ח. ואינו כן ועש"ך:
**** END BLOCK ****
```

### 9. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `א`

- Quality: **error** — hebrew_in_english
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: א
**** HEBREW ****
<b>כל האיסורין כו'. </b>ע"ז ס"ט א' ע"ג ב' וכר"י ור"ל כנ"ל ואמר כל ר"ל אפילו איסורין דרבנן דלא כהרמב"ם שכ' דבטלה בנ"ט ולמד מכחל ועתוס' צ"ז ב' ד"ה וכחל כו' וי"ל כו': <br><b>(ליקוט) כל האיסורין. </b>ר"ל אפי' של דבריהם ועש"ך וראיה ממ"ש בס"ז ביצה כו' והיא אינה אלא מד"ס כמש"ש ס"ד ב' וכן ממ"ש <small>(צ"ז ב') </small>גיד בס' ומשמע אפי' בשלימה וע"כ משום שומנו <small>(וע"ל סי' ס"ה ס"ק כ"ה) . ת"ה ועברמב"ם פט"ו מהמ"א הלכה י"ז ואע"פ ששומן כו' ובהלכה י"ט שם ועלח"מ שם בהלכה י"ז. והרשב"א לשיטתו דלא ס"ל טעם הרמב"ם גבי ביצה כנ"ל סי' פ"ו ס"ק ו') . </small>ודעת הרמב"ן שכל איסור דבריהם שאין לו עיקר בדאורייתא ברובא בטיל וכמ"ש בחלת ח"ל <small>(בירושלמי סוף חלה ובתרומת ח"ל בגמ' בכורות כ"ז א') </small>ובשאובין בפ' הערל <small>(פ"ב ב') </small>וכתב וה"ה לבישולי נכרים וגבינה של נכרים אבל בת"ה חולק עליו ע"ש ק"ח א' (ע"כ):
**** ENGLISH ****
כל האיסורין etc.. ע"ז seif 9 א' ע"ג ב' וכר"י ור"ל כit appears to me ואמר כל ר"ל אפילו איסורין d'rabbanan דלא כRambam שwrote דבטלה בנ"ט ולמד מudder ועתוsixty צ"ז ב' s.v. וudder etc. and one may say etc.: (ליקוט) כל האיסורין. ר"ל even של דבריהם ועש"ך וproof מwhat he wrote בs.k. 7 egg etc. והיא אינה אלא מד"ס כמש"ש ס"ד ב' וכן מwhat he wrote (צ"ז ב') }גיד בsixty וit appears even בשלימה וuntil here because שומנו (וע"ל סי' seif 5 s.k. כ"ה) . ת"ה וhe transgressedמב"ם פט"ו מהמ"א the halachah י"ז ואon the surface of ששומן etc. ובthe halachah י"ט שם ועלח"מ שם בthe halachah י"ז. וRashba לשיטתו דלא ס"ל טעם Rambam גבי egg כit appears to me סי' chapter 6 s.k. ו') . }ודעת הרמב"ן שכל איסור דבריהם שאין לו עיקר בd'oraisa in the majority nullified וכwhat he wrote בחלת ח"ל (בירושלמי סוף חלה ובתרומת ח"ל בגמ' בכורות כ"ז א') }ובשאובין בפ' הערל (chapter 2 ב') }וwrote and the same applies לcookingי נכרים וcheese של נכרים אבל בת"ה disagrees עליו see there ק"ח א' (until here):
**** END BLOCK ****
```

### 10. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ב`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ב
**** HEBREW ****
<b>בזה"ז. </b>ר"ל לאפוקי טבל כמ"ש בע"ז שם וכן תרומה וכיוצא דבמאה וערלה וכיוצא במאתים וכ"ז במינן אבל שלא במינן הכל בס' כמ"ש בפ"ב דערלה גריסין כו' וכן טבל הוא דשיל"מ וכמ"ש בירושלמי פ"ו דנדרים וכל שיש לו כו' חוץ חמץ בפסח:
**** ENGLISH ****
בזה"ז. ר"ל to exclude טבל כwhat he wrote בע"ז שם וכן תרומה וכיוצא דבמאה וערלה וכיוצא במאתים וכ"ז במינן אבל שלא במינן הכל בsixty כwhat he wrote בchapter 2 דערלה גריסין etc. וכן טבל הוא דשיל"מ וכwhat he wrote בירושלמי chapter 6 דנדרים וכל שיש לו etc. חוץ חמץ בפסח:
**** END BLOCK ****
```

### 11. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ג`

- Quality: **error** — hebrew_in_english, untranslated_copy, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ג
**** HEBREW ****
<b>ובלבד כו'. </b>כמ"ש בפ"ב דערלה וחולין צ"מ א' גריסין כו' אם יש בנ"ט בין שיש כו' ושם ב' א"ל אדכרתן כו' שהרי כו':
**** ENGLISH ****
ובלבד כו'. כמ"ש בפ"ב דערלה וחולין צ"מ א' גריסין כו' אם יש בנ"ט בין שיש כו' ושם ב' א"ל אדכרתן כו' שהרי כו':
**** END BLOCK ****
```

### 12. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ד`

- Quality: **error** — hebrew_in_english, untranslated_copy, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ד
**** HEBREW ****
<b>והוא אסור כו'. </b>עתוס' שם ק"ח ב' ד"ה אמאי כו' ומכאן כו':
**** ENGLISH ****
והוא אסור כו'. עתוס' שם ק"ח ב' ד"ה אמאי כו' ומכאן כו':
**** END BLOCK ****
```

### 13. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ה`

- Quality: **error** — hebrew_in_english, untranslated_copy, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ה
**** HEBREW ****
<b>ולכן כו'. </b>שם צ"ז ב' וע"ז ס"ט א' ועתוס' שם ד"ה בתבלין כו':
**** ENGLISH ****
ולכן כו'. שם צ"ז ב' וע"ז ס"ט א' ועתוס' שם ד"ה בתבלין כו':
**** END BLOCK ****
```

### 14. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ו`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ו
**** HEBREW ****
<b>(ליקוט) אם אסורין מחמת עצמן. </b>כ"פ תוס' <small>(כנ"ל בס"ק ל"ג) </small>וסה"ת אבל סמ"ג ומרדכי סי' תתרפ"ט כתבו שריב"א וד"ש חלקו ע"ז וראייתן ממש"ש צ"ט ב' דאריב"ח לא כו' שהרי ציר כו' וציר אינו אסור אלא מחמת שמנונית ואפ"ה משערינן בחומץ ומלח שבתוכו וצ"ע ואפשר לומר דס"ל דר' יוסי במתני' שם בהא פליג עלייהו דמשערינן בשמנונית לחוד ולכן אינו אוסר אלא בט"ז בו ופ' כר' יוסי אע"ג דת"ק פליג עליו משום דסוגיא דשם ק"ח ב' כוותיה כמש"ש וכמ"ש בתוס' שם וע' במרדכי שם בשם מהר"מ שפ' ג"כ כר' יוסי ע"ש ומ"ש בגמ' לא כל השיעורין כו' שהרי כו' משום דבזה לא פליג ר' יוסי אם היה המלח ומים אסורים מחמת עצמם (ע"כ)
**** ENGLISH ****
(ליקוט) אם forbiddenין because of themselves. כ"פ תוsixty (כit appears to me בs.k. ל"ג) }וSemak אבל Semag ומרדכי סי' תתרchapter 9 כתבו שריב"א וד"ש disagreedו ע"ז וראייתן ממש"ש צ"ט ב' דאריב"ח לא etc. שהרי broth etc. וbroth אינו forbidden אלא מחמת grease וeven so משערינן בחומץ וsalt שבתetc. וrequires study ואפשר לומר דס"ל דר' יוסי במתני' שם בהא פליג עלייהו דמשערינן בgrease לחוד ולכן אינו אוסר אלא בט"ז בו ופ' כר' יוסי even though דת"ק פליג עליו becauseסוגיא דשם ק"ח ב' כוותיה כמש"ש וכwhat he wrote בתוsixty שם וע' במרדכי שם in name of מהר"מ שפ' ג"כ כר' יוסי see there וwhat he wrote בגמ' לא כל השיskinין etc. שהרי etc. becauseבזה לא פליג ר' יוסי אם היה הsalt ומים forbiddenים מחמת עצמם (until here)
**** END BLOCK ****
```

### 15. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 8 — marker `ז`

- Quality: **error** — hebrew_in_english, marker_label_mismatch, overliteral
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 8
marker: ז
**** HEBREW ****
<b>(ליקוט) אינן בטלין בששים. </b>תוס' דע"ז שם ד"ה בתבלין כו' והג"א שם ד"ה תבלין כו' (ע"כ):
**** ENGLISH ****
(Lekut) אינן בטלין בששים. תוס' דע"ז שם ד"ה בתבלין כו' והג"א שם ד"ה תבלין כו' (end of his words):
**** END BLOCK ****
```

### 16. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 9 — marker `א`

- Quality: **error** — hebrew_in_english, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 9
marker: א
**** HEBREW ****
<b>וכן כ"ט כו'. </b>לשיטתו דבשאר איסורים לא אמרינן חנ"נ:
**** ENGLISH ****
וכן כ"ט כו'. — see there.
**** END BLOCK ****
```

### 17. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 9 — marker `ג`

- Quality: **error** — hebrew_in_english, untranslated_copy, marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 9
marker: ג
**** HEBREW ****
<b>וכ"ש בב' כו'. </b>דטעמא דהתירא ולשיטתו דוקא בכה"ג דל"ל נ"נ כמ"ש בסי' צ"ד ס"ו:
**** ENGLISH ****
וכ"ש בב' כו'. דטעמא דהתירא ולשיטתו דוקא בכה"ג דל"ל נ"נ כמ"ש בסי' צ"ד ס"ו:
**** END BLOCK ****
```

### 18. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 1 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=1#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 1
marker: _
**** HEBREW ****
<b>א) [סעיף א'] איסור שנתערב בהיתר מין בשאינו מינו כגון חלב שנתערב בבשר וכו'  </b>והיינו חלב בציר"י דהיינו תרבא דתרבא בבשרא הוי מין באינו מינו. ט"ז סק"א. ש"ך סק"א. פר"ח או' א' לה"פ או' א' בל"י או' א' כריתי או' א' חו"ד או' א' שפ"ד או' א' קהלת יהודה סעי' א' זב"צ או' א'.
**** ENGLISH ****
א) [seif א'] איסור שנתערב in heter מין בשאינו מינו כגון חלב שנתערב בmeat etc.  וthat is חלב בbroth"י that is תרבא דתרבא בmeatא הוי מין באינו מינו. ט"ז סק"א. ש"ך סק"א. Peri Chadash או' א' Lechem HaPanim או' א' Binyamin Zeev או' א' Kereti או' א' חו"ד או' א' שפ"ד או' א' Kehillat Yehudah סעי' א' Zivchei Tzedek או' א'.
**** END BLOCK ****
```

### 19. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 2 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=2#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 2
marker: _
**** HEBREW ****
<b>ב) שם. יטעמנו עכו"ם וכו'  </b>כבר כתבנו כמה פעמים דעכשיו המנהג כדברי מור"ם ז"ל בהגה דאין סומכים על טעימת עכו"ם אלא משערין הכל בס' בין האשכנזים בין הספרדים. וכ"כ לעיל סי' צ"ב או' ב' יעו"ש. וכ"כ זב"צ בסי' זה או' ב' וע"כ לא נאריך בטעימת נכרי כיון דלדידן לא נ"מ מידי. ועיין עוד לקמן או' י"א.
**** ENGLISH ****
ב) שם. יטעמנו non-Jew etc.  כבר כתבנו כמה פעמים דnow הcustom כדברי מור"ם and these are his words בהגה דאין סומכים על טעימת non-Jew אלא משערין הכל בsixty בין הAshkenazים בין הספרדים. and so too above סי' one must examine או' ב' יעו"ש. and so too Zivchei Tzedek בסי' זה או' ב' וuntil here לא נאריך בטעימת נכרי כיון דfor us לא נ"מ מידי. ועיין עוד below או' י"א.
**** END BLOCK ****
```

### 20. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 3 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 3
marker: _
**** HEBREW ****
<b>ג) שם. יטעמנו נכרי וכו'  </b>ואי אית ביה טעמא אע"ג דאית ביה טפי מס' אסור. ב"י פר"ח סוף או' ד' פר"ת או' ד' מזמור לדוד רסי' זה. זב"צ או' ג' ונ"מ גם לדידן שמשערין בס' אי אית ביה טעמא אסור.
**** ENGLISH ****
ג) שם. יטעמנו נכרי etc.  ואי אית ביה טעמא even though דאית ביה טפי מsixty forbidden. ben yomo Peri Chadash סוף או' ד' פר"ת או' ד' מזמור לדוד רסי' זה. Zivchei Tzedek או' ג' ונ"מ גם for us שמשערין בsixty אי אית ביה טעמא forbidden.
**** END BLOCK ****
```

### 21. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 4 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 4
marker: _
**** HEBREW ****
<b>ד) שם יטעמנו נכרי וכו'  </b>ומיהו מותר ללחוך בלשון באיסור במקום ספק כגון באינו יודע אם מלוח או במרה. ט"ז סק"ב. חו"ד או' ב' ובתנאי שיקנח הדם מעליו. ולשונו צריך תיקון. וה"ד במקום ספק שרי הא ודאי איסור אף בלשון אסור. מש"ז או' ב' וכבר כתבנו מזה לעיל סי' ס"ט או' ק"ט ובסי' מ"ב או' י"ד וית' עוד לקמן סי' ק"ח סעי' ה' בהגה יעו"ש.
**** ENGLISH ****
ד) שם יטעמנו נכרי etc.  ומיהו permitted ללחוך בlanguage of באיסור במקום doubt כגון באינו יודע אם מלוח או במרה. ט"ז סק"ב. חו"ד או' ב' ובתנאי שיקנח הblood מעליו. ולשונו צריך תיקון. וה"ד במקום doubt שרי הא certainly איסור even בlanguage of forbidden. מש"ז או' ב' וכבר כתבנו מזה above סי' seif 9 או' ק"ט ובסי' מ"ב או' י"ד וית' עוד below סי' ק"ח סעי' ה' בהגה יעו"ש.
**** END BLOCK ****
```

### 22. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 5 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 5
marker: _
**** HEBREW ****
<b>ה) שם. משערינן בס' וכו'  </b>והשיעור לבטל בס' הוא באומד ומדידה ולא במשקל. שער אפרים סי' נ"א. עבודת הגרשוני סי' ל' פר"ח סי' צ"ט או' ו' פר"ת שם סוף או' ד' בל"י שם סוף או' ו' מנ"י על התו"ח כלל פ"ה או' נ"ח וכתב דהמשער ע"י משקל טועה. מט"י בשו"ת שבסוף הספר דף ל"ה ע"ג. בית דוד חי"ד סי' מ"ג. שו"ג סי' צ"ט מחו' או' א' ברכ"י סי' צ"ט בשיו"ב או' ב' בשם כמה פו' חכ"א כלל נ"ב או' ג' וכתב דהמתיר ע"י משקל מאכיל טריפות. פ"ת בסי' זה או' ב' וה"ד באיסור קל צריך לשער במדידה אבל באיסור כבד צריך לשער במשקל. ב"ד שם. זב"צ או' ד'.
**** ENGLISH ****
ה) שם. משערינן בsixty etc.  והשיskin לבטל בsixty הוא באומד ומדידה ולא במשקל. שער אfruitם סי' נ"א. עבודת הגרשוני סי' ל' Peri Chadash סי' צ"ט או' ו' פר"ת שם סוף או' ד' Binyamin Zeev שם סוף או' ו' מנ"י על התו"ח כלל פ"ה או' נ"ח וwrote דהמשער ע"י משקל טועה. מט"י בשו"ת שat the end הספר daf ל"ה ע"ג. בית דוד חי"ד סי' מ"ג. שו"ג סי' צ"ט מחו' או' א' ברKnesset Yechezkel סי' צ"ט בשיו"ב או' ב' in name of כמה פו' חכ"א כלל נ"ב או' ג' וwrote דהמתיר ע"י משקל מאכיל טריפות. פ"ת בסי' זה או' ב' וה"ד באיסור קל צריך לשער במדידה אבל באיסור liver צריך לשער במשקל. ב"ד שם. Zivchei Tzedek או' ד'.
**** END BLOCK ****
```

### 23. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 6 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 6
marker: _
**** HEBREW ****
<b>ו) מיהו  </b>אם היה האיסור וההיתר במשקל שוים כגון שהיה האיסור בשר בלא עצמות וההיתר ג"כ בשר בלא עצמות יותר טוב הוא לשער ע"י המשקל שאז יצא השיעור מכוון ביותר. פר"ת שם. וכ"כ בתשו' חנוך בית יהודה סי' ל"ג דאם האיסור וההיתר שוים במשקל דהיינו ממין א' שאין א' כבד בטבעו יותר מחבירו וגם אין בו נפוח או חלל יותר מחבירו פשיטא דנוכל לשער בשניהם או במדידה או במשקל אמנם אם יש בחלק א' חלל יותר מחבירו דאז אם נשער במדידה צריך למעך החלל אז אמרינן השוקל משובח ממנו דשמא לא מיעך החלל יפה ובשני מינים א"א לשער במשקל ואפילו אם יש חלל ע"כ צריך למעך החלל יעו"ש. פ"ת שם. זב"צ או' ד' בן א"ח פ' קרח או' ב'.
**** ENGLISH ****
ו) מיהו  אם היה האיסור וההיתר במשקל שוים כגון שהיה האיסור meat without עצמות וההיתר ג"כ meat without עצמות יותר טוב הוא לשער ע"י המשקל שאז יצא השיskin מכוון ביותר. פר"ת שם. and so too בתשו' חנוך בית יהודה סי' ל"ג דאם האיסור וההיתר שוים במשקל that is ממין א' שאין א' liver בטבעו יותר מחבירו וגם אין בו נפוח או חלל יותר מחבירו פשיטא דנוכל לשער בboth of them או במדידה או במשקל אמנם אם יש בdisagreed א' חלל יותר מחבירו דאז אם נשער במדידה צריך למעך החלל אז אמרינן השוקל משובח ממנו דlest לא מיעך החלל יפה ובשני מינים א"א לשער במשקל ואפילו אם יש חלל until here צריך למעך החלל יעו"ש. פ"ת שם. Zivchei Tzedek או' ד' בן א"ח פ' קרח או' ב'.
**** END BLOCK ****
```

### 24. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 7 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=7#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 7
marker: _
**** HEBREW ****
<b>ז) ואם  </b>נפל חלב לתוך בשר או להיפך וכן אם נפל כבד לתוך התבשיל הרי אלו שוים בטבעם ומשערים במשקל. בן א"ח שם.
**** ENGLISH ****
ז) ואם  fell חלב לתוך meat או להיפך וכן אם fell liver לתוך the dish הרי אלו שוים בטבעם ומשערים במשקל. בן א"ח שם.
**** END BLOCK ****
```

### 25. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 8 — marker `_`

- Quality: **error** — hebrew_in_english, overliteral
- Checkpoint id: `siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=8#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: kaf-hachayim
seif: 8
marker: _
**** HEBREW ****
<b>ח) והעצמות  </b>הם כבדים מן הבשר אבל החלב אשר בבשר הוא שוה עם הבשר. שו"ג שם. בן א"ח שם.
**** ENGLISH ****
ח) והעצמות  הם liverים מן הmeat אבל the milk אשר בmeat הוא שוה עם הmeat. שו"ג שם. בן א"ח שם.
**** END BLOCK ****
```

### 26. `siman_098/kaf-hachayim/part-001.txt` — kaf-hachayim — seif 9 — marker `_`

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

### 27. `siman_098/kereti/part-001.txt` — kereti — seif 1 — marker `א`

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

### 28. `siman_098/kereti/part-001.txt` — kereti — seif 1 — marker `ב`

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

### 29. `siman_098/kereti/part-001.txt` — kereti — seif 1 — marker `ג`

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

### 30. `siman_098/kereti/part-001.txt` — kereti — seif 1 — marker `ד`

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

### 31. `siman_098/kereti/part-001.txt` — kereti — seif 1 — marker `ה`

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

### 32. `siman_098/kereti/part-001.txt` — kereti — seif 2 — marker `א`

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

### 33. `siman_098/kereti/part-001.txt` — kereti — seif 2 — marker `ב`

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

### 34. `siman_098/kereti/part-001.txt` — kereti — seif 2 — marker `ג`

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

### 35. `siman_098/kereti/part-001.txt` — kereti — seif 2 — marker `ד`

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

### 36. `siman_098/kereti/part-001.txt` — kereti — seif 2 — marker `ה`

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

### 37. `siman_098/kereti/part-001.txt` — kereti — seif 4 — marker `ב`

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

### 38. `siman_098/kereti/part-001.txt` — kereti — seif 5 — marker `ד`

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

### 39. `siman_098/kereti/part-001.txt` — kereti — seif 5 — marker `ה`

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

### 40. `siman_098/kereti/part-001.txt` — kereti — seif 7 — marker `_`

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

### 41. `siman_098/kereti/part-001.txt` — kereti — seif 8 — marker `א`

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

### 42. `siman_098/kereti/part-001.txt` — kereti — seif 8 — marker `ב`

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

### 43. `siman_098/kereti/part-001.txt` — kereti — seif 8 — marker `ג`

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

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_098
npm run pipeline:editorial:advance -- --siman 98
```

## Checkpoint ids

siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%92
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%93
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%94
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=4#marker=%D7%95
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%90
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%94
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=5#marker=%D7%95
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%90
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%92
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%93
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%94
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%95
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=8#marker=%D7%96
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=%D7%90
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=9#marker=%D7%92
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=1#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=2#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=3#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=4#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=5#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=6#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=7#marker=_
siman_098/kaf-hachayim/part-001.txt#slug=kaf-hachayim#seif=8#marker=_
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
siman_098/kereti/part-001.txt#slug=kereti#seif=4#marker=%D7%91
siman_098/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%93
siman_098/kereti/part-001.txt#slug=kereti#seif=5#marker=%D7%94
siman_098/kereti/part-001.txt#slug=kereti#seif=7#marker=_
siman_098/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%90
siman_098/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%91
siman_098/kereti/part-001.txt#slug=kereti#seif=8#marker=%D7%92