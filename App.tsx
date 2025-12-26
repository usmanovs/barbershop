
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import StyleAdvisor from './components/StyleAdvisor';
import Visualizer from './components/Visualizer';
import Team from './components/Team';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { getNearbyPlaces } from './services/geminiService';
import { translations, Language } from './translations';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [nearbyPlaces, setNearbyPlaces] = useState<{ text: string; chunks: any[] } | null>(null);
  const [isSearchingNearby, setIsSearchingNearby] = useState(false);

  const t = translations[lang];

  const handleExploreNearby = async () => {
    setIsSearchingNearby(true);
    try {
      let lat, lng;
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      } catch (e) {
        console.warn("Geolocation failed, using default Gaithersburg center.");
      }
      
      const results = await getNearbyPlaces(lat, lng, lang);
      setNearbyPlaces(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearchingNearby(false);
    }
  };

  const shopAddress = "123 Main St, Gaithersburg, MD 20878";
  const encodedAddress = encodeURIComponent(shopAddress);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={`min-h-screen flex flex-col ${isVisualizerOpen ? 'overflow-hidden' : ''}`}>
      <Navbar 
        onBookNow={() => setIsBookingOpen(true)} 
        onOpenVisualizer={() => setIsVisualizerOpen(true)}
        lang={lang} 
        onLangChange={setLang} 
      />
      
      <main className="flex-grow">
        <Hero 
          onBookNow={() => setIsBookingOpen(true)} 
          onOpenVisualizer={() => setIsVisualizerOpen(true)}
          lang={lang} 
        />
        
        <section id="services" className="py-24 bg-stone-900">
          <Services lang={lang} />
        </section>

        <section id="ai-advisor" className="py-24 bg-stone-950 border-y border-stone-800">
          <StyleAdvisor lang={lang} />
        </section>

        <section id="team" className="py-24 bg-stone-900">
          <Team lang={lang} />
        </section>

        <section id="location" className="py-24 bg-stone-950">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold mb-6 text-amber-500">{t.location.title}</h2>
              <p className="text-stone-400 text-lg mb-8 leading-relaxed">
                {t.location.subtitle}
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start space-x-4 p-4 bg-stone-900/50 rounded-2xl border border-stone-800">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center shrink-0 border border-amber-500/20">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-100 text-lg">{t.location.address}</h4>
                    <p className="text-stone-400 text-base">{shopAddress}</p>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-amber-500 text-sm font-bold mt-2 hover:text-amber-400 transition-colors"
                    >
                      <span>{t.location.directions}</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-stone-900/50 rounded-2xl border border-stone-800">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center shrink-0 border border-amber-500/20">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-100 text-lg">{t.location.hours}</h4>
                    <div className="text-stone-400 text-base space-y-1">
                      <p className="flex justify-between w-48"><span>{t.location.monFri}:</span> <span className="font-medium text-stone-200">9AM - 8PM</span></p>
                      <p className="flex justify-between w-48"><span>{t.location.satSun}:</span> <span className="font-medium text-stone-200">10AM - 6PM</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-stone-900 rounded-3xl border border-amber-500/20 shadow-xl">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                  <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs">{t.location.explorerTitle}</h4>
                </div>
                <p className="text-stone-400 text-sm mb-6">{t.location.explorerDesc}</p>
                <button 
                  onClick={handleExploreNearby}
                  disabled={isSearchingNearby}
                  className="w-full flex items-center justify-center space-x-2 bg-stone-800 hover:bg-stone-700 text-stone-100 px-6 py-3 rounded-xl transition-all border border-stone-700 disabled:opacity-50"
                >
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span className="font-bold uppercase tracking-widest text-xs">{isSearchingNearby ? t.location.explorerLoading : t.location.explorerCTA}</span>
                </button>

                {nearbyPlaces && (
                  <div className="mt-6 animate-fade-in space-y-4 pt-6 border-t border-stone-800">
                    <p className="text-stone-300 text-sm italic leading-relaxed">"{nearbyPlaces.text}"</p>
                    <div className="flex flex-wrap gap-2">
                      {nearbyPlaces.chunks.map((chunk, i) => chunk.maps && (
                        <a 
                          key={i} 
                          href={chunk.maps.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-amber-500 text-stone-950 text-[10px] font-black py-1.5 px-3 rounded-lg border border-amber-500 hover:bg-transparent hover:text-amber-500 transition-all uppercase tracking-tighter"
                        >
                          {chunk.maps.title || "View on Maps"}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="order-1 md:order-2 w-full space-y-4">
              <div className="h-[600px] w-full bg-stone-800 rounded-[2.5rem] overflow-hidden border-4 border-stone-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }} 
                  loading="lazy" 
                  allowFullScreen 
                  title="The G-Burg Cut Location"
                  src={mapEmbedUrl}
                ></iframe>
                
                <div className="absolute bottom-6 left-6 right-6 bg-stone-950/90 backdrop-blur-xl p-4 rounded-2xl border border-stone-800 flex justify-between items-center shadow-2xl">
                  <div>
                    <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Located in</p>
                    <p className="text-stone-100 font-bold">Gaithersburg, Maryland</p>
                  </div>
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-stone-950">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <Chatbot lang={lang} />

      {isVisualizerOpen && (
        <Visualizer onClose={() => setIsVisualizerOpen(false)} lang={lang} />
      )}

      {isBookingOpen && (
        <Booking onClose={() => setIsBookingOpen(false)} lang={lang} />
      )}
    </div>
  );
};

export default App;
