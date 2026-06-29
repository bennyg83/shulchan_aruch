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

const az = "output/siman_205/ateret-zekenim/part-001.txt";
const bh = "output/siman_205/baer-heitev/part-001.txt";
const bhg = "output/siman_205/beer-hagolah/part-001.txt";
const gra = "output/siman_205/beur-hagra/part-001.txt";
const bhc = "output/siman_205/biur-halacha/part-001.txt";
const er = "output/siman_205/eliyah-rabbah/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  1,
  "א",
  `And likewise all fruits and legumes, etc. And therefore arbeis shotin — whether raw or smoked, which they call patshelkes — and likewise when they cook them in soup, which they call erbvis zuppa, or when one eats them as gizzards mixed with salt and pepper — on all of these one blesses borei peri haAdamah, except for the legumes that one eats raw; on those one blesses shehakol. (Emek Berachah)`,
);
patch(
  az,
  "ateret-zekenim",
  1,
  "ב",
  `(ב) And garlic and leeks — when raw, borei peri haAdamah; after their cooking, shehakol. And some say the opposite, namely: raw — shehakol; cooked — borei peri haAdamah (Rif and Geonim and Tur). Therefore, out of doubt — whether raw or cooked — one should not bless borei peri haAdamah but only shehakol. (My teacher in Bach)`,
);
patch(
  az,
  "ateret-zekenim",
  1,
  "ג",
  `(ג) That they are considered to change for the worse, etc. And there is one who wrote that kraut and salad — all of these change after their cooking for the worse (Emek Berachah). Even one who prefers them more when cooked — his intention is nullified relative to every person, and we follow the majority (Tur in the name of Tosafot and Rosh).`,
);
patch(
  az,
  "ateret-zekenim",
  5,
  "_",
  `Turnip, etc. And even though the improvement and elevation did not come except because of the fat — thus my teacher explained in Bach: the Tur's view, who wrote like the words of Rabbeinu HaEi, and not as the Geonim and R' Yonah wrote per the view of Tosafot to the contrary.`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "א",
  `(א) <b>And legumes.</b> It appears to me that on dry legumes that one eats raw, one blesses shehakol. Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ב",
  `(ב) <b>And cabbage.</b> And if it is pickled such that it is fit to eat raw, one blesses borei peri haAdamah. Shelah, Magen Avraham, Taz.`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ג",
  `(ג) <b>And leeks.</b> Taz brought a distinction among garlic: that which has not yet aged is still fit to eat raw even without bread — one blesses borei peri haAdamah. But if it has aged, such that it is not fit to eat raw without bread — on it when raw one blesses shehakol, and after its cooking borei peri haAdamah. And likewise with onion there is this distinction. An etrog candied in honey — and likewise anything that grows on a tree and they make from it ein gemachts — one blesses borei peri haEtz, similar to a nut candied in honey as written siman 202, seif 13. But what they make from ground produce — there is a distinction: if it is a type of radish that some people candy in honey, its blessing then is shehakol, like garlic and leeks, since it changes for the worse in cooking without honey and is better raw than cooked; only the honey improves it — the improvement is not from themselves. But if they candy meyerin, rubin, and kirbis — one blesses borei peri haAdamah. And from this one may learn all the laws of ein gemachts; end of Taz's words.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "א",
  `(א) <b>Vegetables.</b> See above siman 202, seif kaf-tet, in the name of Maharshal.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ב",
  `(ב) <b>With meat.</b> The water has no taste except what it received from the meat — we follow the main substance. Therefore, in my view: if one cooked vegetables in vinegar or in a beverage called borscht, one does not bless on them as on vegetables but per the blessing of the beverage, since it still has its own taste; even if he cooked it with meat it did not lose its taste, like a nut and honey in siman 202, seif 13. Taz.`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "_",
  `<b>He squeezed them.</b> For they changed for the worse. And through crushing it is like cooking; see Taz. Water of berries and apple wine that stand for drinking — one blesses shehakol. And likewise the beverage they make on Pesach from apples — one blesses shehakol; see Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  5,
  "_",
  `<b>Turnip.</b> For example meyerin and rubin in a foreign language — even though they are also eaten raw, nevertheless since they are better cooked than raw, when raw one blesses shehakol and when cooked borei peri haAdamah. Green kraut — raw shehakol, cooked borei peri haAdamah. Salad mixed with vinegar and olive oil — borei peri haAdamah. Arbeis shotin — whether raw or cooked borei peri haAdamah, for they are good raw and cooked. Zwiebel kraut — borei peri haAdamah, whether raw or cooked. And a vegetable that is good raw but when cooked changes for the worse — such as a vegetable called cherries, or what is called tartar, or radish and the like — raw borei peri haAdamah, cooked shehakol.`,
);

