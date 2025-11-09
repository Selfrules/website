'use client';

import React from 'react';

interface Metric {
  value: string;
  label: string;
  color: 'blue' | 'pink' | 'purple' | 'yellow';
}

interface MetricsGridProps {
  metrics: Metric[];
}

const colorStyles = {
  blue: { bg: 'bg-[#0D7EFF]', text: 'text-white' },
  pink: { bg: 'bg-[#FF006E]', text: 'text-white' },
  purple: { bg: 'bg-[#7209B7]', text: 'text-white' },
  yellow: { bg: 'bg-[#FFD60A]', text: 'text-[#0A0A0A]' },
};

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {metrics.map((metric, index) => {
        const styles = colorStyles[metric.color];
        return (
          <div
            key={index}
            className={`${styles.bg} border-4 border-[#000] rounded-lg shadow-brutal p-6`}
          >
            <p
              className={`text-5xl mb-2 ${styles.text}`}
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900 }}
            >
              {metric.value}
            </p>
            <p className={`text-body-small ${styles.text} m-0`}>{metric.label}</p>
          </div>
        );
      })}
    </div>
  );
}
