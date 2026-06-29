#!/usr/bin/env node
/** Generate mishnah-berurah keys with Hebrew for manual paste — outputs JSON lines */
import fs from "fs";
const he = JSON.parse(fs.readFileSync(new URL("./_mishnah_berurah372-he.json", import.meta.url), "utf8"));
for (const [k, v] of Object.entries(he)) {
  console.log(JSON.stringify({ k: `mishnah-berurah:${k}`, he: v.slice(0, 120) }));
}
