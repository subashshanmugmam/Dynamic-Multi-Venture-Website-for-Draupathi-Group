import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to 1000 kB
  },
  server: {
    port: 5173,
    host: true, // Allow external connections
    // This allows your ngrok domain
    allowedHosts: [
      '.ngrok-free.app', // For newer ngrok domains
      '.ngrok-free.dev'  // For the domain you are currently using
    ],
    // Proxy API requests to backend to avoid CORS issues
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    },
    cors: {
      origin: '*',
      credentials: true
    }
  }
})