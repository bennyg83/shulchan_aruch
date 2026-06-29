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

const ma = "output/siman_204/magen-avraham/part-001.txt";
const mech = "output/siman_204/mechaber/part-001.txt";
const mb = "output/siman_204/mishnah-berurah/part-001.txt";

patch(
  ma,
  "magen-avraham",
  8,
  "ב",
  `(ב) Since he was forced. For it is comparable to a woman who began with coercion and ended willingly — we consider it coercion (there). And in responsum of Rashba siman 994 he wrote, and these are his words: Question — a sick person who ate on Yom Kippur. One of the latter authorities wrote that he does not bless, even though it is impossible that he not benefit through coercion — and one does not bless on such a case as a woman whose beginning was coercion and end willingness — we consider it significant coercion, etc.; end of his words. And it is known that Rashba's dispute is with R'ah; if so, since we rule that one who eats on Yom Kippur is liable to bless even though he is under coercion — why did Rama rule here that when they forced him he is exempt? And what difference to me whether others forced him or heaven forced him? However, it is possible to distinguish in this. But it is difficult, for in siman 475 seif 4 he ruled that when they forced him and he ate matzah he fulfilled his obligation; and as Rabbeinu Yerucham in the name of Maggid Mishnah and Ran — the reason: we say one who engages with forbidden fats or forbidden relations is liable because he derives benefit from them — if so, we learn that benefit is considered; if so, why does he not bless on it? And one can answer that it speaks when his soul was disgusted from eating and they fed him against his will — for if so the palate does not benefit from it; and it requires study (and see in Rabbah parashat Nasa daf 229b). Therefore it appears to me that for this reason Rabbeinu Yerucham omitted this law:`,
);
patch(
  ma,
  "magen-avraham",
  9,
  "_",
  `The danger. Thus wrote Maggid Mishnah chapter 2 — a sick person who ate on Yom Kippur, etc. — it is a simple matter and permitted he eats, and on the contrary he performs a mitzvah; end of his words. If so, likewise one who eats forbidden food in a place of danger — he performs a mitzvah to save his soul, unlike Beit Chadash who strained to distinguish. And further it appears to me that even Radbaz does not speak except regarding one who eats something for healing that does not provide him benefit at all:`,
);

patch(
  mech,
  "mechaber",
  1,
  "main",
  `The laws of berachot for other foods. It contains 13 seifim: (1) On something whose growth is not from the earth, such as the meat of domestic animal, wild animal, and fowl, fish, eggs, milk, cheese (2) and moldy bread, and a cooked dish (3) whose form changed (4) and spoiled (5) and withered fruit that are dates (6) that were cooked and the heat burned them and they dried (7), and on locusts (8), and on salt and on salt water (9), and on broth (10), and on herbs and mushrooms (11), and on palm shoots [which are] the soft shoot (12) added (13) to the tree every year that they call palm shoots [Tur], and on vine tendrils (14) and on sweet almonds (15) that people eat them when they are soft (16) in their shells, and on rice and it is spoiled grain (17), and on wild palm shoots (18), and on barley flour (19), and on date beer (20) and barley beer (21), and on barley water that they cook for a sick person (22), and on field herbs (23) that are not sown (24), and on anise that they call anito (25) (meaning anis), and on cumin and fennel [that are made for taste (26) and not for eating], and on vinegar (27) that they mixed in water (28) that is fit to drink — one blesses shehakol.`,
);

