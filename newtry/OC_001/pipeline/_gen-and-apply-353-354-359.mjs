#!/usr/bin/env node
/** Generate *353/354/359-en.mjs files and apply scripts */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SIM353, SIM354, SIM359 } from "./_data-353-354-359-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function writeEnMjs(name, data) {
  const lines = Object.entries(data)
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
    .join("\n");
  fs.writeFileSync(path.join(__dirname, `${name}-en.mjs`), `export const t = {\n${lines}\n};\n`);
}

function buildSiman(num, spec) {
  const entries = Object.entries(spec);
  for (const [prefix, [data, slug]] of entries) {
    writeEnMjs(`${prefix}${num}`, data);
  }
  const imports = entries.map(([p]) => `import { t as ${p} } from "./${p}${num}-en.mjs";`).join("\n");
  const mapLines = entries.map(([p, [, slug]]) => `  [${p}, "${slug}"],`).join("\n");
  const apply = `#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
${imports}

const ROOT = ${JSON.stringify(ROOT)};

const maps = [
${mapLines}
];

const allFixes = new Map();
for (const [t, slug] of maps) {
  for (const [k, v] of Object.entries(t)) allFixes.set(\`\${slug}:\${k}\`, v);
}

let missing = [];
let total = 0;
for (const [, slug] of maps) {
  const dir = path.join(ROOT, "output", \`siman_${num}\`, slug);
  if (!fs.existsSync(dir)) continue;
  const parts = fs.readdirSync(dir).filter((f) => /^part-\\d+\\.txt$/.test(f)).sort();
  let count = 0;
  for (const part of parts) {
    const fp = path.join(dir, part);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const out = blocks
      .map((b) => {
        const key = \`\${b.slug}:\${b.seif}:\${b.marker}\`;
        const en = allFixes.get(key);
        if (!en) missing.push(key);
        return en ? { ...b, en } : b;
      })
      .map(serializeBlock)
      .join("\\n\\n");
    fs.writeFileSync(fp, out);
    count += blocks.length;
  }
  console.log(slug, count);
  total += count;
}
console.log("total", total, "missing:", missing.length);
if (missing.length) {
  console.log(missing.join("\\n"));
  process.exit(1);
}
`;
  fs.writeFileSync(path.join(__dirname, `_apply-siman${num}.mjs`), apply);
}

buildSiman(353, {
  mech: [SIM353.mech, "mechaber"],
  bh: [SIM353.bh, "baer-heitev"],
  beer: [SIM353.beer, "beer-hagolah"],
  gra: [SIM353.gra, "beur-hagra"],
  biur: [SIM353.biur, "biur-halacha"],
  mb: [SIM353.mb, "mishnah-berurah"],
  ma: [SIM353.ma, "magen-avraham"],
  mh: [SIM353.mh, "machatzit-hashekel"],
  er: [SIM353.er, "eliyah-rabbah"],
  kaf: [SIM353.kaf, "kaf-hachayyim"],
  pm: [SIM353.pm, "peri-megadim"],
  taz: [SIM353.taz, "turei-zahav"],
  netiv: [SIM353.netiv, "netiv-chayim"],
  yad: [SIM353.yad, "yad-ephraim"],
});

buildSiman(354, {
  mech: [SIM354.mech, "mechaber"],
  bh: [SIM354.bh, "baer-heitev"],
  beer: [SIM354.beer, "beer-hagolah"],
  gra: [SIM354.gra, "beur-hagra"],
  biur: [SIM354.biur, "biur-halacha"],
  mb: [SIM354.mb, "mishnah-berurah"],
  ma: [SIM354.ma, "magen-avraham"],
  mh: [SIM354.mh, "machatzit-hashekel"],
  er: [SIM354.er, "eliyah-rabbah"],
  kaf: [SIM354.kaf, "kaf-hachayyim"],
  pm: [SIM354.pm, "peri-megadim"],
  taz: [SIM354.taz, "turei-zahav"],
  cs: [SIM354.cs, "chokhmat-shlomo"],
  yad: [SIM354.yad, "yad-ephraim"],
});

buildSiman(359, {
  mech: [SIM359.mech, "mechaber"],
  beer: [SIM359.beer, "beer-hagolah"],
  biur: [SIM359.biur, "biur-halacha"],
  mb: [SIM359.mb, "mishnah-berurah"],
  ma: [SIM359.ma, "magen-avraham"],
  mh: [SIM359.mh, "machatzit-hashekel"],
  er: [SIM359.er, "eliyah-rabbah"],
  kaf: [SIM359.kaf, "kaf-hachayyim"],
});

console.log("Generated en.mjs and apply scripts for 353, 354, 359");
