import React from 'react';

interface SectionHeaderProps {
  titleWords: string[];
  gradientWord: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  titleWords, 
  gradientWord, 
  description, 
  className = "",
  align = 'center' 
}) => {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className="text-4xl md:text-5xl font-bold font-display text-zinc-900 dark:text-white mb-6 tracking-tight overflow-hidden leading-tight">
        {titleWords.map((word, i) => (
          <span 
            key={i} 
            className="inline-block animate-word-pull-up mr-2 md:mr-3 last:mr-0"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {word === gradientWord ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                {word}
              </span>
            ) : (
              word
            )}
          </span>
        ))}
      </h2>
      {description && (
        <p 
          className={`text-lg text-zinc-600 dark:text-zinc-400 animate-gradual-spacing max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`} 
          style={{ animationDelay: '300ms' }}
        >
          {description}
        </p>
      )}
    </div>
  );
};