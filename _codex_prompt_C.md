## Codex Prompt C — OC Corpus Garbage EN Retranslation (68 entries)

### Background
These corpus en.html files contain garbage machine-translation (KGB, Lord's Prayer, Bible and the Bible, Starwork, etc.).
The he.html is correct. Retranslate each en.html from its he.html.

### Task per entry
1. Read he.html — count `<br />` segments → N
2. Translate each HE segment into clean academic English → N EN segments
3. Join with `<br />\n` and write en.html (UTF-8, no BOM)
4. Verify: en segment count === he segment count; no garbage patterns remain

### Garbage patterns to avoid
- KGB, terrorist, Lord's Prayer, Lord's word, heaven's people
- Starwork, star work, Lycott, Bible and the Bible
- hand recoils, first dish, Saturday (for Shabbat), her age, the craft
- M.M.M., D.D.D., muktzeh as "allocated"
- Random transliterations (Daha, Dramaa, Abai, etc.) instead of real translations

### Translation rules
- Keep halachic terms: Magen Avraham, Taz, Bach, Gra, Rama, seif katan (sk), Mishna Berurah, etc.
- Expand abbreviations in context: sk = seif katan, MA = Magen Avraham, BH = Bach, MB = Mishna Berurah
- Match segment count exactly to HE

### File write
`fs.writeFileSync(path, content, {encoding: "utf8"})` — plain UTF-8, no BOM

### Also fix source TXT
For each corpus entry below, the source TXT file also has garbage. After fixing en.html,
find the corresponding TXT block in:
`C:\Users\binya\Documents\Shulchan aruch\newtry\OC_001\output\siman_NNN\<slug>\part-001.txt`
Find the block with matching seif number and replace its ENGLISH section with your clean translation.
TXT block format: `**** ENGLISH ****` ... `**** END BLOCK ****`

### Entry List

---
**#1 mishnah-berurah  siman135/seif-004  (HE:5 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman135\seif-004\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman135\seif-004\mishnah-berurah\en.html`
- HE: (יא) המנהג הפשוט - ר"ל אף דהרבה ראשונים סוברין דלא נעשה תקנה זו להקדים עם הארץ לפני החכם מ"מ המנהג כ | (יב) לפני חכם גדול - ואין כאן בזיון לכבוד התורה דכיון שכן המנהג אין כאן בזוי: | (יג) יודע לקרות - מתוך הכתב כדלקמן סימן קל"ט ס"ב: | (יד) סגי בכך - 
- EN (garbage): (a) The simple custom – R. D. D. D. D. D. D. This regulation is made to preceden | (b) Before great wisdom, and there is no vision in honor of the Tor

---
**#2 beur-hagra  siman139/seif-010  (HE:7 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman139\seif-010\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman139\seif-010\beur-hagra\en.html`
- HE: ס"י אחר כו'. כמו בבה"מ דאמרי' שם חוזר למקום שפסק ופי' הרי"ף וש"פ דחוז' ואומר ברוך שאכלנו כו': | כדי לכלול כו'. ואע"ג שאמר המבורך דה"נ בבהמ"ז אומר נברך לכלול עצמו ואפ"ה חוזר ואומר ברוך כו' וכמ"ש יר | ס"ח אפילו בירך כו' דמשום כו'. כמו כהן שקורא במקום ל
- EN (garbage): (10) After, etc. — as in Beit HaMikdash where they say there that one returns to | (2) to include etc. And AAG who said the Blessed One in the Behemot

---
**#3 mishnah-berurah  siman151/seif-001  (HE:13 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman151\seif-001\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman151\seif-001\mishnah-berurah\en.html`
- HE: (א) קלות ראש - כי הם נקראים מקדש מעט כמו דכתיב ואהי להם למקדש מעט. ובמקדש כתיב ואת מקדשי תיראו שיהא  | (ב) ושיחה בטילה - היינו אפילו שיחת חולין שהיא לצורך פרנסה דבחוץ שרי בביהכ"נ אסור ובפרט שיחה בטלה לגמ | (ג) ואין אוכלין וכו' - וה"ה דאין עושין בהן ש
- EN (garbage): (1) Lightheadedness — because they are called a small mikdash, as it is written: | (2) And idle conversation — meaning even mundane conversation that 

---
**#4 mishnah-berurah  siman151/seif-010  (HE:3 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman151\seif-010\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman151\seif-010\mishnah-berurah\en.html`
- HE: (כח) לאחר שחרבו - הבתי כנסיות ובתי מדרשות והטעם דכתיב והשמותי את מקדשיכם ולא כתיב ואת מקדשיכם אשימם  | (כט) תולשים אותם וכו' - ר"ל מותר לתלוש אותם ובלבד שיניחם במקומם ולא יטלם משם: | (ל) כדי שיראו וכו' - לפ"ז באם סתרו ביהכ"נ ממקום זה ובנאוהו במקום אח
- EN (garbage): After they were crucified, the houses of churches and houses of sermons and the  | They will be removed, and so on, they can be saved if they are warm

---
**#5 baer-heitev  siman161/seif-001  (HE:6 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman161\seif-001\baer-heitev\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman161\seif-001\baer-heitev\en.html`
- HE: הבשר. פי' במקום שהצפורן עודף על הבשר: | בשרו. פי' שאין לו מכה רק מיחוש בעלמא ויכול להסיר הרטיה כשירצה זה תלוי בקפידא אבל אם יש לו מכה וא"א ל | מקפיד. ואם רוב היד מכוסה אעפ"י שאינו מקפיד חוצץ. ב"י מ"א: | לחוש. וא"ת הא בסי' קס"ב ס"ט כתב דאם נמצא דבר על
- EN (garbage): (א) The meat. P. Where the conscience is over the flesh: | (ב) in his flesh. P Take the place of the retinal as the X-ray SS and see the X- | (ג) Make

---
**#6 mishnah-berurah  siman162/seif-010  (HE:6 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman162\seif-010\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman162\seif-010\mishnah-berurah\en.html`
- HE: (סז) ורטיה - עיין סימן קס"א סק"ד במ"ב: | (סח) די לו וכו' - מיירי שאינו יכול להסירה מחמת כאב המכה וכמו שכתבנו שם לעיל במ"ב סק"ה עי"ש ולכך די ל | (סט) שאר היד - ואם אינו יכול ליטול ידיו כלל מחמת חולי יכרוך ידיו במפה: | (ע) שלא יגע ברטיה - צ"ל שלא יגעו 
- EN (garbage): (א) (s) Andreya – see the X-ray mark in the Gemara: | (ב) It is enough for him, and so on, that he is not able to remove her from the  | (ג) (c) The r

---
**#7 mishnah-berurah  siman170/seif-001  (HE:11 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman170\seif-001\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman170\seif-001\mishnah-berurah\en.html`
- HE: (א) אין משיחין בסעודה - אפילו בד"ת ודוקא בשעת אכילה גופא ומשום סכנה וכדלקמיה אבל בין תבשיל לתבשיל מו | (ב) שמא יקדים וכו' - שכשיוצא הקול נפתח אותו כובע שע"פ הקנה ונכנס בו המאכל ומסתכן [רש"י]: | (ג) נוטל ידו אחת - וצריך לברך ענט"י אם רוצה לאכול [מ"א] 
- EN (garbage): (a) There is no messiah at the banquet – even in D.C. and Dokka when eating is f | (b) When the voice opens it with a hat that is bought and enters th

---
**#8 machatzit-hashekel  siman182/seif-002  (HE:3 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman182\seif-002\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman182\seif-002\machatzit-hashekel\en.html`
- HE: (ס"ק ב') יין כו' ומשמע דאם גדל מעט כו' מדכתב סביב כל העיר כו': | ול"נ דשכר כו' ר"ל דא"צ לחלוק' הב"ח ובלא"ה עדיף מי דבש: | ונ"ל דמשקין כו' בפסח כו' ר"ל דבכל השנה אין נקראים חמר מדינה כיון דבכל השנה אין רגילים בו אבל בפסח דר
- EN (garbage): (C. B.) Wine is called, and it is said that a little quaint has grown around the | “And the the Master of Heaven’s Word is better than Heaven’s Word: 

---
**#9 magen-avraham  siman182/seif-002  (HE:5 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman182\seif-002\magen-avraham\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman182\seif-002\magen-avraham\en.html`
- HE: יין מצוי. ובטור סי' ער"ב כתוב דאם אין יין גדל מהלך יום סביב כל העיר מקרי אין יין מצוי ע"כ ואף על גב  | חוץ מן המים. אף על פי שרוב שתייתן מים אין מברכין עליו: | וקובעין הסעודה. פי' די"א דאם קבע סעודתו על שאר משקין מברך עליהם אפי' במקום דאיכא יין: | וא
- EN (garbage): Wine available—Tur siman 272 if no wine grows day's walk around city called no w | Except the water. Although most of you give water, you don’t brush 

---
**#10 machatzit-hashekel  siman20/seif-001  (HE:11 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman20\seif-001\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman20\seif-001\machatzit-hashekel\en.html`
- HE: (ס"ק א) מתגר כו' קפידא באומנתו כגון יין רמונים כצ"ל: | דהוי זיוף אפי' לעובדי כוכבים דיין רמונים שותים לרפואה ואי מערבים בו חומץ אינו פועל רפואתו: | שנטוה שלא לשמה. ול"מ נפשי' בזה דזה אין תלוי באומנות וגם יכול למוכרו לעובדי כוכבים וע' בתשובת ה"ה ח"צ |
- EN (garbage): (Sq. 1) He provokes K. carefully in his guardianship, such as pomegranate wine K | Faded forgery Efi' for star workers Dayan Ramoni drink for medicine

---
**#11 baer-heitev  siman223/seif-002  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman223\seif-002\baer-heitev\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman223\seif-002\baer-heitev\en.html`
- HE: מת אביו. וה"ה שאר אדם כשר ומכ"ש ת"ח דהוו בכלל שמועות רעות. מ"א: | דיין האמת. וצריך לברך בשם ומלכות בא"י אמ"ה דיין האמת ודוקא אביו או שאר אדם כשר שהוא מצטער עליו אבל ש | שירשו. מכאן רצה להוכיח בהלק"ט ח"ב סי' קס"ב דאם היה יודע מתחלה שהיו לו נכסים אין מ
- EN (garbage): (א) His father died. “The rest of a man who is a minister and a lawyer has been  | (2) Dane the truth. And it is necessary to bless in the name and ki

---
**#12 mishnah-berurah  siman225/seif-009  (HE:10 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman225\seif-009\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman225\seif-009\mishnah-berurah\en.html`
- HE: (כב) הקטע - שנקטעו לו ידיו: | (כג) הסומא - משתי עיניו: | (כד) דקות - היינו שיש לו נקודות כעדשים אדומים קצת אלא שבין עדשה לעדשה יש לובן צח ומבהיק ועל שם אותו  | (כה) ממעי אמם - קאי אכולהו לבד אקיטע: | (כו) מברך דיין האמת - שבא לו זה ע"י עונש: | (כז) ד
- EN (garbage): (א) (h) The section, which was cut off by his hands: | (ב) And the two eyes: | (ג) It was for a few minutes that he had a few red spots, but between a

---
**#13 mishnah-berurah  siman225/seif-010  (HE:3 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman225\seif-010\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman225\seif-010\mishnah-berurah\en.html`
- HE: (לב) הרואה וכו' ובריות נאות - בין זכרים בין נקבות. ועכשיו לא נהגו כלל לברך ברכה זו [ח"א ע"ש טעמו] ומ | (לג) עובד כוכבים - היינו ראיה בעלמא דמותר אבל להסתכל בו ביותר ולהתבונן בדמותו אסור [מ"א] ואסור לומר  | (לד) ולא על אחרים - אפילו לאחר שלשים יום:
- EN (garbage): (א) (heart) the seer and so on and in good pillows - between males among females | (ב) (L) Starworker – We were a vision of a star who was a fan, but 

---
**#14 mishnah-berurah  siman246/seif-003  (HE:10 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman246\seif-003\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman246\seif-003\mishnah-berurah\en.html`
- HE: (י) אסור להשכיר וכו' - אפילו ביום ראשון ואפילו בהבלעה: | (יא) כדי שיעשה וכו' - צ"ל שמא יעשה בה [הגר"א וכן מוכח מהש"ע גופא]: | (יב) על שביתת בהמתו - דכתיב למען ינוח שורך וחמורך וגו' ואע"ג דהשכיר הבהמה לא"י הא קי"ל דשכירות לא קנ | (יג) אין הא"י נאמן - 
- EN (garbage): (א) (b) You must not rent and so on, even on Sunday and even in confusion: | (11) So that he will perform in it, etc. — it should read 'lest he perfor

---
**#15 beer-hagolah  siman250/seif-001  (HE:3 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman250\seif-001\beer-hagolah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman250\seif-001\beer-hagolah\en.html`
- HE: טור ושבלי הלקט מהא דר' חסדא שבת קי"ז | שם קי"ט | לשון הטור
- EN (garbage): (א) Heaven is not Heaven | (ב) Name of KGB | (ג) The tongue of the column

---
**#16 baer-heitev  siman257/seif-001  (HE:5 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman257\seif-001\baer-heitev\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman257\seif-001\baer-heitev\en.html`
- HE: בשבת. ר"ל לאחר שנתבשל התבשיל רוצה להטמינו בדבר שישמור חומו כמ"ש סי' רנ"ג ס"ב בהג"ה והטעם דשמא ימצא ק | אסור. פירוש אפילו בשוגג ואע"ג דבשכח ושהה מתיר בסימן רנ"ג מכל מקום בהטמנה מחמירין טפי. מ"א: | בחמימותו. וה"ה המטמין בשבת בדבר שאינו מוסיף הבל דשרי ד
- EN (garbage): (1) on Shabbat After the stew is cooked, Ral wants to bury it in something that  | (ב) forbidden. It means even with a roof and a honey-dog, and it pe

---
**#17 beer-hagolah  siman257/seif-004  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman257\seif-004\beer-hagolah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman257\seif-004\beer-hagolah\en.html`
- HE: שבת נ"א | שם בגמ' | שם כרשב"ג | טור וסמ"ג והתרומה
- EN (garbage): (א) Shabbat night | (ב) Named in Gem | (ג) It's called the KGB | (ד) Tor and DJ and contribution

---
**#18 beur-hagra  siman262/seif-003  (HE:2 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman262\seif-003\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman262\seif-003\beur-hagra\en.html`
- HE: ס"ג ילבש כו' דר' חנינא כו'. שבת קי"ט א' ב"ק ל"ב ב': | וילביש עצמו. שם קי"ג ב' ורחצת וסכת ושמת כו':
- EN (garbage): (א) A.J. will be named Dr. Hanukkah. On Shabbat morning, K. B.B.: | (ב) Willow himself. The name of the KGB and the wick and the quaint of the quain

---
**#19 biur-halacha  siman264/seif-001  (HE:5 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman264\seif-001\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman264\seif-001\biur-halacha\en.html`
- HE: לנר של שבת - אבל ליו"ט מותר כל הפתילות והשמנים חוץ משמן שרפה ע"ש בגמרא כ"ד ע"א ולכאורה בעטרן גם ביו" | מדבר שהאור וכו' - הש"ע איירי בנר של פמוט [שקורין לאמפ] אבל באמת ה"ה בנר של שעוה וחלב שאנו עושין ג"כ  | והשלהבת קופצת - וחיישינן שמא יטה ע"כ אפילו א
- EN (garbage): (א) A candle of the Shabbat, but the High Court is permitted by all the fires an | (ב) It is said that the light, and so on, is the name of there’s Pr

---
**#20 peri-megadim  siman268/seif-005  (HE:2 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman268\seif-005\peri-megadim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman268\seif-005\peri-megadim\en.html`
- HE: ומעומד עט״ז והא דשבת קי״ט אפילו יחיד האומר נעשה שתוף מיירי בתוך התפלה אבל לאחר התפלה לא מאחר דכתב הט | בפרק כל כתבי קי״ט ב׳ אמר ר״ח אמר מר עוקב״א כל האומר ויכלו ב׳ מלאכי השרת מניחין ידיהם על ראשו ואומרים
- EN (garbage): (1) And from the 17th and the Shabbos of siman 19, even a single person who says | (ב) In the chapter of all the writings of the KGB, he said, “All th

---
**#21 machatzit-hashekel  siman269/seif-001  (HE:14 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman269\seif-001\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman269\seif-001\machatzit-hashekel\en.html`
- HE: (ס"ק א) מטעימו כו'. אלא עשה היינו הקידוש בלא יין. ושלא לאכול קודם קידוש הוא דרבנן: | כיון די"א אפי' גדול כו' דיוצא בקידוש זה כו' היינו השר מקוצי שהביא המרדכי אמנם ג' תיבות אלו דיוצא בקי | ואפי' במקום שנהגו ליתן להתינוק הנימול כו' ע' במ"א ס"ס תרכ"א: |
- EN (garbage): (א) (A.) It is his fault. We did so without wine. Don't eat snoring first is a d | (ב) Since some say even an adult, etc., fulfills through this kiddu

---
**#22 mishnah-berurah  siman271/seif-002  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman271\seif-002\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman271\seif-002\mishnah-berurah\en.html`
- HE: (ג) דאיתקש זכור לשמור - דזכור את יום השבת לקדשו האמור בדברות הראשונות ושמור את יום השבת לקדשו האמור  | (ד) ומוציאות את האנשים - וכן הסכימו הט"ז ומ"א והגר"א וש"א ומ"מ יש להחמיר לכתחלה שלא תוציא אשה אנשים  | (ה) הואיל וחייבות וכו' - ולכן יכולה להוציא א
- EN (garbage): (1) (c) Daitkash remember to keep - remember the Shabbat day for its sanctificat | (ב) (D) And the people are taken out, and they have agreed to the H

---
**#23 mishnah-berurah  siman271/seif-011  (HE:8 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman271\seif-011\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman271\seif-011\mishnah-berurah\en.html`
- HE: (נ) שופך ממנו וכו' - כשיעור מלא לוגמיו: | (נא) מהכוס השני - ובמ"א הסכים לדעת התוספות דכוס של חובה צריך להיות הטעימה דוקא מכוס שיש בו רביעית יי | (נב) מקדש במה שנשאר - מלשון זה משמע דמקדש בזה הכוס גופא ואף דלעיל בס"י כתב דצריך להיות הכוס מלא זהו  | (נ
- EN (garbage): (א) (b) He is exalted from him and so on, as a whole class of his companions: | (ב) (N) from the second cup - and in the U.S., he agreed to know that 

---
**#24 mishnah-berurah  siman272/seif-010  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman272\seif-010\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman272\seif-010\mishnah-berurah\en.html`
- HE: (לה) פוטרת - דכיון שהוא במקום הסעודה צרכי סעודה הוא ומחמתה הוא בא: | (לו) שבתוך הסעודה - מברכת בפה"ג וה"ה שפוטרת יין שלאחר הסעודה קודם בהמ"ז: | (לז) דברכת המזון פוטרתו - דכוס של קידוש הוא ג"כ בכלל דברים הבאים מחמת הסעודה: | (לח) ועיין לעיל סימן קע"ד 
- EN (garbage): (א) (a) is fired – a demon who is in the place of the feast of the needs of a fe | (ב) (b) In the cup of wine, in the mouth, the "send of the wine tha

---
**#25 baer-heitev  siman275/seif-001  (HE:3 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman275\seif-001\baer-heitev\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman275\seif-001\baer-heitev\en.html`
- HE: ואין קורין. וה"ה שאין בודקין הציצית. מט"מ רש"ל: | בעששית. ואם היא סגורה במפתח מותר וכן עשו מהרא"ש ומהר"ם ותלמידיהם וכ"כ בהגמ"נ וב"ח וט"ז וע"ת אוסרים מ | שעוה. ב"ח כתב בשם רש"ל דנהגו להקל לבדוק כלים וציצית ולקרות ההגדה בנר של שעוה דליכא למיחש שמא יטה 
- EN (garbage): (א) There is no cold. “There is no cynical checker. From above: | (ב) in the sixth. And if it is closed in the key, it is permitted, and it is mad | (

---
**#26 mishnah-berurah  siman276/seif-002  (HE:12 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman276\seif-002\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman276\seif-002\mishnah-berurah\en.html`
- HE: (טו) אם רוב א"י - דמסתמא אדעתא דרובא קעביד ואפילו אם אח"כ נתרבו ישראל ונתוספו עליהן או שהלכו להן הא" | (טז) מחצה על מחצה - הטעם משום דליכא למיקם עלה דמלתא אם בשביל א"י עביד או בשביל ישראל עביד וי"א משום  | (יז) שלצורך א"י - ר"ל לצורך עצמו וכדמסיים לב
- EN (garbage): (א) If most of them are rejected, they will be destroyed and even if they are de | (ב) (Tez) is crossed by the crossing – the taste of the depletion o

---
**#27 mishnah-berurah  siman279/seif-007  (HE:3 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman279\seif-007\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman279\seif-007\mishnah-berurah\en.html`
- HE: (כא) מנורה וכו' - אפילו היא חדשה שלא הדליקו בה מעולם: | (כב) ונמצא עושה כלי - עיין בט"ז ועיין לקמן סימן תקי"ט ס"ב. ואם דרכה להיות רפוי שרי כמ"ש סימן שי"ג ס" | (כג) ודומה וכו' - משום דמיחלף בשל פרקים. ודע דלפי המתבאר בסעיף זה אסור לטלטל נרות שלנו [שקו
- EN (garbage): (א) (b) A lamp and so on - even a new one that never lights in it: | (ב) (h) And he is doing a tool - look at the T-shirt and check for a KGB sign. " 

---
**#28 mishnah-berurah  siman296/seif-002  (HE:9 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman296\seif-002\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman296\seif-002\mishnah-berurah\en.html`
- HE: (ז) על הפת - ול"ד לקידוש דשאני קידוש שהוא במקום סעודה והוי מענין הצריך לקידוש משא"כ הבדלה: | (ח) על השכר מבדילין - אם אין לו יין ואם יש לו יין הוא קודם לכל המשקין [או"ז] וחז"ל הפליגו ג"כ בגודל  | (ט) חמר מדינה - עיין לעיל בסימן רע"ב ס"ט במ"ב ובה"ל שם
- EN (garbage): (א) (b) On the map, and “for the sake of the snails of the snails which is in pl | (ב) If he has no wine, and if he has wine, he is the first to all t

---
**#29 mishnah-berurah  siman297/seif-002  (HE:3 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman297\seif-002\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman297\seif-002\mishnah-berurah\en.html`
- HE: (ג) של בית הכסא ולא וכו' - דכל זה לאו לריחא עבידי אלא לעבורי ריח הסרחון: | (ד) למעלה ממטתו - אבל נתונים לפני מטתו מברכין שאני אומר לכבוד חיים הם עשויים [ירושלמי]: | (ה) שבמסיבת עובדי כוכבים - היינו שמסובין לאכילה לסעודה אבל אם לא היו מסובין כלל מותר 
- EN (garbage): (א) (c) of the house of the chair and not so on - this is not the case for a thi | (ב) (d) More than his umbrella, but data before his groceries, whic

---
**#30 machatzit-hashekel  siman32/seif-011  (HE:2 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman32\seif-011\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman32\seif-011\machatzit-hashekel\en.html`
- HE: (ס"ק יא) והיינו כו' אינו מועיל להשחיר כו' ט"ז בי"ד כו' כ"כ פה אלא שכ' דאפי' לא סייעו הישראל אלא בסוף | ומ"מ כ"ז לדעת הרב"י דס"ל הכי שכתב בטי"ד סימן רע"א עמ"ש הרא"ש בתשובה במקום שאין עבדנים ישראלים יש לסמ
- EN (garbage): (Sek 11) And we are 20 is not useful to blacken 16 16 BID 20 20 20 here but that | And Mm 27, in the opinion of Rabbi Desal the most who wrote in the 

---
**#31 mishnah-berurah  siman32/seif-020  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman32\seif-020\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman32\seif-020\mishnah-berurah\en.html`
- HE: (ק) חסר או יתר - אפילו אם התיבה לא נשתנה לקריאתה בזה כגון במלא וחסר וכדלקמן: | (קא) אות אחת - ואפילו אם קוצו של יו"ד חסר מעכב כדאיתא מנחות כ"ט א': | (קב) מרובה - מלבד עון גזל החמור: | (קג) וחרד לדבר השם - ראיתי להעתיק פה לשון הלבוש הצריך מאד לענינינו
- EN (garbage): (k) Missing or excess - even if the box has not been changed to read this, such  | (ka) one letter - and even if the end of a yud lacks an inhibitor, 

---
**#32 mishnah-berurah  siman32/seif-039  (HE:10 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman32\seif-039\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman32\seif-039\mishnah-berurah\en.html`
- HE: (קעג) שיהיו מרובעות - ואם לא עשה מרובעות מעכב בדיעבד [הרמב"ם פ"ג מהלכות תפילין עי"ש] ומ"מ אם אין לו  | (קעד) שיהיו ריבוען - של התפירות ונ"ל פשוט דצריך להיות התפירות מרובע בין למעלה ובין למטה ואף דלא בריר | (קעה) כדי שיהי' וכו' - פי' בריבוע גמור שארכו
- EN (garbage): (Keag) that they should be square - and if he did not make squares, he delays in | (Ked) that there should be a square - of the stitching and above si

---
**#33 machatzit-hashekel  siman39/seif-002  (HE:2 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman39\seif-002\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman39\seif-002\machatzit-hashekel\en.html`
- HE: (ס"ק ב) כותי כו' כצ"ל דעובדי כוכבים בלא"ה פסול כו' כמ"ש סי' ל"ב ס"ט אפילו ישראל עע"ג לא מהני לרמב"ם  | דאפי' להרא"ש דמיקל בעיבוד והיינו כשישראל עע"ג דמוקי לה בגר שח"ל והוא דבגיטין דף מ"ה ע"ב קתני בבריית'
- EN (garbage): (SK 2) Kuti, 20, 20, 20, 20, 21, 21, 22, 22, 23, 24, 25, 26, 27, 28 Akoum Abd As | Dafi' to Harash Damikal in the adaptation and we were when Israel A

---
**#34 biur-halacha  siman39/seif-004  (HE:1 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman39\seif-004\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman39\seif-004\biur-halacha\en.html`
- HE: שכתבם אפיקורס - הוא האדוק לעבודת כוכבים כן איתא בב"י בשם רש"י ובכ"מ ברמב"ם הלכות תפילין פ"א הי"ג לאפ
- EN (garbage): That an apikores wrote them - This refers to one attached to idolatry; so it is 

---
**#35 turei-zahav  siman399/seif-003  (HE:2 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman399\seif-003\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman399\seif-003\turei-zahav\en.html`
- HE: כנגד לבו. קבעו חכמים מקום לשום כנגדו ראש החבל שלא יתן זה כנגד צואריו וזה כנגד רגליו והחבל מתקצר והתח | בכל כחו. לפי שהחבל הוא מכביד באמצע ואינו נמתח כראוי:
- EN (garbage): (א) against his heart. Smart people have set a place for nothing against him, th | (ב) in all his power. per the terrorist, he is circulating in the m

---
**#36 shaarei-teshuvah  siman4/seif-003  (HE:1 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman4\seif-003\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman4\seif-003\shaarei-teshuvah\en.html`
- HE: לקמן עבה"ט וע' ביד אפרים שנראה שהבה"ט הגיה בדברי המג"א שס"ק ג' וס"ק ד' שבמג"א הם ס"ק אחד ויפה כוון ו
- EN (garbage): Lakman Abhat et al. in the hand of Efraim it seems that the Abhat corrected in t

---
**#37 mishnah-berurah  siman451/seif-012  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman451\seif-012\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman451\seif-012\mishnah-berurah\en.html`
- HE: (סח) כל הכלים וכו' - משום שכשנשתמש חמץ בגוף הכלי בחמין אמרינן דהוליך הבליעה בכולו אכן משום טעם זה לב | (סט) אין לאסור - אפילו בכלי מתכות משום דאמרינן דכשם שנבלע החמץ בהיד ע"י גוף הכלי כן עתה נפלט ממנו ע" | (ע) בדיעבד - פי' אם נשתמש בהם כבר אבל לכתחלה
- EN (garbage): (א) All the tools, and so on, because when we use a buffer in the body of the ve | (2) (set) It is not to be prohibited - even in metal vessels, becau

---
**#38 mishnah-berurah  siman46/seif-004  (HE:5 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman46\seif-004\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman46\seif-004\mishnah-berurah\en.html`
- HE: (טו) בכל יום שלא עשני וכו' - ויזהר שלא יברך שעשני ישראל כמו שיש באיזה סדורים ע"י שיבוש הדפוס כי י"א  | (טז) עובד כוכבים - ואם בירך מתחלה שלא עשני אשה י"א דשוב לא יוכל לברך שלא עשני עכו"ם ושלא עשני עבד כי | (יז) עבד - ועבד שנולד עבד י"א דלא יוכל לברך 
- EN (garbage): (10) On every day that I do not smoke, etc. - and be careful that he does not bl | (16) A star worker - and if he blessed the beginning that I did not

---
**#39 machatzit-hashekel  siman462/seif-007  (HE:13 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman462\seif-007\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman462\seif-007\machatzit-hashekel\en.html`
- HE: (ס"ק ז) המלח כו' דאז כו' ר"ל ובא ליתן טעם מה לי אם מבררו קודם פסח או ימתין עד הפסח: | וצ"ע אם נמצא כו' ר"ל דדין של הש"ע הוא לכתחלה עדיף לבררו אבל נסתפק דיעבד אם מצא בי"ט אם יש לאסור המלח | דאף לדעת האוסרים כו' ר"ל דהא הרבה פוסקים ס"ל דמליחה אינו אוסר
- EN (garbage): (א) And then he came to me with a taste of what I would say if I had been told b | (ב) And if it is found to be called R. D. D.D., it is better to fin

---
**#40 mishnah-berurah  siman472/seif-015  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman472\seif-015\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman472\seif-015\mishnah-berurah\en.html`
- HE: (מו) מצוה ליתן וכו' - אבל אינו מעכב: | (מז) כוסו לפניו - עיין בסימן רע"א סי"ג בבה"ל שצדדנו דקטן אינו צריך לשתות רוב רביעית רק כמלא לוגמיו ד | (מח) מפני וכו' - וכעין שמבואר לקמן בסימן תע"ה (ס"א) [ס"ו] לענין מצה ובדיעבד אינו מעכב אם לא שהה הרבה | (מט) 
- EN (garbage): (א) It is a mitzvah to give, etc. — but it is not indispensable. | (ב) (This is) his cup before him – see the sign of the KGB in the heart that we  | 

---
**#41 beur-hagra  siman480/seif-001  (HE:8 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman480\seif-001\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman480\seif-001\beur-hagra\en.html`
- HE: ס"א מתחיל כו' מתני' שם וגומר כו' ובמתני' הקודמ' אמר עד חלמיש למעינו מים: | ואינו אומר כו'. שם וכגי' רש"י ורשב"ם ת"ר רביעי כו' ושם בתוס' ד"ה ר' יוחנן. ורבינו חיים כו'. אבל ב"י  | ושותיהו. בלא. וכבר. כנ"ל: | ומברך. שם: | ואם. כמ"ש בסי' תע"ב: | ומברך. כ
- EN (garbage): (א) Seif 1 — he begins, etc. — Mishna there and he completes, etc.; and in the p | (ב) And he does not say, etc. — there; and girsa of Rashi and Rashb

---
**#42 rabbi-akiva-eiger  siman498/seif-015  (HE:2 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman498\seif-015\rabbi-akiva-eiger\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman498\seif-015\rabbi-akiva-eiger\en.html`
- HE: פר"ח אות ט' אם נולד תם ובו ביום נפל בו מום. והמהרש"א כ' בשם ת"י דדוקא בנולד עם מומו. אבל בלא"ה לא דד | סעיף ט"ו שראוי לצלות בו ביצה. תמוה לי ממה דפסקי' לקמן סי' תק"ב ס"ג אין סומכים את הקדרה בבקעת. וע' מג
- EN (garbage): Section 15 that it is appropriate to roast an egg in it. I am puzzled by what Da | Section 15 that it is appropriate to roast an egg in it. I am puzzl

---
**#43 magen-avraham  siman502/seif-001  (HE:9 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman502\seif-001\magen-avraham\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman502\seif-001\magen-avraham\en.html`
- HE: אין מוציאין. שהרי אפשר להמציאה בערב, וכ' הראב"ד הטעם מפני שהוא מוליד ואין כאן הכנה כדאיתא בגמ' והמ"מ | מן העפר. צעיפי הבקר (ר"ן): | מן המים. שנותנין זכוכית מלאה מים נגד השמש ונותן בו נעורת של פשתן ותדלק (הר"ן ורש"י): | פחמין. משום דעושה כלי לצורפי זה
- EN (garbage): (1) There is no issuer. After all, it is possible to invent it in the evening, a | (ב) From the dust. The cattle (R) | (ג) From the water. A glass of 

---
**#44 mishnah-berurah  siman529/seif-001  (HE:14 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman529\seif-001\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman529\seif-001\mishnah-berurah\en.html`
- HE: {א} מצות יו"ט לחלקו וכו' - דבחד קרא כתיב עצרת תהיה לכם ובחד קרא כתיב עצרת לה' אלהיך וע"כ אחז"ל דצריך | {ב} ואל יצמצם וכו' - שכל מזונותיו ויציאותיו של אדם קצובים לו מראש השנה חוץ מהוצאות שבתות ויו"ט שאם פ | {ג} וצריך לכבדו - דהיינו רחיצה בחמין בעיו"ט 
- EN (garbage): (1) {a} Yot Mitzvos to be divided, etc. - at the same time recite the commandmen | (2) {2} And let him not reduce, etc. - all of a person's food and e

---
**#45 mishnah-berurah  siman53/seif-025  (HE:13 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman53\seif-025\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman53\seif-025\mishnah-berurah\en.html`
- HE: (עג) חזן מאומנתו - וה"ה לכל התמנות במקום שלא נהגו למנות לזמן ידוע והטעם שלא יחשדום שנמצא בהם פסול: | (עד) בו פסול - בעדים. ואז אין מקבלין אותו עד שישוב בתשובה שלמה בלי ערמה ומרמה אבל בשבועה בעלמא שלא י | (עה) ואין מסלקין - אבל למנותו לכתחלה אפילו בשב
- EN (garbage): (Ag) A cantor from his training - and God for every appointment in a place where | (witness) in which it is invalid - in the witnesses. Then they do n

---
**#46 baer-heitev  siman533/seif-001  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman533\seif-001\baer-heitev\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman533\seif-001\baer-heitev\en.html`
- HE: כיון. דצורך אכילה לא גזרו כיון מלאכתו: | אסור. במקומות שעושין מחיה ביין שרף ששורפין ביורות ויש להם ריוח הרבה יש מקום להתיר וליתן הריוח לעניים | יערים. ואם הערים מותר לאוכלו עיין סי' תק"ג. מ"א: | בשכר. ובחטים ובכל דבר מ"א וכ"כ י"א ע"ש:
- EN (garbage): (א) The bull. The need for eating has not been cut off as a worksheet: | (ב) forbidden. In places that make a living in wine, which burns well, and th

---
**#47 magen-avraham  siman533/seif-001  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman533\seif-001\magen-avraham\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman533\seif-001\magen-avraham\en.html`
- HE: אפי' כיון מלאכתו. דבצורך אכיל' לא גזרו כיון מלאכתו: | לא יערים. נ"ל דאם הערים מותר לאכלו עסי' תק"ג ס"ג: | או שכר ישן. דעת הרמב"ם דאעפ"י שיש לו ישן מערים ושותה מן החדש שאין הערמה זו ניכרת לרואה וכן כל כיוצא  | וה"ה בשכר. ובחטים ובכל דבר:
- EN (garbage): (1) Efi because his craft. Devzorach Akhil' was not decreed because his work: | (ב) Not forests. D. D.C.: The cities are allowed to eat KGB: | (3) or 

---
**#48 beur-hagra  siman544/seif-001  (HE:2 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman544\seif-001\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman544\seif-001\beur-hagra\en.html`
- HE: ס"א ודוקא כו'. כמש"ש ומנין שאם לא יצאו ועשו כו' ובתוספתא פ"ק חומת העיר שנפרצה גודרין אותה גדרה ונפרצ | וה"ה דלשאר כו'. ממש"ש ו' א' דטעמא דיוצאין על הכלאים משום שכר פעולה כו':
- EN (garbage): (1) SA and indeed 20. As a mashsh and from where if they didn't go out and do 20 | (ב) And the “death is.” A. D. D. D. D. D. D. D. D. D. D. D. D. D. D

---
**#49 baer-heitev  siman56/seif-001  (HE:5 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman56\seif-001\baer-heitev\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman56\seif-001\baer-heitev\en.html`
- HE: הקדיש. כתב בספר חסדים מעשה בחסיד א' שראה לחסיד אחד במותו ופניו מוריקות א"ל למה פניך מוריקות א"ל מפני | למברך. מברך בקמץ תחת הבי"ת ופת"ח תחת הרי"ש. לעלם בקמץ תחת העי"ן. של"ה. ולעלמי בו' עי' ב"י והבאר היטב | קדיש. איש"ר עדיף טפי מקדושה ומודים ע"כ אם שמ
- EN (garbage): devoted. He wrote in the Book of Grace that he had seen a single skeleton in his | to the knee. Praying in the Bible and the Bible under the command. 

---
**#50 baer-heitev  siman568/seif-001  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman568\seif-001\baer-heitev\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman568\seif-001\baer-heitev\en.html`
- HE: ושכח. ואפי' הזיד ואכל הרבה לא יאכל יותר. ב"ח מ"א: | כזית. נראה לי דוקא שאכל בפעם אחד אבל אם שהה בנתים והמתין יותר מאכילת פרס אין מצטרפין ובשתיה שיעורו מ | יום אחר. ואם קבל להתענות שני ימים רצופים ושכח ואכל בלילה מתענה שני ימים אחרים. כל בו ב"י סימן ת
- EN (garbage): (א) Forgetting. And I'm not eating much more. In the Gemara: | (ב) as olive. It seems to me that I would eat for one time, but if he was in the | (ג) 

---
**#51 mishnah-berurah  siman568/seif-002  (HE:17 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman568\seif-002\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman568\seif-002\mishnah-berurah\en.html`
- HE: (ט) לדבר מצוה - כגון לברית מילה או סיום מסכת ואפילו הוא אינו שייך בגוה ומכל מקום בכל זה צריך להתענות | (י) לוה ופורע וכו' - וא"צ להתיר הנדר: | (יא) בתחילת הנדר - ר"ל אע"פ שקבלו מאתמול במנחה כיון שקבלה זו לא הוי עתה תחלת הנדר אלא ממה שהוסכם אצל | (יב)
- EN (garbage): (א) (t) To speak for a word or end of a mask, and even it does not belong in the | (ב) (b) Loa and Rashi, and so on, and I shall not allow the vow: | 

---
**#52 mishnah-berurah  siman588/seif-001  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman588\seif-001\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman588\seif-001\mishnah-berurah\en.html`
- HE: (א) ביום ולא בלילה - דכתיב יום תרועה יהיה לכם. ואם נמשך עד בין השמשות יתקע בלי ברכה: | (ב) יצא - דמן הדין משעלה עמוד השחר יממא הוא לכל הדברים אלא לפי שאין הכל בקיאין בו וזמנין דאתי לאקדומ | (ג) לא יצא - דסוף תקיעה בלא תחלה לא מהני ולא מידי וכדלעיל בס
- EN (garbage): (א) (a) On the day and not at night, the day of the day will be yours. If it per | (2) (b) It came out - the blood of judgment from the rising of the 

---
**#53 beur-hagra  siman59/seif-004  (HE:6 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman59\seif-004\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman59\seif-004\beur-hagra\en.html`
- HE: ס"ד ברכת כו'. כ"כ הרא"ש שכן היה נוהג מפני חסרון כוונה ומפסיד כל הברכה כיון שלא שמע אבל בקריאה אין מפ | בנחת כו'. כ"מ מהתוספתא הנ"ל לפי' הג"מ שפי' עונין בקול רם אבל הרא"ש אין מפרש כן שמדבריו מ' שלולי חששא | וימהר כו'. כמש"ל ר"ס נ"א: | ומיהו כו' דברכות
- EN (garbage): A blessing to him.” It was so hard that he was driving against the lack of inten | Put a quaint. Hashem’s Word says that Hashem’s people will not be b

---
**#54 biur-halacha  siman60/seif-004  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman60\seif-004\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman60\seif-004\biur-halacha\en.html`
- HE: י"א שאין מצות צ"כ - בין אם הוא עושה בעצמו ואין מתכוין לצאת בה ידי חובה ובין אם שמע מאחר כגון מגילה ו | וי"א שצריכות כונה - פי' מן התורה כן כתב הרשב"ם להדיא בפסחים ד' קי"ד ע"ב ד"ה אע"ג וכן משמע פשטי' דסוג | לצאת - עיין במ"ב בסק"ט במה שכתב דהמברך עם הק
- EN (garbage): A. There is no such thing as whether it does itself, and does not intend to leav | And he said, “The Lord’s Prayer is the same as the Lord’s Prayer, a

---
**#55 beur-hagra  siman61/seif-012  (HE:2 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman61\seif-012\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman61\seif-012\beur-hagra\en.html`
- HE: ס"יב ה' הוא האלהים כו'. דהרי ב"פ מצינו בפסוק: | י"א כו'. טעמו ממ"ש אמן אמן. אמן מאיש זה אמן מאיש אחר כו' וצ"ע שהרי בנחמיה ח' כתיב שענו ב' פעמים אמן 
- EN (garbage): “The Lord is the gods.” In the verse: | A.S. He was struck by an artist. An artist from this man is an artist from anoth

---
**#56 mishnah-berurah  siman616/seif-001  (HE:3 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman616\seif-001\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman616\seif-001\mishnah-berurah\en.html`
- HE: (א) מותרים בכל אלו - ברחיצה וסיכה ואכילה ושתיה שלא גזרו על הקטנים. ומותר לגדול להאכילו ולהשקותו ולסו | (ב) חוץ מבנעילת הסנדל שאין חוששין כל כך וכו' - ר"ל שאין זה עינוי לקטן אם לא ינעול [ולאפוקי אכילה ושת | (ג) לומר לעובד כוכבים לרחצן וכו' - ר"ל אפילו
- EN (garbage): (א) (a) They are allowed in all of them – in the run and bread and drink that ha | (ב) (b) Apart from the lock of the sand that is not so afraid and s

---
**#57 machatzit-hashekel  siman629/seif-008  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman629\seif-008\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman629\seif-008\machatzit-hashekel\en.html`
- HE: (ס"ק ח) סולם כו' שנקובה. ואין הנקב מעבר לעבר: | שמיה בית קיבול. כמו בסעיף ג' החצים שיש להם בית קיבול אע"ג שעשוים לקבל לתוכן הזכרים וכדאי' שם בגמרא.  | מעבר לעבר. וליכא בית קיבול. של עגלות דנעשים לקבל': | וע' סי' י"ח כצ"ל דקתני נסרים שאין רחבן ד"ט אפי
- EN (garbage): (א) (c) The quaint scale. There is no snoring beyond the past: | (ב) My name is the house of Kiel. As in the the Omnipresent section that they ha | (ג

---
**#58 machatzit-hashekel  siman63/seif-006  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman63\seif-006\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman63\seif-006\machatzit-hashekel\en.html`
- HE: (ס"ק ו) וחוזר כו' שקורא בלחש: וע' בט"ז שכ' עוד תקנה וז"ל ועי"ל דממתין איזה זמן ואח"כ חוז' וקורא כו'  | שיקרא כל הפרש' ב"פ ועמ"ש בסי' ס"א סק"ח: | ומשמע שאם נזכר כו' מדכתב בס"ח שיקרא הפרש' ב"פ משמע שכבר קרא כל הפרש' אפ"ה יקרא שוב כל הפרש' והטעם דא | וכ
- EN (garbage): “And he shall return to the darkness, and he shall return to thee, and he shall  | Read all the commentators in &quot;Ps and Ps&quot; in S.C.: | And i

---
**#59 machatzit-hashekel  siman630/seif-004  (HE:13 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman630\seif-004\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman630\seif-004\machatzit-hashekel\en.html`
- HE: (ס"ק ד) בד"א כו' דברי הרב"י צ"ע. דז"ל הר"ן. דדין זה שכתוב בש"ע למד הרב"י מדברי הר"ן: | סיכך ע"ג מבוי שי"ל לחי הוא דין המוזכר בסעיף ז': | וסיכך כלפי חוץ. ר"ל אותה חצי מבוי שלצד הלחי א"כ הסכך מרוחק מדופן האמצעי חצי מבוי: | ומוכח בגמ כו' מדאמרינן התם דף
- EN (garbage): (א) In the words of the the Omnipresent’s Prayer, the Omnipresent’s Word is the  | (ב) This is the case of the Omnipresent’s Word: | (ג) And then to t

---
**#60 mishnah-berurah  siman637/seif-003  (HE:13 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman637\seif-003\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman637\seif-003\mishnah-berurah\en.html`
- HE: (ז) סוכה גזולה כשרה - אין הלשון מדוקדק כ"כ דהא דרשינן מדכתיב חג הסוכות תעשה לך למעוטי גזולה אלא ר"ל  | (ח) שאין הקרקע נגזלת - דכל המחובר לקרקע הרי הוא כקרקע והרי היא בחזקת בעליה הראשונים וכשאולה דמיא לדי | (ט) שלא מדעתו - שמא בעל הסוכה הוא מקפיד ע"ז 
- EN (garbage): (א) (g) Kosher stolen Sukkah - the language is not as precise as Daha Darshinan  | (ב) (h) that the land is not usurped - a deed attached to the land 

---
**#61 beur-hagra  siman668/seif-002  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman668\seif-002\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman668\seif-002\beur-hagra\en.html`
- HE: ס"ב שחרית כו'. כמו בש"ת בח"ל ועיין בסימן תרס"ט: | וכמקום כו'. מגילה שם: | ומתחילין שהוא זמן המעשרות ועמ"א וכ"כ רש"י שם וכן לפי גירסתנו בגמרא שם מצות כו': | ומכריז כו'. ע"ל סימן קי"ד ס"ב:
- EN (garbage): (1) Sab Shacharit etc. As in Sha'at in Hal and refer to the sign 1559: | (2) And as in that place. Megillah there: | (3) And we begin by saying that i

---
**#62 mishnah-berurah  siman668/seif-002  (HE:8 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman668\seif-002\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman668\seif-002\mishnah-berurah\en.html`
- HE: (ט) וקורין בא' וכו' - הכא לא קאמר קורין ה' כדלקמיה דבא"י שאין עושין רק יום אחד יו"ט הלא אותו היום הו | (י) ובשני בראשית וכו' - ולהכי רגילין להתחיל מיד בראשית שלא יהא פתחון פה לשטן לקטרג לומר כבר סיימו או | (יא) לעשות - ומניחין ס"ת השלישית אצלה ואומרי
- EN (garbage): (1) And Korin 20, etc. - This is not Korin 5, as the the Master says, that we do | (ב) (b) And in the beginning of the day, and so on, it is normal to

---
**#63 mishnah-berurah  siman671/seif-007  (HE:19 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman671\seif-007\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman671\seif-007\mishnah-berurah\en.html`
- HE: (לא) בטפח הסמוך וכו' - שאם ירחיקנה להלן מן הפתח אינו ניכר שבעה"ב הניחו שם: | (לב) לפתח - בין אם ההנחה הוא על פתח הבית או על פתח החצר: | (לג) כדי שתהא וכו' - ויהיה מסובב במצות מיהו בדיעבד אם הניח נר חנוכה מימין יצא: | (לד) ואם אין וכו' מימין - דכל מיד
- EN (garbage): (א) (No) in the next cult, and so on, that if the moon is bought below from the  | (ב) (heart) to develop – whether the assumption is on the doorstep 

---
**#64 beur-hagra  siman691/seif-002  (HE:15 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman691\seif-002\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman691\seif-002\beur-hagra\en.html`
- HE: ס"ב או על. זהו דיפתרא כמ"ש בגמרא שם: | או שכתב. גיטין מ"ה ב': | ודינה כספר תורה כו'. מרדכי והגהת מיימוני בשם רבינו תם וכמו שאמרו הר"ן בשם הרמב"ן דמגזירה שוה דכתיבה  | לענין היקף גויל. מנחות כ"ט א' ל"ד א': | וחטוטרות חתי"ן. שם כ"ט ב': | ותליית ההי"ן. 
- EN (garbage): (א) B or on. It’s a call in the final name: | (ב) Or written. Justin B: | (ג) As a book of Torah. Mordechai and the Magistrate are taught in the name 

---
**#65 beer-hagolah  siman696/seif-003  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman696\seif-003\beer-hagolah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman696\seif-003\beer-hagolah\en.html`
- HE: מהא דתני רב יוסף שמחה מלמד שאסורים בהספד שם בגמ' | מימרא דרבא מהא דמגילת תענית שם | משנה סוף מ"ק | ודין ת"ח בפניו שמענות ומקוננות כדרכן בחול בי"ד סי' ת"א ע"ש
- EN (garbage): (א) From the great faith of Joseph, joy teaches that they are not allowed to be  | (ב) M.M. M. M. M. M. M. M. M. M. M. M. M.D. M.D. A.D. I.D.D. A.D. A

---
**#66 baer-heitev  siman75/seif-001  (HE:4 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman75\seif-001\baer-heitev\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman75\seif-001\baer-heitev\en.html`
- HE: באשה. אם לבושה דק ומתחזי בשר מתוכה אסור. ה"ג מ"א: | כנגדה. הר"י מקיל דאינו אסור אלא כשמסתכל בה אבל אם בראיה בעלמא מותר עיין ב"י ולא נהירא אלא בכל ענין א | מטפח. ב"ח חולק וס"ל דאפילו באשה אחרת נמי אין איסור אלא דוקא בטפח אבל פחות מטפח שרי ע"ש. לכאורה 
- EN (garbage): with fire. If you wear a thin dress and stick in the flesh, it is forbidden. The | against her. The mountain is forbidden only when it is eaten, but i

---
**#67 mishnah-berurah  siman83/seif-001  (HE:5 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman83\seif-001\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman83\seif-001\mishnah-berurah\en.html`
- HE: (א) אסור לקרות - ר"ל לפניו כמלא עיניו ולאחריו ד"א ואם יש שם ריח רע צריך ד"א ממקום שכלה הריח: | (ב) פינו ממנו - ואיסורו מן התורה כיון שזה המקום מכבר דרכו להיות בו צואה אין זה מחניך קדוש ע"כ אם נסת | (ג) כשאין לו מחיצות - כמו אחורי הגדר או אחורי הבתים.
- EN (garbage): (a) It is forbidden to happen before him as full of his eyes and after him, and  | (b) It is not from him, and it is forbidden from the Torah because 

---
**#68 baer-heitev  siman85/seif-002  (HE:6 segs)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman85\seif-002\baer-heitev\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman85\seif-002\baer-heitev\en.html`
- HE: אסור. לכן יחשוב שם חשבונות שלא יבא לידי הרהור. ס"ח מ"א. ובשבת יחשוב בבנינים וציורים של"ה. וע"ל סי' ס | בלה"ק. ומדת חסידות להחמיר. ס"ח מ"א: | נאמן. הראב"ד אוסר ברחום. וכ' הב"ח ויש להחמיר וכ"פ הפר"ח. מיהו בלשון לע"ז לכ"ע שרי. ודוקא שלום או רחו | נמחקים
- EN (garbage): Forbidden. Therefore one should think there of accounts so he does not come to c | Bella. And the religion of adversity worsens. A.D.: | loyal. Harab 

---

### Verification
After all entries: report `Fixed corpus: N | Fixed TXT: M | Failed: K`
For each fixed file confirm: en.html segment count === he.html segment count, no garbage patterns in en.html.