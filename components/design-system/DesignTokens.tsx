'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export interface ColorSwatchProps {
  name: string;
  hex: string;
  usage: string;
  textColor?: 'light' | 'dark';
}

export function ColorSwatch({ name, hex, usage, textColor = 'dark' }: ColorSwatchProps) {
  return (
    <div className="flex flex-col gap-3 group">
      <div
        className="h-32 rounded-brutal border-4 border-brutalist-border shadow-brutal transition-all group-hover:shadow-brutal-hover group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]"
        style={{ backgroundColor: hex }}
      />
      <div className="space-y-1">
        <h4 className="font-heading font-bold text-body text-sentence-case">{name}</h4>
        <code className="block text-body-sm font-mono text-brutalist-text-light/60">
          {hex}
        </code>
        <p className="text-body-sm text-brutalist-text-light/70">
          {usage}
        </p>
      </div>
    </div>
  );
}

export interface TypeScaleProps {
  style: string;
  font: string;
  size: string;
  weight: string;
  lineHeight: string;
  example: string;
}

export function TypeScale({ style, font, size, weight, lineHeight, example }: TypeScaleProps) {
  const getFontClass = () => {
    if (font === 'Space Grotesk') return 'font-heading';
    if (font === 'Inter') return 'font-body';
    if (font === 'JetBrains Mono') return 'font-mono';
    return 'font-body';
  };

  const getSizeClass = () => {
    const sizeMap: Record<string, string> = {
      'display-1': 'text-[72px]',
      'display-2': 'text-[60px]',
      'h1': 'text-h1',
      'h2': 'text-h2',
      'h3': 'text-h3',
      'h4': 'text-h4',
      'h5': 'text-h5',
      'body-xl': 'text-body-xl',
      'body-lg': 'text-body-lg',
      'body': 'text-body',
      'body-sm': 'text-body-sm',
    };
    return sizeMap[style] || 'text-body';
  };

  return (
    <Card hoverable className="overflow-hidden">
      <CardHeader className="bg-primary/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-h5">{style}</CardTitle>
          <Badge variant="outline" size="sm">
            {font}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-body-sm">
          <div>
            <span className="font-heading font-semibold text-brutalist-text-light/60">
              Size:
            </span>
            <code className="ml-2 font-mono text-secondary">{size}</code>
          </div>
          <div>
            <span className="font-heading font-semibold text-brutalist-text-light/60">
              Weight:
            </span>
            <code className="ml-2 font-mono text-secondary">{weight}</code>
          </div>
          <div className="col-span-2">
            <span className="font-heading font-semibold text-brutalist-text-light/60">
              Line Height:
            </span>
            <code className="ml-2 font-mono text-secondary">{lineHeight}</code>
          </div>
        </div>
        <div className="pt-4 border-t-4 border-brutalist-border">
          <p className={cn(getFontClass(), getSizeClass(), 'text-sentence-case')}>{example}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export interface ShadowExampleProps {
  name: string;
  value: string;
  usage: string;
}

export function ShadowExample({ name, value, usage }: ShadowExampleProps) {
  return (
    <Card hoverable>
      <CardContent className="flex flex-col items-center justify-center gap-6 p-8">
        <div
          className="w-32 h-32 bg-primary rounded-brutal border-4 border-brutalist-border"
          style={{ boxShadow: value }}
        />
        <div className="text-center space-y-2">
          <h4 className="font-heading font-bold text-body text-sentence-case">{name}</h4>
          <code className="block text-body-sm font-mono text-brutalist-text-light/60">
            {value}
          </code>
          <p className="text-body-sm text-brutalist-text-light/70">
            {usage}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export interface SpacingScaleProps {
  scale: number;
  value: string;
}

export function SpacingScale({ scale, value }: SpacingScaleProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-4 border-brutalist-border rounded-brutal bg-brutalist-surface-light">
      <div className="w-20 flex-shrink-0">
        <code className="font-mono font-bold text-body text-secondary">space-{scale}</code>
      </div>
      <div className="flex-1">
        <div
          className="h-8 bg-primary border-4 border-brutalist-border rounded-brutal"
          style={{ width: value }}
        />
      </div>
      <div className="w-20 flex-shrink-0 text-right">
        <code className="font-mono text-body-sm text-brutalist-text-light/60">
          {value}
        </code>
      </div>
    </div>
  );
}

export interface BorderRadiusProps {
  name: string;
  value: string;
  className?: string;
}

export function BorderRadius({ name, value, className }: BorderRadiusProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={cn(
          'w-32 h-32 bg-secondary border-4 border-brutalist-border shadow-brutal',
          className
        )}
        style={{ borderRadius: value }}
      />
      <div className="text-center space-y-1">
        <h4 className="font-heading font-bold text-body text-sentence-case">{name}</h4>
        <code className="block text-body-sm font-mono text-brutalist-text-light/60">
          {value}
        </code>
      </div>
    </div>
  );
}
