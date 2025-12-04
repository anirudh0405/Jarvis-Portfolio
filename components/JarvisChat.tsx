import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToJarvis } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, X, Sparkles } from 'lucide-react';
import { JarvisLogo } from './HudComponents';

interface JarvisChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "Who is Anirudh?",
  "What are his key skills?",
  "Show me his latest projects.",
  "How can I contact him?"
];

export const JarvisChat: React.FC<JarvisChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "J.A.R.V.I.S. online. I have full access to Anirudh's professional records. How can I help you?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    const responseText = await sendMessageToJarvis(text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsThinking(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 md:right-10 w-[90vw] md:w-96 h-[600px] bg-slate-950/95 backdrop-blur-xl border border-cyan-500/50 rounded-lg overflow-hidden flex flex-col z-50 hud-box-shadow animate-fade-in">
      {/* Header */}
      <div className="bg-cyan-900/20 p-3 border-b border-cyan-500/30 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative">
             <JarvisLogo size={24} className="text-cyan-400" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full animate-ping"></div>
          </div>
          <span className="font-hud text-cyan-400 text-sm tracking-widest">J.A.R.V.I.S.</span>
        </div>
        <button onClick={onClose} className="text-cyan-500 hover:text-cyan-200">
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono-tech text-sm">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 border ${
              msg.role === 'user' 
                ? 'border-cyan-700 bg-cyan-900/30 text-cyan-100 rounded-tl-lg rounded-bl-lg rounded-br-lg' 
                : 'border-cyan-500/50 bg-slate-900/80 text-cyan-300 rounded-tr-lg rounded-br-lg rounded-bl-lg'
            }`}>
              <p className="leading-relaxed">{msg.text}</p>
              <span className="text-[10px] opacity-50 block mt-1 text-right">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
             <div className="max-w-[80%] p-3 border border-cyan-500/50 bg-slate-900/80 text-cyan-300 rounded-tr-lg rounded-br-lg rounded-bl-lg">
               <div className="flex gap-1">
                 <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-100"></span>
                 <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-200"></span>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions (Questioneering) */}
      <div className="p-2 bg-slate-900/80 border-t border-cyan-900/50 overflow-x-auto whitespace-nowrap scrollbar-thin">
        <div className="flex gap-2">
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all font-mono-tech flex items-center gap-1"
            >
              <Sparkles size={10} /> {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 bg-slate-900/50 border-t border-cyan-500/30">
        <div className="flex items-center gap-2">
          <JarvisLogo size={18} className="text-cyan-600 opacity-50" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Enter command..."
            className="flex-1 bg-transparent border-none outline-none text-cyan-100 font-mono-tech placeholder-cyan-800 focus:placeholder-cyan-600"
          />
          <button onClick={() => handleSend()} className="text-cyan-500 hover:text-cyan-300 transition-colors">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
