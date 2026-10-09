/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d8fd',
          300: '#d6bcfa',
          400: '#b794f4',
          500: '#805ad5',
          600: '#6b21a8',
          700: '#5F259F', // Upstox signature rich purple
          800: '#4c1d95',
          900: '#320f5c',
          950: '#1d0637',
        },
        trade: {
          green: '#00b386', // vibrant gain green
          'green-light': '#e6f7f2',
          'green-dark': '#008f6b',
          red: '#eb5b3c', // vibrant loss red
          'red-light': '#fef0ec',
          'red-dark': '#c84326',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(95, 37, 159, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px -5px rgba(95, 37, 159, 0.35)',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        }
      },
      animation: {
        ticker: 'ticker 28s linear infinite',
        'pulse-slow': 'pulseSlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
