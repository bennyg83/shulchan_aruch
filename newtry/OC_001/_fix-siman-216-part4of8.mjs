import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  er3,
  er5,
  er6,
  er7,
  er9,
  kh10,
  kh11,
  kh13,
  mh1d,
  mh1h,
  mh1v,
} from "./pipeline/work/_siman-216-p4-long-en.mjs";

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

const er = "output/siman_216/eliyah-rabbah/part-001.txt";
const ea = "output/siman_216/eshel-avraham/part-001.txt";
const kh = "output/siman_216/kaf-hachayyim/part-001.txt";
const ls = "output/siman_216/levushei-serad/part-001.txt";
const mh = "output/siman_216/machatzit-hashekel/part-001.txt";

patch(er, "eliyah-rabbah", 3, "_", er3);

patch(
  er,
  "eliyah-rabbah",
  4,
  "_",
  `(4) [Levush] Blood of the arteries, etc. Therefore it is forbidden to eat it — Tur. And see Magen Avraham and Sheyarei Kenesset HaGedolah who extended on this; and the view of Ma'adanei Melech daf 53 and Taz is to permit; and so it appears from Rabbenu Yerucham; and so ruled in Shiltai Gibborim chapter "One who hires workers"; and Kenesset HaGedolah wrote that so is the custom.`,
);

patch(er, "eliyah-rabbah", 5, "_", er5);
patch(er, "eliyah-rabbah", 6, "_", er6);
patch(er, "eliyah-rabbah", 7, "_", er7);

patch(
  er,
  "eliyah-rabbah",
  8,
  "_",
  `(8) [Levush] And on all of them, etc. — even when smelling fruit. Olat Tamid wrote that even if one blessed "shehakol" he has fulfilled b'dieved for all kinds of smell — and study is required.`,
);

patch(er, "eliyah-rabbah", 9, "_", er9);

patch(
  ea,
  "eshel-avraham",
  9,
  "_",
  `<b>Narcissus.</b> See Sefer Magen Shaul simanim 52, 55, 56.`,
);

patch(
  kh,
  "kaf-hachayyim",
  1,
  "_",
  `(1) [Seif 1] It is forbidden to enjoy a good smell until one blesses, etc. — as it is said: "Let every soul praise Yah." What is something from which the soul enjoys and the body does not enjoy? You say — this is smell. Berakhot 43b. Beit Yosef and Levush.`,
);

patch(kh, "kaf-hachayyim", 10, "_", kh10);
patch(kh, "kaf-hachayyim", 11, "_", kh11);

patch(
  kh,
  "kaf-hachayyim",
  12,
  "_",
  `(12) Mordekhai wrote in chapter "These are the things" that one blesses only on something from which the body enjoys; therefore one does not bless on fire except with "Who creates the lights of fire," since the beginning of its creation is that — and Darkei Moshe brought it letter 1. And he wrote that for this reason one does not bless on the voice of a cricket, end of his words. And in Mateh Moshe he wrote the reason — because it has no substance — see there. And that one does not bless on bathing and anointing — since they do not enter the body — Magen Avraham s.k. 1.`,
);

patch(kh, "kaf-hachayyim", 13, "_", kh13);

patch(
  kh,
  "kaf-hachayyim",
  14,
  "_",
  `(14) On grass called in Arabic rihan — one blesses "Who creates herbs of spices" — so all agree; Ben Ish Chai, Parashat Vaetchanan letter 8.`,
);

patch(
  kh,
  "kaf-hachayyim",
  2,
  "_",
  `(2) There — until he blesses before he smells. They brought him wine and good oil to smell — he blesses on the wine first. Tur siman 212, and Magen Avraham brought this siman and wrote the reason — because the blessing of enjoyment precedes; and that the blessing of enjoyment precedes applies when both are before him; but if they brought the smell before him, he need not wait until they bring the matter of enjoyment — as written above siman 211 letter 23, see there.`,
);

patch(
  kh,
  "kaf-hachayyim",
  3,
  "_",
  `(3) There — until he blesses, etc. And if he is in doubt about a herb whether it smells — he may test before the blessing. Sefer Adonei Paz in this siman. Chayei Adam letter 1, Ruach Chayim letter 3; and likewise if he is in doubt about himself whether he can smell — he may test before the blessing. Ben Ish Chai, Parashat Vaetchanan letter 2.`,
);

patch(
  kh,
  "kaf-hachayyim",
  4,
  "_",
  `(4) It is forbidden to smell a rose or a lily, or spices of hekdesh; and even if you could say there is no misappropriation, there is still a prohibition. Radbaz vol. 3 siman 621, newly printed in Ashkenaz. Machazik Berachah letter 1 — and see in the letter afterward.`,
);

patch(
  kh,
  "kaf-hachayyim",
  5,
  "_",
  `(5) It is permitted to smell the blossoms of orlah trees even though they contain the essence of fruit; but it is forbidden to smell the fruit if it grew somewhat, since it is orlah. Radbaz in Chadashot siman 44. However in responsa Zera Yaakov siman 7 he raised that fruits of hekdesh or konam — it is permitted to smell them and one does not bless on them — see there. And they brought Machazik Berachah letter 8; and it appears that since there is a dispute in this, and it is forbidden to enjoy the world without a blessing — it is better and preferable not to smell something forbidden in enjoyment even without a blessing. And see Shulchan Aruch Yoreh Deah siman 108 seif 7.`,
);

