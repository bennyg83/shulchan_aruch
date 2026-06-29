## Codex Prompt B — OC Corpus Segment Mismatch Fixes (156 entries)

### Task
For each entry below, ensure en.html has exactly the same number of <br /> segments as he.html.

**Algorithm per entry:**
1. Read he.html — split on `/<br\s*\/?>/ ` and filter non-empty → heSegs array (N segments)
2. Read en.html — split same way → enSegs array (M segments)
3. If N === M: skip (already aligned)
4. If N !== M: retranslate from Hebrew — produce exactly N English segments, one per Hebrew segment
5. Join with `<br />\n` and write back to en.html (UTF-8, no BOM)

**Translation rules:**
- Halachic/Rabbinic terms stay in Hebrew or transliterated: Magen Avraham, Taz, Bach, Gra, Rama, seif katan (sk), Mishna Berurah, etc.
- Abbreviations: expand contextually — sk = seif katan, MA = Magen Avraham, BH = Bach, RL = meaning/i.e., MB = Mishna Berurah
- Do not add content not in the Hebrew
- Segment N in EN must correspond to segment N in HE (same topical unit)
- If HE has fewer segs than EN: consolidate EN segments to match HE count
- If HE has more segs than EN: split/expand EN to match HE count

**File write:** `fs.writeFileSync(path, content, {encoding:"utf8"})` — plain UTF-8, no BOM

### Entry List (156 entries)

Base path: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\`

---
**#1 biur-halacha  siman1/seif-001  (HE:5 → need EN:5, currently EN:3)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman1\seif-001\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman1\seif-001\biur-halacha\en.html`
- HE: שיהא הוא מעורר השחר - נכון מאד ליזהר לומר קודם כל ג' תפלות הודאת היה"ר המבואר בי | הוא כלל גדול בתורה וכו' - הרוצה לקיים שויתי כראוי יזדרז לקיים מה שנכתוב בשם ספר  | א) להאמין שיש אלוה אחד בעולם שהמצי
- EN: May he be the waker of the dawn - it is very correct to be c | It is a great rule in the Torah, etc. - the one who wants

---
**#2 levushei-serad  siman1/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman1\seif-001\levushei-serad\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman1\seif-001\levushei-serad\en.html`
- HE: ט"ז סק"ב) אלא הוא זריזות בפ"ע. כי יתגבר כארי הכוונה שמיד בניעורו משנתו יקום: | ויהא הוא מעורר השחר הכוונה שירגיל במאכלים קלים וכדומה שלא יישן הרבה וינער קודם ה
- EN: 16 S. K. B) Rather, it is quickness in the P.E. Because he w

---
**#3 yad-ephraim  siman1/seif-008  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman1\seif-008\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman1\seif-008\yad-ephraim\en.html`
- HE: (שם) אא"כ בשנטמא וא"כ לא מיקרי נדבה לענ"ד יש לתמוה דבין בחטאת ובין באשם מ"מ השתא | ובמה שהקשה המג"א דהא חטאת בעי ידיעה בתחלה ואא"ז בת"ש כתב דאשם נמי בעי ידיעה בתחל
- EN: (ibid.) “If not when he became impure” — and if so it is not

---
**#4 yad-ephraim  siman1/seif-009  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman1\seif-009\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman1\seif-009\yad-ephraim\en.html`
- HE: ס"ק י"ב יש מגיהים ובתפלת המנחה כ"ע מודים דתמיד קודם לקטורת כדאיתא ביומא. אבל פרש | ומה שצ"ע בזה לפע"ד כיון דהמג"א וע"ש מיירי מן המנחה שהיו מקריבין עם תמיד של שחר א
- EN: Section 12 — There are emendators who, in the Minchah prayer

---
**#5 yad-ephraim  siman11/seif-004  (HE:2 → need EN:2, currently EN:3)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman11\seif-004\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman11\seif-004\yad-ephraim\en.html`
- HE: סעיף ד' ברמ"א היינו החלק) נראה דר"ל דלא תימא דכאן נמי פירוש גדיל כמו בעלמא דהיינ | (בט"ז ס"ק ה) היה קודם הגזיל' שטוה כצ"ל:
- EN: Seif 4 in Rama — this means the portion). It appears he mean | Seif 4 in Rama — this means the portion). It appears he m

---
**#6 biur-halacha  siman117/seif-005  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman117\seif-005\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman117\seif-005\biur-halacha\en.html`
- HE: אם לא שאל מטר וכו' - לכאורה נראה דה"ה אם חיסר בשאר ברכה דבר שהוא מעיקר הברכה [כג | ודע דלדעת הגר"א לעיל בסימן נ"ט ס"א דס"ל דהעיקר תלוי בחתימה יצא ואפילו השלמה א"צ  | כעקורים - עי' מ"ב כ"כ מ"א בסי' תכ"
- EN: If he did not ask for rain, etc. — It would seem plainly tha | Like uprooted [feet] — See Mishna Berurah; so too Magen A

---
**#7 ateret-zekenim  siman12/seif-001  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman12\seif-001\ateret-zekenim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman12\seif-001\ateret-zekenim\en.html`
- HE: שני ראשים שיפסקו משני צדדים שא' לא נשתייר כדי עניבה ובשני נשתייר כדי עניב' כשר מ | ולפי מה שאנו נוהגים לדקדק בעת עשיית הציצית לתת סי' בד' ראשים כו' ה"ה אם נפסקו כל | ואל יחתוך ראשי חוטין בסכין משום שנ
- EN: The comment states, in substance: שני ראשים שיפסקו משני צדדי | The comment states, in substance: ולפי מה שאנו נוהגים לדק

---
**#8 machatzit-hashekel  siman128/seif-001  (HE:9 → need EN:9, currently EN:8)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-001\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-001\machatzit-hashekel\en.html`
- HE: כ' במ"א כ' בא"ע כו' וצ"ע דהא הרמ"ך שממנו נובע דין רמ"א שם: דמאי איכפת לן דהא תנן | ובחמ"ח שם ובב"ש שם תי' דרמ"א הוכיח דע"כ להרמ"ך נאמן אפי' לישא כפיו דהא כ' הרמ"ך  | (סק"א) לא ידע ר"י פי' דאר"י (בשבת 
- EN: 20 Bma 20 Ba Ae 20 and Tsa Daha the Ramach from which comes  | And in the Hamach there and in the Bash Shem 10 Dramaa pr

---
**#9 turei-zahav  siman128/seif-003  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-003\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-003\turei-zahav\en.html`
- HE: א' מהדברים. קשה דמשמע אם יש בו אז אינו עובר והא אפי' איסור יש כדלקמן סי' זה ונ"ל | (ג) והלוי יצוק מים. כתב מו"ח ז"ל בשם מחזור ישן בשם מהר"י מולין דאם אין שם לוי אם
- EN: A. of the things. It is difficult, meaning, if there is in i

---
**#10 beur-hagra  siman128/seif-005  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-005\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-005\beur-hagra\en.html`
- HE: ס"ה אבל כו'. דליכא טעמא הנ"ל: | וי"מ כו'. משום ל"פ כמו סנדלים שלנו:
- EN: V.M., etc. Because L.P. like our sandals:

