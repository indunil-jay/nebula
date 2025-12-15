import React, { useState, useEffect } from 'react';
import { Link as LinkIcon, AlertCircle, Sparkles, DownloadCloud } from 'lucide-react';
import { fetchVideoMetadata, extractVideoId } from '../services/youtube';
import { VideoMetadata } from '../types';
import { ResultCard } from './ResultCard';

/**
 * Highlight Component
 * Animate a background highlight stroke behind text.
 */
const Highlight: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => {
  return (
    <span className={`relative inline-block px-1 ${className}`}>
        <span 
            className="absolute bottom-0 left-0 h-full bg-purple-200/50 dark:bg-purple-500/20 -rotate-1 rounded-md animate-highlight"
            style={{ animationDelay: `${delay}ms`, width: '0%', opacity: 0 }}
        />
        <span className="relative z-10">{children}</span>
    </span>
  );
};

export const Hero: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [video, setVideo] = useState<VideoMetadata | null>(null);
  
  // Typing Effect State
  const placeholders = ["Paste YouTube Link here...", "https://youtu.be/...", "Download Shorts...", "Save 4K Video..."];
  const [placeholder, setPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = placeholders[placeholderIndex];
    
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      timer = setTimeout(() => {
        setPlaceholder(currentText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 50);
    } else {
      timer = setTimeout(() => {
        setPlaceholder(currentText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 100);
    }

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => setIsDeleting(true), 2000); // Pause at end
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, placeholderIndex, placeholders]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = url.trim();
    if (!cleanUrl) return;

    if (!extractVideoId(cleanUrl)) {
      setError("Please enter a valid YouTube URL (e.g., youtube.com/watch?v=... or youtu.be/...)");
      setVideo(null);
      return;
    }

    setLoading(true);
    setError(null);
    setVideo(null);

    try {
      const data = await fetchVideoMetadata(cleanUrl);
      if (data) {
        setVideo(data);
      } else {
        setError("Could not retrieve video details. The video might be private, age-restricted, or our servers are temporarily busy. Please try again in a moment.");
      }
    } catch (err) {
      setError("An unexpected connection error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const titleWords = ["Download", "YouTube", "Videos", "Instantly."];

  return (
    <section className="relative flex flex-col items-center justify-start px-4 pt-32 2xl:pt-48 pb-12 w-full max-w-screen-2xl mx-auto">
      
      {/* Shiny Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-white/10 mb-8 cursor-default overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent translate-x-[-100%] animate-shine pointer-events-none" />
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>
        <span className="text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-zinc-600 to-purple-600 dark:from-purple-300 dark:via-zinc-200 dark:to-purple-300 animate-shine background-size-200">
            NebulaStream v2.0 Live
        </span>
      </div>

      {/* Heading with Word Pull Up */}
      <h1 className="text-5xl md:text-7xl 2xl:text-8xl font-bold font-display text-center text-zinc-900 dark:text-white tracking-tight mb-6 max-w-5xl 2xl:max-w-7xl mx-auto leading-[1.1]">
        {titleWords.map((word, i) => (
          <span 
            key={i} 
            className="inline-block animate-word-pull-up mr-3 md:mr-5 last:mr-0"
            style={{ animationDelay: `${i * 150}ms` }}
          >
             {word === "Instantly." ? (
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                 {word}
               </span>
             ) : (
               word
             )}
          </span>
        ))}
      </h1>
      
      {/* Blur In Description with Highlighter Effect */}
      <p className="text-lg 2xl:text-xl text-zinc-600 dark:text-zinc-400 text-center max-w-2xl 2xl:max-w-3xl mx-auto mb-12 leading-relaxed animate-blur-in" style={{ animationDelay: '400ms' }}>
        The most advanced <Highlight delay={1000}>YouTube Video Downloader</Highlight>. <br />
        Support for <Highlight delay={1200}>4K, 1080p</Highlight>, and high-quality MP3 conversion.
      </p>

      {/* Input Section - Supabase Style */}
      <div className="w-full max-w-2xl 2xl:max-w-3xl relative z-20 mb-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
        <form onSubmit={handleSubmit} className="relative group">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg opacity-30 group-hover:opacity-100 blur transition duration-500" />
           <div className="relative flex items-center bg-white dark:bg-[#09090b] rounded-lg p-1.5 shadow-2xl ring-1 ring-zinc-200 dark:ring-white/10">
            <div className="pl-3 text-zinc-400">
              <LinkIcon size={18} />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null); // Clear error on change
              }}
              placeholder={placeholder}
              className="flex-1 bg-transparent px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none text-base font-medium"
            />
            <button
              type="submit"
              disabled={loading}
              className="relative overflow-hidden bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-md font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-black/10 to-transparent translate-x-[-200%] group-hover/btn:animate-shimmer-slide" />
              {loading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Start
                  <DownloadCloud size={16} className="group-hover/btn:scale-110 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 flex items-center justify-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/10 px-4 py-2 rounded-md border border-red-200 dark:border-red-900/30 animate-fade-in">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Results Area */}
      {video && (
        <div id="results" className="w-full animate-fade-in-up">
          <ResultCard video={video} />
        </div>
      )}
    </section>
  );
};