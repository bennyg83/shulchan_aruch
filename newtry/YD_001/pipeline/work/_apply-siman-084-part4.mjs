#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { patchBlockFile } from "../lib/patch-one-block.mjs";
import { parseBlocksInFile, serializeBlock } from "../../yd001_block_lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const QUEUE = path.join(ROOT, "pipeline/work/editorial-queue-siman-084-part4of4.json");

const TRANSLATIONS = [
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "6", marker: "ב",
    en: `Since one does not recite a blessing, etc.—nevertheless, attached to the ground is so called, and there is substance in them because of sheretz that creeps on the land.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "8", marker: "א",
    en: `All kinds of fruits whose way is to become wormy while attached, etc. It implies—but if their way is not to become wormy except when detached, inspection is not required; and therefore there is no obligation of inspection in flour or in dried fruits such as raisins and the like, if there are small milvein there—for there is no prohibition there until after they separated; and it is found that it is safeik safeik, and in safeik safeik it is permitted even in Torah matter, as the Beit Yosef wrote in the name of the Rashba regarding one who transgressed and cooked within twelve months; and see what is written in seif 9.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "8", marker: "ב",
    en: `And the pierced ones ascend upward. But within twelve months inspection does not help—for then there is concern lest they became wormy while attached, and they are not floating upward; rather, specifically those that became wormy when detached. Beit Yosef in the name of the Ran.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "9", marker: "א",
    en: `Within twelve months without inspection. Maharshal derived from this that even within twelve months proper inspection helps—that is, to inspect each fruit individually to see if there is no defect externally, that suffices. And what the Tur wrote—within twelve there is no remedy—means the remedy of boiling water. And the Rama in Tur Choshen Mishpat wrote: and the custom is to sort legumes called arabisin within twelve months on the table, and sort out the pierced ones among them, end quote. And Maharshal wrote that since proper inspection is required and there is effort, one should not rely on women for this inspection. And Tur Choshen Mishpat wrote that the custom is to be lenient in this, for there are many sides to be lenient in this.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "9", marker: "ב",
    en: `For you have no fruit, etc. In Terumat HaDeshen he wrote that he accepted that specifically in large apples or other large fruits we say the worm is nullified in sixty; but not in small ones. And Maharshal wrote in perek Eilu Treifot, siman 102, that one should be stringent thus; and as Mordechai wrote—that in a small fruit it becomes nevelah and requires sixty against the whole. And in Tur Choshen Mishpat he wrote: nevertheless, if the dish also has other things besides the fruit, it is certainly permitted for all, and one need not be stringent, etc. And Maharshal wrote on this that one should not listen to him to be lenient; and in my humble opinion one may be lenient for another reason—that is, per what is stated in siman 104 at its end regarding repulsive things such as flies and mosquitoes, etc.—that if the permitted quantity is greater than it, it is permitted; and so too here, whenever the worm is not visible.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "9", marker: "ג",
    en: `But three or four, etc. It appears puzzling—why do I need four, since with three it is forbidden, you will not find four without three. And it appears the Ran, who wrote thus as the Beit Yosef brings, teaches that even with four there is heter in the sauce through filtering, as written nearby; and this is hinted in what the Ran wrote: and all are forbidden—and discarding them does not suffice, to teach that discarding does not help but filtering does. And the Shulchan Aruch dragged after it in language "even" though he did not conclude thus; and see siman 100.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "9", marker: "ד",
    en: `And since it became established with worms, etc. Maharshal wrote, Peri Etz Chaim, siman 100: and from here my own practice not to eat the dry spices, for they became established with worms—for after inspection and sorting I found in the dish at the bottom of the pot several worms, and so it was found several times, and they became established thus. And it appears specifically in something where worminess is common in them, but he did not inspect as required—we say thus; but in a thing where worminess is not common, we say it fell from elsewhere and we are not concerned excessively if three are found, end quote: An incident on Shavuot when the women made almost the entire city's loaves and paladins with raisins; and one woman inspected her raisins and found milvein in them—and they all bought from one place, and went and found also at the seller's, etc. It appears to me that those who bought before it was known there are milvein there are permitted—for this is similar to what the Beit Yosef wrote in the name of the Rashba regarding the law of one who transgressed and cooked within twelve months in things whose way is to become wormy—that here there are two safeiks: safeik whether there was stirring there or not; and if you say there was—perhaps it dissolved and was nullified. And so too here there are two safeiks: one—that perhaps at the time they bought they were not yet milvein until a short hour afterwards; and if you say they were—perhaps they dissolved in the oven from the heat of the fire. And one cannot say this is against reason—to say that in a short hour milvein form; and it is found that here there is only one safeik of dissolution. This is not so—for there too in that case of the Rashba, since their way is to become wormy, it is like vadai that it became wormy—for safeik of the usual is not called safeik, as Terumat HaDeshen wrote, siman 171, regarding wormy wheat; and even so the Rashba considered it safeik safeik. But those who bought afterwards—one must forbid all the loaves and paladins, for here there is only one safeik that perhaps they dissolved; and explicitly the Ran wrote at the end of Peri Etz Chaim that because of this one safeik the Rashba did not permit. And certainly there is no reason to distinguish between milvein and other worms regarding saying they dissolve more—in my humble opinion to be stringent, especially in Torah prohibition—for certainly the milvein separated from the raisins at the time of arranging and kneading, and perhaps one will eat the substance of the prohibition.`,
  },
  {
    file: "siman_084/yad-avraham/part-001.txt", slug: "yad-avraham", seif: "1", marker: "_",
    en: `(Siman 84, seif 4) And some forbid even if it died inside the fruit and separated, etc. What Peri Megadim in Siftei Da'at challenged—that explicitly "if it died" is rabbinic, as Kereti and Peleti wrote—why did they rule stringently. One can answer that in a fixed custom we are stringent in rabbinic matters, as Maharshal wrote, brought by Knesset HaGedolah, beginning of perek Beitzah. And Peri Megadim himself wrote so in Orach Chayyim, siman 244. And there is difficulty—for in siman 162 there he wrote the opposite, that without a fixed custom it is safeik of lack of knowledge.`,
  },
  {
    file: "siman_084/yad-avraham/part-001.txt", slug: "yad-avraham", seif: "2", marker: "_",
    en: `(There, seif 5) Worms found in flour, etc. In Noda B'Yehuda, siman 27, he is lenient not to inspect for worms in flour in vessels. And likewise if worms were found and not known until bread was baked from them. And in Sefer Beit Lechem Yehuda he wrote that in flour too, grinding and sifting by daylight help, as written in seif 4. It is further clear from his words, s.k. 22, that bread from which milvein fall—one cuts around it and the rest is permitted.`,
  },
  {
    file: "siman_084/yad-avraham/part-001.txt", slug: "yad-avraham", seif: "3", marker: "_",
    en: `(There, seif 7) A fruit that became wormy and it is unknown whether while attached or detached—forbidden. Magen Avraham wrote, s.k. 14, that if they certainly became wormy when detached, cold-water inspection also helps—to discard those on the outside, for presumably they separated; and boiling water for those that remained inside the fruit. And in Sulam LaMinchah he agreed with Pri Chadash to be lenient in great loss regarding flour that became wormy in a vessel, even if poured from vessel to vessel.`,
  },
  {
    file: "siman_084/yad-avraham/part-001.txt", slug: "yad-avraham", seif: "4", marker: "_",
    en: `(There, seif 13) Honey into which ants fell—one heats it, etc. And this is not nullifying prohibition except to eat it; but when one intends to permit the permitted and separate the prohibition from it—it is permitted. So too the Rashba in responsum 494, and the Ran, chapter 2 of Avodah Zarah, regarding hag'alah. And in Sefer Sha'ar HaMelekh, Hilchot Ma'achalot Asurot, he challenged—for from the words of Tosafot and Ran in Pesachim (30a) it appears it is forbidden even though one does not intend to nullify the prohibition in order to benefit; and per Pri Chadash in Orach Chayyim, siman 453, to resolve the difficulty—that hag'alah is different, for his intent is to separate the prohibition from the permitted, and in such a case all permit.`,
  },
  {
    file: "siman_084/yad-avraham/part-001.txt", slug: "yad-avraham", seif: "5", marker: "_",
    en: `(There, seif 17) A burned sheretz is permitted to eat for healing. It implies that without healing it is forbidden. And Maggid Mishnah, klal 46, s.k. 9, challenged—where did he get this, for in the Gemara and poskim it appears permitted lechatchilah, for all that are burned—their ash is permitted; and a chick from a nevelah egg is permitted—for when would it be accepted? When it putrefies it is mere dust. And the case under discussion is not similar to the proof—for there it changed to a permitted thing, as he himself wrote in Orach Chayyim, laws of Pesach. And further—a chick you do not come to forbid after the fact; unlike a sheretz. And further—from the words of the Rosh in chapter 2 of Pesachim, that chametz roasted before its time is forbidden in eating even though there was no prohibition upon it before—and the Shulchan Aruch ruled thus—it also implies prohibition; and the reason is because we say: since it is fit for eating, it is considered significant. And from the language of the Rambam, chapter 14 of Hilchot Ma'achalot Asurot, halacha 11, it also appears thus—for he wrote: but forbidden food after it putrefied and became foul and is nullified from human food—he is exempt. And it implies that nevertheless there is prohibition, as Perishat Taharat codified in Orach Chayyim, siman 442, and ruled to forbid in every prohibition that originally had a name of prohibition and afterwards was lost from human food—except chametz. And it appears this is from the reason that we say: since it is fit for eating, it is considered significant. And so one may deduce from the words of the Rambam in chapter 4 of Hilchot Chametz UMatzah, and the Taz brought it in Orach Chayyim there, who wrote: the bread itself that molded, etc.—he is not obligated to destroy. And this means it molded before its time of prohibition, as the Maggid Mishnah wrote—and nevertheless he wrote only that he is not obligated to destroy, which implies that in eating it is nevertheless forbidden (and see Hilchot Shevuot). And although regarding chametz some permit even lechatchilah, as the Rosh wrote in Pesachim—nevertheless in other prohibitions one certainly forbids rabbinically. And if so, here too if not for healing, one certainly may not permit a burned sheretz in eating, even though it was lost from human food—because we say that since it is fit for eating it is considered significant—only when eaten for healing it is permitted, for then it is not applicable to say that since it is fit for eating it is considered significant—for his illness attests that he does not eat it except for healing. And if so, all the more on Yom Kippur it is permitted to eat foods not fit for eating for healing—for he does not reveal his intent thus, as the Taz wrote in siman 612. And not as She'eilot U'Teshuvot wrote in siman 75. And that which "all that are burned—their ash is permitted"—does not refer to eating, but to prohibitions of benefit, and refers to benefiting. And from what is permitted without inspection in seif 8—it is no proof that there are good safeiks as stated. And independently it is possible it is forbidden. And if so, whence to permit eating lechatchilah—for all prohibitions, even though one is not lashed for them except in the usual way of benefit, nevertheless there is prohibition, as Tosafot wrote in Kiddushin and in Ra'avad on Niddah. And if because we say nevelah not fit for a gentile is not called nevelah—one can also say it is forbidden rabbinically, as implied from the words of the Rambam. And so Pri Chadash wrote in Orach Chayyim there: And know—that Noda B'Yehuda deduced in part Yoreh De'ah, siman 26, from the words of the Rambam that specifically in other prohibitions one who eats after it putrefied and is nullified from human food is exempt; but in basar b'chalav and likewise he is liable. From this he rules like R' Meir—that what is not putrid from the outset does not require fit for a gentile, and he exempts only in other prohibitions because it is not in the usual way of benefit—but still the name of prohibition is upon it. And his deduction is not compelling; on the contrary—from that he concludes regarding basar b'chalav and likewise that he is liable when a layman mixed—one learns that if they putrefied, he is exempt in them too. And as Chavat Da'at wrote, siman 150, that the prohibition flew away there, and even though they fixed it until it was fit for eating.`,
  },
  {
    file: "siman_084/yad-ephraim/part-001.txt", slug: "yad-ephraim", seif: "1", marker: "_",
    en: `Worms found in flour. And Noda B'Yehuda wrote, siman 26: worms found in flour—if it is placed on the ground, one must forbid baking bread from it, relying on nullification; and if it was not known until after baking, one may be lenient in private need. If placed in a vessel, Pri Chadash is entirely lenient; and therefore one who comes to ask should be told that most poskim are stringent; and if the questioner wishes to be lenient for himself, one need not protest, for there is a combination of leniencies—perhaps they did not separate, and in mixtures it is safeik d'rabbanan; and even though before kneading and baking it was safeik d'oraita, nevertheless one need not protest because of Pri Chadash's leniencies—and all the more one need not preach publicly to forbid; and also there is no obligation to inspect initially at all—see there.`,
  },
];

for (const t of TRANSLATIONS) {
  patchBlockFile(path.join(OUT, t.file), { slug: t.slug, seif: t.seif, marker: t.marker }, t.en);
}

const q = JSON.parse(fs.readFileSync(QUEUE, "utf8"));
for (const it of q.items) {
  const raw = fs.readFileSync(it.absPath, "utf8");
  const blocks = parseBlocksInFile(raw);
  const b = blocks.find(
    (x) =>
      x.slug === it.slug &&
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker || "_")
  );
  if (!b) throw new Error(`Block not found for ${it.id}`);
  it.rawBlock = serializeBlock(b) + "\n";
}
fs.writeFileSync(QUEUE, JSON.stringify(q, null, 2), "utf8");
console.log("Part 4 applied:", TRANSLATIONS.length);
