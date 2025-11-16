'use client';

import React, { useState } from 'react';
import {
  MessageCircle, Send, User, Bot, Code2, Zap, Sparkles,
  ArrowRight, CheckCircle, XCircle, AlertCircle, Clock,
  Calendar, MapPin, Target, Trophy, Rocket, Search, ExternalLink,
  X, Mail, TrendingUp, Users, FileText, BarChart, Lightbulb
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
        <div className="flex items-center gap-4 mb-brutal-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-cyber-yellow rounded-brutal border-brutal border-brutal-black shadow-brutal flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <NeoHeading as="h2" size="h2">Hero Section</NeoHeading>
            <NeoText size="sm" color="tertiary">Homepage hero with floating shapes</NeoText>
          </div>
        </div>

        <NeoCard variant="elevated">
          <NeoHeading as="h3" size="h3" className="mb-brutal-md">Hero Layout</NeoHeading>

          {/* Hero with Floating Shapes */}
          <div className="relative bg-cream border-brutal border-brutal-black rounded-brutal shadow-brutal p-12 md:p-16 overflow-hidden">
            {/* Floating Shapes */}
            <div className="absolute top-20 left-10 w-16 h-16 bg-neon-pink border-brutal-thin border-brutal-black rounded-lg rotate-45 opacity-90" />
            <div className="absolute top-32 left-1/4 w-20 h-20 bg-deep-purple border-brutal-thin border-brutal-black rounded-full opacity-90" />
            <div className="absolute top-10 right-16 w-24 h-24 bg-electric-blue border-brutal-thin border-brutal-black rounded-full opacity-90" />
            <div className="absolute bottom-20 right-20 w-16 h-16 bg-cyber-yellow border-brutal-thin border-brutal-black rounded-lg rotate-45 opacity-90" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-pink text-white border-brutal-thin border-brutal-black rounded-brutal shadow-brutal mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="font-bold text-sm uppercase">Product Manager</span>
              </div>

              {/* Heading */}
              <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-6">
                Trasformo fallimenti in{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-neon-pink">feature</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-electric-blue -rotate-1 -z-10" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Da designer a developer a <span className="text-neon-pink font-bold">Product Manager</span>.
                Ho raccolto i pezzi di ogni fallimento per costruire prodotti che le persone amano.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-4">
                <NeoButton variant="primary" size="lg">
                  Scopri di più
                </NeoButton>
                <button className="px-6 py-3 bg-white text-brutal-black border-brutal border-brutal-black rounded-brutal shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all font-bold">
                  Contattami
                </button>
              </div>
            </div>
          </div>
        </NeoCard>
      </div>
    </section>
  );
}

