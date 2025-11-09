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
      borderColor: 'border-[#0D7EFF]',
      iconColor: 'text-[#0D7EFF]',
      hoverBg: 'hover:bg-[#0D7EFF]',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/mattiafdl',
      icon: Twitter,
      borderColor: 'border-[#FF006E]',
      iconColor: 'text-[#FF006E]',
      hoverBg: 'hover:bg-[#FF006E]',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/mattiafilippodeluca',
      icon: Github,
      borderColor: 'border-[#7209B7]',
      iconColor: 'text-[#7209B7]',
      hoverBg: 'hover:bg-[#7209B7]',
    },
    {
      name: 'Email',
      href: 'mailto:hello@mattiafdl.com',
      icon: Mail,
      borderColor: 'border-[#FFD60A]',
      iconColor: 'text-[#FFD60A]',
      hoverBg: 'hover:bg-[#FFD60A]',
      hoverIconColor: 'group-hover:text-[#0A0A0A]',
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
    <footer className="bg-[#0A0A0A] text-white border-t-4 border-[#FFD60A] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#0D7EFF] opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#FF006E] opacity-10 rotate-45 translate-x-1/3 translate-y-1/3" />

      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 py-12 md:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">

          {/* Brand & Bio */}
          <div className="lg:col-span-2">
            <h3
              className="text-2xl md:text-3xl mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900 }}
            >
              <span className="text-[#0D7EFF]">Mattia</span>{' '}
              <span className="text-[#FF006E]">Cintura</span>
            </h3>
            <p className="text-white/80 text-sm md:text-base mb-6 max-w-md leading-relaxed">
              {t('bio')}
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
                    className={`w-10 h-10 md:w-12 md:h-12 bg-[#1A1A1A] border-3 ${social.borderColor} rounded-lg flex items-center justify-center ${social.hoverBg} hover:-translate-y-1 transition-all group`}
                    aria-label={social.name}
                  >
                    <Icon className={`w-5 h-5 ${social.iconColor} ${social.name === 'Email' ? 'group-hover:text-[#0A0A0A]' : 'group-hover:text-white'} transition-colors`} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block">
            <h4
              className="text-base md:text-lg mb-4 text-[#FFD60A]"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
            >
              {t('navigation')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-[#0D7EFF] transition-colors text-sm md:text-base inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="hidden md:block">
            <h4
              className="text-base md:text-lg mb-4 text-[#FFD60A]"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
            >
              {t('resources.title')}
            </h4>
            <ul className="space-y-2.5">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-[#FF006E] transition-colors text-sm md:text-base inline-flex items-center gap-2 group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-1 bg-gradient-to-r from-[#0D7EFF] via-[#FF006E] to-[#7209B7] mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p className="flex items-center gap-2">
            © {currentYear} Mattia Cintura. {t('madeWith')}{' '}
            <Heart className="w-4 h-4 text-[#FF006E] fill-[#FF006E] animate-pulse" />
            {' '}{t('andCoffee')}
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-[#FFD60A] transition-colors">
              {t('privacy')}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-[#FFD60A] transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
