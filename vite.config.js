import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'chia',
      formats: ['es', 'umd', 'iife'],
      fileName: 'pawket'
    }
  }
});
