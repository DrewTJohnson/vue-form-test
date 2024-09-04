/** @type {import('tailwindcss').Config} */
import { interactVariantPlugin } from './plugins/interact.js'
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    extend: {},
  },
  plugins: [interactVariantPlugin],
}

