import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { BAD_MT_447 } from "./lib/bad-mt-447.mjs";
import fs from "fs";

const t582 = fs.readFileSync("../output/siman_582/chokhmat-shlomo/part-001.txt","utf8").match(/Seif 8:[^\n]+/)[0];
const t618 = fs.readFileSync("../output/siman_618/levushei-serad/part-001.txt","utf8").match(/There — an enactment[^\n]+/)[0];
for (const [n,t] of [["582",t582],["618",t618]]) {
  const hits = BAD_MT_447.filter(r=>r.test(t)).map(r=>r.source);
  console.log(n, isBadMt447(t), hits);
}
