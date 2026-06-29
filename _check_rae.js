const fs=require('fs'),path=require('path');
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function strip(h){return h.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();}
const base='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';
let dup=0,other=0;
const others=[];
for(const si of fs.readdirSync(base).filter(d=>d.startsWith('siman'))){
  const siPath=path.join(base,si);
  for(const se of fs.readdirSync(siPath).filter(d=>{try{return d.startsWith('seif-')&&fs.statSync(path.join(siPath,d)).isDirectory();}catch{return false;}})){
    const hp=path.join(siPath,se,'rabbi-akiva-eiger','he.html');
    const ep=path.join(siPath,se,'rabbi-akiva-eiger','en.html');
    if(!fs.existsSync(hp)||!fs.existsSync(ep)) continue;
    const he=brSegs(fs.readFileSync(hp,'utf8'));
    const en=brSegs(fs.readFileSync(ep,'utf8'));
    if(he.length!==en.length){
      // Check for any duplicate adjacent EN segment
      let isDup=false;
      for(let i=0;i<en.length-1;i++){
        if(strip(en[i])===strip(en[i+1])){isDup=true;break;}
      }
      if(isDup) dup++;
      else{
        other++;
        if(others.length<5) others.push({si,se,
          he0:strip(he[0]).slice(0,70),
          en0:strip(en[0]).slice(0,70),
          en1:strip(en[1]).slice(0,70),
          en2:strip(en[2]).slice(0,70)
        });
      }
    }
  }
}
console.log('Duplicate-segment cases:',dup);
console.log('Other (non-duplicate):',other);
if(others.length) console.log('Sample non-dup:',JSON.stringify(others,null,2));
