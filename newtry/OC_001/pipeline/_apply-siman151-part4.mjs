#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_151/mishnah-berurah/part-001.txt": {
    "1:ה":
      "(5) They are permitted, etc. — and likewise, if the people of the city needed temporarily to feed poor guests in them or to lodge them there, it is permitted; but this is specifically in synagogues in chutz laaretz; and some forbid even this; and it appears that in a pressing situation one should not be stringent about this.",
    "1:ו":
      "(6) To eat and drink — and likewise to sleep, which is permitted; but to make kapandria, or to enter them in heat on account of heat, and in rains on account of rains, and all those listed below — and all the more so jesting, mockery, and idle conversation — are forbidden; for are Torah scholars not warned about awe of the Temple?",
    "1:ז":
      "(7) From pressing need — meaning there was a pressing place for students and they needed to eat there; and Magen Avraham wrote regarding people who learn there regularly forever: the time of pressing need is when if he had to go to eat and drink in his home he would certainly be interrupted from his study; but if they do not learn in the synagogue and beit midrash, they are forbidden to eat and drink there; and several acharonim agreed.",
    "12:ב":
      "(40) There is room to doubt — whether to compare it to the upper chambers of the ezra that were not sanctified, or since in a beit haknesset and beit midrash it is called a small mikdash, one should compare it to the upper chambers of the Heichal, for we hold that they were sanctified with the holiness of the Heichal. And per what is written in responsa in the name of the responsum Pe'er HaDor, one may be lenient except regarding the place above the Heichal (meaning the ark where the sefer Torah rests) — there one must beware not to make use of it.",
    "12:ג":
      "(41) But a house that one dedicated, etc. — and it appears all the more so if at the time the beit haknesset was built a residence was built above it, that it is permitted to dwell there, for this was certainly not dedicated at all above; and nevertheless, to use it for a use that is very disgraceful, such as filth and the like, it appears forbidden in every case; and therefore one should not do so at all in a beit haknesset if in the residence above it there is such a disgraceful thing [Taz]; and see there that he wrote that many were punished for this. And what is the custom of the world in towns that they rent synagogues for a time in lower houses and above them a residence where babies and a repulsive thing are commonly found — possibly because it is for a time we are not concerned about this.",
    "12:ד":
      "(42) To lie upon it — and nevertheless one who guards his soul should distance himself from them, and especially in a place that is opposite the Heichal.",
    "2:_":
      "(14) For his need — but if he dedicated a house for the need of the many to learn in it, even if they do not pray there at all, it has the holiness of a beit midrash; and see below siman 153, seif 8, regarding a beit haknesset; and the same applies regarding this matter.",
    "3:א":
      "(15) One does not sleep, etc. — and it speaks of ordinary people; but for a Torah scholar who learns there, we already explained in s.k. 6 that it is permitted.",
    "3:ב":
      "(16) But in a beit midrash it is permitted — meaning temporary sleep; and see in the novellae of Raavad, who doubts this permission; and it is possible that since a beit midrash is made for staying there a long time to learn and hear words of Torah, and it is hard to beware of temporary sleep — therefore they did not forbid this for any person. And for a Torah scholar who learns there regularly, it is permitted even fixed sleep [as is implied in Levush].",
  },
  "output/siman_151/peri-megadim/part-001.txt": {
    "3:א": "And they should strive — Taz in siman 153 [makes] a distinction between a beit haknesset of cities or villages — see there.",
    "3:ב":
      "And what is written: one who demolishes a stone, etc. — behold in siman 152 it is not explained specifically for filling; and I answered there, oth 7 in siman 152; and in truth Rambam, chapter 1 of Laws of the Chosen House, halachah 17, and chapter 6 of Laws of the Foundations of the Torah, halachah 7, wrote that demolishing is specifically in the manner of destruction; and see Raavad, parashat Re'eh — it appears so. However it is difficult, for it is one warning (Deuteronomy 12:4): erasing the Name and demolishing a stone; and just as erasing is forbidden even to repair, as is explained in Yoreh Deah 276 in Shach — likewise demolishing; and Kesef Mishneh there in Laws of the Chosen House, halachah 17, explained destruction — if so, demolishing to repair is permitted; if so, demolishing and it remains thus, even though it is not in the manner of destruction — one may say it is forbidden, for there is a great reason between erasing the Name, which is forbidden even to repair, which is not so regarding demolishing to repair: if he does not repair, it will fall — plainly it is permitted; only demolishing not to build, but that it remain thus and he have some benefit — as Taz said, it is forbidden; perforce he must insert hollow iron in the wall and lean on it, as stated above.",
    "3:ג":
      "And know that Maharam of Padua, siman 65, wrote one view that it is forbidden to hammer specifically [into something] attached — see there; and as it appears, he wrote it out of doubt; and Magen Avraham in siman 152, oth 6, brought it for halachic ruling; and it requires study, for one who burns wood of hekdesh is lashed even though it is detached, as Rambam wrote, chapter 6 of Laws of the Foundations of the Torah, halachah 7; and so in Makkot 22a: one who burns wood of hekdesh — and its warning: \"and their asherot you shall burn\" — you shall not do, etc.; even detached is forbidden. And it is strained to distinguish between asherah, where presumably they burn detached, and say that regarding demolishing too, even a detached stone that one demolishes in the manner of destruction is lashed. And behold one who cooks with wood of hekdesh for secular food is lashed, even though he does not act in the manner of destruction, but only benefits that he cooked with it — all who destroy wood of hekdesh is forbidden; and it is possible that even if he pays to hekdesh he is lashed; and so is the plain meaning of the language; if so, the same applies to a stand that one makes for his need — even though for the need of prayer he makes it; see Tosafot Makkot there, s.v. ella, who wrote that it is considered only prohibitions that apply with less than the value of a perutah; and see Rambam, chapter 1 of Laws of Meilah: one who benefits with a perutah is lashed.",
    "4:א":
      "But — Taz: a stipulation helps for this; and it is possible even in Eretz Yisrael, where a stipulation does not help; nevertheless one may say regarding a Heichal that was built at first without stipulation; and Magen Avraham, oth 17.",
    "4:ב":
      "If to say \"refuah\" in a beit haknesset — see Yoreh Deah, Rama siman 17; Taz and Shach there; and I answered here. And regarding the house of Rabban Gamliel they would not say \"marpei\" in a beit midrash on account of bittul beit midrash — they said to him: in a beit haknesset it is permitted; one may say in a beit midrash of the rabbis it is permitted l'chatchila; it teaches us that it is forbidden; and all the more so in a beit haknesset — see seif 1 in the name of Ran.",
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
