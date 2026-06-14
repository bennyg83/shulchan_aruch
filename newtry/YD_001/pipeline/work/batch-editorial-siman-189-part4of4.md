# Editorial retranslation — Siman 189 (part 4/4)

Generated: 2026-06-14T11:47:54.423Z

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

## Blocks in this batch (45 of 454 remaining in scope)

### 1. `siman_189/tiferet-yisrael/part-001.txt` — tiferet-yisrael — seif 4 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_189/tiferet-yisrael/part-001.txt#slug=tiferet-yisrael#seif=4#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: tiferet-yisrael
seif: 4
marker: _
**** HEBREW ****
<b>סעיף ד</b> עמ"ש אמו"ז הגז"ל בסק"י לתרץ סתירות הרא"ש מנדה לב"ק דשם כתב גבי נגיחות הלכה כרב ותוכן דבריו דבאמת ראוי לפסוק כרב דהלכה כמותו באיסור' רק כיון דוסתו' דרבנן פסקינן להקל כשמואל וסברה ישרה הוא וא"ל אי פסקינן כשמואל דצריך ג' דלוגי' איכא ג"כ חומר' דצריך לחוש לכמה מיני וסת וכדומה לפ"ד לעיל בקפ"ד צריך בדיקה לפני כל תשמיש ותשמיש משא"כ א"א דקבע' וסת כרב בב' דלוגי' א"צ לזה כלל ז"א דמ"מ איכא כמה קונת אי לא קבע' לענין עקירה וכדומה כמבואר בסעיף ב' וס"ד. אך לכאורה יש לעורר האיך מדמה הגמ' נגיחות שור לוסת אליבי' דשמואל דצריך ג' דלוגי' גבי וסת ה"ה בשור דלמא שמואל בעצמו מסופק בוסת אם די בב' דלוגים כרב רק להיות כי וסתות דרבנן מקיל לגבייהו ומצריך ג' דלוגים אבל גבי נגיחות דדאוריית' הוא מודה שמואל לרב דסגי בב' דלוגים ז"א הא שמואל לשיטתו אזיל וס"ל בנדה דף ע"ז וסתות דאורייתא ובלא"ה אם באמת מסופק האיך יפסוק גבי שור לחומרא להוציא ממון מיד המוחזק מספק:
**** ENGLISH ****
He said, “The Lord’s Prayer is a sign of the Lord’s glory, and that it is in the midst of Hashem’s judgment, and that it is the same as the Lord’s Prayer, and that it is the same as the Lord’s Prayer, and that it is the same as the Lord’s
It is not established for displacement and so on as described in section B and S. However, it is apparent that the Lord’s Prayer in the Old Testament is inscribed to Hashem’s glory, and that Hashem’s promise is to be made to him, and that Hashem’s Word is given to him
It will burn to the material to get out of money immediately that the attachment provides:
**** END BLOCK ****
```

### 2. `siman_189/tiferet-yisrael/part-001.txt` — tiferet-yisrael — seif 5 — marker `_`

- Quality: **error** — chunk_seam_duplicate, divine_name_style, mt_garbage
- Checkpoint id: `siman_189/tiferet-yisrael/part-001.txt#slug=tiferet-yisrael#seif=5#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: tiferet-yisrael
seif: 5
marker: _
**** HEBREW ****
<b>סעיף ה</b> עמ"ש הגאון אמוז"ל בסק"ד על הש"ך בסקכ"ו דהעלה אם ראתה אשה ר"ח שבט אדר ניסן ואח"כ סירג' וראתה סיון ואח"כ אב דחשבינן ניסן לוסת הקבוע ואין כאן רק ב"פ לסירוג והק' ז"ל הא בגמ' דב"ק בעי' לי' שור נגח ה' ו' שבת שבת ושבת שבת קמיית' ליומא קמא שדינן ואייעד לכולא יומא או לשבת בתריית' שדינן ולא אייעד אלא לשבתות ועלתה בתיקו וכן הרמב"ם פ"ו מנ"מ כתב דהוא ספק וא"כ הדברים דומים בלי הבדל כלל וא"א בתיקו במלתא דרבנן ספיקא לקולא א"כ יש לילך לקולא לכל צד ולומר דקבעה וסת לסירוג ולא לחודש וא"צ לחוש אלא מב' לב' חדשים וכו' ע"ש וטרם אעלה אמרתי להתבונן אם יש נ"מ לדינא לדברי הש"ך דהחמיר ולדברי אמו"ז הגז"ל דהוכיח להקל כי לכאורה העיקר פלפול בהך נדון אשה שראתה שבט אדר ניסן ואח"כ סיון אב א"כ כל הספק אם הגיע לחודש אלול אי כדברי הש"ך דשדינן ניסן לוסת החודש א"כ אסור' אלול מכח וסת החודש דלא דלגה רק ב"פ וא"א כדברי אמוז"ל דשדינן ניסן לוסת הסירוג לקולא א"כ יהיה ר"ח מותרת אבל יותר לכאורה אין נ"מ דממנ"פ אם רואה באלול איגלאי מילתא דבוסת החודש קיימא דהא כל סברתו להתיר מכח ספק והשתא ע"י ראית אלול אתברר לנו דבוסת קמיית' קיימא דשכיח וכרוב נשים חזית וא"כ הספק רק על אלול ואף כי צעיר ישראל לימים ולחכמה ואיני כדאי להכניס ראשי בין שני הרים גדולים מ"מ לעצור במילין מי יכול אמרתי לכאורה כ"ע מודה דאסור' באלול דאף דאזלינן לקולא שקבעה וסת לסירוג כדברי אמו"ז הגז"ל דכבר הבאתי בס"ק הקודם דברי הרמב"ם בפ"ח מהא"ב דפסק דאף דוודאי תקבע וסת הדילוג דמ"מ חוששת לחודש הבא אולי תקבע וסת החודש ולעיל הק' הג' אמוז"ל על המחבר למה השמיט דעת הרמב"ם דכן הוא דעת התו' וא"א כמש"ל דרמב"ם איירי בספק קביעות וסת לדילג ולזה כ"ע מודה א"כ גם כאן דאיכא ספק' טובי ובאת להתיר רק מכח ספיק' לקולא פשיטא דצריך לחוש ופשיט' אם הרמב"ם איירי בוסת הדילוג גמור א"כ כאן דאיכא ספק טובי כ"ע מודה לדינא דרמב"ם ותוס' דאסור' לעולם בר"ח אלול הבא א"כ ברור דאסור' באלול הבא ובאלול אתברר לנו הספק אך באמת ק' על הש"ך מנ"מ אם שדינן ניסן לוסת החודש הקבוע או לא דהא לפ"ד הנ"ל ר"ח אלול לעולם אסורה לשמש ובהגיע תור אלול אתברר לנו הספק וא"ל אם לא שדינן ניסן לוסת החודש הקבוע ס"ל להש"ך דגם לוסת הסירוג לא שדינן רק הוי כאשה שאין לה וסת כלל וצריך בדיקה לפני תשמיש וכה"ג צריך לחוש להפלגה וכדומה חדא זה דוחק וחומר' יתיר' דהא ודאי אית לה וסת או חודש או דילוג ובלא"ה בזה ודאי אזלינן לקולא ועוד לדברי הש"ך סקפ"ד דס"ל אפי' אשה שאין לה וסת תוך למ"ד הוי כאשה שיש לה וסת וא"צ בדיקה לבעלה ובלמ"ד נתברר לנו הספק כנ"ל וא"ל אף דאלול באסור' קיימא מחמת חשש דלמא תקבע וסת החודש מ"מ סמוך לוסתה מותרת ואינה אסורה רק אותה עונה ממש משא"כ אם אסורה מחמת וסת קבוע אסורה לשמש אפי' סמוך לוסתה הא מבואר לעיל בסקפ"ד שצריך לפרוש סמוך לוסת' אפי' לא ראתה רק פ"א ודוחק לחלק דכ"ז אם אותו ראיה מקדם אין לתלות כלל בוסת אחר אבל במקום ספק יוכל לומר שזה הראי' היה וסת דילוג ואף דניחוש אולי היה לקביעות אחר אז א"צ סמוך לוסתה לפרוש כיון דבלא"ה הוא רק דרבנן וספיק' לקולא זה דוחק גדול וצ"ל בדוחק דוודאי א"א כדעת הש"ך דהוי קבוע א"כ בעברה וסתה אסור לבוא עלי' בלי שאלת פי' כמבואר לעיל בסי' קפ"ד דלא כהרי"ף ורמב"ם דמתירין לבוא עלי' אפי' ישינה משא"כ אם הוא רק מחמת חשש כ"ע מודה לדינא דרמב"ם והרי"ף דמותר לבוא עלי' אפי' ישינה דהוי בכלל ס"ס אולי ניסן שדינן לוסת דילוג ואין זמנ' לראות ואת"ל לוסת חודש שדינן מ"מ אולי לא ראתה ומותרת וזה יהיה כוונת אמו"ז הגאון זצ"ל אבל בגוף הדין אין כאן נ"מ דבר"ח אלול ודאי אסורה דלמא לא נחוש בספק וסת דילוג מה שהרמב"ם ותוס' חוששין אפילו בלי ספק כלל ובהגיע תור אלול נתברר לנו הספק דודאי אם ראתה חזינן דוסת החודש קבעה לוסת ואם לא ראתה פשיטא דקבעה וסת לדילוג וצ"ל דכל ההפרש הוא אם בעלה צריך לשאול אותה או מותר לבוא עלי' בלי שאלת פי' כדעת הרי"ף והרמב"ם וזה יהי' כוונת הש"ך דכתב בפשיטות דניסן לוסת החודש שדינן וא"כ אסורה ותמה עליה הא הוא עלתה בתיקו וספיק' לקולא וא"כ א"צ לחוש רק מב' לב' חדשים וא"כ פשיטא דמותר לבוא עלי' בלי שאלת פי' בעברה עונת אלול אבל בגוף הדין דר"ח אלול אסור' לשמש גם אמוז"ל מודה זד"ג אך י"ל דאיכא נ"מ טובא בניהם לענין עקיר' ודאי אם לא ראתה בר"ח אלול הבע"ל מותרת מ"מ אם תראה אח"כ כ' תשרי ובר"ח תשרי לא ראתה לדעת הש"ך עדיין יש לה וסת קבוע לר"ח דהא לא עקרה עדיין ג"פ כסדרן ולדעת אמו"ז הגאון ז"ל א"צ עקיר' כלל לוסת החודש וצריך עקיר' ג"פ לוסת הסירוג דקבעה וצ"ע כי יש לדחות גם זה:<br><b>אמנם</b> בגוף הקו' נראה להליץ בעד הגאון הש"ך דלכאורה קו' אמו"ז הגז"ל קשה ביותר על הגמ' ב"ק ותפשוט מסוגיא דנדה כי לכאורה דברי הש"ך מבוארים מגמ' וכאשר אבאר דאי' שם ב"ק דף ל"ד אבעי להו שור שנגח שבת שבת ושבת יום א' וב' מהו שבת בתריית' לשבת שדינן ואייעד לשבתות ולא לימי חול א"ד בתר שני ימים אחר שבת שדינן ואייעד לכולא יומא נגח בה' ובו' שבת שבת וכו' שבת קמיית' וכו' והנה לכאורה קשה הא הגמ' מדמי נגיחות לפלוגת' דרב ושמואל בוסת והא אי' בנדה דף ס"ד אתיבי' היתה למודה לראות בט"ו ושינת' לט"ז וכו' שינת' לי"ז וכו' שינתה לי"ח הותרו כולן ואינו נאסרה אלא מי"ח ואילך וק' לרב א"ל רב למודה שאני ופי' רש"י ודאי למודה לראות בט"ו ראיות ט"ו שדינין לט"ו הקודמים כי קאמרינן אלא אם התחילה לראות או באשה שאין לה וסת עכ"ל א"כ לפ"ז אם ראתה אשה ב"פ בט"ו לחודש והיום ראתה בט"ו דקבעה בה וסת דא"צ יותר מג"פ ושינת' אח"כ לט"ז ואח"כ לי"ז מודה רב דצריך עוד דילוג לח"י כמבואר ברש"י דראי' ט"ו שדינן לוסת קבוע רק הוא אומר דסגי בב' דילוגים היינו אם התחילה לראות אבל לא אם תשליש היום בראי' ט"ו הזה לוסת קבוע א"כ מ"פ הגמ' גבי נגיחות נגח ה' ו' שבת שבת ושבת הא זה דומה לוסת ומודה רב דראי' ט"ו שדינן לוסת קבוע א"כ גם גבי נגיחות שדינן שבת קמיית' לנגיחות ה' ו' ואייעד לכולא יומא וק' ותפשוט וד"ל דאף אם זה הראי' ט"ו שהיא למודה לראות בהם הי' ג' לראית' לוסת קבוע לא שדינן וברייתא דלמודה מיירי דראתה כבר ג"פ ורש"י לא חש וכתב רק דאנא קאמר' בתחילה ראי' וה"ה אם זה ראי' ט"ו היא פעם ג' מ"מ לא שדינן לראי' קמיית' ורש"י או או קאמר מלבד דזה דוחק כי לא מצינן במשנה רק כשתקבע ג"פ וק' הא לפעמים ל"ת עד שראתה ד"פ כנ"ל אף גם לכאורה מוכח דברייתא הכא דלמוד' ט"ו איירי דווקא עם הראי' שראה היום בט"ו קבעה ג"פ דאל"כ ק' לשמואל דס"ל דלעולם צריך ג"פ האי מתני' דתקשה לרב ק' ג"כ לשמואל דקתני היתה למודה לראות ט"ו ושינת' וק' טעמא דלמודה הא אינו למודה א"צ ג"פ וסגי בב"פ וקשי' לשמואל והלא זה סוגי' בכל הש"ס ויותר ק' להנך פוסקים כשמואל דצריך ג"פ כיון דתני כוותו שינת' לכ"א וכו' עיין בהרא"ש וק' הא אליבי' דרב נמי איירי בלמודה לראות בכ' א"כ גם כרב אתי' ואף די"ל כיון דסתם גמ' דחק' דייקא נמי דשבקינן וכו' זה דוחק ועיין בהה"מ פ"ח הנ"ל שכתב כיון דתני' כוותו וזה יוכל להיות גם כרב וביותר כיון דקתני דווקא למודה ובפרט הא הלכה כרב באיסור' וצ"ע) וע"ק האי למודה מאי למימרא אליבי' דשמואל הא בלא למוד' ג"כ צריך ג"פ לרב ניחא דאשמעינן דווקא למודה וא"ל דאשמעינן למודה כמו דמתרץ הגמ' על קו' דקארי לי' מ"ק לי' דה"א דעוקרת בתרתי הא זה מפורש במתני' דהכא דאין וסת נעקר עד שתקבענו וכו' ובאמת על סתם גמ' ג"כ ק' דמתרץ למודה אצטריך דה"א דעקרת' בב"פ הא זה מתני' מופרשת וא"ל דברייתא מפרש דברי המתני' הא זה כבר תנא לי' בברייתא שינתה וכו' וצ"ע. לכן י"ל דהכא איירי למודה דראתה מקדם ב"פ בט"ו והיות תשלש הוסת הקבוע ובחודש שלאחריו שינתה לט"ז וס"ל לרב ושמואל דשדינן זה הט"ו לוסת הקבוע וא"כ שפיר אשמעינן רבות' דלמוד' דה"א דשדינן זה הט"ו לוסת הדילג ולאחריו כאבעי' הגמ' בב"ק גבי נגיחות כיון דרואים דדילג עוד פעמים אשמועינן דשדינן ראי' ט"ו לוסת הקבוע וצריך עוד ג"פ בין לרב ובין לשמואל וז"ש רב למודה שאני כיון דבחודש הזה שראתה בו לט"ו נקבע וסת קבוע הוי למודה ואינו מהמנין ופריך הגמ' ודקארי לי' וכו' הא זה הוי לי' למודה ומשני ה"א דעקרת' בב"פ דה"א דאינו דומה למתני' כיון דאיכא ספק לא שדינן ראי' ט"ו לוסת החודש אלא לדילג קמ"ל וא"ש ולפ"ז דברי הרש"י בדיוק נאמר' אנא קאמרינן דוקא בהתחילה לראות ודברי הש"ך על נכון כי דבריו נאמר' בפירוש בגמ' ולק"מ אך עדיין יהי' קו' הנ"ל על הגמ' בב"ק במ"ע ותפשוט מהכא לכן נראה לי בעיני הק' לתרץ דוודאי גבי וסת שפיר שדינן ראי' ט"ו לוסת החודש הקודם ולא לוסת הדילג דלמה נדחה וסת החודש דשכיח מפני וסת הדילוג דאינו שכיח אך גבי נגיחות בב' ימי חול י"ל מ"מ שדינן שבת לשארי שבתות דבלא"ה איכא סברא דשבת אינו מהמנין לימי חול כלל דאי' במתני' שם מועד לשבתות וכו' ופירש"י דשבת נח ממלאכתו וזחה דעתו משא"כ בחול והירושלמי כתב כיון דרואה בגד נקי ולבן ואיכא ג"כ סברה להיפך כיון דכבר נגח ב"פ בימי חול אך בב' ימים לא נעשה מועד וכיון דעבר' ימי חול ולא נגח וכמ"ש המהרש"א לשם דאיירי דראה בימי חול ולא נגח א"כ איגלא מילתא דלא אייעד לימי חול רק לשבתות ובודאי שבת קמיית' לא שדינן לימי חול הקודמי' אבל גבי וסת שדינן ראי' ט"ו לראי' ט"ו הקודמים חדא התם גבי אשה הא בלא"ה צריך להפסיק ולהמתין זמן מה לראות פעם ב' ומה לי אם תמתין למ"ד יום או ל"א יום ועוד התם ראי' ט"ו ראי' מעליא ואיכא לשדינן לוסת החודש כמו לוסת הדילג ומהכ"ת ידח' שכיח וכו' משא"כ הכא דאיכא סברא דראי' שבת אינו מהמנין כנ"ל ואינו דומה כלל לוסת בזה הענין ולק"מ וצדקו דברי הש"ך וק"ל:
**** ENGLISH ****
The Lord’s Prayer, which is Hashem’s Word, is the same as Hashem’s Word, and the Lord’s Prayer, is not Hashem’s promise to Abraham, and He is not in the world
He said, “I will go to the bottom of the earth, and I will not go to hell, and I will say that I will not be able to see if I do not believe in the name of the Lord, and I will show that I will not be able to see if it is not the case of this month.”
This is why Hashem’s promise is that Hashem’s people will not be given to Hashem’s people, and that Hashem’s people will not be able to do so, and that Hashem’s promise is not to be given to us, and that Hashem’s people will be able to do so, and that Hashem’s people will not be able to take away from them
"And thou, Capernaum," he said, "I am afraid of the Lord's Word, and that the Lord's Word may be given to him, and that the Lord's will be given to him."
It is a good reason for Hashem’s promise to Abraham and Isaac, that Hashem’s promise is to be given to us, and that Hashem’s people will be given to us, and that they will not be able to do so, and that they will not be able to do so
And what is the case of Hashem’s Word, which is not the same as Hashem’s Word, and that Hashem’s Word is not the same as Hashem’s people, and that it is not the same as the Lord’s Prayer, and that it is not the same as the Lord’s Prayer
It should be retired near Los Angeles Epi not only seen P.A. and laughed at part of the D.C. if the same evidence promotes no other boss, but instead of doubt, it could be said that it was the mirror and that even Denise might have had to be followed, and that it is not possible for him to step down in this report
"There is a burden to Hashem if he is only afraid of Hashem's Word, and he will not be able to see the Lord's Prayer, and he may not see the Lord's Word, and this will be the meaning of Hashem's Word
And if he did not see the word of Hashem’s covenant with Hashem’s people, he said, “If he does not want to ask him, or is permitted to come to me without the question of the Lord’s opinion, and he will not be able to do so with him, and he will not be able to do anything in the world.”
He said, “If you don’t see Hashem’s Word, then you can see Hashem’s Word, and you will not see Hashem’s presence in the world.”
The Lord’s Prayer is a blessing from the Lord, and when He is in heaven, He is in heaven, and He is in the midst of Hashem’s promise to Abraham, and He is not Hashem’s name
It is not Hashem’s promise that He is not Hashem’s Word, and He is not Hashem’s Word, and He is not Hashem’s Word, and He will be able to do it
But not if you are a third of this day in the morning of the Holy One, and the Shabbat of Hashem is similar to the Holy One, and the Holy One, who is not in the first place, is called the Lord’s Prayer, and who is not the same as the Lord’s Prayer, and who is not known as the Lord’s Prayer
It is not until Hashem’s Word is revealed to Hashem’s people, and Hashem’s people, and Hashem’s people, and Hashem’s people, and Hashem’s people, and Hashem’s people, and they will not be able to see Hashem’s Word
“And thou, Capernaum, that thou shalt be thrust down to hell, and shalt be thrust down to hell.”
The Lord’s Prayer is a sign of Hashem’s promise to Abraham, and Hashem’s promise to Abraham, “I am the Lord.” Therefore, the Lord of Dekha Iy LaModa Dar you promotes the P.S. and the Sea will be the permanent menstruation and the following months
This is why Hashem’s promise is that Hashem’s Word is in His Word, and that He is Hashem’s Word, and that He is Hashem’s Word, and that He will be given to him
In the words of the Lord’s Prayer, Hashem’s Word is the same as Hashem’s Word, and Hashem’s Word is not the same as Hashem’s Word, and the Word of Hashem’s Word is revealed in His Word, and the Word of Hashem’s Word is not the same as Hashem’s Word
He said, “The Lord’s Prayer is not the same as the Lord’s Prayer, nor is it the same as the Lord’s Prayer, nor is it the same as the Lord’s Prayer, nor is it possible for him to dwell in the land of the earth, nor is it the case of the Lord’s Prayer, and he who is not in the midst of Hashem’s name, and who is not in the name of his name of his name of the Lord’s name of the Lord’s name of the Lord’s name
It is not that Hashem’s people are in the world, but Hashem’s Word is not the same as Hashem’s people, and that Hashem’s Word is not the same as Hashem’s Word, and that Hashem’s Word is the same
**** END BLOCK ****
```

### 3. `siman_189/tiferet-yisrael/part-001.txt` — tiferet-yisrael — seif 6 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_189/tiferet-yisrael/part-001.txt#slug=tiferet-yisrael#seif=6#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: tiferet-yisrael
seif: 6
marker: _
**** HEBREW ****
<b>סעיף ו</b> עמ"ש אמ"ו הגז"ל בסקי"ז סברא ישרה לתרץ דברי הטור דפסק כאן כדברי הרמב"ן דאזלינן בתר סוף וסת כיון דיוכל לקבוע וסת החודש דשכיח משא"כ לעיל ע"ל באריכות וא"ל א"כ עדיין ק' כקו' הרא"ש בר"פ התינוקת ותבדוק בשעת וסת אפי' למ"ד אין קובעת וסת תוך וסת כדי לידע זמן המשכת וסת ז"א עד וסת שאינו שכיח לא חיישינן ולא תקנו ע"ז כלל:
**** ENGLISH ****
In the words of the Lord’s Prayer, Hashem’s Word says, “The Lord’s Word is in the end of the earth, and the Lord’s Word is in the end of the earth, and the Lord’s Word is in the end of the day, and the Lord’s Prayer is not in place, and it is not in any way that the Lord’s name of the Lord’s Word is not in place
**** END BLOCK ****
```

