'use client';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { ExperienceCard } from '@/components/ui/ExperienceCard';
import { ActivityCard } from '@/components/ui/ActivityCard';
import { CollaborationCard } from '@/components/ui/CollaborationCard';
import { BlogCard } from '@/components/ui/BlogCard';
import { DesignSystemNav } from '@/components/design-system/DesignSystemNav';
import {
  Palette,
  Type,
  Layers,
  Box,
  Sparkles,
  Code2,
  ArrowRight,
  Check,
  X,
  Heart,
  Star,
  Zap,
  Award,
  Briefcase,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Users,
  GraduationCap
} from 'lucide-react';

export default function DesignSystemPage() {
  const sections = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'components', label: 'Components', icon: Layers },
    { id: 'utilities', label: 'Utilities', icon: Box },
    { id: 'patterns', label: 'Patterns', icon: Sparkles },
  ];

  const brandColors = [
    { name: 'Electric Blue', utility: 'electric-blue', hex: '#0D7EFF', use: 'Design/UX', textClass: 'text-white' },
    { name: 'Neon Pink', utility: 'neon-pink', hex: '#FF006E', use: 'Analytics/Tools', textClass: 'text-white' },
    { name: 'Cyber Yellow', utility: 'cyber-yellow', hex: '#FFD60A', use: 'Featured/Special', textClass: 'text-black' },
    { name: 'Deep Purple', utility: 'deep-purple', hex: '#7209B7', use: 'PM/Strategy', textClass: 'text-white' },
    { name: 'Teal', utility: 'teal', hex: '#2A687A', use: 'Development', textClass: 'text-white' },
  ];

  const functionalColors = [
    { name: 'Primary', utility: 'primary', hex: '#0D7EFF', use: 'Primary actions' },
    { name: 'Secondary', utility: 'secondary', hex: '#2A687A', use: 'Secondary actions' },
    { name: 'Accent', utility: 'accent', hex: '#FFD60A', use: 'Highlights' },
    { name: 'Success', utility: 'success', hex: '#10B981', use: 'Success states' },
    { name: 'Error', utility: 'error', hex: '#EF4444', use: 'Error states' },
    { name: 'Warning', utility: 'warning', hex: '#F59E0B', use: 'Warning states' },
  ];

  const textColors = [
    { name: 'Primary', utility: 'brutalist-text-primary', hex: '#0A0A0A', use: 'Headings, important text' },
    { name: 'Secondary', utility: 'brutalist-text-secondary', hex: '#2D2D2D', use: 'Body text' },
    { name: 'Tertiary', utility: 'brutalist-text-tertiary', hex: '#6B7280', use: 'Captions, labels' },
    { name: 'Light', utility: 'brutalist-text-light', hex: '#FAFAFA', use: 'Text on dark backgrounds' },
  ];

  const gradients = [
    { name: 'Brand', utility: 'bg-gradient-brand', description: 'Full brand gradient (Blue → Pink → Purple)' },
    { name: 'Timeline', utility: 'bg-gradient-timeline', description: 'Timeline gradient (Purple → Yellow → Pink → Blue)' },
    { name: 'Text Accent', utility: 'bg-gradient-text-accent', description: 'Text accent (Teal → Yellow)' },
    { name: 'Blog Hero', utility: 'bg-gradient-blog-hero', description: 'Blog hero (Electric Blue → Deep Purple)' },
    { name: 'Glow Blue', utility: 'bg-gradient-glow-blue', description: 'Subtle blue glow (10% opacity)' },
    { name: 'Glow Pink', utility: 'bg-gradient-glow-pink', description: 'Subtle pink glow (10% opacity)' },
    { name: 'Glow Purple', utility: 'bg-gradient-glow-purple', description: 'Subtle purple glow (10% opacity)' },
    { name: 'Glow Mixed', utility: 'bg-gradient-glow-mixed', description: 'Mixed blue/pink glow' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b-brutal border-black sticky top-0 z-50">
        <div className="container max-w-[1440px] mx-auto px-6 md:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-h2 font-heading font-black text-brutalist-text-primary mb-2">
                Design System
              </h1>
              <p className="text-body-small text-brutalist-text-secondary">
                Neobrutalist Design System · WCAG AA Compliant
              </p>
            </div>
            <NeoBadge color="blue">v2.0</NeoBadge>
          </div>
        </div>
      </header>

      <div className="container max-w-[1440px] mx-auto px-6 md:px-8 py-12 flex gap-8">
        {/* Sidebar Navigation */}
        <DesignSystemNav sections={sections} />

        {/* Main Content */}
        <main className="flex-1 space-y-16">
          {/* Colors Section */}
          <section id="colors" className="scroll-mt-24">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Palette className="w-6 h-6 text-electric-blue" />
                <h2 className="text-h2 font-heading font-black text-brutalist-text-primary">
                  Colors
                </h2>
              </div>
              <p className="text-body text-brutalist-text-secondary">
                Cold-tone professional palette optimized for WCAG AA contrast.
              </p>
            </div>

            {/* Brand Colors */}
            <div className="mb-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Brand Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {brandColors.map((color) => (
                  <div key={color.hex} className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-4">
                    <div
                      className={`h-24 rounded-brutal border-4 border-black mb-3 flex items-center justify-center ${color.textClass}`}
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className="font-mono text-xs font-bold">{color.hex}</span>
                    </div>
                    <p className="font-heading font-bold text-sm text-brutalist-text-primary mb-1">{color.name}</p>
                    <code className="text-xs text-brutalist-text-tertiary block mb-2">{color.utility}</code>
                    <p className="text-xs text-brutalist-text-secondary">{color.use}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Functional Colors */}
            <div className="mb-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Functional Colors
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {functionalColors.map((color) => (
                  <div key={color.hex} className="bg-white border-brutal-thin border-black rounded p-3">
                    <div
                      className="h-16 rounded border-2 border-black mb-2"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="font-bold text-xs text-brutalist-text-primary mb-1">{color.name}</p>
                    <code className="text-[10px] text-brutalist-text-tertiary block">{color.utility}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Text Colors */}
            <div className="mb-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Text Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {textColors.map((color) => (
                  <div key={color.hex} className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-4">
                    <div className="mb-3">
                      <p className={`text-h3 font-heading font-bold mb-2`} style={{ color: color.hex }}>
                        Aa
                      </p>
                      <code className="text-xs text-brutalist-text-tertiary">{color.hex}</code>
                    </div>
                    <p className="font-bold text-sm text-brutalist-text-primary mb-1">{color.name}</p>
                    <code className="text-xs text-brutalist-text-tertiary block mb-2">text-{color.utility}</code>
                    <p className="text-xs text-brutalist-text-secondary">{color.use}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Colored Text Utilities */}
            <div className="mb-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Colored Text Utilities
              </h3>
              <p className="text-body-small text-brutalist-text-secondary mb-6">
                Use brand colors for text highlights and emphasis. Perfect for drawing attention to key words or phrases.
              </p>
              <div className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6">
                <div className="space-y-4">
                  {brandColors.map((color) => (
                    <div key={color.utility} className="flex items-center justify-between">
                      <div>
                        <code className="text-sm font-mono text-brutalist-text-primary">
                          text-{color.utility}
                        </code>
                        <p className="text-xs text-brutalist-text-tertiary mt-1">
                          {color.use}
                        </p>
                      </div>
                      <p className="text-h4 font-heading font-bold" style={{ color: color.hex }}>
                        The quick brown fox
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-cream rounded-lg">
                  <p className="text-body-small text-brutalist-text-secondary">
                    <strong className="text-brutalist-text-primary">Example:</strong>{' '}
                    Use <code className="text-xs bg-white px-2 py-1 rounded border border-black">text-electric-blue</code> for{' '}
                    <span className="text-electric-blue font-bold">highlighted terms</span>, or{' '}
                    <code className="text-xs bg-white px-2 py-1 rounded border border-black">text-neon-pink</code> for{' '}
                    <span className="text-neon-pink font-bold">call-to-action phrases</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Gradients */}
            <div>
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Gradients
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gradients.map((gradient) => (
                  <div key={gradient.utility} className="bg-white border-brutal border-black rounded-brutal shadow-brutal overflow-hidden">
                    <div className={`h-24 ${gradient.utility}`} />
                    <div className="p-4">
                      <p className="font-heading font-bold text-sm text-brutalist-text-primary mb-1">{gradient.name}</p>
                      <code className="text-xs text-brutalist-text-tertiary block mb-2">{gradient.utility}</code>
                      <p className="text-xs text-brutalist-text-secondary">{gradient.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Typography Section */}
          <section id="typography" className="scroll-mt-24">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Type className="w-6 h-6 text-neon-pink" />
                <h2 className="text-h2 font-heading font-black text-brutalist-text-primary">
                  Typography
                </h2>
              </div>
              <p className="text-body text-brutalist-text-secondary">
                Type scale and font families for the design system.
              </p>
            </div>

            {/* Font Families */}
            <div className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6 mb-8">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Font Families
              </h3>
              <div className="space-y-4">
                <div className="pb-4 border-b-2 border-black">
                  <p className="font-heading text-h2 mb-2">Space Grotesk</p>
                  <code className="text-xs text-brutalist-text-tertiary">font-heading</code>
                  <p className="text-sm text-brutalist-text-secondary mt-2">Headings, labels, UI elements</p>
                </div>
                <div className="pb-4 border-b-2 border-black">
                  <p className="font-body text-h2 mb-2">Inter</p>
                  <code className="text-xs text-brutalist-text-tertiary">font-body</code>
                  <p className="text-sm text-brutalist-text-secondary mt-2">Body text, paragraphs</p>
                </div>
                <div>
                  <p className="font-mono text-h2 mb-2">JetBrains Mono</p>
                  <code className="text-xs text-brutalist-text-tertiary">font-mono</code>
                  <p className="text-sm text-brutalist-text-secondary mt-2">Code blocks, technical content</p>
                </div>
              </div>
            </div>

            {/* Type Scale */}
            <div className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Type Scale
              </h3>
              <div className="space-y-6">
                {[
                  { class: 'text-hero', size: '56px / 3.5rem', sample: 'Hero Title' },
                  { class: 'text-h1', size: '48px / 3rem', sample: 'Heading 1' },
                  { class: 'text-h2', size: '36px / 2.25rem', sample: 'Heading 2' },
                  { class: 'text-h3', size: '24px / 1.5rem', sample: 'Heading 3' },
                  { class: 'text-h4', size: '20px / 1.25rem', sample: 'Heading 4' },
                  { class: 'text-body-large', size: '18px / 1.125rem', sample: 'Body Large' },
                  { class: 'text-body', size: '16px / 1rem', sample: 'Body Text' },
                  { class: 'text-body-small', size: '14px / 0.875rem', sample: 'Body Small' },
                  { class: 'text-body-xs', size: '12px / 0.75rem', sample: 'Body XS' },
                ].map((type) => (
                  <div key={type.class} className="flex items-baseline gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <code className="text-xs text-brutalist-text-tertiary w-40 shrink-0">{type.class}</code>
                    <p className={`${type.class} font-heading font-bold flex-1`}>{type.sample}</p>
                    <span className="text-xs text-brutalist-text-tertiary w-32 text-right">{type.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Components Section */}
          <section id="components" className="scroll-mt-24">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="w-6 h-6 text-deep-purple" />
                <h2 className="text-h2 font-heading font-black text-brutalist-text-primary">
                  Components
                </h2>
              </div>
              <p className="text-body text-brutalist-text-secondary">
                Reusable UI components built with the design system.
              </p>
            </div>

            {/* Buttons */}
            <div className="mb-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Buttons
              </h3>
              <p className="text-body-small text-brutalist-text-secondary mb-6">
                All buttons use <code className="text-xs bg-cream px-2 py-1 rounded border border-black">font-heading</code> (Space Grotesk) with uppercase and wider tracking, matching NeoBadge style.
                Text colors: Primary/Secondary use white text, Accent uses black text (for yellow background readability).
              </p>
              <div className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-brutalist-text-secondary mb-3">Variants</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="accent">Accent</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brutalist-text-secondary mb-3">Sizes</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                      <Button size="xl">Extra Large</Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brutalist-text-secondary mb-3">With Icons</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary">
                        <ArrowRight className="w-5 h-5" />
                        Next Step
                      </Button>
                      <Button variant="accent">
                        <Star className="w-5 h-5" />
                        Featured
                      </Button>
                      <Button variant="outline">
                        <Check className="w-5 h-5" />
                        Confirm
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="mb-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Badges
              </h3>
              <p className="text-body-small text-brutalist-text-secondary mb-6">
                All badges use <code className="text-xs bg-cream px-2 py-1 rounded border border-black">font-heading</code> (Space Grotesk) with uppercase and tracking-wider, following the NeoBadge design pattern.
              </p>
              <div className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-brutalist-text-secondary mb-3">Badge Component</p>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="design">Design</Badge>
                      <Badge variant="dev">Development</Badge>
                      <Badge variant="pm">Product</Badge>
                      <Badge variant="tool">Analytics</Badge>
                      <Badge variant="featured">Featured</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brutalist-text-secondary mb-3">NeoBadge Component</p>
                    <div className="flex flex-wrap gap-3">
                      <NeoBadge color="blue">Design/UX</NeoBadge>
                      <NeoBadge color="pink">Analytics</NeoBadge>
                      <NeoBadge color="yellow">Featured</NeoBadge>
                      <NeoBadge color="purple">Strategy</NeoBadge>
                      <NeoBadge color="neutral">General</NeoBadge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Elements */}
            <div>
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Form Elements
              </h3>
              <div className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6 space-y-6">
                <div>
                  <p className="text-sm font-bold text-brutalist-text-secondary mb-3">Input</p>
                  <Input
                    label="Your Name"
                    placeholder="Enter your name"
                    helperText="We'll never share your name."
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-brutalist-text-secondary mb-3">Textarea</p>
                  <Textarea
                    label="Your Message"
                    placeholder="Write your message here..."
                    rows={4}
                    helperText="Maximum 500 characters"
                  />
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="mt-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Experience Card
              </h3>
              <p className="text-body-small text-brutalist-text-secondary mb-6">
                Comprehensive card for displaying work experience, education, or career milestones with badges, achievements, skills, and certifications.
              </p>
              <ExperienceCard
                date="2021 - 2023"
                role="Senior Product Manager"
                roleColor="blue"
                company="QubicaAMF"
                description="Led product strategy for bowling center management systems, driving innovation in entertainment technology and customer experience."
                achievements={[
                  "Increased user engagement by 40% through data-driven UX improvements",
                  "Launched 3 major features that reduced operational costs by 25%",
                  "Built and led cross-functional team of 12 people across 4 countries"
                ]}
                skills={["Product Strategy", "UX Design", "Data Analysis", "Agile/Scrum", "Stakeholder Management"]}
                certifications={[
                  { name: "Certified Scrum Product Owner", icon: Award },
                  { name: "Google Analytics Certified", icon: Award }
                ]}
                isCurrent={false}
              />
            </div>

            {/* Activity Card */}
            <div className="mt-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Activity Card
              </h3>
              <p className="text-body-small text-brutalist-text-secondary mb-6">
                Showcase current activities, learning updates, or real-time status with colored icons, decorative blobs, and optional metrics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ActivityCard
                  title="Current Work"
                  icon={Briefcase}
                  color="blue"
                  metric={{ label: "+2 quick wins", icon: TrendingUp }}
                >
                  <p className="text-body-small text-brutalist-text-secondary">
                    Product Manager @ <strong className="text-electric-blue">QubicaAMF</strong>
                  </p>
                  <p className="text-body-small text-brutalist-text-secondary">
                    <strong className="text-electric-blue">Focus:</strong> Payment integrations and product vision
                  </p>
                  <div className="bg-white/50 border-l-4 border-electric-blue p-3 rounded">
                    <p className="text-xs text-brutalist-text-secondary mb-2 font-heading font-semibold">
                      Last week:
                    </p>
                    <ul className="text-body-small text-brutalist-text-secondary space-y-1">
                      <li>• 6 hours of user interviews</li>
                      <li>• 3 critical insights</li>
                      <li>• 2 quick wins shipped</li>
                    </ul>
                  </div>
                </ActivityCard>

                <ActivityCard
                  title="Learning in Public"
                  icon={BookOpen}
                  color="pink"
                >
                  <p className="text-body-small text-brutalist-text-secondary">
                    This week: <strong className="text-neon-pink">AI workflow optimization</strong>
                  </p>
                  <p className="text-body-small text-brutalist-text-secondary">
                    <strong className="text-neon-pink">The trick?</strong> Knowing what to delegate and what to keep.
                  </p>
                  <div className="bg-white/50 border-l-4 border-neon-pink p-3 rounded">
                    <ul className="text-body-small text-brutalist-text-secondary space-y-2">
                      <li className="flex gap-2">
                        <span className="text-neon-pink">→</span>
                        <span><strong>Claude</strong> writes PRD drafts</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-neon-pink">→</span>
                        <span><strong>I</strong> add human context</span>
                      </li>
                    </ul>
                  </div>
                </ActivityCard>
              </div>
            </div>

            {/* Collaboration Card */}
            <div className="mt-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Collaboration Card
              </h3>
              <p className="text-body-small text-brutalist-text-secondary mb-6">
                Display service offerings or collaboration modes with numbered cards, icons, and feature lists.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CollaborationCard
                  number="01"
                  title="Consulting"
                  description="Strategic guidance for your product challenges"
                  features={[
                    "Product strategy sessions",
                    "User research analysis",
                    "Roadmap planning"
                  ]}
                  icon={Lightbulb}
                  color="blue"
                />
                <CollaborationCard
                  number="02"
                  title="Brainstorming"
                  description="Collaborative ideation and problem-solving"
                  features={[
                    "Feature ideation workshops",
                    "User journey mapping",
                    "Solution validation"
                  ]}
                  icon={Users}
                  color="pink"
                />
                <CollaborationCard
                  number="03"
                  title="Mentorship"
                  description="1-on-1 coaching for product managers"
                  features={[
                    "Career development guidance",
                    "Portfolio reviews",
                    "Interview preparation"
                  ]}
                  icon={GraduationCap}
                  color="purple"
                />
              </div>
            </div>
          </section>

          {/* Utilities Section */}
          <section id="utilities" className="scroll-mt-24">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Box className="w-6 h-6 text-cyber-yellow" />
                <h2 className="text-h2 font-heading font-black text-brutalist-text-primary">
                  Utilities
                </h2>
              </div>
              <p className="text-body text-brutalist-text-secondary">
                Utility classes for borders, shadows, spacing, and more.
              </p>
            </div>

            {/* Borders */}
            <div className="mb-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Borders
              </h3>
              <div className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6">
                <div className="space-y-4">
                  {[
                    { class: 'border-brutal-thin', width: '3px' },
                    { class: 'border-brutal', width: '4px' },
                    { class: 'border-brutal-thick', width: '6px' },
                    { class: 'border-brutal-extra-thick', width: '8px' },
                  ].map((border) => (
                    <div key={border.class} className="flex items-center gap-4">
                      <code className="text-xs text-brutalist-text-tertiary w-48">{border.class}</code>
                      <div className={`flex-1 h-12 bg-cream ${border.class} border-black rounded`} />
                      <span className="text-xs text-brutalist-text-tertiary w-16">{border.width}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shadows */}
            <div className="mb-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Shadows
              </h3>
              <div className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { class: 'shadow-brutal-sm', offset: '4px' },
                    { class: 'shadow-brutal', offset: '8px' },
                    { class: 'shadow-brutal-hover', offset: '12px' },
                    { class: 'shadow-brutal-lg', offset: '16px' },
                  ].map((shadow) => (
                    <div key={shadow.class} className="space-y-2">
                      <code className="text-xs text-brutalist-text-tertiary block">{shadow.class}</code>
                      <div className={`h-24 bg-cream border-brutal border-black rounded ${shadow.class} flex items-center justify-center`}>
                        <span className="text-sm font-bold text-brutalist-text-secondary">{shadow.offset} offset</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Spacing */}
            <div className="mb-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Spacing (8pt Grid)
              </h3>
              <div className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6">
                <div className="space-y-3">
                  {[
                    { class: 'brutal-xs', px: '8px' },
                    { class: 'brutal-sm', px: '16px' },
                    { class: 'brutal-md', px: '24px' },
                    { class: 'brutal-lg', px: '32px' },
                    { class: 'brutal-xl', px: '48px' },
                    { class: 'brutal-2xl', px: '64px' },
                  ].map((spacing) => (
                    <div key={spacing.class} className="flex items-center gap-4">
                      <code className="text-xs text-brutalist-text-tertiary w-32">p-{spacing.class}</code>
                      <div className="flex-1 bg-electric-blue/10 border-2 border-electric-blue rounded">
                        <div className={`p-${spacing.class} bg-electric-blue`}>
                          <div className="bg-white text-brutalist-text-primary text-xs px-2 py-1 rounded font-mono">
                            {spacing.px}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Border Radius */}
            <div>
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Border Radius
              </h3>
              <div className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { class: 'rounded-brutal-sm', radius: '4px' },
                    { class: 'rounded-brutal', radius: '6px' },
                    { class: 'rounded-brutal-lg', radius: '8px' },
                  ].map((radius) => (
                    <div key={radius.class} className="space-y-2">
                      <code className="text-xs text-brutalist-text-tertiary block">{radius.class}</code>
                      <div className={`h-24 bg-electric-blue border-brutal border-black ${radius.class} flex items-center justify-center`}>
                        <span className="text-sm font-bold text-white">{radius.radius}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Patterns Section */}
          <section id="patterns" className="scroll-mt-24">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-neon-pink" />
                <h2 className="text-h2 font-heading font-black text-brutalist-text-primary">
                  Patterns
                </h2>
              </div>
              <p className="text-body text-brutalist-text-secondary">
                Common design patterns and component combinations.
              </p>
            </div>

            {/* Neobrutalist Card Pattern */}
            <div className="mb-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Neobrutalist Card Pattern
              </h3>
              <div className="bg-cream border-brutal border-black rounded-brutal shadow-brutal p-6 transition-all hover:-translate-y-1 hover:shadow-brutal-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-electric-blue border-brutal-thin border-black rounded-brutal flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-h4 font-heading font-bold text-brutalist-text-primary mb-2">
                      Standard Pattern
                    </h4>
                    <p className="text-body-small text-brutalist-text-secondary mb-4">
                      4-6px borders, 8px hard shadows, 6-8px border radius, hover effects with -4px translate.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="design">Brutalist</Badge>
                      <Badge variant="featured">Recommended</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Pattern */}
            <div className="mb-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Call-to-Action Pattern
              </h3>
              <div className="bg-gradient-brand border-brutal border-black rounded-brutal shadow-brutal p-8 text-center">
                <h4 className="text-h2 font-heading font-black text-white mb-3">
                  Ready to get started?
                </h4>
                <p className="text-body text-white/90 mb-6 max-w-lg mx-auto">
                  Brand gradient background with white text and accent button for maximum impact.
                </p>
                <Button variant="accent" size="lg" className="uppercase">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Icon + Content Pattern */}
            <div>
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Icon Grid Pattern
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Heart, color: 'bg-neon-pink', title: 'User-Centered', text: 'Always start with user needs' },
                  { icon: Zap, color: 'bg-cyber-yellow', title: 'Fast & Efficient', text: 'Performance is a feature' },
                  { icon: Check, color: 'bg-electric-blue', title: 'Quality First', text: 'No shortcuts, ever' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6 hover:-translate-y-1 hover:shadow-brutal-lg transition-all">
                      <div className={`w-12 h-12 ${item.color} border-brutal-thin border-black rounded-brutal flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-h4 font-heading font-bold text-brutalist-text-primary mb-2">
                        {item.title}
                      </h4>
                      <p className="text-body-small text-brutalist-text-secondary">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Experience Timeline Pattern */}
            <div className="mt-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Experience Timeline Pattern
              </h3>
              <p className="text-body-small text-brutalist-text-secondary mb-6">
                Combine ExperienceCard components to create professional timelines for portfolios, resumes, or about pages. Perfect for showcasing career progression or educational journey.
              </p>
              <div className="space-y-6">
                <ExperienceCard
                  date="2023 - Present"
                  role="Product Manager"
                  roleColor="purple"
                  company="Tech Startup Inc."
                  description="Leading product development for a SaaS platform serving 10k+ users."
                  achievements={[
                    "Grew MRR by 150% in 6 months through feature prioritization",
                    "Reduced churn rate from 8% to 3% with improved onboarding"
                  ]}
                  skills={["Product-Led Growth", "SaaS Metrics", "A/B Testing"]}
                  isCurrent
                />
                <ExperienceCard
                  date="2021 - 2023"
                  role="Senior Designer"
                  roleColor="blue"
                  company="Design Agency Co."
                  description="Crafted digital experiences for Fortune 500 clients and startups."
                  achievements={[
                    "Led design for 15+ successful product launches",
                    "Mentored junior designers and established design system"
                  ]}
                  skills={["UI/UX Design", "Figma", "Design Systems", "User Research"]}
                  certifications={[
                    { name: "UX Certification", icon: Award }
                  ]}
                />
                <ExperienceCard
                  date="2019 - 2021"
                  role="Junior Developer"
                  roleColor="teal"
                  company="Software Solutions Ltd."
                  description="Built web applications using modern JavaScript frameworks."
                  achievements={[
                    "Contributed to 20+ client projects",
                    "Improved code coverage from 40% to 85%"
                  ]}
                  skills={["React", "Node.js", "TypeScript", "PostgreSQL"]}
                />
              </div>
            </div>

            {/* Activity Dashboard Pattern */}
            <div className="mt-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Activity Dashboard Pattern
              </h3>
              <p className="text-body-small text-brutalist-text-secondary mb-6">
                Combine ActivityCard components to create "What I'm Up To" sections or real-time activity dashboards.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ActivityCard
                  title="Current Work"
                  icon={Briefcase}
                  color="blue"
                  metric={{ label: "+12% faster", icon: TrendingUp }}
                >
                  <p className="text-body-small text-brutalist-text-secondary mb-2">
                    Optimizing payment flows @ <strong className="text-electric-blue">Company</strong>
                  </p>
                  <p className="text-body-small text-brutalist-text-secondary italic">
                    Making payments 12% faster through user research.
                  </p>
                </ActivityCard>

                <ActivityCard
                  title="Learning"
                  icon={BookOpen}
                  color="pink"
                >
                  <p className="text-body-small text-brutalist-text-secondary mb-2">
                    This week: <strong className="text-neon-pink">AI workflows</strong>
                  </p>
                  <p className="text-body-small text-brutalist-text-secondary">
                    Experimenting with Claude for PRD drafts and Figma for rapid prototyping.
                  </p>
                </ActivityCard>

                <ActivityCard
                  title="Side Project"
                  icon={Zap}
                  color="yellow"
                >
                  <p className="text-body-small text-brutalist-text-secondary">
                    Building a <strong className="text-cyber-yellow">design system</strong> for personal portfolio
                  </p>
                </ActivityCard>
              </div>
            </div>

            {/* Collaboration Grid Pattern */}
            <div className="mt-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Collaboration Grid Pattern
              </h3>
              <p className="text-body-small text-brutalist-text-secondary mb-6">
                Use CollaborationCard components to showcase service offerings, pricing tiers, or ways to work together.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CollaborationCard
                  number="01"
                  title="Quick Call"
                  description="30-minute focused session"
                  features={[
                    "Quick problem-solving",
                    "Expert second opinion",
                    "Actionable next steps"
                  ]}
                  icon={Lightbulb}
                  color="blue"
                />
                <CollaborationCard
                  number="02"
                  title="Deep Dive"
                  description="2-hour comprehensive workshop"
                  features={[
                    "In-depth analysis",
                    "Strategy development",
                    "Implementation roadmap"
                  ]}
                  icon={Users}
                  color="pink"
                />
                <CollaborationCard
                  number="03"
                  title="Ongoing Partnership"
                  description="Monthly retainer for continuous support"
                  features={[
                    "Regular check-ins",
                    "Priority support",
                    "Long-term planning"
                  ]}
                  icon={GraduationCap}
                  color="purple"
                />
              </div>
            </div>

            {/* Blog Cards Pattern */}
            <div className="mt-12">
              <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary mb-4">
                Blog Cards Pattern
              </h3>
              <p className="text-body-small text-brutalist-text-secondary mb-6">
                Neobrutalist blog cards following the Designprototipo pattern. Two layout variants: with description (preview text) or without (compact). White background with vertical lift hover animation.
              </p>

              {/* With Description */}
              <div className="mb-8">
                <h4 className="text-h4 font-heading font-bold text-brutalist-text-primary mb-4">
                  With Description
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <BlogCard
                    variant="design"
                    title="The art of saying no"
                    description="Sometimes the best product decisions are the features you don't build. Here's why strategic rejection beats feature bloat."
                    readingTime={5}
                    date="15 Nov 2024"
                    href="#"
                  />
                  <BlogCard
                    variant="pm"
                    title="From chaos to clarity"
                    description="How I went from drowning in Jira tickets to shipping features users actually want. The trick? It's not about doing more."
                    readingTime={7}
                    date="12 Nov 2024"
                    href="#"
                  />
                  <BlogCard
                    variant="featured"
                    title="Quick wins that matter"
                    description="Three micro-optimizations that cut payment time by 12%. Sometimes the answer isn't complex—it's just counting clicks."
                    readingTime={4}
                    date="10 Nov 2024"
                    href="#"
                  />
                </div>
              </div>

              {/* Without Description */}
              <div>
                <h4 className="text-h4 font-heading font-bold text-brutalist-text-primary mb-4">
                  Without Description (Compact)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <BlogCard
                    variant="dev"
                    title="Code review checklist"
                    readingTime={3}
                    date="8 Nov 2024"
                    href="#"
                  />
                  <BlogCard
                    variant="tool"
                    title="Analytics that don't lie"
                    readingTime={6}
                    date="5 Nov 2024"
                    href="#"
                  />
                  <BlogCard
                    variant="design"
                    title="User research in a week"
                    readingTime={5}
                    date="1 Nov 2024"
                    href="#"
                  />
                </div>
              </div>

              {/* Usage Notes */}
              <div className="mt-6 bg-white border-brutal border-black rounded-brutal shadow-brutal p-6">
                <h4 className="text-h4 font-heading font-bold text-brutalist-text-primary mb-3">
                  Usage Guidelines
                </h4>
                <p className="text-body-small text-brutalist-text-secondary mb-4 italic">
                  Based on Designprototipo reference: <a href="https://github.com/Selfrules/Designprototipo" target="_blank" rel="noopener noreferrer" className="text-electric-blue underline">BlogSection.tsx Regular Posts</a>
                </p>
                <ul className="space-y-3 text-body-small text-brutalist-text-secondary">
                  <li className="flex gap-3">
                    <span className="text-electric-blue font-bold">→</span>
                    <span>
                      <strong className="text-brutalist-text-primary">Background:</strong> White background (bg-white) as per prototype, not cream
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-neon-pink font-bold">→</span>
                    <span>
                      <strong className="text-brutalist-text-primary">Hover Animation:</strong> Vertical lift only (hover:-translate-y-2), 8px upward movement
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-deep-purple font-bold">→</span>
                    <span>
                      <strong className="text-brutalist-text-primary">Title Hover:</strong> Title changes color to Electric Blue (#0D7EFF) on card hover
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyber-yellow font-bold">→</span>
                    <span>
                      <strong className="text-brutalist-text-primary">Layout:</strong> Badge inline, metadata footer with top border separator (pt-4 border-t)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-teal font-bold">→</span>
                    <span>
                      <strong className="text-brutalist-text-primary">Description:</strong> line-clamp-3 ensures descriptions don't overflow (only when provided)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-neon-pink font-bold">→</span>
                    <span>
                      <strong className="text-brutalist-text-primary">Category Variants:</strong> design (Electric Blue), dev (Teal), pm (Deep Purple), tool (Neon Pink), featured (Cyber Yellow)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t-brutal border-black pt-8 mt-16">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brutalist-text-secondary">
                  Design System v2.0 · Built with Next.js & Tailwind CSS
                </p>
                <p className="text-xs text-brutalist-text-tertiary mt-1">
                  100% design token coverage · WCAG AA compliant
                </p>
              </div>
              <div className="flex gap-2">
                <NeoBadge color="blue">Neobrutalist</NeoBadge>
                <NeoBadge color="neutral">Cold-Tone</NeoBadge>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
