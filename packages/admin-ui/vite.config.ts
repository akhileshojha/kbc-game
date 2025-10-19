import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Crucial for Docker: ensures the server is accessible outside the container
    host: '0.0.0.0',
    // Match the port in docker-compose.yml
    port: 5174,
  },
})
