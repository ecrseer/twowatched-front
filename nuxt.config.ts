// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        public: {
            BACKEND_URI: process.env.BACKEND_URI,
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
                'data-theme': 'garden',
            },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content:
                        'width=device-width, initial-scale=1, interactive-widget=resizes-content',
                },
            ],
        },
    },
    modules: ['@pinia/nuxt', 'nuxt-vitest', '@nuxt/content', '@nuxt/devtools'],
});
