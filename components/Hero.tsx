
import React from 'react';
import { translations, Language } from '../translations';

interface HeroProps {
  onBookNow: () => void;
  onOpenVisualizer: () => void;
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ onBookNow, onOpenVisualizer, lang }) => {
  const t = translations[lang];
  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
          alt="Barbershop Interior" 
          className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1 bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-widest mb-6 rounded">{t.hero.badge}</span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
            {lang === 'en' ? (
              <>Elevating <span className="text-amber-500">The Cut</span> in Gaithersburg.</>
            ) : lang === 'es' ? (
              <>Elevando <span className="text-amber-500">El Corte</span> en Gaithersburg.</>
            ) : (
              <><span className="text-amber-500">Стиль</span> Гейтерсберга.</>
            )}
          </h1>
          <p className="text-xl text-stone-300 mb-10 leading-relaxed max-w-xl">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={onBookNow}
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 px-10 py-4 rounded-full text-lg font-black transition-all transform hover:translate-y-[-2px] hover:shadow-xl hover:shadow-amber-500/20"
            >
              {t.hero.ctaBook}
            </button>
            <button 
              onClick={onOpenVisualizer}
              className="inline-flex items-center justify-center border-2 border-amber-500/20 bg-amber-500/5 hover:border-amber-500 px-10 py-4 rounded-full text-lg font-bold transition-all text-amber-500"
            >
              <span>{t.nav.visualizer}</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7m14-8l-7 7-7-7"></path></svg>
      </div>
    </div>
  );
};

export default Hero;
