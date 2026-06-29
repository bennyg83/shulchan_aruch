import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  mb1,
  pm1a,
  pm1b,
  pm1g,
  pm2b,
  pm4,
  pm5,
  pm6b,
  tz1,
  tz3,
  tz4,
  tz5,
  tz6,
} from "./pipeline/work/_siman-211-p4-long-en.mjs";

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

const mc = "output/siman_211/mechaber/part-001.txt";
const mb = "output/siman_211/mishnah-berurah/part-001.txt";
const pm = "output/siman_211/peri-megadim/part-001.txt";
const rae = "output/siman_211/rabbi-akiva-eiger/part-001.txt";
const tz = "output/siman_211/turei-zahav/part-001.txt";
const ye = "output/siman_211/yad-ephraim/part-001.txt";

patch(
  mc,
  "mechaber",
  1,
  "main",
  `<b>Laws of precedence in blessing on fruits; it contains 6 seifim.</b> If many kinds of fruits were before him — if their blessings are equal and among them is one of the seven species — he precedes the seven-species kind even if it is not as dear as the other kind. If none of them is of the seven species — he precedes the dear one. If their blessings are not equal, even if among them is one of the seven species — such as radish and olive — whichever he wishes he may precede, even if it is not dear. Some say that also in this one must precede the dear one. And what is called "dear" is the kind he is accustomed to have dear to him, even if now he desires the second kind.`,
);
patch(
  mc,
  "mechaber",
  2,
  "main",
  `And for Rambam — if one kind was dearer to him, whether their blessings are equal or not, whether among them is one of the seven species or not — he precedes what is dear to him then at that hour. And if he does not want this one more than that one — if among them is one of the seven species, he blesses on it first.`,
);
patch(
  mc,
  "mechaber",
  3,
  "main",
  `They brought before him something whose blessing is borei peri haEtz and something whose blessing is shehakol — borei peri haEtz precedes, for it is important in that it exempts only one thing. And likewise borei peri haAdamah and shehakol — borei peri haAdamah precedes. If they brought before him borei peri haEtz and borei peri haAdamah — whichever he wishes he may precede. Some say borei peri haEtz precedes.`,
);
patch(
  mc,
  "mechaber",
  4,
  "main",
  `Whatever is earlier in the verse "a land of wheat and barley" precedes for blessing. And the second "land" the verse interrupted the matter, and everything adjacent to it is more important than what is later relative to the first land — therefore dates precede grapes, for this is second to the second land and that is third to the first land. {Rama: And specifically when he eats grapes as they are; but if he made from them wine, on which he establishes its own blessing borei peri hagafen — it is important and precedes to bless on it first; but a cooked dish from the five grain species is more important than the blessing on wine. Everything stated adjacent to the first land precedes what is stated adjacent to the second land, after they are equal in adjacency to land (Tur).}`,
);
patch(
  mc,
  "mechaber",
  5,
  "main",
  `That wheat and barley precede — specifically when one made from them a cooked dish or bread; but one who chews wheat, whose blessing is borei peri haAdamah — it does not precede the blessing of borei peri haEtz. {Rama: The blessing HaMotzi precedes the blessing borei minei mezonot, and all the more so other blessings (Agur); and even though the second thing is important or dear to him (and one may deduce likewise from Hagahot Maimoniyot ch. 9 and Semak, as Beit Yosef brought Tur and Kol Bo and Beit Yosef in the name of Rambam). And all that we said that one precedes its fellow — that is when he wants to eat from both of them; therefore one must precede the dear or the important. But if he does not want to eat from both of them, he blesses only on what he wants to eat, even though the second is also placed before him (Terumat HaDeshen siman 33). And all this "must precede" is specifically l'chatchila; but if he transgressed and blessed on the second, if the blessings are equal he fulfills and need not return and bless on what he should have preceded, provided his mind was also on it in his blessing (Beit Yosef siman 206 and in this siman in the name of Rashba).}`,
);
patch(
  mc,
  "mechaber",
  6,
  "main",
  `If before him was a dish from spelt flour, oats, and rye, and vine, fig, and pomegranate — since he blesses on the dish borei minei mezonot, its blessing precedes even though those are of the seven species and it itself is not of the seven species; nevertheless, since they are considered that from them one makes bread and one blesses on them HaMotzi and Birkat Hamazon, it precedes even though here he did not make them into bread.`,
);

