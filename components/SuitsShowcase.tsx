import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Shield, Zap, Activity, ScanLine, Binary, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { TechCard } from './HudComponents';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- DATA ---
// Removed static URLs. Added 'prompt' for dynamic generation.
const SUITS_DATA = [
  {
    id: 'mk3',
    name: 'MARK III',
    prompt: "Full body Iron Man Mark 3 armor, classic red and gold, front view, standing heroically in a dark high-tech hall of armor, photorealistic, 8k, cinematic lighting, black background",
    stats: { armor: 75, speed: 80, power: 70 },
    status: "OPERATIONAL",
    desc: "First combat-ready suit. Gold-Titanium alloy solves icing problem. Standard repulsors and uni-beam.",
    special: "FLARES"
  },
  {
    id: 'mk85',
    name: 'MARK LXXXV',
    prompt: "Full body Iron Man Mark 85 armor, sleek nanotech design, red and gold, front view, standing heroically in a dark high-tech hall of armor, photorealistic, 8k, cinematic lighting, black background",
    stats: { armor: 95, speed: 98, power: 100 },
    status: "PRIME",
    desc: "Ultimate nanotech armor. Smart gold-titanium nanoparticles. Real-time matter reconfiguration and energy shield generation.",
    special: "NANO-BLADE"
  },
  {
    id: 'hulkbuster',
    name: 'MARK XLIV',
    prompt: "Full body Iron Man Hulkbuster armor, massive bulky design, red and gold, front view, standing heavily in a dark high-tech hall of armor, photorealistic, 8k, cinematic lighting, black background",
    stats: { armor: 100, speed: 30, power: 100 },
    status: "HEAVY DUTY",
    desc: "Veronica Protocol. Modular operating system. Designed for maximum kinetic impact absorption and threat suppression.",
    special: "JACKHAMMER"
  },
  {
    id: 'war-machine',
    name: 'WAR MACHINE',
    prompt: "Full body War Machine armor, metallic grey and silver, shoulder mounted minigun, heavy weaponry, front view, standing heroically in a dark high-tech hall of armor, photorealistic, 8k, cinematic lighting, black background",
    stats: { armor: 90, speed: 60, power: 85 },
    status: "ARMED",
    desc: "Variable Threat Response Battle Suit. Heavily weaponized. Minigun, sub-machine guns, and 'Ex-Wife' missile.",
    special: "MINIGUN"
  },
  {
    id: 'patriot',
    name: 'IRON PATRIOT',
    prompt: "Full body Iron Patriot armor, red white and blue star spangled color scheme, front view, standing heroically in a dark high-tech hall of armor, photorealistic, 8k, cinematic lighting, black background",
    stats: { armor: 88, speed: 65, power: 85 },
    status: "GOV_ISSUE",
    desc: "Rebranded War Machine armor. Enhanced communications suite and star-spangled livery for public relations.",
    special: "SONIC"
  }
];

// --- HELPER FUNCTIONS ---

const getCachedImage = (id: string) => localStorage.getItem(`jarvis_suit_img_${id}`);
const setCachedImage = (id: string, data: string) => localStorage.setItem(`jarvis_suit_img_${id}`, data);

// --- SUB-COMPONENTS ---

const HolographicRing = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin-slow"></div>
        <div className="absolute inset-4 rounded-full border-t border-b border-cyan-500/40 animate-spin-reverse-slow"></div>
        <div className="absolute inset-8 rounded-full border border-dashed border-cyan-500/20 animate-spin-slow" style={{ animationDuration: '20s' }}></div>
    </div>
);

