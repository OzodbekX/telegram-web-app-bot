import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {

  return {
    plugins: [react()],
    server: {
      allowedHosts: ["0ebb029d7508.ngrok-free.app"],
      // optional: allow localhost for fallback
      host: true,
      port: 3000,
    },
  };
});
