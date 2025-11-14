/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b6b',
        secondary: '#4ecdc4',
        dark: '#2d3436',
        light: '#f8f9fa'
      },
      animation: {
        'swipe-out-right': 'swipeOutRight 0.6s ease-in-out forwards',
        'swipe-out-left': 'swipeOutLeft 0.6s ease-in-out forwards',
        'bounce-in': 'bounceIn 0.6s ease-out',
      },
      keyframes: {
        swipeOutRight: {
          '0%': { transform: 'translateX(0) rotateZ(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(100%) rotateZ(20deg)', opacity: '0' }
        },
        swipeOutLeft: {
          '0%': { transform: 'translateX(0) rotateZ(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(-100%) rotateZ(-20deg)', opacity: '0' }
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
