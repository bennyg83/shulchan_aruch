#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, "work", "editorial-done-ids.txt");
const pad = (n) => String(n).padStart(3, "0");
const needles = new Set(simanim.map((s) => `siman_${pad(s)}/`));
const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
const kept = lines.filter((l) => l.trim() && !needles.has(l.slice(0, 11)));
fs.writeFileSync(p, kept.join("\n") + (kept.length ? "\n" : ""), "utf8");
console.log("removed", lines.length - kept.length, "ids for simanim", simanim.join(", "));
