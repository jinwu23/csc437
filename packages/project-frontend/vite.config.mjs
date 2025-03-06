import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  // config options
  plugins: [react(), tailwindcss(), checker({ typescript: true })],
  server: {
    proxy: {
      "/api": "http://localhost:3000", // Forwards all requests at localhost:5173/api/*
    },
  },
});
