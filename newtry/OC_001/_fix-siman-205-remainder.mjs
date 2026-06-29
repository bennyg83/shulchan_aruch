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

const er = "output/siman_205/eliyah-rabbah/part-001.txt";
const kh = "output/siman_205/kaf-hachayyim/part-001.txt";
const ls = "output/siman_205/levushei-serad/part-001.txt";
const mh = "output/siman_205/machatzit-hashekel/part-001.txt";
const ma = "output/siman_205/magen-avraham/part-001.txt";

patch(
  er,
  "eliyah-rabbah",
  5,
  "_",
  `(ה) <b>[Levush] And it appears to me that even etc.</b> Beit Yosef's words in siman 202 in the name of Rashba himself were omitted — he ruled above that one blesses shehakol, for here the reason is since most of their eating is through cooking, the water of their cooking is like them; but above it speaks of something that is not customary to cook or to squeeze but to eat them as they are — we do not say their water should be primary, and so ruled all the latter authorities. Rosh wrote in responsum general rule 4 siman 15: water in which vegetables were cooked — since the essence of their cooking is for the vegetables, therefore since the vegetables gave taste in them we follow the taste, and even if they cooked the vegetables for the sake of their water for medicine, since the whole world cooks them for eating the blessing on the water did not change because of this, until here. It implies regarding herbs that they do not cook them to eat but only for a beverage one drinks from them — one blesses shehakol; and likewise water of berries and apple wine that stand for drinking:`,
);

patch(
  kh,
  "kaf-hachayyim",
  1,
  "_",
  `(א) [Seif 1] On vegetables one blesses borei peri haAdamah. And if he erred and blessed on vegetables borei min ha'adamah — he fulfilled his obligation b'dieved. The Rav Rishon LeTzion in his method, Orach Chayim end 71a. And accordingly the same applies if he blessed on legumes borei min hazeraim — he fulfilled b'dieved. However there is room to doubt if he blessed on vegetables borei min hazeraim whether he fulfilled. Birkei Yosef letter 4; but Shaarei Teshuvah letter 1 — it is obvious to him that he fulfilled, from what is written "and like a garden its plants will sprout" — see there:`,
);
patch(
  kh,
  "kaf-hachayyim",
  2,
  "_",
  `(ב) There, and even when cooked. Meaning that they are good raw and cooked; but if they are more important when cooked, then when raw one blesses shehakol and when cooked borei peri haAdamah; and likewise if the reverse and they are more important when raw — then raw borei peri haAdamah and cooked shehakol, as stated afterward. And all this is if eating them alone; but if eating them with bread within the meal one does not bless on them at all, for bread exempts them, as stated above siman 177 — see there:`,
);
patch(
  kh,
  "kaf-hachayyim",
  3,
  "_",
  `(ג) There, and likewise all fruits and legumes etc. Moist beans — whether raw or cooked — borei peri haAdamah. Dry ones that one eats raw — shehakol. Ri'az in Beit Din in Sefer HaTerumah chapter 24. Kenahag in Hagahot Tashbetz, and so too Magen Avraham seif kaf-alef, that on dry legumes one who eats them raw blesses shehakol — end of his words; it implies that if eating them moist raw one blesses borei peri haAdamah. However the custom is to bless on moist beans raw shehakol, and likewise on beans called in Arabic lubiya (as Rambam wrote at the beginning of Kilayim), and likewise on fava beans, and likewise on every kind of seeds that are customarily cooked — one blesses on them when raw shehakol and when cooked borei peri haAdamah. And it appears to me the reason according to what Rif wrote in chapter 24: anything that is not people's custom to eat raw — we bless on it shehakol, and if cooked we bless borei peri haAdamah — end of his words; and these too are not customarily eaten except cooked, as is known, and also people do not plant them except in order to cook them, and therefore one does not bless on them when raw except shehakol:`,
);
patch(
  kh,
  "kaf-hachayyim",
  4,
  "_",
  `(ד) There. And legumes etc. Legumes that he made into roasted snacks, such as beans and lentils and chickpeas and the like — one blesses on them borei peri haAdamah. Birkei Yosef letter 1 in the name of Mahari Binyamin in manuscript. And so Shelah in Sha'ar HaOtiot, dalet-tzadi-alef 72, general rule 5 letter 13; and likewise on lupines after they cook them one blesses borei peri haAdamah. Berachot 58b. And it is a species of legume as Rashi z"l wrote in Beitzah 25b. And so at the beginning of tractate Kilayim; and see RaSH there. And not as one who wrote that it is in the category of tree fruits — for that does not exist, for it is against the Gemara. And see Darchei Moshe in Hagahot Tashbetz letter 1:`,
);
patch(
  kh,
  "kaf-hachayyim",
  5,
  "_",
  `(ה) There. That they are good raw and cooked etc. Meaning that it is so good cooked as raw and raw as cooked. Shelah there dalet-tzadi-alef 71. However Magen Avraham seif gimmel wrote: when they are good raw, even though they are better when cooked — one blesses raw borei peri haAdamah — see there. And this is if most people eat them raw, as stated above siman 202 letter kaf — see there. And so Ein Ayah on this siman letter gimmel. Razah letter 1:`,
);

