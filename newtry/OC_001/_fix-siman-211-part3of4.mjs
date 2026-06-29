import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  mh1a,
  mh1b,
  mh2b,
  mh2g,
  mh2h,
  mh2v,
  mh2ch,
  ma1b,
  ma4d,
  ma6b,
} from "./pipeline/work/_siman-211-p3-long-en.mjs";

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

const mh = "output/siman_211/machatzit-hashekel/part-001.txt";
const ma = "output/siman_211/magen-avraham/part-001.txt";

patch(mh, "machatzit-hashekel", 1, "א", mh1a);
patch(mh, "machatzit-hashekel", 1, "ב", mh1b);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "א",
  `<b>(s.k. 2) And even, etc.</b> wheat precedes olive — and this is chewing wheat whose blessing is borei peri haAdamah precedes olive whose blessing is borei peri haEtz, because wheat is adjacent first to the first land and olive is adjacent first to the latter land; and as Magen Avraham wrote s.k. 8 — behold even when their blessings are not equal, nevertheless what is mentioned first in Scripture he precedes it:`,
);
patch(mh, "machatzit-hashekel", 2, "ב", mh2b);
patch(mh, "machatzit-hashekel", 2, "ג", mh2g);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "ד",
  `<b>And the correct view, etc.</b> to resolve Bach's aforementioned question:`,
);
patch(mh, "machatzit-hashekel", 2, "ה", mh2h);
patch(mh, "machatzit-hashekel", 2, "ו", mh2v);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "ז",
  `And see in the hints and examine well — meaning his words require further study, for he wrote that when their blessings are not equal, such as radish and olive, one blesses on whichever he wants — behold he holds that even olive which is of the seven species and radish which is not of the seven species, nevertheless one blesses on whichever he wants since their blessings are not equal, as the Shulchan Aruch wrote here; and it is also proven from this that he holds there is no precedence of borei peri haEtz over borei peri haAdamah — for olive is fruit of the tree and radish is fruit of the ground:`,
);
patch(mh, "machatzit-hashekel", 2, "ח", mh2ch);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "_",
  `<b>(s.k. 3) On borei peri haEtz, etc.</b> even if the second is cherished — so Tosafot daf 39a s.v. cherished is better:`,
);
patch(
  mh,
  "machatzit-hashekel",
  4,
  "א",
  `<b>(s.k. 4) And some say, etc.</b> deals with siman 211 "some say," etc. — and this is radish and olive, where olive's blessing is borei peri haEtz and radish one blesses borei peri haAdamah; nevertheless one blesses on whichever he wants, etc.; and so one should practice to bless on the cherished — for thereby he satisfies everyone, for also according to those who say one blesses on whichever he wants, he does not lose by blessing on the cherished; for "whichever he wants" does not mean he now wants it and it is cherished to him (as Bach's explanation brought in s.k. 2), but simply on what is in his hand to bless without reason, even if the other species is habitually cherished to him and also now cherished to him — nevertheless he can bless on the second; if so, when he blesses on what is habitually cherished he satisfies both views in seif 1. And even though he does not satisfy the "some say" view in this seif that borei peri haEtz must precede — we have no concern for this:`,
);
patch(
  mh,
  "machatzit-hashekel",
  4,
  "ב",
  `<b>For behold, etc.</b> for Rambam, the cherished is always better even if among them there is a seven-species type and also their blessings are equal — nevertheless he blesses on the cherished, and even if what is not cherished is borei peri haEtz and the cherished is borei peri haAdamah, nevertheless he blesses on the cherished — for Rambam also deals with radish and olive mentioned in the Gemara:`,
);
patch(
  mh,
  "machatzit-hashekel",
  4,
  "ג",
  `<b>And for Rosh, Rashi, and R' Hai, etc.</b> this is the view in seif 1 that for radish and olive one blesses on whichever he wants since their blessings are not equal:`,
);
patch(
  mh,
  "machatzit-hashekel",
  4,
  "ד",
  `And for Semak he is the "some say" brought in seif 1 that the cherished is better in radish and olive:`,
);
patch(
  mh,
  "machatzit-hashekel",
  4,
  "ה",
  `<b>If so, Beit HaGedolot is a lone individual relative to them who hold borei peri haEtz precedes borei peri haAdamah.</b> And it is fit to bless on the cherished as above — meaning what is habitually cherished to him. Even though for Rambam cherished is called what is now cherished to him and he wants it now — for this Rambam joins the majority of poskim' views that we follow the cherished and not to precede fruit of the tree:`,
);
patch(
  mh,
  "machatzit-hashekel",
  4,
  "ו",
  `But regarding the explanation of what is cherished here, again Rambam is a lone individual and we follow the majority of poskim who explain that what is habitually cherished to him is called cherished even if now it is not cherished to him:`,
);
patch(
  mh,
  "machatzit-hashekel",
  5,
  "_",
  `<b>(s.k. 5) Everything, etc.</b> and for Rambam, etc. — even though this law is the words of the Talmud, they wrote it is not difficult for Rambam — one can say this statement "everything earlier in the verse," etc., follows R' Yehuda who holds the seven-species type is better; and Rambam ruled like the Sages that we do not follow the seven-species type but the cherished; but in Shulchan Aruch this is unnecessary, for in seif 2 he brought Rambam's view, and in seif 4 he brought the statement "everything earlier," etc., and it implies Rambam concedes to this:`,
);
patch(
  mh,
  "machatzit-hashekel",
  6,
  "א",
  `<b>(s.k. 6) Dates, etc.</b> that which he did not mention olive, which is first for the latter land — he mentions barley, which is second for the first land:`,
);
patch(
  mh,
  "machatzit-hashekel",
  6,
  "ב",
  `<b>And if so it precedes everything.</b> And if chewing barley — nevertheless olive precedes, for olive one blesses borei peri haEtz and chewing barley one blesses shehakol, as above siman 208 seif 4 in the gloss:`,
);

