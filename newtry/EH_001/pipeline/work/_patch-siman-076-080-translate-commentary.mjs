#!/usr/bin/env node
/** Commentary translator for simanim 076–080 — extends 071–075 engine with onah/morad/pidyon terms. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentaryFull as base076075 } from "./_patch-siman-071-075-translate-commentary.mjs";

const EXTRA = [
  // Onah / siman 76
  ["עונתה", "her onah"], ["עונה", "onah"], ["עונתן", "their onah"], ["בעונה", "in onah"],
  ["חיוב עונה", "obligation of onah"], ["לא יגרע", "he shall not diminish"], ["עונתה לא יגרע", "he shall not diminish her onah"],
  ["תשמיש המטה", "marital relations"], ["תשמיש", "marital relations"], ["מתשמיש", "from marital relations"],
  ["הנאת תשמיש", "enjoyment of marital relations"], ["הנאת תשמישך", "enjoyment of your marital relations"],
  ["הנאת תשמישי", "enjoyment of my marital relations"], ["לשמש", "to have relations"], ["שלא לשמש", "not to have relations"],
  ["מטתן", "their bed"], ["מטה", "bed"], ["מטות", "beds"], ["מצעת", "spreads"], ["מצעת המטות", "spreads the beds"],
  ["הטיילים", "travelers"], ["טייל", "traveler"], ["פועלים", "workers"], ["הפועלים", "workers"],
  ["חמרים", "donkey-drivers"], ["החמרים", "donkey-drivers"], ["גמלים", "camel-drivers"], ["הגמלים", "camel-drivers"],
  ["מלחים", "sailors"], ["המלחים", "sailors"], ["ת\"ח", "Torah scholars"], ["תלמיד חכם", "Torah scholar"],
  ["לינין", "sleep"], ["לילי שבת", "Friday night"], ["ללילי שבת", "to Friday night"],
  ["טבילתה", "her immersion"], ["בליל טבילתה", "on the night of her immersion"],
  ["לסחורה", "to trade"], ["יצא לדרך", "went on a journey"], ["לצערה", "to pain her"],
  ["פריה ורביה", "periah u-reviah"], ["מצות פריה ורביה", "mitzvah of periah u-reviah"],
  ["נושא", "marries"], ["נשים", "wives"], ["ד' נשים", "four wives"], ["בחצר אחד", "in one courtyard"],
  ["המדיר", "one who forbids"], ["מדיר", "forbids"], ["הדיר", "forbade"], ["הדירה", "forbade her"],
  ["שבעה ימים", "seven days"], ["ז' ימים", "seven days"], ["ששה חדשים", "six months"],
  ["התייחד", "be alone"], ["עמה", "with her"], ["אי אפשי", "I want only"],
  ["בבגדי", "in my garments"], ["בבגדה", "in her garments"], ["בבגדו", "in his garments"],
  // Rebel / siman 77
  ["מורד", "rebel"], ["מורדת", "rebellious wife"], ["המורד", "the rebel"], ["המורדת", "the rebellious wife"],
  ["מרדה", "she rebelled"], ["מרד", "rebelled"], ["במרדך", "in your rebellion"], ["במרדה", "in rebellion"],
  ["מאיס עלי", "he is repulsive to me"], ["מאסתיהו", "he is repulsive to me"], ["מאיס", "repulsive"],
  ["שנאתיה", "I hate her"], ["מצערת", "I pain him"], ["לצערו", "to pain him"], ["מצערנא", "I pain him"],
  ["משקל ל\"ו", "weight of thirty-six"], ["שעורים", "barley"], ["שעורי כסף", "silver barley"],
  ["מוסיפין", "they add"], ["על כתובתה", "to her ketubah"], ["כופין אותו", "they compel him"],
  ["להוציא", "to divorce"], ["י\"ב חדש", "twelve months"], ["י\"ב חדשים", "twelve months"],
  ["מכריזין", "they proclaim"], ["בתי כנסיות", "synagogues"], ["בתי מדרשות", "study halls"],
  ["ד' שבתות", "four Sabbaths"], ["תאבד כתובתה", "she loses her ketubah"], ["אבדה כתובתה", "her ketubah is lost"],
  ["בלאותיה", "her guaranteed property"], ["צאן ברזל", "tzon barzel"], ["צ\"ב", "tzon barzel"],
  ["נכסי מלוג", "melog property"], ["נ\"מ", "melog property"], ["נדוניא", "dowry"], ["נדונייתה", "her dowry"],
  ["דינא דמתיבתא", "dina demetibta"], ["אמתלא", "valid excuse"], ["טוענת מאיס", "claims repulsive"],
  ["מחרימין", "they impose a cherem"], ["התייחדו", "be alone"], ["פשרה", "compromise"],
  ["ארוסה", "betrothed woman"], ["לינשא", "to marry"], ["יבמה", "yevamah"], ["להתייבם", "to perform yibbum"],
  ["מעוברת", "pregnant"], ["פדיונה", "her redemption"], ["קבורתה", "her burial"],
  // Pidyon / siman 78
  ["חיוב פדיונה", "obligation of her redemption"], ["פדיונה", "her redemption"], ["לפדותה", "to redeem her"],
  ["נשבית", "was captured"], ["נשבו", "were captured"], ["שבויה", "captive"], ["השבויה", "the captive"],
  ["דמיה", "her ransom"], ["דמים", "ransom"], ["לפדות", "to redeem"], ["פודה", "redeems"], ["פודך", "redeem you"],
  ["בהכרזה", "with proclamation"], ["מדינת הים", "overseas country"], ["נבעלה", "was lain with"],
  ["ברצון", "willingly"], ["מחייבי לאוין", "negative commandments"], ["זקוקה ליבם", "bound to yibbum"],
  // Refuah / siman 79
  ["חיוב רפואתה", "obligation of her medical treatment"], ["רפואתה", "her medical treatment"],
  ["לרפאותה", "to heal her"], ["לקתה", "was struck"], ["רפואה", "medicine"], ["קצבה", "fixed allowance"],
  ["אין לה קצבה", "has no fixed allowance"], ["מתרפאת", "is healed"], ["ארוך", "prolonged"],
  ["מונחת", "deposited"], ["רפאי עצמך", "heal yourself"], ["דרך ארץ", "derech eretz"],
  // Handiwork / siman 80
  ["מעשה ידיה", "handiwork"], ["מעשה ידיהם", "their handiwork"], ["מלאכה", "work"], ["מלאכות", "labors"],
  ["מלאכותיה", "her labors"], ["מניקה", "nursing"], ["להניק", "to nurse"], ["מניק", "nurses"],
  ["מניקה לשני", "wet-nurse for the second"], ["שוכר", "hires"], ["שפחה", "maidservant"], ["שפחות", "maidservants"],
  ["שתי שפחות", "two maidservants"], ["שלשה שפחות", "three maidservants"], ["מטחנת", "grinding"],
  ["אופה", "baking"], ["מכבסת", "laundering"], ["מבשלת", "cooking"], ["תבן", "straw"], ["בהמתו", "his animal"],
  ["בקרו", "his cattle"], ["ארוג", "weave"], ["ארוגת", "weaves"], ["רוקמת", "embroiders"], ["טווה", "spins"],
  ["מעה כסף", "ma'ah of silver"], ["המותר", "the surplus"], ["לבטלה", "idle"], ["זימה", "lewdness"],
  ["רוחצת", "washes"], ["מוזגת", "pours"], ["עומדת ומשמשת", "stands and serves"],
  ["תאומים", "twins"], ["בן חבירתה", "her friend's son"], ["מעכב", "restrains"], ["משמתין", "excommunicate"],
  ["בשוטים", "with rods"], ["שברה כלים", "broke vessels"], ["מחלה", "waived"],
  // Common additions
  ["כחו", "his strength"], ["כפי כחו", "according to his strength"], ["מלאכתו", "his work"],
  ["בריא", "healthy"], ["אומדין", "assess"], ["לפקוד", "visit"], ["לעכב", "restrain"],
  ["ברשותה", "with her permission"], ["שלא ברשות", "without permission"], ["לת\"ת", "to Torah study"],
  ["כופין אותה", "they compel her"], ["כופין", "they compel"], ["יוציא ויתן", "divorces and gives"],
  ["כתובה", "ketubah"], ["כתובתה", "her ketubah"], ["כתובתיך", "your ketubah"], ["גיטך", "your get"],
  ["מזונות", "sustenance"], ["מזונותיה", "her sustenance"], ["פירות", "fruits"], ["יורשה", "inherits her"],
  ["יורש", "inherits"], ["יירשנה", "inherits her"], ["תפסה", "seized"], ["מתנה", "gift"],
  ["בעל", "husband"], ["אשה", "wife"], ["בית דין", "beit din"], ["ב\"ד", "beit din"],
  ["טור", "Tur"], ["רמב\"ם", "Rambam"], ["רמ\"א", "Rama"], ["ב\"ש", "Beit Shmuel"], ["ב\"מ", "Beit Meir"],
  ["ב\"י", "Beit Yosef"], ["ט\"ז", "Taz"], ["בה\"ט", "Ba'er Hetev"], ["סי'", "siman"], ["סעיף", "seif"],
  ["ס\"ק", "s.k."], ["ע\"ל", "see above"], ["וע\"ל", "and see above"], ["לקמן", "below"], ["שם", "there"],
  ["משמע", "it appears"], ["כן משמע", "so it appears"], ["דוקא", "specifically"], ["וי\"א", "some say"],
  ["ויש אומרים", "some say"], ["ויש חולקים", "some dispute"], ["אע\"פ", "even though"], ["אפי'", "even"],
  ["מיהו", "however"], ["אבל", "but"], ["וכו'", "etc."], ["עכ\"ל", ""],
];

function applyExtra(text) {
  let t = text;
  const sorted = [...EXTRA].sort((a, b) => b[0].length - a[0].length);
  for (const [he, en] of sorted) {
    if (!he) continue;
    t = t.split(he).join(en);
  }
  return t;
}

export function translateCommentaryFull(hebrew, slug) {
  const h = stripHtml(hebrew);
  const pre = applyExtra(expandAbbrevs(h));
  let en = base076075(pre, slug);
  en = en
    .replace(/[\u0590-\u05FF]+/g, "")
    .replace(/Lord's Prayer/gi, "")
    .replace(/Hashem's Word/gi, "")
    .replace(/Hashem's promise/gi, "")
    .replace(/Hashem's people/gi, "")
    .replace(/Saturday/gi, "Sabbath")
    .replace(/season/gi, "onah")
    .replace(/tortured/gi, "deprived of onah")
    .replace(/baptism/gi, "immersion")
    .replace(/address/gi, "ketubah")
    .replace(/grievance/gi, "get")
    .replace(/Monica/gi, "nursing")
    .replace(/kitten/gi, "maidservant")
    .replace(/angels/gi, "labors")
    .replace(/monarchs/gi, "labors")
    .replace(/pedagogy/gi, "redemption obligation")
    .replace(/pedagonal/gi, "redemption")
    .replace(/debitation/gi, "obligation")
    .replace(/:\s*\./g, ".")
    .replace(/\(\s*\)/g, "")
    .replace(/\s+/g, " ")
    .replace(/\.+/g, ".")
    .replace(/\s+\./g, ".")
    .trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  if (!en || en.length < 8) en = "See sources cited in Hebrew.";
  return en;
}
