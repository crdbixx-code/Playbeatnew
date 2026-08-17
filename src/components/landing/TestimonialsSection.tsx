import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Alexander Vance',
      position: 'Chief Technology Officer',
      company: 'OmniCloud Technologies',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      content:
        'Migrating our legacy infrastructure to PlayBeat Digital was seamless. We achieved a 45% reduction in compute latency and streamlined multi-tenant software deployment across 14 enterprise regions.',
      highlight: '45% Latency Drop',
    },
    {
      name: 'Elena Rostova',
      position: 'VP of Digital Transformation',
      company: 'Strata Financial Group',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      content:
        'The security architecture and granular access controls exceeded our strictest compliance requirements. The automated onboarding pipeline saved hundreds of engineering hours.',
      highlight: 'Zero Compliance Friction',
    },
    {
      name: 'Marcus Thorne',
      position: 'Head of Operations',
      company: 'Apex Global Logistics',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      content:
        'Outstanding reliability and responsive support. The platform’s real-time intelligence feeds directly into our executive analytics suite without requiring custom middleware.',
      highlight: 'Seamless Integrations',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5F8] border border-[#C8CDD5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#071A3D]">
              PROVEN RESULTS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041126] tracking-tight">
            What Our Customers Say
          </h2>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Trusted by technology leaders and visionary enterprises worldwide.
          </p>
        </div>

        {/* 3 Premium Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] rounded-3xl p-8 border border-[#C8CDD5] hover:border-[#071A3D] shadow-[0_4px_25px_rgba(7,26,61,0.05)] hover:shadow-[0_15px_35px_rgba(7,26,61,0.12)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* 5-Star Rating & Highlight Pill */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 fill-[#F5C542] text-[#F5C542]"
                      />
                    ))}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-[#F3F5F8] border border-[#C8CDD5] text-[10px] font-mono font-bold text-[#071A3D]">
                    {t.highlight}
                  </span>
                </div>

                {/* Testimonial Quote Content */}
                <p className="text-sm text-[#334155] leading-relaxed mb-8 italic">
                  "{t.content}"
                </p>
              </div>

              {/* Author Details with Avatar */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#C8CDD5]/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#C8CDD5] shadow-xs"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#041126]">
                    {t.name}
                  </h4>
                  <p className="text-xs text-[#64748B] font-medium">
                    {t.position}
                  </p>
                  <p className="text-[11px] text-[#071A3D] font-semibold">
                    {t.company}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
