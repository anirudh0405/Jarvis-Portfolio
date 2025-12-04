import React, { useEffect, useState } from 'react';
import { JarvisLogo } from './HudComponents';

export const LoadingScreen = () => {
  const [log, setLog] = useState<string[]>([]);
  
  const messages = [
    "INITIALIZING SYSTEM...",
    "LOADING PROTOCOLS...",
    "CONNECTING TO SATELLITE...",
    "RENDERING HOLOGRAMS...",
    "BIOMETRICS VERIFIED..."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLog(prev => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center">
      {/* Container for the logo */}
      <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
        
        {/* Glow Background */}
        <div className="absolute w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>

        {/* Spinning Outer Ring (Custom decorative) */}
        <div className="absolute inset-0 border-2 border-dashed border-cyan-800 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-4 border border-cyan-900 rounded-full animate-spin-reverse-slow"></div>

        {/* THE JARVIS LOGO - Spinning */}
        <div className="animate-spin" style={{ animationDuration: '3s' }}>
           <JarvisLogo size={120} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
        </div>
      </div>
      
      {/* Loading Bar */}
      <div className="w-64 h-1 bg-cyan-900/50 rounded-full overflow-hidden mb-4 relative">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-1/2 animate-[shimmer_1s_infinite] translate-x-[-100%]"></div>
         <style>{`
            @keyframes shimmer {
                100% { transform: translateX(200%); }
            }
         `}</style>
      </div>

      <div className="font-mono-tech text-cyan-500 text-xs h-24 overflow-hidden flex flex-col items-center gap-1">
        {log.map((msg, idx) => (
          <div key={idx} className="animate-fade-in">{msg}</div>
        ))}
      </div>
    </div>
  );
};
