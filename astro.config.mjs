import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://compounding.cc.cd',
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});