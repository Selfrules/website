'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Palette, Type, Zap } from 'lucide-react';
import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { ComponentShowcase } from '@/components/design-system/ComponentShowcase';
import {
  ColorSwatch,
  TypeScale,
  ShadowExample,
  SpacingScale,
  BorderRadius,
} from '@/components/design-system/DesignTokens';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function DesignSystemPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Components', icon: Package },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'components', label: 'Components', icon: Zap },
  ];

  // Color palette data
  const colors = [
    { name: 'Primary', hex: '#FFD93D', usage: 'CTAs, links, active states', textColor: 'dark' as const },
    { name: 'Primary Light', hex: '#FFEB99', usage: 'Hover states, backgrounds', textColor: 'dark' as const },
    { name: 'Primary Dark', hex: '#E6C300', usage: 'Pressed states, dark accents', textColor: 'dark' as const },
    { name: 'Secondary', hex: '#6C5CE7', usage: 'Secondary actions, highlights', textColor: 'light' as const },
    { name: 'Secondary Light', hex: '#A29BF8', usage: 'Light backgrounds, subtle accents', textColor: 'dark' as const },
    { name: 'Secondary Dark', hex: '#5344C5', usage: 'Dark states, emphasis', textColor: 'light' as const },
    { name: 'Accent', hex: '#FF6B6B', usage: 'Attention, alerts, errors', textColor: 'light' as const },
    { name: 'Accent Light', hex: '#FF9999', usage: 'Light warnings, notifications', textColor: 'dark' as const },
    { name: 'Accent Dark', hex: '#FF3838', usage: 'Critical alerts, errors', textColor: 'light' as const },
  ];

  // Typography scale data
  const typeScales = [
    { style: 'display-1', font: 'Space Grotesk', size: '72px', weight: '900', lineHeight: '1.1', example: 'Display heading' },
    { style: 'display-2', font: 'Space Grotesk', size: '60px', weight: '900', lineHeight: '1.1', example: 'Large display' },
    { style: 'h1', font: 'Space Grotesk', size: '48px', weight: '800', lineHeight: '1.2', example: 'Main heading' },
    { style: 'h2', font: 'Space Grotesk', size: '36px', weight: '700', lineHeight: '1.2', example: 'Section heading' },
    { style: 'h3', font: 'Space Grotesk', size: '30px', weight: '700', lineHeight: '1.3', example: 'Subsection heading' },
    { style: 'h4', font: 'Space Grotesk', size: '24px', weight: '600', lineHeight: '1.4', example: 'Card heading' },
    { style: 'body-xl', font: 'Inter', size: '20px', weight: '400', lineHeight: '1.6', example: 'Large body text' },
    { style: 'body-lg', font: 'Inter', size: '18px', weight: '400', lineHeight: '1.6', example: 'Medium body text' },
    { style: 'body', font: 'Inter', size: '16px', weight: '400', lineHeight: '1.6', example: 'Default body text' },
    { style: 'body-sm', font: 'Inter', size: '14px', weight: '400', lineHeight: '1.5', example: 'Small body text' },
  ];

  // Shadow examples
  const shadows = [
    { name: 'shadow-brutal', value: '8px 8px 0px #000000', usage: 'Default shadow for cards and buttons' },
    { name: 'shadow-brutal-hover', value: '12px 12px 0px #000000', usage: 'Hover state shadow' },
    { name: 'shadow-brutal-active', value: '4px 4px 0px #000000', usage: 'Active/pressed state shadow' },
    { name: 'shadow-brutal-sm', value: '4px 4px 0px #000000', usage: 'Small elements like badges' },
  ];

  // Spacing scale
  const spacingScale = [
    { scale: 1, value: '0.25rem' },
    { scale: 2, value: '0.5rem' },
    { scale: 3, value: '0.75rem' },
    { scale: 4, value: '1rem' },
    { scale: 6, value: '1.5rem' },
    { scale: 8, value: '2rem' },
    { scale: 12, value: '3rem' },
    { scale: 16, value: '4rem' },
    { scale: 20, value: '5rem' },
  ];

  // Border radius
  const borderRadii = [
    { name: 'brutal', value: '8px', className: 'rounded-brutal' },
    { name: 'brutal-sm', value: '4px', className: 'rounded-brutal-sm' },
    { name: 'brutal-lg', value: '12px', className: 'rounded-brutal-lg' },
    { name: 'full', value: '9999px', className: 'rounded-full' },
  ];

  // Component showcase data
  const componentShowcases = [
    {
      title: 'Button Component',
      description: 'Primary action buttons with neobrutalist styling and hover effects',
      category: 'components',
      component: (
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="md">
            Primary
          </Button>
          <Button variant="secondary" size="md">
            Secondary
          </Button>
          <Button variant="accent" size="md">
            Accent
          </Button>
          <Button variant="outline" size="md">
            Outline
          </Button>
          <Button variant="ghost" size="md">
            Ghost
          </Button>
        </div>
      ),
      code: `import { Button } from '@/components/ui/button';

<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="secondary" size="md">
  Secondary action
</Button>

<Button variant="accent" size="md">
  Alert action
</Button>`,
      props: [
        { name: 'variant', type: "'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'", default: "'primary'", description: 'Button style variant' },
        { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Button size' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable button interaction' },
      ],
      variants: [
        { label: 'Small', component: <Button variant="primary" size="sm">Small</Button> },
        { label: 'Medium', component: <Button variant="primary" size="md">Medium</Button> },
        { label: 'Large', component: <Button variant="primary" size="lg">Large</Button> },
        { label: 'Extra Large', component: <Button variant="primary" size="xl">XL</Button> },
      ],
    },
    {
      title: 'Card Component',
      description: 'Container cards with optional hover effects and variants',
      category: 'components',
      component: (
        <Card hoverable className="max-w-sm">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>This is a description of the card content</CardDescription>
          </CardHeader>
        </Card>
      ),
      code: `import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

<Card hoverable>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>
      This is a description of the card content
    </CardDescription>
  </CardHeader>
</Card>`,
      props: [
        { name: 'variant', type: "'default' | 'primary' | 'secondary' | 'accent'", default: "'default'", description: 'Card background variant' },
        { name: 'hoverable', type: 'boolean', default: 'false', description: 'Enable hover effects' },
        { name: 'clickable', type: 'boolean', default: 'false', description: 'Add cursor pointer and hover effects' },
      ],
      variants: [
        { label: 'Default', component: <Card hoverable className="w-40 h-24" /> },
        { label: 'Primary', component: <Card variant="primary" hoverable className="w-40 h-24" /> },
        { label: 'Secondary', component: <Card variant="secondary" hoverable className="w-40 h-24" /> },
        { label: 'Accent', component: <Card variant="accent" hoverable className="w-40 h-24" /> },
      ],
    },
    {
      title: 'Input Component',
      description: 'Form input fields with labels, validation, and accessibility',
      category: 'components',
      component: (
        <div className="w-full max-w-sm space-y-4">
          <Input label="Email address" type="email" placeholder="your@email.com" />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            helperText="At least 8 characters"
          />
        </div>
      ),
      code: `import { Input } from '@/components/ui/Input';

<Input
  label="Email address"
  type="email"
  placeholder="your@email.com"
  helperText="We will never share your email"
/>

<Input
  label="Password"
  type="password"
  error="Password is required"
/>`,
      props: [
        { name: 'label', type: 'string', description: 'Input field label' },
        { name: 'error', type: 'string', description: 'Error message to display' },
        { name: 'helperText', type: 'string', description: 'Helper text below input' },
        { name: 'type', type: 'string', default: "'text'", description: 'HTML input type' },
      ],
    },
    {
      title: 'Badge Component',
      description: 'Small labels and tags for categorization and status',
      category: 'components',
      component: (
        <div className="flex flex-wrap gap-4">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      ),
      code: `import { Badge } from '@/components/ui/Badge';

<Badge variant="primary">New</Badge>
<Badge variant="secondary">Popular</Badge>
<Badge variant="accent">Hot</Badge>`,
      props: [
        { name: 'variant', type: "'default' | 'primary' | 'secondary' | 'accent' | 'outline'", default: "'default'", description: 'Badge style variant' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Badge size' },
      ],
      variants: [
        { label: 'Small', component: <Badge variant="primary" size="sm">Small</Badge> },
        { label: 'Medium', component: <Badge variant="primary" size="md">Medium</Badge> },
        { label: 'Large', component: <Badge variant="primary" size="lg">Large</Badge> },
      ],
    },
  ];

  // Filter components based on search and category
  const filteredComponents = useMemo(() => {
    return componentShowcases.filter((showcase) => {
      const matchesSearch = showcase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        showcase.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' ||
        (activeCategory === 'components' && showcase.category === 'components');
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, componentShowcases]);

  const showColors = activeCategory === 'all' || activeCategory === 'colors';
  const showTypography = activeCategory === 'all' || activeCategory === 'typography';
  const showComponents = activeCategory === 'all' || activeCategory === 'components';

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section spacing="lg" variant="default">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <SectionHeader>
            <motion.div variants={fadeInUp}>
              <SectionTitle>Neobrutalist design system</SectionTitle>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <SectionDescription>
                Bold borders, hard shadows, and vibrant colors. A complete design system built for clarity and
                impact.
              </SectionDescription>
            </motion.div>
          </SectionHeader>

          <motion.div variants={fadeInUp} className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto w-full">
              <Input
                type="search"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      flex items-center gap-2 px-6 py-3 font-heading font-bold text-body
                      border-4 border-brutalist-border rounded-brutal transition-all
                      ${
                        activeCategory === category.id
                          ? 'bg-primary text-brutalist-text-light shadow-brutal'
                          : 'bg-brutalist-surface-light dark:bg-brutalist-surface-dark hover:shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px]'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Design Principles */}
      <Section spacing="md" variant="default">
        <SectionHeader>
          <SectionTitle>Design principles</SectionTitle>
          <SectionDescription>
            Core philosophy behind the neobrutalist design system
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Bold borders', description: '4-6px solid black borders on all interactive elements' },
            { title: 'Hard shadows', description: 'No blur, 8px offset shadows for depth and clarity' },
            { title: 'Vibrant colors', description: 'High contrast color palette for visual impact' },
            { title: 'Clear hierarchy', description: 'Obvious visual distinction between elements' },
          ].map((principle) => (
            <Card key={principle.title} hoverable>
              <CardHeader>
                <CardTitle className="text-h5">{principle.title}</CardTitle>
                <CardDescription>{principle.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      {/* Color System */}
      {showColors && (
        <Section spacing="md" variant="default" id="colors">
          <SectionHeader>
            <SectionTitle>Color system</SectionTitle>
            <SectionDescription>
              Primary, secondary, and accent colors with their variants
            </SectionDescription>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colors.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>

          {/* Shadow Examples */}
          <div className="mt-16">
            <h3 className="font-heading font-black text-h3 text-sentence-case mb-8 text-center">
              Shadow system
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shadows.map((shadow) => (
                <ShadowExample key={shadow.name} {...shadow} />
              ))}
            </div>
          </div>

          {/* Border Radius */}
          <div className="mt-16">
            <h3 className="font-heading font-black text-h3 text-sentence-case mb-8 text-center">
              Border radius
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {borderRadii.map((radius) => (
                <BorderRadius key={radius.name} {...radius} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Typography */}
      {showTypography && (
        <Section spacing="md" variant="default" id="typography">
          <SectionHeader>
            <SectionTitle>Typography system</SectionTitle>
            <SectionDescription>
              Complete type scale with font families, sizes, and weights
            </SectionDescription>
          </SectionHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {typeScales.map((typeScale) => (
              <TypeScale key={typeScale.style} {...typeScale} />
            ))}
          </div>

          {/* Spacing Scale */}
          <div className="mt-16">
            <h3 className="font-heading font-black text-h3 text-sentence-case mb-8 text-center">
              Spacing scale
            </h3>
            <div className="space-y-4">
              {spacingScale.map((spacing) => (
                <SpacingScale key={spacing.scale} {...spacing} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Components */}
      {showComponents && (
        <Section spacing="md" variant="default" id="components">
          <SectionHeader>
            <SectionTitle>Component library</SectionTitle>
            <SectionDescription>
              Interactive components with code examples and props documentation
            </SectionDescription>
          </SectionHeader>

          <div className="space-y-12">
            {filteredComponents.length > 0 ? (
              filteredComponents.map((showcase) => (
                <ComponentShowcase key={showcase.title} {...showcase} />
              ))
            ) : (
              <Card className="p-12">
                <CardHeader>
                  <div className="text-center space-y-4">
                    <Search className="w-16 h-16 mx-auto text-brutalist-text-light/40 dark:text-brutalist-text-dark/40" />
                    <CardTitle>No components found</CardTitle>
                    <CardDescription>
                      Try adjusting your search or filter to find what you&apos;re looking for
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            )}
          </div>
        </Section>
      )}

      {/* Getting Started */}
      <Section spacing="md" variant="primary">
        <SectionHeader>
          <SectionTitle>Getting started</SectionTitle>
          <SectionDescription className="text-brutalist-text-light/90">
            Start using the design system in your project
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-h4">Installation</CardTitle>
              <CardDescription>Add components to your project</CardDescription>
            </CardHeader>
            <div className="p-6 pt-0">
              <div className="bg-brutalist-bg-dark p-4 rounded-brutal border-4 border-brutalist-border">
                <code className="text-body-sm font-mono text-primary">
                  npm install @/components/ui
                </code>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-h4">Basic usage</CardTitle>
              <CardDescription>Import and use components</CardDescription>
            </CardHeader>
            <div className="p-6 pt-0">
              <div className="bg-brutalist-bg-dark p-4 rounded-brutal border-4 border-brutalist-border">
                <code className="text-body-sm font-mono text-primary block">
                  import &#123; Button &#125; from &apos;@/components/ui&apos;
                </code>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </main>
  );
}
