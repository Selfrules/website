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
    question: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const translations = {
    it: {
      questionPlaceholder: 'La tua domanda *',
      submitButton: 'Invia domanda',
      submitting: 'Invio in corso...',
      successMessage: 'Domanda inviata! Ti risponderò presto sul blog.',
      errorMessage: 'Errore durante l\'invio. Riprova.',
      required: 'La domanda è obbligatoria',
      minLength: 'Almeno 10 caratteri',
    },
    en: {
      questionPlaceholder: 'Your question *',
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
          question: formData.question.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit question');
      }

      setSubmitStatus('success');
      setFormData({ question: '' });

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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <textarea
          placeholder={t.questionPlaceholder}
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          required
          rows={4}
          className="w-full px-4 py-3 bg-[#0A0A0A] text-white border-3 border-[#2D2D2D] rounded placeholder:text-[#6B7280] focus:border-[#FF006E] focus:outline-none transition-all resize-none"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !formData.question.trim()}
        className="w-full px-6 py-3 md:py-4 bg-[#FF006E] text-white border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '14px',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        {isSubmitting ? t.submitting : t.submitButton}
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
