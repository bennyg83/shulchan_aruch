import fs from "fs";

const SIM = [
  1, 2, 3, 4, 8, 9, 10, 11, 13, 15, 20, 31, 32, 37, 38, 40, 42, 51, 53, 55,
  59, 60, 61, 62, 70, 74, 76, 90, 91, 92, 93, 94, 102,
];

export function cleanupEn(en) {
  return en
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*\*\* END BLOCK \*\*\*\*/g, "")
    .replace(/\bN\.J\./g, "NB:")
    .replace(/Editor's note/gi, "NB:")
    .replace(/\bP\.S\.:/g, "NB:")
    .replace(/\bN\.b\.:/gi, "NB:")
    .replace(/with God's help/gi, "with Hashem's help")
    .replace(/God's help/gi, "Hashem's help")
    .replace(/God, faithful King/g, "Hashem, faithful King")
    .replace(/"God, faithful/g, '"Hashem, faithful')
    .replace(/the Holy One, blessed be He/g, "Hashem")
    .replace(/Holy One, blessed be He/g, "Hashem")
    .replace(/\bthe master\b/gi, "Mar")
    .trim();
}

const auto = {};
for (const s of SIM) {
  const q = JSON.parse(
    fs.readFileSync(
      `pipeline/work/editorial-queue-siman-${String(s).padStart(3, "0")}.json`,
      "utf8",
    ),
  );
  for (const it of q.items || []) {
    const k = `${s}|${it.slug}|${it.seif}|${it.marker}`;
    const raw = it.rawBlock || "";
    const enM = raw.match(
      /\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/,
    );
    auto[k] = cleanupEn((enM ? enM[1] : "").trim());
  }
}

fs.writeFileSync("_stragglers-1-104-auto.json", JSON.stringify(auto));
console.log("auto", Object.keys(auto).length);
