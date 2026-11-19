/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: '#18181b', // Main typography
          800: '#27272a',
          700: '#3f3f46',
          600: '#52525b',
          500: '#71717a',
          400: '#a1a1aa',
          300: '#d4d4d8',
          200: '#e4e4e7', // Clean border
          100: '#f4f4f5', // Subtle section bg
          50: '#fafafa',  // Page bg
        },
        sage: {
          900: '#14382f',
          800: '#1f4e43', // Primary brand dark
          700: '#285e52',
          600: '#347566', // Primary accent
          500: '#488e7d',
          400: '#68a798',
          200: '#c5ddd7',
          100: '#e4f0ed',
          50: '#f2f8f6',  // Accent tint bg
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'modal': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'DEFAULT': '6px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '10px',
      }
    },
  },
  plugins: [],
};
