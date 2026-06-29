const fs=require('fs'),path=require('path');
const base='C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries';

function inspect(relPath,slug){
  const full=base+'/'+relPath;
  const j=JSON.parse(fs.readFileSync(full,'utf8'));
  console.log('\n=== '+slug+' ===');
  console.log('text length:',j.text.length);
  // Check siman 135 structure
  const s135=j.text[134];
  console.log('s135 type:',typeof s135, Array.isArray(s135)?'array len='+s135.length:'');
  if(Array.isArray(s135)){
    s135.slice(0,3).forEach((e,i)=>{
      console.log('  idx'+i+' type:',typeof e,Array.isArray(e)?'array len='+e.length:'');
      if(typeof e==='string') console.log('    str:',e.slice(0,80));
      if(Array.isArray(e)) e.slice(0,2).forEach((sub,j)=>console.log('    sub'+j+':',typeof sub,typeof sub==='string'?sub.slice(0,80):''));
    });
  }
}

inspect('Biur_Halacha/merged.json','biur-halacha');
inspect('Beur_HaGra_on_Shulchan_Arukh,_Orach_Chayim/merged.json','beur-hagra');
inspect('Netiv_Chayim_on_Shulchan_Arukh,_Orach_Chayim/merged.json','netiv-chayim');
inspect('Machatzit_HaShekel_on_Orach_Chayim/merged.json','machatzit-hashekel');
