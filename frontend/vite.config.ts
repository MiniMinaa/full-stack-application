import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  // Serve the repo-level images folder so images/lamp_blue_light.png is available at /lamp_blue_light.png
  publicDir: resolve(__dirname, "../images"),
});
