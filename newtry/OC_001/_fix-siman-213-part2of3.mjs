import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { er1, er2, er3, ma1a, ma1f, ma2 } from "./pipeline/work/_siman-213-p2-long-en.mjs";

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

const er = "output/siman_213/eliyah-rabbah/part-001.txt";
const kh = "output/siman_213/kaf-hachayyim/part-001.txt";
const mh = "output/siman_213/machatzit-hashekel/part-001.txt";
const ma = "output/siman_213/magen-avraham/part-001.txt";
const mc = "output/siman_213/mechaber/part-001.txt";
const mb = "output/siman_213/mishnah-berurah/part-001.txt";

patch(er, "eliyah-rabbah", 1, "_", er1);
patch(er, "eliyah-rabbah", 2, "_", er2);
patch(er, "eliyah-rabbah", 3, "_", er3);

patch(
  kh,
  "kaf-hachayyim",
  1,
  "_",
  `(1) [Seif 1] One exempts his fellow, etc. — meaning: when one blesses and his fellow hears and intends to fulfill his obligation, and the blesser also intends to fulfill him — and he hears the blessing from beginning to end — then he is exempt and fulfills through his fellow's blessing. Orach Tzedek letter 1; and it is from what is written below seif 3.`,
);
patch(
  kh,
  "kaf-hachayyim",
  2,
  "_",
  `(2) There — however sitting is required. Meaning at one table or on one cloth as written above siman 167 seif 11; and likewise Magen Avraham s.k. 2. Razal letter 1 Chayei Adam general rule 5 letter 19; but without one table even fixed place does not help. Eshel Avraham letter 2.`,
);
patch(
  kh,
  "kaf-hachayyim",
  3,
  "_",
  `(3) There — however sitting is required. And in the final blessing even sitting is not required. Magen Avraham s.k. 1; Razal letter 5; and likewise in blessings of praise and mitzvot establishment is not required. Eshel Avraham letter 1; and likewise in Birkat HaMazon even if they did not establish or recline — one blesses for all. Be'er Moshe in Shaar Yosef Berachot letter 2 and Machatzor letter 3; however Eliyah Rabbah letter 3 brought several explanations who hold that one blesses for all in Birkat HaMazon specifically when they established — see there.`,
);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "א",
  `<b>s.k. 1 Even, etc.</b> Tosafot wrote daf 42a end s.v. hasseivu, etc. — it implies in the final blessing even sitting is not required.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ב",
  `<b>He wrote so he explains himself.</b> Since through pleasure coming to all at once they have connection and need not hasseivah — if so likewise need not sitting at one table.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ג",
  `And likewise siman 288 seif 14 — they were sitting in the synagogue and they brought them light on motza'ei Shabbat — one blesses for all.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ד",
  `<b>And nevertheless one blesses for all.</b> And therefore the reason is because the pleasure of the light also comes to all at once like in the final blessing — plainly from this reason even sitting is not required.`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "א",
  `<b>(s.k. 3) They need to separate — and if it comes at the end of the meal, etc.</b> After-blessing — meaning after they withdrew their hands from bread — then one must bless on the fruits that were brought, also after-blessing — and then one blesses for all; but before they withdrew their hands from bread we do not find one must say after-blessing on fruits.`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "ב",
  `<b>And in siman 177 seif 2 thus.</b> Meaning it is explained there this law is not found among us to withdraw our hands from bread — and see in Magen Avraham s.k. 7 the reason.`,
);

patch(ma, "magen-avraham", 1, "א", ma1a);
patch(
  ma,
  "magen-avraham",
  1,
  "ב",
  `<b>With sitting.</b> On one table as written siman 177 seif 11.`,
);
patch(
  ma,
  "magen-avraham",
  1,
  "ג",
  `<b>They need to separate.</b> And if they came at the end of the meal one blesses for all the after-blessing since zimmun came to them through bread (Beit Yosef Rashba) siman 177 seif 2.`,
);
patch(
  ma,
  "magen-avraham",
  1,
  "ד",
  `<b>For there is no zimmun.</b> And if one blessed and the others heard they fulfilled (Beit Yosef Rashba) siman 167 seif 13 — see what is written.`,
);
patch(
  ma,
  "magen-avraham",
  1,
  "ה",
  `<b>Hasseivah does not help.</b> And if they came within the meal one blesses for all — for since hasseivah helps for bread it also helps for other things (Gemara).`,
);
patch(ma, "magen-avraham", 1, "ו", ma1f);
patch(ma, "magen-avraham", 2, "_", ma2);

patch(
  mc,
  "mechaber",
  1,
  "main",
  `<b>One who fulfills exempts others. And in it 3 seifim:</b> On all fruits and other things except bread and wine — if the eaters are two or more, one exempts his fellow even without hasseivah; however sitting is in any case required. For specifically bread and wine require hasseivah. And for us, sitting is like hasseivah was for them. And according to this, for us who do not have hasseivah, there is no distinction between bread and wine and other things — for with sitting, even bread and wine one blesses for all; and without sitting, in other things too each blesses for himself. And that which we say one blesses for all in other things except bread — this is in the first blessing; but in the after-blessing they need to separate and each blesses for himself, for there is no zimmun for fruits. {Rama: And some say in all things except bread and wine hasseivah does not help, and the same is sitting for us (Beit Yosef siman 174 in the name of Ra'avad); and therefore they practice now with fruits that each blesses for himself.}`,
);
patch(
  mc,
  "mechaber",
  2,
  "main",
  `The one blessing does not exempt others unless he eats and drinks with them; then they fulfill through hearing when they intend toward him, even if they do not answer amen.`,
);
patch(
  mc,
  "mechaber",
  3,
  "main",
  `One does not fulfill his obligation through hearing the blessing even if he answers amen, unless he heard from beginning to end and intended to fulfill his obligation through it, and the blesser also intended to fulfill his obligation for him.`,
);

patch(
  mb,
  "mishnah-berurah",
  1,
  "א",
  `(1) And other things — meaning other kinds of foods and beverages.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ב",
  `(2) Except bread and wine — because they are important and their way is to establish on them with hasseivah; therefore their way of establishment is only with hasseivah, as below.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ג",
  `(3) One exempts his fellow — meaning even if each knows how to bless by himself, nevertheless one blesses and exempts his fellow l'chatchila — provided his fellow hears the blessing from beginning to end and intends to fulfill as below seif 2; and thus is preferable, for in a multitude of people is the King's glory.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ד",
  `(4) Even without hasseivah — for specifically with bread and wine which are important their way was to eat with hasseivah on couches, and this was their way of establishment and joining together; therefore one does not bless for all to exempt them until they recline — for then it is recognizable their minds are to join and associate together — unlike with fruits.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ה",
  `(5) Sitting is in any case required — for one cannot exempt his fellow through blessing unless they sat to eat and drink together and not standing, for some establishment is in any case required; and all this is only l'chatchila — but b'dieved whenever the blesser intended to exempt and the listener to fulfill, he fulfilled [Ma'amar Mordechai].`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ו",
  `(6) And for us, etc. — meaning since our way is not hasseivah, therefore what we gather to sit together at one table and eat is considered establishment like hasseivah was for them, and it helps even for bread and wine.`,
);

const PATCH_COUNT = 28;
console.log(`ok siman 213 part 2/3 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-213-part2of3.json",
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
