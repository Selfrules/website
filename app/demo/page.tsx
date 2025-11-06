'use client';

import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Badge,
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  ThemeToggle,
  AnimatedButton,
  AnimatedCard,
} from '@/components/ui';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function DemoPage() {
  return (
    <main className="min-h-screen">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <Section id="main-content" spacing="lg">
        <SectionHeader>
          <SectionTitle>Neobrutalist design system</SectionTitle>
          <SectionDescription>
            Complete component library with bold borders, hard shadows, and vibrant colors
          </SectionDescription>
        </SectionHeader>

        <motion.div
          className="brutal-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Buttons Section */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="font-heading font-bold text-h3 text-sentence-case">Buttons</h3>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary button</Button>
                <Button variant="secondary">Secondary button</Button>
                <Button variant="accent">Accent button</Button>
                <Button variant="outline">Outline button</Button>
                <Button variant="ghost">Ghost button</Button>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra large</Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <AnimatedButton variant="primary">Animated primary</AnimatedButton>
                <AnimatedButton variant="secondary">Animated secondary</AnimatedButton>
              </div>
            </div>
          </motion.div>

          {/* Cards Section */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="font-heading font-bold text-h3 text-sentence-case">Cards</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card hoverable>
                <CardHeader>
                  <CardTitle>Default card</CardTitle>
                  <CardDescription>
                    This is a default card with hover effect
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body">
                    Cards come with built-in sections for header, content, and footer.
                    All with neobrutalist styling.
                  </p>
                </CardContent>
              </Card>

              <Card variant="primary">
                <CardHeader>
                  <CardTitle>Primary card</CardTitle>
                  <CardDescription>
                    With vibrant yellow background
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body">
                    Multiple variants available: default, primary, secondary, and accent.
                  </p>
                </CardContent>
              </Card>

              <Card variant="secondary">
                <CardHeader>
                  <CardTitle>Secondary card</CardTitle>
                  <CardDescription>
                    With purple background
                  </CardDescription>
                </CardHeader>
              </Card>

              <AnimatedCard variant="accent">
                <CardHeader>
                  <CardTitle>Animated card</CardTitle>
                  <CardDescription>
                    With Framer Motion effects
                  </CardDescription>
                </CardHeader>
              </AnimatedCard>
            </div>
          </motion.div>

          {/* Inputs Section */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="font-heading font-bold text-h3 text-sentence-case">Form inputs</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <Input
                label="Email address"
                type="email"
                placeholder="your@email.com"
                helperText="We'll never share your email"
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
              />

              <Input
                label="Error state"
                type="text"
                error="This field is required"
                placeholder="Required field"
              />

              <Input
                label="Disabled"
                type="text"
                placeholder="Can't edit this"
                disabled
              />
            </div>
          </motion.div>

          {/* Badges Section */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="font-heading font-bold text-h3 text-sentence-case">Badges</h3>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Design</Badge>
                <Badge variant="secondary">Development</Badge>
                <Badge variant="accent">Product</Badge>
                <Badge variant="outline">Personal</Badge>
                <Badge variant="default">Ask me anything</Badge>
              </div>
            </div>
          </motion.div>

          {/* Typography Section */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="font-heading font-bold text-h3 text-sentence-case">Typography</h3>

            <div className="space-y-4">
              <h1 className="font-heading font-black text-responsive-display">
                Display heading
              </h1>
              <h1 className="font-heading font-black text-responsive-h1">
                Heading level 1
              </h1>
              <h2 className="font-heading font-bold text-responsive-h2">
                Heading level 2
              </h2>
              <h3 className="font-heading font-bold text-responsive-h3">
                Heading level 3
              </h3>
              <p className="font-body text-body-xl">
                Body text extra large - Perfect for introductions and lead paragraphs
              </p>
              <p className="font-body text-body-lg">
                Body text large - Great for emphasized content
              </p>
              <p className="font-body text-body">
                Body text regular - The default readable size for paragraphs and content
              </p>
              <p className="font-body text-body-sm">
                Body text small - For captions and secondary information
              </p>
              <code className="font-mono text-body bg-brutalist-surface-dark dark:bg-brutalist-surface-light px-2 py-1 rounded-brutal-sm">
                const code = &apos;JetBrains Mono&apos;;
              </code>
            </div>
          </motion.div>

          {/* Colors Section */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="font-heading font-bold text-h3 text-sentence-case">Color palette</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-24 bg-primary border-brutal border-brutalist-border rounded-brutal shadow-brutal" />
                <p className="font-mono text-body-sm">#FFD93D</p>
                <p className="text-body-sm">Primary</p>
              </div>

              <div className="space-y-2">
                <div className="h-24 bg-secondary border-brutal border-brutalist-border rounded-brutal shadow-brutal" />
                <p className="font-mono text-body-sm">#6C5CE7</p>
                <p className="text-body-sm">Secondary</p>
              </div>

              <div className="space-y-2">
                <div className="h-24 bg-accent border-brutal border-brutalist-border rounded-brutal shadow-brutal" />
                <p className="font-mono text-body-sm">#FF6B6B</p>
                <p className="text-body-sm">Accent</p>
              </div>

              <div className="space-y-2">
                <div className="h-24 bg-brutalist-border border-brutal border-brutalist-border rounded-brutal shadow-brutal" />
                <p className="font-mono text-body-sm">#000000</p>
                <p className="text-body-sm">Border/Shadow</p>
              </div>
            </div>
          </motion.div>

          {/* Shadow Examples */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="font-heading font-bold text-h3 text-sentence-case">Hard shadows</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="h-32 bg-primary border-brutal border-brutalist-border rounded-brutal shadow-brutal-sm flex items-center justify-center">
                  <span className="font-heading font-bold">Small 4px</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-32 bg-secondary text-white border-brutal border-brutalist-border rounded-brutal shadow-brutal flex items-center justify-center">
                  <span className="font-heading font-bold">Default 8px</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-32 bg-accent text-white border-brutal border-brutalist-border rounded-brutal shadow-brutal-lg flex items-center justify-center">
                  <span className="font-heading font-bold">Large 12px</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      <Section variant="primary" spacing="md">
        <div className="text-center space-y-6">
          <h2 className="font-heading font-black text-responsive-h2">
            Ready to build something bold?
          </h2>
          <p className="text-body-xl max-w-2xl mx-auto">
            This complete design system is ready for implementation across all pages
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <AnimatedButton variant="outline" size="lg">
              View documentation
            </AnimatedButton>
            <AnimatedButton variant="accent" size="lg">
              Start building
            </AnimatedButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
