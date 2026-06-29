#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { patchBlockFile } from "../lib/patch-one-block.mjs";
import { parseBlocksInFile, serializeBlock } from "../../yd001_block_lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const QUEUE = path.join(ROOT, "pipeline/work/editorial-queue-siman-084-part3of4.json");

const TRANSLATIONS = [
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "8", marker: "א",
    en: `All kinds of fruits whose way is to become wormy while attached, etc. And in Asheri and Rashba it is stated that beans, lentils, and legumes are accustomed to become wormy while attached; however, in barley and Mordechai and in the words of Maharai in the gloss of Shad it is stated that legumes and the like are not accustomed to become wormy except when detached. And it appears that for this reason they rely nowadays that they are not accustomed to clarify legumes—even within a year they only place them in a cold pot and pour off everything that rises to the top, and cook the remainder in boiling water—even though Tur Choshen Mishpat ruled there dalet zayin that one should clarify them on the table; and Maharshal in Orach Chayyim and in Peri Etz Chaim, siman 100, was more stringent to clarify each one individually; but the public is lenient in this. And it is also possible that nowadays they are not accustomed to become wormy while attached—as Tur Choshen Mishpat wrote there, that this matter changes according to place and time. One who is stringent in this—good for him.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "8", marker: "ב",
    en: `Nevertheless, one must inspect them to discard, etc.—meaning, in those whose way is to become wormy: although one need not inspect inside since they waited twelve months and the worm inside decomposed and is like mere dust, nevertheless one must inspect them to discard worms found among them outside. But those fruits whose way is not to become wormy at all—certainly no inspection is required at all, even externally (and see Hagahot Maimoniyot, perek 2, s.v. im shehah).`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "8", marker: "ג",
    en: `And they stir in water, etc., or on top of, etc. This is the language of the Rosh and Tur, and they follow their reasoning that they hold: if it separated dead it is permitted. And the Mechaber also holds thus, as written in s.k. 12—see there. And that boiling does not help when placing them in boiling water—because they die and do not exit—is because we are not certain they all die immediately; rather, they exit alive. But when placing them initially in cold water, if so all the pierced ones ascend upward—thus even though there is concern lest some remained that did not ascend and have worms inside, nevertheless one may rely in such a case that they die immediately and do not separate at all. And the words of the Bach in siman 11 are strained on this—see there. Also the words of Perishah in seif 16 are ambiguous on this—see there. And especially what he wrote: and further we are concerned lest among them are some that separated and returned—for the Tur and Mechaber in seif 4 hold that we are not concerned for this, only clarification as I wrote. However, from the words of Sefer HaTerumah brought in Sha'arim and Mordechai, and from the words of Semag, negative commandment 132, folio 44a, it is implied explicitly that only boiling water is needed because they die immediately; and so the Ran explicitly—and the Beit Yosef did not bring them.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "8", marker: "ד",
    en: `Therefore, one who comes to cook after twelve months, etc. But within twelve months this remedy does not help—for perhaps not all wormy ones ascend upward, and they become forbidden immediately when placed in the dish—even if they did not separate—since their way is to become wormy while attached. And the Ran wrote that those that became wormy while attached—their nature is not to float upward like those that become wormy when detached.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "8", marker: "ה",
    en: `After twelve months, etc. And the Maggid wrote that from the words of the Rashba, Rambam, and Ramban it appears that after twelve months no inspection is required, for we are not concerned lest they separate at the time of cooking—see there. And the Beit Yosef did not bring this. And truly there is difficulty on the Maggid—for in the words of the Rashba in Terumat HaDeshen, the short version, end of sha'ar 3, house 3, it is proven explicitly that he holds that even after twelve months this remedy is required—see there; and the Beit Yosef brings it.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "8", marker: "ו",
    en: `Fruits that became wormy, etc. And Maharshal in Orach Chayyim and in his book there, siman 125, ruled that specifically in legumes and beans and the like this remedy helps; but in fruits that have pits inside—not so, for even when detached we are concerned lest they separated onto the pits; therefore boiling and clarification do not help them, end quote. And the view of the Rav in Tur Choshen Mishpat there appears like the Mechaber's view; and so is clear from the words of the Rosh and Tur explicitly—see there. And so is explained in the Ran—and we do not omit any posek to argue on this. And further, there are many safeiks here; examine, and see Perishah, seif 6, and understand.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "8", marker: "ז",
    en: `For it is a common minority. And anything common—we do not rely on inspecting the majority; and it is similar to inspecting the lung in siman 39, that it is a common minority, and we do not rely on the minority's inspection of the majority. And so the Rashba wrote there.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "9", marker: "א",
    en: `If one can inspect, etc. Thus wrote the Rashba: if one can inspect, he inspects; and if not, it appears to me it is permitted. To what is the matter similar? To a wolf that came and took the intestines of an animal—we establish it in presumption of permissibility (and as above, siman 36, seif 5). And further, here there are two safeiks: safeik whether there was stirring there or not; and if you say there was—perhaps it dissolved and was nullified. And even though they said a whole creature is not nullified (and as below, siman 100)—they said so only regarding a whole creature; but a crushed one is nullified. Therefore, anything that has two safeiks—even in Torah prohibition—we go to be lenient, end quote. And Orchot Chaim wrote there, end of law 3—and this means they were not established in general; but particular ones in a region that became established thus are vadai and not safeik, end quote. And so from the words of Maharam of Lublin in responsum 27—see there.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "9", marker: "ב",
    en: `For you have no fruit, etc. From stam matters it is implied that even in small fruits such as berries (called weikselin and kirschen) and the like there is sixty—even though there is not sixty against the fruit itself, nevertheless there is sixty against the taste of the worm, as Maharai wrote in the name of a great one—and he means the Rav wrote against the taste of the worm. And so in Tur Choshen Mishpat there—that is primary for the law; except he afterwards wrote one should be concerned for Maharai's words to practice stringency in the fruit itself; but if the dish also has other things besides the fruit, it is permitted for all if there is sixty against the worm, end quote. And Maharshal in Orach Chayyim and in his books there, siman 102, argued on the Rav and ruled: in a small fruit such as berries and the like, where there is not sixty against the worm—the fruit itself is a davar davuk and requires sixty against the entire fruit if there is concern it became wormy while attached even if it did not pierce outward, and when detached when it pierced outward. And so Sha'arim, siman 49, explicitly; and so Mordechai and Agudah, perek Eilu Treifot, in the name of Ravyah; and so in Terumat HaDeshen, siman 172, and in Agur, siman 1292; and so is implied in Orchot Chaim, klal 27; and so in Klal 36, law 12, explicitly; and so in Maharil. Also what the Rav wrote in Tur Choshen Mishpat there—that from the words of the Rashba and Tur it implies there is no distinction—is no proof at all, for they follow their reasoning that they do not hold chanan in other prohibitions, as below siman 92; and likewise in davar davuk everything combines, as above siman 72, s.k. 15; and therefore there is no distinction—for the entire pot combines. Also what he favored there to permit from the reason that below will be explained—that many say the taste of the worm does not forbid because it is spoiled, end quote—and he means that he brought at the end of klal 51 in the name of many poskim that the taste of a fly does not forbid, and it appears to the Rav that the same applies to the taste of a worm; and he equated them explicitly at the end of klal 51. And this is—for those who are lenient regarding a fly are the Rashba and Rokeach whom he brought there, and they themselves forbid regarding a worm—for the Rashba wrote, and the Tur brings, that they do not have so much that they forbid through their secretion; and Rokeach, siman 468, distinguishes explicitly between a fly and a worm in fruit. Also below, siman 107, will be explained that most forbid regarding a fly—see there.`,
  },
  {
    file: "siman_084/siftei-kohen/part-001.txt", slug: "siftei-kohen", seif: "9", marker: "ג",
    en: `And there are those who say, etc. It appears that this "and there are those who say" refers together with twelve months—for then even if they are inside the fruit they are forbidden; but after twelve months, where there is prohibition only when they separated, there is safeik safeik: safeik whether they separated alive or separated dead—which is permitted; and if you say they separated alive—perhaps they dissolved. And even though from the words of the Ran there it appears it refers also after twelve months—that is because he follows his reasoning that he holds separated dead is forbidden; but the view of the Mechaber and many poskim I brought above in s.k. 12 that separated dead is permitted. And even though I wrote there that regarding the worm itself that separated dead one should be stringent—nevertheless here one may permit the rest of the dish from the reason of safeik safeik, as I explained; and especially since from Sefer HaTerumah brought in Sha'arim and Mordechai it is implied explicitly that dead worms die immediately at the time of cooking before separating—and therefore he wrote that if many worms are found in a dish, everything is permitted—even the worms themselves—if that fruit is not accustomed to become wormy while attached—see there, end quote: one may be lenient here since there is no vadai prohibition, only concern lest there are more worms since it became established. However, certainly all this is regarding worms inside; but fruits whose way is to become wormy—even if their way is to become wormy when detached and it is usual for worms to be among them outside—then they are forbidden immediately when cooked without inspection, and afterwards if three or four are found in the dish, everything is forbidden—for here there is only one safeik of dissolution; specifically when one need only be concerned for worms inside may one permit from safeik safeik, as I wrote—and understand.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "1", marker: "א",
    en: `In the Tur it is written: and the Rambam permitted only in pits, etc.; and I have not found that the Rosh z"l wrote thus, end quote. It appears to explain the view of the Rambam and to resolve the language of the Tur—that he did not write "and I have not found" according to the first reasoning, because the Rambam also holds like the Tanna of the school of Rav; except he holds that the dispute between the Tanna of the school of Rav and the Tanna of the school of R' Yishmael is in this manner: even in charitzin that do not overflow but only draw and crawl—it is forbidden for everyone, and they argue only regarding charitzin that do not overflow and also do not draw—for per the school of Rav it would be like pits, and per the Tanna of the school of R' Yishmael it is forbidden since it is a large place and not similar to vessels, for there is no vessel so large; and even regarding a vessel we say in other places that if it holds more than forty se'ah of liquid it is nullified from the category of a vessel. And the Rambam ruled like the school of Rav, like the Rosh—and not as the Maggid Mishnah wrote, that the Rambam rules like the Tanna of the school of R' Yishmael. And this the Tur learned from the language of the Rambam, who wrote that they do not overflow—and behold they are confined like vessels—which is repetitive language; rather, certainly he teaches that even when they do not overflow there is prohibition like overflowing, as long as they crawl; and you have no heter except if they are confined. And truly, in charitzin too it is permitted in this manner—except that from here they said pits in this, because they are certainly confined, unlike charitzin which are not equal in this. And therefore the Tur concluded that the Rosh did not write thus—that charitzin that draw and crawl should be in this category like overflowing—but wrote simply regarding overflowing that they are forbidden. Also in the Ran it appears that the main abundance is that those that crawl are like overflowing. Even though they have no fin—for it is written "in seas and rivers," etc., we require specifically a fin, etc.; but in these we do not require.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "1", marker: "ב",
    en: `And he is not concerned, etc., if they happen upon him. In Orchot Chaim he wrote: and specifically when they are not repulsive to him; but if they are repulsive to him, or there is danger concern—the Rambam wrote at the end of Hilchot Rotze'ach that it is forbidden because of lo teshaktzu; and so Rabbenu Yerucham wrote in seif 16 below.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "1", marker: "ג",
    en: `But it is forbidden to draw, etc. In Asheri—the reason is that we are concerned lest they separated from the walls of the vessel; and see what is written in seif 3.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "1", marker: "ד",
    en: `On the wall of the vessel from inside—that is, their majority.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "13", marker: "_",
    en: `One heats it until it melts. And here there is no nullifying prohibition lechatchilah—for our intent is only to fix the honey; so too the Beit Yosef in the name of Avraham Chaim.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "14", marker: "א",
    en: `It is permitted to grind them—for the worms flee at the time of grinding from there to the walls of the hopper; and even if they are ground, behold they are nullified.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "14", marker: "ב",
    en: `And any worm one sees, etc. It appears that the reason the rest is permitted is that here there is safeik safeik: safeik there is none there; and if you say there is—safeik it dissolved at the time of baking. And here there is no nullifying prohibition lechatchilah—for our intent is only to bake the bread and not to nullify the worm—in my humble opinion.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "16", marker: "א",
    en: `In their intestines—they are forbidden; for they came from elsewhere and entered through its nostril while the fish was sleeping.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "16", marker: "ב",
    en: `Those growing in meat—for an animal becomes permitted through shechitah; and behold, worms that have independent life—and shechitah does not apply to them—remain in their prohibition. But fish do not require shechitah; therefore worms growing in them are also permitted, unless they came to them from elsewhere. And from here, those growing in meat after shechitah are also permitted.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "16", marker: "ג",
    en: `Lest they separated while alive—meaning, while the worms were still alive, those fell at the time of rinsing. And it is written in the Tur in the name of the Rosh on this: and it would have been proper to be concerned when placing the meat in a pot in cold water lest they separated to the walls of the pot; but they practiced to permit, end quote. The explanation: it would have been proper to compare them to worms of fruit above; and the reason of the custom to permit appears like what the Rama wrote nearby regarding cheese—that some permit them in every case, etc.—and this is the view of Ravyah in Mordechai whom the Beit Yosef brings, who wrote that there is no prohibition because of sheretz except in gidulei karka; and it is found that even if they separated completely they are permitted. And this is not as written in the Levush, that the reason those who permit in every case is that this is their majority—in Orchot Chaim and Darkei Moshe it is explained as I wrote; nevertheless, Orchot Chaim and Rama in cheese ruled to forbid when they separated completely—and this is because of marit ayin alone. And it appears the same applies to worms of meat—as with cheese; except that Maharshal wrote, Peri Etz Chaim, siman 104, after the words of Ravyah above, that anything coming from abundant fat or putrefaction has no name of sheretz at all—for it is sheretz only in gidulei karka or in drinking matters similar to water sheratzim. Nevertheless, specifically in cheese that come because of fat and not putrefaction—unlike meat, which is forbidden to eat even with good intent—nevertheless it is forbidden because of lo teshaktzu, end quote.`,
  },
  {
    file: "siman_084/turei-zahav/part-001.txt", slug: "turei-zahav", seif: "17", marker: "_",
    en: `A sheretz that was burned, etc. Maharshal cited in the name of a responsum of R' Yehuda regarding depression, that it is like a wound of a corpse; and it is permitted to feed him food containing a sheretz of fowl if the cure is known; and if not, it is forbidden. And if a gentile nullified the cure in sixty—it is permitted.`,
  },
];

for (const t of TRANSLATIONS) {
  patchBlockFile(path.join(OUT, t.file), { slug: t.slug, seif: t.seif, marker: t.marker }, t.en);
  console.log("patched", t.slug, t.seif, t.marker);
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
