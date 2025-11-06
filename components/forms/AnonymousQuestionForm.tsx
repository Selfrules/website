'use client';

import { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnonymousQuestionFormProps {
  locale: string;
}

export function AnonymousQuestionForm({ locale }: AnonymousQuestionFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const translations = {
    it: {
      title: 'Invia una domanda anonima',
      description: 'Troppo timido per chattare? Inviami una domanda anonima e ti risponderò sul blog.',
      namePlaceholder: 'Il tuo nome (opzionale)',
      emailPlaceholder: 'La tua email (opzionale, per notifiche)',
      questionPlaceholder: 'La tua domanda...',
      questionLabel: 'Domanda',
      submitButton: 'Invia domanda',
      submitting: 'Invio in corso...',
      successMessage: 'Domanda inviata! Ti risponderò presto sul blog.',
      errorMessage: 'Errore durante l\'invio. Riprova.',
      required: 'La domanda è obbligatoria',
      minLength: 'Almeno 10 caratteri',
    },
    en: {
      title: 'Submit an anonymous question',
      description: 'Too shy to chat? Send me an anonymous question and I\'ll answer it on the blog.',
      namePlaceholder: 'Your name (optional)',
      emailPlaceholder: 'Your email (optional, for notifications)',
      questionPlaceholder: 'Your question...',
      questionLabel: 'Question',
      submitButton: 'Submit question',
      submitting: 'Submitting...',
      successMessage: 'Question submitted! I\'ll answer it soon on the blog.',
      errorMessage: 'Error submitting. Please try again.',
      required: 'Question is required',
      minLength: 'At least 10 characters',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question.trim() || formData.question.length < 10) {
      setSubmitStatus('error');
      setErrorMessage(t.required + ' - ' + t.minLength);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim() || null,
          email: formData.email.trim() || null,
          question: formData.question.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit question');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', question: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting question:', error);
      setSubmitStatus('error');
      setErrorMessage(t.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-brutalist-bg-dark border-4 border-black dark:border-white
                   rounded-brutal shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#FFFFFF] p-6 lg:p-8">
      <h3 className="text-2xl font-heading font-black text-brutalist-text-light dark:text-brutalist-text-dark mb-2">
        {t.title}
      </h3>
      <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 mb-6">
        {t.description}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name (Optional) */}
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t.namePlaceholder}
            className={cn(
              'w-full px-4 py-3 rounded-lg',
              'border-3 border-black dark:border-white',
              'bg-white dark:bg-brutalist-bg-dark',
              'text-brutalist-text-light dark:text-brutalist-text-dark',
              'placeholder:text-brutalist-text-light/40 dark:placeholder:text-brutalist-text-dark/40',
              'focus:outline-none focus:ring-4 focus:ring-purple-primary/30',
              'transition-shadow'
            )}
            maxLength={100}
          />
        </div>

        {/* Email (Optional) */}
        <div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t.emailPlaceholder}
            className={cn(
              'w-full px-4 py-3 rounded-lg',
              'border-3 border-black dark:border-white',
              'bg-white dark:bg-brutalist-bg-dark',
              'text-brutalist-text-light dark:text-brutalist-text-dark',
              'placeholder:text-brutalist-text-light/40 dark:placeholder:text-brutalist-text-dark/40',
              'focus:outline-none focus:ring-4 focus:ring-purple-primary/30',
              'transition-shadow'
            )}
            maxLength={255}
          />
        </div>

        {/* Question (Required) */}
        <div>
          <label className="block text-sm font-bold text-brutalist-text-light dark:text-brutalist-text-dark mb-2">
            {t.questionLabel} *
          </label>
          <textarea
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            placeholder={t.questionPlaceholder}
            rows={5}
            required
            minLength={10}
            maxLength={1000}
            className={cn(
              'w-full px-4 py-3 rounded-lg',
              'border-3 border-black dark:border-white',
              'bg-white dark:bg-brutalist-bg-dark',
              'text-brutalist-text-light dark:text-brutalist-text-dark',
              'placeholder:text-brutalist-text-light/40 dark:placeholder:text-brutalist-text-dark/40',
              'focus:outline-none focus:ring-4 focus:ring-purple-primary/30',
              'transition-shadow resize-none'
            )}
          />
          <p className="text-xs text-brutalist-text-light/50 dark:text-brutalist-text-dark/50 mt-1">
            {formData.question.length}/1000 characters
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-green-100 dark:bg-green-900/30 border-3 border-green-500 rounded-lg"
          >
            <Check className="w-5 h-5 text-green-700 dark:text-green-400 flex-shrink-0" />
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              {t.successMessage}
            </p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-red-100 dark:bg-red-900/30 border-3 border-red-500 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-700 dark:text-red-400 flex-shrink-0" />
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              {errorMessage}
            </p>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !formData.question.trim()}
          className={cn(
            'w-full px-6 py-4 rounded-lg',
            'bg-purple-primary text-white font-bold',
            'border-4 border-black dark:border-white',
            'shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#FFFFFF]',
            'transition-all',
            'hover:shadow-[4px_4px_0px_#000000] dark:hover:shadow-[4px_4px_0px_#FFFFFF]',
            'hover:translate-x-[4px] hover:translate-y-[4px]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'disabled:hover:shadow-[8px_8px_0px_#000000] dark:disabled:hover:shadow-[8px_8px_0px_#FFFFFF]',
            'disabled:hover:translate-x-0 disabled:hover:translate-y-0',
            'flex items-center justify-center gap-2'
          )}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
              />
              {t.submitting}
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              {t.submitButton}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
