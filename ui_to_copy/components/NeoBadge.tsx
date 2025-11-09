import React from 'react';

interface NeoBadgeProps {
  children: React.ReactNode;
  color?: 'blue' | 'pink' | 'yellow' | 'purple' | 'neutral';
  className?: string;
}

export function NeoBadge({ children, color = 'blue', className = '' }: NeoBadgeProps) {
  const colorClasses = {
    blue: 'bg-[#0D7EFF] text-white border-[#000]',
    pink: 'bg-[#FF006E] text-white border-[#000]',
    yellow: 'bg-[#FFD60A] text-[#0A0A0A] border-[#000]',
    purple: 'bg-[#7209B7] text-white border-[#000]',
    neutral: 'bg-white text-[#0A0A0A] border-[#000]',
  };

  return (
    <span
      className={`inline-block px-4 py-2 border-3 ${colorClasses[color]} rounded shadow-brutal-sm transition-transform duration-200 hover:-translate-y-1 ${className}`}
      style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  );
}
