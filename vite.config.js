import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration for the Election Assistant application.
 * Includes dev server proxy, production chunk splitting for optimal caching,
 * and environment variable defaults.
 *
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },

  build: {
    // Target modern browsers for smaller, faster output
    target: 'es2020',
    // Increase warning threshold slightly for chart library
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        /**
         * Split vendor libraries into separate cached chunks.
         * This means a page update only invalidates the app chunk,
         * not the large (and rarely changing) vendor libraries.
         */
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-charts': ['recharts'],
          'vendor-i18n': ['i18next', 'react-i18next'],
        },
      },
    },
  },
});
