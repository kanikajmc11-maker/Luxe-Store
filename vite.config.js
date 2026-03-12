import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://luxestore.in',
      routes: ['/', '/shop', '/categories', '/product/:id', '/cart', '/wishlist', '/about', '/contact'],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
