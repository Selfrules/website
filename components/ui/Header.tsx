'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const translations = {
    it: {
      home: 'Home',
      journey: 'Percorso',
      now: 'Now',
      blog: 'Blog',
      work: 'Collabora',
      contact: 'Contatti',
    },
    en: {
      home: 'Home',
      journey: 'Journey',
      now: 'Now',
      blog: 'Blog',
      work: 'Work',
      contact: 'Contact',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: `/${locale}#home`, label: t.home },
    { href: `/${locale}#journey`, label: t.journey },
    { href: `/${locale}#now`, label: t.now },
    { href: `/${locale}#blog`, label: t.blog },
    { href: `/${locale}#work`, label: t.work },
    { href: `/${locale}#ask-me`, label: t.contact },
  ];

  const toggleLocale = () => {
    const newLocale = locale === 'it' ? 'en' : 'it';
    const newPath = pathname?.replace(`/${locale}`, `/${newLocale}`) || `/${newLocale}`;
    window.location.href = newPath;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFCF2] border-b-4 border-[#000]">
      <div className="container max-w-[1440px] mx-auto px-5 md:px-8 py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center group"
          >
            <div className="relative">
              <div
                className="px-4 py-2 bg-[#0D7EFF] border-4 border-[#000] rounded-lg shadow-brutal-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-brutal"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 900,
                  fontSize: '20px',
                  letterSpacing: '0.1em',
                }}
              >
                <span className="text-white">MFDL</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[#2D2D2D] hover:text-[#0D7EFF] transition-colors relative group"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0D7EFF] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Side: Language Switcher + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-white border-[3px] border-[#000] rounded-lg shadow-brutal-sm overflow-hidden">
              <button
                onClick={() => {
                  if (locale !== 'it') toggleLocale();
                }}
                className={cn(
                  'px-3 py-1.5 transition-all',
                  locale === 'it'
                    ? 'bg-[#FF006E] text-white'
                    : 'bg-transparent text-[#2D2D2D] hover:bg-[#FFFCF2]'
                )}
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                IT
              </button>
              <div className="w-px h-6 bg-[#000]" />
              <button
                onClick={() => {
                  if (locale !== 'en') toggleLocale();
                }}
                className={cn(
                  'px-3 py-1.5 transition-all',
                  locale === 'en'
                    ? 'bg-[#FF006E] text-white'
                    : 'bg-transparent text-[#2D2D2D] hover:bg-[#FFFCF2]'
                )}
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 bg-[#0D7EFF] border-[3px] border-[#000] rounded-lg shadow-brutal-sm flex items-center justify-center transition-all hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0 active:shadow-brutal-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" strokeWidth={3} />
              ) : (
                <Menu className="w-5 h-5 text-white" strokeWidth={3} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t-[3px] border-[#000]">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 bg-white border-[3px] border-[#000] rounded-lg shadow-brutal-sm text-[#0A0A0A] hover:bg-[#0D7EFF] hover:text-white transition-all active:translate-y-0.5"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}