---
**#11 machatzit-hashekel  siman128/seif-005  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-005\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-005\machatzit-hashekel\en.html`
- HE: (ס"ק ה) ויש כו' וקשורים כו' דזה מתקנת ריב"ז שלא יעלו במנעלי' שמא יפסיק רצוע' מן  | ועמ"ש סי' תקנ"ד דלענין ט"ב אפי' מחופה עור דהתם משום צער וכל מידי דמגין על הרגל א
- EN: And Amash C. 1944 Delanin 12 Efi' Covered with a leather cov

---
**#12 mishnah-berurah  siman128/seif-005  (HE:4 → need EN:4, currently EN:3)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-005\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-005\mishnah-berurah\en.html`
- HE: (טו) במנעלים - שמא יפסק לו רצועה וגנאי הוא לו ומתלוצצים עליו כשסנדלו מותרת ויקשר | (טז) אבל בבתי שוקים - הוא מנעלים ארוכים המגיעים עד ארכובות הרגל היינו סמוך לשוק  | (יז) אם הם של עור - טעמם דבכלל סנד
- EN: (16) But in the houses of the market - he wears long shoes t | (17) If they are made of leather - their taste is general

---
**#13 mishnah-berurah  siman128/seif-006  (HE:5 → need EN:5, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-006\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-006\mishnah-berurah\en.html`
- HE: (יט) אע"פ שנטלו - עיקר הנטילה אסמכו רבנן אקראי שנאמר שאו ידיכם קדש וברכו את ה' כ | (כ) חוזרים ונוטלים וכו' - ואם אין לו מים כתבו האחרונים דנוכל לסמוך על שיטת הרמב" | (כא) עד הפרק - ככהן המקדש ידיו לעב
- EN: (19) According to Shantelo - the main part of the laying on  | (c) Returning and taking, etc. - and if he has no water, 

---
**#14 mishnah-berurah  siman128/seif-008  (HE:5 → need EN:5, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-008\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-008\mishnah-berurah\en.html`
- HE: (כה) כשמתחיל ש"צ וכו' - היינו לכתחלה יזהר לעקור בהתחלת הש"ץ רצה אבל אם לא עקר עד | (כו) רצה כל כהן וכו' - שנאמר וישא אהרן את ידיו אל העם ויברכם ואח"כ וירד מעשות הח | (כז) עד שיסיים ש"ץ רצה - לאו דוקא 
- EN: (Thus) when the shetz begins, etc. - we mean at the beginnin | (20) Every priest wanted, etc. - when it is said that Aar

---
**#15 beur-hagra  siman128/seif-011  (HE:4 → need EN:4, currently EN:3)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-011\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-011\beur-hagra\en.html`
- HE: י"א כו'. תוס' דברכות שם בשם ר"י וכ"כ רמ"מ אבל אח"כ חזר בו ועב"י: | ומחזירין כו'. ל"ח א' ל"ט א' ב' מ' א' ותוספתא דמגילה הביאו רי"ף ורא"ש בפ"ג: | ואם כו'. גמ' שם ל"ח א': | אלא כו'. רש"י ל"ט ב' ותוס' שם 
- EN: 11 20. Thos. Davrakot there in the name of Rabbi and 22 Ramm | and if etc. Gm. Ibid. 18:1: | but etc. Rashi 39 2 and Tho

---
**#16 machatzit-hashekel  siman128/seif-011  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-011\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-011\machatzit-hashekel\en.html`
- HE: (ס"ק יא) כשעוקרים כו' והטור והרמב"ם כתבו לשון הגמ' ואעפ"כ הרמב"ם י"ל דס"ל כרש"י  | שצ"ל תחלה מודים כו' כדי שלא יצטרך להפסיק באמירת מודים באמצע התפלה א"כ ע"כ צ"ל יה
- EN: Shach'al will start thanksgiving, etc., so that he does not 

---
**#17 mishnah-berurah  siman128/seif-012  (HE:5 → need EN:5, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-012\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-012\mishnah-berurah\en.html`
- HE: (מב) מגביהים ידיהם וכו' - דגמרינן ברכה זו ממה דכתיב וישא אהרן את ידיו אל העם ויב | (מג) יד ימנית קצת - מ"מ צריך ליזהר שיניח גודל הימין על גודל השמאל שלא יתפרדו כדי | (מד) וחולקים אצבעותיהם - דאיתא בתנ
- EN: (MB) They lift up their hands, etc. - This blessing is model | (Mg) right hand a little - mm. One should be careful that

---
**#18 mishnah-berurah  siman128/seif-014  (HE:4 → need EN:4, currently EN:3)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-014\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-014\mishnah-berurah\en.html`
- HE: (נ) אין מברכין וכו' - וכ"ז הוא מן התורה דילפינן כ"ז מקראי בלשה"ק דכתיב כה תברכו  | (נא) ובעמידה - היינו שיהא הכהנים בעמידה אבל הצבור רשאין לישב רק שיהיו פנים כנגד  | (נב) ובנשיאת כפים - ומי שידיו מרתת
- EN: (Na) And standing - we mean that the priests should be stand | (Nav) And in carrying the palms - and the one whose hands

---
**#19 beer-hagolah  siman128/seif-016  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-016\beer-hagolah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-016\beer-hagolah\en.html`
- HE: שם | כתבי הר"ר ישראל סי' ק"ט
- EN: name

---
**#20 mishnah-berurah  siman128/seif-017  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-017\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-017\mishnah-berurah\en.html`
- HE: (סא) בין בתחלה בין בסוף וכו' - פי' בתחלה כשעולין לדוכן ופניהם כלפי ההיכל שהוא במ | (סב) המטונפים - נראה דה"ק סתם מנעלים כמטונפים הם [א"ר ופמ"ג]:
- EN: (Sa) Between the beginning and the end, etc. - F. At the beg

---
**#21 mishnah-berurah  siman128/seif-020  (HE:10 → need EN:10, currently EN:9)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-020\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-020\mishnah-berurah\en.html`
- HE: (עב) לא ישא - שמא לא יוכל לכוין לחזור לשים שלום שדעתו מטורפת מאימת הצבור ואפילו  | (עג) את כפיו - אלא הוא עומד ואחר שאינו כהן מקרא כמ"ש סכ"ב: | (עד) אבל אם א"ל וכו' - ומיירי כשאמרו לו בברכת רצה או קוד
- EN: (ab) He will not bear it - lest he be able to return to peac | (Ag) his palms - but he is standing and another who is no

---
**#22 baer-heitev  siman128/seif-022  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-022\baer-heitev\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-022\baer-heitev\en.html`
- HE: ישראל. פי' דלכתחלה משתדלין שיהא הש"ץ ישראל. מ"א בשם הכנה"ג: | ושותק. פי' עד התחלת שים שלום ונראה דכאן לא עדיף טפי שיסיים המקרא ש"ש דדוקא לעיל 
- EN: Israel. P. Dalkathala from interceding that Sha'at Israel be

---
**#23 mishnah-berurah  siman128/seif-025  (HE:5 → need EN:5, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-025\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-025\mishnah-berurah\en.html`
- HE: (צז) כולם - היינו לבד מש"ץ שאף שהוא כהן הרי קיי"ל לעיל בס"כ דש"ץ כהן ויש שם כהני | (צח) לאחיהם שבשדות - ולא קאמר לנשים וטף דלא חשיבי לברכם לחודייהו אבל גם הם בכלל  | (צט) הנשים והטף - ר"ל אם ישנם שם ו
- EN: (16) All of them - we were alone in the Shatz, even if he is | (Tsah) To their brothers in the fields - and there was no

---
**#24 ateret-zekenim  siman128/seif-043  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-043\ateret-zekenim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman128\seif-043\ateret-zekenim\en.html`
- HE: יצא מב"ה וה"ה אם אין שם כהן אלא הוא ג"כ לא ישא את כפיו רק שאינו צריך אז לצאת מב" | ואומרים רבון בשעה שמאריכים בניגון התיבות ויש מי שכתב שלא יאמר כל אחד רבון הנ"ל ב
- EN: He left the house of study — and the same if there is no koh

---
**#25 yad-ephraim  siman13/seif-002  (HE:2 → need EN:2, currently EN:3)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman13\seif-002\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman13\seif-002\yad-ephraim\en.html`
- HE: סעיף ב' ברמ"א) בד"ה ותשובת הרמב"ן הציון מתשוב' הרמב"ן והרמב"ם קאי על דברי המחבר  | (בט"ז ס"ק ה) על הלבישה בשבת אבל כצ"ל:
- EN: Seif 2 in Rama. In the words "and Ramban's responsum" cited  | Seif 2 in Rama. In the words "and Ramban's responsum" cit

---
**#26 biur-halacha  siman132/seif-001  (HE:11 → need EN:11, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman132\seif-001\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman132\seif-001\biur-halacha\en.html`
- HE: קונטרס מאמר קדישין בו יבואר דיני קדיש בקיצור ומלוקט מלבוש ומגן אברהם וכנסת יחזקא | אין מונין השבעה והשלשים כי אם מיום קבורתו אף שעבר זמן רב בין מיתה לקבורה. ואין מ | פוסקין לומר קדיש חדש קודם היא"צ וי
- EN: Pamphlet — article on kaddish, in which the laws of kaddish 

---
**#27 eliyah-rabbah  siman133/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman133\seif-001\eliyah-rabbah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman133\seif-001\eliyah-rabbah\en.html`
- HE: הלבוש מביא כאן תשובת מהר"מ מינץ בענין קדישים וכיון שהובא גם כן במנהגים לא נצרכתי | [א] מכל מקום פעם ראשונה וכו'. כתב הש"ך ביו"ד סימן שע"ו וזה לשונו, דהא דיש לו לאו
- EN: The Levush brings here a responsum of Maharam Mintz regardin

---
**#28 mishnah-berurah  siman135/seif-001  (HE:4 → need EN:4, currently EN:3)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman135\seif-001\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman135\seif-001\mishnah-berurah\en.html`
- HE: כתב הרמב"ם פי"ב מהלכות תפלה משה רבינו תיקן להם לישראל שיהו קורין בתורה ברבים בשב | (א) בשני ובחמישי - בשחרית ואף דבדיעבד כל היום זמנה מכל מקום לכתחלה מצוה להקדים: | (ב) ואין מוסיפין עליהם - משום בטול 
- EN: Rambam wrote chapter 12 of Laws of Prayer: Moses our teacher | (2) And we do not add to them — because of nullification 

---
**#29 ateret-zekenim  siman135/seif-002  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman135\seif-002\ateret-zekenim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman135\seif-002\ateret-zekenim\en.html`
- HE: אם בטלו שבת אח' כו'. דוקא באם לא קראו בשבת העבר כ"א סדרה אחת אז קורין לשבת הבאה  | אם הס"ת פתוח והכהן קורא ק"ש וכן אם התפלל נמי דינא הכי ואם יש שם כהנים אחרים מותר
- EN: If they canceled Shabbat, etc. Indeed, if they did not recit

---
**#30 biur-halacha  siman153/seif-009  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman153\seif-009\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman153\seif-009\biur-halacha\en.html`
- HE: ואם מכרוהו זט"ה וכו' יעשה הלוקח אפילו אלו ד' דברים - כן הוא דעת הרמב"ם והרא"ש ונ | היוצא מדברינו דמסתברא דכמו דפסקי' בסי' כ"א לענין ציצית ובסי' תרס"ד לענין הושענא 
- EN: And if they sell it 65, etc., the taker will do even these 4

---
**#31 levushei-serad  siman154/seif-006  (HE:1 → need EN:1, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman154\seif-006\levushei-serad\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman154\seif-006\levushei-serad\en.html`
- HE: ס"ק ט' לשורפן עיין כנ"י סי' ל"ז:
- EN: C. T. To the reader, see the same as C.C | Section V in the Gemara and the Propulsion. The answer is:

---
**#32 turei-zahav  siman159/seif-007  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman159\seif-007\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman159\seif-007\turei-zahav\en.html`
- HE: חשיב ורש"ל פ' כ"ה כ' על זה ול"נ נהי דחשיב כלי לטומאה מ"מ לנט"י דבעינן כלי חשוב ש | (ז) כגון ששפך עליה רביעית כו'. נראה פשוט שזהו בענין שהמים אינם מקובצים תוך פיסת 
- EN: It is considered — and Rashal chapter 25 wrote on this: and 

---
**#33 ateret-zekenim  siman16/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman16\seif-001\ateret-zekenim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman16\seif-001\ateret-zekenim\en.html`
- HE: האריך הרב בעל עטרת זקנים הרבה בפילפולו תקצר הנייר מלהכיל ולכן הוכרחתי לקצר באומר | שיעור מה שנהגו רוב ההמון ללבוש ציצית במלבוש קטן ככף איש דאפי' קטן בן ה' אינו מכס
- EN: The long rabbi with a crown of beards in the filpolo would b

---
**#34 ateret-zekenim  siman167/seif-016  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman167\seif-016\ateret-zekenim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman167\seif-016\ateret-zekenim\en.html`
- HE: אין הבוצע רשאי כו'. כ"כ הטור וכן פירש"י בגמרא דקי"ל שצריך שתכלה הברכה קודם הבציע | ונהגו שלא להאכיל לבהמה וחיה ועוף ולא לעכו"ם מחתיכה שנגע בה חתיכת המוציא (כל בו ב
- EN: The donee is not allowed, etc. per the column, as well as a 

---
**#35 beur-hagra  siman168/seif-013  (HE:7 → need EN:7, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman168\seif-013\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman168\seif-013\beur-hagra\en.html`
- HE: סי"ג אם בשלה כו' אפי' שיש עליה כו'. לאפוקי סברא שניה שמחייב אם בשלה ודוקא שי"ל ת | ויש חולקים. הוא דעת ר"ת דהא דפליגי ר"י ור"ל בפסחים ל"ז א' דוקא בבלילתו רכה כמו ס | ונהגו להקל ר"ל כס' ראשונה דספיקא ד
- EN: (א) Seif 13: if it was boiled etc. even if foam is on it etc | (2) And some disagree. This is the view of Rabbenu Tam, f

---
**#36 mishnah-berurah  siman177/seif-005  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman177\seif-005\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman177\seif-005\mishnah-berurah\en.html`
- HE: (כ) שדרכן לבוא וכו' - ר"ל וגם אוכלן עם הפת כיון שהוא מבית אחרים שבודאי לא היה דע | (כא) על כל מה וכו' - והיינו כשהביאו לו דברים הבאים מחמת הסעודה וכנ"ל בס"א דאלו א | קיצור דיני פירות הבאים בתוך הסעודה
- EN: (b) So you should come and so on, and I will also eat with t | (2) About everything, etc. - And we were when they brough

---
**#37 shaarei-teshuvah  siman189/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman189\seif-001\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman189\seif-001\shaarei-teshuvah\en.html`
- HE: (•) (בש"ע) הוא הטיב לנו הוא מטיב לנו הוא ייטיב לנו כן הנוסחא העיקרית לאפוקי האומ | (א) האבל עין בה"ט ועיין באבן העוזר שחולק על המג"א וס"ל דא"ל בני ברית וכמ"ש ג"כ ב
- EN: (in Shulchan Aruch) He has done good to us, He does good to 

---
**#38 biur-halacha  siman208/seif-017  (HE:5 → need EN:5, currently EN:8)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman208\seif-017\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman208\seif-017\biur-halacha\en.html`
- HE: אבל ביין וכו' - דע דביין יש כמה דעות בין הראשונים ויש בענין זה כמה חלוקים ונעתיק | א) אם שתה יין שלא בתוך הסעודה ובירך עליו בהמ"ז נפטר בדיעבד דכן הוא דעת רבינו יונ | ברכת שלשה פוטרתו - כ"כ הפוסקים מהא
- EN: But regarding wine, etc. Know that regarding wine there are  | a) If he drank wine not within the meal and blessed on it

---
**#39 turei-zahav  siman242/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman242\seif-001\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman242\seif-001\turei-zahav\en.html`
- HE: בטור הביא גמרא דכל כתבי כל המשמר שבת כהלכתו אפי' עע"ז כאנוש מוחלין לו איכא למידק | (א) אפי' מי שצריך לאחרים. בטור כתב וז"ל והא דאר"ע עשה שבתך חול ואל תצטרך לבריו' 
- EN: In the Tur he brought the Gemara of "All writings" — "whoeve

---
**#40 eliyah-rabbah  siman25/seif-002  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman25\seif-002\eliyah-rabbah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman25\seif-002\eliyah-rabbah\en.html`
- HE: [ב] יניח תפילין וכו'. כתב בספר החינוך בפרשת ואתחנן [מצוה תכא] לפי שהאדם [בהיותו  | [ב*] גרסינן [ברכות יד ע"ב] כל הקורא ק"ש בלא תפלין כאלו מעיד עדות שקר בעצמו. וכתב
- EN: [b] He will put on tefillin, etc. He wrote in the Book of Ed

---
**#41 yad-ephraim  siman251/seif-002  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman251\seif-002\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman251\seif-002\yad-ephraim\en.html`
- HE: סק"ה ונ"ל טעם ההיתר כו'. וא"כ כל המלאכות המותרין בח"ה כו'. נ"ל ביאור דבריו שהב"י | דרך קצרה בפירוש דברי המג"א וקצת באופן אחר ממ"ש לעיל הנה הב"י כת' שמנהג להתיר אף 
- EN: Seif kaf — and it appears the reason for the leniency, etc. 

---
**#42 yad-ephraim  siman252/seif-006  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman252\seif-006\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman252\seif-006\yad-ephraim\en.html`
- HE: ס"ק ט"ו דכ"ע ס"ל דאין מביאין כו' ר"ל דהב"י ס"ל דהך דאין מביאין מיירי בנעשה בחוה" | ומ"ש אם לא בחנוני כו' עיין מ"ש בס"ק שלפני זה:
- EN: Sect 15 Dacha Sal Dain brings as RL Dahabi Sal Dahach Dain b

---
**#43 magen-avraham  siman262/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman262\seif-001\magen-avraham\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman262\seif-001\magen-avraham\en.html`
- HE: יפנה קורי עכביש מהבית (ר"ח ע"ה), האר"י הקפיד מאד לאכול על השלחן של ד' רגלים דוגמ | ויציע המטות. שיושבין עליהם, ז"ל ד"מ כ' מהרי"ו בפסקיו מותר לזרוק דבר חוץ לשלחן וא
- EN: Turning spiders out of the house, Hari was very careful to e

---
**#44 shaarei-teshuvah  siman267/seif-002  (HE:3 → need EN:3, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman267\seif-002\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman267\seif-002\shaarei-teshuvah\en.html`
- HE: (בש"ע) בתפילת המנחה כו' כתב מח"ב בשם תלמידי האר"י ז"ל שאף הנוהגים להניח תפילין ב | (א) | ולאכול מיד עבה"ט ומ"ש ועכ"פ הנוהגים כו' עיין ביד אפרים ותמצא פירוש אמיתי בדברי ה
- EN: (B.S.A.) In the offertory prayer 20, the Rabbi wrote on beha

---
**#45 magen-avraham  siman280/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman280\seif-001\magen-avraham\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman280\seif-001\magen-avraham\en.html`
- HE: מצוה לאכול שום בע"ש או בלילי שבת (יש"ש ב"ק פ"ז הסמ"ג) וה"ה שאר דברים המרבים זרע  | כתב הגאון בספר ברכת הזבח שאלני הרב מהר"ר יאסקי יצ"ו אב"ד דק"ק ואדיסליב מצינו לחכ
- EN: "It is written to eat garlic in the morning or in the night 

---
**#46 shaarei-teshuvah  siman286/seif-001  (HE:3 → need EN:3, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman286\seif-001\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman286\seif-001\shaarei-teshuvah\en.html`
- HE: (•) (בש"ע ס"ב) זמן תפלת המוספין עיין במג"א סי' רל"ג כשמפסיק במכירות המצות צריך ל | (•) (הגה ס"ב) חוזר הש"ץ התפילה כו' הנוהגים לומר קדושת כתר בשבת יאמרו עם עמך ישרא | (א) לטעום עבה"ט ועיין בא"ר דאם אין
- EN: (•) (Basha sab) The time of the mospin prayer Refer to Maga 

---
**#47 turei-zahav  siman286/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman286\seif-001\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman286\seif-001\turei-zahav\en.html`
- HE: בטור כתוב ובספרד נוהגים לו' משנת פרק א' ובסי' רצ"ד כ' שבספרד אומרים פרקי אבות בש | (א) קודם תפל' השחר יצא. לפי שבמוסף נאמר בבוקר אלא דבמס' יומא יליף מקרא יתירה דנס
- EN: In the column it is written and in Spain it is customary for

---
**#48 shaarei-teshuvah  siman290/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman290\seif-001\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman290\seif-001\shaarei-teshuvah\en.html`
- HE: (•) (בש"ע סעיף א') ירבה בפירות כו' עיין באשל אברהם מתשו' מהר"מ גלאנטי ובבר"י סי' | (א) צהרים עבה"ט וע' בא"ר בשם ס"ח שאין לומר כן אפי' חפץ לכתוב תורה במ"ש אלא יאמר 
- EN: (•) (In Shulchan Aruch seif 1) One should increase in fruits

---
**#49 mechaber  siman295/seif-001  (HE:3 → need EN:3, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman295\seif-001\mechaber\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman295\seif-001\mechaber\en.html`
- HE: הבדלה שעושה ש"ץ. ובו סעיף אחד: | הגה ואומרים ויהי נועם וסדר קדושה באריכות כדי לאחר סדר קדושה שאז חוזרים רשעים לגי | מבדיל שליח צבור כדי להוציא מי שאין לו יין: הגה ונהגו לומר ולהזכיר אליהו הנביא במ
- EN: 1. The Havdalah Recited by the Sheliach Tzibbur. RAMA: And w

---
**#50 baer-heitev  siman301/seif-002  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-002\baer-heitev\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-002\baer-heitev\en.html`
- HE: מותר. אפי' לכתחילה. מ"א: | לטייל. אפי' כוונתו להתחמם אבל לרוץ אסור אם עושה לרפואה. מ"א:
- EN: to travel His intention is to warm up, but running is not al

---
**#51 beur-hagra  siman301/seif-004  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-004\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-004\beur-hagra\en.html`
- HE: ס"ד לדבר מצוה. דוקא מדבעי שם רב אצל תלמיד מאי ופ' לחומרא: | ובלבד כו' כדי כו'. הרא"ש והר"ן שם הקשו מהנ"ל ס"ב ואסור לעבור כו' ותי' כיון שלא ה
- EN: SAD to speak a mitzvah. Indeed, from the Rabbi Shem Rabbi in

---
**#52 beur-hagra  siman301/seif-007  (HE:10 → need EN:10, currently EN:9)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-007\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-007\beur-hagra\en.html`
- HE: ס"ז כל היוצא בדבר שאינו תכשיט. ע' רש"י ריש פ"ו וגמרא שם נ"ט ב' במאי קמפלגי כו' ו | ואינו דרך מלבוש. ס' א' במתניתין אע"ג שאינן תכשיטין לרבנן שם ס"ג א וע' רש"י במתני | והוציאו בדרך. ס"ב א' ומתניתין צ"ב 
- EN: Sz7 Everything that goes out in a thing that is not a piece  | and is not a way of clothing. S. A. in Matnitin A'ag that

---
**#53 beer-hagolah  siman301/seif-011  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-011\beer-hagolah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-011\beer-hagolah\en.html`
- HE: טור לדעת יש מפרשים הירושלמי כך והביאו הרא"ש | שם בשם ר"מ וכן כ' הרא"ש וסמ"ג וסמ"ק וש"פ
- EN: There in the name of Ram, as well as 20 Harash and Samag and

---
**#54 beer-hagolah  siman301/seif-016  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-016\beer-hagolah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-016\beer-hagolah\en.html`
- HE: שם במשנה ס"ו וכפי פירוש רש"י | תוספות והרא"ש סי"ו וכן משמע מדברי רש"י שם | שם במשנה וכפי פירוש רש"י
- EN: Additions and Rashi Siu as well as the meaning of Rashi's wo | There in the Mishnah and as interpreted by Rashi

---
**#55 mishnah-berurah  siman301/seif-017  (HE:5 → need EN:5, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-017\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-017\mishnah-berurah\en.html`
- HE: (סג) בלא מקל מותר - דכיון דאינו יכול לילך כלל בלא מקל הו"ל כמנעל דידיה: | (סד) אבל אם אפשר וכו' - וכן זקן ההולך בביתו בלא מקל וכשיוצא לחוץ נשען על מקלו מח | (סה) ואינו נוטלו וכו' - וכשאדם הולך במקום ש
- EN: (Seg) Without a stick is allowed - Dachion Dainu can walk at | (brace) But if possible, etc. - as well as an old man who

---
**#56 beer-hagolah  siman301/seif-023  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-023\beer-hagolah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-023\beer-hagolah\en.html`
- HE: שבת ס"ו | שם בשלטי גבורים כת' והוא שתפרן במלבוש ב' תכיפות דהויא כאלו ארגם וכת' טעם ע"ז עיי | שם ס"ז כרבא
- EN: Shabbat | Name SZ Karba

---
**#57 mishnah-berurah  siman301/seif-023  (HE:7 → need EN:7, currently EN:5)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-023\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-023\mishnah-berurah\en.html`
- HE: (עט) הארוגים להם - ולכן לא חיישינן דילמא מיפסק ואתי לאתויי ואפילו אם הם זגין של  | (פ) אינם ארוגים לא - ואפילו הם קשורים להכסות וכ"ש בזוג שבצוארו דאסור לצאת דחיישי | (פא) רק בדבר וכו' - דהיינו כגון זו
- EN: (Pen) The woven ones - therefore they did not feel a dilemma | (f) They are not woven, no - and even they are tied to ve

---
**#58 mishnah-berurah  siman301/seif-025  (HE:16 → need EN:16, currently EN:14)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-025\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-025\mishnah-berurah\en.html`
- HE: (פז) אין יוצאין וכו' - ועיין לקמן סימן ש"ח במ"ב ס"ק קכ"ט מה שכתבנו שם: | (פח) יוצאין בו - ודוקא כשהוא מוציאו דרך מלבוש דאז שרי משום דתכשיט הוא לחולה כאחד | (פט) לא שנא וכו' - כלל ההפרש בין איתמחי גברי
- EN: (Paz) There are no exceptions, etc. - and refer to Lakman Si | (Pah) They take him out - and precisely when he takes a w

---
**#59 machatzit-hashekel  siman301/seif-031  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-031\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-031\machatzit-hashekel\en.html`
- HE: (ס"ק לא) אסור כו' ז"ל הרמב"ם כו' ר"ל שלא תפרש נ' הש"ע כפשטות הלשון דדוקא לקשור ח | משמע שאפי' על הספוג כו' והיינו מדכתב שלא יכרוך עליהם לשון רבים. וא"א דקאי דוקא ל
- EN: It means that I wrote on the sponge, etc. and we would write

---
**#60 beur-hagra  siman301/seif-034  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-034\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-034\beur-hagra\en.html`
- HE: ס"לד בסודר המקופל. מדאמר היוצא בטלית מקופלת כו' ויוצא בסודר שעל כתיפו כו' ע"כ דו | ואם אין. שם ב' ובלבד כו': | אא"כ. שם סכניתא כו' ופי' דסכינתא הוא שאין חופה ראשו ורובו וכ"ה בהדיא ברמב"ם:
- EN: Slad in the folded order. From Damer who comes out with a fo | and if there is none Name B provided that:

---
**#61 mishnah-berurah  siman301/seif-036  (HE:6 → need EN:6, currently EN:5)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-036\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-036\mishnah-berurah\en.html`
- HE: (קלב) בין לצורך חבירו - אע"ג שאין לו שום הנאה בזה אפ"ה לא מחזי כמשוי כיון דדרך מ | (קלג) ויש אוסרים שתי חגורות - ולא דמי לשני מלבושים שדרך אדם ללבוש אותן מפני הקור | (קלד) זה על זה - והיכא שנוהגין לחג
- EN: (Kalev) between the necessity of his friend - a person who h | (Kelg) And there are those who forbid two belts - and the

---
**#62 beer-hagolah  siman301/seif-038  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-038\beer-hagolah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-038\beer-hagolah\en.html`
- HE: שבת קמ"ו | לפי' התוס' ורמב"ם פ"ט | ציינתיו לעיל בסעיף י"ג
- EN: Shabbat KMOV | His mentions above in section 13

---
**#63 mishnah-berurah  siman301/seif-039  (HE:5 → need EN:5, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-039\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-039\mishnah-berurah\en.html`
- HE: (קמו) כילה - הוא כעין טלית שראוי להתעטף בה ויש בה רצועות תלויות בה וע"י הרצועות  | (קמז) התלויות באבנט אע"פ וכו' - שדרכן היה לקשור ראש הרצועה האחת במנעלים ולמתוח א | (קמח) של משי - היינו הרצועות ואבנט
- EN: (Kamo) Kilah - it is like a tallit that should be wrapped in | (Kamz) that hang from the sash, etc. - the way was to tie

---
**#64 beer-hagolah  siman301/seif-040  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-040\beer-hagolah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-040\beer-hagolah\en.html`
- HE: ופי' בתו' בשם ר"מ בכובע חזק שאינו נכפף) | שבת קל"ח ועירובין ק"ב לגי' ר"ת וכ"כ התוס' בשם ר"ת והרמב"ם בפ' כ"ט וכ"כ הרב המגיד
- EN: Shabbat Kalkh and Irubin Kb for the year of the Rat, etc.

---
**#65 biur-halacha  siman301/seif-045  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-045\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-045\biur-halacha\en.html`
- HE: ואינו חושש וכו' - ויזהר שלא ינערם מן המים שניעור הוא ג"כ בכלל סחיטה וכדלקמן בסימ | בחדרי חדרים - ועיין במ"ב במש"כ בשם התוספות והרא"ש ודברי התוס' הם בפרק אע"פ דף סמ
- EN: In the rooms of the rooms - and refer to the M.B. in the Mes

---
**#66 machatzit-hashekel  siman301/seif-045  (HE:5 → need EN:5, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-045\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-045\machatzit-hashekel\en.html`
- HE: (ס"ק מה) ויוצא כו' מהרי"ל כו' וי"א שהתיר כה"ג כו' דעת רמ"א להתיר במנוקבי' אפי' א | כמ"ש סי' של"ד ס"ב. משום דאדם בהול על ממונו ואי לא שרינן ליה להוציאה ולהציל אתי ל | ומ"מ משמע מדבריו כו' מדכתב מהרי"ל 
- EN: (Section 1) And it follows from the Haril 20 and 11 that it  | Kmash C. S. L. D. Sab. Because a man was on his own money

---
**#67 mishnah-berurah  siman301/seif-046  (HE:5 → need EN:5, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-046\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-046\mishnah-berurah\en.html`
- HE: (קסח) השרויים במים - אפילו שריה מועטת: | (קסט) אסור לנגבם וכו' - אע"ג דאפילו בחמה אסור וכנ"ל התם משום מראית העין לחוד הוא | (קע) סמוך לאש - וה"ה דאסור להניחן על התנור במקום שהיד סולדת בהם והעולם נכשלי
- EN: (kasakh) soaked in water - even a little soaking: | (Cast) It is forbidden to wipe them etc. | (Ke'a) And it is forbidde

---
**#68 machatzit-hashekel  siman301/seif-051  (HE:4 → need EN:4, currently EN:3)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-051\machatzit-hashekel\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman301\seif-051\machatzit-hashekel\en.html`
- HE: (ס"ק נא) כובע ז"ל הרמב"ם כו' דאמרינן בשבת דף קל"ח ע"ב אר"ש בריה דר"א סיאנ' שרי פ | עסי' שט"ו כו' דשם סעיף ח' כתב דאהל משופע ל"מ אהל אא"כ יש בגגה טפח או תוך שלשה טפ | וע"ק דה"ל לשנויי הכי על קושיית הש"
- EN: (Sak na) The hat of the late Rambam, K. Damarinan, on Shabba | Esi' 15 20 Desham Section 8 The writing of a dahl sloped 

---
**#69 eliyah-rabbah  siman306/seif-009  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman306\seif-009\eliyah-rabbah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman306\seif-009\eliyah-rabbah\en.html`
- HE: [ט] וכן עיקר וכו'. היינו משום שציין רמ"א שכן סבירא ליה לר"ן ומרדכי ומגיד משנה וה | [אות ט*] [לבוש] מיד בשבת וכו'. משמע לומר לו לילך למחר מותר כדלעיל ואף שהולך היום
- EN: [9] And such is the essential ruling, etc. — that is because

---
**#70 chatam-sofer  siman308/seif-051  (HE:1 → need EN:1, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman308\seif-051\chatam-sofer\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman308\seif-051\chatam-sofer\en.html`
- HE: (שם) בהג"ה סעי' נא וכבר פשט המנהג לאסור נ"ב וכבר פשט המנהג להתיר עיין שו"ת פנים 
- EN: Seif 4 in the Mechaber, and sacred writings — note: see in E | (There) in the gloss to seif 51, and the practice has alr

---
**#71 biur-halacha  siman316/seif-012  (HE:6 → need EN:6, currently EN:5)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman316\seif-012\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman316\seif-012\biur-halacha\en.html`
- HE: לתפסם - ל"ד לתפסם דהא אפי' לא מרדו אסור לתפסם דמוקצים וכדלעיל בסי' ש"ח אלא ר"ל ל | וי"א וכו' - עיין במשנה ברורה שכ' בבית גדול שיש בו שיעור צידה וטעם לדברינו דהלא ש | דאסור וכו' - עיין במ"ב בד"ה לצוד ב
- EN: (א) To seize — forbidden seize muktzeh 308; trap to narrow p | (ב) Some say — Mishna Berurah large house measure; Mishna

---
**#72 mishnah-berurah  siman319/seif-001  (HE:3 → need EN:3, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman319\seif-001\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman319\seif-001\mishnah-berurah\en.html`
- HE: הנה בורר הוא אחד מל"ט אבות מלאכות של שבת וחייבין עליה ג"כ חטאת בשוגג ומיתה במזיד | ב) אם הוא בורר בכלי שדרך לברור בה כגון בנפה וכברה חייב אפילו הוא בורר האוכל מן ה | ג) אפילו אם הוא בורר אוכל מן הפסול
- EN: Behold borer is one of the 39 primary melachot of Shabbat, a

---
**#73 biur-halacha  siman319/seif-004  (HE:4 → need EN:4, currently EN:3)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman319\seif-004\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman319\seif-004\biur-halacha\en.html`
- HE: הבורר פסולת וכו' - זהו לשון הרמב"ם והיינו אפילו לאלתר דאי לאחר זמן אפילו אוכל מת | מתוך אוכל וכו' - וכ"כ הר"ן בפרק כלל גדול בשם ר"ח וכתב הרה"מ שכן הסכים הרמב"ן ושכ | חייב - עיין במ"ב דאפילו לאלתר דאלו
- EN: (א) One who selects refuse, etc. — This is Rambam's language | (ב) From food, etc. — So Ran in the chapter Kol HaGadol i

---
**#74 eliyah-rabbah  siman319/seif-014  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman319\seif-014\eliyah-rabbah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman319\seif-014\eliyah-rabbah\en.html`
- HE: [יד] [לבוש] הפסולת וכו'. ולא שפין אותו ביד כדי להסיר הפסולת דהוה ליה כבורר כן צר | [אות יד*] [לבוש] מן הקמחים וכו'. הטעתו הדפוס מוטעה בפירוש רש"י שלא נפסק דיבור קו
- EN: (14) [Dress] The refuse, etc. And one may not rub it by hand

---
**#75 biur-halacha  siman328/seif-004  (HE:4 → need EN:4, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman328\seif-004\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman328\seif-004\biur-halacha\en.html`
- HE: כל שרגילים וכו' - זהו לשון הרמב"ן בת"ה וכתב המ"מ דמזה משמע דאע"פ שאין בו סכנה במ | והנה מלבד דעת המ"מ מצאתי עוד איזה פוסקים דמשמע דס"ל כדבריו וז"ל התשב"ץ ח"א סי' נ | נחזור לעניננו דמוכח מהני פוסקים שה
- EN: (א) All that is customary, etc. — this is the language of Ra | (ב) Who waits, etc. — and where he gonoach from his heart

---
**#76 yad-ephraim  siman330/seif-002  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman330\seif-002\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman330\seif-002\yad-ephraim\en.html`
- HE: ס"ק ט"ו ע"ש בספר תה"א ובר"ן ביומא ולדיעה קמייתא שם אף ספק אם כלו מחללין כההיא דס | ומ"ש וי"ל דתליא בפלוגתא כו' לכאורה צ"ע למעיין בדברי הרמב"ן דסובר בעובר לית ביה מ
- EN: s.k. 15 see there Sefer Torat HaAdam and Ran Yoma; and first

---
**#77 biur-halacha  siman332/seif-004  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman332\seif-004\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman332\seif-004\biur-halacha\en.html`
- HE: ואם הוא ספק וכו' - הנה מקור הדבר הזה נובע מסוגיא דפסחים דף י"א לענין להקיז דם בכ | ועתה נשובה ונראה אם דעת הרי"ף נוטה לדעת המרדכי או לא. והנה מדכתב הרי"ף בפרק במה 
- EN: And if it is a doubt, etc. — behold the source of this matte

---
**#78 biur-halacha  siman339/seif-003  (HE:5 → need EN:5, currently EN:3)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman339\seif-003\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman339\seif-003\biur-halacha\en.html`
- HE: או על הלוח או אחת כנגד אחת - עיין באורו במ"ב והוא מהב"י והאחרונים ומפני זה תמה ע | ולספק כלאחר יד מותר - דין זה מקורו הוא מירושלמי כמבואר בב"י והנה מדפרט שם דוקא ב | להקל בכל - עיין במ"ב דהיינו בטיפוח
- EN: (א) Or on the board or one against one — see explained in Mi | (ב) And slapping with the back of the hand is permitted —

---
**#79 biur-halacha  siman340/seif-001  (HE:8 → need EN:8, currently EN:5)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman340\seif-001\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman340\seif-001\biur-halacha\en.html`
- HE: בין ביד - עיין במ"ב דביד פטור ואסור והוא כחכמים דר"א ועיין בר"ן שכתב דדעת ר"ח דה | וחייב וכו' - הנה התוס' כתבו דזהו דוקא לר"י דמלאכה שאין צריך לגופה חייב אבל לר"ש  | והנה הגר"א כתב דהשו"ע סתם פה להלכה
- EN: (א) Whether by hand — see in Mishna Berurah that by hand one | (ב) And liable, etc. — behold Tosafos wrote that this is 

---
**#80 biur-halacha  siman340/seif-004  (HE:10 → need EN:10, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman340\seif-004\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman340\seif-004\biur-halacha\en.html`
- HE: במשקין על השלחן - עיין במ"ב שהעתקנו דיני כתיבה ומחיקה ועיקרו הוא מלשון הרמב"ם פי | והנה ראיתי דבר פלא בפ"מ שרצה לחלק בין השוין בין שבת וגיטין נגד הרשב"א מכח מה שפס | ודע עוד דאם כתב אותיות על אוכלין ג
- EN: In liquids on the table — see in Mishna Berurah where we cop

---
**#81 biur-halacha  siman340/seif-014  (HE:5 → need EN:5, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman340\seif-014\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman340\seif-014\biur-halacha\en.html`
- HE: ה"ז תולדת תופר - כי תופר ענינו הוא דלוקח שני דברים אחדים ומחבר אותם לאחד וכן הוא | וחייב - עיין במ"ב מה שכתבנו לענין שיעור. והנה אף דלענין טחינה דעת הרמב"ם בפ"ח הט | ולא נתכוין לקלקל וכו' - כ"ז הוא לש
- EN: (א) This is a toldah of sewing — for sewing's matter is taki | (ב) And liable — see in Mishna Berurah what we wrote rega

---
**#82 kol-yaakov  siman35/seif-001  (HE:144 → need EN:144, currently EN:94)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman35\seif-001\kol-yaakov\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman35\seif-001\kol-yaakov\en.html`
- HE: א) נהגו בענין השיטין וכו' וכן הוא ע"פ קבלת האר"י ז"ל בשער הכוונות בדרושי תפילין  | ועתה נבאר כוונת הפרשיות והשיטות וכתיבת השמות מהאר"י זלה"ה ע"פ הסדר שסדר הרש"ש זל | בכללות ד' אותיות הוי"ה יכוין לאור 
- EN: a) His practice in the matter of the Shatin, etc., and it is | And now we will clarify the meaning of the passages and t

---
**#83 biur-halacha  siman366/seif-002  (HE:5 → need EN:5, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman366\seif-002\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman366\seif-002\biur-halacha\en.html`
- HE: או מחנה - עיין מ"ב. וכ"ז בשעת שלום אבל בשעה שהיו ישראל יוצאין למלחמה אפילו מלחמת | אבל שיירא - עיין בהרב המגיד ומשמע ממנו דחילוקא דמחנה משיירא הוא בזה דבמחנה מיירי | ואגב דאתינן להכי תמיה לן דעת המחבר
- EN: Or encampment — see Mishna Berurah. And all this in time of  | But a caravan — see the Rav HaMaggid, and it appears from

---
**#84 shaarei-teshuvah  siman394/seif-003  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman394\seif-003\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman394\seif-003\shaarei-teshuvah\en.html`
- HE: (•) בש"ע סעיף ב' בהג"ה אבל עדיף טפי כו' ובשם האר"י ז"ל כתבו שהיה כו' וע' במג"א ל | (א) מלאכה עבה"ט ועיין בשו"ת שער אפרים סי' כ"ו והובא ביד אפרים לקמן סי' ת"ט:
- EN: (•) Shulchan Aruch seif 2 in gloss but better etc. and in na

---
**#85 beur-hagra  siman398/seif-008  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman398\seif-008\beur-hagra\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman398\seif-008\beur-hagra\en.html`
- HE: ס"ח מלבד רוחב כו'. צ"ל אחר תיבת פחות שליש: | וי"א דאין. כפי' הראשון שבתוס' שם ד"ה התם דוקא אם בין שנים החיצונים ד' אלפים אמה 
- EN: (א) Except for the width of the arrow. Another tablet is les

---
**#86 mechaber  siman399/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman399\seif-001\mechaber\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman399\seif-001\mechaber\en.html`
- HE: במה מודדין התחומין ובמקום המדידה ומי הוא המודד. ובו יא סעיפים: | אין מודדין תחום העיר אלא בחבל של פשתן של חמשים אמה לא פחות שהוא נמתח ביותר ולא א
- EN: With What Are the Shabbos Limits Measured; the Measurement o

---
**#87 yad-ephraim  siman4/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman4\seif-001\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman4\seif-001\yad-ephraim\en.html`
- HE: במג"א ס"ק ד כשרים וכו'. ויש מוחקים ציון סעיף קטן זה. וכן נלענ"ד שהוא ס"ק א' עם ס | ועיין בפ"מ ס"ק ג' שנדחק בזה וליתא ואפשר שאין צריך למחוק כלל רק להוסיף תיבת כו' ו
- EN: In Magen Avraham siman katan 4 "Kosher," etc. And some erase

---
**#88 shaarei-teshuvah  siman4/seif-003  (HE:1 → need EN:1, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman4\seif-003\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman4\seif-003\shaarei-teshuvah\en.html`
- HE: לקמן עבה"ט וע' ביד אפרים שנראה שהבה"ט הגיה בדברי המג"א שס"ק ג' וס"ק ד' שבמג"א הם
- EN: Below. Baer Hetev; and see Yad Ephraim — it seems Baer Hetev | (Seif 3) in Shulchan Aruch he shall not touch. And Mishna

---
**#89 biur-halacha  siman42/seif-003  (HE:14 → need EN:14, currently EN:13)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman42\seif-003\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman42\seif-003\biur-halacha\en.html`
- HE: סודר דאזמניה וכו' - עיין במ"ב במה שכ' אפילו בדבור בלבד והוא מהדה"ח שכתב כן אף דב | למיצר ביה - נ"ל דדוקא אם בעת ההזמנה היה לו כבר תפילין אז חל ההזמנה אבל אם עשה כי | תפילין וכו' - עיין במ"ב סק"א במה ש
- EN: Soder Dazmania, etc. - refer to the MB what is said even in  | For Mitzer Biya - above mentioned, if at the time of the 

---
**#90 biur-halacha  siman428/seif-004  (HE:8 → need EN:8, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman428\seif-004\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman428\seif-004\biur-halacha\en.html`
- HE: צו קודם פסח - מפני שבצו מדבר מהגעלת כלים לענין נותר קדשים והגעלת כלים מחמץ למוד  | ולעולם קורין וכו' קודם עצרת - כדי שלעולם תפסיק בפרשה הזאת בין פ' בחוקותי שיש בה  | במדבר סיני קודם עצרת - ולפעמים אף 
- EN: (א) Tzav before Pesach — because Tzav speaks of hag'alah of  | (ב) And always read, etc. before Shavuot — so always brea

---
**#91 biur-halacha  siman429/seif-001  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman429\seif-001\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman429\seif-001\biur-halacha\en.html`
- HE: שואלין וכו' - בטור איתא שואלין ודורשין והוא כגירסת הגמרא דילן בפסחים דף ו' ובבכו | שוב מצאתי בשאלתות שכתב נמי בפשיטות וז"ל ותלתין יומין קמי פסחא דרשינן במילי דפסחא | י"ב חודש - ונותנין זה אף למי שיש ל
- EN: (א) They ask, etc. — in Tur it states they ask and deliver — | (ב) Twelve months — and they give this even to one who ha

---
**#92 yad-ephraim  siman432/seif-002  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman432\seif-002\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman432\seif-002\yad-ephraim\en.html`
- HE: במג"א ס"ק ו' ולא דמי למ"ש סי' תקפ"ה כו' אם אחר מל אותו אחר מברך ועיין בטור סי' ת | ומ"ש ונוהגים להניח חמץ נוקשה ר"ל חמץ קשה וקאי על מ"ש רמ"א ונוהגים להניח כו' ואפש
- EN: In Magen Avraham s.k. 6 — and it is not comparable to what i

---
**#93 yad-ephraim  siman433/seif-004  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman433\seif-004\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman433\seif-004\yad-ephraim\en.html`
- HE: (שם ס"ק יו"ד) מאי פריך בגמרא והא כו' דפסחים דף ח' אמרינן אמר רבא האי אור החמה הי | ומ"ש המג"א ואפשר דמ"ש הסמ"ק כו' לכאורה קשה דלפ"ז הדרא קושיא לדוכתא דמאי פריך מדר
- EN: (there note 10) what does the Gemara ask — Pesachim daf 8: R

---
**#94 shaarei-teshuvah  siman454/seif-004  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman454\seif-004\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman454\seif-004\shaarei-teshuvah\en.html`
- HE: גזולה. עבה"ט ועיין בש"ת ב"ח החדשים ובק"א שם שטוב לו' מי שיגיע כו' עיין בשאגת ארי | בש"ע סעיף א אין לשין כו' אפי' מצה שאינה של מצוה דהחשש משום חימוץ הרשב"ץ במאמר חמ
- EN: Stolen. Ba'er Hetev; see responsum Bach Chadashim and Kaf Al

---
**#95 mishnah-berurah  siman46/seif-001  (HE:11 → need EN:11, currently EN:10)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman46\seif-001\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman46\seif-001\mishnah-berurah\en.html`
- HE: קודם בואו לבהכ"נ בעוד שהוא עדיין בהחצר בהכ"נ יאמר בבית אלהים נהלך ברגש. וירגיש ו | (א) כשיעור וכו' - כל הברכות האלו הוא משום דאסור לו לאדם ליהנות מן העוה"ז בלי ברכ | (ב) משנתו - ר"ל דוקא סוף שנתו ולא 
- EN: First come to the 22nd while he is still in the yard in the  | (b) From his sleep - RL, precisely the end of his sleep, 

---
**#96 biur-halacha  siman460/seif-001  (HE:5 → need EN:5, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman460\seif-001\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman460\seif-001\biur-halacha\en.html`
- HE: אין לשין וכו' - עיין בט"ז דדעתו דדוקא לישה ואפיה לא מהני עומד ע"ג אבל בטחינה לכו | והנה הח"י הביא ראיה לזה מדברי הרמב"ם בפ"ה מהלכות חמץ ומצה הלכה ח' והפמ"ג כתב דמד | מצת מצוה - עיין מ"ש במ"ב. ועיין בר
- EN: (1) There is no shin, etc. - refer to siman 16, his opinion  | (2) Mitzvah Mitzvah - see MS in MB. And look at Rambam 55

---
**#97 shaarei-teshuvah  siman470/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman470\seif-001\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman470\seif-001\shaarei-teshuvah\en.html`
- HE: מאם. עבה"ט וכתב בש"י ח"א סי' י"ז מי שנולד לו בן בכור בליל י"ד אם נולד קודם חצות  | ומ"ש בשבו"י ח"ב כ"כ ג"כ בדגול מרבבה וע' בשב יעקב בהפיל' תוך ג' חדשים וניכר צורת 
- EN: From the mother. Baer Heitev. And he wrote in Shiyurei Sheve

---
**#98 biur-halacha  siman473/seif-005  (HE:3 → need EN:3, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman473\seif-005\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman473\seif-005\biur-halacha\en.html`
- HE: יקח לענה - עיין במ"ב שפירשנו בדברי ההג"ה שלענה אינה מחמשה מיני מרור וכן מוכח בד" | אח"כ מצאתי להרשב"ץ בס' יבין שמועה שכתב להדיא דאין יוצאין בלענה מפני שהוא מין איל | ודע עוד דסימנא דיש לו שרף ופניו מכ
- EN: He takes wormwood — see in Mishna Berurah that we explained 

---
**#99 turei-zahav  siman481/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman481\seif-001\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman481\seif-001\turei-zahav\en.html`
- HE: בטור מביא דברי רבינו האי לענין כוס ה' וז"ל מי שרוצה לשתות כוס ה' יאמר עליו הלל ה | (א) וכל המשקים כו'. מהרי"ו כ' דדוקא מים כמו שהם ולא מים שנתמדו כגון עפי"ל טרנ"ק 
- EN: In the Tur he brings the words of Rabbeinu Hai regarding the

---
**#100 shaarei-teshuvah  siman482/seif-001  (HE:4 → need EN:4, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman482\seif-001\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman482\seif-001\shaarei-teshuvah\en.html`
- HE: (•) בש"ע סעיף א' מי שאין לו מצה משומרת כו' ועיין באשר"י דף ק"ך ומ"ש הפר"ח והח"י  | (א) מרור עבה"ט וע' שו"ת בית יהודה סי' נ"ח שנים שהיו בבית האסורים או במדבר ולא נמ | (וקצת משמע כן מהתוספות בסוכה ר"פ ל
- EN: (•) In Shulchan Aruch seif 1: one who does not have guarded 

---
**#101 shaarei-teshuvah  siman485/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman485\seif-001\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman485\seif-001\shaarei-teshuvah\en.html`
- HE: אסור. עבה"ט וע' בש"ך ח"מ סי' ע"ג ס"ק י"א שכתב הטעם דמהני בזה כולל לבטל המצוה שבא | (ואני כתבתי שם דמעיקרא לק"מ מ"ש הח"צ מתוס' דשבועות דהש"ך לא מיירי לענין גוף חלות
- EN: Forbidden — Ba'er Hetev; and see in Shach Choshen Mishpat si

---
**#102 turei-zahav  siman486/seif-001  (HE:3 → need EN:3, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman486\seif-001\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman486\seif-001\turei-zahav\en.html`
- HE: בטור כתב בסי' זה וישתה רביעית או רובו צ"ע למה כת' הטור בסי' תע"ב א"צ לשתות כולו  | עוד כתוב בטור ויביאו לפניו קערה שיש בה ג' מצות כי' במשנה אמרו הביאו לפניו מטבל ב | עוד כתוב בטור וחותם מלך מהולל בתשב
- EN: In Tur he wrote in this siman that one drinks a revi'it or i

---
**#103 mechaber  siman487/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman487\seif-001\mechaber\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman487\seif-001\mechaber\en.html`
- HE: סדר תפלת ערבית של פסח. ובו ד סעיפים: | סדר היום ערבית ושחרית ומנחה אומר שלש ראשונו' ושלש אחרונו' וקדושת היום באמצע אתה 
- EN: Pesach evening prayer order. And in four sections: the order

---
**#104 turei-zahav  siman494/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman494\seif-001\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman494\seif-001\turei-zahav\en.html`
- HE: מאחרין להתחיל ערבית בכניסת שבועות כדי שיהיו ימי הספירה תמימות: | (א) וקורין בראשון מן בחדש השלישי. על מה שנוהגים במדינות אלו לקרות פסוק הראשון וא
- EN: It is late to start Arabic at the beginning of Shavuot so th

---
**#105 shaarei-teshuvah  siman496/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman496\seif-001\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman496\seif-001\shaarei-teshuvah\en.html`
- HE: (בש"ע סעיף א') ומנדין כו' ועיין בתשובת מהר"י הלוי סי' י"א בנידון חכם שהתיר להפלי | (•) (בש"ע סעיף ב') אין בין ראשון לשני כו' ועיין בשו"ת נ"ב סי' ל' בתינוק שנולד בה
- EN: (In Shulchan Aruch seif 1) And they excommunicate etc. — and

---
**#106 yad-ephraim  siman506/seif-004  (HE:4 → need EN:4, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman506\seif-004\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman506\seif-004\yad-ephraim\en.html`
- HE: במג"א סק"ח אין לאותו לחם תקנה ולכאורה נראה שאם היה בידו מצות הטבילות לחלה יכול ל | אך נראה דאפילו אם נאמר כדעת הפר"ח דמהני צירוף להיות אוכל והולך מכל מקום אין זו ת | ועיין במק"ח שם שכתב שאם נאמר שיועי
- EN: In Magen Avraham s.k. 8 there is no remedy for that bread; i

---
**#107 shaarei-teshuvah  siman51/seif-003  (HE:3 → need EN:3, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman51\seif-003\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman51\seif-003\shaarei-teshuvah\en.html`
- HE: בדבור עבה"ט. עיין בשו"ת פ"י ח"א סי' ה' חבורה שלא היה להם מנין קודם ב"ש והתחיל לו | (ג) | בדבור עבה"ט. ומ"ש מי שצריך להפסיק כו' בכנה"ג כתב בשם הג"ה תכ"י שהוא קולא יתירה ו
- EN: In speech—Ba'er Heitev. See in responsum Penei Yehoshua part

---
**#108 mishnah-berurah  siman515/seif-001  (HE:23 → need EN:23, currently EN:22)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman515\seif-001\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman515\seif-001\mishnah-berurah\en.html`
- HE: הנה קודם שנכנס בביאור זה הסימן אעתיק לשון הגמרא וביאורו בדרך קצרה. איתא [ביצה כ" | {א} דורון לישראל - וה"ה בהביא למכור בעיר שרוב ישראל דרים בה דמן הסתם למכור לישרא | {ב} אם יש ממינו במחובר וכו' - דמחמ
- EN: Behold before entering this explanation of the siman I will  | (ב) (b) If there is any of our time in the Negev and so o

---
**#109 yad-ephraim  siman518/seif-001  (HE:3 → need EN:3, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman518\seif-001\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman518\seif-001\yad-ephraim\en.html`
- HE: במג"א ס"ק י"ג ואפשר דס"ל דנר עשוי לכבות יותר כו' וא"ל דס"ל דכיון דאין בסתירתו אי | ומ"ש המג"א אבל הר"ן והתוס' כו' ר"ל שלענין סוכה מהני כמ"ש שם המג"א ס"ק ז' מדברי ה | ומ"ש המג"א אבל המאור כ' כו' תמוה מ
- EN: In Magen Avraham subsection 13: and it is possible that he h

---
**#110 turei-zahav  siman526/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman526\seif-001\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman526\seif-001\turei-zahav\en.html`
- HE: ראיתי להזכיר מה שנמצ' בדפוס חדש של ספר מהרי"ל הג"ה אחד וז"ל בשנת רס"ד נפטרה פה ק | (א) בעשיית ארון ותכריכים. שאלו הם איסור דאורייתא וכן הכיסוי שמכסים המת בעפר צריך
- EN: I saw fit to mention what is found in a new edition of Mahar

---
**#111 biur-halacha  siman526/seif-008  (HE:3 → need EN:3, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman526\seif-008\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman526\seif-008\biur-halacha\en.html`
- HE: מותר לצאת לדרך וכו' - ובהג"ה ומותר להביא מת וכו' עיין מגן אברהם סקי"ז שהביא דעת  | א) שאנו מועטים במקומותינו ודיננו כמת מפורסם כמו שכתבו התוס' ב) דלא אסרו בפרהסיא  | קצרן של דברים הוא כן דלריב"ש אפילו
- EN: It is permitted to go on a journey, etc. — and in the gloss:

---
**#112 eliyah-rabbah  siman53/seif-016  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman53\seif-016\eliyah-rabbah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman53\seif-016\eliyah-rabbah\en.html`
- HE: [טז] מפני טורח ציבור וכו'. כתב ים של שלמה סימן נ' אסור לו להאריך שלא ברצון הקהל  | כתב בתשובת ב"ח מה שמזמרים בבית הכנסת ניגונים שמזמרים בבית כותים אין איסור אלא בא
- EN: [16] from public nuisance, etc. Shlomo's Seaman Seaman N. He

---
**#113 biur-halacha  siman530/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman530\seif-001\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman530\seif-001\biur-halacha\en.html`
- HE: ומותר במקצתן - עיין מ"ב מה שכתב יש שסוברים שהוא מדרבנן. הוא דעת הרמב"ם בפ"ז מהלכ | היוצא מדברינו שהרי"ף והשאלתות והאשכול והרי"ץ גיאות ורש"י והרשב"ם והרא"ם בשם רבות
- EN: And it is permitted in some of them — see Mishna Berurah wha

---
**#114 mechaber  siman532/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman532\seif-001\mechaber\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman532\seif-001\mechaber\en.html`
- HE: נטילת צפרנים בחול המועד. ובו ב סעיפים: | מותר ליטול צפרנים בין דיד בין דרגל אפי' במספרים: הגה אבל יש מחמירין ואוסרים וכן 
- EN: Cutting Nails on Chol HaMoed. Containing 2 paragraphs: It is

---
**#115 shaarei-teshuvah  siman537/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman537\seif-001\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman537\seif-001\shaarei-teshuvah\en.html`
- HE: (•) בש"ע (סעיף א) דבר האבד מותר, וכ' בר"י בשם מהר"מ פרובינצאל בתשובה כת"י להדפיס | (א) האבד עבה"ט ועיין בשו"ת פמ"א ח"ב סימן ס"א שמיישב קושיות ב"י לרבינו ירוחם במ"ש
- EN: (•) In Shulchan Aruch (seif 1) davar ha'aved is permitted, a

---
**#116 biur-halacha  siman542/seif-002  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman542\seif-002\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman542\seif-002\biur-halacha\en.html`
- HE: ע"י פועל וכו' - עיין בספר מור וקציעה שכתב דנ"ל אם יש לו אשה ובנים קטנים שחייב במ | מה יאכל - ידוע דעת המגן אברהם וגם איזה אחרונים שהעתיקו דבריו דדוקא שאין לו אפי'  | היוצא מכל זה דבאין לו כדי צרכו ליו
- EN: (1) By a laborer, etc. - refer to the book Mor Vakatzea writ | (ב) 'What he will eat' — it is known Magen Avraham's view

---
**#117 turei-zahav  siman548/seif-002  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman548\seif-002\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman548\seif-002\turei-zahav\en.html`
- HE: הסי' זה מפורש בדברינו בי"ד סימן שצ"ט רק נעתיק כאן קצת דינים מחודשים שם נכתבים בא | (א) מונה הז' מי"ט כו'. משמע אפי' נקבר ביום א' ע"י עכו"ם ולא כמ"ש רש"ל לחלק דדוקא
- EN: This H. is interpreted in our words in the 4th, meaning that

---
**#118 turei-zahav  siman550/seif-002  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman550\seif-002\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman550\seif-002\turei-zahav\en.html`
- HE: פריך בגמרא קרי להו צום וקרי להו ששון ומשני רבא בזמן דאיכא שלום דהיינו שב"ה קיים  | (א) מותרים ברחיצה. קשה לי ממ"ש פ"ק דמגילה דף ה' ר' רחץ בקרונה של צפורי בי"ז בתמו
- EN: The Gemara asks: it calls them "fast" and calls them "joy," 

---
**#119 turei-zahav  siman551/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman551\seif-001\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman551\seif-001\turei-zahav\en.html`
- HE: אמרי' בגמ' דט"ב אין תלוי ברצו להתענות מפני שהוכפלו בו הצרות והקשו התו' הא בי"ז ב | (א) ממעטין במשא ומתן. כ' ב"י ועכשיו לא נהגו רוב העולם למעט במשא ומתן כלל משנכנס 
- EN: Amari' in Gm. DTAB does not depend on his desire to fast bec

---
**#120 shaarei-teshuvah  siman551/seif-003  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman551\seif-003\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman551\seif-003\shaarei-teshuvah\en.html`
- HE: ובעל ברית. עבה"ט ועיין בפמ"א ח"ג סי' ל"ז שהשיג על הבה"ט וכתב שאין לדייק מדלא כתב | (וע' בא"ר וא"ז שמשם העתיק הבה"ט אלא שהשמיט מ"ש שם דהך דסי' שצ"ג ביו"ד קאי אצפרני
- EN: And baal brit. See Ba'er Heitev; and see in Pri Megadim part

---
**#121 shaarei-teshuvah  siman551/seif-017  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman551\seif-017\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman551\seif-017\shaarei-teshuvah\en.html`
- HE: לכבס, עבה"ט ועיין ביד אפרים על דברי המג"א בזה וע' בבר"י בשם נחפה בכסף דאף לפי מ" | (•) (ש"ע סעיף ד') לאחר התענית עיין מג"א ס"ק ט"ז לענין הנוהגים שלא לאכול בשר ויין
- EN: To launder, Baer Heitev; and see Yad Ephraim on Magen Avraha

---
**#122 turei-zahav  siman552/seif-007  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman552\seif-007\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman552\seif-007\turei-zahav\en.html`
- HE: בטור הביא דעת ראבי"ה דמ"ש בגמ' בעט"ב לא יאכל בשר שהוא כשלמים הטעם משום דבשלמים כ | (א) וא"צ לחלוץ מנעליו. והא דבעינן ישיבת קרקע לא מטעם אבילות הוא אלא משום שתהא סע
- EN: In the Tur he brought the view of Rabeinu Yerucham that what

---
**#123 shaarei-teshuvah  siman574/seif-004  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman574\seif-004\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman574\seif-004\shaarei-teshuvah\en.html`
- HE: בש"ע בשנת רעבון. עיין לעיל סי' רמ"ם דה"ה בשאר צרות שהם כרעבון ועיין בר"י בשם שכנ | וקצת צ"ע דמצות עונה דאורייתא ואף על גב שאסרו בשני רעבון היינו דמעיקרא סברה וקיבל
- EN: In Shulchan Aruch, “In a year of famine.” See above siman 24

---
**#124 mishnah-berurah  siman581/seif-001  (HE:15 → need EN:15, currently EN:14)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman581\seif-001\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman581\seif-001\mishnah-berurah\en.html`
- HE: נוהגים לקום באשמורת - דסוף הלילה הקב"ה שט בעוה"ז והוא עת רצון ומה שנהגו מר"ח שאז | (א) אלול ואילך - אבל בר"ח גופא א"א סליחות ותחנונים וכן הנוהגים לומר תהלים כל אלו | (ב) עד יוה"כ - ונוהגין במדינתינו מ
- EN: (1) It is customary to get up in the Ashmorat - at the end o | (2) (b) Until Yohak - and it is customary in our countrie

---
**#125 turei-zahav  siman581/seif-001  (HE:4 → need EN:4, currently EN:3)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman581\seif-001\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman581\seif-001\turei-zahav\en.html`
- HE: בטור הביא המדרש וכי ראשון הוא איכא למידק דהא שפיר ר"ל דראשון של חג קאמר כמו ביום | (א) מר"ח אלול. לפי דעת רש"י ותו' עלה משה ביום הראשון דר"ח שהוא ל' אב. וכתב רש"ל  | ואם חל ר"ה ב' ג' כו'. בלבוש נתן טע
- EN: (1) In Tur he brought the midrash; and that the first is — o | (2) And if Rabbi 2:3 20 applies. In the vestment he gave 

---
**#126 shaarei-teshuvah  siman582/seif-005  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman582\seif-005\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman582\seif-005\shaarei-teshuvah\en.html`
- HE: אומר ועיין בפר"ח אם אמר בחול זכרון תרועה א"ח ואפי' בשבת אם אמר יום תרועה א"ח כיו | (•) (בש"ע סעיף ו') אומר בתפלה וכו' ואם טעה ולא הזכיר מעין י"ט מחזירין אותו כמ"ש 
- EN: He says see Peri Chadash if weekday said zikaron teruah amen

---
**#127 shaarei-teshuvah  siman584/seif-003  (HE:3 → need EN:3, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman584\seif-003\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman584\seif-003\shaarei-teshuvah\en.html`
- HE: חצות, עבה"ט וכתב בשבו"י ח"א סי' ק"מ באחד שהיה לו קצת מיחוש שלא יכול לילך לבה"כ ו | (•) בש"ע ס"א ומאריכים בפיוטים כו' וכל מי שאפשר יש לו ליקח פנאי ללמוד פי' הפיוטים | בפיוט מלך עליון כתב המט"מ שצ"ל מלך
- EN: Hatzat, Abhat and wrote in Shavu'i Ha C. Km one who had a li

---
**#128 turei-zahav  siman590/seif-003  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman590\seif-003\turei-zahav\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman590\seif-003\turei-zahav\en.html`
- HE: וי"א דאין לחוש כו'. תמוה לי דהאי י"א מביא הש"ע עצמו שכ' וי"א ששיעור יבבא היא ג'  | ולפ"ז אין לחוש כו'. פי' לפ"ז עד ט' טרומיטי"ן דהיינו קולות בעלמא אבל יותר מט' הוה | כשיעור י"ב טרימיטי"ן כו'. נמשך בזה
- EN: (1) It is puzzling to me that Dahai 11a brings the Shaa hims | (2) And the PZ is not to be felt as K. F. to the PZ to th

---
**#129 mechaber  siman621/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman621\seif-001\mechaber\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman621\seif-001\mechaber\en.html`
- HE: סדר קריאת התורה ומילה ביו"כ. ובו ו סעיפים: | מוציאין שני ספרים בראשונה קורים ששה בפרשת אחרי מות עד ויעש כאשר צוה ה' ואם חל בש
- EN: “The order of the reading of the Torah and of circumcision o

---
**#130 mechaber  siman623/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman623\seif-001\mechaber\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman623\seif-001\mechaber\en.html`
- HE: סדר תפלת נעילה. ובו ו סעיפים: | לנעילה אומר אשרי וקדיש ואין אומר ובא לציון. הגה וכבר כתבתי דהמנהג במדינות אלו לו
- EN: The order of the Ne'ilah prayer, containing six seifim. For 

---
**#131 mechaber  siman629/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman629\seif-001\mechaber\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman629\seif-001\mechaber\en.html`
- HE: ממה צריך להיות הסכך. ובו יט סעיפים: | דבר שמסככין בו צריך שיהיה צומח מן הארץ ותלוש ואינו מקבל טומאה אבל דבר שאינו צומח
- EN: What materials can be s'chach, 19 Seifim: Schach must grow f

---
**#132 yad-ephraim  siman629/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman629\seif-001\yad-ephraim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman629\seif-001\yad-ephraim\en.html`
- HE: במג"א ס"ק ח' ד"ה סולם מעבר לעבר כמו שלנו ע"כ דברי המג"א עצמו ושוב כתב דברי הב"ח  | דלא גזרינן י"ל דהב"ח כתב לגזור כל סולמות אטו הסולמות המקבלות טומאה וכ' דגם בהא ד
- EN: In Maj. S.C., the ladder goes beyond the direction of our ow

---
**#133 biur-halacha  siman637/seif-003  (HE:9 → need EN:9, currently EN:8)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman637\seif-003\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman637\seif-003\biur-halacha\en.html`
- HE: וכן בקרקע שהיא של רבים - עיין במ"ב מה שכתבנו בשם המגן אברהם דהוא חושש לברכה לבטל | עוד נ"ל דאם באנו להחמיר שלא לעשות אפילו סמוך לפתח ביתו יצא קלקול גדול וכזה ראיתי | לא יקצצו וכו' - עיין במ"ב במש"כ וב
- EN: (א) And also in the land that belongs to many - see in the G | (ב) They shall not be cut down, etc. - refer to the Gemar

---
**#134 shaarei-teshuvah  siman640/seif-010  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman640\seif-010\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman640\seif-010\shaarei-teshuvah\en.html`
- HE: פטורים. עבה"ט וע' בגו"ר כלל ד' סימן י"ג דבזמנינו השושבינים וכל בני חופה חייבים ש | (•) (בש"ע) וסעודת ברית עבמג"א דאף על גב דהוי סעודת מצוה מ"מ אינה כ"כ כסעודת נישו
- EN: discharge. Abhat and A in Gorr Clal 4, Mark 13, in our time,

---
**#135 biur-halacha  siman643/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman643\seif-001\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman643\seif-001\biur-halacha\en.html`
- HE: ואח"כ זמן - עיין במ"ב במש"כ שאין נ"מ בין שהסוכה היתה עשויה ועומדת עם הסכך מכבר ו | עוד כתב המגן אברהם דאם לא בירך זמן בליל ראשון מברך כל שבעה [גמרא] ולא אבין דהלא 
- EN: And then time - refer to the MB in the Meshik there is no co

---
**#136 shaarei-teshuvah  siman645/seif-006  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman645\seif-006\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman645\seif-006\shaarei-teshuvah\en.html`
- HE: בצפורן. עבה"ט וע' בספרי שו"ת בית אפרים סימן ס"א שבארתי בזה שיטות הפוסקים וכתבתי  | ואמנם השבו"י דעתו כמ"ש המנ"י כלל ע"ד דחזותא לאו מלתא ואפילו את"ל מלתא כיון שלא נ
- EN: in a claw Abhat et al. in the books of Beit Ephraim's report

---
**#137 shaarei-teshuvah  siman649/seif-002  (HE:3 → need EN:3, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman649\seif-002\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman649\seif-002\shaarei-teshuvah\en.html`
- HE: בשאר. עבה"ט וע' בבר"י בשם הרדב"ז סימן תקי"ד מתיר לישראל לקצץ וכתב דהכי עבי' מעשי | (ב) | בהג"ה והמודר הנאה כו' וע' בשו"ת שער אפרים סי' ל"ח שהקשה על ראיית הרשב"א במודר הנ
- EN: in the rest Abhat and A. in the BRI in the name of the Radva

---
**#138 biur-halacha  siman649/seif-004  (HE:4 → need EN:4, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman649\seif-004\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman649\seif-004\biur-halacha\en.html`
- HE: גנות הצעירים וכו' - עיין במ"ב במש"כ דהכא מיירי שהגינה לא נדבו מעולם לשם ע"ג [ולה | ומצאתי בנהר שלום שהקשה ג"כ קושיא זו מיורה דעה סימן קמ"ב סי"ג ותירץ באופן אחר וג" | עוד נלענ"ד לתרץ באופן אחר קצת דהכא
- EN: (1) The gardens of the young, etc. - refer to the M.B. in th | (2) For the mitzvah - refer to MB Mishka in the name of t

---
**#139 ateret-zekenim  siman65/seif-002  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman65\seif-002\ateret-zekenim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman65\seif-002\ateret-zekenim\en.html`
- HE: קרא ק"ש כו'. או שהפסיק בשע' קריאתה: | בהג"ה וי"א דאם הי' אנוס כו'. הגה ע"ז אבל אם לא היה אנוס אפי' שהה כדי לגמור את כו | כגון מב"ש ואילך לא יפסיק אלא יאמר כו'. הגה ע"ז וי"א דאפילו אם עוסק בזמירות מב"ש
- EN: Read a KW. Either you have stopped the call: in the midst of | For example, the Bible will not stop, but will say so. Ha

---
**#140 mechaber  siman651/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman651\seif-001\mechaber\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman651\seif-001\mechaber\en.html`
- HE: דיני נטילת לולב וברכתו. ובו טו סעיפים: | מצות ד' מינים שיטול כל אחד לולב א' וב' ערבות וג' הדסים [ובמקום דליכא הדס כשר סגי
- EN: The Laws of Taking The Lulav and Its Blessings, 15 Seifim: T

---
**#141 beer-hagolah  siman651/seif-011  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman651\seif-011\beer-hagolah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman651\seif-011\beer-hagolah\en.html`
- HE: הר"ר מנחם מרקאנטי | פרשת אמור
- EN: Dr. Comfort Martine:

---
**#142 mishnah-berurah  siman66/seif-001  (HE:14 → need EN:14, currently EN:13)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman66\seif-001\mishnah-berurah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman66\seif-001\mishnah-berurah\en.html`
- HE: כל מה שאסור לדבר אפילו בלשון הקודש אסור לדבר. ואפי' תיבה אחת אסור [פמ"ג]: | (א) בין הפרקים - דוקא בשפגעו זה את זה ממילא אבל במשכים לפתחו או לילך בבהכ"נ ממקו | (ב) שואל בשלום - אפילו בלשון לע"ז. ודוקא 
- EN: Everything that cannot be spoken even in the Holy Qur’an is  | (b) He asks in peace, even in his tongue. And Durk in a n

---
**#143 mechaber  siman660/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman660\seif-001\mechaber\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman660\seif-001\mechaber\en.html`
- HE: סדר הקיף הבימה. ובו ג סעיפים: | נוהגים להעלות ספר תורה על [הבימה] ולהקיפה פעם א' בכל יום ובשביעי מקיפים אותה ז' 
- EN: The Order of Circling the Bimah, 3 Seifim: The practice is t

---
**#144 mechaber  siman669/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman669\seif-001\mechaber\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman669\seif-001\mechaber\en.html`
- HE: סדר יום שמחת תורה. ובו סעיף אחד: | במקום שעושין שני ימים טובים ליל תשיעי מקדשין ואומרים זמן ולמחר מוציאין שלשה ספרי
- EN: Simchat Torah schedule. And there is one clause in it: inste

---
**#145 biur-halacha  siman672/seif-001  (HE:5 → need EN:5, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman672\seif-001\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman672\seif-001\biur-halacha\en.html`
- HE: עם סוף שקיעתה - כ"כ הטור וכ"כ הרא"ש בפ"א דתענית אבל ברשב"א ור"ן משמע בהדיא שהוא  | לא מאחרים - ולפ"ז צריך להדליק תיכף אחר צה"כ וא"כ צ"ע מי שנוהג תמיד להתפלל מעריב  | ולא מקדימים - הוא מלשון הרמב"ם עיי
- EN: (1) With the end of its sunset - 22 the Tor and 22 the Rash  | Not later — and therefore one must kindle immediately aft

---
**#146 mechaber  siman674/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman674\seif-001\mechaber\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman674\seif-001\mechaber\en.html`
- HE: שמותר להדליק מנר לנר. ובו ב סעיפים: | מדליקין נר חנוכה מנר חנוכה ודוקא להדליק זה מזה בלא אמצעית אבל להדליק זה מזה על י
- EN: that it is allowed to light from candle to candle. And in th

---
**#147 shaarei-teshuvah  siman676/seif-005  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman676\seif-005\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman676\seif-005\shaarei-teshuvah\en.html`
- HE: הברכה. עבה"ט ומ"ש וכל זמן שעוסק כו' משמע קצת דאף לאחר שהדליק כולם אלא שעדיין עוס | תשו' אפשר כ"ז שעוסק בהידור מצוה יש לו לברך עכ"ל ור"ל דהיינו כ"ז שהוא עוסק בהדלקת
- EN: the blessing Abhat and Mash, and whenever he is engaged in a

---
**#148 mechaber  siman68/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman68\seif-001\mechaber\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman68\seif-001\mechaber\en.html`
- HE: שלא להפסיק בפיוטין. ובו סעיף אחד: | יש מקומות שמפסיקים בברכת קריאת שמע לומ' פיוטי' ונכון למנוע מלאומרם משום דהוי הפס
- EN: [The Laws Regarding] That One Should Not Interrupt With Piyy

---
**#149 shaarei-teshuvah  siman691/seif-001  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman691\seif-001\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman691\seif-001\shaarei-teshuvah\en.html`
- HE: (•) ס"א בש"ע אין כותבין כו' ע' בבר"י שהביא בשם מהר"מ פרובנציאל בתשו' כת"י כת' במ | (א) שירטוט עבה"ט ומ"ש בשם הח"צ ע' בר"י שכנה"ג כת' דהחדר על דבר ה' יחזור אחר משור
- EN: (•) Seif 1 in Shulchan Aruch: one does not write, etc. — see

---
**#150 shaarei-teshuvah  siman697/seif-001  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman697\seif-001\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman697\seif-001\shaarei-teshuvah\en.html`
- HE: ותענית. עבה"ט ועיין מג"א דלכ"ע אין אומרים עה"נ ועיין בעטרת זקנים שאין נוהגים איס | בי"ד. עבה"ט ועבט"ז שהביא בשם הגהות תשב"ץ שרבינו יחיאל מפאריז רגיל להרבות בסעודה  | וה' ישיב שבותינו בישיבת ציון וירוש
- EN: (א) 14th and 15th of Adar I — see Peri Megadim and Kaf HaCha | On the 14th. Avodat HaTodah and Avodat Yisrael brought in

---
**#151 biur-halacha  siman70/seif-004  (HE:3 → need EN:3, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman70\seif-004\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman70\seif-004\biur-halacha\en.html`
- HE: היה עוסק בצרכי רבים וכו' - עיין במג"א אות ד' מש"כ בשם הכ"מ בשם הר"מ ועי"ש בכ"מ ש | היה עוסק וכו' ולהראב"ד מפסיק וכו' - עיין במ"א שכתב דמיירי שהתחיל אחר שהגיע החצי  | ומה שכתבתי עוד במ"ב דאם היה עוסק ב
- EN: If one was occupied with communal needs, etc. — see in Magen | If one was occupied, etc., and per Raavad one stops, etc.

---
**#152 biur-halacha  siman74/seif-001  (HE:10 → need EN:10, currently EN:4)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman74\seif-001\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman74\seif-001\biur-halacha\en.html`
- HE: נעתיק פה ההקדמה מפמ"ג לסימן ע"ד וע"ה כי הוא נצרך מאוד - | א. דע כי הדין איסור ערוה המבואר בסימן זה ובסימן ע"ה נחלק לחמשה חלקים כאשר יתבאר  | [א] עינו רואה ערותו. [ב] לבו רואה ערותו. כגון שהוא הולך בחל
- EN: I copy here the introduction from Pri Megadim for simanim 74 | He was naked and so on, even if he took his head apart fr

---
**#153 biur-halacha  siman75/seif-002  (HE:4 → need EN:4, currently EN:2)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman75\seif-002\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman75\seif-002\biur-halacha\en.html`
- HE: שרגילין לצאת וכו' - עיין במ"ב בשם א"ר דאפילו נגד אשה אחרת מותר וכן משמע מסתימת כ | מחוץ לצמתן - ואותן נשים הבאות מארצות שאין דרכן לגלותן מחוץ לצמתן למקום שדרכן לגל | ולענין עיקר איסור גילוי שער דאשה כ
- EN: In the name of A. D. even against another woman is permitted | Outside the braid — women from lands where custom is not 

---
**#154 biur-halacha  siman79/seif-001  (HE:18 → need EN:18, currently EN:7)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman79\seif-001\biur-halacha\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman79\seif-001\biur-halacha\en.html`
- HE: אעתיק בכאן הקדמה לסימן זה ועיקרה הוא מלשון הפמ"ג בסימן זה ובשאר מקומות ולפעמים ב | (א) צואה מלאחריו ומצדדים: (ב) לפניו: (ג) במקום גבוה יו"ד או נמוך יו"ד: (ד) צואה  | א. צואה מאחריו או מן הצדדים תוך ד"
- EN: I copy introduction for this siman — mainly Pri Megadim here | D. I shall die from the place where the smell is, in the 

---
**#155 shaarei-teshuvah  siman8/seif-003  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman8\seif-003\shaarei-teshuvah\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman8\seif-003\shaarei-teshuvah\en.html`
- HE: ונכון שיכסה. עבה"ט ועיין במשאת בנימין ס"י מ"ח עובדי דרכים שמניחין הטלית כשהוא מק | (ג) בש"ע טליתות. וכתב התשב"ץ ח"ב סי' מ"ם לעולם יש לברך להתעטף בציצית בין על טלית
- EN: And it is proper that he cover. Biur HaTaz — and see Mas'as 

---
**#156 ateret-zekenim  siman93/seif-002  (HE:2 → need EN:2, currently EN:1)**
- he.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman93\seif-002\ateret-zekenim\he.html`
- en.html: `C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader\public\corpus\oc1\siman93\seif-002\ateret-zekenim\en.html`
- HE: לא יעמוד להתפלל כו'. אלא מתוך שמחה כגון דברי תנחומין כו'. וכן נוהגין בשחרית סמוך | ומי שאינו רוצה לנגן עם הש"ץ ורוצה להתפלל עם הקהל ימתין בכאן כמו שעשה מהר"ם בענין
- EN: We will not be praying like him. But of joy, such as the wor

---

### After all fixes
Re-read each modified en.html and confirm its segment count matches he.html.
Report: `Fixed: N | Already OK: M | Failed: K`