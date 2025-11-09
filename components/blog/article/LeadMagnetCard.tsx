'use client';

import React from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface LeadMagnetCardProps {
  title: string;
  description: string;
  benefits: string[];
  ctaText: string;
  onDownload?: () => void;
  className?: string;
}

export default function LeadMagnetCard({
  title,
  description,
  benefits,
  ctaText,
  onDownload,
  className = '',
}: LeadMagnetCardProps) {
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      // Default behavior: scroll to contact form or open modal
      const contactSection = document.getElementById('ask-me');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Card className={`my-12 bg-[#2A687A] border-brutal-thick ${className}`}>
      <CardContent className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Icon */}
          <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-[#FFD60A] border-brutal border-black rounded-brutal shadow-brutal flex items-center justify-center">
            <Download className="w-8 h-8 md:w-10 md:h-10 text-[#0A0A0A]" strokeWidth={2.5} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-heading font-bold text-h4 md:text-h3 text-white mb-3">
              {title}
            </h3>
            <p className="text-body text-white/90 mb-4 max-w-[600px]">
              {description}
            </p>

            {/* Benefits List */}
            <ul className="space-y-2 mb-6">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FFD60A] flex-shrink-0 mt-0.5" />
                  <span className="text-body-sm text-white/95">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button
              onClick={handleDownload}
              className="bg-white text-[#0A0A0A] border-brutal border-black shadow-brutal hover:shadow-brutal-hover hover:translate-x-[-4px] hover:translate-y-[-4px] active:shadow-brutal-active active:translate-x-[4px] active:translate-y-[4px] min-h-[48px] px-6 md:px-8"
              aria-label={ctaText}
            >
              <Download className="w-5 h-5 mr-2" />
              {ctaText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