patch(bhg, "beer-hagolah", 1, "א", `Berachot 35, and like the first Tanna.`);
patch(bhg, "beer-hagolah", 1, "ב", `There, 38.`);
patch(bhg, "beer-hagolah", 2, "א", `There, 39.`);
patch(bhg, "beer-hagolah", 2, "ב", `Tur in the name of his father the Rosh.`);
patch(bhg, "beer-hagolah", 3, "_", `There, in his view.`);
patch(bhg, "beer-hagolah", 4, "_", `In the Gemara there.`);
patch(bhg, "beer-hagolah", 5, "_", `Tur in the name of Rabbeinu HaEi:`);

patch(
  gra,
  "beur-hagra",
  1,
  "א",
  `(א) <b>Seif 1, and even, etc.</b> Gemara there teaches: vegetables, etc.`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ב",
  `(ב) <b>And likewise, etc.</b> Like Rav and Shmuel and Rabbah bar Avuha, R' Yitzchak and Abaye and R' Nachman bar Yitzchak and R' Zeira; and that which Ulla and R' Nachman — they are excluded there.`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ג",
  `(ג) <b>But gourd, etc.</b> There, like R' Chisda, not like the Rif; and Tosafot there s.v. meshachat, etc.`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ד",
  `(ד) <b>That they are considered, etc.</b> Tosafot there and Magen Avraham.`,
);
patch(gra, "beur-hagra", 2, "_", `<b>Seif 2, but, etc.</b> Magen Avraham.`);
patch(
  gra,
  "beur-hagra",
  3,
  "_",
  `<b>Seif 3, if, etc.</b> As written 38a in apple wine, etc., and in the book of the Rosh siman 202, seif 10.`,
);
patch(
  gra,
  "beur-hagra",
  5,
  "א",
  `(א) <b>Seif 5, turnip, etc.</b> Maharshal and water of turnip is turnip; and therefore when cooked or pickled it is discussed, and not like Rashi there s.v. parmi, etc.; and see there mishnah 2, or to a house, etc. And even though in ch. 83 of Shabbat they say "and this is when it has meat in it" — nevertheless turnip is primary, as Magen Avraham wrote seif 25; and see Tur that some hold like Rashi.`,
);
patch(
  gra,
  "beur-hagra",
  5,
  "ב",
  `(ב) <b>Or pickled, etc.</b> For pickled is like cooked even for blessing; for even salted is like cooked, as written 38b; and all the more so pickled, for we say salted is likewise, pickled, etc.`,
);

patch(
  bhc,
  "biur-halacha",
  1,
  "א",
  `(א) <b>And legumes, etc.</b> — He wrote in Emek Berachah: legumes and beans that one eats while moist — namely what they call arbeis shotin, whether raw or smoked (meaning slightly roasted in smoke), and they call it gebratene arbeis; or those legumes that they cook in water — whether one eats them within the soup, which they call arbeis zuppa, even if they have dissolved somewhat; or one eats them after cooking without soup, and the practice is to pour off all the boiling water from them and afterward the custom is to put salt and pepper in them and eat them as they are whole for dessert; or those that are not cooked in water at all but when dry they soak them in cold water until their skins have come off, and then they take them from the water and while the moisture of water is still on them they put them on perforated spits over coals — and that spit is pierced with very fine holes — and they fry them on it as they are without any liquid; on all of these one blesses borei peri haAdamah, for they changed for the better; end of his words, and the latter authorities copied him.`,
);
patch(
  bhc,
  "biur-halacha",
  1,
  "ב",
  `(ב) <b>That are good raw and cooked</b> — Chayei Adam wrote: specifically if the practice of the people of that place is to eat them thus raw; but if the practice of the people of that place is not to eat them thus raw, even though they are good to eat even not under duress — one blesses shehakol, for it is not considered fit to be called fruit.`,
);
patch(
  bhc,
  "biur-halacha",
  1,
  "ג",
  `(ג) <b>That are better cooked than raw</b> — see Mishna Berurah: for even when they are raw they are also good, since when they are cooked they are better; and this is proven from Magen Avraham — specifically when they are better in themselves when cooked, meaning even when one cooks them without meat; unlike if they are better only when one cooks them with meat — that is not considered that they are better, and therefore one blesses borei peri haAdamah when they are raw.`,
);
patch(
  bhc,
  "biur-halacha",
  1,
  "ד",
  `(ד) <b>When they are raw one blesses shehakol</b> — see Mishna Berurah regarding kraut from vinegar; and it would seem that if one eats the stalk of kraut one blesses borei peri haAdamah even when they are not pickled, since it is good for food and people eat it thus while raw; nevertheless it is possible that even so one blesses only shehakol, for the stalk is not considered the main kraut; and most people cut off the stalks and discard them or give them to animals.`,
);
patch(
  bhc,
  "biur-halacha",
  5,
  "_",
  `<b>Turnip, etc.</b> — see Mishna Berurah; and see Peri Megadim, who is uncertain: when one cooked turnip without meat and without butter and fat — whether one blesses borei peri haAdamah; and similarly Shaarei Teshuvah wrote aliba d'Magen Avraham. And I, the young one, was uncertain in these matters: one — that from Taz in seif 3 at its end it is proven explicitly that he holds that even if one cooked turnip without meat but only in water alone, it also changes for the better; and this was already noted in Shaarei Teshuvah. And also for Magen Avraham himself in seif 9 there is no proof that he holds it changes for the worse through cooking without meat; rather he says one must examine, etc., whether it changes for the better — meaning perhaps there is no improvement in the cooked more than the raw, but both are equal, and therefore when raw one also blesses borei peri haAdamah. And also from the Mechaber himself his language implies that even if one cooked in water alone one blesses borei peri haAdamah. And likewise similar to what he wrote when it is pickled in vinegar or mustard — that is without meat — from all these reasons I did not copy Peri Megadim's doubt.`,
);

