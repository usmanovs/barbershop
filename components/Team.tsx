
import React from 'react';
import { translations, Language } from '../translations';
import { Barber } from '../types';

interface TeamProps {
  lang: Language;
}

const Team: React.FC<TeamProps> = ({ lang }) => {
  const t = translations[lang];

  const TEAM: Barber[] = [
    { id: '1', name: 'Marcus "G" Thompson', role: t.team.roles.owner, specialty: 'Advanced Fades & Traditional Shaves', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400' },
    { id: '2', name: 'Leo Rivera', role: t.team.roles.senior, specialty: 'Modern Scissor Cuts & Beard Sculpting', image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80&w=400' },
    { id: '3', name: 'Jordan Hayes', role: t.team.roles.stylist, specialty: 'Creative Designs & Long Hair Trends', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
    { id: '4', name: 'Alex Chen', role: t.team.roles.apprentice, specialty: 'Clean Fades & Minimalist Styles', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold mb-4">{t.team.title}</h2>
        <p className="text-stone-400 max-w-2xl mx-auto text-lg">
          {t.team.subtitle}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM.map((member) => (
          <div key={member.id} className="group relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-500">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
            <p className="text-amber-500 font-medium text-sm uppercase tracking-wider mb-2">{member.role}</p>
            <p className="text-stone-500 text-sm leading-relaxed">{member.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
