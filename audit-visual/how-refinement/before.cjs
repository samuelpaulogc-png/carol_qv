const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs');
(async()=>{
const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
const ref=await b.newPage({viewport:{width:1440,height:1000}});
try{await ref.goto('https://claude-economy.vercel.app/',{waitUntil:'domcontentloaded',timeout:45000});await ref.waitForTimeout(2500);console.log('Reference:',await ref.title());fs.writeFileSync('audit-visual/how-refinement/reference-text.txt',await ref.locator('body').innerText());for(const y of [0,900,1800,2800]){await ref.evaluate(y=>scrollTo(0,y),y);await ref.waitForTimeout(700);await ref.screenshot({path:`audit-visual/how-refinement/reference-${y}.png`})}}catch(e){console.log('Reference unavailable:',e.message)}await ref.close();
for(const width of [1440,375]){const p=await b.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});await p.goto('http://localhost:5501/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.locator('.sec-how').screenshot({path:`audit-visual/how-refinement/before-${width}.png`,style:'.topbar,.btn.is-docked{visibility:hidden!important}'});await p.close()}
await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
