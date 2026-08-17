import React from 'react';
import {
  Cpu,
  Zap,
  Bot,
  ShieldCheck,
  LineChart,
  Network,
  ArrowUpRight,
  Check,
} from 'lucide-react';

interface FeaturesSectionProps {
  onLearnMore?: (featureTitle: string) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onLearnMore }) => {
  const features = [
    {
      icon: Cpu,
      title: 'Smart Technology',
      description: 'Advanced tools designed to simplify complex workflows and empower operational clarity across all departments.',
      tag: 'Next-Gen Core',
    },
    {
      icon: Zap,
      title: 'Powerful Performance',
      description: 'Fast, reliable and scalable infrastructure engineered for ultra-low latency and peak traffic resilience.',
      tag: '99.99% Uptime',
    },
    {
      icon: Bot,
      title: 'Intelligent Automation',
      description: 'Automate repetitive processes and focus on growth with proactive task pipelines and intelligent triggers.',
      tag: 'Zero Friction',
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Security',
      description: 'Modern security architecture designed to protect your business with end-to-end encryption and compliance.',
      tag: 'Bank-Grade',
    },
    {
      icon: LineChart,
      title: 'Real-Time Insights',
      description: 'Turn data into actionable business intelligence with live visual dashboards and predictive analytics.',
      tag: 'Instant Telemetry',
    },
    {
      icon: Network,
      title: 'Seamless Integration',
      description: 'Connect your existing systems and workflows effortlessly via robust RESTful & GraphQL cloud APIs.',
      tag: 'Unified Ecosystem',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F3F5F8] rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5C542]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5F8] border border-[#C8CDD5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#071A3D]">
              CORE CAPABILITIES
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041126] tracking-tight">
            Everything You Need to Move Forward
          </h2>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Powerful technology. Simple experience. Built for modern businesses.
          </p>
        </div>

        {/* 6 Premium Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#FFFFFF] rounded-2xl p-8 border border-[#C8CDD5] hover:border-[#071A3D] shadow-[0_4px_20px_rgba(7,26,61,0.04)] hover:shadow-[0_16px_35px_rgba(7,26,61,0.1)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Top Row: Icon with Yellow Accent & Tag */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#071A3D] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform shadow-md">
                      {/* Subtle yellow ambient corner */}
                      <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#F5C542] blur-xs opacity-70" />
                      <Icon className="w-7 h-7 text-[#FFFFFF] relative z-10 group-hover:text-[#F5C542] transition-colors" />
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-[#F3F5F8] border border-[#C8CDD5]/80 text-[10px] font-mono font-bold text-[#071A3D] uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#041126] group-hover:text-[#071A3D] mb-3 transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                  </h3>

                  <p className="text-sm text-[#475569] leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom subtle indicator */}
                <div className="pt-4 border-t border-[#C8CDD5]/50 flex items-center justify-between text-xs font-bold text-[#071A3D] group-hover:text-[#041126]">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#F5C542]" /> Ready to Deploy
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#F3F5F8] group-hover:bg-[#F5C542] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#071A3D] group-hover:text-[#041126] transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
