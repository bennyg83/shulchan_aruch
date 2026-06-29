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

const mech = "output/siman_203/mechaber/part-001.txt";
const mb = "output/siman_203/mishnah-berurah/part-001.txt";
const pmg = "output/siman_203/peri-megadim/part-001.txt";
const st = "output/siman_203/shaarei-teshuvah/part-001.txt";
const tz = "output/siman_203/turei-zahav/part-001.txt";
const ye = "output/siman_203/yad-ephraim/part-001.txt";

patch(
  mech,
  "mechaber",
  5,
  "main",
  `Ben Asa — even though they ripen and become like fruit, one does not bless except shehakol.`,
);
patch(
  mech,
  "mechaber",
  6,
  "main",
  `On ginger that they compound when it is moist — borei peri haAdamah; and it appears the same if they compound it dry, since through this it is fit for eating — the ginger is primary and one blesses upon it borei peri haAdamah.`,
);
patch(
  mech,
  "mechaber",
  7,
  "main",
  `On spices that are ground and mixed with sugar — the spices are primary and one blesses upon them per the law of blessing on those spices.`,
);
patch(mech, "mechaber", 8, "main", `On radish one recites borei peri haAdamah.`);
patch(
  mb,
  "mishnah-berurah",
  2,
  "א",
  `(1) On strawberries that grow in a bush — which are called in German "moyl" and "malinche"; and there are types of "moyl" in German that grow on a tree and one blesses borei peri haEtz upon them. And likewise our "malinche" too — it is known that they grow on a tree that endures from year to year and one blesses borei peri haEtz upon them [Dagul Meirevavah and Chayei Adam]. And "shtainil" — a corruption of "malinche" — that grow on forest trees requires study, for they are not so good for food except after cooking; and they are comparable to ben Asa explained in seif 5, and not comparable to strawberries that grow on a tree that we wrote one blesses borei peri haEtz upon, for they are good for food when they remain long on the tree.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ב",
  `(2) That it produces from its trunk — and then its fruit has the name of tree fruit, even if the tree is a thin stalk.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ג",
  `(3) Since its trunk is completely consumed — and fruit called "brombeer" and "erpherit": the view of Magen Avraham and Eliyah Rabbah is to bless upon them borei peri haEtz, for thus the branch endures many days and when one takes fruit it again comes from that same branch itself. And red fruits called "fazimkes" that grow in the forests — one blesses borei peri haAdamah; and even those that grow in gardens — Chayei Adam is stringent that lekatchila one should bless borei peri haAdamah upon them, and b'dieved when he blessed borei peri haEtz he should eat only a little so the blessing not be in vain, and no more. And fruits that grow on small trees, even if their height is less than three tefachim, such as black jagodas — the view of Magen Avraham and several latter authorities is to bless borei peri haEtz upon them; but the world practices to bless borei peri haAdamah, and it is possible their reason is that they are not considered much of a fruit. And types of jagodas and "zorevvinis" from which one sucks the liquid and discards the peel — there are opinions among the latter authorities whether to bless borei peri haAdamah or shehakol; but on "kalinche," even though they grow on a tree, certainly one should bless shehakol upon them, for the food is not fit at all — and even if one swallows with the peel and pit, nevertheless in truth the peel and pit are not fit for eating at all.`,
);
patch(mb, "mishnah-berurah", 3, "_", `(4) On bananas with borei peri haAdamah — the reason is likewise as with strawberries.`);
patch(
  mb,
  "mishnah-berurah",
  4,
  "_",
  `(5) Shehakol — for they are not considered to bless upon them borei peri haEtz, for they are merely trees; and they are not comparable to strawberries in a bush, which are considered at least fruit even though they also grow in a bush — which is like an ornamental tree, for they are good to eat live when they remain long on the bush and are cooked, except that the branch does not endure from year to year. But here we deal with inferior fruits, such as small apples and small pears that grow on forest trees, which are not fit for eating when live — therefore they are not considered in the category of fruit even when ripe, and one blesses shehakol upon them. And small nuts gathered from forest trees, which are good for eating, are complete fruit and one blesses borei peri haEtz upon them. And likewise on [agras] and in another language (kastanier in German) — even though they grow on thorns, the world practices to bless borei peri haEtz. But on red fruit that grows on thorns called in another language (hanfotin), and all the more on species that grow on brambles called in another language (shloim kearshin) and in the Polish language (pianitzes) — one blesses shehakol, for they are not considered, and also because they grow on brambles.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "א",
  `(6) Ben Asa — meaning small grapes that are regularly found on hadasim.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "ב",
  `(7) Rather shehakol — for they are not considered; it is like fruits that ornamental trees produce.`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "א",
  `(8) That they compound it — this teaches us that through compounding that they compound it in honey, its blessing did not change from when they eat it live, whose blessing is borei peri haAdamah, as above in siman 202, seif 8.`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "ב",
  `(9) It dry — meaning even though dry ginger alone has no blessing at all, as in siman 202, seif 16 — here, through compounding it becomes fit for eating and returns to its appropriate blessing [and one should not challenge from soft walnut, which is stated there in seif 14 that even though it was improved through cooking in honey, nevertheless its blessing is shehakol — for there the fruit had not yet reached the time of its cooking, unlike here where the fruit was already cooked but on account of its dryness was not fit for eating; therefore it helps when they compound it and make it fit]. And likewise when they compound dry peppers, its blessing too is borei peri haAdamah.`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "ג",
  `(10) Fit for eating — and likewise when they roast ginger and eat it for medicinal purposes, since through this it is fit for eating; but on etz citron one blesses shehakol, since it is made for taste and not for eating. Preserved horseradish (called krein) — its blessing is shehakol; but preserved radish (retich) — it appears from several latter authorities that its blessing is borei peri haAdamah, and even if one makes it from their peel, the blessing did not change.`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "ד",
  `(11) The ginger is primary — and even if a non-Jew compounded it, there is no concern of bishul akum, for they are eaten live through a mixture of sugar; but all other types of fruits or vegetables, and likewise rose leaves — anything not fit to eat live, if a non-Jew cooked or compounded it, is forbidden on account of bishul akum.`,
);
patch(
  mb,
  "mishnah-berurah",
  7,
  "א",
  `(12) Ground — meaning even when they are ground and completely dissolved until their original form is not recognizable at all, nevertheless their blessing did not change thereby — for all agree that the manner of spices is to grind in this way.`,
);
patch(
  mb,
  "mishnah-berurah",
  7,
  "ב",
  `(13) The spices are primary — meaning even when sugar is the majority and spices are a minority, as is our practice in making "magen fulvor," where much sugar is mixed with ground ginger — nevertheless the ginger is primary and the sugar is secondary to them, for it comes only to sweeten them, and one does not bless upon the sugar.`,
);
patch(
  mb,
  "mishnah-berurah",
  8,
  "_",
  `(14) Radish, etc. — for even though in the end it will harden like a tree if one does not pluck it in its season, nevertheless one blesses borei peri haAdamah upon it, for people plant it with intent to eat it when soft [Gemara]. And see in Chayei Adam and Nahar Shalom, who lean that with our radish, which is bitter [and there is no manner to eat without bread], it is not considered much and one blesses shehakol upon it; however, the Gra in siman 205 proves from Chayei Adam that nevertheless one blesses borei peri haAdamah upon it.`,
);
patch(
  pmg,
  "peri-megadim",
  1,
  "_",
  `<b>That ornamental trees produce.</b> Taz — and likewise Magen Avraham, note 1. Eliyah Rabbah wrote, note 2, in the name of Olas Tamid: preserved krein — borei peri haAdamah, even though it is not fit in itself except through vinegar — similar to dry ginger, since they plant it with intent thus. And Eliyah Rabbah wrote: moist ginger is fit when moist; and krein is similar to anise and alexanders — siman 204, seif 61 — shehakol. I did not understand at all regarding krein on Pesach — one blesses, for it is fit for eating; siman 473, seif 5; Magen Avraham, note 11. Also what Eliyah Rabbah wrote that it is not fit for eating — rose leaves prove, siman 204, seif 11; Magen Avraham, note 23. Also krein, as it seems, is not sown, and mostly I have seen it grows on its own — its law is like weeds of the field — siman 204, seif 61 — shehakol. And it appears regarding fruits that are not sown — Taz, siman 204, seif 8; and I already wrote in siman 202, Taz, note 12, regarding compounding; see there, and here there is no need to extend. And regarding anise — Taz — there too it will be explained in siman 204.`,
);
patch(
  pmg,
  "peri-megadim",
  2,
  "_",
  `<b>Spices.</b> Taz — like what they make for magen fulvor — Taz; and therefore even though sugar is the majority and ginger a minority, it is like oil with anigrin. Magen Avraham, siman 202, note 35.`,
);
patch(
  pmg,
  "peri-megadim",
  3,
  "_",
  `<b>Radish.</b> Taz, Berakhot 36a — that it is not like a gourd; see there. And those who compound the thick peel of radish in honey — per Levush, on compounded radish — borei peri haAdamah; likewise its peel. And Levush — regarding bergamot peel, that the thick peel of radish is the best part — and this is simple. And Taz, Rosh Hashanah 3 — and there too it will be explained.`,
);
patch(
  st,
  "shaarei-teshuvah",
  1,
  "_",
  `In winter. Ba'er Heitev — and what he wrote regarding those red ones found, etc. — these are those found in our country called "kalinos." And Peri Megadim is stringent in this that one should bless on another fruit borei peri haEtz first, and also drink water and bless shehakol — see there; and this is because it is difficult for him regarding olives and grapes and sugar, per the Tur's view — see there. And see in Yad Ephraim in explanation of Magen Avraham, and the essence is that one should bless only shehakol and fulfill thereby — unless he anyway wants to eat the fruit and drink water; but one need not do so deliberately.`,
);
patch(
  st,
  "shaarei-teshuvah",
  2,
  "_",
  `Serak. Ba'er Heitev — and in Birkei Yosef he wrote in the name of the Ari to bless borei peri haEtz, and so is the practice of the people.`,
);
patch(
  st,
  "shaarei-teshuvah",
  3,
  "_",
  `Ginger. Ba'er Heitev — and see in Likutei Peri Chayim that one should judge this by the law of tom and kreti, etc.; and see in Birkei Yosef from this; and see in Emek Berachah that compounding of ginger and the like is when they compound pieces of it; but if it is crushed and ground until it is not recognizable what it is — even though one knows it is ginger — one blesses shehakol. And see siman 204, seif 11; and see in Avnei Nezer that preserved horseradish called krein — borei peri haAdamah; and in Eliyah Rabbah he wrote one blesses shehakol; and see in Birkei Yosef that the essence is as Eliyah Rabbah.`,
);
patch(
  st,
  "shaarei-teshuvah",
  4,
  "_",
  `The spices are primary. Ba'er Heitev — and see in Mishbetzot Zahav, who wrote that those who compound nuts with sesame mixed in them — it is possible we follow the majority; except for grain types we follow the majority, and what sticks in the flour of the sesame — each adhesion is nullified — see there. And it appears that if both are equal and there is doubt which is primary, one blesses borei peri haAdamah — for even on something whose blessing is borei peri haEtz one fulfills b'dieved — siman 206.`,
);
patch(
  st,
  "shaarei-teshuvah",
  5,
  "_",
  `(In Shulchan Aruch, seif 8) Radish — one blesses borei peri haAdamah upon it, even though in the end it will harden. And Avnei Nezer wrote that if it hardened, one does not bless upon it, for it is merely a tree — see there; and it appears he deals with a case where it hardened greatly until most people do not eat on account of its hardness, and the eater's mind is voided, etc. — and this is simple. And see in Mishbetzot Zahav that compounding the thick peel of radish in honey — one blesses borei peri haAdamah, for it is not comparable to bergamot peel, for the peel of radish is the best part — see there. And it appears that nevertheless, if one compounded radish that hardened greatly, one should bless only shehakol.`,
);
patch(
  tz,
  "turei-zahav",
  4,
  "_",
  `<b>That ornamental trees produce.</b> Beit Yosef likewise in the name of Shiltei HaGibborim — and the reason they are not considered to bless borei peri haEtz upon them; and likewise in responsa of the Geonim. Therefore ben Asa (meaning grapes that grow on hadasim) — even though they ripen and become like fruit, one does not bless upon them except shehakol, for it was taught: the four species of the lulav — two produce fruit and two do not produce fruit; and since we say hadas and aravah do not produce fruit, we learn that the fruit of ben Asa is not fruit; end of his words. And I do not understand these words, for behold Scripture is written: "like an apple among the trees of the forest," etc., and concludes "and its fruit is sweet to my palate" — we learn that an apple that grows among forest trees is called fruit; and this could be answered that he speaks of a species that grows on ornamental trees and not in a garden — that one blesses shehakol; but a species that grows in a garden, such as apples, is properly called fruit, even on ornamental trees. But it is difficult: behold regarding strawberries in a bush he said in Shulchan Aruch one blesses borei peri haAdamah, and in Beit Yosef he brings in the name of R' Yitzchak that even borei peri haEtz one blesses upon them, for it is properly called a tree — and you have no ornamental tree more than a bush tree that is all thorns. And it appears to me he did not speak here except regarding inferior species usual in forest trees, such as small apples and small pears; and likewise ben Asa, which are not fit for eating when live — one does not bless upon them except shehakol, even if ripe; but strawberries, when they remain long on the bush and are cooked, are good to eat them live — and behold every day we bless borei peri haEtz on small nuts gathered from forest trees, as it appears to me.`,
);
patch(
  tz,
  "turei-zahav",
  7,
  "_",
  `<b>Spices that are ground, etc.</b> In the Tur likewise in the name of Maharil — it appears to me this is like homlita, meaning what we say in the Gemara: homlita that comes from Bei Nudai with borei peri haAdamah; and Beit Yosef brings in the name of Rashi that they are spices ground in honey, and it is implied in the Gemara that it is compounded ginger; end of his words. If so, what is Maharil's novelty? And it appears homlita is spiced in honey but it is not so much visible, rather the honey is absorbed in the spices — and therefore plainly the spices are primary. But Maharil deals where sugar is mixed among them and it is much visible before us, as is our practice that we mix sugar with ground ginger, and there is much sugar like the ginger — and one might think to bless as on sugar, since sugar is more fit for eating than ginger; he teaches us that nevertheless sugar is called secondary relative to ginger, and one blesses on ginger borei peri haAdamah and exempts the sugar, as stated. And Beit Yosef strained on this.`,
);
patch(
  tz,
  "turei-zahav",
  8,
  "_",
  `<b>Radish, etc.</b> For one might think: since in the end it will harden like a tree if one does not pluck it in its season, nevertheless one blesses borei peri haAdamah upon it, for people plant it with intent to eat it when soft — and its name is "pugel," meaning to eat it when soft; and see siman 204, seif 61.`,
);
patch(
  ye,
  "yad-ephraim",
  1,
  "_",
  `In Magen Avraham, note 1 — as written seif 8 and seif 15, etc. — and it is not comparable to olive oil, which one blesses borei peri haEtz, for there the olive itself is fruit fit for eating; therefore the name of fruit is upon it and it is appropriate to bless borei peri haEtz upon it. Therefore even when the oil is squeezed from it, since it changed its form upward and has no other upward form, and they planted it with intent thus, one blesses borei peri haEtz — unlike here: even though they planted it with intent thus, nevertheless never was the name of fruit applied to it at all, for its essence is only for the drink that comes from it — like one who sucks sweet canes in seif 15. And it is possible that even the Tur that Taz brought in note 13 regarding sugar admits regarding something standing for liquids — only there, since he thought its essence is to extract water to freeze them, therefore its law is not like a drink but like fruit standing for eating; and we judge it by the name of its end — therefore in truth Knesset HaGedolah challenged him that in truth its essence is not for this and they sell it for the taste of its water — if so, it is like other fruit waters upon which one does not bless borei peri haEtz; and we do not say it is part of the fruit, but perforce one is not fit to bless the name of fruit on a drink — therefore even if one freezes them afterward, it does not help. And it is possible per the reason Rosh wrote — because the taste of the fruit itself is not present, as Taz wrote, note 9 — if so, in fruit whose beginning is for drink like sweet canes, this reason does not apply. Nevertheless it appears Rosh did not speak except where the fruit stands for eating — nevertheless one does not bless on the drink that comes from it for this reason; but where it never came in the category of eating at all, there is no fruit name upon it.`,
);
patch(
  ye,
  "yad-ephraim",
  2,
  "_",
  `Note 4 — and in the Gemara the difficulty stands regarding blessing, etc. See in Peri Megadim, part 2, siman 62, who understood that what Magen Avraham wrote here are the words of Terumat HaDeshen; and therefore he wrote what he wrote. And also in Machatzit HaShekel it was hidden from him that Tosafot's view to explain "moist" is homlita, as Hagaot Maimoniyot wrote. Also what he wrote there to resolve the Gemara's difficulty from blessing, since it is eaten as it is, live, etc. — per his words there is no necessity from "eaten as it is, live," for perhaps the reason it is permitted is on account of bishul akum, because it is eaten with bread. However, what Magen Avraham wrote — for otherwise salted fish would be forbidden, etc. — I wrote in my pamphlet above to wonder at this; for apparently it is proof to the contrary: fish that was not salted first and was cooked by a non-Jew has concern of bishul akum, even though fit to eat live with salt — only with salted fish that was already made fit for eating. What difference is there whether fit to eat by itself or made fit through something else — but when now it is not fit for eating, only that it could have been made fit through something else, and a non-Jew cooked it — we have not heard that there should be no concern of bishul akum since it could have been made fit without cooking; and we find many things forbidden on account of bishul akum even though they could be corrected through something else. And what he brought — I did not know where it is mentioned that vinegar that a non-Jew cooked is permitted; but regarding oil we say there that it is permitted because it is eaten as it is, live; and in Berakhot it is explained this is with bread or anigrin, as stated. But in truth there is no proof, for oil — cooking does not raise or lower it at all regarding fitness for eating; and as before cooking one needed bread or anigrin, so after cooking; and likewise one may say regarding vinegar. But if cooking makes fit for eating what was not fit before, one may say that what it has of correction through something else does not help. And see there that I brought the words of Shach regarding ginger specifically when moist, etc.; and there he wrote regarding preserved krein that the essence is as Eliyah Rabbah to bless shehakol — and not from its reason, but because from the outset they planted it for dipping and not for compounding; see there.`,
);

const PATCH_COUNT = 31;
console.log(`ok siman 203 part 3 of 3 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(OC_ROOT, "pipeline/work/editorial-queue-siman-203-part3of3.json");
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
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
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
