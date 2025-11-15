'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CertificationBadge, { CertificationData } from '@/components/ui/CertificationBadge';
import CertificationModal from '@/components/ui/CertificationModal';
import { cn } from '@/lib/utils';

interface CertificationsSectionProps {
  certifications: CertificationData[];
  title: string;
  subtitle: string;
  animated?: boolean;
  delay?: number;
  className?: string;
}

export default function CertificationsSection({
  certifications,
  title,
  subtitle,
  animated = true,
  delay = 0,
  className = '',
}: CertificationsSectionProps) {
  const [selectedCertification, setSelectedCertification] = useState<CertificationData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const handleCertificationClick = (cert: CertificationData) => {
    setSelectedCertification(cert);
    setIsModalOpen(true);
  };

  // Desktop version: Grid of certification cards
  const DesktopView = () => (
    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {certifications.map((cert, index) => (
        <CertificationBadge
          key={cert.id}
          certification={cert}
          onClick={() => handleCertificationClick(cert)}
          animated={animated}
          delay={delay + index * 0.1}
        />
      ))}
    </div>
  );

  // Mobile version: Single expandable card
  const MobileView = () => (
    <div className="md:hidden">
      <button
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        className="w-full brutal-card p-4"
        aria-expanded={isMobileExpanded}
        aria-controls="certifications-list"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-left">View All Certifications</h3>
            <p className="text-sm text-brutalist-text-light/70 text-left">
              {certifications.length} certifications
            </p>
          </div>

          <motion.div
            animate={{ rotate: isMobileExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isMobileExpanded && (
            <motion.div
              id="certifications-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t-4 border-brutalist-border space-y-3">
                {certifications.map((cert, index) => (
                  <div
                    key={cert.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCertificationClick(cert);
                    }}
                    className="p-3 bg-white border-2 border-black rounded-md hover:shadow-brutal transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary text-white border-2 border-black rounded-md flex-shrink-0">
                        {cert.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold mb-1">{cert.title}</h4>
                        <p className="text-xs text-brutalist-text-light/70 mb-1">
                          {cert.tagline}
                        </p>
                        <div className="flex items-center justify-between text-xs text-brutalist-text-light/60">
                          <span className="font-bold">{cert.issuer}</span>
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );

  return (
    <div className={className}>
      {/* Section header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-heading font-black mb-2">{title}</h2>
        <p className="text-lg text-brutalist-text-light/70">
          {subtitle}
        </p>
      </div>

      {/* Render desktop or mobile version */}
      <DesktopView />
      <MobileView />

      {/* Certification Modal */}
      <CertificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        certification={selectedCertification}
      />
    </div>
  );
}
