'use client';

import React, { useState } from 'react';
import {
  MessageCircle, Send, User, Bot, Code2, Zap, Sparkles,
  ArrowRight, CheckCircle, XCircle, AlertCircle, Clock,
  Calendar, MapPin, Target, Trophy, Rocket
} from 'lucide-react';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoHeading } from '@/components/ui/NeoHeading';
import { NeoText } from '@/components/ui/NeoText';
import { NeoInput } from '@/components/ui/NeoInput';

export function ChatBotSection() {
  const [message, setMessage] = useState('');

  return (
    <section className="bg-white py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <NeoHeading as="h2" size="h2" className="mb-brutal-xl">
          ChatBot Components
        </NeoHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-brutal-lg">
          {/* Chat Interface */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Chat Interface</NeoHeading>
            <div className="border-brutal border-brutal-black rounded-brutal bg-white h-96 flex flex-col">
              <div className="p-4 border-b-brutal border-brutal-black bg-electric-blue text-white">
                <div className="flex items-center gap-3">
                  <Bot className="h-6 w-6" />
                  <span className="font-heading font-bold">AI Assistant</span>
                  <span className="ml-auto text-xs bg-lime-green text-text-primary px-2 py-1 rounded-brutal">Online</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-electric-blue text-white rounded-brutal flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="flex-1 bg-surface-light p-3 rounded-brutal border-brutal-thin border-brutal-black">
                    <NeoText size="sm">Hello! How can I help you today?</NeoText>
                  </div>
                </div>

                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 bg-deep-purple text-white rounded-brutal flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1 bg-cyber-yellow p-3 rounded-brutal border-brutal-thin border-brutal-black">
                    <NeoText size="sm">I need help with the design system</NeoText>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t-brutal border-brutal-black">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border-brutal-thin border-brutal-black rounded-brutal focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  />
                  <button className="p-2 bg-electric-blue text-white rounded-brutal border-brutal-thin border-brutal-black shadow-brutal-sm hover:-translate-y-0.5 transition-all">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </NeoCard>

          {/* Quick Actions */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Quick Actions</NeoHeading>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-white border-brutal-thin border-brutal-black rounded-brutal shadow-brutal hover:-translate-y-0.5 transition-all text-left">
                <Code2 className="h-6 w-6 text-electric-blue mb-2" />
                <div className="font-bold text-sm">Generate Code</div>
                <div className="text-xs text-text-tertiary">AI-powered code generation</div>
              </button>
              <button className="p-4 bg-white border-brutal-thin border-brutal-black rounded-brutal shadow-brutal hover:-translate-y-0.5 transition-all text-left">
                <Zap className="h-6 w-6 text-neon-pink mb-2" />
                <div className="font-bold text-sm">Quick Fix</div>
                <div className="text-xs text-text-tertiary">Instant bug solutions</div>
              </button>
              <button className="p-4 bg-white border-brutal-thin border-brutal-black rounded-brutal shadow-brutal hover:-translate-y-0.5 transition-all text-left">
                <Sparkles className="h-6 w-6 text-cyber-yellow mb-2" />
                <div className="font-bold text-sm">Suggestions</div>
                <div className="text-xs text-text-tertiary">Smart recommendations</div>
              </button>
              <button className="p-4 bg-white border-brutal-thin border-brutal-black rounded-brutal shadow-brutal hover:-translate-y-0.5 transition-all text-left">
                <MessageCircle className="h-6 w-6 text-deep-purple mb-2" />
                <div className="font-bold text-sm">Chat History</div>
                <div className="text-xs text-text-tertiary">Previous conversations</div>
              </button>
            </div>
          </NeoCard>
        </div>
      </div>
    </section>
  );
}

export function FormsSection() {
  return (
    <section className="bg-cream py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <NeoHeading as="h2" size="h2" className="mb-brutal-xl">
          Form Components
        </NeoHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-brutal-lg">
          {/* Contact Form */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Contact Form</NeoHeading>
            <form className="space-y-4">
              <NeoInput
                label="Name"
                placeholder="John Doe"
                fullWidth
              />
              <NeoInput
                label="Email"
                type="email"
                placeholder="john@example.com"
                fullWidth
              />
              <div>
                <label className="block text-sm font-heading font-bold uppercase tracking-wider text-text-primary mb-2">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-cream text-text-primary border-brutal-thin border-brutal-black rounded-brutal shadow-brutal-sm font-body text-body transition-all duration-200 placeholder:text-text-tertiary focus:outline-none focus:ring-4 focus:ring-electric-blue/50 focus:-translate-y-0.5 focus:shadow-brutal"
                  rows={4}
                  placeholder="Your message..."
                />
              </div>
              <NeoButton variant="primary" fullWidth>
                Send Message
              </NeoButton>
            </form>
          </NeoCard>

          {/* Newsletter Signup */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Newsletter Signup</NeoHeading>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-electric-blue to-deep-purple p-6 rounded-brutal border-brutal border-brutal-black">
                <h4 className="font-heading font-bold text-white text-xl mb-2">Stay Updated</h4>
                <p className="text-white/90 mb-4">Get the latest news and updates directly to your inbox.</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-brutal border-brutal-thin border-brutal-black"
                  />
                  <NeoButton variant="accent" size="sm">
                    Subscribe
                  </NeoButton>
                </div>
              </div>

              <div className="p-4 bg-lime-green/20 border-brutal-thin border-lime-green rounded-brutal">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-lime-green flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm mb-1">Success!</div>
                    <div className="text-sm text-text-secondary">You have been subscribed to our newsletter.</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-error/10 border-brutal-thin border-error rounded-brutal">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm mb-1">Error</div>
                    <div className="text-sm text-text-secondary">Please enter a valid email address.</div>
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

export function TimelineSection() {
  return (
    <section className="bg-white py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <NeoHeading as="h2" size="h2" className="mb-brutal-xl">
          Timeline Component
        </NeoHeading>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-brutal-black" />

          {/* Timeline Items */}
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="relative z-10 w-16 h-16 bg-electric-blue text-white rounded-brutal border-brutal border-brutal-black shadow-brutal flex items-center justify-center">
                <Rocket className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <NeoBadge variant="blue" size="sm">2024</NeoBadge>
                <NeoHeading as="h3" size="h3" className="mt-2 mb-2">Project Launch</NeoHeading>
                <NeoText color="secondary">Successfully launched the new design system with full component library.</NeoText>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="relative z-10 w-16 h-16 bg-neon-pink text-white rounded-brutal border-brutal border-brutal-black shadow-brutal flex items-center justify-center">
                <Trophy className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <NeoBadge variant="pink" size="sm">2023</NeoBadge>
                <NeoHeading as="h3" size="h3" className="mt-2 mb-2">Award Recognition</NeoHeading>
                <NeoText color="secondary">Received design excellence award for innovative UI/UX approach.</NeoText>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="relative z-10 w-16 h-16 bg-cyber-yellow text-text-primary rounded-brutal border-brutal border-brutal-black shadow-brutal flex items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <NeoBadge variant="yellow" size="sm">2022</NeoBadge>
                <NeoHeading as="h3" size="h3" className="mt-2 mb-2">Milestone Achieved</NeoHeading>
                <NeoText color="secondary">Reached 10,000 active users and expanded to new markets.</NeoText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSection() {
  return (
    <section className="bg-cream py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <NeoHeading as="h2" size="h2" className="mb-brutal-xl">
          Hero Sections
        </NeoHeading>

        <div className="space-y-brutal-lg">
          {/* Hero Example 1 */}
          <NeoCard variant="elevated" noPadding>
            <div className="relative bg-gradient-to-br from-electric-blue to-deep-purple p-12 md:p-20 text-white">
              <div className="absolute top-8 right-8 text-cyber-yellow animate-float">
                <Sparkles className="h-12 w-12" />
              </div>
              <div className="max-w-2xl">
                <NeoBadge variant="yellow" size="lg">NEW RELEASE</NeoBadge>
                <h1 className="font-heading font-black text-4xl md:text-6xl mt-4 mb-6">
                  Build Amazing Products
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  The complete design system for building neobrutalist interfaces with style and confidence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <NeoButton variant="accent" size="lg">
                    Get Started
                  </NeoButton>
                  <NeoButton variant="outline" size="lg">
                    Learn More
                  </NeoButton>
                </div>
              </div>
            </div>
          </NeoCard>

          {/* Hero Example 2 */}
          <NeoCard variant="elevated" noPadding>
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-12 md:p-16 bg-white">
                <NeoBadge variant="design" size="sm">DESIGN SYSTEM</NeoBadge>
                <NeoHeading as="h1" size="hero" className="mt-4 mb-6">
                  Brutalist Beauty
                </NeoHeading>
                <NeoText size="lg" color="secondary" className="mb-8">
                  Bold borders. Vibrant colors. Hard shadows. Build interfaces that make a statement.
                </NeoText>
                <NeoButton variant="primary" size="lg">
                  Explore Components →
                </NeoButton>
              </div>
              <div className="relative bg-gradient-to-br from-neon-pink to-cyber-yellow p-12 md:p-16">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-white/20 backdrop-blur rounded-brutal border-brutal-thin border-white/50" />
                  <div className="h-32 bg-white/20 backdrop-blur rounded-brutal border-brutal-thin border-white/50" />
                  <div className="h-32 bg-white/20 backdrop-blur rounded-brutal border-brutal-thin border-white/50" />
                  <div className="h-32 bg-white/20 backdrop-blur rounded-brutal border-brutal-thin border-white/50" />
                </div>
              </div>
            </div>
          </NeoCard>
        </div>
      </div>
    </section>
  );
}

export function WorkTogetherSection() {
  return (
    <section className="bg-white py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <NeoHeading as="h2" size="h2" className="mb-brutal-xl">
          Services & CTA
        </NeoHeading>

        <NeoCard variant="elevated" noPadding>
          <div className="bg-gradient-to-r from-deep-purple via-electric-blue to-neon-pink p-1">
            <div className="bg-white p-12 md:p-16">
              <div className="max-w-3xl mx-auto text-center">
                <NeoHeading as="h2" size="h1" className="mb-6">
                  Let's Work Together
                </NeoHeading>
                <NeoText size="lg" color="secondary" className="mb-12">
                  Transform your ideas into reality with our expert team. We bring creativity,
                  technical excellence, and strategic thinking to every project.
                </NeoText>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="p-6 border-brutal-thin border-brutal-black rounded-brutal">
                    <div className="w-12 h-12 bg-electric-blue text-white rounded-brutal flex items-center justify-center mx-auto mb-4">
                      <Code2 className="h-6 w-6" />
                    </div>
                    <NeoHeading as="h3" size="h4">Development</NeoHeading>
                    <NeoText size="sm" color="secondary" className="mt-2">
                      Clean code, modern frameworks
                    </NeoText>
                  </div>

                  <div className="p-6 border-brutal-thin border-brutal-black rounded-brutal">
                    <div className="w-12 h-12 bg-neon-pink text-white rounded-brutal flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <NeoHeading as="h3" size="h4">Design</NeoHeading>
                    <NeoText size="sm" color="secondary" className="mt-2">
                      Beautiful, functional interfaces
                    </NeoText>
                  </div>

                  <div className="p-6 border-brutal-thin border-brutal-black rounded-brutal">
                    <div className="w-12 h-12 bg-cyber-yellow text-text-primary rounded-brutal flex items-center justify-center mx-auto mb-4">
                      <Target className="h-6 w-6" />
                    </div>
                    <NeoHeading as="h3" size="h4">Strategy</NeoHeading>
                    <NeoText size="sm" color="secondary" className="mt-2">
                      Data-driven growth solutions
                    </NeoText>
                  </div>
                </div>

                <NeoButton variant="primary" size="lg">
                  Start Your Project →
                </NeoButton>
              </div>
            </div>
          </div>
        </NeoCard>
      </div>
    </section>
  );
}