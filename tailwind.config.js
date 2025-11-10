/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#135bec",
        "primary-light": "#3b82f6",
        "primary-dark": "#1d4ed8",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
        "card-dark": "#1a212e",
        "border-dark": "#2d3748",
        "text-light": "#e2e8f0",
        "text-medium": "#94a3b8",
        "text-dark": "#64748b",
      },
      fontFamily: {
        "display": ["Be Vietnam Pro", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}
