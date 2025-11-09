'use client';

import React from 'react';

interface FrameworkBoxProps {
  title: string;
  items: Array<{
    title: string;
    description: string;
  }>;
}

export default function FrameworkBox({ title, items }: FrameworkBoxProps) {
  return (
    <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 my-6">
      <h4 className="text-h4 text-[#0A0A0A] mb-3">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-[#FFFCF2] border-2 border-[#000] rounded p-4">
            <h5
              className="text-body-small mb-2"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
            >
              {item.title}
            </h5>
            <p className="text-body-small text-[#2D2D2D]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
