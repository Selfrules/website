import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

// Heading font - Space Grotesk
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'], // Note: 900 not available, using 700 for font-black
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Body font - Inter
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Code font - JetBrains Mono
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
  preload: true,
  fallback: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
});
