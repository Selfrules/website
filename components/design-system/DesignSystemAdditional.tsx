'use client';

import React, { useState } from 'react';
import {
  MessageCircle, Send, User, Bot, Code2, Zap, Sparkles,
  ArrowRight, CheckCircle, XCircle, AlertCircle, Clock,
  Calendar, MapPin, Target, Trophy, Rocket, Search, ExternalLink,
  X, Mail, TrendingUp
} from 'lucide-react';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoHeading } from '@/components/ui/NeoHeading';
import { NeoText } from '@/components/ui/NeoText';
import { NeoInput } from '@/components/ui/NeoInput';

export function ChatBotSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-white py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <NeoHeading as="h2" size="h2" className="mb-brutal-xl">
          ChatBot Widget
        </NeoHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-brutal-lg">
          {/* Floating Button */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Floating Button</NeoHeading>

            <div className="relative bg-cream p-12 rounded-brutal border-brutal border-brutal-black min-h-[300px] flex items-end justify-end">
              {/* Chat Window (when open) */}
              {isOpen && (
                <div className="absolute bottom-24 right-0 w-80 bg-white border-brutal border-brutal-black rounded-brutal shadow-brutal-lg">
                  {/* Header */}
                  <div className="p-4 bg-gradient-to-r from-[#0D7EFF] to-[#7209B7] border-b-brutal border-brutal-black rounded-t-brutal">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <Bot className="h-5 w-5 text-[#0D7EFF]" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">AI Assistant</p>
                          <p className="text-white/80 text-xs">Online</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-white/80"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="p-4 bg-cream h-48 space-y-3">
                    <div className="flex gap-2">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-brutal-black">
                        <Bot className="h-4 w-4 text-[#0D7EFF]" />
                      </div>
                      <div className="flex-1 bg-white p-2 rounded-brutal border-2 border-brutal-black text-sm">
                        Ciao! 👋
                      </div>
                    </div>
                    <div className="flex gap-2 flex-row-reverse">
                      <div className="w-6 h-6 bg-[#0D7EFF] rounded-full flex items-center justify-center border-2 border-brutal-black">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 bg-[#0D7EFF] text-white p-2 rounded-brutal border-2 border-brutal-black text-sm">
                        Ciao! Vorrei info...
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t-brutal border-brutal-black bg-white rounded-b-brutal">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Scrivi un messaggio..."
                        className="flex-1 px-3 py-2 border-2 border-brutal-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7EFF]"
                      />
                      <button className="p-2 bg-[#0D7EFF] text-white rounded border-2 border-brutal-black shadow-brutal-sm hover:-translate-y-0.5 transition-all">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-16 h-16 bg-gradient-to-br from-[#0D7EFF] to-[#7209B7] rounded-full border-brutal border-brutal-black shadow-brutal-lg hover:-translate-y-1 hover:shadow-brutal transition-all flex items-center justify-center"
              >
                {/* Notification Badge */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF006E] border-2 border-white rounded-full animate-pulse" />

                <MessageCircle className="h-8 w-8 text-white" />
              </button>
            </div>

            <NeoText size="sm" color="tertiary" className="mt-4">
              Floating chat button with notification badge
            </NeoText>
          </NeoCard>

          {/* States */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Button States</NeoHeading>

            <div className="space-y-6">
              {/* Default State */}
              <div>
                <p className="text-sm font-bold mb-2">Default</p>
                <button className="w-16 h-16 bg-gradient-to-br from-[#0D7EFF] to-[#7209B7] rounded-full border-brutal border-brutal-black shadow-brutal-lg flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-white" />
                </button>
              </div>

              {/* With Notification */}
              <div>
                <p className="text-sm font-bold mb-2">With Notification Badge</p>
                <button className="relative w-16 h-16 bg-gradient-to-br from-[#0D7EFF] to-[#7209B7] rounded-full border-brutal border-brutal-black shadow-brutal-lg flex items-center justify-center">
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF006E] border-2 border-white rounded-full" />
                  <MessageCircle className="h-8 w-8 text-white" />
                </button>
              </div>

              {/* Open State */}
              <div>
                <p className="text-sm font-bold mb-2">Open (X Icon)</p>
                <button className="relative w-16 h-16 bg-gradient-to-br from-[#0D7EFF] to-[#7209B7] rounded-full border-brutal border-brutal-black shadow-brutal-lg flex items-center justify-center">
                  <X className="h-8 w-8 text-white" />
                </button>
              </div>
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
          {/* Desktop - Anonymous Form */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Desktop Form</NeoHeading>

            <div className="bg-[#1A1A1A] p-8 rounded-brutal border-4 border-[#FF006E] shadow-brutal-lg">
              {/* Icon */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-[#FF006E] rounded-brutal border-brutal-thin border-brutal-black flex items-center justify-center flex-shrink-0">
                  <Mail className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-xl mb-1">Chiedi in anonimo</h4>
                  <p className="text-white/70 text-sm">Compila il form per ricevere una risposta</p>
                </div>
              </div>

              {/* Form Fields */}
              <form className="space-y-4">
                <div>
                  <label className="block text-white font-bold text-sm mb-2">Nome</label>
                  <input
                    type="text"
                    placeholder="Mario Rossi"
                    className="w-full px-4 py-3 bg-[#2D2D2D] text-white border-brutal-thin border-[#FF006E] rounded-brutal placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF006E]"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold text-sm mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="mario.rossi@email.com"
                    className="w-full px-4 py-3 bg-[#2D2D2D] text-white border-brutal-thin border-[#FF006E] rounded-brutal placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF006E]"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold text-sm mb-2">Messaggio</label>
                  <textarea
                    placeholder="Scrivi qui il tuo messaggio..."
                    rows={4}
                    className="w-full px-4 py-3 bg-[#2D2D2D] text-white border-brutal-thin border-[#FF006E] rounded-brutal placeholder:text-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF006E]"
                  />
                </div>

                <button
                  type="button"
                  className="w-full px-6 py-3 bg-[#FF006E] text-white font-heading font-bold uppercase rounded-brutal border-brutal-thin border-brutal-black shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all"
                >
                  Invia Messaggio
                </button>
              </form>
            </div>
          </NeoCard>

          {/* Mobile - Chat Form */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Mobile Form</NeoHeading>

            <div className="max-w-[375px]">
              <div className="bg-[#1A1A1A] p-6 rounded-brutal border-4 border-[#0D7EFF] shadow-brutal-lg">
                {/* Icon */}
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#0D7EFF] rounded-brutal border-brutal-thin border-brutal-black flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-lg mb-1">Inizia chat</h4>
                    <p className="text-white/70 text-xs">Messaggia in tempo reale</p>
                  </div>
                </div>

                {/* Form Fields */}
                <form className="space-y-3">
                  <div>
                    <label className="block text-white font-bold text-xs mb-2">Nome</label>
                    <input
                      type="text"
                      placeholder="Mario Rossi"
                      className="w-full px-3 py-2 bg-[#2D2D2D] text-white text-sm border-brutal-thin border-[#0D7EFF] rounded-brutal placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#0D7EFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold text-xs mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="mario@email.com"
                      className="w-full px-3 py-2 bg-[#2D2D2D] text-white text-sm border-brutal-thin border-[#0D7EFF] rounded-brutal placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#0D7EFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold text-xs mb-2">Messaggio</label>
                    <textarea
                      placeholder="Ciao! Vorrei info..."
                      rows={3}
                      className="w-full px-3 py-2 bg-[#2D2D2D] text-white text-sm border-brutal-thin border-[#0D7EFF] rounded-brutal placeholder:text-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-[#0D7EFF]"
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full px-4 py-2.5 bg-[#0D7EFF] text-white font-heading font-bold text-sm uppercase rounded-brutal border-brutal-thin border-brutal-black shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all"
                  >
                    Inizia Chat
                  </button>
                </form>
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
          Journey Timeline
        </NeoHeading>

        <div className="space-y-brutal-xl">
          {/* 1. Vertical Gradient Line */}
          <NeoCard variant="elevated">
            <div className="flex items-center gap-3 mb-brutal-md">
              <Calendar className="h-8 w-8 text-cyber-yellow" />
              <NeoHeading as="h3" size="h3">Vertical Gradient Line</NeoHeading>
            </div>
            <NeoText size="sm" color="tertiary" className="mb-brutal-md">
              Multi-color gradient line connecting all milestones. On mobile: left-aligned (left-[15px]). On desktop: centered (left-1/2).
            </NeoText>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-brutal-lg">
              {/* Visual Example */}
              <div className="bg-cream p-8 rounded-brutal border-brutal border-brutal-black">
                <p className="font-bold text-sm mb-4">Visual Example</p>
                <div className="relative h-96 flex items-center justify-center">
                  {/* Gradient Line */}
                  <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 timeline-gradient" />

                  {/* Dots on the line */}
                  <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-12 -translate-x-1/2 w-12 h-12 bg-deep-purple border-4 border-brutal-black rounded-full" />
                  <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-1/3 -translate-x-1/2 w-12 h-12 bg-cyber-yellow border-4 border-brutal-black rounded-full" />
                  <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-2/3 -translate-x-1/2 w-12 h-12 bg-neon-pink border-4 border-brutal-black rounded-full" />
                  <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 bottom-12 -translate-x-1/2 w-12 h-12 bg-electric-blue border-4 border-brutal-black rounded-full" />
                </div>
              </div>

              {/* CSS Classes */}
              <div className="bg-brutal-black p-6 rounded-brutal border-brutal border-brutal-black">
                <p className="text-cyber-yellow font-bold text-sm mb-4">CSS Classes</p>
                <pre className="text-xs text-electric-blue font-mono overflow-x-auto">
{`<div className="
  absolute
  left-[15px]
  md:left-1/2
  top-0
  bottom-0
  w-1
  bg-gradient-to-b
  from-[#7209B7]
  via-[#FFD60A]
  via-[#FF006E]
  to-[#0D7EFF]
  md:-translate-x-1/2
"/>`}
                </pre>
              </div>
            </div>
          </NeoCard>

          {/* 2. Timeline Icons (Dots) */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Timeline Icons (Dots)</NeoHeading>
            <NeoText size="sm" color="tertiary" className="mb-brutal-md">
              Circular icons positioned on the timeline. Current milestone has larger size, glow effect, and pulse animation.
            </NeoText>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Standard Milestone */}
              <div className="bg-cream p-6 rounded-brutal border-brutal border-brutal-black text-center">
                <p className="font-bold text-sm mb-4">Standard Milestone</p>
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 bg-white border-4 border-brutal-black rounded-full flex items-center justify-center">
                    <Code2 className="h-5 w-5" />
                  </div>
                </div>
                <code className="text-xs text-text-tertiary">w-10 h-10 • bg-white</code>
              </div>

              {/* Current Milestone */}
              <div className="bg-cream p-6 rounded-brutal border-brutal border-brutal-black text-center">
                <p className="font-bold text-sm mb-4">Current Milestone</p>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[#0D7EFF] border-4 border-brutal-black rounded-full flex items-center justify-center animate-pulse-dot">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
                <code className="text-xs text-text-tertiary">w-12 h-12 • bg-[#0D7EFF] • pulse</code>
              </div>

              {/* Gradient Milestone */}
              <div className="bg-cream p-6 rounded-brutal border-brutal border-brutal-black text-center">
                <p className="font-bold text-sm mb-4">Gradient Milestone</p>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-cyber-yellow border-4 border-brutal-black rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                <code className="text-xs text-text-tertiary">gradient • from-pink to-yellow</code>
              </div>
            </div>
          </NeoCard>

          {/* 3. Milestone Cards */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Milestone Cards</NeoHeading>
            <NeoText size="sm" color="tertiary" className="mb-brutal-md">
              Content cards with date badge, role badge, title, description, achievements, skills, and certifications.
            </NeoText>

            <div className="relative">
              {/* Vertical gradient line connecting milestones */}
              <div className="absolute left-[15px] top-0 bottom-0 w-1 timeline-gradient" />

              <div className="space-y-6 relative">
                {/* Example Card */}
                <div className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-3 top-6 w-10 h-10 bg-deep-purple border-4 border-brutal-black rounded-full flex items-center justify-center z-10">
                    <Code2 className="h-5 w-5 text-white" />
                  </div>

                  {/* Card */}
                  <div className="ml-12 bg-cream border-brutal border-brutal-black rounded-brutal shadow-brutal p-6">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white border-2 border-brutal-black rounded shadow-brutal-sm text-xs font-mono font-bold">
                      2018-2021
                    </span>
                    <span className="px-3 py-1 bg-[#0D7EFF] text-white border-2 border-brutal-black rounded shadow-brutal-sm text-xs font-bold uppercase">
                      DEVELOPER
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-heading font-bold text-xl mb-2">Full-Stack Developer</h4>

                  {/* Description */}
                  <p className="text-text-secondary mb-4">
                    Ho sviluppato applicazioni web complesse utilizzando React, Node.js e PostgreSQL.
                  </p>

                  {/* Achievements */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-electric-blue mt-1 flex-shrink-0" />
                      <p className="text-sm">Migrazione infrastruttura cloud con -40% costi</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-electric-blue mt-1 flex-shrink-0" />
                      <p className="text-sm">Sviluppato design system riutilizzabile</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="font-bold text-xs mb-2 uppercase">SKILLS:</p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript'].map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-white border-2 border-brutal-black rounded text-xs font-mono">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <p className="font-bold text-xs mb-2 uppercase">CERTIFICAZIONI:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[#0D7EFF] text-white border-2 border-brutal-black rounded text-xs font-mono flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        AWS Certified Developer
                      </span>
                      <span className="px-2 py-1 bg-[#FF006E] text-white border-2 border-brutal-black rounded text-xs font-mono flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        React Advanced
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Card (with highlight) */}
              <div className="relative">
                {/* Timeline Dot - Current */}
                <div className="absolute -left-3 top-6 w-12 h-12 bg-[#0D7EFF] border-4 border-brutal-black rounded-full flex items-center justify-center z-10 animate-pulse-dot">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>

                {/* Card */}
                <div className="ml-12 bg-cream border-brutal border-brutal-black rounded-brutal shadow-brutal p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white border-2 border-brutal-black rounded shadow-brutal-sm text-xs font-mono font-bold">
                      2024-NOW
                    </span>
                    <span className="px-3 py-1 bg-[#FF006E] text-white border-2 border-brutal-black rounded shadow-brutal-sm text-xs font-bold uppercase">
                      PRODUCT MANAGER
                    </span>
                    <span className="px-2 py-1 bg-white border-2 border-brutal-black rounded text-xs font-bold">
                      OGGI
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-xl mb-2">Senior Product Manager</h4>

                  <p className="text-text-secondary mb-4">
                    Guido team cross-funzionali nella creazione di prodotti che gli utenti amano. Focus su data-driven decisions.
                  </p>

                  <div className="mb-4">
                    <p className="font-bold text-xs mb-2 uppercase">SKILLS:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Product Strategy', 'OKR', 'User Research', 'SQL', 'A/B Testing'].map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-white border-2 border-brutal-black rounded text-xs font-mono">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </NeoCard>

          {/* 4. Journey Badges */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Journey Badges</NeoHeading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-brutal-lg">
              {/* Skills Badges */}
              <div>
                <p className="font-bold mb-4">Skills Badges</p>
                <NeoText size="sm" color="tertiary" className="mb-4">
                  White background with black border. Font: Space Mono monospace.
                </NeoText>

                <div className="bg-cream p-6 rounded-brutal border-brutal border-brutal-black">
                  <p className="font-bold text-xs mb-3 uppercase">SKILLS:</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['React', 'TypeScript', 'PostgreSQL'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-white border-2 border-brutal-black rounded-sm text-xs font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="bg-brutal-black p-4 rounded-brutal">
                    <pre className="text-xs text-electric-blue font-mono overflow-x-auto">
{`<span className="
  px-2 py-1
  bg-white
  border-2 border-[#000]
  rounded-sm
  text-xs
" style={{
  fontFamily: 'Space Mono, monospace'
}}>
  React
</span>`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Certification Badges */}
              <div>
                <p className="font-bold mb-4">Certification Badges</p>
                <NeoText size="sm" color="tertiary" className="mb-4">
                  Colored background matching role color. Includes Award/Shield icon. Font: Space Mono.
                </NeoText>

                <div className="bg-cream p-6 rounded-brutal border-brutal border-brutal-black">
                  <p className="font-bold text-xs mb-3 uppercase">CERTIFICAZIONI:</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-[#0D7EFF] text-white border-2 border-brutal-black rounded-sm text-xs font-mono flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      AWS Certified
                    </span>
                    <span className="px-2 py-1 bg-[#FF006E] text-white border-2 border-brutal-black rounded-sm text-xs font-mono flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      PSPO-I Certified
                    </span>
                    <span className="px-2 py-1 bg-[#FFD60A] text-brutal-black border-2 border-brutal-black rounded-sm text-xs font-mono flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      Google Analytics
                    </span>
                  </div>

                  <div className="bg-brutal-black p-4 rounded-brutal">
                    <pre className="text-xs text-electric-blue font-mono overflow-x-auto">
{`<span className="
  px-2 py-1
  bg-[#0D7EFF]
  border-2 border-[#000]
  rounded-sm
  text-xs
  flex items-center gap-1
  text-white
" style={{
  fontFamily: 'Space Mono, monospace'
}}>
  <Award className="w-3 h-3" />
  AWS Certified
</span>`}
                    </pre>
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

export function LinksColoredTextSection() {
  return (
    <section id="links" className="bg-cream py-brutal-3xl scroll-mt-24">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <NeoHeading as="h2" size="h2" className="mb-brutal-xl">
          Links & Colored Text
        </NeoHeading>

        <div className="space-y-brutal-lg">
          {/* Link Styles */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Link Styles</NeoHeading>

            <div className="space-y-6">
              {/* Standard Link */}
              <div className="p-6 bg-cream rounded-brutal border-brutal-thin border-brutal-black">
                <p className="text-body">
                  This is a{' '}
                  <a
                    href="#"
                    className="text-electric-blue font-bold hover:underline transition-all"
                  >
                    standard link
                  </a>
                  {' '}with hover underline.
                </p>
              </div>

              {/* Pink Link */}
              <div className="p-6 bg-cream rounded-brutal border-brutal-thin border-brutal-black">
                <p className="text-body">
                  This is a{' '}
                  <a
                    href="#"
                    className="text-neon-pink font-bold underline hover:no-underline transition-all"
                  >
                    pink link
                  </a>
                  {' '}with reverse hover.
                </p>
              </div>

              {/* External Link */}
              <div className="p-6 bg-cream rounded-brutal border-brutal-thin border-brutal-black">
                <p className="text-body">
                  This is an{' '}
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-deep-purple font-bold hover:text-electric-blue transition-colors"
                  >
                    external link
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </p>
              </div>
            </div>
          </NeoCard>

          {/* Colored Text Highlights */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Colored Text Highlights</NeoHeading>

            <div className="space-y-6">
              {/* Semantic Colors */}
              <div className="p-6 bg-cream rounded-brutal border-brutal-thin border-brutal-black">
                <p className="text-body">
                  Highlight{' '}
                  <span className="text-electric-blue font-bold">important concepts</span>
                  {' '}with color to{' '}
                  <span className="text-neon-pink font-bold">draw attention</span>
                  {' '}and create{' '}
                  <span className="text-deep-purple font-bold">visual hierarchy</span>.
                </p>
              </div>

              {/* Inline Code */}
              <div className="p-6 bg-cream rounded-brutal border-brutal-thin border-brutal-black">
                <p className="text-body">
                  Use{' '}
                  <code className="px-2 py-1 bg-cyber-yellow text-brutal-black border-2 border-brutal-black rounded font-mono text-sm font-bold">
                    inline code
                  </code>
                  {' '}with yellow background for technical terms.
                </p>
              </div>

              {/* Combined Example */}
              <div className="p-6 bg-white rounded-brutal border-brutal border-brutal-black shadow-brutal">
                <NeoHeading as="h4" size="h4" className="mb-4">Combined Example</NeoHeading>
                <p className="text-body leading-relaxed">
                  When building a{' '}
                  <span className="text-electric-blue font-bold">design system</span>,
                  it's crucial to establish{' '}
                  <span className="text-deep-purple font-bold">consistent patterns</span>
                  {' '}for components like{' '}
                  <code className="px-2 py-1 bg-cyber-yellow text-brutal-black border-2 border-brutal-black rounded font-mono text-sm font-bold">
                    Button
                  </code>
                  {' '}and{' '}
                  <code className="px-2 py-1 bg-cyber-yellow text-brutal-black border-2 border-brutal-black rounded font-mono text-sm font-bold">
                    Card
                  </code>.
                  {' '}Learn more in our{' '}
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-neon-pink font-bold underline hover:no-underline transition-all"
                  >
                    documentation
                  </a>.
                </p>
              </div>
            </div>
          </NeoCard>

          {/* Color Reference */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Text Color Reference</NeoHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-electric-blue border-2 border-brutal-black rounded" />
                  <div>
                    <p className="font-bold text-sm">Electric Blue</p>
                    <p className="text-xs text-text-tertiary font-mono">#0D7EFF</p>
                  </div>
                  <span className="ml-auto text-electric-blue font-bold">Example Text</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-neon-pink border-2 border-brutal-black rounded" />
                  <div>
                    <p className="font-bold text-sm">Neon Pink</p>
                    <p className="text-xs text-text-tertiary font-mono">#FF006E</p>
                  </div>
                  <span className="ml-auto text-neon-pink font-bold">Example Text</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-deep-purple border-2 border-brutal-black rounded" />
                  <div>
                    <p className="font-bold text-sm">Deep Purple</p>
                    <p className="text-xs text-text-tertiary font-mono">#7209B7</p>
                  </div>
                  <span className="ml-auto text-deep-purple font-bold">Example Text</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyber-yellow border-2 border-brutal-black rounded" />
                  <div>
                    <p className="font-bold text-sm">Cyber Yellow</p>
                    <p className="text-xs text-text-tertiary font-mono">#FFD60A</p>
                  </div>
                  <code className="ml-auto px-2 py-1 bg-cyber-yellow text-brutal-black border-2 border-brutal-black rounded font-mono text-xs font-bold">
                    Code
                  </code>
                </div>
              </div>
            </div>
          </NeoCard>
        </div>
      </div>
    </section>
  );
}