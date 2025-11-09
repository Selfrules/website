import React, { useState } from 'react';
import { NeoBadge } from './NeoBadge';
import { MessageCircle, Mail, Send, Sparkles } from 'lucide-react';

export function AskMeSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <section id="ask-me" className="bg-[#0A0A0A] py-16 md:py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-5 w-16 h-16 bg-[#0D7EFF] border-4 border-[#FFD60A] rounded-full opacity-30 animate-float" />
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-[#FF006E] border-4 border-[#FFD60A] rotate-45 opacity-30 animate-wiggle" />
      
      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#FFD60A]" />
            <span
              className="inline-block px-4 py-2 bg-transparent border-3 border-[#FFD60A] text-[#FFD60A] rounded shadow-brutal-sm"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Ask me anything
            </span>
          </div>
          <h2 className="text-h1 text-white mb-4">
            Hai domande? Chiedi pure
          </h2>
          <p className="text-body text-white/80 max-w-[600px] mx-auto">
            Puoi chattare con il mio gemello digitale AI o lasciare una domanda anonima. 
            <strong className="text-[#FFD60A]"> Rispondo a tutte entro 48 ore.</strong>
          </p>
        </div>

        {/* Two Column Layout - Mobile First: Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* AI Chatbot Card */}
          <div className="bg-[#1A1A1A] border-4 border-[#0D7EFF] rounded-lg shadow-brutal-blue p-6 md:p-8 relative overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D7EFF]/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#0D7EFF] rounded-lg flex items-center justify-center mb-5 border-3 border-[#000]">
                <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>
              
              <h3 className="text-h3 text-white mb-3">
                Chatta con il mio gemello digitale
              </h3>
              
              <p className="text-body-small md:text-body text-white/90 mb-6">
                Alimentato da Claude AI, conosce tutto il mio background e può rispondere alle tue domande su design, sviluppo, product management, o qualsiasi altra cosa.
              </p>
              
              <button 
                className="w-full px-6 py-3 md:py-4 bg-[#0D7EFF] text-white border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                Inizia chat
              </button>
            </div>
          </div>

          {/* Anonymous Form Card */}
          <div className="bg-[#1A1A1A] border-4 border-[#FF006E] rounded-lg shadow-brutal-pink p-6 md:p-8 relative overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF006E]/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FF006E] rounded-lg flex items-center justify-center mb-5 border-3 border-[#000]">
                <Mail className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>
              
              <h3 className="text-h3 text-white mb-3">
                Chiedi in anonimo
              </h3>
              
              <p className="text-body-small md:text-body text-white/90 mb-6">
                Preferisci scrivere? Lascia la tua domanda qui. Rispondo pubblicamente sul blog o privatamente via email se la fornisci.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Nome (opzionale)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0A0A0A] text-white border-3 border-[#2D2D2D] rounded placeholder:text-[#6B7280] focus:border-[#FF006E] focus:outline-none transition-all"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                    }}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email (opzionale)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0A0A0A] text-white border-3 border-[#2D2D2D] rounded placeholder:text-[#6B7280] focus:border-[#FF006E] focus:outline-none transition-all"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                    }}
                  />
                </div>

                <div>
                  <textarea
                    placeholder="La tua domanda *"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-[#0A0A0A] text-white border-3 border-[#2D2D2D] rounded placeholder:text-[#6B7280] focus:border-[#FF006E] focus:outline-none transition-all resize-none"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                    }}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full px-6 py-3 md:py-4 bg-[#FF006E] text-white border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm inline-flex items-center justify-center gap-2"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  Invia domanda
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
