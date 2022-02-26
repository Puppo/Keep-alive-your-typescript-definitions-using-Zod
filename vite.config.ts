import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Keep-alive-your-typescript-definitions-using-Zod/',
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
  },
  plugins: [react(), eslintPlugin()],
});
