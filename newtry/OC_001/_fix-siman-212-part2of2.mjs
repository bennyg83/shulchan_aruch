import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  ma1b,
  ma1d,
  ma1g,
  mb1a,
  mb1d,
  mb1h,
  mb1j,
  mh2k,
  mh2l,
  mh2y,
  pm1,
  pm2,
  tz1a,
  tz1b,
  tz1c,
  tz1g,
} from "./pipeline/work/_siman-212-p2-long-en.mjs";

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

const mh = "output/siman_212/machatzit-hashekel/part-001.txt";
const ma = "output/siman_212/magen-avraham/part-001.txt";
const mc = "output/siman_212/mechaber/part-001.txt";
const mb = "output/siman_212/mishnah-berurah/part-001.txt";
const nc = "output/siman_212/netiv-chayim/part-001.txt";
const pm = "output/siman_212/peri-megadim/part-001.txt";
const rae = "output/siman_212/rabbi-akiva-eiger/part-001.txt";
const st = "output/siman_212/shaarei-teshuvah/part-001.txt";
const tz = "output/siman_212/turei-zahav/part-001.txt";

patch(mh, "machatzit-hashekel", 2, "י", mh2y);
patch(mh, "machatzit-hashekel", 2, "כ", mh2k);
patch(mh, "machatzit-hashekel", 2, "ל", mh2l);

patch(
  ma,
  "magen-avraham",
  1,
  "א",
  `<b>The primary is mixed.</b> And whatever is the majority is primary, as written siman 208 seif 7; and whatever has from the five species — we follow after them, as written there seif 2, provided there is substantial quantity in them; but if he mixed them in water until it is soft, he blesses shehakol — see there seif 6 and see end of siman 204.`,
);
patch(ma, "magen-avraham", 1, "ב", ma1b);
patch(ma, "magen-avraham", 1, "ג", ma1g);
patch(ma, "magen-avraham", 1, "ד", ma1d);
patch(
  ma,
  "magen-avraham",
  2,
  "א",
  `<b>That one does not intend.</b> But in these countries they place the spread on honey cakes that are fit for food — if so, his intent is also for eating the honey cakes and he blesses on them.`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "ב",
  `<b>To eat bread.</b> Only that they come to attach the spread to them so the hands are not soiled with honey.`,
);

patch(
  mc,
  "mechaber",
  1,
  "main",
  `<b>That the primary exempts the secondary. And in it 2 seifim:</b> Whatever is primary and with it a secondary (meaning: an item not considered significant) — he blesses on the primary and exempts the secondary, both from the blessing before and the blessing after; this is needless to say if the primary is mixed with the secondary, but even each one by itself; and even bread which is more important than everything — if it is secondary, such as one who eats salted fish and eats bread with it so it not harm him in his throat — he blesses on the fish and exempts the bread since it is secondary. {Rama: And some say if the secondary is dear to him he blesses on it and afterward blesses on the primary (Agur in the name of Issur Zarua); that which we bless on the primary and exempt the secondary — this is when he eats them together or eats the primary first; but if he eats the secondary first — such as one who wants to drink and wants to eat first so he not drink on an empty stomach, or he eats pits of caraway to sweeten the drink — he blesses on the food first even though it is secondary to the drink, and he does not bless on it only shehakol since it is secondary to another thing (Terumat HaDeshen siman 35).}`,
);
patch(
  mc,
  "mechaber",
  2,
  "main",
  `Paste that they place on thin crackers — those crackers are secondary to the paste, for it is known that one does not intend to eat bread.`,
);

