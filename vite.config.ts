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
      'shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      'types': fileURLToPath(new URL('./src/types', import.meta.url))
    }
  }
})
