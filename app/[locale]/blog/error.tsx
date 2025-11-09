'use client';

import { useEffect } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Blog error:', error);
  }, [error]);

  return (
    <Section spacing="lg">
      <div className="brutal-container">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-6 p-6 bg-accent/10 border-brutal border-accent rounded-brutal">
            <AlertCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ops! Qualcosa è andato storto</h2>
            <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 mb-4">
              {error.message || 'Impossibile caricare gli articoli del blog'}
            </p>
            {error.digest && (
              <p className="text-sm text-brutalist-text-light/50 dark:text-brutalist-text-dark/50 font-mono">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={reset}
              className="flex items-center gap-2"
            >
              <RefreshCcw className="w-5 h-5" />
              Riprova
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/'}
            >
              Torna alla home
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
