
import React, { useState, useRef, useEffect } from 'react';
import { translations, Language } from '../translations';
import { visualizeHaircut, generateHaircutVideo } from '../services/geminiService';

interface VisualizerProps {
  onClose: () => void;
  lang: Language;
}

const Visualizer: React.FC<VisualizerProps> = ({ onClose, lang }) => {
  const t = translations[lang];
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Loading message rotation
  useEffect(() => {
    if (isVideoGenerating) {
      const interval = setInterval(() => {
        setLoadingMsgIndex(prev => (prev + 1) % t.visualizer.reassuringMessages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isVideoGenerating, t.visualizer.reassuringMessages]);

  const styles = [
    { id: 'buzz', name: t.visualizer.styles.buzz },
    { id: 'pompadour', name: t.visualizer.styles.pompadour },
    { id: 'crew', name: t.visualizer.styles.crew },
    { id: 'undercut', name: t.visualizer.styles.undercut },
    { id: 'fade', name: t.visualizer.styles.fade },
    { id: 'long', name: t.visualizer.styles.long },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBaseImage(reader.result as string);
        setResultImage(null);
        setResultVideo(null);
        setSelectedStyle(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVisualize = async () => {
    if (!baseImage || !selectedStyle) return;
    setIsGenerating(true);
    setResultVideo(null);
    try {
      const generated = await visualizeHaircut(baseImage, selectedStyle);
      setResultImage(generated);
    } catch (error) {
      alert("Visualization failed. Please ensure your photo clearly shows your head and face.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateVideo = async () => {
    if (!baseImage || !selectedStyle) return;

    // API Key Check for Veo
    // @ts-ignore - window.aistudio injected
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // @ts-ignore - window.aistudio injected
      await window.aistudio.openSelectKey();
      // Proceed after triggering dialog as per race condition rules
    }

    setIsVideoGenerating(true);
    setResultVideo(null);
    try {
      const videoUrl = await generateHaircutVideo(baseImage, selectedStyle);
      setResultVideo(videoUrl);
    } catch (error: any) {
      if (error.message === "API_KEY_RESET") {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      } else {
        alert("Video generation failed. Please try again with a different photo or style.");
      }
    } finally {
      setIsVideoGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-stone-950 animate-fade-in overflow-hidden">
      {/* Immersive Header */}
      <div className="bg-stone-900/50 backdrop-blur-xl border-b border-stone-800 p-6 flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-stone-950 transform rotate-3 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">{t.visualizer.title}</h2>
            <p className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em]">AI Grooming Studio</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-stone-100 hover:bg-stone-800 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-0">
              <div className="bg-stone-900 rounded-[2.5rem] p-8 border border-stone-800 shadow-xl">
                <p className="text-stone-400 text-sm mb-8 leading-relaxed">
                  {t.visualizer.subtitle}
                </p>

                {/* Upload Area */}
                <div 
                  onClick={() => !isGenerating && !isVideoGenerating && fileInputRef.current?.click()}
                  className={`group relative h-48 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden mb-8 ${
                    baseImage ? 'border-amber-500/50' : 'border-stone-800 hover:border-amber-500/30 bg-stone-950/50'
                  }`}
                >
                  {baseImage ? (
                    <img src={baseImage} alt="Base" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                  ) : (
                    <div className="text-center p-4">
                      <svg className="w-10 h-10 mx-auto mb-3 text-stone-700 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <p className="text-stone-300 font-bold text-sm">{t.visualizer.uploadArea}</p>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                </div>

                {baseImage && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-amber-500 uppercase tracking-widest text-[10px] font-black">{t.visualizer.selectStyle}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {styles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => !isGenerating && !isVideoGenerating && setSelectedStyle(style.name)}
                          className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                            selectedStyle === style.name 
                              ? 'bg-amber-500 text-stone-950 border-amber-500' 
                              : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-600'
                          }`}
                        >
                          {style.name}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={handleVisualize}
                        disabled={!selectedStyle || isGenerating || isVideoGenerating}
                        className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center space-x-3 ${
                          !selectedStyle || isGenerating || isVideoGenerating ? 'bg-stone-800 text-stone-500 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-lg shadow-amber-500/10'
                        }`}
                      >
                        {isGenerating ? (
                          <>
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>{t.visualizer.loading}</span>
                          </>
                        ) : (
                          <span>{t.visualizer.generate}</span>
                        )}
                      </button>

                      <button
                        onClick={handleCreateVideo}
                        disabled={!selectedStyle || isGenerating || isVideoGenerating}
                        className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center space-x-3 border-2 ${
                          !selectedStyle || isGenerating || isVideoGenerating 
                            ? 'bg-stone-900 border-stone-800 text-stone-600 cursor-not-allowed' 
                            : 'bg-stone-950 border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-stone-950'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        <span>{isVideoGenerating ? t.visualizer.loadingVideo : t.visualizer.generateVideo}</span>
                      </button>
                      <p className="text-[9px] text-stone-600 text-center px-4 uppercase tracking-tighter">
                        {t.visualizer.apiKeyHint} <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline text-amber-500/50">Docs</a>
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => { setBaseImage(null); setResultImage(null); setResultVideo(null); setSelectedStyle(null); }}
                      className="w-full text-stone-500 hover:text-stone-300 text-xs font-bold underline transition-colors"
                    >
                      {t.visualizer.reset}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Column */}
            <div className="lg:col-span-8">
              <div className="aspect-[4/3] md:aspect-[16/10] bg-stone-900 rounded-[3rem] border border-stone-800 shadow-2xl relative overflow-hidden flex items-center justify-center">
                {!baseImage && !isGenerating && !isVideoGenerating && (
                  <div className="text-center p-12">
                     <div className="w-24 h-24 bg-stone-950 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-700 border border-stone-800">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                     </div>
                     <h3 className="text-xl font-bold text-stone-500 uppercase tracking-widest text-sm italic">Awaiting Portrait...</h3>
                  </div>
                )}

                {isGenerating && (
                  <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-8">
                    <div className="relative">
                      <div className="w-20 h-20 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-10 h-10 border-2 border-amber-500/30 border-b-transparent rounded-full animate-spin-slow"></div>
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-amber-500 mt-8 mb-2">{t.visualizer.loading}</h4>
                    <p className="text-stone-400 max-w-xs text-sm">Rendering professional styling on your portrait...</p>
                  </div>
                )}

                {isVideoGenerating && (
                  <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-24 h-24 mb-10 relative">
                       <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full"></div>
                       <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-10 h-10 text-amber-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                       </div>
                    </div>
                    <h4 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">{t.visualizer.loadingVideo}</h4>
                    <p className="text-amber-500 font-medium italic animate-fade-in key={loadingMsgIndex}">
                      {t.visualizer.reassuringMessages[loadingMsgIndex]}
                    </p>
                  </div>
                )}

                {(baseImage || resultImage || resultVideo) && !isVideoGenerating && (
                  <div className="w-full h-full flex flex-col md:flex-row relative">
                    <div className="flex-1 relative group overflow-hidden bg-stone-950 border-r border-stone-800/50">
                      <img src={baseImage!} alt="Original" className="w-full h-full object-cover" />
                      <div className="absolute top-6 left-6 bg-stone-950/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-400 border border-white/5">Before</div>
                    </div>
                    
                    <div className="flex-1 relative animate-fade-in bg-stone-950 overflow-hidden flex items-center justify-center">
                      {resultVideo ? (
                        <video 
                          src={resultVideo} 
                          className="w-full h-full object-cover" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                        />
                      ) : resultImage ? (
                        <img src={resultImage} alt="Visualized" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-8 opacity-20 italic">
                          <p>Select a style and visualize...</p>
                        </div>
                      )}
                      
                      {(resultImage || resultVideo) && (
                        <>
                          <div className={`absolute top-6 right-6 ${resultVideo ? 'bg-red-500' : 'bg-amber-500'} text-stone-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl`}>
                            {resultVideo ? 'Cinematic' : 'After'}
                          </div>
                          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-stone-950/90 backdrop-blur-xl border border-amber-500/30 px-6 py-2 rounded-2xl shadow-2xl whitespace-nowrap">
                             <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest text-center mb-1">{resultVideo ? 'Video Render' : 'Visualization'}</p>
                             <p className="text-stone-100 font-bold text-center">{selectedStyle}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-12 opacity-50">
                 <div className="text-center">
                    <p className="text-amber-500 font-black text-xs uppercase mb-1">Photorealistic</p>
                    <p className="text-[10px] text-stone-500">Gemini 2.5 Image Synthesis</p>
                 </div>
                 <div className="text-center">
                    <p className="text-amber-500 font-black text-xs uppercase mb-1">Cinematic</p>
                    <p className="text-[10px] text-stone-500">Veo 3.1 Fast Video Engine</p>
                 </div>
                 <div className="text-center">
                    <p className="text-amber-500 font-black text-xs uppercase mb-1">Secure</p>
                    <p className="text-[10px] text-stone-500">Private session processing</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
