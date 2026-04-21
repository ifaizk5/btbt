/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neo-Brutalism Primary Colors
        'nb-black': '#000000',
        'nb-white': '#FFFFFF',
        'nb-red': '#E63946',
        'nb-blue': '#1D3557',
        'nb-yellow': '#F1FAEE',
        'nb-pink': '#FF10F0',
        'nb-cyan': '#00D9FF',
        'nb-lime': '#CCFF00',
        'nb-orange': '#FF6B35',
        'nb-purple': '#6A0572',
      },
      borderWidth: {
        '6': '6px',
        '8': '8px',
      },
      boxShadow: {
        'nb-sm': '4px 4px 0px rgba(0, 0, 0, 0.3)',
        'nb-md': '8px 8px 0px rgba(0, 0, 0, 0.3)',
        'nb-lg': '12px 12px 0px rgba(0, 0, 0, 0.3)',
        'nb-xl': '16px 16px 0px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        'nb': ['Arial', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        'nb-xs': ['12px', { lineHeight: '16px', fontWeight: '700' }],
        'nb-sm': ['14px', { lineHeight: '20px', fontWeight: '700' }],
        'nb-base': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'nb-lg': ['20px', { lineHeight: '28px', fontWeight: '700' }],
        'nb-xl': ['24px', { lineHeight: '32px', fontWeight: '900' }],
        'nb-2xl': ['32px', { lineHeight: '40px', fontWeight: '900' }],
        'nb-3xl': ['48px', { lineHeight: '56px', fontWeight: '900' }],
      },
      spacing: {
        'nb': '8px',
        'nb-2': '16px',
        'nb-3': '24px',
        'nb-4': '32px',
        'nb-5': '40px',
        'nb-6': '48px',
      },
    },
  },
  plugins: [],
  important: true,
};
