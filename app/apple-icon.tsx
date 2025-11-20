import { ImageResponse } from 'next/og';

/**
 * Apple Touch Icon Generator - Neobrutalist Style
 *
 * Generates 180x180 PNG for iOS home screen icon.
 * Features a bold "M" letter with brutal borders matching the design system.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
 */
export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0D7EFF', // Electric Blue background for prominence
          borderRadius: '36px', // iOS rounds corners automatically, but we pre-round for consistency
        }}
      >
        {/* M Letter - Scaled for 180x180 */}
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left vertical bar */}
          <rect x="20" y="30" width="20" height="80" fill="#FFFCF2" stroke="#000000" strokeWidth="6" />

          {/* Middle diagonal left */}
          <path
            d="M 40 30 L 70 70 L 70 50 L 50 30 Z"
            fill="#FFFCF2"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="miter"
          />

          {/* Middle diagonal right */}
          <path
            d="M 70 50 L 70 70 L 100 30 L 90 30 Z"
            fill="#FFFCF2"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="miter"
          />

          {/* Right vertical bar */}
          <rect x="100" y="30" width="20" height="80" fill="#FFFCF2" stroke="#000000" strokeWidth="6" />

          {/* Brutal shadow effect (bottom-right) */}
          <rect x="32" y="118" width="8" height="8" fill="#000000" opacity="0.4" />
          <rect x="108" y="118" width="8" height="8" fill="#000000" opacity="0.4" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
