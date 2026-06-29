import fs from "fs";

const SIM = [
  108, 110, 111, 113, 114, 117, 124, 126, 128, 131, 132, 135, 137, 139, 141,
  143, 147, 150, 151, 153, 154, 158, 159, 168, 170, 171, 178, 179, 183, 184,
  188, 190, 193, 194,
];

function fixDivine(en) {
  return en
    .replace(/with God's help/gi, "with Hashem's help")
    .replace(/God's help/gi, "Hashem's help")
    .replace(/God, faithful King/g, "Hashem, faithful King")
    .replace(/"God, faithful/g, '"Hashem, faithful')
    .replace(/the Holy One, blessed be He/g, "Hashem")
    .replace(/Holy One, blessed be He/g, "Hashem");
}

const badKeys = new Set(
  JSON.parse(fs.readFileSync("_stragglers-105-199-dump.json", "utf8"))
    .filter((x) => x.bad)
    .map((x) => x.k),
);

const auto = {};
const missing = [];
for (const s of SIM) {
  const q = JSON.parse(
    fs.readFileSync(
      `pipeline/work/editorial-queue-siman-${String(s).padStart(3, "0")}.json`,
      "utf8",
    ),
  );
  for (const it of q.items) {
    const k = `${s}|${it.slug}|${it.seif}|${it.marker}`;
    const raw = it.rawBlock || "";
    const enM = raw.match(
      /\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/,
    );
    const en = (enM ? enM[1] : "").trim();
    if (badKeys.has(k)) missing.push(k);
    else auto[k] = fixDivine(en);
  }
}
console.log("auto", Object.keys(auto).length, "missing", missing.length);
fs.writeFileSync("_stragglers-105-199-auto.json", JSON.stringify(auto));
fs.writeFileSync("_stragglers-105-199-missing.json", JSON.stringify(missing, null, 2));