const BlueprintCard = ({ 
    suit, 
    imageSrc, 
    isActive, 
    isScanning, 
    isFabricating,
    diagnosticComplete, 
    onClick 
}: { 
    suit: any, 
    imageSrc: string | null, 
    isActive: boolean, 
    isScanning: boolean, 
    isFabricating: boolean,
    diagnosticComplete: boolean, 
    onClick: () => void 
}) => {
    return (
        <div 
            onClick={onClick}
            className={`
                relative w-full h-full transition-all duration-500 ease-out cursor-pointer group
                ${isActive ? 'scale-100 opacity-100 z-20' : 'scale-90 opacity-40 hover:opacity-60 z-10 grayscale'}
            `}
        >
            {/* Card Frame */}
            <div className={`
                absolute inset-0 border-2 bg-slate-950/80 backdrop-blur-md overflow-hidden transition-colors duration-300
                ${isActive ? 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'border-cyan-900/50 hover:border-cyan-700'}
            `}>
                
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ 
                         backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)', 
                         backgroundSize: '40px 40px' 
                     }}>
                </div>

                {/* Active Scan Effect */}
                {isScanning && imageSrc && (
                    <div className="absolute inset-0 z-30 pointer-events-none">
                        <div className="w-full h-2 bg-green-400/50 shadow-[0_0_15px_#4ade80] absolute top-0 animate-[scanline_2s_linear_infinite]"></div>
                        <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay"></div>
                    </div>
                )}

                {/* The Suit Image / Loading State */}
                <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 overflow-hidden">
                    {isActive && <HolographicRing className="w-64 h-64 opacity-50" />}
                    
                    {imageSrc ? (
                        <img 
                            src={imageSrc} 
                            alt={suit.name} 
                            className={`
                                w-full h-full object-contain transition-all duration-700
                                ${isActive ? 'filter drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'filter grayscale opacity-50 brightness-75'}
                                ${isScanning ? 'brightness-150 sepia-[.5] hue-rotate-[50deg]' : ''}
                            `}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-cyan-500 gap-4 animate-pulse">
                            <Loader2 size={48} className="animate-spin" />
                            <div className="text-xs font-mono-tech tracking-widest text-center">
                                FABRICATING HOLOGRAM<br/>
                                <span className="text-[10px] opacity-70">ACCESSING GEMINI 2.5 FLASH IMAGE...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Decorative Tech Annotations (Only show if diagnostic is complete) */}
                {isActive && diagnosticComplete && imageSrc && (
                    <>
                        {/* Top Right Specs */}
                        <div className="absolute top-4 right-4 text-[9px] font-mono-tech text-cyan-500 text-right animate-fade-in">
                            <div className="text-green-400">SYS_CHECK: COMPLETED</div>
                            <div>INTEGRITY: 100%</div>
                            <div className="flex justify-end gap-1 mt-1">
                                <span className="w-1 h-1 bg-green-400"></span>
                                <span className="w-1 h-1 bg-green-400"></span>
                                <span className="w-1 h-1 bg-green-400"></span>
                            </div>
                        </div>

                        {/* Bottom Left Status */}
                        <div className="absolute bottom-16 left-4 animate-fade-in">
                            <div className="border border-cyan-500/30 p-1 px-2 bg-slate-900/50">
                                <span className="text-[10px] font-hud text-cyan-300 tracking-widest">{suit.status}</span>
                            </div>
                        </div>

                        {/* Connecting Lines */}
                        <svg className="absolute inset-0 pointer-events-none opacity-40 animate-pulse">
                            <line x1="10%" y1="20%" x2="30%" y2="30%" stroke="#06b6d4" strokeWidth="1" />
                            <circle cx="10%" cy="20%" r="2" fill="#06b6d4" />
                            
                            <line x1="90%" y1="70%" x2="70%" y2="60%" stroke="#06b6d4" strokeWidth="1" />
                            <circle cx="90%" cy="70%" r="2" fill="#06b6d4" />
                        </svg>
                    </>
                )}

                {/* Label */}
                <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 border-t border-cyan-800 p-2 text-center backdrop-blur-xl z-20">
                    <span className={`font-hud text-lg tracking-[0.2em] ${isActive ? 'text-cyan-300 text-shadow-glow' : 'text-cyan-800'}`}>
                        {suit.name}
                    </span>
                </div>
            </div>
        </div>
    );
};

const StatHexagon = ({ label, value, icon: Icon }: { label: string, value: number, icon: any }) => (
    <div className="flex flex-col items-center gap-2 group animate-fade-in">
        <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Hexagon Shape CSS */}
            <div className="absolute inset-0 bg-slate-900/80 border border-cyan-500/30" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
            <div className="absolute inset-0.5 bg-cyan-900/10" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
            
            {/* Circular Progress */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="#1e293b" strokeWidth="2" fill="none" />
                <circle 
                    cx="32" cy="32" r="28" 
                    stroke="#06b6d4" strokeWidth="2" fill="none" 
                    strokeDasharray={175} 
                    strokeDashoffset={175 - (175 * value) / 100}
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            
            <Icon size={20} className="relative z-10 text-cyan-400 group-hover:scale-110 transition-transform" />
        </div>
        <div className="text-center">
            <div className="text-[10px] font-mono-tech text-cyan-500 uppercase tracking-wider">{label}</div>
            <div className="text-xs font-bold text-cyan-300">{value}%</div>
        </div>
    </div>
);

// --- MAIN COMPONENT ---

