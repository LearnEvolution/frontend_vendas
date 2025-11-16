import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,  // ajuda no Linux e Android
    },
  },
  build: {
    sourcemap: false,
  },
  define: {
    __APP_VERSION__: JSON.stringify(Date.now()) // força o navegador recarregar sempre
  }
});
