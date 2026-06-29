#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [
    `mishnah-berurah:2:ה`,
    `(12) That they pray eighteen — and the same applies to the entire prayer formula like any other person; and Lechem Chamudos wrote that likewise they are permitted to go to the synagogue to pray with ten; and see in Magen Avraham that this is specifically in a place where homeowners are not accustomed to mind this; nevertheless they do not go down before the ark — so Peri Megadim; and in Peri Chadash it is stated that nowadays they also go down before the ark; and it appears one should not be stringent if thereby the time will not be delayed more.`,
  ],
  [
    `mishnah-berurah:3:א`,
    `(13) An animal and bandits, etc. — meaning because then his mind is not settled at all; and therefore they exempted him then from praying, even the short Havineinu prayer.`,
  ],
  [
    `mishnah-berurah:3:ב`,
    `(14) He returns and prays — meaning if its time has not yet passed.`,
  ],
  [
    `mishnah-berurah:3:ג`,
    `(15) To pray completely — meaning even though he prayed the short prayer, it is as if it does not exist regarding the essence of the mitzvah of prayer, and he is obligated to complete it in the adjacent prayer, as above in siman 108; and this is specifically if what he did not return and pray was unwitting — he did not know he was obligated to return and pray, or due to forgetfulness, or the time expired on the road and he could not pray when he came home; but if intentionally he did not pray, behold it is corrupted and he cannot repair it; and if the time of two prayers passed on the road and he needed to pray a short prayer, there is no makeup for the first prayer.`,
  ],
  [
    `mishnah-berurah:4:א`,
    `(16) One who sets out on the road — this seif refers even after he already prayed Shemoneh Esrei.`,
  ],
  [
    `mishnah-berurah:4:ב`,
    `(17) For peace — one who parts from his fellow should not say to him 'go in peace' but 'go to peace'; and when parting from the dead he says 'in peace' and not 'to peace.' And the reason — see at the end of Berachos in Beit Yosef in HaKotev and in Maharsha.`,
  ],
  [
    `mishnah-berurah:4:ג`,
    `(18) And it is required — and b'dieved he fulfilled even if he said the entire formula in singular language.`,
  ],
  [
    `mishnah-berurah:4:ד`,
    `(19) To say it, etc. — meaning the entire formula of Tefilat HaDerech, for through this his prayer is heard more. And in the name of Sefer HaKanah they wrote that the word 'v'tenini l'chen' one says in singular language.`,
  ],
  [
    `mishnah-berurah:4:ה`,
    `(20) In plural language — and specifically in the fixed prayer for the many; but when a person wishes to request some request for himself, he need not pray in plural language. And he should engage in Torah on the road; and they already said: one who walks on the road and turns his heart to idleness is liable for his life; but he should not delve in halachah, lest he become distracted [Ta'anit 10b]. And Magen Avraham wrote, and it is possible that one sitting in a wagon while another leads the horses — it is permitted even to delve. It further appears in the Gemara that one who walks on the road must starve himself a little, for satiety is then hard on the intestines because of the exertion of the road. And every person should beware to have bread, even if he goes in a nearby place and in a place where bread is common — for many times incidents occur on the road; and it is proper for every God-fearing person at the time of his setting out on the road to take his tallit and tefillin with him, even if he travels to a nearby place and intends to return today, lest some incident occur and he be prevented from the mitzvah. And in our many sins there are travelers who do not take even tefillin with them and rely that on the road they will ask from others — and their punishment is great, for many times it happens that through this they omit Keriat Shema and prayer when they wait until it becomes available for them. Moreover, they take tefillin from what comes to hand and are not careful whether the head knot is according to their size or not.`,
  ],
  [
    `mishnah-berurah:4:ו`,
    `(21) And if possible — such as when the company waits.`,
  ],
  [
    `mishnah-berurah:4:ז`,
    `(22) He should stand from walking — but if the delay of standing would disturb him, it is permitted to say it while walking or while seated.`,
  ],
]);

function apply(file, map) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.slug}:${b.seif}:${b.marker}`;
      const en = map.get(key);
      if (en) {
        n++;
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  return n;
}

console.log(apply("output/siman_110/mishnah-berurah/part-001.txt", fixes));
