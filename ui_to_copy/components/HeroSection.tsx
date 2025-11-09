import React from "react";
import { NeoBadge } from "./NeoBadge";
import { NeoButton } from "./NeoButton";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center bg-[#FFFCF2] border-b-4 border-[#000] overflow-hidden">
      {/* Floating Geometric Shapes - Hidden on mobile for better readability */}
      <div className="hidden md:block absolute top-[10%] right-[5%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] bg-[#0D7EFF] border-4 border-[#000] rounded-full opacity-80 animate-float" />
      <div className="hidden md:block absolute top-[30%] left-[3%] w-[60px] h-[60px] md:w-[90px] md:h-[90px] bg-[#FF006E] border-4 border-[#000] rotate-45 opacity-80 animate-wiggle" />
      <div
        className="hidden md:block absolute bottom-[15%] right-[10%] w-[70px] h-[70px] md:w-[100px] md:h-[100px] bg-[#FFD60A] border-4 border-[#000] opacity-80 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="hidden md:block absolute bottom-[30%] left-[8%] w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-[#7209B7] border-4 border-[#000] rounded-full opacity-70 animate-wiggle"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-10">
          {/* Badge with Icon */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF006E]" />
            <NeoBadge color="pink">
              PM • Designer • Dev
            </NeoBadge>
          </div>

          {/* Main Headline - More Dynamic */}
          <h1 className="text-hero max-w-[900px] text-[#0A0A0A] relative px-4 md:px-0">
            {" "}
            come designer.
            <br />
            Poi come developer.
            <br />
            <span className="inline-block relative mt-2">
              Ora sono un PM
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#0D7EFF] rotate-1 -z-10" />
            </span>{" "}
            che sa davvero cosa costruire.
          </h1>

          {/* Subtitle */}
          <div className="max-w-[600px] space-y-4 px-4 md:px-0">
            <p className="text-body-large text-[#2D2D2D] leading-relaxed">
              Perché? Perché ho imparato che{" "}
              <strong className="text-[#FF006E]">
                il prodotto perfetto non esiste
              </strong>
              . Esiste solo quello che risolve problemi reali
              per persone reali.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:justify-center mt-4 px-4 md:px-0">
            <NeoButton variant="primary">
              Parliamone <ArrowRight className="w-5 h-5" />
            </NeoButton>
            <NeoButton variant="secondary">
              Leggi la storia
            </NeoButton>
          </div>
        </div>
      </div>
    </section>
  );
}