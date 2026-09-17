/**
 * Speech-only Ashkenazi respellings for English TTS.
 * On-screen English / corpus HTML are never modified.
 *
 * Keys are display forms; values are hyphenated syllables for Web Speech engines
 * (no IPA, no ALL-CAPS stress — Apple often ignores caps).
 */

/** Settings / accent preview sentence with mapped terms. */
export const ENGLISH_TTS_PREVIEW_SAMPLE =
  "The Rema discusses halachos of amos in several seifim, and Chiya.";

/**
 * [display phrase, spoken respelling]
 * Longer phrases must win over shorter keys (Motzei Shabbos before Shabbos).
 */
export const ENGLISH_SPEECH_ENTRIES = [
  ["yad soledet bo", "yahd soh-leh-det boh"],
  ["mitzamek v'yafeh lo", "mit-zah-mek v'yah-feh loh"],
  ["mitzamek v'ra lo", "mit-zah-mek v'rah loh"],
  ["Kitzur Shulchan Aruch", "kit-zoor shool-khan ah-rukh"],
  ["Shulchan Aruch HaRav", "shool-khan ah-rukh ha-rahv"],
  ["Aruch HaShulchan", "ah-rukh ha-shool-khan"],
  ["Mishnah Berurah", "mish-nuh b'roo-rah"],
  ["Mishna Berurah", "mish-nuh b'roo-rah"],
  ["Magen Avraham", "mah-gen av-roh-hom"],
  ["Turei Zahav", "too-ray zah-hahv"],
  ["Sifsei Kohen", "sif-say koh-hen"],
  ["Siftei Kohen", "sif-say koh-hen"],
  ["Be'er Heitev", "be-air hay-tev"],
  ["Beer Heitev", "be-air hay-tev"],
  ["Baer Heteiv", "be-air hay-tev"],
  ["Pri Megadim", "pree meh-gah-deem"],
  ["Levushei Serad", "l'voo-shay s'rahd"],
  ["Biur HaGra", "bee-oor ha-grah"],
  ["Beur HaGra", "bee-oor ha-grah"],
  ["Beur Hagra", "bee-oor ha-grah"],
  ["Kaf HaChaim", "kahf ha-khahyim"],
  ["Motzei Shabbos", "mot-zay shah-biss"],
  ["Motzaei Shabbos", "mot-zay shah-biss"],
  ["Motzei Shabbat", "mot-zay shah-biss"],
  ["Motzaei Shabbat", "mot-zay shah-biss"],
  ["Keriat Shema", "kree-yas shih-mah"],
  ["Kriat Shema", "kree-yas shih-mah"],
  ["Kriyas Shema", "kree-yas shih-mah"],
  ["Krias Shema", "kree-yas shih-mah"],
  ["Shemoneh Esrei", "sh'moh-neh ess-ray"],
  ["Shmoneh Esrei", "sh'moh-neh ess-ray"],
  ["Shemona Esrei", "sh'moh-neh ess-ray"],
  ["Orach Chayim", "oh-rakh khahyim"],
  ["Orach Chaim", "oh-rakh khahyim"],
  ["Yoreh De'ah", "yoh-reh day-ah"],
  ["Yoreh Deah", "yoh-reh day-ah"],
  ["Even HaEzer", "eh-ven hah-eh-zer"],
  ["Even Haezer", "eh-ven hah-eh-zer"],
  ["Choshen Mishpat", "khoh-shen mish-pot"],
  ["Shulchan Aruch", "shool-khan ah-rukh"],
  ["bichdei sheyeasu", "bikh-day sheh-ya-a-soo"],
  ["maachal ben Drusai", "mah-a-khal ben droo-sye"],
  ["ben Drusai", "ben droo-sye"],
  ["kli shelishi", "klee sh'lee-shee"],
  ["kli rishon", "klee ree-shohn"],
  ["kli sheni", "klee shay-nee"],
  ["chol hamoed", "khol ha-moh-ed"],
  ["Chol HaMoed", "khol ha-moh-ed"],
  ["Tisha B'Av", "tish-ah b'ahv"],
  ["Tisha BAv", "tish-ah b'ahv"],
  ["Rosh Hashanah", "rohsh ha-shah-nuh"],
  ["Rosh HaShanah", "rohsh ha-shah-nuh"],
  ["Yom Kippur", "yohm kip-per"],
  ["Beit Yosef", "bais yoh-seif"],
  ["Bais Yosef", "bais yoh-seif"],
  ["Beis Yosef", "bais yoh-seif"],
  ["Yom Tov", "yohm tohv"],
  ["Yomtov", "yohm tohv"],
  ["d'oraisa", "d'oh-rye-sah"],
  ["d’oraisa", "d'oh-rye-sah"],
  ["deoraisa", "d'oh-rye-sah"],
  ["d'oraita", "d'oh-rye-sah"],
  ["de'oraita", "d'oh-rye-sah"],
  ["d'rabbanan", "d'rah-boh-nun"],
  ["d’rabbanan", "d'rah-boh-nun"],
  ["derabbanan", "d'rah-boh-nun"],
  ["b'meizid", "b'may-zid"],
  ["b’meizid", "b'may-zid"],
  ["b'shogeg", "b'shoh-gegg"],
  ["b’shogeg", "b'shoh-gegg"],
  ["bishul akum", "bee-shool ah-koom"],
  ["Hakadosh Baruch Hu", "hah-kah-dosh bah-rukh hoo"],
  ["HaKadosh Baruch Hu", "hah-kah-dosh bah-rukh hoo"],
  ["Hashem Yisborach", "hah-shem yis-boh-rakh"],
  ["Hashem Yisbarach", "hah-shem yis-boh-rakh"],
  ["Baruch Hashem", "bah-rukh hah-shem"],
  ["hahu hadin", "hah-hoo hah-deen"],
  ["Ha-Shem", "hah-shem"],
  ["HaShem", "hah-shem"],
  ["Hashem", "hah-shem"],
  ["Shehecheyanu", "sheh-heh-kheh-yah-noo"],
  ["Shemoneh", "sh'moh-neh"],
  ["tefillin", "teh-fill-in"],
  ["tefilin", "teh-fill-in"],
  ["tzitzis", "tzit-siss"],
  ["tzitzit", "tzit-siss"],
  ["talleisim", "tah-lay-sim"],
  ["tallisos", "tah-lay-sos"],
  ["tallis", "tah-liss"],
  ["tallit", "tah-liss"],
  ["berachos", "b'rah-khos"],
  ["berachot", "b'rah-khos"],
  ["berachah", "b'rah-khuh"],
  ["berakhah", "b'rah-khuh"],
  ["beracha", "b'rah-khuh"],
  ["brachos", "b'rah-khos"],
  ["bracha", "b'rah-khuh"],
  ["Shabbos", "shah-biss"],
  ["Shabbat", "shah-biss"],
  ["havdalah", "hav-doh-loh"],
  ["havdoloh", "hav-doh-loh"],
  ["kiddush", "kid-dush"],
  ["Shema", "shih-mah"],
  ["melachos", "muh-lah-khos"],
  ["melacha", "muh-lah-kha"],
  ["melakha", "muh-lah-kha"],
  ["muktzeh", "mook-tseh"],
  ["muktze", "mook-tseh"],
  ["halachos", "huh-lach-os"],
  ["halachah", "huh-lach-uh"],
  ["halacha", "huh-lach-uh"],
  ["halocho", "huh-lach-uh"],
  ["mitzvos", "mitz-vohs"],
  ["mitzvot", "mitz-vohs"],
  ["mitzvah", "mitz-vuh"],
  ["parshiyos", "par-shee-yohs"],
  ["parshah", "par-shuh"],
  ["parasha", "par-shuh"],
  ["parsha", "par-shuh"],
  ["tefillah", "t'fee-luh"],
  ["tefilla", "t'fee-luh"],
  ["mezuzos", "meh-zoo-zohs"],
  ["mezuzah", "meh-zoo-zuh"],
  ["shechitah", "sh'khee-tah"],
  ["shechita", "sh'khee-tah"],
  ["shochet", "shoh-khet"],
  ["kashrus", "kash-rus"],
  ["kashrut", "kash-rus"],
  ["niddah", "nid-duh"],
  ["treifah", "tray-fuh"],
  ["treifos", "tray-fos"],
  ["issur", "ee-soor"],
  ["heter", "hay-ter"],
  ["gezeirah", "g'zay-ruh"],
  ["minhag", "min-huhg"],
  ["davka", "dav-kuh"],
  ["Mechaber", "meh-kha-behr"],
  ["Tosafos", "toh-sah-fos"],
  ["Tosafot", "toh-sah-fos"],
  ["Rambam", "rahm-bahm"],
  ["Ramban", "rahm-bahn"],
  ["Rashba", "rahsh-bah"],
  ["Ritva", "rit-vah"],
  ["Rashi", "rah-shee"],
  ["Rema", "raah-maah"],
  ["Rama", "raah-maah"],
  ["Rabbi Chiya", "raah-bee hhee-yah"],
  ["Rebbi Chiya", "reh-bee hhee-yah"],
  ["Chiyya", "hhee-yah"],
  ["Chiya", "hhee-yah"],
  ["Hiyya", "hhee-yah"],
  ["Shach", "shakh"],
  ["Chullin", "khool-lin"],
  ["Chumash", "khoo-mash"],
  ["Mishnah", "mish-nuh"],
  ["Mishna", "mish-nuh"],
  ["Gemara", "g'mah-rah"],
  ["Talmud", "tahl-mood"],
  ["Pesach", "pay-sakh"],
  ["Shavuos", "shuh-voo-ohs"],
  ["Shavuot", "shuh-voo-ohs"],
  ["Chanukah", "khah-nuh-kuh"],
  ["Hanukkah", "khah-nuh-kuh"],
  ["Purim", "poo-rim"],
  ["sukkah", "soo-kuh"],
  ["lulav", "loo-luhv"],
  ["esrog", "ess-rog"],
  ["etrog", "ess-rog"],
  ["eruvin", "ay-roo-vin"],
  ["eiruv", "ay-roov"],
  ["eruv", "ay-roov"],
  ["se'ifim", "sif-im"],
  ["seifim", "sif-im"],
  ["simanim", "see-mah-nim"],
  ["siman", "see-mahn"],
  ["seif", "sif"],
  ["amos", "ah-mos"],
  ["amah", "ah-mah"],
  ["Taz", "tahz"],
  ["Tur", "toor"],
  ["Gra", "grah"],
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

function compileEntries(entries) {
  const seen = new Set();
  const compiled = [];
  const sorted = [...entries].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of sorted) {
    const key = String(from).replace(/['’]/g, "'").toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    if (key.replace(/[^a-z0-9]/g, "").length < 3) continue;
    const inner = phraseToInnerPattern(from);
    compiled.push({
      from,
      spoken: to,
      re: new RegExp(`(^|[^A-Za-z0-9])(${inner}(?:['’]s)?)(?=$|[^A-Za-z0-9])`, "gi"),
    });
  }
  return compiled;
}

const COMPILED = compileEntries(ENGLISH_SPEECH_ENTRIES);

/**
 * Rewrite English for TTS only. Returns a new string; does not mutate HTML.
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
