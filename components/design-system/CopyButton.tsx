'use client';

import { useState } from 'react';

/**
 * Copy button component for code snippets
 * @component
 * @category Design System
 */
interface CopyButtonProps {
  code: string;
  className?: string;
}

export default function CopyButton({ code, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      data-copy-code
      className={`px-3 py-1.5 bg-[#0D7EFF] text-white border-2 border-[#000] rounded shadow-brutal-sm hover:-translate-y-0.5 transition-all text-xs font-bold ${className}`}
      style={{
        fontFamily: 'Space Grotesk, sans-serif',
      }}
    >
      {copied ? '✓ Copiato!' : 'Copia'}
    </button>
  );
}
