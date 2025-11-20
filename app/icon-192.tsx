import { ImageResponse } from 'next/og';

/**
 * Icon 192x192 Generator - Neobrutalist Style
 * For PWA manifest and Android home screen
 */
export const runtime = 'edge';

export const size = {
  width: 192,
  height: 192,
};

export const contentType = 'image/png';

export default function Icon192() {
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
          borderRadius: '24px',
        }}
      >
        <svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="25" y="35" width="20" height="80" fill="#FFFCF2" stroke="#000000" strokeWidth="6" />
          <path
            d="M 45 35 L 75 75 L 75 55 L 55 35 Z"
            fill="#FFFCF2"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="miter"
          />
          <path
            d="M 75 55 L 75 75 L 105 35 L 95 35 Z"
            fill="#FFFCF2"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="miter"
          />
          <rect x="105" y="35" width="20" height="80" fill="#FFFCF2" stroke="#000000" strokeWidth="6" />
          <rect x="37" y="123" width="8" height="8" fill="#000000" opacity="0.4" />
          <rect x="113" y="123" width="8" height="8" fill="#000000" opacity="0.4" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
