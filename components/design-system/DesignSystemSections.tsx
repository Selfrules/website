'use client';

import React, { useState } from 'react';
import {
  BookOpen, TrendingUp, Share2, Heart, MessageSquare, Clock,
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Menu, X,
  ArrowUp, BookmarkPlus, Copy, Check, Sparkles, Circle, Square,
  Triangle, Star, Twitter, Linkedin, Facebook, Link2, Calendar, Eye
} from 'lucide-react';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoHeading } from '@/components/ui/NeoHeading';
import { NeoText } from '@/components/ui/NeoText';

export function BlogComponentsSection() {
  return (
    <section className="bg-white py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <NeoHeading as="h2" size="h2" className="mb-brutal-xl">
          Blog Components
        </NeoHeading>

        <div className="space-y-brutal-lg">
          {/* Reading Progress */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Reading Progress</NeoHeading>
            <div className="space-y-6">
              {/* Progress bar example */}
              <div className="space-y-2">
                <div className="relative h-1.5 bg-surface-light rounded-full overflow-hidden border border-[#000]">
                  <div className="absolute inset-0 bg-electric-blue transition-all duration-300" style={{ width: '60%' }} />
                </div>
                <NeoText size="sm" color="tertiary">Scroll progress: 60%</NeoText>
              </div>

              {/* Desktop vs Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-heading font-bold text-sm mb-3">Desktop (Top Fixed)</h4>
                  <div className="border-3 border-[#000] rounded-lg p-4 bg-cream">
                    <NeoText size="sm" color="tertiary">Progress bar stays at viewport top</NeoText>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm mb-3">Mobile (Header)</h4>
                  <div className="border-3 border-[#000] rounded-lg p-4 bg-cream">
                    <NeoText size="sm" color="tertiary">Responsive, thinner on mobile</NeoText>
                  </div>
                </div>
              </div>
            </div>
          </NeoCard>

          {/* Table of Contents */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Table of Contents (ToC)</NeoHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Desktop Sticky */}
              <div>
                <h4 className="font-heading font-bold text-sm mb-3">Desktop (Sticky Sidebar)</h4>
                <div className="border-4 border-[#000] rounded-lg p-4 bg-white">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-text-tertiary" />
                    <span className="font-heading font-bold text-sm">Table of Contents</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-electric-blue cursor-pointer">
                      <ChevronRight className="h-4 w-4" />
                      <span className="text-sm font-medium">Introduction</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary hover:text-electric-blue transition-colors cursor-pointer pl-6">
                      <ChevronRight className="h-3 w-3" />
                      <span className="text-sm">Key Concepts</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary hover:text-electric-blue transition-colors cursor-pointer pl-6">
                      <ChevronRight className="h-3 w-3" />
                      <span className="text-sm">Implementation</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary hover:text-electric-blue transition-colors cursor-pointer">
                      <ChevronRight className="h-4 w-4" />
                      <span className="text-sm font-medium">Conclusion</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Collapsible */}
              <div>
                <h4 className="font-heading font-bold text-sm mb-3">Mobile (Collapsible)</h4>
                <div className="border-4 border-[#000] rounded-lg bg-white">
                  <button className="w-full flex items-center justify-between p-4 hover:bg-surface-light transition-colors">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-text-tertiary" />
                      <span className="font-heading font-bold text-sm">Table of Contents</span>
                    </div>
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </NeoCard>

          {/* CTA Boxes */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">CTA Boxes</NeoHeading>
            <div className="space-y-6">
              {/* Inline CTA */}
              <div>
                <h4 className="font-heading font-bold text-sm mb-3">Inline CTA (In-Article)</h4>
                <div className="bg-gradient-to-r from-electric-blue to-deep-purple p-8 rounded-lg border-4 border-[#000] shadow-brutal">
                  <div className="flex items-start gap-3 mb-4">
                    <Sparkles className="h-6 w-6 text-cyber-yellow flex-shrink-0" />
                    <h4 className="font-heading font-bold text-white text-xl">Want to learn more?</h4>
                  </div>
                  <p className="text-white/90 mb-6 max-w-md">
                    Subscribe to get weekly insights on product management and design.
                  </p>
                  <NeoButton variant="accent" size="md">
                    Subscribe Now
                  </NeoButton>
                </div>
              </div>

              {/* End-of-Section CTA */}
              <div>
                <h4 className="font-heading font-bold text-sm mb-3">End-of-Section CTA</h4>
                <div className="bg-cyber-yellow p-8 rounded-lg border-4 border-[#000] shadow-brutal">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brutal-black rounded-lg">
                      <ArrowUp className="h-6 w-6 text-cyber-yellow" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-brutal-black text-xl mb-2">Ready to take action?</h4>
                      <p className="text-brutal-black/80 mb-4">
                        Apply these concepts to your next project.
                      </p>
                      <NeoButton variant="primary" size="md">
                        Get Started →
                      </NeoButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NeoCard>

          {/* Social Share */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Social Share</NeoHeading>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-electric-blue text-white rounded-lg border-3 border-[#000] shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all font-heading font-bold text-sm">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-electric-blue text-white rounded-lg border-3 border-[#000] shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all font-heading font-bold text-sm">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-electric-blue text-white rounded-lg border-3 border-[#000] shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all font-heading font-bold text-sm">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-text-primary rounded-lg border-3 border-[#000] shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all font-heading font-bold text-sm">
                  <Link2 className="h-4 w-4" />
                  Copy Link
                </button>
              </div>
              <NeoText size="sm" color="tertiary">Social sharing buttons with hover effects</NeoText>
            </div>
          </NeoCard>

          {/* Blog Article Card */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Blog Article Card</NeoHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Desktop Card */}
              <div>
                <h4 className="font-heading font-bold text-sm mb-3">Desktop</h4>
                <div className="border-4 border-[#000] rounded-lg shadow-brutal-lg overflow-hidden bg-white hover:-translate-y-2 hover:shadow-brutal-lg transition-all">
                  <div className="bg-gradient-to-br from-electric-blue via-deep-purple to-deep-purple p-6 min-h-[140px] relative">
                    <NeoBadge variant="yellow" size="sm">PRODUCT MANAGEMENT</NeoBadge>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl mb-2">How I Turned Failure into Feature</h3>
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      A deep dive into product management lessons learned from shipping products that users actually love...
                    </p>
                    <div className="flex items-center gap-4 text-xs text-text-tertiary">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>15 Nov 2025</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>8 min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Card */}
              <div>
                <h4 className="font-heading font-bold text-sm mb-3">Mobile</h4>
                <div className="border-4 border-[#000] rounded-lg shadow-brutal overflow-hidden bg-white max-w-xs">
                  <div className="bg-gradient-to-br from-neon-pink to-cyber-yellow p-4 min-h-[100px] relative">
                    <NeoBadge variant="design" size="sm">DESIGN</NeoBadge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-lg mb-1">Design System 101</h3>
                    <p className="text-text-secondary text-xs mb-3 line-clamp-1">
                      Building scalable design systems...
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-tertiary">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>12 Nov</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>5 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
  return (
    <section className="bg-cream py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <NeoHeading as="h2" size="h2" className="mb-brutal-xl">
          Navigation Components
        </NeoHeading>

        <div className="space-y-brutal-lg">
          {/* Header & Menu */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Header & Menu</NeoHeading>

            <div className="space-y-6">
              {/* Desktop Header */}
              <div>
                <h4 className="font-heading font-bold text-sm mb-3">Desktop Header</h4>
                <div className="border-4 border-[#000] rounded-lg bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-neon-pink to-deep-purple rounded-lg border-3 border-[#000]" />
                      <span className="font-heading font-bold text-lg">Mattia Cintura</span>
                    </div>
                    <nav className="flex items-center gap-6">
                      <a href="#" className="font-heading font-bold text-sm hover:text-electric-blue transition-colors">Home</a>
                      <a href="#" className="font-heading font-bold text-sm hover:text-electric-blue transition-colors">Blog</a>
                      <a href="#" className="font-heading font-bold text-sm hover:text-electric-blue transition-colors">Portfolio</a>
                      <NeoButton variant="primary" size="sm">Contact</NeoButton>
                    </nav>
                  </div>
                </div>
              </div>

              {/* Mobile Header */}
              <div>
                <h4 className="font-heading font-bold text-sm mb-3">Mobile Header</h4>
                <div className="border-4 border-[#000] rounded-lg bg-white p-4 max-w-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-neon-pink to-deep-purple rounded-lg border-3 border-[#000]" />
                      <span className="font-heading font-bold">MC</span>
                    </div>
                    <button className="p-2 border-3 border-[#000] rounded-lg hover:bg-surface-light transition-colors">
                      <Menu className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </NeoCard>

          {/* Breadcrumbs */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Breadcrumbs</NeoHeading>

            <div className="space-y-6">
              {/* Desktop */}
              <div>
                <h4 className="font-heading font-bold text-sm mb-3">Desktop</h4>
                <div className="border-4 border-[#000] rounded-lg bg-cream p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <a href="#" className="text-electric-blue hover:underline">Home</a>
                    <ChevronRight className="h-4 w-4 text-text-tertiary" />
                    <a href="#" className="text-electric-blue hover:underline">Blog</a>
                    <ChevronRight className="h-4 w-4 text-text-tertiary" />
                    <span className="text-text-primary font-bold">Current Article</span>
                  </div>
                </div>
              </div>

              {/* Mobile (Compact) */}
              <div>
                <h4 className="font-heading font-bold text-sm mb-3">Mobile (Compact)</h4>
                <div className="border-4 border-[#000] rounded-lg bg-cream p-4 max-w-xs">
                  <div className="flex items-center gap-2 text-sm">
                    <a href="#" className="text-electric-blue hover:underline">Blog</a>
                    <ChevronRight className="h-4 w-4 text-text-tertiary" />
                    <span className="text-text-primary font-bold">Current Article</span>
                  </div>
                </div>
              </div>
            </div>
          </NeoCard>

          {/* Pagination */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Pagination</NeoHeading>

            <div className="border-4 border-[#000] rounded-lg bg-white p-8">
              <div className="flex items-center justify-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center border-3 border-[#000] rounded-lg hover:bg-surface-light transition-all">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center border-3 border-[#000] rounded-lg bg-white hover:bg-surface-light transition-all font-heading font-bold">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center border-3 border-[#000] rounded-lg bg-electric-blue text-white shadow-brutal-sm font-heading font-bold">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center border-3 border-[#000] rounded-lg bg-white hover:bg-surface-light transition-all font-heading font-bold">
                  3
                </button>
                <span className="px-2 text-text-tertiary">...</span>
                <button className="w-10 h-10 flex items-center justify-center border-3 border-[#000] rounded-lg bg-white hover:bg-surface-light transition-all font-heading font-bold">
                  10
                </button>
                <button className="w-10 h-10 flex items-center justify-center border-3 border-[#000] rounded-lg hover:bg-surface-light transition-all">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </NeoCard>
        </div>
      </div>
    </section>
  );
}