### 4. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 1 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=1#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 1
marker: א
**** HEBREW ****
<b>חוששת ליום ל'. </b>היינו לאותו יום החדש וכמ"ש לקמן ס"ק ל' וכן חוששת לוסת ההפלגה עד שתקבע אחד כדינו כדלקמן סעיף ב' וסעיף י"ג בהג"ה עכ"ל הש"ך והא דחוששין לוסת ההפלגה היינו בראתה שתי פעמים דאל"כ לא שייך לומר וסת הפלגה וכ"כ הש"ך עצמו בסימן זה כמה פעמים:
**** ENGLISH ****
I'm afraid of day L. We were on that new day and as part of the C.C. L.C.L. and also afraid of the departure until one was established in accordance with Article B and Article 11 of the High Court of the United States and the Dachronomy of the Lady of the Brigade, we saw two times that it does not belong to saying, and the end of the ship itself is a sign:
**** END BLOCK ****
```

### 5. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 1 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=1#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 1
marker: ב
**** HEBREW ****
<b>חוששת לזמן הידוע. </b>ואסורה לשמש כמבואר לעיל בסי' קפ"ד:
**** ENGLISH ****
Afraid of the known time. It is forbidden to be used as the above in the CPA:
**** END BLOCK ****
```

### 6. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 10 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=10#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 10
marker: _
**** HEBREW ****
<b>לא קבעה וסת. </b>כיון שסירגה אפי' להיש מחמירין שבסעיף ז' ומ"מ חוששת לי"ט בתמוז משום דיש שתי הפלגות שוות דמט"ו בניסן עד ט"ז באייר הוא ל"ב יום וכן מאייר עד י"ח בסיון דניסן מלא ואייר חסר וכשתראה בי"ט בתמוז דהוי נמי הפלגה ל"ב מי"ח בסיון א"כ קבעה לה וסת דהפלגה בג"פ ע"י ד' ראיות. כ"כ הב"ח וש"ך:
**** ENGLISH ****
He did not set up and stopped. It is because I am not afraid of a two-year-old, and I am afraid of Hashem’s promise that the two-year-olds are equal to Hashem’s promise of the promise of Hashem’s promise, and that Hashem’s promise is to be given to him. The Bible and the Bible:
**** END BLOCK ****
```

### 7. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 11 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=11#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 11
marker: _
**** HEBREW ****
<b>או שתים. </b>היינו לדעה ראשונה שהביא המחבר בסעיף ז' דליש אומרים קבעה וסת בב' דילוגים בג' ראיות אם לא שהיה לה מתחלה וסת קבוע בט"ו ודלגה לט"ז ואח"כ לי"ז דאז לכ"ע לא קבעה לה וסת וכמ"ש לעיל ס"ק י"ג וכ"כ הש"ך דלא כמשמעות הדרישה ועיין בתוס' דנדה דף ס"ד ע"א ד"ה ואינה:
**** ENGLISH ****
Or drink. We were the first opinion that the author in Section Z of Delakh stated that he had no evidence whatsoever in the Bible and skipped the High Court, and then went to the High Court and did not determine it as a result of the High Court, and that it was not the case of Hashem’s command, and that it was not the case of Hashem
**** END BLOCK ****
```

