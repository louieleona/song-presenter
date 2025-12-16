/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-inspired sophisticated palette
        luxury: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        accent: {
          blue: '#007AFF',
          purple: '#5856D6',
          pink: '#FF2D55',
          green: '#34C759',
          orange: '#FF9500',
          teal: '#5AC8FA',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display-large': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'title-1': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'title-2': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
        'title-3': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'body-large': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'callout': ['0.9375rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.08)',
        'soft-xl': '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.1)',
        'soft-2xl': '0 16px 48px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.12)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
