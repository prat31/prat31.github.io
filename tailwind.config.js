/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                mono: ['"JetBrains Mono"', 'monospace'],
                sans: ['"Inter"', 'sans-serif'],
            },
            colors: {
                // Custom nerdy palette
                'terminal-light': '#f0f4f8', // cooler white/gray
                'terminal-dark': '#0d1117',
                'terminal-green': '#2ea043',
                'terminal-blue': '#58a6ff',
            }
        },
    },
    plugins: [],
}
