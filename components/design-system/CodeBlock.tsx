'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './CopyButton';

/**
 * Code block with syntax highlighting and copy button
 * @component
 * @category Design System
 */
interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language = 'tsx',
  showLineNumbers = false
}: CodeBlockProps) {
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        <CopyButton code={code} />
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: '6px',
          border: '4px solid #000',
          fontSize: '13px',
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
