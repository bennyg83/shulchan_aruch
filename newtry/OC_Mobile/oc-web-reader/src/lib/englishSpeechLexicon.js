/**
 * Speech-only lexicon. On-screen English / corpus HTML are never modified.
 *
 * Each row is [display phrase, English respelling fallback, Hebrew to speak].
 * When a Hebrew voice exists, mapped terms are spoken as Hebrew (real chet)
 * on the Hebrew voice; the rest of the sentence stays on the English voice.
 */

/** Settings preview: mapped terms should switch into Hebrew TTS. */
export const ENGLISH_TTS_PREVIEW_SAMPLE =
  "The Rema discusses halachos of amos in several seifim, and Chiya.";

/**
 * Longer phrases must win over shorter keys (Motzei Shabbos before Shabbos).
 * @type {Array<[string, string, string]>}
 */
export const ENGLISH_SPEECH_ENTRIES = [
  ["yad soledet bo", "yahd soh-leh-det boh", "יד סולדת בו"],
  ["mitzamek v'yafeh lo", "mit-zah-mek v'yah-feh loh", "מצטמק ויפה לו"],
  ["mitzamek v'ra lo", "mit-zah-mek v'rah loh", "מצטמק ורע לו"],
  ["Kitzur Shulchan Aruch", "kit-zoor shool-khan ah-rukh", "קיצור שולחן ערוך"],
  ["Shulchan Aruch HaRav", "shool-khan ah-rukh ha-rahv", "שולחן ערוך הרב"],
  ["Aruch HaShulchan", "ah-rukh ha-shool-khan", "ערוך השולחן"],
  ["Mishnah Berurah", "mish-nuh b'roo-rah", "משנה ברורה"],
  ["Mishna Berurah", "mish-nuh b'roo-rah", "משנה ברורה"],
  ["Magen Avraham", "mah-gen av-roh-hom", "מגן אברהם"],
  ["Turei Zahav", "too-ray zah-hahv", "טורי זהב"],
  ["Sifsei Kohen", "sif-say koh-hen", "שפתי כהן"],
  ["Siftei Kohen", "sif-say koh-hen", "שפתי כהן"],
  ["Be'er Heitev", "be-air hay-tev", "באר היטב"],
  ["Beer Heitev", "be-air hay-tev", "באר היטב"],
  ["Baer Heteiv", "be-air hay-tev", "באר היטב"],
  ["Pri Megadim", "pree meh-gah-deem", "פרי מגדים"],
  ["Levushei Serad", "l'voo-shay s'rahd", "לבושי שרד"],
  ["Biur HaGra", "bee-oor ha-grah", "ביאור הגר״א"],
  ["Beur HaGra", "bee-oor ha-grah", "ביאור הגר״א"],
  ["Beur Hagra", "bee-oor ha-grah", "ביאור הגר״א"],
  ["Kaf HaChaim", "kahf ha-khahyim", "כף החיים"],
  ["Motzei Shabbos", "mot-zay shah-biss", "מוצאי שבת"],
  ["Motzaei Shabbos", "mot-zay shah-biss", "מוצאי שבת"],
  ["Motzei Shabbat", "mot-zay shah-biss", "מוצאי שבת"],
  ["Motzaei Shabbat", "mot-zay shah-biss", "מוצאי שבת"],
  ["Keriat Shema", "kree-yas shih-mah", "קריאת שמע"],
  ["Kriat Shema", "kree-yas shih-mah", "קריאת שמע"],
  ["Kriyas Shema", "kree-yas shih-mah", "קריאת שמע"],
  ["Krias Shema", "kree-yas shih-mah", "קריאת שמע"],
  ["Shemoneh Esrei", "sh'moh-neh ess-ray", "שמונה עשרה"],
  ["Shmoneh Esrei", "sh'moh-neh ess-ray", "שמונה עשרה"],
  ["Shemona Esrei", "sh'moh-neh ess-ray", "שמונה עשרה"],
  ["Orach Chayim", "oh-rakh khahyim", "אורח חיים"],
  ["Orach Chaim", "oh-rakh khahyim", "אורח חיים"],
  ["Yoreh De'ah", "yoh-reh day-ah", "יורה דעה"],
  ["Yoreh Deah", "yoh-reh day-ah", "יורה דעה"],
  ["Even HaEzer", "eh-ven hah-eh-zer", "אבן העזר"],
  ["Even Haezer", "eh-ven hah-eh-zer", "אבן העזר"],
  ["Choshen Mishpat", "khoh-shen mish-pot", "חושן משפט"],
  ["Shulchan Aruch", "shool-khan ah-rukh", "שולחן ערוך"],
  ["bichdei sheyeasu", "bikh-day sheh-ya-a-soo", "בכדי שיעשו"],
  ["maachal ben Drusai", "mah-a-khal ben droo-sye", "מאכל בן דרוסאי"],
  ["ben Drusai", "ben droo-sye", "בן דרוסאי"],
  ["kli shelishi", "klee sh'lee-shee", "כלי שלישי"],
  ["kli rishon", "klee ree-shohn", "כלי ראשון"],
  ["kli sheni", "klee shay-nee", "כלי שני"],
  ["chol hamoed", "khol ha-moh-ed", "חול המועד"],
  ["Chol HaMoed", "khol ha-moh-ed", "חול המועד"],
  ["Tisha B'Av", "tish-ah b'ahv", "תשעה באב"],
  ["Tisha BAv", "tish-ah b'ahv", "תשעה באב"],
  ["Rosh Hashanah", "rohsh ha-shah-nuh", "ראש השנה"],
  ["Rosh HaShanah", "rohsh ha-shah-nuh", "ראש השנה"],
  ["Yom Kippur", "yohm kip-per", "יום כיפור"],
  ["Beit Yosef", "bais yoh-seif", "בית יוסף"],
  ["Bais Yosef", "bais yoh-seif", "בית יוסף"],
  ["Beis Yosef", "bais yoh-seif", "בית יוסף"],
  ["Yom Tov", "yohm tohv", "יום טוב"],
  ["Yomtov", "yohm tohv", "יום טוב"],
  ["d'oraisa", "d'oh-rye-sah", "דאורייתא"],
  ["d’oraisa", "d'oh-rye-sah", "דאורייתא"],
  ["deoraisa", "d'oh-rye-sah", "דאורייתא"],
  ["d'oraita", "d'oh-rye-sah", "דאורייתא"],
  ["de'oraita", "d'oh-rye-sah", "דאורייתא"],
  ["d'rabbanan", "d'rah-boh-nun", "דרבנן"],
  ["d’rabbanan", "d'rah-boh-nun", "דרבנן"],
  ["derabbanan", "d'rah-boh-nun", "דרבנן"],
  ["b'meizid", "b'may-zid", "במזיד"],
  ["b’meizid", "b'may-zid", "במזיד"],
  ["b'shogeg", "b'shoh-gegg", "בשוגג"],
  ["b’shogeg", "b'shoh-gegg", "בשוגג"],
  ["bishul akum", "bee-shool ah-koom", "בישול עכו״ם"],
  ["Hakadosh Baruch Hu", "hah-kah-dosh bah-rukh hoo", "הקדוש ברוך הוא"],
  ["HaKadosh Baruch Hu", "hah-kah-dosh bah-rukh hoo", "הקדוש ברוך הוא"],
  ["Hashem Yisborach", "hah-shem yis-boh-rakh", "השם יתברך"],
  ["Hashem Yisbarach", "hah-shem yis-boh-rakh", "השם יתברך"],
  ["Baruch Hashem", "bah-rukh hah-shem", "ברוך השם"],
  ["hahu hadin", "hah-hoo hah-deen", "הוא הדין"],
  ["Ha-Shem", "hah-shem", "השם"],
  ["HaShem", "hah-shem", "השם"],
  ["Hashem", "hah-shem", "השם"],
  ["Shehecheyanu", "sheh-heh-kheh-yah-noo", "שהחיינו"],
  ["Shemoneh", "sh'moh-neh", "שמונה"],
  ["tefillin", "teh-fill-in", "תפילין"],
  ["tefilin", "teh-fill-in", "תפילין"],
  ["tzitzis", "tzit-siss", "ציצית"],
  ["tzitzit", "tzit-siss", "ציצית"],
  ["talleisim", "tah-lay-sim", "טליות"],
  ["tallisos", "tah-lay-sos", "טליות"],
  ["tallis", "tah-liss", "טלית"],
  ["tallit", "tah-liss", "טלית"],
  ["berachos", "b'rah-khos", "ברכות"],
  ["berachot", "b'rah-khos", "ברכות"],
  ["berachah", "b'rah-khuh", "ברכה"],
  ["berakhah", "b'rah-khuh", "ברכה"],
  ["beracha", "b'rah-khuh", "ברכה"],
  ["brachos", "b'rah-khos", "ברכות"],
  ["bracha", "b'rah-khuh", "ברכה"],
  ["Shabbos", "shah-biss", "שבת"],
  ["Shabbat", "shah-biss", "שבת"],
  ["havdalah", "hav-doh-loh", "הבדלה"],
  ["havdoloh", "hav-doh-loh", "הבדלה"],
  ["kiddush", "kid-dush", "קידוש"],
  ["Shema", "shih-mah", "שמע"],
  ["melachos", "muh-lah-khos", "מלאכות"],
  ["melacha", "muh-lah-kha", "מלאכה"],
  ["melakha", "muh-lah-kha", "מלאכה"],
  ["muktzeh", "mook-tseh", "מוקצה"],
  ["muktze", "mook-tseh", "מוקצה"],
  ["halachos", "huh-lach-os", "הלכות"],
  ["halachah", "huh-lach-uh", "הלכה"],
  ["halacha", "huh-lach-uh", "הלכה"],
  ["halocho", "huh-lach-uh", "הלכה"],
  ["mitzvos", "mitz-vohs", "מצוות"],
  ["mitzvot", "mitz-vohs", "מצוות"],
  ["mitzvah", "mitz-vuh", "מצוה"],
  ["parshiyos", "par-shee-yohs", "פרשיות"],
  ["parshah", "par-shuh", "פרשה"],
  ["parasha", "par-shuh", "פרשה"],
  ["parsha", "par-shuh", "פרשה"],
  ["tefillah", "t'fee-luh", "תפילה"],
  ["tefilla", "t'fee-luh", "תפילה"],
  ["mezuzos", "meh-zoo-zohs", "מזוזות"],
  ["mezuzah", "meh-zoo-zuh", "מזוזה"],
  ["shechitah", "sh'khee-tah", "שחיטה"],
  ["shechita", "sh'khee-tah", "שחיטה"],
  ["shochet", "shoh-khet", "שוחט"],
  ["kashrus", "kash-rus", "כשרות"],
  ["kashrut", "kash-rus", "כשרות"],
  ["niddah", "nid-duh", "נידה"],
  ["treifah", "tray-fuh", "טריפה"],
  ["treifos", "tray-fos", "טריפות"],
  ["issur", "ee-soor", "איסור"],
  ["heter", "hay-ter", "היתר"],
  ["gezeirah", "g'zay-ruh", "גזירה"],
  ["minhag", "min-huhg", "מנהג"],
  ["davka", "dav-kuh", "דווקא"],
  ["Mechaber", "meh-kha-behr", "מחבר"],
  ["Tosafos", "toh-sah-fos", "תוספות"],
  ["Tosafot", "toh-sah-fos", "תוספות"],
  ["Rambam", "rahm-bahm", "רמב״ם"],
  ["Ramban", "rahm-bahn", "רמב״ן"],
  ["Rashba", "rahsh-bah", "רשב״א"],
  ["Ritva", "rit-vah", "ריטב״א"],
  ["Rashi", "rah-shee", "רש״י"],
  ["Rema", "raah-maah", "רמ״א"],
  ["Rama", "raah-maah", "רמ״א"],
  ["Rabbi Chiya", "raah-bee hhee-yah", "רבי חייא"],
  ["Rebbi Chiya", "reh-bee hhee-yah", "רבי חייא"],
  ["Chiyya", "hhee-yah", "חייא"],
  ["Chiya", "hhee-yah", "חייא"],
  ["Hiyya", "hhee-yah", "חייא"],
  ["Shach", "shakh", "ש״ך"],
  ["Chullin", "khool-lin", "חולין"],
  ["Chumash", "khoo-mash", "חומש"],
  ["Mishnah", "mish-nuh", "משנה"],
  ["Mishna", "mish-nuh", "משנה"],
  ["Gemara", "g'mah-rah", "גמרא"],
  ["Talmud", "tahl-mood", "תלמוד"],
  ["Pesach", "pay-sakh", "פסח"],
  ["Shavuos", "shuh-voo-ohs", "שבועות"],
  ["Shavuot", "shuh-voo-ohs", "שבועות"],
  ["Chanukah", "khah-nuh-kuh", "חנוכה"],
  ["Hanukkah", "khah-nuh-kuh", "חנוכה"],
  ["Purim", "poo-rim", "פורים"],
  ["sukkah", "soo-kuh", "סוכה"],
  ["lulav", "loo-luhv", "לולב"],
  ["esrog", "ess-rog", "אתרוג"],
  ["etrog", "ess-rog", "אתרוג"],
  ["eruvin", "ay-roo-vin", "עירובין"],
  ["eiruv", "ay-roov", "עירוב"],
  ["eruv", "ay-roov", "עירוב"],
  ["se'ifim", "sif-im", "סעיפים"],
  ["seifim", "sif-im", "סעיפים"],
  ["simanim", "see-mah-nim", "סימנים"],
  ["siman", "see-mahn", "סימן"],
  ["seif", "sif", "סעיף"],
  ["amos", "ah-mos", "אמות"],
  ["amah", "ah-mah", "אמה"],
  ["Taz", "tahz", "ט״ז"],
  ["Tur", "toor", "טור"],
  ["Gra", "grah", "גר״א"],
];

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function phraseToInnerPattern(phrase) {
  const norm = String(phrase).replace(/['’]/g, "'");
  return norm
    .split(/(\s+)/)
    .map((part) => {
      if (/^\s+$/.test(part)) return "\\s+";
      return escapeRe(part).replace(/'/g, "['’]");
    })
    .join("");
}

function isWordChar(ch) {
  return ch != null && /[A-Za-z0-9]/.test(ch);
}

function compileEntries(entries) {
  const seen = new Set();
  const compiled = [];
  const sorted = [...entries].sort((a, b) => b[0].length - a[0].length);
  for (const [from, enSpoken, heSpoken] of sorted) {
    const key = String(from).replace(/['’]/g, "'").toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    if (key.replace(/[^a-z0-9]/g, "").length < 3) continue;
    const inner = phraseToInnerPattern(from);
    compiled.push({
      from,
      spoken: enSpoken,
      he: String(heSpoken || "").trim(),
      re: new RegExp(`(^|[^A-Za-z0-9])(${inner}(?:['’]s)?)(?=$|[^A-Za-z0-9])`, "gi"),
      startRe: new RegExp(`^(${inner}(?:['’]s)?)(?=$|[^A-Za-z0-9])`, "i"),
    });
  }
  return compiled;
}

const COMPILED = compileEntries(ENGLISH_SPEECH_ENTRIES);

function mergeSpeechParts(raw) {
  /** @type {{ lang: "en" | "he", text: string }[]} */
  const parts = [];
  for (const part of raw) {
    if (!part?.text) continue;
    if (/^[\s.,;:!?]+$/.test(part.text) && parts.length) {
      parts[parts.length - 1].text += part.text;
      continue;
    }
    const prev = parts[parts.length - 1];
    if (prev && prev.lang === part.lang) {
      prev.text += part.text;
      continue;
    }
    parts.push({ lang: part.lang, text: part.text });
  }
  return parts.filter((p) => p.text.trim());
}

/**
 * Split English into English runs and Hebrew terms for mixed-voice TTS.
 * Display text is not modified.
 * @param {string} text
 * @returns {{ lang: "en" | "he", text: string }[]}
 */
export function splitEnglishForMixedSpeech(text) {
  if (!text) return [];
  const s = String(text);
  /** @type {{ lang: "en" | "he", text: string }[]} */
  const raw = [];
  let i = 0;
  let last = 0;
  while (i < s.length) {
    if (i > 0 && isWordChar(s[i - 1])) {
      i += 1;
      continue;
    }
    let hit = null;
    for (const e of COMPILED) {
      if (!e.he) continue;
      const m = s.slice(i).match(e.startRe);
      if (m) {
        hit = { len: m[0].length, he: e.he };
        break;
      }
    }
    if (hit) {
      if (i > last) raw.push({ lang: "en", text: s.slice(last, i) });
      raw.push({ lang: "he", text: hit.he });
      i += hit.len;
      last = i;
      continue;
    }
    i += 1;
  }
  if (last < s.length) raw.push({ lang: "en", text: s.slice(last) });
  return mergeSpeechParts(raw);
}

/**
 * English-only rewrite (used when no Hebrew voice is available).
 * @param {string} text
 * @returns {string}
 */
export function prepareEnglishForSpeech(text) {
  if (!text) return "";
  let out = String(text);
  for (const { re, spoken } of COMPILED) {
    re.lastIndex = 0;
    out = out.replace(re, (_, prefix) => `${prefix}${spoken}`);
  }
  return out;
}
