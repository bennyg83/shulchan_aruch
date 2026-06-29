#!/usr/bin/env node
/** EH038 commentary translator — expands abbrevs, maps halachic phrases, no MT garbage. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";

const PHRASE = [
  ["המקדש על תנאי", "betrothal on condition"],
  ["דיני תנאי", "laws of conditions"],
  ["תנאי", "condition"],
  ["תנאים", "conditions"],
  ["מעכשיו", "from now"],
  ["על מנת", "on condition"],
  ["ע\"מ", "on condition"],
  ["מקודשת", "betrothed"],
  ["מקודש", "betrothed"],
  ["קידושין", "kiddushin"],
  ["קדושין", "kiddushin"],
  ["הקדושין", "the kiddushin"],
  ["גט", "get"],
  ["פרוטה", "perutah"],
  ["מנה", "maneh"],
  ["בית כור עפר", "beit kor of dirt"],
  ["חליצה", "chalitzah"],
  ["יבם", "yavam"],
  ["יבמה", "yevamah"],
  ["שאר וכסות", "food and clothing"],
  ["עונה", "marital duty"],
  ["כפול", "doubled"],
  ["הן קודם ללאו", "affirmative before negative"],
  ["קודם למעשה", "before the act"],
  ["אפשר לקיימו", "possible to fulfill"],
  ["למפרע", "retroactively"],
  ["ספק", "doubt"],
  ["ודאי", "certainly"],
  ["בודאי", "certainly"],
  ["מספק", "doubtfully"],
  ["לחומרא", "stringently"],
  ["לקולא", "leniently"],
  ["לכתחילה", "ab initio"],
  ["בדיעבד", "bedieved"],
  ["עדים", "witnesses"],
  ["עד", "witness"],
  ["שליח", "agent"],
  ["התנה", "stipulated"],
  ["ביטל התנאי", "nullified the condition"],
  ["נתקיים התנאי", "the condition was fulfilled"],
  ["אינה מקודשת", "she is not betrothed"],
  ["הרי זו מקודשת", "behold she is betrothed"],
  ["כתובה", "ketubah"],
  ["חופה", "chuppah"],
  ["בן עיר", "town dweller"],
  ["בן כרך", "city dweller"],
  ["כהן", "kohen"],
  ["כהנת", "kohenet"],
  ["לוי", "levi"],
  ["לויה", "levite woman"],
  ["ממזר", "mamzer"],
  ["נתין", "natin"],
  ["צדיק", "righteous"],
  ["רשע", "wicked"],
  ["עשיר", "rich"],
  ["עני", "poor"],
  ["תלמיד", "student"],
  ["חכם", "sage"],
  ["גבור", "mighty"],
  ["משנה", "Mishnah"],
  ["גמרא", "Gemara"],
  ["גמ'", "Gemara"],
  ["ברייתא", "baraita"],
  ["בריי'", "baraita"],
  ["תוס'", "Tosafot"],
  ["תוספות", "Tosafot"],
  ["פרק", "chapter"],
  ["סימן", "siman"],
  ["סעיף", "seif"],
  ["ס\"ק", "s.k."],
  ["עיין", "see"],
  ["עי'", "see"],
  ["וע\"ש", "and see there"],
  ["עכ\"ל", ""],
  ["וכו'", "etc."],
  ["משמע", "it appears"],
  ["מבואר", "it is clear"],
  ["פירוש", "meaning"],
  ["פי'", "meaning"],
  ["צ\"ע", "uncertain"],
  ["ק\"ק", "question"],
  ["ונ\"ל", "and it seems to me"],
  ["לפ\"ז", "therefore"],
  ["אבל", "but"],
  ["ואם", "and if"],
  ["מיהו", "however"],
  ["אמנם", "however"],
  ["דהיינו", "meaning"],
  ["כלומר", "meaning"],
  ["היינו", "meaning"],
  ["שם", "there"],
  ["כ\"כ", "likewise"],
  ["וכ\"כ", "and likewise"],
  ["ג\"כ", "also"],
  ["אף", "also"],
  ["אפילו", "even"],
  ["דוקא", "specifically"],
  ["סתם", "plainly"],
  ["בפירוש", "explicitly"],
  ["בלבו", "in his heart"],
  ["בלבה", "in her heart"],
  ["הטעתו", "deceived him"],
  ["הטעתה", "deceived her"],
  ["שינה השליח", "the agent changed it"],
  ["לשלטון", "to the authorities"],
  ["כפועל", "as a laborer"],
  ["בשכר", "as wages"],
  ["מלוה", "loan"],
  ["בעל חוב", "creditor"],
  ["משועבדת", "collateralized"],
  ["עסקא", "business venture"],
  ["בקעים", "valleys"],
  ["סלעים", "rocks"],
  ["בור", "pit"],
  ["זריעה", "sowing"],
  ["תרגום אונקלוס", "Targum Onkelos"],
  ["תורה נביאים וכתובים", "Torah, Prophets, and Writings"],
  ["מדרשי התלמוד", "Talmudic midrashim"],
  ["הלכות החג", "laws of the festival"],
  ["כדי דיבור", "time of an utterance"],
  ["אגרת מרד", "rebellious wife document"],
  ["בעל נפש", "scrupulous man"],
  ["קום ועשה", "active fulfillment"],
  ["שב ואל תעשה", "passive condition"],
  ["חוץ מפלוני", "except for so-and-so"],
  ["מותרת לפלוני", "permitted to so-and-so"],
  ["אשת איש", "married woman"],
  ["הרהר תשובה", "contemplated repentance"],
  ["ע\"א", "idolatry"],
  ["בושם", "perfumer"],
  ["בורסקי", "tanner"],
  ["ימחה", "protest"],
  ["מיחה", "protested"],
  ["שתק", "was silent"],
  ["אמר הן", "said yes"],
  ["איני רוצה", "I do not consent"],
  ["מלמדין את האב", "we instruct the father"],
  ["בני גד ובני ראובן", "sons of Gad and sons of Reuben"],
  ["תנאי בני גד", "condition of the sons of Gad"],
  ["ד' דברים", "four elements"],
  ["ד\"ת", "doubled formulation"],
  ["ת\"כ", "doubled formulation"],
  ["תכ\"ד", "within the time of an utterance"],
  ["תוך כדי דיבור", "within the time of an utterance"],
  ["הרא\"ש", "Rosh"],
  ["הטור", "Tur"],
  ["הרמב\"ם", "Rambam"],
  ["הר\"ן", "Ran"],
  ["הרשב\"א", "Rashba"],
  ["הרמב\"ן", "Ramban"],
  ["רש\"י", "Rashi"],
  ["רמ\"א", "Rama"],
  ["ב\"י", "Beit Yosef"],
  ["ב\"ש", "Beit Shmuel"],
  ["ב\"ח", "Bach"],
  ["ב\"מ", "Beit Meir"],
  ["בה\"י", "Be'er Heitev"],
  ["ט\"ז", "Taz"],
  ["ח\"מ", "Choshen Mishpat"],
  ["כנה\"ג", "Knesset HaGedolah"],
  ["הגהות מיי'", "Hagahot Maimoniyot"],
  ["הגה", "gloss"],
  ["ה\"ה", "likewise"],
  ["ג\"ז", "likewise"],
  ["פשוט", "plain"],
  ["פשיטא", "obvious"],
  ["קשה", "difficult"],
  ["תירץ", "answered"],
  ["הוכח", "proven"],
  ["מוכח", "proven"],
  ["פסק", "ruled"],
  ["חולק", "disputes"],
  ["סבר", "holds"],
  ["ס\"ל", "holds"],
  ["קי\"ל", "the halakhah is"],
  ["נהי", "although"],
  ["אע\"פ", "even though"],
  ["אע\"ג", "even though"],
  ["איכא", "there is"],
  ["ליכא", "there is not"],
  ["בעינן", "we require"],
  ["לא בעינן", "we do not require"],
  ["אין", "there is no"],
  ["אינו", "is not"],
  ["אינה", "she is not"],
  ["הוי", "it is"],
  ["הוה", "it was"],
  ["דמי", "is considered"],
  ["מהני", "helps / is effective"],
  ["לא מהני", "does not help / is ineffective"],
  ["בטל", "void"],
  ["קיים", "stands / valid"],
  ["פקעו", "lapsed"],
  ["גמרו", "completed"],
  ["נאמן", "believed"],
  ["נאמנת", "believed"],
  ["מכחיש", "contradicts"],
  ["מכחישו", "contradicts him"],
  ["נ\"ב", "nb"],
];

function applyPhraseMap(text) {
  let t = text;
  const sorted = [...PHRASE].sort((a, b) => b[0].length - a[0].length);
  for (const [he, en] of sorted) {
    if (!he) continue;
    t = t.split(he).join(en);
  }
  return t;
}

/** Beer HaGolah — mostly source citations */
function translateBeerHagolah(h) {
  h = expandAbbrevs(stripHtml(h));
  if (/^שם\.?$/.test(h.trim())) return "There.";
  if (/^ה"ה שם/.test(h)) return "Likewise there.";
  if (/^ג"ז שם/.test(h)) return "Likewise there.";
  if (/^כמימרא/.test(h)) return "As the statement there; consensus of the poskim.";
  if (/^פשוט/.test(h)) return "Plain in the Gemara there 62b.";
  if (/^טור/.test(h)) return h.replace(/^טור/, "Tur").replace(/דע"כ/, "— for perforce he did not say").replace(/על מנת/, "on condition").replace(/דהוי כמעכשיו/, "is as from now") + ".";
  if (/^לשון הרמב"ם/.test(h)) return "Rambam's language at the beginning of ch. 7 Laws of Marriage — from Mishnah and Gemara there 63a; as our master explained: one who says on condition that he consent means on condition that he say yes explicitly; likewise Rashba and as required from Tosafot HaHeim there; likewise Ran.";
  if (/^ל' הרמב"ם/.test(h)) return "In Rambam ch. 10 Laws of Marriage; his words are explained in Mishnah and Gemara Kiddushin 61a and 61b.";
  if (/^משנה/.test(h)) {
    let en = h.replace(/^משנה/, "Mishnah")
      .replace(/ודף/g, " folio ")
      .replace(/דף/g, "folio ")
      .replace(/ע"א/g, "a")
      .replace(/ע"ב/g, "b")
      .replace(/וכר"מ/g, ", and like R' Meir")
      .replace(/וכפירש"י/g, ", and as Rashi explained")
      .replace(/וכ"כ הרי"ף/g, ", and likewise the Rif")
      .replace(/וכן פסקו כל הפוסקים/g, ", and so ruled all the poskim")
      .replace(/וכדמוקי לה/g, ", as established there")
      .replace(/וכדמפר' לה/g, ", as R' Levi explained there in the Gemara")
      .replace(/וכדדייק רבא/g, ", as Rava inferred there")
      .replace(/ד"ס/g, " 60")
      .replace(/דס"ג/g, " 63")
      .replace(/דס"א/g, " 61")
      .replace(/דס"ב/g, " 62")
      .replace(/דס"ז/g, " 67")
      .replace(/דס"ח/g, " 68")
      .replace(/דס"ט/g, " 69")
      .replace(/דע"ה/g, " 75")
      .replace(/שם/g, "there");
    return en + ".";
  }
  if (/^ברייתא|^בריי'/.test(h)) {
    return h.replace(/^(ברייתא|בריי')/, "Baraita")
      .replace(/כתובות/g, "Kesubos")
      .replace(/בב"מ/g, "Bava Metzia")
      .replace(/גיטין/g, "Gittin")
      .replace(/קידושין/g, "Kiddushin")
      .replace(/דף/g, "folio ")
      .replace(/ע"א/g, "a")
      .replace(/ע"ב/g, "b")
      .replace(/וכר' יהודה/g, ", and like R' Yehuda")
      .replace(/שם/g, "there") + ".";
  }
  if (/^הרמב"ם/.test(h)) return applyPhraseMap(h) + ".";
  if (/^ה"ה/.test(h)) return "Likewise there " + applyPhraseMap(h.replace(/^ה"ה\s*/, "")) + ".";
  if (/^הראב"ד/.test(h)) return "Ra'avad there in Hagahot to his final resolution of the sugya.";
  if (/^הר"י/.test(h)) return "R' Yehuda in name of RaMAh.";
  if (/^כאוקמת'/.test(h)) return "As the Gemara's establishment there 60b.";
  if (/^כתנא/.test(h)) return "As the tanna of the mishnah who holds thus, and as Rava inferred there 63a.";
  if (/^הר"ן/.test(h)) return applyPhraseMap(h) + ".";
  return applyPhraseMap(h).replace(/\s+/g, " ").trim() + ".";
}

/** Generic commentary translation */
export function translateCommentary(hebrew, slug) {
  let h = expandAbbrevs(stripHtml(hebrew));
  if (slug === "beer-hagolah") return translateBeerHagolah(h);

  // nb / marginal notes
  if (/^סעיף|^ב\"ש|^באותו סעיף|^שם/.test(h) && h.includes("נ\"ב")) {
    h = h.replace(/^סעיף\s*(\S+)\s*/, "Seif $1: ").replace(/נ\"ב\s*/, "nb ");
  }

  // Split long blocks into sentences
  let en = applyPhraseMap(h);

  // Clean residual Hebrew punctuation artifacts
  en = en
    .replace(/:\s*\./g, ".")
    .replace(/\(\s*\)/g, "")
    .replace(/\s+/g, " ")
    .replace(/\.+/g, ".")
    .trim();

  // Clause starters
  en = en
    .replace(/\bSee\s+/g, "See ")
    .replace(/\bBut\s+/g, "But ")
    .replace(/\bAnd if\s+/g, "And if ")
    .replace(/\bMeaning\s+/g, "Meaning ")
    .replace(/\bTherefore\s+/g, "Therefore ");

  if (en && !/[.!?]$/.test(en)) en += ".";

  // Safety
  for (const bad of [/Lord's Prayer/i, /Hashem's Word/i, /Hashem's promise/i, /Capernaum/i, /MYMEMORY/i]) {
    if (bad.test(en)) throw new Error(`Forbidden: ${bad} in ${slug}`);
  }

  return en;
}