patch(
  kh,
  "kaf-hachayyim",
  6,
  "_",
  `(6) Something forbidden in eating but not in enjoyment — it is permitted to smell it even l'chatchila. Responsa Emunat Shmuel siman 45, Peri Chadash Yoreh Deah siman 108 letters 21 and 25. Maamar Mordekhai in this siman letter 4 challenged Shakh in Kenesset HaGedolah in Hagahat Tashbetz letter 8, who wrote that something forbidden to eat is forbidden to smell — see there; and so agreed Rav Zera Yaakov siman 7, Orach Chayim letter 4 — and see below letter 22.`,
);

patch(
  kh,
  "kaf-hachayyim",
  7,
  "_",
  `(7) A rose and myrtle that were detached on Yom Tov — it is permitted to smell them without moving them. Responsa Zera Yaakov siman 8; Machazik Berachah letter 9; and likewise in Shulchan Aruch below siman 336 seif 10 — that even attached myrtle it is permitted to smell, see there; and so Orach Mishpat letter 8.`,
);

patch(
  kh,
  "kaf-hachayyim",
  8,
  "_",
  `(8) Lilies placed on the pomegranates of a Torah scroll — one may bless on them. Peri Chadash Yoreh Deah siman 116 letter 7; Zekan Aharon letter 2.`,
);

patch(
  kh,
  "kaf-hachayyim",
  9,
  "_",
  `(9) There — until he blesses, etc. He wrote in Sefer Bnei Chayim in the name of Maharach Alfandari the Elder that it is reasonable to bless on half a fruit and not on the peel of the fruit; however Mahari son of the aforementioned rav is cited that one blesses on the peel of the fruit — see there. But Machazik Berachah letter 4 challenged him and wrote that one should not bless "Who gives good smell in fruits" on peels, but rather "Who creates species of spices" — see there. And so Beit Yisrael letter 1; Chayei Adam letter 6.`,
);

patch(
  ls,
  "levushei-serad",
  1,
  "_",
  `<small>Magen Avraham s.k. 3</small> And R' Refael z"l wrote that it is possible to read thus.`,
);

patch(
  ls,
  "levushei-serad",
  2,
  "_",
  `<small>Magen Avraham s.k. 6</small> As written siman 204 seif 11 — thus it should read.`,
);

patch(
  ls,
  "levushei-serad",
  3,
  "_",
  `<small>Shulchan Aruch seif 6</small> If it had trees and herbs — one blesses — thus it should read.`,
);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "א",
  `<b>s.k. 1 — After it, etc.</b> And it appears to me because they are like this, etc. — and this is the reason why one does not bless shehecheyanu on it. And in "in it" he explained — because when one interrupts, etc. — this is the reason why one does not bless a final blessing on it.`,
);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "ב",
  `His benefit has already passed, and it is comparable to eating — if the food was already digested in his intestines he does not bless afterward — as written above siman 184 seif 5.`,
);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "ג",
  `(3) The bee, etc. And the Rama was — thus it should read.`,
);

patch(mh, "machatzit-hashekel", 1, "ד", mh1d);
patch(mh, "machatzit-hashekel", 1, "ה", mh1h);
patch(mh, "machatzit-hashekel", 1, "ו", mh1v);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "ז",
  `<b>For then all permit it.</b> And he means that Rosh is not disputing the matter — as the Rash who permitted nursing, etc., as is in Chullin daf 116b and in Shulchan Aruch Yoreh Deah siman 87.`,
);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "ח",
  `<b>And regarding a chick, etc.</b> We say in Temurah daf 31a and in Shulchan Aruch Yoreh Deah siman 86.`,
);

patch(
  mh,
  "machatzit-hashekel",
  11,
  "_",
  `<b>(s.k. 11) Shemen zayit.</b> It appears to me specifically shemen zayit, etc. — that Shulchan Aruch deals with not in its name; but shemen zayit from itself returned to have its smell waft — therefore one blesses on it "Who creates trees of spices," for an olive is a tree; but other oils that do not grow on a tree — if their smell wafts from themselves — one does not bless on them "Who creates trees of spices," since it is not a species of tree. But if in its name and through this their smell wafts — this law is explained in the seif afterward.`,
);

patch(
  mh,
  "machatzit-hashekel",
  12,
  "_",
  `<b>(s.k. 12) Oil, etc.</b> Even if he made only half of it, etc. — but regarding anointing oil he is not liable until he makes all of it per the weight stated in the Torah. But if he made half and made per the weight — meaning he took half the measure of oil written in the Torah, which is a hin, and he took half a hin; and likewise the spices — he took half of them: mor deror, whose measure in the Torah is five hundred, and he took two hundred and fifty; and likewise half of the rest of the spices written in the Torah — he is exempt. But if he did so with incense he is liable.`,
);

patch(
  mh,
  "machatzit-hashekel",
  13,
  "א",
  `<b>(s.k. 13) Correct, etc.</b> For even Rambam agrees, etc. — he meant to say that Tur wrote: if one removed the spices — some say one blesses "Who creates species of spices." And some say one does not bless on it at all. And the Rav Beit Yosef wrote that the latter view is Rambam's view — that he holds one who smells in finished vessels does not bless, for it is smell that has no primary substance; and the same applies here. And on this Beit Chadash disputed.`,
);

patch(
  mh,
  "machatzit-hashekel",
  13,
  "ב",
  `<b>The smell was not absorbed from the essence of the perfume.</b> For the essence of the perfume was consumed in fire — only the smoke rising from the perfume; from this the vessels absorbed it.`,
);

const PATCH_COUNT = 37;
console.log(`ok siman 216 part 4/8 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-216-part4of8.json",
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
