import React from 'react';
import { NeoBadge } from './NeoBadge';
import { ArrowRight, Award, Code, Palette, Rocket } from 'lucide-react';

interface Milestone {
  id: number;
  date: string;
  role: string;
  roleColor: 'blue' | 'pink' | 'yellow' | 'purple';
  company: string;
  description: string;
  achievements: string[];
  skills: string[];
  certifications?: string[];
  isCurrent?: boolean;
  icon: any;
}

// INVERTED: Start from the beginning (2012) to now (2023)
const milestones: Milestone[] = [
  {
    id: 1,
    date: '2012-2018',
    role: 'Designer & Founder',
    roleColor: 'purple',
    company: 'Selfrules',
    description: 'Ho fondato un\'agenzia. Ho fallito. Ho imparato. Ho ricominciato. Ho avuto successo. Ho venduto. In 6 anni ho capito che essere imprenditore significa dire molti più "no" che "sì".',
    achievements: [
      'Fondato e venduto un\'agenzia di design',
      'Gestito team di 5 designer',
      'Portfolio di 50+ progetti',
    ],
    skills: ['UI/UX Design', 'Branding', 'Business Strategy', 'Team Management', 'Adobe Suite'],
    icon: Palette,
  },
  {
    id: 2,
    date: '2016-2020',
    role: 'Full-stack Developer',
    roleColor: 'yellow',
    company: 'FLOWING',
    description: 'Cinque anni a costruire piattaforme web API-first. Ho scritto codice che ancora gira in produzione. Ho capito che la differenza tra un buon prodotto e un grande prodotto sta nei dettagli che nessuno nota... finché non mancano.',
    achievements: [
      'Sviluppato 10+ piattaforme web enterprise',
      'Architetture API-first scalabili',
      'Contribuito a progetti open source',
    ],
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'API Design', 'TypeScript'],
    certifications: ['AWS Certified Developer', 'MongoDB Certified'],
    icon: Code,
  },
  {
    id: 3,
    date: '2021-2023',
    role: 'Product Owner',
    roleColor: 'pink',
    company: 'ActiveProspect',
    description: 'Lead generation B2B per Fortune 500. Ho imparato che quando un cliente enterprise dice "urgente", significa "per ieri". E quando dice "semplice modifica", significa riprogettare metà piattaforma.',
    achievements: [
      '-30% falsi positivi validation',
      'Workflow optimization per Fortune 500',
      'User research con C-level executives',
    ],
    skills: ['B2B SaaS', 'Lead Generation', 'Agile/Scrum', 'User Research', 'SQL', 'Analytics'],
    certifications: ['Certified Scrum Product Owner', 'Product Management Certificate'],
    icon: Rocket,
  },
  {
    id: 4,
    date: '2023-oggi',
    role: 'Product Manager',
    roleColor: 'blue',
    company: 'QubicaAMF',
    description: 'Gestisco integrazioni POS e sistemi di pagamento per il settore bowling. Ho ridotto i tempi medi di pagamento del 12% in 6 mesi. Il segreto? Ho ascoltato i cassieri frustrati alle 22 di sabato sera.',
    achievements: [
      '-12% tempi di pagamento',
      '+9% adoption integrazioni',
      '-10% payment failures',
      '-25% incidenti post-release',
    ],
    skills: ['Product Strategy', 'POS Systems', 'Payment Integration', 'Stakeholder Management', 'Data Analysis'],
    certifications: ['Product Management Professional'],
    isCurrent: true,
    icon: Award,
  },
];