patch(
  mech,
  "mechaber",
  2,
  "main",
  `On vinegar alone one does not bless at all, because it is harmful.`,
);
patch(
  mech,
  "mechaber",
  3,
  "main",
  `If its smell is vinegar [meaning vinegar] and its taste is wine — it is wine and one blesses on it borei peri haGafen.`,
);
patch(
  mech,
  "mechaber",
  4,
  "main",
  `Anything that people refrain from drinking on account of its sourness — one does not bless on it borei peri haGafen [rather shehakol].`,
);
patch(
  mech,
  "mechaber",
  5,
  "main",
  `Wine lees — one blesses on them borei peri haGafen. If one put water in them: if one put three measures of water and finds four, it is like mixed wine and one blesses borei peri haGafen. And if one finds less — even though there is in it a taste of wine — it is merely acid (kayuha) in general and one blesses only shehakol. And this is regarding their wines that were strong; but our wines that are not so strong — even if one throws three and four come — one does not bless on it borei peri haGafen. And it appears that one estimates by the measure with which they mix wine in that place: {Rama: provided that the wine is not one part in six of water, for then it is certainly nullified [Agur].}`,
);
patch(
  mech,
  "mechaber",
  6,
  "main",
  `Tamad (second wine) that they make from grape husks — when they put water on them, their law is like lees. And this is when they were stopped with a beam; but if they were trodden only with the foot — even if one put three measures of water and found only three or less — one blesses on it borei peri haGafen, for it is wine and the water is absorbed in the pomace, and in what emerges from them there is much wine: {Rama: Pomace upon which they placed figs to strengthen the power of the wine — even though the pomace is the majority, nevertheless all the power of the figs is in the beverage, and one should not bless borei peri haGafen [Beit Yosef in the name of Rashbetz].}`,
);
patch(
  mech,
  "mechaber",
  7,
  "main",
  `One who drinks water for his thirst — blesses shehakol and afterward birkat haMazon (borei nefashot rabot). But if a piece of meat choked him and he drinks water to remove the obstruction — he does not bless neither before nor after.`,
);
patch(
  mech,
  "mechaber",
  8,
  "main",
  `All foods and beverages that a person eats and drinks for healing — if their taste is good and the palate benefits from them — he blesses on them at the beginning and end: {Rama: If they forced him to eat or drink — even though the palate benefits from it, he does not bless on it, since he was forced in this. (Beit Yosef in the name of Ohel Moed and R'ah)}`,
);
patch(
  mech,
  "mechaber",
  9,
  "main",
  `If one ate a forbidden food or drank a forbidden beverage on account of danger — he blesses on it at the beginning and end.`,
);
patch(
  mech,
  "mechaber",
  10,
  "main",
  `Bee honey — behold it is like other honey and one blesses only shehakol.`,
);
patch(
  mech,
  "mechaber",
  11,
  "main",
  `Preserves or ginger or roses and other kinds of fruits and herbs that they compound in honey — the fruits and herbs are primary and the honey is secondary, even if they are ground very finely; therefore one blesses on preserves and ginger borei peri haEtz, and on herbs borei peri haAdamah, and on roses borei peri haAdamah: {Rama: And any compounding that healthy people are not accustomed to use except for medicine — one blesses on it shehakol. [Beit Yosef in the name of the Rosh]}`,
);
patch(
  mech,
  "mechaber",
  12,
  "main",
  `Whatever is primary and with it is secondary — one blesses on the primary and exempts the secondary. And anything that one mixes to stick or to give scent or to paint the dish — that is secondary. But if he mixed in order to give taste in mixtures — that is primary; therefore kinds of honey that they cook and put wheat milk in them to stick and make kinds of sweetening — one does not bless in any case, because the honey is primary: {Rama: And it appears that that which if one mixed in order to give taste in mixtures it is primary — that is specifically when there is substance of the thing giving taste and it is an important thing; but spices that they put into a compounding — even though they are for giving taste — one does not bless on them, for they are nullified in their minority even though they give taste; therefore the custom is not to bless except on the compounding and not on the spices in it.}`,
);
patch(
  mech,
  "mechaber",
  13,
  "main",
  `Anything that is doubtful in its beracha — bless shehakol.`,
);

