import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
  enabled: true,
},

      manifest: {
        name: 'Ritual',
        short_name: 'Ritual',

        description:
          'Explora y conquista cafeterías',

        theme_color: '#141414',
        background_color: '#141414',

        display: 'standalone',

        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})