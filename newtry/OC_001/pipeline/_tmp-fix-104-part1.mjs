#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [
    `magen-avraham:1:_`,
    `King [gentile]. And he fears lest they kill him; but because of monetary loss he need not interrupt — siman 108, seif 8, and see what we wrote siman 92, seif 2; and if he must interrupt in a place of danger, rabbinic law siman 157; and in the Tur the story of the chasid with the governor — it must be that he was sure they would accept his answer.`,
  ],
  [
    `magen-avraham:2:_`,
    `Unless he is in supplications. For it is stated in the Gemara that R. Akiva [prayed] with many bows and prostrations in supplications — a person leaves him in this corner and finds him in another corner; and so is the custom widespread to uproot [oneself] for saying supplications. And it appears to me that without need it is forbidden to move from his place until he takes three steps, as stated siman 123.`,
  ],
  [
    `magen-avraham:3:_`,
    `But he may walk. For we do not find walking called interruption anywhere (there); nevertheless without need it is forbidden, as stated seif 2.`,
  ],
  [
    `magen-avraham:4:_`,
    `Scorpion. It implies specifically where there is concern for danger to life, as stated in the name of Semag in siman 92.`,
  ],
  [
    `magen-avraham:5:_`,
    `To the beginning of the blessing. Some say [the same] for Keriat Shema when one asks of his welfare — as stated siman 66 that he returns to the place he paused, for prayer is stricter than Keriat Shema (Beit Yosef); and Abudraham siman 59, that when he was silent and erred he returns to the beginning of the blessing on the Name; and see in the responsum of the Rashba siman 35.`,
  ],
  [
    `magen-avraham:6:_`,
    `If he spoke. And in siman 114, seif 7, that if he spoke intentionally he returns to the beginning; and Bach — and it requires study: if he spoke intentionally in Keriat Shema what is the law? And it is possible to say he need not return to the beginning, as implied from the incident of Rabbi Avahu who was going in filthy alleys — see above; and one may answer that there he asked about Torah matters and it is not so severe; and possibly it is permitted l'chatchila; and nowadays since most of the world are not careful to speak during the blessings of Keriat Shema, possibly we judge them as unwitting, as the Taz wrote in Yoreh Deah siman 99 that one who says 'permitted' — he is unwitting; and see in Makkos chapter 2 and in the comment of the Rashba chapter 2 of Berachos — it appears that even if he spoke intentionally he need not return to the beginning; and possibly only when he spoke in words of Torah.`,
  ],
  [
    `magen-avraham:7:_`,
    `He should be silent. As they say in Berachos 33b — after 'baruch hu' he returns to his prayer — and siman 66, seif 3.`,
  ],
  [
    `magen-avraham:8:_`,
    `He does not interrupt. It appears this requires study — since he ruled that even in Keriat Shema one does not interrupt, as stated siman 66, seif 4, and siman 135, seif 5 — if so why need to make heard in prayer? Also in the responsum of the Rashba there it refers to Keriat Shema; and possibly in Keriat Shema, since some say one who acts according to their words is not called intentional, unlike in prayer where it is called intentional and he returns to the beginning.`,
  ],
  [
    `mishnah-berurah:1:א`,
    `(1) He shall not interrupt — and even a mere hint is forbidden; if not for a crying child, he is permitted to hint to him with his hands so that he be silent and they not disturb his prayer; and if it does not help, he should distance himself from him and not speak to him. And likewise a distinguished person standing in prayer and the prayer leader waits for him in saying Kaddish or Kedusha, and he is not pleased that they wait for him — and this disturbs his prayer — he is permitted to hint to the prayer leader that he pray in his usual manner [She'eilot uTeshuvot].`,
  ],
  [
    `mishnah-berurah:1:ב`,
    `(2) In his prayer — and even for monetary loss he need not interrupt. Chayei Adam wrote [klal 25, seif 9]: one standing in prayer and uncertain about some law how to pray — such as if he forgot something in the prayer — he is permitted to go from his place to a special place and look there in a book; and if it is permitted to ask the law — it requires study; and it appears to me it is permitted.`,
  ],
  [
    `mishnah-berurah:1:ג`,
    `(3) Idolater — and the same applies to general duress, and he fears lest they kill him.`,
  ],
  [
    `mishnah-berurah:1:ד`,
    `(4) Or if possible — and it is better to shorten when possible than to turn aside from the path [Bach and Eliyah Rabbah]; but Peri Megadim wrote one should settle this — for it appears walking for the sake of prayer is not an interruption.`,
  ],
  [
    `mishnah-berurah:1:ה`,
    `(5) And if it is impossible for him, he may interrupt — meaning he is permitted even to ask him of his welfare when he estimates that without this there could be danger; and all the more so he is permitted to answer him [Eliyah Rabbah].`,
  ],
  [
    `mishnah-berurah:2:א`,
    `(6) From the path — meaning even though there is danger that the animal and wagon not come upon him, nevertheless since it is possible for him to escape this by turning aside from the path, it is forbidden to interrupt with speech to tell another man to strike with a stick at the animal and to rebuke the owner of the wagon that he not come against him.`,
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

for (const f of [
  "output/siman_104/magen-avraham/part-001.txt",
  "output/siman_104/mishnah-berurah/part-001.txt",
]) {
  console.log(f, apply(f, fixes));
}
