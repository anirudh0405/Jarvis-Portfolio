
import React from 'react';
import { PORTFOLIO_DATA, PROJECTS, EXPERIENCE, SKILLS } from '../constants';
import { ArcCircle, JarvisLogo } from './HudComponents';
import { Wifi, Battery, Activity, Shield, Cpu, ChevronRight } from 'lucide-react';

export const BentoHome = ({ onNavigate }: { onNavigate: (section: string) => void }) => {
  return (
    <div className="relative w-full min-h-[600px] flex flex-col justify-between p-2 md:p-6 overflow-hidden rounded-lg border border-cyan-500/10 bg-slate-950/30 animate-fade-in">
      
      {/* --- Decorative Background Layer --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
         {/* Connecting Lines */}
         <svg className="w-full h-full opacity-30">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Lines from Center to Corners */}
            <line x1="50%" y1="50%" x2="15%" y2="15%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5 5" />
            <line x1="50%" y1="50%" x2="85%" y2="15%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5 5" />
            <line x1="50%" y1="50%" x2="15%" y2="85%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5 5" />
            <line x1="50%" y1="50%" x2="85%" y2="85%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5 5" />
            
            {/* Concentric Circles around center */}
            <circle cx="50%" cy="50%" r="180" stroke="#06b6d4" strokeWidth="0.5" fill="none" opacity="0.3" />
            <circle cx="50%" cy="50%" r="250" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="20 10" fill="none" opacity="0.1" className="animate-spin-slow" style={{ animationDuration: '60s' }} />
         </svg>
      </div>

      {/* --- Top Row: Identity & Status --- */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
         
         {/* Identity Module */}
         <div className="bg-gradient-to-r from-slate-900/80 to-transparent border-l-4 border-cyan-400 pl-6 py-4 pr-12 backdrop-blur-sm clip-path-slant-right">
            <div className="text-cyan-500 font-mono-tech text-xs tracking-[0.2em] mb-1">SUBJECT_ID: 0405</div>
            <h1 className="text-4xl md:text-6xl font-hud text-white tracking-tighter drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              {PORTFOLIO_DATA.name.toUpperCase()}
            </h1>
            <div className="flex items-center gap-3 mt-2">
               <span className="h-2 w-2 bg-cyan-400 rounded-full animate-blink shadow-[0_0_8px_cyan]"></span>
               <p className="font-tech text-cyan-100 text-lg tracking-widest">{PORTFOLIO_DATA.role}</p>
            </div>
         </div>

         {/* System Status Module */}
         <div className="hidden md:flex flex-col items-end space-y-2">
            <div className="flex items-center gap-4 bg-slate-900/50 px-4 py-2 border border-cyan-500/20 rounded">
                <div className="text-right">
                    <div className="text-[10px] text-cyan-500 font-mono-tech">NET_STATUS</div>
                    <div className="text-sm text-cyan-300 font-bold">CONNECTED</div>
                </div>
                <Wifi size={20} className="text-cyan-400" />
            </div>
            <div className="flex items-center gap-4 bg-slate-900/50 px-4 py-2 border border-cyan-500/20 rounded">
                <div className="text-right">
                    <div className="text-[10px] text-cyan-500 font-mono-tech">CORE_TEMP</div>
                    <div className="text-sm text-cyan-300 font-bold">NORMAL</div>
                </div>
                <Activity size={20} className="text-green-400" />
            </div>
         </div>
      </div>

      {/* --- Center Row: The Reactor Core --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
         <div 
            className="group relative cursor-pointer"
            onClick={() => onNavigate('SUITS')}
         >
            {/* Outer Rotating Ring */}
            <div className="absolute inset-[-40px] rounded-full border border-dashed border-cyan-500/30 animate-spin-slow group-hover:animate-spin" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-[-20px] rounded-full border border-cyan-500/20 animate-spin-reverse-slow" style={{ animationDuration: '15s' }}></div>
            
            {/* Main Reactor Body */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-slate-950/80 backdrop-blur-xl border-2 border-cyan-400/50 flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_80px_rgba(6,182,212,0.4)] transition-all duration-500">
                
                {/* Inner Glow */}
                <div className="absolute inset-0 rounded-full bg-cyan-400/5 group-hover:bg-cyan-400/10 transition-colors"></div>
                
                {/* Logo */}
                <JarvisLogo size={64} className="text-cyan-300 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform" />
                
                {/* Text */}
                <div className="mt-4 text-center">
                    <div className="text-cyan-400 font-hud text-sm tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">INITIALIZE</div>
                    <div className="text-cyan-700 text-[10px] font-mono-tech mt-1">HALL_OF_ARMOR</div>
                </div>

                {/* Decorative brackets around the circle */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-16 bg-slate-950 border-x border-cyan-500/50"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-16 bg-slate-950 border-x border-cyan-500/50"></div>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-16 bg-slate-950 border-y border-cyan-500/50"></div>
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-4 w-16 bg-slate-950 border-y border-cyan-500/50"></div>
            </div>
         </div>
      </div>

      {/* --- Bottom Row: Data Modules --- */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6 mt-32 md:mt-0">
         
         {/* Skills/Security Module (Bottom Left) */}
         <div 
            className="group bg-slate-900/60 border border-cyan-500/30 p-4 rounded-tr-2xl backdrop-blur-sm cursor-pointer hover:bg-slate-800/80 transition-all w-full md:w-64"
            onClick={() => onNavigate('SKILLS')}
         >
             <div className="flex items-center justify-between mb-3 border-b border-cyan-500/20 pb-2">
                 <span className="text-xs font-mono-tech text-cyan-400">SKILL_MATRIX</span>
                 <Shield size={14} className="text-cyan-500" />
             </div>
             <div className="space-y-2">
                 {SKILLS.slice(0, 3).map((skill, i) => (
                     <div key={skill.name} className="flex items-center gap-2">
                         <div className="text-[10px] text-cyan-200 w-16">{skill.name}</div>
                         <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                             <div className="h-full bg-cyan-500/70 w-0 group-hover:w-full transition-all duration-1000 ease-out" style={{ width: `${skill.level}%` }}></div>
                         </div>
                         <div className="text-[10px] text-cyan-500">{skill.level}%</div>
                     </div>
                 ))}
             </div>
         </div>

         {/* Latest Mission Module (Bottom Right) */}
         <div 
            className="group relative bg-slate-900/60 border border-cyan-500/30 p-4 rounded-tl-2xl backdrop-blur-sm cursor-pointer hover:border-cyan-400 transition-all w-full md:w-80 text-right overflow-hidden"
            onClick={() => onNavigate('PROJECTS')}
         >
             {/* Background Image Effect */}
             <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <img src={PROJECTS[0].image} alt="Project BG" className="w-full h-full object-cover grayscale" />
             </div>
             <div className="relative z-10">
                 <div className="flex items-center justify-end gap-2 mb-2">
                    <span className="text-xs font-mono-tech text-cyan-400 blink">LATEST_DEPLOYMENT</span>
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                 </div>
                 <h3 className="text-xl font-hud text-white mb-1 group-hover:text-cyan-300 transition-colors">{PROJECTS[0].title}</h3>
                 <p className="text-xs text-cyan-200/60 font-tech line-clamp-2">{PROJECTS[0].description}</p>
                 
                 <div className="mt-3 flex justify-end items-center gap-1 text-cyan-500 text-xs font-mono-tech group-hover:gap-2 transition-all">
                    VIEW_LOGS <ChevronRight size={12} />
                 </div>
             </div>
         </div>
      </div>

    </div>
  );
};
