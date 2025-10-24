import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      allowedHosts:[ env.VITE_ALLOWED_HOST || "localhost"],
      // optional: allow localhost for fallback
      host: true,
      port: 3000,
    },
  };
});
