#!/usr/bin/env node
/** Repair corrupted tail of siman_089/mishnah-berurah/part-001.txt (seif 6 ה through seif 8 ה). */
import fs from "fs";
import { serializeBlock } from "../oc001_block_lib.mjs";

const file = "output/siman_089/mishnah-berurah/part-001.txt";
const raw = fs.readFileSync(file, "utf8");
const anchor = "(33) absorbed in his learning";
const i = raw.indexOf(anchor);
if (i < 0) throw new Error("anchor not found");
const end = raw.indexOf("**** END BLOCK ****", i);
if (end < 0) throw new Error("end block not found");
const head = raw.slice(0, end + "**** END BLOCK ****".length).trimEnd();

const tail = [
  {
    slug: "mishnah-berurah",
    seif: 6,
    marker: "ה",
    he: "(לד) ויעבור וכו' - ואם אמר לחבירו שאינו לומד שאם יטרד בגירסא יזכרנו שלא יעביר הזמן מותר ללמוד:",
    en: "(34) And he passes by, etc. — and if he said to his friend that he is not learning, that if he is disturbed in his study he will remember him so as not to pass the time — it is permitted to learn.",
  },
  {
    slug: "mishnah-berurah",
    seif: 6,
    marker: "ו",
    he: '(לה) מלמד לאחרים וכו\' - ודוקא אם לא יעבור ק"ש עי"ז דאם ירא שיעבור הזמן מחוייב לקרותה מקודם כיון שכבר הגיע הזמן וכמו שהוכחתי לקמן בסימן ק"ו בבה"ל:',
    en: "(35) Teaching others, etc. — and specifically if Keriat Shema will not pass because of this; for if he sees that the time will pass he is obligated to read it beforehand, since the time has already arrived — and as I proved below in siman 106 in Biur Halacha.",
  },
  {
    slug: "mishnah-berurah",
    seif: 7,
    marker: "א",
    he: '(לו) להסתפר וכו\' - דוקא סמוך לשחרית היינו קודם שעלה עמוד השחר אבל משעלה עמוד השחר גם זה אסור [א"ר] וכתב הפמ"ג דדין ובורסקי וסעודה אסור סמוך לשחרית כמו סמוך למנחה ועיין לעיל בסימן ע\' בבה"ל. ולקנות צרכי סעודה בע"ש קודם תפלה שרי דחפצי שמים המה אבל בחול אסור:',
    en: "(36) To get a haircut, etc. — specifically close to Shacharit, that is, before the column of dawn has risen; but from when the column of dawn has risen this too is forbidden [Eliyah Rabbah]. And Peri Megadim wrote that bathing and cutting hair and a meal are forbidden close to Shacharit as close to Mincha — and see above in siman 70 in Biur Halacha. And to buy needs of a meal on erev Shabbat before prayer is permitted, for they are heavenly matters; but on a weekday it is forbidden.",
  },
  {
    slug: "mishnah-berurah",
    seif: 7,
    marker: "ב",
    he: '(לז) שהוא דבר וכו\' - שרוב העם נכנסין שם ביום אבל בשחר דבר שאינו מצוי הוא ולא גזרו בו ואותן המלאכות שדרך בני אדם להשכים להם קודם עה"ש יש שמחמירים וסוברים דבחצי שעה שקודם עה"ש אסור כמו סמוך למנחה וכדלעיל בסימן ע\' בבה"ל עי"ש ע"כ טוב שיאמר ברכות מקודם:',
    en: "(37) That it is a matter, etc. — for most people enter there by day, but at dawn something that is not found is not found, and they did not decree on it. And those melachos that people are accustomed to rise early for before erev Shabbat — some are stringent and hold that half an hour before erev Shabbat is forbidden as close to Mincha, as above in siman 70 in Biur Halacha — see there; therefore it is good that he say the blessings beforehand.",
  },
  {
    slug: "mishnah-berurah",
    seif: 8,
    marker: "א",
    he: "(לח) שצריך וכו' - ואין השיירא ממתנת לו או שאר דחק ואונס:",
    en: "(38) That he must, etc. — and the caravan does not wait for him, or other duress and compulsion.",
  },
  {
    slug: "mishnah-berurah",
    seif: 8,
    marker: "ב",
    he: '(לט) יכול להתפלל - פי\' דבסתם דרך אינו יכול לכוין בתפלה בין כשהוא מהלך ברגליו או יושב בעגלה או בספינה ולפיכך אמרו חכמים שטוב יותר שיתפלל משעלה עה"ש אף שאינו עדיין עיקר זמן תפלה וגם לא יוכל לסמוך גאולה לתפלה כי לא יוכל לקרוא אז ק"ש דעדיין לא הגיע זמנה עד שיכיר את חבירו ברחוק ד"א מ"מ זהו טוב יותר משיתפלל בדרך בזמנו עם סמיכת גאולה לתפלה כי בביתו יוכל להתפלל בעמידה:',
    en: "(39) He may pray — meaning that on an ordinary road he cannot have proper intent in prayer, whether walking on foot or sitting in a wagon or boat; therefore the Sages said it is better that he pray from when alos hashachar has risen, even though it is not yet the main time of prayer, and also he will not be able to adjoin redemption to prayer, for he cannot then read Keriat Shema, for its time has not yet arrived until he can recognize his friend at a distance of four amot — nevertheless this is better than praying on the road at its time with adjoining redemption to prayer, for in his house he can pray standing.",
  },
  {
    slug: "mishnah-berurah",
    seif: 8,
    marker: "ג",
    he: '(מ) משעלה עה"ש - עיין בביאור הלכה בס"א שכתבנו בשם הרבה פוסקים דס"ל דדוקא אחר שהאיר מזרח וקודם לזה לא הגיע עדיין זמן תפלה. ובפרט כשרוצה אז לברך על התפילין דזה אפילו לדעת המקילין אסור אפילו אחר שהאיר מזרח עד זמן שיכיר את חבירו ברחוק ד"א ואם הגיע הזמן הזה לכ"ע יקרא ק"ש ויתפלל בביתו כתקונה אף שעדיין לא הנץ החמה כיון שהוא שעת הדחק. ואם הוא בדרך במלון והשיירא שלו עומדים להתפלל קודם זה הזמן ומשער דעד ברכו יגיע הזמן יוכל הוא להתחיל ברכת ברוך שאמר ג"כ עמהם לע"ע בלא תפילין או שילבש תפילין בלי ברכה ואחר שיגיע בין ישתבח ליוצר יראה אם הגיע הזמן ימשמש בהן ויברך:',
    en: '(40) From when alos hashachar has risen — see in Biur Halacha in note 1 that we wrote in the name of many poskim who hold that specifically after the east has brightened, and before that the time of prayer has not yet arrived. And in particular when he then wants to bless on the tefillin — for this, even according to those who are lenient, is forbidden even after the east has brightened until the time he can recognize his friend at a distance of four amot; and if this time has arrived, for all opinions he reads Keriat Shema and prays in his house in its proper order, even though the sun has not yet risen, since it is a time of duress. And if he is on the road in an inn and his caravan stands to pray before this time, and he estimates that by Barchu the time will arrive — he may begin the blessing "Baruch she-amar" with them for now without tefillin, or don tefillin without a blessing; and after he reaches between Yishtabach and Yotzer he sees whether the time has arrived — he handles them and blesses.',
  },
  {
    slug: "mishnah-berurah",
    seif: 8,
    marker: "ד",
    he: '(מא) אם אפשר וכו\' - ר"ל דאם יודע שגם ק"ש פסוק ראשון לא יוכל לכוין בדרך כגון שהוא במקום גדודי חיה וליסטים מותר לקרוא ק"ש בביתו ג"כ תיכף משעלה עה"ש אע"פ שעדיין לא הגיע עיקר הזמן וכדלעיל בסימן נ"ח ס"ג:',
    en: "(41) If possible, etc. — meaning that if he knows that even the first verse of Keriat Shema he will not be able to have intent on the road — such as when he is in a place of wild animals and bandits — he may read Keriat Shema in his house as well immediately from when alos hashachar has risen, even though the main time has not yet arrived, as above in siman 58, note 3.",
  },
  {
    slug: "mishnah-berurah",
    seif: 8,
    marker: "ה",
    he: '(מב) הכי עדיף - ורוב העולם אין נזהרין בזה ואפשר משום דנוהגים כאידך פוסקים דס"ל דמסמך גאולה לתפלה עדיף ע"כ מתפללין בדרך עם סמיכת גאולה לתפלה [מ"א עי"ש עוד]. עוד כתב אם הוא בדרך ומתיירא שיעבור זמן ק"ש יקרא ק"ש בלי ברכות וכשיבוא למלון יקרא עוד הפעם ק"ש עם ברכותיה ויסמוך גאולה לתפלה ואם הוא רואה שיעבור גם זמן תפלה [שהיא רק עד ד\' שעות] ודאי יתפלל שחרית ג"כ בדרך מהלך או מיושב [פמ"ג] וכשנוסע בלילה ויכול לבוא במלון להתפלל שם מעריב נכון להתאחר להתפלל עד בואו שם ולא יתפלל בעודו בדרך אם לא שהוא ישן על העגלה ויש לחוש שמא בתוך כך יעלה עמוד השחר ועיין ברל"ה בשע"ת סק"ג או שהוא ירא שמא לא יהיה לו שם מקום מנוחה להתפלל שיבלבלוהו שם בני הבית:',
    en: "(42) This is preferable — and most of the world are not careful about this; and it is possible because they practice like other poskim who hold that adjoining redemption to prayer is preferable — therefore they pray on the road with adjoining redemption to prayer [Magen Avraham — see there further]. He also wrote: if he is on the road and fears that the time of Keriat Shema will pass, he reads Keriat Shema without blessings; and when he comes to the inn he reads Keriat Shema again with its blessings and adjoins redemption to prayer. And if he sees that the time of prayer too will pass [which is only until four hours] — he certainly prays Shacharit on the road as well, walking or sitting [Peri Megadim]. And when traveling at night and able to come to an inn to pray Maariv there — it is proper to delay prayer until arriving there, and not pray while still on the road, unless he sleeps on the wagon and there is concern lest in the meantime the column of dawn rise — and see Ralbag in Shaarei Tefillah, note 3; or that he fears he will not have there a place of rest to pray, that the household will disturb him there.",
  },
].map(serializeBlock);

const out = `${head}\n\n${tail.join("\n")}`;
fs.writeFileSync(file, out);
console.log("repaired", file, "tail blocks", tail.length);
