import React from 'react';

interface NeoButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export function NeoButton({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  fullWidth = false 
}: NeoButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    px-6 md:px-10 py-3 md:py-4
    border-4 border-[#000] rounded-lg
    transition-all duration-200 
    uppercase tracking-wider
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantClasses = {
    primary: `
      bg-[#0D7EFF] text-white
      shadow-brutal 
      hover:-translate-y-1 hover:shadow-brutal-lg
      active:translate-y-0 active:shadow-brutal-sm
    `,
    secondary: `
      bg-white text-[#0A0A0A]
      shadow-brutal 
      hover:bg-[#FFD60A] hover:-translate-y-1 hover:shadow-brutal-lg
      active:translate-y-0 active:shadow-brutal-sm
    `,
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '14px',
        fontWeight: 700,
      }}
    >
      {children}
    </button>
  );
}
