import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { mb1d, mb1g, mb10a, mb10b, mb2g } from "./pipeline/work/_siman-216-p6-long-en.mjs";

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

const mc = "output/siman_216/mechaber/part-001.txt";
const mb = "output/siman_216/mishnah-berurah/part-001.txt";

patch(
  mc,
  "mechaber",
  12,
  "main",
  `One blesses on mugmar (meaning spices placed on coals to smell them) once the steam of its smoke rises, before the fragrance reaches him. However, one should not bless before the steam of the smoke rises.`,
);

patch(
  mc,
  "mechaber",
  13,
  "main",
  `Regarding mugmar: if it is of wood, one blesses borei atzei besamim; if of herb, one blesses borei isvei besamim; if of other species, one blesses borei minei besamim.`,
);

patch(
  mc,
  "mechaber",
  14,
  "main",
  `One who smells the etrog of the mitzvah blesses on it; and some say one does not bless; therefore it is proper not to smell it. {Rama: Some say that one who smells hot bread should bless she-natan reiach tov ba-pat (Abudraham; Beit Yosef siman 226 in the name of Rav Hai Gaon). And some say one should not bless on it (Beit Yosef). Therefore one should not smell it.}`,
);

patch(
  mc,
  "mechaber",
  2,
  "main",
  `If that from which the fragrance emerges is wood or a species of tree, one blesses borei atzei besamim. If it is a herb, one blesses borei isvei besamim. If it is neither a species of tree nor a species of herb — such as musk — one blesses borei minei besamim. And if it was fruit fit for eating, one blesses haNoten reiach tov ba-feirot. These matters apply when one took it to smell it, or to eat it and smell it; but if one took it to eat it and did not intend to smell it — even though it gives off a pleasant fragrance — one does not bless. And for all of them, if one said borei minei besamim, he has fulfilled. Therefore, for anything about which there is doubt, one blesses borei minei besamim — over nutmeg, cinnamon, cloves, and all spices that are for eating one blesses haNoten reiach tov ba-feirot.`,
);

patch(
  mc,
  "mechaber",
  3,
  "main",
  `Over roses, and over cinnamon which is the bark of the India tree, and over rose water, and over frankincense and storax and the like — one blesses borei atzei besamim.`,
);

patch(
  mc,
  "mechaber",
  4,
  "main",
  `Over afarsimon oil one blesses borei shemen arev.`,
);

patch(
  mc,
  "mechaber",
  5,
  "main",
  `Olive oil that was crushed or ground until its fragrance wafts again — one blesses on it borei atzei besamim.`,
);

patch(
  mc,
  "mechaber",
  6,
  "main",
  `Oil that is perfumed, such as anointing oil: if in atzei besamim, one blesses borei atzei besamim; if in isvei besamim, one blesses borei isvei besamim; if it had both trees and herbs, one blesses borei minei besamim. If one strained it and removed the spices from it — some say one blesses borei shemen arev, and some say one does not bless on it at all, for it is re'ach she'ein lo ikar; and since it is a doubt, it is proper to be careful not to smell it.`,
);

patch(
  mc,
  "mechaber",
  7,
  "main",
  `Over simlak and chilfei dema one blesses borei atzei besamim. Simlak — some explain it as rosemary; some as jasmine; and some explain it as a herb that has three rows of leaves, one above the other, and three leaves on each row. Chilfei dema is spikenard, which is called ishpek.`,
);

patch(
  mc,
  "mechaber",
  8,
  "main",
  `Siglei, which are violets — one blesses borei isvei besamim.`,
);

patch(
  mc,
  "mechaber",
  9,
  "main",
  `Narcissus, which is chavatzalet; and some say it is lily. If it grows in a garden, one blesses borei atzei besamim; if it grows in a field, one blesses borei isvei besamim.`,
);

patch(mb, "mishnah-berurah", 1, "א", `(1) It is forbidden to enjoy [a pleasant smell], etc. — and just as it is forbidden to enjoy eating and drinking until one blesses, so they anchored it in the Gemara from the verse that is written: "Let every soul praise Yah" — which implies that the soul too should praise for its enjoyment; and what is something that is enjoyment of the soul alone? You would say — this is smell.`);

patch(mb, "mishnah-berurah", 1, "ב", `(2) Until he blesses — the blessing explained below in seif 2.`);

patch(mb, "mishnah-berurah", 1, "ג", mb1g);
patch(mb, "mishnah-berurah", 1, "ד", mb1d);

patch(mb, "mishnah-berurah", 10, "א", mb10a);
patch(mb, "mishnah-berurah", 10, "ב", mb10b);

patch(
  mb,
  "mishnah-berurah",
  10,
  "ג",
  `(40) See above siman 211 — meaning there is a dispute there similar in seif 3 regarding haEtz and haAdamah whether one must prioritize haEtz; and the same applies in our matter. Know that there the Acharonim agreed that what is always more beloved to him one must prioritize; but if both are equally beloved to him, it is more proper to prioritize haAdamah — and the same applies here: if both are equally beloved to him, it is more proper to prioritize atzei besamim which is the most distinct and specific blessing, and afterward bless isvei besamim.`,
);

patch(
  mb,
  "mishnah-berurah",
  11,
  "א",
  `(41) To smell them — excluding oil that one brought to rub on his hands to remove the filth of eaters — one does not bless, as written siman 217 seif 2; see there in Biur Halachah what is written on this.`,
);