### 8. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 12 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=12#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 12
marker: _
**** HEBREW ****
<b>וסת הסירוג. </b>כתב הש"ך דלכך נקרא וסת הסירוג כיון שסתם נשים וסתם מל' לל' א"כ זו שראתה מב' חדשים לב' חדשים סירגה מדרך שאר נשים. אבל יותר נראה דמיירי אפי' שראתה בתחלת ראייתה בר"ח אדר ואח"כ בר"ח סיון דאע"ג דהשתא ראתה מחדש לחדש אם שוב ראתה בר"ח סיון ואב קבעה וסת לסירוגין דהשתא חזינן שסירגה מב' חדשים לב' חדשים עכ"ל הש"ך ובאמת דבריו תמוהים לכאורה כיון שתחלת ראייתה היה בר"ח אדר ואתחר כך בר"ח סיון וא"כ איך כתב דהשתא ראתה מחדש לחדש הלא הוא מג' חדשים לג' חדשים ועוד דהוא נגד דברי הש"ע שכתב דתחלת ראייתה לסירוג היה בר"ח ניסן ולפי דבריו לא ראתה כלל בר"ח ניסן. ובאמת בספרי הש"ך הנדפס בווילמרשדארף הרגיש המגיה בזה ותיקן וכתב וז"ל ואפי' שראתה בתחלת ראייתה בר"ח אייר עכ"ל אבל גם בזה לא תיקן כלום דא"כ תקשה מהיכי תיתי שיהיה קביעת לסירוגין כיון שלא ראתה רק פעם אחת בסירוג דהלא ראתה ר"ח (ניסן) ואייר וסיון ופעם אחת דילגה לר"ח אב וגם עדיין הוא נגד ל' הש"ע ויותר תמוה על שני הגירסות איך מסיק הש"ך וכתב אם שוב ראתה בר"ח סיון הא עד השתא מיירי שראתה בסיון לכן נ"ל עיקר כגירסת הספרים ישנים שנדפסו בק"ק קראקא דתחלת ראייתה בר"ח אדר אך במקום שכתב ואח"כ בר"ח סיון צריך להגיה תיבת ניסן וכו' וא"כ דברי הש"ך נכונים דאע"ג שראתה מתחלה בר"ח אדר וניסן זה אחר זה דראתה מחדש לחדש ואם אחר כך ראתה סיון ואב מצטרפין גם כן ראיה דניסן ויש כאן שלש דילוגין ודוקא שלא היה לה קביעת וסת ג"פ מתחדש לחדש אבל אם היה לה קביעת ג"פ מחדש לחדש אז אין מצטרפין ראיה דניסן וצריכה לראות עוד פעם אחת בסירוג כדי לקבוע הוסת ועפ"ז יתפרשו היטב דברי הש"ך עיין דבריו באורך:
**** ENGLISH ****
and the snow. The manuscript of the Bible is called the tycoon valve that only women and just from L.A., who saw a new M. to a new B. Cyrga from the other women. But it is more likely to be seen in the Qur'an that she has seen in her vision of the Holy One, and therefore, in the midst of the Lord's Prayer, she has seen anew if she has seen the Holy One again, and his father has determined that she will be able to see him as a new one
A bub Dashaha saw anew that was not a new G-d for a new G-d, and he was also against the words of the IDF who wrote a visionary to an end was a Nissin Bar and that he did not see any of the Niessen Bible. Indeed, in the book of the Bible, which was printed in Wilmerdar, the Magdalene felt that she was a veteran and wrote, and that it would make it difficult for her to make it impossible for her to see that she had not seen only one time in the Dáil and had never seen him
Hashem’s promise to Abraham and Isaac, “And he will be able to see the Lord’s promise, and he will be the same as the Lord’s Prayer, and he will be able to see if he has ever seen the Lord’s promise, and he will be able to do so.”
Shashi Dlugin and Dukke who did not have a determination and a GPA resumes, but if she had to re-establish a new GPA, then there is no evidence of Denison and should be seen once more in the gull to determine the collapse and FIFA will be well interpreted by the words of the Bible:
**** END BLOCK ****
```

### 9. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 13 — marker `א`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=13#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 13
marker: א
**** HEBREW ****
<b>האשה שראתה. </b>כתב הטור לשון הרמב"ן וסת החדש חוששת לו בתחלתו פעם אחת אבל וסת ההפלגה א"א לחוש לו עד שתראה ראיה שניה שהרי אינה יודעת לאיזה יום היא מופלגת נמצא אתה אומר שהרואה ליום ר"ח ניסן חוששת לר"ח אייר ראתה בו חוששת לר"ח סיון ראתה בו הוקבע וסת לר"ח לא ראתה בר"ח סיון נעקר וסת של ר"ח וחוששת לב' בסיון אפשר שתראה ותקבע וסת להפלגה מל"א לל"א שהרי ראיות ר"ח ניסן ואייר שווים בהפלגה לראיות ב' בסיון שניסן מלא ואייר חסר עכ"ל הטור ומבואר מדברי הב"י והב"ח והפרישה דלעולם חוששת לג' חששות דהיינו לוסת ההפלגה ולאותו יום בחדש שראתה וליום שלישי מאותו ראיה משום עונה בינונית והש"ך האריך להשיג עליהם דאין חוששין רק לוסת הפלגה ולאותו יום בחדש וזו היא עונה בינונית בין אם החדש הוא מלא או חסר ע"ש שהאריך בראיות ברורות:
**** ENGLISH ****
The woman she saw. The Bible tells him that he does not know what day he is divided into, but that he sees the day of the day as he is concerned, and that he is not afraid of what kind of evidence he has seen, and that he has not seen, and that he has not seen him, and that he has not seen him, and that he has not seen him
And Air is missing from the column and is described by the words of the Bible, and the expropriation is never afraid of Hashem’s fears that it is the extension of the celebration and the same day of the new day that he saw and on a third day of the same evidence because of a medium season, and that the Lord has not been afraid to receive them only to take a Yom Tov and not a day in the new, and this is a medium whether it is full of clear evidence
**** END BLOCK ****
```