patch(
  ls,
  "levushei-serad",
  1,
  "_",
  `Taz seif gimmel — and when one cooks them borei peri haEtz when they are better [than raw], as it should be:`,
);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "_",
  `(seif kaf-alef) And legumes etc. As stated siman 208 seif 4 in the gloss on cooked barley:`,
);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "_",
  `(seif bet) And cabbage etc. And so in the Gemara regarding salted — the wording "and likewise" is not precise, for the law of pickled (kavush) one could say is like cooked for blessing is explained in this siman; rather Magen Avraham wrote it is a law in itself, that even salted one could say is like cooked for blessing, from what they said in Berachot daf 38b: they bring proof that cooked dishes remain in their salted state, from what Rabbah bar Avuha said: I saw R' Yehudah eat a salted olive (Rashi: it was salted several days, and we hold salted is like boiling) and he blessed before and after. If so, cooked dishes remain in their salted state — at first he blessed borei peri haEtz and at the end one blessing corresponding to three. If not in their salted state — granted at first he blessed shehakol, but at the end what does he bless? And they pushed off: perhaps he blessed after him borei nefashot rabot — behold he brought proof for cooked dishes that it remains in its salted state, from salted it remains in its salted state — therefore salted is a law of cooking for blessing. And see also that it is good, as it should be:`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "א",
  `(seif gimmel) More cooked than raw. Taz wrote etc. — meaning from the language of Shulchan Aruch it implies: if better cooked than raw, even though they are also fit to eat raw, nevertheless when raw one blesses shehakol; but Tur wrote specifically if they are not eaten raw etc.:`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "ב",
  `And likewise siman 202 seif 12, that wrote: if there is no way to eat them raw except cooked — when raw one blesses shehakol; and Magen Avraham understood from what he wrote "there is no way to eat them raw" — therefore they are not fit raw; for if not, even if cooked is better, nevertheless the way is also to eat them raw; therefore it requires specifically that they not be eaten at all raw. And therefore the language of Shulchan Aruch here is not precise:`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "ג",
  `Nevertheless it is possible that regarding petrezil etc. — meaning there is no proof from petrezil, for possibly better raw than cooked and therefore they bless on it raw borei peri haAdamah, and even though our eyes see it is better cooked — that is because the way is to cook it with meat and the improvement is not from petrezil itself, and it is like onions and carrots that possibly if one cooks petrezil alone it changes for the worse:`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "ד",
  `And in the Gemara it says (Pesachim daf 115 and Tur siman 473 and 475): if he has no vegetable for dipping for the first [food] on the first night of Pesach, he takes maror for one dipping and blesses on it borei peri haAdamah, even though the maror we take for the mitzvah of maror is better cooked; nevertheless since in any case it is also fit raw, even though better cooked — one blesses on it when raw borei peri haAdamah, and from this is proof for Tur:`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "ה",
  `As I wrote siman 473, that he brought Magen Avraham in the name of my father Maharil: whether to bless on petrezil raw borei peri haAdamah — it is doubtful to him why, since better cooked than raw; and likewise on maror Magen Avraham wrote there, and these are his words: and it must be said their maror was fit to eat raw like endives — end of his words. And it is possible that species is better raw than cooked:`,
);
patch(
  mh,
  "machatzit-hashekel",
  4,
  "א",
  `(seif dalet) And onions and carrots (written in Sefer Or Zarua in the name of R' Avraham Chaviv: carrots is what we call eshlich):`,
);
patch(
  mh,
  "machatzit-hashekel",
  4,
  "ב",
  `And Bach ruled etc. and it is not compelled. Meaning Tur wrote in the name of Rif who holds that onions and carrots when raw — shehakol, and when cooked borei peri haAdamah:`,
);
patch(
  mh,
  "machatzit-hashekel",
  4,
  "ג",
  `And Beit Yosef wrote he did not know from where this ruling of Tur came in the opinion of Rif, for truly it is explained in Rif that he holds both raw and cooked borei peri haAdamah; and Bach settled the opinion of Tur that indeed such is Rif's opinion as Tur wrote in his name. And if so, both raw and cooked there is a dispute whether to bless borei peri haAdamah or shehakol — for raw Rif holds borei peri haAdamah and Beit Yosef shehakol; and cooked Rif shehakol and Beit Yosef borei peri haAdamah as in Shulchan Aruch. And therefore to remove himself from doubt one blesses both raw and cooked shehakol, for doubtful matters the rule is shehakol, as Magen Avraham wrote that Bach's words are not compelled in explaining Rif; rather the main thing is as Beit Yosef wrote in Rif's intent — both raw and cooked borei peri haAdamah. And if so, raw — all agree borei peri haAdamah. And Taz wrote in seif bet: regarding onions which are garlic and leeks — when eating them while small until they have not aged, then raw borei peri haAdamah; but when they have aged, that they are not fit to eat raw except with bread — then raw shehakol and cooked borei peri haAdamah, as Tur wrote in the name of Rif:`,
);
patch(
  mh,
  "machatzit-hashekel",
  5,
  "א",
  `(seif heh) There is no etc. to bless on a nut fully fried in honey:`,
);
patch(
  mh,
  "machatzit-hashekel",
  5,
  "ב",
  `Unlike here where the meat is primary, and the meat does not come to improve and fix the onions and carrots:`,
);
patch(
  mh,
  "machatzit-hashekel",
  5,
  "ג",
  `And if so, when frying vegetables in fat — then even though the vegetables are improved through the fat, nevertheless since the fat comes to improve and fix the vegetables — one blesses on the vegetables borei peri haAdamah:`,
);

