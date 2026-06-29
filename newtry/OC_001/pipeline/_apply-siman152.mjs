#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "1:א":
    "Lest coercion occur. In the Gemara, R' Chisda: a person should not demolish a synagogue until they build another synagogue. Some say: because of negligence — lest coercion occur and they were negligent and did not build another. And others say: because of prayer — all the time of the building. What is their building? Abaye said: there is another synagogue. And in Rif, and Rosh, and Ran the text is: there is a place to pray. According to the one who says because of prayer — there is not; according to the one who says because of negligence — there is. And Rosh wrote that the halakha is like the one who says because of negligence; automatically, a place to pray does not help. And Ran wrote: according to the one who says because of negligence — if they were scattered from its bricks, and on the days they built it they would not have a fixed place to pray; but certainly, wherever they have another fixed synagogue, it is permitted for everyone, for there is neither concern of prayer nor concern of negligence; for if for negligence — that they should never build — there is no one who is concerned about this, etc. — until here. And so in the name of Rashba and Nimukei Yosef; and it appears that Tosafot also hold thus, for it is written: \"between them there is a place to pray\" — which implies that they dispute specifically regarding a temporary place to pray; but regarding another fixed synagogue, all permit. And even per our reading, \"Abaye: there is another synagogue\" — its explanation is likewise that there is a temporary synagogue. And so is implied in Beit Yosef: by \"there is another synagogue to pray,\" it implies a temporary one merely. And therefore it appears that Rambam and Tur also hold thus; and even though they did not mention that another synagogue helps, we learn it automatically from their saying that they build the other one first and afterward demolish; and from this we learn that if there is another, it is as if they built another — for what difference is there between them? And so Rama, siman 123: if they have another synagogue, it is permitted to demolish the old one. And in Beit Yosef he wrote that there is a dispute between Tur and Ran — and it does not seem so at all; rather, all agree that with a fixed synagogue it is permitted to demolish the other one.",
  "1:ב":
    "But if its foundations were destroyed. And in the Gemara they called this \"taivah\" — meaning, if damage appears. And an incident: in one city, where the Jews lived outside the wall, and the matter occurred that they settled inside the wall, and the synagogue remained alone outside the wall — I said: you have no greater \"taivah\" than this; and I permitted them to demolish it in order to build it inside the wall. And first they built the new synagogue, and afterward they took the stones from the old one and built inside the wall from them.",
};

const file = "output/siman_152/turei-zahav/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
let n = 0;
const out = blocks
  .map((b) => {
    const key = `${b.seif}:${b.marker}`;
    if (fixes[key]) {
      n++;
      return { ...b, en: fixes[key] };
    }
    return b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(file, out);
console.log(file, n);
