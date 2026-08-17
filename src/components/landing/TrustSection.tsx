import React from 'react';
import { Shield, Sparkles, Building2, Cpu, Globe, Boxes, Layers, Zap } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const logos = [
    { name: 'VORTEX DIGITAL', symbol: '◈ VORTEX' },
    { name: 'APEX CLOUD', symbol: '▲ APEX TECH' },
    { name: 'NEXUS ENTERPRISE', symbol: '⬡ NEXUS AI' },
    { name: 'QUANTUM CORP', symbol: '❖ QUANTUM' },
    { name: 'STRATA SYSTEMS', symbol: '◼ STRATA' },
    { name: 'ELEVATE DATA', symbol: '● ELEVATE' },
  ];

  return (
    <section className="py-12 bg-[#F3F5F8] border-y border-[#C8CDD5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-extrabold text-[#64748B]">
            Trusted by businesses building what’s next
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-center">
            {logos.map((logo, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center justify-center p-3 rounded-xl bg-white/70 border border-[#C8CDD5]/40 hover:border-[#071A3D] hover:bg-white hover:shadow-md transition-all duration-300 cursor-default"
              >
                <span className="text-sm sm:text-base font-extrabold font-mono tracking-wider text-[#071A3D]/60 group-hover:text-[#041126] transition-colors">
                  {logo.symbol}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#64748B] group-hover:text-[#F5C542] transition-colors font-bold mt-0.5">
                  VERIFIED PARTNER
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