patch(
  ma,
  "magen-avraham",
  1,
  "א",
  `(א) <b>And legumes.</b> It appears to me that on dry legumes one who eats them raw — one blesses shehakol, as in siman 205 seif 4 in the gloss:`,
);
patch(
  ma,
  "magen-avraham",
  1,
  "ב",
  `(ב) <b>And cabbage.</b> And if it is pickled such that it is fit to eat raw — one blesses borei peri haAdamah (Shelah), and so in the Gemara regarding salted — its law is like cooked for this matter, and see also if better when salted:`,
);
patch(
  ma,
  "magen-avraham",
  1,
  "ג",
  `(ג) <b>More cooked.</b> Taz wrote that when not eaten raw — when raw shehakol, and so siman 202 seif 12; but when they are good raw, even though better when cooked — nevertheless one blesses raw borei peri haAdamah; and so is the custom on Pesach night on petrezil borei peri haAdamah, even though better cooked than raw, and so siman 202 seif 12. Nevertheless it is possible if one cooks petrezil without meat it changes for the worse. And in the Gemara it says on maror one blesses borei peri haAdamah, and it is possible if one cooks it by itself that it is for the worse — as I wrote siman 473:`,
);

const PATCH_COUNT = 23;
console.log(`ok siman 205 remainder — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(OC_ROOT, "pipeline/work/editorial-queue-siman-205.json");
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
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs"
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
