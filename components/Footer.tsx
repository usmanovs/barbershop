
import React from 'react';
import { translations, Language } from '../translations';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];
  return (
    <footer className="bg-stone-950 border-t border-stone-900 py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-stone-950 font-black text-xl">G</span>
            </div>
            <span className="text-xl font-black uppercase">The G-Burg Cut</span>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed mb-8">
            {lang === 'en' ? 'Premium grooming experiences for the modern gentleman of Gaithersburg.' : lang === 'es' ? 'Experiencias de cuidado premium para el caballero moderno de Gaithersburg.' : 'Премиальный уход для современных джентльменов Гейтерсберга.'}
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-stone-950 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-amber-500 uppercase tracking-widest text-xs mb-6">{lang === 'en' ? 'Quick Links' : lang === 'es' ? 'Enlaces' : 'Ссылки'}</h4>
          <ul className="space-y-4 text-stone-400">
            <li><a href="#services" className="hover:text-stone-100 transition-colors">{t.nav.services}</a></li>
            <li><a href="#ai-advisor" className="hover:text-stone-100 transition-colors">{t.nav.advisor}</a></li>
            <li><a href="#team" className="hover:text-stone-100 transition-colors">{t.nav.team}</a></li>
            <li><a href="#location" className="hover:text-stone-100 transition-colors">{t.nav.location}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-amber-500 uppercase tracking-widest text-xs mb-6">{lang === 'en' ? 'Connect' : lang === 'es' ? 'Contacto' : 'Контакты'}</h4>
          <ul className="space-y-4 text-stone-400">
            <li><span className="block text-xs uppercase text-stone-600 font-bold mb-1">{lang === 'en' ? 'Phone' : lang === 'es' ? 'Teléfono' : 'Телефон'}</span> (301) 555-0123</li>
            <li><span className="block text-xs uppercase text-stone-600 font-bold mb-1">Email</span> hello@gburgcut.com</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-amber-500 uppercase tracking-widest text-xs mb-6">{lang === 'en' ? 'Newsletter' : lang === 'es' ? 'Boletín' : 'Рассылка'}</h4>
          <p className="text-stone-500 text-sm mb-4">{lang === 'en' ? 'Stay sharp. Get grooming tips.' : lang === 'es' ? 'Mantente impecable. Recibe consejos.' : 'Будьте в курсе трендов.'}</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email"
              className="bg-stone-900 border border-stone-800 rounded-l-lg p-3 text-sm flex-grow focus:outline-none"
            />
            <button className="bg-amber-500 text-stone-950 px-4 rounded-r-lg font-bold hover:bg-amber-600 transition-colors">
              OK
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-stone-900 text-center text-stone-600 text-xs">
        <p>&copy; 2024 The G-Burg Cut Barbershop. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
