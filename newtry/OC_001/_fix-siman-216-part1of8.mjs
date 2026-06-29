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

const az = "output/siman_216/ateret-zekenim/part-001.txt";
const bh = "output/siman_216/baer-heitev/part-001.txt";
const bhg = "output/siman_216/beer-hagolah/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  2,
  "_",
  `Like musk, which they call in a foreign tongue phizem, and it is forbidden to eat phizem because of blood.`,
);
patch(
  az,
  "ateret-zekenim",
  6,
  "_",
  `And since it is a doubt, etc. But rose water in seif 3 has substance and smells like the rose itself, and some say one blesses borei minei besamim; and anything about which there is doubt one blesses borei minei besamim, and one need not be careful not to smell it (Bach). However, on finished vessels one need not bless at all; and therefore scrupulous people practice not to bless borei atzei besamim on a wooden vessel in which one grinds spices, for it is also a smell that has no primary source (Maharshal).`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "א",
  `(א) <b>Smells good.</b> See Leket Yosher vol. 1 siman 197. Something forbidden in eating but not in [other] benefit — it is permitted to smell it even l'chatchila — Responsa Emunat Shmuel siman 45. And see Leket Yosher siman 35:`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ב",
  `(ב) <b>Need not bless.</b> For the pleasure is slight — meaning it stops immediately and is similar to food that was digested in one's intestines. And similarly we do not bless Shehecheyanu on it — see Magen Avraham. We do not bless on the sound of an oven since it has no substance. And that we do not bless on bathing and anointing — it appears to me since they do not enter the body:`,
);
patch(
  bh,
  "baer-heitev",
  10,
  "_",
  `<b>He has fulfilled.</b> Bach wrote: if in your hand is [the blessing] borei atzei besamim but [you smelled] spices of grasses, you have not fulfilled, for grasses are not included in "trees"; and likewise Levush. And see Gan HaMelech siman 99:`,
);
patch(
  bh,
  "baer-heitev",
  11,
  "א",
  `(א) <b>To smell them.</b> For if to remove foul odor one does not bless, as written siman 217 end seif 2:`,
);
patch(bh, "baer-heitev", 11, "ב", `(ב) <b>The hadas.</b> Borei atzei besamim:`);
patch(
  bh,
  "baer-heitev",
  13,
  "_",
  `<b>Grasses of spices.</b> I heard from scrupulous ones that one should not read it "eisev" with shuruk and patach since it is attached to the following word; rather one reads it with chirik, and we find such pointing in Scripture in Mishlei — "grasses of the mountains." Taz:`,
);
patch(
  bh,
  "baer-heitev",
  14,
  "א",
  `(א) <b>And some say one does not bless.</b> For it is not made for smell but for the mitzvah — Maharshal wrote specifically at the time of taking for the sake of the mitzvah, but before and after one blesses — Magen Avraham; and likewise in siman 453 see there. And see Taz:`,
);
patch(
  bh,
  "baer-heitev",
  14,
  "ב",
  `(ב) <b>To smell it.</b> And if he smells it, Bach wrote that he blesses on it, and Magen Avraham disagrees that one should not bless; and likewise on warm bread:`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "א",
  `(א) <b>Musk.</b> It is phizem in a foreign tongue. Tur wrote it is the sweat of a known animal and it has a hump on its neck and gathers there at first like a type of blood and afterward dries and from it musk is made; and Rama was concerned to eat it because of blood. R' Yitzchak wrote it is [mere] perspiration even though at first it was blood — see Taz and Magen Avraham and Kenesset HaGedolah:`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ב",
  `(ב) <b>Fit for eating.</b> Even if it is not fit to eat by itself except through mixtures — Magen Avraham:`,
);
patch(bh, "baer-heitev", 2, "ג", `(ג) <b>He does not bless.</b> On the smell:`);
patch(
  bh,
  "baer-heitev",
  2,
  "ד",
  `(ד) <b>With borei minei besamim he has fulfilled.</b> Even one who smells fruits — for borei minei besamim is inclusive as with everything in eating. For this reason we only bless in Havdalah on species of spices:`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ה",
  `(ה) <b>Muscat.</b> Muscat is the main fruit. Cinnamon is cinnamon. Clove is clove. Even though it is not the main fruit, nevertheless its primary [purpose] stands for eating; therefore the fruit name is on it for its smell. On anise which they call mint — there was doubt in Teshuvat Ginat Veradim klal 1 siman 41 whether to bless or not, and his inclination is not to bless; and in Teshuvat Perach Shoshan klal 1 siman 13 he wrote one should bless haNoten reiach tov b'peirot; and likewise one who smells clove in a dish and it is warm and its scent wafts and a person enjoys that scent must bless — see Leket Yosher vol. 2 siman 115. And see in Sefer Bnei Chiya whether on half a fruit one blesses. And in Ginat Veradim klal 1 siman 42:`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "א",
  `(א) <b>Rose.</b> Which they call rosash — even though fit to eat through confection, nevertheless their primary [purpose] is not eating but to smell:`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "ב",
  `(ב) <b>And pitch.</b> Tar that they make from it:`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "ג",
  `(ג) <b>Atzei besamim.</b> And likewise on anything whose stalk is hard — Shaarei Teshuvah, Magen Avraham:`,
);
patch(
  bh,
  "baer-heitev",
  4,
  "_",
  `<b>Afarsimon.</b> Because it grows in Eretz Yisrael they established a separate blessing for it — Terumat HaDeshen:`,
);
patch(
  bh,
  "baer-heitev",
  5,
  "_",
  `<b>That they crushed.</b> Specifically olive oil because it grows on the tree:`,
);
patch(
  bh,
  "baer-heitev",
  6,
  "_",
  `<b>Primary [source].</b> And similarly we do not bless on tobacco that one inhales in the nose. Leket Yosher part 1 siman 101, and above siman 210 sk 9:`,
);
patch(
  bh,
  "baer-heitev",
  7,
  "_",
  `<b>Ispenik.</b> That is spignardi in Polish — they make from it for smell, and homeowners are accustomed to pour this into the water with which kohanim wash hands for the duchan, and those standing there must bless borei minei besamim as with rosewater — siman 453; and in Hilchot Yom Tov I wrote one should not practice thus — Taz, above siman 128 sk 8:`,
);
patch(
  bh,
  "baer-heitev",
  9,
  "_",
  `<b>In a garden.</b> That they water it and it grows and persists; but of the field it dries like grass and goes away. Beit Yosef:`,
);

