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
        altpurple: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          brand: '#6366F1',
          accent: '#6C5DD3'
        },
        fintech: {
          dark: '#0a0e17',
          darker: '#06090e',
          card: '#111827',
          cardBorder: '#1f2937',
          accent: '#6366f1',
          accentHover: '#4f46e5',
          teal: '#06b6d4',
          gain: '#10b981',
          gainBg: 'rgba(16, 185, 129, 0.1)',
          loss: '#f43f5e',
          lossBg: 'rgba(244, 63, 94, 0.1)',
          muted: '#9ca3af',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flash-gain': 'flashGreen 1.2s ease-out',
        'flash-loss': 'flashRed 1.2s ease-out',
      },
      keyframes: {
        flashGreen: {
          '0%': { backgroundColor: 'rgba(16, 185, 129, 0.35)', borderColor: '#10b981' },
          '100%': { backgroundColor: 'transparent' },
        },
        flashRed: {
          '0%': { backgroundColor: 'rgba(244, 63, 94, 0.35)', borderColor: '#f43f5e' },
          '100%': { backgroundColor: 'transparent' },
        }
      }
    },
  },
  plugins: [],
}
