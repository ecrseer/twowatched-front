// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

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
  modules: ["nuxt3-socket.io", "@pinia/nuxt"],
  socket: {
    // JSON serializable options only.
    // options object to pass when instantiating socket server.
    serverOptions: {},
  },
});