### 10. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 13 — marker `ב`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=13#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 13
marker: ב
**** HEBREW ****
<b>ראתה בא' באייר או לא ראתה בו. </b>דעת הב"ח והפרישה כדעת הב"י דאם ראתה באחד באייר אינה חוששת לט' בו וכן הוא הסכמת הש"ך ובספרו נה"כ ועיין בט"ז שמאריך בזה לקיים דעת הרב וכנ"ל וכן מבואר להדיא מדברי הראב"ד בספר בעל הנפש דף נ"ו ע"א ע"ש:
**** ENGLISH ****
He saw B. B. B. B.air or did not see him. Hashem’s Word and His Word, as He said, “I am not afraid of Hashem’s Word, and I will be blessed with Hashem’s Word, and I will be able to do it in the book of the Holy One.”
**** END BLOCK ****
```

### 11. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 13 — marker `ג`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=13#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 13
marker: ג
**** HEBREW ****
<b>ואינה חוששת לוסת דדילוגין וכו'. </b>כיצד ראתה ט"ו בניסן כן מבואר בש"ס ס"פ האשה והיא הסכמת הפוסקים ראשונים ואחרונים וכמבואר בב"י לעיל סעיף י"א והש"ך כ' בס"ק ל"ב שזה הוא דעת הרב בפי' דברי הרמב"ן והוא נכון אע"פ שאין כן דעת הב"י ושאר אחרונים עכ"ל ולא מצאתי שום חילוק דעות בזה והוא מוסכם מכל אחרונים רק בנדון שלפני זה או עד שא' מהם נעקר וכו' בזה יש חילוק דעות בפירושיהם להרמב"ן עיין בב"י ובד"מ ובב"ח ואולי טעות נפל בדפוס:
**** ENGLISH ****
And he is not afraid of Dedulin and so on. How did Hashem see Hashem’s Word and Hashem’s covenant with Hashem’s Word and His Word, and Hashem’s Word, and Hashem’s Word, and Hashem’s Word and His Word, and He will not be revealed in His Word, and I will not find any of them
Fall in print:
**** END BLOCK ****
```

