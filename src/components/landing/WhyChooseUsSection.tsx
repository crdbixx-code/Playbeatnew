import React from 'react';
import {
  Check,
  ArrowRight,
  Shield,
  Zap,
  Cpu,
  Server,
  Cloud,
  Lock,
  Headphones,
  Sparkles,
  Layers,
  Globe2,
} from 'lucide-react';

interface WhyChooseUsSectionProps {
  onDiscoverMore: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ onDiscoverMore }) => {
  const benefits = [
    { title: 'Modern Technology', desc: 'Cutting-edge architectures built with modular microservices and modern APIs.' },
    { title: 'Scalable Infrastructure', desc: 'Auto-scaling clusters designed to support millions of concurrent operations.' },
    { title: 'Enterprise-Level Security', desc: 'SOC2 Type II aligned, multi-tenant isolation, and quantum-safe cryptographic layers.' },
    { title: 'Simple User Experience', desc: 'Intuitive design language minimizing onboarding friction for cross-functional teams.' },
    { title: 'Dedicated Support', desc: '24/7 direct access to Tier-3 solutions engineers via Slack, WhatsApp, and dedicated hotline.' },
    { title: 'Continuous Innovation', desc: 'Bi-weekly zero-downtime feature rollouts keeping you ahead of market curves.' },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Premium Abstract Tech / Network Visualization */}
          <div className="lg:col-span-6 relative">
            
            {/* Ambient metallic backing shadow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F3F5F8] to-[#FFFFFF] rounded-3xl border border-[#C8CDD5] shadow-2xl -rotate-1 transform pointer-events-none" />

            <div className="relative rounded-3xl bg-[#071A3D] border-2 border-[#C8CDD5] p-6 sm:p-8 text-white overflow-hidden shadow-2xl">
              
              {/* Top Bar with Server Architecture Badge */}
              <div className="flex items-center justify-between border-b border-[#C8CDD5]/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F5C542] text-[#041126] flex items-center justify-center font-black text-xs">
                    99.9%
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">SLA Guaranteed Cluster</span>
                    <span className="text-[10px] text-[#C8CDD5] font-mono">Distributed Multi-Region Edge</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-[#041126] border border-[#F5C542]/40 text-[10px] font-mono text-[#F5C542] font-bold">
                  HEALTH: OPTIMAL
                </span>
              </div>

              {/* Central Abstract Network Nodes Visual */}
              <div className="relative h-64 rounded-2xl bg-[#041126] border border-[#C8CDD5]/30 p-4 flex items-center justify-center overflow-hidden mb-6">
                
                {/* SVG Visual Network Grid */}
                <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="netGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="#C8CDD5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#netGrid)" />
                </svg>

                {/* Connected Central Node Hub */}
                <div className="relative z-10 flex flex-col items-center">
                  
                  {/* Central Node */}
                  <div className="w-16 h-16 rounded-2xl bg-[#071A3D] border-2 border-[#F5C542] flex items-center justify-center shadow-[0_0_30px_rgba(245,197,66,0.5)] z-20">
                    <Cpu className="w-8 h-8 text-[#F5C542] animate-pulse" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#F5C542] mt-2 bg-[#041126] px-2 py-0.5 rounded border border-[#F5C542]/40">
                    Core Intelligence Node
                  </span>

                  {/* Radiating Satellite Nodes */}
                  <div className="absolute -top-12 -left-20 bg-[#071A3D] border border-[#C8CDD5]/60 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#F5C542]" />
                    <span className="text-[10px] font-mono text-white">Zero Trust Guard</span>
                  </div>

                  <div className="absolute -bottom-10 -right-20 bg-[#071A3D] border border-[#C8CDD5]/60 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                    <Globe2 className="w-3.5 h-3.5 text-[#F5C542]" />
                    <span className="text-[10px] font-mono text-white">Global Edge Mesh</span>
                  </div>

                  <div className="absolute -bottom-10 -left-20 bg-[#071A3D] border border-[#C8CDD5]/60 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#F5C542]" />
                    <span className="text-[10px] font-mono text-white">Sub-15ms Route</span>
                  </div>
                </div>

              </div>

              {/* Bottom 3 Highlights */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-[#041126]/60 border border-[#C8CDD5]/20">
                  <span className="text-[10px] text-[#C8CDD5] block font-mono">ENCRYPTION</span>
                  <span className="font-bold text-white text-xs">AES-256 GCM</span>
                </div>
                <div className="p-2 rounded-xl bg-[#041126]/60 border border-[#C8CDD5]/20">
                  <span className="text-[10px] text-[#C8CDD5] block font-mono">REDUNDANCY</span>
                  <span className="font-bold text-[#F5C542] text-xs">Triple Zone</span>
                </div>
                <div className="p-2 rounded-xl bg-[#041126]/60 border border-[#C8CDD5]/20">
                  <span className="text-[10px] text-[#C8CDD5] block font-mono">COMPLIANCE</span>
                  <span className="font-bold text-white text-xs">ISO 27001</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Why Choose Us Copy & Benefits List */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Yellow Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5F8] border border-[#C8CDD5]">
              <span className="w-2 h-2 rounded-full bg-[#F5C542]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#071A3D]">
                WHY CHOOSE US
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041126] tracking-tight leading-tight">
              Built for Performance.{' '}
              <span className="text-[#071A3D] underline decoration-[#F5C542] decoration-2">
                Designed for Growth.
              </span>
            </h2>

            <p className="text-base text-[#475569] leading-relaxed">
              We empower modern enterprises with high-assurance software architectures that reduce technical debt, accelerate time-to-market, and scale reliably.
            </p>

            {/* 6 Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {benefits.map((b, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#F3F5F8]/70 border border-[#C8CDD5] hover:border-[#071A3D] transition-colors">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#041126] mb-1">
                    <div className="w-5 h-5 rounded-full bg-[#071A3D] text-[#F5C542] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{b.title}</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed pl-7 font-normal">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onDiscoverMore}
                className="px-7 py-3.5 bg-[#071A3D] hover:bg-[#041126] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group cursor-pointer"
              >
                <span>Discover More</span>
                <ArrowRight className="w-4 h-4 text-[#F5C542] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
