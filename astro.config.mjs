// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Live op het eigen domein via GitHub Pages (public/CNAME). Terug naar preview op github.io: site
// https://michaelbeset-ops.github.io met base '/zbnridderkerk' en PUBLIC_PREVIEW '1' in de workflow.
export default defineConfig({
  site: 'https://www.zbnridderkerk.nl',
  trailingSlash: 'always',
  // Oude site (tot okt 2026) draaide op /home/index.php/...; die adressen staan nog in Google.
  // /home/index.php en /home/index_1.php staan als slimme doorstuurpagina in public/home/ (lezen de ?page=-parameter).
  // /showroom.html en /producten.html staan als los bestand in public/: een map met .html in de naam kan GitHub Pages niet goed serveren.
  redirects: { '/home/': '/', '/home/index/': '/' },
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: (pagina) => !pagina.includes('/bedankt/') })],
  vite: {
    plugins: [tailwindcss()],
    // Scripts nooit inline, zodat de Content-Security-Policy ze zonder 'unsafe-inline' toestaat.
    build: { assetsInlineLimit: 0 },
  },
});
