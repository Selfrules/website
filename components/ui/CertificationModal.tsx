'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, Building, ExternalLink, Shield, FileText } from 'lucide-react';
import { CertificationData } from './CertificationBadge';

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification: CertificationData | null;
}

/**
 * CertificationModal component with neobrutalist design system styling
 *
 * @component
 * @category UI
 */
export default function CertificationModal({
  isOpen,
  onClose,
  certification,
}: CertificationModalProps) {
  if (!certification) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-brutalist-surface-dark border-brutal-thick border-black rounded-brutal shadow-brutal-hover"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-brutalist-text-light/10 dark:hover:bg-brutalist-text-dark/10 rounded-brutal transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="p-8">
                {/* Header with icon */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 bg-primary/20 border-4 border-primary rounded-brutal">
                    {certification.icon || <Award className="w-8 h-8 text-primary" />}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-3xl font-heading font-black mb-2">
                      {certification.title}
                    </h2>
                    <p className="text-lg text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
                      {certification.tagline}
                    </p>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {/* Issuer */}
                  <div className="p-4 bg-brutalist-text-light/5 dark:bg-brutalist-text-dark/5 rounded-brutal border-2 border-brutalist-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                        Issuer
                      </span>
                    </div>
                    <p className="font-bold">{certification.issuer}</p>
                  </div>

                  {/* Date */}
                  <div className="p-4 bg-brutalist-text-light/5 dark:bg-brutalist-text-dark/5 rounded-brutal border-2 border-brutalist-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                        Issued
                      </span>
                    </div>
                    <p className="font-bold">{certification.date}</p>
                  </div>

                  {/* Credential ID (if available) */}
                  {certification.credentialId && (
                    <div className="md:col-span-2 p-4 bg-brutalist-text-light/5 dark:bg-brutalist-text-dark/5 rounded-brutal border-2 border-brutalist-border">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                          Credential ID
                        </span>
                      </div>
                      <p className="font-mono text-sm break-all">
                        {certification.credentialId}
                      </p>
                    </div>
                  )}
                </div>

                {/* Certificate image placeholder */}
                <div className="mb-6 aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-brutal border-4 border-brutalist-border flex items-center justify-center">
                  <div className="text-center p-8">
                    <Award className="w-16 h-16 text-brutalist-text-light/20 dark:text-brutalist-text-dark/20 mx-auto mb-4" />
                    <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                      Certificate image placeholder
                    </p>
                  </div>
                </div>

                {/* Optional external link */}
                {certification.verificationUrl && (
                  <a
                    href={certification.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary text-black font-bold border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
