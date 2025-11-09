import React from 'react';
import { NeoBadge } from './NeoBadge';
import { Briefcase, BookOpen, Music, TrendingUp } from 'lucide-react';

export function WhatImUpToSection() {
  return (
    <section id="now" className="bg-white py-16 md:py-24 border-b-4 border-[#000] relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0D7EFF]/10 to-[#FF006E]/10 rounded-full blur-3xl" />
      
      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <NeoBadge color="blue">Cosa sto facendo</NeoBadge>
          </div>
          <h2 className="text-h1 mb-4">What I'm up to</h2>
          <p className="text-body text-[#2D2D2D] max-w-[600px] mx-auto">
            Una finestra sulla mia vita professionale <strong className="text-[#0D7EFF]">in real-time</strong>
          </p>
        </div>

        {/* Grid - Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Current Work */}
          <div className="bg-[#FFFCF2] border-4 border-[#000] rounded-lg shadow-brutal p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D7EFF] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#0D7EFF] border-3 border-[#000] rounded-lg flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <Briefcase className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-h3 mb-3 text-[#0A0A0A]">
                Lavoro attuale
              </h3>
              <p className="text-body-small text-[#2D2D2D] leading-relaxed">
                Product Manager @ <strong className="text-[#0D7EFF]">QubicaAMF</strong> - Sto rendendo i pagamenti 12% più veloci. Come? Ascoltando chi usa il sistema ogni giorno invece di fare meeting su meeting.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#06FFA5]" />
                <span className="text-xs font-bold text-[#06FFA5]" style={{ fontFamily: 'Space Mono, monospace' }}>
                  -12% tempi
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 - Learning in Public */}
          <div className="bg-[#FFFCF2] border-4 border-[#000] rounded-lg shadow-brutal p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF006E] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#FF006E] border-3 border-[#000] rounded-lg flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-h3 mb-3 text-[#0A0A0A]">
                Learning in Public
              </h3>
              <p className="text-body-small text-[#2D2D2D] leading-relaxed">
                Questa settimana: come <strong className="text-[#FF006E]">l'AI sta cambiando</strong> il mio workflow. Non sostituisce il mio lavoro, lo amplifica. Il trucco? Sapere cosa delegare e cosa tenere.
              </p>
            </div>
          </div>

          {/* Card 3 - Spotify Widget */}
          <div className="bg-[#FFFCF2] border-4 border-[#000] rounded-lg shadow-brutal p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg md:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-[#FFD60A] border-3 border-[#000] rounded-lg flex items-center justify-center mb-4">
              <Music className="w-6 h-6 text-[#0A0A0A]" strokeWidth={2.5} />
            </div>
            <h3 className="text-h3 mb-4 text-[#0A0A0A]">
              Now Playing
            </h3>
            
            {/* Spotify Widget */}
            <div className="w-full bg-[#0A0A0A] border-3 border-[#000] rounded-lg p-4 flex items-center gap-4 shadow-brutal-sm">
              {/* Acoerenlbum Art Placeholder */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#0D7EFF] to-[#7209B7] rounded border-3 border-[#1DB954] flex-shrink-0 animate-pulse-spotify" />
              
              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white truncate mb-1 text-sm md:text-base font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Deep Focus Playlist
                </p>
                <p className="text-[#6B7280] truncate text-xs md:text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Coding & Creating
                </p>
              </div>
              
              {/* Playing Indicator */}
              <div className="flex gap-0.5 items-end flex-shrink-0">
                <div className="w-1 bg-[#1DB954] rounded-full animate-pulse" style={{ height: '12px', animationDelay: '0s' }} />
                <div className="w-1 bg-[#1DB954] rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0.2s' }} />
                <div className="w-1 bg-[#1DB954] rounded-full animate-pulse" style={{ height: '16px', animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}