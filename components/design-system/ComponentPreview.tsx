'use client';

import { ReactNode } from 'react';
import CodeBlock from './CodeBlock';

/**
 * Component preview with live example and code
 * @component
 * @category Design System
 */
interface ComponentPreviewProps {
  title: string;
  description?: string;
  preview: ReactNode;
  code: string;
  language?: string;
  isDark?: boolean;
}

export default function ComponentPreview({
  title,
  description,
  preview,
  code,
  language = 'tsx',
  isDark = false
}: ComponentPreviewProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-h3 text-[#0A0A0A] mb-2">{title}</h3>
        {description && (
          <p className="text-body-small text-[#6B7280]">{description}</p>
        )}
      </div>

      {/* Live Preview */}
      <div
        className={`border-4 border-[#000] rounded-brutal p-8 ${
          isDark ? 'bg-[#0A0A0A]' : 'bg-white'
        }`}
      >
        {preview}
      </div>

      {/* Code */}
      <CodeBlock code={code} language={language} />
    </div>
  );
}
