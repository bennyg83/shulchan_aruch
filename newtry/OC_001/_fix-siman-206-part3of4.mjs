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

const mb = "output/siman_206/mishnah-berurah/part-001.txt";
const pm = "output/siman_206/peri-megadim/part-001.txt";

patch(
  mb,
  "mishnah-berurah",
  1,
  "ד",
  `(4) If it is the fruit of the tree, etc. — and likewise when he has a doubt from the perspective of the law; but if his doubt is because he did not learn, he should not eat until he learns.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ה",
  `(5) If he said shehakol — all of this is b'dieved; but l'chatchila he must bless on each thing its specific blessing.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ו",
  `(6) And even so, etc. — meaning, even though they are important matters.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "א",
  `(7) They were before him, etc. — specifically b'dieved; but l'chatchila, for all, one should not intend to discharge borei peri haEtz, for it is better to bless its specific blessing; and otherwise there are opinions in siman 211, seif 63, that one opinion holds it is better to precede the fruit of the tree.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ב",
  `(8) Before him — he specified "before him" to include that even if borei peri haEtz was before him when he blessed, he is not discharged automatically unless he intended explicitly to discharge; but in truth, when he intended explicitly to discharge, it helps even if the fruit of the tree was not before him when he blessed.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ג",
  `(9) The fruit of the earth and borei peri haEtz — and likewise if before him was something whose blessing is shehakol and something whose blessing is borei peri haAdamah, and he intended with shehakol to discharge also the second species — he has fulfilled his obligation b'dieved.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ד",
  `(10) He fulfilled his obligation — and see in Shaarei Teshuvah that there are those who disagree on this, and he holds that even if he intended to discharge the borei peri haEtz placed before him he did not fulfill his obligation and must return and bless borei peri haEtz; and the blessing of borei peri haAdamah was not in vain, for it was fulfilled on the fruit of the earth alone; nevertheless he concludes that b'dieved one need not return and bless, as the Shulchan Aruch's view that doubt in blessings is decided leniently; and it is better to change his mind not to eat immediately the fruit of the tree but after time, and he will return and bless on them.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "א",
  `(11) Between blessing and eating — and likewise the blessing on mitzvot, between blessing and the mitzvah.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ב",
  `(12) More than k'dei dibur — that is, the measure of a student asking his rabbi, which is "Shalom aleikha rabbi"; and more than this is considered an interruption, and it deals with silence; but speech, even one word, is an interruption, whatever it is, if it is not for the sake of the blessing — as explained in siman 167, seif 6; see there. Furthermore there is a distinction between silence and speech: with speech it is to delay and he must return and bless; but with silence it is only l'chatchila, but b'dieved even if he waited much more than k'dei dibur he need not return and bless, provided he did not divert his attention in between. The latter authorities wrote that even out of honor and fear it is forbidden to interrupt after the blessing, and if he interrupted he returns and blesses; and even to answer amen or for Kaddish and Kedushah and Barchu likewise he should not interrupt. One should not bless on food or drink that is very hot or very cold because of concern for interruption. One who blessed on food and after he blessed it became repulsive in his eyes — he should eat a little so his blessing should not be in vain. One who wants to drink water that he pours out a little of it should pour first and afterward bless, for both reasons apply — because of interruption and because of disgrace to the blessing — so too in Shaarei Teshuvah in siman 202 in the name of the latter authorities. When he eats a nut he should break it and afterward bless, for it is not worthwhile to interrupt much between the blessing and eating; and also lest he not find it good and it is unfit for blessing; and regarding other fruits see above in siman 202 in Shaarei Teshuvah.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ג",
  `(13) With his lips — but if he thought the blessing in his heart he has not fulfilled his obligation; and see above in siman 185, seif 2, in Mishna Berurah, and in siman 62 in Biur Halachah s.v. yatza.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ד",
  `(14) In every language — see above siman 185, seif 1, in Mishna Berurah.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ה",
  `(15) In a man — whose genitals are exposed and visible, and covering does not help without actual covering.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ו",
  `(16) Pressed to the ground — meaning, attached and covered by the ground; and it must be covered so much that her buttocks should not be visible, for buttocks have concern of nakedness [Beit Yosef]; and in Magen Avraham he expands on this and concludes that buttocks have no concern of nakedness; and likewise the Gra's view tends somewhat above in siman 74, and in Eliyah Rabbah, and likewise in Magen Giborim they side with the law as Beit Yosef — therefore one should be stringent l'chatchila.`,
);
patch(
  mb,
  "mishnah-berurah",
  4,
  "א",
  `(17) He must hold it — the reason for holding is so that his heart should focus on what he is blessing; and this is only l'chatchila, for b'dieved if he blessed on it when it was placed before him, even if he did not hold it at all, he has fulfilled his obligation — as below.`,
);
patch(
  mb,
  "mishnah-berurah",
  4,
  "ב",
  `(18) In his right hand — the reason is on account of importance [and with the left hand we follow his right and left, not the world's right and left — so implies the gloss of R' Akiva Eiger, and so is clear in Magen Avraham siman 183]; and likewise in every blessing that he blesses on some mitzvah he should hold the thing in his right hand at the time of blessing; and according to Kabbalah one should not stab the fruit he blesses on with a knife, even if he holds the knife in his right hand. When he tells his fellow to hand him a book, he should receive it in his right hand [Shulchan Aruch].`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "א",
  `(19) He must bless again — and even if he had his mind on them at the time of blessing it also does not help, since then they were not before him and the blessing had nothing on which to take effect; and it is not comparable to the truth of water in seif 6, for there, since the water will certainly come before him, it is as if they were before him — unlike here, which depends on others' will. And if the thing he blessed on was placed in a box at the time of the blessing and after the blessing he took it from there, he need not return and bless, since it is prepared before him and does not depend on others' will; and in Peri Megadim he sides that the same applies in any such case where it is certain it will be brought to him — such as if it is in the room next to him — likewise he need not return and bless; but l'chatchila certainly one should be careful in this, both because of interruption and also because l'chatchila the mitzvah is to hold it in his hand at the time of blessing, as explained above b'siyata d'shmaya.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "ב",
  `(20) And afterward they brought him — meaning, even after he already ate the first ones. And behold, from the words of the Rama nearby it appears that the Mechaber deals even when his mind was not explicitly on all that they will bring, only that he blessed on these fruits that were before him in an unspecified way; and we say that this is as if he stipulated explicitly that if they bring him more he will eat from them too, because such is a person's way — to proceed from a small meal to a large one — unless his mind was explicitly not to eat only these fruits that are before him, or when he finished eating he resolved in his mind not to eat more and afterward changed his mind to eat — in this, for all, he must return and bless.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "ג",
  `(21) From another species — provided it is a species of fruits; for if he blessed on fish and they brought him beer, which is a completely different species, even though their blessings are equal, nevertheless they are not discharged by his unspecified blessing unless his mind was explicitly to discharge them with the blessing, or they were before him at least on the table at the time he blessed.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "ד",
  `(22) His blessing, etc. — several latter authorities disagree on this law, and he holds that specifically with that very species he discharges with his unspecified blessing even those fruits they brought him afterward; but for another species his unspecified blessing does not help and he must bless; nevertheless, if they brought him the other species while the first species had not yet been finished, it appears one need not bless, since they brought it while he was still busy eating — and so it appears for practical halachah. And some of the latter authorities wrote further that if he set himself for eating fruits, even though he blessed in an unspecified way on the fruits that were before him and they brought him another species after the first species was finished, he need not return and bless — since he set himself for eating he does not divert his attention from this.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "ה",
  `(23) He should be careful l'chatchila — for there are poskim who hold that in an unspecified way it does not help in any manner unless they were before him at the time of blessing; but otherwise we require that his mind be on all that they will bring him afterward.`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "א",
  `(24) Or it became repulsive — and likewise if he found it rotted and it is not fit for eating at all, he takes another; but if some of it is still fit for eating he must eat from it so his blessing should not be in vain [Ateret Zekenim].`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "ב",
  `(25) Even though it was, etc. — meaning, nevertheless we do not say that his blessing should take effect on everything; and the reason — see Biur Halachah.`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "ג",
  `(26) Only that his mind was not — meaning, that his mind was not explicitly at the time of blessing on all of them, only in an unspecified way; but if at the time of blessing his mind was to eat also the rest, he need not return and bless [and even when it was not placed before him then on the table]; and see in Biur Halachah that there are several early authorities who hold that even in an unspecified way he need not return and bless, since it was placed before him on the table it is as his explicit mind on everything. And doubt in blessings is decided leniently. If he blessed on fruits and while he is blessing they brought him more beautiful fruits — he should eat from the first ones first, since he blessed on them, even though his mind was to discharge the beautiful ones. And if his mind was not to discharge the beautiful ones, he must return and bless on them [Magen Avraham]; and Eliyah Rabbah sides that he need not return and bless, since it is one kind of fruit. If he blessed on water and heard there is a dead person in the city — he should drink a little of the water and pour out the rest; and if they told him that the tekufah falls and there is then concern of danger in drinking the water, he should wait a little until the tekufah passes and afterward drink; and even per the view of the one who holds there is concern of danger even in such a case, since then the water was detached from the ground, nevertheless it is a doubt, for one who guards a mitzvah knows no evil thing.`,
);

