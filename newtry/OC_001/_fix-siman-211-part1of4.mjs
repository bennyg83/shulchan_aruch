import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  baerHeitev2,
  baerHeitev5b,
  gra1d,
  gra1g,
  gra2a,
} from "./pipeline/work/_siman-211-p1-long-en.mjs";

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

const az = "output/siman_211/ateret-zekenim/part-001.txt";
const bh = "output/siman_211/baer-heitev/part-001.txt";
const bhg = "output/siman_211/beer-hagolah/part-001.txt";
const gra = "output/siman_211/beur-hagra/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  1,
  "_",
  `If they brought before him burnt wine and spiced condiment, he must eat from the spiced condiment first and bless on it, and afterward bless on the burnt wine (Emek Berachah). And this is straightforward even though the borei peri haEtz species is not dearer to him than the other species; and likewise for everything similar. And the same applies to everything that the sages preceded — because it is earlier in the verse "a land of wheat and barley" — the law is likewise even though the later one in the verse is dearest to him (Beit Yosef in the name of Rashba and Mordekhai).`,
);
patch(
  az,
  "ateret-zekenim",
  4,
  "_",
  `But if he did so. Even for olive, which is first for the second "land" and vine is third for the first land — and likewise for the final blessing: if he must bless on wine a three-word blessing, the olive too is a three-word blessing and he must include and precede wine to olive — i.e., say "on the vine and on the fruit of the vine, on the tree and on the fruit of the tree" (Tur in the name of R' Peretz). They brought before him wine to drink and good oil to smell — he holds the wine in his right hand and blesses on it, and afterward blesses on the oil (Berachot ch. 6, and the halachah is like Beit Hillel — Tur siman 212).`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "א",
  `<b>Seven species.</b> Even if one is half a fruit and the other is whole. And if both are of the seven species, or both are not of the seven species and one is whole and one is dearer — the whole is preferable. Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ב",
  `<b>He should precede.</b> It is difficult, for here Tur wrote wheat precedes olive and as written at the end of seif 4 because it is earlier in the verse — and all the more so here that radish is not of the seven species at all. Magen Avraham answered: if both are of the seven species we follow the one earlier in the verse, since Scripture preceded it we too precede it; but for something not written at all in Scripture, precedence does not apply — see there.`,
);
patch(bh, "baer-heitev", 2, "_", baerHeitev2);
patch(
  bh,
  "baer-heitev",
  3,
  "א",
  `<b>Precedence.</b> Even if the other is dearer to him. Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "ב",
  `<b>First.</b> Even if the other is of the seven species, such as wheat porridge and apple. And one should rule: if borei peri haAdamah is dearer to him, he should bless on borei peri haAdamah first; and if they are equal in dearness he should bless on borei peri haEtz first. Taz and Magen Avraham. (And in Eliyah Rabbah he ruled that wheat porridge and apple — wheat precedes even though it is borei peri haAdamah since it is of the seven species; and likewise in Semak and Rikanti; and with this the words of Tosafot Berachot 41 s.v. mitvi are reconciled, and Maharsha who emended in Tosafot did not come to this — see there.)`,
);
patch(
  bh,
  "baer-heitev",
  4,
  "א",
  `<b>In the verse.</b> For Rambam, it discusses when both are equally dear.`,
);
patch(
  bh,
  "baer-heitev",
  4,
  "ב",
  `<b>The second [land].</b> And olive precedes barley even in a cooked dish of barley — see Magen Avraham, Taz.`,
);
patch(
  bh,
  "baer-heitev",
  5,
  "א",
  `<b>On mezonot.</b> Even if the bread is of barley and the mezonot foods are of wheat — see there.`,
);
patch(bh, "baer-heitev", 5, "ב", baerHeitev5b);
patch(
  bh,
  "baer-heitev",
  5,
  "ג",
  `<b>In his blessing.</b> And even if both were before him he must intend explicitly to exempt the other, for it is not logical that the unimportant exempts the important through dragging; but if he blessed on the important he exempts the unimportant even if he did not intend explicitly to exempt it. Beit Yosef — see Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  6,
  "_",
  `<b>From the seven species.</b> Even though they are included in wheat and barley, nevertheless they are not mentioned explicitly in Scripture — see there siman 168 seif 4.`,
);

patch(
  bhg,
  "beer-hagolah",
  1,
  "א",
  `Berachot 40a, and like R' Yehudah in BeHag and R' Yona and Rashba in the name of Tosafot and Raavad and the anonymous passage.`,
);
patch(bhg, "beer-hagolah", 1, "ב", `Tosafot and Rosh there.`);
patch(bhg, "beer-hagolah", 1, "ג", `In the Gemara.`);
patch(
  bhg,
  "beer-hagolah",
  1,
  "ד",
  `Rif and Rambam there and Rosh there.`,
);
patch(
  bhg,
  "beer-hagolah",
  1,
  "ה",
  `Tosafot and R' Yitzchak and Rashba in the name of R' Hai and Semag.`,
);
patch(bhg, "beer-hagolah", 2, "_", `There in s.v. mah hab and like the sages.`);
patch(
  bhg,
  "beer-hagolah",
  3,
  "א",
  `Berachot 38, in the incident of bar Kappara — Rashi's explanation and Tosafot there.`,
);
patch(bhg, "beer-hagolah", 3, "ב", `Rashi and Rif.`);
patch(bhg, "beer-hagolah", 3, "ג", `Rosh in the name of BeHag.`);
patch(bhg, "beer-hagolah", 4, "_", `Berachot 41.`);
patch(bhg, "beer-hagolah", 5, "_", `Tur in the name of BeHag and other poskim.`);
patch(bhg, "beer-hagolah", 6, "_", `See there.`);

patch(
  gra,
  "beur-hagra",
  1,
  "א",
  `<b>Seif 1, they were, etc.</b> Like R' Yehudah, for Rav Yosef holds like him, as written that R' Yehudah, and if you say, etc.; and Tosafot there s.v. amar, etc., and it is not clear, etc. — meaning as R' Yehudah and Rosh wrote that what is the question — perhaps dates are dearer to R' Hamnuna; and per Rosh's view it must be that their blessings are equal, and emend "Rav Yosef said" as written below:`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ב",
  `<b>And if, etc.</b> For R' Yehudah explains thus the sages — Rosh there.`,
);
patch(gra, "beur-hagra", 1, "ג", gra1g);
patch(gra, "beur-hagra", 1, "ד", gra1d);
patch(
  gra,
  "beur-hagra",
  1,
  "ה",
  `<b>And it is called dear, etc.</b> R' Yehudah and Rosh, and as our text: the dearer species is preferable.`,
);
patch(gra, "beur-hagra", 2, "א", gra2a);
patch(
  gra,
  "beur-hagra",
  2,
  "ב",
  `<b>The dearer, etc.</b> So he explains what is written "dearer," and so in the mishnah there: he blesses on, etc.:`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ג",
  `<b>And if, etc.</b> For here the sages explain from what is written "preferable," and so from Rav Yosef and R' Chisda and R' Huna, and as Tosafot wrote there s.v. amar. But R' Shimon, etc.:`,
);

const PATCH_COUNT = 33;
console.log(`ok siman 211 part 1 of 4 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-211-part1of4.json",
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
