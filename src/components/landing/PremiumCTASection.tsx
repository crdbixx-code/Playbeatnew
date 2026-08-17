import React from 'react';
import { ArrowRight, MessageSquare, Sparkles, CheckCircle2, Shield, PhoneCall } from 'lucide-react';

interface PremiumCTASectionProps {
  onGetStartedToday: () => void;
  onTalkToTeam: () => void;
}

export const PremiumCTASection: React.FC<PremiumCTASectionProps> = ({
  onGetStartedToday,
  onTalkToTeam,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-[#071A3D] text-white relative overflow-hidden">
      
      {/* Subtle yellow gradient glow behind the CTA area */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-r from-[#F5C542]/20 via-[#C8CDD5]/15 to-[#F5C542]/20 blur-[130px] pointer-events-none" />

      {/* Delicate background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,205,213,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,205,213,0.05)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#041126] border border-[#C8CDD5]/30 mb-8 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-ping" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F5C542]">
            ACCELERATE YOUR ROADMAP
          </span>
        </div>

        {/* Large Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.15] mb-6">
          Ready to Build <span className="text-[#F5C542]">What's Next?</span>
        </h2>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg lg:text-xl text-[#C8CDD5] leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          Join businesses using smarter technology to simplify operations, improve performance and accelerate growth.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetStartedToday}
            id="cta-get-started-today"
            className="w-full sm:w-auto px-8 py-4 bg-[#F5C542] hover:bg-[#DFAF2B] text-[#041126] font-extrabold text-sm uppercase tracking-wide rounded-xl transition-all duration-200 shadow-[0_8px_30px_rgba(245,197,66,0.45)] hover:shadow-[0_12px_40px_rgba(245,197,66,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group active:translate-y-0 cursor-pointer"
          >
            <span>Get Started Today</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onTalkToTeam}
            id="cta-talk-to-team"
            className="w-full sm:w-auto px-8 py-4 bg-[#041126] hover:bg-[#041126]/80 text-white font-bold text-sm rounded-xl border border-[#C8CDD5]/40 hover:border-[#F5C542] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#F5C542]" />
            <span>Talk to Our Team</span>
          </button>
        </div>

        {/* Reassurance points */}
        <div className="mt-12 pt-8 border-t border-[#C8CDD5]/20 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-[#C8CDD5]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
            <span>Instant Sandbox Provisioning</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
            <span>No Credit Card Required to Begin</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
            <span>Direct WhatsApp & Engineer Support</span>
          </div>
        </div>

      </div>
    </section>
  );
};
