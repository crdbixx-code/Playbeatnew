import React from 'react';
import { ArrowRight, Sparkles, Shield, Rocket } from 'lucide-react';

interface FinalCTABannerProps {
  onGetStarted: () => void;
}

export const FinalCTABanner: React.FC<FinalCTABannerProps> = ({ onGetStarted }) => {
  return (
    <section className="py-20 lg:py-24 bg-[#041126] text-white relative overflow-hidden border-t border-[#C8CDD5]/20">
      
      {/* Subtle metallic silver & yellow abstract pattern in background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bannerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5C542" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#C8CDD5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="20%" cy="50%" r="300" fill="url(#bannerGlow)" />
          <circle cx="80%" cy="50%" r="300" fill="url(#bannerGlow)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        {/* Subtle Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071A3D] border border-[#C8CDD5]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F5C542]">
            INSTANT SCALABILITY
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Your Next Chapter <span className="text-[#F5C542]">Starts Here.</span>
        </h2>

        {/* Text */}
        <p className="text-base sm:text-lg text-[#C8CDD5] leading-relaxed max-w-xl mx-auto font-normal">
          Discover a smarter way to build, manage and grow your digital business.
        </p>

        {/* Button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={onGetStarted}
            id="final-cta-btn"
            className="px-9 py-4 bg-[#F5C542] hover:bg-[#DFAF2B] text-[#041126] font-extrabold text-sm uppercase tracking-wide rounded-xl transition-all duration-200 shadow-[0_8px_25px_rgba(245,197,66,0.4)] hover:shadow-[0_12px_35px_rgba(245,197,66,0.55)] hover:-translate-y-0.5 flex items-center gap-2 group active:translate-y-0 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
