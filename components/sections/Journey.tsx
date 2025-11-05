'use client';

import { Timeline, TimelineItem } from '@/components/ui/Timeline';
import { Badge } from '@/components/ui/Badge';
import { ScrollAnimation } from '@/components/animations/ScrollAnimations';
import GridPattern from '@/components/patterns/GridPattern';
import { Briefcase, Rocket, Code, Lightbulb, Target, TrendingUp } from 'lucide-react';

interface JourneyData {
  id: string;
  date: string;
  company: string;
  role: string;
  description: string;
  achievements: string[];
  technologies: string[];
  highlight?: boolean;
  icon?: React.ReactNode;
  metrics?: {
    impact: string;
    value: string;
  };
}

const journeyData: JourneyData[] = [
  {
    id: '4',
    date: '2023-oggi',
    company: 'QubicaAMF',
    role: 'Product Manager',
    description: 'Unifico tutto quello che ho imparato per costruire cose che contano.',
    achievements: [
      '-12% tempi di pagamento (non magia, solo meno click inutili)',
      '+9% adoption integrazioni (meno PDF, più video di 3 minuti)',
      '-25% incidenti post-release (mettere Product, Support ed Engineering nella stessa stanza ogni venerdì)',
    ],
    technologies: ['Product Strategy', 'API Design', 'User Research', 'Business Case'],
    highlight: true,
    icon: <Rocket className="w-5 h-5" />,
    metrics: {
      impact: 'Tempi pagamento',
      value: '-12%',
    },
  },
  {
    id: '3',
    date: '2021-2023',
    company: 'ActiveProspect',
    role: 'Product Owner',
    description: 'Facevo da ponte tra business e tech. Traducevo esigenze in funzionalità.',
    achievements: [
      'Il vero lavoro del Product non è dire "sì" a tutto, ma dire "no" alle cose giuste',
      'Una roadmap bella non serve a niente se non è allineata al business',
      'Il feedback degli utenti conta più di qualsiasi opinion di un stakeholder interno',
    ],
    technologies: ['Roadmapping', 'Stakeholder Management', 'User Feedback', 'Prioritization'],
    icon: <Target className="w-5 h-5" />,
    metrics: {
      impact: 'Skill acquisita',
      value: '3 lingue',
    },
  },
  {
    id: '2',
    date: '2016-2020',
    company: 'FLOWING',
    role: 'Full-stack Developer',
    description: 'Scrivevo codice. Costruivo API. Pensavo che la tecnica risolvesse tutto.',
    achievements: [
      'Ho ottimizzato un algoritmo per 10ms più veloce, mentre nessuno capiva come usare la feature',
      'Ho scritto il codice più elegante della mia carriera per un prodotto morto dopo 4 mesi',
      'Il momento di svolta: "Ma questo a cosa serve davvero?" - Non seppi rispondere',
    ],
    technologies: ['JavaScript', 'API Development', 'Backend', 'Frontend'],
    icon: <Code className="w-5 h-5" />,
  },
  {
    id: '1',
    date: '2012-2018',
    company: 'Selfrules',
    role: 'Designer & Business Owner',
    description: 'Disegnavo siti web. Gestivo clienti. Pensavo di sapere tutto.',
    achievements: [
      'Design bellissimo che nessuno capisce come usare è solo arte, non prodotto',
      'Mockup perfetto che non si può sviluppare è tempo sprecato',
      'Il fallimento: 3 settimane su un design tecnicamente impossibile nel budget',
    ],
    technologies: ['Design', 'Business', 'Client Management', 'Web Design'],
    icon: <Lightbulb className="w-5 h-5" />,
  },
];

export default function Journey() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white to-primary/5 dark:from-brutalist-bg-dark dark:to-primary/10">
      {/* Background Pattern */}
      <GridPattern
        variant="grid"
        className="absolute inset-0"
        opacity={0.03}
        size="lg"
      />

      <div className="brutal-container relative z-10">
        {/* Section Header */}
        <ScrollAnimation animation="fadeInUp">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10
                         border-4 border-secondary rounded-brutal text-secondary
                         font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Il mio percorso</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-display-2 font-heading font-black mb-4">
              Il percorso
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ml-3">
                al contrario
              </span>
            </h2>
            <p className="text-xl text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 max-w-2xl mx-auto">
              La maggior parte dei PM studiano product management. Io ho fatto il percorso lungo: design, codice, e solo alla fine product. È stato scomodo, faticoso, pieno di errori. Ed è esattamente per questo che oggi so davvero cosa sto facendo.
            </p>
          </div>
        </ScrollAnimation>

        {/* Timeline */}
        <Timeline orientation="vertical" animated>
          {journeyData.map((item, index) => (
            <TimelineItem
              key={item.id}
              date={item.date}
              title={item.role}
              icon={item.icon}
              variant={item.highlight ? 'primary' : 'default'}
              active={item.highlight}
              animated={true}
              delay={index * 0.1}
            >
              <div className="space-y-4">
                {/* Company */}
                <div className="text-lg font-bold text-secondary">
                  {item.company}
                </div>

                {/* Description */}
                <p className="text-brutalist-text-light/80 dark:text-brutalist-text-dark/80">
                  {item.description}
                </p>

                {/* Metrics */}
                {item.metrics && (
                  <div className="flex items-center gap-4 p-3 bg-primary/10 rounded-brutal border-2 border-primary">
                    <div className="text-2xl font-bold text-primary">
                      {item.metrics.value}
                    </div>
                    <div className="text-sm text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
                      {item.metrics.impact}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                <ul className="space-y-2">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant={item.highlight ? 'primary' : 'outline'}
                      size="sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </TimelineItem>
          ))}
        </Timeline>

        {/* Call to Action */}
        <ScrollAnimation animation="fadeInUp" delay={0.5}>
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center gap-4 p-8 bg-white dark:bg-brutalist-surface-dark
                         border-brutal border-black rounded-brutal shadow-brutal">
              <h3 className="text-2xl font-bold">
                Pronto per il prossimo capitolo?
              </h3>
              <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
                Costruiamo qualcosa di straordinario insieme.
              </p>
              <button className="px-8 py-3 bg-primary text-brutalist-text-light font-bold
                               border-brutal border-black rounded-brutal shadow-brutal
                               hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1
                               transition-all">
                Parliamone →
              </button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}