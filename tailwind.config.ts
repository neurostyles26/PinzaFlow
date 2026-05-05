/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22C55E',
          accent: '#4ADE80',
        },
        background: '#0F172A',
        surface: '#111827',
        'text-primary': '#F9FAFB',
        'text-secondary': '#9CA3AF',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}
