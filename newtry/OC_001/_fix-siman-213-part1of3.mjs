import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { biurHalacha1 } from "./pipeline/work/_siman-213-p1-long-en.mjs";

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

const az = "output/siman_213/ateret-zekenim/part-001.txt";
const bh = "output/siman_213/baer-heitev/part-001.txt";
const bhg = "output/siman_213/beer-hagolah/part-001.txt";
const gra = "output/siman_213/beur-hagra/part-001.txt";
const bhc = "output/siman_213/biur-halacha/part-001.txt";
const dm = "output/siman_213/dagul-merevavah/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  1,
  "_",
  `For us etc. And in order to remove himself from doubt — even when they fix themselves to drink wine — the one blessing should intend not to exempt others, so each one is obligated to bless for himself (Bach); and therefore they practice with fruits that each blesses for himself, for if he intended to fulfill through his friend's blessing he has fulfilled b'dieved. And there is no distinction between bread and fruits except that with bread l'chatchila the one blessing should intend to exempt his friend, and likewise the listener should intend to fulfill; with fruits l'chatchila each only blesses for himself, but b'dieved if he intended he fulfills through his friend's blessing. And even though above in siman 167 it discusses bread and not fixing, the same applies to fruits — for fixing does not fix per this gloss:`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "א",
  `<b>Question.</b> At one table — see siman 167 seif 11. When he wants to drink to his friend [l'chaim] he should bless first, for the blessing beforehand is the Holy One's and afterward his own:`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ב",
  `<b>For fruits.</b> If one blessed and the others heard — they fulfill. Beit Yosef, Rashba. Taz wrote, and it appears to me that nowadays since they are lax regarding the concluding blessing, one may rely on this view and he should bless the concluding blessing in a loud voice and the others fulfill through him:`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ג",
  `<b>On fruits.</b> And likewise in other things besides bread and wine; and apparently it means our beer has the law of wine regarding this matter, for they too are accustomed to fix on it to drink without a meal, and likewise honey water that they call mead, and so in Darkei Moshe; therefore he was precise and wrote here "they now practice on fruits" etc. And Taz plainly ruled that now beer and honey water are in the category of bread and wine that one blesses for all — see there. But Bach wrote that even on good wine each should bless for himself, and one should not deviate from the custom. Magen Avraham see there:`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "_",
  `<b>In their hearing.</b> If he does not eat and drink with them, even b'dieved they do not fulfill through his hearing, for his blessing is a blessing in vain; and some differ with what is written siman 209 seif 2 that there it was unwitting. Magen Avraham:`,
);

patch(bhg, "beer-hagolah", 1, "א", `Berachot 43 as the first version, and according to R' Yochanan — so is the view of most poskim:`);
patch(bhg, "beer-hagolah", 1, "ב", `There, 42 in the mishnah:`);
patch(bhg, "beer-hagolah", 1, "ג", `Tosafot there and other poskim:`);
patch(bhg, "beer-hagolah", 1, "ד", `Rashi there:`);
patch(bhg, "beer-hagolah", 1, "ה", `Chullin 106:`);
patch(bhg, "beer-hagolah", 2, "א", `Rosh Hashanah 29:`);
patch(
  bhg,
  "beer-hagolah",
  2,
  "ב",
  `Rambam in chapter 1 of Hilchot Berachot and other poskim from that in Sukkah 34 and Berachot 39 that listening is like responding:`,
);
patch(bhg, "beer-hagolah", 3, "א", `There, from that at the end of chapter 8 of Berachot:`);
patch(
  bhg,
  "beer-hagolah",
  3,
  "ב",
  `There and Rosh Hashanah 29, and like one who says mitzvot require kavanah:`,
);
patch(bhg, "beer-hagolah", 3, "ג", `Beit Yosef according to Rambam's view:`);

patch(
  gra,
  "beur-hagra",
  1,
  "א",
  `<b>Seif 1, on etc.</b> Rosh explains there that whether in the first version or the final version R' Yochanan does not disagree with Rav except regarding wine, but regarding other things he concedes to Rav, and explains as the first version that in rabbinic matters we follow the lenient view; and so too in the case in Bava Kamma 39a, and the halachah is like R' Yochanan — and thus he says "except" etc.:`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ב",
  `<b>If they were etc.</b> And Tosafot 45a s.v. im etc. and Chullin 106 s.v. veshem etc. — and this is because there is no zimun for fruits as written in ch. 8 of Chullin; nevertheless in the case in Bava Kamma he gave permission etc., and likewise in other blessings as written in ch. 8 regarding the light blessing and other blessings in many places:`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ג",
  `<b>And nevertheless etc.</b> Tur at end of siman 174 and likewise in Tosafot Chullin s.v. han"al and in many places that one etc. Beit Yosef — and there is no proof from Tosafot who hold that all fruits are included in wine, and R' Yochanan who disagrees on wine likewise on fruits, as Tosafot wrote there see there, and likewise in Tosafot Berachot 39a s.v. natan etc. and likewise Beit Yosef himself — and the reason sitting is required is because nevertheless they need fixed sitting as written "guests are different" etc., and per Rashi there s.v. she'ani etc., and that which he said etc. only sitting etc.:`,
);
patch(gra, "beur-hagra", 1, "ד", `<b>Specifically etc.</b> As above:`);
patch(gra, "beur-hagra", 1, "ה", `<b>And for us etc.</b> Tosafot 42a s.v. hesivo etc.:`);
patch(gra, "beur-hagra", 1, "ו", `<b>And therefore etc.</b> Beit Yosef:`);
patch(gra, "beur-hagra", 1, "ז", `<b>And this etc.</b> Chullin there and Tosafot there s.v. han"al:`);
patch(gra, "beur-hagra", 1, "ח", `<b>And some say etc.</b> He ruled as the final version:`);
patch(
  gra,
  "beur-hagra",
  1,
  "ט",
  `<b>And therefore etc.</b> But Tosafot wrote we are not accustomed to fix except on bread, and not even on wine; and Tosafot there in Chullin and Berachot 39a s.v. natan and there 42a s.v. hesivo etc.:`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "_",
  `<b>Seif 2, and then they fulfill etc.</b> For otherwise, since his blessing is void, they do not fulfill through listening; and see siman 209 seif 4 in the gloss:`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "_",
  `<b>Seif 3, that the one who blesses etc.</b> Gemara there, and see what is written in siman 167 seif 2 in the gloss:`,
);

patch(bhc, "biur-halacha", 1, "_", biurHalacha1);

patch(
  dm,
  "dagul-merevavah",
  1,
  "_",
  `(Rama) And so it appears Rashi's view on daf 39 perek 1 in the case of bar Kafra — that Rashi explained these things do not come to accompany bread etc., and we say later they require blessing etc. It is difficult why Rashi needed all this; perhaps this case was not during the meal at all. Rather certainly Rashi holds that for other things even reclining does not help; if so, how did Rashi give permission for one to bless? Rather certainly it was during the meal — for since reclining helps for bread it also helps for other things, as Magen Avraham sk 5 wrote — think well. With this the proof of Rosh and Rashba who brought proof that reclining helps for other things from bar Kafra is rejected; and in truth per Rashi that it was during the meal there is no proof:`,
);

const PATCH_COUNT = 28;
console.log(`ok siman 213 part1of3 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-213-part1of3.json",
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
