#!/usr/bin/env node
/** EH001 siman 017 — full redo: mechaber + chokhmat-shlomo (87 blocks). */
import { patchFile } from "./_patch-siman-utils.mjs";
import { T as M1 } from "./_patch-siman-017-mechaber-part1.mjs";
import { T as M2 } from "./_patch-siman-017-mechaber-part2.mjs";
import { T as CS } from "./_patch-siman-017-chokhmat.mjs";

let n = 0;
const p = (rel, slug, T) => { n += patchFile(rel, slug, T); };

p("siman_017/mechaber/part-001.txt", "mechaber", M1);
p("siman_017/mechaber/part-002.txt", "mechaber", { ...M1, ...M2 });
p("siman_017/mechaber/part-003.txt", "mechaber", M2);
p("siman_017/chokhmat-shlomo/part-001.txt", "chokhmat-shlomo", CS);

console.log(`siman_017 mechaber+chokhmat-shlomo: ${n} blocks patched`);
