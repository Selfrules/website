'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Link2, Facebook, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  variant?: 'sidebar' | 'inline' | 'footer';
  platforms?: ('twitter' | 'linkedin' | 'facebook' | 'email' | 'copy')[];
}

/**
 * SocialShareButtons - Social media share buttons with copy-to-clipboard
 * @component
 * @category Blog Components
 *
 * @example
 * ```tsx
 * <SocialShareButtons
 *   url="https://example.com/article"
 *   title="Article Title"
 *   variant="sidebar"
 *   platforms={['twitter', 'linkedin', 'copy']}
 * />
 * ```
 */
export default function SocialShareButtons({
  url,
  title,
  variant = 'sidebar',
  platforms = ['twitter', 'linkedin', 'copy'],
}: SocialShareButtonsProps) {
  const t = useTranslations('blog.article');
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
  };

  const platformConfig = {
    twitter: {
      icon: Twitter,
      label: 'Twitter',
      color: 'bg-electric-blue hover:bg-electric-blue/90',
    },
    linkedin: {
      icon: Linkedin,
      label: 'LinkedIn',
      color: 'bg-electric-blue hover:bg-electric-blue/90',
    },
    facebook: {
      icon: Facebook,
      label: 'Facebook',
      color: 'bg-electric-blue hover:bg-electric-blue/90',
    },
    email: {
      icon: Mail,
      label: 'Email',
      color: 'bg-brutalist-text-secondary hover:bg-brutalist-text-secondary/90',
    },
    copy: {
      icon: Link2,
      label: copied ? t('share.copied') : t('share.copy'),
      color: '',
    },
  };

  const content = (
    <>
      <h4 className="text-body-small font-heading font-bold mb-3 text-brutalist-text-primary">
        = {t('share.title')}
      </h4>
      <div className={`flex ${variant === 'footer' ? 'flex-row flex-wrap' : 'flex-col'} gap-2`}>
        {platforms.map((platform) => {
          const config = platformConfig[platform];
          const Icon = config.icon;

          if (platform === 'copy') {
            return (
              <Button
                key={platform}
                onClick={() => handleShare(platform)}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                <Icon className="w-4 h-4" />
                {variant !== 'sidebar' && config.label}
              </Button>
            );
          }

          return (
            <Button
              key={platform}
              onClick={() => handleShare(platform)}
              variant="primary"
              size="sm"
              className={`${config.color} justify-start`}
            >
              <Icon className="w-4 h-4" />
              {variant !== 'sidebar' && config.label}
            </Button>
          );
        })}
      </div>
    </>
  );

  if (variant === 'sidebar') {
    return (
      <Card>
        <CardContent className="p-brutal-md">{content}</CardContent>
      </Card>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="border-brutal border-black rounded-brutal shadow-brutal bg-white p-brutal-md">
        {content}
      </div>
    );
  }

  // inline variant
  return <div className="my-8">{content}</div>;
}
