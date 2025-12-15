
import React, { useState, useRef } from 'react';
import { Mail, User, MessageSquare, AtSign, ArrowRight } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden" id="contact">
        {/* Ambient Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-screen-2xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-900/0 to-zinc-900/0 pointer-events-none" />

        {/* Meteor Effect Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
             {[...Array(15)].map((_, i) => (
                <div 
                    key={i}
                    className="meteor-effect"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${Math.random() * 10 + 10}s`,
                    }}
                />
             ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
            {/* Spotlight Card Wrapper */}
            <div 
                ref={divRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-3xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 p-[1px] overflow-hidden shadow-2xl group/card"
            >
                {/* Spotlight Gradient */}
                <div 
                    className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
                    style={{
                        opacity,
                        background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(168,85,247,0.15), transparent 40%)`
                    }}
                />

                {/* Card Content */}
                <div className="relative h-full bg-white dark:bg-[#0a0a0c] rounded-[23px] p-8 md:p-12 z-20 overflow-hidden">
                     {/* Inner Grid Pattern */}
                     <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 relative z-10">
                        {/* Left Side: Info */}
                        <div className="flex flex-col justify-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 mb-8 border border-purple-100 dark:border-purple-500/20 shadow-inner">
                                <Mail size={26} />
                            </div>
                            
                            <SectionHeader 
                                titleWords={["Get", "in", "touch"]}
                                gradientWord="touch"
                                description="Have a suggestion, found a bug, or just want to chat? We're usually pretty quick to respond."
                                align="left"
                                className="mb-10"
                            />
                            
                            <div className="space-y-6">
                                 <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400 group">
                                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-white/10 group-hover:border-purple-500/50 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    </div>
                                    <span className="font-medium">24/7 Support Active</span>
                                 </div>
                                 <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400 group">
                                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-white/10 group-hover:border-purple-500/50 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    </div>
                                    <span className="font-medium">Community Driven</span>
                                 </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <form onSubmit={handleSubmit} className="space-y-5 bg-zinc-50 dark:bg-white/[0.02] p-6 rounded-2xl border border-zinc-100 dark:border-white/5">
                            <div className="group">
                                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider ml-1">Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-purple-500 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input 
                                        type="text" 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600" 
                                        placeholder="John Doe" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="group">
                                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider ml-1">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-purple-500 transition-colors">
                                        <AtSign size={18} />
                                    </div>
                                    <input 
                                        type="email" 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600" 
                                        placeholder="john@example.com" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider ml-1">Message</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none text-zinc-400 group-focus-within:text-purple-500 transition-colors">
                                        <MessageSquare size={18} />
                                    </div>
                                    <textarea 
                                        rows={4} 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 resize-none" 
                                        placeholder="How can we help?" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={submitted}
                                className="w-full relative overflow-hidden group bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-70 shadow-lg shadow-purple-500/10 mt-2"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
                                <div className="relative flex items-center justify-center gap-2">
                                    {submitted ? (
                                        <>
                                            Message Sent
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};