export const SuitsShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [diagnosticStatus, setDiagnosticStatus] = useState<'IDLE' | 'SCANNING' | 'COMPLETE'>('IDLE');
    
    // Image Generation State
    const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
    const [fabricatingStatus, setFabricatingStatus] = useState<Record<string, boolean>>({});

    const activeSuit = SUITS_DATA[activeIndex];

    // Reset diagnostic when suit changes
    useEffect(() => {
        setDiagnosticStatus('IDLE');
    }, [activeIndex]);

    // Handle Image Generation & Caching
    useEffect(() => {
        const loadImages = async () => {
            // Load Active + Neighbors (Preload)
            const indicesToLoad = [
                activeIndex,
                (activeIndex + 1) % SUITS_DATA.length,
                (activeIndex - 1 + SUITS_DATA.length) % SUITS_DATA.length
            ];

            for (const idx of indicesToLoad) {
                const suit = SUITS_DATA[idx];
                
                // 1. Check State
                if (generatedImages[suit.id]) continue;

                // 2. Check Local Storage
                const cached = getCachedImage(suit.id);
                if (cached) {
                    setGeneratedImages(prev => ({ ...prev, [suit.id]: cached }));
                    continue;
                }

                // 3. Generate if not already generating
                if (fabricatingStatus[suit.id]) continue;

                setFabricatingStatus(prev => ({ ...prev, [suit.id]: true }));
                
                try {
                    console.log(`Fabricating suit: ${suit.name}`);
                    const response = await ai.models.generateContent({
                        model: 'gemini-2.5-flash-image',
                        contents: { parts: [{ text: suit.prompt }] }
                    });
                    
                    // Extract Image Part
                    let base64Data = null;
                    if (response.candidates?.[0]?.content?.parts) {
                        for (const part of response.candidates[0].content.parts) {
                            if (part.inlineData) {
                                base64Data = part.inlineData.data;
                                break;
                            }
                        }
                    }

                    if (base64Data) {
                        const dataUrl = `data:image/png;base64,${base64Data}`;
                        setCachedImage(suit.id, dataUrl);
                        setGeneratedImages(prev => ({ ...prev, [suit.id]: dataUrl }));
                    } else {
                        console.error("Failed to generate image for", suit.name);
                    }

                } catch (error) {
                    console.error("Error generating suit image:", error);
                } finally {
                    setFabricatingStatus(prev => ({ ...prev, [suit.id]: false }));
                }
            }
        };

        loadImages();
    }, [activeIndex]);


    const handleDiagnose = () => {
        if (diagnosticStatus !== 'IDLE') return;
        setDiagnosticStatus('SCANNING');
        // Simulate scan time
        setTimeout(() => {
            setDiagnosticStatus('COMPLETE');
        }, 2000);
    };

    // Handle carousel rotation
    const nextSuit = () => setActiveIndex((prev) => (prev + 1) % SUITS_DATA.length);
    const prevSuit = () => setActiveIndex((prev) => (prev - 1 + SUITS_DATA.length) % SUITS_DATA.length);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prevSuit();
            if (e.key === 'ArrowRight') nextSuit();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Helper to get visible indices (simple focus on 3)
    const getVisibleSuits = () => {
        const prev = (activeIndex - 1 + SUITS_DATA.length) % SUITS_DATA.length;
        const next = (activeIndex + 1) % SUITS_DATA.length;
        return [prev, activeIndex, next];
    };

    const [leftIdx, centerIdx, rightIdx] = getVisibleSuits();

    return (
        <div className="w-full h-[650px] flex flex-col relative animate-fade-in overflow-hidden">
            
            {/* --- CAROUSEL AREA (Top 65%) --- */}
            <div className="h-[65%] relative flex items-center justify-center perspective-[1000px] mt-4">
                
                {/* Left Card (Background) */}
                <div className="absolute left-4 md:left-20 w-48 md:w-64 h-64 md:h-80 opacity-50 transform translate-z-[-100px] rotate-y-[20deg] transition-all duration-500 hidden md:block"
                     onClick={prevSuit}>
                    <BlueprintCard 
                        suit={SUITS_DATA[leftIdx]} 
                        imageSrc={generatedImages[SUITS_DATA[leftIdx].id]}
                        isActive={false} 
                        isScanning={false}
                        isFabricating={false}
                        diagnosticComplete={false}
                        onClick={prevSuit}
                    />
                </div>

                {/* Right Card (Background) */}
                <div className="absolute right-4 md:right-20 w-48 md:w-64 h-64 md:h-80 opacity-50 transform translate-z-[-100px] rotate-y-[-20deg] transition-all duration-500 hidden md:block"
                     onClick={nextSuit}>
                    <BlueprintCard 
                        suit={SUITS_DATA[rightIdx]} 
                        imageSrc={generatedImages[SUITS_DATA[rightIdx].id]}
                        isActive={false} 
                        isScanning={false}
                        isFabricating={false}
                        diagnosticComplete={false}
                        onClick={nextSuit}
                    />
                </div>

                {/* Center Card (Active) */}
                <div className="relative z-30 w-72 md:w-96 h-80 md:h-[100%] transform transition-all duration-500 hover:scale-105">
                    <BlueprintCard 
                        suit={activeSuit} 
                        imageSrc={generatedImages[activeSuit.id]}
                        isActive={true} 
                        isScanning={diagnosticStatus === 'SCANNING'}
                        isFabricating={fabricatingStatus[activeSuit.id]}
                        diagnosticComplete={diagnosticStatus === 'COMPLETE'}
                        onClick={() => {}} 
                    />
                    
                    {/* Floating Navigation Buttons */}
                    <button 
                        onClick={prevSuit}
                        className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 p-3 rounded-full border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/20 hover:text-cyan-100 hover:border-cyan-400 transition-all backdrop-blur-sm z-40 group"
                    >
                        <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={nextSuit}
                        className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 p-3 rounded-full border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/20 hover:text-cyan-100 hover:border-cyan-400 transition-all backdrop-blur-sm z-40 group"
                    >
                        <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>

            {/* --- DATA PANEL (Bottom 35%) --- */}
            <div className="h-[35%] w-full bg-slate-950/80 border-t border-cyan-900/50 backdrop-blur-md relative z-20 flex flex-col justify-center">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                
                {/* Content Container */}
                <div className="max-w-5xl mx-auto px-4 w-full h-full flex flex-col items-center justify-center">
                    
                    {/* IDLE STATE: Show Initiate Button (Only if image is loaded) */}
                    {diagnosticStatus === 'IDLE' && (
                         <div className="flex flex-col items-center gap-4 animate-fade-in">
                            <div className="text-cyan-500 font-mono-tech text-sm tracking-widest animate-pulse">
                                {generatedImages[activeSuit.id] ? "SYSTEM STANDBY // AWAITING INPUT" : "FABRICATING BLUEPRINT..."}
                            </div>
                            <button 
                                onClick={handleDiagnose}
                                disabled={!generatedImages[activeSuit.id]}
                                className={`
                                    px-8 py-3 border font-hud text-lg tracking-widest transition-all flex items-center gap-3 group relative overflow-hidden
                                    ${generatedImages[activeSuit.id] 
                                        ? 'bg-cyan-900/20 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                                        : 'bg-slate-900 border-slate-700 text-slate-500 cursor-not-allowed opacity-50'}
                                `}
                            >
                                <span className="absolute inset-0 bg-cyan-400/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                                <ScanLine size={20} />
                                INITIATE_DIAGNOSTIC
                            </button>
                         </div>
                    )}

                    {/* SCANNING STATE: Show Progress */}
                    {diagnosticStatus === 'SCANNING' && (
                        <div className="flex flex-col items-center gap-4 w-full max-w-md animate-fade-in">
                            <div className="text-green-400 font-mono-tech text-sm tracking-widest">SCANNING NEURAL INTERFACE...</div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-cyan-900">
                                <div className="h-full bg-green-500 animate-[shimmer_2s_infinite] w-full origin-left scale-x-0 animate-[grow_2s_ease-out_forwards]"></div>
                                <style>{`@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
                            </div>
                        </div>
                    )}

                    {/* COMPLETE STATE: Show Details Grid */}
                    {diagnosticStatus === 'COMPLETE' && (
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between w-full h-full py-4 animate-fade-in">
                            
                            {/* Stats Cluster (Left) */}
                            <div className="flex gap-4 md:gap-8 justify-center md:justify-start flex-1 border-r-0 md:border-r border-cyan-900/30 pr-0 md:pr-8">
                                <StatHexagon label="ARMOR" value={activeSuit.stats.armor} icon={Shield} />
                                <StatHexagon label="SPEED" value={activeSuit.stats.speed} icon={Zap} />
                                <StatHexagon label="POWER" value={activeSuit.stats.power} icon={Activity} />
                            </div>

                            {/* Description (Center/Right) */}
                            <div className="flex-[2] text-center md:text-left flex flex-col justify-center h-full">
                                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start text-green-400">
                                    <CheckCircle2 size={16} />
                                    <h3 className="font-hud tracking-widest text-lg">DIAGNOSTIC COMPLETE</h3>
                                </div>
                                
                                <div className="bg-cyan-950/20 border border-cyan-500/20 p-3 rounded mb-2">
                                    <p className="font-mono-tech text-cyan-100/80 text-sm leading-relaxed">
                                        {activeSuit.desc}
                                    </p>
                                </div>
                                
                                <div className="flex gap-4 justify-center md:justify-start text-[10px] font-mono-tech text-cyan-600">
                                    <span className="border border-cyan-900 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                                        <AlertTriangle size={10} /> SPECIAL: {activeSuit.special}
                                    </span>
                                    <span className="border border-cyan-900 px-2 py-0.5 rounded uppercase">
                                        STATUS: {activeSuit.status}
                                    </span>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};