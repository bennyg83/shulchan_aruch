import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";

function patch(file, slug, seif, marker, newEnglish) {
  let t = fs.readFileSync(file, "utf8");
  const esc = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(slug: ${slug}\\r?\\nseif: ${seif}\\r?\\nmarker: ${esc}\\r?\\n\\*\\*\\*\\* HEBREW \\*\\*\\*\\*\\r?\\n[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\r?\\n)([\\s\\S]*?)(\\r?\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
    "m",
  );
  if (!re.test(t)) throw new Error(`${file} ${slug} ${seif} ${marker}`);
  t = t.replace(re, `$1${newEnglish}$3`);
  fs.writeFileSync(file, t);
}

const mb = "output/siman_208/mishnah-berurah/part-001.txt";
const nc = "output/siman_208/netiv-chayim/part-001.txt";
const pm = "output/siman_208/peri-megadim/part-001.txt";

patch(
  mb,
  "mishnah-berurah",
  8,
  "ח",
  `(40) One blesses shehakol — and b'dieved if he blessed borei peri haAdamah, Chayei Adam wrote that he has fulfilled.`,
);
patch(
  mb,
  "mishnah-berurah",
  9,
  "א",
  `(41) One blesses borei minei mezonot, etc. — as explained above in seif 2, see there.`,
);
patch(
  mb,
  "mishnah-berurah",
  9,
  "ב",
  `(42) One blesses haMotzi and Birkat HaMazon — for it is complete bread.`,
);
patch(
  mb,
  "mishnah-berurah",
  9,
  "ג",
  `(43) Within the time of eating a peras — a peras is half a loaf of an eruv; some say three eggs and some say four; and a kezayit is half an egg. And we measure with it all prohibitions — that if one eats a kezayit of forbidden food and he eats it within a time longer than the measure of eating a peras, it does not combine for lashes and liability for a sin-offering. And the same applies regarding Birkat HaMazon — for we require specifically that one eat a kezayit of grain; the measure of his kezayit does not combine unless so that he can eat it within the measure of eating a peras. And if so, one does not bless Birkat HaMazon unless grain flour was mixed in, at least one eighth — for then if he eats from the bread four eggs' worth, from that there will be a kezayit of grain and he is obligated in Birkat HaMazon.`,
);
patch(
  mb,
  "mishnah-berurah",
  9,
  "ד",
  `(44) At the beginning one blesses haMotzi, etc. — as is decided below in siman 210 that for the first blessing one need not have a measure, for even on anything one blesses the blessing fitting for that species; and grain species are important and are not nullified in their mixture in any manner since their taste is aroused.`,
);
patch(
  mb,
  "mishnah-berurah",
  9,
  "ה",
  `(45) Taste of grain — if they are not important they are nullified and one blesses shehakol and borei nefashot.`,
);
patch(
  mb,
  "mishnah-berurah",
  9,
  "ו",
  `(46) And at the end, etc. — even if he ate only a kezayit from the bread.`,
);
patch(
  mb,
  "mishnah-berurah",
  9,
  "ז",
  `(47) Al haMichya — many of the Acharonim were troubled by this, for we do not find anything like it in blessings — that at the beginning haMotzi and at the end al haMichya. And furthermore, why is this different from what he wrote regarding cooking in a pot, that one blesses at the end only borei nefashot because there is not within it the measure of eating a peras; and the same applies regarding bread. And because of this, the Gra truly emended that here too it should say "and at the end borei nefashot," and many Acharonim toiled to settle the words of the Shulchan Aruch [see Eshel Avraham and Mateh Yehudah]. And because of this, it is fitting for one who fears Heaven not to eat such bread except within the meal. Nevertheless, one who acts per the words of the Shulchan Aruch — one should not protest against him, for thus have many Acharonim decided for the law. And know further that the same applies if in the bread was mixed grain flour of a kezayit within the time of eating a peras, but he ate only part of the bread such that from all the olives he ate there was not a measure of a kezayit of grain — he also does not bless Birkat HaMazon but only al haMichya per the Shulchan Aruch, or borei nefashot per the Gra.`,
);
patch(
  mb,
  "mishnah-berurah",
  9,
  "ח",
  `(48) In a pot — meaning that there was not in the flour of grain species a kezayit within the time of eating a peras [or that there was flour of the measure and he did not eat until a measure of kezayit, as in the previous note] — for even though at the beginning he blesses borei minei mezonot, as explained above in seif 2, nevertheless for al haMichya he cannot bless except on a measure of a kezayit of grain, and therefore he blesses only the blessing borei nefashot on account of the rest of the species mixed in this dish. And see in Biur Halacha where we explained that it is not specifically a mixture of flour in flour that is not very recognizable — grain species are the same: if one mixed the five species of grain with honey and spices or other species, and the same as seif 2 above — we also require that there be from the five species of grain a kezayit within the time of eating a peras; and if not, one does not bless an after-blessing except borei nefashot. And therefore kinds [groats] of the five species of grain that one cooks with vegetables and legumes and the like — one should not bless at the end al haMichya except specifically when he ate from the grain species a kezayit within the time of eating a peras. Nevertheless, regarding thin bread mixed with much spices [such as tsuker for liqueur] the world is accustomed to bless on it at the end al haMichya when there is in it a kezayit, even though in the grain species alone found in it there is not a measure of kezayit — perhaps their reasoning is because the spices come to make the food fit, they join with the food itself for the measure, as is stated similarly in Magen Avraham siman 210. And l'chatchila it is good to be careful to estimate that there be in the flour a measure of kezayit.`,
);
patch(
  mb,
  "mishnah-berurah",
  9,
  "ט",
  `(49) One blesses at the beginning borei minei mezonot — and also in this we require specifically that the taste of grain be somewhat recognizable; for if there was only something minimal from grain flour and its taste is not recognizable at all, it is nullified regarding the rest of the species and one blesses shehakol.`,
);

patch(
  nc,
  "netiv-chayim",
  1,
  "_",
  `(Magen Avraham s.k. 7.) If so, it is fitting to bless first on the pancakes and afterward on the water, as should be.`,
);

patch(
  pm,
  "peri-megadim",
  1,
  "_",
  `<b>One blesses.</b> Taz 25 in Tur — and one could say to Tur that the me'ein shalosh blessing is d'oraisa, see Tur Beit Yosef there. If so, the matter does not depend on importance. And it is possible that bread interrupted the matter entirely from diminishing the five species of fruit that also do not require me'ein shalosh (and all the more so for one who says in bread only one blessing, Magen Avraham 194:3). And it suffices with the borei nefashot blessing for the five species of fruit, and because of their importance with which Eretz Yisrael was praised, Chazal established me'ein shalosh. And know: for one who says me'ein shalosh is d'oraisa, nevertheless it emerges from borei minei mezonot, as the Derisha wrote in Tur; and it implies that everything from which borei minei mezonot [comes], there is no positive mitzvah in it but only a mitzvah in general — like half a measure and brought [on] Shabbat chapter Kol Gadol in the mishnah of the forty melachot that passing an object d'oraisa is included in hotza'ah, for otherwise there is no punishment from borei minei mezonot; and in the opening [section] it is included — this will be explained elsewhere. And if so, if there is a positive mitzvah to fulfill and the me'ein shalosh blessing and one cannot fulfill both, the positive mitzvah takes precedence. And for us, in any case me'ein shalosh is a doubt, Magen Avraham 172. And what they did not give importance in the first blessing — and in the five species of grain they gave even in the first — they are more important kinds, see Levush. And Nitzavot is from Tur. And date honey is borei nefashot. And in order that satisfaction from the five species of fruit — some say d'oraisa, behold kezayit is for everyone d'rabbanan; and satisfaction that one does not desire to eat those fruits — see Rashi.`,
);
patch(
  pm,
  "peri-megadim",
  10,
  "_",
  `<b>Like the blessing.</b> Taz — and for the Mechaber regarding rice, we go after the majority, as explained in that seif 9 from this.`,
);
patch(
  pm,
  "peri-megadim",
  11,
  "_",
  `<b>Upon.</b> Taz brought comment 2 — R' Yosef Karo, Magen Avraham ote 12; and R' Yosef Karo wrote that bread of rice and dochan — for he holds dochan is also borei minei mezonot, he wrote bread of rice and dochan in borei minei mezonot and holds that the way is to make bread from dochan like from rice; but the Mechaber ruled dochan is shehakol, and even bread, for the way is not to make bread from it like from rice. And one could say they do not disagree on reality, and one could say places differ; and therefore bread that they make from tertrakhi and viz in several places and it changed very much for the better, and the way is only to make bread from it, not to eat a dish from it — if so, it is difficult why he should bless borei peri haAdamah on its flour if not that it has another superiority, etc. And for comment 1 brought in Magen Avraham — perhaps on the contrary, its correction ruined it since it changed for the better, one cannot bless borei peri haAdamah. And groats are measured in borei minei mezonot and me'ein shalosh, and disagrees with what Magen Avraham wrote in ote 2 and 7, since their shell was removed — and we already wrote there from this. And what he wrote regarding tertrakhi shehakol — we already wrote in Magen Avraham ote 2 that it is understood why not borei peri haAdamah, and even if they stuck somewhat — whenever their appearance is recognizable, borei peri haAdamah, for they have no other superiority. And even if ground to flour in places where they are very accustomed, and the entire essence of planting tertrakhi (called retschki) is to grind and make flour — nevertheless there is no correct reason not to bless borei peri haAdamah like wheat flour if not that it has another superiority; see Eliyahu Rabba in Magen Avraham 8 and 62, and this requires further study.`,
);
patch(
  pm,
  "peri-megadim",
  12,
  "א",
  `<b>One blesses.</b> Taz — as Rashi 61 and 168:69, haMotzi on anything (Tosafot 59); and Magen Avraham in ote 15 and Magen Avraham ote 9 regarding the blessing on rice and dochan when they are whole or crushed — and this will be explained there.`,
);
patch(
  pm,
  "peri-megadim",
  12,
  "ב",
  `<b>Regarding.</b> Unripe grape — 62:62 borei peri haAdamah and after-blessing there is doubt, as Tosafot write here that perhaps borei peri haAdamah was not instituted as me'ein shalosh, or that there is no manner of eating thus; Magen Avraham 211:8 — and to say me'ein shalosh on the tree and on the fruit of the tree, b'dieved he has fulfilled, as Magen Avraham wrote 206:1 — but the initial blessing one should say borei peri haAdamah and in the after-blessing on the tree and on the fruit of the tree; and why did the Mechaber not write above thus — because of the after-blessing, and this requires further study.`,
);
patch(
  pm,
  "peri-megadim",
  12,
  "ג",
  `<b>At length</b> what is difficult here, see there. And it is reasonable: all that before him is bread from the five species of grain, even if it is not clean and bread mixed, and there is a kezayit within the time of eating a peras from wheat — nevertheless barley bread without mixture is preferable for haMotzi; see 168:64. And know that peras has a dispute in 210:64 — some say three eggs, and it would be a sixth part of grain among other species — one blesses haMotzi and Birkat HaMazon on bread, and on a dish borei minei mezonot and me'ein shalosh; and according to one who says four eggs, it would be an eighth part in it, and on a dish when there is an eighth part one blesses from doubt shehakol and borei nefashot; but on bread, Birkat HaMazon is d'oraisa and we are stringent; see 168:96 and 184; and in Magen Avraham 8. And this requires further study whether everything combines, or satisfaction from grain alone; and this will be explained further in Magen Avraham 15. If one mixed flour of other species with grain flour — this requires further study whether it is min b'mino following the majority; according to one opinion other flours have the law of rice flour, etc., and according to another for wheat and barley it is min b'mino following the majority, and there is a practical difference in cooked dish and in the five [species] — this will be explained in Yom Tov and if it was ground and mixed; and see the two seifim there.`,
);
patch(
  pm,
  "peri-megadim",
  12,
  "ד",
  `<b>And behold</b> what the Mechaber wrote regarding mixture, etc. — this is the opinion of RaDa in the name of Terumat Yerushalayim; but the opinion of R' Avraham in the name of Baal HaAshkol from Keresh — it implies even if there is not within the time of eating a peras; for one does not distinguish between flour and other species, Magen Avraham 15; and Beer HaGolah explained per the view of R' Avraham and RaDa — and this requires further study somewhat. Furthermore I will explain to you: within the time of eating a peras, haMotzi and Birkat HaMazon — evidently like kebayim is important, and on a dish borei minei mezonot and the me'ein shalosh blessing — specifically the five species of grain that are important, behold other species when one mixes tree fruit with borei peri haAdamah and mixes them together and their form is somewhat recognizable — we go after the majority; and do not say specifically in beverage is the law thus, as in siman 202 we go after the majority, and as one authority in the plain [text] in siman 212 seif 10 regarding beverages they do not combine more than a revi'it — but also in foods the law is so, as we wrote; and see siman 210 there.`,
);
patch(
  pm,
  "peri-megadim",
  13,
  "_",
  `<b>In the blessing.</b> Taz — and in this blessing there are four blessings: on haMichya — zan; and on eretz; blessing of eretz, rachem, Boneh Yerushalayim, Ki Atah tov u'metiv corresponding to tov u'metiv; and they called it me'ein shalosh d'oraisa — see Tur and Levush. And if he omitted eretz he returns; and see Levush at length in the text of the blessing; and see there in ote 18 from this.`,
);
patch(
  pm,
  "peri-megadim",
  14,
  "_",
  `<b>Or.</b> Taz decided that one should read on the land and on the fruit of the vine; and after the fact the community's custom is so, see there; and Magen Avraham ote 16 agreed to this, and Bach wrote on the land and on the fruits.`,
);

const PATCH_COUNT = 20;
console.log(`ok siman 208 part8of11 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-208-part8of11.json",
);
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
for (const it of queue.items || []) {
  const abs = path.join(OC_ROOT, "output", it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  const b = blocks.find(
    (x) =>
      x.slug === it.slug &&
      String(x.seif) === String(it.seif) &&
      String(x.marker) === String(it.marker),
  );
  if (!b) throw new Error(`Block missing in file: ${it.id}`);
  it.rawBlock = serializeBlock(b);
}
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n", "utf8");
console.log(`Refreshed queue: ${queuePath}`);

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
  /\bLord's Prayer\b/i,
  /\bHashem's Word\b/i,
  /\bHashem's promise\b/i,
  /\bCapernaum\b/i,
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
  /\bthe craft\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bhand recoils\b/i,
  /\bIDF\b/,
  /\bDr\.\b/i,
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs",
);

let fail = 0;
for (const it of queue.items || []) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  if (!he) continue;
  if (!en || en.length < 8) {
    console.error("FAIL", it.id, "empty_english");
    fail++;
    continue;
  }
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      console.error("FAIL", it.id, `mt:${p}`);
      fail++;
      break;
    }
  }
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he,
    en,
  });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error") {
    console.error("FAIL", it.id, issues.map((i) => i.code).join(","));
    fail++;
  }
}
if (fail) {
  console.error(`Preflight: ${fail} failure(s) of ${queue.items.length}`);
  process.exit(1);
}
console.log(`Preflight OK — ${queue.items.length - fail}/${queue.items.length} blocks`);
