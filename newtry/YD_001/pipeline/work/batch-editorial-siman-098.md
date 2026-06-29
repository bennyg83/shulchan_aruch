# Editorial retranslation — Siman 98

Generated: 2026-06-16T20:34:51.116Z

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

## Blocks in this batch (45 of 154 remaining in scope)

### 1. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: א
**** HEBREW ****
<b>חלב. </b> כ' הש"ך דמדברי הטור משמע דהיינו חלב בציר"י דהוא תרבא אבל הראב"ן כ' בתשובה דחלב ובשר טעמן שוה וצ"ל דמיירי בבשר שמן עכ"ל:
**** ENGLISH ****
Milk. Shach wrote: from Tur's words it appears this is milk in brine, which is grease; but Ra'avad wrote in responsum that milk and meat have the same taste — one must say it deals with fatty meat — end of his words.
**** END BLOCK ****
```

### 2. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ב
**** HEBREW ****
<b>עובד כוכבים. </b> כתב בדרישה מדאסר בישראל למטעם בו יש ללמוד שפעמים שקונין בשר ואין ידוע אם מלוח הוא אם לא אסור לטעום בלשונו עכ"ל וכתב הט"ז ע"ז שהוא תמוה מאד דהא בסימן מ"ב גבי מרה כתב בהדיא דטועמו בלשונו וע"כ נראה דבטעימה בלשון אין בו חשש איסור במקום ספק ושאני הכא דהיה צריך לטעום ע"י אכילה ממש כדי להרגיש אם יש שם טעם וע"כ צריך שיטעמנו עובד כוכבים ועיין בא"ח סי' תקס"ז לענין תענית מבואר פשוט דאין איסור בטעימה בלשון לחוד:
**** ENGLISH ****
Non-Jew. Darkei Moshe wrote from that which is forbidden to an Israelite to taste it one learns that sometimes one buys meat from the butcher and it is unknown whether it is salted or not — forbidden to taste with his tongue — end of his words. Taz wrote on this that it is very astounding, for in siman 42 regarding marah he wrote explicitly that they taste with the tongue; therefore it appears that tasting with the tongue has no concern of prohibition in a case of doubt; and this case is different here because he needed to taste through actual eating in order to sense whether there is taste there — therefore a non-Jew must taste it. See Orach Chaim siman 567 regarding fast — plainly explained that there is no prohibition in tasting with the tongue alone.
**** END BLOCK ****
```

### 3. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ג
**** HEBREW ****
<b>שסומכין. </b> כתב הש"ך דבב"י פסק בכותי דלאו קפילא פירוש נחתום אומן סמכינן עליה במסל"ת דוקא ואקפילא סמכינן אפילו אינו מסל"ת דלא משקר שלא יפסיד אומנתו ונתבאר לך דכאן מיירי בעובד כוכבים שאינו קפילא ולכך צריך שלא ידע שסומכין עליו אלא שהקשו בט"ז ובש"ך כמה קושיות על המחבר דהא קיי"ל דאין עובד כוכבים נאמן במסל"ת רק בעדות אשה לבד ומכ"ש שהמחבר עצמו כ' בס"ב דמין בשאינו מינו אסור מדאורייתא א"כ היאך עובד כוכבים נאמן ותירץ הש"ך דיש לחלק דדוקא היכא דליכא למיקם עלה דמילתא הוא דאין עובד כוכבים מסל"ת נאמן באיסור תורה אבל במין בשא"מ כיון דאיכא למיקם עלה דמילתא להטעימו לקפילא סמכינן עליה והט"ז תירץ דס"ל להני פוסקים דהא דאין עובד כוכבים מסל"ת נאמן במידי דאורייתא היינו במאי דבעי עדות דוקא משא"כ באיסור והיתר דא"צ עדות גמורה אלא בהוכחה סגי מהני שפיר מסל"ת והא ראיה שקפילא מהני אפילו אינו מסל"ת מטעם דלא מרע חזקתיה ובמידי דבעי עדות ודאי לא מהני דבר כזה כנ"ל ליישב דעת הפוסקים אבל לענין הלכה קיי"ל בסימן שי"ו ולענין בכור דלא מהני מסל"ת וא"כ גם בשאר דוכתי לא מהני באיסור דאורייתא עכ"ל ועי' בסימן ט"ז סי"א ובסי' ס"ט ס"י ובסי' קכ"ב סי"א ובס"ס קל"ז:
**** ENGLISH ****
That we rely on him. Shach wrote: in Beit Yosef he ruled regarding a Samaritan who is not an expert baker — Explanation: an expert gentile baker, we rely on him through mesiach lefi tumo specifically; and for an expert we rely even if he is not mesiach lefi tumo, for he does not lie lest he lose his trade; and you understand that here it deals with a non-Jew who is not an expert, and therefore he must not know that we rely on him. But Taz and Shach challenged Mechaber with several difficulties, for we hold a non-Jew is not believed through mesiach lefi tumo except for testimony of a woman alone, and especially since Mechaber himself wrote in seif 2 that not its kind in its kind is forbidden by Torah law — how then is a non-Jew believed? Shach resolved that one may distinguish: specifically where we cannot establish the matter, a non-Jew mesiach lefi tumo is not believed regarding Torah prohibition; but in not its kind in its kind, since we can establish the matter by having an expert taste it, we rely on him. Taz resolved that these poskim hold that where a non-Jew mesiach lefi tumo is not believed in Torah matters — that is where full testimony is required; unlike issur and heter where full testimony is not needed, only proof suffices, mesiach lefi tumo helps well; and proof that an expert helps even when not mesiach lefi tumo because he does not ruin his presumption; but where testimony is required certainly such a thing does not help — thus I resolve the poskim's view; but for halachah we hold in siman 116 regarding firstborn that mesiach lefi tumo does not help, and therefore also in other places it does not help in Torah prohibition — end of his words. See siman 16 seif 11, siman 69 seif 10, siman 122 seif 11, and end of siman 137.
**** END BLOCK ****
```

### 4. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ד
**** HEBREW ****
<b>משערינן. </b> כתב הש"ך משמע דעת המחבר דכשיש שם עובד כוכבים לא שרינן אלא ע"י עובד כוכבים ואם אמר דאית ביה טעם איסור אסור אפי' טפי מס' ואי אמר דלית ביה טעם מותר אפילו בפחות מס' ולא אמרינן לשער בס' אלא כשאין שם עובד כוכבים או במין במינו:
**** ENGLISH ****
We estimate with sixty. Shach wrote: it appears Mechaber's view that when there is a non-Jew there we permit only through a non-Jew; and if he says there is forbidden taste it is forbidden even more than sixty; and if he says there is no taste it is permitted even in less than sixty; and we do not say to estimate with sixty except when there is no non-Jew or in its kind in its kind.
**** END BLOCK ****
```

