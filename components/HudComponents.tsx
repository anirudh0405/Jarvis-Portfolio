import React from 'react';

// --- Decorative Arc Reactor / Circle ---
export const ArcCircle = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-full border border-cyan-500/30 relative flex items-center justify-center ${className}`}>
    <div className="absolute inset-0 rounded-full border-t border-cyan-400 animate-spin-slow"></div>
    <div className="absolute inset-2 rounded-full border-b border-cyan-400/50 animate-spin-reverse-slow"></div>
  </div>
);

// --- Jarvis / Arc Reactor Logo ---
export const JarvisLogo = ({ className = "", size = 24 }: { className?: string, size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    {/* Outer Ring */}
    <circle cx="50" cy="50" r="45" strokeOpacity="0.5" />
    <circle cx="50" cy="50" r="40" strokeWidth="4" className="animate-pulse" />
    
    {/* Reactor Segments (trapezoids simulated with lines/paths for simplicity in icon) */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <line 
        key={deg}
        x1="50" y1="15" 
        x2="50" y2="30" 
        transform={`rotate(${deg} 50 50)`} 
        strokeWidth="6"
        strokeLinecap="butt"
      />
    ))}
    
    {/* Inner Core */}
    <circle cx="50" cy="50" r="12" fill="currentColor" className="animate-pulse" />
    <circle cx="50" cy="50" r="18" strokeWidth="1" />
  </svg>
);

// --- Section Header ---
export const HudHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8 relative pl-6 border-l-4 border-cyan-500">
    <h2 className="text-4xl font-hud font-bold text-cyan-400 uppercase tracking-widest hud-text-shadow">
      {title}
    </h2>
    {subtitle && (
      <p className="text-cyan-200/70 font-mono-tech mt-1 tracking-wider text-sm">
        // {subtitle}
      </p>
    )}
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500 to-transparent opacity-50"></div>
    <div className="absolute bottom-0 left-0 w-2/3 h-px bg-gradient-to-r from-cyan-500 to-transparent opacity-50"></div>
  </div>
);

// --- Tech Card ---
export const TechCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative bg-slate-900/40 backdrop-blur-md border border-cyan-500/20 p-6 overflow-hidden group hover:border-cyan-400/50 transition-colors duration-300 ${className}`}>
    {/* Corner accents */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400"></div>
    
    {/* Scanline effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent -translate-y-full group-hover:animate-scanline pointer-events-none"></div>
    
    {children}
  </div>
);

// --- Button ---
export const GlowButton = ({ onClick, children, active = false }: { onClick: () => void, children: React.ReactNode, active?: boolean }) => (
  <button
    onClick={onClick}
    className={`
      relative px-6 py-2 font-hud tracking-wider text-sm uppercase transition-all duration-300
      border border-cyan-500/30 clip-path-slant
      ${active ? 'bg-cyan-500/20 text-cyan-100 hud-box-shadow border-cyan-400' : 'text-cyan-500/70 hover:text-cyan-300 hover:bg-cyan-900/20'}
    `}
    style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
  >
    {children}
  </button>
);
