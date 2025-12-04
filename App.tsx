import React, { useState, useEffect } from 'react';
import { 
  Terminal, User, Code, Briefcase, Zap, Cpu, Battery, Wifi, Activity
} from 'lucide-react';
import { Section } from './types';
import { PORTFOLIO_DATA, PROJECTS, EXPERIENCE, SKILLS } from './constants';
import { ArcCircle, HudHeader, TechCard, JarvisLogo } from './components/HudComponents';
import { JarvisChat } from './components/JarvisChat';
import { BackgroundVis } from './components/BackgroundVis';
import { LoadingScreen } from './components/LoadingScreen';
import { BentoHome } from './components/BentoHome';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// --- Sub-components for Sections ---

const ProjectsSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
    {PROJECTS.map((project, idx) => (
      <TechCard key={project.id} className="h-full flex flex-col">
        <div className="h-40 mb-4 overflow-hidden rounded border border-cyan-900/50 relative">
             <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
             <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay"></div>
        </div>
        <h3 className="text-xl font-hud text-cyan-300 mb-2">{project.title}</h3>
        <p className="text-cyan-100/70 font-tech text-sm mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map(tech => (
            <span key={tech} className="text-xs font-mono-tech px-2 py-1 border border-cyan-500/30 text-cyan-400 bg-cyan-900/20 rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center text-xs font-mono-tech text-cyan-600">
           <span>ID: PRJ-{idx + 10}</span>
           <span>STATUS: DEPLOYED</span>
        </div>
      </TechCard>
    ))}
  </div>
);

const ExperienceSection = () => (
  <div className="space-y-8 max-w-4xl animate-fade-in">
    {EXPERIENCE.map((exp, idx) => (
      <div key={exp.id} className="relative pl-8 border-l border-cyan-800/50 hover:border-cyan-400 transition-colors duration-300 group">
        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-cyan-950 border border-cyan-500 rounded-full group-hover:bg-cyan-400 transition-colors shadow-[0_0_10px_cyan]"></div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
            <h3 className="text-2xl font-hud text-cyan-300">{exp.role}</h3>
            <span className="font-mono-tech text-cyan-500">{exp.period}</span>
        </div>
        <h4 className="text-lg text-cyan-100/80 font-tech mb-4">{exp.company}</h4>
        <ul className="list-none space-y-2">
            {exp.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-cyan-200/70 font-tech">
                    <span className="text-cyan-500 mt-1">▹</span>
                    {pt}
                </li>
            ))}
        </ul>
      </div>
    ))}
  </div>
);

