
import React from 'react';
import { Heart, Github, Twitter, Linkedin, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Workflow", href: "#workflow" },
      { label: "Reviews", href: "#reviews" },
      { label: "FAQ", href: "#faq" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "DMCA", href: "#" },
    ],
    social: [
      { label: "Twitter", href: "#", icon: Twitter },
      { label: "GitHub", href: "https://github.com", icon: Github },
      { label: "YouTube", href: "#", icon: Youtube },
      { label: "LinkedIn", href: "#", icon: Linkedin },
    ]
  };

  return (
    <footer className="relative border-t border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-[#09090b] pt-20 pb-10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
      
      {/* Footer Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 2xl:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                N
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-zinc-900 dark:text-white">
                NebulaStream
              </span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
              The most advanced browser-based video analysis and archiving tool. Built for creators, educators, and archivists who demand speed and privacy.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Product */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Product</h4>
              <div className="flex flex-col gap-3">
                {footerLinks.product.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.href}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors w-max"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Legal</h4>
              <div className="flex flex-col gap-3">
                {footerLinks.legal.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.href} 
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors w-max"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Social (Desktop Grid) */}
            <div className="flex flex-col gap-4">
               <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Community</h4>
               <div className="flex flex-col gap-3">
                  {footerLinks.social.map((item, i) => (
                    <a 
                      key={i} 
                      href={item.href} 
                      className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors w-max"
                    >
                      <item.icon size={16} />
                      {item.label}
                    </a>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {currentYear} NebulaStream. Open Source Project.
          </p>
          
          <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-white/5 px-3 py-1.5 rounded-full">
            <span>Made with</span>
            <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by StreamFetch Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
