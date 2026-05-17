/**
 * Builds OC318_Complete.txt: Mechaber/Rama seifim + full commentary blocks (bilingual),
 * in layer order (not per seif). For seif-by-seif interleaving matching the site layout,
 * run: node build_oc318_interleaved_from_html.mjs
 * (uses `source html` with loaded siman body + same *_he_en files).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OUT = path.join(__dirname, "OC318_Complete.txt");

const SEP = "=".repeat(80);

function stripWorkPreamble(raw) {
  const lines = raw.split(/\r?\n/);
  let i = 0;
  if (lines[i]?.includes("OC 318")) i++;
  if (lines[i]?.startsWith("Format:")) i++;
  while (lines[i]?.trim() === "") i++;
  return lines.slice(i).join("\n").trimEnd();
}

function readIfExists(p) {
  if (!fs.existsSync(p)) throw new Error(`Missing file: ${p}`);
  return fs.readFileSync(p, "utf8");
}

const preamble = `${SEP}
OC 318 — Complete compilation (Orach Chayim)
${SEP}

This file is the “flat” build: all Mechaber/Rama seifim, then each commentary as one continuous
bilingual layer (not grouped by seif). For the version that interleaves Beit Yosef, Taz, Magen
Avraham, Baer Hetev, Biur HaGra, and Kitzuta under each seif using AlHaTorah’s DOM and
(Mechaber/Rama) alignment hints, use OC318_Complete_interleaved.txt from
  node build_oc318_interleaved_from_html.mjs
and a saved/inspect “source html” that includes the .verse / .parshan tree (not the empty shell).

${SEP}
PART A — MECHABER & RAMA (SEIFIM 1–19)
${SEP}

`;

const blocks = [preamble];

for (let n = 1; n <= 19; n++) {
  const pad = String(n).padStart(2, "0");
  const fp = path.join(__dirname, `318_mechaber_rama_seif_${pad}.txt`);
  blocks.push(readIfExists(fp));
  blocks.push("");
}

blocks.push(SEP);
blocks.push("PART B — BEIT YOSEF (HEBREW–ENGLISH)");
blocks.push(SEP);
blocks.push("");
blocks.push(stripWorkPreamble(readIfExists(path.join(__dirname, "318_beit_yosef_he_en.txt"))));
blocks.push("");

const works = [
  ["PART C — TAZ", "318_taz_he_en.txt"],
  ["PART D — MAGEN AVRAHAM", "318_magen_avraham_he_en.txt"],
  ["PART E — BAER HETEV", "318_ber_heteiv_he_en.txt"],
  ["PART F — BIUR HAGRA", "318_biur_hagra_he_en.txt"],
  ["PART G — SHULCHAN ARUCH KITZUTA", "318_kitzur_he_en.txt"],
];

for (const [title, fn] of works) {
  blocks.push(SEP);
  blocks.push(`${title} (HEBREW–ENGLISH)`);
  blocks.push(SEP);
  blocks.push("");
  blocks.push(stripWorkPreamble(readIfExists(path.join(__dirname, fn))));
  blocks.push("");
}

fs.writeFileSync(OUT, blocks.join("\n").replace(/\n{3,}/g, "\n\n") + "\n", "utf8");
console.log("Wrote", OUT);
