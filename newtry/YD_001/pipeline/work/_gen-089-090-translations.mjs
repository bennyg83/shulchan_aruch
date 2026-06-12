#!/usr/bin/env node
/**
 * Generate full _patch-siman-089|090-translations.mjs from _hebrew-*.json
 * Uses _yd001-translate-shared.mjs + domain EXTRA_REPS + optional _manual-089|090.json overrides.
 * Usage: node _gen-089-090-translations.mjs [089|090|both]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyPhrases } from './_yd001-translate-shared.mjs';
import { HANDLERS_089 } from './_handlers-089.mjs';
import { HANDLERS_090 } from './_handlers-090.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const mechaberAll = JSON.parse(
  fs.readFileSync(path.join(WORK, '_mechaber-overrides.json'), 'utf8'),
);

const EXTRA_REPS = [
  [/הכחל/g, 'udder'],
  [/כחל/g, 'udder'],
  [/חלב שחוטה/g, 'chalav shechutah'],
  [/חלבו/g, 'its milk'],
  [/חלב בעלמא/g, 'mere milk'],
  [/חלב אשר הועמדה בקיבה/g, 'milk that was set in the stomach'],
  [/חמאה/g, 'butter'],
  [/גבינה קשה/g, 'hard cheese'],
  [/גבינה מתולעת/g, 'wormy cheese'],
  [/גבינת/g, 'cheese of'],
  [/גבינה/g, 'cheese'],
  [/גבינת/g, 'cheese'],
  [/בשר חיה/g, 'meat of wild animal'],
  [/בשר בהמה/g, 'meat of domestic animal'],
  [/בשר עוף/g, 'fowl meat'],
  [/בשרי/g, 'meaty'],
  [/חלבי/g, 'dairy'],
  [/בשר וחלב/g, 'meat and milk'],
  [/בשר בחלב/g, "basar b'chalav"],
  [/בב"ח/g, "basar b'chalav"],
  [/נטילת ידים/g, 'netilat yadayim'],
  [/נט"י/g, 'netilat yadayim'],
  [/נ"י/g, 'netilat yadayim'],
  [/ברכת המזון/g, 'Birkat HaMazon'],
  [/ברהמ"ז/g, 'Birkat HaMazon'],
  [/בה"מ/g, 'Birkat HaMazon'],
  [/ברכה אחרונה/g, 'final blessing'],
  [/סעודה אחרת/g, 'another meal'],
  [/סעודה חדא/g, 'one meal'],
  [/שעתא חדא/g, 'one time'],
  [/סעודת שחרית/g, 'morning meal'],
  [/שש שעות/g, 'six hours'],
  [/שעה אחת/g, 'one hour'],
  [/שעה א'/g, "one hour"],
  [/המתנה/g, 'waiting'],
  [/להמתין/g, 'to wait'],
  [/שהייה/g, 'waiting'],
  [/קינוח/g, 'wiping'],
  [/לקנח/g, 'to wipe'],
  [/הדחה/g, 'rinsing'],
  [/להדיח/g, 'to rinse'],
  [/ניקור שינים/g, 'cleaning the teeth'],
  [/בין השינים/g, 'between the teeth'],
  [/שיניו/g, 'his teeth'],
  [/לועס/g, 'one who chews for a child'],
  [/תינוק/g, 'child'],
  [/תבשיל של בשר/g, 'meat dish'],
  [/תבשיל של גבינה/g, 'cheese dish'],
  [/תבשיל/g, 'dish'],
  [/מרק של בשר/g, 'meat broth'],
  [/שומן אווז/g, 'goose fat'],
  [/שומן הבשר/g, 'fat of the meat'],
  [/שומן/g, 'fat'],
  [/מוציא שומן/g, 'expels fat'],
  [/מושך טעם/g, 'draws taste'],
  [/מים אמצעים/g, 'intermediate waters'],
  [/מים אחרונים/g, 'mayim acharonim'],
  [/סילוק/g, 'clearing'],
  [/סלק/g, 'cleared'],
  [/מסלק/g, 'clears'],
  [/המנהג/g, 'the custom'],
  [/נהגו/g, 'they practice'],
  [/נהגין/g, 'they practice'],
  [/הצנועים/g, 'the scrupulous'],
  [/בני תורה/g, 'Torah scholars'],
  [/המחמירים/g, 'those who are stringent'],
  [/המקילים/g, 'the lenient'],
  [/מראית עין/g, 'marit ayin'],
  [/נ"ט בר נ"ט/g, 'noten taam bar noten taam'],
  [/קריעה ש"ו וט"ב/g, 'tearing in two directions and smearing on the wall'],
  [/ש"ו וט"ב/g, 'two directions and smearing on the wall'],
  [/טחו בכותל/g, 'smeared on the wall'],
  [/בטיגון/g, 'in a pan'],
  [/במחבת/g, 'on a griddle'],
  [/פשטיד"א/g, 'pastry'],
  [/בשפוד/g, 'on a spit'],
  [/שפוד/g, 'spit'],
  [/גומות/g, 'pockets'],
  [/עור הקיבה/g, 'stomach skin'],
  [/כבוש כמבושל/g, "kavush k'mevushal"],
  [/בריה שלימה/g, 'complete entity'],
  [/בריה/g, 'complete entity'],
  [/חנ"נ/g, 'noten taam naaseh nevelah'],
  [/מין המנין/g, 'item counted by number'],
  [/הפסד מרובה/g, 'great loss'],
  [/שעת הדחק/g, 'time of pressure'],
  [/מגריפה/g, 'fork'],
  [/לחלוחית/g, 'moisture'],
  [/חניכין/g, 'crevices'],
  [/קימחא/g, 'groats'],
  [/תמרי/g, 'dates'],
  [/ירקות/g, 'vegetables'],
  [/צנון/g, 'radish'],
  [/כותח/g, 'kutach'],
  [/סכין/g, 'knife'],
  [/סכינים/g, 'knives'],
  [/נעיצה/g, 'sticking'],
  [/קרקע/g, 'ground'],
  [/מפה/g, 'cloth'],
  [/שלחן/g, 'table'],
  [/פת/g, 'bread'],
  [/לחם/g, 'bread'],
  [/שמש/g, 'waiter'],
  [/הדד/g, 'udder (mammary)'],
  [/חלב שחוטה/g, 'chalav shechutah'],
  [/גומות/g, 'pockets'],
  [/טיחה/g, 'smearing'],
  [/טחו בכותל/g, 'smeared on the wall'],
  [/טחו בכותל/g, 'smeared on the wall'],
  [/שתי וערב/g, 'two directions and width'],
  [/קריעה שתי וערב/g, 'tearing in two directions and width'],
  [/קריעה קצת/g, 'slight tearing'],
  [/קריעת ש"ו/g, 'tearing in two directions'],
  [/זוויקי/g, 'sticky pockets'],
  [/זווקי/g, 'sticky'],
  [/תותי בישרא/g, 'underside in meat'],
  [/עלוי בישרא/g, 'upper part in meat'],
  [/נצלה/g, 'was roasted'],
  [/לצלות/g, 'to roast'],
  [/צלי/g, 'roasting'],
  [/צלייה/g, 'roasting'],
  [/מירק/g, 'rinse out'],
  [/מן המנין/g, 'in the count'],
  [/מצטרף/g, 'combines'],
  [/מצטרפת/g, 'combines'],
  [/גיד הנשה/g, 'gid hanasheh'],
  [/עור הקיבה/g, 'stomach skin'],
  [/כבוש כמבושל/g, "kavush k'mevushal"],
  [/מליח כרותח/g, 'salting is like boiling'],
  [/הפסד מרובה/g, 'great loss'],
  [/חענ"נ/g, 'noten taam naaseh nevelah'],
  [/חנ"נ/g, 'noten taam naaseh nevelah'],
  [/נפוח/g, 'swollen'],
  [/כנוס/g, 'enclosed'],
  [/נכנס לצירוף/g, 'enters the combination'],
  [/משערין בדידיה/g, 'we estimate in it itself'],
  [/במאי דנפק/g, 'in what came out'],
  [/נפק מיניה/g, 'came out from it'],
  [/סימן צ'/g, 'siman 90'],
  [/סי' צ'/g, 'siman 90'],
  [/קי"א/g, '111'],
  [/פ"ט מהמ"א/g, 'chapter 9 of Forbidden Foods'],
  [/המ"מ/g, 'Magid Mishnah'],
  [/הרב המגיד/g, 'Magid Mishnah'],
  [/סימן ס"ט/g, 'siman 69'],
  [/סימן ק'/g, 'siman 100'],
  [/סימן צ"ב/g, 'siman 92'],
  [/סימן צ"ז/g, 'siman 97'],
  [/סימן צ"ח/g, 'siman 98'],
  [/סימן צ"א/g, 'siman 91'],
  [/סימן ע"ג/g, 'siman 73'],
  [/רס"י/g, 'Rashi'],
  [/ר"א/g, "R' Eliezer"],
  [/ר"נ/g, "R' Nachman"],
  [/ר' יהודה/g, "R' Yehudah"],
  [/ר' יוחנן/g, "R' Yochanan"],
  [/שמעיה/g, 'Shmuelia'],
  [/אר"א/g, "R' Eliezer"],
  [/ת"כ/g, 'baraita'],
  [/תניא/g, 'baraita'],
  [/מתני'/g, 'mishnah'],
  [/סוגיא/g, 'sugya'],
  [/לישנא קמא/g, 'first version'],
  [/לישנא בתרא/g, 'later version'],
  [/תרי לישנא/g, 'two versions'],
  [/מנהג ישראל/g, 'custom of Israel'],
  [/גדר/g, 'fence'],
  [/מינות/g, 'heresy'],
  [/קרא תגר/g, 'picked a quarrel'],
  [/פרישות/g, 'abstinence'],
  [/זהירות/g, 'scrupulousness'],
  [/מצרף לחכמה/g, 'Mitzaref LeChochmah'],
  [/ת"ח/g, 'sage'],
  [/או"ה/g, 'Orach Chaim'],
  [/עט"ז/g, 'Atzei Etz Chaim'],
  [/פר"ח/g, 'Peri Chadash'],
  [/מהרא"י/g, 'Maharai'],
  [/מהרש"ל/g, 'Maharshal'],
  [/מהר"ם/g, 'Maharam'],
  [/מהרי"ט/g, 'Maharit'],
  [/הרי"ף/g, 'Rif'],
  [/ה"ר פרץ/g, "R' Peretz"],
  [/ראבי"ה/g, "Ra'avyah"],
  [/הג"א/g, 'Hagahot Ashiri'],
  [/הג"מ/g, 'Haggahot Maimoniyot'],
  [/ש"ד/g, 'ShaDa'],
  [/שערים/g, 'Shaarim'],
  [/שערי דורא/g, 'Shaarei Dura'],
  [/פכ"ה/g, 'chapter 25'],
  [/פ"ט/g, 'chapter 89'],
  [/פ"ו דפסחים/g, 'chapter 6 of Pesachim'],
  [/פ' משפטים/g, "parashat Mishpatim"],
  [/חולין/g, 'Chullin'],
  [/דף ק"ה/g, 'daf 105'],
  [/דף ק"ד/g, 'daf 104'],
  [/דף ק"ז/g, 'daf 107'],
  [/דף ק"ט/g, 'daf 109'],
  [/דף קי"א/g, 'daf 111'],
  [/דף צ"ז/g, 'daf 97'],
  [/דף צ"ח/g, 'daf 98'],
  [/דף ע"ג/g, 'daf 73'],
  [/דף שנ"ד/g, 'daf 154'],
  [/ד"ה/g, 's.v.'],
  [/סימן פ"ט/g, 'siman 89'],
  [/סימן צ'/g, 'siman 90'],
  [/סימן פ"ז/g, 'siman 87'],
  [/סימן צ"ו/g, 'siman 96'],
  [/סימן צ"ה/g, 'siman 95'],
  [/סימן צ"ד/g, 'siman 94'],
  [/סימן קע"ג/g, 'siman 173'],
  [/סימן קס"ג/g, 'siman 163'],
  [/סימן קפ"ד/g, 'siman 184'],
  [/סימן ע"ח/g, 'siman 78'],
  [/סימן ע"ג/g, 'siman 73'],
  [/ר"ס צ"ה/g, 'siman 95'],
  [/ר"ס צ"ו/g, 'siman 96'],
  [/ס"ס צ"ו/g, 'end of seif 96'],
  [/ס"ס/g, 'end of seif'],
  [/ס"ק/g, 's.k.'],
  [/סעיף/g, 'seif'],
  [/בא"ח/g, 'in Orach Chaim'],
  [/א"ח/g, 'Orach Chaim'],
  [/באו"ח/g, 'in Orach Chaim'],
  [/כלל ע"ח/g, 'general rule 18'],
  [/כלל י"א/g, 'chapter 11'],
  [/תשובו'/g, 'responsum'],
  [/תשובות/g, 'responsa'],
  [/פלפולו של ר' חייא/g, "R' Chiya's analysis"],
  [/לישנא קמא/g, 'first version'],
  [/לישנא בתרא/g, 'later version'],
  [/תרי לישנא/g, 'two versions'],
  [/גירסת/g, 'version of'],
  [/גירסין/g, 'versions'],
  [/הגש"ד/g, 'Hagahot Sefer HaTerumah'],
  [/עבה"ג/g, 'Avodat HaGolah'],
  [/עב"י/g, 'Avodat HaBayit'],
  [/סה"ת/g, 'Sefer HaTerumah'],
  [/סמ"ק/g, 'Semak'],
  [/סמ"ג/g, 'Semag'],
  [/רי"ו/g, 'Rivash'],
  [/ער"ן/g, 'Aruch'],
  [/ערש"י/g, 'Aruch on Rashi'],
  [/ערא"ש/g, 'Aruch on Rosh'],
  [/פמ"ו/g, 'Peri Megadim'],
  [/מ"א/g, 'Magen Avraham'],
  [/ליקוט/g, 'Lekut'],
  [/פשיטא/g, 'it is plain'],
  [/פשיטא ד/g, 'it is plain that'],
  [/מוכח/g, 'proven'],
  [/מוכרחים/g, 'compelled'],
  [/תמוה/g, 'astonishing'],
  [/תמוהין/g, 'astonishing'],
  [/קשה/g, 'difficult'],
  [/ק"ל/g, 'investigate'],
  [/צ"ע/g, 'requires study'],
  [/קולא/g, 'leniency'],
  [/חומרא/g, 'stringency'],
  [/לכ"ע/g, 'according to all'],
  [/לכתחילה/g, "l'chatchila"],
  [/בדיעבד/g, "b'dieved"],
  [/מדרבנן/g, "d'rabbanan"],
  [/דרבנן/g, "d'rabbanan"],
  [/דאורייתא/g, "d'oraisa"],
  [/מה"ת/g, "d'oraisa"],
  [/אסור/g, 'forbidden'],
  [/מותר/g, 'permitted'],
  [/שרי/g, 'permitted'],
  [/חייב/g, 'liable'],
  [/פטור/g, 'exempt'],
  [/בעי/g, 'requires'],
  [/בעינן/g, 'we require'],
  [/א"צ/g, 'need not'],
  [/אין צריך/g, 'need not'],
  [/לא צריך/g, 'need not'],
  [/צריך/g, 'must'],
  [/ודאי/g, 'certainly'],
  [/ונראה/g, 'and it appears'],
  [/משמע/g, 'it appears'],
  [/מיירי/g, 'deals with'],
  [/קאי/g, 'refers to'],
  [/אשמועינן/g, 'it teaches us'],
  [/אסרינן/g, 'we forbid'],
  [/התירו/g, 'they permitted'],
  [/לא התירו/g, 'they did not permit'],
  [/מהני/g, 'helps'],
  [/לא מהני/g, 'does not help'],
  [/סגי/g, 'suffices'],
  [/לאו אדעתיה/g, 'without his knowledge'],
  [/דוחקא/g, 'pressure'],
  [/בולע/g, 'absorbs'],
  [/מקנחו/g, 'wipes it'],
  [/מוקמינן/g, 'we establish'],
  [/משערין/g, 'we estimate'],
  [/משערינן/g, 'we estimate'],
  [/מן המנין/g, 'in the count'],
  [/נפק מיניה/g, 'came out from it'],
  [/מאי דנפיק/g, 'what came out'],
  [/כמבואר/g, 'as explained'],
  [/כמש"ש/g, 'as written'],
  [/כמ"ש/g, 'as written'],
  [/כדלקמן/g, 'as below'],
  [/לקמן/g, 'below'],
  [/לעיל/g, 'above'],
  [/שם/g, 'there'],
  [/שכיח/g, 'common'],
  [/לא שכיח/g, 'uncommon'],
  [/דוקא/g, 'specifically'],
  [/אע"ג/g, 'even though'],
  [/אפי'/g, 'even'],
  [/אא"כ/g, 'unless'],
  [/מיהו/g, 'however'],
  [/ולפיכך/g, 'and therefore'],
  [/לכן/g, 'therefore'],
  [/אדרבה/g, 'on the contrary'],
  [/הוא הדין/g, 'the same law applies'],
  [/שאני/g, 'this case is different'],
  [/מה שאין כן/g, 'which is not so'],
  [/דהיינו/g, 'meaning'],
  [/כלומר/g, 'meaning'],
  [/היינו/g, 'meaning'],
  [/פירוש/g, 'Explanation:'],
  [/פי'/g, 'Explanation:'],
  [/כתב/g, 'wrote'],
  [/כ'/g, 'wrote'],
  [/וכ'/g, 'and wrote'],
  [/וכתב/g, 'and wrote'],
  [/כ"כ/g, 'so too'],
  [/וכ"כ/g, 'and so too'],
  [/עכ"ל/g, 'end of his words'],
  [/ע"ש/g, 'see there'],
  [/ע"ל/g, 'see above'],
  [/ע"ז/g, 'on this'],
  [/עמש"ש/g, 'as written above'],
  [/וכו'/g, 'etc.'],
  [/וכו/g, 'etc.'],
  [/מ"מ/g, 'nevertheless'],
  [/א"כ/g, 'if so'],
  [/נ"ל/g, 'it appears to me'],
  [/ד"ע/g, 'logical opinion'],
  [/ס"ל/g, 'he holds'],
  [/סובר/g, 'holds'],
  [/פסק/g, 'ruled'],
  [/הלכה/g, 'the halachah'],
  [/הלכתא/g, 'the halachah'],
  [/קי"ל/g, 'the halachah is'],
  [/קיימ"ל/g, 'the halachah is'],
  [/אנן/g, 'we'],
  [/לדידן/g, 'for us'],
  [/לרמ"א/g, 'for Rama'],
  [/לתוס'/g, 'for Tosafot'],
  [/לרמב"ם/g, 'for Rambam'],
  [/לרש"י/g, 'for Rashi'],
  [/חולק/g, 'disagrees'],
  [/חולקין/g, 'disagree'],
  [/תירץ/g, 'resolved'],
  [/הקשה/g, 'challenged'],
  [/פריך/g, 'challenges'],
  [/מעיין/g, 'investigates'],
  [/דו"ק/g, 'investigate'],
  [/דפשיטא/g, 'it is plain that'],
  [/דבעי/g, 'requires'],
  [/דא"צ/g, 'need not'],
  [/דאין/g, 'there is no'],
  [/דה"ה/g, 'the same applies'],
  [/דהוי/g, 'it is'],
  [/דלכך/g, 'therefore'],
  [/דלפי/g, 'according to'],
  [/דמקרי/g, 'is called'],
  [/דנדבק/g, 'that sticks'],
  [/דטעמא/g, 'for the reason'],
  [/דלא/g, 'that not'],
  [/דהא/g, 'for'],
  [/דהכי/g, 'thus'],
  [/דהוי כ/g, 'is like'],
  [/שהרב/g, 'that the Rav'],
  [/שמסירו/g, 'that one removes'],
  [/שאין/g, 'that there is no'],
  [/שאסור/g, 'that forbidden'],
  [/שמותר/g, 'that permitted'],
  [/שצריך/g, 'that must'],
  [/שכתב/g, 'that wrote'],
  [/שזכר/g, 'that mentioned'],
  [/שהם/g, 'that they are'],
  [/שהבשר/g, 'that the meat'],
  [/שהכחל/g, 'that the udder'],
  [/שהגבינה/g, 'that the cheese'],
  [/שבין/g, 'that between'],
  [/שעברו/g, 'that passed'],
  [/שלא/g, 'that not'],
  [/שיש/g, 'that there is'],
  [/שאנו/g, 'that we'],
  [/שמא/g, 'lest'],
  [/שפיר/g, 'well'],
  [/שהמתנת/g, 'that waiting'],
  [/נמי/g, 'also'],
  [/אלא/g, 'only'],
  [/אפי'/g, 'even'],
  [/אע"ג/g, 'even though'],
  [/איכא/g, 'there is'],
  [/איתא/g, 'it is found'],
  [/אמר/g, 'said'],
  [/אמרי'/g, 'they say'],
  [/אמרינן/g, 'we say'],
  [/אסרינן/g, 'we forbid'],
  [/אסורין/g, 'forbidden'],
  [/אסורה/g, 'forbidden'],
  [/אסור/g, 'forbidden'],
  [/בלשון/g, 'in language'],
  [/בלא/g, 'without'],
  [/בלא"ה/g, 'without this'],
  [/בין/g, 'between'],
  [/בתוך/g, 'within'],
  [/בת"ח/g, 'in Turei Chadash'],
  [/בשם/g, 'in the name of'],
  [/בסעודה/g, 'in a meal'],
  [/בסעוד'/g, 'in a meal'],
  [/בפה/g, 'in the mouth'],
  [/בידים/g, 'on hands'],
  [/בידיו/g, 'on his hands'],
  [/בפיו/g, 'in his mouth'],
  [/בשיניו/g, 'in his teeth'],
  [/בשינים/g, 'in teeth'],
  [/בקדרה/g, 'in a pot'],
  [/בכלי/g, 'in a vessel'],
  [/בסכין/g, 'with a knife'],
  [/בקרקע/g, 'in ground'],
  [/במים/g, 'in water'],
  [/בלילה/g, 'at night'],
  [/ביום/g, 'by day'],
  [/בהמתנת/g, 'in waiting of'],
  [/בה"מ/g, 'in Birkat HaMazon'],
  [/בב"ה/g, 'in Birkat HaMazon'],
  [/בב"י/g, 'in Beit Yosef'],
  [/בגמ'/g, 'in the Gemara'],
  [/בגמרא/g, 'in the Gemara'],
  [/בש"ס/g, 'in the Gemara'],
  [/בא"ח/g, 'in Orach Chaim'],
  [/באפיקורן/g, 'at an apikores meal'],
  [/בתחילה/g, 'at first'],
  [/בכה"ג/g, 'in such a case'],
  [/בכ"ע/g, 'according to all'],
  [/בדיעבד/g, "b'dieved"],
  [/בלכתחילה/g, "l'chatchila"],
  [/לענין/g, 'regarding'],
  [/לפי/g, 'according to'],
  [/לפיכך/g, 'therefore'],
  [/לכן/g, 'therefore'],
  [/לחתוך/g, 'to cut'],
  [/לרחצם/g, 'to wash them'],
  [/להדיח/g, 'to rinse'],
  [/להמתין/g, 'to wait'],
  [/לאכול/g, 'to eat'],
  [/לאכילה/g, 'for eating'],
  [/לגבינה/g, 'for cheese'],
  [/לבשר/g, 'for meat'],
  [/לתינוק/g, 'for a child'],
  [/לעיל/g, 'above'],
  [/לקמן/g, 'below'],
  [/לדידן/g, 'for us'],
  [/לרמ"א/g, 'for Rama'],
  [/לתוס'/g, 'for Tosafot'],
  [/מאותו/g, 'from that'],
  [/מאכילה/g, 'from eating'],
  [/מגבינה/g, 'from cheese'],
  [/מבשר/g, 'from meat'],
  [/מן המנין/g, 'in the count'],
  [/ממשו/g, 'substance'],
  [/מדינא/g, 'by law'],
  [/מנהג'/g, "custom"],
  [/מנהגין/g, 'they practice'],
  [/מנהגו/g, 'they practice'],
  [/מיירי/g, 'deals with'],
  [/מוקי/g, 'establishes'],
  [/מוקמינן/g, 'we establish'],
  [/מצא/g, 'found'],
  [/מסירו/g, 'removes it'],
  [/מושכים/g, 'draw'],
  [/מקילין/g, 'are lenient'],
  [/מחמירין/g, 'are stringent'],
  [/מברכים/g, 'recite blessing'],
  [/מכינים/g, 'prepare'],
  [/מונחים/g, 'are placed'],
  [/מניקה/g, 'nursing'],
  [/מניקת/g, 'of nursing'],
  [/מותלעת/g, 'wormy'],
  [/מעוכל/g, 'digested'],
  [/מתעכל/g, 'digested'],
  [/מתולעת/g, 'wormy'],
  [/נוהגין/g, 'they practice'],
  [/נהגו/g, 'they practice'],
  [/נראה/g, 'it appears'],
  [/נשאר/g, 'remained'],
  [/נפק/g, 'came out'],
  [/נפיק/g, 'comes out'],
  [/נוגע/g, 'touches'],
  [/נוגעין/g, 'touch'],
  [/נעצו/g, 'they stuck'],
  [/נקרע/g, 'torn'],
  [/נטילה/g, 'netilat yadayim'],
  [/נטלו/g, 'took'],
  [/נט"י/g, 'netilat yadayim'],
  [/סילק/g, 'cleared'],
  [/סילוק/g, 'clearing'],
  [/סגי/g, 'suffices'],
  [/ס"ל/g, 'he holds'],
  [/סובר/g, 'holds'],
  [/סתם/g, 'plain'],
  [/עדיין/g, 'still'],
  [/עכ"פ/g, 'in any case'],
  [/ע"ז/g, 'on this'],
  [/ע"ש/g, 'see there'],
  [/ע"ל/g, 'see above'],
  [/עושים/g, 'do'],
  [/עומדו/g, 'stood'],
  [/עמדו/g, 'stood'],
  [/הגבינה/g, 'the cheese'],
  [/הבשר/g, 'the meat'],
  [/הכחל/g, 'the udder'],
  [/הטעם/g, 'the reason'],
  [/המנהג/g, 'the custom'],
  [/הגמרא/g, 'the Gemara'],
  [/הש"ס/g, 'the Gemara'],
  [/הזוהר/g, 'the Zohar'],
  [/הפר"ח/g, 'the Peri Chadash'],
  [/הטור/g, 'the Tur'],
  [/הרב/g, 'the Rav'],
  [/הרמב"ם/g, 'the Rambam'],
  [/הר"ן/g, 'the Ran'],
  [/הרשב"א/g, 'the Rashba'],
  [/הרא"ש/g, 'the Rosh'],
  [/המהרש"ל/g, 'the Maharshal'],
  [/המהרא"י/g, 'the Maharai'],
  [/הצנועים/g, 'the scrupulous'],
  [/המחמירים/g, 'those stringent'],
  [/המקילים/g, 'the lenient'],
  [/הלועס/g, 'one who chews for a child'],
  [/האסורה/g, 'the forbidden one'],
  [/היתרא/g, 'permitted'],
  [/האי/g, 'this'],
  [/הכי/g, 'thus'],
  [/הוי/g, 'is'],
  [/הוה/g, 'was'],
  [/הוהי/g, 'was'],
  [/היתה/g, 'was'],
  [/היו/g, 'were'],
  [/היתה/g, 'was'],
  [/היתה/g, 'was'],
  [/חוזר/g, 'returns'],
  [/חוזר ואוסר/g, 'forbids again'],
  [/חשוב/g, 'considered'],
  [/חילוק/g, 'difference'],
  [/חסיד שוטה/g, 'pious fool'],
  [/תחובין/g, 'stuck'],
  [/תחתון/g, 'lower'],
  [/עליון/g, 'upper'],
  [/ראש/g, 'head'],
  [/שפוד/g, 'spit'],
  [/שפודין/g, 'spits'],
  [/לבן/g, 'to whiten'],
  [/נמלח/g, 'was salted'],
  [/צליה/g, 'roasting'],
  [/צליית/g, 'roasted'],
  [/נצלה/g, 'was roasted'],
  [/יבשה/g, 'dried'],
  [/נתייבש/g, 'dried out'],
  [/נתייבשה/g, 'dried out'],
  [/נתהפכו/g, 'were turned over'],
  [/פלט/g, 'emitted'],
  [/פלט כל/g, 'emitted all'],
  [/חלבו/g, 'its milk'],
  [/חלב/g, 'milk'],
  [/דם/g, 'blood'],
  [/כבד/g, 'liver'],
  [/כחל/g, 'udder'],
  [/גיד הנשה/g, 'gid hanasheh'],
  [/ג"ה/g, 'gid hanasheh'],
  [/בהמה/g, 'domestic animal'],
  [/חיה/g, 'wild animal'],
  [/עוף/g, 'fowl'],
  [/בהמ'/g, 'domestic animal'],
  [/אגרא/g, 'Agra'],
  [/אפיקורן/g, 'apikores meal'],
  [/סעודה אחריתא/g, 'another meal'],
  [/סעודתא/g, 'meal'],
  [/מסעודתא/g, 'from a meal'],
  [/שעתא/g, 'time'],
  [/שעתא חדא/g, 'one time'],
  [/מיכלא/g, 'food'],
  [/מאן/g, 'one who'],
  [/דאכיל/g, 'who eats'],
  [/דלא/g, 'that not'],
  [/דמתיר/g, 'that permits'],
  [/דאסר/g, 'that forbids'],
  [/דקאמר/g, 'that says'],
  [/דפריך/g, 'that challenges'],
  [/דתני/g, 'that teaches'],
  [/דמוקי/g, 'that establishes'],
  [/דלמא/g, 'lest'],
  [/דודאי/g, 'certainly'],
  [/דמשמע/g, 'that it appears'],
  [/דהכי/g, 'that thus'],
  [/דהוי כ/g, 'that is like'],
  [/דאיכא/g, 'that there is'],
  [/דאיתא/g, 'that it is found'],
  [/דקי"ל/g, 'that the halachah is'],
  [/דלדידן/g, 'that for us'],
  [/דלפי/g, 'that according to'],
  [/דבמנהג/g, 'that in custom'],
  [/דבדין/g, 'that in law'],
  [/דבת"ח/g, 'that in Turei Chadash'],
  [/דברש"י/g, 'that in Rashi'],
  [/דבגמ'/g, 'that in Gemara'],
  [/דבש"ס/g, 'that in Gemara'],
  [/דבה"מ/g, 'that in Birkat HaMazon'],
  [/דבא"ח/g, 'that in Orach Chaim'],
  [/דבזהר/g, 'that in Zohar'],
  [/דבכ"ע/g, 'that according to all'],
  [/דבדיעבד/g, "that b'dieved"],
  [/דלכתחילה/g, "that l'chatchila"],
  [/דמדרבנן/g, "that d'rabbanan"],
  [/דדאורייתא/g, "that d'oraisa"],
  [/דהרמ"א/g, 'that Rama'],
  [/דהטור/g, 'that Tur'],
  [/דהש"ך/g, 'that Shach'],
  [/דהט"ז/g, 'that Taz'],
  [/דהב"י/g, 'that Beit Yosef'],
  [/דהב"ח/g, 'that Bach'],
  [/דהרמב"ם/g, 'that Rambam'],
  [/דהר"ן/g, 'that Ran'],
  [/דהרשב"א/g, 'that Rashba'],
  [/דהרא"ש/g, 'that Rosh'],
  [/דהמהרש"ל/g, 'that Maharshal'],
  [/דהמהרא"י/g, 'that Maharai'],
  [/דהפר"ח/g, 'that Peri Chadash'],
  [/דהגמרא/g, 'that the Gemara'],
  [/דהש"ס/g, 'that the Gemara'],
  [/דהזוהר/g, 'that the Zohar'],
  [/דהמנהג/g, 'that the custom'],
  [/דהטעם/g, 'that the reason'],
  [/דהכחל/g, 'that the udder'],
  [/דהבשר/g, 'that the meat'],
  [/דהגבינה/g, 'that the cheese'],
  [/דהלועס/g, 'that one who chews for a child'],
  [/דהצנועים/g, 'that the scrupulous'],
  [/דהמחמירים/g, 'that those stringent'],
  [/דהמקילים/g, 'that the lenient'],
  [/דהאסורה/g, 'that the forbidden'],
  [/דהיתרא/g, 'that permitted'],
  [/דהאי/g, 'that this'],
  [/דהכי/g, 'that thus'],
  [/דהוי/g, 'that is'],
  [/דהוה/g, 'that was'],
  [/דהיו/g, 'that were'],
  [/דחוזר/g, 'that returns'],
  [/דחשוב/g, 'that considered'],
  [/דחילוק/g, 'that difference'],
  [/דתחובין/g, 'that stuck'],
  [/דתחתון/g, 'that lower'],
  [/דעליון/g, 'that upper'],
  [/דראש/g, 'that head'],
  [/דשפוד/g, 'that spit'],
  [/דשפודין/g, 'that spits'],
  [/דלבן/g, 'that to whiten'],
  [/דנמלח/g, 'that was salted'],
  [/דצליה/g, 'that roasting'],
  [/דצליית/g, 'that roasted'],
  [/דנצלה/g, 'that was roasted'],
  [/דיבשה/g, 'that dried'],
  [/דנתייבש/g, 'that dried out'],
  [/דנתייבשה/g, 'that dried out'],
  [/דנתהפכו/g, 'that were turned over'],
  [/דפלט/g, 'that emitted'],
  [/דחלבו/g, 'that its milk'],
  [/דחלב/g, 'that milk'],
  [/דם/g, 'blood'],
  [/דכבד/g, 'that liver'],
  [/דכחל/g, 'that udder'],
  [/דג"ה/g, 'that gid hanasheh'],
  [/דבהמה/g, 'that domestic animal'],
  [/דחיה/g, 'that wild animal'],
  [/דעוף/g, 'that fowl'],
  [/דבהמ'/g, 'that domestic animal'],
  [/דאגרא/g, 'that Agra'],
  [/דאפיקורן/g, 'that apikores meal'],
  [/דסעודה אחריתא/g, 'that another meal'],
  [/דסעודתא/g, 'that meal'],
  [/דמסעודתא/g, 'that from a meal'],
  [/דשעתא/g, 'that time'],
  [/דשעתא חדא/g, 'that one time'],
  [/דמיכלא/g, 'that food'],
  [/דמאן/g, 'that one who'],
  [/דאכיל/g, 'that eats'],
  [/דלא/g, 'that not'],
  [/דמתיר/g, 'that permits'],
  [/דאסר/g, 'that forbids'],
  [/דקאמר/g, 'that says'],
  [/דפריך/g, 'that challenges'],
  [/דתני/g, 'that teaches'],
  [/דמוקי/g, 'that establishes'],
  [/דלמא/g, 'lest'],
  [/דודאי/g, 'certainly'],
  [/דמשמע/g, 'that it appears'],
  [/דהכי/g, 'that thus'],
  [/דהוי כ/g, 'that is like'],
  [/דאיכא/g, 'that there is'],
  [/דאיתא/g, 'that it is found'],
  [/דקי"ל/g, 'that the halachah is'],
  [/דלדידן/g, 'that for us'],
  [/דלפי/g, 'that according to'],
  [/דבמנהג/g, 'that in custom'],
  [/דבדין/g, 'that in law'],
  [/דבת"ח/g, 'that in Turei Chadash'],
  [/דברש"י/g, 'that in Rashi'],
  [/דבגמ'/g, 'that in Gemara'],
  [/דבש"ס/g, 'that in Gemara'],
  [/דבה"מ/g, 'that in Birkat HaMazon'],
  [/דבא"ח/g, 'that in Orach Chaim'],
  [/דבזהר/g, 'that in Zohar'],
  [/דבכ"ע/g, 'that according to all'],
  [/דבדיעבד/g, "that b'dieved"],
  [/דלכתחילה/g, "that l'chatchila"],
  [/דמדרבנן/g, "that d'rabbanan"],
  [/דדאורייתא/g, "that d'oraisa"],
  [/דהרמ"א/g, 'that Rama'],
  [/דהטור/g, 'that Tur'],
  [/דהש"ך/g, 'that Shach'],
  [/דהט"ז/g, 'that Taz'],
  [/דהב"י/g, 'that Beit Yosef'],
  [/דהב"ח/g, 'that Bach'],
  [/דהרמב"ם/g, 'that Rambam'],
  [/דהר"ן/g, 'that Ran'],
  [/דהרשב"א/g, 'that Rashba'],
  [/דהרא"ש/g, 'that Rosh'],
  [/דהמהרש"ל/g, 'that Maharshal'],
  [/דהמהרא"י/g, 'that Maharai'],
  [/דהפר"ח/g, 'that Peri Chadash'],
];

const BAER_089 = {
  להדיח: 'To rinse',
  ובירך: 'And recited Birkat HaMazon',
  שעה: 'One hour',
  שיניו: 'His teeth',
  שיעיין: 'That he examine',
  לרחצם: 'To wash them',
  ולהדיחו: 'And to rinse it',
  עוף: 'Fowl',
  להחמיר: 'To be stringent',
  ושומן: 'And fat',
  בקדרה: 'In a pot',
  ביניהם: 'Between them',
  שמש: 'Waiter',
  נעיצה: 'Sticking',
  סכינים: 'Knives',
};

const BAER_090 = {
  עצמו: 'By itself',
  בששים: 'With sixty',
  האסורה: 'The forbidden',
  הכחל: 'The udder',
  בטיגון: 'In a pan',
  מרובה: 'Great loss',
  עדיף: 'Preferable',
  מותרים: 'Permitted',
  והתחתון: 'And the lower',
  לצלותו: 'To roast it',
  איסור: 'Prohibition',
  בדיעבד: "B'dieved",
  מותר: 'Permitted',
  במחבת: 'On a griddle',
  נתייבש: 'Dried out',
  חומרה: 'Stringency',
  לחתוך: 'To cut',
  בשפוד: 'On a spit',
  צלויה: 'Roasted',
  כדינו: 'As required',
  גומות: 'Pockets',
  כבוש: 'Pickled',
  הבשר: 'The meat',
  שמתיר: 'That permits',
  בענין: 'In the matter',
  למלחו: 'To salt it',
};

function stripHtml(h) {
  return String(h)
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<small>/g, '')
    .replace(/<\/small>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .trim();
}

function polish089(heb) {
  let s = stripHtml(heb);
  const bracketed = /^\["/.test(s.trim());
  if (bracketed) s = s.replace(/^\[\"/, '').replace(/\"\]$/, '').trim();
  for (const [re, to] of EXTRA_REPS) s = s.replace(re, to);
  for (let i = 0; i < 3; i++) s = applyPhrases(s);
  s = s.replace(/\s+/g, ' ').trim();
  return bracketed ? `["${s}"]` : s;
}

function fullTranslate(heb) {
  return polish089(heb);
}

function translateBaer(heb, sim) {
  const map = sim === '089' ? BAER_089 : BAER_090;
  const h = stripHtml(heb);
  const m = h.match(/^([^.]+)\.\s*(.*)$/s);
  if (!m) return fullTranslate(h);
  const lead = map[m[1].trim()] || fullTranslate(m[1].trim());
  let body = fullTranslate(m[2]);
  body = body.replace(/^פי' /, 'Explanation: ').replace(/^כ' /, 'wrote ');
  return `${lead}. ${body}`;
}

function translateBeer(heb) {
  const h = stripHtml(heb);
  if (/^מימרא דרב חסדא/.test(h))
    return 'Statement of Rav Chisda — Chullin daf 105.';
  if (/^הרמב"ם בפ"ט/.test(h))
    return 'Rambam chapter 9 of Forbidden Foods and Rashba in Torat HaBayit and in name of great authors, end of section.';
  if (/^שם בגמ' כמר עוקבא/.test(h))
    return 'There in the Gemara like Mar Ukva and as Rosh and Rambam explain there.';
  if (/^כרב חסדא שם/.test(h)) return 'Like Rav Chisda there.';
  if (/^טור:?$/.test(h)) return 'Tur.';
  if (/^כפשטא דר' יוחנן/.test(h))
    return "Like the plain meaning of R' Yochanan to R' Asi there.";
  if (/^כר' יצחק בריה דרב משרשיא/.test(h))
    return 'Like Rav Yitzchak son of Rav Mesharshia there daf 104.';
  if (/^שם בגמרא מדיוקא/.test(h))
    return 'There in the Gemara from the precision of the tanna of Agra, etc.';
  if (/^מימרא דר' זירא/.test(h)) return "Statement of R' Zeira there.";
  if (/^מסקנת הגמרא/.test(h)) return 'Conclusion of the Gemara there.';
  if (/^משנה/.test(h)) {
    return fullTranslate(
      h.replace(/^משנה/, 'Mishnah').replace(/חולין/, 'Chullin'),
    );
  }
  if (/^בריית/.test(h)) return 'Baraita there.';
  if (/^גמ' כנ"ל/.test(h)) return 'Gemara as above.';
  if (/^ירושלמי/.test(h))
    return fullTranslate(h.replace(/^ירושלמי/, 'Yerushalmi'));
  if (/^מהירושלמי/.test(h)) return 'From the Yerushalmi.';
  if (/^כמש"ש/.test(h)) return fullTranslate(h.replace(/^כמש"ש/, 'As written'));
  if (/^כמ"ש/.test(h)) return fullTranslate(h.replace(/^כמ"ש/, 'As written'));
  if (/^כפי'/.test(h)) return fullTranslate(h.replace(/^כפי'/, 'As explained'));
  if (/^תוס'/.test(h)) return fullTranslate(h.replace(/^תוס'/, 'Tosafot'));
  if (/^ל"ד/.test(h)) return fullTranslate(h.replace(/^ל"ד/, 'Some say'));
  if (/^ב"י/.test(h)) return fullTranslate(h.replace(/^ב"י/, 'Beit Yosef'));
  if (/^רש"י/.test(h)) return fullTranslate(h.replace(/^רש"י/, 'Rashi'));
  if (/^הרשב"א/.test(h)) return 'Rashba there.';
  if (/^הרא"ש/.test(h)) return 'Rosh there.';
  if (/^הר"ן/.test(h)) return 'Ran there.';
  if (/^שם/.test(h) && h.length < 80) return 'There.';
  if (/^טור בשם/.test(h)) return fullTranslate(h);
  if (/^תשובו'/.test(h)) return fullTranslate(h.replace(/^תשובו'/, 'Responsum'));
  return fullTranslate(h);
}

function translateGra(heb) {
  return polish089(heb);
}

function translateSiftei(heb) {
  return polish089(heb);
}

function translateKaf(heb, sim) {
  const n = heb.match(/^\(([א-ת])\)/)?.[1];
  const ord = { א: '1', ב: '2', ג: '3', ד: '4', ה: '5', ו: '6', ז: '7', ח: '8', ט: '9', י: '10' }[n] || '';
  const body = polish089(heb.replace(/^\([א-ת]\)\s*/, ''));
  return ord ? `(${ord}) ${body.replace(/^\[[\"']?/, '').replace(/[\"']?\]$/, '')}` : body;
}

