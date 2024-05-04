import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      'app': fileURLToPath(new URL('./src/app', import.meta.url)),
      'entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
      'features': fileURLToPath(new URL('./src/features', import.meta.url)),
      'pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      'shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      'types': fileURLToPath(new URL('./src/types', import.meta.url))
    }
  }
})
