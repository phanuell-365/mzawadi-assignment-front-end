/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sf-pro-display': ['SF Pro Display', 'Ubuntu', 'sans-serif', 'serif'],
                'lato': ['Lato', 'Ubuntu', 'sans-serif'],
                'montserrat': ['Montserrat', 'Ubuntu', 'sans-serif'],
                'poppins': ['Poppins', 'Ubuntu', 'sans-serif'],
                'inter': ['Inter', 'Ubuntu', 'sans-serif', 'serif'],
                'inter-bold': ['Inter Bold', 'Ubuntu', 'san-serif', 'serif'],
                'inter-semi-bold': ['Inter SemiBold', 'Ubuntu', 'san-serif'],
                'poppins-light': ['Poppins Light', 'Ubuntu', 'san-serif', 'serif']
            },
            fontSize: {
                'xxs': ['.625rem', {
                    letterSpacing: '-.02em',
                    lineHeight: '1.25rem'
                }],
                '2xs': ['.675rem', {
                    letterSpacing: '-.02em',
                    lineHeight: '1.25rem'
                }],
                '3xs': ['.825rem', {
                    letterSpacing: '-.02em',
                    lineHeight: '1.25rem'
                }],
                '4xs': ['.875rem', {
                    letterSpacing: '-.02em',
                    lineHeight: '1.25rem'
                }],
                '5xs': ['.925rem', {
                    letterSpacing: '-.02em',
                    lineHeight: '1.25rem'
                }],
                '6xs': ['.975rem', {
                    letterSpacing: '-.02em',
                    lineHeight: '1.25rem'
                }],
            }
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
    darkMode: 'class',
    // darkMode: 'media',
}