### 5. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 1 — marker `ה`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 1
marker: ה
**** HEBREW ****
<b>לסמוך. </b> כ' הש"ך משמע דוקא אעובד כוכבים לא סמכינן אבל אטעימת ישראל סמכינן כגון גבי צנון שחתכו בסכין של בשר כמ"ש בסימן צ"ו <small>(וכגון תרומה שנפל לחולין דטעים ליה כהן)</small> וכן האומר קונם בשר ויין שאני טועם ונפל לתבשיל שאסור לו בנ"ט סמכינן אטעימת ישראל אפי' אינו אומן ואפי' נתערב גוף הדבר דודאי ישראל לא משקר דלא כעט"ז שמחמיר בזה עכ"ל:
**** ENGLISH ****
To rely. Shach wrote: it appears specifically on a non-Jew we do not rely, but on tasting by an Israelite we rely — such as regarding a radish cut with a meat knife as he wrote in siman 96 (and such as terumah that fell into hullin that a kohen tastes for him); and likewise one who says "Konam meat and wine that I taste" and forbidden food fell into a dish forbidden to him through taste — we rely on tasting by an Israelite even if he is not an expert, and even if the substance itself became mixed, for certainly an Israelite does not lie — unlike Pri Megadim who is stringent in this — end of his words.
**** END BLOCK ****
```

### 6. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 2 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 2
marker: א
**** HEBREW ****
<b>נודע. </b> הטעם כ' ר"ת וכל הפוסקים דמין במינו מדאורייתא בטל ברוב כיון שאינו נ"ט אלא דחכמים הצריכו ס' הלכך כיון שנודע שהיה רובו היתר רק הספק אם היה ס' ה"ל ספיקא דרבנן ולקולא משא"כ כשלא נודע דהיה רובו היתר ה"ל ספיקא דאורייתא ולחומרא <small>(אבל מין בשא"מ צריך מדאורייתא ס' והטעם משום דאיסור נותן טעם בהיתר נהפך ההיתר להיות כולו איסור ע"כ בספק החמירו)</small>:
**** ENGLISH ****
It is known. The reason: Rabbeinu Tam and all the poskim hold its kind in its kind is nullified in the majority by Torah law, since it is not noten taam but the Sages required sixty; therefore since it is known the majority was permitted, only the doubt is whether there was sixty — it is a rabbinic doubt and we go to leniency; unlike when it is not known the majority was permitted — it is a Torah doubt and we go to stringency (but not its kind in its kind requires sixty by Torah law, and the reason is because forbidden food imparts taste to permitted food and the permitted food becomes all forbidden — therefore in doubt they were stringent).
**** END BLOCK ****
```

### 7. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 2 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 2
marker: ב
**** HEBREW ****
<b>שמא. </b> והש"ך חולק על רמ"א והביא כמה ראיות שנהפוך הוא דהכל הולך בתר טעמא ולא בתר שמא רק ביין נסך או תקרובת עבודת כוכבים דאסור במשהו במינן וכן בדבר שיש לו מתירין דלא בטל כלל במינן בזה אזלינן בתר שמא ולא בתר טעמא אבל בדבר שמתבטל בס' אזלינן בתר טעמא ואפילו יבש ביבש ג"כ אזלינן בתר טעמא וכתב שהגיעו דבריו אלה לפני כמה גדולי הדור והסכימו עמו גם הגאון מהר"ר יושיע אמר שדבריו ברורים הם:
**** ENGLISH ****
Presumption. Shach disagrees with Rama and brought several proofs the opposite is true — everything follows taste and not presumption, except yayin nesekh or idolatrous offerings that are forbidden in any amount in their kind, and likewise something that has a way to permit it that is not nullified at all in its kind — in this we follow presumption and not taste; but in something nullified in sixty we follow taste, and even dry in dry likewise we follow taste; and he wrote these words of his reached several great authorities of the generation and they agreed with him, and also the Gaon Maharar Yoshiya said his words are clear.
**** END BLOCK ****
```

### 8. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 2 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 2
marker: ג
**** HEBREW ****
<b>רובו. </b> הטעם דס"ל מין בשאינו מינו מה"ת בנ"ט א"כ ה"ל ספיקא דאורייתא לחומרא וכ' הת"ח בשם או"ה דאפי' אם נפל חלב לבשר עוף שהוא דרבנן אפ"ה אם נשפך אסור הואיל וטעם כעיקר דאורייתא וכתבו הט"ז וש"ך דתמוהין מאד דבריו דמה בכך דטעם כעיקר הלא העיקר גופא אינו אלא מדרבנן וזה שכ' האו"ה אינו אלא למ"ד דבשר עוף בחלב דאורייתא אבל לדידן דקי"ל שהוא רק מדרבנן פשיטא אם נשפך דמותר <small>(וט"ז כ' וראוי להחמיר בעוף גזירה אטו נשפך בבשר בהמה משא"כ מין במינו ונשפך דאין שם גזירה אטו איסור דאורייתא)</small>:
**** ENGLISH ****
Its majority. The reason: he holds not its kind in its kind is forbidden by Torah law through taste; if so it is a Torah doubt to stringency. Turei Chayim wrote in the name of Issur VeHeter that even if milk fell on fowl meat which is rabbinic, nevertheless if spilled it is forbidden since taste is like substance by Torah law. Taz and Shach wrote his words are very astounding — what of it that taste is like substance, the substance itself is only rabbinic; and what Issur VeHeter wrote is only according to those who hold fowl in milk is Torah law, but for us who hold it is only rabbinic it is plain if spilled it is permitted (and Taz wrote it is proper to be stringent with fowl as a decree lest it be spilled with animal meat, unlike its kind in its kind and spilled where there is no decree lest Torah prohibition).
**** END BLOCK ****
```