patch(mb, "mishnah-berurah", 1, "א", mb1a);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ב",
  `(2) Each one by itself — whether he eats the primary and secondary at once or eats the primary first and the secondary afterward, as below.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ג",
  `(3) Such as one who eats salted fish — such as if he ate something sweet before and eats salted fish to remove the sweetness; and because the salty food will not harm his throat he eats bread with it — but he does not desire at all to eat bread; therefore the bread is secondary; unlike if he desires to eat bread also, even though he eats it with the salty food as is customary to eat salted fish called herring with bread — it is not secondary to it, even if he desires the salty food more; and he must bless on it HaMotzi and exempt the salty fish [acharonim].`,
);
patch(mb, "mishnah-berurah", 1, "ד", mb1d);
patch(mb, "mishnah-berurah", 1, "ה", mb1h);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ו",
  `(6) That he eats them together — and if he eats pocket bread with cheese or another thing to dip in it, even though they are also dear to him and he desires to eat them — nevertheless he blesses only on the pocket bread alone, for it is reasonable that it is primary for him; and likewise in every matter when he eats with another kind to dip in it — what he eats to dip is considered only as secondary.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ז",
  `(7) The primary first — and afterward the secondary in order to sweeten the primary, such as he ate first radish and afterward olive to remove the sharpness of the radish; and likewise other secondary cases, as in seif 1.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ח",
  `(8) Or he eats pits, etc. — meaning also that he eats them before he begins to drink in order to sweeten the drink he will drink afterward.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ט",
  `(9) On the food first, etc. — for granted when he blesses on the primary first, automatically the secondary is included; unlike when he eats the secondary first — it is not possible that afterward the primary exempt him retroactively from its blessing, for he already enjoyed without a blessing.`,
);
patch(mb, "mishnah-berurah", 1, "י", mb1j);
patch(
  mb,
  "mishnah-berurah",
  1,
  "כ",
  `(11) Since it is secondary to another thing — and if the secondary is dear to him he blesses on it its proper blessing [Taz and Eliyah Rabbah].`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "א",
  `(12) They are secondary to the paste — and he must bless on the paste alone.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ב",
  `(13) To eat bread — only that they come to attach the spread to them so the hands are not soiled with honey; and see in the acharonim who wrote that in our countries they make honey cakes that are fit for food and place the spread on them — if so, his intent is also for eating the honey cakes and he blesses on them; and see above siman 168 in Mishna Berurah sk 45 where all details of this law are explained.`,
);

patch(
  nc,
  "netiv-chayim",
  1,
  "_",
  `(In Magen Avraham sk 2) And otherwise he must bless, end of his words — here applies what he wrote at the end of that sk: and if his mind was not on it he blesses shehakol on the bread, as written in the gloss — and there it was deleted.`,
);

patch(pm, "peri-megadim", 1, "_", pm1);
patch(pm, "peri-megadim", 2, "_", pm2);

patch(
  rae,
  "rabbi-akiva-eiger",
  1,
  "_",
  `Magen Avraham sk 3; and in Rama's responsum siman 20 seif 1 he divides there: if he eats bread after drinking he need not wash; but if he eats it before drinking to sweeten the drink — since he must bless on it, he also needs washing.`,
);

patch(
  st,
  "shaarei-teshuvah",
  1,
  "_",
  `<b>In the gloss</b> And some say if the secondary is dear — see in Magen Avraham sk 3 and in Eliyah Rabbah who wrote that the prohibition against increasing blessings with its proper blessing applies only when he exempts by rabbinic enactment; but if he comes to exempt by another blessing through primary and secondary — this does not apply, and he may bless by itself its proper blessing, such as to put aside after the meal; and see what Magen Avraham wrote siman 215 in the name of Shelah — see there.`,
);

patch(tz, "turei-zahav", 1, "א", tz1a);
patch(tz, "turei-zahav", 1, "ב", tz1b);
patch(tz, "turei-zahav", 1, "ג", tz1c);
patch(
  tz,
  "turei-zahav",
  1,
  "ד",
  `<b>Or he eats the primary.</b> Meaning: and afterward the secondary in order to sweeten — such as he ate first radish and afterward olive; or he ate sweet fruits first, and likewise fruits of Ginosar that we mentioned.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "ה",
  `<b>That he eats pits of caraway.</b> It appears regarding caraway and the like that are to sweeten the drink — complete exemption does not apply to them, for everything one brings within the time one is engaged in drinking is called before the drink — for he did not come to sweeten what he already drank, only what he will drink afterward; through this it will draw desire to drink afterward — automatically it is called before the drink and is not exempted by the blessing he blessed before the first drink, for they do not come to be secondary to what he already drank, for it is of no benefit to him; and this is not similar to olive that one eats after radish which is for benefit on what he already ate and is secondary to it — this appears simple.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "ו",
  `<b>He blesses on the food first.</b> For it is not possible that afterward the primary exempt him retroactively from its blessing, for he already enjoyed without a blessing — so too in Terumat HaDeshen there; and it is difficult from that which chapter 44 daf 43: we bless on smell when its fragrance rises — and he is not yet present and does not enjoy; and they answer: since his mind is to enjoy — likewise here one may say: since his mind is to drink wine and he eats first to sweeten the drink — he may bless immediately on the wine and eat the pits and drink; and one may say there is an interruption between blessing and drinking — for in HaMotzi there is speech interruption between blessing and eating, and nevertheless if he said "bring salt" or relish it is not an interruption, since it is for the need of eating; likewise this eating is for the need of drinking and is not an interruption; and one may say that here there is another enjoyment from the drink — therefore there is interruption.`,
);
patch(tz, "turei-zahav", 1, "ז", tz1g);
patch(
  tz,
  "turei-zahav",
  2,
  "_",
  `<b>The crackers are secondary to the paste</b> — it appears this is specifically if he eats the crackers with the paste; but if he ate the paste from above and left the crackers and eats them by themselves — they require their proper blessing, for then he has made them primary as well.`,
);

const PATCH_COUNT = 37;
console.log(`ok siman 212 part 2/2 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-212-part2of2.json",
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
