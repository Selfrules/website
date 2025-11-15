import React from 'react';

interface NeoBadgeProps {
  children: React.ReactNode;
  color?: 'blue' | 'pink' | 'yellow' | 'purple' | 'neutral' | 'teal';
  className?: string;
  onClick?: () => void;
}

export function NeoBadge({ children, color = 'blue', className = '', onClick }: NeoBadgeProps) {
  const colorClasses = {
    blue: 'bg-electric-blue text-white border-black',
    pink: 'bg-neon-pink text-white border-black',
    yellow: 'bg-cyber-yellow text-brutalist-text-primary border-black',
    purple: 'bg-deep-purple text-white border-black',
    neutral: 'bg-white text-brutalist-text-primary border-black',
    teal: 'bg-teal text-white border-black',
  };

  return (
    <span
      onClick={onClick}
      className={`inline-block px-4 py-2 border-brutal-thin ${colorClasses[color]} rounded shadow-brutal-sm transition-transform duration-200 hover:-translate-y-1 font-heading text-[13px] font-bold tracking-wider uppercase ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </span>
  );
}