### 12. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 13 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=13#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 13
marker: ד
**** HEBREW ****
<b>בהפלגה ודילוגים. </b>ע"ד שנתבאר לעיל סעיף ה':
**** ENGLISH ****
In the boat and the logos. According to the above section:
**** END BLOCK ****
```

### 13. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 13 — marker `ה`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=13#marker=%D7%94`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 13
marker: ה
**** HEBREW ****
<b>רק י"א. </b>כי בדלוג החודש ראיה ראשונה מן המנין אבל בדילוג ההפלגות על כל פנים ראיה ראשונה אינה מן המנין דבכל הפלגה בעינן ד' ראיות אבל מכל מקום למאן דסובר בדילוג החודש דראיה ראשונה אינה מן המנין א"כ בדילוג דהפלגות בעינן ה' ראיות וכמ"ש לעיל ס"ק ח' וכן כתב הט"ז והש"ך אלא שבש"ך הניח דברי הרב בצ"ע ולפמ"ש ניתחא:
**** ENGLISH ****
Only G. For in this month, the first evidence from the melanin, but in the first-to-day logo is not from the mechanics in each of the vessels, but from everywhere to Mandover in the logo of the first month, Draya is not from the mechanics of the ‘experience and’ of the above, and the above, as well as the book of the Bible, and the book of the book of Hashem’s Word of Hashem’
**** END BLOCK ****
```

### 14. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 13 — marker `ו`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=13#marker=%D7%95`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 13
marker: ו
**** HEBREW ****
<b>דהולכין תמיד אחר תחלת הראיה. </b>ומה שראתה אחר כך דמים יתרים הוא דאתוספו בה ואם כן נקבע לה וסת לדילוג וחוששת י"ח בתמוז ולי"ט באב וכן לעולם וכה"ג פסק המחבר לעיל סימן קפ"ד סעיף ו' וכתב במעדני מלך ד' רצ"ו ע"א תימ' דלעיל בסי' קפ"ד ס"ד כתב דאשה שמשתנית וסתה להקדים ב' או ג' ימים או לאחר כשיגיע וסתה צריך לפרוש ממנה ב' או ג' ימים קודם או אחריו שהרי זה סותר להא דפסק דאין הולכין אלא לאחר התחלת וסת בלבד וכיון שעברה עונה ראשונה ולא ראתה מותרת עכ"ל ועיין בש"ך מ"ש ליישב קושיא זו ובאמת לע"ד מעיקרא לק"מ ואין זו דומה לזו כלל דלעיל מיירי באשה שאין לה וסת קבוע כמבואר בהגהות מיימוני להדיא אף בהגיע יום שלשים שהיא עונה בינונית דרכה להקדים ראייתה לגמרי ב' או ג' ימים או לאחר ולפעמים היא רואה בזמן וסתה ולא מיירי בהמשכת הוסת על כן צריכה לפרוש באותו זמן העונה דאולי תראה משא"כ כאן שיש לה וסת קבוע בדלוג ע"י תחלת ראייתה וחוששת את"כ לוסת הדלוג וק"ל:
**** ENGLISH ****
The depletion is always after the dream. And what he saw later, is his exaltation, and if so, he was set up for a logo and an exclamation of Hashem's word, and he was given to the world, and he was told by the King of David, that he had not done so much for him, and that he had not done so
In the first season, she did not see Hashem’s permission and did not see Hashem’s promise to do so, and it is not like that of Hashem’s people, nor is it the same as Hashem’s presence in Hashem’s presence, nor does he see Hashem’s presence in the world, nor does he have any time for him
And he drank the so-called Los Angeles
**** END BLOCK ****
```

### 15. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 14 — marker `א`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=14#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 14
marker: א
**** HEBREW ****
<b>היתה רגילה לראות יום עשרים. </b>הטור ושאר פוסקים כתבו דמדין התלמוד אין האשה קובעת וסת בימי נדתה ולא בימי זיבתה והאריכו בדינים אלו והמחבר והרב השמיטו כל זה היינו מפני שכתב הטור והפוסקים בשם (הרמב"ם)[הרמב"ן] דכיון דהאידנא נהגו להחמיר על עצמן שלא להפריש בין ימי נדה לימי זיבה ה"נ לענין קביעות וסת אין חילוק כל זה פשוט וברור ובספר נקודת הכסף בהג"ה השיג על הב"י והרב וכתב (דהרמב"ם)[דהרמב"ן] לא קאמר אלא לחומרא דקבעה וסת אף בימי נדה ובימי זיבה אבל לא להקל דודאי לא יחלוק על התלמוד וכבר נתבאר לעיל בכמה דוכתי דיני חומר וסת שאינו קבוע מקבוע גם מי שאין לה וסת קבוע צריכה לחוש לוסת החדש ולהפלגה משא"כ בקבוע והכי משמע מדברי הרשב"א בתה"א והה"מ בשם (הרמב"ם)[הרמב"ן] דלא קאמר אלא להחמיר וא"כ היה ליה להמחבר והרב להביא דינים אלו עכ"ל ולע"ד יפה כוון בזה הב"י ואין להחמיר בוסתות דרבנן כולי האי בזמן הזה ותדע דהא עיקר הטעם כתב הרשב"א בתה"א והובא גם כן בב"י שכתב וז"ל ואם אתה מחלק להם בין ימי נדה לימי זיבה נמצאת מצריכין ללמוד פתחי נדה וימי זיבה עכ"ל משמע להדיא דבשום ענין אין לחלק וק"ל וע"ל ס"ק נ"ב:
**** ENGLISH ****
It was normal to see 20 days. The column and the rest of the Talmud wrote that the man had no intention in the days of his death, and not in the days of his death, and that he had been exalted in these words, and that all of it was because of the column and the occupants of the name of the Lord, and that he had not received any of the consequences of his life
It is determined that even in the days of Uganda and in the days of the year, but not to make it easier for David to share the Talmud, and it is already explained above in some cases that I am not fixed and that which is not fixed, nor does it have to be seen as a regular basis, and that it is not the case of the Lord’s words in the Old Testament of the United States
He also wrote in the Bible, “And if you divide them between the days of Miranda and the Levites, it is necessary to study the openings of Uganda and the days of the day of the day of the day of the day of the Lord’s Prayer, that it means that the Word of the Lord is not part of it.”
**** END BLOCK ****
```

### 16. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 14 — marker `ב`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=14#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 14
marker: ב
**** HEBREW ****
<b>ראתה לסוף ך'. </b>פי' שהאשה זו שהיתה רגילה לראות לוסת דהפלגה מך' לך' ואח"כ שינתה ולא ראתה עד הפלגת ל' וכן בפעם שנית לא ראתה עד ל' ואח"כ כשהגיע לל' לא ראתה רק אחר ל' ראתה פעם אתחת ואח"כ ראתה מופלג מאותה ראיה ך' חזרה לקביעות הראשון אע"ג דג"פ לא ראתה ביום ך' לא נעקר יום ך' כיון שלא נקבע יום ל' שאם אשה מדלגת וסת א' פעמים וג' פעמים ואינו נקבעת ביניהם ליום אחר לא נעקר הוסת הראשון עד שתקבע לה וסת אחר (כן הוא משמעות הש"ס ופירוש רש"י והרא"ש וזה כוונת רשב"א בתה"א וכ"כ הש"ך בנה"כ ונסתלק תמיהות הט"ז בזה על הב"י וש"ע) ואע"ג דאף אם לא היה הקביעות הא' בכ' נעקר הוסת הל' כיון ששינתה פעם אחת בהפלגה קודם שנקבע כמ"ש הש"ך בס"ק מ' (אך בוסת החדש יש חילוק כמ"ש הש"ך שם) מ"מ אתי לאשמועינן דאף שלא ראתה ג"פ ביום ך' חוזרת לקביעות הראשון ובמ"מ דף רצ"ו ע"ב כתב דלאו דוקא כשלא ראתה בשלשים השלישית אלא כשעדיין לא הגיע הפלגת ל' דמיד אחר הראיה שניה ביום ל' ראתה בהפלגת כ' חזרה לקביעות הראשון ואינה חוששת לל' ואע"פ שלא נעקר עדיין ע"י שלא ראתה בו אפ"ה זה שראתה בעשרים שהוא יום קביעות הראשון מחשיב לה לעקירת של ב' ראיות דל' עכ"ל ועיין בש"ך שהניח פי' זה בקושיא:
**** ENGLISH ****
I saw the end of you.” This woman who was used to see the Lady of Delegation from you and then changed and did not see until the time before he came to the Lord, and he did not see until the time when he came to L.J., and he did not see any of the time, and then saw a woman from the same sight of the first time
This is the meaning of Hashem’s Word, and it is Hashem’s Word, and it is Hashem’s promise that He will not be able to do so, and that He will not be able to do so
A second witness on the day of L.A. saw the fact that he had not yet been interrogated by the fact that he had not seen in the fact that he had not seen in the fact that he had seen in twenty that he was the first day of his appeal to B's investigation of evidence and seen that he had scarcely given it:
**** END BLOCK ****
```

### 17. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 15 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=15#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 15
marker: א
**** HEBREW ****
<b>שינתה ראיותיה. </b>זה ג"כ קאי אסעיף שקודם זה דהיה לה וסת לכ' ושינתה ראייתה לל' ול"ב ול"ד דלית כאן רק ד' ראיות שהם ב' דילוגים לכן אין לה וסת כלל משא"כ אם שינתה עוד וראתה עוד בל"ו הרי כאן ה' ראיות שהם שלשה דילוגים וקבעה וסת לדילוגים וחוששת אח"כ לל"ח וכן לעולם וכל זה קאי אליבא דדעה ראשונה שהביא המחבר לעיל סעיף ו' דלדעה שניה סגי בהפלגה בדילוג בד' ראיות עמ"ש לעיל בס"ק ח' ועיין בש"ך:
**** ENGLISH ****
changed her evidence. This is the case of Kai I, who was first deposed to her and changed her sight to Hashem and to “Damn here only by evidence that they are in ‘divines’ and that it does not have a burden to him if he has changed more and has shown more evidence in the first place, and that he has brought him to the world, and that he has given him a second opinion
**** END BLOCK ****
```

