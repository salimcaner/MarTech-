/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                base: "#0B0B0D",
                surface: "#121216",
                textPrimary: "#F5F5F7",
                textSecondary: "#A9ABB3",
                stroke: "rgba(255,255,255,0.08)",
                accent: "#FFB84D", // Warm amber accent
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
