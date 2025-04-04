import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';  // No need for '@tailwindcss/vite'

// Export Vite configuration
export default defineConfig({
  root: './frontend/app',  // Set the root to your app folder
  plugins: [
    react(),tailwindcss()
    // Tailwind is already handled via PostCSS, so no need for a separate Vite plugin.
  ],
  server: {
    host: 'localhost',
    port: 5174,
    strictPort: true,
    watch: {
      usePolling: true, // Fix WebSocket issues if any
    }
  },
  build: {
    outDir: '../dist',  // Output build to /frontend/dist
  }
});
