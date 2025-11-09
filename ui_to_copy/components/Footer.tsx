import React from 'react';
import { Linkedin, Twitter, Github, Mail, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
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
              Product Manager con un passato da designer e developer. Trasformo fallimenti in feature e idee in prodotti che le persone amano usare.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 md:w-12 md:h-12 bg-[#1A1A1A] border-3 border-[#0D7EFF] rounded-lg flex items-center justify-center hover:bg-[#0D7EFF] hover:-translate-y-1 transition-all group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-[#0D7EFF] group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 md:w-12 md:h-12 bg-[#1A1A1A] border-3 border-[#FF006E] rounded-lg flex items-center justify-center hover:bg-[#FF006E] hover:-translate-y-1 transition-all group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-[#FF006E] group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 md:w-12 md:h-12 bg-[#1A1A1A] border-3 border-[#7209B7] rounded-lg flex items-center justify-center hover:bg-[#7209B7] hover:-translate-y-1 transition-all group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-[#7209B7] group-hover:text-white transition-colors" />
              </a>
              <a 
                href="mailto:mattia@example.com" 
                className="w-10 h-10 md:w-12 md:h-12 bg-[#1A1A1A] border-3 border-[#FFD60A] rounded-lg flex items-center justify-center hover:bg-[#FFD60A] hover:-translate-y-1 transition-all group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-[#FFD60A] group-hover:text-[#0A0A0A] transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links - Hidden on mobile */}
          <div className="hidden md:block">
            <h4 
              className="text-base md:text-lg mb-4 text-[#FFD60A]"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
            >
              Link veloci
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-white/80 hover:text-[#0D7EFF] transition-colors text-sm md:text-base inline-flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#0D7EFF] transition-colors text-sm md:text-base inline-flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Il mio percorso
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#0D7EFF] transition-colors text-sm md:text-base inline-flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Blog
                </a>
              </li>
              <li>
                <a href="#ask-me" className="text-white/80 hover:text-[#0D7EFF] transition-colors text-sm md:text-base inline-flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contatti
                </a>
              </li>
            </ul>
          </div>

          {/* Resources - Hidden on mobile */}
          <div className="hidden md:block">
            <h4 
              className="text-base md:text-lg mb-4 text-[#FFD60A]"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
            >
              Risorse
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-white/80 hover:text-[#FF006E] transition-colors text-sm md:text-base inline-flex items-center gap-2 group">
                  Product Tools
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#FF006E] transition-colors text-sm md:text-base inline-flex items-center gap-2 group">
                  Design Resources
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#FF006E] transition-colors text-sm md:text-base inline-flex items-center gap-2 group">
                  Dev Stack
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#FF006E] transition-colors text-sm md:text-base inline-flex items-center gap-2 group">
                  Newsletter
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-1 bg-gradient-to-r from-[#0D7EFF] via-[#FF006E] to-[#7209B7] mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p className="flex items-center gap-2">
            © {currentYear} Mattia Cintura. Fatto con{' '}
            <Heart className="w-4 h-4 text-[#FF006E] fill-[#FF006E] animate-pulse" />
            {' '}e troppi caffè
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#FFD60A] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#FFD60A] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#FFD60A] transition-colors">
              Cookie
            </a>
          </div>
        </div>

        {/* Fun Easter Egg */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/40 font-mono">
            Design neobrutalist • Built with React & Tailwind • Deployed con amore
          </p>
        </div>
      </div>
    </footer>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}