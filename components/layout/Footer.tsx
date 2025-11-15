'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Heart, ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mattiafilippodeluca',
      icon: Linkedin,
      borderColor: 'border-electric-blue',
      iconColor: 'text-electric-blue',
      hoverBg: 'hover:bg-electric-blue',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/mattiafdl',
      icon: Twitter,
      borderColor: 'border-neon-pink',
      iconColor: 'text-neon-pink',
      hoverBg: 'hover:bg-neon-pink',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/mattiafilippodeluca',
      icon: Github,
      borderColor: 'border-deep-purple',
      iconColor: 'text-deep-purple',
      hoverBg: 'hover:bg-deep-purple',
    },
    {
      name: 'Email',
      href: 'mailto:hello@mattiafdl.com',
      icon: Mail,
      borderColor: 'border-cyber-yellow',
      iconColor: 'text-cyber-yellow',
      hoverBg: 'hover:bg-cyber-yellow',
      hoverIconColor: 'group-hover:text-dark',
    },
  ];

  const quickLinks = [
    { name: nav('home'), href: `/${locale}` },
    { name: nav('blog'), href: `/${locale}/blog` },
    { name: nav('work'), href: `/${locale}#work-together` },
    { name: nav('about'), href: `/${locale}#journey` },
  ];

  const resources = [
    { name: t('resources.tools'), href: '#' },
    { name: t('resources.design'), href: '#' },
    { name: t('resources.stack'), href: '#' },
    { name: t('resources.newsletter'), href: '#' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white border-t-brutal border-cyber-yellow relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-electric-blue opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-neon-pink opacity-10 rotate-45 translate-x-1/3 translate-y-1/3" />

      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 py-12 md:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">

          {/* Brand & Bio */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl md:text-3xl mb-4 font-heading font-black">
              <span className="text-electric-blue">Mattia Filippo</span>{' '}
              <span className="text-neon-pink">De Luca</span>
            </h3>
            <p className="text-white/80 text-sm md:text-base mb-2 max-w-md leading-relaxed">
              {t('bio')}
            </p>
            <p className="text-white/60 text-xs md:text-sm mb-6">
              {t('location')}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 md:w-12 md:h-12 bg-surface-dark border-brutal-thin ${social.borderColor} rounded-brutal flex items-center justify-center ${social.hoverBg} hover:-translate-y-1 transition-all group`}
                    aria-label={social.name}
                  >
                    <Icon className={`w-5 h-5 ${social.iconColor} ${social.name === 'Email' ? 'group-hover:text-dark' : 'group-hover:text-white'} transition-colors`} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block">
            <h4 className="text-base md:text-lg mb-4 text-cyber-yellow text-h4">
              {t('navigation')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:!text-electric-blue transition-colors text-sm md:text-base inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-electric-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="hidden md:block">
            <h4 className="text-base md:text-lg mb-4 text-cyber-yellow text-h4">
              {t('resources.title')}
            </h4>
            <ul className="space-y-2.5">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:!text-neon-pink transition-colors text-sm md:text-base inline-flex items-center gap-2 group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 text-neon-pink opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-1 bg-gradient-brand mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p className="flex items-center gap-2">
            © {currentYear}{' '}
            <abbr title="Mattia Filippo De Luca" className="no-underline cursor-help">
              MFDL
            </abbr>
            . {t('madeWith')} ☕
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-cyber-yellow transition-colors">
              {t('privacy')}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-cyber-yellow transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
