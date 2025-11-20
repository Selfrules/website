import { ImageResponse } from 'next/og';

/**
 * Icon 512x512 Generator - Neobrutalist Style
 * For PWA splash screens and high-resolution displays
 */
export const runtime = 'edge';

export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

export default function Icon512() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0D7EFF',
          borderRadius: '64px',
        }}
      >
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="70" y="100" width="60" height="200" fill="#FFFCF2" stroke="#000000" strokeWidth="12" />
          <path
            d="M 130 100 L 200 200 L 200 150 L 160 100 Z"
            fill="#FFFCF2"
            stroke="#000000"
            strokeWidth="12"
            strokeLinejoin="miter"
          />
          <path
            d="M 200 150 L 200 200 L 270 100 L 240 100 Z"
            fill="#FFFCF2"
            stroke="#000000"
            strokeWidth="12"
            strokeLinejoin="miter"
          />
          <rect x="270" y="100" width="60" height="200" fill="#FFFCF2" stroke="#000000" strokeWidth="12" />
          <rect x="94" y="320" width="20" height="20" fill="#000000" opacity="0.4" />
          <rect x="286" y="320" width="20" height="20" fill="#000000" opacity="0.4" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