patch(
  er,
  "eliyah-rabbah",
  1,
  "_",
  `(א) <b>And cabbage, etc.</b> Which they call sternunk, Orach Chayim; and Bach explained in the Ashkenaz language kohl kraut; and in all of these one must say: even though they are also good raw, nevertheless the practice is not to eat them raw for most people, as written in siman 202, seif 12; and with this the words of Magen Avraham in seif 3 are rejected — see there and in seif 9; see there and examine. And nevertheless on parsley and maror raw one blesses borei peri haAdamah, because if one cooks them by themselves it becomes for the worse; and see below siman 473.`,
);
patch(
  er,
  "eliyah-rabbah",
  2,
  "_",
  `(ב) <b>And leeks, etc.</b> Ma'adanei Melech wrote: leeks — the Aruch explained puri in a foreign language; and I heard they are a species like onion in the form of a half-round, until here. But in the Targum on Beha'alotekha — chazir is leeks; and Orach Chayim wrote that it is eshlich in Ashkenaz language.`,
);
patch(
  er,
  "eliyah-rabbah",
  3,
  "_",
  `(ג) <b>One blesses borei peri haAdamah, etc.</b> And Bach ruled to bless shehakol, and the latter authorities wrote his words are not plausible. And Taz distinguishes: when garlic and onions are still soft — borei peri haAdamah; but when they age — shehakol, for then they are not fit to eat raw without bread. Olas Tamid wrote: legumes called in Ashkenaz arbeis shotin — whether raw or smoked, meaning slightly roasted in smoke, and they call it gebratene arbeis shotin, and they are common in their country; or those legumes that they cook — whether one eats them within the soup called erbvis zuppa, even if they have dissolved somewhat; or one eats after cooking without soup, and the practice is to pour off all the boiling water and afterward the custom is to put salt and pepper and eat them as they are whole for dessert; or those not cooked in water at all but when dry they soak them in cold water until their skins came off, then take them from the water, and while the moisture of water is still on them put them on spits over coals — and that spit is pierced with very fine holes — and fry them on it as they are without any liquid, and they call them in their language patshelkes; on all these borei peri haAdamah, until here. And Orach Chayim's language: whether they pour off the water and call them geschwelte erbvis, or whether they roast them without water and call them patshelkes — and in all three Olas Tamid wrote: if they were crushed much, such as what they call dika erbvis — shehakol, until here; and see below siman 208, seif 11. He also wrote: dry legumes that one eats raw — shehakol, for their goodness is not complete, until here; and Olas Tamid wrote this law requires study, until here. And in my humble opinion it is explicit thus in Shibolei HaLeket siman 44; and see Magen Avraham at the beginning of this siman.`,
);
patch(
  er,
  "eliyah-rabbah",
  4,
  "_",
  `(ד) <b>And even if one cooked them, etc.</b> In Olas Tamid he expanded and wondered — for this contradicts siman 202, seif 13, on a nut fried in honey that it is improved through the honey and even so one blesses borei peri haEtz; see there. And in my humble opinion one should distinguish: there honey is secondary to the nut; but here the vegetables are secondary to the meat or other things — therefore shehakol. And so it appears in Magen Avraham, and so in Ma'adanei Melech page 47. And I saw that Taz also expanded to answer another matter, and thereby innovated some laws — one should not rule thus, for plainly vegetables that one fries in fat or honey one blesses borei peri haAdamah, for they are primary.`,
);

const PATCH_COUNT = 35;
console.log(`ok siman 205 part 1 of 3 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-205-part1of3.json",
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
