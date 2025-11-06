'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const translations = {
    it: {
      home: 'Home',
      blog: 'Blog',
      work: 'Lavoriamo insieme',
      about: 'Chi sono',
      switchTo: 'Switch to English',
    },
    en: {
      home: 'Home',
      blog: 'Blog',
      work: 'Work together',
      about: 'About',
      switchTo: 'Passa all\'italiano',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}/blog`, label: t.blog },
    { href: `/${locale}#contact`, label: t.work },
  ];

  const toggleLocale = () => {
    const newLocale = locale === 'it' ? 'en' : 'it';
    const newPath = pathname?.replace(`/${locale}`, `/${newLocale}`) || `/${newLocale}`;
    window.location.href = newPath;
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 dark:bg-brutalist-bg-dark/90 backdrop-blur-md border-b-4 border-black dark:border-white'
            : 'bg-transparent'
        )}
      >
        <div className="brutal-container">
          <div className="flex items-center justify-between py-4 lg:py-6">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="font-heading font-black text-xl lg:text-2xl text-brutalist-text-light dark:text-brutalist-text-dark
                       hover:text-primary dark:hover:text-primary transition-colors"
            >
              MC
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-medium text-sm transition-colors relative',
                    pathname === link.href
                      ? 'text-brutalist-text-light dark:text-brutalist-text-dark'
                      : 'text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 hover:text-brutalist-text-light dark:hover:text-brutalist-text-dark'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={toggleLocale}
                className={cn(
                  'flex items-center gap-2 px-4 py-2',
                  'border-3 border-black dark:border-white rounded-lg',
                  'bg-white dark:bg-brutalist-bg-dark',
                  'font-bold text-sm',
                  'shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#FFFFFF]',
                  'transition-all',
                  'hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]'
                )}
                title={t.switchTo}
              >
                <Globe className="w-4 h-4" />
                <span>{locale === 'it' ? 'IT' : 'EN'}</span>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg',
                'border-3 border-black dark:border-white',
                'bg-white dark:bg-brutalist-bg-dark'
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 lg:hidden
                     bg-white dark:bg-brutalist-bg-dark
                     border-b-4 border-black dark:border-white
                     shadow-[0_8px_0px_#000000] dark:shadow-[0_8px_0px_#FFFFFF]"
          >
            <div className="brutal-container py-6">
              <nav className="flex flex-col gap-4 mb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-4 py-3 rounded-lg font-bold text-lg transition-colors',
                      pathname === link.href
                        ? 'bg-primary text-black'
                        : 'text-brutalist-text-light dark:text-brutalist-text-dark hover:bg-brutalist-text-light/10 dark:hover:bg-brutalist-text-dark/10'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3 pt-4 border-t-3 border-black dark:border-white">
                {/* Language Switcher */}
                <button
                  onClick={toggleLocale}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-3',
                    'border-3 border-black dark:border-white rounded-lg',
                    'bg-white dark:bg-brutalist-bg-dark',
                    'font-bold',
                    'shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#FFFFFF]',
                    'transition-all',
                    'active:shadow-none active:translate-x-[4px] active:translate-y-[4px]'
                  )}
                >
                  <Globe className="w-5 h-5" />
                  <span>{locale === 'it' ? 'EN' : 'IT'}</span>
                </button>

                {/* Theme Toggle */}
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-[72px] lg:h-[88px]" />
    </>
  );
}
