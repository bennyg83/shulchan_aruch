import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { mh1a, mh2a, ma1a } from "./pipeline/work/_siman-210-p2-long-en.mjs";

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

const er = "output/siman_210/eliyah-rabbah/part-001.txt";
const kh = "output/siman_210/kaf-hachayyim/part-001.txt";
const ls = "output/siman_210/levushei-serad/part-001.txt";
const mh = "output/siman_210/machatzit-hashekel/part-001.txt";
const ma = "output/siman_210/magen-avraham/part-001.txt";
const mech = "output/siman_210/mechaber/part-001.txt";

patch(
  er,
  "eliyah-rabbah",
  1,
  "_",
  `(1) A kezayit, etc. — so wrote Beit Yosef in this siman and siman 184 that according to all opinions one blesses the after-blessing on a kezayit, and so is the custom; therefore I wonder at Orach Chayim who wrote in the name of Seder Berachot that l'chatchila a person should not eat less than a kebeitza, and he explains because they are uncertain regarding eating for the after-blessing whether it is a kezayit or a kebeitza — see there.`,
);
patch(
  er,
  "eliyah-rabbah",
  2,
  "_",
  `(2) That he should not eat a beriah, etc. — for example Yiddish moyl (garlic) one should not eat one by itself; and likewise one legume alone.`,
);
patch(
  kh,
  "kaf-hachayyim",
  1,
  "_",
  `(1) [Seif 1] One who eats less than a kezayit, etc. — to exclude Rabbeinu Yonah who wrote that on fruit less than the measure one blesses before it shehakol; and also to exclude what Kolbo wrote in the name of Rav Acha of Shabcha that on less than the measure one need not bless even shehakol, for that is not the view of most poskim — rather one must bless the blessing fitting for that species before it even if it is less than the measure, as Beit Yosef wrote — see there. And so too wrote Bach. And so agreed the acharonim, and so is popular practice. And see above siman 172 letter 2.`,
);
patch(
  kh,
  "kaf-hachayyim",
  2,
  "_",
  `(2) There — one who eats less than a kezayit, etc. — that it is forbidden to enjoy this world without a blessing. Tur. Levush.`,
);
patch(
  ls,
  "levushei-serad",
  1,
  "_",
  `{Rama: seif 1: If he removed the pit — see Minchat Yaakov general rule 45 s.k. 11.}`,
);
patch(mh, "machatzit-hashekel", 1, "א", mh1a);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ב",
  `See siman 212, for so is the law regarding Yom Kippur — that if he ate a kebeitza he is liable; and regarding combination it is explained there as Magen Avraham wrote here, and from it one learns regarding blessing.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ג",
  `Brine on top of a vegetable combines for Yom Kippur with a kebeitza; and likewise regarding blessing for combination of a kezayit.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ד",
  `Zevachim daf 109a, s.v. olah, etc. — they wrote, and these are their words: and that which chelev and wine combine (meaning for pigul) even though chelev is with a kezayit and beverages with a revi'it — that is in drinking; but through the manner of eating, when one soaked his bread in wine, its measure is a kezayit, end of Tosafot's words.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ה",
  `See above siman 205 seif 2 in Magen Avraham s.k. 6 in the name of Mordechai.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ו",
  `And so too from what is written siman 158 seif 5 — that fat on the roast is not called "his dipping in a beverage" for netilat yadayim, and gravy is called "his dipping in a beverage."`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ז",
  `If he waited more than kedei achilat pras — meaning from the beginning of the eating until the end of the eating more than kedei achilat pras. And the measure of eating a peras — some say three eggs and some say four eggs, as below siman 212.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ח",
  `And what Magen Avraham wrote, and so too from Rashi's explanation that he explained the reason, etc. — that is daf 38.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ט",
  `And regarding drinking — see siman 212; some say the measure of combination is also kedei achilat pras. And some say that in drinking the measure to combine is enough to drink a revi'it — and this appears to be the Mechaber's main view there, that he brought first the view of those who say enough to drink a revi'it, as is known the Mechaber's way. And regarding drinking coffee that the custom of Turkish people is to drink it when it is very hot and one cannot drink a revi'it at once — and some want to say that nevertheless they must bless after it, for their manner of drinking is thus; and likewise the author of Mishna LaMelech in Hilchot Berachot brought clear proof that according to one opinion, since their manner of drinking is thus, one need not bless after it — and therefore one must be careful in this.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "י",
  `To distinguish between Yom Kippur and Birkat HaMazon — for Yom Kippur depends on settling of the mind, and in more than kedei achilat pras his mind is not settled; but here it depends on benefit — since when he chewed he enjoyed a revi'it or a kezayit, also in more than kedei achilat pras it combines; and in practice requires further study, end of his words in Be'er Heitev.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "כ",
  `For all prohibitions in the Torah are equal to Yom Kippur in this. And even though in prohibitions it does not depend on settling of the mind — rather since it is written regarding them "eating," and in more than kedei achilat pras it does not combine to a kezayit to be called eating — if so, likewise regarding blessing, since it is written regarding it "eating," it does not combine.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ל",
  `Even for bread — we hold that all things that do not require an after-blessing in their place: if he went outside and returned and wants to eat, he must bless initially on what he will eat, for the first settling is gone from him. But if he ate bread and went outside and returned, he need not bless on what he wants to eat, since bread requires Birkat HaMazon in the place where he ate — if so, even though he went outside, the first settling was not nullified, and when he returned he returns to the first settling — unlike when he ate bread less than a kezayit, that he does not need an after-blessing at all, for the first settling does not return; and it is worse than other things that do not require a blessing after them in their place.`,
);
patch(mh, "machatzit-hashekel", 2, "א", mh2a);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "ב",
  `Kelaim chapter 17 mishnah 6 — the measure of an egg whose measure the Sages established is a medium one; and in Berachot daf 38 regarding an olive — they measure with it a medium olive; and likewise here.`,
);
patch(ma, "magen-avraham", 1, "א", ma1a);
patch(
  ma,
  "magen-avraham",
  1,
  "ב",
  `A revi'it. One fills a wine vessel and places into it an egg and a half, and what comes out from it is a revi'it — and specifically with wine that is heaped on top of the vessel and does not overflow so much; but with water it overflows more — therefore one should do as written in siman 456. And in Shlah he wrote that it is nearly full of two shells of a chicken egg; and all things are measured with medium eggs, as Kelaim states and Berachot daf 39.`,
);
patch(
  ma,
  "magen-avraham",
  1,
  "ג",
  `Beriah. It implies in Chullin daf 119 that one lentil is called a beriah even though many grow on one stalk — letter 1.`,
);
patch(
  ma,
  "magen-avraham",
  1,
  "ד",
  `He removed the pit. And if he ate what is inside the pit, it is called a beriah — for behold he ate what is fit to eat from it; it is not reasonable to say that R' Yitzchak ate with the shell of the pit — rather certainly he ate its inside and threw away its shell. And even if he ate the pit, it is not called a beriah in something that is not customary to eat, such as an olive; but in grapes and pomegranates it is customary to eat the pit (so it is in R' Yitzchak). But for Rashba it is always a beriah; and for Rosh and Tosafot — if it was brought before him whole, even if he did not eat the pit, it is a beriah. And it appears to me per Maharar'i that R' Yitzchak did not eat an olive but one other beriah that is as large as a kezayit; and here in Shulchan Aruch it deals with grapes and pomegranates — if so, Rama's gloss is according to all, that even Rosh agrees that if he did not eat the pit in something whose custom is to eat it, it is not a beriah. And b'dieved siman 101 in Beit Yosef in the name of Maharar'i — that if a little fell from it through cooking, as it is accustomed to crumble, it is called a beriah — see there; and he holds like Rosh.`,
);
patch(
  ma,
  "magen-avraham",
  1,
  "ה",
  `Or a revi'it. Meaning an egg and a half, and this is simple, peshat al pi peshat — and meaning because satiation of drinking is a revi'it, as written siman 212; and the Mechaber erred in this. And if he drank a kezayit and does not have a revi'it, he should not drink until a kebeitza, because some say that on a kebeitza one blesses the after-blessing.`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "א",
  `One who tastes. To know if it needs salt or spices (Rashi) — it implies that if he eats some of it after cooking to know if it is good, it is called eating and he must bless; and the essence depends on intention of the heart. And in Rokeach siman 209 he wrote: we say in Aggadat Shmuel "and the people redeemed Yehonatan" because they said "from taste one need not bless," end of his words — it implies even if his intention is for eating like Yehonatan, since he tastes a little he need not bless. And one must say: since his soul desired to eat more, only he refrained on account of prohibition — it is called tasting; unlike in the other case where he has no desire to drink more, he is obligated to bless — nevertheless the second reason appears to me primary, as I wrote. What Be'er Heitev wrote here was not precise, for Rambam wrote anonymously and did not mention whether he swallows it.`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "ב",
  `Until a revi'it. And even to taste many pots is permitted — see above siman 567. However, if his intention is to eat a little, it is forbidden to do so many times, for this is considered superior eating.`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "ג",
  `Requires a blessing. Even in any amount.`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "ד",
  `When he returns and spits out. For it is not called benefit except inside his intestines — if so, likewise one who swallows and spits out; see siman 567 and siman 568 regarding the measure of eating. Requires further study regarding those who place an herb called tobacco into a pipe and kindle it and draw the smoke into their mouths and return and expel it — requires further study whether it is comparable to one who tastes and spits out, who need not bless, or perhaps it is comparable to smell, which requires a blessing; a fortiori here, where the body also benefits from it, that many are satiated from it as from eating and drinking — requires further study; see siman 216 seif 13.`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "ה",
  `And a doubt of blessings to be lenient. And in my humble opinion there is no doubt here, for we did not find any posek who wrote explicitly that one who swallows is exempt; and in Berachot it is explicit. And we only said thus if he swallows — but if he tastes, no. And Taanit and blessing were stated together — see Rif chapter 1 of Taanit and Beit Yosef here; therefore it appears to me one blesses if he swallows even a little.`,
);
patch(
  mech,
  "mechaber",
  1,
  "main",
  `One who eats less than a kezayit — what is his law. It contains 2 seifim: One who eats less than a kezayit, whether from bread or from other foods, and one who drinks less than a revi'it, whether from wine or from other beverages — blesses initially the blessing fitting for that species, and afterward does not bless at all. And some are uncertain to say that on something that is in its created form, such as a grape berry or pomegranate seed, that one blesses after it even though there is not a kezayit in it — therefore it is proper to be careful not to eat a beriah less than a kezayit. {Rama: And it is not called a beriah unless he ate it as it is; but if he removed the pit from it, it is not called a beriah [R' Yitzchak, chapter Keitzad Mevarchin, and Beit Yosef in the name of Rashba].} And some are further uncertain regarding the after-blessing on wine whether one blesses it on a kezayit — therefore it is good to be careful not to drink less than a kezayit or a revi'it.`,
);
patch(
  mech,
  "mechaber",
  2,
  "main",
  `One who tastes the cooked dish does not need to bless until a revi'it, and even if he swallows it. And some say that if he swallows it, it requires a blessing, and they exempted the taster only when he returns and spits out — and then even for much he does not need a blessing. {Rama: And in a doubt of blessings we are lenient.}`,
);

const PATCH_COUNT = 31;
console.log(`ok siman 210 part 2/3 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-210-part2of3.json",
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
