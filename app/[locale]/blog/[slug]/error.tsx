'use client';

import { useEffect } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { FileQuestion, RefreshCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Blog post error:', error);
  }, [error]);

  const isNotFound = error.message?.includes('404') || error.message?.includes('not found');

  return (
    <Section spacing="lg">
      <div className="brutal-container max-w-2xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-6 p-8 bg-accent/10 border-brutal border-accent rounded-brutal">
            <FileQuestion className="w-20 h-20 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">
              {isNotFound ? 'Articolo non trovato' : 'Errore nel caricamento'}
            </h2>
            <p className="text-lg text-brutalist-text-light/70 mb-4">
              {isNotFound
                ? "L'articolo che stai cercando non esiste o è stato rimosso."
                : error.message || 'Si è verificato un problema nel caricamento dell\'articolo'}
            </p>
            {error.digest && (
              <p className="text-sm text-brutalist-text-light/50 font-mono">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {!isNotFound && (
              <Button
                variant="primary"
                size="lg"
                onClick={reset}
                className="flex items-center gap-2"
              >
                <RefreshCcw className="w-5 h-5" />
                Riprova
              </Button>
            )}
            <Link href="/blog">
              <Button
                variant={isNotFound ? 'primary' : 'outline'}
                size="lg"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Torna al blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
