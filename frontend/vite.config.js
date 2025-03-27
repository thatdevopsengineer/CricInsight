import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Provider } from 'react-redux';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://cric-insight-blush.vercel.app',
//         changeOrigin: true,
//       }
//     }
//   }
// })


export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-redux'], // Ensure react-redux is pre-bundled
  },
});
