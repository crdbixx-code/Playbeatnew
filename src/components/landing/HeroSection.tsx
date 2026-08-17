import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  TrendingUp,
  Activity,
  Cpu,
  Server,
  Lock,
  Globe2,
  CheckCircle2,
  ChevronRight,
  Database,
  BarChart3,
} from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreSolutions: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onExploreSolutions,
}) => {
  const [activeMetricTab, setActiveMetricTab] = useState<'realtime' | 'latency' | 'throughput'>('realtime');

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FFFFFF]"
    >
      {/* Delicate background metallic grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#F3F5F8_1px,transparent_1px),linear-gradient(to_bottom,#F3F5F8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle glowing ambient spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#F5C542]/10 via-[#C8CDD5]/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F5F8] border border-[#C8CDD5] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#F5C542] animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#F5C542] -ml-4" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#071A3D]">
                NEXT-GENERATION DIGITAL SOLUTIONS
              </span>
            </div>

            {/* Large Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#041126] tracking-tight leading-[1.12]">
              Powering the Future With{' '}
              <span className="relative inline-block text-[#071A3D]">
                <span className="relative z-10 underline decoration-[#F5C542] decoration-wavy decoration-2">
                  Smarter Digital
                </span>
              </span>{' '}
              <span className="text-[#071A3D] relative">
                Solutions
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-[#F5C542]/35 -z-0 rounded-sm" />
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl font-normal">
              Transform the way your business operates with powerful, scalable and intelligent technology designed to simplify complexity and accelerate growth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onGetStarted}
                id="hero-cta-get-started"
                className="px-7 py-3.5 bg-[#F5C542] hover:bg-[#DFAF2B] text-[#041126] font-extrabold text-sm uppercase tracking-wide rounded-xl transition-all duration-200 shadow-[0_6px_20px_rgba(245,197,66,0.4)] hover:shadow-[0_8px_25px_rgba(245,197,66,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group active:translate-y-0 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreSolutions}
                id="hero-cta-explore-solutions"
                className="px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#F3F5F8] text-[#071A3D] font-bold text-sm rounded-xl border border-[#C8CDD5] hover:border-[#071A3D]/40 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#071A3D]" />
                <span>Explore Solutions</span>
              </button>
            </div>

            {/* Trust Indicators Under Buttons */}
            <div className="pt-4 border-t border-[#C8CDD5]/60 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-semibold text-[#334155]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
                <span>Secure & Reliable</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
                <span>Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
                <span>Scalable Technology</span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Futuristic Technology Visualization */}
          <div className="lg:col-span-6 relative">
            
            {/* Background 3D Abstract Glow Ring */}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-gradient-to-bl from-[#F5C542]/20 via-[#C8CDD5]/30 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Main Interactive Enterprise Dashboard Mockup */}
            <div className="relative rounded-3xl bg-[#071A3D] border-2 border-[#C8CDD5]/80 p-5 sm:p-6 shadow-[0_25px_60px_-15px_rgba(7,26,61,0.3)] text-white overflow-hidden">
              
              {/* Metallic Glass Top Bar */}
              <div className="flex items-center justify-between border-b border-[#C8CDD5]/20 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5C542]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-mono text-[#C8CDD5] ml-2 tracking-wide">
                    node-core.playbeat.cloud:443
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#041126] border border-[#F5C542]/40 text-[10px] font-mono text-[#F5C542]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-pulse" />
                    LIVE TELEMETRY
                  </span>
                </div>
              </div>

              {/* Dynamic Header Metrics */}
              <div className="grid grid-cols-3 gap-2.5 mb-5">
                <div className="p-3 rounded-xl bg-[#041126]/70 border border-[#C8CDD5]/20">
                  <span className="text-[10px] text-[#C8CDD5] font-mono block uppercase">Global Uptime</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-black text-white font-mono">99.99%</span>
                    <span className="text-[10px] text-emerald-400 font-bold">▲ 0.01%</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#041126]/70 border border-[#C8CDD5]/20">
                  <span className="text-[10px] text-[#C8CDD5] font-mono block uppercase">Edge Latency</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-black text-[#F5C542] font-mono">14.2ms</span>
                    <span className="text-[10px] text-[#C8CDD5]">p99</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#041126]/70 border border-[#C8CDD5]/20">
                  <span className="text-[10px] text-[#C8CDD5] font-mono block uppercase">Active Nodes</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-black text-white font-mono">1,024</span>
                    <span className="text-[10px] text-[#F5C542] font-bold">Sync</span>
                  </div>
                </div>
              </div>

              {/* Interactive Vector Analytics Graph */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-[#041126] to-[#071A3D] border border-[#C8CDD5]/30 mb-5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#F5C542]" />
                    <span className="text-xs font-bold text-white tracking-wide">Enterprise Throughput & Compute Load</span>
                  </div>
                  <div className="flex gap-1 bg-[#071A3D] p-1 rounded-lg border border-[#C8CDD5]/20 text-[10px]">
                    {(['realtime', 'latency', 'throughput'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveMetricTab(tab)}
                        className={`px-2 py-0.5 rounded capitalize font-mono transition-colors ${
                          activeMetricTab === tab
                            ? 'bg-[#F5C542] text-[#041126] font-bold'
                            : 'text-[#C8CDD5] hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Visual Waveform with glowing data nodes */}
                <div className="h-32 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F5C542" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#F5C542" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="silverGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#C8CDD5" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#F5C542" stopOpacity="1" />
                        <stop offset="100%" stopColor="#C8CDD5" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {/* Area fill */}
                    <path
                      d="M0,70 Q50,40 100,65 T200,30 T300,50 T400,20 L400,100 L0,100 Z"
                      fill="url(#yellowGradient)"
                    />

                    {/* Main waveform line */}
                    <path
                      d="M0,70 Q50,40 100,65 T200,30 T300,50 T400,20"
                      fill="none"
                      stroke="url(#silverGradient)"
                      strokeWidth="3"
                    />

                    {/* Glowing yellow data points */}
                    <circle cx="100" cy="65" r="4" fill="#F5C542" className="animate-pulse" />
                    <circle cx="200" cy="30" r="4" fill="#F5C542" className="animate-pulse" />
                    <circle cx="300" cy="50" r="4" fill="#F5C542" className="animate-pulse" />
                    <circle cx="400" cy="20" r="5" fill="#FFFFFF" stroke="#F5C542" strokeWidth="2" />
                  </svg>

                  {/* Micro-label floating above graph */}
                  <div className="absolute top-2 right-4 bg-[#071A3D]/90 border border-[#F5C542]/60 px-2 py-1 rounded text-[10px] font-mono text-[#F5C542] shadow-sm">
                    Peak: +342.8 Mb/s
                  </div>
                </div>
              </div>

              {/* Floating Bottom Card: Security & Infrastructure Node Status */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#041126]/90 border border-[#C8CDD5]/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#071A3D] border border-[#F5C542]/40 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-[#F5C542]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Quantum-Safe TLS 1.3 Encryption</div>
                    <div className="text-[10px] text-[#C8CDD5] font-mono">Zero Trust Protocol Verified</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Active</span>
                </div>
              </div>

            </div>

            {/* Overlapping Floating Metallic Badge Top Left */}
            <div className="absolute -top-4 -left-4 bg-[#FFFFFF] border-2 border-[#C8CDD5] text-[#071A3D] p-3 rounded-2xl shadow-xl flex items-center gap-2.5 hidden sm:flex animate-bounce duration-1000">
              <div className="w-7 h-7 rounded-lg bg-[#071A3D] flex items-center justify-center text-[#F5C542]">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#64748B] block">Processing Speed</span>
                <span className="text-xs font-extrabold text-[#041126]">10x Acceleration</span>
              </div>
            </div>

            {/* Overlapping Floating Metallic Badge Bottom Right */}
            <div className="absolute -bottom-5 -right-4 bg-[#FFFFFF] border-2 border-[#C8CDD5] text-[#071A3D] p-3 rounded-2xl shadow-xl flex items-center gap-2.5 hidden sm:flex">
              <div className="w-7 h-7 rounded-lg bg-[#F5C542] flex items-center justify-center text-[#041126]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#64748B] block">Enterprise ROI</span>
                <span className="text-xs font-extrabold text-[#041126]">+48% Efficiency</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
