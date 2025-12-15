import React from 'react';

interface BorderBeamProps {
  duration?: number;
  className?: string;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({ duration = 4, className = "" }) => {
  return (
    <div 
      className={`absolute inset-0 rounded-xl pointer-events-none border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] after:absolute after:aspect-square after:w-[100%] after:animate-border-beam after:[animation-delay:0s] after:[background:linear-gradient(to_left,var(--color-purple-500),transparent,transparent)] after:[offset-anchor:calc(var(--offset-anchor)*1%)] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--rounded-xl)*1px))] ${className}`} 
      style={{'--duration': duration} as any} 
    />
  );
};