import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: {
    minify: "esbuild", // Use esbuild (faster) or "terser" (slower but smaller)
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
        drop_debugger: true, // Remove debuggers
      },
      output: {
        comments: false, // Remove comments
      },
    },
  },
})
