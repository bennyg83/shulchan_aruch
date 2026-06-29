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

const bhg = "output/siman_208/beer-hagolah/part-001.txt";
const gra = "output/siman_208/beur-hagra/part-001.txt";

patch(
  bhg,
  "beer-hagolah",
  12,
  "א",
  `Tosafot in Berachot 44 in the name of Sefer HaMeimonetti and Yerushalmi, and so wrote R' Yonah and the Rosh and other poskim.`,
);
patch(
  bhg,
  "beer-hagolah",
  12,
  "ב",
  `Rambam chapter 8, and R' Yonah, and Rosh, and Rashba, in the name of R' Chiya.`,
);
patch(bhg, "beer-hagolah", 13, "א", `Rambam there.`);
patch(bhg, "beer-hagolah", 13, "ב", `Tur in the name of his father the Rosh.`);
patch(
  bhg,
  "beer-hagolah",
  14,
  "_",
  `In the name of R' Yechiel his brother, in the name of his father the Rosh.`,
);
patch(bhg, "beer-hagolah", 15, "_", `Cited there.`);
patch(bhg, "beer-hagolah", 16, "_", `Cited there.`);
patch(bhg, "beer-hagolah", 17, "א", `Beit Yosef in the name of R' Yonah.`);
patch(
  bhg,
  "beer-hagolah",
  17,
  "ב",
  `In my humble opinion it is certainly far-fetched [to compare] deisa to mezonot, for they established upon dates the blessing borei minei mezonot; and if I did not fear, I would say — what did R' Yonah say? But in wine, etc. — the inference is from deisa, and it does not come to exclude except other matters.`,
);
patch(bhg, "beer-hagolah", 17, "ג", `As ruled by the Rosh.`);
patch(bhg, "beer-hagolah", 18, "_", `Terumat HaDeshen:`);
patch(bhg, "beer-hagolah", 2, "א", `There, 39.`);
patch(bhg, "beer-hagolah", 2, "ב", `Rosh there.`);
patch(bhg, "beer-hagolah", 2, "ג", `Rashba: and there, 39.`);
patch(bhg, "beer-hagolah", 3, "_", `Tosafot.`);
patch(bhg, "beer-hagolah", 4, "א", `Berachot 37.`);
patch(
  bhg,
  "beer-hagolah",
  4,
  "ב",
  `From the words of Tosafot and Rosh and Rambam in chapter 3 of Hilchot Berachot.`,
);
patch(
  bhg,
  "beer-hagolah",
  4,
  "ג",
  `In the name of Yerushalmi and other poskim.`,
);
patch(bhg, "beer-hagolah", 5, "א", `Berachot 36, and like R' Nachman.`);
patch(bhg, "beer-hagolah", 5, "ב", `Rosh there per the view of the Rif.`);
patch(
  bhg,
  "beer-hagolah",
  6,
  "_",
  `There, 38, and like the resolution of Rav Chisda.`,
);
patch(bhg, "beer-hagolah", 7, "א", `There, 37, and like the sages.`);
patch(bhg, "beer-hagolah", 7, "ב", `Rif, and like Rav and Shmuel there.`);
patch(bhg, "beer-hagolah", 7, "ג", `Rosh there.`);
patch(
  bhg,
  "beer-hagolah",
  8,
  "_",
  `Rif there, and Rambam in chapter 3 from the implication of the gemara there.`,
);
patch(bhg, "beer-hagolah", 9, "א", `Orach Chayyim and Radbaz.`);
patch(bhg, "beer-hagolah", 9, "ב", `R' Yonah.`);

patch(
  gra,
  "beur-hagra",
  1,
  "א",
  `(א) <b>Seif 1, "al kol," etc.</b> 37a, 44a — mishnah and gemara.`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ב",
  `(ב) <b>And date.</b> 41b, as written, etc. Baruch, etc.`,
);
patch(
  gra,
  "beur-hagra",
  10,
  "א",
  `(א) <b>And if outside the land, etc.</b> As I wrote — they eat, etc., only, etc.`,
);
patch(
  gra,
  "beur-hagra",
  10,
  "ב",
  `(ב) <b>In one blessing, etc.</b> Tosafot there s.v. al, etc.`,
);
patch(
  gra,
  "beur-hagra",
  11,
  "א",
  `(א) <b>Seif 11, however, etc.</b> Raavad and Terumat HaDeshen and Rosh — and as at the outset he opens "upon the vine," and so the Rif and Rosh and all the poskim in the gemara on wine [say] "upon the vine and upon the fruit of the vine," except that in the conclusion wine is not mentioned in the gemara with what he concludes.`,
);
patch(
  gra,
  "beur-hagra",
  11,
  "ב",
  `(ב) <b>Or, etc.</b> So too the Rambam, and so too Semag in the name of R' Yitzchak, and so in Tosafot there; and the reason is that since the opening of wine is mentioned and the conclusion is not mentioned, it implies that it is included among the seven species; and in seif 12 the first version is silent, and the essential view is like the latter view that he should conclude "upon the land and upon the fruits," for another conclusion is not mentioned in the gemara; and also from 44a regarding what they said "with what does he conclude," etc. — it refers to both, upon wine and upon fruit of the tree, etc.`,
);
patch(
  gra,
  "beur-hagra",
  12,
  "א",
  `(א) <b>Seif 12, they mention, etc.</b> Yerushalmi, and the Rosh brought it there, and Rashba.`,
);
patch(
  gra,
  "beur-hagra",
  12,
  "ב",
  `(ב) <b>However, etc.</b> For even in Birkat HaMazon one need not mention from the side of law, as written in chapter 2 of Shabbat, but from the side of custom; unlike here where there is no custom at all — see Tosafot there.`,
);
patch(
  gra,
  "beur-hagra",
  12,
  "ג",
  `(ג) <b>If he ate, etc.</b> As one includes Shabbat and Yom Tov in prayer, as written in chapter 2 of Yom Tov and at the end of chapter 3 of Eruvin, and see Tosafot there s.v. han"al.`,
);
patch(
  gra,
  "beur-hagra",
  12,
  "ד",
  `(ד) <b>He should include, etc.</b> As on Shabbat and Yom Tov, for we rule like Beit Hillel that one includes in one blessing.`,
);
patch(
  gra,
  "beur-hagra",
  12,
  "ה",
  `(ה) <b>And he should precede, etc.</b> As above, and as written in siman 211.`,
);
patch(
  gra,
  "beur-hagra",
  12,
  "ו",
  `(ו) <b>And he concludes, etc.</b> See Tosafot there — and it is not a [full] conclusion, etc., and as written in the gemara 49a, and the main conclusion is on the land.`,
);

const PATCH_COUNT = 38;
console.log(`ok siman 208 part 2/11 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-208-part2of11.json",
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
  /\bIlan\b/i,
  /\bRach\b/i,
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
