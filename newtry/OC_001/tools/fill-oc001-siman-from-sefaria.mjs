/**
 * Pull Sefaria community English into OC001 block files for one siman (mechaber + Mishnah Berurah).
 *
 *   node tools/fill-oc001-siman-from-sefaria.mjs --siman 3
 *   node tools/fill-oc001-siman-from-sefaria.mjs --siman 3 --root output/siman_003
 *
 * Mechaber: Shulchan_Aruch,_Orach_Chayim.<siman> (array length = seif count).
 * Mishnah Berurah: Mishnah_Berurah.<siman> (array length = seif-katan rows; must match OC001 row order).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC001_ROOT = path.resolve(__dirname, "..");

function pad(n) {
  return String(n).padStart(3, "0");
}

function parseArgs(argv) {
  let siman = NaN;
  let rootRel = "";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--siman" && argv[i + 1]) siman = Number(argv[++i]);
    else if (argv[i] === "--root" && argv[i + 1]) rootRel = argv[++i];
  }
  if (!Number.isFinite(siman) || siman < 1) throw new Error("Required: --siman <positive integer>");
  const root = path.isAbsolute(rootRel)
    ? rootRel
    : path.join(OC001_ROOT, rootRel || path.join("output", `siman_${pad(siman)}`));
  return { siman, root };
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const j = await res.json();
  if (j.error) throw new Error(`${j.error} (${url})`);
  return j;
}

function asStringArray(t) {
  if (t == null) return [];
  if (Array.isArray(t)) return t.map((x) => String(x ?? "").trim());
  return [String(t).trim()];
}

function writeBlocksFile(fp, blocks) {
  const body = blocks.map((b) => serializeBlock(b)).join("\n\n") + "\n";
  fs.writeFileSync(fp, body, "utf8");
}

async function fillMechaber({ siman, root }) {
  const fp = path.join(root, "mechaber", "part-001.txt");
  if (!fs.existsSync(fp)) {
    console.warn("skip mechaber: missing", fp);
    return;
  }
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  const url = `https://www.sefaria.org/api/texts/Shulchan_Aruch,_Orach_Chayim.${siman}?context=0`;
  const doc = await fetchJson(url);
  const list = asStringArray(doc.text);
  const bySeif = new Map();
  for (const b of blocks) {
    if (b.slug !== "mechaber") continue;
    const n = Number(b.seif);
    if (Number.isFinite(n)) bySeif.set(n, { ...b });
  }
  let count = 0;
  for (let seif = 1; seif <= list.length; seif++) {
    const row = bySeif.get(seif);
    if (!row) continue;
    const en = String(list[seif - 1] ?? "").trim();
    if (!en) continue;
    row.en = en;
    count++;
  }
  const out = blocks.map((b) => {
    if (b.slug !== "mechaber") return b;
    const row = bySeif.get(Number(b.seif));
    return row && row.en ? { ...b, en: row.en } : b;
  });
  writeBlocksFile(fp, out);
  console.log(`mechaber: updated ${count} blocks from Sefaria`);
}

async function fillMishnahBerurah({ siman, root }) {
  const fp = path.join(root, "mishnah-berurah", "part-001.txt");
  if (!fs.existsSync(fp)) {
    console.warn("skip mishnah-berurah: missing", fp);
    return;
  }
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  const mbBlocks = blocks.filter((b) => b.slug === "mishnah-berurah");
  const url = `https://www.sefaria.org/api/texts/Mishnah_Berurah.${siman}?context=0`;
  const doc = await fetchJson(url);
  const list = asStringArray(doc.text);
  if (list.length !== mbBlocks.length) {
    console.warn(
      `mishnah-berurah: Sefaria has ${list.length} segments, OC001 has ${mbBlocks.length} blocks — assign min length`
    );
  }
  const n = Math.min(list.length, mbBlocks.length);
  const key = (b) => `${b.slug}\u0001${b.seif}\u0001${b.marker}`;
  const upd = new Map();
  for (let i = 0; i < n; i++) {
    const b = mbBlocks[i];
    const en = String(list[i] ?? "").trim();
    if (en) upd.set(key(b), en);
  }
  const out = blocks.map((b) => {
    const k = key(b);
    if (upd.has(k)) return { ...b, en: upd.get(k) };
    return b;
  });
  writeBlocksFile(fp, out);
  console.log(`mishnah-berurah: updated ${upd.size} blocks from Sefaria`);
}

const { siman, root } = parseArgs(process.argv.slice(2));
console.log("siman", siman, "root", root);
if (!fs.existsSync(root)) {
  console.error("Missing root:", root);
  process.exit(1);
}

await fillMechaber({ siman, root });
await fillMishnahBerurah({ siman, root });
console.log("Done.");
