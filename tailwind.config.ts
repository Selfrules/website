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
        // Neobrutalist color palette
        primary: {
          DEFAULT: '#FFD93D',
          light: '#FFEB99',
          dark: '#E6C300',
        },
        secondary: {
          DEFAULT: '#6C5CE7',
          light: '#A29BF8',
          dark: '#5344C5',
        },
        accent: {
          DEFAULT: '#FF6B6B',
          light: '#FF9999',
          dark: '#FF3838',
        },
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
      animation: {
        'brutal-bounce': 'brutal-bounce 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'brutal-slide': 'brutal-slide 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
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
      },
    },
  },
  plugins: [],
};

export default config;
