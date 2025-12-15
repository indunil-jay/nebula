
import React, { useRef } from 'react';
import { Link, Download, Settings } from 'lucide-react';
import { AnimatedBeam } from './AnimatedBeam';
import { SectionHeader } from './SectionHeader';

/**
 * Circle Component
 * Wraps icons in a consistent circular node style.
 */
const Circle = React.forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={`z-10 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#09090b] shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-110 ${className}`}
      >
        {children}
      </div>
    );
  }
);
Circle.displayName = "Circle";

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  return (
    <section id="workflow" className="py-32 px-4 relative">
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto relative z-10">
            <SectionHeader 
              titleWords={["Effortless", "workflow"]}
              gradientWord="workflow"
              description="From link to local file in seconds. Just 3 simple steps."
              className="mb-24"
            />

            {/* Container for Beams and Nodes. Ref is attached here for correct relative coordinates. */}
            <div ref={containerRef} className="relative flex flex-col items-center justify-center gap-16 md:flex-row md:gap-40 2xl:gap-60 md:items-start pt-8 pb-12 w-full">
                
                {/* Animated Beams */}
                <AnimatedBeam 
                    containerRef={containerRef} 
                    fromRef={step1Ref} 
                    toRef={step2Ref} 
                    duration={3} 
                    delay={0}
                    curvature={40}
                    pathColor="rgba(161, 161, 170, 0.2)"
                    pathWidth={3}
                    gradientStartColor="#d8b4fe" 
                    gradientStopColor="#a855f7" 
                />
                <AnimatedBeam 
                    containerRef={containerRef} 
                    fromRef={step2Ref} 
                    toRef={step3Ref} 
                    duration={3}
                    delay={1.5}
                    curvature={-40}
                    pathColor="rgba(161, 161, 170, 0.2)"
                    pathWidth={3}
                    gradientStartColor="#d8b4fe"
                    gradientStopColor="#a855f7"
                />

                {/* Step 1 */}
                <div className="flex flex-col items-center text-center gap-6 relative z-10 w-full max-w-[240px]">
                    <Circle ref={step1Ref} className="bg-white dark:bg-[#09090b] group border-2 border-transparent hover:border-purple-500/50">
                         <Link size={32} className="text-purple-600 dark:text-purple-400 relative z-10 transition-transform group-hover:scale-110" />
                    </Circle>
                    <div>
                         <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 animate-gradual-spacing" style={{ animationDelay: '500ms' }}>1. Paste Link</h3>
                         <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Copy any YouTube URL and drop it into the search bar.
                         </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center gap-6 relative z-10 w-full max-w-[240px] md:mt-16">
                    <Circle ref={step2Ref} className="bg-white dark:bg-[#09090b] group border-2 border-transparent hover:border-purple-500/50">
                         <Settings size={32} className="text-purple-600 dark:text-purple-400 relative z-10 transition-transform group-hover:scale-110" />
                    </Circle>
                    <div>
                         <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 animate-gradual-spacing" style={{ animationDelay: '700ms' }}>2. Processing</h3>
                         <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Our servers extract metadata and best available qualities.
                         </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center gap-6 relative z-10 w-full max-w-[240px]">
                    <Circle ref={step3Ref} className="bg-white dark:bg-[#09090b] group border-2 border-transparent hover:border-purple-500/50">
                         <Download size={32} className="text-purple-600 dark:text-purple-400 relative z-10 transition-transform group-hover:scale-110" />
                    </Circle>
                    <div>
                         <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 animate-gradual-spacing" style={{ animationDelay: '900ms' }}>3. Download</h3>
                         <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Save the video in 4K, 1080p, or MP3 instantly.
                         </p>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};
