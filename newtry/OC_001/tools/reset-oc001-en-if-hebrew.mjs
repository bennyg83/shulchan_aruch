/**
 * If EN still contains substantial Hebrew (MyMemory 429 fallback), reset to placeholder for re-translation.
 *
 *   node tools/reset-oc001-en-if-hebrew.mjs --root output/siman_003
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock, EN_PENDING_DEFAULT } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC001_ROOT = path.resolve(__dirname, "..");

const HEB = /[\u0590-\u05FF]/;

function parseArgs(argv) {
  let rootRel = "";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--root" && argv[i + 1]) rootRel = argv[++i];
  }
  if (!rootRel) throw new Error("Required: --root");
  return path.isAbsolute(rootRel) ? rootRel : path.join(OC001_ROOT, rootRel);
}

function hebrewDensity(s) {
  const t = String(s);
  let h = 0;
  let n = 0;
  for (const ch of t) {
    if (ch === " " || ch === "\n") continue;
    n++;
    if (HEB.test(ch)) h++;
  }
  return n ? h / n : 0;
}

function walkTxt(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkTxt(p, acc);
    else if (ent.isFile() && ent.name.endsWith(".txt")) acc.push(p);
  }
  return acc;
}

const root = parseArgs(process.argv.slice(2));
let reset = 0;
for (const fp of walkTxt(root)) {
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  let ch = false;
  const out = blocks.map((b) => {
    if (b.slug === "mechaber" || b.slug === "mishnah-berurah") return b;
    const d = hebrewDensity(b.en);
    if (d > 0.12 && HEB.test(b.en)) {
      ch = true;
      reset++;
      return { ...b, en: EN_PENDING_DEFAULT };
    }
    return b;
  });
  if (ch) fs.writeFileSync(fp, out.map((b) => serializeBlock(b)).join("\n\n") + "\n", "utf8");
}
console.log("Reset blocks:", reset);
