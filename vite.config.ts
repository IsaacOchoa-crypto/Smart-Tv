import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    // Configuración Legacy para soportar TVs antiguas con Chromium 68+
    legacy({
      targets: ['chrome >= 68'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  build: {
    // Configuración para mayor compatibilidad
    target: 'es2015',
    minify: 'terser',
  }
});
