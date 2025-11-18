'use client';

import { useTranslations } from 'next-intl';
import { Calendar, Mail, FileText, Download, ArrowRight } from 'lucide-react';
import { NeoButton } from '@/components/ui/NeoButton';

type CTAVariant = 'consultation' | 'newsletter' | 'related' | 'download';

interface InArticleCTAProps {
  variant: CTAVariant;
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * InArticleCTA - Strategic call-to-action blocks within blog articles
 * @component
 * @category Blog Components
 *
 * @example
 * ```tsx
 * <InArticleCTA
 *   variant="consultation"
 *   title="Want to implement similar strategies?"
 *   description="Book a personalized session to discuss your project"
 *   buttonText="Book Now"
 *   href="/contact"
 * />
 * ```
 */
export default function InArticleCTA({
  variant,
  title,
  description,
  buttonText,
  href,
  onClick,
  className = '',
}: InArticleCTAProps) {
  const t = useTranslations('blog.article.cta');

  // Variant configurations (aligned with design system)
  const variantConfig = {
    consultation: {
      icon: Calendar,
      bg: 'bg-gradient-to-r from-electric-blue to-deep-purple',
      text: 'text-white',
      defaultTitle: t('consultation.title'),
      defaultDescription: t('consultation.description'),
      defaultButton: t('consultation.button'),
      defaultHref: '/it#ask-me',
    },
    newsletter: {
      icon: Mail,
      bg: 'bg-gradient-to-r from-teal to-electric-blue',
      text: 'text-white',
      defaultTitle: t('newsletter.title'),
      defaultDescription: t('newsletter.description'),
      defaultButton: t('newsletter.button'),
      defaultHref: '#newsletter-signup',
    },
    related: {
      icon: FileText,
      bg: 'bg-neon-pink',
      text: 'text-white',
      defaultTitle: t('related.title'),
      defaultDescription: t('related.description'),
      defaultButton: t('related.button'),
      defaultHref: '/it/blog',
    },
    download: {
      icon: Download,
      bg: 'bg-cyber-yellow',
      text: 'text-brutalist-text-primary',
      defaultTitle: t('download.title'),
      defaultDescription: t('download.description'),
      defaultButton: t('download.button'),
      defaultHref: '#',
    },
  };

  const config = variantConfig[variant];
  const Icon = config.icon;

  const ctaTitle = title || config.defaultTitle;
  const ctaDescription = description || config.defaultDescription;
  const ctaButton = buttonText || config.defaultButton;
  const ctaHref = href || config.defaultHref;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <aside
      className={`my-12 md:my-16 inline-block w-full max-w-[700px] ${config.bg} ${config.text} border-4 border-black rounded-lg shadow-brutal p-6 md:p-8 -rotate-1 hover:rotate-0 transition-transform ${className}`}
      role="complementary"
      aria-label={`Call to action: ${ctaTitle}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-white border-4 border-black rounded-lg shadow-brutal flex items-center justify-center">
          <Icon className="w-6 h-6 text-brutalist-text-primary" strokeWidth={2.5} />
        </div>

        <div className="flex-1">
          <h3 className="text-h3 md:text-h2 mb-2 font-heading font-bold leading-tight">
            {ctaTitle}
          </h3>
          <p className="text-body opacity-90 mb-6 font-heading leading-relaxed">
            {ctaDescription}
          </p>
          <a href={ctaHref} onClick={handleClick} className="inline-block">
            <NeoButton
              variant="accent"
              size="lg"
              className="shadow-brutal-lg hover:shadow-brutal"
            >
              {ctaButton}
              <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2.5} />
            </NeoButton>
          </a>
        </div>
      </div>
    </aside>
  );
}
