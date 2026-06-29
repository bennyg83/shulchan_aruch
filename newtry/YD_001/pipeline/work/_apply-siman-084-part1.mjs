#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { patchBlockFile } from "../lib/patch-one-block.mjs";
import { serializeBlock } from "../../yd001_block_lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const QUEUE = path.join(ROOT, "pipeline/work/editorial-queue-siman-084-part1of4.json");

const TRANSLATIONS = [
  {
    file: "siman_084/beer-hagolah/part-001.txt",
    slug: "beer-hagolah",
    seif: "3",
    marker: "_",
    en: `The Tur, in the name of the Rambam in chapter 2 of Hilchot Ma'achalot Asurot, and like the Tanna of the school of R' Yishmael—as is implied there—that argues with the Tanna Kama regarding charitzin that draw water and do not overflow, per the explanation of Tosafot there and as Matya ben Yehuda taught there; and the Rashba agreed.`,
  },
  {
    file: "siman_084/beer-hagolah/part-001.txt",
    slug: "beer-hagolah",
    seif: "8",
    marker: "_",
    en: `The Tur, in the name of the Rambam in chapter 2 of Hilchot Ma'achalot Asurot, per his textual reading in the Gemara—Matya explained it—and so is the girsa of the Rif, his teacher R' Chaim, and Sefer HaTerumah; and the Rashba agreed.`,
  },
  {
    file: "siman_084/beer-hagolah/part-001.txt",
    slug: "beer-hagolah",
    seif: "9",
    marker: "_",
    en: `There, in the name of the Rashba (and so is the view of Sefer HaTerumah, brought in Shibbolei Leket and Mordechai).`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "12",
    marker: "א",
    en: `(Collection) Marakhat, etc. Not like Rabbeinu Yonah, who wrote in chapter 6 of Berachot that forbidden matter that fell into honey is permitted; and the Rosh wondered where he learned this from, and it appears he learned it from honey itself, that legs of bees are mixed into it. But Tosafot on Avodah Zarah 69a, first s.v. hahu, taught thus there, and all the poskim argue on him; and the Magen Avraham objected from what is written in Bechoros 6b, "milk of a pure domestic animal," etc., and in Temurah 31a—but regarding an egg, when, etc.; but without this, no—and see siman 216, seif kaf-vav, s.k. 3, where he expounded at length on this (and see what I omitted in the collection—the words of the Ran) (end).`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "12",
    marker: "ב",
    en: `That honey, etc. As written in chapter 1 of Bava Batra (3b):`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "14",
    marker: "_",
    en: `Wheat, etc. See there; and there: (Collection) Wheat, etc. Yerushalmi end of chapter 5 of Terumot on the mishna "and they grind," etc., and if it is known, etc.; and in chapter 1 of Orlah on the mishna of R' Yishmael, etc. A tanna taught: one may also grind first and thereby permit—the mishna of R' Yosi that R' Yishmael also, if he intends—and Yalkut, and it rises one in two hundred; Or Zarua, s.v. hi—for thus is the way of kohanim to grind mixed produce within their homes, etc.; and the Rosh brought this in Terumot there (end).`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "15",
    marker: "_",
    en: `Species, etc.—like the main topic of olives, etc.: (Collection) Species, etc. And Mordechai wrote in the beginning of perek Ha'or VeHarotav, siman 491: fowl that grow on a tree—some say shechitah is not required, because they do not reproduce and multiply; and Or Zarua heard from his father that Rabbenu Tam required shechitah for them, and so R' Yehuda told him as practical halacha that one must slaughter them; and proof from what is written in 127a, "or go your way," etc.—thus it is in the category of other sheratzim—the gloss, etc. But regarding shechitah, all permit, since one can say it has signs of purity; and so Yeshu'ot Shmuel there (end).`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "16",
    marker: "א",
    en: `Regarding fish. Per Tosafot, s.v. kukiyani, and so the Geonim explained; and so in most books explicitly: min neim (fish), kivra (roe), etc. Beit Yosef:`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "16",
    marker: "ג",
    en: `And so, etc. As written in the Gemara, "thus now," etc.:`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "16",
    marker: "ד",
    en: `According to those who permit, etc.—meaning, to exclude one who thought:`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "16",
    marker: "ה",
    en: `They are accustomed, etc. As stated above—that is, in their homes; and one explains per the explanation on the roof of a palm tree, that its way is not to be there; and he learned from those growing in water in vessels and pits:`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "16",
    marker: "ו",
    en: `Some permit, etc.—specifically in things growing from the ground; even when detached there is substance, because of sheretz that creeps on the land. Not so what is not gidulei karka, where there is only the concern of eiver min hachai in creatures found in animals—in living animals, as stated above. Mordechai in the name of Ravyah:`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "17",
    marker: "_",
    en: `A sheretz that was burned, etc. As written at the end of Temurah and in chapter 2 of Pesachim: all that are burned—their ash is permitted, even for eating. Mordechai, perek 2 of Pesachim: (Collection) A sheretz that was burned, etc. As written in chapter 2 of Pesachim (24b): all prohibitions, etc.; and certainly regarding eating raw milk, he said exempt and exempt and permitted—meaning, not from the exemptions of Shabbat that exempt but are forbidden; and in perek Mi She'achzav (69b), to apply Shabbat between the blood, etc. Mordechai there; and he wrote there: nevertheless, a healthy person should beware in the matter—and this means for healing. But the Rosh there did not say so, although for practical law they do not differ—except that he wrote: since it says one is not lashed, it implies that yes, there is a prohibition, but for healing it is permitted, as written there (25b): Ravina applied to his daughter, etc.; R' so-and-so said thus to him, etc.—thus even when there is no danger it is permitted; and see siman 155, s.k. 185; and certainly such in eating, as written there; and certainly eating raw milk, etc.; and so Tosafot on Avodah Zarah 12b, s.v. ella, etc., that there is a prohibition; and so the Ramban and Rivash at the beginning of the perek, etc.; and see siman 155, s.k. 185, in the gloss, where he wrote: except wood of idolatry. And per the reason he wrote—that it is permitted because ash is permitted—and so in Mordechai there it fits. But per the above, one must say that regarding idolatry it is forbidden even not in the usual way of benefit, like the Bach, where eating is not written; and in Tosafot on Avodah Zarah there they were uncertain—but to him it is obvious per his view, that he wrote there ash is permitted because it is not in the way of benefit; and he wrote in kilayim and in the Bach it is forbidden—see there (and see siman 155, s.k. 22) (end).`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "2",
    marker: "_",
    en: `Those that grow, etc. Beit HaGadol; and therefore he challenges and reverses: "I will teach"—thus, confined like vessels. Tosafot, s.v. bamayim:`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "3",
    marker: "ב",
    en: `That the way, etc. Rashi, s.v. shikhra:`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "5",
    marker: "א",
    en: `Worms, etc. And the same, etc. For in them he explains: the interior walls of the vessel from inside are forbidden—like the explanation of some of them to the air of the world—that specifically in water it expands, "all that are in the water that creep," etc.; and if so, we are concerned lest they explained as stated above, lest perhaps, etc.:`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "5",
    marker: "ב",
    en: `And it is forbidden to sell them, etc. As written in chapter 2 of Pesachim (40b):`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "6",
    marker: "א",
    en: `Worms, etc. Per Shmuel at the beginning of that perek, chapter 58, who holds like him; and Tosafot there, s.v. deika, etc.:`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "6",
    marker: "ב",
    en: `And it, etc.—for we require "that creeps." There: (Collection) And it stirred, etc. But in Terumat HaDeshen, part 2, he argues on this and wrote: for per Shmuel it is like that which grows on the ground; and thus a cucumber that became wormy without specification, etc.; and thus in the gloss: and sometimes, etc. (end):`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "6",
    marker: "ד",
    en: `Worms that grow, etc. As written in Berachot 40b, Nedarim 55b, Mirva, etc.:`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "6",
    marker: "ה",
    en: `And sometimes, etc. So too the Rashba holds; and he holds we do not require that it stirred, unlike the view of Tosafot and the Rosh and the Shulchan Aruch in siman 275:`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "7",
    marker: "_",
    en: `(Collection) Fruit, etc. Per Rashi 58b, s.v. hani, etc.; and it implies specifically when it became wormy. But stam we are not concerned; and an alternate girsa: if so, it should have said "these fruits," etc.; and what dates said—he took dates; and moreover, stam he said "these dates that are thus"—but because worminess is common in them, even though it is a minority—for a common minority we are concerned, like checking the lung; and thus in siman 468, all, etc. Terumat HaDeshen, part 2; and Avodat HaKodesh in the gloss, that it is, etc. (end):`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "8",
    marker: "ח",
    en: `Those that became wormy, etc. But inside 112 it does not help—for there are two stirrings: one small, growing while attached, and one large, growing while detached, that pierces and descends; and the pierced ones ascend upward—unlike that which grew while attached, which does not pierce. Terumat HaDeshen. And further, not all ascend upward; and thus, afterwards one puts them in a pot, etc.—and this does not help inside 112, for removal is required; and as the Rashba wrote in his chiddushim, they do not ascend except those ready to separate. And boiling alone does not help, lest they immediately leave while alive; but now, those that did not ascend will not separate immediately, as stated above:`,
  },
  {
    file: "siman_084/beur-hagra/part-001.txt",
    slug: "beur-hagra",
    seif: "9",
    marker: "ג",
    en: `And there are those who, etc. As written in perek HaBayit Yaakov and per Rashbag (and see below siman 100, s.k. 20):`,
  },
  {
    file: "siman_084/kaf-hachayim/part-001.txt",
    slug: "kaf-hachayim",
    seif: "1",
    marker: "_",
    en: `(1) [Seif 1] Sheratzim that grow in water in vessels, etc. And the same applies to other liquids in vessels, as stated in seif 3; Shach, s.k. 1. Pri Chadash, siman 1, Halacha Pesuka in seif 1; Kereti, siman 1; Shulchan Petach David, siman 1; Chochmat Adam, klal 38, ot 2; Beit Yitzchak, ch. 1, in siman 98, ot 1; Machazik Berachah, ot 1; Erukh HaShulchan, ot 19; Zera Yaakov Tzvi, ot 1; and see below, ot 161, how many launderings one is obligated for each worm—see there.`,
  },
  {
    file: "siman_084/kaf-hachayim/part-001.txt",
    slug: "kaf-hachayim",
    seif: "11",
    marker: "_",
    en: `(11) And the same applies—if one took from the water in his hand to drink—it is forbidden. Lechem Benevet, siman 101. Shach, s.k. 5. Knesset HaGedolah there. Beit Lechem Yehuda there. Halacha Pesuka in seif 1; Shulchan Petach David, ot 5; Chochmat Adam there; Zera Yaakov Tzvi, ot 7.`,
  },
  {
    file: "siman_084/kaf-hachayim/part-001.txt",
    slug: "kaf-hachayim",
    seif: "13",
    marker: "_",
    en: `(13) There. And if they separated from the place of their majority—such as behind the pit, or on the lip of the vessel from outside. The language is not corrected; and in Tehilla l'David for the Rashba it is written: behind the vessel, or on the lip of the pit—and that is corrected. Nevertheless, it appears that sometimes a vessel is found whose lip is wide, and one need not worry that they separated onto its lip. Shach, s.k. 6. Knesset HaGedolah in Hagahot Taz, ot 5; Pri Chadash, ot 5; Shulchan Petach David, ot 6.`,
  },
  {
    file: "siman_084/kaf-hachayim/part-001.txt",
    slug: "kaf-hachayim",
    seif: "15",
    marker: "_",
    en: `(15) There. But if they did not separate except onto the wall of the vessel from inside—they are permitted; and the same applies to the wall of the pit from inside—they are permitted. Perishah there. Shach, s.k. 7. Knesset HaGedolah in Hagahot Taz, ot 6; Pri Chadash, ot 6; Beit Lechem Yehuda there. Shulchan Petach David, ot 7; Chochmat Adam, klal 38, ot 2; Zera Yaakov Tzvi, ot 11.`,
  },
  {
    file: "siman_084/kaf-hachayim/part-001.txt",
    slug: "kaf-hachayim",
    seif: "16",
    marker: "_",
    en: `(16) And know—that which we say, that when they separated to the walls of the pit or vessel it is permitted, is because that is their majority—not to mean that it is permitted to take the worm in one's hand and eat it; and even if one ducks upon it and eats it—it is forbidden. And likewise, worms in water in vessels and in pits alone are not permitted, even if one ducks to eat them—only specifically when they are in the water. Pri Chadash there. Lechem HaPanim there. Beit Lechem Yehuda there. Perishat Taharat, ot 3. Chochmat Adam there, ot 3. Zera Yaakov Tzvi, ot 5.`,
  },
  {
    file: "siman_084/kaf-hachayim/part-001.txt",
    slug: "kaf-hachayim",
    seif: "17",
    marker: "_",
    en: `(17) [Seif 2] Those growing in water in charitzin, etc.—some forbid, etc. And so Rabbenu Yerucham, Peri Etz Chaim, siman 123, per the view of those who forbid; and so appears the view of Orchot Chaim. Shach, s.k. 8. And so agreed Knesset HaGedolah in Hagahot Beurim, ot 1, per the view of those who forbid. Menachem Meshiv Nefesh on the Tur, Choshen Mishpat, klal 54, ot 2; Perishat Taharat, ot 4; Beit Lechem Yehuda, ot 4; Shulchan Petach David, ot 8; Mechabbar, ot 2; and he wrote that although per the tradition in our hands in the words of the Mechaber, where he brings two views in this style, his view is like the last opinion—here the later authorities ruled stringently; and it is proper to be stringent, for safeik d'oraita lechumra. And so Chak L'Yisrael, Chelek Dalet, siman 34, expounded at length on this and concludes to forbid—see there. Zera Yaakov Tzvi, ot 13.`,
  },
  {
    file: "siman_084/kaf-hachayim/part-001.txt",
    slug: "kaf-hachayim",
    seif: "2",
    marker: "_",
    en: `(2) There. And in pits—shichin, caves, etc. A bor is round. A shich is long and narrow. A me'arah is square and covered with a roof, except that it has an opening. Charitzin are wide and square like a me'arah, and are not roofed, but their entire mouth is open. Neitzin are short below and wide above. Rashi at the beginning of 72b, and the Ran. Bach. Shach, s.k. 2. Knesset HaGedolah in Hagahot Taz, ot 2; and see below, seif 2.`,
  },
  {
    file: "siman_084/kaf-hachayim/part-001.txt",
    slug: "kaf-hachayim",
    seif: "5",
    marker: "_",
    en: `(5) There. Therefore one ducks and drinks from them and need not worry, etc. And there is no concern here of lo teshaktzu, since he does not swallow it with the eye, but rather inside the water that he drinks. Bach in Kuntras Acharon. Shach, s.k. 3. Lechem HaPanim, ot 1; Chochmat Adam, klal 38, ot 3. And specifically when they are not repulsive to him; but if they are repulsive to him—it is forbidden because of lo teshaktzu. Taz, s.k. 2. And this means—even though for everyone they are not repulsive, if they are repulsive to him—it is forbidden, as written in the ot following.`,
  },
  {
    file: "siman_084/kaf-hachayim/part-001.txt",
    slug: "kaf-hachayim",
    seif: "8",
    marker: "_",
    en: `(8) And likewise, it is forbidden to drink from a place where there is concern of danger—such as a leech and the like. Rambam, chapter 11 of Hilchot Rotze'ach. And see below, siman 116.`,
  },
  {
    file: "siman_084/kaf-hachayim/part-001.txt",
    slug: "kaf-hachayim",
    seif: "9",
    marker: "_",
    en: `(9) There, {Rama: gloss}. But it is forbidden to draw in a vessel and drink from them—for perhaps they separated on the walls of the vessel. Beit Yosef in the name of the Rosh. Taz, s.k. 3. Shach, s.k. 4. And it is clear in the words of the Rosh there, that if one drew from the pit—even though we do not know with certainty that they separated (on the walls of the vessel)—they are forbidden, because we are concerned lest they separated. Shach there. Knesset HaGedolah in Hagahot Beurim, end of ot 4; Menachem Meshiv on the Tur, Choshen Mishpat, klal 53, ot 3; and he wrote: and not like the Levush. Perishat Taharat, ot 1; Beit Lechem Yehuda, ot 2; Shulchan Petach David, ot 4; Chochmat Adam, klal 38, ot 3; Machazik Berachah, ot 4; Zera Yaakov Tzvi, ot 6.`,
  },
  {
    file: "siman_084/kereti/part-001.txt",
    slug: "kereti",
    seif: "11",
    marker: "_",
    en: `A woman who was found—and the view of the Maharshal is not to rely on these inspections on women; and the Rama wrote that the custom is to rely on them. And truly, nowadays it is more fitting to rely on women's inspection than on men's—for they are hasty and occupied with business, and do not check as much; and one's sense attests to this. And truly, to eat raw vegetables—such as salad and the like—and here there is safeik d'oraita, for bitul does not apply, since one can check two and three times until a worm is found; and thus it is safeik d'oraita, and heaven forbid to be lenient. And it is hard for me to tell one to rely on women, or on men who are hasty in their work. But in cooked foods one may rely—for if they checked it, at least their checking helps to remove vadai that there is stirring, only safeik; and thus it is safeik safeik: whether it remained after checking or did not remain; and if you say it remained—perhaps it dissolved. And also after cooking one cannot recognize the worm or permit it; and from the Torah it is nullified—only rabbinically a brayta is not nullified; and thus there is room to be lenient in what is rabbinically cooked. And such has been my custom from the day I stood on my opinion—not to eat raw vegetables, salads and the like, relying on the said inspection; and so is proper for every baal torah, for the trap of sin is great.`,
  },
  {
    file: "siman_084/kereti/part-001.txt",
    slug: "kereti",
    seif: "12",
    marker: "_",
    en: `To set the things in place—whole ones, yes; but cut ones, sometimes it does not set them in place.`,
  },
  {
    file: "siman_084/kereti/part-001.txt",
    slug: "kereti",
    seif: "13",
    marker: "_",
    en: `And they filter it—and here there is no nullification of the prohibition, since they filter and remove the prohibition.`,
  },
];

// Patch output files
for (const t of TRANSLATIONS) {
  const abs = path.join(OUT, t.file);
  patchBlockFile(abs, { slug: t.slug, seif: t.seif, marker: t.marker }, t.en);
  console.log("patched", t.file, t.slug, t.seif, t.marker);
}

// Sync queue rawBlocks from output
const q = JSON.parse(fs.readFileSync(QUEUE, "utf8"));
const { parseBlocksInFile } = await import("../../yd001_block_lib.mjs");

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
console.log("Queue synced:", QUEUE);
