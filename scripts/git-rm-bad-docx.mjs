import fs from "fs";
import { execFileSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buf = execFileSync("git", ["ls-files", "-z", "--", ":*.docx"]);
const files = buf
  .toString("utf8")
  .split("\0")
  .filter(Boolean);
const bad = files.filter((f) => f.startsWith('"') || /^[^/]+\.docx$/i.test(f));
if (!bad.length) {
  console.log("no bad root docx in index");
  process.exit(0);
}
const listFile = path.join(__dirname, ".git-rm-bad-docx-pathspec");
fs.writeFileSync(listFile, bad.join("\0") + "\0");
execFileSync("git", ["rm", "--cached", "-f", "--pathspec-from-file", listFile, "--pathspec-file-nul"], {
  stdio: "inherit",
});
fs.unlinkSync(listFile);
for (const f of bad) console.log("removed:", JSON.stringify(f).slice(0, 100));
console.log("done, removed", bad.length);
