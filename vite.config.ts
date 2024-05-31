import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      // workbox: {
      //   globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      //   runtimeCaching: [
      //     {
      //       urlPattern: ({ request }) => request.destination === 'image',
      //       handler: 'CacheFirst',
      //       options: {
      //         cacheName: 'images-cache',
      //         cacheableResponse: {
      //           statuses: [0, 200],
      //         },
      //       },
      //     },
      //     {
      //       urlPattern: ({ url }) => {
      //         return (
      //           url.href === 'http://localhost:3000/categories' ||
      //           url.href === 'http://localhost:3000/products'
      //         );
      //       },
      //       handler: 'NetworkFirst',
      //       options: {
      //         cacheName: 'api-cache',
      //         rangeRequests: true,
      //       },
      //     },
      //   ],
      // },
      manifest: {
        name: 'MiniMart',
        short_name: 'MiniMart',
        description: 'Tu abarrotes en linea mas confiable',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
