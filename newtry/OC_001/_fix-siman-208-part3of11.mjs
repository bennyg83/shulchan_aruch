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

const gra = "output/siman_208/beur-hagra/part-001.txt";

patch(
  gra,
  "beur-hagra",
  12,
  "ז",
  `<b>12. And upon borei peri haGafen, etc.</b> This is the language of the Rosh; but the language of Tosafot is only upon the fruits — and so as above.`,
);
patch(
  gra,
  "beur-hagra",
  13,
  "א",
  `<b>13. If he ate, etc.</b> As written in seif 17; but regarding wine, etc., and the same law applies, etc., and all the more so here.`,
);
patch(
  gra,
  "beur-hagra",
  13,
  "ב",
  `<b>And he ate, etc., and the same law applies, etc.</b> As written in seif 17 — Birkat sheloshah does not, etc., and all the more so that me'ein shalosh does not discharge with Borei Nefashot.`,
);
patch(
  gra,
  "beur-hagra",
  14,
  "א",
  `<b>14. If he drank, etc.</b> Even though in seif 15 it says that if b'dieved, etc., here one is not discharged as with borei peri haAdamah and borei peri haEtz — as Rashi wrote Berachot 41a s.v. "aval," etc.`,
);
patch(
  gra,
  "beur-hagra",
  14,
  "ב",
  `<b>If, etc.</b> As with borei peri haEtz on borei peri haAdamah.`,
);
patch(
  gra,
  "beur-hagra",
  17,
  "א",
  `<b>17. If he drank, etc.</b> There 2b; and wine discharges, etc., and Mordekhai explained between the first blessing and the after-blessing — and like bread for R' Chiyya — and in siman 174 seif 2.`,
);
patch(
  gra,
  "beur-hagra",
  17,
  "ב",
  `<b>17. The blessing, etc.</b> There they brought before them, etc., and see Tosafot Pesachim 103a s.v. "ana," etc., and see Berachot 12a — what is the reason for dates, etc. — this is not so; and likewise Rosh and R' Chananel explain only because they come within the meal, and here it deals with after the meal.`,
);
patch(
  gra,
  "beur-hagra",
  17,
  "ג",
  `<b>That if, etc.</b> Avodat HaGoren.`,
);
patch(
  gra,
  "beur-hagra",
  17,
  "ד",
  `<b>But, etc., and the same law applies, etc.</b> 12a; and all the more so regarding wine — as written 35b: "we bless," etc., and R' Chananel explains that dates are more important than wine. Terumat HaDeshen and Rosh.`,
);
patch(
  gra,
  "beur-hagra",
  17,
  "ה",
  `<b>And even if, etc.</b> Even though it lacks the me'ein shalosh formula — nevertheless, since they said it on account of its importance, he has fulfilled. There and there.`,
);
patch(
  gra,
  "beur-hagra",
  17,
  "ו",
  `<b>And if he remembered, etc.</b> For l'chatchila one should not bless Birkat HaMazon, and he also cannot discharge with Birkat HaMazon, as written in Yerushalmi — and the Rosh brought it there siman 28: Rosh — if he ate dates, etc., beginning and end; and even though Shimon ben Shetach there 48a said "bless" — we do not say there that he did it for himself; and see Beit Yosef in the name of Rashba — and it requires further study.`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "א",
  `<b>2. The five species, etc.</b> There 36, 37, 38, 44.`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ב",
  `<b>That they boiled them, etc.</b> The language of the Rambam; and it should read "that he divided them," etc., and as written 37a "these are the act of a pot," etc., and as in end of Megillah chilka, etc.`,
);
patch(gra, "beur-hagra", 2, "ג", `<b>And deisa (porridge).</b> 36b.`);
patch(gra, "beur-hagra", 2, "ד", `<b>Even if, etc.</b> There.`);
patch(
  gra,
  "beur-hagra",
  2,
  "ה",
  `<b>A lot.</b> 37b — for they put flour in it.`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ו",
  `<b>More than them.</b> There — this rihata, etc., and Rashba explained devesa (honey cake): the essential explanation is that the majority is honey and the minority flour — so it appears; and another explanation of Rashba in chapter 1: devesa is essential — that its essence is honey and flour to flavor it, etc. — see there; and this is what it says in siman 204 seif 12: but if, etc.`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ז",
  `<b>But if, etc.</b> 39a, and as written above.`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "_",
  `<b>3. When they put, etc.</b> Tosafot 36b s.v. "kol," etc.`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "א",
  `<b>4. Roasted grain, etc.</b> Tosafot there s.v. "hakoses," and Shulchan Aruch, and as written "these are the act of a pot," etc. — it implies specifically in such a case; and this is what it says "and the kernels," etc.`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "ב",
  `<b>And after it Borei Nefashot.</b> Rambam from the flame — on the one who crushes, the blessing is me'ein shalosh, as in the end there regarding a millstone, etc., and as written 44a; and Rabbenu Gershom likewise, etc., and the Rabbis explain it in this regard.`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "ג",
  `<b>And this, etc.</b> Since it says wheat in Yoma chapter 1, 1a — a non-priest who crushes, etc., and in Berachot 35b it compares them — what is the case? If we say, etc. — it implies like the words of Abudraham that one does not bless at all; but Beit Yosef challenged him: since he derives benefit, why should he not bless? And as written 36a regarding flour of barley, etc.; and therefore that [case] of terumah is not proof here, for in Yerushalmi chapter 6 of Terumot they read: it teaches — one who crushes terumah wheat pays the principal and does not pay the fifth; R. says: I say that he pays principal and fifth — but Rambam there ruled like R., and Raavad attacked him, and Rambam's reason is as in Yoma as above; however one does not bless — rather shehakol, like flour of barley, for even in the opinion of the one who says flour of wheat — nevertheless of barley is shehakol, as written 36a; and Tosafot explained there regarding flour of roasted grain; and this is what it says "even if," etc.`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "ד",
  `<b>And Tosafot, etc.</b> In the s.v. mentioned there — see there.`,
);
patch(
  gra,
  "beur-hagra",
  5,
  "א",
  `<b>5. Flour, etc.</b> Like Rabbenu Nissim — Rif and Rambam; and so ruled the Rosh, since it is a dispute.`,
);
patch(
  gra,
  "beur-hagra",
  5,
  "ב",
  `<b>Its language, etc.</b> See Tosafot there s.v. "kimecha," etc.`,
);
patch(
  gra,
  "beur-hagra",
  6,
  "א",
  `<b>6. Flour, etc.</b> Rambam; and see Tosafot there s.v. "veha," etc. — but Rav, etc., and nevertheless, etc., and so too Terumat HaDeshen: for medicinal use the blessing is not diminished — rather this is what it says: if it was soft like what they make for medicine — see there.`,
);
patch(
  gra,
  "beur-hagra",
  6,
  "ב",
  `<b>And to chew it.</b> Not specifically — only that it is not for drinking, as Tosafot wrote there.`,
);
patch(
  gra,
  "beur-hagra",
  6,
  "ג",
  `<b>And after it Borei Nefashot.</b> Even per the view of Tosafot on seif 4, and as written below regarding "he cooked it," etc., and after it, etc. — see Rashi there s.v. "velo klum," and so too Shulchan Aruch in siman 207, and the language of Rif and Rosh in chapter 6 of Berachot seif 8, and we hold that everything at the end and "velo klum" is Borei Nefashot, etc. — and at first glance it is not understood to interpret "velo klum" on Borei Nefashot, and from where do they have this? And it appears that the explanation is as we say at the end of chapter 6, 44b: Rabbi Yehudah said in the name of Rav: on eggs, etc., and cheese (kufra), etc., and at the end Borei Nefashot, etc. — but other things, no; and the later amoraim added vegetables and water, and Rav Ashi said, I, etc., do as all of them; and Tosafot and all the poskim ruled like Rav Ashi, for he is later, to bless Borei Nefashot after vegetables and water and shehakol — see there Tosafot s.v. "avidna," etc., and so we practice, etc. And the custom of the Rishonim was not to bless except on eggs and cheese alone, and the reason is that they expounded the language of "nefashot" — "kinds of souls" — as written in Yerushalmi Berachot chapter 6: Rabbi, when he would eat meat and an egg, etc., would bless "Who created souls," etc.; and therefore in the beraita of rice and millet it teaches "velo klum," for in truth they would not bless at all after rice bread and millet bread, as was their custom; but for us, who practice like Rav Ashi — everything at the end and "velo klum" — for us the beraita is Borei Nefashot; and this is what it says "and we hold everything at the end," etc., Borei Nefashot.`,
);
patch(
  gra,
  "beur-hagra",
  7,
  "א",
  `<b>7. And if he cooked it, etc.</b> There they brought before him rice bread, etc., and there "these are the acts," etc., and it is cooked; and likewise there "even though the slices," etc., and the same law applies as bread in its form, as written regarding wheat — and since it says "even though," etc., it implies that the same applies if the slices do not remain and it is like cooked alone, as written regarding wheat.`,
);
patch(
  gra,
  "beur-hagra",
  7,
  "ב",
  `<b>Until it was crushed, etc.</b> As above regarding the five species in seif 2; and it should read that they were crushed but did not remain whole, as written; and Beit Yosef omitted it in Shulchan Aruch, for he holds that one should distinguish between wheat and rice — for wheat is not eaten except sliced or ground, unlike rice, since its way of eating is thus — even whole one blesses, nevertheless; and so in the Gemara that says "these are the act of a pot" — chilka, etc., and rice. And with this he rejected the words of R' Yosef Karo regarding Rif, who wrote specifically rice — but not millet, since it mentions rice alone, as written in seif 8; and see Magen Avraham.`,
);
patch(gra, "beur-hagra", 7, "ג", `<b>And after it, etc.</b> As above.`);
patch(
  gra,
  "beur-hagra",
  7,
  "ד",
  `<b>And it, etc.</b> 36b — the body of Rav and Shmuel, and both are needed, etc., and even though in the second [statement] of Rav and Shmuel it is refuted — nevertheless the first is not refuted. Rif and Shulchan Aruch.`,
);
patch(
  gra,
  "beur-hagra",
  7,
  "ה",
  `<b>And the dish, etc.</b> Rosh there: if the rice is the majority, it is as if in its form, as written in several places — unlike the five species, as written in seif 2.`,
);
patch(
  gra,
  "beur-hagra",
  8,
  "א",
  `<b>8. Upon, etc.</b> Rif and Rambam; and even though in the beraita there it teaches rice bread and millet bread — nevertheless, since in the beraita of the one who crushes it only teaches rice, and likewise there "these are the acts," etc., and rice — we learn that for millet one does not bless except shehakol; but Rosh rejected this and wrote that it mentions rice to exclude Reish Lakish, but the same applies to millet; and Terumat HaDeshen wrote: because rice even when whole excludes millet — only in their broken form, for it is not their way to eat whole — as written above; and both resolutions are difficult on Terumat HaDeshen — why did it not mention in the beraita of the one who crushes? And on Rosh's resolution — why did it not mention millet in the beraita of the act of a pot? And both resolutions are needed; and Terumat HaDeshen and Tur in the name of a gaon — likewise lifanu is also a type like millet and is millet according to Rashi there — except that they explain like Tosafot s.v. Rashi, etc., and it has a taste, etc.; and Beit Yosef wrote that the sugya of the world is according to this explanation, and Shulchan Aruch is silent like Rambam who wrote millet bread, etc., or of, etc., and added in Shulchan Aruch "pulizo" — and it appears this is fava beans (panitzu), except that in their language they call it pulizo.`,
);
patch(
  gra,
  "beur-hagra",
  8,
  "ב",
  `<b>One who makes, etc., if, etc.</b> As above siman 200.`,
);
patch(
  gra,
  "beur-hagra",
  8,
  "ג",
  `<b>And if they were crushed, etc.</b> As with bread; and so Tur — bread or a dish; and so Rosh there; and Beit Yosef explained that they were crushed completely so that it is not their way to eat them thus — and see siman 202 seif 7 regarding the law of trimma.`,
);
patch(
  gra,
  "beur-hagra",
  8,
  "ד",
  `<b>Or, etc.</b> As written in siman 200.`,
);
patch(
  gra,
  "beur-hagra",
  9,
  "א",
  `<b>9. If he mixed, etc.</b> As above seif 2; and as written "everything that has in it," etc., and all the more so regarding haMotzi; and this is what it says "and if he made," etc.`,
);

const PATCH_COUNT = 38;
console.log(`ok siman 208 part3of11 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-208-part3of11.json",
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
  "./pipeline/lib/quality-checks.mjs",
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