patch(bhg, "beer-hagolah", 1, "א", `Berachot 43`);
patch(bhg, "beer-hagolah", 1, "ב", `There 44 and Niddah 51`);
patch(bhg, "beer-hagolah", 10, "_", `Rambam there and Rav Amram`);
patch(bhg, "beer-hagolah", 11, "א", `In the Gemara, per Rif's version`);
patch(bhg, "beer-hagolah", 11, "ב", `Ibid., per Rosh's version`);
patch(bhg, "beer-hagolah", 12, "_", `In the Gemara`);
patch(bhg, "beer-hagolah", 13, "_", `Ibid., per Tur's explanation`);
patch(bhg, "beer-hagolah", 14, "א", `Tur in the name of Avi HaEzri`);
patch(bhg, "beer-hagolah", 14, "ב", `Ibid., in the name of R' Simcha`);
patch(bhg, "beer-hagolah", 2, "א", `Berachot 43`);
patch(bhg, "beer-hagolah", 2, "ב", `Which they call in a foreign tongue phizem`);
patch(bhg, "beer-hagolah", 2, "ג", `Ibid., in the source`);
patch(
  bhg,
  "beer-hagolah",
  2,
  "ד",
  `Rambam in chapter 9 of Hilchot Berachot and Rosh and Tur`,
);
patch(bhg, "beer-hagolah", 2, "ה", `Tosafot ibid. in Berachot and Rambam ibid.`);

const PATCH_COUNT = 37;
console.log(`ok siman 216 part1of8 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-216-part1of8.json",
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
  /\bartist\b/i,
  /\bgarage\b/i,
  /\bBible\b/i,
  /\bKGB\b/i,
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
