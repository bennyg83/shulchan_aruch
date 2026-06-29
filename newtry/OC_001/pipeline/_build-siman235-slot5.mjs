#!/usr/bin/env node
/** Build siman 235 slot5 batch data + apply scripts from TRANSLATIONS map */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blocks = JSON.parse(
  fs.readFileSync(path.join(__dirname, "_siman235-blocks.json"), "utf8").replace(/^\uFEFF/, "")
).blocks;

const BATCH_SIZES = [45, 45, 37];

/** @type {Record<string, string>} key = rel + "|" + seif:marker */
const TRANSLATIONS = {
  "ateret-zekenim/part-001.txt|2:_":
    "It is forbidden to begin eating etc. But when the time of Keriat Shema arrives it is certainly forbidden to eat even a small meal, and likewise to sleep a little — rather he should read immediately (Beit Yosef in the name of Rashba in the name of Rif); however this requires further study for us, since we are accustomed to pray Maariv from plag haminchah as Rama wrote above siman 233 seif 61 — and behold it is forbidden to begin eating even a small meal an hour and a quarter before night since the time of prayer has already begun (and see in Beit Yosef siman 233 what he wrote in the name of Ohel Moed that he is stringent regarding Maariv prayer because drunkenness is common):",

  "ateret-zekenim/part-001.txt|4:_":
    "One who reads Keriat Shema after dawn has risen — then he should not say Hashkiveinu; but if he reads before dawn has risen he should say Hashkiveinu, for the entire night is time of lying down (Tur):",

  "baer-heitev/part-001.txt|1:א":
    "<b>Small stars.</b> And by law medium stars suffice as Rama wrote in siman 562 — however since we are not expert therefore we require small stars; but large stars do not help since they are visible also by day; and regarding a fast they did not require all this and medium stars suffice as Rama wrote siman 562:",

  "baer-heitev/part-001.txt|1:ב":
    "<b>Without blessings.</b> And he should not rely on Keriat Shema on his bed because he does not intend to fulfill his obligation thereby (Tur). And Taz raised that whoever is concerned to act properly should read Keriat Shema on his bed and intend to fulfill his obligation thereby — and not because of harmful spirits — and he need read only two sections since he already fulfilled his obligation in the synagogue; and this is more correct than the way of Shulchan Aruch, for according to the way of Shulchan Aruch it is nearly certain that at the time of tzeit hakochavim he may forget to read, especially since he already read and fulfilled his obligation — only that he must repeat for extra stringency as written; unlike at bedtime when there is then an awakening to read because of harmful spirits — in this a person is not apt to forget — end of his words. And so is the opinion of Magen Avraham. Again I found in Mateh Moshe that Maharshal read on his bed all three sections — see Magen Avraham note 3 and Ginat Veradim in Sefer Gan HaMelech siman 96 and Sefer Yad Aharon. One who is accustomed to read Keriat Shema and pray with the congregation Maariv at night — and erred and began the blessings of Keriat Shema with the congregation while still day — should finish them so as not to bless a blessing in vain; and at night he should read Keriat Shema without its blessings and pray even though he does not connect geulah to tefillah — this is preferable so that he pray at its time. Magen Avraham:",

  "baer-heitev/part-001.txt|2:א":
    "<b>To eat.</b> But a mere taste is permitted (Magen Avraham and Taz). And Taz wrote according to the way I wrote to read two sections in Keriat Shema of the bed and intend to fulfill his obligation thereby — he may eat and drink first since he has limited time until tzeit hakochavim; and so too Magen Avraham — that according to Rashi if he read in the synagogue while still day he may eat before reading again at home; nevertheless on Motzei Shabbos when they do not read while still day in the synagogue it is forbidden to begin half an hour near tzeit hakochavim and one should not rely on the synagogue's reading while still day for some do not go to the synagogue as Magen Avraham wrote:",

  "baer-heitev/part-001.txt|2:ב":
    "<b>Half an hour.</b> Taz wrote that half an hour is not required but only near a small measure before the time of tzeit hakochavim:",

  "baer-heitev/part-001.txt|2:ג":
    "<b>He interrupts.</b> For Keriat Shema is d'oraisa. And if he began while permitted he need not interrupt (Mordechai, Beit Yosef, Taz). And in Baer Heitev which precedes he wrote regarding Magen Avraham that he is stringent in this; and his intent is to what Magen Avraham wrote in note 8 that even if he began while still day he must interrupt at tzeit hakochavim; and he was not precise in this — for there it refers to when there is no time etc. as written in the note after it — and this requires further study:",

  "baer-heitev/part-001.txt|2:ד":
    "<b>For tefillah.</b> And even if he began while permitted he interrupts — see above siman 232:",

  "baer-heitev/part-001.txt|3:_":
    "<b>Immediately at tzeit hakochavim.</b> And it is forbidden to do all the melachot mentioned in siman 232. Beit Yosef:",

  "baer-heitev/part-001.txt|4:_":
    "<b>Drunk.</b> And if he became drunk after the beginning of the time of Keriat Shema it is not called ones and he has no measure to read except until dawn rises and no more. Taz:",

  "beer-hagolah/part-001.txt|1:א": "Berachos 2.",
  "beer-hagolah/part-001.txt|1:ב": "Shabbos 35.",
  "beer-hagolah/part-001.txt|1:ג": "Rabbeinu Yonah there in Berachos.",
  "beer-hagolah/part-001.txt|1:ד": "So Beit Yosef ruled for halachah.",
  "beer-hagolah/part-001.txt|1:ה": "There.",
  "beer-hagolah/part-001.txt|2:א":
    "Beit Yosef — according to Rabbeinu Yonah and Rashba on that which is stated there in the Gemara 4.",
  "beer-hagolah/part-001.txt|2:ב":
    "Mordechai in the first chapter of Shabbos and Ran there — from that they interrupt for Keriat Shema and from that in Sukkah 35.",
  "beer-hagolah/part-001.txt|3:א":
    "Rabbeinu Yonah there — according to all the tanna'im that Rish explained in the first chapter of Berachos.",
  "beer-hagolah/part-001.txt|3:ב": "There — and like the Sages.",
  "beer-hagolah/part-001.txt|4:א": "There 40 — like Rashbi because of R' Akiva.",
  "beer-hagolah/part-001.txt|4:ב": "There in the Gemara.",

  "beur-hagra/part-001.txt|1:א":
    "<b>Seif 61 — time etc.</b> Mishnah and baraita there and all say etc. and R' Yehuda in the other baraita; and even though in the mishnah it concludes that R' Eliezer — that is the latter part until end etc. as written; and some say the first part etc. and even according to the first explanation R' Eliezer is also — but like the Sages it is obvious that otherwise the Sages should have disputed also on the first part; and see Rashi there in the mishnah s.v. until end etc.; and so all the poskim except Rabbeinu Tam; and all the poskim already disputed him; and so too all the Geonim:",

  "beur-hagra/part-001.txt|1:ב":
    "<b>Three etc.</b> Avudraham; and so they said in Yerushalmi at the beginning of Berachos there regarding Keriat Shema:",

  "beur-hagra/part-001.txt|1:ג": "<b>Small stars.</b> Taz and Magen Avraham:",

  "beur-hagra/part-001.txt|1:ד":
    "<b>And if he read etc.</b> For it is a safek d'oraisa; and in Yerushalmi there — safek he read safek he did not read what is the law? We learn from this: one who reads before then does not fulfill his obligation; and before then it is not a safek; and you say he must read? The baraita safek he read safek he did not read — he must read; and this is what is written and if etc.:",

  "beur-hagra/part-001.txt|1:ה":
    "<b>And if the congregation etc.</b> That is for one who practices like R' Yehuda as written in siman 233 seif 1; and Erech Shushan at the beginning of Berachos — they asked Rav Hai etc. and he answered etc. from plag haminchah and above like R' Yehuda etc.; and Tur wrote to read also Keriat Shema in the first [prayer] like one who reads in the Torah as Rashi wrote there — in order to stand in tefillah from words of Torah; and also the blessings he may read since the sun has set it is somewhat night for this matter; and as Maariv is considered for tefillah according to R' Yehuda even though for Keriat Shema it is not night for it is not time of lying down; and one may say roll light since the sun has set; and Ahavah Rabbah one may say likewise that their essence is not upon Keriat Shema; and see what is written in siman 60 seif 2:",

  "beur-hagra/part-001.txt|1:ו":
    "<b>However etc.</b> As above siman 233 that we hold one may act etc. and b'dieved etc. and in time of pressure etc.:",

  "beur-hagra/part-001.txt|2:א":
    "<b>Seif 2 — forbidden etc.</b> Tosafos 4:2 s.v. vekorei etc.; but Tur wrote that even before its time it is forbidden from sheki'ah in order etc. if he is accustomed etc. — meaning he should not say since the time has not arrived I will go etc. but he enters etc.; and Beit Yosef wrote that this is half an hour as written regarding Minchah and orally:",

  "beur-hagra/part-001.txt|2:ב":
    "<b>After its time arrived etc.</b> For if he began while permitted he need not interrupt even for Keriat Shema as written orally — for one does not interrupt for Shabbos; and see Tosafos there s.v. ein mafsikin etc.; and even though R' Yehuda disagrees there and we hold there that one spreads a cloth and sanctifies because Kiddush was enacted before the meal. Ran:",

  "beur-hagra/part-001.txt|2:ג":
    "<b>And he reads etc.</b> Rashba and Ran in the name of R' Yehuda — that the blessings are d'rabbanan like tefillah as written in the mishnah of Shabbos and Gemara of Sukkah and as explained; but etc.:",

  "beur-hagra/part-001.txt|2:ד":
    "<b>But if etc.</b> Rif in Shabbos there — for they said there; and according to the one who says it is obligatory we trouble him etc.; and Rif wrote and nowadays they established it as obligatory; and even though Rambam permitted we trouble him; and likewise regarding netilat yadayim; and Rashba wrote but if he began to eat not from sheki'ah — behold Minchah tefillah etc. and Rosh etc.; and seemingly it is superfluous for from the mishnah itself one could challenge — except that since he began to eat even according to the one who says obligatory he need not interrupt; and one could say the mishnah is from when he begins to eat. Rashba in his chiddushim first chapter of Shabbos:",

  "beur-hagra/part-001.txt|2:ה":
    "<b>And if there is no time etc.</b> As written in siman 232 seif 2:",

  "beur-hagra/part-001.txt|3:א":
    "<b>Seif 3 — l'chatchila etc.</b> From what is written 4:2 in order that not etc. — apparently even before its time they were concerned and required him to read and repeat — all the more so when its time arrives he should not delay according to all; and their dispute in the mishnah is regarding b'dieved only. Tur:",

  "beur-hagra/part-001.txt|3:ב":
    "<b>And its time etc. and if he delayed etc.</b> Rambam; and as written in Yerushalmi there; and R' Gamliel disagrees with the Sages and acted accordingly; and behold R' Meir disagrees with the Sages and did not act accordingly; and behold R' Akiva disagrees with the Sages and did not act accordingly; Rashbi disagrees with the Sages and did not act accordingly; and they brought there the incident in Shabbos 11a and Nazir 52a; and see Tosafos there s.v. ma'aseh etc.; and in Pesachim in Tosafos s.v. ani note 2; and see Gemara Berachos 37a; and the explanation in Yerushalmi there — there they could fulfill the words of the Sages; but here midnight already passed and they could not fulfill the words of the Sages; he said to them act accordingly — and this is what is written if he delayed etc.; but in ones even after dawn he may read as written below and in siman 58 — and not like Rosh there seif 9 who wrote one need not be stringent etc. for the Sages etc.; but Rambam holds that according to the Sages even b'dieved he does not fulfill and he should not read at all after chatzos as written — for in shev v'ein ta'aseh they may uproot a d'oraisa; and so too Tur there; and so too in the Yerushalmi mentioned — for it challenges and acts accordingly; and there it is b'dieved — except that in our Gemara it is not stated so for we say 9a until now etc. — this is what etc.; and the difficulties of Yerushalmi are also resolved; but one may say the Tanna Kamma according to the Sages does not hold so; and halachah is like R' Gamliel b'dieved; and especially since Rambam always inclines after the Yerushalmi:",

  "beur-hagra/part-001.txt|4:א":
    "<b>Seif 4 — unless etc.</b> There when he came etc.:",

  "beur-hagra/part-001.txt|4:ב":
    "<b>And an ones etc.</b> Tosafos there s.v. uvalvad etc.:",

  "beur-hagra/part-001.txt|4:ג":
    "<b>But etc.</b> Kol Bo there:",

  "biur-halacha/part-001.txt|1:א":
    "<b>And if the congregation advance etc. — and he prays with them.</b> And in Maaseh Rav ot 65 he wrote that it is better to pray Maariv at its time alone if he cannot gather ten at the time of Keriat Shema; and even on Shabbos his opinion there is that he should pray at its time specifically:",

  "biur-halacha/part-001.txt|1:ב":
    "<b>However he should not return and pray etc.</b> — The wording is ambiguous: since he prays with them l'chatchila because an individual's prayer is heard only with the congregation, it is obvious he should not return and pray because of a blessing in vain; and further — one accustomed to piety — how is it permitted for him to return and pray? And possibly his intent is as Rav Hai wrote and is brought in Beit Yosef — that some are accustomed to pray with the congregation a nedavah tefillah and afterward when its time arrives pray again the obligatory tefillah; and Beit Yosef wrote that in this one must know himself to be careful and zealous in intent — see there; and for this one may explain the intent here in the Hagah; and afterward I found that so explained the Levush and so copied in his work — see there; but in truth all this is strained; one who examines the source in Mordechai and Hagahot Maimoni and Terumat HaDeshen will see they never mention returning to pray — rather they all wrote one must practice like Rabbeinu Tam to read and pray after plag haminchah; and those who delay Keriat Shema and tefillah until tzeit hakochavim appear arrogant; and their intent is because they separate from the congregation who read and pray after plag haminchah; and Beit Yosef wrote that regarding tefillah one may rely on them not to separate from the congregation and pray with them equally; but regarding Keriat Shema — since according to most poskim they do not fulfill before tzeit hakochavim — certainly he may delay after his reading until tzeit hakochavim; and so copied Darkei Moshe; and as it appears there is a printing error here and it should read: however he should not delay praying at night etc.; and so is truly the wording in Terumat HaDeshen — see there; and the Mechaber's words refer to this; and his intent is that although regarding Keriat Shema if he wishes to wait with Keriat Shema and its blessings until tzeit hakochavim he certainly acts well — as is truly the custom in our time — nevertheless at minimum he should pray with the congregation; and if he also delays tefillah it appears arrogant. And possibly further the word yachzor is extra — the language is and because regarding Keriat Shema according to the custom that they read with the congregation he wrote yachzor he also wrote yachzor here; and the intent is when he is accustomed to piety he should delay tefillah — strained:",

  "biur-halacha/part-001.txt|2:_":
    "<b>And if he began to eat etc.</b> — And likewise when he began the melachot we wrote earlier — the same law applies [Chayei Adam]:",

  "biur-halacha/part-001.txt|3:_":
    "<b>And its time until chatzos.</b> — The Mechaber ruled anonymously like Rambam and Semag and not like Rashba and Rosh who hold we do not hold like the Sages who made a fence until chatzos; and see in Sha'agat Aryeh siman 4 that his opinion for the law is like Rashba and Rosh; and he extensively refuted Beit Yosef's words in what he brought proof for Rambam's view — see there at end of the responsum; and his words there are not necessarily required to refute Beit Yosef; we can also say that R' Gamliel too admits to the Sages for the law that there is a fence l'chatchila until chatzos and he did not come to dispute in the mishnah except on R' Eliezer who holds from the Torah it is only the first watch [and so wrote Gra in Shenot Eliyahu]; and what needed to be decided in the Gemara halachah keR' Gamliel even though the Sages also hold so and halachah keRov — because the Sages did not explain in their words that chatzos is only because of a fence and in this R' Gamliel's sons were uncertain — see there in the Gemara that the Sages answered them I hold so; and he said halachah keR' Gamliel as he answered his sons; and also from the plain language of the mishnah it is proven that R' Gamliel holds chatzos is a fence of the Sages in other matters; and why is it said that in Keriat Shema he disputes the Sages and does not hold a fence at all; and see Gra's words in his commentary where he also brought support for Rambam; and in truth there are several early great authorities who follow Rambam and Semag — namely Ramban in Milchamos, Semak, Rabbeinu Yerucham, and Abudraham [and also from Raavad and Tosefta it implies they ruled so for halachah]; one who examines Rif's words well will see he too stands in this method; and certainly one should not reject all these early authorities from halachah; however I found that Rosh and Rashba are not alone — for so is found in their words in Tosafos Rabbeinu Yehuda and Ri'az brought in Sefer HaGan; nevertheless the majority of rabbis follow Shulchan Aruch as above; and so in Chayei Adam he copied Shulchan Aruch for halachah. And in a place of pressure such as teaching Torah to others etc. one may rely on Rosh's method even after chatzos; and so implies in Magen Giborim:",

  "biur-halacha/part-001.txt|4:_":
    "<b>After alos hashachar before hanetz.</b> — He cited both languages to teach us that without ones even if he read immediately when alos hashachar rose he also does not fulfill; and in ones even if he read afterward as long as the sun has not risen he fulfills — so all the poskim:",

  "eliyah-rabbah/part-001.txt|1:_":
    "[1] <b>[Levush] Maariv is optional etc.</b> Responsa of R' Yom Tov Tzahalon siman 70 in pilpul Berachos daf 26–27. Small stars etc. This is Beit Yosef's language in the name of Rabbeinu Yonah — although medium stars are certainly night, nevertheless since we are not expert between medium and small one must be careful until the small ones are seen — until here his language. And one must say the word leketanim is a scribal error and it should read between medium and large — for large ones are visible by day. But it is difficult — for below siman 562 regarding a fast Rama and Levush ruled medium stars are certainly night. Again a book of Taz was printed and he wrote that regarding a fast they did not require all this; and the words of Rabbeinu Yonah mentioned above he brought as they are and did not notice that regarding a fast it is more lenient. Beit Yosef wrote — this is his language: Ohel Moed wrote regarding Keriat Shema — from when two stars are seen it is called night and he does not know his source — until here his language. And it is not difficult — for in two stars visible it is bein hashemashos as stated in chapter Bameh Madlikin; and if so one may say he holds like Tur wrote regarding Keriat Shema and tefillah we hold like R' Eliezer who said from when the day is sanctified on erev Shabbos — and that is bein hashemashos as Rashi explained at the beginning of Berachos; and nevertheless for the law we hold we require three stars and it implies even scattered; and that which below siman 293 on Shabbos we require consecutive — that is because of adding chol on the kodesh as explained in Beit Yosef there; and Olas Tamid challenged and attacked Shulchan Aruch there and erred in this:",

  "eliyah-rabbah/part-001.txt|2:_":
    "[2] <b>He returns and reads etc.</b> And he should begin to say El Melech Ne'eman Shema etc.; and so wrote Lechem Chamudos; and see above siman 61:",

  "eliyah-rabbah/part-001.txt|3:_":
    "[3] <b>And when its time arrives etc.</b> His reason is that he holds like most poskim that one fulfills with Maariv Keriat Shema from plag haminchah and above — only that nevertheless one must be concerned for poskim that its time is tzeit hakochavim; one should read Keriat Shema without its blessings at tzeit hakochavim; and what Taz challenged on Shulchan Aruch to fix reading three sections of Keriat Shema on his bed and rely on this — he omitted the words of Tosafos Rabbeinu Yonah at the beginning of Berachos that l'chatchila one must read before eating; and further lest he not think to fulfill but to save from harmful spirits; and nevertheless certainly one who is not accustomed to read at tzeit hakochavim should read on his bed at least two sections and intend therein to fulfill; and now the wonder of Shiltei Giborim daf 4 that the words of Rabbeinu Yeshaya contradict — is not difficult at all for there is a distinction between reading to fulfill at tzeit hakochavim — see there that it is clear. Magen Avraham wrote what Olas Tamid wrote — that if not so there would be no difficulty for the Sages — he has no explanation; on the contrary this is their difficulty — the Sages hold one must read and pray at night — until here his language. And in my humble opinion he has a broad explanation — for Bach explained Tosafos [Berachos] daf 26 that what they said the Sages hold tefillah at night — that is from Kerchiat Shema at night perforce tefillah at night since one must connect geulah to tefillah; and if so if they read Keriat Shema with its blessings by day in order to connect geulah to tefillah one may rely and pray by day — only at night he returns and reads Keriat Shema alone:",

  "eliyah-rabbah/part-001.txt|4:_":
    "[4] <b>[Levush] The blessings are not etc.</b> It is difficult — why do I need this reason? Behold he himself wrote in siman 2 like Rashba that the blessing of Keriat Shema is not blessings (but) upon Keriat Shema itself; and so Beit Yosef wrote this reason here; and Levush Yom Tov also wondered on him. Again I examined Beit Yosef siman 60 where he also wrote in the name of Rashba himself this language that blessings are not me'akev — and that is truly from this reason that they are not blessings upon Keriat Shema; and so implies in Rashba's chiddushim at the beginning of Berachos. Alternatively for extra stringency they wrote the reason that blessings are not me'akev — this even if they are upon Keriat Shema itself like other blessings that are not me'akev; and that which they wrote the reason they are not upon Keriat Shema itself — that is lest it be said that what they say the blessings in the congregation before the time of reading is a blessing in vain — understand well. And see above siman 58 and end of siman 67; and see above siman 62 that he wrote blessings are not me'akev because they are not d'oraisa — but as I explained — understand well:",
};

