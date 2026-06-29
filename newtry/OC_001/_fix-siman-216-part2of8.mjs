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

const bhg = "output/siman_216/beer-hagolah/part-001.txt";
const bhgr = "output/siman_216/beur-hagra/part-001.txt";

patch(
  bhg,
  "beer-hagolah",
  2,
  "ו",
  `Mordechai in the name of R' Meir of Rotenburg and Rosh.`,
);
patch(bhg, "beer-hagolah", 3, "_", `Rambam there.`);
patch(bhg, "beer-hagolah", 4, "_", `Berachot and like R' Yochanan.`);
patch(bhg, "beer-hagolah", 5, "_", `There and like the Nehardeans.`);
patch(
  bhg,
  "beer-hagolah",
  6,
  "א",
  `View of Rambam there and Rosh there.`,
);
patch(bhg, "beer-hagolah", 6, "ב", `Tur in the name of Yesh Omrim.`);
patch(bhg, "beer-hagolah", 6, "ג", `As cited there.`);
patch(bhg, "beer-hagolah", 7, "א", `In chapter 3 there.`);
patch(bhg, "beer-hagolah", 7, "ב", `R' Yonah.`);
patch(bhg, "beer-hagolah", 7, "ג", `R' Yerucham.`);
patch(bhg, "beer-hagolah", 7, "ד", `Rashi, as cited.`);
patch(bhg, "beer-hagolah", 8, "_", `In the Gemara, as cited.`);
patch(bhg, "beer-hagolah", 9, "א", `As cited there.`);
patch(bhg, "beer-hagolah", 9, "ב", `Rashi in the name of Behag.`);
patch(bhg, "beer-hagolah", 9, "ג", `Nemukei Yosef.`);
patch(bhg, "beer-hagolah", 9, "ד", `In the Gemara, as cited.`);