### 18. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 15 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=15#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 15
marker: ב
**** HEBREW ****
<b>ואין לה וסת כלל. </b>וצריכה לחוש ליום ל"ד להפלגה ולעונה בינונית כמבואר לעיל ולפי מה שנתבאר לעיל סעיף ז' צריכה לחוש ג"כ לוסת הדילוג וק"ל:
**** ENGLISH ****
She has no ending at all. It must be felt for a day to “divide and moderate season as described above, and according to what is explained above, Section 1 must feel that the division of the division and the IDF:
**** END BLOCK ****
```

### 19. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 15 — marker `ג`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=15#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 15
marker: ג
**** HEBREW ****
<b>וה"ה להפסיקה מלראות ג' עונות. </b>כן פירש הב"י ל' הטור ומהרש"ל פירש דברי הטור בדרך אחר בדברים ברורים וכ"כ הב"ח ואף שהדרישה והט"ז השיגו עליו עיין בנה"כ שמיישב כל דבריו בטוב טעם ודעת:
**** ENGLISH ****
And the “Stop to See” seasons. The Bible says, “The Lord’s Prayer and the Holy Spirit, and the Holy One, and the Lord’s Prayers, have made it clear, and the Lord’s Prayer, and that the Lord has given him a look at him, and that he will bring all his words in good taste and opinion:
**** END BLOCK ****
```

### 20. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 15 — marker `ד`

- Quality: **error** — divine_name_style, mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=15#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 15
marker: ד
**** HEBREW ****
<b>ביום הוסת הראשון. </b>פי' שתראה ראיה אחת ואח"כ ראיה לבסוף ך' דכיון שנעקר ולא ראתה ג' עונות ויום ך' עצמו משא"כ בפסקה פ"א ולא ראתה ביום ך' אף על גב דתו אינה חוששת להפלגת כ' דהא אין כאן הפלגה כיון שלא ראתה כלל ול"ד לוסת חודש דאם עבר עליה ר"ח א' ולא ראתה תחוששת לר"ח הבא אחריו עד שיעברו עליה ג' ר"ח משום די"ל מקרה הוא שלא ראתה בר"ח זה ותראה בר"ח אחר כיון שרגילה לראות בר"ח אבל בהפלגה א"א לומר כן דהרי כשתראה לבסוף מ' לא תראה בהפלגת כ' כ"כ מהרש"ל והב"ח והש"ך בנה"כ מכל מקום מיד שתראה שוב ראיה ראשונה אימת ומתי שיהיה חוששת וחוזרת מיד לקביעות הראשון כיון שלא נעקר רק פעם אתת משא"כ בעברו עליה ג' עונות צריכה דוקא לחזור ולראות ביום ך' עצמו וכן פירש הש"ך בנה"כ דברי הש"ע ושלא כמ"ש הט"ז דברי הש"ע הם שלא בדקדוק ול"ד לדלקמן ס"ס זה במעוברת ומניקה משום דהתם לא נעקר וסתה אלא שהיא מסולקת דמים ע"י העיבור מיד חזרה לקביעות וסתה וק"ל:
**** ENGLISH ****
On the first day. He said, “You shall see a single sight, and then you shall not see Hashem’s glory, nor shall you see Hashem’s glory, nor do you see it as a result of Hashem’s glory, nor do you see it as a result of Hashem’s glory, nor do you see it as a result of Hashem’s glory
At the end of the day, you will not see the fact that you will see the first evidence before and when you are afraid to return to the first place, and that you will not be able to see it as a result of the fact that it is in the first place, and that it is not the case of the Lord’s Prayer
And she and Kellow:
**** END BLOCK ****
```

### 21. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 16 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=16#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 16
marker: _
**** HEBREW ****
<b>חזר הוסת למקומו. </b>כיון שלא נקבע לה וסת אחר בג"פ:
**** ENGLISH ****
Returned to his place. Because she is not set up for another G-d:
**** END BLOCK ****
```

### 22. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 17 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=17#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 17
marker: א
**** HEBREW ****
<b>ומ"מ חוששת לו. </b>כמו לוסת שאינו קבוע ומבואר בהגה' מיימוני שהביא בב"י דהיינו דוקא בראתה ג' פעמים אבל בשביל פעם אחת אינה חוששת וכתב הש"ך והיינו דוקא בוסת הקפיצה בלבד אבל בוסת הקפיצה בימים ידועים בימי החדש או בהפלגה אף בפעם א' חוששת ועיין בש"כ:
**** ENGLISH ****
And he is afraid of him. Like a non-permanent Los Angeleser in the Mimuni college that brought in the Bible, G-d has often seen, but for one time, he is not afraid and wrote the Bible and we were just the jump boss, but the jumping boss in the days are known for the new days or the faction is never afraid and seen in the Bible:
**** END BLOCK ****
```

### 23. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 17 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=17#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 17
marker: ב
**** HEBREW ****
<b>שהרי נודע שהיום גורם. </b>זה הוא דעת הרמב"ם ורבים חלקו עליו ועיין בש"ך שמתמיה על המחבר והרב שלא כתבו דברי החולקים ועיין בב"י שכתב בשם הרמב"ן שכתב שבטלנו דעתנו מפני דעת הרמב"ם לכן נ"ל שסתם כאן כדבריו:
**** ENGLISH ****
It is known that today is a cause. This is the opinion of the Rambam, and many have shared it, and we will see that the author and the Rabbi who did not write the words of the verses, who wrote in the name of the Ramban, that we have not done our opinion against the Rambam, therefore, that we are not just here as he says:
**** END BLOCK ****
```

### 24. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 18 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=18#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 18
marker: א
**** HEBREW ****
<b>אינה חוששת. </b>ומכל מקום חוששת לעונה בינונית כמבואר לעיל סס"ק קפ"ד:
**** ENGLISH ****
Not afraid. And everywhere, for a medium season as described above, R&amp;D:
**** END BLOCK ****
```

### 25. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 18 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=18#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 18
marker: ב
**** HEBREW ****
<b>אלא לקפיצות. </b>ואינו נעקר אא"כ שתקפוץ ג"פ באותו יום ותמצא טהורה:
**** ENGLISH ****
But to jumps. And it is not so cold that you jump in the same day and find pure:
**** END BLOCK ****
```

### 26. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 19 — marker `א`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=19#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 19
marker: א
**** HEBREW ****
<b>הרבה פעמים זאח"ז. </b>דהיינו שעה או שתים בשעה שרגילה לראות. ב"י בשם הרא"ש והתוס':
**** ENGLISH ****
Many times jazz. It is an hour or two when it is used to see. “In the name of the Lord, and in the name of the Lord.”
**** END BLOCK ****
```

### 27. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 19 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=19#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 19
marker: ב
**** HEBREW ****
<b>אינה חוששת. </b>כלל וכלל אפילו לוסת שאינו קבוע ואף על גב דנתבאר בסעיף כ"א דחוששת לוסת שאינו קבוע היינו בלא נקבע עדיין לשניהן יחד וכ"כ הדרישה והש"ך והט"ז וכן משמעות הרב בהג"ה דלא כב"י ודבריו תמוהין ועד"ר:
**** ENGLISH ****
Not afraid. In general, even a non-determination and even on the back of Dunbar in the section, as a result, we were not fixed yet to both of them together and as the demand and the Highness and the Highness, and the significance of the Highness of the Grail, and his words are tailored to the Dr.:
**** END BLOCK ****
```

### 28. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 2 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=2#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 2
marker: א
**** HEBREW ****
<b>לסוף כ'. </b>פי' אחר ראיה ראשונה:
**** ENGLISH ****
At the end of . The first evidence:
**** END BLOCK ****
```

### 29. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 2 — marker `ב`

- Quality: **warn** — chunk_seam_duplicate, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=2#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 2
marker: ב
**** HEBREW ****
<b>בפעם אחת. </b>ואפי' עונה בינונית שלא נקבע רק פעם אחת נעקר בפעם אחת וכן משמעות הש"ס והטור והרשב"א וכל הפוסקים וכן משמעות המחבר כאן ודלא כעט"ז שבסעיף י"ג כתב דעונה בינונית הוה כוסת קבוע ממש ואינו נעקר אלא בג"פ ולא דק בזה וכבר השיג גם כן עליו הש"ך בסימן זה ס"ק ל' ע"ש:
**** ENGLISH ****
One time. A medium season that was not determined only once was studied for a single time, and the meaning of the X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X
**** END BLOCK ****
```

