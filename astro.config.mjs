// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Preview op GitHub Pages: https://michaelbeset-ops.github.io/zbnridderkerk/
// Bij livegang op het eigen domein: site op https://www.zbnridderkerk.nl, base weg, public/CNAME erbij.
export default defineConfig({
  site: 'https://michaelbeset-ops.github.io',
  base: '/zbnridderkerk',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // Scripts nooit inline, zodat de Content-Security-Policy ze zonder 'unsafe-inline' toestaat.
    build: { assetsInlineLimit: 0 },
  },
});
