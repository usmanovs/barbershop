
import React, { useState } from 'react';
import { translations, Language } from '../translations';

interface BookingProps {
  onClose: () => void;
  lang: Language;
}

const Booking: React.FC<BookingProps> = ({ onClose, lang }) => {
  const t = translations[lang];
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    barber: '',
    date: '',
    time: '',
    name: '',
    email: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(lang === 'ru' ? "Запись подтверждена!" : lang === 'es' ? "¡Reserva Confirmada!" : "Booking Confirmed!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-stone-900 w-full max-w-2xl rounded-3xl overflow-hidden border border-stone-800 shadow-2xl animate-scale-up">
        <div className="flex justify-between items-center p-8 border-b border-stone-800">
          <h2 className="text-3xl font-bold">{lang === 'en' ? 'Book Appointment' : lang === 'es' ? 'Reservar Cita' : 'Запись на прием'}</h2>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-100 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-8">
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-stone-800 -translate-y-1/2 -z-10"></div>
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${s <= step ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-500'}`}
              >
                {s}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">{lang === 'en' ? 'Select Service' : lang === 'es' ? 'Servicio' : 'Услуга'}</label>
                  <select 
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-4 focus:ring-2 focus:ring-amber-500/50 outline-none"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    required
                  >
                    <option value="">...</option>
                    {t.services.items.map(s => <option key={s.id} value={s.id}>{s.name} - {s.price}</option>)}
                  </select>
                </div>
                <button 
                  type="button" 
                  onClick={nextStep} 
                  disabled={!formData.service}
                  className="w-full bg-amber-500 text-stone-950 py-4 rounded-xl font-black text-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
                >
                  {lang === 'en' ? 'Continue' : lang === 'es' ? 'Continuar' : 'Далее'}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">{lang === 'en' ? 'Date' : lang === 'es' ? 'Fecha' : 'Дата'}</label>
                    <input 
                      type="date" 
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-4 focus:ring-2 focus:ring-amber-500/50 outline-none text-stone-100"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">{lang === 'en' ? 'Time' : lang === 'es' ? 'Hora' : 'Время'}</label>
                    <select 
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-4 focus:ring-2 focus:ring-amber-500/50 outline-none"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required
                    >
                      <option value="">...</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="13:00">01:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button type="button" onClick={prevStep} className="flex-1 border border-stone-700 py-4 rounded-xl font-bold">{lang === 'en' ? 'Back' : lang === 'es' ? 'Atrás' : 'Назад'}</button>
                  <button type="button" onClick={nextStep} disabled={!formData.date || !formData.time} className="flex-1 bg-amber-500 text-stone-950 py-4 rounded-xl font-black text-lg hover:bg-amber-600 transition-colors disabled:opacity-50">{lang === 'en' ? 'Continue' : lang === 'es' ? 'Continuar' : 'Далее'}</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">{lang === 'en' ? 'Your Details' : lang === 'es' ? 'Tus Datos' : 'Ваши данные'}</label>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder={lang === 'en' ? 'Full Name' : lang === 'es' ? 'Nombre Completo' : 'Полное имя'}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-4 focus:ring-2 focus:ring-amber-500/50 outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                    <input 
                      type="email" 
                      placeholder="Email"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-4 focus:ring-2 focus:ring-amber-500/50 outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button type="button" onClick={prevStep} className="flex-1 border border-stone-700 py-4 rounded-xl font-bold">{lang === 'en' ? 'Back' : lang === 'es' ? 'Atrás' : 'Назад'}</button>
                  <button type="submit" className="flex-1 bg-amber-500 text-stone-950 py-4 rounded-xl font-black text-lg hover:bg-amber-600 transition-colors">{lang === 'en' ? 'Confirm' : lang === 'es' ? 'Confirmar' : 'Подтвердить'}</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
