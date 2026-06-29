#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_151/machatzit-hashekel/part-001.txt": {
    "5:_": "(s.k. 5) To spit, etc. — rather, with bread and legumes it implies that a large meal is forbidden.",
    "7:א":
      "(s.k. 7) Permitted, etc. — this is from the language of Rambam; but not as, etc. — meaning: for Rambam it is not difficult, since the mishnah teaches in the middle: if he did not enter in it at first to shorten, it is permitted; if so, the latter clause — if he entered in it to pray — comes by a fortiori; and if so, the latter clause is unnecessary; for Rambam in truth did not copy the middle clause.",
    "7:ב":
      "And Tur wrote regarding one who enters to pray: it is a mitzvah, etc.; and if so, the latter clause is needed: in the middle it is permitted; in the latter clause, even a mitzvah applies.",
    "7:ג":
      "And it is possible that it is a scribal error, etc.; and if so, it is not necessary that when he enters to pray, even if he also intends to shorten his way, it is permitted.",
    "7:ד":
      "From what is written: a mitzvah to make kapandria — Ran wrote in Megillah the reason: through this he shows that the matter of the synagogue is dear to him, and he thereby traverses all of it.",
  },
  "output/siman_151/magen-avraham/part-001.txt": {
    "1:א":
      "Lightheadedness — and on account of this synagogues are turned into a house of idolatry, God forbid [Semak]; it is forbidden to slaughter in a beit haknesset [Mabit, volume 3, chapter 4].",
    "1:ב":
      "From pressing need — this that is stated in the Gemara: Rav Ada and Ravina were standing and learning; the rain of the rainy season came; they entered a synagogue. They said: it is not on account of the rain, but because a derashah requires shade. It implies that on account of rain it is forbidden; and this is because rain is not considered so much of a pressing need, for many people walk in the market during rains [Beit Yosef]. And it appears to us that specifically eating and drinking is permitted in a beit haknesset because they learn in a beit haknesset, as is implied in the Gemara; and all the more so in a beit midrash; and therefore Torah scholars are permitted to eat and drink there — for if they had to go each time to eat and drink in their homes, they would be interrupted from their study. But if they do not learn in a beit haknesset, they are forbidden to eat and drink there, as Ran wrote: are Torah scholars not warned about awe of the Temple; and so Rambam wrote: they are permitted to eat and drink from pressing need; and so is the simple understanding; and so is implied in hints, and these are his words: in a beit haknesset one does not eat, etc., and Torah scholars and their students are permitted; and one does not enter them in heat on account of the heat, and in rains on account of the rains — until here. It implies that this — even for Torah scholars — is forbidden; and eating and drinking is permitted for Torah scholars per the plain sense; and so in Yerushalmi: a Torah scholar is permitted to lodge in a beit haknesset; and so is implied in Tur, who wrote: Torah scholars are permitted to eat and drink — it implies that the other matters are forbidden, as stated above; and so in Mahariu — see there; and also Hagahot agrees to this, except that he holds that a beit haknesset in Babylonia is made conditional, and it is permitted even in their settlement for every person; study Bach there, and you will forget the words of one who strained; if so, there is no dispute at all.",
    "1:ג":
      "For some — when a relative of the gadol died, such as Rafram, who eulogized his daughter-in-law in a beit haknesset: the Ari was very careful not to speak in a beit haknesset except his prayer; and even a matter of mussar and repentance he did not speak, lest mundane speech extend from him [Hakavvanot].",
    "10:_": "After they were destroyed — even in chutz laaretz [Rabbi Yosef ibn Rav, daf 25].",
    "11:א":
      "They stipulated upon it — it implies specifically when they stipulated explicitly; but by default we do not say they are made conditional; for specifically in Babylonia it was thus, but not in other lands; and so in Tur and Mordechai; also Rambam omitted this law that a beit haknesset in Babylonia is made conditional, because he holds that specifically in Babylonia it was thus in their time; and so is implied from what is stated at the end of this seif in the name of Rabbi Yosef ibn Rav; and so in Shulchan Gavoah, daf 265, in the name of Riaz: specifically guests are permitted. And it is puzzling in my eyes on the responsum of Mishnah Berurah who wrote that this law applies to our beit haknesset; and see above, seif 1, in the name of Hagahot — it implies somewhat as his words; nevertheless it is not necessary.",
  },
  "output/siman_151/mechaber/part-001.txt": {
    "7:main":
      "One may spit in it, provided that he rubs it with his feet, or that there are reeds there so that if he spits into them it will not be visible.",
    "8:main":
      "Mud that is on one's feet — it is fitting to wipe it off before entering to pray; and it is fitting that there not be on him or on his garments any filth.",
    "9:main":
      "They treat them with honor — to honor them and to sprinkle water on the ground. {Rama: \"to honor them\" means to clean the house; \"to sprinkle\" means to throw water on the face of the ground.} And the custom is to kindle lights in them to honor them.",
  },
  "output/siman_151/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) Lightheadedness — because they are called a small mikdash, as it is written: \"and I was to them for a small sanctuary.\" And regarding the Mikdash it is written: \"and My mikdash you shall fear,\" that there should be awe of the One Who dwells in it upon him. And Semak wrote that on account of lightheadedness in a beit haknesset they are turned into a house of profanity, God forbid.",
    "1:ב":
      "(2) And idle conversation — meaning even mundane conversation that is for the sake of livelihood: outside it is permitted, in a beit haknesset it is forbidden; and especially completely idle conversation, which certainly one should always prevent [Peri Megadim]. And in Zohar, parashat Vayakhel, he greatly exaggerated the magnitude of this sin; and all the more so one must beware in a beit haknesset and beit midrash from prohibited speech, such as lashon hara, talebearing, dispute, and quarrels — for apart from their being very severe sins, the sin grows greater in a holy place, for one treats lightly the honor of the Shechinah; and one who sins between himself and himself is not comparable to one who sins in the palace of a king before the king. And further, the evil grows in this: that he also causes the many to stumble in the severe sins mentioned, for this merchant is like blood alone — and at first the sin began with some people, and in the end groups and groups gather to fight one person against his fellow until the entire beit haknesset becomes like a great bonfire; and, God forbid, from this come many times to insults and curses and public humiliation [and also many times before a sefer Torah — this too is a severe sin in itself, for even one who insults his fellow before a Torah scholar — they said [Sanhedrin, chapter Chelek] that he is an apikoros and has no share in the World to Come; and all the more so one who insults his fellow before a sefer Torah and the honor of the Shechinah, as Mahariu wrote similarly in his responsum siman 152 — see there]; and to blows and informers; and great desecration of God's Name among the nations. And who caused all this if not the first who began the transgression first; and certainly in the future to come he will receive reward against all of them. Therefore one who fears and trembles at the word of God should always set his eyes and heart on this — not to speak any idle words in a beit haknesset and beit midrash; and this place should be unique for him only for Torah and prayer.",
    "1:ג": "(3) And one does not eat, etc. — and likewise one does not do any melacha in them.",
    "1:ד":
      "(4) On account of heat, etc. — and it does not help that he read or sleep a little upon his entry, as below, since he can enter a profane house to escape the heat and rains; unless he was previously engaged in some halachic matter outside and rains began to fall — then it is permitted for him to enter a beit midrash so that the rains not disturb him.",
  },
};

for (const [file, blockFixes] of Object.entries(fixes)) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        return { ...b, en: blockFixes[key] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  console.log(file, n);
}
