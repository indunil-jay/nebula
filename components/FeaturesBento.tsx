
import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Zap, Shield, FileCode, Globe, Smartphone, Cpu, Lock, User, Youtube, FileAudio, FileVideo, Music, Terminal as TerminalIcon, FileText } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

/* --- Graphics Components --- */

// 1. Scrolling Formats Marquee (Existing)
const FormatMarquee = () => (
  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex overflow-hidden opacity-30 pointer-events-none group-hover:opacity-60 transition-opacity duration-500">
    <div className="flex animate-marquee whitespace-nowrap gap-4">
      {['MP4', 'WEBM', 'MP3', 'MKV', 'AAC', 'FLAC', 'WAV', '4K', '8K', 'HDR'].map((fmt, i) => (
        <span key={i} className="text-5xl font-bold font-display text-zinc-200 dark:text-white/5 uppercase select-none">{fmt}</span>
      ))}
      {['MP4', 'WEBM', 'MP3', 'MKV', 'AAC', 'FLAC', 'WAV', '4K', '8K', 'HDR'].map((fmt, i) => (
        <span key={`dup-${i}`} className="text-5xl font-bold font-display text-zinc-200 dark:text-white/5 uppercase select-none">{fmt}</span>
      ))}
    </div>
  </div>
);

// 2. Animated List (Existing)
const NotificationItem = ({ name, action, time, icon: Icon, color }: any) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:bg-white dark:hover:bg-zinc-800 shadow-sm">
    <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white shadow-inner`}>
      <Icon size={14} />
    </div>
    <div className="flex flex-col min-w-[100px]">
      <span className="text-xs font-bold text-zinc-900 dark:text-white">{name}</span>
      <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{action}</span>
    </div>
    <span className="ml-auto text-[10px] text-zinc-400 font-mono">{time}</span>
  </div>
);

const AnimatedListDemo = () => {
    return (
        <div className="absolute inset-0 p-6 pt-10 overflow-hidden flex flex-col gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <NotificationItem name="Alex M." action="Downloaded 4K MP4" time="2s ago" icon={FileVideo} color="bg-blue-500" />
            <NotificationItem name="Sarah J." action="Copied Metadata" time="15s ago" icon={FileText} color="bg-purple-500" />
            <NotificationItem name="David K." action="Extracted Audio" time="42s ago" icon={Music} color="bg-green-500" />
            <NotificationItem name="Maria R." action="Merged MKV" time="1m ago" icon={FileCode} color="bg-orange-500" />
            <NotificationItem name="James L." action="Processing 8K" time="2m ago" icon={Zap} color="bg-yellow-500" />
        </div>
    );
};

// 3. Animated Beam (Existing)
const AnimatedBeamVisual = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500 pb-20">
            <div className="relative w-full max-w-[80%] h-32 flex items-center justify-between px-8">
                {/* Source */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-red-500 shadow-lg">
                    <Youtube size={24} />
                </div>

                {/* Destination */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-purple-500 shadow-lg">
                    <FileText size={24} />
                </div>

                {/* Beam Container */}
                <div className="absolute left-[3rem] right-[3rem] h-[2px] bg-zinc-200 dark:bg-white/10 overflow-hidden rounded-full">
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent w-1/2 animate-shimmer-slide" />
                </div>
                
                {/* Floating Particles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
            </div>
        </div>
    );
}

// 4. Scanning Shield (Existing)
const ScanningShield = () => (
    <div className="absolute inset-0 flex items-center justify-center opacity-30 dark:opacity-40 group-hover:opacity-60 transition-all duration-500 pointer-events-none pb-20 overflow-hidden">
        <div className="relative">
            <div className="absolute inset-0 bg-purple-500 blur-[60px] opacity-20 animate-pulse-glow" />
            <Shield size={120} className="text-zinc-300 dark:text-zinc-700" strokeWidth={0.5} />
            <Lock size={40} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-500" />
            
            {/* Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-400 shadow-[0_0_15px_#a855f7] animate-scan opacity-0 group-hover:opacity-100" />
        </div>
    </div>
);

// 5. Retro Grid (Existing)
const RetroGridVisual = () => (
    <div className="absolute inset-0 overflow-hidden [perspective:200px] opacity-30 dark:opacity-50 group-hover:opacity-70 transition-opacity duration-700">
        <div className="absolute inset-0 [transform:rotateX(35deg)]">
            <div className="animate-grid-scroll h-[200%] w-[200%] -ml-[50%] -mt-[50%] bg-[linear-gradient(to_right,rgba(128,128,128,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#09090b] to-transparent" />
        <Globe className="absolute top-10 right-10 w-48 h-48 text-zinc-900/5 dark:text-white/5 rotate-12" />
    </div>
);

// 6. Typing Terminal (Existing)
const TerminalVisual = () => {
    const [lines, setLines] = useState<string[]>([]);
    
    useEffect(() => {
        const sequence = [
            "> Initializing core...",
            "> Loading ffmpeg.wasm...",
            "> Allocating buffer...",
            "> Ready for stream."
        ];
        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length) {
                setLines(prev => {
                    const newLines = [...prev, sequence[i]];
                    return newLines.slice(-4); // keep last 4 lines
                });
                i++;
            } else {
                setTimeout(() => {
                    setLines([]); // clear to loop
                    i = 0;
                }, 2000);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 p-8 pt-12 opacity-50 group-hover:opacity-100 transition-opacity duration-500 font-mono text-xs overflow-hidden">
             <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900/80 rounded-lg border border-zinc-200 dark:border-white/10 p-4 shadow-sm flex flex-col gap-2">
                <div className="flex gap-1.5 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                {lines.map((line, idx) => (
                    <div key={idx} className="text-zinc-600 dark:text-zinc-400">
                        <span className="text-purple-500 mr-2">$</span>
                        {line}
                    </div>
                ))}
                <div className="w-2 h-4 bg-purple-500 animate-pulse mt-auto" />
             </div>
        </div>
    );
};

/* --- Bento Components --- */

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({ children, className = "" }) => {
  return (
    <div className={`grid w-full auto-rows-[24rem] 2xl:auto-rows-[28rem] grid-cols-1 lg:grid-cols-3 gap-4 ${className}`}>
      {children}
    </div>
  );
};

interface BentoCardProps {
  name: string;
  className: string;
  background: React.ReactNode;
  Icon: React.ElementType;
  description: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
  name,
  className,
  background,
  Icon,
  description,
}) => {
  return (
    <div
      className={`group relative col-span-3 flex flex-col justify-end overflow-hidden rounded-3xl bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-white/10 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 ${className}`}
    >
      {/* Background Content */}
      <div className="absolute inset-0 z-0">{background}</div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#09090b]/90 pointer-events-none" />

      {/* Content */}
      <div className="pointer-events-none relative z-20 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2">
        <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-white/10 flex items-center justify-center mb-2 text-zinc-900 dark:text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white shadow-sm">
             <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold font-display text-zinc-950 dark:text-zinc-50">
          {name}
        </h3>
        <p className="max-w-lg text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/20 rounded-3xl pointer-events-none transition-colors duration-300" />
    </div>
  );
};

export const FeaturesBento: React.FC = () => {
  const features = [
    {
      Icon: FileText,
      name: "Smart Metadata Extraction",
      description: "Instantly retrieves video titles, thumbnails, view counts, and available formats without any buffering.",
      className: "lg:col-span-2 lg:row-span-1",
      background: <AnimatedBeamVisual />,
    },
    {
      Icon: User,
      name: "Community Activity",
      description: "Join thousands of creators processing content in real-time.",
      className: "lg:col-span-1 lg:row-span-1",
      background: <AnimatedListDemo />,
    },
    {
      Icon: FileCode,
      name: "Smart Format Muxing",
      description: "Automatically merges the highest quality video and audio streams for the perfect MP4 or MKV output.",
      className: "lg:col-span-1 lg:row-span-1",
      background: <FormatMarquee />,
    },
    {
      Icon: Globe,
      name: "Global Edge Network",
      description: "Intelligent routing through multiple Invidious instances guarantees high uptime and bypassing of region locks.",
      className: "lg:col-span-2 lg:row-span-1",
      background: <RetroGridVisual />,
    },
    {
      Icon: Shield,
      name: "Privacy Focused",
      description: "No tracking, no logs, no accounts required. Your download history stays in your browser.",
      className: "lg:col-span-1 lg:row-span-1",
      background: <ScanningShield />,
    },
    {
      Icon: Smartphone,
      name: "Responsive Design",
      description: "Works perfectly on mobile, tablet, and desktop. Install as a PWA for native-like experience.",
      className: "lg:col-span-1 lg:row-span-1",
       background: (
         <div className="absolute bottom-0 right-10 opacity-20 dark:opacity-30 group-hover:opacity-80 group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-500">
             <div className="w-32 h-48 border-4 border-zinc-400 dark:border-zinc-600 rounded-t-2xl border-b-0 bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden shadow-2xl">
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                 <div className="mt-6 mx-2 space-y-2">
                     <div className="h-2 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                     <div className="h-8 w-full bg-purple-500/20 rounded" />
                     <div className="grid grid-cols-2 gap-2">
                         <div className="h-12 bg-zinc-200 dark:bg-zinc-700 rounded" />
                         <div className="h-12 bg-zinc-200 dark:bg-zinc-700 rounded" />
                     </div>
                 </div>
             </div>
         </div>
      ),
    },
    {
        Icon: Cpu,
        name: "Client-Side Processing",
        description: "Heavy lifting is done efficiently in your browser, minimizing server load and maximizing speed.",
        className: "lg:col-span-1 lg:row-span-1",
        background: <TerminalVisual />
    }
  ];

  return (
    <section id="features" className="py-32 px-4 max-w-[1600px] mx-auto relative">
      <SectionHeader 
        titleWords={["Packed", "with", "power"]} 
        gradientWord="power"
        description="Everything you need to analyze, process, and archive video content in one unified, intelligent platform."
        className="mb-20"
      />
      
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
};
