import fs from "fs";

const src = process.argv[2] ?? "output/shulchan-arukh-kifshuto/part-001.txt";
const t = fs.readFileSync(src, "utf8");
const blocks = t.split(/\*\*\*\* OC253 SOURCE BLOCK \*\*\*\*/).slice(1);
const markers = blocks.map((b) => {
  const x = b.match(/marker:\s*([^\r\n]+)/u);
  return x ? x[1].trim() : "?";
});
const start = Number(process.argv[3] ?? 0);
const end = Number(process.argv[4] ?? markers.length - 1);
for (let i = start; i <= end && i < markers.length; i++) {
  console.log(i + 1, markers[i]);
}

