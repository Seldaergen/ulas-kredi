import assert from 'node:assert/strict';
import fs from 'node:fs';
export const INNER_PAGES = [
 ['services','/hizmetler'],['guide','/rehber'],['category','/rehber?topic=kredi-notu'],
 ['article','/rehber/banka-ic-skor-nedir'],['process','/nasil-calisir'],
 ['contact','/iletisim'],['videos','/videolar'],['calculators','/#hesaplama']
];
export async function verifyInnerPages(browser, origin, phase='after') {
 const directory='artifacts/package5/screenshots/'+phase; fs.mkdirSync(directory,{recursive:true});
 for(const width of [1440,390]) for(const theme of ['dark','light']) {
  const context=await browser.newContext({viewport:{width,height:width===1440?1000:844},colorScheme:theme,reducedMotion:'reduce',isMobile:width===390,hasTouch:width===390});
  await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
  const page=await context.newPage();
  const errors=[];page.on('pageerror',error=>errors.push(error.name));
  for(const [name,path] of INNER_PAGES) {
   const response=await page.goto(origin+path);assert.equal(response.status(),200,path);
   await page.waitForFunction(value=>document.documentElement.dataset.theme===value,theme);
   await page.evaluate(()=>document.fonts.ready);
   if(name!=='calculators') {
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>{window.scrollTo({top:0,behavior:'instant'});requestAnimationFrame(resolve);} )));
    await page.waitForFunction(()=>window.scrollY===0);
   }
   if(name==='calculators') await page.locator('#hesaplama').scrollIntoViewIfNeeded();
   await page.screenshot({path:directory+'/'+name+'-'+width+'-'+theme+'.png',animations:'disabled'});
   if(phase!=='before') {
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow '+path+'/'+width+'/'+theme);
    assert.ok((await page.locator('h1').first().innerText()).trim(),path);
    if(name==='guide') {
     assert.equal(await page.locator('.ef-guide-card').count(),8);
     await page.getByLabel('Rehberlerde ara',{exact:true}).fill('iç');
     await page.getByRole('button',{name:'Ara',exact:true}).click();
     await page.locator('.ef-guide-card').first().waitFor();
     assert.match(await page.locator('.ef-guide-card').first().innerText(),/Banka İç Skoru/);
     await page.goto(origin+'/rehber?q=package5-no-result-fixture');
     assert.equal(await page.locator('.ef-guide-card').count(),0);
     await page.locator('.ef-empty').waitFor();
     await page.goto(origin+path);
    }
    if(name==='article') {
     const anchors=await page.locator('.ef-reading-map a').evaluateAll(links=>links.every(link=>document.getElementById(link.hash.slice(1))));
     assert.ok(anchors,'article contents link targets');
     assert.equal(await page.locator('.ef-article .ef-guide-art').count(),1);
    }
    if(name==='contact'&&width===390) {
     assert.ok(await page.evaluate(()=>document.querySelector('.ef-contact-form').getBoundingClientRect().top < document.querySelector('.ef-contact-info').getBoundingClientRect().top),'mobile form before contact cards');
    }
    if(name==='contact') assert.ok(await page.locator('.ef-contact-info button').evaluate(button => button.clientWidth >= 200 && button.scrollWidth <= button.clientWidth + 1),'Contact alternate-channel button contains its text');
    if ((width===1440&&theme==='dark') || (width===390&&theme==='light')) {
     const content = {services:'#hizmet-listesi [data-slot="card"]',guide:'.ef-guide-card',category:'.ef-guide-card',article:'.ef-article article h2',process:'.ef-timeline',contact:'.ef-contact-form',videos:'.ef-empty',calculators:'#hesaplama'}[name];
     await page.locator(content).first().scrollIntoViewIfNeeded();
     await page.screenshot({path:directory+'/content-'+name+'-'+width+'-'+theme+'.png',animations:'disabled'});
    }
    const cta=page.locator('[data-inner-cta]').first();
    await cta.waitFor();assert.match(await cta.getAttribute('href'),/iletisim|#basvuru|#iletisim/);
    await cta.click();
    if(name==='calculators') await page.locator('#iletisim form').waitFor();
    else await page.getByRole('form',{name:'Danışmanlık başvurusu'}).first().waitFor();
   }
  }
  assert.deepEqual(errors,[],'runtime errors '+width+'/'+theme);
  await context.close();console.log('PASS inner pages '+phase+' '+width+'/'+theme);
 }
}