export function JourneySection() {
  return (
    <section id="journey" className="bg-white py-16 md:py-24 border-b-4 border-[#000] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-5 w-20 h-20 bg-[#FFD60A] border-4 border-[#000] rotate-12 opacity-20" />
      <div className="absolute bottom-20 left-5 w-16 h-16 bg-[#FF006E] border-4 border-[#000] rounded-full opacity-20" />
      
      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="flex justify-center mb-4">
            <NeoBadge color="purple">Il mio percorso</NeoBadge>
          </div>
          <h2 className="text-h1 mb-4 md:mb-6">Da zero a Product Manager</h2>
          <p className="text-body text-[#2D2D2D] max-w-[700px] mx-auto">
            La maggior parte dei PM arriva dalla consulenza. Io ho fatto design, sviluppo, imprenditoria. 
            <strong className="text-[#0D7EFF]"> Questo è il mio superpotere.</strong>
          </p>
        </div>

        {/* Timeline - Mobile First, Vertical */}
        <div className="relative">
          {/* Connecting Line - Mobile: Left aligned, Desktop: Center */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#7209B7] via-[#FFD60A] via-[#FF006E] to-[#0D7EFF] md:-translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-12 md:space-y-20">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={milestone.id} className="relative">
                  {/* Dot Indicator */}
                  <div 
                    className={`
                      absolute left-0 md:left-1/2 top-8 md:-translate-x-1/2
                      rounded-full border-4 border-[#000] z-10 flex items-center justify-center
                      ${milestone.isCurrent 
                        ? 'w-12 h-12 bg-[#0D7EFF] shadow-[0_0_0_8px_rgba(13,126,255,0.2)]' 
                        : 'w-10 h-10 bg-white'
                      }
                    `} 
                  >
                    <Icon className={`w-5 h-5 ${milestone.isCurrent ? 'text-white' : 'text-[#0A0A0A]'}`} />
                  </div>

                  {/* Content Card - Mobile: Full width with left padding, Desktop: Half width */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <div className={`
                      bg-[#FFFCF2] border-4 border-[#000] rounded-lg shadow-brutal p-5 md:p-6
                      transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg
                      ${milestone.isCurrent ? 'bg-gradient-to-br from-[#0D7EFF]/5 to-transparent' : ''}
                    `}>
                      {/* Date & Role */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span
                          className="inline-block px-3 py-1 bg-white border-2 border-[#000] rounded shadow-brutal-sm"
                          style={{
                            fontFamily: 'Space Mono, monospace',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          {milestone.date}
                        </span>
                        <NeoBadge color={milestone.roleColor} className="px-3 py-1 text-xs">
                          {milestone.role}
                        </NeoBadge>
                        {milestone.isCurrent && (
                          <NeoBadge color="neutral" className="px-3 py-1 text-xs">
                            Oggi
                          </NeoBadge>
                        )}
                      </div>

                      {/* Company */}
                      <h3 className="text-h3 mb-3 text-[#0A0A0A]">
                        {milestone.company}
                      </h3>

                      {/* Description */}
                      <p className="text-body-small md:text-body text-[#2D2D2D] mb-4">
                        {milestone.description}
                      </p>

                      {/* Achievements */}
                      {milestone.achievements.length > 0 && (
                        <ul className="mb-4 space-y-1.5">
                          {milestone.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-body-small text-[#2D2D2D]">
                              <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: milestone.roleColor === 'blue' ? '#0D7EFF' : milestone.roleColor === 'pink' ? '#FF006E' : milestone.roleColor === 'yellow' ? '#FFD60A' : '#7209B7' }} />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Skills */}
                      <div className="mb-3">
                        <p className="text-xs font-bold mb-2 text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>SKILLS:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {milestone.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-white border-2 border-[#000] rounded-sm text-xs"
                              style={{
                                fontFamily: 'Space Mono, monospace',
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Certifications */}
                      {milestone.certifications && milestone.certifications.length > 0 && (
                        <div>
                          <p className="text-xs font-bold mb-2 text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>CERTIFICAZIONI:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {milestone.certifications.map((cert, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 border-2 border-[#000] rounded-sm text-xs flex items-center gap-1"
                                style={{
                                  fontFamily: 'Space Mono, monospace',
                                  backgroundColor: milestone.roleColor === 'blue' ? '#0D7EFF' : milestone.roleColor === 'pink' ? '#FF006E' : milestone.roleColor === 'yellow' ? '#FFD60A' : '#7209B7',
                                  color: milestone.roleColor === 'yellow' ? '#0A0A0A' : '#FFF'
                                }}
                              >
                                <Award className="w-3 h-3" />
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* End Message */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-[#0D7EFF] border-4 border-[#000] rounded-lg shadow-brutal px-6 py-4 rotate-1">
            <p className="text-body text-white" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
              12 anni di fallimenti trasformati in esperienza 💪
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}