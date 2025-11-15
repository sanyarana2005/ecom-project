/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brutalist color palette
        brutal: {
          black: '#000000',
          white: '#ffffff',
          yellow: '#FFD700',
          orange: '#FF8C42',
          purple: '#A06CD5',
          teal: '#2F5F5F',
          green: '#B8E0A8',
        },
        // Resource colors
        resource: {
          'seminar': '#3B82F6',    // Blue
          'auditorium': '#EF4444', // Red
          'lab': '#22C55E',        // Green
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'brutal-xl': ['6rem', { lineHeight: '1' }],
        'brutal-2xl': ['8rem', { lineHeight: '1' }],
        'brutal-3xl': ['10rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '6px 6px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}
