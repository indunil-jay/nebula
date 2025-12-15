import React from 'react';

const platforms = [
  "YouTube", "Vimeo", "TikTok", "Instagram", "Facebook", "Twitter", "Twitch", "Dailymotion"
];

export const Marquee: React.FC = () => {
  return (
    <div className="w-full py-16 bg-white dark:bg-[#09090b] border-y border-zinc-200 dark:border-white/5 relative overflow-hidden">
        {/* Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#09090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#09090b] to-transparent z-10 pointer-events-none" />

        <div className="flex flex-col items-center justify-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Trusted by creators on</span>
        </div>

      <div className="relative w-full max-w-7xl mx-auto flex overflow-hidden">
        <div className="flex w-max animate-marquee gap-16 items-center">
          {[...platforms, ...platforms, ...platforms].map((platform, i) => (
            <span key={i} className="text-3xl font-display font-bold text-zinc-300 dark:text-zinc-800 hover:text-purple-500 dark:hover:text-purple-400 transition-colors cursor-default select-none">
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};