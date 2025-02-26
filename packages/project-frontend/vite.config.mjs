import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";
import checker from 'vite-plugin-checker'

export default defineConfig({
  // config options
  plugins: [react(), tailwindcss(), checker({ typescript: true })],
});
