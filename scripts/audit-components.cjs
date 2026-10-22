const fs=require('node:fs'),path=require('node:path');
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name).replaceAll('\\','/')]);}
const source=files('src').filter(p=>/\.(jsx?|mjs)$/.test(p));
const graph=new Map(source.map(p=>[p,[...fs.readFileSync(p,'utf8').matchAll(/(?:from\s*|import\s*\(|import\s*)["']([^"']+)["']/g)].map(m=>m[1]).filter(x=>x.startsWith('@/')||x.startsWith('.')).map(x=>x.startsWith('@/')?'src/'+x.slice(2):path.posix.normalize(path.posix.join(path.posix.dirname(p),x))).map(p=>[p,p+'.js',p+'.jsx',p+'.mjs'].find(q=>source.includes(q))).filter(Boolean)]));
const used=new Set();function visit(p){if(used.has(p))return;used.add(p);for(const dep of graph.get(p)||[])visit(dep);}
source.filter(p=>p.startsWith('src/app/')).forEach(visit);
const unused=source.filter(p=>!used.has(p));
console.log(JSON.stringify({unreachable:unused,dynamicImports:source.filter(p=>/import\s*\(/.test(fs.readFileSync(p,'utf8')))},null,2));
