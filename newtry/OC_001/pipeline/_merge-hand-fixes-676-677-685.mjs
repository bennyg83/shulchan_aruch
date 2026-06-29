#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { HAND676, HAND677, HAND685 } from "./_hand-fixes-676-677-685.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function mergeHand(siman, hand) {
  const p = path.join(__dirname, `_hand-en-${siman}.json`);
  const cur = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {};
  Object.assign(cur, hand);
  fs.writeFileSync(p, JSON.stringify(cur, null, 2) + "\n");
  console.log(`_hand-en-${siman}.json`, Object.keys(hand).length, "keys merged");
  for (const pn of [1, 2, 3]) {
    const part = path.join(__dirname, `siman${siman}-part${pn}.json`);
    if (!fs.existsSync(part)) continue;
    const data = JSON.parse(fs.readFileSync(part, "utf8"));
    let n = 0;
    for (const [k, en] of Object.entries(hand)) {
      if (k in data) {
        data[k] = en;
        n++;
      }
    }
    fs.writeFileSync(part, JSON.stringify(data, null, 2) + "\n");
    console.log(`siman${siman}-part${pn}.json`, n, "updated");
  }
}

mergeHand(676, HAND676);
mergeHand(677, HAND677);
mergeHand(685, HAND685);
