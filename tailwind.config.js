/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F4F2FF',
          100: '#E9E5FF',
          200: '#D6CEFF',
          300: '#B9ABFF',
          500: '#6D5DF5',
          600: '#5B4BE8',
          700: '#4B3DCB',
        },
        canvas: '#F6F7FB',
        ink: '#1E1B33',
        muted: '#8A8AA3',
        success: '#16B364',
        danger: '#F04438',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,0.04), 0 12px 28px -8px rgba(16,24,40,0.10)',
        card: '0 1px 3px rgba(16,24,40,0.06)',
        glow: '0 10px 30px -8px rgba(109,93,245,0.45)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6D5DF5 0%, #4B3DCB 100%)',
        'sidebar-gradient': 'linear-gradient(180deg, #F7F6FF 0%, #FFFFFF 100%)',
      },
    },
  },
  plugins: [],
};
