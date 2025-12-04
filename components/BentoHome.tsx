import React from 'react';
import { PORTFOLIO_DATA, PROJECTS, EXPERIENCE } from '../constants';
import { TechCard, ArcCircle } from './HudComponents';
import { Github, Linkedin, MapPin, Cpu, ArrowRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

// Dummy data for CPU chart
const systemData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  load: 40 + Math.random() * 30,
}));

export const BentoHome = ({ onNavigate }: { onNavigate: (section: string) => void }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-full min-h-[600px] animate-fade-in">
      
      {/* 1. Profile / Hero - Large Tile */}
      <div className="col-span-1 md:col-span-2 md:row-span-2">
        <TechCard className="h-full flex flex-col justify-between bg-gradient-to-br from-slate-900/80 to-cyan-950/30">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ArcCircle className="w-12 h-12" />
              <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs font-mono-tech text-cyan-300">
                STATUS: ONLINE
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-hud font-bold text-white mb-2">
              {PORTFOLIO_DATA.name.toUpperCase()}
            </h1>
            <p className="text-xl text-cyan-400 font-tech tracking-wider">
              {PORTFOLIO_DATA.role}
            </p>
          </div>
          <div className="mt-6">
            <p className="font-mono-tech text-cyan-200/70 text-sm leading-relaxed mb-6">
              {PORTFOLIO_DATA.tagline}
            </p>
            <button 
              onClick={() => onNavigate('ABOUT')}
              className="group flex items-center gap-2 text-cyan-400 font-hud text-sm hover:text-white transition-colors"
            >
              INITIALIZE PROTOCOL <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </TechCard>
      </div>

      {/* 2. System Status / CPU - Medium Tile */}
      <div className="col-span-1 md:col-span-2 md:row-span-1">
        <TechCard className="h-full">
           <div className="flex justify-between items-center mb-2">
              <h3 className="text-cyan-400 font-mono-tech text-xs flex items-center gap-2">
                <Cpu size={14} /> SYSTEM LOAD
              </h3>
              <span className="text-xs text-cyan-600 animate-pulse">LIVE</span>
           </div>
           <div className="h-24 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={systemData}>
                 <Line type="monotone" dataKey="load" stroke="#06b6d4" strokeWidth={2} dot={false} isAnimationActive={true} />
                 <XAxis hide />
                 <YAxis hide domain={[0, 100]} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #06b6d4', color: '#fff' }} 
                    itemStyle={{ color: '#22d3ee' }}
                    labelStyle={{ display: 'none' }}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </TechCard>
      </div>

      {/* 3. Location - Small Tile */}
      <div className="col-span-1 md:col-span-1 md:row-span-1">
         <TechCard className="h-full flex flex-col justify-center items-center text-center group cursor-default">
            <MapPin className="text-cyan-500 mb-2" size={24} />
            <h4 className="font-hud text-white text-sm">BASE</h4>
            <p className="font-mono-tech text-cyan-400 text-xs mt-1">{PORTFOLIO_DATA.location}</p>
         </TechCard>
      </div>

      {/* 4. Socials - Small Tile */}
      <div className="col-span-1 md:col-span-1 md:row-span-1">
         <TechCard className="h-full flex flex-col justify-center gap-3">
            <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors">
               <Github size={18} /> <span className="font-mono-tech text-xs">GITHUB</span>
            </a>
            <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors">
               <Linkedin size={18} /> <span className="font-mono-tech text-xs">LINKEDIN</span>
            </a>
         </TechCard>
      </div>

      {/* 5. Latest Project - Wide Tile */}
      <div className="col-span-1 md:col-span-2 md:row-span-1">
        <div 
            onClick={() => onNavigate('PROJECTS')}
            className="relative h-full rounded border border-cyan-500/20 overflow-hidden group cursor-pointer"
        >
            <img src={PROJECTS[0].image} alt="Project" className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
                <p className="text-cyan-400 text-xs font-mono-tech mb-1">LATEST DEPLOYMENT</p>
                <h3 className="text-white font-hud text-xl">{PROJECTS[0].title}</h3>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="text-white" />
            </div>
        </div>
      </div>

      {/* 6. Stats - Remaining Space */}
      <div className="col-span-1 md:col-span-2 md:row-span-1">
          <TechCard className="h-full flex items-center justify-around">
              <div className="text-center">
                  <div className="text-3xl font-hud text-white font-bold">{EXPERIENCE.length}+</div>
                  <div className="text-xs font-mono-tech text-cyan-500">YEARS EXP</div>
              </div>
              <div className="w-px h-10 bg-cyan-900"></div>
              <div className="text-center">
                  <div className="text-3xl font-hud text-white font-bold">{PROJECTS.length}</div>
                  <div className="text-xs font-mono-tech text-cyan-500">PROJECTS</div>
              </div>
          </TechCard>
      </div>

    </div>
  );
};
