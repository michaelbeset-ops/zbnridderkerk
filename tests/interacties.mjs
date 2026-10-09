// Volledige interactietest: alle pagina's, alle links, alle knoppen, mobiel en desktop. Resultaat als lijst met OK/FOUT.
import { chromium } from 'playwright';
import { preview } from 'astro';
const server = await preview({ root: process.cwd(), logLevel: 'silent' });
const base = `http://localhost:${server.port}/zbnridderkerk/`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const out = [];
const ok = (naam, cond, extra = '') => out.push(`${cond ? 'OK  ' : 'FOUT'} ${naam}${extra ? ' | ' + extra : ''}`);

for (const [w, h, touch] of [[390, 844, true], [1440, 900, false]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: touch });
  const p = await ctx.newPage(); p.setDefaultTimeout(8000); p.setDefaultNavigationTimeout(12000);
  const jsf = []; p.on('pageerror', (e) => jsf.push(e.message));
  const tag = `[${w}]`;
  const headerBottom = () => p.evaluate(() => document.querySelector('header').getBoundingClientRect().bottom);
  const top = (sel) => p.evaluate((s) => Math.round(document.querySelector(s)?.getBoundingClientRect().top ?? -9999), sel);
  // Pagina in rust voor elke tik: smooth scroll uit en even wachten, anders telt een tik tijdens scrollen als scroll.
  const tik = async (sel) => { const el = p.locator(sel).first();
    // Horizontaal via Playwright (werkt met snap-rijen), verticaal zelf centreren, dan wachten tot niets meer beweegt.
    await el.scrollIntoViewIfNeeded();
    await el.evaluate((e) => { document.documentElement.style.scrollBehavior = 'auto'; const r = e.getBoundingClientRect(); window.scrollBy(0, r.top + r.height / 2 - innerHeight / 2); });
    let vorige = -1; for (let i = 0; i < 20; i++) { const nu = await el.evaluate((e) => { const r = e.getBoundingClientRect(); return Math.round(r.x) * 100000 + Math.round(r.y); }); if (nu === vorige) break; vorige = nu; await p.waitForTimeout(100); } const b = await el.boundingBox(); if (touch) await p.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2); else await el.click();
    // Na de tik: eventuele navigatie laten doorkomen voordat de test het adres bekijkt.
    await p.waitForTimeout(1500); await p.waitForLoadState('load'); };

  // Elke interne link op elke pagina: bestaat het doel en, bij een anker, het id?
  const paginas = ['', 'buitenzonwering/', 'binnenzonwering/', 'producten/screens/', 'producten/shutters/', 'producten/markiezen/', 'producten/motoren/', 'producten/zonweringsdoek/', 'producten/dakramen-velux/', 'privacy/', 'algemene-voorwaarden/'];
  for (const pad of paginas) {
    await p.goto(base + pad, { waitUntil: 'load' });
    const links = await p.evaluate(() => Array.from(document.querySelectorAll('a[href]')).map((a) => a.getAttribute('href')));
    const intern = [...new Set(links.filter((l) => !/^(https?:|mailto:|tel:)/.test(l)))];
    for (const l of intern) {
      const u = new URL(l, base + pad); const r = await p.request.get(u.href.split('#')[0]);
      let anker = true; if (u.hash) { const html = await r.text(); anker = html.includes(`id="${u.hash.slice(1)}"`); }
      ok(`${tag} link ${pad || '/'} -> ${l}`, r.status() === 200 && anker, r.status() + (anker ? '' : ' anker ontbreekt'));
    }
  }

  // Home: menu
  await p.goto(base, { waitUntil: 'load' });
  if (touch) {
    await tik('[data-menu-knop]'); await p.waitForTimeout(250);
    ok(`${tag} menu opent`, await p.evaluate(() => !document.querySelector('[data-menu]').classList.contains('hidden')));
    ok(`${tag} menu: aria-expanded`, (await p.getAttribute('[data-menu-knop]', 'aria-expanded')) === 'true');
    ok(`${tag} menu: knop toont kruis`, await p.evaluate(() => !document.querySelector('[data-dicht-icoon]').classList.contains('hidden')));
    for (const [naam, sel] of [['Werkwijze', 'a[href$="#werkwijze"]'], ['Showroom', 'a[href$="#showroom"]'], ['Reviews', 'a[href$="#reviews"]']]) {
      await p.goto(base, { waitUntil: 'load' }); await tik('[data-menu-knop]'); await p.waitForTimeout(200);
      await p.locator('[data-menu] ' + (sel.startsWith('[data-menu]') ? sel.replace('[data-menu] ', '') : sel)).first().tap(); await p.waitForTimeout(1200);
      const id = naam.toLowerCase(); const t = await top('#' + id); const hb = await headerBottom();
      ok(`${tag} menu ${naam}: sluit en landt onder header`, await p.evaluate(() => document.querySelector('[data-menu]').classList.contains('hidden')) && t >= hb - 1 && t < hb + 60, `top ${t} header ${Math.round(hb)}`);
    }
    // Uitklapgroepen Buiten en Binnen: groep opent, product en categorielink werken.
    await p.goto(base, { waitUntil: 'load' }); await tik('[data-menu-knop]'); await p.waitForTimeout(200);
    await p.locator('[data-menu] details summary').first().tap(); await p.waitForTimeout(300);
    ok(`${tag} menu groep Buiten opent`, await p.evaluate(() => document.querySelector('[data-menu] details').open));
    await p.locator('[data-menu] a[href*="producten/zipscreens"]').tap(); await p.waitForTimeout(300); await p.waitForLoadState('load');
    ok(`${tag} menu product Zipscreens`, p.url().includes('zipscreens'));
    await p.goto(base, { waitUntil: 'load' }); await tik('[data-menu-knop]'); await p.waitForTimeout(200);
    await p.locator('[data-menu] details summary').nth(1).tap(); await p.waitForTimeout(300);
    await p.locator('[data-menu] a[href*="producten/shutters"]').tap(); await p.waitForTimeout(300); await p.waitForLoadState('load');
    ok(`${tag} menu product Shutters (Binnen)`, p.url().includes('shutters'));
    await p.goto(base, { waitUntil: 'load' }); await tik('[data-menu-knop]'); await p.waitForTimeout(200);
    await p.locator('[data-menu] details summary').first().tap(); await p.waitForTimeout(300);
    await p.locator('[data-menu] details a[href*="buitenzonwering/"]').tap(); await p.waitForTimeout(300); await p.waitForLoadState('load');
    ok(`${tag} menu Alle buitenzonwering`, p.url().includes('buitenzonwering/'));
    await p.goto(base, { waitUntil: 'load' }); await tik('[data-menu-knop]'); await p.waitForTimeout(200);
    const belHref = await p.getAttribute('[data-menu] a[href^="tel"]', 'href'); ok(`${tag} menu belknop`, belHref === 'tel:+31180430211', belHref);
    await p.touchscreen.tap(195, 820); await p.waitForTimeout(250);
    ok(`${tag} menu sluit bij tik buiten`, await p.evaluate(() => document.querySelector('[data-menu]').classList.contains('hidden')));
    // Vaste balk
    ok(`${tag} balk Bellen`, (await p.getAttribute('div.fixed a[href^="tel"]', 'href')) === 'tel:+31180430211');
    await tik('div.fixed a[href*="offerte"]'); await p.waitForTimeout(900); ok(`${tag} balk Offerte landt`, Math.abs((await top('#offerte')) - (await headerBottom())) < 60, `top ${await top('#offerte')}`);
  } else {
    // Desktop: dropdown op hover, menulinks, knoppen in de navigatie
    await p.hover('nav[aria-label="Hoofdmenu"] li.group > a'); await p.waitForTimeout(300);
    ok(`${tag} productdropdown zichtbaar op hover`, await p.evaluate(() => getComputedStyle(document.querySelector('nav[aria-label="Hoofdmenu"] li.group ul')).visibility === 'visible'));
    await p.click('nav[aria-label="Hoofdmenu"] li.group ul a[href*="zipscreens"]'); await p.waitForLoadState('load'); ok(`${tag} dropdown Zipscreens`, p.url().includes('zipscreens'));
    await p.goto(base, { waitUntil: 'load' }); await p.hover('nav[aria-label="Hoofdmenu"] li.group:nth-child(2) > a'); await p.waitForTimeout(300);
    await p.click('nav[aria-label="Hoofdmenu"] li.group:nth-child(2) ul a[href*="shutters"]'); await p.waitForLoadState('load'); ok(`${tag} dropdown Binnen Shutters`, p.url().includes('shutters'));
    await p.goto(base, { waitUntil: 'load' }); await p.click('nav[aria-label="Hoofdmenu"] li.group:nth-child(2) > a'); await p.waitForLoadState('load'); ok(`${tag} nav Binnen -> categoriepagina`, p.url().includes('binnenzonwering/'));
    await p.goto(base, { waitUntil: 'load' });
    await p.keyboard.press('Tab'); for (let i = 0; i < 4; i++) await p.keyboard.press('Tab');
    ok(`${tag} dropdown opent met toetsenbord (focus-within)`, await p.evaluate(() => getComputedStyle(document.querySelector('nav[aria-label="Hoofdmenu"] li.group ul')).visibility === 'visible'));
    for (const naam of ['Werkwijze', 'Showroom', 'Reviews']) {
      await p.goto(base, { waitUntil: 'load' }); await p.click(`nav[aria-label="Hoofdmenu"] a[href$="#${naam.toLowerCase()}"]`); await p.waitForTimeout(900);
      const t = await top('#' + naam.toLowerCase()); const hb = await headerBottom();
      ok(`${tag} nav ${naam} landt onder header`, t >= hb - 1 && t < hb + 60, `top ${t} header ${Math.round(hb)}`);
    }
    await p.goto(base, { waitUntil: 'load' }); await p.click('header a.btn-groen'); await p.waitForTimeout(900); ok(`${tag} nav Offerte landt`, Math.abs((await top('#offerte')) - (await headerBottom())) < 60);
    ok(`${tag} nav belknop`, (await p.getAttribute('header a[href^="tel"]', 'href')) === 'tel:+31180430211');
    await p.click('header a[aria-label*="homepage"]'); await p.waitForLoadState('load'); ok(`${tag} logo -> home`, p.url() === base);
    // Reviews pijlen
    await p.goto(base + '#reviews', { waitUntil: 'load' }); await p.waitForTimeout(300);
    await p.click('[data-slider-volgende]'); await p.waitForTimeout(600); const sl = await p.evaluate(() => document.querySelector('[data-slider]').scrollLeft);
    await p.click('[data-slider-vorige]'); await p.waitForTimeout(600); const sl2 = await p.evaluate(() => document.querySelector('[data-slider]').scrollLeft);
    ok(`${tag} reviews pijlen`, sl > 100 && sl2 < sl, `${sl} -> ${sl2}`);
  }

  // Hero knoppen
  await p.goto(base, { waitUntil: 'load' });
  await tik('main a.btn-wit[href$="#offerte"]'); await p.waitForTimeout(900); ok(`${tag} hero Offerte`, Math.abs((await top('#offerte')) - (await headerBottom())) < 60);
  await p.goto(base, { waitUntil: 'load' });
  await tik('main a[href$="#producten"]'); await p.waitForTimeout(900); ok(`${tag} hero Bekijk producten`, Math.abs((await top('#producten')) - (await headerBottom())) < 60);
  ok(`${tag} hero Google-link`, (await p.getAttribute('main a[href*="google.com/maps"]', 'target')) === '_blank' && (await p.getAttribute('main a[href*="google.com/maps"]', 'rel')) === 'noopener');
  // Tegels en productpillen op de homepage
  for (const [naam, sel, verwacht] of [['tegel Buiten', '#producten a[href*="buitenzonwering/"]', 'buitenzonwering/'], ['tegel Binnen', '#producten a[href*="binnenzonwering/"]', 'binnenzonwering/'], ['pill garagedeuren', '#producten li a[href*="garagedeuren"]', 'garagedeuren'], ['pill horren', '#producten li a[href*="producten/horren"]', 'horren'], ['Alle binnenzonwering', '#producten li a[href*="binnenzonwering/"]', 'binnenzonwering/']]) {
    await p.goto(base, { waitUntil: 'load' }); await tik(sel); await p.waitForLoadState('load'); ok(`${tag} ${naam}`, p.url().includes(verwacht), p.url().replace(base, '/'));
  }
  // Categoriepagina: kaart naar product, offerteknop op de kaart, link naar de andere categorie
  await p.goto(base + 'buitenzonwering/', { waitUntil: 'load' }); await tik('ul li h3 a[href*="rolpoorten"]'); await p.waitForLoadState('load'); ok(`${tag} categorie kaart rolpoorten`, p.url().includes('rolpoorten'));
  await p.goto(base + 'buitenzonwering/', { waitUntil: 'load' }); await tik('ul li a.btn-lijn[href*="product=rolpoorten"]'); await p.waitForLoadState('load'); await p.waitForTimeout(600); ok(`${tag} categorie kaart Offerte -> ingevuld`, await p.isChecked('input[name="product-keuze"][value="Rolpoorten"]'));
  await p.goto(base + 'buitenzonwering/', { waitUntil: 'load' }); await tik('main a[href*="binnenzonwering/"]'); await p.waitForLoadState('load'); ok(`${tag} categorie -> andere categorie`, p.url().includes('binnenzonwering/'));
  await p.goto(base + 'binnenzonwering/', { waitUntil: 'load' }); ok(`${tag} binnenzonwering 12 kaarten`, (await p.locator('main ul li h3').count()) === 12);
  // Werkwijze knoppen
  await p.goto(base, { waitUntil: 'load' }); await tik('#werkwijze a.btn-groen'); await p.waitForTimeout(900); ok(`${tag} werkwijze Offerte`, Math.abs((await top('#offerte')) - (await headerBottom())) < 60);
  ok(`${tag} werkwijze Bel`, (await p.getAttribute('#werkwijze a[href^="tel"]', 'href')) === 'tel:+31180430211');
  // Showroom
  await p.goto(base, { waitUntil: 'load' });
  ok(`${tag} Plan route`, (await p.getAttribute('#showroom a.btn-groen', 'href')).includes('google.com/maps/dir') && (await p.getAttribute('#showroom a.btn-groen', 'target')) === '_blank');
  ok(`${tag} showroom mail`, (await p.getAttribute('#showroom a[href^="mailto"]', 'href')) === 'mailto:zonwering@zbnridderkerk.nl');
  ok(`${tag} vandaag gemarkeerd`, (await p.locator('#showroom tr.text-groen').count()) === 1);
  // Reviews link
  ok(`${tag} reviews Google-link`, (await p.getAttribute('#reviews a[href*="google"]', 'target')) === '_blank');
  // Formulier compleet: validatie, foto, verzenden (gemockt), bevestiging, nog een aanvraag
  let verstuurd = '';
  await p.route('https://api.web3forms.com/submit', (r) => { verstuurd = r.request().postData() ?? ''; return r.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' }); });
  await p.goto(base + '?product=screens#offerte', { waitUntil: 'load' }); await p.waitForTimeout(400);
  ok(`${tag} formulier product vooringevuld`, await p.isChecked('input[name="product-keuze"][value="Screens"]') && (await p.textContent('[data-keuze-tekst]')) === 'Screens');
  await tik('[data-producten] summary'); await p.waitForTimeout(200);
  await p.locator('input[name="product-keuze"][value="Rolluiken"]').check(); await p.locator('input[name="product-keuze"][value="Horren"]').check();
  ok(`${tag} formulier meerdere producten`, (await p.textContent('[data-keuze-tekst]')) === 'Rolluiken, Screens, Horren');
  await tik('#naam'); ok(`${tag} productlijst klapt dicht bij klik buiten`, !(await p.evaluate(() => document.querySelector('[data-producten]').open)));
  await tik('[data-verstuur]'); await p.waitForTimeout(400);
  ok(`${tag} formulier leeg: 4 fouten (naam, straat, plaats, telefoon), focus Naam`, (await p.locator('[data-fout]:not(.hidden)').count()) === 4 && (await p.evaluate(() => document.activeElement?.id)) === 'naam');
  await p.fill('#mail', 'fout'); await p.locator('#mail').blur(); await p.waitForTimeout(100);
  ok(`${tag} formulier ongeldig e-mail`, !(await p.locator('#mail-fout').evaluate((e) => e.classList.contains('hidden'))));
  await p.fill('#naam', 'Test'); await p.fill('#straat', 'Teststraat 1'); await p.fill('#plaats', 'Ridderkerk'); await p.fill('#tel', '0612345678'); await p.fill('#mail', 'test@example.com');
  await p.setInputFiles('#fotos', [{ name: 'a.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64') }]);
  await p.waitForTimeout(200); ok(`${tag} formulier fotopreview`, (await p.locator('[data-previews] li').count()) === 1);
  await p.setInputFiles('#fotos', [{ name: 'groot.png', mimeType: 'image/png', buffer: Buffer.alloc(6 * 1024 * 1024) }]); await p.waitForTimeout(200);
  ok(`${tag} formulier foto te groot geweigerd`, !(await p.locator('#fotos-fout').evaluate((e) => e.classList.contains('hidden'))));
  await p.setInputFiles('#fotos', []); await p.waitForTimeout(100);
  const key = await p.getAttribute('[data-offerte]', 'data-key');
  await tik('[data-verstuur]'); await p.waitForTimeout(1200);
  if (key) { ok(`${tag} formulier stuurt producten samen mee`, verstuurd.includes('Rolluiken, Screens, Horren') && !verstuurd.includes('product-keuze')); ok(`${tag} formulier bevestiging`, await p.locator('[data-klaar]').isVisible()); await tik('[data-nog-een]'); await p.waitForTimeout(300); ok(`${tag} formulier nog een aanvraag`, await p.locator('#naam').isVisible()); }
  else ok(`${tag} formulier zonder key: nette melding`, (await p.textContent('[data-status]')).includes('nog niet gekoppeld'));
  // Afsluiter
  await p.goto(base, { waitUntil: 'load' }); await tik('main > section:last-of-type a.btn-groen'); await p.waitForTimeout(900); ok(`${tag} afsluiter Offerte`, Math.abs((await top('#offerte')) - (await headerBottom())) < 60);
  // Footer
  ok(`${tag} footer privacy`, (await p.request.get(base + 'privacy/')).status() === 200);
  ok(`${tag} footer voorwaarden`, (await p.request.get(base + 'algemene-voorwaarden/')).status() === 200);
  ok(`${tag} footer Sitefront`, (await p.getAttribute('footer a[href*="sitefront"]', 'target')) === '_blank');
  // Productpagina
  await p.goto(base + 'producten/screens/', { waitUntil: 'load' });
  for (const [naam, sel, verwacht] of [['kruimel Home', 'nav[aria-label="Kruimelpad"] a[href$="/zbnridderkerk/"]', base], ['kruimel Buitenzonwering', 'nav[aria-label="Kruimelpad"] a[href*="buitenzonwering/"]', 'buitenzonwering/']]) {
    await p.goto(base + 'producten/screens/', { waitUntil: 'load' }); await tik(sel); await p.waitForLoadState('load'); await p.waitForTimeout(600); ok(`${tag} ${naam}`, p.url().includes(verwacht));
  }
  await p.goto(base + 'producten/screens/', { waitUntil: 'load' });
  ok(`${tag} product hero Offerte`, (await p.getAttribute('h1 ~ * a.btn-groen, section a.btn-groen', 'href')).includes('product=screens#offerte'));
  ok(`${tag} product Bel`, (await p.getAttribute('section a[href^="tel"]', 'href')) === 'tel:+31180430211');
  await tik('main details summary'); await p.waitForTimeout(200); ok(`${tag} FAQ opent`, (await p.locator('main details[open]').count()) === 1);
  await tik('main details summary'); await p.waitForTimeout(200); ok(`${tag} FAQ sluit`, (await p.locator('main details[open]').count()) === 0);
  await tik('a.btn-wit[href$="#showroom"]'); await p.waitForLoadState('load'); await p.waitForTimeout(700); ok(`${tag} doek -> showroom`, p.url().includes('#showroom') && Math.abs((await top('#showroom')) - (await headerBottom())) < 60);
  await p.goto(base + 'producten/screens/', { waitUntil: 'load' });
  await tik('aside a.btn-wit'); await p.waitForLoadState('load'); await p.waitForTimeout(600); ok(`${tag} zijblok Offerte -> ingevuld`, await p.isChecked('input[name="product-keuze"][value="Screens"]'));
  await p.goto(base + 'producten/screens/', { waitUntil: 'load' });
  await tik('[data-galerij] [data-foto]'); await p.waitForTimeout(300); ok(`${tag} lightbox opent`, await p.evaluate(() => document.querySelector('[data-lightbox]').open));
  await p.keyboard.press('Escape'); await p.waitForTimeout(200); ok(`${tag} lightbox Escape`, !(await p.evaluate(() => document.querySelector('[data-lightbox]').open)));
  await tik('[data-galerij] [data-foto]'); await p.waitForTimeout(300); await tik('[data-lightbox-dicht]'); await p.waitForTimeout(200); ok(`${tag} lightbox sluitknop`, !(await p.evaluate(() => document.querySelector('[data-lightbox]').open)));
  await p.goto(base + 'producten/screens/', { waitUntil: 'load' });
  const brede = p.locator('section.wrap.pb-14 a.btn-wit, section a.btn-wit[href*="product=screens"]').last();
  ok(`${tag} brede offertebalk href`, (await brede.getAttribute('href')).includes('product=screens#offerte'));
  await tik('section[aria-labelledby="verwant"] li a'); await p.waitForLoadState('load'); ok(`${tag} verwant product`, /producten\/(zipscreens|rolluiken|uitvalschermen)/.test(p.url()), p.url().replace(base, '/'));
  await p.goto(base + 'producten/screens/', { waitUntil: 'load' }); await tik('section[aria-labelledby="verwant"] a[href*="buitenzonwering/"]'); await p.waitForLoadState('load'); ok(`${tag} Alle buitenzonwering`, p.url().includes('buitenzonwering/'));
  // 404
  const r404 = await p.goto(base + 'bestaat-niet/', { waitUntil: 'load' }); ok(`${tag} 404 pagina`, r404.status() === 404 && (await p.locator('h1').textContent()).includes('bestaat niet'));
  await tik('main a.btn-groen'); await p.waitForLoadState('load'); ok(`${tag} 404 -> home`, p.url() === base);
  ok(`${tag} geen JS-fouten`, jsf.length === 0, jsf.join(' ; ').slice(0, 120));
  await ctx.close();
}
await browser.close(); await server.stop();
console.log(out.join('\n'));
console.log(`\n${out.filter((l) => l.startsWith('FOUT')).length} fout van ${out.length}`);
