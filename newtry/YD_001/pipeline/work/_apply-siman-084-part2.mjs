#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { patchBlockFile } from "../lib/patch-one-block.mjs";
import { parseBlocksInFile, serializeBlock } from "../../yd001_block_lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const QUEUE = path.join(ROOT, "pipeline/work/editorial-queue-siman-084-part2of4.json");

const TRANSLATIONS = [
  {
    file: "siman_084/pitchei-teshuva/part-001.txt", slug: "pitchei-teshuva", seif: "13", marker: "_",
    en: `Because of healing. Av Beit HaTurim; and see in the responsum of the Chasam Sofer, siman 76, where he wrote: although from the responsum of the Rosh, klal 42, one can prove that depression is not considered a danger to life, nevertheless in private need we go to be lenient, and one may rely on the Maharshal in the name of R' Yisrael to feed him forbidden matter if the cure is certain—see there.`,
  },
  {
    file: "siman_084/pitchei-teshuva/part-001.txt", slug: "pitchei-teshuva", seif: "2", marker: "_",
    en: `Lest they separated. Per the Taz, who challenged from above, seif 4, that we are not concerned lest they separated—even if its hole is pierced outward; and see in the responsum Shivat Tziyon, siman 28, what he wrote to resolve this—and see there further.`,
  },
  {
    file: "siman_084/pitchei-teshuva/part-001.txt", slug: "pitchei-teshuva", seif: "3", marker: "_",
    en: `On the ground. Av Beit HaTurim; and see Pri Chadash, who argues—meaning, he holds that even if they certainly separated onto vessels from inside, it is permitted as with water; and see in the responsum Noda B'Yehuda, part Yoreh De'ah, siman 27, where he wrote that although his reason seems plausible, one may not be lenient against the other poskim; but in safeik whether they separated at all, one need not protest against one who is lenient; and if one already baked from this flour and the worm was not known until after baking, one may be lenient in private need—even if the flour was placed on the ground—see there at length. [And see in the responsum Meshech Chochmah, siman 27.] And see in Hagahot of the Maharit z"l, where he brought here the words of the Taz, who forbids making yeast from flour that became wormy—even though bitul does not apply here, and one does not intend only to extract the moisture from it—nevertheless, if a Jew has any heter, it will come to be eaten as is. And he wrote that Pri Chadash argues on him and permits making yeast; and so in the responsum of the Tzemach Tzedek, siman 51, he was not concerned for this concern of the Taz—see there. And see in the responsum of R' Akiva Eiger, Panim Me'irot, part 3, siman 35, who also argues on the Taz and permitted making yeast or beer from wormy flour, and likewise to make wine from raisins that became wormy and afterwards to filter through a thick garment—and we are not concerned at all for this concern of the Taz—see there. And see in the responsum Shevut Yaakov, siman 29, who permitted putting wormy berries into wine, provided one places them inside a small pouch sewn on all sides—see there.`,
  },
  {
    file: "siman_084/pitchei-teshuva/part-001.txt", slug: "pitchei-teshuva", seif: "4", marker: "_",
    en: `To a Jew. Av Beit HaTurim; and see in the responsum of R' Akiva Eiger, Panim Me'irot, part 3, siman 35, who also argues on the Shach in what he permitted—selling kav by kav—see there; and see in the Magen Avraham, siman 467, s.k. 2.`,
  },
  {
    file: "siman_084/pitchei-teshuva/part-001.txt", slug: "pitchei-teshuva", seif: "5", marker: "_",
    en: `While attached. Av Beit HaTurim [and see; and in the Taz he wrote: from the words of the Mechaber it is implied, etc.; and certainly for lechatchilah. And see in the responsum Chasam Sofer, siman 77, that a certain rav was stringent on himself not to sell in his shop dried fruits from last year during winter months, since in summer months from Sivan onward they are presumed to have grown milvein, and every creature that has no bone does not live six months but survives twelve months, as Pri Chadash wrote, s.k. 23. And if so, those milvein that formed in Sivan die in Cheshvan and are still forbidden until next Sivan until twelve months have passed, and they have no inspection since they died and no longer stir. And he z"l answered him that from the fundamental law one need not be stringent in this, for the Rambam, chapter 2 of Ma'achalot Asurot, halacha 15, when he spoke of worms in detached produce that separated—and attached, even if they did not separate—he did not require inspection except for those that become wormy while attached; but those that become wormy while detached he did not mention inspection even lechatchilah. And even for those who are stringent in this—that is, where inspection is possible, it is forbidden to eat without inspection since one can determine it—but where one cannot determine it, like our case where the stirring already died after six months and they cannot be inspected, one does not forbid the fruit; rather, one should wash it well to fix what is possible—for if there are worms and dead milvein on it they will be removed, even though this is not a complete fix, for if so even with living milvein why trouble with this inspection—why wash in water; thus this is not a reliable fix. Nevertheless, here after six months where inspection is impossible, one is obligated to do what is possible; but one does not forbid the public. Nevertheless, certainly the abstainer and pious person will never eat anything requiring inspection; and the rest of the common people who eat with at least some inspection—how good if they restrain their hands in the manner of our question—that is, from the days of Tevet onward not to eat dried fruits from last year, since the stirring died from Sivan days; but to forbid the public in what they already practiced to permit—we have no authority—see there.] And see in the name of Beit Yisrael: I saw men of action, etc.; see in She'eilat Ya'avetz, part 2, siman 124, where he wrote that rice also has a remedy through inspection by heating and good visual inspection; and they also inspect in the sun, or by means of a glass vessel that magnifies the sight; and the stringent person may be stringent for himself, but one may not rule prohibition for others—see there.`,
  },
  {
    file: "siman_084/pitchei-teshuva/part-001.txt", slug: "pitchei-teshuva", seif: "6", marker: "_",
    en: `And if not, it is permitted. See in the responsum of the Radbaz, part 2, siman 563, what he wrote on this.`,
  },
  {
    file: "siman_084/pitchei-teshuva/part-001.txt", slug: "pitchei-teshuva", seif: "7", marker: "_",
    en: `That became established with worms. Av Beit HaTurim in the name of the Maharshal—and he is in perek Elu Treifot, siman 100; and the Taz brought it, s.k. 17; and there he concludes with it: and it appears specifically in something where worminess is common in them, but he did not inspect as required—we say thus; but in a thing where worminess is not common in it, where we say it fell from elsewhere, we are not concerned excessively—three found suffice, end quote. It is clear his intent: in a thing where worminess is not common, even if three are found it is permitted—even that dish; and so understood the Magen Avraham in Orach Chayyim, siman 467, s.k. 12, and rejected for this reason the words of the Ravad there—if three grains are found in a dish. And see in Chak Yakov there, s.k. 25, where he wrote that the words of the Maharshal are not compelling, and this distinction is not found in any posek—see there. And see in the responsum Makom Shmuel, siman 64 and siman 66, ot 25, where he wrote that the intent of the Maharshal is not as they understood—that even that dish is permitted even if three are found; rather, he means regarding forbidding that entire species because it became established with worms—for this he distinguishes: in a thing that comes from elsewhere we do not forbid that entire species; but certainly this dish in which worms were found we forbid with three, even if it came from elsewhere—see there. And see in Av Beit HaTurim in the name of the Taz—a case, etc.; see in Peri Megadim, who wrote that if only one woman found it in her pot, we say here it was found and here it was—etc.; nevertheless, if three people or more bought and worms are found in three milvein, one forbids also in other households, etc. And what the Taz wrote—that those who bought afterwards are forbidden—does not mean they bought after the woman bought, for that is certainly permitted even if found later also at the seller's—for what is in the woman's hand we say it formed at her place by force of "here found, here it was"; and at the seller's we say perhaps they formed afterwards, etc.; rather, he means they bought after worms were found at the seller's, end quote. And behold, what he wrote—we say here found, here it was—see in the responsum Chavot Yair, siman 109, where he wrote there that in this we do not say here found, here it was, because specifically regarding something that comes from elsewhere we say so. And see in the responsum Tiferet Tzvi, Chelek Dalet, siman 6, where he wrote that certainly the correct view is with Chavot Yair in this, for so is proven from the case of a woman who becomes impure retroactively even though she goes from place to place—see there. Chavot Yair further wrote there that ordinary vessels designated for flour—dry flour sticks to them—therefore they can attribute it to that; and even if the woman said it was clean, other women can say to her: we do not believe you—see there. And see in Av Beit HaTurim further: and Pri Chadash argues, etc.; see in the responsum Chinuch Beit Yehuda, siman 49, who also argues on the Taz and forbids even what was bought before the milvei was known; and he wrote that so ruled the sages of Poznan (and per Peri Megadim, one who rules to permit in private need and Simchat Yom Tov—one need not protest); and see there in siman 57 in the middle of the responsum, where he wrote there that specifically if it was only a short hour—for it is far from reason to say that in a short hour they formed; but in our case of four days from erev Shabbat until Monday they all agree to the Taz that one can say they formed in the interim and at the time of baking they were not yet there (and it appears that what he cited—four days separates—is because the case was so; but otherwise even in half an hour or less we attribute that they formed afterwards; and so in the responsum Chavot Yair, siman 29, that all agree to the Taz when there is a time gap of six or seven hours between, and certainly a whole night—see there). And he further wrote in the responsum Chinuch Beit Yehuda there: regarding a thing where several households bought from one man dried fruits, and three women who bought inspected and each found only one—or do we say to combine all three together and it becomes established with worms—it appears that since one can say they grew in the buyers' homes, therefore if no more are found after inspecting well in sunlight we do not establish prohibition; but after three are found, since they are already established as forbidden at the buyer's, further inspection and washing do not help, for one's sense attests that cleaning cannot succeed—and especially dried fruits that have cracks and the worms are small, so visual sense tires to look at them except with great effort, and they have no remedy except to sell them little by little to a gentile (and per what was written above, s.k. 3, it is forbidden to do so); nevertheless, a baal nefesh should be stringent for himself since three were found, and it is possible it was already so at the seller's—see there. And see further in Av Beit HaTurim in the name of Lechem HaPanim to permit yeast of new grain. See in Sefer Nachalat Azriel on Chullin 122, where he rejected his proof.`,
  },
  {
    file: "siman_084/pitchei-teshuva/part-001.txt", slug: "pitchei-teshuva", seif: "8", marker: "_",
    en: `That ants fell into them. See in the responsum Teshuvah Me'ahavah, part 1, siman 94, where they asked about preserved fruits that became wormy—milvein formed in them; and the preserve is fruits pickled in vinegar and honey, and the fruits float in the liquid. And it is clear that water sheratzim—even though they separate on the interior walls of the vessel from inside—are permitted; but fruits that became wormy, if they separated on the interior walls of the vessel from inside, are forbidden (Av Beit HaTurim at the beginning of s.k. 11). And in our case the matter is in safeik whether the sheratzim formed from the liquid or from the fruits; and even if it is clarified that the sheratzim formed from the liquid, nevertheless when they separate onto the fruits perhaps that is not their majority, as Pri Chadash wrote, s.k. 32—a loaf in water that has sheratzim—the bread is forbidden even though separating on vessel walls is permitted; nevertheless, when separating onto flour it is forbidden. And the sage who asked raised to be lenient: even if they became wormy from the fruit, since the fruit is in water it is a water sheretz; and the second concern also does not exist—for we do not hold like Pri Chadash, that there they separate entirely from the water onto the flour; but here the fruits are moist and liquid adheres to them. And the author agreed with him that if they crawl on the fruits there is no concern; and regarding the question he raised to be stringent—see there at length.`,
  },
  {
    file: "siman_084/pitchei-teshuva/part-001.txt", slug: "pitchei-teshuva", seif: "9", marker: "_",
    en: `There is room to question. See in the responsum of the Radbaz, part 2, siman 492, that his view on this is to permit—see there.`,
  },
  {
    file: "siman_084/rabbi-akiva-eiger-yd/part-001.txt", slug: "rabbi-akiva-eiger-yd", seif: "1", marker: "_",
    en: `(Siman 84, Taz, s.k. 12) If there are small milvein there. In the responsum of the Beit Yosef, siman 56, he wrote as follows: consider for yourself—if milvein are found and afterwards even if no more are found, is it permitted? End quote.`,
  },
  {
    file: "siman_084/rabbi-akiva-eiger-yd/part-001.txt", slug: "rabbi-akiva-eiger-yd", seif: "2", marker: "_",
    en: `(Shach, s.k. 30) The fruit, etc., and requires sixty—for it is a davar davuk prohibition; even though it is not literally attached, nevertheless since it always rests there it is called attached. Menachem Meshiv, ot 27.`,
  },
  {
    file: "siman_084/rabbi-akiva-eiger-yd/part-001.txt", slug: "rabbi-akiva-eiger-yd", seif: "3", marker: "_",
    en: `(Taz, s.k. 17) That here there is only one safeik—that it dissolved. And in the responsum Bach, part 2, siman 63, he permits from the reason of safeik safeik—safeik that it did not separate into the dough, and safeik that it dissolved and is nullified in sixty; and even if it is still dough—see there.`,
  },
  {
    file: "siman_084/rabbi-akiva-eiger-yd/part-001.txt", slug: "rabbi-akiva-eiger-yd", seif: "4", marker: "_",
    en: `(Shach, s.k. 40) Since it is a safeik whether any will mix in. See in Peri Megadim on the Shach (siman 99, s.k. 7) and in his book Eshel Avraham (siman 467, s.k. 4).`,
  },
  {
    file: "siman_084/rabbi-akiva-eiger-yd/part-001.txt", slug: "rabbi-akiva-eiger-yd", seif: "5", marker: "_",
    en: `(Seif 16) And those found in fish in their intestines are forbidden. In Menachem Meshiv, beginning of klal 47, it appears he had a girsa in the Shach: in their intestines or in their brains.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "1", marker: "א",
    en: `In water in vessels. And the same applies to other liquids in vessels, as the Tur and Mechaber wrote in seif 3; and so too the Rambam and Hagahot Maimoniyot in the name of Semag, and the Beit Yosef brings them; and so is clear in the other poskim—and it is straightforward.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "1", marker: "ב",
    en: `And in pits, ditches, etc. Rashi and the Ran, perek Shor HaNagach (50b): a bor is round; a shich is long and narrow; a me'arah is square and covered with a roof and has an opening; charitzin are wide and square like a me'arah and are not roofed; neitzin are short below and wide above. And it appears that here regarding sheratzim we derive nothing from this distinction; rather, the prohibition of charitzin is that they draw water, as the Tur and Mechaber wrote in seif 2—meaning that the water in them has an outlet and inlet, unlike pits; and as is stated at the beginning of perek Eilu Treifot: I include pits, ditches, and caves, which are confined like vessels; and I exclude charitzin and neitzin, which are not confined like vessels. And Rashi and the Ran explained that they are confined—that they have no outlet and inlet; and so is explicit in Terumat HaDeshen, the short version, end of folio 25, as written there.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "1", marker: "ג",
    en: `Therefore one ducks and drinks from them and need not worry, etc. It implies that even because of lo teshaktzu there is no concern; and so wrote the Ra'ah in Sefer HaChinuch, mitzvah 163, in explanation. And even though above, siman 13, the Rambam wrote that even pure fish are forbidden to eat alive because of lo teshaktzu—here it is different, since his intent is only to drink the water, and they are also not visible.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "1", marker: "ד",
    en: `But it is forbidden to draw in a vessel, etc.—for perhaps they separated on the interior walls of the vessel; for specifically on the lip of the vessel they are not common to separate, but on the interior walls of the vessel from inside they are common to separate and are forbidden, since from their beginning they were in a pit. Specifically when they separated with the liquid from vessel to vessel it is permitted—even if they afterwards separated on the walls of the second vessel—as will be explained in seif 3; that is, their majority is to be with the liquid in the vessel; and therefore the second vessel has the law of the first vessel, unlike here where they were initially in a pit. And accordingly, what he wrote "but it is forbidden to draw," etc.—applies only to pits, ditches, and caves; but it is permitted to draw in a small vessel from a large vessel, for even if they afterwards separate in the second vessel they are permitted. And it is clear in the words of the Rosh there that if one drew from the pit—even though we do not know with certainty that they separated—they are forbidden because we are concerned lest they separated; and so is implied explicitly in Orchot Chaim there—not like the Eitan Tzvi, who wrote in s.k. 6: but one who draws water from the pit into a vessel, and they separated on the walls of the vessel—even from inside—are forbidden, end quote. It implies specifically when we know with certainty that they separated they are forbidden; and therefore he also did not write that it is forbidden to draw ab initio in a vessel to drink from them—and this is certainly not so. Nevertheless, there is room to justify his words somewhat: what he wrote "and they separated" means that presumably they separated; and see in s.k. 10.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "1", marker: "ה",
    en: `To draw in a vessel. And the Kol Bo wrote in siman 101 (folio 113a) that the same applies—taking from the water by hand is forbidden—end quote.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "1", marker: "ו",
    en: `Such as behind the pit or on the lip of the vessel. So too in the Tur; and the language is not corrected. And in Tehilla l'David for the Rashba it is written: behind the vessel, or on the lip of the pit—and that is corrected. Nevertheless, it appears that sometimes a vessel is found whose lip is wide, and one need not worry lest they separated onto its lip. And one explains in the filtering in seif 3 that they commonly separate onto the strainer—and this is difficult.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "1", marker: "ז",
    en: `Except on the wall of the vessel. The same applies to the wall of the pit from inside; and so too the Rambam, Rashba, and Orchot Chaim—and it is straightforward.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "14", marker: "א",
    en: `Wormy wheat, etc. And in the gloss of Shad, brought by the Beit Yosef, he wrote: and I heard that the Av Beit Medrash did such a deed—that wheat became wormy, and he ordered them to be taken to the Donau river and thrown into it; and he did not want to permit selling them to a gentile, lest he bake bread and sell it to a Jew. Responsum of R' Chaim Cohen, end quote. And the Beit Yosef concluded: and so he received from Mahariv from Maharash; and so he brought in Tur Choshen Mishpat there from Muharam; and so in the responsum of Meimoni and in Orchot Chaim in the name of Maharam. And it is strained to say that Maharai argues against all those rabbis; and moreover, if so we could not rely on him to permit. And it appears to distinguish: those poskim deal when they are wormy in majority in a case where it is impossible to clarify them—then certainly we do not rely on those sides that Maharai found to permit; for even Maharai did not permit except in a case where they clarify before grinding, as is clear from his words in Tehilla l'David and in the gloss of Shad explicitly—for then, since there is only concern that there are still worms there, we rely on those reasons; but not when worms are found in majority in a case where it is impossible to clarify them. And so Maharshal distinguished explicitly in Peri Etz Chaim, siman 125—see there.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "14", marker: "ב",
    en: `It is permitted to grind them. For it is not the usual way that worms are ground—for when they pour the wheat into the hopper, every hole before them that they can exit—they stir and flee outside through the walls of the hopper because of the noise and shaking of the millstones, end quote—Terumat HaDeshen. And accordingly, in a mill that has no hopper—such as a hand mill—it would be forbidden; except that he afterwards wrote there to permit for another reason—that even if the worms are ground they are nullified in sixty within the flour; and this is not nullifying prohibition lechatchilah, since it is a safeik whether any prohibition will mix in at all, and he also does not intend to nullify, end quote. And accordingly, in every mill it is permitted; and so is implied from the words of the Mechaber. But it appears that where it is possible to grind in a large mill that has a hopper, one should not grind them in another mill.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "16", marker: "א",
    en: `Whether they, etc. Because regarding an animal, the matter depends on shechitah; and perhaps they grew inside before it was slaughtered, or they come from the prohibition of eiver min hachai; and the shechitah of the animal does not help them, for they have independent life. And even though a fetus is permitted through its mother's shechitah—above, siman 13—there it is derived from "from all the animal you may eat"; but here they remain in their prohibition. Rashi:`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "16", marker: "ד",
    en: `According to those who permit. Meaning, according to those who permit meat after shechitah—to exclude one who forbids. And what he wrote "and it" explained as dead—above, seif 4, he brought: some forbid even if explained as dead—that is because the view of those who permit is primary in his eyes, as written in siman 13, s.k. 12—see there.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "16", marker: "ה",
    en: `Even though they jump back and forth on the cheese. Not specifically—but the same applies in a bowl; and so in the words of Maharai there; and so is written in Darkei Moshe and in Tur Choshen Mishpat, klal 47, dalet bet explicitly—that in a bowl they are permitted; but if they separated onto the table they are forbidden because of marit ayin. And so Maharshal, Peri Etz Chaim, siman 104. However, it appears from the words of Maharshal there that even if they separated onto the table they are permitted—see there; and examine, for they did not practice thus. But in a bowl they are certainly permitted, for thus is their majority—to separate in a bowl and return—not as implied in the Eitan Tzvi that in a bowl it is forbidden; and so is the practice.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "16", marker: "ו",
    en: `They do not forbid the food. And sixty against them is not required—Orchot Chaim there. However, it appears that a majority against them is required; and see above, siman 103, seif 2.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "17", marker: "_",
    en: `A sheretz that was burned, etc. See above, siman 155, and in what is written there:`,
  },
];

for (const t of TRANSLATIONS) {
  patchBlockFile(path.join(OUT, t.file), { slug: t.slug, seif: t.seif, marker: t.marker }, t.en);
  console.log("patched", t.file, t.slug, t.seif, t.marker);
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
console.log("Queue synced");
