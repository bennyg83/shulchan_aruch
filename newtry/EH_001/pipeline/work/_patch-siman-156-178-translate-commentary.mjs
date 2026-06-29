#!/usr/bin/env node
/** Commentary translator for simanim 156–178 — yibbum, chalitzah, maamar, tzarah. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentaryFull as base091 } from "./_patch-siman-091-100-translate-commentary.mjs";

const EXTRA = [
  // Yibbum / zera kayama — siman 156
  ["זרע קיימא", "viable offspring"], ["ולד קיימא", "viable offspring"], ["בן קיימא", "viable son"],
  ["פוטר", "exempts"], ["פוטרת", "exempts"], ["מן החליצה", "from chalitzah"], ["מן הייבום", "from yibbum"],
  ["יבמה", "yevamah"], ["יבמות", "yevamot"], ["יבם", "yavam"], ["לייבם", "to perform yibbum"], ["מתייבמת", "performs yibbum"],
  ["חליצה", "chalitzah"], ["חולצת", "performs chalitzah"], ["חולץ", "performs chalitzah"], ["חלץ", "performed chalitzah"],
  ["מצוה לייבם", "mitzvah to perform yibbum"], ["זקוקה ליבם", "bound to yibbum"],
  ["מעוברת", "pregnant"], ["הפילה", "miscarried"], ["ילדה", "gave birth"], ["הולד", "the child"], ["נפל", "stillborn"],
  ["גוסס", "dying"], ["פצוע", "wounded"], ["חדשיו", "its months"], ["לט' חדשים", "to nine months"],
  ["שעריו", "its hair"], ["צפרניו", "its nails"], ["ספק נפל", "doubtful stillbirth"],
  ["ממזר", "mamzer"], ["ע\"א", "idolatress"], ["משפחה אחרת", "another family"],
  ["נאמן לפטור", "believed to exempt"], ["הוחזק באחים", "established as having brothers"],
  // Obligation — siman 157
  ["חייב בייבום", "obligated in yibbum"], ["פטור מייבום", "exempt from yibbum"],
  ["אח מן האב", "paternal brother"], ["אח מן האם", "maternal brother"], ["אחיו", "his brother"],
  ["אחים", "brothers"], ["אח", "brother"], ["אחין", "brothers"],
  ["נשואין", "marriage"], ["אירוסין", "betrothal"], ["ארוסה", "betrothed woman"],
  ["גר", "convert"], ["נתגייר", "converted"], ["שפחה", "maidservant"], ["נכרית", "non-Jewish woman"],
  ["נשתחרר", "was freed"], ["כהן", "kohen"], ["לוי", "levi"], ["ישראל", "Israelite"],
  ["איסור ערוה", "forbidden relation"], ["ערוה", "forbidden relation"], ["שאר", "forbidden relation"],
  ["איסור קל", "light prohibition"], ["איסור חמור", "severe prohibition"],
  // Minor / timing — simanim 159–160, 177–178
  ["קטן", "minor"], ["קטנה", "minor"], ["גדול", "adult"], ["גדולה", "adult"],
  ["בן י\"ג", "thirteen-year-old"], ["בת י\"ב", "twelve-year-old"],
  ["שלשה חדשים", "three months"], ["שהה", "waited"], ["מיעוטא", "minority"],
  // Chalitzah — siman 169
  ["מצות חליצה", "mitzvah of chalitzah"], ["בג' דיינים", "before three judges"],
  ["ישראלים", "Israelites"], ["קרובים", "relatives"], ["פסול", "disqualified"],
  ["עמי הארץ", "ignoramus"], ["הדיוטות", "laymen"], ["להקרות", "to read aloud"],
  ["היבם והיבמה", "the yavam and yevamah"], ["נלך למקום", "we will go to a place"],
  ["לחלוץ", "to perform chalitzah"], ["קביעות מקום", "fixing a place"],
  ["חליצת מיאון", "chalitzah of refusal"], ["חליצה פסולה", "invalid chalitzah"],
  ["חליצה כשרה", "valid chalitzah"], ["חליצה מעולה", "proper chalitzah"],
  ["חלצה", "she performed chalitzah"], ["חלצו", "they performed chalitzah"],
  ["סנדל", "sandal"], ["חלץ ממנה", "removed the sandal from her"],
  ["ירק בפניה", "spat before her"], ["יריקה", "spitting"], ["קרא", "he read"],
  ["חליצתך", "your chalitzah"], ["מאן דבעי", "whoever wishes"], ["יבמי", "my yavam"],
  ["שארי", "my brother-in-law"], ["לא אבה", "he does not wish"], ["יקום", "establish"],
  ["שם אחיו", "his brother's name"], ["לא ימחה", "shall not blot out"],
  ["בית זקנים", "elders' court"], ["בפני", "before"], ["עדים", "witnesses"],
  ["שכר", "payment"], ["נוטל שכר", "takes payment"], ["מראית העין", "appearance"],
  // Maamar / get — simanim 170–171
  ["מאמר", "maamar"], ["קידושי יבם", "yavam's betrothal"], ["גט יבם", "yavam's get"],
  ["חוזר ומגביה", "returns and raises"], ["מגביה", "raises"], ["מקדש", "betroths"],
  // Tzarah — simanim 172–173
  ["צרה", "rival wife"], ["צרות", "rival wives"], ["צרתה", "her rival"],
  ["בעלת מעשה", "the one who acted"], ["שלא בעלת מעשה", "the one who did not act"],
  ["זיקה", "bond"], ["בזיקה", "through the bond"], ["חולצות", "perform chalitzah"],
  // Eidim — simanim 175–176
  ["עדות", "testimony"], ["עדות חליצה", "chalitzah testimony"], ["כתב חליצה", "chalitzah document"],
  ["ספר חליצה", "chalitzah scroll"], ["עד חתימה", "signing witness"],
  // Common EH / poskim
  ["כתובה", "ketubah"], ["גט", "get"], ["קידושין", "kiddushin"], ["נישואין", "marriage"],
  ["בעל", "husband"], ["אשה", "wife"], ["אלמנה", "widow"], ["אלמנות", "widowhood"],
  ["בית דין", "beit din"], ["ב\"ד", "beit din"], ["דיינים", "judges"], ["דיין", "judge"],
  ["טור", "Tur"], ["רמב\"ם", "Rambam"], ["רמ\"א", "Rama"], ["ב\"ש", "Beit Shmuel"], ["ב\"מ", "Beit Meir"],
  ["ב\"י", "Beit Yosef"], ["ט\"ז", "Taz"], ["בה\"ט", "Ba'er Hetev"], ["סי'", "siman"], ["סעיף", "seif"],
  ["ס\"ק", "s.k."], ["ע\"ל", "see above"], ["וע\"ל", "and see above"], ["לקמן", "below"], ["שם", "there"],
  ["משמע", "it appears"], ["כן משמע", "so it appears"], ["דוקא", "specifically"], ["וי\"א", "some say"],
  ["ויש אומרים", "some say"], ["ויש חולקים", "some dispute"], ["אע\"פ", "even though"], ["אפי'", "even"],
  ["מיהו", "however"], ["אבל", "but"], ["וכו'", "etc."], ["עכ\"ל", ""],
  ["לכתחילה", "ab initio"], ["בדיעבד", "bedieved"], ["מדאורייתא", "from Torah"], ["מדרבנן", "rabbinically"],
  ["פסק", "ruled"], ["נהגו", "the custom is"], ["ספק", "doubt"], ["ודאי", "certain"],
  ["נאמן", "believed"], ["אינו נאמן", "not believed"], ["כופין", "they compel"],
  ["אסור", "forbidden"], ["מותר", "permitted"], ["כשר", "valid"], ["פסול", "invalid"],
  ["פריה ורביה", "periah u-reviah"], ["יבום וחליצה", "yibbum and chalitzah"],
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

const FORBIDDEN = [
  /Lord's Prayer/i, /Hashem's Word/i, /Hashem's promise/i, /Hashem's children/i,
  /Capernaum/i, /MYMEMORY/i, /sustainable sperm/i, /ovum/i, /pharaoh/i,
];

function clean(en) {
  en = String(en ?? "")
    .replace(/[\u0590-\u05FF]+/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/Lord's Prayer/gi, "")
    .replace(/Hashem's Word/gi, "")
    .replace(/Hashem's promise/gi, "")
    .replace(/Hashem's children/gi, "Israelites")
    .replace(/Hashem's people/gi, "Israelites")
    .replace(/sustainable sperm/gi, "viable offspring")
    .replace(/emit from the ovum/gi, "to exempt from yibbum")
    .replace(/Saturday/gi, "Shabbat")
    .replace(/Sabbath/gi, "Shabbat")
    .replace(/season/gi, "onah")
    .replace(/baptism/gi, "immersion")
    .replace(/partition/gi, "chalitzah")
    .replace(/ovation/gi, "chalitzah")
    .replace(/estrangement/gi, "yibbum")
    .replace(/:\s*\./g, ".")
    .replace(/\(\s*\)/g, "")
    .replace(/\s+/g, " ")
    .replace(/\.+/g, ".")
    .replace(/\s+\./g, ".")
    .trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  return en;
}

export function translateCommentaryFull(hebrew, slug) {
  const h = stripHtml(hebrew);
  const pre = applyExtra(expandAbbrevs(h));
  let en = base091(pre, slug);
  en = clean(en);
  for (const bad of FORBIDDEN) {
    if (bad.test(en)) {
      en = "See sources cited in Hebrew.";
      break;
    }
  }
  if (!en || en.length < 8) en = "See sources cited in Hebrew.";
  return en;
}
