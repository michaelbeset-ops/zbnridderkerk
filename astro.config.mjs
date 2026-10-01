// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Eigen repo; GitHub Pages op /zbn-zonwering.
export default defineConfig({
  site: 'https://michaelbeset-ops.github.io',
  base: '/zbn-zonwering',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
