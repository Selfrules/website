import { ImageResponse } from 'next/og';

/**
 * Favicon Generator - Neobrutalist Style
 *
 * Generates PNG favicon dynamically using Next.js ImageResponse API.
 * Features a bold "M" letter with brutal borders matching the design system.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
 */
export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFCF2', // Cream background
          borderRadius: '4px',
        }}
      >
        {/* M Letter - Neobrutalist Style */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left vertical bar */}
          <rect x="6" y="8" width="4" height="16" fill="#0D7EFF" stroke="#000000" strokeWidth="2" />

          {/* Middle diagonal left */}
          <path
            d="M 10 8 L 16 16 L 16 12 L 12 8 Z"
            fill="#0D7EFF"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="miter"
          />

          {/* Middle diagonal right */}
          <path
            d="M 16 12 L 16 16 L 22 8 L 20 8 Z"
            fill="#0D7EFF"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="miter"
          />

          {/* Right vertical bar */}
          <rect x="22" y="8" width="4" height="16" fill="#0D7EFF" stroke="#000000" strokeWidth="2" />

          {/* Brutal shadow effect */}
          <rect x="8" y="26" width="2" height="2" fill="#000000" opacity="0.3" />
          <rect x="24" y="26" width="2" height="2" fill="#000000" opacity="0.3" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