patch(
  mb,
  "mishnah-berurah",
  11,
  "ב",
  `(42) If their blessings are equal — such as oil perfumed with atzei besamim, on which one blesses on the oil borei atzei besamim as explained in seif 6.`,
);

patch(
  mb,
  "mishnah-berurah",
  11,
  "ג",
  `(43) One blesses on the hadas — the reason is that hadas is the substance of the tree called besamim, and the oil has no smell from itself but absorbs from elsewhere; therefore hadas is considered more important and one blesses on it and exempts the oil with his blessing. And when he blesses on it he takes the hadas in the right and the oil in the left — for what one blesses on he takes in the right.`,
);

patch(
  mb,
  "mishnah-berurah",
  11,
  "ד",
  `(44) And if they are not equal — such as oil perfumed with isvei besamim whose blessing is borei isvei besamim; or it was afarsimon oil as explained in seif 4 whose blessing is borei shemen arev — then one cannot bless on the hadas atzei besamim and exempt the oil.`,
);

patch(
  mb,
  "mishnah-berurah",
  11,
  "ה",
  `(45) One blesses on the hadas first — even though afarsimon oil's smell is from itself and not absorbed from others, and also its blessing is important since it mentions and specifies oil in its blessing — nevertheless hadas which is in its created form and persists in its substance is considered more important [Ra'ah].`,
);

patch(
  mb,
  "mishnah-berurah",
  12,
  "א",
  `(46) To smell them — excluding if one smokes [incense] in order to eliminate foul odor — one does not bless on it at all even though he enjoys the spices greatly, as below siman 217.`,
);

patch(
  mb,
  "mishnah-berurah",
  12,
  "ב",
  `(47) Before it reaches him, etc. — for l'chatchila we require [the blessing] to precede the act. B'dieved one may bless even at the time he smells.`,
);

patch(
  mb,
  "mishnah-berurah",
  12,
  "ג",
  `(48) But not [to bless] before, etc. — for we require at least close to the act, and not that the blessing be distant from the enjoyment. B'dieved he has fulfilled whenever he did not interrupt in between, as above siman 206 seif 5; see there.`,
);

patch(
  mb,
  "mishnah-berurah",
  13,
  "א",
  `(49) Borei atzei besamim — and its blessing did not change even though it was burned through the mugmar — its burning is not called destroying it; on the contrary it causes its steam to rise and its smell to waft [Levush].`,
);

patch(
  mb,
  "mishnah-berurah",
  13,
  "ב",
  `(50) Isvei besamim — the ayin with chirik and the shin with shuruk and the bet is weak [Peri Megadim]; and see there that he brings another opinion on this.`,
);

patch(
  mb,
  "mishnah-berurah",
  14,
  "א",
  `(51) One who smells an etrog, etc. — the intent is not that he took it in his hand to go out and incidentally it gave off smell — for in that case all agree one does not bless, as above seif 2, since he did not intend to smell; rather it deals with such as took it to go out and to smell — in such a case we ruled above that one blesses on eating and on smell; and he holds the first view that the same applies here — one blesses on taking the etrog and on the smell.`,
);

patch(
  mb,
  "mishnah-berurah",
  14,
  "ב",
  `(52) And some say one does not bless — for it is not made for smell since it is for the mitzvah; and Magen Avraham wrote in the name of Rashal specifically at the time of taking for the mitzvah, but before or after all bless; and some dispute this — see Biur Halachah.`,
);

patch(
  mb,
  "mishnah-berurah",
  14,
  "ג",
  `(53) Therefore it is proper, etc. — in order to avoid a doubtful blessing. And if he smells, the view of Magen Avraham is not to bless, and likewise the view of Gra in his explanation.`,
);

patch(
  mb,
  "mishnah-berurah",
  14,
  "ד",
  `(54) That one who smells, etc. — he should bless — as with other fruits that stand for eating and have smell that one blesses when taking them to smell them.`,
);

patch(
  mb,
  "mishnah-berurah",
  14,
  "ה",
  `(55) And some say one should not bless on it — for this is not an important smell that would be fit to bless on [Beit Yosef siman 297].`,
);

patch(
  mb, "mishnah-berurah", 14, "ו", `(56) Therefore one should not smell it — and if he smells he does not bless on it [Magen Avraham].`);

patch(mb, "mishnah-berurah", 2, "א", `(5) If this, etc. — he wished to explain how one blesses on it; and for this he said "if this, etc."`);

patch(
  mb,
  "mishnah-berurah",
  2,
  "ב",
  `(6) Or species of tree — meaning even though it is not a complete tree, since it is soft; nevertheless, since it produces leaves from the tree, one blesses borei atzei besamim.`,
);

patch(mb, "mishnah-berurah", 2, "ג", mb2g);

const PATCH_COUNT = 37;
console.log(`ok siman 216 part 6/8 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-216-part6of8.json",
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
  /\bCongratulations\b/i,
  /\bthe craft\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bhand recoils\b/i,
  /\bIDF\b/,
  /\bDr\.\b/i,
  /\bIlan\b/i,
  /\bRach\b/i,
  /\bGLOSS:/i,
  /\bWayne\b/i,
  /\bAmy\b/i,
  /\bDamiliev\b/i,
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
