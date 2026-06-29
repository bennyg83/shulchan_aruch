import fs from "fs";
import { t as t1 } from "./gra301-en-part1.mjs";
import { t as t2 } from "./gra301-en-part2.mjs";
import { t as t3 } from "./gra301-en-part3.mjs";

const blocks = JSON.parse(fs.readFileSync("pipeline/_gra301-blocks.json", "utf8"));
const keys = blocks.map((b) => b.k);
const all = { ...t1, ...t2, ...t3 };
const missing = keys.filter((k) => !all[k]);
const extra = Object.keys(all).filter((k) => !keys.includes(k));
console.log("blocks", keys.length, "translations", Object.keys(all).length);
console.log("missing", missing.length, missing);
console.log("extra", extra.length, extra);
