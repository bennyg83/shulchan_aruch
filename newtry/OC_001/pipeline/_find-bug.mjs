import fs from "fs";
const s = fs.readFileSync("pipeline/_slot2-siman-301-mhs-fix.mjs", "utf8");
const start = s.indexOf("new Map([");
const end = s.indexOf("]);", start);
const chunk = s.slice(start + "new Map(".length, end + 1);
let depth = 0;
let inStr = false;
let str = "";
for (let i = 0; i < chunk.length; i++) {
  const c = chunk[i];
  if (inStr) {
    if (c === "`" && chunk[i - 1] !== "\\") inStr = false;
    continue;
  }
  if (c === "`") {
    inStr = true;
    str = "`";
    continue;
  }
  if (c === "[") depth++;
  if (c === "]") {
    depth--;
    if (depth === 0) {
      const line = s.slice(0, start + i).split("\n").length;
      console.log("depth 0 at offset", i, "line ~", line);
      console.log("context:", JSON.stringify(chunk.slice(Math.max(0, i - 40), i + 10)));
      break;
    }
  }
}
