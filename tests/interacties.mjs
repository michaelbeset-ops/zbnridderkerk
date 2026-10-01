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
  const paginas = ['', 'producten/screens/', 'producten/binnenzonwering/', 'privacy/', 'algemene-voorwaarden/'];
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
    for (const [naam, sel] of [['Werkwijze', 'a[href$="#werkwijze"]'], ['Showroom', 'a[href$="#showroom"]'], ['Reviews', 'a[href$="#reviews"]'], ['Producten', '[data-menu] > ul > li:first-child > a']]) {
      await p.goto(base, { waitUntil: 'load' }); await tik('[data-menu-knop]'); await p.waitForTimeout(200);
      await p.locator('[data-menu] ' + (sel.startsWith('[data-menu]') ? sel.replace('[data-menu] ', '') : sel)).first().tap(); await p.waitForTimeout(1200);
      const id = naam.toLowerCase(); const t = await top('#' + id); const hb = await headerBottom();
      ok(`${tag} menu ${naam}: sluit en landt onder header`, await p.evaluate(() => document.querySelector('[data-menu]').classList.contains('hidden')) && t >= hb - 1 && t < hb + 60, `top ${t} header ${Math.round(hb)}`);
    }
    await p.goto(base, { waitUntil: 'load' }); await tik('[data-menu-knop]'); await p.waitForTimeout(200);
    await p.locator('[data-menu] a[href*="producten/markiezen"]').tap(); await p.waitForTimeout(300); await p.waitForLoadState('load');
    ok(`${tag} menu product Markiezen`, p.url().includes('markiezen'));
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
    await p.click('nav[aria-label="Hoofdmenu"] li.group ul a[href*="markiezen"]'); await p.waitForLoadState('load'); ok(`${tag} dropdown Markiezen`, p.url().includes('markiezen'));
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
  // Pills: elke pill naar de juiste pagina
  for (const slug of ['knikarmschermen', 'rolluiken', 'binnenzonwering']) {
    await p.goto(base, { waitUntil: 'load' }); await tik(`nav[aria-label="Snel naar een product"] a[href*="${slug}"]`); await p.waitForLoadState('load'); ok(`${tag} pill ${slug}`, p.url().includes(slug));
  }
  // Productkaarten
  await p.goto(base, { waitUntil: 'load' }); await tik('#producten li a[href*="garagedeuren"]'); await p.waitForLoadState('load'); ok(`${tag} productkaart garagedeuren`, p.url().includes('garagedeuren'));
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
  await p.route('https://api.web3forms.com/submit', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' }));
  await p.goto(base + '?product=screens#offerte', { waitUntil: 'load' }); await p.waitForTimeout(400);
  ok(`${tag} formulier product vooringevuld`, (await p.inputValue('#product')) === 'Screens');
  await tik('[data-verstuur]'); await p.waitForTimeout(400);
  ok(`${tag} formulier leeg: 3 fouten, focus Naam`, (await p.locator('[data-fout]:not(.hidden)').count()) === 3 && (await p.evaluate(() => document.activeElement?.id)) === 'naam');
  await p.fill('#mail', 'fout'); await p.locator('#mail').blur(); await p.waitForTimeout(100);
  ok(`${tag} formulier ongeldig e-mail`, !(await p.locator('#mail-fout').evaluate((e) => e.classList.contains('hidden'))));
  await p.fill('#naam', 'Test'); await p.fill('#tel', '0612345678'); await p.fill('#mail', 'test@example.com');
  await p.setInputFiles('#fotos', [{ name: 'a.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64') }]);
  await p.waitForTimeout(200); ok(`${tag} formulier fotopreview`, (await p.locator('[data-previews] li').count()) === 1);
  await p.setInputFiles('#fotos', [{ name: 'groot.png', mimeType: 'image/png', buffer: Buffer.alloc(6 * 1024 * 1024) }]); await p.waitForTimeout(200);
  ok(`${tag} formulier foto te groot geweigerd`, !(await p.locator('#fotos-fout').evaluate((e) => e.classList.contains('hidden'))));
  await p.setInputFiles('#fotos', []); await p.waitForTimeout(100);
  const key = await p.getAttribute('[data-offerte]', 'data-key');
  await tik('[data-verstuur]'); await p.waitForTimeout(1200);
  if (key) { ok(`${tag} formulier bevestiging`, await p.locator('[data-klaar]').isVisible()); await tik('[data-nog-een]'); await p.waitForTimeout(300); ok(`${tag} formulier nog een aanvraag`, await p.locator('#naam').isVisible()); }
  else ok(`${tag} formulier zonder key: nette melding`, (await p.textContent('[data-status]')).includes('nog niet gekoppeld'));
  // Afsluiter
  await p.goto(base, { waitUntil: 'load' }); await tik('main > section:last-of-type a.btn-groen'); await p.waitForTimeout(900); ok(`${tag} afsluiter Offerte`, Math.abs((await top('#offerte')) - (await headerBottom())) < 60);
  // Footer
  ok(`${tag} footer privacy`, (await p.request.get(base + 'privacy/')).status() === 200);
  ok(`${tag} footer voorwaarden`, (await p.request.get(base + 'algemene-voorwaarden/')).status() === 200);
  ok(`${tag} footer Sitefront`, (await p.getAttribute('footer a[href*="sitefront"]', 'target')) === '_blank');
  // Productpagina
  await p.goto(base + 'producten/screens/', { waitUntil: 'load' });
  for (const [naam, sel, verwacht] of [['kruimel Home', 'nav[aria-label="Kruimelpad"] a[href$="/zbnridderkerk/"]', base], ['kruimel Producten', 'nav[aria-label="Kruimelpad"] a[href*="#producten"]', '#producten']]) {
    await p.goto(base + 'producten/screens/', { waitUntil: 'load' }); await tik(sel); await p.waitForLoadState('load'); await p.waitForTimeout(600); ok(`${tag} ${naam}`, p.url().includes(verwacht));
  }
  await p.goto(base + 'producten/screens/', { waitUntil: 'load' });
  ok(`${tag} product hero Offerte`, (await p.getAttribute('h1 ~ * a.btn-groen, section a.btn-groen', 'href')).includes('product=screens#offerte'));
  ok(`${tag} product Bel`, (await p.getAttribute('section a[href^="tel"]', 'href')) === 'tel:+31180430211');
  await tik('details summary'); await p.waitForTimeout(200); ok(`${tag} FAQ opent`, (await p.locator('details[open]').count()) === 1);
  await tik('details summary'); await p.waitForTimeout(200); ok(`${tag} FAQ sluit`, (await p.locator('details[open]').count()) === 0);
  await tik('a.btn-wit[href$="#showroom"]'); await p.waitForLoadState('load'); await p.waitForTimeout(700); ok(`${tag} doek -> showroom`, p.url().includes('#showroom') && Math.abs((await top('#showroom')) - (await headerBottom())) < 60);
  await p.goto(base + 'producten/screens/', { waitUntil: 'load' });
  await tik('aside a.btn-wit'); await p.waitForLoadState('load'); await p.waitForTimeout(600); ok(`${tag} zijblok Offerte -> ingevuld`, (await p.inputValue('#product')) === 'Screens');
  await p.goto(base + 'producten/screens/', { waitUntil: 'load' });
  await tik('[data-galerij] [data-foto]'); await p.waitForTimeout(300); ok(`${tag} lightbox opent`, await p.evaluate(() => document.querySelector('[data-lightbox]').open));
  await p.keyboard.press('Escape'); await p.waitForTimeout(200); ok(`${tag} lightbox Escape`, !(await p.evaluate(() => document.querySelector('[data-lightbox]').open)));
  await tik('[data-galerij] [data-foto]'); await p.waitForTimeout(300); await tik('[data-lightbox-dicht]'); await p.waitForTimeout(200); ok(`${tag} lightbox sluitknop`, !(await p.evaluate(() => document.querySelector('[data-lightbox]').open)));
  await p.goto(base + 'producten/screens/', { waitUntil: 'load' });
  const brede = p.locator('section.wrap.pb-14 a.btn-wit, section a.btn-wit[href*="product=screens"]').last();
  ok(`${tag} brede offertebalk href`, (await brede.getAttribute('href')).includes('product=screens#offerte'));
  await tik('section[aria-labelledby="verwant"] li a'); await p.waitForLoadState('load'); ok(`${tag} verwant product`, /producten\/(rolluiken|uitvalschermen|knikarmschermen)/.test(p.url()), p.url().replace(base, '/'));
  await p.goto(base + 'producten/screens/', { waitUntil: 'load' }); await tik('section[aria-labelledby="verwant"] a[href*="#producten"]'); await p.waitForLoadState('load'); await p.waitForTimeout(600); ok(`${tag} Alle producten`, p.url().includes('#producten'));
  // 404
  const r404 = await p.goto(base + 'bestaat-niet/', { waitUntil: 'load' }); ok(`${tag} 404 pagina`, r404.status() === 404 && (await p.locator('h1').textContent()).includes('bestaat niet'));
  await tik('main a.btn-groen'); await p.waitForLoadState('load'); ok(`${tag} 404 -> home`, p.url() === base);
  ok(`${tag} geen JS-fouten`, jsf.length === 0, jsf.join(' ; ').slice(0, 120));
  await ctx.close();
}
await browser.close(); await server.stop();
console.log(out.join('\n'));
console.log(`\n${out.filter((l) => l.startsWith('FOUT')).length} fout van ${out.length}`);
