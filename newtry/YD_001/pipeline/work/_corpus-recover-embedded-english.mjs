#!/usr/bin/env node
/** Recover English embedded after **** ENGLISH **** inside HEBREW section */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const BLOCK = "**** YD001 SOURCE BLOCK ****";
const HEB = "**** HEBREW ****";
const ENG = "**** ENGLISH ****";
const END = "**** END BLOCK ****";

const simFrom = process.argv[2] ? +process.argv[2] : 1;
const simTo = process.argv[3] ? +process.argv[3] : 999;

let files = 0;
let blocks = 0;
const simanim = new Set();

function recoverBlock(block) {
  const heStart = block.indexOf(HEB);
  const enStart = block.indexOf(ENG);
  const enEnd = block.indexOf(END);
  if (heStart < 0 || enStart < 0 || enEnd < 0) return block;

  const heBody = block.slice(heStart + HEB.length + 1, enStart).trim();
  const enBody = block.slice(enStart + ENG.length + 1, enEnd).trim();

  const embedIdx = heBody.indexOf(ENG);
  if (embedIdx === -1) return block;
  if (enBody && !/^English translation pending/i.test(enBody)) return block;

  const cleanHe = heBody.slice(0, embedIdx).trim();
  let recovered = heBody.slice(embedIdx + ENG.length).trim();
  if (!recovered) return block;

  if (!recovered.endsWith("\n")) recovered += "\n";
  const before = block.slice(0, heStart + HEB.length + 1);
  const after = block.slice(enEnd);
  blocks++;
  return before + cleanHe + "\n" + ENG + "\n" + recovered + after;
}

for (let n = simFrom; n <= simTo; n++) {
  const tag = String(n).padStart(3, "0");
  const simDir = path.join(OUT, `siman_${tag}`);
  if (!fs.existsSync(simDir)) continue;
  let simChanged = false;
  for (const slug of fs.readdirSync(simDir)) {
    const slugDir = path.join(simDir, slug);
    if (!fs.statSync(slugDir).isDirectory()) continue;
    for (const f of fs.readdirSync(slugDir).filter((x) => x.endsWith(".txt"))) {
      const fp = path.join(slugDir, f);
      let text = fs.readFileSync(fp, "utf8");
      const parts = text.split(BLOCK);
      let changed = false;
      const out = parts.map((part, i) => {
        if (i === 0) return part;
        const next = recoverBlock(part);
        if (next !== part) changed = true;
        return BLOCK + next;
      });
      if (changed) {
        fs.writeFileSync(fp, out.join(""), "utf8");
        files++;
        simChanged = true;
      }
    }
  }
  if (simChanged) {
    simanim.add(tag);
    spawnSync(process.execPath, [path.join(ROOT, "apply_dictionary_yd001.mjs"), "--root", `output/siman_${tag}`], {
      cwd: ROOT,
      stdio: "inherit",
    });
  }
}

console.log(`[DONE] embedded English recovery — ${blocks} blocks in ${files} files, simanim ${[...simanim].join(", ")}`);
