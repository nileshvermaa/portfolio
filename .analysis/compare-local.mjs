import fs from 'node:fs';
const nav=JSON.parse(fs.readFileSync('.analysis/majd-local/nav-frames.json','utf8'));
const live=JSON.parse(fs.readFileSync('.analysis/majd-live/nav-click-precise.json','utf8'));
console.log('local nav first mid last', nav[0], nav[10], nav[nav.length-1]);
console.log('live nav reference first mid last', live[0]?.nav, live[15]?.nav, live[live.length-1]?.nav);
console.log('console', fs.readFileSync('.analysis/majd-local/console.json','utf8'));
