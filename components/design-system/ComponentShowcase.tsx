'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check, Code, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface ComponentShowcaseProps {
  title: string;
  description: string;
  component: React.ReactNode;
  code: string;
  props?: PropDefinition[];
  variants?: Array<{
    label: string;
    component: React.ReactNode;
  }>;
  className?: string;
}

export function ComponentShowcase({
  title,
  description,
  component,
  code,
  props = [],
  variants = [],
  className,
}: ComponentShowcaseProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <Card className={cn('overflow-hidden', className)} id={title.toLowerCase().replace(/\s+/g, '-')}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <Badge variant="outline" size="sm">
            Component
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 border-b-4 border-brutalist-border pb-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 font-heading font-bold text-body border-4 border-brutalist-border rounded-brutal transition-all',
              activeTab === 'preview'
                ? 'bg-primary text-brutalist-text-light shadow-brutal-sm'
                : 'bg-transparent hover:bg-brutalist-border/5'
            )}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 font-heading font-bold text-body border-4 border-brutalist-border rounded-brutal transition-all',
              activeTab === 'code'
                ? 'bg-primary text-brutalist-text-light shadow-brutal-sm'
                : 'bg-transparent hover:bg-brutalist-border/5'
            )}
          >
            <Code className="w-4 h-4" />
            Code
          </button>
        </div>

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="space-y-6">
            {/* Main Component Preview */}
            <div className="p-8 border-4 border-brutalist-border rounded-brutal bg-brutalist-bg-light flex items-center justify-center min-h-[200px]">
              {component}
            </div>

            {/* Variants */}
            {variants.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-heading font-bold text-h5 text-sentence-case">Variants</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {variants.map((variant, index) => (
                    <div
                      key={index}
                      className="p-6 border-4 border-brutalist-border rounded-brutal bg-brutalist-surface-light flex flex-col items-center justify-center gap-4 min-h-[150px]"
                    >
                      <span className="text-body-sm font-heading font-semibold text-brutalist-text-light/60">
                        {variant.label}
                      </span>
                      {variant.component}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Code Tab */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="bg-brutalist-surface-light/90"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="border-4 border-brutalist-border rounded-brutal overflow-hidden">
                <SyntaxHighlighter
                  language="tsx"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                  showLineNumbers
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        )}

        {/* Props Table */}
        {props.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-h5 text-sentence-case">Props</h4>
            <div className="border-4 border-brutalist-border rounded-brutal overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary text-brutalist-text-light">
                    <tr>
                      <th className="px-4 py-3 text-left font-heading font-bold text-body border-b-4 border-r-4 border-brutalist-border">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left font-heading font-bold text-body border-b-4 border-r-4 border-brutalist-border">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left font-heading font-bold text-body border-b-4 border-r-4 border-brutalist-border">
                        Default
                      </th>
                      <th className="px-4 py-3 text-left font-heading font-bold text-body border-b-4 border-brutalist-border">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-brutalist-surface-light">
                    {props.map((prop, index) => (
                      <tr
                        key={prop.name}
                        className={cn(
                          index !== props.length - 1 && 'border-b-4 border-brutalist-border'
                        )}
                      >
                        <td className="px-4 py-3 border-r-4 border-brutalist-border">
                          <code className="text-body-sm font-mono font-semibold text-secondary">
                            {prop.name}
                          </code>
                          {prop.required && (
                            <Badge variant="accent" size="sm" className="ml-2">
                              Required
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 border-r-4 border-brutalist-border">
                          <code className="text-body-sm font-mono text-brutalist-text-light/70">
                            {prop.type}
                          </code>
                        </td>
                        <td className="px-4 py-3 border-r-4 border-brutalist-border">
                          {prop.default ? (
                            <code className="text-body-sm font-mono text-accent">
                              {prop.default}
                            </code>
                          ) : (
                            <span className="text-body-sm text-brutalist-text-light/40">
                              -
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-body-sm text-brutalist-text-light">
                            {prop.description}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
