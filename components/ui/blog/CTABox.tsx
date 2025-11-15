import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * @component CTABox
 * @category Blog Components
 * @description CTA box per call-to-action con gradiente e bottone
 */

export interface CTABoxProps {
  /** Titolo del CTA */
  title: string;
  /** Descrizione (opzionale) */
  description?: string;
  /** Testo del bottone */
  buttonText: string;
  /** URL del bottone */
  buttonHref?: string;
  /** Callback onClick (alternativa a href) */
  onClick?: () => void;
  /** Variante gradiente */
  variant?: 'brand' | 'blog-hero' | 'blue' | 'purple' | 'pink';
  /** Mostra icona sparkles */
  showIcon?: boolean;
  className?: string;
}

const variantMap = {
  brand: 'bg-gradient-brand',
  'blog-hero': 'bg-gradient-blog-hero',
  blue: 'bg-electric-blue',
  purple: 'bg-deep-purple',
  pink: 'bg-neon-pink',
};

export const CTABox = React.forwardRef<HTMLDivElement, CTABoxProps>(
  (
    {
      title,
      description,
      buttonText,
      buttonHref,
      onClick,
      variant = 'brand',
      showIcon = true,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'border-brutal border-black rounded-brutal shadow-brutal p-brutal-xl text-center',
          variantMap[variant],
          className
        )}
      >
        {/* Icon */}
        {showIcon && (
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-brutal border-brutal-thin border-white/40 mb-brutal-md">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-h2 font-heading font-black text-white mb-brutal-sm">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-body text-white/90 mb-brutal-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {/* CTA Button */}
        {buttonHref ? (
          <a href={buttonHref}>
            <Button variant="accent" size="lg" className="uppercase shadow-brutal">
              {buttonText}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        ) : (
          <Button variant="accent" size="lg" onClick={onClick} className="uppercase shadow-brutal">
            {buttonText}
            <ArrowRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    );
  }
);

CTABox.displayName = 'CTABox';