patch(mb, "mishnah-berurah", 1, "_", mb1);
patch(
  mb,
  "mishnah-berurah",
  2,
  "_",
  `(1) If they were before him, etc. — and specifically when his mind was also to eat from all of them; but if not all are before him, or his mind is not to eat from all of them — the law of precedence does not apply here.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "_",
  `(2) Their blessings are equal and among them, etc. — such as grapes and apples.`,
);
patch(
  mb,
  "mishnah-berurah",
  4,
  "_",
  `(3) Of the seven species — meaning the land of Israel was praised through them, as it is written: a land of wheat and barley, vine and fig and pomegranate, a land of olive oil and honey [olive oil means olive that produces oil; and honey means dates from which they make honey].`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "_",
  `(4) He precedes the seven-species type — even if it is half a fruit and the rest are whole. And if both are one species of the seven species, or both are not of the seven species — he precedes the whole, even if the half is more cherished than the whole.`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "_",
  `(5) Even though, etc. — for the superiority of the seven-species type is better.`,
);

patch(pm, "peri-megadim", 1, "א", pm1a);
patch(pm, "peri-megadim", 1, "ב", pm1b);
patch(pm, "peri-megadim", 1, "ג", pm1g);
patch(
  pm,
  "peri-megadim",
  1,
  "ד",
  `<b>And Levush</b> wrote in seif 2, and "some say" implies halachah is like the first view anonymously — see there; and Magen Avraham sign 4, and it will be explained there.`,
);
patch(
  pm,
  "peri-megadim",
  2,
  "א",
  `<b>And some say</b> Taz: borei peri haEtz against shehakol and borei peri haAdamah against shehakol — they precede even though shehakol is cherished to him — Magen Avraham sign 3. And borei peri haEtz and borei peri haAdamah — when both are equal, Yeshuot Yaakov like Beit HaGedolot, and he emerges either way; and regarding cherished, borei peri haAdamah — he precedes the cherished like the first view anonymously and Magen Avraham sign 4, and it will be explained. And behold date honey that shehakol praises the land of Israel — and it is cherished to him; and another species of borei peri haAdamah — it appears borei peri haAdamah precedes likewise in Chiddushei.`,
);
patch(pm, "peri-megadim", 2, "ב", pm2b);
patch(
  pm,
  "peri-megadim",
  3,
  "_",
  `<b>All</b> Taz: in Tur it is written even if the second is cherished, etc., and there is a scribal error and it should read; and it is difficult why earlier helps here when their blessings are not equal — and the word "not" is a scribal error. And what he wrote that the verse preceded them — as Magen Avraham wrote sign 2; and indeed from what is learned that earlier is superior in every manner — it is somewhat difficult, for certainly blessings before him are rabbinic and not for this the verse preceded them; and "land" that interrupted the matter did not come for this but for a derashah as we said; and Magen Avraham wrote: since the verse preceded them, we too precede them — see there; and for practical law it will be explained there in Taz sign 5 and Magen Avraham sign 8 on this.`,
);
patch(pm, "peri-megadim", 4, "_", pm4);
patch(pm, "peri-megadim", 5, "_", pm5);
patch(
  pm,
  "peri-megadim",
  6,
  "א",
  `<b>And it</b> Taz and Magen Avraham sign 12; and in siman 168 Taz sign 4, see there.`,
);
patch(pm, "peri-megadim", 6, "ב", pm6b);

patch(
  rae,
  "rabbi-akiva-eiger",
  1,
  "_",
  `Magen Avraham sign 11: he requires that he intend for it. And if he eats at a host's — since the host's intent applies, it is as if his intent is explicitly to exempt everything brought to him (responsum Ginat Veradim Choshen Mishpat general rule 1 siman 7).`,
);

patch(tz, "turei-zahav", 1, "_", tz1);
patch(
  tz,
  "turei-zahav",
  2,
  "_",
  `<b>And some say borei peri haEtz precedes.</b> This is Beit HaGedolot's view, and poskim dispute him — and this was the first view; and it appears we should rule here that if borei peri haAdamah is more cherished to him he blesses first per the first view; and if they are equal in cherishedness he blesses borei peri haEtz first per the latter view.`,
);
patch(tz, "turei-zahav", 3, "_", tz3);
patch(tz, "turei-zahav", 4, "_", tz4);
patch(tz, "turei-zahav", 5, "_", tz5);
patch(tz, "turei-zahav", 6, "_", tz6);

patch(
  ye,
  "yad-ephraim",
  1,
  "_",
  `<b>In Magen Avraham sign 2</b> for we say all that is earlier, etc. — meaning Rosh wants ostensibly to bring proof to Rashi's view and his companions that borei peri haEtz does not precede borei peri haAdamah, unlike Beit HaGedolot explained in seif 2 — from what we say all that is earlier, etc., it implies wheat precedes vine even though chewing wheat is borei peri haEtz; and on this Magen Avraham wrote it implies per Rashi it is not so, for Rashi holds when blessings are not equal and one is not exempted by its fellow's blessing, such as radish and olive — there is no precedence at all; thus specifically in radish and olive, since radish is not in the verse at all, precedence does not apply; but if both are of the seven species Rashi concedes that even when one is not exempted by its fellow's blessing there is a law of precedence when mentioned earlier in the verse.`,
);
patch(
  ye,
  "yad-ephraim",
  2,
  "_",
  `<b>Taz sign 3</b> in Tur it is written even if the later is more cherished, etc. — it is difficult why earlier helps here, etc.; in the verse it implies it helps even when their blessings are not equal — so it should read.`,
);
patch(
  ye,
  "yad-ephraim",
  3,
  "_",
  `<b>Sign 4</b> that it is also important and more specific and also earlier, etc.; and for this reason regarding barley preceding honey, etc. — so it should read "therefore olive precedes barley." I did not understand — even per his words who explains what Tur wrote "and more specific" refers to — one may also answer that it is also literally more specific; this specifically regarding the blessing borei peri hagafen that is more specific to itself, unlike olive whose blessing is borei peri haEtz, a blessing inclusive of all tree fruit — and with this it works well that in borei minei mezonot it is more specific. And it appears Taz holds like Tur from the aspect of reasoning — he does not consider borei minei mezonot more specific than borei peri haEtz; only ostensibly proof from what Tur wrote regarding wine — therefore he said that also there the explanation is not that it is more specific.`,
);

const PATCH_COUNT = 33;
console.log(`ok siman 211 part 4/4 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-211-part4of4.json",
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
