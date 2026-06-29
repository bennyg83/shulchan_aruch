#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { autoFix } from "./_slot18-lib.mjs";

const fp = "output/siman_673/chokhmat-shlomo/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
const out = blocks.map((b) => {
  if (b.seif !== "2") return b;
  let t = autoFix(b.en, "_", b.he);
  t = t
    .replace(/\bpending\b/gi, "outstanding")
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\bA\.C\.\b/g, "")
    .replace(/\bC\.C\.\b/g, "congregation");
  return { ...b, en: t.trim() };
});
fs.writeFileSync(fp, out.map(serializeBlock).join("\n\n") + "\n", "utf8");
const b = out.find((x) => x.seif === "2");
console.log("bad?", isBadMt447(b.en));
