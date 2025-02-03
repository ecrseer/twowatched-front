// https://nuxt.com/docs/api/configuration/nuxt-config

import { iconsDef } from './icos-def';

export default defineNuxtConfig({
    devtools: { enabled: true, type: 'module' },
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
                'data-theme': 'synthwave',
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
    modules: [
        '@pinia/nuxt',
        'nuxt-vitest',
        '@nuxt/content',
        '@nuxt/devtools',
        '@vite-pwa/nuxt',
    ],
    pwa: {
        manifest: {
            name: '2watch - socialize com filmes',
            short_name: '2watch',
            description: ' socialize com filmes',
            icons: iconsDef.icons,
        },
        devOptions: { enabled: true, type: 'module' },
        workbox: {
            navigateFallback: '/',
            globPatterns: ['**/*.{js,css,html,png,svg,ico,json,woff2}'], // Ensure caching works
            globDirectory: 'public',
        },
        client: {
            installPrompt: true,
        },
    },
});
