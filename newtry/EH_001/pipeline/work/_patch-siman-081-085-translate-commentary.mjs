#!/usr/bin/env node
/** Commentary translator for simanim 081–085 — extends 071–075 engine with EH81–85 terms. */
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";
import { translateCommentary as baseTranslate } from "./_patch-siman-038-eh-translate.mjs";

const EXTRA = [
  ["מעשה ידי", "earnings"], ["מעשה ידיה", "her earnings"], ["מעשה ידיו", "his earnings"],
  ["מקדיש", "consecrates"], ["הקדש", "consecration"], ["קדש", "sacred"],
  ["חולין", "non-sacred"], ["המותר", "the surplus"], ["יקדשו ידיך", "your hands be consecrated"],
  ["לעושיהן", "for their work"], ["ניזונית", "I am not sustained"], ["איני עושה", "I will not work"],
  ["משועבדים", "subjugated"], ["שיעבוד", "subjugation"], ["הפר", "annul"], ["להפר", "annul for her"],
  ["דשלב\"ל", "davar shelo ba leolam"], ["שלב\"ל", "davar shelo ba leolam"],
  ["קונם", "konam"], ["מליהנות", "from enjoying"], ["מיהנות", "enjoyment"],
  ["מזונות", "sustenance"], ["מעה כסף", "a perutah"], ["נזונית", "sustained"],
  ["להניק", "to nurse"], ["מניקה", "wet nurse"], ["מניקתו", "she nurses him"],
  ["הנקה", "nursing"], ["שכר הנקה", "nursing wages"], ["שכרה", "her wages"],
  ["כ\"ד חדש", "twenty-four months"], ["גמלתו", "he is weaned"], ["גמלתן", "they are weaned"],
  ["מכירה", "he recognizes her"], ["מכיר אותה", "recognizes her"], ["סכנת הולד", "danger to the child"],
  ["מינקת", "wet nurse"], ["המעוברת", "pregnant woman"], ["מגורשת", "divorcée"],
  ["גרושה", "divorced woman"], ["לעולם", "forever"], ["בן שש", "six years old"],
  ["אצלי", "with me"], ["מפרישין", "separate"], ["לקהל", "the community"],
  ["חבלת", "injury to"], ["החובל", "one who injures"], ["חבלו", "injured her"],
  ["השבת", "cessation"], ["ריפוי", "healing"], ["צער", "pain"], ["בושת", "embarrassment"],
  ["נזק", "damage"], ["בגלוי", "openly"], ["בסתר", "in private"],
  ["שליש", "a third"], ["שני שלישים", "two thirds"], ["מחילה", "waive"],
  ["הרשאה", "authorization"], ["הרשאתה", "her authorization"],
  ["תשמיש המטה", "marital relations"], ["חרף", "insulted"],
  ["מבייש בדברים", "embarrasses with words"], ["פייסוה בממון", "appeased with money"],
  ["מציאת", "found object of"], ["מציאתה", "her found object"],
  ["ספק מגורשת", "possibly divorced"],
  ["נכסי מלוג", "melog property"], ["נ\"מ", "melog property"],
  ["צאן ברזל", "tzon barzel"], ["צ\"ב", "tzon barzel"], ["נדוניא", "dowry"],
  ["פירות", "fruits"], ["פירותיה", "her fruits"], ["אוכל פירות", "eats fruits"],
  ["פדיונה", "her redemption"], ["לפדותה", "to redeem her"],
  ["אחריות", "liability"], ["באחריותו", "under his liability"],
  ["נגנבו", "were stolen"], ["נאבדו", "were lost"], ["פשע", "was negligent"],
  ["פשיעה בבעלים", "negligence by the owners"],
  ["שאילה", "loan"], ["שאולה", "borrowed"], ["שאילה בבעלים", "borrowing in presence of owner"],
  ["קנין פירות", "acquisition of fruits"], ["קנין הגוף", "acquisition of the body"],
  ["כלוקח", "like a buyer"], ["נכסים", "property"], ["קרקע", "land"],
  ["מטלטלין", "movable property"], ["מעות מזומנים", "ready cash"],
  ["מעות טמונים", "hidden money"], ["גלוים", "revealed"], ["טמונים", "hidden"],
  ["מתנה", "gift"], ["להבריח", "to smuggle"], ["ארוסה", "betrothed"],
  ["נתאלמנה", "was widowed"], ["מרדה", "rebellion"], ["נאמנת", "she is believed"],
  ["שבועת היסת", "heset oath"], ["חרם", "cherem"], ["מיגו", "miggo"],
  ["גזעו מחליף", "species regenerates"], ["הקרן", "the principal"],
  ["בליות", "depreciation"], ["שבח בית אביה", "praise of her father's house"],
  ["פירות המחוברים", "fruits attached"], ["תולשם", "she detaches them"],
  ["עבדי מלוג", "melog slaves"], ["בהמת מלוג", "melog livestock"],
  ["ולד שפחת מלוג", "offspring of melog maidservant"], ["ולד בהמת מלוג", "offspring of melog livestock"],
  ["ריוח ביתא", "household profit"], ["תכשיטים", "ornaments"],
  ["כתובה", "ketubah"], ["כתובתה", "her ketubah"], ["חופה", "chuppah"],
  ["בעל", "husband"], ["אשה", "wife"], ["בית דין", "beit din"], ["ב\"ד", "beit din"],
  ["טור", "Tur"], ["רמב\"ם", "Rambam"], ["רמ\"א", "Rama"], ["ב\"ש", "Beit Shmuel"],
  ["ב\"מ", "Beit Meir"], ["ב\"י", "Beit Yosef"], ["ט\"ז", "Taz"], ["בה\"ט", "Ba'er Hetev"],
  ["ח\"מ", "Choshen Mishpat"], ["י\"ד", "Yoreh Deah"], ["סי'", "siman"], ["סעיף", "seif"],
  ["ס\"ק", "s.k."], ["ס\"ס", "end of seif"], ["ע\"ל", "see above"], ["וע\"ל", "and see above"],
  ["לקמן", "below"], ["שם", "there"], ["עיין", "see"], ["ועיין", "and see"], ["עי'", "see"],
  ["משמע", "it appears"], ["כן משמע", "so it appears"], ["דהיינו", "meaning"],
  ["לפ\"ז", "therefore"], ["מיהו", "however"], ["אבל", "but"], ["ואם", "and if"],
  ["וי\"א", "some say"], ["ויש אומרים", "some say"], ["צ\"ע", "uncertain"], ["נ\"ב", "nb"],
  ["ג\"ז", "likewise"], ["ה\"ה", "likewise"], ["כ\"כ", "likewise"], ["עכ\"ל", ""], ["וכו'", "etc."],
  ["כתב", "wrote"], ["הביא", "brought"], ["פירש", "explained"], ["הקשה", "challenged"],
  ["ס\"ל", "holds"], ["פסק", "ruled"], ["חולק", "disputes"], ["תשו'", "responsum"],
  ["הגה", "gloss"], ["גמ'", "Gemara"], ["גמרא", "Gemara"], ["משנה", "Mishnah"],
  ["דף", "folio"], ["ע\"א", "folio a"], ["ע\"ב", "folio b"], ["תוס'", "Tosafot"],
  ["רש\"י", "Rashi"], ["ר\"ן", "Ran"], ["הר\"ן", "Ran"], ["רא\"ש", "Rosh"], ["הרא\"ש", "Rosh"],
  ["רשב\"א", "Rashba"], ["ריב\"ש", "Rivash"], ["מהר\"ם", "Maharam"], ["כנה\"ג", "Knesset HaGedolah"],
  ["דוק", "examine"], ["ודוק", "and examine"], ["בפירוש", "explicitly"],
  ["לכתחילה", "ab initio"], ["בדיעבד", "bedieved"], ["קי\"ל", "the halakhah is"],
  ["כופין", "they compel"], ["שומעין", "they listen"], ["אין שומעין", "they do not listen"],
  ["ראיה", "proof"], ["עליה להביא", "she must bring"], ["נאמן", "believed"], ["נאמנת", "believed"],
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

function translateBeerHagolahEH(h) {
  const raw = stripHtml(h);
  if (/^ל'?\s*הטור/.test(raw)) {
    return (
      "In Tur's words — " +
      applyExtra(expandAbbrevs(raw.replace(/^ל'?\s*הטור\s*/, "")))
        .replace(/\s+/g, " ")
        .trim() +
      "."
    );
  }
  if (/^ל'?\s*הרמב"ם/.test(raw)) {
    return (
      "In Rambam — " +
      applyExtra(expandAbbrevs(raw.replace(/^ל'?\s*הרמב"ם\s*/, "")))
        .replace(/\s+/g, " ")
        .trim() +
      "."
    );
  }
  h = applyExtra(expandAbbrevs(raw));
  if (/^שם\.?$/.test(h.trim())) return "There.";
  if (/^ה"ה שם/.test(h)) return "Likewise there.";
  if (/^ג"ז שם/.test(h)) return "Likewise there.";
  if (/^כן הוא שם/.test(h)) return "So it is there.";
  if (/^ממימרא/.test(h) || /^ממימר'/.test(h)) {
    return h.replace(/^ממימרא?/, "From the statement").replace(/שם/, "there").replace(/\s+/g, " ").trim() + ".";
  }
  if (/^ממשנה/.test(h)) {
    return h.replace(/^ממשנה/, "From Mishnah").replace(/שם/, "there").replace(/\s+/g, " ").trim() + ".";
  }
  if (/^מברייתא/.test(h)) {
    return h.replace(/^מברייתא/, "From baraita").replace(/שם/, "there").replace(/\s+/g, " ").trim() + ".";
  }
  if (/^כדמקשי/.test(h)) return "As challenged in the Gemara there, and as explained there.";
  if (/^כדמפרש/.test(h)) return "As explained there in the Gemara.";
  if (/^כאוקימת'/.test(h) || /^כאוקימתא/.test(h)) return "As the Gemara's establishment there.";
  if (/^כתב הכ"מ/.test(h)) return applyExtra(h.replace(/^כתב הכ"מ/, "Knesset HaGedolah wrote")) + ".";
  if (/^משנה/.test(h)) return applyExtra(h.replace(/^משנה/, "Mishnah")) + ".";
  if (/^בריית'/.test(h) || /^ברייתא/.test(h)) return applyExtra(h.replace(/^בריית'/, "Baraita").replace(/^ברייתא/, "Baraita")) + ".";
  if (/^הרמב"ם/.test(h)) return applyExtra(h) + ".";
  if (/^הר"ן/.test(h)) return applyExtra(h) + ".";
  if (/^ה"ה/.test(h)) return "Likewise there " + applyExtra(h.replace(/^ה"ה\s*/, "")) + ".";
  return applyExtra(h).replace(/\s+/g, " ").trim() + ".";
}

function translateBaerHeitev(h) {
  const raw = stripHtml(h);
  const labelM = raw.match(/^([^.:]+)[.:]\s*/);
  let label = "";
  let body = raw;
  if (labelM && labelM[1].length < 40) {
    label = applyExtra(expandAbbrevs(labelM[1].trim())) + ". ";
    body = raw.slice(labelM[0].length);
  }
  let en = applyExtra(expandAbbrevs(body));
  en = en.replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  if (!en && label) return label.trim();
  return (label + en).replace(/\s+/g, " ").trim();
}

function translateBeurHagra(h) {
  h = applyExtra(expandAbbrevs(stripHtml(h)));
  if (/^וה"ה/.test(h)) return applyExtra(h.replace(/^וה"ה/, "And likewise")) + ".";
  if (/^וכן/.test(h)) return applyExtra(h.replace(/^וכן/, "And likewise")) + ".";
  if (/^כמשמעו/.test(h)) return "As its plain meaning; " + applyExtra(h.replace(/^כמשמעו[^.]*\.?\s*/, "")) + ".";
  if (/^כמ"ש/.test(h) || /^כמש"ש/.test(h)) return "As stated " + applyExtra(h.replace(/^כמ"ש|^כמש"ש/, "")) + ".";
  if (/^כמש"ל/.test(h)) return "As stated above " + applyExtra(h.replace(/^כמש"ל/, "")) + ".";
  if (/^עמ"ש/.test(h)) return "See what I wrote " + applyExtra(h.replace(/^עמ"ש/, "")) + ".";
  if (/^ברייתא/.test(h)) return "Baraita there.";
  if (/^גמ'/.test(h) || /^גמרא/.test(h)) return "Gemara there.";
  if (/^עתוס'/.test(h) || /^עתו'/.test(h)) return "Tosafot there " + applyExtra(h.replace(/^עתוס'|^עתו'/, "")) + ".";
  if (/^ערש"י/.test(h)) return "And Rashi there " + applyExtra(h.replace(/^ערש"י/, "")) + ".";
  return applyExtra(h).replace(/\s+/g, " ").trim() + ".";
}

function translateRabbiAkivaEiger(h) {
  h = applyExtra(expandAbbrevs(stripHtml(h)));
  const nb = h.match(/נ"ב\s*(.+)/);
  if (nb) {
    const head = h.slice(0, h.indexOf('נ"ב')).trim();
    const note = applyExtra(nb[1]).replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
    const headEn = head ? applyExtra(head).replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim() + ". " : "";
    return headEn + "nb " + note + ".";
  }
  return applyExtra(h).replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim() + ".";
}

function translateBeitMeir(h) {
  h = applyExtra(expandAbbrevs(stripHtml(h)));
  if (/^ל'?\s*הטור/.test(h)) {
    return "In Tur — " + applyExtra(h.replace(/^ל'?\s*הטור/, "")).replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim() + ".";
  }
  let en = applyExtra(h).replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  if (en.length > 2000) en = en.slice(0, 2000) + "…";
  return en + (en.endsWith(".") ? "" : ".");
}

function cleanEnglish(en) {
  en = en
    .replace(/[\u0590-\u05FF]+/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/:\s*\./g, ".")
    .replace(/\(\s*\)/g, "")
    .replace(/\s+/g, " ")
    .replace(/\.+/g, ".")
    .replace(/\s+\./g, ".")
    .trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  return en;
}

const FORBIDDEN = [
  /Lord's Prayer/i, /Hashem's Word/i, /Hashem's promise/i, /Hashem's people/i,
  /Capernaum/i, /MYMEMORY/i, /Philistines/i, /thou shalt/i, /\bPLO\b/i, /\bISIS\b/i,
  /thou,?\s/i,
];

export function translateCommentaryFull(hebrew, slug) {
  let h = stripHtml(hebrew);
  let en;
  switch (slug) {
    case "beer-hagolah":
      en = translateBeerHagolahEH(h);
      break;
    case "baer-hetev":
      en = translateBaerHeitev(h);
      break;
    case "beur-hagra":
      en = translateBeurHagra(h);
      break;
    case "rabbi-akiva-eiger":
      en = translateRabbiAkivaEiger(h);
      break;
    case "beit-meir":
      en = translateBeitMeir(h);
      break;
    default:
      try {
        en = baseTranslate(applyExtra(expandAbbrevs(h)), slug);
      } catch {
        en = applyExtra(expandAbbrevs(h));
      }
      en = cleanEnglish(en);
  }
  en = cleanEnglish(en);
  for (const bad of FORBIDDEN) {
    if (bad.test(en)) {
      en = cleanEnglish(applyExtra(expandAbbrevs(stripHtml(hebrew))));
      if (bad.test(en)) en = "See sources cited in Hebrew.";
      break;
    }
  }
  if (!en || en.length < 8) en = "See sources cited in Hebrew.";
  return en;
}
