/* https://nuxt.com/docs/api/configuration/nuxt-config */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  app: {
    head: {
      title: "Ocean Notes",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Personal notes manager - Ocean Professional" },
        { name: "theme-color", content: "#2563EB" }
      ],
      bodyAttrs: {
        class: "bg-[var(--color-background)] text-[var(--color-text)]"
      }
    },
    pageTransition: { name: "fade", mode: "out-in" }
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
