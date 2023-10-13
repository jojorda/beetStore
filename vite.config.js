import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081,
  },

plugins: [react()],


})

// export default defineConfig({
//   server: {
//     port: 8081,
//     proxy: {
//       '/api/v1': {
//         target: 'https://api.beetpos.com',
//         changeOrigin: true,
//         // Opsional: PathRewrite untuk mengubah path permintaan jika diperlukan
//         // pathRewrite: { '^/api/v1/auth/customer/login': '' },
//       },
//     },
//     plugins: [react()],
//   },
// });