patch(
  bhgr,
  "beur-hagra",
  1,
  "_",
  `<b>Seif 1 — forbidden, etc.</b> Magen Avraham 2 — from where that we bless, etc.:`,
);
patch(
  bhgr,
  "beur-hagra",
  10,
  "א",
  `<b>Seif 10 — if they were before him, etc.</b> Like the blessing on fruits as written siman 211, etc., and requires study; and in seif 211:`,
);
patch(bhgr, "beur-hagra", 10, "ב", `<b>And if, etc.</b> As above seif 2.`);
patch(
  bhgr,
  "beur-hagra",
  10,
  "ג",
  `<b>And if one needs, etc.</b> Meaning it depends on the dispute in Behag and Tosafot as written above seif 3:`,
);
patch(
  bhgr,
  "beur-hagra",
  11,
  "א",
  `<b>Seif 11 — they brought, etc.</b> Like Rif's text that he did not bless — and it is not so; as Beer HaGolah and Rif and Rosh:`,
);
patch(
  bhgr,
  "beur-hagra",
  11,
  "ב",
  `<b>If.</b> Like Rif's text that reads: and exempts, etc.:`,
);
patch(
  bhgr,
  "beur-hagra",
  11,
  "ג",
  `<b>And if, etc.</b> Like Rosh's text and our text: and he returns and blesses, etc.; and the entire explanation is true. Tur:`,
);
patch(
  bhgr,
  "beur-hagra",
  12,
  "_",
  `<b>Seif 12 — before, etc.; but, etc.</b> Gemara there and Magen Avraham:`,
);
patch(
  bhgr,
  "beur-hagra",
  13,
  "א",
  `<b>Seif 13 — finished, etc.</b> And Tosafot there s.v. kol and s.v. v'al, etc. And what he wrote on all, etc. — meaning if it is of a tree; but of a herb one blesses isvei besamim. Tur:`,
);
patch(
  bhgr,
  "beur-hagra",
  13,
  "ב",
  `<b>Of other, etc.</b> There, except, etc.:`,
);
patch(
  bhgr,
  "beur-hagra",
  14,
  "א",
  `<b>Seif 14 — and some say, etc.</b> That it is not for fragrance; as written siman 217 seif 2; and the first view holds that since one may smell it, as written chapter 3 of Sukkah that his fragrance was not cut off — one blesses on it; and the main view appears like the second view, since its main purpose is not for fragrance, as written in the spice shop in the Gemara — even though he intends to smell; and end of his words in beginning of siman 217 s.k. 1:`,
);
patch(
  bhgr,
  "beur-hagra",
  14,
  "ב",
  `<b>Some say, etc.</b> It appears to me it also depends on the dispute above: the latter view holds specifically when it stands for fragrance, and the first view holds that since he intended to smell at his washing it is as if he picked it up to eat and smell; and the latter view is main since its main purpose is not for fragrance, as above:`,
);
patch(
  bhgr,
  "beur-hagra",
  2,
  "א",
  `<b>Seif 2 — if this, etc.</b> This narkom there, etc.:`,
);
patch(bhgr, "beur-hagra", 2, "ב", `<b>And if it is not, etc.</b> There 1.`);
patch(
  bhgr,
  "beur-hagra",
  2,
  "ג",
  `Musk, etc. Magen Avraham s.k. 3 — some say, etc., and like R' Yehuda, etc., and it appears to me, etc. And all this Rosh wrote chapter 10 siman 35, and Magen Avraham who elaborated on this; and I omitted what Ran wrote in chapter 2 of Avodah Zarah 39b on what is written: if because of mixture it spoils, etc., and his words: if because of mixture of impure matter it spoils — therefore one does not mix; and others explained: if because of mixture — for it is customary to mix other things in honey and they dissolve in it and return to honey — there is no concern for this, since what is mixed in it before it dissolves spoils and is permitted, as we say in Temurah chapter Kol HaAsurim: an egg of a treifah bird that hatched is permitted — for when does it grow? When it spoils — at that time it is merely dust.`,
);
patch(
  bhgr,
  "beur-hagra",
  2,
  "ד",
  `And this is only, etc. See Tosafot Berachot 43a s.v. v'al, etc., to exclude, etc. — meaning one does not bless at all, for otherwise it should have excluded musk and similar; and Tosafot there 2 s.v. this — from what is written Magen Avraham 1 — to say that wherever it is not, etc.; and see in Rosh who wrote that what is written "one who smells an etrog" deals with when he bought it to smell or to eat and smell, etc.; but, etc., not like Rashi and Tosafot — but the main view is like Rashi and Tosafot.`,
);
patch(
  bhgr,
  "beur-hagra",
  2,
  "ה",
  `And for all of them, etc. For so in the spice shop one blesses borei minei besamim; and Tosafot Berachot 43a s.v. v'al, etc., and R. Meir of Kutzi, etc. — as shehakol includes every eating blessing; per the view that its growth is not from the ground one says shemen arev — thus borei minei besamim in the fragrance blessing; and as written "and for all of them if he said shemen arev he fulfills" — so here with borei minei besamim.`,
);
patch(
  bhgr,
  "beur-hagra",
  2,
  "ו",
  `<b>Therefore, etc.</b> Tosafot there; and like shemen arev.`,
);
patch(
  bhgr,
  "beur-hagra",
  2,
  "ז",
  `<b>On nutmeg, etc.</b> As written regarding etrog.`,
);
patch(
  bhgr,
  "beur-hagra",
  3,
  "א",
  `<b>Seif 3 — on rose.</b> It teaches us that even though suitable for eating, since its main purpose is not for eating, as Rosh wrote there — and not like the Gaon who wrote to bless hanoten re'ach tov bapeirot; and it teaches us regarding rose that it is fruit of a tree; and see in Hagahot Maimoniyot who wrote in the name of Maharam to bless on roses borei isvei besamim, and Avi HaEzri distinguishes between those that grow, etc., see there — except Rambam implies roses are not roses; but he wrote to bless on both atzei besamim; and Aruch wrote in the name of the Geonim: whatever produces from the essence of a tree is [atzei besamim], and likewise Rashba — and his words: reda — we say in Yerushalmi: whatever its fruit remains from year to year one blesses atzei besamim, and whatever its fruit dries and ends in winter one blesses isvei besamim; and Rashi explained: lily of the Sharon; and likewise Tur; as written in seif 9. And in rose water it teaches us that one blesses that same blessing, even though there is no proof from anointing oil like pickled for Rosh that pickled is like cooked even for blessing, as Chayei Adam 2 wrote on salting — and all the more pickled here; Bach and Magen Avraham agree it must be so, for Rosh and Tur wrote here explicitly themselves.`,
);
patch(
  bhgr,
  "beur-hagra",
  3,
  "ב",
  `<b>Cinnamon.</b> As written: kaneh and cinnamon, etc.:`,
);

const PATCH_COUNT = 37;
console.log(`ok siman 216 part2of8 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-216-part2of8.json",
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
