import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// import { createVitePlugin } from 'vite-plugin-style-import';


export default defineConfig({

  plugins: [react(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  optimizeDeps: {
    exclude: ['file-saver']
  }
});