patch(
  mb,
  "mishnah-berurah",
  1,
  "23",
  `(23) Until it is fit to drink — for although at its beginning it was wine, once it changed and became vinegar it lost its importance.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "א",
  `(א) And moldy bread — and it spoiled somewhat through this; for if it spoiled completely and is not fit for human eating, one does not bless on it at all, as below regarding a cooked dish.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ב",
  `(ב) And spoiled — it also speaks when it spoiled somewhat and not completely; for if not, even shehakol would not apply to bless on it [Beit Yosef].`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ג",
  `(ג) That were cooked and burned, etc. — meaning through burning by heat they were cooked and dried and changed for the worse; and see what we wrote above in siman 202 seif 9 in Mishna Berurah and Biur Halacha.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ד",
  `(ד) And on locusts (gobai) — it is a species of kosher locust; and to exclude R' Yehudah who said in the mishnah: anything that is a cursed species [that come on account of a curse] — one does not bless on it.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "ג",
  `(ג) And if he found less, etc. — and specifically regarding lees, because the moisture of wine in them is not so important; but wine itself that came from treading grapes — if he poured on them water, even more than three parts up to nearly six — it is also full wine, as below in the gloss; and we require only that there be in it a taste of wine fit for drinking through this dilution, and the way of people is to drink it in place of wine through this dilution — for if not, we say his mind is voided relative to every person.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "ד",
  `(ד) Rather shehakol — and afterward the blessing of borei nefashot rabot.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "ה",
  `(ה) Provided that it is not, etc. — the words of the gloss have no explanation; for did not the Mechaber come to be stringent that with our wines it does not suffice that there be only a quarter of wine, and even if the way in that place is to make a large dilution — behold less than a quarter of wine certainly does not help even with their wines that were strong? And from Rama it implies that it helps up to nearly six parts water. And in truth the words of Agur do not refer to lees — for with lees the measure is as the Mechaber wrote — and he speaks of grape wine itself when mixed with water, that up to nearly six there is wine status upon it, as explained.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "ו",
  `(ו) For then, etc. — and if the wine is more than one in six of water, there is wine status upon it provided there is in it taste and smell of wine and the way of people is to drink wine in such a dilution; and likewise at the end of seif 29. And know that these words of the gloss also speak of raw wine made at first without a mixture of water — therefore it is fit that much water be added afterward and there will be wine status upon it; but in our raisin wine that from the outset the raisins were mixed with much water — such dilution does not apply at all afterward, and even less than this the wine name is nullified thereby; and see below in siman 272 in Mishna Berurah seif 96 where this law is explained well.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "ז",
  `(ז) Certainly nullified — even if there is in it a taste of wine; and even though in general we rule taste is like the essence d'oraisa — here taste is not considered, for it is like mere acid (kayuha). And if wine was mixed in other beverages — see above in siman 202 seif 1 in the gloss and in Mishna Berurah what is written there.`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "א",
  `(א) That they make from husks, etc. — meaning after the wine was squeezed from the grapes, they put water on the husks to absorb the taste of wine remaining in them — and this is called tamad.`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "ב",
  `(ב) When they were stopped with a beam — and through this almost all the moisture came out of the grapes.`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "ג",
  `(ג) One blesses on it borei peri haGafen — for their law is like raisins; and nevertheless specifically when there is in it the taste and smell of wine, as likewise in seif 32 regarding wine mixed with water.`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "ד",
  `(ד) Pomace, etc. — meaning after they removed the wine from the grapes and the pomace remained, they placed on them figs or other fruits to strengthen the power of the wine remaining in them and to increase its redness [Rashbetz].`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "ה",
  `(ה) All the power of the figs, etc. — for the figs had all their power that was not yet extracted before, and the pomace — even though they are the majority — behold the main moisture already came out of them. And it is reasonable that even if one throws three and four or more come — it also does not help, for we always say the main beverage is from the figs.`,
);

const PATCH_COUNT = 30;
console.log(`ok siman 204 remainder — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(OC_ROOT, "pipeline/work/editorial-queue-siman-204.json");
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
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
  /\bNeil and Nans\b/i,
  /\bGoethe\b/i,
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
