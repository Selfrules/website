'use client';

import React from 'react';

interface InsightCardProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'blue' | 'pink' | 'purple';
}

const variantStyles = {
  yellow: 'bg-[#FFD60A]',
  blue: 'bg-[#0D7EFF]',
  pink: 'bg-[#FF006E]',
  purple: 'bg-[#7209B7]',
};

export default function InsightCard({ children, variant = 'yellow' }: InsightCardProps) {
  const bgColor = variantStyles[variant];

  return (
    <div className={`${bgColor} border-4 border-[#000] rounded-lg shadow-brutal p-6 my-6 -rotate-1`}>
      <p
        className="text-body text-[#0A0A0A] m-0"
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
      >
        {children}
      </p>
    </div>
  );
}