// Continue in part 2 file - split for maintainability
const part2 = await import("./_siman235-translations-part2.mjs");
const part3 = await import("./_siman235-translations-part3.mjs");
Object.assign(TRANSLATIONS, part2.TRANSLATIONS, part3.TRANSLATIONS);

const missing = [];
for (const b of blocks) {
  const k = `${b.rel}|${b.key}`;
  if (!TRANSLATIONS[k]) missing.push(k);
}
if (missing.length) {
  console.error("Missing translations:", missing.length);
  missing.forEach((m) => console.error(m));
  process.exit(1);
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function buildFixesObject(batchBlocks) {
  const fixes = {};
  for (const b of batchBlocks) {
    if (!fixes[b.rel]) fixes[b.rel] = {};
    fixes[b.rel][b.key] = TRANSLATIONS[`${b.rel}|${b.key}`];
  }
  return fixes;
}

function serializeFixes(fixes, batchNum, count) {
  let out = `/** worker-slot-5 — siman 235 editorial batch ${batchNum} fixes (${count} blocks) */\nexport const FIXES = {\n`;
  for (const [rel, blockFixes] of Object.entries(fixes)) {
    out += `  "${rel}": {\n`;
    for (const [key, en] of Object.entries(blockFixes)) {
      out += `    "${key}":\n      \`${esc(en)}\`,\n`;
    }
    out += `  },\n`;
  }
  out += `};\n`;
  return out;
}

function writeApplyScript(batchNum) {
  return `#!/usr/bin/env node
/** worker-slot-5 — siman 235 editorial batch ${batchNum} */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { FIXES } from "./_siman235-slot5-batch${batchNum}-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "..", "output", "siman_235");
let total = 0;
for (const [rel, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = \`\${b.seif}:\${b.marker || "_"}\`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\\n\\n");
  fs.writeFileSync(fp, out.endsWith("\\n") ? out : out + "\\n", "utf8");
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);

import { spawnSync } from "child_process";
const sync = spawnSync(
  process.execPath,
  [path.join(__dirname, "sync-queue-from-output.mjs"), path.join(__dirname, "work", "editorial-queue-siman-235.json")],
  { cwd: path.join(__dirname, ".."), stdio: "inherit" }
);
if (sync.status !== 0) process.exit(sync.status ?? 1);
`;
}

let start = 0;
for (let bi = 0; bi < 3; bi++) {
  const slice = blocks.slice(start, start + BATCH_SIZES[bi]);
  const fixes = buildFixesObject(slice);
  const batchNum = bi + 1;
  fs.writeFileSync(
    path.join(__dirname, `_siman235-slot5-batch${batchNum}-data.mjs`),
    serializeFixes(fixes, batchNum, slice.length),
    "utf8"
  );
  fs.writeFileSync(
    path.join(__dirname, `_apply-siman235-batch${batchNum}-slot5.mjs`),
    writeApplyScript(batchNum),
    "utf8"
  );
  console.log(`batch${batchNum}: ${slice.length} blocks written`);
  start += BATCH_SIZES[bi];
}
console.log("total", blocks.length);
