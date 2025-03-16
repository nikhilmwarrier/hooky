import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    svelte(),
    VitePWA({
      includeAssets: ["fonts/**/*.ttf", "manifest.json", "favicon.ico"],
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      // Use /public/manifest.json instead
      manifest: false,
      manifestFilename: "manifest.json",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
});
