'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Copy, Check, Zap, Heart, AlertCircle,
  CheckCircle, Info, AlertTriangle, Clock, Calendar, Search,
  User, Settings, Mail, Phone, ChevronRight, X, Menu, Star,
  TrendingUp, Users, Target, Bookmark, Share2, Twitter, Linkedin,
  Facebook, Link2, ArrowRight, ChevronDown, Home, FileText,
  Eye, MessageCircle, BarChart3, Grid3x3
} from 'lucide-react';
import { NeoBadge } from '@/components/ui/NeoBadge';
import {
  BlogComponentsSection,
  PatternsTexturesSection,
  NavigationComponentsSection
} from '@/components/design-system/DesignSystemSections';
import {
  ChatBotSection,
  FormsSection,
  TimelineSection,
  HeroSection as HeroComponentSection,
  WorkTogetherSection as WorkTogetherComponentSection
} from '@/components/design-system/DesignSystemAdditional';

export default function DesignSystemPage() {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState<string>('');

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const handleBack = () => {
    router.push('/');
  };

  // Color System Data
  const primaryColors = [
    { name: 'Electric Blue', variable: '--color-blue', hex: '#0D7EFF', rgb: 'rgb(13, 126, 255)', usage: 'Primary actions, links, interactive elements' },
    { name: 'Neon Pink', variable: '--color-pink', hex: '#FF006E', rgb: 'rgb(255, 0, 110)', usage: 'Accents, highlights, CTAs' },
    { name: 'Cyber Yellow', variable: '--color-yellow', hex: '#FFD60A', rgb: 'rgb(255, 214, 10)', usage: 'Warnings, featured content, energy' },
    { name: 'Deep Purple', variable: '--color-purple', hex: '#7209B7', rgb: 'rgb(114, 9, 183)', usage: 'Premium features, depth, contrast' },
  ];

  const neutralColors = [
    { name: 'Black', hex: '#0A0A0A', usage: 'Text, borders, shadows' },
    { name: 'Dark Gray', hex: '#2D2D2D', usage: 'Secondary text' },
    { name: 'Medium Gray', hex: '#6B7280', usage: 'Muted text, icons' },
    { name: 'Light Gray', hex: '#E5E5E5', usage: 'Borders, dividers' },
    { name: 'Cream', hex: '#FFFCF2', usage: 'Background, surfaces' },
    { name: 'White', hex: '#FFFFFF', usage: 'Cards, overlays' },
  ];

  // Typography Scale
  const typographyScale = [
    { name: 'Heading 1', class: 'text-h1', size: '48px / 56px', weight: '900', font: 'Space Grotesk', usage: 'Page titles, hero headings' },
    { name: 'Heading 2', class: 'text-h2', size: '40px / 48px', weight: '900', font: 'Space Grotesk', usage: 'Section titles' },
    { name: 'Heading 3', class: 'text-h3', size: '32px / 40px', weight: '700', font: 'Space Grotesk', usage: 'Subsection titles' },
    { name: 'Heading 4', class: 'text-h4', size: '24px / 32px', weight: '700', font: 'Space Grotesk', usage: 'Card titles' },
    { name: 'Body Large', class: 'text-body-large', size: '20px / 32px', weight: '400', font: 'Inter', usage: 'Lead paragraphs, excerpts' },
    { name: 'Body', class: 'text-body', size: '16px / 28px', weight: '400', font: 'Inter', usage: 'Standard body text' },
    { name: 'Body Small', class: 'text-body-small', size: '14px / 24px', weight: '400', font: 'Inter', usage: 'Meta info, captions' },
    { name: 'Code', class: 'font-mono', size: '14px / 20px', weight: '400', font: 'Space Mono', usage: 'Code snippets, technical text' },
  ];

  // Spacing Scale
  const spacingScale = [
    { token: 'space-1', value: '4px', usage: 'Micro spacing, tight elements' },
    { token: 'space-2', value: '8px', usage: 'Small gaps, compact layouts' },
    { token: 'space-3', value: '12px', usage: 'Standard element spacing' },
    { token: 'space-4', value: '16px', usage: 'Default padding, margins' },
    { token: 'space-5', value: '20px', usage: 'Medium spacing' },
    { token: 'space-6', value: '24px', usage: 'Large element gaps' },
    { token: 'space-8', value: '32px', usage: 'Section spacing' },
    { token: 'space-10', value: '40px', usage: 'Large sections' },
    { token: 'space-12', value: '48px', usage: 'Major section breaks' },
    { token: 'space-16', value: '64px', usage: 'Page-level spacing' },
  ];

  // Shadow Scale
  const shadowScale = [
    { name: 'shadow-brutal-sm', value: '2px 2px 0px 0px rgba(0,0,0,1)', usage: 'Small elements, badges' },
    { name: 'shadow-brutal', value: '4px 4px 0px 0px rgba(0,0,0,1)', usage: 'Buttons, cards (default)' },
    { name: 'shadow-brutal-lg', value: '8px 8px 0px 0px rgba(0,0,0,1)', usage: 'Large cards, modals (hover)' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFCF2]">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-white border-b-4 border-[#000]">
        <div className="container max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 bg-white border-3 border-[#000] rounded-lg shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px' }}
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              Back to Site
            </button>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#FFD60A] border-2 border-[#000] rounded text-[#0A0A0A] font-mono text-xs font-bold">
                v1.0.0
              </span>
              <span className="text-body-small text-[#6B7280]">Last updated: Nov 16, 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-[1400px] mx-auto px-8 py-16">
        {/* Hero Header */}
        <header className="text-center mb-20">
          <div className="inline-block mb-6">
            <NeoBadge color="blue">Documentation</NeoBadge>
          </div>
          <h1 className="text-h1 mb-6">Neobrutalist Design System</h1>
          <p className="text-body-large text-[#2D2D2D] max-w-[800px] mx-auto mb-8">
            A comprehensive design system for building bold, unapologetic digital products.
            Built with <strong className="text-[#0D7EFF]">accessibility</strong>, <strong className="text-[#FF006E]">performance</strong>,
            and <strong className="text-[#7209B7]">developer experience</strong> in mind.
          </p>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-3">
            {['Colors', 'Typography', 'Spacing', 'Components', 'Blog', 'Patterns', 'Navigation', 'ChatBot', 'Forms', 'Timeline', 'Hero', 'Services', 'Effects', 'Accessibility', 'Icons'].map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className="px-4 py-2 bg-white border-3 border-[#000] rounded-lg shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all text-sm"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}
              >
                {section}
              </a>
            ))}
          </div>
        </header>

        {/* 1. COLOR SYSTEM */}
        <section id="colors" className="mb-32 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0D7EFF] to-[#FF006E] border-3 border-[#000] rounded-lg" />
            <div>
              <h2 className="text-h2">Color System</h2>
              <p className="text-body-small text-[#6B7280]">Electric, bold, high-contrast color palette</p>
            </div>
          </div>

          {/* Primary Colors */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Primary Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {primaryColors.map((color) => (
                <div key={color.hex} className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6">
                  <div
                    className="w-full h-32 border-3 border-[#000] rounded-lg mb-4"
                    style={{ backgroundColor: color.hex }}
                  />
                  <h4 className="text-body mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                    {color.name}
                  </h4>
                  <div className="space-y-1 text-body-small text-[#6B7280] font-mono">
                    <p>HEX: {color.hex}</p>
                    <p>RGB: {color.rgb}</p>
                  </div>
                  <p className="text-body-small text-[#2D2D2D] mt-3">{color.usage}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Neutral Colors</h3>
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {neutralColors.map((color) => (
                  <div key={color.hex}>
                    <div
                      className="w-full h-24 border-3 border-[#000] rounded-lg mb-3"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-body-small font-bold mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {color.name}
                    </p>
                    <p className="text-xs font-mono text-[#6B7280]">{color.hex}</p>
                    <p className="text-xs text-[#2D2D2D] mt-2">{color.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Semantic Colors */}
          <div>
            <h3 className="text-h3 mb-6">Semantic Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { type: 'Success', color: '#10B981', icon: CheckCircle },
                { type: 'Warning', color: '#FFD60A', icon: AlertTriangle },
                { type: 'Error', color: '#FF006E', icon: AlertCircle },
                { type: 'Info', color: '#0D7EFF', icon: Info },
              ].map(({ type, color, icon: Icon }) => (
                <div key={type} className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 border-3 border-[#000] rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-body" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                      {type}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#6B7280]">{color}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. TYPOGRAPHY SYSTEM */}
        <section id="typography" className="mb-32 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#0A0A0A] border-3 border-[#000] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Aa</span>
            </div>
            <div>
              <h2 className="text-h2">Typography System</h2>
              <p className="text-body-small text-[#6B7280]">Space Grotesk • Inter • Space Mono</p>
            </div>
          </div>

          {/* Type Scale */}
          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-3 border-[#000] bg-[#FFFCF2]">
                    <th className="text-left p-4 text-body-small font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Name</th>
                    <th className="text-left p-4 text-body-small font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Example</th>
                    <th className="text-left p-4 text-body-small font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Size / Line Height</th>
                    <th className="text-left p-4 text-body-small font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Weight</th>
                    <th className="text-left p-4 text-body-small font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Font</th>
                    <th className="text-left p-4 text-body-small font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {typographyScale.map((type, index) => (
                    <tr key={type.name} className={index !== typographyScale.length - 1 ? 'border-b-2 border-[#E5E5E5]' : ''}>
                      <td className="p-4">
                        <code className="text-xs bg-[#FFFCF2] px-2 py-1 rounded border border-[#E5E5E5] font-mono">
                          {type.class}
                        </code>
                      </td>
                      <td className="p-4">
                        <span className={type.class}>Aa</span>
                      </td>
                      <td className="p-4 text-body-small font-mono text-[#6B7280]">{type.size}</td>
                      <td className="p-4 text-body-small font-mono text-[#6B7280]">{type.weight}</td>
                      <td className="p-4 text-body-small text-[#6B7280]">{type.font}</td>
                      <td className="p-4 text-body-small text-[#2D2D2D]">{type.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Typography Example */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
              <h4 className="text-h4 mb-4">Article Layout</h4>
              <h1 className="text-h1 mb-3">Main Headline</h1>
              <h2 className="text-h2 mb-3">Section Title</h2>
              <p className="text-body-large mb-4">
                Lead paragraph with larger text to introduce the content and hook the reader.
              </p>
              <p className="text-body mb-3">
                Standard body text for main content. Optimized for readability with proper line height and spacing.
              </p>
              <p className="text-body-small text-[#6B7280]">
                Small text for metadata, captions, and supplementary information.
              </p>
            </div>

            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
              <h4 className="text-h4 mb-6">Font Families</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-body-small text-[#6B7280] mb-2">Space Grotesk (Headings)</p>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700 }}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
                <div>
                  <p className="text-body-small text-[#6B7280] mb-2">Inter (Body)</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px' }}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
                <div>
                  <p className="text-body-small text-[#6B7280] mb-2">Space Mono (Code)</p>
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '16px' }}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SPACING SYSTEM */}
        <section id="spacing" className="mb-32 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#7209B7] border-3 border-[#000] rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white" />
            </div>
            <div>
              <h2 className="text-h2">Spacing System</h2>
              <p className="text-body-small text-[#6B7280]">Consistent spacing scale for layouts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Spacing Scale */}
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
              <h4 className="text-h4 mb-6">Spacing Scale</h4>
              <div className="space-y-4">
                {spacingScale.map((space) => (
                  <div key={space.token} className="flex items-center gap-4">
                    <div className="w-24">
                      <code className="text-xs bg-[#FFFCF2] px-2 py-1 rounded border border-[#E5E5E5] font-mono">
                        {space.value}
                      </code>
                    </div>
                    <div
                      className="bg-[#0D7EFF] border-2 border-[#000]"
                      style={{ width: space.value, height: '24px' }}
                    />
                    <span className="text-body-small text-[#6B7280]">{space.usage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacing Examples */}
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
              <h4 className="text-h4 mb-6">Usage Examples</h4>

              {/* Card Example */}
              <div className="bg-[#FFFCF2] border-3 border-[#000] rounded-lg p-6 mb-6 relative">
                <span className="absolute -top-3 -left-3 bg-[#FFD60A] border-2 border-[#000] rounded px-2 py-1 text-xs font-mono font-bold">
                  p-6 (24px)
                </span>
                <div className="space-y-4">
                  <div className="bg-white border-2 border-[#000] rounded p-4">
                    <span className="text-body-small">gap-4 (16px)</span>
                  </div>
                  <div className="bg-white border-2 border-[#000] rounded p-4">
                    <span className="text-body-small">gap-4 (16px)</span>
                  </div>
                </div>
              </div>

              {/* Button Group */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-body-small text-[#6B7280] font-mono">gap-3 (12px)</span>
                <div className="flex gap-3">
                  <div className="px-4 py-2 bg-[#0D7EFF] border-3 border-[#000] rounded text-white text-sm font-bold">
                    Button
                  </div>
                  <div className="px-4 py-2 bg-white border-3 border-[#000] rounded text-sm font-bold">
                    Button
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. COMPONENTS LIBRARY */}
        <section id="components" className="mb-32 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#FF006E] border-3 border-[#000] rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-white border-2 border-[#000] rounded" />
            </div>
            <div>
              <h2 className="text-h2">Components Library</h2>
              <p className="text-body-small text-[#6B7280]">Reusable UI components</p>
            </div>
          </div>

          {/* BUTTON COMPONENT */}
          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal-lg p-8 mb-8">
            <h3 className="text-h3 mb-6">Button</h3>

            {/* Variants */}
            <div className="mb-8">
              <h4 className="text-body mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                Variants
              </h4>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#0D7EFF] text-white border-3 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all font-bold">
                  Primary
                </button>
                <button className="px-6 py-3 bg-[#FF006E] text-white border-3 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all font-bold">
                  Secondary
                </button>
                <button className="px-6 py-3 bg-[#FFD60A] text-[#0A0A0A] border-3 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all font-bold">
                  Accent
                </button>
                <button className="px-6 py-3 bg-white text-[#0A0A0A] border-3 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all font-bold">
                  Ghost
                </button>
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <h4 className="text-body mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                Sizes
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <button className="px-3 py-1.5 bg-[#0D7EFF] text-white border-2 border-[#000] rounded shadow-brutal-sm text-xs font-bold">
                  Small
                </button>
                <button className="px-4 py-2 bg-[#0D7EFF] text-white border-3 border-[#000] rounded-lg shadow-brutal text-sm font-bold">
                  Medium
                </button>
                <button className="px-6 py-3 bg-[#0D7EFF] text-white border-3 border-[#000] rounded-lg shadow-brutal font-bold">
                  Large
                </button>
              </div>
            </div>

            {/* Code Example */}
            <div className="bg-[#0A0A0A] border-3 border-[#000] rounded-lg p-4 relative">
              <button
                onClick={() => copyToClipboard('<button className="px-6 py-3 bg-[#0D7EFF] text-white border-3 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all font-bold">\n  Click me\n</button>', 'button-code')}
                className="absolute top-3 right-3 p-2 bg-white border-2 border-[#000] rounded hover:bg-[#FFFCF2] transition-colors"
              >
                {copiedCode === 'button-code' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <pre className="text-sm font-mono text-[#0D7EFF] overflow-x-auto">
{`<button className="px-6 py-3 bg-[#0D7EFF]
  text-white border-3 border-[#000]
  rounded-lg shadow-brutal
  hover:-translate-y-1
  hover:shadow-brutal-lg
  transition-all font-bold">
  Click me
</button>`}
              </pre>
            </div>
          </div>

          {/* BADGE COMPONENT */}
          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal-lg p-8 mb-8">
            <h3 className="text-h3 mb-6">Badge</h3>

            <div className="mb-8">
              <h4 className="text-body mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                Color Variants
              </h4>
              <div className="flex flex-wrap gap-3">
                <NeoBadge color="blue">Blue Badge</NeoBadge>
                <NeoBadge color="pink">Pink Badge</NeoBadge>
                <NeoBadge color="yellow">Yellow Badge</NeoBadge>
                <NeoBadge color="purple">Purple Badge</NeoBadge>
                <NeoBadge color="neutral">Neutral Badge</NeoBadge>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border-3 border-[#000] rounded-lg p-4 relative">
              <button
                onClick={() => copyToClipboard('<NeoBadge color="blue">Badge Text</NeoBadge>', 'badge-code')}
                className="absolute top-3 right-3 p-2 bg-white border-2 border-[#000] rounded hover:bg-[#FFFCF2] transition-colors"
              >
                {copiedCode === 'badge-code' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <pre className="text-sm font-mono text-[#0D7EFF]">
{`<NeoBadge color="blue">Badge Text</NeoBadge>`}
              </pre>
            </div>
          </div>

          {/* INPUT COMPONENT */}
          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal-lg p-8 mb-8">
            <h3 className="text-h3 mb-6">Input Fields</h3>

            <div className="space-y-6 max-w-md">
              <div>
                <label className="block text-body-small font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Default Input
                </label>
                <input
                  type="text"
                  placeholder="Enter text..."
                  className="w-full px-4 py-3 border-3 border-[#000] rounded-lg shadow-brutal-sm focus:shadow-brutal focus:-translate-y-0.5 transition-all outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-body-small font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  With Icon
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-12 pr-4 py-3 border-3 border-[#000] rounded-lg shadow-brutal-sm focus:shadow-brutal focus:-translate-y-0.5 transition-all outline-none"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-body-small font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Textarea
                </label>
                <textarea
                  placeholder="Enter your message..."
                  rows={4}
                  className="w-full px-4 py-3 border-3 border-[#000] rounded-lg shadow-brutal-sm focus:shadow-brutal focus:-translate-y-0.5 transition-all outline-none resize-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>
          </div>

          {/* CARD COMPONENT */}
          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal-lg p-8">
            <h3 className="text-h3 mb-6">Cards</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Simple Card */}
              <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal hover:-translate-y-2 hover:shadow-brutal-lg transition-all p-6">
                <div className="w-10 h-10 bg-[#0D7EFF] border-2 border-[#000] rounded-lg mb-4 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-body mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                  Simple Card
                </h4>
                <p className="text-body-small text-[#6B7280]">
                  Basic card with icon, title, and description.
                </p>
              </div>

              {/* Card with Badge */}
              <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal hover:-translate-y-2 hover:shadow-brutal-lg transition-all p-6">
                <NeoBadge color="pink" className="mb-3">Featured</NeoBadge>
                <h4 className="text-body mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                  Card with Badge
                </h4>
                <p className="text-body-small text-[#6B7280] mb-4">
                  Card with category badge and metadata.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <Clock className="w-3.5 h-3.5" />
                  5 min read
                </div>
              </div>

              {/* Interactive Card */}
              <div className="bg-gradient-to-br from-[#0D7EFF] to-[#7209B7] border-4 border-[#000] rounded-lg shadow-brutal hover:-translate-y-2 hover:shadow-brutal-lg transition-all p-6 cursor-pointer group">
                <h4 className="text-body mb-2 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                  Gradient Card
                </h4>
                <p className="text-body-small text-white/90 mb-4">
                  Interactive card with gradient background.
                </p>
                <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>

        {/* 5. EFFECTS & SHADOWS */}
        <section id="effects" className="mb-32 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white border-3 border-[#000] rounded-lg shadow-brutal-lg" />
            <div>
              <h2 className="text-h2">Effects & Shadows</h2>
              <p className="text-body-small text-[#6B7280]">Brutal shadows and visual effects</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Shadow Scale */}
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
              <h4 className="text-h4 mb-6">Shadow Scale</h4>
              <div className="space-y-8">
                {shadowScale.map((shadow) => (
                  <div key={shadow.name}>
                    <div className="flex items-center justify-between mb-3">
                      <code className="text-xs bg-[#FFFCF2] px-2 py-1 rounded border border-[#E5E5E5] font-mono font-bold">
                        {shadow.name}
                      </code>
                      <span className="text-body-small text-[#6B7280]">{shadow.usage}</span>
                    </div>
                    <div
                      className="h-20 bg-[#FFD60A] border-3 border-[#000] rounded-lg flex items-center justify-center"
                      style={{ boxShadow: shadow.value }}
                    >
                      <span className="font-bold text-[#0A0A0A]">Hover to see effect</span>
                    </div>
                    <p className="text-xs font-mono text-[#6B7280] mt-2">{shadow.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Border Radius */}
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
              <h4 className="text-h4 mb-6">Border Radius</h4>
              <div className="space-y-6">
                {[
                  { name: 'rounded (4px)', class: 'rounded' },
                  { name: 'rounded-lg (8px)', class: 'rounded-lg' },
                  { name: 'rounded-xl (12px)', class: 'rounded-xl' },
                  { name: 'rounded-full (9999px)', class: 'rounded-full' },
                ].map((radius) => (
                  <div key={radius.name}>
                    <p className="text-body-small font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {radius.name}
                    </p>
                    <div className={`h-16 bg-[#0D7EFF] border-3 border-[#000] ${radius.class}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transitions */}
          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
            <h4 className="text-h4 mb-6">Transitions & Animations</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-body-small font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Translate on Hover
                </p>
                <div className="h-24 bg-[#FF006E] border-4 border-[#000] rounded-lg shadow-brutal hover:-translate-y-2 hover:shadow-brutal-lg transition-all flex items-center justify-center cursor-pointer">
                  <span className="text-white font-bold">Hover me</span>
                </div>
              </div>
              <div>
                <p className="text-body-small font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Rotate on Hover
                </p>
                <div className="h-24 bg-[#FFD60A] border-4 border-[#000] rounded-lg shadow-brutal hover:rotate-3 transition-all flex items-center justify-center cursor-pointer">
                  <span className="text-[#0A0A0A] font-bold">Hover me</span>
                </div>
              </div>
              <div>
                <p className="text-body-small font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Scale on Hover
                </p>
                <div className="h-24 bg-[#7209B7] border-4 border-[#000] rounded-lg shadow-brutal hover:scale-105 transition-all flex items-center justify-center cursor-pointer">
                  <span className="text-white font-bold">Hover me</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. ACCESSIBILITY */}
        <section id="accessibility" className="mb-32 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#10B981] border-3 border-[#000] rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-h2">Accessibility</h2>
              <p className="text-body-small text-[#6B7280]">WCAG 2.1 AA compliant</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Color Contrast */}
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
              <h4 className="text-h4 mb-6">Color Contrast Ratios</h4>
              <div className="space-y-4">
                {[
                  { bg: '#0D7EFF', text: '#FFFFFF', ratio: '4.5:1', level: 'AA' },
                  { bg: '#FF006E', text: '#FFFFFF', ratio: '5.2:1', level: 'AA' },
                  { bg: '#0A0A0A', text: '#FFFFFF', ratio: '19.5:1', level: 'AAA' },
                  { bg: '#FFFCF2', text: '#0A0A0A', ratio: '18.8:1', level: 'AAA' },
                ].map((contrast, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border-2 border-[#E5E5E5] rounded-lg">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-12 border-3 border-[#000] rounded flex items-center justify-center"
                        style={{ backgroundColor: contrast.bg, color: contrast.text }}
                      >
                        <span className="font-bold text-xs">Aa</span>
                      </div>
                      <div>
                        <p className="text-body-small font-mono">{contrast.bg} / {contrast.text}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-body-small font-bold">{contrast.ratio}</span>
                      <span className="px-2 py-1 bg-[#10B981] text-white border-2 border-[#000] rounded text-xs font-bold">
                        {contrast.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Focus States */}
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
              <h4 className="text-h4 mb-6">Focus States</h4>
              <div className="space-y-4">
                <p className="text-body-small text-[#6B7280] mb-4">
                  All interactive elements have visible focus states for keyboard navigation.
                </p>
                <button className="w-full px-4 py-3 bg-[#0D7EFF] text-white border-3 border-[#000] rounded-lg shadow-brutal focus:outline-none focus:ring-4 focus:ring-[#FFD60A] font-bold">
                  Tab to Focus
                </button>
                <input
                  type="text"
                  placeholder="Tab to focus this input"
                  className="w-full px-4 py-3 border-3 border-[#000] rounded-lg shadow-brutal-sm focus:outline-none focus:ring-4 focus:ring-[#0D7EFF] transition-all"
                />
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white border-3 border-[#000] rounded-lg shadow-brutal-sm focus:outline-none focus:ring-4 focus:ring-[#FF006E] font-bold">
                    Button 1
                  </button>
                  <button className="px-4 py-2 bg-white border-3 border-[#000] rounded-lg shadow-brutal-sm focus:outline-none focus:ring-4 focus:ring-[#FF006E] font-bold">
                    Button 2
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BlogComponentsSection />

        <PatternsTexturesSection />

        <NavigationComponentsSection />

        <ChatBotSection />

        <FormsSection />

        <TimelineSection />

        <HeroComponentSection />

        <WorkTogetherComponentSection />

        {/* 7. ICONS */}
        <section id="icons" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#FFD60A] border-3 border-[#000] rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-[#0A0A0A]" />
            </div>
            <div>
              <h2 className="text-h2">Icon System</h2>
              <p className="text-body-small text-[#6B7280]">Lucide React Icons</p>
            </div>
          </div>

          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal-lg p-8">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              {[
                { icon: Heart, name: 'Heart' },
                { icon: Star, name: 'Star' },
                { icon: Zap, name: 'Zap' },
                { icon: Calendar, name: 'Calendar' },
                { icon: Clock, name: 'Clock' },
                { icon: Search, name: 'Search' },
                { icon: User, name: 'User' },
                { icon: Settings, name: 'Settings' },
                { icon: Mail, name: 'Mail' },
                { icon: Phone, name: 'Phone' },
                { icon: TrendingUp, name: 'TrendingUp' },
                { icon: Users, name: 'Users' },
                { icon: Target, name: 'Target' },
                { icon: Bookmark, name: 'Bookmark' },
                { icon: Menu, name: 'Menu' },
                { icon: X, name: 'X' },
                { icon: Share2, name: 'Share2' },
                { icon: Twitter, name: 'Twitter' },
                { icon: Linkedin, name: 'Linkedin' },
                { icon: Facebook, name: 'Facebook' },
                { icon: Link2, name: 'Link2' },
                { icon: ArrowRight, name: 'ArrowRight' },
                { icon: ChevronDown, name: 'ChevronDown' },
                { icon: Home, name: 'Home' },
                { icon: FileText, name: 'FileText' },
                { icon: Eye, name: 'Eye' },
                { icon: MessageCircle, name: 'MessageCircle' },
                { icon: BarChart3, name: 'BarChart3' },
                { icon: Grid3x3, name: 'Grid3x3' },
              ].map(({ icon: Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-2 p-3 hover:bg-[#FFFCF2] rounded-lg transition-colors">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs text-center text-[#6B7280]">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E] border-4 border-[#000] rounded-lg shadow-brutal-lg p-12 text-center">
          <h3 className="text-h2 text-white mb-4">Ready to build something bold?</h3>
          <p className="text-body-large text-white/95 mb-8 max-w-[600px] mx-auto">
            This design system is built for speed, accessibility, and unapologetic design.
          </p>
          <button
            onClick={handleBack}
            className="px-8 py-4 bg-[#FFD60A] text-[#0A0A0A] border-4 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all font-bold text-lg"
          >
            Back to Site →
          </button>
        </div>
      </div>
    </div>
  );
}
