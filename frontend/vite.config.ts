import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/v1/signup": "https://brainly-backend-kbmk.onrender.com",
      "/api/v1/signin": "https://brainly-backend-kbmk.onrender.com",
    }
  }
})
