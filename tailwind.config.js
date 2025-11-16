/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal': {
          'bg': '#0a0a0a',
          'text': '#00ff00',
          'border': '#333333',
        },
        'hacker': {
          'green': '#00ff41',
          'matrix': '#003300',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}