import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const leftoversDir = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(leftoversDir, "part99_completed.json");
const arr = JSON.parse(fs.readFileSync(p, "utf8"));
const c = arr.find((x) => x.id.includes("siman17"));
c.new_en = c.new_en.replace(
  "[Rama's own ruling]",
  "This gloss is Rama's own ruling."
);
c.notes =
  "Leftover fix: both Ramas in HE order; dverei atzmo attribution after final Rama (post-Rama EN).";
fs.writeFileSync(p, JSON.stringify(arr, null, 2) + "\n");

const re = /\{Rama\s*:[\s\S]*?\}/gi;
let m;
let last = -1;
while ((m = re.exec(c.new_en)) !== null) last = m.index + m[0].length;
const postEn = c.new_en.slice(last).trim();
console.log(
  "postEn:",
  JSON.stringify(postEn),
  "chars",
  postEn.replace(/\s+/g, "").length
);
