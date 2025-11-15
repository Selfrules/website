import React from 'react';

interface NeoBadgeProps {
  children: React.ReactNode;
  color?: 'blue' | 'pink' | 'yellow' | 'purple' | 'neutral';
  className?: string;
}

export function NeoBadge({ children, color = 'blue', className = '' }: NeoBadgeProps) {
  const colorClasses = {
    blue: 'bg-electric-blue text-white border-black',
    pink: 'bg-neon-pink text-white border-black',
    yellow: 'bg-cyber-yellow text-brutalist-text-primary border-black',
    purple: 'bg-deep-purple text-white border-black',
    neutral: 'bg-white text-brutalist-text-primary border-black',
  };

  return (
    <span
      className={`inline-block px-4 py-2 border-brutal-thin ${colorClasses[color]} rounded shadow-brutal-sm transition-transform duration-200 hover:-translate-y-1 font-heading text-[13px] font-bold tracking-wider uppercase ${className}`}
    >
      {children}
    </span>
  );
}