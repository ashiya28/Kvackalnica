export const API_BASE = (() => {
  // Vite runtime (dev/build)
  try {
    // import.meta obstaja samo v ESM/Vite okolju
    if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }
  } catch (_) {
    // Jest/Node bo lahko vrgel error - ignoriramo
  }

  // Jest/Node fallback (možnost, če želiš env v testih)
  if (typeof process !== "undefined" && process.env?.VITE_API_URL) {
    return process.env.VITE_API_URL;
  }

  // Local dev fallback
  return "http://localhost:5000";
})();
