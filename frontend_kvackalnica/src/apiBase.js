const viteEnv =
  typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : {};

export const API_BASE =
  viteEnv.VITE_API_URL || process.env.VITE_API_URL || "http://localhost:5000";
