import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Relative base path for universal deployment (GitHub Pages, WordPress, Root)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
