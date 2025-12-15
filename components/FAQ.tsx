
import React, { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  delay: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, delay }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const { left, top } = divRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    divRef.current.style.setProperty("--x", `${x}px`);
    divRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <div 
        ref={divRef}
        onMouseMove={handleMouseMove}
        className="group relative border border-zinc-200 dark:border-white/5 rounded-xl bg-white dark:bg-[#09090b] overflow-hidden transition-all duration-300 hover:border-purple-500/30"
        style={{ animationDelay: delay } as React.CSSProperties}
    >
      {/* Spotlight Effect */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(600px circle at var(--x, 0px) var(--y, 0px), rgba(168, 85, 247, 0.06), transparent 40%)',
        }}
      />
      
      <div className="relative z-10">
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-6 text-left"
        >
            <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-900 dark:text-zinc-200'}`}>
            {question}
            </span>
            <span className={`relative flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 dark:border-white/10 transition-all duration-300 ${isOpen ? 'bg-purple-100 dark:bg-purple-900/20 rotate-45 border-purple-200 dark:border-purple-500/30' : 'bg-zinc-50 dark:bg-white/5'}`}>
            <Plus size={16} className={`transition-colors ${isOpen ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-400'}`} />
            </span>
        </button>
        
        <div 
            className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
            <div className="overflow-hidden">
                <div className="px-6 pb-6 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-white/5 mt-2 pt-4">
                    {answer}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is NebulaStream completely free to use?",
      a: "Yes! NebulaStream is an open-source project and completely free. We do not charge for high-quality downloads or analysis features.",
    },
    {
      q: "Does it work on mobile devices?",
      a: "Absolutely. The site is fully responsive and works great on iOS and Android browsers. You can even install it as a PWA.",
    },
    {
      q: "What is the maximum video quality supported?",
      a: "We support up to 8K HDR resolution, depending on the source video. If YouTube has it, we can download it.",
    },
    {
      q: "Is my download history saved?",
      a: "No. We prioritize privacy. All processing happens in your browser session and no logs are kept on our servers.",
    }
  ];

  return (
    <section id="faq" className="py-32 px-4 max-w-4xl mx-auto relative">
      <SectionHeader 
        titleWords={["Frequently", "Asked", "Questions"]}
        gradientWord="Questions"
        description="Got questions? We've got answers."
        className="mb-16"
      />

      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.q}
            answer={faq.a}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            delay={`${400 + index * 100}ms`}
          />
        ))}
      </div>
    </section>
  );
};
