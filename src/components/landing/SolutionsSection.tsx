import React, { useState } from 'react';
import {
  Briefcase,
  Layers,
  Building,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Shield,
  BarChart,
  Users,
  Compass,
} from 'lucide-react';

interface SolutionsSectionProps {
  onSelectSolution: (solutionName: string) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onSelectSolution }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const solutions = [
    {
      id: 'business',
      icon: Briefcase,
      title: 'Business Solutions',
      subtitle: 'Operational Excellence',
      description: 'Technology designed to optimize everyday operations, automate repetitive tasks, and empower team productivity.',
      benefits: [
        'Automated workflow pipelines',
        'Real-time team collaboration',
        'Smart document management',
        'Comprehensive audit reporting',
      ],
      tag: 'SMB to Mid-Market',
      accentColor: '#F5C542',
    },
    {
      id: 'digital',
      icon: Layers,
      title: 'Digital Solutions',
      subtitle: 'Customer Experience',
      description: 'Modern digital tools built to improve customer experiences, streamline omnichannel commerce, and drive conversion.',
      benefits: [
        'Omnichannel customer portals',
        'Instant digital license provisioning',
        'AI-assisted support workflows',
        'Integrated multi-currency billing',
      ],
      tag: 'High Growth',
      isPopular: true,
      accentColor: '#F5C542',
    },
    {
      id: 'enterprise',
      icon: Building,
      title: 'Enterprise Solutions',
      subtitle: 'Scale & Resilience',
      description: 'Scalable infrastructure for organizations ready to grow with custom compliance, dedicated SLA, and high-availability architecture.',
      benefits: [
        'Dedicated isolated cloud clusters',
        'Custom SSO (SAML / Okta / Azure AD)',
        '24/7 dedicated enterprise architects',
        'Custom security & compliance review',
      ],
      tag: 'Global Scale',
      accentColor: '#F5C542',
    },
  ];

  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#071A3D] text-white relative overflow-hidden">
      {/* Metallic grid overlay on Navy */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,205,213,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,205,213,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Subtle glowing yellow accent in center background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F5C542]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#041126] border border-[#C8CDD5]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F5C542]">
              TAILORED ARCHITECTURE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFFFFF] tracking-tight">
            Solutions Designed Around Your Business
          </h2>

          <p className="text-base sm:text-lg text-[#C8CDD5] leading-relaxed">
            Choose the right foundation for your organization’s specific operational scale and speed.
          </p>
        </div>

        {/* 3 Large Solution Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {solutions.map((sol, index) => {
            const Icon = sol.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={sol.id}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative rounded-3xl bg-[#041126]/90 backdrop-blur-xl border transition-all duration-300 p-8 sm:p-9 flex flex-col justify-between ${
                  sol.isPopular
                    ? 'border-[#F5C542] shadow-[0_0_35px_rgba(245,197,66,0.18)]'
                    : 'border-[#C8CDD5]/30 hover:border-[#C8CDD5]/80 shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
                } hover:-translate-y-1.5`}
              >
                {/* Popular Highlight Badge */}
                {sol.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#F5C542] text-[#041126] text-[10px] font-black uppercase tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#071A3D] border border-[#C8CDD5]/30 flex items-center justify-center relative overflow-hidden group">
                      <Icon className="w-7 h-7 text-[#F5C542]" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-[#071A3D] border border-[#C8CDD5]/20 text-[10px] font-mono font-bold text-[#C8CDD5] uppercase tracking-wider">
                      {sol.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1 mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#F5C542] font-mono font-bold">
                      {sol.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {sol.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#C8CDD5] leading-relaxed mb-6 font-normal">
                    {sol.description}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="space-y-3 mb-8 pt-4 border-t border-[#C8CDD5]/20">
                    {sol.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#F5C542] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA button */}
                <div>
                  <button
                    onClick={() => onSelectSolution(sol.title)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      sol.isPopular
                        ? 'bg-[#F5C542] hover:bg-[#DFAF2B] text-[#041126] shadow-lg shadow-[#F5C542]/20'
                        : 'bg-[#071A3D] hover:bg-[#071A3D]/80 text-white border border-[#C8CDD5]/40 hover:border-[#F5C542]'
                    }`}
                  >
                    <span>Get Started With {sol.title.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
