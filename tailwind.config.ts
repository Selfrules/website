import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ============================================
        // NEOBRUTALIST DESIGN SYSTEM - FIGMA MAKE PALETTE
        // Official brand colors - WCAG AA Compliant
        // ============================================

        // Brand Colors (Primary Design System)
        'electric-blue': '#0D7EFF',  // Design/UX projects
        'teal': '#2A687A',           // Development projects
        'deep-purple': '#7209B7',    // PM/Strategy projects
        'neon-pink': '#FF006E',      // Analytics/Tools projects
        'cyber-yellow': '#FFD60A',   // Featured/Special items

        // Semantic Color Mapping
        primary: {
          DEFAULT: '#0D7EFF', // Electric Blue
          50: '#E6F4FF',
          100: '#CCE8FF',
          200: '#99D2FF',
          300: '#66BBFF',
          400: '#3399FF',
          500: '#0D7EFF',
          600: '#0A65CC',
          700: '#084C99',
          800: '#053366',
          900: '#031A33',
        },
        secondary: {
          DEFAULT: '#2A687A', // Teal
          50: '#E8F2F5',
          100: '#D1E5EB',
          200: '#A3CBD7',
          300: '#75B1C3',
          400: '#4797AF',
          500: '#2A687A',
          600: '#225362',
          700: '#193E49',
          800: '#112A31',
          900: '#081518',
        },
        accent: {
          DEFAULT: '#FFD60A', // Cyber Yellow
          50: '#FFFBCC',
          100: '#FFF899',
          200: '#FFF566',
          300: '#FFF233',
          400: '#FFEF00',
          500: '#FFD60A',
          600: '#CCAB08',
          700: '#998006',
          800: '#665504',
          900: '#332B02',
        },
        purple: {
          DEFAULT: '#7209B7', // Deep Purple
          50: '#F3E6FF',
          100: '#E6CCFF',
          200: '#CC99FF',
          300: '#B366FF',
          400: '#9933FF',
          500: '#7209B7',
          600: '#5B0792',
          700: '#44056E',
          800: '#2E0349',
          900: '#170225',
        },
        lime: {
          DEFAULT: '#06FFA5', // Lime Green
          50: '#E6FFF5',
          100: '#CCFFEB',
          200: '#99FFD7',
          300: '#66FFC3',
          400: '#33FFAF',
          500: '#06FFA5',
          600: '#05CC84',
          700: '#049963',
          800: '#036642',
          900: '#013321',
        },

        // Functional Status Colors
        success: {
          DEFAULT: '#10B981', // Success Green
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        error: {
          DEFAULT: '#EF4444', // Error Red
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        warning: {
          DEFAULT: '#F59E0B', // Warning Orange
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },

        // Functional Colors
        'brutal-black': '#000000',
        'brutal-white': '#FFFFFF',

        // Background & Surface Colors
        cream: '#FFFCF2',
        dark: '#0A0A0A',
        surface: {
          light: '#FFF5E1',
          dark: '#1A1A1A',
        },

        // Text Colors
        brutalist: {
          border: '#000000',
          shadow: '#000000',
          text: {
            primary: '#0A0A0A',
            secondary: '#2D2D2D',
            tertiary: '#6B7280',
            light: '#FAFAFA',
            dark: '#0A0A0A',
          },
          bg: {
            light: '#FFFCF2',
            dark: '#0A0A0A',
          },
        },

        // Integration Colors
        spotify: '#1DB954',

        // Border Colors
        'border-light': '#E5E5E5', // Light border for subtle separators
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
        'sm': '4px',
        DEFAULT: '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        'brutal': '6px',
        'brutal-sm': '4px',
        'brutal-lg': '8px',
      },
      borderWidth: {
        // Neobrutalist Border System
        'brutal': '4px',              // Standard brutalist border
        'brutal-thin': '3px',          // Subtle borders
        'brutal-thick': '6px',         // Emphasis borders
        'brutal-extra-thick': '8px',   // Hero/statement borders
      },
      boxShadow: {
        // Neobrutalist Shadow System - Hard shadows with no blur
        'brutal': '8px 8px 0px 0px #000000',           // Standard shadow
        'brutal-sm': '4px 4px 0px 0px #000000',        // Small elements
        'brutal-lg': '16px 16px 0px 0px #000000',      // Hero elements
        'brutal-hover': '12px 12px 0px 0px #000000',   // Hover state (increased depth)
        'brutal-active': '4px 4px 0px 0px #000000',    // Active/pressed state (reduced depth)

        // Colored Shadows for Brand Emphasis
        'brutal-colored-blue': '8px 8px 0px 0px #0D7EFF',    // Electric Blue - Design/UX
        'brutal-colored-purple': '8px 8px 0px 0px #7209B7',  // Deep Purple - PM/Strategy
        'brutal-colored-pink': '8px 8px 0px 0px #FF006E',    // Neon Pink - Analytics/Tools
        'brutal-colored-yellow': '8px 8px 0px 0px #FFD60A',  // Cyber Yellow - Featured
        'brutal-colored-teal': '8px 8px 0px 0px #2A687A',    // Teal - Development
      },
      textShadow: {
        'hard': '6px 6px 0 #000',
        'hard-sm': '4px 4px 0 #000',
        'hard-lg': '8px 8px 0 #000',
      },
      spacing: {
        // ============================================
        // SPACING SYSTEM
        // ============================================

        // 4pt Tailwind Grid (Base Spacing - Maintained for Compatibility)
        // Base unit: 4px (--spacing: .25rem)
        '0.5': '2px',   // 0.5 unit
        '1': '4px',     // 1 unit
        '1.5': '6px',   // 1.5 units
        '2': '8px',     // 2 units
        '2.5': '10px',  // 2.5 units
        '3': '12px',    // 3 units
        '3.5': '14px',  // 3.5 units
        '4': '16px',    // 4 units
        '4.5': '18px',  // 4.5 units
        '5': '20px',    // 5 units
        '5.5': '22px',  // 5.5 units
        '6': '24px',    // 6 units
        '7': '28px',    // 7 units
        '8': '32px',    // 8 units
        '9': '36px',    // 9 units
        '10': '40px',   // 10 units
        '11': '44px',   // 11 units
        '12': '48px',   // 12 units
        '14': '56px',   // 14 units
        '16': '64px',   // 16 units
        '20': '80px',   // 20 units
        '24': '96px',   // 24 units
        '28': '112px',  // 28 units
        '32': '128px',  // 32 units
        '36': '144px',  // 36 units
        '40': '160px',  // 40 units

        // 8pt Brutal Grid (Design System Standard)
        // Use these for new components following the design system
        'brutal-xs': '8px',    // 1 unit (tight spacing)
        'brutal-sm': '16px',   // 2 units (small spacing)
        'brutal-md': '24px',   // 3 units (medium spacing)
        'brutal-lg': '32px',   // 4 units (large spacing)
        'brutal-xl': '48px',   // 6 units (extra large spacing)
        'brutal-2xl': '64px',  // 8 units (2x large spacing)

        // Legacy/Semantic Spacing (Maintained for Compatibility)
        'section': '6rem',        // 96px (section spacing)
        'section-sm': '4rem',     // 64px (small section spacing)
        'brutal-offset': '8px',   // Default shadow offset
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

        // Named Brand Gradients
        'gradient-blog-hero': 'linear-gradient(135deg, #0D7EFF 0%, #7209B7 100%)', // Blog hero gradient (Electric Blue → Deep Purple)
        'gradient-brand': 'linear-gradient(to right, #0D7EFF, #FF006E, #7209B7)', // Full brand gradient (Blue → Pink → Purple)
        'gradient-text-accent': 'linear-gradient(to right, #2A687A, #FFD60A)', // Text accent gradient (Teal → Yellow)
        'gradient-timeline': 'linear-gradient(to bottom, #7209B7, #FFD60A, #FF006E, #0D7EFF)', // Timeline gradient (Purple → Yellow → Pink → Blue)

        // Glow Overlays (10% opacity for subtle effects)
        'gradient-glow-blue': 'linear-gradient(to bottom right, rgba(13, 126, 255, 0.1), transparent)',
        'gradient-glow-pink': 'linear-gradient(to bottom right, rgba(255, 0, 110, 0.1), transparent)',
        'gradient-glow-purple': 'linear-gradient(to top right, rgba(114, 9, 183, 0.1), transparent)',
        'gradient-glow-mixed': 'linear-gradient(to bottom right, rgba(13, 126, 255, 0.1), rgba(255, 0, 110, 0.1))',
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
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addUtilities, theme }: { addUtilities: (utilities: Record<string, unknown>) => void; theme: (key: string) => Record<string, string> }) {
      const textShadowUtilities = Object.entries(theme('textShadow')).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [`.text-shadow-${key}`]: { textShadow: value },
        };
      }, {});
      addUtilities(textShadowUtilities);
    },
    // Dynamic Color Utilities (for runtime role-based colors)
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, unknown>) => void }) {
      const dynamicColorUtilities = {
        // Background colors
        '.bg-dynamic-blue': { backgroundColor: '#0D7EFF' },
        '.bg-dynamic-pink': { backgroundColor: '#FF006E' },
        '.bg-dynamic-yellow': { backgroundColor: '#FFD60A' },
        '.bg-dynamic-purple': { backgroundColor: '#7209B7' },
        '.bg-dynamic-teal': { backgroundColor: '#2A687A' },

        // Text colors
        '.text-dynamic-blue': { color: '#0D7EFF' },
        '.text-dynamic-pink': { color: '#FF006E' },
        '.text-dynamic-yellow': { color: '#FFD60A' },
        '.text-dynamic-purple': { color: '#7209B7' },
        '.text-dynamic-teal': { color: '#2A687A' },

        // Brutalist text colors (accessible utilities)
        '.text-brutalist-text-light': { color: '#FAFAFA' },
      };
      addUtilities(dynamicColorUtilities);
    },
    // Animation Delay Utilities
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, unknown>) => void }) {
      const animationDelayUtilities = {
        '.delay-500': { animationDelay: '0.5s' },
        '.delay-1000': { animationDelay: '1s' },
      };
      addUtilities(animationDelayUtilities);
    },
  ],
};

export default config;
