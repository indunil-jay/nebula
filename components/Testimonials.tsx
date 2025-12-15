
import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const reviews = [
  { name: "Alex Chen", role: "Content Creator", text: "The AI summary feature is a game changer for my research workflow. It saves me hours every week.", color: "bg-blue-500", handle: "@alxchn" },
  { name: "Sarah Jones", role: "Digital Marketer", text: "Fastest downloader I've found. No ads, no popups, just pure utility. Love the clean design.", color: "bg-purple-500", handle: "@sarah_j" },
  { name: "Marcus R.", role: "Student", text: "I use this to archive lectures for offline study. The 4K support is legitimate and plays perfectly.", color: "bg-green-500", handle: "@marcus_edu" },
  { name: "Emily W.", role: "Video Editor", text: "Cleanest UI in the business. Dark mode is easy on the eyes during late night editing sessions.", color: "bg-pink-500", handle: "@emily_edits" },
  { name: "David Kim", role: "Archivist", text: "Finally, a tool that respects privacy. No tracking cookies or account requirements is a huge plus.", color: "bg-orange-500", handle: "@dkim_archive" },
  { name: "Jessica T.", role: "Educator", text: "NebulaStream makes it easy to save educational content for my classroom without buffering issues.", color: "bg-teal-500", handle: "@jess_teach" },
];

const ReviewCard: React.FC<{
  name: string;
  role: string;
  text: string;
  color: string;
  handle: string;
}> = ({ name, role, text, color, handle }) => (
  <div className="group relative flex flex-col p-6 mx-4 w-[350px] h-[220px] rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1">
    
    {/* Header */}
    <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
            {name.charAt(0)}
        </div>
        <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{name}</h4>
                <CheckCircle2 size={12} className="text-blue-500 fill-blue-500/10" />
            </div>
            <span className="text-xs text-zinc-400">{handle}</span>
        </div>
        <div className="ml-auto flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
            ))}
        </div>
    </div>

    {/* Content */}
    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-4 flex-grow">
        "{text}"
    </p>

    {/* Footer Role */}
    <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between">
         <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-white/5 px-2 py-1 rounded-md">
            {role}
         </span>
         <span className="text-[10px] text-zinc-300 dark:text-zinc-600">Verified User</span>
    </div>

    {/* Hover Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-32 relative overflow-hidden">
        {/* Background Dot Pattern */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 px-4">
            <SectionHeader 
                titleWords={["Loved", "by", "thousands"]}
                gradientWord="thousands"
                description="Join the community of creators, educators, and archivists who trust NebulaStream."
                className="mb-20"
            />
        </div>

        <div className="relative z-10 flex flex-col gap-8">
            {/* Gradient Masks for Marquee */}
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#FAFAFA] dark:from-[#09090b] to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#FAFAFA] dark:from-[#09090b] to-transparent z-20 pointer-events-none" />

            {/* Row 1 - Left */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {[...reviews, ...reviews, ...reviews].map((r, i) => (
                    <ReviewCard key={`r1-${i}`} {...r} />
                ))}
            </div>
            
            {/* Row 2 - Right */}
             <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
                {[...reviews, ...reviews, ...reviews].map((r, i) => (
                    <ReviewCard key={`r2-${i}`} {...r} />
                ))}
            </div>
        </div>
    </section>
  );
};
