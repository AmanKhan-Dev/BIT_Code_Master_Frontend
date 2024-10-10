import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // This allows access from any IP
    port: 5173, // You can choose any port
  },
  plugins: [react()],

})
