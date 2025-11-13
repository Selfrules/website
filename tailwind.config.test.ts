/**
 * Tailwind Design System Configuration Tests
 *
 * Tests to verify that all design tokens are properly configured
 * according to the DS-001 specification with Figma Make palette.
 */

import tailwindConfig from './tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig(tailwindConfig);

describe('Tailwind Design System Configuration', () => {

  // ============================================
  // BRAND COLORS TESTS (FIGMA MAKE PALETTE)
  // ============================================

  describe('Brand Colors', () => {
    it('should have electric-blue defined (#0D7EFF)', () => {
      expect(fullConfig.theme.colors).toHaveProperty('electric-blue');
      expect(fullConfig.theme.colors['electric-blue']).toBe('#0D7EFF');
    });

    it('should have teal defined (#2A687A)', () => {
      expect(fullConfig.theme.colors).toHaveProperty('teal');
      expect(fullConfig.theme.colors['teal']).toBe('#2A687A');
    });

    it('should have deep-purple defined (#7209B7)', () => {
      expect(fullConfig.theme.colors).toHaveProperty('deep-purple');
      expect(fullConfig.theme.colors['deep-purple']).toBe('#7209B7');
    });

    it('should have neon-pink defined (#FF006E)', () => {
      expect(fullConfig.theme.colors).toHaveProperty('neon-pink');
      expect(fullConfig.theme.colors['neon-pink']).toBe('#FF006E');
    });

    it('should have cyber-yellow defined (#FFD60A)', () => {
      expect(fullConfig.theme.colors).toHaveProperty('cyber-yellow');
      expect(fullConfig.theme.colors['cyber-yellow']).toBe('#FFD60A');
    });
  });

  // ============================================
  // SEMANTIC COLORS TESTS
  // ============================================

  describe('Semantic Colors', () => {
    it('should map primary to electric-blue', () => {
      expect(fullConfig.theme.colors.primary?.DEFAULT).toBe('#0D7EFF');
    });

    it('should map secondary to neon-pink', () => {
      expect(fullConfig.theme.colors.secondary?.DEFAULT).toBe('#FF006E');
    });

    it('should map accent to cyber-yellow', () => {
      expect(fullConfig.theme.colors.accent?.DEFAULT).toBe('#FFD60A');
    });

    it('should have purple mapped to deep-purple', () => {
      expect(fullConfig.theme.colors.purple?.DEFAULT).toBe('#7209B7');
    });
  });

  // ============================================
  // FUNCTIONAL COLORS TESTS
  // ============================================

  describe('Functional Colors', () => {
    it('should have brutal-black defined', () => {
      expect(fullConfig.theme.colors).toHaveProperty('brutal-black');
      expect(fullConfig.theme.colors['brutal-black']).toBe('#000000');
    });

    it('should have brutal-white defined', () => {
      expect(fullConfig.theme.colors).toHaveProperty('brutal-white');
      expect(fullConfig.theme.colors['brutal-white']).toBe('#FFFFFF');
    });

    it('should have cream background color', () => {
      expect(fullConfig.theme.colors).toHaveProperty('cream');
      expect(fullConfig.theme.colors['cream']).toBe('#FFFCF2');
    });
  });

  // ============================================
  // BORDER WIDTH TESTS
  // ============================================

  describe('Border Widths', () => {
    it('should have brutal border utilities', () => {
      expect(fullConfig.theme.borderWidth).toHaveProperty('brutal');
      expect(fullConfig.theme.borderWidth.brutal).toBe('4px');
    });

    it('should have brutal-thin', () => {
      expect(fullConfig.theme.borderWidth).toHaveProperty('brutal-thin');
      expect(fullConfig.theme.borderWidth['brutal-thin']).toBe('3px');
    });

    it('should have brutal-thick', () => {
      expect(fullConfig.theme.borderWidth).toHaveProperty('brutal-thick');
      expect(fullConfig.theme.borderWidth['brutal-thick']).toBe('6px');
    });

    it('should have brutal-extra-thick', () => {
      expect(fullConfig.theme.borderWidth).toHaveProperty('brutal-extra-thick');
      expect(fullConfig.theme.borderWidth['brutal-extra-thick']).toBe('8px');
    });
  });

  // ============================================
  // BOX SHADOW TESTS
  // ============================================

  describe('Box Shadows', () => {
    it('should have brutal shadow', () => {
      expect(fullConfig.theme.boxShadow).toHaveProperty('brutal');
      expect(fullConfig.theme.boxShadow.brutal).toBe('8px 8px 0px 0px #000000');
    });

    it('should have brutal-sm shadow', () => {
      expect(fullConfig.theme.boxShadow).toHaveProperty('brutal-sm');
      expect(fullConfig.theme.boxShadow['brutal-sm']).toBe('4px 4px 0px 0px #000000');
    });

    it('should have brutal-lg shadow', () => {
      expect(fullConfig.theme.boxShadow).toHaveProperty('brutal-lg');
      expect(fullConfig.theme.boxShadow['brutal-lg']).toBe('16px 16px 0px 0px #000000');
    });

    it('should have brutal-hover shadow', () => {
      expect(fullConfig.theme.boxShadow).toHaveProperty('brutal-hover');
      expect(fullConfig.theme.boxShadow['brutal-hover']).toBe('12px 12px 0px 0px #000000');
    });

    it('should have colored shadows for all brand colors', () => {
      expect(fullConfig.theme.boxShadow).toHaveProperty('brutal-colored-blue');
      expect(fullConfig.theme.boxShadow['brutal-colored-blue']).toBe('8px 8px 0px 0px #0D7EFF');

      expect(fullConfig.theme.boxShadow).toHaveProperty('brutal-colored-purple');
      expect(fullConfig.theme.boxShadow['brutal-colored-purple']).toBe('8px 8px 0px 0px #7209B7');

      expect(fullConfig.theme.boxShadow).toHaveProperty('brutal-colored-pink');
      expect(fullConfig.theme.boxShadow['brutal-colored-pink']).toBe('8px 8px 0px 0px #FF006E');

      expect(fullConfig.theme.boxShadow).toHaveProperty('brutal-colored-yellow');
      expect(fullConfig.theme.boxShadow['brutal-colored-yellow']).toBe('8px 8px 0px 0px #FFD60A');

      expect(fullConfig.theme.boxShadow).toHaveProperty('brutal-colored-teal');
      expect(fullConfig.theme.boxShadow['brutal-colored-teal']).toBe('8px 8px 0px 0px #2A687A');
    });
  });

  // ============================================
  // BORDER RADIUS TESTS
  // ============================================

  describe('Border Radius', () => {
    it('should have brutal border radius', () => {
      expect(fullConfig.theme.borderRadius).toHaveProperty('brutal');
      expect(fullConfig.theme.borderRadius.brutal).toBe('6px');
    });

    it('should have brutal-sm border radius', () => {
      expect(fullConfig.theme.borderRadius).toHaveProperty('brutal-sm');
      expect(fullConfig.theme.borderRadius['brutal-sm']).toBe('4px');
    });

    it('should have brutal-lg border radius', () => {
      expect(fullConfig.theme.borderRadius).toHaveProperty('brutal-lg');
      expect(fullConfig.theme.borderRadius['brutal-lg']).toBe('8px');
    });
  });

  // ============================================
  // SPACING TESTS (8PT GRID)
  // ============================================

  describe('Brutal Spacing (8pt Grid)', () => {
    it('should have brutal-xs spacing (8px)', () => {
      expect(fullConfig.theme.spacing).toHaveProperty('brutal-xs');
      expect(fullConfig.theme.spacing['brutal-xs']).toBe('8px');
    });

    it('should have brutal-sm spacing (16px)', () => {
      expect(fullConfig.theme.spacing).toHaveProperty('brutal-sm');
      expect(fullConfig.theme.spacing['brutal-sm']).toBe('16px');
    });

    it('should have brutal-md spacing (24px)', () => {
      expect(fullConfig.theme.spacing).toHaveProperty('brutal-md');
      expect(fullConfig.theme.spacing['brutal-md']).toBe('24px');
    });

    it('should have brutal-lg spacing (32px)', () => {
      expect(fullConfig.theme.spacing).toHaveProperty('brutal-lg');
      expect(fullConfig.theme.spacing['brutal-lg']).toBe('32px');
    });

    it('should have brutal-xl spacing (48px)', () => {
      expect(fullConfig.theme.spacing).toHaveProperty('brutal-xl');
      expect(fullConfig.theme.spacing['brutal-xl']).toBe('48px');
    });

    it('should have brutal-2xl spacing (64px)', () => {
      expect(fullConfig.theme.spacing).toHaveProperty('brutal-2xl');
      expect(fullConfig.theme.spacing['brutal-2xl']).toBe('64px');
    });
  });

  // ============================================
  // COMPREHENSIVE CHECKS
  // ============================================

  describe('Configuration Integrity', () => {
    it('should extend theme without overriding defaults', () => {
      // Verify standard Tailwind utilities still exist
      expect(fullConfig.theme.colors).toHaveProperty('blue');
      expect(fullConfig.theme.colors).toHaveProperty('red');
      expect(fullConfig.theme.colors).toHaveProperty('gray');
    });

    it('should have dark mode enabled', () => {
      expect(tailwindConfig.darkMode).toBe('class');
    });

    it('should have content paths configured', () => {
      expect(tailwindConfig.content).toContain('./app/**/*.{js,ts,jsx,tsx,mdx}');
      expect(tailwindConfig.content).toContain('./components/**/*.{js,ts,jsx,tsx,mdx}');
    });
  });
});
