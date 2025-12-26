
import React, { useState, useRef } from 'react';
import { getStyleAdvice } from '../services/geminiService';
import { StyleAdvice } from '../types';
import { translations, Language } from '../translations';

interface StyleAdvisorProps {
  lang: Language;
}

const StyleAdvisor: React.FC<StyleAdvisorProps> = ({ lang }) => {
  const t = translations[lang];
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<StyleAdvice | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt && !image) return;

    setLoading(true);
    setAdvice(null);
    try {
      const result = await getStyleAdvice(
        prompt || (lang === 'en' ? "Suggest a modern haircut" : lang === 'es' ? "Sugiere un corte moderno" : "Предложите современную стрижку"),
        lang,
        image || undefined
      );
      setAdvice(result);
    } catch (error) {
      alert(lang === 'ru' ? "Не удалось получить совет. Попробуйте позже." : lang === 'es' ? "Error al obtener asesoría. Inténtalo más tarde." : "Failed to get style advice. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-1/2">
          <div className="inline-block p-2 bg-amber-500/10 rounded-lg mb-4">
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h2 className="text-5xl font-bold mb-6">{t.advisor.title}</h2>
          <p className="text-stone-400 text-lg mb-8 leading-relaxed">
            {t.advisor.subtitle}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.advisor.placeholder}
                className="w-full bg-stone-900 border border-stone-700 rounded-2xl p-6 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 min-h-[150px] resize-none"
              />
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 text-stone-300 hover:text-amber-500 transition-colors bg-stone-900 px-4 py-2 rounded-lg border border-stone-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>{image ? t.advisor.change : t.advisor.upload}</span>
              </button>
              {image && (
                <button 
                  type="button" 
                  onClick={() => setImage(null)}
                  className="text-red-500 text-sm hover:underline"
                >
                  {t.advisor.remove}
                </button>
              )}
            </div>

            {image && (
              <div className="w-32 h-32 rounded-xl overflow-hidden border border-stone-700">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-black text-lg transition-all ${loading ? 'bg-stone-800 text-stone-500 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 text-stone-950'}`}
            >
              {loading ? t.advisor.loading : t.advisor.cta}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 min-h-[400px] flex items-center justify-center">
          {!advice && !loading && (
            <div className="text-center p-12 bg-stone-900/50 border border-dashed border-stone-800 rounded-3xl w-full">
              <svg className="w-16 h-16 mx-auto mb-4 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <p className="text-stone-500">{t.advisor.resultsPlaceholder}</p>
            </div>
          )}

          {loading && (
            <div className="text-center w-full animate-pulse">
               <div className="h-8 bg-stone-800 rounded-lg w-3/4 mx-auto mb-4"></div>
               <div className="h-24 bg-stone-800 rounded-lg w-full mb-4"></div>
               <div className="space-y-2">
                 <div className="h-4 bg-stone-800 rounded-lg w-1/2"></div>
                 <div className="h-4 bg-stone-800 rounded-lg w-2/3"></div>
               </div>
            </div>
          )}

          {advice && (
            <div className="bg-stone-900 border border-stone-800 p-8 rounded-3xl w-full shadow-2xl animate-fade-in">
              <div className="flex items-center space-x-3 mb-6">
                 <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-stone-950 font-bold">A</div>
                 <h3 className="text-2xl font-bold">{t.advisor.verdict}</h3>
              </div>
              
              <div className="mb-8">
                <h4 className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-2">{t.advisor.recommendation}</h4>
                <p className="text-lg leading-relaxed text-stone-200">{advice.recommendation}</p>
              </div>

              <div className="mb-8">
                <h4 className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-2">{t.advisor.tips}</h4>
                <ul className="space-y-2">
                  {advice.tips.map((tip, i) => (
                    <li key={i} className="flex items-start space-x-2 text-stone-400">
                      <span className="text-amber-500">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-2">{t.advisor.maintenance}</h4>
                <p className="text-stone-400">{advice.maintenance}</p>
              </div>

              <button 
                onClick={() => { setAdvice(null); setPrompt(''); setImage(null); }}
                className="mt-8 text-stone-500 hover:text-amber-500 text-sm font-bold underline transition-colors"
              >
                {t.advisor.newConsultation}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StyleAdvisor;
