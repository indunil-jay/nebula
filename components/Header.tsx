import React, { useState, useEffect } from 'react';
import { Sun, Moon, Github, Menu, X, ArrowRight } from 'lucide-react';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Spy Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when the section crosses the middle of the viewport
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ['features', 'workflow', 'reviews', 'faq'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/10 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 2xl:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 relative z-50">
           <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-transform group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]">
                N
              </div>
              <span className="text-lg font-bold font-display tracking-tight text-zinc-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-500 transition-all">
                NebulaStream
              </span>
           </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/50 dark:bg-white/5 p-1 rounded-full border border-zinc-200/50 dark:border-white/5 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                activeSection === link.href.substring(1)
                  ? 'bg-white dark:bg-white/10 text-zinc-900 dark:text-white shadow-sm font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
           {/* Animated Theme Toggler */}
           <button 
              onClick={toggleTheme}
              className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-400 w-10 h-10 flex items-center justify-center overflow-hidden"
              aria-label="Toggle Theme"
            >
              <Sun 
                className={`absolute h-5 w-5 transition-all duration-500 ease-in-out ${
                  theme === Theme.DARK ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
                }`} 
              />
              <Moon 
                className={`absolute h-5 w-5 transition-all duration-500 ease-in-out ${
                  theme === Theme.DARK ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
                }`} 
              />
            </button>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-400"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden relative z-50 p-2 text-zinc-900 dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-xl z-40 md:hidden transition-all duration-500 ease-in-out flex flex-col items-center justify-center gap-8 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-6 w-full px-6">
           {navLinks.map((link, i) => (
             <a 
               key={link.name}
               href={link.href}
               onClick={() => setIsMobileMenuOpen(false)}
               className={`text-2xl font-display font-bold transition-colors ${
                 activeSection === link.href.substring(1) 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-zinc-900 dark:text-white hover:text-purple-500'
               }`}
               style={{ transitionDelay: `${i * 100}ms` }}
             >
               {link.name}
             </a>
           ))}
        </div>

        <div className="flex items-center gap-6 mt-8">
            <button 
              onClick={toggleTheme}
              className="relative p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white w-14 h-14 flex items-center justify-center overflow-hidden"
            >
               <Sun 
                className={`absolute h-6 w-6 transition-all duration-500 ease-in-out ${
                  theme === Theme.DARK ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
                }`} 
              />
              <Moon 
                className={`absolute h-6 w-6 transition-all duration-500 ease-in-out ${
                  theme === Theme.DARK ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
                }`} 
              />
            </button>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
            >
              <Github size={24} />
            </a>
        </div>
      </div>
    </header>
  );
};