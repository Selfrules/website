import React from 'react';
import { NeoBadge } from './NeoBadge';
import { Check, Lightbulb, Users, GraduationCap } from 'lucide-react';

interface CollaborationCard {
  id: number;
  number: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  icon: any;
}

const collaborations: CollaborationCard[] = [
  {
    id: 1,
    number: '01',
    title: 'Consulenze strategiche',
    description: 'Sblocchiamo il tuo prodotto in 90 minuti',
    features: [
      'Analisi del problema reale (non quello che pensi di avere)',
      'Strategia concreta da implementare subito',
      'Roadmap prioritizzata per i prossimi 3 mesi',
    ],
    color: '#0D7EFF',
    icon: Lightbulb,
  },
  {
    id: 2,
    number: '02',
    title: 'Brainstorming sessions',
    description: 'Due cervelli, un problema, infinite soluzioni',
    features: [
      'Sessioni da 60 minuti focus su un problema specifico',
      'Approccio design thinking + esperienza tecnica',
      'Actionable output, non solo idee',
    ],
    color: '#FF006E',
    icon: Users,
  },
  {
    id: 3,
    number: '03',
    title: 'Mentorship',
    description: 'Il percorso che avrei voluto qualcuno mi mostrasse',
    features: [
      '1-on-1 mensile per product managers',
      'Design → Dev → PM career transition',
      'Portfolio review e career strategy',
    ],
    color: '#7209B7',
    icon: GraduationCap,
  },
];

export function WorkTogetherSection() {
  return (
    <section id="work" className="bg-[#FFFCF2] py-16 md:py-24 border-b-4 border-[#000] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
      
      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <NeoBadge color="yellow">Collaborazioni</NeoBadge>
          </div>
          <h2 className="text-h1 mb-4">Come possiamo lavorare insieme</h2>
          <p className="text-body text-[#2D2D2D] max-w-[600px] mx-auto">
            Non vendo consulenze. Non vendo ore. <strong className="text-[#FF006E]">Vendo risultati.</strong>
          </p>
        </div>

        {/* Grid - Mobile First: Stack, Desktop: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {collaborations.map((collab) => {
            const Icon = collab.icon;
            return (
              <article
                key={collab.id}
                className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg"
              >
                {/* Icon & Number */}
                <div className="flex items-center justify-between mb-5">
                  <div 
                    className="w-14 h-14 rounded-lg border-4 border-[#000] flex items-center justify-center"
                    style={{ backgroundColor: collab.color }}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <span 
                    className="text-6xl opacity-10"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 900,
                      color: collab.color,
                    }}
                  >
                    {collab.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-h3 mb-3 text-[#0A0A0A]">
                  {collab.title}
                </h3>

                {/* Description */}
                <p className="text-body-small text-[#2D2D2D] mb-5">
                  {collab.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2.5">
                  {collab.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: collab.color }} strokeWidth={3} />
                      <span className="text-body-small text-[#2D2D2D] leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-[#0D7EFF] via-[#FF006E] to-[#7209B7] border-4 border-[#000] rounded-lg shadow-brutal p-6 md:p-8 max-w-[700px] -rotate-1">
            <p className="text-body md:text-body-large text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
              Pronto a trasformare la tua idea in prodotto?
            </p>
            <a 
              href="#ask-me"
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-[#FFD60A] text-[#0A0A0A] border-4 border-[#000] rounded shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}
            >
              Prenota una chiamata
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}