import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // naloži samo VITE_ env spremenljivke
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react()],
    define: {
      "process.env": env,
    },
  };
});