export function WorkTogetherSection() {
  return (
    <section className="bg-white py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center gap-4 mb-brutal-xl">
          <div className="w-12 h-12 bg-deep-purple text-white rounded-brutal border-brutal border-brutal-black shadow-brutal flex items-center justify-center">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <NeoHeading as="h2" size="h2">Work Together Section</NeoHeading>
            <NeoText size="sm" color="tertiary">Collaboration cards with pricing</NeoText>
          </div>
        </div>

        <NeoCard variant="elevated">
          <NeoHeading as="h3" size="h3" className="mb-brutal-md">Service Cards</NeoHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Brainstorming Session */}
            <div className="bg-white border-brutal border-brutal-black rounded-brutal shadow-brutal p-6 flex flex-col">
              <div className="w-12 h-12 bg-electric-blue text-white rounded-brutal border-2 border-brutal-black flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>

              <NeoHeading as="h3" size="h4" className="mb-3">
                Brainstorming Session
              </NeoHeading>

              <p className="text-electric-blue font-heading font-bold text-3xl mb-4">
                €150<span className="text-lg text-text-tertiary font-normal">/ora</span>
              </p>

              <NeoText size="sm" color="secondary" className="mb-6 flex-grow">
                Una call di 60 minuti per discutere il tuo progetto, sfide o opportunità.
              </NeoText>

              <NeoButton variant="primary" className="w-full">
                Prenota ora
              </NeoButton>
            </div>

            {/* Consulenza Strategica - POPULAR */}
            <div className="relative bg-gradient-to-br from-[#FF006E] via-[#FF8C42] to-[#FFD60A] border-brutal border-brutal-black rounded-brutal shadow-brutal-lg p-6 flex flex-col">
              <span className="absolute -top-3 right-4 px-3 py-1 bg-cyber-yellow text-brutal-black border-2 border-brutal-black rounded font-bold text-xs uppercase">
                POPULAR
              </span>

              <div className="w-12 h-12 bg-cyber-yellow text-brutal-black rounded-brutal border-2 border-brutal-black flex items-center justify-center mb-4">
                <Target className="h-6 w-6" />
              </div>

              <NeoHeading as="h3" size="h4" className="mb-3 text-white">
                Consulenza Strategica
              </NeoHeading>

              <p className="text-white font-heading font-bold text-3xl mb-4">
                €500<span className="text-lg font-normal">/progetto</span>
              </p>

              <NeoText size="sm" className="mb-6 flex-grow text-white">
                Analisi completa, roadmap strategica e piano d&apos;azione per il tuo prodotto.
              </NeoText>

              <button className="w-full px-6 py-3 bg-white text-brutal-black border-brutal-thin border-brutal-black rounded-brutal shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all font-bold">
                Scopri di più
              </button>
            </div>

            {/* PM Mentorship */}
            <div className="bg-white border-brutal border-brutal-black rounded-brutal shadow-brutal p-6 flex flex-col">
              <div className="w-12 h-12 bg-deep-purple text-white rounded-brutal border-2 border-brutal-black flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>

              <NeoHeading as="h3" size="h4" className="mb-3">
                PM Mentorship
              </NeoHeading>

              <p className="text-deep-purple font-heading font-bold text-3xl mb-4">
                €300<span className="text-lg text-text-tertiary font-normal">/mese</span>
              </p>

              <NeoText size="sm" color="secondary" className="mb-6 flex-grow">
                Supporto continuo per crescere come Product Manager con feedback personalizzato.
              </NeoText>

              <button className="w-full px-6 py-3 bg-white text-brutal-black border-brutal-thin border-brutal-black rounded-brutal shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all font-bold">
                Candidati
              </button>
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
                  it&apos;s crucial to establish{' '}
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

export function AdminComponentsSection() {
  return (
    <section className="bg-white py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center gap-4 mb-brutal-xl">
          <div className="w-12 h-12 bg-deep-purple text-white rounded-brutal border-brutal border-brutal-black shadow-brutal flex items-center justify-center">
            <BarChart className="h-6 w-6" />
          </div>
          <div>
            <NeoHeading as="h2" size="h2">Admin Components</NeoHeading>
            <NeoText size="sm" color="tertiary">Dashboard, analytics, and management interfaces</NeoText>
          </div>
        </div>

        <div className="space-y-brutal-xl">
          {/* Stats Cards */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Stats Cards</NeoHeading>
            <NeoText size="sm" color="tertiary" className="mb-brutal-md">
              Dashboard cards showing key metrics with icon, value, and trend indicator
            </NeoText>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Visite totali */}
              <div className="bg-white border-brutal border-brutal-black rounded-brutal shadow-brutal p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-electric-blue text-white rounded-brutal border-2 border-brutal-black flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="px-2 py-1 bg-[#10B981] text-white border-2 border-brutal-black rounded text-xs font-bold">
                    +23%
                  </span>
                </div>
                <p className="text-text-tertiary text-sm mb-1">Visite totali</p>
                <p className="font-heading font-bold text-3xl">12,456</p>
              </div>

              {/* Articoli pubblicati */}
              <div className="bg-white border-brutal border-brutal-black rounded-brutal shadow-brutal p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-deep-purple text-white rounded-brutal border-2 border-brutal-black flex items-center justify-center">
                    <FileText className="h-6 w-6" />
                  </div>
                  <span className="px-2 py-1 bg-[#FFD60A] text-brutal-black border-2 border-brutal-black rounded text-xs font-bold">
                    +3
                  </span>
                </div>
                <p className="text-text-tertiary text-sm mb-1">Articoli pubblicati</p>
                <p className="font-heading font-bold text-3xl">24</p>
              </div>

              {/* Bounce rate */}
              <div className="bg-white border-brutal border-brutal-black rounded-brutal shadow-brutal p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-cyber-yellow text-brutal-black rounded-brutal border-2 border-brutal-black flex items-center justify-center">
                    <Clock className="h-6 w-6" />
                  </div>
                  <span className="px-2 py-1 bg-[#EF4444] text-white border-2 border-brutal-black rounded text-xs font-bold">
                    -8%
                  </span>
                </div>
                <p className="text-text-tertiary text-sm mb-1">Bounce rate</p>
                <p className="font-heading font-bold text-3xl">42%</p>
              </div>

              {/* Conversioni */}
              <div className="bg-white border-brutal border-brutal-black rounded-brutal shadow-brutal p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-neon-pink text-white rounded-brutal border-2 border-brutal-black flex items-center justify-center">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <span className="px-2 py-1 bg-[#10B981] text-white border-2 border-brutal-black rounded text-xs font-bold">
                    +34%
                  </span>
                </div>
                <p className="text-text-tertiary text-sm mb-1">Conversioni</p>
                <p className="font-heading font-bold text-3xl">234</p>
              </div>
            </div>
          </NeoCard>

          {/* AI Insights Cards */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">AI Insights Cards</NeoHeading>
            <NeoText size="sm" color="tertiary" className="mb-brutal-md">
              Intelligent recommendations with priority levels
            </NeoText>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Insights Panel */}
              <div className="bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#7209B7] p-6 rounded-brutal border-brutal border-brutal-black shadow-brutal-lg">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-5 w-5 text-white" />
                  <h4 className="font-heading font-bold text-white text-lg">AI Insights</h4>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur border-2 border-white/20 rounded-brutal p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <AlertCircle className="h-5 w-5 text-cyber-yellow flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-white text-sm">Picco di traffico nel pomeriggio</p>
                          <span className="px-2 py-0.5 bg-[#EF4444] text-white rounded text-xs font-bold">HIGH</span>
                        </div>
                        <p className="text-white/90 text-sm">
                          Gli utenti sono più attivi tra le 14:00 e le 16:00. Programma i post in questa fascia.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur border-2 border-white/20 rounded-brutal p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <Lightbulb className="h-5 w-5 text-cyber-yellow flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-white text-sm">Articoli su OKR performano meglio</p>
                          <span className="px-2 py-0.5 bg-[#FFD60A] text-brutal-black rounded text-xs font-bold">MEDIUM</span>
                        </div>
                        <p className="text-white/90 text-sm">
                          +45% engagement rispetto ad altri topic. Crea più contenuti su questo tema.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations Panel */}
              <div className="bg-white border-brutal border-brutal-black rounded-brutal shadow-brutal p-6">
                <h4 className="font-heading font-bold text-lg mb-4">Recommendations</h4>

                <div className="space-y-4">
                  <div className="border-l-4 border-[#FF006E] pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-[#FF006E] text-white rounded text-xs font-bold">URGENT</span>
                      <p className="font-bold text-sm">12 lead qualificati da contattare</p>
                    </div>
                    <p className="text-text-tertiary text-sm">
                      Follow-up consigliato entro 48h per massimizzare conversioni
                    </p>
                  </div>

                  <div className="border-l-4 border-[#FFD60A] pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-[#FFD60A] text-brutal-black rounded text-xs font-bold">MEDIUM</span>
                      <p className="font-bold text-sm">Ottimizza meta description</p>
                    </div>
                    <p className="text-text-tertiary text-sm">
                      5 articoli hanno description troppo corta (&lt;120 caratteri)
                    </p>
                  </div>

                  <div className="border-l-4 border-[#0D7EFF] pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-[#0D7EFF] text-white rounded text-xs font-bold">INFO</span>
                      <p className="font-bold text-sm">Backup completato con successo</p>
                    </div>
                    <p className="text-text-tertiary text-sm">
                      Ultimo backup: 2 ore fa • 2.4 MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </NeoCard>

          {/* Activity Timeline */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Activity Timeline</NeoHeading>
            <NeoText size="sm" color="tertiary" className="mb-brutal-md">
              Chronological list of recent activities with timestamps
            </NeoText>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-cream border-brutal border-brutal-black rounded-brutal">
                <div className="w-12 h-12 bg-deep-purple text-white rounded-brutal border-2 border-brutal-black flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Nuovo articolo pubblicato: <strong>&quot;Product-Market Fit&quot;</strong></p>
                  <div className="flex items-center gap-1 text-text-tertiary text-sm mt-1">
                    <Clock className="h-3 w-3" />
                    <span>2 ore fa</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-cream border-brutal border-brutal-black rounded-brutal">
                <div className="w-12 h-12 bg-neon-pink text-white rounded-brutal border-2 border-brutal-black flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Nuova conversazione da <strong>Marco R.</strong></p>
                  <div className="flex items-center gap-1 text-text-tertiary text-sm mt-1">
                    <Clock className="h-3 w-3" />
                    <span>3 ore fa</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-cream border-brutal border-brutal-black rounded-brutal">
                <div className="w-12 h-12 bg-electric-blue text-white rounded-brutal border-2 border-brutal-black flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Articolo <strong>&quot;OKR vs KPI&quot;</strong> programmato per domani</p>
                  <div className="flex items-center gap-1 text-text-tertiary text-sm mt-1">
                    <Clock className="h-3 w-3" />
                    <span>5 ore fa</span>
                  </div>
                </div>
              </div>
            </div>
          </NeoCard>

          {/* Priority Badges */}
          <NeoCard variant="elevated">
            <NeoHeading as="h3" size="h3" className="mb-brutal-md">Priority Badges</NeoHeading>
            <NeoText size="sm" color="tertiary" className="mb-brutal-md">
              Status and priority indicators for tasks and items
            </NeoText>

            <div className="space-y-6">
              <div>
                <p className="font-bold mb-3">Priority Levels</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-[#FF006E] text-white font-bold text-sm uppercase rounded border-2 border-brutal-black">URGENT</span>
                  <span className="px-3 py-1.5 bg-[#FFD60A] text-brutal-black font-bold text-sm uppercase rounded border-2 border-brutal-black">HIGH</span>
                  <span className="px-3 py-1.5 bg-[#0D7EFF] text-white font-bold text-sm uppercase rounded border-2 border-brutal-black">MEDIUM</span>
                  <span className="px-3 py-1.5 bg-[#6B7280] text-white font-bold text-sm uppercase rounded border-2 border-brutal-black">LOW</span>
                </div>
              </div>

              <div>
                <p className="font-bold mb-3">Status Indicators</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-[#10B981] text-white font-bold text-sm uppercase rounded border-2 border-brutal-black flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    PUBLISHED
                  </span>
                  <span className="px-3 py-1.5 bg-[#FFD60A] text-brutal-black font-bold text-sm uppercase rounded border-2 border-brutal-black flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    DRAFT
                  </span>
                  <span className="px-3 py-1.5 bg-[#7209B7] text-white font-bold text-sm uppercase rounded border-2 border-brutal-black flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    SCHEDULED
                  </span>
                  <span className="px-3 py-1.5 bg-[#EF4444] text-white font-bold text-sm uppercase rounded border-2 border-brutal-black flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    ARCHIVED
                  </span>
                </div>
              </div>

              <div>
                <p className="font-bold mb-3">Trend Indicators</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-[#10B981] text-white font-bold text-sm rounded border-2 border-brutal-black flex items-center gap-1">
                    <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
                    +23%
                  </span>
                  <span className="px-3 py-1.5 bg-[#EF4444] text-white font-bold text-sm rounded border-2 border-brutal-black flex items-center gap-1">
                    <ArrowRight className="h-4 w-4 rotate-[45deg]" />
                    -8%
                  </span>
                  <span className="px-3 py-1.5 bg-[#6B7280] text-white font-bold text-sm rounded border-2 border-brutal-black flex items-center gap-1">
                    ±
                    0%
                  </span>
                </div>
              </div>
            </div>
          </NeoCard>
        </div>
      </div>
    </section>
  );
}

export function DataVisualizationSection() {
  return (
    <section className="bg-cream py-brutal-3xl">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center gap-4 mb-brutal-xl">
          <div className="w-12 h-12 bg-cyber-yellow text-brutal-black rounded-brutal border-brutal border-brutal-black shadow-brutal flex items-center justify-center">
            <BarChart className="h-6 w-6" />
          </div>
          <div>
            <NeoHeading as="h2" size="h2">Data Visualization</NeoHeading>
            <NeoText size="sm" color="tertiary">Charts and graphs with Recharts integration</NeoText>
          </div>
        </div>

        <NeoCard variant="elevated">
          <NeoHeading as="h3" size="h3" className="mb-brutal-md">Chart Styling</NeoHeading>
          <NeoText size="sm" color="tertiary" className="mb-brutal-lg">
            All charts use the neobrutalist color palette and thick borders
          </NeoText>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Color Palette */}
            <div className="bg-white border-brutal border-brutal-black rounded-brutal shadow-brutal p-6">
              <h4 className="font-heading font-bold text-lg mb-4">Chart Color Palette</h4>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0D7EFF] border-2 border-brutal-black rounded" />
                  <div>
                    <p className="font-bold text-sm">#0D7EFF</p>
                    <p className="text-xs text-text-tertiary">Primary data series</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#7209B7] border-2 border-brutal-black rounded" />
                  <div>
                    <p className="font-bold text-sm">#7209B7</p>
                    <p className="text-xs text-text-tertiary">Secondary data series</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FF006E] border-2 border-brutal-black rounded" />
                  <div>
                    <p className="font-bold text-sm">#FF006E</p>
                    <p className="text-xs text-text-tertiary">Accent data series</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FFD60A] border-2 border-brutal-black rounded" />
                  <div>
                    <p className="font-bold text-sm">#FFD60A</p>
                    <p className="text-xs text-text-tertiary">Highlight data series</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recharts Configuration */}
            <div className="bg-brutal-black border-brutal border-brutal-black rounded-brutal shadow-brutal p-6 overflow-x-auto">
              <h4 className="font-heading font-bold text-lg mb-4 text-white">Recharts Configuration</h4>

              <pre className="text-xs text-white font-mono overflow-x-auto">
<code>{`<LineChart data={data}>
  <CartesianGrid
    stroke="#E5E5E5"
    strokeWidth={2}
  />
  <Line
    type="monotone"
    dataKey="value"
    stroke="#0D7EFF"
    strokeWidth={3}
    dot={{
      fill: "#0D7EFF",
      stroke: "#000",
      strokeWidth: 2,
      r: 4
    }}
  />
</LineChart>`}</code>
              </pre>
            </div>
          </div>

          {/* Chart Guidelines */}
          <div className="bg-[#FFD60A] border-brutal border-brutal-black rounded-brutal shadow-brutal p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">📊</div>
              <div className="flex-1">
                <p className="font-bold mb-2">Chart Guidelines:</p>
                <p className="text-sm">
                  Use thick strokes (3px+), bold colors, and black borders on data points. Grid lines should be light gray (#E5E5E5) with 2px width. All charts should be wrapped in cards with border-4 and shadow-brutal.
                </p>
              </div>
            </div>
          </div>
        </NeoCard>
      </div>
    </section>
  );
}
