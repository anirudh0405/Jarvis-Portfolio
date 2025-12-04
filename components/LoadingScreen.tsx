import React, { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  const [log, setLog] = useState<string[]>([]);
  
  const messages = [
    "INITIALIZING SYSTEM...",
    "POWERING ARC REACTOR...",
    "LOADING NEURAL NETWORK...",
    "CALIBRATING SENSORS...",
    "ESTABLISHING SECURE CONNECTION...",
    "ACCESS GRANTED."
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
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center">
      {/* Detailed Arc Reactor Animation */}
      <div className="relative w-40 h-40 mb-12 flex items-center justify-center">
        
        {/* Glow Background */}
        <div className="absolute w-full h-full bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>

        {/* Outer Casing Ring */}
        <div className="absolute inset-0 rounded-full border-[6px] border-slate-800 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>

        {/* The Reactor Ring (Segmented) */}
        <div className="absolute inset-2 rounded-full border border-cyan-900 bg-slate-900 flex items-center justify-center">
             {/* Creating the "Coils" using conic-gradient mask or individual elements. Using individual divs for rotation. */}
             {[...Array(10)].map((_, i) => (
               <div 
                 key={i}
                 className="absolute w-3 h-10 bg-gradient-to-b from-cyan-100 to-cyan-500 shadow-[0_0_10px_cyan]"
                 style={{ 
                   transform: `rotate(${i * 36}deg) translateY(-28px)`,
                   transformOrigin: 'bottom center',
                   width: '18px',
                   height: '14px',
                   borderRadius: '2px',
                   opacity: 0.9
                 }}
               ></div>
             ))}
             
             {/* Inner Ring holding the coils */}
             <div className="absolute inset-8 rounded-full border-[4px] border-slate-700 bg-transparent z-10"></div>
        </div>

        {/* Center Core */}
        <div className="absolute w-12 h-12 bg-white rounded-full shadow-[0_0_30px_cyan] z-20 animate-pulse border-4 border-cyan-200">
           <div className="absolute inset-0 bg-cyan-400 blur-sm rounded-full animate-pulse"></div>
        </div>
        
        {/* Spinning decorative overlay */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/30 border-dashed animate-spin-slow"></div>

      </div>
      
      <div className="w-64 h-1 bg-cyan-900 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-cyan-400 animate-[width_1s_ease-out_forwards]" style={{ width: '0%', animationName: 'loading-bar', animationDuration: '1.2s', animationFillMode: 'forwards' }}></div>
      </div>
      <style>{`
        @keyframes loading-bar {
            0% { width: 0%; }
            100% { width: 100%; }
        }
      `}</style>

      <div className="font-mono-tech text-cyan-400 text-xs h-24 overflow-hidden flex flex-col items-center">
        {log.map((msg, idx) => (
          <div key={idx} className="opacity-80">{msg}</div>
        ))}
      </div>
    </div>
  );
};
