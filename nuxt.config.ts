// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/image",
    "@vercel/analytics/nuxt",
  ],
  css: ["~/assets/css/tokens.css"],
  fonts: {
    families: [
      { name: "EB Garamond", provider: "google" },
      { name: "Hanken Grotesk", provider: "google" },
    ],
  },
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
