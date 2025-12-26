
import React, { useState, useRef, useEffect } from 'react';
import { translations, Language } from '../translations';
import { createBarberChat } from '../services/geminiService';
import { Chat } from '@google/genai';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface ChatbotProps {
  lang: Language;
}

const Chatbot: React.FC<ChatbotProps> = ({ lang }) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && !chatInstance) {
      setChatInstance(createBarberChat(lang));
      setMessages([{ role: 'model', text: t.chatbot.welcome }]);
    }
  }, [isOpen, lang]);

  // Handle language change for an existing chat instance
  useEffect(() => {
    if (chatInstance) {
       setChatInstance(createBarberChat(lang));
       // Reset messages with a fresh welcome in the new language
       setMessages([{ role: 'model', text: t.chatbot.welcome }]);
    }
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatInstance || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const response = await chatInstance.sendMessage({ message: userMessage });
      const botText = response.text || t.chatbot.error;
      setMessages(prev => [...prev, { role: 'model', text: botText }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: t.chatbot.error }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start">
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-stone-950/95 backdrop-blur-xl border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-up origin-bottom-left">
          {/* Chat Header */}
          <div className="bg-stone-900/50 p-5 border-b border-stone-800 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-stone-950">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-stone-100 text-sm tracking-widest uppercase">{t.chatbot.title}</h3>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span className="text-[10px] text-stone-500 uppercase font-bold tracking-tighter">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-stone-300 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none' 
                    : 'bg-stone-900 text-stone-200 rounded-tl-none border border-stone-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl rounded-tl-none flex space-x-1 items-center">
                  <div className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-stone-900/30 border-t border-stone-800 flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatbot.placeholder}
              className="flex-grow bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            />
            <button 
              type="submit" 
              disabled={isTyping || !input.trim()}
              className="bg-amber-500 text-stone-950 p-2.5 rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform ${
          isOpen ? 'bg-stone-800 rotate-90 scale-90' : 'bg-amber-500 hover:scale-110 hover:shadow-amber-500/20'
        }`}
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <div className="relative">
            <svg className="w-8 h-8 text-stone-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-amber-500 rounded-full animate-ping"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
