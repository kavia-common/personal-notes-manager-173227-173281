/** Tailwind CSS configuration using the Ocean Professional theme */
module.exports = {
  content: [
    "./app.vue",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.ts",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // Blue
        secondary: "#F59E0B", // Amber
        success: "#F59E0B",
        error: "#EF4444",
        background: "#f9fafb",
        surface: "#ffffff",
        text: "#111827",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl: "0.9rem",
      },
      transitionTimingFunction: {
        "soft-out": "cubic-bezier(.22,.61,.36,1)",
      },
    },
  },
  plugins: [],
};
