const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs'),assert=require('assert/strict'),dir='audit-visual/mentor-editorial';
const copy=html=>{const root=html?new DOMParser().parseFromString(html,'text/html').body:document.body;let n,s='';const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);while(n=w.nextNode())if(!n.parentElement.closest('style,script'))s+=n.textContent;return s.replace(/\s+/g,' ').trim()};
(async()=>{const mode=process.argv[2]||'after',b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true}),report=[];
for(const width of mode==='before'?[1440,375]:[1440,768,375,320]){
 const p=await b.newPage({viewport:{width,height:1000}}),errors=[],failed=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://localhost:5501/'))failed.push(r.url())});
 await p.goto('http://localhost:5501/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 if(mode==='after')assert.equal(await p.evaluate(copy),await p.evaluate(copy,fs.readFileSync(`${dir}/before.html`,'utf8')));
 const s=p.locator('.sec-who');for(const el of await s.locator('.reveal').all()){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(170)}await p.waitForTimeout(700);for(const img of await s.locator('img').all())await img.evaluate(e=>e.decode());
 await s.screenshot({path:`${dir}/${mode}-${width}.png`,style:'.topbar,.btn.is-docked{visibility:hidden!important}'});
 const metrics=await p.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,items:document.querySelectorAll('.sec-who .check').length,height:document.querySelector('.sec-who').offsetHeight}));assert.equal(metrics.width,metrics.scrollWidth);assert.equal(metrics.items,7);assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 if(mode==='after'){await p.emulateMedia({reducedMotion:'reduce'});for(const el of await s.locator('.reveal').all())assert.equal(await el.evaluate(e=>getComputedStyle(e).opacity),'1');assert.equal(await p.locator('#como-funciona .how-art img').first().getAttribute('src'),'assets/images/how-aulas.webp')}
 report.push({...metrics,errors,failed});console.log(mode,metrics);await p.close();
}fs.writeFileSync(`${dir}/${mode}-validation.json`,JSON.stringify(report,null,2));await b.close()})().catch(e=>{console.error(e);process.exit(1)});

