// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: ["~/assets/css/main.css"],
    runtimeConfig: {
        public: {
            BACKEND_URI: process.env.BACKEND_URI,
            TMDB_API_KEY: process.env.TMDB_API_KEY,
            BACKEND_USERS_URI: process.env.BACKEND_USERS_URI,
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
                "data-theme": "emerald",
            },
        },
    },
    modules: ["@pinia/nuxt", "nuxt-vitest", "@nuxt/content", "@nuxt/devtools"],
});

