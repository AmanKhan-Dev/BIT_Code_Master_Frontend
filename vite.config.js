import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Allows access from any IP during local development
    port: 5173,      // You can choose any port for local development
  },
  plugins: [react()],
  base: '/', // Ensure the base path is set correctly for deployment
});
