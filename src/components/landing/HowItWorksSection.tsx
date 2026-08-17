import React from 'react';
import {
  Compass,
  Rocket,
  Sliders,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

interface HowItWorksSectionProps {
  onStepClick?: (stepNumber: number) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStepClick }) => {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Solution',
      desc: 'Evaluate business needs and select the targeted digital software, cloud architecture, or enterprise package.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Get Started',
      desc: 'Immediate access with automated credential provisioning, instant API keys, and sandbox test environments.',
      icon: Rocket,
    },
    {
      num: '03',
      title: 'Configure Your Platform',
      desc: 'Connect team workspaces, integrate databases, and configure role-based permission policies in minutes.',
      icon: Sliders,
    },
    {
      num: '04',
      title: 'Grow Your Business',
      desc: 'Accelerate productivity, streamline transaction velocity, and scale without infrastructure bottlenecks.',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5F8] border border-[#C8CDD5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#071A3D]">
              STREAMLINED ONBOARDING
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041126] tracking-tight">
            Simple. Powerful. Effective.
          </h2>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            From initial selection to global deployment in four transparent, guided steps.
          </p>
        </div>

        {/* 4-Step Horizontal Process with connecting line */}
        <div className="relative">
          
          {/* Connecting Silver Line (Desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-[#C8CDD5] -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-[#FFFFFF] rounded-2xl p-6 border border-[#C8CDD5] hover:border-[#071A3D] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1.5"
                >
                  {/* Step Number Circle with Yellow Highlight */}
                  <div className="w-14 h-14 rounded-full bg-[#071A3D] border-4 border-[#FFFFFF] shadow-lg flex items-center justify-center text-[#F5C542] font-mono font-black text-lg mb-6 group-hover:scale-110 group-hover:bg-[#041126] transition-all relative">
                    {step.num}
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F5C542] border-2 border-white" />
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-[#F3F5F8] border border-[#C8CDD5] flex items-center justify-center text-[#071A3D] mb-4 group-hover:text-[#041126] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#041126] mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
