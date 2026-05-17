/**
 * Asserts rules for hiding commentaries with no real content (see src/corpus.js).
 * Run from repo root: node scripts/validate-corpus-empty-rules.mjs
 */
import assert from "node:assert/strict";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const corpusPath = path.join(here, "..", "src", "corpus.js");
const { htmlIsVisuallyEmpty, htmlHasLetterOrDigit, zipHeEnSegments, noteVisibleForLanguages } = await import(pathToFileURL(corpusPath).href);

function ok(cond, msg) {
  assert.ok(cond, msg);
}

// htmlIsVisuallyEmpty
ok(htmlIsVisuallyEmpty(null));
ok(htmlIsVisuallyEmpty(""));
ok(htmlIsVisuallyEmpty("   "));
ok(htmlIsVisuallyEmpty("<p></p>"));
ok(htmlIsVisuallyEmpty("<div><br/></div>"));
ok(htmlIsVisuallyEmpty("&nbsp; &nbsp;"));
ok(!htmlIsVisuallyEmpty("<p>א</p>"));
ok(!htmlIsVisuallyEmpty("<span>1</span>"));
ok(
  htmlIsVisuallyEmpty(
    "No commentary text was included in this merged excerpt (empty segments in the source JSON)."
  ),
  "publisher placeholder English counts as empty"
);
ok(htmlIsVisuallyEmpty("<p>No commentary text was included in this merged excerpt (empty segments).</p>"));

// zipHeEnSegments — commentary row dropped only when both sides empty / placeholder
ok(zipHeEnSegments("", "").length === 0);
ok(zipHeEnSegments("<p>ק</p>", "").length === 1);
ok(zipHeEnSegments("", "<p>Some real translation.</p>").length === 1);
ok(
  zipHeEnSegments(
    "",
    "No commentary text was included in this merged excerpt (empty segments in the source JSON)."
  ).length === 0,
  "placeholder-only English should yield no segments"
);
ok(
  zipHeEnSegments("שלום<br>עולם", "hello<br>world").length === 2,
  "multi-<br> segments zip by index"
);
ok(
  zipHeEnSegments("א", "No commentary text was included in this merged excerpt (empty segments in the source JSON).")
    .length === 1,
  "Hebrew present keeps segment even if English is placeholder"
);
ok(htmlHasLetterOrDigit("<p>א</p>"));
ok(!htmlHasLetterOrDigit("<p>— —</p>"), "dash-only is not substantive");
ok(zipHeEnSegments("<p>---</p>", "<p>...</p>").length === 0, "punctuation-only segments dropped");
ok(htmlIsVisuallyEmpty("<p>&#8206;</p>"), "numeric LRM entity decodes to format char");

ok(htmlIsVisuallyEmpty("<p>\u200f</p>"), "RLM alone is visually empty");
ok(!noteVisibleForLanguages(false, true, { hebrew: "<p>שלום</p>", english: "" }), "English-only hides Hebrew-only note");
ok(noteVisibleForLanguages(false, true, { hebrew: "", english: "<p>Hi</p>" }), "English-only shows note with English");

console.log("corpus empty rules: all assertions passed.");
