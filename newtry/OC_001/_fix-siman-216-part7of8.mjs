import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  mb2l,
  mb2t,
  mb2v,
  mb3a,
  mb5b,
  mb6z,
  pmg11,
  pmg12,
  pmg14,
} from "./pipeline/work/_siman-216-p7-long-en.mjs";

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

const mb = "output/siman_216/mishnah-berurah/part-001.txt";
const nc = "output/siman_216/netiv-chayim/part-001.txt";
const pmg = "output/siman_216/peri-megadim/part-001.txt";

patch(
  mb,
  "mishnah-berurah",
  2,
  "ד",
  `(8) Fit for eating — like etrog and apple, or a ground fruit that smells good; and even if it is not fit to eat by itself except through mixtures, as will be explained at the end of the seif.`,
);

patch(
  mb,
  "mishnah-berurah",
  2,
  "ה",
  `(9) He who gives, etc. — see in Biur Halachah who wrote that from the Talmud and poskim it implies that one must say asher natan in past tense.`,
);

patch(mb, "mishnah-berurah", 2, "ו", mb2v);

patch(
  mb,
  "mishnah-berurah",
  2,
  "ז",
  `(11) Even though he, etc. — he does not bless; for this is like something not made for smell, on which one does not bless even though it gives smell and one enjoys, as explained below siman 217 seif 1.`,
);

patch(
  mb,
  "mishnah-berurah",
  2,
  "ח",
  `(12) And on all of them — whether the smell is in a tree, or in a herb, or in fruit that smells.`,
);

patch(mb, "mishnah-berurah", 2, "ט", mb2t);

patch(
  mb,
  "mishnah-berurah",
  2,
  "י",
  `(14) Nutmeg, etc. — meaning if he wishes to smell it.`,
);

patch(
  mb,
  "mishnah-berurah",
  2,
  "כ",
  `(15) And on cinnamon — which they call zimering.`,
);

patch(mb, "mishnah-berurah", 2, "ל", mb2l);

patch(mb, "mishnah-berurah", 3, "א", mb3a);

patch(
  mb,
  "mishnah-berurah",
  3,
  "ב",
  `(18) Or od hendi — textual error; it should read od hendi; and its explanation: a fragrant tree coming from the land of India, for od is tree in Arabic and hendi is from the land of India where they grow [Gra]; and see in Shaarei Teshuvah what Machazik Berachah wrote.`,
);

patch(
  mb,
  "mishnah-berurah",
  3,
  "ג",
  `(19) Rose water — whether the moisture that emerged from the rose through squeezing, or what emerged through being left to steep and cook in water; and even for one who holds in siman 202 seif 4 that fruit juice is not like the fruit itself — that is only regarding the blessing of eating and not regarding the smell blessing.`,
);

patch(
  mb,
  "mishnah-berurah",
  3,
  "ד",
  `(20) Frankincense (levonah) — it is sap emerging from tree roots.`,
);

patch(
  mb,
  "mishnah-berurah",
  3,
  "ה",
  `(21) And meitztichi (storax) — it is a type of tree whose sap gives good smell.`,
);

patch(
  mb,
  "mishnah-berurah",
  4,
  "א",
  `(22) On afarsimon oil — it is tzori in biblical language; they cut the tree and peel it and oil drips from it; and it is mentioned in the Gemara that tzori is only sap dripping from ketziah trees.`,
);

patch(
  mb,
  "mishnah-berurah",
  4,
  "ב",
  `(23) Borei shemen arev — because it is found in Eretz Yisrael and is important they established for it its own blessing to indicate its importance; and if he blessed borei atzei besamim — whether he fulfilled b'dieved, see Bach and Pri Megadim.`,
);

patch(
  mb,
  "mishnah-berurah",
  5,
  "א",
  `(24) That they ground it, etc. until it returned — meaning they did not put any besamim in it, but through grinding or crushing the olive the oil began to have its smell waft.`,
);