### 30. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 20 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=20#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 20
marker: _
**** HEBREW ****
<b>שפיהוק של אתמול גורם. </b>ול"ד לדלעיל ס"ס י"ז דאמרינן דהיום גורם ולא קפיצה דאתמול דשאני קפיצה דמחמת אונס היא בא כ"כ דרישה סעיף ס' וגם העט"ז והמע"מ סוף דף רצ"ח חילקו בזה ועיין במשמרת הבית דף קע"ד ע"א שמחלק להדיא כה"ג וכ"כ הש"ך והט"ז וכ"כ בתשובת חוט השני סימן י"ד אך שדוחה שם חילוק זה לעיל שלא מצא הדבר בשום ספר ובסימן ט"ו מדחיק מאד בישוב קושיא זו וכתב שנמשך אחר הב"י וצירף לזה דעת הרמב"ם וזה ודאי אינו דלדעת הרמב"ם פשיטא שקבעה הוסת לימים ולא לפיהוק כי לדעתו אין קובעת כלל לפיהוקין וכמ"ש המ"מ פ"ח מהא"ב:
**** ENGLISH ****
Yesterday's madness causes. “And the Lord of the Lord, who is not a sign of sin, and is not a reward for the Lord’s mercy, and that is not the case of the Lord’s promise, and that it is not the same as the Lord’s Prayer, nor is it the Lord’s Prayer, and that it is not the same as the Lord’s Prayer, and that it is not the same
The Holy One, who has been established, has not yet been established, nor does he believe that he does not believe in Hashem’s Word, nor does he believe in Hashem’s Word
**** END BLOCK ****
```

### 31. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 21 — marker `_`

- Quality: **ok**
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=21#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 21
marker: _
**** HEBREW ****
<b>ואסורה לשמש עד שתבדוק. </b>וכתב הב"ח דהיינו לכתחלה בשעת הוסת אסורה לשמש וצריכה בדיקה כדי להתיר אחר הוסת אע"ג דאם עברה ולא בדקה מותרת בלא בדיקה מ"מ לכתחלה צריכה לבדוק בשעת וסת כדי שתהא מותרת לאחר שעבר הוסת אבל אם עבר ולא בדקה ודאי מותרת לאחר הוסת בלא בדיקה אפילו בוסת הגוף (כדמשמע מסעיף כ"ו) עכ"ל הב"ח ועיין בפריש' שכתב כמה פירושים בזה ותופס פירוש זה לעיקר והט"ז דוחה פירוש זה ואין דבריו מוכרחים ועיין בנה"כ שפירש גם כן בדרך אחר קצת גם השיג על הט"ז וז"ל וגם מה שאמר וז"ל דהתם דיעבד והכא לכתחלה אין לו הבנה כלל דמה דיעבד ולכתחלה שייך הכא עכ"ל בודאי נתעלם ממנו דברי הב"ח והפרישה וכמ"ש והוא נכון:
**** ENGLISH ****
It should not be used until you check. And the Bible says, “It is forbidden to be used and required a test to permit the withdrawal of the Dham past, and not in a minute, it is permitted without a test of “the disease should be checked in a period of time, so that it may be permitted after it has been destroyed, but if it is not a certain minute that it is permitted after the death of even the body’s boss (he has been heard as a result of it)
“As soon as he was chastised, he also had a little understanding of the High Court and also what he said and that the Almighty had no understanding of it, and that he had no understanding of it as a whole, and that it is true:
**** END BLOCK ****
```

### 32. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 23 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=23#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 23
marker: א
**** HEBREW ****
<b>אכלה בצל וראתה וכו'. </b>משמע דג' אכילות אלו א' מהם קובע את חבירו וכ"כ בית יוסף ועיין בב"ח שכתב שהטור היה מסתפק בדבר זה לכן השמיט דין זה:
**** ENGLISH ****
Eat in the shadow and see and so on. It means that these feedings A. of them determines his or her husband and Joseph's house and see the Bible that the column would have been satisfied with this, so that this judgment was put:
**** END BLOCK ****
```

### 33. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 23 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=23#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 23
marker: ב
**** HEBREW ****
<b>אפילו בלא ימים שוים. </b>וראוי לחוש לדברי שניהם להחמיר וע"ל סוף סימן קפ"ד שיש עוד נפקותא בין שתי הדעות לענין עונה בינונית ועמ"ש שם:
**** ENGLISH ****
Even without days. And let’s feel that both people are getting worse and that the KGB sign is that there is more to be made between the two opinions and the middle season and the people there:
**** END BLOCK ****
```

### 34. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 24 — marker `א`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=24#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 24
marker: א
**** HEBREW ****
<b>וכולם אין חוששין להם. </b>והיינו דוקא בוסת הבאים ע"י מקרה כמו פיהוק אבל בוסת הקפיצות כיון שאינו נקבע אלא עם הימים ודאי דאסורה כל העונה וכמבואר בסעיף כ"ה ועיין בש"כ:
**** ENGLISH ****
Everyone is not afraid of them. And we were just the following boss by case such as Pythok, but the boss of the undetermined leaps, but with the days it must be forbidden all season and described in the section as “the Lord and the Bible:
**** END BLOCK ****
```

### 35. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 24 — marker `ב`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=24#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 24
marker: ב
**** HEBREW ****
<b>אלא נמשכת גם אחר הוסת. </b>וכ"ש אם מתחלת קודם הוסת דצריכה לפרוש כל אותה עונה שלפני הוסת. ש"ך:
**** ENGLISH ****
It also lasts after the menstruation. And, if a previous episode had been delayed, it would have to leave all the same season before the end. “Third:
**** END BLOCK ****
```

### 36. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 24 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=24#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 24
marker: ג
**** HEBREW ****
<b>עד סוף עונה אחת. </b>עיין בב"י מה שמתרץ בזה דלא תקשה מדלעיל סימן קפ"ד ועיין בב"ח והש"ך מה שתירץ בזה:
**** ENGLISH ****
By the end of one season. “Look at what you want in this case, you don’t make it difficult to leak the letter of KGB and see what you want:
**** END BLOCK ****
```

### 37. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 25 — marker `_`

- Quality: **error** — divine_name_style, mt_garbage
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=25#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 25
marker: _
**** HEBREW ****
<b>אסורה כל עונת הוסת. </b>כ"כ הב"י בשם הרא"ש בשם הראב"ד אכן לעיל בס"ס קפ"ד הביא הב"י בשם הראב"ד דוסת שבא ע"י מקרה בין שיש לה יום קבוע וכו' גם כן אינה אסורה אלא לשעתה ועיין בט"ז שהאריך לתרץ אבל משמעות ל' הרא"ש והראב"ד בספר בעל הנפש אינו כן וכן השיג עליו הש"ך בנה"כ אך שמדחיק שם מאד ליישב דברי הראב"ד אבל באמת יותר נ"ל דהרא"ש סברא דנפשיה כתב בדין זה דאסור כל העונה (והב"י שכתב) שהרא"ש כ"כ בשם הראב"ד היינו לפי שהרא"ש סיים שם בסוף דבריו וכל זה דקדוק הראב"ד אבל באמת לא קאי אדין זה רק אשאר דינים שהוזכרו שם בהרא"ש (כמבואר בספר בעל הנפש) והוא שלא כדעת הראב"ד דלעיל והרב שפסק לעיל בסימן קפ"ד סעיף ב' דבוסת התלוי בשינוי הגוף אינה חוששת רק בשעת וסתה מיירי שלא בא בזמן ידוע וק"ל:
**** ENGLISH ****
All season is prohibited. This is the name of the Lord’s Prayer, which is in the name of the Holy Spirit, which is in the name of the Holy Spirit, which is the case of the Lord’s Prayer, which is not the case of the Lord’s Prayer, nor is it possible for the Lord’s sake of the Holy Spirit, and that He is not the same as the Lord’s
He concluded there at the end of his words, and all this is the Grammar grammar, but it is not actually Kai Adin that was mentioned in the name of the Bible, and that it is not as the opinion of the Almighty and the rabbi who has stopped above in the letter of the D.C., which is dependent on the change of the body is not only afraid of the time when it is not known
**** END BLOCK ****
```

