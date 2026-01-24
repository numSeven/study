import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import pages from 'vite-plugin-pages'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss(), pages()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