patch(
  pm,
  "peri-megadim",
  1,
  "_",
  `<b>And even so.</b> Ateret Zekenim: so is the wording of Rashi Berachot 42, who learns "a blessing for itself," and it does not refer [to this]; but bread one does not distinguish upon it, etc., and the word "that cause" is difficult — and bread teaches us. Even though it is important, for bread is the main sustenance of man, nevertheless he fulfilled his obligation; but this cannot be said — even though they established a blessing for itself and removed it from the category of the specific blessing — for the incident of the pot proves; and in our chiddushim there we wrote from this — see there.`,
);
patch(
  pm,
  "peri-megadim",
  2,
  "_",
  `<b>They were before him.</b> Ateret Zekenim: even though in Shaarei HaTzedek, sign 7, he wrote that we require his mind to be on it; but here, where his mind is on borei peri haEtz also, even if they were not before him he fulfilled b'dieved. And Eshel Avraham 2 wrote he teaches an exaggeration: even if they were before him we require intention specifically — for unspecified intention does not count. And all this is b'dieved; but l'chatchila, even per the view of the one who says whichever he wishes he may precede with borei peri haAdamah, seif 63, nevertheless it is fit to bless borei peri haAdamah and not intend to discharge with borei peri haEtz also, for a general blessing does not cause discharge — a blessing that is not needed l'chatchila requires a blessing for each. And what Magen Avraham wrote in sign 2, he likewise says that regarding complete l'chatchila it is fit to precede that of the tree.`,
);
patch(
  pm,
  "peri-megadim",
  3,
  "_",
  `<b>More.</b> Ateret Zekenim, and likewise in Levush; but in Magen Avraham sign 4, only "Shalom aleikha rabbi" — and likewise Eliyah Rabbah in the name of Meiri, chapter Merubah, and so is the practice — see there in Magen Avraham, and it will be explained if God wills in Magen Avraham.`,
);

const PATCH_COUNT = 26;
console.log(`ok siman 206 part 3 of 4 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-206-part3of4.json",
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
