import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Using relative paths ensures it loads smoothly on GitHub Pages & any demo host
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
