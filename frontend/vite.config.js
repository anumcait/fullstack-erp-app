import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    origin: 'http://frontend:5173', // ✅ this replaces `allowedHosts`
    watch: {
      usePolling: true,
    },
  },
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   preview: {
//     host: '0.0.0.0',
//     port: parseInt(process.env.PORT) || 4173,
//     strictPort: true,
//     allowedHosts: ['fullstack-hr-app-frontend.onrender.com'],
//   },
//   server: {
//     host: '0.0.0.0',
//     port: parseInt(process.env.PORT) || 5173,
//       strictPort: true,
//   watch: {
//     usePolling: true,
//   },
//   },
// });