patch(
  ma,
  "magen-avraham",
  1,
  "א",
  `<b>He precedes from the seven species.</b> And even if it is half a fruit and the other is whole; and if both are of the seven species, or both are not of the seven species — then he precedes the whole. Deals with siman 168 and in the Gemara there; nevertheless, if one is whole and one cherished — the whole is better:`,
);
patch(ma, "magen-avraham", 1, "ב", ma1b);
patch(
  ma,
  "magen-avraham",
  3,
  "א",
  `<b>Borei peri haEtz precedes.</b> Even if the second is cherished to him:`,
);
patch(
  ma,
  "magen-avraham",
  3,
  "ב",
  `<b>And some say, etc.</b> Even if the second is of the seven species, such as chewing wheat and apple (Beit HaGedolot); and deals with siman 211 "some say" that whichever he wants he precedes, and "some say" the cherished is better; and so one should practice, for Rambam always holds the cherished is better, and Rosh, Rashi, and Rav Hai — one blesses on whichever he wants, and Semak — the cherished is better; if so, Beit HaGedolot is a lone individual relative to them (Bach):`,
);
patch(
  ma,
  "magen-avraham",
  4,
  "א",
  `<b>Everything earlier.</b> For Rambam it deals when both are equally cherished:`,
);
patch(
  ma,
  "magen-avraham",
  4,
  "ב",
  `<b>Dates precede, etc.</b> That which he did not mention olive precedes barley — because Rabbenu Yitzchak holds barley in Scripture deals with a cooked dish, as written seif 5 — if so it precedes everything, as written seif 6:`,
);
patch(
  ma,
  "magen-avraham",
  4,
  "ג",
  `<b>It is important.</b> Because it was more distinct and also precedes wine in the verse (Tur):`,
);
patch(ma, "magen-avraham", 4, "ד", ma4d);
patch(
  ma,
  "magen-avraham",
  5,
  "א",
  `<b>The blessing of hamotzi.</b> Meaning such as when there is a set table before him to eat bread he should bless first on the bread (Shelah); and see siman 168 seif 4 and seif 14 and deals with siman 299 seif 9; and it appears to me it deals with rolls — that if it is a cooked dish from grain species he must bless first on bread in order to discharge the cooked dish, for it is forbidden to cause a blessing unnecessarily, as written end of siman 265 — see there:`,
);
patch(
  ma,
  "magen-avraham",
  5,
  "ב",
  `<b>If he does not want.</b> Even if he wants to eat from the second, but they did not bring the cherished — he need not wait for it (Beit Yosef):`,
);
patch(
  ma,
  "magen-avraham",
  5,
  "ג",
  `<b>Provided his intent.</b> And even if both were before him we require that he intend explicitly to discharge it, for it is not logical that the unimportant discharges the important through dragging, but only through intent; but if he blessed on the important he discharges what is not important even if he did not intend explicitly to discharge it (there). And if they brought it afterward — deals with siman 206 seif 5 what he wrote; and so too in responsum Maharach siman 67 that even if he blessed on the important he does not discharge his fellow unless both were before him; but if it was not before him his mind was not on it and it is as if he changed his mind and must return and bless; and see Be'er Heitev siman 497:`,
);
patch(
  ma,
  "magen-avraham",
  6,
  "א",
  `<b>And it is not of the seven species.</b> Meaning they are not mentioned together in the verse — see siman 165 seif 4:`,
);
patch(ma, "magen-avraham", 6, "ב", ma6b);

const PATCH_COUNT = 33;
console.log(`ok siman 211 part 3/4 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-211-part3of4.json",
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
