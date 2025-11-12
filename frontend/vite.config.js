import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Client port
    proxy: {
      '/api': {
        target: 'http://localhost:5005', // Your Node.js backend port
        changeOrigin: true,
      },
    },
  },
})
