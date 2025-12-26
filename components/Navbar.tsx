
import React, { useState, useEffect } from 'react';
import { translations, Language } from '../translations';

interface NavbarProps {
  onBookNow: () => void;
  onOpenVisualizer: () => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookNow, onOpenVisualizer, lang, onLangChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-stone-950/90 backdrop-blur-md py-4 border-b border-stone-800' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
            <span className="text-stone-950 font-black text-xl">G</span>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase hidden sm:block">The G-Burg Cut</span>
        </div>
        
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest text-stone-300">
          <a href="#services" className="hover:text-amber-500 transition-colors">{t.nav.services}</a>
          <a href="#ai-advisor" className="hover:text-amber-500 transition-colors">{t.nav.advisor}</a>
          <button 
            onClick={onOpenVisualizer}
            className="hover:text-amber-500 transition-colors flex items-center space-x-1"
          >
            <span>{t.nav.visualizer}</span>
            <span className="bg-amber-500 text-stone-950 text-[8px] px-1 rounded-sm font-black animate-pulse">NEW</span>
          </button>
          <a href="#team" className="hover:text-amber-500 transition-colors">{t.nav.team}</a>
          <a href="#location" className="hover:text-amber-500 transition-colors">{t.nav.location}</a>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-stone-900/50 p-1 rounded-full border border-stone-800">
            {(['en', 'es', 'ru'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                className={`w-8 h-8 rounded-full text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-amber-500 text-stone-950 shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <button 
            onClick={onBookNow}
            className="bg-amber-500 hover:bg-amber-600 text-stone-950 px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 whitespace-nowrap"
          >
            {t.nav.book}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
