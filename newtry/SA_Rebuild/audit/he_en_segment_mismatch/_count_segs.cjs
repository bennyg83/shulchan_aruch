const fs=require("fs");const path=require("path");
const ROOT="C:/Users/binya/Documents/shulchan-aruch-clean/newtry/OC_Mobile/oc318-mobile-reader/public/corpus";
function splitHtmlByBrSegments(html){
  const normalizeBrRuns=s=>String(s??"").replace(/(?:<br\s*\/?>\s*){2,}/gi,"<br>");
  const parts=normalizeBrRuns(html).split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi).map(s=>s.trim()).filter(s=>s.length>0);
  return parts.length>0?parts:[String(html).trim()].filter(Boolean);
}
const ids=process.argv.slice(2);
for(const id of ids){
  const he=fs.readFileSync(path.join(ROOT,id,"he.html"),"utf8");
  const en=fs.readFileSync(path.join(ROOT,id,"en.html"),"utf8");
  console.log(id,"he",splitHtmlByBrSegments(he).length,"en",splitHtmlByBrSegments(en).length);
}
