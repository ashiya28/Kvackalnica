export const API_BASE =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.VITE_API_URL) ||
  "http://localhost:5000";
