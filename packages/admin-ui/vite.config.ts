import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Allows for cleaner imports, e.g., '@/components/Button'
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // This is useful for Docker development, ensuring the server is accessible
    host: '0.0.0.0',
    port: 5174, // Default port for the 'web' app
  },
})