### 9. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 2 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 2
marker: ד
**** HEBREW ****
<b>ומבטלו. </b> והש"ך אוסר עכ"פ את שאינו מינו <small>(וכן דעת הפר"ח)</small> והט"ז מתיר אפילו שאינו מינו ג"כ וכתב דכל זה לא מיירי אלא כשנתערב בפעם א' במינו ושאינו מינו אבל אם נתערב תחלה עם אינו מינו ואח"כ נתוסף שם מינו ודאי כבר נ"נ קודם שבא לשם מינו והוא פשוט עכ"ל:
**** ENGLISH ****
And nullifies it. Shach forbids in any case what is not its kind (and so Peri Chadash); Taz permits even what is not its kind as well, and wrote all this deals only when mixed once in its kind and not its kind; but if it first mixed with not its kind and afterward its kind was added there, certainly it already became nevelah before its kind came — and this is plain — end of his words.
**** END BLOCK ****
```

### 10. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 4 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 4
marker: א
**** HEBREW ****
<b>בכלי. </b> כ' הש"ך דוקא בכלי אבל בדבר מאכל קי"ל דנאסר כולו ואפילו בכלי דוקא אם נאסר ע"י מליחה או ע"י עירוי אבל אם נאסר ע"י כבישה צריך כולו ג"כ לשער נגד כולו וע"ל סי' צ"א ס"ה:
**** ENGLISH ****
In a vessel. Shach wrote: specifically in a vessel; but in food we hold all of it becomes forbidden; and even in a vessel specifically if forbidden through salting or through pouring; but if forbidden through pickling, all of it too must be estimated against all of it — see above siman 91 seif 5.
**** END BLOCK ****
```

### 11. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 4 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 4
marker: ב
**** HEBREW ****
<b>ויסירנו. </b> כתבו הט"ז וש"ך אבל בפחות מס' לא מהני תקנה זו דהא אם תחב כף בשר בקדרה של חלב ואנו רואין הכף כמו שהיה בתחלה אפ"ה אמרינן שהטעם יצא ממנו ה"נ בחלב לתוך היתר אע"פ שאח"כ צף למעלה מ"מ הטעם שלו נפלט ולא אמרינן תקנה זו אלא לחומרא בדאיכא ס' אבל בדליכא ס' ודאי חתיכה עצמה נ"נ ולא מהני אח"כ שיצוף למעלה ודלא כב"ח שמתיר בדיעבד:
**** ENGLISH ****
And one removes it. Taz and Shach wrote: but in less than sixty this remedy does not help, for if one inserts a spoon of meat into a milk pot and we see the spoon as it was at first, even so we say taste emerged from it; likewise milk into permitted food — even though afterward it floated above, nevertheless its taste was emitted; and we do not say this remedy except stringently when there is sixty; but when there is not sixty certainly the piece itself is nevelah and it does not help afterward that it floats above — unlike Bach who permits b'dieved.
**** END BLOCK ****
```

### 12. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: א
**** HEBREW ****
<b>איסור. </b> כתב הש"ך דמשמע מדברי הרב דס"ל דאף בשאר איסורים חנ"נ בכלי ישן מיהו היינו דוקא במקום שאין הפסד אבל בהפסד שרי בשאר איסורים בכלי ישן וכ"כ בת"ח ואף אם היא כף ישנה רק דידעינן כמה בלע א"צ לשער אלא כנגד הבשר והחלב כגון אם ניער בה כזית של בשר ואח"כ ביומו כזית חלב אין צריך אלא ס' נגד ב' זיתים עכ"ל:
**** ENGLISH ****
Forbidden amount. Shach wrote: it appears from the Rav's words he holds that even in other prohibitions chein nafsho applies in an old vessel; however that is specifically where there is no loss; but with loss it is permitted in other prohibitions in an old vessel — so too Turei Chayim; and even if it is an old spoon only we know how much was absorbed, one need not estimate except against the meat and the milk — such as if one shook an olive-volume of meat in it and afterward that day an olive-volume of milk, one needs only sixty against two olive-volumes — end of his words.
**** END BLOCK ****
```

### 13. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: ב
**** HEBREW ****
<b>הכזית. </b> דסבירא ליה דלגבי דבר הבלוע לא אמרי' חנ"נ:
**** ENGLISH ****
The olive-volume. He holds regarding absorbed matter we do not say chein nafsho.
**** END BLOCK ****
```

### 14. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 5 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 5
marker: ג
**** HEBREW ****
<b>חרס. </b> כ' הש"ך דמהרש"ל וב"ח חולקים על הר"ב בזה וכתבו דבכלי חרס ודאי אינו עולה על הדעת שגוף החרס יעשה נבלה וט"ז כתב דיש להחמיר בכ"ח אפילו חדש לשער נגד כולו ול"ד למ"ש רמ"א בסי' צ"ב ס"ה גבי טיפת חלב דלא אמרינן חנ"נ אם הוא כלי חדש דהתם שאני שעדיין כולו היתר לא שייך ביה חנ"נ משא"כ אם הוא בלוע מאיסור מיהו כ' הש"ך דבהפסד מרובה וכה"ג יש להקל כהפוסקים דבשל עץ ומתכת לא אמרינן נ"נ אבל בלא הפסד יש להחמיר בשאר כלים ישנים ב"י לומר דנ"נ אפי' בשל עץ ושל מתכת:
**** ENGLISH ****
Earthenware. Shach wrote: Maharshal and Bach disagree with Mechaber on this and wrote regarding earthenware certainly it is unthinkable the earthenware itself becomes nevelah; Taz wrote one should be stringent in all cases even new to estimate against all of it; and some say regarding what Rama wrote in siman 92 seif 5 regarding a drop of milk that we do not say chein nafsho if it is a new vessel — there it is different since still all of it is permitted chein nafsho does not apply; unlike if absorbed from prohibition; however Shach wrote with great loss and the like one may be lenient like the poskim that in wood and metal we do not say nevelah; but without loss one should be stringent in other old vessels — Beit Yosef to say nevelah even in wood and metal.
**** END BLOCK ****
```

### 15. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 8 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 8
marker: א
**** HEBREW ****
<b>הנוהגין. </b> פי' בין של תורה בין של דבריהם:
**** ENGLISH ****
Practiced. Explanation: both of Torah and of rabbinic origin.
**** END BLOCK ****
```

### 16. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 8 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 8
marker: ב
**** HEBREW ****
<b>עצמן. </b> כגון תבלין של עבודת כוכבים ושל ערלה וכיוצא בו ואפילו אין אסורים אלא מדרבנן לאפוקי אם הם רק בלועים מאיסור והטעם שהחמירו בתבלין לפי שמן הסתם נ"ט באלף ולפ"ז היכא דידוע בבירור שאינו נ"ט כגון שנפל קורט א' של מלח או תבלין ליורה גדולה מותר ופסק בת"ח דאפילו נפל מלח ותבלין לדבר ששוה בשמו אפ"ה כיון דחלוק בטעמא לא בטיל אבל אם נפל לדבר ששוה בטעמו בטל בס' וכ' באו"ה דהא דאינו בטל אפי' באלף היינו מדרבנן ואם אינו ידוע אם מרגישין טעמו או לא מתיר בכה"ג בא"ז גם עתה להאכילו לעובד כוכבים מסל"ת וכתב הט"ז וצ"ע לענין שומן של איסור שנפל למאכל אמאי יהיה בטל בס' הא לטעמא עביד ותירץ בשם או"ה דלא מקרי טעם בזה אלא דבר חריף ולא שומן דאף שגם הוא מטעים המאכל וממתיקו מ"מ אין נרגש כ"כ כמו דבר חריף משום הכי כתב כאן רמ"א כגון מלח ותבלין ועיין בא"ח סי' תקי"ג דשם לא מהני ס' אע"ג דאינו דבר חריף צ"ל דשאני התם שיש שם טעמא וחזותא גבי ביצה שלבנו בו מאכל משא"כ כאן וכתב עוד דשומן בשר שנפל לתוך מאכל חלב בטל בס' כיון שאין האיסור מצד עצמו רק מצד התערובות:
**** ENGLISH ****
In themselves. Such as spices of idolatry and of orlah and the like; and even if forbidden only rabbinically — to exclude if they are only absorbed from prohibition. The reason they were stringent with spices is because by presumption they are noten taam in a thousand; accordingly where known clearly it is not noten taam, such as a crumb of salt or spice fell into a large cauldron — permitted. Turei Chayim ruled even if salt and spice fell into something equal in name, even so since it differs in taste it is not nullified; but if it fell into something equal in taste it is nullified in sixty. He wrote in Issur VeHeter that not being nullified even in a thousand is rabbinic; and if unknown whether its taste is sensed or not, one permits in such a case through Or Zarua even now to feed it to a non-Jew through mesiach lefi tumo. Taz wrote: requires study regarding fat of forbidden food that fell into food — why should it be nullified in sixty, behold it is made for taste; he resolved in the name of Issur VeHeter that taste is not called such here but a sharp thing, not fat — for even though it also flavors the food and sweetens it, nevertheless it is not sensed so much as a sharp thing; therefore Rama wrote here such as salt and spice. See Orach Chaim siman 513 — there sixty does not help even though not a sharp thing; one must say it is different there because there is taste and appearance regarding an egg one whitened food with it, unlike here; and he also wrote meat fat that fell into milk food is nullified in sixty since the prohibition is not in itself but from the mixture.
**** END BLOCK ****
```

### 17. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 9 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 9
marker: א
**** HEBREW ****
<b>מצטרף. </b> שטעם דם וחלב אינו שוה הרי נתבטל טעם החלב בס' וטעם הדם בס' דמה לי איסור המבטל איסור ומה לי היתר המבטל איסור רק שיתבטל טעם האיסור ולא יהא לו עוד כח ליתן טעם בהיתר:
**** ENGLISH ****
Combines. Since the taste of blood and milk is not the same — behold the taste of milk is nullified in sixty and the taste of blood in sixty; what difference whether forbidden nullifies forbidden or permitted nullifies forbidden — only that the taste of the forbidden be nullified and it no longer have power to impart taste in permitted food.
**** END BLOCK ****
```

### 18. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 9 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 9
marker: ב
**** HEBREW ****
<b>בשוגג. </b> אבל במזיד יתבאר דינו בסי' צ"ט ס"ה וכ' בט"ז זה למאן דלית ליה חנ"נ בשאר איסורים אבל לפי מה דקי"ל דאמרינן חנ"נ בכל האיסורים גם זה התערובת אסור דכבר נעשה נבלה קודם התערובת והש"ך כתב דגם לדעת רמ"א מצינו דין זה לענין לח בלח דלא אמרינן חנ"נ בהפסד מרובה כדלעיל סי' צ"ב ס"ד א"נ דרמ"א אזיל לטעמיה דס"ל דאם נתוסף על האיסור בשוגג קודם שנודע התערובות לא אמרינן חנ"נ א"נ הכא מיירי שנתערבו שתי הקדרות יחד קודם שנודע התערובות אלא לפי מה שהוכחתי שם דאפילו לא נודע התערובות אמרי' חנ"נ א"כ לא שייך האי דינא רק בלח בלח בהפסד מרובה א"נ אם נפל כזית גבינה לכ"ט זיתים היתר ובקדירה אחרת נפל כזית בשר לשלשים זיתים של היתר ונתערבו ב' התערובות הללו בשוגג דמותר דלא שייך לומר חנ"נ כיון דעדיין כולו היתר א"נ נ"מ אם נפל כזית דם לתוך ס' זיתים של היתר ואח"כ נפל כזית ועוד של חלב לאותן ס"א זיתים דא"צ ס' נגד ב' זיתים אלו של איסור אלא גם הכזית דם שנפל בראשונה מצטרף לבטל החלב מיהו כ"ז דוקא בשני מיני אסורים שאין טעמן שוה אבל במין א' לעולם חוזר וניער כדלקמן סי' צ"ט ס"ו:
**** ENGLISH ****
Unwittingly. But intentionally its law is explained in siman 99 seif 5. Taz wrote: this is for one who does not hold chein nafsho in other prohibitions; but according to what we hold that we say chein nafsho in all prohibitions, this mixture too is forbidden for it already became nevelah before the mixture. Shach wrote: also according to Rama we find this law regarding moist in moist that we do not say chein nafsho with great loss as above siman 92 seif 4; or Rama follows his reasoning that he holds if added to the prohibition unwittingly before the mixture was known we do not say chein nafsho; or here it deals with two pots mixed together before the mixture was known; but according to what I proved there that even if the mixture was not known we say chein nafsho — if so this law applies only moist in moist with great loss; or if an olive-volume of cheese fell into fifty-nine olive-volumes of permitted food and in another pot an olive-volume of meat fell into thirty olive-volumes of permitted food and these two mixtures became mixed unwittingly — permitted, for chein nafsho does not apply since still all is permitted; or practical difference if an olive-volume of blood fell into sixty olive-volumes of permitted food and afterward another olive-volume and more of milk fell into those sixty-one olive-volumes — one does not need sixty against these two olive-volumes of prohibition, rather also the olive-volume of blood that fell first combines to nullify the milk; however all this is specifically with two kinds of prohibitions whose tastes are not equal; but in one kind one always returns and shakes as below siman 99 seif 6.
**** END BLOCK ****
```

### 19. `siman_098/baer-heitev/part-001.txt` — baer-heitev — seif 9 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: baer-heitev
seif: 9
marker: ג
**** HEBREW ****
<b>מבטל. </b> פי' שנפלו לירקות בקדרה דמהני כל אחד לשיעור ששים:
**** ENGLISH ****
Nullifies. Explanation: they fell into vegetables in a pot — each one helps for the measure of sixty.
**** END BLOCK ****
```

### 20. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 1 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 1
marker: א
**** HEBREW ****
מימר' דרבא חולין דף צ"ו:
**** ENGLISH ****
The memar of Rava, Chullin daf 96.
**** END BLOCK ****
```

### 21. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 1 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 1
marker: ב
**** HEBREW ****
רמב"ם בפרק ט"ו מהמ"א ואפילו אינו אומן בכך וכמ"ש הטור בשם הרשב"א:
**** ENGLISH ****
Rambam in chapter 15 of Forbidden Mixtures, and even if he is not expert in this — as Tur wrote in the name of Rashba.
**** END BLOCK ****
```

### 22. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 1 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 1
marker: ג
**** HEBREW ****
מבואר בסימן ק"ג:
**** ENGLISH ****
Explained in siman 103.
**** END BLOCK ****
```

### 23. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 1 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 1
marker: ד
**** HEBREW ****
טור בשם הרשב"א:
**** ENGLISH ****
Tur in the name of Rashba.
**** END BLOCK ****
```

### 24. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 2 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 2
marker: א
**** HEBREW ****
טור בשם ר"ת וכרבא דאמר מין במינו מדאורייתא ברובו בטל זבחים דף ע"ט:
**** ENGLISH ****
Tur in the name of Rabbeinu Tam, and like Rava who said its kind in its kind is nullified in its majority by Torah law — Zevachim daf 79.
**** END BLOCK ****
```

### 25. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 2 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 2
marker: ב
**** HEBREW ****
כדעת ר"ת דכיון שנתן האיסור טעם בהיתר נהפך כולו להיות איסור:
**** ENGLISH ****
According to Rabbeinu Tam, since the forbidden item imparted taste to the permitted food, all of it became forbidden.
**** END BLOCK ****
```

### 26. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 2 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 2
marker: ג
**** HEBREW ****
שם בשם הרשב"א:
**** ENGLISH ****
There, in the name of Rashba.
**** END BLOCK ****
```

### 27. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 2 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 2
marker: ד
**** HEBREW ****
ב"י בשם הרשב"א:
**** ENGLISH ****
Beit Yosef in the name of Rashba.
**** END BLOCK ****
```

### 28. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 4 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 4
marker: א
**** HEBREW ****
טור וכ"כ הרשב"א מהא דאמרינן גבי כחל מי ידעינן כמה נפק מיניה חולין דף צ"ז:
**** ENGLISH ****
Tur; and likewise Rashba from that which we say regarding udder — who knows how much emerged from it — Chullin daf 97.
**** END BLOCK ****
```

### 29. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 4 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 4
marker: ב
**** HEBREW ****
שם בשם ר' פרץ:
**** ENGLISH ****
There, in the name of R' Peretz.
**** END BLOCK ****
```

### 30. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 5 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 5
marker: א
**** HEBREW ****
שם וכ"כ הרשב"א בת"ה:
**** ENGLISH ****
There; and likewise Rashba in Terumat HaDeshen.
**** END BLOCK ****
```

### 31. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 5 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 5
marker: ב
**** HEBREW ****
שם ושם ופי' ישנה שניער בה באותו יום בהיתר קודם שניער בה החלב:
**** ENGLISH ****
There and there; and explained "old" — that one shook it in it that same day in permitted food before shaking in it the milk.
**** END BLOCK ****
```

### 32. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 5 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 5
marker: ג
**** HEBREW ****
הרשב"א שם בשם הרמב"ן דס"ל דלא אמרינן בבלוע חתיכה נעשית נבילה:
**** ENGLISH ****
Rashba there in the name of Ramban, who holds we do not say regarding absorbed food that the piece becomes nevelah.
**** END BLOCK ****
```

### 33. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 9 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=9#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 9
marker: א
**** HEBREW ****
טור ממשנה ב' פ"ב דערלה ומימר' דר' יוחנן הפיגול והנותר וכו' זבחים דף ע"ה:
**** ENGLISH ****
Tur from mishnah 2 chapter 2 of Orlah, and the memar of R' Yochanan regarding pigul and leftover, etc. — Zevachim daf 75.
**** END BLOCK ****
```

### 34. `siman_098/beer-hagolah/part-001.txt` — beer-hagolah — seif 9 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=9#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beer-hagolah
seif: 9
marker: ב
**** HEBREW ****
הרא"ש בתשובה מהא דלעיל:
**** ENGLISH ****
Rosh in responsum from that which is above.
**** END BLOCK ****
```

### 35. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: א
**** HEBREW ****
<b>כגון חלב כו'. </b>אבל הר"ן כתב שהוא מין במינו ממ"ש ק"ג א' אכל חלב מן החי כו' דחייב משום בשר מן החי אלמא מין בשר הוא <small>(עפר"ח ס"ק ז' מש"ש ומיהו כ"ז אליבא דר"י כו' פשיטא דחלב כו'. וע"ל ס"ק ט') </small>וז"ש <small>(צ"ח א') </small>ההוא כזיתא תרבא כו' ואי בטעמא מה שייך במה דבלע כו' וכן מש"ש ההוא פלגא דזיתא כו' ואי בטעמא לא שייך לפלוגי בדרבנן כיון שניכר טעמו וכ"כ ראב"ן ע"ש וע"ל סי' צ"ט ס"ד מ"ש שם: <br><b>(ליקוט) כגון חלב כו'. </b>ליתא שכבר כ' בת"ה שגירסת הגאונים והרי"ף בפג"ה <small>(צ"ז ב') </small>מין במינו כגון שומנא דגיד כו' ע"ש (ע"כ).
**** ENGLISH ****
Such as milk, etc. But Ran wrote that it is min b'mino from what he wrote 103:1 "if one ate milk from a living animal," etc., that he is liable because of meat from a living animal — evidently it is a species of meat (Peri Chadash s.k. 7 in what he wrote, and nevertheless all this is according to R' Yehuda, etc. — it is obvious regarding milk, etc., and see s.k. 9). And he wrote (98a) "that olive's bulk of fat," etc., and if by taste, what relevance in what was absorbed, etc.; and so too in what he wrote "that half an olive," etc., and if by taste it is not relevant to distinguish in rabbinic matters since its taste is recognizable; and so too Raavan — see there; and see siman 99 seif 4 what is written there. (Lekut) Such as milk, etc. — this is not so, for he already wrote in Taharat HaBayit that the girsa of the Geonim and Rif in Pesachim (97b) is min b'mino, such as fat of the gid, etc. — see there (until here).
**** END BLOCK ****
```

### 36. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ב
**** HEBREW ****
<b>יטעמנו עובד כוכבים. </b>אע"ג דבגמ' אמרו קפילא דוקא היינו שאינו מסל"ת ונאמן משום דאומן לא מרעי נפשיה כמ"ש תוס' שם ד"ה סמכינן כו' אבל מסל"ת נאמן כל עובדי כוכבים ואע"ג דאין נאמן אלא בדרבנן כמ"ש בפ' בתרא דב"ק <small>(קי"ד ב') </small>כאן כיון שהוא מילתא דעבידא לגלויי נאמן כמ"ש הריב"ש בסי' תל"ג ובמ"ש ברפ"ב דר"ה ואף גוי כמ"ש בפ"ג דחולין (ס"ג ב') לוקחין ביצים כו'. וא"ל דוקא קפילא שהוא בקי דהא אמרו שם דהתירא בטעמא ולא אמרו קפילא וכן שם וקי"א ב' תרומה טעים לה כהן. ת"ה:
**** ENGLISH ****
Let a non-Jew taste it. Even though in the Gemara they said kapila specifically — that is, he is not mashe'as l'fi tumo and is believed because a craftsman does not impair himself, as Tosafot wrote there s.v. samchinan, etc. — but mashe'as l'fi tumo is believed for all gentiles; and even though he is not believed except in rabbinic matters, as written in the last chapter of Bava Kama (114b), here since it is a matter done for revelation he is believed, as Rivash wrote siman 433 and in what he wrote in chapter 2 of Rosh HaShanah; and even a gentile, as written in chapter 3 of Chullin (63b) "they buy eggs," etc. And some say specifically kapila who is expert, for they said there that heter is by taste and they did not say kapila; and so too there, and two terumah — a priest tastes for her. Taharat HaBayit.
**** END BLOCK ****
```

### 37. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ג
**** HEBREW ****
<b>או שאומר כו'. </b>כמ"ש בפ"י דתרומות ופ"ב <small>(נ"ו א' ל"ה ב' ל"ט א"ב) </small>ופ"ה דע"ז במתני' <small>(ס"ה ב') </small>וגמ' שם הכי הלכתא <small>(ס"ז א') </small>א"ר הלכתא כו' <small>(ס"ח ב'):</small>
**** ENGLISH ****
Or that he says, etc. As written in chapter 10 of Terumot and chapter 2 (56a, 35b, 39a, 39b) and chapter 5 of Avodah Zarah in the Mishnah (65b) and Gemara there — thus is the halachah (67a) Rabbi said the halachah, etc. (68b).
**** END BLOCK ****
```

### 38. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ד
**** HEBREW ****
<b>והוא כו'. </b>בירושלמי פ"י דתרומות הלכה ב' ופ"ב דערלה הלכה ה' כל נ"ט בין לפגם בין לשבח אסור דר"מ רש"א לשבח אסור לפגם מותר רשב"ל אמר בשהשביח ואח"כ פגם אבל אם פגם ואח"כ השביח אף ר"מ מורה ר' יוחנן אמר לא שניא הוא השביח ופגם הוא פגם והשביח הוא המחלוקת כו' וקי"ל דהלכה כר"י וכיון דאיפסיק בגמ' דידן דהשביח ולבסוף פגם דאסור ה"ה לפגם וסוף השביח דהא שניהם שוין ועוד דמתני' כר"מ כמש"ש אמר עולא מחלוקת כו' אלא דלר"י בגמ' דאמר בפוגם מעיקרא מחלוקת א"א לאוקמי כר"מ אף אם תאמר בין בזו כו' אלא דהרמב"ם מפרש פוגם מעיקרא היינו פגם ולבסוף השביח כמ"ש בפי' שם והחלק הד' שמפסידו לפי שעה וברוב הימים משביחו כו' וזה נקרא פוגם מעיקרו אמנם פוגם מתחלה ועד סוף אצ"ל שהוא מותר כו' ומפרש דעולא ס"ל כרשב"ל בירושלמי ור"י אם אומר בשניהם מחלוקת הוא כשיטתו בירושלמי ומתני' לכ"ע כר"מ דבפוגם לגמרי ליכא למ"ד דאסור וכמ"ש בפי' אמנם פוגם מתחלה כו' כנ"ל ובזה מתורץ קושית תוס' שם ד"ה או כו' וג"כ ניחא דפריך רב חגא יין כו' ולא משני בשנצטנן אח"כ דמן הסתם הוא כן כמ"ש בירושלמי כמ"ש למטה ופסק כר' יוחנן ואף אם אומר דוקא בפוגם מעיקרא מחלוקת י"ל דמתני' ר"מ היא ובפי' הרמב"ם ט"ס שכתב ושני חלקים הנשארים כו' דהא השביח בתחלה נתבאר בגמ' שאסור ועוד שאמר איזה מהן כו' דמשמע דיש סברא ג"כ דפוגם לבסוף קל מהשביח לבסוף וזה ליכא למ"ד דר"י ל"ק אלא בין כו' ובירושלמי הנ"ל לא שניא כו' וצ"ל החלק הרביעי לא נתברר כו' דאם אומר בין בזו כו' ע"כ קי"ל כר"מ ושניהם אסורין ואם אומר דפוגם מעיקרא לבד מחלוקת וכמו שנפשט בגמ' שם אין ידוע אם הלכה כר"מ או כר"ש אבל בירושלמי דע"ז שם א"ר יוחנן הדא אמרה ברותחין אבל בצונן אסור היו רותחין וציננן ר"ל מהו. מעתה אפילו רותחין יהו אסורין מאחר שדרכן ליצנן כו' משמע דמותר אלא שהרמב"ם מפרש שהאיבעיא הוא כשיצטנן אם הוא פוגם עדיין מאחר שנפל לרותחין וכ"מ בפי' הרמב"ם ע"ש. אבל פשטא דירושלמי לא משמע כן וגם סוגיא דגמ' קשה לפירושו דאמר שם א"ר עמרם ניחזי כו' אר"ז שאני עיסה כו' וכן בירושלמי דתרומות וערלה שם ושם אמרו תמן תנינן שעורים שנפלו לתוך הבור כו' רי"א במחלוקת רשב"ל אמר ד"ה ואם איתא אפילו לר"י ד"ה היא אלא דפוגם מעיקרא ומתחלה ועד סוף דין א' להם ובזה ניחא דפריך רב חגא כו' ולא אוקים בשציננן וסוגיא דגמ' פגם מעיקרא משמע מתחלה ועד סוף וז"ש שם א"ר הלכתא כו' לאפוקי מר"ש לדעת ר' יוחנן. וב"י כתב דלמד מק"ו מהשביח ולבסוף פגם וטעה מאד בזה דהא ר"ל אמר מה פליגין וכן עולא בגמ' וכן איבעיא לגמ' לרבי יוחנן בפגם מעיקרא כו' אבל כו' ואף לסברא דבשניהם מחלוקת ר"ל גם בזו מחלוקת:
**** ENGLISH ****
And it, etc. In Yerushalmi chapter 10 of Terumot halachah 2 and chapter 2 of Orlah halachah 5: all noten taam, whether for spoilage or for improvement, is forbidden — R' Meir; R' Shimon says for improvement forbidden, for spoilage permitted; R' Shimon ben Lakish said when it improved and afterward spoiled; but if it spoiled and afterward improved, even R' Meir agrees; R' Yochanan said there is no difference — whether it improved and spoiled or spoiled and improved, the dispute is, etc.; and we establish the halachah like R' Yochanan. And since it was concluded in our Gemara that it improved and in the end spoiled and is forbidden, the same applies to spoilage and in the end improvement, for both are equal; and furthermore the Mishnah is like R' Meir, as written "Ulla said dispute," etc. — except that for R' Yochanan in the Gemara who said the dispute is in spoiling from the outset, it is impossible to establish like R' Meir even if you say "whether in this," etc.; rather Rambam explains spoiling from the outset means it spoiled and in the end improved, as written in his commentary there; and the fourth section that spoils it for a time and on most days improves it, etc. — this is called spoiling from its outset; however spoiling from beginning to end one must say it is permitted, etc.; and he explains Ulla holds like R' Shimon ben Lakish in Yerushalmi, and R' Yochanan if he says the dispute is in both follows his method in Yerushalmi, and the Mishnah is for all like R' Meir that in complete spoiling there is no one who forbids; and as written in his commentary "however spoiling from the outset," etc., as above — and with this the challenge of Tosafot there s.v. or is resolved; and it is also satisfactory that Rav Chagga challenged regarding wine, etc., and they do not answer when it cooled afterward, for ordinarily it is so, as written in Yerushalmi, as written below, and he ruled like R' Yochanan; and even if one says the dispute is specifically in spoiling from the outset, one may say the Mishnah is R' Meir; and in Rambam's commentary there is an error, for he wrote "and two sections remain," etc., for behold it improved at first was explained in the Gemara as forbidden; and furthermore that he said "which of them," etc., implies there is also a view that spoiling at the end is lighter than improving at the end — and this there is no one who holds for R' Yochanan; rather only "whether," etc. And in the Yerushalmi there "there is no difference," etc., and one must say the fourth section was not clarified, etc. — if one says "whether in this," etc., until here we establish like R' Meir and both are forbidden; and if one says spoiling from the outset alone is the dispute, as spread in the Gemara there, it is not known whether the halachah is like R' Meir or like R' Shimon; but in Yerushalmi of Avodah Zarah there R' Yochanan said: this says in boiling ones, but in cold ones forbidden — they were boiling and cooled — meaning what is it? From now even if boiling they would be forbidden since their way is to cool, etc. — it appears permitted; except that Rambam explains the question is when it cooled whether it still spoils since it fell into boiling ones, and so too in Rambam's commentary — see there. But the plain sense of Yerushalmi does not imply thus; and also the Talmudic passage is difficult for his explanation, for he said there R' Amram said let us see, etc., R' Zeira said dough is different, etc.; and so too Yerushalmi of Terumot and Orlah there; and there they said: there we learned barley that fell into the pit, etc.; R' Yosi in dispute; R' Shimon ben Lakish said s.v. and if so even for R' Yochanan s.v. it is — rather spoiling from the outset and from beginning to end one law for them; and with this it is satisfactory that Rav Chagga challenged, etc., and they do not establish when it cooled; and the Talmudic passage spoiling from the outset implies from beginning to end; and he wrote there R' said the halachah, etc., to exclude from R' Shimon according to R' Yochanan. And Beit Yosef wrote he learned from a kal va'chomer from improved and in the end spoiled and erred greatly in this, for R' Shimon ben Lakish said how they dispute, and so Ulla in the Gemara, and so the Gemara asked for R' Yochanan in spoiling from the outset, etc.; but, etc., and even according to the view that the dispute is in both, R' Shimon ben Lakish also disputes in this.
**** END BLOCK ****
```

### 39. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ה`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ה
**** HEBREW ****
<b>וצריך כו'. </b>רשב"א וכנ"ל דמש"ה נקט קפילא. וצ"ע למה השמיט קפילא דנאמן בכ"ע והלך בדרך הרמב"ם שהשמיטו אבל הרמב"ם מפרש קפילא ל"ד אלא שהוא בקי בהכרת הטעם וכמ"ש הריב"ש בסי' רפ"ח דלא כב"י ולכן לא הזכיר מסל"ת דסובר דא"צ משום דעבידא לגלויי ול"ד לביצים דסובר דדוקא בישראל משום דלא עבידא לגלויי כמו כאן [אלא שב"י הכריע מדעתו כי ד' שיטות תוס' כתבו דוקא קפילא ורא"ש כ' קפילא ומסל"ת ורשב"א פסק דבא' מהן ורמב"ם פסק דא"צ לא קפילא ולא מסל"ת והכריע כמ"ש כאן וע' בטור וב"י]:
**** ENGLISH ****
And it is required, etc. Rashba, and as above, that for this reason he mentioned kapila. And it requires study why he omitted kapila who is believed for all, and followed the way of Rambam who omitted it; but Rambam explains kapila — some say — rather that he is expert in recognizing taste, as Rivash wrote siman 288, unlike Beit Yosef; and therefore he did not mention mashe'as l'fi tumo, for he holds it is not needed because it is done for revelation; and some say for eggs he holds specifically by an Israelite because it is not done for revelation like here [except Beit Yosef decided from his view that four views Tosafot wrote specifically kapila, and Rosh wrote kapila and mashe'as l'fi tumo, and Rashba ruled in one of them, and Rambam ruled one needs neither kapila nor mashe'as l'fi tumo, and he decided as written here; see Tur and Beit Yosef].
**** END BLOCK ****
```

### 40. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ו`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ו
**** HEBREW ****
<b>וכן אם הוא כו'. </b>דלא כר' יהודה וכמ"ש רבא שם וכן בפסחים ל' א' א"ר הלכתא כו' משמע דוקא בחמץ <small>(ערא"ש בפ"ה דע"ז ס"ס כ"ט) </small>וכן ס"ל לר"י ור"ל שם ובפ"ה דע"ז והא דאיפליגו אביי ורבא שם <small>(ס"ו א') </small>בתר שמא או בתר טעמא היינו בטבל ויי"נ דלהכי נקט חמרא וחמירא וכן סתמא דפ"ה די"ט <small>(ל"ח ב') </small>שפיר עבידו דאחיכו כו' וכן ס"ל לראב"י דהלכה כמותו <small>(אפי' בברייתא כמ"ש ביבמות ל"ז ס' א') </small>בזבחים ע"ט ב' וכן כל הסוגיא דפ' ג"ה <small>(צ"ח א') </small>ביצה בס"א ובמינה איירי כמש"ל סי' פ"ו ס"ה וכן פליגי אליבא דריב"ל שם בס' או במאה ולמדו מזרוע בשלה שהוא מין במינו וקי"ל כריב"ל בכ"מ ובע"ז ס"ט א' איפסיק הלכתא בששים: <br><b>(ליקוט) וכן כו'. </b>כר"י ור"ל דהלכה כר"י לגבי רב ושמואל כמ"ש בפ"ק די"מ <small>(ד') </small>ופ"ד דעירובין <small>(מ"ז ב') </small>וכן ס"ל לרבא בפ' התערובות <small>(ע"ט א') </small>ופ' ג"ה וכן ס"ל לראב"י בפ' התערובות ומשנת ראב"י קב ונקי וכן בפ"ה דע"ז <small>(ס"ט א') </small>והלכתא כו' וכן כל כו' <small>(לפי' הריטב"א שם אין ראיה וע"ש) </small>והא דפליגי אביי ורבא שם בחלא וחמירא היינו בטבל ויי"נ והא דרבא פ"ב דפסחים שם משום חומרא דחמץ כמו שאינו מינו לרב ה"ה מינו לרבא תוס' וש"פ (ע"כ):
**** ENGLISH ****
And likewise if it is, etc. Unlike R' Yehuda, as Rava wrote there; and so too in Pesachim 40a R' said the halachah, etc. — it appears specifically regarding chametz (Erech Shai in chapter 5 of Avodah Zarah end of seif 29); and so too R' Yosi and R' Shimon ben Lakish hold there and in chapter 5 of Avodah Zarah; and that Abaye and Rava disputed there (66a) whether after name or after taste — that is regarding tevel and yayin nesech, for therefore he mentioned new wine and vinegar; and so too the anonymous ruling of chapter 5 diyyud-tet (38b) "well they did that they laughed," etc.; and so too Ra'avyah holds the halachah like him (even in a baraita as written in Yevamot 37 seif 1) in Zevachim 89b, and so too the whole Talmudic passage of chapter 3 (98a) egg in 101 and deals with its species, as written above siman 86 seif 5; and so too they dispute according to R' Yehuda ben Lakish there in sixty or in one hundred, and they learned from the foreleg that was cooked that it is min b'mino; and we establish like R' Yehuda ben Lakish everywhere, and in Avodah Zarah 69a the halachah was concluded in sixty. (Lekut) And likewise, etc. — like R' Yosi and R' Shimon ben Lakish that the halachah is like R' Yosi against Rav and Shmuel, as written in first chapter of Yevamot (4) and chapter 4 of Eruvin (47b); and so too Rava holds in chapter HaTa'aruvot (79a) and chapter 3; and so too Ra'avyah holds in chapter HaTaarovot and Mishnat Ra'avyah is clean; and so too in chapter 5 of Avodah Zarah (69a) and the halachah, etc.; and so too all, etc. (according to Ritva's commentary there there is no proof — see there); and that Abaye and Rava disputed there regarding vinegar and vinegar — that is regarding tevel and yayin nesech; and that Rava in chapter 2 of Pesachim there is because of the stringency of chametz, as not in its species for Rav, the same applies in its species for Rava — Tosafot and Shulchan Pesak (until here).
**** END BLOCK ****
```

### 41. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 1 — marker `ז`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%96`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 1
marker: ז
**** HEBREW ****
<b>ואין נוהגין כו'. </b>מצד החומרא וכפי' הרא"ש ור"ן דלא הוזכר נ"ט אלא בפחות מס' אבל בס' מסתמא אין בו נ"ט וז"ש בכ"מ כל האיסורין שבתורה בס' [וער"ס צ"ט ירושלמי נ"ט א' מס' כו' וכן בע"ז ס"ט א' והלכתא כו'] וז"ש סמכינן אקפילא ואי בס' מאי סמכינן דמשמע דקולא היא הא בלא קפילא מותר לגמרי ודברי ש"ע אין בהן הכרע שהוא כדברי הגמ' דלא כש"ך וע"ל סי' ק' ס"ב:
**** ENGLISH ****
And we are not accustomed, etc. From the side of stringency, and in the explanation of Rosh and Ran that noten taam was mentioned only in less than sixty, but in sixty ordinarily there is no noten taam; and he wrote in several places "all Torah prohibitions in sixty" [and in beginning of siman 99 Yerushalmi noten taam one in sixty, etc., and so too in Avodah Zarah 69a and the halachah, etc.]; and he wrote we rely on kapila, and if in sixty what do we rely on — it appears it is lenient — behold without kapila it is entirely permitted; and the words of Shulchan Aruch have no decision, for it is like the words of the Gemara, unlike Shach; see siman 100 seif 2.
**** END BLOCK ****
```

### 42. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: א
**** HEBREW ****
<b>(ליקוט) אם כו' </b>אבל כו'. כשיטת ר"ת ועבת"ה ק' ק"א שהאריך שם (ע"כ): <br><b>(ליקוט) אם נתערב כו'. </b>הרא"ש בפ' ג"ה אליבא דר"ת שסובר דמין בשא"מ דאורייתא אפילו במשהו וטעמא ומ"ש טעמו ולא ממשו אין לוקין עליו היינו במין במינו ומשמע ברא"ש אבל לפי' ר' חיים דוקא בשיש כבא"פ דלא נקט אלא לפי' ר"ת וכ"ד הרמב"ן הביאו הרא"ש בסוף חלה אבל הראב"ד וטור כ' דאפילו אין כבא"פ מ"מ הוי כמו חצי שיעור שאסור מן התורה וכן כולו נהפך לאיסור וט"ס בטור שכ' ר"ת וצ"ל ר"ת (ע"כ):
**** ENGLISH ****
(Lekut) If, etc. But, etc. — like the method of Rabbenu Tam and in Taharat HaBayit 100 101 where he expanded there (until here). (Lekut) If it became mixed, etc. — Rosh in chapter 3 according to Rabbenu Tam who holds min she'eino mino is d'oraisa even in a minute amount and taste, and what he wrote "its taste and not its substance one is not lashed for it" — that is in min b'mino; and it appears in Rosh; but according to R' Chaim specifically when there is kebe'eiphah, for he mentioned only according to Rabbenu Tam's explanation; and so too Ramban that Rosh brought at the end of challah; but Raavad and Tur wrote that even if there is no kebe'eiphah nevertheless it is like half a measure that is forbidden from the Torah, and so all of it becomes prohibition; and there is an error in Tur that wrote Rabbenu Tam and one must say Rabbenu Tam (until here).
**** END BLOCK ****
```

### 43. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: ב
**** HEBREW ****
<b>ולענין כו'. </b>כרבא ע"ז ס"ו א'. ועש"ך וכ"מ בגמ' הנ"ל מין במינו דליכא למיקם אטעמא משמע שהטעמים שוין ועתוס' דזבחים ע"ח א' ד"ה אלא כו' ומנחות כ"ג ב' ד"ה אלא כו':
**** ENGLISH ****
And regarding, etc. Like Rava Avodah Zarah 66a. And Shach, and so too in the Gemara there min b'mino that there is no way to establish by taste — it appears the tastes are equal; and Tosafot Zevachim 88a s.v. ela, etc., and Menachot 23b s.v. ela, etc.
**** END BLOCK ****
```

### 44. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: ג
**** HEBREW ****
<b>אבל נתערב כו'. </b>דקיי"ל טעם כעיקר דאורייתא כמ"ש בפ"ג דפסחים <small>(מ"ד) </small>ופ"ו דנזיר ליתן טעם כו' וע"כ דרשא גמורה היא מדפריך והאי משרת להכי הוא דאתא ולר"ע לוקין על היתר מצטרף לאיסור ובזבחים ע"ח ב' אלא מין בשאינו מינו כו' ושם ע"ט א' אמור רבנן כו' וע"כ מדאורייתא דומיא דמין במינו שהוא דאורייתא כמש"ש ע"ח א' א"ה אימא סיפא כו' והא דאמרינן בע"ז ס"ז ב' טעמו ולא ממשו כו' פי' בתוס' שם ד"ה אר"י בשם ר' אליהו דכזית בא"פ קרי טעמו וממשו וכתב הרא"ש בפ' ג"ה דלוקין אפילו על כזית ממנו דכולה נתהפך לאיסור דטעם כעיקר דאורייתא וכמ"ש משרת ליתן כו' שאם שרה כו' ואם אינו בא"פ אין לוקין ועבתוס' ורא"ש בפ' ג"ה וכ"כ הראב"ד ורשב"א וכתבו דמ"מ אסור הוא מדאורייתא כמו חצי שיעור ברפ"ח דיומא ועהג"א פ"ה דע"ז סי"א ד"ה וטעם כו' ועמ"ש בא"ח סי' תנ"ג ס"ב:
**** ENGLISH ****
But it became mixed, etc. We establish taam ka'ikar is d'oraisa, as written in chapter 3 of Pesachim (44) and chapter 6 of Nazir "to give taste," etc.; and until here it is a complete derashah from that they challenge "and this serves for this it came"; and for R' Akiva one is lashed for heter that combines to prohibition; and in Zevachim 88b "except min she'eino mino," etc., and there 89a "the rabbis said," etc.; and until here from the Torah similar to min b'mino which is d'oraisa, as written 88a "if so say the conclusion," etc.; and that we say in Avodah Zarah 67b "its taste and not its substance," etc. — Tosafot explained there s.v. Amar R' Yosi in the name of R' Eliyahu that an olive's bulk in kebe'eiphah is called its taste and substance; and Rosh wrote in chapter 3 that one is lashed even on an olive's bulk from it, for all of it became prohibition, taam ka'ikar d'oraisa, as written "serves to give," etc., that if it dissolved, etc., and if it is not in kebe'eiphah one is not lashed; and Tosafot and Rosh in chapter 3, and so too Raavad and Rashba, and they wrote that nevertheless it is forbidden d'oraisa like half a measure in the first chapter of Yoma; and Hagahot Ashiri chapter 5 of Avodah Zarah seif 1 s.v. and taste, etc.; and see Orach Chaim siman 453 seif 2.
**** END BLOCK ****
```

### 45. `siman_098/beur-hagra/part-001.txt` — beur-hagra — seif 2 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: beur-hagra
seif: 2
marker: ד
**** HEBREW ****
<b>ואם נתערב במינו כו'. </b>כמ"ש בחולין ק' ב' ובע"ז ע"ג א' ב':
**** ENGLISH ****
And if it became mixed in its species, etc. As written in Chullin 100b and Avodah Zarah 73a.
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

siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%90
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%91
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%92
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%93
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=1#marker=%D7%94
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%90
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%91
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%92
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=2#marker=%D7%93
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%90
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=4#marker=%D7%91
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%90
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%91
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=5#marker=%D7%92
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%90
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=8#marker=%D7%91
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%90
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%91
siman_098/baer-heitev/part-001.txt#slug=baer-heitev#seif=9#marker=%D7%92
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%90
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%91
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%92
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=1#marker=%D7%93
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%90
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%91
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%92
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=2#marker=%D7%93
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%90
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=4#marker=%D7%91
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%90
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%91
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=5#marker=%D7%92
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=9#marker=%D7%90
siman_098/beer-hagolah/part-001.txt#slug=beer-hagolah#seif=9#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%90
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%92
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%93
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%94
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%95
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=1#marker=%D7%96
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%90
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%91
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%92
siman_098/beur-hagra/part-001.txt#slug=beur-hagra#seif=2#marker=%D7%93