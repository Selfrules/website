'use client';

import React from 'react';

interface HighlightBoxProps {
  title: string;
  description: string;
  color?: 'blue' | 'pink' | 'purple' | 'yellow';
}

const colorStyles = {
  blue: 'border-[#0D7EFF]',
  pink: 'border-[#FF006E]',
  purple: 'border-[#7209B7]',
  yellow: 'border-[#FFD60A]',
};

export default function HighlightBox({ title, description, color = 'blue' }: HighlightBoxProps) {
  const borderColor = colorStyles[color];

  return (
    <div className={`border-l-4 ${borderColor} pl-4 py-2 my-4`}>
      <h4
        className="text-body mb-2"
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
      >
        {title}
      </h4>
      <p className="text-body-small text-[#2D2D2D]">{description}</p>
    </div>
  );
}
