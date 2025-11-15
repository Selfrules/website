/**
 * CodeBlock component with custom brutalist syntax highlighting
 * @component
 * @category MDX Components
 */

'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
  showLineNumbers?: boolean;
}

// Custom brutalist theme for syntax highlighter
const brutalistTheme = {
  'code[class*="language-"]': {
    color: '#0A0A0A',
    background: '#FFFCF2',
    fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
    fontSize: '14px',
    lineHeight: '1.6',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#0A0A0A',
    background: '#FFFCF2',
    fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
    fontSize: '14px',
    lineHeight: '1.6',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1.5rem',
    margin: '0',
    overflow: 'auto',
  },
  comment: { color: '#6B7280', fontStyle: 'italic' },
  prolog: { color: '#6B7280' },
  doctype: { color: '#6B7280' },
  cdata: { color: '#6B7280' },
  punctuation: { color: '#0A0A0A' },
  property: { color: '#7209B7' },
  tag: { color: '#0D7EFF' },
  boolean: { color: '#FF006E' },
  number: { color: '#FF006E' },
  constant: { color: '#FF006E' },
  symbol: { color: '#FF006E' },
  deleted: { color: '#FF006E' },
  selector: { color: '#2A687A' },
  'attr-name': { color: '#2A687A' },
  string: { color: '#2A687A' },
  char: { color: '#2A687A' },
  builtin: { color: '#7209B7' },
  inserted: { color: '#2A687A' },
  operator: { color: '#0D7EFF' },
  entity: { color: '#0D7EFF' },
  url: { color: '#0D7EFF' },
  '.language-css .token.string': { color: '#0D7EFF' },
  '.style .token.string': { color: '#0D7EFF' },
  variable: { color: '#7209B7' },
  atrule: { color: '#FF006E' },
  'attr-value': { color: '#2A687A' },
  function: { color: '#0D7EFF', fontWeight: 'bold' },
  'class-name': { color: '#7209B7', fontWeight: 'bold' },
  keyword: { color: '#FF006E', fontWeight: 'bold' },
  regex: { color: '#2A687A' },
  important: { color: '#FF006E', fontWeight: 'bold' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
};

export default function CodeBlock({
  children,
  className,
  language: langProp,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., "language-typescript")
  const match = /language-(\w+)/.exec(className || '');
  const language = langProp || match?.[1] || 'text';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-brutal-md group">
      {/* Language label and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-brutal border-black rounded-t-brutal">
        <span
          className="text-xs font-bold uppercase tracking-wide text-brutalist-text-secondary"
          style={{ fontFamily: 'Space Mono, monospace' }}
        >
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-black rounded text-xs font-bold hover:shadow-brutal-sm transition-all"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copiato!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copia
            </>
          )}
        </button>
      </div>

      {/* Code block */}
      <div className="border-brutal border-t-0 border-black rounded-b-brutal shadow-brutal overflow-hidden">
        <SyntaxHighlighter
          language={language}
          style={brutalistTheme as any}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1em',
            color: '#9CA3AF',
            borderRight: '2px solid #E5E7EB',
            marginRight: '1em',
            userSelect: 'none',
          }}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: '#FFFCF2',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
            },
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
