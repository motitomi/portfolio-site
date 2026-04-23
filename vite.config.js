import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/guide/static-deploy#github-pages
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES ? '/portfolio-site/' : '/',
});
