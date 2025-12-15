import React, { useEffect, useState, useRef } from 'react';
import { Users, Download, Database } from 'lucide-react';

const StatItem = ({ label, value, suffix = "", icon: Icon }: { label: string, value: number, suffix?: string, icon: any }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    // Smooth ease-out animation
    let startTime: number | null = null;
    const duration = 2500; // 2.5s duration

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = easeOutQuart(percentage);
      
      setCount(Math.floor(ease * value));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, isVisible]);

  return (
    <div ref={ref} className="group relative flex flex-col items-center justify-center p-12 bg-white dark:bg-[#09090b] border-r border-zinc-200 dark:border-white/5 last:border-r-0 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
      <div className="mb-6 p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <div className="text-5xl md:text-6xl font-display font-bold text-zinc-900 dark:text-white mb-3 tracking-tight tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 group-hover:text-purple-500 transition-colors">
        {label}
      </div>
      
      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export const Stats: React.FC = () => {
  return (
    <section className="w-full border-y border-zinc-200 dark:border-white/5 bg-white dark:bg-[#09090b] relative z-20">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3">
        <StatItem label="Active Users" value={125000} suffix="+" icon={Users} />
        <StatItem label="Total Downloads" value={850000} suffix="+" icon={Download} />
        <StatItem label="Data Processed" value={450} suffix=" TB" icon={Database} />
      </div>
    </section>
  );
};