import React from 'react';
import { Users2, ShieldAlert, Clock, Sparkles } from 'lucide-react';

export const StatisticsSection: React.FC = () => {
  const stats = [
    {
      number: '10K+',
      label: 'Businesses Reached',
      description: 'Active enterprise clients and organizations empowered globally.',
      highlight: 'Global Impact',
    },
    {
      number: '99.9%',
      label: 'Platform Reliability',
      description: 'Guaranteed high-availability uptime SLA with redundant clusters.',
      highlight: 'High Availability',
    },
    {
      number: '24/7',
      label: 'Technology Availability',
      description: 'Round-the-clock proactive monitoring and autonomous failover.',
      highlight: 'Always On',
    },
    {
      number: '50+',
      label: 'Digital Solutions',
      description: 'Modular enterprise applications and specialized software licenses.',
      highlight: 'Full Catalog',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FFFFFF] border-y border-[#C8CDD5]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#C8CDD5]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center px-4 sm:px-6 space-y-2 group transition-transform duration-300 hover:-translate-y-1`}
            >
              {/* Highlight Pill */}
              <span className="px-2.5 py-0.5 rounded-full bg-[#F3F5F8] border border-[#C8CDD5] text-[10px] font-mono font-bold text-[#071A3D] uppercase tracking-wider mb-1">
                {stat.highlight}
              </span>

              {/* Huge Number */}
              <div className="flex items-baseline justify-center">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#041126] font-mono">
                  {stat.number.slice(0, -1)}
                </span>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F5C542] font-mono">
                  {stat.number.slice(-1)}
                </span>
              </div>

              {/* Label */}
              <h4 className="text-base font-bold text-[#071A3D]">
                {stat.label}
              </h4>

              {/* Description */}
              <p className="text-xs text-[#64748B] leading-relaxed max-w-[220px]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
