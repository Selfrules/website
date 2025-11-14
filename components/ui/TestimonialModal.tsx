'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Quote, CheckCircle, Building, User, Briefcase } from 'lucide-react';
import { TestimonialData } from './Testimonial';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: TestimonialData | null;
}

/**
 * TestimonialModal component with neobrutalist design system styling
 *
 * @component
 * @category UI
 */
export default function TestimonialModal({
  isOpen,
  onClose,
  testimonial,
}: TestimonialModalProps) {
  if (!testimonial) return null;

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
                className="absolute top-4 right-4 p-2 hover:bg-brutalist-text-light/10 dark:hover:bg-brutalist-text-dark/10 rounded-brutal transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="p-8">
                {/* Header with quote icon */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 bg-primary/20 border-4 border-primary rounded-brutal flex-shrink-0">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>

                  {testimonial.verified && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white border-2 border-black rounded-brutal text-sm font-bold">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified Testimonial</span>
                    </div>
                  )}
                </div>

                {/* Full quote */}
                <blockquote className="mb-8">
                  <p className="text-xl md:text-2xl text-brutalist-text-light/90 dark:text-brutalist-text-dark/90 leading-relaxed font-medium">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </blockquote>

                {/* Author details */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Name */}
                  <div className="p-4 bg-brutalist-text-light/5 dark:bg-brutalist-text-dark/5 rounded-brutal border-2 border-brutalist-border">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                        Name
                      </span>
                    </div>
                    <p className="font-bold text-lg">{testimonial.author}</p>
                  </div>

                  {/* Role */}
                  <div className="p-4 bg-brutalist-text-light/5 dark:bg-brutalist-text-dark/5 rounded-brutal border-2 border-brutalist-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                        Role
                      </span>
                    </div>
                    <p className="font-bold">{testimonial.role}</p>
                  </div>

                  {/* Company */}
                  <div className="p-4 bg-brutalist-text-light/5 dark:bg-brutalist-text-dark/5 rounded-brutal border-2 border-brutalist-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                        Company
                      </span>
                    </div>
                    <p className="font-bold text-primary">{testimonial.company}</p>
                  </div>
                </div>

                {/* Optional context section */}
                <div className="mt-6 p-4 bg-primary/10 border-2 border-primary rounded-brutal">
                  <p className="text-sm text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
                    This testimonial represents real feedback from a professional collaboration.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
