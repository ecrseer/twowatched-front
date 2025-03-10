/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './main/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    theme: {
        extend: {},
    },

    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            'garden',
            'light',
            'dark',
            'cupcake',
            'valentine',
            'emerald',
            'synthwave',
        ],
    },
};
