import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { JourneySection } from './components/JourneySection';
import { WhatImUpToSection } from './components/WhatImUpToSection';
import { BlogSection, BlogPost } from './components/BlogSection';
import { BlogPage } from './components/BlogPage';
import { BlogArticle } from './components/BlogArticle';
import { WorkTogetherSection } from './components/WorkTogetherSection';
import { AskMeSection } from './components/AskMeSection';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';

type ViewType = 'home' | 'blog' | 'article';

export default function App() {
  const [language, setLanguage] = useState<'IT' | 'EN'>('IT');
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const handleArticleClick = (article: BlogPost) => {
    setSelectedArticle(article);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllArticles = () => {
    setCurrentView('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    setCurrentView('blog');
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show article view
  if (currentView === 'article' && selectedArticle) {
    return (
      <BlogArticle 
        article={selectedArticle} 
        onBack={handleBackToBlog}
        currentLang={language}
        onLanguageChange={setLanguage}
      />
    );
  }

  // Show blog page view
  if (currentView === 'blog') {
    return (
      <>
        <Header 
          currentLang={language} 
          onLanguageChange={setLanguage}
          onLogoClick={handleBackToHome}
          onViewAllArticles={handleViewAllArticles}
        />
        <BlogPage 
          onArticleClick={handleArticleClick}
          onBackToHome={handleBackToHome}
        />
        <Footer />
        <ChatBot />
      </>
    );
  }

  // Show home view (default)
  return (
    <main className="min-h-screen">
      {/* Header - Navigation */}
      <Header 
        currentLang={language} 
        onLanguageChange={setLanguage}
        onLogoClick={handleBackToHome}
        onViewAllArticles={handleViewAllArticles}
      />
      
      {/* Hero - L'inizio della storia */}
      <HeroSection />
      
      {/* Journey - Il percorso cronologico */}
      <JourneySection />
      
      {/* What I'm Up To - Presente */}
      <WhatImUpToSection />
      
      {/* Blog - Condivisione conoscenza */}
      <BlogSection 
        onArticleClick={handleArticleClick}
        onViewAllClick={handleViewAllArticles}
      />
      
      {/* Work Together - Call to action */}
      <WorkTogetherSection />
      
      {/* Ask Me - Interazione */}
      <AskMeSection />
      
      {/* Footer - Chiusura */}
      <Footer />

      {/* Floating ChatBot */}
      <ChatBot />
    </main>
  );
}