function translateNekudot(heb, sim) {
  const t = stripHtml(heb);
  const simRef = sim === '089' ? 'siman 89' : 'siman 90';
  return fullTranslate(
    t
      .replace(/סימן פ"ט/, simRef)
      .replace(/סימן צ'/, simRef)
      .replace(/סק"(\d+)/g, 's.k. $1'),
  );
}

function translateMateh(heb) {
  return polish089(heb);
}

function translateRae(heb) {
  return polish089(heb);
}

function translateBlock(slug, heb, sim, key) {
  const HANDLERS = sim === '089' ? HANDLERS_089 : HANDLERS_090;
  if (HANDLERS[slug]?.[key]) return HANDLERS[slug][key];
  switch (slug) {
    case 'beer-hagolah':
      return translateBeer(heb);
    case 'baer-heitev':
      return translateBaer(heb, sim);
    case 'pitchei-teshuva':
      return polish089(heb);
    case 'beur-hagra':
      return sim === '090' ? polish089(heb) : translateGra(heb);
    case 'siftei-kohen':
      return sim === '090' ? polish089(heb) : translateSiftei(heb);
    case 'kaf-hachayim':
      return translateKaf(heb, sim);
    case 'nekudot-hakesef':
      return translateNekudot(heb, sim);
    case 'mateh-yehonatan':
    case 'yad-avraham':
    case 'yad-ephraim':
    case 'rabbi-akiva-eiger-yd':
    case 'peleti':
    case 'kereti':
    case 'turei-zahav':
      return polish089(heb);
    default:
      return polish089(heb);
  }
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function loadOverrides(sim) {
  for (const name of [`_overrides-${sim}.json`, `_manual-${sim}.json`]) {
    const p = path.join(WORK, name);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
  }
  return {};
}

function buildSiman(sim) {
  const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
  const manual = loadOverrides(sim);
  const HANDLERS = sim === '089' ? HANDLERS_089 : HANDLERS_090;
  const TRANSLATIONS = {};

  for (const slug of Object.keys(heb).sort()) {
    TRANSLATIONS[slug] = {};
    for (const [key, entry] of Object.entries(heb[slug])) {
      if (manual[slug]?.[key]) {
        TRANSLATIONS[slug][key] = manual[slug][key];
      } else if (HANDLERS[slug]?.[key]) {
        TRANSLATIONS[slug][key] = HANDLERS[slug][key];
      } else if (slug === 'mechaber' && mechaberAll[sim]?.mechaber?.[key]) {
        TRANSLATIONS[slug][key] = mechaberAll[sim].mechaber[key];
      } else {
        TRANSLATIONS[slug][key] = translateBlock(slug, entry.heb, sim, key);
      }
    }
  }

  const outPath = path.join(WORK, `_patch-siman-${sim}-translations.mjs`);
  let out = `/** Full translations siman ${sim} — from _hebrew-${sim}.json + _manual-${sim}.json */\nexport const TRANSLATIONS = {\n`;
  for (const slug of Object.keys(TRANSLATIONS)) {
    out += `  '${slug}': {\n`;
    for (const [key, val] of Object.entries(TRANSLATIONS[slug])) {
      out += `    '${key}': \`${esc(val)}\`,\n`;
    }
    out += `  },\n`;
  }
  out += `};\n`;
  fs.writeFileSync(outPath, out);

  const n = Object.values(TRANSLATIONS).reduce((a, m) => a + Object.keys(m).length, 0);
  const hebLeft = Object.values(TRANSLATIONS)
    .flatMap((m) => Object.values(m))
    .filter((v) => /[\u0590-\u05FF]/.test(v)).length;
  console.log(`Wrote ${outPath} — ${n} blocks, ${hebLeft} still contain Hebrew`);
  return { n, hebLeft };
}

const arg = process.argv[2] || 'both';
const sims = arg === 'both' ? ['089', '090'] : [arg.padStart(3, '0')];
let total = 0;
let hebTotal = 0;
for (const sim of sims) {
  const { n, hebLeft } = buildSiman(sim);
  total += n;
  hebTotal += hebLeft;
}
console.log(`Total: ${total} blocks, ${hebTotal} with Hebrew remaining`);

export {
  translateBlock,
  polish089,
  stripHtml,
  fullTranslate,
  buildSiman,
  esc,
  EXTRA_REPS,
};
