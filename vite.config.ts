import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Configuración Legacy para soportar TVs antiguas con Chromium 53 (WebOS 4.5)
    legacy({
      targets: ['chrome >= 50'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  build: {
    // Configuración para mayor compatibilidad
    target: 'es2015',
    minify: 'terser',
  }
});
