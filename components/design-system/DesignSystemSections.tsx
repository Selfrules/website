'use client';

import React, { useState } from 'react';
import {
  BookOpen, TrendingUp, Share2, Heart, MessageSquare, Clock,
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Menu, X,
  ArrowUp, BookmarkPlus, Copy, Check, Sparkles, Circle, Square,
  Triangle, Star
} from 'lucide-react';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoHeading } from '@/components/ui/NeoHeading';
import { NeoText } from '@/components/ui/NeoText';

export function BlogComponentsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-cream py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <NeoHeading as="h2" size="h2" className="mb-brutal-xl">
          Blog Components
        </NeoHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-brutal-lg">
          {/* Reading Progress */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Reading Progress</NeoHeading>
            <div className="space-y-4">
              <div className="relative h-1 bg-surface-light rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-electric-blue w-3/4 transition-all duration-300" />
              </div>
              <NeoText size="sm" color="tertiary">Desktop: Fixed top bar (75% complete)</NeoText>

              <div className="relative">
                <div className="h-12 bg-surface-light border-brutal-thin border-brutal-black rounded-brutal p-2">
                  <div className="h-full bg-neon-pink rounded w-1/2" />
                </div>
                <NeoText size="sm" color="tertiary" className="mt-2">Mobile: Floating indicator (50% complete)</NeoText>
              </div>
            </div>
          </NeoCard>

          {/* Table of Contents */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Table of Contents</NeoHeading>
            <div className="space-y-4">
              <div className="border-brutal-thin border-brutal-black rounded-brutal p-4 bg-white">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-electric-blue">
                    <ChevronRight className="h-4 w-4" />
                    <span className="font-bold text-sm">Introduction</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary hover:text-electric-blue transition-colors cursor-pointer">
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-sm">Getting Started</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary hover:text-electric-blue transition-colors cursor-pointer">
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-sm">Advanced Features</span>
                  </div>
                </div>
              </div>
              <NeoText size="sm" color="tertiary">Sticky sidebar navigation</NeoText>
            </div>
          </NeoCard>

          {/* CTA Box */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">CTA Boxes</NeoHeading>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-electric-blue to-deep-purple p-6 rounded-brutal border-brutal border-brutal-black">
                <h4 className="font-heading font-bold text-white text-lg mb-2">Ready to start?</h4>
                <p className="text-white/90 text-sm mb-4">Join thousands of developers building amazing products.</p>
                <NeoButton variant="accent" size="sm">Get Started →</NeoButton>
              </div>
              <NeoText size="sm" color="tertiary">Inline & end-of-article CTAs</NeoText>
            </div>
          </NeoCard>

          {/* Social Share */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Social Share</NeoHeading>
            <div className="space-y-4">
              <div className="flex gap-3">
                <button className="p-3 bg-electric-blue text-white rounded-brutal border-brutal-thin border-brutal-black shadow-brutal-sm hover:-translate-y-0.5 transition-all">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-3 bg-neon-pink text-white rounded-brutal border-brutal-thin border-brutal-black shadow-brutal-sm hover:-translate-y-0.5 transition-all">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-3 bg-deep-purple text-white rounded-brutal border-brutal-thin border-brutal-black shadow-brutal-sm hover:-translate-y-0.5 transition-all">
                  <MessageSquare className="h-5 w-5" />
                </button>
                <button className="p-3 bg-cyber-yellow text-text-primary rounded-brutal border-brutal-thin border-brutal-black shadow-brutal-sm hover:-translate-y-0.5 transition-all">
                  <BookmarkPlus className="h-5 w-5" />
                </button>
              </div>
              <NeoText size="sm" color="tertiary">Social sharing buttons with hover effects</NeoText>
            </div>
          </NeoCard>
        </div>
      </div>
    </section>
  );
}

export function PatternsTexturesSection() {
  return (
    <section className="bg-white py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <NeoHeading as="h2" size="h2" className="mb-brutal-xl">
          Patterns & Textures
        </NeoHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-brutal-lg">
          {/* Dot Pattern */}
          <div className="relative h-48 bg-surface-light border-brutal border-brutal-black rounded-brutal shadow-brutal overflow-hidden">
            <div className="absolute inset-0 bg-dots-pattern bg-dots opacity-20" />
            <div className="relative z-10 p-6">
              <NeoHeading as="h3" size="h3">Dot Pattern</NeoHeading>
              <NeoText size="sm" color="secondary">Subtle background texture</NeoText>
            </div>
          </div>

          {/* Grid Pattern */}
          <div className="relative h-48 bg-electric-blue border-brutal border-brutal-black rounded-brutal shadow-brutal overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
            <div className="relative z-10 p-6">
              <NeoHeading as="h3" size="h3" className="text-white">Grid Pattern</NeoHeading>
              <NeoText size="sm" className="text-white/90">Bold geometric overlay</NeoText>
            </div>
          </div>

          {/* Diagonal Pattern */}
          <div className="relative h-48 bg-neon-pink border-brutal border-brutal-black rounded-brutal shadow-brutal overflow-hidden">
            <div className="absolute inset-0 bg-diagonal-pattern opacity-10" />
            <div className="relative z-10 p-6">
              <NeoHeading as="h3" size="h3" className="text-white">Diagonal Lines</NeoHeading>
              <NeoText size="sm" className="text-white/90">Dynamic stripe effect</NeoText>
            </div>
          </div>

          {/* Floating Shapes */}
          <div className="relative h-48 bg-cream border-brutal border-brutal-black rounded-brutal shadow-brutal overflow-hidden">
            <div className="absolute top-4 right-4 text-electric-blue animate-float">
              <Circle className="h-8 w-8" />
            </div>
            <div className="absolute bottom-8 left-8 text-neon-pink animate-float animation-delay-500">
              <Square className="h-6 w-6" />
            </div>
            <div className="absolute top-1/2 right-1/3 text-cyber-yellow animate-float animation-delay-1000">
              <Triangle className="h-10 w-10" />
            </div>
            <div className="relative z-10 p-6">
              <NeoHeading as="h3" size="h3">Floating Shapes</NeoHeading>
              <NeoText size="sm" color="secondary">Animated decorations</NeoText>
            </div>
          </div>

          {/* Corner Accents */}
          <div className="relative h-48 bg-white border-brutal border-brutal-black rounded-brutal shadow-brutal">
            <div className="absolute top-0 left-0 w-16 h-16 bg-electric-blue rounded-br-brutal" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-neon-pink rounded-tl-brutal" />
            <div className="relative z-10 p-6 text-center flex items-center justify-center h-full">
              <div>
                <NeoHeading as="h3" size="h3">Corner Accents</NeoHeading>
                <NeoText size="sm" color="secondary">Visual anchors</NeoText>
              </div>
            </div>
          </div>

          {/* Gradient Mesh */}
          <div className="relative h-48 bg-gradient-to-br from-electric-blue via-deep-purple to-neon-pink border-brutal border-brutal-black rounded-brutal shadow-brutal">
            <div className="absolute inset-0 bg-dots-pattern bg-dots opacity-10" />
            <div className="relative z-10 p-6">
              <NeoHeading as="h3" size="h3" className="text-white">Gradient Mesh</NeoHeading>
              <NeoText size="sm" className="text-white/90">Combined effects</NeoText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NavigationComponentsSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section className="bg-cream py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <NeoHeading as="h2" size="h2" className="mb-brutal-xl">
          Navigation Components
        </NeoHeading>

        <div className="space-y-brutal-lg">
          {/* Header Navigation */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Header Navigation</NeoHeading>

            {/* Desktop Nav */}
            <div className="border-brutal border-brutal-black rounded-brutal bg-white mb-4">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-8">
                  <span className="font-heading font-black text-xl">LOGO</span>
                  <nav className="hidden md:flex items-center gap-6">
                    <a href="#" className="font-bold hover:text-electric-blue transition-colors">Home</a>
                    <a href="#" className="font-bold hover:text-electric-blue transition-colors">About</a>
                    <a href="#" className="font-bold hover:text-electric-blue transition-colors">Services</a>
                    <a href="#" className="font-bold hover:text-electric-blue transition-colors">Contact</a>
                  </nav>
                </div>
                <div className="flex items-center gap-4">
                  <NeoButton variant="primary" size="sm">Get Started</NeoButton>
                  <button className="md:hidden p-2">
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>
            <NeoText size="sm" color="tertiary">Responsive header with mobile menu</NeoText>
          </NeoCard>

          {/* Breadcrumbs */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Breadcrumbs</NeoHeading>
            <div className="flex items-center gap-2 text-sm">
              <a href="#" className="text-electric-blue hover:underline">Home</a>
              <ChevronRight className="h-4 w-4 text-text-tertiary" />
              <a href="#" className="text-electric-blue hover:underline">Products</a>
              <ChevronRight className="h-4 w-4 text-text-tertiary" />
              <span className="text-text-primary font-bold">Design System</span>
            </div>
          </NeoCard>

          {/* Pagination */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Pagination</NeoHeading>
            <div className="flex items-center gap-2">
              <button className="p-2 border-brutal-thin border-brutal-black rounded-brutal hover:bg-surface-light transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 bg-electric-blue text-white border-brutal-thin border-brutal-black rounded-brutal shadow-brutal-sm">
                1
              </button>
              <button className="px-4 py-2 border-brutal-thin border-brutal-black rounded-brutal hover:bg-surface-light transition-colors">
                2
              </button>
              <button className="px-4 py-2 border-brutal-thin border-brutal-black rounded-brutal hover:bg-surface-light transition-colors">
                3
              </button>
              <span className="px-2 text-text-tertiary">...</span>
              <button className="px-4 py-2 border-brutal-thin border-brutal-black rounded-brutal hover:bg-surface-light transition-colors">
                10
              </button>
              <button className="p-2 border-brutal-thin border-brutal-black rounded-brutal hover:bg-surface-light transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </NeoCard>
        </div>
      </div>
    </section>
  );
}