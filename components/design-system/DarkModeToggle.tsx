'use client';

/**
 * Dark mode toggle for design system preview
 * @component
 * @category Design System
 */
interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function DarkModeToggle({ isDark, onToggle }: DarkModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 bg-white border-3 border-[#000] rounded-brutal shadow-brutal hover:-translate-y-0.5 transition-all"
      style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: 600,
        fontSize: '14px',
      }}
    >
      {isDark ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          Light Mode
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
          Dark Mode
        </>
      )}
    </button>
  );
}