### 38. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 27 — marker `א`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=27#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 27
marker: א
**** HEBREW ****
<b>שלא הגיעה לימי הנעורים. </b>כדלקמן סי' ק"צ סעיף ב':
**** ENGLISH ****
They did not come to the youth. The following is paragraph 1:
**** END BLOCK ****
```

### 39. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 27 — marker `ב`

- Quality: **warn** — divine_name_style, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=27#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 27
marker: ב
**** HEBREW ****
<b>אם פסקה ג' עונות. </b>שהם צ' יום אפילו היתה וסתה וסת הסירוג מב' חדשים לב' חדשים וכן בוסת ההפלגה שהיא מל"ה לל"ה ימים דבגדולה בעינן שעברו עליה ג"פ מב' חדשים לב' חדשים או ג"פ מל"ה לל"ה משא"כ כאן דסגי בג' עונות בינוניות ואינה חוששת לוסת הראשון דהיינו מב' חדשים לב' חדשים ולוסת הפלגה אם שוב תראה פעם אחת. ש"ך ושאר אחרונים:
**** ENGLISH ****
If JD has stopped. They even had a new weekend and a new weekend, as well as the cruise boss that she had a word for the Lord for the sake of the days of a beard in which she had undergone a new M.M. for a new heart or a jeep from Tel Aviv to the Middle Ages and was not afraid of the first Los Angeles cruise from a new one if you ever see a new cruise. The Last and the Last:
**** END BLOCK ****
```

### 40. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 27 — marker `ג`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=27#marker=%D7%92`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 27
marker: ג
**** HEBREW ****
<b>ואפי' חזרה לראות באותן עונות. </b>פירוש לא מבעיא אם לא חזרה וראתה באותן עונות או לא ראתה כלל (וכמ"ש בס"ק מ"ט) או ראתה פעם אחת דאינה חוששת לקביעות הראשון אלא אפילו חזרה לראות ב"פ בקביעות הראשון אפ"ה אינה חוששת כל שלא חזר ונקבע ג"פ גם זה שם:
**** ENGLISH ****
She came back to see in those seasons. It doesn't mean that I don't come back and see the same seasons or have not seen at all (and so in the C.M.C.) or have seen once Daina is afraid of the first impressions, but even back to seeing the P. on the first regular basis, P. is not afraid of all that did not come back and that is also there:
**** END BLOCK ****
```

### 41. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 27 — marker `ד`

- Quality: **warn** — marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=27#marker=%D7%93`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 27
marker: ד
**** HEBREW ****
<b>עד שתחזור ותקבענו ג"פ. </b>משמע קצת מהל' שתקבענו דדוקא שתראה דרך קביעות דהיינו ג"פ בראיות מכוונות וכ"כ הט"ז משמע קצת מלשון הרשב"א שהובא בב"י דתינוקת וזקנה אינה חוששת לוסת שאינו קבוע כלל משמע אפילו ראתה ג"פ ועדיין הוא וסת שאינו קבוע כלל בראיות שאינן מכוונות אינה חוששת לוסת שאינו קבוע אבל הט"ז כתב דדעת הש"ע אינו כן דאף לוסת שאינו קבוע חוששת כל שראתה ג"פ רק לוסת הקבוע הראשון אינה חוששת עד שתחזור ותקבענו ועיין בספר נה"כ שהשיג עליו:
**** ENGLISH ****
Until you get back and you’ll set up a jack. It means a little bit of what we have determined by Doc that you will see through hypocrisy, i.e., G.D. in deliberate evidence and that the T.A. means a little bit of the PA’s language brought in the Bible that is not intended in the baby’s sleep and old age is not afraid that the first mention is not a permanent Los Angeles report
See the book that he has received:
**** END BLOCK ****
```

### 42. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 28 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=28#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 28
marker: _
**** HEBREW ****
<b>וזקנה. </b>ע"ל סימן קס"ד סעיף ג' ועיין בש"ך שכתב וז"ל ודע דבכל מקום שנאמר בכל סימן זה שקבעה וסת אם הוא להקל הוא דוקא שלא בימי נדה וימי זיבה כדאיתא ברשב"א וטור ושאר פוסקים עכ"ל וכבר כתבתי לעיל ס"ק כ"ז כן בשם ספר נה"כ ודחיתי דבריו ע"ש:
**** ENGLISH ****
and old. "And thou, Capernaum," he said, "And thou shalt be thrust down to hell, and shalt be thrust down to hell."
**** END BLOCK ****
```

### 43. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 29 — marker `א`

- Quality: **error** — mt_garbage, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=29#marker=%D7%90`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 29
marker: א
**** HEBREW ****
<b>שזקנה כל כך שראויה. </b>ואע"פ שהיא מקפדת וכן אם אינה ראויה לראות אע"פ שהיא אינה מקפדת כי לאו בדידה תליא מילתא כמ"ש הב"י בשם הירושלמי:
**** ENGLISH ****
I bought so worthy. And if she does not want to see a prayer that she does not circulate because he does not want to see Hashem’s Word as the Holy One
**** END BLOCK ****
```

### 44. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 29 — marker `ב`

- Quality: **warn** — chunk_seam_duplicate, marker_label_mismatch
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=29#marker=%D7%91`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 29
marker: ב
**** HEBREW ****
<b>ואינה חוששת. </b>בפ"ק דנדה יש פלוגתא בזה דחד אמר כל שאינה בושה וחד אמר כל שאינה מקפדת ואיכא בינייהו בושה ואינה מקפדת ופסק הרשב"א והרמב"ם ורבינו ירוחם כמ"ד שאינה מקפדת והטעם נ"ל לפי שבירושלמי איתא להדיא כמ"ד כל שאינה מקפדת וגם הוא מידי דרבנן אזלינן לקולא וכ"כ הכסף משנה פ"ד מהל' מטמא משכב ומושב ונראה שזה ג"כ דעת הטור והמחבר והאי אינה חוששת פירושו שאינה מקפדת וכן משמע מדברי הב"י וכן הלבוש כתב להדיא ואינה מקפדת כל זה נראה פשוט ודלא כמ"ש הט"ז דדעת הטור והמחבר לפסוק לחומרא כמ"ד כל שאינה בושה דזה ודאי אינו משמעות הב"י (וגם אינו בכלל הלשון של אינה חוששת) והכ"מ דפ"ד מהל' מטמאי משכב ומושב:
**** ENGLISH ****
Not afraid. In this case, he said that he had no shame and no shame, and that he would not be ashamed of him, and that he would not be ashamed of him, and that he would not be cursed, and that he would not be afraid of him, and that he would not be afraid of him, and that he would not be able to do so
All this seems simple and simple as the “Charch of the Order” and the author of the column as “all who are not ashamed of this is certainly not the meaning of the Bible (and not at all the language of is not afraid) and the so-called “Dr. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. Mt. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M. M
**** END BLOCK ****
```

### 45. `siman_189/torat-hashlamim/part-001.txt` — torat-hashlamim — seif 3 — marker `_`

- Quality: **error** — mt_garbage
- Checkpoint id: `siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=3#marker=_`

```text
**** YD001 SOURCE BLOCK ****
slug: torat-hashlamim
seif: 3
marker: _
**** HEBREW ****
<b>וסת לשעות. </b>כגון אחר טבילתה וכיוצא בזה ע' בב"י:
**** ENGLISH ****
Stop for hours. This is the case of Hashem’s Word and His Word:
**** END BLOCK ****
```

---

## After completing this batch

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_189
npm run pipeline:editorial:advance -- --siman 189
```

## Checkpoint ids

siman_189/tiferet-yisrael/part-001.txt#slug=tiferet-yisrael#seif=4#marker=_
siman_189/tiferet-yisrael/part-001.txt#slug=tiferet-yisrael#seif=5#marker=_
siman_189/tiferet-yisrael/part-001.txt#slug=tiferet-yisrael#seif=6#marker=_
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=1#marker=%D7%90
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=1#marker=%D7%91
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=10#marker=_
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=11#marker=_
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=12#marker=_
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=13#marker=%D7%90
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=13#marker=%D7%91
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=13#marker=%D7%92
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=13#marker=%D7%93
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=13#marker=%D7%94
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=13#marker=%D7%95
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=14#marker=%D7%90
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=14#marker=%D7%91
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=15#marker=%D7%90
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=15#marker=%D7%91
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=15#marker=%D7%92
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=15#marker=%D7%93
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=16#marker=_
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=17#marker=%D7%90
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=17#marker=%D7%91
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=18#marker=%D7%90
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=18#marker=%D7%91
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=19#marker=%D7%90
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=19#marker=%D7%91
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=2#marker=%D7%90
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=2#marker=%D7%91
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=20#marker=_
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=21#marker=_
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=23#marker=%D7%90
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=23#marker=%D7%91
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=24#marker=%D7%90
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=24#marker=%D7%91
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=24#marker=%D7%92
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=25#marker=_
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=27#marker=%D7%90
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=27#marker=%D7%91
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=27#marker=%D7%92
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=27#marker=%D7%93
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=28#marker=_
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=29#marker=%D7%90
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=29#marker=%D7%91
siman_189/torat-hashlamim/part-001.txt#slug=torat-hashlamim#seif=3#marker=_