
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { FeaturesBento } from './components/FeaturesBento';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Theme } from './types';

function App() {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-purple-500/30">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid z-0 pointer-events-none h-screen" />

      {/* New Premium Header */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content */}
      <main className="flex-grow relative z-10 pt-20">
        <div id="hero"><Hero /></div>
        <Stats />
        <FeaturesBento />
        <HowItWorks />
        <Testimonials />
        <Contact />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
