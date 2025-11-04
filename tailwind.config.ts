import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Extended Neobrutalist color palette with gradations
        primary: {
          50: '#FFFBEB',
          100: '#FFF5CC',
          200: '#FFEB99',
          300: '#FFE066',
          DEFAULT: '#FFD93D',
          400: '#FFC700',
          500: '#E6B000',
          600: '#CC9900',
          700: '#B38600',
          800: '#997300',
          900: '#806000',
        },
        secondary: {
          50: '#F3F1FF',
          100: '#E5E1FF',
          200: '#C9C2FF',
          300: '#A29BF8',
          DEFAULT: '#6C5CE7',
          400: '#5B4BD9',
          500: '#5344C5',
          600: '#4236A3',
          700: '#362D85',
          800: '#2B2467',
          900: '#1F1B4A',
        },
        accent: {
          50: '#FFF1F1',
          100: '#FFE4E4',
          200: '#FFBEBE',
          300: '#FF9999',
          DEFAULT: '#FF6B6B',
          400: '#FF4747',
          500: '#FF3838',
          600: '#E61E1E',
          700: '#CC0000',
          800: '#B30000',
          900: '#990000',
        },
        // Neon accent colors from examples
        neon: {
          cyan: '#00D9FF',
          pink: '#FF0099',
          lime: '#84CC16',
          orange: '#F97316',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          yellow: '#EAB308',
          green: '#10B981',
          red: '#EF4444',
        },
        // Original brutalist system colors
        brutalist: {
          border: '#000000',
          shadow: '#000000',
          bg: {
            light: '#FAFAFA',
            dark: '#1A1A1A',
          },
          surface: {
            light: '#FFFFFF',
            dark: '#242424',
          },
          text: {
            light: '#1A1A1A',
            dark: '#FAFAFA',
          },
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        'display-1': ['4.5rem', { lineHeight: '1.1', fontWeight: '900' }], // 72px
        'display-2': ['3.75rem', { lineHeight: '1.1', fontWeight: '900' }], // 60px
        'h1': ['3rem', { lineHeight: '1.2', fontWeight: '800' }], // 48px
        'h2': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }], // 36px
        'h3': ['1.875rem', { lineHeight: '1.3', fontWeight: '700' }], // 30px
        'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }], // 24px
        'h5': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px
        'body-xl': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }], // 20px
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
      },
      borderRadius: {
        'brutal': '8px',
        'brutal-sm': '6px',
        'brutal-lg': '12px',
      },
      borderWidth: {
        'brutal': '4px',
        'brutal-thick': '6px',
      },
      boxShadow: {
        'brutal': '8px 8px 0px #000000',
        'brutal-sm': '4px 4px 0px #000000',
        'brutal-lg': '12px 12px 0px #000000',
        'brutal-hover': '12px 12px 0px #000000',
        'brutal-active': '4px 4px 0px #000000',
      },
      spacing: {
        'section': '6rem', // 96px
        'section-sm': '4rem', // 64px
        'brutal-offset': '8px',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px',
        '2xl': '1920px',
      },
      transitionTimingFunction: {
        'brutal': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        'grid-pattern': 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
        'diagonal-lines': 'repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 1px, transparent 15px)',
        'diagonal-lines-reverse': 'repeating-linear-gradient(-45deg, currentColor, currentColor 1px, transparent 1px, transparent 15px)',
      },
      backgroundSize: {
        'dot-size': '20px 20px',
        'grid-size': '40px 40px',
        'grid-size-sm': '20px 20px',
        'grid-size-lg': '60px 60px',
      },
      animation: {
        'brutal-bounce': 'brutal-bounce 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'brutal-slide': 'brutal-slide 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out 1s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee var(--marquee-duration, 20s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--marquee-duration, 20s) linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'rotate-slow': 'rotate 20s linear infinite',
        'rotate-reverse': 'rotate-reverse 20s linear infinite',
      },
      keyframes: {
        'brutal-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'brutal-slide': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - var(--marquee-gap, 2rem)))' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(calc(-100% - var(--marquee-gap, 2rem)))' },
          '100%': { transform: 'translateX(0)' },
        },
        'morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'rotate-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
