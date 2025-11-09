'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Mail, Link as LinkIcon, Check } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

interface ShareButtonsProps {
  title: string;
  excerpt: string;
  url: string;
  className?: string;
}

export default function ShareButtons({
  title,
  excerpt,
  url,
  className = '',
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${excerpt}\n\n${url}`)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareButtons = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: shareUrls.twitter,
      color: 'hover:bg-[#1DA1F2]',
      ariaLabel: 'Share on Twitter',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: shareUrls.linkedin,
      color: 'hover:bg-[#0A66C2]',
      ariaLabel: 'Share on LinkedIn',
    },
    {
      name: 'Email',
      icon: Mail,
      url: shareUrls.email,
      color: 'hover:bg-accent',
      ariaLabel: 'Share via Email',
    },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={`flex items-center gap-3 ${className}`}
    >
      <span className="font-heading font-bold text-sm text-brutalist-text-light dark:text-brutalist-text-dark">
        Share:
      </span>

      {/* Social Share Buttons */}
      {shareButtons.map((button) => {
        const Icon = button.icon;
        return (
          <a
            key={button.name}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 bg-white dark:bg-gray-900 border-2 border-black rounded-brutal-sm shadow-brutal-xs ${button.color} hover:text-white transition-all group`}
            aria-label={button.ariaLabel}
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}

      {/* Copy Link Button */}
      <button
        onClick={copyToClipboard}
        className="p-2 bg-white dark:bg-gray-900 border-2 border-black rounded-brutal-sm shadow-brutal-xs hover:bg-primary hover:text-black transition-all group relative"
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <LinkIcon className="w-4 h-4" />
        )}

        {/* Tooltip */}
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap"
          >
            Copied!
          </motion.span>
        )}
      </button>
    </motion.div>
  );
}
