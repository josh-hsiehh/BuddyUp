import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',  // Ensures local connection
    port: 5174,         // Default port
    strictPort: true,
    watch: {
      usePolling: true, // Fixes some WebSocket issues
    }
  }
});
