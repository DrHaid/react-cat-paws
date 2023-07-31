import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react-cat-paws/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["react-cat-paws"],
  },
});