const SkillsSection = () => {
  // Prepare data for Recharts Radar
  const data = SKILLS.map(s => ({
    subject: s.name,
    A: s.level,
    fullMark: 100,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in">
      <div>
         <TechCard>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                  <PolarGrid stroke="#0e7490" strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#22d3ee', fontFamily: 'Share Tech Mono', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fill="#06b6d4"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
         </TechCard>
      </div>
      <div className="space-y-4">
        {SKILLS.map((skill) => (
            <div key={skill.name} className="group">
                <div className="flex justify-between text-xs font-mono-tech text-cyan-400 mb-1">
                    <span>{skill.name.toUpperCase()}</span>
                    <span>{skill.level}%</span>
                </div>
                <div className="h-2 bg-slate-900 border border-cyan-900/50 rounded-full overflow-hidden relative">
                    <div 
                        className="h-full bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover:bg-cyan-400 transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                    ></div>
                    {/* Stripes pattern */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(45deg,transparent 25%,rgba(0,0,0,0.5) 25%,rgba(0,0,0,0.5) 50%,transparent 50%,transparent 75%,rgba(0,0,0,0.5) 75%,rgba(0,0,0,0.5))', backgroundSize: '4px 4px' }}></div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigate = (section: string) => {
    // Cast string to Section enum if possible, or just ignore invalid
    const target = section as Section;
    if (Object.values(Section).includes(target)) {
        changeSection(target);
    }
  };

  const changeSection = (section: Section) => {
    if (section === activeSection) return;
    setIsLoading(true);
    setTimeout(() => {
      setActiveSection(section);
      setIsLoading(false);
    }, 1200); // 1.2s loading time
  };

  const renderSection = () => {
    switch(activeSection) {
      case Section.HOME: return <BentoHome onNavigate={handleNavigate} />;
      case Section.PROJECTS: return <ProjectsSection />;
      case Section.EXPERIENCE: return <ExperienceSection />;
      case Section.SKILLS: return <SkillsSection />;
      case Section.ABOUT: 
        return (
             <div className="max-w-3xl animate-fade-in">
                <TechCard>
                    <p className="font-tech text-xl text-cyan-100 leading-relaxed">
                        {PORTFOLIO_DATA.about}
                    </p>
                    <div className="mt-8 flex gap-4">
                        <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white font-mono-tech underline decoration-cyan-500/30 underline-offset-4">GITHUB_PROFILE</a>
                        <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white font-mono-tech underline decoration-cyan-500/30 underline-offset-4">LINKEDIN_DATABASE</a>
                    </div>
                </TechCard>
             </div>
        );
      default: return null;
    }
  };

  return (
    <div className="relative min-h-screen text-cyan-50 bg-slate-950 overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {isLoading && <LoadingScreen />}

      {/* Background Elements */}
      <BackgroundVis />
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none z-0"></div>
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)', 
             backgroundSize: '50px 50px' 
           }}>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex h-screen flex-col md:flex-row">
        
        {/* Sidebar / Nav */}
        <nav className="w-full md:w-24 border-b md:border-b-0 md:border-r border-cyan-900/50 bg-slate-950/80 backdrop-blur-sm flex md:flex-col items-center justify-between p-4 md:py-8 z-50">
           <div className="mb-0 md:mb-8 animate-spin-slow">
              <Cpu className="text-cyan-400" size={32} />
           </div>

           <div className="flex md:flex-col gap-6 md:gap-8 overflow-x-auto md:overflow-visible">
              {[
                { id: Section.HOME, icon: Terminal, label: 'SYS' },
                { id: Section.ABOUT, icon: User, label: 'BIO' },
                { id: Section.SKILLS, icon: Zap, label: 'PWR' },
                { id: Section.PROJECTS, icon: Code, label: 'PRJ' },
                { id: Section.EXPERIENCE, icon: Briefcase, label: 'EXP' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => changeSection(item.id)}
                  className={`group flex flex-col items-center gap-1 transition-all ${activeSection === item.id ? 'text-cyan-400 scale-110' : 'text-cyan-800 hover:text-cyan-600'}`}
                >
                   <item.icon size={24} className={activeSection === item.id ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''} />
                   <span className="text-[10px] font-mono-tech tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">{item.label}</span>
                </button>
              ))}
           </div>

           <div className="mt-auto hidden md:flex flex-col gap-4 text-cyan-800">
               <div className="flex flex-col items-center gap-1">
                  <Battery size={16} className="text-green-500" />
                  <span className="text-[9px] font-mono-tech">100%</span>
               </div>
               <div className="flex flex-col items-center gap-1">
                  <Wifi size={16} className="text-cyan-500" />
                  <span className="text-[9px] font-mono-tech">NET</span>
               </div>
           </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto relative p-6 md:p-12 lg:p-16">
           {/* Top Info Bar */}
           <div className="flex justify-between items-start mb-10 border-b border-cyan-900/30 pb-4">
              <div className="font-mono-tech text-cyan-600 text-xs tracking-widest">
                 <div className="flex gap-4">
                    <span>SYS_TIME: {time.toLocaleTimeString()}</span>
                    <span>LOC: {PORTFOLIO_DATA.location.toUpperCase()}</span>
                 </div>
                 <div className="mt-1 text-cyan-800">
                    LAT: 37.7749° N / LON: 122.4194° W
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-blink"></div>
                 <span className="text-xs font-hud text-cyan-400">ONLINE</span>
              </div>
           </div>

           <div className="max-w-6xl mx-auto">
             <HudHeader 
                title={activeSection === Section.HOME ? "SYSTEM DASHBOARD" : activeSection} 
                subtitle={`ACCESSING ${activeSection} DATABASE...`}
             />
             <div className="min-h-[400px]">
                {renderSection()}
             </div>
           </div>
        </main>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
         <button 
           onClick={() => setIsChatOpen(!isChatOpen)}
           className={`
             relative w-16 h-16 rounded-full flex items-center justify-center 
             border-2 border-cyan-400 bg-slate-900/80 backdrop-blur 
             hover:bg-cyan-900/40 transition-all duration-300
             shadow-[0_0_20px_rgba(6,182,212,0.4)]
             ${isChatOpen ? 'rotate-90' : 'hover:scale-110'}
           `}
         >
            {isChatOpen ? (
               <Activity className="text-cyan-400" />
            ) : (
               <>
                 <JarvisLogo className="text-cyan-400 relative z-10" />
                 <div className="absolute inset-0 rounded-full border border-cyan-500 animate-pulse-ring opacity-20"></div>
               </>
            )}
         </button>
      </div>

      {/* Chat Interface Overlay */}
      <JarvisChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Decorative Corner HUD Elements */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-40 hidden md:block">
         <svg className="w-full h-full text-cyan-800/40" viewBox="0 0 100 100">
            <path d="M 2 2 L 30 2 L 35 10 L 90 10" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M 2 2 L 2 30 L 10 35 L 10 90" fill="none" stroke="currentColor" strokeWidth="1" />
            <rect x="2" y="2" width="4" height="4" fill="currentColor" />
         </svg>
      </div>
      <div className="fixed bottom-0 right-0 w-32 h-32 pointer-events-none z-40 hidden md:block rotate-180">
         <svg className="w-full h-full text-cyan-800/40" viewBox="0 0 100 100">
            <path d="M 2 2 L 30 2 L 35 10 L 90 10" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M 2 2 L 2 30 L 10 35 L 10 90" fill="none" stroke="currentColor" strokeWidth="1" />
         </svg>
      </div>

    </div>
  );
}
