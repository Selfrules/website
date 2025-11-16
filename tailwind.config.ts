import type { Config } from 'tailwindcss';

/**
 * Neobrutalist Design System - Tailwind Configuration
 *
 * This configuration implements a bold, vibrant neobrutalist design system
 * following Atomic Design methodology with:
 * - Vibrant brand colors (Electric Blue, Neon Pink, Cyber Yellow, Deep Purple)
 * - Bold typography (Space Grotesk, Inter, Space Mono)
 * - Brutalist shadows and borders
 * - 8pt spacing grid
 * - Mobile-first responsive design
 */

const config: Config = {
  darkMode: 'class',

  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // ============================================
      // COLORS - Neobrutalist Palette
      // ============================================
      colors: {
        // Brand Colors
        'electric-blue': '#0D7EFF',
        'neon-pink': '#FF006E',
        'cyber-yellow': '#FFD60A',
        'deep-purple': '#7209B7',
        'lime-green': '#06FFA5',
        'teal': '#2A687A',

        // Surface Colors
        'cream': '#FFFCF2',
        'surface-light': '#FFF5E1',
        'surface-dark': '#1A1A1A',

        // Text Colors
        'text-primary': '#0A0A0A',
        'text-secondary': '#2D2D2D',
        'text-tertiary': '#6B7280',

        // Functional Colors
        'brutal-black': '#000000',
        'brutal-white': '#FFFFFF',
        'spotify-green': '#1DB954',

        // Semantic Color Mappings
        primary: {
          DEFAULT: '#0D7EFF',
          50: '#E6F3FF',
          100: '#CCE7FF',
          200: '#99CFFF',
          300: '#66B7FF',
          400: '#339FFF',
          500: '#0D7EFF',
          600: '#0A65CC',
          700: '#084C99',
          800: '#053366',
          900: '#031A33',
        },
        secondary: {
          DEFAULT: '#FF006E',
          50: '#FFE6F0',
          100: '#FFCCE0',
          200: '#FF99C2',
          300: '#FF66A3',
          400: '#FF3385',
          500: '#FF006E',
          600: '#CC0058',
          700: '#990042',
          800: '#66002C',
          900: '#330016',
        },
        accent: {
          DEFAULT: '#FFD60A',
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFD60A',
          600: '#CCAB08',
          700: '#998006',
          800: '#665504',
          900: '#332B02',
        },
        purple: {
          DEFAULT: '#7209B7',
          50: '#F0E6F7',
          100: '#E0CCEF',
          200: '#C299DF',
          300: '#A366CF',
          400: '#8533BF',
          500: '#7209B7',
          600: '#5B0792',
          700: '#44056E',
          800: '#2E0349',
          900: '#170225',
        },
        lime: {
          DEFAULT: '#06FFA5',
          50: '#E6FFF5',
          100: '#CCFFEB',
          200: '#99FFD7',
          300: '#66FFC3',
          400: '#33FFAF',
          500: '#06FFA5',
          600: '#05CC84',
          700: '#049963',
          800: '#026642',
          900: '#013321',
        },

        // Functional semantic colors
        success: '#06FFA5',
        error: '#FF006E',
        warning: '#FFD60A',
        info: '#0D7EFF',
      },

      // ============================================
      // TYPOGRAPHY
      // ============================================
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },

      fontSize: {
        // Display sizes
        'display-1': ['72px', { lineHeight: '1', fontWeight: '900' }],
        'display-2': ['64px', { lineHeight: '1', fontWeight: '900' }],
        'display-3': ['56px', { lineHeight: '1.05', fontWeight: '900' }],

        // Heading sizes
        'h1': ['46px', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['37px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'h5': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'h6': ['16px', { lineHeight: '1.4', fontWeight: '600' }],

        // Body sizes
        'body-xl': ['19px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['17px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['15px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-xs': ['14px', { lineHeight: '1.5', fontWeight: '400' }],

        // Mobile sizes (override with responsive classes)
        'hero-mobile': ['36px', { lineHeight: '1', fontWeight: '900' }],
        'h1-mobile': ['28px', { lineHeight: '1.1', fontWeight: '700' }],
        'h2-mobile': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
      },

      // ============================================
      // SPACING - 8pt Grid + 4pt Tailwind Grid
      // ============================================
      spacing: {
        // Keep default Tailwind spacing (4pt grid)
        // Add brutal spacing (8pt grid)
        'brutal-xs': '8px',
        'brutal-sm': '16px',
        'brutal-md': '24px',
        'brutal-lg': '32px',
        'brutal-xl': '48px',
        'brutal-2xl': '64px',
        'brutal-3xl': '80px',
        'brutal-4xl': '96px',
        'brutal-5xl': '128px',
        'brutal-6xl': '160px',
      },

      // ============================================
      // SCREENS - Responsive Breakpoints
      // ============================================
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },

      // ============================================
      // BORDER RADIUS
      // ============================================
      borderRadius: {
        'brutal-sm': '4px',
        'brutal': '6px',
        'brutal-md': '6px',
        'brutal-lg': '8px',
        'brutal-xl': '12px',
      },

      // ============================================
      // BORDER WIDTH
      // ============================================
      borderWidth: {
        'brutal-thin': '3px',
        'brutal': '4px',
        'brutal-thick': '6px',
        'brutal-extra-thick': '8px',
        '3': '3px',
        '5': '5px',
        '6': '6px',
      },

      // ============================================
      // BOX SHADOW - Brutal Shadows
      // ============================================
      boxShadow: {
        // Black brutal shadows
        'brutal-sm': '4px 4px 0px 0px #000000',
        'brutal': '6px 6px 0px 0px #000000',
        'brutal-md': '8px 8px 0px 0px #000000',
        'brutal-lg': '10px 10px 0px 0px #000000',
        'brutal-xl': '16px 16px 0px 0px #000000',
        'brutal-hover': '12px 12px 0px 0px #000000',

        // Colored brutal shadows
        'brutal-colored-blue': '8px 8px 0px 0px #0D7EFF',
        'brutal-colored-pink': '8px 8px 0px 0px #FF006E',
        'brutal-colored-yellow': '8px 8px 0px 0px #FFD60A',
        'brutal-colored-purple': '8px 8px 0px 0px #7209B7',
        'brutal-colored-teal': '8px 8px 0px 0px #2A687A',
        'brutal-colored-lime': '8px 8px 0px 0px #06FFA5',

        // Size variants for colored shadows
        'brutal-colored-blue-sm': '4px 4px 0px 0px #0D7EFF',
        'brutal-colored-pink-sm': '4px 4px 0px 0px #FF006E',
        'brutal-colored-yellow-sm': '4px 4px 0px 0px #FFD60A',
        'brutal-colored-purple-sm': '4px 4px 0px 0px #7209B7',

        'brutal-colored-blue-lg': '12px 12px 0px 0px #0D7EFF',
        'brutal-colored-pink-lg': '12px 12px 0px 0px #FF006E',
        'brutal-colored-yellow-lg': '12px 12px 0px 0px #FFD60A',
        'brutal-colored-purple-lg': '12px 12px 0px 0px #7209B7',
      },

      // ============================================
      // TEXT SHADOW
      // ============================================
      textShadow: {
        'brutal': '3px 3px 0px #000000',
        'brutal-sm': '2px 2px 0px #000000',
        'brutal-lg': '4px 4px 0px #000000',
      },

      // ============================================
      // ANIMATIONS
      // ============================================
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'pulse-spotify': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },

      animation: {
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
        'slide-out': 'slide-out 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'pulse-spotify': 'pulse-spotify 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
      },

      // ============================================
      // BACKGROUND PATTERNS
      // ============================================
      backgroundImage: {
        'grid-pattern': 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
        'dots-pattern': 'radial-gradient(circle, #000 1px, transparent 1px)',
        'diagonal-pattern': 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 11px)',
      },

      backgroundSize: {
        'grid-sm': '20px 20px',
        'grid': '40px 40px',
        'grid-lg': '60px 60px',
        'dots': '20px 20px',
      },

      // ============================================
      // Z-INDEX
      // ============================================
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
      },

      // ============================================
      // TRANSITIONS
      // ============================================
      transitionDuration: {
        '0': '0ms',
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
      },

      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      // ============================================
      // CONTAINER
      // ============================================
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
    },
  },

  plugins: [
    // Text Shadow Plugin
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'text-shadow': (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    },

    // Dynamic Color Utilities Plugin
    function ({ addUtilities }: any) {
      const newUtilities = {
        '.role-design': {
          '--role-color': '#0D7EFF',
        },
        '.role-dev': {
          '--role-color': '#2A687A',
        },
        '.role-pm': {
          '--role-color': '#7209B7',
        },
        '.role-tool': {
          '--role-color': '#FF006E',
        },
      };
      addUtilities(newUtilities);
    },

    // Animation Delay Plugin
    function ({ addUtilities }: any) {
      const delays = {
        '.animation-delay-500': {
          'animation-delay': '0.5s',
        },
        '.animation-delay-1000': {
          'animation-delay': '1s',
        },
      };
      addUtilities(delays);
    },
  ],
};

export default config;