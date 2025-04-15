import type { Config } from 'tailwindcss'

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Should include all your component files
    "./public/index.html"         // Should include your HTML entry point
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config