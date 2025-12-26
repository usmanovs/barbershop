
import React from 'react';
import { translations, Language } from '../translations';

interface ServicesProps {
  lang: Language;
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const t = translations[lang];
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold mb-4">{t.services.title}</h2>
        <p className="text-stone-400 max-w-2xl mx-auto text-lg">
          {t.services.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.services.items.map((service) => (
          <div key={service.id} className="group bg-stone-950 p-8 rounded-2xl border border-stone-800 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold group-hover:text-amber-500 transition-colors">{service.name}</h3>
              <span className="text-amber-500 font-black text-xl">{service.price}</span>
            </div>
            <p className="text-stone-500 text-sm mb-6 uppercase tracking-wider">{service.duration}</p>
            <p className="text-stone-400 leading-relaxed mb-6">
              {service.description}
            </p>
            <div className="h-1 w-0 group-hover:w-full bg-amber-500 transition-all duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
