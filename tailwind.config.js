/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4343d5',
          container: '#5d5fef',
        },
        secondary: {
          DEFAULT: '#b90760',
          container: '#fd4c93',
        },
        surface: {
          DEFAULT: '#ffffff',
          low: '#f3f3f6',
          high: '#e8e8ea',
        },
        on: {
          surface: '#1a1c1e',
          'surface-variant': '#464555',
        },
        success: '#2e7d32',
        danger: '#ba1a1a',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Spline Sans"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'float 3s ease-in-out infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
