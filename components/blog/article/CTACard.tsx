'use client';

import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface CTACardProps {
  title: string;
  description: string;
  ctaText: string;
  onAction?: () => void;
  variant?: 'teal' | 'purple' | 'blue' | 'gradient';
  className?: string;
}

const variantStyles = {
  teal: 'bg-[#2A687A]',
  purple: 'bg-[#7209B7]',
  blue: 'bg-[#0D7EFF]',
  gradient: 'bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E]',
};

export default function CTACard({
  title,
  description,
  ctaText,
  onAction,
  variant = 'gradient',
  className = '',
}: CTACardProps) {
  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      // Default behavior: scroll to contact section
      const contactSection = document.getElementById('ask-me');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Card className={`my-12 ${variantStyles[variant]} border-brutal-thick -rotate-1 ${className}`}>
      <CardContent className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Icon */}
          <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-white border-brutal border-black rounded-brutal shadow-brutal flex items-center justify-center">
            <Calendar className="w-8 h-8 md:w-10 md:h-10 text-[#0A0A0A]" strokeWidth={2.5} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-heading font-bold text-h4 md:text-h3 text-white mb-3">
              {title}
            </h3>
            <p className="text-body text-white/90 mb-6 max-w-[600px]">
              {description}
            </p>

            {/* CTA Button */}
            <Button
              onClick={handleAction}
              className="bg-white text-[#0A0A0A] border-brutal border-black shadow-brutal hover:shadow-brutal-hover hover:translate-x-[-4px] hover:translate-y-[-4px] active:shadow-brutal-active active:translate-x-[4px] active:translate-y-[4px] min-h-[48px] px-6 md:px-8"
              aria-label={ctaText}
            >
              {ctaText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