patch(mb, "mishnah-berurah", 5, "ב", mb5b);

patch(
  mb,
  "mishnah-berurah",
  6,
  "א",
  `(26) Oil in its name — meaning he put besamim in it so the oil smells; and the same applies to water and other liquids into which he put besamim [Chayei Adam].`,
);

patch(
  mb,
  "mishnah-berurah",
  6,
  "ב",
  `(27) Like anointing oil — it does not mean he made it in the measure and quantity of anointing oil, for that is forbidden; rather it shows us that it is customary to perfume oil with besamim, as we find in anointing oil that they would perfume it.`,
);

patch(
  mb,
  "mishnah-berurah",
  6,
  "ג",
  `(28) Trees and besamim — meaning both isvei besamim and minei besamim.`,
);

patch(
  mb,
  "mishnah-berurah",
  6,
  "ד",
  `(29) And if they strained it — meaning all this deals when at least a little of the primary besamim remains in it; therefore one blesses the blessing of that species; but if they strained it, etc.`,
);

patch(
  mb,
  "mishnah-berurah",
  6,
  "ה",
  `(30) Borei shemen arev — and as with afarsimon.`,
);

patch(
  mb,
  "mishnah-berurah",
  6,
  "ו",
  `(31) That it has no primary source — and it is only a faint smell in the world, and one does not bless on it; and as explained below siman 217 regarding smelling finished vessels.`,
);

patch(mb, "mishnah-berurah", 6, "ז", mb6z);

patch(
  mb,
  "mishnah-berurah",
  7,
  "א",
  `(33) Simlak and chilfei dema — even though their stalk is not as hard as a tree's, nevertheless since it produces from its wood like other trees it is in the category of tree, and one blesses borei atzei besamim.`,
);

patch(
  mb,
  "mishnah-berurah",
  7,
  "ב",
  `(34) Rosemary — and in Beur HaGra he disagreed and proved that according to some explainers, and he is Terumat HaDeshen, chilfei dema is rosemary.`,
);

patch(
  mb,
  "mishnah-berurah",
  7,
  "ג",
  `(35) It is spikenard, etc. — and it is what is called today spignard; it raises good smell, and householders are accustomed in some places to put this in the water with which kohanim wash hands for the duchan so there will be good smell thereby; and it is not proper to do so, for this creates smell in water on Yom Tov, which is forbidden.`,
);

patch(
  mb,
  "mishnah-berurah",
  8,
  "_",
  `(36) Siglei — they are a type of dudaim mentioned in Scripture.`,
);

patch(
  mb,
  "mishnah-berurah",
  9,
  "_",
  `(37) Grows in a garden, etc. — the reason we distinguish between garden and field is because what grows in a garden is worked and watered, and even though its wood dries out it persists for the next year; but what is in the field dries like grass and goes away.`,
);

patch(
  nc,
  "netiv-chayim",
  1,
  "_",
  `(Magen Avraham sk 8) That they make from it pitch — it should read that pitch's smell is bad, in Sotah 18b; some call it mastik.`,
);

patch(
  pmg,
  "peri-megadim",
  1,
  "_",
  `But Taz — from what Magen Avraham wrote in letter 1; and Eshel Avraham lengthily on this.`,
);

patch(
  pmg,
  "peri-megadim",
  10,
  "_",
  `Grows in a garden — Taz; from what Magen Avraham wrote in letter 15.`,
);

patch(pmg, "peri-megadim", 11, "_", pmg11);
patch(pmg, "peri-megadim", 12, "_", pmg12);

patch(
  pmg,
  "peri-megadim",
  13,
  "_",
  `Finished vessel — and even though the besamim are not visible — Taz.`,
);

patch(pmg, "peri-megadim", 14, "_", pmg14);

const PATCH_COUNT = 37;
console.log(`ok siman 216 part7of8 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-216-part7of8.json",
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
  /\bskyscrapers\b/i,
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
