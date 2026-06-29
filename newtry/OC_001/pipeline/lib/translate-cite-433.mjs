/** Beer HaGolah / short שם citation lines — siman 433; avoid preflight `there in the`. */
function hebrewNum(s) {
  const t = s.replace(/["״׳'ֹ]/g, "").replace(/\s/g, "");
  if (!t || /^\d+$/.test(t)) return t;
  const g = {
    א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9, י: 10,
    כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50, ס: 60, ע: 70,
    פ: 80, ף: 80, צ: 90, ץ: 90, ק: 100, ר: 200, ש: 300, ת: 400,
  };
  let n = 0;
  for (const c of t) if (g[c] !== undefined) n += g[c];
  return n ? String(n) : s;
}

const TRACTATES = [
  ["שבת", "Shabbat"],
  ["ברכות", "Berachot"],
  ["יומא", "Yoma"],
  ["פסחים", "Pesachim"],
  ["מגילה", "Megillah"],
  ["עירובין", "Eruvin"],
  ["ביצה", "Beitzah"],
  ["מנחות", "Menachot"],
];

const EXACT = new Map([
  ["שם", "there"],
  ["שם בגמ'", "in the Gemara there"],
  ["שם בגמ", "in the Gemara there"],
  ["שם בגמ׳", "in the Gemara there"],
  ["שם בירושלמי", "in the Yerushalmi there"],
  ["בברייתא שם", "in the baraita there"],
  ["שם בברייתא", "in the baraita there"],
  ["שם מימרא דרבא", "statement of Rava there"],
  ["מימרא דרבא שם בבלי", "statement of Rava in the Bavli there"],
  ["ברייתא וגמרא שם", "baraita and Gemara there"],
  ["טור בשם הירושלמי", "Tur in the name of the Yerushalmi"],
  ["שם בשם רבי אבין", "in the name of R' Avin there"],
  ["שם בשם רבי אבין:", "in the name of R' Avin there"],
  ["בריי' פסחים ז' וח'", "Baraita, Pesachim 7 and 8"],
  ["משנה ריש פסחים", "Mishnah at the beginning of Pesachim"],
]);

export function translateCite433(heRaw) {
  let he = heRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!he) return he;
  if (EXACT.has(he)) return EXACT.get(he);

  if (/^משנה ריש פסחים/.test(he)) {
    return "Mishnah at the beginning of Pesachim, and Beit Hillel, as Rav explains in the Gemara 8, and likewise Rambam chapter 2 of Hilchot Chametz u'Matzah";
  }
  if (/^בריי' פסחים/.test(he)) {
    return "Baraita, Pesachim 7 and 8";
  }
  if (/^משנה ל"א/.test(he)) {
    return "Mishnah 31 and baraita 40, and in the Gemara there";
  }
  if (/^תוספות שם/.test(he)) {
    return "Tosafot there, daf 40";
  }
  if (/^בריי' שם וכפלימו/.test(he)) {
    return "baraita there and Kefalimo";
  }
  if (/^ולענ"ד נראה/.test(he)) {
    return "In my humble opinion it appears that here it refers to a guarded courtyard where people dwell, and below it refers to an ownerless place, as mentioned there.";
  }

  let en = he;
  en = en.replace(/בטור/, "in the Tur");
  en = en.replace(/טור בש' אביו הרא"ש למנהג אשכנז/, "Tur in the words of his father the Rosh for Ashkenazic custom");
  en = en.replace(/טור ורבינו ירוחם וכן כ' הרא"ש בתשובה/, "Tur and Rabbeinu Yerucham, and likewise the Rosh wrote in a responsum");
  en = en.replace(/טור/, "Tur");
  en = en.replace(/ב"י בשם סמ"ק/, "Beit Yosef in the name of Semak");
  en = en.replace(/ב"י/, "Beit Yosef");
  en = en.replace(/הרא"ש/, "the Rosh");
  en = en.replace(/הרמב"ם/, "the Rambam");
  en = en.replace(/רמב"ם/, "Rambam");
  en = en.replace(/רש"י/, "Rashi");
  en = en.replace(/תוספות/, "Tosafot");
  en = en.replace(/בריי'/, "baraita");
  en = en.replace(/ברייתא/, "baraita");
  en = en.replace(/משנה/, "Mishnah");
  en = en.replace(/בגמרא/, "in the Gemara");
  en = en.replace(/בגמ'/, "in the Gemara");
  en = en.replace(/בבלי/, "Bavli");
  en = en.replace(/ירושלמי/, "Yerushalmi");
  en = en.replace(/שם/, "there");

  for (const [h, e] of TRACTATES) {
    en = en.replace(new RegExp(h + " ([א-ת\"״׳'ֹ]+)"), (_, num) => `${e} ${hebrewNum(num)}`);
    en = en.replace(new RegExp("^" + h + "$"), e);
  }

  en = en.replace(/([א-ת״"׳'ֹ]+)/g, (m) => {
    if (/^[א-ת"״׳'ֹ]+$/.test(m) && m.length <= 8) {
      const n = hebrewNum(m);
      return n !== m ? n : m;
    }
    return m;
  });

  return en.replace(/\s+/g, " ").trim();
}
