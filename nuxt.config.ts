// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      BACKEND_URI: process.env.BACKEND_URI,
      TMDB_API_KEY: process.env.TMDB_API_KEY,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      // this htmlAttrs you need
      htmlAttrs: {
        "data-theme": "valentine",
      },
    },
  },
  modules: [
    "nuxt3-socket.io",
    "@pinia/nuxt",
    "nuxt-vitest",
    "@nuxt/content",
    "@nuxt/devtools",
  ],
  socket: {
    // JSON serializable options only.
    // options object to pass when instantiating socket server.
    serverOptions: {},
  },
});
