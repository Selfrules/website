/**
 * Tailwind Design System Configuration Tests
 *
 * Tests to verify that all design tokens are properly configured
 * according to the DS-001 specification with Figma Make palette.
 */

import tailwindConfig from './tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig(tailwindConfig);

// Type assertion for custom design tokens
const colors = fullConfig.theme.colors as any;
const borderWidth = fullConfig.theme.borderWidth as any;
const boxShadow = fullConfig.theme.boxShadow as any;
const borderRadius = fullConfig.theme.borderRadius as any;
const spacing = fullConfig.theme.spacing as any;

describe('Tailwind Design System Configuration', () => {

  // ============================================
  // BRAND COLORS TESTS (FIGMA MAKE PALETTE)
  // ============================================

  describe('Brand Colors', () => {
    it('should have electric-blue defined (#0D7EFF)', () => {
      expect(colors).toHaveProperty('electric-blue');
      expect(colors['electric-blue']).toBe('#0D7EFF');
    });

    it('should have teal defined (#2A687A)', () => {
      expect(colors).toHaveProperty('teal');
      expect(colors['teal']).toBe('#2A687A');
    });

    it('should have deep-purple defined (#7209B7)', () => {
      expect(colors).toHaveProperty('deep-purple');
      expect(colors['deep-purple']).toBe('#7209B7');
    });

    it('should have neon-pink defined (#FF006E)', () => {
      expect(colors).toHaveProperty('neon-pink');
      expect(colors['neon-pink']).toBe('#FF006E');
    });

    it('should have cyber-yellow defined (#FFD60A)', () => {
      expect(colors).toHaveProperty('cyber-yellow');
      expect(colors['cyber-yellow']).toBe('#FFD60A');
    });
  });

  // ============================================
  // SEMANTIC COLORS TESTS
  // ============================================

  describe('Semantic Colors', () => {
    it('should map primary to electric-blue', () => {
      expect(colors.primary?.DEFAULT).toBe('#0D7EFF');
    });

    it('should map secondary to neon-pink', () => {
      expect(colors.secondary?.DEFAULT).toBe('#FF006E');
    });

    it('should map accent to cyber-yellow', () => {
      expect(colors.accent?.DEFAULT).toBe('#FFD60A');
    });

    it('should have purple mapped to deep-purple', () => {
      expect(colors.purple?.DEFAULT).toBe('#7209B7');
    });
  });

  // ============================================
  // FUNCTIONAL COLORS TESTS
  // ============================================

  describe('Functional Colors', () => {
    it('should have brutal-black defined', () => {
      expect(colors).toHaveProperty('brutal-black');
      expect(colors['brutal-black']).toBe('#000000');
    });

    it('should have brutal-white defined', () => {
      expect(colors).toHaveProperty('brutal-white');
      expect(colors['brutal-white']).toBe('#FFFFFF');
    });

    it('should have cream background color', () => {
      expect(colors).toHaveProperty('cream');
      expect(colors['cream']).toBe('#FFFCF2');
    });
  });

  // ============================================
  // BORDER WIDTH TESTS
  // ============================================

  describe('Border Widths', () => {
    it('should have brutal border utilities', () => {
      expect(borderWidth).toHaveProperty('brutal');
      expect(borderWidth.brutal).toBe('4px');
    });

    it('should have brutal-thin', () => {
      expect(borderWidth).toHaveProperty('brutal-thin');
      expect(borderWidth['brutal-thin']).toBe('3px');
    });

    it('should have brutal-thick', () => {
      expect(borderWidth).toHaveProperty('brutal-thick');
      expect(borderWidth['brutal-thick']).toBe('6px');
    });

    it('should have brutal-extra-thick', () => {
      expect(borderWidth).toHaveProperty('brutal-extra-thick');
      expect(borderWidth['brutal-extra-thick']).toBe('8px');
    });
  });

  // ============================================
  // BOX SHADOW TESTS
  // ============================================

  describe('Box Shadows', () => {
    it('should have brutal shadow', () => {
      expect(boxShadow).toHaveProperty('brutal');
      expect(boxShadow.brutal).toBe('8px 8px 0px 0px #000000');
    });

    it('should have brutal-sm shadow', () => {
      expect(boxShadow).toHaveProperty('brutal-sm');
      expect(boxShadow['brutal-sm']).toBe('4px 4px 0px 0px #000000');
    });

    it('should have brutal-lg shadow', () => {
      expect(boxShadow).toHaveProperty('brutal-lg');
      expect(boxShadow['brutal-lg']).toBe('16px 16px 0px 0px #000000');
    });

    it('should have brutal-hover shadow', () => {
      expect(boxShadow).toHaveProperty('brutal-hover');
      expect(boxShadow['brutal-hover']).toBe('12px 12px 0px 0px #000000');
    });

    it('should have colored shadows for all brand colors', () => {
      expect(boxShadow).toHaveProperty('brutal-colored-blue');
      expect(boxShadow['brutal-colored-blue']).toBe('8px 8px 0px 0px #0D7EFF');

      expect(boxShadow).toHaveProperty('brutal-colored-purple');
      expect(boxShadow['brutal-colored-purple']).toBe('8px 8px 0px 0px #7209B7');

      expect(boxShadow).toHaveProperty('brutal-colored-pink');
      expect(boxShadow['brutal-colored-pink']).toBe('8px 8px 0px 0px #FF006E');

      expect(boxShadow).toHaveProperty('brutal-colored-yellow');
      expect(boxShadow['brutal-colored-yellow']).toBe('8px 8px 0px 0px #FFD60A');

      expect(boxShadow).toHaveProperty('brutal-colored-teal');
      expect(boxShadow['brutal-colored-teal']).toBe('8px 8px 0px 0px #2A687A');
    });
  });

  // ============================================
  // BORDER RADIUS TESTS
  // ============================================

  describe('Border Radius', () => {
    it('should have brutal border radius', () => {
      expect(borderRadius).toHaveProperty('brutal');
      expect(borderRadius.brutal).toBe('6px');
    });

    it('should have brutal-sm border radius', () => {
      expect(borderRadius).toHaveProperty('brutal-sm');
      expect(borderRadius['brutal-sm']).toBe('4px');
    });

    it('should have brutal-lg border radius', () => {
      expect(borderRadius).toHaveProperty('brutal-lg');
      expect(borderRadius['brutal-lg']).toBe('8px');
    });
  });

  // ============================================
  // SPACING TESTS (8PT GRID)
  // ============================================

  describe('Brutal Spacing (8pt Grid)', () => {
    it('should have brutal-xs spacing (8px)', () => {
      expect(spacing).toHaveProperty('brutal-xs');
      expect(spacing['brutal-xs']).toBe('8px');
    });

    it('should have brutal-sm spacing (16px)', () => {
      expect(spacing).toHaveProperty('brutal-sm');
      expect(spacing['brutal-sm']).toBe('16px');
    });

    it('should have brutal-md spacing (24px)', () => {
      expect(spacing).toHaveProperty('brutal-md');
      expect(spacing['brutal-md']).toBe('24px');
    });

    it('should have brutal-lg spacing (32px)', () => {
      expect(spacing).toHaveProperty('brutal-lg');
      expect(spacing['brutal-lg']).toBe('32px');
    });

    it('should have brutal-xl spacing (48px)', () => {
      expect(spacing).toHaveProperty('brutal-xl');
      expect(spacing['brutal-xl']).toBe('48px');
    });

    it('should have brutal-2xl spacing (64px)', () => {
      expect(spacing).toHaveProperty('brutal-2xl');
      expect(spacing['brutal-2xl']).toBe('64px');
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
