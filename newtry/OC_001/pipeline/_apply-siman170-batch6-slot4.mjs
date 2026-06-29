#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "mishnah-berurah/part-001.txt": {
    "15:_": `(36) And he should not bite a slice etc.—seemingly we could learn this from what was said in seif 10 that even on the table is forbidden, how much more to place before his fellow or in a bowl; but in truth we read here from a slice [and so in tractate Derech Eretz and Rokeach]—meaning not the piece itself he held in his teeth, which one may not place even on the table as above in siman 151, rather the piece remaining that he bit from with his teeth some slice—even this piece he may not place before his fellow to eat or in a bowl [Acharonim and Perishah].`,
    "16:_": `(37) And he gives to his fellow etc.—lest from shame his fellow accept from him and drink against his will; and perhaps his fellow is disgusted drinking from what this one left, for perhaps saliva mixed there and he becomes ill thereby; therefore specifically if he gives into his hand; but if he places before him and he takes himself we have no concern. Taz wrote: I saw in the exegesis of R' Eliezer haGadol who warns greatly not to drink from what his fellow left, lest he has illness in his body and breath emerged from his mouth to that remainder, see there; and see below siman 182 that wiping the place of mouth kiss or with water when pouring a little through that place one drank in his mouth helps; and seemingly contradicts R' Eliezer haGadol; and perhaps R' Eliezer haGadol speaks when the first who drank was a person we do not know if he is healthy, then more concern [Acharonim]; see Peri Megadim.`,
    "21:_": `(43) Although etc.—for presumably they agreed he should eat with them a little of theirs so they have zimun thereby; and automatically if they eat something one does not make zimun on, he may not eat without permission. Acharonim wrote: possible the same if the eaters were nine [matter one makes zimun on], the tenth may also eat without permission, for presumably they are pleased so they have zimun with the Name.`,
  },
  "peri-megadim/part-001.txt": {
    "2:א": `(1) Per Taz on seif 2—Rashi Yoma for one who holds alone to drink alone we rule in knaf 66 he need not pour one hand. And Rosh in hagahah that after hamotzi no need washing for drink, and R' Yitzchak and Rashi—Rashi made as if halachah in a meal; but if Rosh meant no need only within the meal we fear lest he give a slice, after not; rather implies even not in a meal lest he forget and give slice to sweeten drink—need not fear this, see Perishah. And implies even if main food and bread to sweeten without hamotzi, even so forbidden without netilat yadayim; and requires study for in knaf does not imply so, and siman 182 will be explained. Magen Avraham sign vav here.`,
    "2:ב": `(2) He wrote in Tikkunei Shabbat house six gate five: one who is fastidious (istenis) permitted to wash outside, and so in gemara bread arnabei etc., and in gemara there and returns the towel to guests as Rashi, and why did poskim omit.`,
    "7:_": `But Taz in Darkhei Moshe explained: when says to fellow come eat with me and fears lest refuse, says what do you want I will eat with you—that he appears to say so lest refuse him, not that repayment comes—permitted, see there; and if so difficult what Taz wrote.`,
    "10:א": `(1) Although Taz—and if there are nine and servant, seemingly he may eat without taking permission so they can bless the Name; and possible zimun blessing is different, and will be explained siman 183. Again I saw Acharonim sign 24 noted this.`,
    "10:ב": `(2) See Acharonim sign 23-24 he cited many good things in his good pure-minded way, even festive meal, and so Taz. Shlah: all who eat much eating transgresses three negative commandments: guard yourself, lest you forget, do not make yourselves detestable; shall not eat and drink standing, nor stand immediately and drink measure of final blessing in hamotzi like three hundred people; mind mixed with creatures shall not cry among rejoicers etc. Shlah wrote or explanation (shoyam) meaning fermented in barrel, not what rises when poured in vessel; nevertheless caution also from liquids left exposed wine water milk though nowadays permitted, guard of soul keep distant, see there several good things.`,
    "10:ג": `(3) That which Mechaber wrote seif 2 after you drank and wine remains etc., see Levush explanation speaking when not fastidious, and seif 7 speaks when fellow fastidious, as Magen Avraham sign 8 from this.`,
  },
};

const base = "output/siman_170";
let total = 0;
for (const [rel, fixes] of Object.entries(files)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (fixes[key]) return { ...b, en: fixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(fixes).length;
}
console.log("fixed", total);
